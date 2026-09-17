/* MK Digital — site behaviour.
   Everything degrades gracefully: with JavaScript off the pages still read,
   the English copy is already in the HTML, and every link still works. */

(function () {
  "use strict";

  var CONTACT_EMAIL = "rothschild535@gmail.com";
  var LANGS = ["en", "zh", "ja", "es"];
  var KEY_LANG = "mk.lang";
  var KEY_THEME = "mk.theme";

  var T = window.MK_I18N || {};
  var page = document.body.getAttribute("data-page") || "home";
  var lang = "en";

  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = matchMedia("(pointer: fine)").matches;

  function store(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* private mode */ }
  }
  function recall(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  /* ---------------------------------------------------------------- theme */

  var themeMeta = $('meta[name="theme-color"]');

  function applyTheme(mode) {
    document.documentElement.setAttribute("data-theme", mode);
    if (themeMeta) themeMeta.setAttribute("content", mode === "paper" ? "#f4f3ef" : "#0b0b0c");
    $$("[data-theme-toggle]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(mode === "paper"));
    });
  }

  var savedTheme = recall(KEY_THEME);
  applyTheme(savedTheme || (matchMedia("(prefers-color-scheme: light)").matches ? "paper" : "ink"));

  matchMedia("(prefers-color-scheme: light)").addEventListener("change", function (e) {
    if (!recall(KEY_THEME)) applyTheme(e.matches ? "paper" : "ink");
  });

  $$("[data-theme-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var next = document.documentElement.getAttribute("data-theme") === "paper" ? "ink" : "paper";
      applyTheme(next);
      store(KEY_THEME, next);
    });
  });

  /* ----------------------------------------------------------------- i18n */

  function lookup(dict, path) {
    return path.split(".").reduce(function (acc, key) {
      return acc && acc[key];
    }, dict);
  }

  function t(path) {
    var value = lookup(T[lang] || {}, path);
    if (typeof value !== "string") value = lookup(T.en || {}, path);
    return typeof value === "string" ? value : "";
  }

  function applyLanguage(next) {
    lang = LANGS.indexOf(next) > -1 ? next : "en";
    document.documentElement.lang = lang;

    $$("[data-t]").forEach(function (el) {
      var value = t(el.getAttribute("data-t"));
      if (value) el.textContent = value;
    });
    $$("[data-t-placeholder]").forEach(function (el) {
      var value = t(el.getAttribute("data-t-placeholder"));
      if (value) el.setAttribute("placeholder", value);
    });
    $$("[data-t-label]").forEach(function (el) {
      var value = t(el.getAttribute("data-t-label"));
      if (value) el.setAttribute("aria-label", value);
    });
    $$("[data-t-title]").forEach(function (el) {
      var value = t(el.getAttribute("data-t-title"));
      if (value) el.setAttribute("title", value);
    });

    var title = t(page + ".metaTitle");
    if (title) document.title = title;
    var desc = $('meta[name="description"]');
    var descText = t(page + ".metaDesc");
    if (desc && descText) desc.setAttribute("content", descText);

    $$("[data-lang-select]").forEach(function (sel) { sel.value = lang; });
    store(KEY_LANG, lang);
    restartTyping();
    syncMenuLabel();
  }

  $$("[data-lang-select]").forEach(function (sel) {
    sel.addEventListener("change", function () { applyLanguage(sel.value); });
  });

  /* ------------------------------------------------------------------ nav */

  var header = $(".site-header");
  if (header) {
    var onScrollHeader = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScrollHeader();
    addEventListener("scroll", onScrollHeader, { passive: true });
  }

  var burger = $("[data-burger]");
  var menu = $("[data-menu]");

  function syncMenuLabel() {
    if (!burger) return;
    var open = burger.getAttribute("aria-expanded") === "true";
    burger.setAttribute("aria-label", t(open ? "nav.close" : "nav.menu") || "Menu");
  }

  function setMenu(open) {
    if (!burger || !menu) return;
    burger.setAttribute("aria-expanded", String(open));
    menu.classList.toggle("open", open);
    syncMenuLabel();
  }

  if (burger && menu) {
    burger.addEventListener("click", function () {
      setMenu(burger.getAttribute("aria-expanded") !== "true");
    });
    $$("a", menu).forEach(function (a) {
      a.addEventListener("click", function () { setMenu(false); });
    });
    addEventListener("keydown", function (e) {
      if (e.key === "Escape" && burger.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        burger.focus();
      }
    });
  }

  /* ------------------------------------------------- scroll progress + top */

  var bar = $("[data-progress]");
  var toTop = $("[data-to-top]");

  if (bar || toTop) {
    var ticking = false;
    var onScroll = function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var doc = document.documentElement;
        var max = doc.scrollHeight - innerHeight;
        var ratio = max > 0 ? Math.min(scrollY / max, 1) : 0;
        if (bar) bar.style.transform = "scaleX(" + ratio + ")";
        if (toTop) toTop.classList.toggle("show", scrollY > innerHeight * 0.8);
        ticking = false;
      });
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
  }

  if (toTop) {
    toTop.addEventListener("click", function () {
      scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    });
  }

  /* --------------------------------------------------------------- reveal */

  var reveals = $$(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px" });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* --------------------------------------------------------------- typing */

  var typed = $("[data-typed]");
  var typingTimer = null;
  var phraseIndex = 0;
  var charIndex = 0;
  var erasing = false;

  function phrases() {
    return ["typed1", "typed2", "typed3", "typed4"]
      .map(function (k) { return t("home." + k); })
      .filter(Boolean);
  }

  function restartTyping() {
    if (!typed) return;
    clearTimeout(typingTimer);
    phraseIndex = 0;
    charIndex = 0;
    erasing = false;
    if (reduce) {
      typed.textContent = phrases()[0] || "";
      return;
    }
    tick();
  }

  function tick() {
    var list = phrases();
    if (!list.length) return;
    var text = list[phraseIndex % list.length];
    typed.textContent = text.slice(0, charIndex);

    if (!erasing && charIndex < text.length) {
      charIndex++;
      typingTimer = setTimeout(tick, 42);
    } else if (!erasing) {
      erasing = true;
      typingTimer = setTimeout(tick, 1900);
    } else if (charIndex > 0) {
      charIndex--;
      typingTimer = setTimeout(tick, 18);
    } else {
      erasing = false;
      phraseIndex++;
      typingTimer = setTimeout(tick, 260);
    }
  }

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) clearTimeout(typingTimer);
    else if (typed && !reduce) tick();
  });

  /* ---------------------------------------------------------- interaction glow + 3D tilt */

  // The cursor glow was intentionally removed: the device itself now carries the motion.
  function bindTilt(el, maxX, maxY, liftOnHover, scaleOnHover) {
    if (!el || !fine || reduce) return;

    var raf = 0;
    var box = null;
    var targetX = 0, targetY = 0, targetLift = 0, targetScale = 1;
    var currentX = 0, currentY = 0, currentLift = 0, currentScale = 1;

    function readBox() { box = el.getBoundingClientRect(); }

    function frame() {
      var ease = el.classList.contains("phone") ? 0.14 : 0.12;
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;
      currentLift += (targetLift - currentLift) * 0.13;
      currentScale += (targetScale - currentScale) * 0.11;

      el.style.setProperty("--rx", currentX.toFixed(2) + "deg");
      el.style.setProperty("--ry", currentY.toFixed(2) + "deg");
      el.style.setProperty("--lift", currentLift.toFixed(2) + "px");
      el.style.setProperty("--scale", currentScale.toFixed(4));

      var moving = Math.abs(targetX-currentX)>.025 ||
                   Math.abs(targetY-currentY)>.025 ||
                   Math.abs(targetLift-currentLift)>.025 ||
                   Math.abs(targetScale-currentScale)>.0005;
      if (moving) raf = requestAnimationFrame(frame);
      else raf = 0;
    }

    function kick() { if (!raf) raf = requestAnimationFrame(frame); }

    el.addEventListener("pointerenter", function () {
      readBox();
      targetLift = liftOnHover;
      targetScale = scaleOnHover;
      el.classList.add("is-hovered");
      kick();
    }, { passive: true });

    el.addEventListener("pointermove", function (e) {
      if (e.pointerType === "touch") return;
      if (!box) readBox();

      var px = Math.max(-.5, Math.min(.5, (e.clientX - box.left) / box.width - .5));
      var py = Math.max(-.5, Math.min(.5, (e.clientY - box.top) / box.height - .5));
      targetX = -py * maxX;
      targetY = px * maxY;

      if (el.classList.contains("phone")) {
        el.style.setProperty("--glare-x", ((px + .5) * 100).toFixed(1) + "%");
        el.style.setProperty("--glare-y", ((py + .5) * 100).toFixed(1) + "%");
      }
      kick();
    }, { passive: true });

    function reset() {
      box = null;
      targetX = 0; targetY = 0; targetLift = 0; targetScale = 1;
      el.classList.remove("is-hovered");
      kick();
    }

    el.addEventListener("pointerleave", reset, { passive: true });
    addEventListener("resize", function () { box = null; }, { passive: true });
    addEventListener("scroll", function () { box = null; }, { passive: true });
    el.addEventListener("dblclick", reset, { passive: true });
  }

  bindTilt($('[data-tilt]'), 10.5, 12.5, -5, 1.018);
  bindTilt($('[data-browser-tilt]'), 3.2, 4.8, -3, 1.004);

  /* ---------------------------------------------------------- demo frames */

  var DEMO_ORDER = ["cafe", "trades", "salon", "clinic"];
  var DEMO_HOSTS = {
    cafe: "live-preview / hazel-and-fern",
    trades: "live-preview / brightline-electrical",
    salon: "live-preview / studio-noir",
    clinic: "live-preview / riverbend-dental"
  };
  var inline = window.MK_DEMO_SRCDOC || null;

  function loadDemo(frame, name) {
    if (!frame) return;

    var token = String(Date.now()) + Math.random().toString(36).slice(2);
    frame.dataset.demoToken = token;
    frame.classList.remove("ready");
    frame.setAttribute("scrolling", "yes");
    frame.setAttribute("aria-busy", "true");

    var shell = frame.closest(".phone-screen, .browser-frame");
    var spinner = shell ? $(".phone-loading", shell) : null;
    if (spinner) spinner.classList.remove("hidden");

    var finish = function () {
      if (frame.dataset.demoToken !== token) return;

      frame.classList.add("ready");
      frame.setAttribute("aria-busy", "false");
      if (spinner) spinner.classList.add("hidden");

      try {
        var doc = frame.contentDocument;
        if (doc && doc.documentElement) {
          doc.documentElement.scrollTop = 0;
          if (doc.body) doc.body.scrollTop = 0;
        }
      } catch (e) { /* cross-origin frame: browser handles it normally */ }
    };

    frame.addEventListener("load", finish, { once: true });

    if (inline && inline[name]) frame.srcdoc = inline[name];
    else frame.src = "demos/" + name + ".html";

    setTimeout(finish, 3500);
  }

  $$("[data-demo-group]").forEach(function (group) {
    var frames = $$("[data-demo-frame]", group);
    var buttons = $$("[data-demo]", group);
    var link = $("[data-demo-link]", group);
    var url = $("[data-demo-url]", group);
    var current = group.getAttribute("data-demo-start") || DEMO_ORDER[0];

    function switchTo(name, focusButton) {
      if (DEMO_ORDER.indexOf(name) === -1) return;
      current = name;

      frames.forEach(function (frame) {
        var shell = frame.closest(".phone-screen, .browser-frame, .phone, .browser");
        if (shell) shell.classList.add("is-changing");
      });

      setTimeout(function () {
        frames.forEach(function (frame) {
          loadDemo(frame, name);
          var shell = frame.closest(".phone-screen, .browser-frame, .phone, .browser");
          if (shell) shell.classList.remove("is-changing");
        });
      }, 120);

      buttons.forEach(function (btn) {
        var active = btn.getAttribute("data-demo") === name;
        btn.setAttribute("aria-pressed", String(active));
        if (active && focusButton) btn.focus({ preventScroll: true });
      });

      if (link) {
        if (inline && inline[name]) {
          if (link.dataset.blob) URL.revokeObjectURL(link.dataset.blob);
          var blobUrl = URL.createObjectURL(new Blob([inline[name]], { type: "text/html" }));
          link.dataset.blob = blobUrl;
          link.href = blobUrl;
        } else {
          link.href = "demos/" + name + ".html";
        }
      }

      if (url) url.textContent = DEMO_HOSTS[name] || name;

      $$("[data-demo-panel]", group).forEach(function (panel) {
        panel.hidden = panel.getAttribute("data-demo-panel") !== name;
      });
    }

    buttons.forEach(function (btn, index) {
      btn.addEventListener("click", function () {
        switchTo(btn.getAttribute("data-demo"), true);
      });

      btn.addEventListener("keydown", function (e) {
        if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
        e.preventDefault();
        var next = e.key === "ArrowRight" ? (index + 1) % buttons.length : (index - 1 + buttons.length) % buttons.length;
        var nextName = buttons[next].getAttribute("data-demo");
        switchTo(nextName, true);
      });
    });

    // Keep the embedded demos genuinely scrollable and make their links feel native.
    frames.forEach(function (frame) {
      frame.addEventListener("load", function () {
        try {
          var doc = frame.contentDocument;
          if (!doc) return;
          doc.documentElement.style.scrollBehavior = "smooth";

          doc.addEventListener("click", function (event) {
            var linkEl = event.target.closest ? event.target.closest("a[href^='#']") : null;
            if (!linkEl) return;
            var targetId = linkEl.getAttribute("href").slice(1);
            var target = targetId ? doc.getElementById(targetId) : null;
            if (!target) return;
            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
            historyReplaceInFrame(doc, targetId);
          }, true);
        } catch (e) { /* ignore inaccessible frames */ }
      });

      // Prevent page-level scrolling from stealing wheel input when the pointer is over the demo.
      frame.addEventListener("wheel", function () {
        frame.focus({ preventScroll: true });
      }, { passive: true });
    });

    switchTo(current, false);
  });

  function historyReplaceInFrame(doc, id) {
    try {
      if (doc.defaultView && doc.defaultView.history) {
        doc.defaultView.history.replaceState(null, "", "#" + encodeURIComponent(id));
      }
    } catch (e) { /* ignore */ }
  }

  /* ----------------------------------------------------------- copy email */

  $$("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var value = btn.getAttribute("data-copy");
      var restore = function () {
        btn.textContent = t("ui.copied") || "Copied";
        setTimeout(function () { btn.textContent = t("ui.copy") || "Copy"; }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(restore, restore);
      } else {
        var tmp = document.createElement("textarea");
        tmp.value = value;
        document.body.appendChild(tmp);
        tmp.select();
        try { document.execCommand("copy"); } catch (e) { /* ignore */ }
        document.body.removeChild(tmp);
        restore();
      }
    });
  });

  /* ----------------------------------------------------------------- form */

  var form = $("#enquiry");
  if (form) {
    var status = $("#form-status");
    var message = form.elements.message;
    var counter = $("[data-count]");

    if (message && counter) {
      var count = function () { counter.textContent = message.value.length + " / 1200"; };
      message.addEventListener("input", count);
      count();
    }

    var showError = function (name, key) {
      var field = $('[data-field="' + name + '"]', form);
      if (!field) return;
      field.setAttribute("data-invalid", "true");
      var slot = $(".field-error", field);
      if (slot) slot.textContent = t("contact." + key);
    };

    var clearError = function (name) {
      var field = $('[data-field="' + name + '"]', form);
      if (!field) return;
      field.removeAttribute("data-invalid");
      var slot = $(".field-error", field);
      if (slot) slot.textContent = "";
    };

    ["name", "email", "message"].forEach(function (n) {
      var input = form.elements[n];
      if (input) input.addEventListener("input", function () { clearError(n); });
    });

    var setStatus = function (text, state) {
      if (!status) return;
      status.textContent = text;
      if (state) status.setAttribute("data-state", state);
      else status.removeAttribute("data-state");
    };

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var data = {
        name: form.elements.name.value.trim(),
        email: form.elements.email.value.trim(),
        business: form.elements.business.value.trim(),
        budget: form.elements.budget.value,
        message: form.elements.message.value.trim()
      };

      var ok = true;
      if (data.name.length < 2) { showError("name", "errName"); ok = false; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) { showError("email", "errEmail"); ok = false; }
      if (data.message.length < 12) { showError("message", "errMsg"); ok = false; }
      if (!ok) {
        var firstBad = $('[data-invalid="true"] input, [data-invalid="true"] textarea', form);
        if (firstBad) firstBad.focus();
        return;
      }

      // Honeypot: real people leave this empty.
      if (form.elements._honey.value) {
        form.reset();
        setStatus(t("contact.success"), "success");
        return;
      }

      var button = $('button[type="submit"]', form);
      if (button) button.disabled = true;
      setStatus(t("contact.sending"));

      var payload = {
        name: data.name,
        email: data.email,
        business: data.business,
        budget: data.budget,
        message: data.message,
        language: lang,
        _subject: "MK Digital — new website enquiry",
        _captcha: "false"
      };

      fetch("https://formsubmit.co/ajax/" + CONTACT_EMAIL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload)
      })
        .then(function (res) {
          if (!res.ok) throw new Error("send failed");
          form.reset();
          if (counter) counter.textContent = "0 / 1200";
          setStatus(t("contact.success"), "success");
        })
        .catch(function () {
          setStatus(t("contact.error"), "error");
          var subject = encodeURIComponent("MK Digital — new website enquiry");
          var body = encodeURIComponent(
            "Name: " + data.name +
            "\nEmail: " + data.email +
            "\nBusiness: " + data.business +
            "\nBudget: " + data.budget +
            "\nLanguage: " + lang +
            "\n\n" + data.message
          );
          location.href = "mailto:" + CONTACT_EMAIL + "?subject=" + subject + "&body=" + body;
        })
        .then(function () {
          if (button) button.disabled = false;
        });
    });
  }

  /* ----------------------------------------------------------------- init */

  // Used only by the single-file preview build, which keeps every page in the
  // document and shows one at a time.
  window.MK_ROUTE = function (name) {
    page = name;
    document.body.setAttribute("data-page", name);
    applyLanguage(lang);
    $$('[data-route="' + name + '"] .reveal').forEach(function (el) {
      el.classList.add("in");
    });
  };

  var initial = recall(KEY_LANG);
  if (LANGS.indexOf(initial) === -1) {
    var browser = (navigator.language || "en").slice(0, 2).toLowerCase();
    initial = LANGS.indexOf(browser) > -1 ? browser : "en";
  }
  applyLanguage(initial);

  $$("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();

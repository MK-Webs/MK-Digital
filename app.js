/*
  MK Digital — site logic
  Note: the first FormSubmit send to rothschild535@gmail.com requires
  Michael to click the one-time confirmation link FormSubmit emails him.
  Until that confirmation happens, submissions will not arrive by email
  (the mailto fallback below still works regardless).
*/
(function () {
  "use strict";

  var LANG_KEY = "mk_lang";
  var FORM_ENDPOINT = "https://formsubmit.co/ajax/rothschild535@gmail.com";
  var CONTACT_EMAIL = "rothschild535@gmail.com";

  var dict = {
    en: {
      nav: { offer: "Offer", process: "Process", pricing: "Pricing", contact: "Contact", cta: "Get a free preview", menu_open: "Open menu", menu_close: "Close menu" },
      hero: {
        kicker: "MK Digital · Independent studio",
        headline: "People check your website before they call you.",
        subcopy: "I build clean, mobile-optimized HTML websites for businesses that want a simple, professional presence online. They help customers and partners find you, understand what you offer, and feel confident working with you.",
        cta: "Get a free preview",
        cta_note: "Free live mockup first. Pay only if you like it.",
        card_label: "Showcase website",
        card_price_aud: "$250–$450 AUD",
        card_price_cny: "≈ ¥1,150–¥2,100 CNY",
        card_note: "Negotiable by scope",
        card_stat1: "0 monthly fees",
        card_stat2: "HTML files you own"
      },
      offer: {
        kicker: "The offer", title: "What you get",
        card1_title: "Mobile-first HTML", card1_desc: "Built to look right on a phone first, then everywhere else. No bloated builders, no plugins to break.",
        card2_title: "A free preview first", card2_desc: "See a live mockup of your actual site before you spend a cent. If it is not right, walk away.",
        card3_title: "No lock-in", card3_desc: "You receive the complete HTML files. Host them anywhere, edit them with anyone, keep them forever.",
        card4_title: "International-ready", card4_desc: "Bank transfer in AUD, or crypto for clients abroad: Bitcoin (Taproot or Native SegWit), Ethereum, Solana."
      },
      process: {
        kicker: "How it works", title: "Three steps, no pressure",
        step1_title: "Tell me about your business", step1_desc: "A few details: what you do, who you serve, and what should stand out.",
        step2_title: "Review a free live mockup", step2_desc: "I build a working preview so you can see the real thing, not a sketch.",
        step3_title: "Pay only if you are happy", step3_desc: "If the mockup is right, we finish it together. If not, there is no charge."
      },
      pricing: {
        kicker: "Pricing", title: "$250–$450 AUD", subtitle: "≈ ¥1,150–¥2,100 CNY, negotiable by scope",
        desc: "I am currently building a portfolio of solid, real projects, so the pricing sits below typical agency rates. You still receive the complete HTML files, with no ongoing fees.",
        item1: "The finished HTML files, yours to keep", item2: "No monthly fees or subscriptions", item3: "Bank transfer (AUD) or crypto accepted",
        closing: "A clean, professional website is proof to your customers that the business behind it is real. It usually takes them seconds to decide.",
        cta: "Get a free preview"
      },
      faq: {
        kicker: "Questions", title: "Before you ask",
        q1: "Do I need to buy a domain or hosting separately?", a1: "Yes. I build the website itself; hosting and a domain are separate and inexpensive. I am happy to point you in the right direction.",
        q2: "What if I do not like the free preview?", a2: "Then we stop there. No charge, no obligation. The preview exists so you only pay for something you actually want.",
        q3: "Can I get extra pages or more languages?", a3: "Yes, both are possible. Tell me what you need and I will quote it as part of the scope.",
        q4: "How do international clients pay?", a4: "Bank transfer works for AUD. For clients abroad, I accept crypto: Bitcoin (Taproot or Native SegWit), Ethereum, or Solana."
      },
      contact: {
        kicker: "Get in touch", title: "Tell me about your business",
        desc: "Share a few details below and I will put together a free preview mockup for you to look at. Would you like one?",
        form_name: "Name", form_email: "Email", form_business: "Business name", form_business_optional: "(optional)", form_message: "Message",
        form_submit: "Send message", form_sending: "Sending...",
        form_success: "Message sent. I will get back to you at the email you provided.",
        form_error: "Something went wrong sending this. Opening your email app instead.",
        email_label: "Or email directly:", signoff1: "Best regards,", signoff2: "Michael, MK Digital"
      },
      footer: { tagline: "Independent studio. Showcase websites. No ongoing fees." },
      a11y: { skip: "Skip to content" },
      lang: { label: "Language" }
    },

    zh: {
      nav: { offer: "服务", process: "流程", pricing: "价格", contact: "联系", cta: "获取免费预览", menu_open: "打开菜单", menu_close: "关闭菜单" },
      hero: {
        kicker: "MK Digital · 独立工作室",
        headline: "客户联系你之前，会先看你的网站。",
        subcopy: "我为需要简洁、专业线上形象的企业制作干净、移动端优化的 HTML 网站。这些网站能让客户和合作伙伴轻松找到你、了解你的业务，并更放心地与你合作。",
        cta: "获取免费预览",
        cta_note: "先免费制作实时预览，满意后再付款。",
        card_label: "展示型网站",
        card_price_aud: "250–450 澳元",
        card_price_cny: "约 1,150–2,100 元人民币",
        card_note: "可根据需求协商",
        card_stat1: "0 月费",
        card_stat2: "HTML 文件归你所有"
      },
      offer: {
        kicker: "服务内容", title: "你将获得什么",
        card1_title: "移动优先的 HTML", card1_desc: "优先保证手机端的显示效果，再兼顾其他设备。不使用臃肿的建站工具，也没有容易出错的插件。",
        card2_title: "先看免费预览", card2_desc: "在花一分钱之前，先看到你网站的实时预览。如果不满意，随时可以放弃。",
        card3_title: "无绑定", card3_desc: "你将获得完整的 HTML 文件，可以放在任何地方托管，交给任何人修改，永久保留。",
        card4_title: "支持国际客户", card4_desc: "支持澳元银行转账，海外客户也可使用加密货币：比特币（Taproot 或 Native SegWit）、以太坊、Solana。"
      },
      process: {
        kicker: "工作流程", title: "三个步骤，没有压力",
        step1_title: "告诉我你的业务", step1_desc: "简单描述你做什么、服务对象是谁，以及希望突出的重点。",
        step2_title: "查看免费实时预览", step2_desc: "我会制作一个可用的预览网站，让你看到真实效果，而不是草图。",
        step3_title: "满意后再付款", step3_desc: "如果预览符合期望，我们再一起完成最终版本。如果不符合，则无需付费。"
      },
      pricing: {
        kicker: "价格", title: "250–450 澳元", subtitle: "约合 1,150–2,100 元人民币，可根据需求协商",
        desc: "我目前正在积累有分量的真实项目作品，因此定价低于一般代理机构的水平。你仍然会获得完整的 HTML 文件，且没有任何后续费用。",
        item1: "完整的 HTML 文件，归你所有", item2: "没有月费或订阅费用", item3: "支持澳元银行转账或加密货币付款",
        closing: "一个干净、专业的网站，能向客户证明这家企业是真实可信的。他们通常只需几秒钟就能做出判断。",
        cta: "获取免费预览"
      },
      faq: {
        kicker: "常见问题", title: "你可能想先了解",
        q1: "我需要单独购买域名或主机吗？", a1: "是的。我负责制作网站本身，域名和主机需要单独购买，费用不高。我也很乐意为你指点方向。",
        q2: "如果我不喜欢这个免费预览怎么办？", a2: "那我们就到此为止，无需付费，也没有任何义务。设置免费预览，就是为了让你只为真正想要的东西付款。",
        q3: "可以增加页面或语言版本吗？", a3: "可以，两者都可以实现。告诉我你的需求，我会将其计入报价范围。",
        q4: "海外客户如何付款？", a4: "澳元可通过银行转账支付。对于海外客户，我也接受加密货币：比特币（Taproot 或 Native SegWit）、以太坊或 Solana。"
      },
      contact: {
        kicker: "联系我", title: "告诉我你的业务",
        desc: "填写下面的信息，我会为你制作一个免费的预览网站。你愿意试试吗？",
        form_name: "姓名", form_email: "邮箱", form_business: "企业名称", form_business_optional: "（选填）", form_message: "留言",
        form_submit: "发送消息", form_sending: "发送中……",
        form_success: "消息已发送。我会通过你提供的邮箱与你联系。",
        form_error: "发送时出现问题，正在为你打开邮件应用。",
        email_label: "或直接发邮件：", signoff1: "此致，", signoff2: "Michael，MK Digital"
      },
      footer: { tagline: "独立工作室。展示型网站。无后续费用。" },
      a11y: { skip: "跳转到主要内容" },
      lang: { label: "语言" }
    },

    ja: {
      nav: { offer: "サービス内容", process: "進め方", pricing: "料金", contact: "お問い合わせ", cta: "無料プレビューを依頼", menu_open: "メニューを開く", menu_close: "メニューを閉じる" },
      hero: {
        kicker: "MK Digital・独立系スタジオ",
        headline: "お客様は連絡する前に、まずあなたのウェブサイトを見ています。",
        subcopy: "シンプルで信頼感のあるオンライン上の存在を求める企業向けに、モバイル最適化されたHTMLウェブサイトを制作しています。お客様や取引先があなたを見つけ、事業内容を理解し、安心して取引できるようになります。",
        cta: "無料プレビューを依頼",
        cta_note: "まず無料でライブプレビューを制作します。気に入った場合のみお支払いください。",
        card_label: "ショーケースサイト",
        card_price_aud: "250〜450豪ドル",
        card_price_cny: "約1,150〜2,100人民元相当",
        card_note: "内容により応相談",
        card_stat1: "月額費用 0円",
        card_stat2: "HTMLファイルはお客様のもの"
      },
      offer: {
        kicker: "サービス内容", title: "ご提供内容",
        card1_title: "モバイルファーストのHTML", card1_desc: "まずスマートフォンで正しく表示されるよう設計し、他のデバイスにも対応します。重いビルダーや壊れやすいプラグインは使いません。",
        card2_title: "まず無料プレビュー", card2_desc: "お支払いの前に、実際のサイトのライブプレビューをご確認いただけます。気に入らなければ、そこで終了できます。",
        card3_title: "縛りなし", card3_desc: "完成したHTMLファイル一式をお渡しします。どこでもホスティングでき、誰にでも編集を依頼でき、ずっとお使いいただけます。",
        card4_title: "海外にも対応", card4_desc: "豪ドルの銀行振込のほか、海外のお客様には仮想通貨もご利用いただけます。ビットコイン（TaprootまたはNative SegWit）、イーサリアム、ソラナに対応しています。"
      },
      process: {
        kicker: "進め方", title: "3つのステップ、プレッシャーなし",
        step1_title: "事業内容を教えてください", step1_desc: "何をしているか、どんなお客様に向けたものか、強調したいポイントなど、簡単な情報をお聞きします。",
        step2_title: "無料のライブプレビューを確認", step2_desc: "実際に動作するプレビューを制作しますので、スケッチではなく完成に近い形でご確認いただけます。",
        step3_title: "気に入った場合のみお支払い", step3_desc: "プレビューにご満足いただければ、一緒に仕上げていきます。ご満足いただけない場合は、費用は一切発生しません。"
      },
      pricing: {
        kicker: "料金", title: "250〜450豪ドル", subtitle: "約1,150〜2,100人民元相当、内容により応相談",
        desc: "現在、実績のあるプロジェクトを増やしている段階のため、一般的な制作会社より低い料金を設定しています。完成したHTMLファイル一式をお渡しし、追加費用は発生しません。",
        item1: "完成したHTMLファイル一式をお渡しします", item2: "月額費用やサブスクリプションはありません", item3: "豪ドルの銀行振込または仮想通貨に対応",
        closing: "清潔感のあるプロフェッショナルなウェブサイトは、お客様に事業の信頼性を伝える証拠になります。多くの場合、判断には数秒しかかかりません。",
        cta: "無料プレビューを依頼"
      },
      faq: {
        kicker: "よくある質問", title: "お問い合わせの前に",
        q1: "ドメインやホスティングは別途購入が必要ですか？", a1: "はい。ウェブサイト自体の制作を担当しますが、ホスティングとドメインは別途、比較的安価にご用意いただく必要があります。ご案内もいたします。",
        q2: "無料プレビューが気に入らなかった場合は？", a2: "その場合は、そこで終了となります。費用は一切発生せず、義務もありません。無料プレビューは、本当に欲しいものにだけお支払いいただくために用意しています。",
        q3: "ページの追加や多言語対応はできますか？", a3: "はい、どちらも可能です。ご希望の内容をお知らせいただければ、見積もりに含めてご提案します。",
        q4: "海外のお客様はどのようにお支払いできますか？", a4: "豪ドルは銀行振込でお支払いいただけます。海外のお客様には、ビットコイン（TaprootまたはNative SegWit）、イーサリアム、ソラナによる仮想通貨でのお支払いにも対応しています。"
      },
      contact: {
        kicker: "お問い合わせ", title: "事業内容を教えてください",
        desc: "以下に簡単な情報をご入力いただければ、無料のプレビューモックアップを制作いたします。ご依頼になりますか？",
        form_name: "お名前", form_email: "メールアドレス", form_business: "事業者名", form_business_optional: "（任意）", form_message: "メッセージ",
        form_submit: "送信する", form_sending: "送信中……",
        form_success: "メッセージを送信しました。ご入力いただいたメールアドレス宛にご連絡いたします。",
        form_error: "送信に問題が発生しました。メールアプリを開きます。",
        email_label: "または直接メールする：", signoff1: "よろしくお願いいたします。", signoff2: "Michael、MK Digital"
      },
      footer: { tagline: "独立系スタジオ。ショーケースサイト制作。追加費用なし。" },
      a11y: { skip: "メインコンテンツへ移動" },
      lang: { label: "言語" }
    },

    es: {
      nav: { offer: "Servicio", process: "Proceso", pricing: "Precio", contact: "Contacto", cta: "Solicitar vista previa gratis", menu_open: "Abrir menú", menu_close: "Cerrar menú" },
      hero: {
        kicker: "MK Digital · Estudio independiente",
        headline: "Antes de llamarte, revisan tu sitio web.",
        subcopy: "Creo sitios web en HTML, limpios y optimizados para móvil, para empresas que quieren una presencia online simple y profesional. Ayudan a que clientes y socios te encuentren, entiendan lo que ofreces y confíen en trabajar contigo.",
        cta: "Solicitar vista previa gratis",
        cta_note: "Primero una maqueta gratuita en vivo. Pagas solo si te gusta.",
        card_label: "Sitio web de presentación",
        card_price_aud: "250–450 AUD",
        card_price_cny: "≈ 1.150–2.100 CNY",
        card_note: "Negociable según el alcance",
        card_stat1: "0 cuotas mensuales",
        card_stat2: "Archivos HTML de tu propiedad"
      },
      offer: {
        kicker: "La propuesta", title: "Qué recibes",
        card1_title: "HTML pensado para móvil", card1_desc: "Diseñado para verse bien en el celular primero, y en todo lo demás después. Sin constructores pesados ni complementos que fallan.",
        card2_title: "Vista previa gratis primero", card2_desc: "Ves una maqueta en vivo de tu sitio real antes de pagar nada. Si no te convence, no sigues.",
        card3_title: "Sin ataduras", card3_desc: "Recibes los archivos HTML completos. Aloja tu sitio donde quieras, edítalo con quien quieras, consérvalo para siempre.",
        card4_title: "Listo para clientes internacionales", card4_desc: "Transferencia bancaria en AUD, o criptomonedas para clientes en el extranjero: Bitcoin (Taproot o Native SegWit), Ethereum, Solana."
      },
      process: {
        kicker: "Cómo funciona", title: "Tres pasos, sin presión",
        step1_title: "Cuéntame sobre tu negocio", step1_desc: "Algunos detalles: a qué te dedicas, a quién sirves y qué debería destacarse.",
        step2_title: "Revisa una maqueta gratuita en vivo", step2_desc: "Construyo una vista previa funcional para que veas el resultado real, no un boceto.",
        step3_title: "Pagas solo si estás conforme", step3_desc: "Si la maqueta te convence, la terminamos juntos. Si no, no hay ningún cargo."
      },
      pricing: {
        kicker: "Precio", title: "250–450 AUD", subtitle: "≈ 1.150–2.100 CNY, negociable según el alcance",
        desc: "Actualmente estoy construyendo un portafolio de proyectos sólidos y reales, por eso el precio está por debajo del de una agencia típica. Igual recibes los archivos HTML completos, sin cuotas posteriores.",
        item1: "Los archivos HTML terminados, para siempre", item2: "Sin cuotas mensuales ni suscripciones", item3: "Aceptamos transferencia bancaria (AUD) o criptomonedas",
        closing: "Un sitio web limpio y profesional demuestra a tus clientes que el negocio detrás es real. Normalmente deciden en segundos.",
        cta: "Solicitar vista previa gratis"
      },
      faq: {
        kicker: "Preguntas", title: "Antes de escribir",
        q1: "¿Necesito comprar dominio y hosting por separado?", a1: "Sí. Yo construyo el sitio web; el hosting y el dominio son aparte y económicos. Con gusto te oriento en eso.",
        q2: "¿Y si no me gusta la vista previa gratuita?", a2: "Entonces terminamos ahí. Sin cargo, sin compromiso. La vista previa existe para que solo pagues por algo que realmente quieres.",
        q3: "¿Puedo agregar páginas o más idiomas?", a3: "Sí, ambas cosas son posibles. Cuéntame lo que necesitas y lo incluyo en el presupuesto.",
        q4: "¿Cómo pagan los clientes internacionales?", a4: "La transferencia bancaria funciona para AUD. Para clientes en el extranjero, acepto criptomonedas: Bitcoin (Taproot o Native SegWit), Ethereum o Solana."
      },
      contact: {
        kicker: "Hablemos", title: "Cuéntame sobre tu negocio",
        desc: "Comparte algunos datos abajo y te preparo una maqueta de vista previa gratuita. ¿Te gustaría?",
        form_name: "Nombre", form_email: "Correo electrónico", form_business: "Nombre del negocio", form_business_optional: "(opcional)", form_message: "Mensaje",
        form_submit: "Enviar mensaje", form_sending: "Enviando…",
        form_success: "Mensaje enviado. Te responderé al correo que indicaste.",
        form_error: "Hubo un problema al enviar esto. Abriendo tu aplicación de correo.",
        email_label: "O escribe directamente a:", signoff1: "Saludos,", signoff2: "Michael, MK Digital"
      },
      footer: { tagline: "Estudio independiente. Sitios de presentación. Sin cuotas posteriores." },
      a11y: { skip: "Saltar al contenido" },
      lang: { label: "Idioma" }
    }
  };

  var SUPPORTED = Object.keys(dict);

  function getNested(obj, path) {
    var parts = path.split(".");
    var cur = obj;
    for (var i = 0; i < parts.length; i++) {
      if (cur == null) return null;
      cur = cur[parts[i]];
    }
    return cur;
  }

  function detectInitialLang() {
    try {
      var stored = localStorage.getItem(LANG_KEY);
      if (stored && SUPPORTED.indexOf(stored) !== -1) return stored;
    } catch (e) {}
    return "en";
  }

  var currentLang = detectInitialLang();

  function applyLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = "en";
    currentLang = lang;
    var table = dict[lang];

    document.documentElement.setAttribute("lang", lang);

    var nodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      var key = nodes[i].getAttribute("data-i18n");
      var value = getNested(table, key);
      if (typeof value === "string") {
        nodes[i].textContent = value;
      }
    }

    updateMenuLabel();

    var select = document.getElementById("lang-select");
    if (select && select.value !== lang) select.value = lang;

    try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
  }

  function t(key) {
    var value = getNested(dict[currentLang], key);
    return typeof value === "string" ? value : getNested(dict.en, key);
  }

  /* ---------------- mobile menu ---------------- */
  var toggle = document.getElementById("menu-toggle");
  var mobileNav = document.getElementById("mobile-nav");

  function updateMenuLabel() {
    if (!toggle) return;
    var label = toggle.querySelector(".visually-hidden");
    if (!label) return;
    var expanded = toggle.getAttribute("aria-expanded") === "true";
    label.textContent = expanded ? t("nav.menu_close") : t("nav.menu_open");
  }

  function closeMenu() {
    if (!toggle || !mobileNav) return;
    toggle.setAttribute("aria-expanded", "false");
    mobileNav.hidden = true;
    updateMenuLabel();
  }

  function openMenu() {
    if (!toggle || !mobileNav) return;
    toggle.setAttribute("aria-expanded", "true");
    mobileNav.hidden = false;
    updateMenuLabel();
  }

  if (toggle && mobileNav) {
    toggle.addEventListener("click", function () {
      var expanded = toggle.getAttribute("aria-expanded") === "true";
      if (expanded) closeMenu(); else openMenu();
    });

    mobileNav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        closeMenu();
        toggle.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth >= 960) closeMenu();
    });
  }

  /* ---------------- language switcher ---------------- */
  var langSelect = document.getElementById("lang-select");
  if (langSelect) {
    langSelect.value = currentLang;
    langSelect.addEventListener("change", function () {
      applyLang(langSelect.value);
    });
  }

  applyLang(currentLang);

  /* ---------------- hero entrance ---------------- */
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      document.body.classList.add("is-ready");
    });
  });

  /* ---------------- contact form ---------------- */
  var form = document.getElementById("contact-form");
  var statusEl = document.getElementById("form-status");
  var submitBtn = document.getElementById("submit-btn");

  function setStatus(text, state) {
    if (!statusEl) return;
    statusEl.textContent = text || "";
    if (state) statusEl.setAttribute("data-state", state);
    else statusEl.removeAttribute("data-state");
  }

  function buildMailtoFallback(fields) {
    var subject = "MK Digital - new website enquiry";
    var lines = [
      "Name: " + fields.name,
      "Email: " + fields.email,
      "Business: " + (fields.business || "-"),
      "Language: " + fields.language,
      "",
      fields.message
    ];
    var body = lines.join("\n");
    return "mailto:" + CONTACT_EMAIL + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (typeof form.reportValidity === "function" && !form.reportValidity()) {
        return;
      }

      var fields = {
        name: form.elements["name"].value.trim(),
        email: form.elements["email"].value.trim(),
        business: form.elements["business"] ? form.elements["business"].value.trim() : "",
        message: form.elements["message"].value.trim(),
        language: currentLang,
        honey: form.elements["_honey"] ? form.elements["_honey"].value : ""
      };

      if (!fields.name || !fields.email || !fields.message) {
        setStatus(t("contact.form_error"), "error");
        return;
      }

      // Honeypot tripped: silently treat as handled, no network call.
      if (fields.honey) {
        form.reset();
        setStatus(t("contact.form_success"), "success");
        return;
      }

      submitBtn.disabled = true;
      setStatus(t("contact.form_sending"));

      var payload = {
        name: fields.name,
        email: fields.email,
        business_name: fields.business,
        message: fields.message,
        language: fields.language,
        _subject: "MK Digital - new website enquiry",
        _captcha: "false"
      };

      fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      })
        .then(function (res) {
          if (!res.ok) throw new Error("Request failed");
          return res.json().catch(function () { return {}; });
        })
        .then(function () {
          submitBtn.disabled = false;
          form.reset();
          setStatus(t("contact.form_success"), "success");
        })
        .catch(function () {
          submitBtn.disabled = false;
          setStatus(t("contact.form_error"), "error");
          window.location.href = buildMailtoFallback(fields);
        });
    });
  }
})();

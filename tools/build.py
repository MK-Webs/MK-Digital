#!/usr/bin/env python3
"""Assemble the MK Digital site from one shared shell plus per-page bodies.

    python3 build.py

Writes the .html pages next to styles.css, and preview.html one level up
(a single self-contained file, handy for sending someone a look at it).

English copy is pulled out of i18n.js and baked into the HTML, so every page
reads correctly with JavaScript switched off and for search engines.
Set SITE_URL to the real domain before publishing.
"""

import base64
import json
import pathlib
import re
import subprocess

ROOT = pathlib.Path(__file__).parent.parent / "site"
SITE_URL = "https://mkdigital.site"
EMAIL = "rothschild535@gmail.com"

NAV = [
    ("work", "work.html"),
    ("offer", "offer.html"),
    ("process", "process.html"),
    ("included", "included.html"),
    ("pricing", "pricing.html"),
    ("contact", "contact.html"),
]


def load_english():
    """Read the translation file through node so the JS stays the one source."""
    script = (
        "global.window={};require(%s);"
        "process.stdout.write(JSON.stringify(global.window.MK_I18N.en));"
        % json.dumps(str(ROOT / "i18n.js"))
    )
    return json.loads(subprocess.run(["node", "-e", script], capture_output=True, check=True).stdout)


EN = load_english()


def en(path, default=""):
    value = EN
    for key in path.split("."):
        if not isinstance(value, dict) or key not in value:
            return default
        value = value[key]
    return value if isinstance(value, str) else default


def esc(text):
    return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


# --------------------------------------------------------------------------- head

JSONLD = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "MK Digital",
    "description": "Independent web studio building showcase websites for small businesses.",
    "url": SITE_URL,
    "email": EMAIL,
    "image": SITE_URL + "/assets/og-image.png",
    "priceRange": "A$250-A$450",
    "areaServed": "Worldwide",
    "knowsLanguage": ["en", "zh", "ja", "es"],
    "address": {
        "@type": "PostalAddress",
        "addressLocality": "Brisbane",
        "addressRegion": "QLD",
        "addressCountry": "AU",
    },
    "makesOffer": {
        "@type": "Offer",
        "name": "Showcase website",
        "description": "A mobile-first showcase website delivered as plain HTML, CSS and JavaScript files, with no ongoing fees.",
        "priceCurrency": "AUD",
        "price": "250",
    },
}

HEAD = """<!doctype html>
<html lang="en" data-theme="ink">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta name="theme-color" content="#0b0b0c">
<meta name="color-scheme" content="dark light">
<meta name="author" content="MK Digital">
<link rel="canonical" href="{canonical}">

<meta property="og:type" content="website">
<meta property="og:site_name" content="MK Digital">
<meta property="og:locale" content="en_AU">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:url" content="{canonical}">
<meta property="og:image" content="{site}/assets/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="MK Digital">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{title}">
<meta name="twitter:description" content="{desc}">
<meta name="twitter:image" content="{site}/assets/og-image.png">

<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
<link rel="icon" href="assets/favicon-32.png" sizes="32x32">
<link rel="apple-touch-icon" href="assets/apple-touch-icon.png">
<link rel="manifest" href="site.webmanifest">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@400..800&family=Newsreader:ital,opsz,wght@0,6..72,300..600;1,6..72,300..600&display=swap">
{styles}
<script type="application/ld+json">{jsonld}</script>
</head>
<body data-page="{page}">
<div class="progress" data-progress aria-hidden="true"></div>
<div class="ambient" aria-hidden="true"></div>
<div class="grain" aria-hidden="true"></div>
<div class="cursor-glow" aria-hidden="true"></div>
<a class="skip-link" href="#main">Skip to content</a>
"""

SUN = ('<svg class="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" '
       'aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.6v2.2M12 19.2v2.2M4.2 12H2M22 12h-2.2'
       'M6.3 6.3 4.8 4.8M19.2 19.2l-1.5-1.5M6.3 17.7l-1.5 1.5M19.2 4.8l-1.5 1.5"/></svg>')
MOON = ('<svg class="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" '
        'aria-hidden="true"><path d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.2 8.2 0 1 0 10.2 10.2z"/></svg>')


def nav_links(page, mobile=False):
    out = []
    for key, href in NAV:
        current = ' aria-current="page"' if key == page else ""
        out.append(f'<a href="{href}" data-t="nav.{key}"{current}>{esc(en("nav." + key))}</a>')
    if mobile:
        out.append(f'<a class="btn btn-primary" href="contact.html" data-t="nav.cta">{esc(en("nav.cta"))}</a>')
    return "\n        ".join(out)


def lang_select(ident):
    return f"""<div class="lang">
          <label class="sr-only" for="{ident}" data-t="nav.language">Language</label>
          <select id="{ident}" data-lang-select>
            <option value="en">EN</option>
            <option value="zh">中文</option>
            <option value="ja">日本語</option>
            <option value="es">ES</option>
          </select>
        </div>"""


def header(page):
    return f"""<header class="site-header">
  <div class="wrap">
    <div class="nav">
      <a class="brand" href="index.html">
        <span class="brand-mark"><img src="assets/mk-digital-logo.png" alt="" width="27" height="18"></span>
        <span>
          <span class="brand-name">MK Digital</span>
          <span class="brand-sub">Independent web studio</span>
        </span>
      </a>
      <nav class="nav-links" aria-label="Main">
        {nav_links(page)}
      </nav>
      <div class="nav-tools">
        <button class="icon-btn theme-toggle" type="button" data-theme-toggle aria-pressed="false"
                data-t-label="nav.theme" aria-label="{esc(en('nav.theme'))}">{SUN}{MOON}</button>
        {lang_select('lang-select')}
        <a class="btn btn-primary nav-desktop-cta" href="contact.html" data-t="nav.cta">{esc(en('nav.cta'))}</a>
        <button class="icon-btn burger" type="button" data-burger aria-expanded="false" aria-controls="mobile-menu"
                aria-label="{esc(en('nav.menu'))}"><span></span><span></span><span></span></button>
      </div>
    </div>
    <div class="mobile-menu" id="mobile-menu" data-menu>
      <div>
        {nav_links(page, mobile=True)}
      </div>
    </div>
  </div>
</header>
<main id="main">
"""


def footer(scripts):
    return f"""</main>
<footer class="site-footer">
  <div class="wrap">
    <div class="footer-grid">
      <div>
        <a class="brand" href="index.html" style="margin-bottom:14px">
          <span class="brand-mark"><img src="assets/mk-digital-logo.png" alt="" width="27" height="18"></span>
          <span><span class="brand-name">MK Digital</span></span>
        </a>
        <p class="prose" style="font-size:.875rem;max-width:34ch" data-t="footer.tagline"></p>
      </div>
      <nav class="footer-nav" aria-label="Footer">
        <span class="footer-title" data-t="footer.pages"></span>
        <a href="index.html" data-t="nav.home"></a>
        <a href="work.html" data-t="nav.work"></a>
        <a href="offer.html" data-t="nav.offer"></a>
        <a href="process.html" data-t="nav.process"></a>
        <a href="included.html" data-t="nav.included"></a>
        <a href="pricing.html" data-t="nav.pricing"></a>
      </nav>
      <div class="footer-nav">
        <span class="footer-title" data-t="footer.reach"></span>
        <a href="contact.html" data-t="nav.contact"></a>
        <a href="mailto:{EMAIL}">{EMAIL}</a>
        <p class="prose" style="font-size:.8125rem;margin-top:6px" data-t="footer.based"></p>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; <span data-year>2026</span> MK Digital. <span data-t="footer.rights"></span></span>
      <a href="#main" data-t="ui.top"></a>
    </div>
  </div>
</footer>
<button class="to-top" type="button" data-to-top data-t-label="ui.top" aria-label="{esc(en('ui.top'))}">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true" width="17" height="17"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
</button>
{scripts}
</body>
</html>
"""


# --------------------------------------------------------------------------- blocks

def page_hero(page):
    return f"""<section class="section section--tight">
  <div class="wrap">
    <h1 class="reveal" style="font-size:var(--step-4);max-width:19ch" data-t="{page}.heading"></h1>
    <p class="lede reveal" style="margin-top:20px" data-t="{page}.intro"></p>
  </div>
</section>
"""


def cta_band(page):
    return f"""<section class="section">
  <div class="wrap">
    <div class="cta reveal">
      <div>
        <h2 data-t="{page}.ctaTitle"></h2>
        <p data-t="{page}.ctaCopy"></p>
      </div>
      <a class="btn btn-primary" href="contact.html" data-t="{page}.ctaBtn"></a>
    </div>
  </div>
</section>
"""


DEMO_BUTTONS = """<div class="switcher" role="group" aria-label="Choose an example">
        <button type="button" data-demo="cafe" aria-pressed="true" data-t="work.tabCafe"></button>
        <button type="button" data-demo="trades" aria-pressed="false" data-t="work.tabTrades"></button>
        <button type="button" data-demo="salon" aria-pressed="false" data-t="work.tabSalon"></button>
        <button type="button" data-demo="clinic" aria-pressed="false" data-t="work.tabClinic"></button>
      </div>"""


# --------------------------------------------------------------------------- pages

HOME = """<section class="hero">
  <div class="wrap hero-grid">
    <div>
      <h1 class="reveal" style="--i:0" data-t="home.headline"></h1>
      <p class="lede reveal" style="--i:1" data-t="home.sub"></p>
      <p class="typing reveal" style="--i:2"><span data-t="home.typedPrefix"></span> <i data-typed></i><span class="caret" aria-hidden="true"></span></p>
      <div class="hero-actions reveal" style="--i:3">
        <a class="btn btn-primary" href="contact.html" data-t="home.cta"></a>
        <a class="btn btn-ghost" href="pricing.html" data-t="home.cta2"></a>
      </div>
      <div class="hero-facts reveal" style="--i:4">
        <span data-t="home.fact1"></span>
        <span data-t="home.fact2"></span>
        <span data-t="home.fact3"></span>
      </div>
    </div>

    <div class="stage reveal" style="--i:2" data-demo-group data-demo-start="cafe">
      <div class="phone" data-tilt>
        <div class="phone-screen">
          <span class="phone-notch" aria-hidden="true"></span>
          <div class="phone-status" aria-hidden="true">
            <span>9:41</span>
            <span class="phone-bars"><i></i><i></i><i></i></span>
          </div>
          <div class="phone-loading" data-t="ui.loading"></div>
          <iframe data-demo-frame title="Example website preview" loading="lazy" scrolling="no" tabindex="-1"></iframe>
        </div>
      </div>
      DEMO_BUTTONS
      <p class="switcher-note" data-t="home.demoNote"></p>
    </div>
  </div>
</section>

<section class="strip">
  <h2 class="sr-only" data-t="home.stripTitle"></h2>
  <div class="strip-track" aria-hidden="true">
    STRIP_ITEMS
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="head reveal">
      <h2 data-t="home.whatTitle"></h2>
      <p class="lede" data-t="home.whatIntro"></p>
    </div>
    <div class="rows">
      <div class="row reveal"><h3 data-t="offer.c1"></h3><p data-t="offer.d1"></p></div>
      <div class="row reveal"><h3 data-t="offer.c2"></h3><p data-t="offer.d2"></p></div>
      <div class="row reveal"><h3 data-t="offer.c3"></h3><p data-t="offer.d3"></p></div>
      <div class="row reveal"><h3 data-t="offer.c4"></h3><p data-t="offer.d4"></p></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="head reveal">
      <h2 data-t="home.proofTitle"></h2>
      <p class="lede" data-t="home.proofCopy"></p>
    </div>
    <a class="btn btn-ghost reveal" href="work.html" data-t="home.proofCta"></a>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="head reveal">
      <h2 data-t="home.stepsTitle"></h2>
      <p class="lede" data-t="home.stepsIntro"></p>
    </div>
    <ol class="steps">
      <li class="step reveal"><div><h3 data-t="process.s1"></h3><p data-t="process.sd1"></p></div></li>
      <li class="step reveal"><div><h3 data-t="process.s2"></h3><p data-t="process.sd2"></p></div></li>
      <li class="step reveal"><div><h3 data-t="process.s3"></h3><p data-t="process.sd3"></p></div></li>
    </ol>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="price-layout">
      PRICE_BLOCK
      <div class="price-aside reveal">
        <h3 data-t="home.priceTitle"></h3>
        <p class="prose" data-t="pricing.whyCopy"></p>
        <p class="prose" data-t="pricing.closing"></p>
        <p style="margin-top:22px"><a class="btn-quiet" href="included.html" data-t="home.priceCta"></a></p>
      </div>
    </div>
  </div>
</section>

CTA_HOME
"""

PRICE_BLOCK = """<div class="price-block reveal">
        <p style="font-size:var(--step--1);opacity:.65" data-t="pricing.showcase"></p>
        <p class="price-figure" style="margin-top:10px" data-t="pricing.price"></p>
        <p class="price-meta" data-t="pricing.currency"></p>
        <ul class="price-list">
          <li data-t="pricing.b1"></li>
          <li data-t="pricing.b2"></li>
          <li data-t="pricing.b3"></li>
          <li data-t="pricing.b4"></li>
        </ul>
        <a class="btn btn-primary" href="contact.html" data-t="pricing.pricingBtn"></a>
      </div>"""

STRIP_WORDS = ["Cafés", "Electricians", "Hair studios", "Dental practices", "Plumbers", "Bakeries",
               "Physiotherapists", "Tattoo studios", "Landscapers", "Accountants", "Florists",
               "Driving schools"]

WORK = """<section class="section section--tight">
  <div class="wrap">
    <h1 class="reveal" style="font-size:var(--step-4);max-width:19ch" data-t="work.heading"></h1>
    <p class="lede reveal" style="margin-top:20px" data-t="work.intro"></p>
  </div>
</section>

<section class="section section--tight">
  <div class="wrap" data-demo-group data-demo-start="cafe">
    <div style="margin-bottom:22px">DEMO_BUTTONS</div>
    <div class="work-stage">
      <div class="browser reveal">
        <div class="browser-bar">
          <div class="browser-dots" aria-hidden="true"><i></i><i></i><i></i></div>
          <div class="browser-url" data-demo-url>hazelandfern.example</div>
        </div>
        <div class="browser-frame">
          <div class="phone-loading" data-t="ui.loading"></div>
          <iframe data-demo-frame title="Example website" loading="lazy"></iframe>
        </div>
      </div>

      <div class="work-meta">
        <div data-demo-panel="cafe">
          <p class="context" data-t="work.cafeKind"></p>
          <h3 style="margin-top:6px" data-t="work.cafeName"></h3>
          <p class="prose" style="margin-top:12px;font-size:.9375rem" data-t="work.cafeCopy"></p>
        </div>
        <div data-demo-panel="trades" hidden>
          <p class="context" data-t="work.tradesKind"></p>
          <h3 style="margin-top:6px" data-t="work.tradesName"></h3>
          <p class="prose" style="margin-top:12px;font-size:.9375rem" data-t="work.tradesCopy"></p>
        </div>
        <div data-demo-panel="salon" hidden>
          <p class="context" data-t="work.salonKind"></p>
          <h3 style="margin-top:6px" data-t="work.salonName"></h3>
          <p class="prose" style="margin-top:12px;font-size:.9375rem" data-t="work.salonCopy"></p>
        </div>
        <div data-demo-panel="clinic" hidden>
          <p class="context" data-t="work.clinicKind"></p>
          <h3 style="margin-top:6px" data-t="work.clinicName"></h3>
          <p class="prose" style="margin-top:12px;font-size:.9375rem" data-t="work.clinicCopy"></p>
        </div>

        <div class="work-tags" aria-hidden="true">
          <span>HTML</span><span>CSS</span><span>Responsive</span><span>No frameworks</span>
        </div>

        <a class="btn btn-ghost" data-demo-link href="demos/cafe.html" target="_blank" rel="noopener"
           data-t="ui.openDemo"></a>
      </div>
    </div>

    <p class="disclosure reveal" style="margin-top:28px" data-t="work.disclosure"></p>
  </div>
</section>

CTA_WORK
"""

OFFER = """PAGE_HERO
<section class="section section--tight">
  <div class="wrap">
    <div class="rows">
      <div class="row reveal"><h3 data-t="offer.c1"></h3><p data-t="offer.d1"></p></div>
      <div class="row reveal"><h3 data-t="offer.c2"></h3><p data-t="offer.d2"></p></div>
      <div class="row reveal"><h3 data-t="offer.c3"></h3><p data-t="offer.d3"></p></div>
      <div class="row reveal"><h3 data-t="offer.c4"></h3><p data-t="offer.d4"></p></div>
    </div>
  </div>
</section>
CTA_OFFER
"""

PROCESS = """PAGE_HERO
<section class="section section--tight">
  <div class="wrap">
    <ol class="steps">
      <li class="step reveal"><div><h3 data-t="process.s1"></h3><p data-t="process.sd1"></p></div></li>
      <li class="step reveal"><div><h3 data-t="process.s2"></h3><p data-t="process.sd2"></p></div></li>
      <li class="step reveal"><div><h3 data-t="process.s3"></h3><p data-t="process.sd3"></p></div></li>
    </ol>
  </div>
</section>
CTA_PROCESS
"""

INCLUDED = """PAGE_HERO
<section class="section section--tight">
  <div class="wrap">
    <ul class="spec">
      <li class="reveal"><strong data-t="included.i1"></strong><span data-t="included.id1"></span></li>
      <li class="reveal"><strong data-t="included.i2"></strong><span data-t="included.id2"></span></li>
      <li class="reveal"><strong data-t="included.i3"></strong><span data-t="included.id3"></span></li>
      <li class="reveal"><strong data-t="included.i4"></strong><span data-t="included.id4"></span></li>
      <li class="reveal"><strong data-t="included.i5"></strong><span data-t="included.id5"></span></li>
      <li class="reveal"><strong data-t="included.i6"></strong><span data-t="included.id6"></span></li>
    </ul>
  </div>
</section>
CTA_INCLUDED
"""

PRICING = """PAGE_HERO
<section class="section section--tight">
  <div class="wrap">
    <div class="price-layout">
      PRICE_BLOCK
      <div class="price-aside reveal">
        <h3 data-t="pricing.why"></h3>
        <p class="prose" data-t="pricing.whyCopy"></p>
        <p class="prose" data-t="pricing.closing"></p>
        <p class="context" style="margin-top:26px" data-t="pricing.payTitle"></p>
        <div class="pay-methods">
          <span data-t="pricing.pay1"></span>
          <span data-t="pricing.pay2"></span>
          <span data-t="pricing.pay3"></span>
          <span data-t="pricing.pay4"></span>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="head reveal"><h2 data-t="pricing.qTitle"></h2></div>
    <div class="faq">
      <details open><summary data-t="pricing.q1"></summary><p data-t="pricing.a1"></p></details>
      <details><summary data-t="pricing.q2"></summary><p data-t="pricing.a2"></p></details>
      <details><summary data-t="pricing.q3"></summary><p data-t="pricing.a3"></p></details>
      <details><summary data-t="pricing.q4"></summary><p data-t="pricing.a4"></p></details>
      <details><summary data-t="pricing.q5"></summary><p data-t="pricing.a5"></p></details>
      <details><summary data-t="pricing.q6"></summary><p data-t="pricing.a6"></p></details>
    </div>
  </div>
</section>
CTA_PRICING
"""

CONTACT = """PAGE_HERO
<section class="section section--tight">
  <div class="wrap">
    <div class="contact-layout">
      <div class="reveal">
        <h2 style="font-size:var(--step-2)" data-t="contact.cardTitle"></h2>
        <p class="prose" style="margin-top:16px" data-t="contact.p1"></p>
        <p class="prose" data-t="contact.p2"></p>
        <div class="copy-line">
          <span class="context" data-t="contact.email"></span>
          <a href="mailto:__EMAIL__">__EMAIL__</a>
          <button class="copy-btn" type="button" data-copy="__EMAIL__" data-t="ui.copy"></button>
        </div>
      </div>

      <form class="form-card reveal" id="enquiry" novalidate>
        <div class="form-grid">
          <div class="field" data-field="name">
            <label for="f-name" data-t="contact.name"></label>
            <input id="f-name" name="name" type="text" autocomplete="name" required>
            <span class="field-error" aria-live="polite"></span>
          </div>
          <div class="field" data-field="email">
            <label for="f-email" data-t="contact.emailField"></label>
            <input id="f-email" name="email" type="email" autocomplete="email" required>
            <span class="field-error" aria-live="polite"></span>
          </div>
          <div class="field" data-field="business">
            <label for="f-business"><span data-t="contact.business"></span> <em data-t="contact.optional"></em></label>
            <input id="f-business" name="business" type="text" autocomplete="organization">
          </div>
          <div class="field" data-field="budget">
            <label for="f-budget" data-t="contact.budget"></label>
            <select id="f-budget" name="budget">
              <option value="" data-t="contact.choose"></option>
              <option data-t="contact.budget1"></option>
              <option data-t="contact.budget2"></option>
              <option data-t="contact.budget3"></option>
              <option data-t="contact.budget4"></option>
            </select>
          </div>
          <div class="field full" data-field="message">
            <label for="f-message" data-t="contact.message"></label>
            <textarea id="f-message" name="message" maxlength="1200" required
                      data-t-placeholder="contact.placeholder"
                      placeholder="__PLACEHOLDER__"></textarea>
            <span class="char-count" data-count aria-hidden="true">0 / 1200</span>
            <span class="field-error" aria-live="polite"></span>
          </div>
          <div class="hp" aria-hidden="true">
            <label for="_honey">Leave this empty</label>
            <input id="_honey" name="_honey" tabindex="-1" autocomplete="off">
          </div>
        </div>
        <div class="form-foot">
          <button class="btn btn-primary" type="submit" data-t="contact.submit"></button>
          <p class="form-note" data-t="contact.note"></p>
        </div>
        <p class="form-status" id="form-status" role="status" aria-live="polite"></p>
      </form>
    </div>
  </div>
</section>
"""

NOTFOUND = """<section class="section">
  <div class="wrap">
    <p class="context">404</p>
    <h1 style="font-size:var(--step-4);margin-top:12px;max-width:16ch" data-t="notfound.heading"></h1>
    <p class="lede" style="margin-top:20px" data-t="notfound.copy"></p>
    <p style="margin-top:30px"><a class="btn btn-primary" href="index.html" data-t="notfound.btn"></a></p>
  </div>
</section>
"""

BODIES = {
    "home": ("index.html", HOME),
    "work": ("work.html", WORK),
    "offer": ("offer.html", OFFER),
    "process": ("process.html", PROCESS),
    "included": ("included.html", INCLUDED),
    "pricing": ("pricing.html", PRICING),
    "contact": ("contact.html", CONTACT),
    "notfound": ("404.html", NOTFOUND),
}

EMPTY_TAG = re.compile(r'(<(\w+)(?=[\s>])[^>]*\bdata-t="([^"]+)"[^>]*>)</\2>')


def fill_english(html):
    """Bake the English string into any element that relies on data-t."""
    missing = []

    def swap(match):
        key = match.group(3)
        text = en(key)
        if not text:
            missing.append(key)
        return match.group(1) + esc(text) + "</" + match.group(2) + ">"

    out = EMPTY_TAG.sub(swap, html)
    return out, missing


def build_body(page, body):
    text = body.replace("PAGE_HERO", page_hero(page))
    text = text.replace("DEMO_BUTTONS", DEMO_BUTTONS)
    text = text.replace("PRICE_BLOCK", PRICE_BLOCK)
    text = text.replace("STRIP_ITEMS", "\n    ".join(
        f"<span>{esc(word)}</span>" for word in STRIP_WORDS * 2))
    text = text.replace("__EMAIL__", EMAIL)
    text = text.replace("__PLACEHOLDER__", esc(en("contact.placeholder")))
    for key in ("home", "work", "offer", "process", "included", "pricing"):
        text = text.replace("CTA_" + key.upper(), cta_band(key))
    return text


ROUTER = """
<script>
/* Single-file build only: every page lives in this document, one shown at a time. */
(function () {
  var routes = document.querySelectorAll("[data-route]");
  function show(name) {
    var found = false;
    routes.forEach(function (r) {
      var match = r.getAttribute("data-route") === name;
      r.hidden = !match;
      if (match) found = true;
    });
    if (!found) return show("home");
    document.querySelectorAll("a[href$='.html']").forEach(function (a) {
      var target = a.getAttribute("href").replace(".html", "");
      if (target === "index") target = "home";
      if (target === name) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    if (window.MK_ROUTE) window.MK_ROUTE(name);
    scrollTo({ top: 0, behavior: "auto" });
  }
  document.addEventListener("click", function (e) {
    var a = e.target.closest("a[href$='.html']");
    if (!a || a.target === "_blank" || e.metaKey || e.ctrlKey) return;
    e.preventDefault();
    var name = a.getAttribute("href").replace(".html", "");
    show(name === "index" ? "home" : name);
    history.replaceState(null, "", "#" + (name === "index" ? "home" : name));
  });
  show((location.hash || "#home").slice(1));
})();
</script>
"""


def render(page, slug, body, standalone=False):
    styles = '<link rel="stylesheet" href="styles.css">'
    scripts = '<script src="i18n.js" defer></script>\n<script src="app.js" defer></script>'
    logo = ""

    if standalone:
        styles = "<style>\n" + (ROOT / "styles.css").read_text() + "\n</style>"
        demos = {n: (ROOT / "demos" / f"{n}.html").read_text()
                 for n in ("cafe", "trades", "salon", "clinic")}
        logo = base64.b64encode((ROOT / "assets" / "mk-digital-logo.png").read_bytes()).decode()
        scripts = (
            "<script>window.MK_DEMO_SRCDOC=" + json.dumps(demos) + ";</script>\n"
            "<script>\n" + (ROOT / "i18n.js").read_text() + "\n</script>\n"
            "<script>\n" + (ROOT / "app.js").read_text() + "\n</script>"
        )

    canonical = SITE_URL + ("/" if slug == "index.html" else "/" + slug)
    head = HEAD.format(
        title=esc(en(page + ".metaTitle", "MK Digital")),
        desc=esc(en(page + ".metaDesc", "")),
        canonical=canonical,
        site=SITE_URL,
        page=page,
        styles=styles,
        jsonld=json.dumps(JSONLD, separators=(",", ":")),
    )

    if standalone:
        routes = "".join(
            f'<div class="route" data-route="{name}"{"" if name == "home" else " hidden"}>'
            + build_body(name, page_body) + "</div>"
            for name, (_, page_body) in BODIES.items()
        )
        html = head + header(page) + routes + footer(scripts) + ROUTER
    else:
        html = head + header(page) + build_body(page, body) + footer(scripts)

    html, missing = fill_english(html)

    if standalone:
        html = html.replace('src="assets/mk-digital-logo.png"',
                            'src="data:image/png;base64,' + logo + '"')
        html = re.sub(r'<link rel="(icon|apple-touch-icon|manifest)"[^>]*>\n?', "", html)
    return html, missing


def main():
    problems = []
    for page, (slug, body) in BODIES.items():
        html, missing = render(page, slug, body)
        (ROOT / slug).write_text(html)
        problems += [(slug, key) for key in missing]
        print(f"  {slug:<16} {len(html) / 1024:5.1f} KB")

    preview, _ = render("home", "index.html", HOME, standalone=True)
    (ROOT.parent / "preview.html").write_text(preview)
    print(f"  {'preview.html':<16} {len(preview) / 1024:5.1f} KB")

    if problems:
        print("\nMissing translation keys:")
        for slug, key in problems:
            print(f"  {slug}: {key}")
    else:
        print("\nAll data-t keys resolved.")


if __name__ == "__main__":
    main()

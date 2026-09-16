# MK Digital — website

Everything in `site/` is the website. It is plain HTML, CSS and JavaScript with no
build step required to run it and no dependencies to install. Open `site/index.html`
in a browser and it works.

---

## Before you publish: one thing to change

The pages currently point at `https://mkdigital.site`. When you have the real domain,
open `tools/build.py`, change this line near the top:

    SITE_URL = "https://mkdigital.site"

and do the same in `tools/assets.py`. Then run:

    python3 tools/build.py
    python3 tools/assets.py

That updates the canonical links, the social share tags and `sitemap.xml` everywhere
at once. If you would rather not touch Python, find-and-replace `mkdigital.site`
across `site/` and you will get the same result.

## Publishing

Upload the **contents** of `site/` to your host, so that `index.html` sits at the
root of the domain. Any static host works: Netlify, Cloudflare Pages, GitHub Pages,
Vercel, or ordinary cPanel hosting over FTP. There is nothing to configure.

If your host lets you set a custom 404 page, point it at `404.html`.

---

## What is in here

    site/
      index.html          home
      work.html           the four examples
      offer.html          what is included
      process.html        the three steps
      included.html       the detail list
      pricing.html        price, payment methods, FAQ
      contact.html        enquiry form
      404.html            page-not-found
      styles.css          all the styling
      i18n.js             every piece of text, in four languages
      app.js              behaviour
      demos/              four complete example websites
      assets/             logo, icons, social share image
      robots.txt, sitemap.xml, site.webmanifest

    tools/
      build.py            rebuilds the pages from one shared template
      assets.py           regenerates icons and the social image
      logo-source.png     the original logo, untouched

    preview.html          the whole site in one file (see below)

### preview.html

A single self-contained file containing every page, all four examples and both
colour modes. Nothing external, so you can email it, put it on a USB stick, or open
it offline and it still works. Handy for showing someone the site when you have no
internet, but **do not upload this one** — upload `site/` instead.

---

## Editing the text

All copy lives in `site/i18n.js`, grouped by page. To change a headline, edit it
there under `en`, then run `python3 tools/build.py`.

The English text is also written directly into the HTML files, so the pages read
correctly for search engines and for anyone with JavaScript switched off. That is
what the build step keeps in sync — if you edit the HTML by hand instead, the two
will drift apart.

If you change nothing else, `build.py` also tells you when a translation key is
missing, so nothing silently falls back to English.

### Adding a fifth language

1. In `i18n.js`, copy the whole `en: { ... }` block, rename it to the language code
   (for example `de`), and translate the values.
2. In `app.js`, add the code to `var LANGS = ["en", "zh", "ja", "es"];`
3. In `tools/build.py`, add an `<option>` to the `lang_select` function.
4. Run `python3 tools/build.py`.

The chosen language is remembered across pages and on the next visit.

---

## The four examples

`site/demos/` holds four finished one-page websites: a café, an electrician, a hair
studio and a dental practice. Each is self-contained, so you can copy one out, open
it on its own, or send it to someone as a starting point.

They appear in two places: live inside the phone on the home page, and full size in
the browser frame on the Work page. They are real pages loading in a frame, not
screenshots, which is the point — a prospect can resize the window and watch the
layout respond.

The businesses are invented, and each page says so in its footer, so you can show
them publicly without claiming clients you do not have. As you complete real
projects, swap them in: drop the new page into `demos/`, then update the demo list
near the top of `app.js` (`DEMO_ORDER` and `DEMO_HOSTS`) and the matching text in
`i18n.js`.

`robots.txt` asks search engines not to index `demos/`, so they will not compete
with your real pages or with a client's own site.

---

## The contact form

It posts to FormSubmit, which forwards to **rothschild535@gmail.com**. The very
first submission triggers a one-time confirmation email from FormSubmit that you
need to click before anything comes through, so send yourself a test message once
the site is live.

If the request fails for any reason, the form falls back to opening the visitor's
email app with the details already filled in, so an enquiry is never lost. There is
a hidden honeypot field that catches most bots without a captcha.

To change the address, edit `CONTACT_EMAIL` at the top of `app.js`, and the two
places it appears in `tools/build.py`.

---

## Colour modes

The site has two modes, Ink (dark) and Paper (light). It follows the visitor's
system setting on the first visit, and remembers their choice after that. The
toggle is in the header.

Both modes are built from the same set of variables at the top of `styles.css`, so
if you want to adjust a colour, change it once there rather than hunting through the
file.

---

## Notes on how it is put together

- The header and footer exist once, in `tools/build.py`. Change the navigation there
  and every page updates, rather than editing eight files.
- Motion is deliberate rather than constant: one entrance on the hero, and after that
  things only move in response to something you did. That keeps it calm and keeps it
  fast on cheap phones.
- `prefers-reduced-motion` turns the animation off, the keyboard focus ring is visible
  throughout, and the pages carry a print stylesheet.
- Fonts are Archivo and Newsreader, loaded from Google Fonts. If you would rather not
  depend on Google, download the two families into `assets/fonts/` and swap the
  `<link>` in `tools/build.py` for a local `@font-face` block.

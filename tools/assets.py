#!/usr/bin/env python3
"""Generate the icons, social image and crawler files. Run after build.py."""

import pathlib
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = pathlib.Path(__file__).parent.parent / "site"
A = ROOT / "assets"
EMAIL = "rothschild535@gmail.com"

INK = (11, 11, 12)
PAPER = (244, 243, 239)
FONT_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FONT_REG = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"

# --------------------------------------------------------------- source logo

# Always read the untouched original, so this script can be run any number of
# times without degrading its own output.
src = Image.open(pathlib.Path(__file__).parent / "logo-source.png").convert("RGBA")

# The wordmark is dark ink on a light field. Flatten onto white first, then
# build an alpha mask from darkness so it can be recoloured at any size.
flat = Image.new("RGB", src.size, (255, 255, 255))
flat.paste(src, mask=src.split()[3])
mask = flat.convert("L").point(lambda v: 255 if v < 128 else 0).convert("L")
bbox = mask.getbbox()
mask = mask.crop(bbox)
print("wordmark cropped to", mask.size)

# A trimmed, transparent PNG replaces the original 64 KB white-background file.
trimmed = Image.new("RGBA", mask.size, (0, 0, 0, 0))
trimmed.putalpha(mask)
trimmed.save(A / "mk-digital-logo.png", optimize=True)


def stamp(canvas, box, colour):
    """Paste the wordmark, fitted inside box=(x, y, w, h), in one flat colour."""
    x, y, w, h = box
    ratio = min(w / mask.width, h / mask.height)
    size = (max(1, round(mask.width * ratio)), max(1, round(mask.height * ratio)))
    fitted = mask.resize(size, Image.LANCZOS)
    layer = Image.new("RGBA", size, colour + (255,))
    canvas.paste(layer, (x + (w - size[0]) // 2, y + (h - size[1]) // 2), fitted)


# ------------------------------------------------------------------ favicons

FAVICON_SVG = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="MK Digital">
  <rect width="64" height="64" rx="13" fill="#0b0b0c"/>
  <g fill="none" stroke="#f4f3ef" stroke-width="6.4" stroke-linejoin="miter" stroke-linecap="butt">
    <path d="M9 45V21l10.5 15L30 21v24"/>
    <path d="M38 21v24M38 33.5 50 21M38 33.5 51.5 45"/>
  </g>
</svg>
"""
(A / "favicon.svg").write_text(FAVICON_SVG)

for size, name in ((32, "favicon-32.png"), (180, "apple-touch-icon.png")):
    icon = Image.new("RGBA", (size, size), INK + (255,))
    pad = round(size * 0.20)
    stamp(icon, (pad, pad, size - pad * 2, size - pad * 2), PAPER)
    icon.save(A / name, optimize=True)

# -------------------------------------------------------------- social image

W, H = 1200, 630
card = Image.new("RGB", (W, H), INK)
draw = ImageDraw.Draw(card)

# A restrained corner wash, matching the site's ambient light. Drawn on its own
# layer and blurred so there is no hard edge where it ends.
wash = Image.new("L", (W, H), 0)
ImageDraw.Draw(wash).ellipse((W - 560, -300, W + 160, 360), fill=26)
wash = wash.filter(ImageFilter.GaussianBlur(120))
card.paste(Image.new("RGB", (W, H), PAPER), (0, 0), wash)

stamp(card, (84, 96, 230, 150), PAPER)

title = ImageFont.truetype(FONT_BOLD, 74)
body = ImageFont.truetype(FONT_REG, 33)
small = ImageFont.truetype(FONT_REG, 26)

draw.text((84, 296), "Websites for small", font=title, fill=PAPER)
draw.text((84, 380), "businesses.", font=title, fill=PAPER)
draw.text((84, 486), "A free live preview before you pay anything.",
          font=body, fill=(150, 150, 148))
draw.line((84, 556, 1116, 556), fill=(48, 48, 50), width=1)
draw.text((84, 576), "GitHub Pages", font=small, fill=(120, 120, 120))
draw.text((1116 - draw.textlength("$250-$450 AUD", font=small), 576),
          "$250-$450 AUD", font=small, fill=(120, 120, 120))

card.save(A / "og-image.png", optimize=True)

# ----------------------------------------------------------- metadata files

(ROOT / "site.webmanifest").write_text("""{
  "name": "MK Digital",
  "short_name": "MK Digital",
  "description": "Independent web studio building showcase websites for small businesses.",
  "start_url": "./",
  "display": "standalone",
  "background_color": "#0b0b0c",
  "theme_color": "#0b0b0c",
  "icons": [
    { "src": "assets/favicon.svg", "sizes": "any", "type": "image/svg+xml" },
    { "src": "assets/favicon-32.png", "sizes": "32x32", "type": "image/png" },
    { "src": "assets/apple-touch-icon.png", "sizes": "180x180", "type": "image/png" }
  ]
}
""")

(ROOT / "robots.txt").write_text(
    "User-agent: *\n"
    "Allow: /\n"
    "Disallow: /demos/\n"

)

# No sitemap is generated because this version intentionally has no fixed public domain.

for name in ("favicon-32.png", "apple-touch-icon.png", "og-image.png", "mk-digital-logo.png"):
    print(f"  assets/{name:<24} {(A / name).stat().st_size / 1024:6.1f} KB")
print("  site.webmanifest, robots.txt, favicon.svg written")

#!/usr/bin/env python3
"""Genera los ficheros de marca de Modex: favicon.svg y assets/modex-logo*.svg.

El nombre se convierte en trazos (fontTools + vendor/fonts/FiraCode-Medium.woff2), de modo que el logo se ve
igual en cualquier sitio, sin necesidad de tener la tipografía instalada.
Uso:  python scripts/gen_logo.py      (necesita: pip install fonttools brotli)
"""
import pathlib, sys
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
import gen_foundations as g

ROOT = g.ROOT
font = TTFont(ROOT / "vendor" / "fonts" / "FiraCode-Medium.woff2")
gs, cmap, upm = font.getGlyphSet(), font.getBestCmap(), font["head"].unitsPerEm


def word(text, cx, baseline, size, spacing, fill):
    """Texto centrado en cx, convertido a trazos."""
    k = size / upm
    adv = [font["hmtx"][cmap[ord(c)]][0] * k for c in text]
    total = sum(adv) + spacing * (len(text) - 1)
    x, out = cx - total / 2, ""
    for c, a in zip(text, adv):
        pen = SVGPathPen(gs)
        gs[cmap[ord(c)]].draw(TransformPen(pen, (k, 0, 0, -k, x, baseline)))
        out += f'<path d="{pen.getCommands()}" fill="{fill}"/>'
        x += a + spacing
    return out


def svg(w, h, body, title):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" role="img" aria-label="{title}">'
            f'<title>{title}</title><rect width="{w}" height="{h}" fill="{g.BG}"/>{body}</svg>\n')


(ROOT / "assets").mkdir(exist_ok=True)
(ROOT / "favicon.svg").write_text(svg(32, 32, g.logo_cells(), "Modex"), encoding="utf-8")
(ROOT / "assets" / "modex-logo.svg").write_text(svg(32, 32, g.logo_cells(), "Modex"), encoding="utf-8")
vertical = f'<g transform="translate(60 28) scale(5)">{g.logo_cells()}</g>' + word("MODEX", 140, 232, 34, 12, g.TEXT)
(ROOT / "assets" / "modex-logo-vertical.svg").write_text(svg(280, 272, vertical, "Modex"), encoding="utf-8")
print("favicon.svg, assets/modex-logo.svg, assets/modex-logo-vertical.svg")

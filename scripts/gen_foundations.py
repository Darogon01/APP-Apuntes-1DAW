#!/usr/bin/env python3
"""Genera las muestras de color y las piezas HUD de FOUNDATIONS-DESIGN.md como SVG.

Fuente única de verdad: css/tokens.css (colores) y js/app.js (glifos de los iconos).
Salida: docs/foundations/{swatches,palettes,components}/*.svg y docs/foundations/_tables.json
(tablas de contraste que se pegan en FOUNDATIONS-DESIGN.md).

Uso:  python scripts/gen_foundations.py

Los SVG no usan filtros, degradados, <pattern>, clip-path ni mask: el brillo se simula con capas
translúcidas y las esquinas cortadas son polígonos. Así se ven igual en GitHub y en cualquier editor.
"""
import html, json, pathlib, re

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "docs" / "foundations"

# ------------------------------------------------------------------ tokens
css = (ROOT / "css" / "tokens.css").read_text(encoding="utf-8")
TOK = {n: v.upper() for n, v in re.findall(r"--([\w-]+):\s*(#[0-9A-Fa-f]{6})", css)}
C = lambda n: TOK["color-" + n]
BG, PANEL, SUNK, FILL = C("bg"), C("panel"), C("sunken"), C("fill")
LINE, SEP, MID = C("line"), C("separator"), C("mid")
TEXT, TEXT2, TEXT3, INK, ACC = C("text"), C("text-2"), C("text-3"), C("ink"), C("accent")
HUD, HUDLINE, HUDTXT = C("hud"), C("hud-line"), C("text-hud")
CODE = {k[5:]: v for k, v in TOK.items() if k.startswith("code-")}
TBL = {k[2:]: v for k, v in TOK.items() if k.startswith("t-")}

appjs = (ROOT / "js" / "app.js").read_text(encoding="utf-8")
GL = dict(re.findall(r"^\s+(home|sql|java|html|css|js): '(.*)',?\s*$", appjs, re.M))
assert len(GL) == 6, "no se han encontrado los 6 glifos en js/app.js"

FONT = "'Fira Code','DejaVu Sans Mono',ui-monospace,monospace"


# ------------------------------------------------------------------ contraste (WCAG 2.x)
def lum(h):
    r, g, b = (int(h[i:i + 2], 16) / 255 for i in (1, 3, 5))
    f = lambda c: c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)


def ratio(a, b):
    la, lb = sorted((lum(a), lum(b)), reverse=True)
    return (la + 0.05) / (lb + 0.05)


def rgb(h):
    return f"{int(h[1:3], 16)}, {int(h[3:5], 16)}, {int(h[5:7], 16)}"


# ------------------------------------------------------------------ primitivas SVG
def esc(s):
    return html.escape(str(s), quote=False)


def tx(x, y, s, size=13, fill=None, w=400, anchor="start", ls=0, pre=False):
    a = f' text-anchor="{anchor}"' if anchor != "start" else ""
    l = f' letter-spacing="{ls}"' if ls else ""
    p = ' xml:space="preserve"' if pre else ""
    return f'<text x="{x}" y="{y}" font-size="{size}" font-weight="{w}" fill="{fill or TEXT}"{a}{l}{p}>{esc(s)}</text>'


def rect(x, y, w, h, fill="none", stroke=None, sw=1, op=None):
    s = f' stroke="{stroke}" stroke-width="{sw}"' if stroke else ""
    o = f' opacity="{op}"' if op is not None else ""
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{fill}"{s}{o}/>'


def line(x1, y1, x2, y2, stroke, sw=1, op=None, dash=None):
    o = f' opacity="{op}"' if op is not None else ""
    d = f' stroke-dasharray="{dash}"' if dash else ""
    return f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{stroke}" stroke-width="{sw}"{o}{d}/>'


def poly(pts, fill, stroke=None, sw=1):
    p = " ".join(f"{a},{b}" for a, b in pts)
    s = f' stroke="{stroke}" stroke-width="{sw}"' if stroke else ""
    return f'<polygon points="{p}" fill="{fill}"{s}/>'


def cut_tr(x, y, w, h, c, fill, stroke=None, sw=1):
    return poly([(x, y), (x + w - c, y), (x + w, y + c), (x + w, y + h), (x, y + h)], fill, stroke, sw)


def hatch_h(x, y, n, color):
    d = ""
    for i in range(n):
        o = x + 10 * i
        d += f"M{o} {y + 10}L{o + 10} {y}L{o + 10} {y + 5}L{o + 5} {y + 10}Z M{o} {y + 5}L{o + 5} {y}L{o} {y}Z "
    return f'<path d="{d}" fill="{color}"/>'


def hatch_v(x, y, n, color):  # columna de 8 px de ancho, como la barra del aviso
    d = ""
    for i in range(n):
        o = y + 10 * i
        d += f"M{x} {o + 10}L{x + 8} {o + 2}L{x + 8} {o + 7}L{x + 5} {o + 10}Z M{x} {o + 5}L{x + 5} {o}L{x} {o}Z "
    return f'<path d="{d}" fill="{color}"/>'


def glow(x, y, w, h):
    """Brillo de la barra naranja sin filtros: tres capas translúcidas y la barra."""
    g = ""
    for pad, op in ((4, .08), (2.5, .16), (1.2, .32)):
        g += rect(x - pad, y - pad, w + 2 * pad, h + 2 * pad, ACC, op=op)
    return g + rect(x, y, w, h, ACC)


def bar(x, y, w, h, state="rest"):
    return glow(x, y, w, h) if state == "hover" else rect(x, y, w, h, ACC, op=.55 if state == "rest" else .22)


def icon(kind, x, y, size=132):
    s = size / 120
    return (f'<g transform="translate({x} {y}) scale({s:.4f})"><circle cx="60" cy="60" r="54" fill="none" stroke="{LINE}" stroke-width="1.2"/>'
            f'<path d="M2 60 H12 M108 60 H118" stroke="{ACC}" stroke-width="2" fill="none"/>'
            f'<g stroke="{ACC}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">{GL[kind]}</g></g>')


MCELLS = {(0, 0), (4, 0), (0, 1), (1, 1), (3, 1), (4, 1), (0, 2), (2, 2), (4, 2), (0, 3), (4, 3), (0, 4), (4, 4)}


def logo_cells(fg=None, accent=None):
    """La M de Modex: 13 módulos de 5 × 5 en retícula de 5 columnas (paso 5,8). El central es el naranja."""
    fg, accent = fg or TEXT, accent or ACC
    return "".join(f'<rect x="{1.9 + c * 5.8:.1f}" y="{1.9 + r * 5.8:.1f}" width="5" height="5" fill="{accent if (c, r) == (2, 2) else fg}"/>' for c, r in sorted(MCELLS, key=lambda t: (t[1], t[0])))


def logo(x, y, size=32):
    return f'<g transform="translate({x} {y}) scale({size / 32:.4f})">{logo_cells()}</g>'


def doc(w, h, body, title, desc, bg=BG):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" role="img" aria-labelledby="t d">'
            f'<title id="t">{esc(title)}</title><desc id="d">{esc(desc)}</desc>'
            f'<style>text{{font-family:{FONT};font-variant-ligatures:none;font-feature-settings:"liga" 0,"calt" 0}}</style>'
            f'<rect width="{w}" height="{h}" fill="{bg}"/>{body}</svg>\n')


def save(rel, content):
    p = OUT / rel
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(content, encoding="utf-8")


def caption(x, y, s):
    return tx(x, y, s, 11, TEXT3, 400, ls=.9)


# ------------------------------------------------------------------ 1. colores
ROLE = {
    "bg": ("Fondo de la aplicación", "Superficie base"), "panel": ("Paneles, tarjetas, bloques de código", "Superficie 1"),
    "sunken": ("Barras de bloque, filas alternas, cabeceras de editor", "Superficie 2"), "fill": ("Hover sobre botones, código en línea", "Superficie 3"),
    "hud": ("Fondo del banner HUD", "Superficie HUD (desviación)"), "hud-line": ("Rejilla y filetes del banner", "Línea HUD (desviación)"),
    "line": ("Bordes de contenedor y rejilla tenue", "Línea 1"), "separator": ("Separadores estructurales (cabecera, aside)", "Línea 2"),
    "mid": ("Líneas de énfasis medio, contornos de chip", "Línea 3"),
    "text": ("Texto principal, estructuras, cifras", "Texto 1"), "text-2": ("Cuerpo secundario, enlaces de navegación", "Texto 2"),
    "text-3": ("Metadatos, etiquetas, números de línea", "Texto 3"), "text-hud": ("Texto del banner HUD (desviación)", "Texto HUD"),
    "ink": ("Texto sobre superficie clara o naranja", "Tinta"), "accent": ("Señal: dónde mirar. Nunca estructura", "Acento"),
}
CODEROLE = {
    "keyword": ("Palabras clave", "class, public, SELECT, const"), "primitive": ("Tipos primitivos", "int, double, boolean"),
    "type": ("Tipos y clases, atributos y selectores", "String, ArrayList, .caja"), "method": ("Funciones y métodos", "println(), map()"),
    "identifier": ("Identificadores y texto por defecto", "nombre, edad"), "number": ("Números y literales", "42, true, null"),
    "string": ("Cadenas", "\"Hola\""), "punctuation": ("Puntuación y operadores", "{ } ( ) ; ="),
    "comment": ("Comentarios", "// nota"),
}
TBLROLE = {"clientes": "clientes", "pedidos": "pedidos", "empleados": "empleados", "lineas_pedido": "lineas_pedido", "productos": "productos", "categorias": "categorias"}

GROUPS = [
    ("surface", "Superficies", [(f"color-{k}", C(k), ROLE[k][0], BG) for k in ("bg", "panel", "sunken", "fill", "hud", "hud-line")]),
    ("line", "Línea", [(f"color-{k}", C(k), ROLE[k][0], BG) for k in ("line", "separator", "mid")]),
    ("text", "Texto", [(f"color-{k}", C(k), ROLE[k][0], BG) for k in ("text", "text-2", "text-3", "text-hud", "ink")]),
    ("accent", "Acento", [("color-accent", ACC, ROLE["accent"][0], BG)]),
    ("code", "Código", [(f"code-{k}", v, CODEROLE[k][0], PANEL) for k, v in CODE.items()]),
    ("table", "Tablas SQL", [(f"t-{k}", v, f"Tabla {k}", PANEL) for k, v in TBL.items()]),
]


def swatch_files():
    for _, _, items in GROUPS:
        for tok, hexv, _, _ in items:
            save(f"swatches/{tok}.svg", doc(72, 28, rect(.5, .5, 71, 27, hexv, MID, 1), tok, hexv, bg="none").replace('<rect width="72" height="28" fill="none"/>', ""))


def palette_files():
    tables = {}
    for gid, gname, items in GROUPS:
        cols = 3 if len(items) > 3 else len(items)
        cw, ch, gap, pad = 280, 150, 16, 24
        rows = (len(items) + cols - 1) // cols
        W = pad * 2 + cols * cw + (cols - 1) * gap
        H = pad * 2 + 30 + rows * ch + (rows - 1) * gap
        b = tx(pad, pad + 12, gname.upper(), 12, TEXT, 500, ls=2.4) + line(pad, pad + 22, W - pad, pad + 22, SEP)
        trows = []
        for i, (tok, hexv, role, ref) in enumerate(items):
            x = pad + (i % cols) * (cw + gap)
            y = pad + 36 + (i // cols) * (ch + gap)
            b += rect(x, y, cw, 78, hexv, MID if hexv in (BG, PANEL, HUD) else LINE, 1)
            b += rect(x, y + 78, cw, ch - 78, PANEL, LINE, 1)
            b += tx(x + 14, y + 100, "--" + tok, 13, TEXT, 500)
            b += tx(x + 14, y + 118, f"{hexv}  ·  rgb({rgb(hexv)})", 11.5, TEXT2)
            cr = ratio(hexv, ref) if hexv != ref else None
            refn = {BG: "fondo", PANEL: "panel", SUNK: "sunken"}.get(ref, ref)
            b += tx(x + 14, y + 136, (f"{cr:.1f}:1 sobre {refn}" if cr else "es la referencia"), 11.5, TEXT3)
            trows.append({"token": tok, "hex": hexv, "rgb": rgb(hexv), "role": role, "vs_bg": round(ratio(hexv, BG), 1), "vs_panel": round(ratio(hexv, PANEL), 1), "vs_sunken": round(ratio(hexv, SUNK), 1)})
        save(f"palettes/{gid}.svg", doc(W, H, b, f"Paleta: {gname}", "Muestras de color con token, hexadecimal, RGB y contraste", bg=BG))
        tables[gid] = trows
    # contraste de la tinta sobre el acento (chips, botón Ejecutar)
    tables["_extra"] = {"ink_on_accent": round(ratio(INK, ACC), 1), "ink_on_text": round(ratio(INK, TEXT), 1)}
    (OUT / "_tables.json").write_text(json.dumps(tables, indent=1, ensure_ascii=False), encoding="utf-8")


# ------------------------------------------------------------------ 2. proporciones de color (regla 60/30/10)
def proportion():
    b = tx(24, 36, "REPARTO DE SUPERFICIE", 12, TEXT, 500, ls=2.4) + line(24, 46, 856, 46, SEP)
    parts = [("Fondo y paneles", BG, 62, LINE), ("Blanco: estructura y texto", TEXT, 24, TEXT), ("Grises: línea y secundarios", MID, 11, MID), ("Naranja: señal", ACC, 3, ACC)]
    x = 24
    for name, col, pct, _ in parts:
        w = round(832 * pct / 100)
        b += rect(x, 66, w, 54, col, LINE if col == BG else None)
        b += tx(x, 146, f"{pct} %", 13, TEXT, 500) + tx(x, 164, name, 11, TEXT3)
        x += w
    b += tx(24, 206, "Regla: por cada elemento naranja, al menos tres en blanco o gris.", 12.5, TEXT2)
    save("palettes/reparto.svg", doc(880, 232, b, "Reparto de color", "Proporción orientativa de superficie por color: el naranja nunca supera el 3 %"))


# ------------------------------------------------------------------ 3. componentes
def banner():
    bx, by, bw, bh = 20, 20, 840, 360
    b = rect(bx, by, bw, bh, HUD, HUDLINE)
    g = "".join(f"M{bx + 32 * i} {by}V{by + bh}" for i in range(1, bw // 32 + 1)) + "".join(f"M{bx} {by + 32 * i}H{bx + bw}" for i in range(1, bh // 32 + 1))
    b += f'<path d="{g}" stroke="#131A27" stroke-width="1" fill="none"/>'
    for d in (f"M{bx - 1} {by + 26}V{by - 1}H{bx + 26}", f"M{bx + bw - 26} {by - 1}H{bx + bw + 1}V{by + 26}",
              f"M{bx + bw + 1} {by + bh - 26}V{by + bh + 1}H{bx + bw - 26}", f"M{bx + 26} {by + bh + 1}H{bx - 1}V{by + bh - 26}"):
        b += f'<path d="{d}" fill="none" stroke="{ACC}" stroke-width="3" stroke-linecap="square"/>'
    b += tx(bx + 34, by + 43, "SYS://APUNTES.DAW · 1.º DAW · V0.1", 12, HUDTXT, ls=2.2)
    xr = bx + bw - 34
    b += tx(xr, by + 43, "BETA", 12, HUDTXT, ls=2.2, anchor="end")
    blk = xr - 38 - 10 - 8
    b += rect(blk, by + 30, 8, 14, ACC) + rect(blk - 74, by + 31, 64, 12, "none", ACC, 1.2) + hatch_h(blk - 72, by + 32, 6, ACC)
    b += line(bx + 34, by + 60, bx + bw - 34, by + 60, HUDLINE)
    b += rect(bx + 34, by + 98, 5, 55, ACC)
    b += tx(bx + 56, by + 144, "APUNTES", 60, ACC, 500, ls=1) + tx(bx + 56 + 7 * 37 + 16, by + 144, "// 1.º DAW", 40, TEXT, 400, ls=3)
    b += tx(bx + 56, by + 190, "HTML · CSS · JS · JAVA · SQL", 12, HUDTXT, ls=2.2)
    b += icon("home", bx + bw - 34 - 132, by + 78, 132)
    b += line(bx + 34, by + 222, bx + bw - 34, by + 222, HUDLINE)
    stats = [("TEMARIOS", "05"), ("EJEMPLOS", "EDITABLES"), ("BUSCADOR", "TECLA /"), ("TIPO", "GUÍA DE APOYO")]
    ws = [max(len(k) * 9, len(v) * 10.4) for k, v in stats]
    inner = bw - 68
    gapx = (inner - sum(ws)) / (len(stats) - 1)
    x = bx + 34
    for (k, v), w in zip(stats, ws):
        b += tx(x, by + 251, k, 11, HUDTXT, ls=2.4) + tx(x, by + 275, v, 15, TEXT, 500, ls=1.4)
        x += w + gapx
    x = bx + 34
    for k, v in (("CICLO", "Grado Superior DAW"), ("USO", "Consulta"), ("EDITOR", "En vivo")):
        b += tx(x, by + 318, k, 13, TEXT, ls=.6)
        px = x + len(k) * 8.4 + 4
        pw = len(v) * 7.8 + 18
        b += rect(px, by + 303, pw, 22, ACC) + tx(px + 9, by + 318, v, 13, INK, 500)
        x = px + pw + 22
    rl = by + 340
    b += line(bx + 34, rl, bx + bw - 34, rl, HUDLINE) + "".join(line(bx + 34 + 60 * i + .5, rl, bx + 34 + 60 * i + .5, rl + 5, LINE) for i in range(0, 13))
    save("components/banner.svg", doc(880, 400, b, "Banner HUD", "Cabecera de portada: rejilla, corchetes naranjas, cabecera SYS, título, datos, icono y etiquetas"))


def header():
    W = 1100
    b = line(0, 63.5, W, 63.5, SEP)
    b += logo(26, 16, 32) + bar(36 - 8 + 8, 56, 28, 2, "rest")
    b += tx(86, 30, "Modex", 15, TEXT, 500) + tx(86, 46, "Apuntes 1.º DAW · guía de apoyo", 11, TEXT3)
    labels = ["HTML", "CSS", "JS", "JAVA", "BD + SQL"]
    x = 340
    for i, l in enumerate(labels):
        w = len(l) * 8.3 + 36
        act = i == 4
        b += tx(x + w / 2, 36, l, 13, TEXT if act else TEXT2, 500, "middle", .6)
        b += bar(x + 14, 55 if act else 56, w - 28, 3 if act else 2, "hover" if act else "rest")
        x += w + 6
    for lab, xx, key in (("Chuleta", 850, None), ("Buscar", 960, "/")):
        b += tx(xx, 36, lab, 13, TEXT2)
        wlab = len(lab) * 7.8
        if key:
            b += rect(xx + wlab + 10, 22, 18, 18, "none", LINE) + tx(xx + wlab + 19, 35, key, 11, TEXT3, 400, "middle")
        b += bar(xx - 14, 56, wlab + (38 if key else 0) + 28, 2, "rest")
    b += caption(26, 90, "ESCRITORIO · altura 64 px · barra naranja inferior en reposo (55 %), activa (3 px, brillo)")
    save("components/cabecera-escritorio.svg", doc(W, 108, b, "Cabecera de escritorio", "Logo, temarios con barra naranja, Chuleta y Buscar"))

    W2 = 390
    b = line(0, 111.5, W2, 111.5, SEP)
    b += tx(16, 36, "Índice", 13, TEXT2) + bar(8 + 8, 44, 40, 2, "rest")
    b += logo(76, 8, 28) + tx(112, 30, "Modex", 15, TEXT, 500)
    b += tx(W2 - 16, 36, "Buscar", 13, TEXT2, anchor="end") + bar(W2 - 70, 44, 54, 2, "rest")
    b += line(0, 58, W2, 58, SEP)
    x = 12
    for i, l in enumerate(["HTML", "CSS", "JS", "JAVA", "BD + SQL"]):
        w = len(l) * 8.3 + 28
        b += tx(x + w / 2, 83, l, 13, TEXT if i == 4 else TEXT2, 500, "middle", .6) + bar(x + 14, 102 if i == 4 else 103, w - 28, 3 if i == 4 else 2, "hover" if i == 4 else "rest")
        x += w + 8
    b += caption(16, 140, "MÓVIL ≤ 960 PX · DOS FILAS")
    save("components/cabecera-movil.svg", doc(W2, 156, b, "Cabecera móvil", "Dos filas: índice, logo y buscador; debajo, temarios con scroll horizontal"))


def brand():
    b = caption(24, 28, "LOGO · RETÍCULA 5 × 5")
    b += rect(24, 44, 256, 256, BG, LINE) + logo(24, 44, 256)
    for i in range(0, 6):
        v = 24 + (1.9 + i * 5.8 - .4) * 8
        b += line(v, 44, v, 300, LINE, .5, .3) + line(24, 44 + (1.9 + i * 5.8 - .4) * 8, 280, 44 + (1.9 + i * 5.8 - .4) * 8, LINE, .5, .3)
    # versión vertical: marca y, debajo, el nombre
    b += caption(310, 28, "VERSIÓN VERTICAL")
    b += rect(310, 44, 300, 256, BG, LINE) + logo(370, 60, 180) + tx(460, 278, "MODEX", 26, TEXT, 500, "middle", 9)
    for i, (t, d) in enumerate([("13 módulos", "5 × 5 px en retícula de 5 columnas"), ("Un módulo naranja", "el central: el que estás estudiando"), ("Nombre", "MODEX · Fira Code 500 · 9 px entre letras"), ("Fondo", "#0A0A0C, sin degradado")]):
        b += rect(640, 52 + i * 52, 8, 8, ACC if i == 1 else TEXT) + tx(660, 61 + i * 52, t, 13, TEXT, 500) + tx(660, 79 + i * 52, d, 11.5, TEXT3)
    b += caption(24, 336, "TAMAÑOS DE USO (16 PX ES EL MÍNIMO RECOMENDADO)")
    x = 24
    for sz in (16, 32, 48, 64):
        b += rect(x, 352, sz, sz, BG, LINE) + logo(x, 352, sz)
        x += sz + 20
    b += rect(340, 352, 320, 64, BG, LINE) + logo(356, 368, 32) + tx(404, 390, "Modex", 15, TEXT, 500) + tx(404, 406, "Apuntes 1.º DAW · guía de apoyo", 11, TEXT3)
    save("components/logo.svg", doc(960, 444, b, "Logotipo Modex", "La M de bloques, su versión vertical con el nombre debajo, especificaciones y tamaños de uso"))


def icons():
    names = [("home", "Portada"), ("sql", "BD + SQL"), ("java", "Java"), ("html", "HTML"), ("css", "CSS"), ("js", "JS")]
    W = 24 * 2 + 6 * 132 + 5 * 20
    b = caption(24, 28, "ICONOS HUD · VIEWBOX 120 × 120 · TRAZO 2,4 PX · SIN RELLENO SALVO EL CUADRADO DE ACENTO")
    for i, (k, n) in enumerate(names):
        x = 24 + i * 152
        b += icon(k, x, 48, 132) + tx(x + 66, 206, n, 12, TEXT2, anchor="middle")
    save("components/iconos.svg", doc(W, 232, b, "Iconos HUD", "Seis iconos de temario: portada, SQL, Java, HTML, CSS y JS"))


def cards():
    def topic(x, y, state):
        b = rect(x, y, 360, 250, SUNK if state == "hover" else PANEL) + bar(x, y + 6, 2, 238, "hover" if state == "hover" else "rest")
        b += tx(x + 28, y + 34, "Bases de datos", 13, TEXT2) + icon("sql", x + 360 - 24 - 64 + 6, y + 14 - 6, 64)
        b += tx(x + 28, y + 96, "SQL", 22, TEXT, 500) + tx(x + 28, y + 122, "PostgreSQL 18 · pgAdmin 4", 13, TEXT2)
        cx = x + 28
        b += cut_tr(cx, y + 186, 6 + len("24 módulos") * 7.3 + 14, 22, 6, ACC) + tx(cx + 10, y + 201, "24 MÓDULOS", 11, INK, 500, ls=.6)
        cx += 100
        for t, yy in (("Chuleta de cálculos", 186), ("Conceptos base", 214)):
            w = len(t) * 6.6 + 20
            x0 = cx if yy == 186 else x + 28
            b += rect(x0, y + yy, w, 22, "none", MID) + tx(x0 + 10, y + yy + 15, t, 11, TEXT2)
            cx += w + 6
        return b

    def hint(x, y):
        b = rect(x, y, 360, 150, PANEL) + bar(x, y + 6, 2, 138, "rest")
        b += rect(x + 28, y + 18, 8 * 6.6 + 16 + 1, 22, SUNK, LINE) + tx(x + 37, y + 33, "Ejecutar", 11, TEXT2)
        b += tx(x + 28, y + 70, "Editar el ejemplo", 14, TEXT, 500) + tx(x + 28, y + 94, "Los bloques con editor se pueden", 13, TEXT2) + tx(x + 28, y + 114, "modificar y se ven al momento.", 13, TEXT2)
        return b
    b = caption(24, 28, "TARJETA DE TEMARIO · 360 × 250 · REPOSO Y HOVER") + topic(24, 44, "rest") + topic(408, 44, "hover")
    b += caption(24, 332, "TARJETA DE AYUDA · 360 × 150") + hint(24, 348)
    save("components/tarjetas.svg", doc(792, 522, b, "Tarjetas", "Tarjeta de temario en reposo y hover, y tarjeta de ayuda"))


def callouts():
    b = caption(24, 28, "NOTA · BARRA BLANCA")
    b += rect(24, 44, 760, 82, PANEL) + rect(24, 44, 4, 82, TEXT)
    b += tx(50, 70, "Nota", 13, TEXT, 500) + tx(50, 94, "Una nota aporta contexto. Se reconoce por la barra blanca, no por el color.", 14, TEXT2) + tx(50, 114, "Nunca lleva naranja.", 14, TEXT2)
    b += caption(24, 160, "AVISO · BORDE NARANJA + TRIÁNGULO + TRAMA (EL SIGNIFICADO NO DEPENDE DEL COLOR)")
    b += rect(24.7, 176.7, 758.6, 88.6, "none", ACC, 1.4) + hatch_v(25, 177, 9, ACC)
    b += poly([(56, 182), (71, 210), (41, 210)], ACC) + tx(56, 208, "!", 14, INK, 500, "middle")
    b += tx(92, 200, "Ojo", 13, TEXT, 500) + tx(92, 224, "Un aviso marca el error típico del tema. Lleva triángulo y trama rayada,", 14, TEXT2) + tx(92, 244, "de modo que se reconoce aunque se imprima en blanco y negro.", 14, TEXT2)
    save("components/avisos.svg", doc(808, 292, b, "Nota y aviso", "Dos bloques de llamada: nota con barra blanca y aviso con borde naranja, triángulo y trama"))


def chips_buttons():
    b = caption(24, 28, "CHIPS · ESQUINA CORTADA 6 PX")
    x = 24
    for t, kind in (("Etiqueta", "plain-w"), ("Contorno", "outline"), ("22 MÓDULOS", "accent"), ("Texto plano", "plain")):
        w = len(t) * 6.7 + 20
        if kind == "plain-w":
            b += cut_tr(x, 44, w, 22, 6, TEXT) + tx(x + 10, 59, t, 11, INK, 500)
        elif kind == "outline":
            b += rect(x + .5, 44.5, w, 22, "none", MID) + tx(x + 10, 59, t, 11, TEXT2)
        elif kind == "accent":
            b += cut_tr(x, 44, w, 22, 6, ACC) + tx(x + 10, 59, t, 11, INK, 500, ls=.6)
        else:
            b += tx(x, 59, t, 11, TEXT2)
        x += w + 16
    b += caption(24, 104, "BOTONES DE CABECERA · REPOSO · HOVER / FOCO · ACTIVO")
    for i, (st, lab) in enumerate((("rest", "Buscar"), ("hover", "Buscar"), ("hover", "BD + SQL"))):
        x = 24 + i * 190
        col = TEXT if st == "hover" else TEXT2
        b += tx(x + 14, 140, lab, 13, col, 500 if i == 2 else 400) + bar(x, 156, 80 if i < 2 else 90, 3 if i == 2 else 2, "hover" if st == "hover" else "rest")
    b += caption(24, 204, "ACCIONES DE EDITOR · EJECUTAR (BLANCO SÓLIDO) · PESTAÑA ACTIVA (3 PX NARANJA) · COPIAR")
    b += rect(24, 220, 90, 40, TEXT) + tx(69, 245, "Ejecutar", 12, INK, 500, "middle")
    b += rect(134, 220, 60, 40, SUNK) + tx(164, 245, "HTML", 12, TEXT, anchor="middle") + rect(134, 257, 60, 3, ACC)
    b += rect(194, 220, 60, 40, SUNK) + tx(224, 245, "CSS", 12, TEXT2, anchor="middle")
    b += rect(274, 220, 80, 40, FILL) + tx(314, 245, "Copiar", 11, TEXT, anchor="middle")
    b += rect(374, 228, 22, 22, "none", LINE) + tx(385, 244, "/", 11, TEXT3, anchor="middle") + tx(408, 244, "tecla de acceso", 11, TEXT3)
    save("components/chips-botones.svg", doc(760, 284, b, "Chips y botones", "Variantes de chip, botones de cabecera con barra y acciones de editor"))


def headings():
    b = caption(24, 28, "MÓDULO · NÚMERO CON ESQUINA CORTADA + BARRA IZQUIERDA NARANJA 4 PX")
    b += cut_tr(24, 44, 88, 88, 14, "none", TEXT, 1.2) + tx(68, 98, "05", 34, TEXT, 500, "middle")
    b += rect(132, 44, 700, 88, PANEL) + rect(132, 44, 4, 88, ACC)
    b += tx(160, 84, "Consultas con JOIN", 32, TEXT, 500) + tx(160, 112, "Combinar filas de varias tablas por una clave.", 13, TEXT2)
    b += caption(24, 172, "TRES NIVELES DE TÍTULO")
    b += rect(24, 192, 12, 12, ACC) + tx(50, 204, "Sección  ·  17 px / 500 · cuadrado naranja", 17, TEXT, 500)
    b += rect(24.6, 236.6, 8.8, 8.8, "none", TEXT, 1.2) + tx(50, 244, "Subapartado  ·  15 px / 500 · cuadrado vacío", 15, TEXT, 500)
    b += rect(24, 280, 10, 10, TEXT) + tx(44, 290, "RÓTULO DE PORTADA  ·  13 px · cuadrado blanco · versalitas", 13, TEXT, ls=1.2)
    b += caption(24, 330, "REGLA CON MARCAS Y FRANJA DE TRAMA")
    b += line(24, 350, 832, 350, SEP) + rect(24, 348, 170, 2, TEXT) + "".join(line(24 + 60 * i + .5, 350, 24 + 60 * i + .5, 355, LINE) for i in range(0, 14))
    b += hatch_h(24, 380, 81, LINE)
    save("components/titulos.svg", doc(856, 410, b, "Encabezados y reglas", "Cabecera de módulo, niveles de título, regla con marcas y franja de trama"))


def codeblock():
    W = 760
    b = rect(24, 24, W, 240, PANEL) + rect(24, 24, W, 36, SUNK) + line(24, 60, 24 + W, 60, LINE)
    b += tx(38, 46, "Java", 11, TEXT3) + rect(24 + W - 80, 24, 80, 36, "none") + tx(24 + W - 40, 46, "Copiar", 11, TEXT2, anchor="middle")
    b += rect(24, 60, 44, 204, SUNK) + line(68, 60, 68, 264, LINE)
    lines = [
        [("// Declaración y uso de una variable", "comment")],
        [("public", "keyword"), (" ", "identifier"), ("class", "keyword"), (" ", "identifier"), ("Saludo", "type"), (" {", "punctuation")],
        [("    ", "identifier"), ("public", "keyword"), (" ", "identifier"), ("static", "keyword"), (" ", "identifier"), ("void", "primitive"), (" ", "identifier"), ("main", "method"), ("(", "punctuation"), ("String", "type"), ("[] args) {", "punctuation")],
        [("        ", "identifier"), ("int", "primitive"), (" edad ", "identifier"), ("=", "punctuation"), (" ", "identifier"), ("18", "number"), (";", "punctuation")],
        [("        ", "identifier"), ("String", "type"), (" nombre ", "identifier"), ("=", "punctuation"), (" ", "identifier"), ('"David"', "string"), (";", "punctuation")],
        [("        System.out.", "identifier"), ("println", "method"), ("(", "punctuation"), ("nombre", "identifier"), (")", "punctuation"), (";", "punctuation")],
        [("    }", "punctuation")],
        [("}", "punctuation")],
    ]
    cw = 13.5 * .6
    for i, ln in enumerate(lines):
        y = 60 + 14 + 22 * i + 15
        b += tx(62, y, str(i + 1), 11, TEXT3, anchor="end")
        x = 86
        for s, role in ln:
            if s.strip():
                b += tx(x, y, s, 13.5, CODE[role], pre=True)
            x += cw * len(s)
    save("components/bloque-codigo.svg", doc(808, 288, b, "Bloque de código", "Barra de título, números de línea y colores del tema de código sobre el panel"))
    # consola
    b = rect(24, 24, 560, 22, FILL) + rect(36, 32, 6, 6, MID) + rect(50, 32, 6, 6, MID) + rect(64, 32, 6, 6, MID)
    b += rect(24, 46, 560, 92, PANEL) + tx(44, 76, "David", 13, TEXT2) + tx(44, 98, "18", 13, TEXT2) + tx(44, 120, "BUILD SUCCESS", 13, TEXT2)
    save("components/consola.svg", doc(608, 162, b, "Consola de salida", "Barra con tres puntos grises y salida en texto secundario"))


def datatable():
    cols = [("Mod", 80), ("Título", 360), ("Estado", 200)]
    rows = [("01", "Introducción", "Escrito"), ("02", "Modelo entidad-relación", "Escrito"), ("03", "Normalización", "En preparación"), ("04", "Consultas con SELECT", "Escrito")]
    W = sum(w for _, w in cols)
    b = rect(24, 24, W, 36, TEXT)
    x = 24
    for n, w in cols:
        b += tx(x + 14, 47, n, 13, INK, 500)
        x += w
    for i, r in enumerate(rows):
        y = 60 + i * 38
        b += rect(24, y, W, 38, SUNK if i % 2 == 0 else BG)
        x = 24
        for j, (v, (_, w)) in enumerate(zip(r, cols)):
            b += tx(x + 14, y + 24, v, 13, TEXT if j == 0 else TEXT2)
            x += w
    save("components/tabla-datos.svg", doc(W + 48, 60 + len(rows) * 38 + 24, b, "Tabla de datos", "Cabecera invertida en blanco y filas alternas"))


def editors():
    W = 800
    b = rect(24, 24, W, 280, PANEL, LINE) + rect(24.5, 24.5, W - 1, 39, SUNK) + line(24, 64, 24 + W, 64, LINE)
    b += tx(38, 49, "Pruébalo", 12, TEXT2)
    b += tx(160, 49, "HTML", 12, TEXT, anchor="middle") + rect(130, 61, 60, 3, ACC) + tx(220, 49, "CSS", 12, TEXT2, anchor="middle") + tx(280, 49, "JS", 12, TEXT2, anchor="middle")
    b += rect(24 + W - 190, 25, 90, 39, TEXT) + tx(24 + W - 145, 49, "Ejecutar", 12, INK, 500, "middle") + tx(24 + W - 50, 49, "Restablecer", 12, TEXT2, anchor="middle")
    b += line(424, 64, 424, 304, LINE)
    code = [[("<", "punctuation"), ("h1", "keyword"), (">", "punctuation"), ("Hola", "identifier"), ("</", "punctuation"), ("h1", "keyword"), (">", "punctuation")], [("<", "punctuation"), ("p", "keyword"), (" ", "identifier"), ("class", "type"), ("=", "punctuation"), ('"nota"', "string"), (">", "punctuation"), ("Texto", "identifier"), ("</", "punctuation"), ("p", "keyword"), (">", "punctuation")]]
    for i, ln in enumerate(code):
        x = 40
        for s, role in ln:
            b += tx(x, 98 + 22 * i, s, 13.5, CODE[role])
            x += 13.5 * .6 * len(s)
    b += tx(438, 82, "Resultado", 11, TEXT3) + line(425, 90, 24 + W, 90, LINE) + rect(425, 91, W - 401, 213, "#FFFFFF")
    b += tx(440, 128, "Hola", 24, "#1F2328", 500) + tx(440, 154, "Texto", 14, "#1F2328")
    b += caption(24, 330, "EDITOR EN VIVO · cuadro de resultado en blanco por diseño: simula una página web real, aislada en iframe")
    save("components/editor-vivo.svg", doc(848, 350, b, "Editor en vivo", "Editor HTML/CSS/JS con pestañas, botón Ejecutar y vista previa"))

    b = rect(24, 24, W, 250, PANEL, LINE) + rect(24.5, 24.5, W - 1, 39, SUNK) + line(24, 64, 24 + W, 64, LINE)
    b += tx(38, 49, "Prueba la consulta · tienda_online", 12, TEXT2) + rect(24 + W - 190, 25, 90, 39, TEXT) + tx(24 + W - 145, 49, "Ejecutar", 12, INK, 500, "middle") + tx(24 + W - 50, 49, "Restablecer", 12, TEXT2, anchor="middle")
    q = [[("SELECT", "keyword"), (" nombre, precio", "identifier")], [("FROM", "keyword"), (" productos", "identifier")], [("WHERE", "keyword"), (" precio ", "identifier"), (">", "punctuation"), (" ", "identifier"), ("50", "number"), (";", "punctuation")]]
    for i, ln in enumerate(q):
        x = 40
        for s, role in ln:
            b += tx(x, 92 + 22 * i, s, 13.5, CODE[role], pre=True)
            x += 13.5 * .6 * len(s)
    b += line(24, 150, 24 + W, 150, LINE) + rect(40, 164, 360, 28, TEXT) + tx(54, 183, "nombre", 12, INK, 500) + tx(250, 183, "precio", 12, INK, 500)
    for i, (n, p) in enumerate((("Teclado mecánico", "89.90"), ("Monitor 27\"", "249.00"))):
        y = 192 + i * 28
        b += rect(40, y, 360, 28, SUNK if i % 2 == 0 else PANEL) + tx(54, y + 19, n, 12, TEXT2) + tx(250, y + 19, p, 12, TEXT2)
    b += tx(40, 262, "2 filas · 3 ms", 12, TEXT3)
    save("components/editor-sql.svg", doc(848, 300, b, "Editor SQL", "Editor de consultas contra PostgreSQL en el navegador, con resultado en tabla"))

    b = rect(24, 24, 560, 70, BG) + rect(24, 24, 3, 70, ACC) + tx(44, 46, "ERROR", 11, ACC, 500, ls=.9) + tx(44, 70, 'column "precio" does not exist', 13, TEXT)
    b += caption(24, 124, "ERROR DE SQL · barra naranja de 3 px + etiqueta en versalitas (el texto lo dice, no el color)")
    save("components/error-sql.svg", doc(608, 144, b, "Error de SQL", "Mensaje de error con barra naranja y etiqueta ERROR"))


def navigation():
    b = caption(24, 28, "ASIDE · LISTA DE MÓDULOS") + line(327.5, 44, 327.5, 330, SEP)
    mods = [("01", "Introducción", "rest"), ("02", "Modelo E-R", "active"), ("03", "Normalización", "rest"), ("04", "SELECT", "rest"), ("05", "En preparación", "pend")]
    for i, (n, t, st) in enumerate(mods):
        y = 44 + i * 44
        if st == "active":
            b += rect(24, y, 288, 40, PANEL) + bar(24, y + 6, 3, 28, "hover")
        else:
            b += bar(24, y + 6, 2, 28, "pend" if st == "pend" else "rest")
        b += tx(40, y + 25, n, 12, ACC) if st != "pend" else tx(40, y + 25, n, 12, "#5C3D2A")
        b += tx(78, y + 25, t, 13, TEXT if st == "active" else (TEXT3 if st == "pend" else TEXT2))
    b += caption(368, 28, "ÍNDICE DE LA PÁGINA (TOC)") + tx(368, 62, "EN ESTA PÁGINA", 11, TEXT3, ls=.9) + line(368.5, 76, 368.5, 200, LINE)
    for i, (t, a) in enumerate((("Idea", 0), ("Sintaxis", 1), ("Ejemplos", 0), ("Ojo", 0))):
        y = 76 + i * 30
        if a:
            b += rect(367, y, 2, 28, ACC)
        b += tx(382, y + 19, t, 12, TEXT if a else TEXT2)
    b += caption(368, 250, "PAGINADOR") + rect(368, 266, 220, 64, PANEL) + rect(368, 266, 4, 64, TEXT) + tx(388, 288, "Anterior", 11, TEXT3) + tx(388, 312, "Modelo E-R", 15, TEXT, 500)
    b += rect(604, 266, 220, 64, PANEL) + rect(604, 266, 4, 64, ACC) + tx(624, 288, "Siguiente", 11, TEXT3) + tx(624, 312, "Normalización", 15, TEXT, 500)
    save("components/navegacion.svg", doc(848, 350, b, "Navegación", "Lista de módulos del aside, índice de la página y paginador"))


def joincard():
    W = 900
    b = rect(24, 24, W, 560, PANEL, LINE)
    b += cut_tr(44, 42, 26, 26, 6, TEXT) + tx(57, 61, "1", 14, INK, 500, "middle") + tx(84, 61, "INNER JOIN: solo lo que casa en las dos tablas", 15, TEXT, 500)
    # aside
    secs = [("QUÉ HACE", "Une cada pedido con su", "cliente por id_cliente."), ("CUÁNDO USARLO", "Cuando solo importan las", "filas que tienen pareja."), ("CÓMO LEERLO", "Cada línea de color es un", "par que cumple el ON.")]
    for i, (s, l1, l2) in enumerate(secs):
        y = 88 + i * 78
        b += rect(44, y, 290, 68, BG, LINE) + tx(54, y + 18, s, 11, TEXT3, 500, ls=.9) + tx(54, y + 38, l1, 12.5, TEXT2) + tx(54, y + 56, l2, 12.5, TEXT2)
    # diagrama
    gx, gy = 354, 88
    b += rect(gx, gy, 550, 226, BG, LINE)
    def tbl(x, y, name, col, keys, rows):
        o = rect(x, y, 200, 24 + 22 * (len(rows) + 1), PANEL, LINE, 1.2)
        o += f'<rect x="{x}" y="{y}" width="200" height="24" fill="{col}" fill-opacity=".24"/>' + tx(x + 10, y + 16, name, 12, TEXT, 500)
        o += f'<rect x="{x}" y="{y + 24}" width="200" height="22" fill="{col}" fill-opacity=".2"/>'
        for j, k in enumerate(keys):
            o += tx(x + 10 + j * 90, y + 39, k, 11, TEXT2, 500)
        for r, rr in enumerate(rows):
            for j, v in enumerate(rr):
                o += tx(x + 10 + j * 90, y + 61 + r * 22, v, 12, TEXT)
        return o
    b += tbl(gx + 20, gy + 28, "clientes", TBL["clientes"], ("id", "nombre"), (("1", "Ana"), ("2", "Luis"), ("3", "Marta")))
    b += tbl(gx + 330, gy + 28, "pedidos", TBL["pedidos"], ("id", "id_cliente"), (("10", "1"), ("11", "1"), ("12", "3")))
    for (ya, yb) in ((90, 90), (90, 112), (134, 134)):
        pass
    b += f'<path d="M{gx + 220} {gy + 89}C{gx + 270} {gy + 89} {gx + 280} {gy + 89} {gx + 330} {gy + 89}" fill="none" stroke="{TBL["clientes"]}" stroke-width="2.6" stroke-linecap="round"/>'
    b += f'<path d="M{gx + 220} {gy + 89}C{gx + 270} {gy + 89} {gx + 280} {gy + 111} {gx + 330} {gy + 111}" fill="none" stroke="{TBL["pedidos"]}" stroke-width="2.6" stroke-linecap="round"/>'
    b += f'<path d="M{gx + 220} {gy + 133}C{gx + 270} {gy + 133} {gx + 280} {gy + 133} {gx + 330} {gy + 133}" fill="none" stroke="{TBL["pedidos"]}" stroke-width="2.6" stroke-linecap="round"/>'
    b += tx(gx + 20 + 200 + 12, gy + 28 + 61 + 22, "✕", 13, TEXT3, 500) + tx(gx + 20 + 200 + 34, gy + 28 + 61 + 22, "Luis: sin pareja", 11, TEXT3)
    b += rect(gx + 12, gy + 190, 10, 10, FILL, TEXT2, 1.5) + tx(gx + 28, gy + 199, "clave", 11, TEXT3) + rect(gx + 82, gy + 190, 10, 10, "none", TEXT2, 1.5) + tx(gx + 98, gy + 199, "fila usada", 11, TEXT3)
    # sql
    sy = 332
    b += rect(44, sy, 860, 118, BG, LINE)
    sql = [[("SELECT", ACC, 500), (" ", TEXT, 400), ("c", TBL["clientes"], 500), (".nombre, ", TEXT, 400), ("p", TBL["pedidos"], 500), (".id", TEXT, 400)],
           [("FROM", ACC, 500), (" clientes ", TEXT, 400), ("c", TBL["clientes"], 500)],
           [("INNER JOIN", ACC, 500), (" pedidos ", TEXT, 400), ("p", TBL["pedidos"], 500), (" ", TEXT, 400), ("ON", ACC, 500), (" ", TEXT, 400), ("p", TBL["pedidos"], 500), (".id_cliente ", TEXT, 400), ("=", TEXT, 400), (" ", TEXT, 400), ("c", TBL["clientes"], 500), (".id;", TEXT, 400)]]
    for i, ln in enumerate(sql):
        x = 60
        for s, col, wt in ln:
            b += tx(x, sy + 30 + i * 28, s, 13.5, col, wt, pre=True)
            x += 13.5 * .6 * len(s)
    # resultado
    ry = 470
    b += tx(44, ry + 8, "Resultado", 12, TEXT3)
    b += f'<rect x="130" y="{ry - 8}" width="150" height="22" fill="{TBL["clientes"]}" fill-opacity=".24"/><rect x="130" y="{ry - 11}" width="150" height="3" fill="{TBL["clientes"]}"/>' + tx(142, ry + 8, "nombre", 12, TEXT, 500)
    b += f'<rect x="280" y="{ry - 8}" width="100" height="22" fill="{TBL["pedidos"]}" fill-opacity=".24"/><rect x="280" y="{ry - 11}" width="100" height="3" fill="{TBL["pedidos"]}"/>' + tx(292, ry + 8, "id", 12, TEXT, 500)
    for i, (n, p) in enumerate((("Ana", "10"), ("Ana", "11"), ("Marta", "12"))):
        y = ry + 14 + i * 24
        b += rect(130, y, 150, 24, "none") + rect(130, y, 3, 24, TBL["clientes"], op=.55) + tx(142, y + 17, n, 12.5, TEXT) + rect(280, y, 3, 24, TBL["pedidos"], op=.55) + tx(292, y + 17, p, 12.5, TEXT) + line(130, y + 24, 380, y + 24, LINE)
    b += caption(420, ry + 8, "UN COLOR POR TABLA · EXCEPCIÓN DOCUMENTADA")
    x = 420
    for n, c in TBL.items():
        w = len(n) * 7.2 + 36
        b += rect(x, ry + 24, w, 24, BG, c, 1.5) + rect(x + 8, ry + 31, 9, 9, c) + tx(x + 24, ry + 40, n, 11, TEXT, 500)
        if x + w > 800:
            pass
        x += w + 8
        if x > 760:
            x = 420
            ry += 32
    # porqué
    b += rect(44, 548 - 4 + 36 - 36, 0, 0)
    save("components/tarjeta-join.svg", doc(948, 608, b, "Tarjeta de consulta JOIN", "Tarjeta con diagrama de tablas, consulta coloreada por tabla y resultado"))


def layout():
    W, H = 1100, 508
    b = caption(24, 28, "RETÍCULA DE ESCRITORIO · 1440 PX · ESCALA 0,72")
    s = .72
    X = lambda v: 24 + v * s
    Y = lambda v: 44 + v * s
    b += rect(X(0), Y(0), 1440 * s, 64 * s, "none", SEP) + tx(X(20), Y(40), "cabecera · --header-height 64", 11, TEXT2)
    b += rect(X(0), Y(64), 288 * s, 420 * s, "none", SEP) + tx(X(16), Y(100), "aside", 11, TEXT2) + tx(X(16), Y(118), "--sidebar-width 288", 11, TEXT3)
    b += rect(X(288 + 32 + 40), Y(64 + 40), 780 * s, 360 * s, PANEL, LINE) + tx(X(288 + 32 + 40 + 20), Y(64 + 80), "lectura · --reading-width 780", 11, TEXT)
    b += rect(X(288 + 32 + 40 + 780 + 40), Y(64 + 40), 248 * s, 360 * s, "none", LINE, 1) + tx(X(288 + 32 + 40 + 780 + 40 + 12), Y(64 + 80), "índice", 11, TEXT2) + tx(X(288 + 32 + 40 + 780 + 40 + 12), Y(64 + 98), "--toc-width 248", 11, TEXT3)
    gx0 = 288 + 32 + 40 + 780
    b += line(X(gx0), Y(64 + 30), X(gx0 + 40), Y(64 + 30), ACC, 2) + tx(X(gx0 + 20), Y(64 + 18), "--gap 40", 11, ACC, anchor="middle")
    b += caption(24, 452, "PUNTOS DE QUIEBRE")
    for i, (lab, w) in enumerate((("≥ 1361 · tres columnas", 1360), ("961 a 1360 · sin índice lateral", 1000), ("641 a 960 · aside en cajón, cabecera 112 px", 700), ("≤ 640 · una columna, paginador apilado", 400))):
        b += rect(24, 474 + i * 0, 0, 0)
    xs = 24
    for lab, bw in (("≥1361", 330), ("961 a 1360", 240), ("641 a 960", 170), ("≤640", 120)):
        b += rect(xs, 466, bw, 22, "none", MID) + tx(xs + 8, 481, lab, 11, TEXT2)
        xs += bw + 10
    save("components/reticula.svg", doc(W, H, b, "Retícula y puntos de quiebre", "Cabecera, aside, columna de lectura e índice con sus medidas, y los cuatro tramos responsive"))


def typography():
    b = caption(24, 28, "ESCALA TIPOGRÁFICA · FIRA CODE · SOLO PESOS 400 Y 500 · LIGADURAS DESACTIVADAS")
    spec = [(60, 500, "Banner 60", ACC), (40, 400, "Subtítulo 40", TEXT), (34, 500, "34", TEXT), (32, 500, "Título de módulo 32", TEXT), (22, 500, "Título de tarjeta 22", TEXT), (17, 500, "Sección 17", TEXT), (15, 400, "Cuerpo base 15 / interlineado 1,6", TEXT), (13, 400, "Secundario y tablas 13", TEXT2), (11, 400, "Meta, etiquetas y números de línea 11", TEXT3)]
    y = 40
    for sz, wt, t, col in spec:
        y += sz * 1.25 + 6
        b += tx(24, y, t, sz, col, wt) + tx(860, y, f"{sz} px · {wt}", 11, TEXT3, anchor="end")
    y += 40
    b += line(24, y - 20, 860, y - 20, SEP)
    b += tx(24, y, "== != <= >= => -> :: ===", 20, TEXT) + tx(24, y + 24, "Sin ligaduras: cada operador se ve como se escribe.", 12, TEXT3)
    b += tx(24, y + 64, "Aa Bb Cc 0123456789 ñ Ñ á é í ó ú ü ¿? ¡! { } [ ] ( ) < > ; : _ -", 15, TEXT2)
    save("components/tipografia.svg", doc(884, int(y + 100), b, "Tipografía", "Escala de tamaños, pesos y muestra de glifos de Fira Code"))


def spacing():
    b = caption(24, 28, "ESCALA DE ESPACIADO USADA EN LOS COMPONENTES (PX)")
    x = 24
    for v in (4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 40, 44, 64):
        b += rect(x, 120 - v, v, v, TEXT) + tx(x + v / 2, 140, str(v), 10, TEXT3, anchor="middle")
        x += max(v, 14) + 14
    b += caption(24, 186, "GROSOR DE LÍNEA")
    x = 24
    for lab, w, col in (("1", 1, LINE), ("1,2", 1.2, TEXT), ("1,4", 1.4, ACC), ("2", 2, ACC), ("3", 3, ACC), ("4", 4, TEXT), ("5", 5, ACC)):
        b += rect(x, 204, 80, w, col) + tx(x + 40, 232, f"{lab} px", 11, TEXT3, anchor="middle")
        x += 100
    b += caption(24, 268, "FORMA · ESQUINAS RECTAS; SOLO SE CORTA UNA ESQUINA")
    b += cut_tr(24, 284, 120, 60, 14, "none", TEXT, 1.2) + tx(84, 320, "módulo 14", 11, TEXT2, anchor="middle")
    b += cut_tr(164, 284, 120, 60, 12, PANEL, LINE, 1.2) + tx(224, 320, "--cut 12", 11, TEXT2, anchor="middle")
    b += cut_tr(304, 284, 120, 60, 6, TEXT) + tx(364, 320, "chip 6", 11, INK, 500, "middle")
    b += tx(450, 320, "border-radius: 0 en todo el sistema.", 12, TEXT3)
    save("components/espaciado-forma.svg", doc(760, 372, b, "Espaciado, trazos y forma", "Escala de espaciado, grosores de línea y esquinas cortadas"))


def interaction():
    b = caption(24, 28, "BARRA DE ACENTO · REPOSO → HOVER/FOCO → ACTIVO")
    for i, (lab, st, h) in enumerate((("reposo · 55 %", "rest", 2), ("hover / foco · 100 % + brillo", "hover", 2), ("activo · 3 px + brillo", "hover", 3), ("pendiente · 22 %", "pend", 2))):
        x = 24 + i * 200
        b += tx(x, 66, "Elemento", 13, TEXT) + bar(x, 80, 120, h, st) + tx(x, 112, lab, 11, TEXT3)
    b += caption(24, 150, "FOCO DE TECLADO · ANILLO NARANJA 2 PX, SEPARACIÓN 2 PX (SIEMPRE VISIBLE)")
    b += rect(24, 172, 130, 40, "none") + rect(20, 168, 138, 48, "none", ACC, 2) + tx(89, 197, "Ejecutar", 12, TEXT, anchor="middle")
    b += caption(24, 248, "SELECCIÓN DE TEXTO Y ENLACE")
    b += rect(24, 262, 150, 22, TEXT) + tx(30, 278, "texto seleccionado", 12, INK) + tx(210, 278, "enlace", 13, TEXT) + line(210, 284, 210 + 6 * 7.8, 284, MID, 1) + tx(300, 278, "enlace (hover)", 13, TEXT) + line(300, 284, 300 + 14 * 7.8, 284, ACC, 1)
    b += caption(24, 320, "MOVIMIENTO · 150 ms en color y brillo; el cajón lateral 180 ms; todo se desactiva con prefers-reduced-motion")
    save("components/interaccion.svg", doc(860, 348, b, "Estados e interacción", "Barra de acento en sus cuatro estados, foco de teclado, selección y enlaces"))


def misc():
    b = caption(24, 28, "MIGAS DE PAN · 12 PX · ENLACE EN TEXTO 2, PÁGINA ACTUAL EN TEXTO 3, SEPARADOR «/» EN LÍNEA")
    x = 24
    for i, (t, cur) in enumerate((("Apuntes", 0), ("Bases de datos · SQL", 0), ("09 SELECT básico", 1))):
        b += tx(x, 54, t, 12, TEXT3 if cur else TEXT2)
        x += len(t) * 7.2 + 10
        if not cur:
            b += tx(x, 54, "/", 12, LINE)
            x += 18
    b += caption(24, 96, "BÚSQUEDA · DIÁLOGO MODAL")
    b += rect(24.6, 112.6, 760, 190, PANEL, SEP, 1.2) + rect(24, 112, 760, 56, "none") + line(25, 168, 784, 168, LINE)
    b += tx(40, 146, "Buscar", 12, TEXT3) + tx(120, 146, "round", 16, TEXT) + line(740, 113, 740, 168, LINE) + tx(762, 146, "Cerrar", 12, TEXT2, anchor="middle")
    b += rect(25, 169, 759, 66, SUNK) + rect(25, 169, 3, 66, ACC)
    b += tx(44, 192, "Redondeo y truncado", 14, TEXT, 500) + tx(44, 209, "SQL · 10 Funciones", 11, TEXT3)
    b += tx(44, 226, "… usa ", 12, TEXT2) + rect(87, 214, 40, 16, TEXT) + tx(91, 226, "round", 12, INK) + tx(133, 226, "(precio, 2) para dos decimales …", 12, TEXT2)
    b += line(25, 235, 784, 235, LINE) + tx(44, 268, "Otro resultado", 14, TEXT, 500) + tx(44, 285, "SQL · CH Chuleta de cálculos", 11, TEXT3)
    b += caption(24, 336, "TEXTO EN LÍNEA · CÓDIGO · TECLA · MARCAS DE ESTADO (LA FORMA LLEVA EL SIGNIFICADO) · ENLACE")
    b += rect(24, 352, 70, 22, SUNK) + tx(30, 368, "inline-code", 12.5, TEXT)
    b += rect(114.5, 352.5, 40, 21, "none", MID) + tx(121, 368, "Ctrl", 12, TEXT)
    for i, (lab, fill) in enumerate((("completo", 1), ("medio", .5), ("vacío", 0))):
        xx = 190 + i * 100
        b += rect(xx + .6, 356.6, 9, 9, "none", TEXT, 1.2)
        if fill == 1: b += rect(xx + .6, 356.6, 9, 9, TEXT)
        if fill == .5: b += rect(xx + .6, 356.6, 4.5, 9, TEXT)
        b += tx(xx + 16, 366, lab, 12, TEXT2)
    b += tx(500, 366, "enlace", 13, TEXT) + line(500, 371, 500 + 6 * 7.8, 371, MID)
    b += caption(24, 408, "LISTA · DESPLEGABLE · FIGURA")
    for i, t in enumerate(("Primer elemento", "Segundo elemento")):
        b += rect(30, 428 + i * 24, 4, 4, MID) + tx(46, 434 + i * 24, t, 14, TEXT)
    b += rect(300.5, 418.5, 300, 44, "none", LINE) + tx(316, 446, "Ver la solución", 14, TEXT, 500) + tx(580, 446, "+", 14, TEXT2, anchor="middle")
    b += rect(630, 418, 130, 64, "#FFFFFF", LINE) + tx(695, 456, "imagen", 12, "#1F2328", anchor="middle") + tx(630, 500, "Pie de figura", 12, TEXT3)
    b += caption(24, 540, "PIE DE PÁGINA")
    b += line(24, 556, 784, 556, LINE) + tx(24, 578, "Apuntes de 1.º DAW · versión beta", 11, TEXT3) + tx(784, 578, "Tipografía Fira Code (SIL OFL 1.1)", 11, TEXT3, anchor="end")
    save("components/texto-busqueda-pie.svg", doc(808, 604, b, "Texto, búsqueda y pie", "Migas, diálogo de búsqueda, código en línea, tecla, marcas de estado, lista, desplegable, figura y pie"))


SHEET = [
    ("Marca", "logo"), ("Iconos", "iconos"),
    ("Color · superficies", "palettes/surface"), ("Color · línea", "palettes/line"), ("Color · texto", "palettes/text"),
    ("Color · acento", "palettes/accent"), ("Color · código", "palettes/code"), ("Color · tablas SQL", "palettes/table"), ("Reparto de color", "palettes/reparto"),
    ("Tipografía", "tipografia"), ("Retícula y quiebres", "reticula"), ("Espaciado, trazos y forma", "espaciado-forma"), ("Estados e interacción", "interaccion"),
    ("Cabecera · escritorio", "cabecera-escritorio"), ("Cabecera · móvil", "cabecera-movil"), ("Banner HUD", "banner"), ("Tarjetas", "tarjetas"),
    ("Encabezados y reglas", "titulos"), ("Nota y aviso", "avisos"), ("Chips y botones", "chips-botones"), ("Bloque de código", "bloque-codigo"),
    ("Consola", "consola"), ("Tabla de datos", "tabla-datos"), ("Editor en vivo", "editor-vivo"), ("Editor SQL", "editor-sql"), ("Error de SQL", "error-sql"),
    ("Tarjeta de consulta JOIN", "tarjeta-join"), ("Navegación", "navegacion"), ("Texto, búsqueda y pie", "texto-busqueda-pie"),
]


def sheet():
    """Hoja única con todos los componentes: incrusta cada SVG ya generado como <svg> anidado."""
    import re as _re
    colw, gutter, top = 960, 40, 120
    cols = [top, top]
    body = tx(40, 52, "MODEX · HOJA DE COMPONENTES", 20, TEXT, 500, ls=2.4) + tx(40, 78, "Marca, color, tipografía, retícula y todos los componentes del sistema HUD en un solo documento.", 12.5, TEXT3)
    body += line(40, 96, 40 + colw * 2 + gutter, 96, SEP)
    for n, (name, rel) in enumerate(SHEET, 1):
        sub = (OUT / "components" / f"{rel}.svg") if "/" not in rel else (OUT / f"{rel}.svg")
        src = sub.read_text(encoding="utf-8")
        w, h = (int(v) for v in _re.search(r'viewBox="0 0 (\d+) (\d+)"', src).groups())
        inner = _re.search(r"<svg[^>]*>(.*)</svg>", src, _re.S).group(1)
        inner = _re.sub(r"<title[^>]*>.*?</title>|<desc[^>]*>.*?</desc>|<style>.*?</style>", "", inner, flags=_re.S)
        c = 0 if cols[0] <= cols[1] else 1
        x, y = 40 + c * (colw + gutter), cols[c]
        body += tx(x, y + 14, f"{n:02d} · {name.upper()}", 11, TEXT2, 500, ls=1.4) + line(x, y + 24, x + min(w, colw), y + 24, LINE)
        k = min(1, colw / w)  # lo que no cabe en la columna se reduce
        sw_, sh_ = round(w * k), round(h * k)
        body += f'<svg x="{x}" y="{y + 36}" width="{sw_}" height="{sh_}" viewBox="0 0 {w} {h}">{inner}</svg>'
        cols[c] = y + 36 + sh_ + 36
    W, H = 40 * 2 + colw * 2 + gutter, max(cols) + 4
    save("hoja-de-componentes.svg", doc(W, H, body, "Hoja de componentes Modex", "Todos los componentes del sistema de diseño en un solo SVG"))


def build():
    OUT.mkdir(parents=True, exist_ok=True)
    swatch_files()
    palette_files()
    proportion()
    for f in (banner, header, brand, icons, cards, callouts, chips_buttons, headings, codeblock, datatable, editors, navigation, joincard, layout, typography, spacing, interaction, misc):
        f()
    sheet()
    print("SVG generados:", sum(1 for _ in OUT.rglob("*.svg")))


if __name__ == "__main__":
    build()

#!/usr/bin/env python3
"""Conversión de autor (una sola vez): READMEs de la chuleta -> content/<temario>.js con los bloques de la app.
Uso: convert.py <readme.md> <slug> <salida.js> [módulos a omitir, p. ej. 00,01]"""
import re, sys, json, pathlib
src, slug, out = sys.argv[1:4]
skip = set(sys.argv[4].split(',')) if len(sys.argv) > 4 else set()
lines = pathlib.Path(src).read_text(encoding='utf-8').split('\n')

EMOJI = re.compile('[\U0001F300-\U0001FAFF☀-⛿⭐⬆⬇✅❌❗️‍]')
def inline(t):
    t = t.replace('🟢', '[[ok]]').replace('🟡', '[[half]]').replace('🔴', '[[no]]')
    t = t.replace('✔', '[[ok]]').replace('✖', '[[no]]').replace('✘', '[[no]]').replace('✓', '[[ok]]')
    parts = re.split(r'(`[^`]+`)', t)
    res = []
    for p in parts:
        if len(p) > 2 and p[0] == '`' and p[-1] == '`':
            res.append(p); continue
        p = EMOJI.sub('', p)
        p = re.sub(r'<kbd>(.*?)</kbd>', r'{{\1}}', p)
        p = re.sub(r'<br\s*/?>', ' ', p)
        p = re.sub(r'</?(sub|sup|small|b|i|em|strong|p|span)[^>]*>', '', p)
        p = re.sub(r'\[([^\]]+)\]\(#([^)]+)\)', r'[\1](@\2)', p)
        p = re.sub(r'\[([^\]]+)\]\((?!https?:|@)[^)]*\)', r'\1', p)   # enlaces a ficheros del repo: solo el texto
        p = re.sub(r'(?<![*\w])\*(?!\*)([^*\n]+?)(?<!\*)\*(?![*\w])', r'\1', p)  # cursiva
        p = re.sub(r'[▲◂▸◆]\s*', '', p)
        res.append(p)
    return ''.join(res).strip()

def clean_title(t):
    t = re.sub(r'^[▸◆]\s*', '', t.strip())
    return inline(t)

def slugify(t):
    t = re.sub(r'[`*]', '', t).lower()
    t = t.translate(str.maketrans('áéíóúüñ', 'aeiouun'))
    return re.sub(r'[^a-z0-9]+', '-', t).strip('-')


DIAGRAMAS = {
 'html': [
  [{'consola': """¿Tendría sentido solo, fuera de esta página? (en un RSS, compartido)
 ├─ Sí ─────────────────────────────────────────► <article>
 └─ No
     ¿Es una parte temática con su propio título?
      ├─ Sí ─────────────────────────────────────► <section>
      └─ No, solo agrupo para dar estilo ────────► <div>"""}],
 ],
 'java': [
  [{'consola': """¿Sé cuántas iteraciones habrá antes de empezar?
 ├─ Sí
 │   ¿Necesito la posición i o modificar elementos?
 │    ├─ Sí ─────────────────────────────────────► for clásico
 │    └─ No, solo leer cada uno ─────────────────► for-each
 └─ No, depende de lo que pase
     ¿Tiene que ejecutarse al menos una vez?
      ├─ Sí: menú, pedir un dato ────────────────► do-while
      └─ No: puede que nunca entre ──────────────► while"""}],
 ],
 'sql': [
  [{'consola': """categorias  ||──o{  productos       "clasifica"
productos   ||──o{  lineas_pedido   "aparece en"
pedidos     ||──|{  lineas_pedido   "contiene"
clientes    ||──o{  pedidos         "realiza"
empleados   |o──o{  pedidos         "gestiona"
empleados   |o──o{  empleados       "es jefe de\""""},
   {'tabla': {'cabs': ['Tabla', 'Columnas (PK clave primaria · FK clave foránea · UK única)'], 'filas': [
     ['`categorias`', '`id_categoria` PK · `nombre` UK'],
     ['`productos`', '`id_producto` PK · `id_categoria` FK · `nombre` · `precio` · `stock` · `activo` · `fecha_alta`'],
     ['`clientes`', '`id_cliente` PK · `nombre` · `apellidos` · `email` UK · `ciudad` (puede ser NULL) · `telefono` (puede ser NULL) · `fecha_registro`'],
     ['`empleados`', '`id_empleado` PK · `nombre` · `puesto` · `id_jefe` FK (NULL = sin jefe) · `salario` · `fecha_contrato`'],
     ['`pedidos`', '`id_pedido` PK · `id_cliente` FK · `id_empleado` FK (NULL = venta web) · `fecha` · `estado` (enum) · `gastos_envio`'],
     ['`lineas_pedido`', '`id_pedido` PK,FK · `id_producto` PK,FK · `cantidad` · `precio_unitario` · `subtotal` (generada)'],
   ]}}],
  [{'consola': """ CLIENTE ──1── <Hace> ──N── PEDIDO
   │                        │
   ├ id_cliente (PK)        ├ id_pedido (PK)
   ├ nombre                 ├ fecha
   └ email                  └ total"""}],
  [{'consola': """ CLIENTE ──(1,1)── <Hace> ──(0,N)── PEDIDO"""}],
  [{'consola': """ ALUMNO ──N── <Matricula en> ──N── CURSO
                      │
                      ├ fecha
                      └ nota_final"""}],
  [{'consola': """ EMPLEADO ──1 (jefe)──────── <Es jefe de>
     └─────N (subordinado)──────┘

 FACTURA ──1── <Tiene> ──N── LÍNEA_FACTURA (entidad débil)"""}],
  [{'consola': """ USUARIO ──N── <Visualiza> ──N── SERIE
   │                  │              │
   ├ id_usuario (PK)  ├ fecha        ├ codigo (PK)
   ├ nombre           └ valoracion   ├ titulo
   └ email                           └ genero"""}],
  [{'consola': """ ALUMNO ──N── <Se inscribe> ──N── CURSO ──1── <Tiene> ──N── LECCIÓN (entidad débil)
                      │
                      ├ fecha
                      └ progreso"""}],
 ],
}
mer_idx = 0

mods = {}; order = []
cur = None; sec = None; anchor = None; used = set()
def new_mod(num, title):
    global cur, sec
    cur = {'num': num, 'title': title, 'resumen': '', 'intro': [], 'secciones': []}
    mods[num] = cur; order.append(num); sec = None
def target():
    return sec['bloques'] if sec else cur['intro']

i = 0; n = len(lines)
pending_fences = []   # fences html/css/js consecutivas
def flush_fences(live=False, titulo='Pruébalo'):
    global pending_fences
    if not pending_fences: return
    if live:
        d = {k: v for k, v in pending_fences}
        h = d.get('html', '')
        if '<html' in h.lower() or '<!doctype' in h.lower():
            live = False
    if live:
        cfg = {'titulo': titulo}
        for k, v in pending_fences: cfg[k] = v
        target().append({'live': cfg})
    else:
        for k, v in pending_fences:
            target().append({'code': v, 'lang': k})
    pending_fences = []

def is_result(idx):
    j = idx
    while j < n and lines[j].strip() == '': j += 1
    return j < n and 'RESULTADO' in lines[j]

# saltar la cabecera hasta el primer módulo
while i < n and not re.match(r'^## `[0-9A-Za-z]+`', lines[i]): i += 1
while i < n:
    L = lines[i]
    m = re.match(r'^## `?([0-9A-Za-z]+)`?\s+(.+)$', L)
    if m and not L.startswith('## ⌖'):
        flush_fences(False)
        title = inline(m.group(2)).strip()
        new_mod(m.group(1).upper(), title.title() if title.isupper() else title)
        i += 1; continue
    if cur is None: i += 1; continue
    a = re.match(r'^<a id="([^"]+)"></a>\s*$', L)
    if a:
        anchor = a.group(1); i += 1; continue
    h = re.match(r'^###\s+(.+)$', L)
    if h:
        flush_fences(False)
        t = clean_title(h.group(1))
        sid = anchor if anchor and not anchor.startswith('mod-') else 'm' + cur['num'].lower() + '-' + slugify(t)
        anchor = None
        if sid in used: sid = 'm' + cur['num'].lower() + '-' + sid
        used.add(sid)
        sec = {'id': sid, 'titulo': t, 'bloques': []}
        cur['secciones'].append(sec); i += 1; continue
    h4 = re.match(r'^####\s+(.+)$', L)
    if h4 and anchor and h4.group(1).startswith('◆'):
        flush_fences(False)
        t = clean_title(h4.group(1)); sid = anchor; anchor = None; used.add(sid)
        sec = {'id': sid, 'titulo': t, 'bloques': []}; cur['secciones'].append(sec); i += 1; continue
    if h4:
        flush_fences(False); target().append({'h4': clean_title(h4.group(1))}); i += 1; continue
    if L.startswith('```'):
        lang = L[3:].strip().lower(); j = i + 1; buf = []
        while j < n and not lines[j].startswith('```'): buf.append(lines[j]); j += 1
        i = j + 1; code = '\n'.join(buf).rstrip()
        if lang in ('html', 'css', 'js', 'javascript'):
            pending_fences.append(('js' if lang == 'javascript' else lang, code))
            # ¿sigue otra fence contigua?
            k = i
            while k < n and lines[k].strip() == '': k += 1
            nxt = lines[k][3:].strip().lower() if k < n and lines[k].startswith('```') else None
            if nxt in ('html', 'css', 'js', 'javascript') and not (nxt == 'html' and any(x[0] == 'html' for x in pending_fences)):
                continue
            flush_fences(is_result(i)); continue
        flush_fences(False)
        if lang == 'mermaid':
            for b in DIAGRAMAS[slug][mer_idx]: target().append(b)
            mer_idx += 1; continue
        if lang == 'text':
            if code.lstrip().startswith('┌─[ MOD.'):
                mm = re.findall(r'│\s+(.*?)\s*│', code)
                if mm and not cur['resumen']: cur['resumen'] = mm[0].strip()
                continue
            target().append({'consola': code}); continue
        target().append({'code': code, 'lang': lang or 'text'}); continue
    if L.strip().startswith('>'):
        buf = []
        while i < n and lines[i].strip().startswith('>'):
            buf.append(re.sub(r'^\s*>\s?', '', lines[i])); i += 1
        kind = 'NOTE'
        if buf and re.match(r'\[!(\w+)\]', buf[0]):
            kind = re.match(r'\[!(\w+)\]', buf[0]).group(1); buf = buf[1:]
        txt = '\n\n'.join(inline(' '.join(p.split('\n'))) for p in re.split(r'\n\s*\n', '\n'.join(buf)) if p.strip())
        txt = re.sub(r'\n\n+(?=\s*$)', '', txt)
        if kind in ('WARNING', 'CAUTION'):
            target().append({'aviso': txt, 'tipo': 'warning' if kind == 'WARNING' else 'caution'})
        else:
            target().append({'nota': txt, 'tipo': {'TIP': 'tip', 'IMPORTANT': 'important'}.get(kind, 'note')})
        continue
    if L.startswith('|'):
        rows = []
        while i < n and lines[i].startswith('|'):
            rows.append(lines[i]); i += 1
        def cells(r):
            r = r.strip()[1:-1]
            return [inline(c.strip().replace('\\|', '|')) for c in re.split(r'(?<!\\)\|', r)]
        hdr = cells(rows[0]); body = [cells(r) for r in rows[2:]]
        target().append({'tabla': {'cabs': hdr, 'filas': body}}); continue
    lm = re.match(r'^(\s*)([-*]|\d+\.)\s+(.*)$', L)
    if lm:
        items = []; ordered = lm.group(2)[0].isdigit()
        while i < n:
            mm = re.match(r'^(\s*)([-*]|\d+\.)\s+(.*)$', lines[i])
            if mm: items.append(inline(mm.group(3))); i += 1
            elif lines[i].startswith('  ') and lines[i].strip() and items: items[-1] += ' ' + inline(lines[i]); i += 1
            else: break
        target().append({'lista': items, **({'ordenada': True} if ordered else {})}); continue
    st = L.strip()
    if st.startswith('<sub>'):
        if 'RESULTADO' in st or '📄' in st or '▲' in st or 'ÍNDICE' in st:
            i += 1; continue
        t = inline(st)
        if t: target().append({'sub': t})
        i += 1; continue
    if st == '' or st == '---' or st.startswith('<img') or st.startswith('<p') or st.startswith('</p') or st.startswith('<br'):
        i += 1; continue
    if st.startswith('<a ') and 'href="#' in st and ('ÍNDICE' in st or '▲' in st):
        i += 1; continue
    # párrafo
    buf = []
    while i < n and lines[i].strip() and not re.match(r'^(```|\||>|#{1,4} |<a id|<sub>|<img|<p|</p|---|\s*([-*]|\d+\.)\s)', lines[i]):
        buf.append(lines[i].strip()); i += 1
    if not buf: i += 1; continue
    t = inline(' '.join(buf))
    if t: target().append({'p': t})
flush_fences(False)

# módulos sin secciones: el contenido va a una sección única
for num, mo in mods.items():
    if not mo['secciones'] and mo['intro']:
        mo['secciones'].append({'id': 'm' + num.lower() + '-contenido', 'titulo': mo['title'], 'bloques': mo['intro']}); mo['intro'] = []

for mo in mods.values():
    mo['secciones'] = [x for x in mo['secciones'] if x['bloques']]
result = {}
for num in order:
    if num in skip: continue
    mo = mods[num]
    d = {'resumen': mo['resumen'], 'secciones': mo['secciones']}
    if mo['intro']: d['intro'] = mo['intro']
    result['mod-' + num.lower()] = d
js = ('/* Contenido de %s generado a partir de la chuleta de referencia (scripts/convert.py) y revisado a mano. */\n(function () {\n  const mods = %s;\n  APP.register({ slug: "%s", contenido: mods });\n})();\n'
      % (slug, json.dumps(result, ensure_ascii=False, indent=1), slug))
pathlib.Path(out).write_text(js, encoding='utf-8')
nb = sum(len(s['bloques']) for m in result.values() for s in m['secciones'])
lv = sum(1 for m in result.values() for s in m['secciones'] for b in s['bloques'] if 'live' in b)
mm = sum(1 for m in result.values() for s in m['secciones'] for b in s['bloques'] if '_mermaid' in b)
print(slug, 'módulos', len(result), 'bloques', nb, 'live', lv, 'mermaid', mm)

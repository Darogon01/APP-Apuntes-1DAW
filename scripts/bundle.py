#!/usr/bin/env python3
"""Genera dist/index.html: un solo fichero con CSS, JS y tipografías incrustados (para probar sin servidor)."""
import re, base64, pathlib
root = pathlib.Path(__file__).resolve().parent.parent
def css(path):
    t = (root / path).read_text()
    def imp(m):
        return css((path.rsplit('/',1)[0] + '/' + m.group(1)) if '/' in path else m.group(1))
    t = re.sub(r'@import\s+url\(["\']?([^"\')]+)["\']?\)[^;]*;', lambda m: css_import(path, m), t) if False else t
    return t
def flat(path):
    p = root / path
    t = p.read_text()
    def imp(m):
        sub = (p.parent / m.group(1)).resolve().relative_to(root)
        body = flat(str(sub))
        return f'@layer {m.group(2)} {{\n{body}\n}}' if m.group(2) else body
    t = re.sub(r'@import\s+(?:url\()?["\']([^"\']+)["\']\)?\s*(?:layer\(([\w-]+)\))?\s*;', imp, t)
    def font(m):
        f = (p.parent / m.group(1)).resolve()
        return 'url(data:font/woff2;base64,' + base64.b64encode(f.read_bytes()).decode() + ')'
    t = re.sub(r'url\(["\']?([^"\')]+\.woff2)["\']?\)', font, t)
    return t
html = (root / 'index.html').read_text()
html = re.sub(r'<link rel="stylesheet" href="css/main.css">', lambda m: '<style>' + flat('css/main.css') + '\n/* El visor de artefactos fija un body sin capa que gana a @layer: se repite aquí, sin capa. */\nbody{margin:0;background:#0A0A0C;color:#F2F2F0;font:400 15px/1.6 "Fira Code","DejaVu Sans Mono",ui-monospace,monospace}html{background:#0A0A0C;color-scheme:dark}</style>', html)
html = re.sub(r'<script src="([^"]+)"></script>', lambda m: '<script>' + (root / m.group(1)).read_text().replace('</script', '<\\/script') + '</script>', html)
html = html.replace('</body>', '<script>APP.pgliteUrl="https://cdn.jsdelivr.net/npm/@electric-sql/pglite@0.5.11/dist/index.js";</script></body>')
out = root / 'dist'; out.mkdir(exist_ok=True); (out / 'index.html').write_text(html)
print('dist/index.html', len(html)//1024, 'KB')

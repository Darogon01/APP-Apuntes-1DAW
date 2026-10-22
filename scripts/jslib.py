import json
def P(t): return {'p': t}
def H4(t): return {'h4': t}
def CODE(c, lang='js', titulo=None):
    d = {'code': c.strip('\n'), 'lang': lang}
    if titulo: d['titulo'] = titulo
    return d
def CON(t): return {'consola': t.strip('\n')}
def TAB(cabs, *filas): return {'tabla': {'cabs': cabs, 'filas': [list(f) for f in filas]}}
def LST(*items, ordenada=False):
    d = {'lista': list(items)}
    if ordenada: d['ordenada'] = True
    return d
def AV(t, tipo='warning'): return {'aviso': t, 'tipo': tipo}
def NT(t, tipo='note'): return {'nota': t, 'tipo': tipo}
def LIVE(titulo, js=None, html=None, css=None, alto=None):
    d = {'titulo': titulo}
    if html is not None: d['html'] = html.strip('\n')
    if css is not None: d['css'] = css.strip('\n')
    if js is not None: d['js'] = js.strip('\n')
    if alto: d['alto'] = alto
    return {'live': d}
def S(id, titulo, *bloques): return {'id': id, 'titulo': titulo, 'bloques': list(bloques)}
MODS = {}
def M(num, resumen, *secciones): MODS['mod-' + num] = {'resumen': resumen, 'secciones': list(secciones)}

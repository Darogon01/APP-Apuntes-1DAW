import json, pathlib, sys
sys.path.insert(0, str(pathlib.Path(__file__).parent))
import jslib, js_a, js_b, js_c, js_d
mods = jslib.MODS
out = pathlib.Path(__file__).resolve().parent.parent / 'content' / 'js.js'
out.write_text('/* Contenido de JavaScript (escrito para esta app; misma estructura que Java, con lo propio de JS). */\n(function () {\n  const mods = '
  + json.dumps(mods, ensure_ascii=False, indent=1) + ';\n  APP.register({ slug: "js", contenido: mods });\n})();\n', encoding='utf-8')
print(len(mods), 'módulos', sum(len(s['bloques']) for m in mods.values() for s in m['secciones']), 'bloques')

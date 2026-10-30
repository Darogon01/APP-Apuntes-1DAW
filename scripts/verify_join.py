"""Contrasta el motor de js/joinviz.js con PostgreSQL (PGlite) para todos los bloques `join` del contenido SQL.
Uso: python3 -m http.server 8777 (en la raíz del repo) y, en otra terminal, python3 scripts/verify_join.py
Requiere: pip install playwright && playwright install chromium"""
import json,sys
from playwright.sync_api import sync_playwright
JS="""
async () => {
  const S = APP.subjects.sql, out = [], errs = [];
  const mod = Object.entries(S.contenido);
  const blocks = [];
  const walk=(mid,sid,bl)=>{ for (const b of bl) { if (b.join && typeof b.join === 'object') blocks.push([mid,sid,b.join]); if (b.details) walk(mid,sid,b.details.bloques); } };
  for (const [mid, m] of mod) for (const sec of m.secciones) walk(mid, sec.id, sec.bloques);
  const { PGlite } = await import(new URL('vendor/pglite/index.js', document.baseURI).href);
  const db = await PGlite.create(); await db.exec(APP.tiendaSql);
  for (const [mid, sid, cfg] of blocks) {
    try {
      const E = APP.joinEngine(cfg);
      const sqlText = (function(){ const d=document.createElement('div'); d.innerHTML=APP.joinBlock(cfg,'sql'); const live=APP._live[APP._live.length-1]; return live.sql; })();
      const r = await db.query(sqlText);
      const norm = (v) => v === null ? null : (typeof v === 'number' ? Math.round(v*100)/100 : (v instanceof Date ? v.toISOString() : String(v)));
      const nz = (v) => { if (v===null) return null; if (v instanceof Date) return v.toISOString().slice(0,10); if (typeof v==='bigint') v=Number(v); if (typeof v==='number') return Math.round(v*100)/100; if (typeof v==='boolean') return v; if (/^-?\\d+(\\.\\d+)?$/.test(String(v))) return Math.round(Number(v)*100)/100; return String(v); };
      const a = E.out.map(row => row.map(c => nz(c.v)));
      const cols = r.fields.map(f=>f.name);
      const b = r.rows.map(row => cols.map(c => nz(row[c])));
      const key = (x) => JSON.stringify(x);
      const A = a.map(key).sort(), B = b.map(key).sort();
      const ok = A.length === B.length && A.every((x,i)=>x===B[i]);
      out.push({mid, sid, n: cfg.n, ok, js: a.length, pg: b.length, names: E.sel.map(s=>s.name).join(','), pgcols: cols.join(','), diff: ok?null:{A:A.slice(0,4),B:B.slice(0,4)}});
    } catch (e) { errs.push({mid, sid, n: cfg.n, err: String(e)}); }
  }
  return {out, errs};
}
"""
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(); msgs=[]
    pg.on('pageerror',lambda e: msgs.append(str(e)))
    pg.goto((sys.argv[1] if len(sys.argv)>1 else 'http://localhost:8777/')); pg.wait_for_timeout(800)
    res=pg.evaluate(JS)
    for o in res['out']:
        print(('OK ' if o['ok'] else 'XX '), o['mid'],o['sid'],o['n'],o['js'],o['pg'], '' if o['ok'] else json.dumps(o['diff'],ensure_ascii=False))
    print('ERRS',res['errs'],msgs)
    b.close()

"""Ejecuta en PostgreSQL (PGlite) las expresiones de scripts/calc_exprs.py y guarda los resultados.
Uso: python3 scripts/pgeval.py expresiones.json calc_results.json (con el servidor local en :8777)"""
import json,sys
from playwright.sync_api import sync_playwright
exprs=json.load(open(sys.argv[1]))
JS="""async (ex) => {
 const { PGlite } = await import(new URL('vendor/pglite/index.js', document.baseURI).href);
 const db = await PGlite.create(); await db.exec(APP.tiendaSql);
 const out=[];
 for (const e of ex) { try { const r = await db.query('SELECT ' + e + ' AS r'); let v=r.rows[0].r; if (v instanceof Date) v=v.toISOString().slice(0,10); out.push(v===null?'NULL':String(typeof v==='object'?JSON.stringify(v):v)); } catch(err) { out.push('ERROR: '+err.message); } }
 return out; }"""
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(); pg.goto('http://localhost:8777/'); pg.wait_for_timeout(500)
    res=pg.evaluate(JS,exprs); json.dump(res,open(sys.argv[2],'w'),ensure_ascii=False); b.close()

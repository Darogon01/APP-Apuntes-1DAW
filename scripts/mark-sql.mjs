// Marca como ejecutables los bloques SQL que funcionan sobre tienda_online (se prueban de verdad con PGlite).
// Uso: NODE_PATH=<carpeta con node_modules/@electric-sql/pglite> node scripts/mark-sql.mjs   (después de convert.py)
import { PGlite } from '@electric-sql/pglite';
import fs from 'fs';
const file = new URL('../content/sql.js', import.meta.url).pathname;
const t = fs.readFileSync(file, 'utf8');
const a = t.indexOf('const mods = ') + 13, b = t.lastIndexOf(';\n  APP.register');
const mods = JSON.parse(t.slice(a, b));
const seed = fs.readFileSync(new URL('../content/tienda-sql.js', import.meta.url).pathname, 'utf8');
const seedSql = JSON.parse(seed.slice(seed.indexOf('APP.tiendaSql = ') + 16, seed.lastIndexOf(';')));
const db = new PGlite(); await db.exec(seedSql);
const looksLikeResult = (c) => /^[-+]{3,}/m.test(c) || /\n[-+ ]{5,}\n/.test(c) || /\(\d+ filas?\)/.test(c);
let run = 0, dropped = 0, kept = 0;
for (const m of Object.values(mods)) for (const s of m.secciones) {
  const out = [];
  for (let i = 0; i < s.bloques.length; i++) {
    const bl = s.bloques[i];
    if (bl.code && bl.lang === 'sql') {
      let ok = true;
      try { await db.exec('BEGIN'); await db.exec(bl.code); } catch (e) { ok = false; } finally { try { await db.exec('ROLLBACK'); } catch {} }
      if (ok) {
        out.push({ live: { titulo: 'Pruébalo en tienda_online', sql: bl.code } }); run++;
        const next = s.bloques[i + 1];
        if (next && next.consola && looksLikeResult(next.consola)) { i++; dropped++; }
        continue;
      } else kept++;
    }
    out.push(bl);
  }
  s.bloques = out;
}
fs.writeFileSync(file, t.slice(0, a) + JSON.stringify(mods, null, 1) + t.slice(b));
console.log({ ejecutables: run, sinEjecutar: kept, resultadosEstaticosQuitados: dropped });

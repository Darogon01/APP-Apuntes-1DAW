/* Bloques «join»: explican una consulta con un color por tabla.
   - Lee las filas reales de tienda_online del propio script de la BD (APP.tiendaSql).
   - Calcula el resultado con un motor mínimo de JOIN (inner, left, right, full, cross), WHERE, agrupación y orden.
   - Dibuja el diagrama en SVG, el panel lateral, la consulta coloreada y el resultado.
   El resultado calculado aquí se contrasta con PostgreSQL (PGlite) en las pruebas del proyecto. */
(function () {
  "use strict";
  const APP = window.APP, esc = APP.esc;

  /* ---------- datos: se extraen del script de la BD ---------- */
  const PK = { categorias: "id_categoria", productos: "id_producto", clientes: "id_cliente", empleados: "id_empleado", pedidos: "id_pedido" };
  const DEC2 = new Set(["precio", "gastos_envio", "salario", "precio_unitario", "subtotal"]);
  let DB = null;

  function tuples(s) {
    const out = []; let i = 0;
    while (i < s.length) {
      if (s[i] !== "(") { i++; continue; }
      i++; const row = []; let tok = "", q = false, was = false;
      const push = () => {
        const t = tok.trim();
        if (was) row.push(tok); else if (/^null$/i.test(t)) row.push(null); else if (/^true$/i.test(t)) row.push(true);
        else if (/^false$/i.test(t)) row.push(false); else row.push(Number(t));
        tok = ""; was = false;
      };
      for (; i < s.length; i++) {
        const c = s[i];
        if (q) { if (c === "'" && s[i + 1] === "'") { tok += "'"; i++; } else if (c === "'") q = false; else tok += c; }
        else if (c === "'") { q = true; was = true; tok = ""; }
        else if (c === ",") push();
        else if (c === ")") { push(); i++; break; }
        else tok += c;
      }
      out.push(row);
    }
    return out;
  }

  function db() {
    if (DB) return DB;
    DB = {};
    const re = /INSERT INTO (\w+) \(([^)]*)\) VALUES([\s\S]*?);\n/g; let m;
    while ((m = re.exec(APP.tiendaSql))) {
      const t = m[1], cols = m[2].split(",").map((x) => x.trim()), rows = tuples(m[3]);
      const pk = PK[t], all = pk ? [pk].concat(cols) : cols.slice();
      const objs = rows.map((r, n) => { const o = {}; if (pk) o[pk] = n + 1; cols.forEach((c, k) => { o[c] = r[k]; }); return o; });
      if (t === "lineas_pedido") { all.push("subtotal"); objs.forEach((o) => { o.subtotal = Math.round(o.cantidad * o.precio_unitario * 100) / 100; }); }
      DB[t] = { cols: all, rows: objs, pk: pk || null };
    }
    return DB;
  }
  APP.tienda = () => db();

  function show(col, v) {
    if (v === null || v === undefined) return null;
    if (typeof v === "boolean") return v ? "true" : "false";
    if (typeof v === "number") return DEC2.has(col) ? v.toFixed(2) : String(v);
    if (/^\d{4}-\d\d-\d\d \d\d:\d\d$/.test(v)) return v + ":00";
    return String(v);
  }

  /* ---------- motor ---------- */
  const split = (s) => { const k = s.indexOf("."); return [s.slice(0, k), s.slice(k + 1)]; };
  const cmp = (a, b) => (a === b ? 0 : a < b ? -1 : 1);

  function ops(op, a, b) {
    if (op === "is null") return a === null || a === undefined;
    if (op === "is not null") return a !== null && a !== undefined;
    if (a === null || a === undefined) return false;
    switch (op) {
      case "=": return a === b; case "<>": return a !== b;
      case ">": return a > b; case "<": return a < b; case ">=": return a >= b; case "<=": return a <= b;
      case "like": { const re = new RegExp("^" + String(b).replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/%/g, ".*").replace(/_/g, ".") + "$", "i"); return re.test(a); }
      case "in": return b.includes(a);
    }
    return false;
  }

  const okExtra = (j, n) => !j.extra || ops(j.extra.op || "=", n[split(j.extra.col)[1]], j.extra.val);

  function engine(cfg) {
    const D = db(), T = cfg.tablas.map((t) => Object.assign({ data: D[t.t] }, t)), idx = {};
    T.forEach((t, i) => { idx[t.a] = i; });
    const get = (r, al, col) => { const i = idx[al], ri = r[i]; return ri === undefined || ri < 0 ? null : T[i].data.rows[ri][col]; };
    let rows = T[0].data.rows.map((_, i) => [i]);
    const links = []; // por join: parejas [filaAntigua, filaNueva] que cumplen el ON
    (cfg.joins || []).forEach((j, k) => {
      const ni = k + 1, tipo = j.tipo || "inner", newRows = T[ni].data.rows;
      let ol = null, nc = null;
      if (j.on) { const [a, b] = j.on.map(split); if (a[0] === T[ni].a) { nc = a[1]; ol = b; } else { nc = b[1]; ol = a; } }
      const oi = ol ? idx[ol[0]] : 0, pairs = [];
      if (j.on) T[oi].data.rows.forEach((o, a) => newRows.forEach((n, jj) => { if (o[ol[1]] !== null && o[ol[1]] === n[nc] && okExtra(j, n)) pairs.push([a, jj]); }));
      else T[oi].data.rows.forEach((_, a) => newRows.forEach((__, b) => pairs.push([a, b])));
      links.push({ oi, ni, pairs });
      const out = [], used = new Set();
      rows.forEach((r) => {
        const ms = [];
        newRows.forEach((n, jj) => {
          if (!j.on) { ms.push(jj); return; }
          const v = r[oi] >= 0 ? T[oi].data.rows[r[oi]][ol[1]] : null;
          if (v !== null && v === n[nc] && okExtra(j, n)) ms.push(jj);
        });
        if (ms.length) ms.forEach((jj) => { out.push(r.concat(jj)); used.add(jj); });
        else if (tipo === "left" || tipo === "full") out.push(r.concat(-1));
      });
      if (tipo === "right" || tipo === "full") newRows.forEach((_, jj) => { if (!used.has(jj)) out.push(Array(ni).fill(-1).concat(jj)); });
      rows = out;
    });
    const joined = rows;
    (cfg.where || []).forEach((w) => { const [al, c] = split(w.col); rows = rows.filter((r) => ops(w.op || "=", get(r, al, c), w.val)); });

    /* columnas de salida */
    const sel = (cfg.sel || []).map((s) => {
      if (typeof s === "string") { const [al, col] = split(s); return { kind: "col", al, col, name: col, t: al }; }
      if (s.agg) { const [al, col] = s.col === "*" ? [s.t, "*"] : split(s.col); return Object.assign({}, s, { kind: "agg", al, col, name: s.as, t: s.t || al }); }
      if (s.expr) return Object.assign({ kind: "calc", name: s.as }, s);
      const [al, col] = split(s.col); return { kind: "col", al, col, name: s.as || col, as: s.as, t: al };
    });
    const hasAgg = sel.some((s) => s.kind === "agg");
    let out;
    if (hasAgg) {
      const groups = new Map();
      rows.forEach((r) => {
        const key = JSON.stringify(sel.filter((s) => s.kind !== "agg").map((s) => (s.kind === "col" ? get(r, s.al, s.col) : s.calc(get.bind(null, r)))));
        if (!groups.has(key)) groups.set(key, []); groups.get(key).push(r);
      });
      if (!groups.size && !sel.some((s) => s.kind !== "agg")) groups.set("[]", []);
      out = [...groups.values()].map((g) => sel.map((s) => {
        if (s.kind === "col") return { v: get(g[0], s.al, s.col), s };
        if (s.kind === "calc") return { v: s.calc(get.bind(null, g[0])), s };
        const sc = DEC2.has(s.col) ? 100 : 1;   // los numeric se suman en céntimos para no arrastrar errores de coma flotante
        const vals = s.col === "*" ? g.map(() => 1) : g.map((r) => get(r, s.al, s.col)).filter((x) => x !== null).map((x) => Math.round(x * sc));
        let v;
        if (s.agg === "count") v = vals.length;
        else if (!vals.length) v = null;
        else if (s.agg === "sum") v = vals.reduce((a, b) => a + b, 0) / sc;
        else if (s.agg === "avg") { const m = vals.reduce((a, b) => a + b, 0) / vals.length; v = s.round !== undefined ? Math.round(m * 10 ** s.round / sc) / 10 ** s.round : m / sc; }
        else if (s.agg === "max") v = vals.reduce((a, b) => (b > a ? b : a)) / sc;
        else v = vals.reduce((a, b) => (b < a ? b : a)) / sc;
        if (v !== null && s.round !== undefined && s.agg !== "avg") v = Math.round(v * 10 ** s.round) / 10 ** s.round;
        return { v, s };
      }));
    } else {
      out = rows.map((r) => sel.map((s) => ({ v: s.kind === "col" ? get(r, s.al, s.col) : s.calc(get.bind(null, r)), s, nul: s.kind === "col" && r[idx[s.al]] < 0 })));
    }
    /* orden y límite sobre las columnas de salida */
    (cfg.orden || []).slice().reverse().forEach((o) => {
      const [name, dir] = o.split(/\s+/), k = sel.findIndex((s) => s.name === name || (s.col && s.al + "." + s.col === name));
      if (k < 0) return; const d = dir === "desc" ? -1 : 1;
      out = out.map((r, i) => [r, i]).sort((x, y) => {
        const a = x[0][k].v, b = y[0][k].v;
        if (a === null && b === null) return x[1] - y[1]; if (a === null) return d; if (b === null) return -d;
        return (typeof a === "string" ? a.localeCompare(b, "es") : cmp(a, b)) * d || x[1] - y[1];
      }).map((x) => x[0]);
    });
    if (cfg.limite) out = out.slice(0, cfg.limite);

    /* estado de cada fila del diagrama */
    const state = T.map((t, i) => t.data.rows.map((_, r) => {
      let alone = false, partner = false;
      rows.forEach((row) => { if (row[i] === r) { if (row.some((x, k) => k !== i && x >= 0)) partner = true; else alone = true; } });
      if (partner || (T.length === 1 && alone)) return "ok";
      if (alone) return "null";
      const had = links.some((l) => (l.oi === i && l.pairs.some((p) => p[0] === r)) || (l.ni === i && l.pairs.some((p) => p[1] === r)));
      return had ? "where" : "nopair";
    }));
    return { T, idx, sel, out, links, state, joined, kept: rows, hasAgg };
  }
  APP.joinEngine = engine;

  /* ---------- SQL ---------- */
  const tcolor = (t) => `style="--tc:var(--t-${t})"`;
  const ac = (txt, t) => `<span class="ac" ${tcolor(t)}>${esc(txt)}</span>`;
  const K = (w) => `<span class="k">${w}</span>`;

  function sqlParts(cfg, E) {
    const tabOf = {}; E.T.forEach((t) => { tabOf[t.a] = t.t; });
    const sels = E.sel.map((s) => {
      let base = s.kind === "agg" ? (s.round !== undefined ? `round(${s.agg}(${s.col}), ${s.round})` : `${s.agg}(${s.col})`) : s.kind === "calc" ? s.expr : s.al + "." + s.col;
      const as = s.kind === "col" ? s.as : s.name;
      return { plain: base + (as ? " as " + as : ""), html: ac(base, tabOf[s.t || s.al]) + (as ? " " + K("as") + " " + esc(as) : "") };
    });
    const lines = [], plain = [];
    lines.push(K("select") + " " + sels.map((x) => x.html).join(", ")); plain.push("select " + sels.map((x) => x.plain).join(", "));
    const t0 = E.T[0];
    lines.push(K("from") + " " + ac(t0.t, t0.t) + " " + ac(t0.a, t0.t)); plain.push(`from ${t0.t} ${t0.a}`);
    (cfg.joins || []).forEach((j, k) => {
      const t = E.T[k + 1], kw = (j.tipo || "inner") + " join";
      if (j.tipo === "cross") { lines.push(K(kw) + " " + ac(t.t, t.t) + " " + ac(t.a, t.t)); plain.push(`${kw} ${t.t} ${t.a}`); return; }
      const [x, y] = j.on, ax = split(x)[0], ay = split(y)[0];
      const ex = j.extra ? ` ${K("and")} ${ac(j.extra.col, t.t)} ${j.extra.op || "="} <span class="s">${esc(typeof j.extra.val === "string" ? "'" + j.extra.val + "'" : j.extra.val)}</span>` : "";
      lines.push(K(kw) + " " + ac(t.t, t.t) + " " + ac(t.a, t.t) + " " + K("on") + " " + ac(x, tabOf[ax]) + " = " + ac(y, tabOf[ay]) + ex);
      plain.push(`${kw} ${t.t} ${t.a} on ${x} = ${y}` + (j.extra ? ` and ${j.extra.col} ${j.extra.op || "="} ${typeof j.extra.val === "string" ? "'" + j.extra.val + "'" : j.extra.val}` : ""));
    });
    if ((cfg.where || []).length) {
      const w = cfg.where.map((c) => {
        const op = c.op || "=", al = split(c.col)[0];
        const val = op.startsWith("is ") ? "" : " " + (Array.isArray(c.val) ? "(" + c.val.map((x) => (typeof x === "string" ? `'${x}'` : x)).join(", ") + ")" : typeof c.val === "string" ? `'${c.val}'` : c.val);
        return { plain: c.col + " " + op + val, html: ac(c.col, tabOf[al]) + " " + op + (val ? ` <span class="s">${esc(val.trim())}</span>` : "") };
      });
      lines.push(K("where") + " " + w.map((x) => x.html).join(" " + K("and") + " ")); plain.push("where " + w.map((x) => x.plain).join(" and "));
    }
    if (E.hasAgg) {
      const g = E.sel.filter((s) => s.kind !== "agg");
      if (g.length) {
        const txt = g.map((s) => (s.kind === "col" ? s.al + "." + s.col : s.expr));
        lines.push(K("group by") + " " + g.map((s, i) => ac(txt[i], tabOf[s.t || s.al])).join(", ")); plain.push("group by " + txt.join(", "));
      }
    }
    if ((cfg.orden || []).length) { lines.push(K("order by") + " " + esc(cfg.orden.join(", "))); plain.push("order by " + cfg.orden.join(", ")); }
    if (cfg.limite) { lines.push(K("limit") + " " + cfg.limite); plain.push("limit " + cfg.limite); }
    lines[lines.length - 1] += ";"; plain[plain.length - 1] += ";";
    return { html: lines.join("\n"), plain: plain.join("\n") };
  }

  /* ---------- panel lateral ---------- */
  const TIPO = {
    inner: "Solo las filas que tienen pareja en las dos tablas. Las demás no salen.",
    left: "Todas las filas de la tabla de la izquierda, tengan pareja o no. Sin pareja, las columnas de la derecha salen a NULL.",
    right: "Todas las filas de la tabla de la derecha, tengan pareja o no. Sin pareja, las columnas de la izquierda salen a NULL.",
    full: "Todas las filas de las dos tablas. Donde falta la pareja, ese lado sale a NULL.",
    cross: "Todas las combinaciones posibles (A × B). No hay ON ni pareja.",
  };
  function aside(cfg, E) {
    const tabOf = {}; E.T.forEach((t) => { tabOf[t.a] = t.t; });
    const selLis = E.sel.map((s) => {
      if (s.kind === "col") return `<li>${ac(s.al + "." + s.col, tabOf[s.al])} <span class="why">columna <b>${esc(s.col)}</b> de ${esc(tabOf[s.al])}${s.as ? ` · sale como <b>${esc(s.as)}</b>` : ""}</span></li>`;
      if (s.kind === "agg") return `<li>${ac(s.agg + "(" + (s.col === "*" ? "*" : s.col) + ")", tabOf[s.t])} <span class="why">calculado: ${{ count: "cuenta filas", sum: "suma", avg: "media", max: "máximo", min: "mínimo" }[s.agg]}${s.round !== undefined ? ` redondeado a ${s.round}` : ""} · sale como <b>${esc(s.name)}</b></span></li>`;
      return `<li>${ac(s.expr, tabOf[s.t])} <span class="why">calculado${s.why ? ": " + esc(s.why) : ""} · sale como <b>${esc(s.name)}</b></span></li>`;
    }).join("");
    const t0 = E.T[0];
    let h = `<div class="join__sec"><h4>SELECT</h4><ul>${selLis}</ul></div>`;
    h += `<div class="join__sec"><h4>FROM</h4><p>Parto de ${ac(t0.t + " " + t0.a, t0.t)}</p></div>`;
    (cfg.joins || []).forEach((j, k) => {
      const t = E.T[k + 1], tipo = j.tipo || "inner";
      h += `<div class="join__sec"><h4>${tipo.toUpperCase()} JOIN <span class="join__nb">${k + 1}</span></h4><p>Uno ${ac(t.t + " " + t.a, t.t)}</p>`;
      if (j.on) { const [x, y] = j.on, ax = split(x)[0], ay = split(y)[0]; h += `<p>por ${ac(x, tabOf[ax])} = ${ac(y, tabOf[ay])}</p>`; }
      if (j.extra) h += `<p>y además ${ac(j.extra.col, t.t)} <span class="why">${esc(j.extra.op || "=")} ${esc(j.extra.val)} · filtra la tabla ${esc(t.t)} <b>antes</b> de unir</span></p>`;
      h += `<p class="why">${TIPO[tipo]}</p></div>`;
    });
    if ((cfg.where || []).length) h += `<div class="join__sec"><h4>WHERE</h4><ul>${cfg.where.map((c) => `<li>${ac(c.col, tabOf[split(c.col)[0]])} <span class="why">${esc(c.op || "=")} ${c.val === undefined ? "" : esc(Array.isArray(c.val) ? c.val.map((x) => (typeof x === "string" ? `'${x}'` : x)).join(", ") : typeof c.val === "string" ? "'" + c.val + "'" : c.val)}${c.why ? " · " + esc(c.why) : ""}</span></li>`).join("")}</ul></div>`;
    if (E.hasAgg && E.sel.some((s) => s.kind !== "agg")) h += `<div class="join__sec"><h4>GROUP BY</h4><p class="why">Una fila por cada ${E.sel.filter((s) => s.kind !== "agg").map((s) => esc(s.name)).join(" + ")}; las funciones calculan dentro de cada grupo.</p></div>`;
    if ((cfg.orden || []).length) h += `<div class="join__sec"><h4>ORDER BY</h4><p class="why">${esc(cfg.orden.join(", "))}</p></div>`;
    return h;
  }

  /* ---------- diagrama ---------- */
  let uid = 0;
  function diagram(cfg, E) {
    const id = "jv" + ++uid, n = E.T.length, ROW = 22, HEAD = 28, COLH = 22, TOP = 30, M = 10;
    const keyCols = E.T.map(() => new Set()), selCols = E.T.map(() => new Set());
    (cfg.joins || []).forEach((j) => { if (j.on) j.on.forEach((o) => { const [a, c] = split(o); keyCols[E.idx[a]].add(c); }); });
    E.sel.forEach((s) => { if (s.kind === "col" || (s.kind === "agg" && s.col !== "*")) { const i = E.idx[s.al]; if (i !== undefined) selCols[i].add(s.col); } });
    const vis = E.T.map((t, i) => t.data.rows.map((_, r) => r).filter((r) => !(cfg.soloUsadas && E.state[i][r] !== "ok" && E.state[i][r] !== "null")));
    const boxes = E.T.map((t, i) => {
      const cols = t.cols, w = cols.map((c) => Math.max(c.length * 7.6 + 18, 40, ...vis[i].map((r) => String(show(c, t.data.rows[r][c]) ?? "NULL").length * 7.6 + 18)));
      if (E.state[i].some((st, r) => vis[i].includes(r) && st !== "ok")) w[w.length - 1] += 24;
      return { cols, w, W: w.reduce((a, b) => a + b, 0) };
    });
    const gap = n === 1 ? 0 : n === 2 ? 130 : 86;
    let x = M; boxes.forEach((b) => { b.x = x; x += b.W + gap; });
    const maxRows = Math.max(...vis.map((v) => v.length));
    const Wt = x - gap + M, Ht = TOP + HEAD + COLH + maxRows * ROW + 14;
    const yRow = (i, r) => TOP + HEAD + COLH + vis[i].indexOf(r) * ROW + ROW / 2;
    const tc = (i) => `style="--tc:var(--t-${E.T[i].t})"`;
    let svg = `<svg class="join__dia" style="max-width:${Math.round(Wt * 1.5)}px" viewBox="0 0 ${Math.round(Wt)} ${Math.round(Ht)}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagrama de la consulta: ${esc(E.T.map((t) => t.t).join(", "))}">`;
    svg += `<defs>${E.T.map((t, i) => `<marker id="${id}m${i}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" ${tc(i)} class="join__mk"/></marker>`).join("")}</defs>`;
    /* líneas debajo de las cajas */
    E.links.forEach((l, k) => {
      const A = boxes[l.oi], B = boxes[l.ni], j = cfg.joins[k];
      const sa = E.T[l.oi], sb = E.T[l.ni];
      let child = l.ni; if (j.on) { const [a, c] = split(j.on.find((o) => split(o)[0] === sb.a)); if (sb.data.pk === c) child = l.oi; }
      l.pairs.forEach(([a, b]) => {
        if (!vis[l.oi].includes(a) || !vis[l.ni].includes(b)) return;
        const x1 = A.x + A.W, x2 = B.x, y1 = yRow(l.oi, a), y2 = yRow(l.ni, b), mid = (x1 + x2) / 2;
        const used = E.kept.some((r) => r[l.oi] === a && r[l.ni] === b);
        const d = child === l.ni ? `M${x2},${y2} C${mid},${y2} ${mid},${y1} ${x1 + 3},${y1}` : `M${x1},${y1} C${mid},${y1} ${mid},${y2} ${x2 - 3},${y2}`;
        svg += `<path class="join__edge${used ? "" : " join__edge--off"}" ${tc(child)} d="${d}" marker-end="url(#${id}m${child})"/>`;
      });
      const cx = (A.x + A.W + B.x) / 2;
      svg += `<circle class="join__num" cx="${cx}" cy="${TOP - 10}" r="10"/><text class="join__numt" x="${cx}" y="${TOP - 6}" text-anchor="middle">${k + 1}</text>`;
    });
    /* cajas */
    E.T.forEach((t, i) => {
      const b = boxes[i], bx = b.x;
      svg += `<g ${tc(i)} class="join__tbl"><rect class="join__box" x="${bx}" y="${TOP}" width="${b.W}" height="${HEAD + COLH + vis[i].length * ROW + 4}"/>`;
      svg += `<rect class="join__head" x="${bx}" y="${TOP}" width="${b.W}" height="${HEAD}"/>`;
      svg += `<text class="join__tt" x="${bx + 10}" y="${TOP + 18}">${esc(t.t)}</text><text class="join__al" x="${bx + b.W - 10}" y="${TOP + 18}" text-anchor="end">${esc(t.a)}</text>`;
      let cx = bx;
      b.cols.forEach((c, k) => {
        const w = b.w[k], key = keyCols[i].has(c), sel = selCols[i].has(c);
        if (key) svg += `<rect class="join__key" x="${cx}" y="${TOP + HEAD}" width="${w}" height="${COLH + vis[i].length * ROW}"/>`;
        svg += `<text class="join__col" x="${cx + 9}" y="${TOP + HEAD + 15}">${esc(c)}</text>`;
        if (sel) svg += `<rect class="join__sel" x="${cx + 1}" y="${TOP + HEAD + 1}" width="${w - 2}" height="${COLH - 2}"/>`;
        vis[i].forEach((r, ri) => {
          const v = show(c, t.data.rows[r][c]);
          svg += `<text class="join__cell${v === null ? " join__cell--null" : ""}${E.state[i][r] === "ok" ? "" : " join__cell--dim"}" x="${cx + 9}" y="${TOP + HEAD + COLH + ri * ROW + 15}">${esc(v === null ? "NULL" : v)}</text>`;
        });
        cx += w;
      });
      vis[i].forEach((r, ri) => {
        const st = E.state[i][r]; if (st === "ok") return;
        const y = TOP + HEAD + COLH + ri * ROW + 15;
        svg += st === "null" ? `<text class="join__mark join__mark--null" x="${bx + b.W - 8}" y="${y}" text-anchor="end">∅</text>` : `<text class="join__mark" x="${bx + b.W - 8}" y="${y}" text-anchor="end">✕</text>`;
      });
      svg += `</g>`;
    });
    return svg + `</svg>`;
  }

  /* ---------- resultado ---------- */
  function result(cfg, E) {
    const MAX = cfg.maxFilas || 12, tabOf = {}; E.T.forEach((t) => { tabOf[t.a] = t.t; });
    const head = E.sel.map((s) => `<th ${tcolor(tabOf[s.t || s.al] || E.T[0].t)}>${esc(s.name)}</th>`).join("");
    const body = E.out.slice(0, MAX).map((r) => `<tr>${r.map((c) => {
      const s = c.s, tn = tabOf[s.t || s.al] || E.T[0].t, v = c.v === null ? null : (s.kind === "col" ? show(s.col, c.v) : s.dec !== undefined ? Number(c.v).toFixed(s.dec) : s.kind === "agg" && s.agg !== "count" && s.round !== undefined ? Number(c.v).toFixed(s.round) : s.kind === "agg" && s.agg !== "count" && DEC2.has(s.col) ? Number(c.v).toFixed(2) : String(c.v));
      return v === null ? `<td class="join__null" ${tcolor(tn)}>NULL</td>` : `<td ${tcolor(tn)}>${esc(v)}</td>`;
    }).join("")}</tr>`).join("");
    const more = E.out.length > MAX ? `<tr class="more"><td colspan="${E.sel.length}">… ${E.out.length} filas en total</td></tr>` : "";
    return `<table class="join__res"><thead><tr>${head}</tr></thead><tbody>${body || `<tr class="more"><td colspan="${E.sel.length}">0 filas</td></tr>`}${more}</tbody></table>`;
  }

  /* ---------- bloque ---------- */
  function joinBlock(cfg, slug) {
    const E = engine(cfg), P = sqlParts(cfg, E), sql = cfg.sql || P.plain;
    const ed = APP._live.push({ sql, titulo: "Ejecútalo y compáralo con el diagrama" }) - 1;
    const tipo = (cfg.joins && cfg.joins[0] && cfg.joins[0].tipo) || null;
    const legend = E.T.length > 1 || E.state[0].some((s) => s !== "ok")
      ? `<p class="join__legend"><span class="join__lg"><i class="join__lg-key"></i> columna del <code>ON</code></span><span class="join__lg"><i class="join__lg-sel"></i> columna que sale</span><span class="join__lg">∅ sale con NULL</span><span class="join__lg">✕ no sale</span></p>` : "";
    const porque = cfg.porque && cfg.porque.length ? `<div class="join__why"><h4>Por qué sale esto</h4><ul>${cfg.porque.map((p) => `<li>${APP.inline(p, slug)}</li>`).join("")}</ul></div>` : "";
    return `<article class="join" ${cfg.id ? `id="${esc(cfg.id)}"` : ""}><header class="join__header">${cfg.n !== undefined ? `<span class="join__n">${esc(cfg.n)}</span>` : ""}<h3 class="join__title">${APP.inline(cfg.titulo, slug)}</h3>${tipo ? `<span class="chip chip--outline">${tipo.toUpperCase()} JOIN</span>` : ""}</header>` +
      (cfg.idea ? `<p class="join__idea">${APP.inline(cfg.idea, slug)}</p>` : "") +
      `<div class="join__grid"><aside class="join__aside">${aside(cfg, E)}</aside><div class="join__gfx">${diagram(cfg, E)}${legend}</div></div>` +
      `<pre class="join__sql" tabindex="0"><code>${P.html}</code></pre>` +
      `<div class="join__out"><span class="join__lab">Resultado (calculado con los datos reales)</span>${result(cfg, E)}</div>` +
      porque + `<div data-live="${ed}"></div></article>`;
  }

  /* ---------- mapa de tablas y leyenda ---------- */
  function mapa() {
    const D = db();
    const TB = {
      categorias: { x: 10, y: 12, cols: ["id_categoria", "nombre"] },
      productos: { x: 290, y: 12, cols: ["id_producto", "id_categoria", "nombre", "precio"] },
      clientes: { x: 580, y: 12, cols: ["id_cliente", "nombre", "apellidos", "ciudad"] },
      empleados: { x: 10, y: 250, cols: ["id_empleado", "nombre", "puesto", "id_jefe"] },
      lineas_pedido: { x: 290, y: 250, cols: ["id_pedido", "id_producto", "cantidad", "precio_unitario"] },
      pedidos: { x: 580, y: 250, cols: ["id_pedido", "id_cliente", "id_empleado", "estado"] },
    };
    const W = 220, HD = 26, RW = 22;
    const FK = [["productos", "id_categoria", "categorias", "id_categoria"], ["lineas_pedido", "id_producto", "productos", "id_producto"], ["lineas_pedido", "id_pedido", "pedidos", "id_pedido"], ["pedidos", "id_cliente", "clientes", "id_cliente"], ["pedidos", "id_empleado", "empleados", "id_empleado"], ["empleados", "id_jefe", "empleados", "id_empleado"]];
    const ry = (t, c) => TB[t].y + HD + TB[t].cols.indexOf(c) * RW + RW / 2 + 2;
    let s = `<svg class="join__dia join__dia--map" viewBox="0 0 810 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mapa de las seis tablas de tienda_online y sus claves foráneas"><defs>${Object.keys(TB).map((t) => `<marker id="mp-${t}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" style="--tc:var(--t-${t})" class="join__mk"/></marker>`).join("")}</defs>`;
    FK.forEach(([a, ca, b, cb]) => {
      const A = TB[a], B = TB[b], y1 = ry(a, ca), y2 = ry(b, cb); let d;
      if (a === b) { const x = A.x + W; d = `M${x},${y1} C${x + 40},${y1} ${x + 40},${y2} ${x + 3},${y2}`; }
      else if (A.y === B.y) { const left = A.x > B.x, x1 = left ? A.x : A.x + W, x2 = left ? B.x + W : B.x; d = `M${x1},${y1} L${x2 + (left ? 3 : -3)},${y2}`; }
      else if (A.x === B.x) { d = `M${A.x + W - 14},${A.y} L${B.x + W - 14},${B.y + HD + TB[b].cols.length * RW + 6}`; }
      else { d = `M${A.x},${y1} L${B.x + W},${B.y + HD + TB[b].cols.length * RW + 6}`; }
      if (a === "pedidos" && b === "empleados") d = `M${A.x + 30},${A.y + HD + TB[a].cols.length * RW + 6} L${A.x + 30},388 L${B.x + 60},388 L${B.x + 60},${B.y + HD + TB[b].cols.length * RW + 6}`;
      s += `<path class="join__edge" style="--tc:var(--t-${a})" d="${d}" marker-end="url(#mp-${a})"/>`;
    });
    Object.entries(TB).forEach(([t, b]) => {
      const h = HD + b.cols.length * RW + 6;
      s += `<g class="join__tbl" style="--tc:var(--t-${t})"><rect class="join__box" x="${b.x}" y="${b.y}" width="${W}" height="${h}"/><rect class="join__head" x="${b.x}" y="${b.y}" width="${W}" height="${HD}"/><text class="join__tt" x="${b.x + 10}" y="${b.y + 18}">${t}</text>`;
      b.cols.forEach((c, i) => {
        const pk = D[t].pk === c, fk = FK.some((f) => f[0] === t && f[1] === c);
        s += `<text class="join__col" x="${b.x + 10}" y="${b.y + HD + i * RW + 17}">${c}</text>`;
        if (pk || fk) s += `<text class="join__key-tag" x="${b.x + W - 10}" y="${b.y + HD + i * RW + 17}" text-anchor="end">${pk ? "PK" : "FK"}</text>`;
      });
      s += `</g>`;
    });
    return s + `</svg>`;
  }

  function leyenda() {
    const chips = Object.keys(PK).concat("lineas_pedido").map((t) => `<span class="join__chip" style="--tc:var(--t-${t})">${t}</span>`).join("");
    return `<div class="join__panel"><h4>Cómo leer cada diagrama</h4><div class="join__chips">${chips}</div><ul>` +
      `<li><b>Cada tabla tiene su color</b> y lo conserva en todo: caja, flecha, texto de la consulta y resultado.</li>` +
      `<li><b>Columna sombreada</b> = la que se usa en el <code>ON</code> (PK de una tabla y FK de la otra).</li>` +
      `<li><b>Cabecera con contorno</b> = columna que sale en el <code>select</code>.</li>` +
      `<li><b>Flecha</b> = una pareja que cumple el <code>ON</code>. Va del color de la tabla que guarda la FK. El número del círculo naranja es el orden del <code>JOIN</code>.</li>` +
      `<li><b>∅</b> = la fila sale con <code>NULL</code> en la otra tabla. <b>✕</b> = la fila no sale en el resultado.</li>` +
      `<li><b>Casilla rayada con NULL</b> = valor que no existe porque no hubo pareja.</li></ul></div>`;
  }

  APP.joinBlock = function (cfg, slug) {
    if (cfg === "mapa") return `<div class="join__panel"><h4>Mapa de tablas de tienda_online</h4>${mapa()}<p class="join__legend">Cada flecha sale de una FK y llega a una PK. Tiene el color de la tabla que guarda la FK.</p></div>`;
    if (cfg === "leyenda") return leyenda();
    return joinBlock(cfg, slug);
  };
  APP.joinPlain = (cfg) => {
    if (typeof cfg === "string") return cfg === "mapa" ? "mapa de tablas tienda_online claves foraneas PK FK" : "como leer diagramas colores tabla";
    try { const E = engine(cfg); return [cfg.titulo, cfg.idea, sqlParts(cfg, E).plain].concat(cfg.porque || []).filter(Boolean).join(" "); } catch (e) { return cfg.titulo || ""; }
  };
})();

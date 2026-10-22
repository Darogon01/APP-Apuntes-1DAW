/* Ejecutor de SQL en el navegador: PostgreSQL real (PGlite, compilado a WebAssembly) con la BD «tienda_online».
   Todo ocurre en la página del usuario: no hay servidor. La BD se carga la primera vez que se pulsa «Ejecutar». */
(function () {
  "use strict";
  const APP = window.APP;
  let uid = 0, dbPromise = null, queue = Promise.resolve();

  const baseUrl = () => APP.pgliteUrl || "vendor/pglite/index.js";

  function openDb() {
    if (!dbPromise) {
      dbPromise = (async () => {
        const url = new URL(baseUrl(), document.baseURI).href;
        const { PGlite } = await import(url);
        const db = await PGlite.create();
        await db.exec(APP.tiendaSql);
        return db;
      })().catch((e) => { dbPromise = null; throw e; });
    }
    return dbPromise;
  }
  async function resetDb() {
    const db = await openDb();
    try { await db.exec("ROLLBACK"); } catch (_) {}
    await db.exec("DROP SCHEMA public CASCADE; CREATE SCHEMA public;");
    await db.exec(APP.tiendaSql);
  }
  const serial = (fn) => (queue = queue.then(fn, fn));

  function fmt(v) {
    if (v === null || v === undefined) return null;
    if (v instanceof Date) {
      const iso = v.toISOString();
      return /T00:00:00\.000Z$/.test(iso) ? iso.slice(0, 10) : iso.replace("T", " ").replace(/\.000Z$/, "").replace("Z", "");
    }
    if (typeof v === "object") return JSON.stringify(v);
    return String(v);
  }

  function resultHtml(r, n, total) {
    const esc = APP.esc;
    const head = total > 1 ? `<p class="sql-editor__caption">Resultado ${n} de ${total}</p>` : "";
    if (!r.fields || !r.fields.length) {
      const cnt = typeof r.affectedRows === "number" ? ` · ${r.affectedRows} ${r.affectedRows === 1 ? "fila afectada" : "filas afectadas"}` : "";
      return `${head}<p class="sql-editor__ok">Comando ejecutado${cnt}</p>`;
    }
    const MAX = 200, rows = r.rows.slice(0, MAX);
    const cols = r.fields.map((f) => f.name);
    const body = rows.map((row) => `<tr class="data-table__row">${cols.map((c, i) => {
      const v = fmt(row[c]);
      return `<td class="data-table__cell${i === 0 ? " data-table__cell--first" : ""}">${v === null ? '<span class="sql-editor__null">NULL</span>' : esc(v)}</td>`;
    }).join("")}</tr>`).join("");
    return `${head}<div class="data-table sql-editor__table" tabindex="0" role="region" aria-label="Resultado de la consulta"><table class="data-table__table"><thead><tr class="data-table__row">${cols.map((c) => `<th class="data-table__head" scope="col">${esc(c)}</th>`).join("")}</tr></thead><tbody>${body}</tbody></table></div>` +
      `<p class="sql-editor__count">${r.rows.length} ${r.rows.length === 1 ? "fila" : "filas"}${r.rows.length > MAX ? ` (se muestran ${MAX})` : ""}</p>`;
  }

  APP.mountSql = function (el, cfg) {
    const id = "sql" + ++uid;
    const original = String(cfg.sql).replace(/^\n/, "").replace(/\s+$/, "");
    const rows = Math.min(14, Math.max(3, original.split("\n").length + 1));
    el.className = "sql-editor";
    el.innerHTML =
      `<div class="sql-editor__bar"><span class="sql-editor__title">${APP.esc(cfg.titulo || "Pruébalo en la BD tienda_online")}</span>` +
      `<div class="sql-editor__actions"><button class="sql-editor__button sql-editor__button--run" type="button" data-run>Ejecutar</button>` +
      `<button class="sql-editor__button" type="button" data-reset-code>Restablecer</button>` +
      `<button class="sql-editor__button" type="button" data-reset-db title="Vuelve a crear la base de datos con sus datos originales">Restablecer BD</button></div></div>` +
      `<label class="sr-only" for="${id}-t">Consulta SQL editable</label>` +
      `<textarea class="sql-editor__input" id="${id}-t" rows="${rows}" spellcheck="false" autocomplete="off" autocapitalize="off"></textarea>` +
      `<div class="sql-editor__output" aria-live="polite"><p class="sql-editor__hint">Pulsa «Ejecutar» o <kbd class="key">Ctrl</kbd> + <kbd class="key">Intro</kbd>. Se ejecuta PostgreSQL de verdad en tu navegador.</p></div>`;
    const ta = el.querySelector("textarea"), out = el.querySelector(".sql-editor__output");
    ta.value = original;
    const set = (h) => { out.innerHTML = h; };

    async function run() {
      const sql = ta.value;
      if (!sql.trim()) return;
      set(`<p class="sql-editor__status">${dbPromise ? "Ejecutando…" : "Cargando PostgreSQL en el navegador (≈ 16 MB, solo la primera vez)…"}</p>`);
      el.classList.add("sql-editor--busy");
      await serial(async () => {
        try {
          const db = await openDb();
          const t0 = performance.now();
          const res = await db.exec(sql);
          const ms = Math.round(performance.now() - t0);
          set(res.map((r, i) => resultHtml(r, i + 1, res.length)).join("") + `<p class="sql-editor__time">${ms} ms</p>`);
        } catch (e) {
          set(`<div class="sql-editor__error" role="alert"><strong>Error</strong> ${APP.esc(e.message || String(e))}</div>`);
        } finally { el.classList.remove("sql-editor--busy"); }
      });
    }
    el.addEventListener("click", async (e) => {
      const b = e.target.closest("button"); if (!b || !el.contains(b)) return;
      if (b.hasAttribute("data-run")) run();
      else if (b.hasAttribute("data-reset-code")) { ta.value = original; set(""); }
      else if (b.hasAttribute("data-reset-db")) {
        set(`<p class="sql-editor__status">Restableciendo la base de datos…</p>`);
        await serial(async () => {
          try { await resetDb(); set(`<p class="sql-editor__ok">Base de datos restablecida: datos originales de tienda_online.</p>`); }
          catch (err) { set(`<div class="sql-editor__error" role="alert"><strong>Error</strong> ${APP.esc(err.message || String(err))}</div>`); }
        });
      }
    });
    ta.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") { e.preventDefault(); run(); }
      if (e.key === "Tab" && !e.shiftKey) { e.preventDefault(); const s = ta.selectionStart; ta.setRangeText("  ", s, ta.selectionEnd, "end"); }
    });
  };
})();

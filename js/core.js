/* Núcleo de la app: registro de temarios y dibujo de bloques de contenido (HTML semántico + BEM).
   El contenido vive en content/<temario>.js como datos de la propia app
   (módulos → secciones → bloques). Aquí solo se dibuja. */
(function () {
  "use strict";
  const APP = (window.APP = {
    subjects: {},
    order: ["html", "css", "js", "java", "sql"],
    _live: [], _codes: [],
    register(s) { const p = this.subjects[s.slug] || {}; this.subjects[s.slug] = Object.assign(p, s, s.contenido ? { contenido: Object.assign(p.contenido || {}, s.contenido) } : {}); },
  });

  const esc = (t) => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  APP.esc = esc;
  APP.norm = (t) => String(t).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

  /* Texto en línea:  `código`  **negrita**  {{Tecla}}  [[ok]] [[half]] [[no]]
     [texto](@id-de-sección)  [texto](https://…)  */
  const DOT = { ok: "full", half: "half", no: "empty" };
  APP.inline = function (t, slug) {
    const codes = [];
    let h = String(t).replace(/`([^`]+)`/g, (m, c) => { codes.push(`<code class="inline-code">${esc(c)}</code>`); return `\u0000${codes.length - 1}\u0000`; });
    h = esc(h)
      .replace(/\*\*(.+?)\*\*/g, '<strong class="emphasis">$1</strong>')
      .replace(/\{\{(.+?)\}\}/g, '<kbd class="key">$1</kbd>')
      .replace(/\[\[(ok|half|no)\]\]/g, (m, k) => `<span class="status-dot status-dot--${DOT[k]}" aria-hidden="true"></span>`)
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (m, txt, url) => {
        if (url.startsWith("@")) return `<a class="link" href="#/${slug}/${url.slice(1)}">${txt}</a>`;
        if (/^https?:/.test(url)) return `<a class="link" href="${url}" target="_blank" rel="noopener">${txt}</a>`;
        return m;
      });
    return h.replace(/\u0000(\d+)\u0000/g, (m, i) => codes[+i]);
  };
  APP.textOnly = (t) => APP.inline(t, "").replace(/<[^>]+>/g, "");

  const paras = (t, slug, cls) => String(t).split(/\n\n+/).map((x) => `<p class="${cls}">${APP.inline(x.trim(), slug)}</p>`).join("");

  function codeBlock(b) {
    const text = String(b.code).replace(/^\n/, "").replace(/\s+$/, "");
    const lang = (b.lang || "").toLowerCase();
    let html;
    try { html = window.hljs.getLanguage(lang) ? window.hljs.highlight(text, { language: lang, ignoreIllegals: true }).value : esc(text); }
    catch (e) { html = esc(text); }
    const n = text.split("\n").length;
    const idx = APP._codes.push(text) - 1;
    return `<figure class="code-block"><figcaption class="code-block__bar"><span class="code-block__title">${esc(b.titulo || lang)}</span>` +
      `<button class="code-block__copy" type="button" data-copy="${idx}">Copiar</button></figcaption>` +
      `<div class="code-block__body"><pre class="code-block__gutter" aria-hidden="true">${Array.from({ length: n }, (_, i) => i + 1).join("\n")}</pre>` +
      `<pre class="code-block__pre" tabindex="0"><code class="code-block__code">${html}</code></pre></div></figure>`;
  }

  function consoleBlock(b) {
    const text = String(b.consola).replace(/^\n/, "").replace(/\s+$/, "");
    return `<figure class="console"><div class="console__bar" aria-hidden="true"><i class="console__dot"></i><i class="console__dot"></i><i class="console__dot"></i></div>` +
      `<pre class="console__output" tabindex="0">${esc(text)}</pre></figure>`;
  }

  function table(b, slug) {
    const label = esc(b.titulo || "Tabla");
    return `<div class="data-table" tabindex="0" role="region" aria-label="${label}"><table class="data-table__table"><thead><tr class="data-table__row">` +
      b.cabs.map((c) => `<th class="data-table__head" scope="col">${APP.inline(c, slug)}</th>`).join("") + `</tr></thead><tbody>` +
      b.filas.map((f) => `<tr class="data-table__row">${f.map((c, i) => `<td class="data-table__cell${i === 0 ? " data-table__cell--first" : ""}">${APP.inline(c, slug)}</td>`).join("")}</tr>`).join("") +
      `</tbody></table></div>`;
  }

  const WARNING = { warning: "Ojo", caution: "Cuidado" };
  const CALLOUT = { note: "Nota", tip: "Truco", important: "Importante" };

  APP.block = function (b, slug) {
    if (b.p != null) return paras(b.p, slug, "text");
    if (b.h4) return `<h3 class="subhead">${APP.inline(b.h4, slug)}</h3>`;
    if (b.code != null) return codeBlock(b);
    if (b.consola != null) return consoleBlock(b);
    if (b.tabla) return table(b.tabla, slug);
    if (b.lista) {
      const tag = b.ordenada ? "ol" : "ul";
      return `<${tag} class="list${b.ordenada ? " list--ordered" : ""}">${b.lista.map((i) => `<li class="list__item">${APP.inline(i, slug)}</li>`).join("")}</${tag}>`;
    }
    if (b.live) { const i = APP._live.push(b.live) - 1; return `<div data-live="${i}"></div>`; }
    if (b.img) return `<figure class="figure"><img class="figure__img" src="${esc(b.img)}" alt="${esc(b.alt || "")}" loading="lazy">${b.caption ? `<figcaption class="figure__caption">${APP.inline(b.caption, slug)}</figcaption>` : ""}</figure>`;
    if (b.details) return `<details class="disclosure"><summary class="disclosure__summary">${APP.inline(b.details.titulo, slug)}</summary><div class="disclosure__body">${b.details.bloques.map((x) => APP.block(x, slug)).join("")}</div></details>`;
    if (b.aviso) return `<aside class="warning" role="note"><span class="warning__icon" aria-hidden="true">!</span><div class="warning__body"><strong class="warning__title">${WARNING[b.tipo || "warning"]}</strong>${paras(b.aviso, slug, "warning__text")}</div></aside>`;
    if (b.nota) return `<aside class="callout" role="note"><strong class="callout__title">${CALLOUT[b.tipo || "note"]}</strong>${paras(b.nota, slug, "callout__text")}</aside>`;
    if (b.sub) return `<p class="text text--small">${APP.inline(b.sub, slug)}</p>`;
    return "";
  };

  APP.section = function (s, slug) {
    return `<section class="section" aria-labelledby="${s.id}"><h2 class="section__title" id="${s.id}">${APP.inline(s.titulo, slug)}</h2>` +
      s.bloques.map((b) => APP.block(b, slug)).join("") + `</section>`;
  };

  /* texto plano de un bloque, para el buscador */
  APP.plain = function (b) {
    if (b.p != null) return b.p;
    if (b.code != null) return b.code;
    if (b.consola != null) return b.consola;
    if (b.tabla) return b.tabla.cabs.join(" ") + " " + b.tabla.filas.map((f) => f.join(" ")).join(" ");
    if (b.lista) return b.lista.join(" ");
    if (b.aviso) return b.aviso;
    if (b.nota) return b.nota;
    if (b.sub) return b.sub;
    if (b.h4) return b.h4;
    if (b.details) return b.details.titulo + " " + b.details.bloques.map(APP.plain).join(" ");
    if (b.live) return [b.live.titulo, b.live.html, b.live.css, b.live.js, b.live.sql].filter(Boolean).join(" ");
    return "";
  };
})();

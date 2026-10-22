/* Apuntes 1.º DAW — app. Navegación por hash: #/<temario>/<módulo o sección>. */
(function () {
  "use strict";
  const APP = window.APP, S = APP.subjects;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = APP.esc, norm = APP.norm;
  const sidebar = $("#sidebar"), main = $("#main"), navList = $("#main-nav-list");
  let current = "";

  /* ---------------------------------------------------------- datos */
  const written = (s, m) => !!(s.contenido && s.contenido[m.id]);
  const contentOf = (s, m) => (s.contenido || {})[m.id];
  function anchorIndex(s) {                 // id de sección o de módulo -> índice de módulo
    const map = {};
    s.modulos.forEach((m, i) => {
      map[m.id] = i;
      const c = contentOf(s, m);
      if (c) c.secciones.forEach((sec) => { map[sec.id] = i; });
    });
    return map;
  }
  const isMission = (m) => /^(Misiones|BD de pr)/.test(m.title);

  /* ---------------------------------------------------------- iconos HUD */
  const GLYPH = {
    home: '<path d="M38 44 L56 60 L38 76" fill="none"/><path d="M62 78 H84" fill="none"/><rect x="88" y="74" width="6" height="8" fill="#E8621C" stroke="none"/>',
    sql: '<ellipse cx="60" cy="38" rx="24" ry="8" fill="none"/><path d="M36 38 V82 C36 90 84 90 84 82 V38" fill="none"/><path d="M36 56 C36 64 84 64 84 56" fill="none" stroke-dasharray="4 4"/><path d="M36 70 C36 78 84 78 84 70" fill="none" stroke-dasharray="4 4"/><rect x="52" y="49" width="6" height="6" fill="#E8621C" stroke="none"/><rect x="61" y="49" width="6" height="6" fill="none"/>',
    java: '<path d="M38 52 H78 V78 C78 86 70 90 58 90 C46 90 38 86 38 78 Z" fill="none"/><path d="M78 58 H84 C92 58 92 74 82 74 H78" fill="none"/><path d="M50 44 C46 38 54 36 50 30 M62 44 C58 38 66 36 62 30" fill="none"/><rect x="48" y="62" width="20" height="6" fill="#E8621C" stroke="none"/>',
    html: '<path d="M46 44 L30 60 L46 76" fill="none"/><path d="M74 44 L90 60 L74 76" fill="none"/><path d="M66 38 L54 82" fill="none"/><rect x="57" y="56" width="6" height="8" fill="#E8621C" stroke="none"/>',
    css: '<rect x="30" y="34" width="60" height="52" fill="none"/><rect x="40" y="44" width="40" height="32" fill="none" stroke-dasharray="4 4"/><rect x="50" y="54" width="20" height="12" fill="#E8621C" stroke="none"/>',
    js: '<path d="M48 38 C40 38 44 56 36 60 C44 64 40 82 48 82" fill="none"/><path d="M72 38 C80 38 76 56 84 60 C76 64 80 82 72 82" fill="none"/><rect x="57" y="56" width="6" height="8" fill="#E8621C" stroke="none"/>',
  };
  const icon = (k) => `<svg class="hud-icon" viewBox="0 0 120 120" aria-hidden="true" focusable="false"><circle cx="60" cy="60" r="54" fill="none" stroke="#34343C" stroke-width="1.2"/>` +
    `<path d="M2 60 H12 M108 60 H118" stroke="#E8621C" stroke-width="2"/><g stroke="#E8621C" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">${GLYPH[k]}</g></svg>`;

  /* ---------------------------------------------------------- piezas comunes */
  function renderMainNav(slug) {
    navList.innerHTML = APP.order.map((k) => {
      const on = k === slug;
      return `<li class="main-nav__item"><a class="main-nav__link${on ? " main-nav__link--active" : ""}" href="#/${k}"${on ? ' aria-current="page"' : ""}>${esc(S[k].etiqueta)}</a></li>`;
    }).join("");
  }

  function renderSidebar(s, mod) {
    if (!s) {
      sidebar.innerHTML = `<h2 class="sidebar__title">Temarios</h2><ul class="module-list module-list--wide">${APP.order.map((k) =>
        `<li><a class="module-list__link" href="#/${k}"><span class="module-list__num">${esc(S[k].etiqueta)}</span><span>${esc(S[k].modulo)}</span></a></li>`).join("")}</ul>`;
      return;
    }
    sidebar.innerHTML = `<h2 class="sidebar__title">${esc(s.nombre)} · módulos</h2><ul class="module-list">` + s.modulos.map((m) => {
      if (!written(s, m)) return `<li><span class="module-list__pending"><span class="module-list__num">${esc(m.num)}</span><span>${esc(m.title)}<em class="module-list__hint">en preparación</em></span></span></li>`;
      const on = mod && mod.id === m.id;
      return `<li><a class="module-list__link${on ? " module-list__link--active" : ""}" href="#/${s.slug}/${m.id}"${on ? ' aria-current="page"' : ""}><span class="module-list__num">${esc(m.num)}</span><span>${esc(m.title)}</span></a></li>`;
    }).join("") + `</ul>`;
    const cur = $(".module-list__link--active", sidebar);
    if (cur) sidebar.scrollTop = Math.max(0, cur.offsetTop - sidebar.clientHeight / 2);
  }

  const footer = () => `<footer class="site-footer"><span>Apuntes de 1.º DAW · versión beta</span><span>Tipografía Fira Code (SIL OFL 1.1)</span></footer>`;

  function breadcrumb(s, mod) {
    const items = [`<li class="breadcrumb__item"><a class="breadcrumb__link" href="#/">Apuntes</a></li>`];
    if (mod) {
      items.push(`<li class="breadcrumb__item"><a class="breadcrumb__link" href="#/${s.slug}">${esc(s.modulo)} · ${esc(s.nombre)}</a></li>`);
      items.push(`<li class="breadcrumb__item" aria-current="page">${esc(mod.num)} ${esc(mod.title)}</li>`);
    } else items.push(`<li class="breadcrumb__item" aria-current="page">${esc(s.modulo)} · ${esc(s.nombre)}</li>`);
    return `<nav class="breadcrumb" aria-label="Dónde estás"><ol class="breadcrumb__list">${items.join("")}</ol></nav>`;
  }

  function moduleHeader(num, title, summary) {
    const n = String(num), size = n.length <= 2 ? 34 : n.length === 3 ? 28 : 22;
    return `<header class="module-header"><div class="module-header__number" style="font-size:${size}px" aria-hidden="true">${esc(n)}</div>` +
      `<div class="module-header__bar"><h1 class="module-header__title">${esc(title)}</h1>${summary ? `<p class="module-header__summary">${esc(summary)}</p>` : ""}</div></header>`;
  }

  /* banner HUD: cabecera SYS://, título, fila de datos, icono y etiquetas */
  function banner(o) {
    return `<header class="banner" aria-labelledby="banner-title">
      <i class="banner__corner banner__corner--tl"></i><i class="banner__corner banner__corner--tr"></i><i class="banner__corner banner__corner--br"></i><i class="banner__corner banner__corner--bl"></i>
      <div class="banner__top"><span>${esc(o.sys)}</span><span class="banner__status"><i class="banner__stripe" aria-hidden="true"></i><i class="banner__block" aria-hidden="true"></i>${esc(o.status)}</span></div>
      <div class="banner__main"><div class="banner__heading"><h1 class="banner__title" id="banner-title"><span class="banner__name">${esc(o.title)}</span><span class="banner__subtitle">${o.subtitle ? "// " + esc(o.subtitle) : ""}</span></h1>
        <p class="banner__keywords">${o.keywords.map(esc).join(" · ")}</p></div>${icon(o.icon)}</div>
      <dl class="banner__stats">${o.stats.map(([k, v]) => `<div><dt class="banner__stat-label">${esc(k)}</dt><dd class="banner__stat-value">${esc(v)}</dd></div>`).join("")}</dl>
      <p class="banner__tags">${o.tags.map(([k, v]) => `<span class="banner__tag">${esc(k)} <b class="banner__tag-value">${esc(v)}</b></span>`).join("")}</p>
      <div class="ruler ruler--hud banner__ruler" aria-hidden="true"></div></header>`;
  }

  /* ---------------------------------------------------------- vistas */
  function viewHome() {
    current = "home"; renderMainNav(""); renderSidebar(null);
    document.title = "Apuntes 1.º DAW";
    const cards = APP.order.map((k) => {
      const s = S[k];
      const topics = s.modulos.filter((m) => !isMission(m)).slice(0, 2).map((m) => `<span class="chip chip--outline">${esc(m.title)}</span>`).join("");
      return `<li class="card-list__item card-list__item--topic"><a class="topic-card" href="#/${k}">
        <div class="topic-card__top"><span class="chip chip--plain">${esc(s.modulo)}</span>${icon(k)}</div>
        <h3 class="topic-card__title">${esc(s.nombre)}</h3><p class="topic-card__subtitle">${esc(s.tema)}</p>
        <div class="topic-card__chips"><span class="chip chip--accent">${s.modulos.length} módulos</span>${topics}</div></a></li>`;
    }).join("");
    const hints = [["/", "Buscar", "en todos los módulos escritos."], ["Ejecutar", "Editar el ejemplo", "Los bloques con editor se pueden modificar y se ven al momento."], ["Copiar", "Copiar el código", "Cada bloque de código tiene su botón."]]
      .map(([k, t, d]) => `<li class="card-list__item card-list__item--hint"><div class="hint-card"><span class="hint-card__key">${esc(k)}</span><h3 class="hint-card__title">${esc(t)}</h3><p class="hint-card__text">${esc(d)}</p></div></li>`).join("");
    main.innerHTML = `<div class="page page--wide"><article class="page__content">
      ${banner({ sys: "SYS://APUNTES.DAW · 1.º DAW · v0.1", status: "Beta", title: "APUNTES", subtitle: "1.º DAW", keywords: ["HTML", "CSS", "JS", "Java", "SQL"], icon: "home",
        stats: [["Temarios", "05"], ["Ejemplos", "Editables"], ["Buscador", "Tecla /"], ["Tipo", "Guía de apoyo"]],
        tags: [["Ciclo", "Grado Superior DAW"], ["Uso", "Consulta"], ["Editor", "En vivo"]] })}
      <section aria-labelledby="home-topics"><h2 class="label" id="home-topics">Temarios</h2><ul class="card-list">${cards}</ul></section>
      <div class="stripe" aria-hidden="true"></div>
      <section aria-labelledby="home-usage"><h2 class="label" id="home-usage">Cómo se usa</h2><ul class="card-list">${hints}</ul></section>
      <div class="section">${APP.block({ aviso: "Los módulos sin escribir aparecen como «en preparación». El temario de JS está planteado como el de Java, con las propiedades y métodos propios de JavaScript.", tipo: "warning" }, "")}</div>
      ${footer()}</article></div>`;
    window.scrollTo(0, 0);
  }

  function viewSubject(s) {
    current = s.slug; renderMainNav(s.slug); renderSidebar(s, null);
    document.title = `${s.nombre} · Apuntes 1.º DAW`;
    const rows = s.modulos.map((m) => {
      const ok = written(s, m);
      return `<tr class="data-table__row"><td class="data-table__cell data-table__cell--first">${esc(m.num)}</td><td class="data-table__cell">${ok ? `<a class="link" href="#/${s.slug}/${m.id}">${esc(m.title)}</a>` : esc(m.title)}</td><td class="data-table__cell">${ok ? esc(contentOf(s, m).resumen || "") : "en preparación"}</td></tr>`;
    }).join("");
    main.innerHTML = `<div class="page page--wide"><article class="page__content">${breadcrumb(s, null)}
      ${banner({ sys: `SYS://${s.slug.toUpperCase()}.REF · DAW / ${s.modulo.toUpperCase()} · v0.1`, status: "Beta", title: s.etiqueta, subtitle: "CHULETA", keywords: s.modulos.filter((m) => !isMission(m)).slice(0, 7).map((m) => m.title), icon: s.slug,
        stats: [["Módulos", String(s.modulos.length)], ["Área", s.modulo], ...s.tema.split(" · ").map((t, i) => [i ? "Herramienta" : "Versión", t])].slice(0, 4),
        tags: [["Asignatura", s.modulo], ["Ejemplos", s.slug === "java" || s.slug === "sql" ? "Código y salida" : "En vivo"]] })}
      <section aria-labelledby="subject-modules"><h2 class="sr-only" id="subject-modules">Módulos de ${esc(s.nombre)}</h2>
      <div class="data-table" tabindex="0" role="region" aria-label="Módulos de ${esc(s.nombre)}"><table class="data-table__table"><thead><tr class="data-table__row"><th class="data-table__head" scope="col">Mod</th><th class="data-table__head" scope="col">Sección</th><th class="data-table__head" scope="col">Contenido</th></tr></thead><tbody>${rows}</tbody></table></div></section>
      ${footer()}</article></div>`;
    window.scrollTo(0, 0);
  }

  function viewModule(s, i, anchor) {
    const mod = s.modulos[i], key = `${s.slug}/${mod.id}`;
    if (current !== key) {
      current = key; renderMainNav(s.slug); renderSidebar(s, mod);
      document.title = `${mod.title} · ${s.nombre} · Apuntes 1.º DAW`;
      const c = contentOf(s, mod);
      if (!c) {
        main.innerHTML = `<div class="page page--single"><article class="page__content">${breadcrumb(s, mod)}${moduleHeader(mod.num, mod.title, "")}
          <div class="section">${APP.block({ aviso: `Este módulo todavía no está escrito. [Volver al índice de ${s.nombre}](#/${s.slug})`, tipo: "warning" }, s.slug).replace(/href="([^"]*)"/, "href=\"$1\"")}</div>${footer()}</article></div>`;
        window.scrollTo(0, 0); return;
      }
      const done = s.modulos.filter((m) => written(s, m));
      const pos = done.indexOf(mod), prev = done[pos - 1], next = done[pos + 1];
      const body = (c.intro || []).map((b) => APP.block(b, s.slug)).join("") + c.secciones.map((sec) => APP.section(sec, s.slug)).join("");
      const toc = c.secciones.length > 1 ? `<aside class="toc" aria-label="En este módulo"><h2 class="toc__title">En este módulo</h2><ul class="toc__list">${c.secciones.map((sec) => `<li><a class="toc__link" href="#/${s.slug}/${sec.id}" data-id="${sec.id}">${APP.textOnly(sec.titulo)}</a></li>`).join("")}</ul></aside>` : "";
      main.innerHTML = `<div class="page${toc ? "" : " page--single"}"><article class="page__content">${breadcrumb(s, mod)}${moduleHeader(mod.num, mod.title, c.resumen)}
        <p class="module-meta"><span class="chip">${esc(s.nombre)}</span><span class="chip chip--outline">${esc(s.modulo)}</span></p><div class="ruler ruler--accent" aria-hidden="true"></div>
        <div class="section-list">${body}</div>
        <nav class="pager" aria-label="Módulos contiguos">${prev ? `<a class="pager__link" href="#/${s.slug}/${prev.id}"><span class="pager__label">‹ Anterior</span><span class="pager__title">${esc(prev.num)} ${esc(prev.title)}</span></a>` : `<span class="pager__empty"></span>`}${next ? `<a class="pager__link pager__link--next" href="#/${s.slug}/${next.id}"><span class="pager__label">Siguiente ›</span><span class="pager__title">${esc(next.num)} ${esc(next.title)}</span></a>` : `<span class="pager__empty"></span>`}</nav>${footer()}</article>${toc}</div>`;
      APP.mountLive(main);
      spyToc();
    }
    const target = anchor && anchor !== mod.id ? document.getElementById(anchor) : null;
    if (target) target.scrollIntoView(); else window.scrollTo(0, 0);
  }

  function spyToc() {
    const links = $$(".toc__link"); if (!links.length) return;
    const heads = links.map((a) => document.getElementById(a.dataset.id)).filter(Boolean);
    let ticking = false;
    const update = () => { ticking = false; let act = heads[0]; for (const h of heads) if (h.getBoundingClientRect().top < 140) act = h; links.forEach((a) => a.classList.toggle("toc__link--active", a.dataset.id === act.id)); };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    if (window._spy) window.removeEventListener("scroll", window._spy);
    window._spy = onScroll; window.addEventListener("scroll", onScroll, { passive: true }); update();
  }

  /* ---------------------------------------------------------- router */
  // El hash se guarda en una variable: así funciona también donde la barra de direcciones no se actualiza.
  let H = /^#\//.test(location.hash) ? location.hash : "";
  function route() {
    document.body.classList.remove("is-menu-open"); $("#menu-toggle").setAttribute("aria-expanded", "false");
    const [slug, ...rest] = H.replace(/^#\/?/, "").split("/");
    const anchor = decodeURIComponent(rest.join("/"));
    if (!slug || !S[slug]) return viewHome();
    const s = S[slug];
    if (!anchor) return viewSubject(s);
    const map = anchorIndex(s);
    if (anchor in map) return viewModule(s, map[anchor], anchor);
    viewSubject(s);
  }
  const go = (h) => { H = h; try { history.replaceState(null, "", h); } catch (_) {} route(); };
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#/"]'); if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey) return;
    e.preventDefault(); const h = a.getAttribute("href"); if (H === h) current = ""; go(h);
  });
  window.addEventListener("hashchange", () => { if (/^#\//.test(location.hash)) { H = location.hash; route(); } });

  /* ---------------------------------------------------------- buscador (<dialog>) */
  const dialog = $("#search-dialog"), input = $("#search-input"), results = $("#search-results");
  let index = null, selected = -1;
  function buildIndex() {
    if (index) return index;
    index = [];
    for (const k of APP.order) { const s = S[k]; for (const m of s.modulos) { const c = contentOf(s, m); if (!c) continue;
      for (const sec of c.secciones) {
        const raw = sec.bloques.map(APP.plain).join(" ").replace(/[`*_|]/g, " ").replace(/\s+/g, " ");
        index.push({ slug: k, doc: s.nombre, modNum: m.num, modTitle: m.title, id: sec.id, title: sec.titulo.replace(/`/g, ""), raw, n: norm(raw), nt: norm(sec.titulo + " " + m.title) });
      } } }
    return index;
  }
  function search(txt) {
    const terms = norm(txt).split(/\s+/).filter(Boolean); if (!terms.length) return [];
    const out = [];
    for (const e of buildIndex()) { let score = 0, ok = true;
      for (const t of terms) { const inTitle = e.nt.includes(t), c = e.n.split(t).length - 1; if (!inTitle && !c) { ok = false; break; } score += (inTitle ? 20 : 0) + Math.min(c, 8); }
      if (ok) out.push({ e, score }); }
    return out.sort((a, b) => b.score - a.score).slice(0, 40);
  }
  function excerpt(e, terms) {
    const pos = terms.map((t) => e.n.indexOf(t)).filter((x) => x >= 0).sort((a, b) => a - b)[0] ?? 0;
    let s = esc(e.raw.slice(Math.max(0, pos - 40), pos + 110));
    for (const t of terms) s = s.replace(new RegExp(t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"), (m) => `<mark class="search-dialog__mark">${m}</mark>`);
    return (pos > 40 ? "… " : "") + s + " …";
  }
  function updateResults() {
    const txt = input.value.trim(); selected = -1;
    if (!txt) { results.innerHTML = `<li class="search-dialog__empty">Escribe una palabra. Se busca en los módulos ya escritos.</li>`; return; }
    const terms = norm(txt).split(/\s+/).filter(Boolean), r = search(txt);
    if (!r.length) { results.innerHTML = `<li class="search-dialog__empty">Nada para «${esc(txt)}» en los módulos escritos. Prueba con una sola palabra.</li>`; return; }
    results.innerHTML = r.map(({ e }) => `<li><a class="search-dialog__link" href="#/${e.slug}/${e.id}"><span class="search-dialog__result-title">${esc(e.title)}</span><span class="search-dialog__result-meta">${esc(e.doc)} · ${esc(e.modNum)} ${esc(e.modTitle)}</span><span class="search-dialog__result-excerpt">${excerpt(e, terms)}</span></a></li>`).join("");
  }
  function select(d) {
    const items = $$(".search-dialog__link", results); if (!items.length) return;
    selected = (selected + d + items.length) % items.length;
    items.forEach((a, i) => a.classList.toggle("search-dialog__link--selected", i === selected));
    items[selected].scrollIntoView({ block: "nearest" });
  }
  const openSearch = () => { if (!dialog.open) dialog.showModal(); input.focus(); input.select(); updateResults(); };
  const closeSearch = () => { if (dialog.open) dialog.close(); };
  $("#search-open").addEventListener("click", openSearch);
  $("#search-close").addEventListener("click", closeSearch);
  dialog.addEventListener("click", (e) => { if (e.target === dialog) closeSearch(); });
  input.addEventListener("input", updateResults);
  results.addEventListener("click", (e) => { if (e.target.closest("a")) closeSearch(); });
  dialog.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); select(1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); select(-1); }
    else if (e.key === "Enter" && selected >= 0) { e.preventDefault(); $$(".search-dialog__link", results)[selected].click(); }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && !dialog.open && !/^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName)) { e.preventDefault(); openSearch(); }
  });

  /* ---------------------------------------------------------- varios */
  $("#menu-toggle").addEventListener("click", () => { const o = document.body.classList.toggle("is-menu-open"); $("#menu-toggle").setAttribute("aria-expanded", String(o)); });
  $("#scrim").addEventListener("click", () => { document.body.classList.remove("is-menu-open"); $("#menu-toggle").setAttribute("aria-expanded", "false"); });
  document.addEventListener("click", async (e) => {
    const b = e.target.closest("[data-copy]"); if (!b) return;
    const text = APP._codes[+b.dataset.copy];
    try { await navigator.clipboard.writeText(text); }
    catch (_) { const t = document.createElement("textarea"); t.value = text; document.body.appendChild(t); t.select(); document.execCommand("copy"); t.remove(); }
    b.textContent = "Copiado"; setTimeout(() => { b.textContent = "Copiar"; }, 1600);
  });

  route();
})();

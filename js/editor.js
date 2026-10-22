/* Editor en vivo: HTML / CSS / JS con vista previa en un iframe aislado.
   - Sin JS en el ejemplo: la vista se actualiza al escribir.
   - Con JS: se ejecuta al pulsar «Ejecutar» (así un bucle a medio escribir no cuelga la página).
   - El iframe lleva sandbox="allow-scripts" (origen opaco): el código del ejemplo no puede tocar la app. */
(function () {
  "use strict";
  const APP = window.APP;
  let uid = 0;
  const LABEL = { html: "HTML", css: "CSS", js: "JS" };

  function srcdoc(v, id) {
    const consola = `<script>(function(){var send=function(t,a){try{parent.postMessage({__live:${JSON.stringify(id)},t:t,a:Array.prototype.map.call(a,function(x){if(typeof x==="string")return x;try{var s=JSON.stringify(x);return s===undefined?String(x):s}catch(e){return String(x)}})},"*")}catch(e){}};` +
      `["log","info","warn","error"].forEach(function(k){var o=console[k];console[k]=function(){send(k,arguments);o.apply(console,arguments)}});` +
      `addEventListener("error",function(e){send("error",[e.message])});` +
      `addEventListener("unhandledrejection",function(e){send("error",[String(e.reason)])});})();<\/script>`;
    const js = (v.js || "").replace(/<\/script/gi, "<\\/script");
    return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">` +
      `<style>html{font-family:system-ui,-apple-system,"Segoe UI",sans-serif;color:#1f2328}body{margin:8px}</style>` +
      `<style>${(v.css || "").replace(/<\/style/gi, "<\\/style")}</style></head><body>${v.html || ""}${consola}` +
      (js ? `<script>${js}<\/script>` : "") + `</body></html>`;
  }

  function mount(el, cfg) {
    if (cfg.sql != null) return APP.mountSql(el, cfg);
    const id = "live" + ++uid;
    const files = ["html", "css", "js"].filter((k) => cfg[k] != null);
    if (!files.length) files.push("html");
    const manual = cfg.js != null && cfg.js !== "" ? true : !!cfg.manual;
    const val = {}; files.forEach((k) => { val[k] = cfg[k] != null ? String(cfg[k]).replace(/^\n/, "").replace(/\s+$/, "") : ""; });
    const original = Object.assign({}, val);
    let tab = files[0];
    const height = cfg.alto || 220;

    el.className = "live-editor";
    el.innerHTML =
      `<div class="live-editor__bar"><div style="display:flex;align-items:center;flex-wrap:wrap"><span class="live-editor__title">${APP.esc(cfg.titulo || "Pruébalo")}</span>` +
      `<div class="live-editor__tabs" role="group" aria-label="Archivo a editar">${files.map((k) => `<button class="live-editor__tab${k === tab ? " live-editor__tab--active" : ""}" type="button" data-tab="${k}" aria-pressed="${k === tab}">${LABEL[k]}</button>`).join("")}</div></div>` +
      `<div class="live-editor__actions">${manual ? `<button class="live-editor__button live-editor__button--run" type="button" data-run>Ejecutar</button>` : ""}<button class="live-editor__button" type="button" data-reset>Restablecer</button></div></div>` +
      `<div class="live-editor__grid"><div class="live-editor__editor"><label class="sr-only" for="${id}-t">Código editable</label><textarea class="live-editor__input" id="${id}-t" spellcheck="false" autocomplete="off" autocapitalize="off" style="min-height:${height}px"></textarea></div>` +
      `<div class="live-editor__output"><div class="live-editor__output-title">Resultado</div><iframe class="live-editor__frame" title="Vista previa: ${APP.esc(cfg.titulo || "ejemplo")}" sandbox="allow-scripts" style="min-height:${height}px"></iframe><pre class="live-editor__console" aria-live="polite" aria-label="Consola"></pre></div></div>`;

    const ta = el.querySelector("textarea"), frame = el.querySelector("iframe"), cons = el.querySelector(".live-editor__console");
    ta.value = val[tab];

    function run() { cons.textContent = ""; frame.srcdoc = srcdoc(val, id); }
    window.addEventListener("message", (e) => {
      if (!e.data || e.data.__live !== id || e.source !== frame.contentWindow) return;
      const pre = e.data.t === "log" ? "" : e.data.t + " › ";
      cons.textContent += (cons.textContent ? "\n" : "") + pre + e.data.a.join(" ");
      cons.scrollTop = cons.scrollHeight;
    });

    let timer = null;
    ta.addEventListener("input", () => {
      val[tab] = ta.value;
      if (manual) return;
      clearTimeout(timer); timer = setTimeout(run, 300);
    });
    el.addEventListener("click", (e) => {
      const b = e.target.closest("button"); if (!b || !el.contains(b)) return;
      if (b.dataset.tab) {
        tab = b.dataset.tab; ta.value = val[tab];
        el.querySelectorAll("[data-tab]").forEach((x) => { const on = x === b; x.setAttribute("aria-pressed", String(on)); x.classList.toggle("live-editor__tab--active", on); });
        ta.focus();
      } else if (b.hasAttribute("data-run")) run();
      else if (b.hasAttribute("data-reset")) { Object.assign(val, original); ta.value = val[tab]; run(); }
    });

    // primera ejecución solo cuando el ejemplo entra en pantalla
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((ents) => { if (ents.some((x) => x.isIntersecting)) { io.disconnect(); run(); } }, { rootMargin: "200px" });
      io.observe(el);
    } else run();
  }

  APP.mountLive = function (root) {
    root.querySelectorAll("[data-live]").forEach((el) => { mount(el, APP._live[+el.dataset.live]); el.removeAttribute("data-live"); });
  };
})();

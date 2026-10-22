/* Chuleta de HTML. Contenido propio de la app, módulo a módulo.
   Bloques: p, h4, code, consola, tabla, lista, aviso, nota, sub, live. */
(function () {
  const r = String.raw;
  const mods = {};

  /* ------------------------------------------------------------------ 00 */
  mods["mod-00"] = {
    resumen: "etiquetas · atributos · DOM · anidación",
    secciones: [
      {
        id: "anatomia", titulo: "Anatomía de un elemento",
        bloques: [
          { p: "Un **elemento** es todo lo que va desde la etiqueta de apertura hasta la de cierre, contenido incluido." },
          {
            consola: r`
<a href="contacto.html" class="btn">Escríbenos</a>
└──────────── apertura ────────────┘└─texto──┘└──┘
                                              cierre`,
          },
          {
            tabla: {
              cabs: ["Concepto", "Detalle"],
              filas: [
                ["**Elemento**", "Apertura + contenido + cierre: `<p>Hola</p>`"],
                ["**Atributo**", "Información extra dentro de la apertura: `nombre=\"valor\"`. Se separan con espacios"],
                ["**Atributo booleano**", "Basta con escribirlo: `<input required>` equivale a `required=\"required\"`"],
                ["**Elementos vacíos**", "No tienen contenido ni cierre: `<br>`, `<hr>`, `<img>`, `<input>`, `<meta>`, `<link>`. La barra de `<br />` es opcional en HTML5"],
                ["**Mayúsculas**", "HTML no distingue, pero la convención es escribir todo en minúsculas"],
              ],
            },
          },
        ],
      },
      {
        id: "dom", titulo: "El DOM: el HTML es un árbol",
        bloques: [
          { p: "El navegador convierte tu HTML en un **árbol de nodos** llamado DOM. El CSS y el JavaScript trabajan sobre ese árbol, no sobre el texto que escribiste." },
          {
            consola: r`
html
├── head
│   ├── meta
│   └── title ── "Mi tienda"
└── body
    ├── header
    │   └── h1 ── "Mi tienda"
    └── main
        ├── h2 ── "Ofertas"
        └── p ── "Hoy un 20 % menos en…"`,
          },
          {
            tabla: {
              cabs: ["Relación", "Ejemplo en el árbol", "Selector CSS relacionado"],
              filas: [
                ["**Padre / hijo**", "`main` es padre de `h2`", "`main > h2`"],
                ["**Ancestro / descendiente**", "`body` es ancestro de `h2`", "`body h2`"],
                ["**Hermanos**", "`h2` y `p` (mismo padre)", "`h2 + p`, `h2 ~ p`"],
              ],
            },
          },
          { nota: "**Ver el DOM real:** `F12` → pestaña *Elements*. Si escribes mal el HTML, el navegador lo \"arregla\" a su manera, y el inspector te enseña el árbol que construyó de verdad, no el que escribiste.", tipo: "tip" },
        ],
      },
      {
        id: "anidacion", titulo: "Anidación correcta",
        bloques: [
          { p: "Las etiquetas se cierran **en orden inverso** al que se abrieron, igual que los paréntesis. Cambia el orden del cierre en el ejemplo y mira en el resultado qué hace el navegador:" },
          {
            live: {
              titulo: "Prueba: cruza las etiquetas de cierre",
              html: r`
<p>Texto <strong>importante <em>de verdad</em></strong></p>`,
              alto: 120,
            },
          },
        ],
      },
      {
        id: "espacios", titulo: "Espacios en blanco",
        bloques: [
          { p: "Varios espacios, tabuladores o saltos de línea seguidos se muestran como **un solo espacio**. Para separar usa elementos (`<p>`, `<br>`) o CSS, nunca espacios repetidos." },
          {
            live: {
              titulo: "Prueba: añade espacios y saltos",
              html: r`
<p>Esto      tiene     muchos
   espacios y
   saltos de línea en el código.</p>
<p>Esto&nbsp;&nbsp;&nbsp;&nbsp;usa &amp;nbsp; (un espacio que no se colapsa).</p>`,
              alto: 150,
            },
          },
        ],
      },
      {
        id: "entidades", titulo: "Entidades (caracteres especiales)",
        bloques: [
          {
            tabla: {
              cabs: ["Carácter", "Entidad", "Cuándo hace falta"],
              filas: [
                ["`<`", "`&lt;`", "Siempre que quieras mostrar el símbolo; si no, se interpreta como etiqueta"],
                ["`>`", "`&gt;`", "Recomendable junto a `&lt;`"],
                ["`&`", "`&amp;`", "Siempre en textos y en las URL dentro de `href`"],
                ["`\"`", "`&quot;`", "Dentro de un atributo entre comillas dobles"],
                ["espacio fijo", "`&nbsp;`", "Para que no se parta la línea: `10&nbsp;€`, `Sr.&nbsp;López`"],
                ["`©` `®` `€`", "`&copy;` `&reg;` `&euro;`", "Opcional: con `<meta charset=\"utf-8\">` puedes escribirlos directamente"],
              ],
            },
          },
          {
            live: {
              titulo: "Prueba: muestra otra etiqueta como texto",
              html: r`
<p>La etiqueta &lt;p&gt; crea un párrafo.</p>
<p>Precio: 49,90&nbsp;€ &middot; &copy; 2026 Tienda</p>`,
              alto: 130,
            },
          },
        ],
      },
      {
        id: "comentarios", titulo: "Comentarios",
        bloques: [
          { code: r`<!-- Esto no se muestra en la página, pero SÍ se ve con "Ver código fuente" -->`, lang: "html" },
          { aviso: "Nunca pongas contraseñas, notas internas ni datos sensibles en comentarios HTML: cualquiera los lee con `Ctrl+U`." },
        ],
      },
    ],
  };

  /* ------------------------------------------------------------------ 01 */
  mods["mod-01"] = {
    resumen: "doctype · head · body · plantilla",
    secciones: [
      {
        id: "plantilla", titulo: "Plantilla para copiar",
        bloques: [
          {
            code: r`
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Título de la página · Nombre del sitio</title>
    <meta name="description" content="Resumen de 150-160 caracteres que aparece en Google.">
    <link rel="icon" href="img/favicon.svg" type="image/svg+xml">
    <link rel="stylesheet" href="css/estilos.css">
    <script src="js/app.js" defer></script>
</head>
<body>
    <header>…</header>
    <main>…</main>
    <footer>…</footer>
</body>
</html>`,
            lang: "html", titulo: "html · index.html",
          },
          { sub: "En VS Code: escribe `!` y pulsa `Tab` (Emmet) para generar el esqueleto." },
        ],
      },
      {
        id: "head", titulo: "Qué hace cada línea del head",
        bloques: [
          {
            tabla: {
              cabs: ["Línea", "Para qué", "Si falta…"],
              filas: [
                ["`<!DOCTYPE html>`", "Indica que es HTML5", "El navegador entra en \"modo quirks\" y el CSS se comporta de forma rara"],
                ["`<html lang=\"es\">`", "Idioma de la página", "Los lectores de pantalla pronuncian mal y el traductor no sabe el idioma"],
                ["`<meta charset=\"utf-8\">`", "Codificación de caracteres. **Primera línea del head**", "Salen `Ã±` en lugar de `ñ`"],
                ["`<meta name=\"viewport\" …>`", "En móvil, usar el ancho real de la pantalla", "En móvil se ve la página de escritorio en miniatura"],
                ["`<title>`", "Título de la pestaña, de los marcadores y de Google", "La pestaña muestra la URL"],
                ["`<meta name=\"description\">`", "Resumen en los resultados de búsqueda", "Google se inventa uno con trozos de la página"],
                ["`<link rel=\"icon\">`", "Favicon", "Icono genérico en la pestaña"],
              ],
            },
          },
        ],
      },
      {
        id: "enlazar-css-js", titulo: "Enlazar CSS y JavaScript",
        bloques: [
          {
            tabla: {
              cabs: ["Qué", "Cómo", "Dónde"],
              filas: [
                ["CSS externo (**recomendado**)", "`<link rel=\"stylesheet\" href=\"css/estilos.css\">`", "`<head>`"],
                ["CSS interno", "`<style> … </style>`", "`<head>`"],
                ["CSS en línea", "`<p style=\"color: red\">`", "En el elemento (evitar)"],
                ["JS externo", "`<script src=\"js/app.js\" defer></script>`", "`<head>` con `defer`"],
                ["JS en módulos", "`<script type=\"module\" src=\"js/app.js\"></script>`", "`<head>` (los módulos ya se cargan diferidos)"],
              ],
            },
          },
          { nota: "`defer` descarga el script mientras se lee el HTML y lo ejecuta **cuando el DOM está completo**. Sin `defer`, un script en el `<head>` no encuentra los elementos del `<body>` porque aún no existen. Por eso antes se ponía al final del `<body>`.", tipo: "tip" },
        ],
      },
    ],
  };

  APP.register({ slug: "html", contenido: mods });
})();

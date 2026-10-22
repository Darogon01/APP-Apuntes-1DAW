/* Contenido de css generado a partir de la chuleta de referencia (scripts/convert.py) y revisado a mano. */
(function () {
  const mods = {
 "mod-00": {
  "resumen": "sintaxis · cascada · especificidad · herencia",
  "secciones": [
   {
    "id": "sintaxis",
    "titulo": "Sintaxis",
    "bloques": [
     {
      "consola": " selector          declaración\n ┌──┴──┐   ┌──────────┴──────────┐\n .boton  { background-color: #ff8a1f;  padding: 8px 16px; }\n           └──────┬───────┘ └──┬──┘\n              propiedad      valor\n └──────────────────── REGLA ─────────────────────────────┘"
     },
     {
      "lista": [
       "Cada declaración termina en `;` (en la última es opcional, pero ponlo siempre).",
       "Comentarios: `/* así */` (no existe `//` en CSS).",
       "Si una propiedad o un valor están mal escritos, el navegador **ignora esa declaración** sin avisar → [MOD.17](@mod-17)."
      ]
     }
    ]
   },
   {
    "id": "donde",
    "titulo": "Dónde escribirlo",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Forma",
        "Código",
        "Cuándo"
       ],
       "filas": [
        [
         "**Archivo externo**",
         "`<link rel=\"stylesheet\" href=\"css/estilos.css\">` en el `<head>`",
         "**Siempre** en proyectos: un archivo para todas las páginas, el navegador lo guarda en caché"
        ],
        [
         "Etiqueta `<style>`",
         "`<style> p { color: red; } </style>` en el `<head>`",
         "Pruebas rápidas, una página suelta"
        ],
        [
         "Atributo `style`",
         "`<p style=\"color: red\">`",
         "Casi nunca: mezcla HTML y diseño, y gana a todo (difícil de sobrescribir)"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "cascada",
    "titulo": "La cascada: quién gana",
    "bloques": [
     {
      "p": "Cuando varias reglas dan valor a la misma propiedad del mismo elemento, gana (de más a menos importante):"
     },
     {
      "tabla": {
       "cabs": [
        "#",
        "Criterio",
        "Ejemplo"
       ],
       "filas": [
        [
         "1",
         "**`!important`**",
         "`color: red !important;` (evitar: rompe la cascada)"
        ],
        [
         "2",
         "**Capa** (`@layer`): las capas declaradas después ganan, y el CSS sin capa gana a todas",
         "→ [MOD.15](@layer)"
        ],
        [
         "3",
         "**Especificidad** del selector",
         "`#menu a` gana a `.menu a`, que gana a `a`"
        ],
        [
         "4",
         "**Orden**: a igual especificidad, gana **la que está más abajo**",
         "Por eso el reset va primero y tus estilos después"
        ]
       ]
      }
     },
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<p class=\"aviso\" id=\"principal\">¿De qué color soy?</p>",
       "css": "#principal { color: green; }   /* especificidad 1-0-0 → GANA */\n.aviso     { color: blue; }    /* 0-1-0 */\np          { color: red; }     /* 0-0-1 */\np          { color: orange; }  /* 0-0-1, más abajo que la anterior: gana a la roja, pero no a las otras */"
      }
     }
    ]
   },
   {
    "id": "especificidad",
    "titulo": "Especificidad",
    "bloques": [
     {
      "p": "Se cuenta en tres columnas **(ID · CLASE · ELEMENTO)** y se comparan de izquierda a derecha: una sola ID gana a cualquier cantidad de clases."
     },
     {
      "tabla": {
       "cabs": [
        "Selector",
        "ID",
        "Clase / atributo / pseudoclase",
        "Elemento / pseudoelemento",
        "Total"
       ],
       "filas": [
        [
         "`*`",
         "0",
         "0",
         "0",
         "`0-0-0`"
        ],
        [
         "`li`",
         "0",
         "0",
         "1",
         "`0-0-1`"
        ],
        [
         "`ul li`",
         "0",
         "0",
         "2",
         "`0-0-2`"
        ],
        [
         "`.menu`",
         "0",
         "1",
         "0",
         "`0-1-0`"
        ],
        [
         "`.menu li:hover`",
         "0",
         "2",
         "1",
         "`0-2-1`"
        ],
        [
         "`a[href^=\"http\"]`",
         "0",
         "1",
         "1",
         "`0-1-1`"
        ],
        [
         "`#cabecera .menu a`",
         "1",
         "1",
         "1",
         "`1-1-1`"
        ],
        [
         "`style=\"…\"` (en el HTML)",
         "—",
         "—",
         "—",
         "Gana a cualquier selector"
        ],
        [
         "`:where(.menu) a`",
         "0",
         "0",
         "1",
         "`0-0-1` (`:where` vale **0**)"
        ],
        [
         "`:is(#a, .b) p`",
         "1",
         "0",
         "1",
         "`1-0-1` (`:is` vale lo de su argumento **más** específico)"
        ]
       ]
      }
     },
     {
      "nota": "Mantén la especificidad **baja y plana**: usa casi siempre **una clase** por selector (`.tarjeta__titulo`), que es lo que propone BEM. Evita los `id` para dar estilo y los selectores largos (`header nav ul li a`): luego cuesta mucho sobrescribirlos.",
      "tipo": "tip"
     },
     {
      "sub": "En VS Code, al pasar el ratón sobre un selector aparece su especificidad."
     }
    ]
   },
   {
    "id": "herencia",
    "titulo": "Herencia",
    "bloques": [
     {
      "p": "Algunas propiedades **pasan de padres a hijos** solas; otras no."
     },
     {
      "tabla": {
       "cabs": [
        "Se heredan (sobre todo, las de **texto**)",
        "No se heredan (las de **caja**)"
       ],
       "filas": [
        [
         "`color`, `font-family`, `font-size`, `font-weight`, `line-height`, `text-align`, `letter-spacing`, `list-style`, `cursor`, `visibility`",
         "`margin`, `padding`, `border`, `background`, `width`, `height`, `display`, `position`, `box-shadow`, `opacity`"
        ]
       ]
      }
     },
     {
      "p": "Por eso basta con poner la fuente en `body` para toda la página."
     },
     {
      "tabla": {
       "cabs": [
        "Valor",
        "Hace"
       ],
       "filas": [
        [
         "`inherit`",
         "Toma el valor del padre (aunque la propiedad no se herede)"
        ],
        [
         "`initial`",
         "Valor inicial de la especificación (¡ojo! `display: initial` es `inline`)"
        ],
        [
         "`unset`",
         "`inherit` si la propiedad se hereda; `initial` si no"
        ],
        [
         "`revert`",
         "Vuelve al estilo por defecto del navegador"
        ]
       ]
      }
     }
    ]
   }
  ]
 },
 "mod-01": {
  "resumen": "el primer archivo de cualquier proyecto",
  "secciones": [
   {
    "id": "reset",
    "titulo": "El reset (copiar en `css/reset.css`)",
    "bloques": [
     {
      "code": "/* =========================================================\n   RESET MODERNO · basado en los de Josh W. Comeau y Andy Bell\n   ========================================================= */\n\n/* 1. Que width y height incluyan padding y borde */\n*, *::before, *::after {\n  box-sizing: border-box;\n}\n\n/* 2. Quitar los márgenes por defecto */\n* {\n  margin: 0;\n}\n\n/* 3. Evitar que el móvil agrande el texto al girar la pantalla */\nhtml {\n  -webkit-text-size-adjust: none;\n  text-size-adjust: none;\n}\n\n/* 4. Body a toda la altura y texto más legible */\nbody {\n  min-height: 100vh;\n  line-height: 1.5;\n  -webkit-font-smoothing: antialiased;\n}\n\n/* 5. Imágenes y medios: bloque y nunca más anchos que su contenedor */\nimg, picture, video, canvas, svg {\n  display: block;\n  max-width: 100%;\n}\nimg {\n  height: auto;\n}\n\n/* 6. Los controles de formulario heredan la fuente de la página */\ninput, button, textarea, select {\n  font: inherit;\n}\n\n/* 7. Las palabras muy largas (URL, emails) se parten en vez de desbordar */\np, h1, h2, h3, h4, h5, h6 {\n  overflow-wrap: break-word;\n}\n\n/* 8. Títulos con líneas más equilibradas */\nh1, h2, h3, h4, h5, h6 {\n  text-wrap: balance;\n}\n\n/* 9. Listas marcadas como lista \"de diseño\": sin viñetas ni sangría */\nul[role=\"list\"], ol[role=\"list\"] {\n  list-style: none;\n  padding: 0;\n}\n\n/* 10. Enlaces sin clase: mismo color que el texto y subrayado limpio */\na:not([class]) {\n  color: currentColor;\n  text-decoration-skip-ink: auto;\n}\n\n/* 11. Un textarea sin \"rows\" no queda diminuto */\ntextarea:not([rows]) {\n  min-height: 10em;\n}\n\n/* 12. Al saltar a un #ancla, dejar aire por arriba (cabeceras fijas) */\n:target {\n  scroll-margin-block: 5ex;\n}\n\n/* 13. Desplazamiento suave, solo si el usuario no pidió reducir el movimiento */\n@media (prefers-reduced-motion: no-preference) {\n  html:focus-within {\n    scroll-behavior: smooth;\n  }\n}\n\n/* 14. Si el usuario pidió reducir el movimiento, sin animaciones */\n@media (prefers-reduced-motion: reduce) {\n  *, *::before, *::after {\n    animation-duration: 0.01ms !important;\n    animation-iteration-count: 1 !important;\n    transition-duration: 0.01ms !important;\n    scroll-behavior: auto !important;\n  }\n}",
      "lang": "css"
     }
    ]
   },
   {
    "id": "reset-explicado",
    "titulo": "Línea a línea",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "#",
        "Regla",
        "Por qué"
       ],
       "filas": [
        [
         "1",
         "`box-sizing: border-box`",
         "Por defecto, `width: 300px` + `padding: 20px` mide **340 px**. Con `border-box`, mide 300 px: el padding va por dentro. Es la regla más importante del reset → [MOD.05](@box-sizing)"
        ],
        [
         "2",
         "`margin: 0`",
         "Quita los márgenes de `body`, `p`, `h1`, `ul`, `figure`… Así los márgenes son solo los que tú pongas"
        ],
        [
         "3",
         "`text-size-adjust`",
         "En móviles, al girar a horizontal, Safari agranda el texto por su cuenta"
        ],
        [
         "4",
         "`min-height: 100vh` · `line-height: 1.5`",
         "Base para pegar el footer abajo; 1.5 es el interlineado recomendado para leer (el defecto ronda 1.2)"
        ],
        [
         "5",
         "`img { display: block; max-width: 100% }`",
         "Elimina el **hueco bajo las imágenes** (son en línea) y evita que una foto grande rompa el diseño en móvil. `height: auto` mantiene la proporción aunque el HTML tenga `width` y `height`"
        ],
        [
         "6",
         "`font: inherit`",
         "Por defecto, `input` y `button` usan una fuente del sistema más pequeña"
        ],
        [
         "7",
         "`overflow-wrap: break-word`",
         "Una URL larga sin espacios se sale de la caja en móvil"
        ],
        [
         "8",
         "`text-wrap: balance`",
         "Evita títulos con una palabra sola en la última línea ([[half]] Recién disponible (2024-05); donde no exista, no pasa nada)"
        ],
        [
         "9",
         "`ul[role=\"list\"]`",
         "Quita viñetas **solo** a las listas que tú marques (menús, tarjetas). Quitarlas a todas con `ul { list-style: none }` hace que Safari deje de anunciarlas como lista; con `role=\"list\"` se mantiene"
        ],
        [
         "10",
         "`a:not([class])`",
         "Los enlaces de texto heredan el color del párrafo; los que tienen clase (botones) los estilas tú"
        ],
        [
         "11",
         "`textarea:not([rows])`",
         "Sin `rows`, el textarea sería de 2 líneas"
        ],
        [
         "12",
         "`scroll-margin-block`",
         "Con una cabecera fija, el título destino de un `#ancla` queda tapado"
        ],
        [
         "13-14",
         "`prefers-reduced-motion`",
         "Hay personas a las que el movimiento les provoca mareo; el sistema operativo lo indica y la web lo respeta → [MOD.12](@preferencias)"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "reset-normalize",
    "titulo": "Reset frente a normalize",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "",
        "Reset (como el de arriba)",
        "[normalize.css](https://necolas.github.io/normalize.css/)"
       ],
       "filas": [
        [
         "Idea",
         "**Borrar** los estilos por defecto y empezar casi de cero",
         "**Igualar** los navegadores conservando los estilos por defecto útiles"
        ],
        [
         "Márgenes y títulos",
         "Fuera",
         "Se mantienen"
        ],
        [
         "Cuándo",
         "Proyectos con diseño propio (lo habitual)",
         "Documentos donde el aspecto por defecto ya vale"
        ]
       ]
      }
     },
     {
      "p": "**Dónde ponerlo:** el **primero** de tus CSS, para que tus estilos (que van después) ganen a igual especificidad:"
     },
     {
      "code": "<link rel=\"stylesheet\" href=\"css/reset.css\">\n<link rel=\"stylesheet\" href=\"css/variables.css\">\n<link rel=\"stylesheet\" href=\"css/estilos.css\">",
      "lang": "html"
     },
     {
      "sub": "O con capas: `@layer reset, base, componentes;` → [MOD.15](@layer)."
     }
    ]
   }
  ],
  "intro": [
   {
    "p": "Cada navegador aplica **estilos por defecto** (márgenes en `body` y `p`, tamaños de títulos, viñetas…), con pequeñas diferencias entre ellos. Un reset deja una base **predecible** sobre la que construir."
   }
  ]
 },
 "mod-02": {
  "resumen": "combinadores · pseudoclases · :has · ::before",
  "secciones": [
   {
    "id": "sel-basicos",
    "titulo": "Básicos",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Selector",
        "Selecciona",
        "Especificidad"
       ],
       "filas": [
        [
         "`*`",
         "Todo",
         "`0-0-0`"
        ],
        [
         "`p`",
         "Todos los `<p>`",
         "`0-0-1`"
        ],
        [
         "`.tarjeta`",
         "Elementos con `class=\"tarjeta\"`",
         "`0-1-0`"
        ],
        [
         "`.tarjeta.destacada`",
         "Con **las dos** clases a la vez (sin espacio)",
         "`0-2-0`"
        ],
        [
         "`#cabecera`",
         "El elemento con `id=\"cabecera\"`",
         "`1-0-0`"
        ],
        [
         "`h1, h2, h3`",
         "Grupo: cualquiera de ellos (la coma = \"o\")",
         "La de cada uno"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "combinadores",
    "titulo": "Combinadores",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Selector",
        "Selecciona",
        "Ejemplo real"
       ],
       "filas": [
        [
         "`A B` (espacio)",
         "`B` **descendiente** de `A`, a cualquier profundidad",
         "`.articulo a` → todos los enlaces del artículo"
        ],
        [
         "`A > B`",
         "`B` **hijo directo** de `A`",
         "`.menu > li` → solo el primer nivel del menú"
        ],
        [
         "`A + B`",
         "`B` **justo después** de `A` (hermano siguiente)",
         "`h2 + p` → el primer párrafo tras cada título"
        ],
        [
         "`A ~ B`",
         "Todos los `B` hermanos **posteriores** a `A`",
         "`input:checked ~ .panel`"
        ]
       ]
      }
     },
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<ul class=\"menu\">\n  <li>Inicio</li>\n  <li>Productos\n    <ul><li>Teclados</li><li>Ratones</li></ul>\n  </li>\n</ul>\n<h2>Título</h2>\n<p>Primer párrafo tras el título (h2 + p)</p>\n<p>Segundo párrafo</p>",
       "css": ".menu > li { color: #ff8a1f; font-weight: bold; }   /* solo el 1.er nivel */\n.menu li li { color: #1f6feb; font-weight: normal; } /* los anidados */\nh2 + p { background: #fff3e6; }"
      }
     }
    ]
   },
   {
    "id": "sel-atributos",
    "titulo": "Por atributo",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Selector",
        "Selecciona",
        "Ejemplo"
       ],
       "filas": [
        [
         "`[required]`",
         "Tiene el atributo",
         "`input[required]`"
        ],
        [
         "`[type=\"email\"]`",
         "Valor exacto",
         "`input[type=\"email\"]`"
        ],
        [
         "`[href^=\"https\"]`",
         "Empieza por",
         "Enlaces externos"
        ],
        [
         "`[href$=\".pdf\"]`",
         "Termina en",
         "Enlaces a PDF (añadirles un icono)"
        ],
        [
         "`[class*=\"btn\"]`",
         "Contiene",
         "Cualquier clase que contenga \"btn\""
        ],
        [
         "`[lang|=\"es\"]`",
         "Es `es` o empieza por `es-`",
         "`es`, `es-ES`, `es-MX`"
        ],
        [
         "`[data-estado=\"agotado\"]`",
         "Atributos `data-*`",
         "Productos agotados"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "pseudoclases",
    "titulo": "Pseudoclases (estados)",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Pseudoclase",
        "Cuándo se aplica"
       ],
       "filas": [
        [
         "`:hover`",
         "El ratón está encima"
        ],
        [
         "`:focus`",
         "Tiene el foco (clic o teclado)"
        ],
        [
         "`:focus-visible`",
         "Tiene el foco **y** el navegador cree que debe verse (teclado). **Úsala para los contornos de foco**"
        ],
        [
         "`:focus-within`",
         "Él **o algún hijo** tiene el foco (resaltar un formulario entero)"
        ],
        [
         "`:active`",
         "Mientras se pulsa"
        ],
        [
         "`:visited`",
         "Enlace ya visitado"
        ],
        [
         "`:checked`",
         "Checkbox o radio marcado"
        ],
        [
         "`:disabled` / `:enabled`",
         "Control desactivado / activado"
        ],
        [
         "`:required` / `:optional`",
         "Campo obligatorio / opcional"
        ],
        [
         "`:valid` / `:invalid`",
         "Valor válido / inválido (desde el principio)"
        ],
        [
         "`:user-invalid`",
         "Inválido **después** de que el usuario lo toque ([[ok]] Disponible en todos (desde 2023))"
        ],
        [
         "`:placeholder-shown`",
         "Se ve el `placeholder` (campo vacío)"
        ],
        [
         "`:empty`",
         "Sin hijos ni texto"
        ],
        [
         "`:target`",
         "Es el destino del `#ancla` actual de la URL"
        ],
        [
         "`:not(X)`",
         "**No** cumple X: `li:not(:last-child)`"
        ],
        [
         "`:first-child` / `:last-child` / `:only-child`",
         "Primero / último / único hijo"
        ],
        [
         "`:first-of-type` / `:last-of-type`",
         "Primero / último de su tipo entre sus hermanos"
        ]
       ]
      }
     },
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<button class=\"btn\">Comprar</button>",
       "css": ".btn {\n  background: #ff8a1f; color: #000; border: 0; padding: 10px 20px;\n  border-radius: 6px; cursor: pointer; font: inherit; font-weight: bold;\n}\n.btn:hover         { background: #ffa552; }\n.btn:focus-visible { outline: 3px solid #1f6feb; outline-offset: 3px; }"
      }
     }
    ]
   },
   {
    "id": "nth-child",
    "titulo": ":nth-child(): fórmulas",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Selector",
        "Selecciona",
        "Uso"
       ],
       "filas": [
        [
         "`:nth-child(3)`",
         "El 3.º",
         "—"
        ],
        [
         "`:nth-child(odd)` = `(2n+1)`",
         "Impares: 1, 3, 5…",
         "Filas cebra en tablas"
        ],
        [
         "`:nth-child(even)` = `(2n)`",
         "Pares: 2, 4, 6…",
         "—"
        ],
        [
         "`:nth-child(3n)`",
         "3, 6, 9…",
         "El último de cada fila de 3"
        ],
        [
         "`:nth-child(n+4)`",
         "Del 4.º en adelante",
         "Ocultar a partir del 4.º"
        ],
        [
         "`:nth-child(-n+3)`",
         "Los 3 primeros",
         "Destacar el top 3"
        ],
        [
         "`:nth-last-child(2)`",
         "El penúltimo",
         "—"
        ],
        [
         "`:nth-child(2 of .destacado)`",
         "El 2.º **de los que tienen** `.destacado` ([[ok]] Disponible en todos (desde 2023))",
         "—"
        ]
       ]
      }
     },
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<ol class=\"ranking\">\n  <li>Uno</li><li>Dos</li><li>Tres</li><li>Cuatro</li><li>Cinco</li><li>Seis</li>\n</ol>",
       "css": ".ranking li:nth-child(odd)   { background: #f1f3f5; }       /* cebra */\n.ranking li:nth-child(-n+3)  { font-weight: bold; color: #c25e00; }  /* top 3 */\n.ranking li:nth-child(n+5)   { opacity: 0.4; }               /* del 5.º en adelante */"
      }
     }
    ]
   },
   {
    "id": "is-where-has",
    "titulo": ":is(), :where() y :has()",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Pseudoclase",
        "Hace",
        "Especificidad",
        "Compatibilidad"
       ],
       "filas": [
        [
         "`:is(A, B) x`",
         "Abrevia listas: `:is(header, footer) a` = `header a, footer a`",
         "La del argumento más específico",
         "[[ok]] Disponible en todos (desde 2021)"
        ],
        [
         "`:where(A, B) x`",
         "Igual que `:is`, pero **especificidad 0** (ideal para resets y estilos base fáciles de sobrescribir)",
         "`0-0-0`",
         "[[ok]] Disponible en todos (desde 2021)"
        ],
        [
         "`A:has(B)`",
         "**\"Selector de padre\"**: selecciona A **si contiene** B",
         "La de su argumento",
         "[[ok]] Disponible en todos (desde 2023)"
        ]
       ]
      }
     },
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<article class=\"tarjeta\"><h3>Sin imagen</h3><p>Solo texto.</p></article>\n<article class=\"tarjeta\"><img src=\"recursos/avatar.svg\" alt=\"\" width=\"60\" height=\"60\"><h3>Con imagen</h3><p>La tarjeta cambia sola.</p></article>\n<form class=\"campo\"><label>Email <input type=\"email\" value=\"esto-no-es-un-email\"></label></form>",
       "css": ".tarjeta { border: 2px solid #ccc; padding: 8px; margin-bottom: 8px; }\n.tarjeta:has(img) { display: flex; gap: 12px; align-items: center; border-color: #ff8a1f; }\n.tarjeta:has(img) h3 { margin: 0; }\n.campo:has(input:invalid) { outline: 2px solid #d1242f; padding: 6px; }"
      }
     },
     {
      "sub": "Sin `:has()`, esto necesitaba JavaScript o una clase extra puesta a mano en cada tarjeta."
     }
    ]
   },
   {
    "id": "pseudoelementos",
    "titulo": "Pseudoelementos (`::`)",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Pseudoelemento",
        "Qué es",
        "Uso real"
       ],
       "filas": [
        [
         "`::before` / `::after`",
         "Un hijo \"falso\" al principio / final. **Necesita `content`**",
         "Iconos, adornos, comillas, etiquetas \"NUEVO\""
        ],
        [
         "`::placeholder`",
         "El texto de ejemplo de un campo",
         "Cambiar su color"
        ],
        [
         "`::marker`",
         "La viñeta o el número de un `li`",
         "Colorear viñetas"
        ],
        [
         "`::selection`",
         "El texto seleccionado con el ratón",
         "Color de marca"
        ],
        [
         "`::first-letter` / `::first-line`",
         "Primera letra / línea",
         "Capitular de revista"
        ],
        [
         "`::backdrop`",
         "El fondo de un `dialog` modal o de la pantalla completa",
         "Oscurecer el fondo"
        ]
       ]
      }
     },
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<p class=\"nuevo\">Teclado mecánico K2</p>\n<ul class=\"check\"><li>Envío gratis</li><li>Devolución 30 días</li></ul>\n<a class=\"externo\" href=\"https://developer.mozilla.org/\">MDN</a>",
       "css": ".nuevo::after {\n  content: \"NUEVO\"; margin-left: 8px; padding: 2px 6px;\n  font-size: 0.7em; background: #ff8a1f; border-radius: 4px;\n}\n.check li::marker { content: \"✔ \"; color: #1a7f37; }\na[href^=\"http\"]::after { content: \" ↗\"; }"
      }
     },
     {
      "nota": "El texto de `content` **no es contenido real**: no se puede seleccionar y algunos lectores de pantalla no lo leen. Úsalo solo para adornos; la información importante va en el HTML.",
      "tipo": "note"
     }
    ]
   }
  ]
 },
 "mod-03": {
  "resumen": "px · rem · em · % · vw · fr · clamp",
  "secciones": [
   {
    "id": "unidades",
    "titulo": "Unidades",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Unidad",
        "Relativa a",
        "Ejemplo",
        "Ojo"
       ],
       "filas": [
        [
         "`px`",
         "Nada (absoluta)",
         "`border: 1px`",
         "No escala si el usuario sube el tamaño de letra del navegador"
        ],
        [
         "**`rem`**",
         "Tamaño de fuente de la **raíz** (`html`, normalmente 16 px)",
         "`font-size: 1.25rem` = 20 px",
         "Estable: no depende de dónde esté el elemento"
        ],
        [
         "`em`",
         "Tamaño de fuente **del propio elemento** (o del padre, en `font-size`)",
         "`padding: 0.5em 1em`",
         "**Se acumula** al anidar: `1.2em` dentro de `1.2em` = 1,44"
        ],
        [
         "`%`",
         "El **padre** (ancho, alto…)",
         "`width: 50%`",
         "`height: 50%` no funciona si el padre no tiene altura definida"
        ],
        [
         "`vw` / `vh`",
         "1 % del ancho / alto de la ventana",
         "`height: 100vh`",
         "En móvil, `100vh` no descuenta la barra del navegador"
        ],
        [
         "`dvh` / `svh` / `lvh`",
         "Alto de la ventana dinámico / pequeño / grande",
         "`min-height: 100dvh`",
         "Arreglan el problema de `vh` en móvil ([[ok]] Disponible en todos (desde 2022))"
        ],
        [
         "`ch`",
         "Ancho del carácter \"0\" de la fuente",
         "`max-width: 65ch`",
         "Ideal para limitar el ancho de líneas de texto"
        ],
        [
         "`fr`",
         "Fracción del espacio libre (**solo en Grid**)",
         "`1fr 2fr`",
         "→ [MOD.10](@grid-fr)"
        ],
        [
         "sin unidad",
         "—",
         "`line-height: 1.5`",
         "En `line-height`, sin unidad = multiplica el tamaño de letra de cada elemento"
        ]
       ]
      }
     },
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<div class=\"em\">em: nivel 1 <div class=\"em\">nivel 2 <div class=\"em\">nivel 3</div></div></div>\n<div class=\"rem\">rem: nivel 1 <div class=\"rem\">nivel 2 <div class=\"rem\">nivel 3</div></div></div>",
       "css": ".em  { font-size: 1.2em; }    /* se acumula: 1,2 → 1,44 → 1,73 */\n.rem { font-size: 1.2rem; }   /* siempre 1,2 × 16 px = 19,2 px */"
      }
     }
    ]
   },
   {
    "id": "unidades-elegir",
    "titulo": "¿Cuál elijo?",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Para",
        "Unidad",
        "Por qué"
       ],
       "filas": [
        [
         "Tamaños de **letra**",
         "`rem`",
         "Respeta el tamaño de letra que elija el usuario en su navegador (accesibilidad)"
        ],
        [
         "**Padding** de botones o etiquetas",
         "`em`",
         "Crece con el tamaño del texto del propio botón"
        ],
        [
         "Márgenes y separaciones generales",
         "`rem`",
         "Coherentes en toda la página"
        ],
        [
         "**Bordes** y sombras finas",
         "`px`",
         "Una línea de 1 px debe ser de 1 px"
        ],
        [
         "Ancho de columnas",
         "`%`, `fr` o Flex / Grid",
         "Se adaptan al espacio"
        ],
        [
         "Ancho máximo de un texto",
         "`ch` (`60-75ch`)",
         "Líneas cómodas de leer"
        ],
        [
         "Secciones a pantalla completa",
         "`dvh` / `svh`",
         "Funcionan bien en móvil"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "funciones",
    "titulo": "calc(), min(), max() y clamp()",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Función",
        "Hace",
        "Ejemplo"
       ],
       "filas": [
        [
         "`calc()`",
         "Operaciones mezclando unidades",
         "`width: calc(100% - 2rem);` · `height: calc(100dvh - 60px);`"
        ],
        [
         "`min(a, b)`",
         "El **menor** de los valores",
         "`width: min(100%, 1200px);` = \"todo el ancho, pero como mucho 1200 px\""
        ],
        [
         "`max(a, b)`",
         "El **mayor**",
         "`padding: max(1rem, 3vw);` = \"3 % del ancho, pero como poco 1rem\""
        ],
        [
         "`clamp(mín, ideal, máx)`",
         "El ideal, **limitado** entre un mínimo y un máximo",
         "`font-size: clamp(1.5rem, 4vw, 3rem);` → tipografía fluida"
        ]
       ]
      }
     },
     {
      "live": {
       "titulo": "Pruébalo",
       "css": ".fluido { font-size: clamp(1.5rem, 1rem + 4vw, 3.5rem); margin: 0; }",
       "html": "<h1 class=\"fluido\">Título fluido con clamp()</h1>"
      }
     }
    ]
   }
  ]
 },
 "mod-04": {
  "resumen": "hex · rgb · hsl · oklch · color-mix · contraste",
  "secciones": [
   {
    "id": "color-formatos",
    "titulo": "Formatos",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Formato",
        "Ejemplo",
        "Cuándo"
       ],
       "filas": [
        [
         "Nombre",
         "`red`, `tomato`, `transparent`, `currentColor`",
         "Pruebas; `currentColor` = el `color` del texto actual"
        ],
        [
         "Hexadecimal",
         "`#ff8a1f` · `#f81` (abreviado) · `#ff8a1f80` (con transparencia)",
         "El más habitual: lo da cualquier herramienta de diseño"
        ],
        [
         "`rgb()`",
         "`rgb(255 138 31)` · `rgb(255 138 31 / 50%)`",
         "Cuando necesitas transparencia"
        ],
        [
         "`hsl()`",
         "`hsl(28 100% 56%)` → tono, saturación, luminosidad",
         "**Variaciones** de un color: misma `h`, cambiar la `l`"
        ],
        [
         "`oklch()`",
         "`oklch(75% 0.17 55)` → luminosidad, croma, tono",
         "Paletas **coherentes**: misma luminosidad percibida en tonos distintos ([[ok]] Disponible en todos (desde 2023))"
        ]
       ]
      }
     },
     {
      "sub": "La sintaxis moderna separa con espacios y pone la transparencia tras `/`. La antigua `rgba(255, 138, 31, 0.5)` sigue funcionando."
     },
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<div class=\"paleta\">\n  <span style=\"--l: 25%\"></span><span style=\"--l: 40%\"></span><span style=\"--l: 56%\"></span>\n  <span style=\"--l: 70%\"></span><span style=\"--l: 85%\"></span><span style=\"--l: 95%\"></span>\n</div>",
       "css": ".paleta { display: flex; gap: 6px; }\n.paleta span { width: 70px; height: 50px; border-radius: 6px;\n               background: hsl(28 100% var(--l)); }   /* mismo tono, distinta luminosidad */"
      }
     }
    ]
   },
   {
    "id": "transparencia",
    "titulo": "Transparencia: opacity frente a color con alfa",
    "bloques": [
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<div class=\"fondo\">\n  <div class=\"caja opacity\">opacity: 0.5</div>\n  <div class=\"caja alfa\">rgb(… / 50%)</div>\n</div>",
       "css": ".fondo { display: flex; gap: 12px; padding: 12px; background: url(\"recursos/paisaje.svg\") center / cover; }\n.caja { padding: 16px; font-weight: bold; color: #000; }\n.opacity { background: #fff; opacity: 0.5; }           /* TODO transparente: el texto también */\n.alfa    { background: rgb(255 255 255 / 50%); }       /* solo el fondo */"
      }
     },
     {
      "sub": "`opacity` afecta al elemento **y a todo su contenido**. Para un fondo semitransparente con texto opaco, usa un color con alfa."
     }
    ]
   },
   {
    "id": "color-mix",
    "titulo": "color-mix(): mezclar colores",
    "bloques": [
     {
      "p": "[[ok]] Disponible en todos (desde 2023)"
     },
     {
      "code": ":root { --marca: #ff8a1f; }\n.boton:hover   { background: color-mix(in oklch, var(--marca), black 15%); }  /* 15 % más oscuro */\n.etiqueta      { background: color-mix(in oklch, var(--marca), white 80%); }  /* versión muy clara */\n.borde-suave   { border-color: color-mix(in srgb, var(--marca) 40%, transparent); }",
      "lang": "css"
     }
    ]
   },
   {
    "id": "contraste",
    "titulo": "Contraste (accesibilidad)",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Texto",
        "Contraste mínimo (WCAG AA)"
       ],
       "filas": [
        [
         "Normal",
         "**4,5 : 1**"
        ],
        [
         "Grande (≥ 24 px, o ≥ 18,7 px en negrita)",
         "**3 : 1**"
        ],
        [
         "Iconos y bordes de controles",
         "**3 : 1**"
        ]
       ]
      }
     },
     {
      "sub": "Cómo medirlo: DevTools → selecciona el texto → en el selector de color aparece \"Contrast ratio\". El gris claro sobre blanco (`#999` sobre `#fff` = 2,8 : 1) **no pasa**."
     }
    ]
   }
  ]
 },
 "mod-05": {
  "resumen": "content · padding · border · margin · display",
  "secciones": [
   {
    "id": "caja-capas",
    "titulo": "Las 4 capas",
    "bloques": [
     {
      "consola": "┌───────────────────────── margin ──────────────────────────┐   ← espacio FUERA (transparente)\n│  ┌────────────────────── border ───────────────────────┐  │   ← el borde\n│  │  ┌─────────────────── padding ───────────────────┐  │  │   ← espacio DENTRO (toma el fondo)\n│  │  │                                               │  │  │\n│  │  │                  CONTENIDO                    │  │  │   ← width × height\n│  │  │                                               │  │  │\n│  │  └───────────────────────────────────────────────┘  │  │\n│  └─────────────────────────────────────────────────────┘  │\n└───────────────────────────────────────────────────────────┘"
     },
     {
      "sub": "En DevTools (pestaña Computed) aparece este mismo dibujo con los valores reales de cada elemento."
     }
    ]
   },
   {
    "id": "box-sizing",
    "titulo": "box-sizing",
    "bloques": [
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<div class=\"caja content\">content-box: 300 + 40 + 10 = 350 px</div>\n<div class=\"caja border\">border-box: 300 px en total</div>",
       "css": ".caja { width: 300px; padding: 20px; border: 5px solid #ff8a1f; margin-bottom: 10px; background: #fff3e6; }\n.content { box-sizing: content-box; }   /* el de por defecto */\n.border  { box-sizing: border-box; }    /* el del reset */"
      }
     }
    ]
   },
   {
    "id": "margin-padding",
    "titulo": "margin y padding: valores abreviados",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Escritura",
        "Significa"
       ],
       "filas": [
        [
         "`padding: 10px`",
         "Los 4 lados"
        ],
        [
         "`padding: 10px 20px`",
         "Arriba/abajo · izquierda/derecha"
        ],
        [
         "`padding: 10px 20px 30px`",
         "Arriba · izquierda/derecha · abajo"
        ],
        [
         "`padding: 10px 20px 30px 40px`",
         "Arriba · derecha · abajo · izquierda (**sentido de las agujas del reloj**)"
        ],
        [
         "`margin-inline: auto`",
         "Izquierda y derecha automáticos → **centra** un bloque con ancho"
        ],
        [
         "`padding-block: 1rem`",
         "Arriba y abajo"
        ],
        [
         "`margin-top: -10px`",
         "Los márgenes pueden ser **negativos** (el padding no)"
        ]
       ]
      }
     },
     {
      "sub": "`inline` = eje del texto (horizontal en español) y `block` = eje en que se apilan los bloques (vertical). Son las **propiedades lógicas**: funcionan también en idiomas que se escriben de derecha a izquierda."
     }
    ]
   },
   {
    "id": "colapso",
    "titulo": "Colapso de márgenes",
    "bloques": [
     {
      "p": "Los márgenes **verticales** de dos bloques seguidos **no se suman**: se queda el mayor."
     },
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<p class=\"a\">margin-bottom: 30px</p>\n<p class=\"b\">margin-top: 20px → la separación es 30 px, no 50</p>",
       "css": "p { margin: 0; background: #fff3e6; outline: 1px solid #ff8a1f; }\n.a { margin-bottom: 30px; }\n.b { margin-top: 20px; }"
      }
     },
     {
      "tabla": {
       "cabs": [
        "Cuándo colapsan",
        "Cuándo **no**"
       ],
       "filas": [
        [
         "Hermanos verticales; padre e hijo (el margen del primer hijo \"se escapa\" por arriba del padre)",
         "Dentro de un contenedor **flex** o **grid**; si el padre tiene `padding`, `border` o `display: flow-root`; márgenes horizontales"
        ]
       ]
      }
     },
     {
      "nota": "Para separar elementos dentro de un contenedor, usa **`gap`** en flex o grid en vez de márgenes: no colapsa ni deja margen sobrante en el último.",
      "tipo": "tip"
     }
    ]
   },
   {
    "id": "display",
    "titulo": "display",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Valor",
        "Hace"
       ],
       "filas": [
        [
         "`block`",
         "Bloque: línea propia, todo el ancho, acepta tamaño"
        ],
        [
         "`inline`",
         "En línea: fluye con el texto, ignora `width`/`height`"
        ],
        [
         "`inline-block`",
         "En línea pero acepta tamaño"
        ],
        [
         "`flex`",
         "El elemento es bloque y sus **hijos** se colocan en fila o columna → [MOD.09](@mod-09)"
        ],
        [
         "`grid`",
         "Sus hijos se colocan en una rejilla → [MOD.10](@mod-10)"
        ],
        [
         "`inline-flex` / `inline-grid`",
         "Lo mismo, pero el contenedor es en línea"
        ],
        [
         "`none`",
         "No se muestra ni ocupa espacio (lo ignora también el lector de pantalla)"
        ],
        [
         "`contents`",
         "El elemento \"desaparece\" y sus hijos pasan a ser hijos de su padre"
        ],
        [
         "`flow-root`",
         "Bloque que contiene sus hijos flotantes y evita el colapso de márgenes"
        ]
       ]
      }
     },
     {
      "tabla": {
       "cabs": [
        "Ocultar con…",
        "¿Ocupa espacio?",
        "¿Lo lee el lector de pantalla?",
        "¿Recibe clics?"
       ],
       "filas": [
        [
         "`display: none`",
         "[[no]]",
         "[[no]]",
         "[[no]]"
        ],
        [
         "`visibility: hidden`",
         "[[ok]]",
         "[[no]]",
         "[[no]]"
        ],
        [
         "`opacity: 0`",
         "[[ok]]",
         "[[ok]]",
         "[[ok]]"
        ],
        [
         "Clase `.sr-only` (ver abajo)",
         "[[no]]",
         "[[ok]]",
         "—"
        ]
       ]
      }
     },
     {
      "code": "/* Oculto a la vista pero leído por lectores de pantalla (texto de iconos, títulos de apoyo) */\n.sr-only {\n  position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;\n  overflow: hidden; clip-path: inset(50%); white-space: nowrap; border: 0;\n}",
      "lang": "css"
     }
    ]
   },
   {
    "id": "overflow",
    "titulo": "overflow: cuando el contenido no cabe",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Valor",
        "Hace"
       ],
       "filas": [
        [
         "`visible`",
         "Se sale de la caja (por defecto)"
        ],
        [
         "`hidden`",
         "Se recorta"
        ],
        [
         "`auto`",
         "Barra de desplazamiento **solo si hace falta**"
        ],
        [
         "`scroll`",
         "Barra siempre"
        ],
        [
         "`clip`",
         "Recorta como `hidden`, sin permitir scroll ni por código"
        ],
        [
         "`overflow-x` / `overflow-y`",
         "Por eje: `overflow-x: auto` en tablas anchas en móvil"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "tamanos",
    "titulo": "Tamaños",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Propiedad",
        "Para qué"
       ],
       "filas": [
        [
         "`width` / `height`",
         "Tamaño fijo (con cuidado: el contenido puede no caber)"
        ],
        [
         "`max-width`",
         "**Límite**: `max-width: 100%` en imágenes, `max-width: 65ch` en texto"
        ],
        [
         "`min-height`",
         "Altura mínima que crece si hace falta (mejor que `height` en cajas con texto)"
        ],
        [
         "`aspect-ratio`",
         "Proporción: `aspect-ratio: 16 / 9` en vídeos y tarjetas ([[ok]] Disponible en todos (desde 2021))"
        ],
        [
         "`width: fit-content`",
         "Lo que mida el contenido"
        ]
       ]
      }
     }
    ]
   }
  ]
 },
 "mod-06": {
  "resumen": "fuentes · @font-face · line-height · ellipsis",
  "secciones": [
   {
    "id": "fuentes",
    "titulo": "Fuentes",
    "bloques": [
     {
      "code": "body {\n  font-family: \"Inter\", system-ui, -apple-system, \"Segoe UI\", Roboto, sans-serif;  /* lista de respaldo */\n  font-size: 1rem;           /* 16 px */\n  font-weight: 400;          /* 400 normal · 700 negrita · 100-900 */\n  line-height: 1.5;          /* sin unidad */\n}\n\ncode { font-family: ui-monospace, \"Cascadia Code\", Consolas, monospace; }",
      "lang": "css"
     },
     {
      "sub": "La lista se lee de izquierda a derecha: si no tiene la primera, prueba la siguiente. Termina siempre con una genérica (`sans-serif`, `serif`, `monospace`)."
     }
    ]
   },
   {
    "id": "font-face",
    "titulo": "Fuentes propias: Google Fonts o @font-face",
    "bloques": [
     {
      "code": "<!-- Opción 1: Google Fonts (en el <head>, antes de tu CSS) -->\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap\" rel=\"stylesheet\">",
      "lang": "html"
     },
     {
      "code": "/* Opción 2: archivo propio (descargado en /fonts), sin depender de Google */\n@font-face {\n  font-family: \"Inter\";\n  src: url(\"../fonts/inter-variable.woff2\") format(\"woff2\");\n  font-weight: 100 900;        /* fuente variable: todos los pesos en un archivo */\n  font-display: swap;          /* muestra el texto con la de respaldo mientras carga */\n}",
      "lang": "css"
     },
     {
      "sub": "Usa formato **`.woff2`** (el más ligero). Alojar la fuente tú mismo evita enviar datos de tus visitantes a Google (RGPD)."
     }
    ]
   },
   {
    "id": "texto-props",
    "titulo": "Propiedades de texto",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Propiedad",
        "Valores típicos"
       ],
       "filas": [
        [
         "`font-style`",
         "`normal`, `italic`"
        ],
        [
         "`text-align`",
         "`left`, `center`, `right`, `justify` (evitar en web: deja huecos)"
        ],
        [
         "`text-transform`",
         "`uppercase`, `lowercase`, `capitalize`"
        ],
        [
         "`text-decoration`",
         "`none` (quitar el subrayado de enlaces), `underline`; `text-underline-offset: 3px`"
        ],
        [
         "`letter-spacing`",
         "`0.05em` (aire en mayúsculas pequeñas)"
        ],
        [
         "`text-shadow`",
         "`0 2px 4px rgb(0 0 0 / 40%)`"
        ],
        [
         "`white-space`",
         "`nowrap` (no partir la línea), `pre-line` (respetar los saltos de línea)"
        ],
        [
         "`text-wrap`",
         "`balance` (títulos), `pretty` (párrafos: evita una palabra sola al final, [[no]] Aún no en todos los navegadores)"
        ],
        [
         "`hyphens`",
         "`auto` (guiones al partir palabras; necesita `lang` en el HTML)"
        ],
        [
         "`font-variant-numeric`",
         "`tabular-nums` (cifras del mismo ancho: precios y tablas alineadas)"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "texto-cortar",
    "titulo": "Cortar texto con puntos suspensivos",
    "bloques": [
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<p class=\"una-linea\">Auriculares inalámbricos con cancelación de ruido y 30 horas de batería</p>\n<p class=\"varias-lineas\">Auriculares inalámbricos con cancelación activa de ruido, 30 horas de batería, carga rápida USB-C y multipunto para dos dispositivos a la vez.</p>",
       "css": "p { width: 300px; border: 1px solid #ccc; padding: 0 4px; }\n.una-linea {                       /* 1 línea */\n  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;\n}\n.varias-lineas {                   /* N líneas */\n  display: -webkit-box; -webkit-box-orient: vertical;\n  -webkit-line-clamp: 2; overflow: hidden;\n}"
      }
     }
    ]
   }
  ]
 },
 "mod-07": {
  "resumen": "background · gradientes · sombras · filtros",
  "secciones": [
   {
    "id": "fondos",
    "titulo": "Fondos",
    "bloques": [
     {
      "code": ".hero {\n  background-color: #0d1117;                        /* se ve mientras carga la imagen o si falla */\n  background-image: url(\"../img/hero.webp\");\n  background-size: cover;                           /* cubrir la caja, recortando lo que sobre */\n  background-position: center;\n  background-repeat: no-repeat;\n}\n\n/* Abreviado: color imagen posición / tamaño repetición */\n.hero { background: #0d1117 url(\"../img/hero.webp\") center / cover no-repeat; }",
      "lang": "css"
     },
     {
      "tabla": {
       "cabs": [
        "`background-size`",
        "Hace"
       ],
       "filas": [
        [
         "`cover`",
         "Cubre toda la caja (recorta)"
        ],
        [
         "`contain`",
         "Cabe entera (pueden quedar huecos)"
        ],
        [
         "`100% auto`",
         "Todo el ancho, alto proporcional"
        ]
       ]
      }
     },
     {
      "sub": "La ruta de `url()` es **relativa al archivo CSS**, no al HTML: desde `css/estilos.css` es `../img/…`."
     }
    ]
   },
   {
    "id": "degradados",
    "titulo": "Degradados",
    "bloques": [
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<div class=\"muestras\">\n  <div class=\"lineal\">linear</div><div class=\"radial\">radial</div>\n  <div class=\"conico\">conic</div><div class=\"rayas\">rayas</div>\n</div>",
       "css": ".muestras { display: flex; gap: 8px; }\n.muestras div { width: 140px; height: 90px; border-radius: 8px; display: grid; place-items: center;\n                color: #fff; font-weight: bold; text-shadow: 0 1px 2px #000; }\n.lineal { background: linear-gradient(135deg, #ff8a1f, #7a2e9e); }\n.radial { background: radial-gradient(circle at 30% 30%, #ffd08a, #c25e00); }\n.conico { background: conic-gradient(#ff8a1f 0 40%, #1f6feb 40% 75%, #1a7f37 75%); }\n.rayas  { background: repeating-linear-gradient(45deg, #0d1117 0 10px, #ff8a1f 10px 20px); }"
      }
     },
     {
      "sub": "Superponer un degradado oscuro sobre una foto para que se lea el texto: `background: linear-gradient(rgb(0 0 0 / 60%), rgb(0 0 0 / 20%)), url(\"foto.webp\") center / cover;`"
     }
    ]
   },
   {
    "id": "bordes",
    "titulo": "Bordes y radios",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Código",
        "Hace"
       ],
       "filas": [
        [
         "`border: 2px solid #ff8a1f`",
         "Grosor, estilo (`solid`, `dashed`, `dotted`), color"
        ],
        [
         "`border-bottom: 1px solid #ddd`",
         "Solo un lado"
        ],
        [
         "`border-radius: 8px`",
         "Esquinas redondeadas"
        ],
        [
         "`border-radius: 50%`",
         "Círculo (si la caja es cuadrada)"
        ],
        [
         "`border-radius: 999px`",
         "Forma de \"píldora\""
        ],
        [
         "`outline: 2px solid; outline-offset: 2px`",
         "Contorno que **no ocupa espacio** (para el foco)"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "sombras",
    "titulo": "Sombras",
    "bloques": [
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<div class=\"sombras\">\n  <div class=\"s1\">suave</div><div class=\"s2\">elevada</div><div class=\"s3\">interior</div>\n</div>",
       "css": ".sombras { display: flex; gap: 24px; padding: 16px; background: #f6f8fa; }\n.sombras div { width: 140px; height: 80px; background: #fff; border-radius: 8px; display: grid; place-items: center; }\n.s1 { box-shadow: 0 1px 3px rgb(0 0 0 / 15%); }\n.s2 { box-shadow: 0 10px 25px -5px rgb(0 0 0 / 25%), 0 4px 6px -4px rgb(0 0 0 / 10%); }\n.s3 { box-shadow: inset 0 2px 6px rgb(0 0 0 / 25%); }"
      }
     },
     {
      "sub": "`box-shadow: desplazamiento-x desplazamiento-y desenfoque expansión color`. Se pueden encadenar varias con comas."
     }
    ]
   },
   {
    "id": "filtros",
    "titulo": "Filtros",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Propiedad",
        "Ejemplo",
        "Uso"
       ],
       "filas": [
        [
         "`filter`",
         "`grayscale(100%)`, `blur(4px)`, `brightness(0.7)`, `drop-shadow(0 2px 4px #0006)`",
         "Logos en gris que se colorean al pasar el ratón"
        ],
        [
         "`backdrop-filter`",
         "`blur(10px)`",
         "Efecto \"cristal\" de lo que hay **detrás** (menús, modales) ([[half]] Recién disponible (2024-09))"
        ],
        [
         "`mix-blend-mode`",
         "`multiply`",
         "Mezclar una imagen con el fondo"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "object-fit",
    "titulo": "object-fit: imágenes que encajan en una caja",
    "bloques": [
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<div class=\"fotos\">\n  <figure><img src=\"recursos/paisaje.svg\" alt=\"\" class=\"fill\"><figcaption>fill (deforma)</figcaption></figure>\n  <figure><img src=\"recursos/paisaje.svg\" alt=\"\" class=\"cover\"><figcaption>cover (recorta)</figcaption></figure>\n  <figure><img src=\"recursos/paisaje.svg\" alt=\"\" class=\"contain\"><figcaption>contain (cabe entera)</figcaption></figure>\n</div>",
       "css": ".fotos { display: flex; gap: 12px; }\n.fotos figure { margin: 0; }\n.fotos img { width: 160px; height: 160px; background: #e9ecef; border: 1px solid #ccc; }\n.fill    { object-fit: fill; }\n.cover   { object-fit: cover; }\n.contain { object-fit: contain; }"
      }
     },
     {
      "sub": "Imprescindible en galerías y tarjetas: todas las fotos del mismo tamaño aunque los originales tengan proporciones distintas. `object-position` elige qué parte se ve."
     }
    ]
   }
  ]
 },
 "mod-08": {
  "resumen": "relative · absolute · fixed · sticky · z-index",
  "secciones": [
   {
    "id": "position",
    "titulo": "position",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Valor",
        "Se coloca respecto a…",
        "¿Deja su hueco?",
        "Uso real"
       ],
       "filas": [
        [
         "`static`",
         "Flujo normal (por defecto); `top`/`left` no hacen nada",
         "[[ok]]",
         "—"
        ],
        [
         "`relative`",
         "**Su propia posición** normal",
         "[[ok]]",
         "Moverlo un poco, y sobre todo **ser referencia** de sus hijos `absolute`"
        ],
        [
         "`absolute`",
         "El **ancestro posicionado** más cercano (el primero que no sea `static`)",
         "[[no]]",
         "Insignias, botón de cerrar en una esquina, texto sobre una imagen"
        ],
        [
         "`fixed`",
         "La **ventana** (no se mueve al hacer scroll)",
         "[[no]]",
         "Botón \"subir\", barra de cookies, chat"
        ],
        [
         "`sticky`",
         "Fluye normal hasta llegar a un punto y entonces se \"pega\"",
         "[[ok]]",
         "Cabecera o columna que se queda fija al hacer scroll"
        ]
       ]
      }
     },
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<article class=\"tarjeta\">\n  <img src=\"recursos/auriculares.svg\" alt=\"\" width=\"400\" height=\"300\">\n  <span class=\"insignia\">-20 %</span>\n  <button class=\"cerrar\" aria-label=\"Quitar de favoritos\">×</button>\n  <h3>Auriculares Sony</h3>\n</article>",
       "css": ".tarjeta  { position: relative; width: 240px; border: 1px solid #ccc; }   /* referencia */\n.tarjeta img { display: block; width: 100%; height: auto; }\n.tarjeta h3 { margin: 8px; }\n.insignia { position: absolute; top: 8px; left: 8px;\n            background: #d1242f; color: #fff; padding: 2px 8px; border-radius: 4px; font-weight: bold; }\n.cerrar   { position: absolute; top: 8px; right: 8px; width: 32px; height: 32px; border-radius: 50%;\n            border: 0; background: #fff; font-size: 20px; cursor: pointer; }"
      }
     },
     {
      "nota": "Un `absolute` busca hacia arriba el **primer ancestro con `position` distinta de `static`**. Si no lo encuentra, se coloca respecto a la página entera y acaba en la esquina de la ventana. Patrón: **padre `relative` + hijo `absolute`**.",
      "tipo": "important"
     },
     {
      "tabla": {
       "cabs": [
        "Propiedad",
        "Ejemplo"
       ],
       "filas": [
        [
         "`top` / `right` / `bottom` / `left`",
         "`top: 0; right: 0;` → esquina superior derecha"
        ],
        [
         "`inset`",
         "`inset: 0;` = los cuatro a 0 → cubre al padre entero (capas sobre imágenes)"
        ],
        [
         "Centrar un `absolute`",
         "`inset: 0; margin: auto;` (con ancho y alto) o `top: 50%; left: 50%; translate: -50% -50%;`"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "z-index",
    "titulo": "z-index: quién va encima",
    "bloques": [
     {
      "lista": [
       "Solo funciona en elementos **posicionados** (`relative`, `absolute`, `fixed`, `sticky`) o hijos de flex o grid.",
       "Mayor número = más arriba, **pero solo dentro de su mismo contexto de apilamiento**."
      ]
     },
     {
      "aviso": "**\"Mi `z-index: 9999` no se pone encima.\"** Algunas propiedades crean un **contexto de apilamiento** nuevo (`opacity` menor que 1, `transform`, `filter`, `position` con `z-index`, `isolation: isolate`). Los hijos de ese elemento compiten solo entre ellos: un hijo con `z-index: 9999` nunca supera a un elemento de fuera que esté por encima de su padre.",
      "tipo": "warning"
     },
     {
      "p": "Escala recomendada (en variables, para no inventar números):"
     },
     {
      "code": ":root {\n  --z-desplegable: 100;\n  --z-cabecera: 200;\n  --z-modal: 300;\n  --z-aviso: 400;\n}",
      "lang": "css"
     }
    ]
   },
   {
    "id": "sticky",
    "titulo": "sticky",
    "bloques": [
     {
      "code": ".cabecera {\n  position: sticky;\n  top: 0;              /* OBLIGATORIO: a qué distancia del borde se pega */\n  z-index: var(--z-cabecera);\n  background: #fff;    /* si no, el contenido se ve por debajo al hacer scroll */\n}",
      "lang": "css"
     },
     {
      "sub": "`sticky` deja de funcionar si algún ancestro tiene `overflow: hidden` o `auto`, o si el padre mide lo mismo que el elemento (no tiene recorrido)."
     }
    ]
   }
  ]
 },
 "mod-09": {
  "resumen": "una dimensión · ejes · justify · align · gap",
  "secciones": [
   {
    "id": "flex-ejes",
    "titulo": "Los dos ejes",
    "bloques": [
     {
      "consola": " flex-direction: row (por defecto)                 flex-direction: column\n ──────────── EJE PRINCIPAL ───────────▶           │ ┌──────┐\n ┌──────┐ ┌──────┐ ┌──────┐            │           │ │  1   │  EJE\n │  1   │ │  2   │ │  3   │  EJE       │ PRINCIPAL │ └──────┘  CRUZADO\n └──────┘ └──────┘ └──────┘  CRUZADO   ▼           │ ┌──────┐ ──────▶\n                                                   │ │  2   │\n justify-content → eje principal                   ▼ └──────┘\n align-items     → eje cruzado"
     },
     {
      "nota": "**Regla para no liarse:** `justify-content` trabaja en el sentido de `flex-direction`; `align-items`, en el perpendicular. Si cambias a `column`, se \"intercambian\".",
      "tipo": "tip"
     }
    ]
   },
   {
    "id": "flex-contenedor",
    "titulo": "Propiedades del contenedor",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Propiedad",
        "Valores",
        "Hace"
       ],
       "filas": [
        [
         "`display`",
         "`flex`",
         "Activa flexbox en los **hijos**"
        ],
        [
         "`flex-direction`",
         "`row` · `column` · `row-reverse` · `column-reverse`",
         "Sentido del eje principal"
        ],
        [
         "`flex-wrap`",
         "`nowrap` (defecto) · `wrap`",
         "Si no caben, ¿pasan a otra línea?"
        ],
        [
         "`justify-content`",
         "`flex-start` · `center` · `flex-end` · `space-between` · `space-around` · `space-evenly`",
         "Reparto en el eje **principal**"
        ],
        [
         "`align-items`",
         "`stretch` (defecto) · `flex-start` · `center` · `flex-end` · `baseline`",
         "Alineación en el eje **cruzado**"
        ],
        [
         "`align-content`",
         "Igual que `justify-content`",
         "Reparto de las **líneas** cuando hay `wrap`"
        ],
        [
         "`gap`",
         "`1rem` · `1rem 2rem`",
         "Separación entre hijos ([[ok]] Disponible en todos (desde 2021))"
        ]
       ]
      }
     },
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<p>justify-content: flex-start</p>  <div class=\"fila\" style=\"justify-content: flex-start\"><b>1</b><b>2</b><b>3</b></div>\n<p>justify-content: center</p>      <div class=\"fila\" style=\"justify-content: center\"><b>1</b><b>2</b><b>3</b></div>\n<p>justify-content: space-between</p><div class=\"fila\" style=\"justify-content: space-between\"><b>1</b><b>2</b><b>3</b></div>\n<p>justify-content: space-evenly</p><div class=\"fila\" style=\"justify-content: space-evenly\"><b>1</b><b>2</b><b>3</b></div>\n<p>align-items: center (con un hijo más alto)</p>\n<div class=\"fila\" style=\"align-items: center\"><b>1</b><b class=\"alto\">2</b><b>3</b></div>",
       "css": "p { margin: 8px 0 2px; font-size: 13px; font-family: monospace; }\n.fila { display: flex; gap: 8px; background: #f1f3f5; padding: 6px; }\n.fila b { background: #ff8a1f; padding: 8px 18px; border-radius: 4px; }\n.fila .alto { padding-block: 24px; }"
      }
     }
    ]
   },
   {
    "id": "flex-hijos",
    "titulo": "Propiedades de los hijos",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Propiedad",
        "Hace",
        "Ejemplo"
       ],
       "filas": [
        [
         "`flex-grow`",
         "Cuánto **crece** para ocupar espacio libre (0 = no crece)",
         "`flex-grow: 1`"
        ],
        [
         "`flex-shrink`",
         "Cuánto **encoge** si falta espacio (0 = no encoge)",
         "`flex-shrink: 0` en un icono o un logo"
        ],
        [
         "`flex-basis`",
         "Tamaño de partida antes de crecer o encoger",
         "`flex-basis: 200px`"
        ],
        [
         "`align-self`",
         "Alineación propia en el eje cruzado",
         "`align-self: flex-end`"
        ],
        [
         "`order`",
         "Cambia el orden **visual** (no el del lector de pantalla ni el del tabulador)",
         "`order: -1`"
        ],
        [
         "`margin-left: auto`",
         "Empuja ese hijo y los siguientes al final",
         "Botón \"Entrar\" a la derecha del menú"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "flex-shorthand",
    "titulo": "flex: el abreviado",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Escritura",
        "Equivale a",
        "Significa"
       ],
       "filas": [
        [
         "`flex: 1`",
         "`1 1 0%`",
         "Reparte el espacio **a partes iguales** con sus hermanos"
        ],
        [
         "`flex: 2`",
         "`2 1 0%`",
         "El doble de espacio que un `flex: 1`"
        ],
        [
         "`flex: auto`",
         "`1 1 auto`",
         "Crece y encoge **partiendo de su contenido**"
        ],
        [
         "`flex: none`",
         "`0 0 auto`",
         "Rígido: ni crece ni encoge"
        ],
        [
         "`flex: 0 0 250px`",
         "—",
         "Barra lateral fija de 250 px"
        ]
       ]
      }
     },
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<div class=\"fila\"><b class=\"a\">flex: 1</b><b class=\"a\">flex: 1</b><b class=\"b\">flex: 2</b></div>\n<div class=\"fila\"><b class=\"fijo\">flex: 0 0 120px</b><b class=\"a\">flex: 1 (el resto)</b></div>\n<div class=\"fila\"><b>Logo</b><b>Inicio</b><b>Tienda</b><b class=\"derecha\">Entrar →</b></div>",
       "css": ".fila { display: flex; gap: 8px; background: #f1f3f5; padding: 6px; margin-bottom: 8px; }\n.fila b { background: #ff8a1f; padding: 8px 12px; border-radius: 4px; }\n.a { flex: 1; } .b { flex: 2; } .fijo { flex: 0 0 120px; }\n.derecha { margin-left: auto; background: #1f6feb !important; color: #fff; }"
      }
     }
    ]
   },
   {
    "id": "flex-recetas",
    "titulo": "Recetas",
    "bloques": [
     {
      "live": {
       "titulo": "Pruébalo",
       "css": ".tarjetas { display: flex; gap: 12px; }\n.tarjeta { flex: 1; display: flex; flex-direction: column; border: 1px solid #ccc; border-radius: 8px; padding: 12px; }\n.tarjeta h3, .tarjeta p { margin: 0 0 8px; }\n.boton { margin-top: auto; text-align: center; background: #ff8a1f; color: #000; padding: 8px; border-radius: 6px; text-decoration: none; font-weight: bold; }",
       "html": "<div class=\"tarjetas\">\n  <article class=\"tarjeta\"><h3>Básico</h3><p>Texto corto.</p><a class=\"boton\" href=\"#\">Elegir</a></article>\n  <article class=\"tarjeta\"><h3>Pro</h3><p>Un texto bastante más largo que ocupa varias líneas y hace la tarjeta más alta.</p><a class=\"boton\" href=\"#\">Elegir</a></article>\n  <article class=\"tarjeta\"><h3>Empresa</h3><p>Medio.</p><a class=\"boton\" href=\"#\">Elegir</a></article>\n</div>"
      }
     },
     {
      "sub": "Las tres tarjetas miden lo mismo de alto (porque `align-items: stretch` es el valor por defecto) y los botones quedan alineados abajo gracias a `margin-top: auto`."
     }
    ]
   }
  ],
  "intro": [
   {
    "p": "Flexbox coloca los **hijos** de un contenedor en **una dimensión**: en fila o en columna."
   }
  ]
 },
 "mod-10": {
  "resumen": "dos dimensiones · fr · repeat · minmax · áreas",
  "secciones": [
   {
    "id": "grid-columnas",
    "titulo": "Columnas y filas",
    "bloques": [
     {
      "code": ".rejilla {\n  display: grid;\n  grid-template-columns: 200px 1fr 1fr;   /* 3 columnas: una fija y dos que se reparten el resto */\n  grid-template-rows: auto 1fr auto;      /* filas (normalmente no hace falta definirlas) */\n  gap: 1rem;                              /* separación entre celdas (row-gap y column-gap) */\n}",
      "lang": "css"
     }
    ]
   },
   {
    "id": "grid-fr",
    "titulo": "fr, repeat() y minmax()",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Escritura",
        "Significa"
       ],
       "filas": [
        [
         "`1fr 1fr 1fr`",
         "3 columnas iguales"
        ],
        [
         "`repeat(3, 1fr)`",
         "Lo mismo, abreviado"
        ],
        [
         "`2fr 1fr`",
         "La primera, el doble que la segunda"
        ],
        [
         "`250px 1fr`",
         "Barra lateral fija + contenido flexible"
        ],
        [
         "`repeat(4, minmax(0, 1fr))`",
         "4 iguales que **nunca se desbordan** aunque el contenido sea largo"
        ],
        [
         "`minmax(200px, 1fr)`",
         "Como poco 200 px; como mucho, una fracción"
        ],
        [
         "`auto`",
         "Lo que mida el contenido"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "grid-autofit",
    "titulo": "Galería responsive sin media queries",
    "bloques": [
     {
      "live": {
       "titulo": "Pruébalo",
       "css": ".galeria { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 8px; }\n.galeria div { background: #ff8a1f; aspect-ratio: 4 / 3; display: grid; place-items: center; font-weight: bold; border-radius: 6px; }",
       "html": "<div class=\"galeria\">\n  <div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div>\n</div>"
      }
     },
     {
      "tabla": {
       "cabs": [
        "",
        "`auto-fit`",
        "`auto-fill`"
       ],
       "filas": [
        [
         "Con pocos elementos en una pantalla ancha",
         "**Estira** los elementos para ocupar toda la fila",
         "Deja **columnas vacías** al final"
        ],
        [
         "Úsalo para",
         "Galerías y tarjetas (lo habitual)",
         "Mantener siempre el mismo tamaño de celda"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "grid-areas",
    "titulo": "grid-template-areas: maquetar una página \"dibujándola\"",
    "bloques": [
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<div class=\"pagina\">\n  <header>header</header>\n  <nav>nav</nav>\n  <main>main</main>\n  <aside>aside</aside>\n  <footer>footer</footer>\n</div>",
       "css": ".pagina {\n  display: grid;\n  grid-template-columns: 140px 1fr 140px;\n  grid-template-rows: auto 160px auto;\n  grid-template-areas:\n    \"header header header\"\n    \"nav    main   aside\"\n    \"footer footer footer\";\n  gap: 8px;\n}\n.pagina header { grid-area: header; }\n.pagina nav    { grid-area: nav; }\n.pagina main   { grid-area: main; }\n.pagina aside  { grid-area: aside; }\n.pagina footer { grid-area: footer; }\n.pagina > * { background: #fff3e6; border: 2px solid #ff8a1f; padding: 12px; font-family: monospace; }"
      }
     },
     {
      "sub": "Cada cadena es una fila; repetir un nombre hace que el área ocupe varias celdas. Con una media query se puede redibujar en una columna para móvil (→ [M3](@m3))."
     }
    ]
   },
   {
    "id": "grid-colocar",
    "titulo": "Colocar elementos concretos",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Propiedad",
        "Ejemplo",
        "Hace"
       ],
       "filas": [
        [
         "`grid-column`",
         "`grid-column: 1 / 3`",
         "De la **línea** 1 a la 3 (ocupa 2 columnas)"
        ],
        [
         "`grid-column`",
         "`grid-column: span 2`",
         "Ocupa 2 columnas desde donde caiga"
        ],
        [
         "`grid-column`",
         "`grid-column: 1 / -1`",
         "**Todo el ancho** (`-1` = última línea)"
        ],
        [
         "`grid-row`",
         "`grid-row: span 2`",
         "Ocupa 2 filas"
        ],
        [
         "`justify-items` / `align-items`",
         "`center`",
         "Alinea el contenido **dentro** de cada celda"
        ],
        [
         "`place-items`",
         "`center`",
         "Las dos a la vez → centrar"
        ],
        [
         "`grid-auto-flow`",
         "`dense`",
         "Rellena los huecos que dejan los elementos grandes"
        ]
       ]
      }
     },
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<div class=\"mosaico\">\n  <div class=\"grande\">span 2 × 2</div><div>2</div><div>3</div>\n  <div>4</div><div>5</div><div class=\"ancho\">1 / -1 (todo el ancho)</div>\n</div>",
       "css": ".mosaico { display: grid; grid-template-columns: repeat(4, 1fr); grid-auto-rows: 60px; gap: 8px; }\n.mosaico div { background: #ffd8b0; display: grid; place-items: center; border-radius: 6px; }\n.mosaico .grande { grid-column: span 2; grid-row: span 2; background: #ff8a1f; font-weight: bold; }\n.mosaico .ancho  { grid-column: 1 / -1; background: #1f6feb; color: #fff; }"
      }
     }
    ]
   },
   {
    "id": "subgrid",
    "titulo": "subgrid: alinear entre tarjetas",
    "bloques": [
     {
      "p": "[[ok]] Disponible en todos (desde 2023)"
     },
     {
      "p": "Con `subgrid`, las filas de cada tarjeta se alinean con las de sus vecinas: todos los títulos a la misma altura, todos los precios a la misma altura."
     },
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<div class=\"productos\">\n  <article><h3>Ratón</h3><p>Ligero.</p><strong>29 €</strong></article>\n  <article><h3>Teclado mecánico inalámbrico</h3><p>Switches marrones, retroiluminado y batería de 4000 mAh.</p><strong>89 €</strong></article>\n  <article><h3>Hub USB-C</h3><p>7 puertos.</p><strong>39 €</strong></article>\n</div>",
       "css": ".productos { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }\n.productos article {\n  display: grid;\n  grid-row: span 3;                 /* cada tarjeta ocupa 3 filas de la rejilla padre… */\n  grid-template-rows: subgrid;      /* …y usa esas mismas filas */\n  gap: 6px; border: 1px solid #ccc; border-radius: 8px; padding: 10px;\n}\n.productos h3, .productos p { margin: 0; }\n.productos strong { color: #c25e00; font-size: 1.25rem; }"
      }
     }
    ]
   }
  ],
  "intro": [
   {
    "p": "Grid coloca los hijos en una **rejilla de filas y columnas a la vez**."
   }
  ]
 },
 "mod-11": {
  "resumen": "cuál elegir · todas las formas de centrar",
  "secciones": [
   {
    "id": "flex-o-grid",
    "titulo": "¿Flex o Grid?",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Situación",
        "Elige",
        "Por qué"
       ],
       "filas": [
        [
         "Elementos **en una fila o una columna** (menú, botones, barra de herramientas)",
         "**Flex**",
         "Una dimensión"
        ],
        [
         "El **contenido manda** en el tamaño (etiquetas de distinto largo)",
         "**Flex**",
         "Cada elemento mide lo que necesita"
        ],
        [
         "**Filas y columnas** que deben alinearse (galería, catálogo, tablero)",
         "**Grid**",
         "Dos dimensiones"
        ],
        [
         "El **diseño manda**: estructura de página (cabecera, lateral, contenido)",
         "**Grid**",
         "`grid-template-areas`"
        ],
        [
         "Alinear un icono con un texto",
         "**Flex**",
         "`align-items: center`"
        ],
        [
         "Superponer elementos sin `position`",
         "**Grid**",
         "Varios hijos en la misma celda (`grid-area: 1 / 1`)"
        ]
       ]
      }
     },
     {
      "sub": "No son excluyentes: lo normal es **Grid para la página** y **Flex dentro de cada componente**."
     }
    ]
   },
   {
    "id": "centrar",
    "titulo": "Todas las formas de centrar",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Qué",
        "Cómo"
       ],
       "filas": [
        [
         "**Texto** o elementos en línea dentro de un bloque",
         "`text-align: center`"
        ],
        [
         "Un **bloque con ancho** en horizontal",
         "`margin-inline: auto`"
        ],
        [
         "**Cualquier cosa**, en las dos direcciones (la más corta)",
         "Padre: `display: grid; place-items: center;`"
        ],
        [
         "Cualquier cosa, con flex",
         "Padre: `display: flex; justify-content: center; align-items: center;`"
        ],
        [
         "Un elemento `absolute`",
         "`inset: 0; margin: auto;` (con ancho y alto) o `top: 50%; left: 50%; translate: -50% -50%;`"
        ],
        [
         "Texto en vertical en una línea",
         "`line-height` igual a la altura (solo si es una línea)"
        ]
       ]
      }
     },
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<div class=\"marco grid\"><span>grid + place-items</span></div>\n<div class=\"marco flex\"><span>flex + justify + align</span></div>\n<div class=\"marco abs\"><span>absolute + translate</span></div>",
       "css": ".marco { height: 90px; border: 2px dashed #ff8a1f; margin-bottom: 8px; position: relative; }\n.marco span { background: #ff8a1f; padding: 6px 12px; border-radius: 4px; font-weight: bold; }\n.grid { display: grid; place-items: center; }\n.flex { display: flex; justify-content: center; align-items: center; }\n.abs span { position: absolute; top: 50%; left: 50%; translate: -50% -50%; }"
      }
     }
    ]
   }
  ]
 },
 "mod-12": {
  "resumen": "mobile-first · media queries · container queries",
  "secciones": [
   {
    "id": "mobile-first",
    "titulo": "Mobile-first",
    "bloques": [
     {
      "p": "Primero se escribe el CSS para **móvil** (sin media query) y luego se **añade** lo que cambia en pantallas más grandes con `min-width`."
     },
     {
      "tabla": {
       "cabs": [
        "",
        "Mobile-first (`min-width`) [[ok]]",
        "Desktop-first (`max-width`)"
       ],
       "filas": [
        [
         "CSS base",
         "Móvil: una columna, sencillo",
         "Escritorio: complejo"
        ],
        [
         "Media queries",
         "**Añaden** columnas y adornos",
         "**Deshacen** cosas para móvil"
        ],
        [
         "Resultado",
         "Menos código y móviles más rápidos",
         "Más sobrescrituras"
        ]
       ]
      }
     },
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<div class=\"layout\">\n  <main>Contenido principal</main>\n  <aside>Barra lateral</aside>\n</div>",
       "css": "/* Base = móvil: una columna */\n.layout { display: grid; gap: 12px; }\n.layout > * { background: #fff3e6; border: 2px solid #ff8a1f; padding: 16px; }\n\n/* A partir de 600 px: dos columnas */\n@media (width >= 600px) {\n  .layout { grid-template-columns: 2fr 1fr; }\n}"
      }
     }
    ]
   },
   {
    "id": "media-queries",
    "titulo": "Media queries",
    "bloques": [
     {
      "code": "@media (min-width: 768px) { … }               /* clásica: a partir de 768 px */\n@media (width >= 768px) { … }                 /* sintaxis de rango moderna, equivalente (🟢 Disponible en todos (desde 2023)) */\n@media (768px <= width < 1200px) { … }        /* entre dos valores */\n@media (orientation: landscape) { … }         /* horizontal */\n@media (hover: hover) { .tarjeta:hover { … } }   /* solo en dispositivos con ratón */\n@media print { nav, footer { display: none; } }  /* al imprimir */",
      "lang": "css"
     }
    ]
   },
   {
    "id": "breakpoints",
    "titulo": "Puntos de corte",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Nombre",
        "Desde",
        "Dispositivos típicos"
       ],
       "filas": [
        [
         "(base)",
         "0",
         "Móvil vertical"
        ],
        [
         "`sm`",
         "640 px",
         "Móvil grande, horizontal"
        ],
        [
         "`md`",
         "768 px",
         "Tableta vertical"
        ],
        [
         "`lg`",
         "1024 px",
         "Tableta horizontal, portátil pequeño"
        ],
        [
         "`xl`",
         "1280 px",
         "Escritorio"
        ]
       ]
      }
     },
     {
      "sub": "Son orientativos (los de Tailwind). Lo correcto es poner el corte **donde tu diseño se rompe**, no donde está un dispositivo concreto: estrecha la ventana y mira dónde empieza a verse mal."
     },
     {
      "p": "**Imágenes fluidas** (ya incluido en el [reset](@reset)): `img { max-width: 100%; height: auto; }`. **Tablas anchas:** envolverlas en un `div` con `overflow-x: auto`."
     }
    ]
   },
   {
    "id": "container-queries",
    "titulo": "Container queries: responsive según el contenedor",
    "bloques": [
     {
      "p": "[[ok]] Disponible en todos (desde 2023)"
     },
     {
      "p": "Una media query mira la **ventana**; una container query mira **la caja donde está el componente**. La misma tarjeta se adapta tanto si está en una columna estrecha como en una ancha."
     },
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<div class=\"col estrecha\">\n  <div class=\"envoltorio\"><article class=\"tarjeta\"><img src=\"recursos/auriculares.svg\" alt=\"\" width=\"400\" height=\"300\"><div><h3>Auriculares</h3><p>Columna estrecha: apilada.</p></div></article></div>\n</div>\n<div class=\"col ancha\">\n  <div class=\"envoltorio\"><article class=\"tarjeta\"><img src=\"recursos/auriculares.svg\" alt=\"\" width=\"400\" height=\"300\"><div><h3>Auriculares</h3><p>Columna ancha: imagen al lado.</p></div></article></div>\n</div>",
       "css": ".estrecha { width: 220px; } .ancha { width: 560px; margin-top: 12px; }\n.envoltorio { container-type: inline-size; }          /* 1. declarar el contenedor */\n.tarjeta { display: grid; gap: 8px; border: 1px solid #ccc; border-radius: 8px; padding: 8px; }\n.tarjeta img { width: 100%; height: auto; display: block; }\n.tarjeta h3, .tarjeta p { margin: 0 0 4px; }\n@container (width >= 400px) {                          /* 2. preguntar por SU ancho */\n  .tarjeta { grid-template-columns: 160px 1fr; align-items: center; }\n}"
      }
     }
    ]
   },
   {
    "id": "preferencias",
    "titulo": "Preferencias del usuario",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Media query",
        "El usuario ha pedido…",
        "Qué hacer"
       ],
       "filas": [
        [
         "`prefers-color-scheme: dark`",
         "Modo oscuro en su sistema",
         "Cambiar las variables de color → [MOD.13](@modo-oscuro)"
        ],
        [
         "`prefers-reduced-motion: reduce`",
         "Reducir el movimiento",
         "Quitar o suavizar animaciones (ya está en el [reset](@reset))"
        ],
        [
         "`prefers-contrast: more`",
         "Más contraste",
         "Bordes y textos más marcados"
        ],
        [
         "`forced-colors: active`",
         "Modo de alto contraste de Windows",
         "Comprobar que los bordes y los iconos siguen viéndose"
        ]
       ]
      }
     }
    ]
   }
  ],
  "intro": [
   {
    "nota": "Va más allá del proyecto del festival (que de momento es solo para escritorio), pero es lo siguiente que vas a necesitar. Recuerda que todo empieza por `<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">` en el HTML.",
    "tipo": "note"
   }
  ]
 },
 "mod-13": {
  "resumen": ":root · var() · tokens · modo oscuro",
  "secciones": [
   {
    "id": "variables",
    "titulo": "Definir y usar",
    "bloques": [
     {
      "code": ":root {                                   /* :root = <html>: disponibles en toda la página */\n  --color-marca: #ff8a1f;\n  --espacio-m: 1rem;\n}\n\n.boton {\n  background: var(--color-marca);\n  padding: var(--espacio-m);\n  color: var(--color-texto-boton, #000);  /* segundo valor = respaldo si la variable no existe */\n}\n\n.boton--peligro {\n  --color-marca: #d1242f;                 /* se puede redefinir en un elemento: afecta a él y a sus hijos */\n}",
      "lang": "css"
     },
     {
      "tabla": {
       "cabs": [
        "Detalle",
        "Explicación"
       ],
       "filas": [
        [
         "Nombre",
         "Empiezan por `--` y distinguen mayúsculas (`--Color` ≠ `--color`)"
        ],
        [
         "Herencia",
         "Se heredan: definida en un padre, la usan todos sus descendientes"
        ],
        [
         "En `calc()`",
         "`margin: calc(var(--espacio-m) * 2);`"
        ],
        [
         "Desde JavaScript",
         "`elemento.style.setProperty('--color-marca', '#1f6feb')`"
        ],
        [
         "Lo que no hacen",
         "No sirven en media queries: `@media (width >= var(--md))` **no funciona**"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "tokens",
    "titulo": "Tokens de diseño (un sistema de diseño en un archivo)",
    "bloques": [
     {
      "code": "/* css/variables.css */\n:root {\n  /* Colores */\n  --color-fondo: #ffffff;\n  --color-superficie: #f6f8fa;\n  --color-texto: #1f2328;\n  --color-texto-suave: #59636e;\n  --color-marca: #ff8a1f;\n  --color-borde: #d1d9e0;\n  --color-error: #d1242f;\n  --color-ok: #1a7f37;\n\n  /* Tipografía */\n  --fuente-base: system-ui, sans-serif;\n  --fuente-mono: ui-monospace, Consolas, monospace;\n  --texto-s: 0.875rem;\n  --texto-m: 1rem;\n  --texto-l: 1.25rem;\n  --texto-xl: clamp(1.75rem, 1rem + 3vw, 3rem);\n\n  /* Espaciado (escala de 4 en 4 px) */\n  --espacio-xs: 0.25rem;\n  --espacio-s: 0.5rem;\n  --espacio-m: 1rem;\n  --espacio-l: 2rem;\n  --espacio-xl: 4rem;\n\n  /* Bordes, sombras y capas */\n  --radio: 8px;\n  --sombra: 0 4px 12px rgb(0 0 0 / 12%);\n  --z-cabecera: 200;\n  --z-modal: 300;\n}",
      "lang": "css"
     },
     {
      "sub": "Así funciona el sistema de diseño de vuestro proyecto: cambiar el color de marca es tocar **una línea**."
     }
    ]
   },
   {
    "id": "modo-oscuro",
    "titulo": "Modo oscuro",
    "bloques": [
     {
      "p": "**Opción 1 · Automático según el sistema operativo:**"
     },
     {
      "code": ":root { --color-fondo: #ffffff; --color-texto: #1f2328; }\n\n@media (prefers-color-scheme: dark) {\n  :root { --color-fondo: #0d1117; --color-texto: #e6edf3; }\n}\n\nbody { background: var(--color-fondo); color: var(--color-texto); }",
      "lang": "css"
     },
     {
      "p": "**Opción 2 · `light-dark()`**, más corta ([[half]] Recién disponible (2024-05)):"
     },
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<div class=\"panel\"><h3>Panel</h3><p>Se adapta al modo del sistema.</p><button>Aceptar</button></div>",
       "css": ":root { color-scheme: light dark; }        /* obligatorio para light-dark() */\n.panel {\n  background: light-dark(#ffffff, #161b22);\n  color: light-dark(#1f2328, #e6edf3);\n  border: 1px solid light-dark(#d1d9e0, #30363d);\n  border-radius: 8px; padding: 12px;\n}\n.panel h3 { margin: 0 0 4px; }\n.panel button { background: #ff8a1f; border: 0; padding: 6px 14px; border-radius: 6px; }"
      }
     },
     {
      "p": "**Opción 3 · Interruptor manual sin JavaScript** (con `:has()`) → [M7](@m7)."
     }
    ]
   }
  ]
 },
 "mod-14": {
  "resumen": "transition · transform · @keyframes",
  "secciones": [
   {
    "id": "transition",
    "titulo": "transition: de un estado a otro",
    "bloques": [
     {
      "code": ".boton {\n  background: #ff8a1f;\n  transition: background-color 200ms ease, translate 200ms ease;   /* qué, cuánto, cómo */\n}\n.boton:hover {\n  background: #ffa552;\n  translate: 0 -2px;\n}",
      "lang": "css"
     },
     {
      "tabla": {
       "cabs": [
        "Parte",
        "Valores"
       ],
       "filas": [
        [
         "Propiedad",
         "`background-color`, `transform`, `opacity`… o `all` (cómodo, pero anima de más)"
        ],
        [
         "Duración",
         "`150ms`-`300ms` para interfaz. Más de 500 ms se hace lento"
        ],
        [
         "Curva",
         "`ease` (defecto) · `ease-out` (para lo que **entra**) · `ease-in` (para lo que **sale**) · `linear` · `cubic-bezier(…)`"
        ],
        [
         "Retardo",
         "`transition: opacity 200ms ease 100ms;` (el último tiempo)"
        ]
       ]
      }
     },
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<a class=\"boton\" href=\"#\">Ver oferta</a>",
       "css": ".boton { display: inline-block; margin: 12px; padding: 10px 20px; border-radius: 6px; background: #ff8a1f;\n         color: #000; font-weight: bold; text-decoration: none;\n         transition: background-color 200ms ease, translate 200ms ease, box-shadow 200ms ease; }\n.boton:hover { background: #ffa552; translate: 0 -3px; box-shadow: 0 6px 12px rgb(0 0 0 / 20%); }"
      }
     }
    ]
   },
   {
    "id": "transform",
    "titulo": "transform",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Función",
        "Ejemplo",
        "Propiedad individual moderna"
       ],
       "filas": [
        [
         "Mover",
         "`transform: translate(10px, -5px)`",
         "`translate: 10px -5px`"
        ],
        [
         "Escalar",
         "`transform: scale(1.05)`",
         "`scale: 1.05`"
        ],
        [
         "Girar",
         "`transform: rotate(45deg)`",
         "`rotate: 45deg`"
        ],
        [
         "Inclinar",
         "`transform: skew(-10deg)`",
         "—"
        ],
        [
         "Punto de giro",
         "`transform-origin: top left`",
         "—"
        ]
       ]
      }
     },
     {
      "sub": "Las propiedades individuales (`translate`, `scale`, `rotate`; [[ok]] Disponible en todos (desde 2022)) se pueden combinar y animar por separado sin pisarse."
     },
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<div class=\"formas\"><b>normal</b><b class=\"t1\">translate</b><b class=\"t2\">scale(1.2)</b><b class=\"t3\">rotate(15deg)</b><b class=\"t4\">skew(-10deg)</b></div>",
       "css": ".formas { display: flex; gap: 24px; padding: 24px 12px; }\n.formas b { background: #ff8a1f; padding: 10px; border-radius: 4px; font-size: 13px; }\n.t1 { translate: 0 -12px; } .t2 { scale: 1.2; } .t3 { rotate: 15deg; } .t4 { transform: skew(-10deg); }"
      }
     }
    ]
   },
   {
    "id": "keyframes",
    "titulo": "@keyframes: animaciones",
    "bloques": [
     {
      "code": "@keyframes aparecer {\n  from { opacity: 0; translate: 0 20px; }\n  to   { opacity: 1; translate: 0 0; }\n}\n\n@keyframes girar {\n  to { rotate: 1turn; }\n}\n\n.tarjeta  { animation: aparecer 400ms ease-out both; }\n.cargando { animation: girar 1s linear infinite; }",
      "lang": "css"
     },
     {
      "tabla": {
       "cabs": [
        "Propiedad (dentro de `animation`)",
        "Valores"
       ],
       "filas": [
        [
         "`animation-name`",
         "El nombre del `@keyframes`"
        ],
        [
         "`animation-duration`",
         "`400ms`, `2s`"
        ],
        [
         "`animation-timing-function`",
         "`ease-out`, `linear`, `steps(4)`"
        ],
        [
         "`animation-delay`",
         "`200ms` (escalonar elementos: 0, 100, 200 ms…)"
        ],
        [
         "`animation-iteration-count`",
         "`1`, `3`, `infinite`"
        ],
        [
         "`animation-direction`",
         "`normal`, `alternate` (ida y vuelta)"
        ],
        [
         "`animation-fill-mode`",
         "`both`: mantiene el estado inicial antes de empezar y el final al terminar"
        ],
        [
         "`animation-play-state`",
         "`paused` (pausar al pasar el ratón)"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "anim-rendimiento",
    "titulo": "Rendimiento y accesibilidad",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "[[ok]] Anima",
        "[[no]] Evita animar"
       ],
       "filas": [
        [
         "`transform` (`translate`, `scale`, `rotate`) y `opacity`",
         "`width`, `height`, `top`, `left`, `margin`"
        ],
        [
         "La tarjeta de gráficos los mueve sin recalcular la página: van fluidos a 60 fps",
         "Obligan a recalcular la posición de toda la página en cada fotograma: tirones"
        ]
       ]
      }
     },
     {
      "lista": [
       "Respeta **`prefers-reduced-motion`** (ya incluido en el reset).",
       "Nada que parpadee más de 3 veces por segundo (puede provocar crisis epilépticas)."
      ]
     }
    ]
   }
  ]
 },
 "mod-15": {
  "resumen": "BEM · archivos · orden · nesting · @layer",
  "secciones": [
   {
    "id": "bem",
    "titulo": "BEM: Bloque__Elemento--Modificador",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Parte",
        "Qué es",
        "Ejemplo"
       ],
       "filas": [
        [
         "**Bloque**",
         "Componente independiente y reutilizable",
         "`.tarjeta`, `.menu`, `.boton`"
        ],
        [
         "**Elemento** (`__`)",
         "Parte que solo tiene sentido dentro de su bloque",
         "`.tarjeta__titulo`, `.tarjeta__imagen`, `.menu__enlace`"
        ],
        [
         "**Modificador** (`--`)",
         "Variante o estado",
         "`.tarjeta--destacada`, `.boton--grande`, `.menu__enlace--activo`"
        ]
       ]
      }
     },
     {
      "code": "<article class=\"tarjeta tarjeta--destacada\">\n  <img class=\"tarjeta__imagen\" src=\"…\" alt=\"…\">\n  <h3 class=\"tarjeta__titulo\">Auriculares</h3>\n  <a class=\"boton boton--grande\" href=\"…\">Comprar</a>\n</article>",
      "lang": "html"
     },
     {
      "code": ".tarjeta { … }\n.tarjeta--destacada { border-color: var(--color-marca); }\n.tarjeta__titulo { … }\n.boton { … }\n.boton--grande { … }",
      "lang": "css"
     },
     {
      "tabla": {
       "cabs": [
        "Regla",
        "[[ok]]",
        "[[no]]"
       ],
       "filas": [
        [
         "Una sola clase por selector",
         "`.tarjeta__titulo`",
         "`.tarjeta h3`, `.tarjeta .titulo`"
        ],
        [
         "Sin \"nietos\" en el nombre",
         "`.tarjeta__enlace`",
         "`.tarjeta__pie__enlace`"
        ],
        [
         "El modificador **acompaña** al bloque",
         "`class=\"boton boton--grande\"`",
         "`class=\"boton--grande\"` solo"
        ],
        [
         "Nada de `id` ni etiquetas para dar estilo",
         "`.cabecera`",
         "`#cabecera`, `header`"
        ]
       ]
      }
     },
     {
      "sub": "Ventaja: todos los selectores tienen la misma especificidad (`0-1-0`), así que no hay \"guerras\" de especificidad y el nombre dice dónde está cada cosa."
     }
    ]
   },
   {
    "id": "organizar",
    "titulo": "Organizar los archivos",
    "bloques": [
     {
      "consola": "css/\n├── reset.css          ← 1. el reset (MOD.01)\n├── variables.css      ← 2. tokens: colores, fuentes, espacios\n├── base.css           ← 3. estilos de etiquetas: body, h1-h6, a, enlaces…\n├── layout.css         ← 4. estructura: contenedor, cabecera, rejillas de página\n├── componentes/       ← 5. un archivo por bloque BEM\n│   ├── boton.css\n│   ├── tarjeta.css\n│   └── menu.css\n└── utilidades.css     ← 6. clases de ayuda: .sr-only, .texto-centrado…"
     },
     {
      "sub": "El orden importa: de lo más general a lo más concreto. Así, a igual especificidad, lo concreto gana por ir después."
     }
    ]
   },
   {
    "id": "orden-propiedades",
    "titulo": "Orden de las propiedades dentro de una regla",
    "bloques": [
     {
      "code": ".tarjeta {\n  /* 1. Posición */\n  position: relative;\n  z-index: 1;\n  /* 2. Modelo de caja y disposición */\n  display: grid;\n  gap: 1rem;\n  width: 100%;\n  padding: 1rem;\n  /* 3. Tipografía */\n  font-size: 1rem;\n  color: var(--color-texto);\n  /* 4. Aspecto */\n  background: var(--color-superficie);\n  border: 1px solid var(--color-borde);\n  border-radius: var(--radio);\n  /* 5. Otros */\n  transition: box-shadow 200ms;\n}",
      "lang": "css"
     }
    ]
   },
   {
    "id": "nesting",
    "titulo": "Nesting nativo (sin Sass)",
    "bloques": [
     {
      "p": "[[ok]] Disponible en todos (desde 2023)"
     },
     {
      "code": ".tarjeta {\n  padding: 1rem;\n\n  & h3 { margin-bottom: 0.5rem; }            /* = .tarjeta h3 */\n  &:hover { box-shadow: var(--sombra); }     /* = .tarjeta:hover */\n  &--destacada { border-color: orange; }     /* ✖ esto NO crea .tarjeta--destacada (en Sass sí) */\n\n  @media (width >= 768px) {                  /* media query dentro de la regla */\n    padding: 2rem;\n  }\n}",
      "lang": "css"
     },
     {
      "aviso": "El CSS nativo **no concatena** nombres como Sass: `&--destacada` no equivale a `.tarjeta--destacada`. Con BEM, escribe los modificadores y elementos como reglas aparte. Y no anides más de 2-3 niveles: la especificidad crece con cada nivel.",
      "tipo": "warning"
     }
    ]
   },
   {
    "id": "layer",
    "titulo": "@layer: capas de cascada",
    "bloques": [
     {
      "p": "[[ok]] Disponible en todos (desde 2022)"
     },
     {
      "code": "/* Se declara el orden de las capas: las de la derecha GANAN, sea cual sea su especificidad */\n@layer reset, base, componentes, utilidades;\n\n@import url(\"reset.css\") layer(reset);\n\n@layer base {\n  a { color: var(--color-marca); }\n}\n\n@layer componentes {\n  .boton { color: #000; }        /* gana a \"a\" de base aunque se escriba antes */\n}\n\n@layer utilidades {\n  .oculto { display: none; }     /* gana a cualquier componente */\n}",
      "lang": "css"
     },
     {
      "sub": "Resuelve el problema de \"este selector tan específico del reset me impide sobrescribirlo\": la capa decide antes que la especificidad."
     }
    ]
   }
  ]
 },
 "mod-16": {
  "resumen": "qué se puede usar ya · datos Baseline",
  "secciones": [
   {
    "id": "moderno-tabla",
    "titulo": "Tabla de compatibilidad",
    "bloques": [
     {
      "p": "**Baseline** indica si una característica funciona en las últimas versiones de Chrome, Edge, Firefox y Safari. Datos oficiales del proyecto web-features a octubre de 2026."
     },
     {
      "tabla": {
       "cabs": [
        "Característica",
        "Para qué",
        "¿Se puede usar?"
       ],
       "filas": [
        [
         "`:has()`",
         "Seleccionar un padre según sus hijos → [MOD.02](@is-where-has)",
         "[[ok]] Disponible en todos (desde 2023)"
        ],
        [
         "Nesting",
         "Anidar reglas sin Sass → [MOD.15](@nesting)",
         "[[ok]] Disponible en todos (desde 2023)"
        ],
        [
         "Container queries",
         "Responsive según el contenedor → [MOD.12](@container-queries)",
         "[[ok]] Disponible en todos (desde 2023)"
        ],
        [
         "`subgrid`",
         "Alinear filas entre tarjetas → [MOD.10](@subgrid)",
         "[[ok]] Disponible en todos (desde 2023)"
        ],
        [
         "`@layer`",
         "Capas de cascada → [MOD.15](@layer)",
         "[[ok]] Disponible en todos (desde 2022)"
        ],
        [
         "`color-mix()`",
         "Mezclar colores → [MOD.04](@color-mix)",
         "[[ok]] Disponible en todos (desde 2023)"
        ],
        [
         "`oklch()`",
         "Colores con luminosidad uniforme",
         "[[ok]] Disponible en todos (desde 2023)"
        ],
        [
         "`:user-invalid`",
         "Errores de formulario solo tras tocar el campo → [M6](@m6)",
         "[[ok]] Disponible en todos (desde 2023)"
        ],
        [
         "`light-dark()`",
         "Modo claro y oscuro en una línea → [MOD.13](@modo-oscuro)",
         "[[half]] Recién disponible (2024-05)"
        ],
        [
         "`text-wrap: balance`",
         "Títulos equilibrados",
         "[[half]] Recién disponible (2024-05)"
        ],
        [
         "`@starting-style`",
         "Animar la **aparición** de un elemento (`display: none` → visible)",
         "[[half]] Recién disponible (2024-08)"
        ],
        [
         "View transitions",
         "Transiciones animadas entre estados de la página",
         "[[half]] Recién disponible (2025-10)"
        ],
        [
         "`@scope`",
         "Limitar estilos a una parte del DOM",
         "[[half]] Recién disponible (2026-03)"
        ],
        [
         "`field-sizing: content`",
         "Campos de formulario que crecen con el texto",
         "[[half]] Recién disponible (2026-06)"
        ],
        [
         "Container style queries",
         "`@container style(--tema: oscuro)`",
         "[[half]] Recién disponible (2026-05)"
        ],
        [
         "Anchor positioning",
         "Colocar un tooltip pegado a su botón sin JS",
         "[[no]] Aún no en todos los navegadores"
        ],
        [
         "Scroll-driven animations",
         "Animaciones que avanzan con el scroll",
         "[[no]] Aún no en todos los navegadores"
        ],
        [
         "`<select>` personalizable",
         "Dar estilo completo al desplegable nativo",
         "[[no]] Aún no en todos los navegadores"
        ],
        [
         "`interpolate-size`",
         "Animar hasta `height: auto`",
         "[[no]] Aún no en todos los navegadores"
        ]
       ]
      }
     },
     {
      "nota": "- [[ok]] **Úsalo** sin miedo. - [[half]] **Úsalo** si tu público usa navegadores actualizados (casi siempre); en navegadores de hace un año puede no funcionar. - [[no]] Solo como **mejora progresiva**: que la página funcione bien sin ello y, donde exista, quede mejor. Para comprobar con `@supports`: `@supports (anchor-name: --a) { … }`.",
      "tipo": "tip"
     }
    ]
   },
   {
    "id": "moderno-ejemplos",
    "titulo": "Ejemplos rápidos",
    "bloques": [
     {
      "code": "/* @starting-style: el popover aparece con un fundido en vez de \"de golpe\" */\n[popover] { opacity: 1; transition: opacity 200ms, display 200ms allow-discrete; }\n[popover]:not(:popover-open) { opacity: 0; }\n@starting-style { [popover]:popover-open { opacity: 0; } }\n\n/* field-sizing: el textarea crece al escribir */\ntextarea { field-sizing: content; min-height: 3lh; max-height: 12lh; }\n\n/* View transitions entre páginas de un mismo sitio (mejora progresiva) */\n@view-transition { navigation: auto; }\n\n/* @scope: estilos que solo afectan a .tarjeta y no \"se filtran\" a sus hijos con .anidado */\n@scope (.tarjeta) to (.anidado) {\n  img { border-radius: var(--radio); }\n}",
      "lang": "css"
     }
    ]
   }
  ]
 },
 "mod-17": {
  "resumen": "DevTools · por qué no se aplica · errores",
  "secciones": [
   {
    "id": "devtools",
    "titulo": "DevTools (F12)",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Pestaña o herramienta",
        "Para qué"
       ],
       "filas": [
        [
         "Elements → Styles",
         "Reglas que afectan al elemento, en orden de prioridad. **Las tachadas han perdido** contra otra; un **triángulo amarillo** indica propiedad o valor inválido"
        ],
        [
         "Elements → Computed",
         "Valor **final** de cada propiedad y el dibujo del modelo de caja con sus medidas"
        ],
        [
         "Insignias `flex` / `grid` junto al elemento",
         "Dibujan la rejilla, las líneas y los huecos sobre la página"
        ],
        [
         "Barra de herramientas de dispositivo (`Ctrl+Shift+M`)",
         "Probar anchos de móvil y tableta"
        ],
        [
         "Rendering → Emulate CSS media",
         "Simular `prefers-color-scheme: dark`, `prefers-reduced-motion`, `print`"
        ],
        [
         "Hacer clic en un color",
         "Selector de color y **ratio de contraste**"
        ],
        [
         "`:hov` en Styles",
         "Forzar `:hover`, `:focus`, `:active` para inspeccionarlos"
        ]
       ]
      }
     },
     {
      "nota": "**Truco para ver todas las cajas:** `* { outline: 1px solid red; }` muestra el borde de cada elemento sin cambiar las medidas (al contrario que `border`).",
      "tipo": "tip"
     }
    ]
   },
   {
    "id": "no-se-aplica",
    "titulo": "\"¿Por qué no se aplica mi CSS?\"",
    "bloques": [
     {
      "lista": [
       "¿Está **enlazado** el archivo? Pestaña Network (F12) → ¿aparece con estado 200 o con 404? ¿La ruta del `href` es correcta desde el HTML?",
       "¿El navegador usa la **versión antigua**? Recarga sin caché: `Ctrl+F5` o `Ctrl+Shift+R`.",
       "¿El **selector** coincide con el HTML? Una errata en la clase (`.tarjta`), o un punto que falta (`tarjeta` en vez de `.tarjeta`).",
       "¿Hay un error **antes** en el CSS? Una llave `}` sin cerrar invalida todo lo que viene después.",
       "¿Pierde por **especificidad** u **orden**? En Styles, ¿aparece tachada?",
       "¿Es una propiedad que **no funciona en ese elemento**? `width` en un `span`, `z-index` sin `position`, `justify-content` sin `display: flex`.",
       "¿La propiedad o el valor están **mal escritos**? Triángulo amarillo en Styles."
      ],
      "ordenada": true
     }
    ]
   },
   {
    "id": "errores",
    "titulo": "Errores frecuentes",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Síntoma",
        "Causa",
        "Solución"
       ],
       "filas": [
        [
         "`width` o `height` no hacen nada",
         "El elemento es en línea (`span`, `a`)",
         "`display: inline-block` o `block`"
        ],
        [
         "La caja mide más de lo que puse",
         "`box-sizing: content-box`: el padding y el borde se suman",
         "Reset con `border-box`"
        ],
        [
         "Hay un hueco bajo la imagen",
         "La imagen es en línea",
         "`img { display: block; }`"
        ],
        [
         "`height: 100%` no funciona",
         "El padre no tiene una altura definida",
         "`min-height` en el padre, o flex/grid"
        ],
        [
         "El margen del primer hijo \"se sale\" del padre",
         "Colapso de márgenes",
         "`padding` en el padre, `display: flow-root`, o usar `gap`"
        ],
        [
         "`z-index` no surte efecto",
         "El elemento no está posicionado, o está en otro contexto de apilamiento",
         "`position: relative`; revisar `opacity`/`transform` en los padres"
        ],
        [
         "`absolute` aparece en la esquina de la página",
         "Ningún ancestro está posicionado",
         "`position: relative` en el padre"
        ],
        [
         "`sticky` no se pega",
         "Falta `top`, o un ancestro tiene `overflow` distinto de `visible`",
         "`top: 0`; quitar el `overflow`"
        ],
        [
         "Scroll horizontal en móvil",
         "Algo con ancho fijo (`width: 1200px`, `100vw` con barra de scroll)",
         "`max-width: 100%`, `width: min(100%, 1200px)`"
        ],
        [
         "`100vh` en móvil corta el contenido",
         "La barra del navegador no se descuenta",
         "`100dvh` / `100svh`"
        ],
        [
         "La fuente propia no carga",
         "Ruta de `url()` relativa al HTML en vez de al CSS",
         "Desde `css/` → `../fonts/…`"
        ],
        [
         "El texto se ve borroso en la animación",
         "Animar `top`/`left` o escalados con decimales raros",
         "Animar `translate` y `scale`"
        ],
        [
         "Un `!important` lo arregla \"todo\"",
         "Problema de especificidad sin resolver",
         "Bajar especificidad (BEM, `:where`) o usar `@layer`"
        ],
        [
         "El color de un enlace no cambia",
         "`:visited` o el orden de `:hover`",
         "Orden **LVHA**: `:link`, `:visited`, `:hover`, `:active`"
        ]
       ]
      }
     }
    ]
   }
  ]
 },
 "mod-18": {
  "resumen": "9 componentes reales · BEM · variables",
  "secciones": [
   {
    "id": "m1",
    "titulo": "M1 · Tarjeta de producto",
    "bloques": [
     {
      "nota": "** Caso real:** la tarjeta de un listado de tienda: imagen con proporción fija, insignia de descuento, nombre, precio anterior y actual, y un efecto al pasar el ratón.",
      "tipo": "note"
     },
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<article class=\"producto\">\n  <div class=\"producto__media\">\n    <img class=\"producto__imagen\" src=\"recursos/auriculares.svg\" alt=\"Auriculares Sony WH-1000XM5\" width=\"400\" height=\"300\">\n    <span class=\"producto__insignia\">-8 %</span>\n  </div>\n  <div class=\"producto__cuerpo\">\n    <h3 class=\"producto__titulo\">Auriculares Sony WH-1000XM5</h3>\n    <p class=\"producto__precio\"><s>379,00 €</s> <strong>349,00 €</strong></p>\n    <a class=\"boton\" href=\"#\">Añadir al carrito</a>\n  </div>\n</article>",
       "css": ":root { --marca: #ff8a1f; --texto: #1f2328; --suave: #59636e; --radio: 10px; }\n.producto {\n  width: 260px; margin: 12px; overflow: hidden;\n  background: #fff; border: 1px solid #d1d9e0; border-radius: var(--radio);\n  transition: translate 200ms ease, box-shadow 200ms ease;\n}\n.producto:hover { translate: 0 -4px; box-shadow: 0 12px 24px rgb(0 0 0 / 15%); }\n.producto__media { position: relative; }\n.producto__imagen { display: block; width: 100%; aspect-ratio: 4 / 3; object-fit: cover; }\n.producto__insignia {\n  position: absolute; top: 10px; left: 10px; padding: 2px 8px;\n  background: #d1242f; color: #fff; font-weight: bold; font-size: 0.85rem; border-radius: 4px;\n}\n.producto__cuerpo { display: grid; gap: 8px; padding: 12px; }\n.producto__titulo { margin: 0; font-size: 1rem; color: var(--texto); }\n.producto__precio { margin: 0; }\n.producto__precio s { color: var(--suave); font-size: 0.9rem; }\n.producto__precio strong { font-size: 1.25rem; color: #c25e00; }\n.boton {\n  display: block; padding: 10px; text-align: center; font-weight: bold;\n  background: var(--marca); color: #000; text-decoration: none; border-radius: 6px;\n}\n.boton:hover { background: color-mix(in oklch, var(--marca), white 20%); }"
      }
     },
     {
      "tabla": {
       "cabs": [
        "Decisión",
        "Por qué"
       ],
       "filas": [
        [
         "`.producto__media` con `position: relative`",
         "Es la referencia de la insignia `absolute`"
        ],
        [
         "`aspect-ratio` + `object-fit: cover`",
         "Todas las fotos del listado iguales aunque los originales no lo sean"
        ],
        [
         "`overflow: hidden` en la tarjeta",
         "Las esquinas redondeadas también recortan la imagen"
        ],
        [
         "Animar `translate` y `box-shadow`",
         "Movimiento fluido, sin recalcular la página"
        ],
        [
         "`color-mix()` para el hover",
         "Un solo color de marca; las variantes se calculan"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "m2",
    "titulo": "M2 · Barra de navegación responsive",
    "bloques": [
     {
      "nota": "** Caso real:** cabecera con logo, enlaces y botón de acceso. En escritorio, todo en una fila; en móvil, los enlaces pasan debajo y se pueden desplazar en horizontal.",
      "tipo": "note"
     },
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<header class=\"cabecera\">\n  <a class=\"cabecera__logo\" href=\"#\"><img src=\"recursos/logo.svg\" alt=\"Tienda DAW, ir al inicio\" width=\"160\" height=\"40\"></a>\n  <nav class=\"menu\" aria-label=\"Principal\">\n    <ul class=\"menu__lista\" role=\"list\">\n      <li><a class=\"menu__enlace\" href=\"#\" aria-current=\"page\">Inicio</a></li>\n      <li><a class=\"menu__enlace\" href=\"#\">Teclados</a></li>\n      <li><a class=\"menu__enlace\" href=\"#\">Audio</a></li>\n      <li><a class=\"menu__enlace\" href=\"#\">Ofertas</a></li>\n    </ul>\n  </nav>\n  <a class=\"cabecera__acceso\" href=\"#\">Entrar</a>\n</header>",
       "css": "body { margin: 0; }\n.cabecera {\n  display: flex; flex-wrap: wrap; align-items: center; gap: 8px 16px;\n  padding: 12px 16px; background: #fff; border-bottom: 1px solid #d1d9e0;\n}\n.cabecera__logo img { display: block; height: 32px; width: auto; }\n.cabecera__acceso {\n  margin-left: auto; padding: 6px 14px; border-radius: 999px;\n  background: #0d1117; color: #fff; text-decoration: none; font-weight: bold;\n}\n.menu { order: 3; width: 100%; overflow-x: auto; }          /* móvil: en otra línea, ancho completo */\n.menu__lista { display: flex; gap: 4px; margin: 0; padding: 0; list-style: none; }\n.menu__enlace {\n  display: block; padding: 6px 12px; border-radius: 6px;\n  color: #1f2328; text-decoration: none; white-space: nowrap;\n}\n.menu__enlace:hover { background: #f1f3f5; }\n.menu__enlace[aria-current=\"page\"] { background: #fff3e6; color: #c25e00; font-weight: bold; }\n\n@media (width >= 640px) {\n  .menu { order: 0; width: auto; }                           /* escritorio: en la misma fila */\n}"
      }
     },
     {
      "tabla": {
       "cabs": [
        "Decisión",
        "Por qué"
       ],
       "filas": [
        [
         "`flex-wrap: wrap` + `order: 3` + `width: 100%` en móvil",
         "El menú baja a su propia línea sin cambiar el HTML"
        ],
        [
         "`margin-left: auto` en \"Entrar\"",
         "Lo empuja al extremo derecho"
        ],
        [
         "`overflow-x: auto` en el menú",
         "Si no caben los enlaces en móvil, se desplazan con el dedo en vez de romper el diseño"
        ],
        [
         "`[aria-current=\"page\"]` como selector",
         "La marca de accesibilidad sirve también de gancho para el estilo: no hace falta una clase `--activo`"
        ],
        [
         "`role=\"list\"`",
         "El reset le quita las viñetas sin que Safari deje de anunciarla como lista"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "m3",
    "titulo": "M3 · Maquetación de página",
    "bloques": [
     {
      "nota": "** Caso real:** la estructura de un blog: cabecera, contenido, barra lateral y pie. En móvil, todo en una columna con la barra lateral **debajo** del contenido; en escritorio, dos columnas.",
      "tipo": "note"
     },
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<div class=\"pagina\">\n  <header class=\"pagina__cabecera\">Cabecera</header>\n  <main class=\"pagina__contenido\">Contenido principal</main>\n  <aside class=\"pagina__lateral\">Barra lateral</aside>\n  <footer class=\"pagina__pie\">Pie</footer>\n</div>",
       "css": "body { margin: 0; }\n.pagina {\n  display: grid; gap: 8px; padding: 8px; min-height: 360px;\n  grid-template-areas:\n    \"cabecera\"\n    \"contenido\"\n    \"lateral\"\n    \"pie\";\n  grid-template-rows: auto 1fr auto auto;\n}\n.pagina__cabecera  { grid-area: cabecera; }\n.pagina__contenido { grid-area: contenido; }\n.pagina__lateral   { grid-area: lateral; }\n.pagina__pie       { grid-area: pie; }\n.pagina > * { padding: 16px; border: 2px solid #ff8a1f; background: #fff3e6; font-family: monospace; }\n\n@media (width >= 640px) {\n  .pagina {\n    grid-template-columns: 1fr 200px;\n    grid-template-areas:\n      \"cabecera  cabecera\"\n      \"contenido lateral\"\n      \"pie       pie\";\n    grid-template-rows: auto 1fr auto;\n  }\n}"
      }
     },
     {
      "tabla": {
       "cabs": [
        "Decisión",
        "Por qué"
       ],
       "filas": [
        [
         "`grid-template-areas`",
         "El diseño de cada tamaño se \"dibuja\" y la media query solo redibuja el mapa"
        ],
        [
         "Orden del HTML: contenido antes que la barra lateral",
         "Es el orden lógico para el lector de pantalla y el tabulador. En escritorio, el CSS los pone uno al lado del otro"
        ],
        [
         "Fila `1fr` para el contenido",
         "El pie queda abajo aunque haya poco contenido"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "m4",
    "titulo": "M4 · Hero con imagen de fondo",
    "bloques": [
     {
      "nota": "** Caso real:** la portada de una web: imagen grande de fondo, título que se lee bien sobre ella, subtítulo y dos llamadas a la acción.",
      "tipo": "note"
     },
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<section class=\"hero\">\n  <div class=\"hero__contenido\">\n    <h1 class=\"hero__titulo\">Equipa tu escritorio</h1>\n    <p class=\"hero__texto\">Periféricos seleccionados por desarrolladores, con envío en 24 h.</p>\n    <div class=\"hero__acciones\">\n      <a class=\"boton boton--principal\" href=\"#\">Ver ofertas</a>\n      <a class=\"boton boton--secundario\" href=\"#\">Cómo elegimos</a>\n    </div>\n  </div>\n</section>",
       "css": "body { margin: 0; }\n.hero {\n  display: grid; align-items: end; min-height: 320px; padding: clamp(16px, 4vw, 48px);\n  color: #fff;\n  background:\n    linear-gradient(to top, rgb(13 17 23 / 90%), rgb(13 17 23 / 20%)),   /* capa oscura para leer el texto */\n    url(\"recursos/paisaje.svg\") center / cover no-repeat;\n}\n.hero__contenido { max-width: 34ch; }\n.hero__titulo { margin: 0 0 8px; font-size: clamp(1.75rem, 1rem + 4vw, 3.25rem); line-height: 1.1; text-wrap: balance; }\n.hero__texto { margin: 0 0 16px; font-size: 1.1rem; }\n.hero__acciones { display: flex; flex-wrap: wrap; gap: 8px; }\n.boton { padding: 10px 18px; border-radius: 6px; font-weight: bold; text-decoration: none; }\n.boton--principal { background: #ff8a1f; color: #000; }\n.boton--secundario { color: #fff; border: 2px solid #fff; }"
      }
     },
     {
      "tabla": {
       "cabs": [
        "Decisión",
        "Por qué"
       ],
       "filas": [
        [
         "Degradado **encima** de la imagen en el mismo `background`",
         "Garantiza el contraste del texto sea cual sea la foto"
        ],
        [
         "`clamp()` en el título y el padding",
         "Escalan con la pantalla sin media queries"
        ],
        [
         "`max-width: 34ch`",
         "Líneas cortas y legibles"
        ],
        [
         "`min-height` y no `height`",
         "Si el texto crece (traducción, zoom), la sección crece con él"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "m5",
    "titulo": "M5 · Tabla de precios con plan destacado",
    "bloques": [
     {
      "nota": "** Caso real:** tres planes de suscripción en tarjetas. El del medio está destacado; los precios y botones quedan alineados aunque las listas tengan distinta longitud.",
      "tipo": "note"
     },
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<div class=\"planes\">\n  <article class=\"plan\">\n    <h3 class=\"plan__nombre\">Básico</h3>\n    <p class=\"plan__precio\">6,99 €<span>/mes</span></p>\n    <ul class=\"plan__lista\"><li>HD</li><li>1 pantalla</li></ul>\n    <a class=\"plan__boton\" href=\"#\">Elegir</a>\n  </article>\n  <article class=\"plan plan--destacado\">\n    <span class=\"plan__insignia\">Más popular</span>\n    <h3 class=\"plan__nombre\">Estándar</h3>\n    <p class=\"plan__precio\">12,99 €<span>/mes</span></p>\n    <ul class=\"plan__lista\"><li>Full HD</li><li>2 pantallas</li><li>Descargas</li></ul>\n    <a class=\"plan__boton\" href=\"#\">Elegir</a>\n  </article>\n  <article class=\"plan\">\n    <h3 class=\"plan__nombre\">Premium</h3>\n    <p class=\"plan__precio\">17,99 €<span>/mes</span></p>\n    <ul class=\"plan__lista\"><li>4K + HDR</li><li>4 pantallas</li><li>Descargas</li><li>Audio espacial</li></ul>\n    <a class=\"plan__boton\" href=\"#\">Elegir</a>\n  </article>\n</div>",
       "css": ".planes { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; padding: 24px 8px 8px; align-items: stretch; }\n.plan {\n  position: relative; display: grid; grid-row: span 4; grid-template-rows: subgrid; gap: 8px;\n  padding: 20px 16px; border: 1px solid #d1d9e0; border-radius: 12px; background: #fff; text-align: center;\n}\n.plan--destacado { border: 2px solid #ff8a1f; box-shadow: 0 12px 28px rgb(255 138 31 / 25%); scale: 1.04; }\n.plan__insignia {\n  position: absolute; top: 0; left: 50%; translate: -50% -50%;\n  background: #ff8a1f; padding: 2px 12px; border-radius: 999px; font-size: 0.8rem; font-weight: bold; white-space: nowrap;\n}\n.plan__nombre { margin: 0; }\n.plan__precio { margin: 0; font-size: 1.75rem; font-weight: bold; }\n.plan__precio span { font-size: 0.9rem; font-weight: normal; color: #59636e; }\n.plan__lista { margin: 0; padding: 0; list-style: none; line-height: 1.8; }\n.plan__boton { align-self: end; padding: 10px; border-radius: 6px; background: #0d1117; color: #fff; text-decoration: none; font-weight: bold; }\n.plan--destacado .plan__boton { background: #ff8a1f; color: #000; }"
      }
     },
     {
      "tabla": {
       "cabs": [
        "Decisión",
        "Por qué"
       ],
       "filas": [
        [
         "`grid-template-rows: subgrid` en cada plan",
         "Nombre, precio, lista y botón comparten filas con los otros planes: los precios quedan alineados"
        ],
        [
         "Modificador `plan--destacado`",
         "Variante del mismo bloque, no un componente nuevo"
        ],
        [
         "Insignia con `translate: -50% -50%`",
         "Centrada sobre el borde superior, sea cual sea su texto"
        ],
        [
         "`scale` y no `width` para destacar",
         "No mueve a los vecinos ni recalcula la rejilla"
        ]
       ]
      }
     },
     {
      "sub": "Para móvil bastaría con `grid-template-columns: 1fr` en la base y `repeat(3, 1fr)` a partir de 768 px."
     }
    ]
   },
   {
    "id": "m6",
    "titulo": "M6 · Formulario con estados",
    "bloques": [
     {
      "nota": "** Caso real:** un campo de email que muestra el foco al tabular, y el error en rojo con su mensaje **solo después** de que el usuario escriba algo incorrecto (no nada más cargar la página).",
      "tipo": "note"
     },
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<form class=\"formulario\" action=\"#\" novalidate>\n  <div class=\"campo\">\n    <label class=\"campo__etiqueta\" for=\"email\">Email</label>\n    <input class=\"campo__control\" id=\"email\" name=\"email\" type=\"email\" required placeholder=\"tu@correo.com\" aria-describedby=\"email-error\">\n    <p class=\"campo__error\" id=\"email-error\">Escribe un email válido, por ejemplo ana@correo.com</p>\n  </div>\n  <button class=\"formulario__boton\" type=\"submit\">Suscribirme</button>\n</form>",
       "css": ".formulario { display: grid; gap: 12px; max-width: 300px; padding: 4px; }\n.campo { display: grid; gap: 4px; }\n.campo__etiqueta { font-weight: bold; }\n.campo__control {\n  padding: 10px 12px; border: 2px solid #d1d9e0; border-radius: 6px; font: inherit;\n  transition: border-color 150ms, box-shadow 150ms;\n}\n.campo__control:focus-visible { outline: none; border-color: #1f6feb; box-shadow: 0 0 0 4px rgb(31 111 235 / 25%); }\n.campo__control:user-invalid { border-color: #d1242f; background: #fff5f5; }\n.campo__control:user-valid   { border-color: #1a7f37; }\n.campo__error { display: none; margin: 0; color: #d1242f; font-size: 0.875rem; }\n.campo:has(.campo__control:user-invalid) .campo__error { display: block; }   /* el mensaje aparece solo */\n.formulario__boton { padding: 10px; border: 0; border-radius: 6px; background: #ff8a1f; font: inherit; font-weight: bold; }"
      }
     },
     {
      "tabla": {
       "cabs": [
        "Decisión",
        "Por qué"
       ],
       "filas": [
        [
         "`:user-invalid` y no `:invalid`",
         "`:invalid` pintaría el campo de rojo nada más cargar la página (vacío + `required` = inválido)"
        ],
        [
         "`:has()` para mostrar el mensaje",
         "El padre `.campo` sabe si su campo es inválido: sin JavaScript"
        ],
        [
         "`outline: none` **solo** porque se sustituye por otro foco visible",
         "Nunca dejar un control sin indicador de foco"
        ],
        [
         "`aria-describedby` → el párrafo de error",
         "El lector de pantalla lee el error al entrar en el campo"
        ],
        [
         "`novalidate` en el form",
         "Desactiva el globo nativo para usar los mensajes propios (el servidor valida igualmente)"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "m7",
    "titulo": "M7 · Modo oscuro con interruptor sin JavaScript",
    "bloques": [
     {
      "nota": "** Caso real:** un interruptor \"Modo oscuro\" que cambia los colores de toda la página. Todo el tema depende de variables y el cambio lo hace `:has()`.",
      "tipo": "note"
     },
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<label class=\"interruptor\">\n  <input class=\"interruptor__control\" type=\"checkbox\" id=\"modo\" role=\"switch\">\n  <span class=\"interruptor__pista\" aria-hidden=\"true\"></span>\n  Modo oscuro\n</label>\n<article class=\"aviso\">\n  <h2 class=\"aviso__titulo\">Pedido enviado</h2>\n  <p>Tu pedido #1024 llegará mañana.</p>\n  <a href=\"#\">Seguir el envío</a>\n</article>",
       "css": ":root {\n  --fondo: #ffffff; --superficie: #f6f8fa; --texto: #1f2328; --borde: #d1d9e0; --enlace: #0969da;\n}\n:root:has(#modo:checked) {                      /* si el interruptor está marcado, cambian las variables */\n  --fondo: #0d1117; --superficie: #161b22; --texto: #e6edf3; --borde: #30363d; --enlace: #ff8a1f;\n  color-scheme: dark;\n}\nbody { margin: 0; padding: 16px; background: var(--fondo); color: var(--texto); transition: background 200ms, color 200ms; }\na { color: var(--enlace); }\n.aviso { margin-top: 16px; padding: 16px; background: var(--superficie); border: 1px solid var(--borde); border-radius: 8px; }\n.aviso__titulo { margin: 0 0 4px; font-size: 1.1rem; }\n.interruptor { display: inline-flex; align-items: center; gap: 8px; cursor: pointer; font-weight: bold; }\n.interruptor__control { position: absolute; opacity: 0; }        /* oculto pero accesible con teclado */\n.interruptor__pista { width: 44px; height: 24px; border-radius: 999px; background: #d1d9e0; position: relative; transition: background 200ms; }\n.interruptor__pista::after {\n  content: \"\"; position: absolute; top: 3px; left: 3px; width: 18px; height: 18px; border-radius: 50%;\n  background: #fff; transition: translate 200ms;\n}\n.interruptor__control:checked + .interruptor__pista { background: #ff8a1f; }\n.interruptor__control:checked + .interruptor__pista::after { translate: 20px 0; }\n.interruptor__control:focus-visible + .interruptor__pista { outline: 3px solid #1f6feb; outline-offset: 2px; }"
      }
     },
     {
      "tabla": {
       "cabs": [
        "Decisión",
        "Por qué"
       ],
       "filas": [
        [
         "Todos los colores en variables",
         "El tema entero cambia redefiniendo **5 variables**, no reescribiendo reglas"
        ],
        [
         "`:root:has(#modo:checked)`",
         "El documento \"sabe\" si el checkbox está marcado, aunque esté en cualquier parte de la página"
        ],
        [
         "Checkbox real oculto con `opacity: 0`",
         "Sigue siendo accesible: se activa con teclado y el lector anuncia \"interruptor\" (`role=\"switch\"`)"
        ],
        [
         "`color-scheme: dark`",
         "Las barras de scroll y los controles nativos también se vuelven oscuros"
        ]
       ]
      }
     },
     {
      "sub": "Para que se recuerde la elección al cambiar de página haría falta un poco de JavaScript (`localStorage`). Lo ideal es combinarlo con `prefers-color-scheme` como valor inicial."
     }
    ]
   },
   {
    "id": "m8",
    "titulo": "M8 · Banner de cookies",
    "bloques": [
     {
      "nota": "** Caso real:** el aviso de cookies fijo en la parte inferior, por encima del contenido, con efecto de cristal y botones con el **mismo peso visual** para aceptar y rechazar (lo exige la normativa española).",
      "tipo": "note"
     },
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<main class=\"contenido\">\n  <h1>Ofertas de la semana</h1>\n  <p>Contenido de la página que queda por detrás del aviso de cookies…</p>\n  <img src=\"recursos/paisaje.svg\" alt=\"\" width=\"600\" height=\"300\">\n</main>\n<section class=\"cookies\" aria-labelledby=\"cookies-titulo\">\n  <h2 class=\"cookies__titulo\" id=\"cookies-titulo\">Usamos cookies</h2>\n  <p class=\"cookies__texto\">Para analizar el tráfico y recordar tus preferencias. <a href=\"#\">Más información</a></p>\n  <div class=\"cookies__acciones\">\n    <button class=\"cookies__boton\" type=\"button\">Rechazar</button>\n    <button class=\"cookies__boton\" type=\"button\">Aceptar</button>\n  </div>\n</section>",
       "css": ".contenido img { max-width: 100%; height: auto; display: block; }\n.cookies {\n  position: fixed; inset: auto 12px 12px 12px;          /* abajo, con 12 px de margen a los lados */\n  z-index: 400;\n  display: flex; flex-wrap: wrap; align-items: center; gap: 8px 16px;\n  padding: 14px 16px; border-radius: 12px; color: #fff;\n  background: rgb(13 17 23 / 75%);\n  backdrop-filter: blur(8px);                            /* desenfoca lo que hay detrás */\n  box-shadow: 0 8px 24px rgb(0 0 0 / 30%);\n}\n.cookies__titulo { margin: 0; font-size: 1rem; width: 100%; }\n.cookies__texto { margin: 0; flex: 1 1 260px; font-size: 0.9rem; }\n.cookies__texto a { color: #ffb366; }\n.cookies__acciones { display: flex; gap: 8px; }\n.cookies__boton {\n  padding: 8px 16px; border-radius: 6px; font: inherit; font-weight: bold; cursor: pointer;\n  background: #fff; color: #0d1117; border: 0;            /* los dos botones iguales */\n}"
      }
     },
     {
      "tabla": {
       "cabs": [
        "Decisión",
        "Por qué"
       ],
       "filas": [
        [
         "`position: fixed` con `inset: auto 12px 12px 12px`",
         "Pegado abajo, separado de los bordes, sin depender del ancho"
        ],
        [
         "`backdrop-filter: blur()` con fondo semitransparente",
         "Se sigue intuyendo la página detrás pero el texto se lee"
        ],
        [
         "Dos botones con el mismo estilo",
         "La AEPD exige que rechazar sea tan fácil y visible como aceptar"
        ],
        [
         "`flex: 1 1 260px` en el texto",
         "En pantallas anchas, texto y botones en una fila; en estrechas, los botones bajan"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "m9",
    "titulo": "M9 · Indicadores de carga",
    "bloques": [
     {
      "nota": "** Caso real:** mientras llegan los datos, un spinner para acciones cortas y un skeleton (la silueta gris de la tarjeta) para listados, que reduce la sensación de espera.",
      "tipo": "note"
     },
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<div class=\"spinner\" role=\"status\"><span class=\"sr-only\">Cargando…</span></div>\n\n<div class=\"skeleton\" aria-hidden=\"true\">\n  <div class=\"skeleton__imagen\"></div>\n  <div class=\"skeleton__linea\"></div>\n  <div class=\"skeleton__linea skeleton__linea--corta\"></div>\n</div>",
       "css": ".sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }\n\n@keyframes girar { to { rotate: 1turn; } }\n.spinner {\n  width: 40px; height: 40px; margin: 8px 0 20px;\n  border: 4px solid #ffd8b0; border-top-color: #ff8a1f; border-radius: 50%;\n  animation: girar 800ms linear infinite;\n}\n\n@keyframes brillo { to { background-position: -200% 0; } }\n.skeleton { display: grid; gap: 10px; width: 260px; padding: 12px; border: 1px solid #d1d9e0; border-radius: 10px; }\n.skeleton__imagen, .skeleton__linea {\n  border-radius: 6px;\n  background: linear-gradient(90deg, #eceff2 25%, #f8f9fa 50%, #eceff2 75%) 0 0 / 200% 100%;\n  animation: brillo 1.4s ease-in-out infinite;\n}\n.skeleton__imagen { aspect-ratio: 4 / 3; }\n.skeleton__linea { height: 14px; }\n.skeleton__linea--corta { width: 60%; }"
      }
     },
     {
      "sub": "La captura es un fotograma; abre la demo para verlos en movimiento."
     },
     {
      "tabla": {
       "cabs": [
        "Decisión",
        "Por qué"
       ],
       "filas": [
        [
         "Spinner con `border-top-color` distinto",
         "Un solo elemento y un solo `rotate`: ligero"
        ],
        [
         "`role=\"status\"` + texto `.sr-only`",
         "El lector de pantalla anuncia \"Cargando…\""
        ],
        [
         "Skeleton con `aria-hidden=\"true\"`",
         "Es decoración; ya hay un aviso de carga"
        ],
        [
         "Degradado con `background-size: 200%` animado",
         "El \"brillo\" se mueve sin animar el tamaño de nada"
        ],
        [
         "Con `prefers-reduced-motion`",
         "El reset frena estas animaciones a quien lo pida"
        ]
       ]
      }
     },
     {
      "consola": "┌─[ FIN DE TRANSMISIÓN ]─────────────────────────────────────────────────┐\n│  CSS · Baseline oct. 2026 · capturas renderizadas en Chromium          │\n└──────────────────────────────────────────────────────────── SYS.OK ───┘"
     }
    ]
   }
  ],
  "intro": [
   {
    "p": "Cada misión es un componente que encontrarás en webs reales, con nombres **BEM** y **variables**. Las capturas muestran los estados importantes (hover, foco, móvil o escritorio…) y cada una está completa en [`demos/`](demos/) para abrirla y tocarla."
   },
   {
    "tabla": {
     "cabs": [
      "ID",
      "Componente",
      "Practica"
     ],
     "filas": [
      [
       "[M1](@m1)",
       "Tarjeta de producto",
       "BEM, `position`, `aspect-ratio`, `object-fit`, hover"
      ],
      [
       "[M2](@m2)",
       "Barra de navegación responsive",
       "Flexbox, `flex-wrap`, media query, `aria-current`"
      ],
      [
       "[M3](@m3)",
       "Maquetación de página",
       "`grid-template-areas` que cambia con el ancho"
      ],
      [
       "[M4](@m4)",
       "Hero con imagen de fondo",
       "Degradado sobre imagen, `clamp()`, `min-height`"
      ],
      [
       "[M5](@m5)",
       "Tabla de precios con plan destacado",
       "Grid, `subgrid`, modificador BEM, insignia"
      ],
      [
       "[M6](@m6)",
       "Formulario con estados",
       "`:focus-visible`, `:user-invalid`, `:has()`"
      ],
      [
       "[M7](@m7)",
       "Modo oscuro con interruptor sin JS",
       "Variables + `:has(:checked)`"
      ],
      [
       "[M8](@m8)",
       "Banner de cookies",
       "`position: fixed`, `backdrop-filter`"
      ],
      [
       "[M9](@m9)",
       "Indicadores de carga",
       "`@keyframes`, skeleton"
      ]
     ]
    }
   }
  ]
 }
};
  APP.register({ slug: "css", contenido: mods });
})();

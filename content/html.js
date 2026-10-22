/* Contenido de html generado a partir de la chuleta de referencia (scripts/convert.py) y revisado a mano. */
(function () {
  const mods = {
 "mod-02": {
  "resumen": "la base de toda maquetación",
  "secciones": [
   {
    "id": "bl-diferencia",
    "titulo": "La diferencia",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "",
        "**Bloque** (`display: block`)",
        "**En línea** (`display: inline`)"
       ],
       "filas": [
        [
         "Empieza en línea nueva",
         "[[ok]] Sí",
         "[[no]] No: sigue en la misma línea, como una palabra"
        ],
        [
         "Ancho",
         "**Todo el disponible**, aunque el contenido sea corto",
         "**Solo el de su contenido**"
        ],
        [
         "`width` / `height`",
         "[[ok]] Funcionan",
         "[[no]] Se ignoran"
        ],
        [
         "`margin` / `padding` verticales",
         "[[ok]] Empujan a los demás",
         "[[no]] No empujan (el padding se pinta, pero se solapa)"
        ],
        [
         "Puede contener",
         "Bloque y en línea (según el elemento)",
         "Solo en línea (texto)"
        ],
        [
         "Ejemplos",
         "`div`, `p`, `h1`, `ul`, `section`",
         "`span`, `a`, `strong`, `em`, `code`"
        ]
       ]
      }
     },
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<div>Soy un div (bloque)</div>\n<p>Soy un párrafo (bloque). Dentro tengo un <span>span</span>,\n   un <a href=\"#\">enlace</a> y un <strong>strong</strong>: todos en línea.</p>\n<h2>Soy un h2 (bloque)</h2>\n<span>Span 1</span> <span>Span 2</span> <span>Span 3</span>",
       "css": "/* CSS solo para dibujar las cajas: naranja = bloque, azul = en línea */\ndiv, p, h2 { outline: 2px dashed #ff8a1f; }\nspan, a, strong { outline: 2px solid #1f6feb; background: #e7f0ff; }"
      }
     },
     {
      "sub": "Fíjate en que las cajas naranjas ocupan todo el ancho aunque su texto sea corto, y en que los tres `span` del final se colocan uno al lado de otro."
     },
     {
      "p": "**Hay un tercer comportamiento: `inline-block`.** Se coloca en línea (al lado de otros) **pero acepta** `width`, `height`, `margin` y `padding` como un bloque. Así se comportan por defecto los **controles de formulario** (`input`, `button`, `select`, `textarea`). Las **imágenes** son en línea, pero como su contenido viene de fuera (son \"elementos reemplazados\") también aceptan `width` y `height`."
     }
    ]
   },
   {
    "id": "bl-tabla",
    "titulo": "Tabla de elementos por comportamiento",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Por defecto",
        "Elementos"
       ],
       "filas": [
        [
         "**Bloque**",
         "`div` `p` `h1`–`h6` `header` `footer` `main` `nav` `section` `article` `aside` `address` `blockquote` `pre` `hr` `form` `fieldset` `figure` `figcaption` `details` `dialog` `ul` `ol` `dl` `dt` `dd`"
        ],
        [
         "**Bloque especial**",
         "`li` (`list-item`: bloque + viñeta) · `table` (`table`) · `tr`, `td`, `th` (partes de tabla)"
        ],
        [
         "**En línea**",
         "`span` `a` `strong` `em` `b` `i` `u` `s` `mark` `small` `abbr` `cite` `q` `code` `kbd` `samp` `var` `time` `sub` `sup` `br` `label` `data` `del` `ins`"
        ],
        [
         "**En línea, pero aceptan tamaño**",
         "`img` `video` `iframe` `svg` `canvas` (elementos reemplazados)"
        ],
        [
         "**inline-block**",
         "`input` `button` `select` `textarea` `meter` `progress`"
        ],
        [
         "**No se muestran**",
         "`head` `meta` `title` `link` `script` `style` `template` (`display: none`)"
        ]
       ]
      }
     },
     {
      "nota": "Si dudas, inspecciónalo: `F12` → selecciona el elemento → pestaña **Computed** → busca `display`.",
      "tipo": "tip"
     }
    ]
   },
   {
    "id": "bl-anidar",
    "titulo": "Qué puede ir dentro de qué",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Regla",
        "[[ok]] Correcto",
        "[[no]] Incorrecto"
       ],
       "filas": [
        [
         "Un `<p>` solo admite contenido en línea",
         "`<p>Texto <a href=\"#\">enlace</a></p>`",
         "`<p><div>…</div></p>`, `<p><ul>…</ul></p>`, `<p><p>…</p></p>`"
        ],
        [
         "Los títulos `h1`–`h6` solo admiten contenido en línea",
         "`<h2>Ofertas <small>hoy</small></h2>`",
         "`<h2><p>Ofertas</p></h2>`"
        ],
        [
         "Un elemento en línea no envuelve bloques…",
         "`<strong>texto</strong>`",
         "`<span><div>…</div></span>`"
        ],
        [
         "…**excepto `<a>`**, que puede envolver bloques (tarjeta clicable)",
         "`<a href=\"#\"><h3>Título</h3><p>Resumen</p></a>`",
         "—"
        ],
        [
         "Elementos interactivos no se anidan entre sí",
         "`<a href=\"#\">Comprar</a>`",
         "`<a href=\"#\"><button>Comprar</button></a>`, `<a>` dentro de `<a>`"
        ],
        [
         "`ul` y `ol` solo admiten `li` como hijos directos",
         "`<ul><li><a href=\"#\">Inicio</a></li></ul>`",
         "`<ul><a href=\"#\">Inicio</a></ul>`"
        ]
       ]
      }
     },
     {
      "p": "Lo que no está permitido, el navegador lo \"arregla\" a su manera. Con un `div` dentro de un `p`, **cierra el párrafo antes del div** y luego encuentra un `</p>` suelto:"
     },
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<p>Inicio del párrafo\n  <div>Un div dentro del párrafo</div>\n  final del párrafo</p>",
       "css": "p { outline: 2px dashed #ff8a1f; }\ndiv { outline: 2px solid #1f6feb; }"
      }
     },
     {
      "sub": "[[no]] VALIDADOR W3C"
     },
     {
      "consola": "Error: No “p” element in scope but a “p” end tag seen."
     },
     {
      "sub": "El validador dice: \"se ha encontrado un `</p>` de cierre sin ningún `p` abierto\". El navegador cerró el párrafo al ver el `div`, y el resultado tiene **tres** cajas: el párrafo con \"Inicio del párrafo\", el div y un párrafo vacío (la línea discontinua de abajo) creado para el `</p>` suelto. El texto \"final del párrafo\" queda fuera de cualquier párrafo."
     }
    ]
   },
   {
    "id": "bl-maquetar",
    "titulo": "Consecuencias al maquetar",
    "bloques": [
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<span class=\"caja\">span con width: 200px</span>\n<span class=\"caja\">otro span</span>\n<div class=\"caja\">div con width: 200px</div>\n<span class=\"caja ib\">span con inline-block</span>\n<span class=\"caja ib\">otro inline-block</span>",
       "css": ".caja { width: 200px; height: 50px; padding: 10px; margin: 10px;\n        background: #e7f0ff; outline: 2px solid #1f6feb; }\n.ib   { display: inline-block; }"
      }
     },
     {
      "tabla": {
       "cabs": [
        "Lo que ves",
        "Por qué",
        "Arreglo (CSS)"
       ],
       "filas": [
        [
         "El `width` de un `span` o un `a` no hace nada",
         "Son en línea: miden lo que su texto",
         "`display: inline-block` o `block`"
        ],
        [
         "El `margin-top` de un enlace no lo separa de la línea de arriba",
         "Los márgenes verticales de los elementos en línea no empujan",
         "`display: inline-block`"
        ],
        [
         "Un `div` ocupa todo el ancho aunque le sobre espacio",
         "Los bloques se estiran",
         "`width`, `max-width`, o ponerlo en un contenedor flex o grid"
        ],
        [
         "Dos `div` no se ponen uno al lado del otro",
         "Cada bloque empieza en línea nueva",
         "`display: flex` en el padre (chuleta CSS · Flexbox)"
        ],
        [
         "Un hueco de unos px **debajo de una imagen** dentro de una caja",
         "La imagen es en línea y se alinea con la línea base del texto, dejando sitio para las letras con rabito (g, p, y)",
         "`img { display: block; }` (incluido en el reset de la chuleta CSS)"
        ],
        [
         "Un pequeño espacio entre elementos `inline-block`",
         "El salto de línea del código entre ellos cuenta como un espacio",
         "Usar flex en el padre con `gap`"
        ],
        [
         "`text-align: center` no centra un `div`",
         "`text-align` centra el contenido **en línea** de dentro",
         "Para centrar un bloque: `margin-inline: auto` con un `width`, o flex"
        ]
       ]
      }
     },
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<div class=\"marco\"><img src=\"recursos/avatar.svg\" alt=\"\" width=\"80\" height=\"80\"> imagen en línea</div>\n<div class=\"marco\"><img class=\"bloque\" src=\"recursos/avatar.svg\" alt=\"\" width=\"80\" height=\"80\"></div>",
       "css": ".marco { border: 2px solid #ff8a1f; margin-bottom: 12px; width: 260px; }\n.bloque { display: block; }"
      }
     },
     {
      "sub": "En la primera caja hay un hueco entre la imagen y el borde inferior; en la segunda (`display: block`) desaparece."
     }
    ]
   },
   {
    "id": "bl-div-span",
    "titulo": "div y span: los \"comodines\"",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "",
        "`<div>`",
        "`<span>`"
       ],
       "filas": [
        [
         "Comportamiento",
         "Bloque",
         "En línea"
        ],
        [
         "Significado",
         "**Ninguno**: solo agrupa",
         "**Ninguno**: solo marca un trozo de texto"
        ],
        [
         "Úsalo para",
         "Agrupar elementos y darles estilo o disposición (contenedores flex o grid, envoltorios)",
         "Dar estilo a una parte de un texto (`<span class=\"precio\">`)"
        ],
        [
         "No lo uses si…",
         "Existe un elemento con significado: `header`, `nav`, `section`, `article`… → [MOD.08](@mod-08)",
         "Existe uno con significado: `strong`, `em`, `time`, `abbr`… → [MOD.03](@mod-03)"
        ]
       ]
      }
     }
    ]
   }
  ],
  "intro": [
   {
    "p": "Todo elemento HTML tiene una forma de colocarse por defecto. Entender esto es el **80 % de maquetar**: explica por qué un `width` \"no hace nada\", por qué dos elementos no se ponen al lado o por qué sale un hueco debajo de una imagen."
   }
  ]
 },
 "mod-03": {
  "resumen": "títulos · párrafos · énfasis · citas · código",
  "secciones": [
   {
    "id": "titulos",
    "titulo": "Títulos h1 – h6",
    "bloques": [
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<h1>h1 · Título de la página</h1>\n<h2>h2 · Sección</h2>\n<h3>h3 · Subsección</h3>\n<h4>h4 · Apartado</h4>\n<h5>h5 · Poco habitual</h5>\n<h6>h6 · Casi nunca</h6>"
      }
     },
     {
      "tabla": {
       "cabs": [
        "Regla",
        "Por qué"
       ],
       "filas": [
        [
         "**Un solo `h1` por página**, con el tema principal",
         "Es lo que Google y los lectores de pantalla toman como título"
        ],
        [
         "**No saltar niveles** (`h2` → `h4`)",
         "Quien navega con lector de pantalla salta de título en título: un salto parece que le falta contenido"
        ],
        [
         "Elegir el nivel por **jerarquía**, no por tamaño",
         "El tamaño se cambia con CSS. Si quieres un `h2` pequeño, sigue siendo `h2`"
        ],
        [
         "No usar títulos para destacar texto",
         "Para eso está `<strong>`"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "parrafos",
    "titulo": "Párrafos, saltos y separadores",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Elemento",
        "Uso",
        "No lo uses para"
       ],
       "filas": [
        [
         "`<p>`",
         "Párrafo de texto",
         "Separar con párrafos vacíos (`<p></p>`): eso es CSS (`margin`)"
        ],
        [
         "`<br>`",
         "Salto de línea **dentro** de un mismo bloque: direcciones, poemas",
         "Separar bloques (`<br><br>`)"
        ],
        [
         "`<hr>`",
         "Cambio de tema entre párrafos (una pausa)",
         "Dibujar una línea decorativa: eso es `border` en CSS"
        ]
       ]
      }
     },
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<address>\n  Tienda DAW<br>\n  C/ Mayor, 10<br>\n  28013 Madrid\n</address>\n<hr>\n<p>Horario: de lunes a sábado, de 10:00 a 20:00.</p>"
      }
     }
    ]
   },
   {
    "id": "enfasis",
    "titulo": "Énfasis: strong / em frente a b / i",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Elemento",
        "Significado",
        "Se ve (por defecto)"
       ],
       "filas": [
        [
         "`<strong>`",
         "**Importancia**: avisos, lo que no se debe pasar por alto",
         "Negrita"
        ],
        [
         "`<em>`",
         "**Énfasis** que cambia el sentido de la frase (se pronuncia distinto)",
         "Cursiva"
        ],
        [
         "`<b>`",
         "Llamar la atención **sin** más importancia: palabras clave, nombres de producto",
         "Negrita"
        ],
        [
         "`<i>`",
         "Voz o tono distinto: términos técnicos, palabras extranjeras, pensamientos",
         "Cursiva"
        ],
        [
         "`<mark>`",
         "Resaltado por relevancia: el término buscado",
         "Fondo amarillo"
        ],
        [
         "`<small>`",
         "Letra pequeña: avisos legales, copyright",
         "Más pequeño"
        ],
        [
         "`<s>`",
         "Ya no es correcto o válido: precio anterior",
         "Tachado"
        ]
       ]
      }
     },
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<p><strong>Atención:</strong> la oferta termina hoy.</p>\n<p>No es que <em>no quiera</em> ir, es que no puedo.</p>\n<p>El <b>Keychron K2</b> incluye un <i lang=\"en\">keycap puller</i>.</p>\n<p>Resultados para <mark>teclado</mark>.</p>\n<p>Antes <s>89,99 €</s> ahora 69,99 € <small>IVA incluido</small></p>"
      }
     },
     {
      "nota": "La pregunta es: ¿la palabra es **más importante** (`strong`), se **pronuncia distinto** (`em`) o solo **se ve distinta** (`b`, `i`)? Los lectores de pantalla pueden tratar `strong` y `em` de forma especial; `b` e `i`, no.",
      "tipo": "tip"
     }
    ]
   },
   {
    "id": "texto-otros",
    "titulo": "Otros elementos de texto",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Elemento",
        "Para qué",
        "Ejemplo"
       ],
       "filas": [
        [
         "`<abbr title=\"…\">`",
         "Abreviatura con su significado (aparece al pasar el ratón)",
         "`<abbr title=\"Desarrollo de Aplicaciones Web\">DAW</abbr>`"
        ],
        [
         "`<time datetime=\"…\">`",
         "Fecha u hora legible por máquinas (buscadores, calendarios)",
         "`<time datetime=\"2026-10-03\">3 de octubre</time>`"
        ],
        [
         "`<sub>` / `<sup>`",
         "Subíndice / superíndice",
         "`H<sub>2</sub>O`, `m<sup>2</sup>`, `1<sup>er</sup>`"
        ],
        [
         "`<del>` / `<ins>`",
         "Texto eliminado / añadido en una revisión",
         "Control de cambios"
        ],
        [
         "`<data value=\"…\">`",
         "Valor para máquinas junto a un texto para personas",
         "`<data value=\"8423\">Teclado K2</data>`"
        ],
        [
         "`<dfn>`",
         "Término que se define en esa frase",
         "`<dfn>HTML</dfn> es un lenguaje de marcas…`"
        ]
       ]
      }
     },
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<p>Estudio <abbr title=\"Desarrollo de Aplicaciones Web\">DAW</abbr> desde el\n   <time datetime=\"2026-09-15\">15 de septiembre</time>.</p>\n<p>Fórmula del agua: H<sub>2</sub>O · Superficie: 85 m<sup>2</sup></p>\n<p>Entrega: <del>viernes</del> <ins>lunes</ins></p>"
      }
     }
    ]
   },
   {
    "id": "citas-codigo",
    "titulo": "Citas y código",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Elemento",
        "Para qué"
       ],
       "filas": [
        [
         "`<blockquote cite=\"url\">`",
         "Cita larga en bloque"
        ],
        [
         "`<q>`",
         "Cita corta dentro de una frase (añade comillas solo)"
        ],
        [
         "`<cite>`",
         "**Título** de una obra: libro, película, canción, web"
        ],
        [
         "`<code>`",
         "Código dentro de una frase"
        ],
        [
         "`<pre>`",
         "Texto preformateado: respeta espacios y saltos. Para bloques de código: `<pre><code>…</code></pre>`"
        ],
        [
         "`<kbd>`",
         "Tecla o combinación de teclas"
        ],
        [
         "`<samp>`",
         "Salida de un programa"
        ]
       ]
      }
     },
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<blockquote cite=\"https://developer.mozilla.org/\">\n  <p>HTML es el componente más básico de la Web.</p>\n</blockquote>\n<p>Como dice <cite>MDN Web Docs</cite>: <q>usa siempre el elemento adecuado</q>.</p>\n<p>Guarda con <kbd>Ctrl</kbd> + <kbd>S</kbd> y escribe <code>git status</code>.</p>\n<pre><code>for (int i = 0; i &lt; 3; i++) {\n    System.out.println(i);\n}</code></pre>"
      }
     }
    ]
   }
  ]
 },
 "mod-04": {
  "resumen": "href · rutas relativas · anclas · mailto",
  "secciones": [
   {
    "id": "enlace",
    "titulo": "Anatomía de un enlace",
    "bloques": [
     {
      "code": "<a href=\"destino\" title=\"info extra (opcional)\">texto del enlace</a>",
      "lang": "html"
     },
     {
      "nota": "El **texto del enlace debe decir adónde lleva**: \"Ver condiciones de envío\" y no \"pincha aquí\". Los lectores de pantalla pueden listar todos los enlaces de la página: una lista de diez \"aquí\" no sirve para nada.",
      "tipo": "important"
     }
    ]
   },
   {
    "id": "rutas",
    "titulo": "Rutas",
    "bloques": [
     {
      "p": "Estructura de ejemplo:"
     },
     {
      "consola": "mi-web/\n├── index.html\n├── contacto.html\n├── css/\n│   └── estilos.css\n├── img/\n│   └── logo.svg\n└── productos/\n    ├── index.html\n    └── teclado.html          ← estamos aquí"
     },
     {
      "tabla": {
       "cabs": [
        "Desde `productos/teclado.html` quiero ir a…",
        "Ruta",
        "Tipo"
       ],
       "filas": [
        [
         "`productos/index.html` (misma carpeta)",
         "`index.html`",
         "Relativa"
        ],
        [
         "`contacto.html` (carpeta de arriba)",
         "`../contacto.html`",
         "Relativa (`../` = subir una carpeta)"
        ],
        [
         "`img/logo.svg`",
         "`../img/logo.svg`",
         "Relativa"
        ],
        [
         "`contacto.html` desde la raíz del sitio",
         "`/contacto.html`",
         "Relativa a la raíz (solo funciona con servidor, no abriendo el archivo con doble clic)"
        ],
        [
         "Otra web",
         "`https://developer.mozilla.org/`",
         "Absoluta"
        ]
       ]
      }
     },
     {
      "aviso": "- Windows no distingue mayúsculas en los nombres de archivo, **pero los servidores Linux sí**: `Logo.svg` y `logo.svg` son archivos distintos. Nombres en minúsculas, sin espacios ni tildes: `foto-equipo.jpg`. - Las barras son siempre `/` (nunca `\\`), también en Windows.",
      "tipo": "warning"
     }
    ]
   },
   {
    "id": "enlace-tipos",
    "titulo": "Tipos de enlace",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Para…",
        "`href`",
        "Ejemplo"
       ],
       "filas": [
        [
         "Otra página",
         "Ruta",
         "`<a href=\"contacto.html\">Contacto</a>`"
        ],
        [
         "Una sección de la misma página",
         "`#id`",
         "`<a href=\"#precios\">Ver precios</a>` → va a `<section id=\"precios\">`"
        ],
        [
         "Una sección de otra página",
         "`pagina.html#id`",
         "`<a href=\"faq.html#envios\">Envíos</a>`"
        ],
        [
         "Volver arriba",
         "`#` o `#top`",
         "`<a href=\"#\">Subir</a>`"
        ],
        [
         "Enviar un email",
         "`mailto:`",
         "`<a href=\"mailto:info@tienda.es?subject=Consulta\">info@tienda.es</a>`"
        ],
        [
         "Llamar (móvil)",
         "`tel:`",
         "`<a href=\"tel:+34910000000\">910 000 000</a>`"
        ],
        [
         "Descargar un archivo",
         "`download`",
         "`<a href=\"docs/catalogo.pdf\" download>Catálogo (PDF, 2 MB)</a>`"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "nueva-pestana",
    "titulo": "Abrir en una pestaña nueva",
    "bloques": [
     {
      "code": "<a href=\"https://www.boe.es/\" target=\"_blank\" rel=\"noopener\">BOE (se abre en una pestaña nueva)</a>",
      "lang": "html"
     },
     {
      "lista": [
       "Úsalo **solo** cuando salir de la página haga perder algo al usuario (un formulario a medias, un vídeo). Por defecto, deja que el usuario decida.",
       "`rel=\"noopener\"` impide que la página abierta pueda controlar la tuya. Los navegadores actuales ya lo aplican solos, pero ponerlo no cuesta nada.",
       "Avisa en el texto de que se abre en una pestaña nueva (accesibilidad)."
      ]
     },
     {
      "tabla": {
       "cabs": [
        "Valor de `rel`",
        "Significa"
       ],
       "filas": [
        [
         "`noopener`",
         "La página destino no puede acceder a la tuya"
        ],
        [
         "`noreferrer`",
         "No envía desde qué página viene el usuario"
        ],
        [
         "`nofollow`",
         "Pide a los buscadores que no sigan el enlace (enlaces de usuarios, publicidad)"
        ]
       ]
      }
     }
    ]
   }
  ]
 },
 "mod-05": {
  "resumen": "img · alt · figure · picture · video · iframe",
  "secciones": [
   {
    "id": "img",
    "titulo": "img",
    "bloques": [
     {
      "code": "<img src=\"img/auriculares.webp\" alt=\"Auriculares inalámbricos negros con estuche\"\n     width=\"400\" height=\"300\" loading=\"lazy\">",
      "lang": "html"
     },
     {
      "tabla": {
       "cabs": [
        "Atributo",
        "Para qué"
       ],
       "filas": [
        [
         "`src`",
         "Ruta de la imagen (obligatorio)"
        ],
        [
         "`alt`",
         "Texto alternativo (obligatorio) → [cómo escribirlo](@alt)"
        ],
        [
         "`width` / `height`",
         "Tamaño **original** en px, sin unidad. El navegador reserva el hueco antes de que cargue y la página no \"salta\""
        ],
        [
         "`loading=\"lazy\"`",
         "No descarga la imagen hasta que el usuario se acerca a ella. **No** en la imagen principal de arriba"
        ],
        [
         "`decoding=\"async\"`",
         "Decodifica sin bloquear el resto de la página"
        ]
       ]
      }
     },
     {
      "nota": "Pon siempre `width` y `height` con el tamaño real del archivo, **aunque luego la cambies de tamaño con CSS** (`max-width: 100%; height: auto;`). Solo sirven para que el navegador conozca la proporción.",
      "tipo": "tip"
     }
    ]
   },
   {
    "id": "alt",
    "titulo": "Cómo escribir el alt",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Tipo de imagen",
        "`alt`",
        "Ejemplo"
       ],
       "filas": [
        [
         "**Informativa** (aporta contenido)",
         "Describe lo que importa",
         "`alt=\"Gráfico: las ventas suben un 30 % en 2026\"`"
        ],
        [
         "**Decorativa** (adorno)",
         "**Vacío**: `alt=\"\"` (pero el atributo debe estar)",
         "Una línea ondulada, un fondo"
        ],
        [
         "**Funcional** (es un enlace o botón)",
         "Lo que hace o adónde lleva",
         "Logo enlazado: `alt=\"Tienda DAW, ir al inicio\"`"
        ],
        [
         "**Con texto** dentro",
         "El texto",
         "Un banner con \"Rebajas -50 %\" → `alt=\"Rebajas: 50 % de descuento\"`"
        ]
       ]
      }
     },
     {
      "p": "[[no]] No empieces por \"imagen de…\" (el lector ya dice que es una imagen) y no repitas el texto que tiene al lado."
     }
    ]
   },
   {
    "id": "figure",
    "titulo": "figure y figcaption",
    "bloques": [
     {
      "p": "Para imágenes (o gráficos, código, citas) con un **pie de foto**."
     },
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<figure>\n  <img src=\"recursos/paisaje.svg\" alt=\"Montañas al atardecer con el sol bajo\"\n       width=\"300\" height=\"150\">\n  <figcaption>Fig. 1 · Sierra de Guadarrama al atardecer.</figcaption>\n</figure>"
      }
     }
    ]
   },
   {
    "id": "formatos",
    "titulo": "¿Qué formato elijo?",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Formato",
        "Para",
        "Transparencia",
        "Animación",
        "Nota"
       ],
       "filas": [
        [
         "**WebP**",
         "Fotos e imágenes generales",
         "[[ok]]",
         "[[ok]]",
         "Pesa un 25-35 % menos que JPG con calidad similar. Opción por defecto hoy"
        ],
        [
         "**AVIF**",
         "Fotos (máxima compresión)",
         "[[ok]]",
         "[[ok]]",
         "Aún más ligero que WebP; tarda más en generarse"
        ],
        [
         "**JPG**",
         "Fotos (compatibilidad total)",
         "[[no]]",
         "[[no]]",
         "Respaldo clásico"
        ],
        [
         "**PNG**",
         "Capturas, imágenes con texto, transparencias",
         "[[ok]]",
         "[[no]]",
         "Sin pérdida: pesa mucho en fotos"
        ],
        [
         "**SVG**",
         "Logos, iconos, ilustraciones planas",
         "[[ok]]",
         "[[ok]]",
         "Vectorial: se ve nítido a cualquier tamaño. Se puede incrustar y colorear con CSS"
        ],
        [
         "**GIF**",
         "—",
         "[[ok]]",
         "[[ok]]",
         "Obsoleto: para animaciones, mejor un vídeo `<video autoplay muted loop>`"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "img-responsive",
    "titulo": "Imágenes responsive",
    "bloques": [
     {
      "p": "**Misma imagen en varios tamaños** (el navegador elige según la pantalla):"
     },
     {
      "code": "<img src=\"img/foto-800.webp\"\n     srcset=\"img/foto-400.webp 400w, img/foto-800.webp 800w, img/foto-1600.webp 1600w\"\n     sizes=\"(max-width: 600px) 100vw, 50vw\"\n     alt=\"Equipo de la tienda en el almacén\" width=\"800\" height=\"533\">",
      "lang": "html"
     },
     {
      "sub": "`srcset` lista los archivos con su ancho real (`400w`); `sizes` dice qué ancho ocupará la imagen en pantalla (100 % del ancho en móvil, la mitad en el resto)."
     },
     {
      "p": "**Imagen distinta o formato moderno con respaldo** (`picture`):"
     },
     {
      "code": "<picture>\n  <source srcset=\"img/hero.avif\" type=\"image/avif\">       <!-- si lo soporta, usa AVIF -->\n  <source srcset=\"img/hero.webp\" type=\"image/webp\">       <!-- si no, WebP -->\n  <img src=\"img/hero.jpg\" alt=\"Escaparate de la tienda\" width=\"1200\" height=\"600\">  <!-- respaldo -->\n</picture>",
      "lang": "html"
     }
    ]
   },
   {
    "id": "audio-video",
    "titulo": "Audio y vídeo",
    "bloques": [
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<video controls width=\"360\" height=\"180\" poster=\"recursos/paisaje.svg\" preload=\"metadata\">\n  <source src=\"video/presentacion.webm\" type=\"video/webm\">\n  <source src=\"video/presentacion.mp4\" type=\"video/mp4\">\n  <track kind=\"subtitles\" src=\"video/subtitulos-es.vtt\" srclang=\"es\" label=\"Español\" default>\n  Tu navegador no puede reproducir este vídeo. <a href=\"video/presentacion.mp4\">Descárgalo</a>.\n</video>\n<audio controls src=\"audio/podcast.mp3\"></audio>"
      }
     },
     {
      "tabla": {
       "cabs": [
        "Atributo",
        "Hace"
       ],
       "filas": [
        [
         "`controls`",
         "Muestra los controles (sin él no hay botón de play)"
        ],
        [
         "`poster`",
         "Imagen mientras no se reproduce"
        ],
        [
         "`autoplay`",
         "Reproduce sola. Los navegadores **solo lo permiten si también lleva `muted`**"
        ],
        [
         "`muted` / `loop`",
         "Sin sonido / en bucle"
        ],
        [
         "`playsinline`",
         "En iPhone, no abrir a pantalla completa"
        ],
        [
         "`preload`",
         "`none` (no descargar), `metadata` (solo duración), `auto`"
        ],
        [
         "`<track>`",
         "Subtítulos en formato `.vtt`"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "iframe",
    "titulo": "iframe: incrustar otra página",
    "bloques": [
     {
      "code": "<!-- Mapa (OpenStreetMap → Compartir → HTML) o Google Maps → Compartir → Insertar un mapa -->\n<iframe src=\"https://www.openstreetmap.org/export/embed.html?bbox=-3.71,40.41,-3.69,40.42&amp;layer=mapnik\"\n        title=\"Mapa de la ubicación de la tienda\" width=\"600\" height=\"300\" loading=\"lazy\"></iframe>\n\n<!-- Vídeo de YouTube → Compartir → Insertar -->\n<iframe src=\"https://www.youtube-nocookie.com/embed/ID_DEL_VIDEO\" title=\"Vídeo: cómo montar el teclado\"\n        width=\"560\" height=\"315\" allowfullscreen loading=\"lazy\"></iframe>",
      "lang": "html"
     },
     {
      "lista": [
       "`title` es **obligatorio** en la práctica: el lector de pantalla lo anuncia.",
       "`youtube-nocookie.com` evita cookies de seguimiento hasta que se reproduce.",
       "Dentro de una URL en HTML, el `&` se escribe `&amp;`."
      ]
     }
    ]
   }
  ]
 },
 "mod-06": {
  "resumen": "ul · ol · li · dl · menús",
  "secciones": [
   {
    "id": "ul-ol",
    "titulo": "ul y ol",
    "bloques": [
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<h3>Ingredientes (sin orden)</h3>\n<ul>\n  <li>200 g de harina</li>\n  <li>2 huevos</li>\n</ul>\n<h3>Pasos (el orden importa)</h3>\n<ol>\n  <li>Precalentar el horno.</li>\n  <li>Mezclar los ingredientes.</li>\n</ol>\n<h3>Top 3 (cuenta atrás)</h3>\n<ol reversed>\n  <li>Bronce</li>\n  <li>Plata</li>\n  <li>Oro</li>\n</ol>"
      }
     },
     {
      "tabla": {
       "cabs": [
        "Atributo de `<ol>`",
        "Hace"
       ],
       "filas": [
        [
         "`start=\"5\"`",
         "Empieza en 5"
        ],
        [
         "`reversed`",
         "Cuenta hacia atrás"
        ],
        [
         "`type=\"a\"` / `\"A\"` / `\"i\"` / `\"I\"`",
         "Letras o números romanos (mejor con CSS: `list-style-type`)"
        ],
        [
         "`<li value=\"10\">`",
         "Fuerza el número de un elemento"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "listas-anidadas",
    "titulo": "Listas anidadas",
    "bloques": [
     {
      "p": "La sublista va **dentro del `<li>`**, no entre dos `<li>`:"
     },
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<ul>\n  <li>Hardware\n    <ul>\n      <li>Teclados</li>\n      <li>Ratones</li>\n    </ul>\n  </li>\n  <li>Software</li>\n</ul>"
      }
     }
    ]
   },
   {
    "id": "dl",
    "titulo": "dl: lista de descripciones",
    "bloques": [
     {
      "p": "Pares **término → descripción**: glosarios, fichas técnicas, preguntas y respuestas."
     },
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<dl>\n  <dt>Conexión</dt>\n  <dd>Bluetooth 5.1 y USB-C</dd>\n  <dt>Batería</dt>\n  <dd>Hasta 72 horas</dd>\n  <dt>Peso</dt>\n  <dd>663 g</dd>\n</dl>"
      }
     }
    ]
   },
   {
    "id": "menu-lista",
    "titulo": "Menú de navegación como lista",
    "bloques": [
     {
      "p": "Un menú **es** una lista de enlaces. La viñeta y la disposición vertical se quitan después con CSS."
     },
     {
      "code": "<nav aria-label=\"Principal\">\n  <ul>\n    <li><a href=\"index.html\" aria-current=\"page\">Inicio</a></li>\n    <li><a href=\"productos.html\">Productos</a></li>\n    <li><a href=\"contacto.html\">Contacto</a></li>\n  </ul>\n</nav>",
      "lang": "html"
     },
     {
      "sub": "`aria-current=\"page\"` marca la página actual para los lectores de pantalla y sirve de \"gancho\" para resaltarla con CSS: `[aria-current=\"page\"] { … }`."
     }
    ]
   }
  ]
 },
 "mod-07": {
  "resumen": "caption · thead · tbody · th · colspan",
  "secciones": [
   {
    "id": "tabla-estructura",
    "titulo": "Estructura",
    "bloques": [
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<table>\n  <caption>Pedidos de septiembre</caption>\n  <thead>\n    <tr>\n      <th scope=\"col\">Pedido</th>\n      <th scope=\"col\">Cliente</th>\n      <th scope=\"col\">Importe</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th scope=\"row\">#1024</th>\n      <td>Lucía Fernández</td>\n      <td>748,00 €</td>\n    </tr>\n    <tr>\n      <th scope=\"row\">#1025</th>\n      <td>Marcos Ruiz</td>\n      <td>180,99 €</td>\n    </tr>\n  </tbody>\n  <tfoot>\n    <tr>\n      <th scope=\"row\" colspan=\"2\">Total</th>\n      <td>928,99 €</td>\n    </tr>\n  </tfoot>\n</table>",
       "css": "/* Sin CSS la tabla no tiene bordes: esto es solo para verla */\ntable { border-collapse: collapse; }\nth, td { border: 1px solid #999; padding: 4px 10px; }"
      }
     },
     {
      "tabla": {
       "cabs": [
        "Elemento",
        "Qué es"
       ],
       "filas": [
        [
         "`<table>`",
         "La tabla"
        ],
        [
         "`<caption>`",
         "Título de la tabla (primer hijo)"
        ],
        [
         "`<thead>` / `<tbody>` / `<tfoot>`",
         "Cabecera / cuerpo / pie"
        ],
        [
         "`<tr>`",
         "Fila (table row)"
        ],
        [
         "`<th>`",
         "Celda de **cabecera** (negrita y centrada por defecto)"
        ],
        [
         "`<td>`",
         "Celda de **datos**"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "tabla-span",
    "titulo": "colspan y rowspan: fusionar celdas",
    "bloques": [
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<table>\n  <caption>Horario · 1.º DAW</caption>\n  <thead>\n    <tr><th scope=\"col\">Hora</th><th scope=\"col\">Lunes</th><th scope=\"col\">Martes</th></tr>\n  </thead>\n  <tbody>\n    <tr><th scope=\"row\">15:00</th><td rowspan=\"2\">Programación</td><td>Bases de datos</td></tr>\n    <tr><th scope=\"row\">16:00</th><td>Lenguajes de marcas</td></tr>\n    <tr><th scope=\"row\">17:00</th><td colspan=\"2\">Recreo</td></tr>\n  </tbody>\n</table>",
       "css": "table { border-collapse: collapse; }\nth, td { border: 1px solid #999; padding: 4px 10px; }"
      }
     },
     {
      "sub": "`rowspan=\"2\"` ocupa 2 filas hacia abajo (la fila siguiente tiene una celda menos). `colspan=\"2\"` ocupa 2 columnas a la derecha."
     }
    ]
   },
   {
    "id": "tabla-accesible",
    "titulo": "Tablas accesibles",
    "bloques": [
     {
      "lista": [
       "`<caption>` dice de qué trata la tabla.",
       "`<th scope=\"col\">` en cabeceras de columna y `scope=\"row\"` en cabeceras de fila: el lector de pantalla anuncia \"Martes, 16:00: Lenguajes de marcas\".",
       "Nada de celdas vacías para dar espacio ni de tablas dentro de tablas."
      ]
     }
    ]
   },
   {
    "id": "tabla-cuando",
    "titulo": "¿Cuándo usar una tabla?",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "[[ok]] Sí: datos tabulares",
        "[[no]] No: maquetar"
       ],
       "filas": [
        [
         "Horarios, precios por plan, resultados, comparativas, listados de pedidos",
         "Poner columnas de texto, colocar un formulario, el diseño de la página"
        ],
        [
         "Pregunta: ¿tiene sentido leerla por **filas y columnas** con cabeceras?",
         "Para disposición se usa CSS: Flexbox o Grid"
        ]
       ]
      }
     }
    ]
   }
  ]
 },
 "mod-08": {
  "resumen": "header · nav · main · article · section · aside · footer",
  "secciones": [
   {
    "id": "sem-esqueleto",
    "titulo": "Esqueleto de una página típica",
    "bloques": [
     {
      "consola": "┌──────────────────────────── <body> ─────────────────────────────┐\n│ ┌──────────────────────── <header> ───────────────────────────┐ │\n│ │  logo                  ┌────────── <nav> ─────────────┐     │ │\n│ │                        │  Inicio · Productos · Blog   │     │ │\n│ │                        └──────────────────────────────┘     │ │\n│ └─────────────────────────────────────────────────────────────┘ │\n│ ┌────────────────── <main> ───────────────────┐ ┌── <aside> ──┐ │\n│ │  <h1>                                       │ │ relacionado │ │\n│ │  ┌─────────── <section> ─────────────────┐  │ │ publicidad  │ │\n│ │  │ <h2>  ┌<article>┐ ┌<article>┐         │  │ │ filtros     │ │\n│ │  │       │ tarjeta │ │ tarjeta │         │  │ │             │ │\n│ │  │       └─────────┘ └─────────┘         │  │ │             │ │\n│ │  └───────────────────────────────────────┘  │ │             │ │\n│ └─────────────────────────────────────────────┘ └─────────────┘ │\n│ ┌──────────────────────── <footer> ───────────────────────────┐ │\n│ │  © 2026 · <address> contacto · enlaces legales              │ │\n│ └─────────────────────────────────────────────────────────────┘ │\n└─────────────────────────────────────────────────────────────────┘"
     },
     {
      "code": "<body>\n  <header>\n    <a href=\"index.html\"><img src=\"img/logo.svg\" alt=\"Tienda DAW, ir al inicio\" width=\"160\" height=\"40\"></a>\n    <nav aria-label=\"Principal\">\n      <ul>…</ul>\n    </nav>\n  </header>\n\n  <main>\n    <h1>Teclados mecánicos</h1>\n    <section aria-labelledby=\"destacados\">\n      <h2 id=\"destacados\">Destacados</h2>\n      <article>…</article>\n      <article>…</article>\n    </section>\n  </main>\n\n  <aside aria-label=\"Filtros\">…</aside>\n\n  <footer>\n    <p><small>© 2026 Tienda DAW</small></p>\n  </footer>\n</body>",
      "lang": "html"
     }
    ]
   },
   {
    "id": "sem-elementos",
    "titulo": "Elementos",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Elemento",
        "Qué es",
        "Cuántos",
        "Ejemplo"
       ],
       "filas": [
        [
         "`<header>`",
         "Cabecera de la página **o** de una sección o artículo",
         "Varios",
         "Logo + navegación; título + autor de un artículo"
        ],
        [
         "`<nav>`",
         "Bloque de navegación **principal**",
         "Varios (con `aria-label` distinto)",
         "Menú principal, migas de pan, índice"
        ],
        [
         "`<main>`",
         "Contenido principal y único de la página",
         "**Uno** (visible)",
         "Todo lo que no se repite en otras páginas"
        ],
        [
         "`<section>`",
         "Sección temática **con título**",
         "Varios",
         "\"Destacados\", \"Opiniones\", \"Preguntas frecuentes\""
        ],
        [
         "`<article>`",
         "Contenido **independiente** que tendría sentido fuera de la página",
         "Varios",
         "Entrada de blog, tarjeta de producto, comentario, noticia"
        ],
        [
         "`<aside>`",
         "Contenido **relacionado pero secundario**",
         "Varios",
         "Barra lateral, \"te puede interesar\", nota al margen"
        ],
        [
         "`<footer>`",
         "Pie de la página o de una sección o artículo",
         "Varios",
         "Copyright, enlaces legales; fecha y etiquetas de un artículo"
        ],
        [
         "`<address>`",
         "Datos de **contacto** del autor o del sitio",
         "—",
         "Email, teléfono, dirección"
        ],
        [
         "`<search>`",
         "Zona de búsqueda o filtrado ([[ok]] Disponible en todos (desde 2023))",
         "—",
         "El buscador de la cabecera"
        ],
        [
         "`<hgroup>`",
         "Título + subtítulo",
         "—",
         "`<hgroup><h1>Título</h1><p>Subtítulo</p></hgroup>`"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "sem-elegir",
    "titulo": "¿article, section o div?",
    "bloques": [
     {
      "consola": "¿Tendría sentido solo, fuera de esta página? (en un RSS, compartido)\n ├─ Sí ─────────────────────────────────────────► <article>\n └─ No\n     ¿Es una parte temática con su propio título?\n      ├─ Sí ─────────────────────────────────────► <section>\n      └─ No, solo agrupo para dar estilo ────────► <div>"
     },
     {
      "tabla": {
       "cabs": [
        "Caso",
        "Elemento"
       ],
       "filas": [
        [
         "Tarjeta de producto en un listado",
         "`article`"
        ],
        [
         "Entrada de blog completa",
         "`article` (con sus `section` si es larga)"
        ],
        [
         "Bloque \"Opiniones de clientes\"",
         "`section` con `h2`, y cada opinión un `article`"
        ],
        [
         "Contenedor para centrar el contenido a 1200 px",
         "`div`"
        ],
        [
         "Columna izquierda de una rejilla",
         "`div`"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "landmarks",
    "titulo": "Landmarks: el \"mapa\" para lectores de pantalla",
    "bloques": [
     {
      "p": "Algunos elementos crean **regiones** a las que se puede saltar directamente con el lector de pantalla:"
     },
     {
      "tabla": {
       "cabs": [
        "Elemento",
        "Región (rol)",
        "Condición"
       ],
       "filas": [
        [
         "`<header>`",
         "`banner`",
         "Solo si es hijo directo de `body` (no dentro de `article` o `section`)"
        ],
        [
         "`<nav>`",
         "`navigation`",
         "Siempre"
        ],
        [
         "`<main>`",
         "`main`",
         "Siempre"
        ],
        [
         "`<aside>`",
         "`complementary`",
         "Siempre"
        ],
        [
         "`<footer>`",
         "`contentinfo`",
         "Solo si es hijo directo de `body`"
        ],
        [
         "`<section>`",
         "`region`",
         "Solo si tiene nombre accesible (`aria-labelledby` o `aria-label`)"
        ],
        [
         "`<form>`",
         "`form`",
         "Solo si tiene nombre accesible"
        ],
        [
         "`<search>`",
         "`search`",
         "Siempre"
        ]
       ]
      }
     },
     {
      "sub": "Si hay dos `nav`, distínguelos: `<nav aria-label=\"Principal\">` y `<nav aria-label=\"Pie de página\">`."
     }
    ]
   }
  ],
  "intro": [
   {
    "p": "**Semántica** = usar el elemento que describe **qué es** el contenido, no cómo se ve. Un `<nav>` y un `<div>` se ven igual, pero el `<nav>` le dice al navegador, a Google y al lector de pantalla \"esto es la navegación\"."
   }
  ]
 },
 "mod-09": {
  "resumen": "form · label · input · select · validación",
  "secciones": [
   {
    "id": "form",
    "titulo": "form",
    "bloques": [
     {
      "code": "<form action=\"/procesar-registro\" method=\"post\">\n  …controles…\n  <button type=\"submit\">Enviar</button>\n</form>",
      "lang": "html"
     },
     {
      "tabla": {
       "cabs": [
        "Atributo",
        "Qué hace"
       ],
       "filas": [
        [
         "`action`",
         "URL que recibe los datos. Sin él, se envían a la misma página"
        ],
        [
         "`method=\"get\"`",
         "Datos **en la URL** (`?q=teclado&orden=precio`). Para **buscar y filtrar**: se puede guardar como favorito o compartir"
        ],
        [
         "`method=\"post\"`",
         "Datos **en el cuerpo** de la petición, no visibles en la URL. Para **crear o modificar**: registros, pedidos, contraseñas"
        ],
        [
         "`novalidate`",
         "Desactiva la validación del navegador (útil para probar la validación del servidor)"
        ],
        [
         "`autocomplete=\"off\"`",
         "Pide no autocompletar (los navegadores pueden ignorarlo en campos de login)"
        ]
       ]
      }
     },
     {
      "nota": "Solo se envían los controles que tienen **`name`**. El `name` es la \"clave\" del dato que llega al servidor (`email=ana@correo.com`); el `id` es para el `label` y el CSS.",
      "tipo": "important"
     }
    ]
   },
   {
    "id": "label",
    "titulo": "label: siempre",
    "bloques": [
     {
      "code": "<!-- Forma 1: for + id (la más habitual) -->\n<label for=\"email\">Email</label>\n<input type=\"email\" id=\"email\" name=\"email\">\n\n<!-- Forma 2: el input dentro del label -->\n<label><input type=\"checkbox\" name=\"newsletter\"> Quiero recibir ofertas</label>",
      "lang": "html"
     },
     {
      "p": "Un `label` bien enlazado: lo lee el lector de pantalla, **amplía la zona clicable** (clic en el texto = marcar el checkbox) y lo pide el validador. `placeholder` **no** sustituye al `label`: desaparece al escribir."
     }
    ]
   },
   {
    "id": "input-tipos",
    "titulo": "Tipos de input",
    "bloques": [
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<form>\n  <p><label for=\"t1\">text</label> <input type=\"text\" id=\"t1\" name=\"t1\" placeholder=\"Nombre\"></p>\n  <p><label for=\"t2\">email</label> <input type=\"email\" id=\"t2\" name=\"t2\" value=\"ana@correo.com\"></p>\n  <p><label for=\"t3\">password</label> <input type=\"password\" id=\"t3\" name=\"t3\" value=\"secreta\"></p>\n  <p><label for=\"t4\">number</label> <input type=\"number\" id=\"t4\" name=\"t4\" value=\"3\" min=\"1\" max=\"10\"></p>\n  <p><label for=\"t5\">date</label> <input type=\"date\" id=\"t5\" name=\"t5\" value=\"2026-10-03\"></p>\n  <p><label for=\"t6\">time</label> <input type=\"time\" id=\"t6\" name=\"t6\" value=\"09:30\"></p>\n  <p><label for=\"t7\">range</label> <input type=\"range\" id=\"t7\" name=\"t7\" min=\"0\" max=\"100\" value=\"70\"></p>\n  <p><label for=\"t8\">color</label> <input type=\"color\" id=\"t8\" name=\"t8\" value=\"#ff8a1f\"></p>\n  <p><label for=\"t9\">file</label> <input type=\"file\" id=\"t9\" name=\"t9\"></p>\n  <p><input type=\"checkbox\" id=\"t10\" name=\"t10\" checked> <label for=\"t10\">checkbox</label>\n     <input type=\"radio\" id=\"t11\" name=\"t11\" checked> <label for=\"t11\">radio</label></p>\n  <p><label for=\"t12\">search</label> <input type=\"search\" id=\"t12\" name=\"t12\" value=\"teclado\"></p>\n</form>"
      }
     },
     {
      "sub": "Captura generada con Chromium en español; el botón de `file` sale en inglés (\"Choose File\") por la versión sin interfaz del navegador usada para las capturas. En tu navegador dirá \"Seleccionar archivo\"."
     },
     {
      "tabla": {
       "cabs": [
        "`type`",
        "Para",
        "Ventaja"
       ],
       "filas": [
        [
         "`text`",
         "Texto corto genérico",
         "—"
        ],
        [
         "`email`",
         "Email",
         "Valida el formato; en móvil, teclado con `@`"
        ],
        [
         "`password`",
         "Contraseñas",
         "Oculta lo escrito"
        ],
        [
         "`tel`",
         "Teléfono",
         "Teclado numérico en móvil (no valida formato: usa `pattern`)"
        ],
        [
         "`url`",
         "Dirección web",
         "Valida que empiece por `https://`…"
        ],
        [
         "`number`",
         "Cantidades",
         "Flechas, `min`, `max`, `step`. **No** para DNI, teléfonos o códigos postales (quita ceros iniciales)"
        ],
        [
         "`search`",
         "Buscador",
         "Botón para borrar"
        ],
        [
         "`date` / `time` / `datetime-local` / `month` / `week`",
         "Fechas y horas",
         "Calendario nativo; el valor siempre llega como `AAAA-MM-DD` ([[ok]] Disponible en todos (desde 2021))"
        ],
        [
         "`range`",
         "Valor aproximado en un rango",
         "Deslizador (volumen, precio máximo)"
        ],
        [
         "`color`",
         "Color",
         "Selector nativo"
        ],
        [
         "`checkbox`",
         "Sí/no o varias opciones",
         "—"
        ],
        [
         "`radio`",
         "**Una** opción entre varias (mismo `name`)",
         "—"
        ],
        [
         "`file`",
         "Subir archivos",
         "`accept=\"image/*\"`, `multiple`. El `form` necesita `enctype=\"multipart/form-data\"`"
        ],
        [
         "`hidden`",
         "Dato invisible que se envía",
         "Id de un producto, token"
        ],
        [
         "`submit` / `reset` / `button`",
         "Botones",
         "Mejor usar `<button>` → [Botones](@botones)"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "input-atributos",
    "titulo": "Atributos de los controles",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Atributo",
        "Hace",
        "Ejemplo"
       ],
       "filas": [
        [
         "`name`",
         "Nombre del dato al enviar",
         "`name=\"email\"`"
        ],
        [
         "`value`",
         "Valor inicial (o el valor enviado en checkbox y radio)",
         "`value=\"1\"`"
        ],
        [
         "`placeholder`",
         "Texto de ejemplo (no sustituye al `label`)",
         "`placeholder=\"ana@correo.com\"`"
        ],
        [
         "`required`",
         "Obligatorio",
         "—"
        ],
        [
         "`minlength` / `maxlength`",
         "Longitud de texto",
         "`minlength=\"8\"`"
        ],
        [
         "`min` / `max` / `step`",
         "Límites numéricos o de fecha",
         "`min=\"1\" max=\"10\" step=\"1\"`"
        ],
        [
         "`pattern`",
         "Expresión regular que debe cumplir",
         "`pattern=\"[0-9]{8}[A-Za-z]\"` (DNI)"
        ],
        [
         "`autocomplete`",
         "Pista para rellenar solo",
         "`email`, `given-name`, `tel`, `postal-code`, `new-password`, `current-password`"
        ],
        [
         "`disabled`",
         "Desactivado: **no** se envía",
         "—"
        ],
        [
         "`readonly`",
         "Solo lectura: **sí** se envía",
         "—"
        ],
        [
         "`checked` / `selected`",
         "Marcado / seleccionado al inicio",
         "—"
        ],
        [
         "`multiple`",
         "Varios valores (`file`, `select`, `email`)",
         "—"
        ],
        [
         "`autofocus`",
         "Recibe el foco al cargar (con moderación)",
         "—"
        ],
        [
         "`inputmode`",
         "Teclado en móvil sin cambiar el tipo",
         "`inputmode=\"numeric\"` para códigos postales"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "seleccion",
    "titulo": "select, datalist y textarea",
    "bloques": [
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<p><label for=\"provincia\">Provincia</label>\n  <select id=\"provincia\" name=\"provincia\">\n    <option value=\"\">— Elige —</option>\n    <optgroup label=\"Comunidad de Madrid\">\n      <option value=\"M\" selected>Madrid</option>\n    </optgroup>\n    <optgroup label=\"Cataluña\">\n      <option value=\"B\">Barcelona</option>\n      <option value=\"GI\">Girona</option>\n    </optgroup>\n  </select></p>\n<p><label for=\"navegador\">Navegador</label>\n  <input list=\"navegadores\" id=\"navegador\" name=\"navegador\" placeholder=\"Escribe o elige\">\n  <datalist id=\"navegadores\">\n    <option value=\"Chrome\"></option><option value=\"Firefox\"></option><option value=\"Safari\"></option>\n  </datalist></p>\n<p><label for=\"mensaje\">Mensaje</label><br>\n  <textarea id=\"mensaje\" name=\"mensaje\" rows=\"3\" cols=\"40\" maxlength=\"500\">Hola, quería consultar…</textarea></p>"
      }
     },
     {
      "tabla": {
       "cabs": [
        "Necesito…",
        "Uso"
       ],
       "filas": [
        [
         "Una opción de una lista **corta** (2-5) siempre visible",
         "`radio`"
        ],
        [
         "Una opción de una lista **larga**",
         "`select`"
        ],
        [
         "Varias opciones",
         "`checkbox` (o `select multiple`, menos usable)"
        ],
        [
         "Texto libre **con sugerencias**",
         "`input` + `datalist` (la compatibilidad no es total: [[no]] Aún no en todos los navegadores)"
        ],
        [
         "Texto largo",
         "`textarea`"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "fieldset",
    "titulo": "fieldset y legend: agrupar",
    "bloques": [
     {
      "p": "Imprescindible en grupos de `radio` y `checkbox`: la `legend` es la pregunta."
     },
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<fieldset>\n  <legend>Método de envío</legend>\n  <label><input type=\"radio\" name=\"envio\" value=\"estandar\" checked> Estándar (3-5 días) · Gratis</label><br>\n  <label><input type=\"radio\" name=\"envio\" value=\"urgente\"> Urgente (24 h) · 4,99 €</label>\n</fieldset>"
      }
     }
    ]
   },
   {
    "id": "botones",
    "titulo": "Botones",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Código",
        "Hace"
       ],
       "filas": [
        [
         "`<button type=\"submit\">Enviar</button>`",
         "Envía el formulario. **Es el tipo por defecto** dentro de un `form`"
        ],
        [
         "`<button type=\"reset\">Borrar</button>`",
         "Vuelve a los valores iniciales (casi nunca es buena idea)"
        ],
        [
         "`<button type=\"button\">Ver contraseña</button>`",
         "No hace nada por sí solo: para JavaScript"
        ]
       ]
      }
     },
     {
      "aviso": "Un `<button>` sin `type` dentro de un `form` **envía el formulario**. Si es para JavaScript (abrir un menú, mostrar la contraseña), pon siempre `type=\"button\"`.",
      "tipo": "warning"
     },
     {
      "p": "**¿Enlace o botón?** Si **lleva a otra página o sección** → `<a href>`. Si **hace algo** en la página (enviar, abrir, borrar) → `<button>`."
     }
    ]
   },
   {
    "id": "validacion",
    "titulo": "Validación nativa",
    "bloques": [
     {
      "code": "<form action=\"/registro\" method=\"post\">\n  <p>\n    <label for=\"dni\">DNI</label>\n    <input id=\"dni\" name=\"dni\" required pattern=\"[0-9]{8}[A-Za-z]\"\n           title=\"8 números y una letra, por ejemplo 12345678Z\" autocomplete=\"off\">\n  </p>\n  <p>\n    <label for=\"clave\">Contraseña</label>\n    <input id=\"clave\" name=\"clave\" type=\"password\" required minlength=\"8\" autocomplete=\"new-password\">\n  </p>\n  <p>\n    <label for=\"edad\">Edad</label>\n    <input id=\"edad\" name=\"edad\" type=\"number\" min=\"18\" max=\"120\">\n  </p>\n  <button type=\"submit\">Crear cuenta</button>\n</form>",
      "lang": "html"
     },
     {
      "lista": [
       "Al pulsar Enviar, el navegador **bloquea el envío** y muestra un aviso en el primer campo incorrecto.",
       "El `title` se añade al mensaje cuando no se cumple el `pattern`.",
       "Con CSS se pueden marcar los campos: `:invalid`, `:valid`, `:user-invalid` (solo después de que el usuario lo toque) → chuleta CSS."
      ]
     },
     {
      "aviso": "La validación del navegador es **comodidad para el usuario, no seguridad**: se desactiva en dos clics con las DevTools. El servidor siempre tiene que volver a validar.",
      "tipo": "caution"
     }
    ]
   }
  ]
 },
 "mod-10": {
  "resumen": "id · class · data-* · hidden · lang",
  "secciones": [
   {
    "id": "globales",
    "titulo": "Tabla",
    "bloques": [
     {
      "p": "Se pueden poner en **cualquier** elemento."
     },
     {
      "tabla": {
       "cabs": [
        "Atributo",
        "Para qué",
        "Ejemplo"
       ],
       "filas": [
        [
         "`id`",
         "Identificador **único** en la página",
         "`<section id=\"precios\">`"
        ],
        [
         "`class`",
         "Una o varias clases (separadas por espacios) para CSS y JS",
         "`<button class=\"btn btn--primario\">`"
        ],
        [
         "`style`",
         "CSS en línea (evitar: mezcla contenido y diseño)",
         "`style=\"color: red\"`"
        ],
        [
         "`title`",
         "Información extra en un globo al pasar el ratón",
         "`<abbr title=\"…\">`"
        ],
        [
         "`lang`",
         "Idioma de ese fragmento",
         "`<span lang=\"en\">feedback</span>`"
        ],
        [
         "`hidden`",
         "Oculta el elemento (como `display: none`)",
         "`<div hidden>`"
        ],
        [
         "`tabindex`",
         "Orden de foco con `Tab`: `0` = enfocable en su orden natural, `-1` = enfocable solo por JS",
         "Evita valores mayores que 0"
        ],
        [
         "`data-*`",
         "Datos propios para JavaScript o CSS",
         "`data-precio=\"49.90\"`"
        ],
        [
         "`contenteditable`",
         "El usuario puede editar el texto",
         "`<div contenteditable>`"
        ],
        [
         "`draggable`",
         "Se puede arrastrar",
         "`draggable=\"true\"`"
        ],
        [
         "`inert`",
         "El bloque no responde a clics, foco ni lector de pantalla ([[ok]] Disponible en todos (desde 2023))",
         "Fondo detrás de un modal"
        ],
        [
         "`translate=\"no\"`",
         "Que el traductor automático no lo traduzca",
         "Nombres de marca"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "id-class",
    "titulo": "id frente a class",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "",
        "`id`",
        "`class`"
       ],
       "filas": [
        [
         "¿Cuántas veces por página?",
         "**Una**",
         "Las que quieras"
        ],
        [
         "¿Varios por elemento?",
         "No",
         "Sí: `class=\"tarjeta tarjeta--oferta\"`"
        ],
        [
         "Úsalo para",
         "Enlaces internos (`#precios`), `label for`, `aria-labelledby`, buscar un elemento concreto en JS",
         "**Dar estilos** (CSS) y seleccionar grupos en JS"
        ],
        [
         "Especificidad en CSS",
         "Muy alta (cuesta sobrescribirla)",
         "Normal"
        ]
       ]
      }
     },
     {
      "nota": "Regla práctica: **`class` para el CSS, `id` para enlazar** (anclas, formularios, accesibilidad). Si usas BEM: `bloque__elemento--modificador`, por ejemplo `tarjeta__titulo`, `boton--grande`.",
      "tipo": "tip"
     }
    ]
   },
   {
    "id": "data-attr",
    "titulo": "Atributos data-*",
    "bloques": [
     {
      "code": "<article class=\"producto\" data-id=\"8423\" data-categoria=\"perifericos\" data-stock=\"0\">\n  <h3>Webcam Full HD</h3>\n</article>",
      "lang": "html"
     },
     {
      "code": "const producto = document.querySelector('.producto');\nproducto.dataset.id;          // \"8423\"   (data-id → dataset.id)\nproducto.dataset.categoria;   // \"perifericos\"",
      "lang": "js"
     },
     {
      "code": ".producto[data-stock=\"0\"] { opacity: 0.5; }   /* atenuar los agotados */",
      "lang": "css"
     }
    ]
   }
  ]
 },
 "mod-11": {
  "resumen": "semántica · teclado · alt · ARIA",
  "secciones": [
   {
    "id": "a11y-principios",
    "titulo": "Principios en HTML",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Principio",
        "Cómo"
       ],
       "filas": [
        [
         "**Usa el elemento correcto**",
         "`<button>` para acciones, `<a>` para navegar, `<nav>`, `<main>`, títulos en orden. Solo con esto, el 80 % está hecho"
        ],
        [
         "**Todo contenido no textual tiene alternativa**",
         "`alt` en imágenes, `title` en iframes, subtítulos en vídeos"
        ],
        [
         "**Todo control tiene nombre**",
         "`<label>` en cada campo; texto (o `aria-label`) en botones de solo icono"
        ],
        [
         "**El idioma está declarado**",
         "`<html lang=\"es\">`, y `lang=\"en\"` en fragmentos en inglés"
        ],
        [
         "**La información no depende solo del color**",
         "\"Campos obligatorios en rojo\" [[no]] → asterisco + texto \"obligatorio\" [[ok]]"
        ],
        [
         "**El orden del HTML es el orden lógico**",
         "El lector y el tabulador siguen el orden del código, no el visual"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "a11y-teclado",
    "titulo": "Teclado y foco",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Tecla",
        "Hace"
       ],
       "filas": [
        [
         "`Tab` / `Shift+Tab`",
         "Siguiente / anterior elemento interactivo"
        ],
        [
         "`Enter`",
         "Activa enlaces y botones"
        ],
        [
         "`Espacio`",
         "Activa botones, marca checkboxes"
        ],
        [
         "Flechas",
         "Mueven entre opciones de `radio` y `select`"
        ],
        [
         "`Esc`",
         "Cierra `dialog` y `popover`"
        ]
       ]
      }
     },
     {
      "lista": [
       "Los elementos nativos (`a`, `button`, `input`, `select`, `details`) **ya son accesibles con teclado**. Un `<div onclick=\"…\">` no: ni recibe foco ni responde a `Enter`.",
       "**Nunca quites el contorno del foco** (`outline: none`) sin poner otro estilo visible.",
       "**Enlace para saltar al contenido**, el primero del `body`, para no tabular por todo el menú en cada página:"
      ]
     },
     {
      "code": "<body>\n  <a href=\"#contenido\" class=\"saltar\">Saltar al contenido</a>\n  <header>…menú largo…</header>\n  <main id=\"contenido\">…</main>\n</body>",
      "lang": "html"
     },
     {
      "sub": "Con CSS se oculta y solo aparece al recibir el foco con `Tab`."
     },
     {
      "nota": "**Prueba rápida:** desconecta el ratón y recorre tu página solo con `Tab`. ¿Ves siempre dónde estás? ¿Llegas a todo? ¿Puedes salir de los menús y modales?",
      "tipo": "tip"
     }
    ]
   },
   {
    "id": "aria",
    "titulo": "ARIA básico",
    "bloques": [
     {
      "p": "ARIA son atributos que **añaden información** para tecnologías de asistencia cuando el HTML no basta."
     },
     {
      "nota": "**Primera regla de ARIA:** si existe un elemento HTML nativo que hace lo que necesitas, **úsalo en lugar de ARIA**. `<button>` mejor que `<div role=\"button\" tabindex=\"0\">`. Un ARIA mal puesto es peor que no poner ninguno.",
      "tipo": "important"
     },
     {
      "tabla": {
       "cabs": [
        "Atributo",
        "Para qué",
        "Ejemplo"
       ],
       "filas": [
        [
         "`aria-label`",
         "Nombre accesible cuando no hay texto visible",
         "`<button aria-label=\"Cerrar\"><svg>…</svg></button>`"
        ],
        [
         "`aria-labelledby`",
         "El nombre es el texto de otro elemento",
         "`<section aria-labelledby=\"t-ofertas\"><h2 id=\"t-ofertas\">Ofertas</h2>`"
        ],
        [
         "`aria-describedby`",
         "Descripción o ayuda extra",
         "`<input aria-describedby=\"ayuda-clave\">` + `<p id=\"ayuda-clave\">Mínimo 8 caracteres</p>`"
        ],
        [
         "`aria-hidden=\"true\"`",
         "Ocultarlo al lector (pero no a la vista)",
         "Iconos decorativos: `<span aria-hidden=\"true\">★</span>`"
        ],
        [
         "`aria-current=\"page\"`",
         "Página actual en un menú",
         "`<a href=\"/\" aria-current=\"page\">Inicio</a>`"
        ],
        [
         "`aria-expanded`",
         "Si un menú desplegable está abierto",
         "`<button aria-expanded=\"false\">Menú</button>` (lo cambia JS)"
        ],
        [
         "`aria-live=\"polite\"`",
         "Anunciar cambios sin mover el foco",
         "Mensaje \"Añadido al carrito\""
        ],
        [
         "`role`",
         "Cambiar el tipo de elemento",
         "`role=\"alert\"` para un error urgente"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "a11y-checklist",
    "titulo": "Checklist antes de entregar",
    "bloques": [
     {
      "lista": [
       "[ ] `lang=\"es\"` en `<html>` y un `<title>` descriptivo en cada página",
       "[ ] Un `h1` y títulos sin saltos de nivel",
       "[ ] `header`, `nav`, `main` y `footer` en su sitio",
       "[ ] Todas las `img` con `alt` (vacío si son decorativas)",
       "[ ] Todos los campos con `<label>`; grupos de radio y checkbox en `fieldset` + `legend`",
       "[ ] Botones de solo icono con `aria-label`",
       "[ ] Enlaces con texto que se entiende fuera de contexto (nada de \"pincha aquí\")",
       "[ ] Se puede usar todo con teclado y el foco siempre se ve",
       "[ ] Contraste suficiente (texto normal 4,5:1) → chuleta CSS",
       "[ ] Pasa el validador W3C y **Lighthouse → Accesibilidad** sin errores graves"
      ]
     }
    ]
   }
  ],
  "intro": [
   {
    "p": "Una web accesible la puede usar **cualquiera**: con lector de pantalla, solo con teclado, con zoom al 200 %, con daltonismo o con una mano ocupada en el móvil. En España y la UE, además, la **Ley Europea de Accesibilidad** la exige a muchas webs de comercio y servicios desde junio de 2025."
   }
  ]
 },
 "mod-12": {
  "resumen": "title · description · Open Graph",
  "secciones": [
   {
    "id": "seo-esenciales",
    "titulo": "Esenciales",
    "bloques": [
     {
      "code": "<head>\n  <title>Teclados mecánicos inalámbricos · Tienda DAW</title>\n  <meta name=\"description\" content=\"Teclados mecánicos inalámbricos con envío en 24 h. Switches rojos, marrones y azules. Devolución gratis 30 días.\">\n  <link rel=\"canonical\" href=\"https://tienda-daw.es/teclados/\">\n  <meta name=\"robots\" content=\"index, follow\">\n  <meta name=\"theme-color\" content=\"#0d1117\">\n</head>",
      "lang": "html"
     },
     {
      "tabla": {
       "cabs": [
        "Elemento",
        "Buenas prácticas"
       ],
       "filas": [
        [
         "`<title>`",
         "Único en cada página, unos 50-60 caracteres, lo importante primero"
        ],
        [
         "`description`",
         "150-160 caracteres, como un anuncio: qué hay y por qué entrar. No influye en la posición, pero sí en los clics"
        ],
        [
         "`canonical`",
         "La URL \"oficial\" cuando la misma página es accesible por varias URL (filtros, parámetros)"
        ],
        [
         "`robots`",
         "`noindex` para páginas que no deben salir en Google (área privada, pruebas)"
        ],
        [
         "`theme-color`",
         "Color de la barra del navegador en móvil"
        ],
        [
         "**Contenido**",
         "Un `h1` claro, títulos con las palabras que buscaría la gente, `alt` descriptivos, URL legibles (`/teclados/k2` mejor que `/p?id=8423`)"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "open-graph",
    "titulo": "Open Graph: la vista previa al compartir",
    "bloques": [
     {
      "p": "Lo que se ve al pegar el enlace en WhatsApp, LinkedIn, Telegram o redes sociales."
     },
     {
      "code": "<meta property=\"og:title\" content=\"Teclado mecánico Keychron K2\">\n<meta property=\"og:description\" content=\"Inalámbrico, retroiluminado, switches marrones. 89,99 €.\">\n<meta property=\"og:image\" content=\"https://tienda-daw.es/img/og/keychron-k2.jpg\">\n<meta property=\"og:url\" content=\"https://tienda-daw.es/teclados/keychron-k2\">\n<meta property=\"og:type\" content=\"product\">\n<meta property=\"og:locale\" content=\"es_ES\">\n<meta name=\"twitter:card\" content=\"summary_large_image\">",
      "lang": "html"
     },
     {
      "sub": "La imagen debe ser una URL **absoluta**, con un tamaño recomendado de 1200 × 630 px."
     }
    ]
   }
  ]
 },
 "mod-13": {
  "resumen": "details · dialog · popover · sin JS",
  "secciones": [
   {
    "id": "details",
    "titulo": "details y summary: desplegables sin JavaScript",
    "bloques": [
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<details open>\n  <summary>¿Cuánto tarda el envío?</summary>\n  <p>Entre 24 y 72 horas laborables en la península.</p>\n</details>\n<details>\n  <summary>¿Puedo devolver un producto?</summary>\n  <p>Sí, tienes 30 días naturales.</p>\n</details>"
      }
     },
     {
      "tabla": {
       "cabs": [
        "Atributo",
        "Hace",
        "Compatibilidad"
       ],
       "filas": [
        [
         "`open`",
         "Empieza desplegado",
         "[[ok]] Disponible en todos (desde 2020)"
        ],
        [
         "`name=\"faq\"`",
         "Acordeón **exclusivo**: al abrir uno se cierran los demás con el mismo `name`",
         "[[half]] Recién disponible (2024-09)"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "dialog",
    "titulo": "dialog: ventanas modales nativas",
    "bloques": [
     {
      "p": "[[ok]] Disponible en todos (desde 2022)"
     },
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<button type=\"button\" onclick=\"document.querySelector('#confirmar').showModal()\">Vaciar carrito</button>\n\n<dialog id=\"confirmar\" aria-labelledby=\"titulo-confirmar\">\n  <h2 id=\"titulo-confirmar\">¿Vaciar el carrito?</h2>\n  <p>Se eliminarán los 3 productos.</p>\n  <form method=\"dialog\">\n    <button value=\"cancelar\">Cancelar</button>\n    <button value=\"ok\">Sí, vaciar</button>\n  </form>\n</dialog>"
      }
     },
     {
      "tabla": {
       "cabs": [
        "Pieza",
        "Hace"
       ],
       "filas": [
        [
         "`showModal()`",
         "Lo abre como **modal**: oscurece el fondo, bloquea el resto de la página y lleva el foco dentro"
        ],
        [
         "`show()`",
         "Lo abre **sin** bloquear (no modal)"
        ],
        [
         "`<form method=\"dialog\">`",
         "Cualquier botón de ese formulario **cierra** el diálogo, y su `value` queda en `dialog.returnValue`"
        ],
        [
         "`Esc`",
         "Cierra el modal"
        ],
        [
         "`::backdrop` (CSS)",
         "Estilo del fondo oscurecido"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "popover",
    "titulo": "popover: menús y avisos flotantes sin JavaScript",
    "bloques": [
     {
      "p": "[[half]] Recién disponible (2025-01)"
     },
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<button type=\"button\" id=\"btn-ayuda\" popovertarget=\"ayuda\">¿Qué es el CVV?</button>\n<div id=\"ayuda\" popover>\n  <p>Son los 3 dígitos del reverso de tu tarjeta.</p>\n</div>"
      }
     },
     {
      "tabla": {
       "cabs": [
        "",
        "`dialog` + `showModal()`",
        "`popover`"
       ],
       "filas": [
        [
         "Para",
         "Algo que **requiere respuesta**: confirmar, un formulario",
         "Algo **ligero**: menú, tooltip, aviso"
        ],
        [
         "Bloquea la página",
         "[[ok]]",
         "[[no]]"
        ],
        [
         "Se cierra al hacer clic fuera",
         "[[no]]",
         "[[ok]] (con `popover` o `popover=\"auto\"`)"
        ],
        [
         "JavaScript",
         "Para abrirlo (`showModal()`)",
         "**Ninguno**: `popovertarget`"
        ]
       ]
      }
     }
    ]
   }
  ]
 },
 "mod-14": {
  "resumen": "W3C · DevTools · Lighthouse · errores",
  "secciones": [
   {
    "id": "herramientas",
    "titulo": "Herramientas",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Herramienta",
        "Para qué",
        "Cómo"
       ],
       "filas": [
        [
         "**Validador W3C**",
         "Errores de sintaxis y de anidación",
         "[validator.w3.org/nu](https://validator.w3.org/nu/) → Check by file upload o Text input"
        ],
        [
         "**DevTools → Elements**",
         "Ver el DOM real y el CSS aplicado",
         "`F12` o clic derecho → Inspeccionar"
        ],
        [
         "**DevTools → Lighthouse**",
         "Puntuación de accesibilidad, SEO, rendimiento y buenas prácticas",
         "`F12` → Lighthouse → Analyze page load"
        ],
        [
         "**DevTools → Accessibility**",
         "El nombre accesible y el rol de cada elemento",
         "`F12` → Elements → panel Accessibility"
        ],
        [
         "**WAVE**",
         "Errores de accesibilidad señalados sobre la página",
         "[wave.webaim.org](https://wave.webaim.org/) o su extensión"
        ],
        [
         "**Live Server** (VS Code)",
         "Servidor local con recarga automática",
         "Necesario para rutas que empiezan por `/`"
        ]
       ]
      }
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
        "Error",
        "Ejemplo",
        "Qué pasa",
        "Solución"
       ],
       "filas": [
        [
         "Bloque dentro de `<p>`",
         "`<p><div>…</div></p>`",
         "El navegador cierra el `p` antes de tiempo ([ver captura](@bl-anidar))",
         "Cambiar el `p` por un `div`, o el `div` por un `span`"
        ],
        [
         "`id` duplicado",
         "Dos `id=\"titulo\"`",
         "Las anclas, los `label` y el JS solo encuentran el primero",
         "`id` únicos; para repetir, `class`"
        ],
        [
         "Enlace o botón dentro de otro",
         "`<a><button>…</button></a>`",
         "Comportamiento impredecible al hacer clic y con el teclado",
         "Uno solo: `<a>` si navega, `<button>` si actúa"
        ],
        [
         "`img` sin `alt`",
         "`<img src=\"logo.svg\">`",
         "El lector lee el nombre del archivo",
         "`alt` descriptivo o `alt=\"\"`"
        ],
        [
         "`label` sin enlazar",
         "`<label>Email</label><input id=\"email\">`",
         "No se asocia: clic en el texto no hace nada",
         "`for=\"email\"`"
        ],
        [
         "Control sin `name`",
         "`<input id=\"email\">`",
         "**No se envía** al servidor",
         "`name=\"email\"`"
        ],
        [
         "`li` fuera de una lista",
         "`<li>` suelto, o `<a>` directo dentro de `<ul>`",
         "HTML inválido; viñetas raras",
         "`ul > li > a`"
        ],
        [
         "Saltos de títulos",
         "`h1` → `h4`",
         "Estructura confusa para el lector de pantalla",
         "Niveles seguidos; el tamaño con CSS"
        ],
        [
         "Tabla para maquetar",
         "Columnas hechas con `<table>`",
         "Mala accesibilidad, imposible de adaptar al móvil",
         "Flexbox o Grid"
        ],
        [
         "Ruta con mayúsculas o espacios",
         "`src=\"Img/Mi Foto.JPG\"`",
         "Funciona en Windows y falla al subirlo al servidor",
         "`img/mi-foto.jpg`"
        ],
        [
         "`<br>` para separar",
         "`<br><br><br>`",
         "Espaciado rígido, mal en móvil",
         "`margin` en CSS"
        ],
        [
         "Atributo sin comillas con espacios",
         "`class=btn grande`",
         "`grande` se interpreta como otro atributo",
         "`class=\"btn grande\"`"
        ],
        [
         "Falta `<!DOCTYPE html>`",
         "—",
         "Modo quirks: el CSS se comporta raro",
         "Primera línea del archivo"
        ]
       ]
      }
     },
     {
      "code": "<ul>\n  <a href=\"#\">Inicio</a>\n</ul>\n<img src=\"recursos/logo.svg\">\n<p id=\"dup\">Uno</p>\n<p id=\"dup\">Dos</p>",
      "lang": "html"
     },
     {
      "sub": "[[no]] VALIDADOR W3C"
     },
     {
      "consola": "Error: Element “a” not allowed as child of element “ul” in this context. (Suppressing further errors from this subtree.)\nError: An “img” element must have an “alt” attribute, except under certain conditions. For details, consult guidance on providing text alternatives for images.\nError: Duplicate ID “dup”."
     },
     {
      "sub": "Traducción: (1) un `a` no puede ser hijo de `ul`; (2) a la `img` le falta el atributo `alt`; (3) hay un `id` duplicado."
     }
    ]
   }
  ]
 },
 "mod-15": {
  "resumen": "8 páginas reales · solo HTML",
  "secciones": [
   {
    "id": "m1",
    "titulo": "M1 · Ficha de producto",
    "bloques": [
     {
      "nota": "** Caso real:** la página de un producto en una tienda online: foto, nombre, precio con descuento, valoración, ficha técnica y botón de compra.",
      "tipo": "note"
     },
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<main>\n  <article class=\"producto\">\n    <figure>\n      <img src=\"recursos/auriculares.svg\" alt=\"Auriculares de diadema negros con almohadillas naranjas\"\n           width=\"400\" height=\"300\">\n    </figure>\n\n    <h1>Auriculares Sony WH-1000XM5</h1>\n    <p>Valoración: <data value=\"4.7\">4,7 de 5</data> (<a href=\"#opiniones\">212 opiniones</a>)</p>\n\n    <p>\n      <s>379,00 €</s>\n      <strong>349,00 €</strong>\n      <small>IVA incluido · Envío gratis</small>\n    </p>\n\n    <form action=\"/carrito\" method=\"post\">\n      <input type=\"hidden\" name=\"id_producto\" value=\"6\">\n      <label for=\"cantidad\">Cantidad</label>\n      <select id=\"cantidad\" name=\"cantidad\">\n        <option>1</option><option>2</option><option>3</option>\n      </select>\n      <button type=\"submit\">Añadir al carrito</button>\n    </form>\n\n    <h2>Ficha técnica</h2>\n    <dl>\n      <dt>Conexión</dt>     <dd>Bluetooth 5.2 y jack de 3,5 mm</dd>\n      <dt>Autonomía</dt>    <dd>Hasta 30 horas</dd>\n      <dt>Peso</dt>         <dd>250 g</dd>\n    </dl>\n  </article>\n</main>"
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
         "`article`",
         "La ficha tiene sentido sola (se puede compartir, aparece en un listado)"
        ],
        [
         "`h1` = nombre del producto",
         "Es el tema de la página"
        ],
        [
         "`<s>` para el precio anterior y `<strong>` para el actual",
         "`s` = \"ya no es válido\"; el actual es lo importante"
        ],
        [
         "`<data value=\"4.7\">`",
         "Valor para máquinas (4.7) junto al texto para personas (4,7 de 5)"
        ],
        [
         "`input type=\"hidden\"`",
         "El servidor necesita saber qué producto se añade, pero el usuario no tiene que verlo"
        ],
        [
         "`dl` para la ficha técnica",
         "Son pares característica → valor"
        ],
        [
         "`method=\"post\"`",
         "Añadir al carrito **cambia** algo en el servidor"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "m2",
    "titulo": "M2 · Formulario de inscripción a un curso",
    "bloques": [
     {
      "nota": "** Caso real:** una academia online recoge inscripciones: datos personales, modalidad, intereses y aceptación de la política de privacidad. Debe validar en el navegador antes de enviar.",
      "tipo": "note"
     },
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<main>\n  <h1>Inscripción: curso de HTML y CSS</h1>\n  <p>Los campos marcados con <span aria-hidden=\"true\">*</span> (obligatorio) son necesarios.</p>\n\n  <form action=\"/inscripcion\" method=\"post\">\n    <fieldset>\n      <legend>Datos personales</legend>\n      <p>\n        <label for=\"nombre\">Nombre completo *</label><br>\n        <input id=\"nombre\" name=\"nombre\" required autocomplete=\"name\" size=\"40\">\n      </p>\n      <p>\n        <label for=\"email\">Email *</label><br>\n        <input id=\"email\" name=\"email\" type=\"email\" required autocomplete=\"email\" size=\"40\">\n      </p>\n      <p>\n        <label for=\"tel\">Móvil</label><br>\n        <input id=\"tel\" name=\"tel\" type=\"tel\" autocomplete=\"tel\" pattern=\"[6-7][0-9]{8}\"\n               title=\"9 cifras empezando por 6 o 7\" aria-describedby=\"ayuda-tel\">\n        <small id=\"ayuda-tel\">Sin espacios ni prefijo. Ej.: 600111222</small>\n      </p>\n      <p>\n        <label for=\"nacimiento\">Fecha de nacimiento</label><br>\n        <input id=\"nacimiento\" name=\"nacimiento\" type=\"date\" max=\"2010-12-31\">\n      </p>\n    </fieldset>\n\n    <fieldset>\n      <legend>Modalidad *</legend>\n      <label><input type=\"radio\" name=\"modalidad\" value=\"online\" required checked> Online (99 €)</label><br>\n      <label><input type=\"radio\" name=\"modalidad\" value=\"presencial\"> Presencial en Madrid (149 €)</label>\n    </fieldset>\n\n    <fieldset>\n      <legend>¿Qué te interesa más?</legend>\n      <label><input type=\"checkbox\" name=\"interes\" value=\"maquetacion\"> Maquetación</label>\n      <label><input type=\"checkbox\" name=\"interes\" value=\"accesibilidad\"> Accesibilidad</label>\n      <label><input type=\"checkbox\" name=\"interes\" value=\"animaciones\"> Animaciones</label>\n    </fieldset>\n\n    <p>\n      <label for=\"comentarios\">Comentarios</label><br>\n      <textarea id=\"comentarios\" name=\"comentarios\" rows=\"3\" cols=\"50\" maxlength=\"500\"></textarea>\n    </p>\n\n    <p>\n      <label>\n        <input type=\"checkbox\" name=\"privacidad\" required>\n        Acepto la <a href=\"privacidad.html\">política de privacidad</a> *\n      </label>\n    </p>\n\n    <button type=\"submit\">Inscribirme</button>\n  </form>\n</main>"
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
         "`fieldset` + `legend` para cada grupo",
         "El lector de pantalla anuncia \"Modalidad\" antes de leer cada opción"
        ],
        [
         "`required` en un solo radio del grupo",
         "Basta con uno para que el grupo entero sea obligatorio"
        ],
        [
         "Todos los checkbox de intereses con el **mismo `name`**",
         "El servidor recibe una lista: `interes=maquetacion&interes=animaciones`"
        ],
        [
         "`type=\"tel\"` + `pattern`",
         "`tel` no valida nada por sí solo; el `pattern` comprueba el formato español"
        ],
        [
         "`aria-describedby`",
         "Asocia la ayuda al campo: el lector la lee al entrar en él"
        ],
        [
         "`autocomplete`",
         "El navegador puede rellenar nombre, email y teléfono solo"
        ],
        [
         "`max` en la fecha",
         "Impide elegir una fecha posterior a 2010 (edad mínima)"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "m3",
    "titulo": "M3 · Artículo de un blog técnico",
    "bloques": [
     {
      "nota": "** Caso real:** una entrada de blog con autor y fecha, secciones, una imagen con pie de foto, una cita, código y etiquetas, más una barra lateral con artículos relacionados.",
      "tipo": "note"
     },
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<main>\n  <article>\n    <header>\n      <h1>Por qué usar etiquetas semánticas</h1>\n      <p>Por <a href=\"/autores/lucia\">Lucía Fernández</a> ·\n         <time datetime=\"2026-10-03\">3 de octubre de 2026</time> · 4 min de lectura</p>\n    </header>\n\n    <p>Un <code>&lt;div&gt;</code> y un <code>&lt;nav&gt;</code> se ven igual, pero no significan lo mismo.</p>\n\n    <section aria-labelledby=\"s-lectores\">\n      <h2 id=\"s-lectores\">Para los lectores de pantalla</h2>\n      <p>Permiten saltar directamente al contenido principal o al menú.</p>\n      <figure>\n        <img src=\"recursos/paisaje.svg\" alt=\"Esquema de una página con sus regiones principales\"\n             width=\"300\" height=\"150\">\n        <figcaption>Las regiones que anuncia un lector de pantalla.</figcaption>\n      </figure>\n    </section>\n\n    <section aria-labelledby=\"s-seo\">\n      <h2 id=\"s-seo\">Para los buscadores</h2>\n      <blockquote>\n        <p>Usa elementos HTML semánticos para dar significado a tu contenido.</p>\n      </blockquote>\n    </section>\n\n    <footer>\n      <p>Etiquetas: <a href=\"/etiqueta/html\" rel=\"tag\">HTML</a>, <a href=\"/etiqueta/accesibilidad\" rel=\"tag\">Accesibilidad</a></p>\n    </footer>\n  </article>\n\n  <aside aria-labelledby=\"relacionados\">\n    <h2 id=\"relacionados\">Artículos relacionados</h2>\n    <ul>\n      <li><a href=\"/blog/alt\">Cómo escribir un buen texto alternativo</a></li>\n      <li><a href=\"/blog/formularios\">Formularios accesibles paso a paso</a></li>\n    </ul>\n  </aside>\n</main>"
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
         "`header` y `footer` **dentro** del `article`",
         "Son la cabecera y el pie del artículo, no de la página (no crean regiones globales)"
        ],
        [
         "`time datetime`",
         "Fecha legible por buscadores y lectores de feeds"
        ],
        [
         "`section` con `aria-labelledby`",
         "Cada sección se nombra con su título y aparece en el mapa de regiones"
        ],
        [
         "`<code>&lt;div&gt;</code>`",
         "Para mostrar una etiqueta hay que escapar `<` y `>`"
        ],
        [
         "`rel=\"tag\"`",
         "Indica que el enlace es una etiqueta del artículo"
        ],
        [
         "`aside` dentro de `main`",
         "Contenido relacionado con **esta** página"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "m4",
    "titulo": "M4 · Comparativa de planes de suscripción",
    "bloques": [
     {
      "nota": "** Caso real:** la tabla de precios de una plataforma: tres planes con sus características. Debe ser legible con lector de pantalla (que anuncie plan y característica en cada celda).",
      "tipo": "note"
     },
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<main>\n  <h1>Planes y precios</h1>\n  <table>\n    <caption>Comparativa de planes (precio mensual, IVA incluido)</caption>\n    <thead>\n      <tr>\n        <td></td>\n        <th scope=\"col\">Básico</th>\n        <th scope=\"col\">Estándar</th>\n        <th scope=\"col\">Premium</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr><th scope=\"row\">Precio</th>       <td>6,99 €</td> <td>12,99 €</td> <td>17,99 €</td></tr>\n      <tr><th scope=\"row\">Calidad</th>      <td>HD</td>     <td>Full HD</td> <td>4K + HDR</td></tr>\n      <tr><th scope=\"row\">Pantallas</th>    <td>1</td>      <td>2</td>       <td>4</td></tr>\n      <tr><th scope=\"row\">Descargas</th>    <td>No</td>     <td>Sí</td>      <td>Sí</td></tr>\n    </tbody>\n    <tfoot>\n      <tr>\n        <td></td>\n        <td><a href=\"/alta?plan=basico\">Elegir Básico</a></td>\n        <td><a href=\"/alta?plan=estandar\">Elegir Estándar</a></td>\n        <td><a href=\"/alta?plan=premium\">Elegir Premium</a></td>\n      </tr>\n    </tfoot>\n  </table>\n</main>",
       "css": "table { border-collapse: collapse; }\nth, td { border: 1px solid #999; padding: 6px 12px; text-align: center; }"
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
         "Tabla",
         "Son datos para comparar por **filas y columnas**"
        ],
        [
         "`th scope=\"col\"` en los planes y `scope=\"row\"` en las características",
         "El lector anuncia \"Estándar, Pantallas: 2\""
        ],
        [
         "\"Sí\" / \"No\" en texto",
         "Un icono [[ok]] / [[no]] sin texto alternativo no se entiende con lector de pantalla"
        ],
        [
         "Celda vacía `<td></td>` en la esquina",
         "No es cabecera de nada"
        ],
        [
         "Enlaces en el `tfoot`",
         "Son acciones que afectan a cada columna"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "m5",
    "titulo": "M5 · Página de contacto",
    "bloques": [
     {
      "nota": "** Caso real:** datos de contacto con enlaces que llaman o abren el correo al tocarlos en el móvil, horario, formulario y mapa de la tienda física.",
      "tipo": "note"
     },
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<main>\n  <h1>Contacto</h1>\n\n  <section aria-labelledby=\"t-datos\">\n    <h2 id=\"t-datos\">Dónde estamos</h2>\n    <address>\n      Tienda DAW<br>\n      C/ Mayor, 10 · 28013 Madrid<br>\n      <a href=\"tel:+34910000000\">910 000 000</a> ·\n      <a href=\"mailto:hola@tienda-daw.es\">hola@tienda-daw.es</a>\n    </address>\n    <p>Horario: lunes a sábado de <time>10:00</time> a <time>20:00</time>.</p>\n    <iframe src=\"https://www.openstreetmap.org/export/embed.html?bbox=-3.712,40.413,-3.703,40.418&amp;layer=mapnik\"\n            title=\"Mapa: Tienda DAW en la calle Mayor de Madrid\" width=\"400\" height=\"200\" loading=\"lazy\"></iframe>\n  </section>\n\n  <section aria-labelledby=\"t-form\">\n    <h2 id=\"t-form\">Escríbenos</h2>\n    <form action=\"/contacto\" method=\"post\">\n      <p><label for=\"c-nombre\">Nombre</label><br>\n         <input id=\"c-nombre\" name=\"nombre\" required autocomplete=\"name\"></p>\n      <p><label for=\"c-email\">Email</label><br>\n         <input id=\"c-email\" name=\"email\" type=\"email\" required autocomplete=\"email\"></p>\n      <p><label for=\"c-asunto\">Asunto</label><br>\n         <select id=\"c-asunto\" name=\"asunto\">\n           <option>Pedido</option><option>Devolución</option><option>Otro</option>\n         </select></p>\n      <p><label for=\"c-mensaje\">Mensaje</label><br>\n         <textarea id=\"c-mensaje\" name=\"mensaje\" rows=\"4\" cols=\"45\" required></textarea></p>\n      <button type=\"submit\">Enviar mensaje</button>\n    </form>\n  </section>\n</main>"
      }
     },
     {
      "sub": "El mapa aparece vacío en la captura porque se generó sin conexión a internet; al abrir la demo con conexión se carga."
     },
     {
      "tabla": {
       "cabs": [
        "Decisión",
        "Por qué"
       ],
       "filas": [
        [
         "`address`",
         "Datos de contacto del sitio"
        ],
        [
         "`tel:` con prefijo `+34`",
         "En el móvil abre el marcador; el prefijo hace que funcione también desde el extranjero"
        ],
        [
         "`iframe` con `title` y `loading=\"lazy\"`",
         "El título describe el mapa y no se descarga hasta que se acerca el scroll"
        ],
        [
         "`&amp;` en la URL",
         "En HTML el `&` de una URL dentro de un atributo se escribe `&amp;`"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "m6",
    "titulo": "M6 · Preguntas frecuentes (FAQ)",
    "bloques": [
     {
      "nota": "** Caso real:** la página de ayuda de una tienda, agrupada por temas. Al abrir una pregunta se cierran las demás de su grupo, sin JavaScript.",
      "tipo": "note"
     },
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<main>\n  <h1>Preguntas frecuentes</h1>\n\n  <section aria-labelledby=\"faq-envios\">\n    <h2 id=\"faq-envios\">Envíos</h2>\n    <details name=\"envios\" open>\n      <summary>¿Cuánto tarda en llegar mi pedido?</summary>\n      <p>Entre 24 y 72 horas laborables en la península; de 3 a 5 días en Baleares y Canarias.</p>\n    </details>\n    <details name=\"envios\">\n      <summary>¿Cuánto cuesta el envío?</summary>\n      <p>Gratis a partir de 50 €. Por debajo, 4,99 €.</p>\n    </details>\n  </section>\n\n  <section aria-labelledby=\"faq-devoluciones\">\n    <h2 id=\"faq-devoluciones\">Devoluciones</h2>\n    <details name=\"devoluciones\">\n      <summary>¿Cuánto tiempo tengo para devolver un producto?</summary>\n      <p>30 días naturales desde la entrega. Consulta las <a href=\"/condiciones#devoluciones\">condiciones</a>.</p>\n    </details>\n  </section>\n\n  <p>¿No encuentras tu respuesta? <a href=\"contacto.html\">Escríbenos</a>.</p>\n</main>"
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
         "`details` / `summary`",
         "Desplegable accesible con teclado y lector de pantalla, sin JavaScript"
        ],
        [
         "`name=\"envios\"` común",
         "Acordeón exclusivo: solo una abierta por grupo ([[half]] Recién disponible (2024-09); en navegadores antiguos simplemente se pueden abrir varias)"
        ],
        [
         "`open` en la primera",
         "La pregunta más consultada aparece abierta"
        ],
        [
         "Un `section` por tema con su `h2`",
         "Permite saltar de tema en tema"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "m7",
    "titulo": "M7 · Factura",
    "bloques": [
     {
      "nota": "** Caso real:** la factura que se descarga desde \"Mis pedidos\": datos del emisor y del cliente, líneas, base imponible, IVA y total.",
      "tipo": "note"
     },
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<main>\n  <article>\n    <header>\n      <h1>Factura F-2026-0148</h1>\n      <dl>\n        <dt>Fecha</dt>         <dd><time datetime=\"2026-10-03\">03/10/2026</time></dd>\n        <dt>Nº de pedido</dt>  <dd>1024</dd>\n      </dl>\n    </header>\n\n    <section aria-labelledby=\"t-emisor\">\n      <h2 id=\"t-emisor\">Emisor</h2>\n      <address>Tienda DAW S.L. · CIF B12345678<br>C/ Mayor, 10 · 28013 Madrid</address>\n    </section>\n\n    <section aria-labelledby=\"t-cliente\">\n      <h2 id=\"t-cliente\">Cliente</h2>\n      <p>Lucía Fernández Gil · NIF 12345678Z<br>C/ Alcalá, 200 · 28028 Madrid</p>\n    </section>\n\n    <table>\n      <caption>Detalle de la factura</caption>\n      <thead>\n        <tr><th scope=\"col\">Producto</th><th scope=\"col\">Uds.</th><th scope=\"col\">Precio</th><th scope=\"col\">Importe</th></tr>\n      </thead>\n      <tbody>\n        <tr><td>Portátil Lenovo IdeaPad 5</td><td>1</td><td>536,36 €</td><td>536,36 €</td></tr>\n        <tr><td>Ratón Logitech MX Master 3S</td><td>1</td><td>81,82 €</td><td>81,82 €</td></tr>\n      </tbody>\n      <tfoot>\n        <tr><th scope=\"row\" colspan=\"3\">Base imponible</th><td>618,18 €</td></tr>\n        <tr><th scope=\"row\" colspan=\"3\">IVA (21 %)</th><td>129,82 €</td></tr>\n        <tr><th scope=\"row\" colspan=\"3\">Total</th><td><strong>748,00 €</strong></td></tr>\n      </tfoot>\n    </table>\n\n    <footer>\n      <p><small>Forma de pago: tarjeta. Factura emitida electrónicamente.</small></p>\n    </footer>\n  </article>\n</main>",
       "css": "table { border-collapse: collapse; margin-top: 12px; }\nth, td { border: 1px solid #999; padding: 4px 10px; }\ntd:nth-child(n+2) { text-align: right; }"
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
         "`article`",
         "La factura es un documento independiente (se imprime, se descarga)"
        ],
        [
         "`dl` para fecha y número",
         "Pares etiqueta → valor"
        ],
        [
         "`tfoot` con `colspan=\"3\"`",
         "Los totales ocupan las tres primeras columnas como etiqueta y el importe va en la última"
        ],
        [
         "`strong` en el total",
         "Es el dato más importante"
        ]
       ]
      }
     },
     {
      "sub": "Comprobación: 536,36 + 81,82 = 618,18 € · 618,18 × 0,21 = 129,82 € · 618,18 + 129,82 = 748,00 €."
     }
    ]
   },
   {
    "id": "m8",
    "titulo": "M8 · Página de error 404",
    "bloques": [
     {
      "nota": "** Caso real:** la página que ve el usuario cuando un enlace está roto. Debe explicar qué ha pasado y ofrecer salidas: buscador, enlaces principales y volver al inicio. Incluye la estructura completa de página.",
      "tipo": "note"
     },
     {
      "live": {
       "titulo": "Pruébalo",
       "html": "<a href=\"#contenido\">Saltar al contenido</a>\n\n<header>\n  <a href=\"index.html\"><img src=\"recursos/logo.svg\" alt=\"Tienda DAW, ir al inicio\" width=\"160\" height=\"40\"></a>\n  <nav aria-label=\"Principal\">\n    <ul>\n      <li><a href=\"index.html\">Inicio</a></li>\n      <li><a href=\"productos.html\">Productos</a></li>\n      <li><a href=\"contacto.html\">Contacto</a></li>\n    </ul>\n  </nav>\n</header>\n\n<main id=\"contenido\">\n  <h1>Página no encontrada</h1>\n  <p>Puede que el enlace esté mal escrito o que la página ya no exista. <small>(Error 404)</small></p>\n\n  <search>\n    <form action=\"/buscar\" method=\"get\">\n      <label for=\"q\">Busca lo que necesitas</label>\n      <input id=\"q\" name=\"q\" type=\"search\" placeholder=\"Ej.: teclado mecánico\">\n      <button type=\"submit\">Buscar</button>\n    </form>\n  </search>\n\n  <h2>Quizá te interese</h2>\n  <ul>\n    <li><a href=\"productos.html#ofertas\">Ofertas de la semana</a></li>\n    <li><a href=\"faq.html\">Preguntas frecuentes</a></li>\n  </ul>\n</main>\n\n<footer>\n  <p><small>© 2026 Tienda DAW · <a href=\"privacidad.html\">Privacidad</a></small></p>\n</footer>"
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
         "Enlace \"Saltar al contenido\" el primero",
         "Quien navega con teclado no tiene que recorrer todo el menú"
        ],
        [
         "`search` + `form method=\"get\"`",
         "Buscar no modifica nada y la URL resultante (`/buscar?q=teclado`) se puede compartir"
        ],
        [
         "Logo enlazado con `alt` que dice adónde lleva",
         "Es una imagen **funcional**"
        ],
        [
         "Mensaje en lenguaje claro",
         "\"Error 404\" solo dice algo a los desarrolladores"
        ]
       ]
      }
     },
     {
      "consola": "┌─[ FIN DE TRANSMISIÓN ]─────────────────────────────────────────────────┐\n│  HTML Living Standard · validado con W3C Nu · capturas en Chromium     │\n└──────────────────────────────────────────────────────────── SYS.OK ───┘"
     }
    ]
   }
  ],
  "intro": [
   {
    "p": "Cada misión es una pieza real de una web, **solo con HTML** (estilos por defecto del navegador): primero se construye bien la estructura y luego se viste con CSS. Todas pasan el validador del W3C y tienes cada una como archivo completo en la carpeta [`demos/`](demos/) para abrirla en el navegador. El código muestra el contenido del `<body>`; el `<head>` es el de la [plantilla](@plantilla)."
   },
   {
    "tabla": {
     "cabs": [
      "ID",
      "Caso real",
      "Practica"
     ],
     "filas": [
      [
       "[M1](@m1)",
       "Ficha de producto de una tienda online",
       "`article`, `figure`, precios, `dl`, formulario de compra"
      ],
      [
       "[M2](@m2)",
       "Formulario de inscripción a un curso",
       "`fieldset`, tipos de `input`, validación nativa"
      ],
      [
       "[M3](@m3)",
       "Artículo de un blog técnico",
       "`article`, `header`/`footer` de artículo, `time`, `figure`, `blockquote`, `code`"
      ],
      [
       "[M4](@m4)",
       "Comparativa de planes de suscripción",
       "Tabla accesible con `th scope`"
      ],
      [
       "[M5](@m5)",
       "Página de contacto",
       "`address`, `mailto:`/`tel:`, formulario, `iframe`"
      ],
      [
       "[M6](@m6)",
       "Preguntas frecuentes (FAQ)",
       "`details` exclusivo con `name`"
      ],
      [
       "[M7](@m7)",
       "Factura",
       "Semántica de documento, `dl`, tabla con `tfoot`"
      ],
      [
       "[M8](@m8)",
       "Página de error 404",
       "Estructura de página completa, buscador con `GET`"
      ]
     ]
    }
   }
  ]
 }
};
  APP.register({ slug: "html", contenido: mods });
})();

/* Contenido de JavaScript (escrito para esta app; misma estructura que Java, con lo propio de JS). */
(function () {
  const mods = {
 "mod-00": {
  "resumen": "script · consola · comentarios · convenciones",
  "secciones": [
   {
    "id": "js-que-es",
    "titulo": "Qué es y dónde se ejecuta",
    "bloques": [
     {
      "p": "**JavaScript** es el lenguaje que da comportamiento a una página web: reacciona a clics, cambia el HTML y pide datos a un servidor. Se ejecuta en el navegador (cliente) y también fuera de él con **Node.js**. En esta guía se usa la versión moderna del lenguaje (ES2024) en el navegador."
     },
     {
      "p": "A diferencia de Java, **no se compila** ni hace falta declarar tipos: el navegador lee el código y lo ejecuta línea a línea. Por eso un error de sintaxis solo aparece cuando el navegador llega a esa línea."
     },
     {
      "tabla": {
       "cabs": [
        "",
        "Java",
        "JavaScript"
       ],
       "filas": [
        [
         "Tipos",
         "Estáticos: `int x = 5;`",
         "Dinámicos: `let x = 5;` (el valor tiene tipo, la variable no)"
        ],
        [
         "Ejecución",
         "Se compila a bytecode y corre en la JVM",
         "El navegador (o Node.js) lo interpreta directamente"
        ],
        [
         "Punto de entrada",
         "`public static void main`",
         "No hay: el código se ejecuta de arriba abajo al cargar"
        ],
        [
         "Clases obligatorias",
         "Sí, todo vive en una clase",
         "No: puedes escribir código suelto y funciones"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "js-esqueleto",
    "titulo": "Cómo se enlaza al HTML",
    "bloques": [
     {
      "p": "El JavaScript se escribe en un fichero `.js` y se enlaza desde el HTML con `<script>`. Con `defer` el navegador lo descarga mientras lee el HTML y lo ejecuta **cuando el DOM ya está completo**."
     },
     {
      "code": "<!DOCTYPE html>\n<html lang=\"es\">\n<head>\n  <meta charset=\"utf-8\">\n  <title>Mi primera página con JS</title>\n  <script src=\"js/app.js\" defer></script>\n</head>\n<body>\n  <h1 id=\"titulo\">Hola</h1>\n</body>\n</html>",
      "lang": "html",
      "titulo": "index.html"
     },
     {
      "code": "// js/app.js\nconsole.log(\"Hola desde JavaScript\");\ndocument.getElementById(\"titulo\").textContent = \"Hola, DAW\";",
      "lang": "js",
      "titulo": "js/app.js"
     },
     {
      "live": {
       "titulo": "Pruébalo: el primer programa",
       "js": "console.log(\"Hola, mundo\");\nconsole.log(\"2 + 3 =\", 2 + 3);",
       "alto": 60
      }
     },
     {
      "aviso": "Un `<script>` sin `defer` en el `<head>` se ejecuta **antes** de que existan los elementos del `<body>`: `document.getElementById(\"titulo\")` devolvería `null`. Usa siempre `defer` (o pon el script al final del `<body>`).",
      "tipo": "warning"
     }
    ]
   },
   {
    "id": "js-consola",
    "titulo": "La consola del navegador",
    "bloques": [
     {
      "p": "Se abre con `F12` → pestaña **Console**. Es tu mejor herramienta para probar código y ver errores. `console.log()` es el equivalente a `System.out.println()` de Java."
     },
     {
      "tabla": {
       "cabs": [
        "Método",
        "Para qué"
       ],
       "filas": [
        [
         "`console.log(a, b)`",
         "Muestra valores separados por espacios"
        ],
        [
         "`console.error(x)`",
         "Mensaje en rojo (errores)"
        ],
        [
         "`console.warn(x)`",
         "Mensaje en amarillo (avisos)"
        ],
        [
         "`console.table(array)`",
         "Muestra un array u objeto como tabla"
        ],
        [
         "`console.dir(obj)`",
         "Muestra las propiedades de un objeto"
        ],
        [
         "`console.clear()`",
         "Limpia la consola"
        ]
       ]
      }
     },
     {
      "live": {
       "titulo": "Pruébalo: tipos de mensaje",
       "js": "console.log(\"Mensaje normal\", 42, true);\nconsole.warn(\"Aviso\");\nconsole.error(\"Error\");\nconsole.table([\n  { nombre: \"Lucía\", edad: 22 },\n  { nombre: \"Marcos\", edad: 31 }\n]);",
       "alto": 60
      }
     }
    ]
   },
   {
    "id": "js-sintaxis",
    "titulo": "Sintaxis básica y convenciones",
    "bloques": [
     {
      "lista": [
       "Las **instrucciones** terminan con `;` (es opcional, pero se escribe siempre: evita sorpresas).",
       "**Mayúsculas y minúsculas** importan: `nombre` y `Nombre` son variables distintas.",
       "Variables y funciones en **camelCase**: `precioFinal`, `calcularTotal()`.",
       "Constantes \"de verdad\" (valores fijos del programa) en **MAYUSCULAS_CON_GUION**: `const IVA = 0.21;`.",
       "Clases en **PascalCase**: `class Cliente {}`.",
       "Cadenas con comillas dobles `\"…\"` o simples `'…'` (da igual, elige una y sé coherente). Las **comillas invertidas** (la tecla a la derecha de la `P`) permiten insertar variables dentro del texto."
      ]
     },
     {
      "code": "// Comentario de una línea\n\n/* Comentario\n   de varias líneas */\n\n/**\n * Comentario de documentación (JSDoc): lo entienden los editores.\n * @param {number} base Importe sin IVA\n * @returns {number} Importe con IVA\n */\nfunction conIva(base) {\n  return base * 1.21;\n}",
      "lang": "js"
     }
    ]
   }
  ]
 },
 "mod-01": {
  "resumen": "let · const · tipos primitivos · typeof · conversión",
  "secciones": [
   {
    "id": "js-variables",
    "titulo": "let, const y var",
    "bloques": [
     {
      "p": "Para guardar un valor se declara una variable. Hoy se usan **dos** palabras clave: `const` (no se puede reasignar) y `let` (sí). `var` es la forma antigua y no se usa en código nuevo."
     },
     {
      "tabla": {
       "cabs": [
        "Palabra",
        "Reasignable",
        "Ámbito",
        "Cuándo"
       ],
       "filas": [
        [
         "`const`",
         "No",
         "Bloque `{ }`",
         "**Por defecto.** Si el valor no va a cambiar"
        ],
        [
         "`let`",
         "Sí",
         "Bloque `{ }`",
         "Contadores, acumuladores, valores que cambian"
        ],
        [
         "`var`",
         "Sí",
         "Función (se \"escapa\" del bloque)",
         "Nunca en código nuevo"
        ]
       ]
      }
     },
     {
      "live": {
       "titulo": "Pruébalo: const frente a let",
       "js": "const IVA = 0.21;          // no cambiará\nlet total = 100;            // sí cambiará\ntotal = total * (1 + IVA);\nconsole.log(total);\n\nIVA = 0.10;                 // ← TypeError: Assignment to constant variable",
       "alto": 60
      }
     },
     {
      "nota": "`const` no significa \"valor inmutable\": significa que **la variable no se puede reasignar**. Un array o un objeto declarado con `const` sí puede modificarse por dentro (se ve en los módulos de arrays y objetos).",
      "tipo": "important"
     },
     {
      "aviso": "Una variable sin declarar (`precio = 5;` sin `let`) crea una variable **global** accidental. Activa `\"use strict\";` al inicio del fichero (o usa módulos) para que sea un error.",
      "tipo": "warning"
     }
    ]
   },
   {
    "id": "js-tipos",
    "titulo": "Los tipos primitivos",
    "bloques": [
     {
      "p": "En JavaScript la **variable** no tiene tipo; lo tiene el **valor**. Hay 7 tipos primitivos y todo lo demás son objetos."
     },
     {
      "tabla": {
       "cabs": [
        "Tipo",
        "Ejemplo",
        "Notas"
       ],
       "filas": [
        [
         "`number`",
         "`42`, `3.14`, `-7`, `NaN`, `Infinity`",
         "Un solo tipo para enteros y decimales (coma flotante de 64 bits)"
        ],
        [
         "`string`",
         "`\"hola\"`, `'hola'` o con comillas invertidas",
         "Texto. **Inmutable**"
        ],
        [
         "`boolean`",
         "`true`, `false`",
         "Verdadero o falso"
        ],
        [
         "`undefined`",
         "`undefined`",
         "Variable declarada **sin valor**"
        ],
        [
         "`null`",
         "`null`",
         "Ausencia de valor **puesta a propósito**"
        ],
        [
         "`bigint`",
         "`123n`",
         "Enteros sin límite de tamaño (poco habitual)"
        ],
        [
         "`symbol`",
         "`Symbol(\"id\")`",
         "Identificador único (uso avanzado)"
        ]
       ]
      }
     },
     {
      "live": {
       "titulo": "Pruébalo: typeof",
       "js": "console.log(typeof 42);          // \"number\"\nconsole.log(typeof \"hola\");      // \"string\"\nconsole.log(typeof true);        // \"boolean\"\nconsole.log(typeof undefined);   // \"undefined\"\nconsole.log(typeof null);        // \"object\"  ← error histórico del lenguaje\nconsole.log(typeof [1, 2]);      // \"object\"  (los arrays son objetos)\nconsole.log(typeof function () {}); // \"function\"",
       "alto": 90
      }
     },
     {
      "aviso": "`typeof null` devuelve `\"object\"`. Es un fallo histórico que no se puede corregir. Para comprobar `null` usa `valor === null`; para un array, `Array.isArray(valor)`.",
      "tipo": "warning"
     }
    ]
   },
   {
    "id": "js-valores",
    "titulo": "Valores por defecto y falsy",
    "bloques": [
     {
      "p": "Una variable declarada sin valor vale `undefined`. Al evaluar una condición, JavaScript convierte cualquier valor a booleano: unos valores cuentan como **falsy** (equivalen a `false`) y todo lo demás es **truthy**."
     },
     {
      "tabla": {
       "cabs": [
        "Falsy (solo estos 8)",
        "Truthy (todo lo demás)"
       ],
       "filas": [
        [
         "`false`, `0`, `-0`, `0n`",
         "`true`, cualquier número distinto de 0"
        ],
        [
         "`\"\"` (cadena vacía)",
         "`\"0\"`, `\"false\"`, `\" \"` (cualquier texto con algo)"
        ],
        [
         "`null`, `undefined`, `NaN`",
         "`[]` y `{}` (¡un array vacío es truthy!)"
        ]
       ]
      }
     },
     {
      "live": {
       "titulo": "Pruébalo: qué cuenta como verdadero",
       "js": "const valores = [0, \"\", null, undefined, NaN, \"0\", [], {}, -1];\nfor (const v of valores) {\n  console.log(String(JSON.stringify(v)).padEnd(10), \"→\", Boolean(v));\n}",
       "alto": 120
      }
     }
    ]
   },
   {
    "id": "js-valor-referencia",
    "titulo": "Valor frente a referencia",
    "bloques": [
     {
      "p": "Los primitivos se copian **por valor**. Los objetos (arrays, objetos literales, funciones) se copian **por referencia**: dos variables apuntan al mismo objeto en memoria."
     },
     {
      "live": {
       "titulo": "Pruébalo: copiar un número y copiar un array",
       "js": "let a = 5;\nlet b = a;       // copia del valor\nb = 10;\nconsole.log(a, b);        // 5 10\n\nconst x = [1, 2, 3];\nconst y = x;     // misma referencia, no una copia\ny.push(4);\nconsole.log(x);           // [1, 2, 3, 4]  ← x también cambió\nconsole.log(x === y);     // true",
       "alto": 90
      }
     }
    ]
   },
   {
    "id": "js-conversion",
    "titulo": "Conversión de tipos",
    "bloques": [
     {
      "p": "JavaScript convierte tipos solo en algunas operaciones (**coerción implícita**), y a veces el resultado sorprende. Convierte tú de forma **explícita**."
     },
     {
      "tabla": {
       "cabs": [
        "De → a",
        "Cómo",
        "Ejemplo",
        "Resultado"
       ],
       "filas": [
        [
         "Texto → número",
         "`Number(t)`",
         "`Number(\"42\")`",
         "`42`"
        ],
        [
         "Texto → entero",
         "`parseInt(t, 10)`",
         "`parseInt(\"42px\", 10)`",
         "`42` (ignora lo que sobra)"
        ],
        [
         "Texto → decimal",
         "`parseFloat(t)`",
         "`parseFloat(\"3.5kg\")`",
         "`3.5`"
        ],
        [
         "Texto no numérico",
         "`Number(t)`",
         "`Number(\"hola\")`",
         "`NaN`"
        ],
        [
         "Número → texto",
         "`String(n)` o `n.toString()`",
         "`String(42)`",
         "`\"42\"`"
        ],
        [
         "Cualquiera → boolean",
         "`Boolean(v)` o `!!v`",
         "`Boolean(\"\")`",
         "`false`"
        ]
       ]
      }
     },
     {
      "live": {
       "titulo": "Pruébalo: coerción implícita",
       "js": "console.log(\"5\" + 3);     // \"53\"  (el + concatena si hay un texto)\nconsole.log(\"5\" - 3);     // 2     (el - solo sabe restar números)\nconsole.log(\"5\" * \"2\");   // 10\nconsole.log(Number(\"3,5\"));   // NaN  (con coma no vale: usa punto)\nconsole.log(Number(\"\"));      // 0    (¡cadena vacía → 0!)\nconsole.log(Number(null), Number(undefined)); // 0 NaN",
       "alto": 100
      }
     },
     {
      "aviso": "Con el operador `+`, si **alguno** de los dos lados es texto, concatena. `\"5\" + 3` es `\"53\"`. Lo que escribe el usuario en un campo de formulario **siempre es texto**: conviértelo con `Number()` antes de calcular.",
      "tipo": "warning"
     }
    ]
   }
  ]
 },
 "mod-02": {
  "resumen": "aritméticos · comparación · lógicos · ?? · ?.",
  "secciones": [
   {
    "id": "js-aritmeticos",
    "titulo": "Aritméticos",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Operador",
        "Qué hace",
        "Ejemplo",
        "Resultado"
       ],
       "filas": [
        [
         "`+`",
         "Suma (o concatena texto)",
         "`7 + 2`",
         "`9`"
        ],
        [
         "`-`",
         "Resta",
         "`7 - 2`",
         "`5`"
        ],
        [
         "`*`",
         "Multiplica",
         "`7 * 2`",
         "`14`"
        ],
        [
         "`/`",
         "Divide (**siempre** da decimales)",
         "`7 / 2`",
         "`3.5`"
        ],
        [
         "`%`",
         "Resto de la división",
         "`7 % 2`",
         "`1`"
        ],
        [
         "`**`",
         "Potencia",
         "`2 ** 10`",
         "`1024`"
        ]
       ]
      }
     },
     {
      "aviso": "En JavaScript **no existe la división entera**: `7 / 2` es `3.5`, no `3`. Para quedarte con la parte entera usa `Math.trunc(7 / 2)` (o `Math.floor` si son positivos).",
      "tipo": "warning"
     },
     {
      "live": {
       "titulo": "Pruébalo: división y resto",
       "js": "console.log(7 / 2);              // 3.5\nconsole.log(Math.trunc(7 / 2));    // 3\nconsole.log(7 % 2);                // 1\nconsole.log(10 / 0, -10 / 0, 0 / 0); // Infinity -Infinity NaN",
       "alto": 70
      }
     }
    ]
   },
   {
    "id": "js-incremento",
    "titulo": "Incremento, decremento y asignación compuesta",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Operador",
        "Equivale a"
       ],
       "filas": [
        [
         "`x++` / `++x`",
         "`x = x + 1` (el prefijo devuelve el valor **después**, el sufijo **antes**)"
        ],
        [
         "`x--` / `--x`",
         "`x = x - 1`"
        ],
        [
         "`x += 5`",
         "`x = x + 5`"
        ],
        [
         "`x -= 5`, `x *= 2`, `x /= 2`, `x %= 3`, `x **= 2`",
         "Lo mismo con cada operador"
        ],
        [
         "`x ??= 0`, `x ||= 0`, `x &&= 0`",
         "Asigna solo si la condición se cumple (ver más abajo)"
        ]
       ]
      }
     },
     {
      "live": {
       "titulo": "Pruébalo: prefijo y sufijo",
       "js": "let a = 5;\nconsole.log(a++);  // 5  (devuelve y luego suma)\nconsole.log(a);    // 6\nconsole.log(++a);  // 7  (suma y luego devuelve)",
       "alto": 70
      }
     }
    ]
   },
   {
    "id": "js-comparacion",
    "titulo": "Comparación: == frente a ===",
    "bloques": [
     {
      "p": "Los operadores de comparación devuelven un `boolean`. Hay dos formas de igualdad y **solo una se usa**."
     },
     {
      "tabla": {
       "cabs": [
        "Operador",
        "Significado",
        "Ejemplo"
       ],
       "filas": [
        [
         "`===`",
         "**Igual estricto**: mismo valor **y** mismo tipo",
         "`5 === \"5\"` → `false`"
        ],
        [
         "`!==`",
         "Distinto estricto",
         "`5 !== \"5\"` → `true`"
        ],
        [
         "`==`",
         "Igual con coerción de tipos (evitar)",
         "`5 == \"5\"` → `true`"
        ],
        [
         "`<` `>` `<=` `>=`",
         "Orden (con texto compara alfabéticamente)",
         "`\"a\" < \"b\"` → `true`"
        ]
       ]
      }
     },
     {
      "aviso": "Usa siempre `===` y `!==`. El `==` convierte tipos antes de comparar y produce resultados como `0 == \"\"` → `true` o `null == undefined` → `true`.",
      "tipo": "warning"
     },
     {
      "live": {
       "titulo": "Pruébalo: las trampas del ==",
       "js": "console.log(0 == \"\");           // true   ← sorprendente\nconsole.log(0 === \"\");          // false\nconsole.log(null == undefined); // true\nconsole.log(null === undefined);// false\nconsole.log(NaN === NaN);       // false  ← NaN no es igual ni a sí mismo\nconsole.log(Number.isNaN(NaN)); // true   ← así se comprueba\nconsole.log([1] === [1]);       // false  ← dos arrays distintos",
       "alto": 120
      }
     }
    ]
   },
   {
    "id": "js-logicos",
    "titulo": "Lógicos y cortocircuito",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Operador",
        "Nombre",
        "Resultado"
       ],
       "filas": [
        [
         "`a && b`",
         "Y",
         "`true` si **ambos** son verdaderos"
        ],
        [
         "`a || b`",
         "O",
         "`true` si **alguno** es verdadero"
        ],
        [
         "`!a`",
         "NO",
         "Invierte el valor"
        ],
        [
         "`a ?? b`",
         "Coalescencia nula",
         "`a`, salvo que sea `null` o `undefined`: entonces `b`"
        ],
        [
         "`a?.b`",
         "Encadenado opcional",
         "`a.b`, pero si `a` es `null`/`undefined` devuelve `undefined` en lugar de dar error"
        ]
       ]
      }
     },
     {
      "p": "`&&` y `||` **no devuelven un booleano**: devuelven uno de los dos operandos. `a || b` devuelve `a` si es truthy y, si no, `b`; por eso se usa para valores por defecto."
     },
     {
      "live": {
       "titulo": "Pruébalo: valores por defecto",
       "js": "const nombre = \"\" || \"Anónimo\";\nconsole.log(nombre);           // \"Anónimo\"  (|| trata \"\" como falsy)\n\nconst cantidad = 0 ?? 10;\nconsole.log(cantidad);         // 0          (?? solo reemplaza null/undefined)\n\nconst usuario = null;\nconsole.log(usuario?.nombre);  // undefined  (sin error)\nconsole.log(usuario.nombre);   // TypeError: Cannot read properties of null",
       "alto": 90
      }
     },
     {
      "nota": "Regla práctica: `||` si quieres sustituir **cualquier valor falsy**; `??` si solo quieres sustituir `null` o `undefined` (así un `0` o un `\"\"` válidos se respetan).",
      "tipo": "tip"
     }
    ]
   },
   {
    "id": "js-ternario",
    "titulo": "Ternario",
    "bloques": [
     {
      "code": "const edad = 20;\nconst tipo = edad >= 18 ? \"adulto\" : \"menor\";   // condición ? siEsTrue : siEsFalse",
      "lang": "js"
     },
     {
      "p": "Úsalo para **elegir un valor** entre dos. Si tiene que ejecutar varias instrucciones, usa un `if`."
     }
    ]
   },
   {
    "id": "js-precedencia",
    "titulo": "Precedencia (de mayor a menor)",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Nivel",
        "Operadores"
       ],
       "filas": [
        [
         "1",
         "`( )` paréntesis, `a.b`, `a?.b`, `f()`"
        ],
        [
         "2",
         "`!`, `++`, `--`, `typeof`, `-x` (unario)"
        ],
        [
         "3",
         "`**`"
        ],
        [
         "4",
         "`*` `/` `%`"
        ],
        [
         "5",
         "`+` `-`"
        ],
        [
         "6",
         "`<` `>` `<=` `>=`"
        ],
        [
         "7",
         "`===` `!==` `==` `!=`"
        ],
        [
         "8",
         "`&&`"
        ],
        [
         "9",
         "`||` `??`"
        ],
        [
         "10",
         "`? :` ternario"
        ],
        [
         "11",
         "`=` `+=` `-=` … asignación"
        ]
       ]
      }
     },
     {
      "nota": "`&&` se evalúa antes que `||`. En caso de duda, **usa paréntesis**: `(a || b) && c`. No mezcles `??` con `||` o `&&` sin paréntesis: es un error de sintaxis.",
      "tipo": "tip"
     }
    ]
   }
  ]
 },
 "mod-03": {
  "resumen": "console · alert/prompt · plantillas · formato",
  "secciones": [
   {
    "id": "js-salida",
    "titulo": "Mostrar información",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Dónde",
        "Cómo",
        "Para qué"
       ],
       "filas": [
        [
         "Consola",
         "`console.log(x)`",
         "Depurar mientras programas"
        ],
        [
         "Ventana",
         "`alert(\"texto\")`",
         "Aviso que bloquea la página (equivale a `JOptionPane.showMessageDialog`)"
        ],
        [
         "Página",
         "`elemento.textContent = \"texto\"`",
         "Mostrar el resultado en la propia web (módulo DOM)"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "js-entrada",
    "titulo": "Pedir datos",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Función",
        "Devuelve",
        "Si el usuario cancela"
       ],
       "filas": [
        [
         "`prompt(\"Pregunta\", \"valor inicial\")`",
         "Siempre **texto** (`string`)",
         "`null`"
        ],
        [
         "`confirm(\"¿Seguro?\")`",
         "`true` (Aceptar) o `false` (Cancelar)",
         "`false`"
        ]
       ]
      }
     },
     {
      "code": "const texto = prompt(\"¿Cuántas unidades?\");\nif (texto === null) {\n  console.log(\"El usuario canceló\");\n} else {\n  const unidades = Number(texto);\n  alert(\"Total: \" + unidades * 2.5 + \" €\");\n}",
      "lang": "js"
     },
     {
      "aviso": "`prompt` devuelve **texto** aunque escriban un número, y `null` si cancelan. Convierte con `Number()` y comprueba `Number.isNaN(n)` antes de calcular. En una web real se usan formularios en lugar de `prompt` (módulo Eventos).",
      "tipo": "warning"
     }
    ]
   },
   {
    "id": "js-plantillas",
    "titulo": "Plantillas de texto (template literals)",
    "bloques": [
     {
      "p": "Entre **comillas invertidas** puedes insertar cualquier expresión con `${ }` y escribir varias líneas. Sustituye a la concatenación con `+`."
     },
     {
      "live": {
       "titulo": "Pruébalo: plantillas",
       "js": "const producto = \"Teclado\";\nconst precio = 49.9;\nconst unidades = 3;\n\nconsole.log(\"Producto: \" + producto + \", total: \" + precio * unidades);   // forma antigua\nconsole.log(`Producto: ${producto}, total: ${precio * unidades}`);       // plantilla\n\nconsole.log(`Línea 1\nLínea 2`);",
       "alto": 90
      }
     }
    ]
   },
   {
    "id": "js-formato",
    "titulo": "Dar formato a números y fechas",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Necesito…",
        "Cómo",
        "Ejemplo → resultado"
       ],
       "filas": [
        [
         "Dos decimales",
         "`n.toFixed(2)` (devuelve **texto**)",
         "`(3.14159).toFixed(2)` → `\"3.14\"`"
        ],
        [
         "Moneda en español",
         "`n.toLocaleString(\"es-ES\", { style: \"currency\", currency: \"EUR\" })`",
         "`1234.5` → `\"1234,50 €\"`"
        ],
        [
         "Miles con punto",
         "`n.toLocaleString(\"es-ES\")`",
         "`1234567` → `\"1.234.567\"`"
        ],
        [
         "Rellenar con ceros",
         "`String(n).padStart(2, \"0\")`",
         "`\"7\"` → `\"07\"`"
        ],
        [
         "Fecha legible",
         "`fecha.toLocaleDateString(\"es-ES\")`",
         "`22/10/2026`"
        ]
       ]
      }
     },
     {
      "live": {
       "titulo": "Pruébalo: formato",
       "js": "const precio = 1234.5;\nconsole.log(precio.toFixed(2));\nconsole.log(precio.toLocaleString(\"es-ES\", { style: \"currency\", currency: \"EUR\" }));\nconsole.log((0.256).toLocaleString(\"es-ES\", { style: \"percent\" }));\nconsole.log(new Date(2026, 9, 22).toLocaleDateString(\"es-ES\", { dateStyle: \"full\" }));",
       "alto": 90
      }
     },
     {
      "aviso": "`toFixed` devuelve un **texto**, no un número: `(1.5).toFixed(2) + 1` es `\"1.501\"`. Úsalo solo al mostrar, no en medio de un cálculo.",
      "tipo": "warning"
     }
    ]
   }
  ]
 },
 "mod-04": {
  "resumen": "if · switch · for · while · do-while · for…of · break/continue",
  "secciones": [
   {
    "id": "js-if",
    "titulo": "if / else if / else",
    "bloques": [
     {
      "live": {
       "titulo": "Pruébalo: nota con if encadenados",
       "js": "const nota = 7.5;\n\nif (nota >= 9) {\n  console.log(\"Sobresaliente\");\n} else if (nota >= 7) {\n  console.log(\"Notable\");\n} else if (nota >= 5) {\n  console.log(\"Aprobado\");\n} else {\n  console.log(\"Suspenso\");\n}",
       "alto": 60
      }
     },
     {
      "nota": "Se evalúan **en orden** y se ejecuta solo la primera rama cuya condición sea verdadera. Ordena de lo más restrictivo a lo más general.",
      "tipo": "tip"
     }
    ]
   },
   {
    "id": "js-switch",
    "titulo": "switch",
    "bloques": [
     {
      "p": "Compara una variable con varios valores usando `===`. Cada `case` necesita su `break`; si lo olvidas, **sigue ejecutando el siguiente caso** (fall-through)."
     },
     {
      "live": {
       "titulo": "Pruébalo: días de la semana",
       "js": "const dia = 6;\nswitch (dia) {\n  case 6:\n  case 7:\n    console.log(\"Fin de semana\");\n    break;\n  case 1: case 2: case 3: case 4: case 5:\n    console.log(\"Laborable\");\n    break;\n  default:\n    console.log(\"Día no válido\");\n}",
       "alto": 60
      }
     }
    ]
   },
   {
    "id": "js-for",
    "titulo": "for, while y do-while",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Bucle",
        "Cuándo",
        "Sintaxis"
       ],
       "filas": [
        [
         "`for`",
         "Sé cuántas iteraciones hay",
         "`for (let i = 0; i < n; i++) { … }`"
        ],
        [
         "`while`",
         "Depende de una condición; puede no entrar nunca",
         "`while (condición) { … }`"
        ],
        [
         "`do…while`",
         "Debe ejecutarse **al menos una vez**",
         "`do { … } while (condición);`"
        ]
       ]
      }
     },
     {
      "live": {
       "titulo": "Pruébalo: tabla del 7 con for",
       "js": "for (let i = 1; i <= 10; i++) {\n  console.log(`7 x ${i} = ${7 * i}`);\n}",
       "alto": 150
      }
     },
     {
      "live": {
       "titulo": "Pruébalo: while y do-while",
       "js": "let n = 5;\nwhile (n > 0) {\n  console.log(\"cuenta atrás:\", n);\n  n--;\n}\n\nlet intentos = 0;\ndo {\n  intentos++;\n  console.log(\"intento\", intentos);\n} while (intentos < 3);",
       "alto": 150
      }
     },
     {
      "aviso": "Si la condición de un `while` nunca se vuelve falsa, el bucle es infinito y **bloquea la pestaña**. Comprueba siempre que algo dentro del bucle cambia la condición (por eso el editor ejecuta el JS solo al pulsar «Ejecutar»).",
      "tipo": "warning"
     }
    ]
   },
   {
    "id": "js-for-of",
    "titulo": "for…of y for…in",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Bucle",
        "Recorre",
        "Ejemplo"
       ],
       "filas": [
        [
         "`for (const x of coleccion)`",
         "Los **valores** de un array, string, Set o Map",
         "`for (const fruta of frutas)`"
        ],
        [
         "`for (const clave in objeto)`",
         "Las **claves** de un objeto",
         "`for (const k in persona)`"
        ]
       ]
      }
     },
     {
      "live": {
       "titulo": "Pruébalo: for…of y for…in",
       "js": "const frutas = [\"manzana\", \"pera\", \"uva\"];\nfor (const fruta of frutas) {\n  console.log(fruta);\n}\n\nconst persona = { nombre: \"Lucía\", edad: 22 };\nfor (const clave in persona) {\n  console.log(clave, \"=\", persona[clave]);\n}",
       "alto": 130
      }
     },
     {
      "aviso": "No uses `for…in` con arrays: recorre **índices como texto** y puede incluir propiedades añadidas. Para arrays, `for…of` o `forEach`.",
      "tipo": "warning"
     }
    ]
   },
   {
    "id": "js-break",
    "titulo": "break, continue y bucles anidados",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Instrucción",
        "Efecto"
       ],
       "filas": [
        [
         "`break`",
         "Sale del bucle (o del `switch`) inmediatamente"
        ],
        [
         "`continue`",
         "Salta a la siguiente iteración"
        ],
        [
         "Etiqueta (`externo: for …` + `break externo`)",
         "Sale de un bucle exterior desde uno interior (se usa poco)"
        ]
       ]
      }
     },
     {
      "live": {
       "titulo": "Pruébalo: buscar el primer múltiplo y saltar impares",
       "js": "for (let i = 1; i <= 20; i++) {\n  if (i % 2 !== 0) continue;      // salta los impares\n  if (i % 7 === 0) {\n    console.log(\"primer múltiplo de 14:\", i);\n    break;                         // deja de buscar\n  }\n}\n\nfor (let fila = 1; fila <= 3; fila++) {      // bucles anidados\n  let linea = \"\";\n  for (let col = 1; col <= 4; col++) {\n    linea += fila * col + \"\\t\";\n  }\n  console.log(linea);\n}",
       "alto": 130
      }
     }
    ]
   }
  ]
 },
 "mod-05": {
  "resumen": "condicional · bucle · tipo de dato · colección · texto",
  "secciones": [
   {
    "id": "js-eleg-condicional",
    "titulo": "Condicional",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Situación",
        "Usa"
       ],
       "filas": [
        [
         "Una condición, dos caminos",
         "`if / else`"
        ],
        [
         "Varios rangos o condiciones distintas",
         "`if / else if / else`"
        ],
        [
         "Una variable con **valores concretos** (menú, día, opción)",
         "`switch`"
        ],
        [
         "Elegir **un valor** entre dos en una expresión",
         "Ternario `?:`"
        ],
        [
         "Valor por defecto si falta un dato",
         "`??` o `||`"
        ],
        [
         "Ejecutar algo solo si una condición es cierta, en una línea",
         "`condicion && accion()`"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "js-eleg-bucle",
    "titulo": "Bucle",
    "bloques": [
     {
      "consola": "¿Sé cuántas iteraciones habrá antes de empezar?\n ├─ Sí\n │   ¿Necesito el índice o modificar elementos?\n │    ├─ Sí ─────────────────────────────► for clásico\n │    └─ No, solo leer cada uno ─────────► for…of\n └─ No, depende de lo que pase\n     ¿Tiene que ejecutarse al menos una vez?\n      ├─ Sí: menú, pedir un dato ────────► do…while\n      └─ No: puede que nunca entre ──────► while"
     },
     {
      "tabla": {
       "cabs": [
        "Quiero…",
        "Usa"
       ],
       "filas": [
        [
         "Recorrer un array con transformación",
         "`map`, `filter`, `reduce` (módulo Métodos de array)"
        ],
        [
         "Recorrer las claves y valores de un objeto",
         "`for (const [k, v] of Object.entries(obj))`"
        ],
        [
         "Repetir algo cada cierto tiempo",
         "`setInterval` (módulo Asincronía)"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "js-eleg-tipo",
    "titulo": "Tipo de dato",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Necesito guardar…",
        "Uso"
       ],
       "filas": [
        [
         "Un número (entero o decimal)",
         "`number`"
        ],
        [
         "Un entero enorme (más de 15 cifras exactas)",
         "`bigint`"
        ],
        [
         "Texto",
         "`string`"
        ],
        [
         "Sí o no",
         "`boolean`"
        ],
        [
         "\"Todavía no hay valor\" a propósito",
         "`null`"
        ],
        [
         "Un dato con varias propiedades (cliente, producto)",
         "Objeto `{ … }`"
        ],
        [
         "Una lista ordenada de valores",
         "Array `[ … ]`"
        ],
        [
         "Valores únicos sin repetir",
         "`Set`"
        ],
        [
         "Pares clave → valor con claves de cualquier tipo",
         "`Map`"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "js-eleg-coleccion",
    "titulo": "Colección",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Colección",
        "Orden",
        "Repetidos",
        "Acceso",
        "Úsala para"
       ],
       "filas": [
        [
         "Array `[ ]`",
         "Por posición",
         "Sí",
         "`a[0]`",
         "Listas, carrito, resultados"
        ],
        [
         "Objeto `{ }`",
         "Por inserción (claves texto)",
         "No (claves únicas)",
         "`o.clave`",
         "Un registro: cliente, producto"
        ],
        [
         "`Set`",
         "Por inserción",
         "No",
         "`s.has(x)`",
         "Eliminar duplicados, pertenencia"
        ],
        [
         "`Map`",
         "Por inserción",
         "Claves únicas",
         "`m.get(k)`",
         "Diccionarios, contadores"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "js-eleg-texto",
    "titulo": "Texto",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Quiero…",
        "Usa"
       ],
       "filas": [
        [
         "Comprobar si contiene algo",
         "`includes`, `startsWith`, `endsWith`"
        ],
        [
         "Saber dónde está",
         "`indexOf`"
        ],
        [
         "Cortar un trozo",
         "`slice(inicio, fin)`"
        ],
        [
         "Trocear por un separador",
         "`split(\",\")`"
        ],
        [
         "Unir un array en texto",
         "`join(\", \")`"
        ],
        [
         "Sustituir",
         "`replace` (una vez) · `replaceAll` (todas)"
        ],
        [
         "Quitar espacios de los extremos",
         "`trim()`"
        ],
        [
         "Validar un formato (email, DNI)",
         "Expresión regular + `test()`"
        ]
       ]
      }
     }
    ]
   }
  ]
 },
 "mod-06": {
  "resumen": "índices · métodos · comparar · split/join · patrones",
  "secciones": [
   {
    "id": "js-string-indices",
    "titulo": "Índices y longitud",
    "bloques": [
     {
      "p": "Un `string` es una secuencia de caracteres numerados desde **0**. Es **inmutable**: los métodos no modifican el original, **devuelven un texto nuevo**."
     },
     {
      "consola": "texto = \"DAW 2026\"\níndice:   0 1 2 3 4 5 6 7\ncarácter: D A W _ 2 0 2 6      length = 8\n                               último índice = length - 1"
     },
     {
      "live": {
       "titulo": "Pruébalo: acceder a caracteres",
       "js": "const t = \"DAW 2026\";\nconsole.log(t.length);        // 8\nconsole.log(t[0], t.at(-1));  // D 6   (at(-1) = el último)\nconsole.log(t.charAt(1));     // \"A\"\nt[0] = \"X\";                   // no hace nada (inmutable)\nconsole.log(t);               // \"DAW 2026\"",
       "alto": 90
      }
     }
    ]
   },
   {
    "id": "js-string-metodos",
    "titulo": "Métodos más usados",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Quiero…",
        "Método",
        "Ejemplo → resultado"
       ],
       "filas": [
        [
         "Mayúsculas / minúsculas",
         "`toUpperCase()` · `toLowerCase()`",
         "`\"Hola\".toUpperCase()` → `\"HOLA\"`"
        ],
        [
         "Quitar espacios de los extremos",
         "`trim()` · `trimStart()` · `trimEnd()`",
         "`\"  ok \".trim()` → `\"ok\"`"
        ],
        [
         "¿Contiene…?",
         "`includes(x)` · `startsWith(x)` · `endsWith(x)`",
         "`\"correo@x.es\".includes(\"@\")` → `true`"
        ],
        [
         "Posición de…",
         "`indexOf(x)` (`-1` si no está) · `lastIndexOf(x)`",
         "`\"banana\".indexOf(\"an\")` → `1`"
        ],
        [
         "Extraer un trozo",
         "`slice(inicio, fin)` (fin no incluido)",
         "`\"abcdef\".slice(1, 4)` → `\"bcd\"`"
        ],
        [
         "Sustituir",
         "`replace(a, b)` (la primera) · `replaceAll(a, b)`",
         "`\"a-b-c\".replaceAll(\"-\", \"\")` → `\"abc\"`"
        ],
        [
         "Repetir",
         "`repeat(n)`",
         "`\"ab\".repeat(3)` → `\"ababab\"`"
        ],
        [
         "Rellenar",
         "`padStart(n, c)` · `padEnd(n, c)`",
         "`\"5\".padStart(3, \"0\")` → `\"005\"`"
        ],
        [
         "Trocear en array",
         "`split(separador)`",
         "`\"a,b,c\".split(\",\")` → `[\"a\",\"b\",\"c\"]`"
        ]
       ]
      }
     },
     {
      "live": {
       "titulo": "Pruébalo: métodos de texto",
       "js": "const email = \"  David.Ruiz@Correo.ES \";\nconst limpio = email.trim().toLowerCase();\nconsole.log(limpio);                        // david.ruiz@correo.es\nconsole.log(limpio.includes(\"@\"));          // true\nconst pos = limpio.indexOf(\"@\");\nconsole.log(limpio.slice(0, pos));          // david.ruiz  (usuario)\nconsole.log(limpio.slice(pos + 1));         // correo.es   (dominio)",
       "alto": 110
      }
     },
     {
      "aviso": "`indexOf` devuelve `-1` si no encuentra nada, y **`-1` es truthy**. `if (texto.indexOf(\"x\"))` falla; escribe `if (texto.indexOf(\"x\") !== -1)` o, mejor, `if (texto.includes(\"x\"))`.",
      "tipo": "warning"
     },
     {
      "aviso": "`replace(\"a\", \"b\")` con un texto cambia **solo la primera** coincidencia. Para cambiarlas todas, `replaceAll`.",
      "tipo": "warning"
     }
    ]
   },
   {
    "id": "js-string-comparar",
    "titulo": "Comparar textos",
    "bloques": [
     {
      "p": "Con `===` se comparan **valores**, no referencias (a diferencia de `==` en Java con objetos `String`, donde había que usar `equals`). Distingue mayúsculas de minúsculas."
     },
     {
      "live": {
       "titulo": "Pruébalo: comparar",
       "js": "console.log(\"daw\" === \"daw\");               // true\nconsole.log(\"DAW\" === \"daw\");               // false\nconsole.log(\"DAW\".toLowerCase() === \"daw\"); // true  (comparar sin distinguir mayúsculas)\nconsole.log(\"a\".localeCompare(\"b\"));        // -1    (a va antes que b)\nconsole.log([\"ñu\", \"zorro\", \"avión\"].sort((x, y) => x.localeCompare(y, \"es\")));",
       "alto": 100
      }
     }
    ]
   },
   {
    "id": "js-string-split",
    "titulo": "split y join",
    "bloques": [
     {
      "live": {
       "titulo": "Pruébalo: de texto a array y de vuelta",
       "js": "const frase = \"el que la sigue la consigue\";\nconst palabras = frase.split(\" \");\nconsole.log(palabras);              // array de 6 palabras\nconsole.log(palabras.length);       // 6\nconsole.log(palabras.join(\"-\"));    // el-que-la-sigue-la-consigue\nconsole.log(\"hola\".split(\"\"));      // [\"h\",\"o\",\"l\",\"a\"]  (letra a letra)",
       "alto": 130
      }
     }
    ]
   },
   {
    "id": "js-string-patrones",
    "titulo": "Patrones típicos con texto",
    "bloques": [
     {
      "live": {
       "titulo": "Pruébalo: invertir, contar vocales, capitalizar, palíndromo",
       "js": "const invertir = (t) => t.split(\"\").reverse().join(\"\");\n\nconst contarVocales = (t) =>\n  [...t.toLowerCase()].filter((c) => \"aeiou\".includes(c)).length;\n\nconst capitalizar = (t) => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();\n\nconst esPalindromo = (t) => {\n  const limpio = t.toLowerCase().replaceAll(\" \", \"\");\n  return limpio === invertir(limpio);\n};\n\nconsole.log(invertir(\"hola\"));              // aloh\nconsole.log(contarVocales(\"murciélago\"));   // 5\nconsole.log(capitalizar(\"dAvId\"));          // David\nconsole.log(esPalindromo(\"anita lava la tina\")); // true",
       "alto": 130
      }
     },
     {
      "nota": "`[...texto]` convierte el texto en un array de caracteres (y respeta emojis y letras con tilde compuestas mejor que `split(\"\")`).",
      "tipo": "tip"
     }
    ]
   },
   {
    "id": "js-string-regex",
    "titulo": "Expresiones regulares (lo básico)",
    "bloques": [
     {
      "p": "Una **expresión regular** describe un patrón de texto. Se escribe entre barras `/…/` y se prueba con `test()`."
     },
     {
      "tabla": {
       "cabs": [
        "Patrón",
        "Significa"
       ],
       "filas": [
        [
         "`\\d`",
         "Un dígito (0-9)"
        ],
        [
         "`\\w`",
         "Letra, dígito o guion bajo"
        ],
        [
         "`.`",
         "Cualquier carácter"
        ],
        [
         "`+` · `*` · `?`",
         "Una o más · cero o más · cero o una"
        ],
        [
         "`{3}` · `{2,4}`",
         "Exactamente 3 · entre 2 y 4"
        ],
        [
         "`^` · `$`",
         "Inicio y fin del texto"
        ],
        [
         "`[A-Z]` · `[^0-9]`",
         "Un carácter de la lista · cualquiera que **no** sea de la lista"
        ]
       ]
      }
     },
     {
      "live": {
       "titulo": "Pruébalo: validar un DNI y un código postal",
       "js": "const dni = /^\\d{8}[A-Z]$/;\nconst cp  = /^\\d{5}$/;\n\nconsole.log(dni.test(\"12345678Z\"));   // true\nconsole.log(dni.test(\"1234567Z\"));    // false\nconsole.log(cp.test(\"28049\"));        // true\nconsole.log(\"a1b22c333\".match(/\\d+/g)); // [\"1\",\"22\",\"333\"]",
       "alto": 90
      }
     }
    ]
   }
  ]
 },
 "mod-07": {
  "resumen": "Number · división entera · % · trampas · BigInt",
  "secciones": [
   {
    "id": "js-num-base",
    "titulo": "Un solo tipo: number",
    "bloques": [
     {
      "p": "JavaScript no distingue entre `int` y `double`: todos los números son de **coma flotante de 64 bits**. Los enteros son exactos hasta `Number.MAX_SAFE_INTEGER` (9 007 199 254 740 991)."
     },
     {
      "tabla": {
       "cabs": [
        "Quiero…",
        "Cómo"
       ],
       "filas": [
        [
         "¿Es un número válido?",
         "`Number.isFinite(x)` (no es `NaN` ni `Infinity`)"
        ],
        [
         "¿Es un entero?",
         "`Number.isInteger(x)`"
        ],
        [
         "¿Es `NaN`?",
         "`Number.isNaN(x)` (**nunca** `x === NaN`)"
        ],
        [
         "Valor máximo / mínimo seguro",
         "`Number.MAX_SAFE_INTEGER` · `Number.MIN_SAFE_INTEGER`"
        ]
       ]
      }
     },
     {
      "live": {
       "titulo": "Pruébalo: comprobaciones",
       "js": "console.log(Number.isInteger(5), Number.isInteger(5.5)); // true false\nconsole.log(Number.isFinite(1 / 0));                       // false\nconsole.log(Number.isNaN(Number(\"abc\")));                  // true\nconsole.log(Number.MAX_SAFE_INTEGER);",
       "alto": 80
      }
     }
    ]
   },
   {
    "id": "js-num-division",
    "titulo": "División entera y módulo: los dos grandes aliados",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Operación",
        "Código",
        "Ejemplo (n = 7)"
       ],
       "filas": [
        [
         "División entera",
         "`Math.trunc(n / d)`",
         "`Math.trunc(7 / 2)` → `3`"
        ],
        [
         "Resto",
         "`n % d`",
         "`7 % 2` → `1`"
        ],
        [
         "¿Es par?",
         "`n % 2 === 0`",
         "`7 % 2 === 0` → `false`"
        ],
        [
         "¿Es múltiplo de 5?",
         "`n % 5 === 0`",
         ""
        ],
        [
         "Última cifra",
         "`n % 10`",
         "`1234 % 10` → `4`"
        ],
        [
         "Quitar la última cifra",
         "`Math.trunc(n / 10)`",
         "`Math.trunc(1234 / 10)` → `123`"
        ]
       ]
      }
     },
     {
      "live": {
       "titulo": "Pruébalo: sumar las cifras de un número",
       "js": "function sumaCifras(n) {\n  let suma = 0;\n  while (n > 0) {\n    suma += n % 10;          // última cifra\n    n = Math.trunc(n / 10);  // quitarla\n  }\n  return suma;\n}\nconsole.log(sumaCifras(2026)); // 10",
       "alto": 60
      }
     }
    ]
   },
   {
    "id": "js-num-patrones",
    "titulo": "Patrones típicos con números",
    "bloques": [
     {
      "live": {
       "titulo": "Pruébalo: primo, factorial, máximo de una lista",
       "js": "const esPrimo = (n) => {\n  if (n < 2) return false;\n  for (let i = 2; i <= Math.sqrt(n); i++) {\n    if (n % i === 0) return false;\n  }\n  return true;\n};\n\nconst factorial = (n) => (n <= 1 ? 1 : n * factorial(n - 1));\n\nconst numeros = [4, 19, 7, 12];\nconsole.log(esPrimo(17), esPrimo(21));   // true false\nconsole.log(factorial(5));               // 120\nconsole.log(Math.max(...numeros));       // 19",
       "alto": 100
      }
     }
    ]
   },
   {
    "id": "js-num-trampas",
    "titulo": "Trampas con números",
    "bloques": [
     {
      "aviso": "**Los decimales no son exactos.** `0.1 + 0.2` da `0.30000000000000004`. Para dinero, trabaja en **céntimos (enteros)** o redondea al mostrar con `toFixed(2)`.",
      "tipo": "warning"
     },
     {
      "live": {
       "titulo": "Pruébalo: las trampas",
       "js": "console.log(0.1 + 0.2);                 // 0.30000000000000004\nconsole.log(0.1 + 0.2 === 0.3);          // false\nconsole.log(Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON); // true (comparar con tolerancia)\nconsole.log(9007199254740993);           // 9007199254740992 (pierde precisión)\nconsole.log(9007199254740993n);          // 9007199254740993n (BigInt, exacto)\nconsole.log(10 / 3);                     // 3.3333333333333335\nconsole.log(+\"12\" + +\"3\");               // 15 (el + unario convierte a número)",
       "alto": 130
      }
     },
     {
      "nota": "`BigInt` (`123n`) permite enteros enormes, pero **no se puede mezclar con `number`**: `5n + 1` da `TypeError`. Conviértelo con `Number()` o `BigInt()`.",
      "tipo": "important"
     }
    ]
   }
  ]
 },
 "mod-08": {
  "resumen": "Math · aleatorios · redondeos",
  "secciones": [
   {
    "id": "js-math",
    "titulo": "El objeto Math (no necesita import)",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Método",
        "Qué hace",
        "Ejemplo → resultado"
       ],
       "filas": [
        [
         "`Math.round(x)`",
         "Redondea al entero más cercano",
         "`Math.round(2.5)` → `3`"
        ],
        [
         "`Math.floor(x)`",
         "Redondea **hacia abajo**",
         "`Math.floor(-2.5)` → `-3`"
        ],
        [
         "`Math.ceil(x)`",
         "Redondea **hacia arriba**",
         "`Math.ceil(2.1)` → `3`"
        ],
        [
         "`Math.trunc(x)`",
         "Quita los decimales",
         "`Math.trunc(-2.9)` → `-2`"
        ],
        [
         "`Math.abs(x)`",
         "Valor absoluto",
         "`Math.abs(-4)` → `4`"
        ],
        [
         "`Math.max(a, b, …)` · `Math.min(…)`",
         "Mayor / menor",
         "`Math.max(3, 9, 5)` → `9`"
        ],
        [
         "`Math.pow(b, e)` o `b ** e`",
         "Potencia",
         "`2 ** 8` → `256`"
        ],
        [
         "`Math.sqrt(x)`",
         "Raíz cuadrada",
         "`Math.sqrt(81)` → `9`"
        ],
        [
         "`Math.PI`",
         "El número π",
         "`3.141592653589793`"
        ]
       ]
      }
     },
     {
      "live": {
       "titulo": "Pruébalo: redondeos",
       "js": "console.log(Math.round(2.4), Math.round(2.5), Math.round(-2.5)); // 2 3 -2\nconsole.log(Math.floor(2.9), Math.ceil(2.1), Math.trunc(-2.9));  // 2 3 -2\nconst mayor = Math.max(...[4, 19, 7]);\nconsole.log(mayor);\n// redondear a 2 decimales\nconsole.log(Math.round(3.14159 * 100) / 100);",
       "alto": 90
      }
     }
    ]
   },
   {
    "id": "js-aleatorios",
    "titulo": "Números aleatorios",
    "bloques": [
     {
      "p": "`Math.random()` devuelve un decimal entre `0` (incluido) y `1` (**no incluido**). A partir de él se construye cualquier rango."
     },
     {
      "tabla": {
       "cabs": [
        "Quiero…",
        "Fórmula"
       ],
       "filas": [
        [
         "Entero entre `0` y `n - 1`",
         "`Math.floor(Math.random() * n)`"
        ],
        [
         "Entero entre `min` y `max` (ambos incluidos)",
         "`Math.floor(Math.random() * (max - min + 1)) + min`"
        ],
        [
         "Elemento aleatorio de un array",
         "`lista[Math.floor(Math.random() * lista.length)]`"
        ],
        [
         "Identificador único",
         "`crypto.randomUUID()`"
        ]
       ]
      }
     },
     {
      "live": {
       "titulo": "Pruébalo: dados y elemento al azar",
       "js": "const entre = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;\n\nconsole.log(\"dado:\", entre(1, 6));\nconst premios = [\"café\", \"libro\", \"nada\", \"entrada\"];\nconsole.log(\"premio:\", premios[entre(0, premios.length - 1)]);\nconsole.log(\"id:\", crypto.randomUUID());",
       "alto": 90
      }
     },
     {
      "nota": "`Math.random()` **no es seguro** para contraseñas ni tokens. Para eso se usa `crypto.getRandomValues()`.",
      "tipo": "important"
     }
    ]
   },
   {
    "id": "js-barajar",
    "titulo": "Barajar un array",
    "bloques": [
     {
      "live": {
       "titulo": "Pruébalo: algoritmo de Fisher-Yates",
       "js": "function barajar(lista) {\n  const copia = [...lista];                       // no modifica el original\n  for (let i = copia.length - 1; i > 0; i--) {\n    const j = Math.floor(Math.random() * (i + 1));\n    [copia[i], copia[j]] = [copia[j], copia[i]];  // intercambio\n  }\n  return copia;\n}\nconsole.log(barajar([1, 2, 3, 4, 5]));",
       "alto": 60
      }
     },
     {
      "aviso": "`lista.sort(() => Math.random() - 0.5)` **no baraja bien** (el resultado está sesgado). Usa Fisher-Yates.",
      "tipo": "warning"
     }
    ]
   }
  ]
 },
 "mod-09": {
  "resumen": "crear · recorrer · copiar · desestructurar · matrices",
  "secciones": [
   {
    "id": "js-arr-crear",
    "titulo": "Crear y acceder",
    "bloques": [
     {
      "p": "Un **array** es una lista ordenada de valores. A diferencia de Java: **no tiene tamaño fijo**, puede mezclar tipos y crece o disminuye cuando hace falta."
     },
     {
      "live": {
       "titulo": "Pruébalo: crear, leer y modificar",
       "js": "const notas = [7.5, 4, 9, 6];\nconsole.log(notas[0]);          // 7.5   (primer elemento)\nconsole.log(notas.at(-1));      // 6     (último)\nconsole.log(notas.length);      // 4\n\nnotas[1] = 5;                   // modificar\nnotas[10] = 8;                  // deja huecos (empty items)\nconsole.log(notas);\n\nconst mezcla = [1, \"dos\", true, null, [3, 4]];  // tipos mezclados\nconsole.log(mezcla.length);",
       "alto": 110
      }
     },
     {
      "aviso": "Un índice fuera de rango **no da error**: devuelve `undefined`. `notas[99]` es `undefined`, y el fallo aparece más adelante.",
      "tipo": "warning"
     }
    ]
   },
   {
    "id": "js-arr-recorrer",
    "titulo": "Recorrer",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Forma",
        "Cuándo"
       ],
       "filas": [
        [
         "`for (let i = 0; i < a.length; i++)`",
         "Necesitas el índice o recorrer en un orden especial"
        ],
        [
         "`for (const x of a)`",
         "Solo necesitas cada valor"
        ],
        [
         "`a.forEach((x, i) => …)`",
         "Hacer algo con cada elemento (no devuelve nada)"
        ],
        [
         "`for (const [i, x] of a.entries())`",
         "Índice **y** valor a la vez"
        ]
       ]
      }
     },
     {
      "live": {
       "titulo": "Pruébalo: formas de recorrer",
       "js": "const frutas = [\"manzana\", \"pera\", \"uva\"];\n\nfor (let i = 0; i < frutas.length; i++) console.log(i, frutas[i]);\nfor (const f of frutas) console.log(f);\nfrutas.forEach((f, i) => console.log(`${i + 1}. ${f}`));\nfor (const [i, f] of frutas.entries()) console.log(i, f);",
       "alto": 150
      }
     }
    ]
   },
   {
    "id": "js-arr-copiar",
    "titulo": "Copiar ≠ asignar",
    "bloques": [
     {
      "live": {
       "titulo": "Pruébalo: referencia frente a copia",
       "js": "const a = [1, 2, 3];\nconst b = a;         // MISMA lista\nconst c = [...a];    // copia (spread)\nconst d = a.slice(); // otra forma de copiar\n\nb.push(99);\nconsole.log(a);      // [1, 2, 3, 99]  ← cambió\nconsole.log(c);      // [1, 2, 3]\nconsole.log(d === a);// false\n\n// la copia es superficial: los objetos de dentro se comparten\nconst u = [{ x: 1 }];\nconst v = [...u];\nv[0].x = 50;\nconsole.log(u[0].x); // 50\nconst w = structuredClone(u); // copia profunda\nw[0].x = 1;\nconsole.log(u[0].x); // 50",
       "alto": 180
      }
     }
    ]
   },
   {
    "id": "js-arr-spread",
    "titulo": "Spread y desestructuración",
    "bloques": [
     {
      "live": {
       "titulo": "Pruébalo: ... y [a, b] = …",
       "js": "const pares = [2, 4];\nconst impares = [1, 3];\nconsole.log([...impares, ...pares]);       // [1, 3, 2, 4]  (unir)\nconsole.log(Math.max(...pares));           // 4  (pasar un array como argumentos)\n\nconst [primero, segundo, ...resto] = [10, 20, 30, 40];\nconsole.log(primero, segundo, resto);      // 10 20 [30, 40]\n\nlet x = 1, y = 2;\n[x, y] = [y, x];                           // intercambiar sin variable auxiliar\nconsole.log(x, y);                         // 2 1",
       "alto": 110
      }
     }
    ]
   },
   {
    "id": "js-arr-patrones",
    "titulo": "Patrones típicos",
    "bloques": [
     {
      "live": {
       "titulo": "Pruébalo: suma, media, máximo y contar",
       "js": "const notas = [7.5, 4, 9, 6, 9];\n\nlet suma = 0;\nfor (const n of notas) suma += n;\nconsole.log(\"suma:\", suma);\nconsole.log(\"media:\", (suma / notas.length).toFixed(2));\n\nlet max = notas[0];\nfor (const n of notas) if (n > max) max = n;\nconsole.log(\"máximo:\", max, \"en posición\", notas.indexOf(max));\n\nlet aprobados = 0;\nfor (const n of notas) if (n >= 5) aprobados++;\nconsole.log(\"aprobados:\", aprobados);",
       "alto": 130
      }
     }
    ]
   },
   {
    "id": "js-arr-matrices",
    "titulo": "Matrices (arrays de arrays)",
    "bloques": [
     {
      "live": {
       "titulo": "Pruébalo: tablero 3 x 3",
       "js": "const tablero = [\n  [\"X\", \"O\", \"X\"],\n  [\"O\", \"X\", \"O\"],\n  [\" \", \" \", \"X\"],\n];\nconsole.log(tablero[1][2]);          // \"O\"  (fila 1, columna 2)\n\nfor (const fila of tablero) {\n  console.log(fila.join(\" | \"));\n}\n\nconst cero = Array.from({ length: 3 }, () => Array(3).fill(0));\nconsole.log(cero);",
       "alto": 130
      }
     },
     {
      "aviso": "`Array(3).fill([])` rellena con **la misma referencia** en las tres posiciones: modificar una fila cambia todas. Usa `Array.from({ length: n }, () => [])`.",
      "tipo": "warning"
     }
    ]
   }
  ]
 },
 "mod-10": {
  "resumen": "push/pop/splice · find · map · filter · reduce · sort · Set · Map",
  "secciones": [
   {
    "id": "js-met-modificar",
    "titulo": "Añadir, quitar y modificar",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Método",
        "Qué hace",
        "Devuelve",
        "Modifica el array"
       ],
       "filas": [
        [
         "`push(x)`",
         "Añade al **final**",
         "Nueva longitud",
         "Sí"
        ],
        [
         "`pop()`",
         "Quita el **último**",
         "El elemento quitado",
         "Sí"
        ],
        [
         "`unshift(x)`",
         "Añade al **principio**",
         "Nueva longitud",
         "Sí"
        ],
        [
         "`shift()`",
         "Quita el **primero**",
         "El elemento quitado",
         "Sí"
        ],
        [
         "`splice(i, n, …nuevos)`",
         "Quita `n` desde `i` e inserta nuevos",
         "Los quitados",
         "Sí"
        ],
        [
         "`slice(i, j)`",
         "Copia el trozo `i`…`j-1`",
         "Array nuevo",
         "No"
        ],
        [
         "`concat(b)` / `[...a, ...b]`",
         "Une arrays",
         "Array nuevo",
         "No"
        ],
        [
         "`reverse()` / `sort()`",
         "Invierte / ordena",
         "El mismo array",
         "Sí"
        ]
       ]
      }
     },
     {
      "live": {
       "titulo": "Pruébalo: la cola de una tienda",
       "js": "const cola = [\"Ana\", \"Luis\"];\ncola.push(\"Marta\");         // entra al final\nconsole.log(cola.shift());  // atiende a \"Ana\"\nconsole.log(cola);          // [\"Luis\", \"Marta\"]\n\nconst letras = [\"a\", \"b\", \"c\", \"d\"];\nletras.splice(1, 2);        // quita \"b\" y \"c\"\nconsole.log(letras);        // [\"a\", \"d\"]\nletras.splice(1, 0, \"X\");   // inserta \"X\" en la posición 1\nconsole.log(letras);        // [\"a\", \"X\", \"d\"]",
       "alto": 130
      }
     },
     {
      "aviso": "`splice` **modifica** el array original; `slice` no. Los nombres se parecen y se confunden mucho.",
      "tipo": "warning"
     }
    ]
   },
   {
    "id": "js-met-buscar",
    "titulo": "Buscar",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Método",
        "Devuelve"
       ],
       "filas": [
        [
         "`includes(x)`",
         "`true` / `false`"
        ],
        [
         "`indexOf(x)`",
         "Posición o `-1`"
        ],
        [
         "`find(x => cond)`",
         "El **primer elemento** que cumple, o `undefined`"
        ],
        [
         "`findIndex(x => cond)`",
         "La posición del primero que cumple, o `-1`"
        ],
        [
         "`some(x => cond)`",
         "`true` si **alguno** cumple"
        ],
        [
         "`every(x => cond)`",
         "`true` si **todos** cumplen"
        ]
       ]
      }
     },
     {
      "live": {
       "titulo": "Pruébalo: buscar en una lista de objetos",
       "js": "const productos = [\n  { id: 1, nombre: \"Ratón\", precio: 19.9, stock: 5 },\n  { id: 2, nombre: \"Teclado\", precio: 49.9, stock: 0 },\n  { id: 3, nombre: \"Monitor\", precio: 189, stock: 2 },\n];\n\nconsole.log(productos.find((p) => p.id === 3));\nconsole.log(productos.findIndex((p) => p.nombre === \"Teclado\"));\nconsole.log(productos.some((p) => p.stock === 0));    // true\nconsole.log(productos.every((p) => p.precio > 10));   // true",
       "alto": 120
      }
     }
    ]
   },
   {
    "id": "js-met-transformar",
    "titulo": "map, filter y reduce",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Método",
        "Para qué",
        "Devuelve"
       ],
       "filas": [
        [
         "`map(x => …)`",
         "**Transformar** cada elemento",
         "Array de la **misma longitud**"
        ],
        [
         "`filter(x => cond)`",
         "**Quedarse** con los que cumplen",
         "Array igual o más corto"
        ],
        [
         "`reduce((acum, x) => …, inicial)`",
         "**Reducir** todo a un solo valor (suma, objeto…)",
         "Un valor"
        ],
        [
         "`flat()` · `flatMap(…)`",
         "Aplanar arrays anidados",
         "Array nuevo"
        ]
       ]
      }
     },
     {
      "live": {
       "titulo": "Pruébalo: la cadena filter → map → reduce",
       "js": "const productos = [\n  { nombre: \"Ratón\", precio: 19.9, stock: 5 },\n  { nombre: \"Teclado\", precio: 49.9, stock: 0 },\n  { nombre: \"Monitor\", precio: 189, stock: 2 },\n];\n\nconst nombres = productos.map((p) => p.nombre);\nconsole.log(nombres);                       // [\"Ratón\", \"Teclado\", \"Monitor\"]\n\nconst disponibles = productos.filter((p) => p.stock > 0);\nconsole.log(disponibles.length);            // 2\n\nconst valorInventario = productos.reduce((total, p) => total + p.precio * p.stock, 0);\nconsole.log(valorInventario.toFixed(2));    // 477.50",
       "alto": 130
      }
     },
     {
      "nota": "Estos métodos **no modifican** el array original: devuelven uno nuevo. Se pueden encadenar: `lista.filter(…).map(…)`.",
      "tipo": "tip"
     }
    ]
   },
   {
    "id": "js-met-ordenar",
    "titulo": "Ordenar",
    "bloques": [
     {
      "p": "`sort()` ordena **como texto** por defecto. Para números hay que pasarle una función comparadora: devuelve negativo si `a` va antes, positivo si va después y `0` si es igual."
     },
     {
      "live": {
       "titulo": "Pruébalo: sort numérico, por texto y por campo",
       "js": "const nums = [10, 9, 1, 100];\nconsole.log([...nums].sort());                 // [1, 10, 100, 9]  ← como texto\nconsole.log([...nums].sort((a, b) => a - b));  // [1, 9, 10, 100]\nconsole.log([...nums].sort((a, b) => b - a));  // de mayor a menor\n\nconst alumnos = [{ n: \"Zoe\", nota: 7 }, { n: \"Ana\", nota: 9 }];\nalumnos.sort((a, b) => b.nota - a.nota);       // por campo numérico\nconsole.log(alumnos.map((x) => x.n));\nalumnos.sort((a, b) => a.n.localeCompare(b.n, \"es\")); // por texto\nconsole.log(alumnos.map((x) => x.n));\n\nconst ordenado = nums.toSorted((a, b) => a - b); // versión que NO modifica\nconsole.log(nums, ordenado);",
       "alto": 170
      }
     },
     {
      "aviso": "`sort()` **modifica** el array original. Haz antes una copia (`[...lista].sort(…)`) o usa `toSorted()` (navegadores modernos).",
      "tipo": "warning"
     }
    ]
   },
   {
    "id": "js-met-set-map",
    "titulo": "Set y Map",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "",
        "`Set`",
        "`Map`"
       ],
       "filas": [
        [
         "Guarda",
         "Valores **únicos**",
         "Pares **clave → valor**"
        ],
        [
         "Añadir",
         "`s.add(x)`",
         "`m.set(k, v)`"
        ],
        [
         "Consultar",
         "`s.has(x)`",
         "`m.get(k)` · `m.has(k)`"
        ],
        [
         "Borrar",
         "`s.delete(x)`",
         "`m.delete(k)`"
        ],
        [
         "Tamaño",
         "`s.size`",
         "`m.size`"
        ],
        [
         "Recorrer",
         "`for (const x of s)`",
         "`for (const [k, v] of m)`"
        ]
       ]
      }
     },
     {
      "live": {
       "titulo": "Pruébalo: quitar duplicados y contar repeticiones",
       "js": "const votos = [\"rojo\", \"azul\", \"rojo\", \"verde\", \"azul\", \"rojo\"];\n\nconst unicos = [...new Set(votos)];\nconsole.log(unicos);                  // [\"rojo\", \"azul\", \"verde\"]\n\nconst conteo = new Map();\nfor (const v of votos) conteo.set(v, (conteo.get(v) ?? 0) + 1);\nconsole.log(conteo);                  // Map { rojo => 3, azul => 2, verde => 1 }\nconsole.log([...conteo].sort((a, b) => b[1] - a[1])[0]);  // [\"rojo\", 3]",
       "alto": 120
      }
     }
    ]
   },
   {
    "id": "js-met-array-vs",
    "titulo": "Array de JS frente al de Java",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "",
        "Java `int[]` / `ArrayList`",
        "JavaScript `Array`"
       ],
       "filas": [
        [
         "Tamaño",
         "Fijo (`int[]`) o variable (`ArrayList`)",
         "Variable siempre"
        ],
        [
         "Tipos",
         "Un solo tipo",
         "Cualquier mezcla"
        ],
        [
         "Longitud",
         "`array.length` / `lista.size()`",
         "`array.length`"
        ],
        [
         "Añadir",
         "`lista.add(x)`",
         "`array.push(x)`"
        ],
        [
         "Obtener",
         "`lista.get(i)`",
         "`array[i]`"
        ],
        [
         "Quitar por posición",
         "`lista.remove(i)`",
         "`array.splice(i, 1)`"
        ],
        [
         "Recorrer",
         "for-each",
         "`for…of` / `forEach`"
        ],
        [
         "Imprimir",
         "`Arrays.toString(a)`",
         "`console.log(a)`"
        ]
       ]
      }
     }
    ]
   }
  ]
 },
 "mod-11": {
  "resumen": "declaración · flecha · parámetros · retorno · ámbito · closures · callbacks",
  "secciones": [
   {
    "id": "js-fn-anatomia",
    "titulo": "Anatomía",
    "bloques": [
     {
      "consola": "function  calcularTotal ( base , iva = 0.21 ) {\n│         │          │       │      └ parámetro con valor por defecto\n│         │          │       └ parámetro\n│         │          └ paréntesis con los parámetros\n│         └ nombre (camelCase, un verbo)\n└ palabra clave\n    return base * (1 + iva);   ← devuelve un valor y termina la función\n}"
     },
     {
      "live": {
       "titulo": "Pruébalo: llamar a una función",
       "js": "function calcularTotal(base, iva = 0.21) {\n  return base * (1 + iva);\n}\n\nconsole.log(calcularTotal(100));        // 121\nconsole.log(calcularTotal(100, 0.10));  // 110\nconsole.log(calcularTotal());           // NaN  (base es undefined)",
       "alto": 80
      }
     },
     {
      "aviso": "En JavaScript **no hay sobrecarga**: puedes llamar a una función con más o menos argumentos de los declarados. Los que faltan valen `undefined` y los que sobran se ignoran, sin error.",
      "tipo": "warning"
     }
    ]
   },
   {
    "id": "js-fn-tipos",
    "titulo": "Tres formas de escribir una función",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Forma",
        "Ejemplo",
        "Notas"
       ],
       "filas": [
        [
         "**Declaración**",
         "`function suma(a, b) { return a + b; }`",
         "Se puede llamar **antes** de su línea (hoisting)"
        ],
        [
         "**Expresión**",
         "`const suma = function (a, b) { return a + b; };`",
         "Solo existe desde su línea"
        ],
        [
         "**Flecha**",
         "`const suma = (a, b) => a + b;`",
         "Corta; ideal para callbacks. Sin `this` propio"
        ]
       ]
      }
     },
     {
      "live": {
       "titulo": "Pruébalo: formas de la flecha",
       "js": "const doble    = (n) => n * 2;          // una expresión: return implícito\nconst saluda   = nombre => `Hola, ${nombre}`; // un parámetro: sin paréntesis\nconst area     = (b, h) => { const a = b * h / 2; return a; }; // con llaves: return explícito\nconst crear    = () => ({ ok: true });  // devolver un objeto: entre paréntesis\n\nconsole.log(doble(4), saluda(\"David\"), area(4, 3), crear());",
       "alto": 80
      }
     }
    ]
   },
   {
    "id": "js-fn-params",
    "titulo": "Parámetros: por defecto, resto y desestructurados",
    "bloques": [
     {
      "live": {
       "titulo": "Pruébalo: ...resto y objeto como parámetro",
       "js": "const sumar = (...numeros) => numeros.reduce((a, n) => a + n, 0);\nconsole.log(sumar(1, 2, 3, 4));   // 10\n\n// un objeto como parámetro: el orden no importa y hay valores por defecto\nfunction crearUsuario({ nombre, rol = \"alumno\", activo = true }) {\n  return { nombre, rol, activo };\n}\nconsole.log(crearUsuario({ nombre: \"Lucía\" }));\nconsole.log(crearUsuario({ rol: \"profe\", nombre: \"Marcos\" }));",
       "alto": 110
      }
     },
     {
      "nota": "Cuando una función necesita **más de 3 parámetros**, es más claro recibir un único objeto (`{ nombre, rol }`) que recordar el orden de cinco argumentos sueltos.",
      "tipo": "tip"
     }
    ]
   },
   {
    "id": "js-fn-valor",
    "titulo": "Paso por valor (qué ocurre con lo que envías)",
    "bloques": [
     {
      "live": {
       "titulo": "Pruébalo: primitivos y objetos",
       "js": "function cambiar(n, lista) {\n  n = 99;              // solo cambia la copia local\n  lista.push(99);      // modifica el array original (misma referencia)\n  lista = [0];         // reasignar NO afecta al original\n}\n\nlet numero = 1;\nconst datos = [1, 2];\ncambiar(numero, datos);\nconsole.log(numero); // 1\nconsole.log(datos);  // [1, 2, 99]",
       "alto": 110
      }
     },
     {
      "p": "Todo se pasa **por valor**, pero en un objeto o array ese valor es una **referencia**: la función puede modificar el contenido, aunque no puede reemplazar la variable de fuera."
     }
    ]
   },
   {
    "id": "js-fn-ambito",
    "titulo": "Ámbito (scope) y hoisting",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Ámbito",
        "Dónde se ve la variable"
       ],
       "filas": [
        [
         "**Global**",
         "En todo el programa (evítalo)"
        ],
        [
         "**Función**",
         "Dentro de esa función"
        ],
        [
         "**Bloque** (`let` / `const`)",
         "Solo dentro de las llaves `{ }` donde se declaró"
        ]
       ]
      }
     },
     {
      "live": {
       "titulo": "Pruébalo: let es de bloque, var no",
       "js": "if (true) {\n  let a = 1;\n  var b = 2;\n}\nconsole.log(typeof a);  // \"undefined\"  (a solo existe dentro del if)\nconsole.log(b);         // 2             (var se escapa del bloque)\n\ntry {\n  console.log(x);       // ReferenceError: no se puede usar antes de declarar\n  let x = 5;\n} catch (e) {\n  console.log(e.name);\n}",
       "alto": 110
      }
     }
    ]
   },
   {
    "id": "js-fn-closure",
    "titulo": "Closures",
    "bloques": [
     {
      "p": "Una función **recuerda las variables del lugar donde se creó**, aunque ese lugar ya haya terminado. Es la base de contadores privados, temporizadores y manejadores de eventos."
     },
     {
      "live": {
       "titulo": "Pruébalo: un contador con estado privado",
       "js": "function crearContador() {\n  let cuenta = 0;               // nadie de fuera puede tocarla\n  return () => ++cuenta;\n}\n\nconst a = crearContador();\nconst b = crearContador();\nconsole.log(a(), a(), a());     // 1 2 3\nconsole.log(b());               // 1  (cada contador tiene su propia cuenta)",
       "alto": 80
      }
     }
    ]
   },
   {
    "id": "js-fn-callbacks",
    "titulo": "Funciones como valores y callbacks",
    "bloques": [
     {
      "p": "En JavaScript una función es un valor más: se guarda en una variable, se pasa como argumento y se devuelve. Una función que se pasa a otra para que la llame después es un **callback**."
     },
     {
      "live": {
       "titulo": "Pruébalo: pasar una función a otra",
       "js": "function repetir(veces, accion) {\n  for (let i = 1; i <= veces; i++) accion(i);\n}\n\nrepetir(3, (n) => console.log(\"iteración\", n));\n\nconst aplicarDescuento = (precios, regla) => precios.map(regla);\nconsole.log(aplicarDescuento([100, 50], (p) => p * 0.9));",
       "alto": 90
      }
     }
    ]
   },
   {
    "id": "js-fn-plantilla",
    "titulo": "Plantilla de ejercicio con funciones",
    "bloques": [
     {
      "p": "Un buen programa se divide en funciones pequeñas que **hacen una sola cosa** y se combinan en un `main`."
     },
     {
      "live": {
       "titulo": "Pruébalo: estructura habitual",
       "js": "// 1. Funciones puras: reciben datos y devuelven un resultado\nconst calcularSubtotal = (precio, unidades) => precio * unidades;\nconst aplicarDescuento = (importe, unidades) => (unidades >= 10 ? importe * 0.9 : importe);\nconst aplicarIva = (base, iva = 0.21) => base * (1 + iva);\n\n// 2. Función que muestra el resultado\nconst formatearEuros = (n) => n.toLocaleString(\"es-ES\", { style: \"currency\", currency: \"EUR\" });\n\n// 3. \"main\": orquesta\nfunction main() {\n  const subtotal = calcularSubtotal(4.5, 12);\n  const base = aplicarDescuento(subtotal, 12);\n  console.log(\"Total:\", formatearEuros(aplicarIva(base)));\n}\nmain();",
       "alto": 90
      }
     }
    ]
   }
  ]
 },
 "mod-12": {
  "resumen": "literales · this · desestructurar · Object.keys · JSON · class",
  "secciones": [
   {
    "id": "js-obj-literal",
    "titulo": "Objetos literales",
    "bloques": [
     {
      "p": "Un **objeto** agrupa datos relacionados en pares **clave: valor**. Es la estructura más usada del lenguaje (una fila de una tabla, una respuesta de una API, una configuración)."
     },
     {
      "live": {
       "titulo": "Pruébalo: crear, leer, modificar y borrar propiedades",
       "js": "const cliente = {\n  nombre: \"Lucía\",\n  edad: 22,\n  direccion: { ciudad: \"Madrid\", cp: \"28049\" },\n  aficiones: [\"3D\", \"música\"],\n};\n\nconsole.log(cliente.nombre);              // notación punto\nconsole.log(cliente[\"edad\"]);             // notación corchetes (clave dinámica)\nconsole.log(cliente.direccion.ciudad);    // anidados\ncliente.telefono = \"600000000\";           // añadir\ncliente.edad = 23;                        // modificar\ndelete cliente.telefono;                  // borrar\nconsole.log(\"edad\" in cliente);           // true\nconsole.log(cliente.correo);              // undefined (no existe, sin error)",
       "alto": 150
      }
     },
     {
      "nota": "Atajo cuando la variable y la clave se llaman igual: `{ nombre, edad }` equivale a `{ nombre: nombre, edad: edad }`.",
      "tipo": "tip"
     }
    ]
   },
   {
    "id": "js-obj-metodos",
    "titulo": "Métodos y this",
    "bloques": [
     {
      "p": "Una propiedad cuyo valor es una función se llama **método**. Dentro, `this` es el objeto sobre el que se llamó."
     },
     {
      "live": {
       "titulo": "Pruébalo: un método y un \"this\" perdido",
       "js": "const cuenta = {\n  titular: \"David\",\n  saldo: 100,\n  ingresar(importe) {\n    this.saldo += importe;\n    return this;                 // permite encadenar\n  },\n  resumen() {\n    return `${this.titular}: ${this.saldo} €`;\n  },\n};\n\nconsole.log(cuenta.ingresar(50).resumen());   // David: 150 €\n\nconst suelta = cuenta.resumen;               // se separa del objeto\ntry { console.log(suelta()); } catch (e) { console.log(\"Error:\", e.message); }",
       "alto": 120
      }
     },
     {
      "aviso": "`this` depende de **cómo se llama** la función, no de dónde se escribió. Si pasas un método como callback (`boton.addEventListener(\"click\", cuenta.resumen)`) pierde el objeto. Solución: una flecha `() => cuenta.resumen()` o `cuenta.resumen.bind(cuenta)`.",
      "tipo": "warning"
     }
    ]
   },
   {
    "id": "js-obj-utilidades",
    "titulo": "Recorrer y copiar objetos",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Necesito…",
        "Cómo"
       ],
       "filas": [
        [
         "Las claves",
         "`Object.keys(o)`"
        ],
        [
         "Los valores",
         "`Object.values(o)`"
        ],
        [
         "Pares `[clave, valor]`",
         "`Object.entries(o)`"
        ],
        [
         "Copia superficial",
         "`{ ...o }` o `Object.assign({}, o)`"
        ],
        [
         "Combinar objetos",
         "`{ ...a, ...b }` (gana el último)"
        ],
        [
         "Copia profunda",
         "`structuredClone(o)`"
        ],
        [
         "Impedir cambios",
         "`Object.freeze(o)`"
        ]
       ]
      }
     },
     {
      "live": {
       "titulo": "Pruébalo: entries, spread y desestructuración",
       "js": "const producto = { nombre: \"Teclado\", precio: 49.9, stock: 3 };\n\nfor (const [clave, valor] of Object.entries(producto)) {\n  console.log(`${clave}: ${valor}`);\n}\n\nconst oferta = { ...producto, precio: 39.9 };       // copia cambiando un campo\nconsole.log(oferta, producto.precio);\n\nconst { nombre, precio } = producto;                // desestructurar\nconsole.log(nombre, precio);",
       "alto": 140
      }
     }
    ]
   },
   {
    "id": "js-obj-json",
    "titulo": "JSON",
    "bloques": [
     {
      "p": "**JSON** es un formato de texto para intercambiar datos. Se parece a un objeto de JavaScript, pero es **solo texto**: las claves van siempre entre comillas dobles y no admite funciones ni comentarios."
     },
     {
      "tabla": {
       "cabs": [
        "Método",
        "Hace"
       ],
       "filas": [
        [
         "`JSON.stringify(valor)`",
         "Objeto → texto JSON"
        ],
        [
         "`JSON.stringify(valor, null, 2)`",
         "Igual, con sangría de 2 espacios (legible)"
        ],
        [
         "`JSON.parse(texto)`",
         "Texto JSON → objeto (lanza error si el texto no es válido)"
        ]
       ]
      }
     },
     {
      "live": {
       "titulo": "Pruébalo: ida y vuelta",
       "js": "const alumno = { nombre: \"Lucía\", notas: [7, 9], activo: true };\n\nconst texto = JSON.stringify(alumno);\nconsole.log(texto);                 // {\"nombre\":\"Lucía\",\"notas\":[7,9],\"activo\":true}\nconsole.log(typeof texto);          // string\n\nconst copia = JSON.parse(texto);\nconsole.log(copia.notas[1]);        // 9\n\ntry {\n  JSON.parse(\"{nombre: 'Lucía'}\");  // JSON inválido (comillas simples, sin comillas en la clave)\n} catch (e) {\n  console.log(\"JSON inválido:\", e.name);\n}",
       "alto": 140
      }
     }
    ]
   },
   {
    "id": "js-obj-class",
    "titulo": "Clases",
    "bloques": [
     {
      "p": "Una **clase** es una plantilla para crear objetos con los mismos datos y métodos. Detrás, JavaScript sigue usando prototipos; `class` es una sintaxis más clara."
     },
     {
      "live": {
       "titulo": "Pruébalo: clase, herencia y getter",
       "js": "class Persona {\n  #edad;                                   // campo privado\n  constructor(nombre, edad) {\n    this.nombre = nombre;\n    this.#edad = edad;\n  }\n  get esMayor() { return this.#edad >= 18; }\n  saludar() { return `Hola, soy ${this.nombre}`; }\n}\n\nclass Alumno extends Persona {\n  constructor(nombre, edad, curso) {\n    super(nombre, edad);                   // llama al constructor del padre\n    this.curso = curso;\n  }\n  saludar() { return `${super.saludar()} y estudio ${this.curso}`; }\n}\n\nconst a = new Alumno(\"Lucía\", 22, \"DAW\");\nconsole.log(a.saludar());\nconsole.log(a.esMayor);                    // true  (getter: se usa sin paréntesis)\nconsole.log(a instanceof Persona);         // true",
       "alto": 170
      }
     }
    ]
   }
  ]
 },
 "mod-13": {
  "resumen": "querySelector · textContent · classList · createElement · atributos",
  "secciones": [
   {
    "id": "js-dom-que",
    "titulo": "Qué es el DOM",
    "bloques": [
     {
      "p": "El navegador convierte el HTML en un **árbol de objetos** llamado DOM (*Document Object Model*). JavaScript puede **buscar** nodos de ese árbol, **leer** y **cambiar** su contenido, atributos y estilos, y la página se actualiza al instante."
     },
     {
      "consola": "document\n └─ html\n     ├─ head\n     │   └─ title\n     └─ body\n         ├─ h1#titulo        ← document.querySelector(\"#titulo\")\n         └─ ul.lista\n             ├─ li           ← document.querySelectorAll(\".lista li\")\n             └─ li"
     }
    ]
   },
   {
    "id": "js-dom-seleccionar",
    "titulo": "Seleccionar elementos",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Método",
        "Devuelve",
        "Ejemplo"
       ],
       "filas": [
        [
         "`document.querySelector(css)`",
         "El **primer** elemento que cumple, o `null`",
         "`querySelector(\"#menu a.activo\")`"
        ],
        [
         "`document.querySelectorAll(css)`",
         "Una `NodeList` con **todos** (vacía si no hay)",
         "`querySelectorAll(\".tarjeta\")`"
        ],
        [
         "`document.getElementById(id)`",
         "El elemento con ese `id`, o `null`",
         "`getElementById(\"titulo\")`"
        ],
        [
         "`elemento.closest(css)`",
         "El ancestro más cercano que cumple",
         "`boton.closest(\"li\")`"
        ]
       ]
      }
     },
     {
      "nota": "`querySelector` acepta **cualquier selector CSS** (el mismo que en la hoja de estilos), por eso basta con aprender uno.",
      "tipo": "tip"
     },
     {
      "aviso": "Si el selector no encuentra nada, `querySelector` devuelve `null` y la línea siguiente da `TypeError: Cannot read properties of null`. Comprueba el selector en la consola y que el script se ejecute **cuando el DOM ya existe** (`defer`).",
      "tipo": "warning"
     }
    ]
   },
   {
    "id": "js-dom-contenido",
    "titulo": "Leer y cambiar contenido",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Propiedad",
        "Qué hace",
        "Cuándo"
       ],
       "filas": [
        [
         "`textContent`",
         "Lee/escribe **texto plano**",
         "Casi siempre. Es seguro"
        ],
        [
         "`innerHTML`",
         "Lee/escribe **HTML**",
         "Solo con contenido tuyo; con datos de un usuario es un riesgo de seguridad (XSS)"
        ],
        [
         "`value`",
         "Valor de `input`, `select`, `textarea`",
         "Formularios (siempre texto)"
        ]
       ]
      }
     },
     {
      "live": {
       "titulo": "Pruébalo: cambiar texto y HTML",
       "html": "<h2 id=\"titulo\">Título original</h2>\n<p id=\"info\">Texto <em>original</em></p>\n<input id=\"nombre\" value=\"David\">",
       "js": "const titulo = document.querySelector(\"#titulo\");\ntitulo.textContent = \"Título cambiado desde JS\";\n\nconst info = document.querySelector(\"#info\");\nconsole.log(info.textContent);         // \"Texto original\" (sin etiquetas)\nconsole.log(info.innerHTML);           // 'Texto <em>original</em>'\ninfo.innerHTML = \"Texto <strong>nuevo</strong>\";\n\nconst campo = document.querySelector(\"#nombre\");\nconsole.log(campo.value, typeof campo.value);  // \"David\" \"string\"",
       "alto": 170
      }
     }
    ]
   },
   {
    "id": "js-dom-clases",
    "titulo": "Clases, atributos y estilos",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Necesito…",
        "Cómo"
       ],
       "filas": [
        [
         "Añadir / quitar / alternar una clase",
         "`el.classList.add(\"on\")` · `remove` · `toggle`"
        ],
        [
         "¿Tiene la clase?",
         "`el.classList.contains(\"on\")`"
        ],
        [
         "Leer / cambiar un atributo",
         "`el.getAttribute(\"href\")` · `el.setAttribute(\"href\", \"#\")`"
        ],
        [
         "Atributos propios `data-*`",
         "`el.dataset.id` (de `data-id=\"5\"`)"
        ],
        [
         "Estilo en línea puntual",
         "`el.style.color = \"tomato\"`"
        ]
       ]
      }
     },
     {
      "nota": "Prefiere **cambiar clases** (`classList`) a escribir estilos con `el.style`: el aspecto queda en el CSS y el JS solo decide **cuándo** aplicarlo.",
      "tipo": "important"
     },
     {
      "live": {
       "titulo": "Pruébalo: alternar una clase",
       "html": "<button id=\"tema\">Cambiar tema</button>\n<p class=\"caja\" data-id=\"7\">Caja con data-id</p>",
       "css": ".caja { padding: 12px; border: 2px solid #999; }\n.caja.destacada { background: #fff3cd; border-color: #e8621c; }",
       "js": "const caja = document.querySelector(\".caja\");\nconsole.log(caja.dataset.id);          // \"7\"\n\ndocument.querySelector(\"#tema\").addEventListener(\"click\", () => {\n  caja.classList.toggle(\"destacada\");\n  console.log(caja.className);\n});",
       "alto": 130
      }
     }
    ]
   },
   {
    "id": "js-dom-crear",
    "titulo": "Crear, insertar y borrar elementos",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Método",
        "Hace"
       ],
       "filas": [
        [
         "`document.createElement(\"li\")`",
         "Crea un elemento (aún no está en la página)"
        ],
        [
         "`padre.append(hijo)`",
         "Lo añade **al final** del padre"
        ],
        [
         "`padre.prepend(hijo)`",
         "Lo añade **al principio**"
        ],
        [
         "`el.remove()`",
         "Lo elimina de la página"
        ],
        [
         "`el.replaceChildren()`",
         "Vacía el elemento (quita todos los hijos)"
        ],
        [
         "`el.cloneNode(true)`",
         "Copia el elemento con todo su contenido"
        ]
       ]
      }
     },
     {
      "live": {
       "titulo": "Pruébalo: generar una lista desde un array",
       "html": "<ul id=\"lista\"></ul>",
       "js": "const tareas = [\"Estudiar DOM\", \"Repasar eventos\", \"Hacer la misión\"];\nconst lista = document.querySelector(\"#lista\");\n\nfor (const t of tareas) {\n  const li = document.createElement(\"li\");\n  li.textContent = t;                 // textContent: seguro\n  lista.append(li);\n}\nconsole.log(lista.children.length);   // 3",
       "alto": 140
      }
     }
    ]
   },
   {
    "id": "js-dom-recorrer",
    "titulo": "Recorrer varios elementos",
    "bloques": [
     {
      "live": {
       "titulo": "Pruébalo: querySelectorAll",
       "html": "<p class=\"item\">Uno</p>\n<p class=\"item\">Dos</p>\n<p class=\"item\">Tres</p>",
       "js": "const items = document.querySelectorAll(\".item\");\nconsole.log(items.length);\n\nitems.forEach((el, i) => {\n  el.textContent = `${i + 1}. ${el.textContent}`;\n  if (i % 2 === 0) el.style.fontWeight = \"bold\";\n});\n\nconst textos = [...items].map((el) => el.textContent);   // NodeList → array\nconsole.log(textos);",
       "alto": 140
      }
     }
    ]
   }
  ]
 },
 "mod-14": {
  "resumen": "addEventListener · event · delegación · submit · teclado · input",
  "secciones": [
   {
    "id": "js-ev-basico",
    "titulo": "addEventListener",
    "bloques": [
     {
      "p": "Un **evento** es algo que ocurre en la página (un clic, una tecla, el envío de un formulario). Se escucha con `elemento.addEventListener(\"tipo\", función)`; la función (el **manejador**) recibe un objeto `event`."
     },
     {
      "tabla": {
       "cabs": [
        "Evento",
        "Se dispara cuando…"
       ],
       "filas": [
        [
         "`click`",
         "Se pulsa un elemento"
        ],
        [
         "`input`",
         "El valor de un campo cambia (**cada tecla**)"
        ],
        [
         "`change`",
         "Un campo cambia y **pierde el foco** (o se elige en un `select`/`checkbox`)"
        ],
        [
         "`submit`",
         "Se envía un formulario (se escucha en el `<form>`)"
        ],
        [
         "`keydown` / `keyup`",
         "Se pulsa / suelta una tecla"
        ],
        [
         "`mouseover` / `mouseout`",
         "El ratón entra / sale"
        ],
        [
         "`DOMContentLoaded`",
         "El DOM está listo (innecesario si usas `defer`)"
        ]
       ]
      }
     },
     {
      "live": {
       "titulo": "Pruébalo: contador de clics",
       "html": "<button id=\"mas\">Sumar</button>\n<p>Clics: <strong id=\"n\">0</strong></p>",
       "js": "const boton = document.querySelector(\"#mas\");\nconst salida = document.querySelector(\"#n\");\nlet clics = 0;\n\nboton.addEventListener(\"click\", (event) => {\n  clics++;\n  salida.textContent = clics;\n  console.log(event.type, event.target.id);\n});",
       "alto": 110
      }
     }
    ]
   },
   {
    "id": "js-ev-objeto",
    "titulo": "El objeto event",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Propiedad",
        "Qué contiene"
       ],
       "filas": [
        [
         "`event.target`",
         "El elemento **donde se originó** el evento"
        ],
        [
         "`event.currentTarget`",
         "El elemento **que tiene** el manejador"
        ],
        [
         "`event.preventDefault()`",
         "Cancela la acción por defecto (enviar el formulario, seguir un enlace)"
        ],
        [
         "`event.key`",
         "La tecla pulsada (`\"Enter\"`, `\"a\"`, `\"Escape\"`)"
        ],
        [
         "`event.stopPropagation()`",
         "Evita que el evento suba a los ancestros"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "js-ev-formulario",
    "titulo": "Formularios: submit y preventDefault",
    "bloques": [
     {
      "live": {
       "titulo": "Pruébalo: leer un formulario sin recargar la página",
       "html": "<form id=\"f\">\n  <label>Nombre <input name=\"nombre\" required></label>\n  <label>Edad <input name=\"edad\" type=\"number\" min=\"0\"></label>\n  <button>Enviar</button>\n</form>\n<p id=\"resultado\"></p>",
       "js": "document.querySelector(\"#f\").addEventListener(\"submit\", (e) => {\n  e.preventDefault();                          // evita la recarga\n  const datos = new FormData(e.target);\n  const nombre = datos.get(\"nombre\").trim();\n  const edad = Number(datos.get(\"edad\"));      // los valores llegan como texto\n  document.querySelector(\"#resultado\").textContent =\n    `${nombre} tiene ${edad} años (${edad >= 18 ? \"mayor\" : \"menor\"} de edad)`;\n});",
       "alto": 150
      }
     },
     {
      "aviso": "Escucha `submit` en el **formulario**, no `click` en el botón: así también funciona al pulsar `Enter` dentro de un campo. Y sin `preventDefault()` la página se recarga y pierdes el resultado.",
      "tipo": "warning"
     }
    ]
   },
   {
    "id": "js-ev-input",
    "titulo": "Escribir y pulsar teclas",
    "bloques": [
     {
      "live": {
       "titulo": "Pruébalo: contador de caracteres en vivo",
       "html": "<textarea id=\"t\" rows=\"3\" maxlength=\"60\" placeholder=\"Escribe aquí\"></textarea>\n<p><span id=\"c\">0</span> / 60</p>",
       "js": "const t = document.querySelector(\"#t\");\nt.addEventListener(\"input\", () => {\n  document.querySelector(\"#c\").textContent = t.value.length;\n});\nt.addEventListener(\"keydown\", (e) => {\n  if (e.key === \"Escape\") t.value = \"\";\n});",
       "alto": 130
      }
     }
    ]
   },
   {
    "id": "js-ev-delegacion",
    "titulo": "Delegación de eventos",
    "bloques": [
     {
      "p": "En lugar de poner un manejador en cada elemento de una lista, se pone **uno solo en el padre** y se mira `event.target`. Funciona también con los elementos que se añadan después."
     },
     {
      "live": {
       "titulo": "Pruébalo: una lista de tareas",
       "html": "<input id=\"nueva\" placeholder=\"Nueva tarea\">\n<button id=\"add\">Añadir</button>\n<ul id=\"tareas\"><li>Estudiar</li><li>Repasar</li></ul>",
       "css": "li { cursor: pointer; padding: 2px 0; }\nli.hecha { text-decoration: line-through; color: #888; }",
       "js": "const lista = document.querySelector(\"#tareas\");\n\nlista.addEventListener(\"click\", (e) => {\n  const li = e.target.closest(\"li\");\n  if (li) li.classList.toggle(\"hecha\");\n});\n\ndocument.querySelector(\"#add\").addEventListener(\"click\", () => {\n  const campo = document.querySelector(\"#nueva\");\n  if (campo.value.trim() === \"\") return;\n  const li = document.createElement(\"li\");\n  li.textContent = campo.value.trim();\n  lista.append(li);                // sin añadir manejadores nuevos\n  campo.value = \"\";\n});",
       "alto": 170
      }
     }
    ]
   },
   {
    "id": "js-ev-quitar",
    "titulo": "Quitar un manejador y eventos de una sola vez",
    "bloques": [
     {
      "live": {
       "titulo": "Pruébalo: removeEventListener y { once: true }",
       "html": "<button id=\"a\">Se desactiva tras 3 clics</button>\n<button id=\"b\">Solo funciona una vez</button>",
       "js": "const a = document.querySelector(\"#a\");\nlet veces = 0;\nfunction manejador() {\n  veces++;\n  console.log(\"clic\", veces);\n  if (veces === 3) a.removeEventListener(\"click\", manejador);  // necesita la MISMA función\n}\na.addEventListener(\"click\", manejador);\n\ndocument.querySelector(\"#b\").addEventListener(\"click\", () => console.log(\"solo una vez\"), { once: true });",
       "alto": 110
      }
     },
     {
      "aviso": "Para quitar un manejador hay que pasar **la misma función** con la que se añadió. Con una flecha anónima no se puede quitar.",
      "tipo": "warning"
     }
    ]
   }
  ]
 },
 "mod-15": {
  "resumen": "setTimeout · Promise · async/await · fetch · try/catch",
  "secciones": [
   {
    "id": "js-as-que",
    "titulo": "Por qué existe la asincronía",
    "bloques": [
     {
      "p": "JavaScript ejecuta **una sola cosa a la vez** en un único hilo. Si esperara a que un servidor responda, la página se quedaría congelada. Por eso las operaciones lentas (temporizadores, peticiones de red) se **lanzan** y su resultado se atiende **más tarde**, cuando estén listas."
     },
     {
      "live": {
       "titulo": "Pruébalo: el orden de ejecución",
       "js": "console.log(\"1. empieza\");\n\nsetTimeout(() => console.log(\"3. pasó 1 segundo\"), 1000);\nsetTimeout(() => console.log(\"2b. 0 ms… pero se ejecuta después\"), 0);\n\nconsole.log(\"2. termina el código síncrono\");",
       "alto": 90
      }
     },
     {
      "nota": "Aunque el tiempo sea `0`, el callback de `setTimeout` espera a que **termine todo el código síncrono** actual.",
      "tipo": "important"
     }
    ]
   },
   {
    "id": "js-as-timers",
    "titulo": "setTimeout y setInterval",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Función",
        "Hace",
        "Cancelar con"
       ],
       "filas": [
        [
         "`setTimeout(fn, ms)`",
         "Ejecuta `fn` **una vez** tras `ms` milisegundos",
         "`clearTimeout(id)`"
        ],
        [
         "`setInterval(fn, ms)`",
         "Ejecuta `fn` **cada** `ms` milisegundos",
         "`clearInterval(id)`"
        ]
       ]
      }
     },
     {
      "live": {
       "titulo": "Pruébalo: cuenta atrás",
       "js": "let n = 3;\nconst id = setInterval(() => {\n  console.log(n);\n  n--;\n  if (n < 0) {\n    clearInterval(id);        // sin esto seguiría para siempre\n    console.log(\"¡Despegue!\");\n  }\n}, 500);",
       "alto": 110
      }
     }
    ]
   },
   {
    "id": "js-as-promesas",
    "titulo": "Promesas",
    "bloques": [
     {
      "p": "Una **promesa** (`Promise`) representa un valor que **llegará en el futuro**. Tiene tres estados: *pendiente*, *cumplida* (`resolve`) o *rechazada* (`reject`)."
     },
     {
      "live": {
       "titulo": "Pruébalo: crear y encadenar una promesa",
       "js": "const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\n\nconst dividir = (a, b) =>\n  new Promise((resolve, reject) => {\n    if (b === 0) reject(new Error(\"No se puede dividir entre 0\"));\n    else resolve(a / b);\n  });\n\ndividir(10, 2)\n  .then((r) => { console.log(\"resultado:\", r); return dividir(r, 0); })\n  .then((r) => console.log(\"no llega aquí\", r))\n  .catch((e) => console.log(\"error:\", e.message))\n  .finally(() => console.log(\"fin\"));",
       "alto": 130
      }
     }
    ]
   },
   {
    "id": "js-as-async",
    "titulo": "async / await",
    "bloques": [
     {
      "p": "`async` / `await` permite escribir código asíncrono **como si fuera síncrono**. Una función `async` siempre devuelve una promesa; `await` **espera** a que otra promesa termine sin bloquear la página (solo se puede usar dentro de una función `async`)."
     },
     {
      "live": {
       "titulo": "Pruébalo: esperar en secuencia y en paralelo",
       "js": "const esperar = (ms, valor) => new Promise((r) => setTimeout(() => r(valor), ms));\n\nasync function main() {\n  console.time(\"secuencia\");\n  const a = await esperar(300, \"A\");\n  const b = await esperar(300, \"B\");\n  console.log(a, b);\n  console.timeEnd(\"secuencia\");        // ≈ 600 ms\n\n  console.time(\"paralelo\");\n  const [c, d] = await Promise.all([esperar(300, \"C\"), esperar(300, \"D\")]);\n  console.log(c, d);\n  console.timeEnd(\"paralelo\");         // ≈ 300 ms\n}\nmain();",
       "alto": 130
      }
     }
    ]
   },
   {
    "id": "js-as-fetch",
    "titulo": "fetch: pedir datos a un servidor",
    "bloques": [
     {
      "p": "`fetch(url)` hace una petición HTTP y devuelve una promesa de `Response`. Hay que **esperar dos veces**: una a la respuesta y otra a su cuerpo (`.json()`)."
     },
     {
      "code": "async function cargarUsuarios() {\n  try {\n    const respuesta = await fetch(\"https://jsonplaceholder.typicode.com/users\");\n\n    if (!respuesta.ok) {                        // 404, 500…: fetch NO lanza error\n      throw new Error(`Error HTTP ${respuesta.status}`);\n    }\n\n    const usuarios = await respuesta.json();    // cuerpo → objetos de JS\n    console.log(usuarios.map((u) => u.name));\n  } catch (error) {                             // solo falla por problemas de red\n    console.error(\"No se pudo cargar:\", error.message);\n  }\n}\ncargarUsuarios();",
      "lang": "js",
      "titulo": "fetch con control de errores"
     },
     {
      "code": "// Enviar datos (POST con JSON)\nawait fetch(\"https://jsonplaceholder.typicode.com/posts\", {\n  method: \"POST\",\n  headers: { \"Content-Type\": \"application/json\" },\n  body: JSON.stringify({ title: \"Hola\", body: \"Mi primer post\", userId: 1 }),\n});",
      "lang": "js",
      "titulo": "POST"
     },
     {
      "aviso": "`fetch` **solo rechaza** la promesa si falla la red. Una respuesta `404` o `500` es una respuesta \"correcta\" para `fetch`: hay que comprobar `respuesta.ok` tú mismo.",
      "tipo": "warning"
     },
     {
      "aviso": "Una página abierta como fichero local o desde otro dominio puede ser bloqueada por **CORS**: el servidor debe permitir tu origen. Es un error de configuración del servidor, no del código.",
      "tipo": "caution"
     }
    ]
   },
   {
    "id": "js-as-mostrar",
    "titulo": "Patrón: cargar y pintar en la página",
    "bloques": [
     {
      "live": {
       "titulo": "Pruébalo: simular una API con una promesa",
       "html": "<button id=\"cargar\">Cargar productos</button>\n<p id=\"estado\"></p>\n<ul id=\"lista\"></ul>",
       "js": "// Simulamos la respuesta de un servidor\nconst apiFalsa = () =>\n  new Promise((resolve) =>\n    setTimeout(() => resolve([\n      { id: 1, nombre: \"Ratón\", precio: 19.9 },\n      { id: 2, nombre: \"Monitor\", precio: 189 },\n    ]), 600)\n  );\n\ndocument.querySelector(\"#cargar\").addEventListener(\"click\", async () => {\n  const estado = document.querySelector(\"#estado\");\n  const lista = document.querySelector(\"#lista\");\n  estado.textContent = \"Cargando…\";\n  try {\n    const productos = await apiFalsa();\n    lista.replaceChildren(...productos.map((p) => {\n      const li = document.createElement(\"li\");\n      li.textContent = `${p.nombre} — ${p.precio.toFixed(2)} €`;\n      return li;\n    }));\n    estado.textContent = `${productos.length} productos`;\n  } catch (e) {\n    estado.textContent = \"Error al cargar\";\n  }\n});",
       "alto": 190
      }
     },
     {
      "nota": "Muestra siempre los **tres estados** al usuario: cargando, correcto y error.",
      "tipo": "tip"
     }
    ]
   }
  ]
 },
 "mod-16": {
  "resumen": "tabla de diagnóstico · try/catch · throw · DevTools",
  "secciones": [
   {
    "id": "js-err-tabla",
    "titulo": "Tabla de diagnóstico",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Mensaje",
        "Qué significa",
        "Causa típica"
       ],
       "filas": [
        [
         "`ReferenceError: x is not defined`",
         "Usas una variable que no existe en este ámbito",
         "Errata en el nombre; usarla antes de `let`/`const`; está en otro ámbito"
        ],
        [
         "`TypeError: Cannot read properties of undefined (reading 'x')`",
         "Pides una propiedad a `undefined` o `null`",
         "`querySelector` no encontró el elemento; la API aún no respondió; índice fuera de rango"
        ],
        [
         "`TypeError: x is not a function`",
         "Llamas con `()` algo que no es una función",
         "Nombre mal escrito; `x` es un número o texto; se te olvidó un `return`"
        ],
        [
         "`TypeError: Assignment to constant variable`",
         "Reasignas una `const`",
         "Usa `let` si va a cambiar"
        ],
        [
         "`SyntaxError: Unexpected token`",
         "Falta o sobra un símbolo",
         "Llave, paréntesis o comilla sin cerrar; coma de más en JSON"
        ],
        [
         "`SyntaxError: Unexpected token < in JSON`",
         "`JSON.parse` recibió HTML",
         "La URL del `fetch` es incorrecta y devolvió una página de error"
        ],
        [
         "`NaN` en pantalla",
         "Operación numérica con algo que no es número",
         "Texto sin convertir; `undefined + 1`"
        ],
        [
         "`undefined` en pantalla",
         "Una variable o propiedad sin valor",
         "Propiedad con otro nombre; función sin `return`"
        ],
        [
         "No pasa nada al pulsar",
         "El manejador no se está enganchando",
         "Selector incorrecto; `script` sin `defer`; error anterior que detuvo el script"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "js-err-trycatch",
    "titulo": "try / catch / finally y throw",
    "bloques": [
     {
      "live": {
       "titulo": "Pruébalo: capturar y lanzar errores",
       "js": "function leerEdad(texto) {\n  const n = Number(texto);\n  if (Number.isNaN(n)) throw new Error(`\"${texto}\" no es un número`);\n  if (n < 0) throw new RangeError(\"La edad no puede ser negativa\");\n  return n;\n}\n\nfor (const entrada of [\"25\", \"abc\", \"-3\"]) {\n  try {\n    console.log(\"edad válida:\", leerEdad(entrada));\n  } catch (e) {\n    console.log(`${e.name}: ${e.message}`);\n  } finally {\n    console.log(\"— comprobado\", entrada);\n  }\n}",
       "alto": 170
      }
     },
     {
      "nota": "Captura solo los errores que **sabes tratar**. Un `catch` vacío esconde fallos y hace que el programa \"funcione mal en silencio\".",
      "tipo": "important"
     }
    ]
   },
   {
    "id": "js-err-depurar",
    "titulo": "Depurar con las DevTools",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Herramienta",
        "Cómo se usa"
       ],
       "filas": [
        [
         "**Console**",
         "Lee el mensaje y la línea del error (clic en el enlace `app.js:12`)"
        ],
        [
         "**`console.log` / `console.table`**",
         "Comprueba el valor y el tipo de una variable en un punto concreto"
        ],
        [
         "**`debugger;`**",
         "Pausa la ejecución en esa línea si las DevTools están abiertas"
        ],
        [
         "**Sources → puntos de interrupción**",
         "Clic en el número de línea; avanza con F10 (siguiente línea) y F11 (entrar en la función)"
        ],
        [
         "**Elements**",
         "Comprueba que el elemento existe y qué clases tiene **ahora** (tras tu JS)"
        ],
        [
         "**Network**",
         "Mira la petición de `fetch`: URL, estado (`200`, `404`…) y respuesta"
        ]
       ]
      }
     },
     {
      "nota": "Método rápido: **1)** lee el mensaje entero · **2)** ve a la línea indicada · **3)** `console.log` de las variables de esa línea · **4)** reduce el problema a lo mínimo.",
      "tipo": "tip"
     }
    ]
   }
  ]
 },
 "mod-17": {
  "resumen": "6 casos reales · solución abierta",
  "secciones": [
   {
    "id": "js-mis-intro",
    "titulo": "Cómo usar las misiones",
    "bloques": [
     {
      "p": "Cada ejercicio simula una pieza de una aplicación real. Intenta resolverlo **antes** de mirar la solución; el editor te deja modificarla, ejecutarla y probar variantes."
     },
     {
      "tabla": {
       "cabs": [
        "ID",
        "Caso real",
        "Conceptos clave"
       ],
       "filas": [
        [
         "[J01](@j01)",
         "Ticket de caja con descuento e IVA",
         "Funciones, operadores, ternario, `toLocaleString`"
        ],
        [
         "[J02](@j02)",
         "Validador de contraseña",
         "Strings, regex, `some`, array de reglas"
        ],
        [
         "[J03](@j03)",
         "Generador de email corporativo",
         "`trim`, `split`, `replace`, normalización de tildes"
        ],
        [
         "[J04](@j04)",
         "Informe de ventas",
         "Array de objetos, `reduce`, `filter`, `sort`, `Map`"
        ],
        [
         "[J05](@j05)",
         "Lista de tareas",
         "DOM, eventos, delegación, `JSON`"
        ],
        [
         "[J06](@j06)",
         "Buscador con filtro en vivo",
         "Evento `input`, `filter`, renderizado, `data-*`"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "j01",
    "titulo": "J01 · Ticket de caja con descuento e IVA",
    "bloques": [
     {
      "nota": "**Caso real:** el TPV de una tienda. Se registra un producto; a partir de 10 unidades hay un 10 % de descuento; se calcula el IVA (21 %) sobre la base y se muestra el ticket.",
      "tipo": "note"
     },
     {
      "p": "**Conceptos:** constantes · funciones puras · ternario · `toLocaleString`"
     },
     {
      "live": {
       "titulo": "J01 · Solución propuesta",
       "html": "<form id=\"f\">\n  <label>Producto <input name=\"producto\" value=\"Teclado\"></label><br>\n  <label>Precio (€) <input name=\"precio\" value=\"49,90\"></label><br>\n  <label>Cantidad <input name=\"cantidad\" type=\"number\" value=\"12\"></label><br>\n  <button>Calcular</button>\n</form>\n<pre id=\"ticket\"></pre>",
       "js": "const IVA = 0.21;\nconst DESCUENTO = 0.10;\nconst UNIDADES_DESCUENTO = 10;\n\nconst euros = (n) => n.toLocaleString(\"es-ES\", { style: \"currency\", currency: \"EUR\" });\n\nfunction calcularTicket(precio, cantidad) {\n  const subtotal = precio * cantidad;\n  const descuento = cantidad >= UNIDADES_DESCUENTO ? subtotal * DESCUENTO : 0;\n  const base = subtotal - descuento;          // el IVA se calcula sobre la base\n  const iva = base * IVA;\n  return { subtotal, descuento, base, iva, total: base + iva };\n}\n\ndocument.querySelector(\"#f\").addEventListener(\"submit\", (e) => {\n  e.preventDefault();\n  const d = new FormData(e.target);\n  const precio = Number(d.get(\"precio\").replace(\",\", \".\"));   // coma española → punto\n  const cantidad = Number(d.get(\"cantidad\"));\n  if (Number.isNaN(precio) || !Number.isInteger(cantidad) || cantidad < 1) {\n    document.querySelector(\"#ticket\").textContent = \"Datos no válidos\";\n    return;\n  }\n  const t = calcularTicket(precio, cantidad);\n  document.querySelector(\"#ticket\").textContent =\n`${d.get(\"producto\")}  x ${cantidad}\nSubtotal:   ${euros(t.subtotal)}\nDescuento: -${euros(t.descuento)}\nBase:       ${euros(t.base)}\nIVA 21 %:   ${euros(t.iva)}\nTOTAL:      ${euros(t.total)}`;\n});",
       "alto": 330
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
         "`const IVA = 0.21`",
         "Si cambia el IVA se toca un solo sitio, y el nombre explica el número"
        ],
        [
         "`replace(\",\", \".\")` antes de `Number`",
         "`Number(\"49,90\")` da `NaN`: el usuario en España escribe coma"
        ],
        [
         "`calcularTicket` no toca el DOM",
         "Una función que solo calcula se puede probar sola en la consola"
        ],
        [
         "`Number.isInteger(cantidad)`",
         "No se venden 2,5 unidades: el tipo de dato expresa la regla"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "j02",
    "titulo": "J02 · Validador de contraseña",
    "bloques": [
     {
      "nota": "**Caso real:** el formulario de registro de una web. La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo, y se muestra qué reglas faltan.",
      "tipo": "note"
     },
     {
      "p": "**Conceptos:** array de reglas · regex con `test` · `filter` · `every`"
     },
     {
      "live": {
       "titulo": "J02 · Solución propuesta",
       "html": "<input id=\"pass\" type=\"text\" placeholder=\"Escribe una contraseña\">\n<ul id=\"reglas\"></ul>",
       "js": "const REGLAS = [\n  { texto: \"Al menos 8 caracteres\",   ok: (p) => p.length >= 8 },\n  { texto: \"Una mayúscula\",           ok: (p) => /[A-ZÁÉÍÓÚÑ]/.test(p) },\n  { texto: \"Una minúscula\",           ok: (p) => /[a-záéíóúñ]/.test(p) },\n  { texto: \"Un número\",               ok: (p) => /\\d/.test(p) },\n  { texto: \"Un símbolo (!@#$%&*…)\",   ok: (p) => /[^\\w\\s]/.test(p) },\n];\n\nconst campo = document.querySelector(\"#pass\");\nconst lista = document.querySelector(\"#reglas\");\n\nfunction pintar() {\n  const p = campo.value;\n  lista.replaceChildren(...REGLAS.map((r) => {\n    const li = document.createElement(\"li\");\n    li.textContent = (r.ok(p) ? \"✔ \" : \"✖ \") + r.texto;\n    li.style.color = r.ok(p) ? \"green\" : \"crimson\";\n    return li;\n  }));\n  console.log(REGLAS.every((r) => r.ok(p)) ? \"Contraseña válida\" : \"Faltan reglas\");\n}\ncampo.addEventListener(\"input\", pintar);\npintar();",
       "alto": 250
      }
     },
     {
      "nota": "Guardar las reglas como **datos** (un array de objetos) en lugar de un `if` enorme permite añadir una regla nueva con una sola línea.",
      "tipo": "tip"
     }
    ]
   },
   {
    "id": "j03",
    "titulo": "J03 · Generador de email corporativo",
    "bloques": [
     {
      "nota": "**Caso real:** alta de empleados en una empresa. El email se forma con la inicial del nombre y el primer apellido, en minúsculas, sin tildes ni espacios: «María José Núñez Pérez» → `mnunez@empresa.es`.",
      "tipo": "note"
     },
     {
      "p": "**Conceptos:** `trim` · `split` · `normalize` · `replace` con regex · `toLowerCase` · `charAt`"
     },
     {
      "live": {
       "titulo": "J03 · Solución propuesta",
       "js": "const quitarTildes = (t) => t.normalize(\"NFD\").replace(/[\\u0300-\\u036f]/g, \"\");\n\nfunction generarEmail(nombreCompleto, dominio = \"empresa.es\") {\n  const partes = quitarTildes(nombreCompleto).trim().toLowerCase().split(/\\s+/);\n  if (partes.length < 2) return null;                    // faltan apellidos\n  const inicial = partes[0].charAt(0);\n  const apellido = partes[partes.length === 2 ? 1 : 2]; // primer apellido\n  return `${inicial}${apellido}@${dominio}`;\n}\n\nconsole.log(generarEmail(\"María José Núñez Pérez\"));  // mnunez@empresa.es\nconsole.log(generarEmail(\"  Luis   Gómez \"));         // lgomez@empresa.es\nconsole.log(generarEmail(\"Madonna\"));                 // null",
       "alto": 130
      }
     },
     {
      "aviso": "Con nombres compuestos («María José») no se puede saber cuántas palabras son nombre y cuántas apellido solo contando. Aquí se simplifica; en una aplicación real el formulario pide **nombre** y **apellidos** en campos separados.",
      "tipo": "caution"
     }
    ]
   },
   {
    "id": "j04",
    "titulo": "J04 · Informe de ventas",
    "bloques": [
     {
      "nota": "**Caso real:** el resumen semanal de una tienda. Con una lista de ventas se calcula el total, la media por venta, el producto más vendido y el ranking de vendedores.",
      "tipo": "note"
     },
     {
      "p": "**Conceptos:** array de objetos · `reduce` · `Map` · `sort` · `toFixed`"
     },
     {
      "live": {
       "titulo": "J04 · Solución propuesta",
       "js": "const ventas = [\n  { vendedor: \"Ana\",   producto: \"Ratón\",   importe: 19.9 },\n  { vendedor: \"Luis\",  producto: \"Monitor\", importe: 189 },\n  { vendedor: \"Ana\",   producto: \"Teclado\", importe: 49.9 },\n  { vendedor: \"Marta\", producto: \"Ratón\",   importe: 19.9 },\n  { vendedor: \"Ana\",   producto: \"Ratón\",   importe: 19.9 },\n];\n\nconst total = ventas.reduce((acc, v) => acc + v.importe, 0);\nconsole.log(\"Total:\", total.toFixed(2), \"€\");\nconsole.log(\"Media por venta:\", (total / ventas.length).toFixed(2), \"€\");\n\n// importe acumulado por vendedor\nconst porVendedor = new Map();\nfor (const v of ventas) porVendedor.set(v.vendedor, (porVendedor.get(v.vendedor) ?? 0) + v.importe);\n\nconst ranking = [...porVendedor].sort((a, b) => b[1] - a[1]);\nranking.forEach(([nombre, importe], i) => console.log(`${i + 1}. ${nombre}: ${importe.toFixed(2)} €`));\n\n// producto más vendido (por número de ventas)\nconst unidades = ventas.reduce((m, v) => m.set(v.producto, (m.get(v.producto) ?? 0) + 1), new Map());\nconst [masVendido] = [...unidades].sort((a, b) => b[1] - a[1]);\nconsole.log(\"Más vendido:\", masVendido[0], `(${masVendido[1]} ventas)`);",
       "alto": 250
      }
     }
    ]
   },
   {
    "id": "j05",
    "titulo": "J05 · Lista de tareas",
    "bloques": [
     {
      "nota": "**Caso real:** la típica app de tareas pendientes. Se añaden tareas, se marcan como hechas, se borran y se guardan para que sigan ahí al recargar la página.",
      "tipo": "note"
     },
     {
      "p": "**Conceptos:** array de objetos como estado · renderizado · delegación de eventos · `JSON` · `localStorage`"
     },
     {
      "live": {
       "titulo": "J05 · Solución propuesta",
       "html": "<form id=\"f\"><input id=\"texto\" placeholder=\"Nueva tarea\" required> <button>Añadir</button></form>\n<ul id=\"lista\"></ul>\n<p id=\"resumen\"></p>",
       "css": "ul { padding-left: 0; list-style: none; }\nli { display: flex; gap: 8px; align-items: center; padding: 4px 0; }\nli.hecha span { text-decoration: line-through; color: #888; }\nli button { margin-left: auto; }",
       "js": "let tareas = [\n  { id: 1, texto: \"Repasar el DOM\", hecha: true },\n  { id: 2, texto: \"Hacer la misión\", hecha: false },\n];                                   // en una web real: JSON.parse(localStorage.getItem(\"tareas\") ?? \"[]\")\n\nconst lista = document.querySelector(\"#lista\");\n\nfunction pintar() {\n  lista.replaceChildren(...tareas.map((t) => {\n    const li = document.createElement(\"li\");\n    li.dataset.id = t.id;\n    li.className = t.hecha ? \"hecha\" : \"\";\n    li.innerHTML = '<input type=\"checkbox\"> <span></span> <button>Borrar</button>';\n    li.querySelector(\"input\").checked = t.hecha;\n    li.querySelector(\"span\").textContent = t.texto;          // textContent: seguro\n    return li;\n  }));\n  const pendientes = tareas.filter((t) => !t.hecha).length;\n  document.querySelector(\"#resumen\").textContent = `${pendientes} pendientes de ${tareas.length}`;\n  // localStorage.setItem(\"tareas\", JSON.stringify(tareas));  // persistir\n}\n\ndocument.querySelector(\"#f\").addEventListener(\"submit\", (e) => {\n  e.preventDefault();\n  const campo = document.querySelector(\"#texto\");\n  tareas.push({ id: Date.now(), texto: campo.value.trim(), hecha: false });\n  campo.value = \"\";\n  pintar();\n});\n\nlista.addEventListener(\"click\", (e) => {                     // delegación: un solo manejador\n  const li = e.target.closest(\"li\");\n  if (!li) return;\n  const id = Number(li.dataset.id);\n  if (e.target.matches(\"button\")) tareas = tareas.filter((t) => t.id !== id);\n  else if (e.target.matches(\"input\")) {\n    const t = tareas.find((t) => t.id === id);\n    t.hecha = !t.hecha;\n  } else return;\n  pintar();\n});\npintar();",
       "alto": 340
      }
     },
     {
      "aviso": "Aquí `localStorage` aparece comentado porque el visor aísla la página y no permite guardar. En tu propio `index.html` descomenta las dos líneas y las tareas **sobrevivirán a recargar**.",
      "tipo": "caution"
     }
    ]
   },
   {
    "id": "j06",
    "titulo": "J06 · Buscador con filtro en vivo",
    "bloques": [
     {
      "nota": "**Caso real:** el catálogo de una tienda con una caja de búsqueda que filtra los productos **mientras se escribe**, sin pulsar ningún botón.",
      "tipo": "note"
     },
     {
      "p": "**Conceptos:** evento `input` · `filter` · `includes` · normalizar texto · pintar desde datos"
     },
     {
      "live": {
       "titulo": "J06 · Solución propuesta",
       "html": "<input id=\"q\" placeholder=\"Buscar producto o categoría…\" autofocus>\n<p id=\"n\"></p>\n<ul id=\"catalogo\"></ul>",
       "js": "const productos = [\n  { nombre: \"Ratón inalámbrico\", categoria: \"Periféricos\", precio: 19.9 },\n  { nombre: \"Teclado mecánico\",  categoria: \"Periféricos\", precio: 49.9 },\n  { nombre: \"Monitor 27\\\"\",      categoria: \"Pantallas\",   precio: 189 },\n  { nombre: \"Portátil 15\\\"\",     categoria: \"Ordenadores\", precio: 799 },\n  { nombre: \"Webcam HD\",         categoria: \"Periféricos\", precio: 39 },\n];\n\nconst norm = (t) => t.normalize(\"NFD\").replace(/[\\u0300-\\u036f]/g, \"\").toLowerCase();\n\nfunction pintar(lista) {\n  document.querySelector(\"#catalogo\").replaceChildren(...lista.map((p) => {\n    const li = document.createElement(\"li\");\n    li.textContent = `${p.nombre} · ${p.categoria} · ${p.precio.toFixed(2)} €`;\n    return li;\n  }));\n  document.querySelector(\"#n\").textContent = `${lista.length} resultados`;\n}\n\ndocument.querySelector(\"#q\").addEventListener(\"input\", (e) => {\n  const texto = norm(e.target.value.trim());\n  pintar(productos.filter((p) => norm(p.nombre + \" \" + p.categoria).includes(texto)));\n});\npintar(productos);",
       "alto": 270
      }
     }
    ]
   }
  ]
 }
};
  APP.register({ slug: "js", contenido: mods });
})();

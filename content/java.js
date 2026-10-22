/* Contenido de java generado a partir de la chuleta de referencia (scripts/convert.py) y revisado a mano. */
(function () {
  const mods = {
 "mod-00": {
  "resumen": "clase · main · nombres · comentarios",
  "secciones": [
   {
    "id": "esqueleto",
    "titulo": "Esqueleto mínimo",
    "bloques": [
     {
      "code": "// Archivo: Saludo.java   (el archivo se llama igual que la clase pública)\npublic class Saludo {\n\n    public static void main(String[] args) {   // punto de entrada: lo llama la JVM, no tú\n        System.out.println(\"Hola, DAW\");      // imprime y salta de línea\n        System.out.print(\"Sin salto \");        // imprime sin saltar de línea\n    }\n}",
      "lang": "java"
     },
     {
      "tabla": {
       "cabs": [
        "Pieza",
        "Qué es"
       ],
       "filas": [
        [
         "`public class Saludo`",
         "La clase. Todo el código Java vive dentro de una clase"
        ],
        [
         "`public static void main(String[] args)`",
         "El método que arranca el programa. `void` = no devuelve nada"
        ],
        [
         "`{ }`",
         "Delimitan un bloque. Una variable declarada dentro solo existe dentro (**ámbito**)"
        ],
        [
         "`;`",
         "Fin de instrucción"
        ],
        [
         "`import javax.swing.JOptionPane;`",
         "Va **antes** de la clase. Trae una clase de otro paquete"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "nombres",
    "titulo": "Convenciones de nombres",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Elemento",
        "Estilo",
        "Ejemplo"
       ],
       "filas": [
        [
         "Clase",
         "`PascalCase`",
         "`CarritoCompra`, `ValidadorDni`"
        ],
        [
         "Variable / método",
         "`camelCase`",
         "`precioTotal`, `calcularIva()`"
        ],
        [
         "Constante",
         "`MAYUSCULAS_CON_GUION`",
         "`IVA_GENERAL`, `MAX_INTENTOS`"
        ],
        [
         "Paquete",
         "`minusculas.con.puntos`",
         "`com.daw.tienda`"
        ],
        [
         "Booleano",
         "pregunta con `es` / `tiene` / `hay`",
         "`esValido`, `tieneDescuento`, `hayStock`"
        ]
       ]
      }
     },
     {
      "nota": "El nombre debe decir **qué guarda**, no qué tipo es: `sumaVentas` mejor que `num`; `nombresAlumnos` mejor que `array1`.",
      "tipo": "tip"
     },
     {
      "p": "Reglas obligatorias: no empezar por número, no usar palabras reservadas (`class`, `int`, `new`…), sin espacios. Java distingue mayúsculas: `total` y `Total` son variables distintas."
     }
    ]
   },
   {
    "id": "comentarios",
    "titulo": "Comentarios",
    "bloques": [
     {
      "code": "// Comentario de una línea\n\n/* Comentario\n   de varias líneas */\n\n/**\n * Javadoc: documenta clases y métodos. IntelliJ lo muestra al pasar el ratón.\n * @param base importe sin impuestos\n * @return importe con IVA\n */",
      "lang": "java"
     }
    ]
   }
  ]
 },
 "mod-01": {
  "resumen": "primitivos · wrappers · constantes · casting",
  "secciones": [
   {
    "id": "primitivos",
    "titulo": "Los 8 tipos primitivos",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Tipo",
        "Tamaño",
        "Rango / precisión",
        "Literal",
        "Cuándo usarlo"
       ],
       "filas": [
        [
         "`byte`",
         "8 bits",
         "-128 a 127",
         "`byte b = 100;`",
         "Datos binarios, archivos. Casi nunca en ejercicios"
        ],
        [
         "`short`",
         "16 bits",
         "-32 768 a 32 767",
         "`short s = 1200;`",
         "Casi nunca"
        ],
        [
         "**`int`**",
         "32 bits",
         "±2 147 483 647 (~2 100 millones)",
         "`int stock = 250;`",
         "**Por defecto para enteros**: contadores, edades, índices, cantidades"
        ],
        [
         "`long`",
         "64 bits",
         "±9,2 × 10¹⁸",
         "`long visitas = 3_000_000_000L;`",
         "Lo que no cabe en `int`: milisegundos, IDs grandes, población"
        ],
        [
         "`float`",
         "32 bits",
         "~7 dígitos",
         "`float t = 36.6f;`",
         "Gráficos y juegos. En clase, usa `double`"
        ],
        [
         "**`double`**",
         "64 bits",
         "~15-16 dígitos",
         "`double precio = 19.99;`",
         "**Por defecto para decimales**: precios, medias, notas"
        ],
        [
         "`char`",
         "16 bits",
         "Un carácter Unicode",
         "`char letra = 'Z';`",
         "Una letra: letra del DNI, inicial, opción de menú"
        ],
        [
         "`boolean`",
         "—",
         "`true` / `false`",
         "`boolean activo = true;`",
         "Indicadores (flags): `encontrado`, `esValido`"
        ]
       ]
      }
     },
     {
      "nota": "`char` va con **comillas simples** (`'A'`) y `String` con **comillas dobles** (`\"A\"`). `'A'` y `\"A\"` no son lo mismo. El guion bajo en números (`1_000_000`) solo sirve para leer mejor; Java lo ignora.",
      "tipo": "note"
     }
    ]
   },
   {
    "id": "valores-defecto",
    "titulo": "Valores por defecto",
    "bloques": [
     {
      "p": "Los arrays y los atributos de clase se rellenan solos. **Las variables locales (las de dentro de un método) no**: si las usas sin darles valor, el código no compila (`variable might not have been initialized`)."
     },
     {
      "tabla": {
       "cabs": [
        "Tipo",
        "Valor inicial en un array"
       ],
       "filas": [
        [
         "`int`, `long`, `short`, `byte`",
         "`0`"
        ],
        [
         "`double`, `float`",
         "`0.0`"
        ],
        [
         "`boolean`",
         "`false`"
        ],
        [
         "`char`",
         "`'\\u0000'` (carácter nulo, invisible)"
        ],
        [
         "`String` y cualquier objeto",
         "`null`"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "referencia",
    "titulo": "Tipos referencia y wrappers",
    "bloques": [
     {
      "p": "Todo lo que **no** es primitivo es un objeto: `String`, arrays, `ArrayList`, `Scanner`… La variable no guarda el dato, guarda **dónde está** (una referencia). Por eso puede valer `null` y se compara con `equals`."
     },
     {
      "p": "Cada primitivo tiene una clase \"envoltorio\" (wrapper). Es obligatoria en `ArrayList` y aporta métodos útiles:"
     },
     {
      "tabla": {
       "cabs": [
        "Primitivo",
        "Wrapper",
        "Métodos útiles"
       ],
       "filas": [
        [
         "`int`",
         "`Integer`",
         "`parseInt`, `valueOf`, `MAX_VALUE`, `toBinaryString`"
        ],
        [
         "`double`",
         "`Double`",
         "`parseDouble`, `isNaN`, `compare`"
        ],
        [
         "`char`",
         "`Character`",
         "`isDigit`, `isLetter`, `toUpperCase` → [MOD.06](@character)"
        ],
        [
         "`boolean`",
         "`Boolean`",
         "`parseBoolean`"
        ],
        [
         "`long`",
         "`Long`",
         "`parseLong`"
        ]
       ]
      }
     },
     {
      "p": "Java convierte solo entre primitivo y wrapper (autoboxing): `Integer n = 5;` y `int m = n;` funcionan."
     }
    ]
   },
   {
    "id": "constantes",
    "titulo": "Constantes y `var`",
    "bloques": [
     {
      "code": "final double IVA = 0.21;          // final: no se puede reasignar → constante\nfinal int MAX_INTENTOS = 3;\n// IVA = 0.10;                    // ✖ error de compilación\n\nvar total = 0.0;                  // Java 10+: deduce el tipo del valor → double\nvar nombre = \"Ana\";               // → String",
      "lang": "java"
     },
     {
      "nota": "Mientras aprendes, escribe el tipo explícito (`double total = 0.0;`). `var` solo vale para variables locales y necesita valor inicial. Además, `var total = 0;` sería `int`, no `double`.",
      "tipo": "tip"
     }
    ]
   },
   {
    "id": "casting",
    "titulo": "Conversión de tipos (casting)",
    "bloques": [
     {
      "consola": "AUTOMÁTICA (ensanchar, sin pérdida) ─────────────────────────────▶\nbyte → short → int → long → float → double\n              char ┘\n◀──────────────────────────── EXPLÍCITA (estrechar, puede perder)"
     },
     {
      "tabla": {
       "cabs": [
        "Código",
        "Resultado",
        "Por qué"
       ],
       "filas": [
        [
         "`double d = 7;`",
         "`7.0`",
         "int → double es automático"
        ],
        [
         "`int n = (int) 9.99;`",
         "`9`",
         "**Trunca**, no redondea"
        ],
        [
         "`int n = (int) -9.99;`",
         "`-9`",
         "Trunca hacia el 0"
        ],
        [
         "`char c = (char) 65;`",
         "`'A'`",
         "Código Unicode → carácter"
        ],
        [
         "`int code = (int) 'A';`",
         "`65`",
         "Carácter → código"
        ],
        [
         "`'a' + 1`",
         "`98`",
         "`char` + `int` da `int`"
        ],
        [
         "`(char) ('a' + 1)`",
         "`'b'`",
         "Se vuelve a convertir a carácter"
        ],
        [
         "`'7' - '0'`",
         "`7`",
         "Truco: dígito en texto → su valor"
        ],
        [
         "`5 / 2 * 2.0`",
         "`4.0`",
         "`5/2` se hace primero entre enteros → `2`"
        ],
        [
         "`5 / 2.0 * 2`",
         "`5.0`",
         "Con un `double` en la división, ya no trunca"
        ]
       ]
      }
     },
     {
      "p": "`byte b = 10; b = b + 1;` no compila (`b + 1` es `int`). `b += 1;` sí, porque `+=` hace el casting por ti."
     },
     {
      "p": "Para pasar de **texto a número** se usa `parse`, no casting → [MOD.03 · Texto ↔ número](@parseo)."
     }
    ]
   }
  ]
 },
 "mod-02": {
  "resumen": "aritméticos · lógicos · ternario · precedencia",
  "secciones": [
   {
    "id": "aritmeticos",
    "titulo": "Aritméticos",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Op",
        "Nombre",
        "Ejemplo",
        "Resultado"
       ],
       "filas": [
        [
         "`+`",
         "Suma / **concatena**",
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
         "Multiplicación",
         "`7 * 2`",
         "`14`"
        ],
        [
         "`/`",
         "División",
         "`7 / 2` · `7.0 / 2`",
         "`3` · `3.5`"
        ],
        [
         "`%`",
         "Resto (módulo)",
         "`7 % 2` · `-7 % 2`",
         "`1` · `-1`"
        ]
       ]
      }
     },
     {
      "aviso": "**`int / int` = `int`**: los decimales se tiran. `7 / 2` da `3`. Si necesitas decimales, que uno de los dos sea `double`: `7 / 2.0`, `total * 1.0 / n` o `(double) total / n`.",
      "tipo": "warning"
     },
     {
      "p": "**`+` con texto concatena, y se evalúa de izquierda a derecha:**"
     },
     {
      "code": "\"Total: \" + 5 + 3      // \"Total: 53\"   (primero \"Total: 5\", luego + \"3\")\n\"Total: \" + (5 + 3)    // \"Total: 8\"    (el paréntesis va primero)\n5 + 3 + \" uds\"         // \"8 uds\"       (primero 5 + 3 = 8, luego texto)",
      "lang": "java"
     }
    ]
   },
   {
    "id": "incremento",
    "titulo": "Incremento y decremento",
    "bloques": [
     {
      "code": "int a = 5;\nint b = a++;   // b = 5, a = 6  → postfijo: USA el valor y LUEGO suma\nint c = ++a;   // c = 7, a = 7  → prefijo: SUMA primero y LUEGO usa\na--;           // resta 1",
      "lang": "java"
     },
     {
      "p": "Sueltos en una línea (`i++;`) los dos hacen lo mismo. La diferencia solo importa si están dentro de otra expresión."
     }
    ]
   },
   {
    "id": "asignacion",
    "titulo": "Asignación compuesta",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Forma corta",
        "Equivale a",
        "Uso típico"
       ],
       "filas": [
        [
         "`total += precio;`",
         "`total = total + precio;`",
         "Acumular"
        ],
        [
         "`saldo -= retirada;`",
         "`saldo = saldo - retirada;`",
         "Descontar"
        ],
        [
         "`importe *= 1.21;`",
         "`importe = importe * 1.21;`",
         "Aplicar un porcentaje"
        ],
        [
         "`n /= 10;`",
         "`n = n / 10;`",
         "Quitar el último dígito"
        ],
        [
         "`n %= 60;`",
         "`n = n % 60;`",
         "Quedarse con el resto"
        ],
        [
         "`texto += \"x\";`",
         "`texto = texto + \"x\";`",
         "Añadir texto"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "comparacion",
    "titulo": "Comparación (devuelven `boolean`)",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Op",
        "Significado",
        "Ejemplo"
       ],
       "filas": [
        [
         "`==`",
         "Igual",
         "`edad == 18`"
        ],
        [
         "`!=`",
         "Distinto",
         "`opcion != 0`"
        ],
        [
         "`>` `<`",
         "Mayor / menor",
         "`stock > 0`"
        ],
        [
         "`>=` `<=`",
         "Mayor o igual / menor o igual",
         "`nota >= 5`"
        ]
       ]
      }
     },
     {
      "nota": "Con **String** no se usa `==`: compara direcciones de memoria, no el texto. Usa `texto.equals(\"hola\")` → [MOD.06 · Comparar](@string-comparar).",
      "tipo": "important"
     }
    ]
   },
   {
    "id": "logicos",
    "titulo": "Lógicos",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Op",
        "Nombre",
        "Es `true` cuando…",
        "Ejemplo real"
       ],
       "filas": [
        [
         "`&&`",
         "Y (AND)",
         "las dos condiciones son `true`",
         "`edad >= 18 && tieneDni`"
        ],
        [
         "`||`",
         "O (OR)",
         "al menos una es `true`",
         "`esAdmin || esPropietario`"
        ],
        [
         "`!`",
         "NO (NOT)",
         "invierte el valor",
         "`!encontrado`"
        ],
        [
         "`^`",
         "O exclusivo (XOR)",
         "solo una de las dos es `true`",
         "Poco usado"
        ]
       ]
      }
     },
     {
      "p": "**Cortocircuito:** `&&` no evalúa la derecha si la izquierda ya es `false`, y `||` no la evalúa si la izquierda ya es `true`. Por eso el **orden importa**:"
     },
     {
      "code": "if (texto != null && texto.length() > 0) { ... }   // ✔ si es null, ni mira length()\nif (texto.length() > 0 && texto != null) { ... }   // ✖ NullPointerException si es null",
      "lang": "java"
     }
    ]
   },
   {
    "id": "ternario",
    "titulo": "Ternario `condición ? siEsTrue : siEsFalse`",
    "bloques": [
     {
      "p": "Un `if-else` en una línea **que devuelve un valor**:"
     },
     {
      "code": "String estado = (stock > 0) ? \"Disponible\" : \"Agotado\";\ndouble envio  = (total >= 50) ? 0 : 4.99;\nString plural = (n == 1) ? \"artículo\" : \"artículos\";",
      "lang": "java"
     },
     {
      "p": "Úsalo solo para elegir **un valor entre dos**. Si hay más lógica, usa `if`."
     }
    ]
   },
   {
    "id": "precedencia",
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
         "`()` paréntesis"
        ],
        [
         "2",
         "`++` `--` `!` `-` (unarios) · `(tipo)` casting"
        ],
        [
         "3",
         "`*` `/` `%`"
        ],
        [
         "4",
         "`+` `-`"
        ],
        [
         "5",
         "`<` `<=` `>` `>=`"
        ],
        [
         "6",
         "`==` `!=`"
        ],
        [
         "7",
         "`&&`"
        ],
        [
         "8",
         "`||`"
        ],
        [
         "9",
         "`? :`"
        ],
        [
         "10",
         "`=` `+=` `-=` …"
        ]
       ]
      }
     },
     {
      "nota": "Ante la duda, pon paréntesis. `(a + b) / 2` se lee mejor que confiar en la tabla.",
      "tipo": "tip"
     }
    ]
   }
  ]
 },
 "mod-03": {
  "resumen": "JOptionPane · Scanner · printf · parse",
  "secciones": [
   {
    "id": "joptionpane",
    "titulo": "JOptionPane (ventanas)",
    "bloques": [
     {
      "code": "import javax.swing.JOptionPane;",
      "lang": "java"
     },
     {
      "tabla": {
       "cabs": [
        "Método",
        "Devuelve",
        "Para qué"
       ],
       "filas": [
        [
         "`showInputDialog(\"Edad:\")`",
         "`String` (**`null` si pulsa Cancelar**)",
         "Pedir un dato"
        ],
        [
         "`showMessageDialog(null, \"Hola\")`",
         "nada",
         "Mostrar un mensaje"
        ],
        [
         "`showMessageDialog(null, msg, \"Título\", JOptionPane.ERROR_MESSAGE)`",
         "nada",
         "Mensaje con título e icono"
        ],
        [
         "`showConfirmDialog(null, \"¿Seguro?\")`",
         "`int`: `YES_OPTION` (0), `NO_OPTION` (1), `CANCEL_OPTION` (2)",
         "Sí / No / Cancelar"
        ],
        [
         "`showOptionDialog(...)`",
         "`int`: índice del botón pulsado (`-1` si cierra con la X)",
         "Botones personalizados → [E09](@e09)"
        ]
       ]
      }
     },
     {
      "p": "Iconos: `INFORMATION_MESSAGE` · `WARNING_MESSAGE` · `ERROR_MESSAGE` · `QUESTION_MESSAGE` · `PLAIN_MESSAGE` (sin icono)."
     },
     {
      "code": "String edadTexto = JOptionPane.showInputDialog(\"Edad:\");\nif (edadTexto == null) {\n    // pulsó Cancelar o cerró la ventana\n} else {\n    int edad = Integer.parseInt(edadTexto.trim());\n}\n\nint respuesta = JOptionPane.showConfirmDialog(null, \"¿Borrar el pedido?\");\nif (respuesta == JOptionPane.YES_OPTION) { ... }",
      "lang": "java"
     },
     {
      "nota": "`\"\\n\"` hace salto de línea dentro de la ventana. Si el mensaje empieza por `<html>`, la ventana interpreta HTML: `<pre>...</pre>` usa letra monoespaciada para alinear columnas → [E10](@e10).",
      "tipo": "tip"
     }
    ]
   },
   {
    "id": "scanner",
    "titulo": "Scanner (consola)",
    "bloques": [
     {
      "code": "import java.util.Scanner;\n\nScanner teclado = new Scanner(System.in);\nSystem.out.print(\"Nombre: \");\nString nombre = teclado.nextLine();",
      "lang": "java"
     },
     {
      "tabla": {
       "cabs": [
        "Método",
        "Lee",
        "Ojo"
       ],
       "filas": [
        [
         "`nextLine()`",
         "La línea entera, con espacios",
         "—"
        ],
        [
         "`next()`",
         "Una palabra (hasta el espacio)",
         "—"
        ],
        [
         "`nextInt()`",
         "Un `int`",
         "Deja el salto de línea (`Enter`) pendiente"
        ],
        [
         "`nextDouble()`",
         "Un `double`",
         "Usa el idioma del sistema: en un PC en español espera `3,5`"
        ],
        [
         "`nextBoolean()`",
         "`true` / `false`",
         "—"
        ],
        [
         "`hasNextInt()`",
         "`true` si lo siguiente es un `int`",
         "Sirve para validar antes de leer"
        ],
        [
         "`close()`",
         "Cierra el Scanner",
         "Al final del programa"
        ]
       ]
      }
     },
     {
      "aviso": "**La trampa del `nextInt()` + `nextLine()`**: tras `nextInt()` queda el `Enter` en el búfer, y el siguiente `nextLine()` lo lee como línea vacía. Solución: un `teclado.nextLine();` extra después de `nextInt()`, o leerlo todo con `nextLine()` y convertir con `Integer.parseInt(...)`.",
      "tipo": "warning"
     }
    ]
   },
   {
    "id": "printf",
    "titulo": "printf / String.format",
    "bloques": [
     {
      "p": "`System.out.printf(...)` imprime y `String.format(...)` devuelve el texto (útil para JOptionPane). Desde Java 15 también existe `\"%d uds\".formatted(3)`."
     },
     {
      "tabla": {
       "cabs": [
        "Formato",
        "Para",
        "Ejemplo",
        "Salida"
       ],
       "filas": [
        [
         "`%d`",
         "Entero",
         "`\"%d uds\", 3`",
         "`3 uds`"
        ],
        [
         "`%f`",
         "Decimal",
         "`\"%f\", 3.5`",
         "`3,500000`"
        ],
        [
         "`%.2f`",
         "Decimal con 2 cifras (redondea)",
         "`\"%.2f\", 3.14159`",
         "`3,14`"
        ],
        [
         "`%s`",
         "Texto (o cualquier cosa)",
         "`\"Hola %s\", \"Ana\"`",
         "`Hola Ana`"
        ],
        [
         "`%c`",
         "Carácter",
         "`\"%c\", 'Z'`",
         "`Z`"
        ],
        [
         "`%b`",
         "Booleano",
         "`\"%b\", true`",
         "`true`"
        ],
        [
         "`%n`",
         "Salto de línea",
         "—",
         "—"
        ],
        [
         "`%%`",
         "El símbolo `%`",
         "`\"IVA 21%%\"`",
         "`IVA 21%`"
        ],
        [
         "`%8.2f`",
         "Ancho 8, alineado a la derecha",
         "`\"%8.2f|\", 3.5`",
         "`    3,50|`"
        ],
        [
         "`%-10s`",
         "Ancho 10, alineado a la izquierda",
         "`\"%-10s|\", \"Café\"`",
         "`Café      |`"
        ],
        [
         "`%05d`",
         "Rellenar con ceros",
         "`\"%05d\", 42`",
         "`00042`"
        ],
        [
         "`%,d`",
         "Separador de miles",
         "`\"%,d\", 1234567`",
         "`1.234.567`"
        ]
       ]
      }
     },
     {
      "nota": "`printf` y `format` usan **el idioma de tu sistema**. En un Windows en español, `%.2f` escribe `3,14` (con coma). Si necesitas punto: `String.format(Locale.US, \"%.2f\", x)` con `import java.util.Locale;`.",
      "tipo": "important"
     },
     {
      "code": "// Ticket con columnas alineadas\nSystem.out.printf(\"%-12s %8.2f €%n\", \"Café\", 1.5);\nSystem.out.printf(\"%-12s %8.2f €%n\", \"Croissant\", 2.25);",
      "lang": "java"
     }
    ]
   },
   {
    "id": "parseo",
    "titulo": "Texto ↔ número",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "De → A",
        "Cómo",
        "Ejemplo"
       ],
       "filas": [
        [
         "`String` → `int`",
         "`Integer.parseInt(texto)`",
         "`Integer.parseInt(\"42\")` → `42`"
        ],
        [
         "`String` → `double`",
         "`Double.parseDouble(texto)`",
         "`Double.parseDouble(\"3.5\")` → `3.5`"
        ],
        [
         "`String` → `long`",
         "`Long.parseLong(texto)`",
         "—"
        ],
        [
         "`String` → `boolean`",
         "`Boolean.parseBoolean(texto)`",
         "`\"true\"` → `true` (cualquier otra cosa → `false`)"
        ],
        [
         "`String` → `char`",
         "`texto.charAt(0)`",
         "`\"S\".charAt(0)` → `'S'`"
        ],
        [
         "número → `String`",
         "`String.valueOf(n)` · `\"\" + n` · `Integer.toString(n)`",
         "`String.valueOf(3.5)` → `\"3.5\"`"
        ],
        [
         "`char` dígito → `int`",
         "`c - '0'` · `Character.getNumericValue(c)`",
         "`'7' - '0'` → `7`"
        ],
        [
         "`char` → `String`",
         "`String.valueOf(c)`",
         "`'A'` → `\"A\"`"
        ]
       ]
      }
     },
     {
      "aviso": "- `Integer.parseInt(\" 42\")` **falla** (`NumberFormatException`) por el espacio → usa `.trim()` antes. - `Double.parseDouble(\"3,5\")` **falla**: solo acepta punto → `texto.replace(\",\", \".\")` antes. - `Integer.parseInt(\"12abc\")` y `Integer.parseInt(\"\")` también fallan → [MOD.12 · try-catch](@try-catch).",
      "tipo": "warning"
     }
    ]
   }
  ]
 },
 "mod-04": {
  "resumen": "if · switch · for · while · do-while · for-each",
  "secciones": [
   {
    "id": "if",
    "titulo": "if / else if / else",
    "bloques": [
     {
      "code": "// Gastos de envío según el importe del pedido (rangos → if/else if)\ndouble envio;\nif (totalPedido >= 50) {\n    envio = 0;\n} else if (totalPedido >= 20) {\n    envio = 2.99;\n} else {\n    envio = 4.99;\n}",
      "lang": "java"
     },
     {
      "lista": [
       "Se evalúan **de arriba abajo** y se ejecuta **solo el primer** bloque que cumple. Ordena los rangos de más a menos restrictivo (o al revés, pero con coherencia).",
       "Usa siempre llaves `{ }` aunque haya una sola línea: evita errores al añadir líneas después.",
       "Varias condiciones a la vez → `&&` / `||` en lugar de `if` anidados:"
      ]
     },
     {
      "code": "if (edad >= 18 && tieneEntrada) { ... }        // en vez de if (edad >= 18) { if (tieneEntrada) { ... } }",
      "lang": "java"
     }
    ]
   },
   {
    "id": "switch",
    "titulo": "switch",
    "bloques": [
     {
      "p": "**Clásico** (necesita `break`; sin él, sigue ejecutando los `case` de abajo):"
     },
     {
      "code": "switch (opcion) {\n    case 1:\n        consultarSaldo();\n        break;\n    case 2:\n    case 3:                       // dos casos agrupados (aprovecha que sin break \"cae\" al siguiente)\n        operar();\n        break;\n    default:                      // ninguno coincide (como el else)\n        System.out.println(\"Opción no válida\");\n}",
      "lang": "java"
     },
     {
      "p": "**Con flechas** (Java 14+, sin `break` ni \"caídas\"):"
     },
     {
      "code": "switch (opcion) {\n    case 1 -> consultarSaldo();\n    case 2, 3 -> operar();\n    default -> System.out.println(\"Opción no válida\");\n}",
      "lang": "java"
     },
     {
      "p": "**Como expresión** (devuelve un valor):"
     },
     {
      "code": "String tipoDia = switch (numeroDia) {\n    case 1, 2, 3, 4, 5 -> \"Laborable\";\n    case 6, 7 -> \"Fin de semana\";\n    default -> \"Día no válido\";\n};",
      "lang": "java"
     },
     {
      "nota": "`switch` admite `int`, `char`, `String` (y `byte`, `short`, `enum`). **No** admite `double`, `long`, `boolean` ni rangos (`case > 5` no existe).",
      "tipo": "note"
     }
    ]
   },
   {
    "id": "for",
    "titulo": "for",
    "bloques": [
     {
      "consola": "for ( inicio ; condición ; actualización ) { cuerpo }\n      │         │           └─ 3. después de cada vuelta\n      │         └─ 2. antes de cada vuelta: si es false, sale\n      └─ 1. una sola vez, al empezar"
     },
     {
      "code": "for (int i = 0; i < 10; i++) { ... }               // 0..9 → 10 vueltas\nfor (int i = 1; i <= 10; i++) { ... }              // 1..10\nfor (int i = array.length - 1; i >= 0; i--) { ... } // recorrer al revés\nfor (int i = 0; i < 100; i += 5) { ... }           // de 5 en 5",
      "lang": "java"
     }
    ]
   },
   {
    "id": "while",
    "titulo": "while",
    "bloques": [
     {
      "p": "Comprueba **antes** de cada vuelta. Si la condición es falsa al empezar, no entra nunca."
     },
     {
      "code": "// Pedir hasta que el stock solicitado sea válido (no sé cuántos intentos hará el usuario)\nint cantidad = Integer.parseInt(JOptionPane.showInputDialog(\"Unidades:\"));\nwhile (cantidad <= 0 || cantidad > stockDisponible) {\n    cantidad = Integer.parseInt(JOptionPane.showInputDialog(\"Entre 1 y \" + stockDisponible + \":\"));\n}",
      "lang": "java"
     }
    ]
   },
   {
    "id": "do-while",
    "titulo": "do-while",
    "bloques": [
     {
      "p": "Ejecuta **primero** y comprueba **después** → mínimo una vuelta. Lleva `;` al final."
     },
     {
      "code": "int opcion;                       // declarada fuera: el while de abajo la necesita\ndo {\n    opcion = Integer.parseInt(JOptionPane.showInputDialog(\"1. Jugar\\n2. Opciones\\n0. Salir\"));\n    // ...\n} while (opcion != 0);",
      "lang": "java"
     }
    ]
   },
   {
    "id": "for-each",
    "titulo": "for-each",
    "bloques": [
     {
      "p": "Recorre todos los elementos **sin índice**. Solo lectura: no sabes en qué posición estás y no puedes reemplazar elementos."
     },
     {
      "code": "double total = 0;\nfor (double precio : precios) {       // \"para cada precio de precios\"\n    total += precio;\n}\n\nfor (String nombre : listaNombres) {  // también con ArrayList\n    System.out.println(nombre);\n}",
      "lang": "java"
     }
    ]
   },
   {
    "id": "break-continue",
    "titulo": "break / continue",
    "bloques": [
     {
      "code": "// break: salir del bucle en cuanto se encuentra lo buscado\nint posicion = -1;\nfor (int i = 0; i < codigos.length; i++) {\n    if (codigos[i].equals(codigoBuscado)) {\n        posicion = i;\n        break;\n    }\n}\n\n// continue: saltar a la siguiente vuelta (ignorar lo que no interesa)\nfor (String linea : lineas) {\n    if (linea.isBlank()) {\n        continue;            // línea vacía: pasar a la siguiente\n    }\n    procesar(linea);\n}",
      "lang": "java"
     },
     {
      "nota": "En lugar de `while (true)` + `break`, usa una variable `boolean` que controle el bucle (`while (seguir)`). Se lee mejor y se ve en la condición cuándo termina → [E09](@e09), [E10](@e10).",
      "tipo": "tip"
     }
    ]
   },
   {
    "id": "anidados",
    "titulo": "Bucles anidados",
    "bloques": [
     {
      "p": "El de dentro da **todas** sus vueltas por cada vuelta del de fuera (filas × columnas)."
     },
     {
      "code": "// Tabla de precios: 3 tallas x 4 colores\nfor (int talla = 0; talla < 3; talla++) {\n    for (int color = 0; color < 4; color++) {\n        System.out.print(precios[talla][color] + \"\\t\");\n    }\n    System.out.println();    // al acabar cada fila, salto de línea\n}",
      "lang": "java"
     }
    ]
   }
  ]
 },
 "mod-05": {
  "resumen": "qué estructura según la necesidad",
  "secciones": [
   {
    "id": "elegir-condicional",
    "titulo": "Condicional",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Necesito…",
        "Usa",
        "Por qué",
        "Ejemplo real"
       ],
       "filas": [
        [
         "Dos caminos",
         "`if / else`",
         "Lo más simple",
         "¿Hay stock o no?"
        ],
        [
         "Rangos de valores",
         "`if / else if`",
         "`switch` no admite `>` ni `<`",
         "Tramos de envío, notas (suspenso, aprobado…)"
        ],
        [
         "Varias condiciones combinadas",
         "`if` con `&&` / `||`",
         "Expresa la regla en una línea",
         "Mayor de edad **y** con entrada"
        ],
        [
         "Un valor exacto de una lista cerrada",
         "`switch`",
         "Más limpio que 5 `else if` con `==`",
         "Opción de menú, día de la semana, código de estado"
        ],
        [
         "Elegir uno de dos **valores**",
         "Ternario `? :`",
         "Una línea, devuelve valor",
         "`\"artículo\"` / `\"artículos\"`"
        ],
        [
         "Un valor según muchos casos exactos",
         "`switch` expresión",
         "Asigna directamente",
         "Número de mes → nombre del mes"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "elegir-bucle",
    "titulo": "Bucle",
    "bloques": [
     {
      "consola": "¿Sé cuántas iteraciones habrá antes de empezar?\n ├─ Sí\n │   ¿Necesito la posición i o modificar elementos?\n │    ├─ Sí ─────────────────────────────────────► for clásico\n │    └─ No, solo leer cada uno ─────────────────► for-each\n └─ No, depende de lo que pase\n     ¿Tiene que ejecutarse al menos una vez?\n      ├─ Sí: menú, pedir un dato ────────────────► do-while\n      └─ No: puede que nunca entre ──────────────► while"
     },
     {
      "tabla": {
       "cabs": [
        "Bucle",
        "Úsalo cuando…",
        "Ejemplo real"
       ],
       "filas": [
        [
         "`for`",
         "Sabes las vueltas o necesitas el índice",
         "Recorrer un array por posición, repetir N veces, leer dos arrays paralelos"
        ],
        [
         "`for-each`",
         "Quieres cada elemento y no te importa la posición",
         "Sumar precios, imprimir una lista"
        ],
        [
         "`while`",
         "Repites mientras se cumpla algo y puede que no entre",
         "Leer líneas hasta el final, reintentar mientras falle"
        ],
        [
         "`do-while`",
         "Al menos una vez y luego decides si repetir",
         "Menús, pedir un dato hasta que sea válido"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "elegir-tipo",
    "titulo": "Tipo de dato",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Para guardar…",
        "Tipo",
        "Ojo"
       ],
       "filas": [
        [
         "Cantidades, contadores, edades, índices",
         "`int`",
         "—"
        ],
        [
         "Precios, medias, notas con decimales",
         "`double`",
         "Imprecisión: `0.1 + 0.2 ≠ 0.3` → [MOD.07](@num-trampas)"
        ],
        [
         "Dinero en aplicaciones reales",
         "`BigDecimal` (o céntimos en `long`)",
         "En clase basta con `double`"
        ],
        [
         "Números enormes, milisegundos",
         "`long`",
         "Literal con `L`: `3_000_000_000L`"
        ],
        [
         "Sí / No, encontrado / no encontrado",
         "`boolean`",
         "Nombre tipo pregunta: `esValido`"
        ],
        [
         "Una sola letra o símbolo",
         "`char`",
         "Comillas simples"
        ],
        [
         "Texto, aunque sean números que no se operan",
         "`String`",
         "DNI, teléfono, código postal (`\"08001\"` como `int` perdería el `0`)"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "elegir-coleccion",
    "titulo": "Colección",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Situación",
        "Usa"
       ],
       "filas": [
        [
         "Sé el tamaño y no cambia (días de la semana, 12 meses, tablero 8×8)",
         "**Array** `tipo[]`"
        ],
        [
         "Crece y encoge (carrito, cola de clientes, resultados de un filtro)",
         "**ArrayList**"
        ],
        [
         "Datos en filas y columnas (butacas, notas por alumno y evaluación)",
         "**Array 2D** `tipo[][]`"
        ],
        [
         "Tipos primitivos y máximo rendimiento",
         "**Array** (ArrayList solo admite objetos: `Integer`, no `int`)"
        ]
       ]
      }
     },
     {
      "p": "Comparativa completa → [MOD.10 · Array vs ArrayList](@array-vs-arraylist)."
     }
    ]
   },
   {
    "id": "elegir-texto",
    "titulo": "Texto",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Situación",
        "Usa",
        "Por qué"
       ],
       "filas": [
        [
         "Texto que no cambia o cambia poco",
         "`String`",
         "Simple"
        ],
        [
         "Construir texto dentro de un bucle",
         "`StringBuilder`",
         "Cada `+=` sobre un String crea un objeto nuevo; StringBuilder modifica el mismo"
        ],
        [
         "Un solo carácter",
         "`char`",
         "Se compara con `==`"
        ],
        [
         "Texto con formato (decimales, columnas)",
         "`String.format`",
         "Control de decimales y alineación"
        ]
       ]
      }
     }
    ]
   }
  ]
 },
 "mod-06": {
  "resumen": "métodos · comparar · Character · StringBuilder",
  "secciones": [
   {
    "id": "string-indices",
    "titulo": "Índices",
    "bloques": [
     {
      "consola": "  texto = \"Hola Mundo\"\n           H o l a   M u n d o\n  índice   0 1 2 3 4 5 6 7 8 9        length() = 10   ·   último = length() - 1"
     }
    ]
   },
   {
    "id": "string-metodos",
    "titulo": "Métodos más usados",
    "bloques": [
     {
      "p": "Ejemplos con `String s = \"Hola Mundo\";`"
     },
     {
      "tabla": {
       "cabs": [
        "Método",
        "Devuelve",
        "Ejemplo",
        "Resultado"
       ],
       "filas": [
        [
         "**Información**",
         "",
         "",
         ""
        ],
        [
         "`length()`",
         "`int`",
         "`s.length()`",
         "`10`"
        ],
        [
         "`charAt(i)`",
         "`char`",
         "`s.charAt(0)`",
         "`'H'`"
        ],
        [
         "`isEmpty()`",
         "`boolean`",
         "`\"\".isEmpty()` · `\"  \".isEmpty()`",
         "`true` · `false`"
        ],
        [
         "`isBlank()` (Java 11)",
         "`boolean`",
         "`\"   \".isBlank()`",
         "`true` (vacío o solo espacios)"
        ],
        [
         "**Buscar**",
         "",
         "",
         ""
        ],
        [
         "`indexOf(x)`",
         "`int` (`-1` si no está)",
         "`s.indexOf(\"o\")` · `s.indexOf(\"xyz\")`",
         "`1` · `-1`"
        ],
        [
         "`indexOf(x, desde)`",
         "`int`",
         "`s.indexOf('o', 2)`",
         "`9`"
        ],
        [
         "`lastIndexOf(x)`",
         "`int`",
         "`s.lastIndexOf(\"o\")`",
         "`9`"
        ],
        [
         "`contains(x)`",
         "`boolean`",
         "`s.contains(\"Mun\")`",
         "`true`"
        ],
        [
         "`startsWith(x)`",
         "`boolean`",
         "`s.startsWith(\"Ho\")`",
         "`true`"
        ],
        [
         "`endsWith(x)`",
         "`boolean`",
         "`\"foto.png\".endsWith(\".png\")`",
         "`true`"
        ],
        [
         "**Extraer**",
         "",
         "",
         ""
        ],
        [
         "`substring(desde)`",
         "`String`",
         "`s.substring(5)`",
         "`\"Mundo\"`"
        ],
        [
         "`substring(desde, hasta)`",
         "`String` (**`hasta` no se incluye**)",
         "`s.substring(0, 4)`",
         "`\"Hola\"`"
        ],
        [
         "**Transformar**",
         "",
         "",
         ""
        ],
        [
         "`toUpperCase()` / `toLowerCase()`",
         "`String`",
         "`s.toUpperCase()`",
         "`\"HOLA MUNDO\"`"
        ],
        [
         "`trim()`",
         "`String`",
         "`\"  hi  \".trim()`",
         "`\"hi\"`"
        ],
        [
         "`strip()` (Java 11)",
         "`String`",
         "Como `trim`, pero también quita espacios Unicode",
         "—"
        ],
        [
         "`replace(a, b)`",
         "`String` (todas las apariciones)",
         "`s.replace(\"o\", \"0\")`",
         "`\"H0la Mund0\"`"
        ],
        [
         "`replaceAll(regex, b)`",
         "`String`",
         "`\"a   b\".replaceAll(\"\\\\s+\", \" \")`",
         "`\"a b\"`"
        ],
        [
         "`repeat(n)` (Java 11)",
         "`String`",
         "`\"ab\".repeat(3)`",
         "`\"ababab\"`"
        ],
        [
         "**Comparar**",
         "",
         "",
         ""
        ],
        [
         "`equals(x)`",
         "`boolean`",
         "`s.equals(\"Hola Mundo\")`",
         "`true`"
        ],
        [
         "`equalsIgnoreCase(x)`",
         "`boolean`",
         "`\"SI\".equalsIgnoreCase(\"si\")`",
         "`true`"
        ],
        [
         "`compareTo(x)`",
         "`int` (`<0`, `0`, `>0`)",
         "`\"ana\".compareTo(\"bea\")`",
         "`-1` (va antes)"
        ],
        [
         "`compareToIgnoreCase(x)`",
         "`int`",
         "—",
         "Ordena sin distinguir mayúsculas"
        ],
        [
         "**Dividir y unir**",
         "",
         "",
         ""
        ],
        [
         "`split(regex)`",
         "`String[]`",
         "`s.split(\" \")`",
         "`[\"Hola\", \"Mundo\"]`"
        ],
        [
         "`String.join(sep, ...)`",
         "`String`",
         "`String.join(\"-\", \"a\", \"b\", \"c\")`",
         "`\"a-b-c\"`"
        ],
        [
         "**Convertir**",
         "",
         "",
         ""
        ],
        [
         "`toCharArray()`",
         "`char[]`",
         "`\"hey\".toCharArray()`",
         "`['h', 'e', 'y']`"
        ],
        [
         "`String.valueOf(x)`",
         "`String`",
         "`String.valueOf(3.5)`",
         "`\"3.5\"`"
        ],
        [
         "`matches(regex)`",
         "`boolean`",
         "`\"12345678Z\".matches(\"\\\\d{8}[A-Z]\")`",
         "`true`"
        ]
       ]
      }
     },
     {
      "aviso": "**Trampas de `split`** (recibe una expresión regular): - `\"1.2.3\".split(\".\")` devuelve un array **vacío**: el `.` significa \"cualquier carácter\". Usa `split(\"\\\\.\")`. Lo mismo con `|`, `+`, `*`, `?` → `\"\\\\|\"`, `\"\\\\+\"`… - `\"a,b,,\".split(\",\")` → `[\"a\", \"b\"]`: los vacíos **del final** se descartan (los del medio no: `\"a,,c\"` → `[\"a\", \"\", \"c\"]`). - Para separar por uno o más espacios: `texto.trim().split(\"\\\\s+\")`.",
      "tipo": "warning"
     }
    ]
   },
   {
    "id": "string-comparar",
    "titulo": "Comparar Strings",
    "bloques": [
     {
      "code": "String respuesta = JOptionPane.showInputDialog(\"¿Continuar? (si/no)\");\n\nif (respuesta == \"si\") { ... }                  // ✖ compara si son el MISMO objeto en memoria\nif (respuesta.equals(\"si\")) { ... }             // ✔ compara el texto\nif (\"si\".equalsIgnoreCase(respuesta)) { ... }   // ✔✔ ignora mayúsculas y no falla si respuesta es null",
      "lang": "java"
     },
     {
      "p": "`compareTo` sirve para **ordenar** alfabéticamente. Las mayúsculas van antes que las minúsculas (`\"Zeta\".compareTo(\"ana\")` es negativo), así que para un orden \"humano\" usa `compareToIgnoreCase`."
     }
    ]
   },
   {
    "id": "character",
    "titulo": "Character (analizar letra a letra)",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Método",
        "Devuelve `true` si… / hace",
        "Ejemplo"
       ],
       "filas": [
        [
         "`Character.isDigit(c)`",
         "es un dígito",
         "`'7'` → `true`"
        ],
        [
         "`Character.isLetter(c)`",
         "es una letra (incluye `ñ`, `á`)",
         "`'ñ'` → `true`"
        ],
        [
         "`Character.isLetterOrDigit(c)`",
         "letra o dígito",
         "`'_'` → `false`"
        ],
        [
         "`Character.isUpperCase(c)` / `isLowerCase(c)`",
         "mayúscula / minúscula",
         "`'A'` → `true`"
        ],
        [
         "`Character.isWhitespace(c)`",
         "espacio, tabulador, salto",
         "`' '` → `true`"
        ],
        [
         "`Character.toUpperCase(c)` / `toLowerCase(c)`",
         "convierte",
         "`'a'` → `'A'`"
        ],
        [
         "`Character.getNumericValue(c)`",
         "valor del dígito",
         "`'7'` → `7`"
        ]
       ]
      }
     },
     {
      "code": "// Plantilla: recorrer un texto carácter a carácter\nfor (int i = 0; i < texto.length(); i++) {\n    char caracter = texto.charAt(i);\n    if (Character.isDigit(caracter)) { ... }\n}",
      "lang": "java"
     },
     {
      "p": "Los `char` se comparan con `==` y con `<`/`>` (por su código): `'a' < 'b'` es `true`."
     }
    ]
   },
   {
    "id": "stringbuilder",
    "titulo": "StringBuilder (texto que se modifica)",
    "bloques": [
     {
      "code": "StringBuilder sb = new StringBuilder(\"Java\");\nsb.append(\" 21\");            // \"Java 21\"         añade al final (encadenable)\nsb.insert(0, \">> \");         // \">> Java 21\"      inserta en una posición\nsb.reverse();                // \"12 avaJ >>\"      da la vuelta\nString resultado = sb.toString();   // de vuelta a String",
      "lang": "java"
     },
     {
      "tabla": {
       "cabs": [
        "Método",
        "Hace"
       ],
       "filas": [
        [
         "`append(x)`",
         "Añade al final (cualquier tipo)"
        ],
        [
         "`insert(i, x)`",
         "Inserta en la posición `i`"
        ],
        [
         "`reverse()`",
         "Invierte"
        ],
        [
         "`deleteCharAt(i)`",
         "Borra el carácter de la posición `i`"
        ],
        [
         "`delete(desde, hasta)`",
         "Borra un tramo (`hasta` no incluido)"
        ],
        [
         "`setCharAt(i, c)`",
         "Cambia el carácter de la posición `i`"
        ],
        [
         "`length()` · `charAt(i)` · `indexOf(x)`",
         "Igual que en String"
        ],
        [
         "`toString()`",
         "Lo convierte en `String`"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "string-patrones",
    "titulo": "Patrones típicos con texto",
    "bloques": [
     {
      "code": "// Contar vocales\nint vocales = 0;\nfor (char c : texto.toLowerCase().toCharArray()) {\n    if (\"aeiouáéíóú\".indexOf(c) != -1) vocales++;\n}\n\n// Contar palabras (aunque haya varios espacios seguidos)\nint palabras = texto.isBlank() ? 0 : texto.trim().split(\"\\\\s+\").length;\n\n// Invertir y comprobar palíndromo\nString invertido = new StringBuilder(texto).reverse().toString();\nboolean esPalindromo = invertido.equalsIgnoreCase(texto);\n\n// Primera letra en mayúscula (\"madrid\" → \"Madrid\")\nString capitalizado = texto.substring(0, 1).toUpperCase() + texto.substring(1).toLowerCase();\n\n// Extensión de un archivo (\"informe.final.pdf\" → \"pdf\")\nString extension = archivo.substring(archivo.lastIndexOf('.') + 1);\n\n// Dominio de un email (\"ana@empresa.es\" → \"empresa.es\")\nString dominio = email.substring(email.indexOf('@') + 1);\n\n// Enmascarar una tarjeta (\"1234567812345678\" → \"**** **** **** 5678\")\nString oculta = \"**** **** **** \" + tarjeta.substring(tarjeta.length() - 4);\n\n// Validación básica de email: tiene @ y después un punto\nboolean emailValido = email.indexOf('@') > 0 && email.lastIndexOf('.') > email.indexOf('@');",
      "lang": "java"
     },
     {
      "p": "Aplicado en: [E03 Contraseña](@e03) · [E04 Email corporativo](@e04) · [E05 DNI](@e05) · [E08 Logs](@e08)"
     }
    ]
   }
  ],
  "intro": [
   {
    "nota": "Un `String` es **inmutable**: ningún método lo modifica, todos devuelven uno nuevo. `nombre.toUpperCase();` sola no hace nada; tienes que guardarlo: `nombre = nombre.toUpperCase();`",
    "tipo": "important"
   }
  ]
 },
 "mod-07": {
  "resumen": "Integer · Double · división · módulo · trampas",
  "secciones": [
   {
    "id": "wrappers-numericos",
    "titulo": "Integer, Long y Double",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Miembro",
        "Devuelve",
        "Ejemplo",
        "Resultado"
       ],
       "filas": [
        [
         "`Integer.MAX_VALUE` / `MIN_VALUE`",
         "`int`",
         "—",
         "`2147483647` / `-2147483648`"
        ],
        [
         "`Integer.parseInt(texto)`",
         "`int`",
         "`Integer.parseInt(\"42\")`",
         "`42`"
        ],
        [
         "`Integer.valueOf(texto)`",
         "`Integer` (objeto)",
         "`Integer.valueOf(\"7\") + 1`",
         "`8`"
        ],
        [
         "`Integer.toString(n)`",
         "`String`",
         "`Integer.toString(42)`",
         "`\"42\"`"
        ],
        [
         "`Integer.toBinaryString(n)`",
         "`String`",
         "`Integer.toBinaryString(10)`",
         "`\"1010\"`"
        ],
        [
         "`Integer.toHexString(n)`",
         "`String`",
         "`Integer.toHexString(255)`",
         "`\"ff\"`"
        ],
        [
         "`Integer.compare(a, b)`",
         "`int` (`<0`, `0`, `>0`)",
         "`Integer.compare(3, 7)`",
         "`-1`"
        ],
        [
         "`Integer.max(a, b)` / `min` / `sum`",
         "`int`",
         "—",
         "—"
        ],
        [
         "`Long.MAX_VALUE`",
         "`long`",
         "—",
         "`9223372036854775807`"
        ],
        [
         "`Long.parseLong(texto)`",
         "`long`",
         "—",
         "—"
        ],
        [
         "`Double.parseDouble(texto)`",
         "`double`",
         "`Double.parseDouble(\" 3.5 \")`",
         "`3.5` (este sí tolera espacios)"
        ],
        [
         "`Double.isNaN(x)`",
         "`boolean`",
         "`Double.isNaN(0.0 / 0)`",
         "`true`"
        ],
        [
         "`Double.MAX_VALUE`",
         "`double`",
         "—",
         "~`1.8 × 10³⁰⁸`"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "div-mod",
    "titulo": "División entera y módulo `%`: los dos grandes aliados",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Quiero…",
        "Código",
        "Ejemplo"
       ],
       "filas": [
        [
         "Saber si es par",
         "`n % 2 == 0`",
         "`14 % 2` → `0` [[ok]]"
        ],
        [
         "Saber si es múltiplo de k",
         "`n % k == 0`",
         "Billetes de 10: `retirada % 10 == 0`"
        ],
        [
         "El último dígito",
         "`n % 10`",
         "`4721 % 10` → `1`"
        ],
        [
         "Quitar el último dígito",
         "`n / 10`",
         "`4721 / 10` → `472`"
        ],
        [
         "Minutos → horas y minutos",
         "`min / 60` · `min % 60`",
         "`135` → `2` h `15` min"
        ],
        [
         "Segundos → hh:mm:ss",
         "`s / 3600` · `(s % 3600) / 60` · `s % 60`",
         "`3725` → `01:02:05`"
        ],
        [
         "Índice circular (volver a 0 al final)",
         "`(i + 1) % n`",
         "Con `n = 5`: después del 4 viene el `0`"
        ],
        [
         "Repartir en grupos",
         "`total / tamaño` y `total % tamaño`",
         "23 alumnos en grupos de 5 → `4` grupos y `3` sueltos"
        ],
        [
         "Redondear hacia arriba sin Math",
         "`if (n % k != 0) cociente++`",
         "Cobrar fracción de hora → [E02](@e02)"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "num-patrones",
    "titulo": "Patrones típicos con números",
    "bloques": [
     {
      "code": "// Sumar los dígitos de un número (4721 → 14)\nint sumaDigitos = 0;\nwhile (numero > 0) {\n    sumaDigitos += numero % 10;    // coger el último\n    numero /= 10;                  // quitarlo\n}\n\n// Invertir un número (1234 → 4321)\nint invertido = 0;\nwhile (numero > 0) {\n    invertido = invertido * 10 + numero % 10;\n    numero /= 10;\n}\n\n// ¿Es primo? Basta con probar divisores hasta la raíz (i * i <= n)\nboolean esPrimo = numero >= 2;\nfor (int i = 2; i * i <= numero && esPrimo; i++) {\n    if (numero % i == 0) esPrimo = false;\n}\n\n// Segundos → \"01:02:05\"\nString duracion = String.format(\"%02d:%02d:%02d\", seg / 3600, (seg % 3600) / 60, seg % 60);\n\n// Porcentaje sin división entera\ndouble porcentaje = aciertos * 100.0 / total;",
      "lang": "java"
     }
    ]
   },
   {
    "id": "num-trampas",
    "titulo": "Trampas con números",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Trampa",
        "Código",
        "Resultado",
        "Solución"
       ],
       "filas": [
        [
         "Desbordamiento",
         "`Integer.MAX_VALUE + 1`",
         "`-2147483648`",
         "Usar `long`"
        ],
        [
         "Cálculo en `int` antes de guardar en `long`",
         "`long ms = 30 * 24 * 60 * 60 * 1000;`",
         "`-1702967296`",
         "Un literal `long`: `30L * 24 * ...` → `2592000000`"
        ],
        [
         "Imprecisión de `double`",
         "`0.1 + 0.2`",
         "`0.30000000000000004`",
         "Mostrar con `%.2f`; dinero real con `BigDecimal`"
        ],
        [
         "Comparar `double` con `==`",
         "`0.1 + 0.2 == 0.3`",
         "`false`",
         "Comparar con margen: `Math.abs(a - b) < 0.0001` ([MOD.08](@math))"
        ],
        [
         "División entre 0 con `int`",
         "`5 / 0`",
         "`ArithmeticException`",
         "Comprobar el divisor antes"
        ],
        [
         "División entre 0 con `double`",
         "`10 / 0.0` · `0.0 / 0`",
         "`Infinity` · `NaN`",
         "Comprobar el divisor antes"
        ],
        [
         "Comparar `Integer` con `==`",
         "`Integer a = 128, b = 128; a == b`",
         "`false` (con 127 da `true`)",
         "`a.equals(b)`"
        ],
        [
         "Resto de negativo",
         "`-7 % 3`",
         "`-1`",
         "El signo es el del dividendo"
        ]
       ]
      }
     },
     {
      "p": "Aplicado en: [E01 Ticket](@e01) · [E02 Parking](@e02) · [E05 DNI](@e05) · [E07 Ventas](@e07)"
     }
    ]
   }
  ]
 },
 "mod-08": {
  "resumen": "referencia · equivalentes a mano",
  "secciones": [
   {
    "id": "math",
    "titulo": "Clase Math (no necesita import)",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Método",
        "Devuelve",
        "Ejemplo",
        "Resultado",
        "Sin Math"
       ],
       "filas": [
        [
         "`Math.abs(x)`",
         "mismo tipo",
         "`Math.abs(-5)`",
         "`5`",
         "`(x < 0) ? -x : x`"
        ],
        [
         "`Math.max(a, b)` / `min`",
         "mismo tipo",
         "`Math.max(3, 8)`",
         "`8`",
         "`(a > b) ? a : b`"
        ],
        [
         "`Math.pow(base, exp)`",
         "`double`",
         "`Math.pow(2, 10)`",
         "`1024.0`",
         "Bucle multiplicando `exp` veces"
        ],
        [
         "`Math.sqrt(x)`",
         "`double`",
         "`Math.sqrt(16)`",
         "`4.0`",
         "—"
        ],
        [
         "`Math.round(x)`",
         "`long` (de `double`)",
         "`Math.round(2.5)` · `Math.round(2.4)`",
         "`3` · `2`",
         "`(int) (x + 0.5)` (solo positivos)"
        ],
        [
         "`Math.floor(x)`",
         "`double`",
         "`Math.floor(-2.5)`",
         "`-3.0` (hacia abajo)",
         "—"
        ],
        [
         "`Math.ceil(x)`",
         "`double`",
         "`Math.ceil(2.1)`",
         "`3.0` (hacia arriba)",
         "`if (n % k != 0) cociente++`"
        ],
        [
         "`Math.random()`",
         "`double` en [0, 1)",
         "—",
         "`0.7310…`",
         "—"
        ],
        [
         "`Math.floorMod(a, n)`",
         "`int`",
         "`Math.floorMod(-7, 3)`",
         "`2` (`-7 % 3` da `-1`)",
         "—"
        ],
        [
         "`Math.PI`",
         "`double`",
         "—",
         "`3.141592653589793`",
         "—"
        ]
       ]
      }
     },
     {
      "code": "// Redondear a 2 decimales para CALCULAR (para MOSTRAR basta %.2f)\ndouble redondeado = Math.round(valor * 100) / 100.0;       // 3.14159 → 3.14\ndouble sinMath    = (int) (valor * 100 + 0.5) / 100.0;     // igual, solo para positivos",
      "lang": "java"
     }
    ]
   },
   {
    "id": "aleatorios",
    "titulo": "Números aleatorios",
    "bloques": [
     {
      "code": "// Con Math.random(): entero entre min y max (ambos incluidos)\nint dado = (int) (Math.random() * 6) + 1;                         // 1..6\nint numero = (int) (Math.random() * (max - min + 1)) + min;\n\n// Con Random (más legible)\nimport java.util.Random;\nRandom random = new Random();\nint dado2   = random.nextInt(6) + 1;      // nextInt(n) → 0..n-1, así que +1 → 1..6\nint entre   = random.nextInt(10, 21);     // Java 17+: 10..20 (el segundo no se incluye)\ndouble d    = random.nextDouble();        // 0.0..1.0\nboolean moneda = random.nextBoolean();",
      "lang": "java"
     },
     {
      "p": "Usos reales: código de verificación de 6 cifras, sortear un alumno, barajar una lista (`Collections.shuffle(lista)`), generar datos de prueba."
     }
    ]
   }
  ],
  "intro": [
   {
    "aviso": "**Aún no visto en clase.** Esta sección es de referencia. En los ejercicios, si no lo habéis dado, usa la columna **\"sin Math\"**: es la lógica que hay detrás y la que te van a pedir.",
    "tipo": "caution"
   }
  ]
 },
 "mod-09": {
  "resumen": "crear · recorrer · Arrays · copiar · 2D",
  "secciones": [
   {
    "id": "array-crear",
    "titulo": "Crear",
    "bloques": [
     {
      "code": "int[] stock = new int[5];                                   // 5 posiciones a 0\nString[] dias = {\"Lun\", \"Mar\", \"Mié\", \"Jue\", \"Vie\"};        // con valores\ndouble[] precios = new double[]{9.99, 4.50, 12.00};         // forma larga (útil al pasar a una función)\n\nstock[0] = 25;                    // escribir en la posición 0\nint primero = stock[0];           // leer\nint ultimo = stock[stock.length - 1];",
      "lang": "java"
     },
     {
      "consola": "  dias  →  [ \"Lun\" | \"Mar\" | \"Mié\" | \"Jue\" | \"Vie\" ]\n  índice      0       1       2       3       4         dias.length = 5"
     },
     {
      "nota": "- Tamaño **fijo**: una vez creado no crece ni encoge. - `array.length` es una **propiedad**, va **sin paréntesis**. Comparado con los demás: `texto.length()` · `lista.size()`. - Índices de `0` a `length - 1`. Acceder a `array[length]` → `ArrayIndexOutOfBoundsException`.",
      "tipo": "important"
     }
    ]
   },
   {
    "id": "array-recorrer",
    "titulo": "Recorrer",
    "bloques": [
     {
      "code": "for (int i = 0; i < precios.length; i++) {          // con índice: leer o modificar\n    precios[i] = precios[i] * 1.21;\n}\n\nfor (double precio : precios) {                     // sin índice: solo leer\n    System.out.println(precio);\n}\n\nfor (int i = precios.length - 1; i >= 0; i--) { }   // al revés",
      "lang": "java"
     }
    ]
   },
   {
    "id": "clase-arrays",
    "titulo": "Clase Arrays",
    "bloques": [
     {
      "code": "import java.util.Arrays;",
      "lang": "java"
     },
     {
      "tabla": {
       "cabs": [
        "Método",
        "Hace",
        "Ejemplo con `{5, 3, 9, 1}`",
        "Resultado"
       ],
       "filas": [
        [
         "`Arrays.toString(a)`",
         "Texto para imprimir",
         "`Arrays.toString(a)`",
         "`\"[5, 3, 9, 1]\"`"
        ],
        [
         "`Arrays.sort(a)`",
         "Ordena (modifica el array)",
         "`Arrays.sort(a)`",
         "`[1, 3, 5, 9]`"
        ],
        [
         "`Arrays.fill(a, v)`",
         "Rellena todo con `v`",
         "`Arrays.fill(a, -1)`",
         "`[-1, -1, -1, -1]`"
        ],
        [
         "`Arrays.copyOf(a, n)`",
         "Copia con nuevo tamaño (rellena con 0)",
         "`Arrays.copyOf(a, 6)`",
         "`[5, 3, 9, 1, 0, 0]`"
        ],
        [
         "`Arrays.copyOfRange(a, i, j)`",
         "Copia un tramo (`j` no incluido)",
         "`Arrays.copyOfRange(a, 1, 3)`",
         "`[3, 9]`"
        ],
        [
         "`Arrays.equals(a, b)`",
         "Compara contenido",
         "`Arrays.equals(new int[]{1,2}, new int[]{1,2})`",
         "`true` (con `==` → `false`)"
        ],
        [
         "`Arrays.binarySearch(a, v)`",
         "Posición de `v` (**array ya ordenado**)",
         "sobre `[1, 3, 5, 9]`, buscar `5`",
         "`2`"
        ],
        [
         "`Arrays.deepToString(m)`",
         "Imprimir un array 2D",
         "`{{1,2},{3,4}}`",
         "`\"[[1, 2], [3, 4]]\"`"
        ]
       ]
      }
     },
     {
      "aviso": "`System.out.println(array)` imprime algo como `[I@1b6d3586` (tipo + dirección de memoria). Usa `Arrays.toString(array)`.",
      "tipo": "warning"
     }
    ]
   },
   {
    "id": "array-copiar",
    "titulo": "Copiar ≠ asignar",
    "bloques": [
     {
      "code": "int[] original = {1, 2, 3};\nint[] alias = original;                        // ✖ NO copia: las dos variables apuntan al MISMO array\nalias[0] = 99;                                 // original[0] también vale 99\n\nint[] copia = Arrays.copyOf(original, original.length);   // ✔ array nuevo e independiente",
      "lang": "java"
     },
     {
      "consola": "  alias = original              copia = Arrays.copyOf(...)\n  original ──┐                  original ──▶ [1, 2, 3]\n             ├──▶ [1, 2, 3]     copia    ──▶ [1, 2, 3]   (otro array)\n  alias ─────┘"
     }
    ]
   },
   {
    "id": "array-patrones",
    "titulo": "Patrones típicos",
    "bloques": [
     {
      "code": "// Suma y media\ndouble suma = 0;\nfor (double v : valores) suma += v;\ndouble media = suma / valores.length;\n\n// Máximo con su posición (con la posición sacas el valor Y el dato del array paralelo)\nint posMax = 0;\nfor (int i = 1; i < valores.length; i++) {\n    if (valores[i] > valores[posMax]) posMax = i;\n}\n\n// Buscar: ¿está? ¿en qué posición?\nint posicion = -1;                       // -1 = \"no encontrado\" (convención de indexOf)\nfor (int i = 0; i < codigos.length && posicion == -1; i++) {\n    if (codigos[i].equals(buscado)) posicion = i;\n}\n\n// Contar los que cumplen una condición\nint aprobados = 0;\nfor (double nota : notas) {\n    if (nota >= 5) aprobados++;\n}\n\n// Invertir en el sitio (intercambiar extremos hacia el centro)\nfor (int i = 0; i < a.length / 2; i++) {\n    int temporal = a[i];\n    a[i] = a[a.length - 1 - i];\n    a[a.length - 1 - i] = temporal;\n}\n\n// Arrays paralelos: la misma posición es el mismo \"registro\"\nString[] productos = {\"Teclado\", \"Ratón\", \"Monitor\"};\ndouble[] precios   = {49.90, 19.99, 189.00};\nfor (int i = 0; i < productos.length; i++) {\n    System.out.printf(\"%-10s %8.2f €%n\", productos[i], precios[i]);\n}",
      "lang": "java"
     }
    ]
   },
   {
    "id": "matrices",
    "titulo": "Matrices (arrays 2D)",
    "bloques": [
     {
      "code": "int[][] notas = new int[3][4];            // 3 filas (alumnos) x 4 columnas (evaluaciones)\nchar[][] sala = {\n    {'·', '·', 'X'},\n    {'X', '·', '·'}\n};\n\nnotas[0][2] = 8;                          // fila 0, columna 2\nint filas = notas.length;                 // 3\nint columnas = notas[0].length;           // 4\n\nfor (int f = 0; f < notas.length; f++) {          // filas\n    for (int c = 0; c < notas[f].length; c++) {   // columnas de ESA fila\n        System.out.print(notas[f][c] + \" \");\n    }\n    System.out.println();\n}",
      "lang": "java"
     },
     {
      "consola": "             col 0  col 1  col 2  col 3\n  fila 0  [   ·      ·      8      ·   ]   ← notas[0][2]\n  fila 1  [   ·      ·      ·      ·   ]\n  fila 2  [   ·      ·      ·      ·   ]"
     },
     {
      "p": "Aplicado en: [E07 Ventas](@e07) · [E08 Logs](@e08) · [E10 Cine](@e10)"
     }
    ]
   }
  ]
 },
 "mod-10": {
  "resumen": "lista dinámica · métodos · Collections",
  "secciones": [
   {
    "id": "arraylist-crear",
    "titulo": "Crear",
    "bloques": [
     {
      "code": "import java.util.ArrayList;\n\nArrayList<String> carrito = new ArrayList<>();        // vacía, crece sola\nArrayList<Integer> cantidades = new ArrayList<>();    // Integer, NO int\nArrayList<String> dias = new ArrayList<>(List.of(\"Lun\", \"Mar\"));   // con valores iniciales (import java.util.List)",
      "lang": "java"
     },
     {
      "nota": "Entre `< >` va siempre una **clase**: `Integer`, `Double`, `Character`, `Boolean`, `String`. `ArrayList<int>` no compila. Java convierte solo entre `int` e `Integer` al hacer `add` y `get`.",
      "tipo": "note"
     }
    ]
   },
   {
    "id": "arraylist-metodos",
    "titulo": "Métodos",
    "bloques": [
     {
      "p": "Ejemplos partiendo de `lista = [pan, leche, huevos]`"
     },
     {
      "tabla": {
       "cabs": [
        "Método",
        "Devuelve",
        "Ejemplo",
        "Lista después"
       ],
       "filas": [
        [
         "`add(e)`",
         "`boolean`",
         "`lista.add(\"sal\")`",
         "`[pan, leche, huevos, sal]`"
        ],
        [
         "`add(i, e)`",
         "—",
         "`lista.add(0, \"sal\")`",
         "`[sal, pan, leche, huevos]` (desplaza el resto)"
        ],
        [
         "`get(i)`",
         "el elemento",
         "`lista.get(1)` → `\"leche\"`",
         "sin cambios"
        ],
        [
         "`set(i, e)`",
         "el elemento **anterior**",
         "`lista.set(1, \"agua\")` → `\"leche\"`",
         "`[pan, agua, huevos]`"
        ],
        [
         "`remove(i)`",
         "el elemento quitado",
         "`lista.remove(0)` → `\"pan\"`",
         "`[leche, huevos]` (los demás avanzan)"
        ],
        [
         "`remove(obj)`",
         "`boolean`",
         "`lista.remove(\"leche\")` → `true`",
         "`[pan, huevos]` (solo la primera aparición)"
        ],
        [
         "`size()`",
         "`int`",
         "`lista.size()` → `3`",
         "—"
        ],
        [
         "`isEmpty()`",
         "`boolean`",
         "`lista.isEmpty()` → `false`",
         "—"
        ],
        [
         "`contains(e)`",
         "`boolean`",
         "`lista.contains(\"pan\")` → `true`",
         "—"
        ],
        [
         "`indexOf(e)`",
         "`int` (`-1` si no está)",
         "`lista.indexOf(\"huevos\")` → `2`",
         "—"
        ],
        [
         "`lastIndexOf(e)`",
         "`int`",
         "—",
         "—"
        ],
        [
         "`clear()`",
         "—",
         "`lista.clear()`",
         "`[]`"
        ],
        [
         "`addAll(otra)`",
         "`boolean`",
         "`lista.addAll(otraLista)`",
         "añade todos al final"
        ],
        [
         "`toString()`",
         "`String`",
         "`\"\" + lista`",
         "`\"[pan, leche, huevos]\"` (se imprime directamente)"
        ],
        [
         "`removeIf(condición)`",
         "`boolean`",
         "`lista.removeIf(p -> p.startsWith(\"h\"))`",
         "`[pan, leche]` (lambda, más adelante en el curso)"
        ]
       ]
      }
     },
     {
      "aviso": "**`remove` con `ArrayList<Integer>`**: `remove(1)` borra **la posición 1**, no el número 1. ```java ArrayList<Integer> numeros = new ArrayList<>(List.of(10, 20, 30)); numeros.remove(1);                    // [10, 30]  → quitó la POSICIÓN 1 numeros.remove(Integer.valueOf(10));  // [30]      → quitó el VALOR 10 ```",
      "tipo": "warning"
     }
    ]
   },
   {
    "id": "arraylist-recorrer",
    "titulo": "Recorrer y borrar mientras recorres",
    "bloques": [
     {
      "code": "for (int i = 0; i < lista.size(); i++) { lista.get(i); }   // con índice\nfor (String producto : lista) { }                         // solo lectura\n\n// ✖ Borrar dentro de un for-each → ConcurrentModificationException\nfor (String p : lista) {\n    if (p.equals(\"pan\")) lista.remove(p);\n}\n\n// ✔ Opción 1: for al revés (al borrar, las posiciones que faltan por mirar no se mueven)\nfor (int i = lista.size() - 1; i >= 0; i--) {\n    if (lista.get(i).equals(\"pan\")) lista.remove(i);\n}\n\n// ✔ Opción 2: removeIf\nlista.removeIf(p -> p.equals(\"pan\"));",
      "lang": "java"
     },
     {
      "nota": "Si recorres **hacia delante** y borras, después del `remove(i)` haz `i--`. Si no, te saltas el elemento que acaba de ocupar la posición `i`.",
      "tipo": "tip"
     }
    ]
   },
   {
    "id": "collections",
    "titulo": "Collections (utilidades para listas)",
    "bloques": [
     {
      "code": "import java.util.Collections;",
      "lang": "java"
     },
     {
      "tabla": {
       "cabs": [
        "Método",
        "Hace",
        "Ejemplo con `[4, 1, 3, 1]`"
       ],
       "filas": [
        [
         "`Collections.sort(lista)`",
         "Ordena de menor a mayor",
         "`[1, 1, 3, 4]`"
        ],
        [
         "`Collections.sort(lista, Collections.reverseOrder())`",
         "Ordena de mayor a menor",
         "`[4, 3, 1, 1]`"
        ],
        [
         "`Collections.reverse(lista)`",
         "Invierte el orden actual",
         "—"
        ],
        [
         "`Collections.shuffle(lista)`",
         "Baraja",
         "Sorteos, preguntas aleatorias"
        ],
        [
         "`Collections.max(lista)` / `min`",
         "Mayor / menor",
         "`4` / `1`"
        ],
        [
         "`Collections.frequency(lista, x)`",
         "Cuántas veces aparece",
         "`frequency(lista, 1)` → `2`"
        ]
       ]
      }
     },
     {
      "aviso": "`List.of(...)` y `Arrays.asList(...)` crean listas que **no se pueden ampliar**: `add` lanza `UnsupportedOperationException`. Si necesitas modificarla, envuélvela así: `new ArrayList<>(List.of(...))`.",
      "tipo": "caution"
     }
    ]
   },
   {
    "id": "array-vs-arraylist",
    "titulo": "Array vs ArrayList",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "",
        "Array `tipo[]`",
        "ArrayList `ArrayList<Tipo>`"
       ],
       "filas": [
        [
         "Tamaño",
         "Fijo",
         "Crece y encoge"
        ],
        [
         "Tipos",
         "Primitivos y objetos",
         "Solo objetos (`Integer`, `Double`…)"
        ],
        [
         "Longitud",
         "`array.length`",
         "`lista.size()`"
        ],
        [
         "Leer",
         "`array[i]`",
         "`lista.get(i)`"
        ],
        [
         "Escribir",
         "`array[i] = x`",
         "`lista.set(i, x)`"
        ],
        [
         "Añadir / quitar",
         "[[no]] (crear otro array)",
         "`add` / `remove`"
        ],
        [
         "Imprimir",
         "`Arrays.toString(array)`",
         "Directamente"
        ],
        [
         "Ordenar",
         "`Arrays.sort(array)`",
         "`Collections.sort(lista)`"
        ],
        [
         "Ideal para",
         "Datos de tamaño conocido: meses, tablero, notas de 3 evaluaciones",
         "Datos que cambian: carrito, cola, resultados de un filtro"
        ]
       ]
      }
     },
     {
      "p": "Aplicado en: [E08 Logs](@e08) · [E09 Turnos](@e09)"
     }
    ]
   }
  ]
 },
 "mod-11": {
  "resumen": "métodos static · parámetros · return",
  "secciones": [
   {
    "id": "funcion-anatomia",
    "titulo": "Anatomía",
    "bloques": [
     {
      "consola": "  public static   double    calcularIva ( double base, double tipo ) {\n  └─modificad.─┘  └retorno┘ └──nombre──┘  └─────── parámetros ──────┘\n        return base * tipo;     ← devuelve un valor del tipo de retorno\n  }"
     },
     {
      "code": "public static double calcularIva(double base, double tipo) {\n    return base * tipo;\n}\n\n// Llamada: los ARGUMENTOS (valores reales) rellenan los PARÁMETROS (huecos)\ndouble iva = calcularIva(100, 0.21);   // 21.0",
      "lang": "java"
     },
     {
      "nota": "**Parámetro** = el campo del formulario (`base`). **Argumento** = lo que se escribe en ese campo al usarlo (`100`). La función se define una vez con huecos y se llama muchas veces con valores distintos.",
      "tipo": "tip"
     }
    ]
   },
   {
    "id": "funcion-parametros",
    "titulo": "Tipos de función",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Forma",
        "Ejemplo",
        "Cuándo"
       ],
       "filas": [
        [
         "Recibe y devuelve",
         "`static int sumar(int a, int b)`",
         "Calcular algo"
        ],
        [
         "Recibe y no devuelve (`void`)",
         "`static void mostrarTicket(String texto)`",
         "Mostrar o hacer una acción"
        ],
        [
         "No recibe y devuelve",
         "`static int pedirEdad()`",
         "Pedir un dato al usuario"
        ],
        [
         "Devuelve `boolean`",
         "`static boolean esPar(int n)`",
         "Validaciones: se usan directamente en un `if`"
        ],
        [
         "Recibe un array",
         "`static double calcularMedia(double[] valores)`",
         "Procesar colecciones"
        ]
       ]
      }
     },
     {
      "lista": [
       "`return` **termina** la función en ese momento. Se puede usar para salir antes (`if (n < 2) return false;`).",
       "Una función con tipo de retorno distinto de `void` debe devolver un valor **en todos los caminos** posibles.",
       "**Sobrecarga:** puede haber varias funciones con el mismo nombre si reciben parámetros distintos (`sumar(int, int)` y `sumar(double, double)`)."
      ]
     }
    ]
   },
   {
    "id": "paso-valor",
    "titulo": "Paso por valor (qué ocurre con lo que envías)",
    "bloques": [
     {
      "code": "static void incrementar(int numero) { numero++; }\nstatic void ponerACero(int[] array) { array[0] = 0; }\n\nint n = 5;\nincrementar(n);          // n sigue valiendo 5 → se envió una COPIA del valor\n\nint[] datos = {9, 9};\nponerACero(datos);       // datos = [0, 9] → se envió una copia de la REFERENCIA (el mismo array)",
      "lang": "java"
     },
     {
      "tabla": {
       "cabs": [
        "Envías",
        "La función recibe",
        "¿Cambiar dentro afecta fuera?"
       ],
       "filas": [
        [
         "Primitivo (`int`, `double`…)",
         "Copia del valor",
         "No"
        ],
        [
         "Array / ArrayList",
         "Copia de la referencia (el mismo objeto)",
         "**Sí** (sus elementos)"
        ],
        [
         "String",
         "Copia de la referencia",
         "No (es inmutable)"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "funcion-plantilla",
    "titulo": "Plantilla de ejercicio con funciones",
    "bloques": [
     {
      "code": "import javax.swing.JOptionPane;\n\npublic class NombreEjercicio {\n\n    // Las funciones van arriba\n    public static double calcularAlgo(double datoEntrada) {\n        // 3. Calcular ... y guardarlo en la variable resultado (por qué...)\n        double resultado = datoEntrada * 2;\n\n        // 4. Retornar resultado\n        return resultado;\n    }\n\n    // El main va al final\n    public static void main(String[] args) {\n        // 1. Pedir al usuario el dato en una ventana y guardarlo en la variable datoTexto\n        String datoTexto = JOptionPane.showInputDialog(\"Dato:\");\n\n        // 2. Convertir datoTexto a double con parseDouble (replace por si el usuario usa comas)\n        double dato = Double.parseDouble(datoTexto.replace(\",\", \".\"));\n\n        double resultado = calcularAlgo(dato);\n\n        // 5. Mostrar el resultado en una ventana de diálogo tipo mensaje\n        JOptionPane.showMessageDialog(null, \"Resultado: \" + resultado);\n    }\n}",
      "lang": "java"
     },
     {
      "p": "La numeración de los pasos sigue el **orden real de ejecución**: del `main` salta a la función (pasos 3-4) y vuelve al `main` (paso 5)."
     }
    ]
   }
  ]
 },
 "mod-12": {
  "resumen": "diagnóstico rápido · try-catch",
  "secciones": [
   {
    "id": "excepciones",
    "titulo": "Tabla de diagnóstico",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Excepción",
        "Causa habitual",
        "Ejemplo que la provoca"
       ],
       "filas": [
        [
         "`NumberFormatException`",
         "Texto que no es un número válido",
         "`Integer.parseInt(\"12a\")`, `parseInt(\" 4\")`, `parseDouble(\"3,5\")`, `parseInt(\"\")`"
        ],
        [
         "`NullPointerException`",
         "Usar algo que vale `null`",
         "`texto.length()` tras pulsar Cancelar en `showInputDialog`"
        ],
        [
         "`ArrayIndexOutOfBoundsException`",
         "Índice fuera de `0..length-1`",
         "`array[array.length]`, `for (i = 0; i <= length; ...)`"
        ],
        [
         "`StringIndexOutOfBoundsException`",
         "Posición inexistente en un texto",
         "`\"abc\".charAt(5)`, `substring` con límites mal"
        ],
        [
         "`IndexOutOfBoundsException`",
         "Índice fuera de `0..size()-1` en ArrayList",
         "`new ArrayList<>().get(0)`"
        ],
        [
         "`ArithmeticException`",
         "División entera entre 0",
         "`5 / 0`"
        ],
        [
         "`InputMismatchException`",
         "Scanner espera un tipo y recibe otro",
         "`nextInt()` y el usuario escribe `\"hola\"`"
        ],
        [
         "`ConcurrentModificationException`",
         "Modificar una lista mientras se recorre con for-each",
         "`remove` dentro de `for (x : lista)`"
        ],
        [
         "`UnsupportedOperationException`",
         "Añadir a una lista fija",
         "`List.of(\"a\").add(\"b\")`"
        ]
       ]
      }
     },
     {
      "nota": "En la consola de IntelliJ, la línea `at MiClase.main(MiClase.java:23)` te dice **el archivo y la línea**: haz clic y te lleva directamente.",
      "tipo": "tip"
     }
    ]
   },
   {
    "id": "try-catch",
    "titulo": "try-catch",
    "bloques": [
     {
      "code": "// Pedir un número hasta que sea válido\nint edad = -1;\nwhile (edad < 0) {\n    String edadTexto = JOptionPane.showInputDialog(\"Edad:\");\n    try {\n        edad = Integer.parseInt(edadTexto.trim());      // si falla, salta al catch y edad no cambia\n    } catch (NumberFormatException e) {\n        JOptionPane.showMessageDialog(null, \"Escribe solo números\", \"Error\", JOptionPane.ERROR_MESSAGE);\n    }\n}",
      "lang": "java"
     },
     {
      "lista": [
       "El `try` contiene el código que **puede** fallar; el `catch` decide qué hacer si falla, en vez de que el programa se cierre.",
       "Captura la excepción **concreta** (`NumberFormatException`), no `Exception` en general, para no ocultar otros errores.",
       "`finally { }` (opcional) se ejecuta siempre, haya error o no (por ejemplo, para cerrar un Scanner)."
      ]
     }
    ]
   }
  ]
 },
 "mod-13": {
  "resumen": "10 casos reales · solución abierta",
  "secciones": [
   {
    "id": "e01",
    "titulo": "E01 · Ticket de caja con descuento e IVA",
    "bloques": [
     {
      "nota": "** Caso real:** el TPV de una tienda. Se registra un producto, se aplica un 10 % de descuento por volumen a partir de 10 unidades, se calcula el IVA y se muestra el ticket.",
      "tipo": "note"
     },
     {
      "p": "**Conceptos:** `double` / `int` · constantes `final` · operadores aritméticos · ternario · `String.format` con `%.2f` y `%%`"
     },
     {
      "code": "import javax.swing.JOptionPane;\n\npublic class TicketCaja {\n\n    public static void main(String[] args) {\n        final double IVA = 0.21;\n        final double DESCUENTO_VOLUMEN = 0.10;\n        final int UNIDADES_PARA_DESCUENTO = 10;\n\n        // 1. Pedir al usuario el nombre del producto en una ventana y guardarlo en la variable nombreProducto\n        String nombreProducto = JOptionPane.showInputDialog(\"Nombre del producto:\");\n\n        // 2. Pedir al usuario el precio unitario en una ventana y guardarlo en la variable precioUnitario (replace por si el usuario usa comas)\n        String precioTexto = JOptionPane.showInputDialog(\"Precio unitario (€):\");\n        double precioUnitario = Double.parseDouble(precioTexto.replace(\",\", \".\"));\n\n        // 3. Pedir al usuario la cantidad en una ventana y guardarla en la variable cantidad (int porque no se venden medias unidades)\n        int cantidad = Integer.parseInt(JOptionPane.showInputDialog(\"Cantidad:\"));\n\n        // 4. Calcular el subtotal multiplicando precioUnitario por cantidad y guardarlo en la variable subtotal\n        double subtotal = precioUnitario * cantidad;\n\n        // 5. Calcular el descuento con operador ternario (solo hay descuento si se llega a UNIDADES_PARA_DESCUENTO)\n        double descuento = (cantidad >= UNIDADES_PARA_DESCUENTO) ? subtotal * DESCUENTO_VOLUMEN : 0;\n\n        // 6. Restar el descuento al subtotal y guardarlo en la variable baseImponible (el IVA se calcula sobre la base, no sobre el subtotal)\n        double baseImponible = subtotal - descuento;\n\n        // 7. Calcular el IVA y el total y guardarlos en las variables importeIva y total\n        double importeIva = baseImponible * IVA;\n        double total = baseImponible + importeIva;\n\n        // 8. Montar el texto del ticket con String.format (%.2f = 2 decimales, %% = símbolo %) y mostrarlo en una ventana de diálogo tipo mensaje\n        String ticket = String.format(\n                \"%s  x %d%n\"\n                + \"Subtotal:   %.2f €%n\"\n                + \"Descuento: -%.2f €%n\"\n                + \"Base:       %.2f €%n\"\n                + \"IVA 21%%:    %.2f €%n\"\n                + \"TOTAL:      %.2f €\",\n                nombreProducto, cantidad, subtotal, descuento, baseImponible, importeIva, total);\n        JOptionPane.showMessageDialog(null, ticket, \"Ticket\", JOptionPane.INFORMATION_MESSAGE);\n    }\n}",
      "lang": "java"
     },
     {
      "tabla": {
       "cabs": [
        "Decisión",
        "Por qué"
       ],
       "filas": [
        [
         "`final double IVA = 0.21`",
         "Si cambia el IVA, se toca **un solo sitio**. Y el nombre explica qué es ese `0.21`"
        ],
        [
         "`cantidad` es `int`",
         "No se venden 2,5 unidades. El tipo ya expresa la regla"
        ],
        [
         "`replace(\",\", \".\")` antes de `parseDouble`",
         "`parseDouble` solo acepta punto; el usuario en España escribe coma"
        ],
        [
         "Ternario para el descuento",
         "Se elige **un valor** entre dos (descuento o 0). Un `if` también vale, pero ocupa 5 líneas"
        ],
        [
         "El IVA sobre `baseImponible`",
         "Así funciona en la realidad: primero el descuento y luego el impuesto"
        ],
        [
         "`%%` en el formato",
         "`%` sola indica el inicio de un formato; para escribir el símbolo hay que duplicarlo"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "e02",
    "titulo": "E02 · Tarifa de un parking",
    "bloques": [
     {
      "nota": "** Caso real:** la máquina de pago de un parking. Los primeros 15 minutos son gratis; después se cobra 2,50 € por **hora o fracción**, con un máximo de 20 € al día.",
      "tipo": "note"
     },
     {
      "p": "**Conceptos:** función con `return` · `if` encadenados · división entera `/` · módulo `%` · `++`"
     },
     {
      "code": "import javax.swing.JOptionPane;\n\npublic class TarifaParking {\n\n    public static double calcularImporte(int minutosEstancia) {\n        final int MINUTOS_GRATIS = 15;\n        final double PRECIO_HORA = 2.50;\n        final double TOPE_DIARIO = 20.00;\n\n        // 4. Si la estancia no supera los minutos gratis, retornar 0 (return sale de la función aquí mismo)\n        if (minutosEstancia <= MINUTOS_GRATIS) {\n            return 0;\n        }\n\n        // 5. Calcular las horas completas con división entera y guardarlas en la variable horasCobradas (135 / 60 = 2)\n        int horasCobradas = minutosEstancia / 60;\n\n        // 6. Si sobran minutos (resto distinto de 0), cobrar la fracción como una hora más con incremento horasCobradas++\n        if (minutosEstancia % 60 != 0) {\n            horasCobradas++;\n        }\n\n        // 7. Calcular el importe multiplicando horasCobradas por PRECIO_HORA\n        double importe = horasCobradas * PRECIO_HORA;\n\n        // 8. Si el importe supera el tope diario, cobrar solo el tope\n        if (importe > TOPE_DIARIO) {\n            importe = TOPE_DIARIO;\n        }\n\n        // 9. Retornar el importe\n        return importe;\n    }\n\n    public static void main(String[] args) {\n        // 1. Pedir al usuario los minutos de estancia en una ventana y guardarlos en la variable minutosEstancia\n        int minutosEstancia = Integer.parseInt(JOptionPane.showInputDialog(\"Minutos de estancia:\"));\n\n        // 2. Separar horas y minutos con división entera y módulo (para luego mostrarlo en la ventana mensaje)\n        int horas = minutosEstancia / 60;\n        int minutosSueltos = minutosEstancia % 60;\n\n        // 3. Llamar a la función calcularImporte y guardar lo que retorna en la variable importe\n        double importe = calcularImporte(minutosEstancia);\n\n        // 10. Mostrar la estancia y el importe en una ventana de diálogo tipo mensaje\n        JOptionPane.showMessageDialog(null,\n                String.format(\"Estancia: %d h %d min%nImporte: %.2f €\", horas, minutosSueltos, importe));\n    }\n}",
      "lang": "java"
     },
     {
      "tabla": {
       "cabs": [
        "Estancia",
        "Horas cobradas",
        "Importe"
       ],
       "filas": [
        [
         "15 min",
         "0 (gratis)",
         "0,00 €"
        ],
        [
         "16 min",
         "1",
         "2,50 €"
        ],
        [
         "60 min",
         "1",
         "2,50 €"
        ],
        [
         "61 min",
         "2",
         "5,00 €"
        ],
        [
         "2 h 15 min",
         "3",
         "7,50 €"
        ],
        [
         "10 h",
         "10 → tope",
         "20,00 €"
        ]
       ]
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
         "`minutos / 60` + `if (minutos % 60 != 0) horas++`",
         "\"Hora o fracción\" = redondear hacia arriba. Sin `Math.ceil`, la división entera da las horas completas y el resto dice si sobra una fracción"
        ],
        [
         "`return 0` al principio",
         "Salida rápida: si es gratis, no hace falta calcular nada más"
        ],
        [
         "Una función aparte para el importe",
         "La regla de precios queda aislada: si cambia la tarifa, solo se toca `calcularImporte`"
        ],
        [
         "El tope con `if` después de calcular",
         "Se calcula normal y luego se limita. Más fácil de leer que meterlo en la fórmula"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "e03",
    "titulo": "E03 · Validador de contraseña de un registro",
    "bloques": [
     {
      "nota": "** Caso real:** el formulario de alta de una web. La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula, un número y ningún espacio. Se vuelve a pedir hasta que cumpla, indicando **todo** lo que falla.",
      "tipo": "note"
     },
     {
      "p": "**Conceptos:** `do-while` · `for` + `charAt` · `Character.isUpperCase/isDigit…` · flags `boolean` · `!` · `isEmpty()`"
     },
     {
      "code": "import javax.swing.JOptionPane;\n\npublic class ValidadorPassword {\n\n    public static String validarPassword(String password) {\n        // 4. Crear la variable errores vacía para ir añadiendo cada regla que no se cumple (para luego mostrarlo en la ventana mensaje)\n        String errores = \"\";\n\n        // 5. Comprobar la longitud mínima con método length\n        if (password.length() < 8) {\n            errores += \"- Mínimo 8 caracteres\\n\";\n        }\n\n        // 6. Crear las variables indicador (flags) a false (aún no se ha encontrado nada)\n        boolean tieneMayuscula = false;\n        boolean tieneMinuscula = false;\n        boolean tieneDigito = false;\n        boolean tieneEspacio = false;\n\n        // 7. Recorrer la contraseña carácter a carácter con un for y el método charAt, y poner a true el indicador que toque\n        for (int i = 0; i < password.length(); i++) {\n            char caracter = password.charAt(i);\n            if (Character.isUpperCase(caracter)) {\n                tieneMayuscula = true;\n            } else if (Character.isLowerCase(caracter)) {\n                tieneMinuscula = true;\n            } else if (Character.isDigit(caracter)) {\n                tieneDigito = true;\n            } else if (Character.isWhitespace(caracter)) {\n                tieneEspacio = true;\n            }\n        }\n\n        // 8. Añadir a errores cada regla que no se haya cumplido (! significa \"no\")\n        if (!tieneMayuscula) {\n            errores += \"- Al menos una mayúscula\\n\";\n        }\n        if (!tieneMinuscula) {\n            errores += \"- Al menos una minúscula\\n\";\n        }\n        if (!tieneDigito) {\n            errores += \"- Al menos un número\\n\";\n        }\n        if (tieneEspacio) {\n            errores += \"- Sin espacios\\n\";\n        }\n\n        // 9. Retornar errores (si está vacío, la contraseña es válida)\n        return errores;\n    }\n\n    public static void main(String[] args) {\n        String password;\n        String errores;\n\n        // 1. Repetir la petición de la contraseña mientras tenga errores (do-while porque hay que pedirla al menos una vez)\n        do {\n            // 2. Pedir al usuario la contraseña en una ventana y guardarla en la variable password\n            password = JOptionPane.showInputDialog(\"Crea tu contraseña:\");\n\n            // 3. Llamar a la función validarPassword y guardar lo que retorna en la variable errores\n            errores = validarPassword(password);\n\n            // 10. Si hay errores, mostrarlos en una ventana de diálogo tipo mensaje de error\n            if (!errores.isEmpty()) {\n                JOptionPane.showMessageDialog(null, \"La contraseña no cumple:\\n\" + errores,\n                        \"Contraseña débil\", JOptionPane.ERROR_MESSAGE);\n            }\n        } while (!errores.isEmpty());\n\n        // 11. Mostrar la confirmación en una ventana de diálogo tipo mensaje\n        JOptionPane.showMessageDialog(null, \"Contraseña aceptada\");\n    }\n}",
      "lang": "java"
     },
     {
      "tabla": {
       "cabs": [
        "Decisión",
        "Por qué"
       ],
       "filas": [
        [
         "`do-while`",
         "La contraseña hay que pedirla **al menos una vez** antes de poder validarla"
        ],
        [
         "Flags `boolean` que empiezan en `false`",
         "Patrón \"buscar si existe\": se supone que no hay y, en cuanto aparece uno, se marca `true`. No importa cuántos haya"
        ],
        [
         "La función devuelve un `String` de errores y no un `boolean`",
         "Con un `boolean` solo sabrías **si** falla; con el texto sabes **qué** falla y se lo enseñas al usuario"
        ],
        [
         "`else if` dentro del `for`",
         "Un carácter solo puede ser de un tipo: cuando encaja en uno, no hace falta mirar los demás"
        ]
       ]
      }
     },
     {
      "nota": "Si se pulsa Cancelar, `showInputDialog` devuelve `null` y `password.length()` falla. Cómo controlarlo → [E06](@e06).",
      "tipo": "note"
     }
    ]
   },
   {
    "id": "e04",
    "titulo": "E04 · Generador de email corporativo",
    "bloques": [
     {
      "nota": "** Caso real:** el alta de un empleado en la intranet. A partir de nombre y apellidos se genera el email: inicial del nombre + primer apellido + inicial del segundo, sin tildes ni mayúsculas. `\"  María José \"` + `\" Pérez  Gómez \"` → `mperezg@empresa.es`",
      "tipo": "note"
     },
     {
      "p": "**Conceptos:** `trim` · `toLowerCase` · `replace` encadenado · `split(\"\\\\s+\")` · `charAt` · `char` + `String`"
     },
     {
      "code": "import javax.swing.JOptionPane;\n\npublic class GeneradorEmail {\n\n    public static String quitarTildes(String texto) {\n        // 5. Cambiar cada vocal con tilde, la ü y la ñ por su letra simple con el método replace (un email no admite tildes)\n        return texto.replace('á', 'a').replace('é', 'e').replace('í', 'i')\n                .replace('ó', 'o').replace('ú', 'u').replace('ü', 'u').replace('ñ', 'n');\n    }\n\n    public static String generarEmail(String nombre, String apellidos) {\n        final String DOMINIO = \"@empresa.es\";\n\n        // 4. Quitar espacios de los extremos con trim, pasar a minúsculas con toLowerCase y llamar a quitarTildes; guardarlo en nombreLimpio y apellidosLimpios\n        String nombreLimpio = quitarTildes(nombre.trim().toLowerCase());\n        String apellidosLimpios = quitarTildes(apellidos.trim().toLowerCase());\n\n        // 6. Separar los apellidos por uno o más espacios con split(\"\\\\s+\") y guardarlos en el array arrayApellidos\n        String[] arrayApellidos = apellidosLimpios.split(\"\\\\s+\");\n\n        // 7. Coger la inicial del nombre con método charAt(0) y guardarla en la variable inicialNombre\n        char inicialNombre = nombreLimpio.charAt(0);\n\n        // 8. Montar el usuario con la inicial + el primer apellido completo (arrayApellidos[0])\n        String usuario = inicialNombre + arrayApellidos[0];\n\n        // 9. Si hay segundo apellido (el array tiene más de 1 posición), añadir su inicial\n        if (arrayApellidos.length > 1) {\n            usuario += arrayApellidos[1].charAt(0);\n        }\n\n        // 10. Retornar el usuario unido al dominio\n        return usuario + DOMINIO;\n    }\n\n    public static void main(String[] args) {\n        // 1. Pedir al usuario el nombre en una ventana y guardarlo en la variable nombre\n        String nombre = JOptionPane.showInputDialog(\"Nombre:\");\n\n        // 2. Pedir al usuario los apellidos en una ventana y guardarlos en la variable apellidos\n        String apellidos = JOptionPane.showInputDialog(\"Apellidos:\");\n\n        // 3. Llamar a la función generarEmail y guardar lo que retorna en la variable emailCorporativo\n        String emailCorporativo = generarEmail(nombre, apellidos);\n\n        // 11. Mostrar el email generado en una ventana de diálogo tipo mensaje\n        JOptionPane.showMessageDialog(null, \"Email asignado: \" + emailCorporativo);\n    }\n}",
      "lang": "java"
     },
     {
      "tabla": {
       "cabs": [
        "Decisión",
        "Por qué"
       ],
       "filas": [
        [
         "`trim()` antes de todo",
         "Los usuarios pegan texto con espacios delante o detrás; si no se quitan, `charAt(0)` devolvería un espacio"
        ],
        [
         "`toLowerCase()` **antes** de `quitarTildes`",
         "Así `Í` pasa a `í` y basta con reemplazar las minúsculas acentuadas"
        ],
        [
         "`split(\"\\\\s+\")` en vez de `split(\" \")`",
         "Con dos espacios seguidos, `split(\" \")` crearía un apellido vacío `\"\"`"
        ],
        [
         "`if (arrayApellidos.length > 1)`",
         "Hay personas con un solo apellido: sin comprobarlo, `arrayApellidos[1]` daría `ArrayIndexOutOfBoundsException`"
        ],
        [
         "`inicialNombre + arrayApellidos[0]`",
         "`char` + `String` = `String`. (Ojo: `char` + `char` daría un **número**)"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "e05",
    "titulo": "E05 · Validador de DNI español",
    "bloques": [
     {
      "nota": "** Caso real:** cualquier formulario español con DNI. La letra se calcula con el resto de dividir el número entre 23; ese resto indica la posición de la letra en `\"TRWAGMYFPDXBNJZSQVHLCKE\"`. `12345678` → `12345678 % 23 = 14` → posición 14 → **`Z`**",
      "tipo": "note"
     },
     {
      "p": "**Conceptos:** `%` · `charAt` · `substring` · `parseInt` · `Character.isDigit/isLetter` · `char == char` · validar antes de procesar"
     },
     {
      "code": "import javax.swing.JOptionPane;\n\npublic class ValidadorDni {\n\n    public static char calcularLetraDni(int numeroDni) {\n        // 11. Guardar en la constante LETRAS las 23 letras en el orden oficial (la posición de cada letra es su resto)\n        final String LETRAS = \"TRWAGMYFPDXBNJZSQVHLCKE\";\n\n        // 12. Calcular el resto de dividir entre 23 y guardarlo en la variable posicion (siempre da 0..22, una posición válida)\n        int posicion = numeroDni % 23;\n\n        // 13. Retornar la letra de esa posición con método charAt\n        return LETRAS.charAt(posicion);\n    }\n\n    public static boolean tieneFormatoDni(String dni) {\n        // 4. Si no mide 9 caracteres, retornar false\n        if (dni.length() != 9) {\n            return false;\n        }\n\n        // 5. Recorrer los 8 primeros caracteres y retornar false en cuanto uno no sea dígito (Character.isDigit)\n        for (int i = 0; i < 8; i++) {\n            if (!Character.isDigit(dni.charAt(i))) {\n                return false;\n            }\n        }\n\n        // 6. Retornar si el último carácter es una letra (Character.isLetter ya devuelve true o false)\n        return Character.isLetter(dni.charAt(8));\n    }\n\n    public static void main(String[] args) {\n        // 1. Pedir al usuario el DNI en una ventana y guardarlo en la variable dniTexto\n        String dniTexto = JOptionPane.showInputDialog(\"DNI (8 números + letra):\");\n\n        // 2. Quitar espacios y guiones y pasar a mayúsculas (por si el usuario escribe \" 12345678-z\")\n        String dniLimpio = dniTexto.trim().replace(\"-\", \"\").replace(\" \", \"\").toUpperCase();\n\n        // 3. Llamar a la función tieneFormatoDni para comprobar el formato antes de calcular nada\n        if (!tieneFormatoDni(dniLimpio)) {\n            // 7. Si el formato no es correcto, mostrarlo en una ventana de diálogo tipo mensaje de error\n            JOptionPane.showMessageDialog(null, \"Formato incorrecto: deben ser 8 números y 1 letra\",\n                    \"DNI\", JOptionPane.ERROR_MESSAGE);\n        } else {\n            // 8. Separar la parte numérica con substring(0, 8) y convertirla a int con parseInt; guardarla en numeroDni\n            int numeroDni = Integer.parseInt(dniLimpio.substring(0, 8));\n\n            // 9. Guardar la letra escrita por el usuario en la variable letraEscrita con charAt(8)\n            char letraEscrita = dniLimpio.charAt(8);\n\n            // 10. Llamar a la función calcularLetraDni y guardar lo que retorna en la variable letraCorrecta\n            char letraCorrecta = calcularLetraDni(numeroDni);\n\n            // 14. Comparar las dos letras con == (los char se comparan con ==, los String con equals) y mostrar el resultado en una ventana de diálogo tipo mensaje\n            if (letraEscrita == letraCorrecta) {\n                JOptionPane.showMessageDialog(null, \"DNI válido: \" + dniLimpio);\n            } else {\n                JOptionPane.showMessageDialog(null, \"Letra incorrecta. Para \" + numeroDni\n                        + \" la letra es \" + letraCorrecta, \"DNI\", JOptionPane.WARNING_MESSAGE);\n            }\n        }\n    }\n}",
      "lang": "java"
     },
     {
      "tabla": {
       "cabs": [
        "Decisión",
        "Por qué"
       ],
       "filas": [
        [
         "Limpiar con `trim`, `replace` y `toUpperCase`",
         "Se acepta lo que la gente escribe de verdad: `12345678-z`, `12345678 Z`, con espacios…"
        ],
        [
         "Comprobar el formato **antes** de `parseInt`",
         "Si llega `\"1234X\"`, `substring(0, 8)` o `parseInt` fallarían. Primero validar, luego procesar"
        ],
        [
         "`return false` dentro del `for`",
         "En cuanto un carácter no es dígito, ya se sabe la respuesta: no hace falta mirar los demás"
        ],
        [
         "`% 23` como índice",
         "El resto de dividir entre 23 siempre está entre 0 y 22: justo las posiciones válidas del texto de 23 letras"
        ],
        [
         "Las letras se comparan con `==`",
         "Son `char` (primitivos). Si fueran `String`, habría que usar `equals`"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "e06",
    "titulo": "E06 · Cajero automático",
    "bloques": [
     {
      "nota": "** Caso real:** el menú de un cajero. Consultar saldo, ingresar y retirar (solo múltiplos de 10 € y sin superar el saldo), hasta que el usuario sale o pulsa Cancelar.",
      "tipo": "note"
     },
     {
      "p": "**Conceptos:** `do-while` + `switch` con flechas · controlar `null` de Cancelar · `+=` / `-=` · `else if` en cadena · `%` con `double`"
     },
     {
      "code": "import javax.swing.JOptionPane;\n\npublic class CajeroAutomatico {\n\n    public static void main(String[] args) {\n        // 1. Guardar el saldo inicial en la variable saldo (double porque hay céntimos)\n        double saldo = 1500.00;\n\n        // 2. Declarar la variable opcion fuera del bucle (la condición del while la necesita y dentro del do no la vería)\n        int opcion;\n\n        // 3. Repetir el menú hasta que el usuario elija salir (do-while porque el menú se muestra al menos una vez)\n        do {\n            // 4. Pedir al usuario la opción del menú en una ventana y guardarla en la variable opcionTexto\n            String opcionTexto = JOptionPane.showInputDialog(\n                    \"=== CAJERO ===\\n1. Consultar saldo\\n2. Ingresar\\n3. Retirar\\n0. Salir\");\n\n            // 5. Si pulsa Cancelar (showInputDialog devuelve null), tratarlo como salir; si no, convertirlo a int\n            if (opcionTexto == null) {\n                opcion = 0;\n            } else {\n                opcion = Integer.parseInt(opcionTexto.trim());\n            }\n\n            // 6. Ejecutar la operación elegida con switch (valor exacto de una lista cerrada de opciones)\n            switch (opcion) {\n                case 1 -> {\n                    // 7. Mostrar el saldo en una ventana de diálogo tipo mensaje\n                    JOptionPane.showMessageDialog(null, String.format(\"Saldo: %.2f €\", saldo));\n                }\n                case 2 -> {\n                    // 8. Pedir al usuario la cantidad a ingresar en una ventana; si es positiva, sumarla al saldo con +=\n                    double ingreso = Double.parseDouble(\n                            JOptionPane.showInputDialog(\"Cantidad a ingresar:\").replace(\",\", \".\"));\n                    if (ingreso > 0) {\n                        saldo += ingreso;\n                        JOptionPane.showMessageDialog(null, String.format(\"Ingresado. Saldo: %.2f €\", saldo));\n                    } else {\n                        JOptionPane.showMessageDialog(null, \"La cantidad debe ser positiva\");\n                    }\n                }\n                case 3 -> {\n                    // 9. Pedir al usuario la cantidad a retirar en una ventana y comprobar las reglas en orden (else if: se para en la primera que falle)\n                    double retirada = Double.parseDouble(\n                            JOptionPane.showInputDialog(\"Cantidad a retirar (múltiplos de 10):\").replace(\",\", \".\"));\n                    if (retirada <= 0) {\n                        JOptionPane.showMessageDialog(null, \"La cantidad debe ser positiva\");\n                    } else if (retirada > saldo) {\n                        JOptionPane.showMessageDialog(null, \"Saldo insuficiente\");\n                    } else if (retirada % 10 != 0) {\n                        JOptionPane.showMessageDialog(null, \"Solo billetes: múltiplos de 10 €\");\n                    } else {\n                        saldo -= retirada;\n                        JOptionPane.showMessageDialog(null, String.format(\"Retire su dinero. Saldo: %.2f €\", saldo));\n                    }\n                }\n                case 0 -> {\n                    // 10. Despedirse en una ventana de diálogo tipo mensaje (el while ve opcion 0 y termina)\n                    JOptionPane.showMessageDialog(null, \"Gracias. Retire su tarjeta.\");\n                }\n                default -> {\n                    // 11. Cualquier otro número: avisar en una ventana de diálogo tipo mensaje de aviso\n                    JOptionPane.showMessageDialog(null, \"Opción no válida\", \"Error\", JOptionPane.WARNING_MESSAGE);\n                }\n            }\n        } while (opcion != 0);\n    }\n}",
      "lang": "java"
     },
     {
      "tabla": {
       "cabs": [
        "Decisión",
        "Por qué"
       ],
       "filas": [
        [
         "`do-while`",
         "Un menú se muestra **siempre** al menos una vez"
        ],
        [
         "`opcion` declarada fuera del `do`",
         "Lo que se declara dentro de `{ }` no existe fuera, y la condición del `while` está fuera"
        ],
        [
         "`if (opcionTexto == null)`",
         "Cancelar devuelve `null`; sin esta comprobación, `trim()` lanzaría `NullPointerException`"
        ],
        [
         "`switch` y no `if`",
         "La opción es un **valor exacto** de una lista cerrada (0, 1, 2, 3)"
        ],
        [
         "Validaciones con `else if` en orden",
         "Se para en la primera regla que falla y da un único mensaje claro"
        ],
        [
         "`retirada % 10 != 0`",
         "El cajero solo tiene billetes: el importe debe ser múltiplo de 10"
        ]
       ]
      }
     },
     {
      "nota": "Con `switch` clásico, cada `case` necesita su `break;`. Las flechas `->` lo evitan → [MOD.04 · switch](@switch).",
      "tipo": "tip"
     }
    ]
   },
   {
    "id": "e07",
    "titulo": "E07 · Informe de ventas semanal",
    "bloques": [
     {
      "nota": "** Caso real:** el panel de un comercio. Con las ventas de cada día se calcula el total, la media y el mejor día, y se listan los días por encima de la media.",
      "tipo": "note"
     },
     {
      "p": "**Conceptos:** arrays paralelos · acumulador · máximo **con posición** · `length` · `for` vs `for-each` · `StringBuilder`"
     },
     {
      "code": "import javax.swing.JOptionPane;\n\npublic class InformeVentas {\n\n    public static double calcularTotal(double[] importes) {\n        // 4. Crear el acumulador sumaImportes a 0 (sumar empieza desde 0)\n        double sumaImportes = 0;\n\n        // 5. Recorrer el array con for-each (solo hay que leer, no hace falta el índice) y sumar cada importe con +=\n        for (double importe : importes) {\n            sumaImportes += importe;\n        }\n\n        // 6. Retornar la suma\n        return sumaImportes;\n    }\n\n    public static int buscarPosicionMaximo(double[] importes) {\n        // 9. Suponer que el mayor está en la posición 0 y guardarlo en la variable posicionMaximo\n        int posicionMaximo = 0;\n\n        // 10. Recorrer desde la posición 1 con for clásico (aquí sí hace falta el índice) y quedarse con la posición si el valor es mayor\n        for (int i = 1; i < importes.length; i++) {\n            if (importes[i] > importes[posicionMaximo]) {\n                posicionMaximo = i;\n            }\n        }\n\n        // 11. Retornar la posición (no el valor: con la posición se saca el valor Y el nombre del día)\n        return posicionMaximo;\n    }\n\n    public static void main(String[] args) {\n        // 1. Guardar los nombres de los días en el array dias\n        String[] dias = {\"Lunes\", \"Martes\", \"Miércoles\", \"Jueves\", \"Viernes\", \"Sábado\", \"Domingo\"};\n\n        // 2. Guardar las ventas de cada día en el array ventasDiarias (arrays paralelos: la misma posición es el mismo día)\n        double[] ventasDiarias = {1250.50, 980.00, 1430.75, 1100.00, 2150.30, 3200.00, 1875.45};\n\n        // 3. Llamar a la función calcularTotal y guardar lo que retorna en la variable totalSemana\n        double totalSemana = calcularTotal(ventasDiarias);\n\n        // 7. Calcular la media dividiendo entre la propiedad length del array (sin paréntesis: es propiedad, no método)\n        double mediaDiaria = totalSemana / ventasDiarias.length;\n\n        // 8. Llamar a la función buscarPosicionMaximo y guardar lo que retorna en la variable posicionMejorDia\n        int posicionMejorDia = buscarPosicionMaximo(ventasDiarias);\n\n        // 12. Crear un StringBuilder informe para ir montando el texto (más eficiente que += dentro de un bucle)\n        StringBuilder informe = new StringBuilder();\n        informe.append(String.format(\"Total semana: %.2f €%n\", totalSemana));\n        informe.append(String.format(\"Media diaria: %.2f €%n\", mediaDiaria));\n        informe.append(String.format(\"Mejor día: %s (%.2f €)%n%n\", dias[posicionMejorDia], ventasDiarias[posicionMejorDia]));\n        informe.append(\"Días por encima de la media:\\n\");\n\n        // 13. Recorrer con for clásico (hace falta i para leer los dos arrays a la vez) y añadir los días que superan la media\n        int diasPorEncima = 0;\n        for (int i = 0; i < ventasDiarias.length; i++) {\n            if (ventasDiarias[i] > mediaDiaria) {\n                informe.append(String.format(\"  - %s: %.2f €%n\", dias[i], ventasDiarias[i]));\n                diasPorEncima++;\n            }\n        }\n        informe.append(\"Total: \").append(diasPorEncima).append(\" días\");\n\n        // 14. Mostrar el informe en una ventana de diálogo tipo mensaje (toString convierte el StringBuilder en String)\n        JOptionPane.showMessageDialog(null, informe.toString(), \"Informe semanal\", JOptionPane.INFORMATION_MESSAGE);\n    }\n}",
      "lang": "java"
     },
     {
      "p": "**Resultado:**"
     },
     {
      "consola": "Total semana: 11987,00 €\nMedia diaria: 1712,43 €\nMejor día: Sábado (3200,00 €)\n\nDías por encima de la media:\n  - Viernes: 2150,30 €\n  - Sábado: 3200,00 €\n  - Domingo: 1875,45 €\nTotal: 3 días"
     },
     {
      "tabla": {
       "cabs": [
        "Decisión",
        "Por qué"
       ],
       "filas": [
        [
         "Arrays paralelos `dias` / `ventasDiarias`",
         "La posición `i` une los dos datos. (Más adelante esto se hará con objetos)"
        ],
        [
         "`buscarPosicionMaximo` devuelve la **posición**",
         "Con la posición se saca el importe (`ventasDiarias[pos]`) **y** el nombre del día (`dias[pos]`). Con el valor solo, no sabrías qué día fue"
        ],
        [
         "`for-each` en `calcularTotal`, `for` en el informe",
         "Para sumar no hace falta saber la posición; para leer dos arrays a la vez, sí"
        ],
        [
         "Empezar el máximo en la posición 0",
         "Se compara con un valor real del array. Inicializar el máximo con el número `0` fallaría si todos los valores fueran negativos"
        ],
        [
         "`StringBuilder`",
         "El texto se construye dentro de un bucle → [MOD.05 · Texto](@elegir-texto)"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "e08",
    "titulo": "E08 · Analizador de logs de un servidor",
    "bloques": [
     {
      "nota": "** Caso real:** revisar el log de una aplicación tras un despliegue (muy habitual en QA). Se cuentan las líneas por nivel (`INFO`, `WARN`, `ERROR`…), se calcula el porcentaje de errores y se listan sus mensajes.",
      "tipo": "note"
     },
     {
      "p": "**Conceptos:** `indexOf` · `substring` · `switch` con `String` · contadores · `ArrayList` · `100.0` contra la división entera"
     },
     {
      "code": "import javax.swing.JOptionPane;\nimport java.util.ArrayList;\n\npublic class AnalizadorLogs {\n\n    public static String extraerNivel(String linea) {\n        // 4. Buscar las posiciones de los corchetes con indexOf y guardarlas en inicio y fin\n        int inicio = linea.indexOf('[');\n        int fin = linea.indexOf(']');\n\n        // 5. Si falta alguno (indexOf devuelve -1), retornar \"DESCONOCIDO\"\n        if (inicio == -1 || fin == -1) {\n            return \"DESCONOCIDO\";\n        }\n\n        // 6. Retornar el texto entre corchetes con substring (inicio + 1 para saltar el '[', fin no se incluye)\n        return linea.substring(inicio + 1, fin);\n    }\n\n    public static String extraerMensaje(String linea) {\n        // 9. Retornar lo que hay después de \"] \" con substring (+ 2 para saltar el corchete y el espacio)\n        return linea.substring(linea.indexOf(']') + 2);\n    }\n\n    public static void main(String[] args) {\n        // 1. Guardar las líneas del log en el array lineasLog (en un caso real vendrían de un archivo)\n        String[] lineasLog = {\n            \"2026-10-03 09:00:01 [INFO] Servidor iniciado en el puerto 8080\",\n            \"2026-10-03 09:02:15 [INFO] Usuario ana.garcia ha iniciado sesión\",\n            \"2026-10-03 09:05:42 [WARN] Tiempo de respuesta alto en /api/productos (1850 ms)\",\n            \"2026-10-03 09:07:03 [ERROR] Timeout al conectar con la base de datos\",\n            \"2026-10-03 09:07:04 [INFO] Reintentando conexión...\",\n            \"2026-10-03 09:07:09 [ERROR] NullPointerException en CarritoService.java:42\",\n            \"2026-10-03 09:10:30 [WARN] Memoria al 85 %\",\n            \"2026-10-03 09:15:00 [DEBUG] Caché vaciada\"\n        };\n\n        // 2. Crear los contadores a 0 y la lista mensajesError (ArrayList porque no sé de antemano cuántos errores habrá)\n        int contadorInfo = 0;\n        int contadorWarn = 0;\n        int contadorError = 0;\n        int contadorOtros = 0;\n        ArrayList<String> mensajesError = new ArrayList<>();\n\n        // 3. Recorrer cada línea con for-each y llamar a extraerNivel; guardar lo que retorna en la variable nivel\n        for (String linea : lineasLog) {\n            String nivel = extraerNivel(linea);\n\n            // 7. Contar según el nivel con switch sobre String (valores exactos y conocidos)\n            switch (nivel) {\n                case \"INFO\" -> contadorInfo++;\n                case \"WARN\" -> contadorWarn++;\n                case \"ERROR\" -> {\n                    contadorError++;\n                    // 8. Llamar a extraerMensaje y añadir el mensaje a la lista mensajesError con add\n                    mensajesError.add(extraerMensaje(linea));\n                }\n                default -> contadorOtros++;\n            }\n        }\n\n        // 10. Calcular el porcentaje de errores (100.0 con decimal para que la división no sea entera)\n        double porcentajeError = contadorError * 100.0 / lineasLog.length;\n\n        // 11. Montar el resumen y añadir cada mensaje de error recorriendo la lista con for-each\n        String resumen = String.format(\n                \"Líneas: %d%nINFO: %d | WARN: %d | ERROR: %d | Otros: %d%nErrores: %.1f %%%n%nDetalle de errores:%n\",\n                lineasLog.length, contadorInfo, contadorWarn, contadorError, contadorOtros, porcentajeError);\n        for (String mensaje : mensajesError) {\n            resumen += \"  ✖ \" + mensaje + \"\\n\";\n        }\n\n        // 12. Mostrar el resumen en una ventana de diálogo tipo mensaje\n        JOptionPane.showMessageDialog(null, resumen, \"Análisis de log\", JOptionPane.INFORMATION_MESSAGE);\n    }\n}",
      "lang": "java"
     },
     {
      "p": "**Resultado:**"
     },
     {
      "consola": "Líneas: 8\nINFO: 3 | WARN: 2 | ERROR: 2 | Otros: 1\nErrores: 25,0 %\n\nDetalle de errores:\n  ✖ Timeout al conectar con la base de datos\n  ✖ NullPointerException en CarritoService.java:42"
     },
     {
      "tabla": {
       "cabs": [
        "Decisión",
        "Por qué"
       ],
       "filas": [
        [
         "`indexOf('[')` + `substring`",
         "El nivel no está siempre en la misma posición (`INFO` y `ERROR` tienen distinta longitud): se localiza por los corchetes"
        ],
        [
         "Comprobar `-1` en `extraerNivel`",
         "Una línea mal formada no debe romper el análisis de todo el archivo"
        ],
        [
         "`ArrayList` para los mensajes",
         "No se sabe de antemano cuántos errores habrá"
        ],
        [
         "`switch` sobre `String`",
         "Valores exactos y conocidos. `default` recoge cualquier otro nivel (`DEBUG`, `TRACE`…)"
        ],
        [
         "`contadorError * 100.0`",
         "Con `* 100` (entero), `2 * 100 / 8` daría `25` pero `1 * 100 / 3` daría `33` en vez de `33.3`"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "e09",
    "titulo": "E09 · Gestor de turnos de una tienda",
    "bloques": [
     {
      "nota": "** Caso real:** el dispensador de números de una tienda o de la ventanilla de una administración. Se sacan tickets (`A001`, `A002`…), se atiende por orden de llegada y cada cliente puede consultar cuántas personas tiene delante.",
      "tipo": "note"
     },
     {
      "p": "**Conceptos:** `ArrayList` como cola (`add` al final, `remove(0)` del principio) · `indexOf` · `isEmpty` · `showOptionDialog` · `while` con flag"
     },
     {
      "code": "import javax.swing.JOptionPane;\nimport java.util.ArrayList;\n\npublic class GestorTurnos {\n\n    public static void main(String[] args) {\n        // 1. Crear la lista colaClientes vacía (ArrayList porque la cola crece y encoge todo el rato)\n        ArrayList<String> colaClientes = new ArrayList<>();\n\n        // 2. Crear el contador numeroTicket a 0 y el indicador abierto a true (controla el bucle sin while(true))\n        int numeroTicket = 0;\n        boolean abierto = true;\n        String[] botones = {\"Nuevo turno\", \"Atender\", \"Mi posición\", \"Ver cola\", \"Cerrar\"};\n\n        // 3. Repetir mientras el puesto esté abierto\n        while (abierto) {\n            // 4. Mostrar los botones con showOptionDialog y guardar el índice del botón pulsado en la variable eleccion (-1 si se cierra con la X)\n            int eleccion = JOptionPane.showOptionDialog(null,\n                    \"Clientes en espera: \" + colaClientes.size(), \"Turnos\",\n                    JOptionPane.DEFAULT_OPTION, JOptionPane.QUESTION_MESSAGE,\n                    null, botones, botones[0]);\n\n            switch (eleccion) {\n                case 0 -> {\n                    // 5. Sumar 1 al contador, formatear el ticket con 3 cifras (%03d → A007) y añadirlo al final con add\n                    numeroTicket++;\n                    String ticket = String.format(\"A%03d\", numeroTicket);\n                    colaClientes.add(ticket);\n                    JOptionPane.showMessageDialog(null, \"Su turno: \" + ticket);\n                }\n                case 1 -> {\n                    // 6. Si la cola no está vacía, sacar el primero con remove(0) (devuelve el elemento quitado y los demás avanzan)\n                    if (colaClientes.isEmpty()) {\n                        JOptionPane.showMessageDialog(null, \"No hay nadie esperando\");\n                    } else {\n                        String atendido = colaClientes.remove(0);\n                        JOptionPane.showMessageDialog(null, \"Pase \" + atendido);\n                    }\n                }\n                case 2 -> {\n                    // 7. Pedir al usuario su ticket en una ventana y buscar su posición con indexOf (-1 si no está)\n                    String ticketBuscado = JOptionPane.showInputDialog(\"Su ticket (ej: A003):\");\n                    int posicion = colaClientes.indexOf(ticketBuscado.trim().toUpperCase());\n                    if (posicion == -1) {\n                        JOptionPane.showMessageDialog(null, \"Ese ticket no está en la cola\");\n                    } else {\n                        JOptionPane.showMessageDialog(null, \"Personas delante de usted: \" + posicion);\n                    }\n                }\n                case 3 -> {\n                    // 8. Mostrar la cola completa (al concatenar un ArrayList se imprime como [A001, A002])\n                    JOptionPane.showMessageDialog(null,\n                            colaClientes.isEmpty() ? \"Cola vacía\" : \"En cola: \" + colaClientes);\n                }\n                default -> {\n                    // 9. Botón Cerrar (4) o la X (-1): poner abierto a false para que el while termine\n                    abierto = false;\n                }\n            }\n        }\n    }\n}",
      "lang": "java"
     },
     {
      "tabla": {
       "cabs": [
        "Decisión",
        "Por qué"
       ],
       "filas": [
        [
         "`ArrayList` y no array",
         "La cola cambia de tamaño constantemente"
        ],
        [
         "`add` al final y `remove(0)` del principio",
         "Así funciona una cola (FIFO: el primero que llega es el primero que sale)"
        ],
        [
         "`remove(0)` devuelve el elemento",
         "Se saca y se usa en una sola línea: `String atendido = colaClientes.remove(0);`"
        ],
        [
         "`indexOf` = personas delante",
         "Si estás en la posición 2, delante tienes las posiciones 0 y 1: dos personas"
        ],
        [
         "`String.format(\"A%03d\", n)`",
         "Rellena con ceros: `A001` en vez de `A1`, como un ticket real"
        ],
        [
         "`boolean abierto` en lugar de `while (true)`",
         "La condición de salida se ve en el propio `while`"
        ],
        [
         "`default` para cerrar",
         "Recoge el botón \"Cerrar\" (4) **y** la X de la ventana (-1) en un mismo sitio"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "e10",
    "titulo": "E10 · Reserva de butacas de cine",
    "bloques": [
     {
      "nota": "** Caso real:** la selección de butacas al comprar una entrada. Se muestra el mapa de la sala, el usuario elige fila y asiento, y se valida que exista y esté libre.",
      "tipo": "note"
     },
     {
      "p": "**Conceptos:** matriz `char[][]` · `for` anidados · validar rango antes de acceder · `split` · conversión de numeración 1↔0 · HTML en JOptionPane"
     },
     {
      "code": "import javax.swing.JOptionPane;\n\npublic class ReservaCine {\n\n    public static int contarLibres(char[][] sala, char libre) {\n        // 4. Recorrer la matriz con dos for anidados (filas fuera, asientos dentro) y contar los libres\n        int asientosLibres = 0;\n        for (int fila = 0; fila < sala.length; fila++) {\n            for (int asiento = 0; asiento < sala[fila].length; asiento++) {\n                if (sala[fila][asiento] == libre) {\n                    asientosLibres++;\n                }\n            }\n        }\n        // 5. Retornar el total de libres\n        return asientosLibres;\n    }\n\n    public static String dibujarSala(char[][] sala) {\n        // 6. Montar el dibujo con StringBuilder: primero la cabecera con los números de asiento (asiento + 1 porque el usuario cuenta desde 1)\n        StringBuilder dibujo = new StringBuilder(\"      PANTALLA\\n    \");\n        for (int asiento = 0; asiento < sala[0].length; asiento++) {\n            dibujo.append(asiento + 1).append(' ');\n        }\n        dibujo.append('\\n');\n\n        // 7. Añadir cada fila con su número y sus asientos (dos for anidados, igual que al contar)\n        for (int fila = 0; fila < sala.length; fila++) {\n            dibujo.append(\"F\").append(fila + 1).append(\"  \");\n            for (int asiento = 0; asiento < sala[fila].length; asiento++) {\n                dibujo.append(sala[fila][asiento]).append(' ');\n            }\n            dibujo.append('\\n');\n        }\n\n        // 8. Retornar el dibujo convertido a String con toString\n        return dibujo.toString();\n    }\n\n    public static void main(String[] args) {\n        final char LIBRE = '·';\n        final char OCUPADO = 'X';\n\n        // 1. Crear la matriz sala de 5 filas x 8 asientos y rellenarla con LIBRE\n        char[][] sala = new char[5][8];\n        for (int fila = 0; fila < sala.length; fila++) {\n            for (int asiento = 0; asiento < sala[fila].length; asiento++) {\n                sala[fila][asiento] = LIBRE;\n            }\n        }\n\n        // 2. Marcar algunos asientos ya vendidos (simula reservas anteriores)\n        sala[2][3] = OCUPADO;\n        sala[2][4] = OCUPADO;\n        sala[4][0] = OCUPADO;\n\n        // 3. Repetir mientras el usuario quiera seguir y queden asientos libres (llamando a contarLibres en la condición)\n        boolean seguirReservando = true;\n        while (seguirReservando && contarLibres(sala, LIBRE) > 0) {\n\n            // 9. Pedir al usuario fila y asiento en una ventana, enseñando el dibujo de dibujarSala dentro de <html><pre> (así la ventana usa letra monoespaciada y las columnas cuadran)\n            String entrada = JOptionPane.showInputDialog(\"<html><pre>\" + dibujarSala(sala) + \"</pre>\"\n                    + \"Fila y asiento separados por espacio (ej: 3 6)<br>Cancelar para terminar</html>\");\n\n            // 10. Si pulsa Cancelar, poner seguirReservando a false (el while termina en la siguiente comprobación)\n            if (entrada == null) {\n                seguirReservando = false;\n            } else {\n                // 11. Separar los dos números con split y restar 1 (el usuario cuenta desde 1, el array desde 0)\n                String[] partes = entrada.trim().split(\"\\\\s+\");\n                int fila = Integer.parseInt(partes[0]) - 1;\n                int asiento = Integer.parseInt(partes[1]) - 1;\n\n                // 12. Comprobar el rango ANTES de acceder a la matriz (si no, ArrayIndexOutOfBoundsException) y luego si está ocupado\n                if (fila < 0 || fila >= sala.length || asiento < 0 || asiento >= sala[0].length) {\n                    JOptionPane.showMessageDialog(null, \"Ese asiento no existe\", \"Error\", JOptionPane.ERROR_MESSAGE);\n                } else if (sala[fila][asiento] == OCUPADO) {\n                    JOptionPane.showMessageDialog(null, \"Asiento ocupado, elige otro\");\n                } else {\n                    sala[fila][asiento] = OCUPADO;\n                    JOptionPane.showMessageDialog(null, \"Reservado: fila \" + (fila + 1) + \", asiento \" + (asiento + 1));\n                }\n            }\n        }\n\n        // 13. Mostrar los asientos que quedan libres en una ventana de diálogo tipo mensaje\n        JOptionPane.showMessageDialog(null, \"Quedan \" + contarLibres(sala, LIBRE) + \" asientos libres\");\n    }\n}",
      "lang": "java"
     },
     {
      "p": "**Lo que ve el usuario:**"
     },
     {
      "consola": "      PANTALLA\n    1 2 3 4 5 6 7 8\nF1  · · · · · · · X\nF2  · · · · · · · ·\nF3  · · · X X · · ·\nF4  · · · · · · · ·\nF5  X · · · · · · ·"
     },
     {
      "tabla": {
       "cabs": [
        "Decisión",
        "Por qué"
       ],
       "filas": [
        [
         "Matriz `char[5][8]`",
         "La sala **es** una tabla: filas × asientos. `sala[fila][asiento]` se lee igual que en la taquilla"
        ],
        [
         "Restar 1 a lo que escribe el usuario",
         "Las personas cuentan desde 1; los arrays, desde 0"
        ],
        [
         "Validar el rango **antes** de `sala[fila][asiento]`",
         "Si la fila es 9, acceder directamente lanzaría `ArrayIndexOutOfBoundsException`"
        ],
        [
         "`||` en la validación de rango",
         "Basta con que **una** coordenada esté fuera para rechazarla"
        ],
        [
         "`contarLibres(...) > 0` en la condición del `while`",
         "Si la sala se llena, el bucle termina solo"
        ],
        [
         "`<html><pre>` en el mensaje",
         "JOptionPane usa una letra proporcional; `<pre>` la cambia a monoespaciada y las columnas cuadran"
        ],
        [
         "`sala[0].length` para las columnas",
         "Así funciona aunque cambies el tamaño de la sala, sin números fijos en el código"
        ]
       ]
      }
     },
     {
      "consola": "┌─[ FIN DE TRANSMISIÓN ]───────────────────────────────────────────────┐\n│  Java 21 LTS · código compilado y probado · comentarios = pasos      │\n└─────────────────────────────────────────────────────────── SYS.OK ───┘"
     }
    ]
   }
  ],
  "intro": [
   {
    "p": "Cada ejercicio simula una pieza de una aplicación real. Todos usan ventanas `JOptionPane` y están compilados y probados."
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
       "[E01](@e01)",
       "Ticket de caja con descuento e IVA",
       "Tipos, constantes, operadores, ternario, `String.format`"
      ],
      [
       "[E02](@e02)",
       "Tarifa de un parking",
       "`if / else if`, división entera, `%`, función con `return`"
      ],
      [
       "[E03](@e03)",
       "Validador de contraseña de un registro",
       "`do-while`, `for` + `charAt`, `Character`, flags `boolean`"
      ],
      [
       "[E04](@e04)",
       "Generador de email corporativo",
       "`trim`, `split`, `toLowerCase`, `replace`, `charAt`"
      ],
      [
       "[E05](@e05)",
       "Validador de DNI español",
       "`%`, `substring`, `charAt`, `parseInt`, `char` con `==`"
      ],
      [
       "[E06](@e06)",
       "Cajero automático",
       "`do-while` + `switch`, `null` de Cancelar, `+=` / `-=`"
      ],
      [
       "[E07](@e07)",
       "Informe de ventas semanal",
       "Arrays paralelos, suma, media, máximo, `StringBuilder`"
      ],
      [
       "[E08](@e08)",
       "Analizador de logs de un servidor",
       "`indexOf`, `substring`, `switch` con String, `ArrayList`"
      ],
      [
       "[E09](@e09)",
       "Gestor de turnos de una tienda",
       "`ArrayList` como cola, `remove(0)`, `indexOf`, `showOptionDialog`"
      ],
      [
       "[E10](@e10)",
       "Reserva de butacas de cine",
       "Matriz 2D, `for` anidados, validar rango, `split`"
      ]
     ]
    }
   }
  ]
 }
};
  APP.register({ slug: "java", contenido: mods });
})();

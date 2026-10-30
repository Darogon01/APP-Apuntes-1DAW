/* Módulo 12 (JOIN) con un color por tabla. Los diagramas y los resultados se calculan con js/joinviz.js. */
(function () {
  APP.register({ slug: "sql", contenido: { "mod-12": {
   "resumen": "INNER · LEFT · RIGHT · FULL · CROSS · SELF, con un color por tabla",
   "secciones": [
    {
     "id": "join-leer",
     "titulo": "Cómo leer los diagramas",
     "bloques": [
      {
       "p": "Un `JOIN` pega filas de dos tablas **cuando se cumple una condición** (el `ON`): casi siempre `FK = PK`. Para verlo, cada consulta de este módulo se explica con el mismo sistema: **un color por tabla**, la columna del `ON` sombreada, una flecha por cada pareja y el resultado calculado con los datos reales de `tienda_online`."
      },
      {
       "join": "leyenda"
      },
      {
       "join": "mapa"
      },
      {
       "nota": "El color solo sirve para saber **de qué tabla viene cada cosa**. El naranja se reserva para el número de cada `JOIN` y para las palabras clave de la consulta.",
       "tipo": "note"
      }
     ]
    },
    {
     "id": "join-tipos",
     "titulo": "Tipos",
     "bloques": [
      {
       "p": "Todos los `JOIN` hacen lo mismo con las parejas (las filas que cumplen el `ON`). **Cambia lo que hacen con las filas sin pareja**:"
      },
      {
       "tabla": {
        "cabs": [
         "JOIN",
         "Devuelve",
         "Sin pareja…",
         "Pregunta típica"
        ],
        "filas": [
         [
          "`INNER JOIN` (o solo `JOIN`)",
          "Solo filas con pareja en las dos tablas",
          "Desaparecen (✕)",
          "\"Pedidos **con** su cliente\""
         ],
         [
          "`LEFT JOIN`",
          "Todas las de la izquierda + su pareja",
          "Columnas de la derecha a `NULL` (∅)",
          "\"**Todos** los clientes, tengan o no pedidos\""
         ],
         [
          "`RIGHT JOIN`",
          "Todas las de la derecha + su pareja",
          "Columnas de la izquierda a `NULL` (∅)",
          "Igual que LEFT con las tablas al revés (se usa poco)"
         ],
         [
          "`FULL JOIN`",
          "Todas de las dos",
          "`NULL` en el lado que falte (∅)",
          "Comparar dos listados"
         ],
         [
          "`CROSS JOIN`",
          "Todas las combinaciones (A × B)",
          "No hay `ON` ni parejas",
          "Generar combinaciones: tallas × colores"
         ]
        ]
       }
      },
      {
       "p": "La izquierda es la tabla del `FROM`; la derecha es la que escribes después del `JOIN`. Los ejemplos de abajo usan la misma pareja de tablas para que se vea la diferencia."
      }
     ]
    },
    {
     "id": "join-inner",
     "titulo": "INNER JOIN",
     "bloques": [
      {
       "join": {
        "n": "1",
        "titulo": "Cada pedido con el nombre de su cliente",
        "idea": "`INNER JOIN`: solo salen las filas que tienen pareja en las dos tablas.",
        "tablas": [
         {
          "t": "clientes",
          "a": "c",
          "cols": [
           "id_cliente",
           "nombre"
          ]
         },
         {
          "t": "pedidos",
          "a": "p",
          "cols": [
           "id_pedido",
           "id_cliente",
           "estado"
          ]
         }
        ],
        "joins": [
         {
          "tipo": "inner",
          "on": [
           "p.id_cliente",
           "c.id_cliente"
          ]
         }
        ],
        "sel": [
         "c.nombre",
         "p.id_pedido",
         "p.estado"
        ],
        "orden": [
         "id_pedido"
        ],
        "maxFilas": 12,
        "porque": [
         "((clientes|Lucía)) tiene tres ((pedidos|pedidos)) (1, 3 y 9): cada pareja que cumple el `ON` es **una fila**, así que su nombre sale tres veces.",
         "((clientes|Andrea)) y ((clientes|Diego)) no tienen ningún pedido. Sin pareja no hay fila, y en un `INNER JOIN` no salen (✕).",
         "El resultado tiene 10 filas, tantas como ((pedidos|pedidos)): cada pedido tiene un único cliente, así que no se pierde ni se repite ninguno."
        ]
       }
      },
      {
       "join": {
        "n": "2",
        "titulo": "Solo los pedidos entregados, con su cliente",
        "idea": "El `WHERE` se aplica **después** de unir: quita filas del resultado, pero no cambia qué parejas existen.",
        "tablas": [
         {
          "t": "clientes",
          "a": "c",
          "cols": [
           "id_cliente",
           "nombre"
          ]
         },
         {
          "t": "pedidos",
          "a": "p",
          "cols": [
           "id_pedido",
           "id_cliente",
           "estado"
          ]
         }
        ],
        "joins": [
         {
          "tipo": "inner",
          "on": [
           "p.id_cliente",
           "c.id_cliente"
          ]
         }
        ],
        "where": [
         {
          "col": "p.estado",
          "op": "=",
          "val": "entregado"
         }
        ],
        "sel": [
         "c.nombre",
         "p.id_pedido",
         "p.estado"
        ],
        "orden": [
         "id_pedido"
        ],
        "porque": [
         "Primero se unen todas las parejas; después el `WHERE` deja solo las de ((pedidos|estado)) `entregado`.",
         "((clientes|Javier)) y ((clientes|Pablo)) sí tenían pareja, pero sus pedidos (5 y 8) no están entregados. Por eso también quedan fuera (✕).",
         "Si una columna existe en las dos tablas (`id_cliente`), hay que indicar de cuál con el alias: `c.id_cliente` o `p.id_cliente`."
        ]
       }
      },
      {
       "tabla": {
        "cabs": [
         "Detalle",
         "Por qué"
        ],
        "filas": [
         [
          "Alias `p`, `c`",
          "Escribir menos y evitar ambigüedad"
         ],
         [
          "`c.id_cliente`, `p.estado`",
          "Si una columna existe en las dos tablas (`id_cliente`), hay que indicar de cuál; si no, error \"la referencia a la columna «id_cliente» es ambigua\""
         ],
         [
          "`ON p.id_cliente = c.id_cliente`",
          "La condición de unión: **FK = PK**"
         ],
         [
          "`USING (id_cliente)`",
          "Atajo cuando la columna se llama igual en las dos tablas: `JOIN clientes USING (id_cliente)`"
         ]
        ]
       }
      }
     ]
    },
    {
     "id": "join-left",
     "titulo": "LEFT JOIN",
     "bloques": [
      {
       "join": {
        "n": "3",
        "titulo": "Todos los clientes, con sus pedidos si los tienen",
        "idea": "`LEFT JOIN`: sale **todo lo de la izquierda**. Si no hay pareja, las columnas de la derecha salen a `NULL`.",
        "tablas": [
         {
          "t": "clientes",
          "a": "c",
          "cols": [
           "id_cliente",
           "nombre"
          ]
         },
         {
          "t": "pedidos",
          "a": "p",
          "cols": [
           "id_pedido",
           "id_cliente",
           "estado"
          ]
         }
        ],
        "joins": [
         {
          "tipo": "left",
          "on": [
           "p.id_cliente",
           "c.id_cliente"
          ]
         }
        ],
        "sel": [
         "c.nombre",
         "p.id_pedido",
         "p.estado"
        ],
        "orden": [
         "nombre",
         "id_pedido"
        ],
        "maxFilas": 14,
        "porque": [
         "Es el mismo resultado que el `INNER JOIN` del ejemplo 1 **más** una fila por cada ((clientes|cliente)) sin pareja.",
         "((clientes|Andrea)) y ((clientes|Diego)) no tienen pedido: salen una vez, con `NULL` en todas las columnas de ((pedidos|pedidos)) (∅).",
         "Los `NULL` no son errores: significan \"no había pareja\"."
        ]
       }
      },
      {
       "join": {
        "n": "4",
        "titulo": "Número de pedidos por cliente (con los ceros)",
        "idea": "Con `LEFT JOIN` se puede contar y que aparezcan los clientes con 0.",
        "tablas": [
         {
          "t": "clientes",
          "a": "c",
          "cols": [
           "id_cliente",
           "nombre"
          ]
         },
         {
          "t": "pedidos",
          "a": "p",
          "cols": [
           "id_pedido",
           "id_cliente",
           "estado"
          ]
         }
        ],
        "joins": [
         {
          "tipo": "left",
          "on": [
           "p.id_cliente",
           "c.id_cliente"
          ]
         }
        ],
        "sel": [
         "c.nombre",
         {
          "agg": "count",
          "col": "p.id_pedido",
          "as": "pedidos"
         }
        ],
        "orden": [
         "pedidos desc",
         "nombre"
        ],
        "maxFilas": 10,
        "porque": [
         "`count(p.id_pedido)` cuenta **valores que no son `NULL`** de ((pedidos|pedidos)). Para ((clientes|Andrea)) todos son `NULL`: 0.",
         "`count(*)` contaría filas, y la fila de Andrea con `NULL` cuenta como 1. Por eso se cuenta una columna de la tabla derecha.",
         "`group by c.nombre` junta las filas de cada cliente: una fila de resultado por ((clientes|cliente))."
        ]
       }
      },
      {
       "aviso": "Con `LEFT JOIN`, usa `COUNT(p.id_pedido)` y no `COUNT(*)`: `COUNT(*)` contaría la fila de Andrea con `NULL` como 1 pedido.",
       "tipo": "warning"
      },
      {
       "join": {
        "n": "5",
        "titulo": "Trampa: filtrar la tabla de la derecha en el WHERE",
        "idea": "Este `LEFT JOIN` acaba comportándose como un `INNER JOIN`.",
        "tablas": [
         {
          "t": "clientes",
          "a": "c",
          "cols": [
           "id_cliente",
           "nombre"
          ]
         },
         {
          "t": "pedidos",
          "a": "p",
          "cols": [
           "id_pedido",
           "id_cliente",
           "estado"
          ]
         }
        ],
        "joins": [
         {
          "tipo": "left",
          "on": [
           "p.id_cliente",
           "c.id_cliente"
          ]
         }
        ],
        "where": [
         {
          "col": "p.estado",
          "op": "=",
          "val": "entregado"
         }
        ],
        "sel": [
         "c.nombre",
         "p.id_pedido",
         "p.estado"
        ],
        "orden": [
         "nombre"
        ],
        "porque": [
         "((clientes|Andrea)) y ((clientes|Diego)) se unieron con `NULL`, pero `NULL = 'entregado'` no es verdadero: el `WHERE` los elimina.",
         "El `LEFT JOIN` ya no conserva a todos los clientes: el filtro de la derecha en el `WHERE` lo ha convertido en `INNER JOIN`."
        ]
       }
      },
      {
       "join": {
        "n": "6",
        "titulo": "La solución: el filtro en el ON",
        "idea": "Si el filtro va en el `ON`, se aplica **antes** de unir y los clientes sin pareja se conservan.",
        "tablas": [
         {
          "t": "clientes",
          "a": "c",
          "cols": [
           "id_cliente",
           "nombre"
          ]
         },
         {
          "t": "pedidos",
          "a": "p",
          "cols": [
           "id_pedido",
           "id_cliente",
           "estado"
          ]
         }
        ],
        "joins": [
         {
          "tipo": "left",
          "on": [
           "p.id_cliente",
           "c.id_cliente"
          ],
          "extra": {
           "col": "p.estado",
           "op": "=",
           "val": "entregado"
          }
         }
        ],
        "sel": [
         "c.nombre",
         "p.id_pedido",
         "p.estado"
        ],
        "orden": [
         "nombre"
        ],
        "maxFilas": 12,
        "porque": [
         "Solo los ((pedidos|pedidos)) entregados forman pareja. Los demás (✕) no se unen a nadie.",
         "((clientes|Javier)) y ((clientes|Pablo)) no tienen ningún pedido entregado: salen igualmente, con `NULL` (∅).",
         "Regla: la condición sobre la tabla **izquierda** va en el `WHERE`; la condición sobre la tabla **derecha**, si quieres conservar las filas sin pareja, va en el `ON`."
        ]
       }
      }
     ]
    },
    {
     "id": "join-right",
     "titulo": "RIGHT JOIN",
     "bloques": [
      {
       "join": {
        "n": "7",
        "titulo": "Todos los empleados, con los pedidos que han gestionado",
        "idea": "`RIGHT JOIN`: sale **todo lo de la derecha** (la tabla que va después del `JOIN`).",
        "tablas": [
         {
          "t": "pedidos",
          "a": "p",
          "cols": [
           "id_pedido",
           "id_empleado",
           "estado"
          ]
         },
         {
          "t": "empleados",
          "a": "e",
          "cols": [
           "id_empleado",
           "nombre"
          ]
         }
        ],
        "joins": [
         {
          "tipo": "right",
          "on": [
           "p.id_empleado",
           "e.id_empleado"
          ]
         }
        ],
        "sel": [
         {
          "col": "e.nombre",
          "as": "empleado"
         },
         "p.id_pedido",
         "p.estado"
        ],
        "orden": [
         "empleado",
         "id_pedido"
        ],
        "maxFilas": 14,
        "porque": [
         "La tabla de la izquierda es ((pedidos|pedidos)) y la de la derecha, ((empleados|empleados)). Se conservan todos los empleados.",
         "((empleados|Carmen Rojas)), ((empleados|Tomás Vidal)) y ((empleados|Rosa Gil)) no han gestionado ningún pedido: salen con `NULL` (∅).",
         "Los pedidos 6 y 9 no tienen empleado (`id_empleado` es `NULL`). Son de la izquierda y no tienen pareja: en un `RIGHT JOIN` no salen (✕)."
        ]
       }
      },
      {
       "join": {
        "n": "8",
        "titulo": "El mismo resultado con un LEFT JOIN",
        "idea": "Un `RIGHT JOIN` siempre se puede escribir como `LEFT JOIN` cambiando el orden de las tablas. Por eso casi nadie usa `RIGHT`.",
        "tablas": [
         {
          "t": "empleados",
          "a": "e",
          "cols": [
           "id_empleado",
           "nombre"
          ]
         },
         {
          "t": "pedidos",
          "a": "p",
          "cols": [
           "id_pedido",
           "id_empleado",
           "estado"
          ]
         }
        ],
        "joins": [
         {
          "tipo": "left",
          "on": [
           "p.id_empleado",
           "e.id_empleado"
          ]
         }
        ],
        "sel": [
         {
          "col": "e.nombre",
          "as": "empleado"
         },
         "p.id_pedido",
         "p.estado"
        ],
        "orden": [
         "empleado",
         "id_pedido"
        ],
        "maxFilas": 14,
        "porque": [
         "((empleados|empleados)) pasa al `FROM` y ((pedidos|pedidos)) al `JOIN`. Ahora la tabla de la que quieres **todo** está a la izquierda.",
         "Las filas del resultado son las mismas que en el ejemplo 7. Solo cambia el dibujo: la tabla \"que lo conserva todo\" ahora está a la izquierda."
        ]
       }
      }
     ]
    },
    {
     "id": "join-full",
     "titulo": "FULL JOIN",
     "bloques": [
      {
       "join": {
        "n": "9",
        "titulo": "Pedidos y empleados, aunque no tengan pareja",
        "idea": "`FULL JOIN`: sale todo de **las dos** tablas. El lado que no tiene pareja sale a `NULL`.",
        "tablas": [
         {
          "t": "pedidos",
          "a": "p",
          "cols": [
           "id_pedido",
           "id_empleado",
           "estado"
          ]
         },
         {
          "t": "empleados",
          "a": "e",
          "cols": [
           "id_empleado",
           "nombre"
          ]
         }
        ],
        "joins": [
         {
          "tipo": "full",
          "on": [
           "p.id_empleado",
           "e.id_empleado"
          ]
         }
        ],
        "sel": [
         "p.id_pedido",
         {
          "col": "e.nombre",
          "as": "empleado"
         }
        ],
        "orden": [
         "id_pedido",
         "empleado"
        ],
        "maxFilas": 16,
        "porque": [
         "Es la suma de un `LEFT JOIN` y un `RIGHT JOIN`: se conservan las filas sin pareja de **los dos** lados (∅).",
         "Los pedidos 6 y 9 salen con `empleado` a `NULL`; ((empleados|Carmen Rojas)), ((empleados|Tomás Vidal)) y ((empleados|Rosa Gil)) salen con `id_pedido` a `NULL`.",
         "Sirve para comparar dos listados y ver qué falta en cada uno."
        ]
       }
      }
     ]
    },
    {
     "id": "join-cross",
     "titulo": "CROSS JOIN",
     "bloques": [
      {
       "join": {
        "n": "10",
        "titulo": "Todas las combinaciones de empleado y categoría",
        "idea": "`CROSS JOIN`: sin `ON`. Cada fila de una tabla se une con **todas** las de la otra (A × B). El `WHERE` reduce el ejemplo para que quepa en el dibujo: sin él serían 5 × 5 = 25 filas.",
        "tablas": [
         {
          "t": "empleados",
          "a": "e",
          "cols": [
           "id_empleado",
           "nombre"
          ]
         },
         {
          "t": "categorias",
          "a": "cat",
          "cols": [
           "id_categoria",
           "nombre"
          ]
         }
        ],
        "joins": [
         {
          "tipo": "cross"
         }
        ],
        "where": [
         {
          "col": "e.id_empleado",
          "op": "<=",
          "val": 2
         },
         {
          "col": "cat.id_categoria",
          "op": "<=",
          "val": 3
         }
        ],
        "soloUsadas": true,
        "sel": [
         {
          "col": "e.nombre",
          "as": "empleado"
         },
         {
          "col": "cat.nombre",
          "as": "categoria"
         }
        ],
        "porque": [
         "No hay condición de unión: toda fila de ((empleados|empleados)) se empareja con toda fila de ((categorias|categorias)).",
         "Si olvidas el `ON` de un `JOIN` normal obtienes esto sin querer: el resultado se multiplica y los totales salen inflados."
        ]
       }
      }
     ]
    },
    {
     "id": "join-huerfanos",
     "titulo": "Buscar \"huérfanos\": filas SIN pareja",
     "bloques": [
      {
       "p": "Patrón: `LEFT JOIN` + `WHERE derecha.pk IS NULL`. Se unen todos y se quedan solo los que no encontraron pareja."
      },
      {
       "join": {
        "n": "11",
        "titulo": "Clientes que nunca han hecho un pedido",
        "idea": "Con el `LEFT JOIN`, las filas sin pareja son las únicas que tienen `NULL` en la clave de la derecha.",
        "tablas": [
         {
          "t": "clientes",
          "a": "c",
          "cols": [
           "id_cliente",
           "nombre"
          ]
         },
         {
          "t": "pedidos",
          "a": "p",
          "cols": [
           "id_pedido",
           "id_cliente",
           "estado"
          ]
         }
        ],
        "joins": [
         {
          "tipo": "left",
          "on": [
           "p.id_cliente",
           "c.id_cliente"
          ]
         }
        ],
        "where": [
         {
          "col": "p.id_pedido",
          "op": "is null"
         }
        ],
        "sel": [
         "c.id_cliente",
         "c.nombre"
        ],
        "orden": [
         "id_cliente"
        ],
        "porque": [
         "El `LEFT JOIN` conserva a todos los clientes. Los que tienen pedido llevan un `id_pedido`; los que no, `NULL` (∅).",
         "`where p.id_pedido is null` se queda solo con ((clientes|Andrea)) y ((clientes|Diego)). El resto (✕) tiene pareja.",
         "Se usa la **PK** de la tabla derecha porque nunca vale `NULL` si la fila existe: si es `NULL`, es que no hubo pareja."
        ]
       }
      },
      {
       "join": {
        "n": "12",
        "titulo": "Categorías sin productos",
        "idea": "El mismo patrón con otra pareja de tablas.",
        "tablas": [
         {
          "t": "categorias",
          "a": "cat",
          "cols": [
           "id_categoria",
           "nombre"
          ]
         },
         {
          "t": "productos",
          "a": "pr",
          "cols": [
           "id_producto",
           "id_categoria",
           "nombre"
          ]
         }
        ],
        "joins": [
         {
          "tipo": "left",
          "on": [
           "pr.id_categoria",
           "cat.id_categoria"
          ]
         }
        ],
        "where": [
         {
          "col": "pr.id_producto",
          "op": "is null"
         }
        ],
        "sel": [
         "cat.nombre"
        ],
        "porque": [
         "Todas las categorías tienen productos menos ((categorias|Gaming)): su fila se une con `NULL` (∅).",
         "Es la pregunta \"¿qué hay en A que no esté en B?\" y se resuelve siempre igual."
        ]
       }
      }
     ]
    },
    {
     "id": "join-varias",
     "titulo": "Varias tablas (cruzar una N:M)",
     "bloques": [
      {
       "p": "Para ir de `pedidos` a `productos` hay que pasar por la tabla intermedia `lineas_pedido`. Cada `JOIN` se une a la tabla anterior; las flechas se numeran en el orden en que se ejecutan."
      },
      {
       "join": {
        "n": "13",
        "titulo": "Qué productos lleva cada pedido (pedidos 1 y 8)",
        "idea": "Con `N` tablas hacen falta `N - 1` condiciones de unión.",
        "tablas": [
         {
          "t": "pedidos",
          "a": "p",
          "cols": [
           "id_pedido",
           "estado"
          ]
         },
         {
          "t": "lineas_pedido",
          "a": "l",
          "cols": [
           "id_pedido",
           "id_producto",
           "cantidad",
           "subtotal"
          ]
         },
         {
          "t": "productos",
          "a": "pr",
          "cols": [
           "id_producto",
           "nombre"
          ]
         }
        ],
        "joins": [
         {
          "tipo": "inner",
          "on": [
           "l.id_pedido",
           "p.id_pedido"
          ]
         },
         {
          "tipo": "inner",
          "on": [
           "pr.id_producto",
           "l.id_producto"
          ]
         }
        ],
        "where": [
         {
          "col": "p.id_pedido",
          "op": "in",
          "val": [
           1,
           8
          ]
         }
        ],
        "soloUsadas": true,
        "sel": [
         "p.id_pedido",
         {
          "col": "pr.nombre",
          "as": "producto"
         },
         "l.cantidad",
         "l.subtotal"
        ],
        "orden": [
         "id_pedido",
         "subtotal desc"
        ],
        "porque": [
         "((pedidos|pedidos)) se une con ((lineas_pedido|lineas_pedido)) por `id_pedido` (flecha 1), y ((lineas_pedido|lineas_pedido)) con ((productos|productos)) por `id_producto` (flecha 2).",
         "((lineas_pedido|lineas_pedido)) es la **tabla intermedia** de la relación N:M: guarda una FK a cada lado.",
         "Cada línea es una fila del resultado: el pedido 1 tiene 2 líneas y el 8, 3. Por eso el número de pedido se repite."
        ]
       }
      },
      {
       "nota": "Con `N` tablas necesitas `N - 1` condiciones de unión. Si te falta alguna, el resultado se multiplica (producto cartesiano) y los totales salen inflados.",
       "tipo": "tip"
      }
     ]
    },
    {
     "id": "join-self",
     "titulo": "Self join: una tabla consigo misma",
     "bloques": [
      {
       "p": "Para relaciones **reflexivas**: la misma tabla con dos alias distintos. Aquí `empleados` aparece como `e` (el empleado) y como `j` (su jefe)."
      },
      {
       "join": {
        "n": "14",
        "titulo": "Cada empleado con el nombre de su jefe",
        "idea": "Es la misma tabla dos veces: el `ON` une la FK `id_jefe` de `e` con la PK `id_empleado` de `j`.",
        "tablas": [
         {
          "t": "empleados",
          "a": "e",
          "cols": [
           "id_empleado",
           "nombre",
           "id_jefe"
          ]
         },
         {
          "t": "empleados",
          "a": "j",
          "cols": [
           "id_empleado",
           "nombre"
          ]
         }
        ],
        "joins": [
         {
          "tipo": "left",
          "on": [
           "j.id_empleado",
           "e.id_jefe"
          ]
         }
        ],
        "sel": [
         {
          "col": "e.nombre",
          "as": "empleado"
         },
         {
          "expr": "coalesce(j.nombre, '— (sin jefe)')",
          "as": "jefe",
          "t": "j",
          "why": "el nombre del jefe o un texto si no tiene",
          "calc": (g) => g("j", "nombre") ?? "— (sin jefe)"
         }
        ],
        "orden": [
         "empleado"
        ],
        "porque": [
         "Sin alias no se podría distinguir la tabla izquierda de la derecha: ambas se llaman ((empleados|empleados)).",
         "((empleados|Carmen Rojas)) es la directora: su `id_jefe` es `NULL` y no encuentra pareja. Por eso hace falta `LEFT JOIN` (∅).",
         "`coalesce(j.nombre, '— (sin jefe)')` sustituye el `NULL` por un texto legible."
        ]
       }
      }
     ]
    },
    {
     "id": "join-elegir",
     "titulo": "¿Cuál elijo?",
     "bloques": [
      {
       "tabla": {
        "cabs": [
         "Necesito…",
         "JOIN"
        ],
        "filas": [
         [
          "Datos que **sí** están relacionados (pedidos con su cliente)",
          "`INNER JOIN`"
         ],
         [
          "**Todos** los de una tabla, aunque no tengan relación (clientes y sus pedidos, si tienen)",
          "`LEFT JOIN`"
         ],
         [
          "Los que **no** tienen relación (clientes sin pedidos)",
          "`LEFT JOIN` + `WHERE … IS NULL` (o `NOT EXISTS`, [MOD.13](@sub-in-exists))"
         ],
         [
          "Contar relacionados incluyendo los ceros",
          "`LEFT JOIN` + `COUNT(columna_derecha)`"
         ],
         [
          "Una tabla relacionada consigo misma (jefe, categoría padre)",
          "Self join con dos alias"
         ],
         [
          "Todas las combinaciones posibles",
          "`CROSS JOIN`"
         ]
        ]
       }
      },
      {
       "nota": "Antes de elegir, dibuja las dos tablas y pregúntate **qué quieres hacer con las filas sin pareja**: quitarlas (`INNER`), conservarlas de un lado (`LEFT` / `RIGHT`) o conservarlas de los dos (`FULL`).",
       "tipo": "tip"
      }
     ]
    }
   ]
  } } });
})();

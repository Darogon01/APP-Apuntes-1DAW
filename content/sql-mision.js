/* Misiones de consultas: ejercicios guiados con solución explicada (color por tabla). */
(function () {
  APP.register({ slug: "sql", contenido: { "mod-21": {
   "resumen": "SELECT · INNER · LEFT · RIGHT · cálculos",
   "secciones": [
    {
     "id": "ms-intro",
     "titulo": "Cómo funcionan estas misiones",
     "bloques": [
      {
       "p": "Cada ejercicio trae un **enunciado**, una **pista**, un editor para tu intento (ejecuta PostgreSQL de verdad) y una **solución desplegable** explicada con el mismo sistema de colores que el módulo de JOIN: un color por tabla, el `ON` sombreado y el resultado calculado."
      },
      {
       "lista": [
        "**A · SELECT simples**: una tabla (`WHERE`, `ORDER BY`, `LIMIT`, `IN`, `LIKE`, `IS NULL`).",
        "**B · INNER JOIN**: dos tablas, solo filas con pareja.",
        "**C · LEFT JOIN**: todo lo de la izquierda; contar con ceros y buscar huérfanos.",
        "**D · RIGHT JOIN**: lo mismo con las tablas al revés.",
        "**E · Cálculos**: operadores aritméticos y funciones de texto, número, fecha y agregadas."
       ]
      },
      {
       "join": "leyenda"
      },
      {
       "sub": "Practicar ejercicios de SQL: select, where, join, inner join, left join, right join, operadores, funciones, calcular, redondear, count, sum, avg."
      }
     ]
    },
    {
     "id": "ms-a",
     "titulo": "A · SELECT simples",
     "bloques": [
      {
       "p": "Una sola tabla. Practicas `WHERE`, `ORDER BY`, `LIMIT`, `IN`, `LIKE` e `IS NULL`. Intenta cada ejercicio en el editor y abre la solución solo para comprobar."
      },
      {
       "h4": "A1"
      },
      {
       "p": "Nombre y ciudad de los clientes que viven en Madrid."
      },
      {
       "nota": "**Pista:** Filtra con `WHERE` por la columna `ciudad`; el texto va entre comillas simples.",
       "tipo": "tip"
      },
      {
       "live": {
        "titulo": "Tu intento",
        "sql": "-- clientes (id_cliente, nombre, apellidos, email, ciudad, telefono, fecha_registro)\n\nSELECT "
       }
      },
      {
       "details": {
        "titulo": "Ver solución y explicación",
        "bloques": [
         {
          "join": {
           "tablas": [
            {
             "t": "clientes",
             "a": "c",
             "cols": [
              "id_cliente",
              "nombre",
              "ciudad"
             ]
            }
           ],
           "where": [
            {
             "col": "c.ciudad",
             "op": "=",
             "val": "Madrid"
            }
           ],
           "sel": [
            "c.nombre",
            "c.ciudad"
           ],
           "idea": "Una sola tabla: el `WHERE` quita las filas que no cumplen la condición (✕).",
           "porque": [
            "Se leen todas las filas de ((clientes|clientes)) y solo pasan las que tienen `ciudad = 'Madrid'`.",
            "Las filas con `ciudad` a `NULL` (como Andrea) tampoco pasan: `NULL = 'Madrid'` no es verdadero."
           ],
           "n": "A1",
           "titulo": "Nombre y ciudad de los clientes que viven en Madrid."
          }
         }
        ]
       }
      },
      {
       "h4": "A2"
      },
      {
       "p": "Nombre y precio de los productos activos que cuestan menos de 100 €, del más barato al más caro."
      },
      {
       "nota": "**Pista:** Dos condiciones unidas con `AND`; `activo` ya es un booleano. Ordena con `ORDER BY`.",
       "tipo": "tip"
      },
      {
       "live": {
        "titulo": "Tu intento",
        "sql": "-- productos (id_producto, id_categoria, nombre, precio, stock, activo, fecha_alta)\n\nSELECT "
       }
      },
      {
       "details": {
        "titulo": "Ver solución y explicación",
        "bloques": [
         {
          "join": {
           "tablas": [
            {
             "t": "productos",
             "a": "pr",
             "cols": [
              "id_producto",
              "nombre",
              "precio",
              "activo"
             ]
            }
           ],
           "where": [
            {
             "col": "pr.activo",
             "op": "=",
             "val": true
            },
            {
             "col": "pr.precio",
             "op": "<",
             "val": 100
            }
           ],
           "sel": [
            "pr.nombre",
            "pr.precio"
           ],
           "orden": [
            "precio"
           ],
           "idea": "Dos condiciones con `AND`: la fila tiene que cumplir las dos.",
           "porque": [
            "((productos|Cafetera espresso)) está desactivada (`activo` es false) y ((productos|Portátil Lenovo IdeaPad 5)) cuesta más de 100: las dos quedan fuera (✕).",
            "`order by precio` ordena el resultado de menor a mayor; para al revés, `precio desc`."
           ],
           "n": "A2",
           "titulo": "Nombre y precio de los productos activos que cuestan menos de 100 €, del más barato al más caro."
          }
         }
        ]
       }
      },
      {
       "h4": "A3"
      },
      {
       "p": "Nombre y email de los clientes que no tienen teléfono registrado."
      },
      {
       "nota": "**Pista:** Para comparar con `NULL` no sirve `=`: usa `IS NULL`.",
       "tipo": "tip"
      },
      {
       "live": {
        "titulo": "Tu intento",
        "sql": "-- clientes (id_cliente, nombre, apellidos, email, ciudad, telefono, fecha_registro)\n\nSELECT "
       }
      },
      {
       "details": {
        "titulo": "Ver solución y explicación",
        "bloques": [
         {
          "join": {
           "tablas": [
            {
             "t": "clientes",
             "a": "c",
             "cols": [
              "id_cliente",
              "nombre",
              "email",
              "telefono"
             ]
            }
           ],
           "where": [
            {
             "col": "c.telefono",
             "op": "is null"
            }
           ],
           "sel": [
            "c.nombre",
            "c.email"
           ],
           "idea": "`NULL` significa \"sin valor\": se pregunta con `IS NULL`, nunca con `= NULL`.",
           "porque": [
            "`telefono = NULL` nunca es verdadero, ni siquiera para las filas con `NULL`. Por eso existe `IS NULL`.",
            "Salen ((clientes|Marcos)), ((clientes|Sara)) y ((clientes|Andrea)): los tres sin teléfono (∅ en la columna)."
           ],
           "n": "A3",
           "titulo": "Nombre y email de los clientes que no tienen teléfono registrado."
          }
         }
        ]
       }
      },
      {
       "h4": "A4"
      },
      {
       "p": "Nombre y precio de los 3 productos más caros."
      },
      {
       "nota": "**Pista:** Ordena de mayor a menor (`DESC`) y limita el número de filas con `LIMIT`.",
       "tipo": "tip"
      },
      {
       "live": {
        "titulo": "Tu intento",
        "sql": "-- productos (id_producto, id_categoria, nombre, precio, stock, activo, fecha_alta)\n\nSELECT "
       }
      },
      {
       "details": {
        "titulo": "Ver solución y explicación",
        "bloques": [
         {
          "join": {
           "tablas": [
            {
             "t": "productos",
             "a": "pr",
             "cols": [
              "id_producto",
              "nombre",
              "precio"
             ]
            }
           ],
           "sel": [
            "pr.nombre",
            "pr.precio"
           ],
           "orden": [
            "precio desc"
           ],
           "limite": 3,
           "idea": "`ORDER BY … DESC` + `LIMIT n` = los `n` primeros del ranking.",
           "porque": [
            "Sin `ORDER BY`, `LIMIT` devolvería 3 filas cualesquiera: el orden es lo que da sentido al \"más caros\".",
            "Se ordenan las 12 filas de ((productos|productos)) y se queda con las 3 primeras."
           ],
           "n": "A4",
           "titulo": "Nombre y precio de los 3 productos más caros."
          }
         }
        ]
       }
      },
      {
       "h4": "A5"
      },
      {
       "p": "Id y estado de los pedidos que todavía no han llegado (pendientes o enviados)."
      },
      {
       "nota": "**Pista:** Con varios valores posibles, `IN ('a', 'b')` es más corto que dos `OR`.",
       "tipo": "tip"
      },
      {
       "live": {
        "titulo": "Tu intento",
        "sql": "-- pedidos (id_pedido, id_cliente, id_empleado, fecha, estado, gastos_envio)\n\nSELECT "
       }
      },
      {
       "details": {
        "titulo": "Ver solución y explicación",
        "bloques": [
         {
          "join": {
           "tablas": [
            {
             "t": "pedidos",
             "a": "p",
             "cols": [
              "id_pedido",
              "estado"
             ]
            }
           ],
           "where": [
            {
             "col": "p.estado",
             "op": "in",
             "val": [
              "pendiente",
              "enviado"
             ]
            }
           ],
           "sel": [
            "p.id_pedido",
            "p.estado"
           ],
           "orden": [
            "id_pedido"
           ],
           "idea": "`IN (…)` equivale a varias comparaciones `=` unidas con `OR`.",
           "porque": [
            "`estado in ('pendiente', 'enviado')` es lo mismo que `estado = 'pendiente' or estado = 'enviado'`.",
            "Los pedidos entregados y el cancelado quedan fuera (✕)."
           ],
           "n": "A5",
           "titulo": "Id y estado de los pedidos que todavía no han llegado (pendientes o enviados)."
          }
         }
        ]
       }
      },
      {
       "h4": "A6"
      },
      {
       "p": "Nombre y precio de los productos cuyo nombre contiene \"USB\"."
      },
      {
       "nota": "**Pista:** `LIKE` con el comodín `%` (cualquier cantidad de caracteres) delante y detrás.",
       "tipo": "tip"
      },
      {
       "live": {
        "titulo": "Tu intento",
        "sql": "-- productos (id_producto, id_categoria, nombre, precio, stock, activo, fecha_alta)\n\nSELECT "
       }
      },
      {
       "details": {
        "titulo": "Ver solución y explicación",
        "bloques": [
         {
          "join": {
           "tablas": [
            {
             "t": "productos",
             "a": "pr",
             "cols": [
              "id_producto",
              "nombre",
              "precio"
             ]
            }
           ],
           "where": [
            {
             "col": "pr.nombre",
             "op": "like",
             "val": "%USB%"
            }
           ],
           "sel": [
            "pr.nombre",
            "pr.precio"
           ],
           "idea": "`%` representa cualquier texto: `'%USB%'` significa \"contiene USB\".",
           "porque": [
            "`like '%USB%'` acepta cualquier texto antes y después de `USB`.",
            "`LIKE` distingue mayúsculas de minúsculas; para ignorarlas, `ILIKE`."
           ],
           "n": "A6",
           "titulo": "Nombre y precio de los productos cuyo nombre contiene \"USB\"."
          }
         }
        ]
       }
      }
     ]
    },
    {
     "id": "ms-b",
     "titulo": "B · JOIN simple (INNER)",
     "bloques": [
      {
       "p": "Dos tablas unidas con `INNER JOIN`. Cada ejercicio parte de una FK y una PK: dibújalas antes de escribir el `ON`."
      },
      {
       "h4": "B1"
      },
      {
       "p": "Nombre de cada producto junto con el nombre de su categoría."
      },
      {
       "nota": "**Pista:** Une `productos` con `categorias` por la columna `id_categoria`.",
       "tipo": "tip"
      },
      {
       "live": {
        "titulo": "Tu intento",
        "sql": "-- productos (id_producto, id_categoria, nombre, precio, stock, activo, fecha_alta)\n-- categorias (id_categoria, nombre)\n\nSELECT "
       }
      },
      {
       "details": {
        "titulo": "Ver solución y explicación",
        "bloques": [
         {
          "join": {
           "tablas": [
            {
             "t": "productos",
             "a": "pr",
             "cols": [
              "id_producto",
              "id_categoria",
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
             "tipo": "inner",
             "on": [
              "cat.id_categoria",
              "pr.id_categoria"
             ]
            }
           ],
           "sel": [
            {
             "col": "pr.nombre",
             "as": "producto"
            },
            {
             "col": "cat.nombre",
             "as": "categoria"
            }
           ],
           "orden": [
            "categoria",
            "producto"
           ],
           "maxFilas": 12,
           "idea": "La FK `id_categoria` de ((productos|productos)) apunta a la PK `id_categoria` de ((categorias|categorias)).",
           "porque": [
            "Cada producto tiene una única categoría, así que salen 12 filas, una por producto.",
            "((categorias|Gaming)) no tiene productos: sin pareja no sale en un `INNER JOIN`. Está sin dibujar fila porque no se ha usado."
           ],
           "n": "B1",
           "titulo": "Nombre de cada producto junto con el nombre de su categoría."
          }
         }
        ]
       }
      },
      {
       "h4": "B2"
      },
      {
       "p": "Id, estado y nombre del empleado que gestionó cada pedido."
      },
      {
       "nota": "**Pista:** Une `pedidos` con `empleados` por `id_empleado`.",
       "tipo": "tip"
      },
      {
       "live": {
        "titulo": "Tu intento",
        "sql": "-- pedidos (id_pedido, id_cliente, id_empleado, fecha, estado, gastos_envio)\n-- empleados (id_empleado, nombre, puesto, id_jefe, salario, fecha_contrato)\n\nSELECT "
       }
      },
      {
       "details": {
        "titulo": "Ver solución y explicación",
        "bloques": [
         {
          "join": {
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
             "tipo": "inner",
             "on": [
              "e.id_empleado",
              "p.id_empleado"
             ]
            }
           ],
           "sel": [
            "p.id_pedido",
            "p.estado",
            {
             "col": "e.nombre",
             "as": "empleado"
            }
           ],
           "orden": [
            "id_pedido"
           ],
           "idea": "`INNER JOIN` descarta las filas sin pareja: aquí, los pedidos sin empleado.",
           "porque": [
            "Los pedidos 6 y 9 tienen `id_empleado` a `NULL`: no hay pareja y no salen (✕).",
            "((empleados|Carmen Rojas)), ((empleados|Tomás Vidal)) y ((empleados|Rosa Gil)) no gestionan ningún pedido: tampoco aparecen."
           ],
           "n": "B2",
           "titulo": "Id, estado y nombre del empleado que gestionó cada pedido."
          }
         }
        ]
       }
      },
      {
       "h4": "B3"
      },
      {
       "p": "Nombre y precio de los productos de la categoría Audio, del más caro al más barato."
      },
      {
       "nota": "**Pista:** Une con `categorias` y filtra por el **nombre** de la categoría.",
       "tipo": "tip"
      },
      {
       "live": {
        "titulo": "Tu intento",
        "sql": "-- productos (id_producto, id_categoria, nombre, precio, stock, activo, fecha_alta)\n-- categorias (id_categoria, nombre)\n\nSELECT "
       }
      },
      {
       "details": {
        "titulo": "Ver solución y explicación",
        "bloques": [
         {
          "join": {
           "tablas": [
            {
             "t": "productos",
             "a": "pr",
             "cols": [
              "id_producto",
              "id_categoria",
              "nombre",
              "precio"
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
             "tipo": "inner",
             "on": [
              "cat.id_categoria",
              "pr.id_categoria"
             ]
            }
           ],
           "where": [
            {
             "col": "cat.nombre",
             "op": "=",
             "val": "Audio"
            }
           ],
           "sel": [
            "pr.nombre",
            "pr.precio"
           ],
           "orden": [
            "precio desc"
           ],
           "idea": "El `JOIN` permite filtrar por una columna de la otra tabla (el nombre de la categoría).",
           "porque": [
            "Primero se unen todos los productos con su categoría; después el `WHERE` deja solo los de ((categorias|Audio)).",
            "Sin el `JOIN` habría que saber de memoria que Audio es la categoría 3."
           ],
           "n": "B3",
           "titulo": "Nombre y precio de los productos de la categoría Audio, del más caro al más barato."
          }
         }
        ]
       }
      },
      {
       "h4": "B4"
      },
      {
       "p": "Nombre de cada cliente y id de sus pedidos pendientes."
      },
      {
       "nota": "**Pista:** Une `clientes` con `pedidos` y filtra por `estado`.",
       "tipo": "tip"
      },
      {
       "live": {
        "titulo": "Tu intento",
        "sql": "-- clientes (id_cliente, nombre, apellidos, email, ciudad, telefono, fecha_registro)\n-- pedidos (id_pedido, id_cliente, id_empleado, fecha, estado, gastos_envio)\n\nSELECT "
       }
      },
      {
       "details": {
        "titulo": "Ver solución y explicación",
        "bloques": [
         {
          "join": {
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
             "val": "pendiente"
            }
           ],
           "sel": [
            "c.nombre",
            "p.id_pedido"
           ],
           "orden": [
            "id_pedido"
           ],
           "idea": "La condición del `WHERE` es sobre la tabla de la derecha: en un `INNER JOIN` da igual dónde se ponga.",
           "porque": [
            "Solo los pedidos 9 y 10 están pendientes; sus clientes son ((clientes|Lucía)) y ((clientes|Marcos)).",
            "El resto de clientes y pedidos quedan fuera (✕)."
           ],
           "n": "B4",
           "titulo": "Nombre de cada cliente y id de sus pedidos pendientes."
          }
         }
        ]
       }
      },
      {
       "h4": "B5"
      },
      {
       "p": "Producto, cantidad y subtotal de cada línea del pedido 4."
      },
      {
       "nota": "**Pista:** Une `lineas_pedido` con `productos` y filtra por `id_pedido`.",
       "tipo": "tip"
      },
      {
       "live": {
        "titulo": "Tu intento",
        "sql": "-- lineas_pedido (id_pedido, id_producto, cantidad, precio_unitario, subtotal)\n-- productos (id_producto, id_categoria, nombre, precio, stock, activo, fecha_alta)\n\nSELECT "
       }
      },
      {
       "details": {
        "titulo": "Ver solución y explicación",
        "bloques": [
         {
          "join": {
           "tablas": [
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
              "pr.id_producto",
              "l.id_producto"
             ]
            }
           ],
           "where": [
            {
             "col": "l.id_pedido",
             "op": "=",
             "val": 4
            }
           ],
           "soloUsadas": true,
           "sel": [
            {
             "col": "pr.nombre",
             "as": "producto"
            },
            "l.cantidad",
            "l.subtotal"
           ],
           "orden": [
            "subtotal desc"
           ],
           "idea": "`lineas_pedido` solo guarda ids; el nombre del producto está en `productos`.",
           "porque": [
            "((lineas_pedido|lineas_pedido)) guarda `id_producto`, no el nombre: el `JOIN` lo trae de ((productos|productos)).",
            "El pedido 4 tiene 2 líneas: 2 monitores y 1 ratón."
           ],
           "n": "B5",
           "titulo": "Producto, cantidad y subtotal de cada línea del pedido 4."
          }
         }
        ]
       }
      }
     ]
    },
    {
     "id": "ms-c",
     "titulo": "C · LEFT JOIN",
     "bloques": [
      {
       "p": "Todo lo de la tabla izquierda, tenga pareja o no. Practicas contar con ceros y buscar filas sin pareja."
      },
      {
       "h4": "C1"
      },
      {
       "p": "Nombre de cada categoría y número de productos que tiene (también las que tienen 0)."
      },
      {
       "nota": "**Pista:** `LEFT JOIN` desde `categorias`, `count` sobre una columna de `productos` y `GROUP BY`.",
       "tipo": "tip"
      },
      {
       "live": {
        "titulo": "Tu intento",
        "sql": "-- categorias (id_categoria, nombre)\n-- productos (id_producto, id_categoria, nombre, precio, stock, activo, fecha_alta)\n\nSELECT "
       }
      },
      {
       "details": {
        "titulo": "Ver solución y explicación",
        "bloques": [
         {
          "join": {
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
           "sel": [
            {
             "col": "cat.nombre",
             "as": "categoria"
            },
            {
             "agg": "count",
             "col": "pr.id_producto",
             "as": "productos"
            }
           ],
           "orden": [
            "productos desc",
            "categoria"
           ],
           "idea": "`LEFT JOIN` + `count(columna_de_la_derecha)`: las filas sin pareja cuentan 0.",
           "porque": [
            "((categorias|Gaming)) no tiene productos: sale con `NULL` (∅) y `count(pr.id_producto)` ignora los `NULL`: 0.",
            "Con `count(*)` saldría 1, porque cuenta la fila con `NULL`."
           ],
           "n": "C1",
           "titulo": "Nombre de cada categoría y número de productos que tiene (también las que tienen 0)."
          }
         }
        ]
       }
      },
      {
       "h4": "C2"
      },
      {
       "p": "Nombre y puesto de los empleados que no han gestionado ningún pedido."
      },
      {
       "nota": "**Pista:** `LEFT JOIN` y quédate con las filas donde la PK de `pedidos` es `NULL`.",
       "tipo": "tip"
      },
      {
       "live": {
        "titulo": "Tu intento",
        "sql": "-- empleados (id_empleado, nombre, puesto, id_jefe, salario, fecha_contrato)\n-- pedidos (id_pedido, id_cliente, id_empleado, fecha, estado, gastos_envio)\n\nSELECT "
       }
      },
      {
       "details": {
        "titulo": "Ver solución y explicación",
        "bloques": [
         {
          "join": {
           "tablas": [
            {
             "t": "empleados",
             "a": "e",
             "cols": [
              "id_empleado",
              "nombre",
              "puesto"
             ]
            },
            {
             "t": "pedidos",
             "a": "p",
             "cols": [
              "id_pedido",
              "id_empleado"
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
           "where": [
            {
             "col": "p.id_pedido",
             "op": "is null"
            }
           ],
           "sel": [
            "e.nombre",
            "e.puesto"
           ],
           "orden": [
            "nombre"
           ],
           "idea": "Patrón del huérfano: `LEFT JOIN` + `WHERE derecha.pk IS NULL`.",
           "porque": [
            "Los empleados con pedidos tienen `id_pedido`; los que no, `NULL` (∅). El `WHERE` se queda con los segundos.",
            "Salen ((empleados|Carmen Rojas)), ((empleados|Rosa Gil)) y ((empleados|Tomás Vidal))."
           ],
           "n": "C2",
           "titulo": "Nombre y puesto de los empleados que no han gestionado ningún pedido."
          }
         }
        ]
       }
      },
      {
       "h4": "C3"
      },
      {
       "p": "Id y nombre de los productos que nunca se han vendido."
      },
      {
       "nota": "**Pista:** El mismo patrón: `LEFT JOIN` con `lineas_pedido` y `IS NULL`.",
       "tipo": "tip"
      },
      {
       "live": {
        "titulo": "Tu intento",
        "sql": "-- productos (id_producto, id_categoria, nombre, precio, stock, activo, fecha_alta)\n-- lineas_pedido (id_pedido, id_producto, cantidad, precio_unitario, subtotal)\n\nSELECT "
       }
      },
      {
       "details": {
        "titulo": "Ver solución y explicación",
        "bloques": [
         {
          "join": {
           "tablas": [
            {
             "t": "productos",
             "a": "pr",
             "cols": [
              "id_producto",
              "nombre"
             ]
            },
            {
             "t": "lineas_pedido",
             "a": "l",
             "cols": [
              "id_pedido",
              "id_producto",
              "cantidad"
             ]
            }
           ],
           "joins": [
            {
             "tipo": "left",
             "on": [
              "l.id_producto",
              "pr.id_producto"
             ]
            }
           ],
           "where": [
            {
             "col": "l.id_pedido",
             "op": "is null"
            }
           ],
           "sel": [
            "pr.id_producto",
            "pr.nombre"
           ],
           "orden": [
            "id_producto"
           ],
           "idea": "Misma pregunta que C2 con otras tablas: \"qué hay en A que no esté en B\".",
           "porque": [
            "Los productos 11 y 12 no aparecen en ninguna línea de pedido: su pareja es `NULL` (∅).",
            "Se mira una columna de ((lineas_pedido|lineas_pedido)) que nunca es `NULL` cuando hay pareja (`id_pedido`)."
           ],
           "n": "C3",
           "titulo": "Id y nombre de los productos que nunca se han vendido."
          }
         }
        ]
       }
      },
      {
       "h4": "C4"
      },
      {
       "p": "Nombre de cada empleado y número de pedidos que ha gestionado, del que más al que menos."
      },
      {
       "nota": "**Pista:** `LEFT JOIN` + `count(p.id_pedido)` + `GROUP BY`.",
       "tipo": "tip"
      },
      {
       "live": {
        "titulo": "Tu intento",
        "sql": "-- empleados (id_empleado, nombre, puesto, id_jefe, salario, fecha_contrato)\n-- pedidos (id_pedido, id_cliente, id_empleado, fecha, estado, gastos_envio)\n\nSELECT "
       }
      },
      {
       "details": {
        "titulo": "Ver solución y explicación",
        "bloques": [
         {
          "join": {
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
              "id_empleado"
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
            {
             "agg": "count",
             "col": "p.id_pedido",
             "as": "pedidos"
            }
           ],
           "orden": [
            "pedidos desc",
            "empleado"
           ],
           "idea": "Contar con `LEFT JOIN` muestra también los ceros.",
           "porque": [
            "((empleados|Nuria Pons)) e ((empleados|Iván Lara)) gestionan 4 pedidos cada uno; los otros tres, 0.",
            "Los pedidos 6 y 9 no tienen empleado: no pertenecen a nadie y no cuentan."
           ],
           "n": "C4",
           "titulo": "Nombre de cada empleado y número de pedidos que ha gestionado, del que más al que menos."
          }
         }
        ]
       }
      }
     ]
    },
    {
     "id": "ms-d",
     "titulo": "D · RIGHT JOIN",
     "bloques": [
      {
       "p": "Lo mismo que `LEFT JOIN` con las tablas al revés. Practicas a leerlo y a reescribirlo."
      },
      {
       "h4": "D1"
      },
      {
       "p": "Nombre de cada producto y unidades vendidas en total (los no vendidos, con NULL)."
      },
      {
       "nota": "**Pista:** `RIGHT JOIN`: la tabla que lo conserva todo (`productos`) va a la derecha. Suma `l.cantidad`.",
       "tipo": "tip"
      },
      {
       "live": {
        "titulo": "Tu intento",
        "sql": "-- lineas_pedido (id_pedido, id_producto, cantidad, precio_unitario, subtotal)\n-- productos (id_producto, id_categoria, nombre, precio, stock, activo, fecha_alta)\n\nSELECT "
       }
      },
      {
       "details": {
        "titulo": "Ver solución y explicación",
        "bloques": [
         {
          "join": {
           "tablas": [
            {
             "t": "lineas_pedido",
             "a": "l",
             "cols": [
              "id_pedido",
              "id_producto",
              "cantidad"
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
             "tipo": "right",
             "on": [
              "l.id_producto",
              "pr.id_producto"
             ]
            }
           ],
           "sel": [
            {
             "col": "pr.nombre",
             "as": "producto"
            },
            {
             "agg": "sum",
             "col": "l.cantidad",
             "as": "unidades"
            }
           ],
           "orden": [
            "producto"
           ],
           "maxFilas": 14,
           "idea": "`RIGHT JOIN`: se conservan todos los productos (derecha), se hayan vendido o no.",
           "porque": [
            "((productos|Hub USB-C 7 en 1)) y ((productos|SSD externo 1 TB)) no están en ninguna línea: salen con `unidades` a `NULL`, no a 0.",
            "`sum` de un conjunto vacío es `NULL`. Para mostrar 0 hay que envolverlo: `coalesce(sum(l.cantidad), 0)`."
           ],
           "n": "D1",
           "titulo": "Nombre de cada producto y unidades vendidas en total (los no vendidos, con NULL)."
          }
         }
        ]
       }
      },
      {
       "h4": "D2"
      },
      {
       "p": "Nombre de cada categoría y número de productos, usando un RIGHT JOIN."
      },
      {
       "nota": "**Pista:** Pon `productos` a la izquierda y `categorias` a la derecha.",
       "tipo": "tip"
      },
      {
       "live": {
        "titulo": "Tu intento",
        "sql": "-- productos (id_producto, id_categoria, nombre, precio, stock, activo, fecha_alta)\n-- categorias (id_categoria, nombre)\n\nSELECT "
       }
      },
      {
       "details": {
        "titulo": "Ver solución y explicación",
        "bloques": [
         {
          "join": {
           "tablas": [
            {
             "t": "productos",
             "a": "pr",
             "cols": [
              "id_producto",
              "id_categoria",
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
             "tipo": "right",
             "on": [
              "pr.id_categoria",
              "cat.id_categoria"
             ]
            }
           ],
           "sel": [
            {
             "col": "cat.nombre",
             "as": "categoria"
            },
            {
             "agg": "count",
             "col": "pr.id_producto",
             "as": "productos"
            }
           ],
           "orden": [
            "productos desc",
            "categoria"
           ],
           "idea": "El mismo resultado que C1: un `RIGHT JOIN` es un `LEFT JOIN` con las tablas cambiadas de sitio.",
           "porque": [
            "Lo que cambia es el orden en que se escriben las tablas, no el resultado.",
            "Por claridad se prefiere `LEFT JOIN`: se lee de izquierda a derecha, de lo principal a lo secundario."
           ],
           "n": "D2",
           "titulo": "Nombre de cada categoría y número de productos, usando un RIGHT JOIN."
          }
         }
        ]
       }
      },
      {
       "h4": "D3"
      },
      {
       "p": "Nombre de los clientes que no tienen ningún pedido, usando un RIGHT JOIN."
      },
      {
       "nota": "**Pista:** `pedidos` a la izquierda, `clientes` a la derecha y `IS NULL` sobre la PK de `pedidos`.",
       "tipo": "tip"
      },
      {
       "live": {
        "titulo": "Tu intento",
        "sql": "-- pedidos (id_pedido, id_cliente, id_empleado, fecha, estado, gastos_envio)\n-- clientes (id_cliente, nombre, apellidos, email, ciudad, telefono, fecha_registro)\n\nSELECT "
       }
      },
      {
       "details": {
        "titulo": "Ver solución y explicación",
        "bloques": [
         {
          "join": {
           "tablas": [
            {
             "t": "pedidos",
             "a": "p",
             "cols": [
              "id_pedido",
              "id_cliente"
             ]
            },
            {
             "t": "clientes",
             "a": "c",
             "cols": [
              "id_cliente",
              "nombre"
             ]
            }
           ],
           "joins": [
            {
             "tipo": "right",
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
            "c.nombre"
           ],
           "orden": [
            "nombre"
           ],
           "idea": "El patrón del huérfano con los lados invertidos.",
           "porque": [
            "Se conservan todos los clientes (derecha). Los que no tienen pedido llevan `NULL` en `p.id_pedido` (∅).",
            "Salen ((clientes|Andrea)) y ((clientes|Diego))."
           ],
           "n": "D3",
           "titulo": "Nombre de los clientes que no tienen ningún pedido, usando un RIGHT JOIN."
          }
         }
        ]
       }
      }
     ]
    },
    {
     "id": "ms-e",
     "titulo": "E · Cálculos: operadores y funciones",
     "bloques": [
      {
       "p": "Operadores aritméticos y funciones dentro de la consulta. Ten abierta la [chuleta de cálculos](@ch-aritmeticos) mientras practicas: cada ejercicio usa al menos un operador y una función."
      },
      {
       "h4": "E1"
      },
      {
       "p": "Nombre, precio y precio con IVA (21 %) de los 5 productos activos más caros con IVA."
      },
      {
       "nota": "**Pista:** Multiplica por `1.21` y redondea con `round(…, 2)`. Ordena por el alias del cálculo.",
       "tipo": "tip"
      },
      {
       "live": {
        "titulo": "Tu intento",
        "sql": "-- productos (id_producto, id_categoria, nombre, precio, stock, activo, fecha_alta)\n\nSELECT "
       }
      },
      {
       "details": {
        "titulo": "Ver solución y explicación",
        "bloques": [
         {
          "join": {
           "tablas": [
            {
             "t": "productos",
             "a": "pr",
             "cols": [
              "id_producto",
              "nombre",
              "precio",
              "activo"
             ]
            }
           ],
           "where": [
            {
             "col": "pr.activo",
             "op": "=",
             "val": true
            }
           ],
           "sel": [
            "pr.nombre",
            "pr.precio",
            {
             "expr": "round(pr.precio * 1.21, 2)",
             "as": "precio_iva",
             "t": "pr",
             "why": "el precio por 1,21 redondeado a 2 decimales",
             "dec": 2,
             "calc": (g) => Math.round(Math.round(g('pr', 'precio') * 100) * 121 / 100) / 100
            }
           ],
           "orden": [
            "precio_iva desc"
           ],
           "limite": 5,
           "idea": "Operador `*` + función `round`: una expresión se calcula **fila a fila** y se le pone un alias.",
           "porque": [
            "Para cada fila de ((productos|productos)) se calcula `precio * 1.21` y se redondea a 2 decimales.",
            "Se puede ordenar por el alias (`precio_iva`) porque `ORDER BY` se ejecuta después de `SELECT`."
           ],
           "n": "E1",
           "titulo": "Nombre, precio y precio con IVA (21 %) de los 5 productos activos más caros con IVA."
          }
         }
        ]
       }
      },
      {
       "h4": "E2"
      },
      {
       "p": "Nombre y valor del stock (precio × unidades) de los 5 productos con más valor almacenado."
      },
      {
       "nota": "**Pista:** Multiplica dos columnas: `precio * stock`.",
       "tipo": "tip"
      },
      {
       "live": {
        "titulo": "Tu intento",
        "sql": "-- productos (id_producto, id_categoria, nombre, precio, stock, activo, fecha_alta)\n\nSELECT "
       }
      },
      {
       "details": {
        "titulo": "Ver solución y explicación",
        "bloques": [
         {
          "join": {
           "tablas": [
            {
             "t": "productos",
             "a": "pr",
             "cols": [
              "id_producto",
              "nombre",
              "precio",
              "stock"
             ]
            }
           ],
           "sel": [
            "pr.nombre",
            "pr.precio",
            "pr.stock",
            {
             "expr": "pr.precio * pr.stock",
             "as": "valor_stock",
             "t": "pr",
             "why": "precio por unidades en almacén",
             "dec": 2,
             "calc": (g) => Math.round(g('pr', 'precio') * 100) * g('pr', 'stock') / 100
            }
           ],
           "orden": [
            "valor_stock desc"
           ],
           "limite": 5,
           "idea": "Un operador puede combinar **dos columnas** de la misma fila.",
           "porque": [
            "`precio * stock` se calcula en cada fila: 649.00 × 12 = 7788.00 para el portátil.",
            "El resultado conserva los decimales de `precio` porque es `NUMERIC`."
           ],
           "n": "E2",
           "titulo": "Nombre y valor del stock (precio × unidades) de los 5 productos con más valor almacenado."
          }
         }
        ]
       }
      },
      {
       "h4": "E3"
      },
      {
       "p": "Producto, precio actual, precio vendido y diferencia de las 4 líneas que se vendieron más baratas que el precio actual."
      },
      {
       "nota": "**Pista:** Resta dos columnas de tablas distintas: `pr.precio - l.precio_unitario`.",
       "tipo": "tip"
      },
      {
       "live": {
        "titulo": "Tu intento",
        "sql": "-- lineas_pedido (id_pedido, id_producto, cantidad, precio_unitario, subtotal)\n-- productos (id_producto, id_categoria, nombre, precio, stock, activo, fecha_alta)\n\nSELECT "
       }
      },
      {
       "details": {
        "titulo": "Ver solución y explicación",
        "bloques": [
         {
          "join": {
           "tablas": [
            {
             "t": "lineas_pedido",
             "a": "l",
             "cols": [
              "id_pedido",
              "id_producto",
              "precio_unitario"
             ]
            },
            {
             "t": "productos",
             "a": "pr",
             "cols": [
              "id_producto",
              "nombre",
              "precio"
             ]
            }
           ],
           "joins": [
            {
             "tipo": "inner",
             "on": [
              "pr.id_producto",
              "l.id_producto"
             ]
            }
           ],
           "sel": [
            {
             "col": "pr.nombre",
             "as": "producto"
            },
            "pr.precio",
            "l.precio_unitario",
            {
             "expr": "pr.precio - l.precio_unitario",
             "as": "diferencia",
             "t": "pr",
             "why": "precio actual menos precio al que se vendió",
             "dec": 2,
             "calc": (g) => (Math.round(g('pr', 'precio') * 100) - Math.round(g('l', 'precio_unitario') * 100)) / 100
            }
           ],
           "orden": [
            "diferencia desc"
           ],
           "limite": 4,
           "soloUsadas": false,
           "idea": "Un cálculo puede mezclar columnas de las dos tablas unidas.",
           "porque": [
            "El `JOIN` pone en la misma fila el precio **actual** (((productos|productos))) y el precio **al que se vendió** (((lineas_pedido|lineas_pedido))).",
            "Una diferencia negativa significa que se vendió más caro que el precio de hoy."
           ],
           "n": "E3",
           "titulo": "Producto, precio actual, precio vendido y diferencia de las 4 líneas que se vendieron más baratas que el precio actual."
          }
         }
        ]
       }
      },
      {
       "h4": "E4"
      },
      {
       "p": "Por cada pedido: número de líneas, unidades, total de líneas y media por línea (2 decimales)."
      },
      {
       "nota": "**Pista:** `JOIN` con `lineas_pedido` y `GROUP BY` el pedido. Usa `count`, `sum` y `round(avg(…), 2)`.",
       "tipo": "tip"
      },
      {
       "live": {
        "titulo": "Tu intento",
        "sql": "-- pedidos (id_pedido, id_cliente, id_empleado, fecha, estado, gastos_envio)\n-- lineas_pedido (id_pedido, id_producto, cantidad, precio_unitario, subtotal)\n\nSELECT "
       }
      },
      {
       "details": {
        "titulo": "Ver solución y explicación",
        "bloques": [
         {
          "join": {
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
              "cantidad",
              "subtotal"
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
            }
           ],
           "sel": [
            "p.id_pedido",
            {
             "agg": "count",
             "col": "*",
             "t": "l",
             "as": "lineas"
            },
            {
             "agg": "sum",
             "col": "l.cantidad",
             "as": "unidades"
            },
            {
             "agg": "sum",
             "col": "l.subtotal",
             "as": "total_lineas"
            },
            {
             "agg": "avg",
             "col": "l.subtotal",
             "round": 2,
             "as": "media_linea"
            }
           ],
           "orden": [
            "id_pedido"
           ],
           "maxFilas": 10,
           "idea": "Las funciones agregadas calculan **sobre varias filas** y devuelven una por grupo.",
           "porque": [
            "`group by p.id_pedido` junta las líneas de cada pedido; las agregadas calculan dentro de cada grupo.",
            "`avg` devuelve muchos decimales: `round(…, 2)` los deja en 2."
           ],
           "n": "E4",
           "titulo": "Por cada pedido: número de líneas, unidades, total de líneas y media por línea (2 decimales)."
          }
         }
        ]
       }
      },
      {
       "h4": "E5"
      },
      {
       "p": "Nombre completo y email en mayúsculas de los clientes, ordenados por nombre."
      },
      {
       "nota": "**Pista:** Une `nombre` y `apellidos` con `||` (y un espacio en medio) y usa `upper`.",
       "tipo": "tip"
      },
      {
       "live": {
        "titulo": "Tu intento",
        "sql": "-- clientes (id_cliente, nombre, apellidos, email, ciudad, telefono, fecha_registro)\n\nSELECT "
       }
      },
      {
       "details": {
        "titulo": "Ver solución y explicación",
        "bloques": [
         {
          "join": {
           "tablas": [
            {
             "t": "clientes",
             "a": "c",
             "cols": [
              "id_cliente",
              "nombre",
              "apellidos",
              "email"
             ]
            }
           ],
           "sel": [
            {
             "expr": "c.nombre || ' ' || c.apellidos",
             "as": "nombre_completo",
             "t": "c",
             "why": "nombre, espacio y apellidos",
             "calc": (g) => g('c', 'nombre') + ' ' + g('c', 'apellidos')
            },
            {
             "expr": "upper(c.email)",
             "as": "email_mayus",
             "t": "c",
             "why": "el email en mayúsculas",
             "calc": (g) => g('c', 'email').toUpperCase()
            }
           ],
           "orden": [
            "nombre_completo"
           ],
           "maxFilas": 8,
           "idea": "`||` concatena texto; `upper` es una función de texto.",
           "porque": [
            "`c.nombre || ' ' || c.apellidos` pega tres trozos: el espacio hay que ponerlo tú.",
            "Si alguno de los trozos fuera `NULL`, todo el resultado sería `NULL`: `||` no ignora los vacíos."
           ],
           "n": "E5",
           "titulo": "Nombre completo y email en mayúsculas de los clientes, ordenados por nombre."
          }
         }
        ]
       }
      },
      {
       "h4": "E6"
      },
      {
       "p": "Nombre, fecha de alta y días en catálogo (a 3 de octubre de 2026) de los 5 productos más antiguos."
      },
      {
       "nota": "**Pista:** Restar dos fechas da un número de días: `DATE '2026-10-03' - fecha_alta`.",
       "tipo": "tip"
      },
      {
       "live": {
        "titulo": "Tu intento",
        "sql": "-- productos (id_producto, id_categoria, nombre, precio, stock, activo, fecha_alta)\n\nSELECT "
       }
      },
      {
       "details": {
        "titulo": "Ver solución y explicación",
        "bloques": [
         {
          "join": {
           "tablas": [
            {
             "t": "productos",
             "a": "pr",
             "cols": [
              "id_producto",
              "nombre",
              "fecha_alta"
             ]
            }
           ],
           "sel": [
            "pr.nombre",
            "pr.fecha_alta",
            {
             "expr": "DATE '2026-10-03' - pr.fecha_alta",
             "as": "dias_en_catalogo",
             "t": "pr",
             "why": "días entre el alta y el 3 de octubre de 2026",
             "calc": (g) => Math.round((Date.UTC(2026, 9, 3) - Date.parse(g('pr', 'fecha_alta') + 'T00:00:00Z')) / 86400000)
            }
           ],
           "orden": [
            "dias_en_catalogo desc"
           ],
           "limite": 5,
           "idea": "Fecha − fecha = número de días.",
           "porque": [
            "Las dos fechas son de tipo `DATE`: la resta devuelve un entero (días).",
            "`DATE '2026-10-03'` fija la fecha del ejercicio; con `CURRENT_DATE` usarías la de hoy."
           ],
           "n": "E6",
           "titulo": "Nombre, fecha de alta y días en catálogo (a 3 de octubre de 2026) de los 5 productos más antiguos."
          }
         }
        ]
       }
      },
      {
       "h4": "E7"
      },
      {
       "p": "Id de cada pedido, resto de dividirlo entre 2 y su mitad entera."
      },
      {
       "nota": "**Pista:** `%` es el resto y `/` entre dos enteros descarta los decimales.",
       "tipo": "tip"
      },
      {
       "live": {
        "titulo": "Tu intento",
        "sql": "-- pedidos (id_pedido, id_cliente, id_empleado, fecha, estado, gastos_envio)\n\nSELECT "
       }
      },
      {
       "details": {
        "titulo": "Ver solución y explicación",
        "bloques": [
         {
          "join": {
           "tablas": [
            {
             "t": "pedidos",
             "a": "p",
             "cols": [
              "id_pedido"
             ]
            }
           ],
           "sel": [
            "p.id_pedido",
            {
             "expr": "p.id_pedido % 2",
             "as": "resto",
             "t": "p",
             "why": "resto de dividir entre 2 (0 si es par)",
             "calc": (g) => g('p', 'id_pedido') % 2
            },
            {
             "expr": "p.id_pedido / 2",
             "as": "mitad_entera",
             "t": "p",
             "why": "división entera: sin decimales",
             "calc": (g) => Math.trunc(g('p', 'id_pedido') / 2)
            }
           ],
           "orden": [
            "id_pedido"
           ],
           "idea": "`id_pedido` es un entero, así que `/ 2` no da decimales: 7 / 2 = 3.",
           "porque": [
            "`%` devuelve el resto: 0 en los pares, 1 en los impares.",
            "Para una mitad con decimales: `id_pedido / 2.0`."
           ],
           "n": "E7",
           "titulo": "Id de cada pedido, resto de dividirlo entre 2 y su mitad entera."
          }
         }
        ]
       }
      },
      {
       "h4": "E8"
      },
      {
       "p": "Nombre, stock y disponibilidad de cada producto: agotado, quedan pocos (menos de 5) o disponible."
      },
      {
       "nota": "**Pista:** `CASE WHEN … THEN … ELSE … END`.",
       "tipo": "tip"
      },
      {
       "live": {
        "titulo": "Tu intento",
        "sql": "-- productos (id_producto, id_categoria, nombre, precio, stock, activo, fecha_alta)\n\nSELECT "
       }
      },
      {
       "details": {
        "titulo": "Ver solución y explicación",
        "bloques": [
         {
          "join": {
           "tablas": [
            {
             "t": "productos",
             "a": "pr",
             "cols": [
              "id_producto",
              "nombre",
              "stock"
             ]
            }
           ],
           "sel": [
            "pr.nombre",
            "pr.stock",
            {
             "expr": "CASE WHEN pr.stock = 0 THEN 'agotado' WHEN pr.stock < 5 THEN 'quedan pocos' ELSE 'disponible' END",
             "as": "disponibilidad",
             "t": "pr",
             "why": "un texto según el stock",
             "calc": (g) => g('pr', 'stock') === 0 ? 'agotado' : g('pr', 'stock') < 5 ? 'quedan pocos' : 'disponible'
            }
           ],
           "orden": [
            "stock",
            "nombre"
           ],
           "maxFilas": 12,
           "idea": "`CASE` es el if/else de SQL: se evalúan los `WHEN` en orden y gana el primero que se cumple.",
           "porque": [
            "((productos|Webcam Full HD)) tiene stock 0: es la primera condición.",
            "El `ELSE` recoge todo lo que no ha cumplido ningún `WHEN`."
           ],
           "n": "E8",
           "titulo": "Nombre, stock y disponibilidad de cada producto: agotado, quedan pocos (menos de 5) o disponible."
          }
         }
        ]
       }
      },
      {
       "h4": "E9"
      },
      {
       "p": "Por categoría: número de productos, precio medio (2 decimales) y precio máximo. Incluye las categorías sin productos."
      },
      {
       "nota": "**Pista:** `LEFT JOIN` desde `categorias` y tres agregadas.",
       "tipo": "tip"
      },
      {
       "live": {
        "titulo": "Tu intento",
        "sql": "-- categorias (id_categoria, nombre)\n-- productos (id_producto, id_categoria, nombre, precio, stock, activo, fecha_alta)\n\nSELECT "
       }
      },
      {
       "details": {
        "titulo": "Ver solución y explicación",
        "bloques": [
         {
          "join": {
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
              "precio"
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
           "sel": [
            {
             "col": "cat.nombre",
             "as": "categoria"
            },
            {
             "agg": "count",
             "col": "pr.id_producto",
             "as": "productos"
            },
            {
             "agg": "avg",
             "col": "pr.precio",
             "round": 2,
             "as": "precio_medio"
            },
            {
             "agg": "max",
             "col": "pr.precio",
             "as": "mas_caro"
            }
           ],
           "orden": [
            "categoria"
           ],
           "idea": "Tres funciones agregadas en la misma consulta, y un `LEFT JOIN` para no perder categorías.",
           "porque": [
            "((categorias|Gaming)) no tiene productos: `count` da 0, pero `avg` y `max` dan `NULL` porque no hay valores.",
            "`avg` ignora los `NULL`; si hubiera productos sin precio, no entrarían en la media."
           ],
           "n": "E9",
           "titulo": "Por categoría: número de productos, precio medio (2 decimales) y precio máximo. Incluye las categorías sin productos."
          }
         }
        ]
       }
      },
      {
       "h4": "E10"
      },
      {
       "p": "Nombre de cada cliente y su teléfono; si no tiene, el texto \"sin teléfono\"."
      },
      {
       "nota": "**Pista:** `coalesce(columna, valor_si_es_null)`.",
       "tipo": "tip"
      },
      {
       "live": {
        "titulo": "Tu intento",
        "sql": "-- clientes (id_cliente, nombre, apellidos, email, ciudad, telefono, fecha_registro)\n\nSELECT "
       }
      },
      {
       "details": {
        "titulo": "Ver solución y explicación",
        "bloques": [
         {
          "join": {
           "tablas": [
            {
             "t": "clientes",
             "a": "c",
             "cols": [
              "id_cliente",
              "nombre",
              "telefono"
             ]
            }
           ],
           "sel": [
            "c.nombre",
            {
             "expr": "coalesce(c.telefono, 'sin teléfono')",
             "as": "telefono",
             "t": "c",
             "why": "el teléfono o un texto si no hay",
             "calc": (g) => g('c', 'telefono') ?? 'sin teléfono'
            }
           ],
           "orden": [
            "nombre"
           ],
           "maxFilas": 8,
           "idea": "`coalesce` devuelve el primer valor que no es `NULL`.",
           "porque": [
            "Para ((clientes|Marcos)), ((clientes|Sara)) y ((clientes|Andrea)) el teléfono es `NULL` y se sustituye por el texto.",
            "Es la forma de que un `NULL` no rompa un cálculo o una pantalla."
           ],
           "n": "E10",
           "titulo": "Nombre de cada cliente y su teléfono; si no tiene, el texto \"sin teléfono\"."
          }
         }
        ]
       }
      }
     ]
    }
   ]
  } } });
})();

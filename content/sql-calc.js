/* Chuleta de cálculos (operadores y funciones). Los resultados de las tablas se han obtenido ejecutando cada expresión en PostgreSQL. */
(function () {
  APP.register({ slug: "sql", contenido: { "mod-ch": {
   "resumen": "operadores aritméticos · funciones · patrones",
   "secciones": [
    {
     "id": "ch-indice",
     "titulo": "Acceso rápido",
     "bloques": [
      {
       "p": "Chuleta para **calcular dentro de una consulta**: operadores aritméticos y funciones. Cada resultado se ha comprobado ejecutándolo en PostgreSQL. Pulsa `/` y busca una palabra (`round`, `coalesce`, `%`, `fecha`…) para saltar directo."
      },
      {
       "tabla": {
        "cabs": [
         "Quiero…",
         "Uso",
         "Sección"
        ],
        "filas": [
         [
          "Sumar, restar, multiplicar, dividir",
          "`+  -  *  /  %  ^`",
          "[Operadores aritméticos](@ch-aritmeticos)"
         ],
         [
          "Redondear, valor absoluto, potencia, raíz",
          "`round  ceil  floor  trunc  abs  power  sqrt`",
          "[Funciones numéricas](@ch-numeros)"
         ],
         [
          "Tratar los vacíos y las condiciones",
          "`coalesce  nullif  CASE`",
          "[NULL y condicionales](@ch-nulos)"
         ],
         [
          "Contar, sumar, hacer medias de varias filas",
          "`count  sum  avg  min  max`",
          "[Funciones agregadas](@ch-agregadas)"
         ],
         [
          "Cambiar o medir un texto",
          "`upper  lower  length  trim  ||  substring`",
          "[Texto](@ch-texto)"
         ],
         [
          "Trabajar con fechas",
          "`+ días  -  extract  to_char  date_trunc`",
          "[Fechas](@ch-fechas)"
         ],
         [
          "IVA, descuentos, porcentajes, totales",
          "fórmulas listas",
          "[Patrones típicos](@ch-patrones)"
         ]
        ]
       }
      },
      {
       "sub": "También se busca como: suma resta multiplicación división módulo resto potencia raíz redondear redondeo decimales entero valor absoluto mayúsculas minúsculas concatenar nulos vacíos condicional si porcentaje iva descuento operadores matemáticas calcular cálculo funciones."
      }
     ]
    },
    {
     "id": "ch-aritmeticos",
     "titulo": "Operadores aritméticos",
     "bloques": [
      {
       "tabla": {
        "titulo": "Expresión, resultado y qué hace",
        "cabs": [
         "Expresión",
         "Resultado",
         "Qué hace"
        ],
        "filas": [
         [
          "`7 + 2`",
          "`9`",
          "Suma"
         ],
         [
          "`7 - 2`",
          "`5`",
          "Resta"
         ],
         [
          "`7 * 2`",
          "`14`",
          "Multiplicación"
         ],
         [
          "`7 / 2`",
          "`3`",
          "División **entera** si los dos son enteros: descarta los decimales"
         ],
         [
          "`7.0 / 2`",
          "`3.5000000000000000`",
          "Con un decimal, la división es decimal"
         ],
         [
          "`7 % 2`",
          "`1`",
          "Resto (módulo): sirve para saber si un número es par (`% 2 = 0`)"
         ],
         [
          "`2 ^ 3`",
          "`8`",
          "Potencia (también `power(2, 3)`)"
         ],
         [
          "`7 + 2 * 3`",
          "`13`",
          "Precedencia: primero `*`, `/` y `%`; luego `+` y `-`"
         ],
         [
          "`(7 + 2) * 3`",
          "`27`",
          "Los paréntesis mandan"
         ],
         [
          "`5 + NULL`",
          "`NULL`",
          "Cualquier operación con `NULL` da `NULL`"
         ]
        ]
       }
      },
      {
       "aviso": "**Dos enteros se dividen como enteros:** `7 / 2` da `3`, no `3.5`. Si necesitas decimales, pon uno de los dos como decimal (`7.0 / 2`) o conviértelo con `CAST(7 AS NUMERIC)`.",
       "tipo": "warning"
      },
      {
       "live": {
        "titulo": "Pruébalo en tienda_online",
        "sql": "SELECT 7 / 2      AS entera,\n       7.0 / 2    AS decimal,\n       7 % 2      AS resto,\n       2 ^ 3      AS potencia,\n       5 + NULL   AS con_null;"
       }
      }
     ]
    },
    {
     "id": "ch-numeros",
     "titulo": "Funciones numéricas",
     "bloques": [
      {
       "tabla": {
        "titulo": "Expresión, resultado y qué hace",
        "cabs": [
         "Expresión",
         "Resultado",
         "Qué hace"
        ],
        "filas": [
         [
          "`round(3.14159, 2)`",
          "`3.14`",
          "Redondea a 2 decimales"
         ],
         [
          "`round(2.5)`",
          "`3`",
          "Sin decimales indicados, redondea a entero (el .5 sube)"
         ],
         [
          "`ceil(3.2)`",
          "`4`",
          "Redondea siempre hacia arriba"
         ],
         [
          "`floor(3.8)`",
          "`3`",
          "Redondea siempre hacia abajo"
         ],
         [
          "`trunc(3.89, 1)`",
          "`3.8`",
          "Corta los decimales sin redondear"
         ],
         [
          "`abs(-7)`",
          "`7`",
          "Valor absoluto"
         ],
         [
          "`mod(7, 2)`",
          "`1`",
          "Resto, igual que `%`"
         ],
         [
          "`power(2, 10)`",
          "`1024`",
          "Potencia"
         ],
         [
          "`sqrt(81)`",
          "`9`",
          "Raíz cuadrada"
         ],
         [
          "`greatest(3, 9, 5)`",
          "`9`",
          "El mayor de varios valores de la **misma fila**"
         ],
         [
          "`least(3, 9, 5)`",
          "`3`",
          "El menor de varios valores de la misma fila"
         ],
         [
          "`CAST(7 AS NUMERIC) / 2`",
          "`3.5000000000000000`",
          "Convierte a decimal para que la división no sea entera"
         ]
        ]
       }
      }
     ]
    },
    {
     "id": "ch-nulos",
     "titulo": "NULL y condicionales",
     "bloques": [
      {
       "tabla": {
        "titulo": "Expresión, resultado y qué hace",
        "cabs": [
         "Expresión",
         "Resultado",
         "Qué hace"
        ],
        "filas": [
         [
          "`coalesce(NULL, 0)`",
          "`0`",
          "Primer valor que no es `NULL`"
         ],
         [
          "`coalesce(NULL, 'sin dato')`",
          "`sin dato`",
          "Útil para mostrar un texto en vez de `NULL`"
         ],
         [
          "`nullif(10, 10)`",
          "`NULL`",
          "Devuelve `NULL` si los dos valores son iguales"
         ],
         [
          "`10 / nullif(0, 0)`",
          "`NULL`",
          "Evita el error de dividir entre 0: el resultado es `NULL`"
         ],
         [
          "`CASE WHEN 5 > 3 THEN 'sí' ELSE 'no' END`",
          "`sí`",
          "Condición dentro de la consulta (if/else)"
         ],
         [
          "`'a' || NULL`",
          "`NULL`",
          "`||` con `NULL` da `NULL`"
         ],
         [
          "`concat('a', NULL, 'b')`",
          "`ab`",
          "`concat` ignora los `NULL`"
         ]
        ]
       }
      },
      {
       "aviso": "**Cualquier cálculo con `NULL` da `NULL`**. Si una columna puede estar vacía, envuélvela: `coalesce(columna, 0)`.",
       "tipo": "warning"
      }
     ]
    },
    {
     "id": "ch-agregadas",
     "titulo": "Funciones agregadas",
     "bloques": [
      {
       "tabla": {
        "titulo": "Expresión, resultado y qué hace",
        "cabs": [
         "Expresión",
         "Resultado",
         "Qué hace"
        ],
        "filas": [
         [
          "`count(*) FROM pedidos`",
          "`10`",
          "Cuenta filas"
         ],
         [
          "`count(telefono) FROM clientes`",
          "`5`",
          "Cuenta valores que **no** son `NULL`"
         ],
         [
          "`sum(precio) FROM productos`",
          "`2368.69`",
          "Suma"
         ],
         [
          "`round(avg(precio), 2) FROM productos`",
          "`197.39`",
          "Media (ignora los `NULL`)"
         ],
         [
          "`max(precio) FROM productos`",
          "`649.00`",
          "Máximo"
         ],
         [
          "`min(precio) FROM productos`",
          "`39.90`",
          "Mínimo"
         ],
         [
          "`count(*) FILTER (WHERE activo) FROM productos`",
          "`11`",
          "Cuenta solo las filas que cumplen la condición"
         ]
        ]
       }
      },
      {
       "nota": "Las agregadas **ignoran los `NULL`**, salvo `count(*)`, que cuenta filas. Con `LEFT JOIN` cuenta una columna de la tabla derecha (`count(p.id_pedido)`), no `count(*)`.",
       "tipo": "note"
      }
     ]
    },
    {
     "id": "ch-texto",
     "titulo": "Texto",
     "bloques": [
      {
       "tabla": {
        "titulo": "Expresión, resultado y qué hace",
        "cabs": [
         "Expresión",
         "Resultado",
         "Qué hace"
        ],
        "filas": [
         [
          "`upper('madrid')`",
          "`MADRID`",
          "Mayúsculas"
         ],
         [
          "`lower('MADRID')`",
          "`madrid`",
          "Minúsculas"
         ],
         [
          "`initcap('hola mundo')`",
          "`Hola Mundo`",
          "Primera letra de cada palabra en mayúscula"
         ],
         [
          "`length('Madrid')`",
          "`6`",
          "Número de caracteres"
         ],
         [
          "`trim('  hola  ')`",
          "`hola`",
          "Quita los espacios de los extremos"
         ],
         [
          "`left('Madrid', 3)`",
          "`Mad`",
          "Primeros caracteres"
         ],
         [
          "`substring('Madrid' from 2 for 3)`",
          "`adr`",
          "Trozo: desde la posición 2, 3 caracteres"
         ],
         [
          "`replace('a-b-c', '-', '/')`",
          "`a/b/c`",
          "Sustituye un texto por otro"
         ],
         [
          "`'Hola' || ' ' || 'mundo'`",
          "`Hola mundo`",
          "Concatena (une) textos"
         ],
         [
          "`lpad('7', 3, '0')`",
          "`007`",
          "Rellena por la izquierda hasta la longitud indicada"
         ]
        ]
       }
      }
     ]
    },
    {
     "id": "ch-fechas",
     "titulo": "Fechas",
     "bloques": [
      {
       "tabla": {
        "titulo": "Expresión, resultado y qué hace",
        "cabs": [
         "Expresión",
         "Resultado",
         "Qué hace"
        ],
        "filas": [
         [
          "`date '2026-10-03' + 30`",
          "`2026-11-02`",
          "Sumar días a una fecha"
         ],
         [
          "`date '2026-10-03' - date '2026-01-01'`",
          "`275`",
          "Restar dos fechas: número de días"
         ],
         [
          "`extract(year FROM date '2026-10-03')`",
          "`2026`",
          "Saca una parte: `year`, `month`, `day`…"
         ],
         [
          "`to_char(date '2026-10-03', 'DD/MM/YYYY')`",
          "`03/10/2026`",
          "Fecha a texto con el formato que quieras"
         ],
         [
          "`date_trunc('month', date '2026-10-03')::date`",
          "`2026-10-01`",
          "Primer día del mes"
         ],
         [
          "`(date '2026-10-03' + interval '1 month')::date`",
          "`2026-11-03`",
          "Sumar un intervalo (meses, años…)"
         ]
        ]
       }
      }
     ]
    },
    {
     "id": "ch-patrones",
     "titulo": "Patrones típicos",
     "bloques": [
      {
       "tabla": {
        "titulo": "Expresión, resultado y qué hace",
        "cabs": [
         "Expresión",
         "Resultado",
         "Qué hace"
        ],
        "filas": [
         [
          "`round(649.00 * 1.21, 2)`",
          "`785.29`",
          "Precio con IVA del 21 %: `precio * 1.21`"
         ],
         [
          "`round(649.00 * (1 - 0.15), 2)`",
          "`551.65`",
          "Descuento del 15 %: `precio * (1 - 0.15)`"
         ],
         [
          "`round(25 * 100.0 / 80, 1)`",
          "`31.3`",
          "Porcentaje: `parte * 100.0 / total` (con `.0` para no perder decimales)"
         ],
         [
          "`2 * 649.00 + 4.99`",
          "`1302.99`",
          "Total de una compra: cantidad × precio + envío"
         ],
         [
          "`7 % 2 = 0`",
          "`false`",
          "¿Es par? El resto de dividir entre 2 es 0"
         ]
        ]
       }
      },
      {
       "live": {
        "titulo": "Pruébalo en tienda_online",
        "sql": "SELECT nombre,\n       precio,\n       round(precio * 1.21, 2)        AS con_iva,\n       round(precio * (1 - 0.15), 2)  AS rebajado\nFROM productos\nWHERE activo\nORDER BY precio DESC\nLIMIT 5;"
       }
      },
      {
       "nota": "Las misiones del módulo [21 · Misiones de consultas](@ms-e) practican estos cálculos con las tablas reales.",
       "tipo": "tip"
      }
     ]
    }
   ]
  } } });
})();

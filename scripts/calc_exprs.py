# (texto mostrado, expresión para PostgreSQL, explicación corta)
G={}
G["ch-aritmeticos"]=[
 ("7 + 2","7 + 2","Suma"),("7 - 2","7 - 2","Resta"),("7 * 2","7 * 2","Multiplicación"),
 ("7 / 2","7 / 2","División **entera** si los dos son enteros: descarta los decimales"),
 ("7.0 / 2","7.0 / 2","Con un decimal, la división es decimal"),
 ("7 % 2","7 % 2","Resto (módulo): sirve para saber si un número es par (`% 2 = 0`)"),
 ("2 ^ 3","2 ^ 3","Potencia (también `power(2, 3)`)"),
 ("7 + 2 * 3","7 + 2 * 3","Precedencia: primero `*`, `/` y `%`; luego `+` y `-`"),
 ("(7 + 2) * 3","(7 + 2) * 3","Los paréntesis mandan"),
 ("5 + NULL","5 + NULL","Cualquier operación con `NULL` da `NULL`"),
]
G["ch-numeros"]=[
 ("round(3.14159, 2)","round(3.14159, 2)","Redondea a 2 decimales"),
 ("round(2.5)","round(2.5)","Sin decimales indicados, redondea a entero (el .5 sube)"),
 ("ceil(3.2)","ceil(3.2)","Redondea siempre hacia arriba"),
 ("floor(3.8)","floor(3.8)","Redondea siempre hacia abajo"),
 ("trunc(3.89, 1)","trunc(3.89, 1)","Corta los decimales sin redondear"),
 ("abs(-7)","abs(-7)","Valor absoluto"),
 ("mod(7, 2)","mod(7, 2)","Resto, igual que `%`"),
 ("power(2, 10)","power(2, 10)","Potencia"),
 ("sqrt(81)","sqrt(81)","Raíz cuadrada"),
 ("greatest(3, 9, 5)","greatest(3, 9, 5)","El mayor de varios valores de la **misma fila**"),
 ("least(3, 9, 5)","least(3, 9, 5)","El menor de varios valores de la misma fila"),
 ("CAST(7 AS NUMERIC) / 2","CAST(7 AS NUMERIC) / 2","Convierte a decimal para que la división no sea entera"),
]
G["ch-nulos"]=[
 ("coalesce(NULL, 0)","coalesce(NULL, 0)","Primer valor que no es `NULL`"),
 ("coalesce(NULL, 'sin dato')","coalesce(NULL, 'sin dato')","Útil para mostrar un texto en vez de `NULL`"),
 ("nullif(10, 10)","nullif(10, 10)","Devuelve `NULL` si los dos valores son iguales"),
 ("10 / nullif(0, 0)","10 / nullif(0, 0)","Evita el error de dividir entre 0: el resultado es `NULL`"),
 ("CASE WHEN 5 > 3 THEN 'sí' ELSE 'no' END","CASE WHEN 5 > 3 THEN 'sí' ELSE 'no' END","Condición dentro de la consulta (if/else)"),
 ("'a' || NULL","'a' || NULL","`||` con `NULL` da `NULL`"),
 ("concat('a', NULL, 'b')","concat('a', NULL, 'b')","`concat` ignora los `NULL`"),
]
G["ch-agregadas"]=[
 ("count(*) FROM pedidos","(SELECT count(*) FROM pedidos)","Cuenta filas"),
 ("count(telefono) FROM clientes","(SELECT count(telefono) FROM clientes)","Cuenta valores que **no** son `NULL`"),
 ("sum(precio) FROM productos","(SELECT sum(precio) FROM productos)","Suma"),
 ("round(avg(precio), 2) FROM productos","(SELECT round(avg(precio), 2) FROM productos)","Media (ignora los `NULL`)"),
 ("max(precio) FROM productos","(SELECT max(precio) FROM productos)","Máximo"),
 ("min(precio) FROM productos","(SELECT min(precio) FROM productos)","Mínimo"),
 ("count(*) FILTER (WHERE activo) FROM productos","(SELECT count(*) FILTER (WHERE activo) FROM productos)","Cuenta solo las filas que cumplen la condición"),
]
G["ch-texto"]=[
 ("upper('madrid')","upper('madrid')","Mayúsculas"),("lower('MADRID')","lower('MADRID')","Minúsculas"),
 ("initcap('hola mundo')","initcap('hola mundo')","Primera letra de cada palabra en mayúscula"),
 ("length('Madrid')","length('Madrid')","Número de caracteres"),
 ("trim('  hola  ')","trim('  hola  ')","Quita los espacios de los extremos"),
 ("left('Madrid', 3)","left('Madrid', 3)","Primeros caracteres"),
 ("substring('Madrid' from 2 for 3)","substring('Madrid' from 2 for 3)","Trozo: desde la posición 2, 3 caracteres"),
 ("replace('a-b-c', '-', '/')","replace('a-b-c', '-', '/')","Sustituye un texto por otro"),
 ("'Hola' || ' ' || 'mundo'","'Hola' || ' ' || 'mundo'","Concatena (une) textos"),
 ("lpad('7', 3, '0')","lpad('7', 3, '0')","Rellena por la izquierda hasta la longitud indicada"),
]
G["ch-fechas"]=[
 ("date '2026-10-03' + 30","date '2026-10-03' + 30","Sumar días a una fecha"),
 ("date '2026-10-03' - date '2026-01-01'","date '2026-10-03' - date '2026-01-01'","Restar dos fechas: número de días"),
 ("extract(year FROM date '2026-10-03')","extract(year FROM date '2026-10-03')","Saca una parte: `year`, `month`, `day`…"),
 ("to_char(date '2026-10-03', 'DD/MM/YYYY')","to_char(date '2026-10-03', 'DD/MM/YYYY')","Fecha a texto con el formato que quieras"),
 ("date_trunc('month', date '2026-10-03')::date","date_trunc('month', date '2026-10-03')::date","Primer día del mes"),
 ("(date '2026-10-03' + interval '1 month')::date","(date '2026-10-03' + interval '1 month')::date","Sumar un intervalo (meses, años…)"),
]
G["ch-patrones"]=[
 ("round(649.00 * 1.21, 2)","round(649.00 * 1.21, 2)","Precio con IVA del 21 %: `precio * 1.21`"),
 ("round(649.00 * (1 - 0.15), 2)","round(649.00 * (1 - 0.15), 2)","Descuento del 15 %: `precio * (1 - 0.15)`"),
 ("round(25 * 100.0 / 80, 1)","round(25 * 100.0 / 80, 1)","Porcentaje: `parte * 100.0 / total` (con `.0` para no perder decimales)"),
 ("2 * 649.00 + 4.99","2 * 649.00 + 4.99","Total de una compra: cantidad × precio + envío"),
 ("7 % 2 = 0","7 % 2 = 0","¿Es par? El resto de dividir entre 2 es 0"),
]

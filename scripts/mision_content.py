import json,re,sys
sys.path.insert(0,str(__import__('pathlib').Path(__file__).resolve().parent))
from calc_exprs import G
OUT=json.load(open(str(__import__('pathlib').Path(__file__).resolve().parent / 'calc_results.json')))
def JS(code): return "__JS__"+code+"__JS__"
P=lambda t:{"p":t}
def sec(id,titulo,bl): return {"id":id,"titulo":titulo,"bloques":bl}
T=lambda t,a,cols:{"t":t,"a":a,"cols":cols}
def finish(obj):
    s=json.dumps(obj,ensure_ascii=False,indent=1)
    return re.sub(r'"__JS__(.*?)__JS__"',lambda m: m.group(1).replace('\\"','"'),s)

# ---------------- CHULETA ----------------
res={}; i=0
for k,g in G.items():
    res[k]=[]
    for sh,ex,nota in g:
        res[k].append((sh,OUT[i],nota)); i+=1
def tabla(k):
    return {"tabla":{"titulo":"Expresión, resultado y qué hace","cabs":["Expresión","Resultado","Qué hace"],"filas":[["`"+sh+"`","`"+r+"`",n] for sh,r,n in res[k]]}}
ch=[]
ch.append(sec("ch-indice","Acceso rápido",[
 P("Chuleta para **calcular dentro de una consulta**: operadores aritméticos y funciones. Cada resultado se ha comprobado ejecutándolo en PostgreSQL. Pulsa `/` y busca una palabra (`round`, `coalesce`, `%`, `fecha`…) para saltar directo."),
 {"tabla":{"cabs":["Quiero…","Uso","Sección"],"filas":[
  ["Sumar, restar, multiplicar, dividir","`+  -  *  /  %  ^`","[Operadores aritméticos](@ch-aritmeticos)"],
  ["Redondear, valor absoluto, potencia, raíz","`round  ceil  floor  trunc  abs  power  sqrt`","[Funciones numéricas](@ch-numeros)"],
  ["Tratar los vacíos y las condiciones","`coalesce  nullif  CASE`","[NULL y condicionales](@ch-nulos)"],
  ["Contar, sumar, hacer medias de varias filas","`count  sum  avg  min  max`","[Funciones agregadas](@ch-agregadas)"],
  ["Cambiar o medir un texto","`upper  lower  length  trim  ||  substring`","[Texto](@ch-texto)"],
  ["Trabajar con fechas","`+ días  -  extract  to_char  date_trunc`","[Fechas](@ch-fechas)"],
  ["IVA, descuentos, porcentajes, totales","fórmulas listas","[Patrones típicos](@ch-patrones)"],
 ]}},
 {"sub":"También se busca como: suma resta multiplicación división módulo resto potencia raíz redondear redondeo decimales entero valor absoluto mayúsculas minúsculas concatenar nulos vacíos condicional si porcentaje iva descuento operadores matemáticas calcular cálculo funciones."},
]))
ch.append(sec("ch-aritmeticos","Operadores aritméticos",[
 tabla("ch-aritmeticos"),
 {"aviso":"**Dos enteros se dividen como enteros:** `7 / 2` da `3`, no `3.5`. Si necesitas decimales, pon uno de los dos como decimal (`7.0 / 2`) o conviértelo con `CAST(7 AS NUMERIC)`.","tipo":"warning"},
 {"live":{"titulo":"Pruébalo en tienda_online","sql":"SELECT 7 / 2      AS entera,\n       7.0 / 2    AS decimal,\n       7 % 2      AS resto,\n       2 ^ 3      AS potencia,\n       5 + NULL   AS con_null;"}},
]))
ch.append(sec("ch-numeros","Funciones numéricas",[tabla("ch-numeros")]))
ch.append(sec("ch-nulos","NULL y condicionales",[
 tabla("ch-nulos"),
 {"aviso":"**Cualquier cálculo con `NULL` da `NULL`**. Si una columna puede estar vacía, envuélvela: `coalesce(columna, 0)`.","tipo":"warning"},
]))
ch.append(sec("ch-agregadas","Funciones agregadas",[
 tabla("ch-agregadas"),
 {"nota":"Las agregadas **ignoran los `NULL`**, salvo `count(*)`, que cuenta filas. Con `LEFT JOIN` cuenta una columna de la tabla derecha (`count(p.id_pedido)`), no `count(*)`.","tipo":"note"},
]))
ch.append(sec("ch-texto","Texto",[tabla("ch-texto")]))
ch.append(sec("ch-fechas","Fechas",[tabla("ch-fechas")]))
ch.append(sec("ch-patrones","Patrones típicos",[
 tabla("ch-patrones"),
 {"live":{"titulo":"Pruébalo en tienda_online","sql":"SELECT nombre,\n       precio,\n       round(precio * 1.21, 2)        AS con_iva,\n       round(precio * (1 - 0.15), 2)  AS rebajado\nFROM productos\nWHERE activo\nORDER BY precio DESC\nLIMIT 5;"}},
 {"nota":"Las misiones del módulo [21 · Misiones de consultas](@ms-e) practican estos cálculos con las tablas reales.","tipo":"tip"},
]))
chmod={"resumen":"operadores aritméticos · funciones · patrones","secciones":ch}
open(str(__import__('pathlib').Path(__file__).resolve().parent.parent / 'content') + '/sql-calc.js','w').write("/* Chuleta de cálculos (operadores y funciones). Los resultados de las tablas se han obtenido ejecutando cada expresión en PostgreSQL. */\n(function () {\n  APP.register({ slug: \"sql\", contenido: { \"mod-ch\": "+finish(chmod).replace("\n","\n  ")+" } });\n})();\n")

# ---------------- MISIONES ----------------
COLS={"clientes":"id_cliente, nombre, apellidos, email, ciudad, telefono, fecha_registro","productos":"id_producto, id_categoria, nombre, precio, stock, activo, fecha_alta","categorias":"id_categoria, nombre","empleados":"id_empleado, nombre, puesto, id_jefe, salario, fecha_contrato","pedidos":"id_pedido, id_cliente, id_empleado, fecha, estado, gastos_envio","lineas_pedido":"id_pedido, id_producto, cantidad, precio_unitario, subtotal"}
def ex(n,enun,pista,cfg,intento=None):
    cfg=dict(cfg); cfg["n"]=n; cfg["titulo"]=enun
    tabs=[t["t"] for t in cfg["tablas"]]; seen=[]
    hint="\n".join("-- "+t+" ("+COLS[t]+")" for t in tabs if not (t in seen or seen.append(t)))
    return [
     {"h4":n+" · "+enun.split(".")[0] if False else n},
     P(enun),
     {"nota":"**Pista:** "+pista,"tipo":"tip"},
     {"live":{"titulo":"Tu intento","sql":hint+"\n\nSELECT "+(intento or "")}},
     {"details":{"titulo":"Ver solución y explicación","bloques":[{"join":cfg}]}},
    ]
def sel_agg(**k): return k
M=[]

# A: SELECT simples
A=[]
A+=ex("A1","Nombre y ciudad de los clientes que viven en Madrid.","Filtra con `WHERE` por la columna `ciudad`; el texto va entre comillas simples.",
 {"tablas":[T("clientes","c",["id_cliente","nombre","ciudad"])],"where":[{"col":"c.ciudad","op":"=","val":"Madrid"}],"sel":["c.nombre","c.ciudad"],
  "idea":"Una sola tabla: el `WHERE` quita las filas que no cumplen la condición (✕).",
  "porque":["Se leen todas las filas de ((clientes|clientes)) y solo pasan las que tienen `ciudad = 'Madrid'`.","Las filas con `ciudad` a `NULL` (como Andrea) tampoco pasan: `NULL = 'Madrid'` no es verdadero."]})
A+=ex("A2","Nombre y precio de los productos activos que cuestan menos de 100 €, del más barato al más caro.","Dos condiciones unidas con `AND`; `activo` ya es un booleano. Ordena con `ORDER BY`.",
 {"tablas":[T("productos","pr",["id_producto","nombre","precio","activo"])],"where":[{"col":"pr.activo","op":"=","val":True},{"col":"pr.precio","op":"<","val":100}],"sel":["pr.nombre","pr.precio"],"orden":["precio"],
  "idea":"Dos condiciones con `AND`: la fila tiene que cumplir las dos.",
  "porque":["((productos|Cafetera espresso)) está desactivada (`activo` es false) y ((productos|Portátil Lenovo IdeaPad 5)) cuesta más de 100: las dos quedan fuera (✕).","`order by precio` ordena el resultado de menor a mayor; para al revés, `precio desc`."]})
A+=ex("A3","Nombre y email de los clientes que no tienen teléfono registrado.","Para comparar con `NULL` no sirve `=`: usa `IS NULL`.",
 {"tablas":[T("clientes","c",["id_cliente","nombre","email","telefono"])],"where":[{"col":"c.telefono","op":"is null"}],"sel":["c.nombre","c.email"],
  "idea":"`NULL` significa \"sin valor\": se pregunta con `IS NULL`, nunca con `= NULL`.",
  "porque":["`telefono = NULL` nunca es verdadero, ni siquiera para las filas con `NULL`. Por eso existe `IS NULL`.","Salen ((clientes|Marcos)), ((clientes|Sara)) y ((clientes|Andrea)): los tres sin teléfono (∅ en la columna)."]})
A+=ex("A4","Nombre y precio de los 3 productos más caros.","Ordena de mayor a menor (`DESC`) y limita el número de filas con `LIMIT`.",
 {"tablas":[T("productos","pr",["id_producto","nombre","precio"])],"sel":["pr.nombre","pr.precio"],"orden":["precio desc"],"limite":3,
  "idea":"`ORDER BY … DESC` + `LIMIT n` = los `n` primeros del ranking.",
  "porque":["Sin `ORDER BY`, `LIMIT` devolvería 3 filas cualesquiera: el orden es lo que da sentido al \"más caros\".","Se ordenan las 12 filas de ((productos|productos)) y se queda con las 3 primeras."]})
A+=ex("A5","Id y estado de los pedidos que todavía no han llegado (pendientes o enviados).","Con varios valores posibles, `IN ('a', 'b')` es más corto que dos `OR`.",
 {"tablas":[T("pedidos","p",["id_pedido","estado"])],"where":[{"col":"p.estado","op":"in","val":["pendiente","enviado"]}],"sel":["p.id_pedido","p.estado"],"orden":["id_pedido"],
  "idea":"`IN (…)` equivale a varias comparaciones `=` unidas con `OR`.",
  "porque":["`estado in ('pendiente', 'enviado')` es lo mismo que `estado = 'pendiente' or estado = 'enviado'`.","Los pedidos entregados y el cancelado quedan fuera (✕)."]})
A+=ex("A6","Nombre y precio de los productos cuyo nombre contiene \"USB\".","`LIKE` con el comodín `%` (cualquier cantidad de caracteres) delante y detrás.",
 {"tablas":[T("productos","pr",["id_producto","nombre","precio"])],"where":[{"col":"pr.nombre","op":"like","val":"%USB%"}],"sel":["pr.nombre","pr.precio"],
  "idea":"`%` representa cualquier texto: `'%USB%'` significa \"contiene USB\".",
  "porque":["`like '%USB%'` acepta cualquier texto antes y después de `USB`.","`LIKE` distingue mayúsculas de minúsculas; para ignorarlas, `ILIKE`."]})
M.append(sec("ms-a","A · SELECT simples",[P("Una sola tabla. Practicas `WHERE`, `ORDER BY`, `LIMIT`, `IN`, `LIKE` e `IS NULL`. Intenta cada ejercicio en el editor y abre la solución solo para comprobar.")]+A))

# B: INNER
B=[]
B+=ex("B1","Nombre de cada producto junto con el nombre de su categoría.","Une `productos` con `categorias` por la columna `id_categoria`.",
 {"tablas":[T("productos","pr",["id_producto","id_categoria","nombre"]),T("categorias","cat",["id_categoria","nombre"])],"joins":[{"tipo":"inner","on":["cat.id_categoria","pr.id_categoria"]}],
  "sel":[{"col":"pr.nombre","as":"producto"},{"col":"cat.nombre","as":"categoria"}],"orden":["categoria","producto"],"maxFilas":12,
  "idea":"La FK `id_categoria` de ((productos|productos)) apunta a la PK `id_categoria` de ((categorias|categorias)).",
  "porque":["Cada producto tiene una única categoría, así que salen 12 filas, una por producto.","((categorias|Gaming)) no tiene productos: sin pareja no sale en un `INNER JOIN`. Está sin dibujar fila porque no se ha usado."]})
B+=ex("B2","Id, estado y nombre del empleado que gestionó cada pedido.","Une `pedidos` con `empleados` por `id_empleado`.",
 {"tablas":[T("pedidos","p",["id_pedido","id_empleado","estado"]),T("empleados","e",["id_empleado","nombre"])],"joins":[{"tipo":"inner","on":["e.id_empleado","p.id_empleado"]}],
  "sel":["p.id_pedido","p.estado",{"col":"e.nombre","as":"empleado"}],"orden":["id_pedido"],
  "idea":"`INNER JOIN` descarta las filas sin pareja: aquí, los pedidos sin empleado.",
  "porque":["Los pedidos 6 y 9 tienen `id_empleado` a `NULL`: no hay pareja y no salen (✕).","((empleados|Carmen Rojas)), ((empleados|Tomás Vidal)) y ((empleados|Rosa Gil)) no gestionan ningún pedido: tampoco aparecen."]})
B+=ex("B3","Nombre y precio de los productos de la categoría Audio, del más caro al más barato.","Une con `categorias` y filtra por el **nombre** de la categoría.",
 {"tablas":[T("productos","pr",["id_producto","id_categoria","nombre","precio"]),T("categorias","cat",["id_categoria","nombre"])],"joins":[{"tipo":"inner","on":["cat.id_categoria","pr.id_categoria"]}],
  "where":[{"col":"cat.nombre","op":"=","val":"Audio"}],"sel":["pr.nombre","pr.precio"],"orden":["precio desc"],
  "idea":"El `JOIN` permite filtrar por una columna de la otra tabla (el nombre de la categoría).",
  "porque":["Primero se unen todos los productos con su categoría; después el `WHERE` deja solo los de ((categorias|Audio)).","Sin el `JOIN` habría que saber de memoria que Audio es la categoría 3."]})
B+=ex("B4","Nombre de cada cliente y id de sus pedidos pendientes.","Une `clientes` con `pedidos` y filtra por `estado`.",
 {"tablas":[T("clientes","c",["id_cliente","nombre"]),T("pedidos","p",["id_pedido","id_cliente","estado"])],"joins":[{"tipo":"inner","on":["p.id_cliente","c.id_cliente"]}],
  "where":[{"col":"p.estado","op":"=","val":"pendiente"}],"sel":["c.nombre","p.id_pedido"],"orden":["id_pedido"],
  "idea":"La condición del `WHERE` es sobre la tabla de la derecha: en un `INNER JOIN` da igual dónde se ponga.",
  "porque":["Solo los pedidos 9 y 10 están pendientes; sus clientes son ((clientes|Lucía)) y ((clientes|Marcos)).","El resto de clientes y pedidos quedan fuera (✕)."]})
B+=ex("B5","Producto, cantidad y subtotal de cada línea del pedido 4.","Une `lineas_pedido` con `productos` y filtra por `id_pedido`.",
 {"tablas":[T("lineas_pedido","l",["id_pedido","id_producto","cantidad","subtotal"]),T("productos","pr",["id_producto","nombre"])],"joins":[{"tipo":"inner","on":["pr.id_producto","l.id_producto"]}],
  "where":[{"col":"l.id_pedido","op":"=","val":4}],"soloUsadas":True,"sel":[{"col":"pr.nombre","as":"producto"},"l.cantidad","l.subtotal"],"orden":["subtotal desc"],
  "idea":"`lineas_pedido` solo guarda ids; el nombre del producto está en `productos`.",
  "porque":["((lineas_pedido|lineas_pedido)) guarda `id_producto`, no el nombre: el `JOIN` lo trae de ((productos|productos)).","El pedido 4 tiene 2 líneas: 2 monitores y 1 ratón."]})
M.append(sec("ms-b","B · JOIN simple (INNER)",[P("Dos tablas unidas con `INNER JOIN`. Cada ejercicio parte de una FK y una PK: dibújalas antes de escribir el `ON`.")]+B))

# C: LEFT
C=[]
C+=ex("C1","Nombre de cada categoría y número de productos que tiene (también las que tienen 0).","`LEFT JOIN` desde `categorias`, `count` sobre una columna de `productos` y `GROUP BY`.",
 {"tablas":[T("categorias","cat",["id_categoria","nombre"]),T("productos","pr",["id_producto","id_categoria","nombre"])],"joins":[{"tipo":"left","on":["pr.id_categoria","cat.id_categoria"]}],
  "sel":[{"col":"cat.nombre","as":"categoria"},{"agg":"count","col":"pr.id_producto","as":"productos"}],"orden":["productos desc","categoria"],
  "idea":"`LEFT JOIN` + `count(columna_de_la_derecha)`: las filas sin pareja cuentan 0.",
  "porque":["((categorias|Gaming)) no tiene productos: sale con `NULL` (∅) y `count(pr.id_producto)` ignora los `NULL`: 0.","Con `count(*)` saldría 1, porque cuenta la fila con `NULL`."]})
C+=ex("C2","Nombre y puesto de los empleados que no han gestionado ningún pedido.","`LEFT JOIN` y quédate con las filas donde la PK de `pedidos` es `NULL`.",
 {"tablas":[T("empleados","e",["id_empleado","nombre","puesto"]),T("pedidos","p",["id_pedido","id_empleado"])],"joins":[{"tipo":"left","on":["p.id_empleado","e.id_empleado"]}],
  "where":[{"col":"p.id_pedido","op":"is null"}],"sel":["e.nombre","e.puesto"],"orden":["nombre"],
  "idea":"Patrón del huérfano: `LEFT JOIN` + `WHERE derecha.pk IS NULL`.",
  "porque":["Los empleados con pedidos tienen `id_pedido`; los que no, `NULL` (∅). El `WHERE` se queda con los segundos.","Salen ((empleados|Carmen Rojas)), ((empleados|Rosa Gil)) y ((empleados|Tomás Vidal))."]})
C+=ex("C3","Id y nombre de los productos que nunca se han vendido.","El mismo patrón: `LEFT JOIN` con `lineas_pedido` y `IS NULL`.",
 {"tablas":[T("productos","pr",["id_producto","nombre"]),T("lineas_pedido","l",["id_pedido","id_producto","cantidad"])],"joins":[{"tipo":"left","on":["l.id_producto","pr.id_producto"]}],
  "where":[{"col":"l.id_pedido","op":"is null"}],"sel":["pr.id_producto","pr.nombre"],"orden":["id_producto"],
  "idea":"Misma pregunta que C2 con otras tablas: \"qué hay en A que no esté en B\".",
  "porque":["Los productos 11 y 12 no aparecen en ninguna línea de pedido: su pareja es `NULL` (∅).","Se mira una columna de ((lineas_pedido|lineas_pedido)) que nunca es `NULL` cuando hay pareja (`id_pedido`)."]})
C+=ex("C4","Nombre de cada empleado y número de pedidos que ha gestionado, del que más al que menos.","`LEFT JOIN` + `count(p.id_pedido)` + `GROUP BY`.",
 {"tablas":[T("empleados","e",["id_empleado","nombre"]),T("pedidos","p",["id_pedido","id_empleado"])],"joins":[{"tipo":"left","on":["p.id_empleado","e.id_empleado"]}],
  "sel":[{"col":"e.nombre","as":"empleado"},{"agg":"count","col":"p.id_pedido","as":"pedidos"}],"orden":["pedidos desc","empleado"],
  "idea":"Contar con `LEFT JOIN` muestra también los ceros.",
  "porque":["((empleados|Nuria Pons)) e ((empleados|Iván Lara)) gestionan 4 pedidos cada uno; los otros tres, 0.","Los pedidos 6 y 9 no tienen empleado: no pertenecen a nadie y no cuentan."]})
M.append(sec("ms-c","C · LEFT JOIN",[P("Todo lo de la tabla izquierda, tenga pareja o no. Practicas contar con ceros y buscar filas sin pareja.")]+C))

# D: RIGHT
D=[]
D+=ex("D1","Nombre de cada producto y unidades vendidas en total (los no vendidos, con NULL).","`RIGHT JOIN`: la tabla que lo conserva todo (`productos`) va a la derecha. Suma `l.cantidad`.",
 {"tablas":[T("lineas_pedido","l",["id_pedido","id_producto","cantidad"]),T("productos","pr",["id_producto","nombre"])],"joins":[{"tipo":"right","on":["l.id_producto","pr.id_producto"]}],
  "sel":[{"col":"pr.nombre","as":"producto"},{"agg":"sum","col":"l.cantidad","as":"unidades"}],"orden":["producto"],"maxFilas":14,
  "idea":"`RIGHT JOIN`: se conservan todos los productos (derecha), se hayan vendido o no.",
  "porque":["((productos|Hub USB-C 7 en 1)) y ((productos|SSD externo 1 TB)) no están en ninguna línea: salen con `unidades` a `NULL`, no a 0.","`sum` de un conjunto vacío es `NULL`. Para mostrar 0 hay que envolverlo: `coalesce(sum(l.cantidad), 0)`."]})
D+=ex("D2","Nombre de cada categoría y número de productos, usando un RIGHT JOIN.","Pon `productos` a la izquierda y `categorias` a la derecha.",
 {"tablas":[T("productos","pr",["id_producto","id_categoria","nombre"]),T("categorias","cat",["id_categoria","nombre"])],"joins":[{"tipo":"right","on":["pr.id_categoria","cat.id_categoria"]}],
  "sel":[{"col":"cat.nombre","as":"categoria"},{"agg":"count","col":"pr.id_producto","as":"productos"}],"orden":["productos desc","categoria"],
  "idea":"El mismo resultado que C1: un `RIGHT JOIN` es un `LEFT JOIN` con las tablas cambiadas de sitio.",
  "porque":["Lo que cambia es el orden en que se escriben las tablas, no el resultado.","Por claridad se prefiere `LEFT JOIN`: se lee de izquierda a derecha, de lo principal a lo secundario."]})
D+=ex("D3","Nombre de los clientes que no tienen ningún pedido, usando un RIGHT JOIN.","`pedidos` a la izquierda, `clientes` a la derecha y `IS NULL` sobre la PK de `pedidos`.",
 {"tablas":[T("pedidos","p",["id_pedido","id_cliente"]),T("clientes","c",["id_cliente","nombre"])],"joins":[{"tipo":"right","on":["p.id_cliente","c.id_cliente"]}],
  "where":[{"col":"p.id_pedido","op":"is null"}],"sel":["c.nombre"],"orden":["nombre"],
  "idea":"El patrón del huérfano con los lados invertidos.",
  "porque":["Se conservan todos los clientes (derecha). Los que no tienen pedido llevan `NULL` en `p.id_pedido` (∅).","Salen ((clientes|Andrea)) y ((clientes|Diego))."]})
M.append(sec("ms-d","D · RIGHT JOIN",[P("Lo mismo que `LEFT JOIN` con las tablas al revés. Practicas a leerlo y a reescribirlo.")]+D))

# E: cálculos
def cents(c): return "Math.round("+c+"*100)"
E=[]
E+=ex("E1","Nombre, precio y precio con IVA (21 %) de los 5 productos activos más caros con IVA.","Multiplica por `1.21` y redondea con `round(…, 2)`. Ordena por el alias del cálculo.",
 {"tablas":[T("productos","pr",["id_producto","nombre","precio","activo"])],"where":[{"col":"pr.activo","op":"=","val":True}],
  "sel":["pr.nombre","pr.precio",{"expr":"round(pr.precio * 1.21, 2)","as":"precio_iva","t":"pr","why":"el precio por 1,21 redondeado a 2 decimales","dec":2,"calc":JS("(g) => Math.round(Math.round(g('pr', 'precio') * 100) * 121 / 100) / 100")}],"orden":["precio_iva desc"],"limite":5,
  "idea":"Operador `*` + función `round`: una expresión se calcula **fila a fila** y se le pone un alias.",
  "porque":["Para cada fila de ((productos|productos)) se calcula `precio * 1.21` y se redondea a 2 decimales.","Se puede ordenar por el alias (`precio_iva`) porque `ORDER BY` se ejecuta después de `SELECT`."]})
E+=ex("E2","Nombre y valor del stock (precio × unidades) de los 5 productos con más valor almacenado.","Multiplica dos columnas: `precio * stock`.",
 {"tablas":[T("productos","pr",["id_producto","nombre","precio","stock"])],
  "sel":["pr.nombre","pr.precio","pr.stock",{"expr":"pr.precio * pr.stock","as":"valor_stock","t":"pr","why":"precio por unidades en almacén","dec":2,"calc":JS("(g) => Math.round(g('pr', 'precio') * 100) * g('pr', 'stock') / 100")}],"orden":["valor_stock desc"],"limite":5,
  "idea":"Un operador puede combinar **dos columnas** de la misma fila.",
  "porque":["`precio * stock` se calcula en cada fila: 649.00 × 12 = 7788.00 para el portátil.","El resultado conserva los decimales de `precio` porque es `NUMERIC`."]})
E+=ex("E3","Producto, precio actual, precio vendido y diferencia de las 4 líneas que se vendieron más baratas que el precio actual.","Resta dos columnas de tablas distintas: `pr.precio - l.precio_unitario`.",
 {"tablas":[T("lineas_pedido","l",["id_pedido","id_producto","precio_unitario"]),T("productos","pr",["id_producto","nombre","precio"])],"joins":[{"tipo":"inner","on":["pr.id_producto","l.id_producto"]}],
  "sel":[{"col":"pr.nombre","as":"producto"},"pr.precio","l.precio_unitario",{"expr":"pr.precio - l.precio_unitario","as":"diferencia","t":"pr","why":"precio actual menos precio al que se vendió","dec":2,"calc":JS("(g) => (Math.round(g('pr', 'precio') * 100) - Math.round(g('l', 'precio_unitario') * 100)) / 100")}],"orden":["diferencia desc"],"limite":4,"soloUsadas":False,
  "idea":"Un cálculo puede mezclar columnas de las dos tablas unidas.",
  "porque":["El `JOIN` pone en la misma fila el precio **actual** (((productos|productos))) y el precio **al que se vendió** (((lineas_pedido|lineas_pedido))).","Una diferencia negativa significa que se vendió más caro que el precio de hoy."]})
E+=ex("E4","Por cada pedido: número de líneas, unidades, total de líneas y media por línea (2 decimales).","`JOIN` con `lineas_pedido` y `GROUP BY` el pedido. Usa `count`, `sum` y `round(avg(…), 2)`.",
 {"tablas":[T("pedidos","p",["id_pedido","estado"]),T("lineas_pedido","l",["id_pedido","cantidad","subtotal"])],"joins":[{"tipo":"inner","on":["l.id_pedido","p.id_pedido"]}],
  "sel":["p.id_pedido",{"agg":"count","col":"*","t":"l","as":"lineas"},{"agg":"sum","col":"l.cantidad","as":"unidades"},{"agg":"sum","col":"l.subtotal","as":"total_lineas"},{"agg":"avg","col":"l.subtotal","round":2,"as":"media_linea"}],"orden":["id_pedido"],"maxFilas":10,
  "idea":"Las funciones agregadas calculan **sobre varias filas** y devuelven una por grupo.",
  "porque":["`group by p.id_pedido` junta las líneas de cada pedido; las agregadas calculan dentro de cada grupo.","`avg` devuelve muchos decimales: `round(…, 2)` los deja en 2."]})
E+=ex("E5","Nombre completo y email en mayúsculas de los clientes, ordenados por nombre.","Une `nombre` y `apellidos` con `||` (y un espacio en medio) y usa `upper`.",
 {"tablas":[T("clientes","c",["id_cliente","nombre","apellidos","email"])],
  "sel":[{"expr":"c.nombre || ' ' || c.apellidos","as":"nombre_completo","t":"c","why":"nombre, espacio y apellidos","calc":JS("(g) => g('c', 'nombre') + ' ' + g('c', 'apellidos')")},{"expr":"upper(c.email)","as":"email_mayus","t":"c","why":"el email en mayúsculas","calc":JS("(g) => g('c', 'email').toUpperCase()")}],"orden":["nombre_completo"],"maxFilas":8,
  "idea":"`||` concatena texto; `upper` es una función de texto.",
  "porque":["`c.nombre || ' ' || c.apellidos` pega tres trozos: el espacio hay que ponerlo tú.","Si alguno de los trozos fuera `NULL`, todo el resultado sería `NULL`: `||` no ignora los vacíos."]})
E+=ex("E6","Nombre, fecha de alta y días en catálogo (a 3 de octubre de 2026) de los 5 productos más antiguos.","Restar dos fechas da un número de días: `DATE '2026-10-03' - fecha_alta`.",
 {"tablas":[T("productos","pr",["id_producto","nombre","fecha_alta"])],
  "sel":["pr.nombre","pr.fecha_alta",{"expr":"DATE '2026-10-03' - pr.fecha_alta","as":"dias_en_catalogo","t":"pr","why":"días entre el alta y el 3 de octubre de 2026","calc":JS("(g) => Math.round((Date.UTC(2026, 9, 3) - Date.parse(g('pr', 'fecha_alta') + 'T00:00:00Z')) / 86400000)")}],"orden":["dias_en_catalogo desc"],"limite":5,
  "idea":"Fecha − fecha = número de días.",
  "porque":["Las dos fechas son de tipo `DATE`: la resta devuelve un entero (días).","`DATE '2026-10-03'` fija la fecha del ejercicio; con `CURRENT_DATE` usarías la de hoy."]})
E+=ex("E7","Id de cada pedido, resto de dividirlo entre 2 y su mitad entera.","`%` es el resto y `/` entre dos enteros descarta los decimales.",
 {"tablas":[T("pedidos","p",["id_pedido"])],
  "sel":["p.id_pedido",{"expr":"p.id_pedido % 2","as":"resto","t":"p","why":"resto de dividir entre 2 (0 si es par)","calc":JS("(g) => g('p', 'id_pedido') % 2")},{"expr":"p.id_pedido / 2","as":"mitad_entera","t":"p","why":"división entera: sin decimales","calc":JS("(g) => Math.trunc(g('p', 'id_pedido') / 2)")}],"orden":["id_pedido"],
  "idea":"`id_pedido` es un entero, así que `/ 2` no da decimales: 7 / 2 = 3.",
  "porque":["`%` devuelve el resto: 0 en los pares, 1 en los impares.","Para una mitad con decimales: `id_pedido / 2.0`."]})
E+=ex("E8","Nombre, stock y disponibilidad de cada producto: agotado, quedan pocos (menos de 5) o disponible.","`CASE WHEN … THEN … ELSE … END`.",
 {"tablas":[T("productos","pr",["id_producto","nombre","stock"])],
  "sel":["pr.nombre","pr.stock",{"expr":"CASE WHEN pr.stock = 0 THEN 'agotado' WHEN pr.stock < 5 THEN 'quedan pocos' ELSE 'disponible' END","as":"disponibilidad","t":"pr","why":"un texto según el stock","calc":JS("(g) => g('pr', 'stock') === 0 ? 'agotado' : g('pr', 'stock') < 5 ? 'quedan pocos' : 'disponible'")}],"orden":["stock","nombre"],"maxFilas":12,
  "idea":"`CASE` es el if/else de SQL: se evalúan los `WHEN` en orden y gana el primero que se cumple.",
  "porque":["((productos|Webcam Full HD)) tiene stock 0: es la primera condición.","El `ELSE` recoge todo lo que no ha cumplido ningún `WHEN`."]})
E+=ex("E9","Por categoría: número de productos, precio medio (2 decimales) y precio máximo. Incluye las categorías sin productos.","`LEFT JOIN` desde `categorias` y tres agregadas.",
 {"tablas":[T("categorias","cat",["id_categoria","nombre"]),T("productos","pr",["id_producto","id_categoria","precio"])],"joins":[{"tipo":"left","on":["pr.id_categoria","cat.id_categoria"]}],
  "sel":[{"col":"cat.nombre","as":"categoria"},{"agg":"count","col":"pr.id_producto","as":"productos"},{"agg":"avg","col":"pr.precio","round":2,"as":"precio_medio"},{"agg":"max","col":"pr.precio","as":"mas_caro"}],"orden":["categoria"],
  "idea":"Tres funciones agregadas en la misma consulta, y un `LEFT JOIN` para no perder categorías.",
  "porque":["((categorias|Gaming)) no tiene productos: `count` da 0, pero `avg` y `max` dan `NULL` porque no hay valores.","`avg` ignora los `NULL`; si hubiera productos sin precio, no entrarían en la media."]})
E+=ex("E10","Nombre de cada cliente y su teléfono; si no tiene, el texto \"sin teléfono\".","`coalesce(columna, valor_si_es_null)`.",
 {"tablas":[T("clientes","c",["id_cliente","nombre","telefono"])],
  "sel":["c.nombre",{"expr":"coalesce(c.telefono, 'sin teléfono')","as":"telefono","t":"c","why":"el teléfono o un texto si no hay","calc":JS("(g) => g('c', 'telefono') ?? 'sin teléfono'")}],"orden":["nombre"],"maxFilas":8,
  "idea":"`coalesce` devuelve el primer valor que no es `NULL`.",
  "porque":["Para ((clientes|Marcos)), ((clientes|Sara)) y ((clientes|Andrea)) el teléfono es `NULL` y se sustituye por el texto.","Es la forma de que un `NULL` no rompa un cálculo o una pantalla."]})
M.append(sec("ms-e","E · Cálculos: operadores y funciones",[P("Operadores aritméticos y funciones dentro de la consulta. Ten abierta la [chuleta de cálculos](@ch-aritmeticos) mientras practicas: cada ejercicio usa al menos un operador y una función.")]+E))

ms={"resumen":"SELECT · INNER · LEFT · RIGHT · cálculos","secciones":[sec("ms-intro","Cómo funcionan estas misiones",[
 P("Cada ejercicio trae un **enunciado**, una **pista**, un editor para tu intento (ejecuta PostgreSQL de verdad) y una **solución desplegable** explicada con el mismo sistema de colores que el módulo de JOIN: un color por tabla, el `ON` sombreado y el resultado calculado."),
 {"lista":["**A · SELECT simples**: una tabla (`WHERE`, `ORDER BY`, `LIMIT`, `IN`, `LIKE`, `IS NULL`).","**B · INNER JOIN**: dos tablas, solo filas con pareja.","**C · LEFT JOIN**: todo lo de la izquierda; contar con ceros y buscar huérfanos.","**D · RIGHT JOIN**: lo mismo con las tablas al revés.","**E · Cálculos**: operadores aritméticos y funciones de texto, número, fecha y agregadas."]},
 {"join":"leyenda"},
 {"sub":"Practicar ejercicios de SQL: select, where, join, inner join, left join, right join, operadores, funciones, calcular, redondear, count, sum, avg."},
])]+M}
open(str(__import__('pathlib').Path(__file__).resolve().parent.parent / 'content') + '/sql-mision.js','w').write("/* Misiones de consultas: ejercicios guiados con solución explicada (color por tabla). */\n(function () {\n  APP.register({ slug: \"sql\", contenido: { \"mod-21\": "+finish(ms).replace("\n","\n  ")+" } });\n})();\n")
print('ok',len(finish(ms)))

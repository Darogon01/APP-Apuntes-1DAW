/* Contenido de sql generado a partir de la chuleta de referencia (scripts/convert.py) y revisado a mano. */
(function () {
  const mods = {
 "mod-db": {
  "resumen": "",
  "secciones": [
   {
    "id": "bd-cargar",
    "titulo": "Cargarla en pgAdmin",
    "bloques": [
     {
      "lista": [
       "Query Tool sobre la BD `postgres` → `CREATE DATABASE tienda_online;` → `F5`.",
       "Clic derecho en Databases → **Refresh**.",
       "Clic derecho en `tienda_online` → **Query Tool** → abrir [`sql/tienda_online.sql`](sql/tienda_online.sql) (`Ctrl+O`) → `F5`."
      ],
      "ordenada": true
     },
     {
      "p": "El script empieza borrando todo, así que puedes **volver a ejecutarlo** cuando quieras dejar los datos como al principio (por ejemplo, después de practicar `DELETE`)."
     }
    ]
   },
   {
    "id": "bd-diagrama",
    "titulo": "Diagrama",
    "bloques": [
     {
      "consola": "categorias  ||──o{  productos       \"clasifica\"\nproductos   ||──o{  lineas_pedido   \"aparece en\"\npedidos     ||──|{  lineas_pedido   \"contiene\"\nclientes    ||──o{  pedidos         \"realiza\"\nempleados   |o──o{  pedidos         \"gestiona\"\nempleados   |o──o{  empleados       \"es jefe de\""
     },
     {
      "tabla": {
       "cabs": [
        "Tabla",
        "Columnas (PK clave primaria · FK clave foránea · UK única)"
       ],
       "filas": [
        [
         "`categorias`",
         "`id_categoria` PK · `nombre` UK"
        ],
        [
         "`productos`",
         "`id_producto` PK · `id_categoria` FK · `nombre` · `precio` · `stock` · `activo` · `fecha_alta`"
        ],
        [
         "`clientes`",
         "`id_cliente` PK · `nombre` · `apellidos` · `email` UK · `ciudad` (puede ser NULL) · `telefono` (puede ser NULL) · `fecha_registro`"
        ],
        [
         "`empleados`",
         "`id_empleado` PK · `nombre` · `puesto` · `id_jefe` FK (NULL = sin jefe) · `salario` · `fecha_contrato`"
        ],
        [
         "`pedidos`",
         "`id_pedido` PK · `id_cliente` FK · `id_empleado` FK (NULL = venta web) · `fecha` · `estado` (enum) · `gastos_envio`"
        ],
        [
         "`lineas_pedido`",
         "`id_pedido` PK,FK · `id_producto` PK,FK · `cantidad` · `precio_unitario` · `subtotal` (generada)"
        ]
       ]
      }
     },
     {
      "tabla": {
       "cabs": [
        "Tabla",
        "Filas",
        "Qué representa"
       ],
       "filas": [
        [
         "`categorias`",
         "5",
         "Gaming no tiene productos"
        ],
        [
         "`productos`",
         "12",
         "Hub USB-C y SSD externo nunca se han vendido; la Cafetera está descatalogada (`activo = false`)"
        ],
        [
         "`clientes`",
         "8",
         "Andrea y Diego no han hecho pedidos; varios sin teléfono o ciudad"
        ],
        [
         "`empleados`",
         "5",
         "Jerarquía: Carmen → Tomás → Nuria, Iván; Carmen → Rosa"
        ],
        [
         "`pedidos`",
         "10",
         "Estados variados; 2 pedidos sin empleado (venta web)"
        ],
        [
         "`lineas_pedido`",
         "18",
         "Tabla intermedia N:M con `cantidad` y `precio_unitario` del momento de la venta"
        ]
       ]
      }
     }
    ]
   }
  ],
  "intro": [
   {
    "p": "Todos los ejemplos (salvo los de creación de tablas) usan **`tienda_online`**, una tienda en línea con clientes, productos, pedidos y empleados. Los datos incluyen a propósito casos \"incómodos\": clientes sin pedidos, productos que nunca se han vendido, una categoría vacía, teléfonos a `NULL`, pedidos sin empleado… Son justo los que hacen fallar las consultas mal planteadas."
   }
  ]
 },
 "mod-00": {
  "resumen": "BD · SGBD · cliente-servidor · sublenguajes",
  "secciones": [
   {
    "id": "sgbd",
    "titulo": "BD, SGBD y compañía",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Término",
        "Qué es",
        "En tu entorno"
       ],
       "filas": [
        [
         "**Base de datos (BD)**",
         "Conjunto organizado de datos relacionados",
         "`tienda_online`, `clinica_plus`"
        ],
        [
         "**SGBD** (gestor de bases de datos)",
         "Software que guarda los datos, ejecuta SQL y controla accesos, usuarios y transacciones",
         "**PostgreSQL**"
        ],
        [
         "**Cliente**",
         "Programa que se conecta al SGBD para mandarle órdenes",
         "**pgAdmin 4** (gráfico), **psql** (terminal), tu aplicación Java"
        ],
        [
         "**BD relacional**",
         "Los datos se guardan en tablas relacionadas mediante claves",
         "PostgreSQL, MySQL, Oracle, SQL Server"
        ],
        [
         "**SQL**",
         "Lenguaje estándar para hablar con una BD relacional",
         "`SELECT`, `CREATE TABLE`…"
        ],
        [
         "**NoSQL**",
         "BD no basadas en tablas: documentos, clave-valor, grafos",
         "MongoDB, Redis, Neo4j"
        ]
       ]
      }
     },
     {
      "nota": "**pgAdmin no es la base de datos.** Es solo un cliente con ventanas. PostgreSQL funciona igual sin pgAdmin: es un servicio en segundo plano que escucha en el puerto **5432**.",
      "tipo": "note"
     }
    ]
   },
   {
    "id": "cliente-servidor",
    "titulo": "Arquitectura cliente-servidor",
    "bloques": [
     {
      "consola": " ┌──────────────┐   servidor · puerto · usuario · contraseña · BD   ┌──────────────────┐\n │  pgAdmin 4   │ ────────────────────────────────────────────────▶ │                  │\n │  psql        │            SQL  ───────────────────────▶          │   PostgreSQL     │\n │  App Java    │            ◀───────────────────────  filas        │   (servicio)     │\n └──────────────┘                                                   │   :5432          │\n     CLIENTES                                                       └──────────────────┘"
     },
     {
      "p": "Para conectarse siempre hacen falta 5 datos: **servidor** (`localhost`), **puerto** (`5432`), **usuario** (`postgres`), **contraseña** y **base de datos**."
     }
    ]
   },
   {
    "id": "jerarquia",
    "titulo": "Jerarquía de objetos",
    "bloques": [
     {
      "consola": "Servidor (PostgreSQL 18)\n└── Base de datos   (tienda_online)        ← siempre te conectas a UNA base de datos concreta\n    └── Esquema      (public)               ← \"carpeta\"; toda BD nueva trae public\n        ├── Tablas   (clientes, pedidos…)\n        ├── Vistas\n        ├── Funciones / procedimientos\n        ├── Secuencias\n        └── Tipos    (estado_pedido)"
     },
     {
      "p": "La BD **`postgres`** existe para que siempre haya una a la que conectarse: desde ella se crean y borran las demás bases de datos."
     }
    ]
   },
   {
    "id": "sublenguajes",
    "titulo": "Sublenguajes de SQL",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Sublenguaje",
        "Para qué",
        "Sentencias",
        "Módulo"
       ],
       "filas": [
        [
         "**DDL** (Data Definition)",
         "Definir la estructura",
         "`CREATE`, `ALTER`, `DROP`, `TRUNCATE`",
         "[05](@mod-05) · [07](@mod-07)"
        ],
        [
         "**DML** (Data Manipulation)",
         "Modificar los datos",
         "`INSERT`, `UPDATE`, `DELETE`",
         "[08](@mod-08)"
        ],
        [
         "**DQL** (Data Query)",
         "Consultar los datos",
         "`SELECT`",
         "[09](@mod-09) – [13](@mod-13)"
        ],
        [
         "**DCL** (Data Control)",
         "Permisos",
         "`GRANT`, `REVOKE`",
         "[16](@mod-16)"
        ],
        [
         "**TCL** (Transaction Control)",
         "Transacciones",
         "`BEGIN`, `COMMIT`, `ROLLBACK`",
         "[15](@mod-15)"
        ]
       ]
      }
     },
     {
      "nota": "SQL no distingue mayúsculas en palabras clave ni en nombres: `select`, `SELECT` y `Select` son iguales. La convención es **palabras clave en MAYÚSCULAS** y **nombres en minúsculas_con_guion_bajo** (`id_cliente`). Así lo verás en esta chuleta.",
      "tipo": "tip"
     }
    ]
   }
  ]
 },
 "mod-01": {
  "resumen": "Object Explorer · Query Tool · ERD · psql",
  "secciones": [
   {
    "id": "pgadmin-interfaz",
    "titulo": "Interfaz",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Zona",
        "Para qué"
       ],
       "filas": [
        [
         "**Object Explorer** (árbol izquierdo)",
         "Navegar: Servers → PostgreSQL 18 → Databases → tienda_online → Schemas → public → Tables"
        ],
        [
         "**Query Tool**",
         "Escribir y ejecutar SQL"
        ],
        [
         "**Data Output** (debajo del editor)",
         "Resultado de la consulta en forma de tabla"
        ],
        [
         "**Messages**",
         "Mensajes: filas afectadas, tiempo, errores"
        ],
        [
         "**Query History**",
         "Consultas ejecutadas anteriormente"
        ]
       ]
      }
     },
     {
      "nota": "pgAdmin **no refresca solo** el árbol. Después de un `CREATE` o `DROP` hecho con SQL, clic derecho → **Refresh** (o `F5` con el árbol seleccionado) para ver el cambio.",
      "tipo": "important"
     }
    ]
   },
   {
    "id": "query-tool",
    "titulo": "Query Tool",
    "bloques": [
     {
      "lista": [
       "Se abre con clic derecho sobre una **base de datos** → Query Tool. La pestaña indica dónde estás: `bd/usuario@servidor` (por ejemplo `tienda_online/postgres@PostgreSQL 18`).",
       "**El SQL se ejecuta en la BD de esa pestaña.** Si creas tablas con la Query Tool abierta en `postgres`, se crean en `postgres`.",
       "`CREATE DATABASE` y `DROP DATABASE` se lanzan desde una Query Tool abierta en **otra** BD (normalmente `postgres`).",
       "Si seleccionas un trozo de código y pulsas `F5`, **solo se ejecuta lo seleccionado**. Así puedes tener un script largo y lanzar sentencia a sentencia.",
       "Si ejecutas varios `SELECT` a la vez, Data Output muestra solo el resultado del **último**.",
       "**Ver datos sin SQL:** clic derecho en la tabla → View/Edit Data → All Rows.",
       "**Ver el SQL que creó una tabla:** selecciona la tabla → pestaña **SQL** del panel derecho. Sirve para descubrir los nombres automáticos de las restricciones."
      ]
     }
    ]
   },
   {
    "id": "atajos",
    "titulo": "Atajos de teclado",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Atajo",
        "Dónde",
        "Acción"
       ],
       "filas": [
        [
         "`F5`",
         "Query Tool",
         "Ejecutar (todo o la selección)"
        ],
        [
         "`F7` / `Shift+F7`",
         "Query Tool",
         "`EXPLAIN` / `EXPLAIN ANALYZE` de la consulta"
        ],
        [
         "`F8`",
         "Query Tool",
         "Descargar el resultado como CSV"
        ],
        [
         "`Ctrl+/`",
         "Query Tool",
         "Comentar / descomentar líneas"
        ],
        [
         "`Ctrl+Espacio`",
         "Query Tool",
         "Autocompletar nombres de tablas y columnas"
        ],
        [
         "`Ctrl+O` / `Ctrl+S`",
         "Query Tool",
         "Abrir / guardar archivo `.sql`"
        ],
        [
         "`Ctrl+F`",
         "Query Tool",
         "Buscar"
        ],
        [
         "`F5`",
         "Object Explorer",
         "Refrescar el árbol"
        ],
        [
         "`Alt+Shift+Q`",
         "Object Explorer",
         "Abrir Query Tool en lo seleccionado"
        ],
        [
         "`Alt+Shift+D`",
         "Object Explorer",
         "Borrar el objeto seleccionado"
        ]
       ]
      }
     },
     {
      "sub": "Se pueden cambiar en File → Preferences → Keyboard shortcuts."
     }
    ]
   },
   {
    "id": "erd-tool",
    "titulo": "ERD Tool (diagramas → SQL)",
    "bloques": [
     {
      "p": "Clic derecho en una BD → **ERD For Database**. Dibuja el diagrama de las tablas que ya existen. Desde cero, también se puede crear con Tools → ERD Tool."
     },
     {
      "tabla": {
       "cabs": [
        "Acción",
        "Cómo"
       ],
       "filas": [
        [
         "Añadir tabla",
         "Botón **+** o doble clic en el lienzo"
        ],
        [
         "Relación 1:N",
         "Botón **1M**: elige la tabla y la columna local y la tabla y columna referenciada"
        ],
        [
         "Relación N:M",
         "Botón **MM**: crea sola la tabla intermedia"
        ],
        [
         "Generar el SQL",
         "Botón **Generate SQL**: abre una Query Tool con todos los `CREATE TABLE`"
        ],
        [
         "Guardar",
         "Archivo `.pgerd` (solo lo abre pgAdmin)"
        ]
       ]
      }
     },
     {
      "nota": "El SQL que genera el ERD Tool es un buen modo de **comprobar tu script**: diseña con el diagrama, genera el SQL y compáralo con el tuyo.",
      "tipo": "tip"
     }
    ]
   },
   {
    "id": "psql",
    "titulo": "psql (consola)",
    "bloques": [
     {
      "p": "En pgAdmin: clic derecho en una BD → **PSQL Tool**. Los comandos con barra `\\` son **solo de psql**: no funcionan en la Query Tool."
     },
     {
      "tabla": {
       "cabs": [
        "Comando",
        "Hace"
       ],
       "filas": [
        [
         "`\\l`",
         "Listar bases de datos"
        ],
        [
         "`\\c tienda_online`",
         "Conectarse a otra BD"
        ],
        [
         "`\\dt`",
         "Listar tablas"
        ],
        [
         "`\\d clientes`",
         "Estructura de una tabla (columnas, restricciones, índices)"
        ],
        [
         "`\\dT+`",
         "Listar tipos (ENUM incluidos)"
        ],
        [
         "`\\dv` · `\\df` · `\\du` · `\\dn`",
         "Vistas · funciones · usuarios · esquemas"
        ],
        [
         "`\\i ruta/script.sql`",
         "Ejecutar un archivo"
        ],
        [
         "`\\x`",
         "Alternar vista vertical (útil con tablas anchas)"
        ],
        [
         "`\\q`",
         "Salir"
        ]
       ]
      }
     }
    ]
   }
  ]
 },
 "mod-02": {
  "resumen": "entidades · atributos · relaciones · cardinalidad",
  "secciones": [
   {
    "id": "er-elementos",
    "titulo": "Elementos (notación Chen)",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Elemento",
        "Qué es",
        "Símbolo",
        "Ejemplo"
       ],
       "filas": [
        [
         "**Entidad**",
         "Objeto o concepto del mundo real, con existencia propia, del que se guarda información",
         "Rectángulo",
         "`PACIENTE`, `PEDIDO`"
        ],
        [
         "**Atributo**",
         "Característica que describe a una entidad",
         "Óvalo",
         "`nombre`, `fecha`"
        ],
        [
         "**Clave primaria**",
         "Atributo (o combinación) que identifica **de forma única** cada instancia",
         "Óvalo con el nombre **subrayado**",
         "`DNI`, `id_pedido`"
        ],
        [
         "**Relación**",
         "Vínculo con significado entre entidades, normalmente un **verbo**",
         "Rombo",
         "Hace, Atiende, Matricula"
        ],
        [
         "**Cardinalidad**",
         "Cuántas instancias de una entidad se asocian con cuántas de la otra",
         "`1` / `N` en las líneas",
         "`1:N`"
        ]
       ]
      }
     },
     {
      "consola": " CLIENTE ──1── <Hace> ──N── PEDIDO\n   │                        │\n   ├ id_cliente (PK)        ├ id_pedido (PK)\n   ├ nombre                 ├ fecha\n   └ email                  └ total"
     },
     {
      "sub": "\"Un cliente **hace** N pedidos; cada pedido lo hace 1 cliente\"."
     }
    ]
   },
   {
    "id": "er-atributos",
    "titulo": "Tipos de atributo",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Tipo",
        "Qué es",
        "Ejemplo",
        "Cómo pasa a tablas"
       ],
       "filas": [
        [
         "**Simple**",
         "Un único valor indivisible",
         "`dni`",
         "Una columna"
        ],
        [
         "**Compuesto**",
         "Se divide en partes",
         "`dirección` = calle + número + CP + ciudad",
         "Una columna por parte"
        ],
        [
         "**Multivaluado**",
         "Puede tener varios valores",
         "`teléfonos` de un cliente",
         "**Tabla aparte** con FK"
        ],
        [
         "**Derivado**",
         "Se calcula a partir de otros",
         "`edad` (de `fecha_nacimiento`), `total` (de las líneas)",
         "Normalmente no se guarda: se calcula en la consulta"
        ],
        [
         "**Opcional**",
         "Puede no tener valor",
         "`teléfono`",
         "Columna que admite `NULL`"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "er-cardinalidad",
    "titulo": "Cardinalidad",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Tipo",
        "Se lee",
        "Ejemplo real",
        "Pregunta para detectarla"
       ],
       "filas": [
        [
         "**1:1**",
         "Cada A con una B como máximo, y al revés",
         "Empleado — tiene — Puesto de parking",
         "¿Un A puede tener varias B? No. ¿Una B varios A? No"
        ],
        [
         "**1:N**",
         "Cada A con muchas B; cada B con una sola A",
         "Editorial — publica — Libro",
         "¿Un libro tiene varias editoriales? No. ¿Una editorial varios libros? Sí"
        ],
        [
         "**N:M**",
         "Cada A con muchas B y cada B con muchas A",
         "Alumno — se matricula en — Curso",
         "Las dos preguntas responden **sí**"
        ]
       ]
      }
     },
     {
      "nota": "**Truco de las dos preguntas:** pregunta en los dos sentidos \"¿uno de estos puede tener varios de aquellos?\". Dos \"no\" → `1:1`. Un \"sí\" → `1:N`. Dos \"sí\" → `N:M`.",
      "tipo": "tip"
     }
    ]
   },
   {
    "id": "er-participacion",
    "titulo": "Participación: (mínimo, máximo)",
    "bloques": [
     {
      "p": "La cardinalidad dice el **máximo**. La participación añade el **mínimo**: si es **obligatorio** (1) u **opcional** (0) estar relacionado. Se escribe `(mín, máx)` junto a cada entidad."
     },
     {
      "tabla": {
       "cabs": [
        "Frase del enunciado",
        "Participación"
       ],
       "filas": [
        [
         "\"Un cliente **puede** hacer varios pedidos\"",
         "`(0,N)`: puede no tener ninguno"
        ],
        [
         "\"El taller **solo da de alta** a un propietario **cuando trae al menos un** vehículo\"",
         "`(1,N)`: mínimo uno"
        ],
        [
         "\"Cada pedido pertenece a **un único** cliente\"",
         "`(1,1)`: exactamente uno"
        ],
        [
         "\"Un producto **puede no haberse vendido nunca**\"",
         "`(0,N)`"
        ]
       ]
      }
     },
     {
      "consola": " CLIENTE ──(1,1)── <Hace> ──(0,N)── PEDIDO"
     },
     {
      "sub": "Se lee cruzando el rombo: \"un PEDIDO lo hace mínimo 1 y máximo 1 CLIENTE\"; \"un CLIENTE hace mínimo 0 y máximo N PEDIDOS\"."
     },
     {
      "nota": "Hay varias notaciones y cambia en qué lado se escribe cada `(mín, máx)`. Usa la de tu profesor: en tus apuntes la cardinalidad aparece como `1` y `N` en los extremos de la relación. En SQL, el mínimo se traduce a `NOT NULL` (obligatorio) o a permitir `NULL` (opcional) en la clave foránea.",
      "tipo": "note"
     }
    ]
   },
   {
    "id": "er-atributos-relacion",
    "titulo": "Atributos de relación",
    "bloques": [
     {
      "p": "En una relación **N:M**, a veces hay datos que no son ni de una entidad ni de la otra, sino **del vínculo**. Ninguno de esos atributos es clave primaria."
     },
     {
      "tabla": {
       "cabs": [
        "Caso",
        "Entidades",
        "Atributos **de la relación**"
       ],
       "filas": [
        [
         "Matrícula en una academia",
         "ALUMNO — CURSO",
         "`fecha`, `nota_final`"
        ],
        [
         "Línea de pedido",
         "PEDIDO — PRODUCTO",
         "`cantidad`, `precio_unitario`"
        ],
        [
         "Reparto de una película",
         "PELÍCULA — ACTOR",
         "`personaje`"
        ],
        [
         "Consulta médica",
         "MÉDICO — PACIENTE",
         "`fecha`, `diagnóstico`"
        ]
       ]
      }
     },
     {
      "consola": " ALUMNO ──N── <Matricula en> ──N── CURSO\n                      │\n                      ├ fecha\n                      └ nota_final"
     },
     {
      "sub": "La nota no es \"del alumno\" (tiene una por curso) ni \"del curso\" (tiene una por alumno): es de la matrícula."
     }
    ]
   },
   {
    "id": "er-especiales",
    "titulo": "Casos especiales",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Caso",
        "Qué es",
        "Ejemplo",
        "Cómo se representa"
       ],
       "filas": [
        [
         "**Entidad débil**",
         "Solo existe si existe otra (la fuerte) y se identifica con ayuda de su clave",
         "`LÍNEA_FACTURA` depende de `FACTURA`; `HABITACIÓN` de `HOTEL`",
         "Doble rectángulo y rombo doble"
        ],
        [
         "**Relación reflexiva**",
         "Una entidad se relaciona consigo misma",
         "`EMPLEADO` es jefe de `EMPLEADO`",
         "Las dos líneas del rombo van a la misma entidad"
        ],
        [
         "**Relación ternaria**",
         "Relación entre tres entidades a la vez",
         "`PROFESOR` imparte `ASIGNATURA` en `AULA`",
         "Rombo con tres líneas"
        ],
        [
         "**Generalización (ES-UN)**",
         "Una entidad general y subtipos con atributos propios",
         "`PERSONA` → `ALUMNO`, `PROFESOR`",
         "Triángulo `ES-UN`"
        ]
       ]
      }
     },
     {
      "consola": " EMPLEADO ──1 (jefe)──────── <Es jefe de>\n     └─────N (subordinado)──────┘\n\n FACTURA ──1── <Tiene> ──N── LÍNEA_FACTURA (entidad débil)"
     }
    ]
   },
   {
    "id": "er-metodo",
    "titulo": "Método para pasar de enunciado a diagrama",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Paso",
        "Qué buscar en el texto",
        "Ejemplo: \"Una tienda guarda de cada cliente su id, nombre y email. Un cliente puede hacer varios pedidos; cada pedido es de un único cliente. Del pedido interesa la fecha y el total.\""
       ],
       "filas": [
        [
         "1",
         "**Sustantivos con datos propios** → entidades",
         "CLIENTE, PEDIDO"
        ],
        [
         "2",
         "**\"De cada X se guarda…\"** → atributos",
         "cliente: id, nombre, email · pedido: id, fecha, total"
        ],
        [
         "3",
         "Lo que identifica de forma única → clave primaria",
         "`id_cliente`, `id_pedido`"
        ],
        [
         "4",
         "**Verbos que unen entidades** → relaciones",
         "hace"
        ],
        [
         "5",
         "**\"varios\", \"uno solo\", \"al menos uno\", \"puede no\"** → cardinalidad y participación",
         "\"varios pedidos\" + \"un único cliente\" → `1:N`"
        ],
        [
         "6",
         "**\"De cada [vínculo] interesa…\"** → atributos de relación",
         "(no hay en este ejemplo)"
        ]
       ]
      }
     }
    ]
   }
  ],
  "intro": [
   {
    "p": "El modelo E/R es el **plano** de la base de datos: se dibuja **antes** de escribir SQL, a partir del enunciado. No depende del SGBD."
   }
  ]
 },
 "mod-03": {
  "resumen": "tablas · claves · paso desde E/R",
  "secciones": [
   {
    "id": "rel-vocabulario",
    "titulo": "Vocabulario",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Teoría",
        "Práctica",
        "Ejemplo"
       ],
       "filas": [
        [
         "Relación",
         "**Tabla**",
         "`clientes`"
        ],
        [
         "Tupla",
         "**Fila** (registro)",
         "Lucía, Fernández Gil…"
        ],
        [
         "Atributo",
         "**Columna** (campo)",
         "`email`"
        ],
        [
         "Dominio",
         "**Tipo** y valores permitidos",
         "`VARCHAR(100)`, `CHECK (precio > 0)`"
        ],
        [
         "Grado",
         "Número de columnas",
         "`clientes` tiene grado 7"
        ],
        [
         "Cardinalidad (de la tabla)",
         "Número de filas",
         "`clientes` tiene 8"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "rel-claves",
    "titulo": "Claves",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Clave",
        "Qué es",
        "Ejemplo en `clientes`"
       ],
       "filas": [
        [
         "**Superclave**",
         "Cualquier conjunto de columnas que identifica una fila",
         "`(id_cliente, nombre)`"
        ],
        [
         "**Candidata**",
         "Superclave mínima (no le sobra ninguna columna)",
         "`id_cliente`, `email`"
        ],
        [
         "**Primaria (PK)**",
         "La candidata elegida como identificador oficial",
         "`id_cliente`"
        ],
        [
         "**Alternativa**",
         "Candidata no elegida → se declara `UNIQUE`",
         "`email`"
        ],
        [
         "**Foránea (FK)**",
         "Columna que apunta a la PK de otra tabla (o de la misma)",
         "`pedidos.id_cliente → clientes.id_cliente`"
        ],
        [
         "**Natural**",
         "Dato real que ya identifica",
         "DNI, ISBN, matrícula"
        ],
        [
         "**Artificial / subrogada**",
         "Número sin significado generado por la BD",
         "`id_cliente` con `IDENTITY`"
        ]
       ]
      }
     },
     {
      "nota": "**¿Clave natural o artificial?** En la práctica se usa casi siempre una **artificial** (`id_… INTEGER GENERATED ALWAYS AS IDENTITY`) y la natural se declara `UNIQUE`. El DNI puede cambiar (o no existir, como en un bebé) y es largo para repetirlo como FK en otras tablas. Así lo hacen tus scripts: `id_paciente` como PK y `dni UNIQUE`.",
      "tipo": "tip"
     }
    ]
   },
   {
    "id": "rel-notacion",
    "titulo": "Notación textual",
    "bloques": [
     {
      "consola": "CLIENTES (id_cliente, nombre, email)                       PK subrayada (aquí: primera columna)\nPEDIDOS  (id_pedido, fecha, total, id_cliente*)            FK con * o en cursiva\n           id_cliente → CLIENTES"
     }
    ]
   },
   {
    "id": "rel-paso",
    "titulo": "Paso de E/R a tablas: reglas",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "En el E/R",
        "En el modelo relacional",
        "Ejemplo"
       ],
       "filas": [
        [
         "**Entidad**",
         "Tabla con sus atributos; la clave pasa a PK",
         "`CLIENTE` → `clientes`"
        ],
        [
         "**Relación 1:N**",
         "La PK del lado **1** viaja como **FK al lado N**",
         "`pedidos.id_cliente`"
        ],
        [
         "**Relación 1:1**",
         "FK en **cualquiera** de los lados (mejor en el opcional) + `UNIQUE`",
         "`plazas_parking.id_empleado UNIQUE`"
        ],
        [
         "**Relación N:M**",
         "**Tabla nueva** con las dos FK + los atributos de la relación",
         "`lineas_pedido (id_pedido, id_producto, cantidad, precio_unitario)`"
        ],
        [
         "**Atributo multivaluado**",
         "Tabla nueva con FK a la entidad",
         "`telefonos_cliente (id_cliente, telefono)`"
        ],
        [
         "**Atributo compuesto**",
         "Una columna por componente",
         "`calle`, `numero`, `cp`, `ciudad`"
        ],
        [
         "**Atributo derivado**",
         "No se guarda (se calcula) o columna generada",
         "`edad`, `subtotal`"
        ],
        [
         "**Entidad débil**",
         "Tabla cuya PK incluye la FK a la fuerte",
         "`lineas_factura (id_factura, num_linea, …)`"
        ],
        [
         "**Reflexiva 1:N**",
         "FK a la propia tabla",
         "`empleados.id_jefe → empleados`"
        ],
        [
         "**Participación obligatoria (1,…)** en el lado N",
         "FK `NOT NULL`",
         "`pedidos.id_cliente NOT NULL`"
        ],
        [
         "**Participación opcional (0,…)** en el lado N",
         "FK que admite `NULL`",
         "`pedidos.id_empleado`"
        ]
       ]
      }
     },
     {
      "p": "**Tabla intermedia N:M: dos formas válidas de definir la PK**"
     },
     {
      "tabla": {
       "cabs": [
        "Opción",
        "Definición",
        "Cuándo"
       ],
       "filas": [
        [
         "**A · PK compuesta**",
         "`PRIMARY KEY (id_pedido, id_producto)`",
         "Lo más directo: la pareja no se puede repetir. Así está `lineas_pedido`"
        ],
        [
         "**B · id propio + UNIQUE**",
         "`id_detalle … IDENTITY PRIMARY KEY` y `UNIQUE (id_pedido, id_libro)`",
         "Si otras tablas tienen que apuntar a la línea o se prefiere una PK simple. Así están tus `detalle_pedidos` y `citas`"
        ],
        [
         "B sin `UNIQUE`",
         "Solo `id` propio",
         "Cuando la pareja **sí** se puede repetir: un médico atiende al mismo paciente en fechas distintas"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "rel-ejemplo",
    "titulo": "Ejemplo completo: de enunciado a tablas",
    "bloques": [
     {
      "nota": "Una plataforma de streaming registra qué series ha visto cada usuario. De cada usuario se guarda un identificador, nombre y email. De cada serie, un código, título y género. Un usuario puede ver varias series y una serie puede ser vista por varios usuarios. De cada visualización interesa la fecha y la valoración.",
      "tipo": "note"
     },
     {
      "p": "**1 · E/R**"
     },
     {
      "consola": " USUARIO ──N── <Visualiza> ──N── SERIE\n   │                  │              │\n   ├ id_usuario (PK)  ├ fecha        ├ codigo (PK)\n   ├ nombre           └ valoracion   ├ titulo\n   └ email                           └ genero"
     },
     {
      "p": "**2 · Relacional**"
     },
     {
      "consola": "USUARIOS        (id_usuario, nombre, email)\nSERIES          (codigo, titulo, genero)\nVISUALIZACIONES (id_visualizacion, id_usuario*, codigo_serie*, fecha, valoracion)"
     },
     {
      "sub": "Se usa un id propio en `visualizaciones` porque un usuario puede volver a ver la misma serie otro día."
     },
     {
      "p": "**3 · SQL**"
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "CREATE TABLE usuarios (\n    id_usuario  INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n    nombre      VARCHAR(100) NOT NULL,\n    email       VARCHAR(100) NOT NULL UNIQUE\n);\n\nCREATE TABLE series (\n    codigo  VARCHAR(10) PRIMARY KEY,                -- clave natural: la da la plataforma\n    titulo  VARCHAR(150) NOT NULL,\n    genero  VARCHAR(30)\n);\n\nCREATE TABLE visualizaciones (\n    id_visualizacion  INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n    id_usuario        INTEGER NOT NULL REFERENCES usuarios (id_usuario),\n    codigo_serie      VARCHAR(10) NOT NULL REFERENCES series (codigo),\n    fecha             DATE NOT NULL DEFAULT CURRENT_DATE,\n    valoracion        SMALLINT CHECK (valoracion BETWEEN 1 AND 5)\n);"
      }
     }
    ]
   }
  ]
 },
 "mod-04": {
  "resumen": "1FN · 2FN · 3FN · eliminar redundancia",
  "secciones": [
   {
    "id": "norm-para-que",
    "titulo": "Para qué sirve",
    "bloques": [
     {
      "p": "Normalizar es reorganizar las tablas para que **cada dato esté guardado en un solo sitio**. Así se evitan las **anomalías**:"
     },
     {
      "tabla": {
       "cabs": [
        "Anomalía",
        "Qué pasa si el dato está repetido"
       ],
       "filas": [
        [
         "De **actualización**",
         "Cambias la ciudad de un cliente en una fila y se te olvida en las otras 20 → datos contradictorios"
        ],
        [
         "De **inserción**",
         "No puedes dar de alta un producto hasta que alguien lo compre (porque solo existe dentro de los pedidos)"
        ],
        [
         "De **borrado**",
         "Borras el único pedido de un cliente y desaparecen también sus datos"
        ]
       ]
      }
     },
     {
      "p": "**Tabla de partida (sin normalizar):**"
     },
     {
      "tabla": {
       "cabs": [
        "id_pedido",
        "fecha",
        "cliente",
        "ciudad_cliente",
        "productos"
       ],
       "filas": [
        [
         "1",
         "2026-01-15",
         "Lucía",
         "Madrid",
         "Portátil (649), Ratón (99)"
        ],
        [
         "3",
         "2026-03-22",
         "Lucía",
         "Madrid",
         "Auriculares (329)"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "1fn",
    "titulo": "1FN: valores atómicos",
    "bloques": [
     {
      "nota": "**Cada celda guarda un solo valor** (nada de listas) y no hay grupos repetidos (`producto1`, `producto2`, `producto3`…).",
      "tipo": "note"
     },
     {
      "tabla": {
       "cabs": [
        "id_pedido",
        "id_producto",
        "fecha",
        "cliente",
        "ciudad_cliente",
        "producto",
        "precio"
       ],
       "filas": [
        [
         "1",
         "1",
         "2026-01-15",
         "Lucía",
         "Madrid",
         "Portátil",
         "649"
        ],
        [
         "1",
         "4",
         "2026-01-15",
         "Lucía",
         "Madrid",
         "Ratón",
         "99"
        ],
        [
         "3",
         "6",
         "2026-03-22",
         "Lucía",
         "Madrid",
         "Auriculares",
         "329"
        ]
       ]
      }
     },
     {
      "sub": "PK: `(id_pedido, id_producto)`. Ya es 1FN, pero la fecha y Lucía se repiten."
     }
    ]
   },
   {
    "id": "2fn",
    "titulo": "2FN: nada depende de solo una parte de la clave",
    "bloques": [
     {
      "nota": "1FN + cada columna depende de **toda** la PK, no de una parte. **Solo puede fallar con PK compuesta.**",
      "tipo": "note"
     },
     {
      "lista": [
       "`fecha`, `cliente` y `ciudad_cliente` dependen solo de `id_pedido` → se van a **PEDIDOS**.",
       "`producto` depende solo de `id_producto` → se va a **PRODUCTOS**.",
       "`precio` (el de la venta) sí depende de las dos → se queda en **LÍNEAS**."
      ]
     },
     {
      "consola": "PEDIDOS   (id_pedido, fecha, cliente, ciudad_cliente)\nPRODUCTOS (id_producto, nombre)\nLINEAS    (id_pedido*, id_producto*, precio)"
     }
    ]
   },
   {
    "id": "3fn",
    "titulo": "3FN: nada depende de otra columna que no sea la clave",
    "bloques": [
     {
      "nota": "2FN + ninguna columna depende de **otra columna no clave** (dependencia transitiva).",
      "tipo": "note"
     },
     {
      "p": "`ciudad_cliente` depende del cliente, no del pedido (`id_pedido → cliente → ciudad`) → se va a **CLIENTES**."
     },
     {
      "consola": "CLIENTES  (id_cliente, nombre, ciudad)\nPEDIDOS   (id_pedido, fecha, id_cliente*)\nPRODUCTOS (id_producto, nombre)\nLINEAS    (id_pedido*, id_producto*, precio)"
     },
     {
      "sub": "Es justo la estructura de `tienda_online`."
     }
    ]
   },
   {
    "id": "norm-resumen",
    "titulo": "Resumen",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Forma",
        "Regla en una frase",
        "Señal de que no se cumple"
       ],
       "filas": [
        [
         "**1FN**",
         "Una celda = un valor",
         "Comas dentro de una celda, columnas `telefono1`, `telefono2`"
        ],
        [
         "**2FN**",
         "Todo depende de **toda** la clave",
         "Con PK compuesta, una columna que se repite cada vez que se repite **una** de las partes"
        ],
        [
         "**3FN**",
         "Todo depende **solo** de la clave",
         "Una columna que se puede deducir de otra que no es la PK (`cp → ciudad`)"
        ],
        [
         "**FNBC**",
         "Todo determinante es clave candidata",
         "Casos raros; con 3FN bien hecha casi siempre se cumple"
        ]
       ]
      }
     },
     {
      "nota": "Regla para recordarlo: cada columna depende de **la clave** (1FN), de **toda la clave** (2FN) y de **nada más que la clave** (3FN).",
      "tipo": "tip"
     },
     {
      "nota": "A veces se **desnormaliza** a propósito por rendimiento o por historia: `lineas_pedido.precio_unitario` repite el precio del producto, pero guarda el del **momento de la venta**, que puede no coincidir con el actual.",
      "tipo": "note"
     }
    ]
   }
  ]
 },
 "mod-05": {
  "resumen": "CREATE · ALTER · DROP · TRUNCATE",
  "secciones": [
   {
    "id": "ddl-database",
    "titulo": "Bases de datos",
    "bloques": [
     {
      "code": "-- Desde una Query Tool abierta en OTRA base de datos (normalmente postgres)\nCREATE DATABASE vuelos;\n\nDROP DATABASE vuelos;\nDROP DATABASE IF EXISTS vuelos;                -- no da error si no existe\nDROP DATABASE vuelos WITH (FORCE);             -- cierra las conexiones abiertas y la borra\n\nALTER DATABASE vuelos RENAME TO aerolinea;",
      "lang": "sql"
     },
     {
      "aviso": "- `CREATE DATABASE` y `DROP DATABASE` **no se pueden ejecutar dentro de una transacción** ni seleccionados junto con otras sentencias del script. Lánzalos solos. - No puedes borrar la BD en la que estás conectado (\"no se puede eliminar la base de datos activa\") → cambia de Query Tool a `postgres`. - Si alguna pestaña de pgAdmin sigue conectada, el `DROP` falla con \"la base de datos «x» está siendo utilizada por otros usuarios\" → `WITH (FORCE)` o clic derecho → Disconnect from database.",
      "tipo": "warning"
     }
    ]
   },
   {
    "id": "ddl-schema",
    "titulo": "Esquemas",
    "bloques": [
     {
      "p": "Un esquema es una carpeta dentro de la BD. Toda BD nueva trae `public` y, si no indicas otro, todo se crea allí."
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "CREATE SCHEMA ventas;\nCREATE TABLE ventas.facturas (id INTEGER PRIMARY KEY);   -- esquema.tabla\nDROP SCHEMA ventas CASCADE;                              -- borra el esquema y todo lo que contiene"
      }
     }
    ]
   },
   {
    "id": "ddl-create",
    "titulo": "CREATE TABLE",
    "bloques": [
     {
      "code": "CREATE TABLE nombre_tabla (\n    columna1  TIPO  [restricciones],\n    columna2  TIPO  [restricciones],\n    ...\n    [restricciones de tabla]        -- las que afectan a varias columnas\n);                                  -- ✖ sin coma después de la última línea",
      "lang": "sql"
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "-- Mascotas de una clínica veterinaria\nCREATE TABLE mascotas (\n    id_mascota        INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n    nombre            VARCHAR(50)  NOT NULL,\n    especie           VARCHAR(40)  NOT NULL,\n    fecha_nacimiento  DATE,\n    peso_kg           NUMERIC(4,1) CHECK (peso_kg > 0),     -- 999.9 como máximo\n    vacunada          BOOLEAN NOT NULL DEFAULT FALSE\n);\n\nCREATE TABLE IF NOT EXISTS mascotas (id INTEGER);   -- si ya existe, solo da un aviso"
      }
     },
     {
      "p": "**Crear una tabla a partir de una consulta** (copia estructura y datos, **pero no las restricciones**):"
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "CREATE TABLE clientes_madrid AS\nSELECT id_cliente, nombre, email FROM clientes WHERE ciudad = 'Madrid';\n\nSELECT * FROM clientes_madrid;"
      }
     }
    ]
   },
   {
    "id": "ddl-alter",
    "titulo": "ALTER TABLE",
    "bloques": [
     {
      "code": "-- Columnas\nALTER TABLE alumnos ADD COLUMN email VARCHAR(100);\nALTER TABLE alumnos ADD COLUMN activo BOOLEAN NOT NULL DEFAULT TRUE;  -- las filas existentes reciben TRUE\nALTER TABLE alumnos RENAME COLUMN email TO correo_electronico;\nALTER TABLE alumnos ALTER COLUMN nombre TYPE VARCHAR(100);           -- cambiar el tipo\nALTER TABLE alumnos ALTER COLUMN nota TYPE INTEGER USING nota::INTEGER; -- cambiar tipo convirtiendo los datos\nALTER TABLE alumnos DROP COLUMN correo_electronico;\n\n-- Valores por defecto y NOT NULL\nALTER TABLE alumnos ALTER COLUMN nota SET DEFAULT 0;\nALTER TABLE alumnos ALTER COLUMN nota DROP DEFAULT;\nALTER TABLE alumnos ALTER COLUMN nombre SET NOT NULL;     -- falla si ya hay algún NULL\nALTER TABLE alumnos ALTER COLUMN nombre DROP NOT NULL;\n\n-- Restricciones\nALTER TABLE alumnos ADD CONSTRAINT ck_alumnos_nota CHECK (nota BETWEEN 0 AND 10);\nALTER TABLE alumnos ADD CONSTRAINT uq_alumnos_nombre UNIQUE (nombre);\nALTER TABLE alumnos DROP CONSTRAINT uq_alumnos_nombre;\n\n-- La tabla\nALTER TABLE alumnos RENAME TO info_alumnos;",
      "lang": "sql"
     },
     {
      "p": "Para añadir una **clave foránea** a una tabla que ya existe:"
     },
     {
      "code": "ALTER TABLE alumnos\n    ADD CONSTRAINT fk_alumnos_cursos FOREIGN KEY (id_curso) REFERENCES cursos (id_curso);",
      "lang": "sql"
     }
    ]
   },
   {
    "id": "ddl-drop",
    "titulo": "DROP, TRUNCATE y DELETE",
    "bloques": [
     {
      "code": "DROP TABLE alumnos;                       -- borra la tabla (estructura + datos)\nDROP TABLE IF EXISTS alumnos;             -- sin error si no existe\nDROP TABLE alumnos CASCADE;               -- borra también las FK de otras tablas que apuntan a ella\nTRUNCATE TABLE alumnos;                   -- vacía la tabla, deja la estructura\nTRUNCATE TABLE alumnos RESTART IDENTITY;  -- vacía y reinicia los id a 1",
      "lang": "sql"
     },
     {
      "tabla": {
       "cabs": [
        "Quiero…",
        "Uso",
        "Estructura",
        "Datos",
        "`WHERE`",
        "Reinicia ids"
       ],
       "filas": [
        [
         "Borrar algunas filas",
         "`DELETE FROM … WHERE …`",
         "se queda",
         "algunas",
         "[[ok]]",
         "[[no]]"
        ],
        [
         "Vaciar la tabla",
         "`TRUNCATE`",
         "se queda",
         "todas",
         "[[no]]",
         "con `RESTART IDENTITY`"
        ],
        [
         "Eliminar la tabla",
         "`DROP TABLE`",
         "desaparece",
         "todas",
         "[[no]]",
         "—"
        ]
       ]
      }
     },
     {
      "p": "Una tabla referenciada por otra **no se puede borrar** mientras exista la FK:"
     },
     {
      "code": "DROP TABLE clientes;",
      "lang": "sql"
     },
     {
      "sub": "[[no]] RESPUESTA DE POSTGRESQL"
     },
     {
      "consola": "ERROR:  no se puede eliminar tabla clientes porque otros objetos dependen de él\nDETAIL:  restricción «pedidos_id_cliente_fkey» en tabla pedidos depende de tabla clientes\nHINT:  Use DROP ... CASCADE para eliminar además los objetos dependientes."
     }
    ]
   },
   {
    "id": "ddl-script",
    "titulo": "Script re-ejecutable",
    "bloques": [
     {
      "p": "Patrón para poder lanzar el mismo `.sql` las veces que quieras (como `tienda_online.sql`):"
     },
     {
      "code": "-- 1. Borrar en orden INVERSO a la creación (primero las tablas \"hijas\", que tienen FK)\nDROP TABLE IF EXISTS lineas_pedido;\nDROP TABLE IF EXISTS pedidos;\nDROP TABLE IF EXISTS clientes;\nDROP TYPE  IF EXISTS estado_pedido;        -- los tipos después de las tablas que los usan\n\n-- 2. Crear en orden: primero las tablas \"padre\" (a las que otras apuntan)\nCREATE TYPE estado_pedido AS ENUM (...);\nCREATE TABLE clientes (...);\nCREATE TABLE pedidos (...);                -- tiene FK a clientes\nCREATE TABLE lineas_pedido (...);          -- tiene FK a pedidos\n\n-- 3. Insertar en el mismo orden que la creación\n-- 4. SELECT de comprobación",
      "lang": "sql"
     },
     {
      "nota": "**Orden de creación = orden de las flechas al revés**: una tabla solo puede crearse cuando ya existen todas las tablas a las que apuntan sus FK. Para borrar, al contrario. Alternativa rápida: `DROP TABLE IF EXISTS a, b, c CASCADE;` borra todas sin preocuparte del orden.",
      "tipo": "tip"
     }
    ]
   }
  ]
 },
 "mod-06": {
  "resumen": "números · texto · fechas · boolean · otros",
  "secciones": [
   {
    "id": "tipos-numeros",
    "titulo": "Números",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Tipo",
        "Rango / precisión",
        "Uso típico"
       ],
       "filas": [
        [
         "`SMALLINT`",
         "2 bytes · ±32 767",
         "Planta, jornada, edad, valoración 1-5"
        ],
        [
         "**`INTEGER`** (`INT`)",
         "4 bytes · ±2 147 483 647",
         "**Por defecto**: ids, cantidades, stock"
        ],
        [
         "`BIGINT`",
         "8 bytes · ±9,2 × 10¹⁸",
         "Reproducciones, visitas, cosas que superan los 2 100 millones"
        ],
        [
         "**`NUMERIC(p,s)`** = `DECIMAL(p,s)`",
         "Exacto. `p` dígitos en total, `s` decimales",
         "**Dinero**, notas, pesos, medidas con decimales fijos"
        ],
        [
         "`REAL` / `DOUBLE PRECISION`",
         "Aproximados (como `float`/`double` en Java)",
         "Datos científicos o de sensores donde no importa el último decimal"
        ]
       ]
      }
     },
     {
      "nota": "`NUMERIC(6,2)` → **6 dígitos en total, 2 de ellos decimales** → máximo `9999.99`. Para un saldo de \"varios millones con céntimos\": `NUMERIC(12,2)` (hasta 9 999 999 999.99).",
      "tipo": "important"
     },
     {
      "code": "SELECT 12345.67::NUMERIC(6,2);",
      "lang": "sql"
     },
     {
      "sub": "[[no]] RESPUESTA DE POSTGRESQL"
     },
     {
      "consola": "ERROR:  desbordamiento de campo numeric\nDETAIL:  Un campo con precisión 6, escala 2 debe redondear a un valor absoluto menor que 10^4."
     }
    ]
   },
   {
    "id": "tipos-texto",
    "titulo": "Texto",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Tipo",
        "Qué hace",
        "Uso típico"
       ],
       "filas": [
        [
         "`VARCHAR(n)`",
         "Hasta `n` caracteres. Da error si se pasa",
         "Nombres, emails, direcciones"
        ],
        [
         "`CHAR(n)`",
         "**Exactamente** `n`: si falta, rellena con espacios",
         "Códigos de longitud fija: DNI (9), IBAN (24), aeropuerto (3)"
        ],
        [
         "`TEXT`",
         "Sin límite",
         "Descripciones, sinopsis, crónicas, comentarios"
        ]
       ]
      }
     },
     {
      "p": "Un cast explícito a `VARCHAR(n)` recorta en silencio:"
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "SELECT 'Teclado mecánico Keychron'::VARCHAR(10) AS recortado;"
      }
     },
     {
      "p": "Pero **insertar** un texto demasiado largo en una columna da error:"
     },
     {
      "code": "INSERT INTO prueba (codigo) VALUES ('IB34567');",
      "lang": "sql"
     },
     {
      "sub": "[[no]] RESPUESTA DE POSTGRESQL"
     },
     {
      "consola": "ERROR:  el valor es demasiado largo para el tipo character varying(5)"
     },
     {
      "nota": "Teléfonos, códigos postales, DNI, IBAN o números de tarjeta van como **texto**, aunque solo tengan cifras: no se suman ni se restan, y como número perderían los ceros iniciales (`'08001'` → `8001`) y el `+34`.",
      "tipo": "tip"
     }
    ]
   },
   {
    "id": "tipos-fechas",
    "titulo": "Fechas y horas",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Tipo",
        "Formato",
        "Ejemplo",
        "Uso"
       ],
       "filas": [
        [
         "`DATE`",
         "`'AAAA-MM-DD'`",
         "`'2026-10-03'`",
         "Nacimiento, alta, fecha de matrícula"
        ],
        [
         "`TIME`",
         "`'HH:MM[:SS]'`",
         "`'09:30'`",
         "Hora de inicio de una clase"
        ],
        [
         "`TIMESTAMP`",
         "`'AAAA-MM-DD HH:MM:SS'`",
         "`'2026-10-03 14:05:00'`",
         "Momento exacto: pedido, lectura de un sensor"
        ],
        [
         "`TIMESTAMPTZ`",
         "Con zona horaria",
         "`'2026-10-03 14:05:00+02'`",
         "Apps con usuarios en varios países"
        ],
        [
         "`INTERVAL`",
         "Duración",
         "`'2 hours 30 minutes'`, `'7 days'`",
         "Sumar o restar tiempo"
        ]
       ]
      }
     },
     {
      "tabla": {
       "cabs": [
        "Valor actual",
        "Devuelve"
       ],
       "filas": [
        [
         "`CURRENT_DATE`",
         "Fecha de hoy (`DATE`)"
        ],
        [
         "`CURRENT_TIME`",
         "Hora actual"
        ],
        [
         "`CURRENT_TIMESTAMP` = `now()`",
         "Fecha y hora actuales"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "tipos-otros",
    "titulo": "Otros",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Tipo",
        "Qué guarda",
        "Ejemplo"
       ],
       "filas": [
        [
         "`BOOLEAN`",
         "`TRUE` / `FALSE` / `NULL`",
         "`vacunada`, `activo`, `teletrabaja`"
        ],
        [
         "`ENUM` (propio)",
         "Lista cerrada de valores",
         "`estado_pedido` → [MOD.07](@restr-enum)"
        ],
        [
         "`UUID`",
         "Identificador universal de 128 bits",
         "`gen_random_uuid()`; en PG 18 también `uuidv7()` (ordenado por tiempo)"
        ],
        [
         "`JSONB`",
         "Documento JSON (estilo NoSQL dentro de PostgreSQL)",
         "Preferencias de usuario, datos de una API"
        ],
        [
         "`tipo[]`",
         "Array",
         "`TEXT[]` para etiquetas: `'{oferta,nuevo}'`"
        ],
        [
         "`SERIAL`",
         "**Antiguo**: entero autoincremental",
         "Hoy se usa `GENERATED … AS IDENTITY` → [MOD.07](@restr-identity)"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "tipos-elegir",
    "titulo": "¿Cuál elijo? (casos reales)",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Dato",
        "Tipo",
        "Por qué"
       ],
       "filas": [
        [
         "Nombre de mascota (hasta 50)",
         "`VARCHAR(50)`",
         "Longitud variable con límite"
        ],
        [
         "Peso en kg con un decimal",
         "`NUMERIC(4,1)`",
         "Decimales exactos; hasta 999,9 kg"
        ],
        [
         "¿Vacunada?",
         "`BOOLEAN`",
         "Sí/no"
        ],
        [
         "Descripción larga de un producto",
         "`TEXT`",
         "Sin límite"
        ],
        [
         "Precio con céntimos",
         "`NUMERIC(8,2)`",
         "Dinero → exacto, nunca `REAL`"
        ],
        [
         "Unidades en almacén",
         "`INTEGER`",
         "Entero, puede ser grande"
        ],
        [
         "DNI (siempre 9)",
         "`CHAR(9)` o `VARCHAR(9)` + `CHECK (char_length(dni) = 9)`",
         "Longitud fija; texto por la letra"
        ],
        [
         "Salario mensual con céntimos",
         "`NUMERIC(8,2)`",
         "Dinero"
        ],
        [
         "Código de grupo (siempre 5: `DAM1A`)",
         "`CHAR(5)`",
         "Longitud fija"
        ],
        [
         "Día de la semana",
         "`SMALLINT` (1-7) con `CHECK`, o `ENUM`",
         "Lista cerrada"
        ],
        [
         "Hora de inicio / fin de clase",
         "`TIME`",
         "Solo hora"
        ],
        [
         "Nota media de 0 a 10 con decimales",
         "`NUMERIC(4,2)` + `CHECK (nota BETWEEN 0 AND 10)`",
         "Hasta 10,00"
        ],
        [
         "Reproducciones (miles de millones)",
         "`BIGINT`",
         "No cabe en `INTEGER`"
        ],
        [
         "Teléfono móvil, código postal",
         "`VARCHAR(15)`, `CHAR(5)`",
         "Texto: no se opera y conserva ceros y `+34`"
        ],
        [
         "Fecha y hora exacta de una lectura",
         "`TIMESTAMP`",
         "Fecha + hora"
        ],
        [
         "Temperatura con 2 decimales (bajo cero)",
         "`NUMERIC(5,2)`",
         "Admite negativos: -99,99 a 999,99"
        ],
        [
         "Humedad en % sin decimales",
         "`SMALLINT` + `CHECK (humedad BETWEEN 0 AND 100)`",
         "Entero pequeño"
        ],
        [
         "Código de vuelo (hasta 7: `IB3456`)",
         "`VARCHAR(7)`",
         "Variable con límite"
        ],
        [
         "Aeropuerto (3 letras: `MAD`)",
         "`CHAR(3)`",
         "Fijo"
        ],
        [
         "IBAN España (24)",
         "`CHAR(24)`",
         "Fijo"
        ],
        [
         "Saldo (negativo, varios millones)",
         "`NUMERIC(12,2)`",
         "Dinero grande con signo"
        ],
        [
         "Nº total de movimientos de una cuenta",
         "`BIGINT` o `INTEGER`",
         "Depende del volumen esperado"
        ]
       ]
      }
     }
    ]
   }
  ]
 },
 "mod-07": {
  "resumen": "PK · FK · UNIQUE · NOT NULL · CHECK · DEFAULT",
  "secciones": [
   {
    "id": "restr-resumen",
    "titulo": "Resumen",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Restricción",
        "Garantiza que…",
        "Ejemplo"
       ],
       "filas": [
        [
         "`PRIMARY KEY`",
         "Cada fila se identifica de forma única. Implica `NOT NULL` + `UNIQUE`",
         "`id_cliente INTEGER PRIMARY KEY`"
        ],
        [
         "`FOREIGN KEY` / `REFERENCES`",
         "El valor existe en la tabla referenciada",
         "`id_cliente INTEGER REFERENCES clientes (id_cliente)`"
        ],
        [
         "`UNIQUE`",
         "No se repite (pero admite varios `NULL`)",
         "`email VARCHAR(100) UNIQUE`"
        ],
        [
         "`NOT NULL`",
         "Siempre tiene valor",
         "`nombre VARCHAR(50) NOT NULL`"
        ],
        [
         "`CHECK`",
         "Se cumple una condición",
         "`CHECK (precio > 0)`"
        ],
        [
         "`DEFAULT`",
         "Si no se indica valor, se pone este (no es restricción, pero va en el mismo sitio)",
         "`DEFAULT CURRENT_DATE`"
        ]
       ]
      }
     },
     {
      "p": "**A nivel de columna o de tabla:**"
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "CREATE TABLE reservas (\n    id_reserva  INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,  -- nivel columna\n    id_sala     INTEGER NOT NULL,\n    fecha       DATE NOT NULL,\n    hora_ini    TIME NOT NULL,\n    hora_fin    TIME NOT NULL,\n    UNIQUE (id_sala, fecha, hora_ini),          -- nivel tabla: afecta a VARIAS columnas\n    CHECK (hora_fin > hora_ini)                  -- nivel tabla: compara dos columnas\n);"
      }
     }
    ]
   },
   {
    "id": "restr-pk",
    "titulo": "PRIMARY KEY",
    "bloques": [
     {
      "code": "id_cliente INTEGER PRIMARY KEY                       -- simple\nPRIMARY KEY (id_pedido, id_producto)                  -- compuesta (al final, a nivel de tabla)",
      "lang": "sql"
     },
     {
      "code": "INSERT INTO lineas_pedido (id_pedido, id_producto, cantidad, precio_unitario)\nVALUES (1, 1, 3, 649.00);",
      "lang": "sql"
     },
     {
      "sub": "[[no]] RESPUESTA DE POSTGRESQL"
     },
     {
      "consola": "ERROR:  llave duplicada viola restricción de unicidad «lineas_pedido_pkey»\nDETAIL:  Ya existe la llave (id_pedido, id_producto)=(1, 1)."
     }
    ]
   },
   {
    "id": "restr-identity",
    "titulo": "Autonumérico: IDENTITY",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Forma",
        "Si en el INSERT das tú el id…",
        "Uso"
       ],
       "filas": [
        [
         "`GENERATED ALWAYS AS IDENTITY`",
         "**Error** (salvo `OVERRIDING SYSTEM VALUE`)",
         "**Recomendada**: la BD siempre manda"
        ],
        [
         "`GENERATED BY DEFAULT AS IDENTITY`",
         "Lo acepta",
         "Importar datos que ya traen id"
        ],
        [
         "`SERIAL`",
         "Lo acepta",
         "Forma antigua; la verás en ejemplos viejos"
        ]
       ]
      }
     },
     {
      "code": "INSERT INTO categorias (id_categoria, nombre) VALUES (10, 'Libros');",
      "lang": "sql"
     },
     {
      "sub": "[[no]] RESPUESTA DE POSTGRESQL"
     },
     {
      "consola": "ERROR:  no se puede insertar un valor no-predeterminado en la columna «id_categoria»\nDETAIL:  La columna \"id_categoria\" es una columna de identidad definida como GENERATED ALWAYS.\nHINT:  Use OVERRIDING SYSTEM VALUE para controlar manualmente."
     },
     {
      "nota": "Los números de un `IDENTITY` **no se reutilizan**: si borras el id 5 o un `INSERT` falla, ese número se pierde y quedan \"huecos\". Es normal; un id no tiene que ser correlativo.",
      "tipo": "note"
     }
    ]
   },
   {
    "id": "restr-fk",
    "titulo": "FOREIGN KEY",
    "bloques": [
     {
      "code": "-- Forma corta (a nivel de columna)\nid_cliente INTEGER NOT NULL REFERENCES clientes (id_cliente)\n\n-- Forma larga (a nivel de tabla, con nombre)\nCONSTRAINT fk_pedidos_clientes FOREIGN KEY (id_cliente) REFERENCES clientes (id_cliente)",
      "lang": "sql"
     },
     {
      "p": "La FK impide **insertar** algo que apunte a un valor que no existe…"
     },
     {
      "code": "INSERT INTO pedidos (id_cliente) VALUES (99);",
      "lang": "sql"
     },
     {
      "sub": "[[no]] RESPUESTA DE POSTGRESQL"
     },
     {
      "consola": "ERROR:  inserción o actualización en la tabla «pedidos» viola la llave foránea «pedidos_id_cliente_fkey»\nDETAIL:  La llave (id_cliente)=(99) no está presente en la tabla «clientes»."
     },
     {
      "p": "…y **borrar** algo a lo que otros apuntan:"
     },
     {
      "code": "DELETE FROM clientes WHERE id_cliente = 1;",
      "lang": "sql"
     },
     {
      "sub": "[[no]] RESPUESTA DE POSTGRESQL"
     },
     {
      "consola": "ERROR:  update o delete en «clientes» viola la llave foránea «pedidos_id_cliente_fkey» en la tabla «pedidos»\nDETAIL:  La llave (id_cliente)=(1) todavía es referida desde la tabla «pedidos»."
     },
     {
      "nota": "`NOT NULL` en la FK = participación **obligatoria** (todo pedido tiene cliente). Sin `NOT NULL` = **opcional** (un pedido puede no tener empleado asignado).",
      "tipo": "tip"
     }
    ]
   },
   {
    "id": "restr-on-delete",
    "titulo": "ON DELETE / ON UPDATE: qué pasa con los \"hijos\"",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Opción",
        "Al borrar el padre…",
        "Ejemplo real"
       ],
       "filas": [
        [
         "`NO ACTION` / `RESTRICT` (por defecto)",
         "**Error** si tiene hijos",
         "No borrar un cliente con pedidos"
        ],
        [
         "`CASCADE`",
         "Se borran también los hijos",
         "Borrar un pedido → se borran sus líneas"
        ],
        [
         "`SET NULL`",
         "Los hijos quedan con la FK a `NULL`",
         "Despedir a un empleado → sus pedidos quedan sin empleado"
        ],
        [
         "`SET DEFAULT`",
         "Los hijos toman el valor por defecto",
         "Poco habitual"
        ]
       ]
      }
     },
     {
      "p": "En `tienda_online`, `lineas_pedido` tiene `ON DELETE CASCADE` hacia `pedidos`:"
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "SELECT COUNT(*) AS lineas_antes FROM lineas_pedido WHERE id_pedido = 8;\nDELETE FROM pedidos WHERE id_pedido = 8;\nSELECT COUNT(*) AS lineas_despues FROM lineas_pedido WHERE id_pedido = 8;"
      }
     },
     {
      "p": "Y `pedidos.id_empleado` tiene `ON DELETE SET NULL`:"
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "DELETE FROM empleados WHERE id_empleado = 4;\nSELECT id_pedido, id_empleado FROM pedidos WHERE id_pedido IN (3, 4, 8, 10);"
      }
     }
    ]
   },
   {
    "id": "restr-otras",
    "titulo": "UNIQUE, NOT NULL, CHECK y DEFAULT",
    "bloques": [
     {
      "code": "INSERT INTO clientes (nombre, apellidos, email) VALUES ('Ana', 'Ruiz', 'lucia.fernandez@correo.com');",
      "lang": "sql"
     },
     {
      "sub": "[[no]] RESPUESTA DE POSTGRESQL"
     },
     {
      "consola": "ERROR:  llave duplicada viola restricción de unicidad «clientes_email_key»\nDETAIL:  Ya existe la llave (email)=(lucia.fernandez@correo.com)."
     },
     {
      "code": "INSERT INTO clientes (nombre, email) VALUES ('Ana', 'ana@correo.com');",
      "lang": "sql"
     },
     {
      "sub": "[[no]] RESPUESTA DE POSTGRESQL"
     },
     {
      "consola": "ERROR:  el valor nulo en la columna «apellidos» de la relación «clientes» viola la restricción “not-null”\nDETAIL:  La fila que falla contiene (9, Ana, null, ana@correo.com, null, null, 2026-10-03)."
     },
     {
      "code": "UPDATE productos SET stock = -1 WHERE id_producto = 1;",
      "lang": "sql"
     },
     {
      "sub": "[[no]] RESPUESTA DE POSTGRESQL"
     },
     {
      "consola": "ERROR:  el nuevo registro para la relación «productos» viola la restricción «check» «productos_stock_check»\nDETAIL:  La fila que falla contiene (1, 1, Portátil Lenovo IdeaPad 5, 649.00, -1, t, 2025-10-01)."
     },
     {
      "p": "**CHECK útiles:**"
     },
     {
      "code": "CHECK (precio > 0)\nCHECK (nota BETWEEN 0 AND 10)\nCHECK (char_length(dni) = 9)                     -- longitud exacta\nCHECK (char_length(isbn) IN (10, 13))\nCHECK (dni ~ '^[0-9]{8}[A-Z]$')                  -- formato con expresión regular: 8 cifras + letra\nCHECK (email LIKE '%_@_%._%')                    -- formato mínimo de email\nCHECK (fecha_entrega >= fecha_pedido)            -- comparar columnas (nivel tabla)\nCHECK (fecha_nacimiento > '1900-01-01')\nCHECK (estado IN ('activo', 'baja', 'pendiente'))  -- lista cerrada sin ENUM",
      "lang": "sql"
     },
     {
      "nota": "Un `CHECK` con `NULL` **se da por bueno**: `CHECK (precio > 0)` deja insertar `precio = NULL`. Si debe tener valor, añade también `NOT NULL`.",
      "tipo": "note"
     },
     {
      "p": "**DEFAULT** se aplica si omites la columna o escribes la palabra `DEFAULT`:"
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "INSERT INTO productos (id_categoria, nombre, precio)\nVALUES (5, 'Mando inalámbrico', 59.90)\nRETURNING id_producto, stock, activo, fecha_alta = CURRENT_DATE AS alta_hoy;"
      }
     }
    ]
   },
   {
    "id": "restr-enum",
    "titulo": "ENUM: lista cerrada de valores",
    "bloques": [
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "CREATE TYPE talla AS ENUM ('XS', 'S', 'M', 'L', 'XL');\n\nCREATE TABLE camisetas (\n    id     INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n    talla  talla NOT NULL DEFAULT 'M'\n);\n\nALTER TYPE talla ADD VALUE 'XXL';                  -- añadir un valor al final\nALTER TYPE talla ADD VALUE 'XXS' BEFORE 'XS';      -- o en una posición"
      }
     },
     {
      "code": "UPDATE pedidos SET estado = 'devuelto' WHERE id_pedido = 1;",
      "lang": "sql"
     },
     {
      "sub": "[[no]] RESPUESTA DE POSTGRESQL"
     },
     {
      "consola": "ERROR:  la sintaxis de entrada no es válida para el enum estado_pedido: «devuelto»\nLINE 1: UPDATE pedidos SET estado = 'devuelto' WHERE id_pedido = 1;\n                                    ^"
     },
     {
      "tabla": {
       "cabs": [
        "",
        "`ENUM`",
        "`CHECK (x IN (…))`",
        "Tabla aparte + FK"
       ],
       "filas": [
        [
         "Añadir un valor",
         "`ALTER TYPE … ADD VALUE`",
         "Cambiar el CHECK",
         "`INSERT`"
        ],
        [
         "Quitar un valor",
         "Difícil (recrear el tipo)",
         "Cambiar el CHECK",
         "`DELETE`"
        ],
        [
         "Orden propio (`ORDER BY`)",
         "[[ok]] el de la definición",
         "[[no]] alfabético",
         "Con una columna `orden`"
        ],
        [
         "Ideal para",
         "Estados fijos que casi no cambian",
         "Listas cortas y simples",
         "Listas que el usuario puede ampliar (categorías)"
        ]
       ]
      }
     },
     {
      "aviso": "El tipo se crea **antes** que la tabla que lo usa y se borra **después** (`DROP TYPE IF EXISTS …`). Si el script se re-ejecuta y el `DROP TYPE` no está en la limpieza → `ERROR: ya existe un tipo «…»`.",
      "tipo": "warning"
     }
    ]
   },
   {
    "id": "restr-generadas",
    "titulo": "Columnas generadas",
    "bloques": [
     {
      "p": "Una columna que **se calcula sola** a partir de otras de la misma fila. No se puede escribir en ella."
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "SELECT id_pedido, id_producto, cantidad, precio_unitario, subtotal\nFROM lineas_pedido\nWHERE id_pedido = 8;"
      }
     },
     {
      "code": "subtotal NUMERIC(10,2) GENERATED ALWAYS AS (cantidad * precio_unitario) STORED",
      "lang": "sql"
     },
     {
      "tabla": {
       "cabs": [
        "Modo",
        "Qué hace"
       ],
       "filas": [
        [
         "`STORED`",
         "Se calcula al insertar o modificar y **se guarda** en disco"
        ],
        [
         "`VIRTUAL` (PostgreSQL 18)",
         "Se calcula **al consultar**, no ocupa espacio. **En PG 18 es el modo por defecto** si no escribes nada"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "restr-nombres",
    "titulo": "Nombrar las restricciones",
    "bloques": [
     {
      "p": "Si no les das nombre, PostgreSQL inventa uno (`productos_stock_check`, `clientes_email_key`, `pedidos_id_cliente_fkey`). Ponerles nombre hace los errores más legibles y facilita borrarlas."
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "CREATE TABLE empleados_demo (\n    id_empleado  INTEGER GENERATED ALWAYS AS IDENTITY,\n    dni          CHAR(9) NOT NULL,\n    salario      NUMERIC(8,2) NOT NULL,\n    id_jefe      INTEGER,\n    CONSTRAINT pk_empleados_demo PRIMARY KEY (id_empleado),\n    CONSTRAINT uq_empleados_demo_dni UNIQUE (dni),\n    CONSTRAINT ck_empleados_demo_salario CHECK (salario >= 1184),\n    CONSTRAINT fk_empleados_demo_jefe FOREIGN KEY (id_jefe) REFERENCES empleados_demo (id_empleado)\n);"
      }
     },
     {
      "tabla": {
       "cabs": [
        "Prefijo habitual",
        "Restricción"
       ],
       "filas": [
        [
         "`pk_tabla`",
         "Primary key"
        ],
        [
         "`fk_tabla_referenciada`",
         "Foreign key"
        ],
        [
         "`uq_tabla_columna`",
         "Unique"
        ],
        [
         "`ck_tabla_columna`",
         "Check"
        ]
       ]
      }
     }
    ]
   }
  ]
 },
 "mod-08": {
  "resumen": "INSERT · UPDATE · DELETE · RETURNING · UPSERT",
  "secciones": [
   {
    "id": "dml-insert",
    "titulo": "INSERT",
    "bloques": [
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "-- Una fila, indicando las columnas (recomendado: no depende del orden de la tabla)\nINSERT INTO categorias (nombre) VALUES ('Fotografía');\n\n-- Varias filas de una vez\nINSERT INTO clientes (nombre, apellidos, email, ciudad) VALUES\n('Laura', 'Pérez Sanz', 'laura.perez@correo.com', 'Zaragoza'),\n('Hugo',  'Gil Marín',  'hugo.gil@correo.com',    NULL);        -- NULL explícito\n\n-- DEFAULT explícito (como hiciste en urban_fit)\nINSERT INTO pedidos (id_cliente, id_empleado, estado) VALUES (3, 2, DEFAULT);\n\n-- Copiar filas desde una consulta (INSERT ... SELECT)\nCREATE TABLE productos_agotados (id_producto INTEGER, nombre VARCHAR(100));\nINSERT INTO productos_agotados (id_producto, nombre)\nSELECT id_producto, nombre FROM productos WHERE stock = 0;"
      }
     },
     {
      "tabla": {
       "cabs": [
        "Regla",
        "Detalle"
       ],
       "filas": [
        [
         "Texto y fechas",
         "Entre **comillas simples**: `'Madrid'`, `'2026-10-03'`. Las dobles `\"…\"` son para **nombres** de columnas o tablas"
        ],
        [
         "Comilla dentro de un texto",
         "Se duplica: `'L''Oréal'`"
        ],
        [
         "Números y booleanos",
         "Sin comillas: `19.99`, `TRUE`"
        ],
        [
         "Decimales",
         "Con **punto**: `19.99` (no `19,99`)"
        ],
        [
         "Columnas omitidas",
         "Reciben su `DEFAULT` o `NULL`"
        ],
        [
         "Columna `GENERATED ALWAYS`",
         "No se incluye en la lista"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "dml-update",
    "titulo": "UPDATE",
    "bloques": [
     {
      "code": "UPDATE tabla\nSET columna1 = valor1, columna2 = valor2\nWHERE condición;",
      "lang": "sql"
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "-- Subir un 10 % los productos de Audio y ver el resultado\nUPDATE productos\nSET precio = ROUND(precio * 1.10, 2)\nWHERE id_categoria = 3\nRETURNING id_producto, nombre, precio;"
      }
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "UPDATE clientes SET telefono = '655000111', ciudad = 'Madrid' WHERE id_cliente = 7;   -- varias columnas\nUPDATE productos SET stock = stock - 1 WHERE id_producto = 4;                        -- a partir del valor actual\nUPDATE productos SET activo = FALSE WHERE stock = 0 AND activo;                      -- condición compuesta\nUPDATE clientes SET telefono = NULL WHERE id_cliente = 3;                            -- vaciar un campo"
      }
     },
     {
      "p": "**UPDATE con datos de otra tabla** (`FROM`):"
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "-- Marcar como enviados los pedidos pendientes de clientes de Madrid\nUPDATE pedidos p\nSET estado = 'enviado'\nFROM clientes c\nWHERE p.id_cliente = c.id_cliente\n  AND c.ciudad = 'Madrid'\n  AND p.estado = 'pendiente'\nRETURNING p.id_pedido, c.nombre, p.estado;"
      }
     }
    ]
   },
   {
    "id": "dml-delete",
    "titulo": "DELETE",
    "bloques": [
     {
      "code": "DELETE FROM tabla WHERE condición;",
      "lang": "sql"
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "-- Borrar los clientes que nunca han hecho un pedido\nDELETE FROM clientes\nWHERE id_cliente NOT IN (SELECT id_cliente FROM pedidos)\nRETURNING id_cliente, nombre;"
      }
     },
     {
      "nota": "**Orden de borrado con FK:** primero los \"hijos\" y luego los \"padres\" (como hiciste en `urban_fit`: primero sesiones, luego socios y entrenadores). Si no, salta la FK → [MOD.07 · ON DELETE](@restr-on-delete).",
      "tipo": "important"
     }
    ]
   },
   {
    "id": "dml-returning",
    "titulo": "RETURNING: ver lo que acabas de cambiar",
    "bloques": [
     {
      "p": "Funciona con `INSERT`, `UPDATE` y `DELETE`. Muy útil para saber el **id generado**:"
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "INSERT INTO clientes (nombre, apellidos, email, ciudad)\nVALUES ('Irene', 'Soto Vega', 'irene.soto@correo.com', 'Granada')\nRETURNING id_cliente, fecha_registro;"
      }
     },
     {
      "sub": "En PostgreSQL 18 también puedes pedir el valor anterior y el nuevo en un `UPDATE`: `RETURNING old.precio, new.precio`."
     }
    ]
   },
   {
    "id": "dml-upsert",
    "titulo": "UPSERT: insertar o actualizar si ya existe",
    "bloques": [
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "INSERT INTO categorias (nombre) VALUES ('Audio'), ('Libros')\nON CONFLICT (nombre) DO NOTHING                -- si ya existe, la ignora sin error\nRETURNING id_categoria, nombre;"
      }
     },
     {
      "code": "INSERT INTO inventario (id_producto, unidades) VALUES (1, 5), (2, 8)\nON CONFLICT (id_producto)\nDO UPDATE SET unidades = inventario.unidades + EXCLUDED.unidades   -- EXCLUDED = la fila que intentabas insertar\nRETURNING *;",
      "lang": "sql"
     },
     {
      "consola": " id_producto | unidades \n-------------+----------\n           1 |       15\n           2 |        8"
     }
    ]
   },
   {
    "id": "dml-seguridad",
    "titulo": "Seguridad: antes de un UPDATE o DELETE",
    "bloques": [
     {
      "aviso": "**Un `UPDATE` o `DELETE` sin `WHERE` afecta a TODAS las filas.** pgAdmin no pregunta: lo hace.",
      "tipo": "caution"
     },
     {
      "tabla": {
       "cabs": [
        "Hábito",
        "Cómo"
       ],
       "filas": [
        [
         "1. Probar el `WHERE` con un `SELECT`",
         "`SELECT * FROM clientes WHERE …` → ¿salen las filas que quiero? Luego cambias `SELECT *` por `DELETE`"
        ],
        [
         "2. Hacerlo dentro de una transacción",
         "`BEGIN;` → `DELETE …;` → comprobar → `COMMIT;` o `ROLLBACK;` → [MOD.15](@mod-15)"
        ],
        [
         "3. Usar `RETURNING`",
         "Ves exactamente qué filas cambiaron"
        ],
        [
         "4. Filtrar por la PK si es una sola fila",
         "`WHERE id_cliente = 7` en vez de `WHERE nombre = 'Andrea'` (puede haber dos)"
        ]
       ]
      }
     }
    ]
   }
  ]
 },
 "mod-09": {
  "resumen": "columnas · filtros · NULL · orden · CASE",
  "secciones": [
   {
    "id": "sel-estructura",
    "titulo": "Estructura",
    "bloques": [
     {
      "code": "SELECT    columnas / expresiones        -- 5. qué columnas mostrar\nFROM      tabla(s)                      -- 1. de dónde\nWHERE     condición sobre filas         -- 2. qué filas\nGROUP BY  columnas                      -- 3. cómo agrupar\nHAVING    condición sobre grupos        -- 4. qué grupos\nORDER BY  columnas [ASC | DESC]         -- 6. orden\nLIMIT     n OFFSET m;                   -- 7. cuántas filas",
      "lang": "sql"
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "SELECT nombre,\n       precio,\n       precio * 1.21 AS precio_con_iva,         -- columna calculada con alias\n       'EUR' AS moneda                          -- constante\nFROM productos\nWHERE id_categoria = 2;"
      }
     },
     {
      "tabla": {
       "cabs": [
        "Detalle",
        "Ejemplo"
       ],
       "filas": [
        [
         "Todas las columnas",
         "`SELECT *` (cómodo para explorar; en código, mejor nombrarlas)"
        ],
        [
         "Alias de columna",
         "`precio * 1.21 AS precio_con_iva` (el `AS` es opcional)"
        ],
        [
         "Alias con espacios o mayúsculas",
         "Comillas dobles: `AS \"Precio final\"`"
        ],
        [
         "Alias de tabla",
         "`FROM productos p` → luego `p.nombre`"
        ],
        [
         "Concatenar texto",
         "`nombre || ' ' || apellidos`"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "sel-orden",
    "titulo": "Orden de ejecución (por qué a veces \"no existe\" el alias)",
    "bloques": [
     {
      "consola": "  Se ESCRIBE:   SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT\n  Se EJECUTA:   FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT\n                                                     ▲\n                                  aquí nacen los alias: WHERE no los conoce, ORDER BY sí"
     },
     {
      "code": "SELECT nombre, precio * 1.21 AS con_iva FROM productos WHERE con_iva > 300;",
      "lang": "sql"
     },
     {
      "sub": "[[no]] RESPUESTA DE POSTGRESQL"
     },
     {
      "consola": "ERROR:  no existe la columna «con_iva»\nLINE 1: ...re, precio * 1.21 AS con_iva FROM productos WHERE con_iva > ...\n                                                             ^"
     },
     {
      "sub": "Solución: repetir la expresión en el `WHERE` (`WHERE precio * 1.21 > 300`) o usar una subconsulta. En `ORDER BY con_iva` sí funciona."
     }
    ]
   },
   {
    "id": "sel-where",
    "titulo": "Operadores de WHERE",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Operador",
        "Significado",
        "Ejemplo"
       ],
       "filas": [
        [
         "`=` `<>` `!=`",
         "Igual / distinto",
         "`ciudad = 'Madrid'`, `estado <> 'cancelado'`"
        ],
        [
         "`>` `<` `>=` `<=`",
         "Comparación (números, fechas, texto)",
         "`fecha >= '2026-06-01'`"
        ],
        [
         "`BETWEEN a AND b`",
         "Entre a y b, **ambos incluidos**",
         "`precio BETWEEN 50 AND 100`"
        ],
        [
         "`IN (…)`",
         "En una lista",
         "`estado IN ('pendiente', 'enviado')`"
        ],
        [
         "`NOT IN (…)`",
         "Fuera de una lista",
         "`id_categoria NOT IN (4, 5)`"
        ],
        [
         "`LIKE` / `ILIKE`",
         "Patrón de texto (`ILIKE` ignora mayúsculas)",
         "`nombre ILIKE '%usb%'`"
        ],
        [
         "`IS NULL` / `IS NOT NULL`",
         "Sin valor / con valor",
         "`telefono IS NULL`"
        ],
        [
         "`AND` `OR` `NOT`",
         "Combinar condiciones",
         "`stock > 0 AND activo`"
        ]
       ]
      }
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "SELECT nombre, precio, stock\nFROM productos\nWHERE precio BETWEEN 50 AND 150\n  AND stock > 0\n  AND id_categoria IN (2, 3)\nORDER BY precio;"
      }
     },
     {
      "aviso": "**`AND` va antes que `OR`.** `WHERE ciudad = 'Madrid' OR ciudad = 'Sevilla' AND telefono IS NULL` se lee como `Madrid OR (Sevilla AND sin teléfono)`. Usa paréntesis: `WHERE (ciudad = 'Madrid' OR ciudad = 'Sevilla') AND telefono IS NULL`, o mejor `ciudad IN ('Madrid', 'Sevilla')`.",
      "tipo": "warning"
     },
     {
      "nota": "**Fechas con hora y `BETWEEN`:** `fecha BETWEEN '2026-09-01' AND '2026-09-30'` sobre un `TIMESTAMP` **excluye** lo ocurrido el día 30 después de las 00:00. Más seguro: `fecha >= '2026-09-01' AND fecha < '2026-10-01'`.",
      "tipo": "tip"
     }
    ]
   },
   {
    "id": "sel-like",
    "titulo": "LIKE: patrones de texto",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Comodín",
        "Significa",
        "Patrón",
        "Encuentra"
       ],
       "filas": [
        [
         "`%`",
         "Cero o más caracteres",
         "`'Mon%'`",
         "Empieza por Mon"
        ],
        [
         "`%`",
         "",
         "`'%USB%'`",
         "Contiene USB"
        ],
        [
         "`%`",
         "",
         "`'%@gmail.com'`",
         "Termina en @gmail.com"
        ],
        [
         "`_`",
         "Exactamente un carácter",
         "`'_____'`",
         "Exactamente 5 caracteres"
        ],
        [
         "`_`",
         "",
         "`'2026-0_-%'`",
         "Meses 01 a 09 de 2026 (en texto)"
        ]
       ]
      }
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "SELECT nombre FROM productos WHERE nombre ILIKE '%usb%' OR nombre LIKE 'Port%';"
      }
     }
    ]
   },
   {
    "id": "sel-null",
    "titulo": "NULL: el valor \"desconocido\"",
    "bloques": [
     {
      "p": "`NULL` no es `0` ni `''`: significa **\"no se sabe\"**. Cualquier comparación con `NULL` da `NULL` (ni verdadero ni falso), así que la fila no sale."
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "SELECT COUNT(*) AS con_igual_null    FROM clientes WHERE telefono = NULL;   -- ✖ siempre 0\nSELECT COUNT(*) AS con_is_null       FROM clientes WHERE telefono IS NULL;  -- ✔"
      }
     },
     {
      "tabla": {
       "cabs": [
        "Para…",
        "Usa"
       ],
       "filas": [
        [
         "Filtrar sin valor / con valor",
         "`IS NULL` / `IS NOT NULL`"
        ],
        [
         "Sustituir `NULL` por otro valor al mostrar",
         "`COALESCE(telefono, 'sin teléfono')`"
        ],
        [
         "Convertir un valor en `NULL`",
         "`NULLIF(stock, 0)` → `NULL` si es 0 (evita dividir entre 0)"
        ],
        [
         "Comparar admitiendo `NULL`",
         "`a IS DISTINCT FROM b`"
        ]
       ]
      }
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "SELECT nombre,\n       COALESCE(ciudad, '—') AS ciudad,\n       COALESCE(telefono, 'sin teléfono') AS telefono\nFROM clientes\nWHERE ciudad IS NULL OR telefono IS NULL;"
      }
     },
     {
      "nota": "En operaciones, `NULL` \"contagia\": `5 + NULL` = `NULL`, `'Hola ' || NULL` = `NULL`. Para concatenar con nulos usa `CONCAT('Hola ', NULL)`, que los trata como texto vacío.",
      "tipo": "note"
     }
    ]
   },
   {
    "id": "sel-order",
    "titulo": "ORDER BY, LIMIT y OFFSET",
    "bloques": [
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "SELECT nombre, precio\nFROM productos\nORDER BY precio DESC          -- DESC = de mayor a menor (ASC es el de por defecto)\nLIMIT 3;                      -- el top 3"
      }
     },
     {
      "tabla": {
       "cabs": [
        "Ejemplo",
        "Hace"
       ],
       "filas": [
        [
         "`ORDER BY ciudad, apellidos`",
         "Por ciudad y, si empatan, por apellidos"
        ],
        [
         "`ORDER BY fecha DESC`",
         "Lo más reciente primero"
        ],
        [
         "`ORDER BY ciudad NULLS LAST`",
         "Los `NULL` al final (en `ASC` van al final por defecto; en `DESC`, al principio)"
        ],
        [
         "`ORDER BY 2`",
         "Por la 2.ª columna del `SELECT` (cómodo, pero menos legible)"
        ],
        [
         "`LIMIT 10 OFFSET 20`",
         "Filas 21 a 30 → **paginación**: página `n` = `OFFSET (n - 1) * 10`"
        ],
        [
         "`FETCH FIRST 3 ROWS ONLY`",
         "Equivalente estándar de `LIMIT 3`"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "sel-distinct",
    "titulo": "DISTINCT: quitar duplicados",
    "bloques": [
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "SELECT DISTINCT ciudad FROM clientes ORDER BY ciudad;"
      }
     },
     {
      "sub": "`DISTINCT` afecta a **la combinación** de todas las columnas del `SELECT`: `SELECT DISTINCT ciudad, nombre` quita filas con la misma ciudad **y** el mismo nombre."
     }
    ]
   },
   {
    "id": "sel-case",
    "titulo": "CASE: el if/else de SQL",
    "bloques": [
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "SELECT nombre,\n       stock,\n       CASE\n           WHEN stock = 0   THEN 'AGOTADO'\n           WHEN stock < 5   THEN 'Últimas unidades'\n           WHEN stock < 20  THEN 'Disponible'\n           ELSE 'Stock alto'\n       END AS estado_stock\nFROM productos\nORDER BY stock\nLIMIT 6;"
      }
     },
     {
      "sub": "Se evalúa de arriba abajo y se queda con el primer `WHEN` que cumple (como un `if / else if`). Sin `ELSE`, lo que no cumple nada queda `NULL`."
     }
    ]
   }
  ]
 },
 "mod-10": {
  "resumen": "texto · números · fechas · conversión",
  "secciones": [
   {
    "id": "fn-texto",
    "titulo": "Texto",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Función",
        "Ejemplo",
        "Resultado"
       ],
       "filas": [
        [
         "`upper(t)` / `lower(t)`",
         "`upper('madrid')`",
         "`MADRID`"
        ],
        [
         "`initcap(t)`",
         "`initcap('lucía fernández')`",
         "`Lucía Fernández`"
        ],
        [
         "`length(t)` = `char_length(t)`",
         "`length('Keychron')`",
         "`8`"
        ],
        [
         "`t1 || t2`",
         "`'DAW' || '-' || 1`",
         "`DAW-1` (con `NULL` → `NULL`)"
        ],
        [
         "`concat(t1, t2, …)`",
         "`concat('Hola ', NULL, 'Ana')`",
         "`Hola Ana` (ignora `NULL`)"
        ],
        [
         "`concat_ws(sep, …)`",
         "`concat_ws(', ', 'Madrid', 'España')`",
         "`Madrid, España`"
        ],
        [
         "`substring(t, desde, cuántos)`",
         "`substring('PostgreSQL', 1, 4)`",
         "`Post` (empieza en **1**, no en 0)"
        ],
        [
         "`left(t, n)` / `right(t, n)`",
         "`right('12345678Z', 1)`",
         "`Z`"
        ],
        [
         "`position(sub IN t)`",
         "`position('@' IN 'ana@mail.com')`",
         "`4` (0 si no está)"
        ],
        [
         "`split_part(t, sep, n)`",
         "`split_part('ana@mail.com', '@', 2)`",
         "`mail.com`"
        ],
        [
         "`trim(t)` / `ltrim` / `rtrim`",
         "`trim('  hola  ')`",
         "`hola`"
        ],
        [
         "`replace(t, a, b)`",
         "`replace('a-b-c', '-', '/')`",
         "`a/b/c`"
        ],
        [
         "`lpad(t, n, relleno)`",
         "`lpad('7', 3, '0')`",
         "`007`"
        ],
        [
         "`repeat(t, n)`",
         "`repeat('*', 4)`",
         "`****`"
        ],
        [
         "`reverse(t)`",
         "`reverse('abc')`",
         "`cba`"
        ],
        [
         "`t ~ 'regex'`",
         "`'12345678Z' ~ '^[0-9]{8}[A-Z]$'`",
         "`true`"
        ]
       ]
      }
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "SELECT upper(apellidos) || ', ' || nombre                AS ficha,\n       split_part(email, '@', 1)                          AS usuario,\n       left(nombre, 1) || '. ' || split_part(apellidos, ' ', 1) AS firma,\n       'PED-' || lpad(id_cliente::TEXT, 4, '0')           AS codigo\nFROM clientes\nLIMIT 3;"
      }
     }
    ]
   },
   {
    "id": "fn-numeros",
    "titulo": "Números",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Función / operador",
        "Ejemplo",
        "Resultado"
       ],
       "filas": [
        [
         "`+ - * /`",
         "`7 / 2` · `7 / 2.0`",
         "`3` · `3.5000000000000000` (**entero / entero = entero**, como en Java)"
        ],
        [
         "`%` o `mod(a, b)`",
         "`17 % 5`",
         "`2`"
        ],
        [
         "`round(n, d)`",
         "`round(19.456, 2)` · `round(2.5)`",
         "`19.46` · `3`"
        ],
        [
         "`trunc(n, d)`",
         "`trunc(19.459, 1)`",
         "`19.4`"
        ],
        [
         "`ceil(n)` / `floor(n)`",
         "`ceil(4.1)` · `floor(4.9)`",
         "`5` · `4`"
        ],
        [
         "`abs(n)`",
         "`abs(-3)`",
         "`3`"
        ],
        [
         "`power(b, e)` / `sqrt(n)`",
         "`power(2, 10)`",
         "`1024`"
        ],
        [
         "`random()`",
         "`floor(random() * 6 + 1)`",
         "Entero de 1 a 6"
        ],
        [
         "`greatest(…)` / `least(…)`",
         "`greatest(3, 9, 4)`",
         "`9`"
        ]
       ]
      }
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "SELECT nombre,\n       precio,\n       round(precio * 1.21, 2)   AS con_iva,\n       round(precio * 0.85, 2)   AS con_descuento_15,\n       ceil(precio / 12)         AS cuota_12_meses\nFROM productos\nWHERE id_categoria = 1;"
      }
     }
    ]
   },
   {
    "id": "fn-fechas",
    "titulo": "Fechas",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Función / operación",
        "Ejemplo",
        "Resultado"
       ],
       "filas": [
        [
         "`CURRENT_DATE` · `now()`",
         "—",
         "Hoy · ahora"
        ],
        [
         "`fecha + n` (DATE)",
         "`DATE '2026-10-03' + 30`",
         "`2026-11-02`"
        ],
        [
         "`fecha + INTERVAL`",
         "`TIMESTAMP '2026-10-03 10:00' + INTERVAL '2 hours'`",
         "`2026-10-03 12:00:00`"
        ],
        [
         "`fecha2 - fecha1` (DATE)",
         "`DATE '2026-12-25' - DATE '2026-10-03'`",
         "`83` (días)"
        ],
        [
         "`age(f2, f1)` / `age(f)`",
         "`age(DATE '2026-10-03', DATE '1990-05-14')`",
         "`36 years 4 mons 19 days`"
        ],
        [
         "`EXTRACT(campo FROM f)`",
         "`EXTRACT(YEAR FROM fecha)`",
         "`2026`. Campos: `YEAR`, `MONTH`, `DAY`, `HOUR`, `DOW` (0 = domingo), `QUARTER`"
        ],
        [
         "`date_trunc('unidad', f)`",
         "`date_trunc('month', TIMESTAMP '2026-10-03 14:05')`",
         "`2026-10-01 00:00:00`"
        ],
        [
         "`to_char(f, formato)`",
         "`to_char(DATE '2026-10-03', 'DD/MM/YYYY')`",
         "`03/10/2026`"
        ]
       ]
      }
     },
     {
      "p": "**Formatos de `to_char`:** `DD` día · `MM` mes · `YYYY` año · `HH24:MI:SS` hora · `TMDay` nombre del día · `TMMonth` nombre del mes (el prefijo `TM` lo traduce al idioma del servidor)."
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "SELECT id_pedido,\n       to_char(fecha, 'DD/MM/YYYY HH24:MI')        AS fecha_es,\n       to_char(fecha, 'TMDay DD \"de\" TMMonth')     AS fecha_texto,\n       EXTRACT(MONTH FROM fecha)                   AS mes,\n       DATE '2026-10-03' - fecha::DATE             AS dias_hasta_3_oct\nFROM pedidos\nWHERE id_pedido IN (1, 6, 10);"
      }
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "-- Antigüedad de cada empleado a fecha 3 de octubre de 2026\nSELECT nombre,\n       fecha_contrato,\n       age(DATE '2026-10-03', fecha_contrato)                         AS antiguedad,\n       EXTRACT(YEAR FROM age(DATE '2026-10-03', fecha_contrato))      AS anios_completos\nFROM empleados\nORDER BY fecha_contrato;"
      }
     }
    ]
   },
   {
    "id": "fn-conversion",
    "titulo": "Conversión de tipos",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Forma",
        "Ejemplo",
        "Resultado"
       ],
       "filas": [
        [
         "`CAST(x AS tipo)` (estándar SQL)",
         "`CAST('42' AS INTEGER)`",
         "`42`"
        ],
        [
         "`x::tipo` (atajo de PostgreSQL)",
         "`'2026-10-03'::DATE`",
         "`2026-10-03`"
        ],
        [
         "Número → texto con formato",
         "`to_char(1234.5, 'FM9G999D00')`",
         "`1.234,50` (según idioma del servidor)"
        ],
        [
         "Texto → fecha con formato",
         "`to_date('03/10/2026', 'DD/MM/YYYY')`",
         "`2026-10-03`"
        ],
        [
         "Texto → número con formato",
         "`to_number('1.234,50', '9G999D99')`",
         "`1234.50`"
        ],
        [
         "Entero → decimal para dividir",
         "`total::NUMERIC / n`",
         "Evita la división entera"
        ]
       ]
      }
     },
     {
      "code": "SELECT 'doce'::INTEGER;",
      "lang": "sql"
     },
     {
      "sub": "[[no]] RESPUESTA DE POSTGRESQL"
     },
     {
      "consola": "ERROR:  la sintaxis de entrada no es válida para tipo integer: «doce»\nLINE 1: SELECT 'doce'::INTEGER;\n               ^"
     }
    ]
   }
  ],
  "intro": [
   {
    "sub": "Puedes probar cualquier función sin tabla: `SELECT upper('hola');`"
   }
  ]
 },
 "mod-11": {
  "resumen": "COUNT · SUM · AVG · GROUP BY · HAVING",
  "secciones": [
   {
    "id": "agg-funciones",
    "titulo": "Funciones de agregado",
    "bloques": [
     {
      "p": "Convierten **muchas filas en un único valor**."
     },
     {
      "tabla": {
       "cabs": [
        "Función",
        "Devuelve",
        "Con `NULL`"
       ],
       "filas": [
        [
         "`COUNT(*)`",
         "Número de **filas**",
         "Las cuenta"
        ],
        [
         "`COUNT(columna)`",
         "Filas donde la columna **no es `NULL`**",
         "Las ignora"
        ],
        [
         "`COUNT(DISTINCT columna)`",
         "Valores distintos",
         "Los ignora"
        ],
        [
         "`SUM(col)`",
         "Suma",
         "Ignora los `NULL`"
        ],
        [
         "`AVG(col)`",
         "Media",
         "Ignora los `NULL` (no cuentan como 0)"
        ],
        [
         "`MIN(col)` / `MAX(col)`",
         "Mínimo / máximo (números, fechas, texto)",
         "Ignora los `NULL`"
        ],
        [
         "`string_agg(col, sep)`",
         "Une textos en uno",
         "—"
        ]
       ]
      }
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "SELECT COUNT(*)                 AS clientes,\n       COUNT(telefono)          AS con_telefono,\n       COUNT(DISTINCT ciudad)   AS ciudades_distintas,\n       MIN(fecha_registro)      AS primer_registro,\n       MAX(fecha_registro)      AS ultimo_registro\nFROM clientes;"
      }
     }
    ]
   },
   {
    "id": "agg-group",
    "titulo": "GROUP BY: un resultado por grupo",
    "bloques": [
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "SELECT estado,\n       COUNT(*)                     AS pedidos,\n       SUM(gastos_envio)            AS total_envios\nFROM pedidos\nGROUP BY estado\nORDER BY pedidos DESC;"
      }
     },
     {
      "consola": "  pedidos                 GROUP BY estado                         SELECT estado, COUNT(*)\n  1 entregado ─┐\n  2 entregado ─┤\n  3 entregado ─┼────▶  grupo «entregado» (5 filas)  ─────▶  entregado │ 5\n  4 entregado ─┤\n  6 entregado ─┘\n  7 enviado   ─┬────▶  grupo «enviado»   (2 filas)  ─────▶  enviado   │ 2\n  8 enviado   ─┘\n  5 cancelado ──────▶  grupo «cancelado» (1 fila)   ─────▶  cancelado │ 1"
     },
     {
      "nota": "**Regla de oro:** toda columna del `SELECT` que **no** esté dentro de una función de agregado **tiene que estar en el `GROUP BY`**.",
      "tipo": "important"
     },
     {
      "code": "SELECT ciudad, nombre, COUNT(*) FROM clientes GROUP BY ciudad;",
      "lang": "sql"
     },
     {
      "sub": "[[no]] RESPUESTA DE POSTGRESQL"
     },
     {
      "consola": "ERROR:  la columna «clientes.nombre» debe aparecer en la cláusula GROUP BY o ser usada en una función de agregación\nLINE 1: SELECT ciudad, nombre, COUNT(*) FROM clientes GROUP BY ciuda...\n                       ^"
     },
     {
      "p": "**Agrupar por varias columnas y por expresiones:**"
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "SELECT EXTRACT(MONTH FROM p.fecha) AS mes,\n       COUNT(DISTINCT p.id_pedido) AS pedidos,\n       SUM(l.subtotal)             AS facturado\nFROM pedidos p\nJOIN lineas_pedido l ON l.id_pedido = p.id_pedido\nWHERE p.estado <> 'cancelado'\nGROUP BY EXTRACT(MONTH FROM p.fecha)\nORDER BY mes;"
      }
     }
    ]
   },
   {
    "id": "agg-having",
    "titulo": "HAVING: filtrar grupos",
    "bloques": [
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "-- Ciudades con más de un cliente\nSELECT ciudad, COUNT(*) AS clientes\nFROM clientes\nGROUP BY ciudad\nHAVING COUNT(*) > 1;"
      }
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "-- Productos vendidos en más de 2 pedidos, con todas sus cantidades\nSELECT id_producto,\n       COUNT(*)                                    AS en_pedidos,\n       SUM(cantidad)                               AS unidades,\n       string_agg(cantidad::TEXT, ' + ' ORDER BY id_pedido) AS detalle\nFROM lineas_pedido\nGROUP BY id_producto\nHAVING COUNT(*) > 2;"
      }
     },
     {
      "p": "**Contar con condición** (`FILTER`, propio de PostgreSQL):"
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "SELECT COUNT(*)                                        AS total,\n       COUNT(*) FILTER (WHERE estado = 'entregado')    AS entregados,\n       COUNT(*) FILTER (WHERE id_empleado IS NULL)     AS venta_web\nFROM pedidos;"
      }
     }
    ]
   },
   {
    "id": "agg-where-having",
    "titulo": "WHERE vs HAVING",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "",
        "`WHERE`",
        "`HAVING`"
       ],
       "filas": [
        [
         "Filtra",
         "**Filas**, antes de agrupar",
         "**Grupos**, después de agrupar"
        ],
        [
         "Puede usar agregados (`COUNT`, `SUM`…)",
         "[[no]]",
         "[[ok]]"
        ],
        [
         "Ejemplo",
         "`WHERE estado <> 'cancelado'`",
         "`HAVING SUM(subtotal) > 1000`"
        ]
       ]
      }
     },
     {
      "sub": "Si una condición se puede poner en `WHERE`, ponla en `WHERE`: se descartan filas antes de agrupar y es más rápido."
     }
    ]
   }
  ]
 },
 "mod-12": {
  "resumen": "INNER · LEFT · RIGHT · FULL · CROSS · SELF",
  "secciones": [
   {
    "id": "join-tipos",
    "titulo": "Tipos",
    "bloques": [
     {
      "consola": "  clientes (izquierda)      pedidos (derecha)        INNER JOIN    LEFT JOIN\n  ─────────────────────     ─────────────────        ──────────    ─────────────────\n  Lucía   ───────────────▶  1, 3, 9                  ✔ 3 filas     ✔ 3 filas\n  Marcos  ───────────────▶  2, 10                    ✔ 2 filas     ✔ 2 filas\n  …                         …                        …             …\n  Andrea  ───────────────▶  (ninguno)                ✖ no sale     ✔ 1 fila con NULL\n  Diego   ───────────────▶  (ninguno)                ✖ no sale     ✔ 1 fila con NULL"
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
         "Desaparecen",
         "\"Pedidos **con** su cliente\""
        ],
        [
         "`LEFT JOIN`",
         "Todas las de la izquierda + su pareja",
         "Columnas de la derecha a `NULL`",
         "\"**Todos** los clientes, tengan o no pedidos\""
        ],
        [
         "`RIGHT JOIN`",
         "Todas las de la derecha + su pareja",
         "Columnas de la izquierda a `NULL`",
         "Igual que LEFT con las tablas al revés (se usa poco)"
        ],
        [
         "`FULL JOIN`",
         "Todas de las dos",
         "`NULL` en el lado que falte",
         "Comparar dos listados"
        ],
        [
         "`CROSS JOIN`",
         "Todas las combinaciones (A × B)",
         "—",
         "Generar combinaciones: tallas × colores"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "join-inner",
    "titulo": "INNER JOIN",
    "bloques": [
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "SELECT p.id_pedido,\n       p.fecha::DATE   AS fecha,\n       c.nombre || ' ' || c.apellidos AS cliente,\n       p.estado\nFROM pedidos p\nINNER JOIN clientes c ON c.id_cliente = p.id_cliente\nWHERE p.estado = 'entregado'\nORDER BY p.fecha;"
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
         "`ON c.id_cliente = p.id_cliente`",
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
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "-- Todos los clientes con su número de pedidos (también los que tienen 0)\nSELECT c.nombre,\n       COUNT(p.id_pedido) AS pedidos          -- COUNT(columna) no cuenta los NULL → 0\nFROM clientes c\nLEFT JOIN pedidos p ON p.id_cliente = c.id_cliente\nGROUP BY c.id_cliente, c.nombre\nORDER BY pedidos DESC, c.nombre;"
      }
     },
     {
      "aviso": "Con `LEFT JOIN`, usa `COUNT(p.id_pedido)` y no `COUNT(*)`: `COUNT(*)` contaría la fila de Andrea con `NULL` como 1 pedido.",
      "tipo": "warning"
     },
     {
      "aviso": "**Filtrar la tabla de la derecha en el `WHERE` convierte el LEFT JOIN en un INNER JOIN.** `LEFT JOIN pedidos p … WHERE p.estado = 'entregado'` elimina a los clientes sin pedidos (su `estado` es `NULL`). Si quieres conservarlos, pon el filtro en el `ON`: `LEFT JOIN pedidos p ON p.id_cliente = c.id_cliente AND p.estado = 'entregado'`.",
      "tipo": "caution"
     }
    ]
   },
   {
    "id": "join-huerfanos",
    "titulo": "Buscar \"huérfanos\": filas SIN pareja",
    "bloques": [
     {
      "p": "Patrón: `LEFT JOIN` + `WHERE derecha.pk IS NULL`."
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "-- Productos que nunca se han vendido\nSELECT pr.id_producto, pr.nombre\nFROM productos pr\nLEFT JOIN lineas_pedido l ON l.id_producto = pr.id_producto\nWHERE l.id_producto IS NULL;"
      }
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "-- Categorías sin productos\nSELECT cat.nombre\nFROM categorias cat\nLEFT JOIN productos pr ON pr.id_categoria = cat.id_categoria\nWHERE pr.id_producto IS NULL;"
      }
     }
    ]
   },
   {
    "id": "join-varias",
    "titulo": "Varias tablas (cruzar una N:M)",
    "bloques": [
     {
      "p": "Para ir de `pedidos` a `productos` hay que pasar por la tabla intermedia `lineas_pedido`:"
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "SELECT p.id_pedido,\n       c.nombre       AS cliente,\n       pr.nombre      AS producto,\n       l.cantidad,\n       l.subtotal\nFROM pedidos p\nJOIN clientes c       ON c.id_cliente  = p.id_cliente\nJOIN lineas_pedido l  ON l.id_pedido   = p.id_pedido\nJOIN productos pr     ON pr.id_producto = l.id_producto\nWHERE p.id_pedido IN (1, 8)\nORDER BY p.id_pedido, l.subtotal DESC;"
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
      "p": "Para relaciones **reflexivas**: la misma tabla con dos alias distintos."
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "SELECT e.nombre  AS empleado,\n       e.puesto,\n       COALESCE(j.nombre, '— (sin jefe)') AS jefe\nFROM empleados e\nLEFT JOIN empleados j ON j.id_empleado = e.id_jefe     -- LEFT: la directora no tiene jefe\nORDER BY e.id_empleado;"
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
     }
    ]
   }
  ],
  "intro": [
   {
    "p": "Un `JOIN` combina filas de dos tablas usando la relación entre ellas (normalmente **FK = PK**)."
   }
  ]
 },
 "mod-13": {
  "resumen": "IN · EXISTS · WITH · UNION · ventana",
  "secciones": [
   {
    "id": "sub-escalar",
    "titulo": "Subconsulta escalar (devuelve un solo valor)",
    "bloques": [
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "-- Productos más caros que la media\nSELECT nombre, precio\nFROM productos\nWHERE precio > (SELECT AVG(precio) FROM productos)\nORDER BY precio DESC;"
      }
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "-- Cada producto comparado con la media de SU categoría (subconsulta correlacionada)\nSELECT pr.nombre,\n       pr.precio,\n       (SELECT round(AVG(p2.precio), 2)\n        FROM productos p2\n        WHERE p2.id_categoria = pr.id_categoria) AS media_categoria\nFROM productos pr\nWHERE pr.id_categoria = 3;"
      }
     },
     {
      "sub": "**Correlacionada** = usa una columna de la consulta de fuera (`pr.id_categoria`), así que se recalcula para cada fila."
     }
    ]
   },
   {
    "id": "sub-in-exists",
    "titulo": "IN, NOT IN, EXISTS y NOT EXISTS",
    "bloques": [
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "-- Clientes que han comprado algún producto de Audio\nSELECT nombre, apellidos\nFROM clientes\nWHERE id_cliente IN (\n    SELECT p.id_cliente\n    FROM pedidos p\n    JOIN lineas_pedido l ON l.id_pedido = p.id_pedido\n    JOIN productos pr    ON pr.id_producto = l.id_producto\n    WHERE pr.id_categoria = 3\n);"
      }
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "-- Clientes sin ningún pedido (alternativa al LEFT JOIN ... IS NULL)\nSELECT c.nombre, c.apellidos\nFROM clientes c\nWHERE NOT EXISTS (\n    SELECT 1 FROM pedidos p WHERE p.id_cliente = c.id_cliente\n);"
      }
     },
     {
      "aviso": "**`NOT IN` con `NULL` = 0 filas.** Si la subconsulta devuelve algún `NULL`, `NOT IN` no encuentra nada (comparar con `NULL` es \"desconocido\"). Con `NOT EXISTS` no pasa:",
      "tipo": "caution"
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "-- Empleados que no gestionan ningún pedido (pedidos.id_empleado tiene NULL)\nSELECT 'NOT IN' AS metodo, COUNT(*) AS empleados\nFROM empleados WHERE id_empleado NOT IN (SELECT id_empleado FROM pedidos)\nUNION ALL\nSELECT 'NOT EXISTS', COUNT(*)\nFROM empleados e WHERE NOT EXISTS (SELECT 1 FROM pedidos p WHERE p.id_empleado = e.id_empleado);"
      }
     },
     {
      "tabla": {
       "cabs": [
        "Operador",
        "Uso"
       ],
       "filas": [
        [
         "`IN (subconsulta)`",
         "El valor está en la lista que devuelve la subconsulta"
        ],
        [
         "`EXISTS (subconsulta)`",
         "La subconsulta devuelve **al menos una fila** (no importa qué columnas: se suele poner `SELECT 1`)"
        ],
        [
         "`> ALL (subconsulta)`",
         "Mayor que **todos** los valores"
        ],
        [
         "`> ANY (subconsulta)`",
         "Mayor que **alguno**"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "sub-from",
    "titulo": "Subconsulta en FROM (tabla derivada)",
    "bloques": [
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "-- Media de pedidos por cliente (solo entre los que han comprado)\nSELECT round(AVG(num_pedidos), 2) AS media_pedidos_por_cliente\nFROM (\n    SELECT id_cliente, COUNT(*) AS num_pedidos\n    FROM pedidos\n    GROUP BY id_cliente\n) AS resumen;                      -- en FROM la subconsulta necesita alias"
      }
     }
    ]
   },
   {
    "id": "sub-cte",
    "titulo": "WITH (CTE): consultas por pasos con nombre",
    "bloques": [
     {
      "p": "Igual que una subconsulta en `FROM`, pero se escribe **antes** y se lee de arriba abajo. Ideal cuando una consulta tiene varios pasos."
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "WITH totales AS (                           -- paso 1: total de cada pedido\n    SELECT p.id_pedido, p.id_cliente,\n           SUM(l.subtotal) + p.gastos_envio AS total\n    FROM pedidos p\n    JOIN lineas_pedido l ON l.id_pedido = p.id_pedido\n    WHERE p.estado <> 'cancelado'\n    GROUP BY p.id_pedido, p.id_cliente, p.gastos_envio\n),\npor_cliente AS (                            -- paso 2: gasto por cliente\n    SELECT id_cliente, SUM(total) AS gastado, COUNT(*) AS pedidos\n    FROM totales\n    GROUP BY id_cliente\n)\nSELECT c.nombre, pc.pedidos, pc.gastado     -- paso 3: añadir el nombre\nFROM por_cliente pc\nJOIN clientes c ON c.id_cliente = pc.id_cliente\nORDER BY pc.gastado DESC;"
      }
     }
    ]
   },
   {
    "id": "sub-conjuntos",
    "titulo": "UNION, INTERSECT, EXCEPT",
    "bloques": [
     {
      "p": "Combinan **resultados** de dos `SELECT` con el **mismo número de columnas y tipos compatibles**."
     },
     {
      "tabla": {
       "cabs": [
        "Operador",
        "Devuelve"
       ],
       "filas": [
        [
         "`UNION`",
         "Filas de los dos, **sin duplicados**"
        ],
        [
         "`UNION ALL`",
         "Filas de los dos, **con duplicados** (más rápido)"
        ],
        [
         "`INTERSECT`",
         "Filas que están en **los dos**"
        ],
        [
         "`EXCEPT`",
         "Filas del primero que **no** están en el segundo"
        ]
       ]
      }
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "-- Ciudades con clientes que NO tienen ningún pedido entregado\nSELECT ciudad FROM clientes WHERE ciudad IS NOT NULL\nEXCEPT\nSELECT c.ciudad FROM clientes c JOIN pedidos p ON p.id_cliente = c.id_cliente\nWHERE p.estado = 'entregado';"
      }
     }
    ]
   },
   {
    "id": "sub-ventana",
    "titulo": "Funciones de ventana (avanzado)",
    "bloques": [
     {
      "p": "Calculan sobre un grupo de filas **sin juntarlas en una**: cada fila conserva su detalle."
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "SELECT cat.nombre AS categoria,\n       pr.nombre  AS producto,\n       pr.precio,\n       RANK() OVER (PARTITION BY pr.id_categoria ORDER BY pr.precio DESC) AS puesto_en_categoria,\n       round(AVG(pr.precio) OVER (PARTITION BY pr.id_categoria), 2)       AS media_categoria\nFROM productos pr\nJOIN categorias cat ON cat.id_categoria = pr.id_categoria\nWHERE pr.id_categoria IN (1, 3)\nORDER BY categoria, puesto_en_categoria;"
      }
     },
     {
      "tabla": {
       "cabs": [
        "Función",
        "Hace"
       ],
       "filas": [
        [
         "`ROW_NUMBER()`",
         "1, 2, 3… sin empates"
        ],
        [
         "`RANK()` / `DENSE_RANK()`",
         "Puesto con empates (1, 1, 3 / 1, 1, 2)"
        ],
        [
         "`SUM(x) OVER (ORDER BY fecha)`",
         "Total acumulado"
        ],
        [
         "`LAG(x)` / `LEAD(x)`",
         "Valor de la fila anterior / siguiente"
        ],
        [
         "`PARTITION BY`",
         "Reinicia el cálculo para cada grupo (como `GROUP BY`, pero sin juntar filas)"
        ]
       ]
      }
     }
    ]
   }
  ],
  "intro": [
   {
    "p": "Una subconsulta es un `SELECT` dentro de otra sentencia, entre paréntesis."
   }
  ]
 },
 "mod-14": {
  "resumen": "CREATE VIEW · CREATE INDEX · EXPLAIN",
  "secciones": [
   {
    "id": "vistas",
    "titulo": "Vistas",
    "bloques": [
     {
      "p": "Una vista es una **consulta guardada con nombre** que se usa como si fuera una tabla. No guarda datos: cada vez que la consultas, ejecuta su `SELECT`."
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "CREATE VIEW v_pedidos_resumen AS\nSELECT p.id_pedido,\n       c.nombre || ' ' || c.apellidos   AS cliente,\n       p.fecha::DATE                    AS fecha,\n       p.estado,\n       SUM(l.subtotal) + p.gastos_envio AS total\nFROM pedidos p\nJOIN clientes c      ON c.id_cliente = p.id_cliente\nJOIN lineas_pedido l ON l.id_pedido  = p.id_pedido\nGROUP BY p.id_pedido, c.nombre, c.apellidos;\n\n-- Se consulta como una tabla\nSELECT * FROM v_pedidos_resumen WHERE total > 600 ORDER BY total DESC;"
      }
     },
     {
      "tabla": {
       "cabs": [
        "Sentencia",
        "Hace"
       ],
       "filas": [
        [
         "`CREATE VIEW nombre AS SELECT …`",
         "Crear"
        ],
        [
         "`CREATE OR REPLACE VIEW nombre AS …`",
         "Crear o sustituir (solo si se mantienen las columnas existentes)"
        ],
        [
         "`DROP VIEW [IF EXISTS] nombre`",
         "Borrar"
        ],
        [
         "`CREATE MATERIALIZED VIEW …`",
         "Vista que **sí guarda** el resultado; se actualiza con `REFRESH MATERIALIZED VIEW`"
        ]
       ]
      }
     },
     {
      "p": "**Para qué sirven:** simplificar consultas que repites mucho, ocultar columnas a ciertos usuarios (solo das permiso sobre la vista) y dar a la aplicación una \"tabla\" estable aunque cambie el diseño interno."
     }
    ]
   },
   {
    "id": "indices",
    "titulo": "Índices",
    "bloques": [
     {
      "p": "Un índice es como el **índice alfabético de un libro**: permite encontrar filas sin leer toda la tabla. Acelera las búsquedas, pero ocupa espacio y hace un poco más lentos los `INSERT` y `UPDATE`."
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "CREATE INDEX idx_pedidos_fecha ON pedidos (fecha);\nCREATE INDEX idx_clientes_ciudad_apellidos ON clientes (ciudad, apellidos);   -- compuesto\nCREATE UNIQUE INDEX uq_productos_nombre ON productos (lower(nombre));          -- único y sin distinguir mayúsculas\nDROP INDEX idx_pedidos_fecha;"
      }
     },
     {
      "tabla": {
       "cabs": [
        "¿Crear índice?",
        "Caso"
       ],
       "filas": [
        [
         "**Ya existe** (automático)",
         "Columnas `PRIMARY KEY` y `UNIQUE`"
        ],
        [
         "[[ok]] Sí",
         "**Claves foráneas** (PostgreSQL no las indexa solo y se usan en cada `JOIN`)"
        ],
        [
         "[[ok]] Sí",
         "Columnas muy usadas en `WHERE`, `ORDER BY` o `JOIN` en tablas grandes"
        ],
        [
         "[[no]] No",
         "Tablas pequeñas, columnas con pocos valores distintos (`activo`), tablas con muchísimas escrituras"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "explain",
    "titulo": "EXPLAIN: cómo ejecuta la consulta",
    "bloques": [
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "EXPLAIN SELECT * FROM pedidos WHERE fecha >= '2026-09-01';          -- plan estimado (F7 en pgAdmin)\nEXPLAIN ANALYZE SELECT * FROM pedidos WHERE fecha >= '2026-09-01';  -- la ejecuta y da tiempos reales (Shift+F7)"
      }
     },
     {
      "tabla": {
       "cabs": [
        "En el plan",
        "Significa"
       ],
       "filas": [
        [
         "`Seq Scan`",
         "Lee **toda** la tabla, fila a fila (normal en tablas pequeñas)"
        ],
        [
         "`Index Scan` / `Index Only Scan`",
         "Usa un índice"
        ],
        [
         "`Hash Join` / `Nested Loop` / `Merge Join`",
         "Estrategias para unir tablas"
        ],
        [
         "`cost=0.00..1.12`",
         "Coste estimado (unidades internas: compáralo entre versiones de una misma consulta)"
        ]
       ]
      }
     },
     {
      "sub": "pgAdmin dibuja el plan de forma gráfica en la pestaña **Explain** del panel de resultados."
     }
    ]
   }
  ]
 },
 "mod-15": {
  "resumen": "ACID · BEGIN · COMMIT · ROLLBACK",
  "secciones": [
   {
    "id": "acid",
    "titulo": "ACID",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Propiedad",
        "Significa",
        "Ejemplo"
       ],
       "filas": [
        [
         "**A**tomicidad",
         "Se hace todo o nada",
         "La transferencia no se queda a medias"
        ],
        [
         "**C**onsistencia",
         "Se pasa de un estado válido a otro válido",
         "Ninguna restricción queda violada"
        ],
        [
         "a**I**slamiento",
         "Las transacciones simultáneas no se pisan",
         "Dos compras a la vez del último producto no lo dejan en stock -1"
        ],
        [
         "**D**urabilidad",
         "Lo confirmado sobrevive a un fallo",
         "Tras el `COMMIT`, aunque se vaya la luz, el pedido sigue ahí"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "tx-comandos",
    "titulo": "BEGIN, COMMIT, ROLLBACK y SAVEPOINT",
    "bloques": [
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "BEGIN;                                            -- empieza la transacción\n    UPDATE productos SET stock = stock - 1 WHERE id_producto = 4;\n    INSERT INTO pedidos (id_cliente) VALUES (3);\n    -- ... comprobar con SELECT que todo está bien ...\nCOMMIT;                                           -- confirma: los cambios son definitivos\n-- o\nROLLBACK;                                         -- deshace TODO desde el BEGIN"
      }
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "BEGIN;\n    DELETE FROM lineas_pedido WHERE id_pedido = 10;\n    SAVEPOINT antes_de_borrar_pedido;              -- punto intermedio\n    DELETE FROM pedidos WHERE id_pedido = 10;\n    ROLLBACK TO SAVEPOINT antes_de_borrar_pedido;  -- deshace solo hasta el savepoint\nCOMMIT;                                            -- confirma el borrado de las líneas"
      }
     },
     {
      "p": "**Si una sentencia falla dentro de una transacción, todo lo que venga después se ignora** hasta que hagas `ROLLBACK`:"
     },
     {
      "code": "INSERT INTO pedidos (id_cliente) VALUES (99);     -- falla la FK\nSELECT COUNT(*) FROM pedidos;                     -- ya no se ejecuta",
      "lang": "sql"
     },
     {
      "sub": "[[no]] RESPUESTA DE POSTGRESQL"
     },
     {
      "consola": "ERROR:  inserción o actualización en la tabla «pedidos» viola la llave foránea «pedidos_id_cliente_fkey»\nDETAIL:  La llave (id_cliente)=(99) no está presente en la tabla «clientes».\nERROR:  transacción abortada, las órdenes serán ignoradas hasta el fin de bloque de transacción"
     }
    ]
   },
   {
    "id": "tx-pgadmin",
    "titulo": "Transacciones en pgAdmin",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Concepto",
        "Detalle"
       ],
       "filas": [
        [
         "**Auto commit** (activado por defecto)",
         "Cada sentencia se confirma sola en cuanto se ejecuta. Solo hay transacción si escribes `BEGIN`"
        ],
        [
         "Desactivarlo",
         "Desplegable junto al botón ▶ de la Query Tool → Auto commit?. Entonces **todo** queda pendiente hasta que pulses Commit o escribas `COMMIT`"
        ],
        [
         "Indicador",
         "Si hay una transacción abierta, la Query Tool lo indica y al cerrar la pestaña pregunta si confirmar o deshacer"
        ],
        [
         "Error \"transacción abortada\"",
         "Ejecuta `ROLLBACK;` y vuelve a empezar"
        ]
       ]
      }
     },
     {
      "nota": "**Modo seguro para practicar `UPDATE` y `DELETE`:** escribe `BEGIN;` delante, ejecuta, mira el resultado con un `SELECT` y termina con `ROLLBACK;`. La BD queda como estaba. Así se han probado todos los ejemplos de esta chuleta.",
      "tipo": "tip"
     }
    ]
   }
  ],
  "intro": [
   {
    "p": "Una transacción agrupa varias sentencias en un **todo o nada**. Ejemplo clásico: una transferencia bancaria (restar de una cuenta **y** sumar en otra). Si falla la segunda, la primera no debe quedar hecha."
   }
  ]
 },
 "mod-16": {
  "resumen": "roles · GRANT · REVOKE",
  "secciones": [
   {
    "id": "roles",
    "titulo": "Roles (usuarios y grupos)",
    "bloques": [
     {
      "p": "En PostgreSQL, usuarios y grupos son lo mismo: **roles**. Un rol con `LOGIN` puede conectarse (es un usuario); sin `LOGIN`, se usa como grupo."
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "CREATE ROLE ventas_lectura;                                       -- grupo (sin login)\nCREATE ROLE ana WITH LOGIN PASSWORD 'Cambiar.2026';               -- usuario\nCREATE USER pedro WITH PASSWORD 'Cambiar.2026';                   -- CREATE USER = CREATE ROLE … LOGIN\n\nGRANT ventas_lectura TO ana;                                      -- ana entra en el grupo\nALTER ROLE ana WITH PASSWORD 'Otra.Clave.2026';                   -- cambiar contraseña\nALTER ROLE pedro VALID UNTIL '2026-12-31';                        -- caducidad\nALTER ROLE ana CREATEDB;                                          -- permiso para crear bases de datos\n\nREVOKE ventas_lectura FROM ana;\nDROP ROLE pedro;"
      }
     },
     {
      "sub": "En pgAdmin: Login/Group Roles en el árbol, o clic derecho en la BD → **Grant Wizard**."
     }
    ]
   },
   {
    "id": "grant",
    "titulo": "GRANT y REVOKE",
    "bloques": [
     {
      "code": "CREATE ROLE ana WITH LOGIN PASSWORD 'Cambiar.2026';\n\nGRANT CONNECT ON DATABASE tienda_online TO ana;               -- poder conectarse\nGRANT USAGE ON SCHEMA public TO ana;                          -- poder \"entrar\" en el esquema\nGRANT SELECT ON clientes, pedidos TO ana;                     -- leer dos tablas\nGRANT SELECT, INSERT, UPDATE ON productos TO ana;             -- varias acciones\nGRANT UPDATE (stock) ON productos TO ana;                     -- solo una columna\nGRANT SELECT ON ALL TABLES IN SCHEMA public TO ana;           -- todas las tablas actuales",
      "lang": "sql"
     },
     {
      "code": "REVOKE INSERT, UPDATE ON productos FROM ana;                   -- quitar permisos\nREVOKE ALL ON productos FROM ana;                              -- quitar todos",
      "lang": "sql"
     }
    ]
   },
   {
    "id": "privilegios",
    "titulo": "Privilegios",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Privilegio",
        "Permite",
        "Sobre"
       ],
       "filas": [
        [
         "`SELECT`",
         "Leer",
         "Tablas, vistas, columnas"
        ],
        [
         "`INSERT` / `UPDATE` / `DELETE`",
         "Modificar datos",
         "Tablas, columnas (`INSERT`, `UPDATE`)"
        ],
        [
         "`TRUNCATE`",
         "Vaciar",
         "Tablas"
        ],
        [
         "`REFERENCES`",
         "Crear FK que apunten a la tabla",
         "Tablas"
        ],
        [
         "`USAGE`",
         "Usar",
         "Esquemas, secuencias, tipos"
        ],
        [
         "`CONNECT`",
         "Conectarse",
         "Bases de datos"
        ],
        [
         "`CREATE`",
         "Crear objetos dentro",
         "Bases de datos, esquemas"
        ],
        [
         "`EXECUTE`",
         "Ejecutar",
         "Funciones y procedimientos"
        ],
        [
         "`ALL`",
         "Todos los anteriores que apliquen",
         "—"
        ]
       ]
      }
     },
     {
      "nota": "**Principio de mínimo privilegio:** cada usuario solo con lo que necesita. Una aplicación web no debería conectarse como `postgres` (superusuario), sino con un rol que solo tenga `SELECT`, `INSERT`, `UPDATE` y `DELETE` sobre sus tablas.",
      "tipo": "tip"
     }
    ]
   }
  ]
 },
 "mod-17": {
  "resumen": "funciones · procedimientos · triggers",
  "secciones": [
   {
    "id": "plpgsql-funciones",
    "titulo": "Funciones",
    "bloques": [
     {
      "p": "**Función en SQL puro** (una sola consulta):"
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "CREATE OR REPLACE FUNCTION precio_con_iva(precio NUMERIC, iva NUMERIC DEFAULT 21)\nRETURNS NUMERIC\nLANGUAGE sql\nAS $$\n    SELECT round(precio * (1 + iva / 100), 2);\n$$;\n\nSELECT nombre, precio, precio_con_iva(precio) AS pvp, precio_con_iva(precio, 10) AS pvp_reducido\nFROM productos WHERE id_producto IN (1, 7);"
      }
     },
     {
      "p": "**Función en PL/pgSQL** (variables, `IF`, errores):"
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "CREATE OR REPLACE FUNCTION total_pedido(p_id_pedido INTEGER)\nRETURNS NUMERIC\nLANGUAGE plpgsql\nAS $$\nDECLARE\n    v_lineas  NUMERIC;\n    v_envio   NUMERIC;\nBEGIN\n    SELECT gastos_envio INTO v_envio FROM pedidos WHERE id_pedido = p_id_pedido;\n\n    IF NOT FOUND THEN                                 -- FOUND = la última consulta devolvió algo\n        RAISE EXCEPTION 'El pedido % no existe', p_id_pedido;\n    END IF;\n\n    SELECT COALESCE(SUM(subtotal), 0) INTO v_lineas\n    FROM lineas_pedido WHERE id_pedido = p_id_pedido;\n\n    RETURN v_lineas + v_envio;\nEND;\n$$;\n\nSELECT id_pedido, total_pedido(id_pedido) AS total FROM pedidos WHERE id_pedido <= 3;"
      }
     },
     {
      "code": "SELECT total_pedido(999);",
      "lang": "sql"
     },
     {
      "sub": "[[no]] RESPUESTA DE POSTGRESQL"
     },
     {
      "consola": "ERROR:  El pedido 999 no existe"
     },
     {
      "p": "**Función que devuelve una tabla:**"
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "CREATE OR REPLACE FUNCTION pedidos_de_cliente(p_email VARCHAR)\nRETURNS TABLE (id_pedido INTEGER, fecha DATE, estado estado_pedido)\nLANGUAGE sql\nAS $$\n    SELECT p.id_pedido, p.fecha::DATE, p.estado\n    FROM pedidos p\n    JOIN clientes c ON c.id_cliente = p.id_cliente\n    WHERE c.email = p_email\n    ORDER BY p.fecha;\n$$;\n\nSELECT * FROM pedidos_de_cliente('lucia.fernandez@correo.com');"
      }
     }
    ]
   },
   {
    "id": "plpgsql-sintaxis",
    "titulo": "Sintaxis de PL/pgSQL",
    "bloques": [
     {
      "tabla": {
       "cabs": [
        "Elemento",
        "Sintaxis"
       ],
       "filas": [
        [
         "Declarar variables",
         "`DECLARE v_total NUMERIC := 0; v_nombre VARCHAR(50);`"
        ],
        [
         "Variable del tipo de una columna",
         "`v_precio productos.precio%TYPE;`"
        ],
        [
         "Variable para una fila entera",
         "`v_prod productos%ROWTYPE;` → `v_prod.nombre`"
        ],
        [
         "Asignar",
         "`v_total := v_total + 1;`"
        ],
        [
         "Guardar el resultado de una consulta",
         "`SELECT precio INTO v_precio FROM productos WHERE …;`"
        ],
        [
         "Condicional",
         "`IF … THEN … ELSIF … THEN … ELSE … END IF;`"
        ],
        [
         "Bucle con contador",
         "`FOR i IN 1..10 LOOP … END LOOP;`"
        ],
        [
         "Recorrer una consulta",
         "`FOR v_fila IN SELECT … LOOP … END LOOP;`"
        ],
        [
         "Mientras",
         "`WHILE condición LOOP … END LOOP;`"
        ],
        [
         "Mensaje informativo",
         "`RAISE NOTICE 'Stock: %', v_stock;` (cada `%` se sustituye por un valor)"
        ],
        [
         "Lanzar error (cancela todo)",
         "`RAISE EXCEPTION 'Sin stock para %', v_nombre;`"
        ],
        [
         "Capturar errores",
         "`BEGIN … EXCEPTION WHEN unique_violation THEN … END;`"
        ],
        [
         "Devolver",
         "`RETURN valor;`"
        ]
       ]
      }
     },
     {
      "nota": "Prefijos habituales para no confundir nombres: `p_` para parámetros y `v_` para variables. Si un parámetro se llama igual que una columna (`id_pedido`), PostgreSQL no sabe a cuál te refieres y da error de ambigüedad.",
      "tipo": "tip"
     }
    ]
   },
   {
    "id": "plpgsql-procedimientos",
    "titulo": "Procedimientos",
    "bloques": [
     {
      "p": "Como una función, pero **no devuelve valor**, se ejecuta con `CALL` y puede hacer `COMMIT` dentro. Se usan para **operaciones** completas."
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "CREATE OR REPLACE PROCEDURE reponer_stock(p_id_producto INTEGER, p_unidades INTEGER)\nLANGUAGE plpgsql\nAS $$\nDECLARE\n    v_nombre productos.nombre%TYPE;\nBEGIN\n    IF p_unidades <= 0 THEN\n        RAISE EXCEPTION 'Las unidades deben ser positivas (recibido: %)', p_unidades;\n    END IF;\n\n    UPDATE productos SET stock = stock + p_unidades\n    WHERE id_producto = p_id_producto\n    RETURNING nombre INTO v_nombre;\n\n    RAISE NOTICE 'Repuestas % unidades de %', p_unidades, v_nombre;\nEND;\n$$;\n\nCALL reponer_stock(5, 20);\nSELECT nombre, stock FROM productos WHERE id_producto = 5;"
      }
     },
     {
      "sub": "El `RAISE NOTICE` aparece en la pestaña **Messages** de pgAdmin, no en Data Output."
     },
     {
      "tabla": {
       "cabs": [
        "",
        "Función",
        "Procedimiento"
       ],
       "filas": [
        [
         "Se invoca con",
         "`SELECT función(…)` (dentro de consultas)",
         "`CALL procedimiento(…)`"
        ],
        [
         "Devuelve",
         "Un valor, una fila o una tabla",
         "Nada (o parámetros `INOUT`)"
        ],
        [
         "`COMMIT` / `ROLLBACK` dentro",
         "[[no]]",
         "[[ok]]"
        ],
        [
         "Uso típico",
         "Cálculos reutilizables",
         "Procesos: \"registrar venta\", \"cerrar mes\""
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "triggers",
    "titulo": "Triggers (disparadores)",
    "bloques": [
     {
      "p": "Un trigger ejecuta una función **automáticamente** cuando ocurre un `INSERT`, `UPDATE` o `DELETE` en una tabla. Se crea en dos pasos: **función** `RETURNS trigger` + **CREATE TRIGGER**."
     },
     {
      "tabla": {
       "cabs": [
        "Variable",
        "Contiene"
       ],
       "filas": [
        [
         "`NEW`",
         "La fila nueva (en `INSERT` y `UPDATE`)"
        ],
        [
         "`OLD`",
         "La fila anterior (en `UPDATE` y `DELETE`)"
        ],
        [
         "`TG_OP`",
         "La operación: `'INSERT'`, `'UPDATE'`, `'DELETE'`"
        ]
       ]
      }
     },
     {
      "tabla": {
       "cabs": [
        "Momento",
        "Uso",
        "Debe devolver"
       ],
       "filas": [
        [
         "`BEFORE`",
         "Validar o modificar `NEW` antes de guardar",
         "`NEW` (o `NULL` para cancelar esa fila)"
        ],
        [
         "`AFTER`",
         "Reaccionar: actualizar otras tablas, auditar",
         "Se ignora (`RETURN NULL`)"
        ]
       ]
      }
     },
     {
      "p": "**Caso real 1: descontar stock automáticamente al vender**"
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "CREATE OR REPLACE FUNCTION fn_descontar_stock()\nRETURNS trigger\nLANGUAGE plpgsql\nAS $$\nBEGIN\n    UPDATE productos SET stock = stock - NEW.cantidad\n    WHERE id_producto = NEW.id_producto;\n    RETURN NEW;\nEND;\n$$;\n\nCREATE TRIGGER tr_lineas_descontar_stock\nAFTER INSERT ON lineas_pedido\nFOR EACH ROW\nEXECUTE FUNCTION fn_descontar_stock();\n\n-- Prueba: el ratón tiene 30 unidades; se venden 3\nINSERT INTO lineas_pedido (id_pedido, id_producto, cantidad, precio_unitario) VALUES (9, 4, 3, 99.00);\nSELECT nombre, stock FROM productos WHERE id_producto = 4;"
      }
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "-- Y si no hay stock suficiente, el CHECK (stock >= 0) bloquea la venta entera\nINSERT INTO lineas_pedido (id_pedido, id_producto, cantidad, precio_unitario) VALUES (9, 9, 5, 279.00);"
      }
     },
     {
      "sub": "[[no]] RESPUESTA DE POSTGRESQL"
     },
     {
      "consola": "ERROR:  el nuevo registro para la relación «productos» viola la restricción «check» «productos_stock_check»\nDETAIL:  La fila que falla contiene (9, 4, Robot aspirador, 279.00, -2, t, 2026-02-01)."
     },
     {
      "p": "**Caso real 2: historial de cambios de precio (auditoría)**"
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "CREATE TABLE historial_precios (\n    id_cambio       INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n    id_producto     INTEGER NOT NULL REFERENCES productos (id_producto),\n    precio_anterior NUMERIC(8,2),\n    precio_nuevo    NUMERIC(8,2),\n    cambiado_por    TEXT DEFAULT current_user,\n    cambiado_en     TIMESTAMP DEFAULT now()\n);\n\nCREATE OR REPLACE FUNCTION fn_auditar_precio()\nRETURNS trigger\nLANGUAGE plpgsql\nAS $$\nBEGIN\n    IF NEW.precio IS DISTINCT FROM OLD.precio THEN          -- solo si el precio cambia\n        INSERT INTO historial_precios (id_producto, precio_anterior, precio_nuevo)\n        VALUES (OLD.id_producto, OLD.precio, NEW.precio);\n    END IF;\n    RETURN NEW;\nEND;\n$$;\n\nCREATE TRIGGER tr_productos_auditar_precio\nAFTER UPDATE OF precio ON productos\nFOR EACH ROW\nEXECUTE FUNCTION fn_auditar_precio();\n\nUPDATE productos SET precio = 79.99 WHERE id_producto = 3;\nUPDATE productos SET stock = 40 WHERE id_producto = 3;      -- no toca el precio: no se audita\nSELECT id_producto, precio_anterior, precio_nuevo, cambiado_por FROM historial_precios;"
      }
     },
     {
      "tabla": {
       "cabs": [
        "Sentencia",
        "Hace"
       ],
       "filas": [
        [
         "`DROP TRIGGER nombre ON tabla;`",
         "Borrar un trigger"
        ],
        [
         "`ALTER TABLE tabla DISABLE TRIGGER nombre;`",
         "Desactivarlo temporalmente (`ENABLE` para reactivarlo)"
        ],
        [
         "`DROP FUNCTION nombre(tipos);`",
         "Borrar una función (hay que indicar los tipos de los parámetros)"
        ]
       ]
      }
     },
     {
      "sub": "En pgAdmin: Schemas → public → Functions / Procedures / Trigger Functions, y dentro de cada tabla, Triggers."
     }
    ]
   }
  ],
  "intro": [
   {
    "nota": "Suele ser la **última unidad** del módulo. El cuerpo de una función va entre `$$ … $$` (dos símbolos de dólar), que hacen de comillas y evitan escapar las `'` de dentro.",
    "tipo": "note"
   }
  ]
 },
 "mod-18": {
  "resumen": "pg_dump · pg_restore · COPY · Import/Export",
  "secciones": [
   {
    "id": "backup",
    "titulo": "Copias de seguridad",
    "bloques": [
     {
      "p": "**Desde pgAdmin:**"
     },
     {
      "tabla": {
       "cabs": [
        "Acción",
        "Cómo"
       ],
       "filas": [
        [
         "Copia de una BD",
         "Clic derecho en la BD → **Backup…** → nombre de archivo y formato"
        ],
        [
         "Restaurar",
         "Crear una BD vacía → clic derecho → **Restore…** → elegir el archivo"
        ],
        [
         "Copia de una sola tabla",
         "Clic derecho en la tabla → **Backup…**"
        ]
       ]
      }
     },
     {
      "tabla": {
       "cabs": [
        "Formato",
        "Archivo",
        "Se restaura con",
        "Para qué"
       ],
       "filas": [
        [
         "**Plain**",
         "`.sql` legible",
         "Abrirlo en la Query Tool o `psql -f`",
         "Ver o editar el SQL, subirlo a GitHub"
        ],
        [
         "**Custom**",
         "`.backup` comprimido",
         "**Restore…** de pgAdmin o `pg_restore`",
         "Copias habituales: permite restaurar solo una parte"
        ],
        [
         "**Tar** / **Directory**",
         "`.tar` / carpeta",
         "`pg_restore`",
         "Bases de datos grandes"
        ]
       ]
      }
     },
     {
      "p": "**Desde la terminal** (las herramientas están en la carpeta `bin` de PostgreSQL):"
     },
     {
      "code": "pg_dump -U postgres -d tienda_online -f tienda_online.sql             # copia en SQL plano\npg_dump -U postgres -d tienda_online -Fc -f tienda_online.backup      # formato custom\npg_dump -U postgres -d tienda_online --schema-only -f estructura.sql  # solo estructura (CREATE TABLE…)\npg_dump -U postgres -d tienda_online --data-only -f datos.sql         # solo datos (INSERT/COPY)\npg_dump -U postgres -d tienda_online -t clientes -f clientes.sql      # una sola tabla\n\npsql -U postgres -d tienda_restaurada -f tienda_online.sql            # restaurar un .sql\npg_restore -U postgres -d tienda_restaurada tienda_online.backup      # restaurar un custom",
      "lang": "bash"
     }
    ]
   },
   {
    "id": "csv",
    "titulo": "Importar y exportar CSV",
    "bloques": [
     {
      "p": "**Desde pgAdmin:** clic derecho en la tabla → **Import/Export Data…** → elegir Import o Export, el archivo, formato `csv`, marcar **Header** si la primera fila tiene los nombres de columna y elegir el delimitador (`,` o `;`)."
     },
     {
      "p": "**Con SQL:**"
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "-- Exportar el resultado de una consulta (aquí a la pantalla; con un archivo: TO '/ruta/archivo.csv')\nCOPY (SELECT id_cliente, nombre, ciudad FROM clientes WHERE ciudad = 'Madrid')\nTO STDOUT WITH (FORMAT csv, HEADER, DELIMITER ';');"
      }
     },
     {
      "consola": "id_cliente;nombre;ciudad\n1;Lucía;Madrid\n3;Elena;Madrid\n8;Diego;Madrid"
     },
     {
      "code": "-- Importar un CSV a una tabla que ya existe (las columnas, en el orden del archivo)\nCOPY clientes (nombre, apellidos, email, ciudad)\nFROM 'C:/datos/clientes.csv' WITH (FORMAT csv, HEADER, DELIMITER ';', ENCODING 'UTF8');",
      "lang": "sql"
     },
     {
      "aviso": "`COPY … FROM 'ruta'` lee el archivo **desde el servidor** (necesita permisos de superusuario y una ruta que el servicio de PostgreSQL pueda leer). Desde tu equipo es más cómodo el diálogo **Import/Export** de pgAdmin o `\\copy` en psql, que leen el archivo **del cliente**. Si Excel guardó el CSV con `;` y en ANSI, indica `DELIMITER ';'` y `ENCODING 'WIN1252'`.",
      "tipo": "warning"
     }
    ]
   }
  ]
 },
 "mod-19": {
  "resumen": "diagnóstico rápido · SQLSTATE",
  "secciones": [
   {
    "id": "errores-tabla",
    "titulo": "Tabla de diagnóstico",
    "bloques": [
     {
      "p": "Mensajes tal y como los muestra PostgreSQL en español. Si tu instalación está en inglés, el **código SQLSTATE** es el mismo."
     },
     {
      "tabla": {
       "cabs": [
        "Código",
        "Mensaje (resumido)",
        "Causa habitual",
        "Solución"
       ],
       "filas": [
        [
         "`42601`",
         "error de sintaxis en o cerca de «…»",
         "Falta o sobra una coma (sobre todo **después de la última columna** de un `CREATE TABLE`), paréntesis o `;`",
         "Mira la palabra que indica el mensaje **y la línea anterior**"
        ],
        [
         "`42P01`",
         "no existe la relación «x»",
         "Tabla mal escrita, o Query Tool abierta en **otra BD**",
         "Comprueba la pestaña `bd/usuario@servidor`"
        ],
        [
         "`42703`",
         "no existe la columna «x»",
         "Nombre mal escrito, alias usado en `WHERE`, o **comillas dobles** en un texto (`\"Madrid\"` → busca una columna llamada Madrid)",
         "Textos con comillas **simples**"
        ],
        [
         "`42702`",
         "la referencia a la columna «x» es ambigua",
         "Columna presente en dos tablas del `JOIN`",
         "Prefijo: `c.id_cliente`"
        ],
        [
         "`42803`",
         "la columna «t.x» debe aparecer en la cláusula GROUP BY o ser usada en una función de agregación",
         "Columna en el `SELECT` que ni se agrupa ni se agrega",
         "Añádela al `GROUP BY`"
        ],
        [
         "`42P07` / `42710`",
         "la relación «x» ya existe / ya existe un tipo «x»",
         "Ejecutar dos veces el script",
         "`DROP … IF EXISTS` al inicio, o `CREATE … IF NOT EXISTS`"
        ],
        [
         "`23505`",
         "llave duplicada viola restricción de unicidad «…»",
         "Valor repetido en una `PRIMARY KEY` o `UNIQUE`",
         "Revisa el dato; si es un script, quizá ya lo insertaste"
        ],
        [
         "`23503`",
         "inserción o actualización en la tabla «x» viola la llave foránea «…»",
         "La FK apunta a un id que no existe",
         "Inserta primero el \"padre\""
        ],
        [
         "`23503`",
         "update o delete en «x» viola la llave foránea «…»",
         "Borrar un \"padre\" que tiene \"hijos\"",
         "Borra primero los hijos, o usa `ON DELETE CASCADE` / `SET NULL`"
        ],
        [
         "`23502`",
         "el valor nulo en la columna «x» … viola la restricción \"not-null\"",
         "Falta un dato obligatorio",
         "Inclúyelo en el `INSERT` o dale un `DEFAULT`"
        ],
        [
         "`23514`",
         "el nuevo registro … viola la restricción «check» «…»",
         "El dato no cumple el `CHECK`",
         "El `DETAIL` muestra la fila que falla"
        ],
        [
         "`22P02`",
         "la sintaxis de entrada no es válida para tipo integer / enum…",
         "Texto donde va un número, o valor no incluido en el `ENUM`",
         "Revisa el tipo y los valores permitidos"
        ],
        [
         "`22001`",
         "el valor es demasiado largo para el tipo character varying(n)",
         "Texto más largo que el `VARCHAR(n)`",
         "Amplía la columna o recorta el dato"
        ],
        [
         "`22003`",
         "desbordamiento de campo numeric",
         "Número que no cabe en `NUMERIC(p,s)` o `SMALLINT`",
         "Más precisión: `NUMERIC(10,2)`"
        ],
        [
         "`22008` / `22007`",
         "valor de hora/fecha fuera de rango / la sintaxis de entrada no es válida para tipo date",
         "Fecha imposible (`'2026-02-30'`) o formato no reconocido",
         "Formato `'AAAA-MM-DD'`"
        ],
        [
         "`22012`",
         "división por cero",
         "Dividir entre 0",
         "`x / NULLIF(y, 0)`"
        ],
        [
         "`428C9`",
         "no se puede insertar un valor no-predeterminado en la columna «id»",
         "Dar valor a una columna `GENERATED ALWAYS`",
         "Quítala del `INSERT`"
        ],
        [
         "`25P02`",
         "transacción abortada, las órdenes serán ignoradas…",
         "Un error previo dentro de un `BEGIN`",
         "`ROLLBACK;`"
        ],
        [
         "`55006`",
         "la base de datos «x» está siendo utilizada por otros usuarios",
         "`DROP DATABASE` con conexiones abiertas",
         "`DROP DATABASE x WITH (FORCE);`"
        ],
        [
         "`2BP01`",
         "no se puede eliminar tabla «x» porque otros objetos dependen de él",
         "`DROP TABLE` de una tabla referenciada",
         "Borra antes las dependientes o `CASCADE`"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "errores-leer",
    "titulo": "Cómo leer un error",
    "bloques": [
     {
      "consola": "ERROR:  update o delete en «clientes» viola la llave foránea «pedidos_id_cliente_fkey» en la tabla «pedidos»\n│        └─ QUÉ ha pasado                                    └─ QUÉ restricción (tabla_columna_tipo)\nDETAIL:  La llave (id_cliente)=(1) todavía es referida desde la tabla «pedidos».\n│        └─ el DATO concreto que lo provoca\nLINE 1: …                                 ← (en errores de sintaxis) la línea y un ^ debajo del punto exacto"
     },
     {
      "tabla": {
       "cabs": [
        "Sufijo del nombre automático",
        "Tipo de restricción"
       ],
       "filas": [
        [
         "`_pkey`",
         "Primary key"
        ],
        [
         "`_fkey`",
         "Foreign key"
        ],
        [
         "`_key`",
         "Unique"
        ],
        [
         "`_check`",
         "Check"
        ],
        [
         "`_not_null`",
         "Not null (PostgreSQL 18)"
        ]
       ]
      }
     }
    ]
   }
  ]
 },
 "mod-20": {
  "resumen": "diseño · consultas · modificación",
  "secciones": [
   {
    "id": "d1",
    "titulo": "D1 · Reservas de un hotel",
    "bloques": [
     {
      "nota": "** Caso real:** un hotel guarda de cada cliente su DNI, nombre y email, y de cada habitación su número, tipo (individual, doble o suite) y precio por noche. Un cliente puede hacer varias reservas; cada reserva es de un cliente y una habitación, con fecha de entrada y de salida. La salida debe ser posterior a la entrada y no puede haber dos reservas de la misma habitación que empiecen el mismo día.",
      "tipo": "note"
     },
     {
      "consola": "CLIENTES     (id_cliente, dni, nombre, email)\nHABITACIONES (numero, tipo, precio_noche)\nRESERVAS     (id_reserva, id_cliente*, numero_habitacion*, fecha_entrada, fecha_salida)"
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "CREATE TYPE tipo_habitacion AS ENUM ('individual', 'doble', 'suite');\n\nCREATE TABLE clientes_hotel (\n    id_cliente  INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n    dni         CHAR(9) NOT NULL UNIQUE,\n    nombre      VARCHAR(100) NOT NULL,\n    email       VARCHAR(100) UNIQUE\n);\n\nCREATE TABLE habitaciones (\n    numero        SMALLINT PRIMARY KEY,                 -- clave natural: el número de la puerta\n    tipo          tipo_habitacion NOT NULL,\n    precio_noche  NUMERIC(6,2) NOT NULL CHECK (precio_noche > 0)\n);\n\nCREATE TABLE reservas (\n    id_reserva         INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n    id_cliente         INTEGER  NOT NULL REFERENCES clientes_hotel (id_cliente),\n    numero_habitacion  SMALLINT NOT NULL REFERENCES habitaciones (numero),\n    fecha_entrada      DATE NOT NULL,\n    fecha_salida       DATE NOT NULL,\n    CONSTRAINT ck_reservas_fechas CHECK (fecha_salida > fecha_entrada),\n    CONSTRAINT uq_reservas_habitacion_dia UNIQUE (numero_habitacion, fecha_entrada)\n);"
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
         "`CHECK (fecha_salida > fecha_entrada)` a nivel de tabla",
         "Compara **dos columnas**: no puede ir en la definición de una sola"
        ],
        [
         "`UNIQUE (numero_habitacion, fecha_entrada)`",
         "La regla es sobre la **pareja**: la habitación se repite en muchas reservas y la fecha también, pero no juntas"
        ],
        [
         "`numero` como PK natural",
         "El número de habitación es único, corto y no cambia"
        ],
        [
         "El precio total **no** se guarda",
         "Es derivado: `(fecha_salida - fecha_entrada) * precio_noche`"
        ]
       ]
      }
     },
     {
      "sub": "Esto no impide reservas **solapadas** que empiecen en días distintos (del 1 al 5 y del 3 al 7). PostgreSQL lo resuelve con restricciones de exclusión y, en la versión 18, con `WITHOUT OVERLAPS`, pero es avanzado."
     }
    ]
   },
   {
    "id": "d2",
    "titulo": "D2 · Plataforma de cursos online",
    "bloques": [
     {
      "nota": "** Caso real:** de cada alumno se guarda email y nombre; de cada curso, título y precio. Cada curso se divide en lecciones numeradas (1, 2, 3…) con título y duración en minutos; la lección 1 del curso A y la lección 1 del curso B son distintas. Un alumno se inscribe en varios cursos y un curso tiene muchos alumnos; de cada inscripción interesa la fecha y el porcentaje de progreso.",
      "tipo": "note"
     },
     {
      "consola": " ALUMNO ──N── <Se inscribe> ──N── CURSO ──1── <Tiene> ──N── LECCIÓN (entidad débil)\n                      │\n                      ├ fecha\n                      └ progreso"
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "CREATE TABLE alumnos (\n    id_alumno  INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n    email      VARCHAR(100) NOT NULL UNIQUE,\n    nombre     VARCHAR(100) NOT NULL\n);\n\nCREATE TABLE cursos (\n    id_curso  INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n    titulo    VARCHAR(150) NOT NULL,\n    precio    NUMERIC(6,2) NOT NULL DEFAULT 0 CHECK (precio >= 0)    -- 0 = gratuito\n);\n\n-- Entidad débil: la lección solo existe dentro de su curso\nCREATE TABLE lecciones (\n    id_curso     INTEGER  NOT NULL REFERENCES cursos (id_curso) ON DELETE CASCADE,\n    num_leccion  SMALLINT NOT NULL CHECK (num_leccion > 0),\n    titulo       VARCHAR(150) NOT NULL,\n    minutos      SMALLINT NOT NULL CHECK (minutos > 0),\n    PRIMARY KEY (id_curso, num_leccion)\n);\n\n-- N:M con atributos de la relación\nCREATE TABLE inscripciones (\n    id_alumno  INTEGER NOT NULL REFERENCES alumnos (id_alumno),\n    id_curso   INTEGER NOT NULL REFERENCES cursos (id_curso),\n    fecha      DATE NOT NULL DEFAULT CURRENT_DATE,\n    progreso   SMALLINT NOT NULL DEFAULT 0 CHECK (progreso BETWEEN 0 AND 100),\n    PRIMARY KEY (id_alumno, id_curso)\n);"
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
         "`PRIMARY KEY (id_curso, num_leccion)`",
         "Entidad débil: `num_leccion` solo es único **dentro** de su curso"
        ],
        [
         "`ON DELETE CASCADE` en `lecciones`",
         "Sin curso, sus lecciones no tienen sentido"
        ],
        [
         "`inscripciones` sin `ON DELETE CASCADE`",
         "Borrar un curso con alumnos inscritos debe dar error: es una decisión de negocio, no un efecto secundario"
        ],
        [
         "PK compuesta en `inscripciones`",
         "Un alumno no se inscribe dos veces en el mismo curso"
        ],
        [
         "`progreso` en la relación",
         "No es del alumno (tiene uno por curso) ni del curso (uno por alumno)"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "d3",
    "titulo": "D3 · Gestor de incidencias (bug tracker)",
    "bloques": [
     {
      "nota": "** Caso real:** un equipo de desarrollo registra incidencias. Cada incidencia tiene título, descripción, prioridad (1 a 4), estado (abierta, en curso, resuelta, cerrada) y fecha de creación. La **reporta** un usuario y puede estar **asignada** a otro (o a nadie todavía). Los usuarios pueden añadir comentarios a una incidencia.",
      "tipo": "note"
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "CREATE TYPE estado_incidencia AS ENUM ('abierta', 'en_curso', 'resuelta', 'cerrada');\n\nCREATE TABLE usuarios_equipo (\n    id_usuario  INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n    nombre      VARCHAR(100) NOT NULL,\n    email       VARCHAR(100) NOT NULL UNIQUE,\n    rol         VARCHAR(30)  NOT NULL CHECK (rol IN ('dev', 'qa', 'pm'))\n);\n\nCREATE TABLE incidencias (\n    id_incidencia  INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n    titulo         VARCHAR(200) NOT NULL,\n    descripcion    TEXT,\n    prioridad      SMALLINT NOT NULL DEFAULT 3 CHECK (prioridad BETWEEN 1 AND 4),\n    estado         estado_incidencia NOT NULL DEFAULT 'abierta',\n    creada_en      TIMESTAMP NOT NULL DEFAULT now(),\n    id_reportador  INTEGER NOT NULL REFERENCES usuarios_equipo (id_usuario),\n    id_asignado    INTEGER REFERENCES usuarios_equipo (id_usuario) ON DELETE SET NULL\n);\n\nCREATE TABLE comentarios (\n    id_comentario  INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n    id_incidencia  INTEGER NOT NULL REFERENCES incidencias (id_incidencia) ON DELETE CASCADE,\n    id_usuario     INTEGER NOT NULL REFERENCES usuarios_equipo (id_usuario),\n    texto          TEXT NOT NULL,\n    escrito_en     TIMESTAMP NOT NULL DEFAULT now()\n);"
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
         "Dos FK a `usuarios_equipo`",
         "Son **dos relaciones distintas** (reporta y está asignada) con la misma entidad. Al consultar, se hace `JOIN` dos veces con alias distintos"
        ],
        [
         "`id_reportador NOT NULL`, `id_asignado` opcional",
         "Toda incidencia la reporta alguien; puede no estar asignada todavía"
        ],
        [
         "`ON DELETE SET NULL` en `id_asignado`",
         "Si alguien deja el equipo, sus incidencias vuelven a estar sin asignar"
        ],
        [
         "`prioridad` con `CHECK` y no `ENUM`",
         "Es un número que se ordena y compara (`prioridad <= 2` = urgentes)"
        ]
       ]
      }
     },
     {
      "code": "-- Consulta típica: cada incidencia con quién la reportó y a quién está asignada\nSELECT i.id_incidencia, i.titulo,\n       r.nombre AS reportada_por,\n       COALESCE(a.nombre, 'sin asignar') AS asignada_a\nFROM incidencias i\nJOIN usuarios_equipo r      ON r.id_usuario = i.id_reportador\nLEFT JOIN usuarios_equipo a ON a.id_usuario = i.id_asignado;",
      "lang": "sql"
     }
    ]
   },
   {
    "id": "c01",
    "titulo": "C01 · Catálogo de la web",
    "bloques": [
     {
      "nota": "** Caso real:** la página de la tienda solo muestra productos **activos** y **con stock**, agrupados por categoría y del más barato al más caro.",
      "tipo": "note"
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "SELECT cat.nombre AS categoria,\n       pr.nombre  AS producto,\n       pr.precio\nFROM productos pr\nJOIN categorias cat ON cat.id_categoria = pr.id_categoria\nWHERE pr.activo\n  AND pr.stock > 0\nORDER BY cat.nombre, pr.precio;"
      }
     },
     {
      "tabla": {
       "cabs": [
        "Clave",
        "Por qué"
       ],
       "filas": [
        [
         "`WHERE pr.activo`",
         "Una columna `BOOLEAN` ya es una condición; no hace falta `= TRUE`"
        ],
        [
         "`JOIN` y no `LEFT JOIN`",
         "Todo producto tiene categoría (`NOT NULL`), y las categorías vacías no interesan en el catálogo"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "c02",
    "titulo": "C02 · Buscador de productos",
    "bloques": [
     {
      "nota": "** Caso real:** el usuario filtra por \"conectividad y almacenamiento\": productos cuyo nombre contenga usb o ssd (sin importar mayúsculas), pero **solo** activos y de menos de 120 €.",
      "tipo": "note"
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "SELECT nombre, precio\nFROM productos\nWHERE (nombre ILIKE '%usb%' OR nombre ILIKE '%ssd%')\n  AND activo\n  AND precio < 120;"
      }
     },
     {
      "tabla": {
       "cabs": [
        "Clave",
        "Por qué"
       ],
       "filas": [
        [
         "Paréntesis alrededor del `OR`",
         "Sin ellos, `AND` se evalúa primero: `usb OR (ssd AND activo AND precio < 120)`. Los que tienen usb saldrían sin comprobar si están activos ni el precio"
        ],
        [
         "`ILIKE`",
         "Encuentra `USB`, `usb`, `Usb`…"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "c03",
    "titulo": "C03 · Alerta de reposición",
    "bloques": [
     {
      "nota": "** Caso real:** el almacén quiere la lista de productos activos con menos de 5 unidades, indicando cuántas pedir al proveedor para llegar a 10 y la urgencia.",
      "tipo": "note"
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "SELECT nombre,\n       stock,\n       10 - stock AS unidades_a_pedir,\n       CASE WHEN stock = 0 THEN 'URGENTE' ELSE 'Normal' END AS prioridad\nFROM productos\nWHERE activo AND stock < 5\nORDER BY stock, nombre;"
      }
     }
    ]
   },
   {
    "id": "c04",
    "titulo": "C04 · Ticket de un pedido",
    "bloques": [
     {
      "nota": "** Caso real:** el cliente abre \"Mis pedidos\" → pedido 8. Se muestran las líneas y el total (productos + envío).",
      "tipo": "note"
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "SELECT pr.nombre          AS producto,\n       l.cantidad,\n       l.precio_unitario,\n       l.subtotal\nFROM lineas_pedido l\nJOIN productos pr ON pr.id_producto = l.id_producto\nWHERE l.id_pedido = 8\nORDER BY l.subtotal DESC;\n\nSELECT SUM(l.subtotal)                    AS productos,\n       p.gastos_envio                     AS envio,\n       SUM(l.subtotal) + p.gastos_envio   AS total\nFROM pedidos p\nJOIN lineas_pedido l ON l.id_pedido = p.id_pedido\nWHERE p.id_pedido = 8\nGROUP BY p.id_pedido;"
      }
     },
     {
      "tabla": {
       "cabs": [
        "Clave",
        "Por qué"
       ],
       "filas": [
        [
         "`l.precio_unitario` y no `pr.precio`",
         "El ticket muestra el precio **al que se vendió**, no el actual"
        ],
        [
         "`GROUP BY p.id_pedido` permite usar `p.gastos_envio`",
         "Al agrupar por la **PK**, PostgreSQL sabe que el resto de columnas de esa tabla tienen un único valor"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "c05",
    "titulo": "C05 · Ventas por categoría",
    "bloques": [
     {
      "nota": "** Caso real:** el informe mensual de dirección: unidades y facturación por categoría, **sin** pedidos cancelados, e incluyendo las categorías que no han vendido nada (para verlas en 0).",
      "tipo": "note"
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "WITH lineas_validas AS (                     -- 1. primero, solo las líneas de pedidos NO cancelados\n    SELECT l.id_producto, l.cantidad, l.subtotal\n    FROM lineas_pedido l\n    JOIN pedidos p ON p.id_pedido = l.id_pedido\n    WHERE p.estado <> 'cancelado'\n)\nSELECT cat.nombre                     AS categoria,   -- 2. después, todas las categorías\n       COALESCE(SUM(lv.cantidad), 0)  AS unidades,\n       COALESCE(SUM(lv.subtotal), 0)  AS facturado\nFROM categorias cat\nLEFT JOIN productos pr       ON pr.id_categoria = cat.id_categoria\nLEFT JOIN lineas_validas lv  ON lv.id_producto = pr.id_producto\nGROUP BY cat.id_categoria, cat.nombre\nORDER BY facturado DESC;"
      }
     },
     {
      "tabla": {
       "cabs": [
        "Clave",
        "Por qué"
       ],
       "filas": [
        [
         "`LEFT JOIN` en toda la cadena",
         "Si uno solo fuera `INNER`, Gaming desaparecería"
        ],
        [
         "Filtrar los cancelados **antes**, en la CTE",
         "Si se filtra en un `WHERE` al final (`WHERE p.estado <> 'cancelado'`), se pierden las filas con `NULL`, y con ellas las categorías sin ventas: el `LEFT JOIN` se convierte en `INNER` ([MOD.12](@join-left))"
        ],
        [
         "`COALESCE(SUM(…), 0)`",
         "`SUM` de nada da `NULL`; el informe debe mostrar `0`"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "c06",
    "titulo": "C06 · Top 3 clientes",
    "bloques": [
     {
      "nota": "** Caso real:** marketing quiere enviar un cupón a los 3 clientes que más han gastado (pedidos no cancelados, incluyendo envío).",
      "tipo": "note"
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "WITH gasto_pedido AS (\n    SELECT p.id_pedido, p.id_cliente,\n           SUM(l.subtotal) + p.gastos_envio AS total\n    FROM pedidos p\n    JOIN lineas_pedido l ON l.id_pedido = p.id_pedido\n    WHERE p.estado <> 'cancelado'\n    GROUP BY p.id_pedido\n)\nSELECT c.nombre || ' ' || c.apellidos AS cliente,\n       c.email,\n       SUM(g.total)                   AS gastado\nFROM gasto_pedido g\nJOIN clientes c ON c.id_cliente = g.id_cliente\nGROUP BY c.id_cliente\nORDER BY gastado DESC\nLIMIT 3;"
      }
     },
     {
      "tabla": {
       "cabs": [
        "Clave",
        "Por qué"
       ],
       "filas": [
        [
         "Primero el total por **pedido** (CTE)",
         "Si se suman los gastos de envío directamente en un `JOIN` con las líneas, se repiten una vez por cada línea"
        ],
        [
         "`ORDER BY … DESC LIMIT 3`",
         "El \"top N\" clásico"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "c07",
    "titulo": "C07 · Clientes inactivos (campaña de reactivación)",
    "bloques": [
     {
      "nota": "** Caso real:** a fecha 3 de octubre de 2026, buscar los clientes que **nunca** han comprado o cuyo último pedido fue hace más de 90 días.",
      "tipo": "note"
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "SELECT c.nombre,\n       c.email,\n       MAX(p.fecha)::DATE                               AS ultimo_pedido,\n       DATE '2026-10-03' - MAX(p.fecha)::DATE           AS dias_sin_comprar\nFROM clientes c\nLEFT JOIN pedidos p ON p.id_cliente = c.id_cliente\nGROUP BY c.id_cliente\nHAVING MAX(p.fecha) IS NULL\n    OR MAX(p.fecha) < DATE '2026-10-03' - 90\nORDER BY ultimo_pedido NULLS FIRST;"
      }
     },
     {
      "tabla": {
       "cabs": [
        "Clave",
        "Por qué"
       ],
       "filas": [
        [
         "`HAVING` y no `WHERE`",
         "La condición es sobre `MAX(p.fecha)`, un agregado"
        ],
        [
         "`MAX(p.fecha) IS NULL`",
         "Clientes sin pedidos (gracias al `LEFT JOIN`)"
        ],
        [
         "`DATE '2026-10-03'`",
         "Fecha fija para que el ejemplo dé siempre lo mismo; en la vida real: `CURRENT_DATE`"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "c08",
    "titulo": "C08 · Rendimiento de los comerciales",
    "bloques": [
     {
      "nota": "** Caso real:** el jefe de ventas quiere, por empleado, cuántos pedidos ha gestionado, cuántos acabaron entregados y cuánto suman, incluidos los empleados sin pedidos.",
      "tipo": "note"
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "SELECT e.nombre,\n       e.puesto,\n       COUNT(DISTINCT p.id_pedido)                                        AS pedidos,\n       COUNT(DISTINCT p.id_pedido) FILTER (WHERE p.estado = 'entregado')  AS entregados,\n       COALESCE(SUM(l.subtotal) FILTER (WHERE p.estado <> 'cancelado'), 0) AS facturado\nFROM empleados e\nLEFT JOIN pedidos p       ON p.id_empleado = e.id_empleado\nLEFT JOIN lineas_pedido l ON l.id_pedido = p.id_pedido\nGROUP BY e.id_empleado\nORDER BY facturado DESC;"
      }
     },
     {
      "tabla": {
       "cabs": [
        "Clave",
        "Por qué"
       ],
       "filas": [
        [
         "`COUNT(DISTINCT p.id_pedido)`",
         "Al unir con las líneas, cada pedido aparece una vez **por línea**; sin `DISTINCT` se contaría de más"
        ],
        [
         "`FILTER (WHERE …)`",
         "Varios recuentos con condiciones distintas en una sola consulta"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "c09",
    "titulo": "C09 · Ticket medio por mes",
    "bloques": [
     {
      "nota": "** Caso real:** evolución mensual del importe medio por pedido (sin cancelados ni envío).",
      "tipo": "note"
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "WITH totales AS (\n    SELECT p.id_pedido,\n           date_trunc('month', p.fecha) AS mes,\n           SUM(l.subtotal)              AS total\n    FROM pedidos p\n    JOIN lineas_pedido l ON l.id_pedido = p.id_pedido\n    WHERE p.estado <> 'cancelado'\n    GROUP BY p.id_pedido\n)\nSELECT to_char(mes, 'YYYY-MM')   AS mes,\n       COUNT(*)                  AS pedidos,\n       round(AVG(total), 2)      AS ticket_medio\nFROM totales\nGROUP BY mes\nORDER BY mes;"
      }
     },
     {
      "tabla": {
       "cabs": [
        "Clave",
        "Por qué"
       ],
       "filas": [
        [
         "Media sobre los **totales por pedido**",
         "`AVG(l.subtotal)` directamente daría la media por **línea**, no por pedido"
        ],
        [
         "`date_trunc('month', …)`",
         "Agrupa por mes **y año**. Con `EXTRACT(MONTH …)` se mezclarían eneros de años distintos"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "c10",
    "titulo": "C10 · Ventas con descuento",
    "bloques": [
     {
      "nota": "** Caso real:** detectar las líneas vendidas por debajo del precio actual del producto y qué descuento supusieron.",
      "tipo": "note"
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "SELECT l.id_pedido,\n       pr.nombre,\n       pr.precio                                                   AS precio_actual,\n       l.precio_unitario                                           AS precio_vendido,\n       round((pr.precio - l.precio_unitario) * 100 / pr.precio, 1) AS descuento_pct\nFROM lineas_pedido l\nJOIN productos pr ON pr.id_producto = l.id_producto\nWHERE l.precio_unitario < pr.precio\nORDER BY descuento_pct DESC;"
      }
     }
    ]
   },
   {
    "id": "c11",
    "titulo": "C11 · Producto estrella (con empates)",
    "bloques": [
     {
      "nota": "** Caso real:** el producto con más unidades vendidas. Si hay empate, deben salir **todos** los empatados.",
      "tipo": "note"
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "WITH unidades AS (\n    SELECT id_producto, SUM(cantidad) AS total_unidades\n    FROM lineas_pedido\n    GROUP BY id_producto\n)\nSELECT pr.nombre, u.total_unidades\nFROM unidades u\nJOIN productos pr ON pr.id_producto = u.id_producto\nWHERE u.total_unidades = (SELECT MAX(total_unidades) FROM unidades);"
      }
     },
     {
      "tabla": {
       "cabs": [
        "Clave",
        "Por qué"
       ],
       "filas": [
        [
         "`= (SELECT MAX(…))` en vez de `ORDER BY … LIMIT 1`",
         "`LIMIT 1` elegiría **uno** de los empatados al azar"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "c12",
    "titulo": "C12 · \"Quien compró esto también compró…\"",
    "bloques": [
     {
      "nota": "** Caso real:** el recomendador de la ficha de producto: parejas de productos que aparecen juntas en un mismo pedido.",
      "tipo": "note"
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "SELECT p1.nombre AS producto,\n       p2.nombre AS comprado_junto_con,\n       COUNT(*)  AS veces\nFROM lineas_pedido a\nJOIN lineas_pedido b ON b.id_pedido = a.id_pedido\n                    AND b.id_producto > a.id_producto       -- evita (A, A) y duplicados (A, B) / (B, A)\nJOIN productos p1 ON p1.id_producto = a.id_producto\nJOIN productos p2 ON p2.id_producto = b.id_producto\nGROUP BY p1.nombre, p2.nombre\nORDER BY veces DESC, producto\nLIMIT 5;"
      }
     },
     {
      "tabla": {
       "cabs": [
        "Clave",
        "Por qué"
       ],
       "filas": [
        [
         "Self join de `lineas_pedido`",
         "Se busca otra línea **del mismo pedido**"
        ],
        [
         "`b.id_producto > a.id_producto`",
         "Con `<>` saldría cada pareja dos veces (A-B y B-A); con `>` solo una"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "m1",
    "titulo": "M1 · Subida de tarifas",
    "bloques": [
     {
      "nota": "** Caso real:** el proveedor de Periféricos sube precios: +5 % redondeado a 2 decimales, solo productos activos. Hay que ver el antes y el después antes de confirmar.",
      "tipo": "note"
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "-- BEGIN;   ← en pgAdmin, empezar la transacción\nUPDATE productos pr\nSET precio = round(pr.precio * 1.05, 2)\nFROM productos antes                                  -- la misma tabla, vista ANTES del cambio\nWHERE antes.id_producto = pr.id_producto\n  AND pr.id_categoria = (SELECT id_categoria FROM categorias WHERE nombre = 'Periféricos')\n  AND pr.activo\nRETURNING pr.nombre, antes.precio AS antes, pr.precio AS despues;\n-- COMMIT;  ← si todo está bien  (o ROLLBACK; para deshacer)"
      }
     },
     {
      "tabla": {
       "cabs": [
        "Clave",
        "Por qué"
       ],
       "filas": [
        [
         "Subconsulta para el `id_categoria`",
         "No dependes de saber que Periféricos es el 2"
        ],
        [
         "`FROM productos antes`",
         "Una segunda copia de la tabla que conserva el precio anterior para el `RETURNING`. En PostgreSQL 18 basta con `RETURNING old.precio, new.precio`"
        ],
        [
         "`RETURNING`",
         "Ves qué filas cambiaron sin otro `SELECT`"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "m2",
    "titulo": "M2 · Registrar un pedido completo",
    "bloques": [
     {
      "nota": "** Caso real:** Diego compra 2 altavoces JBL. Hay que crear el pedido, su línea con el precio actual y descontar el stock, **todo o nada**.",
      "tipo": "note"
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "-- BEGIN;\nWITH nuevo_pedido AS (\n    INSERT INTO pedidos (id_cliente, estado, gastos_envio)\n    VALUES ((SELECT id_cliente FROM clientes WHERE email = 'diego.santos@correo.com'), 'pendiente', 4.99)\n    RETURNING id_pedido\n)\nINSERT INTO lineas_pedido (id_pedido, id_producto, cantidad, precio_unitario)\nSELECT np.id_pedido, pr.id_producto, 2, pr.precio\nFROM nuevo_pedido np CROSS JOIN productos pr          -- una fila del pedido × el producto elegido\nWHERE pr.nombre = 'Altavoz JBL Flip 6'\nRETURNING id_pedido, id_producto, cantidad, subtotal;\n\nUPDATE productos SET stock = stock - 2\nWHERE nombre = 'Altavoz JBL Flip 6'\nRETURNING nombre, stock;\n-- COMMIT;"
      }
     },
     {
      "tabla": {
       "cabs": [
        "Clave",
        "Por qué"
       ],
       "filas": [
        [
         "Transacción",
         "Si falla el stock (no hay unidades → salta el `CHECK`), no debe quedar un pedido a medias"
        ],
        [
         "CTE con `INSERT … RETURNING`",
         "Usa el `id_pedido` recién generado sin saberlo de antemano"
        ],
        [
         "`pr.precio` como `precio_unitario`",
         "Se guarda el precio **del momento**"
        ]
       ]
      }
     },
     {
      "sub": "En una aplicación real, el descuento de stock lo haría un trigger ([MOD.17](@triggers)) o el backend en Java."
     }
    ]
   },
   {
    "id": "m3",
    "titulo": "M3 · Descatalogar productos sin ventas",
    "bloques": [
     {
      "nota": "** Caso real:** retirar de la web los productos que llevan más de 90 días en catálogo (a 3 de octubre de 2026) y no se han vendido nunca.",
      "tipo": "note"
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "UPDATE productos pr\nSET activo = FALSE\nWHERE pr.activo\n  AND pr.fecha_alta < DATE '2026-10-03' - 90\n  AND NOT EXISTS (SELECT 1 FROM lineas_pedido l WHERE l.id_producto = pr.id_producto)\nRETURNING id_producto, nombre, fecha_alta;"
      }
     },
     {
      "tabla": {
       "cabs": [
        "Clave",
        "Por qué"
       ],
       "filas": [
        [
         "`UPDATE activo = FALSE` y no `DELETE`",
         "Se conserva la información; además, si tuviera ventas, la FK impediría borrarlo"
        ],
        [
         "`NOT EXISTS`",
         "\"Sin ventas\" sin la trampa de `NOT IN` con `NULL`"
        ]
       ]
      }
     }
    ]
   },
   {
    "id": "m4",
    "titulo": "M4 · Derecho al olvido (RGPD)",
    "bloques": [
     {
      "nota": "** Caso real:** Sara pide que se borren sus datos personales. No se puede borrar el cliente (sus pedidos deben conservarse para contabilidad), así que se **anonimiza**.",
      "tipo": "note"
     },
     {
      "code": "DELETE FROM clientes WHERE email = 'sara.molina@correo.com';",
      "lang": "sql"
     },
     {
      "sub": "[[no]] RESPUESTA DE POSTGRESQL"
     },
     {
      "consola": "ERROR:  update o delete en «clientes» viola la llave foránea «pedidos_id_cliente_fkey» en la tabla «pedidos»\nDETAIL:  La llave (id_cliente)=(5) todavía es referida desde la tabla «pedidos»."
     },
     {
      "live": {
       "titulo": "Pruébalo en tienda_online",
       "sql": "UPDATE clientes\nSET nombre    = 'Anónimo',\n    apellidos = '—',\n    email     = 'anonimo' || id_cliente || '@borrado.invalid',\n    telefono  = NULL,\n    ciudad    = NULL\nWHERE email = 'sara.molina@correo.com'\nRETURNING *;"
      }
     },
     {
      "tabla": {
       "cabs": [
        "Clave",
        "Por qué"
       ],
       "filas": [
        [
         "La FK impide el `DELETE`",
         "Y está bien que lo impida: los pedidos son documentos contables"
        ],
        [
         "`'anonimo' || id_cliente || '@…'`",
         "`email` es `NOT NULL` y `UNIQUE`: cada anónimo necesita uno distinto"
        ]
       ]
      }
     },
     {
      "consola": "┌─[ FIN DE TRANSMISIÓN ]─────────────────────────────────────────────────┐\n│  PostgreSQL · pgAdmin 4 · SQL ejecutado y comprobado                    │\n└──────────────────────────────────────────────────────────── SYS.OK ───┘"
     }
    ]
   }
  ],
  "intro": [
   {
    "p": "Cada misión parte de una necesidad real. La solución está a la vista, ejecutada sobre `tienda_online` con su resultado y una tabla con las claves de por qué está hecha así."
   },
   {
    "tabla": {
     "cabs": [
      "ID",
      "Caso real",
      "Conceptos"
     ],
     "filas": [
      [
       "[D1](@d1)",
       "Reservas de un hotel",
       "1:N, `CHECK` entre columnas, `UNIQUE` compuesto"
      ],
      [
       "[D2](@d2)",
       "Plataforma de cursos online",
       "N:M con atributos, entidad débil, PK compuesta"
      ],
      [
       "[D3](@d3)",
       "Gestor de incidencias (bug tracker)",
       "Dos FK a la misma tabla, `ENUM`, 1:N"
      ],
      [
       "[C01](@c01)",
       "Catálogo de la web",
       "`JOIN`, filtros, orden"
      ],
      [
       "[C02](@c02)",
       "Buscador de productos",
       "`ILIKE`, `OR`, paréntesis"
      ],
      [
       "[C03](@c03)",
       "Alerta de reposición",
       "`CASE`, cálculo"
      ],
      [
       "[C04](@c04)",
       "Ticket de un pedido",
       "N:M, `SUM`, subconsulta"
      ],
      [
       "[C05](@c05)",
       "Ventas por categoría",
       "`LEFT JOIN`, `COALESCE`, `GROUP BY`"
      ],
      [
       "[C06](@c06)",
       "Top 3 clientes",
       "CTE, `LIMIT`"
      ],
      [
       "[C07](@c07)",
       "Clientes inactivos (marketing)",
       "`LEFT JOIN`, `MAX`, `HAVING`, fechas"
      ],
      [
       "[C08](@c08)",
       "Rendimiento de comerciales",
       "`LEFT JOIN`, `FILTER`"
      ],
      [
       "[C09](@c09)",
       "Ticket medio por mes",
       "CTE, `date_trunc`, `to_char`"
      ],
      [
       "[C10](@c10)",
       "Ventas con descuento",
       "Comparar con el precio actual, porcentaje"
      ],
      [
       "[C11](@c11)",
       "Producto estrella (con empates)",
       "Subconsulta con `MAX`"
      ],
      [
       "[C12](@c12)",
       "\"Quien compró esto también compró…\"",
       "Self join de la tabla intermedia"
      ],
      [
       "[M1](@m1)",
       "Subida de tarifas",
       "`UPDATE` + `RETURNING` en transacción"
      ],
      [
       "[M2](@m2)",
       "Registrar un pedido completo",
       "Transacción, CTE con `INSERT … RETURNING`"
      ],
      [
       "[M3](@m3)",
       "Descatalogar productos sin ventas",
       "`UPDATE` con `NOT EXISTS`"
      ],
      [
       "[M4](@m4)",
       "Derecho al olvido (RGPD)",
       "Anonimizar en vez de borrar"
      ]
     ]
    }
   }
  ]
 }
};
  APP.register({ slug: "sql", contenido: mods });
})();

/* Temario de cada chuleta: qué módulos tiene y cuáles están ya escritos.
   Un módulo sin `secciones` aparece en el índice como «en preparación».
   El contenido de cada módulo está en content/<temario>.js. */
(function () {
  const M = (num, titulo) => ({ id: "mod-" + num.toLowerCase(), num, title: titulo });

  APP.register({
    slug: "sql", nombre: "SQL", etiqueta: "BD + SQL", modulo: "Bases de datos", tema: "PostgreSQL 18 · pgAdmin 4",
    modulos: [
      M("DB", "BD de práctica"), M("00", "Conceptos base"), M("01", "pgAdmin 4 y psql"), M("02", "Modelo Entidad/Relación"),
      M("03", "Modelo relacional"), M("04", "Normalización"), M("05", "DDL: bases de datos y tablas"), M("06", "Tipos de datos"),
      M("07", "Restricciones"), M("08", "DML: INSERT, UPDATE, DELETE"), M("09", "SELECT básico"), M("10", "Funciones"),
      M("11", "Agrupar y agregar"), M("12", "JOIN"), M("13", "Subconsultas, CTE y conjuntos"), M("14", "Vistas e índices"),
      M("15", "Transacciones"), M("16", "Usuarios y permisos"), M("17", "Programación en la BD"),
      M("18", "Copias, importar y exportar"), M("19", "Errores frecuentes"), M("20", "Misiones: casos reales"),
    ],
  });
  APP.register({
    slug: "java", nombre: "Java", etiqueta: "JAVA", modulo: "Programación", tema: "Java 21 LTS · IntelliJ IDEA",
    modulos: [
      M("00", "Estructura de un programa"), M("01", "Tipos de datos"), M("02", "Operadores"), M("03", "Entrada y salida"),
      M("04", "Estructuras de control"), M("05", "¿Cuál elijo?"), M("06", "String"), M("07", "Números"), M("08", "Math y aleatorios"),
      M("09", "Arrays"), M("10", "ArrayList"), M("11", "Funciones"), M("12", "Excepciones frecuentes"), M("13", "Misiones"),
    ],
  });
  APP.register({
    slug: "html", nombre: "HTML", etiqueta: "HTML", modulo: "Lenguajes de marcas", tema: "HTML Living Standard",
    modulos: [
      M("00", "Fundamentos"), M("01", "Documento base"), M("02", "Bloque y en línea"), M("03", "Texto"), M("04", "Enlaces y rutas"),
      M("05", "Imágenes y multimedia"), M("06", "Listas"), M("07", "Tablas"), M("08", "Semántica y estructura"), M("09", "Formularios"),
      M("10", "Atributos globales"), M("11", "Accesibilidad"), M("12", "SEO y metadatos"), M("13", "Elementos interactivos"),
      M("14", "Validar y depurar"), M("15", "Misiones: casos reales"),
    ],
  });
  APP.register({
    slug: "css", nombre: "CSS", etiqueta: "CSS", modulo: "Lenguajes de marcas", tema: "CSS moderno",
    modulos: [
      M("00", "Fundamentos"), M("01", "Reset moderno"), M("02", "Selectores"), M("03", "Unidades y funciones"), M("04", "Color"),
      M("05", "Modelo de caja"), M("06", "Tipografía"), M("07", "Fondos, bordes y efectos"), M("08", "Posicionamiento"),
      M("09", "Flexbox"), M("10", "Grid"), M("11", "¿Flex o Grid? y centrar"), M("12", "Responsive"), M("13", "Variables"),
      M("14", "Transiciones y animaciones"), M("15", "Arquitectura"), M("16", "CSS moderno"), M("17", "Depurar"),
      M("18", "Misiones: componentes reales"),
    ],
  });
  // JavaScript: misma estructura que Java, con las propiedades, métodos y características propias de JS.
  APP.register({
    slug: "js", nombre: "JavaScript", etiqueta: "JS", modulo: "Desarrollo web en entorno cliente", tema: "JavaScript moderno (ES2024)",
    modulos: [
      M("00", "Estructura y consola"), M("01", "Variables y tipos"), M("02", "Operadores"), M("03", "Entrada y salida"),
      M("04", "Estructuras de control"), M("05", "¿Cuál elijo?"), M("06", "String"), M("07", "Números"), M("08", "Math y aleatorios"),
      M("09", "Arrays"), M("10", "Métodos de array"), M("11", "Funciones"), M("12", "Objetos y JSON"), M("13", "DOM"),
      M("14", "Eventos"), M("15", "Asincronía y fetch"), M("16", "Errores frecuentes"), M("17", "Misiones"),
    ],
  });
})();

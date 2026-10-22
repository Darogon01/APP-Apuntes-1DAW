from jslib import *

M('00', 'script · consola · comentarios · convenciones',
 S('js-que-es', 'Qué es y dónde se ejecuta',
   P('**JavaScript** es el lenguaje que da comportamiento a una página web: reacciona a clics, cambia el HTML y pide datos a un servidor. Se ejecuta en el navegador (cliente) y también fuera de él con **Node.js**. En esta guía se usa la versión moderna del lenguaje (ES2024) en el navegador.'),
   P('A diferencia de Java, **no se compila** ni hace falta declarar tipos: el navegador lee el código y lo ejecuta línea a línea. Por eso un error de sintaxis solo aparece cuando el navegador llega a esa línea.'),
   TAB(['', 'Java', 'JavaScript'],
       ['Tipos', 'Estáticos: `int x = 5;`', 'Dinámicos: `let x = 5;` (el valor tiene tipo, la variable no)'],
       ['Ejecución', 'Se compila a bytecode y corre en la JVM', 'El navegador (o Node.js) lo interpreta directamente'],
       ['Punto de entrada', '`public static void main`', 'No hay: el código se ejecuta de arriba abajo al cargar'],
       ['Clases obligatorias', 'Sí, todo vive en una clase', 'No: puedes escribir código suelto y funciones']),
 ),
 S('js-esqueleto', 'Cómo se enlaza al HTML',
   P('El JavaScript se escribe en un fichero `.js` y se enlaza desde el HTML con `<script>`. Con `defer` el navegador lo descarga mientras lee el HTML y lo ejecuta **cuando el DOM ya está completo**.'),
   CODE('''<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Mi primera página con JS</title>
  <script src="js/app.js" defer></script>
</head>
<body>
  <h1 id="titulo">Hola</h1>
</body>
</html>''', 'html', 'index.html'),
   CODE('''// js/app.js
console.log("Hola desde JavaScript");
document.getElementById("titulo").textContent = "Hola, DAW";''', 'js', 'js/app.js'),
   LIVE('Pruébalo: el primer programa', js='''console.log("Hola, mundo");
console.log("2 + 3 =", 2 + 3);''', alto=60),
   AV('Un `<script>` sin `defer` en el `<head>` se ejecuta **antes** de que existan los elementos del `<body>`: `document.getElementById("titulo")` devolvería `null`. Usa siempre `defer` (o pon el script al final del `<body>`).'),
 ),
 S('js-consola', 'La consola del navegador',
   P('Se abre con `F12` → pestaña **Console**. Es tu mejor herramienta para probar código y ver errores. `console.log()` es el equivalente a `System.out.println()` de Java.'),
   TAB(['Método', 'Para qué'],
       ['`console.log(a, b)`', 'Muestra valores separados por espacios'],
       ['`console.error(x)`', 'Mensaje en rojo (errores)'],
       ['`console.warn(x)`', 'Mensaje en amarillo (avisos)'],
       ['`console.table(array)`', 'Muestra un array u objeto como tabla'],
       ['`console.dir(obj)`', 'Muestra las propiedades de un objeto'],
       ['`console.clear()`', 'Limpia la consola']),
   LIVE('Pruébalo: tipos de mensaje', js='''console.log("Mensaje normal", 42, true);
console.warn("Aviso");
console.error("Error");
console.table([
  { nombre: "Lucía", edad: 22 },
  { nombre: "Marcos", edad: 31 }
]);''', alto=60),
 ),
 S('js-sintaxis', 'Sintaxis básica y convenciones',
   LST('Las **instrucciones** terminan con `;` (es opcional, pero se escribe siempre: evita sorpresas).',
       '**Mayúsculas y minúsculas** importan: `nombre` y `Nombre` son variables distintas.',
       'Variables y funciones en **camelCase**: `precioFinal`, `calcularTotal()`.',
       'Constantes "de verdad" (valores fijos del programa) en **MAYUSCULAS_CON_GUION**: `const IVA = 0.21;`.',
       'Clases en **PascalCase**: `class Cliente {}`.',
       'Cadenas con comillas dobles `"…"` o simples `\'…\'` (da igual, elige una y sé coherente). Las **comillas invertidas** (la tecla a la derecha de la `P`) permiten insertar variables dentro del texto.'),
   CODE('''// Comentario de una línea

/* Comentario
   de varias líneas */

/**
 * Comentario de documentación (JSDoc): lo entienden los editores.
 * @param {number} base Importe sin IVA
 * @returns {number} Importe con IVA
 */
function conIva(base) {
  return base * 1.21;
}''', 'js'),
 ),
)

M('01', 'let · const · tipos primitivos · typeof · conversión',
 S('js-variables', 'let, const y var',
   P('Para guardar un valor se declara una variable. Hoy se usan **dos** palabras clave: `const` (no se puede reasignar) y `let` (sí). `var` es la forma antigua y no se usa en código nuevo.'),
   TAB(['Palabra', 'Reasignable', 'Ámbito', 'Cuándo'],
       ['`const`', 'No', 'Bloque `{ }`', '**Por defecto.** Si el valor no va a cambiar'],
       ['`let`', 'Sí', 'Bloque `{ }`', 'Contadores, acumuladores, valores que cambian'],
       ['`var`', 'Sí', 'Función (se "escapa" del bloque)', 'Nunca en código nuevo']),
   LIVE('Pruébalo: const frente a let', js='''const IVA = 0.21;          // no cambiará
let total = 100;            // sí cambiará
total = total * (1 + IVA);
console.log(total);

IVA = 0.10;                 // ← TypeError: Assignment to constant variable''', alto=60),
   NT('`const` no significa "valor inmutable": significa que **la variable no se puede reasignar**. Un array o un objeto declarado con `const` sí puede modificarse por dentro (se ve en los módulos de arrays y objetos).', 'important'),
   AV('Una variable sin declarar (`precio = 5;` sin `let`) crea una variable **global** accidental. Activa `"use strict";` al inicio del fichero (o usa módulos) para que sea un error.'),
 ),
 S('js-tipos', 'Los tipos primitivos',
   P('En JavaScript la **variable** no tiene tipo; lo tiene el **valor**. Hay 7 tipos primitivos y todo lo demás son objetos.'),
   TAB(['Tipo', 'Ejemplo', 'Notas'],
       ['`number`', '`42`, `3.14`, `-7`, `NaN`, `Infinity`', 'Un solo tipo para enteros y decimales (coma flotante de 64 bits)'],
       ['`string`', '`"hola"`, `\'hola\'` o con comillas invertidas', 'Texto. **Inmutable**'],
       ['`boolean`', '`true`, `false`', 'Verdadero o falso'],
       ['`undefined`', '`undefined`', 'Variable declarada **sin valor**'],
       ['`null`', '`null`', 'Ausencia de valor **puesta a propósito**'],
       ['`bigint`', '`123n`', 'Enteros sin límite de tamaño (poco habitual)'],
       ['`symbol`', '`Symbol("id")`', 'Identificador único (uso avanzado)']),
   LIVE('Pruébalo: typeof', js='''console.log(typeof 42);          // "number"
console.log(typeof "hola");      // "string"
console.log(typeof true);        // "boolean"
console.log(typeof undefined);   // "undefined"
console.log(typeof null);        // "object"  ← error histórico del lenguaje
console.log(typeof [1, 2]);      // "object"  (los arrays son objetos)
console.log(typeof function () {}); // "function"''', alto=90),
   AV('`typeof null` devuelve `"object"`. Es un fallo histórico que no se puede corregir. Para comprobar `null` usa `valor === null`; para un array, `Array.isArray(valor)`.'),
 ),
 S('js-valores', 'Valores por defecto y falsy',
   P('Una variable declarada sin valor vale `undefined`. Al evaluar una condición, JavaScript convierte cualquier valor a booleano: unos valores cuentan como **falsy** (equivalen a `false`) y todo lo demás es **truthy**.'),
   TAB(['Falsy (solo estos 8)', 'Truthy (todo lo demás)'],
       ['`false`, `0`, `-0`, `0n`', '`true`, cualquier número distinto de 0'],
       ['`""` (cadena vacía)', '`"0"`, `"false"`, `" "` (cualquier texto con algo)'],
       ['`null`, `undefined`, `NaN`', '`[]` y `{}` (¡un array vacío es truthy!)']),
   LIVE('Pruébalo: qué cuenta como verdadero', js='''const valores = [0, "", null, undefined, NaN, "0", [], {}, -1];
for (const v of valores) {
  console.log(String(JSON.stringify(v)).padEnd(10), "→", Boolean(v));
}''', alto=120),
 ),
 S('js-valor-referencia', 'Valor frente a referencia',
   P('Los primitivos se copian **por valor**. Los objetos (arrays, objetos literales, funciones) se copian **por referencia**: dos variables apuntan al mismo objeto en memoria.'),
   LIVE('Pruébalo: copiar un número y copiar un array', js='''let a = 5;
let b = a;       // copia del valor
b = 10;
console.log(a, b);        // 5 10

const x = [1, 2, 3];
const y = x;     // misma referencia, no una copia
y.push(4);
console.log(x);           // [1, 2, 3, 4]  ← x también cambió
console.log(x === y);     // true''', alto=90),
 ),
 S('js-conversion', 'Conversión de tipos',
   P('JavaScript convierte tipos solo en algunas operaciones (**coerción implícita**), y a veces el resultado sorprende. Convierte tú de forma **explícita**.'),
   TAB(['De → a', 'Cómo', 'Ejemplo', 'Resultado'],
       ['Texto → número', '`Number(t)`', '`Number("42")`', '`42`'],
       ['Texto → entero', '`parseInt(t, 10)`', '`parseInt("42px", 10)`', '`42` (ignora lo que sobra)'],
       ['Texto → decimal', '`parseFloat(t)`', '`parseFloat("3.5kg")`', '`3.5`'],
       ['Texto no numérico', '`Number(t)`', '`Number("hola")`', '`NaN`'],
       ['Número → texto', '`String(n)` o `n.toString()`', '`String(42)`', '`"42"`'],
       ['Cualquiera → boolean', '`Boolean(v)` o `!!v`', '`Boolean("")`', '`false`']),
   LIVE('Pruébalo: coerción implícita', js='''console.log("5" + 3);     // "53"  (el + concatena si hay un texto)
console.log("5" - 3);     // 2     (el - solo sabe restar números)
console.log("5" * "2");   // 10
console.log(Number("3,5"));   // NaN  (con coma no vale: usa punto)
console.log(Number(""));      // 0    (¡cadena vacía → 0!)
console.log(Number(null), Number(undefined)); // 0 NaN''', alto=100),
   AV('Con el operador `+`, si **alguno** de los dos lados es texto, concatena. `"5" + 3` es `"53"`. Lo que escribe el usuario en un campo de formulario **siempre es texto**: conviértelo con `Number()` antes de calcular.'),
 ),
)

M('02', 'aritméticos · comparación · lógicos · ?? · ?.',
 S('js-aritmeticos', 'Aritméticos',
   TAB(['Operador', 'Qué hace', 'Ejemplo', 'Resultado'],
       ['`+`', 'Suma (o concatena texto)', '`7 + 2`', '`9`'],
       ['`-`', 'Resta', '`7 - 2`', '`5`'],
       ['`*`', 'Multiplica', '`7 * 2`', '`14`'],
       ['`/`', 'Divide (**siempre** da decimales)', '`7 / 2`', '`3.5`'],
       ['`%`', 'Resto de la división', '`7 % 2`', '`1`'],
       ['`**`', 'Potencia', '`2 ** 10`', '`1024`']),
   AV('En JavaScript **no existe la división entera**: `7 / 2` es `3.5`, no `3`. Para quedarte con la parte entera usa `Math.trunc(7 / 2)` (o `Math.floor` si son positivos).'),
   LIVE('Pruébalo: división y resto', js='''console.log(7 / 2);              // 3.5
console.log(Math.trunc(7 / 2));    // 3
console.log(7 % 2);                // 1
console.log(10 / 0, -10 / 0, 0 / 0); // Infinity -Infinity NaN''', alto=70),
 ),
 S('js-incremento', 'Incremento, decremento y asignación compuesta',
   TAB(['Operador', 'Equivale a'],
       ['`x++` / `++x`', '`x = x + 1` (el prefijo devuelve el valor **después**, el sufijo **antes**)'],
       ['`x--` / `--x`', '`x = x - 1`'],
       ['`x += 5`', '`x = x + 5`'],
       ['`x -= 5`, `x *= 2`, `x /= 2`, `x %= 3`, `x **= 2`', 'Lo mismo con cada operador'],
       ['`x ??= 0`, `x ||= 0`, `x &&= 0`', 'Asigna solo si la condición se cumple (ver más abajo)']),
   LIVE('Pruébalo: prefijo y sufijo', js='''let a = 5;
console.log(a++);  // 5  (devuelve y luego suma)
console.log(a);    // 6
console.log(++a);  // 7  (suma y luego devuelve)''', alto=70),
 ),
 S('js-comparacion', 'Comparación: == frente a ===',
   P('Los operadores de comparación devuelven un `boolean`. Hay dos formas de igualdad y **solo una se usa**.'),
   TAB(['Operador', 'Significado', 'Ejemplo'],
       ['`===`', '**Igual estricto**: mismo valor **y** mismo tipo', '`5 === "5"` → `false`'],
       ['`!==`', 'Distinto estricto', '`5 !== "5"` → `true`'],
       ['`==`', 'Igual con coerción de tipos (evitar)', '`5 == "5"` → `true`'],
       ['`<` `>` `<=` `>=`', 'Orden (con texto compara alfabéticamente)', '`"a" < "b"` → `true`']),
   AV('Usa siempre `===` y `!==`. El `==` convierte tipos antes de comparar y produce resultados como `0 == ""` → `true` o `null == undefined` → `true`.'),
   LIVE('Pruébalo: las trampas del ==', js='''console.log(0 == "");           // true   ← sorprendente
console.log(0 === "");          // false
console.log(null == undefined); // true
console.log(null === undefined);// false
console.log(NaN === NaN);       // false  ← NaN no es igual ni a sí mismo
console.log(Number.isNaN(NaN)); // true   ← así se comprueba
console.log([1] === [1]);       // false  ← dos arrays distintos''', alto=120),
 ),
 S('js-logicos', 'Lógicos y cortocircuito',
   TAB(['Operador', 'Nombre', 'Resultado'],
       ['`a && b`', 'Y', '`true` si **ambos** son verdaderos'],
       ['`a || b`', 'O', '`true` si **alguno** es verdadero'],
       ['`!a`', 'NO', 'Invierte el valor'],
       ['`a ?? b`', 'Coalescencia nula', '`a`, salvo que sea `null` o `undefined`: entonces `b`'],
       ['`a?.b`', 'Encadenado opcional', '`a.b`, pero si `a` es `null`/`undefined` devuelve `undefined` en lugar de dar error']),
   P('`&&` y `||` **no devuelven un booleano**: devuelven uno de los dos operandos. `a || b` devuelve `a` si es truthy y, si no, `b`; por eso se usa para valores por defecto.'),
   LIVE('Pruébalo: valores por defecto', js='''const nombre = "" || "Anónimo";
console.log(nombre);           // "Anónimo"  (|| trata "" como falsy)

const cantidad = 0 ?? 10;
console.log(cantidad);         // 0          (?? solo reemplaza null/undefined)

const usuario = null;
console.log(usuario?.nombre);  // undefined  (sin error)
console.log(usuario.nombre);   // TypeError: Cannot read properties of null''', alto=90),
   NT('Regla práctica: `||` si quieres sustituir **cualquier valor falsy**; `??` si solo quieres sustituir `null` o `undefined` (así un `0` o un `""` válidos se respetan).', 'tip'),
 ),
 S('js-ternario', 'Ternario',
   CODE('''const edad = 20;
const tipo = edad >= 18 ? "adulto" : "menor";   // condición ? siEsTrue : siEsFalse''', 'js'),
   P('Úsalo para **elegir un valor** entre dos. Si tiene que ejecutar varias instrucciones, usa un `if`.'),
 ),
 S('js-precedencia', 'Precedencia (de mayor a menor)',
   TAB(['Nivel', 'Operadores'],
       ['1', '`( )` paréntesis, `a.b`, `a?.b`, `f()`'],
       ['2', '`!`, `++`, `--`, `typeof`, `-x` (unario)'],
       ['3', '`**`'],
       ['4', '`*` `/` `%`'],
       ['5', '`+` `-`'],
       ['6', '`<` `>` `<=` `>=`'],
       ['7', '`===` `!==` `==` `!=`'],
       ['8', '`&&`'],
       ['9', '`||` `??`'],
       ['10', '`? :` ternario'],
       ['11', '`=` `+=` `-=` … asignación']),
   NT('`&&` se evalúa antes que `||`. En caso de duda, **usa paréntesis**: `(a || b) && c`. No mezcles `??` con `||` o `&&` sin paréntesis: es un error de sintaxis.', 'tip'),
 ),
)

M('03', 'console · alert/prompt · plantillas · formato',
 S('js-salida', 'Mostrar información',
   TAB(['Dónde', 'Cómo', 'Para qué'],
       ['Consola', '`console.log(x)`', 'Depurar mientras programas'],
       ['Ventana', '`alert("texto")`', 'Aviso que bloquea la página (equivale a `JOptionPane.showMessageDialog`)'],
       ['Página', '`elemento.textContent = "texto"`', 'Mostrar el resultado en la propia web (módulo DOM)']),
 ),
 S('js-entrada', 'Pedir datos',
   TAB(['Función', 'Devuelve', 'Si el usuario cancela'],
       ['`prompt("Pregunta", "valor inicial")`', 'Siempre **texto** (`string`)', '`null`'],
       ['`confirm("¿Seguro?")`', '`true` (Aceptar) o `false` (Cancelar)', '`false`']),
   CODE('''const texto = prompt("¿Cuántas unidades?");
if (texto === null) {
  console.log("El usuario canceló");
} else {
  const unidades = Number(texto);
  alert("Total: " + unidades * 2.5 + " €");
}''', 'js'),
   AV('`prompt` devuelve **texto** aunque escriban un número, y `null` si cancelan. Convierte con `Number()` y comprueba `Number.isNaN(n)` antes de calcular. En una web real se usan formularios en lugar de `prompt` (módulo Eventos).'),
 ),
 S('js-plantillas', 'Plantillas de texto (template literals)',
   P('Entre **comillas invertidas** puedes insertar cualquier expresión con `${ }` y escribir varias líneas. Sustituye a la concatenación con `+`.'),
   LIVE('Pruébalo: plantillas', js='''const producto = "Teclado";
const precio = 49.9;
const unidades = 3;

console.log("Producto: " + producto + ", total: " + precio * unidades);   // forma antigua
console.log(`Producto: ${producto}, total: ${precio * unidades}`);       // plantilla

console.log(`Línea 1
Línea 2`);''', alto=90),
 ),
 S('js-formato', 'Dar formato a números y fechas',
   TAB(['Necesito…', 'Cómo', 'Ejemplo → resultado'],
       ['Dos decimales', '`n.toFixed(2)` (devuelve **texto**)', '`(3.14159).toFixed(2)` → `"3.14"`'],
       ['Moneda en español', '`n.toLocaleString("es-ES", { style: "currency", currency: "EUR" })`', '`1234.5` → `"1234,50 €"`'],
       ['Miles con punto', '`n.toLocaleString("es-ES")`', '`1234567` → `"1.234.567"`'],
       ['Rellenar con ceros', '`String(n).padStart(2, "0")`', '`"7"` → `"07"`'],
       ['Fecha legible', '`fecha.toLocaleDateString("es-ES")`', '`22/10/2026`']),
   LIVE('Pruébalo: formato', js='''const precio = 1234.5;
console.log(precio.toFixed(2));
console.log(precio.toLocaleString("es-ES", { style: "currency", currency: "EUR" }));
console.log((0.256).toLocaleString("es-ES", { style: "percent" }));
console.log(new Date(2026, 9, 22).toLocaleDateString("es-ES", { dateStyle: "full" }));''', alto=90),
   AV('`toFixed` devuelve un **texto**, no un número: `(1.5).toFixed(2) + 1` es `"1.501"`. Úsalo solo al mostrar, no en medio de un cálculo.'),
 ),
)

M('04', 'if · switch · for · while · do-while · for…of · break/continue',
 S('js-if', 'if / else if / else',
   LIVE('Pruébalo: nota con if encadenados', js='''const nota = 7.5;

if (nota >= 9) {
  console.log("Sobresaliente");
} else if (nota >= 7) {
  console.log("Notable");
} else if (nota >= 5) {
  console.log("Aprobado");
} else {
  console.log("Suspenso");
}''', alto=60),
   NT('Se evalúan **en orden** y se ejecuta solo la primera rama cuya condición sea verdadera. Ordena de lo más restrictivo a lo más general.', 'tip'),
 ),
 S('js-switch', 'switch',
   P('Compara una variable con varios valores usando `===`. Cada `case` necesita su `break`; si lo olvidas, **sigue ejecutando el siguiente caso** (fall-through).'),
   LIVE('Pruébalo: días de la semana', js='''const dia = 6;
switch (dia) {
  case 6:
  case 7:
    console.log("Fin de semana");
    break;
  case 1: case 2: case 3: case 4: case 5:
    console.log("Laborable");
    break;
  default:
    console.log("Día no válido");
}''', alto=60),
 ),
 S('js-for', 'for, while y do-while',
   TAB(['Bucle', 'Cuándo', 'Sintaxis'],
       ['`for`', 'Sé cuántas iteraciones hay', '`for (let i = 0; i < n; i++) { … }`'],
       ['`while`', 'Depende de una condición; puede no entrar nunca', '`while (condición) { … }`'],
       ['`do…while`', 'Debe ejecutarse **al menos una vez**', '`do { … } while (condición);`']),
   LIVE('Pruébalo: tabla del 7 con for', js='''for (let i = 1; i <= 10; i++) {
  console.log(`7 x ${i} = ${7 * i}`);
}''', alto=150),
   LIVE('Pruébalo: while y do-while', js='''let n = 5;
while (n > 0) {
  console.log("cuenta atrás:", n);
  n--;
}

let intentos = 0;
do {
  intentos++;
  console.log("intento", intentos);
} while (intentos < 3);''', alto=150),
   AV('Si la condición de un `while` nunca se vuelve falsa, el bucle es infinito y **bloquea la pestaña**. Comprueba siempre que algo dentro del bucle cambia la condición (por eso el editor ejecuta el JS solo al pulsar «Ejecutar»).'),
 ),
 S('js-for-of', 'for…of y for…in',
   TAB(['Bucle', 'Recorre', 'Ejemplo'],
       ['`for (const x of coleccion)`', 'Los **valores** de un array, string, Set o Map', '`for (const fruta of frutas)`'],
       ['`for (const clave in objeto)`', 'Las **claves** de un objeto', '`for (const k in persona)`']),
   LIVE('Pruébalo: for…of y for…in', js='''const frutas = ["manzana", "pera", "uva"];
for (const fruta of frutas) {
  console.log(fruta);
}

const persona = { nombre: "Lucía", edad: 22 };
for (const clave in persona) {
  console.log(clave, "=", persona[clave]);
}''', alto=130),
   AV('No uses `for…in` con arrays: recorre **índices como texto** y puede incluir propiedades añadidas. Para arrays, `for…of` o `forEach`.'),
 ),
 S('js-break', 'break, continue y bucles anidados',
   TAB(['Instrucción', 'Efecto'],
       ['`break`', 'Sale del bucle (o del `switch`) inmediatamente'],
       ['`continue`', 'Salta a la siguiente iteración'],
       ['Etiqueta (`externo: for …` + `break externo`)', 'Sale de un bucle exterior desde uno interior (se usa poco)']),
   LIVE('Pruébalo: buscar el primer múltiplo y saltar impares', js='''for (let i = 1; i <= 20; i++) {
  if (i % 2 !== 0) continue;      // salta los impares
  if (i % 7 === 0) {
    console.log("primer múltiplo de 14:", i);
    break;                         // deja de buscar
  }
}

for (let fila = 1; fila <= 3; fila++) {      // bucles anidados
  let linea = "";
  for (let col = 1; col <= 4; col++) {
    linea += fila * col + "\\t";
  }
  console.log(linea);
}''', alto=130),
 ),
)

M('05', 'condicional · bucle · tipo de dato · colección · texto',
 S('js-eleg-condicional', 'Condicional',
   TAB(['Situación', 'Usa'],
       ['Una condición, dos caminos', '`if / else`'],
       ['Varios rangos o condiciones distintas', '`if / else if / else`'],
       ['Una variable con **valores concretos** (menú, día, opción)', '`switch`'],
       ['Elegir **un valor** entre dos en una expresión', 'Ternario `?:`'],
       ['Valor por defecto si falta un dato', '`??` o `||`'],
       ['Ejecutar algo solo si una condición es cierta, en una línea', '`condicion && accion()`']),
 ),
 S('js-eleg-bucle', 'Bucle',
   CON('''¿Sé cuántas iteraciones habrá antes de empezar?
 ├─ Sí
 │   ¿Necesito el índice o modificar elementos?
 │    ├─ Sí ─────────────────────────────► for clásico
 │    └─ No, solo leer cada uno ─────────► for…of
 └─ No, depende de lo que pase
     ¿Tiene que ejecutarse al menos una vez?
      ├─ Sí: menú, pedir un dato ────────► do…while
      └─ No: puede que nunca entre ──────► while'''),
   TAB(['Quiero…', 'Usa'],
       ['Recorrer un array con transformación', '`map`, `filter`, `reduce` (módulo Métodos de array)'],
       ['Recorrer las claves y valores de un objeto', '`for (const [k, v] of Object.entries(obj))`'],
       ['Repetir algo cada cierto tiempo', '`setInterval` (módulo Asincronía)']),
 ),
 S('js-eleg-tipo', 'Tipo de dato',
   TAB(['Necesito guardar…', 'Uso'],
       ['Un número (entero o decimal)', '`number`'],
       ['Un entero enorme (más de 15 cifras exactas)', '`bigint`'],
       ['Texto', '`string`'],
       ['Sí o no', '`boolean`'],
       ['"Todavía no hay valor" a propósito', '`null`'],
       ['Un dato con varias propiedades (cliente, producto)', 'Objeto `{ … }`'],
       ['Una lista ordenada de valores', 'Array `[ … ]`'],
       ['Valores únicos sin repetir', '`Set`'],
       ['Pares clave → valor con claves de cualquier tipo', '`Map`']),
 ),
 S('js-eleg-coleccion', 'Colección',
   TAB(['Colección', 'Orden', 'Repetidos', 'Acceso', 'Úsala para'],
       ['Array `[ ]`', 'Por posición', 'Sí', '`a[0]`', 'Listas, carrito, resultados'],
       ['Objeto `{ }`', 'Por inserción (claves texto)', 'No (claves únicas)', '`o.clave`', 'Un registro: cliente, producto'],
       ['`Set`', 'Por inserción', 'No', '`s.has(x)`', 'Eliminar duplicados, pertenencia'],
       ['`Map`', 'Por inserción', 'Claves únicas', '`m.get(k)`', 'Diccionarios, contadores']),
 ),
 S('js-eleg-texto', 'Texto',
   TAB(['Quiero…', 'Usa'],
       ['Comprobar si contiene algo', '`includes`, `startsWith`, `endsWith`'],
       ['Saber dónde está', '`indexOf`'],
       ['Cortar un trozo', '`slice(inicio, fin)`'],
       ['Trocear por un separador', '`split(",")`'],
       ['Unir un array en texto', '`join(", ")`'],
       ['Sustituir', '`replace` (una vez) · `replaceAll` (todas)'],
       ['Quitar espacios de los extremos', '`trim()`'],
       ['Validar un formato (email, DNI)', 'Expresión regular + `test()`']),
 ),
)

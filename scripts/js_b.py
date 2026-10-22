from jslib import *

M('06', 'índices · métodos · comparar · split/join · patrones',
 S('js-string-indices', 'Índices y longitud',
   P('Un `string` es una secuencia de caracteres numerados desde **0**. Es **inmutable**: los métodos no modifican el original, **devuelven un texto nuevo**.'),
   CON('''texto = "DAW 2026"
índice:   0 1 2 3 4 5 6 7
carácter: D A W _ 2 0 2 6      length = 8
                               último índice = length - 1'''),
   LIVE('Pruébalo: acceder a caracteres', js='''const t = "DAW 2026";
console.log(t.length);        // 8
console.log(t[0], t.at(-1));  // D 6   (at(-1) = el último)
console.log(t.charAt(1));     // "A"
t[0] = "X";                   // no hace nada (inmutable)
console.log(t);               // "DAW 2026"''', alto=90),
 ),
 S('js-string-metodos', 'Métodos más usados',
   TAB(['Quiero…', 'Método', 'Ejemplo → resultado'],
       ['Mayúsculas / minúsculas', '`toUpperCase()` · `toLowerCase()`', '`"Hola".toUpperCase()` → `"HOLA"`'],
       ['Quitar espacios de los extremos', '`trim()` · `trimStart()` · `trimEnd()`', '`"  ok ".trim()` → `"ok"`'],
       ['¿Contiene…?', '`includes(x)` · `startsWith(x)` · `endsWith(x)`', '`"correo@x.es".includes("@")` → `true`'],
       ['Posición de…', '`indexOf(x)` (`-1` si no está) · `lastIndexOf(x)`', '`"banana".indexOf("an")` → `1`'],
       ['Extraer un trozo', '`slice(inicio, fin)` (fin no incluido)', '`"abcdef".slice(1, 4)` → `"bcd"`'],
       ['Sustituir', '`replace(a, b)` (la primera) · `replaceAll(a, b)`', '`"a-b-c".replaceAll("-", "")` → `"abc"`'],
       ['Repetir', '`repeat(n)`', '`"ab".repeat(3)` → `"ababab"`'],
       ['Rellenar', '`padStart(n, c)` · `padEnd(n, c)`', '`"5".padStart(3, "0")` → `"005"`'],
       ['Trocear en array', '`split(separador)`', '`"a,b,c".split(",")` → `["a","b","c"]`']),
   LIVE('Pruébalo: métodos de texto', js='''const email = "  David.Ruiz@Correo.ES ";
const limpio = email.trim().toLowerCase();
console.log(limpio);                        // david.ruiz@correo.es
console.log(limpio.includes("@"));          // true
const pos = limpio.indexOf("@");
console.log(limpio.slice(0, pos));          // david.ruiz  (usuario)
console.log(limpio.slice(pos + 1));         // correo.es   (dominio)''', alto=110),
   AV('`indexOf` devuelve `-1` si no encuentra nada, y **`-1` es truthy**. `if (texto.indexOf("x"))` falla; escribe `if (texto.indexOf("x") !== -1)` o, mejor, `if (texto.includes("x"))`.'),
   AV('`replace("a", "b")` con un texto cambia **solo la primera** coincidencia. Para cambiarlas todas, `replaceAll`.'),
 ),
 S('js-string-comparar', 'Comparar textos',
   P('Con `===` se comparan **valores**, no referencias (a diferencia de `==` en Java con objetos `String`, donde había que usar `equals`). Distingue mayúsculas de minúsculas.'),
   LIVE('Pruébalo: comparar', js='''console.log("daw" === "daw");               // true
console.log("DAW" === "daw");               // false
console.log("DAW".toLowerCase() === "daw"); // true  (comparar sin distinguir mayúsculas)
console.log("a".localeCompare("b"));        // -1    (a va antes que b)
console.log(["ñu", "zorro", "avión"].sort((x, y) => x.localeCompare(y, "es")));''', alto=100),
 ),
 S('js-string-split', 'split y join',
   LIVE('Pruébalo: de texto a array y de vuelta', js='''const frase = "el que la sigue la consigue";
const palabras = frase.split(" ");
console.log(palabras);              // array de 6 palabras
console.log(palabras.length);       // 6
console.log(palabras.join("-"));    // el-que-la-sigue-la-consigue
console.log("hola".split(""));      // ["h","o","l","a"]  (letra a letra)''', alto=130),
 ),
 S('js-string-patrones', 'Patrones típicos con texto',
   LIVE('Pruébalo: invertir, contar vocales, capitalizar, palíndromo', js='''const invertir = (t) => t.split("").reverse().join("");

const contarVocales = (t) =>
  [...t.toLowerCase()].filter((c) => "aeiou".includes(c)).length;

const capitalizar = (t) => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();

const esPalindromo = (t) => {
  const limpio = t.toLowerCase().replaceAll(" ", "");
  return limpio === invertir(limpio);
};

console.log(invertir("hola"));              // aloh
console.log(contarVocales("murciélago"));   // 5
console.log(capitalizar("dAvId"));          // David
console.log(esPalindromo("anita lava la tina")); // true''', alto=130),
   NT('`[...texto]` convierte el texto en un array de caracteres (y respeta emojis y letras con tilde compuestas mejor que `split("")`).', 'tip'),
 ),
 S('js-string-regex', 'Expresiones regulares (lo básico)',
   P('Una **expresión regular** describe un patrón de texto. Se escribe entre barras `/…/` y se prueba con `test()`.'),
   TAB(['Patrón', 'Significa'],
       ['`\\d`', 'Un dígito (0-9)'],
       ['`\\w`', 'Letra, dígito o guion bajo'],
       ['`.`', 'Cualquier carácter'],
       ['`+` · `*` · `?`', 'Una o más · cero o más · cero o una'],
       ['`{3}` · `{2,4}`', 'Exactamente 3 · entre 2 y 4'],
       ['`^` · `$`', 'Inicio y fin del texto'],
       ['`[A-Z]` · `[^0-9]`', 'Un carácter de la lista · cualquiera que **no** sea de la lista']),
   LIVE('Pruébalo: validar un DNI y un código postal', js='''const dni = /^\\d{8}[A-Z]$/;
const cp  = /^\\d{5}$/;

console.log(dni.test("12345678Z"));   // true
console.log(dni.test("1234567Z"));    // false
console.log(cp.test("28049"));        // true
console.log("a1b22c333".match(/\\d+/g)); // ["1","22","333"]''', alto=90),
 ),
)

M('07', 'Number · división entera · % · trampas · BigInt',
 S('js-num-base', 'Un solo tipo: number',
   P('JavaScript no distingue entre `int` y `double`: todos los números son de **coma flotante de 64 bits**. Los enteros son exactos hasta `Number.MAX_SAFE_INTEGER` (9 007 199 254 740 991).'),
   TAB(['Quiero…', 'Cómo'],
       ['¿Es un número válido?', '`Number.isFinite(x)` (no es `NaN` ni `Infinity`)'],
       ['¿Es un entero?', '`Number.isInteger(x)`'],
       ['¿Es `NaN`?', '`Number.isNaN(x)` (**nunca** `x === NaN`)'],
       ['Valor máximo / mínimo seguro', '`Number.MAX_SAFE_INTEGER` · `Number.MIN_SAFE_INTEGER`']),
   LIVE('Pruébalo: comprobaciones', js='''console.log(Number.isInteger(5), Number.isInteger(5.5)); // true false
console.log(Number.isFinite(1 / 0));                       // false
console.log(Number.isNaN(Number("abc")));                  // true
console.log(Number.MAX_SAFE_INTEGER);''', alto=80),
 ),
 S('js-num-division', 'División entera y módulo: los dos grandes aliados',
   TAB(['Operación', 'Código', 'Ejemplo (n = 7)'],
       ['División entera', '`Math.trunc(n / d)`', '`Math.trunc(7 / 2)` → `3`'],
       ['Resto', '`n % d`', '`7 % 2` → `1`'],
       ['¿Es par?', '`n % 2 === 0`', '`7 % 2 === 0` → `false`'],
       ['¿Es múltiplo de 5?', '`n % 5 === 0`', ''],
       ['Última cifra', '`n % 10`', '`1234 % 10` → `4`'],
       ['Quitar la última cifra', '`Math.trunc(n / 10)`', '`Math.trunc(1234 / 10)` → `123`']),
   LIVE('Pruébalo: sumar las cifras de un número', js='''function sumaCifras(n) {
  let suma = 0;
  while (n > 0) {
    suma += n % 10;          // última cifra
    n = Math.trunc(n / 10);  // quitarla
  }
  return suma;
}
console.log(sumaCifras(2026)); // 10''', alto=60),
 ),
 S('js-num-patrones', 'Patrones típicos con números',
   LIVE('Pruébalo: primo, factorial, máximo de una lista', js='''const esPrimo = (n) => {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
};

const factorial = (n) => (n <= 1 ? 1 : n * factorial(n - 1));

const numeros = [4, 19, 7, 12];
console.log(esPrimo(17), esPrimo(21));   // true false
console.log(factorial(5));               // 120
console.log(Math.max(...numeros));       // 19''', alto=100),
 ),
 S('js-num-trampas', 'Trampas con números',
   AV('**Los decimales no son exactos.** `0.1 + 0.2` da `0.30000000000000004`. Para dinero, trabaja en **céntimos (enteros)** o redondea al mostrar con `toFixed(2)`.'),
   LIVE('Pruébalo: las trampas', js='''console.log(0.1 + 0.2);                 // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3);          // false
console.log(Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON); // true (comparar con tolerancia)
console.log(9007199254740993);           // 9007199254740992 (pierde precisión)
console.log(9007199254740993n);          // 9007199254740993n (BigInt, exacto)
console.log(10 / 3);                     // 3.3333333333333335
console.log(+"12" + +"3");               // 15 (el + unario convierte a número)''', alto=130),
   NT('`BigInt` (`123n`) permite enteros enormes, pero **no se puede mezclar con `number`**: `5n + 1` da `TypeError`. Conviértelo con `Number()` o `BigInt()`.', 'important'),
 ),
)

M('08', 'Math · aleatorios · redondeos',
 S('js-math', 'El objeto Math (no necesita import)',
   TAB(['Método', 'Qué hace', 'Ejemplo → resultado'],
       ['`Math.round(x)`', 'Redondea al entero más cercano', '`Math.round(2.5)` → `3`'],
       ['`Math.floor(x)`', 'Redondea **hacia abajo**', '`Math.floor(-2.5)` → `-3`'],
       ['`Math.ceil(x)`', 'Redondea **hacia arriba**', '`Math.ceil(2.1)` → `3`'],
       ['`Math.trunc(x)`', 'Quita los decimales', '`Math.trunc(-2.9)` → `-2`'],
       ['`Math.abs(x)`', 'Valor absoluto', '`Math.abs(-4)` → `4`'],
       ['`Math.max(a, b, …)` · `Math.min(…)`', 'Mayor / menor', '`Math.max(3, 9, 5)` → `9`'],
       ['`Math.pow(b, e)` o `b ** e`', 'Potencia', '`2 ** 8` → `256`'],
       ['`Math.sqrt(x)`', 'Raíz cuadrada', '`Math.sqrt(81)` → `9`'],
       ['`Math.PI`', 'El número π', '`3.141592653589793`']),
   LIVE('Pruébalo: redondeos', js='''console.log(Math.round(2.4), Math.round(2.5), Math.round(-2.5)); // 2 3 -2
console.log(Math.floor(2.9), Math.ceil(2.1), Math.trunc(-2.9));  // 2 3 -2
const mayor = Math.max(...[4, 19, 7]);
console.log(mayor);
// redondear a 2 decimales
console.log(Math.round(3.14159 * 100) / 100);''', alto=90),
 ),
 S('js-aleatorios', 'Números aleatorios',
   P('`Math.random()` devuelve un decimal entre `0` (incluido) y `1` (**no incluido**). A partir de él se construye cualquier rango.'),
   TAB(['Quiero…', 'Fórmula'],
       ['Entero entre `0` y `n - 1`', '`Math.floor(Math.random() * n)`'],
       ['Entero entre `min` y `max` (ambos incluidos)', '`Math.floor(Math.random() * (max - min + 1)) + min`'],
       ['Elemento aleatorio de un array', '`lista[Math.floor(Math.random() * lista.length)]`'],
       ['Identificador único', '`crypto.randomUUID()`']),
   LIVE('Pruébalo: dados y elemento al azar', js='''const entre = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

console.log("dado:", entre(1, 6));
const premios = ["café", "libro", "nada", "entrada"];
console.log("premio:", premios[entre(0, premios.length - 1)]);
console.log("id:", crypto.randomUUID());''', alto=90),
   NT('`Math.random()` **no es seguro** para contraseñas ni tokens. Para eso se usa `crypto.getRandomValues()`.', 'important'),
 ),
 S('js-barajar', 'Barajar un array',
   LIVE('Pruébalo: algoritmo de Fisher-Yates', js='''function barajar(lista) {
  const copia = [...lista];                       // no modifica el original
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];  // intercambio
  }
  return copia;
}
console.log(barajar([1, 2, 3, 4, 5]));''', alto=60),
   AV('`lista.sort(() => Math.random() - 0.5)` **no baraja bien** (el resultado está sesgado). Usa Fisher-Yates.'),
 ),
)

M('09', 'crear · recorrer · copiar · desestructurar · matrices',
 S('js-arr-crear', 'Crear y acceder',
   P('Un **array** es una lista ordenada de valores. A diferencia de Java: **no tiene tamaño fijo**, puede mezclar tipos y crece o disminuye cuando hace falta.'),
   LIVE('Pruébalo: crear, leer y modificar', js='''const notas = [7.5, 4, 9, 6];
console.log(notas[0]);          // 7.5   (primer elemento)
console.log(notas.at(-1));      // 6     (último)
console.log(notas.length);      // 4

notas[1] = 5;                   // modificar
notas[10] = 8;                  // deja huecos (empty items)
console.log(notas);

const mezcla = [1, "dos", true, null, [3, 4]];  // tipos mezclados
console.log(mezcla.length);''', alto=110),
   AV('Un índice fuera de rango **no da error**: devuelve `undefined`. `notas[99]` es `undefined`, y el fallo aparece más adelante.'),
 ),
 S('js-arr-recorrer', 'Recorrer',
   TAB(['Forma', 'Cuándo'],
       ['`for (let i = 0; i < a.length; i++)`', 'Necesitas el índice o recorrer en un orden especial'],
       ['`for (const x of a)`', 'Solo necesitas cada valor'],
       ['`a.forEach((x, i) => …)`', 'Hacer algo con cada elemento (no devuelve nada)'],
       ['`for (const [i, x] of a.entries())`', 'Índice **y** valor a la vez']),
   LIVE('Pruébalo: formas de recorrer', js='''const frutas = ["manzana", "pera", "uva"];

for (let i = 0; i < frutas.length; i++) console.log(i, frutas[i]);
for (const f of frutas) console.log(f);
frutas.forEach((f, i) => console.log(`${i + 1}. ${f}`));
for (const [i, f] of frutas.entries()) console.log(i, f);''', alto=150),
 ),
 S('js-arr-copiar', 'Copiar ≠ asignar',
   LIVE('Pruébalo: referencia frente a copia', js='''const a = [1, 2, 3];
const b = a;         // MISMA lista
const c = [...a];    // copia (spread)
const d = a.slice(); // otra forma de copiar

b.push(99);
console.log(a);      // [1, 2, 3, 99]  ← cambió
console.log(c);      // [1, 2, 3]
console.log(d === a);// false

// la copia es superficial: los objetos de dentro se comparten
const u = [{ x: 1 }];
const v = [...u];
v[0].x = 50;
console.log(u[0].x); // 50
const w = structuredClone(u); // copia profunda
w[0].x = 1;
console.log(u[0].x); // 50''', alto=180),
 ),
 S('js-arr-spread', 'Spread y desestructuración',
   LIVE('Pruébalo: ... y [a, b] = …', js='''const pares = [2, 4];
const impares = [1, 3];
console.log([...impares, ...pares]);       // [1, 3, 2, 4]  (unir)
console.log(Math.max(...pares));           // 4  (pasar un array como argumentos)

const [primero, segundo, ...resto] = [10, 20, 30, 40];
console.log(primero, segundo, resto);      // 10 20 [30, 40]

let x = 1, y = 2;
[x, y] = [y, x];                           // intercambiar sin variable auxiliar
console.log(x, y);                         // 2 1''', alto=110),
 ),
 S('js-arr-patrones', 'Patrones típicos',
   LIVE('Pruébalo: suma, media, máximo y contar', js='''const notas = [7.5, 4, 9, 6, 9];

let suma = 0;
for (const n of notas) suma += n;
console.log("suma:", suma);
console.log("media:", (suma / notas.length).toFixed(2));

let max = notas[0];
for (const n of notas) if (n > max) max = n;
console.log("máximo:", max, "en posición", notas.indexOf(max));

let aprobados = 0;
for (const n of notas) if (n >= 5) aprobados++;
console.log("aprobados:", aprobados);''', alto=130),
 ),
 S('js-arr-matrices', 'Matrices (arrays de arrays)',
   LIVE('Pruébalo: tablero 3 x 3', js='''const tablero = [
  ["X", "O", "X"],
  ["O", "X", "O"],
  [" ", " ", "X"],
];
console.log(tablero[1][2]);          // "O"  (fila 1, columna 2)

for (const fila of tablero) {
  console.log(fila.join(" | "));
}

const cero = Array.from({ length: 3 }, () => Array(3).fill(0));
console.log(cero);''', alto=130),
   AV('`Array(3).fill([])` rellena con **la misma referencia** en las tres posiciones: modificar una fila cambia todas. Usa `Array.from({ length: n }, () => [])`.'),
 ),
)

M('10', 'push/pop/splice · find · map · filter · reduce · sort · Set · Map',
 S('js-met-modificar', 'Añadir, quitar y modificar',
   TAB(['Método', 'Qué hace', 'Devuelve', 'Modifica el array'],
       ['`push(x)`', 'Añade al **final**', 'Nueva longitud', 'Sí'],
       ['`pop()`', 'Quita el **último**', 'El elemento quitado', 'Sí'],
       ['`unshift(x)`', 'Añade al **principio**', 'Nueva longitud', 'Sí'],
       ['`shift()`', 'Quita el **primero**', 'El elemento quitado', 'Sí'],
       ['`splice(i, n, …nuevos)`', 'Quita `n` desde `i` e inserta nuevos', 'Los quitados', 'Sí'],
       ['`slice(i, j)`', 'Copia el trozo `i`…`j-1`', 'Array nuevo', 'No'],
       ['`concat(b)` / `[...a, ...b]`', 'Une arrays', 'Array nuevo', 'No'],
       ['`reverse()` / `sort()`', 'Invierte / ordena', 'El mismo array', 'Sí']),
   LIVE('Pruébalo: la cola de una tienda', js='''const cola = ["Ana", "Luis"];
cola.push("Marta");         // entra al final
console.log(cola.shift());  // atiende a "Ana"
console.log(cola);          // ["Luis", "Marta"]

const letras = ["a", "b", "c", "d"];
letras.splice(1, 2);        // quita "b" y "c"
console.log(letras);        // ["a", "d"]
letras.splice(1, 0, "X");   // inserta "X" en la posición 1
console.log(letras);        // ["a", "X", "d"]''', alto=130),
   AV('`splice` **modifica** el array original; `slice` no. Los nombres se parecen y se confunden mucho.'),
 ),
 S('js-met-buscar', 'Buscar',
   TAB(['Método', 'Devuelve'],
       ['`includes(x)`', '`true` / `false`'],
       ['`indexOf(x)`', 'Posición o `-1`'],
       ['`find(x => cond)`', 'El **primer elemento** que cumple, o `undefined`'],
       ['`findIndex(x => cond)`', 'La posición del primero que cumple, o `-1`'],
       ['`some(x => cond)`', '`true` si **alguno** cumple'],
       ['`every(x => cond)`', '`true` si **todos** cumplen']),
   LIVE('Pruébalo: buscar en una lista de objetos', js='''const productos = [
  { id: 1, nombre: "Ratón", precio: 19.9, stock: 5 },
  { id: 2, nombre: "Teclado", precio: 49.9, stock: 0 },
  { id: 3, nombre: "Monitor", precio: 189, stock: 2 },
];

console.log(productos.find((p) => p.id === 3));
console.log(productos.findIndex((p) => p.nombre === "Teclado"));
console.log(productos.some((p) => p.stock === 0));    // true
console.log(productos.every((p) => p.precio > 10));   // true''', alto=120),
 ),
 S('js-met-transformar', 'map, filter y reduce',
   TAB(['Método', 'Para qué', 'Devuelve'],
       ['`map(x => …)`', '**Transformar** cada elemento', 'Array de la **misma longitud**'],
       ['`filter(x => cond)`', '**Quedarse** con los que cumplen', 'Array igual o más corto'],
       ['`reduce((acum, x) => …, inicial)`', '**Reducir** todo a un solo valor (suma, objeto…)', 'Un valor'],
       ['`flat()` · `flatMap(…)`', 'Aplanar arrays anidados', 'Array nuevo']),
   LIVE('Pruébalo: la cadena filter → map → reduce', js='''const productos = [
  { nombre: "Ratón", precio: 19.9, stock: 5 },
  { nombre: "Teclado", precio: 49.9, stock: 0 },
  { nombre: "Monitor", precio: 189, stock: 2 },
];

const nombres = productos.map((p) => p.nombre);
console.log(nombres);                       // ["Ratón", "Teclado", "Monitor"]

const disponibles = productos.filter((p) => p.stock > 0);
console.log(disponibles.length);            // 2

const valorInventario = productos.reduce((total, p) => total + p.precio * p.stock, 0);
console.log(valorInventario.toFixed(2));    // 477.50''', alto=130),
   NT('Estos métodos **no modifican** el array original: devuelven uno nuevo. Se pueden encadenar: `lista.filter(…).map(…)`.', 'tip'),
 ),
 S('js-met-ordenar', 'Ordenar',
   P('`sort()` ordena **como texto** por defecto. Para números hay que pasarle una función comparadora: devuelve negativo si `a` va antes, positivo si va después y `0` si es igual.'),
   LIVE('Pruébalo: sort numérico, por texto y por campo', js='''const nums = [10, 9, 1, 100];
console.log([...nums].sort());                 // [1, 10, 100, 9]  ← como texto
console.log([...nums].sort((a, b) => a - b));  // [1, 9, 10, 100]
console.log([...nums].sort((a, b) => b - a));  // de mayor a menor

const alumnos = [{ n: "Zoe", nota: 7 }, { n: "Ana", nota: 9 }];
alumnos.sort((a, b) => b.nota - a.nota);       // por campo numérico
console.log(alumnos.map((x) => x.n));
alumnos.sort((a, b) => a.n.localeCompare(b.n, "es")); // por texto
console.log(alumnos.map((x) => x.n));

const ordenado = nums.toSorted((a, b) => a - b); // versión que NO modifica
console.log(nums, ordenado);''', alto=170),
   AV('`sort()` **modifica** el array original. Haz antes una copia (`[...lista].sort(…)`) o usa `toSorted()` (navegadores modernos).'),
 ),
 S('js-met-set-map', 'Set y Map',
   TAB(['', '`Set`', '`Map`'],
       ['Guarda', 'Valores **únicos**', 'Pares **clave → valor**'],
       ['Añadir', '`s.add(x)`', '`m.set(k, v)`'],
       ['Consultar', '`s.has(x)`', '`m.get(k)` · `m.has(k)`'],
       ['Borrar', '`s.delete(x)`', '`m.delete(k)`'],
       ['Tamaño', '`s.size`', '`m.size`'],
       ['Recorrer', '`for (const x of s)`', '`for (const [k, v] of m)`']),
   LIVE('Pruébalo: quitar duplicados y contar repeticiones', js='''const votos = ["rojo", "azul", "rojo", "verde", "azul", "rojo"];

const unicos = [...new Set(votos)];
console.log(unicos);                  // ["rojo", "azul", "verde"]

const conteo = new Map();
for (const v of votos) conteo.set(v, (conteo.get(v) ?? 0) + 1);
console.log(conteo);                  // Map { rojo => 3, azul => 2, verde => 1 }
console.log([...conteo].sort((a, b) => b[1] - a[1])[0]);  // ["rojo", 3]''', alto=120),
 ),
 S('js-met-array-vs', 'Array de JS frente al de Java',
   TAB(['', 'Java `int[]` / `ArrayList`', 'JavaScript `Array`'],
       ['Tamaño', 'Fijo (`int[]`) o variable (`ArrayList`)', 'Variable siempre'],
       ['Tipos', 'Un solo tipo', 'Cualquier mezcla'],
       ['Longitud', '`array.length` / `lista.size()`', '`array.length`'],
       ['Añadir', '`lista.add(x)`', '`array.push(x)`'],
       ['Obtener', '`lista.get(i)`', '`array[i]`'],
       ['Quitar por posición', '`lista.remove(i)`', '`array.splice(i, 1)`'],
       ['Recorrer', 'for-each', '`for…of` / `forEach`'],
       ['Imprimir', '`Arrays.toString(a)`', '`console.log(a)`']),
 ),
)

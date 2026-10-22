from jslib import *

M('11', 'declaración · flecha · parámetros · retorno · ámbito · closures · callbacks',
 S('js-fn-anatomia', 'Anatomía',
   CON('''function  calcularTotal ( base , iva = 0.21 ) {
│         │          │       │      └ parámetro con valor por defecto
│         │          │       └ parámetro
│         │          └ paréntesis con los parámetros
│         └ nombre (camelCase, un verbo)
└ palabra clave
    return base * (1 + iva);   ← devuelve un valor y termina la función
}'''),
   LIVE('Pruébalo: llamar a una función', js='''function calcularTotal(base, iva = 0.21) {
  return base * (1 + iva);
}

console.log(calcularTotal(100));        // 121
console.log(calcularTotal(100, 0.10));  // 110
console.log(calcularTotal());           // NaN  (base es undefined)''', alto=80),
   AV('En JavaScript **no hay sobrecarga**: puedes llamar a una función con más o menos argumentos de los declarados. Los que faltan valen `undefined` y los que sobran se ignoran, sin error.'),
 ),
 S('js-fn-tipos', 'Tres formas de escribir una función',
   TAB(['Forma', 'Ejemplo', 'Notas'],
       ['**Declaración**', '`function suma(a, b) { return a + b; }`', 'Se puede llamar **antes** de su línea (hoisting)'],
       ['**Expresión**', '`const suma = function (a, b) { return a + b; };`', 'Solo existe desde su línea'],
       ['**Flecha**', '`const suma = (a, b) => a + b;`', 'Corta; ideal para callbacks. Sin `this` propio']),
   LIVE('Pruébalo: formas de la flecha', js='''const doble    = (n) => n * 2;          // una expresión: return implícito
const saluda   = nombre => `Hola, ${nombre}`; // un parámetro: sin paréntesis
const area     = (b, h) => { const a = b * h / 2; return a; }; // con llaves: return explícito
const crear    = () => ({ ok: true });  // devolver un objeto: entre paréntesis

console.log(doble(4), saluda("David"), area(4, 3), crear());''', alto=80),
 ),
 S('js-fn-params', 'Parámetros: por defecto, resto y desestructurados',
   LIVE('Pruébalo: ...resto y objeto como parámetro', js='''const sumar = (...numeros) => numeros.reduce((a, n) => a + n, 0);
console.log(sumar(1, 2, 3, 4));   // 10

// un objeto como parámetro: el orden no importa y hay valores por defecto
function crearUsuario({ nombre, rol = "alumno", activo = true }) {
  return { nombre, rol, activo };
}
console.log(crearUsuario({ nombre: "Lucía" }));
console.log(crearUsuario({ rol: "profe", nombre: "Marcos" }));''', alto=110),
   NT('Cuando una función necesita **más de 3 parámetros**, es más claro recibir un único objeto (`{ nombre, rol }`) que recordar el orden de cinco argumentos sueltos.', 'tip'),
 ),
 S('js-fn-valor', 'Paso por valor (qué ocurre con lo que envías)',
   LIVE('Pruébalo: primitivos y objetos', js='''function cambiar(n, lista) {
  n = 99;              // solo cambia la copia local
  lista.push(99);      // modifica el array original (misma referencia)
  lista = [0];         // reasignar NO afecta al original
}

let numero = 1;
const datos = [1, 2];
cambiar(numero, datos);
console.log(numero); // 1
console.log(datos);  // [1, 2, 99]''', alto=110),
   P('Todo se pasa **por valor**, pero en un objeto o array ese valor es una **referencia**: la función puede modificar el contenido, aunque no puede reemplazar la variable de fuera.'),
 ),
 S('js-fn-ambito', 'Ámbito (scope) y hoisting',
   TAB(['Ámbito', 'Dónde se ve la variable'],
       ['**Global**', 'En todo el programa (evítalo)'],
       ['**Función**', 'Dentro de esa función'],
       ['**Bloque** (`let` / `const`)', 'Solo dentro de las llaves `{ }` donde se declaró']),
   LIVE('Pruébalo: let es de bloque, var no', js='''if (true) {
  let a = 1;
  var b = 2;
}
console.log(typeof a);  // "undefined"  (a solo existe dentro del if)
console.log(b);         // 2             (var se escapa del bloque)

try {
  console.log(x);       // ReferenceError: no se puede usar antes de declarar
  let x = 5;
} catch (e) {
  console.log(e.name);
}''', alto=110),
 ),
 S('js-fn-closure', 'Closures',
   P('Una función **recuerda las variables del lugar donde se creó**, aunque ese lugar ya haya terminado. Es la base de contadores privados, temporizadores y manejadores de eventos.'),
   LIVE('Pruébalo: un contador con estado privado', js='''function crearContador() {
  let cuenta = 0;               // nadie de fuera puede tocarla
  return () => ++cuenta;
}

const a = crearContador();
const b = crearContador();
console.log(a(), a(), a());     // 1 2 3
console.log(b());               // 1  (cada contador tiene su propia cuenta)''', alto=80),
 ),
 S('js-fn-callbacks', 'Funciones como valores y callbacks',
   P('En JavaScript una función es un valor más: se guarda en una variable, se pasa como argumento y se devuelve. Una función que se pasa a otra para que la llame después es un **callback**.'),
   LIVE('Pruébalo: pasar una función a otra', js='''function repetir(veces, accion) {
  for (let i = 1; i <= veces; i++) accion(i);
}

repetir(3, (n) => console.log("iteración", n));

const aplicarDescuento = (precios, regla) => precios.map(regla);
console.log(aplicarDescuento([100, 50], (p) => p * 0.9));''', alto=90),
 ),
 S('js-fn-plantilla', 'Plantilla de ejercicio con funciones',
   P('Un buen programa se divide en funciones pequeñas que **hacen una sola cosa** y se combinan en un `main`.'),
   LIVE('Pruébalo: estructura habitual', js='''// 1. Funciones puras: reciben datos y devuelven un resultado
const calcularSubtotal = (precio, unidades) => precio * unidades;
const aplicarDescuento = (importe, unidades) => (unidades >= 10 ? importe * 0.9 : importe);
const aplicarIva = (base, iva = 0.21) => base * (1 + iva);

// 2. Función que muestra el resultado
const formatearEuros = (n) => n.toLocaleString("es-ES", { style: "currency", currency: "EUR" });

// 3. "main": orquesta
function main() {
  const subtotal = calcularSubtotal(4.5, 12);
  const base = aplicarDescuento(subtotal, 12);
  console.log("Total:", formatearEuros(aplicarIva(base)));
}
main();''', alto=90),
 ),
)

M('12', 'literales · this · desestructurar · Object.keys · JSON · class',
 S('js-obj-literal', 'Objetos literales',
   P('Un **objeto** agrupa datos relacionados en pares **clave: valor**. Es la estructura más usada del lenguaje (una fila de una tabla, una respuesta de una API, una configuración).'),
   LIVE('Pruébalo: crear, leer, modificar y borrar propiedades', js='''const cliente = {
  nombre: "Lucía",
  edad: 22,
  direccion: { ciudad: "Madrid", cp: "28049" },
  aficiones: ["3D", "música"],
};

console.log(cliente.nombre);              // notación punto
console.log(cliente["edad"]);             // notación corchetes (clave dinámica)
console.log(cliente.direccion.ciudad);    // anidados
cliente.telefono = "600000000";           // añadir
cliente.edad = 23;                        // modificar
delete cliente.telefono;                  // borrar
console.log("edad" in cliente);           // true
console.log(cliente.correo);              // undefined (no existe, sin error)''', alto=150),
   NT('Atajo cuando la variable y la clave se llaman igual: `{ nombre, edad }` equivale a `{ nombre: nombre, edad: edad }`.', 'tip'),
 ),
 S('js-obj-metodos', 'Métodos y this',
   P('Una propiedad cuyo valor es una función se llama **método**. Dentro, `this` es el objeto sobre el que se llamó.'),
   LIVE('Pruébalo: un método y un "this" perdido', js='''const cuenta = {
  titular: "David",
  saldo: 100,
  ingresar(importe) {
    this.saldo += importe;
    return this;                 // permite encadenar
  },
  resumen() {
    return `${this.titular}: ${this.saldo} €`;
  },
};

console.log(cuenta.ingresar(50).resumen());   // David: 150 €

const suelta = cuenta.resumen;               // se separa del objeto
try { console.log(suelta()); } catch (e) { console.log("Error:", e.message); }''', alto=120),
   AV('`this` depende de **cómo se llama** la función, no de dónde se escribió. Si pasas un método como callback (`boton.addEventListener("click", cuenta.resumen)`) pierde el objeto. Solución: una flecha `() => cuenta.resumen()` o `cuenta.resumen.bind(cuenta)`.'),
 ),
 S('js-obj-utilidades', 'Recorrer y copiar objetos',
   TAB(['Necesito…', 'Cómo'],
       ['Las claves', '`Object.keys(o)`'],
       ['Los valores', '`Object.values(o)`'],
       ['Pares `[clave, valor]`', '`Object.entries(o)`'],
       ['Copia superficial', '`{ ...o }` o `Object.assign({}, o)`'],
       ['Combinar objetos', '`{ ...a, ...b }` (gana el último)'],
       ['Copia profunda', '`structuredClone(o)`'],
       ['Impedir cambios', '`Object.freeze(o)`']),
   LIVE('Pruébalo: entries, spread y desestructuración', js='''const producto = { nombre: "Teclado", precio: 49.9, stock: 3 };

for (const [clave, valor] of Object.entries(producto)) {
  console.log(`${clave}: ${valor}`);
}

const oferta = { ...producto, precio: 39.9 };       // copia cambiando un campo
console.log(oferta, producto.precio);

const { nombre, precio } = producto;                // desestructurar
console.log(nombre, precio);''', alto=140),
 ),
 S('js-obj-json', 'JSON',
   P('**JSON** es un formato de texto para intercambiar datos. Se parece a un objeto de JavaScript, pero es **solo texto**: las claves van siempre entre comillas dobles y no admite funciones ni comentarios.'),
   TAB(['Método', 'Hace'],
       ['`JSON.stringify(valor)`', 'Objeto → texto JSON'],
       ['`JSON.stringify(valor, null, 2)`', 'Igual, con sangría de 2 espacios (legible)'],
       ['`JSON.parse(texto)`', 'Texto JSON → objeto (lanza error si el texto no es válido)']),
   LIVE('Pruébalo: ida y vuelta', js='''const alumno = { nombre: "Lucía", notas: [7, 9], activo: true };

const texto = JSON.stringify(alumno);
console.log(texto);                 // {"nombre":"Lucía","notas":[7,9],"activo":true}
console.log(typeof texto);          // string

const copia = JSON.parse(texto);
console.log(copia.notas[1]);        // 9

try {
  JSON.parse("{nombre: 'Lucía'}");  // JSON inválido (comillas simples, sin comillas en la clave)
} catch (e) {
  console.log("JSON inválido:", e.name);
}''', alto=140),
 ),
 S('js-obj-class', 'Clases',
   P('Una **clase** es una plantilla para crear objetos con los mismos datos y métodos. Detrás, JavaScript sigue usando prototipos; `class` es una sintaxis más clara.'),
   LIVE('Pruébalo: clase, herencia y getter', js='''class Persona {
  #edad;                                   // campo privado
  constructor(nombre, edad) {
    this.nombre = nombre;
    this.#edad = edad;
  }
  get esMayor() { return this.#edad >= 18; }
  saludar() { return `Hola, soy ${this.nombre}`; }
}

class Alumno extends Persona {
  constructor(nombre, edad, curso) {
    super(nombre, edad);                   // llama al constructor del padre
    this.curso = curso;
  }
  saludar() { return `${super.saludar()} y estudio ${this.curso}`; }
}

const a = new Alumno("Lucía", 22, "DAW");
console.log(a.saludar());
console.log(a.esMayor);                    // true  (getter: se usa sin paréntesis)
console.log(a instanceof Persona);         // true''', alto=170),
 ),
)

M('13', 'querySelector · textContent · classList · createElement · atributos',
 S('js-dom-que', 'Qué es el DOM',
   P('El navegador convierte el HTML en un **árbol de objetos** llamado DOM (*Document Object Model*). JavaScript puede **buscar** nodos de ese árbol, **leer** y **cambiar** su contenido, atributos y estilos, y la página se actualiza al instante.'),
   CON('''document
 └─ html
     ├─ head
     │   └─ title
     └─ body
         ├─ h1#titulo        ← document.querySelector("#titulo")
         └─ ul.lista
             ├─ li           ← document.querySelectorAll(".lista li")
             └─ li'''),
 ),
 S('js-dom-seleccionar', 'Seleccionar elementos',
   TAB(['Método', 'Devuelve', 'Ejemplo'],
       ['`document.querySelector(css)`', 'El **primer** elemento que cumple, o `null`', '`querySelector("#menu a.activo")`'],
       ['`document.querySelectorAll(css)`', 'Una `NodeList` con **todos** (vacía si no hay)', '`querySelectorAll(".tarjeta")`'],
       ['`document.getElementById(id)`', 'El elemento con ese `id`, o `null`', '`getElementById("titulo")`'],
       ['`elemento.closest(css)`', 'El ancestro más cercano que cumple', '`boton.closest("li")`']),
   NT('`querySelector` acepta **cualquier selector CSS** (el mismo que en la hoja de estilos), por eso basta con aprender uno.', 'tip'),
   AV('Si el selector no encuentra nada, `querySelector` devuelve `null` y la línea siguiente da `TypeError: Cannot read properties of null`. Comprueba el selector en la consola y que el script se ejecute **cuando el DOM ya existe** (`defer`).'),
 ),
 S('js-dom-contenido', 'Leer y cambiar contenido',
   TAB(['Propiedad', 'Qué hace', 'Cuándo'],
       ['`textContent`', 'Lee/escribe **texto plano**', 'Casi siempre. Es seguro'],
       ['`innerHTML`', 'Lee/escribe **HTML**', 'Solo con contenido tuyo; con datos de un usuario es un riesgo de seguridad (XSS)'],
       ['`value`', 'Valor de `input`, `select`, `textarea`', 'Formularios (siempre texto)']),
   LIVE('Pruébalo: cambiar texto y HTML', html='''<h2 id="titulo">Título original</h2>
<p id="info">Texto <em>original</em></p>
<input id="nombre" value="David">''', js='''const titulo = document.querySelector("#titulo");
titulo.textContent = "Título cambiado desde JS";

const info = document.querySelector("#info");
console.log(info.textContent);         // "Texto original" (sin etiquetas)
console.log(info.innerHTML);           // 'Texto <em>original</em>'
info.innerHTML = "Texto <strong>nuevo</strong>";

const campo = document.querySelector("#nombre");
console.log(campo.value, typeof campo.value);  // "David" "string"''', alto=170),
 ),
 S('js-dom-clases', 'Clases, atributos y estilos',
   TAB(['Necesito…', 'Cómo'],
       ['Añadir / quitar / alternar una clase', '`el.classList.add("on")` · `remove` · `toggle`'],
       ['¿Tiene la clase?', '`el.classList.contains("on")`'],
       ['Leer / cambiar un atributo', '`el.getAttribute("href")` · `el.setAttribute("href", "#")`'],
       ['Atributos propios `data-*`', '`el.dataset.id` (de `data-id="5"`)'],
       ['Estilo en línea puntual', '`el.style.color = "tomato"`']),
   NT('Prefiere **cambiar clases** (`classList`) a escribir estilos con `el.style`: el aspecto queda en el CSS y el JS solo decide **cuándo** aplicarlo.', 'important'),
   LIVE('Pruébalo: alternar una clase', html='''<button id="tema">Cambiar tema</button>
<p class="caja" data-id="7">Caja con data-id</p>''', css='''.caja { padding: 12px; border: 2px solid #999; }
.caja.destacada { background: #fff3cd; border-color: #e8621c; }''', js='''const caja = document.querySelector(".caja");
console.log(caja.dataset.id);          // "7"

document.querySelector("#tema").addEventListener("click", () => {
  caja.classList.toggle("destacada");
  console.log(caja.className);
});''', alto=130),
 ),
 S('js-dom-crear', 'Crear, insertar y borrar elementos',
   TAB(['Método', 'Hace'],
       ['`document.createElement("li")`', 'Crea un elemento (aún no está en la página)'],
       ['`padre.append(hijo)`', 'Lo añade **al final** del padre'],
       ['`padre.prepend(hijo)`', 'Lo añade **al principio**'],
       ['`el.remove()`', 'Lo elimina de la página'],
       ['`el.replaceChildren()`', 'Vacía el elemento (quita todos los hijos)'],
       ['`el.cloneNode(true)`', 'Copia el elemento con todo su contenido']),
   LIVE('Pruébalo: generar una lista desde un array', html='''<ul id="lista"></ul>''', js='''const tareas = ["Estudiar DOM", "Repasar eventos", "Hacer la misión"];
const lista = document.querySelector("#lista");

for (const t of tareas) {
  const li = document.createElement("li");
  li.textContent = t;                 // textContent: seguro
  lista.append(li);
}
console.log(lista.children.length);   // 3''', alto=140),
 ),
 S('js-dom-recorrer', 'Recorrer varios elementos',
   LIVE('Pruébalo: querySelectorAll', html='''<p class="item">Uno</p>
<p class="item">Dos</p>
<p class="item">Tres</p>''', js='''const items = document.querySelectorAll(".item");
console.log(items.length);

items.forEach((el, i) => {
  el.textContent = `${i + 1}. ${el.textContent}`;
  if (i % 2 === 0) el.style.fontWeight = "bold";
});

const textos = [...items].map((el) => el.textContent);   // NodeList → array
console.log(textos);''', alto=140),
 ),
)

M('14', 'addEventListener · event · delegación · submit · teclado · input',
 S('js-ev-basico', 'addEventListener',
   P('Un **evento** es algo que ocurre en la página (un clic, una tecla, el envío de un formulario). Se escucha con `elemento.addEventListener("tipo", función)`; la función (el **manejador**) recibe un objeto `event`.'),
   TAB(['Evento', 'Se dispara cuando…'],
       ['`click`', 'Se pulsa un elemento'],
       ['`input`', 'El valor de un campo cambia (**cada tecla**)'],
       ['`change`', 'Un campo cambia y **pierde el foco** (o se elige en un `select`/`checkbox`)'],
       ['`submit`', 'Se envía un formulario (se escucha en el `<form>`)'],
       ['`keydown` / `keyup`', 'Se pulsa / suelta una tecla'],
       ['`mouseover` / `mouseout`', 'El ratón entra / sale'],
       ['`DOMContentLoaded`', 'El DOM está listo (innecesario si usas `defer`)']),
   LIVE('Pruébalo: contador de clics', html='''<button id="mas">Sumar</button>
<p>Clics: <strong id="n">0</strong></p>''', js='''const boton = document.querySelector("#mas");
const salida = document.querySelector("#n");
let clics = 0;

boton.addEventListener("click", (event) => {
  clics++;
  salida.textContent = clics;
  console.log(event.type, event.target.id);
});''', alto=110),
 ),
 S('js-ev-objeto', 'El objeto event',
   TAB(['Propiedad', 'Qué contiene'],
       ['`event.target`', 'El elemento **donde se originó** el evento'],
       ['`event.currentTarget`', 'El elemento **que tiene** el manejador'],
       ['`event.preventDefault()`', 'Cancela la acción por defecto (enviar el formulario, seguir un enlace)'],
       ['`event.key`', 'La tecla pulsada (`"Enter"`, `"a"`, `"Escape"`)'],
       ['`event.stopPropagation()`', 'Evita que el evento suba a los ancestros']),
 ),
 S('js-ev-formulario', 'Formularios: submit y preventDefault',
   LIVE('Pruébalo: leer un formulario sin recargar la página', html='''<form id="f">
  <label>Nombre <input name="nombre" required></label>
  <label>Edad <input name="edad" type="number" min="0"></label>
  <button>Enviar</button>
</form>
<p id="resultado"></p>''', js='''document.querySelector("#f").addEventListener("submit", (e) => {
  e.preventDefault();                          // evita la recarga
  const datos = new FormData(e.target);
  const nombre = datos.get("nombre").trim();
  const edad = Number(datos.get("edad"));      // los valores llegan como texto
  document.querySelector("#resultado").textContent =
    `${nombre} tiene ${edad} años (${edad >= 18 ? "mayor" : "menor"} de edad)`;
});''', alto=150),
   AV('Escucha `submit` en el **formulario**, no `click` en el botón: así también funciona al pulsar `Enter` dentro de un campo. Y sin `preventDefault()` la página se recarga y pierdes el resultado.'),
 ),
 S('js-ev-input', 'Escribir y pulsar teclas',
   LIVE('Pruébalo: contador de caracteres en vivo', html='''<textarea id="t" rows="3" maxlength="60" placeholder="Escribe aquí"></textarea>
<p><span id="c">0</span> / 60</p>''', js='''const t = document.querySelector("#t");
t.addEventListener("input", () => {
  document.querySelector("#c").textContent = t.value.length;
});
t.addEventListener("keydown", (e) => {
  if (e.key === "Escape") t.value = "";
});''', alto=130),
 ),
 S('js-ev-delegacion', 'Delegación de eventos',
   P('En lugar de poner un manejador en cada elemento de una lista, se pone **uno solo en el padre** y se mira `event.target`. Funciona también con los elementos que se añadan después.'),
   LIVE('Pruébalo: una lista de tareas', html='''<input id="nueva" placeholder="Nueva tarea">
<button id="add">Añadir</button>
<ul id="tareas"><li>Estudiar</li><li>Repasar</li></ul>''', js='''const lista = document.querySelector("#tareas");

lista.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (li) li.classList.toggle("hecha");
});

document.querySelector("#add").addEventListener("click", () => {
  const campo = document.querySelector("#nueva");
  if (campo.value.trim() === "") return;
  const li = document.createElement("li");
  li.textContent = campo.value.trim();
  lista.append(li);                // sin añadir manejadores nuevos
  campo.value = "";
});''', css='''li { cursor: pointer; padding: 2px 0; }
li.hecha { text-decoration: line-through; color: #888; }''', alto=170),
 ),
 S('js-ev-quitar', 'Quitar un manejador y eventos de una sola vez',
   LIVE('Pruébalo: removeEventListener y { once: true }', html='''<button id="a">Se desactiva tras 3 clics</button>
<button id="b">Solo funciona una vez</button>''', js='''const a = document.querySelector("#a");
let veces = 0;
function manejador() {
  veces++;
  console.log("clic", veces);
  if (veces === 3) a.removeEventListener("click", manejador);  // necesita la MISMA función
}
a.addEventListener("click", manejador);

document.querySelector("#b").addEventListener("click", () => console.log("solo una vez"), { once: true });''', alto=110),
   AV('Para quitar un manejador hay que pasar **la misma función** con la que se añadió. Con una flecha anónima no se puede quitar.'),
 ),
)

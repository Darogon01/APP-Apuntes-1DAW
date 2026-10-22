from jslib import *

M('15', 'setTimeout · Promise · async/await · fetch · try/catch',
 S('js-as-que', 'Por qué existe la asincronía',
   P('JavaScript ejecuta **una sola cosa a la vez** en un único hilo. Si esperara a que un servidor responda, la página se quedaría congelada. Por eso las operaciones lentas (temporizadores, peticiones de red) se **lanzan** y su resultado se atiende **más tarde**, cuando estén listas.'),
   LIVE('Pruébalo: el orden de ejecución', js='''console.log("1. empieza");

setTimeout(() => console.log("3. pasó 1 segundo"), 1000);
setTimeout(() => console.log("2b. 0 ms… pero se ejecuta después"), 0);

console.log("2. termina el código síncrono");''', alto=90),
   NT('Aunque el tiempo sea `0`, el callback de `setTimeout` espera a que **termine todo el código síncrono** actual.', 'important'),
 ),
 S('js-as-timers', 'setTimeout y setInterval',
   TAB(['Función', 'Hace', 'Cancelar con'],
       ['`setTimeout(fn, ms)`', 'Ejecuta `fn` **una vez** tras `ms` milisegundos', '`clearTimeout(id)`'],
       ['`setInterval(fn, ms)`', 'Ejecuta `fn` **cada** `ms` milisegundos', '`clearInterval(id)`']),
   LIVE('Pruébalo: cuenta atrás', js='''let n = 3;
const id = setInterval(() => {
  console.log(n);
  n--;
  if (n < 0) {
    clearInterval(id);        // sin esto seguiría para siempre
    console.log("¡Despegue!");
  }
}, 500);''', alto=110),
 ),
 S('js-as-promesas', 'Promesas',
   P('Una **promesa** (`Promise`) representa un valor que **llegará en el futuro**. Tiene tres estados: *pendiente*, *cumplida* (`resolve`) o *rechazada* (`reject`).'),
   LIVE('Pruébalo: crear y encadenar una promesa', js='''const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const dividir = (a, b) =>
  new Promise((resolve, reject) => {
    if (b === 0) reject(new Error("No se puede dividir entre 0"));
    else resolve(a / b);
  });

dividir(10, 2)
  .then((r) => { console.log("resultado:", r); return dividir(r, 0); })
  .then((r) => console.log("no llega aquí", r))
  .catch((e) => console.log("error:", e.message))
  .finally(() => console.log("fin"));''', alto=130),
 ),
 S('js-as-async', 'async / await',
   P('`async` / `await` permite escribir código asíncrono **como si fuera síncrono**. Una función `async` siempre devuelve una promesa; `await` **espera** a que otra promesa termine sin bloquear la página (solo se puede usar dentro de una función `async`).'),
   LIVE('Pruébalo: esperar en secuencia y en paralelo', js='''const esperar = (ms, valor) => new Promise((r) => setTimeout(() => r(valor), ms));

async function main() {
  console.time("secuencia");
  const a = await esperar(300, "A");
  const b = await esperar(300, "B");
  console.log(a, b);
  console.timeEnd("secuencia");        // ≈ 600 ms

  console.time("paralelo");
  const [c, d] = await Promise.all([esperar(300, "C"), esperar(300, "D")]);
  console.log(c, d);
  console.timeEnd("paralelo");         // ≈ 300 ms
}
main();''', alto=130),
 ),
 S('js-as-fetch', 'fetch: pedir datos a un servidor',
   P('`fetch(url)` hace una petición HTTP y devuelve una promesa de `Response`. Hay que **esperar dos veces**: una a la respuesta y otra a su cuerpo (`.json()`).'),
   CODE('''async function cargarUsuarios() {
  try {
    const respuesta = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!respuesta.ok) {                        // 404, 500…: fetch NO lanza error
      throw new Error(`Error HTTP ${respuesta.status}`);
    }

    const usuarios = await respuesta.json();    // cuerpo → objetos de JS
    console.log(usuarios.map((u) => u.name));
  } catch (error) {                             // solo falla por problemas de red
    console.error("No se pudo cargar:", error.message);
  }
}
cargarUsuarios();''', 'js', 'fetch con control de errores'),
   CODE('''// Enviar datos (POST con JSON)
await fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "Hola", body: "Mi primer post", userId: 1 }),
});''', 'js', 'POST'),
   AV('`fetch` **solo rechaza** la promesa si falla la red. Una respuesta `404` o `500` es una respuesta "correcta" para `fetch`: hay que comprobar `respuesta.ok` tú mismo.'),
   AV('Una página abierta como fichero local o desde otro dominio puede ser bloqueada por **CORS**: el servidor debe permitir tu origen. Es un error de configuración del servidor, no del código.', 'caution'),
 ),
 S('js-as-mostrar', 'Patrón: cargar y pintar en la página',
   LIVE('Pruébalo: simular una API con una promesa', html='''<button id="cargar">Cargar productos</button>
<p id="estado"></p>
<ul id="lista"></ul>''', js='''// Simulamos la respuesta de un servidor
const apiFalsa = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve([
      { id: 1, nombre: "Ratón", precio: 19.9 },
      { id: 2, nombre: "Monitor", precio: 189 },
    ]), 600)
  );

document.querySelector("#cargar").addEventListener("click", async () => {
  const estado = document.querySelector("#estado");
  const lista = document.querySelector("#lista");
  estado.textContent = "Cargando…";
  try {
    const productos = await apiFalsa();
    lista.replaceChildren(...productos.map((p) => {
      const li = document.createElement("li");
      li.textContent = `${p.nombre} — ${p.precio.toFixed(2)} €`;
      return li;
    }));
    estado.textContent = `${productos.length} productos`;
  } catch (e) {
    estado.textContent = "Error al cargar";
  }
});''', alto=190),
   NT('Muestra siempre los **tres estados** al usuario: cargando, correcto y error.', 'tip'),
 ),
)

M('16', 'tabla de diagnóstico · try/catch · throw · DevTools',
 S('js-err-tabla', 'Tabla de diagnóstico',
   TAB(['Mensaje', 'Qué significa', 'Causa típica'],
       ['`ReferenceError: x is not defined`', 'Usas una variable que no existe en este ámbito', 'Errata en el nombre; usarla antes de `let`/`const`; está en otro ámbito'],
       ['`TypeError: Cannot read properties of undefined (reading \'x\')`', 'Pides una propiedad a `undefined` o `null`', '`querySelector` no encontró el elemento; la API aún no respondió; índice fuera de rango'],
       ['`TypeError: x is not a function`', 'Llamas con `()` algo que no es una función', 'Nombre mal escrito; `x` es un número o texto; se te olvidó un `return`'],
       ['`TypeError: Assignment to constant variable`', 'Reasignas una `const`', 'Usa `let` si va a cambiar'],
       ['`SyntaxError: Unexpected token`', 'Falta o sobra un símbolo', 'Llave, paréntesis o comilla sin cerrar; coma de más en JSON'],
       ['`SyntaxError: Unexpected token < in JSON`', '`JSON.parse` recibió HTML', 'La URL del `fetch` es incorrecta y devolvió una página de error'],
       ['`NaN` en pantalla', 'Operación numérica con algo que no es número', 'Texto sin convertir; `undefined + 1`'],
       ['`undefined` en pantalla', 'Una variable o propiedad sin valor', 'Propiedad con otro nombre; función sin `return`'],
       ['No pasa nada al pulsar', 'El manejador no se está enganchando', 'Selector incorrecto; `script` sin `defer`; error anterior que detuvo el script']),
 ),
 S('js-err-trycatch', 'try / catch / finally y throw',
   LIVE('Pruébalo: capturar y lanzar errores', js='''function leerEdad(texto) {
  const n = Number(texto);
  if (Number.isNaN(n)) throw new Error(`"${texto}" no es un número`);
  if (n < 0) throw new RangeError("La edad no puede ser negativa");
  return n;
}

for (const entrada of ["25", "abc", "-3"]) {
  try {
    console.log("edad válida:", leerEdad(entrada));
  } catch (e) {
    console.log(`${e.name}: ${e.message}`);
  } finally {
    console.log("— comprobado", entrada);
  }
}''', alto=170),
   NT('Captura solo los errores que **sabes tratar**. Un `catch` vacío esconde fallos y hace que el programa "funcione mal en silencio".', 'important'),
 ),
 S('js-err-depurar', 'Depurar con las DevTools',
   TAB(['Herramienta', 'Cómo se usa'],
       ['**Console**', 'Lee el mensaje y la línea del error (clic en el enlace `app.js:12`)'],
       ['**`console.log` / `console.table`**', 'Comprueba el valor y el tipo de una variable en un punto concreto'],
       ['**`debugger;`**', 'Pausa la ejecución en esa línea si las DevTools están abiertas'],
       ['**Sources → puntos de interrupción**', 'Clic en el número de línea; avanza con F10 (siguiente línea) y F11 (entrar en la función)'],
       ['**Elements**', 'Comprueba que el elemento existe y qué clases tiene **ahora** (tras tu JS)'],
       ['**Network**', 'Mira la petición de `fetch`: URL, estado (`200`, `404`…) y respuesta']),
   NT('Método rápido: **1)** lee el mensaje entero · **2)** ve a la línea indicada · **3)** `console.log` de las variables de esa línea · **4)** reduce el problema a lo mínimo.', 'tip'),
 ),
)

# -------------------------------------------------------------- misiones
M('17', '6 casos reales · solución abierta',
 S('js-mis-intro', 'Cómo usar las misiones',
   P('Cada ejercicio simula una pieza de una aplicación real. Intenta resolverlo **antes** de mirar la solución; el editor te deja modificarla, ejecutarla y probar variantes.'),
   TAB(['ID', 'Caso real', 'Conceptos clave'],
       ['[J01](@j01)', 'Ticket de caja con descuento e IVA', 'Funciones, operadores, ternario, `toLocaleString`'],
       ['[J02](@j02)', 'Validador de contraseña', 'Strings, regex, `some`, array de reglas'],
       ['[J03](@j03)', 'Generador de email corporativo', '`trim`, `split`, `replace`, normalización de tildes'],
       ['[J04](@j04)', 'Informe de ventas', 'Array de objetos, `reduce`, `filter`, `sort`, `Map`'],
       ['[J05](@j05)', 'Lista de tareas', 'DOM, eventos, delegación, `JSON`'],
       ['[J06](@j06)', 'Buscador con filtro en vivo', 'Evento `input`, `filter`, renderizado, `data-*`']),
 ),
 S('j01', 'J01 · Ticket de caja con descuento e IVA',
   NT('**Caso real:** el TPV de una tienda. Se registra un producto; a partir de 10 unidades hay un 10 % de descuento; se calcula el IVA (21 %) sobre la base y se muestra el ticket.', 'note'),
   P('**Conceptos:** constantes · funciones puras · ternario · `toLocaleString`'),
   LIVE('J01 · Solución propuesta', html='''<form id="f">
  <label>Producto <input name="producto" value="Teclado"></label><br>
  <label>Precio (€) <input name="precio" value="49,90"></label><br>
  <label>Cantidad <input name="cantidad" type="number" value="12"></label><br>
  <button>Calcular</button>
</form>
<pre id="ticket"></pre>''', js='''const IVA = 0.21;
const DESCUENTO = 0.10;
const UNIDADES_DESCUENTO = 10;

const euros = (n) => n.toLocaleString("es-ES", { style: "currency", currency: "EUR" });

function calcularTicket(precio, cantidad) {
  const subtotal = precio * cantidad;
  const descuento = cantidad >= UNIDADES_DESCUENTO ? subtotal * DESCUENTO : 0;
  const base = subtotal - descuento;          // el IVA se calcula sobre la base
  const iva = base * IVA;
  return { subtotal, descuento, base, iva, total: base + iva };
}

document.querySelector("#f").addEventListener("submit", (e) => {
  e.preventDefault();
  const d = new FormData(e.target);
  const precio = Number(d.get("precio").replace(",", "."));   // coma española → punto
  const cantidad = Number(d.get("cantidad"));
  if (Number.isNaN(precio) || !Number.isInteger(cantidad) || cantidad < 1) {
    document.querySelector("#ticket").textContent = "Datos no válidos";
    return;
  }
  const t = calcularTicket(precio, cantidad);
  document.querySelector("#ticket").textContent =
`${d.get("producto")}  x ${cantidad}
Subtotal:   ${euros(t.subtotal)}
Descuento: -${euros(t.descuento)}
Base:       ${euros(t.base)}
IVA 21 %:   ${euros(t.iva)}
TOTAL:      ${euros(t.total)}`;
});''', alto=330),
   TAB(['Decisión', 'Por qué'],
       ['`const IVA = 0.21`', 'Si cambia el IVA se toca un solo sitio, y el nombre explica el número'],
       ['`replace(",", ".")` antes de `Number`', '`Number("49,90")` da `NaN`: el usuario en España escribe coma'],
       ['`calcularTicket` no toca el DOM', 'Una función que solo calcula se puede probar sola en la consola'],
       ['`Number.isInteger(cantidad)`', 'No se venden 2,5 unidades: el tipo de dato expresa la regla']),
 ),
 S('j02', 'J02 · Validador de contraseña',
   NT('**Caso real:** el formulario de registro de una web. La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo, y se muestra qué reglas faltan.', 'note'),
   P('**Conceptos:** array de reglas · regex con `test` · `filter` · `every`'),
   LIVE('J02 · Solución propuesta', html='''<input id="pass" type="text" placeholder="Escribe una contraseña">
<ul id="reglas"></ul>''', js='''const REGLAS = [
  { texto: "Al menos 8 caracteres",   ok: (p) => p.length >= 8 },
  { texto: "Una mayúscula",           ok: (p) => /[A-ZÁÉÍÓÚÑ]/.test(p) },
  { texto: "Una minúscula",           ok: (p) => /[a-záéíóúñ]/.test(p) },
  { texto: "Un número",               ok: (p) => /\\d/.test(p) },
  { texto: "Un símbolo (!@#$%&*…)",   ok: (p) => /[^\\w\\s]/.test(p) },
];

const campo = document.querySelector("#pass");
const lista = document.querySelector("#reglas");

function pintar() {
  const p = campo.value;
  lista.replaceChildren(...REGLAS.map((r) => {
    const li = document.createElement("li");
    li.textContent = (r.ok(p) ? "✔ " : "✖ ") + r.texto;
    li.style.color = r.ok(p) ? "green" : "crimson";
    return li;
  }));
  console.log(REGLAS.every((r) => r.ok(p)) ? "Contraseña válida" : "Faltan reglas");
}
campo.addEventListener("input", pintar);
pintar();''', alto=250),
   NT('Guardar las reglas como **datos** (un array de objetos) en lugar de un `if` enorme permite añadir una regla nueva con una sola línea.', 'tip'),
 ),
 S('j03', 'J03 · Generador de email corporativo',
   NT('**Caso real:** alta de empleados en una empresa. El email se forma con la inicial del nombre y el primer apellido, en minúsculas, sin tildes ni espacios: «María José Núñez Pérez» → `mnunez@empresa.es`.', 'note'),
   P('**Conceptos:** `trim` · `split` · `normalize` · `replace` con regex · `toLowerCase` · `charAt`'),
   LIVE('J03 · Solución propuesta', js='''const quitarTildes = (t) => t.normalize("NFD").replace(/[\\u0300-\\u036f]/g, "");

function generarEmail(nombreCompleto, dominio = "empresa.es") {
  const partes = quitarTildes(nombreCompleto).trim().toLowerCase().split(/\\s+/);
  if (partes.length < 2) return null;                    // faltan apellidos
  const inicial = partes[0].charAt(0);
  const apellido = partes[partes.length === 2 ? 1 : 2]; // primer apellido
  return `${inicial}${apellido}@${dominio}`;
}

console.log(generarEmail("María José Núñez Pérez"));  // mnunez@empresa.es
console.log(generarEmail("  Luis   Gómez "));         // lgomez@empresa.es
console.log(generarEmail("Madonna"));                 // null''', alto=130),
   AV('Con nombres compuestos («María José») no se puede saber cuántas palabras son nombre y cuántas apellido solo contando. Aquí se simplifica; en una aplicación real el formulario pide **nombre** y **apellidos** en campos separados.', 'caution'),
 ),
 S('j04', 'J04 · Informe de ventas',
   NT('**Caso real:** el resumen semanal de una tienda. Con una lista de ventas se calcula el total, la media por venta, el producto más vendido y el ranking de vendedores.', 'note'),
   P('**Conceptos:** array de objetos · `reduce` · `Map` · `sort` · `toFixed`'),
   LIVE('J04 · Solución propuesta', js='''const ventas = [
  { vendedor: "Ana",   producto: "Ratón",   importe: 19.9 },
  { vendedor: "Luis",  producto: "Monitor", importe: 189 },
  { vendedor: "Ana",   producto: "Teclado", importe: 49.9 },
  { vendedor: "Marta", producto: "Ratón",   importe: 19.9 },
  { vendedor: "Ana",   producto: "Ratón",   importe: 19.9 },
];

const total = ventas.reduce((acc, v) => acc + v.importe, 0);
console.log("Total:", total.toFixed(2), "€");
console.log("Media por venta:", (total / ventas.length).toFixed(2), "€");

// importe acumulado por vendedor
const porVendedor = new Map();
for (const v of ventas) porVendedor.set(v.vendedor, (porVendedor.get(v.vendedor) ?? 0) + v.importe);

const ranking = [...porVendedor].sort((a, b) => b[1] - a[1]);
ranking.forEach(([nombre, importe], i) => console.log(`${i + 1}. ${nombre}: ${importe.toFixed(2)} €`));

// producto más vendido (por número de ventas)
const unidades = ventas.reduce((m, v) => m.set(v.producto, (m.get(v.producto) ?? 0) + 1), new Map());
const [masVendido] = [...unidades].sort((a, b) => b[1] - a[1]);
console.log("Más vendido:", masVendido[0], `(${masVendido[1]} ventas)`);''', alto=250),
 ),
 S('j05', 'J05 · Lista de tareas',
   NT('**Caso real:** la típica app de tareas pendientes. Se añaden tareas, se marcan como hechas, se borran y se guardan para que sigan ahí al recargar la página.', 'note'),
   P('**Conceptos:** array de objetos como estado · renderizado · delegación de eventos · `JSON` · `localStorage`'),
   LIVE('J05 · Solución propuesta', html='''<form id="f"><input id="texto" placeholder="Nueva tarea" required> <button>Añadir</button></form>
<ul id="lista"></ul>
<p id="resumen"></p>''', css='''ul { padding-left: 0; list-style: none; }
li { display: flex; gap: 8px; align-items: center; padding: 4px 0; }
li.hecha span { text-decoration: line-through; color: #888; }
li button { margin-left: auto; }''', js='''let tareas = [
  { id: 1, texto: "Repasar el DOM", hecha: true },
  { id: 2, texto: "Hacer la misión", hecha: false },
];                                   // en una web real: JSON.parse(localStorage.getItem("tareas") ?? "[]")

const lista = document.querySelector("#lista");

function pintar() {
  lista.replaceChildren(...tareas.map((t) => {
    const li = document.createElement("li");
    li.dataset.id = t.id;
    li.className = t.hecha ? "hecha" : "";
    li.innerHTML = '<input type="checkbox"> <span></span> <button>Borrar</button>';
    li.querySelector("input").checked = t.hecha;
    li.querySelector("span").textContent = t.texto;          // textContent: seguro
    return li;
  }));
  const pendientes = tareas.filter((t) => !t.hecha).length;
  document.querySelector("#resumen").textContent = `${pendientes} pendientes de ${tareas.length}`;
  // localStorage.setItem("tareas", JSON.stringify(tareas));  // persistir
}

document.querySelector("#f").addEventListener("submit", (e) => {
  e.preventDefault();
  const campo = document.querySelector("#texto");
  tareas.push({ id: Date.now(), texto: campo.value.trim(), hecha: false });
  campo.value = "";
  pintar();
});

lista.addEventListener("click", (e) => {                     // delegación: un solo manejador
  const li = e.target.closest("li");
  if (!li) return;
  const id = Number(li.dataset.id);
  if (e.target.matches("button")) tareas = tareas.filter((t) => t.id !== id);
  else if (e.target.matches("input")) {
    const t = tareas.find((t) => t.id === id);
    t.hecha = !t.hecha;
  } else return;
  pintar();
});
pintar();''', alto=340),
   AV('Aquí `localStorage` aparece comentado porque el visor aísla la página y no permite guardar. En tu propio `index.html` descomenta las dos líneas y las tareas **sobrevivirán a recargar**.', 'caution'),
 ),
 S('j06', 'J06 · Buscador con filtro en vivo',
   NT('**Caso real:** el catálogo de una tienda con una caja de búsqueda que filtra los productos **mientras se escribe**, sin pulsar ningún botón.', 'note'),
   P('**Conceptos:** evento `input` · `filter` · `includes` · normalizar texto · pintar desde datos'),
   LIVE('J06 · Solución propuesta', html='''<input id="q" placeholder="Buscar producto o categoría…" autofocus>
<p id="n"></p>
<ul id="catalogo"></ul>''', js='''const productos = [
  { nombre: "Ratón inalámbrico", categoria: "Periféricos", precio: 19.9 },
  { nombre: "Teclado mecánico",  categoria: "Periféricos", precio: 49.9 },
  { nombre: "Monitor 27\\"",      categoria: "Pantallas",   precio: 189 },
  { nombre: "Portátil 15\\"",     categoria: "Ordenadores", precio: 799 },
  { nombre: "Webcam HD",         categoria: "Periféricos", precio: 39 },
];

const norm = (t) => t.normalize("NFD").replace(/[\\u0300-\\u036f]/g, "").toLowerCase();

function pintar(lista) {
  document.querySelector("#catalogo").replaceChildren(...lista.map((p) => {
    const li = document.createElement("li");
    li.textContent = `${p.nombre} · ${p.categoria} · ${p.precio.toFixed(2)} €`;
    return li;
  }));
  document.querySelector("#n").textContent = `${lista.length} resultados`;
}

document.querySelector("#q").addEventListener("input", (e) => {
  const texto = norm(e.target.value.trim());
  pintar(productos.filter((p) => norm(p.nombre + " " + p.categoria).includes(texto)));
});
pintar(productos);''', alto=270),
 ),
)

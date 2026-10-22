# Apuntes 1.º DAW

Guía de apoyo de 1.º DAW (HTML, CSS, JavaScript, Java y SQL) en forma de web estática.
HTML semántico, CSS nativo con BEM y JavaScript sin compilación.

- Ejemplos de HTML, CSS y JavaScript **editables** con vista previa en vivo.
- SQL **ejecutable en el navegador**: PostgreSQL real (PGlite, WebAssembly) con la base de datos `tienda_online`.
- Java: código, explicación y botón de copiar.

## Ver la web en local

```
python -m http.server 8000
```

y abre http://localhost:8000 (hace falta un servidor; abrir `index.html` con doble clic no carga el motor de SQL).

## Estructura

| Carpeta | Contenido |
|---|---|
| `css/` | `tokens.css`, `base.css`, `layout.css` y un fichero por componente (BEM) |
| `js/` | `core.js` (dibujo de bloques), `app.js` (rutas, buscador), `editor.js`, `sql-runner.js` |
| `content/` | Un fichero por temario con módulos → secciones → bloques |
| `vendor/` | Fira Code, highlight.js y PGlite (licencias incluidas) |
| `scripts/` | Herramientas de autor: conversión de contenido, marcado de SQL ejecutable y empaquetado |

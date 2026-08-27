#!/usr/bin/env node
/**
 * arreglar-formulario.js — hace que el formulario de /contacto/ realmente envíe.
 *
 * Estado encontrado (2026-08-26): <form class="space-y-md"> sin action, sin servicio de
 * envío (Formspree/Web3Forms/etc.), sin fetch, sin mailto, y los campos SIN atributo
 * name. Cualquiera que lo llenó y presionó "Enviar", perdió el dato.
 *
 * El sitio es estático en GitHub Pages, así que no hay backend donde recibir un POST.
 * La solución sin infraestructura: el formulario compone un mensaje de WhatsApp con los
 * datos y abre wa.me. WhatsApp además es el canal que este público realmente usa.
 *
 * De paso arregla la accesibilidad: los <label> no estaban asociados a sus campos
 * (sin for/id), así que un lector de pantalla no podía relacionarlos.
 *
 *   node scripts/arreglar-formulario.js            (simula)
 *   node scripts/arreglar-formulario.js --aplicar
 */
const fs = require('fs');
const path = require('path');

const RAIZ = path.resolve(__dirname, '..');
const ARCHIVO = path.join(RAIZ, 'contacto', 'index.html');
const APLICAR = process.argv.includes('--aplicar');
const TELEFONO = '573212674754';

// Orden de los campos dentro del <form>, tal como están en el HTML.
const CAMPOS = [
  { name: 'nombre', etiqueta: 'Nombre', requerido: true },
  { name: 'empresa', etiqueta: 'Empresa', requerido: true },
  { name: 'cargo', etiqueta: 'Cargo', requerido: false },
  { name: 'email', etiqueta: 'Correo', requerido: false },
  { name: 'telefono', etiqueta: 'Teléfono', requerido: true },
  { name: 'servicio', etiqueta: 'Interés', requerido: false },
  { name: 'mensaje', etiqueta: 'Necesidad', requerido: false },
];

let html = fs.readFileSync(ARCHIVO, 'utf8');
const original = html;

if (html.includes('id="form-contacto"')) {
  console.log('El formulario ya está arreglado. Nada que hacer.');
  process.exit(0);
}

// Aislar el bloque del formulario para no tocar nada más de la página.
const iniForm = html.indexOf('<form');
const finForm = html.indexOf('</form>', iniForm);
if (iniForm === -1 || finForm === -1) {
  console.error('No se encontró el <form> en contacto/index.html');
  process.exit(1);
}

let bloque = html.slice(iniForm, finForm + '</form>'.length);
const bloqueOriginal = bloque;

// 1. Asociar cada label a su campo y ponerle name/id al campo.
let i = 0;
bloque = bloque.replace(
  /(<label\b[^>]*>)([\s\S]*?)(<\/label>)([\s\S]*?)(<(?:input|select|textarea)\b)([^>]*?)(\/?>)/g,
  (m, labelAbre, labelTexto, labelCierra, entre, campoAbre, attrs, campoCierra) => {
    const campo = CAMPOS[i++];
    if (!campo) return m;
    const id = 'f-' + campo.name;
    const labelConFor = labelAbre.replace(/^<label\b/, `<label for="${id}"`);
    let nuevosAttrs = ` id="${id}" name="${campo.name}"${campo.requerido ? ' required' : ''}${attrs}`;
    return labelConFor + labelTexto + labelCierra + entre + campoAbre + nuevosAttrs + campoCierra;
  }
);

// 2. Identificar el formulario y desactivar la validación nativa del navegador
//    (la hacemos nosotros para poder mostrar un mensaje en español).
bloque = bloque.replace(/^<form\b/, '<form id="form-contacto" novalidate');

// 3. Zona de estado para avisarle al usuario qué pasó.
bloque = bloque.replace(
  /<\/form>$/,
  '<p id="form-estado" role="status" aria-live="polite" style="margin-top:12px;font-size:0.9rem;"></p>\n</form>'
);

html = html.slice(0, iniForm) + bloque + html.slice(finForm + '</form>'.length);

// 4. El script que arma el mensaje y abre WhatsApp.
const script = `
<script>
(function () {
  var form = document.getElementById('form-contacto');
  if (!form) return;
  var estado = document.getElementById('form-estado');
  var CAMPOS = ${JSON.stringify(CAMPOS)};

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var faltan = CAMPOS.filter(function (c) {
      if (!c.requerido) return false;
      var el = form.elements[c.name];
      return !el || !el.value.trim();
    });

    if (faltan.length) {
      estado.style.color = '#b42318';
      estado.textContent = 'Falta ' + faltan.map(function (c) { return c.etiqueta.toLowerCase(); }).join(', ') + '.';
      var primero = form.elements[faltan[0].name];
      if (primero) primero.focus();
      return;
    }

    var lineas = ['Hola, quiero agendar un diagnóstico.', ''];
    CAMPOS.forEach(function (c) {
      var el = form.elements[c.name];
      if (!el) return;
      var v = (el.value || '').trim();
      if (!v || v === 'Selecciona una opción') return;
      lineas.push(c.etiqueta + ': ' + v);
    });

    var url = 'https://wa.me/${TELEFONO}?text=' + encodeURIComponent(lineas.join('\\n'));

    if (typeof gtag === 'function') {
      gtag('event', 'generate_lead', { method: 'formulario_contacto' });
    }

    estado.style.color = '';
    estado.textContent = 'Abriendo WhatsApp con sus datos...';
    window.open(url, '_blank', 'noopener');
  });
})();
</script>
`;

html = html.replace(/<\/body>/i, script + '</body>');

const cambios = [
  ['labels asociados y campos con name', (bloque.match(/name="/g) || []).length],
  ['campos obligatorios marcados', (bloque.match(/ required/g) || []).length],
  ['script de envío agregado', html.includes('form-contacto') ? 1 : 0],
];

console.log(APLICAR ? '\nAPLICANDO\n' : '\nSIMULACIÓN (--aplicar para escribir)\n');
for (const [q, n] of cambios) console.log(`  ${String(n).padStart(3)}  ${q}`);
console.log(`\n  El formulario pasa de perder todos los datos a abrir WhatsApp con ellos.`);

if (bloque === bloqueOriginal) {
  console.error('\nADVERTENCIA: el bloque del formulario no cambió. Revisar los selectores.');
  process.exit(1);
}

if (APLICAR) {
  fs.writeFileSync(ARCHIVO, html, 'utf8');
  console.log('\n  Escrito: contacto/index.html');
  console.log('  Revisar con: git diff contacto/index.html');
} else if (html === original) {
  console.error('\nADVERTENCIA: nada cambiaría.');
}

'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const RAIZ = path.resolve(__dirname, '../..');
const { targets } = require('../templates/interiors');

// La trampa que esta prueba impide:
//
// /casos/, /nosotros/, /contacto/, /soluciones/ y las dos de servicios son rutas
// INTERIORES. templates/interiors.js REEMPLAZA el cuerpo que define build-site.js:
// de esa linea solo sobreviven el titulo, la descripcion y el <h1>.
//
// Durante meses esas lineas llevaron secciones completas que nadie veia. Editarlas
// no hacia nada y no avisaba: se perdio tiempo buscando por que un cambio no salia.
// Ahora el cuerpo de una ruta interior es solo hero(), y esta prueba lo mantiene asi.
//
// Si necesitas cambiar el contenido de una ruta interior, se hace en
// templates/interiors.js, y la aprobacion de SEO se re-registra en
// content/interiors-seo-approved.json (NO en cases-seo-approved.json: validate()
// aplica caseApproval y despues lo pisa con interiorApproval).

const fuente = fs.readFileSync(path.join(RAIZ, 'scripts/build-site.js'), 'utf8');

// Devuelve los argumentos de page('<ruta>', ...) hasta el ');' que cierra la linea.
function argumentosDe(ruta) {
    const re = new RegExp("page\\('" + ruta.replace(/[/]/g, '\\/') + "',((?:[^\\n](?!\\n))*?)\\);\\s*$", 'm');
    const m = fuente.match(re);
    return m ? m[1] : null;
}

// Recorta hero(...) balanceando parentesis y devuelve lo que viene despues.
function restoDespuesDelHero(args) {
    const i = args.indexOf('hero(');
    if (i < 0) return null;
    let j = i + 'hero('.length, prof = 1;
    while (j < args.length && prof) {
        if (args[j] === '(') prof++;
        else if (args[j] === ')') prof--;
        j++;
    }
    return args.slice(j);
}

test('las rutas interiores no llevan cuerpo en build-site.js', () => {
    assert.ok(targets.length > 0, 'interiors.js deberia declarar rutas');

    for (const ruta of targets) {
        const args = argumentosDe(ruta);
        if (args === null) continue;   // definida de otra forma; no es el caso que vigilamos

        const resto = restoDespuesDelHero(args);
        assert.notEqual(resto, null, `${ruta}: se esperaba hero() en build-site.js`);
        assert.equal(
            resto.trim(), '',
            `${ruta}: build-site.js le pasa cuerpo despues de hero(), y interiors.js lo DESCARTA. ` +
            `Ese contenido no sale en la pagina. Edita scripts/templates/interiors.js.`
        );
    }
});

test('interiors.js es quien arma el cuerpo de esas rutas', () => {
    // Si alguien invierte la precedencia, el contenido de interiors.js dejaria de
    // salir y esta prueba lo cantaria antes de llegar a produccion.
    for (const ruta of targets) {
        const archivo = path.join(RAIZ, ruta === '/' ? 'index.html' : ruta.slice(1) + 'index.html');
        if (!fs.existsSync(archivo)) continue;
        const html = fs.readFileSync(archivo, 'utf8');
        assert.match(
            html, /class="interior-page"/,
            `${ruta}: la pagina generada no viene de interiors.js`
        );
    }
});

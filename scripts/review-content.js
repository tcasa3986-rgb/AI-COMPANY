'use strict';
// Correcciones editoriales puntuales, reproducibles e idempotentes.
const fs=require('node:fs'),path=require('node:path');
const file=path.join(__dirname,'content/articles.json'),posts=JSON.parse(fs.readFileSync(file,'utf8'));
const replacements=[
 ['Por qué ningún inventario genérico sirve para madera','Qué revisar en un inventario para madera'],
 ['Ningún inventario genérico convierte eso: cuenta "unidades".','Algunos inventarios genéricos necesitan configuración o extensiones para manejar esas conversiones. Conviene probarlas con los materiales reales antes de elegir.'],
 ['Contabilidad y nómina: siempre. No tiene sentido construir eso.','Contabilidad y nómina: evaluar primero una solución especializada y su integración con la operación.'],
 ['Lo que no sirve —y Google castiga desde 2024— es generar cien páginas iguales cambiando solo el nombre de la ciudad.','Generar muchas páginas iguales cambiando solo la ciudad puede infringir las políticas de spam cuando busca manipular rankings sin aportar valor.'],
 ['Todos se detectan, y desde 2024 el castigo alcanza al dominio entero, no solo a la página.','Estas prácticas pueden afectar la visibilidad. No hay evidencia en este artículo que confirme una sanción sobre un dominio concreto.'],
 ['Solo si cada una tiene contenido propio (sede, dirección, precios). Páginas iguales con el nombre cambiado se castigan desde 2024.','Solo si aportan información propia y útil. Las páginas repetidas creadas para manipular rankings pueden infringir las políticas de spam.']
];
let changes=0;for(const a of posts){for(const field of ['description','body']){for(const [old,next]of replacements){if(a[field].includes(old)){a[field]=a[field].replaceAll(old,next);a.modified='2026-10-13';changes++}}}}
fs.writeFileSync(file,JSON.stringify(posts,null,2)+'\n');console.log(`Correcciones editoriales aplicadas: ${changes}`);

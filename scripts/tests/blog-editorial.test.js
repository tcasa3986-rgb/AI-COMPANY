'use strict';
const test=require('node:test'),assert=require('node:assert/strict');const {validate,toPost,cover}=require('../blog-editorial');
const existing=[{slug:'guia-inventario',title:'Inventario para un negocio de materiales',query:'inventario por material'},{slug:'guia-pedidos',title:'Seguimiento de pedidos para empresas'}];
const paragraph='La operación necesita registrar el material disponible, el responsable del movimiento y la fecha del pedido. Cada etapa debe conservar el contexto para que el equipo pueda revisar la información y resolver diferencias antes de entregar. ';
function draft(){return {slug:'cotizaciones-con-contexto',title:'Cotizaciones con contexto para empresas de materiales',description:'Cómo organizar la información de una cotización de materiales y conectar disponibilidad, responsables y seguimiento sin repetir registros.',h1:'Cómo organizar una cotización de materiales con contexto',query:'organizar cotizaciones de materiales',category:'Operación empresarial',answer:'Una cotización de materiales con contexto reúne en un solo registro la disponibilidad, el responsable y el seguimiento, de modo que nadie tenga que repetir datos ni buscarlos en varios lugares.',services:['apps-empresariales'],published:'2026-10-13',intro:paragraph.repeat(2).trim(),sections:Array.from({length:4},(_,i)=>({heading:`Etapa ${i+1} del trabajo`,text:paragraph.repeat(5)})),faq:[{question:'¿Qué registrar?',answer:paragraph},{question:'¿Quién lo revisa?',answer:paragraph},{question:'¿Cómo empezar?',answer:paragraph}],related:['guia-inventario','guia-pedidos'],sources:[{title:'Google Search Central',url:'https://developers.google.com/search/docs/fundamentals/creating-helpful-content'}],status:'draft',sourceVerified:false,image:{src:'/assets/work/maderas-inventario.jpg',alt:'Interfaz real de inventario con datos de demostración',width:1280,height:800,approved:true,type:'real-ui-demo',caption:'Interfaz real con datos de demostración.',credit:{author:'AI Company CO',license:'Archivo propio'}}}}
test('un borrador válido conserva su estado sin publicarse',()=>{const d=draft();assert.equal(validate(d,existing).status,'draft')});
test('no se publica sin aprobación y fuentes revisadas',()=>assert.throws(()=>validate(draft(),existing,{publish:true}),/aprobación editorial/));
test('aprobar estado solamente no omite revisión de fuentes',()=>{const d={...draft(),status:'approved',reviewedBy:'Cristian Gutierrez',reviewedAt:'2026-10-13'};assert.throws(()=>validate(d,existing,{publish:true}),/verificación humana/)});
test('contenido aprobado usa el render compartido y enlaces locales',()=>{const d={...draft(),status:'approved',reviewedBy:'Cristian Gutierrez',reviewedAt:'2026-10-13',sourceVerified:true};validate(d,existing,{publish:true});const p=toPost(d,existing);assert.match(p.body,/href="\/blog\/guia-inventario\/"/);assert.equal(p.cover,'/assets/work/maderas-inventario.jpg')});
test('rechaza slug publicado y consulta repetida',()=>{const d=draft();d.slug='guia-inventario';d.query='Inventário por material';assert.throws(()=>validate(d,existing),/slug ya publicado/)});
test('rechaza una consulta repetida con slug nuevo',()=>{const d=draft();d.query='Inventário por material';assert.throws(()=>validate(d,existing),/consulta ya cubierta/)});
test('rechaza relacionados inexistentes',()=>{const d=draft();d.related=['guia-inventario','no-existe'];assert.throws(()=>validate(d,existing),/relacionado inexistente/)});
test('rechaza HTML activo y referencias antiguas',()=>{const d=draft();d.intro+='<script>alert(1)</script>';assert.throws(()=>validate(d,existing),/contenido no permitido/)});
test('rechaza fuente javascript y contenido insuficiente',()=>{const d=draft();d.sources[0].url='javascript:alert(1)';d.sections=d.sections.map(s=>({...s,text:paragraph}));assert.throws(()=>validate(d,existing),/fuente inválida/)});
test('portadas escapan texto suministrado',()=>{const svg=cover('Inventario <script> & control','Materiales');assert.ok(!svg.includes('<script>'));assert.ok(svg.includes('&lt;script&gt;'))});

test('rechaza publicación sin fotografía revisada',()=>{const d={...draft(),status:'approved',reviewedBy:'Cristian Gutierrez',reviewedAt:'2026-10-13',sourceVerified:true,image:null};assert.throws(()=>validate(d,existing,{publish:true}),/imagen fotográfica revisada/)});
test('rechaza repetir una portada de otra guía',()=>{const d={...draft(),status:'approved',reviewedBy:'Cristian Gutierrez',reviewedAt:'2026-10-13',sourceVerified:true};assert.throws(()=>validate(d,[...existing,{slug:'otra-guia',title:'Otra guía diferente',cover:d.image.src}],{publish:true}),/imagen ya utilizada/)});

test('exige respuesta corta y servicio: son lo que alimenta AEO y el enlazado interno',()=>{
  const d=draft();delete d.answer;assert.throws(()=>validate(d,existing),/respuesta corta/);
  const e=draft();e.services=['no-existe'];assert.throws(()=>validate(e,existing),/services/);
});
test('rechaza tablas mal formadas',()=>{const d=draft();d.sections[0].table={headers:['A','B'],rows:[['solo uno']]};assert.throws(()=>validate(d,existing),/tabla mal formada/)});
test('el render incluye respuesta corta, tabla, lista, enlace interno, nota de autoria y fuentes',()=>{
  const d={...draft(),status:'approved',reviewedBy:'Cristian Gutierrez',reviewedAt:'2026-10-28',sourceVerified:true};
  d.sections[0].text='Introduccion de la seccion con **negrita** y un [enlace](/blog/guia-inventario/) interno que debe quedar vivo.'+String.fromCharCode(10,10)+'- primer punto de la lista'+String.fromCharCode(10)+'- segundo punto de la lista';
  d.sections[0].table={caption:'Comparacion',headers:['Opcion','Cuando conviene'],rows:[['A','Si pocas facturas'],['B','Si mucho volumen']]};
  const p=toPost(d,existing);
  assert.equal(p.answer,d.answer);assert.doesNotMatch(p.body,/class="respuesta-corta"/);assert.match(p.body,/<ul><li>primer punto/);assert.match(p.body,/<strong>negrita<\/strong>/);
  assert.match(p.body,/<a href="\/blog\/guia-inventario\/">enlace<\/a>/);assert.match(p.body,/<table>[\s\S]*<th scope="row">A<\/th>/);
  assert.match(p.body,/class="nota-autoria"/);assert.match(p.body,/interés comercial/);assert.match(p.body,/Última revisión: 2026-10-28/);
  assert.match(p.body,/class="fuentes"/);assert.match(p.body,/wa\.me\/573224807767\?text=/);
});
test('no deja pasar HTML dentro del texto ni enlaces no https',()=>{
  const d=draft();d.sections[0].text='Texto con [mal enlace](javascript:alert(1)) para probar el filtro de contenido no permitido, suficientemente largo.';
  assert.throws(()=>validate(d,existing),/contenido no permitido/);
  const e={...draft(),status:'approved',reviewedBy:'Cristian Gutierrez',reviewedAt:'2026-10-28',sourceVerified:true};
  e.sections[0].text='Ver [sitio](http://ejemplo.com) sin cifrado, que no debe convertirse en enlace, y un [ok](https://ejemplo.com) que si, con texto largo suficiente.';
  const body=toPost(e,existing).body;assert.doesNotMatch(body,/href="http:\/\//);assert.match(body,/href="https:\/\/ejemplo\.com"/);
});
test('no se afirma ser el mejor',()=>{const d=draft();d.intro+=' Somos los mejores del mercado.';assert.throws(()=>validate(d,existing),/no se afirma/)});

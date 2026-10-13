'use strict';
// Generates one DRAFT. Never publishes, pushes, notifies, or requests indexing.
const fs=require('node:fs'),path=require('node:path');
const {validate}=require('./blog-editorial');
const ROOT=path.resolve(__dirname,'..');
async function main(){
 const topic=process.env.BLOG_TOPIC||process.argv[2];if(!topic)throw new Error('Define BLOG_TOPIC: un proceso concreto de inventario, pedidos, producción o cobros.');
 const sources=JSON.parse(process.env.BLOG_SOURCES||'[]');if(!sources.length||sources.some(s=>!s.title||!/^https:\/\//.test(s.url)))throw new Error('Define BLOG_SOURCES con fuentes oficiales y títulos para revisar.');
 if(!process.env.ANTHROPIC_API_KEY)throw new Error('Falta ANTHROPIC_API_KEY. No se publica ningún artículo.');
 const existing=JSON.parse(fs.readFileSync(path.join(ROOT,'scripts/content/articles.json'),'utf8'));
 const response=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',signal:AbortSignal.timeout(120000),headers:{'content-type':'application/json','x-api-key':process.env.ANTHROPIC_API_KEY,'anthropic-version':'2023-06-01'},body:JSON.stringify({model:process.env.ANTHROPIC_MODEL||'claude-sonnet-4-6',max_tokens:6000,system:'Eres el redactor de AI Company CO. Escribe para dueños de empresas colombianas. No inventes clientes, resultados, estadísticas, testimonios, garantías ni normas. Las fuentes son referencias propuestas para revisión humana: no atribuyas contenido no verificado. No generes temas fiscales o legales. El software a medida se cotiza por alcance. Nunca otorgues aprobación editorial. Devuelve solo JSON válido, sin HTML ni markdown.',messages:[{role:'user',content:JSON.stringify({topic,sources,avoidQueries:existing.map(a=>a.query||a.title),requirements:{words:'800-1200',sections:'4-8',faq:3,related:'elige dos slugs existentes',tone:'claro, específico, sin promesas de ROI',schema:{slug:'slug-nuevo',title:'Título completo de 25 a 80 caracteres',description:'Descripción de 80 a 180 caracteres',h1:'Título principal',query:'Una intención de búsqueda concreta',category:'Operación empresarial',intro:'Respuesta inicial',sections:[{heading:'Título de sección',text:'Texto con párrafos separados por dos saltos de línea'}],faq:[{question:'Pregunta',answer:'Respuesta'}],related:existing.slice(-2).map(a=>a.slug),sources,status:'draft'}}})}]})});
 if(!response.ok){if([400,402].includes(response.status))throw new Error('La API rechazó la generación. Revisa saldo, modelo y configuración; no se publica contenido.');throw new Error(`La API respondió HTTP ${response.status}; no se publica contenido.`)}
 const result=await response.json();if(result.stop_reason!=='end_turn')throw new Error('Respuesta incompleta del modelo.');
 const text=result.content.filter(c=>c.type==='text').map(c=>c.text).join('').replace(/^```(?:json)?\s*|\s*```$/g,'');const draft=JSON.parse(text);
 draft.status='draft';draft.sourceVerified=false;delete draft.reviewedBy;delete draft.reviewedAt;
 const parts=new Intl.DateTimeFormat('en',{timeZone:'America/Bogota',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());const datePart=t=>parts.find(p=>p.type===t).value;draft.published=`${datePart('year')}-${datePart('month')}-${datePart('day')}`;draft.sources=sources;
 validate(draft,existing);const dir=path.join(ROOT,'_rediseno','blog-drafts');fs.mkdirSync(dir,{recursive:true});const target=path.join(dir,draft.slug+'.json');if(fs.existsSync(target))throw new Error('Ya existe ese borrador; no se sobrescribe.');fs.writeFileSync(target,JSON.stringify(draft,null,2)+'\n');console.log(`Borrador validado: _rediseno/blog-drafts/${draft.slug}.json. Requiere revisión de fuentes y aprobación.`);
}
main().catch(e=>{console.error(e.message);process.exitCode=1});

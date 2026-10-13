'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const SOURCE=path.resolve(__dirname,'..'),ROOT=process.env.SITE_CHECK_ROOT?path.resolve(process.env.SITE_CHECK_ROOT):SOURCE,manifest=JSON.parse(fs.readFileSync(path.join(SOURCE,'scripts/content/pages-manifest.json'),'utf8')),errors=[],titles=new Set(),descs=new Set();let checkedLinks=0;
const check=(condition,message)=>{if(!condition)errors.push(message)};
for(const p of manifest){const html=fs.readFileSync(path.join(ROOT,p.file),'utf8'),prefix=p.route+': ';
check((html.match(/<h1(?:\s|>)/g)||[]).length===1,prefix+'debe existir un solo H1');check((html.match(/<main(?:\s|>)/g)||[]).length===1,prefix+'debe existir un solo main');
check(html.includes(`href="https://aicompanyco.com${p.route}"`),prefix+'canonical incorrecto');check(html.includes('href="/favicon.svg"'),prefix+'falta favicon');check(html.includes('/assets/site.css'),prefix+'falta diseño compartido');
const title=html.match(/<title>(.*?)<\/title>/s)?.[1],desc=html.match(/name="description" content="([^"]*)"/)?.[1];check(!!title&&title.length<110,prefix+'título vacío o excesivo');check(!!desc&&desc.length<250,prefix+'descripción vacía o excesiva');
if(!p.noindex){check(!titles.has(title),prefix+'título duplicado');check(!descs.has(desc),prefix+'descripción duplicada');titles.add(title);descs.add(desc)}
for(const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)){try{const ld=JSON.parse(match[1]);assert.equal(ld['@context'],'https://schema.org');assert.ok(ld['@graph'].length>=3)}catch{errors.push(prefix+'JSON-LD inválido')}}
check(!/index_con_logo|\[CONFIRMAR\]|cdn\.tailwindcss\.com|material-symbols|generate_lead/.test(html),prefix+'referencia antigua o placeholder');
if(p.route==='/contacto/')check((html.match(/<option(?:\s|>)/g)||[]).length===7,prefix+'selector de sector incompleto');
for(const m of html.matchAll(/(?:href|src)="([^"]+)"/g)){let value=m[1];if(/^(?:mailto:|tel:|data:|https?:\/\/)/.test(value))continue;if(value.startsWith('#')){if(value==='#contenido')continue;check(html.includes(`id="${value.slice(1)}"`),prefix+'ancla inexistente '+value);continue}value=value.split(/[?#]/)[0];if(!value)continue;const url=new URL(value,'https://aicompanyco.com'+p.route),file=path.join(ROOT,decodeURIComponent(url.pathname));check(fs.existsSync(file),prefix+'enlace o recurso local inexistente '+value);checkedLinks++}
for(const m of html.matchAll(/<img\b([^>]+)>/g)){check(/\balt="/.test(m[1]),prefix+'imagen sin alt');check(/\bwidth="/.test(m[1])&&/\bheight="/.test(m[1]),prefix+'imagen sin dimensiones')}
}
const sitemap=fs.readFileSync(path.join(ROOT,'sitemap-main.xml'),'utf8');for(const p of manifest){check(sitemap.includes(`https://aicompanyco.com${p.route}</loc>`)===!p.noindex,p.route+': sitemap/noindex incoherente')}
for(const asset of ['favicon.ico','favicon-96.png','apple-touch-icon.png','assets/brand/social-cover.png','assets/brand/icon-192.png','assets/brand/logo-512.png'])check(fs.existsSync(path.join(ROOT,asset)),'falta '+asset);
if(errors.length){console.error(errors.slice(0,60).join('\n'));console.error(`${errors.length} errores`);process.exitCode=1}else console.log(JSON.stringify({pages:manifest.length,indexable:titles.size,internalReferences:checkedLinks,errors:0}));

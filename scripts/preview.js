'use strict';
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),port=Number(process.env.PORT||4175);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.woff2':'font/woff2','.ico':'image/x-icon','.xml':'application/xml','.txt':'text/plain; charset=utf-8','.webmanifest':'application/manifest+json'};
http.createServer((req,res)=>{res.setHeader('X-Robots-Tag','noindex');if(req.method!=='GET'&&req.method!=='HEAD'){res.writeHead(405);return res.end()}let p;try{p=decodeURIComponent(new URL(req.url,'http://localhost').pathname)}catch{res.writeHead(400);return res.end()}
if(p==='/favicon.ico'){res.writeHead(204);return res.end()}
if(p==='/__revision__/'){const review=path.join(root,'_rediseno/fase2/components.html');if(!fs.existsSync(review)){res.writeHead(404);return res.end('Ejecuta npm run review')}res.writeHead(200,{'Content-Type':types['.html']});return fs.createReadStream(review).pipe(res)}
const segments=p.split('/').filter(Boolean);if(segments.some(s=>s.startsWith('.'))||segments.includes('node_modules')||segments.includes('_rediseno')||segments.includes('scripts')||!(/^\/assets\//.test(p)||p.endsWith('/')||/\.(html|xml|txt)$/.test(p))){res.writeHead(403);return res.end()}
let file=path.resolve(root,'.'+p);if(!file.startsWith(root+path.sep)&&file!==root){res.writeHead(403);return res.end()}
if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');let status=200;if(!fs.existsSync(file)){file=path.join(root,'404.html');status=404}res.writeHead(status,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});fs.createReadStream(file).pipe(res)
}).listen(port,'127.0.0.1',()=>console.log(`Local: http://127.0.0.1:${port}`));

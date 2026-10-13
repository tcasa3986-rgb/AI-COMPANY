'use strict';
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),port=Number(process.env.PORT||4175);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.ico':'image/x-icon','.xml':'application/xml','.txt':'text/plain; charset=utf-8','.webmanifest':'application/manifest+json'};
http.createServer((req,res)=>{let p;try{p=decodeURIComponent(new URL(req.url,'http://localhost').pathname)}catch{res.writeHead(400);return res.end()}
const segments=p.split('/').filter(Boolean);if(segments.includes('..')||segments.includes('.git')||segments.includes('node_modules')||segments.includes('_rediseno')||segments.includes('scripts')){res.writeHead(403);return res.end()}
let file=path.resolve(root,'.'+p);if(!file.startsWith(root+path.sep)&&file!==root){res.writeHead(403);return res.end()}
if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');let status=200;if(!fs.existsSync(file)){file=path.join(root,'404.html');status=404}res.writeHead(status,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});fs.createReadStream(file).pipe(res)
}).listen(port,'127.0.0.1',()=>console.log(`Local: http://127.0.0.1:${port}`));

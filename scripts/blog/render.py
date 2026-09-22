# -*- coding: utf-8 -*-
"""
Arma cada articulo del blog a partir de su contenido (articulos_*.py) y del molde visual
de los articulos existentes (se toma el <style> de uno de ellos para que el diseno sea el
mismo). Tambien regenera blog/index.html, el sitemap y los redirects.

Por que existe (2026-09-21): los 25 articulos venian de un generador automatico y tenian
tres problemas que Google castiga: dos articulos para la misma busqueda, titulos rotos, y
el logo y el boton "Hablemos" apuntando a index_con_logo.html, una portada vieja que
seguia publicada. Aqui cada articulo declara UNA busqueda objetivo (`consulta`), y el
script no deja dos con la misma.

Uso:  python scripts/blog/render.py
"""
import io, os, re, sys, json, glob, importlib, datetime

RAIZ = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
SITIO = 'https://aicompanyco.com'
WA = '573212674754'
HOY = '2026-09-21'

sys.path.insert(0, os.path.dirname(__file__))
ARTICULOS = []
for mod in ['articulos_a', 'articulos_b', 'articulos_c']:
    try:
        ARTICULOS += importlib.import_module(mod).ARTICULOS
    except ModuleNotFoundError:
        pass

# Secciones adicionales y correcciones de titulo/descripcion, por slug.
CAPAS = []
for mod, attr in (('articulos_extra', 'EXTRA'), ('articulos_extra2', 'EXTRA2'), ('articulos_extra3', 'EXTRA3'), ('articulos_extra4', 'EXTRA4')):
    try:
        CAPAS.append(getattr(importlib.import_module(mod), attr))
    except ModuleNotFoundError:
        pass
for capa in CAPAS:
    for a in ARTICULOS:
        e = capa.get(a['slug'])
        if not e: continue
        if 'titulo' in e: a['titulo'] = e['titulo']
        if 'descripcion' in e: a['descripcion'] = e['descripcion']
        if e.get('secciones'):
            # van antes de la ultima seccion, que suele ser el cierre
            a['secciones'] = a['secciones'][:-1] + e['secciones'] + a['secciones'][-1:]

def leer(rel): return io.open(os.path.join(RAIZ, rel), encoding='utf-8').read()
def escribir(rel, s):
    ruta = os.path.join(RAIZ, rel)
    os.makedirs(os.path.dirname(ruta), exist_ok=True)
    io.open(ruta, 'w', encoding='utf-8', newline='\n').write(s)
def esc(v): return str(v).replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('"', '&quot;')
def jsonesc(v): return json.dumps(v, ensure_ascii=False)

# El <style> de un articulo existente: mismo diseno, sin copiarlo a mano.
_molde = leer('blog/que-es-n8n-automatizacion-colombia/index.html')
ESTILO = re.search(r'<style>[\s\S]*?</style>', _molde).group(0)
ESTILO += """
<style>
  .portada{width:100%;max-width:820px;margin:1.5rem auto 0;display:block;border-radius:12px}
  .article-body ul li{margin:.35rem 0}
  .article-body table{width:100%;border-collapse:collapse;margin:1rem 0;font-size:.95rem}
  .article-body th,.article-body td{border:1px solid #E2E8F0;padding:.6rem .7rem;text-align:left;vertical-align:top}
  .article-body th{background:#F8FAFC;font-weight:600}
  .fuentes{font-size:.85rem;color:#64748B;margin-top:2rem}
</style>"""

MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre']
def fecha_bonita(iso):
    a, m, d = iso.split('-')
    return '%d de %s de %s' % (int(d), MESES[int(m)-1], a)

def palabras(a):
    # Como lo cuenta cualquier editor: por espacios, con las preguntas frecuentes incluidas.
    t = re.sub(r'<[^>]+>', ' ', a['intro'] + ' '.join(s['html'] for s in a['secciones']) + ' '.join(q + ' ' + r for q, r in a['faq']))
    return len(t.split())

POR_SLUG = {a['slug']: a for a in ARTICULOS}

def render(a):
    url = '%s/blog/%s/' % (SITIO, a['slug'])
    minutos = max(3, round(palabras(a) / 200))
    publicado = a.get('publicado', HOY)
    faq_ld = [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": r}} for q, r in a['faq']]
    ld = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "BlogPosting", "headline": a['h1'], "description": a['descripcion'], "url": url,
                "image": '%s/blog/%s/portada.svg' % (SITIO, a['slug']),
                "datePublished": publicado, "dateModified": HOY, "inLanguage": "es-CO",
                "author": {"@type": "Organization", "name": "AI Company CO", "url": SITIO + '/'},
                "publisher": {"@type": "Organization", "name": "AI Company CO", "url": SITIO + '/', "logo": {"@type": "ImageObject", "url": SITIO + '/logo_MASTER.png'}},
                "mainEntityOfPage": {"@type": "WebPage", "@id": url},
                "articleSection": a['categoria'], "wordCount": palabras(a),
            },
            {"@type": "FAQPage", "mainEntity": faq_ld},
            {"@type": "BreadcrumbList", "itemListElement": [
                {"@type": "ListItem", "position": 1, "name": "Inicio", "item": SITIO + '/'},
                {"@type": "ListItem", "position": 2, "name": "Blog", "item": SITIO + '/blog/'},
                {"@type": "ListItem", "position": 3, "name": a['h1'], "item": url}]},
        ],
    }
    secciones = '\n'.join('    <h2 id="%s">%s</h2>\n%s' % (re.sub(r'[^a-z0-9]+', '-', s['h2'].lower().translate(str.maketrans('áéíóúñ', 'aeioun'))).strip('-'), esc(s['h2']), s['html']) for s in a['secciones'])
    rel = ''.join('      <a href="../%s/" class="rel-card"><span class="rel-emoji">%s</span><span class="rel-titulo">%s</span><span class="rel-arrow">→</span></a>\n'
                  % (r, POR_SLUG[r].get('emoji', '📄'), esc(POR_SLUG[r]['h1'])) for r in a['relacionados'] if r in POR_SLUG)
    faq = ''.join('    <details class="faq-item">\n      <summary class="faq-q">%s<span class="faq-icon">+</span></summary>\n      <p class="faq-a">%s</p>\n    </details>\n' % (esc(q), esc(r)) for q, r in a['faq'])
    wa_txt = a['cta'].get('wa', 'Hola, leí el artículo "%s" y quiero saber más' % a['h1'])
    import urllib.parse
    wa_url = 'https://wa.me/%s?text=%s' % (WA, urllib.parse.quote(wa_txt))
    fuentes = ('\n    <p class="fuentes"><strong>Fuentes y referencias:</strong> ' + ' · '.join('<a href="%s" rel="nofollow noopener" target="_blank">%s</a>' % (u, esc(t)) for t, u in a['fuentes']) + '</p>') if a.get('fuentes') else ''
    return """<!DOCTYPE html>
<html lang="es-CO">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>%(titulo)s</title>
<meta name="description" content="%(descripcion)s">
<link rel="canonical" href="%(url)s">
<meta name="robots" content="index, follow, max-image-preview:large">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<meta property="og:type" content="article">
<meta property="og:site_name" content="AI Company CO">
<meta property="og:locale" content="es_CO">
<meta property="og:title" content="%(titulo)s">
<meta property="og:description" content="%(descripcion)s">
<meta property="og:url" content="%(url)s">
<meta property="og:image" content="%(sitio)s/logo_MASTER.png">
<meta property="article:published_time" content="%(publicado)s">
<meta property="article:modified_time" content="%(hoy)s">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="%(titulo)s">
<meta name="twitter:description" content="%(descripcion)s">
<meta name="twitter:image" content="%(sitio)s/logo_MASTER.png">
<script type="application/ld+json">%(ld)s</script>
%(estilo)s
</head>
<body>
<nav style="position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:1rem 5%%;background:rgba(255,255,255,0.95);backdrop-filter:blur(24px);border-bottom:1px solid #E2E8F0;">
  <a href="/" style="display:flex;align-items:center;gap:10px;text-decoration:none;">
    <img src="/logo_aicompany_CO_FINAL.svg" alt="AI Company CO" style="width:40px;height:40px;object-fit:contain;" width="40" height="40">
    <span style="font-family:'Space Grotesk',sans-serif;font-size:0.9rem;font-weight:700;color:#0F172A;letter-spacing:0.1em;">AI COMPANY CO</span>
  </a>
  <a href="/contacto/" style="background:#2563EB;color:#fff;padding:0.6rem 1.4rem;border-radius:4px;text-decoration:none;font-size:0.82rem;font-weight:500;">Hablemos →</a>
</nav>
<div class="breadcrumb">
  <a href="/">Inicio</a> / <a href="/blog/">Blog</a> / %(miga)s
</div>
<header class="hero">
  <div class="container">
    <span class="post-category">%(categoria)s</span>
    <h1>%(h1)s</h1>
    <div class="post-meta">Por AI Company CO · %(fecha)s · %(minutos)d minutos de lectura%(actualizado)s</div>
  </div>
</header>
<main class="article-body">
  <div class="container">
    <img class="portada" src="/blog/%(slug)s/portada.svg" alt="%(h1)s" width="820" height="430" loading="eager">
%(intro)s
%(secciones)s
    <div class="cta-inline">
      <h3>%(cta_h3)s</h3>
      <p>%(cta_p)s</p>
      <a href="%(wa_url)s" class="btn-wa">%(cta_btn)s</a>
    </div>%(fuentes)s
  </div>
  <section class="related-section">
    <h3 class="related-title">Seguir leyendo</h3>
    <div class="related-grid">
%(rel)s    </div>
  </section>
  <section class="faq-section" id="preguntas-frecuentes">
    <h2 class="faq-title">Preguntas frecuentes</h2>
%(faq)s  </section>
</main>
<footer style="background:#FFFFFF;border-top:1px solid #E2E8F0;padding:2rem 5%%;text-align:center;">
  <p style="font-size:0.78rem;color:#64748B;">AI Company CO · Soacha, Cundinamarca · <a href="/sistemas/" style="color:#2563EB;">Sistemas a la medida</a> · <a href="/blog/" style="color:#2563EB;">Blog</a> · <a href="/politica-de-privacidad/" style="color:#7C3AED;">Privacidad</a> · <a href="/terminos-y-condiciones/" style="color:#7C3AED;">Términos</a></p>
</footer>
<script src="/wa-widget.js"></script>
</body>
</html>
""" % dict(
        titulo=esc(a['titulo']), descripcion=esc(a['descripcion']), url=url, sitio=SITIO, publicado=publicado, hoy=HOY,
        ld=jsonesc(ld).replace('<', '\\u003c'), estilo=ESTILO, miga=esc(a.get('miga', a['h1'][:48])), categoria=esc(a['categoria']),
        h1=esc(a['h1']), fecha=fecha_bonita(publicado), minutos=minutos,
        actualizado=(' · actualizado el %s' % fecha_bonita(HOY)) if publicado != HOY else '',
        slug=a['slug'], intro=a['intro'], secciones=secciones,
        cta_h3=esc(a['cta']['h3']), cta_p=esc(a['cta']['p']), cta_btn=esc(a['cta']['boton']), wa_url=wa_url, fuentes=fuentes, rel=rel, faq=faq,
    )

def validar():
    consultas = {}
    slugs = set()
    for a in ARTICULOS:
        assert a['slug'] not in slugs, 'slug repetido: ' + a['slug']; slugs.add(a['slug'])
        c = a['consulta'].strip().lower()
        assert c not in consultas, 'DOS ARTICULOS PARA LA MISMA BUSQUEDA: "%s" (%s y %s)' % (c, consultas[c], a['slug']); consultas[c] = a['slug']
        assert 30 <= len(a['titulo']) <= 62, '%s: titulo de %d caracteres' % (a['slug'], len(a['titulo']))
        assert 70 <= len(a['descripcion']) <= 158, '%s: descripcion de %d caracteres' % (a['slug'], len(a['descripcion']))
        for campo in ('titulo', 'descripcion'):
            v = a[campo]
            assert v == v.strip() and v[-1] in '.?!)' + 'abcdefghijklmnopqrstuvwxyzáéíóúñ' + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', '%s: %s termina cortado: %r' % (a['slug'], campo, v[-20:])
            assert not re.search(r'\s(de|el|la|los|las|y|o|en|a|con|sin|un|una|del|al|que|qué|cómo|cuándo|para|por)$', v), '%s: %s termina en palabra suelta: %r' % (a['slug'], campo, v[-20:])
        assert palabras(a) >= 600, '%s: solo %d palabras' % (a['slug'], palabras(a))
        assert len(a['faq']) >= 3, a['slug'] + ': faltan preguntas frecuentes'
        assert len(a['relacionados']) >= 2, a['slug'] + ': faltan relacionados'
        for r in a['relacionados']: assert r in POR_SLUG, '%s: relacionado inexistente %s' % (a['slug'], r)
        assert os.path.exists(os.path.join(RAIZ, 'blog', a['slug'], 'portada.svg')) or a.get('portada_de'), a['slug'] + ': sin portada.svg'

def indice():
    orden = sorted(ARTICULOS, key=lambda a: a.get('publicado', HOY), reverse=True)
    viejo = leer('blog/index.html')
    # se conserva todo el indice existente y se reemplaza solo la rejilla de articulos
    ini = viejo.find('<article'); fin = viejo.rfind('</article>') + len('</article>')
    assert ini > 0 and fin > ini
    tarjeta = viejo[ini:viejo.find('</article>', ini) + len('</article>')]
    def carta(a):
        t = tarjeta
        t = re.sub(r'href="[^"]*"', 'href="%s/"' % a['slug'], t)
        t = re.sub(r'src="[^"]*portada[^"]*"', 'src="%s/portada.svg"' % a['slug'], t)
        t = re.sub(r'alt="[^"]*"', 'alt="%s"' % esc(a['h1']), t)
        t = re.sub(r'(<h3[^>]*>)[\s\S]*?(</h3>)', lambda m: m.group(1) + esc(a['h1']) + m.group(2), t, count=1)
        t = re.sub(r'(<p[^>]*>)[\s\S]*?(</p>)', lambda m: m.group(1) + esc(a['descripcion']) + m.group(2), t, count=1)
        t = re.sub(r'(<time[^>]*>)[\s\S]*?(</time>)', lambda m: m.group(1) + fecha_bonita(a.get('publicado', HOY)) + m.group(2), t, count=1)
        t = re.sub(r'(<span[^>]*categor[^>]*>)[\s\S]*?(</span>)', lambda m: m.group(1) + esc(a['categoria']) + m.group(2), t, count=1)
        return t
    nuevo = viejo[:ini] + '\n'.join(carta(a) for a in orden) + viejo[fin:]
    nuevo = nuevo.replace('index_con_logo.html', '')
    escribir('blog/index.html', nuevo)

def sitemap():
    s = leer('sitemap-main.xml')
    # quita toda entrada de articulo, venga en una linea o en bloque de varias (el indice /blog/ se queda)
    s = re.sub(r'\s*<url>\s*<loc>%s/blog/[^<]+</loc>[\s\S]*?</url>' % re.escape(SITIO), '', s)
    entradas = ''.join('  <url><loc>%s/blog/%s/</loc><lastmod>%s</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>\n' % (SITIO, a['slug'], HOY) for a in ARTICULOS)
    s = s.replace('</urlset>', entradas + '</urlset>')
    escribir('sitemap-main.xml', s)

if __name__ == '__main__':
    validar()
    for a in ARTICULOS:
        if a.get('portada_de'):
            src = os.path.join(RAIZ, 'blog', a['portada_de'], 'portada.svg')
            dst = os.path.join(RAIZ, 'blog', a['slug'], 'portada.svg')
            os.makedirs(os.path.dirname(dst), exist_ok=True)
            if not os.path.exists(dst): io.open(dst, 'w', encoding='utf-8').write(io.open(src, encoding='utf-8').read())
        escribir('blog/%s/index.html' % a['slug'], render(a))
    indice(); sitemap()
    print('%d articulos generados' % len(ARTICULOS))
    for a in sorted(ARTICULOS, key=lambda x: x['slug']): print('  %5d pal  %s' % (palabras(a), a['slug']))

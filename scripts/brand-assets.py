"""Exportaciones raster de la identidad vectorial. No contiene fotos ni datos de clientes."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
ROOT=Path(__file__).resolve().parents[1]
BRAND=ROOT/'assets'/'brand'
INK='#142b43'; LIME='#d4f775'; PAPER='#f7f8f4'
def icon(size):
    s=8; im=Image.new('RGBA',(size*s,size*s),(0,0,0,0)); d=ImageDraw.Draw(im)
    k=size*s/64
    d.rounded_rectangle((0,0,size*s-1,size*s-1),radius=16*k,fill=INK)
    for pts in [[(14,43),(29,17),(38,17),(23,43)],[(32,43),(40,29),(50,43)],[(28,36),(43,36),(43,43),(24,43)]]:
        d.polygon([(x*k,y*k) for x,y in pts],fill=LIME)
    return im.resize((size,size),Image.Resampling.LANCZOS)
for n,target in [(96,ROOT/'favicon-96.png'),(180,ROOT/'apple-touch-icon.png'),(192,BRAND/'icon-192.png'),(512,BRAND/'logo-512.png')]: icon(n).save(target)
icon(256).save(ROOT/'favicon.ico',sizes=[(16,16),(32,32),(48,48),(64,64)])
icon(96).save(ROOT/'favicon.png')
def font(size,bold=False):
    return ImageFont.truetype('C:/Windows/Fonts/'+('arialbd.ttf' if bold else 'arial.ttf'),size)
im=Image.new('RGB',(1200,630),INK); d=ImageDraw.Draw(im)
for x in range(730,1200,32):d.line((x,0,x,630),fill='#233d53')
for y in range(0,630,32):d.line((730,y,1200,y),fill='#233d53')
im.paste(icon(70),(70,65),icon(70));d.text((158,83),'AI Company.',font=font(32,True),fill=PAPER)
d.text((70,218),'Menos enredos.',font=font(62,True),fill=PAPER)
d.text((70,294),'Más control.',font=font(62,True),fill=PAPER)
d.text((70,390),'Tu negocio conectado.',font=font(43,True),fill=LIME)
d.text((72,535),'Software a la medida · Colombia · aicompanyco.com',font=font(20),fill='#b7c5d0')
d.rounded_rectangle((820,115,1108,410),radius=18,fill=LIME)
d.text((850,153),'TU OPERACIÓN',font=font(20,True),fill=INK)
for y,t in [(220,'Inventario'),(275,'Pedidos'),(330,'Cobros')]:
    d.line((849,y+38,1080,y+38),fill='#a5c45d',width=1);d.text((850,y),t,font=font(25,True),fill=INK);d.text((1040,y),'↗',font=font(25),fill=INK)
im.save(BRAND/'social-cover.png',optimize=True)
for width,height,name in [(1080,1080,'social-post.png'),(1080,1920,'social-story.png')]:
    canvas=Image.new('RGB',(width,height),PAPER); drawing=ImageDraw.Draw(canvas)
    canvas.paste(icon(86),(74,85),icon(86)); drawing.text((184,109),'AI Company.',font=font(36,True),fill=INK)
    y=330 if height==1080 else 550
    drawing.text((74,y),'Menos enredos.',font=font(77,True),fill=INK)
    drawing.text((74,y+105),'Más control.',font=font(77,True),fill=INK)
    drawing.text((74,y+220),'Tu negocio conectado.',font=font(62,True),fill='#64832e')
    drawing.text((78,y+350),'Inventario · Pedidos · Producción · Cobros',font=font(29),fill='#5c6b79')
    drawing.rounded_rectangle((74,height-230,1006,height-120),radius=12,fill=INK)
    drawing.text((108,height-199),'Conversemos sobre tu negocio',font=font(36,True),fill=LIME)
    drawing.text((78,height-74),'aicompanyco.com',font=font(24),fill=INK)
    canvas.save(BRAND/name,optimize=True)
print('Favicon, Apple Touch, portada social y plantillas feed/story exportados.')

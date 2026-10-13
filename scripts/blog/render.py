"""Compatibilidad: el render editorial y la web ahora tienen una plantilla única.
El contenido migrado vive en scripts/content/articles.json. Los módulos antiguos
articulos_*.py se conservan como historial y ya no sobrescriben publicaciones.
"""
from pathlib import Path
import subprocess
root=Path(__file__).resolve().parents[2]
subprocess.run(['node',str(root/'scripts'/'build-site.js')],cwd=root,check=True)

"""Gera variantes AVIF da foto principal, preservando o original WebP."""
from pathlib import Path
from io import BytesIO
from hashlib import sha256
import json
from PIL import Image

root = Path(__file__).parent / 'imagens'
variants = []
with Image.open(root / 'hero-usina-asfalto.webp') as original:
    for width in [480, 640, 800, 1280]:
        output = BytesIO()
        original.resize((width, round(original.height * width / original.width)), Image.Resampling.LANCZOS).save(output, 'AVIF', quality=45, speed=6)
        data = output.getvalue()
        name = f'hero-usina-asfalto-{width}-{sha256(data).hexdigest()[:10]}.avif'
        (root / 'responsivas' / name).write_bytes(data)
        variants.append({'url': '/imagens/responsivas/' + name, 'width': width})
        print(f'{width}px: {len(data)} bytes')
(root / 'hero-avif.json').write_text(json.dumps(variants, indent=2) + '\n', encoding='utf-8')

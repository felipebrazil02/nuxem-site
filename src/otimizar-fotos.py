"""Recria apenas as fotos da home a partir dos originais, sem alterar o enquadramento.
Execute após gerar-imagens.py. Requer Pillow somente na manutenção local.
URLs com hash evitam reutilização de versões antigas no cache imutável.
"""
from pathlib import Path
from io import BytesIO
from hashlib import sha256
import json
from PIL import Image

root = Path(__file__).parent / 'imagens'
manifest_path = root / 'manifesto.json'
manifest = json.loads(manifest_path.read_text(encoding='utf-8'))
for name in ['hero-usina-asfalto', 'caldeira', 'fundicao']:
    src = f'/imagens/{name}.webp'
    variants = []
    with Image.open(root / f'{name}.webp') as original:
        for width in [160, 480, 800]:
            output = BytesIO()
            size = (width, round(original.height * width / original.width))
            original.resize(size, Image.Resampling.LANCZOS).save(
                output, 'WEBP', quality=65, method=6)
            data = output.getvalue()
            filename = f'{name}-{width}-{sha256(data).hexdigest()[:10]}.webp'
            (root / 'responsivas' / filename).write_bytes(data)
            variants.append({'url': '/imagens/responsivas/' + filename, 'width': width})
            previous = root / 'responsivas' / f'{name}-{width}.webp'
            print(f'{name} {width}: {previous.stat().st_size} -> {len(data)} bytes')
    manifest[src]['variants'] = variants
manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

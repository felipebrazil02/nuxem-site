# Ferramenta opcional de manutenção: Python + Pillow. O build usa as variantes já versionadas.
from PIL import Image
from pathlib import Path
import json
root=Path(__file__).parent/'imagens'
dest=root/'responsivas'
dest.mkdir(exist_ok=True)
manifest={}
for path in root.rglob('*'):
    if not path.is_file() or 'responsivas' in path.parts or path.suffix not in ('.png','.webp','.jpg','.jpeg'): continue
    with Image.open(path) as im:
        data={'width':im.width,'height':im.height,'variants':[]}
        if path.parent==root and path.stem!='icone-nuxem':
            widths=[160,253] if path.stem=='logo-chama' else [160,480,800]
            for width in widths:
                if width>im.width: continue
                output=dest/f'{path.stem}-{width}.webp'
                size=(width,round(im.height*width/im.width))
                im.resize(size,Image.Resampling.LANCZOS).save(output,'WEBP',quality=80,method=6)
                data['variants'].append({'url':'/imagens/responsivas/'+output.name,'width':width})
        manifest['/imagens/'+path.relative_to(root).as_posix()]=data
(root/'manifesto.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(f'{len(manifest)} imagens catalogadas; {len(list(dest.glob("*.webp")))} variantes; {sum(p.stat().st_size for p in dest.glob("*.webp"))} bytes')

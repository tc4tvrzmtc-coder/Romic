"""Prepare alpha masks only. RGB product pixels are never generated or modified.
Install requirements-image-masks.txt in a venv, then run from the repo root.
Review generated masks before running npm run review:images.
"""
import hashlib,json,re
from pathlib import Path
import numpy as np
from PIL import Image,ImageOps
from rembg import remove,new_session

root=Path.cwd();site=root/'site'
policy=json.loads((root/'image-policy.json').read_text())
products=re.findall(r"image:'([^']+)'",(site/'data.js').read_text())
sources=['assets/products/'+name for name in products]
for model in policy['customModels']:
 for color in policy['colorBackgrounds']:
  sources.append(f"assets/custom/{model}/{color}{'-front' if model=='clutch' else ''}.webp")
manifest_path=root/'image-masks.json'
manifest=json.loads(manifest_path.read_text()) if manifest_path.exists() else {}
sessions={}
for i,source in enumerate(sources):
 file=site/source;digest=hashlib.sha256(file.read_bytes()).hexdigest()
 mask_path='image-masks/'+str(Path(source).relative_to('assets').with_suffix('.png'))
 if manifest.get(source,{}).get('sourceSha256')==digest and (root/mask_path).exists():
  print(f'{i+1}/{len(sources)} current {source}',flush=True);continue
 im=ImageOps.exif_transpose(Image.open(file)).convert('RGB')
 model=policy.get('maskModels',{}).get(source,'u2net')
 if model not in sessions:sessions[model]=new_session(model,providers=['CPUExecutionProvider'])
 mask=remove(im,session=sessions[model],only_mask=True)
 a=np.array(mask);a[a>=240]=255;a[a<=15]=0
 mask=Image.fromarray(a)
 bounds=mask.point(lambda v:255 if v>15 else 0).getbbox()
 if not bounds:raise ValueError('Empty mask '+source)
 # Pixel-preservation check before any resize/compression.
 cutout=im.convert('RGBA');cutout.putalpha(mask)
 assert np.array_equal(np.array(cutout)[:,:,:3],np.array(im)),source
 destination=root/mask_path;destination.parent.mkdir(parents=True,exist_ok=True);mask.save(destination,optimize=True)
 manifest[source]={'mask':mask_path,'sourceSha256':digest,'bbox':list(bounds),'model':model,'toolVersion':'rembg-2.0.85'}
 manifest_path.write_text(json.dumps(manifest,indent=2)+'\n')
 print(f'{i+1}/{len(sources)} prepared {source}',flush=True)
print('Masks prepared. Inspect edges, straps, holes and badge before approval.',flush=True)

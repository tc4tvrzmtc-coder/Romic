import sharp from 'sharp';

// This layer is drawn behind the original RGBA product, never on its RGB pixels.
export async function contactShadow(image, {left, top, width = 1200, height = 1500}) {
  const {data, info} = await sharp(image).ensureAlpha().raw().toBuffer({resolveWithObject:true});
  let bottom = -1;
  for (let y = info.height - 1; y >= 0 && bottom < 0; y--) {
    let solid = 0;
    for (let x = 0; x < info.width; x++) if (data[(y * info.width + x) * 4 + 3] >= 192) solid++;
    if (solid >= Math.max(4, info.width * .02)) bottom = y;
  }
  if (bottom < 0) throw new Error('No solid product base for contact shadow');
  let minX = info.width, maxX = -1;
  const band = Math.max(3, Math.round(info.height * .018));
  for (let y = Math.max(0, bottom - band); y <= bottom; y++) {
    for (let x = 0; x < info.width; x++) if (data[(y * info.width + x) * 4 + 3] >= 192) {
      minX = Math.min(minX, x); maxX = Math.max(maxX, x);
    }
  }
  const center = left + (minX + maxX) / 2;
  const base = top + bottom + .5;
  const span = maxX - minX + 1;
  // One fixed lighting setup and camera canvas for every catalogue/custom product.
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <defs>
      <filter id="soft" x="-30%" y="-300%" width="160%" height="700%"><feGaussianBlur stdDeviation="16 9"/></filter>
      <filter id="contact" x="-20%" y="-200%" width="140%" height="500%"><feGaussianBlur stdDeviation="5 2"/></filter>
    </defs>
    <ellipse cx="${center + 14}" cy="${base + 5}" rx="${span * .51}" ry="13" fill="#211a16" opacity=".17" filter="url(#soft)"/>
    <ellipse cx="${center}" cy="${base - 2}" rx="${span * .47}" ry="6" fill="#211a16" opacity=".36" filter="url(#contact)"/>
  </svg>`;
  return {input:Buffer.from(svg), left:0, top:0};
}

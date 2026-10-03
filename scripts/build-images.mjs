import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';
import sharp from 'sharp';

const root = process.cwd();
const site = path.join(root, 'site');
const output = path.join(root, '_site');
const policy = JSON.parse(await fs.readFile(path.join(root, 'image-policy.json'), 'utf8'));
const code = await fs.readFile(path.join(site, 'data.js'), 'utf8');
const products = vm.runInNewContext(`${code}\nROMIC_PRODUCTS;`, {});
const reviewsPath = path.join(root, 'image-reviews.json');
let reviews = JSON.parse(await fs.readFile(reviewsPath, 'utf8').catch(() => '{}'));
const reviewMode = process.argv.includes('--review');
const checkOnly = process.argv.includes('--check');
const safeName = name => {
  if (!/^[a-z0-9][a-z0-9-]*\.(webp|png|jpe?g)$/i.test(name)) throw new Error(`Invalid image filename: ${name}`);
  return name;
};
const webpName = name => safeName(name).replace(/\.[^.]+$/, '.webp');
const sources = new Map();
const add = (source, target, background) => {
  if (sources.has(target) && sources.get(target).source !== source) throw new Error(`Duplicate output ${target}`);
  sources.set(target, { source, target, background });
};
for (const product of products) {
  if (!product.image || !product.gallery?.includes(product.image)) throw new Error(`Missing primary/gallery image for ${product.id}`);
  const background = policy.productBackgrounds[product.id];
  if (!background) throw new Error(`Review and configure a background for new product ${product.id}`);
  for (const name of new Set([product.image, ...product.gallery])) {
    add(`assets/products/${safeName(name)}`, `assets/products/${webpName(name)}`, background);
  }
}
for (const model of policy.customModels) {
  for (const [color, background] of Object.entries(policy.colorBackgrounds)) {
    const name = `${color}${model === 'clutch' ? '-front' : ''}.webp`;
    add(`assets/custom/${model}/${name}`, `assets/custom/${model}/${name}`, background);
  }
}
const prepared = [];
for (const entry of sources.values()) {
  const file = path.join(site, entry.source);
  const bytes = await fs.readFile(file).catch(() => { throw new Error(`Missing image ${entry.source}`); });
  const hash = crypto.createHash('sha256').update(bytes).digest('hex');
  const meta = await sharp(bytes).metadata();
  if (!meta.width || !meta.height || meta.pages > 1) throw new Error(`Invalid/still-image required: ${entry.source}`);
  if (reviewMode) reviews[entry.source] = hash;
  else if (reviews[entry.source] !== hash) throw new Error(`Visual review required: ${entry.source}. Review full bag, logo, background and scale, then run npm run review:images.`);
  prepared.push({ ...entry, bytes, meta });
}
if (reviewMode) {
  await fs.writeFile(reviewsPath, JSON.stringify(reviews, null, 2) + '\n');
  console.log(`Recorded visual review for ${prepared.length} images. Run npm run build to preview.`);
  process.exit(0);
}
const validate = async (file, width, height) => {
  const m = await sharp(file).metadata();
  if (m.format !== 'webp' || m.width !== width || m.height !== height) throw new Error(`Nonstandard image: ${file}`);
};
if (checkOnly) {
  for (const entry of prepared) {
    await validate(path.join(output, entry.target), 1200, 1500);
    if (entry.target.startsWith('assets/products/')) {
      const name = path.basename(entry.target);
      for (const [folder, width] of Object.entries(policy.derivatives)) await validate(path.join(output, 'assets', folder, name), width, width * 5 / 4);
    }
  }
  console.log(`PASS: ${prepared.length} reviewed masters and all responsive derivatives are WebP at 4:5.`);
  process.exit(0);
}
await fs.rm(output, { recursive: true, force: true });
await fs.cp(site, output, { recursive: true });
// Original source files remain in the repository; only canonical versions are published.
for (const dir of ['products', 'custom', 'cards', 'conveyor', 'gallery-thumbs']) await fs.rm(path.join(output, 'assets', dir), { recursive: true, force: true });
for (const entry of prepared) {
  const file = path.join(output, entry.target);
  await fs.mkdir(path.dirname(file), { recursive: true });
  const innerWidth = Math.round(1200 * (1 - policy.margin * 2));
  const innerHeight = Math.round(1500 * (1 - policy.margin * 2));
  let original = sharp(entry.bytes).rotate();
  // Reviewed front-view clutch files contain excess empty space above the bag.
  if (entry.source.startsWith('assets/custom/clutch/')) original = original.extract({ left: 0, top: Math.round(entry.meta.height * .18), width: entry.meta.width, height: Math.round(entry.meta.height * .74) });
  const image = await original.resize(innerWidth, innerHeight, { fit: 'inside' }).png().toBuffer({ resolveWithObject: true });
  const left = Math.floor((1200 - image.info.width) / 2);
  const top = Math.floor((1500 - image.info.height) / 2);
  // Use a consistent neutral outer canvas; never stretch photographed edge pixels.
  await sharp(image.data).extend({ left, right: 1200 - image.info.width - left, top, bottom: 1500 - image.info.height - top, background: '#f4f0ec' })
    .webp({ quality: 88, effort: 4 }).toFile(file);
  await validate(file, 1200, 1500);
  if (entry.target.startsWith('assets/products/')) {
    for (const [folder, width] of Object.entries(policy.derivatives)) {
      const derivative = path.join(output, 'assets', folder, path.basename(entry.target));
      await fs.mkdir(path.dirname(derivative), { recursive: true });
      await sharp(file).resize(width, width * 5 / 4).webp({ quality: 84, effort: 4 }).toFile(derivative);
      await validate(derivative, width, width * 5 / 4);
    }
  }
}
// Keep runtime image names aligned with JPEG/PNG uploads converted into WebP.
let compiledData = code;
for (const p of products) for (const name of new Set([p.image, ...p.gallery])) compiledData = compiledData.replaceAll(`'${name}'`, `'${webpName(name)}'`);
await fs.writeFile(path.join(output, 'data.js'), compiledData);
await fs.writeFile(path.join(output, 'image-build-report.json'), JSON.stringify({ format: 'webp', width: 1200, height: 1500, reviewedImages: prepared.length, originals: prepared.map(e => ({ source: e.source, width: e.meta.width, height: e.meta.height, lowResolution: e.meta.width < 800 })) }, null, 2));
console.log(`Built ${prepared.length} masters and responsive variants. Originals preserved. Small sources retain their original level of detail.`);

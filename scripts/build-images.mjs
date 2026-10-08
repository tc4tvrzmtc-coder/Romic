import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';
import sharp from 'sharp';
import {attachOriginalAlpha} from './image-mask.mjs';
import {contactShadow} from './image-shadow.mjs';

const root = process.cwd();
const site = path.join(root, 'site');
const output = path.join(root, '_site');
const policy = JSON.parse(await fs.readFile(path.join(root, 'image-policy.json'), 'utf8'));
const masks = JSON.parse(await fs.readFile(path.join(root, 'image-masks.json'), 'utf8'));
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
const add = (source, target, background, needsMask = false) => {
  if (sources.has(target) && sources.get(target).source !== source) throw new Error(`Duplicate output ${target}`);
  sources.set(target, { source, target, background, needsMask });
};
for (const product of products) {
  if (!product.image || !product.gallery?.includes(product.image)) throw new Error(`Missing primary/gallery image for ${product.id}`);
  const background = policy.productBackgrounds[product.id];
  if (!background) throw new Error(`Review and configure a background for new product ${product.id}`);
  for (const name of new Set([product.image, ...product.gallery])) {
    add(`assets/products/${safeName(name)}`, `assets/products/${webpName(name)}`, background, name === product.image && !policy.preserveSceneProducts?.includes(product.id));
  }
}
for (const model of policy.customModels) {
  for (const [color, background] of Object.entries(policy.colorBackgrounds)) {
    const name = `${color}${model === 'clutch' ? '-front' : ''}.webp`;
    add(`assets/custom/${model}/${name}`, `assets/custom/${model}/${name}`, background, true);
  }
}
const prepared = [];
for (const entry of sources.values()) {
  const file = path.join(site, entry.source);
  const bytes = await fs.readFile(file).catch(() => { throw new Error(`Missing image ${entry.source}`); });
  const hash = crypto.createHash('sha256').update(bytes).digest('hex');
  const sourceMeta = await sharp(bytes).metadata();
  const meta = {...sourceMeta,width:sourceMeta.autoOrient?.width || sourceMeta.width,height:sourceMeta.autoOrient?.height || sourceMeta.height};
  if (!meta.width || !meta.height || meta.pages > 1) throw new Error(`Invalid/still-image required: ${entry.source}`);
  if (reviewMode) reviews[entry.source] = hash;
  else if (reviews[entry.source] !== hash) throw new Error(`Visual review required: ${entry.source}. Review full bag, logo, background and scale, then run npm run review:images.`);
  let maskBytes;
  let maskEntry;
  if (entry.needsMask) {
    maskEntry = masks[entry.source];
    if (!maskEntry || maskEntry.sourceSha256 !== hash) throw new Error(`Prepare a current background mask for ${entry.source}`);
    if (!/^image-masks\/[a-z0-9/.-]+\.png$/i.test(maskEntry.mask) || maskEntry.mask.includes('..')) throw new Error('Invalid mask path');
    maskBytes = await fs.readFile(path.join(root, maskEntry.mask)).catch(() => { throw new Error(`Missing mask ${maskEntry.mask}`); });
    const maskMeta = await sharp(maskBytes).metadata();
    if (maskMeta.width !== meta.width || maskMeta.height !== meta.height || maskMeta.format !== 'png') throw new Error(`Mask size mismatch: ${entry.source}`);
    const maskStats = await sharp(maskBytes).stats();
    if (maskStats.channels[0].min !== 0 || maskStats.channels[0].max !== 255) throw new Error(`Mask must contain foreground and removed background: ${entry.source}`);
    const metadataKey = maskEntry.mask + '#metadata';
    const metadataHash = crypto.createHash('sha256').update(JSON.stringify(maskEntry)).digest('hex');
    if (reviewMode) reviews[metadataKey] = metadataHash;
    else if (reviews[metadataKey] !== metadataHash) throw new Error(`Visual review required for mask bounds ${entry.source}`);
    const maskHash = crypto.createHash('sha256').update(maskBytes).digest('hex');
    if (reviewMode) reviews[maskEntry.mask] = maskHash;
    else if (reviews[maskEntry.mask] !== maskHash) throw new Error(`Visual review required for mask ${maskEntry.mask}`);
    const [x1,y1,x2,y2] = maskEntry.bbox;
    if (![x1,y1,x2,y2].every(Number.isInteger) || x1 < 0 || y1 < 0 || x2 > meta.width || y2 > meta.height || x2 <= x1 || y2 <= y1) throw new Error('Invalid mask bounds');
  }
  prepared.push({ ...entry, bytes, meta, maskBytes, maskEntry });
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
    const width = entry.needsMask ? 1200 : Math.min(1200, entry.meta.width, Math.floor(1500 * entry.meta.width / entry.meta.height));
    const height = entry.needsMask ? 1500 : Math.round(width * entry.meta.height / entry.meta.width);
    await validate(path.join(output, entry.target), width, height);
    if (entry.target.startsWith('assets/products/')) {
      const name = path.basename(entry.target);
      for (const [folder, width] of Object.entries(policy.derivatives)) await validate(path.join(output, 'assets', folder, name), width, width * 5 / 4);
    }
  }
  for (const product of products) for (const [folder, width] of Object.entries(policy.derivatives)) {
    if (folder.startsWith('conveyor/')) await validate(path.join(output, 'assets', folder, `${product.id}.webp`), width, width * 5 / 4);
  }
  console.log(`PASS: ${prepared.length} reviewed masters preserve full scenes; catalog derivatives are WebP at 4:5.`);
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
  if (entry.maskBytes) {
    // Attach only alpha to decoded original RGB. Never generate or repaint product pixels.
    const rgba = await attachOriginalAlpha(entry.bytes,entry.maskBytes);
    const [x1,y1,x2,y2] = entry.maskEntry.bbox;
    original = sharp(rgba).extract({left:x1,top:y1,width:x2-x1,height:y2-y1});
  }
  if (!entry.maskBytes) {
    // Full photographs retain their native aspect ratio: no crop, generated detail or pale frame.
    const width = Math.min(1200, entry.meta.width, Math.floor(1500 * entry.meta.width / entry.meta.height));
    const height = Math.round(width * entry.meta.height / entry.meta.width);
    await original.resize(width, height).webp({quality:90, effort:4}).toFile(file);
    await validate(file, width, height);
  } else {
  const image = await original.resize(innerWidth, innerHeight, { fit: 'inside' }).png().toBuffer({ resolveWithObject: true });
  const left = Math.floor((1200 - image.info.width) / 2);
  const top = Math.floor((1500 - image.info.height) / 2);
  // Preserve original product RGB and scale; place a separate contact shadow behind it.
  const layers = entry.maskBytes ? [await contactShadow(image.data, {left, top})] : [];
  layers.push({input:image.data, left, top});
  await sharp({create:{width:1200,height:1500,channels:3,background:entry.maskBytes ? entry.background : '#f4f0ec'}}).composite(layers)
    .webp({ quality: 88, effort: 4 }).toFile(file);
  await validate(file, 1200, 1500);
  }
  if (entry.target.startsWith('assets/products/')) {
    for (const [folder, width] of Object.entries(policy.derivatives)) {
      const derivative = path.join(output, 'assets', folder, path.basename(entry.target));
      await fs.mkdir(path.dirname(derivative), { recursive: true });
      await sharp(file).resize(width, width * 5 / 4, {fit:'contain',background:entry.background}).webp({ quality: 84, effort: 4 }).toFile(derivative);
      await validate(derivative, width, width * 5 / 4);
    }
  }
}
// Conveyor paths use product IDs, which can differ from the source filename.
for (const product of products) for (const [folder, width] of Object.entries(policy.derivatives)) {
  if (!folder.startsWith('conveyor/')) continue;
  const derivative = path.join(output, 'assets', folder, `${product.id}.webp`);
  await fs.mkdir(path.dirname(derivative), { recursive: true });
  await sharp(path.join(output, 'assets/products', webpName(product.image))).resize(width, width * 5 / 4, {fit:'contain',background:policy.productBackgrounds[product.id]}).webp({ quality: 84, effort: 4 }).toFile(derivative);
  await validate(derivative, width, width * 5 / 4);
}
// Version all image requests so returning browsers load the current assets.
const versionHash = crypto.createHash('sha256').update(JSON.stringify(reviews)).update(JSON.stringify(policy));
// Rendering changes must invalidate image caches even when source photos are unchanged.
for (const name of ['build-images.mjs', 'image-mask.mjs', 'image-shadow.mjs']) versionHash.update(await fs.readFile(new URL(name, import.meta.url)));
for (const name of ['app.js', 'styles.css', 'documents.js', 'data.js']) {
  versionHash.update(await fs.readFile(path.join(site, name)).catch(error => {
    if (error.code !== 'ENOENT') throw error;
    return '';
  }));
}
const assetVersion = 'romic-' + versionHash.digest('hex').slice(0,12);
const imageSizes = {};
for (const entry of prepared) {
  const meta = await sharp(path.join(output, entry.target)).metadata();
  imageSizes[path.basename(entry.target)] = [meta.width, meta.height];
}
let compiledData = code + '\nconst ROMIC_IMAGE_SIZES = ' + JSON.stringify(imageSizes) + ';\n';
for (const p of products) for (const name of new Set([p.image, ...p.gallery])) compiledData = compiledData.replaceAll(`'${name}'`, `'${webpName(name)}?v=${assetVersion}'`);
await fs.writeFile(path.join(output, 'data.js'), compiledData);
const appFile = path.join(output,'app.js');
try {
  const appCode = await fs.readFile(appFile,'utf8');
  await fs.writeFile(appFile,appCode.replaceAll('.webp',`.webp?v=${assetVersion}`));
} catch (error) { if (error.code !== 'ENOENT') throw error; }
const versionHtml = async dir => {
  for (const file of await fs.readdir(dir,{withFileTypes:true})) {
    const full = path.join(dir,file.name);
    if (file.isDirectory()) await versionHtml(full);
    else if (file.name.endsWith('.html')) {
      const html = await fs.readFile(full,'utf8');
      await fs.writeFile(full,html.replace(/((?:app|data|documents)\.js|styles\.css)(?:\?v=[^"'\s<>]*)?/g,`$1?v=${assetVersion}`));
    }
  }
};
await versionHtml(output);
await fs.writeFile(path.join(output, 'image-build-report.json'), JSON.stringify({ format: 'webp', width: 1200, height: 1500, reviewedImages: prepared.length, backgroundNormalizedImages: prepared.filter(e => e.needsMask).length, originals: prepared.map(e => ({ source: e.source, width: e.meta.width, height: e.meta.height, lowResolution: e.meta.width < 800 })) }, null, 2));
console.log(`Built ${prepared.length} masters and responsive variants. Originals preserved. Small sources retain their original level of detail.`);

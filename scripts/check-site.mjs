import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import sharp from 'sharp';
import {validateCatalog} from './catalog-integrity.mjs';

const root = path.resolve('_site');
const walk = dir => fs.readdirSync(dir,{withFileTypes:true}).flatMap(item => item.isDirectory() ? walk(path.join(dir,item.name)) : [path.join(dir,item.name)]);
const pages = walk(root).filter(file => file.endsWith('.html'));
const products = vm.runInNewContext(fs.readFileSync('site/data.js','utf8')+';ROMIC_PRODUCTS');
validateCatalog(products);
const compiledProducts = vm.runInNewContext(fs.readFileSync(path.join(root,'data.js'),'utf8')+';ROMIC_PRODUCTS');
assert.deepEqual(Array.from(compiledProducts,p=>p.id),Array.from(products,p=>p.id),'Published catalogue lost a model or changed its order');
for (const product of compiledProducts) for (const image of new Set([product.image,...product.gallery])) {
  const file = image.split('?')[0];
  assert.ok(file.endsWith('.webp'),`${product.id}: unconverted catalogue image ${image}`);
  for (const folder of ['products','cards/600']) assert.ok(fs.existsSync(path.join(root,'assets',folder,file)),`${product.id}: missing published ${folder}/${file}`);
}
for (const file of pages) {
  const html = fs.readFileSync(file,'utf8');
  const relative = path.relative(root,file);
  assert.match(html, /<!doctype html>/i, `${relative}: missing doctype`);
  assert.match(html, /<html[^>]*lang="(?:he|en)"/i, `${relative}: missing language`);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(x => x[1]);
  assert.equal(new Set(ids).size,ids.length,`${relative}: duplicate HTML IDs`);
  for (const match of html.matchAll(/<(?:a|link|script|img)\b[^>]*\b(?:href|src)="([^"]+)"/g)) {
    const url = new URL(match[1].replaceAll('&amp;','&'),`https://romic.co.il/${relative}`);
    if (url.origin !== 'https://romic.co.il') continue;
    let target = path.join(root,decodeURIComponent(url.pathname));
    if (url.pathname.endsWith('/')) target = path.join(target,'index.html');
    assert.ok(fs.existsSync(target),`${relative}: missing resource ${url.pathname}`);
  }
}
for (const language of ['he','en']) for (const product of products) {
  const relative = `${language}/product-${product.id}.html`;
  const html = fs.readFileSync(path.join(root,relative),'utf8');
  assert.equal((html.match(/rel="canonical"/g)||[]).length,1,`${relative}: canonical count`);
  assert.ok(html.includes(`href="https://romic.co.il/${relative}"`),`${relative}: incorrect canonical`);
  assert.match(html, /<h1\b[^>]*>[^<]+<\/h1>/, `${relative}: missing initial product heading`);
  assert.match(html, /class="product-description">[^<]+<\/p>/, `${relative}: missing initial description`);
  assert.ok(!/name="robots"[^>]*content="[^"]*noindex/i.test(html),`${relative}: noindex`);
  const title = language === 'he' && product.seoTitleHe ? product.seoTitleHe : `${product.name} | ROMIC`;
  assert.ok(html.includes(`<title>${title}</title>`),`${relative}: title mismatch`);
}
for (const name of ['bags-in-sun','launch-black-model','launch-miami-model']) {
  const source = await sharp(`site/assets/promo/${name}.webp`).metadata();
  for (const width of [320,640]) {
    const file = path.join(root,'assets/promo/responsive',String(width),`${name}.webp`);
    const image = await sharp(file).metadata();
    assert.equal(image.width,Math.min(width,source.width),`${name}: unexpected responsive width`);
    assert.ok(Math.abs(image.height/image.width-source.height/source.width)<0.01,`${name}: responsive image distorted`);
  }
}
const app = fs.readFileSync(path.join(root,'app.js'),'utf8');
assert.ok(!app.includes('href="product.html?id='),'Legacy product links reintroduced');
assert.ok(!app.includes('navigator.share('),'Direct business chat replaced by a share sheet');
assert.ok(!app.includes('primeShareFiles('),'Unused image prefetch reintroduced');
assert.ok(app.includes('tel:+972553160780'),'Business phone link missing');
const sitemap = fs.readFileSync(path.join(root,'sitemap.xml'),'utf8');
assert.equal((sitemap.match(/<loc>/g)||[]).length,products.length*2+3,'Sitemap product coverage changed');
console.log(`PASS: ${pages.length} HTML pages; ${products.length*2} product pages; internal resources, canonicals, titles and direct chat.`);

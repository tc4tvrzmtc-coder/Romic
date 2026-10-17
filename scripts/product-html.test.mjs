import {test} from 'node:test';
import assert from 'node:assert/strict';
import {productHtml} from './product-html.mjs';
import fs from 'node:fs';
import vm from 'node:vm';

test('initial product HTML contains existing product details and escapes source text', () => {
  const product = {name:'A < B',price:390,size:'L',width:25,height:12,he:'תיאור <script>alert(1)</script>',en:'Blue clutch'};
  const html = productHtml(product,'he','../bag.webp',[1200,1492]);
  assert.match(html, /<h1[^>]*>A &lt; B<\/h1>/);
  assert.match(html, /₪390/);
  assert.match(html, /25 × 12 cm/);
  assert.match(html, /width="1200" height="1492"/);
  assert.ok(!html.includes('<script>'));
  assert.match(productHtml(product,'en','../bag.webp'), /Blue clutch/);
});

test('legacy and named product URLs share one canonical and one language route', () => {
  const source = fs.readFileSync(new URL('../site/app.js',import.meta.url),'utf8');
  const start = source.indexOf('function updateAlternateLinks(');
  const end = source.indexOf('\nfunction setMetaDescription(',start);
  for (const location of [
    {pathname:'/he/product.html',search:'?id=malibu',origin:'https://romic.co.il'},
    {pathname:'/he/product-malibu.html',search:'',origin:'https://romic.co.il'}
  ]) {
    const links = new Map();
    const document = {body:{dataset:{page:'product'}},querySelector:()=>null,createElement:()=>({}),head:{append:link=>links.set(link.hreflang,link)}};
    vm.runInNewContext(source.slice(start,end)+';updateAlternateLinks();',{document,location,siteBasePath:'',URLSearchParams});
    assert.equal(links.get('he').href,'https://romic.co.il/he/product-malibu.html');
    assert.equal(links.get('en').href,'https://romic.co.il/en/product-malibu.html');
  }
  assert.ok(!source.includes('href="product.html?id='));
  assert.match(source, /const productCanonical = `\$\{location.origin\}\$\{siteBasePath\}\/\$\{language\}\/product-/);
});

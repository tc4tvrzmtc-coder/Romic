import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
function app(lang='he') {
 let now=Date.parse('2026-11-18T12:00:00+02:00');const storage=new Map();
 const c=vm.createContext({Date:class extends Date{static now(){return now;}},document:{documentElement:{lang},addEventListener(){},querySelector(){return null;},querySelectorAll(){return[];}},window:{addEventListener(){}},location:{hostname:'romic.co.il'},sessionStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v)},localStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v)}});
 vm.runInContext(fs.readFileSync('site/data.js','utf8')+';'+fs.readFileSync('site/app.js','utf8'),c);
 return {run:s=>vm.runInContext(s,c),at:s=>now=Date.parse(s)};
}
test('BLACK20 and automatic sitewide offer agree without stacking in both languages',()=>{
 for(const lang of ['he','en']){const a=app(lang);assert.equal(a.run('activeCoupon().percent'),20);assert.equal(a.run('currentPrice({price:350})'),280);assert.equal(a.run('currentPrice({price:400},true)'),320);a.run("couponMemory=' black20 '");assert.equal(a.run('currentPrice({price:350})'),280);assert.equal(a.run('activeCoupon().automatic'),undefined);a.run("couponMemory='ROMICGIRLS30'");assert.equal(a.run('currentPrice({price:350})'),245);}
});
test('BLACK20 starts and expires at Israel midnight',()=>{const a=app();a.at('2026-11-17T23:59:59.999+02:00');assert.equal(a.run('blackIsActive()'),false);a.at('2026-11-18T00:00:00+02:00');assert.equal(a.run('blackIsActive()'),true);a.at('2026-11-30T23:59:59.999+02:00');assert.equal(a.run('couponByCode("BLACK20").percent'),20);a.at('2026-12-01T00:00:00+02:00');assert.equal(a.run('activeCoupon()'),null);assert.equal(a.run('couponByCode("BLACK20")'),null);assert.equal(a.run('currentPrice({price:350})'),350);});
test('delivery threshold uses the amount after discount and WhatsApp agrees',()=>{for(const lang of ['he','en']){const a=app(lang);for(const [price,shipping,total] of [[350,30,310],[625,30,530],[626,0,500.8],[700,0,560]]){const calc=a.run(`calculateCart([{price:${price}}],activeCoupon(),'delivery')`);assert.equal(calc.shipping,shipping);assert.equal(calc.total,total);assert.ok(a.run(`makeWhatsappMessage([{name:'CLOUD NINE',size:'M',price:${price}}],activeCoupon(),'delivery')`).endsWith(a.run(`formatPrice(${total})`)));}assert.equal(a.run("calculateCart([{price:350}],activeCoupon(),'pickup').total"),280);}});
test('one catalog model provides five independent cart colors and correct source photos',()=>{const a=app();assert.equal(a.run("ROMIC_PRODUCTS.filter(p=>p.id==='cloud-nine').length"),1);assert.equal(a.run('ROMIC_PRODUCTS[0].variants.length'),5);a.run("localStorage.setItem(savedPicksKey,JSON.stringify(['cloud-nine:black','cloud-nine:pink','rio','cloud-nine:invalid']))");assert.equal(a.run('getSavedPicks().length'),3);for(const color of ['black','white','beige','sage','pink']){const p=a.run(`resolveBag('cloud-nine:${color}')`);assert.match(p.image,new RegExp(color));assert.equal(p.depth,8);assert.equal(p.price,350);assert.equal(a.run(`bagProductUrl(resolveBag('cloud-nine:${color}'))`),`product-cloud-nine.html?color=${color}`);for(const f of a.run(`ROMIC_PRODUCTS[0].variants.find(v=>v.id==='${color}').gallery`))assert.ok(fs.existsSync('site/assets/products/'+f));}});
test('collection expands variants into selectable routes while retaining each catalog model',()=>{
 for(const lang of ['he','en']){
  const a=app(lang);
  const cards=a.run('collectionProducts({expanded:true})');
  const cloud=cards.filter(p=>p.baseId==='cloud-nine');
  assert.equal(cloud.length,5);assert.equal(new Set(cloud.map(p=>p.id)).size,5);
  assert.equal(new Set(cards.map(p=>p.baseId||p.id)).size,a.run('ROMIC_PRODUCTS.length'));
  for(const p of cloud)assert.equal(a.run(`bagProductUrl(resolveBag('${p.id}'))`),`product-cloud-nine.html?color=${p.color.id}`);
  const prices=Array.from(a.run("collectionProducts({expanded:true,sort:'price-asc'}).map(p=>p.price)"));
  assert.deepEqual(prices,[...prices].sort((a,b)=>a-b));
  assert.equal(a.run("collectionProducts({expanded:true,query:'CLOUD NINE'}).length"),5);
 }
});

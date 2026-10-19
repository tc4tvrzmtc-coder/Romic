import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {validateCatalog} from './catalog-integrity.mjs';

const data=fs.readFileSync(new URL('../site/data.js',import.meta.url),'utf8');
const app=fs.readFileSync(new URL('../site/app.js',import.meta.url),'utf8');
function runtime(lang='he') {
  const c={document:{documentElement:{lang},body:{dataset:{page:'product'}},addEventListener(){}},window:{addEventListener(){}},location:{hostname:'romic.co.il',search:'',pathname:`/${lang}/`},URL,URLSearchParams};
  vm.createContext(c);vm.runInContext(data+';'+app,c);return c;
}
function checkEveryProduct(c) {
  const products=vm.runInContext('catalogProducts()',c);
  validateCatalog(products);
  const ids=Array.from(products,p=>p.id).sort();
  assert.deepEqual(Array.from(vm.runInContext('collectionProducts({expanded:true}).map(p=>p.id)',c)).sort(),ids);
  for (const p of products) {
    for (const query of [p.name,...p.searchTerms]) assert.ok(vm.runInContext(`searchProducts(${JSON.stringify(query)}).some(p=>p.id===${JSON.stringify(p.id)})`,c),`${p.id}: not searchable with ${query}`);
    for (const type of p.types) {
      const answers={type,size:p.size==='XL'?'L':p.size,detail:p.detail};
      assert.ok(vm.runInContext(`finderProducts(${JSON.stringify(answers)}).some(p=>p.id===${JSON.stringify(p.id)})`,c),`${p.id}: unreachable in finder`);
    }
  }
}
test('every catalogue product is reachable through collection, bilingual search and finder',()=>{
  for(const lang of ['he','en'])checkEveryProduct(runtime(lang));
});
test('a newly added model needs no separate search, collection or finder list entry',()=>{
  const c=runtime();
  vm.runInContext(`ROMIC_PRODUCTS.push({...ROMIC_PRODUCTS[0],id:'new-model',name:'New Model',searchTerms:['דגם חדש'],homeFeatured:false});`,c);
  checkEveryProduct(c);
});
test('finder retains all six matching medium clutches, including Bali, Sahara and Mykonos',()=>{
  const ids=Array.from(vm.runInContext("finderProducts({type:'clutch',size:'M'}).map(p=>p.id)",runtime()));
  assert.equal(ids.length,6);
  for(const id of ['bali','sahara','mykonos'])assert.ok(ids.includes(id));
});
test('catalogue gate gives actionable failures for incomplete and duplicate models',()=>{
  const products=vm.runInContext('catalogProducts()',runtime());
  const missing=structuredClone(products);delete missing[0].types;
  assert.throws(()=>validateCatalog(missing),/missing or invalid finder types/);
  const aliases=structuredClone(products);delete aliases[0].searchTerms;
  assert.throws(()=>validateCatalog(aliases),/missing Hebrew search alias/);
  assert.throws(()=>validateCatalog([...products,products[0]]),/duplicate product id/);
});

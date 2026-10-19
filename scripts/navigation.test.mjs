import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('../site/app.js',import.meta.url),'utf8');
test('delayed launch offer cannot interrupt an active search or another dialog',()=>{
  const a=source.indexOf('function showLaunchOfferOnce('),b=source.indexOf('\nfunction currentPrice(',a);
  let creations=0;
  const c={promoIsActive:()=>true,document:{querySelector:selector=>selector==='dialog[open]'?{}:null,createElement(){creations++;throw new Error('Offer interrupted a dialog');}}};
  vm.runInNewContext(source.slice(a,b)+';showLaunchOfferOnce();',c);
  assert.equal(creations,0);
});
test('search matches Hebrew aliases and multiword product details without altering catalogue state', () => {
  const data=fs.readFileSync(new URL('../site/data.js',import.meta.url),'utf8');
  const context={document:{documentElement:{lang:'he'},body:{dataset:{page:'product'}},addEventListener(){}},window:{addEventListener(){}},location:{hostname:'romic.co.il',search:'',pathname:'/he/product-malibu.html'},URL,URLSearchParams,console};
  vm.createContext(context);vm.runInContext(data+';'+source,context);
  const ids=query=>Array.from(vm.runInContext(`searchProducts(${JSON.stringify(query)}).map(p=>p.id)`,context));
  assert.deepEqual(ids('מליבו'),['malibu']);
  assert.deepEqual(ids('MALIBU'),['malibu']);
  assert.deepEqual(ids(''),[]);
  assert.deepEqual(ids('no-such-bag'),[]);
  assert.deepEqual(ids('קלאץ תכלת'),['malibu']);
});
test('global search and business telephone render in both languages without browser globals failing', () => {
  for (const lang of ['he','en']) {
    const context = {
      document:{documentElement:{lang},body:{dataset:{page:'product'}},addEventListener(){}},
      window:{addEventListener(){}},location:{hostname:'romic.co.il',search:'',pathname:`/${lang}/product-malibu.html`},
      URL,URLSearchParams,console
    };
    vm.createContext(context);
    vm.runInContext(source,context);
    const header = vm.runInContext('header()',context);
    assert.match(header,/<button class="site-search"[^>]*aria-haspopup="dialog"/);
    assert.ok(header.includes(`aria-label="${lang==='he'?'חיפוש תיקים':'Search bags'}"`));
    assert.match(vm.runInContext('footer()',context),/href="tel:\+972553160780"/);
  }
});

test('menu contains keyboard focus, isolates background, and restores focus on dismissal', () => {
  const attrs = new Map([['aria-expanded','false']]);
  const toggle = {setAttribute:(k,v)=>attrs.set(k,v),getAttribute:k=>attrs.get(k),addEventListener(){},focus(){document.activeElement=toggle;}};
  const first = {focus(){document.activeElement=first;}},last={focus(){document.activeElement=last;}};
  const background = {inert:false};
  const menu = {setAttribute(){},removeAttribute(){},querySelector:()=>first,querySelectorAll:selector=>selector.startsWith('a[href]')?[first,last]:[],contains:el=>el===first||el===last};
  const backdrop = {hidden:true,addEventListener(){}};
  first.addEventListener=()=>{};
  const document={activeElement:null,body:{classList:{add(){},remove(){}}},querySelector:selector=>selector==='[data-menu-toggle]'?toggle:selector==='[data-mobile-menu]'?menu:backdrop,querySelectorAll:()=>[background],addEventListener(){},removeEventListener(){}};
  const context={document,copy:{menu:'Menu'},menuEscapeHandler:null,requestAnimationFrame:fn=>fn()};
  const a=source.indexOf('function initMenu()'),b=source.indexOf('\nfunction productCard(',a);
  // Capture the registered click handler, then exercise actual menu handlers.
  let toggleClick;
  toggle.addEventListener=(type,fn)=>{if(type==='click')toggleClick=fn;};
  vm.createContext(context);vm.runInContext(source.slice(a,b)+';initMenu();',context);
  toggleClick();assert.equal(background.inert,true);assert.equal(document.activeElement,first);
  document.activeElement=last;let prevented=false;
  context.menuEscapeHandler({key:'Tab',preventDefault(){prevented=true;}});
  assert.equal(prevented,true);assert.equal(document.activeElement,first);
  context.menuEscapeHandler({key:'Tab',shiftKey:true,preventDefault(){}});
  assert.equal(document.activeElement,last);
  context.menuEscapeHandler({key:'Escape',preventDefault(){}});
  assert.equal(background.inert,false);assert.equal(backdrop.hidden,true);assert.equal(document.activeElement,toggle);
});

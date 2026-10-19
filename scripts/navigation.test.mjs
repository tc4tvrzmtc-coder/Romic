import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('../site/app.js',import.meta.url),'utf8');
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
    assert.match(header,/href="\.\/\?search=1#collection"/);
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

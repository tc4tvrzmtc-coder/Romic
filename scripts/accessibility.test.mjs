import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const source=fs.readFileSync('site/app.js','utf8');
function bannerRuntime(he=true,reduced=false){
 const attrs={},values={},listeners={},timers=new Map();let serial=0,html='';
 const nodes=Object.fromEntries(['prev','next','pause','message'].map(key=>[key,{setAttribute(a,v){attrs[key+':'+a]=v;},set textContent(v){values[key]=v;},get textContent(){return values[key]},innerHTML:''}]));
 const banner={isConnected:true,remove(){},matches(){return false;},querySelector(s){return nodes[s.match(/data-banner-(\w+)/)[1]];}};
 const host={querySelector(){return banner;},insertAdjacentHTML(_,value){html=value;}};
 const motion={matches:reduced,addEventListener(type,fn){listeners[type]=fn;},removeEventListener(){}};
 const context={document:{querySelector(){return host;}},window:{clearInterval(id){timers.delete(id);},setInterval(fn){const id=++serial;timers.set(id,fn);return id;},matchMedia(){return motion;}},isHebrew:he,novemberIsActive:()=>true,blackIsActive:()=>true};
 const a=source.indexOf('let bannerPaused'),b=source.indexOf('\nfunction currentFaqs()',a);
 vm.runInNewContext(source.slice(a,b)+';renderSaleBanner();',context);
 return{nodes,attrs,timers,motion,listeners,html};
}
test('rotating announcements can be paused and manually browsed in both languages',()=>{
 for(const he of [true,false]){const b=bannerRuntime(he);assert.equal(b.timers.size,1);assert.match(b.html,/data-banner-pause/);b.nodes.pause.onclick();assert.equal(b.timers.size,0);assert.equal(b.attrs['pause:aria-pressed'],'true');assert.equal(b.attrs['message:aria-live'],'polite');b.nodes.next.onclick();assert.match(b.nodes.message.textContent,/500/);b.nodes.pause.onclick();assert.equal(b.timers.size,1);assert.equal(b.attrs['message:aria-live'],'off');}
});
test('reduced motion stops automatic announcements until explicitly resumed',()=>{
 const b=bannerRuntime(true,true);assert.equal(b.timers.size,0);assert.equal(b.attrs['pause:aria-pressed'],'true');b.nodes.pause.onclick();assert.equal(b.timers.size,1);
});
test('finder has a programmatic title, moves focus with each question and restores its opener',()=>{
 const attrs={},events={};let openerFocused=false,headingFocused=0;
 const opener={isConnected:true,focus(){openerFocused=true;}};
 const title={textContent:'',focus(){headingFocused++;}};
 const options={innerHTML:''},results={innerHTML:''},step={textContent:''};
 const dialog={dataset:{},open:false,setAttribute(k,v){attrs[k]=v;},innerHTML:'',querySelector(s){return s==='[data-finder-title]'?title:s==='[data-finder-options]'?options:s==='[data-finder-results]'?results:s==='[data-finder-step]'?step:{addEventListener(){}};},addEventListener(t,f){events[t]=f;},showModal(){this.open=true;}};
 const document={activeElement:opener,querySelector(){return null;},createElement(){return dialog;},body:{append(){}}};
 const a=source.indexOf('function openFinder()'),b=source.indexOf('\nfunction renderServiceDetails()',a);
 const copy={finderCarry:'Carry?',finderSize:'Size?',finderClose:'Close',hand:'Hand',onShoulder:'Shoulder',clutch:'Clutch'};
 vm.runInNewContext(source.slice(a,b)+';openFinder();',{document,copy,icon:()=>'',finderProducts:()=>[],productDesign:{}});
 assert.equal(attrs['aria-labelledby'],'finder-title');assert.match(dialog.innerHTML,/id="finder-title"[^>]*tabindex="-1"/);assert.equal(headingFocused,1);
 options.onclick({target:{closest(s){return s==='[data-finder-answer]'?{dataset:{finderAnswer:'clutch'}}:null;}}});
 assert.equal(title.textContent,'Size?');assert.equal(headingFocused,2);events.close();assert.equal(openerFocused,true);
});
test('accessibility statements disclose untested assistive technology and provide direct help',()=>{
 const c=vm.createContext({});vm.runInContext(fs.readFileSync('site/documents.js','utf8'),c);
 for(const lang of ['he','en']){const html=vm.runInContext(`getDocuments('${lang}').accessibility`,c);assert.match(html,/WCAG 2\.1/);assert.match(html,/5568/);assert.match(html,/NVDA/);assert.match(html,/VoiceOver/);assert.match(html,/TalkBack/);assert.match(html,/mailto:romic\.brand@gmail\.com/);assert.match(html,/tel:\+972553160780/);assert.equal((html.match(/<h1>/g)||[]).length,1);}
});

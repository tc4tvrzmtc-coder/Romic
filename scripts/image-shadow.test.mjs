import {test} from 'node:test';
import assert from 'node:assert/strict';
import sharp from 'sharp';
import {contactShadow} from './image-shadow.mjs';

test('contact shadow grounds a product while preserving every opaque product pixel', async () => {
  const bag = await sharp({create:{width:180,height:180,channels:4,background:'#a44f21'}}).png().toBuffer();
  const original = await sharp({create:{width:240,height:260,channels:4,background:{r:0,g:0,b:0,alpha:0}}}).composite([{input:bag,left:30,top:50}]).png().toBuffer();
  const placement = {left:100,top:100,width:500,height:500};
  const shadow = await contactShadow(original,placement);
  const result = await sharp({create:{width:500,height:500,channels:3,background:'#eee9e4'}}).composite([shadow,{input:original,left:100,top:100}]).removeAlpha().raw().toBuffer();
  const source = await sharp(original).raw().toBuffer();
  for (let y=0;y<260;y++) for (let x=0;x<240;x++) {
    const i=(y*240+x)*4;
    if (source[i+3]===255) assert.deepEqual(result.subarray(((y+100)*500+x+100)*3,((y+100)*500+x+100)*3+3),source.subarray(i,i+3));
  }
  const at = (x,y) => [...result.subarray((y*500+x)*3,(y*500+x)*3+3)];
  assert.deepEqual(at(10,10),[238,233,228], 'outer backdrop remains the configured color');
  assert.ok(at(220,331)[0]<220, 'shadow touches the product base');
  assert.ok(at(220,350)[0]<238, 'contact shadow has a soft falloff');
  assert.deepEqual(at(220,450),[238,233,228], 'no unrelated painted background');
});

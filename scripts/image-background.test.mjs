import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import sharp from 'sharp';
import {replaceBackgroundOnly} from './image-background.mjs';

test('background-only edits preserve source RGB in every protected bag and chain pixel',async()=>{
 const masks=JSON.parse(await fs.readFile('image-masks.json','utf8'));
 for(const colour of ['black','white']){
  const source=`assets/products/cloud-nine-${colour}.jpg`,entry=masks[source];
  const bytes=await fs.readFile('site/'+source),mask=await fs.readFile(entry.mask);
  const a=await sharp(mask).greyscale().raw().toBuffer();
  const original=await sharp(bytes).rotate().removeAlpha().raw().toBuffer({resolveWithObject:true});
  const result=await sharp(await replaceBackgroundOnly(bytes,mask,'#e9e5df')).removeAlpha().raw().toBuffer({resolveWithObject:true});
  assert.equal(result.info.width,original.info.width);assert.equal(result.info.height,original.info.height);
  let foreground=0,background=0;
  for(let i=0;i<a.length;i++){
   if(a[i]===255){foreground++;for(let c=0;c<3;c++)assert.equal(result.data[i*3+c],original.data[i*3+c],`${colour}: foreground ${i} channel ${c}`);}
   if(a[i]===0)background++;
   if(Math.min(...original.data.subarray(i*3,i*3+3))<228)assert.equal(a[i],255,`${colour}: a dark original chain/bag pixel was removed`);
  }
  assert.ok(foreground>300000);assert.ok(background>700000);
 }
});

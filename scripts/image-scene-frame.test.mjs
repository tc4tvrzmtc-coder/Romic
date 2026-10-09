import test from 'node:test';
import assert from 'node:assert/strict';
import sharp from 'sharp';
import {fullSceneFrame} from './image-scene-frame.mjs';

test('full scene frame preserves all photo pixels and matches backdrop edges without a flat colour border',async()=>{
  const width=4,height=10;
  const raw=Buffer.alloc(width*height*3);
  for(let y=0;y<height;y++)for(let x=0;x<width;x++){
    const i=(y*width+x)*3;
    raw[i]=100+y;raw[i+1]=50+x;raw[i+2]=150-y;
  }
  const original=await sharp(raw,{raw:{width,height,channels:3}}).png().toBuffer();
  const framed=await sharp(await fullSceneFrame(original,8,10)).raw().toBuffer({resolveWithObject:true});
  assert.equal(framed.info.width,8);assert.equal(framed.info.height,10);
  for(let y=0;y<height;y++){
    assert.deepEqual(framed.data.subarray((y*8+2)*3,(y*8+6)*3),raw.subarray(y*width*3,(y+1)*width*3));
    assert.deepEqual(framed.data.subarray(y*8*3,y*8*3+3),raw.subarray(y*width*3,y*width*3+3));
    assert.deepEqual(framed.data.subarray((y*8+7)*3,(y*8+8)*3),raw.subarray((y*width+3)*3,(y*width+4)*3));
  }
});

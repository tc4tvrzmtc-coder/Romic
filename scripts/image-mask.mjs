import sharp from 'sharp';

export async function attachOriginalAlpha(original, mask) {
  const rgb = await sharp(original).rotate().removeAlpha().raw().toBuffer({resolveWithObject:true});
  const alpha = await sharp(mask).greyscale().raw().toBuffer();
  if (rgb.info.channels !== 3 || alpha.length !== rgb.info.width * rgb.info.height) throw new Error('Invalid RGB/alpha input');
  const rgba = Buffer.alloc(alpha.length * 4);
  for (let pixel=0;pixel<alpha.length;pixel++) {
    rgba[pixel*4] = rgb.data[pixel*3];
    rgba[pixel*4+1] = rgb.data[pixel*3+1];
    rgba[pixel*4+2] = rgb.data[pixel*3+2];
    rgba[pixel*4+3] = alpha[pixel];
  }
  return sharp(rgba,{raw:{width:rgb.info.width,height:rgb.info.height,channels:4}}).png().toBuffer();
}

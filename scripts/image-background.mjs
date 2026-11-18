import sharp from 'sharp';
import {attachOriginalAlpha} from './image-mask.mjs';

// Use only the reviewed alpha matte. Every foreground RGB value comes from the
// original photograph; generated product/chain/logo pixels are never consumed.
export async function replaceBackgroundOnly(original, mask, background) {
  const rgba=await attachOriginalAlpha(original,mask);
  return sharp(rgba).flatten({background}).png().toBuffer();
}

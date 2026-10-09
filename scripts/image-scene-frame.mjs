import sharp from 'sharp';

// Frame the entire photograph; extend only the empty backdrop at its outer edges.
// This never crops or redraws the bag, logo, accessories or existing contact shadow.
export async function fullSceneFrame(input, width, height) {
  const image = await sharp(input).rotate().resize(width, height, {fit:'inside'}).removeAlpha().raw().toBuffer({resolveWithObject:true});
  const {data,info} = image;
  const left = Math.floor((width-info.width)/2), top = Math.floor((height-info.height)/2);
  const frame = Buffer.alloc(width*height*3);
  for(let y=0;y<height;y++) {
    const sourceY = Math.max(0,Math.min(info.height-1,y-top));
    for(let x=0;x<width;x++) {
      const sourceX = Math.max(0,Math.min(info.width-1,x-left));
      const sourceOffset = (sourceY*info.width+sourceX)*3;
      data.copy(frame,(y*width+x)*3,sourceOffset,sourceOffset+3);
    }
  }
  return sharp(frame,{raw:{width,height,channels:3}}).png().toBuffer();
}

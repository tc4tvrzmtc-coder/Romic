import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
test('green correction preserves original dimensions, background, logo and warm metal pixels', async () => {
  const report = JSON.parse(await fs.readFile(path.join(root, 'image-color-corrections.json')));
  const masks = JSON.parse(await fs.readFile(path.join(root, 'image-masks.json')));
  assert.equal(sha(await fs.readFile(path.join(root, 'site', report.reference))), report.reference_sha256);
  for (const [relative, result] of Object.entries(report.targets)) {
    const oldBytes = await fs.readFile(path.join(root, 'image-color-originals', relative));
    const newBytes = await fs.readFile(path.join(root, 'site', relative));
    assert.equal(sha(oldBytes), result.original_sha256);
    assert.equal(sha(newBytes), result.corrected_sha256);
    const original = await sharp(oldBytes).removeAlpha().raw().toBuffer({resolveWithObject: true});
    const corrected = await sharp(newBytes).removeAlpha().raw().toBuffer({resolveWithObject: true});
    assert.deepEqual(corrected.info, original.info);
    const alpha = await sharp(path.join(root, masks[relative].mask)).greyscale().raw().toBuffer();
    const plate = relative.includes('/maldives/') ? [389,445,516,495] : [175,269,269,305];
    let changed = 0;
    for (let i=0; i<alpha.length; i++) {
      const pixel = i*3;
      const x = i % original.info.width, y = Math.floor(i/original.info.width);
      const protectedPlate = x>=plate[0] && x<plate[2] && y>=plate[1] && y<plate[3];
      // Gold hue is outside the yarn range; warm green shadows remain yarn.
      const [r,g,b] = original.data.subarray(pixel,pixel+3);
      const hi = Math.max(r,g,b), lo = Math.min(r,g,b), span = hi-lo;
      const hue = span===0 ? 0 : hi===r ? ((g-b)/span+6)%6*60 : hi===g ? ((b-r)/span+2)*60 : ((r-g)/span+4)*60;
      const warmMetal = span>0 && hue<47.9 && span/hi>.12;
      const same = original.data.subarray(pixel,pixel+3).equals(corrected.data.subarray(pixel,pixel+3));
      if (alpha[i]===0 || protectedPlate || warmMetal) assert.ok(same, `Protected pixel changed: ${relative} at ${x},${y}`);
      if (!same) changed++;
    }
    assert.ok(changed>1000, 'Yarn colour was not corrected');
  }
});

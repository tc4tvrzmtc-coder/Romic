import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { spawnSync } from 'node:child_process';
import sharp from 'sharp';

const script = path.resolve('scripts/build-images.mjs');
test('publication gate converts source formats, preserves originals and rejects unreviewed or invalid output', async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'romic-image-test-'));
  try {
    await fs.mkdir(path.join(root, 'site/assets/products'), { recursive: true });
    await fs.writeFile(path.join(root, 'site/data.js'), "const ROMIC_PRODUCTS=[{id:'test',image:'test.png',gallery:['test.png']}];");
    await fs.writeFile(path.join(root, 'image-policy.json'), JSON.stringify({ margin:.08, customModels:[], colorBackgrounds:{}, productBackgrounds:{test:'#eee'}, derivatives:{'cards/600':600,'gallery-thumbs':240} }));
    const source = path.join(root, 'site/assets/products/test.png');
    await sharp({create:{width:100,height:100,channels:3,background:'#336699'}}).png().toFile(source);
    const original = await fs.readFile(source);
    const run = (...args) => spawnSync(process.execPath, [script,...args], {cwd:root,encoding:'utf8'});
    assert.match(run().stderr, /Visual review required/);
    assert.equal(run('--review').status, 0);
    assert.equal(run().status, 0);
    assert.equal(run('--check').status, 0);
    const published = path.join(root, '_site/assets/products/test.webp');
    const meta = await sharp(published).metadata();
    assert.deepEqual([meta.format,meta.width,meta.height], ['webp',1200,1500]);
    assert.deepEqual(await fs.readFile(source),original);
    assert.match(await fs.readFile(path.join(root,'_site/data.js'),'utf8'), /test.webp/);
    await sharp({create:{width:100,height:100,channels:3,background:'#fff'}}).webp().toFile(published);
    assert.match(run('--check').stderr, /Nonstandard image/);
    await fs.appendFile(source, Buffer.from([0]));
    assert.match(run().stderr, /Visual review required/);
    await fs.rm(source);
    assert.match(run().stderr, /Missing image/);
  } finally { await fs.rm(root,{recursive:true,force:true}); }
});

import assert from 'node:assert/strict';

export function validateCatalog(products) {
  const ids = new Set();
  for (const product of products) {
    const label = product.id || '(missing id)';
    assert.match(product.id || '', /^[a-z0-9-]+$/, `${label}: invalid product id`);
    assert.ok(!ids.has(product.id), `${label}: duplicate product id`);
    ids.add(product.id);
    for (const field of ['name','he','en','image']) assert.ok(typeof product[field] === 'string' && product[field].trim(), `${label}: missing ${field}`);
    assert.ok(Number.isFinite(product.price) && product.price > 0, `${label}: missing or invalid price`);
    assert.ok(['S','M','L','XL'].includes(product.size), `${label}: missing finder size`);
    assert.ok(product.types?.length && product.types.every(type => ['clutch','top-handle','shoulder'].includes(type)), `${label}: missing or invalid finder types`);
    assert.ok(['clean','chain','pearls'].includes(product.detail), `${label}: missing finder detail`);
    assert.ok(Array.isArray(product.searchTerms) && product.searchTerms.some(term => /[א-ת]/.test(term)), `${label}: missing Hebrew search alias`);
    assert.ok(product.gallery?.includes(product.image), `${label}: primary image missing from gallery`);
  }
  assert.ok(products.some(product => product.homeFeatured), 'Catalogue has no homepage selection');
}

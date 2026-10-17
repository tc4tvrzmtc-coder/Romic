const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

// Publish the existing product information before browser scripts run.
export function productHtml(product, language, image, dimensions = [1200,1500]) {
  const he = language === 'he';
  const description = product[language] || product.name;
  return `<div class="product-page"><a class="back-link" href="./#collection">${he ? 'חזרה לקולקציה' : 'BACK TO COLLECTION'}</a><div class="product-layout"><div class="product-gallery"><div class="product-hero-image" style="aspect-ratio:${dimensions[0]}/${dimensions[1]}"><img src="${escape(image)}" alt="${escape(product.name)} — ${escape(description)}" width="${dimensions[0]}" height="${dimensions[1]}" fetchpriority="high" decoding="async"></div></div><section class="product-info" aria-labelledby="product-name"><h1 class="product-name" id="product-name">${escape(product.name)}</h1><p class="product-description">${escape(description)}</p><p class="product-price">₪${escape(product.price)}</p><dl class="product-specs"><div><dt>${he ? 'גודל' : 'SIZE'}</dt><dd>${escape(product.size)}</dd></div><div><dt>${he ? 'מידות גוף התיק' : 'BAG BODY'}</dt><dd>${escape(product.width)} × ${escape(product.height)} cm</dd></div></dl><a href="./#collection">${he ? 'לקולקציה' : 'VIEW THE COLLECTION'}</a></section></div></div>`;
}

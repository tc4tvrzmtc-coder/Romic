import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';

const source = await fs.readFile(new URL('../site/app.js', import.meta.url), 'utf8');
function app(lang = 'he') {
  let now = Date.parse('2026-10-03T12:00:00+03:00');
  const storage = new Map([['romic:applied-coupon', 'ROMIC2026']]);
  let timer;
  let closes = 0;
  const faq = {querySelector: () => ({textContent:''})};
  const context = vm.createContext({
    Date: class extends Date {static now() {return now;}},
    location: {hostname:'example.com'},
    sessionStorage: {getItem:key => storage.get(key),setItem:(key,value) => storage.set(key,value),removeItem:key => storage.delete(key)},
    document: {documentElement:{lang}, addEventListener() {}, querySelector:() => null,
      querySelectorAll:selector => selector === '.launch-dialog' ? [{close() {closes++;}}] : selector === '.faq-item' ? [faq] : []},
    window: {addEventListener() {}, clearTimeout() {}, setTimeout(fn, delay) {timer = {fn, delay}; return 1;}}
  });
  vm.runInContext(source, context);
  return {run:code => vm.runInContext(code, context), at:date => {now = Date.parse(date);}, timer:() => timer, closes:() => closes};
}

test('cart totals and WhatsApp agree for delivery and pickup in both languages', () => {
  for (const language of ['he','en']) {
    const a = app(language);
    const products = '[{name:"Rio",size:"L",price:460},{name:"Ibiza",size:"M",price:330}]';
    for (const [coupon, method, total] of [[false,'delivery',820],[false,'pickup',790],[true,'delivery',662],[true,'pickup',632]]) {
      const calculation = a.run(`calculateCart(${products},${coupon},'${method}')`);
      assert.equal(calculation.total, total);
      assert.equal(calculation.shipping, method === 'pickup' ? 0 : 30);
      const message = a.run(`makeWhatsappMessage(${products},${coupon},'${method}')`);
      assert.ok(message.endsWith(`₪${total}`));
      assert.equal(message.includes('ROMIC2026'), coupon);
      assert.ok(message.includes(coupon ? '₪368' : '₪460'));
      assert.ok(message.includes(coupon ? '₪264' : '₪330'));
    }
  }
});

test('promotion expires at the agreed Israel time and refreshes without reloading', () => {
  for (const language of ['he','en']) {
    const a = app(language);
    a.at('2026-10-02T20:44:59.999+03:00');
    assert.equal(a.run('promoIsActive()'),false);
    a.at('2026-10-02T20:45:00+03:00');
    assert.equal(a.run('promoIsActive()'),true);
    a.at('2026-10-22T23:59:59.999+03:00');
    assert.equal(a.run('isCouponApplied()'),true);
    a.run('refreshPromotionState()');
    assert.equal(a.timer().delay,1);
    a.at('2026-10-23T00:00:00+03:00');
    a.timer().fn();
    assert.equal(a.run('isCouponApplied()'),false);
    assert.equal(a.closes(),1);
    assert.match(a.run('currentFaqs()[6][1]'),language === 'he' ? /הסתיימה/ : /ended/);
    assert.ok(a.run('makeWhatsappMessage([{name:"Rio",size:"L",price:460}],isCouponApplied(),"delivery")').endsWith('₪490'));
  }
});


test('friend offer includes custom designs, excludes shipping and never stacks with launch offer', () => {
  for (const language of ['he','en']) {
    const a = app(language);
    a.run("setCoupon(couponByCode(' romicgirls30 ').code)");
    assert.equal(a.run('currentPrice({price:400},true)'),280);
    assert.equal(a.run('currentPrice({price:460})'),322);
    assert.equal(a.run("calculateCart([{price:400,custom:true}],activeCoupon(),'delivery').total"),310);
    a.at('2026-10-23T00:00:00+03:00');
    assert.equal(a.run('activeCoupon().percent'),30);
    assert.equal(a.run('couponByCode("ROMIC2026")'),null);
    assert.equal(a.run('couponByCode("unknown")'),null);
    a.run("setCoupon('')");
    assert.equal(a.run('currentPrice({price:400},true)'),400);
    assert.equal(a.run('activeCoupon()'),null);
  }
});

test('launch offer leaves custom prices intact; pickup is default; empty cart can activate an offer', () => {
  const a = app();
  assert.equal(a.run('getDeliveryMethod()'),'pickup');
  assert.equal(a.run('currentPrice({price:400},true)'),400);
  a.run("setCoupon('ROMICGIRLS30')");
  assert.equal(a.run("calculateCart([],activeCoupon(),'pickup').total"),0);
  assert.equal(a.run('currentPrice({price:320},true)'),224);
  assert.match(a.run("priceMarkup({price:320},'price',true)"),/<del[^>]*>₪320<\/del>/);
  assert.match(a.run("priceMarkup({price:320},'price',true)"),/₪224/);
  assert.equal(a.run('formatPrice(224.0199999999)'),'₪224.02');
});

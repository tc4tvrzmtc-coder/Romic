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
    sessionStorage: {getItem:key => storage.get(key)},
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
    for (const [coupon, method, total] of [[false,'delivery',825],[false,'pickup',790],[true,'delivery',667],[true,'pickup',632]]) {
      const calculation = a.run(`calculateCart(${products},${coupon},'${method}')`);
      assert.equal(calculation.total, total);
      assert.equal(calculation.shipping, method === 'pickup' ? 0 : 35);
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
    a.at('2026-10-16T20:44:59.999+03:00');
    assert.equal(a.run('isCouponApplied()'),true);
    a.run('refreshPromotionState()');
    assert.equal(a.timer().delay,1);
    a.at('2026-10-16T20:45:00+03:00');
    a.timer().fn();
    assert.equal(a.run('isCouponApplied()'),false);
    assert.equal(a.closes(),1);
    assert.match(a.run('currentFaqs()[6][1]'),language === 'he' ? /הסתיימה/ : /ended/);
    assert.ok(a.run('makeWhatsappMessage([{name:"Rio",size:"L",price:460}],isCouponApplied(),"delivery")').endsWith('₪495'));
  }
});

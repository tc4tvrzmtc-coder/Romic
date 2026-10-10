let isHebrew = document.documentElement.lang === 'he';
let language = isHebrew ? 'he' : 'en';
const instagramProfile = 'https://www.instagram.com/romic_brand/';
const whatsappNumber = '972553160780';
const whatsappBase = `https://wa.me/${whatsappNumber}`;
const promoCode = 'ROMIC2026';
const promoStartsAt = Date.parse('2026-10-02T20:45:00+03:00');
const promoEndsAt = Date.parse('2026-10-23T00:00:00+03:00');
const deliveryPrice = 30;
const friendCouponCode = 'ROMICGIRLS30';
const instagramReel = 'https://www.instagram.com/reel/DdbnlpQMoNE/';
let couponMemory;
const appliedCouponStorageKey = 'romic:applied-coupon';
const collectionStorageKey = 'romic:collection-state';
const collectionReturnKey = 'romic:collection-return';
const savedPicksKey = 'romic:saved-picks';
const siteBasePath = location.hostname.endsWith('.github.io') ? '/Romic' : '';

const COPY = {
  en: {
    skip:'Skip to content', collection:'Collection', craft:'Make It Yours', service:'Delivery', faq:'FAQ', instagram:'Instagram', menu:'Menu', close:'Close menu', language:'עברית',
    heroKicker:'HANDMADE IN ISRAEL · BY ROMI COHEN', heroTitle:'CHOOSE YOUR\nROMIC.', heroIntro:'', heroButton:'DISCOVER THE COLLECTION', scroll:'SCROLL TO FIND YOURS',
    collectionTitle:'FIND YOUR ROMIC.', search:'Search by name or style', noResults:'No bags match your search.', filters:'FILTER & SORT', all:'All', clutches:'Clutches', topHandle:'Top handle', shoulder:'Shoulder', sort:'Sort', featured:'Featured', lowHigh:'Price: low to high', highLow:'Price: high to low', fullCollection:'VIEW THE FULL COLLECTION',
    readyTitle:'FROM THE COLLECTION', readyCopy:'Delivery within 7 business days.', customTitle:'MAKE IT YOURS', customCopy:'Choose a model and colour. Delivery within 7 business days.', shippingTitle:'DELIVERY', shippingCopy:'Israel only · ₪30 delivery · free pickup in Givatayim.',
    privacy:'Privacy', accessibility:'Accessibility', terms:'Terms & offers', rights:'© 2026 Romic. All rights reserved.', handmade:'Handmade bags · Israel', email:'Email',
    back:'BACK TO COLLECTION', size:'SIZE', dimensions:'BAG BODY', order:'ADD TO BAG', save:'ADD TO BAG', saved:'IN YOUR BAG',
    dimsNote:'Measurements refer to the bag body only, excluding handles and straps. As every bag is handmade, slight variations may occur.', deliveryNote:'Delivery within 7 business days · Israel delivery ₪30 · free pickup in Givatayim.', dmNote:'Choose WhatsApp and Romic in the share menu, review your message and tap Send.',
    personalTitle:'WANT A DIFFERENT COLOUR?', personalCopy:'Choose a Romic model, then make it yours.', personalLink:'EXPLORE MAKE IT YOURS', invalid:'Bag not found', invalidCopy:'This design may no longer be available.',
    finderHint:'NEED HELP CHOOSING?', finderOpen:'FIND YOUR BAG', finderClose:'Close bag finder', finderCarry:'HOW DO YOU WANT TO CARRY IT?', finderSize:'WHAT SIZE DO YOU WANT?', finderDetail:'PICK A DETAIL', hand:'In hand', onShoulder:'On shoulder', clutch:'Clutch', small:'Small', medium:'Medium', large:'Large', clean:'Clean', chain:'Chain', pearls:'Pearls', matches:'YOUR MATCHES', yourRomic:'YOUR ROMIC.', noExact:'No exact match in the ready-made collection.', makeYours:'MAKE IT YOURS',
    model:'CHOOSE A MODEL', colour:'CHOOSE A COLOUR', basePrice:'BASE PRICE', bagBody:'BAG BODY', messageRomic:'SEND YOUR SELECTION ON WHATSAPP', extraNote:'Extras cost more.', detailsLabel:'More details', customLead:'Choose a model. Choose a colour.', customNote:'Base price: one solid colour with the standard handle and hardware. Straps, colour combinations, extra handles and accessories cost extra.', customVisual:'Visualisation for reference. Handmade colour and measurements may vary slightly.',
    copied:'Your message is ready in WhatsApp. Tap Send when you’re ready.', picksCopied:'Your bag is ready in WhatsApp. Tap Send when you’re ready.', picksLabel:'IN YOUR BAG', viewImage:'View', remove:'Remove', openInstagram:'open Romic on Instagram',
    bag:'My bag', bagTitle:'Your bag', bagEmpty:'Your bag is empty.', keepBrowsing:'KEEP BROWSING', subtotal:'Subtotal', discount:'Launch offer · 20%', total:'Final total', receiving:'Delivery or pickup', delivery:'Delivery in Israel', pickup:'Pickup in Givatayim', free:'Free', shipping:'Delivery', couponLabel:'Coupon code', couponPlaceholder:'Enter code', applyCoupon:'Apply', couponDone:'Applied', couponApplied:'20% applied to ready-made bags', couponInvalid:'That code doesn’t match. Check it and try again.', couponExpired:'The launch offer has ended.', whatsapp:'SHARE YOUR SELECTION', offerTitle:'CELEBRATING OUR LAUNCH', offerSubtitle:'Off the collection', offerCodeLabel:'Your launch code', offerTerms:'20% off ready-made collection bags · Through 22 October 2026, inclusive. Custom designs and delivery are excluded.', offerAction:'EXPLORE THE COLLECTION', offerClose:'Close offer',
    addConfirmation:'Added to your bag.', removeConfirmation:'Removed from your bag.', openWhatsapp:'Open WhatsApp to message Romic', couponUsed:'Coupon code ROMIC2026 applied.', promoMessage:'Launch offer: 20% off ready-made collection bags with ROMIC2026. Excludes custom designs and delivery. Through 22 October 2026, inclusive.'
  },
  he: {
    skip:'דילוג לתוכן', collection:'קולקציה', craft:'עיצוב אישי', service:'משלוחים', faq:'שאלות נפוצות', instagram:'אינסטגרם', menu:'תפריט', close:'סגירת התפריט', language:'EN',
    heroKicker:'עבודת יד ישראלית · ROMI COHEN', heroTitle:'CHOOSE YOUR\nROMIC.', heroIntro:'', heroButton:'לצפייה בקולקציה', scroll:'גלי את התיק שלך',
    collectionTitle:'FIND YOUR ROMIC.', search:'חיפוש לפי שם או סוג', noResults:'לא נמצאו תיקים שמתאימים לחיפוש.', filters:'סינון ומיון', all:'הכול', clutches:'קלאצ׳ים', topHandle:'תיקי יד', shoulder:'תיקי כתף', sort:'מיון', featured:'מומלצים', lowHigh:'מחיר: מהנמוך לגבוה', highLow:'מחיר: מהגבוה לנמוך', fullCollection:'לכל הקולקציה',
    readyTitle:'תיק מהקולקציה', readyCopy:'אספקה עד 7 ימי עסקים.', customTitle:'תיקים בעיצוב אישי', customCopy:'בחרי דגם וצבע. אספקה עד 7 ימי עסקים.', shippingTitle:'משלוחים', shippingCopy:'משלוחים בישראל בלבד · ₪30 · איסוף עצמי מגבעתיים ללא עלות.',
    privacy:'מדיניות פרטיות', accessibility:'הצהרת נגישות', terms:'תנאים ומבצעים', rights:'© 2026 Romic. כל הזכויות שמורות.', handmade:'תיקים בעבודת יד · ישראל', email:'אימייל',
    back:'חזרה לקולקציה', size:'מידה', dimensions:'מידות גוף התיק', order:'הוסיפי לסל שלי', save:'הוסיפי לסל שלי', saved:'נוסף לסל',
    dimsNote:'המידות מתייחסות לגוף התיק בלבד, ללא ידיות ורצועות. כל תיק נסרג בעבודת יד ולכן ייתכנו הבדלים קטנים.', deliveryNote:'אספקה עד 7 ימי עסקים · משלוח בישראל ₪30 · איסוף עצמי מגבעתיים ללא עלות.', dmNote:'ייפתח מסך שיתוף. בחרי WhatsApp ואת השיחה עם Romic, בדקי ולחצי על שליחה.',
    personalTitle:'רוצה את התיק בצבע אחר?', personalCopy:'בחרי דגם וצבע ועצבי את ה־Romic שלך.', personalLink:'לעיצוב אישי', invalid:'התיק לא נמצא', invalidCopy:'ייתכן שהדגם כבר אינו זמין.',
    finderHint:'לא בטוחה?', finderOpen:'מצאי את התיק שלך', finderClose:'סגירת שאלון התאמה', finderCarry:'איך תרצי לשאת את התיק?', finderSize:'איזה גודל תרצי?', finderDetail:'איזה גימור את אוהבת?', hand:'ביד', onShoulder:'על הכתף', clutch:'קלאץ׳', small:'קטן', medium:'בינוני', large:'גדול', clean:'נקי', chain:'שרשרת', pearls:'פנינים', matches:'התיקים שמתאימים לך', yourRomic:'YOUR ROMIC.', noExact:'לא מצאנו התאמה מדויקת. אולי תמצאי את התיק שלך בעיצוב האישי.', makeYours:'לעיצוב אישי',
    model:'בחירת דגם', colour:'בחירת צבע', basePrice:'מחיר בסיס', bagBody:'מידות גוף התיק', messageRomic:'שלחי את הבחירה שלך בוואטסאפ', extraNote:'תוספות כרוכות בתשלום.', detailsLabel:'פרטים נוספים', customLead:'בחרי דגם. בחרי צבע.', customNote:'מחיר הבסיס כולל צבע אחיד, ידית ואבזור סטנדרטיים. רצועות, שילובי צבעים, ידיות נוספות ואביזרים מתומחרים בנפרד.', customVisual:'ההדמיה להמחשה. בעבודת יד ייתכנו הבדלים קטנים בגוון ובמידות.',
    copied:'ההודעה מוכנה בוואטסאפ. כשתרצי, לחצי על שליחה.', picksCopied:'הסל שלך מוכן בוואטסאפ. כשתרצי, לחצי על שליחה.', picksLabel:'בסל שלי', viewImage:'תמונה', remove:'הסרה', openInstagram:'פתיחת Romic באינסטגרם',
    bag:'הסל שלי', bagTitle:'הבחירות שלך', bagEmpty:'עוד לא הוספת תיק לסל.', keepBrowsing:'חזרה לקולקציה', subtotal:'סכום ביניים', discount:'הטבת השקה · 20%', total:'מחיר סופי', receiving:'איך תרצי לקבל את התיק?', delivery:'משלוח בישראל', pickup:'איסוף עצמי מגבעתיים', free:'ללא עלות', shipping:'משלוח', couponLabel:'קוד קופון', couponPlaceholder:'הזיני קוד', applyCoupon:'החילי קוד', couponDone:'הקוד הופעל', couponApplied:'20% הנחה על תיקי הקולקציה הקיימים', couponInvalid:'הקוד לא זוהה. בדקי ונסי שוב.', couponExpired:'הטבת ההשקה הסתיימה.', whatsapp:'שתפי את הבחירה בוואטסאפ', offerTitle:'חוגגות את ההשקה', offerSubtitle:'הנחה על הקולקציה', offerCodeLabel:'קוד הטבת ההשקה', offerTerms:'20% הנחה על התיקים שבקולקציה · בתוקף עד 22.10.2026 כולל. לא כולל עיצוב אישי ומשלוח.', offerAction:'לצפייה בקולקציה', offerClose:'סגירת ההטבה',
    addConfirmation:'נוסף לסל שלך.', removeConfirmation:'הוסר מהסל.', openWhatsapp:'פתיחת וואטסאפ ושליחת הודעה ל־Romic', couponUsed:'קוד הקופון ROMIC2026 הופעל.', promoMessage:'הטבת השקה: 20% הנחה על תיקי הקולקציה הקיימים בקוד ROMIC2026. לא כולל עיצוב אישי ומשלוח. בתוקף עד 22.10.2026 כולל.'
  }
};
let copy = COPY[language];
let menuEscapeHandler;

const HOME_LOCALE = {
  en: {
    title:"ROMIC — Handmade Crochet Bags & Custom Designs",
    description:"Discover ROMIC crochet bags handmade in Israel from textile yarn. Explore handbags, shoulder bags and clutches, or choose a design and colour to make it yours.",
    conveyorLabel:'Moving Romic collection. Swipe or drag left and right to explore.',
    searchLabel:'Search bags', toolsLabel:'Find and sort bags', categoriesLabel:'Filter by bag type',
    categories:['All','Clutches','Top handle','Shoulder'], sortLabel:'Sort', sorts:['Featured','Price: low to high','Price: high to low'],
    faqKicker:'ROMIC FAQ', faqTitle:'GOOD TO<br>KNOW.', faqIntro:'A few useful details before you choose your Romic.',
    faqs:[
      ['How do I make a purchase?','Add your chosen bags to My bag, select delivery or pickup and enter a coupon code if you have one. Continue to WhatsApp, review your message and tap Send. We’ll confirm your order and arrange payment with you.'],
      ['Are Romic bags handmade in Israel?','Yes. Every Romic bag is hand-crocheted in Israel.'],
      ['How do I choose the right size?','Each product page shows the bag size and body measurements. Handles and straps are not included in the measurements.'],
      ['Can I choose a model and colour?','Yes. In Romic Your Way, choose from the available models and colours. Straps, colour combinations and extra details may cost more.'],
      ['When will my bag arrive?','Delivery within 7 business days for both collection bags and custom designs.'],
      ['What are the delivery and pickup options?','Delivery is available within Israel for ₪30. Pickup in Givatayim is free.'],
      ['How does the launch offer work?','Enter ROMIC2026 in My bag for 20% off ready-made collection bags through 22 October 2026. It excludes custom designs and delivery, and can’t be combined with another offer.'],
      ['Can I return or cancel an order?','Returns and cancellations follow Israeli consumer law. Change-of-mind cancellations are subject to the statutory cancellation fee and return shipping is at the customer’s expense. See the returns and cancellation terms in the footer.']
    ],
    faqContact:'HAVE A QUESTION? MESSAGE ROMIC ON WHATSAPP', faqMessage:'Hi Romic! I have a question about the bags on your website.',
    instagramKicker:'THE LATEST FROM ROMIC', instagramTitle:'FOLLOW THE<br>MAKING.', instagramButton:'OPEN @ROMIC_BRAND'
  },
  he: {
    title:"ROMIC | רומיק — תיקים סרוגים בעבודת יד ובעיצוב אישי",
    description:"רומיק (ROMIC) — תיקים סרוגים בעבודת יד בישראל. גלי תיקי יד, תיקי כתף וקלאצ׳ים מחוטי טריקו, או בחרי דגם וצבע לתיק בעיצוב אישי.",
    conveyorLabel:'קולקציית Romic בתנועה. החליקי לצדדים כדי לגלות את הדגמים.',
    searchLabel:'חיפוש תיקים', toolsLabel:'חיפוש ומיון תיקים', categoriesLabel:'סינון לפי סוג תיק',
    categories:['הכול','קלאצ׳ים','תיקי יד','תיקי כתף'], sortLabel:'מיון', sorts:['מומלצים','מחיר: מהנמוך לגבוה','מחיר: מהגבוה לנמוך'],
    faqKicker:'שאלות נפוצות', faqTitle:'טוב<br>לדעת.', faqIntro:'כמה תשובות קצרות לפני שתבחרי תיק.',
    faqs:[
      ['איך לבצע רכישה?','הוסיפי את התיקים שבחרת לסל, בחרי משלוח או איסוף עצמי והזיני קוד קופון אם יש לך. המשיכי לוואטסאפ, בדקי את ההודעה ולחצי על שליחה. את אישור ההזמנה והתשלום נתאם איתך בשיחה.'],
      ['כל התיקים של Romic נסרגים בעבודת יד בישראל?','כן. כל תיק של Romic נסרג בעבודת יד בישראל.'],
      ['איך לבחור את המידה המתאימה?','בעמוד של כל תיק תמצאי את המידה ואת מידות גוף התיק. המידות אינן כוללות ידיות ורצועות.'],
      ['אפשר לבחור דגם וצבע?','כן. בעיצוב האישי בחרי דגם וצבע מתוך האפשרויות הקיימות. רצועות, שילובי צבעים ותוספות עשויים להיות בתוספת תשלום.'],
      ['מה זמן האספקה של התיקים?','אספקה עד 7 ימי עסקים, לתיקים מהקולקציה ולתיקים בעיצוב אישי.'],
      ['מהן אפשרויות המשלוח והאיסוף?','משלוחים בישראל בלבד בעלות ₪30, או איסוף עצמי מגבעתיים ללא עלות.'],
      ['איך מקבלים את הטבת ההשקה?','הזיני את הקוד ROMIC2026 בסל שלי וקבלי 20% הנחה על תיקי הקולקציה הקיימים, עד 22.10.2026. ההטבה לא כוללת עיצוב אישי או משלוח, ואינה מצטרפת למבצע אחר.'],
      ['אפשר להחזיר או לבטל הזמנה?','ביטול והחזרה בהתאם לחוק הגנת הצרכן. בביטול עקב חרטה ייגבו דמי ביטול כחוק והחזרת התיק תהיה על חשבון הלקוחה. לפרטים עברי לתנאי ההחזרות והביטולים בתחתית האתר.']
    ],
    faqContact:'יש לך שאלה? כתבי ל־ROMIC בוואטסאפ', faqMessage:'היי Romic! יש לי שאלה לגבי התיקים באתר.',
    instagramKicker:'מה חדש ב־ROMIC', instagramTitle:'הצצה<br>לתהליך.', instagramButton:'ל־@ROMIC_BRAND באינסטגרם'
  }
};

const productDesign = {
  rio: ['coral', '#fda476'], paris: ['berry', '#da9d9e'], monaco: ['mauve', '#c18a99'], miami: ['berry', '#ed93a4'],
  bali: ['lime', '#a7af6c'], sahara: ['sand', '#a6795b'], tokyo: ['lime', '#a6d270'], madrid: ['red', '#bf1320'], ibiza: ['coral', '#fda476'], porto: ['wine', '#8e1d2b'],
  maldives: ['sky', '#a9cdef'], corfu: ['sky', '#a9cdef'], lisbon: ['sun', '#f8d063'], tulum: ['sand', '#d1b399'],
  mykonos: ['stone', '#eee9e4'], milan: ['stone', '#eee9e4'], venice: ['wine', '#8e1d2b'], dubai: ['charcoal', '#423d3c'], florence:['sand','#a57961'], marrakech:['gold','#bd9c54']
};

const catalogOrder = ['marrakech','rio','ibiza','porto','florence','paris','miami','monaco','madrid','venice','dubai','sahara','tulum','mykonos','milan','lisbon','bali','tokyo','corfu','maldives'];

function formatPrice(price) { return `₪${Number(price.toFixed(2)).toLocaleString('he-IL', {maximumFractionDigits:2})}`; }
function promoIsActive() { const now = Date.now(); return now >= promoStartsAt && now < promoEndsAt; }
function currentFaqs() {
  return HOME_LOCALE[language].faqs.map((entry, index) => index === 6 && Date.now() >= promoEndsAt
    ? [entry[0], isHebrew ? 'הטבת ההשקה הסתיימה ב־22.10.2026. המחירים המוצגים באתר הם המחירים הנוכחיים, והקוד ROMIC2026 אינו פעיל.' : 'The launch offer ended on 22 October 2026. The prices shown on the website are the current prices, and ROMIC2026 is no longer active.']
    : entry);
}
let promotionTimer;
let previousPromotionState;
function refreshPromotionState() {
  const active = promoIsActive();
  if (active !== previousPromotionState) {
    previousPromotionState = active;
    if (!active) document.querySelectorAll('.launch-dialog').forEach(dialog => dialog.close());
    const entries = currentFaqs();
    document.querySelectorAll('.faq-item').forEach((item, index) => {
      if (!entries[index]) return;
      item.querySelector('summary').textContent = entries[index][0];
      item.querySelector('p').textContent = entries[index][1];
    });
    refreshPriceDisplays();
  }
  window.clearTimeout(promotionTimer);
  const now = Date.now();
  const boundary = now < promoStartsAt ? promoStartsAt : promoEndsAt;
  if (boundary > now) promotionTimer = window.setTimeout(refreshPromotionState, Math.min(boundary - now, 2147483647));
}
function isInternalHomeReturn() {
  const navigation = performance.getEntriesByType('navigation')[0];
  if (navigation?.type === 'reload') return false;
  if (!document.referrer) return navigation?.type === 'back_forward';
  try {
    const previous = new URL(document.referrer);
    return previous.origin === location.origin && /\/(he|en)\//.test(previous.pathname);
  } catch (_) { return false; }
}
function showLaunchOfferOnce(freshEntry = false) {
  if (!promoIsActive()) return;
  // Review links reopen the real offer without changing live-site navigation.
  const launchPreview = location.hostname === 'raw.githack.com' && new URLSearchParams(location.search).get('preview') === 'launch';
  if (!freshEntry && !launchPreview && isInternalHomeReturn()) return;
  if (window.__romicLaunchOfferSeen) return;
  document.querySelectorAll('.launch-dialog').forEach(dialog => { dialog.close(); dialog.remove(); });
  const dialog = document.createElement('dialog');
  dialog.className = 'launch-dialog';
  dialog.setAttribute('aria-labelledby', 'launch-offer-title');
  const photos = `<img class="launch-photo-main" src="../assets/promo/bags-in-sun.webp" alt="${isHebrew ? 'ארבעה תיקי ROMIC באור טבעי' : 'Four ROMIC bags in natural light'}" width="650" height="1140" decoding="async">
    <img class="launch-model launch-model-black" src="../assets/promo/launch-black-model.webp" alt="${isHebrew ? 'דוגמנית עם תיק ROMIC שחור' : 'Model carrying a black ROMIC bag'}" width="1158" height="1536" decoding="async">
    <img class="launch-model launch-model-miami" src="../assets/promo/launch-miami-model.webp" alt="${isHebrew ? 'דוגמנית עם תיק Miami ורוד ולבן' : 'Model carrying the pink and white Miami bag'}" width="1031" height="1536" decoding="async">`;
  dialog.innerHTML = `<div class="launch-dialog-layout">
    <button class="launch-dialog-close" type="button" aria-label="${copy.offerClose}" data-offer-close>${icon('close')}</button>
    <div class="launch-dialog-copy">
      <p class="launch-kicker">${isHebrew ? 'הטבת השקה' : 'A LAUNCH OFFER'}</p>
      <h2 id="launch-offer-title">${copy.offerTitle}</h2>
      <p class="launch-discount">20%</p><p class="launch-subtitle">${copy.offerSubtitle}</p>
      <p class="launch-code-label">${copy.offerCodeLabel}</p>
      <p class="launch-code"><bdi dir="ltr">ROMIC2026</bdi></p>
      <p class="launch-terms">${copy.offerTerms}</p>
      <button class="launch-action" type="button" data-offer-action>${isHebrew ? 'הפעילי את ההטבה' : 'ACTIVATE THE OFFER'}</button>
    </div>
    <div class="launch-bag-collage" aria-label="${isHebrew ? 'מבחר תיקים מהקולקציה' : 'A selection of Romic bags'}">${photos}</div>
  </div>`;
  document.body.append(dialog);
  window.__romicLaunchOfferSeen = true;
  dialog.querySelector('[data-offer-close]').addEventListener('click', () => dialog.close());
  dialog.querySelector('[data-offer-action]').addEventListener('click', () => {
    if (!promoIsActive()) { dialog.close(); toast(copy.couponExpired); return; }
    const existing = activeCoupon();
    if (!existing || existing.percent < 20) setCoupon(promoCode);
    dialog.close();
    toast(existing?.percent === 30 ? (isHebrew ? 'הטבת ה־30% שלך נשארת פעילה.' : 'Your 30% offer remains active.') : (isHebrew ? 'ההטבה הופעלה — 20% הנחה על הקולקציה.' : 'Offer activated — 20% off the collection.'));
  });
  dialog.addEventListener('close', () => dialog.remove(), { once:true });
  dialog.showModal();
}
function currentPrice(product, custom = false) { return discountedPrice(product.price, activeCoupon(), custom); }
function openAbout(trigger) {
  if (document.querySelector('.about-dialog[open]')) return;
  const dialog = document.createElement('dialog');
  dialog.className = 'about-dialog';
  dialog.setAttribute('aria-labelledby', 'about-title');
  const title = isHebrew ? 'היי, אני רומי.' : 'Hi, I’m Romi.';
  const story = isHebrew
    ? 'ROMIC הוא המקום שלי ליצור תיקים עם אופי. אני מעצבת וסורגת כל תיק בעבודת יד, מחוטי טריקו ואביזרים שנבחרים בקפידה.'
    : 'ROMIC is where I create bags with character. I design and hand-crochet each one, using textile yarn and carefully chosen accessories.';
  const invitation = isHebrew
    ? 'תוכלי לבחור תיק שכבר מחכה לך בקולקציה, או שנבחר יחד דגם וצבע וניצור ROMIC משלך.'
    : 'Choose a bag from the collection, or we can pick a model and colour together and create your own Romic.';
  const closeLabel = isHebrew ? 'סגירת על ROMIC' : 'Close About ROMIC';
  dialog.innerHTML = `<div class="about-frame">
    <header class="about-header"><img src="../assets/romic-wordmark-vector.svg" width="142" height="52" alt="ROMIC — Handmade Bags"><button class="about-close" type="button" aria-label="${closeLabel}">${icon('close')}</button></header>
    <div class="about-copy"><h2 id="about-title" tabindex="-1" autofocus>${title}</h2><p class="about-story">${story}</p><p class="about-invitation">${invitation}</p></div>
    <footer class="about-footer"><p class="about-signature">${isHebrew ? 'תכניסי קצת צבע לחיים שלך.' : 'Bring a little colour into your life.'}</p>
      <div class="about-actions"><a class="button" href="./#collection" data-about-destination="collection"><span>${isHebrew ? 'גלי את הקולקציה' : 'Discover the collection'}</span>${icon('arrow')}</a><a class="button" href="./#customize" data-about-destination="customize"><span>${isHebrew ? 'עיצוב אישי · <bdi dir="ltr">Make it yours</bdi>' : 'Make it yours'}</span>${icon('arrow')}</a></div>
      <nav class="about-social" aria-label="${isHebrew ? 'להכיר את רומי וליצור קשר' : 'Connect with Romi'}"><a href="${instagramProfile}" target="_blank" rel="external noopener">${icon('instagram')}<span>${isHebrew ? 'בקרי אותי באינסטגרם' : 'Instagram'}</span></a><a href="${whatsappUrl(isHebrew ? 'היי רומי! אשמח לשאול אותך לגבי התיקים של ROMIC.' : 'Hi Romi! I’d love to ask you about ROMIC bags.')}" target="_blank" rel="external noopener">${icon('whatsapp')}<span>${isHebrew ? 'כתבי לי בוואטסאפ' : 'Message me'}</span></a></nav>
    </footer></div>`;
  const returnTarget = trigger.closest('[data-mobile-menu]') ? document.querySelector('[data-menu-toggle]') : trigger;
  let restoreFocus = true;
  const dismiss = () => dialog.close();
  dialog.querySelector('.about-close').addEventListener('click', dismiss);
  dialog.addEventListener('click', event => { if (event.target === dialog) dismiss(); });
  dialog.querySelectorAll('[data-about-destination]').forEach(link => link.addEventListener('click', event => {
    restoreFocus = false;
    dialog.close();
    if (document.body.dataset.page !== 'home') return;
    event.preventDefault();
    if (link.dataset.aboutDestination === 'customize') navigateToCustomizer();
    else {
      renderHomeBelowFold();
      if (location.hash !== '#collection') history.pushState(null, '', '#collection');
      const heading = document.querySelector('#collection h2');
      heading?.setAttribute('tabindex', '-1');
      document.querySelector('#collection')?.scrollIntoView({ behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
      heading?.focus({ preventScroll:true });
    }
  }));
  dialog.addEventListener('close', () => {
    document.body.classList.remove('about-open');
    if (restoreFocus && returnTarget?.isConnected) returnTarget.focus({ preventScroll:true });
    dialog.remove();
  }, { once:true });
  document.body.append(dialog);
  document.body.classList.add('about-open');
  dialog.showModal();
}

function initAbout() {
  document.querySelectorAll('[data-open-about]').forEach(link => link.addEventListener('click', event => {
    event.preventDefault();
    openAbout(link);
  }));
}

function couponByCode(code) {
  const normalized = String(code || '').trim().toUpperCase();
  if (normalized === friendCouponCode) return { code:friendCouponCode, percent:30, custom:true };
  if (normalized === promoCode && promoIsActive()) return { code:promoCode, percent:20, custom:false };
  return null;
}
function activeCoupon() {
  let code = couponMemory;
  if (code === undefined) { try { code = sessionStorage.getItem(appliedCouponStorageKey); } catch (_) {} }
  return couponByCode(code);
}
function discountedPrice(price, coupon, custom = false) {
  return coupon && (!custom || coupon.custom) ? Math.round(price * (100 - coupon.percent)) / 100 : price;
}
function cartPrice(product, coupon = activeCoupon()) {
  if (coupon === true) coupon = couponByCode(promoCode);
  return discountedPrice(product.price, coupon, Boolean(product.custom));
}
function isCouponApplied() { return Boolean(activeCoupon()); }
function priceMarkup(product, className = 'price', custom = false) {
  const coupon = activeCoupon();
  const price = discountedPrice(product.price, coupon, custom);
  const discounted = price !== product.price;
  return `<span class="${className}${discounted ? ' is-discounted' : ''}" data-price-base="${product.price}" data-price-custom="${custom}">${discounted ? `<del title="${isHebrew ? 'מחיר מקורי' : 'Original price'}">${formatPrice(product.price)}</del>` : ''}<strong>${formatPrice(price)}</strong>${discounted ? `<span class="price-offer" dir="auto">${isHebrew ? `${coupon.percent}% הנחה` : `${coupon.percent}% off`}</span>` : ''}</span>`;
}
function couponLabel(coupon) {
  return isHebrew ? `הנחה · ${coupon.percent}%` : `Offer · ${coupon.percent}%`;
}
function refreshPriceDisplays() {
  document.querySelectorAll('[data-price-base]').forEach(element => {
    const price = Number(element.dataset.priceBase);
    const custom = element.dataset.priceCustom === 'true';
    element.outerHTML = priceMarkup({price}, element.classList.contains('product-price') ? 'product-price' : 'price', custom);
  });
  document.querySelectorAll('[data-quick-product]').forEach(link => {
    const product = ROMIC_PRODUCTS.find(item => item.id === link.dataset.quickProduct);
    if (product) link.setAttribute('aria-label', `${product.name}, ${formatPrice(currentPrice(product))}, ${product.size}`);
  });
  document.querySelector('[data-refresh-custom-price]')?.dispatchEvent(new Event('romic:price-refresh'));
  renderCartContents();
}
function setCoupon(code) {
  couponMemory = code || '';
  try { if (code) sessionStorage.setItem(appliedCouponStorageKey, code); else sessionStorage.removeItem(appliedCouponStorageKey); } catch (_) {}
  refreshPriceDisplays();
}
function whatsappUrl(message) { return `${whatsappBase}?text=${encodeURIComponent(message)}`; }

const preparedShareFiles = new Map();
function primeShareFiles(items) {
  if (typeof File !== 'function') return;
  items.forEach(item => {
    const url = new URL(item.url, location.href).href;
    if (preparedShareFiles.has(url)) return;
    preparedShareFiles.set(url, null);
    fetch(url, { cache: 'force-cache' }).then(response => {
      if (!response.ok) throw new Error('Image could not be loaded for sharing');
      return response.blob();
    }).then(blob => {
      const extension = new URL(url).pathname.split('.').pop()?.toLowerCase() || 'jpg';
      const type = blob.type || (extension === 'png' ? 'image/png' : 'image/jpeg');
      preparedShareFiles.set(url, new File([blob], `${item.name}.${extension}`, { type }));
    }).catch(() => preparedShareFiles.delete(url));
  });
}
function shareImagesOrWhatsApp(event, items, message) {
  event.preventDefault();
  const files = items.map(item => preparedShareFiles.get(new URL(item.url, location.href).href));
  const urls = items.map(item => new URL(item.url, location.href).href);
  const imagesLine = isHebrew ? 'תמונות התיקים שבחרת באתר:' : 'Images of your selected bags:';
  const fallback = whatsappUrl(`${message}\n${imagesLine}\n${urls.join('\n')}`);
  let canShareFiles = false;
  try {
    canShareFiles = files.length > 0 && files.every(Boolean)
      && typeof navigator.share === 'function'
      && typeof navigator.canShare === 'function'
      && navigator.canShare({ files });
  } catch (_) {}
  if (!canShareFiles) {
    location.assign(fallback);
    return;
  }
  try {
    navigator.share({ files, text: message, title: isHebrew ? 'הבחירה שלך ב־Romic' : 'Your Romic selection' })
      .catch(error => {
        if (error?.name !== 'AbortError') location.assign(fallback);
      });
  } catch (_) {
    location.assign(fallback);
  }
}

function icon(name) {
  const paths = {
    menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
    close:'<path d="m6 6 12 12M18 6 6 18"/>',
    arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',
    down:'<path d="M12 5v14M6 13l6 6 6-6"/>',
    bag:'<path d="M5 8h14l1 13H4L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
    instagram:'<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
    whatsapp:'<path d="M20.3 11.6a8.3 8.3 0 0 1-12.2 7.3L4 20l1.2-4A8.3 8.3 0 1 1 20.3 11.6Z"/><path d="M8.7 8.5c.3-.5.6-.5.9-.5h.4c.2 0 .4.1.5.4l.7 1.7c.1.2 0 .4-.1.6l-.5.6c-.2.2-.2.4 0 .6.4.7 1 1.3 1.7 1.7.2.1.4.1.6-.1l.7-.8c.2-.2.4-.2.7-.1l1.6.8c.3.1.4.3.3.6-.1.6-.4 1.1-.9 1.4-.5.3-1.1.4-1.7.2-1-.3-2.3-.8-3.6-2.1s-1.8-2.6-2.1-3.6c-.2-.5-.1-1.1.2-1.6Z"/>'
  };
  return `<svg class="icon icon-${name}" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths[name] || ''}</svg>`;
}

function instagramLink(label, className = '') {
  return `<a class="${className}" href="${instagramProfile}" target="_blank" rel="external noopener" aria-label="${label} — ${copy.openInstagram}">${label}</a>`;
}

function bagIcon() {
  return `<svg class="icon icon-bag" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8h14l1 13H4L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>`;
}

function toast(message) {
  let element = document.querySelector('[data-toast]');
  if (!element) {
    element = document.createElement('div'); element.className = 'site-toast'; element.dataset.toast = '';
    element.setAttribute('role', 'status'); element.setAttribute('aria-live', 'polite'); document.body.append(element);
  }
  element.textContent = message; element.classList.add('is-visible'); clearTimeout(toast.timer);
  toast.timer = setTimeout(() => element.classList.remove('is-visible'), 3600);
}

function enableImageFallbacks() {
  if (document.documentElement.dataset.imageFallbackReady) return;
  document.documentElement.dataset.imageFallbackReady = 'true';
  document.addEventListener('error', event => {
    const image = event.target.closest?.('img[data-fallback-src]');
    if (!image || image.dataset.fallbackUsed) return;
    image.dataset.fallbackUsed = 'true';
    image.removeAttribute('srcset');
    image.src = image.dataset.fallbackSrc;
  }, true);
}

function rememberHomePosition() {
  let state = { expanded: false, query: '', category: 'all', sort: 'featured', scrollY: window.scrollY };
  try { state = { ...state, ...JSON.parse(sessionStorage.getItem(collectionStorageKey) || '{}'), scrollY: window.scrollY }; } catch (_) {}
  sessionStorage.setItem(collectionStorageKey, JSON.stringify(state));
  sessionStorage.setItem(collectionReturnKey, '1');
}

function goToProduct(id) {
  if (!ROMIC_PRODUCTS.some(product => product.id === id)) return;
  rememberHomePosition();
  homeInternalDeparture = true;
  location.href = `product.html?id=${encodeURIComponent(id)}`;
}

function getSavedPicks() {
  try { return [...new Set(JSON.parse(localStorage.getItem(savedPicksKey) || '[]'))].filter(id => ROMIC_PRODUCTS.some(product => product.id === id)); }
  catch (_) { return []; }
}

function setSavedPicks(ids) {
  try { localStorage.setItem(savedPicksKey, JSON.stringify([...new Set(ids)])); } catch (_) {}
  document.dispatchEvent(new CustomEvent('romic:picks-changed'));
}

const deliveryStorageKey = 'romic:delivery-method';
let selectedDeliveryMethod;
function getDeliveryMethod() {
  if (selectedDeliveryMethod) return selectedDeliveryMethod;
  try { return sessionStorage.getItem(deliveryStorageKey) === 'delivery' ? 'delivery' : 'pickup'; }
  catch (_) { return 'pickup'; }
}
function calculateCart(products, couponApplied, method) {
  const subtotal = products.reduce((sum, product) => sum + product.price, 0);
  const discountedSubtotal = products.reduce((sum, product) => sum + cartPrice(product, couponApplied), 0);
  const shipping = method === 'pickup' ? 0 : deliveryPrice;
  return { subtotal, discount: subtotal - discountedSubtotal, shipping, total: discountedSubtotal + shipping };
}
function makeWhatsappMessage(products, couponApplied = activeCoupon(), method = getDeliveryMethod()) {
  const lines = products.map(product => `${product.name} · ${product.size} · ${formatPrice(cartPrice(product, couponApplied))}`);
  const intro = isHebrew ? 'היי, אשמח להזמין:' : 'Hi, I’d like to order:';
  const coupon = couponApplied === true ? couponByCode(promoCode) : couponApplied;
  const offer = coupon ? `\n${isHebrew ? 'קוד קופון' : 'Coupon'} ${coupon.code} · ${coupon.percent}%` : '';
  const totals = calculateCart(products, couponApplied, method);
  const receiving = method === 'pickup' ? `${copy.pickup} · ${copy.free}` : `${copy.delivery} · ${formatPrice(totals.shipping)}`;
  return `${intro}\n${lines.join('\n')}${offer}\n${receiving}\n${copy.total}: ${formatPrice(totals.total)}`;
}

function openCart() {
  const dialog = document.querySelector('[data-cart-dialog]');
  if (!dialog) return;
  renderCartContents();
  if (!dialog.open) dialog.showModal();
}

function renderCartContents() {
  const dialog = document.querySelector('[data-cart-dialog]');
  const body = dialog?.querySelector('[data-cart-content]');
  if (!body) return;
  const products = getSavedPicks().map(id => ROMIC_PRODUCTS.find(product => product.id === id)).filter(Boolean);
  primeShareFiles(products.map(product => ({ url: `../assets/products/${product.image}`, name: `romic-${product.id}` })));
  const applied = activeCoupon();
  const couponDraft = body.querySelector('#cart-coupon-code')?.value || '';
  const method = getDeliveryMethod();
  const { subtotal, total, shipping, discount: discountAmount } = calculateCart(products, applied, method);
  const items = products.map(product => `<article class="cart-line"><a class="cart-thumb" href="product.html?id=${encodeURIComponent(product.id)}"><img src="../assets/gallery-thumbs/${product.image}" data-fallback-src="../assets/products/${product.image}" alt="${product.name}" loading="lazy" decoding="async" width="240" height="300"></a><div class="cart-line-info"><a href="product.html?id=${encodeURIComponent(product.id)}">${product.name}</a><small>${product.size} · ${product.width} × ${product.height} cm</small>${priceMarkup(product,'price')}</div><button type="button" class="cart-remove" data-cart-remove="${product.id}" aria-label="${copy.remove} ${product.name}">${copy.remove}</button></article>`).join('');
  const escapedDraft = (applied?.code || couponDraft).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const statusText = applied ? (isHebrew ? `הקוד הופעל · ${applied.percent}% הנחה${applied.custom ? ' על הקולקציה ועל עיצוב אישי' : ' על הקולקציה'}` : `${applied.percent}% applied to ${applied.custom ? 'collection and custom designs' : 'the collection'}`) : '';
  const couponMarkup = `<div class="cart-coupon"><label for="cart-coupon-code">${copy.couponLabel}</label><div><input id="cart-coupon-code" type="text" value="${escapedDraft}" placeholder="${copy.couponPlaceholder}" autocomplete="off" autocapitalize="characters" dir="ltr" aria-describedby="cart-coupon-status"><button type="button" data-apply-coupon>${copy.applyCoupon}</button></div><span id="cart-coupon-status" data-coupon-status role="status" aria-live="polite">${statusText}</span>${applied ? `<button class="coupon-remove" type="button" data-remove-coupon>${isHebrew ? 'הסירי את ההטבה' : 'Remove offer'}</button>` : ''}</div>`;
  const emptyMarkup = `<div class="cart-empty"><p>${copy.bagEmpty}</p><button class="button" type="button" data-cart-continue>${copy.keepBrowsing}</button></div>`;
  const totalsMarkup = `<fieldset class="cart-delivery"><legend>${copy.receiving}</legend><div class="cart-delivery-options">${['pickup','delivery'].map(value => `<label><input type="radio" name="cart-delivery" value="${value}" ${method === value ? 'checked' : ''}><span>${value === 'delivery' ? copy.delivery : copy.pickup}<strong>${value === 'delivery' ? formatPrice(deliveryPrice) : copy.free}</strong></span></label>`).join('')}</div></fieldset><dl class="cart-totals" aria-live="polite" aria-atomic="true"><div><dt>${copy.subtotal}</dt><dd>${formatPrice(subtotal)}</dd></div>${discountAmount ? `<div><dt>${couponLabel(applied)}</dt><dd>−${formatPrice(discountAmount)}</dd></div>` : ''}<div><dt>${method === 'pickup' ? copy.pickup : copy.shipping}</dt><dd>${shipping ? formatPrice(shipping) : copy.free}</dd></div><div class="cart-total"><dt>${copy.total}</dt><dd>${formatPrice(total)}</dd></div></dl><a class="button cart-whatsapp" href="${whatsappUrl(makeWhatsappMessage(products, applied, method))}" target="_blank" rel="external noopener" aria-label="${copy.openWhatsapp}">${icon('whatsapp')} ${copy.whatsapp}</a><p class="cart-terms">${applied?.code === promoCode ? copy.promoMessage : ''} <a href="terms.html">${copy.terms}</a></p>`;
  body.innerHTML = (products.length ? `<div class="cart-lines">${items}</div>` : emptyMarkup) + couponMarkup + (products.length ? totalsMarkup : '');
  body.querySelectorAll('input[name=cart-delivery]').forEach(input => input.addEventListener('change', () => {
    if (!input.checked) return;
    selectedDeliveryMethod = input.value;
    try { sessionStorage.setItem(deliveryStorageKey, input.value); } catch (_) {}
    const value = input.value;
    renderCartContents();
    body.querySelector(`input[name=cart-delivery][value=${value}]`)?.focus({preventScroll:true});
  }));
  body.querySelector('[data-apply-coupon]')?.addEventListener('click', () => {
    const input = body.querySelector('#cart-coupon-code');
    const status = body.querySelector('[data-coupon-status]');
    const normalized = input.value.trim().toUpperCase();
    const coupon = couponByCode(normalized);
    if (!coupon) {
      status.textContent = normalized === promoCode && !promoIsActive() ? copy.couponExpired : copy.couponInvalid;
      status.dataset.error = 'true'; input.setAttribute('aria-invalid', 'true'); input.focus(); return;
    }
    setCoupon(coupon.code);
    body.querySelector('#cart-coupon-code')?.focus({preventScroll:true});
  });
  body.querySelector('[data-remove-coupon]')?.addEventListener('click', () => {
    setCoupon('');
    body.querySelector('#cart-coupon-code').value = '';
    body.querySelector('#cart-coupon-code')?.focus({preventScroll:true});
  });
  const couponInput = body.querySelector('#cart-coupon-code');
  couponInput?.addEventListener('keydown', event => {
    if (event.key !== 'Enter') return;
    event.preventDefault(); body.querySelector('[data-apply-coupon]')?.click();
  });
  couponInput?.addEventListener('input', () => {
    couponInput.removeAttribute('aria-invalid');
    const status = body.querySelector('[data-coupon-status]');
    if (status?.dataset.error) { status.textContent = ''; delete status.dataset.error; }
  });
  body.querySelectorAll('[data-cart-remove]').forEach(button => button.addEventListener('click', () => setSavedPicks(getSavedPicks().filter(id => id !== button.dataset.cartRemove))));
  body.querySelector('[data-cart-continue]')?.addEventListener('click', () => dialog.close());
  body.querySelector('.cart-whatsapp')?.addEventListener('click', event => {
    const message = makeWhatsappMessage(products, activeCoupon(), getDeliveryMethod());
    event.currentTarget.href = whatsappUrl(message);
    shareImagesOrWhatsApp(event, products.map(product => ({ url: `../assets/products/${product.image}`, name: `romic-${product.id}` })), message);
  });
  enableImageFallbacks();
}

function initCart() {
  if (document.querySelector('[data-cart-dialog]')) { renderSavedPicks(); return; }
  const dialog = document.createElement('dialog');
  dialog.className = 'cart-dialog'; dialog.dataset.cartDialog = '';
  dialog.setAttribute('aria-labelledby', 'cart-title');
  dialog.innerHTML = `<div class="cart-panel"><header class="cart-head"><h2 id="cart-title">${copy.bagTitle}</h2><button class="cart-close" type="button" aria-label="${isHebrew ? 'סגירת הסל' : 'Close bag'}">${icon('close')}</button></header><div data-cart-content></div></div>`;
  dialog.querySelector('.cart-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => document.querySelector('[data-open-cart]')?.focus());
  document.body.append(dialog);
  document.addEventListener('click', event => {
    const openButton = event.target.closest('[data-open-cart]');
    if (openButton) { event.preventDefault(); openCart(); }
    const addButton = event.target.closest('[data-add-to-bag]');
    if (addButton) {
      event.preventDefault();
      const ids = getSavedPicks();
      const alreadyAdded = ids.includes(addButton.dataset.addToBag);
      if (!alreadyAdded) setSavedPicks([...ids, addButton.dataset.addToBag]);
      else renderSavedPicks();
      toast(alreadyAdded ? copy.saved : copy.addConfirmation);
      if (addButton.hasAttribute('data-open-bag-after-add')) openCart();
    }
  });
  document.addEventListener('romic:picks-changed', renderSavedPicks);
  renderSavedPicks();
  refreshPromotionState();
}

function heartIcon(filled = false) {
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" ${filled ? 'fill="currentColor"' : 'fill="none"'} stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}

function localeUrl(nextLanguage) {
  const path = location.pathname.replace(/\/(en|he)(?=\/|$)/, `/${nextLanguage}`);
  return `${path}${location.search}${location.hash}`;
}

function updateAlternateLinks() {
  const page = document.body.dataset.page;
  const productId = new URLSearchParams(location.search).get('id');
  ['en', 'he'].forEach(nextLanguage => {
    let link = document.querySelector(`link[rel="alternate"][hreflang="${nextLanguage}"]`);
    if (!link) {
      link = document.createElement('link'); link.rel = 'alternate'; link.hreflang = nextLanguage;
      document.head.append(link);
    }
    const suffix = page === 'product'
      ? `/product.html${productId ? `?id=${encodeURIComponent(productId)}` : ''}`
      : page === 'document' ? `/${document.body.dataset.doc}.html` : '/';
    link.href = `${location.origin}${siteBasePath}/${nextLanguage}${suffix}`;
  });
}

function setMetaDescription(content) {
  let description = document.querySelector('meta[name="description"]');
  if (!description) {
    description = document.createElement('meta'); description.name = 'description'; document.head.append(description);
  }
  description.content = content;
}

function replaceCanonical(href) {
  document.querySelectorAll('link[data-romic-canonical]').forEach(link => link.remove());
  const canonical = document.createElement('link');
  canonical.rel = 'canonical'; canonical.href = href; canonical.dataset.romicCanonical = '';
  document.head.append(canonical);
}

function renderInstagramSection() {
  const section = document.querySelector('.instagram-callout');
  if (!section || section.querySelector('video')) return;
  section.innerHTML = `<div class="instagram-editorial"><p>${isHebrew ? 'מהסטודיו של ROMIC' : 'FROM THE ROMIC STUDIO'}</p><h2 id="instagram-title">${isHebrew ? 'נפגשות<br>באינסטגרם.' : 'MEET US ON<br>INSTAGRAM.'}</h2><div class="instagram-caption">${isHebrew ? 'תיקים חדשים, רגעים מהסטודיו וכל מה שבדרך.' : 'New bags, studio moments and everything in the making.'}</div>${instagramLink(isHebrew ? 'בואי לראות אותנו' : 'Come say hello', 'button')}</div><div class="instagram-film"><video muted loop playsinline preload="none" poster="../assets/promo/studio-poster.webp" aria-label="${isHebrew ? 'סרטון מהסטודיו של ROMIC' : 'ROMIC studio film'}"><source src="../assets/promo/studio-reel.mp4" type="video/mp4"></video><button type="button" class="film-toggle" aria-label="${isHebrew ? 'הפעלת הסרטון' : 'Play video'}">▶</button><a class="film-instagram" href="${instagramReel}" target="_blank" rel="external noopener">${icon('instagram')}<span>${isHebrew ? 'צפי ברילס באינסטגרם' : 'Watch the reel on Instagram'}</span></a></div>`;
  const video = section.querySelector('video');
  const button = section.querySelector('.film-toggle');
  let visible = false;
  let manuallyPaused = false;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const autoPlay = () => !reducedMotion.matches && !navigator.connection?.saveData;
  const syncButton = () => {
    button.textContent = video.paused ? '▶' : 'Ⅱ';
    button.setAttribute('aria-label', isHebrew ? (video.paused ? 'הפעלת הסרטון' : 'השהיית הסרטון') : (video.paused ? 'Play video' : 'Pause video'));
  };
  const sync = () => {
    if (visible && !document.hidden && !manuallyPaused && autoPlay()) video.play().catch(syncButton);
    else video.pause();
  };
  button.addEventListener('click', () => {
    if (video.paused) { manuallyPaused = false; video.play().catch(syncButton); }
    else { manuallyPaused = true; video.pause(); }
  });
  video.addEventListener('play', syncButton);
  video.addEventListener('pause', syncButton);
  document.addEventListener('romic:locale-changed', syncButton);
  if ('IntersectionObserver' in window) new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    sync();
  }, {threshold:.15}).observe(video);
  document.addEventListener('visibilitychange', sync);
  reducedMotion.addEventListener?.('change', sync);
}

function applyHomeCopy() {
  const locale = HOME_LOCALE[language];
  document.title = locale.title;
  setMetaDescription(locale.description);
  replaceCanonical(`${location.origin}${siteBasePath}/${language}/`);
  updateAlternateLinks();
  document.querySelector('[data-hero-kicker]').textContent = copy.heroKicker;
  document.querySelector('[data-hero-title]').innerHTML = copy.heroTitle.replace('\n', '<br>');
  const heroIntro = document.querySelector('[data-hero-intro]');
  heroIntro.textContent = copy.heroIntro;
  heroIntro.hidden = !copy.heroIntro;
  document.querySelector('[data-hero-button]').textContent = copy.heroButton;
  document.querySelector('[data-collection-title]').textContent = copy.collectionTitle;
  document.querySelector('[data-scroll-cue]')?.replaceChildren(document.createTextNode(copy.scroll), document.createRange().createContextualFragment(icon('down')));
  document.querySelector('[data-open-finder] span').textContent = copy.finderHint;
  document.querySelector('[data-open-finder] strong').textContent = copy.finderOpen;
  document.querySelector('[data-filter-toggle] span').textContent = copy.filters;

  renderInstagramSection();
  const heroMedia = document.querySelector('.hero-media');
  if (heroMedia) heroMedia.setAttribute('aria-label', locale.conveyorLabel);
  const search = document.querySelector('[data-product-search]');
  if (search) search.placeholder = copy.search;
  const searchLabel = document.querySelector('.collection-search .visually-hidden');
  if (searchLabel) searchLabel.textContent = locale.searchLabel;
  document.querySelector('.collection-tools')?.setAttribute('aria-label', locale.toolsLabel);
  document.querySelector('.collection-categories')?.setAttribute('aria-label', locale.categoriesLabel);
  document.querySelectorAll('[data-product-category]').forEach((button, index) => { if (locale.categories[index]) button.textContent = locale.categories[index]; });
  const sortLabel = document.querySelector('.collection-sort > span');
  if (sortLabel) sortLabel.textContent = locale.sortLabel;
  document.querySelectorAll('[data-product-sort] option').forEach((option, index) => { if (locale.sorts[index]) option.textContent = locale.sorts[index]; });

  renderServiceDetails();

  const faqIntro = document.querySelector('.faq-intro');
  if (faqIntro) {
    faqIntro.querySelector('.faq-kicker').textContent = locale.faqKicker;
    faqIntro.querySelector('h2').innerHTML = locale.faqTitle;
    faqIntro.querySelector('p:last-child').textContent = locale.faqIntro;
  }
  document.querySelectorAll('.faq-item').forEach((item, index) => {
    const entry = currentFaqs()[index];
    if (!entry) return;
    item.querySelector('summary').textContent = entry[0];
    item.querySelector('p').textContent = entry[1];
    if (index === 7) {
      const link = document.createElement('a');
      link.href = 'terms.html#returns';
      link.textContent = isHebrew ? 'לתנאי ההחזרות והביטולים' : 'Returns & cancellation terms';
      item.querySelector('p').append(document.createTextNode(' '), link);
    }
  });
  const faqContact = document.querySelector('.faq-contact');
  if (faqContact) {
    faqContact.textContent = locale.faqContact;
    faqContact.href = whatsappUrl(locale.faqMessage);
    faqContact.setAttribute('aria-label', copy.openWhatsapp);
  }
  const callout = document.querySelector('.instagram-callout');
  if (callout) {
    callout.querySelector('p').textContent = isHebrew ? 'מהסטודיו של ROMIC' : 'FROM THE ROMIC STUDIO';
    callout.querySelector('h2').innerHTML = isHebrew ? 'נפגשות<br>באינסטגרם.' : 'MEET US ON<br>INSTAGRAM.';
    callout.querySelector('.button').textContent = isHebrew ? 'בואי לראות אותנו' : 'Come say hello';
    callout.querySelector('.button').setAttribute('aria-label', `${callout.querySelector('.button').textContent} — ${copy.openInstagram}`);
    callout.querySelector('.instagram-caption').textContent = isHebrew ? 'תיקים חדשים, רגעים מהסטודיו וכל מה שבדרך.' : 'New bags, studio moments and everything in the making.';
    callout.querySelector('.film-instagram span').textContent = isHebrew ? 'צפי ברילס באינסטגרם' : 'Watch the reel on Instagram';
    callout.querySelector('video').setAttribute('aria-label', isHebrew ? 'סרטון מהסטודיו של ROMIC' : 'ROMIC studio film');
  }

  document.querySelectorAll('[data-conveyor-product]:not([aria-hidden="true"])').forEach(card => {
    const product = ROMIC_PRODUCTS.find(item => item.id === card.dataset.conveyorProduct);
    const image = card.querySelector('img');
    if (product && image) image.alt = `${product.name} — ${isHebrew ? product.he : product.en}`;
  });
}

function setLanguage(nextLanguage, historyMode = 'replace') {
  if (!COPY[nextLanguage] || nextLanguage === language) return;
  const scrollPosition = { left: window.scrollX, top: window.scrollY };
  document.querySelector('[data-finder]')?.remove();
  language = nextLanguage; isHebrew = language === 'he'; copy = COPY[language];
  document.documentElement.lang = language;
  document.documentElement.dir = isHebrew ? 'rtl' : 'ltr';
  try { localStorage.setItem('romic:language', language); } catch (_) {}
  if (historyMode === 'replace') history.replaceState({ language }, '', localeUrl(language));

  const page = document.body.dataset.page;
  if (page === 'home') {
    localizeShellInPlace();
    applyHomeCopy();
    if (homeBelowFoldReady) {
      renderCustomizer();
      renderSavedPicks();
    } else renderHomeBelowFold();
    document.dispatchEvent(new CustomEvent('romic:locale-changed'));
  }
  if (page === 'product') renderProduct();
  if (page === 'document') renderDocument();
  const restoreScroll = () => {
    const previousBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(scrollPosition.left, scrollPosition.top);
    document.documentElement.style.scrollBehavior = previousBehavior;
  };
  restoreScroll();
  requestAnimationFrame(restoreScroll);
  setTimeout(restoreScroll, 0);
}

function enableLanguageSwitching() {
  if (document.documentElement.dataset.languageSwitchReady) return;
  document.documentElement.dataset.languageSwitchReady = 'true';
  document.addEventListener('click', event => {
    const link = event.target.closest('[data-language-link]');
    if (!link || event.defaultPrevented || event.button > 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    setLanguage(link.dataset.languageLink);
  });
  window.addEventListener('popstate', () => {
    const routeLanguage = location.pathname.match(/\/(en|he)(?:\/|$)/)?.[1];
    if (routeLanguage && routeLanguage !== language) setLanguage(routeLanguage, 'none');
  });
}

function header() {
  const siteRoot = './';
  const isProductPage = document.body.dataset.page === 'product';
  const isDocumentPage = document.body.dataset.page === 'document';
  const otherLanguage = `${isHebrew ? '../en/' : '../he/'}${isProductPage ? `product.html${location.search}` : isDocumentPage ? `${document.body.dataset.doc}.html` : ''}`;
  const navigation = `<a href="${siteRoot}#collection">${copy.collection}</a><a href="${siteRoot}#customize">${copy.craft}</a><a href="${siteRoot}#faq">${copy.faq}</a>`;
  const aboutLink = `<a href="#about-romic" data-open-about aria-haspopup="dialog">${isHebrew ? 'הכירי את ROMIC' : 'Meet ROMIC'}</a>`;
  const cartButton = `<button class="bag-link" type="button" data-open-cart aria-label="${copy.bag}">${bagIcon()} <span data-cart-label>${copy.bag}</span><span class="bag-count" data-cart-count>0</span></button>`;
  return `<a class="skip-link" href="#main">${copy.skip}</a><header class="site-header">
    <a class="brand" href="${siteRoot}" aria-label="Romic home"><img class="brand-wordmark" src="../assets/romic-wordmark-vector.svg" alt="Romic — Handmade Bags" width="208" height="76"></a>
    <nav class="primary-nav" aria-label="${isHebrew ? 'ניווט ראשי' : 'Primary navigation'}">${navigation}</nav>
    <div class="header-actions"><a class="language-link" href="${otherLanguage}" data-language-link="${isHebrew ? 'en' : 'he'}">${copy.language}</a>${cartButton}${instagramLink(copy.instagram, 'instagram-link')}<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="${copy.menu}" data-menu-toggle>${icon('menu')}</button></div>
    <div class="menu-backdrop" data-menu-backdrop hidden></div><aside class="mobile-menu" id="mobile-menu" aria-hidden="true" data-mobile-menu><div class="mobile-menu-head"><img class="menu-wordmark" src="../assets/romic-wordmark-vector.svg" alt="Romic — Handmade Bags" width="164" height="60"><button type="button" aria-label="${copy.close}" data-menu-close>${icon('close')}</button></div><nav aria-label="${isHebrew ? 'ניווט נייד' : 'Mobile navigation'}">${navigation}${aboutLink}<button class="menu-cart-row" type="button" data-open-cart>${bagIcon()}<span data-cart-label>${copy.bag}</span><span data-cart-count>0</span></button></nav><div class="mobile-menu-foot"><a href="${otherLanguage}" data-language-link="${isHebrew ? 'en' : 'he'}">${copy.language}</a>${instagramLink('@ROMIC_BRAND')}</div></aside></header>`;
}

function footer() {
  return `<footer class="site-footer"><img class="footer-wordmark" src="../assets/romic-wordmark-vector.svg" alt="Romic — Handmade Bags" width="300" height="110"><a class="footer-about" href="#about-romic" data-open-about aria-haspopup="dialog">${isHebrew ? 'הכירי את ROMIC' : 'Meet ROMIC'}</a><div class="footer-grid">
    <div><p>${copy.handmade}</p><p>${copy.rights}</p></div>
    <nav class="footer-links" aria-label="${isHebrew ? 'קישורי מידע' : 'Information links'}"><a href="privacy.html">${copy.privacy}</a><a href="accessibility.html">${copy.accessibility}</a><a href="terms.html">${copy.terms}</a><a href="mailto:romic.brand@gmail.com">${copy.email}</a>${instagramLink(copy.instagram)}<a href="terms.html#returns" data-returns-link>${isHebrew ? 'החזרות וביטולים' : 'Returns & cancellations'}</a></nav>
  </div></footer>`;
}

function renderShell() {
  document.querySelector('[data-header]').innerHTML = header();
  document.querySelector('[data-footer]').innerHTML = footer();
  try { localStorage.setItem('romic:language', language); } catch (_) {}
  enableImageFallbacks();
  initMenu();
  initAbout();
  initCart();
}

function localizeShellInPlace() {
  const navigationLabels = [copy.collection, copy.craft, copy.faq];
  const skipLink = document.querySelector('.skip-link');
  if (skipLink) skipLink.textContent = copy.skip;
  document.querySelectorAll('.primary-nav a').forEach((link, index) => { if (navigationLabels[index]) link.textContent = navigationLabels[index]; });
  document.querySelector('.primary-nav')?.setAttribute('aria-label', isHebrew ? 'ניווט ראשי' : 'Primary navigation');
  document.querySelectorAll('.mobile-menu nav a').forEach((link, index) => { if (navigationLabels[index]) link.textContent = navigationLabels[index]; });
  document.querySelector('.mobile-menu nav')?.setAttribute('aria-label', isHebrew ? 'ניווט נייד' : 'Mobile navigation');
  document.querySelector('[data-menu-toggle]')?.setAttribute('aria-label', copy.menu);
  document.querySelector('[data-menu-close]')?.setAttribute('aria-label', copy.close);
  document.querySelectorAll('[data-language-link]').forEach(link => {
    const targetLanguage = isHebrew ? 'en' : 'he';
    link.textContent = copy.language;
    link.dataset.languageLink = targetLanguage;
    link.href = localeUrl(targetLanguage);
  });
  document.querySelectorAll('.instagram-link').forEach(link => link.setAttribute('aria-label', `${copy.instagram} — ${copy.openInstagram}`));
  document.querySelectorAll('[data-cart-label]').forEach(label => label.textContent = copy.bag);
  document.querySelectorAll('[data-open-cart]').forEach(button => button.setAttribute('aria-label', copy.bag));
  const cartTitle = document.querySelector('#cart-title');
  if (cartTitle) cartTitle.textContent = copy.bagTitle;
  renderSavedPicks();

  const footerCopy = document.querySelectorAll('.footer-grid > div p');
  if (footerCopy[0]) footerCopy[0].textContent = copy.handmade;
  if (footerCopy[1]) footerCopy[1].textContent = copy.rights;
  const footerLinks = document.querySelectorAll('.footer-links a');
  [copy.privacy, copy.accessibility, copy.terms, copy.email, copy.instagram].forEach((label, index) => { if (footerLinks[index]) footerLinks[index].textContent = label; });
  document.querySelector('[data-returns-link]')?.replaceChildren(document.createTextNode(isHebrew ? 'החזרות וביטולים' : 'Returns & cancellations'));
  document.querySelector('.footer-links')?.setAttribute('aria-label', isHebrew ? 'קישורי מידע' : 'Information links');
  document.querySelectorAll('[data-open-about]').forEach(link => { link.textContent = isHebrew ? 'הכירי את ROMIC' : 'Meet ROMIC'; });
}

function initMenu() {
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-mobile-menu]');
  const backdrop = document.querySelector('[data-menu-backdrop]');
  if (!toggle || !menu || !backdrop) return;
  const close = () => { toggle.setAttribute('aria-expanded','false'); menu.setAttribute('aria-hidden','true'); backdrop.hidden = true; document.body.classList.remove('menu-open'); toggle.focus(); };
  const open = () => { toggle.setAttribute('aria-expanded','true'); menu.setAttribute('aria-hidden','false'); backdrop.hidden = false; document.body.classList.add('menu-open'); menu.querySelector('a,button')?.focus(); };
  toggle.addEventListener('click', () => toggle.getAttribute('aria-expanded') === 'true' ? close() : open());
  menu.querySelector('[data-menu-close]')?.addEventListener('click', close);
  backdrop.addEventListener('click', close);
  menu.querySelectorAll('a,[data-open-cart]').forEach(link => link.addEventListener('click', close));
  if (menuEscapeHandler) document.removeEventListener('keydown', menuEscapeHandler);
  menuEscapeHandler = event => { if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') close(); };
  document.addEventListener('keydown', menuEscapeHandler);
}

function productCard(product) {
  const [tone, background] = productDesign[product.id] || ['stone', '#e1d9cf'];
  const added = getSavedPicks().includes(product.id);
  const supportsHoverPreview = matchMedia('(hover:hover) and (pointer:fine)').matches;
  const alternateImage = supportsHoverPreview && product.gallery?.[1]
    ? `<img class="product-image-alt" data-alt-src="../assets/cards/600/${product.gallery[1]}" data-alt-srcset="../assets/cards/600/${product.gallery[1]} 600w, ../assets/cards/900/${product.gallery[1]} 900w" sizes="(max-width:900px) 48vw, (max-width:1500px) 31vw, 460px" data-fallback-src="../assets/products/${product.gallery[1]}" alt="" decoding="async" width="900" height="1125">`
    : '';
  return `<article class="product-card" data-tone="${tone}" data-product-id="${product.id}" style="--card-bg:${background}">
    <button class="save-pick" type="button" data-add-to-bag="${product.id}" aria-label="${added ? copy.saved : copy.save} ${product.name}" aria-pressed="${added}">${bagIcon()}</button>
    <a class="product-card-link" data-quick-product="${product.id}" href="product.html?id=${product.id}" aria-label="${product.name}, ${formatPrice(currentPrice(product))}, ${product.size}, ${product.width} × ${product.height} cm">
      <div class="product-image"><img class="product-image-primary" src="../assets/cards/600/${product.image}" srcset="../assets/cards/600/${product.image} 600w, ../assets/cards/900/${product.image} 900w" sizes="(max-width:900px) 48vw, (max-width:1500px) 31vw, 460px" data-fallback-src="../assets/products/${product.image}" alt="${product.name} — ${isHebrew ? product.he : product.en}" loading="lazy" decoding="async" width="900" height="1125">${alternateImage}</div>
      <div class="product-meta"><h3>${product.name}</h3>${priceMarkup(product)}<span class="product-card-size">${product.size} · ${product.width} × ${product.height} cm</span></div>
    </a></article>`;
}

function renderCollection() {
  const grid = document.querySelector('[data-products]');
  const button = document.querySelector('[data-show-all]');
  const search = document.querySelector('[data-product-search]');
  const sort = document.querySelector('[data-product-sort]');
  const categoryButtons = [...document.querySelectorAll('[data-product-category]')];
  const filterToggle = document.querySelector('[data-filter-toggle]');
  const filterPanel = document.querySelector('[data-filter-panel]');
  const results = document.querySelector('[data-product-results]');
  const firstIds = ['marrakech', 'rio', 'ibiza', 'porto', 'florence', 'paris'];
  const returning = sessionStorage.getItem(collectionReturnKey) === '1' && !['#craft','#customize'].includes(location.hash);
  let state = { expanded: false, query: '', category: 'all', sort: 'featured', scrollY: 0 };
  if (returning) {
    try { state = { ...state, ...JSON.parse(sessionStorage.getItem(collectionStorageKey) || '{}') }; } catch (_) {}
  }

  function saveState() {
    sessionStorage.setItem(collectionStorageKey, JSON.stringify({ ...state, scrollY: window.scrollY }));
  }

  function visibleProducts() {
    const query = state.query.trim().toLowerCase();
    const filtering = query || state.category !== 'all' || state.sort !== 'featured';
    let products = (state.expanded || filtering)
      ? catalogOrder.map(id => ROMIC_PRODUCTS.find(product => product.id === id)).filter(Boolean)
      : firstIds.map(id => ROMIC_PRODUCTS.find(product => product.id === id)).filter(Boolean);
    products = products.filter(product => {
      const typeMatch = state.category === 'all' || (product.types || []).includes(state.category);
      const text = `${product.name} ${(product.types || []).join(' ')} ${product.en} ${product.he}`.toLowerCase();
      return typeMatch && (!query || text.includes(query));
    });
    if (state.sort === 'price-asc') products.sort((a, b) => a.price - b.price || a.name.localeCompare(b.name));
    if (state.sort === 'price-desc') products.sort((a, b) => b.price - a.price || a.name.localeCompare(b.name));
    return products;
  }

  function drawCollection() {
    const products = visibleProducts();
    grid.innerHTML = products.map(productCard).join('');
    grid.hidden = products.length === 0;
    results.hidden = products.length !== 0;
    results.textContent = products.length ? '' : copy.noResults;
    button.textContent = copy.fullCollection;
    button.closest('.collection-actions').hidden = state.expanded || state.query || state.category !== 'all' || state.sort !== 'featured';
    categoryButtons.forEach(item => item.setAttribute('aria-pressed', String(item.dataset.productCategory === state.category)));
    observeReveals(grid);
  }

  function loadAlternateImage(card) {
    const image = card?.querySelector('img[data-alt-src]');
    if (!image) return;
    const source = image.dataset.altSrc;
    const sourceSet = image.dataset.altSrcset;
    delete image.dataset.altSrc;
    delete image.dataset.altSrcset;
    if (sourceSet) image.srcset = sourceSet;
    image.src = source;
    const reveal = () => card.classList.add('has-alt-loaded');
    if (image.complete && image.naturalWidth) reveal();
    else image.addEventListener('load', reveal, { once:true });
  }

  search.value = state.query;
  sort.value = state.sort;
  button.addEventListener('click', () => {
    state.expanded = true;
    drawCollection();
    saveState();
    grid.children[6]?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
  });
  search.addEventListener('input', () => { state.query = search.value; state.expanded = true; drawCollection(); });
  sort.addEventListener('change', () => { state.sort = sort.value; state.expanded = true; drawCollection(); });
  categoryButtons.forEach(item => item.addEventListener('click', () => { state.category = item.dataset.productCategory; state.expanded = true; drawCollection(); }));
  filterToggle.addEventListener('click', () => {
    const isOpen = filterToggle.getAttribute('aria-expanded') === 'true';
    filterToggle.setAttribute('aria-expanded', String(!isOpen));
    filterToggle.lastElementChild.textContent = isOpen ? '+' : '−';
    filterPanel.hidden = isOpen;
  });
  document.addEventListener('click', event => {
    if (filterPanel.hidden || event.target.closest('.collection-tool-shell')) return;
    filterPanel.hidden = true;
    filterToggle.setAttribute('aria-expanded', 'false');
    filterToggle.lastElementChild.textContent = '+';
  });
  filterToggle.addEventListener('keydown', event => {
    if (event.key !== 'Escape' || filterPanel.hidden) return;
    filterPanel.hidden = true;
    filterToggle.setAttribute('aria-expanded', 'false');
    filterToggle.lastElementChild.textContent = '+';
  });
  grid.addEventListener('click', event => {
    const link = event.target.closest('[data-quick-product]');
    if (!link) return;
    saveState(); sessionStorage.setItem(collectionReturnKey, '1');
  });
  grid.addEventListener('pointerover', event => {
    if (!matchMedia('(hover:hover) and (pointer:fine)').matches) return;
    loadAlternateImage(event.target.closest('.product-card'));
  }, { passive:true });
  grid.addEventListener('focusin', event => loadAlternateImage(event.target.closest('.product-card')));
  drawCollection();
  observeCollectionColour(grid);
  document.addEventListener('romic:picks-changed', drawCollection);
  document.addEventListener('romic:locale-changed', drawCollection);

  if (returning) {
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (!window.__romicLaunchDismissedToTop) window.scrollTo({ top: Number(state.scrollY) || 0, behavior: 'auto' });
      sessionStorage.removeItem(collectionReturnKey);
    }));
  }
}

function observeCollectionColour(grid) {
  if (!('IntersectionObserver' in window)) return;
  const section = grid.closest('.collection');
  let observer;
  const connect = () => {
    observer?.disconnect();
    observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) section.style.setProperty('--collection-bg', getComputedStyle(visible.target).getPropertyValue('--card-bg').trim());
    }, { rootMargin: '-28% 0px -50% 0px', threshold: [0, .2, .5, .8] });
    grid.querySelectorAll('.product-card').forEach(card => observer.observe(card));
  };
  connect();
  new MutationObserver(connect).observe(grid, { childList:true });
}

let revealObserver;
function observeReveals(root = document) {
  const items = root.matches?.('.product-card, .service-item, .faq-item, .customizer-grid, .instagram-callout')
    ? [root]
    : [...root.querySelectorAll?.('.product-card, .service-item, .faq-item, .customizer-grid, .instagram-callout, .product-gallery, .product-info') || []];
  if (!items.length || matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }), { rootMargin: '0px 0px -8% 0px', threshold: .08 });
  }
  items.forEach((item, index) => {
    if (item.dataset.revealReady) return;
    item.dataset.revealReady = 'true';
    item.style.setProperty('--reveal-delay', `${Math.min(index % 3, 2) * 45}ms`);
    revealObserver.observe(item);
  });
}

function initFaq() {
  const list = document.querySelector('.faq-list');
  if (!list) return;
  list.querySelectorAll('details').forEach(item => item.addEventListener('toggle', () => {
    if (!item.open) return;
    list.querySelectorAll('details[open]').forEach(other => { if (other !== item) other.open = false; });
  }));
}

function renderSavedPicks() {
  let pill = document.querySelector('[data-saved-pill]');
  if (!pill) {
    pill = document.createElement('button'); pill.type = 'button'; pill.className = 'saved-pill'; pill.dataset.savedPill = ''; pill.dataset.openCart = '';
    document.body.append(pill);
  }
  const count = getSavedPicks().length;
  pill.hidden = !count; pill.innerHTML = `${bagIcon()} <span>${copy.bag} · ${count}</span>`;
  pill.setAttribute('aria-label', `${copy.bag} · ${count}`);
  const cartTitle = document.querySelector('#cart-title');
  if (cartTitle) cartTitle.textContent = copy.bagTitle;
  document.querySelector('.cart-close')?.setAttribute('aria-label', isHebrew ? 'סגירת הסל' : 'Close bag');
  document.querySelectorAll('[data-cart-count]').forEach(item => item.textContent = String(count));
  document.querySelectorAll('[data-open-cart]').forEach(button => { button.setAttribute('aria-label', `${copy.bag} · ${count}`); button.classList.toggle('has-items', count > 0); });
  renderCartContents();
}

function openFinder() {
  let dialog = document.querySelector('[data-finder]');
  if (!dialog) {
    dialog = document.createElement('dialog'); dialog.className = 'finder'; dialog.dataset.finder = '';
    dialog.innerHTML = `<button class="sheet-close" type="button" aria-label="${copy.finderClose}">${icon('close')}</button><div class="finder-inner"><p class="finder-step" data-finder-step></p><h2 data-finder-title></h2><div class="finder-options" data-finder-options></div><div class="finder-results" data-finder-results></div></div>`;
    dialog.querySelector('.sheet-close').addEventListener('click', () => dialog.close()); document.body.append(dialog);
  }
  const answers = {}; let step = 0; let exactMatches = [];
  const questions = [
    { key:'type', title:copy.finderCarry, options:[['top-handle',copy.hand],['shoulder',copy.onShoulder],['clutch',copy.clutch]] },
    { key:'size', title:copy.finderSize, options:[['S',copy.small],['M',copy.medium],['L',copy.large]] }
  ];
  const matchesSize = product => answers.size === 'L' ? ['L','XL'].includes(product.size) : product.size === answers.size;
  const getExact = () => catalogOrder.map(id => ROMIC_PRODUCTS.find(product => product.id === id)).filter(Boolean).filter(product => (product.types || []).includes(answers.type) && matchesSize(product));
  const detailLabels = { clean:copy.clean, chain:copy.chain, pearls:copy.pearls };
  function draw() {
    dialog.querySelector('[data-finder-results]').innerHTML = '';
    if (step < questions.length) {
      const question = questions[step]; dialog.querySelector('[data-finder-step]').textContent = `${step + 1} / ${questions.length}`; dialog.querySelector('[data-finder-title]').textContent = question.title;
      dialog.querySelector('[data-finder-options]').innerHTML = question.options.map(([value,label]) => `<button type="button" data-finder-answer="${value}">${label}</button>`).join('');
      return;
    }
    exactMatches = getExact();
    const availableDetails = [...new Set(exactMatches.map(product => product.detail))];
    if (!answers.detail && exactMatches.length > 1 && availableDetails.length > 1) {
      dialog.querySelector('[data-finder-step]').textContent = '3 / 3';
      dialog.querySelector('[data-finder-title]').textContent = copy.finderDetail;
      dialog.querySelector('[data-finder-options]').innerHTML = availableDetails.map(value => `<button type="button" data-finder-detail="${value}">${detailLabels[value]}</button>`).join('');
      return;
    }
    const matches = (answers.detail ? exactMatches.filter(product => product.detail === answers.detail) : exactMatches).slice(0,3);
    dialog.querySelector('[data-finder-step]').textContent = copy.matches; dialog.querySelector('[data-finder-title]').textContent = copy.yourRomic; dialog.querySelector('[data-finder-options]').innerHTML = '';
    dialog.querySelector('[data-finder-results]').innerHTML = matches.length
      ? matches.map(product => `<button type="button" class="finder-match" data-finder-product="${product.id}" style="--match-bg:${productDesign[product.id][1]}"><img src="../assets/products/${product.image}" alt="${product.name}"><span>${product.name}<small>${product.size} · ${product.width} × ${product.height} cm · ${priceMarkup(product)}</small></span></button>`).join('')
      : `<div class="finder-empty"><p>${copy.noExact}</p><button type="button" data-finder-custom>${copy.makeYours}</button></div>`;
  }
  dialog.querySelector('[data-finder-options]').onclick = event => {
    const answer = event.target.closest('[data-finder-answer]');
    const detail = event.target.closest('[data-finder-detail]');
    if (detail) { answers.detail = detail.dataset.finderDetail; draw(); return; }
    if (!answer) return; answers[questions[step].key] = answer.dataset.finderAnswer; step += 1; draw();
  };
  dialog.querySelector('[data-finder-results]').onclick = event => {
    const match = event.target.closest('[data-finder-product]');
    if (match) { dialog.close(); goToProduct(match.dataset.finderProduct); return; }
    if (event.target.closest('[data-finder-custom]')) { dialog.close(); navigateToCustomizer(); }
  };
  draw(); dialog.showModal();
}


function renderServiceDetails() {
  const root = document.querySelector('[data-service-details]');
  if (!root) return;
  const items = isHebrew ? [
    ['משלוחים ואיסוף','משלוחים בישראל בעלות ₪30. איסוף עצמי מגבעתיים ללא עלות, בתיאום מראש.'],
    ['זמני אספקה','אספקה עד 7 ימי עסקים, לתיקים מהקולקציה ולתיקים בעיצוב אישי.'],
    ['החזרות וביטולים','ניתן לבטל הזמנה בהתאם לחוק הגנת הצרכן. בביטול עקב חרטה ייגבו דמי ביטול כחוק, והחזרת התיק תהיה על חשבון הלקוחה.']
  ] : [
    ['Delivery & pickup','Delivery within Israel costs ₪30. Free pickup in Givatayim by prior arrangement.'],
    ['Delivery times','Delivery within 7 business days for both collection bags and custom designs.'],
    ['Returns & cancellations','Orders may be cancelled in accordance with Israeli consumer law. Cancellation fees apply to a change-of-mind cancellation, and return shipping is at the customer’s expense.']
  ];
  root.innerHTML = items.map(([title, text], index) => `<details class="service-detail"><summary>${title}</summary><div><p>${text}</p>${index === 2 ? `<a href="terms.html#returns">${isHebrew ? 'לתנאי ההחזרות והביטולים' : 'Returns & cancellation terms'}</a>` : ''}</div></details>`).join('');
}

function renderCustomizer() {
  const root = document.querySelector('[data-customizer]');
  if (!root) return;
  const models = [{ id:'clutch', name:'Classic Clutch', he:'קלאץ׳ קלאסי', price:320, measure:'25 × 10' }, { id:'maldives', name:'Handbag', he:'תיק יד', price:370, measure:'25 × 15' }, { id:'dubai', name:'Clutch with handles', he:'קלאץ׳ עם ידיות', price:400, measure:'25 × 12' }];
  const colors = [{ id:'black', name:'Black', he:'שחור', hex:'#242124' }, { id:'ivory', name:'White', he:'לבן', hex:'#ffffff' }, { id:'sky', name:'Sky', he:'תכלת', hex:'#92cdf2' }, { id:'lime', name:'Green', he:'ירוק', hex:'#78804f' }, { id:'berry', name:'Burgundy', he:'בורדו', hex:'#8e183c' }, { id:'fuchsia', name:'Fuchsia', he:'פוקסיה', hex:'#ee1772' }, { id:'coral', name:'Orange', he:'כתום', hex:'#f46d48' }, { id:'sand', name:'Sand brown', he:'חום חול', hex:'#bd9064' }];
  let selectedModel = models.find(model => model.id === root.dataset.selectedModel) || models[0];
  let selectedColor = colors.find(color => color.id === root.dataset.selectedColor) || colors[3];
  const displayModel = model => isHebrew ? model.he : model.name;
  const displayColor = color => isHebrew ? color.he : color.name;
  root.innerHTML = `<div class="customizer-head"><p class="eyebrow">ROMIC YOUR WAY</p><h2>MAKE IT<br>YOURS.</h2><p>${copy.customLead}</p></div><div class="customizer-grid" id="customize" tabindex="-1">
    <div class="customizer-visual"><img data-custom-image src="" alt="" loading="lazy" decoding="async" width="1200" height="1500"><span class="customizer-live" aria-live="polite" data-custom-live></span></div>
    <div class="customizer-controls"><fieldset><legend>01 · ${copy.model}</legend><div class="model-options" data-model-options></div></fieldset><fieldset><legend>02 · ${copy.colour}</legend><div class="color-options" data-color-options></div></fieldset>
    <div class="customizer-summary"><div><span>${copy.basePrice}</span><strong data-custom-price data-refresh-custom-price></strong></div><div><span>${copy.bagBody}</span><strong data-custom-size></strong></div></div>
    <p class="customizer-extras">${copy.extraNote}</p><a class="button button-light customizer-cta" href="${whatsappBase}" target="_blank" rel="external noopener" data-custom-whatsapp>${icon('whatsapp')} ${copy.messageRomic}</a><details class="customizer-details"><summary>${copy.detailsLabel}</summary><div><p class="customizer-note">${copy.customNote}</p><p class="customizer-visual-note">${copy.customVisual}</p></div></details></div></div>`;
  const image = root.querySelector('[data-custom-image]'), live = root.querySelector('[data-custom-live]'), price = root.querySelector('[data-custom-price]'), size = root.querySelector('[data-custom-size]'), modelOptions = root.querySelector('[data-model-options]'), colorOptions = root.querySelector('[data-color-options]');
  const cta = root.querySelector('[data-custom-whatsapp]');
  let customWhatsappMessage = '';
  cta?.addEventListener('click', event => shareImagesOrWhatsApp(event, [{ url: image.src, name: `romic-${selectedModel.id}-${selectedColor.id}` }], customWhatsappMessage));
  modelOptions.innerHTML = models.map(model => `<button type="button" data-model="${model.id}"><span>${displayModel(model)}</span><small>${priceMarkup(model, 'price', true)}</small></button>`).join('');
  colorOptions.innerHTML = colors.map(color => `<button type="button" data-color="${color.id}" aria-label="${displayColor(color)}"><span style="--swatch:${color.hex}"></span><small>${displayColor(color)}</small></button>`).join('');
  function update() {
    image.classList.add('is-changing');
    const imageName = selectedModel.id === 'clutch' ? `${selectedColor.id}-front.webp` : `${selectedColor.id}.webp`;
    image.src = `../assets/custom/${selectedModel.id}/${imageName}`;
    image.alt = `${displayModel(selectedModel)} · ${displayColor(selectedColor)}`;
    live.textContent = `${displayModel(selectedModel)} · ${displayColor(selectedColor)}`; price.innerHTML = priceMarkup(selectedModel, 'price', true); size.textContent = `${selectedModel.measure} cm`; size.dir = 'ltr';
    const message = isHebrew
      ? `היי, אשמח להזמין תיק בעיצוב אישי: ${displayModel(selectedModel)} בצבע ${displayColor(selectedColor)}.`
      : `Hi, I’d like to order a custom ${displayModel(selectedModel)} in ${displayColor(selectedColor)}.`;
    const coupon = activeCoupon();
    const finalPrice = currentPrice(selectedModel, true);
    const pricing = isHebrew ? `מחיר בסיס ${formatPrice(finalPrice)}. תוספות יתומחרו בנפרד.` : `Base price ${formatPrice(finalPrice)}. Extras are priced separately.`;
    const offer = coupon?.custom ? ` ${isHebrew ? 'קוד קופון' : 'Coupon'} ${coupon.code} · ${coupon.percent}%` : '';
    customWhatsappMessage = `${message} ${pricing}${offer}`;
    cta.href = whatsappUrl(customWhatsappMessage);
    primeShareFiles([{ url: image.src, name: `romic-${selectedModel.id}-${selectedColor.id}` }]);
    root.dataset.selectedModel = selectedModel.id;
    root.dataset.selectedColor = selectedColor.id;
    modelOptions.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.model === selectedModel.id)));
    colorOptions.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.color === selectedColor.id)));
    image.onload = () => image.classList.remove('is-changing');
  }
  modelOptions.addEventListener('click', event => { const button = event.target.closest('[data-model]'); if (!button) return; selectedModel = models.find(model => model.id === button.dataset.model) || selectedModel; update(); });
  colorOptions.addEventListener('click', event => { const button = event.target.closest('[data-color]'); if (!button) return; selectedColor = colors.find(color => color.id === button.dataset.color) || selectedColor; update(); });
  price.addEventListener('romic:price-refresh', update);
  update();
  root.querySelector('[data-custom-whatsapp]')?.setAttribute('aria-label', copy.messageRomic);
}

function renderHeroConveyor() {
  const root = document.querySelector('[data-hero-conveyor]');
  if (!root) return;
  const products = catalogOrder.map(id => ROMIC_PRODUCTS.find(product => product.id === id)).filter(Boolean);
  const reel = root.closest('.hero-reel');
  const viewport = root.closest('.hero-conveyor-window');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const duplicateCount = Math.min(5, products.length);
  let offset = 0, segmentWidth = 0, lastPaint = performance.now(), frameId = 0;
  let pointerActive = false, focusPaused = false, heroVisible = true;
  let pointerId = null, startX = 0, startY = 0, lastPointerX = 0, moved = false, suppressClick = false;

  function cardMarkup(product, index, duplicate = false) {
    const background = (productDesign[product.id] || ['', '#e5ded5'])[1];
    const priority = !duplicate && index === 0 ? 'high' : 'auto';
    const duplicateAttributes = duplicate ? ' aria-hidden="true" tabindex="-1"' : '';
    return `<a class="conveyor-card" href="product.html?id=${product.id}" data-conveyor-product="${product.id}" draggable="false" style="--conveyor-bg:${background}"${duplicateAttributes}><span class="conveyor-image"><img data-conveyor-src="../assets/conveyor/480/${product.id}.webp" data-conveyor-srcset="../assets/conveyor/480/${product.id}.webp 480w, ../assets/conveyor/720/${product.id}.webp 720w" sizes="(max-width:600px) 64vw, (max-width:1200px) 27vw, 360px" data-fallback-src="../assets/products/${product.image}" alt="${duplicate ? '' : `${product.name} — ${isHebrew ? product.he : product.en}`}" draggable="false" loading="lazy" fetchpriority="${priority}" decoding="async" width="720" height="900"></span><span class="conveyor-label"><strong>${product.name}</strong><span aria-hidden="true">·</span><small>${priceMarkup(product)}</small></span></a>`;
  }
  root.innerHTML = products.map((product, index) => cardMarkup(product, index)).join('') + products.slice(0, duplicateCount).map((product, index) => cardMarkup(product, index, true)).join('');

  function loadConveyorImage(image) {
    if (!image?.dataset.conveyorSrc) return;
    const source = image.dataset.conveyorSrc;
    const sourceSet = image.dataset.conveyorSrcset;
    delete image.dataset.conveyorSrc;
    delete image.dataset.conveyorSrcset;
    image.classList.add('is-loading');
    image.loading = 'eager';
    if (sourceSet) image.srcset = sourceSet;
    image.src = source;
    const reveal = () => image.classList.remove('is-loading');
    if (image.complete && image.naturalWidth) reveal();
    else image.addEventListener('load', reveal, { once:true });
  }
  const conveyorImages = [...root.querySelectorAll('img[data-conveyor-src]')];
  const initialImageCount = 3;
  const warmImageCount = 2;
  const warmImages = conveyorImages.slice(initialImageCount, initialImageCount + warmImageCount);
  const deferredImages = conveyorImages.slice(initialImageCount + warmImageCount);
  conveyorImages.slice(0, initialImageCount).forEach(loadConveyorImage);
  setTimeout(() => warmImages.forEach(loadConveyorImage), 240);
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      loadConveyorImage(entry.target);
      imageObserver.unobserve(entry.target);
    }), { root:viewport, rootMargin:'0px 125% 0px 45%', threshold:0 });
    deferredImages.forEach(image => imageObserver.observe(image));
  } else {
    let fallbackIndex = 0;
    const loadNextFallbackImage = () => {
      loadConveyorImage(deferredImages[fallbackIndex++]);
      if (fallbackIndex < deferredImages.length) setTimeout(loadNextFallbackImage, 650);
    };
    if (deferredImages.length) setTimeout(loadNextFallbackImage, 1000);
  }

  function applyTransform() { root.style.transform = `translate3d(${-offset}px,0,0)`; }
  function normalizePosition() {
    if (!segmentWidth) return;
    while (offset >= segmentWidth) offset -= segmentWidth;
    while (offset < 0) offset += segmentWidth;
  }
  function measure() {
    const duplicateStart = root.children[products.length];
    if (!duplicateStart) return;
    const nextWidth = duplicateStart.offsetLeft;
    if (!nextWidth) return;
    if (segmentWidth) offset = offset / segmentWidth * nextWidth;
    segmentWidth = nextWidth;
    normalizePosition();
    applyTransform();
  }
  function shouldAnimate() {
    return !reducedMotion.matches && !pointerActive && !focusPaused && heroVisible && !document.hidden;
  }
  function animate(now) {
    frameId = 0;
    if (!heroVisible || document.hidden) return;
    if (shouldAnimate(now) && segmentWidth) {
      const speed = matchMedia('(max-width:600px)').matches ? 105 : 135;
      const elapsed = Math.min(now - lastPaint, 50);
      offset += speed * elapsed / 1000;
      normalizePosition();
      applyTransform();
      lastPaint = now;
    } else if (!shouldAnimate(now)) lastPaint = now;
    frameId = requestAnimationFrame(animate);
  }
  function ensureAnimation() {
    if (frameId || reducedMotion.matches || !heroVisible || document.hidden) return;
    lastPaint = performance.now();
    frameId = requestAnimationFrame(animate);
  }
  function stopAnimation() {
    if (frameId) cancelAnimationFrame(frameId);
    frameId = 0;
  }

  viewport.addEventListener('pointerdown', event => {
    stopAnimation();
    pointerActive = true; pointerId = event.pointerId;
    startX = event.clientX; startY = event.clientY; lastPointerX = event.clientX; moved = false;
    reel.classList.add('is-interacting');
    viewport.classList.add('is-dragging');
    viewport.setPointerCapture?.(pointerId);
  });
  viewport.addEventListener('pointermove', event => {
    if (!pointerActive || event.pointerId !== pointerId) return;
    const distanceX = event.clientX - startX;
    const distanceY = event.clientY - startY;
    if (Math.abs(distanceX) > 6 && Math.abs(distanceX) > Math.abs(distanceY)) moved = true;
    if (!moved) return;
    offset -= event.clientX - lastPointerX;
    lastPointerX = event.clientX;
    normalizePosition();
    applyTransform();
    event.preventDefault();
  });
  const finishPointer = event => {
    if (!pointerActive || (event.pointerId != null && event.pointerId !== pointerId)) return;
    suppressClick = moved;
    if (suppressClick) setTimeout(() => { suppressClick = false; }, 160);
    if (viewport.hasPointerCapture?.(pointerId)) viewport.releasePointerCapture(pointerId);
    pointerActive = false; pointerId = null;
    viewport.classList.remove('is-dragging'); reel.classList.remove('is-interacting');
    ensureAnimation();
  };
  viewport.addEventListener('pointerup', finishPointer);
  viewport.addEventListener('pointercancel', finishPointer);
  viewport.addEventListener('pointerleave', event => {
    if (pointerActive && event.pointerId === pointerId && event.buttons === 0) finishPointer(event);
  });
  root.addEventListener('focusin', () => { focusPaused = true; stopAnimation(); });
  root.addEventListener('focusout', () => { focusPaused = root.contains(document.activeElement); ensureAnimation(); });
  root.addEventListener('click', event => {
    if (suppressClick) { event.preventDefault(); event.stopPropagation(); return; }
    if (event.target.closest('[data-conveyor-product]')) rememberHomePosition();
  }, true);
  const visibilityObserver = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    heroVisible = entries[0]?.isIntersecting ?? true;
    if (heroVisible) ensureAnimation(); else stopAnimation();
  }, { rootMargin:'120px' }) : null;
  visibilityObserver?.observe(reel);
  document.addEventListener('visibilitychange', () => document.hidden ? stopAnimation() : ensureAnimation());
  reducedMotion.addEventListener?.('change', () => reducedMotion.matches ? stopAnimation() : ensureAnimation());
  if ('ResizeObserver' in window) new ResizeObserver(measure).observe(viewport);
  else window.addEventListener('resize', measure, { passive:true });
  requestAnimationFrame(() => { measure(); ensureAnimation(); });
}

let homeBelowFoldReady = false;

function renderHomeBelowFold() {
  if (homeBelowFoldReady) return;
  homeBelowFoldReady = true;
  renderCollection();
  renderCustomizer();
  renderSavedPicks();
  initFaq();
  observeReveals();
}

function scheduleHomeBelowFold() {
  const collection = document.querySelector('#collection');
  if (!collection || !('IntersectionObserver' in window)) {
    if ('requestIdleCallback' in window) requestIdleCallback(renderHomeBelowFold, { timeout:2400 });
    else setTimeout(renderHomeBelowFold, 900);
    return;
  }
  let fallbackId;
  const observer = new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting)) return;
    observer.disconnect();
    if (fallbackId) window.cancelIdleCallback?.(fallbackId);
    renderHomeBelowFold();
  }, { rootMargin:'500px 0px' });
  observer.observe(collection);
  if ('requestIdleCallback' in window) fallbackId = requestIdleCallback(() => {
    observer.disconnect();
    renderHomeBelowFold();
  }, { timeout:3200 });
  else setTimeout(() => {
    observer.disconnect();
    renderHomeBelowFold();
  }, 2600);
}

function navigateToCustomizer(updateHash = true) {
  sessionStorage.removeItem(collectionReturnKey);
  renderHomeBelowFold();
  // Materialize preceding layout before scrolling; intrinsic placeholders otherwise move the anchor.
  document.querySelector('#collection')?.classList.add('anchor-layout-ready');
  document.querySelector('#craft')?.classList.add('anchor-layout-ready');
  const target = document.querySelector('#customize');
  if (!target) return;
  target.classList.add('is-visible');
  if (updateHash && location.hash !== '#customize') history.pushState(null, '', '#customize');
  requestAnimationFrame(() => {
    const html = document.documentElement;
    const previous = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';
    target.scrollIntoView({behavior:'auto',block:'start'});
    target.focus({preventScroll:true});
    html.style.scrollBehavior = previous;
  });
}

function renderHome() {
  renderShell();
  applyHomeCopy();
  renderHeroConveyor();
  document.querySelector('[data-open-finder]')?.addEventListener('click', openFinder);
  document.addEventListener('romic:picks-changed', renderSavedPicks);
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = new URL(link.href, location.href);
    if (target.origin !== location.origin || target.pathname !== location.pathname || !['#craft','#customize'].includes(target.hash)) return;
    event.preventDefault();
    navigateToCustomizer();
  });
  window.addEventListener('hashchange', () => {
    if (['#craft','#customize'].includes(location.hash)) navigateToCustomizer(false);
  });
  if (['#craft','#customize'].includes(location.hash)) navigateToCustomizer(false);
  else scheduleHomeBelowFold();
  setTimeout(showLaunchOfferOnce, 280);
}

function renderProduct() {
  renderShell();
  setTimeout(showLaunchOfferOnce, 280);
  document.querySelectorAll('link[data-romic-canonical],script[data-romic-structured]').forEach(element => element.remove());
  const product = ROMIC_PRODUCTS.find(item => item.id === new URLSearchParams(location.search).get('id'));
  const main = document.querySelector('[data-product]');
  if (!product) { main.innerHTML = `<div class="shell doc"><h1>${copy.invalid}</h1><p>${copy.invalidCopy}</p><a href="./">${copy.back}</a></div>`; return; }
  document.title = `${product.name} — Romic`;
  setMetaDescription(isHebrew
    ? `${product.name} של Romic — ${product.he}. מידות גוף התיק: ${product.width} × ${product.height} ס״מ.`
    : `${product.name} by Romic — ${product.en} Bag body: ${product.width} × ${product.height} cm.`);
  replaceCanonical(`${location.origin}${siteBasePath}/${language}/product.html?id=${encodeURIComponent(product.id)}`);
  updateAlternateLinks();
  const structuredData = document.createElement('script'); structuredData.type = 'application/ld+json';
  structuredData.dataset.romicStructured = '';
  structuredData.textContent = JSON.stringify({ '@context':'https://schema.org', '@type':'Product', name:`Romic ${product.name}`, description:isHebrew ? product.he : product.en, image:(product.gallery || [product.image]).map(image => `${location.origin}${siteBasePath}/assets/products/${image}`), brand:{ '@type':'Brand', name:'Romic' }, offers:{ '@type':'Offer', priceCurrency:'ILS', price:product.price, availability:'https://schema.org/InStock', url:location.href } });
  document.head.append(structuredData);
  document.body.style.setProperty('--product-bg', (productDesign[product.id] || ['stone', '#e5ded5'])[1]);
  const gallery = product.gallery || [product.image];
  const imageSize = image => typeof ROMIC_IMAGE_SIZES !== 'undefined' ? ROMIC_IMAGE_SIZES[image.split('?')[0]] || [1200,1500] : [1200,1500];
  const [initialWidth, initialHeight] = imageSize(gallery[0]);
  const galleryMarkup = `<div class="product-gallery" data-product-gallery>
    <div class="product-hero-image" style="aspect-ratio:${initialWidth}/${initialHeight}"><img data-gallery-main src="../assets/products/${gallery[0]}" alt="${product.name} — ${isHebrew ? product.he : product.en}" fetchpriority="high" decoding="async" width="${initialWidth}" height="${initialHeight}"></div>
    ${gallery.length > 1 ? `<div class="product-thumbnails" aria-label="${isHebrew ? `גלריית תמונות של ${product.name}` : `${product.name} image gallery`}">${gallery.map((image, index) => `<button type="button" class="product-thumbnail" data-gallery-image="${image}" data-gallery-index="${index}" aria-label="${copy.viewImage} ${index + 1} / ${gallery.length}" aria-pressed="${index === 0}"><img src="../assets/gallery-thumbs/${image}" data-fallback-src="../assets/products/${image}" alt="" loading="lazy" decoding="async" width="240" height="300"></button>`).join('')}</div>` : ''}
  </div>`;
  main.innerHTML = `<div class="product-page"><a class="back-link" href="./#collection">${icon('arrow')} ${copy.back}</a><div class="product-layout">
    ${galleryMarkup}
    <section class="product-info" aria-labelledby="product-name"><h1 class="product-name" id="product-name">${product.name}</h1><p class="product-description">${isHebrew ? product.he : product.en}</p>${priceMarkup(product,'product-price')}
    <dl class="product-specs"><div><dt>${copy.size}</dt><dd>${product.size}</dd></div><div><dt>${copy.dimensions}</dt><dd>${product.width} × ${product.height} cm</dd></div></dl>
    <div class="product-actions"><button class="button product-cta" type="button" data-add-to-bag="${product.id}" data-open-bag-after-add aria-label="${copy.save} ${product.name}">${bagIcon()} ${copy.order}</button></div><p class="dm-note">${copy.dmNote}</p><p class="product-note">${copy.dimsNote}</p><p class="delivery-note">${copy.deliveryNote}</p></section></div>
    <a class="product-custom-link" href="./#customize"><span>${copy.personalTitle}</span><strong>${copy.personalCopy}</strong><em>${copy.personalLink} ${icon('arrow')}</em></a></div>`;
  const mainImage = main.querySelector('[data-gallery-main]');
  enableImageFallbacks();
  const backLink = main.querySelector('.back-link');
  backLink.addEventListener('click', event => {
    if (sessionStorage.getItem(collectionReturnKey) !== '1') return;
    event.preventDefault();
    history.back();
  });
  main.querySelectorAll('[data-gallery-image]').forEach(button => button.addEventListener('click', () => {
    if (button.getAttribute('aria-pressed') === 'true') return;
    mainImage.classList.add('is-changing');
    const [width,height] = imageSize(button.dataset.galleryImage);
    mainImage.width = width;
    mainImage.height = height;
    mainImage.parentElement.style.aspectRatio = `${width}/${height}`;
    mainImage.src = `../assets/products/${button.dataset.galleryImage}`;
    mainImage.alt = isHebrew
      ? `${product.name} — תמונה ${Number(button.dataset.galleryIndex) + 1} מתוך ${gallery.length}`
      : `${product.name} — view ${Number(button.dataset.galleryIndex) + 1} of ${gallery.length}`;
    main.querySelectorAll('[data-gallery-image]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    mainImage.onload = () => mainImage.classList.remove('is-changing');
  }));
  observeReveals(main);
}

function renderDocument() {
  renderShell();
  const type = document.body.dataset.doc;
  document.querySelector('[data-doc-content]').innerHTML = getDocuments(language)[type];
  const heading = document.querySelector('[data-doc-content] h1');
  document.title = heading ? `${heading.textContent} — Romic` : 'Romic';
  const firstParagraph = document.querySelector('[data-doc-content] p:not(.updated)');
  if (firstParagraph) setMetaDescription(firstParagraph.textContent.trim().slice(0, 155));
  replaceCanonical(`${location.origin}${siteBasePath}/${language}/${type}.html`);
  updateAlternateLinks();
}

document.addEventListener('DOMContentLoaded', () => {
  enableLanguageSwitching();
  const page = document.body.dataset.page;
  if (page === 'home') renderHome();
  if (page === 'product') renderProduct();
  if (page === 'document') renderDocument();
});
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') refreshPromotionState();
});

let homeInternalDeparture = false;
document.addEventListener('click', event => {
  const link = event.target.closest('a[href]');
  if (!link || event.defaultPrevented || link.target === '_blank') return;
  const target = new URL(link.href, location.href);
  homeInternalDeparture = target.origin === location.origin && target.pathname !== location.pathname;
});
window.addEventListener('pageshow', (event) => {
  refreshPromotionState();
  if (event.persisted && document.body.dataset.page === 'home') {
    sessionStorage.removeItem(collectionReturnKey);
    if (!homeInternalDeparture) {
      window.__romicLaunchOfferSeen = false;
      // Returning from outside the site starts a new visit even when Safari restores the page.
      if (promoIsActive()) {
        showLaunchOfferOnce(true);
      }
    }
    homeInternalDeparture = false;
  }
});


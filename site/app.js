let isHebrew = document.documentElement.lang === 'he';
let language = isHebrew ? 'he' : 'en';
const instagramProfile = 'https://www.instagram.com/romic_brand/';
const instagramDm = 'https://ig.me/m/romic_brand';
const collectionStorageKey = 'romic:collection-state';
const collectionReturnKey = 'romic:collection-return';
const savedPicksKey = 'romic:saved-picks';
const siteBasePath = location.hostname.endsWith('.github.io') ? '/Romic' : '';

const COPY = {
  en: {
    skip:'Skip to content', collection:'Collection', craft:'Make It Yours', service:'Delivery', faq:'FAQ', instagram:'Instagram', menu:'Menu', close:'Close menu', language:'עברית',
    heroKicker:'HANDMADE IN ISRAEL · BY ROMI COHEN', heroTitle:'CHOOSE YOUR\nROMIC.', heroIntro:'', heroButton:'DISCOVER THE COLLECTION', scroll:'SCROLL TO FIND YOURS',
    collectionTitle:'FIND YOUR ROMIC.', inStock:'Limited availability', search:'Search by name or style', noResults:'No bags match your search.', filters:'FILTER & SORT', all:'All', clutches:'Clutches', topHandle:'Top handle', shoulder:'Shoulder', sort:'Sort', featured:'Featured', lowHigh:'Price: low to high', highLow:'Price: high to low', fullCollection:'VIEW THE FULL COLLECTION',
    readyTitle:'READY TO GO', readyCopy:'Ready-made bags ship within up to 7 business days.', customTitle:'YOUR ROMIC. YOUR WAY.', customCopy:'Choose a model and colour. Handmade within up to 10 days.', shippingTitle:'DELIVERY', shippingCopy:'Israel only · ₪35 delivery · free pickup in central Israel.',
    privacy:'Privacy', accessibility:'Accessibility', terms:'Terms', rights:'© 2026 Romic. All rights reserved.', handmade:'Handmade bags · Israel', email:'Email',
    back:'BACK TO COLLECTION', size:'SIZE', dimensions:'BAG BODY', availabilityLabel:'AVAILABILITY', readyMade:'Ready-made', order:'MESSAGE ROMIC ON INSTAGRAM', save:'SAVE', saved:'SAVED',
    dimsNote:'Measurements refer to the bag body only, excluding handles and straps. As every bag is handmade, slight variations may occur.', deliveryNote:'Ready-made orders ship within up to 7 business days · Israel delivery ₪35 · free pickup in central Israel.', dmNote:'Your message is copied for Instagram. Paste it in the chat and send.',
    personalTitle:'WANT IT IN ANOTHER COLOUR?', personalCopy:'Choose a Romic model, then make it yours.', personalLink:'EXPLORE MAKE IT YOURS', invalid:'Bag not found', invalidCopy:'This design may no longer be available.',
    finderHint:'NOT SURE?', finderOpen:'FIND MY ROMIC', finderClose:'Close bag finder', finderCarry:'HOW DO YOU WANT TO CARRY IT?', finderSize:'WHAT SIZE DO YOU WANT?', finderDetail:'PICK A DETAIL', hand:'In hand', onShoulder:'On shoulder', clutch:'Clutch', small:'Small', medium:'Medium', large:'Large', clean:'Clean', chain:'Chain', pearls:'Pearls', matches:'YOUR MATCHES', yourRomic:'YOUR ROMIC.', noExact:'No exact match in the ready-made collection.', makeYours:'MAKE IT YOURS',
    model:'CHOOSE A MODEL', colour:'CHOOSE A COLOUR', basePrice:'BASE PRICE', bagBody:'BAG BODY', messageRomic:'MESSAGE ROMIC', customLead:'Choose a model. Choose a colour.', customNote:'Base price: one solid colour with the standard handle and hardware. Straps, colour combinations, extra handles and accessories cost extra.', customVisual:'Visualisation for reference. Handmade colour and measurements may vary slightly.',
    copied:'Message copied — paste and send it in Instagram.', picksCopied:'Your picks were copied for Instagram.', picksLabel:'SAVED · ASK ROMIC', viewImage:'View', remove:'Remove', openInstagram:'open Romic on Instagram', pauseMotion:'Pause moving collection', playMotion:'Play moving collection'
  },
  he: {
    skip:'דילוג לתוכן', collection:'קולקציה', craft:'עיצוב אישי', service:'משלוחים', faq:'שאלות נפוצות', instagram:'אינסטגרם', menu:'תפריט', close:'סגירת התפריט', language:'EN',
    heroKicker:'עבודת יד ישראלית · ROMI COHEN', heroTitle:'CHOOSE YOUR\nROMIC.', heroIntro:'', heroButton:'לצפייה בקולקציה', scroll:'גלו את התיק שלכן',
    collectionTitle:'FIND YOUR ROMIC.', inStock:'מלאי מוגבל', search:'חיפוש לפי שם או סוג', noResults:'לא נמצאו תיקים שמתאימים לחיפוש.', filters:'סינון ומיון', all:'הכול', clutches:'קלאצ׳ים', topHandle:'תיקי יד', shoulder:'תיקי כתף', sort:'מיון', featured:'מומלצים', lowHigh:'מחיר: מהנמוך לגבוה', highLow:'מחיר: מהגבוה לנמוך', fullCollection:'לכל הקולקציה',
    readyTitle:'מוכנים למשלוח', readyCopy:'תיקים מוכנים נשלחים בתוך עד 7 ימי עסקים.', customTitle:'ה־ROMIC שלכן', customCopy:'בחרו דגם וצבע. הכנה אישית בתוך עד 10 ימים.', shippingTitle:'משלוחים', shippingCopy:'משלוחים בישראל בלבד · ₪35 · איסוף ללא עלות מאזור המרכז.',
    privacy:'מדיניות פרטיות', accessibility:'הצהרת נגישות', terms:'תנאי שימוש', rights:'© 2026 Romic. כל הזכויות שמורות.', handmade:'תיקים בעבודת יד · ישראל', email:'אימייל',
    back:'חזרה לקולקציה', size:'מידה', dimensions:'מידות גוף התיק', availabilityLabel:'זמינות', readyMade:'מוכן למשלוח', order:'שליחת הודעה ל־ROMIC באינסטגרם', save:'שמירה', saved:'נשמר',
    dimsNote:'המידות מתייחסות לגוף התיק בלבד, ללא ידיות ורצועות. כל תיק נסרג בעבודת יד ולכן ייתכנו הבדלים קטנים.', deliveryNote:'תיקים מוכנים נשלחים בתוך עד 7 ימי עסקים · משלוח בישראל ₪35 · איסוף ללא עלות מאזור המרכז.', dmNote:'ההודעה הועתקה. הדביקו אותה בצ׳אט באינסטגרם ושלחו.',
    personalTitle:'רוצות אותו בצבע אחר?', personalCopy:'בחרו דגם וצבע וצרו את ה־Romic שלכן.', personalLink:'לעיצוב אישי', invalid:'התיק לא נמצא', invalidCopy:'ייתכן שהדגם כבר אינו זמין.',
    finderHint:'לא בטוחות?', finderOpen:'מצאו את ה־ROMIC שלכן', finderClose:'סגירת שאלון התאמה', finderCarry:'איך תרצו לשאת את התיק?', finderSize:'איזה גודל תרצו?', finderDetail:'איזה גימור אתן אוהבות?', hand:'ביד', onShoulder:'על הכתף', clutch:'קלאץ׳', small:'קטן', medium:'בינוני', large:'גדול', clean:'נקי', chain:'שרשרת', pearls:'פנינים', matches:'ההתאמות שלכן', yourRomic:'YOUR ROMIC.', noExact:'אין כרגע התאמה מדויקת בקולקציה המוכנה.', makeYours:'לעיצוב אישי',
    model:'בחירת דגם', colour:'בחירת צבע', basePrice:'מחיר בסיס', bagBody:'מידות גוף התיק', messageRomic:'שליחת הודעה ל־ROMIC', customLead:'בחרי דגם. בחרי צבע.', customNote:'מחיר הבסיס כולל צבע אחיד, ידית ואבזור סטנדרטיים. רצועות, שילובי צבעים, ידיות נוספות ואביזרים מתומחרים בנפרד.', customVisual:'ההדמיה להמחשה. בעבודת יד ייתכנו הבדלים קטנים בגוון ובמידות.',
    copied:'ההודעה הועתקה — הדביקו ושלחו באינסטגרם.', picksCopied:'הבחירות הועתקו לאינסטגרם.', picksLabel:'נשמרו · דברו עם ROMIC', viewImage:'תמונה', remove:'הסרה', openInstagram:'פתיחת Romic באינסטגרם', pauseMotion:'עצירת הקולקציה הנעה', playMotion:'הפעלת הקולקציה הנעה'
  }
};
let copy = COPY[language];
let menuEscapeHandler;

const HOME_LOCALE = {
  en: {
    title:'Romic — Handmade Bags',
    description:'A limited collection of handmade crochet bags by Romi Cohen. View current availability and speak with Romic directly on Instagram.',
    conveyorLabel:'Moving Romic collection. Swipe or drag left and right to explore.',
    searchLabel:'Search bags', toolsLabel:'Find and sort bags', categoriesLabel:'Filter by bag type',
    categories:['All','Clutches','Top handle','Shoulder'], sortLabel:'Sort', sorts:['Featured','Price: low to high','Price: high to low'],
    faqKicker:'ROMIC FAQ', faqTitle:'GOOD TO<br>KNOW.', faqIntro:'A few useful details before you choose your Romic.',
    faqs:[
      ['How do I order a bag?','Choose your bag and tap the Instagram button. Your message will be copied, so you can check availability and complete the order directly with Romic.'],
      ['Are all Romic bags handmade?','Yes. Every Romic bag is hand-crocheted in Israel by Romi Cohen. Small variations are part of what makes each piece unique.'],
      ['How do I check availability?','Availability is limited and changes quickly. Message Romic on Instagram for the latest update on the bag you love.'],
      ['Can I choose a model and colour?','Yes. In Romic Your Way, choose from the available models and colours. Straps, colour combinations and extra details may cost more.'],
      ['What do the measurements include?','Measurements refer to the bag body only, without handles or straps. As every bag is handmade, small differences may occur.'],
      ['When will my bag arrive?','Ready-made bags ship within up to 7 business days. Delivery in Israel is ₪35, or you can arrange free pickup from central Israel. Custom-order timing is confirmed before you order.']
    ],
    faqContact:'STILL CURIOUS? MESSAGE ROMIC ON INSTAGRAM', faqMessage:'Hi Romic! I have a question about the bags on your website.',
    instagramKicker:'THE LATEST FROM ROMIC', instagramTitle:'FOLLOW THE<br>MAKING.', instagramButton:'OPEN @ROMIC_BRAND'
  },
  he: {
    title:'Romic — תיקים בעבודת יד',
    description:'קולקציה מוגבלת של תיקי Romic הנסרגים בעבודת יד בישראל. צפייה בדגמים, במידות ובזמינות ופנייה ישירה באינסטגרם.',
    conveyorLabel:'קולקציית Romic בתנועה. ניתן להחליק לצדדים כדי לגלות את כל הדגמים.',
    searchLabel:'חיפוש תיקים', toolsLabel:'חיפוש ומיון תיקים', categoriesLabel:'סינון לפי סוג תיק',
    categories:['הכול','קלאצ׳ים','תיקי יד','תיקי כתף'], sortLabel:'מיון', sorts:['מומלצים','מחיר: מהנמוך לגבוה','מחיר: מהגבוה לנמוך'],
    faqKicker:'ROMIC FAQ', faqTitle:'טוב<br>לדעת.', faqIntro:'כמה תשובות קצרות לפני שבוחרות Romic.',
    faqs:[
      ['איך מזמינים תיק?','בוחרות תיק ולוחצות על כפתור האינסטגרם. ההודעה מועתקת אוטומטית, ומשם אפשר לבדוק זמינות ולהשלים את ההזמנה מול Romic.'],
      ['כל התיקים מיוצרים בעבודת יד בישראל?','כן. כל תיק של Romic נסרג בעבודת יד בישראל על ידי רומי כהן. הבדלים קטנים הם חלק מהאופי הייחודי של כל תיק.'],
      ['איך בודקים זמינות?','המלאי מוגבל ומשתנה. שלחו ל־Romic הודעה באינסטגרם ותקבלו עדכון על הדגם שאהבתן.'],
      ['אפשר לבחור דגם וצבע?','כן. באזור העיצוב האישי בוחרות דגם וצבע מתוך האפשרויות הקיימות. רצועות, שילובי צבעים ותוספות עשויים להיות בתוספת תשלום.'],
      ['מה כוללות המידות?','המידות מתייחסות לגוף התיק בלבד, ללא ידיות ורצועות. בגלל עבודת היד ייתכנו הבדלים קטנים.'],
      ['מתי התיק יגיע?','תיקים מוכנים נשלחים בתוך עד 7 ימי עסקים. משלוח בישראל עולה ₪35, וניתן לתאם איסוף ללא עלות מאזור המרכז. זמן הכנת תיק אישי יימסר לפני ההזמנה.']
    ],
    faqContact:'יש לכן שאלה נוספת? כתבו ל־ROMIC באינסטגרם', faqMessage:'היי Romic! יש לי שאלה לגבי התיקים באתר.',
    instagramKicker:'THE LATEST FROM ROMIC', instagramTitle:'BEHIND THE<br>CRAFT.', instagramButton:'OPEN @ROMIC_BRAND'
  }
};

const productDesign = {
  rio: ['coral', '#fda67a'], paris: ['berry', '#dca2a3'], monaco: ['mauve', '#bb8694'], miami: ['berry', '#eb91a2'],
  bali: ['lime', '#a6ac6d'], sahara: ['sand', '#b17d5c'], tokyo: ['lime', '#a2ce6d'], madrid: ['red', '#d20b22'], ibiza: ['coral', '#ff8b45'], porto: ['wine', '#9d2037'],
  maldives: ['sky', '#a6cdf0'], corfu: ['sky', '#b0d2f0'], lisbon: ['sun', '#f7ce66'], tulum: ['sand', '#ceb298'],
  mykonos: ['stone', '#eee9e4'], milan: ['stone', '#f4f1f1'], venice: ['wine', '#8b202e'], dubai: ['charcoal', '#5a5552']
};

const catalogOrder = ['rio','ibiza','porto','paris','miami','monaco','madrid','venice','dubai','sahara','tulum','mykonos','milan','lisbon','bali','tokyo','corfu','maldives'];

function formatPrice(price) { return `₪${price}`; }

function icon(name) {
  const paths = {
    menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
    close:'<path d="m6 6 12 12M18 6 6 18"/>',
    arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',
    down:'<path d="M12 5v14M6 13l6 6 6-6"/>',
    instagram:'<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
    pause:'<path d="M9 6v12M15 6v12"/>',
    play:'<path d="m9 6 9 6-9 6Z"/>'
  };
  return `<svg class="icon icon-${name}" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths[name] || ''}</svg>`;
}

function instagramLink(label, className = '') {
  return `<a class="${className}" href="${instagramProfile}" target="_blank" rel="external noopener" aria-label="${label} — ${copy.openInstagram}">${label}</a>`;
}

function escapeHtml(value = '') {
  return String(value).replace(/[&<>'"]/g, character => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' })[character]);
}

function dmUrl(message) { return `${instagramDm}?text=${encodeURIComponent(message)}`; }

function dmAnchor(label, message, className = '') {
  return `<a class="${className}" href="${dmUrl(message)}" target="_blank" rel="external noopener" data-instagram-dm data-message="${escapeHtml(message)}">${label}</a>`;
}

function copyToClipboard(message) {
  if (!message) return Promise.resolve(false);
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(message).then(() => true).catch(() => false);
  const field = document.createElement('textarea');
  field.value = message; field.setAttribute('readonly', ''); field.style.position = 'fixed'; field.style.opacity = '0';
  document.body.append(field); field.select();
  let copied = false;
  try { copied = document.execCommand('copy'); } catch (_) {}
  field.remove();
  return Promise.resolve(copied);
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
  location.href = `product.html?id=${encodeURIComponent(id)}`;
}

function enableInstagramDm(root = document) {
  root.querySelectorAll('[data-instagram-dm]').forEach(link => {
    if (link.dataset.dmReady) return;
    link.dataset.dmReady = 'true';
    link.addEventListener('click', () => {
      const message = link.dataset.message || '';
      copyToClipboard(message);
      toast(copy.copied);
    });
  });
}

function getSavedPicks() {
  try { return JSON.parse(localStorage.getItem(savedPicksKey) || '[]').filter(id => ROMIC_PRODUCTS.some(product => product.id === id)); }
  catch (_) { return []; }
}

function setSavedPicks(ids) { localStorage.setItem(savedPicksKey, JSON.stringify(ids)); document.dispatchEvent(new CustomEvent('romic:picks-changed')); }

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

  [['ready', copy.readyTitle, copy.readyCopy], ['custom', copy.customTitle, copy.customCopy], ['shipping', copy.shippingTitle, copy.shippingCopy]].forEach(([key, title, text]) => {
    document.querySelector(`[data-${key}-title]`).textContent = title;
    document.querySelector(`[data-${key}-copy]`).textContent = text;
  });

  const faqIntro = document.querySelector('.faq-intro');
  if (faqIntro) {
    faqIntro.querySelector('.faq-kicker').textContent = locale.faqKicker;
    faqIntro.querySelector('h2').innerHTML = locale.faqTitle;
    faqIntro.querySelector('p:last-child').textContent = locale.faqIntro;
  }
  document.querySelectorAll('.faq-item').forEach((item, index) => {
    const entry = locale.faqs[index];
    if (!entry) return;
    item.querySelector('summary').textContent = entry[0];
    item.querySelector('p').textContent = entry[1];
  });
  const faqContact = document.querySelector('.faq-contact');
  if (faqContact) {
    faqContact.textContent = locale.faqContact;
    faqContact.dataset.message = locale.faqMessage;
    faqContact.href = dmUrl(locale.faqMessage);
  }
  const callout = document.querySelector('.instagram-callout');
  if (callout) {
    callout.querySelector('p').textContent = locale.instagramKicker;
    callout.querySelector('h2').innerHTML = locale.instagramTitle;
    callout.querySelector('.button').textContent = locale.instagramButton;
  }

  document.querySelectorAll('[data-conveyor-product]:not([aria-hidden="true"])').forEach(card => {
    const product = ROMIC_PRODUCTS.find(item => item.id === card.dataset.conveyorProduct);
    const image = card.querySelector('img');
    if (product && image) image.alt = `${product.name} — ${isHebrew ? product.he : product.en}`;
  });
  const motionToggle = document.querySelector('[data-conveyor-toggle]');
  if (motionToggle) {
    const paused = motionToggle.getAttribute('aria-pressed') === 'true';
    const label = paused ? copy.playMotion : copy.pauseMotion;
    motionToggle.setAttribute('aria-label', label);
    motionToggle.querySelector('.visually-hidden').textContent = label;
  }
}

function setLanguage(nextLanguage, historyMode = 'replace') {
  if (!COPY[nextLanguage] || nextLanguage === language) return;
  const scrollPosition = { left: window.scrollX, top: window.scrollY };
  document.querySelector('[data-finder]')?.remove();
  language = nextLanguage; isHebrew = language === 'he'; copy = COPY[language];
  document.documentElement.lang = language;
  document.documentElement.dir = isHebrew ? 'rtl' : 'ltr';
  localStorage.setItem('romic:language', language);
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
    enableInstagramDm();
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
  const navigation = `<a href="${siteRoot}#collection">${copy.collection}</a><a href="${siteRoot}#craft">${copy.craft}</a><a href="${siteRoot}#faq">${copy.faq}</a>`;
  return `<a class="skip-link" href="#main">${copy.skip}</a><header class="site-header">
    <a class="brand" href="${siteRoot}" aria-label="Romic home"><span class="brand-name">ROMIC</span><span class="brand-sub">HANDMADE BAGS</span></a>
    <nav class="primary-nav" aria-label="${isHebrew ? 'ניווט ראשי' : 'Primary navigation'}">${navigation}</nav>
    <div class="header-actions"><a class="language-link" href="${otherLanguage}" data-language-link="${isHebrew ? 'en' : 'he'}">${copy.language}</a>${instagramLink(copy.instagram, 'instagram-link')}<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="${copy.menu}" data-menu-toggle>${icon('menu')}</button></div>
    <div class="menu-backdrop" data-menu-backdrop hidden></div><aside class="mobile-menu" id="mobile-menu" aria-hidden="true" data-mobile-menu><div class="mobile-menu-head"><span>ROMIC</span><button type="button" aria-label="${copy.close}" data-menu-close>${icon('close')}</button></div><nav aria-label="${isHebrew ? 'ניווט נייד' : 'Mobile navigation'}">${navigation}</nav><div class="mobile-menu-foot"><a href="${otherLanguage}" data-language-link="${isHebrew ? 'en' : 'he'}">${copy.language}</a>${instagramLink('@ROMIC_BRAND')}</div></aside></header>`;
}

function footer() {
  return `<footer class="site-footer"><div class="footer-wordmark">ROMIC</div><div class="footer-grid">
    <div><p>${copy.handmade}</p><p>${copy.rights}</p></div>
    <nav class="footer-links" aria-label="${isHebrew ? 'קישורי מידע' : 'Information links'}"><a href="privacy.html">${copy.privacy}</a><a href="accessibility.html">${copy.accessibility}</a><a href="terms.html">${copy.terms}</a><a href="mailto:romic.brand@gmail.com">${copy.email}</a>${instagramLink(copy.instagram)}</nav>
  </div></footer>`;
}

function renderShell() {
  document.querySelector('[data-header]').innerHTML = header();
  document.querySelector('[data-footer]').innerHTML = footer();
  localStorage.setItem('romic:language', language);
  enableImageFallbacks();
  initMenu();
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

  const footerCopy = document.querySelectorAll('.footer-grid > div p');
  if (footerCopy[0]) footerCopy[0].textContent = copy.handmade;
  if (footerCopy[1]) footerCopy[1].textContent = copy.rights;
  const footerLinks = document.querySelectorAll('.footer-links a');
  [copy.privacy, copy.accessibility, copy.terms, copy.email, copy.instagram].forEach((label, index) => { if (footerLinks[index]) footerLinks[index].textContent = label; });
  document.querySelector('.footer-links')?.setAttribute('aria-label', isHebrew ? 'קישורי מידע' : 'Information links');
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
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', close));
  if (menuEscapeHandler) document.removeEventListener('keydown', menuEscapeHandler);
  menuEscapeHandler = event => { if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') close(); };
  document.addEventListener('keydown', menuEscapeHandler);
}

function productCard(product) {
  const [tone, background] = productDesign[product.id] || ['stone', '#e1d9cf'];
  const saved = getSavedPicks().includes(product.id);
  const supportsHoverPreview = matchMedia('(hover:hover) and (pointer:fine)').matches;
  const alternateImage = supportsHoverPreview && product.gallery?.[1]
    ? `<img class="product-image-alt" data-alt-src="../assets/cards/600/${product.gallery[1]}" data-alt-srcset="../assets/cards/600/${product.gallery[1]} 600w, ../assets/cards/900/${product.gallery[1]} 900w" sizes="(max-width:900px) 48vw, (max-width:1500px) 31vw, 460px" data-fallback-src="../assets/products/${product.gallery[1]}" alt="" decoding="async" width="900" height="1050">`
    : '';
  return `<article class="product-card" data-tone="${tone}" data-product-id="${product.id}" style="--card-bg:${background}">
    <button class="save-pick" type="button" data-save-pick="${product.id}" aria-label="${saved ? copy.remove : copy.save} ${product.name}" aria-pressed="${saved}">${heartIcon(saved)}</button>
    <a class="product-card-link" data-quick-product="${product.id}" href="product.html?id=${product.id}" aria-label="${product.name}, ${formatPrice(product.price)}, ${copy.inStock}">
      <div class="product-image"><img class="product-image-primary" src="../assets/cards/600/${product.image}" srcset="../assets/cards/600/${product.image} 600w, ../assets/cards/900/${product.image} 900w" sizes="(max-width:900px) 48vw, (max-width:1500px) 31vw, 460px" data-fallback-src="../assets/products/${product.image}" alt="${product.name} — ${isHebrew ? product.he : product.en}" loading="lazy" decoding="async" width="900" height="1050">${alternateImage}</div>
      <div class="product-meta"><h3>${product.name}</h3><span class="price">${formatPrice(product.price)}</span><span class="product-card-size">${product.size} · ${product.width} × ${product.height} cm</span><span class="availability">${copy.inStock}</span></div>
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
  const firstIds = ['rio', 'ibiza', 'porto', 'paris', 'dubai', 'tokyo'];
  const returning = sessionStorage.getItem(collectionReturnKey) === '1';
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
    const saveButton = event.target.closest('[data-save-pick]');
    if (saveButton) {
      const ids = getSavedPicks();
      setSavedPicks(ids.includes(saveButton.dataset.savePick) ? ids.filter(id => id !== saveButton.dataset.savePick) : [...ids, saveButton.dataset.savePick]);
      return;
    }
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
      window.scrollTo({ top: Number(state.scrollY) || 0, behavior: 'auto' });
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
    pill = document.createElement('button'); pill.type = 'button'; pill.className = 'saved-pill'; pill.dataset.savedPill = '';
    pill.addEventListener('click', () => {
      const products = getSavedPicks().map(id => ROMIC_PRODUCTS.find(product => product.id === id)).filter(Boolean);
      if (!products.length) return;
      const message = isHebrew
        ? `היי! שמרתי באתר את הדגמים: ${products.map(product => product.name).join(', ')}. אשמח לבדוק זמינות.`
        : `Hi Romic! I saved these bags on the website: ${products.map(product => product.name).join(', ')}. I'd love to check availability.`;
      window.open(dmUrl(message), '_blank', 'noopener');
      copyToClipboard(message); toast(copy.picksCopied);
    });
    document.body.append(pill);
  }
  const count = getSavedPicks().length;
  pill.hidden = !count; pill.innerHTML = `${heartIcon(true)} <span>${count} ${copy.picksLabel}</span>`;
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
      ? matches.map(product => `<button type="button" class="finder-match" data-finder-product="${product.id}" style="--match-bg:${productDesign[product.id][1]}"><img src="../assets/products/${product.image}" alt="${product.name}"><span>${product.name}<small>${product.size} · ${product.width} × ${product.height} cm · ${formatPrice(product.price)}</small></span></button>`).join('')
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
    if (event.target.closest('[data-finder-custom]')) { dialog.close(); document.querySelector('#craft')?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); }
  };
  draw(); dialog.showModal();
}

function renderCustomizer() {
  const root = document.querySelector('[data-customizer]');
  if (!root) return;
  const models = [{ id:'clutch', name:'Classic Clutch', he:'קלאץ׳ קלאסיק', price:320, measure:'25 × 10' }, { id:'maldives', name:'Romic Handbag', he:'תיק יד Romic', price:370, measure:'25 × 15' }, { id:'dubai', name:'Romic Handle Clutch', he:'קלאץ׳ Romic עם ידיות', price:400, measure:'25 × 12' }];
  const colors = [{ id:'black', name:'Black', he:'שחור', hex:'#242124' }, { id:'ivory', name:'Ivory', he:'שמנת', hex:'#eee4d2' }, { id:'sky', name:'Sky', he:'תכלת', hex:'#92cdf2' }, { id:'lime', name:'Lime', he:'ליים', hex:'#9ed64c' }, { id:'berry', name:'Berry', he:'יין', hex:'#8e183c' }, { id:'fuchsia', name:'Fuchsia', he:'פוקסיה', hex:'#ee1772' }, { id:'coral', name:'Coral', he:'קורל', hex:'#f46d48' }, { id:'sand', name:'Sand', he:'חול', hex:'#bd9064' }];
  let selectedModel = models.find(model => model.id === root.dataset.selectedModel) || models[0];
  let selectedColor = colors.find(color => color.id === root.dataset.selectedColor) || colors[3];
  const displayModel = model => isHebrew ? model.he : model.name;
  const displayColor = color => isHebrew ? color.he : color.name;
  root.innerHTML = `<div class="customizer-head"><p class="eyebrow">ROMIC YOUR WAY</p><h2>MAKE IT<br>YOURS.</h2><p>${copy.customLead}</p></div><div class="customizer-grid">
    <div class="customizer-visual"><img data-custom-image src="" alt="" loading="lazy" decoding="async" width="443" height="443"><span class="customizer-live" aria-live="polite" data-custom-live></span></div>
    <div class="customizer-controls"><fieldset><legend>01 · ${copy.model}</legend><div class="model-options" data-model-options></div></fieldset><fieldset><legend>02 · ${copy.colour}</legend><div class="color-options" data-color-options></div></fieldset>
    <div class="customizer-summary"><div><span>${copy.basePrice}</span><strong data-custom-price></strong></div><div><span>${copy.bagBody}</span><strong data-custom-size></strong></div></div>
    <a class="button button-light customizer-cta" href="${instagramDm}" target="_blank" rel="external noopener" data-instagram-dm>${icon('instagram')} ${copy.messageRomic}</a><p class="customizer-note">${copy.customNote}</p><p class="customizer-visual-note">${copy.customVisual}</p></div></div>`;
  const image = root.querySelector('[data-custom-image]'), live = root.querySelector('[data-custom-live]'), price = root.querySelector('[data-custom-price]'), size = root.querySelector('[data-custom-size]'), modelOptions = root.querySelector('[data-model-options]'), colorOptions = root.querySelector('[data-color-options]');
  modelOptions.innerHTML = models.map(model => `<button type="button" data-model="${model.id}"><span>${displayModel(model)}</span><small>${formatPrice(model.price)}</small></button>`).join('');
  colorOptions.innerHTML = colors.map(color => `<button type="button" data-color="${color.id}" aria-label="${displayColor(color)}"><span style="--swatch:${color.hex}"></span><small>${displayColor(color)}</small></button>`).join('');
  function update() {
    image.classList.add('is-changing');
    const imageName = selectedModel.id === 'clutch' ? `${selectedColor.id}-front.webp` : `${selectedColor.id}.webp`;
    image.src = `../assets/custom/${selectedModel.id}/${imageName}`;
    image.alt = `${displayModel(selectedModel)} · ${displayColor(selectedColor)}`;
    live.textContent = `${displayModel(selectedModel)} · ${displayColor(selectedColor)}`; price.textContent = formatPrice(selectedModel.price); size.textContent = `${selectedModel.measure} cm`;
    const cta = root.querySelector('.customizer-cta');
    const message = isHebrew
      ? `היי! הרכבתי תיק באתר: דגם ${displayModel(selectedModel)}, צבע ${displayColor(selectedColor)}. אשמח לבדוק זמינות ולהזמין!`
      : `Hi Romic! I created a custom bag on the website: ${displayModel(selectedModel)} in ${displayColor(selectedColor)}. I'd love to check availability and order.`;
    cta.href = dmUrl(message); cta.dataset.message = message;
    root.dataset.selectedModel = selectedModel.id;
    root.dataset.selectedColor = selectedColor.id;
    modelOptions.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.model === selectedModel.id)));
    colorOptions.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.color === selectedColor.id)));
    image.onload = () => image.classList.remove('is-changing');
  }
  modelOptions.addEventListener('click', event => { const button = event.target.closest('[data-model]'); if (!button) return; selectedModel = models.find(model => model.id === button.dataset.model) || selectedModel; update(); });
  colorOptions.addEventListener('click', event => { const button = event.target.closest('[data-color]'); if (!button) return; selectedColor = colors.find(color => color.id === button.dataset.color) || selectedColor; update(); });
  update();
  enableInstagramDm(root);
}

function renderHeroConveyor() {
  const root = document.querySelector('[data-hero-conveyor]');
  if (!root) return;
  const products = catalogOrder.map(id => ROMIC_PRODUCTS.find(product => product.id === id)).filter(Boolean);
  const reel = root.closest('.hero-reel');
  const viewport = root.closest('.hero-conveyor-window');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const duplicateCount = Math.min(5, products.length);
  const conservativeDevice = navigator.connection?.saveData === true || (navigator.deviceMemory && navigator.deviceMemory <= 2);
  let offset = 0, segmentWidth = 0, lastPaint = performance.now(), resumeAt = 0, frameId = 0;
  let pointerActive = false, hoverPaused = false, focusPaused = false, userPaused = Boolean(conservativeDevice), heroVisible = true;
  let pointerId = null, startX = 0, startY = 0, lastPointerX = 0, moved = false, suppressClick = false;

  function cardMarkup(product, index, duplicate = false) {
    const background = (productDesign[product.id] || ['', '#e5ded5'])[1];
    const priority = !duplicate && index === 0 ? 'high' : 'auto';
    const duplicateAttributes = duplicate ? ' aria-hidden="true" tabindex="-1"' : '';
    return `<a class="conveyor-card" href="product.html?id=${product.id}" data-conveyor-product="${product.id}" draggable="false" style="--conveyor-bg:${background}"${duplicateAttributes}><span class="conveyor-image"><img data-conveyor-src="../assets/conveyor/480/${product.id}.webp" data-conveyor-srcset="../assets/conveyor/480/${product.id}.webp 480w, ../assets/conveyor/720/${product.id}.webp 720w" sizes="(max-width:600px) 64vw, (max-width:1200px) 27vw, 360px" data-fallback-src="../assets/products/${product.image}" alt="${duplicate ? '' : `${product.name} — ${isHebrew ? product.he : product.en}`}" draggable="false" loading="lazy" fetchpriority="${priority}" decoding="async" width="720" height="840"></span><span class="conveyor-label"><strong>${product.name}</strong><span aria-hidden="true">·</span><small>${formatPrice(product.price)}</small></span></a>`;
  }
  root.innerHTML = products.map((product, index) => cardMarkup(product, index)).join('') + products.slice(0, duplicateCount).map((product, index) => cardMarkup(product, index, true)).join('');
  reel.querySelector('[data-conveyor-toggle]')?.remove();
  reel.insertAdjacentHTML('beforeend', `<button class="conveyor-motion-toggle" type="button" data-conveyor-toggle aria-label="${userPaused ? copy.playMotion : copy.pauseMotion}" aria-pressed="${userPaused}">${icon(userPaused ? 'play' : 'pause')}<span class="visually-hidden">${userPaused ? copy.playMotion : copy.pauseMotion}</span></button>`);
  const motionToggle = reel.querySelector('[data-conveyor-toggle]');

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
  function shouldAnimate(now = performance.now()) {
    return !reducedMotion.matches && !userPaused && !pointerActive && !hoverPaused && !focusPaused && heroVisible && !document.hidden && now >= resumeAt;
  }
  function animate(now) {
    frameId = 0;
    if (!heroVisible || document.hidden) return;
    if (shouldAnimate(now) && segmentWidth) {
      const speed = matchMedia('(max-width:600px)').matches ? 130 : 165;
      const elapsed = Math.min(now - lastPaint, 50);
      offset += speed * elapsed / 1000;
      normalizePosition();
      applyTransform();
      lastPaint = now;
    } else if (!shouldAnimate(now)) lastPaint = now;
    frameId = requestAnimationFrame(animate);
  }
  function ensureAnimation() {
    if (frameId || userPaused || reducedMotion.matches || !heroVisible || document.hidden) return;
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
    pointerActive = false; pointerId = null; resumeAt = performance.now() + 1100;
    viewport.classList.remove('is-dragging'); reel.classList.remove('is-interacting');
    ensureAnimation();
  };
  viewport.addEventListener('pointerup', finishPointer);
  viewport.addEventListener('pointercancel', finishPointer);
  viewport.addEventListener('mouseenter', () => { hoverPaused = true; stopAnimation(); });
  viewport.addEventListener('mouseleave', () => { hoverPaused = false; ensureAnimation(); });
  root.addEventListener('focusin', () => { focusPaused = true; stopAnimation(); });
  root.addEventListener('focusout', () => { focusPaused = root.contains(document.activeElement); ensureAnimation(); });
  root.addEventListener('click', event => {
    if (suppressClick) { event.preventDefault(); event.stopPropagation(); return; }
    if (event.target.closest('[data-conveyor-product]')) rememberHomePosition();
  }, true);
  motionToggle.addEventListener('click', () => {
    userPaused = !userPaused;
    motionToggle.setAttribute('aria-pressed', String(userPaused));
    motionToggle.setAttribute('aria-label', userPaused ? copy.playMotion : copy.pauseMotion);
    motionToggle.innerHTML = `${icon(userPaused ? 'play' : 'pause')}<span class="visually-hidden">${userPaused ? copy.playMotion : copy.pauseMotion}</span>`;
    if (userPaused) stopAnimation(); else ensureAnimation();
  });
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

function renderHome() {
  renderShell();
  applyHomeCopy();
  renderHeroConveyor();
  document.querySelector('[data-open-finder]')?.addEventListener('click', openFinder);
  document.addEventListener('romic:picks-changed', renderSavedPicks);
  scheduleHomeBelowFold();
}

function renderProduct() {
  renderShell();
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
  structuredData.textContent = JSON.stringify({ '@context':'https://schema.org', '@type':'Product', name:`Romic ${product.name}`, description:isHebrew ? product.he : product.en, image:(product.gallery || [product.image]).map(image => `${location.origin}${siteBasePath}/assets/products/${image}`), brand:{ '@type':'Brand', name:'Romic' }, offers:{ '@type':'Offer', priceCurrency:'ILS', price:product.price, availability:'https://schema.org/LimitedAvailability', url:location.href } });
  document.head.append(structuredData);
  document.body.style.setProperty('--product-bg', (productDesign[product.id] || ['stone', '#e5ded5'])[1]);
  const gallery = product.gallery || [product.image];
  const galleryMarkup = `<div class="product-gallery" data-product-gallery>
    <div class="product-hero-image"><img data-gallery-main src="../assets/products/${gallery[0]}" alt="${product.name} — ${isHebrew ? product.he : product.en}" fetchpriority="high" decoding="async" width="1206" height="1508"></div>
    ${gallery.length > 1 ? `<div class="product-thumbnails" aria-label="${isHebrew ? `גלריית תמונות של ${product.name}` : `${product.name} image gallery`}">${gallery.map((image, index) => `<button type="button" class="product-thumbnail" data-gallery-image="${image}" data-gallery-index="${index}" aria-label="${copy.viewImage} ${index + 1} / ${gallery.length}" aria-pressed="${index === 0}"><img src="../assets/gallery-thumbs/${image}" data-fallback-src="../assets/products/${image}" alt="" loading="lazy" decoding="async" width="240" height="300"></button>`).join('')}</div>` : ''}
  </div>`;
  main.innerHTML = `<div class="product-page"><a class="back-link" href="./#collection">${icon('arrow')} ${copy.back}</a><div class="product-layout">
    ${galleryMarkup}
    <section class="product-info" aria-labelledby="product-name"><p class="product-status">${copy.inStock}</p><h1 class="product-name" id="product-name">${product.name}</h1><p class="product-description">${isHebrew ? product.he : product.en}</p><p class="product-price">${formatPrice(product.price)}</p>
    <dl class="product-specs"><div><dt>${copy.size}</dt><dd>${product.size}</dd></div><div><dt>${copy.dimensions}</dt><dd>${product.width} × ${product.height} cm</dd></div><div><dt>${copy.availabilityLabel}</dt><dd>${copy.readyMade}</dd></div></dl>
    <div class="product-actions">${dmAnchor(`${icon('instagram')} ${copy.order}`, isHebrew ? `היי! אהבתי מאוד את ${product.name}. אשמח לבדוק זמינות ולהזמין!` : `Hi Romic! I love the ${product.name} bag. I'd like to check availability and order.`, 'button product-cta')}<button class="quick-save product-save" type="button" data-product-save="${product.id}" aria-pressed="${getSavedPicks().includes(product.id)}">${heartIcon(getSavedPicks().includes(product.id))}<span>${getSavedPicks().includes(product.id) ? copy.saved : copy.save}</span></button></div><p class="dm-note">${copy.dmNote}</p><p class="product-note">${copy.dimsNote}</p><p class="delivery-note">${copy.deliveryNote}</p></section></div>
    <a class="product-custom-link" href="./#craft"><span>${copy.personalTitle}</span><strong>${copy.personalCopy}</strong><em>${copy.personalLink} ${icon('arrow')}</em></a></div>`;
  const mainImage = main.querySelector('[data-gallery-main]');
  const productSave = main.querySelector('[data-product-save]');
  productSave.addEventListener('click', () => {
    const ids = getSavedPicks(); const saved = ids.includes(product.id);
    setSavedPicks(saved ? ids.filter(id => id !== product.id) : [...ids, product.id]);
    productSave.setAttribute('aria-pressed', String(!saved)); productSave.innerHTML = `${heartIcon(!saved)}<span>${saved ? copy.save : copy.saved}</span>`;
  });
  enableInstagramDm(main);
  const backLink = main.querySelector('.back-link');
  backLink.addEventListener('click', event => {
    if (sessionStorage.getItem(collectionReturnKey) !== '1') return;
    event.preventDefault();
    history.back();
  });
  main.querySelectorAll('[data-gallery-image]').forEach(button => button.addEventListener('click', () => {
    if (button.getAttribute('aria-pressed') === 'true') return;
    mainImage.classList.add('is-changing');
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
  enableInstagramDm();
});

window.addEventListener('pageshow', (event) => {
  if (event.persisted && document.body.dataset.page === 'home') {
    sessionStorage.removeItem(collectionReturnKey);
  }
});

/* HERENOW Films — GA4 analytics + cookie consent (Consent Mode v2)
 * --------------------------------------------------------------
 * Single source of truth for the Measurement ID. Replace the value
 * below with the real GA4 ID (Admin → Data Streams → Measurement ID).
 */
var GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // TODO: replace with real GA4 ID

(function () {
  var CONSENT_KEY = 'hn_consent'; // 'granted' | 'denied'

  // --- gtag bootstrap ---
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { dataLayer.push(arguments); };

  // Consent Mode v2 — deny everything until the visitor chooses.
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    wait_for_update: 500
  });

  var configured = !!GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX';

  // Load the GA4 library + base config (tracking only fires once consent is granted).
  if (configured) {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
    document.head.appendChild(s);
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);
  }

  function grant() {
    gtag('consent', 'update', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted'
    });
  }

  var saved = null;
  try { saved = localStorage.getItem(CONSENT_KEY); } catch (e) {}
  if (saved === 'granted') { grant(); return; }
  if (saved === 'denied') { return; }

  // --- Consent banner (only shown when no choice stored yet) ---
  function store(v) { try { localStorage.setItem(CONSENT_KEY, v); } catch (e) {} }

  function buildBanner() {
    if (document.getElementById('hn-cookie-consent')) return;
    var bar = document.createElement('div');
    bar.id = 'hn-cookie-consent';
    bar.setAttribute('role', 'dialog');
    bar.setAttribute('aria-label', 'Cookie consent');
    bar.style.cssText = [
      'position:fixed', 'left:0', 'right:0', 'bottom:0', 'z-index:9999',
      'background:#201f1f', 'border-top:4px solid #ffb1c6',
      'color:#e5e2e1', 'padding:18px 16px',
      'font-family:Montserrat,sans-serif', 'box-shadow:0 -8px 24px rgba(0,0,0,.4)'
    ].join(';');

    var wrap = document.createElement('div');
    wrap.style.cssText = 'max-width:1440px;margin:0 auto;display:flex;flex-wrap:wrap;align-items:center;gap:16px;justify-content:space-between';

    var text = document.createElement('p');
    text.style.cssText = 'margin:0;font-size:13px;line-height:1.5;color:#e2bdc6;flex:1 1 320px';
    text.innerHTML = 'We use cookies to understand how visitors use our site and improve your experience. ' +
      'Analytics cookies only run if you accept.';

    var btns = document.createElement('div');
    btns.style.cssText = 'display:flex;gap:10px;flex:0 0 auto';

    var decline = document.createElement('button');
    decline.type = 'button';
    decline.textContent = 'Decline';
    decline.style.cssText = 'cursor:pointer;border:2px solid #353534;background:transparent;color:#e2bdc6;' +
      'font-weight:700;font-size:12px;letter-spacing:.08em;text-transform:uppercase;padding:10px 20px';

    var accept = document.createElement('button');
    accept.type = 'button';
    accept.textContent = 'Accept';
    accept.style.cssText = 'cursor:pointer;border:2px solid #d71471;background:#d71471;color:#fff2f3;' +
      'font-weight:700;font-size:12px;letter-spacing:.08em;text-transform:uppercase;padding:10px 24px';

    function close() { if (bar.parentNode) bar.parentNode.removeChild(bar); }
    accept.addEventListener('click', function () { store('granted'); grant(); close(); });
    decline.addEventListener('click', function () { store('denied'); close(); });

    btns.appendChild(decline);
    btns.appendChild(accept);
    wrap.appendChild(text);
    wrap.appendChild(btns);
    bar.appendChild(wrap);
    document.body.appendChild(bar);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildBanner);
  } else {
    buildBanner();
  }
})();

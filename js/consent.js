(function () {
  var KEY = 'tnt-consent';
  var memory = null;
  var loaded = { analytics: false, marketing: false };

  function read() {
    if (memory) return memory;
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return null;
      memory = JSON.parse(raw);
      return memory;
    } catch (e) {
      return memory;
    }
  }

  function write(choice) {
    memory = choice;
    try {
      localStorage.setItem(KEY, JSON.stringify(choice));
    } catch (e) {}
    apply(choice);
  }

  function isReal(id) {
    return window.TNTLogic ? TNTLogic.isRealId(id) : false;
  }

  function loadGa() {
    if (loaded.analytics || !isReal(TNT.ga4Id)) return;
    loaded.analytics = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(TNT.ga4Id);
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', TNT.ga4Id);
  }

  function loadMeta() {
    if (!isReal(TNT.metaPixelId) || window.fbq) return;
    /* Standard Meta pixel loader. Runs only after marketing consent. */
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = true;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', TNT.metaPixelId);
    window.fbq('track', 'PageView');
  }

  function loadTikTok() {
    if (!isReal(TNT.tiktokPixelId) || window.ttq) return;
    !function (w, d, t) {
      w.TiktokAnalyticsObject = t;
      var ttq = w[t] = w[t] || [];
      ttq.methods = ['page', 'track', 'identify', 'instances', 'debug', 'on', 'off', 'once', 'ready', 'alias', 'group', 'enableCookie', 'disableCookie'];
      ttq.setAndDefer = function (obj, method) {
        obj[method] = function () {
          obj.push([method].concat(Array.prototype.slice.call(arguments, 0)));
        };
      };
      for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
      ttq.load = function (id) {
        var s = d.createElement('script');
        s.async = true;
        s.src = 'https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=' + id + '&lib=' + t;
        var first = d.getElementsByTagName('script')[0];
        first.parentNode.insertBefore(s, first);
      };
      ttq.load(TNT.tiktokPixelId);
      ttq.page();
    }(window, document, 'ttq');
  }

  function apply(choice) {
    if (!choice) return;
    if (choice.analytics) loadGa();
    if (choice.marketing) {
      if (!loaded.marketing) {
        loaded.marketing = true;
        loadMeta();
        loadTikTok();
      }
    }
  }

  function event(name, params) {
    var choice = read();
    if (!choice || !choice.analytics) return;
    if (typeof window.gtag === 'function') window.gtag('event', name, params || {});
  }

  function lead(params) {
    event('generate_lead', params || {});
    var choice = read();
    if (choice && choice.marketing && typeof window.fbq === 'function') {
      window.fbq('track', 'Lead');
    }
  }

  function banner() {
    return document.getElementById('cookie-banner');
  }

  function closeBanner(el) {
    if (el) el.remove();
    if (!banner()) {
      document.body.classList.remove('has-cookie');
      document.body.classList.remove('cookie-expanded');
    }
  }

  function render(openSettings) {
    var existing = banner();
    if (existing) existing.remove();
    var current = read() || { necessary: true, analytics: false, marketing: false };
    var el = document.createElement('div');
    el.id = 'cookie-banner';
    el.className = 'cookie';
    el.setAttribute('role', 'region');
    el.setAttribute('aria-label', 'Cookie choices');
    el.innerHTML =
      '<p>Analytics and marketing stay off unless you allow them.</p>' +
      '<div class="cookie-actions">' +
      '<button type="button" class="btn" data-cookie="accept">Accept</button>' +
      '<button type="button" class="btn" data-cookie="reject">Reject</button>' +
      '<button type="button" class="btn" data-cookie="settings">Settings</button>' +
      '</div>' +
      '<div id="cookie-settings"' + (openSettings ? '' : ' hidden') + '>' +
      '<label class="choice"><input type="checkbox" checked disabled> Necessary (always on)</label>' +
      '<label class="choice"><input type="checkbox" id="cookie-analytics"' + (current.analytics ? ' checked' : '') + '> Analytics</label>' +
      '<label class="choice"><input type="checkbox" id="cookie-marketing"' + (current.marketing ? ' checked' : '') + '> Marketing</label>' +
      '<p class="muted">Analytics is Google Analytics. Marketing tags stay off unless you allow them.</p>' +
      '<button type="button" class="btn btn-accent" data-cookie="save">Save cookie settings</button>' +
      '</div>';
    document.body.appendChild(el);
    document.body.classList.add('has-cookie');
    el.addEventListener('click', function (ev) {
      var btn = ev.target.closest('[data-cookie]');
      if (!btn) return;
      var action = btn.getAttribute('data-cookie');
      if (action === 'accept') {
        write({ necessary: true, analytics: true, marketing: true, updated: new Date().toISOString() });
        closeBanner(el);
      } else if (action === 'reject') {
        write({ necessary: true, analytics: false, marketing: false, updated: new Date().toISOString() });
        closeBanner(el);
      } else if (action === 'settings') {
        var panel = document.getElementById('cookie-settings');
        if (panel) {
          panel.hidden = !panel.hidden;
          el.classList.toggle('is-expanded', !panel.hidden);
          document.body.classList.toggle('cookie-expanded', !panel.hidden);
        }
      } else if (action === 'save') {
        write({
          necessary: true,
          analytics: !!document.getElementById('cookie-analytics').checked,
          marketing: !!document.getElementById('cookie-marketing').checked,
          updated: new Date().toISOString()
        });
        closeBanner(el);
      }
    });
  }

  function open() {
    render(true);
    var first = banner() && banner().querySelector('button');
    if (first) first.focus();
  }

  function init() {
    var choice = read();
    if (!choice) render(false);
    else apply(choice);
    document.addEventListener('click', function (ev) {
      if (ev.target.closest('[data-manage-cookies]')) {
        ev.preventDefault();
        open();
      }
    });
  }

  window.TNTConsent = { read: read, open: open, event: event, lead: lead, init: init };
  init();
})();

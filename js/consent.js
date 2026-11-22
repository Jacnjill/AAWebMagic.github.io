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
    var previous = read();
    /* Withdrawing analytics after Google Analytics has loaded on this page:
       stop it at once, delete its cookies, then reload once the new choice is
       stored so the page runs without it. Granting or a first choice never reloads. */
    var withdraw = loaded.analytics && !choice.analytics;
    if (withdraw) window['ga-disable-' + TNT.ga4Id] = true;
    if (!choice.analytics && (withdraw || (previous && previous.analytics))) clearGaCookies();
    memory = choice;
    var stored = true;
    try {
      localStorage.setItem(KEY, JSON.stringify(choice));
    } catch (e) {
      stored = false;
    }
    if (withdraw) {
      /* If the choice could not be stored, a reload would bring back the old
         one; GA stays disabled for the rest of this page instead. */
      if (stored) location.reload();
      return;
    }
    apply(choice);
  }

  function clearGaCookies() {
    var parts = location.hostname.split('.');
    document.cookie.split(';').forEach(function (cookie) {
      var name = cookie.split('=')[0].trim();
      if (name !== '_ga' && name.indexOf('_ga_') !== 0) return;
      var expired = name + '=; Max-Age=0; Path=/';
      document.cookie = expired;
      for (var i = 0; i < parts.length - 1; i++) {
        document.cookie = expired + '; Domain=' + parts.slice(i).join('.');
      }
    });
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

  function apply(choice) {
    if (!choice) return;
    if (choice.analytics) loadGa();
    /* No marketing tags are installed. The marketing choice is still stored so
       a future tag can respect it; add its loader here, gated on choice.marketing. */
  }

  function event(name, params) {
    var choice = read();
    if (!choice || !choice.analytics) return;
    if (typeof window.gtag === 'function') window.gtag('event', name, params || {});
  }

  function lead(params) {
    event('generate_lead', params || {});
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
      '<button type="button" class="btn" data-cookie="accept">Accept all</button>' +
      '<button type="button" class="btn" data-cookie="reject">Reject all</button>' +
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

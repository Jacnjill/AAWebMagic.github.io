(function () {
  function utm() {
    var params = new URLSearchParams(location.search);
    var source = params.get('utm_source');
    var campaign = params.get('utm_campaign');
    if (source || campaign) {
      try {
        sessionStorage.setItem('tnt-utm', JSON.stringify({
          source: source || 'direct',
          campaign: campaign || 'none'
        }));
      } catch (e) {}
    }
    try {
      var saved = sessionStorage.getItem('tnt-utm');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return { source: source || 'direct', campaign: campaign || 'none' };
  }

  function interestFor(el) {
    return (el && el.getAttribute('data-wa-interest'))
      || document.body.getAttribute('data-wa-interest')
      || 'Trip N Travel holidays';
  }

  function refresh(root) {
    var scope = root || document;
    scope.querySelectorAll('[data-call]').forEach(function (el) {
      el.href = 'tel:' + String(TNT.phone).replace(/[^\d+]/g, '');
      if (el.hasAttribute('data-call-full') || !el.textContent.trim()) el.textContent = 'Call us on ' + TNT.phone;
    });
    scope.querySelectorAll('[data-wa]').forEach(function (el) {
      var text = el.getAttribute('data-wa-text') || ("Hi, I'm interested in the " + interestFor(el));
      el.href = TNTLogic.waHref(TNT.whatsapp, text);
      el.target = '_blank';
      el.rel = 'noopener noreferrer';
      if (el.hasAttribute('data-wa-icon')) {
        if (!el.getAttribute('aria-label')) el.setAttribute('aria-label', 'WhatsApp us');
      } else if (el.hasAttribute('data-wa-full')) {
        el.textContent = 'WhatsApp: ' + TNT.whatsappDisplay;
      } else if (!el.textContent.trim()) {
        el.textContent = 'WhatsApp us';
      }
    });
    var legalLine = TNT.legalFooterLine;
    var legalHtml = escapeHtml(legalLine);
    var safePostcode = escapeHtml('BR1 3QD');
    var safeEmail = escapeHtml('info@tripntravel.co.uk');
    legalHtml = legalHtml.split(safePostcode).join('<span class="nowrap">' + safePostcode + '</span>');
    legalHtml = legalHtml.split(safeEmail).join('<span class="nowrap"><a href="mailto:' + safeEmail + '">' + safeEmail + '</a></span>');
    scope.querySelectorAll('[data-company]').forEach(function (el) { el.innerHTML = legalHtml; });
    scope.querySelectorAll('[data-registered]').forEach(function (el) {
      el.textContent = 'Registered in ' + TNT.registeredIn + ' ' + TNT.companyNumber;
    });
    scope.querySelectorAll('[data-hours]').forEach(function (el) {
      if (TNT.showContactHours && TNT.contactHours && !/\{\{/.test(TNT.contactHours)) {
        el.hidden = false;
        el.textContent = TNT.contactHours;
      } else {
        el.remove();
      }
    });
    scope.querySelectorAll('[data-placeholder-block]').forEach(function (el) {
      el.hidden = !TNT.showPlaceholderBlocks;
    });
    scope.querySelectorAll('[data-ai-note]').forEach(function (el) {
      if (TNT.showAiDisclosure && TNT.aiDisclosure) {
        el.hidden = false;
        el.textContent = TNT.aiDisclosure;
      } else if (el.hasAttribute('data-ai-fallback')) {
        el.hidden = false;
        el.textContent = el.getAttribute('data-ai-fallback');
      } else {
        el.hidden = true;
        el.textContent = '';
      }
    });
    scope.querySelectorAll('[data-email]').forEach(function (el) {
      var token = /\{\{/.test(String(TNT.email || ''));
      var row = el.closest('[data-email-row]') || el;
      if (!token) {
        el.textContent = TNT.email;
        row.hidden = false;
      } else if (TNT.showPlaceholderBlocks) {
        el.textContent = TNT.email;
        row.hidden = false;
      } else {
        el.textContent = '';
        row.hidden = true;
      }
    });
    var instalmentText = TNT.instalmentTermsConfirmed ? TNT.instalmentPublicLine : TNT.askForQuote;
    scope.querySelectorAll('[data-instalment]').forEach(function (el) {
      if (el.tagName === 'A' && el.getAttribute('href')) return;
      el.textContent = instalmentText;
    });
    scope.querySelectorAll('[data-protection-link]').forEach(function (el) {
      el.hidden = !TNT.showPtsLine;
    });
    scope.querySelectorAll('[data-instalment-section]').forEach(function (el) {
      el.hidden = !TNT.instalmentTermsConfirmed;
    });
    scope.querySelectorAll('[data-year]').forEach(function (el) {
      el.textContent = '© ' + new Date().getFullYear() + ' ' + TNT.tradingName;
    });
    scope.querySelectorAll('[data-flag-trust]').forEach(function (el) {
      if (TNT.showPtsLine) {
        el.hidden = false;
        el.textContent = TNT.ptsLine;
      } else {
        el.remove();
      }
    });
    var trust = document.getElementById('trust-list');
    if (trust && TNT.showPtsLine && !trust.querySelector('[data-pts-live]')) {
      var pts = document.createElement('li');
      pts.setAttribute('data-pts-live', '');
      pts.textContent = TNT.ptsLine;
      trust.appendChild(pts);
    }
    if (trust && TNT.googleRating != null && TNT.googleRating !== '' && !trust.querySelector('[data-rating-live]')) {
      var rating = document.createElement('li');
      rating.setAttribute('data-rating-live', '');
      rating.textContent = 'Google rating ' + TNT.googleRating;
      trust.appendChild(rating);
    }
    var socialHost = scope.querySelector('[data-socials]');
    if (socialHost && !socialHost.dataset.ready) {
      var urls = TNT.socialUrls || {};
      Object.keys(urls).forEach(function (name) {
        if (!urls[name]) return;
        var a = document.createElement('a');
        a.href = urls[name];
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.textContent = name.charAt(0).toUpperCase() + name.slice(1);
        socialHost.appendChild(a);
      });
      socialHost.dataset.ready = '1';
      if (!socialHost.children.length) socialHost.remove();
    }
    var raja = document.getElementById('meet-raja');
    var photo = TNT.founderPhoto;
    var usablePhoto = photo && !/placeholder|team\.jpg/i.test(photo);
    if (raja) {
      if (!usablePhoto) raja.remove();
      else {
        raja.hidden = false;
        var img = raja.querySelector('img');
        if (img) {
          img.src = photo;
          img.alt = TNT.founderName + ', founder of ' + TNT.tradingName;
        }
      }
    }
    scope.querySelectorAll('[data-founder-bio]').forEach(function (el) {
      el.hidden = !(TNT.showFounderBio && !/\{\{/.test(el.textContent || ''));
    });
    scope.querySelectorAll('[data-founder-slot]').forEach(function (el) {
      if (usablePhoto) {
        el.hidden = false;
        el.textContent = '';
        var portrait = document.createElement('img');
        portrait.src = photo;
        portrait.alt = TNT.founderName + ', founder of ' + TNT.tradingName;
        portrait.width = 640;
        portrait.height = 800;
        el.appendChild(portrait);
      } else {
        el.hidden = !TNT.showPlaceholderBlocks;
      }
    });
    var protection = document.getElementById('protection-copy');
    if (protection && !protection.dataset.ready) {
      var bits = [];
      if (TNT.showPtsLine) {
        bits.push('<p>' + escapeHtml(TNT.ptsLine) + ' {{VERIFY WITH PTS}}</p>');
        bits.push('<p>Payments are made to our PTS trust account. {{VERIFY WITH PTS}}</p>');
      }
      if (bits.length) protection.innerHTML = bits.join('');
      protection.dataset.ready = '1';
    }
    document.querySelectorAll('[data-payment-note]').forEach(function (el) {
      if (TNT.showPtsLine) el.textContent = 'Payments are made to our PTS trust account. {{VERIFY WITH PTS}}';
      else el.textContent = 'How you pay is confirmed in your quote. A trust-account claim is not published while that detail is still being checked.';
    });
    document.querySelectorAll('[data-flag-trust-note]').forEach(function (el) {
      if (TNT.showPtsLine) {
        el.hidden = false;
        el.textContent = 'Payments are made to our PTS trust account.';
      } else el.remove();
    });
    document.querySelectorAll('[data-why-protect]').forEach(function (el) {
      if (TNT.showPtsLine) {
        el.hidden = false;
        el.textContent = TNT.ptsLine + ' {{VERIFY WITH PTS}}';
      } else el.remove();
    });
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function initNav() {
    var toggle = document.getElementById('nav-toggle');
    var nav = document.getElementById('site-nav');
    if (!toggle || !nav) return;
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (ev) {
      if (ev.target.closest('a')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  var selectionSources = [];

  function addSelectionSource(fn) { selectionSources.push(fn); }

  /* The enquiry form's current choices. Free-text message, name, email and phone are never read. */
  function enquirySelections() {
    var form = document.querySelector('[data-form="enquiry"]');
    if (!form || !form.destination) return {};
    return {
      destination: form.destination.value,
      destinationOther: form.destinationOther ? form.destinationOther.value : '',
      when: form.when ? form.when.value : '',
      flightOnly: !!(form.flightOnly && form.flightOnly.checked)
    };
  }

  function currentSelections() {
    var merged = {};
    [enquirySelections].concat(selectionSources).forEach(function (src) {
      var got = {};
      try { got = src() || {}; } catch (e) {}
      Object.keys(got).forEach(function (k) {
        if (got[k] !== '' && got[k] != null && got[k] !== false) merged[k] = got[k];
      });
    });
    return merged;
  }

  /* Rebuild a contact link's href from the visitor's current choices, at the moment of use. */
  function syncWaHref(el) {
    if (el.hasAttribute('data-wa-share') || el.hasAttribute('data-wa-text') || !el.hasAttribute('data-wa')) return;
    var sel = currentSelections();
    sel.interest = interestFor(el);
    var text = TNTLogic.buildSelectionMessage(sel)
      || ("Hi, I'm interested in the " + interestFor(el));
    el.href = TNTLogic.waHref(TNT.whatsapp, text);
  }

  function initWaFresh() {
    ['click', 'auxclick', 'contextmenu', 'focusin'].forEach(function (type) {
      document.addEventListener(type, function (ev) {
        var wa = ev.target.closest && ev.target.closest('[data-wa]');
        if (wa) syncWaHref(wa);
      }, true);
    });
  }

  function qrDesktop() {
    return !!(window.matchMedia
      && window.matchMedia('(hover: hover) and (pointer: fine)').matches
      && window.matchMedia('(min-width: 900px)').matches);
  }

  function qrSvg(url) {
    var qr = qrcode(0, 'M');
    qr.addData(url, 'Byte');
    qr.make();
    var n = qr.getModuleCount();
    var quiet = 4;
    var size = n + quiet * 2;
    var d = '';
    for (var r = 0; r < n; r++) {
      for (var c = 0; c < n; c++) {
        if (qr.isDark(r, c)) d += 'M' + (c + quiet) + ' ' + (r + quiet) + 'h1v1h-1z';
      }
    }
    return '<svg xmlns="http://www.w3.org/2000/svg" class="qr-modal__code" width="240" height="240" viewBox="0 0 ' + size + ' ' + size + '" shape-rendering="crispEdges" role="img" aria-label="QR code for opening WhatsApp">'
      + '<rect width="' + size + '" height="' + size + '" fill="#fff"/><path d="' + d + '" fill="#0f1b2d"/></svg>';
  }

  function openQrModal(href, opener) {
    var wrap = document.createElement('div');
    wrap.className = 'qr-modal';
    wrap.innerHTML = '<div class="qr-modal__panel" role="dialog" aria-modal="true" aria-labelledby="qr-modal-title" aria-describedby="qr-modal-text">'
      + '<h2 id="qr-modal-title">Chat with us on your phone</h2>'
      + '<p id="qr-modal-text">Scan this code with your phone camera. WhatsApp will open with our number and a message ready to send.</p>'
      + '<div class="qr-modal__qr"></div>'
      + '<p class="qr-modal__number">' + escapeHtml(TNT.whatsappDisplay) + '</p>'
      + '<p><a class="qr-modal__alt" target="_blank" rel="noopener noreferrer">Or open WhatsApp on this computer</a></p>'
      + '<button type="button" class="btn btn-ghost qr-modal__close">Close</button>'
      + '</div>';
    var panel = wrap.firstChild;
    wrap.querySelector('.qr-modal__qr').innerHTML = qrSvg(href);
    wrap.querySelector('.qr-modal__alt').href = href;
    var closeBtn = wrap.querySelector('.qr-modal__close');
    function close() {
      document.removeEventListener('keydown', onKey, true);
      wrap.remove();
      document.body.classList.remove('qr-modal-open');
      if (opener && opener.focus) opener.focus();
    }
    function onKey(ev) {
      if (ev.key === 'Escape') {
        ev.preventDefault();
        close();
      } else if (ev.key === 'Tab') {
        var f = panel.querySelectorAll('a[href], button');
        var first = f[0];
        var last = f[f.length - 1];
        if (!panel.contains(document.activeElement)) {
          ev.preventDefault();
          first.focus();
        } else if (ev.shiftKey && document.activeElement === first) {
          ev.preventDefault();
          last.focus();
        } else if (!ev.shiftKey && document.activeElement === last) {
          ev.preventDefault();
          first.focus();
        }
      }
    }
    wrap.addEventListener('click', function (ev) {
      if (ev.target === wrap) close();
    });
    closeBtn.addEventListener('click', close);
    document.addEventListener('keydown', onKey, true);
    document.body.classList.add('qr-modal-open');
    document.body.appendChild(wrap);
    closeBtn.focus();
  }

  function initQr() {
    if (typeof qrcode !== 'function') return;
    document.addEventListener('click', function (ev) {
      if (ev.defaultPrevented || ev.button !== 0 || ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey) return;
      var wa = ev.target.closest('[data-wa], [data-wa-qr]');
      var href = wa && wa.getAttribute('href');
      if (!wa || wa.hasAttribute('data-wa-share') || !href || !qrDesktop()) return;
      ev.preventDefault();
      openQrModal(href, wa);
    });
  }

  function initTracking() {
    document.addEventListener('click', function (ev) {
      var wa = ev.target.closest('[data-wa]');
      if (wa) {
        TNTConsent.event('whatsapp_click', {
          page: location.pathname,
          button_location: wa.getAttribute('data-location') || 'unspecified'
        });
      }
      var call = ev.target.closest('[data-call]');
      if (call) {
        TNTConsent.event('call_click', {
          page: location.pathname,
          button_location: call.getAttribute('data-location') || 'unspecified'
        });
      }
    });
  }

  function jsonLd(data) {
    var s = document.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(data);
    document.head.appendChild(s);
  }

  function initSchema() {
    if (document.body.getAttribute('data-schema') === 'agency') {
      var sameAs = Object.keys(TNT.socialUrls || {}).map(function (k) { return TNT.socialUrls[k]; }).filter(Boolean);
      jsonLd({
        '@context': 'https://schema.org',
        '@type': 'TravelAgency',
        name: TNT.tradingName,
        legalName: TNT.legalName,
        url: TNT.siteUrl + '/',
        telephone: TNT.phone,
        address: {
          '@type': 'PostalAddress',
          streetAddress: TNT.address.streetAddress,
          addressLocality: TNT.address.addressLocality,
          addressRegion: TNT.address.addressRegion,
          postalCode: TNT.address.postalCode,
          addressCountry: TNT.address.addressCountry
        },
        sameAs: sameAs
      });
    }
    var crumbs = document.querySelector('[data-crumbs]');
    if (crumbs) {
      var items = Array.prototype.map.call(crumbs.querySelectorAll('a, [aria-current="page"]'), function (el, i) {
        var href = el.getAttribute('href');
        var item = {
          '@type': 'ListItem',
          position: i + 1,
          name: el.textContent.trim()
        };
        if (href) item.item = new URL(href, TNT.siteUrl + '/').href;
        else item.item = location.href.split('?')[0];
        return item;
      });
      jsonLd({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items });
    }
    var faqRoot = document.querySelector('[data-faq]');
    if (faqRoot) {
      var questions = Array.prototype.map.call(faqRoot.querySelectorAll('.faq-item'), function (item) {
        return {
          '@type': 'Question',
          name: item.querySelector('h3').textContent.trim(),
          acceptedAnswer: { '@type': 'Answer', text: item.querySelector('p').textContent.trim() }
        };
      });
      jsonLd({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: questions });
    }
  }

  function loadProof() {
    var section = document.getElementById('proof');
    if (!section) return;
    fetch('data/reviews.json')
      .then(function (r) { return r.json(); })
      .then(function (rows) {
        var list = (rows || []).filter(function (row) { return row && row.consentGiven === true && row.text; });
        if (!list.length) {
          section.remove();
          return;
        }
        var host = document.getElementById('proof-list');
        host.innerHTML = list.map(function (row) {
          return '<article class="card"><h3>' + escapeHtml(row.name || '') + '</h3><p>' + escapeHtml(row.text) + '</p><p class="muted">' +
            escapeHtml([row.trip, row.date, row.source].filter(Boolean).join(' · ')) +
            (row.rating ? ' · ' + escapeHtml(String(row.rating)) + ' out of 5' : '') + '</p></article>';
        }).join('');
        section.hidden = false;
      })
      .catch(function () { section.remove(); });
  }

  function showBuildMarker() {
    var on = false;
    try { on = new URLSearchParams(location.search).get('build') === '1'; } catch (e) { on = false; }
    if (!on) return;
    document.querySelectorAll('[data-build]').forEach(function (el) { el.hidden = false; });
  }

  function init() {
    utm();
    showBuildMarker();
    refresh(document);
    initNav();
    initTracking();
    initWaFresh();
    initQr();
    initSchema();
    loadProof();
  }

  window.TNTSite = { addSelectionSource: addSelectionSource,refresh: refresh, utm: utm, escapeHtml: escapeHtml };
  init();
})();

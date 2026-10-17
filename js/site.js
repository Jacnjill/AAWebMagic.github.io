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
      if (el.hasAttribute('data-wa-share')) {
        el.href = 'https://wa.me/?text=' + encodeURIComponent(text);
      } else {
        el.href = TNTLogic.waHref(TNT.whatsapp, text);
      }
      el.target = '_blank';
      el.rel = 'noopener noreferrer';
      if (el.hasAttribute('data-wa-icon')) {
        if (!el.getAttribute('aria-label')) el.setAttribute('aria-label', 'WhatsApp us');
      } else if (el.hasAttribute('data-wa-full') || !el.textContent.trim()) el.textContent = 'WhatsApp us on ' + TNT.whatsappDisplay;
    });
    var company = TNT.legalName + ' (trading as ' + TNT.tradingName + '). Registered in ' + TNT.registeredIn + ', company number ' + TNT.companyNumber + '. Registered office: ' + TNT.registeredOffice + '.';
    scope.querySelectorAll('[data-company]').forEach(function (el) { el.textContent = company; });
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
      el.textContent = instalmentText;
    });
    scope.querySelectorAll('[data-protection-link]').forEach(function (el) {
      el.hidden = !(TNT.showAtolWording || TNT.showPtsLine);
    });
    scope.querySelectorAll('[data-instalment-section]').forEach(function (el) {
      el.hidden = !TNT.instalmentTermsConfirmed;
    });
    scope.querySelectorAll('[data-year]').forEach(function (el) {
      el.textContent = '© ' + new Date().getFullYear() + ' ' + company;
    });
    scope.querySelectorAll('[data-flag-trust]').forEach(function (el) {
      if (TNT.showPtsLine) {
        el.hidden = false;
        el.textContent = TNT.ptsLine;
      } else {
        el.remove();
      }
    });
    scope.querySelectorAll('[data-flag-flight]').forEach(function (el) {
      if (TNT.showAtolWording) {
        el.hidden = false;
        el.textContent = TNT.atolWording;
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
    if (trust && TNT.showAtolWording && !trust.querySelector('[data-atol-live]')) {
      var atol = document.createElement('li');
      atol.setAttribute('data-atol-live', '');
      atol.textContent = TNT.atolWording;
      trust.appendChild(atol);
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
    if (raja) {
      var photo = TNT.founderPhoto;
      if (!photo || /placeholder|team\.jpg/i.test(photo)) raja.remove();
      else {
        raja.hidden = false;
        var img = raja.querySelector('img');
        if (img) {
          img.src = photo;
          img.alt = TNT.founderName + ', founder of ' + TNT.tradingName + ', based in ' + TNT.founderBase;
        }
      }
    }
    var protection = document.getElementById('protection-copy');
    if (protection && !protection.dataset.ready) {
      var bits = [];
      if (TNT.showPtsLine) {
        bits.push('<p>' + escapeHtml(TNT.ptsLine) + ' {{VERIFY WITH PTS}}</p>');
        bits.push('<p>Payments are made to our PTS trust account. {{VERIFY WITH PTS}}</p>');
      }
      if (TNT.showAtolWording) {
        bits.push('<p>' + escapeHtml(TNT.atolWording) + ' {{VERIFY WITH PTS}}</p>');
        bits.push('<p>' + escapeHtml(TNT.atolDealLine) + ' applies only where a holiday includes flights and the tour operator provides that protection. {{VERIFY WITH PTS}}</p>');
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

  function loadDealsNav() {
    var script = document.querySelector('script[src$="site.js"]');
    var url = 'data/deals.json';
    if (script && script.src) url = script.src.replace(/js\/site\.js(?:\?.*)?$/, 'data/deals.json');
    fetch(url)
      .then(function (r) { return r.json(); })
      .then(function (rows) {
        var today = new Date();
        var any = (rows || []).some(function (d) {
          return TNTLogic.isDealShowable(d, today, TNT.priceMaxAgeDays);
        });
        if (!any) return;
        document.querySelectorAll('[data-nav-deals]').forEach(function (el) { el.hidden = false; });
        if (document.body.hasAttribute('data-deals-page')) {
          var robots = document.querySelector('meta[name="robots"]');
          if (robots && /noindex/i.test(robots.getAttribute('content') || '')) robots.remove();
        }
      })
      .catch(function () {});
  }

  function init() {
    utm();
    refresh(document);
    initNav();
    initTracking();
    initSchema();
    loadProof();
    loadDealsNav();
  }

  window.TNTSite = { refresh: refresh, utm: utm, escapeHtml: escapeHtml };
  init();
})();

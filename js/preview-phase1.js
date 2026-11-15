/* PREVIEW ONLY — Phase 1 refresh helpers for index.html and turkey-holidays.html.
   Loads after js/site.js. Reads phone/WhatsApp from TNT (js/config.js); nothing is hard-coded.
   - Fills [data-wa-digits] with TNT.whatsappDisplay.
   - Adds the UTM reference (TNTSite.utm() plus utm_content) to WhatsApp prefill text.
     Clicks still go through site.js initTracking, so whatsapp_click fires with data-location.
   - Client-side Turkey filters over the curated preview cards (no supplier inventory). */
(function () {
  if (typeof TNT === 'undefined' || !window.TNTSite) return;

  function utmContent() {
    var c = null;
    try { c = new URLSearchParams(location.search).get('utm_content'); } catch (e) {}
    try {
      if (c) sessionStorage.setItem('tnt-utm-content', c);
      else c = sessionStorage.getItem('tnt-utm-content');
    } catch (e) {}
    return c || '';
  }

  function refText(el) {
    var u = TNTSite.utm();
    var source = u.source && u.source !== 'direct' ? u.source : 'website';
    var campaign = u.campaign && u.campaign !== 'none' ? u.campaign : 'phase1_preview';
    var content = utmContent() || el.getAttribute('data-location') || 'page';
    return ' Ref: ' + [source, campaign, content].join('/')
      + '. Website source: website_whatsapp_click';
  }

  function interestFor(el) {
    return el.getAttribute('data-wa-interest')
      || document.body.getAttribute('data-wa-interest')
      || 'Trip N Travel holidays';
  }

  function setPrefills() {
    document.querySelectorAll('[data-wa]:not([data-wa-share])').forEach(function (el) {
      el.setAttribute('data-wa-text', "Hi, I'm interested in the " + interestFor(el) + '.' + refText(el));
    });
    TNTSite.refresh(document);
  }

  function fillDigits() {
    document.querySelectorAll('[data-wa-digits]').forEach(function (el) {
      el.textContent = TNT.whatsappDisplay;
    });
    if (TNT.phone2) {
      document.querySelectorAll('[data-phone2]').forEach(function (el) {
        el.textContent = TNT.phone2;
        if (el.tagName === 'A') el.setAttribute('href', 'tel:' + (TNT.phone2Tel || TNT.phone2.replace(/\s+/g, '')));
      });
    }
    if (TNT.officeHours) {
      document.querySelectorAll('[data-pv-hours]').forEach(function (el) { el.textContent = TNT.officeHours; });
    }
  }

  function bannerHeight() {
    var b = document.querySelector('.pv-banner');
    if (!b) return;
    var set = function () { document.documentElement.style.setProperty('--pv-banner-h', b.offsetHeight + 'px'); };
    set();
    window.addEventListener('resize', set);
  }

  /* ---------- Turkey filters ---------- */
  function initFilters() {
    var form = document.getElementById('pv-filters');
    var grid = document.getElementById('pv-hol-grid');
    if (!form || !grid) return;
    var cards = Array.prototype.slice.call(grid.querySelectorAll('.pv-hol'));
    var empty = document.getElementById('pv-empty');
    var sort = document.getElementById('pv-sort');
    var count = document.getElementById('pv-count');

    function checked(name) {
      return Array.prototype.map.call(form.querySelectorAll('input[name="' + name + '"]:checked'), function (i) { return i.value; });
    }

    function apply() {
      var boards = checked('board');
      var airports = checked('airport');
      var family = form.family && form.family.checked;
      var halal = form.halal && form.halal.checked;
      var noAlcohol = form.alcoholfree && form.alcoholfree.checked;
      var shown = 0;
      cards.forEach(function (card) {
        var d = card.dataset;
        var ok = true;
        if (boards.length && boards.indexOf(d.board) === -1) ok = false;
        if (airports.length && !airports.some(function (a) { return (d.airports || '').split(' ').indexOf(a) !== -1; })) ok = false;
        if (family && d.family !== '1') ok = false;
        if (halal && d.halal !== '1') ok = false;
        if (noAlcohol && d.alcoholfree !== '1') ok = false;
        card.hidden = !ok;
        if (ok) shown++;
      });
      var order = sort ? sort.value : 'recommended';
      var sorted = cards.slice().sort(function (a, b) {
        if (order === 'price-asc') return Number(a.dataset.price) - Number(b.dataset.price);
        if (order === 'price-desc') return Number(b.dataset.price) - Number(a.dataset.price);
        return Number(a.dataset.rank) - Number(b.dataset.rank);
      });
      var quote = grid.querySelector('.pv-quote');
      sorted.forEach(function (c) { grid.insertBefore(c, quote); });
      /* Desktop layout: the testimonial sits under the third visible card (mockup 02). */
      var visible = sorted.filter(function (c) { return !c.hidden; });
      cards.forEach(function (c) { c.classList.remove('pv-col3'); });
      if (visible.length === 3) visible[2].classList.add('pv-col3');
      grid.classList.toggle('pv-hol-grid--three', visible.length === 3);
      if (empty) empty.hidden = shown !== 0;
      if (count) count.textContent = shown + (shown === 1 ? ' holiday shown' : ' holidays shown');
    }

    form.addEventListener('change', apply);
    form.addEventListener('submit', function (ev) { ev.preventDefault(); apply(); });
    var reset = document.getElementById('pv-reset');
    if (reset) reset.addEventListener('click', function () { form.reset(); apply(); });
    var resetTop = document.getElementById('pv-reset-top');
    if (resetTop) resetTop.addEventListener('click', function () { form.reset(); apply(); });
    if (sort) sort.addEventListener('change', apply);
    apply();
  }

  fillDigits();
  bannerHeight();
  setPrefills();
  initFilters();
})();

(function (root, factory) {
  var registry = typeof module === 'object' && module.exports
    ? require('../source-phrases.json') : root.TNTSourcePhrases;
  var api = factory(registry);
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.TNTLogic = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function (registry) {
  var CORE = ['Spain', 'Turkey', 'Greece'];
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  function coreDestinations(extra) {
    var extras = Array.isArray(extra) ? extra.filter(Boolean) : [];
    return {
      bookable: CORE.slice(),
      extras: extras,
      choices: CORE.concat(extras, ['Surprise me', 'Other'])
    };
  }

  function needsAdviser(destination, flightOnly) {
    if (flightOnly) return true;
    return CORE.indexOf(destination) === -1;
  }

  function formatTravellers(adults, children, ages) {
    var a = Number(adults) || 0;
    var c = Number(children) || 0;
    var parts = [a + (a === 1 ? ' adult' : ' adults')];
    if (c > 0) {
      var ageBits = (ages || []).filter(function (x) { return x !== '' && x != null; });
      parts.push(c + (c === 1 ? ' child' : ' children') + (ageBits.length ? ' aged ' + ageBits.join(', ') : ''));
    }
    return parts.join(', ');
  }

  function sourcePhrase(id) {
    return registry.phrases.find(function (row) { return row.id === id; }).phrase;
  }

  function pagePhrase(path, location) {
    if (path === '/index.html') path = '/';
    var rows = registry.phrases.filter(function (row) { return row.kind === 'W' && row.page === path; });
    var row = rows.find(function (row) { return row.location === location; })
      || rows.find(function (row) { return row.location === 'header'; });
    return row ? row.phrase : sourcePhrase('W-404');
  }

  function phraseKey(text) {
    return text.normalize('NFKC').toLowerCase().replace(/[‘’]/g, "'").replace(/[“”]/g, '"')
      .replace(/\s+/g, ' ').trim().replace(/[.!?]$/, '');
  }

  function packagePhrase(title, destination) {
    if (typeof title !== 'string' || typeof destination !== 'string') return '';
    if (/[#\p{Default_Ignorable_Code_Point}\p{Cc}]|\bref\s*:/iu.test((title + ', ' + destination).normalize('NFKC'))) return '';
    title = title.replace(/\s+/g, ' ').trim();
    destination = destination.replace(/\s+/g, ' ').trim();
    if (!title || !destination) return '';
    var phrase = "Hi, I'm interested in " + title + ', ' + destination + '.';
    var key = phraseKey(phrase);
    return registry.phrases.some(function (row) { return phraseKey(row.phrase) === key; }) ? '' : phrase;
  }

  function buildQuoteMessage(a) {
    var dest = a.destination === 'Other'
      ? ('Other: ' + String(a.destinationOther || '').trim())
      : (a.destination || '');
    var when = 'Flexible';
    if (a.month && a.flexible) when = (a.monthLabel || a.month) + ' (flexible)';
    else if (a.month) when = a.monthLabel || a.month;
    else if (a.flexible) when = 'Flexible';
    var from = a.from === 'Other'
      ? ('Other: ' + String(a.fromOther || '').trim())
      : (a.from || '');
    var extras = a.extras && a.extras.length ? a.extras.join(', ') : 'None';
    var lines = [
      sourcePhrase('W-ENQUIRY-MM'),
      'Trip type: ' + (a.tripType || ''),
      'Destination: ' + dest,
      'When: ' + when,
      'From: ' + from,
      'Travellers: ' + formatTravellers(a.adults, a.children, a.ages),
      'Budget: ' + (a.budget || ''),
      'Extras: ' + extras
    ];
    if (a.flightOnly) lines.push('Flights only: Yes');
    if (needsAdviser(a.destination, a.flightOnly)) lines.push('Chat to Trip N Travel on WhatsApp');
    return lines.join('\n');
  }

  function plural(n, one, many) {
    return n + ' ' + (n === 1 ? one : many);
  }

  /* Natural-language WhatsApp opener built from what the visitor has chosen so far.
     Only fields that are present are used. Returns '' when there is nothing to say,
     so callers can fall back to their default text. No contact details, no prices. */
  function buildSelectionMessage(sel) {
    sel = sel || {};
    var clean = function (v) { return String(v == null ? '' : v).replace(/\s+/g, ' ').trim(); };
    var dest = clean(sel.destination);
    if (dest === 'Other') dest = clean(sel.destinationOther);
    if (/^(not sure|surprise me)$/i.test(dest)) dest = '';
    var when = clean(sel.when);
    var flexible = !!sel.flexible || /flexib/i.test(when);
    if (/flexib/i.test(when)) when = '';
    var from = clean(sel.from);
    if (from === 'Other') from = clean(sel.fromOther);
    var adults = Number(sel.adults) || 0;
    var children = Number(sel.children) || 0;
    var ages = (sel.ages || []).map(clean).filter(function (x) { return x !== ''; });
    var who = [];
    if (adults > 0) who.push(plural(adults, 'adult', 'adults'));
    if (children > 0) {
      var agePhrase = '';
      if (ages.length === children) {
        agePhrase = ' aged ' + (ages.length > 1 ? ages.slice(0, -1).join(', ') + ' and ' + ages[ages.length - 1] : ages[0]);
      }
      who.push(plural(children, 'child', 'children') + agePhrase);
    }
    var interest = clean(sel.interest);
    if (!(dest || when || flexible || from || who.length || sel.flightOnly)) return '';
    var msg = "Hi Trip N Travel, I'd like a quote";
    if (sel.flightOnly) msg += ' for flights only' + (dest ? ' to ' + dest : '');
    else if (dest) msg += ' for ' + dest;
    else if (interest) msg += ' for the ' + interest;
    if (when) msg += ' in ' + when + (flexible ? ' (dates flexible)' : '');
    else if (flexible) msg += ' with flexible dates';
    if (from) msg += ' flying from ' + from;
    if (who.length) msg += ' for ' + who.join(' and ');
    return msg + '.';
  }

  function waHref(number, text) {
    return 'https://wa.me/' + number + '?text=' + encodeURIComponent(text);
  }

  function daysBetweenDates(iso, today) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
    if (!m) return null;
    var checked = Date.UTC(+m[1], +m[2] - 1, +m[3]);
    var t = today instanceof Date ? today : new Date();
    var todayUtc = Date.UTC(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate());
    return Math.round((todayUtc - checked) / 86400000);
  }

  function isDealShowable(deal, today, maxAge) {
    if (!deal || deal.placeholder === true) return false;
    if (typeof deal.title === 'string' && deal.title.indexOf('{{') !== -1) return false;
    var price = Number(deal.fromPricePP);
    if (!isFinite(price) || price <= 0) return false;
    var limit = maxAge == null ? 7 : maxAge;
    var age = daysBetweenDates(deal.priceCheckedDate, today || new Date());
    if (age === null || age < 0 || age > limit) return false;
    return true;
  }

  function formatGBP(n) {
    return '£' + Math.round(Number(n)).toLocaleString('en-GB');
  }

  function formatChecked(iso) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
    if (!m) return iso || '';
    return (+m[3]) + ' ' + MONTHS[+m[2] - 1] + ' ' + m[1];
  }

  function formatLongDate(date) {
    return date.getUTCDate() + ' ' + MONTHS[date.getUTCMonth()] + ' ' + date.getUTCFullYear();
  }

  function monthLabel(ym) {
    var m = /^(\d{4})-(\d{2})$/.exec(ym || '');
    if (!m) return '';
    return MONTHS[+m[2] - 1] + ' ' + m[1];
  }

  function balancePlan(input) {
    var price = Number(input.price);
    var deposit = Number(input.deposit);
    var weeks = Number(input.weeks);
    var dep = /^(\d{4})-(\d{2})$/.exec(input.departureMonth || '');
    if (!isFinite(price) || price <= 0 || !isFinite(deposit) || deposit < 0 || !dep || !isFinite(weeks)) {
      return { ok: false, reason: 'Enter a total price, a deposit and a departure month.' };
    }
    if (deposit > price) return { ok: false, reason: 'The deposit cannot be more than the total price.' };
    var departure = new Date(Date.UTC(+dep[1], +dep[2] - 1, 1));
    var due = new Date(departure.getTime());
    due.setUTCDate(due.getUTCDate() - Math.round(weeks * 7));
    var today = input.today instanceof Date ? input.today : new Date();
    var todayUtc = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
    var days = (due.getTime() - todayUtc.getTime()) / 86400000;
    var months = days / (365.2425 / 12);
    var balance = price - deposit;
    var dueLabel = formatLongDate(due);
    if (balance === 0) {
      return {
        ok: true,
        kind: 'covered',
        dueLabel: dueLabel,
        text: formatGBP(deposit) + ' covers the price in this illustration. Nothing further would be due before travel.'
      };
    }
    if (months < 1) {
      return {
        ok: true,
        kind: 'soon',
        dueLabel: dueLabel,
        text: 'The balance would be due in less than a month, so this illustration does not split it into monthly amounts. Ask us for the dates in your quote.'
      };
    }
    var monthly = balance / months;
    return {
      ok: true,
      kind: 'plan',
      dueLabel: dueLabel,
      months: months,
      monthly: monthly,
      text: formatGBP(deposit) + ' deposit today, then about ' + formatGBP(monthly) + ' a month — fully paid before you travel.'
    };
  }

  function priceLine(deal) {
    return 'From ' + formatGBP(deal.fromPricePP) + ' pp';
  }

  function isRealId(id) {
    if (!id || typeof id !== 'string') return false;
    if (id.indexOf('{{') !== -1) return false;
    if (/placeholder/i.test(id)) return false;
    return true;
  }

  return {
    CORE: CORE,
    MONTHS: MONTHS,
    coreDestinations: coreDestinations,
    needsAdviser: needsAdviser,
    formatTravellers: formatTravellers,
    buildQuoteMessage: buildQuoteMessage,
    waHref: waHref,
    sourcePhrase: sourcePhrase,
    pagePhrase: pagePhrase,
    phraseKey: phraseKey,
    packagePhrase: packagePhrase,
    buildSelectionMessage: buildSelectionMessage,
    daysBetweenDates: daysBetweenDates,
    isDealShowable: isDealShowable,
    formatGBP: formatGBP,
    formatChecked: formatChecked,
    formatLongDate: formatLongDate,
    monthLabel: monthLabel,
    balancePlan: balancePlan,
    priceLine: priceLine,
    isRealId: isRealId
  };
});

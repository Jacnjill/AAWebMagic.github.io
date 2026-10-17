(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.TNTLogic = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
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

  function buildQuoteMessage(a, utm) {
    var faith = a.tripType === 'Faith & heritage';
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
      faith ? 'Assalamu alaikum / Hi Trip N Travel 👋' : 'Hi Trip N Travel 👋',
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
    var src = utm && utm.source ? utm.source : 'direct';
    var camp = utm && utm.campaign ? utm.campaign : 'none';
    lines.push('Ref: ' + src + '/' + camp);
    return lines.join('\n');
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

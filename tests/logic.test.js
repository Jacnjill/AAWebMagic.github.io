const assert = require('assert');
const L = require('../js/logic.js');

function daysAgo(n) {
  const d = new Date();
  const utc = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  utc.setUTCDate(utc.getUTCDate() - n);
  return utc.toISOString().slice(0, 10);
}

const fresh = {
  id: 'real',
  placeholder: false,
  title: 'Turkey week',
  fromPricePP: 499,
  priceCheckedDate: daysAgo(7),
  nights: 7,
  board: 'Bed and breakfast',
  departureAirport: 'Bristol'
};
assert.strictEqual(L.isDealShowable(fresh, new Date(), 7), true);
assert.strictEqual(L.isDealShowable(Object.assign({}, fresh, { priceCheckedDate: daysAgo(8) }), new Date(), 7), false);
assert.strictEqual(L.isDealShowable(Object.assign({}, fresh, { placeholder: true, priceCheckedDate: daysAgo(0) }), new Date(), 7), false);
assert.strictEqual(L.isDealShowable(Object.assign({}, fresh, { fromPricePP: 0 }), new Date(), 7), false);
assert.strictEqual(L.isDealShowable(Object.assign({}, fresh, { title: '{{PLACEHOLDER: deal title}}' }), new Date(), 7), false);

assert.strictEqual(L.needsAdviser('Spain', false), false);
assert.strictEqual(L.needsAdviser('Turkey', false), false);
assert.strictEqual(L.needsAdviser('Greece', false), false);
assert.strictEqual(L.needsAdviser('Surprise me', false), true);
assert.strictEqual(L.needsAdviser('Other', false), true);
assert.strictEqual(L.needsAdviser('Spain', true), true);
assert.deepStrictEqual(L.coreDestinations([]).choices, ['Spain', 'Turkey', 'Greece', 'Surprise me', 'Other']);

const faith = L.buildQuoteMessage({
  tripType: 'Faith & heritage',
  destination: 'Turkey',
  month: '2027-06',
  monthLabel: 'June 2027',
  flexible: true,
  from: 'Bristol',
  adults: 2,
  children: 1,
  ages: ['7'],
  budget: '£400–£700',
  extras: ['Halal food', 'Private pool'],
  flightOnly: false
}, { source: 'instagram', campaign: 'ramadan' });
assert.ok(faith.startsWith('Assalamu alaikum / Hi Trip N Travel 👋'));
assert.ok(faith.includes('Trip type: Faith & heritage'));
assert.ok(faith.includes('Destination: Turkey'));
assert.ok(faith.includes('When: June 2027 (flexible)'));
assert.ok(faith.includes('From: Bristol'));
assert.ok(faith.includes('Travellers: 2 adults, 1 child aged 7'));
assert.ok(faith.includes('Budget: £400–£700'));
assert.ok(faith.includes('Extras: Halal food, Private pool'));
assert.ok(faith.includes('Ref: instagram/ramadan'));
assert.ok(!faith.includes('A travel adviser will reply to you'));
assert.ok(!faith.includes('Chat to Trip N Travel on WhatsApp'));

const other = L.buildQuoteMessage({
  tripType: 'Budget adventure',
  destination: 'Other',
  destinationOther: 'Portugal',
  flexible: true,
  from: 'Cardiff',
  adults: 1,
  children: 0,
  ages: [],
  budget: 'Under £400',
  extras: [],
  flightOnly: false
}, {});
assert.ok(other.startsWith('Hi Trip N Travel 👋'));
assert.ok(!other.includes('A travel adviser will reply to you'));
assert.ok(other.includes('Chat to Trip N Travel on WhatsApp'));
assert.ok(other.includes('Ref: direct/none'));
const href = L.waHref('447752340248', other);
assert.ok(href.startsWith('https://wa.me/447752340248?text='));
assert.ok(href.includes(encodeURIComponent('Hi Trip N Travel 👋')));
assert.strictEqual(decodeURIComponent(href.split('text=')[1]), other);

const plan = L.balancePlan({
  price: 1000,
  deposit: 100,
  departureMonth: '2027-07',
  weeks: 10,
  today: new Date(Date.UTC(2026, 9, 16))
});
assert.strictEqual(plan.ok, true);
assert.strictEqual(plan.dueLabel, '22 April 2027');
assert.match(plan.text, /^£100 deposit today, then about £\d+ a month — fully paid before you travel\.$/);

const soon = L.balancePlan({
  price: 500,
  deposit: 100,
  departureMonth: '2026-11',
  weeks: 10,
  today: new Date(Date.UTC(2026, 9, 16))
});
assert.strictEqual(soon.kind, 'soon');

console.log('logic tests passed');

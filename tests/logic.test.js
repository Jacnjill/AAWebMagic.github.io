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
  departureAirport: 'Manchester'
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

const registry = require('../source-phrases.json');
const { phrases } = registry;
assert.strictEqual(registry.scheme_version, 1);
assert.strictEqual(new Set(phrases.map(row => row.id)).size, phrases.length);
assert.strictEqual(new Set(phrases.map(row => L.phraseKey(row.phrase))).size, phrases.length);
for (const row of phrases) {
  assert.deepStrictEqual(Object.keys(row), ['id', 'kind', 'phrase', 'meaning', 'page', 'location']);
  assert.ok(!/[#\p{Cf}]|ref\s*:/iu.test(row.phrase), row.id);
}
const wrapper = require('fs').readFileSync(require.resolve('../js/source-phrases.js'), 'utf8');
assert.strictEqual(wrapper.split('window.TNTSourcePhrases = ')[1].replace(/;\n$/, '\n'),
  require('fs').readFileSync(require.resolve('../source-phrases.json'), 'utf8'));

const faith = L.buildQuoteMessage({
  tripType: 'Faith & heritage',
  destination: 'Turkey',
  month: '2027-06',
  monthLabel: 'June 2027',
  flexible: true,
  from: 'Manchester',
  adults: 2,
  children: 1,
  ages: ['7'],
  budget: '£400–£700',
  extras: ['Halal food', 'Private pool'],
  flightOnly: false
}, { source: 'instagram', campaign: 'ramadan' });
assert.ok(faith.startsWith(L.sourcePhrase('W-ENQUIRY-MM') + '\n'));
assert.ok(faith.includes('Trip type: Faith & heritage'));
assert.ok(faith.includes('Destination: Turkey'));
assert.ok(faith.includes('When: June 2027 (flexible)'));
assert.ok(faith.includes('From: Manchester'));
assert.ok(faith.includes('Travellers: 2 adults, 1 child aged 7'));
assert.ok(faith.includes('Budget: £400–£700'));
assert.ok(faith.includes('Extras: Halal food, Private pool'));
assert.ok(!/Ref:|instagram|ramadan/.test(faith));
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
assert.ok(other.startsWith(L.sourcePhrase('W-ENQUIRY-MM') + '\n'));
assert.ok(!other.includes('A travel adviser will reply to you'));
assert.ok(other.includes('Chat to Trip N Travel on WhatsApp'));
assert.ok(!other.includes('Ref:'));
const href = L.waHref('442045385838', other);
assert.ok(href.startsWith('https://wa.me/442045385838?text='));
assert.ok(href.includes(encodeURIComponent(L.sourcePhrase('W-ENQUIRY-MM'))));
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

/* Selection-aware WhatsApp opener */
assert.strictEqual(
  L.buildSelectionMessage({ destination: 'Turkey', when: 'June', adults: 2, children: 2 }),
  "Hi Trip N Travel, I'd like a quote for Turkey in June for 2 adults and 2 children."
);
assert.strictEqual(
  L.buildSelectionMessage({ destination: 'Spain', adults: 1, children: 1, ages: ['7'] }),
  "Hi Trip N Travel, I'd like a quote for Spain for 1 adult and 1 child aged 7."
);
assert.strictEqual(
  L.buildSelectionMessage({ destination: 'Other', destinationOther: 'Portugal', when: 'Flexible' }),
  "Hi Trip N Travel, I'd like a quote for Portugal with flexible dates."
);
assert.strictEqual(
  L.buildSelectionMessage({ destination: 'Greece', flightOnly: true, from: 'Cardiff' }),
  "Hi Trip N Travel, I'd like a quote for flights only to Greece flying from Cardiff."
);
assert.strictEqual(L.buildSelectionMessage({ destination: 'Not sure', when: '  ' }), '');
assert.strictEqual(L.buildSelectionMessage({ interest: 'holiday packages' }), '');
assert.strictEqual(
  L.buildSelectionMessage({ adults: 2, interest: 'holiday packages' }),
  "Hi Trip N Travel, I'd like a quote for the holiday packages for 2 adults."
);
/* Personal details and prices are never used, even if passed in */
const leaky = L.buildSelectionMessage({
  destination: 'Turkey', email: 'a@b.co', phone: '07700900123', name: 'Sam', budget: '£400–£700', message: 'secret'
});
assert.ok(!/@|07700|Sam|£|secret/.test(leaky));

console.log('logic tests passed');

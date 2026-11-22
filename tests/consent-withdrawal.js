// Withdrawing analytics consent on the same page stops Google Analytics at once
// (ga-disable flag) and deletes its cookies, without reloading the page.
// Run: node tests/consent-withdrawal.js
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const TNTLogic = require('../js/logic');

const source = fs.readFileSync(path.join(__dirname, '../js/consent.js'), 'utf8');
const ga4Id = 'G-T3VGVEDZ7V';
const disableKey = 'ga-disable-' + ga4Id;

function setup(config = {}) {
  let stored = null;
  let banner;
  let click;
  const scripts = [];
  const expired = [];
  const reloads = [];
  const settings = {
    'cookie-analytics': { checked: false },
    'cookie-marketing': { checked: false }
  };
  const addScript = (script) => scripts.push(script.src);
  const window = { TNTLogic };
  const document = {
    head: { appendChild: addScript },
    body: {
      appendChild(el) { banner = el; },
      classList: { add() {}, remove() {} }
    },
    createElement() {
      return {
        setAttribute() {},
        addEventListener(type, handler) { click = handler; },
        querySelector() { return null; },
        remove() { banner = null; }
      };
    },
    getElementsByTagName() { return [{ parentNode: { insertBefore: addScript } }]; },
    getElementById(id) { return id === 'cookie-banner' ? banner : settings[id]; },
    addEventListener() {},
    get cookie() { return '_ga=test; _ga_OTHER=test; essential=keep'; },
    set cookie(value) { expired.push(value); }
  };
  vm.runInNewContext(source, {
    window,
    document,
    TNTLogic,
    TNT: { ga4Id, ...config },
    localStorage: {
      getItem() { return stored; },
      setItem(key, value) { stored = value; }
    },
    location: {
      hostname: 'www.tripntravel.co.uk',
      reload() { reloads.push(true); }
    }
  });
  return {
    scripts, expired, reloads, window, stored: () => JSON.parse(stored),
    choose(action, analytics = false, marketing = false) {
      window.TNTConsent.open();
      settings['cookie-analytics'].checked = analytics;
      settings['cookie-marketing'].checked = marketing;
      click({ target: { closest: () => ({ getAttribute: () => action }) } });
    }
  };
}

const analytics = setup();
analytics.choose('reject');
assert.strictEqual(analytics.scripts.length, 0, 'a first Reject all loads nothing');
assert.strictEqual(analytics.expired.length, 0, 'nothing to delete on a first Reject all');
analytics.choose('accept');
assert.strictEqual(analytics.scripts.length, 1, 'Accept all loads GA once');
analytics.choose('save', true, false);
assert.strictEqual(analytics.window[disableKey], undefined, 'keeping analytics on does not disable GA');
analytics.choose('save', false, false);
assert.strictEqual(analytics.window[disableKey], true, 'withdrawal disables GA on this page at once');
const choice = analytics.stored();
assert.deepStrictEqual(choice, { necessary: true, analytics: false, marketing: false, updated: choice.updated });
assert.strictEqual(new Date(choice.updated).toISOString(), choice.updated);
for (const name of ['_ga', '_ga_OTHER']) {
  const expiry = name + '=; Max-Age=0; Path=/';
  assert.ok(analytics.expired.includes(expiry));
  assert.ok(analytics.expired.includes(expiry + '; Domain=www.tripntravel.co.uk'));
  assert.ok(analytics.expired.includes(expiry + '; Domain=tripntravel.co.uk'));
}
assert.ok(analytics.expired.every((value) => value.startsWith('_ga')), 'only GA cookies are deleted');
analytics.choose('accept');
assert.strictEqual(analytics.window[disableKey], false, 'granting again re-enables GA');
assert.strictEqual(analytics.scripts.length, 1, 'GA is not loaded twice');
assert.strictEqual(analytics.reloads.length, 0, 'consent changes never reload the page');

console.log('consent withdrawal checks passed');

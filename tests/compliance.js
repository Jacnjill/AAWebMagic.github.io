const fs = require('fs');
const path = require('path');
const assert = require('assert');

const root = path.join(__dirname, '..');
const skip = new Set(['.git', 'node_modules', 'tests']);

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    if (skip.has(name)) continue;
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

const files = walk(root);
const html = files.filter((f) => f.endsWith('.html'));
const textOf = (file) => fs.readFileSync(file, 'utf8');

function joined(parts) { return parts.join(''); }
const banned = [
  new RegExp(joined(['AB', 'TA']), 'i'),
  new RegExp(joined(['Je', 't2']), 'i'),
  new RegExp(joined(['easy', 'Jet']), 'i'),
  new RegExp(joined(['Hotel', 'beds']), 'i'),
  new RegExp(joined(['Beds', 'online']), 'i'),
  new RegExp(joined(['Avi', 'ate']), 'i'),
  new RegExp(joined(['BT', 'res']), 'i'),
  /guaranteed/i,
  /unbeatable/i,
  /best price/i,
  /Trusted by/i,
  /buy now pay later/i,
  /buy-now-pay-later/i,
  /\bAPR\b/,
  /\bloan\b/i,
  new RegExp('\\b' + joined(['Ay', 'at']) + '\\b')
];

for (const file of files) {
  if (file.endsWith('.woff2') || file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.webp')) continue;
  const text = textOf(file);
  for (const rule of banned) {
    assert.ok(!rule.test(text), `${path.relative(root, file)} matched ${rule}`);
  }
  assert.ok(!text.includes("href='#'") && !text.includes('href="#"'), `${file} has href=#`);
}

for (const file of html) {
  const text = textOf(file);
  assert.ok(!/ATOL/i.test(text), `${file} mentions ATOL`);
  const base = path.basename(file);
  if (base !== 'privacy.html') {
    assert.ok(!/\bPTS\b/.test(text) && !/Protected Trust Services/i.test(text), `${file} mentions PTS`);
  }
  assert.ok(!text.includes('6393'), `${file} has the PTS number`);
  assert.ok(!text.includes('G-T3VGVEDZ7V'), `${file} loads the GA id`);
  assert.ok(!text.includes('googletagmanager.com'), `${file} has a GA script`);
  assert.ok(text.includes('<h1'), `${file} needs an h1`);
  assert.strictEqual((text.match(/<h1/g) || []).length, 1, `${file} should have one h1`);
}

const config = textOf(path.join(root, 'js/config.js'));
assert.ok(config.includes('showAtolWording: false'));
assert.ok(config.includes('showPtsLine: false'));
assert.ok(config.includes('hubspotEnabled: false'));
assert.ok(config.includes('extraDestinations: []'));
assert.ok(config.includes("ga4Id: 'G-T3VGVEDZ7V'"));
assert.ok(config.includes('priceMaxAgeDays: 7'));

const deals = JSON.parse(textOf(path.join(root, 'data/deals.json')));
assert.ok(deals.every((d) => d.placeholder === true));
const reviews = JSON.parse(textOf(path.join(root, 'data/reviews.json')));
assert.deepStrictEqual(reviews, []);

for (const file of html) {
  if (path.basename(file) === 'inquiry.html') continue;
  const text = textOf(file);
  assert.ok(text.includes('js/config.js'), `${file} should load config`);
  assert.ok(text.includes('<title>'), `${file} needs a title`);
  assert.ok(text.includes('name="description"'), `${file} needs a description`);
  assert.ok(text.includes('rel="canonical"'), `${file} needs a canonical`);
}

const inquiry = textOf(path.join(root, 'inquiry.html'));
assert.ok(inquiry.includes('http-equiv="refresh"'));
assert.ok(inquiry.includes('enquiry.html'));
assert.ok(inquiry.includes('rel="canonical" href="https://tripntravel.co.uk/enquiry.html"'));

for (const name of ['privacy.html', 'cookies.html', 'terms.html', 'protection.html']) {
  assert.ok(textOf(path.join(root, name)).includes('DRAFT — requires review before publishing'));
}
assert.ok(textOf(path.join(root, 'protection.html')).includes('Financial protection details coming soon'));

console.log('compliance checks passed', files.length, 'files');

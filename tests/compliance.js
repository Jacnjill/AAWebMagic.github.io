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
  if (file.endsWith('.woff2') || file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.webp') || file.endsWith('.avif')) continue;
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

assert.ok(config.includes('showPlaceholderBlocks: false'));
assert.ok(config.includes('showAiDisclosure: false'));
assert.ok(config.includes("You'll chat with our AI travel assistant first"));
assert.ok(config.includes('showContactHours: false'));
assert.ok(textOf(path.join(root, 'topDeals.html')).includes('noindex'));
const siteJs = textOf(path.join(root, 'js/site.js'));
assert.ok(siteJs.includes("location.replace(dealsPageUrl('packages.html'))"));
assert.ok(textOf(path.join(root, 'netlify.toml')).includes('from = "/topdeals"'));

assert.ok(config.includes('instalmentTermsConfirmed: false'));
assert.ok(config.includes("askForQuote: 'Ask for a current quote'"));
assert.ok(config.includes("instalmentPublicLine: 'Spread the cost with a deposit and instalments'"));

const legalPages = new Set(['privacy.html', 'cookies.html', 'terms.html', 'protection.html']);
const token = /\{\{(?:PLACEHOLDER|VERIFY)\b/;
const voidEls = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);

function visibleMarkup(html) {
  let i = 0;
  let out = '';
  const stack = [];
  while (i < html.length) {
    if (html.startsWith('<!--', i)) {
      const end = html.indexOf('-->', i);
      i = end === -1 ? html.length : end + 3;
      continue;
    }
    if (html[i] === '<') {
      const end = html.indexOf('>', i);
      if (end === -1) break;
      const raw = html.slice(i, end + 1);
      const closing = /^<\s*\//.test(raw);
      const name = (raw.match(/^<\s*\/?\s*([a-zA-Z0-9]+)/) || [])[1];
      const tag = name ? name.toLowerCase() : '';
      const selfClose = /\/>\s*$/.test(raw) || voidEls.has(tag);
      const hidden = /(?:\s|^)hidden(?:\s|=|>|\/)/i.test(raw);
      if (closing) {
        while (stack.length) {
          const top = stack.pop();
          if (top.tag === tag) break;
        }
      } else if (tag && !selfClose) {
        stack.push({ tag, hidden: hidden || stack.some((frame) => frame.hidden) });
      }
      const covered = stack.some((frame) => frame.hidden) || hidden;
      if (!covered) out += raw;
      i = end + 1;
      continue;
    }
    const next = html.indexOf('<', i);
    if (!stack.some((frame) => frame.hidden)) out += html.slice(i, next === -1 ? html.length : next);
    i = next === -1 ? html.length : next;
  }
  return out;
}

for (const file of html) {
  const base = path.basename(file);
  const text = textOf(file);
  assert.ok(!text.includes('og:image'), `${base} still publishes an og:image`);
  assert.ok(!text.includes('twitter:image'), `${base} still publishes a twitter:image`);
  assert.ok(!text.includes('Not VAT registered'), `${base} states a VAT status`);
  assert.ok(!/low deposit/i.test(text), `${base} says low deposit`);
  assert.ok(!/Book securely/i.test(text), `${base} says Book securely`);
  assert.ok(!/tailored to you by the Trip N Travel team/i.test(text), `${base} uses the old hero line`);
  if (legalPages.has(base)) continue;
  const visible = visibleMarkup(text);
  assert.ok(!token.test(visible), `${base} renders a placeholder token:\n${visible.match(/.{0,80}\{\{(?:PLACEHOLDER|VERIFY).{0,80}/) || visible.slice(0, 240)}`);
  assert.ok(!/AI travel assistant/i.test(text), `${base} still has the AI-assistant sentence in the page`);
  assert.ok(!/a person/i.test(visible), `${base} says a person replies`);
  assert.ok(!/A travel adviser will reply/i.test(visible), `${base} says a travel adviser will reply`);
}

const consentLine = 'I agree to Trip N Travel contacting me about this enquiry (see <a href="privacy.html">Privacy Policy</a>)';
for (const name of ['enquiry.html', 'contact.html']) {
  const text = textOf(path.join(root, name));
  assert.ok(text.includes('name="enquiryConsent"'), `${name} needs the enquiry consent checkbox`);
  assert.ok(text.includes('required'), `${name} consent must be required`);
  assert.ok(text.includes(consentLine), `${name} consent label changed`);
  assert.ok(!/enquiryConsent"[^>]*checked/.test(text), `${name} consent must start unticked`);
}

assert.ok(!textOf(path.join(root, 'sitemap.xml')).includes('my-trip.html'));
const tripJs = textOf(path.join(root, 'js/my-trip.js'));
const tripHtml = textOf(path.join(root, 'my-trip.html'));
assert.ok(tripHtml.includes('Load forecast'));
assert.ok(tripHtml.includes('Open-Meteo'));
assert.ok(tripJs.includes('countryCode'));
assert.ok(tripJs.indexOf('fetch(') > tripJs.indexOf("addEventListener('click'"));
assert.ok(!tripHtml.includes('Loading the forecast'));

const missing = textOf(path.join(root, '404.html'));
for (const attr of missing.match(/(?:href|src|srcset)="[^"]+"/g) || []) {
  const url = attr.slice(attr.indexOf('"') + 1, -1);
  assert.ok(url.startsWith('/') || url.startsWith('#') || url.startsWith('https:') || url.startsWith('http:') || url.startsWith('mailto:') || url.startsWith('tel:'), `404 asset is not root-relative: ${url}`);
}

const netlify = textOf(path.join(root, 'netlify.toml'));
assert.ok(netlify.includes('from = "/inquiry.html"'));
assert.ok(netlify.includes('to = "/enquiry.html"'));
assert.ok(netlify.includes('status = 301'));
assert.ok(netlify.includes('context.deploy-preview.headers'));
assert.ok(netlify.includes('context.branch-deploy.headers'));
assert.ok(netlify.includes('X-Robots-Tag = "noindex"'));
assert.ok(!/context\.production/.test(netlify), 'production context must stay free of preview headers');

const forms = textOf(path.join(root, 'js/forms.js'));
assert.ok(forms.includes('enquiryConsent'));
const matchmaker = textOf(path.join(root, 'js/matchmaker.js'));
assert.ok(matchmaker.includes('reply on WhatsApp'));
assert.ok(matchmaker.includes('hubspotEnabled'));

console.log('compliance checks passed', files.length, 'files');

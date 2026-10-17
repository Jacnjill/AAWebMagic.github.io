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

for (const name of ['privacy.html', 'cookies.html', 'terms.html', 'protection.html', 'complaints.html']) {
  assert.ok(textOf(path.join(root, name)).includes('DRAFT — requires review before publishing'));
}
assert.ok(textOf(path.join(root, 'protection.html')).includes('Financial protection details coming soon'));

assert.ok(config.includes('showPlaceholderBlocks: false'));
assert.ok(config.includes('showFounderBio: false'));
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

const legalPages = new Set(['privacy.html', 'cookies.html', 'terms.html', 'protection.html', 'complaints.html']);
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

const legalLine = 'TRIPNTRAVEL PRIVATE LTD, company number 16525641, registered in England and Wales, registered office 36 Scotts Road, Bromley, Kent BR1 3QD';
assert.ok(config.includes(legalLine), 'config must keep the full company line');
assert.ok(siteJs.includes('legalFooterLine'), 'footer company line must be filled from config');
assert.ok(siteJs.includes("el.innerHTML = legalHtml"), 'the company line must be written into the page');
const consentJs = textOf(path.join(root, 'js/consent.js'));
const actionRow = consentJs.slice(consentJs.indexOf('<div class="cookie-actions">'), consentJs.indexOf('cookie-settings'));
assert.ok(actionRow.includes('class="btn" data-cookie="accept">Accept all</button>'), 'Accept all must be a first-row button');
assert.ok(actionRow.includes('class="btn" data-cookie="reject">Reject all</button>'), 'Reject all must be a first-row button');
assert.ok(!actionRow.includes('hidden'), 'Accept all and Reject all must not sit in a hidden step');
assert.ok(consentJs.includes('analytics: false, marketing: false'), 'Reject all must leave analytics and marketing off');
const applyFn = consentJs.slice(consentJs.indexOf('function apply'), consentJs.indexOf('function event'));
assert.ok(applyFn.includes('if (choice.analytics) loadGa()'), 'analytics pixels stay off until accepted');
assert.ok(applyFn.includes('if (choice.marketing)'), 'marketing pixels stay off until accepted');
assert.ok(applyFn.includes('loadMeta()') && applyFn.includes('loadTikTok()'));
assert.ok(consentJs.includes('if (!choice) render(false);\n    else apply(choice);'), 'pixels must not load before a choice');
const siteCss = textOf(path.join(root, 'css/site.css'));
assert.ok(siteCss.includes('.cookie-actions { display: flex; flex-wrap: nowrap;'), 'cookie choices stay on one row');
assert.ok(siteCss.includes('.cookie-actions .btn { flex: 1 1 0;'), 'Accept all and Reject all share one button size');

const aboutHtml = textOf(path.join(root, 'about.html'));
assert.ok(!aboutHtml.includes('brand-panel'), 'about page must not ship the founder card');
const bioStart = aboutHtml.indexOf('data-founder-bio');
assert.ok(bioStart !== -1, 'about page keeps the hidden founder slot');
const bioTag = aboutHtml.slice(Math.max(0, bioStart - 80), bioStart + 40);
assert.ok(/data-founder-bio[^>]*hidden/.test(bioTag) || /hidden[^>]*data-founder-bio/.test(bioTag), 'founder bio slot must be hidden in the markup');
assert.ok(aboutHtml.includes('{{PLACEHOLDER: founder bio, wording approved by Raja}}'), 'founder bio slot must wait for Raja');
assert.ok(aboutHtml.includes('{{PLACEHOLDER: founder location, wording approved by Raja}}'), 'founder location slot must wait for Raja');
const aboutVisible = visibleMarkup(aboutHtml).replace(/<[^>]+>/g, ' ');
assert.ok(!/bristol|based in|\blocation\b/i.test(aboutVisible), 'about page must not show a location while the bio flag is off');
assert.ok(!/\b(years?|experience|expert|award)\b/i.test(aboutVisible), 'about page must not show an experience claim while the bio flag is off');
assert.ok(!/Raja Ali, founder\./.test(aboutVisible), 'the duplicate Raja Ali team line must stay off the about page');
assert.ok(siteJs.includes("el.hidden = !(TNT.showFounderBio && !/\\{\\{/.test(el.textContent || ''))"), 'founder bio stays hidden until the flag is on and the wording has no placeholder');
assert.ok(textOf(path.join(root, 'destinations.html')).includes('Not sure where? Tell us your budget'), 'destinations page needs the closing line');

for (const file of html) {
  const base = path.basename(file);
  if (base === 'inquiry.html') continue;
  const text = textOf(file);
  const footerStart = text.indexOf('<footer');
  const footerEnd = text.lastIndexOf('</footer>');
  assert.ok(footerStart !== -1 && footerEnd > footerStart, `${base} needs a footer`);
  const footer = text.slice(footerStart, footerEnd);
  assert.ok(footer.includes('data-company') && !/data-company[^>]*hidden/.test(footer), `${base} must show the company line`);
  const rootPrefix = base === '404.html' ? '/' : '';
  assert.ok(footer.includes(`href="${rootPrefix}privacy.html"`), `${base} footer needs the privacy link`);
  assert.ok(footer.includes(`href="${rootPrefix}cookies.html"`), `${base} footer needs the cookie link`);
  assert.ok(footer.includes(`href="${rootPrefix}complaints.html"`), `${base} footer needs the complaints link`);
  assert.ok(footer.includes('>Complaints</a>'), `${base} complaints link must be visible`);
}

const forms = textOf(path.join(root, 'js/forms.js'));
assert.ok(forms.includes('enquiryConsent'));
const matchmaker = textOf(path.join(root, 'js/matchmaker.js'));
assert.ok(matchmaker.includes('reply on WhatsApp'));
assert.ok(matchmaker.includes('hubspotEnabled'));

const { spawnSync } = require('child_process');
const cookieRun = spawnSync(process.execPath, [path.join(__dirname, 'cookie-banner.js')], {
  encoding: 'utf8',
  timeout: 180000,
  env: Object.assign({}, process.env, { NODE_PATH: '/tmp/pw/node_modules' })
});
if (cookieRun.stdout) process.stdout.write(cookieRun.stdout);
if (cookieRun.status !== 0) {
  if (cookieRun.stderr) process.stderr.write(cookieRun.stderr);
  throw new Error('cookie banner check failed');
}

console.log('compliance checks passed', files.length, 'files');

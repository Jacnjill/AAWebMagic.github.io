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
  assert.ok(!/open WhatsApp with your message so you can send it/i.test(text), `${path.relative(root, file)} still says the form opens WhatsApp with the message`);
}

for (const file of html) {
  const text = textOf(file);
  assert.ok(!/ATOL/i.test(text), `${file} mentions ATOL`);
  const base = path.basename(file);
  const advisorPtsPages = new Set(['privacy.html', 'cookies.html', 'complaints.html']);
  if (!advisorPtsPages.has(base)) {
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
assert.ok(config.includes('hubspotEnabled: true'));
assert.ok(config.includes("privacyUrl: 'privacy.html'"));
assert.ok(config.includes('legalPagesFinal: true'));
assert.ok(config.includes('privacyLineFinal: true'));
assert.ok(config.includes("leadEndpoint: 'https://tntsalesai.netlify.app/.netlify/functions/website-lead'"));
assert.ok(!config.includes('hubspotPortalId'), 'HubSpot portal id should be gone from the website route');
assert.ok(!config.includes('hubspotFormId'), 'HubSpot form id should be gone from the website route');
assert.ok(!config.includes('hsforms.com'), 'config must not name the HubSpot Forms API');
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

for (const name of ['privacy.html', 'cookies.html', 'terms.html', 'complaints.html']) {
  const text = textOf(path.join(root, name));
  assert.ok(!text.includes('DRAFT — requires review before publishing'), name + ' still shows the draft banner');
  const titles = [
    ...text.matchAll(/<title>([^<]*)<\/title>/g),
    ...text.matchAll(/<meta property="og:title" content="([^"]*)"/g),
    ...text.matchAll(/<meta name="twitter:title" content="([^"]*)"/g)
  ].map((match) => match[1]);
  assert.strictEqual(titles.length, 3, name + ' should have a title, og:title and twitter:title');
  for (const title of titles) {
    assert.ok(!/\(draft\)/i.test(title), name + ' title still says (draft): ' + title);
  }
}

const termsHtml = textOf(path.join(root, 'terms.html'));
assert.ok(termsHtml.includes('<title>Booking Terms | Trip N Travel</title>'), 'terms title must be Booking Terms | Trip N Travel');
assert.ok(!termsHtml.includes('{{'), 'terms.html must contain no {{');
assert.ok(!termsHtml.includes('draft'), 'terms.html must contain no draft');
assert.ok(!termsHtml.includes('This is a draft for review'), 'the draft review sentence must be gone');
assert.ok(termsHtml.includes('<h1>Booking terms</h1>'), 'terms h1 must stay Booking terms');
const termsHeadings = [
  ['We act as an agent', '<h2>We act as an agent</h2>'],
  ['Before you pay', '<h2>Before you pay</h2>'],
  ['Payments', '<h2>Payments</h2>'],
  ['Instalments', '<h2>Instalments</h2>'],
  ['Financial protection', '<h2>Financial protection</h2>'],
  ['Changes and cancellations', '<h2>Changes and cancellations</h2>'],
  ['Complaints', '<h2 id="complaints">Complaints</h2>'],
  ['Law', '<h2>Law</h2>']
];
for (const [heading, tag] of termsHeadings) {
  assert.ok(termsHtml.includes(tag), 'terms.html missing heading ' + heading);
}
const termsCopy = [
  "Trip N Travel, a name used by TRIPNTRAVEL PRIVATE LTD (company no. 16525641, 36 Scotts Road, Bromley BR1 3QD), arranges holidays as an agent. The organiser's booking conditions apply to your holiday, flights and accommodation, and your contract for the travel services is with the organiser once a booking is made. We send you the organiser's booking conditions with your quote.",
  'We need the passenger details the organiser asks for before payment is taken. Please check that names match passports exactly.',
  'You pay only through the secure payment link we send you. We never ask you to pay any other way. Your quote shows the total price and when each payment is due.',
  "If you pay by instalments, each payment is a payment towards the holiday price, made before you travel. Your quote sets out the dates and amounts. There is no interest or fee for using an instalment plan, and the final payment is always due before the organiser's balance date.",
  'Details of the financial protection that applies to your booking are given with your confirmation.',
  "Changes and cancellations follow the organiser's conditions. Any fee the organiser charges, and any fee we charge, will be set out in your quote before you pay.",
  'See <a href="/complaints.html">our Complaints page</a>. If we can\'t settle a complaint, we will tell you whether we agree to use an alternative dispute resolution provider.',
  'These terms are governed by the law of England and Wales. If you live in Scotland or Northern Ireland you may also bring proceedings in your local courts.'
];
for (const paragraph of termsCopy) {
  assert.ok(termsHtml.includes(paragraph), 'terms.html is missing approved wording');
}
const termsMain = termsHtml.slice(termsHtml.indexOf('<main'), termsHtml.indexOf('</main>'));
assert.ok(!termsMain.includes('data-company'), 'terms main must not carry data-company');
assert.ok(!termsMain.includes('data-payment-note'), 'terms main must not carry data-payment-note');
assert.ok(!termsMain.includes('data-instalment'), 'terms main must not carry data-instalment');
assert.ok(!termsHtml.includes('data-payment-note'), 'terms.html must not carry data-payment-note');
assert.ok(!termsHtml.includes('data-instalment'), 'terms.html must not carry data-instalment');
assert.ok(termsHtml.includes('data-crumbs'), 'terms breadcrumb must keep data-crumbs');
assert.ok(termsHtml.slice(termsHtml.indexOf('<footer')).includes('data-company'), 'terms footer must keep the company line');
assert.ok(!/\bprotected\b/i.test(termsHtml), 'terms.html must not say protected');
assert.ok(!/trust-account/i.test(termsHtml), 'terms.html must not say trust-account');
assert.ok(!fs.existsSync(path.join(root, 'protection.html')), 'protection.html must not be published');

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
assert.ok(!config.includes('standardDepositLabel'), 'the unused deposit label should be gone');
assert.ok(!config.includes('balanceDueWeeksLabel'), 'the unused balance-due label should be gone');
assert.ok(!config.includes('balanceDueWeeksDefault'), 'the unused balance-due weeks key should be gone');
assert.ok(!config.includes('instalmentVerify'), 'the unused instalment verify key should be gone');

const indexHtml = textOf(path.join(root, 'index.html'));
assert.ok(!indexHtml.includes('{{'), 'index.html must contain no {{');
assert.ok(!indexHtml.includes('calculator.js'), 'index.html must not load the instalment calculator');
assert.ok(!indexHtml.includes('id="calculator"'), 'index.html must not keep the calculator section');
assert.ok(!indexHtml.includes('cost-form'), 'index.html must not contain the instalment calculator form');
assert.ok(!indexHtml.includes('Show the illustration'), 'index.html must not contain the calculator button');
assert.ok(!indexHtml.includes('Balance due weeks'), 'index.html must not contain the balance-due line');
assert.ok(!indexHtml.includes('cost-result'), 'index.html must not contain the calculator result');
assert.ok(!indexHtml.includes('data-form="guide"'), 'index.html must not contain the guide form');
assert.ok(!indexHtml.includes('guide-name') && !indexHtml.includes('Request the guide') && !indexHtml.includes('Turkey on a Budget'), 'index.html must not collect guide details');
assert.ok(!/#guide\b/.test(indexHtml), 'index.html must not link to a guide anchor');
assert.ok(indexHtml.includes('<h2>Spread the cost</h2>'), 'Spread the cost heading stays');
assert.ok(indexHtml.includes("Ask us about paying by deposit and instalments. Your quote shows the deposit and the date and amount of each payment. There is no interest or fee for using a plan, and your final payment is always due before the organiser's balance date."), 'approved instalment wording');
const spreadStart = indexHtml.indexOf('<h2>Spread the cost</h2>');
const spreadEnd = indexHtml.indexOf('</section>', spreadStart);
const spreadSection = indexHtml.slice(spreadStart, spreadEnd);
assert.ok(spreadStart !== -1 && spreadEnd > spreadStart, 'homepage needs a Spread the cost section');
assert.ok(spreadSection.includes('<a class="btn btn-accent" data-instalment href="enquiry.html">Ask for a current quote</a>'), 'Spread the cost section must link to enquiry.html');
assert.ok(indexHtml.includes("I'm Raja Ali, founder of Trip N Travel. Tell us who is travelling, when you want to go and roughly what you would like to spend, and we will come back to you on WhatsApp or by phone with a quote. Our AI assistant may reply first, and our team can take over at any time."), 'approved Meet Raja wording');
assert.ok(!indexHtml.includes('how Raja started the agency'), 'the Raja placeholder paragraph must be gone');
assert.ok(!fs.existsSync(path.join(root, 'js/calculator.js')), 'calculator.js should be removed');
for (const file of html) {
  const page = textOf(file);
  const baseName = path.basename(file);
  assert.ok(!page.includes('#guide'), baseName + ' still links to #guide');
  assert.ok(!page.includes('data-form="guide"'), baseName + ' still has a guide form');
}

const legalPages = new Set(['privacy.html', 'cookies.html', 'terms.html', 'complaints.html']);
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
const enquiryHtml = textOf(path.join(root, 'enquiry.html'));
assert.ok(enquiryHtml.includes('name="firstname"'), 'enquiry form needs a first name');
assert.ok(enquiryHtml.includes('name="lastname"'), 'enquiry form needs a last name');
assert.ok(enquiryHtml.includes('name="tnt_marketing_consent"'), 'enquiry form needs the marketing consent field');
assert.ok(!/tnt_marketing_consent"[^>]*checked/.test(enquiryHtml), 'marketing consent must start unticked');
assert.ok(enquiryHtml.includes('I can stop these at any time by replying STOP or by telling you.'), 'WhatsApp offers need the STOP wording');
assert.ok(enquiryHtml.includes('Find out more in our <a href="privacy.html">Privacy Notice</a>.'), 'enquiry form privacy line must link to the notice');
assert.ok(enquiryHtml.includes("We'll reply by WhatsApp, phone or email, usually within office hours (9am to 8pm). Nothing is booked yet."), 'enquiry form should say how we reply');
assert.ok(!enquiryHtml.includes('js-eu1.hsforms.net'), 'enquiry page must not embed the HubSpot script');
assert.ok(!enquiryHtml.includes('hs-form-frame'), 'enquiry page must not embed a HubSpot frame');
for (const file of html) {
  const text = textOf(file);
  assert.ok(!text.includes('js-eu1.hsforms.net'), `${path.basename(file)} embeds the HubSpot script`);
  assert.ok(!text.includes('hs-form-frame'), `${path.basename(file)} embeds a HubSpot frame`);
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
assert.ok(netlify.includes('X-Robots-Tag = "noindex, nofollow"'));
assert.ok(!/context\.production/.test(netlify), 'do not add a production-only header block; the site-wide header is the indexing switch');

const robotsTxt = textOf(path.join(root, 'robots.txt'));
const noindexOn = /^Disallow: \/$/m.test(robotsTxt);
if (noindexOn) {
  assert.ok(/^User-agent: \*$/m.test(robotsTxt), 'robots.txt needs User-agent: * while noindex is on');
  assert.ok(/# BEGIN indexing-off[\s\S]*\[\[headers\]\][\s\S]*for = "\/\*"[\s\S]*X-Robots-Tag = "noindex, nofollow"[\s\S]*# END indexing-off/.test(netlify), 'the site-wide noindex header must cover every deploy context');
}
for (const file of html) {
  const base = path.basename(file);
  const text = textOf(file);
  const comment = text.match(/<!-- build: ([0-9a-f]{7}) -->/);
  const meta = text.match(/<meta name="build" content="([0-9a-f]{7})">/);
  const foot = text.match(/data-build hidden>build ([0-9a-f]{7})</);
  assert.ok(comment && meta && foot, `${base} is missing the build marker`);
  assert.strictEqual(comment[1], meta[1], `${base} build comment and meta differ`);
  assert.strictEqual(comment[1], foot[1], `${base} build comment and footer differ`);
  if (noindexOn) {
    assert.ok(text.includes('<meta name="robots" content="noindex, nofollow">'), `${base} must carry noindex, nofollow while indexing is off`);
  }
  assert.ok(!text.includes('protection.html'), `${base} links to protection.html`);
  assert.ok(!text.includes('Top Deals'), `${base} must not contain Top Deals`);
  assert.ok(!text.includes('Financial Protection'), `${base} must not contain Financial Protection`);
  const navs = text.match(/<nav\b[\s\S]*?<\/nav>/gi) || [];
  const footerStart = text.indexOf('<footer');
  const footerEnd = text.lastIndexOf('</footer>');
  const regions = navs.join('\n') + (footerStart !== -1 && footerEnd > footerStart ? text.slice(footerStart, footerEnd) : '');
  assert.ok(!regions.includes('Top Deals'), `${base} navigation or footer contains Top Deals`);
  assert.ok(!regions.includes('Financial Protection'), `${base} navigation or footer contains Financial Protection`);
  assert.ok(!regions.includes('topDeals.html'), `${base} navigation or footer links to topDeals.html`);
}
const sitemap = textOf(path.join(root, 'sitemap.xml'));
assert.ok(!sitemap.includes('protection.html'), 'sitemap must not list protection.html');
assert.ok(!textOf(path.join(root, 'netlify.toml')).includes('protection.html'), 'redirects must not publish protection.html');

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
const staffPlace = joined(['Bris', 'tol']);
const staffPlace2 = joined(['Bradley', ' ', 'Stoke']);
const basedPhrase = joined(['based', ' in']);
assert.ok(!new RegExp(staffPlace + '|' + basedPhrase + '|\\blocation\\b', 'i').test(aboutVisible), 'about page must not show a location while the bio flag is off');
for (const file of files) {
  if (/\.(woff2|jpg|png|webp|avif)$/.test(file)) continue;
  const shipped = textOf(file);
  const rel = path.relative(root, file);
  assert.ok(!shipped.includes(staffPlace), `${rel} names a staff place`);
  assert.ok(!shipped.includes(staffPlace2), `${rel} names a second staff place`);
}
assert.ok(!/\b(years?|experience|expert|award)\b/i.test(aboutVisible), 'about page must not show an experience claim while the bio flag is off');
assert.ok(!/Raja Ali, founder\./.test(aboutVisible), 'the duplicate Raja Ali team line must stay off the about page');
assert.ok(siteJs.includes("el.hidden = !(TNT.showFounderBio && !/\\{\\{/.test(el.textContent || ''))"), 'founder bio stays hidden until the flag is on and the wording has no placeholder');
assert.ok(textOf(path.join(root, 'destinations.html')).includes('Not sure where? Tell us your budget'), 'destinations page needs the closing line');
const paymentLine = 'Payment is taken only through a payment link we send you when you decide to book.';
assert.ok(textOf(path.join(root, 'packages.html')).includes(paymentLine), 'payment is taken only when someone decides to book');
assert.ok(textOf(path.join(root, 'packages.html')).includes('>Ask for a current quote</a>'), 'packages keeps Ask for a current quote');
for (const file of files) {
  if (file.endsWith('.woff2') || file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.webp') || file.endsWith('.avif')) continue;
  assert.ok(!textOf(file).includes('sent with your quote'), `${path.relative(root, file)} still ties the payment link to the quote`);
}

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

const suppliedFormLine = 'By sending this form you agree we may use your details to reply to your enquiry, as explained in our Privacy Notice.';
assert.ok(!enquiryHtml.includes(suppliedFormLine));
assert.ok(!textOf(path.join(root, 'contact.html')).includes(suppliedFormLine));
const privacyAboveButton = 'Trip N Travel (TRIPNTRAVEL PRIVATE LTD) will use your details to reply to your enquiry and send you quotes by WhatsApp, phone or email. Find out more in our <a href="privacy.html">Privacy Notice</a>.';
for (const name of ['enquiry.html', 'contact.html']) {
  const page = textOf(path.join(root, name));
  const at = page.indexOf(privacyAboveButton);
  const button = page.indexOf('type="submit"', at);
  assert.ok(at !== -1, name + ' is missing the enquiry privacy line');
  assert.ok(button > at, name + ' privacy line must sit above the submit button');
}
assert.ok(textOf(path.join(root, 'js/matchmaker.js')).includes(privacyAboveButton), 'matchmaker enquiry form needs the privacy line');

const expectedPlaceholders = {
  'privacy.html': ['[DATE OF PUBLICATION]'],
  'cookies.html': ['[DATE OF PUBLICATION]'],
  'complaints.html': ['[DATE OF PUBLICATION]']
};
const legalFinal = /legalPagesFinal:\s*true/.test(config);
for (const [name, expected] of Object.entries(expectedPlaceholders)) {
  const text = textOf(path.join(root, name));
  const found = [...text.matchAll(/<span class="placeholder">(\[[^\]]+\])<\/span>/g)].map((match) => match[1]);
  console.log('placeholders ' + name + ': ' + (found.join(' | ') || '(none)'));
  assert.ok(!text.includes('[LINK]'), name + ' still has a [LINK] marker');
  assert.ok(!text.includes('[LINK TO COOKIE NOTICE]'), name + ' still has a cookie-notice marker');
  assert.ok(!text.includes('[VERIFIED LIFETIME]'), name + ' still has an unverified lifetime');
  assert.ok(text.includes('>Privacy Notice</a>'), name + ' footer should say Privacy Notice');
  assert.ok(text.includes('>Cookie Notice</a>'), name + ' footer should say Cookie Notice');
  assert.ok(text.includes('data-manage-cookies'), name + ' needs Manage cookies');
  if (legalFinal) {
    assert.deepStrictEqual(found, [], name + ' still has placeholders while legalPagesFinal is true');
  } else {
    assert.deepStrictEqual(found, expected, name + ' placeholder list changed');
  }
}
assert.ok(textOf(path.join(root, 'cookies.html')).includes('No expiry is set. It stays in local storage until the browser clears it or the choice is saved again.'));
assert.ok(textOf(path.join(root, 'cookies.html')).includes('>_ga</td>'));
assert.ok(textOf(path.join(root, 'cookies.html')).includes('>_ga_T3VGVEDZ7V</td>'));
assert.ok(!textOf(path.join(root, 'cookies.html')).includes('To be confirmed'));
assert.ok(textOf(path.join(root, 'cookies.html')).includes("We don't currently use advertising cookies. If that changes, we will ask for your consent first and update this page."));
assert.ok(!textOf(path.join(root, 'cookies.html')).includes('ADVISOR TO CONFIRM'));
assert.ok(!textOf(path.join(root, 'cookies.html')).includes('information collected by advertising tags goes to Meta and Google'));
assert.ok(!textOf(path.join(root, 'cookies.html')).includes('On Facebook, Instagram and Google'));
assert.ok(textOf(path.join(root, 'cookies.html')).includes('Analytics stays off.'));
assert.ok(textOf(path.join(root, 'cookies.html')).includes('we stop using analytics.'));
assert.ok(!textOf(path.join(root, 'cookies.html')).includes('Analytics and advertising stay off.'));
assert.ok(!textOf(path.join(root, 'cookies.html')).includes('we stop using analytics and advertising tags.'));
assert.ok(textOf(path.join(root, 'cookies.html')).includes('<h3>Advertising (not currently used)</h3>'));
assert.ok(!textOf(path.join(root, 'cookies.html')).includes('Advertising (off unless you click Accept all)'));
assert.ok(textOf(path.join(root, 'cookies.html')).includes('explained in our <a href="privacy.html">Privacy Notice</a>.'));
assert.ok(textOf(path.join(root, 'cookies.html')).includes('section 7 of our <a href="privacy.html">Privacy Notice</a>.'));
assert.ok(textOf(path.join(root, 'cookies.html')).includes('Our <a href="privacy.html">Privacy Notice</a> explains'));
assert.ok(textOf(path.join(root, 'cookies.html')).includes('how to use them: <a href="privacy.html">Privacy Notice</a>.'));
assert.ok(textOf(path.join(root, 'cookies.html')).includes('2 years by default. Chrome may limit it to 400 days, and Safari to 7 days, if you do not visit again.'));
assert.ok(textOf(path.join(root, 'privacy.html')).includes('our separate <a href="cookies.html">Cookie Notice</a>.'));
assert.ok(textOf(path.join(root, 'complaints.html')).includes('covered in our <a href="privacy.html">Privacy Notice</a>.'));
assert.ok(textOf(path.join(root, 'complaints.html')).includes('as explained in our <a href="privacy.html">Privacy Notice</a>.'));
assert.ok(textOf(path.join(root, 'privacy.html')).includes('Who looks after the recordings for us: we handle calls through our phone system provider, 3CX, and Twilio, which carries our calls, records and stores them on our behalf (see sections 6 and 7).'));
assert.ok(textOf(path.join(root, 'privacy.html')).includes('They act on our instructions, apart from limited purposes of their own, such as security and keeping their services running, which they explain in their own privacy notices:'));
assert.ok(textOf(path.join(root, 'privacy.html')).includes('Meta: its WhatsApp Business platform, which we use to send and receive our WhatsApp messages, and Facebook and Instagram lead forms and adverts'));
assert.ok(textOf(path.join(root, 'privacy.html')).includes('3CX and Twilio: 3CX is our phone system provider. Twilio carries our phone calls, and records and stores our call recordings for us'));
assert.ok(textOf(path.join(root, 'privacy.html')).includes('Calls with Trip N Travel advisers are recorded for training, quality and complaint-handling purposes.'));
assert.ok(!textOf(path.join(root, 'privacy.html')).includes('Twilio, our phone calling provider'));
assert.ok(!textOf(path.join(root, 'privacy.html')).includes('They only use your information to provide their service to us'));
assert.ok(!/3CX stores|stored by 3CX|3CX, which/i.test(textOf(path.join(root, 'privacy.html'))), 'privacy notice must not say 3CX stores calls');
assert.ok(!textOf(path.join(root, 'cookies.html')).includes('3CX'));
assert.ok(!textOf(path.join(root, 'complaints.html')).includes('3CX'));
assert.ok(textOf(path.join(root, 'privacy.html')).includes('It processes your enquiry messages and trip details (such as your first name, destination, dates, party size, budget, the occasion and your message) to help write replies and quotes. When our advisers use AI tools, it can also see names, phone numbers and recent messages for that enquiry. It acts under our instructions.'));
assert.ok(!textOf(path.join(root, 'privacy.html')).includes('only to help write replies to you, and acts under our instructions'));
assert.ok(textOf(path.join(root, 'privacy.html')).includes('It is based in the US (see section 7). If you write to us about health, accessibility, children, visas, complaints or refunds, a person deals with it and the message is not sent to the AI.'));
const privacyHtml = textOf(path.join(root, 'privacy.html'));
const healthParagraph = 'Health and accessibility needs. Special requirements can sometimes include health or accessibility information, such as a wheelchair request or a medical condition. The law treats this as "special category" data. We only collect and use it where we need it to arrange your travel, with your explicit consent or where the law otherwise allows.';
const dietaryHeading = '<h3>Dietary and faith-related requests</h3>';
const dietaryParagraph = 'You can ask for things such as halal meals, an alcohol-free hotel or prayer facilities. These requests can reveal religious belief, which the law treats as special category data. We use them only to arrange your holiday and pass them to the supplier only so they can arrange it. We note them as a request on your booking, not as a label about you. Our AI assistant may process them. We treat your request as your explicit consent for this purpose, and you can withdraw it at any time by telling us.';
const healthAt = privacyHtml.indexOf(healthParagraph);
const dietaryAt = privacyHtml.indexOf(dietaryHeading);
assert.ok(healthAt !== -1, 'the health and accessibility paragraph stays');
assert.ok(dietaryAt > healthAt, 'the dietary section sits after the health paragraph');
const betweenHealthAndDietary = privacyHtml.slice(healthAt + healthParagraph.length, dietaryAt);
assert.ok(!/<h[12]|<p>/.test(betweenHealthAndDietary), 'the dietary section sits next to the health paragraph');
const dietaryEnd = privacyHtml.indexOf('</p>', dietaryAt);
const dietarySection = privacyHtml.slice(dietaryAt, dietaryEnd + 4);
assert.ok(dietarySection.includes(dietaryHeading), 'privacy notice needs the dietary and faith-related heading');
assert.ok(dietarySection.includes('<p>' + dietaryParagraph + '</p>'), 'dietary section paragraph must match the approved wording');
assert.ok(!dietarySection.includes('{{'), 'the dietary section must contain no {{');
assert.ok(!dietarySection.includes('draft'), 'the dietary section must contain no draft');
assert.ok(!privacyHtml.includes('{{'), 'privacy.html must contain no {{');
assert.ok(textOf(path.join(root, 'privacy.html')).includes('Office hours: 7 days a week, 9:00am to 8:00pm UK time'));
assert.ok(textOf(path.join(root, 'privacy.html')).includes('Our office hours are 7 days a week, 9:00am to 8:00pm UK time.'));
assert.ok(textOf(path.join(root, 'cookies.html')).includes('Our office hours are 7 days a week, 9:00am to 8:00pm UK time.'));
assert.ok(textOf(path.join(root, 'complaints.html')).includes('Contact us during our office hours: 7 days a week, 9:00am to 8:00pm UK time.'));
assert.ok(textOf(path.join(root, 'complaints.html')).includes('during our office hours, 7 days a week, 9:00am to 8:00pm UK time'));
assert.ok(textOf(path.join(root, 'complaints.html')).includes('not available around the clock'));
assert.ok(textOf(path.join(root, 'complaints.html')).includes('<a href="tel:+442045385838">+44 20 4538 5838</a>'));
assert.ok(textOf(path.join(root, 'complaints.html')).includes('<a href="https://wa.me/442045385838">+44 20 4538 5838</a>'));
assert.ok(!textOf(path.join(root, 'complaints.html')).includes('wa.me/442045385838?text='));
assert.ok(textOf(path.join(root, 'complaints.html')).includes('reply within 14 days.'));
assert.ok(!textOf(path.join(root, 'complaints.html')).includes('[PHONE NUMBER:'));
assert.ok(!textOf(path.join(root, 'complaints.html')).includes('[WHATSAPP NUMBER:'));
assert.ok(!textOf(path.join(root, 'complaints.html')).includes('[REVIEW REPLY TIME:'));
for (const name of ['privacy.html', 'cookies.html', 'complaints.html']) {
  assert.ok(!textOf(path.join(root, name)).includes('9am to 8pm'), name + ' still has the old office hours');
}
for (const file of html) {
  const base = path.basename(file);
  if (base === 'inquiry.html') continue;
  const text = textOf(file);
  const footerStart = text.indexOf('<footer');
  const footer = text.slice(footerStart);
  const prefix = base === '404.html' ? '/' : '';
  assert.ok(footer.includes(`href="${prefix}privacy.html">Privacy Notice</a>`), `${base} footer link should read Privacy Notice`);
  assert.ok(footer.includes(`href="${prefix}cookies.html">Cookie Notice</a>`), `${base} footer link should read Cookie Notice`);
  assert.ok(footer.includes('data-manage-cookies'), `${base} footer needs Manage cookies`);
}

const forms = textOf(path.join(root, 'js/forms.js'));
assert.ok(forms.includes('enquiryConsent'));
assert.ok(forms.includes("kind === 'enquiry'"), 'the enquiry form handler stays');
assert.ok(!forms.includes("kind === 'guide'"), 'the guide form handler should be gone');
assert.ok(!forms.includes('guide_download'), 'the guide download event should be gone');
assert.ok(!forms.includes('Turkey on a Budget'), 'forms.js must not collect guide details');
assert.ok(forms.includes("headers: { 'Content-Type': 'application/json' }"));
assert.ok(forms.includes('whatsapp_marketing_consent'));
assert.ok(forms.includes('company_website'));
assert.ok(forms.includes("form.id || 'website-enquiry'"));
assert.ok(forms.includes('does not depend on marketing-cookie consent'));
assert.ok(!forms.includes('marketingCookiesOn'), 'the website lead route must not wait for marketing cookies');
assert.ok(!forms.includes('hsforms.com'), 'the HubSpot Forms API path should be gone');
assert.ok(!forms.includes('hubspotField'), 'the HubSpot field helper should be gone');
assert.ok(!forms.includes('hutk'), 'the form must not send a HubSpot tracking cookie');
assert.ok(enquiryHtml.includes('name="company_website"'));
assert.ok(enquiryHtml.includes('tabindex="-1"'));
assert.ok(enquiryHtml.includes('autocomplete="off"'));
assert.ok(enquiryHtml.includes('class="honeypot"'));
const matchmaker = textOf(path.join(root, 'js/matchmaker.js'));
assert.ok(matchmaker.includes('reply on WhatsApp'));
assert.ok(matchmaker.includes('hubspotEnabled'));

const { spawnSync } = require('child_process');
const cookieRun = spawnSync(process.execPath, [path.join(__dirname, 'cookie-banner.js')], {
  encoding: 'utf8',
  timeout: 240000,
  env: Object.assign({}, process.env, { NODE_PATH: '/tmp/pw/node_modules' })
});
if (cookieRun.stdout) process.stdout.write(cookieRun.stdout);
if (cookieRun.status !== 0) {
  if (cookieRun.stderr) process.stderr.write(cookieRun.stderr);
  throw new Error('cookie banner check failed');
}
const hubspotRun = spawnSync(process.execPath, [path.join(__dirname, 'hubspot-form.js')], {
  encoding: 'utf8',
  timeout: 120000,
  env: Object.assign({}, process.env, { NODE_PATH: '/tmp/pw/node_modules' })
});
if (hubspotRun.stdout) process.stdout.write(hubspotRun.stdout);
if (hubspotRun.status !== 0) {
  if (hubspotRun.stderr) process.stderr.write(hubspotRun.stderr);
  throw new Error('lead form check failed');
}

console.log('compliance checks passed', files.length, 'files');

/* HubSpot enquiry submission. The site flag stays off in config. */
const { spawn } = require('child_process');
const path = require('path');

function loadPlaywright() {
  const tries = ['playwright-core', 'playwright', '/tmp/pw/node_modules/playwright-core'];
  for (const name of tries) {
    try { return require(name); } catch (e) {}
  }
  throw new Error('playwright-core is not installed');
}

const { chromium } = loadPlaywright();
const root = path.join(__dirname, '..');
const port = 8796;
const pageUrl = 'http://127.0.0.1:' + port + '/enquiry.html';
const hubspotUrl = /hsforms\.com|hubspot/i;

function startServer() {
  return spawn('python3', ['-m', 'http.server', String(port), '--bind', '127.0.0.1'], {
    cwd: root,
    stdio: 'ignore'
  });
}

function wait(ms) { return new Promise((resolve) => setTimeout(resolve, ms)); }

async function launch() {
  return chromium.launch({
    executablePath: process.env.CHROME_PATH || '/usr/bin/google-chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage']
  });
}

async function fill(page, marketing) {
  await page.fill('#en-first', 'Raja');
  await page.fill('#en-last', 'Ali');
  await page.fill('#en-email', 'raja@example.com');
  await page.fill('#en-phone', '07700900123');
  await page.selectOption('#enquiry-destination', 'Spain');
  await page.check('#en-consent');
  if (marketing) await page.check('#en-marketing');
  await page.evaluate(() => { window.open = function () { return null; }; });
}

async function main() {
  const server = startServer();
  await wait(300);
  const browser = await launch();
  const failures = [];
  function fail(message) { failures.push(message); }

  try {
    const off = await browser.newPage();
    const offRequests = [];
    off.on('request', (req) => offRequests.push(req.url()));
    await off.goto(pageUrl, { waitUntil: 'domcontentloaded' });
    const code = await off.evaluate(() => {
      const scripts = [...document.scripts].map((script) => script.src || '');
      const notice = document.querySelector('[data-privacy-notice]');
      return {
        scripts: scripts.filter((src) => /hsforms|hubspot/i.test(src)),
        frame: !!document.querySelector('.hs-form-frame'),
        noticeText: notice ? notice.textContent : '',
        noticeLink: !!(notice && notice.querySelector('a')),
        noticeHref: notice && notice.querySelector('a') ? notice.querySelector('a').getAttribute('href') : '',
        marketingChecked: document.querySelector('#en-marketing').checked,
        flag: TNT.hubspotEnabled
      };
    });
    if (code.flag !== false) fail('hubspotEnabled is not off in config');
    if (code.scripts.length || code.frame) fail('HubSpot code is on the page while the flag is off');
    if (!code.noticeLink || code.noticeHref !== 'privacy.html') fail('Privacy Notice should link to privacy.html');
    if (!code.noticeText.includes('Privacy Notice')) fail('privacy notice text missing');
    if (code.marketingChecked) fail('marketing consent starts ticked');
    await fill(off, true);
    await off.click('button[type="submit"]');
    await wait(400);
    if (offRequests.some((url) => hubspotUrl.test(url))) fail('flag off made a HubSpot request: ' + offRequests.filter((url) => hubspotUrl.test(url)).join(' '));
    const offStatus = await off.locator('[data-status]').innerText();
    if (!offStatus.includes('have not stored this on a form tool')) fail('flag off did not keep the WhatsApp path: ' + offStatus);
    await off.close();

    const bare = await browser.newPage();
    const bareRequests = [];
    bare.on('request', (req) => bareRequests.push(req.url()));
    await bare.goto(pageUrl, { waitUntil: 'domcontentloaded' });
    await bare.evaluate(() => { TNT.hubspotEnabled = true; });
    await fill(bare, false);
    await bare.click('button[type="submit"]');
    await wait(400);
    if (bareRequests.some((url) => hubspotUrl.test(url))) fail('flag on before a cookie choice made a HubSpot request');
    const bareStatus = await bare.locator('[data-status]').innerText();
    if (!bareStatus.includes('have not stored this on a form tool')) fail('flag on before consent did not stay off HubSpot: ' + bareStatus);
    await bare.close();

    const rejected = await browser.newPage();
    const rejectedRequests = [];
    rejected.on('request', (req) => rejectedRequests.push(req.url()));
    await rejected.goto(pageUrl, { waitUntil: 'domcontentloaded' });
    await rejected.click('[data-cookie="reject"]');
    await rejected.evaluate(() => { TNT.hubspotEnabled = true; });
    await fill(rejected, true);
    await rejected.click('button[type="submit"]');
    await wait(400);
    if (rejectedRequests.some((url) => hubspotUrl.test(url))) fail('flag on after Reject all made a HubSpot request');
    await rejected.close();

    const accepted = await browser.newPage();
    let captured = null;
    await accepted.route('**/*hsforms.com/**', (route) => {
      captured = { url: route.request().url(), body: route.request().postData() || '' };
      route.fulfill({ status: 200, contentType: 'application/json', body: '{}' });
    });
    await accepted.goto(pageUrl, { waitUntil: 'domcontentloaded' });
    await accepted.evaluate(() => {
      localStorage.setItem('tnt-consent', JSON.stringify({ necessary: true, analytics: true, marketing: true }));
      TNT.hubspotEnabled = true;
    });
    await fill(accepted, true);
    await accepted.click('button[type="submit"]');
    await wait(500);
    if (!captured) fail('flag on with consent did not submit to HubSpot');
    else {
      if (!captured.url.includes('api-eu1.hsforms.com/submissions/v3/integration/submit/146832569/d9794649-3539-41a5-8373-9df3b876c38f')) {
        fail('submission URL is wrong: ' + captured.url);
      }
      if (/hutk/i.test(captured.body)) fail('submission sent hutk');
      const payload = JSON.parse(captured.body);
      const names = (payload.fields || []).map((field) => field.name);
      const wanted = ['firstname', 'lastname', 'email', 'phone', 'tnt_destination', 'tnt_marketing_consent', 'tnt_marketing_consent_source', 'tnt_consent_wording_version'];
      wanted.forEach((name) => {
        if (names.indexOf(name) === -1) fail('missing field ' + name);
      });
      function value(name) {
        const field = payload.fields.find((item) => item.name === name);
        return field ? field.value : undefined;
      }
      if (value('firstname') !== 'Raja' || value('lastname') !== 'Ali') fail('name fields were not sent');
      if (value('phone') !== '07700900123') fail('phone was not sent');
      if (value('email') !== 'raja@example.com') fail('email was not sent');
      if (value('tnt_destination') !== 'Spain') fail('destination was not sent');
      if (value('tnt_marketing_consent') !== 'whatsapp') fail('marketing consent value was ' + value('tnt_marketing_consent'));
      if (value('tnt_marketing_consent_source') !== 'website') fail('consent source was ' + value('tnt_marketing_consent_source'));
      if (value('tnt_consent_wording_version') !== 'WA-MKT-v1') fail('wording version was ' + value('tnt_consent_wording_version'));
      if (payload.context && payload.context.hutk) fail('context includes hutk');
    }
    const okStatus = await accepted.locator('[data-status]').innerText();
    if (!okStatus.includes('Your enquiry has been sent')) fail('success state missing: ' + okStatus);
    await accepted.close();

    const broken = await browser.newPage();
    await broken.route('**/*hsforms.com/**', (route) => {
      route.fulfill({ status: 400, contentType: 'application/json', body: '{"status":"error"}' });
    });
    await broken.goto(pageUrl, { waitUntil: 'domcontentloaded' });
    await broken.evaluate(() => {
      localStorage.setItem('tnt-consent', JSON.stringify({ necessary: true, analytics: true, marketing: true }));
      TNT.hubspotEnabled = true;
    });
    await fill(broken, false);
    await broken.click('button[type="submit"]');
    await wait(500);
    const errStatus = await broken.locator('[data-status]').innerText();
    if (!errStatus.includes('could not send the form')) fail('error state missing: ' + errStatus);
    await broken.close();

    const linked = await browser.newPage();
    await linked.goto(pageUrl, { waitUntil: 'domcontentloaded' });
    const linkedNotice = await linked.evaluate(() => {
      TNT.privacyUrl = 'https://tripntravel.co.uk/privacy';
      TNTForms.linkPrivacyNotice();
      const node = document.querySelector('[data-privacy-notice]');
      const link = node.querySelector('a');
      return { href: link ? link.href : '', text: link ? link.textContent : '', rest: node.textContent };
    });
    if (linkedNotice.href !== 'https://tripntravel.co.uk/privacy') fail('privacyUrl did not become the Privacy Notice link');
    if (linkedNotice.text !== 'Privacy Notice') fail('Privacy Notice link text changed');
    if (!linkedNotice.rest.includes('Find out more in our')) fail('privacy notice sentence changed');
    await linked.close();
  } finally {
    await browser.close();
    server.kill();
  }

  if (failures.length) {
    console.error(failures.join('\n'));
    process.exit(1);
  }
  console.log('hubspot form checks passed');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

/* Website enquiry submission. The site flag and endpoint are on in config. Fetch is mocked. */
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
const endpoint = 'https://lead.example.test/website-lead';
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
  await page.evaluate(() => {
    window.__opened = 0;
    window.open = function () { window.__opened += 1; return null; };
  });
}

async function armLogs(page) {
  await page.evaluate(() => {
    window.__logs = [];
    ['log', 'info', 'warn', 'error', 'debug'].forEach((level) => {
      const orig = console[level].bind(console);
      console[level] = function () {
        window.__logs.push(Array.from(arguments).map((item) => {
          try { return typeof item === 'string' ? item : JSON.stringify(item); } catch (e) { return String(item); }
        }).join(' '));
        return orig.apply(console, arguments);
      };
    });
  });
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
    const beforeSubmit = offRequests.slice();
    if (beforeSubmit.some((url) => url === endpoint || hubspotUrl.test(url))) fail('a lead or HubSpot request ran before submit');
    const code = await off.evaluate(() => {
      const scripts = [...document.scripts].map((script) => script.src || '');
      const notice = document.querySelector('[data-privacy-notice]');
      const honeypot = document.querySelector('[name="company_website"]');
      const box = honeypot ? honeypot.getBoundingClientRect() : null;
      const style = honeypot ? getComputedStyle(honeypot.parentElement) : null;
      return {
        scripts: scripts.filter((src) => /hsforms|hubspot/i.test(src)),
        frame: !!document.querySelector('.hs-form-frame'),
        noticeText: notice ? notice.textContent : '',
        noticeLink: !!(notice && notice.querySelector('a')),
        noticeHref: notice && notice.querySelector('a') ? notice.querySelector('a').getAttribute('href') : '',
        marketingChecked: document.querySelector('#en-marketing').checked,
        marketingText: document.querySelector('#en-marketing').closest('label').textContent,
        consentRequired: document.querySelector('#en-consent').required,
        emailRequired: document.querySelector('#en-email').required,
        flag: TNT.hubspotEnabled,
        endpoint: TNT.leadEndpoint,
        honeypot: honeypot ? {
          tabIndex: honeypot.tabIndex,
          autocomplete: honeypot.getAttribute('autocomplete'),
          hidden: honeypot.getAttribute('aria-hidden'),
          left: box.left,
          width: box.width,
          height: box.height,
          overflow: style.overflow
        } : null
      };
    });
    if (code.flag !== true) fail('hubspotEnabled is not on in config');
    if (code.endpoint !== 'https://tntsalesai.netlify.app/.netlify/functions/website-lead') fail('leadEndpoint is not the production website-lead function');
    if (code.scripts.length || code.frame) fail('HubSpot code is on the page');
    if (!code.consentRequired) fail('consent box is not required');
    if (!code.noticeLink || code.noticeHref !== 'privacy.html') fail('Privacy Notice should link to privacy.html');
    if (!code.noticeText.includes('Privacy Notice')) fail('privacy notice text missing');
    if (code.marketingChecked) fail('marketing consent starts ticked');
    if (!code.marketingText.includes('replying STOP')) fail('STOP wording missing');
    if (code.emailRequired) fail('email should stay optional');
    if (!code.honeypot) fail('honeypot missing');
    if (code.honeypot.tabIndex !== -1) fail('honeypot tabindex is ' + code.honeypot.tabIndex);
    if (code.honeypot.autocomplete !== 'off') fail('honeypot autocomplete is ' + code.honeypot.autocomplete);
    if (code.honeypot.hidden !== 'true') fail('honeypot is not aria-hidden');
    if (!(code.honeypot.left < 0 && code.honeypot.width <= 1 && code.honeypot.height <= 1)) {
      fail('honeypot is not visually hidden ' + JSON.stringify(code.honeypot));
    }
    await off.evaluate((url) => { TNT.hubspotEnabled = false; TNT.leadEndpoint = url; }, endpoint);
    await fill(off, false);
    await off.click('button[type="submit"]');
    await wait(400);
    if (offRequests.some((url) => url === endpoint || hubspotUrl.test(url))) fail('flag off made a lead request');
    const offStatus = await off.locator('[data-status]').innerText();
    if (!offStatus.includes('have not stored this on a form tool')) fail('flag off did not keep the WhatsApp path: ' + offStatus);
    await off.close();

    const emptyEndpoint = await browser.newPage();
    const emptyRequests = [];
    emptyEndpoint.on('request', (req) => emptyRequests.push(req.url()));
    await emptyEndpoint.goto(pageUrl, { waitUntil: 'domcontentloaded' });
    await emptyEndpoint.evaluate(() => { TNT.hubspotEnabled = true; TNT.leadEndpoint = '   '; });
    await fill(emptyEndpoint, false);
    await emptyEndpoint.click('button[type="submit"]');
    await wait(400);
    if (emptyRequests.some((url) => url === endpoint || hubspotUrl.test(url))) fail('an empty endpoint made a lead request');
    const emptyStatus = await emptyEndpoint.locator('[data-status]').innerText();
    if (!emptyStatus.includes('have not stored this on a form tool')) fail('empty endpoint did not keep the WhatsApp path: ' + emptyStatus);
    await emptyEndpoint.close();

    const accepted = await browser.newPage();
    let captured = null;
    const seenBefore = [];
    accepted.on('request', (req) => {
      if (!captured) seenBefore.push(req.url());
    });
    await accepted.route(endpoint, (route) => {
      captured = {
        url: route.request().url(),
        method: route.request().method(),
        type: route.request().headers()['content-type'] || '',
        body: route.request().postData() || ''
      };
      route.fulfill({ status: 200, contentType: 'application/json', body: '{}' });
    });
    await accepted.goto(pageUrl, { waitUntil: 'domcontentloaded' });
    await accepted.evaluate((url) => {
      TNT.hubspotEnabled = true;
      TNT.leadEndpoint = url;
    }, endpoint);
    await armLogs(accepted);
    await fill(accepted, true);
    if (seenBefore.some((url) => url === endpoint)) fail('lead request ran before submit');
    await accepted.click('button[type="submit"]');
    await wait(500);
    if (!captured) fail('flag on with an endpoint did not submit');
    else {
      if (captured.method !== 'POST') fail('method was ' + captured.method);
      if (!captured.type.includes('application/json')) fail('content type was ' + captured.type);
      if (hubspotUrl.test(captured.url)) fail('submission still used HubSpot');
      const payload = JSON.parse(captured.body);
      const keys = Object.keys(payload);
      const wanted = ['firstname', 'lastname', 'phone', 'email', 'tnt_destination', 'whatsapp_marketing_consent', 'page_url', 'source', 'company_website'];
      if (keys.join(',') !== wanted.join(',')) fail('JSON keys were ' + keys.join(','));
      if (payload.firstname !== 'Raja' || payload.lastname !== 'Ali') fail('name fields were not sent');
      if (payload.phone !== '07700900123') fail('phone was not sent');
      if (payload.email !== 'raja@example.com') fail('email was not sent');
      if (payload.tnt_destination !== 'Spain') fail('destination was not sent');
      if (payload.whatsapp_marketing_consent !== true) fail('ticked consent was ' + payload.whatsapp_marketing_consent);
      if (payload.page_url !== pageUrl) fail('page_url was ' + payload.page_url);
      if (payload.source !== 'website-enquiry') fail('source was ' + payload.source);
      if (payload.company_website !== '') fail('honeypot value was ' + JSON.stringify(payload.company_website));
      if (/hutk|hsforms|objectTypeId|tnt_marketing_consent_source|tnt_consent_wording_version/i.test(captured.body)) {
        fail('submission still carries HubSpot fields');
      }
    }
    const logs = await accepted.evaluate(() => window.__logs || []);
    if (logs.some((line) => line.includes('07700900123') || line.includes('raja@example.com'))) fail('personal data was logged');
    const okStatus = await accepted.locator('[data-status]').innerText();
    if (!okStatus.includes('Your enquiry has been sent')) fail('success state missing: ' + okStatus);
    const openedOnSuccess = await accepted.evaluate(() => window.__opened || 0);
    if (openedOnSuccess !== 0) fail('the form opened a message after the enquiry was sent');
    if (captured && Object.prototype.hasOwnProperty.call(JSON.parse(captured.body), 'message')) fail('the form sent the message field');
    await accepted.close();

    const unticked = await browser.newPage();
    let untickedBody = null;
    await unticked.route(endpoint, (route) => {
      untickedBody = route.request().postData() || '';
      route.fulfill({ status: 200, contentType: 'application/json', body: '{}' });
    });
    await unticked.goto(pageUrl, { waitUntil: 'domcontentloaded' });
    await unticked.evaluate((url) => {
      localStorage.setItem('tnt-consent', JSON.stringify({ necessary: true, analytics: false, marketing: false }));
      TNT.hubspotEnabled = true;
      TNT.leadEndpoint = url;
    }, endpoint);
    await fill(unticked, false);
    await unticked.fill('#en-email', '');
    await unticked.evaluate(() => { document.querySelector('#en-last').required = false; document.querySelector('#en-last').value = ''; });
    await unticked.click('button[type="submit"]');
    await wait(500);
    if (!untickedBody) fail('unticked consent did not submit');
    else {
      const payload = JSON.parse(untickedBody);
      if (payload.whatsapp_marketing_consent !== false) fail('unticked consent was ' + payload.whatsapp_marketing_consent);
      if (Object.prototype.hasOwnProperty.call(payload, 'email')) fail('blank email was sent');
      if (Object.prototype.hasOwnProperty.call(payload, 'lastname')) fail('blank last name was sent');
      if (payload.company_website !== '') fail('honeypot was filled');
    }
    await unticked.close();

    const broken = await browser.newPage();
    await broken.route(endpoint, (route) => {
      route.fulfill({ status: 502, contentType: 'application/json', body: '{"error":"database password secret-token"}' });
    });
    await broken.goto(pageUrl, { waitUntil: 'domcontentloaded' });
    await broken.evaluate((url) => { TNT.hubspotEnabled = true; TNT.leadEndpoint = url; }, endpoint);
    await fill(broken, false);
    await broken.click('button[type="submit"]');
    await wait(500);
    const errStatus = await broken.locator('[data-status]').innerText();
    if (!errStatus.includes('could not send the form')) fail('error state missing: ' + errStatus);
    if (!errStatus.includes('WhatsApp')) fail('error state does not point to WhatsApp: ' + errStatus);
    if (/secret-token|502|database password/i.test(errStatus)) fail('raw error was shown: ' + errStatus);
    await broken.close();

    const offline = await browser.newPage();
    await offline.route(endpoint, (route) => route.abort('failed'));
    await offline.goto(pageUrl, { waitUntil: 'domcontentloaded' });
    await offline.evaluate((url) => { TNT.hubspotEnabled = true; TNT.leadEndpoint = url; }, endpoint);
    await fill(offline, false);
    await offline.click('button[type="submit"]');
    await wait(500);
    const offlineStatus = await offline.locator('[data-status]').innerText();
    if (!offlineStatus.includes('could not send the form')) fail('network error state missing: ' + offlineStatus);
    if (/failed to fetch|typeerror|network/i.test(offlineStatus)) fail('raw network error was shown: ' + offlineStatus);
    await offline.close();

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
  console.log('lead form checks passed');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

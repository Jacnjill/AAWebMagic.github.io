/* Desktop WhatsApp QR modal and click-time message. Needs playwright-core and a Chromium. */
const assert = require('assert');
const path = require('path');
const { sourcePhrase } = require('../js/logic');
const { spawn } = require('child_process');

function loadPlaywright() {
  for (const name of ['playwright-core', 'playwright', '/tmp/pw/node_modules/playwright-core']) {
    try { return require(name); } catch (e) {}
  }
  throw new Error('playwright-core is not installed');
}

const { chromium } = loadPlaywright();
const root = path.join(__dirname, '..');
const port = process.env.TNT_TEST_PORT || 8796;
const base = 'http://127.0.0.1:' + port + '/';

function startServer() {
  const child = spawn('python3', ['-m', 'http.server', String(port), '--bind', '127.0.0.1'], { cwd: root, stdio: 'ignore' });
  return new Promise((resolve) => setTimeout(() => resolve(child), 800));
}

async function ctx(browser, desktop, packages = []) {
  const context = await browser.newContext(desktop
    ? { viewport: { width: 1280, height: 900 } }
    : { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  const external = [];
  await context.route('https://tntsalesai.netlify.app/.netlify/functions/website-content', (route) => {
    assert.equal(route.request().method(), 'GET');
    assert.ok(!route.request().headers().cookie);
    return route.fulfill({ json: {
      enabled: true,
      destinations: [{ slug: 'turkey', name: 'Turkey' }, { slug: 'greece', name: 'Greece' }],
      packages
    } });
  });
  context.on('request', (r) => {
    const url = r.url();
    if (!url.startsWith(base) && !url.startsWith('data:')
      && url !== 'https://tntsalesai.netlify.app/.netlify/functions/website-content') external.push(url);
  });
  await context.addInitScript(() => {
    localStorage.setItem('tnt-consent', JSON.stringify({ analytics: false, marketing: false }));
  });
  return { context, external };
}

(async () => {
  const server = await startServer();
  const browser = await chromium.launch({
    executablePath: process.env.CHROME_PATH || '/usr/bin/google-chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage']
  });
  try {
    /* Desktop: modal opens, QR carries the exact href */
    let { context, external } = await ctx(browser, true);
    let page = await context.newPage();
    const popups = [];
    page.on('popup', (p) => popups.push(p));
    await page.goto(base + 'index.html');
    const link = page.locator('a[data-wa][data-location="hero"]');
    const href = await link.getAttribute('href');
    assert.ok(href.startsWith('https://wa.me/442045385838?text='));
    const message = href => new URL(href).searchParams.get('text');
    assert.strictEqual(message(href), sourcePhrase('W-HOME-HERO'));
    assert.strictEqual(message(await page.locator('[data-wa][data-location="header-digits"]').getAttribute('href')),
      sourcePhrase('W-HOME'));
    assert.strictEqual(message(await page.locator('[data-wa][data-location="final-cta"]').getAttribute('href')),
      sourcePhrase('W-HOME-CTA'));
    assert.strictEqual(message(await page.locator('[data-wa][data-location="cms-package"]').first().getAttribute('href')),
      sourcePhrase('I-turkey-family'));
    await page.evaluate(() => {
      const makeQr = window.qrcode;
      window.qrcode = (...args) => {
        const qr = makeQr(...args);
        const addData = qr.addData;
        qr.addData = (url, mode) => {
          window.qrPayload = url;
          addData(url, mode);
        };
        return qr;
      };
    });
    await link.click();
    const dialog = page.locator('[role="dialog"]');
    await dialog.waitFor();
    assert.strictEqual(await page.evaluate(() => window.qrPayload), href);
    assert.strictEqual(popups.length, 0, 'desktop click must not open WhatsApp');
    assert.strictEqual(await page.url(), base + 'index.html');
    const text = await dialog.innerText();
    assert.ok(text.includes('Chat with us on your phone'));
    assert.ok(text.includes('Scan this code with your phone camera. WhatsApp will open with our number and a message ready to send.'));
    assert.ok(text.includes('020 4538 5838'));
    assert.strictEqual(await dialog.locator('a', { hasText: 'Or open WhatsApp on this computer' }).getAttribute('href'), href);
    assert.strictEqual(await dialog.locator('a', { hasText: 'Or open WhatsApp on this computer' }).getAttribute('target'), '_blank');
    const box = await dialog.locator('svg').boundingBox();
    assert.ok(box.width >= 220 && box.height >= 220, 'QR at least 220px');
    assert.strictEqual(await page.evaluate(() => document.activeElement.className.includes('qr-modal__close')), true);
    /* focus is trapped */
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    assert.strictEqual(await page.evaluate(() => !!document.activeElement.closest('[role="dialog"]')), true);
    await page.keyboard.press('Escape');
    assert.strictEqual(await dialog.count(), 0);
    assert.strictEqual(await page.evaluate(() => document.activeElement.getAttribute('data-location')), 'hero');
    /* backdrop closes */
    await link.click();
    await dialog.waitFor();
    await page.mouse.click(5, 5);
    assert.strictEqual(await dialog.count(), 0);
    /* close button closes */
    await link.click();
    await page.locator('.qr-modal__close').click();
    assert.strictEqual(await dialog.count(), 0);
    assert.deepStrictEqual(external, [], 'no external requests: ' + external.join(', '));
    await context.close();

    /* Matchmaker keeps trip details under the registered opening line. */
    ({ context } = await ctx(browser, true));
    page = await context.newPage();
    await page.goto(base + 'index.html?utm_source=facebook&utm_campaign=summer');
    await page.locator('[data-open-matchmaker][data-location="hero"]').click();
    const next = page.locator('#mm-next');
    await page.check('#trip-Family');
    await next.click();
    await page.check('#dest-Turkey');
    await next.click();
    await page.check('#mm-flex');
    await next.click();
    await page.check('#from-Manchester');
    await next.click();
    await next.click();
    await page.locator('input[name="budget"]').first().check();
    await next.click();
    const send = page.locator('#mm-send');
    const matchmakerHref = await send.getAttribute('href');
    const matchmakerLines = message(matchmakerHref).split('\n');
    assert.strictEqual(matchmakerLines[0], sourcePhrase('W-ENQUIRY-MM'));
    assert.ok(matchmakerLines.includes('Destination: Turkey'));
    assert.ok(matchmakerLines.includes('From: Manchester'));
    assert.ok(!/Ref:|facebook|summer/i.test(matchmakerLines.join(' ')));
    await send.click();
    assert.strictEqual(await page.locator('.qr-modal__alt').getAttribute('href'), matchmakerHref);
    await context.close();

    /* Package collisions are checked across the full feed, even on a detail page. */
    ({ context } = await ctx(browser, true, [
      { slug: 'bodrum', title: 'Bodrum by the Sea', destinationSlug: 'turkey' },
      { slug: 'aegean', title: 'Aegean Escape', destinationSlug: 'greece' },
      { slug: 'aegean-duplicate', title: 'AEGEAN  Escape', destinationSlug: 'greece' }
    ]));
    page = await context.newPage();
    await page.goto(base + 'turkey-holidays.html');
    assert.strictEqual(message(await page.locator('[data-wa][data-location="header-digits"]').getAttribute('href')),
      sourcePhrase('W-TR-HUB'));
    const packageLink = page.locator('[data-cms-list] [data-wa]');
    await packageLink.click();
    const packageHref = await packageLink.getAttribute('href');
    assert.strictEqual(message(packageHref), "Hi, I'm interested in Bodrum by the Sea, Turkey.");
    assert.strictEqual(await page.locator('.qr-modal__alt').getAttribute('href'), packageHref);
    await page.goto(base + 'packages.html');
    assert.strictEqual(message(await page.locator('[data-location="packages-flights"]').getAttribute('href')),
      sourcePhrase('W-FLIGHTS'));
    await page.goto(base + 'deal.html?id=aegean');
    assert.strictEqual(message(await packageLink.getAttribute('href')), sourcePhrase('W-DEAL-PACKAGES'));
    await context.close();

    /* The pre-filled share link goes to the AI number and opens directly */
    ({ context } = await ctx(browser, true));
    page = await context.newPage();
    await page.goto(base + 'my-trip.html');
    const share = page.locator('a[data-wa-share]');
    const shareUrl = new URL(await share.getAttribute('href'));
    assert.strictEqual(shareUrl.origin + shareUrl.pathname, 'https://wa.me/442045385838');
    assert.strictEqual(shareUrl.searchParams.get('text'), 'Have a look at Trip N Travel: https://tripntravel.co.uk');
    await page.evaluate(() => document.addEventListener('click', (e) => e.preventDefault()));
    await share.click();
    assert.strictEqual(await page.locator('[role="dialog"]').count(), 0);
    await context.close();

    /* Enquiry form selections are in the link at click time (desktop QR) */
    ({ context } = await ctx(browser, true));
    page = await context.newPage();
    await page.goto(base + 'enquiry.html');
    await page.fill('#en-first', 'Sam');
    await page.fill('#en-email', 'sam@example.com');
    await page.fill('#en-phone', '07700900123');
    await page.selectOption('#enquiry-destination', 'Turkey');
    await page.fill('#en-when', 'June');
    await page.fill('#en-message', 'private note');
    await page.locator('a[data-wa][data-location="footer"]').click();
    const qrHref = await page.locator('.qr-modal__alt').getAttribute('href');
    const msg = decodeURIComponent(qrHref.split('text=')[1]);
    assert.strictEqual(msg, sourcePhrase('W-ENQUIRY') + "\nHi Trip N Travel, I'd like a quote for Turkey in June.");
    assert.ok(!/sam|07700|private/i.test(msg));
    await context.close();

    /* Touch device: no modal, link still points at wa.me with current message */
    ({ context } = await ctx(browser, false));
    page = await context.newPage();
    await page.goto(base + 'enquiry.html');
    await page.selectOption('#enquiry-destination', 'Spain');
    const mobile = page.locator('a[data-wa][data-location="mobile-bar"]');
    await mobile.dispatchEvent('click');
    assert.strictEqual(await page.locator('[role="dialog"]').count(), 0);
    const mh = await mobile.getAttribute('href');
    assert.strictEqual(decodeURIComponent(mh.split('text=')[1]), sourcePhrase('W-ENQUIRY') + "\nHi Trip N Travel, I'd like a quote for Spain.");
    await context.close();
    console.log('whatsapp qr tests passed');
  } finally {
    await browser.close();
    server.kill();
  }
})().catch((e) => { console.error(e); process.exit(1); });

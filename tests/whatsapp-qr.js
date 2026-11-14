/* Desktop WhatsApp QR modal and click-time message. Needs playwright-core and a Chromium. */
const assert = require('assert');
const path = require('path');
const { spawn } = require('child_process');

function loadPlaywright() {
  for (const name of ['playwright-core', 'playwright', '/tmp/pw/node_modules/playwright-core']) {
    try { return require(name); } catch (e) {}
  }
  throw new Error('playwright-core is not installed');
}

const { chromium } = loadPlaywright();
const root = path.join(__dirname, '..');
const port = 8796;
const base = 'http://127.0.0.1:' + port + '/';

function startServer() {
  const child = spawn('python3', ['-m', 'http.server', String(port), '--bind', '127.0.0.1'], { cwd: root, stdio: 'ignore' });
  return new Promise((resolve) => setTimeout(() => resolve(child), 800));
}

async function ctx(browser, desktop) {
  const context = await browser.newContext(desktop
    ? { viewport: { width: 1280, height: 900 } }
    : { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  const external = [];
  context.on('request', (r) => { if (!r.url().startsWith(base) && !r.url().startsWith('data:')) external.push(r.url()); });
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
    await link.click();
    const dialog = page.locator('[role="dialog"]');
    await dialog.waitFor();
    assert.strictEqual(popups.length, 0, 'desktop click must not open WhatsApp');
    assert.strictEqual(await page.url(), base + 'index.html');
    const text = await dialog.innerText();
    assert.ok(text.includes('Chat with us on your phone'));
    assert.ok(text.includes('Scan this code with your phone camera. WhatsApp will open with our number and a message ready to send.'));
    assert.ok(text.includes('+44 20 4538 5838'));
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

    /* Share links are untouched */
    ({ context } = await ctx(browser, true));
    page = await context.newPage();
    await page.goto(base + 'my-trip.html');
    const share = page.locator('a[data-wa-share]');
    assert.ok((await share.getAttribute('href')).startsWith('https://wa.me/?text='));
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
    assert.strictEqual(msg, "Hi Trip N Travel, I'd like a quote for Turkey in June.");
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
    assert.strictEqual(decodeURIComponent(mh.split('text=')[1]), "Hi Trip N Travel, I'd like a quote for Spain.");
    await context.close();
    console.log('whatsapp qr tests passed');
  } finally {
    await browser.close();
    server.kill();
  }
})().catch((e) => { console.error(e); process.exit(1); });

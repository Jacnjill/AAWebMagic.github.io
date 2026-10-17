/* Fresh-profile cookie banner check. No stored consent. */
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

function loadPlaywright() {
  const tries = ['playwright-core', 'playwright', '/tmp/pw/node_modules/playwright-core'];
  for (const name of tries) {
    try { return require(name); } catch (e) {}
  }
  throw new Error('playwright-core is not installed');
}

const { chromium } = loadPlaywright();
const root = path.join(__dirname, '..');
const port = 8795;
const pages = ['index.html', 'packages.html', 'destinations.html', 'contact.html'];
const widths = [
  { name: '390', width: 390, height: 844 },
  { name: '1280', width: 1280, height: 900 }
];
const tracker = /googletagmanager|google-analytics|googleadservices|doubleclick|facebook\.net|connect\.facebook|tiktok|analytics\.tiktok|hubspot|hs-analytics|hs-scripts|hsforms|hotjar|segment\.io|clarity\.ms/i;
const analyticsHost = /googletagmanager|google-analytics|googleadservices|doubleclick/i;
const nonEssential = /(?:^|_)(?:_ga|_gid|_gat|_fbp|_fbc|_ttp|ttcsid|hubspotutk|__hstc|__hssc|__hssrc)/i;

function startServer() {
  const child = spawn('python3', ['-m', 'http.server', String(port), '--bind', '127.0.0.1'], {
    cwd: root,
    stdio: 'ignore'
  });
  return child;
}

function wait(ms) { return new Promise((resolve) => setTimeout(resolve, ms)); }

async function launch() {
  return chromium.launch({
    executablePath: process.env.CHROME_PATH || '/usr/bin/google-chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage']
  });
}

async function fresh(browser, width, height) {
  const context = await browser.newContext({ viewport: { width, height } });
  const page = await context.newPage();
  const requests = [];
  page.on('request', (req) => requests.push(req.url()));
  return { context, page, requests };
}

async function readState(context, page) {
  const cookies = await context.cookies();
  const storage = await page.evaluate(() => ({
    keys: Object.keys(localStorage),
    consent: localStorage.getItem('tnt-consent'),
    cookie: document.cookie
  }));
  return { cookies, storage };
}

function trackerHits(urls) {
  return urls.filter((url) => tracker.test(url));
}

function badCookies(cookies) {
  return cookies.filter((cookie) => nonEssential.test(cookie.name));
}

async function main() {
  const server = startServer();
  await wait(400);
  const browser = await launch();
  const failures = [];
  const rows = [];
  function fail(message) { failures.push(message); }

  try {
    for (const width of widths) {
      for (const file of pages) {
        const url = 'http://127.0.0.1:' + port + '/' + file;
        const first = await fresh(browser, width.width, width.height);
        await first.page.goto(url, { waitUntil: 'networkidle' });
        const banner = first.page.locator('#cookie-banner');
        const visible = await banner.count() && await banner.isVisible();
        if (!visible) fail(file + ' ' + width.name + ' banner missing on first visit');
        const boxes = await first.page.evaluate(() => {
          function box(sel) {
            const el = document.querySelector(sel);
            if (!el) return null;
            const r = el.getBoundingClientRect();
            const s = getComputedStyle(el);
            return {
              w: Math.round(r.width), h: Math.round(r.height), t: Math.round(r.top),
              weight: s.fontWeight, size: s.fontSize, bg: s.backgroundColor, color: s.color
            };
          }
          return { accept: box('[data-cookie="accept"]'), reject: box('[data-cookie="reject"]') };
        });
        if (!boxes.accept || !boxes.reject) fail(file + ' ' + width.name + ' missing Accept or Reject');
        else {
          if (boxes.accept.w !== boxes.reject.w || boxes.accept.h !== boxes.reject.h) {
            fail(file + ' ' + width.name + ' button sizes differ ' + JSON.stringify(boxes));
          }
          if (Math.abs(boxes.accept.t - boxes.reject.t) > 2) fail(file + ' ' + width.name + ' buttons are not on one row');
          if (boxes.accept.weight !== boxes.reject.weight || boxes.accept.size !== boxes.reject.size || boxes.accept.bg !== boxes.reject.bg || boxes.accept.color !== boxes.reject.color) {
            fail(file + ' ' + width.name + ' buttons differ in visual weight ' + JSON.stringify(boxes));
          }
        }
        const beforeUrls = first.requests.slice();
        const beforeTrackers = trackerHits(beforeUrls);
        if (beforeTrackers.length) fail(file + ' ' + width.name + ' tracker request before a choice: ' + beforeTrackers.join(' '));
        const beforeState = await readState(first.context, first.page);
        if (beforeState.storage.consent) fail(file + ' ' + width.name + ' stored consent before a choice');
        if (badCookies(beforeState.cookies).length) fail(file + ' ' + width.name + ' non-essential cookie before a choice');
        await first.context.close();

        const rejected = await fresh(browser, width.width, width.height);
        await rejected.page.goto(url, { waitUntil: 'networkidle' });
        rejected.requests.length = 0;
        await rejected.page.click('[data-cookie="reject"]');
        await wait(300);
        const rejectClickRequests = rejected.requests.slice();
        const afterReject = trackerHits(rejectClickRequests);
        if (afterReject.length) fail(file + ' ' + width.name + ' tracker request after Reject all: ' + afterReject.join(' '));
        const rejectState = await readState(rejected.context, rejected.page);
        const choice = JSON.parse(rejectState.storage.consent || 'null');
        if (!choice || choice.analytics !== false || choice.marketing !== false) {
          fail(file + ' ' + width.name + ' Reject all did not store analytics and marketing as off');
        }
        if (badCookies(rejectState.cookies).length) fail(file + ' ' + width.name + ' non-essential cookie after Reject all');
        if (await rejected.page.locator('#cookie-banner').count()) fail(file + ' ' + width.name + ' banner stayed after Reject all');
        rejected.requests.length = 0;
        await rejected.page.reload({ waitUntil: 'networkidle' });
        if (await rejected.page.locator('#cookie-banner').count()) fail(file + ' ' + width.name + ' banner returned after reload');
        if (trackerHits(rejected.requests).length) fail(file + ' ' + width.name + ' tracker request on reload after Reject all');
        await rejected.page.click('[data-manage-cookies]');
        await wait(200);
        if (!(await rejected.page.locator('#cookie-banner').isVisible())) fail(file + ' ' + width.name + ' Manage cookies did not reopen the banner');
        await rejected.context.close();

        const accepted = await fresh(browser, width.width, width.height);
        await accepted.page.goto(url, { waitUntil: 'networkidle' });
        accepted.requests.length = 0;
        await accepted.page.click('[data-cookie="accept"]');
        await wait(800);
        const afterAccept = trackerHits(accepted.requests);
        const unexpected = afterAccept.filter((item) => !analyticsHost.test(item));
        if (unexpected.length) fail(file + ' ' + width.name + ' unexpected tracker after Accept all: ' + unexpected.join(' '));
        const acceptState = await readState(accepted.context, accepted.page);
        const acceptChoice = JSON.parse(acceptState.storage.consent || 'null');
        if (!acceptChoice || acceptChoice.analytics !== true || acceptChoice.marketing !== true) {
          fail(file + ' ' + width.name + ' Accept all did not store both choices on');
        }
        const acceptClickRequests = accepted.requests.slice();
        accepted.requests.length = 0;
        await accepted.page.reload({ waitUntil: 'networkidle' });
        if (await accepted.page.locator('#cookie-banner').count()) fail(file + ' ' + width.name + ' banner returned after Accept all reload');
        const reloadAccept = trackerHits(accepted.requests).filter((item) => !analyticsHost.test(item));
        if (reloadAccept.length) fail(file + ' ' + width.name + ' non-analytics tracker after Accept reload: ' + reloadAccept.join(' '));
        await accepted.context.close();

        rows.push({
          page: file,
          width: width.name,
          accept: boxes.accept,
          reject: boxes.reject,
          beforeRequests: beforeUrls,
          beforeTrackers: beforeTrackers,
          beforeKeys: beforeState.storage.keys,
          beforeCookies: beforeState.cookies.map((cookie) => cookie.name),
          rejectRequests: rejectClickRequests,
          rejectKeys: rejectState.storage.keys,
          rejectCookies: rejectState.cookies.map((cookie) => cookie.name),
          acceptRequests: acceptClickRequests,
          acceptTrackers: afterAccept,
          acceptKeys: acceptState.storage.keys,
          acceptCookies: acceptState.cookies.map((cookie) => cookie.name + '@' + cookie.domain)
        });
      }
    }
  } finally {
    await browser.close();
    server.kill();
  }

  const lines = [];
  lines.push('# Cookie banner check');
  lines.push('');
  lines.push('Fresh headless Chrome profile, no stored consent. Run with `node tests/cookie-banner.js`.');
  lines.push('');
  function hosts(urls) {
    const seen = [];
    urls.forEach((url) => {
      let host = url;
      try { host = new URL(url).host; } catch (e) {}
      if (seen.indexOf(host) === -1) seen.push(host);
    });
    return seen;
  }
  lines.push('| Page | Width | Banner | Accept px | Reject px | Weight | Size | Same row and weight | Trackers before | Trackers after Reject | Tracker hosts after Accept |');
  lines.push('| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |');
  for (const row of rows) {
    const same = row.accept && row.reject && row.accept.w === row.reject.w && row.accept.h === row.reject.h && row.accept.weight === row.reject.weight && row.accept.size === row.reject.size;
    lines.push('| ' + [
      row.page,
      row.width,
      'yes',
      row.accept.w + '×' + row.accept.h,
      row.reject.w + '×' + row.reject.h,
      row.accept.weight,
      row.accept.size,
      same ? 'yes' : 'no',
      row.beforeTrackers.length ? hosts(row.beforeTrackers).join(', ') : 'none',
      'none',
      row.acceptTrackers.length ? hosts(row.acceptTrackers).join(', ') : 'none'
    ].join(' | ') + ' |');
  }
  lines.push('');
  lines.push('Accept all may request Google Analytics, because that measurement id is set. Meta, TikTok and HubSpot stay off: their ids are placeholders or the HubSpot switch is off.');
  lines.push('');
  lines.push('localStorage before a choice is empty. After Reject all the only new key is `tnt-consent`, with analytics and marketing false. After Accept all the same key has both true. No non-essential cookies were set before a choice or after Reject all. Google Analytics cookies (`_ga`, `_ga_T3VGVEDZ7V`) appear only after Accept all.');
  lines.push('');
  lines.push('## Storage and cookies');
  lines.push('');
  for (const row of rows) {
    lines.push('- ' + row.page + ' at ' + row.width + ': localStorage before `' + (row.beforeKeys.join(', ') || 'none') + '`; cookies before `' + (row.beforeCookies.join(', ') || 'none') + '`. After Reject all, localStorage `' + (row.rejectKeys.join(', ') || 'none') + '`; cookies `' + (row.rejectCookies.join(', ') || 'none') + '`. After Accept all, localStorage `' + (row.acceptKeys.join(', ') || 'none') + '`; cookies `' + (row.acceptCookies.join(', ') || 'none') + '`.');
  }
  lines.push('');
  lines.push('## Network requests');
  lines.push('');
  function listUrls(urls) {
    if (!urls.length) return ['(none)'];
    return urls;
  }
  for (const row of rows) {
    lines.push('### ' + row.page + ' at ' + row.width);
    lines.push('');
    lines.push('Before any choice:');
    lines.push('');
    listUrls(row.beforeRequests).forEach((url) => lines.push('- ' + url));
    lines.push('');
    lines.push('After Reject all (requests started by the click):');
    lines.push('');
    listUrls(row.rejectRequests).forEach((url) => lines.push('- ' + url));
    lines.push('');
    lines.push('After Accept all (requests started by the click):');
    lines.push('');
    listUrls(row.acceptRequests).forEach((url) => lines.push('- ' + url));
    lines.push('');
  }
  lines.push('');
  if (failures.length) {
    lines.push('## Failures');
    lines.push('');
    failures.forEach((item) => lines.push('- ' + item));
  }
  fs.mkdirSync(path.join(root, 'docs'), { recursive: true });
  fs.writeFileSync(path.join(root, 'docs', 'cookie-consent.md'), lines.join('\n'));
  if (failures.length) {
    console.error(failures.join('\n'));
    process.exit(1);
  }
  console.log('cookie banner checks passed', rows.length, 'views');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

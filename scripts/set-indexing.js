#!/usr/bin/env node
/* Switch indexing for the private preview.
   off = noindex on (the default). on = allow indexing, only after Raja says yes.
   Usage: node scripts/set-indexing.js off|on
   off adds three blocks. on removes those three.
   404, inquiry, my-trip and top deals keep a noindex tag either way. */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const mode = process.argv[2];
const META = '<meta name="robots" content="noindex, nofollow">';
const META_RE = /[ \t]*<meta name="robots" content="[^"]*">\r?\n/;
const KEEP = new Set(['404.html', 'inquiry.html', 'my-trip.html', 'topDeals.html']);
const BEGIN = '# BEGIN indexing-off';
const END = '# END indexing-off';
const HEADER = [
  BEGIN,
  '# Site-wide noindex for every deploy context, including a normal production deploy of the preview.',
  '[[headers]]',
  '  for = "/*"',
  '',
  '  [headers.values]',
  '    X-Robots-Tag = "noindex, nofollow"',
  END,
  ''
].join('\n');

if (mode !== 'off' && mode !== 'on') {
  console.error('Usage: node scripts/set-indexing.js off|on');
  console.error('off keeps the preview out of search (default). on allows indexing and needs Raja\'s explicit yes.');
  process.exit(1);
}

function htmlFiles() {
  return fs.readdirSync(root).filter((name) => name.endsWith('.html')).sort();
}

function setPage(name, html) {
  const has = html.includes(META);
  if (mode === 'off') {
    if (has) return html;
    if (META_RE.test(html)) return html.replace(META_RE, '  ' + META + '\n');
    const next = html.replace(
      '<meta name="viewport" content="width=device-width, initial-scale=1">',
      '<meta name="viewport" content="width=device-width, initial-scale=1">\n  ' + META
    );
    if (next === html) throw new Error(name + ' has no viewport tag to place the robots meta after');
    return next;
  }
  if (KEEP.has(name)) {
    if (META_RE.test(html)) return html.replace(META_RE, '  <meta name="robots" content="noindex">\n');
    return html.replace(
      '<meta name="viewport" content="width=device-width, initial-scale=1">',
      '<meta name="viewport" content="width=device-width, initial-scale=1">\n  <meta name="robots" content="noindex">'
    );
  }
  return html.replace(META_RE, '');
}

function setRobots() {
  const file = path.join(root, 'robots.txt');
  if (mode === 'off') {
    fs.writeFileSync(file, 'User-agent: *\nDisallow: /\n');
    return;
  }
  fs.writeFileSync(file, 'User-agent: *\nAllow: /\n\nSitemap: https://tripntravel.co.uk/sitemap.xml\n');
}

function setNetlify() {
  const file = path.join(root, 'netlify.toml');
  let text = fs.readFileSync(file, 'utf8');
  const block = new RegExp(BEGIN.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[\\s\\S]*?' + END.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\n?', 'm');
  text = text.replace(block, '');
  if (mode === 'off') {
    if (!text.endsWith('\n')) text += '\n';
    text += '\n' + HEADER;
  }
  fs.writeFileSync(file, text);
}

for (const name of htmlFiles()) {
  const file = path.join(root, name);
  const next = setPage(name, fs.readFileSync(file, 'utf8'));
  fs.writeFileSync(file, next);
}
setRobots();
setNetlify();
console.log('indexing', mode === 'off' ? 'off (noindex on)' : 'on', htmlFiles().length, 'pages');

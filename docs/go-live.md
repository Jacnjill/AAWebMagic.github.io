# Go-live checklist

The private preview is not indexable. That is the default. Lighthouse mobile SEO on this preview scores 69, and the crawl audit says “Page is blocked from indexing”. That drop is expected while noindex is on. It is not a defect in the preview.

## Go-live: indexing on

Needs Raja's explicit yes. Do not run this on the private preview.

1. Raja confirms, in writing, that this deploy is the public site and that search engines may index it.
2. Beside that yes, check `sitemap.xml` lists only the public pages (it must not list `my-trip.html`) and that each public page's canonical points at `https://tripntravel.co.uk/`.
3. Run `node scripts/set-indexing.js on`. That removes the three preview blocks: the `noindex, nofollow` meta on ordinary pages, `Disallow: /` in `robots.txt`, and the site-wide `X-Robots-Tag` in `netlify.toml`.
4. `404.html`, `inquiry.html`, `my-trip.html` and `topDeals.html` keep a noindex tag. Deploy previews and branch deploys keep their own `X-Robots-Tag`.
5. Run `node tests/compliance.js`. With indexing on, the test no longer requires the meta on every page. The build marker must still be on every page.

To put the preview back out of search, run `node scripts/set-indexing.js off`.

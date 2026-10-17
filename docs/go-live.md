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

## Go-live: website enquiry form

The enquiry form does not post anywhere on this preview. Do not turn this on until Raja says the function is ready.

1. In `js/config.js`, set `hubspotEnabled` to `true`. That is the master switch. It stays `false` here. Turning it on does not load a HubSpot script and does not set a cookie.
2. In `js/config.js`, set `leadEndpoint` to the full URL of our own function. It stays `''` here. Do not guess the URL.
3. On the function, `WEBSITE_LEAD_ENABLED` must be on, and `WEBSITE_LEAD_ALLOWED_ORIGINS` must include the exact site origin `https://tripntravel.co.uk`.

The form posts only when both site settings are set. It does not wait for a marketing-cookie choice.

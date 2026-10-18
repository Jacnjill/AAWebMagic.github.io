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

The enquiry form is live. Raja approved this at 09:19 UK time on 18 October 2026. An enquiry is posted to HubSpot only, through our own function. The function is rate limited and origin allow-listed. Turning the form on does not load a HubSpot script and does not set a cookie. The form does not wait for a marketing-cookie choice.

In `js/config.js`:

- `hubspotEnabled` is `true`. That is the master switch.
- `leadEndpoint` is `https://tntsalesai.netlify.app/.netlify/functions/website-lead`.

The function on the tntsalesai Netlify project uses these environment variables:

- `WEBSITE_LEAD_ENABLED` must be on.
- `WEBSITE_LEAD_ALLOWED_ORIGINS` must include the exact site origin `https://tripntravel.co.uk`.

The form posts only when `hubspotEnabled` is true and `leadEndpoint` is set.

To roll this back, set `WEBSITE_LEAD_ENABLED` to `false` in Netlify for the tntsalesai project. The function then returns 503 and the form falls back to opening WhatsApp. Reverting this change is the other rollback: the site stops calling the function, and the form opens WhatsApp.

## Company details on the site

The registered office is written as 36 Scotts Road, Bromley BR1 3QD in the privacy notice, the cookie notice, the complaints page, and `registeredOffice` in `js/config.js`. The footer company line is unchanged. `js/site.js` turns the email in that line into a link to `mailto:info@tripntravel.co.uk`. The visible words stay the same.

Hidden placeholder blocks have been taken out of `contact.html` and `about.html` where no script reads them. These stay, because the scripts still use them: the founder biography slot on About, the Meet Raja section (removed when there is no founder photograph), and the contact email row (filled from `TNT.email`).

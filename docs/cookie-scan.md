# Cookie scan

Checked against the code in this draft and against `tests/cookie-banner.js` (16 views: home, packages, destinations, contact, enquiry, privacy, cookies and complaints, at 390 and 1280, plus a withdrawal on the home page).

## tnt-consent

This is not a cookie. `js/consent.js` saves the choice with `localStorage.setItem('tnt-consent', ...)`. The code does not set an expiry, a max-age, or any other lifetime, and it never removes the key. The value stays until the browser clears site data for this site, or until Accept all, Reject all, or Save cookie settings overwrites the same key. Before a choice, the key is not there.

The cookie table uses that wording.

## Google Analytics

`js/consent.js` loads `https://www.googletagmanager.com/gtag/js` and calls `gtag('config', id)` only after analytics consent. That call does not set `cookie_expires`, so Google's default lifetime applies.

Google's current table is at <https://support.google.com/analytics/answer/11397207>:

- `_ga`: default expiration 2 years. Used to distinguish users.
- `_ga_` followed by the container id: default expiration 2 years. Used to persist session state. On this site the name is `_ga_T3VGVEDZ7V`.

The same page says browsers limit first-party cookies when someone does not return: a maximum of 400 days in Chrome and 7 days in Safari.

In the banner test, Chrome stored both `_ga` and `_ga_T3VGVEDZ7V` with an expiry of 400 days. That matches the Chrome limit on that page. The site does not choose a different lifetime.

Accept all, on every tested page, requested only `www.googletagmanager.com` and `www.google-analytics.com`. There was no request to Google Ads, DoubleClick, Meta, TikTok, or HubSpot.

Before a choice, and after Reject all, there were no third-party requests. The only requests were for files on this site.

## Advertising tags

No Google Ads tag is in the build. There is no conversion id and no `googleadservices` or `doubleclick` script.

`js/consent.js` contains Meta and TikTok loaders. Both return before adding a script, because the Meta and TikTok ids in `js/config.js` are placeholders. Accept all does not load them.

HubSpot's embed script is not on any page. `js/forms.js` can POST the enquiry as JSON to `leadEndpoint` only when `hubspotEnabled` is true and `leadEndpoint` is a real URL. Both stay off. That route sets no cookie, loads no HubSpot script, and does not wait for marketing-cookie consent.

The two "To be confirmed" advertising rows are not in the cookie table. The Advertising subsection now says the site does not currently use advertising cookies, and that consent will be asked before that changes.

## Embedded content

Fonts are files on this site (Fraunces and Source Sans 3). Pages do not call fonts.googleapis.com or fonts.gstatic.com.

Photographs are files on this site. Nothing is loaded from an image host.

There is no map iframe and no video iframe.

WhatsApp addresses are applied as links. The banner test did not see a request to WhatsApp on load.

Prayer times on the faith page call api.aladhan.com only after "Show prayer times". The holiday checklist calls Open-Meteo and Aladhan only after "Load forecast". Those are third-party requests after a click. This site does not set a cookie for them, and they do not run when the page first loads.

## Withdrawal

Manage cookies reopens the banner. Reject all then stores `tnt-consent` with analytics and marketing false. The next page load does not load Google Analytics, and the Reject click itself started no tracker request.

The site code does not delete cookies that are already set. After Reject all, and again after the reload, `_ga` and `_ga_T3VGVEDZ7V` were still there.

## Flags

`legalPagesFinal` is false. The draft notices still show the publication-date placeholder, and the complaints page still shows the three "not recorded" placeholders. `privacyLineFinal` is true. The enquiry, contact and matchmaker enquiry forms carry the supplied privacy line, with Privacy Notice linking to privacy.html.

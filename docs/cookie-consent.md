# Cookie banner check

Fresh headless Chrome profile, no stored consent. Run with `node tests/cookie-banner.js`.

| Page | Width | Banner | Accept px | Reject px | Weight | Size | Same row and weight | Trackers before | Trackers after Reject | Tracker hosts after Accept |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| index.html | 390 | yes | 117×32 | 117×32 | 700 | 13.6px | yes | none | none | www.googletagmanager.com, www.google-analytics.com |
| packages.html | 390 | yes | 117×32 | 117×32 | 700 | 13.6px | yes | none | none | www.googletagmanager.com, www.google-analytics.com |
| destinations.html | 390 | yes | 117×32 | 117×32 | 700 | 13.6px | yes | none | none | www.googletagmanager.com, www.google-analytics.com |
| contact.html | 390 | yes | 117×32 | 117×32 | 700 | 13.6px | yes | none | none | www.googletagmanager.com, www.google-analytics.com |
| enquiry.html | 390 | yes | 117×32 | 117×32 | 700 | 13.6px | yes | none | none | www.googletagmanager.com, www.google-analytics.com |
| privacy.html | 390 | yes | 117×32 | 117×32 | 700 | 13.6px | yes | none | none | www.googletagmanager.com, www.google-analytics.com |
| cookies.html | 390 | yes | 117×32 | 117×32 | 700 | 13.6px | yes | none | none | www.googletagmanager.com, www.google-analytics.com |
| complaints.html | 390 | yes | 117×32 | 117×32 | 700 | 13.6px | yes | none | none | www.googletagmanager.com, www.google-analytics.com |
| index.html | 1280 | yes | 123×40 | 123×40 | 700 | 13.6px | yes | none | none | www.googletagmanager.com, www.google-analytics.com |
| packages.html | 1280 | yes | 123×40 | 123×40 | 700 | 13.6px | yes | none | none | www.googletagmanager.com, www.google-analytics.com |
| destinations.html | 1280 | yes | 123×40 | 123×40 | 700 | 13.6px | yes | none | none | www.googletagmanager.com, www.google-analytics.com |
| contact.html | 1280 | yes | 123×40 | 123×40 | 700 | 13.6px | yes | none | none | www.googletagmanager.com, www.google-analytics.com |
| enquiry.html | 1280 | yes | 123×40 | 123×40 | 700 | 13.6px | yes | none | none | www.googletagmanager.com, www.google-analytics.com |
| privacy.html | 1280 | yes | 123×40 | 123×40 | 700 | 13.6px | yes | none | none | www.googletagmanager.com, www.google-analytics.com |
| cookies.html | 1280 | yes | 123×40 | 123×40 | 700 | 13.6px | yes | none | none | www.googletagmanager.com, www.google-analytics.com |
| complaints.html | 1280 | yes | 123×40 | 123×40 | 700 | 13.6px | yes | none | none | www.googletagmanager.com, www.google-analytics.com |

Accept all may request Google Analytics, because that measurement id is set. Meta, TikTok and HubSpot stay off: their ids are placeholders or the HubSpot switch is off.

localStorage before a choice is empty. After Reject all the only new key is `tnt-consent`, with analytics and marketing false. After Accept all the same key has both true. No non-essential cookies were set before a choice or after Reject all. Google Analytics cookies (`_ga`, `_ga_T3VGVEDZ7V`) appear only after Accept all.

## Storage and cookies

- index.html at 390: localStorage before `none`; cookies before `none`. After Reject all, localStorage `tnt-consent`; cookies `none`. After Accept all, localStorage `tnt-consent`; cookies `_ga_T3VGVEDZ7V@127.0.0.1, _ga@127.0.0.1`.
- packages.html at 390: localStorage before `none`; cookies before `none`. After Reject all, localStorage `tnt-consent`; cookies `none`. After Accept all, localStorage `tnt-consent`; cookies `_ga_T3VGVEDZ7V@127.0.0.1, _ga@127.0.0.1`.
- destinations.html at 390: localStorage before `none`; cookies before `none`. After Reject all, localStorage `tnt-consent`; cookies `none`. After Accept all, localStorage `tnt-consent`; cookies `_ga_T3VGVEDZ7V@127.0.0.1, _ga@127.0.0.1`.
- contact.html at 390: localStorage before `none`; cookies before `none`. After Reject all, localStorage `tnt-consent`; cookies `none`. After Accept all, localStorage `tnt-consent`; cookies `_ga_T3VGVEDZ7V@127.0.0.1, _ga@127.0.0.1`.
- enquiry.html at 390: localStorage before `none`; cookies before `none`. After Reject all, localStorage `tnt-consent`; cookies `none`. After Accept all, localStorage `tnt-consent`; cookies `_ga_T3VGVEDZ7V@127.0.0.1, _ga@127.0.0.1`.
- privacy.html at 390: localStorage before `none`; cookies before `none`. After Reject all, localStorage `tnt-consent`; cookies `none`. After Accept all, localStorage `tnt-consent`; cookies `_ga_T3VGVEDZ7V@127.0.0.1, _ga@127.0.0.1`.
- cookies.html at 390: localStorage before `none`; cookies before `none`. After Reject all, localStorage `tnt-consent`; cookies `none`. After Accept all, localStorage `tnt-consent`; cookies `_ga_T3VGVEDZ7V@127.0.0.1, _ga@127.0.0.1`.
- complaints.html at 390: localStorage before `none`; cookies before `none`. After Reject all, localStorage `tnt-consent`; cookies `none`. After Accept all, localStorage `tnt-consent`; cookies `_ga_T3VGVEDZ7V@127.0.0.1, _ga@127.0.0.1`.
- index.html at 1280: localStorage before `none`; cookies before `none`. After Reject all, localStorage `tnt-consent`; cookies `none`. After Accept all, localStorage `tnt-consent`; cookies `_ga_T3VGVEDZ7V@127.0.0.1, _ga@127.0.0.1`.
- packages.html at 1280: localStorage before `none`; cookies before `none`. After Reject all, localStorage `tnt-consent`; cookies `none`. After Accept all, localStorage `tnt-consent`; cookies `_ga_T3VGVEDZ7V@127.0.0.1, _ga@127.0.0.1`.
- destinations.html at 1280: localStorage before `none`; cookies before `none`. After Reject all, localStorage `tnt-consent`; cookies `none`. After Accept all, localStorage `tnt-consent`; cookies `_ga_T3VGVEDZ7V@127.0.0.1, _ga@127.0.0.1`.
- contact.html at 1280: localStorage before `none`; cookies before `none`. After Reject all, localStorage `tnt-consent`; cookies `none`. After Accept all, localStorage `tnt-consent`; cookies `_ga_T3VGVEDZ7V@127.0.0.1, _ga@127.0.0.1`.
- enquiry.html at 1280: localStorage before `none`; cookies before `none`. After Reject all, localStorage `tnt-consent`; cookies `none`. After Accept all, localStorage `tnt-consent`; cookies `_ga_T3VGVEDZ7V@127.0.0.1, _ga@127.0.0.1`.
- privacy.html at 1280: localStorage before `none`; cookies before `none`. After Reject all, localStorage `tnt-consent`; cookies `none`. After Accept all, localStorage `tnt-consent`; cookies `_ga_T3VGVEDZ7V@127.0.0.1, _ga@127.0.0.1`.
- cookies.html at 1280: localStorage before `none`; cookies before `none`. After Reject all, localStorage `tnt-consent`; cookies `none`. After Accept all, localStorage `tnt-consent`; cookies `_ga_T3VGVEDZ7V@127.0.0.1, _ga@127.0.0.1`.
- complaints.html at 1280: localStorage before `none`; cookies before `none`. After Reject all, localStorage `tnt-consent`; cookies `none`. After Accept all, localStorage `tnt-consent`; cookies `_ga_T3VGVEDZ7V@127.0.0.1, _ga@127.0.0.1`.

## Network requests

### index.html at 390

Before any choice:

- http://127.0.0.1:8795/index.html
- http://127.0.0.1:8795/fonts/source-sans-400.woff2
- http://127.0.0.1:8795/fonts/source-sans-700.woff2
- http://127.0.0.1:8795/fonts/fraunces-600.woff2
- http://127.0.0.1:8795/images/photos/hero-900.avif
- http://127.0.0.1:8795/css/tokens.css
- http://127.0.0.1:8795/css/site.css
- http://127.0.0.1:8795/images/opt/logo-160.webp
- http://127.0.0.1:8795/js/config.js
- http://127.0.0.1:8795/js/logic.js
- http://127.0.0.1:8795/js/consent.js
- http://127.0.0.1:8795/js/site.js
- http://127.0.0.1:8795/js/forms.js
- http://127.0.0.1:8795/js/matchmaker.js
- http://127.0.0.1:8795/js/deals.js
- http://127.0.0.1:8795/js/calculator.js
- http://127.0.0.1:8795/images/photos/spain.avif
- http://127.0.0.1:8795/images/photos/turkey.avif
- http://127.0.0.1:8795/images/photos/greece.avif
- http://127.0.0.1:8795/data/reviews.json
- http://127.0.0.1:8795/data/deals.json
- http://127.0.0.1:8795/data/deals.json
- http://127.0.0.1:8795/images/opt/favicon-32.png

After Reject all (requests started by the click):

- (none)

After Accept all (requests started by the click):

- https://www.googletagmanager.com/gtag/js?id=G-T3VGVEDZ7V
- https://www.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6ae1v9224426056za208zd9224426056xf1&_p=1792255987922&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=1631981387.1792255988&frm=0&ngs=1&pscdl=noapi&rcb=15&sr=390x844&uaa=x86&uab=64&uafvl=Chromium%3B154.0.8037.92%7CGoogle%2520Chrome%3B154.0.8037.92%7CNot%2520A(Brand%3B99.0.0.0&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115616986~115938465~115938468~118897920~118897930~120213116~120385423~120469145~120469153~121246026~121246034&sid=1792255988&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Findex.html&dt=Holidays%20planned%20for%20you%2C%20on%20WhatsApp%20%7C%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=799

### packages.html at 390

Before any choice:

- http://127.0.0.1:8795/packages.html
- http://127.0.0.1:8795/fonts/source-sans-400.woff2
- http://127.0.0.1:8795/fonts/source-sans-700.woff2
- http://127.0.0.1:8795/fonts/fraunces-600.woff2
- http://127.0.0.1:8795/images/photos/packages.avif
- http://127.0.0.1:8795/css/tokens.css
- http://127.0.0.1:8795/css/site.css
- http://127.0.0.1:8795/images/opt/logo-160.webp
- http://127.0.0.1:8795/js/config.js
- http://127.0.0.1:8795/js/logic.js
- http://127.0.0.1:8795/js/consent.js
- http://127.0.0.1:8795/js/site.js
- http://127.0.0.1:8795/js/forms.js
- http://127.0.0.1:8795/js/matchmaker.js
- http://127.0.0.1:8795/data/deals.json
- http://127.0.0.1:8795/images/photos/adventure.avif
- http://127.0.0.1:8795/images/photos/heritage.avif
- http://127.0.0.1:8795/images/photos/romantic.avif
- http://127.0.0.1:8795/images/photos/flights.avif
- http://127.0.0.1:8795/images/opt/favicon-32.png

After Reject all (requests started by the click):

- (none)

After Accept all (requests started by the click):

- https://www.googletagmanager.com/gtag/js?id=G-T3VGVEDZ7V
- https://www.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6ae1v9224426056za208zd9224426056xf1&_p=1792255992306&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=84405127.1792255992&frm=0&ngs=1&pscdl=noapi&rcb=3&sr=390x844&uaa=x86&uab=64&uafvl=Chromium%3B154.0.8037.92%7CGoogle%2520Chrome%3B154.0.8037.92%7CNot%2520A(Brand%3B99.0.0.0&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115938465~115938468~118897920~118897930~120213116~120385423~120469145~120469153~121246026~121246034&sid=1792255992&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Fpackages.html&dt=Holiday%20Packages%20%7C%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=766

### destinations.html at 390

Before any choice:

- http://127.0.0.1:8795/destinations.html
- http://127.0.0.1:8795/fonts/source-sans-400.woff2
- http://127.0.0.1:8795/fonts/source-sans-700.woff2
- http://127.0.0.1:8795/fonts/fraunces-600.woff2
- http://127.0.0.1:8795/images/photos/coast.avif
- http://127.0.0.1:8795/css/tokens.css
- http://127.0.0.1:8795/css/site.css
- http://127.0.0.1:8795/images/opt/logo-160.webp
- http://127.0.0.1:8795/js/config.js
- http://127.0.0.1:8795/js/logic.js
- http://127.0.0.1:8795/js/consent.js
- http://127.0.0.1:8795/js/site.js
- http://127.0.0.1:8795/js/forms.js
- http://127.0.0.1:8795/js/matchmaker.js
- http://127.0.0.1:8795/images/photos/spain.avif
- http://127.0.0.1:8795/images/photos/turkey.avif
- http://127.0.0.1:8795/images/photos/greece.avif
- http://127.0.0.1:8795/data/deals.json
- http://127.0.0.1:8795/images/opt/favicon-32.png

After Reject all (requests started by the click):

- (none)

After Accept all (requests started by the click):

- https://www.googletagmanager.com/gtag/js?id=G-T3VGVEDZ7V
- https://www.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6ae1h1v9224426056za208zd9224426056xf1&_p=1792255996706&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=1986290614.1792255997&frm=0&ngs=1&pscdl=noapi&rcb=15&sr=390x844&uaa=x86&uab=64&uafvl=Chromium%3B154.0.8037.92%7CGoogle%2520Chrome%3B154.0.8037.92%7CNot%2520A(Brand%3B99.0.0.0&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115616985~115938465~115938468~118897920~118897930~120213116~120385422~120469145~120469153~121246026~121246034&sid=1792255996&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Fdestinations.html&dt=Destinations%3A%20Spain%2C%20Turkey%20and%20Greece%20%7C%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=772

### contact.html at 390

Before any choice:

- http://127.0.0.1:8795/contact.html
- http://127.0.0.1:8795/fonts/source-sans-400.woff2
- http://127.0.0.1:8795/fonts/source-sans-700.woff2
- http://127.0.0.1:8795/fonts/fraunces-600.woff2
- http://127.0.0.1:8795/images/photos/contact.avif
- http://127.0.0.1:8795/css/tokens.css
- http://127.0.0.1:8795/css/site.css
- http://127.0.0.1:8795/images/opt/logo-160.webp
- http://127.0.0.1:8795/js/config.js
- http://127.0.0.1:8795/js/logic.js
- http://127.0.0.1:8795/js/consent.js
- http://127.0.0.1:8795/js/site.js
- http://127.0.0.1:8795/js/forms.js
- http://127.0.0.1:8795/js/matchmaker.js
- http://127.0.0.1:8795/data/deals.json
- http://127.0.0.1:8795/images/opt/favicon-32.png

After Reject all (requests started by the click):

- (none)

After Accept all (requests started by the click):

- https://www.googletagmanager.com/gtag/js?id=G-T3VGVEDZ7V
- https://www.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6ae1v9224426056za208zd9224426056xf1&_p=1792256001105&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=624199.1792256001&frm=0&ngs=1&pscdl=noapi&rcb=11&sr=390x844&uaa=x86&uab=64&uafvl=Chromium%3B154.0.8037.92%7CGoogle%2520Chrome%3B154.0.8037.92%7CNot%2520A(Brand%3B99.0.0.0&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115616986~115938465~115938468~118897920~118897930~120213116~120385422~120469145~120469153~121246026~121246034&sid=1792256001&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Fcontact.html&dt=Contact%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=749

### enquiry.html at 390

Before any choice:

- http://127.0.0.1:8795/enquiry.html
- http://127.0.0.1:8795/fonts/source-sans-400.woff2
- http://127.0.0.1:8795/fonts/source-sans-700.woff2
- http://127.0.0.1:8795/fonts/fraunces-600.woff2
- http://127.0.0.1:8795/css/tokens.css
- http://127.0.0.1:8795/css/site.css
- http://127.0.0.1:8795/images/opt/logo-160.webp
- http://127.0.0.1:8795/js/config.js
- http://127.0.0.1:8795/js/logic.js
- http://127.0.0.1:8795/js/consent.js
- http://127.0.0.1:8795/js/site.js
- http://127.0.0.1:8795/js/forms.js
- http://127.0.0.1:8795/js/matchmaker.js
- http://127.0.0.1:8795/data/deals.json
- http://127.0.0.1:8795/images/opt/favicon-32.png

After Reject all (requests started by the click):

- (none)

After Accept all (requests started by the click):

- https://www.googletagmanager.com/gtag/js?id=G-T3VGVEDZ7V
- https://www.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6ae1v9224426056za208zd9224426056xf1&_p=1792256005505&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=1958931152.1792256006&frm=0&ngs=1&pscdl=noapi&rcb=1&sr=390x844&uaa=x86&uab=64&uafvl=Chromium%3B154.0.8037.92%7CGoogle%2520Chrome%3B154.0.8037.92%7CNot%2520A(Brand%3B99.0.0.0&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115938466~115938468~118897920~118897930~120213116~120385423~120469145~120469153~121246026~121246034&sid=1792256005&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Fenquiry.html&dt=Enquiry%20%7C%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=758

### privacy.html at 390

Before any choice:

- http://127.0.0.1:8795/privacy.html
- http://127.0.0.1:8795/fonts/source-sans-400.woff2
- http://127.0.0.1:8795/fonts/source-sans-700.woff2
- http://127.0.0.1:8795/fonts/fraunces-600.woff2
- http://127.0.0.1:8795/css/tokens.css
- http://127.0.0.1:8795/css/site.css
- http://127.0.0.1:8795/images/opt/logo-160.webp
- http://127.0.0.1:8795/js/config.js
- http://127.0.0.1:8795/js/logic.js
- http://127.0.0.1:8795/js/consent.js
- http://127.0.0.1:8795/js/site.js
- http://127.0.0.1:8795/js/forms.js
- http://127.0.0.1:8795/js/matchmaker.js
- http://127.0.0.1:8795/data/deals.json
- http://127.0.0.1:8795/images/opt/favicon-32.png

After Reject all (requests started by the click):

- (none)

After Accept all (requests started by the click):

- https://www.googletagmanager.com/gtag/js?id=G-T3VGVEDZ7V
- https://www.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6ae1v9224426056za208zd9224426056xf1&_p=1792256009888&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=482685090.1792256010&frm=0&ngs=1&pscdl=noapi&rcb=11&sr=390x844&uaa=x86&uab=64&uafvl=Chromium%3B154.0.8037.92%7CGoogle%2520Chrome%3B154.0.8037.92%7CNot%2520A(Brand%3B99.0.0.0&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115938466~115938469~118897920~118897930~120213116~120385422~120469145~120469153~121246026~121246034&sid=1792256010&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Fprivacy.html&dt=Privacy%20Notice%20(draft)%20%7C%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=742

### cookies.html at 390

Before any choice:

- http://127.0.0.1:8795/cookies.html
- http://127.0.0.1:8795/fonts/source-sans-400.woff2
- http://127.0.0.1:8795/fonts/source-sans-700.woff2
- http://127.0.0.1:8795/fonts/fraunces-600.woff2
- http://127.0.0.1:8795/css/tokens.css
- http://127.0.0.1:8795/css/site.css
- http://127.0.0.1:8795/images/opt/logo-160.webp
- http://127.0.0.1:8795/js/config.js
- http://127.0.0.1:8795/js/logic.js
- http://127.0.0.1:8795/js/consent.js
- http://127.0.0.1:8795/js/site.js
- http://127.0.0.1:8795/js/forms.js
- http://127.0.0.1:8795/js/matchmaker.js
- http://127.0.0.1:8795/data/deals.json
- http://127.0.0.1:8795/images/opt/favicon-32.png

After Reject all (requests started by the click):

- (none)

After Accept all (requests started by the click):

- https://www.googletagmanager.com/gtag/js?id=G-T3VGVEDZ7V
- https://www.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6af0h2v9224426056za208zd9224426056xf1&_p=1792256014254&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=27656710.1792256014&frm=0&ngs=1&pscdl=noapi&rcb=8&sr=390x844&uaa=x86&uab=64&uafvl=Chromium%3B154.0.8037.92%7CGoogle%2520Chrome%3B154.0.8037.92%7CNot%2520A(Brand%3B99.0.0.0&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115616985~115938466~115938468~118897920~118897930~120213116~120385422~120469145~120469153~121246026~121246034&sid=1792256014&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Fcookies.html&dt=Cookie%20Notice%20(draft)%20%7C%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=728

### complaints.html at 390

Before any choice:

- http://127.0.0.1:8795/complaints.html
- http://127.0.0.1:8795/fonts/source-sans-400.woff2
- http://127.0.0.1:8795/fonts/source-sans-700.woff2
- http://127.0.0.1:8795/fonts/fraunces-600.woff2
- http://127.0.0.1:8795/css/tokens.css
- http://127.0.0.1:8795/css/site.css
- http://127.0.0.1:8795/images/opt/logo-160.webp
- http://127.0.0.1:8795/js/config.js
- http://127.0.0.1:8795/js/logic.js
- http://127.0.0.1:8795/js/consent.js
- http://127.0.0.1:8795/js/site.js
- http://127.0.0.1:8795/js/forms.js
- http://127.0.0.1:8795/js/matchmaker.js
- http://127.0.0.1:8795/data/deals.json
- http://127.0.0.1:8795/images/opt/favicon-32.png

After Reject all (requests started by the click):

- (none)

After Accept all (requests started by the click):

- https://www.googletagmanager.com/gtag/js?id=G-T3VGVEDZ7V
- https://www.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6ae1v9224426056za208zd9224426056xf1&_p=1792256018606&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=1325802092.1792256019&frm=0&ngs=1&pscdl=noapi&rcb=4&sr=390x844&uaa=x86&uab=64&uafvl=Chromium%3B154.0.8037.92%7CGoogle%2520Chrome%3B154.0.8037.92%7CNot%2520A(Brand%3B99.0.0.0&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115938466~115938468~118897920~118897930~120213116~120385422~120469145~120469153~121246026~121246034&sid=1792256018&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Fcomplaints.html&dt=Complaints%20(draft)%20%7C%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=733

### index.html at 1280

Before any choice:

- http://127.0.0.1:8795/index.html
- http://127.0.0.1:8795/fonts/source-sans-400.woff2
- http://127.0.0.1:8795/fonts/source-sans-700.woff2
- http://127.0.0.1:8795/fonts/fraunces-600.woff2
- http://127.0.0.1:8795/images/photos/hero.avif
- http://127.0.0.1:8795/css/tokens.css
- http://127.0.0.1:8795/css/site.css
- http://127.0.0.1:8795/images/opt/logo-160.webp
- http://127.0.0.1:8795/js/config.js
- http://127.0.0.1:8795/js/logic.js
- http://127.0.0.1:8795/js/consent.js
- http://127.0.0.1:8795/js/site.js
- http://127.0.0.1:8795/js/forms.js
- http://127.0.0.1:8795/js/matchmaker.js
- http://127.0.0.1:8795/js/deals.js
- http://127.0.0.1:8795/js/calculator.js
- http://127.0.0.1:8795/data/reviews.json
- http://127.0.0.1:8795/data/deals.json
- http://127.0.0.1:8795/data/deals.json
- http://127.0.0.1:8795/images/photos/spain.avif
- http://127.0.0.1:8795/images/photos/turkey.avif
- http://127.0.0.1:8795/images/photos/greece.avif
- http://127.0.0.1:8795/images/photos/adventure.avif
- http://127.0.0.1:8795/images/photos/heritage.avif
- http://127.0.0.1:8795/images/photos/romantic.avif
- http://127.0.0.1:8795/images/opt/favicon-32.png

After Reject all (requests started by the click):

- (none)

After Accept all (requests started by the click):

- https://www.googletagmanager.com/gtag/js?id=G-T3VGVEDZ7V
- https://www.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6ae1v9224426056za208zd9224426056xf1&_p=1792256023021&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=2078800139.1792256023&frm=0&ngs=1&pscdl=noapi&rcb=15&sr=1280x900&uaa=x86&uab=64&uafvl=Chromium%3B154.0.8037.92%7CGoogle%2520Chrome%3B154.0.8037.92%7CNot%2520A(Brand%3B99.0.0.0&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115616985~115938465~115938469~118897920~118897930~120213116~120385423~120420416~120469145~120469153~121246026~121246034&sid=1792256023&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Findex.html&dt=Holidays%20planned%20for%20you%2C%20on%20WhatsApp%20%7C%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=748

### packages.html at 1280

Before any choice:

- http://127.0.0.1:8795/packages.html
- http://127.0.0.1:8795/fonts/source-sans-400.woff2
- http://127.0.0.1:8795/fonts/source-sans-700.woff2
- http://127.0.0.1:8795/fonts/fraunces-600.woff2
- http://127.0.0.1:8795/images/photos/packages.avif
- http://127.0.0.1:8795/css/tokens.css
- http://127.0.0.1:8795/css/site.css
- http://127.0.0.1:8795/images/opt/logo-160.webp
- http://127.0.0.1:8795/js/config.js
- http://127.0.0.1:8795/js/logic.js
- http://127.0.0.1:8795/js/consent.js
- http://127.0.0.1:8795/js/site.js
- http://127.0.0.1:8795/js/forms.js
- http://127.0.0.1:8795/js/matchmaker.js
- http://127.0.0.1:8795/data/deals.json
- http://127.0.0.1:8795/images/opt/favicon-32.png
- http://127.0.0.1:8795/images/photos/adventure.avif
- http://127.0.0.1:8795/images/photos/heritage.avif
- http://127.0.0.1:8795/images/photos/romantic.avif
- http://127.0.0.1:8795/images/photos/flights.avif

After Reject all (requests started by the click):

- (none)

After Accept all (requests started by the click):

- https://www.googletagmanager.com/gtag/js?id=G-T3VGVEDZ7V
- https://www.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6ae1v9224426056za208zd9224426056xf1&_p=1792256027421&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=1522468459.1792256028&frm=0&ngs=1&pscdl=noapi&rcb=8&sr=1280x900&uaa=x86&uab=64&uafvl=Chromium%3B154.0.8037.92%7CGoogle%2520Chrome%3B154.0.8037.92%7CNot%2520A(Brand%3B99.0.0.0&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115938465~115938468~118897920~118897930~120213116~120385423~120469145~120469153~121246026~121246034&sid=1792256027&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Fpackages.html&dt=Holiday%20Packages%20%7C%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=746

### destinations.html at 1280

Before any choice:

- http://127.0.0.1:8795/destinations.html
- http://127.0.0.1:8795/fonts/source-sans-400.woff2
- http://127.0.0.1:8795/fonts/source-sans-700.woff2
- http://127.0.0.1:8795/fonts/fraunces-600.woff2
- http://127.0.0.1:8795/images/photos/coast.avif
- http://127.0.0.1:8795/css/tokens.css
- http://127.0.0.1:8795/css/site.css
- http://127.0.0.1:8795/images/opt/logo-160.webp
- http://127.0.0.1:8795/js/config.js
- http://127.0.0.1:8795/js/logic.js
- http://127.0.0.1:8795/js/consent.js
- http://127.0.0.1:8795/js/site.js
- http://127.0.0.1:8795/js/forms.js
- http://127.0.0.1:8795/js/matchmaker.js
- http://127.0.0.1:8795/data/deals.json
- http://127.0.0.1:8795/images/photos/spain.avif
- http://127.0.0.1:8795/images/photos/turkey.avif
- http://127.0.0.1:8795/images/photos/greece.avif
- http://127.0.0.1:8795/images/opt/favicon-32.png

After Reject all (requests started by the click):

- (none)

After Accept all (requests started by the click):

- https://www.googletagmanager.com/gtag/js?id=G-T3VGVEDZ7V
- https://www.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6ae1v9224426056za208zd9224426056xf1&_p=1792256031804&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=1320740762.1792256032&frm=0&ngs=1&pscdl=noapi&rcb=7&sr=1280x900&uaa=x86&uab=64&uafvl=Chromium%3B154.0.8037.92%7CGoogle%2520Chrome%3B154.0.8037.92%7CNot%2520A(Brand%3B99.0.0.0&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115938465~115938468~118897920~118897930~120213116~120385423~120469145~120469153~121246026~121246034&sid=1792256031&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Fdestinations.html&dt=Destinations%3A%20Spain%2C%20Turkey%20and%20Greece%20%7C%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=748

### contact.html at 1280

Before any choice:

- http://127.0.0.1:8795/contact.html
- http://127.0.0.1:8795/fonts/source-sans-400.woff2
- http://127.0.0.1:8795/fonts/source-sans-700.woff2
- http://127.0.0.1:8795/fonts/fraunces-600.woff2
- http://127.0.0.1:8795/images/photos/contact.avif
- http://127.0.0.1:8795/css/tokens.css
- http://127.0.0.1:8795/css/site.css
- http://127.0.0.1:8795/images/opt/logo-160.webp
- http://127.0.0.1:8795/js/config.js
- http://127.0.0.1:8795/js/logic.js
- http://127.0.0.1:8795/js/consent.js
- http://127.0.0.1:8795/js/site.js
- http://127.0.0.1:8795/js/forms.js
- http://127.0.0.1:8795/js/matchmaker.js
- http://127.0.0.1:8795/data/deals.json
- http://127.0.0.1:8795/images/opt/favicon-32.png

After Reject all (requests started by the click):

- (none)

After Accept all (requests started by the click):

- https://www.googletagmanager.com/gtag/js?id=G-T3VGVEDZ7V
- https://www.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6ae1v9224426056za208zd9224426056xf1&_p=1792256036187&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=1747914568.1792256036&frm=0&ngs=1&pscdl=noapi&rcb=3&sr=1280x900&uaa=x86&uab=64&uafvl=Chromium%3B154.0.8037.92%7CGoogle%2520Chrome%3B154.0.8037.92%7CNot%2520A(Brand%3B99.0.0.0&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115616985~115938466~115938469~118897920~118897930~120213116~120385422~120469145~120469153~121246026~121246034&sid=1792256036&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Fcontact.html&dt=Contact%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=747

### enquiry.html at 1280

Before any choice:

- http://127.0.0.1:8795/enquiry.html
- http://127.0.0.1:8795/fonts/source-sans-400.woff2
- http://127.0.0.1:8795/fonts/source-sans-700.woff2
- http://127.0.0.1:8795/fonts/fraunces-600.woff2
- http://127.0.0.1:8795/css/tokens.css
- http://127.0.0.1:8795/css/site.css
- http://127.0.0.1:8795/images/opt/logo-160.webp
- http://127.0.0.1:8795/js/config.js
- http://127.0.0.1:8795/js/logic.js
- http://127.0.0.1:8795/js/consent.js
- http://127.0.0.1:8795/js/site.js
- http://127.0.0.1:8795/js/forms.js
- http://127.0.0.1:8795/js/matchmaker.js
- http://127.0.0.1:8795/data/deals.json
- http://127.0.0.1:8795/images/opt/favicon-32.png

After Reject all (requests started by the click):

- (none)

After Accept all (requests started by the click):

- https://www.googletagmanager.com/gtag/js?id=G-T3VGVEDZ7V
- https://www.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6ae1v9224426056za208zd9224426056xf1&_p=1792256040569&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=843159031.1792256041&frm=0&ngs=1&pscdl=noapi&rcb=10&sr=1280x900&uaa=x86&uab=64&uafvl=Chromium%3B154.0.8037.92%7CGoogle%2520Chrome%3B154.0.8037.92%7CNot%2520A(Brand%3B99.0.0.0&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115938465~115938468~118897920~118897930~120213116~120385422~120469145~120469153~121246026~121246034&sid=1792256040&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Fenquiry.html&dt=Enquiry%20%7C%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=748

### privacy.html at 1280

Before any choice:

- http://127.0.0.1:8795/privacy.html
- http://127.0.0.1:8795/fonts/source-sans-400.woff2
- http://127.0.0.1:8795/fonts/source-sans-700.woff2
- http://127.0.0.1:8795/fonts/fraunces-600.woff2
- http://127.0.0.1:8795/css/tokens.css
- http://127.0.0.1:8795/css/site.css
- http://127.0.0.1:8795/images/opt/logo-160.webp
- http://127.0.0.1:8795/js/config.js
- http://127.0.0.1:8795/js/logic.js
- http://127.0.0.1:8795/js/consent.js
- http://127.0.0.1:8795/js/site.js
- http://127.0.0.1:8795/js/forms.js
- http://127.0.0.1:8795/js/matchmaker.js
- http://127.0.0.1:8795/data/deals.json
- http://127.0.0.1:8795/images/opt/favicon-32.png

After Reject all (requests started by the click):

- (none)

After Accept all (requests started by the click):

- https://www.googletagmanager.com/gtag/js?id=G-T3VGVEDZ7V
- https://www.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6ae1v9224426056za208zd9224426056xf1&_p=1792256044937&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=2077235247.1792256045&frm=0&ngs=1&pscdl=noapi&rcb=15&sr=1280x900&uaa=x86&uab=64&uafvl=Chromium%3B154.0.8037.92%7CGoogle%2520Chrome%3B154.0.8037.92%7CNot%2520A(Brand%3B99.0.0.0&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115616985~115938466~115938468~118897920~118897930~120213116~120385422~120469145~120469153~121246026~121246034&sid=1792256045&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Fprivacy.html&dt=Privacy%20Notice%20(draft)%20%7C%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=901

### cookies.html at 1280

Before any choice:

- http://127.0.0.1:8795/cookies.html
- http://127.0.0.1:8795/fonts/source-sans-400.woff2
- http://127.0.0.1:8795/fonts/source-sans-700.woff2
- http://127.0.0.1:8795/fonts/fraunces-600.woff2
- http://127.0.0.1:8795/css/tokens.css
- http://127.0.0.1:8795/css/site.css
- http://127.0.0.1:8795/images/opt/logo-160.webp
- http://127.0.0.1:8795/js/config.js
- http://127.0.0.1:8795/js/logic.js
- http://127.0.0.1:8795/js/consent.js
- http://127.0.0.1:8795/js/site.js
- http://127.0.0.1:8795/js/forms.js
- http://127.0.0.1:8795/js/matchmaker.js
- http://127.0.0.1:8795/data/deals.json
- http://127.0.0.1:8795/images/opt/favicon-32.png

After Reject all (requests started by the click):

- (none)

After Accept all (requests started by the click):

- https://www.googletagmanager.com/gtag/js?id=G-T3VGVEDZ7V
- https://www.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6ae1v9224426056za208zd9224426056xf1&_p=1792256049320&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=1393218467.1792256049&frm=0&ngs=1&pscdl=noapi&rcb=5&sr=1280x900&uaa=x86&uab=64&uafvl=Chromium%3B154.0.8037.92%7CGoogle%2520Chrome%3B154.0.8037.92%7CNot%2520A(Brand%3B99.0.0.0&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115938465~115938469~118897920~118897930~120213116~120385422~120469145~120469153~121246026~121246034&sid=1792256049&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Fcookies.html&dt=Cookie%20Notice%20(draft)%20%7C%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=749

### complaints.html at 1280

Before any choice:

- http://127.0.0.1:8795/complaints.html
- http://127.0.0.1:8795/fonts/source-sans-400.woff2
- http://127.0.0.1:8795/fonts/source-sans-700.woff2
- http://127.0.0.1:8795/fonts/fraunces-600.woff2
- http://127.0.0.1:8795/css/tokens.css
- http://127.0.0.1:8795/css/site.css
- http://127.0.0.1:8795/images/opt/logo-160.webp
- http://127.0.0.1:8795/js/config.js
- http://127.0.0.1:8795/js/logic.js
- http://127.0.0.1:8795/js/consent.js
- http://127.0.0.1:8795/js/site.js
- http://127.0.0.1:8795/js/forms.js
- http://127.0.0.1:8795/js/matchmaker.js
- http://127.0.0.1:8795/data/deals.json
- http://127.0.0.1:8795/images/opt/favicon-32.png

After Reject all (requests started by the click):

- (none)

After Accept all (requests started by the click):

- https://www.googletagmanager.com/gtag/js?id=G-T3VGVEDZ7V
- https://www.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6ae1v9224426056za208zd9224426056xf1&_p=1792256053721&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=738497431.1792256054&frm=0&ngs=1&pscdl=noapi&rcb=17&sr=1280x900&uaa=x86&uab=64&uafvl=Chromium%3B154.0.8037.92%7CGoogle%2520Chrome%3B154.0.8037.92%7CNot%2520A(Brand%3B99.0.0.0&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115938466~115938469~118897920~118897930~119404696~120213116~120385422~120469145~120469153~121246026~121246034&sid=1792256053&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Fcomplaints.html&dt=Complaints%20(draft)%20%7C%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=755


## Withdrawal

On index.html, Accept all was followed by Manage cookies and then Reject all.

- Google Analytics cookies after Accept all: _ga_T3VGVEDZ7V expires in 400 days; _ga expires in 400 days
- Tracker requests started by the Reject click: none
- Google Analytics cookies still present after Reject all: _ga, _ga_T3VGVEDZ7V
- Tracker requests on the next page load: none
- Google Analytics cookies still present after that reload: _ga, _ga_T3VGVEDZ7V
- The site code removes those cookies: no

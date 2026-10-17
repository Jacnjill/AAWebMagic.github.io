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
- https://www.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6ae1v9224426056za208zd9224426056xf1&_p=1792255663787&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=1837328308.1792255664&frm=0&ngs=1&pscdl=noapi&rcb=13&sr=390x844&uaa=x86&uab=64&uafvl=Chromium%3B154.0.8037.92%7CGoogle%2520Chrome%3B154.0.8037.92%7CNot%2520A(Brand%3B99.0.0.0&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115938465~115938468~118897920~118897930~120213116~120385423~120469145~120469153~121246026~121246034&sid=1792255663&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Findex.html&dt=Holidays%20planned%20for%20you%2C%20on%20WhatsApp%20%7C%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=752

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
- https://www.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6ae1v9224426056za208zd9224426056xf1&_p=1792255668186&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=418608124.1792255669&frm=0&ngs=1&pscdl=noapi&rcb=16&sr=390x844&uaa=x86&uab=64&uafvl=Chromium%3B154.0.8037.92%7CGoogle%2520Chrome%3B154.0.8037.92%7CNot%2520A(Brand%3B99.0.0.0&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115616985~115938466~115938468~118897920~118897930~120213116~120385422~120469145~120469153~121246026~121246034&sid=1792255668&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Fpackages.html&dt=Holiday%20Packages%20%7C%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=980

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
- http://127.0.0.1:8795/data/deals.json
- http://127.0.0.1:8795/images/photos/spain.avif
- http://127.0.0.1:8795/images/photos/turkey.avif
- http://127.0.0.1:8795/images/photos/greece.avif
- http://127.0.0.1:8795/images/opt/favicon-32.png

After Reject all (requests started by the click):

- (none)

After Accept all (requests started by the click):

- https://www.googletagmanager.com/gtag/js?id=G-T3VGVEDZ7V
- https://www.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6ae1h1v9224426056za208zd9224426056xf1&_p=1792255672586&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=200347927.1792255673&frm=0&ngs=1&pscdl=noapi&rcb=12&sr=390x844&uaa=x86&uab=64&uafvl=Chromium%3B154.0.8037.92%7CGoogle%2520Chrome%3B154.0.8037.92%7CNot%2520A(Brand%3B99.0.0.0&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115938465~115938468~118897920~118897930~120213116~120385423~120469145~120469153~121246026~121246034&sid=1792255672&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Fdestinations.html&dt=Destinations%3A%20Spain%2C%20Turkey%20and%20Greece%20%7C%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=747

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
- https://www.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6ae1v9224426056za208zd9224426056xf1&_p=1792255676985&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=232879730.1792255677&frm=0&ngs=1&pscdl=noapi&rcb=9&sr=390x844&uaa=x86&uab=64&uafvl=Chromium%3B154.0.8037.92%7CGoogle%2520Chrome%3B154.0.8037.92%7CNot%2520A(Brand%3B99.0.0.0&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115938466~115938468~118897920~118897930~120213116~120385422~120469145~120469153~121246026~121246034&sid=1792255677&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Fcontact.html&dt=Contact%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=749

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
- https://www.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6ae1h1v9224426056za208zd9224426056xf1&_p=1792255681385&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=445850274.1792255682&frm=0&ngs=1&pscdl=noapi&rcb=11&sr=390x844&uaa=x86&uab=64&uafvl=Chromium%3B154.0.8037.92%7CGoogle%2520Chrome%3B154.0.8037.92%7CNot%2520A(Brand%3B99.0.0.0&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115616986~115938466~115938469~118897920~118897930~119793974~120213116~120385422~120412527~120469145~120469153~121246026~121246034&sid=1792255681&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Fenquiry.html&dt=Enquiry%20%7C%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=744

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
- https://www.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6ae1v9224426056za208zd9224426056xf1&_p=1792255685801&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=403364992.1792255686&frm=0&ngs=1&pscdl=noapi&rcb=18&sr=390x844&uaa=x86&uab=64&uafvl=Chromium%3B154.0.8037.92%7CGoogle%2520Chrome%3B154.0.8037.92%7CNot%2520A(Brand%3B99.0.0.0&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115938466~115938468~118897920~118897930~120213116~120385423~120469145~120469153~121246026~121246034&sid=1792255685&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Fprivacy.html&dt=Privacy%20Notice%20(draft)%20%7C%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=758

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
- https://www.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6ae1v9224426056za208zd9224426056xf1&_p=1792255690168&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=1433776788.1792255690&frm=0&ngs=1&pscdl=noapi&rcb=3&sr=390x844&uaa=x86&uab=64&uafvl=Chromium%3B154.0.8037.92%7CGoogle%2520Chrome%3B154.0.8037.92%7CNot%2520A(Brand%3B99.0.0.0&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115938466~115938469~118897920~118897930~120213116~120385423~120469145~120469153~121246026~121246034&sid=1792255690&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Fcookies.html&dt=Cookie%20Notice%20(draft)%20%7C%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=738

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
- https://www.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6ae1v9224426056za208zd9224426056xf1&_p=1792255694534&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=1900700037.1792255695&frm=0&ngs=1&pscdl=noapi&rcb=17&sr=390x844&uaa=x86&uab=64&uafvl=Chromium%3B154.0.8037.92%7CGoogle%2520Chrome%3B154.0.8037.92%7CNot%2520A(Brand%3B99.0.0.0&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115938465~115938469~118897920~118897930~120213116~120385422~120469145~120469153~121246026~121246034&sid=1792255694&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Fcomplaints.html&dt=Complaints%20(draft)%20%7C%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=742

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
- http://127.0.0.1:8795/images/photos/spain.avif
- http://127.0.0.1:8795/images/photos/turkey.avif
- http://127.0.0.1:8795/images/photos/greece.avif
- http://127.0.0.1:8795/images/photos/adventure.avif
- http://127.0.0.1:8795/images/photos/heritage.avif
- http://127.0.0.1:8795/images/photos/romantic.avif
- http://127.0.0.1:8795/data/reviews.json
- http://127.0.0.1:8795/data/deals.json
- http://127.0.0.1:8795/data/deals.json
- http://127.0.0.1:8795/images/opt/favicon-32.png

After Reject all (requests started by the click):

- (none)

After Accept all (requests started by the click):

- https://www.googletagmanager.com/gtag/js?id=G-T3VGVEDZ7V
- https://www.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6ae1v9224426056za208zd9224426056xf1&_p=1792255698950&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=1032454703.1792255699&frm=0&ngs=1&pscdl=noapi&rcb=15&sr=1280x900&uaa=x86&uab=64&uafvl=Chromium%3B154.0.8037.92%7CGoogle%2520Chrome%3B154.0.8037.92%7CNot%2520A(Brand%3B99.0.0.0&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115938465~115938468~118897920~118897930~120213116~120385422~120469145~120469153~121246026~121246034&sid=1792255699&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Findex.html&dt=Holidays%20planned%20for%20you%2C%20on%20WhatsApp%20%7C%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=751

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
- http://127.0.0.1:8795/images/photos/adventure.avif
- http://127.0.0.1:8795/images/photos/heritage.avif
- http://127.0.0.1:8795/images/photos/romantic.avif
- http://127.0.0.1:8795/images/photos/flights.avif
- http://127.0.0.1:8795/images/opt/favicon-32.png

After Reject all (requests started by the click):

- (none)

After Accept all (requests started by the click):

- https://www.googletagmanager.com/gtag/js?id=G-T3VGVEDZ7V
- https://www.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6af0h2v9224426056za208zd9224426056xf1&_p=1792255703367&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=611435203.1792255704&frm=0&ngs=1&pscdl=noapi&rcb=6&sr=1280x900&uaa=x86&uab=64&uafvl=Chromium%3B154.0.8037.92%7CGoogle%2520Chrome%3B154.0.8037.92%7CNot%2520A(Brand%3B99.0.0.0&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115938466~115938468~118897920~118897930~120213116~120385423~120469145~120469153~121246026~121246034&sid=1792255703&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Fpackages.html&dt=Holiday%20Packages%20%7C%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=752

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
- http://127.0.0.1:8795/images/photos/spain.avif
- http://127.0.0.1:8795/images/photos/turkey.avif
- http://127.0.0.1:8795/images/photos/greece.avif
- http://127.0.0.1:8795/data/deals.json
- http://127.0.0.1:8795/images/opt/favicon-32.png

After Reject all (requests started by the click):

- (none)

After Accept all (requests started by the click):

- https://www.googletagmanager.com/gtag/js?id=G-T3VGVEDZ7V
- https://www.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6af0h2v9224426056za208zd9224426056xf1&_p=1792255707767&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=1348826714.1792255708&frm=0&ngs=1&pscdl=noapi&rcb=0&sr=1280x900&uaa=x86&uab=64&uafvl=Chromium%3B154.0.8037.92%7CGoogle%2520Chrome%3B154.0.8037.92%7CNot%2520A(Brand%3B99.0.0.0&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115938465~115938468~118897920~118897930~120213116~120385423~120469145~120469153~121246026~121246034&sid=1792255707&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Fdestinations.html&dt=Destinations%3A%20Spain%2C%20Turkey%20and%20Greece%20%7C%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=753

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
- https://www.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6ae1v9224426056za208zd9224426056xf1&_p=1792255712166&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=819676983.1792255712&frm=0&ngs=1&pscdl=noapi&rcb=9&sr=1280x900&uaa=x86&uab=64&uafvl=Chromium%3B154.0.8037.92%7CGoogle%2520Chrome%3B154.0.8037.92%7CNot%2520A(Brand%3B99.0.0.0&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115938465~115938468~118897920~118897930~120213116~120385422~120469145~120469153~121246026~121246034&sid=1792255712&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Fcontact.html&dt=Contact%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=754

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
- https://www.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6ae1v9224426056za208zd9224426056xf1&_p=1792255716567&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=294873410.1792255717&frm=0&ngs=1&pscdl=noapi&rcb=18&sr=1280x900&uaa=x86&uab=64&uafvl=Chromium%3B154.0.8037.92%7CGoogle%2520Chrome%3B154.0.8037.92%7CNot%2520A(Brand%3B99.0.0.0&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115938465~115938469~118897920~118897930~120213116~120385423~120469145~120469153~121246026~121246034&sid=1792255716&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Fenquiry.html&dt=Enquiry%20%7C%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=757

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
- https://www.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6ae1h1v9224426056za208zd9224426056xf1&_p=1792255720933&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=723107129.1792255721&frm=0&ngs=1&pscdl=noapi&rcb=17&sr=1280x900&uaa=x86&uab=64&uafvl=Chromium%3B154.0.8037.92%7CGoogle%2520Chrome%3B154.0.8037.92%7CNot%2520A(Brand%3B99.0.0.0&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115938465~115938468~118897920~118897930~120213116~120385423~120469145~120469153~121246026~121246034&sid=1792255721&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Fprivacy.html&dt=Privacy%20Notice%20(draft)%20%7C%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=738

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
- https://www.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6ae1v9224426056za208zd9224426056xf1&_p=1792255725333&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=481146105.1792255725&frm=0&ngs=1&pscdl=noapi&rcb=17&sr=1280x900&uaa=x86&uab=64&uafvl=Chromium%3B154.0.8037.92%7CGoogle%2520Chrome%3B154.0.8037.92%7CNot%2520A(Brand%3B99.0.0.0&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115938465~115938469~118897920~118897930~120032689~120213116~120385423~120469145~120469153~121246026~121246034&sid=1792255725&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Fcookies.html&dt=Cookie%20Notice%20(draft)%20%7C%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=748

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
- https://www.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6ae1v9224426056za208zd9224426056xf1&_p=1792255729749&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=475705965.1792255730&frm=0&ngs=1&pscdl=noapi&rcb=5&sr=1280x900&uaa=x86&uab=64&uafvl=Chromium%3B154.0.8037.92%7CGoogle%2520Chrome%3B154.0.8037.92%7CNot%2520A(Brand%3B99.0.0.0&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115938465~115938468~118897920~118897930~120213116~120385423~120469145~120469153~121246026~121246034&sid=1792255729&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Fcomplaints.html&dt=Complaints%20(draft)%20%7C%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=748


## Withdrawal

On index.html, Accept all was followed by Manage cookies and then Reject all.

- Google Analytics cookies after Accept all: _ga_T3VGVEDZ7V expires in 400 days; _ga expires in 400 days
- Tracker requests started by the Reject click: none
- Google Analytics cookies still present after Reject all: _ga, _ga_T3VGVEDZ7V
- Tracker requests on the next page load: none
- Google Analytics cookies still present after that reload: _ga, _ga_T3VGVEDZ7V
- The site code removes those cookies: no

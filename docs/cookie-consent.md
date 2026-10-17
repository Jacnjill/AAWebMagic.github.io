# Cookie banner check

Fresh headless Chrome profile, no stored consent. Run with `node tests/cookie-banner.js`.

| Page | Width | Banner | Accept px | Reject px | Weight | Size | Same row and weight | Trackers before | Trackers after Reject | Tracker hosts after Accept |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| index.html | 390 | yes | 117×32 | 117×32 | 700 | 13.6px | yes | none | none | www.googletagmanager.com, www.google-analytics.com |
| packages.html | 390 | yes | 117×32 | 117×32 | 700 | 13.6px | yes | none | none | www.googletagmanager.com, www.google-analytics.com |
| destinations.html | 390 | yes | 117×32 | 117×32 | 700 | 13.6px | yes | none | none | www.googletagmanager.com, www.google-analytics.com |
| contact.html | 390 | yes | 117×32 | 117×32 | 700 | 13.6px | yes | none | none | www.googletagmanager.com, www.google-analytics.com |
| enquiry.html | 390 | yes | 117×32 | 117×32 | 700 | 13.6px | yes | none | none | www.googletagmanager.com, www.google-analytics.com |
| index.html | 1280 | yes | 123×40 | 123×40 | 700 | 13.6px | yes | none | none | www.googletagmanager.com, www.google-analytics.com |
| packages.html | 1280 | yes | 123×40 | 123×40 | 700 | 13.6px | yes | none | none | www.googletagmanager.com, www.google-analytics.com |
| destinations.html | 1280 | yes | 123×40 | 123×40 | 700 | 13.6px | yes | none | none | www.googletagmanager.com, www.google-analytics.com |
| contact.html | 1280 | yes | 123×40 | 123×40 | 700 | 13.6px | yes | none | none | www.googletagmanager.com, www.google-analytics.com |
| enquiry.html | 1280 | yes | 123×40 | 123×40 | 700 | 13.6px | yes | none | none | www.googletagmanager.com, www.google-analytics.com |

Accept all may request Google Analytics, because that measurement id is set. Meta, TikTok and HubSpot stay off: their ids are placeholders or the HubSpot switch is off.

localStorage before a choice is empty. After Reject all the only new key is `tnt-consent`, with analytics and marketing false. After Accept all the same key has both true. No non-essential cookies were set before a choice or after Reject all. Google Analytics cookies (`_ga`, `_ga_T3VGVEDZ7V`) appear only after Accept all.

## Storage and cookies

- index.html at 390: localStorage before `none`; cookies before `none`. After Reject all, localStorage `tnt-consent`; cookies `none`. After Accept all, localStorage `tnt-consent`; cookies `_ga_T3VGVEDZ7V@127.0.0.1, _ga@127.0.0.1`.
- packages.html at 390: localStorage before `none`; cookies before `none`. After Reject all, localStorage `tnt-consent`; cookies `none`. After Accept all, localStorage `tnt-consent`; cookies `_ga_T3VGVEDZ7V@127.0.0.1, _ga@127.0.0.1`.
- destinations.html at 390: localStorage before `none`; cookies before `none`. After Reject all, localStorage `tnt-consent`; cookies `none`. After Accept all, localStorage `tnt-consent`; cookies `_ga_T3VGVEDZ7V@127.0.0.1, _ga@127.0.0.1`.
- contact.html at 390: localStorage before `none`; cookies before `none`. After Reject all, localStorage `tnt-consent`; cookies `none`. After Accept all, localStorage `tnt-consent`; cookies `_ga_T3VGVEDZ7V@127.0.0.1, _ga@127.0.0.1`.
- enquiry.html at 390: localStorage before `none`; cookies before `none`. After Reject all, localStorage `tnt-consent`; cookies `none`. After Accept all, localStorage `tnt-consent`; cookies `_ga_T3VGVEDZ7V@127.0.0.1, _ga@127.0.0.1`.
- index.html at 1280: localStorage before `none`; cookies before `none`. After Reject all, localStorage `tnt-consent`; cookies `none`. After Accept all, localStorage `tnt-consent`; cookies `_ga_T3VGVEDZ7V@127.0.0.1, _ga@127.0.0.1`.
- packages.html at 1280: localStorage before `none`; cookies before `none`. After Reject all, localStorage `tnt-consent`; cookies `none`. After Accept all, localStorage `tnt-consent`; cookies `_ga_T3VGVEDZ7V@127.0.0.1, _ga@127.0.0.1`.
- destinations.html at 1280: localStorage before `none`; cookies before `none`. After Reject all, localStorage `tnt-consent`; cookies `none`. After Accept all, localStorage `tnt-consent`; cookies `_ga_T3VGVEDZ7V@127.0.0.1, _ga@127.0.0.1`.
- contact.html at 1280: localStorage before `none`; cookies before `none`. After Reject all, localStorage `tnt-consent`; cookies `none`. After Accept all, localStorage `tnt-consent`; cookies `_ga_T3VGVEDZ7V@127.0.0.1, _ga@127.0.0.1`.
- enquiry.html at 1280: localStorage before `none`; cookies before `none`. After Reject all, localStorage `tnt-consent`; cookies `none`. After Accept all, localStorage `tnt-consent`; cookies `_ga_T3VGVEDZ7V@127.0.0.1, _ga@127.0.0.1`.

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
- https://www.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6ae1v9224426056za208zd9224426056xf1&_p=1792254779388&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=1127863945.1792254780&frm=0&ngs=1&pscdl=noapi&rcb=1&sr=390x844&uaa=x86&uab=64&uafvl=Chromium%3B154.0.8037.92%7CGoogle%2520Chrome%3B154.0.8037.92%7CNot%2520A(Brand%3B99.0.0.0&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115938466~115938469~118897920~118897930~120213116~120385423~120469145~120469153~121246026~121246034&sid=1792254779&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Findex.html&dt=Holidays%20planned%20for%20you%2C%20on%20WhatsApp%20%7C%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=762

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
- https://www.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6ae1v9224426056za208zd9224426056xf1&_p=1792254783821&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=806038851.1792254784&frm=0&ngs=1&pscdl=noapi&rcb=3&sr=390x844&uaa=x86&uab=64&uafvl=Chromium%3B154.0.8037.92%7CGoogle%2520Chrome%3B154.0.8037.92%7CNot%2520A(Brand%3B99.0.0.0&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115616985~115938466~115938469~118897920~118897930~120213116~120385422~120469145~120469153~121246026~121246034&sid=1792254783&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Fpackages.html&dt=Holiday%20Packages%20%7C%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=752

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
- https://www.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6ae1v9224426056za208zd9224426056xf1&_p=1792254788220&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=149514178.1792254788&frm=0&ngs=1&pscdl=noapi&rcb=14&sr=390x844&uaa=x86&uab=64&uafvl=Chromium%3B154.0.8037.92%7CGoogle%2520Chrome%3B154.0.8037.92%7CNot%2520A(Brand%3B99.0.0.0&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115938465~115938469~118897920~118897930~120213116~120385422~120469145~120469153~121246026~121246034&sid=1792254788&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Fdestinations.html&dt=Destinations%3A%20Spain%2C%20Turkey%20and%20Greece%20%7C%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=776

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
- https://www.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6af0h2v9224426056za208zd9224426056xf1&_p=1792254792620&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=605160896.1792254793&frm=0&ngs=1&pscdl=noapi&rcb=19&sr=390x844&uaa=x86&uab=64&uafvl=Chromium%3B154.0.8037.92%7CGoogle%2520Chrome%3B154.0.8037.92%7CNot%2520A(Brand%3B99.0.0.0&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115616985~115938465~115938469~118897920~118897930~120213116~120385422~120469145~120469153~121246026~121246034&sid=1792254792&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Fcontact.html&dt=Contact%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=771

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
- https://www.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6ae1v9224426056za208zd9224426056xf1&_p=1792254797003&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=655816312.1792254797&frm=0&ngs=1&pscdl=noapi&rcb=13&sr=390x844&uaa=x86&uab=64&uafvl=Chromium%3B154.0.8037.92%7CGoogle%2520Chrome%3B154.0.8037.92%7CNot%2520A(Brand%3B99.0.0.0&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115616986~115938465~115938468~118897920~118897930~120213116~120385423~120469145~120469153~121246026~121246034&sid=1792254797&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Fenquiry.html&dt=Enquiry%20%7C%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=761

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
- https://www.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6af0h2v9224426056za208zd9224426056xf1&_p=1792254801420&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=1709230824.1792254802&frm=0&ngs=1&pscdl=noapi&rcb=9&sr=1280x900&uaa=x86&uab=64&uafvl=Chromium%3B154.0.8037.92%7CGoogle%2520Chrome%3B154.0.8037.92%7CNot%2520A(Brand%3B99.0.0.0&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115616985~115938466~115938468~118897920~118897930~119863601~120213116~120385423~120469145~120469153~121246026~121246034&sid=1792254801&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Findex.html&dt=Holidays%20planned%20for%20you%2C%20on%20WhatsApp%20%7C%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=752

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
- https://www.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6af0h2v9224426056za208zd9224426056xf1&_p=1792254805819&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=921760654.1792254806&frm=0&ngs=1&pscdl=noapi&rcb=3&sr=1280x900&uaa=x86&uab=64&uafvl=Chromium%3B154.0.8037.92%7CGoogle%2520Chrome%3B154.0.8037.92%7CNot%2520A(Brand%3B99.0.0.0&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115938465~115938469~118897920~118897930~120213116~120385423~120469145~120469153~121246026~121246034&sid=1792254805&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Fpackages.html&dt=Holiday%20Packages%20%7C%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=759

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
- https://www.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6ae1v9224426056za208zd9224426056xf1&_p=1792254810236&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=243705000.1792254810&frm=0&ngs=1&pscdl=noapi&rcb=14&sr=1280x900&uaa=x86&uab=64&uafvl=Chromium%3B154.0.8037.92%7CGoogle%2520Chrome%3B154.0.8037.92%7CNot%2520A(Brand%3B99.0.0.0&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115938465~115938469~118897920~118897930~120213116~120385422~120469145~120469153~121246026~121246034&sid=1792254810&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Fdestinations.html&dt=Destinations%3A%20Spain%2C%20Turkey%20and%20Greece%20%7C%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=780

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
- https://www.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6ae1v9224426056za208zd9224426056xf1&_p=1792254814637&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=1699733560.1792254815&frm=0&ngs=1&pscdl=noapi&rcb=9&sr=1280x900&uaa=x86&uab=64&uafvl=Chromium%3B154.0.8037.92%7CGoogle%2520Chrome%3B154.0.8037.92%7CNot%2520A(Brand%3B99.0.0.0&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115616986~115938465~115938468~118897920~118897930~120213116~120385422~120469145~120469153~121246026~121246034&sid=1792254814&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Fcontact.html&dt=Contact%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=751

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
- https://www.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6ae1v9224426056za208zd9224426056xf1&_p=1792254819036&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=1184040735.1792254819&frm=0&ngs=1&pscdl=noapi&rcb=2&sr=1280x900&uaa=x86&uab=64&uafvl=Chromium%3B154.0.8037.92%7CGoogle%2520Chrome%3B154.0.8037.92%7CNot%2520A(Brand%3B99.0.0.0&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115938466~115938468~118012007~118897920~118897930~120213116~120385423~120469145~120469153~121246026~121246034&sid=1792254819&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Fenquiry.html&dt=Enquiry%20%7C%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=751


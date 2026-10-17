# Cookie banner check

Fresh headless Chrome profile, no stored consent. Run with `node tests/cookie-banner.js`.

| Page | Width | Banner | Accept px | Reject px | Weight | Size | Same row and weight | Trackers before | Trackers after Reject | Tracker hosts after Accept |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| index.html | 390 | yes | 117×32 | 117×32 | 700 | 13.6px | yes | none | none | www.googletagmanager.com, www.google-analytics.com |
| packages.html | 390 | yes | 117×32 | 117×32 | 700 | 13.6px | yes | none | none | www.googletagmanager.com, www.google-analytics.com |
| destinations.html | 390 | yes | 117×32 | 117×32 | 700 | 13.6px | yes | none | none | www.googletagmanager.com, www.google-analytics.com |
| contact.html | 390 | yes | 117×32 | 117×32 | 700 | 13.6px | yes | none | none | www.googletagmanager.com, www.google-analytics.com |
| index.html | 1280 | yes | 123×40 | 123×40 | 700 | 13.6px | yes | none | none | www.googletagmanager.com, www.google-analytics.com |
| packages.html | 1280 | yes | 123×40 | 123×40 | 700 | 13.6px | yes | none | none | www.googletagmanager.com, www.google-analytics.com |
| destinations.html | 1280 | yes | 123×40 | 123×40 | 700 | 13.6px | yes | none | none | www.googletagmanager.com, www.google-analytics.com |
| contact.html | 1280 | yes | 123×40 | 123×40 | 700 | 13.6px | yes | none | none | www.googletagmanager.com, www.google-analytics.com |

Accept all may request Google Analytics, because that measurement id is set. Meta, TikTok and HubSpot stay off: their ids are placeholders or the HubSpot switch is off.

localStorage before a choice is empty. After Reject all the only new key is `tnt-consent`, with analytics and marketing false. After Accept all the same key has both true. No non-essential cookies were set before a choice or after Reject all. Google Analytics cookies (`_ga`, `_ga_T3VGVEDZ7V`) appear only after Accept all.

## Storage and cookies

- index.html at 390: localStorage before `none`; cookies before `none`. After Reject all, localStorage `tnt-consent`; cookies `none`. After Accept all, localStorage `tnt-consent`; cookies `_ga_T3VGVEDZ7V@127.0.0.1, _ga@127.0.0.1`.
- packages.html at 390: localStorage before `none`; cookies before `none`. After Reject all, localStorage `tnt-consent`; cookies `none`. After Accept all, localStorage `tnt-consent`; cookies `_ga_T3VGVEDZ7V@127.0.0.1, _ga@127.0.0.1`.
- destinations.html at 390: localStorage before `none`; cookies before `none`. After Reject all, localStorage `tnt-consent`; cookies `none`. After Accept all, localStorage `tnt-consent`; cookies `_ga_T3VGVEDZ7V@127.0.0.1, _ga@127.0.0.1`.
- contact.html at 390: localStorage before `none`; cookies before `none`. After Reject all, localStorage `tnt-consent`; cookies `none`. After Accept all, localStorage `tnt-consent`; cookies `_ga_T3VGVEDZ7V@127.0.0.1, _ga@127.0.0.1`.
- index.html at 1280: localStorage before `none`; cookies before `none`. After Reject all, localStorage `tnt-consent`; cookies `none`. After Accept all, localStorage `tnt-consent`; cookies `_ga_T3VGVEDZ7V@127.0.0.1, _ga@127.0.0.1`.
- packages.html at 1280: localStorage before `none`; cookies before `none`. After Reject all, localStorage `tnt-consent`; cookies `none`. After Accept all, localStorage `tnt-consent`; cookies `_ga_T3VGVEDZ7V@127.0.0.1, _ga@127.0.0.1`.
- destinations.html at 1280: localStorage before `none`; cookies before `none`. After Reject all, localStorage `tnt-consent`; cookies `none`. After Accept all, localStorage `tnt-consent`; cookies `_ga_T3VGVEDZ7V@127.0.0.1, _ga@127.0.0.1`.
- contact.html at 1280: localStorage before `none`; cookies before `none`. After Reject all, localStorage `tnt-consent`; cookies `none`. After Accept all, localStorage `tnt-consent`; cookies `_ga_T3VGVEDZ7V@127.0.0.1, _ga@127.0.0.1`.

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
- https://www.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6ae1v9224426056za208zd9224426056xf1&_p=1792246861971&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=1483145897.1792246862&frm=0&ngs=1&pscdl=noapi&rcb=12&sr=390x844&uaa=x86&uab=64&uafvl=Chromium%3B154.0.8037.92%7CGoogle%2520Chrome%3B154.0.8037.92%7CNot%2520A(Brand%3B99.0.0.0&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115616985~115938466~115938469~118897920~118897930~120213116~120385422~120469145~120469153~121246026~121246034&sid=1792246862&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Findex.html&dt=Holidays%20planned%20for%20you%2C%20on%20WhatsApp%20%7C%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=1102

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
- https://www.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6ae1v9224426056za208zd9224426056xf1&_p=1792246866353&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=1926036575.1792246867&frm=0&ngs=1&pscdl=noapi&rcb=4&sr=390x844&uaa=x86&uab=64&uafvl=Chromium%3B154.0.8037.92%7CGoogle%2520Chrome%3B154.0.8037.92%7CNot%2520A(Brand%3B99.0.0.0&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115616985~115938466~115938469~118897920~118897930~120213116~120385422~120469145~120469153~121246026~121246034&sid=1792246866&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Fpackages.html&dt=Holiday%20Packages%20%7C%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=992

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
- https://www.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6ae1v9224426056za208zd9224426056xf1&_p=1792246870704&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=1489354046.1792246871&frm=0&ngs=1&pscdl=noapi&rcb=6&sr=390x844&uaa=x86&uab=64&uafvl=Chromium%3B154.0.8037.92%7CGoogle%2520Chrome%3B154.0.8037.92%7CNot%2520A(Brand%3B99.0.0.0&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115938465~115938468~118897920~118897930~120213116~120385422~120469145~120469153~121246026~121246034&sid=1792246871&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Fdestinations.html&dt=Destinations%3A%20Spain%2C%20Turkey%20and%20Greece%20%7C%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=964

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
- https://www.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6ae1v9224426056za208zd9224426056xf1&_p=1792246875069&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=756977877.1792246875&frm=0&ngs=1&pscdl=noapi&rcb=15&sr=390x844&uaa=x86&uab=64&uafvl=Chromium%3B154.0.8037.92%7CGoogle%2520Chrome%3B154.0.8037.92%7CNot%2520A(Brand%3B99.0.0.0&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115616985~115938465~115938469~118897920~118897930~120213116~120385423~120469145~120469153~121246026~121246034&sid=1792246875&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Fcontact.html&dt=Contact%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=745

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
- https://www.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6ae1v9224426056za208zd9224426056xf1&_p=1792246879471&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=1892592865.1792246880&frm=0&ngs=1&pscdl=noapi&rcb=5&sr=1280x900&uaa=x86&uab=64&uafvl=Chromium%3B154.0.8037.92%7CGoogle%2520Chrome%3B154.0.8037.92%7CNot%2520A(Brand%3B99.0.0.0&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115616985~115938466~115938468~118897920~118897930~120213116~120385423~120469145~120469153~121246026~121246034&sid=1792246879&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Findex.html&dt=Holidays%20planned%20for%20you%2C%20on%20WhatsApp%20%7C%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=770

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
- http://127.0.0.1:8795/images/photos/adventure.avif
- http://127.0.0.1:8795/images/photos/heritage.avif
- http://127.0.0.1:8795/images/photos/romantic.avif
- http://127.0.0.1:8795/images/photos/flights.avif
- http://127.0.0.1:8795/data/deals.json
- http://127.0.0.1:8795/images/opt/favicon-32.png

After Reject all (requests started by the click):

- (none)

After Accept all (requests started by the click):

- https://www.googletagmanager.com/gtag/js?id=G-T3VGVEDZ7V
- https://www.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6af0h2v9224426056za208zd9224426056xf1&_p=1792246883854&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=615271060.1792246884&frm=0&ngs=1&pscdl=noapi&rcb=3&sr=1280x900&uaa=x86&uab=64&uafvl=Chromium%3B154.0.8037.92%7CGoogle%2520Chrome%3B154.0.8037.92%7CNot%2520A(Brand%3B99.0.0.0&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115938465~115938469~118897920~118897930~120213116~120385422~120469145~120469153~121246026~121246034&sid=1792246884&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Fpackages.html&dt=Holiday%20Packages%20%7C%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=783

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
- https://www.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6ae1v9224426056za208zd9224426056xf1&_p=1792246888236&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=1098455285.1792246889&frm=0&ngs=1&pscdl=noapi&rcb=6&sr=1280x900&uaa=x86&uab=64&uafvl=Chromium%3B154.0.8037.92%7CGoogle%2520Chrome%3B154.0.8037.92%7CNot%2520A(Brand%3B99.0.0.0&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115616986~115938466~115938469~118897920~118897930~120213116~120385423~120469145~120469153~121246026~121246034&sid=1792246888&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Fdestinations.html&dt=Destinations%3A%20Spain%2C%20Turkey%20and%20Greece%20%7C%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=878
- https://www.googletagmanager.com/td?id=G-T3VGVEDZ7V&v=3&t=t&pid=1265086240&gtm=45je6ae1v9224426056za200zd9224426056xf1&seq=1&exp=115616986~115938466~115938469~118897920~118897930~120213116~120385423~120469145~120469153~121246026~121246034&dl=127.0.0.1%2Fdestinations.html&tdp=G-T3VGVEDZ7V;224426056;0;0;0&frm=0&rtg=224426056&slo=6&hlo=1&lst=3&bt=0&ct=3&z=0

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
- https://www.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6af0h2v9224426056za208zd9224426056xf1&_p=1792246892619&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=1786595786.1792246893&frm=0&ngs=1&pscdl=noapi&rcb=14&sr=1280x900&uaa=x86&uab=64&uafvl=Chromium%3B154.0.8037.92%7CGoogle%2520Chrome%3B154.0.8037.92%7CNot%2520A(Brand%3B99.0.0.0&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115616985~115938466~115938469~118897920~118897930~120213116~120385422~120469145~120469153~121246026~121246034&sid=1792246892&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Fcontact.html&dt=Contact%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=770


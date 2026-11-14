# Cookie banner check

Fresh headless Chrome profile, no stored consent. Run with `node tests/cookie-banner.js`.

| Page | Width | Banner | Accept px | Reject px | Weight | Size | Same row and weight | Trackers before | Trackers after Reject | Tracker hosts after Accept |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| index.html | 390 | yes | 117×32 | 117×32 | 700 | 13.6px | yes | none | none | www.googletagmanager.com, region1.google-analytics.com |
| packages.html | 390 | yes | 117×32 | 117×32 | 700 | 13.6px | yes | none | none | www.googletagmanager.com, region1.google-analytics.com |
| destinations.html | 390 | yes | 117×32 | 117×32 | 700 | 13.6px | yes | none | none | www.googletagmanager.com, region1.google-analytics.com |
| contact.html | 390 | yes | 117×32 | 117×32 | 700 | 13.6px | yes | none | none | www.googletagmanager.com, region1.google-analytics.com |
| enquiry.html | 390 | yes | 117×32 | 117×32 | 700 | 13.6px | yes | none | none | www.googletagmanager.com, region1.google-analytics.com |
| privacy.html | 390 | yes | 117×32 | 117×32 | 700 | 13.6px | yes | none | none | www.googletagmanager.com, region1.google-analytics.com |
| cookies.html | 390 | yes | 117×32 | 117×32 | 700 | 13.6px | yes | none | none | www.googletagmanager.com, region1.google-analytics.com |
| complaints.html | 390 | yes | 117×32 | 117×32 | 700 | 13.6px | yes | none | none | www.googletagmanager.com, region1.google-analytics.com |
| index.html | 1280 | yes | 123×40 | 123×40 | 700 | 13.6px | yes | none | none | www.googletagmanager.com, region1.google-analytics.com |
| packages.html | 1280 | yes | 123×40 | 123×40 | 700 | 13.6px | yes | none | none | www.googletagmanager.com, region1.google-analytics.com |
| destinations.html | 1280 | yes | 123×40 | 123×40 | 700 | 13.6px | yes | none | none | www.googletagmanager.com, region1.google-analytics.com |
| contact.html | 1280 | yes | 123×40 | 123×40 | 700 | 13.6px | yes | none | none | www.googletagmanager.com, region1.google-analytics.com |
| enquiry.html | 1280 | yes | 123×40 | 123×40 | 700 | 13.6px | yes | none | none | www.googletagmanager.com, region1.google-analytics.com |
| privacy.html | 1280 | yes | 123×40 | 123×40 | 700 | 13.6px | yes | none | none | www.googletagmanager.com, region1.google-analytics.com |
| cookies.html | 1280 | yes | 123×40 | 123×40 | 700 | 13.6px | yes | none | none | www.googletagmanager.com, region1.google-analytics.com |
| complaints.html | 1280 | yes | 123×40 | 123×40 | 700 | 13.6px | yes | none | none | www.googletagmanager.com, region1.google-analytics.com |

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
- http://127.0.0.1:8795/data/reviews.json
- http://127.0.0.1:8795/data/deals.json
- http://127.0.0.1:8795/data/deals.json
- http://127.0.0.1:8795/images/photos/spain.avif
- http://127.0.0.1:8795/images/photos/turkey.avif
- http://127.0.0.1:8795/images/photos/greece.avif
- http://127.0.0.1:8795/images/opt/favicon-32.png

After Reject all (requests started by the click):

- (none)

After Accept all (requests started by the click):

- https://www.googletagmanager.com/gtag/js?id=G-T3VGVEDZ7V
- https://region1.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6as1v9224426056za208zd9224426056xf1&_p=1793342243571&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=2126524510.1793342244&frm=0&ngs=1&pscdl=noapi&rcb=16&sr=390x844&uaa=x86&uab=64&uafvl=Not%253AA-Brand%3B8.0.0.0%7CChromium%3B156.0.8078.47%7CGoogle%2520Chrome%3B156.0.8078.47&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115938466~115938468~118897920~118897930~120213116~120385422~120420415~120469145~120469153~121246026~121246034~123636746~123691370~123814944&sid=1793342243&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Findex.html&dt=Holidays%20planned%20for%20you%2C%20on%20WhatsApp%20%7C%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=817

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
- https://region1.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6at0h2v9224426056za208zd9224426056xf1&_p=1793342247986&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=1183267415.1793342248&frm=0&ngs=1&pscdl=noapi&rcb=5&sr=390x844&uaa=x86&uab=64&uafvl=Not%253AA-Brand%3B8.0.0.0%7CChromium%3B156.0.8078.47%7CGoogle%2520Chrome%3B156.0.8078.47&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115938466~115938469~118897920~118897930~120213116~120385423~120412526~120469145~120469153~121246026~121246034~123691370~123814184&sid=1793342248&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Fpackages.html&dt=Holiday%20Packages%20%7C%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=772

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
- http://127.0.0.1:8795/images/opt/favicon-32.png
- http://127.0.0.1:8795/images/photos/spain.avif
- http://127.0.0.1:8795/images/photos/turkey.avif
- http://127.0.0.1:8795/images/photos/greece.avif

After Reject all (requests started by the click):

- (none)

After Accept all (requests started by the click):

- https://www.googletagmanager.com/gtag/js?id=G-T3VGVEDZ7V
- https://region1.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6as1v9224426056za208zd9224426056xf1&_p=1793342252436&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=1322784632.1793342253&frm=0&ngs=1&pscdl=noapi&rcb=3&sr=390x844&uaa=x86&uab=64&uafvl=Not%253AA-Brand%3B8.0.0.0%7CChromium%3B156.0.8078.47%7CGoogle%2520Chrome%3B156.0.8078.47&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115616985~115938465~115938468~118897920~118897930~120213116~120385423~120469145~120469153~121246026~121246034~123620777~123691370~123692834~123814183~123814946&sid=1793342252&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Fdestinations.html&dt=Destinations%3A%20Spain%2C%20Turkey%20and%20Greece%20%7C%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=771

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
- https://region1.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6as1v9224426056za208zd9224426056xf1&_p=1793342256836&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=998969722.1793342257&frm=0&ngs=1&pscdl=noapi&rcb=15&sr=390x844&uaa=x86&uab=64&uafvl=Not%253AA-Brand%3B8.0.0.0%7CChromium%3B156.0.8078.47%7CGoogle%2520Chrome%3B156.0.8078.47&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115938466~115938468~118897920~118897930~120213116~120385423~120412526~120469145~120469153~121246026~121246034~123691370~123814945&sid=1793342257&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Fcontact.html&dt=Contact%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=774

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
- https://region1.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6as1v9224426056za208zd9224426056xf1&_p=1793342261252&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=128322353.1793342261&frm=0&ngs=1&pscdl=noapi&rcb=7&sr=390x844&uaa=x86&uab=64&uafvl=Not%253AA-Brand%3B8.0.0.0%7CChromium%3B156.0.8078.47%7CGoogle%2520Chrome%3B156.0.8078.47&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115938465~115938468~118897920~118897930~120213116~120385422~120412526~120469145~120469153~121246026~121246034~123636746~123691370&sid=1793342261&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Fenquiry.html&dt=Enquiry%20%7C%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=766

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
- https://region1.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6as1v9224426056za208zd9224426056xf1&_p=1793342265686&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=197884861.1793342266&frm=0&ngs=1&pscdl=noapi&rcb=5&sr=390x844&uaa=x86&uab=64&uafvl=Not%253AA-Brand%3B8.0.0.0%7CChromium%3B156.0.8078.47%7CGoogle%2520Chrome%3B156.0.8078.47&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115616985~115938466~115938469~118897920~118897930~120213116~120385423~120420415~120469145~120469153~121246026~121246034~123620776~123636746~123691370&sid=1793342265&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Fprivacy.html&dt=Privacy%20Notice%20%7C%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=774

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
- https://region1.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6at0h2v9224426056za208zd9224426056xf1&_p=1793342270103&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=749784188.1793342270&frm=0&ngs=1&pscdl=noapi&rcb=7&sr=390x844&uaa=x86&uab=64&uafvl=Not%253AA-Brand%3B8.0.0.0%7CChromium%3B156.0.8078.47%7CGoogle%2520Chrome%3B156.0.8078.47&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115616985~115938465~115938469~118897920~118897930~120213116~120385422~120412527~120469145~120469153~121246026~121246034~123636746~123691370&sid=1793342270&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Fcookies.html&dt=Cookie%20Notice%20%7C%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=766

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
- https://region1.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6as1v9224426056za208zd9224426056xf1&_p=1793342274534&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=1563983637.1793342275&frm=0&ngs=1&pscdl=noapi&rcb=10&sr=390x844&uaa=x86&uab=64&uafvl=Not%253AA-Brand%3B8.0.0.0%7CChromium%3B156.0.8078.47%7CGoogle%2520Chrome%3B156.0.8078.47&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115938465~115938468~118897920~118897930~120213116~120385423~120469145~120469153~121246026~121246034~123620776~123691370~123814944&sid=1793342274&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Fcomplaints.html&dt=Complaints%20%7C%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=807

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
- http://127.0.0.1:8795/data/reviews.json
- http://127.0.0.1:8795/data/deals.json
- http://127.0.0.1:8795/images/photos/spain.avif
- http://127.0.0.1:8795/images/photos/turkey.avif
- http://127.0.0.1:8795/images/photos/greece.avif
- http://127.0.0.1:8795/images/photos/adventure.avif
- http://127.0.0.1:8795/images/photos/heritage.avif
- http://127.0.0.1:8795/images/photos/romantic.avif
- http://127.0.0.1:8795/data/deals.json
- http://127.0.0.1:8795/images/opt/favicon-32.png

After Reject all (requests started by the click):

- (none)

After Accept all (requests started by the click):

- https://www.googletagmanager.com/gtag/js?id=G-T3VGVEDZ7V
- https://region1.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6as1v9224426056za208zd9224426056xf1&_p=1793342278986&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=1672679142.1793342279&frm=0&ngs=1&pscdl=noapi&rcb=13&sr=1280x900&uaa=x86&uab=64&uafvl=Not%253AA-Brand%3B8.0.0.0%7CChromium%3B156.0.8078.47%7CGoogle%2520Chrome%3B156.0.8078.47&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115616985~115938466~115938469~118897920~118897930~120213116~120385422~120420415~120469145~120469153~121246026~121246034~123620776~123691370&sid=1793342279&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Findex.html&dt=Holidays%20planned%20for%20you%2C%20on%20WhatsApp%20%7C%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=831

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
- https://region1.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6as1v9224426056za208zd9224426056xf1&_p=1793342283504&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=425342342.1793342284&frm=0&ngs=1&pscdl=noapi&rcb=8&sr=1280x900&uaa=x86&uab=64&uafvl=Not%253AA-Brand%3B8.0.0.0%7CChromium%3B156.0.8078.47%7CGoogle%2520Chrome%3B156.0.8078.47&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115616986~115938465~115938469~118897920~118897930~120213116~120385422~120420415~120469145~120469153~121246026~121246034~123691370~123814185&sid=1793342283&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Fpackages.html&dt=Holiday%20Packages%20%7C%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=768

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
- https://region1.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6as1v9224426056za208zd9224426056xf1&_p=1793342287969&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=673764854.1793342288&frm=0&ngs=1&pscdl=noapi&rcb=3&sr=1280x900&uaa=x86&uab=64&uafvl=Not%253AA-Brand%3B8.0.0.0%7CChromium%3B156.0.8078.47%7CGoogle%2520Chrome%3B156.0.8078.47&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115938465~115938468~118897920~118897930~120213116~120385422~120412528~120469145~120469153~121246026~121246034~123691370&sid=1793342288&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Fdestinations.html&dt=Destinations%3A%20Spain%2C%20Turkey%20and%20Greece%20%7C%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=792

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
- https://region1.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6as1v9224426056za208zd9224426056xf1&_p=1793342292419&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=447911444.1793342293&frm=0&ngs=1&pscdl=noapi&rcb=9&sr=1280x900&uaa=x86&uab=64&uafvl=Not%253AA-Brand%3B8.0.0.0%7CChromium%3B156.0.8078.47%7CGoogle%2520Chrome%3B156.0.8078.47&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115938466~115938469~118897920~118897930~120213116~120385422~120412527~120420416~120469145~120469153~121246026~121246034~123636746~123691370~123814944&sid=1793342292&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Fcontact.html&dt=Contact%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=777

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
- https://region1.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6as1v9224426056za208zd9224426056xf1&_p=1793342296850&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=1253748141.1793342297&frm=0&ngs=1&pscdl=noapi&rcb=14&sr=1280x900&uaa=x86&uab=64&uafvl=Not%253AA-Brand%3B8.0.0.0%7CChromium%3B156.0.8078.47%7CGoogle%2520Chrome%3B156.0.8078.47&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115938466~115938469~118897920~118897930~120213116~120385422~120469145~120469153~121246026~121246034~123691370~123814945&sid=1793342297&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Fenquiry.html&dt=Enquiry%20%7C%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=775

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
- https://region1.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6as1h1v9224426056za208zd9224426056xf1&_p=1793342301302&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=1103958509.1793342302&frm=0&ngs=1&pscdl=noapi&rcb=9&sr=1280x900&uaa=x86&uab=64&uafvl=Not%253AA-Brand%3B8.0.0.0%7CChromium%3B156.0.8078.47%7CGoogle%2520Chrome%3B156.0.8078.47&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115938466~115938468~118897920~118897930~120213116~120385422~120469145~120469153~121246026~121246034~123691370&sid=1793342301&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Fprivacy.html&dt=Privacy%20Notice%20%7C%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=806

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
- https://region1.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6at0h2v9224426056za208zd9224426056xf1&_p=1793342305750&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=1566451352.1793342306&frm=0&ngs=1&pscdl=noapi&rcb=11&sr=1280x900&uaa=x86&uab=64&uafvl=Not%253AA-Brand%3B8.0.0.0%7CChromium%3B156.0.8078.47%7CGoogle%2520Chrome%3B156.0.8078.47&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115616985~115938466~115938469~118897920~118897930~120213116~120385422~120469145~120469153~121246026~121246034~123620777~123636747~123691370~123785232~123814185&sid=1793342305&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Fcookies.html&dt=Cookie%20Notice%20%7C%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=753

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
- https://region1.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6as1v9224426056za208zd9224426056xf1&_p=1793342310204&gcd=13l3l3l3l1l1&npa=0&dma=0&cid=2133030179.1793342310&frm=0&ngs=1&pscdl=noapi&rcb=2&sr=1280x900&uaa=x86&uab=64&uafvl=Not%253AA-Brand%3B8.0.0.0%7CChromium%3B156.0.8078.47%7CGoogle%2520Chrome%3B156.0.8078.47&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=1&tag_exp=115938465~115938468~118897920~118897930~120213116~120385422~120469145~120469153~121246026~121246034~123691370&sid=1793342310&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Fcomplaints.html&dt=Complaints%20%7C%20Trip%20N%20Travel&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=787


## Withdrawal

On index.html, Accept all was followed by Manage cookies and then Reject all.

- Google Analytics cookies after Accept all: _ga_T3VGVEDZ7V expires in 400 days; _ga expires in 400 days
- Tracker requests started by the Reject click: none
- Google Analytics cookies still present after Reject all: _ga, _ga_T3VGVEDZ7V
- Tracker requests on the next page load: https://region1.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6as1v9224426056za200zd9224426056xf1&_p=1793342312234&gcd=13l3l3l3l1l1&npa=0&dma=0&_eu=AEAAAAQ&ae=a&cid=624848618.1793342312&frm=0&ngs=1&pscdl=noapi&rcb=3&sr=390x844&uaa=x86&uab=64&uafvl=Not%253AA-Brand%3B8.0.0.0%7CChromium%3B156.0.8078.47%7CGoogle%2520Chrome%3B156.0.8078.47&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=2&tag_exp=115938465~115938468~118897920~118897930~120213116~120385423~120420416~120469145~120469153~121246026~121246034~123691370&sid=1793342312&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Findex.html&dt=Holidays%20planned%20for%20you%2C%20on%20WhatsApp%20%7C%20Trip%20N%20Travel&en=scroll&epn.percent_scrolled=90&_et=866&tfd=2261
- Google Analytics cookies still present after that reload: _ga, _ga_T3VGVEDZ7V
- The site code removes those cookies: no

## Failures

- Google Analytics loaded again after Manage cookies then Reject all: https://region1.google-analytics.com/g/collect?v=2&tid=G-T3VGVEDZ7V&gtm=45je6as1v9224426056za200zd9224426056xf1&_p=1793342312234&gcd=13l3l3l3l1l1&npa=0&dma=0&_eu=AEAAAAQ&ae=a&cid=624848618.1793342312&frm=0&ngs=1&pscdl=noapi&rcb=3&sr=390x844&uaa=x86&uab=64&uafvl=Not%253AA-Brand%3B8.0.0.0%7CChromium%3B156.0.8078.47%7CGoogle%2520Chrome%3B156.0.8078.47&uam=&uamb=0&uap=Linux&uapv=&uaw=0&ul=en-us&_s=2&tag_exp=115938465~115938468~118897920~118897930~120213116~120385423~120420416~120469145~120469153~121246026~121246034~123691370&sid=1793342312&sct=1&seg=0&dl=http%3A%2F%2F127.0.0.1%2Findex.html&dt=Holidays%20planned%20for%20you%2C%20on%20WhatsApp%20%7C%20Trip%20N%20Travel&en=scroll&epn.percent_scrolled=90&_et=866&tfd=2261
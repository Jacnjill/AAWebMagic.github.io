# Image credits

Photographs on this site are downloaded files in `images/photos/`. They are not hotlinked.

Each photograph is under the [Pexels Licence](https://www.pexels.com/license/). Pexels says: “All photos and videos on Pexels are free to use.” Attribution is not required. Modification is allowed. The listed uses include a website and print marketing material, so commercial advertising use is allowed. Credits are recorded here anyway.

None of these files is AI-generated. The light grade changes white balance, contrast and saturation only. It does not add, remove or move anything in the scene, and it does not present a photograph as a different resort or place.

No photograph is used as a portrait of Raja Ali, a member of staff, or a customer.

| File | Subject | Source | Photographer | Licence |
| --- | --- | --- | --- | --- |
| `images/photos/hero.avif`, `hero.webp`, `hero-900.avif`, `hero-900.webp` | Quiet Mediterranean shore in warm evening light. Cropped to 16:9 from the upper part of the frame. | https://www.pexels.com/photo/scenic-mediterranean-beach-at-sunset-33630394/ | Nihat Küçük | Pexels Licence |
| `images/photos/spain.avif`, `spain.webp` | A rocky coast in Spain in clear daylight. No named hotel. ID 39625249. Source width 3812px. | https://www.pexels.com/photo/rocky-mediterranean-coastline-in-nerja-spain-39625249/ | Anita Dombi | Pexels Licence, commercial advertising use allowed |
| `images/photos/turkey.avif`, `turkey.webp` | Rocky shore and clear water on the Antalya coast, Turkey | https://www.pexels.com/photo/stunning-mediterranean-coast-in-antalya-34093798/ | zuleyha | Pexels Licence |
| `images/photos/greece.avif`, `greece.webp` | White houses under a blue sky in daylight. No named hotel, no flag and no people. Verified location: Thera, Greece. ID 3772274. Original width 5184px. The top 18% of the frame is cropped off so the flat sky at the top is out of frame. Graded from that file with no brightness lift. | https://www.pexels.com/photo/white-concrete-houses-3772274/ | Emily Geibel | Pexels Licence, commercial advertising use allowed |
| `images/photos/adventure.avif`, `adventure.webp` | A cliff path above the sea in clear daylight. No named hotel. Verified location: Alicante, Spain. ID 33892900. Source width 4258px. Same photograph as before, sharpened slightly and re-exported. | https://www.pexels.com/photo/scenic-coastal-cliffside-trail-with-ocean-view-33892900/ | Petra Nesti | Pexels Licence, commercial advertising use allowed |
| `images/photos/heritage.avif`, `heritage.webp` | Stone arches in warm evening light. Used for faith and heritage. The frame does not name a place. | https://www.pexels.com/photo/historical-stone-architecture-at-sunset-32711854/ | Eyüp Çelik | Pexels Licence |
| `images/photos/romantic.avif`, `romantic.webp` | A couple seen from behind at a sunset infinity pool by the sea. The woman wears a modest long-sleeved cream dress, and a side table holds flowers and two soft drinks. A small Trip N Travel logo sits at the top right. Created 15 Nov 2026 with AI image generation and approved by Raja Ali. | Generated in-house | Trip N Travel | Owned by Trip N Travel |
| `images/photos/flights.avif`, `flights.webp` | View from an aircraft window over pale blue sky. The winglet and any lettering are outside the frame. No airline name and no livery. Not a destination photograph. ID 32138447. Original width 9264px. The card is a 4000px-wide crop shifted left and down onto the wing and clouds. | https://www.pexels.com/photo/view-from-airplane-window-over-clear-blue-sky-32138447/ | Adrien Olichon | Pexels Licence, commercial advertising use allowed |
| `images/photos/coast.avif`, `coast.webp` | A boat on clear water in warm daylight. Destinations page band only. The frame does not name a place. | https://www.pexels.com/photo/1450353/ | Asad Photo Maldives | Pexels Licence |
| `images/photos/about.avif`, `about.webp` | A sharp stone arch in warm daylight. About page band only. The frame does not name a place. | https://www.pexels.com/photo/34761679/ | Engin Bolat | Pexels Licence |
| `images/photos/deals.avif`, `deals.webp` | Small boats on clear water. Top deals page band only. The frame does not name a place. | https://www.pexels.com/photo/motorboats-moored-on-azure-seawater-in-sunny-port-4701631/ | Maahid Photos | Pexels Licence |
| `images/photos/packages.avif`, `packages.webp` | A coastal town in warm evening light. Packages page band only. The frame does not name a place. | https://www.pexels.com/photo/18240226/ | Ad Thiry | Pexels Licence |
| `images/photos/contact.avif`, `contact.webp` | Buildings along a shore in warm light. Contact page band only. The frame does not name a place. | https://www.pexels.com/photo/20820394/ | Dima Cekal | Pexels Licence |

Greece was cropped and re-exported. Romantic and Flights were replaced. Each of those frames was graded in floating point from the full-size original: mild warm white balance, a gentle contrast curve, saturation at about 85% of the source, a cap on cyan sky pixels, and a haze lift only where the highlights are pale. There is no extra brightness or luminance lift. A light dither is applied before 8-bit quantisation. Greece and Romantic are AVIF CRF 28. Flights is AVIF CRF 22. Adventure stays at CRF 34. WebP quality is 82, and 64 for the adventure frame. Adventure is the same Alicante photograph. Spain, Turkey, faith and heritage, and the home heroes were not re-exported. Page bands do not reuse the card photographs:

- Destinations band: boat on clear water (`coast`)
- Holidays band: coastal town (`packages`), not the cliff-path adventure card
- About band: stone arch (`about`)
- Contact band: shore buildings (`contact`), not the Spain card
- Top deals band: small boats (`deals`)
- Romantic card: sunlit cobbled street in Spain (`romantic`)
- Greece card: white houses under a blue sky in Thera, top of the frame cropped (`greece`)
- Adventure card: cliff path in Alicante (`adventure`)
- Flights card: view from an aircraft window over pale blue sky, winglet out of frame (`flights`)

The Meet Raja photograph is not included. `founderPhoto` in `js/config.js` stays empty until Raja provides a real photo file. The About page shows a branded panel, and the photograph space on that panel stays hidden unless a real file is set or `showPlaceholderBlocks` is true. The contact page has a separate marked space for that photograph, also hidden unless `showPlaceholderBlocks` is true.

## Preview only (branch `cursor/website-refresh-plan`, 15 Nov 2026)

These files are used only by the Phase 1 preview pages (`index.html` preview and `turkey-holidays.html`). They are not on the live site. Each was downloaded from images.pexels.com on 15 Nov 2026, centre-cropped to 3:2, resized to 900×600 and saved as AVIF (quality 55) and WebP (quality 78). There is no other edit. All are under the [Pexels Licence](https://www.pexels.com/license/). Before anything goes live, a person must re-check each licence page and confirm the people photos are suitable. **Every person in these photographs is a stock model. None is a Trip N Travel customer, staff member or Raja.** No photo shows the resort, villa or hotel named on the card next to it.

| File | Subject | Source | Photographer | Licence |
| --- | --- | --- | --- | --- |
| `images/preview/family-beach.avif`, `.webp` | Two adults swinging a toddler between them on a sandy beach. Location not stated. | https://www.pexels.com/photo/parents-playing-with-their-little-child-on-the-beach-18649778/ | Goda Morgan | Pexels Licence |
| `images/preview/couple-sea.avif`, `.webp` | A couple embracing on a shore at sunset. Pexels lists the location as Baku, Azerbaijan, **not Greece**. | https://www.pexels.com/photo/hugging-couple-beside-seashore-1463563/ | Ilkin Safterov | Pexels Licence |
| `images/preview/family-shore.avif`, `.webp` | A family walking at the water's edge on a wide beach. Location not stated. | https://www.pexels.com/photo/happy-family-on-the-beach-14349632/ | Trần Long | Pexels Licence |
| `images/preview/couple-selfie.avif`, `.webp` | An older couple taking a selfie on a beach. Pexels lists the location as Portugal. | https://www.pexels.com/photo/a-couple-taking-a-selfie-in-the-beach-7232973/ | Kampus Production | Pexels Licence |
| `images/preview/tr-slides-pool.avif`, `.webp` | A large outdoor pool with colourful water slides. Location not stated, so it is not confirmed as Turkey. | https://www.pexels.com/photo/colorful-slide-beside-the-swimming-pool-13760363/ | Quang Nguyen Vinh | Pexels Licence |
| `images/preview/tr-villa-pool.avif`, `.webp` | A villa with a lit swimming pool at dusk. Location not stated. | https://www.pexels.com/photo/view-of-a-luxurious-villa-with-a-swimming-pool-in-the-evening-26859048/ | Ahmet ÇÖTÜR | Pexels Licence |
| `images/preview/tr-beach-loungers.avif`, `.webp` | Rows of white sun loungers and parasols on a beach below mountains. Location not stated. | https://www.pexels.com/photo/sunbeds-and-umbrellas-on-the-sand-9119716/ | Pavel Danilyuk | Pexels Licence |

The preview homepage hero reuses the existing `images/photos/hero*` files (Nihat Küçük, credited above). The mockup's aerial resort hero was not reproduced. That would need a separate licensed photo, and it must not show an identifiable named hotel.

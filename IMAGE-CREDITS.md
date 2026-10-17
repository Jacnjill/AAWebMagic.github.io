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
| `images/photos/greece.avif`, `greece.webp` | White houses under a blue sky in daylight. No named hotel, no flag and no people. Verified location: Thera, Greece. ID 3772274. Original width 5184px. Graded from that file with no brightness lift. | https://www.pexels.com/photo/white-concrete-houses-3772274/ | Emily Geibel | Pexels Licence, commercial advertising use allowed |
| `images/photos/adventure.avif`, `adventure.webp` | A cliff path above the sea in clear daylight. No named hotel. Verified location: Alicante, Spain. ID 33892900. Source width 4258px. Same photograph as before, sharpened slightly and re-exported. | https://www.pexels.com/photo/scenic-coastal-cliffside-trail-with-ocean-view-33892900/ | Petra Nesti | Pexels Licence, commercial advertising use allowed |
| `images/photos/heritage.avif`, `heritage.webp` | Stone arches in warm evening light. Used for faith and heritage. The frame does not name a place. | https://www.pexels.com/photo/historical-stone-architecture-at-sunset-32711854/ | Eyüp Çelik | Pexels Licence |
| `images/photos/romantic.avif`, `romantic.webp` | A quiet street in warm evening light. No people, no named hotel and no legible sign. Verified location: İstanbul, Türkiye. ID 16060965. Original width 3940px. | https://www.pexels.com/photo/narrow-cobblestone-street-in-city-16060965/ | onur güran | Pexels Licence, commercial advertising use allowed |
| `images/photos/flights.avif`, `flights.webp` | A plain aircraft wing and clouds from a cabin window. No airline name and no livery. Not a destination photograph. ID 12720523. Original width 7360px; the card is a 5200px-wide crop that leaves out the sun. | https://www.pexels.com/photo/airplane-wing-and-clouds-view-from-an-airplane-window-12720523/ | Atlantic Ambience | Pexels Licence, commercial advertising use allowed |
| `images/photos/coast.avif`, `coast.webp` | A boat on clear water in warm daylight. Destinations page band only. The frame does not name a place. | https://www.pexels.com/photo/1450353/ | Asad Photo Maldives | Pexels Licence |
| `images/photos/about.avif`, `about.webp` | A sharp stone arch in warm daylight. About page band only. The frame does not name a place. | https://www.pexels.com/photo/34761679/ | Engin Bolat | Pexels Licence |
| `images/photos/deals.avif`, `deals.webp` | Small boats on clear water. Top deals page band only. The frame does not name a place. | https://www.pexels.com/photo/motorboats-moored-on-azure-seawater-in-sunny-port-4701631/ | Maahid Photos | Pexels Licence |
| `images/photos/packages.avif`, `packages.webp` | A coastal town in warm evening light. Packages page band only. The frame does not name a place. | https://www.pexels.com/photo/18240226/ | Ad Thiry | Pexels Licence |
| `images/photos/contact.avif`, `contact.webp` | Buildings along a shore in warm light. Contact page band only. The frame does not name a place. | https://www.pexels.com/photo/20820394/ | Dima Cekal | Pexels Licence |

Greece, Romantic and Flights were replaced. Each new frame was graded in floating point from the full-size original: mild warm white balance, a gentle contrast curve, saturation at about 85% of the source, a cap on cyan sky pixels, and a haze lift only where the highlights are pale. There is no extra brightness or luminance lift. A light dither is applied before 8-bit quantisation. Export quality is higher than the previous AVIF CRF 38, so a smooth sky keeps continuous tones: Greece and Romantic at CRF 28, Flights at CRF 20, Adventure at CRF 34. WebP quality is 82, and 64 for the adventure frame. Adventure is the same Alicante photograph, sharpened slightly. Spain, Turkey, faith and heritage, and the home heroes were not re-exported. Page bands do not reuse the card photographs:

- Destinations band: boat on clear water (`coast`)
- Holidays band: coastal town (`packages`), not the cliff-path adventure card
- About band: stone arch (`about`)
- Contact band: shore buildings (`contact`), not the Spain card
- Top deals band: small boats (`deals`)
- Romantic card: quiet street in İstanbul (`romantic`)
- Greece card: white houses under a blue sky in Thera (`greece`)
- Adventure card: cliff path in Alicante (`adventure`)
- Flights card: plain aircraft wing and clouds (`flights`)

The Meet Raja photograph is not included. `founderPhoto` in `js/config.js` stays empty until Raja provides a real photo file. The About page shows a branded panel, and the photograph space on that panel stays hidden unless a real file is set or `showPlaceholderBlocks` is true. The contact page has a separate marked space for that photograph, also hidden unless `showPlaceholderBlocks` is true.

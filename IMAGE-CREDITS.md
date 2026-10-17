# Image credits

Photographs on this site are downloaded files in `images/photos/`. They are not hotlinked.

Each photograph is under the [Pexels Licence](https://www.pexels.com/license/): commercial use is allowed, and attribution is not required. Credits are recorded here anyway.

No photograph is used as a portrait of Raja Ali, a member of staff, or a customer.

| File | Subject | Source | Photographer | Licence |
| --- | --- | --- | --- | --- |
| `images/photos/hero.avif`, `hero.webp`, `hero-900.avif`, `hero-900.webp` | Quiet Mediterranean shore in warm evening light. Cropped to 16:9 from the upper part of the frame. | https://www.pexels.com/photo/scenic-mediterranean-beach-at-sunset-33630394/ | Nihat Küçük | Pexels Licence |
| `images/photos/spain.avif`, `spain.webp` | Green cliffs above the sea in Ibiza, Spain | https://www.pexels.com/photo/scenic-coastal-view-of-ibiza-spain-in-summer-29041773/ | Raymond Petrik | Pexels Licence |
| `images/photos/turkey.avif`, `turkey.webp` | Rocky shore and clear water on the Antalya coast, Turkey | https://www.pexels.com/photo/stunning-mediterranean-coast-in-antalya-34093798/ | zuleyha | Pexels Licence |
| `images/photos/greece.avif`, `greece.webp` | White buildings above the sea in Santorini, Greece. Used on the Greece card only. | https://www.pexels.com/photo/white-and-blue-concrete-building-1285625/ | Aleksandar Pasaric | Pexels Licence |
| `images/photos/adventure.avif`, `adventure.webp` | Sunlit houses along the Villajoyosa coast, Spain | https://www.pexels.com/photo/scenic-mediterranean-coastline-in-villajoyosa-33766992/ | Emilio Sánchez Hernández | Pexels Licence |
| `images/photos/heritage.avif`, `heritage.webp` | Stone arches in warm evening light. Used for faith and heritage. The frame does not name a place. | https://www.pexels.com/photo/historical-stone-architecture-at-sunset-32711854/ | Eyüp Çelik | Pexels Licence |
| `images/photos/romantic.avif`, `romantic.webp` | An empty beach at sunset. Used on the romantic card only. | https://www.pexels.com/photo/empty-sandy-beach-of-sea-at-sunset-5743438/ | Alfin Auzikri | Pexels Licence |
| `images/photos/flights.avif`, `flights.webp` | Cirrus cloud in blue-grey daylight. Cropped from the darker part of the frame. No aircraft and no sun flare. | https://www.pexels.com/photo/31054232/ | Tuğba | Pexels Licence |
| `images/photos/coast.avif`, `coast.webp` | A boat on clear water in warm daylight. Destinations page band only. The frame does not name a place. | https://www.pexels.com/photo/1450353/ | Asad Photo Maldives | Pexels Licence |
| `images/photos/about.avif`, `about.webp` | A sharp stone arch in warm daylight. About page band only. The frame does not name a place. | https://www.pexels.com/photo/34761679/ | Engin Bolat | Pexels Licence |
| `images/photos/deals.avif`, `deals.webp` | Small boats on clear water. Top deals page band only. The frame does not name a place. | https://www.pexels.com/photo/motorboats-moored-on-azure-seawater-in-sunny-port-4701631/ | Maahid Photos | Pexels Licence |
| `images/photos/packages.avif`, `packages.webp` | A coastal town in warm evening light. Packages page band only. The frame does not name a place. | https://www.pexels.com/photo/18240226/ | Ad Thiry | Pexels Licence |
| `images/photos/contact.avif`, `contact.webp` | Buildings along a shore in warm light. Contact page band only. The frame does not name a place. | https://www.pexels.com/photo/20820394/ | Dima Cekal | Pexels Licence |

Every photograph above goes through the same grade and the same export (AVIF CRF 38, WebP quality 52). The grade is a mild warm white balance, a gentle contrast curve, saturation at about 85% of the source, a cap on cyan sky pixels, and a haze lift where the highlights are pale. Exposure is then matched so the average luminance of each frame sits together, and heroes are not left darker than the cards. Spain is cropped toward the cliffs. The flights frame uses the darker blue-grey part of the same cirrus photograph. Page bands do not reuse the card photographs:

- Destinations band: boat on clear water (`coast`)
- Holidays band: coastal town (`packages`), not the Villajoyosa adventure card
- About band: stone arch (`about`)
- Contact band: shore buildings (`contact`), not the Ibiza Spain card
- Top deals band: small boats (`deals`)
- Romantic card: empty beach (`romantic`)
- Greece card: Santorini buildings (`greece`)
- Adventure card: Villajoyosa coast (`adventure`)

The Meet Raja photograph is not included. `founderPhoto` in `js/config.js` stays empty until Raja provides a real photo file. The About page shows a branded panel, and the photograph space on that panel stays hidden unless a real file is set or `showPlaceholderBlocks` is true. The contact page has a separate marked space for that photograph, also hidden unless `showPlaceholderBlocks` is true.

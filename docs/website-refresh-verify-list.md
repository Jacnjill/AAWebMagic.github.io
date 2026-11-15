# Website refresh, Phase 1 preview: TO VERIFY list

Branch: `cursor/website-refresh-plan` (local only, not pushed). Written 15 Nov 2026.
Pages: `index.html` (preview homepage) and `turkey-holidays.html` (new Turkey landing page).

**These pages are a preview and must not be merged.** Every item below carries a visible yellow **TO VERIFY** badge on the page. The badge count is 23 on `index.html` and 46 on `turkey-holidays.html`; one fact can have more than one badge. Before anything goes live, a person must do one of three things with each item: verify it with evidence, change it to approved wording, or remove it. The column “Live-site rule” records the FACTS.md / Gate 5 rule that applies, where one exists.

Legend for “Likely outcome”: **Remove** = cannot be made true for TNT as things stand. **Evidence** = can stay only with dated proof. **Reword** = approved wording exists.

## A. Homepage (`index.html`)

| # | Location | Exact visible text | Why it needs a human check | Live-site rule | Likely outcome |
| --- | --- | --- | --- | --- | --- |
| H1 | Header, under site name | “Holidays, made personal.” | New tagline from the mockup. Not an approved strapline. The live site has no tagline. | Keep existing logo/brand | Raja to approve or drop |
| H2 | Hero sub-line | “Spain, Turkey, Greece & more” | “& more” goes beyond the three in-scope destinations. | Spain, Turkey, Greece only | Reword: “Spain, Turkey and Greece” |
| H3 | Hero sub-line | “from £299pp” | Invented price with no date checked, nights, board or airport. | Prices only from dated supplier quotes, with nights, board, airport and date | Remove, or replace with a real dated quote; fallback “Ask for today’s price on WhatsApp” |
| H4 | Hero floating card | “Trusted by happy travellers across the UK” | Unproven claim. TNT is a new company (2025), and `reviews.json` is empty. | No invented reviews or customer claims | Remove until real reviews exist |
| H5 | Hero floating card | ★★★★★ (five stars) | Implies a rating that does not exist. | No invented ratings | Remove |
| H6 | Trust bar, box 1 | Dashed box “ATOL – to verify” (stands in for the mockup’s ATOL roundel) | The mockup used an ATOL logo. TNT does not hold an ATOL and may not use the logo. | No ATOL logo (CAA agency terms) | Remove the logo slot permanently |
| H7 | Trust bar, box 1 | “ATOL Protected” | Implies TNT holds an ATOL. It does not; protection is the tour operator’s. | No “ATOL Protected” as if TNT holds it | Reword: “Flight-inclusive holidays are ATOL protected by the tour operator.” plus a link to atol.html |
| H8 | Trust bar, box 1 | “Your holiday is 100% protected.” | Absolute claim. Banned wording. | No “100% protected” / “fully protected” | Remove |
| H9 | Trust bar, box 2 | “Trustpilot ★★★★☆ 4.2/5” | There is no Trustpilot profile or widget on the site. The score is from the mockup. | No invented reviews | Remove until a real Trustpilot profile exists; then use the official widget only |
| H10 | Trust bar, box 2 | “From 1,200+ reviews” | Invented count. The brief said about 4.2 from a few reviews. | No invented review counts | Remove |
| H11 | Trust bar, box 3 | “PTS Protected” | Not approved PTS wording. | “PTS Protected” is not the approved phrase | Reword: “Member of Protected Trust Services, membership 6393.” Payments-held wording only once PTS confirms |
| H12 | Trust bar, box 3 | “Peace of mind, every booking.” | Implies protection on every booking. | No absolute protection claims | Remove or soften after PTS check |
| H13 | Section eyebrow | “Real holidays, real memories” | Implies the photos are real TNT customers. They are stock models. | No people presented as customers | Reword, e.g. “Holiday ideas” |
| H14 | Section heading | “Handpicked holidays for UK families & couples.” | “Handpicked” implies curated, inspected product, which does not exist yet. | Avoid unprovable claims | Reword or keep only if Raja confirms the process |
| H15 | Card 1, photo note | “Stock photo (Pexels): models, not our customers. Not taken in Turkey.” | People in a stock photo under a “Families love Turkey” heading. Location not stated. | People photos need a licence and must not be implied to be customers | Keep the note, or use a scenery-only Turkey photo |
| H16 | Card 1, heading | “Families love Turkey” | Implies customer evidence. | Avoid unprovable claims | Raja to approve as a headline, or reword |
| H17 | Card 1, price | “From £349pp” | Invented price. | Dated supplier quotes only | Remove, or use the deals.json flow |
| H18 | Card 2, photo note | “Stock photo (Pexels): models, not our customers. Taken in Baku, not Greece.” | The photo is not Greece. | Do not present a photo as a different place | Replace with a Greece scenery photo before live |
| H19 | Card 2, heading | “Couples love Greece” | Implies customer evidence. | Avoid unprovable claims | Approve or reword |
| H20 | Card 2, price | “From £399pp” | Invented price. | Dated supplier quotes only | Remove |
| H21 | Card 3, photo note | “Stock photo (Pexels): models, not our customers.” | People photo. | As H15 | Keep the note or swap |
| H22 | Card 3, price | “From £299pp” | Invented price. | Dated supplier quotes only | Remove |
| H23 | Card 4, photo note | “Stock photo (Pexels): models, not our customers. Taken in Portugal.” | People photo, and Portugal is out of scope. | Spain/Turkey/Greece only | Swap photo |
| H24 | Card 4, price | “From £319pp” | Invented price. | Dated supplier quotes only | Remove |

Not tagged, because it is already confirmed or already live:

- WhatsApp number **+44 20 4538 5838**, read from `TNT.whatsappDisplay` in `js/config.js`. It is the live number.
- “Office hours: 09:00–20:00 UK time, 7 days”. The CEO confirmed these hours on 15 Nov 2026. Note that `showContactHours` is still `false` in config.
- The legal footer, read from `TNT.legalFooterLine`.
- “How it works” copy, which is unchanged from the live site.

## B. Turkey page (`turkey-holidays.html`)

| # | Location | Exact visible text | Why it needs a human check | Live-site rule | Likely outcome |
| --- | --- | --- | --- | --- | --- |
| T1 | Header, under site name | “Holidays, made personal.” | Same as H1. The Turkey mockup used a **different logo and “Holidays made simple”**; both were deliberately **not** used. | Keep existing logo | Approve or drop |
| T2 | Header, right | “0330 133 0330” | Not a TNT number. The live number is +44 20 4538 5838. Calls would go to an unknown party. | Never invent phone numbers | **Remove** |
| T3 | Header, right | “Mon–Fri 8am–8pm • Sat–Sun 9am–6pm” | Conflicts with the confirmed hours (09:00–20:00, 7 days). | Use confirmed hours | Reword to the confirmed hours |
| T4 | Title band, “Why Turkey?” | “Stunning beaches, rich culture, warm hospitality and amazing value for families.” | “Amazing value” is a price claim with no evidence. | Avoid unprovable claims | Reword, dropping “amazing value” |
| T5 | Filters, Dates | “May 2025” / “May 2025” and the note “Mockup dates (May 2025) are in the past…” | Stale dates from the mockup. The date fields do not filter. | No stale dates | Replace with a month picker or remove |
| T6 | Filters, Family friendly | “Kids clubs, family rooms & child-friendly facilities” | A facility claim applied to every result. | Supplier facts only | Keep as a filter label only if card data is real |
| T7 | Filters, Muslim-friendly | “Halal Food (Available on request)” | “Available on request” is a service promise. | Supplier facts only | Raja to confirm wording; the live muslim-friendly page says “ask us to check” |
| T8 | Filters, Muslim-friendly | “Alcohol-Free (Alcohol-free hotels)” | Implies alcohol-free hotels are in stock. | Supplier facts only | Confirm with supplier list |
| T9 | Results heading | “Handpicked resorts” | Implies inspected product. | Avoid unprovable claims | Reword |
| T10 | Results heading | “Great for families” | Generic claim across all results. | – | Reword or keep per card |
| T11 | Results heading | “Flights & transfers included” | Not true for every quote (flight-only, villa-only). | Inclusions only from quotes | Remove from the heading; state per card from a quote |
| T12 | Card 1, roundel | “Family favourite” | Implies popularity data. | No invented counts or claims | Remove |
| T13 | Card 1, photo note | “Stock photo (Pexels). Not this resort, location unknown.” | The photo is not the resort named. | Do not present a photo as a different resort | Use a real supplier image with rights, or a scenery photo |
| T14 | Card 1, heading | “Antalya All-Inclusive Family Resort” | Generic invented product. No supplier quote behind it. | Prices and products from real quotes only | Replace with a real quoted hotel, or remove |
| T15 | Card 1, stars | ★★★★★ | Invented star rating (hotel grade or review score, unclear). | No invented ratings | Remove, or use the supplier’s official grade |
| T16 | Card 1, copy | “Water slides” | Facility claim. | Supplier facts | From the supplier sheet |
| T17 | Card 1, copy | “kids club (4–12 yrs)” | Specific age range, invented. | Supplier facts | From the supplier sheet |
| T18 | Card 1, copy | “spacious family rooms” | Facility claim. | Supplier facts | From the supplier sheet |
| T19 | Card 1, price | “£549pp” | Invented price. No date checked, nights or board shown. | “From £X pp” plus nights, board, airport and date checked | Remove, or real quote |
| T20 | Card 1, price | “including flights from Manchester & transfers” | Inclusion claim without a quote. | As T19 | Real quote |
| T21 | Card 2, roundel | “Private pool villa” | Product claim. | Supplier facts | Real quote |
| T22 | Card 2, photo note | “Stock photo (Pexels). Not this villa, location not stated.” | As T13. | – | As T13 |
| T23 | Card 2, heading | “Private Pool Villa Escape” | Invented product. | As T14 | As T14 |
| T24 | Card 2, stars | ★★★★★ | Invented rating. | As T15 | Remove |
| T25 | Card 2, copy | “private pool” | Facility claim. | Supplier facts | Supplier sheet |
| T26 | Card 2, copy | “panoramic sea views” | Facility claim. | Supplier facts | Supplier sheet |
| T27 | Card 2, price | “£829pp” | Invented price. | As T19 | Remove, or real quote |
| T28 | Card 2, price | “including flights from Manchester & transfers” | As T20. | – | Real quote |
| T29 | Card 3, photo note | “Stock photo (Pexels). Not this hotel, location not stated.” | As T13. | – | As T13 |
| T30 | Card 3, heading | “Beachfront Hotel & Spa” | Invented product. | As T14 | As T14 |
| T31 | Card 3, stars | ★★★★★ | Invented rating. | As T15 | Remove |
| T32 | Card 3, copy | “Direct beach access” | Facility claim. | Supplier facts | Supplier sheet |
| T33 | Card 3, copy | “relaxing spa” | Facility claim. | Supplier facts | Supplier sheet |
| T34 | Card 3, price | “£629pp” | Invented price. | As T19 | Remove, or real quote |
| T35 | Card 3, price | “including flights from Manchester & transfers” | As T20. | – | Real quote |
| T36 | Testimonial | “Musa made our family holiday perfect. Everything was seamless from booking to return – we couldn't recommend them enough!” | Invented testimonial. “Musa” is not a known member of staff. | No invented testimonials | **Remove** unless a real, consented review exists (`reviews.json` with `consentGiven: true`) |
| T37 | Testimonial | ★★★★★ | Invented rating. | No invented ratings | Remove |
| T38 | Testimonial | “– Amina, Birmingham” | Invented reviewer. | No invented testimonials | **Remove** |
| T39 | Below results | “Board, airport and family / halal / alcohol-free values behind the filters are invented for this preview…” | The filter data (`data-board`, `data-airports`, `data-family`, `data-halal`, `data-alcoholfree`, `data-price`) is demo data. | – | Replace with curated real cards, 3–6 of them |
| T40 | Trust strip | Dashed box “ATOL – to verify” | As H6. The mockup used an ABTA/ATOL badge icon. | No ATOL logo | Remove |
| T41 | Trust strip | “ABTA & ATOL protected” | TNT holds **neither** ABTA nor ATOL. | No “ABTA & ATOL Protected” | **Remove**; use the tour-operator ATOL line plus the atol.html link |
| T42 | Trust strip | “Your holiday is fully protected” | Banned absolute claim. | No “fully protected” | **Remove** |
| T43 | Trust strip | “Real people, real experience” | The AI assistant may reply first (see “How it works”), so this could mislead. | AI disclosure rules | Reword, e.g. “Our team can take over at any time” |
| T44 | Trust strip | “Price promise” | Unprovable. | No “price promise / we beat any quote” | **Remove** |
| T45 | Trust strip | “We beat any like-for-like quote” | Unprovable. | As T44 | **Remove** |
| T46 | Trust strip | “24/7 support” | Hours are 09:00–20:00. | No “24/7 support” | **Remove**; state confirmed hours |
| T47 | Trust strip | “We're here when you need us.” | Implies round-the-clock support. | As T46 | Reword with hours |

Not tagged on the Turkey page:

- The live WhatsApp number from config, shown in the header pill, under the hero CTA and in the footer.
- Confirmed office hours in the footer.
- Generic amenity chips (Water Park, Kids Club…). They repeat the tagged copy above.
- The legal footer.

The Turkey mockup’s “Speak to our Turkey experts” button had a phone icon. In the preview it opens WhatsApp on the live number instead of calling 0330 133 0330.

## C. Behaviour that also needs a human check (not visible claims)

- **UTM**: in-page links carry `utm_source=website&utm_campaign=phase1_preview&utm_content=<slot>`. WhatsApp prefill appends `Ref: source/campaign/content` (`js/preview-phase1.js`). `utm_content` is stored in `sessionStorage` key `tnt-utm-content`; `TNTSite.utm()` itself still stores only source and campaign. Agree the real campaign names before live.
- **Tracking**: every WhatsApp CTA has `data-wa` plus a `data-location`, so `whatsapp_click` still fires through `js/site.js`. Locations: header-digits, hero, card-1…3, trust-strip, no-results, final-cta, footer, mobile-bar, floating. This still needs analytics consent. There is no Meta event, and no Meta pixel ID was added.
- **Filters** are client-side over 3 preview cards. With every box unticked, all cards show. The mockup had “All Inclusive” ticked by default; the preview leaves it unticked so all three cards are visible on load.
- **SEO**: both preview pages carry `<meta name="robots" content="noindex, nofollow">`. Remove this only at go-live, once the content is real. The old live homepage is in git history (`main`, commit 416e8f5).
- The **homepage hero photo** is the existing live hero, not the mockup’s aerial resort.

## D. Photo credits (preview-only files in `images/preview/`)

All were downloaded 15 Nov 2026 from images.pexels.com and centre-cropped to 900×600 AVIF and WebP. All are Pexels Licence. People are stock models, not TNT customers, staff or Raja. No photo shows the hotel named on its card.

| File | Used on | Subject | Source URL | Photographer | Licence |
| --- | --- | --- | --- | --- | --- |
| `images/preview/family-beach.*` | Home, card 1 | Two adults swinging a toddler on a beach | https://www.pexels.com/photo/parents-playing-with-their-little-child-on-the-beach-18649778/ | Goda Morgan | Pexels Licence |
| `images/preview/couple-sea.*` | Home, card 2 | Couple embracing on a shore at sunset (Baku, not Greece) | https://www.pexels.com/photo/hugging-couple-beside-seashore-1463563/ | Ilkin Safterov | Pexels Licence |
| `images/preview/family-shore.*` | Home, card 3 | Family walking at the water’s edge | https://www.pexels.com/photo/happy-family-on-the-beach-14349632/ | Trần Long | Pexels Licence |
| `images/preview/couple-selfie.*` | Home, card 4 | Older couple taking a selfie on a beach (Portugal) | https://www.pexels.com/photo/a-couple-taking-a-selfie-in-the-beach-7232973/ | Kampus Production | Pexels Licence |
| `images/preview/tr-slides-pool.*` | Turkey, card 1 | Pool with colourful water slides, location not stated | https://www.pexels.com/photo/colorful-slide-beside-the-swimming-pool-13760363/ | Quang Nguyen Vinh | Pexels Licence |
| `images/preview/tr-villa-pool.*` | Turkey, card 2 | Villa with a lit pool at dusk, location not stated | https://www.pexels.com/photo/view-of-a-luxurious-villa-with-a-swimming-pool-in-the-evening-26859048/ | Ahmet ÇÖTÜR | Pexels Licence |
| `images/preview/tr-beach-loungers.*` | Turkey, card 3 | White sun loungers below mountains, location not stated | https://www.pexels.com/photo/sunbeds-and-umbrellas-on-the-sand-9119716/ | Pavel Danilyuk | Pexels Licence |
| `images/photos/hero*` (existing) | Home hero | Quiet Mediterranean shore | https://www.pexels.com/photo/scenic-mediterranean-beach-at-sunset-33630394/ | Nihat Küçük | Pexels Licence |

Photographer names and locations were read from each Pexels photo page on 15 Nov 2026. A person should re-open each page before go-live to confirm the licence and that the photo has not been withdrawn. `IMAGE-CREDITS.md` has a matching “Preview only” section.

## Pass 2 attribution clarification

The preview helper now always adds a `Ref: source/campaign/content` (direct visits default to website/phase1_preview and the CTA slot), followed by `Website source: website_whatsapp_click`. This is readable prefill context, not a write to the server-controlled `tnt_lead_source` property and not confirmation of a lead. Existing inbound campaign references are preserved by the helper; internal preview links still use demo campaign names and need a live attribution review. The domain tripntravel.co.uk is explicit beside each hero WhatsApp number. No unverified price, claim or badge was approved by these edits.

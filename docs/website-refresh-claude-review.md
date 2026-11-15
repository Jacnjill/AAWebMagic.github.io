# Mockup review: Trip N Travel website refresh (Claude, pass 1)

15 Nov 2026. Reviewed against `briefs/FACTS.md` and the Gate 5 rules. Each verdict is about the **live** direction. The Phase 1 preview keeps the mockup content under TO VERIFY badges (see `repo/docs/website-refresh-verify-list.md`). The two exceptions: no ATOL logo, and £ only.

Verdict key: **Keep** = adopt as is. **Change** = adopt the layout, but fix the listed items before live. **Drop** = do not pursue as a live direction for now.

---

## 01 Homepage (Phase 1): **Change**

**Keep:**
- The headline. It already matches the live site.
- The dark header with the existing logo.
- One big WhatsApp CTA.
- The three-part trust bar layout.
- Four photo cards.
- The intro line “we plan it all and send it straight to your WhatsApp”.

**Compliance issues (each must be fixed before live):**
1. **ATOL roundel/logo plus “ATOL Protected / Your holiday is 100% protected.”** TNT does not hold an ATOL, and the logo is not allowed under CAA agency terms. Use “Flight-inclusive holidays are ATOL protected by the tour operator.” plus a link to atol.html, with no logo and no number. The config already has this wording (`atolWording`, off).
2. **“Trustpilot 4.2/5 from 1,200+ reviews”** is invented. There is no Trustpilot profile, and `reviews.json` is empty. Drop it until a real profile exists, then use the official widget only. Never show a static count.
3. **“PTS Protected / Peace of mind, every booking”** is not the approved phrase. Use “Member of Protected Trust Services, membership 6393.” Use payments-held wording only after PTS confirms.
4. **“Trusted by happy travellers across the UK” plus five stars** is unproven for a 2025 company. Drop it.
5. **From-prices £299 / £349 / £399 / £319 pp** have no date, nights, board or airport. Drop them, or feed them from `data/deals.json` (the 7-day freshness rule already exists). Fallback: “Ask for today’s price on WhatsApp”.
6. **People photos** (“Real holidays, real memories”) imply real customers. Live use needs licensed stock with a clear “models” position, and “Real holidays, real memories” must be reworded. The preview uses Pexels models and labels each one.
7. **The WhatsApp number is not shown as digits** in the mockup hero. Raja’s rule needs the number bright and in focus. The preview adds it in the header and under the CTA.
8. **“Spain, Turkey, Greece & more”**: “& more” breaks the three-destination scope.

**Branding:** the mockup’s palm-and-sun logo and the “Holidays, made personal.” tagline differ from the live logo. The preview keeps the existing logo files. The tagline is tagged for Raja to decide.

## 02 Turkey destination (Phase 1): **Change** (layout yes, nearly all content no)

**Keep:**
- The title band.
- The left filter rail: board, airport, family, Muslim-friendly options. These are useful for TNT’s audience.
- Three to six cards with an image badge, a location line, amenity chips and a from-price box.
- The bottom CTA strip.

**Branding inconsistency:** the mockup uses a **different logo (globe and plane) and the tagline “Holidays made simple”**, with royal blue and gold styling. Neither was used on the preview, which uses the existing logo and the ink/teal tokens.

**Compliance issues:**
1. **Phone 0330 133 0330** is not TNT’s number. Live is +44 20 4538 5838. **Remove.** Its hours (Mon–Fri 8–8, Sat–Sun 9–6) also conflict with the confirmed 09:00–20:00, 7 days.
2. **“ABTA & ATOL PROTECTED / Your holiday is fully protected”**: TNT holds neither. **Remove.**
3. **“PRICE PROMISE – We beat any like-for-like quote”**: unprovable, and banned. **Remove.**
4. **“24/7 SUPPORT”**: false. **Remove**, and show the confirmed hours.
5. **“Expert advice – real people, real experience”**: the AI assistant may reply first, so reword.
6. **Testimonial “Musa… – Amina, Birmingham” plus five stars**: invented. **Remove.**
7. **Prices £549 / £829 / £629 pp “including flights from Manchester & transfers”**: invented, and missing nights, board and date checked.
8. **Five-star ratings on every card**: invented.
9. **Generic invented resorts** (“Antalya All-Inclusive Family Resort”, “Private Pool Villa Escape”, “Beachfront Hotel & Spa”): use real quoted hotels, or label them as example holiday types without prices.
10. **Dates “May 2025”** are stale.
11. **“Halal food (available on request)” and “alcohol-free hotels”** need supplier evidence. Mirror the live muslim-friendly page (“ask us to check”).
12. **“Family favourite” badge and “amazing value”** are unprovable.
13. **The “Speak to our Turkey experts” phone CTA** should be WhatsApp on the live number. The preview does this.

## 03 Romantic escapes (Phase 2+, review only): **Change**, later

**Keep:**
- The warm sand/rose palette shift. It fits “warmer for romantic”, with the core tokens kept.
- Three destination cards for Spain, Turkey and Greece.
- The mood picker.

**Issues:**
1. **Rupee prices** (₹1,49,000 etc.). Use £, and only from dated quotes.
2. **American English**: “vacation”, “customize”. Use British English.
3. **A different logo again** (heart and plane, “Romantic Escapes” lock-up). Keep the existing logo.
4. **“Typically replies instantly”** cannot be promised. The live AI-disclosure rules apply.
5. **The embedded chat mock** shows a Santorini package with a rupee price and per-package content. This is not how the WhatsApp flow works today.
6. **Invented package prices and inclusions**, such as “Private Yacht Sunset Sail”.
7. **The couple photo** needs a licence and a models position. The live romantic image is in-house AI and was approved by Raja; keep consistency.

## 04 Mobile WhatsApp flow (Phase 2, review only): **Change** (concept yes, this render no)

**Keep:**
- The idea of the first WhatsApp reply carrying three short options.
- A “View full website” link.

**Issues:**
1. **Named real hotels** (Liberty Hotels Lykia, Club Med Palmiye, Rixos Premium Tekirova) with **review scores and counts** (4.7 / 2.3k etc.) and prices. These are invented and are third-party trade marks. Use only real quoted options.
2. **Per-option “Book deposit now (£150pp)” buttons** are not a native Cloud API layout. Reply buttons are capped at 3. Carousels need a catalogue. `whatsapp-send.js` sends text and template only. PTS links are made by a person, and `pts_link_create_enabled` is off. **Do not auto-generate deposit buttons.**
3. **“Secure booking & price match guarantee”, “Best Price Guarantee”, “Trusted by 50k+ Happy Travellers”, “ATOL Protected & Secure”, “24/7 Travel Support”, “Flexible Payments”, “No Hidden Fees”** are all banned or unprovable. “Flexible Payments” is also blocked until `instalmentTermsConfirmed`.
4. **Different logo** (plane roundel) and the tagline “Dream it. Live it. We’ll plan it.”
5. **US date style** (“Aug 12–19”). Use “12–19 Aug”.

## 05 Inspiration hub (Phase 3, review only): **Drop for now**; revisit after Phases 1–2

**Reason:** most of the content is out of scope or non-compliant, and it does not get a paying customer sooner (Raja’s 5-step rule).

**Issues:**
1. **Bali, Portugal and Thailand** are out of scope. So is Tenerife (Spain, but the card is a branded water park).
2. **“This Week’s Getaways” with May/Jun 2026 dates and “Limited time deals”**: stale and pressure wording.
3. **Brand names**: “TUI Blue El Dorado”, “Siam Park” and “Aqua Paradise”. Suppliers belong on atol.html only, unless approved.
4. **“ABTA & ATOL Protected”** and **“Price Promise – We match any like-for-like deal”**: remove.
5. **Testimonial “Sarah, Manchester”** with a face photo: invented. Remove.
6. **“Book Now” CTA, user account and favourites icons**: there is no booking engine or accounts. This conflicts with the WhatsApp-first flow.
7. **A different logo** (palm, “UK Travel Agent”).

**Possibly reusable later:** the “Faith & Heritage” collection tile (it matches the live muslim-friendly page), the “Explore by map” idea for Spain, Turkey and Greece, and real airport guides.

---

## Cross-cutting notes

- **Five mockups, five different logos and taglines.** The live site has one logo (`images/logo.png`). All preview work keeps it.
- **No mockup shows the legal company footer.** It must stay on every page. The preview keeps it.
- **Every mockup leans on trust claims TNT cannot make yet** (ATOL, ABTA, Trustpilot, price promise, 24/7). The honest live substitute already exists in config: `atolWording`, `ptsLine` and atol.html. Turn on `showAtolWording` and `showPtsLine` once PTS confirms.
- **Prices**: the `deals.json` pipeline and `isDealShowable` (real price, no placeholder, checked within 7 days) already enforce the rule. Mockup prices should flow through it, not be hard-coded.
- **Speed**: the live mobile Lighthouse score is 100 (LCP 1.5 s). The preview adds about 0.5 MB of AVIF/WebP images, lazy-loaded below the fold on the homepage. Re-run Lighthouse on the deploy preview.

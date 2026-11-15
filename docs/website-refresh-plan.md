# Trip N Travel website refresh: technical assessment and plan

15 November 2026. Pass 2, after Claude. British English. Evidence: `briefs/FACTS.md`, Claude's review, the preview source and `logs/lighthouse-summary.json` in the local review workspace. This document distinguishes the current live site from the unapproved preview.

## 1. Purpose and status

**PREVIEW ONLY — DO NOT MERGE.** Local branch `cursor/website-refresh-plan` is not pushed. Clear every item in [the verification list](website-refresh-verify-list.md) with evidence, approved rewording or removal before proposing release. Retain preview banners and `noindex, nofollow` during review. Removing those markers is a final release step after approval, not a way to clear the list. Merging to `main` triggers the production deployment; there is no pre-prod branch.

Mockups are layout and look references only. Their prices, text, logos, ratings, testimonials and protection claims are not approved facts. Yellow TO VERIFY badges permit review of the local composition, not publication of those claims. There is no ATOL logo or lookalike in the preview; prices use £ only. The existing logo, colours, legal footer and cookie scripts remain. No SQL, CMS, sales-ai changes, infrastructure changes, publishing or spending form part of this pass.

The commercial priority is first WhatsApp to every lead, Turkey enquiries, then follow-up to booking. Apply Raja's five-step rule to every item: does it get a paying customer sooner? Delete unnecessary work, simplify, make it faster, automate last.

## 2. Current-site audit

### Repository, hosting and construction

The public website is `Jacnjill/AAWebMagic.github.io`, hosted on Netlify **tnt-site-preview**, deploying from **main** with no build command and the static site root as publish directory. The remote has only `main`: no pre-prod, staging or develop branch. The separate sales/admin application is `Jacnjill/tripntravel-sales-ai`, Netlify **tntsalesai**, at `admin.tripntravel.co.uk`. Website forms POST to its `website-lead` function; do not mix the repositories or commits.

The site uses static HTML, CSS and vanilla JavaScript, with no framework, bundler, package.json or CMS. `css/tokens.css` defines ink #0F1B2D, off-white #FAF7F2, teal #0E5A57, gold #F2C230 for small details and WhatsApp green #128C7E. Fraunces and Source Sans 3 are self-hosted. Shared styling is in `css/site.css` and legacy `style.css`. New pages must read company and contact details from `js/config.js` (`TNT`), including WhatsApp `442045385838`, displayed as **+44 20 4538 5838**. Config's email is still a placeholder; the legal footer uses info@tripntravel.co.uk.

The live site already has a photographic Mediterranean hero, destination/type photo cards, the WhatsApp headline, header/hero/footer/mobile/floating CTAs, enquiry forms, cookie controls and legal pages. It is not a text-only site. Gaps are a dedicated Turkey landing page, visible fresh prices, verified Trustpilot display, visible approved trust wording and richer lifestyle photography. No live inventory filters exist.

`data/deals.json` contains a placeholder only. `js/logic.js` → `isDealShowable` requires a real positive price, no placeholder text and a `priceCheckedDate` within `priceMaxAgeDays` (7). Thus no featured deal is currently showable. `data/reviews.json` is empty and no Trustpilot widget is installed. Both `showAtolWording` and `showPtsLine` are false. Contact hours are in config but `showContactHours` is false; the CEO has now confirmed **09:00–20:00 UK, seven days**, for this plan and preview.

TNT is an agent and holds neither ATOL nor ABTA. `atol.html` lists the tour operator holders: easyJet Holidays Ltd 11694, TUI UK Ltd 2524 and Jet2holidays Ltd 9618. General marketing must not imply TNT holds these protections or use the ATOL logo. Supplier names outside that page need approval.

### Tracking and attribution today

- GA4 `G-T3VGVEDZ7V` loads only after analytics consent through `js/consent.js`. Accept and Reject have equal prominence.
- Meta pixel code exists, including PageView and optional form `Lead`, but its ID is a placeholder, so it does not run. TikTok is also a placeholder. **No Meta Conversions API** exists in the website or sales-ai functions.
- `js/site.js` sends `whatsapp_click` with page and button location through `TNTConsent.event`, only after analytics consent. There is no WhatsApp Meta event. A click is not proof that a message was sent or a lead created.
- On successful form POST, `TNTConsent.lead` sends GA4 `generate_lead` after analytics consent and optional `fbq Lead` after marketing consent if configured. On POST failure, the form opens WhatsApp and still records a lead event with method `whatsapp`; this is not a confirmed CRM creation.
- `website-lead` sets `tnt_lead_source=website_form` server-side on creation, and on update only if blank, preserving values such as `meta_lead_ad` and `whatsapp_inbound`. The client cannot choose it. A WhatsApp-only click does not call this endpoint, create a HubSpot lead or set that property.
- The live `TNTSite.utm()` stores **utm_source and utm_campaign only** in `sessionStorage` (`tnt-utm`); enquiry WhatsApp prefill includes their reference. Live hero/header links do not append UTM query parameters to wa.me. The preview additionally preserves `utm_content` and adds readable campaign and website-source text to WhatsApp prefills. That text is attribution context, not a CRM property write.

### Mobile speed baseline

Local Lighthouse 13.x against https://tripntravel.co.uk, **15 November 2026, 12:59 UK**, mobile, simulated throttling (150 ms RTT, approximately 1.6 Mbps, CPU 4×), no runtime error:

| Measure | Result |
| --- | --- |
| Performance / Accessibility / SEO / Best Practices | 100 / 100 / 100 / 100 |
| LCP | 1.5 s |
| CLS | 0 |
| TBT | 0 ms |
| FCP / Speed Index / TTI | 0.9 s / 1.7 s / 1.5 s |
| Document response | 350 ms |

Sources: `logs/lighthouse-summary.json` and `logs/lighthouse-mobile.report.html` in the review workspace. PageSpeed Insights API returned **HTTP 429**, quota exceeded, and was not used as a score. This is a single laboratory live-homepage run, not a preview result or field Core Web Vitals pass; INP was not measured.

## 3. Per-mockup verdicts

Keep/change/drop reflects Claude's live-direction review. All unverified content must be replaced or removed before release, even when its layout is retained.

| Mockup | Verdict and reusable layout | Required changes / compliance flags |
| --- | --- | --- |
| 01 Homepage — Phase 1 | **Change.** Keep the existing headline, dark header, single dominant WhatsApp CTA, three-part trust layout, four photo cards and WhatsApp planning introduction. | Keep TNT's existing logo, not the palm logo. Drop invented £299/£349/£399/£319 prices unless replaced by dated quotes; remove static 4.2/1,200+ Trustpilot, unsupported customer/stars claims, ATOL roundel/100% wording and “PTS Protected”. Use approved operator wording and verified PTS membership wording. Show WhatsApp digits and website clearly. Replace “& more” with Spain/Turkey/Greece. Licensed people photos must be identified as models; reword “Real holidays, real memories”. Tagline needs Raja's approval. |
| 02 Turkey — Phase 1 | **Change.** Keep title band, 3–6 card layout, location/amenity structure and bottom WhatsApp CTA. Filter-rail layout is a future curated-data idea, not a live inventory promise. | Drop globe logo/tagline, unknown 0330 number and wrong hours, ABTA/ATOL/fully protected, price promise, 24/7, invented resort names, £549/£829/£629 prices, five-star grades and Amina/Musa testimonial. Remove stale May 2025 dates, “family favourite”, “amazing value” and blanket flights/transfers claims. Facilities, halal and alcohol-free attributes need supplier evidence; otherwise “ask us to check”. Reword “real people” to reflect possible AI first reply. |
| 03 Romantic — Phase 2 | **Change, later.** Keep warm sand/rose treatment within brand, Spain/Turkey/Greece cards and a simple mood picker if useful. | Keep existing logo and approved romantic image direction. £ only, British “holiday/customise”; no instant-response promise, invented packages, yacht inclusion or prices. Embedded package chat is not current functionality. Licence/model checks apply. |
| 04 Mobile WhatsApp — Phase 2 | **Change: concept only.** Keep three concise options in the first reply and a full-website link. | Named hotels Liberty Hotels Lykia, Club Med Palmiye and Rixos Premium Tekirova, prices and review counts need real quotes and rights/approval. No automatic £150 pp deposit buttons. Remove price-match/best-price guarantees, 50k+ travellers, ATOL & Secure, 24/7, no-hidden-fees and flexible-payment claims (instalment wording remains off). Keep existing logo; use UK date order. Cloud API and manual PTS constraints below apply. |
| 05 Inspiration — Phase 3 | **Drop for now**, revisit after Phases 1–2. Reuse Faith & Heritage, a Spain/Turkey/Greece map and real airport guides later. | Drop Bali, Portugal and Thailand. Tenerife is within Spain; Claude's flagged Tenerife tile is a branded water-park issue, not a country-scope exclusion. Remove stale May/June 2026 “this week” deals/limited-time language, unapproved TUI Blue/Siam Park/Aqua Paradise branding, ABTA/ATOL, price promise and invented Sarah testimonial. No booking engine, accounts or favourites exist: use WhatsApp CTAs. Keep existing logo. |

Claude's full review is retained at `/workspace/site-review/claude-review.md`; the repository verification list retains each preview claim and photo credit. FACTS.md establishes no installed Trustpilot widget, not proof that no external profile exists: Raja must supply and verify the profile.

## 4. Technical assessment

**Stack and scope.** Static pages are suitable for this refresh. Reuse config, tokens and existing consent/tracking helpers; a framework migration would delay the first enquiry. A separate later piece of work will design a Supabase/admin CMS. This pass neither designs nor implements its schema, permissions or editor.

**Photography and performance.** Existing photos are locally stored Pexels-licensed AVIF/WebP with credits. Preview people are models, not TNT customers, staff or Raja; several preview scenes are outside the labelled destination or do not depict the named property. Replace misleading combinations with correctly located scenery or rights-cleared supplier imagery. Record source/licence and review crop/alt text. Use responsive images, explicit dimensions, high priority only for the hero and lazy loading below the fold. Keep self-hosted fonts. The 100 performance / 1.5 s LCP / 0 CLS / 0 ms TBT baseline above makes regressions material: remeasure both refreshed pages on mobile before release, particularly after any Trustpilot embed. Reserve widget space to avoid shifts. Do not claim field INP from TBT.

**Quotes and freshness.** There is no supplier API or live stock feed. Today prices come from manually maintained `deals.json`, governed by the seven-day rule. A named owner must refresh or remove each quote; seven days is an expiry guard, not a promise that a supplier price remains available. Show “from £X pp” only with a real dated supplier quote, nights, board, departure airport and date checked; confirm availability when replying. On absent/expired data, show **“Ask for today's price on WhatsApp”**. The preview's hard-coded prices bypass that pipeline and are review examples only; route real cards through the guard before release.

**Filters.** Live inventory filters are **not feasible in this scope: no supplier API**. Phase 1 is 3–6 curated static Turkey cards, not a booking/search engine. The preview's board/airport/family/halal/alcohol-free values and price sorting are demo data, while dates do not filter. Remove the demo controls from release or clearly limit useful controls to real curated attributes. Muslim-friendly filtering is Phase 2 and requires supplier evidence, including what halal/alcohol-free means per property; do not infer it from a destination or photograph.

**Trust, cookies and events.** Use a real official Trustpilot widget showing the actual score/count only once the correct profile and terms are confirmed; otherwise omit it. Verify any third-party requests/storage against consent and update the cookie notice as needed. Keep analytics off before consent and after rejection; marketing pixels need separate marketing consent. A configured pixel does not provide CAPI. Define WhatsApp click, form submission and confirmed lead creation separately, including the failed-form WhatsApp fallback; do not count it as a saved lead. Plan a server-confirmed event only after successful persistence, with deduplication and consent/privacy review if Meta/CAPI is later authorised. No endpoint changes or CAPI implementation are made here. Retain the website-form endpoint's existing source-preservation rules. A website-source prefill is useful for a WhatsApp reply but does not guarantee downstream attribution if edited or deleted.

**SEO and accessibility.** Keep preview noindex and existing preview headers. At approved release, remove preview-only metadata/banners, use accurate titles/descriptions, correct canonical URLs and descriptive internal links, then add Turkey to the sitemap. Avoid invented prices, ratings or offers in structured data. No blog until useful factual content can be maintained. Check keyboard navigation, focus visibility, mobile menu, contrast, image descriptions, labelled controls, heading order, touch targets, zoom and empty-state announcements. The live Lighthouse accessibility/SEO scores do not validate new pages or replace manual checks.

**WhatsApp and payments.** Sales-ai already has Sophie AI chat and Grok enquiry searches, but `whatsapp-send.js` currently sends text/templates or typing indicators only. It cannot yet send the mockup's image cards, interactive menus or carousels. Cloud API reply buttons are capped at three; lists have a single opener and limited rows, image headers are supported on some interactive types, and catalogue-dependent multi-product/carousel layouts are not ordinary per-card deposit buttons. Inbound parsing of button/list replies does not establish outbound support. Phase 2 option photos require a separately reviewed media/template enhancement tied to auto-search, with then-current Meta eligibility/window rules checked during implementation. A person creates PTS payment links; hosted automation `pts_link_create_enabled` defaults OFF. Never generate a deposit link per option automatically in this refresh.

## 5. Phased plan — CEO-set phases

Estimates are indicative **CLI agent implementation time plus human review**, assuming approved assets, quotes and access are supplied; one agent day is about eight hours. They exclude waiting for approvals/providers, fees and any later CMS project. No approval or external action is requested by this document itself.

### Phase 1 — homepage, Turkey and measurable enquiries

| Item / outcome | Effort | Dependencies | Who decides |
| --- | --- | --- | --- |
| Refine homepage real-photo hero within existing logo/colours; logo, tripntravel.co.uk and WhatsApp digits bright and in focus; one dominant WhatsApp CTA | 4–8 agent hours + 1–2 review hours | Approved photo rights/location, safe copy; preserve legal/footer/consent | Raja approves brand/assets; CTOO accepts implementation |
| Preserve campaign UTM reference and website-source label on big CTA; keep attribution distinct from CRM creation | 3–5 agent hours + 1 review hour | Agree campaign names and entry-page attribution; use config number; confirm edited-prefill limitations | Raja decides attribution needs; CTOO approves tracking contract |
| Accurate trust bar: official Trustpilot widget with actual score/count or omit; verified PTS membership wording; small operator ATOL holder line at edge linking to atol.html, no logo | 3–6 agent hours + 1–2 review hours | Correct Trustpilot profile/terms; PTS wording check; no implication TNT holds ATOL/ABTA | Raja approves claims/provider spend; CTOO checks consent/performance |
| Turkey page matched to Turkey advert, 3–6 curated cards; real quote-backed “from £X pp” with required details, otherwise WhatsApp price fallback | 1–2 agent days + 2–3 review hours | Approved advert wording/assets, dated supplier quotes and named freshness owner; no demo inventory controls | Raja chooses offers, approves supplier names and assigns quote owner |
| Distinguish WhatsApp click, form submit and confirmed lead created; verify consent and failed-form behaviour | 1–2 agent days + 2 review hours | Agreed event definitions, authorised later sales endpoint work if required; Meta ID/CAPI decision separate | CTOO owns technical/event design; Raja approves Meta scope |
| Clear verification list; make approved hours visible as 09:00–20:00 UK, 7 days; mobile/accessibility/consent/link and Lighthouse checks, release checklist | 4–8 agent hours + 2–4 review hours | Every claim verified/reworded/removed, rights and quote expiry checked; release authorisation is separate | Raja signs off content; CTOO signs off technical readiness |

Do not publish an invented price or static review count to fill a layout. If inputs are missing, simplify to scenery, factual copy and the WhatsApp fallback. Measure sent enquiries and progression to booking separately from clicks. This pass supplies a preview and plan, not completed conversion instrumentation or a release.

### Phase 2 — Family, Romantic and photo options

| Item / outcome | Effort | Dependencies | Who decides |
| --- | --- | --- | --- |
| Family and Romantic pages with warmer sand/rose palette within existing brand | 1–2 agent days + 2–3 review hours | Phase 1 accepted; approved photos/copy and real quotes or price fallback; reuse existing romantic page/assets where suitable | Raja chooses content and priorities; CTOO reviews |
| Muslim-friendly filter on curated cards only | 4–8 agent hours + 1–2 review hours | Evidence-backed halal/alcohol-free attributes and agreed wording; real curated data | Raja approves criteria/supplier evidence; CTOO accepts behaviour |
| Option photos in WhatsApp messages tied to auto-search; concise first reply and human follow-up to booking | 2–4 agent days + 3–4 review hours | Separate authorised sales-ai work, supported media/template path, licensed accurate option imagery, current Meta rules and delivery tests; manual PTS links remain | Raja approves sales flow; CTOO decides API implementation |

No native mockup card/deposit layout is promised. First improve delivery of the first WhatsApp and follow-up; automate only after the manual flow works.

### Phase 3 — inspiration and SEO

| Item / outcome | Effort | Dependencies | Who decides |
| --- | --- | --- | --- |
| Inspiration hub and lightweight map for Spain, Turkey and Greece only | 1–2 agent days + 2 review hours | Phases 1–2 delivering enquiries, factual destination content and licensed assets; no live inventory | Raja authorises priority/content; CTOO reviews performance |
| Useful airport/destination guides and blog with links to relevant WhatsApp enquiry pages | 1–2 agent days for templates + 2–4 agent hours per supplied article; 1–2 human review hours per article | Named writer/reviewer and update cadence; no stale deals or unapproved supplier branding | Raja assigns editorial owner and approves each article |

Drop Bali, Portugal and Thailand from the inspiration mockup. Defer accounts, favourites and a booking engine. **Not feasible: live inventory filters; curated static cards only.** CMS design is separate later work, outside these estimates.

## 6. Spend list needing Raja's yes

No money was spent or purchasing initiated in this pass. Amounts are unknown unless verified; implementation effort above is not a price quote.

| Spend | Amount | Purpose / decision |
| --- | --- | --- |
| Stock-photo licences or commissioned photography | **Unknown** | Accurate hero/lifestyle/property imagery; existing Pexels assets are recorded as Pexels Licence, but approve any new purchase and rights |
| Trustpilot business plan/widget entitlement | **Unknown** | Official display for the correct profile, only if terms/features meet the need; do not assume a paid plan is necessary |
| Any new tools or paid testing/automation services | **Unknown** | Buy only for a demonstrated Phase 1 bottleneck; no new tool subscription approved |
| Paid font | **Unknown** | Existing self-hosted fonts already support the brand; any proposed paid replacement requires Raja's yes |
| CMS or paid CMS tooling | **Unknown** | Separate later CMS task; no selection, design, provisioning or purchase here |

## 7. Tier 1 questions only Raja can answer

These block the relevant live feature; an omit/WhatsApp-price fallback can keep the rest moving.

1. Which photo source and budget are approved: existing licensed scenery, new stock or a shoot? May people be shown as clearly identified models?
2. Who supplies and refreshes 3–6 real dated Turkey quotes, with hotel, nights, board, airport and date checked? Are supplier names approved outside `atol.html`? Without this, use holiday ideas and “Ask for today's price on WhatsApp”.
3. What is the correct Trustpilot profile, and should we use its official widget given the small review base, or omit reviews? Who confirms the PTS membership/payment wording before display?
4. What is the real Meta pixel ID, and is CAPI actually wanted and authorised as separate work? GA4-only consented tracking remains the baseline until decided.
5. Does TNT own **0330 133 0330**? FACTS.md verifies only **+44 20 4538 5838**, so use the latter for release. Office hours are already confirmed as **09:00–20:00 UK, 7 days**: confirm public display approval when signing off (not the hours themselves).

Tagline approval and every other detailed claim remain on the verification list; they need not delay a simplified version with the unapproved material removed.

## Appendix: existing Phase 1 preview and file list

- **Preview homepage** (`index.html` on this branch). It replaces the live homepage on this branch only, for local review; no deploy was made. It has:
  - a sticky striped banner: “PREVIEW ONLY — not for merge…”
  - a dark header with the existing logo and the WhatsApp number in digits, from `TNT.whatsappDisplay`
  - the hero headline “Holidays planned for you, on WhatsApp.”
  - one big “Start planning” WhatsApp CTA (`data-wa`, `data-location="hero"`), with the number under it
  - the floating trust card, and a trust bar (ATOL placeholder, a static Trustpilot mock, PTS)
  - four photo cards with from-prices
  - a band linking to the Turkey page, “How it works” (live copy), and a final WhatsApp CTA with the confirmed office hours
  - the full legal footer.
- **Turkey landing page** (`turkey-holidays.html`, new). It has:
  - the same banner
  - a header that reproduces the mockup layout (existing logo, the live WhatsApp digits, and the mockup’s 0330 number and hours tagged TO VERIFY)
  - a title band with a big WhatsApp CTA and “Why Turkey?”
  - a client-side filter rail: board, airport, dates (display only), family, halal, alcohol-free, update and reset
  - sorting and three curated cards with prices, plus the testimonial
  - an empty state that falls back to “Ask for today's price on WhatsApp”
  - a trust strip, a “Speak to our Turkey experts” WhatsApp CTA, and the legal footer.
- **Tracking:**
  - `whatsapp_click` fires after analytics consent on every CTA through the existing `js/site.js` (`data-location` per slot).
  - In-page links carry `utm_source=website&utm_campaign=phase1_preview&utm_content=<slot>`.
  - WhatsApp prefill appends `Ref: source/campaign/content`.
  - No Meta pixel ID was added.
- **Shared scripts:** `js/config.js`, `js/logic.js`, `js/consent.js`, `js/site.js` and `js/forms.js` still load on both pages (plus `js/matchmaker.js` on the homepage). The cookie banner appears, with Accept and Reject equal. Other pages (about, enquiry, atol, legal pages) are untouched.
- **Checks run locally** (headless Chrome against a local static server):
  - Both pages render at 1280 px and 390 px.
  - There are no JavaScript exceptions.
  - The filters were checked. They show 3 cards on load, 1 for “All inclusive”, 0 for all-inclusive + halal + alcohol-free (the empty state shows), and 3 again after reset. Price sorting gives 549, 629, 829.
  - WhatsApp links resolve to `wa.me/442045385838` with the UTM ref.
  - Screenshots are in `/workspace/site-review/logs/preview-shots/`.

### File list

| File | Status | Notes |
| --- | --- | --- |
| `index.html` | Changed (preview) | Live homepage replaced on this branch only. The original is at `main` 416e8f5. |
| `turkey-holidays.html` | New (preview) | Turkey landing page |
| `css/preview-phase1.css` | New | Preview-only styles. Uses the existing tokens; yellow is only for review badges. |
| `js/preview-phase1.js` | New | WhatsApp digits from config, UTM prefill, Turkey filters and sort |
| `images/preview/*.avif`, `*.webp` | New | 7 Pexels photos, 900×600 |
| `IMAGE-CREDITS.md` | Appended | “Preview only” section; earlier entries untouched |
| `docs/website-refresh-verify-list.md` | New | Every TO VERIFY item, plus photo credits |
| `docs/website-refresh-plan.md` | New | This file |

Unchanged: `css/tokens.css`, `css/site.css`, all logo files, `js/config.js`, `netlify.toml`, and every other page. `sitemap.xml` was not updated. Do not add `turkey-holidays.html` to it until it is live.


### Pass 2 changes and validation boundary

Codex retained Claude's preview file list and composition. The shared preview WhatsApp helper now always includes a campaign reference (direct entry defaults to website/phase1_preview), CTA slot and `Website source: website_whatsapp_click`. This is visible message context only; it neither sets `tnt_lead_source` nor creates a lead. Internal preview links still use preview campaign names; do not overwrite paid-ad attribution in the live implementation. The website domain is now explicit beside the hero number on both pages. See the local `logs/codex-status.md` for checks and remaining gaps. Claude's browser/filter checks above are pass 1 results, not a new pass 2 browser run.

## 8. Second-opinion reviews (15 November 2026)

Two review-only passes were run on this plan (no customer data or secrets). They did not change the phases, spend figures or Tier 1 questions.

- **Gemini 3.5 Flash Lite** agreed the preview-plus-TO-VERIFY approach and the Phase 1–3 order are sound. It stressed UK ASA care so stock models are never presented as TNT customers or staff (already labelled on the preview), a named owner and cadence for the seven-day price guard, and a clear distinction between a WhatsApp enquiry start and a confirmed booking.
- **OpenRouter** (`cohere/north-mini-code:free`) also agreed. It repeated that ATOL/PTS/Trustpilot wording must stay unverified until approved, that yellow badges and `noindex` must be removed only after the list is cleared, and that Muslim-friendly attributes need supplier evidence before a Phase 2 filter (already a Phase 2 dependency, not an extra Tier 1 question).

Neither review asked for live inventory filters or for the preview to be merged as-is.

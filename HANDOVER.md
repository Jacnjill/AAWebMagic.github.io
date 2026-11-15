# Handover: Trip N Travel website preview (PR #20)

## Who's working now

Owner: Free

### Turn rules

- Always `git pull` first (branch `cursor/website-refresh-plan`).
- Only start if Owner is Free.
- Set Owner to yourself (for example `Owner: Claude (Grok's computer) — started 15 Nov 2026, 14:17 UK`) and push that change before you edit anything else.
- When you finish, update What's done and What's left, set `Owner: Free`, commit and push.

Last turn: Claude (Grok's computer), 15 November 2026, 14:02–14:22 UK (Europe/London). Visual refresh of the homepage and Turkey page to match the mockups, high-res imagery, live-looking cleanup (no on-page TO VERIFY badges), this handover file and the compressed mockups in `docs/mockups/`.

Use this file if you are continuing from the Claude or ChatGPT phone app. Those apps can see this GitHub repository; they cannot see the review box. Read this first, then look at the mockups in [`docs/mockups/`](docs/mockups/).

**Branch:** `cursor/website-refresh-plan`  
**Base:** `pre-prod`  
**Pull request:** https://github.com/Jacnjill/AAWebMagic.github.io/pull/20  
**Head at the start of the visual pass:** `6f8db22`  
**Do not merge. Push to this branch only. Never push to `main` or `pre-prod`.**

The public marketing site is this repository, `Jacnjill/AAWebMagic.github.io`, hosted on Netlify as **tnt-site-preview**. Merging to `main` publishes production at https://tripntravel.co.uk. The admin/CMS work lives in a different repository (`Jacnjill/tripntravel-sales-ai`, PR #219) and must not be mixed into this branch.

## Goal

Make the preview look like a live, premium executive-travel website that closely matches the five design mockups (homepage and Turkey first; romantic, WhatsApp and inspiration as look references). High-resolution photography with responsive `srcset` and WebP (plus AVIF), 1x/2x widths, hero preloaded, below-the-fold images lazy-loaded, so the site is sharp on retina without hurting mobile Lighthouse. The real TNT logo, **tripntravel.co.uk** and the WhatsApp number must stay bright and in focus.

This is still a **preview only**. Pages are `noindex, nofollow`. Nothing goes live until Raja says yes and the off-page verification checklist is cleared.

## Raja's instructions to date (15 November 2026)

- The earlier preview did not capture the mockup look. Colours, backgrounds and imagery need to feel high-resolution and good. Sample the mockup palettes. Premium executive-travel finish.
- **No visible TO VERIFY or validation text.** The site should look like a live site. The verification checklist stays off the page (see below).
- Photos will later come from supplier portals. Until then, use credited placeholders cropped like the mockup imagery. Credits and “to replace” notes belong in `IMAGE-CREDITS.md` and the verify list, not as banners on the page.
- Prices will be AI-led when searches are created by users or agents. Show mockup-style price cards, with a short note that prices come from live AI searches. If no live price is available: **“Ask for today's price on WhatsApp”**.
- Trustpilot is still to check. Keep a static placeholder (no live widget yet).
- Meta pixel is separate work. Do not touch pixel or marketing tag IDs.
- Contact numbers: **+44 20 4538 5838** (WhatsApp primary, `wa.me/442045385838`) and **+44 7752 340248**. Do not use 0330 133 0330. Hours: **09:00–20:00 UK, 7 days**.
- Keep the real TNT logo (not the mockup palm, globe or heart-plane marks).
- Ignore on-page compliance stripping for this preview so humans can review the look; every claim still has to be checked before go-live.

## What's done

- Phase 1 preview pages: homepage (`index.html`) and Turkey landing (`turkey-holidays.html`), plus `css/preview-phase1.css` and `js/preview-phase1.js`.
- Colour palettes sampled from the mockups and scoped under `.pv` (homepage: navy `#0B1F3A` / `#0E2540`, sand `#F3EBDF`, bright green `#25B84A`, coral `#C4452B`) and `.pv.pv-turkey` (cool white `#F5F7FB`, royal blue `#1B4F9C`, heading blue `#1A3A8F`, gold `#C9A227` / `#E0B01A`). `css/tokens.css` is unchanged, so legacy pages are not restyled.
- Homepage: cinematic hero, bright “Start planning” WhatsApp pill, cream trust card, frosted trust bar on the hero, four lifestyle cards, Turkey band, How it works, navy footer.
- Turkey page: royal-blue waved title band, Why Turkey callout, filter rail, three large package cards, testimonial under the third card, navy-and-gold trust strip with “Speak to our Turkey experts”.
- Sharp logo from the 2000px original (`images/opt/logo-128` and `logo-256`, WebP and PNG). Website, WhatsApp number and second number are visible in the header, hero and footer.
- High-res placeholder photography (Pexels, credited in `IMAGE-CREDITS.md`) with AVIF + WebP `srcset`: hero 1200 / 2000 / 2800, cards 800 / 1600. Hero is preloaded with `fetchpriority="high"`. Below-the-fold images are lazy-loaded.
- 0330 number removed. Config now has `phone2`, `officeHours` and `websiteDisplay`. Meta pixel IDs were not changed.
- Yellow TO VERIFY badges, the PREVIEW ONLY banner and on-photo “to replace” labels have been removed so the pages look live. The checklist is off-page.
- Five compressed mockups are in `docs/mockups/` for phone-app review.

## What's left

- Clear every item in the off-page verification checklist (claims, prices, reviews, Trustpilot, ATOL/ABTA/PTS wording, testimonials, placeholder photos) before any merge to `main`.
- Replace placeholder photos with supplier-portal images, especially:
  - the homepage hero (currently a Maldives aerial, not the mockup's white Mediterranean hotel);
  - the “Couples love Greece” and selfie cards (stock scenes; the selfie is listed by Pexels as Portugal);
  - the Turkey beach-loungers frame (a little grey / overcast).
- Confirm the Trustpilot profile, then decide whether to use the official widget or leave reviews off.
- Wire live AI-search quotes into the price cards (today the mockup figures are illustrative; the WhatsApp fallback is ready).
- Meta pixel and Conversions API: separate work, not started here.
- Optional: swap the typographic “FP” monogram in the trust bar if a different non-ATOL mark is preferred.
- Phase 2/3 pages from mockups 03–05 (romantic escapes, WhatsApp flow, inspiration hub) are not built. Use those mockups as look references only.
- A later, separate piece of work may point this site at the CMS public endpoint in sales-ai PR #219. Do not apply that SQL or merge that PR from this handover.
- Re-run mobile Lighthouse on the Netlify deploy preview before release and compare with the live-site baseline (100 performance, 1.5 s LCP, 15 Nov 2026).

## Off-page verification checklist

All unverified claims, prices, reviews and photo credits are listed in:

**[`docs/website-refresh-verify-list.md`](docs/website-refresh-verify-list.md)**

Photo sources and licences: [`IMAGE-CREDITS.md`](IMAGE-CREDITS.md).  
Plan and earlier verdicts: [`docs/website-refresh-plan.md`](docs/website-refresh-plan.md).  
Section F of the verify list records that on-page markers were removed.

## Hard rules

- **Push only to `cursor/website-refresh-plan`.** Never push to `main` or `pre-prod`. Do not merge this PR. Merging to `main` deploys production.
- Keep `noindex, nofollow` on the preview pages. Removing it is a go-live step after approval, not part of the look-and-feel work.
- No ATOL logo and no lookalike. Never imply that Trip N Travel holds ATOL or ABTA. TNT is an agent; operator ATOL numbers belong only on the approved ATOL page.
- £ only. British English.
- Do not invent or publish unverified prices, reviews or protection claims as if they were confirmed. The preview may show mockup-style figures for look-and-feel, but they stay on the checklist until a human clears them.
- Do not touch the Meta pixel or other marketing tag IDs in this pass.
- WhatsApp links stay on `wa.me/442045385838`.
- No secrets, tokens, customer data or credentials in the repo, in commits, or in prompts to third-party models.
- Do not change Netlify or GitHub settings, and do not apply SQL, unless Raja has said yes (a quoted instruction relayed by the CEO bot is acceptable).

## How to check the Netlify deploy preview

The usual deploy-preview URL is:

**https://deploy-preview-20--tnt-site-preview.netlify.app**

The deploy preview is **password-protected**. Raja is setting a new visitor-access password on the Netlify site `tnt-site-preview` (Deploy Preview visibility). The live site at https://tripntravel.co.uk stays public and is not updated by this branch.

Important: Netlify's build settings currently allow automatic builds from `main` only (`allowed_branches: main`). The last automatic deploy preview was built from `6f8db22` when this PR still targeted `main`. After the PR was retargeted to `pre-prod`, later pushes on this branch may not start a new preview until Netlify is set to preview this branch, or someone triggers a preview deploy. **Do not merge to `main` and do not publish a production deploy just to get a preview.** Until a new preview is built, compare against the local screenshots of the current head (see What's done) or serve the branch locally.

To confirm the build without the password, from a machine with the Netlify CLI logged in:

```bash
netlify api listSiteDeploys --data '{"site_id":"tnt-site-preview"}'
# or, if the site is linked:
netlify deploys:list
```

Check that the latest deploy for branch `cursor/website-refresh-plan` / context `deploy-preview` is `ready` (or equivalent) and that it is serving the new commit SHA. GitHub's PR checks on https://github.com/Jacnjill/AAWebMagic.github.io/pull/20 also show the Netlify status.

Then open the preview (with the password), compare the homepage to `docs/mockups/01-homepage.jpg` and the Turkey page to `docs/mockups/02-turkey-destination.jpg`, and confirm: no yellow review badges, no PREVIEW banner, logo / website / WhatsApp number bright, both phone numbers present, no ATOL logo, and `view-source` still has `noindex, nofollow`.

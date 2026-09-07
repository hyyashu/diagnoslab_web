# Google Ads landing page + app restructure

**Date:** 2026-09-08
**Branch:** `main`
**Range:** `c310d78..3b60f12` — 94 files changed, 1267 insertions, 616 deletions

Added a Google Ads landing page for home blood collection, and restructured the
app so paid pages can exist without the marketing chrome. Along the way,
reorganised the shared component folder and fixed a latent build break.

## Commits

| Commit | Change | Size |
|---|---|---|
| `414fca3` | `refactor(hero)` — regroup pagination into the services bar | 1 file, +41 −32 |
| `09ce9b5` | `feat(ads)` — landing page, route groups, component move | 94 files, +1213 −571 |
| `d7ed858` | `fix(ads)` — size the landing page logo | 1 file, +3 −3 |
| `3b60f12` | `refactor(components)` — group by kind, fix filename case | 52 files, +79 −79 |

## 1. Homepage hero, rearranged

Same carousel, colours, type and copy — only the composition changed.

- Pagination dots moved out of their own orphaned row (which sat close to the
  floating enquiry form) into the services bar, right-aligned over the faded
  end of the band where they read against the image.
- The gradient mask moved from the outer wrapper onto the background band
  alone, so the dots sit on top of it unfaded.
- Removed the `md:-mt-20` offset on the `h1`. The group is now centred properly,
  with bottom padding lifting it clear of the floating form.
- Mobile keeps the dots below the bar, where there is no room beside the text.

An earlier from-scratch redesign of this hero was proposed and reverted; the
brand red `#E73834` with Poppins/Inter is treated as settled.

## 2. Route groups

Routes are split into `(site)` and `(ads)`.

- The root layout is now just `html`/`body` plus site metadata.
- All shared chrome — navbar, footer, reviews, FAQ, areas served, bottom nav,
  floating CTA — moved to `(site)/layout.tsx`.
- `(ads)` gets its own minimal shell: logo and phone number, no nav links.

**URLs are unchanged.** Route groups do not appear in paths, so existing links,
the sitemap and Search Console data are unaffected.

Route folder names were deliberately left alone. `aboutUs` is inconsistent with
`book-a-test`, but renaming it would change a live indexed URL — not worth the
SEO cost for a cosmetic fix.

## 3. Landing page — `/lp/blood-test-at-home`

Built for a home blood collection campaign, with **call as the primary CTA** and
the callback form as the fallback.

Sections: offer and form, a three-step "how the home visit works" sequence,
featured tests with prices, service-area coverage, and a closing CTA. A sticky
call bar appears on mobile.

- Prices, fasting status and service areas are read live from `tests.json` and
  `areasServed.json`, so they cannot drift from the rest of the site.
- Sits outside the site chrome on purpose — every nav link is a paid click
  leaking away from the offer.
- `noindex, nofollow`, excluded from the sitemap, and `/lp/` disallowed in
  `robots.ts`, so it cannot compete with `/book-a-test` organically.

All copy is drawn from facts already in the codebase (hours 7:30 am–8 pm, ISO
certified, 15+ years, 2500+ reviews, same-day reports, 16 service areas).
**No offer was invented** — nothing claims free home collection or a discount,
because neither could be verified.

## 4. Conversion tracking

The codebase previously had **no analytics or conversion tracking of any kind** —
no gtag, no GTM, no Google Ads tag. Lead attribution worked server-side via the
UTM parameters `useSource.ts` captures, but Google Ads had no way to see
conversions and optimise bidding.

Added gtag with conversion events on call clicks and form submits, configured by:

```
NEXT_PUBLIC_GADS_ID
NEXT_PUBLIC_GADS_CALL_LABEL
NEXT_PUBLIC_GADS_LEAD_LABEL
```

Every call is a no-op until these are set, so nothing breaks before the account
is wired up.

## 5. Components

### Moved out of the route tree

`src/app/components/` → `src/components/`. They are shared UI, not routes. This
also fixed two imports that pointed from shared code *into* route folders
(`packageCard`, `testCard` — both now shared).

### Deduplicated

The ECG, X-Ray and Ultrasound pages each kept a byte-identical copy of the same
hero and `whyChoose` block, differing only in an image, a heading and four
labels. Both collapsed into prop-driven components — roughly 200 lines of
copy-paste removed.

Radiology's and corporate's versions were diffed and found to be **genuinely
different** components, not duplicates, so they were left alone.

### Grouped by kind

```
src/components/
  layout/     navbar, footer, bottomNav, floatingCTA
  sections/   hero, serviceHero, serviceWhyChoose, whyDiagnos, popularTests,
              packages, radiologyServices, howItWorks, conditionalHowItWorks,
              faq, findus, areasServed, relatedServices, reviews
  cards/      testCard, packageCard, detailCard, featureCard, reviewCard,
              radiologyCard
  forms/      enquiryForm, leadForm
  seo/        jsonLd, faqJsonLd, homeCollectionJsonLd
  ui/         modal
```

Previously 22 files sat loose at the top level alongside four subfolders
(`reviews/`, `radiology/`, `whyDiagnos/`, `service/`) that followed no single
rule. Imports between components are now all alias-based, so moving a file again
does not ripple through relative paths.

Renamed for clarity in a flat folder: `radiology/services` → `radiologyServices`,
`reviews/reviews` → `reviews`.

### Other

- File naming unified to camelCase (`BottomNav`, `JsonLd`, `AreaHero`,
  `ReviewCard` and others).
- Lead form validation extracted to `src/lib/leadValidation.ts`, shared by the
  site enquiry form and the landing page form.

## 6. Bug found: `FloatingCTA` filename case

**Pre-existing, not introduced by this work.**

`floatingCTA` was committed as `FloatingCTA.tsx` in `c310d78`, but
`(site)/layout.tsx` imports it as `@/components/floatingCTA`. macOS's
case-insensitive filesystem resolves this happily; **a case-sensitive host does
not**. On Vercel or any Linux builder that import would fail to resolve.

Surfaced when `git mv` reported the file as "not under version control" — git
and the filesystem disagreed about its name. Normalised to camelCase.

If there have been unexplained CI build failures that were fine locally, this is
a likely cause.

## Verification

Every structural change was verified the same way:

1. `tsc --noEmit` clean.
2. `next build` passes — 185 pages, all URLs unchanged.
3. **Rendered HTML of 16 routes snapshotted before and after, diffed byte for
   byte: 32,598 lines, zero difference.**

Step 3 is what backs the claim that no design changed during the refactors. The
snapshot pipeline strips `<script>`, `<link>` and comments and normalises
whitespace; it was checked for run-to-run stability before being trusted.

## Open items

- **Google Ads conversion IDs.** The three env vars above need real values from
  Tools → Conversions before calls and form submits report.
- **No offer on the landing page.** If there is a real one (free home
  collection, a discount code), it belongs in the hero.
- **`gsc/`** — seven Search Console CSV exports remain untracked. Left out of
  the commits deliberately as local data rather than source. Add a `.gitignore`
  entry to keep it that way.

## Note on scope

Commit `09ce9b5` includes pre-existing uncommitted work that was in the tree at
the start of the session — an `llms.txt` metadata alternate, package routes in
`sitemap.ts`, `relatedServices.tsx`, and edits across nine page files. The
restructure moved those same files, so the changes could not be separated
without leaving the build broken. `gsc/` was the one thing held back.

# TODO

Everything still open for diagnoslab.in, in priority order. Completed work is
in git history (plans, specs and the 2026-09-26 scan were folded in here).
Last updated 2026-09-26.

## 🔴 Critical

- [ ] **Lock down the leads API (backend repo, not this one).**
  `GET https://api.diagnoslab.in/leads` returns 200 and ~141 KB of JSON with no
  authentication, while `GET /` returns 401. That is almost certainly every
  lead's name and phone number. CORS also advertises PUT/PATCH/DELETE on
  `/leads` (not tested, to avoid changing data).
  - Require auth on GET/PUT/PATCH/DELETE `/leads`; keep only POST public.
  - Add rate limiting and input validation on POST `/leads`.
  - Check access logs for past `GET /leads` requests from unknown IPs.

## 🟠 High

- [ ] **Google Ads conversion tracking is off.** `NEXT_PUBLIC_GADS_ID`,
  `NEXT_PUBLIC_GADS_CALL_LABEL` and `NEXT_PUBLIC_GADS_LEAD_LABEL` are not in
  `.env`, so `trackLead()` / `trackCall()` (`src/lib/gtag.ts`, used on
  `/lp/blood-test-at-home/`) do nothing. Values come from Google Ads →
  Tools → Conversions. Static export bakes env vars in, so set them **before**
  `pnpm build`.

- [ ] **Make lead payloads consistent** (confirm the backend's accepted
  `form_type` / `lead_intent` values first, so new values aren't rejected).
  Captured from all 17 entry points:
  - The 6 Book Now entry points (test/package cards and detail pages,
    radiology cards) send **no `form_type` and no `lead_intent`**.
  - Same item, different field names: `test_category` (card) vs
    `test_categories` (detail); fasting/reporting only on cards; radiology
    sends `uses`/`footer_note` from the home section but
    `facilities`/`reporting_time` from `/radiology/`.
  - `form_type` can't tell entry points apart: `enquiry_form` = 5 entry
    points, `home_collection` = 5. Add an `entry_point` field.
  - `clicked_at` holds the item name, not a time, and duplicates
    `test_name` / `package_name`.
  - Contact and corporate forms send no `lead_intent`.

- [ ] **Add a request timeout to `submitLeadForm`** (`src/lib/api.ts`), e.g.
  `AbortSignal.timeout(15000)`, so a hung API shows the error message instead
  of "Submitting…" forever.

## 🟡 SEO

- [ ] **H1s and acronym casing on detail pages.** `toTitleCase` in
  `src/components/cards/detailCard.tsx` renders "Tsh", "Nd Plus", "Bio-T
  Plus". Change to "TSH Test in Jamshedpur" / "ND Plus Health Package in
  Jamshedpur" (keep acronyms; add the location). One change, 150+ pages.
  Search Console: "nd plus" 553 impressions at position 8.5. Do **not**
  rename URL slugs.
- [ ] **"Learn More" link text** on the ultrasound / ECG / X-ray cards →
  "Learn more about Ultrasound" etc. The only failing Lighthouse SEO audit
  (score 92).
- [ ] **Redirect `/services/`** (404, 129 impressions) in `public/.htaccess`,
  probably to `/`.
- [ ] **Content for queries we rank for without a page:** HSG test (173
  impressions, position 1.1), Fibroscan (59), ultrasound price (313,
  position 2.7).
- [ ] **Title / description length:** 123 of 181 titles are over 60
  characters and 123 descriptions are over 160, so results truncate them.
- [ ] **Remove the deprecated `HowTo` schema** (on 179 pages; Google no longer
  shows HowTo rich results).
- [ ] **Categorise the 81 uncategorised tests** (content work; unblocks
  category pages).

## 🟡 Performance

- [ ] **Catalogue phase 3: paginate `/tests`.** Add `/tests/page/[page]`, make
  pagination link-based, drop render-all-and-hide. `/tests` DOM ~4,550 → ~900.
  Page changes become navigations; handle search + pager interaction so
  clearing a search keeps the user's page.
- [ ] **Catalogue phase 4: search island.** Trimmed search index in a client
  island; full dataset out of the bundle.
- [ ] **Catalogue phase 5: API base URL from an env var** instead of the
  constant in `src/lib/api.ts`.
- [ ] Optional: legacy polyfills (13 KB in the React chunk); dot animation uses
  `width` (non-composited).

## 🟡 Design decisions (need an owner's call)

- [ ] **Colour contrast** (Lighthouse accessibility 96): brand red on
  `bg-red-50` badges, grey (`text-gray-400`) struck-through prices, green
  "% off" on `bg-green-50`, white text on brand red in some sections.
- [ ] **Hero slide-dot spacing** (touch-target audit).
- [ ] **Landing page offer** (`/lp/blood-test-at-home/`): add a real offer
  (free home collection, discount) to the hero if there is one.

## Ops / housekeeping

- [ ] `git push origin main` (many commits not on GitHub).
- [ ] Search Console: submit `https://diagnoslab.in/sitemap.xml` (sitemap
  index + 4 section sitemaps).
- [ ] After each deploy: hPanel → Performance → CDN → Flush cache.
- [ ] Add `gsc/`, `*.zip` and `delopy.sh` (contains an SSH password) to
  `.gitignore`.
- [ ] ~2026-10-24: export Search Console again and compare with the
  2026-09-26 export (first data from the new site).
- [ ] Watch Core Web Vitals field data (INP was 787 ms, from before the
  render-loop fix); it should improve as the 28-day window rolls over.

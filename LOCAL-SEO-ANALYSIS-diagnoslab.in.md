# Local SEO Analysis: diagnoslab.in

Audited 3 Oct 2026 against the local build (`feat/package-detail-redesign`, http://localhost:3001).
Pages: `/`, `/tests/`, `/tests/complete-blood-count/`, `/packages/`, `/packages/nd-plus/`, `/radiology/`,
`/ultrasound-in-jamshedpur/`, `/xray/`, `/ecg/`, `/area/jugsalai/`, `/contact-us/`, `/book-a-test/`.

## Local SEO Score: 61/100

| Dimension | Weight | Score | Notes |
|---|---|---|---|
| GBP signals | 25% | 16/25 | Live Sakchi map, place link, hours and reviews shown. Only one centre has a pinned listing. |
| Reviews & reputation | 20% | 15/20 | 4.9 from 3,000+ Google reviews shown site-wide and in schema. Recency and response rate not checkable from the site. |
| Local on-page | 20% | 12/20 | City in every title, dedicated service pages. Home H1 is not local; area pages are 96% identical. |
| NAP consistency | 15% | 7/15 | No street address anywhere on the site; three different opening hours; "Diagnos Labs" in the footer. |
| Local schema | 10% | 6/10 | MedicalBusiness with geo, hours and rating on every page. Generic subtype, street missing, branches not described. |
| Local links & authority | 10% | 5/10 | ISO badge, Instagram and GBP in `sameAs`. No directory or press links detectable from the site. |

**Business type:** Hybrid (walk-in centres in Sakchi, Jugsalai, Adityapur plus home collection across Jamshedpur).
**Vertical:** Healthcare: diagnostic lab / pathology / radiology.

## What is already good

- Every audited page has a canonical URL, a city-led title (`… in Jamshedpur | … | Diagnos Lab`) and a `tel:+918404802214` link.
- The phone number is the same everywhere (only the formatting differs: `+91 84048 02214` / `8404802214`).
- One MedicalBusiness entity with `@id` `https://diagnoslab.in/#organization`, `geo` at 7 decimals, `openingHoursSpecification`,
  `aggregateRating`, `areaServed` with 12 localities, `sameAs` to the GBP cid and Instagram.
- Dedicated service pages for tests, packages, radiology, ultrasound, X-ray and ECG, each with FAQ + FAQPage schema and
  BreadcrumbList on detail pages; test and package detail pages carry `MedicalTest` / `Product` + `Offer` with price.
- Sitemaps cover every page including all 16 area pages; `/lp/` is disallowed in robots.txt.

## Issues, by priority

### Critical

1. **Area pages are doorway-page risk.** `/area/jugsalai/` vs `/area/kadma/`: 96% of the main content is identical once
   the area name is swapped (16 pages built from one template). This is the pattern that lost sites most of their local
   traffic in the March 2024 core update. Each page needs genuinely local content: real travel time / distance to the
   nearest centre, landmarks, the localities within it, area-specific reviews, local doctor referrals, or fewer pages.
2. **No street address anywhere.** The GBP address is "1st Floor, Building No. 142, Rishab Shanti Apartment, Dhalbhum Road,
   near Union Bank of India, Ambagan, Sakchi, Jamshedpur 831001", but the site only says "Ambagan, Sakchi, Jamshedpur
   831001" (visible) and `streetAddress: "Sakchi"` (schema, `src/app/(site)/layout.tsx:26`), and llms.txt says "Sakchi".
   The footer shows no address at all. Put the full GBP address in the footer, contact page and schema.

### High

3. **Opening hours disagree in four places.** Schema: 07:30–20:00. Visible on the site: 7:30 AM – 7:30 PM. Radiology meta
   description and llms.txt: 7:30 AM – 8 PM. The phone line says 6 AM – 9 PM. Pick the real walk-in hours, match GBP,
   and use them everywhere.
4. **Jugsalai and Adityapur centres are invisible to Google.** No addresses, no map pins (they use a Maps search URL),
   no schema. Each centre should have its real address, its own GBP listing, and a `MedicalBusiness` (or `DiagnosticLab`)
   node with its own `@id` linked to the organisation via `parentOrganization` / `branchOf`. Adityapur also has no area page.
5. **"Patient portal" claim.** `src/lib/faq.ts:28` and `src/app/(site)/area/content.ts:53` say reports are available in a
   patient portal. There is no portal on the site. Remove the sentence or link to the portal.

### Medium

6. **Home H1 has no local signal.** "Looking for a test?". Keep the design, but add "in Jamshedpur" (e.g. "Looking for a
   test in Jamshedpur?") or a visible local subtitle in the H1.
7. **Schema subtype.** `MedicalBusiness` is generic; schema.org has `DiagnosticLab` (MedicalOrganization). Use
   `["MedicalBusiness", "DiagnosticLab"]` on the organisation node. Several pages (`page.tsx`, `ecg`, `xray`,
   `ultrasound`, test and package detail) repeat their own `MedicalBusiness` blocks; make them reference the one `@id`
   instead of redefining the business.
8. **Name variants.** Footer copyright says "Diagnos Labs"; schema `alternateName` is "Diagno Labs Jamshedpur". Use
   "Diagnos Lab" (the GBP name) everywhere.
9. **Meta descriptions over 160 characters** on `/` (192), `/tests/complete-blood-count/` (182), `/packages/nd-plus/` (199),
   `/area/jugsalai/` (197). Google truncates them; lead with city + service + phone.
10. **Test count disagrees:** "1,000+ tests" (home) vs "500+ tests" (tests page, meta). Use one number.

### Low

11. Contact page H1 ("Talk to a real person.") has no city or brand; the title covers it, but a `ContactPage` schema
    block with the address would help.
12. X-Ray and ECG titles start with the brand ("Diagnos Lab | Book X-Ray in Jamshedpur") unlike the other pages;
    lead with the service for consistency.
13. The site-wide `HowTo` block no longer produces rich results (Google retired HowTo rich results in 2023). Harmless.

## Off-site actions (not visible from the code)

- Make sure GBP primary category is "Diagnostic center" (or "Medical laboratory"), secondary: "Pathologist",
  "Radiologist", "Blood testing service", "Ultrasound imaging center".
- Separate GBP listings for Jugsalai and Adityapur if they are staffed walk-in centres.
- Claim Bing Places (feeds ChatGPT and Copilot) and Apple Business Connect.
- Indian healthcare citations: Justdial, Practo, Sulekha, Lybrate, IndiaMART, Google-indexed Facebook page.
  Same name, address and phone on every one.
- Keep a steady flow of new Google reviews (aim for at least one every couple of weeks) and reply to them without
  confirming any medical detail about the reviewer.

## Limitations

Not assessed: live local-pack / geo-grid positions, GBP Insights and categories, review velocity and response rate,
backlinks and domain authority, citation listings on third-party sites. These need GBP access or a paid tool
(BrightLocal, Local Falcon, Whitespark, DataForSEO).

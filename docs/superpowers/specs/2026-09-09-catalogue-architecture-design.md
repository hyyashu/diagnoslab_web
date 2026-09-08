# Catalogue architecture: server-first rendering behind a data layer

**Date:** 2026-09-09
**Status:** approved (approach A), ready for implementation
**Scope:** same product, no new user-facing features

## Problem

The catalogue is rendered by client components that import raw datasets. Three
consequences:

1. **The client/server boundary is inverted.** 46 of 81 components are
   `"use client"`, and 13 of them import a dataset directly. `tests.json`
   (62 KB) is compiled into four browser chunks.
2. **The catalogue nearly left the HTML entirely.** `useSearchParams` forced a
   Suspense boundary, and static generation prerendered the fallback — the
   production build shipped `Loading tests…` as the whole content of `/tests`,
   with zero test links. Fixed in `7c3fa03`, but by rendering all 134 cards and
   hiding 128 with CSS. That is a workaround, not an architecture: `/tests` now
   carries 4,550 DOM elements against a Lighthouse failure threshold of 1,400.
3. **No data layer.** 24 direct `@/data/*.json` imports across 20 files. Moving
   to a CMS today means editing 20 files.

## Goals

- The catalogue renders on the server. No dataset in the client bundle.
- `/tests` stays under ~1,400 DOM elements.
- Every test and package keeps a crawlable link in the static HTML.
- Content source is swappable behind one interface.
- No visible design change, and no change to what search does.

## Non-goals

- No booking, accounts, payments, or reports.
- No CMS integration now — only the seam that admits one later.
- No route renames. Existing URLs are indexed and stay as they are.

## Constraints

- `next build` on a Node host. ISR, route handlers and image optimisation stay
  available.
- Content stays as repo JSON for now, behind an interface.

## Design

### 1. Data layer — `src/lib/catalog/`

```
src/lib/catalog/
  types.ts        Test, Package, RadiologyService, Area, Review
  source.ts       the only module that touches @/data/*.json
  tests.ts        getTests, getTestBySlug, getTestsPage, getPopularTests, getSimilarTests
  packages.ts     getPackages, getPackageBySlug, getPackagesPage, getSimilarPackages
  index.ts        public surface
```

Rules:

- `source.ts` is the single place importing JSON. Swapping to a CMS or the
  backend API replaces this file only.
- Functions return normalised domain types, not raw JSON rows. Normalisation
  happens once, here, instead of being repeated in six components.
- `Price` is `string | number` in the JSON; the layer coerces to `number` at the
  boundary so callers never do `Number(...)` again.
- Slugs are trimmed at the boundary. A trailing space in `packages.json`
  previously emitted a 404 URL into the sitemap.

### 2. Routing

| Route | Rendering | Notes |
|---|---|---|
| `/tests` | server, static | page 1, canonical |
| `/tests/page/[page]` | server, `generateStaticParams` | pages 2..N |
| `/tests/[slug]` | server, static | unchanged |
| `/packages` | server, static | 17 items, one page, no pagination |
| `/packages/[slug]` | server, static | unchanged |

Page size **24**, giving 6 pages of ~900 DOM elements. Six items per page would
mean 23 thin routes; 24 keeps each page substantial and the link graph shallow.

Each `/tests/page/N` is self-canonical. Pointing paginated pages at `/tests` is a
common mistake that de-indexes them.

**Category pages are deliberately excluded.** 81 of 134 tests have an empty
`Categories` field, which `searchTest` currently masks by defaulting them to
"General Health". Category routes over this data would produce one bucket of 85
and several pages of 1–2 items. Categorising the 81 is a content task and a
prerequisite, not part of this work.

### 3. Server/client split

The pattern is a server shell that renders content, with client islands for
interaction only.

- `/tests` server component calls `getTestsPage(n)` and renders 24 cards as HTML.
- `TestCard` becomes a server component. Its only interactive element — the
  button opening the lead form — moves to a small client child that receives the
  test id and title as props.
- `Pagination` renders `<Link href="/tests/page/2">` instead of `onClick`.
- Sections that import datasets purely to display them — `popularTests`,
  `packages`, `radiologyServices`, `reviews`, `similarTests`, `similarPackages` —
  become server components calling the data layer.
- Genuinely interactive components stay client: navbar menu, carousels, modals,
  forms, filter chips, search input.

Target: dataset imports in client components drop from 13 to 0.

### 4. Search

Search keeps its current behaviour: filtering across all tests, instantly, in the
browser. What changes is what it loads.

- Build a trimmed index at module scope in the data layer: `{ slug, title,
  category, price }` per test — roughly 8 KB against the current 62 KB.
- The search island receives the index as a prop from the server component.
- With no query, the island renders nothing and the server-rendered page shows
  through. With a query, it renders matches and hides the paginated grid.

This removes the hidden-card hack: unmatched tests are absent from the DOM rather
than present and hidden.

### 5. Configuration

`src/lib/api.ts` hardcodes `http://diangos-api-...traefik.me/`, which appears to
be a development host. Move to `NEXT_PUBLIC_API_BASE_URL` with the current value
as the documented default, so production is not pinned to a dev URL.

## Migration phases

Each phase ends green — typecheck, build, and a rendered-HTML diff — and is
committed separately so any phase can be reverted alone.

1. **Data layer.** Add `src/lib/catalog/`, repoint all 24 imports. No component
   restructuring. Rendered HTML must be byte-identical.
2. **Cards to server components.** Extract the lead-form trigger into a client
   island. HTML diff limited to element ordering, if anything.
3. **Pagination routes.** Add `/tests/page/[page]`, make `Pagination` link-based,
   drop the render-all-and-hide workaround. `/tests` DOM falls from 4,550 to
   ~900. HTML changes here by design.
4. **Search island.** Trimmed index, client island, dataset out of the bundle.
5. **Config.** Env var for the API base URL.

## Verification

The method already used through this work:

- `tsc --noEmit` clean.
- `next build` green, 185+ pages.
- Rendered HTML of 16 representative routes snapshotted before and after each
  phase and diffed. Phases 1 and 2 require an empty diff. Phases 3 and 4 change
  HTML deliberately; the diff is reviewed to confirm it contains only the
  intended change.
- Link counts asserted against production output, not the dev server: dev and
  production disagreed earlier and the dev server was the misleading one.
- DOM element count on `/tests` measured before and after phase 3.

## Risks

- **Phase 3 changes visible pagination behaviour** — page changes become
  navigations rather than state updates. Slightly slower per click, and scroll
  position resets. Acceptable; it is what makes pages linkable.
- **Search and pagination interact.** With a query active the pager is hidden;
  clearing the query returns to the current server page. Needs explicit handling
  so clearing a search does not appear to lose the user's place.
- **`TestCard` is used in carousels** (`popularTests`) as well as grids. Making
  it a server component must not break the client carousel that renders it.
  Server components can be passed as children into client components; this needs
  care in phase 2.

## Open items

- Categorising the 81 uncategorised tests — content work, unblocks category pages.
- 7 titles over 60 characters and 7 descriptions over 160 remain truncated in
  results.
- Deprecated `HowTo` schema still ships on all 15 pages.

/* Where a visitor came from, saved on the first page they open. Forms
   used to read the UTM tags from their own page's URL, so a visitor who
   landed on /?utm_source=google and booked from a test page sent no
   campaign at all. Kept for 30 days in localStorage, and replaced when the
   visitor arrives through a new campaign link. */

const KEY = "dl_attribution";
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;
const PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "source", "gclid", "gbraid", "wbraid", "fbclid"];

type Attribution = Record<string, string>;

/* Stored timestamps: India time in ISO form, e.g. "2026-11-23T14:43:05+05:30",
   so Date.parse still reads them back for the 30-day expiry. */
function istTimestamp(ms: number = Date.now()): string {
  return new Date(ms + 5.5 * 60 * 60 * 1000).toISOString().replace(/\.\d+Z$/, "+05:30");
}

/* Timestamps as the lead message shows them: "23 Nov 2026, 3:03 PM". */
export function istLabel(ms: number = Date.now()): string {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
    .format(ms)
    .replace(/\b(am|pm)\b/, (m) => m.toUpperCase());
}

/* The landing page as a path ("/", "/lp/blood-test-at-home/?utm_source=google"),
   without the domain. Keeps the query string, which carries the campaign. */
function currentPath(): string {
  return window.location.pathname + window.location.search;
}

function toPath(url: string): string {
  try {
    const u = new URL(url, window.location.origin);
    return u.origin === window.location.origin ? u.pathname + u.search : url;
  } catch {
    return url;
  }
}

function read(): Attribution | null {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) ?? "null");
    if (!saved) return null;
    /* Records saved before the rename call the first visit `captured_at`. */
    const { captured_at, ...rest } = saved;
    const firstVisit = rest.first_visit_at ?? captured_at;
    if (!firstVisit || Date.now() - Date.parse(firstVisit) > MAX_AGE_MS) return null;
    return {
      ...rest,
      /* Records saved before these changes hold the full URL. */
      ...(rest.landing_page && { landing_page: toPath(rest.landing_page) }),
      first_visit_at: rest.first_visit_at ?? istTimestamp(Date.parse(captured_at)),
    };
  } catch {
    return null;
  }
}

/* Runs once per full page load (AttributionCapture in the root layout),
   before client navigation drops the landing URL's query string. */
export function captureAttribution() {
  const params = new URLSearchParams(window.location.search);
  const campaign = Object.fromEntries(
    PARAMS.flatMap((p) => {
      const v = params.get(p);
      return v ? [[p, v]] : [];
    }),
  );
  const isNewCampaign = Object.keys(campaign).length > 0;
  if (read() && !isNewCampaign) return;

  const external = document.referrer && new URL(document.referrer).origin !== window.location.origin;
  const record = {
    ...campaign,
    ...(external && { referrer: document.referrer }),
    landing_page: currentPath(),
    first_visit_at: istTimestamp(),
  };
  try {
    localStorage.setItem(KEY, JSON.stringify(record));
  } catch {
    /* Storage blocked (private mode): forms fall back to the current page. */
  }
}

/* The attribution part of a lead's `source`: the saved landing visit. */
export function attribution(): Attribution {
  const saved = read();
  if (!saved) return { landing_page: currentPath() };
  return { ...saved, first_visit_at: istLabel(Date.parse(saved.first_visit_at)) };
}

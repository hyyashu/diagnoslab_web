/* Where a visitor came from, saved on the first page they open. Forms
   used to read the UTM tags from their own page's URL, so a visitor who
   landed on /?utm_source=google and booked from a test page sent no
   campaign at all. Kept for 30 days in localStorage, and replaced when the
   visitor arrives through a new campaign link. */

const KEY = "dl_attribution";
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;
const PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "source", "gclid", "fbclid"];

type Attribution = Record<string, string>;

function read(): (Attribution & { captured_at?: string }) | null {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) ?? "null");
    if (!saved || Date.now() - Date.parse(saved.captured_at) > MAX_AGE_MS) return null;
    return saved;
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
    landing_page: window.location.href,
    captured_at: new Date().toISOString(),
  };
  try {
    localStorage.setItem(KEY, JSON.stringify(record));
  } catch {
    /* Storage blocked (private mode): forms fall back to the current page. */
  }
}

/* The attribution part of a lead's `source`: the saved landing visit. */
export function attribution(): Attribution {
  return read() ?? { landing_page: window.location.href };
}

/* Where a visitor came from, kept as a short history of visits ("touches")
   in localStorage. A touch is saved when someone arrives with campaign tags
   or a click ID, or from another site; a plain direct visit adds nothing,
   so coming back by typing the address never wipes the ad they came from.
   Each touch is kept for 90 days, Google Ads' click window.

   Every form and Call / WhatsApp tap sends:
   - the latest touch as plain fields (utm_*, gclid, landing_page...),
   - the first touch as first_* fields,
   - the whole list as `touches` (JSON),
   - ads_click_id: the newest Google click ID from the last 90 days, from an
     earlier touch or, failing that, Google's own _gcl_aw / _gcl_gb cookies.
     This is the click a booking is uploaded to Google Ads against. */

const KEY = "dl_attribution";
const MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000;
const MAX_TOUCHES = 10;
const PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "source", "gclid", "gbraid", "wbraid", "fbclid"];
const CLICK_IDS = ["gclid", "gbraid", "wbraid"] as const;

type Attribution = Record<string, string>;
type Touch = Record<string, string> & { at: string; landing_page: string };

/* Stored timestamps: India time in ISO form, e.g. "2026-11-23T14:43:05+05:30",
   so Date.parse still reads them back for the expiry. */
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
  return (window.location.pathname + window.location.search).slice(0, 300);
}

function toPath(url: string): string {
  try {
    const u = new URL(url, window.location.origin);
    return u.origin === window.location.origin ? u.pathname + u.search : url;
  } catch {
    return url;
  }
}

const fresh = (t: Touch) => Date.now() - Date.parse(t.at) <= MAX_AGE_MS;

function read(): Touch[] {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) ?? "null");
    if (!saved) return [];
    if (Array.isArray(saved.touches)) return (saved.touches as Touch[]).filter((t) => t?.at && fresh(t));
    /* Older single-record format: becomes the first touch. */
    const { captured_at, first_visit_at, landing_page, ...rest } = saved;
    const at = first_visit_at ?? (captured_at ? istTimestamp(Date.parse(captured_at)) : null);
    if (!at) return [];
    const touch = { ...rest, at, landing_page: landing_page ? toPath(landing_page) : "/" } as Touch;
    return fresh(touch) ? [touch] : [];
  } catch {
    return [];
  }
}

function write(touches: Touch[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ v: 2, touches: touches.slice(-MAX_TOUCHES) }));
  } catch {
    /* Storage blocked (private mode): forms fall back to the current page. */
  }
}

/* Runs once per full page load (Tracking in the root layout), before
   client navigation drops the landing URL's query string. */
export function captureAttribution() {
  const params = new URLSearchParams(window.location.search);
  const campaign = Object.fromEntries(
    PARAMS.flatMap((p) => {
      const v = params.get(p);
      return v ? [[p, v.slice(0, 200)]] : [];
    }),
  );
  let referrer: string | null = null;
  try {
    if (document.referrer && new URL(document.referrer).origin !== window.location.origin) referrer = document.referrer.slice(0, 300);
  } catch {}

  const touches = read();
  const isNew = Object.keys(campaign).length > 0 || !!referrer;
  if (!isNew && touches.length) return;

  const touch: Touch = { ...campaign, ...(referrer && { referrer }), landing_page: currentPath(), at: istTimestamp() };
  /* A reload of the same ad link within 30 minutes is the same visit. */
  const last = touches[touches.length - 1];
  if (
    last &&
    last.landing_page === touch.landing_page &&
    (last.referrer ?? "") === (touch.referrer ?? "") &&
    Date.now() - Date.parse(last.at) < 30 * 60 * 1000
  ) {
    return;
  }
  write([...touches, touch]);
}

/* Google's own click cookie: "GCL.<seconds>.<id>", kept 90 days. */
function googleCookie(name: string): { id: string; at: number } | null {
  const raw = document.cookie.split("; ").find((c) => c.startsWith(`${name}=`));
  if (!raw) return null;
  const parts = decodeURIComponent(raw.slice(name.length + 1)).split(".");
  if (parts.length < 3) return null;
  const at = Number(parts[1]) * 1000;
  const id = parts.slice(2).join(".");
  if (!id || !Number.isFinite(at) || Date.now() - at > MAX_AGE_MS) return null;
  return { id, at };
}

/* The newest Google click from the last 90 days: our touches first, then
   Google's cookies. */
function adsClick(touches: Touch[]): Attribution {
  for (let i = touches.length - 1; i >= 0; i--) {
    const t = touches[i];
    const type = CLICK_IDS.find((k) => t[k]);
    if (type) return { ads_click_id: t[type], ads_click_id_type: type, ads_click_at: istLabel(Date.parse(t.at)), ads_click_from: i === touches.length - 1 ? "latest_visit" : "earlier_visit" };
  }
  try {
    const aw = googleCookie("_gcl_aw");
    if (aw) return { ads_click_id: aw.id, ads_click_id_type: "gclid", ads_click_at: istLabel(aw.at), ads_click_from: "google_cookie" };
    const gb = googleCookie("_gcl_gb");
    if (gb) return { ads_click_id: gb.id, ads_click_id_type: "gbraid", ads_click_at: istLabel(gb.at), ads_click_from: "google_cookie" };
  } catch {}
  return {};
}

/* The attribution part of a lead's `source`. */
export function attribution(): Attribution {
  const touches = read();
  const click = adsClick(touches);
  if (!touches.length) return { landing_page: currentPath(), ...click };

  const latest = touches[touches.length - 1];
  const first = touches[0];
  const { at: latestAt, ...latestFields } = latest;
  const { at: firstAt, ...firstFields } = first;
  return {
    ...latestFields,
    latest_visit_at: istLabel(Date.parse(latestAt)),
    first_visit_at: istLabel(Date.parse(firstAt)),
    ...Object.fromEntries(Object.entries(firstFields).map(([k, v]) => [`first_${k}`, v])),
    ...click,
    ...(touches.length > 1 && { touches: JSON.stringify(touches) }),
  };
}

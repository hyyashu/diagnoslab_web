/* Every lead form sends the visitor to /thank-you/ once the lead is saved,
   with a full page load so that URL-based conversions (Google Ads, GTM,
   Meta) see a real page view. The flag below lets the page tell a fresh
   submission from a refresh, a back button or a direct visit, so the
   Google Ads lead conversion it fires is counted once per lead. */

export const THANK_YOU_PATH = "/thank-you/";

const KEY = "dl_lead_submitted";

export function markLeadSubmitted() {
  try {
    sessionStorage.setItem(KEY, "1");
  } catch {
    /* Storage blocked: the page view is still there for URL-based goals. */
  }
}

export function hasLeadSubmitted() {
  try {
    return sessionStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

export function clearLeadSubmitted() {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    /* Nothing to clear. */
  }
}

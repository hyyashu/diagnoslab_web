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

/* Enhanced conversions for leads. Google matches a form lead to an ad
   click by the person's phone and email, which works even when the click
   ID was lost. Only SHA-256 hashes are kept, never the plain values: the
   form saves them here, then the thank-you page puts them in the
   dataLayer before GTM loads (see ENHANCED_CONVERSION_SCRIPT), where the
   Google Ads tag's "user-provided data" variable reads them. */

const EC_KEY = "dl_lead_ec";

async function sha256(text: string) {
  const bytes = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

/* Google's normal form: +91XXXXXXXXXX for Indian mobiles. */
function phoneE164(digits: string) {
  const d = digits.replace(/\D/g, "");
  if (/^[6-9]\d{9}$/.test(d)) return `+91${d}`;
  if (/^0[6-9]\d{9}$/.test(d)) return `+91${d.slice(1)}`;
  if (/^91[6-9]\d{9}$/.test(d)) return `+${d}`;
  return null;
}

/* Lower case, no spaces; Gmail ignores dots in the name part. */
function normalEmail(raw: string) {
  const e = raw.trim().toLowerCase();
  const [user, domain] = e.split("@");
  if (!user || !domain) return null;
  return domain === "gmail.com" || domain === "googlemail.com" ? `${user.replace(/\./g, "")}@${domain}` : e;
}

export async function saveEnhancedConversion(phone: string, email?: string) {
  try {
    const p = phoneE164(phone);
    const e = email ? normalEmail(email) : null;
    const data: Record<string, string> = {};
    if (p) data.sha256_phone_number = await sha256(p);
    if (e) data.sha256_email_address = await sha256(e);
    if (Object.keys(data).length) sessionStorage.setItem(EC_KEY, JSON.stringify(data));
  } catch {
    /* No crypto or storage: the conversion still counts, just unmatched. */
  }
}

/* Inline on the thank-you page, so it runs while the HTML is parsed,
   before the GTM container (loaded after hydration) fires the conversion. */
export const ENHANCED_CONVERSION_SCRIPT = `try{var d=sessionStorage.getItem("${EC_KEY}");if(d){window.dataLayer=window.dataLayer||[];window.dataLayer.push({enhanced_conversion_data:JSON.parse(d)});sessionStorage.removeItem("${EC_KEY}")}}catch(e){}`;

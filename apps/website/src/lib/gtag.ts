/* Google Ads conversion tracking.
   All three values come from the Google Ads account (Tools > Conversions).
   When they are unset every call here is a no-op, so the page works
   normally before the account is wired up. */

export const GADS_ID = process.env.NEXT_PUBLIC_GADS_ID;
export const CALL_LABEL = process.env.NEXT_PUBLIC_GADS_CALL_LABEL;
export const LEAD_LABEL = process.env.NEXT_PUBLIC_GADS_LEAD_LABEL;

type GtagFn = (
  command: string,
  targetId: string,
  config?: Record<string, unknown>,
) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
    dataLayer?: unknown[];
  }
}

export function trackConversion(label: string | undefined) {
  if (typeof window === "undefined") return;
  if (!GADS_ID || !label || !window.gtag) return;
  window.gtag("event", "conversion", {
    send_to: `${GADS_ID}/${label}`,
  });
}

export const trackCall = () => trackConversion(CALL_LABEL);
export const trackLead = () => trackConversion(LEAD_LABEL);

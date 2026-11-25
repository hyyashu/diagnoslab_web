"use client";

import { useEffect } from "react";
import { trackLead } from "@/lib/gtag";
import { clearLeadSubmitted, hasLeadSubmitted } from "@/lib/leadConversion";

/* Fires the Google Ads lead conversion once per submitted form. The gtag
   script loads after hydration, so this waits for it (up to 5 seconds).
   The flag is cleared only when the conversion is sent, which also keeps
   it working under React's double-run of effects in development. */
export default function LeadConversion() {
  useEffect(() => {
    if (!hasLeadSubmitted()) return;
    let tries = 0;
    const timer = window.setInterval(() => {
      if (!window.gtag && ++tries < 50) return;
      window.clearInterval(timer);
      clearLeadSubmitted();
      trackLead();
    }, 100);
    return () => window.clearInterval(timer);
  }, []);
  return null;
}

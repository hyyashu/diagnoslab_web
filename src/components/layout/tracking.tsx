"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";
import { trackCall } from "@/lib/gtag";

/* Runs once per full page load. Saves the landing page and campaign tags
   (see lib/attribution) and reports every tap on a phone link as a Google
   Ads call conversion. One listener covers the header, footer, cards and
   sheets, server-rendered or not. Renders nothing. */
export default function Tracking() {
  useEffect(() => {
    captureAttribution();
    const onClick = (e: MouseEvent) => {
      if ((e.target as Element | null)?.closest?.('a[href^="tel:"]')) trackCall();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}

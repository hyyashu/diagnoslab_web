"use client";

import { useEffect } from "react";
import posthog from "posthog-js";
import { api } from "@/lib/api";
import { attribution, captureAttribution } from "@/lib/attribution";
import { trackCall } from "@/lib/gtag";

const posthogOn = !!(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN && process.env.NEXT_PUBLIC_POSTHOG_HOST);

/* No 0/O or 1/I, so staff can read the code off a WhatsApp message. */
const REF_ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
function refCode() {
  const bytes = crypto.getRandomValues(new Uint8Array(4));
  return "DL-" + Array.from(bytes, (b) => REF_ALPHABET[b % REF_ALPHABET.length]).join("");
}

/* Adds "(Ref: DL-4K7P)" to the pre-typed WhatsApp message. Runs before the
   browser follows the link, so the chat opens with the code in it. */
function addRef(link: HTMLAnchorElement, code: string) {
  const original = link.dataset.waHref ?? link.href;
  link.dataset.waHref = original;
  try {
    const url = new URL(original);
    const text = url.searchParams.get("text")?.trim() || "Hi, I'd like to book a test.";
    url.searchParams.set("text", `${text} (Ref: ${code})`);
    link.href = url.toString();
  } catch {
    /* Leave the link as it is. */
  }
}

/* Saves the tap with where the visitor came from, so staff can match it to
   the call or chat that follows (Leads → Calls & WhatsApp). Never blocks
   or breaks the call. */
function saveTap(channel: "call" | "whatsapp", code?: string) {
  const source: Record<string, string> = { ...attribution() };
  if (posthogOn) {
    const session = posthog.get_session_id?.();
    if (session) source.posthog_session_id = session;
  }
  api
    .post("/leads/taps", { channel, refCode: code, page: window.location.pathname, source }, { keepalive: true })
    .catch(() => {});
}

/* Runs once per full page load. Saves the landing page and campaign tags
   (see lib/attribution), reports every tap on a phone link as a Google Ads
   call conversion, and records Call / WhatsApp taps. One listener covers
   the header, footer, cards and sheets, server-rendered or not. Renders
   nothing. */
export default function Tracking() {
  useEffect(() => {
    captureAttribution();
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link) return;

      if (link.matches('a[href^="tel:"]')) {
        trackCall();
        saveTap("call");
        if (posthogOn) posthog.capture("contact_channel_selected", { contact_channel: "phone" });
      } else if (link.matches('a[href*="wa.me"], a[href*="whatsapp"]')) {
        const code = refCode();
        addRef(link, code);
        saveTap("whatsapp", code);
        if (posthogOn) posthog.capture("contact_channel_selected", { contact_channel: "whatsapp", ref_code: code });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}

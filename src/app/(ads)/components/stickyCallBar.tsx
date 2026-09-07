"use client";

import { MessageCircle } from "lucide-react";
import CallLink from "./callLink";

/* Mobile only: the paid page has no bottom nav, so the phone number stays
   reachable without scrolling back to the top. */
export default function StickyCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex gap-2 border-t border-slate-200 bg-white/95 p-3 backdrop-blur md:hidden">
      <CallLink className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-background-primary px-4 py-3.5 font-heading text-base font-bold text-white">
        Call now
      </CallLink>
      <a
        href="https://wa.me/918404802214"
        className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-3.5 font-heading text-base font-bold text-slate-900"
      >
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
        WhatsApp
      </a>
    </div>
  );
}

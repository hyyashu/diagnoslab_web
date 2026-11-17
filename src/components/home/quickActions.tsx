"use client";

import { useState } from "react";
import { ArrowUpRight, House, MessageCircle, Phone } from "lucide-react";
import ContactSheet from "@/components/forms/contactSheet";
import { PHONE_HREF, WHATSAPP_HREF } from "@/lib/contact";

/* DL.pen hero "Quick Actions": three shortcuts in one divided bar.
   "Upload prescription" and "Create your own package" are parked until
   those features exist (see git history); call and WhatsApp stand in. */
export default function QuickActions() {
  const [open, setOpen] = useState(false);

  const cell =
    "group flex flex-col gap-2.5 p-3 text-left transition-colors hover:bg-dl-bg md:gap-3.5 md:p-5";
  const badge =
    "flex size-[34px] items-center justify-center rounded-[10px] bg-dl-red-soft text-dl-red md:size-10 md:rounded-xl";
  const title = "font-display text-[12.5px] font-bold leading-tight text-dl-ink md:text-[15.5px]";
  const sub = "text-[11px] text-dl-muted md:text-[13px]";
  const arrow = (
    <ArrowUpRight className="hidden size-[18px] text-dl-muted group-hover:text-dl-ink md:block" aria-hidden />
  );

  return (
    <>
      <div className="grid grid-cols-3 divide-x divide-dl-line overflow-hidden rounded-[18px] border border-dl-line bg-white md:rounded-[20px]">
        <button type="button" onClick={() => setOpen(true)} className={cell}>
          <span className="flex items-center justify-between">
            <span className={badge}><House className="size-4 md:size-[19px]" aria-hidden /></span>
            {arrow}
          </span>
          <span className="flex flex-col gap-0.5">
            <span className={title}>
              <span className="md:hidden">Home collection</span>
              <span className="hidden md:inline">Book home collection</span>
            </span>
            <span className={sub}>
              <span className="md:hidden">From 6 AM daily</span>
              <span className="hidden md:inline">Slots from 6 AM, 7 days</span>
            </span>
          </span>
        </button>

        <a href={PHONE_HREF} className={cell}>
          <span className="flex items-center justify-between">
            <span className={badge}><Phone className="size-4 md:size-[19px]" aria-hidden /></span>
            {arrow}
          </span>
          <span className="flex flex-col gap-0.5">
            <span className={title}>
              <span className="md:hidden">Call us</span>
              <span className="hidden md:inline">Call the lab</span>
            </span>
            <span className={sub}>
              <span className="md:hidden">Talk to our team</span>
              <span className="hidden md:inline">Ask about tests &amp; prices</span>
            </span>
          </span>
        </a>

        <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className={cell}>
          <span className="flex items-center justify-between">
            <span className={badge}><MessageCircle className="size-4 md:size-[19px]" aria-hidden /></span>
            {arrow}
          </span>
          <span className="flex flex-col gap-0.5">
            <span className={title}>
              <span className="md:hidden">WhatsApp</span>
              <span className="hidden md:inline">Chat on WhatsApp</span>
            </span>
            <span className={sub}>
              <span className="md:hidden">Quick replies</span>
              <span className="hidden md:inline">Get reports &amp; quick replies</span>
            </span>
          </span>
        </a>
      </div>

      <ContactSheet isOpen={open} onClose={() => setOpen(false)} topic="Home collection" />
    </>
  );
}

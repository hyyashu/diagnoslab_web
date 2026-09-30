"use client";

import { useState } from "react";
import { ChevronDown, Minus, Phone, Plus } from "lucide-react";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/contact";
import type { FaqItem } from "@/lib/faq";

/* The questions DL.pen shows before "View all"; phones skip the Sunday one. */
const lead = [
  "How fast will I get my reports?",
  "Do you provide home sample collection?",
  "Are reports digital?",
  "What services do you provide in Jamshedpur?",
  "Is Diagnos Lab open on Sundays?",
  "Can I get my reports on WhatsApp?",
];
const desktopOnly = "Is Diagnos Lab open on Sundays?";

/* DL.pen "FAQ" (corporate, about): grey question cards, the open one
   outlined in red, the rest behind "View all". Answers stay in the HTML for
   the FAQ schema. */
export default function FaqCards({
  items,
  intro = "Can't find what you're looking for? Our team is a call away.",
}: {
  items: FaqItem[];
  intro?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);
  const [all, setAll] = useState(false);
  const ordered = [
    ...lead.map((q) => items.find((i) => i.question === q)).filter((i): i is FaqItem => !!i),
    ...items.filter((i) => !lead.includes(i.question)),
  ];

  const visibility = (q: string, i: number) => {
    if (all) return "";
    if (i >= lead.length) return "hidden";
    return q === desktopOnly ? "hidden md:block" : "";
  };

  return (
    <section aria-labelledby="faq-cards-heading" className="bg-white py-10 md:py-20">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-5 px-4 md:flex-row md:gap-16 md:px-10 xl:px-20">
        <div className="flex flex-col gap-1.5 md:w-[380px] md:shrink-0 md:gap-3">
          <p className="text-[11.5px] font-bold tracking-[0.11em] text-dl-red md:text-[12.5px]">FAQ</p>
          <h2 id="faq-cards-heading" className="font-display text-2xl font-extrabold tracking-[-0.03em] text-dl-ink md:text-[38px]">
            Questions, answered
          </h2>
          <p className="hidden text-[15px] leading-normal text-dl-ink-2 md:block">{intro}</p>
          <a
            href={PHONE_HREF}
            className="mt-2 hidden h-12 w-fit items-center gap-2 rounded-[14px] border-[1.5px] border-dl-ink px-[18px] text-[15px] font-semibold text-dl-ink transition-colors hover:bg-dl-bg md:flex"
          >
            <Phone className="size-4" aria-hidden />
            {PHONE_DISPLAY}
          </a>
        </div>

        <div className="flex flex-1 flex-col gap-2.5">
          {ordered.map((item, i) => {
            const on = open === i;
            return (
              <div
                key={item.question}
                className={`rounded-2xl border ${on ? "border-dl-red bg-white" : "border-transparent bg-dl-bg"} ${visibility(item.question, i)}`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(on ? null : i)}
                  aria-expanded={on}
                  className="flex w-full items-center gap-3 px-4 py-[18px] text-left md:px-6 md:py-5"
                >
                  <span className="flex-1 text-[15px] font-semibold text-dl-ink md:text-base">{item.question}</span>
                  <span
                    className={`flex size-8 shrink-0 items-center justify-center rounded-full ${
                      on ? "bg-dl-red text-white" : "bg-white text-dl-ink-2"
                    }`}
                  >
                    {on ? <Minus className="size-4" aria-hidden /> : <Plus className="size-4" aria-hidden />}
                  </span>
                </button>
                <p
                  className={`px-4 pb-[18px] text-[13.5px] leading-[1.55] text-dl-ink-2 md:px-6 md:pb-5 md:text-[14.5px] ${on ? "" : "hidden"}`}
                >
                  {item.answer}
                </p>
              </div>
            );
          })}

          {!all && ordered.length > lead.length && (
            <button
              type="button"
              onClick={() => setAll(true)}
              className="flex h-12 items-center justify-center gap-1.5 rounded-[14px] border border-dl-line text-sm font-bold text-dl-red md:mt-2 md:h-auto md:border-0 md:text-[15px]"
            >
              View all {ordered.length} questions
              <ChevronDown className="size-4" aria-hidden />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

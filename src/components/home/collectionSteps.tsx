"use client";

import { useState } from "react";
import { ArrowRight, CalendarCheck, FileCheck, Microscope, Syringe } from "lucide-react";
import Modal from "@/components/ui/modal";
import EnquiryForm from "@/components/forms/enquiryForm";
import { buttonClass } from "@/components/ui/button";
import { shell } from "@/components/ui/shell";

const steps = [
  { n: "01", title: "Book a slot", text: "Online, by call or on WhatsApp", icon: CalendarCheck },
  { n: "02", title: "Sample at home", text: "Phlebotomist visits from 6 AM", icon: Syringe },
  { n: "03", title: "Tested at lab", text: "Modern, calibrated equipment", icon: Microscope },
  { n: "04", title: "WhatsApp report", text: "Usually the same day", icon: FileCheck },
];

/* DL.pen "How It Works": a vertical rail on phones ("Step Row"), a
   horizontal one beside the intro on desktop ("Step"). */
export default function CollectionSteps() {
  const [open, setOpen] = useState(false);

  const cta = (
    <button type="button" onClick={() => setOpen(true)} className={buttonClass("primary", "md", "w-full md:w-auto")}>
      Book home collection
      <ArrowRight className="size-4" aria-hidden />
    </button>
  );

  return (
    <section aria-labelledby="steps-heading" className="bg-white py-10 md:py-[104px]">
      <div className={`${shell} flex flex-col gap-6 md:flex-row md:items-start md:gap-12 xl:gap-[72px]`}>
        <div className="flex flex-col gap-2 md:w-[340px] md:shrink-0 md:gap-5 xl:w-[380px]">
          <h2
            id="steps-heading"
            className="font-display text-2xl font-extrabold leading-[1.15] tracking-[-0.03em] text-dl-ink md:text-[38px] md:leading-[1.1]"
          >
            Home sample collection in 4 easy steps
          </h2>
          <p className="text-[13.5px] leading-[1.55] text-dl-ink-2 md:text-[15.5px] md:leading-relaxed">
            <span className="md:hidden">Serving Sakchi, Bistupur, Sonari, Kadma, Telco, Jugsalai and more.</span>
            <span className="hidden md:inline">
              Serving Sakchi, Bistupur, Sonari, Kadma, Telco, Jugsalai, Adityapur and more across Jamshedpur.
            </span>
          </p>
          <div className="hidden pt-2 md:block">{cta}</div>
        </div>

        <ol className="flex flex-col md:flex-1 md:flex-row md:gap-6">
          {steps.map(({ n, title, text, icon: Icon }, i) => {
            const last = i === steps.length - 1;
            return (
              <li key={n} className="flex gap-4 md:flex-1 md:flex-col md:gap-[18px]">
                <div className="flex flex-col items-center gap-1.5 md:flex-row md:gap-3">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full border-[1.5px] border-dl-red bg-white text-dl-red md:size-[52px]">
                    <Icon className="size-[19px] md:size-[22px]" aria-hidden />
                  </span>
                  <span
                    className={`w-[1.5px] flex-1 bg-dl-line md:h-px md:w-auto ${last ? "invisible" : ""}`}
                    aria-hidden
                  />
                </div>
                <div className={`flex flex-col gap-1 pt-0.5 md:gap-1.5 md:pt-0 ${last ? "" : "pb-6 md:pb-0"}`}>
                  <span className="text-[10.5px] font-bold tracking-[0.13em] text-dl-red md:text-xs">
                    <span className="md:hidden">STEP </span>
                    {n}
                  </span>
                  <h3 className="font-display text-base font-bold tracking-[-0.015em] text-dl-ink md:text-[19px]">
                    {title}
                  </h3>
                  <p className="text-[13.5px] leading-[1.45] text-dl-ink-2 md:text-sm">{text}</p>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="md:hidden">{cta}</div>
      </div>

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <EnquiryForm formType="home_collection" />
      </Modal>
    </section>
  );
}

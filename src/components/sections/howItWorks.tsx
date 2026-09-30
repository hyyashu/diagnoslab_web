"use client";

import { useState } from "react";
import { ArrowRight, Building2, House } from "lucide-react";
import ContactSheet from "@/components/forms/contactSheet";
import { buttonClass } from "@/components/ui/button";
import { shell } from "@/components/ui/shell";

type EnquiryFormType = "enquiry_form" | "home_collection";

const options = [
  {
    key: "lab",
    icon: Building2,
    title: "Lab visit",
    subtitle: "Visit any centre: Sakchi, Jugsalai or Adityapur",
    steps: [
      { title: "Visit the lab", text: "Walk in or arrive at your appointment time." },
      { title: "Tested by experts", text: "Our trained technicians collect and process your sample." },
      { title: "Reports on WhatsApp", text: "Digital reports are shared directly on your phone." },
    ],
    cta: "Get an appointment",
    form: "enquiry_form" as EnquiryFormType,
    dark: false,
  },
  {
    key: "home",
    icon: House,
    title: "Home collection",
    subtitle: "Available across Jamshedpur",
    steps: [
      { title: "Book home collection", text: "Submit the form or call us with your address." },
      { title: "Sample collected at home", text: "Our phlebotomist visits you at your chosen slot." },
      { title: "Tested at our lab", text: "Samples processed using modern equipment." },
      { title: "Reports on WhatsApp", text: "Reports shared digitally once ready." },
    ],
    cta: "Book home collection",
    form: "home_collection" as EnquiryFormType,
    dark: true,
  },
];

/* DL.pen "How It Works": lab visit and home collection side by side. */
export default function HowItWorks() {
  const [form, setForm] = useState<EnquiryFormType | null>(null);

  return (
    <>
      <section aria-labelledby="how-heading" className="bg-white py-10 md:py-24">
        <div className={`${shell} flex flex-col gap-6 md:gap-10`}>
          <div className="flex flex-col gap-1.5 md:flex-row md:items-end md:justify-between md:gap-16">
            <div className="flex flex-col gap-1.5 md:gap-3">
              <p className="hidden items-center gap-2.5 text-xs font-bold tracking-[0.13em] text-dl-red md:flex">
                <span className="h-0.5 w-5 bg-dl-red" aria-hidden />
                HOW IT WORKS
              </p>
              <h2
                id="how-heading"
                className="font-display text-[22px] font-extrabold tracking-[-0.03em] text-dl-ink md:text-[38px] md:leading-[1.1]"
              >
                Two easy ways to get tested
              </h2>
            </div>
            <p className="text-[13.5px] leading-normal text-dl-ink-2 md:max-w-[440px] md:text-[15px] md:leading-relaxed">
              Walk in to any of our centres, or book a home collection and we&apos;ll come to you.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 md:gap-5">
            {options.map(({ key, icon: Icon, title, subtitle, steps, cta, form: formType, dark }) => (
              <div
                key={key}
                className={`flex flex-col gap-6 rounded-3xl p-6 md:gap-7 md:p-8 ${
                  dark ? "bg-dl-ink text-white" : "border border-dl-line bg-white text-dl-ink"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`flex size-12 shrink-0 items-center justify-center rounded-2xl ${
                      dark ? "bg-dl-red text-white" : "bg-dl-red-soft text-dl-red"
                    }`}
                  >
                    <Icon className="size-[22px]" aria-hidden />
                  </span>
                  <span className="flex flex-col gap-0.5">
                    <h3 className="font-display text-xl font-extrabold tracking-[-0.02em] md:text-2xl">{title}</h3>
                    <span className={`text-[13.5px] ${dark ? "text-white/70" : "text-dl-ink-2"}`}>{subtitle}</span>
                  </span>
                </div>

                <ol className="flex flex-col gap-5">
                  {steps.map((s, i) => (
                    <li key={s.title} className="flex gap-3.5">
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-dl-red text-[13px] font-bold text-white">
                        {i + 1}
                      </span>
                      <span className="flex flex-col gap-1">
                        <span className="font-display text-base font-bold">{s.title}</span>
                        <span className={`text-sm leading-normal ${dark ? "text-white/70" : "text-dl-ink-2"}`}>{s.text}</span>
                      </span>
                    </li>
                  ))}
                </ol>

                <button
                  type="button"
                  onClick={() => setForm(formType)}
                  className={buttonClass("primary", "lg", "mt-auto w-full md:w-fit")}
                >
                  {cta}
                  <ArrowRight className="size-4" aria-hidden />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactSheet
        isOpen={form !== null}
        onClose={() => setForm(null)}
        topic={form === "home_collection" ? "Home collection" : "Book a test"}
      />
    </>
  );
}

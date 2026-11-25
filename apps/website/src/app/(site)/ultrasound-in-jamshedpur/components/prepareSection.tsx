import { ArrowRight, Check } from "lucide-react";
import SectionHead from "@/components/ui/sectionHead";
import Icon from "@/components/ui/icon";
import { buttonClass } from "@/components/ui/button";
import { shell } from "@/components/ui/shell";
import { ultrasoundPreparationSteps } from "@/lib/catalog";
import { expectPoints, expectStats, prepIcons } from "../content";

/* DL.pen ultrasound "Prepare": numbered steps beside a dark "What to
   expect" card. */
export default function PrepareSection() {
  return (
    <section aria-labelledby="prepare-heading" className="bg-white py-10 md:py-24">
      <div className={`${shell} grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,480px)] lg:gap-16`}>
        <div className="flex flex-col gap-5 md:gap-8">
          <SectionHead
            id="prepare-heading"
            eyebrow="BEFORE YOUR SCAN"
            title="How to prepare for your ultrasound"
            subtitle="Proper preparation helps us get clearer images and accurate results. Follow the guidelines below based on your scan type."
          />
          <ol className="flex flex-col">
            {ultrasoundPreparationSteps.map((step) => (
              <li key={step.id} className="flex gap-4 border-t border-dl-line py-5 first:border-t-0 first:pt-0 md:gap-6 md:py-6">
                <span className="w-8 shrink-0 font-display text-xl font-extrabold text-dl-red md:text-[22px]">
                  {String(step.id).padStart(2, "0")}
                </span>
                <div className="flex flex-1 flex-col gap-1 md:gap-1.5">
                  <h3 className="font-display text-base font-bold text-dl-ink md:text-[17px]">{step.title}</h3>
                  <p className="text-[13.5px] leading-normal text-dl-ink-2 md:text-sm">{step.description}</p>
                </div>
                <span className="hidden size-11 shrink-0 items-center justify-center rounded-xl bg-dl-red-soft text-dl-red md:flex">
                  <Icon name={prepIcons[step.id]} className="size-5" />
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex h-fit flex-col gap-6 rounded-3xl bg-dl-ink p-6 text-white md:p-8">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-bold tracking-[0.14em] text-[#FF8A80]">ON THE DAY</p>
            <h3 className="font-display text-[22px] font-extrabold tracking-[-0.02em] md:text-[26px]">What to expect</h3>
          </div>
          <dl className="grid grid-cols-3 gap-2 md:gap-3">
            {expectStats.map((s) => (
              <div key={s.label} className="flex flex-col gap-1 rounded-2xl bg-white/[0.07] p-3 md:p-4">
                <dt className="order-2 text-[11.5px] text-white/65 md:text-[12.5px]">{s.label}</dt>
                <dd className="order-1 whitespace-nowrap font-display text-base font-extrabold md:text-lg xl:text-xl">{s.value}</dd>
              </div>
            ))}
          </dl>
          <ul className="flex flex-col gap-3.5">
            {expectPoints.map((p) => (
              <li key={p} className="flex gap-3 text-[13.5px] leading-normal text-white/88 md:text-[14.5px]">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-dl-red">
                  <Check className="size-3" aria-hidden />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <a href="#enquiry-form" className={buttonClass("primary", "lg", "w-full")}>
            Book your ultrasound
            <ArrowRight className="size-4" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}

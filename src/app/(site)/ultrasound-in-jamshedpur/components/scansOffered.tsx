import { PhoneCall, Stethoscope } from "lucide-react";
import ScanCard from "@/components/cards/scanCard";
import ScanTypeCard from "@/components/cards/scanTypeCard";
import SectionHead from "@/components/ui/sectionHead";
import { buttonClass } from "@/components/ui/button";
import { shell } from "@/components/ui/shell";
import { featuredScan, scanTypes } from "../content";

/* DL.pen ultrasound "Ultrasound Scans": pregnancy featured, the other scan
   types in a three-up grid ending with a "not sure?" prompt. */
export default function ScansOffered() {
  return (
    <section id="ultrasound-section" aria-labelledby="scans-heading" className="bg-white py-10 md:py-24">
      <div className={`${shell} flex flex-col gap-5 md:gap-9`}>
        <SectionHead
          id="scans-heading"
          eyebrow="SCANS WE OFFER"
          title="Ultrasound scans we offer"
          subtitle="From routine abdominal checks to pregnancy monitoring — comprehensive USG services under one roof."
        />
        <ScanCard scan={featuredScan} variant="featured" />
        <ul className="grid gap-3 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {scanTypes.map((s) => (
            <li key={s.id}>
              <ScanTypeCard service="Ultrasound" title={s.title} description={s.description} preparation={s.preparation} icon={s.icon} />
            </li>
          ))}
          <li>
            <div className="flex h-full flex-col gap-4 rounded-[20px] bg-dl-ink p-5 text-white md:p-6">
              <span className="flex size-11 items-center justify-center rounded-xl bg-white/10">
                <Stethoscope className="size-5" aria-hidden />
              </span>
              <h3 className="font-display text-[19px] font-extrabold tracking-[-0.02em] md:text-[21px]">
                Not sure which scan you need?
              </h3>
              <p className="text-sm leading-normal text-white/70">
                Leave your number and our team will call you back to help you pick the right ultrasound.
              </p>
              <a href="#enquiry-form" className={buttonClass("primary", "sm", "mt-auto w-full md:w-fit")}>
                <PhoneCall className="size-4" aria-hidden />
                Request a call back
              </a>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}

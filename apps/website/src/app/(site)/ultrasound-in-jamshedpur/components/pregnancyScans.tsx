import { CalendarClock, ShieldAlert } from "lucide-react";
import ScanTypeCard from "@/components/cards/scanTypeCard";
import SectionHead from "@/components/ui/sectionHead";
import { shell } from "@/components/ui/shell";
import { PCPNDT_NOTICE } from "@/lib/contact";
import { pregnancyScans } from "../content";

/* The pregnancy scans patients search for by name (NT, growth, Doppler),
   each with its timing, and the PC-PNDT notice the law requires wherever
   pregnancy ultrasound is done. */
export default function PregnancyScans() {
  return (
    <section id="pregnancy-scans" aria-labelledby="pregnancy-scans-heading" className="bg-dl-bg py-10 md:py-24">
      <div className={`${shell} flex flex-col gap-5 md:gap-9`}>
        <SectionHead
          id="pregnancy-scans-heading"
          eyebrow="PREGNANCY SCANS"
          title="NT, growth and Doppler scans"
          subtitle="Pregnancy ultrasound by a female radiologist with an MD in Radiology, timed to your doctor's schedule."
        />
        <ul className="grid grid-cols-[minmax(0,1fr)] gap-3 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {pregnancyScans.map((s) => (
            <li key={s.id} className="flex flex-col gap-2">
              <p className="flex w-fit items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-dl-ink-2">
                <CalendarClock className="size-3.5 text-dl-red" aria-hidden />
                {s.when}
              </p>
              <ScanTypeCard service="Ultrasound" title={s.title} description={s.description} preparation={s.preparation} icon={s.icon} href={`/ultrasound-in-jamshedpur/${s.slug}/`} />
            </li>
          ))}
        </ul>
        <p
          role="note"
          className="flex items-start gap-3 rounded-2xl border border-dl-red/30 bg-white px-4 py-3.5 text-[13.5px] font-semibold leading-normal text-dl-ink md:items-center md:px-5 md:text-sm"
        >
          <ShieldAlert className="mt-px size-5 shrink-0 text-dl-red md:mt-0" aria-hidden />
          {PCPNDT_NOTICE}
        </p>
      </div>
    </section>
  );
}

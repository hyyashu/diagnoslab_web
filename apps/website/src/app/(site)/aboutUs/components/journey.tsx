import Image from "next/image";
import { Check } from "lucide-react";
import { shell } from "@/components/ui/shell";

/* DL.pen About "Our Journey": photo beside the story, a highlighted
   quote and three value pills. */
export default function Journey() {
  return (
    <section aria-labelledby="journey-heading" className="bg-white py-10 md:py-[88px]">
      <div className={`${shell} grid gap-5 md:grid-cols-[minmax(0,560px)_minmax(0,1fr)] md:items-center md:gap-[72px]`}>
        <div className="relative aspect-[358/240] overflow-hidden rounded-[20px] md:aspect-[560/460] md:rounded-[24px]">
          <Image
            src="/images/about/about3.avif"
            alt="A Diagnos Lab phlebotomist collecting a blood sample"
            fill
            sizes="(min-width: 768px) 560px, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-3.5 md:gap-5">
          <p className="flex items-center gap-2.5 text-xs font-bold tracking-[0.13em] text-dl-red md:text-[12.5px]">
            <span className="h-0.5 w-5 bg-dl-red" aria-hidden />
            OUR JOURNEY
          </p>
          <h2
            id="journey-heading"
            className="font-display text-[23px] font-extrabold leading-[1.2] tracking-[-0.03em] text-dl-ink md:text-[38px] md:leading-[1.15]"
          >
            From a small collection centre to a full-service laboratory
          </h2>
          <p className="text-[15px] leading-[1.6] text-dl-ink-2 md:text-base md:leading-[1.65]">
            <span className="md:hidden">
              Over the years, Diagnos Lab has evolved with modern technology, strict quality standards, and a patient-first approach
              that remains unchanged.
            </span>
            <span className="hidden md:inline">
              What started as a small collection centre has grown into a full-service laboratory trusted by patients across the
              region. Over the years, Diagnos Lab has evolved with modern technology, strict quality standards, and a patient-first
              approach that remains unchanged.
            </span>
          </p>
          <blockquote className="rounded-2xl border-l-[3px] border-dl-red bg-dl-red-soft px-[18px] py-4 text-[15px] font-semibold leading-[1.5] text-dl-ink md:px-6 md:py-5 md:text-base">
            Today, we are proud to serve Jamshedpur with a strong reputation built on consistent reporting, ethical practices, and
            long-term trust.
          </blockquote>
          <ul className="hidden flex-wrap gap-2 md:flex">
            {["Accuracy", "Transparency", "Patient care"].map((v) => (
              <li key={v} className="inline-flex items-center gap-2 rounded-full border border-dl-line px-3.5 py-1.5 text-sm font-semibold text-dl-ink">
                <Check className="size-3.5 text-dl-green" aria-hidden />
                {v}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

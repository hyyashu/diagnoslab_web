"use client";

import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { shell } from "@/components/ui/shell";

/* Logos from the old partner carousel. The first five sector lines are from
   DL.pen; the rest describe what each organisation does. */
const partners: { name: string; sector: string; mobileSector?: string; logo: string }[] = [
  { name: "Provident Fund", sector: "EPFO · Government", mobileSector: "EPFO", logo: "provident.avif" },
  { name: "Union Bank of India", sector: "Banking", logo: "union.avif" },
  { name: "National Metallurgical Laboratory", sector: "CSIR · Research", logo: "nml.avif" },
  { name: "Linde India", sector: "Industrial gases", logo: "linde.avif" },
  { name: "Akin Care", sector: "Senior services", logo: "akincare-logo.avif" },
  { name: "Tata Zoological", sector: "Zoological park", logo: "tataZoo.avif" },
  { name: "Arcofemi Health Care (Medi Wheel)", sector: "Health checkups", logo: "mediwheel-logo.avif" },
  { name: "Care And Cure Primary Care", sector: "Primary care", logo: "care.avif" },
  { name: "Ekincare", sector: "Corporate wellness", logo: "ekincare_logo.avif" },
  { name: "Health Wealth Management", sector: "Health benefits", logo: "healthwealth.avif" },
  { name: "Healthindia Allied Services", sector: "Health insurance TPA", logo: "HealthIndia.avif" },
  { name: "Life Cell International", sector: "Stem cell banking", logo: "LifeCell.avif" },
  { name: "Maggnessa Health Care", sector: "Healthcare", logo: "meggnessa.avif" },
  { name: "Medipiper Technologies", sector: "Health technology", logo: "MedPiper.avif" },
  { name: "Tata Steel Zoo", sector: "Zoological park", logo: "TataSteel.avif" },
  { name: "Tata 1mg", sector: "Corporate wellness", logo: "tata.avif" },
];

/* DL.pen corporate "Partners": "Trusted by teams across Jharkhand", a
   sliding row of partner cards with arrows on desktop and swipe on phones. */
export default function OurPartners() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps", dragFree: true });
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section aria-labelledby="partners-heading" className="border-b border-dl-line bg-white py-8 md:py-12">
      <div className={`${shell} flex flex-col gap-4 md:gap-6`}>
        <div className="flex items-center justify-between">
          <h2 id="partners-heading" className="text-[11.5px] font-bold tracking-[0.11em] text-dl-muted md:text-[12.5px]">
            TRUSTED BY TEAMS ACROSS JHARKHAND
          </h2>
          <div className="hidden gap-2 md:flex">
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Previous partners"
              className="flex size-[38px] items-center justify-center rounded-full border border-dl-line bg-white text-dl-ink hover:border-dl-ink"
            >
              <ChevronLeft className="size-[17px]" aria-hidden />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              aria-label="Next partners"
              className="flex size-[38px] items-center justify-center rounded-full bg-dl-ink text-white hover:bg-black"
            >
              <ChevronRight className="size-[17px]" aria-hidden />
            </button>
          </div>
        </div>

        <div className="-mx-4 overflow-hidden px-4 md:mx-0 md:px-0" ref={emblaRef}>
          <ul className="flex gap-3 md:gap-4">
            {partners.map(({ name, sector, mobileSector, logo }) => (
              <li
                key={name}
                className="flex h-[84px] w-[240px] shrink-0 items-center gap-3.5 rounded-[18px] bg-dl-bg px-4 md:h-24 md:w-[calc((100%-64px)/5)] md:px-[18px]"
              >
                {/* Wider than the design's square slot so wordmark logos stay legible. */}
                <span className="relative h-12 w-16 shrink-0 overflow-hidden rounded-[14px] border border-dl-line bg-white md:h-[52px] md:w-[68px]">
                  <Image src={`/images/tie-ups/${logo}`} alt={`${name} logo`} fill sizes="68px" className="object-contain p-1.5" />
                </span>
                <span className="flex min-w-0 flex-col gap-0.5">
                  <span className="line-clamp-3 text-sm font-bold leading-tight text-dl-ink md:text-[14.5px]">{name}</span>
                  <span className="text-xs text-dl-muted">
                    <span className="md:hidden">{mobileSector ?? sector}</span>
                    <span className="hidden md:inline">{sector}</span>
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

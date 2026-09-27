import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import SectionHead from "@/components/ui/sectionHead";
import Icon from "@/components/ui/icon";
import { radiologyItems } from "@/components/home/content";
import { shell } from "@/components/ui/shell";

/* DL.pen "Radiology": the dark band. Each service is a list row on phones
   ("Service Row") and a tile on desktop ("Radiology Tile"). */
export default function RadiologyImaging() {
  return (
    <section aria-labelledby="radiology-heading" className="bg-dl-ink py-9 md:py-24">
      <div className={`${shell} flex flex-col gap-2 md:gap-10`}>
        <SectionHead
          id="radiology-heading"
          tone="dark"
          title="Radiology & imaging"
          subtitle="Walk in or book a slot — reports reviewed by experienced doctors"
          mobileSubtitle="Walk in or book a slot"
          link={{ href: "/radiology/", label: "All services", desktopOnly: true }}
        />
        <ul className="flex flex-col md:grid md:grid-cols-3 md:gap-4 lg:grid-cols-5">
          {radiologyItems.map((item) => (
            <li key={item.title} className="border-b border-white/10 last:border-0 md:border-0">
              <Link
                href={item.href}
                className="group flex items-center gap-3.5 py-4 md:h-full md:flex-col md:items-stretch md:gap-12 md:rounded-[20px] md:border md:border-white/[0.12] md:bg-white/[0.04] md:p-6 md:transition-colors md:hover:bg-white/[0.08]"
              >
                <span className="flex items-start justify-between">
                  <span className="flex size-11 items-center justify-center rounded-[13px] bg-dl-red text-white md:size-12 md:rounded-[14px]">
                    <Icon name={item.icon} className="size-5 md:size-[22px]" />
                  </span>
                  <ArrowUpRight
                    className="hidden size-5 text-white/50 transition-colors group-hover:text-white md:block"
                    aria-hidden
                  />
                </span>
                <span className="flex flex-1 flex-col gap-[3px] md:gap-1.5">
                  <span className="font-display text-base font-bold text-white md:text-xl md:tracking-[-0.015em]">
                    {item.title}
                  </span>
                  <span className="text-[12.5px] text-white/65 md:text-[13.5px] md:leading-[1.45]">
                    {item.subtitle}
                  </span>
                </span>
                <ChevronRight className="size-[18px] text-white/50 md:hidden" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

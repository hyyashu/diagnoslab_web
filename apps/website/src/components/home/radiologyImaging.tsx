import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import SectionHead from "@/components/ui/sectionHead";
import Icon from "@/components/ui/icon";
import { radiologyItems } from "@/components/home/content";
import { shell } from "@/components/ui/shell";

/* DL.pen "Radiology": a red band like the area pages' health packages, with
   white text. Each service is a row in a white list on phones ("Service
   Row") and a white tile on desktop ("Radiology Tile"). */
export default function RadiologyImaging() {
  return (
    <section aria-labelledby="radiology-heading" className="bg-dl-red py-9 md:py-24">
      <div className={`${shell} flex flex-col gap-2 md:gap-10`}>
        <SectionHead
          id="radiology-heading"
          tone="dark"
          title="Radiology & imaging"
          subtitle="Walk in or book a slot. Reports reviewed by experienced doctors"
          mobileSubtitle="Walk in or book a slot"
          link={{ href: "/radiology/", label: "All services", desktopOnly: true }}
        />
        <ul className="flex flex-col overflow-hidden rounded-[18px] bg-white md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:rounded-none md:bg-transparent lg:grid-cols-5">
          {radiologyItems.map((item) => (
            <li key={item.title} className="border-b border-dl-line last:border-0 md:border-0">
              <Link
                href={item.href}
                className="group flex items-center gap-3.5 px-4 py-4 md:h-full md:flex-col md:items-stretch md:gap-9 md:rounded-[18px] md:bg-white md:p-[22px] md:transition-shadow md:hover:shadow-[0_12px_30px_rgba(22,24,29,0.18)]"
              >
                <span className="flex items-start justify-between">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-dl-red-soft text-dl-red md:size-12 md:rounded-[14px]">
                    <Icon name={item.icon} className="size-5 md:size-[22px]" />
                  </span>
                  <span className="hidden size-9 items-center justify-center rounded-full bg-dl-bg text-dl-ink-2 transition-colors group-hover:bg-dl-ink group-hover:text-white md:flex">
                    <ArrowUpRight className="size-4" aria-hidden />
                  </span>
                </span>
                <span className="flex flex-1 flex-col gap-[3px] md:gap-1.5">
                  <span className="font-display text-base font-bold text-dl-ink md:text-lg md:tracking-[-0.015em]">
                    {item.title}
                  </span>
                  <span className="text-[12.5px] text-dl-muted md:text-[13px] md:leading-[1.45]">
                    {item.subtitle}
                  </span>
                </span>
                <ChevronRight className="size-[18px] text-dl-ink-2 md:hidden" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

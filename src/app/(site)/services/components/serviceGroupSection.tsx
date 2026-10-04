import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import SectionHead from "@/components/ui/sectionHead";
import Icon from "@/components/ui/icon";
import { shell } from "@/components/ui/shell";
import type { ServiceGroup } from "../content";

/* One group of services, laid out like the home page's radiology band on a
   light background: rows in a white list on phones, bordered tiles on
   desktop. */
export default function ServiceGroupSection({ group, tone }: { group: ServiceGroup; tone: "white" | "muted" }) {
  const headingId = `${group.id}-heading`;

  return (
    <section
      id={group.id}
      aria-labelledby={headingId}
      className={`scroll-mt-24 py-9 md:py-20 ${tone === "white" ? "bg-white" : "bg-dl-bg"}`}
    >
      <div className={`${shell} flex flex-col gap-4 md:gap-10`}>
        <SectionHead id={headingId} title={group.title} subtitle={group.subtitle} />
        <ul className="flex flex-col overflow-hidden rounded-[18px] border border-dl-line bg-white md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:rounded-none md:border-0 md:bg-transparent lg:grid-cols-4">
          {group.items.map((item) => (
            <li key={item.title} className="border-b border-dl-line last:border-0 md:border-0">
              <Link
                href={item.href}
                className="group flex items-center gap-3.5 px-4 py-4 md:h-full md:flex-col md:items-stretch md:gap-9 md:rounded-[18px] md:border md:border-dl-line md:bg-white md:p-[22px] md:transition-shadow md:hover:shadow-[0_12px_30px_rgba(22,24,29,0.1)]"
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
                  <span className="text-[12.5px] text-dl-muted md:text-[13px] md:leading-[1.45]">{item.subtitle}</span>
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

"use client";

import { useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import CheckupPackageCard, { type CheckupPackage } from "@/components/cards/checkupPackageCard";
import Icon from "@/components/ui/icon";
import { shell } from "@/components/ui/shell";

export type ShelfCategory = { label: string; icon: string; packages: CheckupPackage[] };

/* Category chips and the cards they filter. Cards scroll sideways on
   phones and sit in a four-up grid on desktop. */
export default function PackageShelf({ categories }: { categories: ShelfCategory[] }) {
  const [active, setActive] = useState(0);
  const chipsRef = useRef<HTMLDivElement>(null);
  const packages = categories[active]?.packages ?? [];

  return (
    <>
      <div className={`${shell} flex items-center gap-4`}>
        <div
          ref={chipsRef}
          role="tablist"
          aria-label="Package categories"
          className="no-scrollbar -mx-4 flex flex-1 gap-2 overflow-x-auto px-4 md:mx-0 md:gap-2.5 md:px-0"
        >
          {categories.map((c, i) => {
            const selected = i === active;
            return (
              <button
                key={c.label}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(i)}
                className={`flex shrink-0 items-center gap-2 rounded-full border py-[7px] pl-2 pr-[13px] text-[13px] font-semibold transition-colors md:py-[9px] md:pl-2.5 md:pr-4 md:text-sm ${
                  selected
                    ? "border-dl-ink bg-dl-ink text-white"
                    : "border-dl-line bg-white text-dl-ink hover:border-dl-ink/40"
                }`}
              >
                <span
                  className={`flex size-[22px] items-center justify-center rounded-full md:size-[26px] ${
                    selected ? "bg-white/15 text-white" : "bg-dl-red-soft text-dl-red"
                  }`}
                >
                  <Icon name={c.icon} className="size-3.5" />
                </span>
                {c.label}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          aria-label="More categories"
          onClick={() => chipsRef.current?.scrollBy({ left: 240, behavior: "smooth" })}
          className="hidden size-[42px] shrink-0 items-center justify-center rounded-full border border-dl-line text-dl-ink hover:border-dl-ink md:flex"
        >
          <ChevronRight className="size-[18px]" aria-hidden />
        </button>
      </div>

      <div className={`${shell} max-md:px-0`}>
        <ul
          role="tabpanel"
          className="no-scrollbar flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 lg:grid-cols-4"
        >
          {packages.map((pkg) => (
            <li key={pkg.slug} className="w-[282px] shrink-0 snap-start md:w-auto">
              <CheckupPackageCard pkg={pkg} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

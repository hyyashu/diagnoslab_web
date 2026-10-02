"use client";

import { useState } from "react";
import CheckupPackageCard, { type CheckupPackage } from "@/components/cards/checkupPackageCard";
import { CategoryChips } from "@/components/catalog/catalogControls";
import { shell } from "@/components/ui/shell";

export type ShelfCategory = { label: string; icon: string; packages: CheckupPackage[] };

/* Category chips and the cards they filter. Cards scroll sideways on
   phones and sit in a four-up grid on desktop. */
export default function PackageShelf({ categories }: { categories: ShelfCategory[] }) {
  const [active, setActive] = useState(categories[0]?.label ?? "");
  const packages = categories.find((c) => c.label === active)?.packages ?? [];

  return (
    <>
      <div className={shell}>
        <CategoryChips label="Package categories" options={categories} active={active} onChange={setActive} />
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

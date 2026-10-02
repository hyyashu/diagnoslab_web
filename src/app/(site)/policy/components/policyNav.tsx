"use client";

import { useEffect, useState } from "react";
import { Database, Shield, type LucideIcon } from "lucide-react";

const items: { id: string; label: string; icon: LucideIcon }[] = [
  { id: "privacy", label: "Privacy policy", icon: Shield },
  { id: "data-retention", label: "Reports & data retention", icon: Database },
];

/* DL.pen "Policy Nav". Highlights the part of the page being read. */
export default function PolicyNav() {
  const [active, setActive] = useState(items[0].id);

  useEffect(() => {
    const targets = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[visible.length - 1].target.id);
      },
      { rootMargin: "0px 0px -60% 0px" },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-labelledby="policy-nav-heading" className="flex flex-col gap-3">
      <p id="policy-nav-heading" className="text-[11.5px] font-bold tracking-[0.1em] text-dl-muted">
        ON THIS PAGE
      </p>
      <ul className="-mx-4 flex gap-2 overflow-x-auto px-4 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:px-0">
        {items.map(({ id, label, icon: Icon }) => {
          const on = active === id;
          return (
            <li key={id} className="shrink-0">
              <a
                href={`#${id}`}
                aria-current={on ? "true" : undefined}
                className={`flex items-center gap-3 rounded-full border px-3.5 py-2.5 text-[14.5px] transition-colors lg:rounded-xl lg:py-[11px] ${
                  on
                    ? "border-dl-line bg-white font-bold text-dl-ink"
                    : "border-dl-line font-medium text-dl-ink-2 hover:text-dl-ink lg:border-transparent"
                }`}
              >
                <Icon className={`size-[17px] ${on ? "text-dl-red" : "text-dl-muted"}`} aria-hidden />
                <span className="lg:flex-1">{label}</span>
                {on && <span className="hidden size-1.5 rounded-full bg-dl-red lg:block" aria-hidden />}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

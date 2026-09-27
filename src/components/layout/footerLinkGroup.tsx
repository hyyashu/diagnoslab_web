"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

/* A footer column on desktop; a collapsible row on phones. The links are
   in the HTML either way, so crawlers see them on every page. */
export default function FooterLinkGroup({
  title,
  links,
}: {
  title: string;
  links: { name: string; href: string }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col border-b border-white/10 md:border-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex items-center justify-between py-3.5 text-[15px] font-semibold text-white md:pointer-events-none md:py-0 md:pb-3 md:text-[13px] md:font-bold md:tracking-[0.1em] md:text-white/50"
      >
        {title}
        <ChevronDown
          className={`size-[18px] text-white/50 transition-transform md:hidden ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      <ul className={`${open ? "flex" : "hidden"} flex-col gap-3 pb-4 md:flex md:pb-0`}>
        {links.map((link) => (
          <li key={link.name}>
            <Link href={link.href} className="text-[14.5px] text-white/90 hover:text-white hover:underline">
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

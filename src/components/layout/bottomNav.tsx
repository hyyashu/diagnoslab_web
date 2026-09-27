"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarPlus, FlaskConical, House, Package, Phone } from "lucide-react";
import Modal from "@/components/ui/modal";
import EnquiryForm from "@/components/forms/enquiryForm";

/* DL.pen "Bottom Nav". The design's Reports and Account tabs wait on
   features the site doesn't have yet; Packages and Contact hold their
   places until then. */
const tabs = [
  { name: "Home", href: "/", icon: House },
  { name: "Tests", href: "/tests/", icon: FlaskConical },
  null,
  { name: "Packages", href: "/packages/", icon: Package },
  { name: "Contact", href: "/contact-us/", icon: Phone },
];

export default function BottomNav() {
  const pathname = usePathname();
  const [openForm, setOpenForm] = useState(false);

  const isActive = (href: string) => {
    const clean = href.replace(/\/$/, "") || "/";
    const path = pathname.replace(/\/$/, "") || "/";
    if (clean === "/") return path === "/";
    return path === clean || path.startsWith(clean + "/");
  };

  return (
    <>
      <nav
        aria-label="Quick links"
        className="fixed inset-x-0 bottom-0 z-[90] border-t border-dl-line bg-white md:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <ul className="flex items-end px-2 pt-2 pb-2.5">
          {tabs.map((tab) => {
            if (!tab) {
              return (
                <li key="book" className="flex flex-1 flex-col items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setOpenForm(true)}
                    aria-label="Book a test"
                    className="-mt-5 flex size-[52px] items-center justify-center rounded-full bg-dl-red text-white shadow-[0_6px_16px_rgba(217,45,39,0.25)] active:scale-95"
                  >
                    <CalendarPlus className="size-[22px]" aria-hidden />
                  </button>
                  <span className="text-[11px] font-bold text-dl-red">Book</span>
                </li>
              );
            }

            const active = isActive(tab.href);
            const Icon = tab.icon;
            return (
              <li key={tab.name} className="flex-1">
                <Link
                  href={tab.href}
                  aria-current={active ? "page" : undefined}
                  className="flex flex-col items-center gap-1"
                >
                  <Icon
                    className={`size-[21px] ${active ? "text-dl-red" : "text-dl-muted"}`}
                    aria-hidden
                  />
                  <span
                    className={`text-[11px] ${
                      active ? "font-bold text-dl-ink" : "font-medium text-dl-muted"
                    }`}
                  >
                    {tab.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <Modal isOpen={openForm} onClose={() => setOpenForm(false)}>
        <EnquiryForm formType="home_collection" />
      </Modal>
    </>
  );
}

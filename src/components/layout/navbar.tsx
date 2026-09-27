"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronRight,
  FileText,
  FlaskConical,
  Handshake,
  House,
  Mail,
  MapPin,
  Menu,
  Package,
  Phone,
  ScanLine,
  Star,
  Users,
  X,
} from "lucide-react";
import Logo from "@/components/ui/logo";
import SiteSearch from "@/components/search/siteSearch";
import Modal from "@/components/ui/modal";
import EnquiryForm from "@/components/forms/enquiryForm";
import { buttonClass } from "@/components/ui/button";
import { GOOGLE_REVIEWS_HREF, PHONE_DISPLAY, PHONE_HREF } from "@/lib/contact";

/* DL.pen "Site Header" (desktop) and "Mobile Header" (phones). */

const desktopLinks = [
  { name: "Home", href: "/", icon: House },
  { name: "Lab Tests", href: "/tests/", icon: FlaskConical },
  { name: "Health Packages", href: "/packages/", icon: Package },
  { name: "Radiology", href: "/radiology/", icon: ScanLine },
];

const mobileTabs = [
  { name: "Home", href: "/" },
  { name: "Lab Tests", href: "/tests/" },
  { name: "Packages", href: "/packages/" },
  { name: "Radiology", href: "/radiology/" },
];

/* Everything, for the slide-out menu. */
const menuLinks = [
  ...desktopLinks,
  { name: "Corporate tie-ups", href: "/corporate/", icon: Handshake },
  { name: "About us", href: "/aboutUs/", icon: Users },
  { name: "Contact us", href: "/contact-us/", icon: Mail },
  { name: "Privacy policy", href: "/policy/", icon: FileText },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  const isActive = (href: string) => {
    const clean = href.replace(/\/$/, "") || "/";
    const path = pathname.replace(/\/$/, "") || "/";
    if (clean === "/") return path === "/";
    return path === clean || path.startsWith(clean + "/");
  };

  return (
    <>
      <header className="relative z-30 bg-white">
        {/* Utility row */}
        <div className="mx-auto flex max-w-[1440px] items-center gap-7 px-4 pt-3.5 pb-3 md:px-10 md:py-[18px] xl:px-20">
          <Logo />

          <div className="hidden items-center gap-2.5 rounded-full bg-dl-bg py-2 pl-3 pr-4 md:flex">
            <span className="flex size-[30px] items-center justify-center rounded-full bg-white">
              <MapPin className="size-[15px] text-dl-red" aria-hidden />
            </span>
            <span className="flex flex-col">
              <span className="text-[11px] font-medium text-dl-muted">Collecting samples in</span>
              <span className="text-sm font-bold text-dl-ink">Jamshedpur, 831001</span>
            </span>
          </div>

          <div className="flex-1" />

          <a
            href={GOOGLE_REVIEWS_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 text-sm md:flex"
          >
            <Star className="size-[15px] text-dl-star" fill="currentColor" aria-hidden />
            <span className="font-bold text-dl-ink">4.9</span>
            <span className="text-[13px] font-medium text-dl-ink-2">· 3,000+ Google reviews</span>
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="flex size-10 items-center justify-center rounded-full border border-dl-line text-dl-ink md:hidden"
          >
            <Menu className="size-[18px]" aria-hidden />
          </button>
        </div>

        {/* Phones: location + search */}
        <div className="flex flex-col gap-3 px-4 pb-3 md:hidden">
          <p className="flex items-center gap-1.5 text-[13px]">
            <MapPin className="size-3.5 text-dl-red" aria-hidden />
            <span className="text-dl-muted">Collecting in</span>
            <span className="font-bold text-dl-ink">Jamshedpur, 831001</span>
          </p>
          <SiteSearch variant="header" />
        </div>

        {/* Desktop nav row */}
        <nav
          aria-label="Main"
          className="hidden border-y border-dl-line md:block"
        >
          <div className="mx-auto flex max-w-[1440px] items-center justify-between px-10 xl:px-20">
            <ul className="flex items-center gap-6 lg:gap-8">
              <li>
                <button
                  type="button"
                  onClick={() => setMenuOpen(true)}
                  aria-expanded={menuOpen}
                  className="flex items-center gap-[7px] py-4 text-sm font-medium text-dl-ink-2 hover:text-dl-ink"
                >
                  <Menu className="size-4" aria-hidden />
                  Menu
                </button>
              </li>
              {desktopLinks.map(({ name, href, icon: Icon }) => {
                const active = isActive(href);
                return (
                  <li key={name}>
                    <Link
                      href={href}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center gap-[7px] border-b-2 py-[14px] text-sm ${
                        active
                          ? "border-dl-red font-bold text-dl-ink"
                          : "border-transparent font-medium text-dl-ink-2 hover:text-dl-ink"
                      }`}
                    >
                      <Icon className={`size-4 ${active ? "text-dl-red" : ""}`} aria-hidden />
                      {name}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <a href={PHONE_HREF} className="flex items-center gap-2.5">
              <span className="flex size-8 items-center justify-center rounded-full bg-dl-red-soft">
                <Phone className="size-[15px] text-dl-red" aria-hidden />
              </span>
              <span className="flex flex-col">
                <span className="text-[11px] font-medium text-dl-muted">Call to book · 6 AM – 9 PM</span>
                <span className="text-[15px] font-bold text-dl-ink">{PHONE_DISPLAY}</span>
              </span>
            </a>
          </div>
        </nav>

        {/* Phones: tabs */}
        <nav aria-label="Sections" className="border-b border-dl-line md:hidden">
          <ul className="no-scrollbar flex gap-[18px] overflow-x-auto px-4">
            {mobileTabs.map(({ name, href }) => {
              const active = isActive(href);
              return (
                <li key={name} className="shrink-0">
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={`block border-b-2 py-[11px] text-sm ${
                      active
                        ? "border-dl-red font-bold text-dl-ink"
                        : "border-transparent font-medium text-dl-muted"
                    }`}
                  >
                    {name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>

      {/* Slide-out menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[110] bg-black/50"
          onClick={() => setMenuOpen(false)}
          aria-hidden
        />
      )}
      <aside
        aria-label="Menu"
        className={`fixed inset-y-0 left-0 z-[120] flex w-[300px] flex-col bg-white shadow-2xl transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "invisible -translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-dl-line px-5 py-4">
          <Logo showTagline={false} />
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="flex size-9 items-center justify-center rounded-full bg-dl-bg text-dl-ink"
          >
            <X className="size-[18px]" aria-hidden />
          </button>
        </div>
        <ul className="flex-1 overflow-y-auto py-2">
          {menuLinks.map(({ name, href, icon: Icon }) => {
            const active = isActive(href);
            return (
              <li key={name}>
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-4 px-5 py-3.5 text-[15px] ${
                    active ? "font-bold text-dl-red" : "font-medium text-dl-ink hover:bg-dl-bg"
                  }`}
                >
                  <Icon className="size-5" aria-hidden />
                  <span className="flex-1">{name}</span>
                  <ChevronRight className="size-4 text-dl-muted" aria-hidden />
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="flex flex-col gap-2 border-t border-dl-line p-5">
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              setFormOpen(true);
            }}
            className={buttonClass("primary", "md", "w-full")}
          >
            Book home collection
          </button>
          <a href={PHONE_HREF} className={buttonClass("outline", "md", "w-full")}>
            <Phone className="size-4" aria-hidden />
            {PHONE_DISPLAY}
          </a>
        </div>
      </aside>

      <Modal isOpen={formOpen} onClose={() => setFormOpen(false)}>
        <EnquiryForm formType="home_collection" />
      </Modal>
    </>
  );
}

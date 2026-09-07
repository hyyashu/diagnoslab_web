"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FlaskConical, CalendarCheck, HeartPulse, Phone } from "lucide-react";
import Modal from "@/components/ui/modal";
import EnquiryForm from "@/components/forms/enquiryForm";

type Tab = {
  name: string;
  href: string;
  icon: React.ElementType;
};

const tabs: (Tab | null)[] = [
  { name: "Home", href: "/", icon: Home },
  { name: "Tests", href: "/tests", icon: FlaskConical },
  null,
  { name: "Packages", href: "/packages", icon: HeartPulse },
  { name: "Contact", href: "/contact-us", icon: Phone },
];

export default function BottomNav() {
  const pathname = usePathname();
  const [openForm, setOpenForm] = useState(false);

  const isActive = (href: string) => {
    const clean = href.split("#")[0];
    if (clean === "/") return pathname === "/";
    return pathname === clean || pathname.startsWith(clean + "/");
  };

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-[90] md:hidden">
        <div
          className="relative bg-white flex items-end justify-around"
          style={{
            boxShadow: "0 -2px 24px rgba(0,0,0,0.09)",
            borderTop: "1px solid rgba(0,0,0,0.06)",
            height: "64px",
            paddingBottom: "env(safe-area-inset-bottom, 0px)",
          }}
        >
          {tabs.map((tab) => {
            /* ── Center CTA ── */
            if (tab === null) {
              return (
                <div
                  key="cta"
                  className="flex flex-col items-center justify-end flex-1 pb-2"
                >
                  <button
                    onClick={() => setOpenForm(true)}
                    aria-label="Book a test"
                    style={{
                      background: "#E73834",
                      boxShadow:
                        "0 6px 24px rgba(231,56,52,0.42), 0 2px 8px rgba(231,56,52,0.2)",
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 2,
                      transform: "translateY(-18px)",
                      border: "3px solid white",
                      outline: "none",
                      transition: "transform 0.15s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.15s",
                    }}
                    className="active:scale-90"
                  >
                    <CalendarCheck size={22} color="white" strokeWidth={2.2} />
                  </button>
                  <span
                    className="font-heading font-bold text-[#E73834]"
                    style={{ fontSize: 10, marginTop: -12, letterSpacing: "0.02em" }}
                  >
                    Book
                  </span>
                </div>
              );
            }

            /* ── Regular Tab ── */
            const active = isActive(tab.href);
            const Icon = tab.icon;

            return (
              <Link
                key={tab.name}
                href={tab.href}
                className="flex flex-col items-center justify-end flex-1 pb-2 gap-[3px] relative"
                style={{ minWidth: 0 }}
              >
                {/* Top indicator */}
                <span
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: active ? 20 : 0,
                    height: 2.5,
                    borderRadius: 99,
                    background: "#E73834",
                    transition: "width 0.25s cubic-bezier(0.34,1.56,0.64,1)",
                  }}
                />

                {/* Icon */}
                <Icon
                  size={22}
                  strokeWidth={active ? 2.4 : 1.7}
                  style={{
                    color: active ? "#E73834" : "#9CA3AF",
                    transition: "color 0.18s, stroke-width 0.18s",
                  }}
                />

                {/* Label */}
                <span
                  className="font-heading font-bold"
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.01em",
                    color: active ? "#E73834" : "#9CA3AF",
                    transition: "color 0.18s",
                    lineHeight: 1,
                  }}
                >
                  {tab.name}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      <Modal isOpen={openForm} onClose={() => setOpenForm(false)}>
        <EnquiryForm formType="home_collection" />
      </Modal>
    </>
  );
}

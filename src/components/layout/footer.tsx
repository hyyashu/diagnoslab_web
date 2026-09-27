import Link from "next/link";
import { Award, Clock3, Instagram, Mail, MapPin, MessageCircle, ShieldCheck } from "lucide-react";
import Logo from "@/components/ui/logo";
import FooterLinkGroup from "@/components/layout/footerLinkGroup";
import { buttonClass } from "@/components/ui/button";
import { areas } from "@/lib/catalog";
import { EMAIL, INSTAGRAM_HREF, WHATSAPP_DISPLAY, WHATSAPP_HREF } from "@/lib/contact";

/* DL.pen "Site Footer" / "Mobile Footer". */

const linkGroups = [
  {
    title: "Tests",
    links: [
      { name: "Complete Blood Count", href: "/tests/complete-blood-count/" },
      { name: "Thyroid profile", href: "/tests/thyroid-function-profile-tft-free/" },
      { name: "HbA1c", href: "/tests/hba1c-test/" },
      { name: "Vitamin D", href: "/tests/vitamin-d/" },
      { name: "Lipid profile", href: "/tests/" },
    ],
  },
  {
    title: "Services",
    links: [
      { name: "Health packages", href: "/packages/" },
      { name: "Ultrasound", href: "/ultrasound-in-jamshedpur/" },
      { name: "Digital X-Ray", href: "/xray/" },
      { name: "ECG & 2D ECHO", href: "/ecg/" },
      { name: "Home collection", href: "/book-a-test/" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About us", href: "/aboutUs/" },
      { name: "Corporate tie-ups", href: "/corporate/" },
      { name: "Privacy policy", href: "/policy/" },
      { name: "Contact us", href: "/contact-us/" },
    ],
  },
];

const visit = [
  { icon: MapPin, text: "Sakchi · Jugsalai · Adityapur" },
  { icon: Clock3, text: "Mon–Sun, 7:30 AM – 7:30 PM" },
  { icon: Mail, text: EMAIL, href: `mailto:${EMAIL}` },
];

/* The design's list, in its order. The last five only fit on desktop. */
const servedAreas = [
  "Sakchi", "Bistupur", "Sonari", "Kadma", "Mango", "Telco", "Golmuri", "Jugsalai", "Adityapur",
  "Dimna", "Baridih", "Birsanagar", "Agrico", "Parsudih",
];
const areaSlug = new Map(areas.map((a) => [a.name, a.slug]));

export default function Footer() {
  return (
    <footer className="bg-dl-ink text-white">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-7 px-4 pt-8 pb-7 md:gap-12 md:px-10 md:pt-16 md:pb-8 xl:px-20">
        {/* WhatsApp strip */}
        <div className="flex flex-col gap-4 rounded-[20px] border border-white/10 bg-white/[0.04] p-[18px] md:flex-row md:items-center md:justify-between md:rounded-3xl md:px-7 md:py-6">
          <div className="flex items-center gap-3 md:gap-[18px]">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-[13px] bg-dl-whatsapp md:size-[52px] md:rounded-2xl">
              <MessageCircle className="size-5 md:size-6" aria-hidden />
            </span>
            <span className="flex flex-col gap-1">
              <span className="font-display text-[15px] font-bold leading-snug md:text-xl md:tracking-[-0.015em]">
                Book, track and get reports on WhatsApp
              </span>
              <span className="hidden text-sm text-white/65 md:block">
                Message us any time — our team replies from 7:30 AM to 7:30 PM, every day.
              </span>
            </span>
          </div>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass("whatsapp", "md", "w-full md:w-auto")}
          >
            Chat on {WHATSAPP_DISPLAY}
            <MessageCircle className="size-4" aria-hidden />
          </a>
        </div>

        {/* Columns */}
        <div className="flex flex-col gap-7 md:grid md:grid-cols-[minmax(0,360px)_repeat(4,minmax(0,1fr))] md:gap-12">
          <div className="flex flex-col gap-3.5 md:gap-[18px]">
            <Logo tone="dark" showTagline={false} />
            <p className="text-[13px] leading-relaxed text-white/65 md:text-sm">
              Accurate diagnostics since 2010. Pathology, ultrasound, X-ray, ECG, ECHO and PFT under one roof in Jamshedpur.
            </p>
            <ul className="hidden gap-2 md:flex">
              {[
                { icon: ShieldCheck, text: "ISO certified" },
                { icon: Award, text: "15+ years" },
              ].map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  className="flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 text-[12.5px] text-white/85"
                >
                  <Icon className="size-3.5 text-white" aria-hidden />
                  {text}
                </li>
              ))}
            </ul>
            <ul className="flex flex-col gap-2 md:hidden">
              {visit.map(({ icon: Icon, text, href }) => (
                <li key={text} className="flex items-center gap-2 text-[13px] text-white/90">
                  <Icon className="size-3.5 text-white/50" aria-hidden />
                  {href ? <a href={href}>{text}</a> : text}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col md:contents">
            {linkGroups.map((group) => (
              <FooterLinkGroup key={group.title} {...group} />
            ))}
          </div>

          <div className="hidden flex-col gap-3 md:flex">
            <p className="pb-0 text-[13px] font-bold tracking-[0.1em] text-white/50">Visit us</p>
            {visit.map(({ text, href }) => (
              <p key={text} className="text-[14.5px] text-white/90">
                {href ? <a href={href} className="hover:underline">{text}</a> : text}
              </p>
            ))}
          </div>
        </div>

        {/* Areas */}
        <div className="flex flex-col gap-3 md:gap-3.5 md:border-t md:border-white/10 md:pt-8">
          <p className="text-sm font-semibold text-white/70 md:text-[13px]">Home collection across Jamshedpur</p>
          <ul className="flex flex-wrap gap-2">
            {servedAreas.map((name, i) => {
              const slug = areaSlug.get(name);
              const chip =
                "block rounded-full border border-white/20 px-3 py-1.5 text-xs text-white/85 md:px-3.5 md:py-[7px] md:text-[13px]";
              return (
                <li key={name} className={i >= 9 ? "hidden md:block" : ""}>
                  {slug ? (
                    <Link href={`/area/${slug}/`} className={`${chip} hover:border-white/50 hover:text-white`}>
                      {name}
                    </Link>
                  ) : (
                    <span className={chip}>{name}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Bottom */}
        <div className="flex flex-col-reverse gap-3.5 border-t border-white/10 pt-5 md:flex-row md:items-center md:justify-between md:pt-6">
          <p className="text-xs text-white/50 md:text-[13px]">© 2026 Diagnos Labs. All rights reserved.</p>
          <a
            href={INSTAGRAM_HREF}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Diagnos Lab on Instagram"
            className="flex size-9 items-center justify-center rounded-full border border-white/20 hover:border-white/50"
          >
            <Instagram className="size-4" aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}

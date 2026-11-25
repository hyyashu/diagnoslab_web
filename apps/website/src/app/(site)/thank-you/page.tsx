import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Clock3, MessageCircle, Phone } from "lucide-react";
import { buttonClass } from "@/components/ui/button";
import { shell } from "@/components/ui/shell";
import { HOURS_DISPLAY, PHONE_DISPLAY, PHONE_HREF, WHATSAPP_HREF } from "@/lib/contact";
import { pageUrl } from "@/lib/schema";
import { ENHANCED_CONVERSION_SCRIPT } from "@/lib/leadConversion";
import LeadConversion from "./components/leadConversion";

/* Where every lead form lands after a successful submission, so ad
   platforms can count conversions by URL. Not for search: noindex, and
   left out of the sitemaps. */
export const metadata: Metadata = {
  title: "Thank you",
  description: "Your request has reached Diagnos Lab. Our team will call you back shortly.",
  alternates: {
    canonical: pageUrl("/thank-you/"),
  },
  robots: {
    index: false,
    follow: false,
  },
};

const nextLinks = [
  { label: "Back to home", href: "/" },
  { label: "Browse lab tests", href: "/tests/" },
  { label: "Health packages", href: "/packages/" },
];

export default function ThankYouPage() {
  return (
    <section className="border-b border-dl-line bg-linear-to-b from-dl-red-soft to-dl-bg">
      {/* Hashed phone and email for Google Ads enhanced conversions. */}
      <script dangerouslySetInnerHTML={{ __html: ENHANCED_CONVERSION_SCRIPT }} />
      <LeadConversion />
      <div className={`${shell} flex flex-col items-center gap-6 py-14 text-center md:gap-8 md:py-24`}>
        <span className="flex size-16 items-center justify-center rounded-full bg-dl-green/10 text-dl-green md:size-20">
          <Check className="size-8 md:size-10" aria-hidden />
        </span>

        <div className="flex max-w-[620px] flex-col gap-3">
          <h1 className="font-display text-[30px] font-extrabold leading-[1.1] tracking-[-0.03em] text-dl-ink md:text-[46px]">
            Thank you! We&apos;ve got your request.
          </h1>
          <p className="text-[15px] leading-normal text-dl-ink-2 md:text-[17px] md:leading-[1.55]">
            Our team will call you back shortly on the number you shared.
          </p>
          <p className="inline-flex items-center justify-center gap-2 text-sm font-medium text-dl-muted">
            <Clock3 className="size-4" aria-hidden />
            {HOURS_DISPLAY}
          </p>
        </div>

        <div className="flex w-full max-w-[420px] flex-col gap-3 md:w-auto md:max-w-none md:flex-row">
          <a href={PHONE_HREF} className={buttonClass("primary", "lg")}>
            <Phone className="size-4" aria-hidden />
            Call {PHONE_DISPLAY}
          </a>
          <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className={buttonClass("whatsapp", "lg")}>
            <MessageCircle className="size-4" aria-hidden />
            Chat on WhatsApp
          </a>
        </div>

        <nav aria-label="Keep browsing" className="flex flex-wrap justify-center gap-2.5 pt-2">
          {nextLinks.map(({ label, href }) => (
            <Link key={href} href={href} className={buttonClass("neutral", "sm")}>
              {label}
              <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}

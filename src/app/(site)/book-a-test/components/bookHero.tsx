import { Clock3, FileCheck, MessageCircle, Phone, Star } from "lucide-react";
import ServicePageHero from "@/components/sections/servicePageHero";
import { PHONE_DISPLAY, PHONE_HREF, WHATSAPP_HREF } from "@/lib/contact";

/* DL.pen "Book a Test" hero: the shared service hero with the design's two
   large call and WhatsApp buttons in place of its CTAs. */
export default function BookHero() {
  return (
    <ServicePageHero
      breadcrumb={[{ label: "Home", href: "/" }, { label: "Book a test" }]}
      eyebrow="Taking bookings now · 7:30 AM – 7:30 PM, every day"
      title="Book a blood test in Jamshedpur, collected at home from 6 AM"
      subtitle="Call, WhatsApp or leave your number. Our team confirms your test, price and slot in one quick call. Same-day digital reports."
      proofPoints={[
        { icon: Clock3, value: "6 AM", label: "Home collection starts", mobileLabel: "Collection" },
        { icon: FileCheck, value: "Same day", label: "Most blood reports", mobileLabel: "Reports" },
        { icon: Star, value: "4.9", label: "3,000+ Google reviews", mobileLabel: "Google rating" },
      ]}
      cta={{ label: "Request a call back", href: "#enquiry-form" }}
      actions={
        <div className="flex flex-col gap-2.5 sm:flex-row sm:gap-3">
          <a
            href={PHONE_HREF}
            className="flex items-center gap-3 rounded-full bg-dl-red py-3 pl-3.5 pr-6 text-white transition-colors hover:bg-dl-red-dark"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/20">
              <Phone className="size-[17px]" aria-hidden />
            </span>
            <span className="flex flex-col">
              <span className="text-xs font-semibold text-white/80">Call to book</span>
              <span className="font-display text-[17px] font-extrabold">{PHONE_DISPLAY}</span>
            </span>
          </a>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-full border border-dl-line bg-white py-3 pl-3.5 pr-6 transition-colors hover:border-dl-ink"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-dl-whatsapp text-white">
              <MessageCircle className="size-[17px]" aria-hidden />
            </span>
            <span className="flex flex-col">
              <span className="text-xs font-semibold text-dl-muted">Send prescription</span>
              <span className="font-display text-[17px] font-extrabold text-dl-ink">WhatsApp us</span>
            </span>
          </a>
        </div>
      }
      form={{
        title: "Get a call back",
        subtitle: "Leave your number and we'll call to confirm your test, price and a convenient slot.",
        needs: ["Blood test", "Health package", "Ultrasound", "X-Ray", "ECG / ECHO", "Not sure"],
        note: "We never share your number. No spam.",
      }}
    />
  );
}

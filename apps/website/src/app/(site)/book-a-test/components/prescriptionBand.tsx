import { FileText, MessageCircle, Phone } from "lucide-react";
import { buttonClass } from "@/components/ui/button";
import { shell } from "@/components/ui/shell";
import { PHONE_HREF, WHATSAPP_HREF } from "@/lib/contact";

/* DL.pen "Prescription CTA": a red band asking for a photo of the
   prescription on WhatsApp. */
export default function PrescriptionBand() {
  return (
    <section aria-labelledby="prescription-heading" className="bg-white pb-10 md:pb-[72px]">
      <div className={shell}>
        <div className="flex flex-col gap-5 rounded-3xl bg-dl-red p-6 text-white md:flex-row md:items-center md:gap-8 md:px-10 md:py-8">
          <span className="flex size-14 shrink-0 items-center justify-center rounded-[18px] bg-white/15 md:size-16">
            <FileText className="size-7 md:size-[30px]" aria-hidden />
          </span>
          <div className="flex flex-1 flex-col gap-1.5">
            <h2 id="prescription-heading" className="font-display text-xl font-extrabold tracking-[-0.02em] md:text-2xl">
              Have a doctor&apos;s prescription? Just send us a photo.
            </h2>
            <p className="text-sm leading-normal text-white/85 md:text-[15px]">
              WhatsApp it to us and we&apos;ll tell you the exact tests, total price and the earliest home collection slot.
            </p>
          </div>
          <div className="flex flex-col gap-2.5 sm:flex-row md:shrink-0">
            <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className={buttonClass("whiteInk", "lg")}>
              <MessageCircle className="size-[17px] text-dl-whatsapp" aria-hidden />
              WhatsApp prescription
            </a>
            <a href={PHONE_HREF} className={buttonClass("neutralDark", "lg")}>
              <Phone className="size-4" aria-hidden />
              Call us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

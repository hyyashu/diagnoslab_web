import { Clock3, FileCheck, MessageCircle, Phone, Star } from "lucide-react";
import CallbackForm from "@/components/forms/callbackForm";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { shell } from "@/components/ui/shell";
import { PHONE_DISPLAY, PHONE_HREF, WHATSAPP_HREF } from "@/lib/contact";

const proofPoints = [
  { icon: Clock3, value: "6 AM", label: "Home collection starts", mobileLabel: "Collection" },
  { icon: FileCheck, value: "Same day", label: "Most blood reports", mobileLabel: "Reports" },
  { icon: Star, value: "4.9", label: "2,700+ Google reviews", mobileLabel: "Google rating" },
];

/* Book a Test hero. Most visitors arrive from ads on a phone, so phones
   read headline, form, then the call and WhatsApp buttons and proof
   points; desktop keeps copy on the left and the form beside it. */
export default function BookHero() {
  return (
    <section className="bg-linear-to-b from-dl-red-soft to-dl-bg">
      <div
        className={`${shell} grid gap-4 pt-4 pb-9 md:grid-cols-[minmax(0,1fr)_minmax(0,400px)] md:grid-rows-[auto_auto] md:gap-x-10 md:gap-y-7 md:py-16 xl:grid-cols-[minmax(0,1fr)_440px] xl:gap-x-16`}
      >
        <div className="flex flex-col gap-5 md:col-start-1 md:row-start-1 md:gap-7 md:self-end">
          <div className="hidden md:block">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Book a test" }]} />
          </div>
          <div className="flex flex-col gap-2.5 md:gap-5">
            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-dl-line bg-white py-1 pl-2.5 pr-3 text-xs font-semibold text-dl-ink-2 md:py-[7px] md:pr-3.5 md:text-[13px]">
              <span className="size-[7px] rounded-full bg-dl-green md:size-2" aria-hidden />
              NABL &amp; ISO accredited lab · Since 2009
            </p>
            <h1 className="font-display text-[27px] font-extrabold leading-[1.12] tracking-[-0.03em] text-dl-ink md:text-[40px] xl:text-[46px] xl:leading-[1.08]">
              Book a blood test in Jamshedpur
            </h1>
            <p className="max-w-[600px] text-sm leading-normal text-dl-ink-2 md:text-[17px] md:leading-[1.55]">
              We collect your sample at home, or you can walk in at our Sakchi lab. One quick call confirms your test,
              price and slot.
            </p>
          </div>
        </div>

        <div className="md:col-start-2 md:row-span-2 md:row-start-1 md:self-center">
          <CallbackForm
            title="Book with a quick call"
            subtitle=""
            needs={["Blood test", "Package", "Ultrasound", "X-Ray", "ECG / ECHO", "Not sure"]}
            note="We never share your number. No spam."
          />
        </div>

        <div className="flex flex-col gap-4 md:col-start-1 md:row-start-2 md:gap-7 md:self-start">
          <div className="grid grid-cols-2 gap-2.5 sm:flex sm:gap-3">
            <a
              href={PHONE_HREF}
              className="flex items-center gap-2.5 rounded-full bg-dl-red py-2.5 pl-2.5 pr-4 text-white transition-colors hover:bg-dl-red-dark md:gap-3 md:py-3 md:pl-3.5 md:pr-6"
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/20 md:size-9">
                <Phone className="size-4 md:size-[17px]" aria-hidden />
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="text-[11px] font-semibold text-white/80 md:text-xs">Call to book</span>
                <span className="font-display text-sm font-extrabold md:text-[17px]">
                  <span className="md:hidden">Call us</span>
                  <span className="hidden md:inline">{PHONE_DISPLAY}</span>
                </span>
              </span>
            </a>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 rounded-full border border-dl-line bg-white py-2.5 pl-2.5 pr-4 transition-colors hover:border-dl-ink md:gap-3 md:py-3 md:pl-3.5 md:pr-6"
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-dl-whatsapp text-white md:size-9">
                <MessageCircle className="size-4 md:size-[17px]" aria-hidden />
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="text-[11px] font-semibold text-dl-muted md:text-xs">Send prescription</span>
                <span className="font-display text-sm font-extrabold text-dl-ink md:text-[17px]">WhatsApp us</span>
              </span>
            </a>
          </div>

          <ul className="grid grid-cols-3 gap-2 md:flex md:flex-wrap md:gap-8">
            {proofPoints.map(({ icon: Icon, value, label, mobileLabel }) => (
              <li
                key={value}
                className="flex items-center gap-2 rounded-2xl border border-dl-line bg-white px-2.5 py-2.5 md:gap-3 md:border-0 md:bg-transparent md:p-0"
              >
                <span className="hidden size-11 shrink-0 items-center justify-center rounded-xl bg-white text-dl-red shadow-[0_4px_14px_rgba(22,24,29,0.06)] md:flex">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="flex flex-col">
                  <span className="font-display text-[15px] font-extrabold text-dl-ink md:text-[17px]">{value}</span>
                  <span className="text-[11px] text-dl-muted md:text-[12.5px] md:text-dl-ink-2">
                    <span className="md:hidden">{mobileLabel}</span>
                    <span className="hidden md:inline">{label}</span>
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

import { ArrowUpRight, Mail, MessageCircle, Phone } from "lucide-react";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { shell } from "@/components/ui/shell";
import { EMAIL, PHONE_DISPLAY, PHONE_HREF, WHATSAPP_DISPLAY, WHATSAPP_HREF } from "@/lib/contact";
import ContactForm from "./contactForm";

const action =
  "inline-flex items-center gap-1.5 rounded-full border border-dl-line px-4 py-2 text-[13.5px] font-semibold text-dl-ink transition-colors hover:border-dl-ink";

/* DL.pen Contact Us "Hero": the two ways to reach us beside the message
   form. */
export default function ContactHero() {
  return (
    <section className="bg-linear-to-b from-dl-red-soft to-dl-bg">
      <div className={`${shell} grid gap-8 pt-5 pb-10 md:grid-cols-[minmax(0,1fr)_minmax(0,420px)] md:items-center md:gap-10 md:pt-10 md:pb-[72px] xl:grid-cols-[minmax(0,1fr)_460px] xl:gap-16`}>
        <div className="flex flex-col gap-6 md:gap-7">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact us" }]} />

          <div className="flex flex-col gap-3 md:gap-3.5">
            <h1 className="font-display text-[30px] font-extrabold leading-[1.1] tracking-[-0.03em] text-dl-ink md:text-[40px] xl:text-[46px] xl:leading-[1.08]">
              Talk to a real person.
            </h1>
            <p className="max-w-[640px] text-sm leading-normal text-dl-ink-2 md:text-[17px] md:leading-[1.55]">
              Questions about a test, a report, a bill or a home collection slot? Call or WhatsApp us and someone from
              our Sakchi team will pick up, usually within a minute.
            </p>
          </div>

          <ul className="flex flex-col divide-y divide-dl-line overflow-hidden rounded-[20px] border border-dl-line bg-white">
            <li className="flex flex-wrap items-center gap-x-4 gap-y-3 px-4 py-4 md:flex-nowrap md:px-[22px] md:py-[18px]">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-dl-red text-white">
                <Phone className="size-5" aria-hidden />
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-[3px]">
                <span className="flex flex-wrap items-baseline gap-x-2.5">
                  <span className="text-[13px] font-semibold text-dl-muted">Call</span>
                  <a href={PHONE_HREF} className="font-display text-lg font-bold text-dl-ink">{PHONE_DISPLAY}</a>
                </span>
                <span className="text-[13px] text-dl-ink-2 md:text-[13.5px]">
                  Bookings and slot changes · WhatsApp prescriptions to {WHATSAPP_DISPLAY}
                </span>
              </span>
              <span className="flex w-full gap-2 md:w-auto">
                <a href={PHONE_HREF} className={`${action} flex-1 justify-center md:flex-none`}>
                  Call
                  <Phone className="size-[15px]" aria-hidden />
                </a>
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-dl-whatsapp px-4 py-2 text-[13.5px] font-semibold text-white hover:brightness-95 md:flex-none"
                >
                  <MessageCircle className="size-[15px]" aria-hidden />
                  WhatsApp
                </a>
              </span>
            </li>
            <li className="flex flex-wrap items-center gap-x-4 gap-y-3 px-4 py-4 md:flex-nowrap md:px-[22px] md:py-[18px]">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-dl-red-soft text-dl-red">
                <Mail className="size-5" aria-hidden />
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-[3px]">
                <span className="flex flex-wrap items-baseline gap-x-2.5">
                  <span className="text-[13px] font-semibold text-dl-muted">Email</span>
                  <a href={`mailto:${EMAIL}`} className="font-display text-lg font-bold text-dl-ink">{EMAIL}</a>
                </span>
                <span className="text-[13px] text-dl-ink-2 md:text-[13.5px]">
                  Reports, billing, tie-ups, careers and everything else · reply in 24 hrs
                </span>
              </span>
              <a href={`mailto:${EMAIL}`} className={`${action} w-full justify-center md:w-auto`}>
                Write
                <ArrowUpRight className="size-[15px]" aria-hidden />
              </a>
            </li>
          </ul>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}

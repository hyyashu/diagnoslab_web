import { Fragment } from "react";
import { ArrowRight, ClipboardCheck, FileCheck, PhoneCall } from "lucide-react";
import { shell } from "@/components/ui/shell";

const steps = [
  { icon: PhoneCall, title: "Call, WhatsApp or request a call back", text: "Takes under a minute" },
  { icon: ClipboardCheck, title: "We confirm test, price & slot", text: "Ask us anything, no obligation" },
  { icon: FileCheck, title: "Sample collected, reports on WhatsApp", text: "At home or at our centre" },
];

/* DL.pen "How Booking Works": a thin strip of three steps under the hero. */
export default function BookingSteps() {
  return (
    <section aria-labelledby="booking-steps-heading" className="border-y border-dl-line bg-white">
      <div className={`${shell} flex flex-col gap-5 py-7 md:flex-row md:items-center md:gap-6 md:py-8`}>
        <div className="flex flex-col gap-1 md:w-[200px] md:shrink-0">
          <p className="text-xs font-bold tracking-[0.12em] text-dl-red">HOW BOOKING WORKS</p>
          <h2 id="booking-steps-heading" className="font-display text-xl font-extrabold tracking-[-0.02em] text-dl-ink">
            Booked in one call
          </h2>
        </div>
        <ol className="flex flex-col gap-4 md:flex-1 md:flex-row md:items-center md:gap-6">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <Fragment key={title}>
              {i > 0 && <ArrowRight className="hidden size-[18px] shrink-0 text-dl-line md:block" aria-hidden />}
              <li className="flex items-center gap-3.5 md:flex-1">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-dl-red-soft text-dl-red">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="font-display text-[15px] font-bold leading-snug text-dl-ink">{title}</span>
                  <span className="text-[12.5px] text-dl-muted">{text}</span>
                </span>
              </li>
            </Fragment>
          ))}
        </ol>
      </div>
    </section>
  );
}

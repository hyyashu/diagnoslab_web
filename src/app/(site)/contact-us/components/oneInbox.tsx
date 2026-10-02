import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Mail, Phone, ShieldCheck } from "lucide-react";
import { shell } from "@/components/ui/shell";
import { EMAIL, PHONE_DISPLAY, PHONE_HREF } from "@/lib/contact";

const contacts = [
  { icon: Phone, value: PHONE_DISPLAY, text: "Call or WhatsApp · 7:30 AM – 7:30 PM, every day", href: PHONE_HREF },
  { icon: Mail, value: EMAIL, text: "Write any time · we reply within 24 hours", href: `mailto:${EMAIL}` },
];

const checklist = [
  "Patient name and age",
  "Phone number used for booking",
  "Booking ID (on your SMS / WhatsApp)",
  "Test name and the date of sample collection",
];

/* DL.pen Contact Us "One Inbox": the phone and email for everything else,
   what to have ready, and the grievance route. */
export default function OneInbox() {
  return (
    <section aria-labelledby="inbox-heading" className="bg-dl-bg py-10 md:pt-[88px] md:pb-24">
      <div className={`${shell} flex flex-col gap-8 md:gap-10`}>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_500px] lg:items-center lg:gap-20">
          <div className="flex flex-col gap-6 md:gap-7">
            <div className="flex flex-col gap-2.5 md:gap-3">
              <p className="text-xs font-bold tracking-[0.12em] text-dl-red">FOR EVERYTHING ELSE</p>
              <h2 id="inbox-heading" className="font-display text-[24px] font-extrabold tracking-[-0.03em] text-dl-ink md:text-[36px]">
                One number, one inbox for everything.
              </h2>
              <p className="text-sm leading-normal text-dl-ink-2 md:text-base">
                Reports, bills, refunds, doctor tie-ups or job applications: it all reaches the same care team, and
                they&apos;ll pass it to the right person.
              </p>
            </div>

            <ul className="flex flex-col divide-y divide-dl-line border-t border-dl-ink">
              {contacts.map(({ icon: Icon, value, text, href }) => (
                <li key={value}>
                  <a href={href} className="group flex items-center gap-4 py-5">
                    <Icon className="size-[22px] shrink-0 text-dl-red" aria-hidden />
                    <span className="flex min-w-0 flex-1 flex-col gap-[3px]">
                      <span className="font-display text-lg font-bold break-words text-dl-ink md:text-2xl">{value}</span>
                      <span className="text-[13px] text-dl-ink-2 md:text-sm">{text}</span>
                    </span>
                    <ArrowUpRight className="size-5 shrink-0 text-dl-ink transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-5 rounded-3xl border border-dl-line bg-white p-5 md:p-8">
            <h3 className="font-display text-lg font-bold text-dl-ink md:text-xl">Help us find your record faster</h3>
            <ul className="flex flex-col gap-3.5">
              {checklist.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-dl-ink-2 md:text-[15px]">
                  <span className="flex size-[22px] shrink-0 items-center justify-center rounded-full bg-dl-green/10 text-dl-green">
                    <Check className="size-[13px]" strokeWidth={3} aria-hidden />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-2xl border border-dl-line bg-white px-4 py-4 md:flex-row md:items-center md:gap-4 md:px-[22px] md:py-[18px]">
          <ShieldCheck className="size-5 shrink-0 text-dl-green" aria-hidden />
          <p className="flex-1 text-[13.5px] leading-normal text-dl-ink-2 md:text-sm">
            Not happy with how we resolved something? Email {EMAIL} with the subject &quot;Grievance&quot;.
          </p>
          <Link href="/policy/" className="flex shrink-0 items-center gap-1 text-sm font-semibold text-dl-red hover:underline">
            Read our policies
            <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}

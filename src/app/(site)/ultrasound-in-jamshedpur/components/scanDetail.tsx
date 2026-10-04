import Link from "next/link";
import { ArrowRight, CalendarClock, Check, Clock3, FileCheck, IdCard, ShieldAlert } from "lucide-react";
import Icon from "@/components/ui/icon";
import { shell } from "@/components/ui/shell";
import { PCPNDT_NOTICE } from "@/lib/contact";
import type { PregnancyScan } from "@/lib/catalog";

/* One pregnancy scan's page body: what it is and checks, beside an "at a
   glance" card with timing, duration, report and preparation. */
export default function ScanDetail({ scan }: { scan: PregnancyScan }) {
  const glance = [
    { icon: CalendarClock, label: "When", value: scan.timing },
    { icon: Clock3, label: "Scan time", value: scan.duration },
    { icon: FileCheck, label: "Report", value: "1–2 hours, sent to your WhatsApp automatically" },
  ];

  return (
    <section aria-labelledby="scan-about-heading" className="bg-white py-10 md:py-24">
      <div className={`${shell} grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,1fr)_440px] lg:gap-16`}>
        <div className="flex flex-col gap-6 md:gap-8">
          <div className="flex flex-col gap-3">
            <p className="text-xs font-bold tracking-[0.12em] text-dl-red">ABOUT THE SCAN</p>
            <h2 id="scan-about-heading" className="font-display text-[24px] font-extrabold tracking-[-0.03em] text-dl-ink md:text-[34px]">
              What is a {scan.title.replace("Scan", "scan")}?
            </h2>
            <p className="text-[15px] leading-relaxed text-dl-ink-2 md:text-base">{scan.about}</p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-display text-lg font-bold text-dl-ink md:text-xl">What the scan checks</h3>
            <ul className="grid gap-3 sm:grid-cols-2">
              {scan.checks.map((c) => (
                <li key={c} className="flex items-start gap-3 rounded-2xl border border-dl-line bg-dl-bg p-4 text-sm leading-normal text-dl-ink md:text-[15px]">
                  <span className="flex size-[22px] shrink-0 items-center justify-center rounded-full bg-dl-green/10 text-dl-green">
                    <Check className="size-[13px]" strokeWidth={3} aria-hidden />
                  </span>
                  {c}
                </li>
              ))}
            </ul>
          </div>

          {"relatedTest" in scan && scan.relatedTest && (
            <Link
              href={scan.relatedTest.href}
              className="flex w-fit items-center gap-2 text-sm font-semibold text-dl-red hover:underline"
            >
              Often done with the {scan.relatedTest.label}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          )}

          <p
            role="note"
            className="flex items-start gap-3 rounded-2xl border border-dl-red/30 bg-dl-red-soft/40 px-4 py-3.5 text-[13.5px] font-semibold leading-normal text-dl-ink md:px-5 md:text-sm"
          >
            <ShieldAlert className="mt-px size-5 shrink-0 text-dl-red" aria-hidden />
            {PCPNDT_NOTICE}
          </p>
        </div>

        <aside className="flex h-fit flex-col gap-6 rounded-3xl bg-dl-ink p-6 text-white md:p-8 lg:sticky lg:top-28">
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-xl bg-white/10">
              <Icon name={scan.icon} className="size-5" />
            </span>
            <h3 className="font-display text-[22px] font-extrabold tracking-[-0.02em]">At a glance</h3>
          </div>
          <dl className="flex flex-col gap-4">
            {glance.map(({ icon: GlanceIcon, label, value }) => (
              <div key={label} className="relative flex flex-col gap-0.5 pl-[30px]">
                <dt className="text-xs font-semibold tracking-[0.06em] text-white/60">
                  <GlanceIcon className="absolute top-0.5 left-0 size-[18px] text-[#FF8A80]" aria-hidden />
                  {label.toUpperCase()}
                </dt>
                <dd className="text-sm leading-normal text-white/90 md:text-[15px]">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-col gap-3 border-t border-white/15 pt-5">
            <p className="text-xs font-semibold tracking-[0.06em] text-white/60">HOW TO PREPARE</p>
            <ul className="flex flex-col gap-2.5">
              {scan.prepSteps.map((step) => (
                <li key={step} className="flex gap-3 text-sm leading-normal text-white/90">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-dl-red">
                    <Check className="size-3" aria-hidden />
                  </span>
                  {step}
                </li>
              ))}
            </ul>
          </div>
          <p className="flex items-start gap-2.5 rounded-2xl bg-white/[0.07] p-4 text-[13px] leading-normal text-white/80">
            <IdCard className="mt-px size-4 shrink-0" aria-hidden />
            Bring your doctor&apos;s referral and a photo ID. Form F, required by law for pregnancy scans, is filled in at the centre.
          </p>
        </aside>
      </div>
    </section>
  );
}

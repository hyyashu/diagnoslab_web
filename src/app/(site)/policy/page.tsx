import type { Metadata } from "next";
import Link from "next/link";
import { CalendarCheck, Check, ChevronRight, Phone, Sparkles } from "lucide-react";
import { shell } from "@/components/ui/shell";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/contact";
import PolicyNav from "./components/policyNav";
import { LAST_UPDATED, inShort, privacyIntro, privacySections } from "./content";

export const metadata: Metadata = {
  title: { absolute: "Privacy Policy | Diagnos Lab Jamshedpur" },
  description:
    "How Diagnos Lab, Jamshedpur handles your samples, your data and your reports: what we collect, who we share it with, how long we keep it and your rights.",
  alternates: {
    canonical: "https://diagnoslab.in/policy/",
  },
  openGraph: {
    url: "https://diagnoslab.in/policy/",
  },
  robots: {
    index: true,
    follow: false,
  },
};

/* DL.pen "Diagnos Lab — Policies": a title band, then the policy beside a
   sticky "on this page" nav. */
export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="border-b border-dl-line bg-linear-to-b from-dl-red-soft to-dl-bg">
        <div className={`${shell} flex flex-col gap-5 pt-5 pb-8 md:gap-[22px] md:pt-10 md:pb-14`}>
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5 text-xs text-dl-muted md:text-[13px]">
              <li className="flex items-center gap-1.5">
                <Link href="/" className="hover:text-dl-ink">Home</Link>
                <ChevronRight className="size-3.5" aria-hidden />
              </li>
              <li aria-current="page" className="font-semibold text-dl-ink">Policies</li>
            </ol>
          </nav>
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-10">
            <div className="flex max-w-[620px] flex-col gap-2.5 md:gap-3">
              <h1 className="font-display text-[30px] font-extrabold tracking-[-0.03em] text-dl-ink md:text-[46px]">
                Policies &amp; terms
              </h1>
              <p className="text-sm leading-normal text-dl-ink-2 md:text-[17px] md:leading-[1.55]">
                How we handle your samples, your data and your money, written to be read, not skimmed past.
              </p>
            </div>
            <p className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-dl-line bg-white px-4 py-2.5 text-[13px] font-semibold text-dl-ink">
              <CalendarCheck className="size-[15px] text-dl-green" aria-hidden />
              Last updated {LAST_UPDATED}
            </p>
          </div>
        </div>
      </section>

      <div className={`${shell} grid grid-cols-[minmax(0,1fr)] gap-8 pt-8 pb-12 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-[72px] lg:pt-14 lg:pb-24`}>
        <aside className="flex flex-col gap-7 lg:sticky lg:top-28 lg:self-start">
          <PolicyNav />
          <div className="hidden flex-col gap-2.5 rounded-2xl bg-dl-red-soft p-5 lg:flex">
            <p className="font-display text-base font-bold text-dl-ink">Questions about a policy?</p>
            <p className="text-[13.5px] leading-normal text-dl-ink-2">Our care team can explain anything here in plain words.</p>
            <a href={PHONE_HREF} className="flex items-center gap-1.5 pt-1 text-sm font-bold text-dl-red hover:underline">
              <Phone className="size-3.5" aria-hidden />
              {PHONE_DISPLAY}
            </a>
          </div>
        </aside>

        <article className="flex min-w-0 max-w-[928px] flex-col gap-9 md:gap-11">
          <header id="privacy" className="flex scroll-mt-32 flex-col gap-3">
            <p className="text-xs font-bold tracking-[0.12em] text-dl-red">PRIVACY POLICY</p>
            <h2 className="font-display text-[24px] font-extrabold tracking-[-0.03em] text-dl-ink md:text-[34px]">
              Your health data stays yours.
            </h2>
            <p className="text-[15px] leading-relaxed text-dl-ink-2 md:text-base">{privacyIntro}</p>
          </header>

          <section aria-labelledby="in-short-heading" className="flex flex-col gap-4 rounded-[20px] border border-dl-line bg-white p-5 md:p-7">
            <h3 id="in-short-heading" className="flex items-center gap-2.5 font-display text-lg font-bold text-dl-ink">
              <Sparkles className="size-[18px] text-dl-red" aria-hidden />
              The short version
            </h3>
            <ul className="grid gap-3.5 md:grid-cols-2 md:gap-x-6">
              {inShort.map((point) => (
                <li key={point} className="flex gap-2.5 text-sm leading-normal text-dl-ink-2 md:text-[14.5px]">
                  <span className="flex size-[22px] shrink-0 items-center justify-center rounded-full bg-dl-green/10 text-dl-green">
                    <Check className="size-[13px]" strokeWidth={3} aria-hidden />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </section>

          {privacySections.map(({ id, title, text, bullets }, i) => (
            <section key={id} id={id} aria-labelledby={`${id}-heading`} className="flex scroll-mt-32 flex-col gap-3.5 border-t border-dl-line pt-8">
              <h3 id={`${id}-heading`} className="flex items-baseline gap-3.5 font-display text-xl font-bold text-dl-ink md:text-2xl">
                <span className="text-sm font-bold text-dl-red">{String(i + 1).padStart(2, "0")}</span>
                {title}
              </h3>
              <p className="text-[15px] leading-relaxed text-dl-ink-2 md:text-base">{text}</p>
              {bullets && (
                <ul className="flex flex-col gap-2.5 pl-1 pt-0.5">
                  {bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-[15px] leading-relaxed text-dl-ink-2 md:text-base">
                      <span className="mt-[11px] size-1.5 shrink-0 rounded-full bg-dl-red" aria-hidden />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

        </article>
      </div>
    </>
  );
}

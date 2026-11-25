import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  Droplet,
  FileDown,
  FlaskConical,
  House,
  MapPin,
  PackageCheck,
  Phone,
  ScanLine,
  TestTubeDiagonal,
  type LucideIcon,
} from "lucide-react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import SiteSearch from "@/components/search/siteSearch";
import { buttonClass } from "@/components/ui/button";
import { shell } from "@/components/ui/shell";
import { PHONE_DISPLAY, PHONE_HREF, WHATSAPP_HREF } from "@/lib/contact";

const reportRows = [
  { test: "Page lookup", result: "404", range: "200", flagged: true },
  { test: "Link status", result: "Broken", range: "Working", flagged: true },
  { test: "Your health", result: "Not affected", range: "–", flagged: false },
];

const destinations: { title: string; text: string; href: string; icon: LucideIcon; tone: string; external?: boolean }[] = [
  { title: "Book a blood test", text: "Home collection from 6 AM", href: "/book-a-test/", icon: Droplet, tone: "bg-dl-red-soft text-dl-red" },
  { title: "Health packages", text: "Full body, diabetes, heart & more", href: "/packages/", icon: PackageCheck, tone: "bg-dl-green/10 text-dl-green" },
  { title: "Radiology & scans", text: "Ultrasound, X-Ray, ECG, ECHO", href: "/radiology/", icon: ScanLine, tone: "bg-dl-red-soft text-dl-red" },
  { title: "Get your reports", text: "Sent to your WhatsApp automatically", href: WHATSAPP_HREF, icon: FileDown, tone: "bg-dl-ink/5 text-dl-ink", external: true },
  { title: "Contact & centres", text: "Sakchi, Jugsalai, Adityapur", href: "/contact-us/", icon: MapPin, tone: "bg-dl-ink/5 text-dl-ink" },
];

/* DL.pen "Diagnos Lab - 404 Not Found". It sits at the app root so it
   catches every unmatched URL, which is outside the (site) layout, so it
   brings its own header and footer. */
export default function NotFound() {
  return (
    <>
      <Navbar />
      <main>
        <section className="overflow-hidden bg-linear-to-b from-dl-red-soft to-dl-bg">
          <div className={`${shell} grid grid-cols-[minmax(0,1fr)] items-center gap-12 pt-10 pb-14 lg:grid-cols-[minmax(0,1fr)_500px] lg:gap-20 lg:pt-[88px] lg:pb-24`}>
            <div className="flex flex-col gap-6 md:gap-7">
              <p className="inline-flex w-fit items-center gap-2 rounded-full border border-dl-line bg-white px-3 py-1.5 text-xs font-semibold text-dl-red md:text-[13px]">
                <TestTubeDiagonal className="size-3.5" aria-hidden />
                Error 404 · Page not found
              </p>
              <div className="flex flex-col gap-3 md:gap-4">
                <h1 className="font-display text-[34px] font-extrabold leading-[1.08] tracking-[-0.035em] text-dl-ink md:text-[54px] md:leading-[1.05]">
                  This page didn&apos;t make it to the lab.
                </h1>
                <p className="max-w-[600px] text-[15px] leading-normal text-dl-ink-2 md:text-[17px] md:leading-[1.55]">
                  The link may be old, mistyped or the page has moved. Your booking and reports are safe, so let&apos;s
                  get you where you were going.
                </p>
              </div>
              <div className="max-w-[560px]">
                <SiteSearch variant="hero" />
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/" className={buttonClass("primary", "lg")}>
                  <House className="size-[17px]" aria-hidden />
                  Back to homepage
                </Link>
                <a href={PHONE_HREF} className={buttonClass("neutral", "lg")}>
                  <Phone className="size-[17px] text-dl-red" aria-hidden />
                  Call {PHONE_DISPLAY}
                </a>
              </div>
            </div>

            <div aria-hidden className="mx-auto w-full max-w-[480px] -rotate-[2.5deg] lg:mx-0">
              <div className="overflow-hidden rounded-md border border-dl-line bg-white shadow-[0_24px_56px_rgba(217,45,39,0.12)]">
                <div className="flex items-center justify-between bg-dl-red px-5 py-4 text-white md:px-6 md:py-[18px]">
                  <span className="flex items-center gap-2 font-display text-[15px] font-extrabold">
                    <FlaskConical className="size-4" />
                    Diagnos Lab
                  </span>
                  <span className="text-[11px] font-bold tracking-[0.1em] text-white/80">TEST REPORT</span>
                </div>
                <dl className="grid grid-cols-3 gap-4 border-b border-dl-line px-5 py-4 md:px-6 md:py-[18px]">
                  {[["PATIENT", "You"], ["SAMPLE ID", "#404"], ["COLLECTED", "Just now"]].map(([k, v]) => (
                    <div key={k} className="flex flex-col gap-[3px]">
                      <dt className="text-[10.5px] font-semibold tracking-[0.06em] text-dl-muted">{k}</dt>
                      <dd className="text-sm font-bold text-dl-ink">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="px-5 pt-1.5 pb-1 md:px-6">
                  <div className="grid grid-cols-[1fr_130px_80px] border-b border-dl-line py-2.5 text-[10.5px] font-semibold tracking-[0.06em] text-dl-muted">
                    <span>TEST</span>
                    <span>RESULT</span>
                    <span className="text-right">REF. RANGE</span>
                  </div>
                  {reportRows.map(({ test, result, range, flagged }, i) => (
                    <div
                      key={test}
                      className={`grid grid-cols-[1fr_130px_80px] items-center py-3.5 text-sm ${i < reportRows.length - 1 ? "border-b border-dl-line" : ""}`}
                    >
                      <span className="font-medium text-dl-ink">{test}</span>
                      <span className={`flex items-center gap-1.5 font-bold ${flagged ? "text-dl-red" : "text-dl-green"}`}>
                        {result}
                        {flagged && <ArrowDown className="size-3.5" />}
                      </span>
                      <span className="text-right text-dl-ink-2">{range}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-1.5 border-y border-dl-line bg-dl-bg px-5 pt-4 pb-5 md:px-6">
                  <span className="text-[10.5px] font-semibold tracking-[0.06em] text-dl-muted">INTERPRETATION</span>
                  <p className="text-[13.5px] leading-normal text-dl-ink-2">
                    Page has moved or never existed. No fasting, no follow-up needed. Just pick a link below.
                  </p>
                </div>
                <div className="flex items-center justify-between px-5 py-3.5 md:px-6">
                  <span className="text-xs text-dl-muted">Verified by the web team</span>
                  <span className="-rotate-6 rounded-md border-[1.5px] border-dl-red px-2.5 py-1 text-[11px] font-extrabold tracking-[0.08em] text-dl-red">
                    NOT FOUND
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="destinations-heading" className="border-t border-dl-line bg-white">
          <div className={`${shell} flex flex-col gap-6 pt-10 pb-14 md:gap-7 md:pt-16 md:pb-24`}>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <h2 id="destinations-heading" className="font-display text-[22px] font-extrabold tracking-[-0.02em] text-dl-ink md:text-[28px]">
                Maybe you were looking for…
              </h2>
              <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="text-sm text-dl-ink-2 underline-offset-2 hover:text-dl-ink hover:underline">
                Found a broken link? Tell us
              </a>
            </div>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-5">
              {destinations.map(({ title, text, href, icon: Icon, tone, external }) => {
                const body = (
                  <>
                    <span className="flex items-center justify-between">
                      <span className={`flex size-[42px] items-center justify-center rounded-xl ${tone}`}>
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <ArrowUpRight className="size-[18px] text-dl-muted transition-colors group-hover:text-dl-ink" aria-hidden />
                    </span>
                    <span className="flex flex-col gap-1">
                      <span className="font-display text-base font-bold text-dl-ink">{title}</span>
                      <span className="text-[13px] text-dl-ink-2">{text}</span>
                    </span>
                  </>
                );
                const card = "group flex h-full flex-col gap-[18px] rounded-2xl border border-dl-line bg-dl-bg p-5 transition-colors hover:border-dl-ink/40";
                return (
                  <li key={title}>
                    {external ? (
                      <a href={href} target="_blank" rel="noopener noreferrer" className={card}>{body}</a>
                    ) : (
                      <Link href={href} className={card}>{body}</Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

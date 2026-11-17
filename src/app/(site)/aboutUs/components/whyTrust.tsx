import Link from "next/link";
import { ArrowRight, Award, FlaskConical, Map, MessageCircle, Microscope, Package, ScanLine, Star, Timer, Users, type LucideIcon } from "lucide-react";
import { shell } from "@/components/ui/shell";

const reasons: { icon: LucideIcon; title: string; mobileTitle: string; text: string; green?: boolean }[] = [
  {
    icon: Award,
    title: "15+ years of diagnostic excellence",
    mobileTitle: "15+ years of diagnostic excellence",
    text: "Serving Jamshedpur's patients and doctors for over a decade and a half.",
  },
  {
    icon: Star,
    title: "4.9 Google rating",
    mobileTitle: "4.9 Google rating, 3,000+ Google reviews",
    text: "From 3,000+ Google reviews, for care, accuracy and speed.",
  },
  {
    icon: Microscope,
    title: "In-house pathologist",
    mobileTitle: "In-house pathologist for quality control",
    text: "Every report is quality-checked by our own pathologist.",
  },
  {
    icon: Users,
    title: "Experienced team",
    mobileTitle: "Experienced medical and technical team",
    text: "Skilled medical and technical staff at every step.",
  },
  {
    icon: Timer,
    title: "Fast turnaround",
    mobileTitle: "Fast turnaround time for most tests",
    text: "Quick results on most tests, many on the same day.",
  },
  {
    icon: MessageCircle,
    title: "Reports on WhatsApp",
    mobileTitle: "Clear digital reports on WhatsApp",
    text: "Clear digital reports sent straight to your phone.",
    green: true,
  },
];

const services = [
  { href: "/tests/", icon: FlaskConical, label: "Browse tests", mobileLabel: "Tests" },
  { href: "/packages/", icon: Package, label: "Health packages", mobileLabel: "Packages" },
  { href: "/radiology/", icon: ScanLine, label: "Radiology", mobileLabel: "Radiology" },
];

/* DL.pen About "Why Patients Trust" (six numbered cards; single-line rows
   on phones) and the red "Presence & Services" band after it. */
export default function WhyTrust() {
  return (
    <section aria-labelledby="trust-heading" className="bg-dl-bg py-10 md:py-20">
      <div className={`${shell} flex flex-col gap-5 md:gap-9`}>
        <div className="flex flex-col gap-1.5 md:flex-row md:items-end md:justify-between md:gap-10">
          <div className="flex flex-col gap-2.5 md:gap-3">
            <p className="flex items-center gap-2.5 text-xs font-bold tracking-[0.13em] text-dl-red md:text-[12.5px]">
              <span className="h-0.5 w-5 bg-dl-red" aria-hidden />
              WHY DIAGNOS LAB
            </p>
            <h2 id="trust-heading" className="font-display text-[22px] font-extrabold tracking-[-0.03em] text-dl-ink md:text-[38px]">
              Why patients trust Diagnos Lab
            </h2>
          </div>
          <p className="hidden max-w-[380px] text-base leading-[1.55] text-dl-ink-2 md:block">
            Six reasons families and doctors across Jamshedpur keep coming back.
          </p>
        </div>

        <ul className="grid gap-2.5 md:grid-cols-3 md:gap-4">
          {reasons.map(({ icon: Icon, title, mobileTitle, text, green }, i) => (
            <li
              key={title}
              className="flex items-center gap-3.5 rounded-2xl border border-dl-line bg-white p-3.5 md:flex-col md:items-start md:gap-4 md:rounded-[24px] md:p-7"
            >
              <div className="flex shrink-0 items-center justify-between md:w-full">
                <span
                  className={`flex size-10 items-center justify-center rounded-xl md:size-12 ${
                    green ? "bg-dl-green/10 text-dl-green" : "bg-dl-red-soft text-dl-red"
                  }`}
                >
                  <Icon className="size-[18px] md:size-5" aria-hidden />
                </span>
                <span className="hidden text-[13px] font-bold text-dl-muted md:block">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-[14.5px] font-semibold text-dl-ink md:font-display md:text-xl md:font-bold">
                  <span className="md:hidden">{mobileTitle}</span>
                  <span className="hidden md:inline">{title}</span>
                </h3>
                <p className="hidden text-[14.5px] leading-normal text-dl-ink-2 md:block">{text}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-5 rounded-[22px] bg-linear-to-b from-dl-red to-dl-red-dark p-6 text-white md:mt-8 md:flex-row md:items-center md:justify-between md:gap-10 md:rounded-[24px] md:bg-linear-to-r md:from-dl-red-dark md:to-dl-red md:p-12">
          <div className="flex flex-col gap-3 md:max-w-[620px] md:gap-4">
            <p className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold md:text-[13px]">
              <Map className="size-3.5" aria-hidden />
              Our presence
            </p>
            <h2 className="font-display text-[22px] font-extrabold leading-[1.2] tracking-[-0.03em] md:text-[32px]">
              We receive samples from all over Jharkhand.
            </h2>
            <p className="hidden text-[15px] leading-normal text-white/85 md:block">
              Walk in at Sakchi, Jugsalai or Adityapur, or book a home collection anywhere in Jamshedpur.
            </p>
          </div>

          <div className="flex flex-col gap-2.5 md:w-[500px] md:gap-3.5 md:rounded-[20px] md:bg-white md:p-6">
            <p className="hidden font-display text-lg font-bold text-dl-ink md:block">Explore our services</p>
            <ul className="grid grid-cols-3 gap-2 md:gap-2.5">
              {services.map(({ href, icon: Icon, label, mobileLabel }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="flex h-full flex-col items-center gap-1.5 rounded-xl bg-white px-2 py-3.5 text-center text-[13px] font-semibold text-dl-ink transition-colors hover:bg-dl-red-soft md:rounded-2xl md:bg-dl-bg md:text-sm"
                  >
                    <Icon className="size-[18px] text-dl-red" aria-hidden />
                    <span className="md:hidden">{mobileLabel}</span>
                    <span className="hidden md:inline">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/book-a-test/"
              className="flex h-12 items-center justify-center gap-2 rounded-[14px] bg-dl-ink text-[15px] font-semibold text-white transition-colors hover:bg-black md:bg-dl-red md:hover:bg-dl-red-dark"
            >
              Book a test
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { ArrowRight, Building, ClipboardList, FlaskConical, Headset, Microscope, Package, Zap, type LucideIcon } from "lucide-react";
import { shell } from "@/components/ui/shell";

const services = ["Pathology", "Radiology", "X-ray", "ECG", "TMT", "Eye check-up", "Audiometry"];

const points: { n: string; icon: LucideIcon; title: string; text: string }[] = [
  { n: "02", icon: Building, title: "On-site & off-site testing", text: "Flexible sample collection at your premises or at our lab." },
  { n: "03", icon: Headset, title: "Dedicated corporate support", text: "Seamless coordination, priority booking and exclusive discounts." },
  { n: "04", icon: ClipboardList, title: "Custom corporate health packages", text: "Customisable plans for employees and executives." },
  { n: "05", icon: Zap, title: "Fast & accurate reporting", text: "Digital reports with same-day results on most tests." },
];

/* DL.pen corporate "Why Partner" bento plus the "Get Started" band. On
   phones the point cards turn into rows and the band closes the list. */
export default function WhyPartner() {
  return (
    <section aria-labelledby="why-heading" className="bg-dl-bg py-10 md:py-20">
      <div className={`${shell} flex flex-col gap-5 md:gap-9`}>
        <div className="flex flex-col gap-1.5 md:flex-row md:items-end md:justify-between md:gap-10">
          <div className="flex flex-col gap-1.5 md:gap-2">
            <p className="text-[11.5px] font-bold tracking-[0.11em] text-dl-red md:text-[12.5px]">WHY DIAGNOS LAB</p>
            <h2 id="why-heading" className="font-display text-2xl font-extrabold tracking-[-0.03em] text-dl-ink md:text-[38px]">
              Why partner with Diagnos Lab
            </h2>
          </div>
          <p className="text-[13.5px] leading-normal text-dl-ink-2 md:max-w-[440px] md:text-base md:leading-[1.55]">
            <span className="md:hidden">One partner for every test your workforce needs.</span>
            <span className="hidden md:inline">
              One partner for every test your workforce needs, from the pre-employment check to the annual screening camp.
            </span>
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-[minmax(0,470px)_minmax(0,1fr)] md:gap-4">
          <div className="flex flex-col gap-5 self-start rounded-[22px] bg-linear-to-b from-dl-red to-dl-red-dark p-6 text-white md:gap-7 md:rounded-[24px] md:p-8">
            <div className="flex flex-col gap-3 md:gap-4">
              <span className="flex size-11 items-center justify-center rounded-[14px] bg-white/15 md:size-[52px]">
                <Microscope className="size-5 md:size-6" aria-hidden />
              </span>
              <h3 className="font-display text-xl font-extrabold leading-tight tracking-[-0.02em] md:text-[28px]">
                Comprehensive diagnostic solutions
              </h3>
              <p className="text-[13.5px] leading-normal text-white/85 md:text-[15px]">
                <span className="md:hidden">Every test your workforce needs under one roof.</span>
                <span className="hidden md:inline">Every test your workforce needs under one roof, with no juggling multiple labs or vendors.</span>
              </p>
            </div>
            <ul className="flex flex-wrap gap-2">
              {[...services, "& more"].map((s, i) => (
                <li
                  key={s}
                  className={`rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-semibold md:text-[13px] ${
                    i === services.length ? "hidden md:block" : ""
                  }`}
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <ul className="grid gap-3 md:grid-cols-2 md:gap-4">
            {points.map(({ n, icon: Icon, title, text }) => (
              <li
                key={title}
                className="flex items-start gap-3.5 rounded-[18px] border border-dl-line bg-white p-4 md:flex-col md:gap-3.5 md:rounded-[24px] md:p-7"
              >
                <div className="flex shrink-0 items-center justify-between md:w-full">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-dl-red-soft text-dl-red md:size-[46px]">
                    <Icon className="size-[18px] md:size-5" aria-hidden />
                  </span>
                  <span className="hidden text-[13px] font-bold text-dl-muted md:block">{n}</span>
                </div>
                <div className="flex flex-col gap-1 md:gap-2">
                  <h3 className="font-display text-[15.5px] font-bold text-dl-ink md:text-xl">{title}</h3>
                  <p className="text-[13.5px] leading-normal text-dl-ink-2 md:text-[14.5px]">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <GetStarted />
      </div>
    </section>
  );
}

function GetStarted() {
  const ghost =
    "flex h-12 items-center justify-center gap-2 rounded-[14px] border border-white/20 bg-white/[0.08] px-4 text-sm font-semibold text-white transition-colors hover:bg-white/15 md:h-[50px] md:px-[22px] md:text-[15px]";
  return (
    <div className="flex flex-col gap-5 rounded-[22px] bg-dl-ink p-6 md:mt-5 md:flex-row md:items-center md:justify-between md:gap-8 md:rounded-[24px] md:px-10 md:py-9">
      <div className="flex flex-col gap-1.5">
        <h2 className="font-display text-xl font-extrabold tracking-[-0.02em] text-white md:text-[28px]">
          Get started with corporate testing
        </h2>
        <p className="hidden text-[15px] text-white/70 md:block">
          Explore our packages, browse individual tests, or talk to our corporate desk.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2.5 md:flex">
        <Link href="/packages/" className={ghost}>
          <Package className="size-[17px]" aria-hidden />
          Health packages
        </Link>
        <Link href="/tests/" className={ghost}>
          <FlaskConical className="size-[17px]" aria-hidden />
          Browse tests
        </Link>
        <Link
          href="/contact-us/"
          className="col-span-2 flex h-12 items-center justify-center gap-2 rounded-[14px] bg-dl-red px-[22px] text-[15px] font-semibold text-white transition-colors hover:bg-dl-red-dark md:h-[50px]"
        >
          Contact us
          <ArrowRight className="size-[17px]" aria-hidden />
        </Link>
      </div>
    </div>
  );
}

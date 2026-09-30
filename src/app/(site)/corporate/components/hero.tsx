import Image from "next/image";
import { Building2 } from "lucide-react";
import { shell } from "@/components/ui/shell";
import CorporateForm from "./corporateForm";

const stats = [
  { value: "15+", label: "Years in Jamshedpur", mobileLabel: "Years" },
  { value: "4.9★", label: "Google rating", mobileLabel: "Google rating" },
  { value: "On-site", label: "Camps at your premises", mobileLabel: null },
  { value: "Same day", label: "Digital reports", mobileLabel: "Reports" },
];

function Backdrop({ className }: { className: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden bg-dl-ink ${className}`} aria-hidden>
      <Image src="/images/corporate.avif" alt="" fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-linear-to-t from-dl-ink via-dl-ink/75 to-dl-ink/30 md:bg-linear-to-r md:from-dl-ink/95 md:via-dl-ink/70 md:to-dl-ink/20" />
    </div>
  );
}

/* DL.pen corporate "Hero": the pitch over a dark photo with the enquiry
   card beside it on desktop; on phones the card overlaps the photo's
   bottom edge. */
export default function HeroSection() {
  return (
    <section className="relative md:min-h-[680px]">
      <Backdrop className="hidden md:block" />
      <div
        className={`${shell} relative grid md:min-h-[680px] md:grid-cols-[minmax(0,1fr)_minmax(0,470px)] md:items-center md:gap-16 md:py-16`}
      >
        <div className="relative -mx-4 px-4 pt-40 pb-24 md:mx-0 md:p-0">
          <Backdrop className="md:hidden" />
          <div className="relative flex flex-col gap-4 md:gap-6">
            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-[7px] text-[12.5px] font-semibold text-white md:text-[13px]">
              <Building2 className="size-3.5" aria-hidden />
              <span className="md:hidden">Corporate health · Jharkhand</span>
              <span className="hidden md:inline">Corporate health screening · Jharkhand</span>
            </p>
            <h1 className="font-display text-[32px] font-extrabold leading-[1.1] tracking-[-0.03em] text-white md:text-[54px] md:leading-[1.05]">
              The trusted partner for employee health in Jharkhand.
            </h1>
            <p className="max-w-[640px] text-[14.5px] leading-[1.55] text-white/80 md:text-[17px]">
              <span className="md:hidden">On-site camps, bulk testing and fast digital reports for banks, industries, hotels and organisations.</span>
              <span className="hidden md:inline">
                Health screening for banks, industries, hotels and organisations: on-site camps, bulk testing and fast digital
                reports, managed by an experienced medical team.
              </span>
            </p>
            <dl className="flex pt-2 md:pt-3">
              {stats.map(({ value, label, mobileLabel }, i) => (
                <div
                  key={value}
                  className={`flex flex-col gap-1 ${i > 0 ? "border-l border-white/20 pl-[18px]" : ""} ${
                    mobileLabel ? "flex-1 md:flex-none" : "hidden md:flex"
                  } pr-4 md:pr-9`}
                >
                  <dt className="order-last text-xs text-white/65 md:text-[13px]">
                    <span className="md:hidden">{mobileLabel}</span>
                    <span className="hidden md:inline">{label}</span>
                  </dt>
                  <dd className="font-display text-xl font-extrabold text-white md:text-2xl">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="relative -mt-16 md:mt-0">
          <CorporateForm />
        </div>
      </div>
    </section>
  );
}

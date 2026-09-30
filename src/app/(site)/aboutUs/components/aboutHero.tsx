import Image from "next/image";
import { Star, Users } from "lucide-react";
import { shell } from "@/components/ui/shell";

const stats = [
  { value: "15+", label: "Years of diagnostic excellence", mobileLabel: "Years of excellence", red: true },
  { value: "4.9★", label: "Google rating, 3,000+ reviews", mobileLabel: "Google rating", red: false },
  { value: "3", label: "Centres: Sakchi, Jugsalai, Adityapur", mobileLabel: "Walk-in centres", red: true },
  { value: "Same day", label: "Digital reports on most tests", mobileLabel: "Digital reports", red: false },
];

/* DL.pen About "Hero Band": who we are beside the team photo, then a
   strip of four stats. Phones put the photo between the lead and the body
   copy and turn the stats into a 2×2 grid. */
export default function AboutHero() {
  return (
    <section className="bg-linear-to-b from-dl-red-soft to-dl-bg">
      <div className={`${shell} flex flex-col gap-6 pt-7 pb-10 md:gap-16 md:pt-16 md:pb-20`}>
        <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,600px)] md:items-center md:gap-16">
          <div className="flex flex-col gap-3 md:gap-5">
            <p className="flex items-center gap-2.5 text-xs font-bold tracking-[0.13em] text-dl-red md:text-[12.5px]">
              <span className="h-0.5 w-5 bg-dl-red" aria-hidden />
              ABOUT DIAGNOS LAB
            </p>
            <h1 className="font-display text-[34px] font-extrabold tracking-[-0.04em] text-dl-ink md:text-[56px] md:leading-[1.05]">
              Who we are
            </h1>
            <p className="text-[17px] font-medium leading-[1.45] text-dl-ink md:text-[21px]">
              A trusted diagnostic centre in Jamshedpur, built on accuracy, transparency and patient care.
            </p>
            <p className="hidden text-base leading-[1.65] text-dl-ink-2 md:block">
              For over 15 years, we have supported doctors, families and organisations with reliable diagnostic services that help in
              early detection and better treatment decisions. From routine blood tests to advanced radiology and cardiac diagnostics,
              we bring all essential diagnostic services under one roof.
            </p>
          </div>

          <div className="relative pb-5 md:pb-0">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[20px] shadow-[0_20px_50px_rgba(217,45,39,0.12)] md:aspect-[600/380] md:rounded-[24px]">
              <Image
                src="/images/about/about1.avif"
                alt="The Diagnos Lab team at the Sakchi centre"
                fill
                priority
                sizes="(min-width: 768px) 600px, 100vw"
                className="object-cover"
              />
              <span className="absolute top-4 right-4 hidden items-center gap-1.5 rounded-full bg-dl-ink/75 px-3 py-1.5 text-xs font-semibold text-white md:inline-flex">
                <Users className="size-3.5" aria-hidden />
                Team Diagnos Lab
              </span>
            </div>
            <div className="absolute bottom-0 left-3 flex items-center gap-3 rounded-2xl bg-white px-3.5 py-2.5 shadow-[0_12px_30px_rgba(22,24,29,0.12)] md:-bottom-6 md:-left-8 md:px-5 md:py-3.5">
              <span className="hidden size-11 items-center justify-center rounded-xl bg-dl-star/15 text-dl-star md:flex">
                <Star className="size-5" aria-hidden />
              </span>
              <Star className="size-5 text-dl-star md:hidden" aria-hidden />
              <span className="flex items-baseline gap-2 md:flex-col md:gap-0.5">
                <span className="font-display text-base font-extrabold text-dl-ink md:text-lg">
                  4.9<span className="hidden md:inline"> on Google</span>
                </span>
                <span className="text-xs text-dl-muted md:text-[13px]">3,000+ <span className="md:hidden">Google</span><span className="hidden md:inline">patient</span> reviews</span>
              </span>
            </div>
          </div>

          <p className="text-[15px] leading-[1.6] text-dl-ink-2 md:hidden">
            For over 15 years, we have supported doctors, families and organisations with reliable diagnostic services. From routine
            blood tests to advanced radiology and cardiac diagnostics, all under one roof.
          </p>
        </div>

        <dl className="grid grid-cols-2 overflow-hidden rounded-[20px] border border-dl-line bg-white md:grid-cols-4 md:rounded-[24px] md:py-7">
          {stats.map(({ value, label, mobileLabel, red }, i) => (
            <div
              key={value}
              className={`flex flex-col gap-1 p-4 md:px-8 md:py-0 ${i % 2 === 1 ? "border-l border-dl-line" : ""} ${
                i >= 2 ? "border-t border-dl-line md:border-t-0" : ""
              } ${i === 2 ? "md:border-l" : ""}`}
            >
              <dd className={`font-display text-2xl font-extrabold tracking-[-0.03em] md:text-[34px] ${red ? "text-dl-red" : "text-dl-ink"}`}>
                {value}
              </dd>
              <dt className="order-last text-[13px] text-dl-ink-2 md:text-sm">
                <span className="md:hidden">{mobileLabel}</span>
                <span className="hidden md:inline">{label}</span>
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

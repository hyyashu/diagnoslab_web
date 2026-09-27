import Link from "next/link";
import { ArrowRight, ChevronRight, Clock3, Phone, Star, UserRoundCheck } from "lucide-react";
import CallbackForm from "@/components/forms/callbackForm";
import { buttonClass } from "@/components/ui/button";
import { shell } from "@/components/ui/shell";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/contact";

const proofPoints = [
  { icon: Clock3, value: "1–2 hrs", label: "Report turnaround", mobileLabel: "Reports" },
  { icon: UserRoundCheck, value: "Female", label: "Radiologist available", mobileLabel: "Radiologist" },
  { icon: Star, value: "4.9", label: "3,000+ Google reviews", mobileLabel: "Google rating" },
];

type ServicePageHeroProps = {
  /* The last crumb is the current page. */
  breadcrumb: { label: string; href?: string }[];
  eyebrow: string;
  title: string;
  subtitle: string;
  /* Scan types shown as chips under the subtitle. */
  chips?: string[];
  cta: { label: string; href: string };
  form: React.ComponentProps<typeof CallbackForm>;
};

/* DL.pen "Hero Band" of the radiology and ultrasound pages: copy, proof
   points and CTAs beside a call-back form. */
export default function ServicePageHero({ breadcrumb, eyebrow, title, subtitle, chips, cta, form }: ServicePageHeroProps) {
  return (
    <section className="bg-linear-to-b from-dl-red-soft to-dl-bg">
      <div className={`${shell} grid gap-6 pt-5 pb-9 md:grid-cols-[minmax(0,1fr)_minmax(0,400px)] md:items-center md:gap-10 md:py-16 xl:grid-cols-[minmax(0,1fr)_440px] xl:gap-16`}>
        <div className="flex flex-col gap-5 md:gap-7">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-dl-muted md:text-[13px]">
              {breadcrumb.map((crumb, i) => {
                const last = i === breadcrumb.length - 1;
                return (
                  <li key={crumb.label} className="flex items-center gap-1.5">
                    {last ? (
                      <span aria-current="page" className="font-semibold text-dl-ink">{crumb.label}</span>
                    ) : (
                      <>
                        <Link href={crumb.href ?? "/"} className="hover:text-dl-ink">{crumb.label}</Link>
                        <ChevronRight className="size-3.5" aria-hidden />
                      </>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>

          <div className="flex flex-col gap-3 md:gap-5">
            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-dl-line bg-white py-1.5 pl-2.5 pr-3 text-xs font-semibold text-dl-ink-2 md:py-[7px] md:pr-3.5 md:text-[13px]">
              <span className="size-[7px] rounded-full bg-dl-green md:size-2" aria-hidden />
              {eyebrow}
            </p>
            <h1 className="font-display text-[27px] font-extrabold leading-[1.12] tracking-[-0.03em] text-dl-ink md:text-[40px] xl:text-[46px] xl:leading-[1.08]">
              {title}
            </h1>
            <p className="max-w-[600px] text-sm leading-normal text-dl-ink-2 md:text-[17px] md:leading-[1.55]">{subtitle}</p>
            {chips && (
              <ul className="flex flex-wrap gap-2">
                {chips.map((c) => (
                  <li key={c} className="rounded-full border border-dl-line bg-white px-3 py-1.5 text-xs font-semibold text-dl-ink-2 md:text-[13px]">
                    {c}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <ul className="grid grid-cols-3 gap-2 md:flex md:flex-wrap md:gap-8">
            {proofPoints.map(({ icon: Icon, value, label, mobileLabel }) => (
              <li key={value} className="flex flex-col gap-2 rounded-2xl border border-dl-line bg-white p-3 md:flex-row md:items-center md:gap-3 md:border-0 md:bg-transparent md:p-0">
                <span className="flex size-8 items-center justify-center rounded-xl bg-dl-red-soft text-dl-red md:size-11 md:bg-white md:shadow-[0_4px_14px_rgba(22,24,29,0.06)]">
                  <Icon className="size-4 md:size-5" aria-hidden />
                </span>
                <span className="flex flex-col">
                  <span className="font-display text-[15px] font-extrabold text-dl-ink md:text-[17px]">{value}</span>
                  <span className="text-[11px] text-dl-muted md:text-[12.5px] md:text-dl-ink-2">
                    <span className="md:hidden">{mobileLabel}</span>
                    <span className="hidden md:inline">{label}</span>
                  </span>
                </span>
              </li>
            ))}
          </ul>

          <div className="hidden gap-3 md:flex">
            <a href={cta.href} className={buttonClass("primary", "lg")}>
              {cta.label}
              <ArrowRight className="size-4" aria-hidden />
            </a>
            <a href={PHONE_HREF} className={buttonClass("neutral", "lg")}>
              <Phone className="size-4 text-dl-red" aria-hidden />
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>

        <CallbackForm {...form} />
      </div>
    </section>
  );
}

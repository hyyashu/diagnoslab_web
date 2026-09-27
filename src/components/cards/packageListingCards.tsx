import Link from "next/link";
import { Activity, Clock3, FlaskConical, House, Sparkles, Utensils } from "lucide-react";
import BookButton from "@/components/cards/bookButton";
import { buttonClass } from "@/components/ui/button";
import type { Package } from "@/lib/catalog";

/* DL.pen Health Packages cards: the grid card and the large featured card. */

export type ListingPackage = Pick<
  Package,
  "slug" | "title" | "description" | "price" | "originalPrice" | "parameters" | "categories" | "fasting" | "reporting"
> & {
  /* Card copy; falls back to the catalogue description. */
  summary?: string;
  categoryLabel: string;
  includes?: string[];
};

const discountOf = (p: ListingPackage) =>
  p.originalPrice > 0 && p.price > 0 ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) : 0;

const reportLabel = (r: string) => (/same\s*day/i.test(r) ? "Same-day report" : `Report in ${r.toLowerCase()}`);
const fastingLabel = (f: string) =>
  /over[\s-]*night/i.test(f) ? "Overnight fasting" : /not\s*required/i.test(f) ? "No fasting" : f;

const rupees = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/* Same lead payload as the classic PackageCard. */
function Book({ pkg, className }: { pkg: ListingPackage; className: string }) {
  return (
    <BookButton
      className={className}
      form={{
        title: "Book",
        testName: pkg.title,
        testDescription: pkg.description,
        testPrice: pkg.price,
        testOriginalPrice: pkg.originalPrice,
        additionalSourceData: {
          package_name: pkg.title,
          package_description: pkg.description,
          package_price: pkg.price,
          package_original_price: pkg.originalPrice,
          package_parameters: pkg.parameters,
          package_categories: pkg.categories.split(","),
          package_fasting: pkg.fasting,
          package_reporting: pkg.reporting,
        },
      }}
    >
      Book now
    </BookButton>
  );
}

export function PackageGridCard({ pkg }: { pkg: ListingPackage }) {
  const discount = discountOf(pkg);
  const summary = pkg.summary ?? pkg.description;

  return (
    <article className="flex h-full flex-col gap-3.5 rounded-[20px] border border-dl-line bg-white p-5 md:p-6">
      <div className="flex items-center justify-between gap-2">
        <span className="rounded-md bg-dl-red-soft px-2 py-1 text-xs font-bold text-dl-red-dark">{pkg.categoryLabel}</span>
        {pkg.parameters > 0 && (
          <span className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-dl-muted">
            <FlaskConical className="size-3.5" aria-hidden />
            {pkg.parameters} tests
          </span>
        )}
      </div>
      <h3 className="font-display text-lg font-extrabold tracking-[-0.02em] text-dl-ink md:text-xl">
        <Link href={`/packages/${pkg.slug}`} className="hover:text-dl-red">{pkg.title}</Link>
      </h3>
      {summary && <p className="line-clamp-2 text-sm leading-normal text-dl-ink-2">{summary}</p>}
      <div className="flex flex-wrap gap-x-3.5 gap-y-1 text-[13px] font-medium text-dl-muted">
        <span className="inline-flex items-center gap-1.5">
          <Clock3 className="size-3.5" aria-hidden />
          {reportLabel(pkg.reporting)}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Utensils className="size-3.5" aria-hidden />
          {fastingLabel(pkg.fasting)}
        </span>
      </div>
      <div className="mt-auto flex items-center justify-between gap-3 border-t border-dl-line pt-4">
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="font-display text-2xl font-extrabold tracking-[-0.02em] text-dl-ink">{rupees(pkg.price)}</span>
          {pkg.originalPrice > pkg.price && <s className="text-[13.5px] text-dl-muted">{rupees(pkg.originalPrice)}</s>}
          {discount > 0 && (
            <span className="rounded-md bg-dl-green/10 px-1.5 py-0.5 text-[11.5px] font-bold text-dl-green">{discount}% off</span>
          )}
        </p>
        <Book pkg={pkg} className={buttonClass("primary", "sm", "shrink-0")} />
      </div>
    </article>
  );
}

export function FeaturedPackageCard({
  pkg,
  tone = "light",
  bestValue = false,
}: {
  pkg: ListingPackage;
  tone?: "light" | "dark";
  bestValue?: boolean;
}) {
  const dark = tone === "dark";
  const discount = discountOf(pkg);
  const muted = dark ? "text-white/70" : "text-dl-ink-2";

  return (
    <article
      className={`flex h-full flex-col gap-4 rounded-3xl p-6 md:gap-5 md:p-8 ${
        dark ? "bg-dl-ink text-white" : "border border-dl-line bg-white text-dl-ink"
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-bold ${
              dark ? "bg-white/10 text-white" : "bg-dl-red-soft text-dl-red-dark"
            }`}
          >
            <Activity className="size-3.5" aria-hidden />
            Full body checkup
          </span>
          {bestValue && (
            <span className="inline-flex items-center gap-1.5 rounded-md bg-dl-red px-2 py-1 text-xs font-bold text-white">
              <Sparkles className="size-3.5" aria-hidden />
              Best value
            </span>
          )}
        </div>
        <span className={`text-[13px] font-semibold ${muted}`}>{pkg.parameters} parameters</span>
      </div>

      <h3 className="font-display text-2xl font-extrabold tracking-[-0.025em] md:text-[28px]">
        <Link href={`/packages/${pkg.slug}`} className="hover:underline">{pkg.title}</Link>
      </h3>
      <p className={`text-sm leading-relaxed md:text-[15px] ${muted}`}>{pkg.summary ?? pkg.description}</p>

      {pkg.includes && (
        <ul className="flex flex-wrap gap-2" aria-label="Includes">
          {pkg.includes.map((i) => (
            <li
              key={i}
              className={`rounded-lg px-2.5 py-1.5 text-[13px] font-semibold ${
                dark ? "border border-white/15 text-white" : "border border-dl-line text-dl-ink"
              }`}
            >
              {i}
            </li>
          ))}
        </ul>
      )}

      <div className={`flex flex-wrap gap-x-4 gap-y-1.5 text-[13px] font-medium ${muted}`}>
        <span className="inline-flex items-center gap-1.5">
          <Clock3 className="size-3.5" aria-hidden />
          {reportLabel(pkg.reporting)}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Utensils className="size-3.5" aria-hidden />
          {fastingLabel(pkg.fasting)}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <House className="size-3.5" aria-hidden />
          Home collection
        </span>
      </div>

      <div
        className={`mt-auto flex flex-wrap items-center justify-between gap-4 border-t pt-5 ${dark ? "border-white/15" : "border-dl-line"}`}
      >
        <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
          <span className="font-display text-[28px] font-extrabold tracking-[-0.03em] md:text-[32px]">{rupees(pkg.price)}</span>
          {pkg.originalPrice > pkg.price && <s className={`text-[15px] ${muted}`}>{rupees(pkg.originalPrice)}</s>}
          {discount > 0 && (
            <span
              className={`rounded-md px-1.5 py-0.5 text-xs font-bold ${
                dark ? "bg-green-500/15 text-green-400" : "bg-dl-green/10 text-dl-green"
              }`}
            >
              {discount}% off
            </span>
          )}
        </p>
        <div className="flex gap-2">
          <Link
            href={`/packages/${pkg.slug}`}
            className={buttonClass(dark ? "neutralDark" : "neutral", "sm")}
          >
            View details
          </Link>
          <Book pkg={pkg} className={buttonClass("primary", "sm")} />
        </div>
      </div>
    </article>
  );
}

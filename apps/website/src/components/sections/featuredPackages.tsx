import Link from "next/link";
import { ArrowRight, Check, FlaskConical } from "lucide-react";
import { PackageBookButton, type ListingPackage } from "@/components/cards/packageListingCards";
import { discountPct, rupees } from "@/lib/format";
import { buttonClass } from "@/components/ui/button";
import { shell } from "@/components/ui/shell";
import { getPackageBySlug } from "@/lib/catalog";

type FeaturedPackage = ListingPackage & { includes: string[]; mostBooked?: boolean };

const featuredPackages: { slug: string; summary: string; includes: string[]; mostBooked?: boolean }[] = [
  {
    slug: "nd-plus",
    summary: "Blood health, sugar, liver & kidney function, vitamins and urine.",
    includes: ["CBC & ESR", "Liver & kidney profile", "Vitamin D & B12", "Urine routine"],
  },
  {
    slug: "nd-max-plus",
    summary: "Everything in ND Plus with autoimmune and inflammatory markers.",
    includes: ["All ND Plus tests", "Autoimmune markers", "Inflammation (CRP)", "Extra minerals"],
    mostBooked: true,
  },
  {
    slug: "bio-t-plus",
    summary: "Essential yearly check covering heart, sugar, thyroid and more.",
    includes: ["Lipid profile", "Thyroid profile", "Blood sugar", "Uric acid & calcium"],
  },
];

/* DL.pen "Health Packages" (area and Book a Test pages): a band in the
   footer's red with the intro beside three package cards. The cards scroll
   sideways on phones. */
export default function FeaturedPackages({ title }: { title: string }) {
  const packages: FeaturedPackage[] = featuredPackages.flatMap(({ slug, summary, includes, mostBooked }) => {
    const p = getPackageBySlug(slug);
    if (!p) return [];
    return [
      {
        slug: p.slug,
        title: p.title,
        description: p.description,
        price: p.price,
        originalPrice: p.originalPrice,
        parameters: p.parameters,
        categories: p.categories,
        fasting: p.fasting,
        reporting: p.reporting,
        categoryLabel: "Full body checkup",
        summary,
        includes,
        mostBooked,
      },
    ];
  });

  return (
    <section aria-labelledby="featured-packages-heading" className="bg-dl-red py-10 md:py-[72px]">
      <div className={`${shell} flex flex-col gap-6 max-md:px-0 lg:flex-row lg:gap-12`}>
        <div className="flex flex-col gap-2.5 max-md:px-4 md:gap-3.5 lg:w-[320px] lg:shrink-0">
          <p className="text-xs font-bold tracking-[0.12em] text-white/[0.94]">HEALTH PACKAGES</p>
          <h2
            id="featured-packages-heading"
            className="font-display text-[22px] font-extrabold leading-[1.2] tracking-[-0.02em] text-white md:text-[30px]"
          >
            {title}
          </h2>
          <p className="text-[13.5px] leading-normal text-white/[0.88] md:text-[15px]">
            Preventive packages for every age group. One sample, one visit, one clear report.
          </p>
          <div className="mt-1 hidden lg:block">
            <Link href="/packages/" className={buttonClass("neutralDark", "sm")}>
              View all packages
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>

        <ul className="no-scrollbar flex flex-1 snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0">
          {packages.map((pkg) => (
            <li key={pkg.slug} className="w-[282px] shrink-0 snap-start md:w-auto">
              <PackageCard pkg={pkg} />
            </li>
          ))}
        </ul>

        <div className="px-4 md:px-0 lg:hidden">
          <Link href="/packages/" className={buttonClass("neutralDark", "sm", "w-full md:w-auto")}>
            View all packages
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}

function PackageCard({ pkg }: { pkg: FeaturedPackage }) {
  const discount = discountPct(pkg.price, pkg.originalPrice);

  return (
    <article className="flex h-full flex-col gap-4 rounded-[20px] bg-white p-5 md:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-dl-red-soft px-2.5 py-1 text-[11.5px] font-bold text-dl-red">
          <FlaskConical className="size-[13px]" aria-hidden />
          {pkg.parameters} tests
        </span>
        {pkg.mostBooked && (
          <span className="rounded-full bg-dl-ink px-2.5 py-1 text-[11.5px] font-bold text-white">Most booked</span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <h3 className="font-display text-[21px] font-extrabold tracking-[-0.02em] text-dl-ink">
          <Link href={`/packages/${pkg.slug}`} className="hover:text-dl-red">{pkg.title}</Link>
        </h3>
        <p className="text-[13.5px] leading-normal text-dl-ink-2">{pkg.summary}</p>
      </div>

      <ul className="flex flex-col gap-2" aria-label="Includes">
        {pkg.includes.map((i) => (
          <li key={i} className="flex items-center gap-2 text-[13px] text-dl-ink">
            <Check className="size-3.5 shrink-0 text-dl-green" aria-hidden />
            {i}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex items-center gap-2 border-t border-dl-line pt-3.5">
        <span className="font-display text-2xl font-extrabold tracking-[-0.02em] text-dl-ink">{rupees(pkg.price)}</span>
        {pkg.originalPrice > pkg.price && <s className="text-sm text-dl-muted">{rupees(pkg.originalPrice)}</s>}
        {discount > 0 && (
          <span className="ml-auto rounded-full bg-dl-green/10 px-[9px] py-1 text-xs font-bold text-dl-green">{discount}% off</span>
        )}
      </div>

      <div className="flex gap-2.5">
        <Link href={`/packages/${pkg.slug}`} className={buttonClass("neutral", "sm", "flex-1")}>
          Details
        </Link>
        <PackageBookButton pkg={pkg} className={buttonClass("primary", "sm", "flex-1")} />
      </div>
    </article>
  );
}

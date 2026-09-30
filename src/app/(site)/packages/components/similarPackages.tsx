import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import CheckupPackageCard, { type CheckupPackage } from "@/components/cards/checkupPackageCard";
import { featuredPackages } from "@/components/home/content";
import { shell } from "@/components/ui/shell";
import { getPackages, type Package } from "@/lib/catalog";

const areasOf = (categories: string) =>
  categories.split(",").map((c) => c.trim().toLowerCase()).filter(Boolean);

/* The design's pick when the package names one; otherwise the three that
   share the most health areas. */
function pick(all: Package[], current: Package, compare?: string[]) {
  if (compare) return compare.map((s) => all.find((p) => p.slug === s)).filter((p): p is Package => !!p);
  const mine = new Set(areasOf(current.categories));
  return all
    .filter((p) => p.slug !== current.slug)
    .map((p) => ({ p, shared: areasOf(p.categories).filter((a) => mine.has(a)).length }))
    .filter((x) => x.shared > 0)
    .sort((a, b) => b.shared - a.shared)
    .slice(0, 3)
    .map((x) => x.p);
}

/* DL.pen "Other Packages": "Compare with other packages". A row of package
   cards on desktop, a swipeable strip on phones; the first card is outlined. */
export default function SimilarPackages({
  currentSlug,
  compare,
  subtitle = "Other checkups that cover the same health areas.",
  mobileSubtitle,
}: {
  currentSlug: string;
  compare?: string[];
  subtitle?: string;
  mobileSubtitle?: string;
}) {
  const all = getPackages();
  const current = all.find((p) => p.slug === currentSlug);
  if (!current) return null;

  const cards: CheckupPackage[] = pick(all, current, compare).map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    price: p.price,
    originalPrice: p.originalPrice,
    parameters: p.parameters,
    categories: p.categories,
    fasting: p.fasting,
    reporting: p.reporting,
    ...featuredPackages[p.slug],
    mostBooked: false,
  }));
  if (cards.length === 0) return null;

  return (
    <section aria-labelledby="compare-heading" className="bg-white py-10 md:py-20">
      <div className="flex flex-col gap-5 md:gap-8">
        <div className={`${shell} flex items-end justify-between gap-4`}>
          <div className="flex flex-col gap-1 md:gap-2">
            <h2
              id="compare-heading"
              className="font-display text-[22px] font-extrabold tracking-[-0.03em] text-dl-ink md:text-[32px]"
            >
              <span className="md:hidden">Compare other packages</span>
              <span className="hidden md:inline">Compare with other packages</span>
            </h2>
            <p className="text-[13.5px] text-dl-muted md:text-base md:text-dl-ink-2">
              <span className="md:hidden">{mobileSubtitle ?? subtitle}</span>
              <span className="hidden md:inline">{subtitle}</span>
            </p>
          </div>
          <Link href="/packages/" className="flex shrink-0 items-center gap-1 text-sm font-bold text-dl-red md:gap-1.5 md:text-[15px]">
            <span className="md:hidden">See all</span>
            <span className="hidden md:inline">See all packages</span>
            <ChevronRight className="size-4 md:hidden" aria-hidden />
            <ArrowRight className="hidden size-4 md:block" aria-hidden />
          </Link>
        </div>
        <ul
          className={`${shell} flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 [scrollbar-width:none] md:grid md:grid-cols-3 md:gap-5 md:overflow-visible`}
        >
          {cards.map((pkg, i) => (
            <li key={pkg.slug} className="w-[290px] shrink-0 snap-start md:w-auto">
              <CheckupPackageCard pkg={pkg} highlight={i === 0} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

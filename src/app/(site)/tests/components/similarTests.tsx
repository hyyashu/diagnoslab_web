import Link from "next/link";
import { ChevronRight } from "lucide-react";
import LabTestCard from "@/components/cards/labTestCard";
import { shell } from "@/components/ui/shell";
import { getPopularTests, getTests, type Test } from "@/lib/catalog";

const displayCategory = (category: string) =>
  category === "Hormonal Health" ? "Thyroid & Hormones" : category === "Nutrition / Immunity" ? "Nutrition" : category;

/* The design's pick when the test names one; otherwise tests sharing a
   category, then the most-booked tests (most tests have no category). */
function pick(all: Test[], current: Test, related?: string[]) {
  if (related) return related.map((s) => all.find((t) => t.slug === s)).filter((t): t is Test => !!t);
  const byCategory = all
    .filter((t) => t.slug !== current.slug)
    .map((t) => ({ t, shared: t.categories.filter((c) => current.categories.includes(c)).length }))
    .filter((x) => x.shared > 0)
    .sort((a, b) => b.shared - a.shared)
    .slice(0, 4)
    .map((x) => x.t);
  if (byCategory.length > 0) return byCategory;
  return getPopularTests(5).filter((t) => t.slug !== current.slug).slice(0, 4);
}

/* DL.pen "Often Booked With": four test cards on desktop, a swipeable
   strip on phones. */
export default function SimilarTests({
  currentSlug,
  name,
  related,
  subtitle = "Add these to the same home collection: one visit, one sample draw.",
  mobileSubtitle = "One visit, one sample draw",
}: {
  currentSlug: string;
  name: string;
  related?: string[];
  subtitle?: string;
  mobileSubtitle?: string;
}) {
  const all = getTests();
  const current = all.find((t) => t.slug === currentSlug);
  if (!current) return null;
  const tests = pick(all, current, related);
  if (tests.length === 0) return null;

  return (
    <section aria-labelledby="related-heading" className="bg-dl-bg py-10 md:py-16">
      <div className="flex flex-col gap-5 md:gap-8">
        <div className={`${shell} flex items-end justify-between gap-4`}>
          <div className="flex min-w-0 flex-col gap-1 md:gap-2">
            <h2 id="related-heading" className="font-display text-[22px] font-extrabold tracking-[-0.03em] text-dl-ink md:text-[32px]">
              Often booked with {name}
            </h2>
            <p className="text-[13.5px] text-dl-muted md:text-base">
              <span className="md:hidden">{mobileSubtitle}</span>
              <span className="hidden md:inline">{subtitle}</span>
            </p>
          </div>
          <Link href="/tests/" className="flex shrink-0 items-center gap-1 text-sm font-bold text-dl-red md:text-[15px]">
            See all
            <ChevronRight className="size-4" aria-hidden />
          </Link>
        </div>
        <ul
          className={`${shell} flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 [scrollbar-width:none] md:grid md:grid-cols-2 md:gap-5 md:overflow-visible lg:grid-cols-4`}
        >
          {tests.map((t) => (
            <li key={t.slug} className="w-[280px] shrink-0 snap-start md:w-auto">
              <LabTestCard test={t} variant="related" categoryLabel={displayCategory(t.category)} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

import Link from "next/link";
import SectionHead from "@/components/ui/sectionHead";
import LabTestCard from "@/components/cards/labTestCard";
import { shell } from "@/components/ui/shell";
import { getTestBySlug } from "@/lib/catalog";

const featuredTests: { slug: string; category: string }[] = [
  { slug: "complete-blood-count", category: "Blood Health" },
  { slug: "hba1c-test", category: "Diabetes" },
  { slug: "tsh", category: "Thyroid" },
  { slug: "vitamin-d", category: "Nutrition" },
];

/* The "Also popular" chips, with the design's shorter names. */
const alsoPopular: { slug: string; label: string }[] = [
  { slug: "random-blood-sugar", label: "Random Blood Sugar" },
  { slug: "blood-sugar-fasting", label: "Fasting Sugar" },
  { slug: "cholestrol", label: "Cholesterol" },
  { slug: "creatinine", label: "Creatinine" },
  { slug: "urea-serum", label: "Urea" },
  { slug: "calcium", label: "Calcium" },
  { slug: "vitamin-b12", label: "Vitamin B12" },
];

/* DL.pen "Popular Tests" (area and Book a Test pages): four test cards and
   a row of cheaper "also popular" tests. Prices come from the catalogue. */
export default function FeaturedTests({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  const tests = featuredTests.flatMap(({ slug, category }) => {
    const t = getTestBySlug(slug);
    return t ? [{ test: t, category }] : [];
  });
  const chips = alsoPopular.flatMap(({ slug, label }) => {
    const t = getTestBySlug(slug);
    return t ? [{ slug, label, price: t.price }] : [];
  });

  return (
    <section aria-labelledby="featured-tests-heading" className="bg-white py-10 md:pt-16 md:pb-[72px]">
      <div className="flex flex-col gap-5 md:gap-7">
        <div className={shell}>
          <SectionHead
            id="featured-tests-heading"
            eyebrow={eyebrow}
            title={title}
            subtitle={subtitle}
            link={{ href: "/tests/", label: "View all tests", mobileLabel: "See all" }}
          />
        </div>

        <div className={`${shell} max-md:px-0`}>
          <ul className="no-scrollbar flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 lg:grid-cols-4">
            {tests.map(({ test, category }) => (
              <li key={test.slug} className="w-[282px] shrink-0 snap-start md:w-auto">
                <LabTestCard test={test} variant="catalog" categoryLabel={category} stacked />
              </li>
            ))}
          </ul>
        </div>

        <div className={shell}>
          <div className="flex flex-col gap-3 rounded-2xl bg-dl-bg p-4 md:flex-row md:items-center md:gap-2.5 md:px-[22px] md:py-[18px]">
            <p className="shrink-0 text-[13.5px] font-bold text-dl-ink">Also popular:</p>
            <ul className="flex flex-wrap gap-2 md:gap-2.5">
              {chips.map(({ slug, label, price }) => (
                <li key={slug}>
                  <Link
                    href={`/tests/${slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-dl-line bg-white px-3 py-[7px] text-[13px] hover:border-dl-ink"
                  >
                    <span className="font-medium text-dl-ink-2">{label}</span>
                    <span className="font-bold text-dl-ink">₹{price.toLocaleString("en-IN")}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

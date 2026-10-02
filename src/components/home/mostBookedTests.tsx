import SectionHead from "@/components/ui/sectionHead";
import LabTestCard, { type LabTest } from "@/components/cards/labTestCard";
import { featuredTestSlugs } from "@/components/home/content";
import { getTestBySlug } from "@/lib/catalog";
import { shell } from "@/components/ui/shell";

/* DL.pen "Popular Tests". */
export default function MostBookedTests() {
  const tests: LabTest[] = featuredTestSlugs
    .map((slug) => getTestBySlug(slug))
    .filter((t) => t !== undefined)
    .map((t) => ({
      slug: t.slug,
      title: t.title,
      description: t.description,
      price: t.price,
      originalPrice: t.originalPrice,
      category: t.category,
      fasting: t.fasting,
      reporting: t.reporting,
    }));

  return (
    <section aria-labelledby="tests-heading" className="bg-dl-bg py-9 md:py-24">
      <div className="flex flex-col gap-5 md:gap-9">
        <div className={shell}>
          <SectionHead
            id="tests-heading"
            title="Most booked tests"
            subtitle="Same-day reports on most tests · Home collection available"
            mobileSubtitle="Same-day reports on most tests"
            link={{ href: "/tests/", label: "See all" }}
          />
        </div>
        <div className={`${shell} max-md:px-0`}>
          <ul className="no-scrollbar flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 lg:grid-cols-4">
            {tests.map((test) => (
              <li key={test.slug} className="w-[282px] shrink-0 snap-start md:w-auto">
                <LabTestCard test={test} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

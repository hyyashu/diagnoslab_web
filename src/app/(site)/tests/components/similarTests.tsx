"use client";

import TestCard from "@/components/cards/testCard";
import rawData from "@/data/tests.json";

type RawTest = (typeof rawData.tests)[number];

type FormattedTest = {
  id: number;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  category: string;
  categories: string[];
  fasting: string;
  reporting: string;
  slug: string;
};

function formatTest(t: RawTest): FormattedTest {
  const categories = t.Categories ?? [];
  return {
    id: t.Id,
    title: t.TestName,
    description: t.Description,
    price: t.DiscountedPrice,
    originalPrice: Number(t.Price) || 0,
    category: categories[0] ?? "General",
    categories,
    fasting: t.Fasting?.trim() || "Not Required",
    reporting: t.Reporting?.trim() || "Same Day",
    slug: (t.Slug ?? "").toLowerCase(),
  };
}

export default function SimilarTests({ currentSlug }: { currentSlug: string }) {
  const normalizedSlug = currentSlug.toLowerCase();
  const allTests: FormattedTest[] = rawData.tests.map(formatTest);

  const current = allTests.find((t) => t.slug === normalizedSlug);
  if (!current) return null;

  const similar = allTests
    .filter((t) => t.slug !== normalizedSlug)
    .map((t) => {
      const matchCount = t.categories.filter((c) =>
        current.categories.includes(c)
      ).length;
      return { t, matchCount };
    })
    .filter((x) => x.matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount)
    .slice(0, 3)
    .map((x) => x.t);

  if (similar.length === 0) return null;

  return (
    <div className="mt-16 max-w-6xl mx-auto px-4">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-10 font-heading">
        Similar Tests
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {similar.map((test) => (
          <TestCard
            key={test.id}
            slug={test.slug}
            title={test.title}
            description={test.description}
            price={test.price}
            originalPrice={test.originalPrice}
            category={test.category}
            fasting={test.fasting}
            reporting={test.reporting}
          />
        ))}
      </div>
    </div>
  );
}
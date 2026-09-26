import { getPopularTests } from "@/lib/catalog";
import PopularTestsCarousel from "@/components/sections/popularTestsCarousel";

/* Server component: picks the 15 tests here so only they reach the browser,
   not the whole catalogue the carousel used to import. */
export default function PopularTests() {
  const tests = getPopularTests(15).map((t) => ({
    id: t.id,
    slug: t.slug,
    title: t.title,
    description: t.description,
    price: t.price,
    originalPrice: t.originalPrice,
    category: t.category,
    fasting: t.fasting,
    reporting: t.reporting,
  }));

  return <PopularTestsCarousel tests={tests} />;
}

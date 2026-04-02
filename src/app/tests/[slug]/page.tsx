import data from "@/data/tests.json";
import DetailCard from "../../components/detailCard";
import { DetailEntity } from "../../components/detailCard";

export function generateStaticParams() {
  return data.tests.map((test) => ({
    slug: test.Slug,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const test = data.tests.find(
    (t) => t.Slug === slug
  );

  if (!test) return <div>Test not found</div>;

  const entity: DetailEntity = {
    id: test.Id,
    name: test.TestName,
    slug: test.Slug,
    description: test.Description,
    price: Number(test.Price),
    discountedPrice: test.DiscountedPrice,
    categories: test.Categories ?? [],
    fasting: test.Fasting,
    reporting: test.Reporting,
    tat: test.Tat,
    sampleType: test.SampleType,
    whoShouldTake: "Anyone monitoring related symptoms or advised by their doctor may benefit from this test. Discuss timing and relevance with your healthcare provider.",
  };

  return <>
    <DetailCard kind="test" data={entity} />
  </>;
}
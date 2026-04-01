import data from "@/data/tests.json";
import DetailCard from "../../components/detailCard";
import { TestRecord } from "../../components/detailCard";

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

  return <>
        <DetailCard test={test as TestRecord} />
  </>;
}
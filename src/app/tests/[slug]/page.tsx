import data from "@/data/tests.json";
import DetailCard from "../../components/detailCard";
import { DetailEntity } from "../../components/detailCard";
import SimilarTests from "../components/similarTests";
import JsonLd from "../../components/JsonLd";
import type { Metadata } from "next";

export function generateStaticParams() {
  return data.tests.map((test) => ({
    slug: test.Slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const test = data.tests.find((t) => t.Slug === slug);

  if (!test) {
    return {
      title: { absolute: "Test Not Found | Diagnos Lab" },
    };
  }

  const title = `Book ${test.TestName} in Jamshedpur | Book Home Collection | Diagnos Lab`;

  const description = `Book ${test.TestName} test in Jamshedpur at Diagnos Lab. Home sample collection, same-day reports, affordable pricing, and trusted pathology lab.`;

  return {
    title: { absolute: title },
    description,

    keywords: [
      test.TestName,
      `${test.TestName} in Jamshedpur`,
      `Book ${test.TestName} in Jamshedpur`,
      `${test.TestName} Blood Test in Jamshedpur`,
      "Home Collection",
      ...(test.Categories ?? []),
    ],
    alternates: {
      canonical: `https://diagnoslab.in/tests/${test.Slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://diagnoslab.in/tests/${test.Slug}`,
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const test = data.tests.find((t) => t.Slug === slug);

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
    whoShouldTake:
      "Anyone monitoring related symptoms or advised by their doctor may benefit from this test.",
  };

  const testSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalTest",
    name: test.TestName,
    url: `https://diagnoslab.in/tests/${test.Slug}`,
    description: `${test.TestName} available at Diagnos Lab, Jamshedpur with home sample collection and same-day digital reports.`,
    usesDevice: {
      "@type": "MedicalDevice",
      name: "Clinical Laboratory Analyser",
    },
    usedToDiagnose: test.Categories?.join(", ") ?? "",
    provider: {
      "@type": "MedicalBusiness",
      name: "Diagnos Lab",
      url: "https://diagnoslab.in",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Jamshedpur",
        addressRegion: "Jharkhand",
        addressCountry: "IN",
      },
    },
  };

  return (
    <>
      <JsonLd data={testSchema} />
      <DetailCard kind="test" data={entity} />
      <SimilarTests currentSlug={slug} />
    </>
  );
}

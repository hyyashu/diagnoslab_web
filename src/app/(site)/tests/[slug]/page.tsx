import data from "@/data/tests.json";
import DetailCard from "@/components/cards/detailCard";
import { DetailEntity } from "@/components/cards/detailCard";
import SimilarTests from "../components/similarTests";
import JsonLd from "@/components/seo/jsonLd";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

function toTitleCase(str: string) {
  return str.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
}

export function generateStaticParams() {
  return data.tests
    .filter((test) => test.Slug && test.Slug.trim() !== "")
    .map((test) => ({ slug: test.Slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const test = data.tests.find((t) => t.Slug === slug);

  if (!test) {
    return { title: { absolute: "Test Not Found | Diagnos Lab" } };
  }

  const name = toTitleCase(test.TestName);
  const title = `${name} Test in Jamshedpur | Home Collection | Diagnos Lab`;

  const pricePart =
    test.DiscountedPrice > 0 ? ` at ₹${test.DiscountedPrice}` : "";
  const fastingPart =
    test.Fasting && test.Fasting.trim() ? ` Fasting: ${test.Fasting}.` : "";
  const reportingPart =
    test.Reporting && test.Reporting.trim()
      ? ` Reports in ${test.Reporting}.`
      : " Same-day digital reports.";

  const description = `Book ${name} test in Jamshedpur${pricePart} at Diagnos Lab, Sakchi.${fastingPart}${reportingPart} Home sample collection available across all Jamshedpur areas.`;

  return {
    title: { absolute: title },
    description,
    keywords: [
      `${name} test in Jamshedpur`,
      `${name} near me`,
      `book ${name} Jamshedpur`,
      `${name} home collection Jamshedpur`,
      `${name} price Jamshedpur`,
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
    robots: { index: true, follow: true },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const test = data.tests.find((t) => t.Slug === slug);

  if (!test) notFound();

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
    name: toTitleCase(test.TestName),
    url: `https://diagnoslab.in/tests/${test.Slug}`,
    description: `${toTitleCase(test.TestName)} test available at Diagnos Lab, Sakchi Jamshedpur. Home sample collection and same-day digital reports.`,
    usedToDiagnose: test.Categories?.join(", ") ?? "",
    provider: {
      "@type": "MedicalBusiness",
      name: "Diagnos Lab",
      telephone: "+918404802201",
      url: "https://diagnoslab.in",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Jamshedpur",
        addressRegion: "Jharkhand",
        addressCountry: "IN",
      },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://diagnoslab.in",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tests",
        item: "https://diagnoslab.in/tests",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${toTitleCase(test.TestName)} Test`,
        item: `https://diagnoslab.in/tests/${test.Slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={testSchema} />
      <JsonLd data={breadcrumbSchema} />
      <DetailCard kind="test" data={entity} />
      <SimilarTests currentSlug={slug} />
    </>
  );
}

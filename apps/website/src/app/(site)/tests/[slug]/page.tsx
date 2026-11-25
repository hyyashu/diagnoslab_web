import data from "@/data/tests.json";
import SimilarTests from "../components/similarTests";
import { TestMain } from "../components/testDetail";
import { testDetails } from "../details";
import { DetailBreadcrumb } from "@/components/detail/detailParts";
import CollectionSteps from "@/components/home/collectionSteps";
import FaqJsonLd from "@/components/seo/faqJsonLd";
import { labTestsFaq } from "@/lib/faq";
import { getTestBySlug } from "@/lib/catalog";
import JsonLd from "@/components/seo/jsonLd";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ORG_REF, breadcrumbSchema, detailMeta, pageUrl } from "@/lib/schema";
import { testDescription } from "@/lib/metaDescription";

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
    return { title: "Test Not Found" };
  }

  const name = toTitleCase(test.TestName);
  const title = `${name} Test in Jamshedpur | Home Collection`;

  const description = testDescription({
    name: getTestBySlug(test.Slug)?.title ?? name,
    price: test.DiscountedPrice,
    fasting: test.Fasting,
    reporting: test.Reporting,
  });

  return detailMeta({
    path: `/tests/${test.Slug}/`,
    title,
    description,
    keywords: [
      `${name} test in Jamshedpur`,
      `${name} near me`,
      `book ${name} Jamshedpur`,
      `${name} home collection Jamshedpur`,
      `${name} price Jamshedpur`,
      ...(test.Categories ?? []),
    ],
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const test = data.tests.find((t) => t.Slug === slug);

  if (!test) notFound();

  const t = getTestBySlug(slug);
  if (!t) notFound();
  const content = testDetails[t.slug];

  const testSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalTest",
    name: toTitleCase(test.TestName),
    url: pageUrl(`/tests/${test.Slug}/`),
    description: `${toTitleCase(test.TestName)} test available at Diagnos Lab, Sakchi Jamshedpur. Home sample collection and same-day digital reports.`,
    usedToDiagnose: test.Categories?.join(", ") ?? "",
    provider: ORG_REF,
  };

  const breadcrumb = breadcrumbSchema([
    ["Home", ""],
    ["Tests", "/tests/"],
    [`${toTitleCase(test.TestName)} Test`, `/tests/${test.Slug}/`],
  ]);

  return (
    <div className="pb-24 md:pb-0">
      <JsonLd data={testSchema} />
      <JsonLd data={breadcrumb} />
      <FaqJsonLd items={content?.faq ?? labTestsFaq.filter((f) => !f.desktopOnly)} />
      <DetailBreadcrumb parent={{ label: "Lab tests", href: "/tests/" }} title={t.title} />
      <TestMain test={t} d={content} />
      <CollectionSteps variant="cards" />
      <SimilarTests
        currentSlug={t.slug}
        name={content?.shortName ?? t.title}
        related={content?.related}
        subtitle={content?.relatedSubtitle}
        mobileSubtitle={content?.relatedSubtitleMobile}
      />
    </div>
  );
}

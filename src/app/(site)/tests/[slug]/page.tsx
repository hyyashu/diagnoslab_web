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
      canonical: `https://diagnoslab.in/tests/${test.Slug}/`,
    },
    openGraph: {
      title,
      description,
      url: `https://diagnoslab.in/tests/${test.Slug}/`,
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

  const t = getTestBySlug(slug);
  if (!t) notFound();
  const content = testDetails[t.slug];

  const testSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalTest",
    name: toTitleCase(test.TestName),
    url: `https://diagnoslab.in/tests/${test.Slug}/`,
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
        item: "https://diagnoslab.in/tests/",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${toTitleCase(test.TestName)} Test`,
        item: `https://diagnoslab.in/tests/${test.Slug}/`,
      },
    ],
  };

  return (
    <div className="pb-24 md:pb-0">
      <JsonLd data={testSchema} />
      <JsonLd data={breadcrumbSchema} />
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

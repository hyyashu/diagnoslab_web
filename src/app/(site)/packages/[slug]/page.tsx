import data from "@/data/packages.json";
import DetailCard, {
  DetailEntity,
} from "@/components/detailCard";
import SimilarPackages from "../components/similarPackages";
import JsonLd from "@/components/jsonLd";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return data.packages.map((pkg) => ({
    slug: pkg.Slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pkg = data.packages.find((p) => p.Slug === slug);

  if (!pkg) {
    return { title: { absolute: "Package Not Found | Diagnos Lab" } };
  }

  const title = `${pkg.PackageName} Health Package in Jamshedpur | Diagnos Lab`;

  const pricePart =
    pkg.DiscountedPrice > 0 ? ` at ₹${pkg.DiscountedPrice}` : "";
  const parametersPart = pkg.ParametersCovered
    ? ` Covers ${pkg.ParametersCovered}+ health parameters.`
    : "";
  const fastingPart =
    pkg.Fasting && pkg.Fasting.trim() ? ` Fasting: ${pkg.Fasting}.` : "";

  const description = `Book the ${pkg.PackageName} health checkup package in Jamshedpur${pricePart} at Diagnos Lab, Sakchi.${parametersPart}${fastingPart} Home sample collection available across all Jamshedpur areas.`;

  return {
    title: { absolute: title },
    description,
    keywords: [
      `${pkg.PackageName} package Jamshedpur`,
      `full body checkup Jamshedpur`,
      `health package near me`,
      `${pkg.PackageName} price Jamshedpur`,
      ...(pkg.Categories ? pkg.Categories.split(", ") : []),
    ],
    alternates: {
      canonical: `https://diagnoslab.in/packages/${pkg.Slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://diagnoslab.in/packages/${pkg.Slug}`,
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

  const pkg = data.packages.find(
    (p) => p.Slug === slug
  );

  if (!pkg) notFound();

  const entity: DetailEntity = {
    id: pkg.Id,
    name: pkg.PackageName,
    slug: pkg.Slug,
    description: pkg.Description,
    price: Number(pkg.Price),
    discountedPrice: pkg.DiscountedPrice,
    categories: pkg.Categories?.split(", ") ?? [],
    fasting: pkg.Fasting,
    reporting: pkg.Reporting,
    whoShouldTake: "A comprehensive full-body health check-up designed to assess your wellness.",
    parametersCovered: pkg.ParametersCovered,
  };

  const packageSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${pkg.PackageName} Health Package`,
    url: `https://diagnoslab.in/packages/${pkg.Slug}`,
    description: pkg.Description,
    offers: {
      "@type": "Offer",
      price: pkg.DiscountedPrice,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: `https://diagnoslab.in/packages/${pkg.Slug}`,
    },
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
        name: "Packages",
        item: "https://diagnoslab.in/packages",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${pkg.PackageName} Health Package`,
        item: `https://diagnoslab.in/packages/${pkg.Slug}`,
      },
    ],
  };

  return <>
    <JsonLd data={packageSchema} />
    <JsonLd data={breadcrumbSchema} />
    <DetailCard kind="package" data={entity} />
    <SimilarPackages currentSlug={slug} />
  </>;
}
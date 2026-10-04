import data from "@/data/packages.json";
import SimilarPackages from "../components/similarPackages";
import { PackageMain, resolveDetails } from "../components/packageDetail";
import { DetailBreadcrumb, bookingItem } from "@/components/detail/detailParts";
import { featured, toListing } from "../content";
import { packageDetails } from "../details";
import type { ListingPackage } from "@/components/cards/packageListingCards";
import CollectionSteps from "@/components/home/collectionSteps";
import FaqJsonLd from "@/components/seo/faqJsonLd";
import { getPackageBySlug } from "@/lib/catalog";
import JsonLd from "@/components/seo/jsonLd";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ORG_REF, breadcrumbSchema, detailMeta, pageUrl } from "@/lib/schema";

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

  return detailMeta({
    path: `/packages/${pkg.Slug}/`,
    title,
    description,
    keywords: [
      `${pkg.PackageName} package Jamshedpur`,
      `full body checkup Jamshedpur`,
      `health package near me`,
      `${pkg.PackageName} price Jamshedpur`,
      ...(pkg.Categories ? pkg.Categories.split(", ") : []),
    ],
  });
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

  const p = getPackageBySlug(slug);
  if (!p) notFound();
  const extra = featured[p.slug as keyof typeof featured];
  const listing: ListingPackage = {
    ...toListing(p),
    ...(extra && { summary: extra.summary, includes: [...extra.includes] }),
  };

  const content = packageDetails[p.slug];
  const details = resolveDetails(listing, content);
  const item = bookingItem({ kind: "package", ...p });

  const packageSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${pkg.PackageName} Health Package`,
    url: pageUrl(`/packages/${pkg.Slug}/`),
    description: pkg.Description,
    offers: {
      "@type": "Offer",
      price: pkg.DiscountedPrice,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: pageUrl(`/packages/${pkg.Slug}/`),
    },
    provider: ORG_REF,
  };

  const breadcrumb = breadcrumbSchema([
    ["Home", ""],
    ["Packages", "/packages/"],
    [`${pkg.PackageName} Health Package`, `/packages/${pkg.Slug}/`],
  ]);

  return (
    <div className="pb-24 md:pb-0">
      <JsonLd data={packageSchema} />
      <JsonLd data={breadcrumb} />
      <FaqJsonLd items={details.faq} />
      <DetailBreadcrumb parent={{ label: "Health packages", href: "/packages/" }} title={p.title} />
      <PackageMain pkg={listing} d={details} item={item} />
      <CollectionSteps variant="cards" />
      <SimilarPackages currentSlug={p.slug} compare={content?.compare} subtitle={content?.compareSubtitle}
        mobileSubtitle={content?.compareSubtitleMobile}
      />
    </div>
  );
}

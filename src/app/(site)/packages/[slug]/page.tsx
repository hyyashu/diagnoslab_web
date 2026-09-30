import data from "@/data/packages.json";
import SimilarPackages from "../components/similarPackages";
import { PackageMain, resolveDetails } from "../components/packageDetail";
import { DetailBreadcrumb } from "@/components/detail/detailParts";
import type { BookingItem } from "@/components/detail/detailClient";
import { categoryLabel, featured, summaries } from "../content";
import { packageDetails } from "../details";
import type { ListingPackage } from "@/components/cards/packageListingCards";
import CollectionSteps from "@/components/home/collectionSteps";
import FaqJsonLd from "@/components/seo/faqJsonLd";
import { getPackageBySlug } from "@/lib/catalog";
import JsonLd from "@/components/seo/jsonLd";
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
      canonical: `https://diagnoslab.in/packages/${pkg.Slug}/`,
    },
    openGraph: {
      title,
      description,
      url: `https://diagnoslab.in/packages/${pkg.Slug}/`,
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

  const p = getPackageBySlug(slug);
  if (!p) notFound();
  const extra = featured[p.slug as keyof typeof featured];
  const listing: ListingPackage = {
    slug: p.slug,
    title: p.title,
    description: p.description,
    price: p.price,
    originalPrice: p.originalPrice,
    parameters: p.parameters,
    categories: p.categories,
    fasting: p.fasting,
    reporting: p.reporting,
    categoryLabel: categoryLabel(p.slug, p.categories),
    summary: extra?.summary ?? summaries[p.slug],
    includes: extra ? [...extra.includes] : undefined,
  };

  const content = packageDetails[p.slug];
  const details = resolveDetails(listing, content);
  /* Same lead payload as the package cards. */
  const item: BookingItem = {
    name: p.title,
    price: p.price,
    originalPrice: p.originalPrice,
    sourceData: {
      package_name: p.title,
      package_description: p.description,
      package_price: p.price,
      package_original_price: p.originalPrice,
      package_parameters: p.parameters,
      package_categories: p.categories.split(","),
      package_fasting: p.fasting,
      package_reporting: p.reporting,
    },
  };

  const packageSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${pkg.PackageName} Health Package`,
    url: `https://diagnoslab.in/packages/${pkg.Slug}/`,
    description: pkg.Description,
    offers: {
      "@type": "Offer",
      price: pkg.DiscountedPrice,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: `https://diagnoslab.in/packages/${pkg.Slug}/`,
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
        item: "https://diagnoslab.in/packages/",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${pkg.PackageName} Health Package`,
        item: `https://diagnoslab.in/packages/${pkg.Slug}/`,
      },
    ],
  };

  return (
    <div className="pb-24 md:pb-0">
      <JsonLd data={packageSchema} />
      <JsonLd data={breadcrumbSchema} />
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

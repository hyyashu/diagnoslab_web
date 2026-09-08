import type { Metadata } from "next";
import { notFound } from "next/navigation";
import areasData from "@/data/areasServed.json";
import AreaHero from "../components/areaHero";
import WhyDiagnosLab from "@/components/sections/whyDiagnos";
import PopularTests from "@/components/sections/popularTests";
import PopularHealthPackages from "@/components/sections/packages";
import JsonLd from "@/components/seo/jsonLd";

const areas = areasData.areas;

export function generateStaticParams() {
  return areas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = areas.find((a) => a.slug === slug);

  if (!area) {
    return { title: { absolute: "Area Not Found | Diagnos Lab" } };
  }

  const title = `Blood Test in ${area.name}, Jamshedpur | Diagnos Lab`;
  const description = `Book blood tests, ultrasound, ECG, X-Ray, and health packages in ${area.name}, Jamshedpur at Diagnos Lab. Home sample collection available in ${area.name} with same-day digital reports from our Sakchi lab.`;

  return {
    title: { absolute: title },
    description,
    keywords: [
      `blood test in ${area.name}`,
      `lab near me ${area.name}`,
      `diagnostic centre ${area.name} Jamshedpur`,
      `home collection ${area.name}`,
      `pathology lab ${area.name}`,
      `blood test ${area.name} Jamshedpur`,
    ],
    alternates: {
      canonical: `https://diagnoslab.in/area/${area.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://diagnoslab.in/area/${area.slug}`,
    },
  };
}

export default async function AreaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = areas.find((a) => a.slug === slug);

  if (!area) notFound();

  const areaSchema = {
    "@context": "https://schema.org",
    /* An area page describes a service Diagnos Lab offers there - not a
       separate location. Declaring MedicalBusiness here made every area page
       look like another branch with an incomplete address. */
    "@type": "Service",
    name: `Blood Tests & Diagnostics in ${area.name}`,
    serviceType: "Diagnostic laboratory services",
    url: `https://diagnoslab.in/area/${area.slug}`,
    areaServed: {
      "@type": "Place",
      name: `${area.name}, Jamshedpur`,
    },
    provider: { "@id": "https://diagnoslab.in/#organization" },
    description: `Diagnos Lab provides blood tests, ultrasound, ECG, X-Ray, and home sample collection services in ${area.name}, Jamshedpur.`,
  };

  return (
    <>
      <JsonLd data={areaSchema} />
      <AreaHero areaName={area.name} />
      <WhyDiagnosLab />
      <PopularTests />
      <PopularHealthPackages />
    </>
  );
}

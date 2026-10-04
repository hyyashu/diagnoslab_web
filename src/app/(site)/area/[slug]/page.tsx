import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { areas } from "@/lib/catalog";
import { Clock3, FileCheck, Star } from "lucide-react";
import ServicePageHero from "@/components/sections/servicePageHero";
import HowItWorks from "@/components/sections/howItWorks";
import FindUsPanel from "@/components/sections/findUsPanel";
import PatientReviews from "@/components/sections/patientReviews";
import FAQAccordion from "@/components/sections/faq";
import FaqJsonLd from "@/components/seo/faqJsonLd";
import JsonLd from "@/components/seo/jsonLd";
import ServicesStrip from "../components/servicesStrip";
import FeaturedTests from "@/components/sections/featuredTests";
import FeaturedPackages from "@/components/sections/featuredPackages";
import { areaFaq, centreFor } from "../content";
import { ORG_REF, breadcrumbSchema, pageUrl } from "@/lib/schema";


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
      canonical: pageUrl(`/area/${area.slug}/`),
    },
    openGraph: {
      title,
      description,
      url: pageUrl(`/area/${area.slug}/`),
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
    url: pageUrl(`/area/${area.slug}/`),
    areaServed: {
      "@type": "Place",
      name: `${area.name}, Jamshedpur`,
    },
    provider: ORG_REF,
    description: `Diagnos Lab provides blood tests, ultrasound, ECG, X-Ray, and home sample collection services in ${area.name}, Jamshedpur.`,
  };

  const url = pageUrl(`/area/${area.slug}/`);
  const breadcrumb = breadcrumbSchema([
    ["Home", ""],
    [area.name, url],
  ]);

  const { centre, hasCentre } = centreFor(area);
  const faq = areaFaq(area);
  const where = hasCentre ? `our ${area.name} centre` : "our Sakchi lab";

  return (
    <>
      <JsonLd data={areaSchema} />
      <JsonLd data={breadcrumb} />
      <ServicePageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Jamshedpur" }, { label: area.name }]}
        eyebrow={
          hasCentre
            ? `${area.name} centre open today · Home collection from 6 AM`
            : `Home collection in ${area.name} from 6 AM`
        }
        title={`Blood tests & diagnostics in ${area.name}, Jamshedpur`}
        subtitle={`Pathology, ultrasound, ECG, X-ray and PFT at ${where}, or book a home sample collection anywhere in ${area.name}, starting 6 AM.`}
        proofPoints={[
          { icon: Clock3, value: "6 AM", label: "Home collection starts", mobileLabel: "Collection" },
          { icon: FileCheck, value: "Same day", label: "Most blood reports", mobileLabel: "Reports" },
          { icon: Star, value: "4.9", label: "3,000+ Google reviews", mobileLabel: "Google rating" },
        ]}
        cta={{ label: "Book home collection", href: "#enquiry-form" }}
        form={{
          services: ["Blood test", "Health package", "Home collection", "Ultrasound", "ECG / 2D ECHO", "X-Ray", "PFT"],
          serviceLabel: "Test or service",
          servicePlaceholder: "Select a test or service",
        }}
      />
      <ServicesStrip areaName={area.name} />
      <FeaturedTests
        eyebrow={`BOOKED MOST IN ${area.name.toUpperCase()}`}
        title="Popular blood tests"
        subtitle="Transparent prices. Same-day reports on WhatsApp."
      />
      <FeaturedPackages title={`Full-body checkups, collected at home in ${area.name}`} />
      <HowItWorks
        title={`Two easy ways to get tested in ${area.name}`}
        subtitle={`Walk in to ${where}, or book a home collection and we'll come to you.`}
        labSubtitle={`${centre.name} · Open 7:30 AM – 7:30 PM`}
        homeSubtitle={`Anywhere in ${area.name} · Slots from 6 AM`}
        labCta={{ label: "Get directions", href: centre.directionsHref }}
      />
      <FindUsPanel
        tone="muted"
        title={hasCentre ? `Our ${area.name} centre` : "Our nearest centre"}
        subtitle={
          hasCentre
            ? `Walk in any day, no appointment needed. Prefer home? Our phlebotomists cover all of ${area.name} and nearby areas.`
            : `Walk in to our main lab in Sakchi any day, no appointment needed. Prefer home? Our phlebotomists cover all of ${area.name}.`
        }
        mobileSubtitle={`Walk in any day, or book a home collection in ${area.name}.`}
        centre={{ title: centre.name, text: centre.address, directionsHref: centre.directionsHref, mapSrc: centre.mapSrc }}
        areasHeading="HOME COLLECTION ALSO AVAILABLE IN"
        currentArea={area.slug}
      />
      <PatientReviews tone="white" subtitle={`Real Google reviews from patients in and around ${area.name}`} />
      <FaqJsonLd items={faq} />
      <FAQAccordion
        title={`${area.name} FAQs`}
        items={faq}
        intro="Still unsure? Message us on WhatsApp and our team will help you pick the right test."
        tone="muted"
      />
    </>
  );
}

import type { Metadata } from "next";
import HomeHero from "@/components/home/homeHero";
import CheckupPackages from "@/components/home/checkupPackages";
import HealthConcerns from "@/components/home/healthConcerns";
import MostBookedTests from "@/components/home/mostBookedTests";
import RadiologyImaging from "@/components/home/radiologyImaging";
import CollectionSteps from "@/components/home/collectionSteps";
import TrustBand from "@/components/home/trustBand";
import FindUsAreas from "@/components/sections/findUsAreas";
import PatientReviews from "@/components/sections/patientReviews";
import JsonLd from "@/components/seo/jsonLd";
import { BUSINESS_TYPE, PHONE_DISPLAY } from "@/lib/contact";
import FaqJsonLd from "@/components/seo/faqJsonLd";
import FAQAccordion from "@/components/sections/faq";
import { ORG_ID, SITE_URL, ogDefaults } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Blood Test, Ultrasound & Home Collection in Jamshedpur",
  description:
    `Jamshedpur's top-rated diagnostic lab in Sakchi: blood tests, ultrasound by a female radiologist, ECG, X-ray. Home collection from 6 AM. Call ${PHONE_DISPLAY}.`,
  keywords: [
    "Blood Test in Jamshedpur",
    "Diagnostic Center Jamshedpur",
    "Pathology Lab Sakchi",
    "Home Blood Collection Jamshedpur",
    "Ultrasound in Jamshedpur",
    "Best Lab in Jamshedpur",
    "Health Packages Jamshedpur",
    "Lab near me Jamshedpur",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    ...ogDefaults,
    title: "Blood Test, Ultrasound & Radiology in Jamshedpur",
    description:
      "Top-rated diagnostic centre in Sakchi, Jamshedpur. Blood tests, USG, ECG, X-Ray, and health packages with home collection.",
    url: SITE_URL,
  },
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Diagnos Lab – Blood Test, Ultrasound & Diagnostic Centre Jamshedpur",
  url: SITE_URL,
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", ".speakable-description"],
  },
  about: {
    "@id": ORG_ID,
    "@type": BUSINESS_TYPE,
    name: "Diagnos Lab",
    description:
      "Diagnos Lab is Jamshedpur's top-rated diagnostic centre in Sakchi offering blood tests, ultrasound by female radiologist, ECG, X-Ray, and health packages with home sample collection and same-day digital reports.",
  },
};

export default function Home() {
  return (
    <>
      <JsonLd data={webPageSchema} />
      <HomeHero />
      <CheckupPackages />
      <HealthConcerns />
      <MostBookedTests />
      <RadiologyImaging />
      <CollectionSteps variant="cards" />
      <TrustBand />
      <FindUsAreas bordered />
      <PatientReviews tone="white" />
      <FaqJsonLd />
      <FAQAccordion />
    </>
  );
}

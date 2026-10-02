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
import FaqJsonLd from "@/components/seo/faqJsonLd";
import FAQAccordion from "@/components/sections/faq";

export const metadata: Metadata = {
  title: { absolute: "Diagnos Lab Jamshedpur | Blood Test, Ultrasound & Home Collection" },
  description:
    "Jamshedpur's top-rated diagnostic lab in Sakchi. Blood tests, ultrasound by female radiologist, ECG & X-Ray. Home sample collection across all areas. Same-day digital reports. Call 8404802214.",
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
    canonical: "https://diagnoslab.in",
  },
  openGraph: {
    title: "Diagnos Lab | Blood Test, Ultrasound & Radiology in Jamshedpur",
    description:
      "Top-rated diagnostic centre in Sakchi, Jamshedpur. Blood tests, USG, ECG, X-Ray, and health packages with home collection.",
    url: "https://diagnoslab.in",
  },
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Diagnos Lab – Blood Test, Ultrasound & Diagnostic Centre Jamshedpur",
  url: "https://diagnoslab.in",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", ".speakable-description"],
  },
  about: {
    "@type": "MedicalBusiness",
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

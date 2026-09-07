import type { Metadata } from "next";
import WhyDiagnosLab from "@/components/whyDiagnos/whyDiagnos";
import PopularTests from "@/components/popularTests";
import Packages from "@/components/packages";
import HeroSection from "@/components/hero";
import RadiologyServices from "@/components/radiology/services";
import JsonLd from "@/components/jsonLd";

export const metadata: Metadata = {
  title: { absolute: "Diagnos Lab Jamshedpur | Blood Test, Ultrasound & Home Collection" },
  description:
    "Jamshedpur's top-rated diagnostic lab in Sakchi. Blood tests, ultrasound by female radiologist, ECG & X-Ray. Home sample collection across all areas. Same-day digital reports. Call 8404802201.",
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
      <HeroSection />
      <WhyDiagnosLab />
      <PopularTests />
      <Packages />
      <RadiologyServices />
    </>
  );
}

import type { Metadata } from "next";
import WhyDiagnosLab from "./components/whyDiagnos/whyDiagnos";
import PopularTests from "./components/popularTests";
import Packages from "./components/packages";
import HeroSection from "./components/hero";
import RadiologyServices from "./components/radiology/services";

export const metadata: Metadata = {
  title: { absolute: "Diagnos Lab | Book Blood Test & Ultrasound in Jamshedpur" },
  description:
    "Diagnos Lab in Sakchi, Jamshedpur offers blood tests, ultrasound (USG), ECG, X-Ray, PFT, and health packages. Home sample collection available across Jamshedpur. Reports in 6–12 hours.",
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

export default function Home() {
  return (
    <>
      <HeroSection />
      <WhyDiagnosLab />
      <PopularTests />
      <Packages />
      <RadiologyServices />
    </>
  );
}

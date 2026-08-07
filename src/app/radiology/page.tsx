import type { Metadata } from "next";
import RadiologySection from "./components/radiologySection";
import WhyChoose from "./components/whyChoose";
import HeroSection from "../components/hero";

export const metadata: Metadata = {
  title: { absolute: "Diagnos Lab | Radiology Services in Jamshedpur" },
  description:
    "Book radiology services at Diagnos Lab in Jamshedpur — Ultrasound, X-Ray, ECG, and PFT with fast reporting and experienced specialists.",
  keywords: [
    "Radiology Services in Jamshedpur",
    "Ultrasound in Jamshedpur",
    "X-Ray in Jamshedpur",
    "ECG in Jamshedpur",
    "Diagnostic Center in Jamshedpur",
  ],
  alternates: {
    canonical: "https://diagnoslab.in/radiology",
  },
  openGraph: {
    title: "Diagnos Lab | Radiology Services in Jamshedpur",
    description:
      "Book radiology services at Diagnos Lab in Jamshedpur — Ultrasound, X-Ray, ECG, and PFT with fast reporting and experienced specialists.",
    url: "https://diagnoslab.in/radiology",
    images: ["/images/diagnoslogo.avif"],
  },
};

export default function Page() {
  return (
    <>
      <HeroSection />
      <WhyChoose />
      <RadiologySection />
    </>
  );
}

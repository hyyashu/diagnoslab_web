import type { Metadata } from "next";
import HeroSection from "./components/hero";
import WhyChoose from "./components/whyChoose";
import EcgSection from "./components/ecgSection";

export const metadata: Metadata = {
  title: { absolute: "Diagnos Lab | Book ECG in Jamshedpur" },
  description:
    "Book ECG at Diagnos Lab in Jamshedpur. Quick heart rhythm and electrical activity testing with reports in 1–2 hours.",
  keywords: [
    "ECG in Jamshedpur",
    "ECG in Sakchi",
    "Electrocardiogram Jamshedpur",
    "Heart Test Jamshedpur",
    "Diagnostic Center in Jamshedpur",
    "Diagnos Lab in Jamshedpur",
  ],
  openGraph: {
    title: "Diagnos Lab | Book ECG in Jamshedpur",
    description:
      "Book ECG at Diagnos Lab in Jamshedpur. Quick heart rhythm and electrical activity testing with reports in 1–2 hours.",
    images: ["/images/diagnoslogo.avif"],
  },
};

export default function Page() {
  return (
    <>
      <HeroSection />
      <WhyChoose />
      <EcgSection />
    </>
  );
}

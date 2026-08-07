import type { Metadata } from "next";
import HeroSection from "./components/hero";
import WhyChoose from "./components/whyChoose";
import XraySection from "./components/xraySection";

export const metadata: Metadata = {
  title: { absolute: "Diagnos Lab | Book X-Ray in Jamshedpur" },
  description:
    "Book digital X-Ray at Diagnos Lab in Jamshedpur. Fast, low-radiation imaging for bones, chest, spine, and joints with reports in 1–2 hours.",
  keywords: [
    "X-Ray in Jamshedpur",
    "X-Ray in Sakchi",
    "Digital X-Ray Jamshedpur",
    "Chest X-Ray Jamshedpur",
    "Diagnostic Center in Jamshedpur",
    "Diagnos Lab in Jamshedpur",
  ],
  alternates: {
    canonical: "https://diagnoslab.in/xray",
  },
  openGraph: {
    title: "Diagnos Lab | Book X-Ray in Jamshedpur",
    description:
      "Book digital X-Ray at Diagnos Lab in Jamshedpur. Fast, low-radiation imaging for bones, chest, spine, and joints with reports in 1–2 hours.",
    url: "https://diagnoslab.in/xray",
    images: ["/images/diagnoslogo.avif"],
  },
};

export default function Page() {
  return (
    <>
      <HeroSection />
      <WhyChoose />
      <XraySection />
    </>
  );
}

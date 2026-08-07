import type { Metadata } from "next";
import HeroSection from "./components/hero";
import WhyChoose from "./components/whyChoose";
import UltrasoundSection from "./components/ultrasoundSection";
import ScanTypes from "./components/scanTypes";
import Preparation from "./components/preparation";

export const metadata: Metadata = {
  title: { absolute: "Diagnos Lab | Book Ultrasound (USG) in Jamshedpur" },
  description:
    "Book ultrasound (USG) at Diagnos Lab in Jamshedpur. Safe, radiation-free imaging for abdomen, pelvis, pregnancy, thyroid, and more. Reports in 1–2 hours.",
  keywords: [
    "Ultrasound in Jamshedpur",
    "USG in Jamshedpur",
    "Ultrasound in Sakchi",
    "Pregnancy Ultrasound Jamshedpur",
    "Abdominal Ultrasound Jamshedpur",
    "Female Radiologist Ultrasound Jamshedpur",
    "Diagnostic Center in Jamshedpur",
    "Diagnos Lab in Jamshedpur",
  ],
  openGraph: {
    title: "Diagnos Lab | Book Ultrasound (USG) in Jamshedpur",
    description:
      "Book ultrasound (USG) at Diagnos Lab in Jamshedpur. Safe, radiation-free imaging for abdomen, pelvis, pregnancy, thyroid, and more. Reports in 1–2 hours.",
    images: ["/images/diagnoslogo.avif"],
  },
};

export default function Page() {
  return (
    <>
      <HeroSection />
      <WhyChoose />
      <UltrasoundSection />
      <ScanTypes />
      <Preparation />
    </>
  );
}

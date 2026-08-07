import type { Metadata } from "next";
import HeroSection from "./components/hero";
import WhyChoose from "./components/whyChoose";
import UltrasoundSection from "./components/ultrasoundSection";
import ScanTypes from "./components/scanTypes";
import Preparation from "./components/preparation";
import JsonLd from "@/app/components/JsonLd";

export const metadata: Metadata = {
  title: {
    absolute:
      "Book Ultrasound (USG) in Jamshedpur | Female Radiologist | Diagnos Lab",
  },
  description:
    "USG by experienced female radiologist at Diagnos Lab, Sakchi Jamshedpur. Pregnancy, anomaly, abdomen, pelvis & thyroid scans. Digital reports in 1–2 hrs.",
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
  alternates: {
    canonical: "https://diagnoslab.in/ultrasound-in-jamshedpur",
  },
  openGraph: {
    title: "Diagnos Lab | Book Ultrasound (USG) in Jamshedpur",
    description:
      "Book ultrasound (USG) at Diagnos Lab in Jamshedpur. Safe, radiation-free imaging for abdomen, pelvis, pregnancy, thyroid, and more. Reports in 1–2 hours.",
    url: "https://diagnoslab.in/ultrasound-in-jamshedpur",
    images: ["/images/diagnoslogo.avif"],
  },
};

const ultrasoundSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalProcedure",
  name: "Ultrasound (USG) in Jamshedpur",
  url: "https://diagnoslab.in/ultrasound-in-jamshedpur",
  description:
    "Ultrasound imaging performed by an experienced female radiologist at Diagnos Lab, Sakchi, Jamshedpur. Services include pregnancy scans, anomaly scan, abdomen, pelvis, thyroid, and Doppler ultrasound.",
  procedureType: "Diagnostic",
  followup: "Report available within 1–2 hours",
  howPerformed:
    "Non-invasive, radiation-free imaging using high-frequency sound waves",
  performer: {
    "@type": "MedicalBusiness",
    name: "Diagnos Lab",
    telephone: "+918404802201",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sakchi, Jamshedpur",
      addressRegion: "Jharkhand",
    },
  },
};

const ultrasoundFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does an ultrasound cost at Diagnos Lab in Jamshedpur?",
      acceptedAnswer: { "@type": "Answer", text: "Ultrasound prices at Diagnos Lab vary by scan type. Call +91 8404802201 for current pricing on pregnancy scans, abdomen USG, pelvis, and other ultrasound tests." },
    },
    {
      "@type": "Question",
      name: "Is there a female radiologist for ultrasound in Jamshedpur?",
      acceptedAnswer: { "@type": "Answer", text: "Yes, Diagnos Lab in Sakchi, Jamshedpur has an experienced female radiologist for all USG examinations including pregnancy, anomaly, pelvis, and abdomen scans." },
    },
    {
      "@type": "Question",
      name: "What types of ultrasound scans are available at Diagnos Lab?",
      acceptedAnswer: { "@type": "Answer", text: "Diagnos Lab offers whole abdomen USG, pelvis USG, pregnancy scans (NT scan, anomaly scan, follicular study), thyroid USG, Doppler studies, and obstetric scans." },
    },
    {
      "@type": "Question",
      name: "Do I need to prepare for an ultrasound?",
      acceptedAnswer: { "@type": "Answer", text: "Preparation depends on the scan type. For abdomen USG, 4–6 hours of fasting is recommended. For pelvis USG, a full bladder is required. Pregnancy scans generally require no special preparation." },
    },
    {
      "@type": "Question",
      name: "How long does it take to get ultrasound results at Diagnos Lab?",
      acceptedAnswer: { "@type": "Answer", text: "Ultrasound reports at Diagnos Lab are available within 1–2 hours of the scan and delivered digitally on WhatsApp and email." },
    },
  ],
};

const ultrasoundBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://diagnoslab.in" },
    { "@type": "ListItem", position: 2, name: "Ultrasound in Jamshedpur", item: "https://diagnoslab.in/ultrasound-in-jamshedpur" },
  ],
};

export default function Page() {
  return (
    <>
      <JsonLd data={ultrasoundSchema} />
      <JsonLd data={ultrasoundFaqSchema} />
      <JsonLd data={ultrasoundBreadcrumb} />
      <HeroSection />
      <WhyChoose />
      <UltrasoundSection />
      <ScanTypes />
      <Preparation />
    </>
  );
}

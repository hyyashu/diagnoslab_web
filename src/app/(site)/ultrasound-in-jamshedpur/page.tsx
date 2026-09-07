import type { Metadata } from "next";
import { Monitor, Users, UserCheck, Clock } from "lucide-react";
import ServiceHero from "@/components/sections/serviceHero";
import ServiceWhyChoose from "@/components/sections/serviceWhyChoose";
import UltrasoundSection from "./components/ultrasoundSection";
import ScanTypes from "./components/scanTypes";
import Preparation from "./components/preparation";
import JsonLd from "@/components/seo/jsonLd";
import RelatedServices from "@/components/sections/relatedServices";

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

const ultrasoundBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://diagnoslab.in" },
    { "@type": "ListItem", position: 2, name: "Ultrasound in Jamshedpur", item: "https://diagnoslab.in/ultrasound-in-jamshedpur" },
  ],
};

const features = [
  { icon: <Monitor size={32} />, title: "Advanced USG Equipment" },
  { icon: <Users size={32} />, title: "Experienced Radiology Team" },
  { icon: <UserCheck size={32} />, title: "Female Radiologist for female cases" },
  { icon: <Clock size={32} />, title: "Same Day Reports" },
];

export default function Page() {
  return (
    <>
      <JsonLd data={ultrasoundSchema} />
      <JsonLd data={ultrasoundBreadcrumb} />
      <ServiceHero
        imageSrc="/images/radiology/USG.avif"
        imageAlt="Ultrasound in Jamshedpur at Diagnos Lab"
        titleTop="Ultrasound (USG)"
        titleBottom="in Jamshedpur"
        services="Abdomen | Pelvis | Pregnancy | Thyroid | Reports in 1–2 hours"
      />
      <ServiceWhyChoose
        title="Why Choose Ultrasound at Diagnos Lab"
        description="Trusted ultrasound imaging in Jamshedpur with clear reports, experienced radiologists, and same-day turnaround."
        features={features}
      />
      <UltrasoundSection />
      <ScanTypes />
      <Preparation />
      <RelatedServices current="ultrasound" pageTitle="Ultrasound" />
    </>
  );
}

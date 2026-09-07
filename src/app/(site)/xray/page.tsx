import type { Metadata } from "next";
import { Monitor, Users, Clock, ShieldCheck } from "lucide-react";
import ServiceHero from "@/components/service/serviceHero";
import ServiceWhyChoose from "@/components/service/serviceWhyChoose";
import XraySection from "./components/xraySection";
import JsonLd from "@/components/jsonLd";
import RelatedServices from "@/components/relatedServices";

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

const xraySchema = {
  "@context": "https://schema.org",
  "@type": "MedicalProcedure",
  name: "X-Ray in Jamshedpur",
  url: "https://diagnoslab.in/xray",
  description:
    "Digital X-Ray for bones, chest, spine, and joints at Diagnos Lab, Sakchi Jamshedpur. Low-radiation imaging with same-day reports.",
  procedureType: "Diagnostic",
  followup: "Reports available within 1–2 hours",
  howPerformed: "Digital radiography using low-dose X-ray radiation to produce high-resolution images",
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

const xrayBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://diagnoslab.in" },
    { "@type": "ListItem", position: 2, name: "X-Ray in Jamshedpur", item: "https://diagnoslab.in/xray" },
  ],
};

const features = [
  { icon: <Monitor size={32} />, title: "Modern X-Ray Equipment" },
  { icon: <Users size={32} />, title: "Experienced Radiology Team" },
  { icon: <ShieldCheck size={32} />, title: "Low-radiation imaging" },
  { icon: <Clock size={32} />, title: "Reports Same Day" },
];

export default function Page() {
  return (
    <>
      <JsonLd data={xraySchema} />
      <JsonLd data={xrayBreadcrumb} />
      <ServiceHero
        imageSrc="/images/radiology/XRAY.avif"
        imageAlt="X-Ray at Diagnos Lab"
        titleTop="Digital X-Ray"
        titleBottom="in Jamshedpur"
        services="Fractures | Chest | Spine | Joints | Reports in 1–2 hours"
      />
      <ServiceWhyChoose
        title="Why Choose X-Ray at Diagnos Lab"
        features={features}
      />
      <XraySection />
      <RelatedServices current="xray" pageTitle="X-Ray" />
    </>
  );
}

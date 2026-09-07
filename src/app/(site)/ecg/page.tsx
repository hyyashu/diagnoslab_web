import type { Metadata } from "next";
import { Activity, Users, Clock, HeartPulse } from "lucide-react";
import ServiceHero from "@/components/service/serviceHero";
import ServiceWhyChoose from "@/components/service/serviceWhyChoose";
import EcgSection from "./components/ecgSection";
import JsonLd from "@/components/jsonLd";
import RelatedServices from "@/components/relatedServices";

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
  alternates: {
    canonical: "https://diagnoslab.in/ecg",
  },
  openGraph: {
    title: "Diagnos Lab | Book ECG in Jamshedpur",
    description:
      "Book ECG at Diagnos Lab in Jamshedpur. Quick heart rhythm and electrical activity testing with reports in 1–2 hours.",
    url: "https://diagnoslab.in/ecg",
    images: ["/images/diagnoslogo.avif"],
  },
};

const ecgSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalProcedure",
  name: "ECG Test in Jamshedpur",
  url: "https://diagnoslab.in/ecg",
  description:
    "12-lead ECG (electrocardiogram) for heart rhythm and electrical activity analysis at Diagnos Lab, Sakchi Jamshedpur. Reports available within 1–2 hours.",
  procedureType: "Diagnostic",
  followup: "Reports available within 1–2 hours",
  howPerformed: "Non-invasive recording of the heart's electrical activity using electrodes placed on skin",
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

const ecgBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://diagnoslab.in" },
    { "@type": "ListItem", position: 2, name: "ECG Test in Jamshedpur", item: "https://diagnoslab.in/ecg" },
  ],
};

const features = [
  { icon: <Activity size={32} />, title: "Modern ECG Equipment" },
  { icon: <Users size={32} />, title: "Experienced Cardiac Team" },
  { icon: <HeartPulse size={32} />, title: "Quick & painless test" },
  { icon: <Clock size={32} />, title: "Reports Same Day" },
];

export default function Page() {
  return (
    <>
      <JsonLd data={ecgSchema} />
      <JsonLd data={ecgBreadcrumb} />
      <ServiceHero
        imageSrc="/images/radiology/ECG.avif"
        imageAlt="ECG at Diagnos Lab"
        titleTop="ECG Test"
        titleBottom="in Jamshedpur"
        services="Chest Pain | Irregular Heartbeat | Pre-Surgery | Reports Same Day"
      />
      <ServiceWhyChoose
        title="Why Choose ECG at Diagnos Lab"
        features={features}
      />
      <EcgSection />
      <RelatedServices current="ecg" pageTitle="ECG" />
    </>
  );
}

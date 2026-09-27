import type { Metadata } from "next";
import { Clock3, HeartPulse, Star } from "lucide-react";
import JsonLd from "@/components/seo/jsonLd";
import ScanServicePage from "@/components/sections/scanServicePage";
import { ecgFaq } from "@/lib/faq";

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
    canonical: "https://diagnoslab.in/ecg/",
  },
  openGraph: {
    title: "Diagnos Lab | Book ECG in Jamshedpur",
    description:
      "Book ECG at Diagnos Lab in Jamshedpur. Quick heart rhythm and electrical activity testing with reports in 1–2 hours.",
    url: "https://diagnoslab.in/ecg/",
    images: ["/images/diagnoslogo.avif"],
  },
};

const ecgSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalProcedure",
  name: "ECG Test in Jamshedpur",
  url: "https://diagnoslab.in/ecg/",
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
    { "@type": "ListItem", position: 2, name: "Radiology", item: "https://diagnoslab.in/radiology/" },
    { "@type": "ListItem", position: 3, name: "ECG Test in Jamshedpur", item: "https://diagnoslab.in/ecg/" },
  ],
};

export default function Page() {
  return (
    <>
      <JsonLd data={ecgSchema} />
      <JsonLd data={ecgBreadcrumb} />
      <ScanServicePage
        hero={{
          crumb: "ECG",
          eyebrow: "ECG in Jamshedpur · Walk-ins welcome",
          title: "ECG Test in Jamshedpur — reports in 1–2 hours",
          subtitle: "12-lead ECG (electrocardiogram) for heart rhythm and electrical activity analysis at our Sakchi centre.",
          chips: ["Chest pain", "Irregular heartbeat", "Pre-surgery", "Routine cardiac screening"],
          proofPoints: [
            { icon: Clock3, value: "1–2 hrs", label: "Report turnaround", mobileLabel: "Reports" },
            { icon: HeartPulse, value: "Painless", label: "Quick & painless test", mobileLabel: "Quick test" },
            { icon: Star, value: "4.9", label: "3,000+ Google reviews", mobileLabel: "Google rating" },
          ],
        }}
        scan={{
          id: "ecg",
          title: "ECG",
          image: "/images/radiology/ECG.avif",
          icon: "heart-pulse",
          reportingTime: "1–2 hours",
          description: "Quick test to check heart rhythm and electrical activity. Performed by experienced doctors with clear reporting.",
          usedFor: ["Chest pain", "Irregular heartbeat", "Pre-surgery fitness", "Routine cardiac screening"],
        }}
        section={{
          id: "ecg-section",
          title: "ECG services",
          subtitle: "Quick heart rhythm and electrical activity testing. Click Book to schedule your appointment.",
        }}
        why={{
          title: "Why choose ECG at Diagnos Lab",
          points: [
            { icon: "activity", title: "Modern ECG equipment" },
            { icon: "users", title: "Experienced cardiac team" },
            { icon: "heart-pulse", title: "Quick & painless test", highlight: true },
            { icon: "clock-3", title: "Reports same day" },
          ],
        }}
        faq={{ title: "ECG FAQs", items: ecgFaq }}
        related={[
          { label: "Ultrasound", href: "/ultrasound-in-jamshedpur/" },
          { label: "X-Ray", href: "/xray/" },
          { label: "2D ECHO", href: "/radiology/" },
          { label: "All radiology services", href: "/radiology/" },
        ]}
      />
    </>
  );
}

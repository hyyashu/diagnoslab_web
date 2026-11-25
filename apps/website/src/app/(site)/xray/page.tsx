import type { Metadata } from "next";
import { Clock3, ShieldCheck, Star } from "lucide-react";
import JsonLd from "@/components/seo/jsonLd";
import ScanServicePage from "@/components/sections/scanServicePage";
import { xrayFaq } from "@/lib/faq";
import { ORG_REF, breadcrumbSchema, pageUrl, ogDefaults } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Book X-Ray in Jamshedpur",
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
    canonical: pageUrl("/xray/"),
  },
  openGraph: {
    ...ogDefaults,
    title: "Book X-Ray in Jamshedpur",
    description:
      "Book digital X-Ray at Diagnos Lab in Jamshedpur. Fast, low-radiation imaging for bones, chest, spine, and joints with reports in 1–2 hours.",
    url: pageUrl("/xray/"),
  },
};

const xraySchema = {
  "@context": "https://schema.org",
  "@type": "MedicalProcedure",
  name: "X-Ray in Jamshedpur",
  url: pageUrl("/xray/"),
  description:
    "Digital X-Ray for bones, chest, spine, and joints at Diagnos Lab, Sakchi Jamshedpur. Low-radiation imaging with same-day reports.",
  procedureType: "Diagnostic",
  followup: "Reports available within 1–2 hours",
  howPerformed: "Digital radiography using low-dose X-ray radiation to produce high-resolution images",
  performer: ORG_REF,
};

const xrayBreadcrumb = breadcrumbSchema([
  ["Home", ""],
  ["Radiology", "/radiology/"],
  ["X-Ray in Jamshedpur", "/xray/"],
]);

export default function Page() {
  return (
    <>
      <JsonLd data={xraySchema} />
      <JsonLd data={xrayBreadcrumb} />
      <ScanServicePage
        hero={{
          crumb: "X-Ray",
          eyebrow: "X-Ray in Jamshedpur · Walk-ins welcome",
          title: "Digital X-Ray in Jamshedpur, reports in 1–2 hours",
          subtitle: "Fast, low-radiation imaging for bones, chest, spine and joints at our Sakchi centre.",
          chips: ["Fractures", "Chest", "Spine", "Joints"],
          proofPoints: [
            { icon: Clock3, value: "1–2 hrs", label: "Report turnaround", mobileLabel: "Reports" },
            { icon: ShieldCheck, value: "Low-dose", label: "Low-radiation imaging", mobileLabel: "Radiation" },
            { icon: Star, value: "4.9", label: "2,700+ Google reviews", mobileLabel: "Google rating" },
          ],
        }}
        scan={{
          id: "xray",
          title: "X-Ray",
          image: "/images/radiology/XRAY.avif",
          icon: "bone",
          reportingTime: "1–2 hours",
          description: "Fast, low-radiation imaging for bones, chest, spine, joints and more. Performed by an experienced technician with clear reporting.",
          usedFor: ["Fractures", "Chest infections", "Back pain", "Joint problems"],
        }}
        section={{
          id: "xray-section",
          title: "X-Ray services",
          subtitle: "Fast digital imaging for bones, chest, spine, and joints. Click Book to schedule your appointment.",
        }}
        why={{
          title: "Why choose X-Ray at Diagnos Lab",
          points: [
            { icon: "monitor", title: "Modern X-Ray equipment" },
            { icon: "users", title: "Experienced radiology team" },
            { icon: "shield-check", title: "Low-radiation imaging", highlight: true },
            { icon: "clock-3", title: "Reports same day" },
          ],
        }}
        faq={{ title: "X-Ray FAQs", items: xrayFaq }}
        related={[
          { label: "Ultrasound", href: "/ultrasound-in-jamshedpur/" },
          { label: "ECG", href: "/ecg/" },
          { label: "2D ECHO", href: "/radiology/" },
          { label: "All radiology services", href: "/radiology/" },
        ]}
      />
    </>
  );
}

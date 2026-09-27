import type { Metadata } from "next";
import ServicePageHero from "@/components/sections/servicePageHero";
import WhyPoints from "@/components/sections/whyPoints";
import FindUsPanel from "@/components/sections/findUsPanel";
import PatientReviews from "@/components/sections/patientReviews";
import FAQAccordion from "@/components/sections/faq";
import FaqJsonLd from "@/components/seo/faqJsonLd";
import JsonLd from "@/components/seo/jsonLd";
import ScansOffered from "./components/scansOffered";
import PrepareSection from "./components/prepareSection";
import { relatedServices, whyPoints } from "./content";
import { ultrasoundFaq } from "@/lib/faq";

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
    canonical: "https://diagnoslab.in/ultrasound-in-jamshedpur/",
  },
  openGraph: {
    title: "Diagnos Lab | Book Ultrasound (USG) in Jamshedpur",
    description:
      "Book ultrasound (USG) at Diagnos Lab in Jamshedpur. Safe, radiation-free imaging for abdomen, pelvis, pregnancy, thyroid, and more. Reports in 1–2 hours.",
    url: "https://diagnoslab.in/ultrasound-in-jamshedpur/",
    images: ["/images/diagnoslogo.avif"],
  },
};

const ultrasoundSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalProcedure",
  name: "Ultrasound (USG) in Jamshedpur",
  url: "https://diagnoslab.in/ultrasound-in-jamshedpur/",
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
    { "@type": "ListItem", position: 2, name: "Radiology", item: "https://diagnoslab.in/radiology/" },
    { "@type": "ListItem", position: 3, name: "Ultrasound in Jamshedpur", item: "https://diagnoslab.in/ultrasound-in-jamshedpur/" },
  ],
};

export default function Page() {
  return (
    <>
      <JsonLd data={ultrasoundSchema} />
      <JsonLd data={ultrasoundBreadcrumb} />
      <ServicePageHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Radiology", href: "/radiology/" },
          { label: "Ultrasound" },
        ]}
        eyebrow="Ultrasound in Jamshedpur · Walk-ins welcome"
        title="Ultrasound (USG) in Jamshedpur — reports in 1–2 hours"
        subtitle="Abdomen, pelvis, pregnancy, thyroid, kidney and breast scans on modern digital machines — with a female radiologist available for female patients."
        chips={["Abdomen", "Pelvis", "Pregnancy", "Thyroid", "KUB", "Breast"]}
        cta={{ label: "Book ultrasound", href: "#ultrasound-section" }}
        form={{
          subtitle: "Share your details and our team will call you to book your ultrasound slot.",
          service: "Ultrasound",
        }}
      />
      <ScansOffered />
      <WhyPoints
        title="Why patients choose Diagnos Lab for ultrasound"
        subtitle="Trusted ultrasound imaging in Jamshedpur with clear reports, experienced radiologists and same-day turnaround."
        points={whyPoints}
      />
      <PrepareSection />
      <FindUsPanel tone="muted" />
      <PatientReviews tone="white" />
      <FaqJsonLd items={ultrasoundFaq} />
      <FAQAccordion
        title="Ultrasound FAQs"
        items={ultrasoundFaq}
        intro="Still unsure? Message us on WhatsApp and our team will help you pick the right scan."
        related={relatedServices}
        tone="muted"
      />
    </>
  );
}

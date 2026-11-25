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
import PregnancyScans from "./components/pregnancyScans";
import { featuredScan, pregnancyScans, relatedServices, scanTypes, whyPoints } from "./content";
import { ultrasoundFaq } from "@/lib/faq";
import { ULTRASOUND_HOURS_DISPLAY } from "@/lib/contact";
import { ORG_REF, breadcrumbSchema, pageUrl, ogDefaults } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Ultrasound (USG) in Sakchi, Jamshedpur",
  description:
    "Ultrasound by MD radiologists, including a female radiologist, at Diagnos Lab, Sakchi, Jamshedpur. NT, growth, Doppler, abdomen and pelvis scans, Mon–Sat.",
  keywords: [
    "Ultrasound in Jamshedpur",
    "USG in Jamshedpur",
    "Ultrasound in Sakchi",
    "NT Scan Jamshedpur",
    "Growth Scan Jamshedpur",
    "Doppler Scan Jamshedpur",
    "Pregnancy Ultrasound Jamshedpur",
    "Abdominal Ultrasound Jamshedpur",
    "Female Radiologist Ultrasound Jamshedpur",
    "Diagnostic Center in Jamshedpur",
    "Diagnos Lab in Jamshedpur",
  ],
  alternates: {
    canonical: pageUrl("/ultrasound-in-jamshedpur/"),
  },
  openGraph: {
    ...ogDefaults,
    title: "Book Ultrasound (USG) in Jamshedpur",
    description:
      "Book ultrasound (USG) at Diagnos Lab in Jamshedpur. Safe, radiation-free imaging for abdomen, pelvis, pregnancy, thyroid, and more. Reports in 1–2 hours.",
    url: pageUrl("/ultrasound-in-jamshedpur/"),
  },
};

const PAGE_URL = pageUrl("/ultrasound-in-jamshedpur/");

/* Every scan on the page as an ImagingTest, offered by the one lab entity
   (same @id as the site layout's business block). */
const scans = [featuredScan, ...scanTypes, ...pregnancyScans].map((s) => ({
  "@type": "ImagingTest",
  "@id": `${PAGE_URL}#${s.id}`,
  name: s.title,
  description: s.description,
  imagingTechnique: "https://schema.org/Ultrasound",
}));

const ultrasoundSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalWebPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: "Ultrasound (USG) in Jamshedpur",
      inLanguage: "en-IN",
      description:
        "Ultrasound by MD Radiology radiologists, including a female radiologist, at Diagnos Lab, Sakchi, Jamshedpur. Pregnancy (NT, growth, Doppler), abdomen, pelvis, KUB, thyroid and breast scans, Monday to Saturday.",
      about: { "@id": `${PAGE_URL}#ultrasound` },
      publisher: ORG_REF,
    },
    {
      "@type": "ImagingTest",
      "@id": `${PAGE_URL}#ultrasound`,
      name: "Ultrasound (USG)",
      alternateName: ["Sonography", "USG"],
      imagingTechnique: "https://schema.org/Ultrasound",
      description: "Painless, radiation-free imaging using high-frequency sound waves. Reports in 1–2 hours.",
    },
    ...scans,
    {
      ...ORG_REF,
      availableTest: [{ "@id": `${PAGE_URL}#ultrasound` }, ...scans.map((t) => ({ "@id": t["@id"] }))],
    },
  ],
};

const ultrasoundBreadcrumb = breadcrumbSchema([
  ["Home", ""],
  ["Radiology", "/radiology/"],
  ["Ultrasound in Jamshedpur", "/ultrasound-in-jamshedpur/"],
]);

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
        eyebrow={`Ultrasound in Jamshedpur · ${ULTRASOUND_HOURS_DISPLAY}`}
        title="Ultrasound (USG) in Sakchi, Jamshedpur"
        subtitle="Abdomen, pelvis, pregnancy, thyroid, kidney and breast scans on modern digital machines, with a female radiologist available for female patients."
        chips={["Abdomen", "Pelvis", "Pregnancy", "Thyroid", "KUB", "Breast"]}
        cta={{ label: "Book ultrasound", href: "#ultrasound-section" }}
        form={{
          subtitle: "Share your details and our team will call you to book your ultrasound slot.",
          service: "Ultrasound",
        }}
      />
      <ScansOffered />
      <PregnancyScans />
      <WhyPoints
        title="Why patients choose Diagnos Lab for ultrasound"
        subtitle="Trusted ultrasound imaging in Jamshedpur with clear reports, experienced radiologists and same-day turnaround."
        points={whyPoints}
      />
      <PrepareSection />
      <FindUsPanel tone="muted" hours={{ title: "Ultrasound hours", text: ULTRASOUND_HOURS_DISPLAY }} />
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

import type { Metadata } from "next";
import { Clock3, House, Star } from "lucide-react";
import ServicePageHero from "@/components/sections/servicePageHero";
import ServiceGroupSection from "./components/serviceGroupSection";
import WhyPoints from "@/components/sections/whyPoints";
import FindUsPanel from "@/components/sections/findUsPanel";
import PatientReviews from "@/components/sections/patientReviews";
import FAQAccordion from "@/components/sections/faq";
import FaqJsonLd from "@/components/seo/faqJsonLd";
import JsonLd from "@/components/seo/jsonLd";
import { serviceGroups, serviceOptions, servicesFaq, servicesWhyPoints } from "./content";
import { breadcrumbSchema, pageUrl, ogDefaults } from "@/lib/schema";
import { PHONE_DISPLAY } from "@/lib/contact";

const description =
  `All services at Diagnos Lab, Sakchi: blood tests, health packages, home collection, ultrasound, pregnancy scans, X-ray, ECG, 2D ECHO and PFT.`;

export const metadata: Metadata = {
  title: "Our Services | Lab Tests, Ultrasound, X-Ray, ECG in Jamshedpur",
  description,
  keywords: [
    "Diagnostic Services in Jamshedpur",
    "Diagnostic Center in Jamshedpur",
    "Blood Test in Jamshedpur",
    "Ultrasound in Jamshedpur",
    "X-Ray in Jamshedpur",
    "Home Sample Collection Jamshedpur",
  ],
  alternates: {
    canonical: pageUrl("/services/"),
  },
  openGraph: {
    ...ogDefaults,
    title: "Our Services in Jamshedpur",
    description,
    url: pageUrl("/services/"),
  },
};

const servicesBreadcrumb = breadcrumbSchema([
  ["Home", ""],
  ["Services", "/services/"],
]);

export default function Page() {
  return (
    <>
      <JsonLd data={servicesBreadcrumb} />
      <ServicePageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Services" }]}
        eyebrow="Diagnostic centre in Sakchi, Jamshedpur"
        title="Lab tests, ultrasound, X-Ray, ECG & more, all under one roof"
        subtitle="Blood tests at our centre or at home, scans by MD radiologists, and same-day reports on WhatsApp."
        chips={serviceGroups.map((g) => g.title)}
        cta={{ label: "See all services", href: `#${serviceGroups[0].id}` }}
        form={{ services: serviceOptions, servicePlaceholder: "Select a service" }}
        proofPoints={[
          { icon: Clock3, value: "Same day", label: "Most reports", mobileLabel: "Reports" },
          { icon: House, value: "Home", label: "Sample collection", mobileLabel: "Collection" },
          { icon: Star, value: "4.9", label: "3,000+ Google reviews", mobileLabel: "Google rating" },
        ]}
      />
      {serviceGroups.map((group, i) => (
        <ServiceGroupSection key={group.id} group={group} tone={i % 2 === 0 ? "white" : "muted"} />
      ))}
      <WhyPoints
        title="Why patients in Jamshedpur choose Diagnos Lab"
        mobileTitle="Why patients choose us"
        subtitle="Accurate tests and scans with fast turnaround, at our centre or from the comfort of your home."
        mobileSubtitle="Trusted by thousands of patients across Jamshedpur."
        points={servicesWhyPoints}
      />
      <FindUsPanel />
      <PatientReviews tone="white" />
      <FaqJsonLd items={servicesFaq} />
      <FAQAccordion
        title="Services FAQs"
        items={servicesFaq}
        intro="Not sure which test or scan you need? Message us on WhatsApp and our team will help."
        tone="muted"
      />
    </>
  );
}

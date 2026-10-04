import type { Metadata } from "next";
import ServicePageHero from "@/components/sections/servicePageHero";
import RadiologySection from "./components/radiologySection";
import WhyPoints from "@/components/sections/whyPoints";
import FindUsPanel from "@/components/sections/findUsPanel";
import PatientReviews from "@/components/sections/patientReviews";
import FAQAccordion from "@/components/sections/faq";
import FaqJsonLd from "@/components/seo/faqJsonLd";
import { radiologyFaq } from "@/lib/faq";
import { scanServices, whyPoints } from "./content";
import { pageUrl } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: "Radiology in Jamshedpur | Ultrasound, X-Ray, ECG, Echo | Diagnos Lab" },
  description:
    "Ultrasound by female radiologist, digital X-Ray, ECG, Echocardiography & PFT at Diagnos Lab, Sakchi. Same-day reports. Open 7:30 AM–7:30 PM (ultrasound Mon–Sat). Call 8404802214.",
  keywords: [
    "Radiology Services in Jamshedpur",
    "Ultrasound in Jamshedpur",
    "X-Ray in Jamshedpur",
    "ECG in Jamshedpur",
    "Diagnostic Center in Jamshedpur",
  ],
  alternates: {
    canonical: pageUrl("/radiology/"),
  },
  openGraph: {
    title: "Diagnos Lab | Radiology Services in Jamshedpur",
    description:
      "Book radiology services at Diagnos Lab in Jamshedpur: Ultrasound, X-Ray, ECG, and PFT with fast reporting and experienced specialists.",
    url: pageUrl("/radiology/"),
    images: ["/images/diagnoslogo.avif"],
  },
};

export default function Page() {
  return (
    <>
      <ServicePageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Radiology" }]}
        eyebrow="Radiology in Jamshedpur · Walk-ins welcome"
        title="Ultrasound, X-Ray, ECG, ECHO & PFT, with reports in 1–2 hours"
        subtitle="Modern digital equipment, experienced radiologists and a dedicated female radiologist, all under one roof in Sakchi."
        cta={{ label: "Book a scan", href: "#radiology-section" }}
        form={{ services: scanServices.map((s) => s.title) }}
      />
      <RadiologySection />
      <WhyPoints
        title="Why patients in Jamshedpur choose us for imaging"
        mobileTitle="Why patients choose us for imaging"
        subtitle="Trusted by thousands of patients for accurate radiology services, with reports your doctor can act on the same day."
        mobileSubtitle="Trusted by thousands of patients across Jamshedpur."
        points={whyPoints}
      />
      <FindUsPanel />
      <PatientReviews tone="white" />
      <FaqJsonLd items={radiologyFaq} />
      <FAQAccordion
        title="Radiology FAQs"
        items={radiologyFaq}
        intro="Still unsure? Message us on WhatsApp and our team will help you pick the right scan."
        tone="muted"
      />
    </>
  );
}

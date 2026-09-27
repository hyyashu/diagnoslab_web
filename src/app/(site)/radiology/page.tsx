import type { Metadata } from "next";
import RadiologyHero from "./components/radiologyHero";
import RadiologySection from "./components/radiologySection";
import WhyChoose from "./components/whyChoose";
import FindUsPanel from "@/components/sections/findUsPanel";
import PatientReviews from "@/components/sections/patientReviews";
import FAQAccordion from "@/components/sections/faq";
import FaqJsonLd from "@/components/seo/faqJsonLd";
import { radiologyFaq } from "@/lib/faq";
import { scanServices } from "./content";

export const metadata: Metadata = {
  title: { absolute: "Radiology in Jamshedpur | Ultrasound, X-Ray, ECG, Echo | Diagnos Lab" },
  description:
    "Ultrasound by female radiologist, digital X-Ray, ECG, Echocardiography & PFT at Diagnos Lab, Sakchi. Same-day reports. Open 7 days, 7:30 AM–8 PM. Book now: 8404802201.",
  keywords: [
    "Radiology Services in Jamshedpur",
    "Ultrasound in Jamshedpur",
    "X-Ray in Jamshedpur",
    "ECG in Jamshedpur",
    "Diagnostic Center in Jamshedpur",
  ],
  alternates: {
    canonical: "https://diagnoslab.in/radiology/",
  },
  openGraph: {
    title: "Diagnos Lab | Radiology Services in Jamshedpur",
    description:
      "Book radiology services at Diagnos Lab in Jamshedpur — Ultrasound, X-Ray, ECG, and PFT with fast reporting and experienced specialists.",
    url: "https://diagnoslab.in/radiology/",
    images: ["/images/diagnoslogo.avif"],
  },
};

export default function Page() {
  return (
    <>
      <RadiologyHero services={scanServices.map((s) => s.title)} />
      <RadiologySection />
      <WhyChoose />
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

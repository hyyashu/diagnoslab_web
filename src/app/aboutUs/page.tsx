import type { Metadata } from "next";
import AboutCard from "./components/aboutCard";

export const metadata: Metadata = {
  title: "About Diagnos Lab | Diagnostic Centre in Jamshedpur Since 2009",
  description:
    "Learn about Diagnos Lab — Jamshedpur's trusted diagnostic centre for 15+ years. NABL-quality testing, 4.9-star Google rating, and a patient-first team in Sakchi.",
  keywords: [
    "About Diagnos Lab",
    "Best Diagnostic Center Jamshedpur",
    "Trusted Pathology Lab Jamshedpur",
    "NABL Lab Jamshedpur",
    "Diagnos Lab History",
  ],
  alternates: {
    canonical: "https://diagnoslab.in/aboutUs",
  },
  openGraph: {
    title: "About Diagnos Lab | Trusted Diagnostic Centre in Jamshedpur",
    description:
      "15+ years of diagnostic excellence in Jamshedpur. 4.9-star rating, in-house pathologist, same-day reports.",
    url: "https://diagnoslab.in/aboutUs",
  },
};

export default function AboutPage() {
  return (
    <div className="bg-background-primary relative overflow-hidden py-14  px-4 md:px-12">
      <div className="max-w-5xl mx-auto space-y-10 relative z-10">

        {/* Who We Are */}
        <AboutCard
          title="Who We Are"
          description={`Diagnos Lab is a trusted diagnostic centre in Jamshedpur, built on accuracy, transparency, and patient care. For over 15 years, we have supported doctors, families, and organisations with reliable diagnostic services that help in early detection and better treatment decisions.
                        From routine blood tests to advanced radiology and cardiac diagnostics, we bring all essential diagnostic services under one roof.`}
          image="/images/about/about1.avif"
        />

        {/* Our Journey */}
        <AboutCard
          title="Our Journey"
          reverse
          description={`What started as a small collection centre has grown into a full-service laboratory trusted by millions of patients. Over the years, Diagnos Lab has evolved with modern technology, strict quality standards, and a patient-first approach that remains unchanged.
                        Today, we are proud to serve Jamshedpur with a strong reputation built on consistent reporting, ethical practices, and long-term trust.`}
          image="/images/about/about3.avif"
        />

        {/* Why Trust */}
        <AboutCard
          title="Why Patients Trust Diagnos Lab"
          description={[
            "15+ years of diagnostic excellence",
            "4.9-star Google rating with 2500+ reviews",
            "In-house pathologist for quality control",
            "Experienced medical and technical team",
            "Fast turnaround time for most tests",
            "Clear digital reports on WhatsApp",
          ]}
          image="/images/about/about3.avif"
        />

        {/* Our Presence */}
        <div className="bg-white rounded-2xl p-6 text-center shadow-md">
          <h2 className="font-heading text-black text-2xl md:text-4xl font-extrabold ">Our Presence</h2>
          <p className="font-body text-gray-700 text-sm md:text-base">
            We receive samples from all over Jharkhand.
          </p>
        </div>
      </div>
    </div>
  );
}
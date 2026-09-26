import type { Metadata } from "next";
import Link from "next/link";
import HeroSection from "./components/hero";
import OurPartners from "./components/ourPatners";
import WhyPartner from "./components/whyPartner";

export const metadata: Metadata = {
  title: { absolute: "Corporate Health Testing in Jamshedpur | Diagnos Lab" },
  description:
    "Partner with Diagnos Lab for corporate wellness and employee health check programmes in Jamshedpur. Flexible on-site and in-lab testing for companies in Jharkhand.",
  keywords: [
    "Corporate Health Checkup Jamshedpur",
    "Employee Health Testing Jamshedpur",
    "Corporate Wellness Jamshedpur",
    "Bulk Health Testing Jharkhand",
    "Corporate Lab Partner Jamshedpur",
  ],
  alternates: {
    canonical: "https://diagnoslab.in/corporate/",
  },
  openGraph: {
    title: "Corporate Health Testing in Jamshedpur | Diagnos Lab",
    description:
      "Employee health check and corporate wellness programmes at Diagnos Lab, Jamshedpur.",
    url: "https://diagnoslab.in/corporate/",
  },
};

export default function Page() {
  return (
    <>
      <HeroSection />
      <OurPartners />
      <WhyPartner />

      {/* Get Started */}
      <section className="bg-white py-12 px-4 text-center">
        <h2 className="font-heading text-black text-xl md:text-2xl font-extrabold mb-5">
          Get Started With Corporate Testing
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/packages"
            className="inline-flex items-center bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-sm font-heading font-semibold text-slate-700 hover:border-[#E73834] hover:text-[#E73834] transition-colors"
          >
            Health Packages
          </Link>
          <Link
            href="/tests"
            className="inline-flex items-center bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-sm font-heading font-semibold text-slate-700 hover:border-[#E73834] hover:text-[#E73834] transition-colors"
          >
            Browse Tests
          </Link>
          <Link
            href="/contact-us"
            className="inline-flex items-center bg-[#E73834] text-white rounded-full px-4 py-2 text-sm font-heading font-semibold hover:bg-red-700 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
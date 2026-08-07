import type { Metadata } from "next";
import SearchTests from "./components/searchTest";
import PopularTests from "./components/popularTest";
import HeroSection from "../components/hero";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: { absolute: "Book Blood Tests in Jamshedpur | All Lab Tests | Diagnos Lab" },
  description:
    "Browse and book 500+ blood tests and pathology tests at Diagnos Lab in Jamshedpur. Home sample collection, affordable pricing, and same-day digital reports.",
  keywords: [
    "Blood Test in Jamshedpur",
    "Book Lab Test Jamshedpur",
    "Pathology Test Jamshedpur",
    "Complete Blood Count Jamshedpur",
    "Thyroid Test Jamshedpur",
    "Diabetes Test Jamshedpur",
    "Liver Function Test Jamshedpur",
    "Home Sample Collection Jamshedpur",
  ],
  alternates: {
    canonical: "https://diagnoslab.in/tests",
  },
  openGraph: {
    title: "Book Blood Tests in Jamshedpur | Diagnos Lab",
    description:
      "Browse 500+ lab tests. Book with home sample collection at Diagnos Lab, Sakchi, Jamshedpur.",
    url: "https://diagnoslab.in/tests",
  },
};

export default function Page() {
  return <>
    <HeroSection />
    <Suspense fallback={<div>Loading tests…</div>}>
      <PopularTests />
      <SearchTests />
      </Suspense>
  </>;
}
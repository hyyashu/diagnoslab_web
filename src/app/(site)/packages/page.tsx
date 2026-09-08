import type { Metadata } from "next";
import PackagesScreen from "./components/packagesScreen";
import HeroSection from "@/components/sections/hero";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: { absolute: "Health Packages in Jamshedpur | Full Body Checkup | Diagnos Lab" },
  description:
    "Book affordable health checkup packages at Diagnos Lab in Jamshedpur. Full body checkup, thyroid profile, diabetes panel, cardiac profile, and more with home collection.",
  keywords: [
    "Health Packages Jamshedpur",
    "Full Body Checkup Jamshedpur",
    "Health Checkup Jamshedpur",
    "Preventive Health Package Jamshedpur",
    "Thyroid Profile Jamshedpur",
    "Diabetes Package Jamshedpur",
    "Affordable Health Test Jamshedpur",
  ],
  alternates: {
    canonical: "https://diagnoslab.in/packages",
  },
  openGraph: {
    title: "Health Packages in Jamshedpur | Diagnos Lab",
    description:
      "Affordable full body checkup and health packages with home collection at Diagnos Lab, Jamshedpur.",
    url: "https://diagnoslab.in/packages",
  },
};

export default function Page() {
  return <>
    <HeroSection
        title={
          <>
            Health Packages <br />
            in Jamshedpur
          </>
        }
      />
    <Suspense fallback={<div>Loading packages…</div>}>
      <PackagesScreen />
    </Suspense>
  </>;
}
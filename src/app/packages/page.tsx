import PackagesScreen from "./components/packagesScreen";
import HeroSection from "../components/hero";
import { Suspense } from "react";

export default function Page() {
  return <>
    <HeroSection />
    <Suspense fallback={<div>Loading packages…</div>}>
      <PackagesScreen />
    </Suspense>
  </>;
}
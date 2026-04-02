import SearchTests from "./components/searchTest";
import PopularTests from "./components/popularTest";
import HeroSection from "../components/hero";
import { Suspense } from "react";

export default function Page() {
  return <>
    <HeroSection />
    <Suspense fallback={<div>Loading tests…</div>}>
      <PopularTests />
      <SearchTests />
      </Suspense>
  </>;
}
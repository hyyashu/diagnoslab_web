
import WhyDiagnosLab from "./components/whyDiagnos/whyDiagnos";
import PopularTests from "./components/popularTests";
import Packages from "./components/packages";
import HeroSection from "./components/hero";
import RadiologyServices from "./components/radiology/services";

export default function Home() {
  return (
    <>
      <HeroSection />
      <WhyDiagnosLab />
      <PopularTests />
      <Packages />
      <RadiologyServices />
    </>
  );
}

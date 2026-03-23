
import WhyDiagnosLab from "./components/whyDiagnos/whyDiagnos";
import PopularTests from "./components/tests/popular";
import Packages from "./components/packages/packages";
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

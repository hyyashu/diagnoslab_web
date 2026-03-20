
import WhyDiagnosLab from "./components/whyDiagnos/whyDiagnos";
import PopularTests from "./components/tests/popular";
import RadiologySlider from "./components/radiology/services";
import Packages from "./components/packages/packages";
import HeroSection from "./components/hero";

export default function Home() {
  return (
    <>
      <HeroSection />
      <WhyDiagnosLab />
      <PopularTests />
      <Packages />
      <RadiologySlider />
    </>
  );
}

import Image from "next/image";
import Navbar from "./components/navbar";
import HeroSection from "./components/hero";
import WhyDiagnosLab from "./components/whyDiagnos";
import PopularTests from "./components/popular";
import RadiologySlider from "./components/services";
import Packages from "./components/packages";
import ReviewCarousel from "./components/reviews";
import HowItWorks from "./components/howItWorks";
import FAQAccordion from "./components/faq";
import Footer from "./components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <WhyDiagnosLab />
      <PopularTests />
      <Packages />
      <RadiologySlider />
      <ReviewCarousel />
      <HowItWorks />
      <FAQAccordion />
      <Footer />
    </>
  );
}

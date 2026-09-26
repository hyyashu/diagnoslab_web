"use client";

import React, { useEffect, useState } from "react";
import { preload } from "react-dom";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import EnquiryForm from "@/components/forms/enquiryForm";

/* Reused on /, /radiology, /tests and /packages. Each of those needs its own
   h1: a shared heading made four pages claim the same topic. */
type HeroSectionProps = {
  title?: React.ReactNode;
};

/* The first slide is the LCP element. Preloading it from <head> lets the
   browser start it before the async Next scripts that precede the body; the
   media queries mirror the <picture> sources so each device fetches one. */
const MOBILE_HERO = "(max-width: 767px)";

const HeroSection: React.FC<HeroSectionProps> = ({ title }) => {
  preload("/images/hero/hero1-mobile.avif", { as: "image", type: "image/avif", fetchPriority: "high", media: MOBILE_HERO });
  preload("/images/hero/hero1.avif", { as: "image", type: "image/avif", fetchPriority: "high", media: "(min-width: 768px)" });
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Fade(),
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setActiveIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  /* Slides 2 and 3 are hidden behind slide 1 until autoplay reaches them,
     so their images wait until the page has loaded instead of competing
     with the first (LCP) image. */
  const [loadRest, setLoadRest] = useState(false);
  useEffect(() => {
    const go = () => setLoadRest(true);
    if (document.readyState === "complete") go();
    else window.addEventListener("load", go, { once: true });
    return () => window.removeEventListener("load", go);
  }, []);

  const goTo = (i: number) => {
    setLoadRest(true);
    emblaApi?.scrollTo(i);
    emblaApi?.plugins().autoplay?.reset();
  };

  /* Each slide has a 1920px landscape file and a 900px portrait crop for
     phones, where object-cover only ever shows the centre strip. */
  const carouselSlides = [
    { src: "/images/hero/hero1.avif", mobile: "/images/hero/hero1-mobile.avif", alt: "Blood test home collection service in Jamshedpur – Diagnos Lab" },
    { src: "/images/hero/hero2.avif", mobile: "/images/hero/hero2-mobile.avif", alt: "Ultrasound and radiology services at Diagnos Lab, Sakchi Jamshedpur" },
    { src: "/images/hero/hero3.avif", mobile: "/images/hero/hero3-mobile.avif", alt: "Diagnostic centre in Jamshedpur – affordable tests with fast reports" },
  ];

  const renderDots = () =>
    carouselSlides.map((_, i) => (
      <button
        key={i}
        onClick={() => goTo(i)}
        className={`relative before:absolute before:-inset-x-1.5 before:-inset-y-4 before:content-[''] transition-all duration-500 ease-in-out rounded-full bg-white shadow-lg h-2 ${activeIndex === i
            ? "w-16 opacity-100"
            : "w-2 opacity-40 hover:opacity-70"
          }`}
        aria-label={`Go to slide ${i + 1}`}
      />
    ));

  return (
    <section className="relative w-full h-[600px] md:h-[700px] flex flex-col items-center justify-center overflow-visible mb-[180px] md:mb-[120px] z-10 ">

      {/* --- BACKGROUND CAROUSEL --- */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="h-full w-full overflow-hidden" ref={emblaRef}>
          <div className="flex h-full touch-pan-y">
          {carouselSlides.map((slide, index) => (
            <div key={index} className="relative h-full min-w-0 flex-[0_0_100%]">
              <div className="relative h-full w-full">
                {(index === 0 || loadRest) && (
                  <picture>
                    <source media={MOBILE_HERO} srcSet={slide.mobile} type="image/avif" />
                    <img
                      src={slide.src}
                      alt={slide.alt}
                      className="absolute inset-0 h-full w-full object-cover"
                      decoding="async"
                      fetchPriority={index === 0 ? "high" : "low"}
                    />
                  </picture>
                )}
                <div className="absolute inset-0 bg-slate-900/60" />
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>

      {/* --- TEXT CONTENT --- */}
      {/* Bottom padding lifts the centred group clear of the floating form below. */}
      <div className="relative z-10 w-full flex flex-col items-start pb-24 md:pb-12">
        <div className="w-full max-w-7xl mx-auto px-4 mb-8 md:mb-10">
          <h1 className="font-heading text-3xl md:text-4xl lg:text-6xl font-black text-white uppercase ">
            {title ?? (
              <>
                All Test <br />
                Under <br />
                One Roof
              </>
            )}
          </h1>
        </div>

        {/* --- SERVICES BAR + PAGINATION --- */}
        <div className="relative w-full overflow-x-hidden">
          {/* The mask sits on the band itself so the content above it stays opaque. */}
          <div
            className="absolute inset-0"
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, black 0%, black 40%, transparent 95%)",
              maskImage:
                "linear-gradient(to right, black 0%, black 40%, transparent 95%)",
            }}
          >
            <div className="h-full w-full bg-white/70 backdrop-blur-md" />
          </div>

          <div className="relative w-full max-w-7xl mx-auto px-4 py-3 md:py-4 flex items-center justify-between gap-6">
            <p className="speakable-description font-body text-sm md:text-xl font-bold text-slate-900 whitespace-nowrap">
              Blood Tests | PFT | X-Ray | ECG | Ultrasound
            </p>
            {/* Pagination rides the faded end of the band, where it reads against the image. */}
            <div className="hidden sm:flex items-center space-x-3 shrink-0">
              {renderDots()}
            </div>
          </div>
        </div>

        {/* --- PAGINATION (mobile: no room alongside the services bar) --- */}
        <div className="w-full max-w-7xl mx-auto px-4 mt-6 sm:hidden">
          <div className="flex items-center space-x-3">{renderDots()}</div>
        </div>
      </div>

      {/* --- FLOATING ENQUIRY FORM --- */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20 w-full max-w-[90%] md:max-w-5xl">
        <EnquiryForm formType="enquiry_form" />
      </div>
    </section>
  );
};

export default HeroSection;
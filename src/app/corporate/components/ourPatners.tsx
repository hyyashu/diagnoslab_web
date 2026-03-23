"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import FeatureCard from "../../components/whyDiagnos/featureCard";

const partners = [
  { name: "Provident Fund", image: "/images/tie-ups/provident.png" },
  { name: "Union Bank of India", image: "/images/tie-ups/union.png" },
  { name: "National Metallurgical Laboratory", image: "/images/tie-ups/nml.png" },
  { name: "Linde India", image: "/images/tie-ups/linde.png" },
  { name: "Akin Care", image: "/images/tie-ups/akincare-logo.png" },
  { name: "Tata Zoological", image: "/images/tie-ups/tataZoo.png" },
  { name: "Arcofemi Health Care Ltd (Medi Wheel)", image: "/images/tie-ups/mediwheel-logo.png" },
  { name: "Care And Cure Primary Care Pvt. Ltd.", image: "/images/tie-ups/care.png" },
  { name: "Ekincare", image: "/images/tie-ups/ekincare_logo.png" },
  { name: "Health Wealth Management Pvt Ltd", image: "/images/tie-ups/healthwealth.png" },
  { name: "Healthindia Allied Services Pvt Ltd", image: "/images/tie-ups/HealthIndia.png" },
  { name: "Life Cell International Pvt Ltd", image: "/images/tie-ups/LifeCell.png" },
  { name: "Maggnessa Health Care", image: "/images/tie-ups/meggnessa.png" },
  { name: "Medipiper Technologies", image: "/images/tie-ups/MedPiper.png" },
  { name: "Tata Steel Zoo", image: "/images/tie-ups/TataSteel.png" },
  { name: "Tata 1mg corporate wellness", image: "/images/tie-ups/tata.png" },
];

export default function OurPartners() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

 

 
  

  return (
    <section className="bg-background-primary py-20 md:py-16 px-4 lg:px-0 overflow-hidden ">
      <div className="max-w-7xl mx-auto text-center">
        
        {/* Heading */}
        <h2 className="font-heading text-white text-2xl md:text-4xl font-extrabold mb-10">
          Our Partners
        </h2>

        {/* Carousel Wrapper */}
        <div className="relative">
          
          {/* Left Arrow */}
          <button
          onClick={scrollPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white text-background-primary rounded-full flex items-center justify-center shadow-lg z-20  transition"
        >
          <ChevronLeft size={18} />
        </button>
            

          {/* Right Arrow */}
          <button
          onClick={scrollNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white text-background-primary rounded-full flex items-center justify-center shadow-lg z-20  transition"
        >
          <ChevronRight size={18} />
        </button>

          {/* Viewport */}
          <div className="overflow-hidden p-0 md:p-2" ref={emblaRef}>
            {/* Container */}
            <div className="flex">
              
              {partners.map((partner, i) => (
                <div
                  key={i}
                  className="flex-[0_0_55%] sm:flex-[0_0_30%] md:flex-[0_0_33.33%] lg:flex-[0_0_20%] px-2 md:px-3"
                >
                  <FeatureCard
                    icon={
                      <div className="relative w-20 h-12 md:w-40 md:h-18">
                        <Image
                          src={partner.image}
                          alt={partner.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    }
                    title={partner.name}
                  />
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
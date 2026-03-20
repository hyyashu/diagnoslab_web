"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import FeatureCard from "../../components/whyDiagnos/featureCard";

const partners = [
  { name: "Provident Fund", image: "/images/provident.png" },
  { name: "Union Bank of India", image: "/images/union.png" },
  { name: "National Metallurgical Laboratory", image: "/images/nml.png" },
  { name: "Care And Cure Primary Care Pvt. Ltd.", image: "/images/care.png" },
  { name: "Tata 1mg corporate wellness", image: "/images/tata.png" },
  { name: "Tata 1mg corporate wellness", image: "/images/tata.png" },
  { name: "Tata 1mg corporate wellness", image: "/images/tata.png" },
  { name: "Tata 1mg corporate wellness", image: "/images/tata.png" },
  { name: "Tata 1mg corporate wellness", image: "/images/tata.png" },
];

export default function OurPartners() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  // Handle button enable/disable
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="bg-background-primary py-20 md:py-16 px-4 lg:px-0 overflow-hidden">
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
            disabled={!canScrollPrev}
            className={`absolute left-0 lg:-left-10 top-1/2 -translate-y-1/2 z-20 w-9 h-9 md:w-10 md:h-10 rounded-full bg-white text-background-primary shadow-md flex items-center justify-center transition-all
              ${!canScrollPrev ? "opacity-40 cursor-not-allowed" : "hover:scale-105"}
            `}
          >
            <ChevronLeft size={18} strokeWidth={2.5} />
          </button>

          {/* Right Arrow */}
          <button
            onClick={scrollNext}
            disabled={!canScrollNext}
            className={`absolute right-0 lg:-right-10 top-1/2 -translate-y-1/2 z-20 w-9 h-9 md:w-10 md:h-10 rounded-full bg-white text-background-primary shadow-md flex items-center justify-center transition-all
              ${!canScrollNext ? "opacity-40 cursor-not-allowed" : "hover:scale-105"}
            `}
          >
            <ChevronRight size={18} strokeWidth={2.5} />
          </button>

          {/* Viewport */}
          <div className="overflow-hidden" ref={emblaRef}>
            {/* Container */}
            <div className="flex">
              
              {partners.map((partner, i) => (
                <div
                  key={i}
                  className="flex-[0_0_75%] sm:flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_20%] px-2 md:px-3"
                >
                  <FeatureCard
                    icon={
                      <div className="relative w-12 h-12 md:w-16 md:h-16">
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
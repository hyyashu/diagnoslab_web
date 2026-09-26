"use client";

import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import RadiologyCard from "@/components/cards/radiologyCard";
import Link from "next/link";
import { radiologyServices } from "@/lib/catalog";


const serviceLinks: Record<string, string> = {
  ultrasound: "/ultrasound-in-jamshedpur",
  ecg: "/ecg",
  xray: "/xray",
};

const RadiologyServices = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const services = radiologyServices.map((service) => ({
    id: service.id,
    title: service.title,
    description: service.description,
    uses: service.bullets,
    footerNote: service.extra,
    href: serviceLinks[service.id],
  }));
  return (
    <section id="radiology-services" className="py-12 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="font-heading text-2xl md:text-4xl font-extrabold text-black mb-2">
            Radiology Services
          </h2>
          <p className="font-body text-gray-500 font-medium text-sm md:text-lg">
            Advanced imaging with fast reporting.
          </p>
        </div>

        {/* Slider */}
        <div className="relative px-4 md:px-12">

          <div className="overflow-hidden py-6" ref={emblaRef}>
            <div className="flex -ml-6">
            {services.map((service) => (
              <div
                key={service.id}
                className="min-w-0 shrink-0 grow-0 basis-full pl-6 py-4 md:basis-1/2 lg:basis-1/3"
              >
                <RadiologyCard
                  title={service.title}
                  description={service.description}
                  uses={service.uses}
                  footerNote={service.footerNote}
                  href={service.href}
                />
              </div>
            ))}
            </div>
          </div>

          {/* Navigation */}
          <button onClick={scrollPrev} aria-label="Previous service" className="font-heading absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-background-primary rounded-full flex items-center justify-center text-white shadow-lg hover:bg-red-700 transition">
            <ChevronLeft size={18} />
          </button>

          <button onClick={scrollNext} aria-label="Next service" className="font-heading absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-background-primary rounded-full flex items-center justify-center text-white shadow-lg hover:bg-red-700 transition">
            <ChevronRight size={18} />
          </button>

        </div>

        {/* Bottom CTA */}
        <div className="flex justify-center mt-4">
          <Link href="/radiology#radiology-section">
            <button className="font-heading px-10 py-3 text-white bg-background-primary hover:bg-red-800 font-bold rounded-xl transition">
              View All Radiology
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default RadiologyServices;
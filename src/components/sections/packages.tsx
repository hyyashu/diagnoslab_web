"use client";

import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PackageCard from "@/components/cards/packageCard";
import Link from "next/link";
import rawData from "@/data/packages.json";

const packageData = rawData.packages.map((p) => ({
  id: p.Id,
  title: p.PackageName,
  description: p.Description,
  price: p.DiscountedPrice,
  originalPrice: Number(p.Price) || 0,
  parameters: p.ParametersCovered || 0,
  categories: p.Categories || "General",

  fasting: p.Fasting?.trim() || "Not Required",
  reporting: p.Reporting?.trim() || "Same Day",
  slug: p.Slug || "",
}));

export default function PopularHealthPackages() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="relative w-full py-12 bg-white overflow-hidden">
      <div className="absolute inset-0 bg-background-primary" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-16 relative z-10">

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="font-heading text-white text-2xl md:text-4xl font-extrabold mb-2 tracking-tight">
            Popular Health Packages
          </h2>
          <p className="font-heading text-white font-medium text-sm md:text-base">
            Preventive health packages designed for every age group.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative w-full mx-auto">

          {/* Slide basis is 100% / slides-per-view; the gap is slide padding
              offset by the container's negative margin. */}
          <div className="overflow-hidden py-4" ref={emblaRef}>
            <div className="flex -ml-3 min-[480px]:-ml-[14px] sm:-ml-4 md:-ml-[18px] lg:-ml-5">
            {packageData.map((pkg, index) => (
              <div
                key={`${pkg.id}-${index}`}
                className="min-w-0 shrink-0 grow-0 basis-[86.9565%] pl-3 min-[480px]:basis-[76.9231%] min-[480px]:pl-[14px] sm:basis-[55.5556%] sm:pl-4 md:basis-[45.4545%] md:pl-[18px] lg:basis-1/3 lg:pl-5"
              >
                <div className="flex h-full min-h-0 flex-col">
                  <PackageCard {...pkg} fillSlide />
                </div>
              </div>
            ))}
            </div>
          </div>

          {/* Arrows */}
          <button onClick={scrollPrev} aria-label="Previous packages" className="absolute -left-6 md:-left-12 top-1/2 -translate-y-1/2 z-20 w-9 h-9 md:w-10 md:h-10 rounded-full bg-white text-background-primary shadow-md flex items-center justify-center hover:scale-105 transition-all">
            <ChevronLeft size={18} strokeWidth={2.5} />
          </button>

          <button onClick={scrollNext} aria-label="Next packages" className="absolute -right-6 md:-right-12 top-1/2 -translate-y-1/2 z-20 w-9 h-9 md:w-10 md:h-10 rounded-full bg-white text-background-primary shadow-md flex items-center justify-center hover:scale-105 transition-all">
            <ChevronRight size={18} strokeWidth={2.5} />
          </button>

        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link href="/packages#packages-section">
            <button className="font-heading px-8 py-3 bg-white text-background-primary font-bold text-sm rounded-xl transition-all shadow-lg">
              View All Packages
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
"use client";
import Link from "next/link";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TestCard from "./TestCard";
import rawData from "@/data/tests.json";

const tests = rawData.tests.map((test: any) => ({
  id: test.Id,
  title: test.TestName,
  description: test.Description,
  price: test.DiscountedPrice,
  originalPrice: test.Price,
}));

export default function PopularTests() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-2xl md:text-4xl font-black text-black mb-3 tracking-tight">
            Popular Tests
          </h2>
          <p className="font-body text-gray-500 font-medium text-sm md:text-lg">
            Most Commonly booked diagnostic tests.
          </p>
        </div>

        {/* Carousel Wrapper */}
        <div className="relative px-4 md:px-8 lg:px-20">

          {/* Left Arrow */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 md:p-3 rounded-full bg-background-primary text-white shadow-xl hover:bg-red-600 active:scale-95 transition-all flex"
          >
            <ChevronLeft size={18} className="md:w-7 md:h-7" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 md:p-3 rounded-full bg-background-primary text-white shadow-xl hover:bg-red-600 active:scale-95 transition-all flex"
          >
            <ChevronRight size={18} className="md:w-7 md:h-7" />
          </button>

          {/* Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6 m-6">
              {tests.map((test: any, index: number) => (
                <div
                  key={index}
                  className="flex-[0_0_94%] sm:flex-[0_0_48%] lg:flex-[0_0_32%] min-w-0"
                >
                  <TestCard
                    title={test.title}
                    description={test.description}
                    price={test.price}
                    originalPrice={test.originalPrice}
                  />
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* View All Button */}
        <div className="mt-16 text-center">
          <Link href="/tests#tests-section">
          <button className="font-heading px-10 py-4 bg-background-primary hover:bg-red-600 text-white font-bold rounded-2xl transition-all shadow-lg hover:shadow-red-200">
            View All Tests
          </button>
          </Link>
        </div>

      </div>
    </section>
  );
}
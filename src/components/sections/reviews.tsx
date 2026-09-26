"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import ReviewCard from "@/components/cards/reviewCard";
import { reviews } from "@/lib/catalog";

const REVIEWS = reviews.map((r, i) => ({
  id: i,
  author: r.authorName,
  rating: r.rating,
  time: r.date,
  text: r.text,
}));

export default function ReviewCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="w-full bg-white py-12 md:py-16 px-4 text-black relative ">

      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="font-heading text-2xl md:text-4xl font-extrabold mb-2">
          Google Reviews
        </h2>
        <p className="font-body text-gray-700 font-medium text-sm md:text-lg">
          Trusted by thousands of patients.
        </p>
      </div>

      {/* Carousel */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-16">

        <button
          onClick={scrollPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-background-primary text-white rounded-full flex items-center justify-center shadow-lg z-20 hover:bg-red-600 transition"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          onClick={scrollNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-background-primary text-white rounded-full flex items-center justify-center shadow-lg z-20 hover:bg-red-600 transition"
        >
          <ChevronRight size={18} />
        </button>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
          {REVIEWS.map((review, index) => (
              <div
              key={`${review.id || review.author}-${index}`}
                className="flex-[0_0_100%] md:flex-[0_0_48%] lg:flex-[0_0_33.333%] px-3 py-4"
              >
                <ReviewCard
                  author={review.author}
                  rating={review.rating}
                  time={review.time}
                  text={review.text}
                />
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-16 mt-2 md:mt-4 flex flex-col md:flex-row justify-between items-center gap-8">

        <div className="flex gap-4 w-full md:w-auto">
          <button
          onClick={() =>
            window.open(
              "https://maps.app.goo.gl/wDxQ7Aa3Ra9ToY1J9",
              "_blank"
            )
          }
           className="flex-1 md:flex-none whitespace-nowrap md:whitespace-normal px-2 md:px-10 py-4 bg-background-primary text-white font-bold rounded-2xl shadow-md hover:bg-red-700 transition text-sm md:text-base">
            Write A Review
          </button>

          <button
           onClick={() =>
            window.open(
              "https://www.google.com/maps/place/Diagnos+Lab/@22.8088744,86.2029601,17z/data=!4m8!3m7!1s0x39f5e3088f40bb2b:0x46180907852da273!8m2!3d22.8088744!4d86.2029601!9m1!1b1!16s%2Fg%2F1260h0qk1!17m2!4m1!1e3!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDMxNy4wIKXMDSoASAFQAw%3D%3D",
              "_blank"
            )
          }
           className="flex-1 md:flex-none whitespace-nowrap md:whitespace-normal px-2 md:px-10 py-4 md:py-4 bg-white border border-slate-200 text-black font-bold rounded-2xl shadow-sm hover:bg-slate-50 transition text-sm md:text-base">
            View All Reviews
          </button>
        </div>

        <div className="flex items-center gap-3 md:gap-4 bg-white px-4 md:px-6 py-4 rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.08)] border border-slate-50">
          <div className="flex text-orange-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} fill="currentColor" />
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-bold text-2xl text-black leading-none">
              4.9
            </span>
            <span className="whitespace-nowrap md:whitespace-normal text-gray-700 text-xs md:text-sm font-medium leading-none mt-1">
              (2,500+ reviews)
            </span>
          </div>
        </div>

      </div>

    </section>
  );
}
"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";

interface HealthPackage {
  id: number;
  name: string;
  parameters: number;
  description: string;
  currentPrice: string;
  originalPrice: string;
}

const packageData: HealthPackage[] = [
  {
    id: 1,
    name: "ND Plus",
    parameters: 75,
    description:
      "Comprehensive tests assessing blood health, glucose, liver and kidney function,...",
    currentPrice: "2,500",
    originalPrice: "10,000",
  },
  {
    id: 2,
    name: "ND Max Plus",
    parameters: 89,
    description:
      "Extensive tests including those in ND Plus autoimmune markers, inflammatory",
    currentPrice: "3,000",
    originalPrice: "15,000",
  },
  {
    id: 3,
    name: "BIO T Plus",
    parameters: 51,
    description:
      "Tests for blood health, glucose, cholesterol, kidney function, uric acid,.....",
    currentPrice: "1,100",
    originalPrice: "4,000",
  },
  {
    id: 4,
    name: "BIO T D Plus",
    parameters: 53,
    description:
      "Similar to Bio T Plus but with long term glucose monitoring (HbA1c)...",
    currentPrice: "1,400",
    originalPrice: "4,600",
  },
  {
    id: 5,
    name: "ND Basic",
    parameters: 40,
    description:
      "Essential health screening for daily wellness and routine monitoring.",
    currentPrice: "1,200",
    originalPrice: "3,500",
  },
];

export default function PopularHealthPackages() {
  return (
    <section className="relative w-full py-12 bg-[#ef3130] overflow-hidden">
      <div className="absolute inset-0 bg-background-primary" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-16 relative z-10">

        {/* Header */}
        <div className="text-center mb-10 text-white">
          <h2 className="font-heading text-2xl md:text-4xl font-extrabold mb-2 tracking-tight">
            Popular Health Packages
          </h2>
          <p className="font-heading text-white/90 text-sm">
            Preventive health packages designed for every age group.
          </p>
        </div>

        {/* Carousel Wrapper */}
        <div className="relative w-[90%] md:w-full mx-auto">

          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            navigation={{
              prevEl: ".prev-btn-packages",
              nextEl: ".next-btn-packages",
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="py-6"
          >
            {packageData.map((pkg) => (
              <SwiperSlide key={pkg.id}>
                <div className="h-full bg-white rounded-[2rem] p-6 shadow-xl flex flex-col justify-between min-h-[240px]">

                  <div>
                    <h3 className="font-heading text-xl font-bold text-black">
                      {pkg.name}
                    </h3>

                    <p className="font-body text-black text-sm font-medium mb-5">
                      {pkg.parameters} parameters
                    </p>

                    <p className="font-body text-black text-xs md:text-sm  mb-8">
                      {pkg.description}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="font-heading text-xl font-bold text-green-600">
                        ₹{pkg.currentPrice}
                      </span>
                      <span className="font-heading text-gray-400 line-through text-xs font-medium">
                        ₹{pkg.originalPrice}
                      </span>
                    </div>

                    <div className="flex gap-3">
                      <button className="font-heading flex-1 py-2.5 bg-background-primary hover:bg-red-700 text-white text-sm font-bold rounded-xl transition-all shadow-md">
                        Book
                      </button>

                      <button className="font-heading flex-1 py-2.5 border border-background-primary text-background-primary hover:bg-red-50 text-sm font-bold rounded-xl transition-all">
                        Details
                      </button>
                    </div>
                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Arrows */}
          <button className="prev-btn-packages absolute -left-6 md:-left-12 top-1/2 -translate-y-1/2 z-20 w-9 h-9 md:w-10 md:h-10 rounded-full bg-white text-background-primary shadow-md flex items-center justify-center hover:scale-105 transition-all">
            <ChevronLeft size={18} strokeWidth={2.5} />
          </button>

          <button className="next-btn-packages absolute -right-6 md:-right-12 top-1/2 -translate-y-1/2 z-20 w-9 h-9 md:w-10 md:h-10 rounded-full bg-white text-background-primary shadow-md flex items-center justify-center hover:scale-105 transition-all">
            <ChevronRight size={18} strokeWidth={2.5} />
          </button>

        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <button className="font-heading px-8 py-3 bg-white text-background-primary font-bold text-sm rounded-xl transition-all shadow-lg">
            View All Packages
          </button>
        </div>

      </div>
    </section>
  );
}
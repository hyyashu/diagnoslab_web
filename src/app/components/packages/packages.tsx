"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import HealthPackageCard from "./HealthPackageCard";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import rawData from "@/data/packages.json";
interface HealthPackage {
  id: number;
  name: string;
  parameters: number;
  description: string;
  currentPrice: string;
  originalPrice: string;
}



export default function PopularHealthPackages() {
  const packageData = rawData.packages.map((p: any) => ({
    id: p.Id,
    name: p.PackageName,
    parameters: p.ParametersCovered,
    description: p.Description,
    currentPrice: p.DiscountedPrice,
    originalPrice: p.Price,
  }));
  return (
    <section className="relative w-full py-12 bg-white overflow-hidden">
      <div className="absolute inset-0 bg-background-primary" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-16 relative z-10">

        {/* Header */}
        <div className="text-center mb-10 ">
          <h2 className="font-heading text-white text-2xl md:text-4xl font-extrabold mb-2 tracking-tight">
            Popular Health Packages
          </h2>
          <p className="font-heading text-white font-medium text-sm md:text-base">
            Preventive health packages designed for every age group.
          </p>
        </div>

        {/* Carousel */}
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
            {packageData.map((pkg, index) => (
                <SwiperSlide key={`${pkg.id || pkg.name}-${index}`}>
                <HealthPackageCard
                  name={pkg.name}
                  parameters={pkg.parameters}
                  description={pkg.description}
                  currentPrice={pkg.currentPrice}
                  originalPrice={pkg.originalPrice}
                />
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
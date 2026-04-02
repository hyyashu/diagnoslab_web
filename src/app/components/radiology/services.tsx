"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import RadiologyCard from "./RadiologyCard";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import rawData from "@/data/radiologyServices.json";


const RadiologyServices = () => {
  const services = rawData.radiologyServices.map((service: any) => ({
    id: service.id,
    title: service.title,
    description: service.description,
    uses: service.bullets,
    footerNote: service.extra,
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

          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              prevEl: ".prev-btn",
              nextEl: ".next-btn",
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="py-6"
          >
            {services.map((service) => (
              <SwiperSlide key={service.id} className="py-4">
                <RadiologyCard
                  title={service.title}
                  description={service.description}
                  uses={service.uses}
                  footerNote={service.footerNote}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation */}
          <button className="font-heading prev-btn absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-background-primary rounded-full flex items-center justify-center text-white shadow-lg hover:bg-red-700 transition">
            <ChevronLeft size={18} />
          </button>

          <button className="font-heading next-btn absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-background-primary rounded-full flex items-center justify-center text-white shadow-lg hover:bg-red-700 transition">
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
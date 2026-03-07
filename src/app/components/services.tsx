"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";

interface RadiologyService {
  id: number;
  title: string;
  description: string;
  uses: string[];
  footerNote: string;
}

const services: RadiologyService[] = [
  {
    id: 1,
    title: "ULTRASOUND",
    description: "Safe imaging using sound waves to examine internal organs.",
    uses: [
      "Abdomen scans",
      "Pelvic scans",
      "Pregnancy scans",
      "Kidney and liver evaluation",
    ],
    footerNote:
      "Performed by experienced doctors with clear reporting. Female Radiologist for female cases.",
  },
  {
    id: 2,
    title: "ULTRASOUND",
    description: "Safe imaging using sound waves to examine internal organs.",
    uses: [
      "Abdomen scans",
      "Pelvic scans",
      "Pregnancy scans",
      "Kidney and liver evaluation",
    ],
    footerNote:
      "Performed by experienced doctors with clear reporting. Female Radiologist for female cases.",
  },
  {
    id: 3,
    title: "ULTRASOUND",
    description: "Safe imaging using sound waves to examine internal organs.",
    uses: [
      "Abdomen scans",
      "Pelvic scans",
      "Pregnancy scans",
      "Kidney and liver evaluation",
    ],
    footerNote:
      "Performed by experienced doctors with clear reporting. Female Radiologist for female cases.",
  },
  {
    id: 4,
    title: "ULTRASOUND",
    description: "Safe imaging using sound waves to examine internal organs.",
    uses: [
      "Abdomen scans",
      "Pelvic scans",
      "Pregnancy scans",
      "Kidney and liver evaluation",
    ],
    footerNote:
      "Performed by experienced doctors with clear reporting. Female Radiologist for female cases.",
  },
];

const RadiologySlider = () => {
  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="font-heading text-2xl md:text-4xl font-extrabold text-black mb-2">
            Radiology Services
          </h2>
          <p className="font-heading  text-black text-lg">
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
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-gray-100 h-full  flex flex-col">

                  <h3 className="font-heading text-base md:text-xl font-bold text-black mb-4">
                    {service.title}
                  </h3>

                  <p className="font-body font-semibold text-sm md:text-base text-black mb-4 ">
                    {service.description}
                  </p>

                  <div className="mb-6">
                    <p className="font-body text-black text-xs md:text-sm mb-3 font-medium">
                      Used for:
                    </p>

                    <ul className="space-y-2">
                      {service.uses.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-start font-body text-black text-xs md:text-sm"
                        >
                          <span className="mr-1 md:mr-2 mt-1.5 w-1.5 h-1.5 bg-black rounded-full shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="font-body text-xs md:text-sm text-black mt-auto mb-6">
                    {service.footerNote}
                  </p>

                  <button className="font-heading w-full text-sm md:text-base py-4 bg-background-primary hover:bg-red-700 text-white font-bold rounded-xl transition shadow-md active:scale-[0.98]">
                    Book{" "}
                    {service.title
                      .toLowerCase()
                      .charAt(0)
                      .toUpperCase() +
                      service.title.toLowerCase().slice(1)}
                  </button>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <button className="font-heading prev-btn absolute left-0  top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-background-primary rounded-full flex items-center justify-center text-white shadow-lg hover:bg-red-700 transition">
            <ChevronLeft size={18} />
          </button>

          <button className="font-heading next-btn absolute right-0  top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-background-primary rounded-full flex items-center justify-center text-white shadow-lg hover:bg-red-700 transition">
            <ChevronRight size={18} />
          </button>

        </div>

        {/* Bottom CTA */}
        <div className="flex justify-center mt-8">
          <button className="font-heading px-10 py-3  text-white bg-background-primary hover:bg-red-800 hover:text-white font-bold rounded-xl transition">
            View All Radiology
          </button>
        </div>

      </div>
    </section>
  );
};

export default RadiologySlider;
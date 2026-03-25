"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const HeroSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);

  // form state
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const carouselImages: string[] = [
    "/images/heroimage.png",
    "/images/heroimage.png",
    "/images/heroimage.png",
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log({
      name,
      phone,
    });

    // reset form
    setName("");
    setPhone("");
    // show success message
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="relative w-full h-[600px] md:h-[700px] flex flex-col items-center justify-center overflow-visible mb-[180px] md:mb-[120px] z-10 ">
      
      {/* --- BACKGROUND CAROUSEL --- */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Swiper
          onSwiper={setSwiperRef}
          onSlideChange={(swiper: SwiperType) =>
            setActiveIndex(swiper.realIndex)
          }
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          className="h-full w-full"
        >
          {carouselImages.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full w-full">
                <Image
                  src={src}
                  alt={`Slide ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-slate-900/60" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* --- TEXT CONTENT --- */}
      <div className="relative z-10 w-full flex flex-col items-start">
        <div className="w-full max-w-7xl mx-auto px-4 mb-6 md:-mt-20">
          <h1 className="font-heading text-3xl md:text-4xl lg:text-6xl font-black text-white uppercase ">
            All Test <br />
            Under <br />
            One Roof
          </h1>
        </div>

        {/* --- SERVICES BAR --- */}
        <div
          className="relative w-full overflow-x-hidden"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, black 0%, black 40%, transparent 95%)",
            maskImage:
              "linear-gradient(to right, black 0%, black 40%, transparent 95%)",
          }}
        >
          <div className="bg-white/70 backdrop-blur-md py-3 md:py-4">
            <div className="w-full max-w-7xl mx-auto px-4">
              <p className="font-body text-sm md:text-xl font-bold text-slate-900 whitespace-nowrap">
                Blood Tests | PFT | X-Ray | ECG | Ultrasound
              </p>
            </div>
          </div>
        </div>

        {/* --- CUSTOM PAGINATION --- */}
        <div className="w-full max-w-7xl mx-auto px-4 mt-8 mb-8 md:mb-0" >
          <div className="flex items-center space-x-3">
            {carouselImages.map((_, i) => (
              <button
                key={i}
                onClick={() => swiperRef?.slideToLoop(i)}
                className={`transition-all duration-500 ease-in-out rounded-full bg-white shadow-lg h-2 ${
                  activeIndex === i
                    ? "w-16 opacity-100"
                    : "w-2 opacity-40 hover:opacity-70"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* --- FLOATING ENQUIRY FORM --- */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20 w-full max-w-[90%] md:max-w-5xl">
        <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-2xl border border-slate-100">
          <h3 className="font-heading text-xl md:text-2xl font-black text-slate-900 mb-6">
            Enquire Now
          </h3>

          <form
            className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end"
            onSubmit={handleSubmit}
          >
            {/* Name */}
            <div className="flex flex-col space-y-2">
              <label className="font-body text-sm font-bold text-black">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                required
                className="w-full text-black bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:border-red-500 outline-none transition-all"
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col space-y-2">
              <label className="font-body text-sm font-bold text-black">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="10-Digit Mobile Number"
                required
                className="w-full text-black bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:border-red-500 outline-none transition-all"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="font-heading w-full bg-background-primary hover:bg-red-700 text-white font-black py-4 rounded-xl shadow-lg transition-all active:scale-95 uppercase tracking-widest"
            >
              Book
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
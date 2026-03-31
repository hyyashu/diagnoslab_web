"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { submitLeadForm } from "@/lib/api";
import { useSource } from "@/lib/useSource";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const HeroSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const formRef = useRef<HTMLFormElement>(null);
  const source = useSource({ form_type: "corporate_hero_form" });

  const carouselImages: string[] = [
    "/images/corporate.jpg",
    "/images/corporate.jpg",
    "/images/corporate.jpg",
  ];

  const handleSubmit = async (formData: FormData) => {
    const companyName = String(formData.get("companyName") ?? "").trim();
    const contactPerson = String(formData.get("contactPerson") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").replace(/\D/g, "");
    const email = String(formData.get("email") ?? "").trim();
    const employees = String(formData.get("employees") ?? "").trim();

    setError(null);
    setSubmitting(true);

    try {
      await submitLeadForm({
        name: contactPerson || companyName,
        phone,
        source: {
          ...source,
          company_name: companyName,
          contact_person: contactPerson,
          email,
          employees,
          lead_type: "corporate",
        },
      });

      formRef.current?.reset();
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
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
        <div className="w-full max-w-7xl mx-auto px-4 mb-6 -mt-30 md:-mt-20">
          <h1 className="font-heading text-3xl md:text-4xl lg:text-6xl font-black text-white uppercase ">
            We are the Trusted <br /> Partner for Employee <br />
            Health in Jharkhand.
            <br />
          </h1>
        </div>

        {/* --- SERVICES BAR --- */}
        <div
          className="relative w-full overflow-x-hidden 
          md:[mask-image:linear-gradient(to_right,black_0%,black_40%,transparent_95%)] 
          md:[webkit-mask-image:linear-gradient(to_right,black_0%,black_40%,transparent_95%)]"
        >
          <div className="bg-white/70 backdrop-blur-md py-3 md:py-4">
            <div className="w-full max-w-7xl mx-auto px-4">
              <p className="font-body text-[10px] md:text-xl font-bold text-black whitespace-normal max-w-prose md:max-w-none">
                We specialise in corporae health screening for banks,
                industries, hotels, and organisations. Partner with Diagnos Lab
                for on-site camps, bulk testing, and fast digital reports,
                managed by an experienced medical team.
              </p>
            </div>
          </div>
        </div>

        {/* --- CUSTOM PAGINATION --- */}
        <div className="w-full max-w-7xl mx-auto px-4 mt-8 mb-8 md:mb-0">
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
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20 w-full max-w-[100%] md:max-w-5xl">
        <div className="bg-white p-4 md:p-8 rounded-[2rem] shadow-2xl border border-slate-100 ml-4 mr-4 lg:ml-0 lg:mr-0">
          <h3 className="font-heading text-xl md:text-2xl font-black text-black mb-2 md:mb-6">
            Get In touch
          </h3>

          <form
            ref={formRef}
            action={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6 items-end "
          >
            {/* Company Name */}
            <div className="flex flex-col space-y-2">
              <label className="font-body text-sm font-bold text-black">
                Company Name
              </label>
              <input
                name="companyName"
                type="text"
                placeholder="Your Company Name"
                required
                className="w-full h-8 md:h-full text-black bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:border-red-500 outline-none"
              />
            </div>

            {/* Contact Person */}
            <div className="flex flex-col space-y-2">
              <label className="font-body text-sm font-bold text-black">
                Contact Person Name
              </label>
              <input
                name="contactPerson"
                type="text"
                placeholder="Full Name"
                required
                className="w-full h-8 md:h-full text-black bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:border-red-500 outline-none"
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col space-y-2">
              <label className="font-body text-sm font-bold text-black">
                Phone Number
              </label>
              <input
                name="phone"
                type="tel"
                placeholder="10-Digit Mobile Number"
                required
                className="w-full h-8 md:h-full text-black bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:border-red-500 outline-none"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col space-y-2">
              <label className="font-body text-sm font-bold text-black">
                Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="Company@example.com"
                required
                className="w-full h-8 md:h-full text-black bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:border-red-500 outline-none"
              />
            </div>

            {/* Employees */}
            <div className="flex flex-col space-y-2 ">
              <label className="font-body text-sm font-bold text-black">
                Number Of Employees
              </label>
              <input
                name="employees"
                type="number"
                placeholder="e.g. 100"
                required
                className="w-full h-8 md:h-full text-black bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:border-red-500 outline-none"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={submitting}
              className="font-heading w-full h-10 md:h-14 bg-background-primary hover:bg-red-700 text-white font-black rounded-xl shadow-lg transition-all active:scale-95 disabled:opacity-60 disabled:pointer-events-none"
            >
              {submitting ? "Submitting..." : "Get In Touch!"}
            </button>
          </form>

          {submitted && (
            <p className="text-green-600 mt-4 font-semibold">
              Form submitted successfully!
            </p>
          )}
          {error && <p className="text-red-600 mt-4 font-semibold">{error}</p>}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
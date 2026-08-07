"use client";

import React from "react";
import Image from "next/image";
import EnquiryForm from "../../components/enquiryForm";

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full h-[600px] md:h-[700px] flex flex-col items-center justify-center overflow-visible mb-[180px] md:mb-[120px] z-10">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/images/radiology/XRAY.avif"
          alt="X-Ray at Diagnos Lab"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-slate-900/60" />
      </div>

      <div className="relative z-10 w-full flex flex-col items-start">
        <div className="w-full max-w-7xl mx-auto px-4 mb-6 md:-mt-20">
          <h1 className="font-heading text-3xl md:text-4xl lg:text-6xl font-black text-white uppercase">
            Digital X-Ray <br />
            in Jamshedpur
          </h1>
        </div>

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
                Fractures | Chest | Spine | Joints | Reports in 1–2 hours
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20 w-full max-w-[90%] md:max-w-5xl">
        <EnquiryForm formType="enquiry_form" />
      </div>
    </section>
  );
};

export default HeroSection;

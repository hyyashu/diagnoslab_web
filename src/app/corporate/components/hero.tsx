"use client";

import React from "react";
import Image from "next/image";
import CorporateForm from "./corporateForm";

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full h-[700px] flex flex-col items-center justify-center overflow-visible mb-[180px] md:mb-[120px] z-10 ">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/images/corporate.avif"
          alt="Corporate Hero"
          fill
          className="object-cover"
        />
      </div>
      <div className="relative z-10 w-full flex flex-col items-start">
        <div className="w-full max-w-7xl mx-auto px-4 mb-6 -mt-50 md:-mt-20">
          <h1 className="font-heading text-3xl md:text-4xl lg:text-6xl font-black text-white uppercase ">
            We are the Trusted <br /> Partner for Employee <br />
            Health in Jharkhand.
            <br />
          </h1>
        </div>

        <div
          className="relative w-full overflow-x-hidden 
          md:[mask-image:linear-gradient(to_right,black_0%,black_50%,transparent_100%)] 
          md:[webkit-mask-image:linear-gradient(to_right,black_0%,black_50%,transparent_100%)]"
        >
          <div className="bg-white/70 backdrop-blur-md py-1 md:py-4">
            <div className="w-full max-w-6xl mx-auto px-4">
              <p className="font-body text-[10px] md:text-xl font-bold text-black whitespace-normal max-w-prose md:max-w-none">
                We specialise in corporae health screening for banks,
                industries, hotels, and organisations. Partner with Diagnos Lab
                for on-site camps, bulk testing, and fast digital reports,
                managed by an experienced medical team.
              </p>
            </div>
          </div>
        </div>
      </div>

      <CorporateForm />
    </section>
  );
};

export default HeroSection;
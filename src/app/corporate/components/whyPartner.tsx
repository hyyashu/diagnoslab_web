"use client";

import React from "react";
import Image from "next/image";
import FeatureCard from "./featureCard";

const features = [
  {
    title: "Fast & Accurate Reporting",
    description: "Digital reports with same-day results.",
  },
  {
    title: "Custom Corporate Health Packages",
    description: "Customizable plans for employees & executives.",
  },
  {
    title: "Comprehensive Diagnostic Solutions",
    description:
      "Pathology, Radiology (x-ray), ECG, TMT, Eye, Audio & more.",
  },
  {
    title: "On-Site & Off-Site Testing",
    description:
      "Flexible options for sample collection at your premises or at our lab.",
  },
  {
    title: "Dedicated Corporate Support",
    description:
      "Seamless coordination, priority booking, and exclusive discounts.",
  },
];

const WhyPartner = () => {
  return (
    <section className="bg-white py-20  flex flex-col items-center select-none overflow-hidden">
      <h2 className="text-2xl md:text-3xl font-extrabold text-black font-heading mb-0 md:mb-52 text-center">
        Why Partner With Diagnos Lab
      </h2>

      {/*  MOBILE + TABLET */}
      <div className="relative w-full max-w-md flex flex-col items-center gap-6 px-6 lg:hidden">
        {features.map((item, i) => (
          <FeatureCard
            key={i}
            title={item.title}
            description={item.description}
          />
        ))}

        {/* Arc */}
        <div className="relative w-full h-[180px] mt-6">
          <svg viewBox="0 0 500 250" className="w-full h-full">
            <path
              d="M 50 250 A 200 200 0 0 1 450 250"
              fill="none"
              stroke="#E1352A"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <circle cx="50" cy="220" r="8" fill="white" />
            <circle cx="100" cy="115" r="8" fill="white" />
            <circle cx="250" cy="50" r="8" fill="white" />
            <circle cx="400" cy="115" r="8" fill="white" />
            <circle cx="450" cy="220" r="8" fill="white" />
          </svg>

          {/* Logo */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
            <div className="relative w-20 h-20">
              <Image
                src="/images/logo.png"
                alt="Diagnos Lab Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP */}
      <div className="relative w-full max-w-[550px] h-[280px] hidden lg:block">
        {/* Arc */}
        <div className="absolute inset-0 flex justify-center items-end">
          <svg viewBox="0 0 500 250" className="w-full h-full overflow-visible">
            <path
              d="M 50 250 A 200 200 0 0 1 450 250"
              fill="none"
              stroke="#E1352A"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <circle cx="50" cy="220" r="10" fill="white" />
            <circle cx="100" cy="115" r="10" fill="white" />
            <circle cx="250" cy="50" r="10" fill="white" />
            <circle cx="400" cy="115" r="10" fill="white" />
            <circle cx="450" cy="220" r="10" fill="white" />
          </svg>
        </div>

        {/* Logo */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
          <div className="relative w-[120px] h-[120px]">
            <Image
              src="/images/logo.png"
              alt="Diagnos Lab Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Cards */}
        <FeatureCard
          title={features[0].title}
          description={features[0].description}
          className="absolute bottom-2 left-0 -translate-x-full -ml-12"
        />

        <FeatureCard
          title={features[1].title}
          description={features[1].description}
          className="absolute top-0 left-2 -translate-x-[70%] -translate-y-1/2"
        />

        <FeatureCard
          title={features[2].title}
          description={features[2].description}
          className="absolute -top-16 left-1/2 -translate-x-1/2 -translate-y-full"
        />

        <FeatureCard
          title={features[3].title}
          description={features[3].description}
          className="absolute top-0 right-4 translate-x-[70%] -translate-y-1/2"
        />

        <FeatureCard
          title={features[4].title}
          description={features[4].description}
          className="absolute bottom-2 right-0 translate-x-full -mr-12"
        />
      </div>
    </section>
  );
};

export default WhyPartner;
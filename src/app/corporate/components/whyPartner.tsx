"use client";

import React from "react";
import Image from "next/image";
import FeatureCard from "./featureCard";

const features = [
  {
    title: "Comprehensive Diagnostic Solutions",
    description: "Pathology, Radiology (X-ray), ECG, TMT, Eye, Audio & more.",
  },
  {
    title: "On-Site & Off-Site Testing",
    description: "Flexible options for sample collection at your premises or at our lab.",
  },
  {
    title: "Dedicated Corporate Support",
    description: "Seamless coordination, priority booking, and exclusive discounts.",
  },
  {
    title: "Custom Corporate Health Packages",
    description: "Customizable plans for employees & executives.",
  },
  {
    title: "Fast & Accurate Reporting",
    description: "Digital reports with same-day results.",
  },
];

const WhyPartner = () => {
  return (
    <section className="bg-white py-12 flex flex-col items-center select-none overflow-hidden">
      <h2 className="font-heading text-black text-2xl md:text-4xl font-extrabold mb-2 text-center">
        Why Partner With Diagnos Lab
      </h2>

      {/* MOBILE CONTAINER (Matches Image Precisely) */}
      <div className="relative flex w-full max-w-lg px-4 lg:hidden min-h-[800px]">
        
        {/* Left Side: The Vertical Arc */}
        <div className="relative w-1/4 flex items-center justify-start">
        <svg viewBox="0 0 100 600" className="h-full w-full overflow-visible" style={{ filter: "drop-shadow(2px 4px 6px rgba(0,0,0,0.1))" }}>
  {/*ONLY MOBILE SHIFT */}
  <g transform="translate(0, 80)">
    
    <path
      d="M 0 50 A 175 175 0 0 1 0 400"
      fill="none"
      stroke="#E1352A"
      strokeWidth="8"
      strokeLinecap="round"
    />

    <circle cx="15" cy="50" r="7" fill="white" stroke="white" strokeWidth="1" />
    <circle cx="124" cy="101.3" r="7" fill="white" stroke="white" strokeWidth="1" />
    <circle cx="175" cy="225" r="7" fill="white" stroke="white" strokeWidth="1" />
    <circle cx="124" cy="348.7" r="7" fill="white" stroke="white" strokeWidth="1" />
    <circle cx="15" cy="400" r="7" fill="white" stroke="white" strokeWidth="1" />

    </g>
</svg>

          {/* Logo overlayed on the arc center */}
          <div className="absolute left-[-10px] top-1/2 -translate-y-1/2 z-10">
            <div className="relative w-20 h-20  flex items-center justify-center ">
              <Image
                src="/images/logo.png" 
                alt="Logo"
                width={100}
                height={100}
                className="object-contain"
              />
            </div>
          </div>
        </div>

        
        <div className="w-3/4 flex flex-col justify-between py-20 gap-0">
          {features.map((item, i) => {
            
            const offsets = [
                "-80px",    // Top Card
                "50px",   // Slightly indented
                "80px",   // Middle Card (Max indentation)
                "50px",   // Slightly indented
                "-80px"     // Bottom Card
            ];

            return (
              <div 
                key={i} 
                className="transition-all duration-500 ease-in-out"
                style={{ marginLeft: offsets[i] }}
              >
                <FeatureCard
                  title={item.title}
                  description={item.description}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* DESKTOP CONTAINER */}
      <div className="relative w-full max-w-[550px] h-[280px] hidden lg:block mt-52">
        {/* Arc */}
        <div className="absolute inset-0 flex justify-center items-end">
          <svg viewBox="0 0 500 250" className="w-full h-full overflow-hidden">
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
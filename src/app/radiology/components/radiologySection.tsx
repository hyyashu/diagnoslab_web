"use client";

import RadiologyCard from "./radiologyCard";
import data from "@/data/radiologyServices.json";

type Service = {
  id: string;
  title: string;
  bookLabel: string;
  description: string;
  bullets: string[];
  extra: string;
  reportingTime: string;
  image: string;
  href: string | null;
};

export default function RadiologySection() {
  const services: Service[] = data.radiologyServices;

  return (
    <section id="radiology-section" className="bg-gray-50 py-12 md:py-16 px-4 md:px-10">

      {/* Heading */}
      <div className="text-center mb-10">
        <p className="font-heading text-[#E73834] font-bold text-xs uppercase tracking-widest mb-2">
          Our Services
        </p>
        <h1 className="font-heading text-2xl md:text-4xl font-black text-black tracking-tight mb-3">
          Radiology Services
        </h1>
        <p className="font-body text-gray-500 text-sm md:text-base max-w-xl mx-auto">
          Advanced imaging and diagnostic services with fast reporting and experienced specialists.
        </p>
      </div>

      {/* 2-col grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
        {services.map((service, index) => (
          <RadiologyCard
            key={service.id}
            title={service.title}
            description={service.description}
            facilities={service.bullets}
            reportingTime={service.reportingTime}
            image={service.image}
            href={service.href}
            femaleRadiologist={index === 0}
          />
        ))}
      </div>
    </section>
  );
}

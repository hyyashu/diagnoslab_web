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
};

export default function RadiologySection() {
  const services: Service[] = data.radiologyServices;

  return (
    <section id="radiology-section" className="bg-gray-100 py-12 px-4 md:px-10">
      {/* Heading */}
      <div className="text-center mb-8 md:mb-10">
        <h1 className="font-heading text-2xl md:text-4xl text-black mb-3 tracking-tight font-bold">
          Radiology Services
        </h1>
        <p className="font-body text-gray-500 font-medium text-sm md:text-lg">
          Book a service below. Click "Book" to open the enquiry form.
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto mt-10 space-y-6">
        {services.map((service, index) => (
          <RadiologyCard
            key={service.id}
            title={service.title}
            description={service.description}
            facilities={service.bullets}   
            reportingTime={service.reportingTime}        
            image={service.image}
            reverse={index === 1 || index === 3}
          />
        ))}
      </div>
    </section>
  );
}
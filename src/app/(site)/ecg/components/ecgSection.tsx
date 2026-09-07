"use client";

import RadiologyCard from "../../radiology/components/radiologyCard";
import data from "@/data/radiologyServices.json";

const ecgService = data.radiologyServices.find(
  (service) => service.id === "ecg"
);

export default function EcgSection() {
  if (!ecgService) return null;

  return (
    <section id="ecg-section" className="bg-gray-100 py-12 px-4 md:px-10">
      <div className="text-center mb-8 md:mb-10">
        <h2 className="font-heading text-2xl md:text-4xl text-black mb-3 tracking-tight font-bold">
          ECG Services
        </h2>
        <p className="font-body text-gray-700 font-medium text-sm md:text-lg">
          Quick heart rhythm and electrical activity testing. Click Book to
          schedule your appointment.
        </p>
      </div>

      <div className="max-w-6xl mx-auto mt-10">
        <RadiologyCard
          title={ecgService.title}
          description={ecgService.description}
          facilities={ecgService.bullets}
          reportingTime={ecgService.reportingTime}
          image={ecgService.image}
        />
      </div>
    </section>
  );
}

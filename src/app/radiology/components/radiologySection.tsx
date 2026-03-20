"use client";

import RadiologyCard from "./radiologyCard";

const services = [
    {
      title: "Ultrasound",
      description:
        "Safe imaging using sound waves to examine internal organs.",
      facilities: [
        "Abdomen scans",
        "Pelvic scans",
        "Pregnancy scans",
        "Kidney and liver evaluation",
      ],
      reportingTime: "1-2 hours",
      note:
        "Performed by experienced doctors with clear reporting. Female Radiologist for female cases.",
      image: "/images/heroimage.png",
    },
    {
      title: "PFT",
      description:
        "A breathing test used to evaluate lung capacity and airflow.",
      facilities: [
        "Asthma",
        "Chronic cough",
        "Breathlessness",
        "Pre-surgery lung assessment",
      ],
      reportingTime: "1-2 hours",
      note: "Performed by experienced doctors with clear reporting. Female Radiologist for female cases.",
      image: "/images/heroimage.png",
    },
    {
      title: "ECG (Electrocardiogram)",
      description:
        "Quick test to check heart rhythm and electrical activity.",
      facilities: [
        "Chest pain",
        "Irregular heartbeat",
        "Pre-surgery fitness",
        "Routine cardiac screening",
      ],
      reportingTime: "1-2 hours",
      note: "Performed by experienced doctors with clear reporting. Female Radiologist for female cases.",
      image: "/images/heroimage.png",
    },
    {
      title: "X-Ray",
      description:
        "Fast, low radiation imaging for bones, chest, spine, joints, and more.",
      facilities: [
        "Fractures",
        "Chest infections",
        "Back pain",
        "Joint problems",
      ],
      reportingTime: "1-2 hours",
      note: "Performed by experienced doctors with clear reporting. Female Radiologist for female cases.",
      image: "/images/heroimage.png",
    },
  ];

export default function RadiologySection() {
  return (
    <section className="bg-gray-100 py-12 px-4 md:px-10">
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
            key={index}
            {...service}
            reverse={index === 1 || index === 3} 
          />
        ))}
      </div>
    </section>
  );
}
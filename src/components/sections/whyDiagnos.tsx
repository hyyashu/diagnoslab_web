"use client";

import FeatureCard from "@/components/cards/featureCard";
import { FileText, Clock, Layers, Users } from "lucide-react";

export default function WhyDiagnosLab() {
  const features = [
    {
      icon: <FileText className="w-8 h-8 md:w-12 md:h-12" strokeWidth={1.2} />,
      title: "Fast & Reliable Reports",
      description: "Specialized reports are delivered the same day.",
    },
    {
      icon: <Clock className="w-8 h-8 md:w-12 md:h-12" strokeWidth={1.2} />,
      title: "Home Collection Starts at 6 AM",
      description: "Early morning sample collection at your doorstep.",
    },
    {
      icon: <Layers className="w-8 h-8 md:w-12 md:h-12" strokeWidth={1.2} />,
      title: "All Tests Under One Roof",
      description: "Pathology, Radiology, ECG, Ultrasound, PFT.",
    },
    {
      icon: <Users className="w-8 h-8 md:w-12 md:h-12" strokeWidth={1.2} />,
      title: "Experienced Medical Team",
      description: "15+ years of trust with 3000+ verified reviews.",
    },
  ];

  return (
    <section className="bg-background-primary py-12 md:py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center  mb-10 md:mb-12">
          <h2 className="font-heading text-white text-2xl md:text-4xl font-extrabold mb-3 md:mb-4">
            Why Diagnos Lab
          </h2>

          <p className="font-heading text-white font-medium text-base md:text-lg max-w-2xl mx-auto">
            We combine accuracy, care and convenience so you get diagnostics you
            can rely on.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

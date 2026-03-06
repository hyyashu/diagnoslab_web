import React from 'react';
import { FileText, Clock, Layers, Users } from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureProps) => (
  <div className="flex flex-col items-center p-4 md:p-8 bg-white rounded-2xl md:rounded-3xl shadow-lg text-center h-full transition-transform hover:scale-105">
    <div className="mb-3 md:mb-6 text-black">
      {icon}
    </div>
    <h3 className="font-heading text-[13px] md:text-xl font-bold text-black mb-2 md:mb-4 ">
      {title}
    </h3>
    <p className="font-body text-[11px] md:text-sm text-black ">
      {description}
    </p>
  </div>
);

const WhyDiagnosLab = () => {
  const features = [
    {
      icon: <FileText className="w-8 h-8 md:w-12 md:h-12" strokeWidth={1.2} />,
      title: "Fast & Reliable Reports",
      description: "Specialized reports are delivered the same day."
    },
    {
      icon: <Clock className="w-8 h-8 md:w-12 md:h-12" strokeWidth={1.2} />,
      title: "Home Collection Starts at 6 AM",
      description: "Early morning sample collection at your doorstep."
    },
    {
      icon: <Layers className="w-8 h-8 md:w-12 md:h-12" strokeWidth={1.2} />,
      title: "All Tests Under One Roof",
      description: "Pathology, Radiology, ECG, Ultrasound, PFT."
    },
    {
      icon: <Users className="w-8 h-8 md:w-12 md:h-12" strokeWidth={1.2} />,
      title: "Experienced Medical Team",
      description: "15+ years of trust with 2500+ verified reviews."
    }
  ];

  return (
    <section className="bg-background-primary py-12 md:py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center text-white mb-10 md:mb-12">
          <h2 className="font-heading text-2xl md:text-4xl font-extrabold mb-3 md:mb-4">
            Why Diagnos Lab
          </h2>
          <p className="font-heading text-sm md:text-lg opacity-90 max-w-2xl mx-auto">
            We Combine accuracy, care and convenience so you get diagnostics you can rely on.
          </p>
        </div>

        {/* Features Grid: 2 columns for mobile, 4 for desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyDiagnosLab;
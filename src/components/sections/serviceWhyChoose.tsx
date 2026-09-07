import React from "react";
import FeatureCard from "@/components/cards/featureCard";

/* The ECG, X-Ray and Ultrasound pages shared this block verbatim; only the
   heading, the four features and an optional standfirst ever differed. */
export type ServiceFeature = {
  icon: React.ReactNode;
  title: string;
};

export type ServiceWhyChooseProps = {
  title: string;
  description?: string;
  features: ServiceFeature[];
};

export default function ServiceWhyChoose({
  title,
  description,
  features,
}: ServiceWhyChooseProps) {
  return (
    <section className="bg-background-primary py-12 md:py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="font-heading text-white text-2xl md:text-4xl font-extrabold mb-3 md:mb-4">
            {title}
          </h2>
          {description && (
            <p className="font-body text-white/90 text-sm md:text-base max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

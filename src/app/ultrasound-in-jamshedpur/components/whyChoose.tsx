import { Monitor, Users, UserCheck, Clock, ShieldCheck } from "lucide-react";
import FeatureCard from "../../components/whyDiagnos/featureCard";

const features = [
  {
    icon: <Monitor size={32} />,
    title: "Advanced USG Equipment",
  },
  {
    icon: <Users size={32} />,
    title: "Experienced Radiology Team",
  },
  {
    icon: <UserCheck size={32} />,
    title: "Female Radiologist for female cases",
  },
  {
    icon: <Clock size={32} />,
    title: "Same Day Reports",
  },
];

export default function WhyChoose() {
  return (
    <section className="bg-background-primary py-12 md:py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="font-heading text-white text-2xl md:text-4xl font-extrabold mb-3 md:mb-4">
            Why Choose Ultrasound at Diagnos Lab
          </h2>
          <p className="font-body text-white/90 text-sm md:text-base max-w-2xl mx-auto">
            Trusted ultrasound imaging in Jamshedpur with clear reports,
            experienced radiologists, and same-day turnaround.
          </p>
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

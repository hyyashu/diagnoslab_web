import { Monitor, Users, UserCheck, Clock, FileText } from "lucide-react";
import FeatureCard from "../../components/whyDiagnos/featureCard";

const features = [
  {
    icon: <Monitor size={32} />,
    title: "Modern digital equipment",
  },
  {
    icon: <Users size={32} />,
    title: "Experienced technical team",
  },
  {
    icon: <UserCheck size={32} />,
    title: "Female Radiologist for female cases",
  },
  {
    icon: <Clock size={32} />,
    title: "Quick turnaround time",
  },
  {
    icon: <FileText size={32} />,
    title: "Clear and accurate reports",
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-background-primary py-12 md:py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center  mb-10 md:mb-12">
          <h2 className="font-heading text-white text-2xl md:text-4xl font-extrabold mb-3 md:mb-4">
            Why Choose Radiology
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
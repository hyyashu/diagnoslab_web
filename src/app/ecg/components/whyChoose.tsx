import { Activity, Users, Clock, HeartPulse } from "lucide-react";
import FeatureCard from "../../components/whyDiagnos/featureCard";

const features = [
  {
    icon: <Activity size={32} />,
    title: "Modern ECG Equipment",
  },
  {
    icon: <Users size={32} />,
    title: "Experienced Cardiac Team",
  },
  {
    icon: <HeartPulse size={32} />,
    title: "Quick & painless test",
  },
  {
    icon: <Clock size={32} />,
    title: "Reports Same Day",
  },
];

export default function WhyChoose() {
  return (
    <section className="bg-background-primary py-12 md:py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="font-heading text-white text-2xl md:text-4xl font-extrabold mb-3 md:mb-4">
            Why Choose ECG at Diagnos Lab
          </h2>
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

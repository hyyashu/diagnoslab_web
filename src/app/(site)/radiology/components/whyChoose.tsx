import { Monitor, Users, UserCheck, Clock, FileText } from "lucide-react";

const features = [
  {
    icon: Monitor,
    title: "Modern Digital Equipment",
    detail: "High-resolution imaging with the latest diagnostic technology.",
  },
  {
    icon: Users,
    title: "Experienced Specialists",
    detail: "Qualified radiologists and technicians with years of expertise.",
  },
  {
    icon: UserCheck,
    title: "Female Radiologist",
    detail: "Dedicated female radiologist available for female patients.",
  },
  {
    icon: Clock,
    title: "Reports in 1–2 Hours",
    detail: "Fast turnaround so you and your doctor can act quickly.",
  },
  {
    icon: FileText,
    title: "Clear, Accurate Reports",
    detail: "Detailed digital reports delivered on WhatsApp and email.",
  },
];

export default function WhyChoose() {
  return (
    <section className="bg-[#E73834] py-12 md:py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="font-heading text-white text-2xl md:text-4xl font-black tracking-tight mb-2">
            Why Choose Diagnos Lab
          </h2>
          <p className="font-body text-red-100 text-sm md:text-base">
            Trusted by thousands of patients in Jamshedpur for accurate radiology services.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 flex flex-col gap-3 hover:bg-white/15 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                    <Icon size={20} color="white" strokeWidth={2} />
                  </div>
                  <span className="font-heading text-white/50 text-3xl font-black leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <p className="font-heading text-white font-bold text-sm leading-snug mb-1">
                    {f.title}
                  </p>
                  <p className="font-body text-red-100 text-xs leading-relaxed">
                    {f.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

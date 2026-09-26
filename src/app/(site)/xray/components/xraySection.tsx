import RadiologyCard from "../../radiology/components/radiologyCard";
import { radiologyServices } from "@/lib/catalog";

const xrayService = radiologyServices.find(
  (service) => service.id === "xray"
);

export default function XraySection() {
  if (!xrayService) return null;

  return (
    <section id="xray-section" className="bg-gray-100 py-12 px-4 md:px-10">
      <div className="text-center mb-8 md:mb-10">
        <h2 className="font-heading text-2xl md:text-4xl text-black mb-3 tracking-tight font-bold">
          X-Ray Services
        </h2>
        <p className="font-body text-gray-700 font-medium text-sm md:text-lg">
          Fast digital imaging for bones, chest, spine, and joints. Click Book
          to schedule your appointment.
        </p>
      </div>

      <div className="max-w-6xl mx-auto mt-10">
        <RadiologyCard
          title={xrayService.title}
          description={xrayService.description}
          facilities={xrayService.bullets}
          reportingTime={xrayService.reportingTime}
          image={xrayService.image}
        />
      </div>
    </section>
  );
}

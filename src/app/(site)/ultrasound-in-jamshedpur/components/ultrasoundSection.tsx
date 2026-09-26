import RadiologyCard from "../../radiology/components/radiologyCard";
import { radiologyServices } from "@/lib/catalog";

const ultrasoundService = radiologyServices.find(
  (service) => service.id === "ultrasound"
);

export default function UltrasoundSection() {
  if (!ultrasoundService) return null;

  return (
    <section id="ultrasound-section" className="bg-gray-100 py-12 px-4 md:px-10">
      <div className="text-center mb-8 md:mb-10">
        <h2 className="font-heading text-2xl md:text-4xl text-black mb-3 tracking-tight font-bold">
          Book Your Ultrasound
        </h2>
        <p className="font-body text-gray-700 font-medium text-sm md:text-lg max-w-2xl mx-auto">
          Safe imaging using sound waves to examine internal organs. Click Book
          to schedule your appointment at our Jamshedpur center.
        </p>
      </div>

      <div className="max-w-6xl mx-auto mt-10">
        <RadiologyCard
          title={ultrasoundService.title}
          description={ultrasoundService.description}
          facilities={ultrasoundService.bullets}
          reportingTime={ultrasoundService.reportingTime}
          image={ultrasoundService.image}
          femaleRadiologist
        />
      </div>
    </section>
  );
}

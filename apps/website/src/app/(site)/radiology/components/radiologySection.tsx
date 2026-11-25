import ScanCard from "@/components/cards/scanCard";
import SectionHead from "@/components/ui/sectionHead";
import { shell } from "@/components/ui/shell";
import { scanServices } from "../content";

/* DL.pen radiology "Radiology Services": ultrasound featured, the rest in
   a four-up grid (a list of compact rows on phones). */
export default function RadiologySection() {
  const [featured, ...rest] = scanServices;

  return (
    <section id="radiology-section" aria-labelledby="services-heading" className="bg-white py-10 md:py-24">
      <div className={`${shell} flex flex-col gap-5 md:gap-9`}>
        <SectionHead
          id="services-heading"
          eyebrow="OUR SERVICES"
          title="Radiology services"
          subtitle="Advanced imaging with fast reporting and experienced specialists."
        />
        <ScanCard scan={featured} variant="featured" />
        <ul className="flex flex-col gap-3 md:grid md:grid-cols-2 md:gap-5 lg:grid-cols-4">
          {rest.map((scan) => (
            <li key={scan.id}>
              <ScanCard scan={scan} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

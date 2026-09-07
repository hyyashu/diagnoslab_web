import data from "@/data/ultrasoundScans.json";

export default function ScanTypes() {
  const { scanTypes } = data;

  return (
    <section className="bg-white py-12 md:py-16 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="font-heading text-2xl md:text-4xl text-black mb-3 tracking-tight font-bold">
            Ultrasound Scans We Offer
          </h2>
          <p className="font-body text-gray-700 font-medium text-sm md:text-lg max-w-2xl mx-auto">
            From routine abdominal checks to pregnancy monitoring — comprehensive
            USG services under one roof.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {scanTypes.map((scan) => (
            <div
              key={scan.id}
              className="bg-gray-50 rounded-[1.5rem] p-6 md:p-7 border border-gray-100 shadow-sm h-full flex flex-col"
            >
              <h3 className="font-heading text-lg md:text-xl font-bold text-black mb-3">
                {scan.title}
              </h3>
              <p className="font-body text-sm md:text-base text-gray-700 leading-relaxed flex-grow">
                {scan.description}
              </p>
              <p className="font-body text-xs md:text-sm font-bold text-background-primary mt-5 pt-4 border-t border-gray-200">
                Preparation: {scan.preparation}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { ultrasoundPreparationSteps as preparationSteps } from "@/lib/catalog";

export default function Preparation() {

  return (
    <section className="bg-gray-100 py-12 md:py-16 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
          <div>
            <h2 className="font-heading text-2xl md:text-4xl text-black mb-4 tracking-tight font-bold">
              How to Prepare for Your Scan
            </h2>
            <p className="font-body text-gray-700 font-medium text-sm md:text-lg mb-6">
              Proper preparation helps us get clearer images and accurate results.
              Follow the guidelines below based on your scan type.
            </p>

            <div className="space-y-6">
              {preparationSteps.map((step) => (
                <div key={step.id} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-full bg-background-primary flex items-center justify-center text-white font-bold text-sm">
                    {step.id}
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-black text-sm md:text-lg">
                      {step.title}
                    </h3>
                    <p className="font-body text-gray-700 text-sm md:text-base mt-1 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-[2rem] p-6 md:p-8 border border-gray-100 shadow-sm">
            <h3 className="font-heading text-xl md:text-2xl font-bold text-black mb-4">
              What to Expect
            </h3>
            <ul className="space-y-4 font-body text-sm md:text-base text-gray-700">
              <li className="flex items-start gap-3">
                <span className="mt-2 w-1.5 h-1.5 bg-background-primary rounded-full shrink-0" />
                Ultrasound is painless, non-invasive, and uses no radiation — safe
                for all ages including pregnancy.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 w-1.5 h-1.5 bg-background-primary rounded-full shrink-0" />
                A gel is applied to the skin and a probe is moved over the area
                being examined. The scan usually takes 15–30 minutes.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 w-1.5 h-1.5 bg-background-primary rounded-full shrink-0" />
                Female patients can request a female radiologist for pelvic,
                obstetric, and breast scans.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 w-1.5 h-1.5 bg-background-primary rounded-full shrink-0" />
                Reports are typically ready within 1–2 hours. Digital copies are
                available through our portal.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

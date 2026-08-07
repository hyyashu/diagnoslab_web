import Link from "next/link";
import { MapPin } from "lucide-react";
import data from "@/data/areasServed.json";

export default function AreasServed() {
  return (
    <section
      className="bg-gray-50 py-10 md:py-14 px-4 md:px-8 border-t border-gray-100"
      aria-labelledby="areas-served-heading"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-10">
          <h2
            id="areas-served-heading"
            className="font-heading text-2xl md:text-4xl font-extrabold text-black mb-3"
          >
            Areas We Serve in {data.city}
          </h2>
          <p className="font-body text-gray-700 text-sm md:text-lg max-w-3xl mx-auto leading-relaxed">
            {data.intro}
          </p>
        </div>

        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
          {data.areas.map((area) => (
            <li
              key={area.slug}
              className="bg-white rounded-xl border border-gray-100 shadow-sm hover:border-red-200 hover:shadow-md transition-all"
            >
              <Link
                href={`/area/${area.slug}`}
                className="flex items-center gap-2 px-3 py-3 md:px-4 md:py-3.5 w-full"
              >
                <MapPin
                  size={16}
                  className="text-background-primary shrink-0"
                  aria-hidden
                />
                <span className="font-body text-sm md:text-base font-semibold text-black">
                  {area.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="font-body text-center text-xs md:text-sm text-gray-600 mt-8 max-w-3xl mx-auto">
          Walk-in visits welcome at our Sakchi, Jugsalai, Adityapur centre. Home
          collection available across {data.city}.
        </p>
      </div>
    </section>
  );
}

import { ArrowUpRight, Clock3, MapPin, Navigation } from "lucide-react";
import MapEmbed from "@/components/sections/mapEmbed";
import { shell } from "@/components/ui/shell";
import { allCentres, sakchi } from "@/lib/centres";

/* DL.pen Contact Us "Centres": the three walk-in centres beside the map.
   The design's pinned map image is the live Sakchi map here. */
export default function VisitCentre() {
  return (
    <section aria-labelledby="centres-heading" className="bg-white py-10 md:py-[88px]">
      <div className={`${shell} grid gap-7 lg:grid-cols-[minmax(0,520px)_minmax(0,1fr)] lg:items-center lg:gap-14`}>
        <div className="flex flex-col gap-5 md:gap-7">
          <div className="flex flex-col gap-2 md:gap-2.5">
            <h2 id="centres-heading" className="font-display text-[24px] font-extrabold tracking-[-0.03em] text-dl-ink md:text-[36px]">
              Visit a centre
            </h2>
            <p className="text-sm leading-normal text-dl-ink-2 md:text-base">
              Walk in for a blood test, ultrasound, X-ray or ECG. No appointment needed for most tests.
            </p>
          </div>

          <ul className="flex flex-col divide-y divide-dl-line border-y border-dl-line">
            {allCentres.map((c, i) => (
              <li key={c.name} className="flex gap-4 py-5 md:gap-[18px] md:py-[22px]">
                <span
                  className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${
                    i === 0 ? "bg-dl-red text-white" : "bg-dl-red-soft text-dl-red"
                  }`}
                >
                  <MapPin className="size-5" aria-hidden />
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-1.5">
                  <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                    <span className="font-display text-[17px] font-bold text-dl-ink md:text-lg">{c.name.replace("Diagnos Lab, ", "")}</span>
                    <span
                      className={`rounded-full px-[9px] py-[3px] text-[11.5px] font-semibold ${
                        i === 0 ? "bg-dl-red-soft text-dl-red" : "bg-dl-bg text-dl-ink-2"
                      }`}
                    >
                      {c.tag}
                    </span>
                  </span>
                  <span className="text-[13.5px] leading-normal text-dl-ink-2 md:text-sm">{c.address}</span>
                  <span className="flex flex-wrap items-center gap-x-[18px] gap-y-1.5 pt-0.5">
                    <span className="flex items-center gap-1.5 text-[13px] text-dl-muted">
                      <Clock3 className="size-3.5" aria-hidden />
                      {c.hours}
                    </span>
                    <a
                      href={c.directionsHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[13px] font-semibold text-dl-red hover:underline"
                    >
                      Directions
                      <ArrowUpRight className="size-3.5" aria-hidden />
                    </a>
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative h-[280px] overflow-hidden rounded-[20px] border border-dl-line md:h-[580px] md:rounded-3xl">
          <MapEmbed title="Diagnos Lab, Sakchi on Google Maps" src={sakchi.mapSrc} />
          <a
            href={sakchi.directionsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-dl-ink px-[18px] py-3 text-[13.5px] font-semibold text-white shadow-lg hover:bg-black md:bottom-6 md:left-6"
          >
            <Navigation className="size-[15px]" aria-hidden />
            Open in Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}

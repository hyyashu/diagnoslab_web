import Image from "next/image";
import Link from "next/link";
import { Building2, Clock3, ExternalLink, Mail, MapPin, Navigation } from "lucide-react";
import MapEmbed from "@/components/sections/mapEmbed";
import { shell } from "@/components/ui/shell";
import { areas } from "@/lib/catalog";
import { ADDRESS_DISPLAY, DIRECTIONS_HREF, EMAIL, HOURS_DISPLAY, MAP_EMBED_SRC } from "@/lib/contact";

const facts = [
  { icon: Building2, label: "Walk-in centres", value: "Sakchi · Jugsalai · Adityapur" },
  { icon: Clock3, label: "Open every day", value: HOURS_DISPLAY },
  { icon: Mail, label: "Corporate desk", value: EMAIL, href: `mailto:${EMAIL}` },
];

/* DL.pen "Find Us" (home and corporate): the map beside a lab card
   (directions, centres, hours, corporate email) and the home collection
   areas. On phones the map tops the lab card. The about page's version
   ("muted", `staticMap`) sits on the grey background and shows the drawn
   route map with an "Open in Google Maps" link instead of the live embed. */
export default function FindUsAreas({
  bordered = false,
  tone = "white",
  staticMap = false,
}: {
  bordered?: boolean;
  tone?: "white" | "muted";
  staticMap?: boolean;
}) {
  const muted = tone === "muted";
  return (
    <section
      aria-labelledby="find-areas-heading"
      className={`${muted ? "bg-dl-bg" : "bg-white"} py-10 md:py-20 ${bordered ? "border-t border-dl-line" : ""}`}
    >
      <div className={`${shell} flex flex-col gap-5 md:gap-9`}>
        <div className="flex flex-col gap-1.5 md:gap-2">
          <p className="text-[11.5px] font-bold tracking-[0.11em] text-dl-red md:text-[12.5px]">FIND US</p>
          <h2 id="find-areas-heading" className="font-display text-2xl font-extrabold tracking-[-0.03em] text-dl-ink md:text-[38px]">
            <span className="md:hidden">Centres &amp; areas we serve</span>
            <span className="hidden md:inline">Centres &amp; areas we serve in Jamshedpur</span>
          </h2>
        </div>

        <div className="grid gap-3.5 md:grid-cols-[minmax(0,1fr)_minmax(0,636px)] md:gap-6">
          <div className="overflow-hidden rounded-[20px] border border-dl-line bg-white md:contents">
            <div
              className={`relative bg-dl-bg md:row-span-2 md:h-auto md:min-h-[440px] md:overflow-hidden md:rounded-[24px] md:border md:border-dl-line ${
                staticMap ? "h-[260px] bg-white" : "h-[170px]"
              }`}
            >
              {staticMap ? (
                <>
                  <Image
                    src="/images/map.avif"
                    alt="Route map to Diagnos Lab, Sakchi: near Sharda Mani School and Ambagan Ground"
                    fill
                    sizes="(min-width: 768px) 620px, 100vw"
                    className="object-contain p-3"
                  />
                  <a
                    href={DIRECTIONS_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-dl-ink px-3.5 py-2 text-[13px] font-semibold text-white hover:bg-black md:bottom-5 md:left-5"
                  >
                    <Navigation className="size-3.5" aria-hidden />
                    Open in Google Maps
                  </a>
                </>
              ) : (
                <MapEmbed title="Diagnos Lab on Google Maps" src={MAP_EMBED_SRC} />
              )}
            </div>

            <div className="flex flex-col gap-4 border-t border-dl-line p-[18px] md:gap-5 md:rounded-[24px] md:border md:p-7">
              <div className="flex items-center gap-3.5">
                <span className="hidden size-12 shrink-0 items-center justify-center rounded-full bg-dl-red text-white md:flex">
                  <MapPin className="size-5" aria-hidden />
                </span>
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="font-display text-lg font-extrabold text-dl-ink md:text-[22px]">Diagnos Lab</span>
                  <span className="text-[13px] text-dl-muted md:text-sm">{ADDRESS_DISPLAY}</span>
                </div>
                <a
                  href={DIRECTIONS_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 shrink-0 items-center gap-2 rounded-xl bg-dl-red px-3.5 text-sm font-semibold text-white transition-colors hover:bg-dl-red-dark md:h-11 md:px-4"
                >
                  <span className="md:hidden">Directions</span>
                  <span className="hidden md:inline">Get directions</span>
                  <ExternalLink className="size-4" aria-hidden />
                </a>
              </div>
              <ul className="flex flex-col gap-3 md:grid md:grid-cols-3 md:gap-4 md:border-t md:border-dl-line md:pt-5">
                {facts.map(({ icon: Icon, label, value, href }) => (
                  <li key={label} className="flex items-center gap-3 md:flex-col md:items-start md:gap-1.5">
                    <Icon className="size-[18px] shrink-0 text-dl-red" aria-hidden />
                    <span className="hidden text-xs text-dl-muted md:block">{label}</span>
                    {href ? (
                      <a href={href} className="text-sm font-semibold text-dl-ink hover:text-dl-red">
                        {value}
                      </a>
                    ) : (
                      <span className="text-sm font-semibold text-dl-ink">{value}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className={`flex flex-col gap-3.5 rounded-[20px] p-[18px] md:col-start-2 md:rounded-[24px] md:p-7 ${
              muted ? "border border-dl-line bg-white md:border-0 md:bg-transparent" : "bg-dl-bg"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-display text-base font-bold text-dl-ink md:text-lg">
                <span className="md:hidden">Home collection areas</span>
                <span className="hidden md:inline">Home collection across Jamshedpur</span>
              </h3>
              <span className="text-[13px] font-bold text-dl-red">{areas.length} areas</span>
            </div>
            <ul className="flex flex-wrap gap-2">
              {areas.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/area/${a.slug}/`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-dl-line bg-white px-3 py-1.5 text-[13px] font-medium text-dl-ink hover:border-dl-ink"
                  >
                    <MapPin className="size-3.5 text-dl-red" aria-hidden />
                    {a.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

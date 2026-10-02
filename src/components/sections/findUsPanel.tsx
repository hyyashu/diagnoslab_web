import Link from "next/link";
import { Clock3, ExternalLink, MapPin, Phone } from "lucide-react";
import MapEmbed from "@/components/sections/mapEmbed";
import { buttonClass } from "@/components/ui/button";
import { shell } from "@/components/ui/shell";
import { areas } from "@/lib/catalog";
import { ADDRESS_DISPLAY, DIRECTIONS_HREF, HOURS_DISPLAY, MAP_EMBED_SRC, PHONE_DISPLAY, PHONE_HREF } from "@/lib/contact";

type FindUsPanelProps = {
  tone?: "white" | "muted";
  title?: string;
  /* Phones get `mobileSubtitle` when set. */
  subtitle?: string;
  mobileSubtitle?: string;
  centre?: { title: string; text: string; directionsHref: string; mapSrc: string };
  areasHeading?: string;
  /* Highlights this area's chip (the area pages). */
  currentArea?: string;
};

const sakchi = { title: "Diagnos Lab", text: ADDRESS_DISPLAY, directionsHref: DIRECTIONS_HREF, mapSrc: MAP_EMBED_SRC };

/* DL.pen "Find Us": address, directions and the areas we collect from,
   beside the live map (which loads only when scrolled near). */
export default function FindUsPanel({
  tone = "white",
  title = "Find us",
  subtitle = "Walk-in visits welcome at our Sakchi, Jugsalai and Adityapur centres.",
  mobileSubtitle = "Walk-ins welcome at our Sakchi, Jugsalai and Adityapur centres.",
  centre = sakchi,
  areasHeading = "HOME COLLECTION ACROSS JAMSHEDPUR",
  currentArea,
}: FindUsPanelProps) {
  const details = [
    { icon: MapPin, title: centre.title, text: centre.text },
    { icon: Clock3, title: "Open every day", text: HOURS_DISPLAY },
    { icon: Phone, title: "Call or WhatsApp", text: PHONE_DISPLAY, href: PHONE_HREF },
  ];

  return (
    <section aria-labelledby="find-us-heading" className={`${tone === "muted" ? "bg-dl-bg" : "bg-white"} py-10 md:py-24`}>
      <div className={`${shell} grid gap-5 md:grid-cols-[minmax(0,400px)_minmax(0,1fr)] md:gap-12 xl:grid-cols-[440px_minmax(0,1fr)]`}>
        <div className="flex flex-col gap-1.5 md:gap-3">
          <h2 id="find-us-heading" className="font-display text-[21px] font-extrabold tracking-[-0.03em] text-dl-ink md:text-[38px]">
            {title}
          </h2>
          <p className="text-[13px] leading-normal text-dl-ink-2 md:text-[15px]">
            <span className="md:hidden">{mobileSubtitle}</span>
            <span className="hidden md:inline">{subtitle}</span>
          </p>
        </div>

        <div className="h-[200px] overflow-hidden rounded-[20px] border border-dl-line md:col-start-2 md:row-span-2 md:row-start-1 md:h-full md:min-h-[480px] md:rounded-3xl">
          <MapEmbed title={`${centre.title} on Google Maps`} src={centre.mapSrc} />
        </div>

        <div className="flex flex-col gap-5 md:gap-7">
          <ul className="flex flex-col gap-3.5 md:gap-4">
            {details.map(({ icon: Icon, title, text, href }) => (
              <li key={title} className="flex items-center gap-3.5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-dl-red-soft text-dl-red md:size-11">
                  <Icon className="size-[18px]" aria-hidden />
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-bold text-dl-ink md:text-[15px]">{title}</span>
                  {href ? (
                    <a href={href} className="text-[12.5px] text-dl-ink-2 hover:text-dl-ink md:text-[13.5px]">{text}</a>
                  ) : (
                    <span className="text-[12.5px] text-dl-ink-2 md:text-[13.5px]">{text}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>

          <a href={centre.directionsHref} target="_blank" rel="noopener noreferrer" className={buttonClass("primary", "md", "w-full md:w-fit")}>
            Get directions
            <ExternalLink className="size-4" aria-hidden />
          </a>

          <div className="flex flex-col gap-3">
            <p className="text-[10.5px] font-bold tracking-[0.14em] text-dl-muted md:text-[11px]">{areasHeading}</p>
            <ul className="flex flex-wrap gap-2">
              {areas.map((a) => {
                const current = a.slug === currentArea;
                return (
                  <li key={a.slug}>
                    <Link
                      href={`/area/${a.slug}/`}
                      aria-current={current ? "page" : undefined}
                      className={`block rounded-full border px-3 py-1.5 text-xs ${
                        current
                          ? "border-dl-red bg-dl-red font-bold text-white"
                          : "border-dl-line bg-white font-medium text-dl-ink-2 hover:border-dl-ink hover:text-dl-ink"
                      }`}
                    >
                      {a.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { shell } from "@/components/ui/shell";
import { areas } from "@/lib/catalog";
import { allCentres } from "@/lib/centres";
import { HOURS_DISPLAY } from "@/lib/contact";

/* DL.pen "Coverage": the home collection areas beside the three walk-in
   centres. */
const servedAreas = areas.map((a) => ({ name: a.name, slug: a.slug as string | null }));

export default function Coverage() {
  const chip = "inline-flex items-center gap-1.5 rounded-full border border-dl-line bg-dl-bg px-3.5 py-2 text-[13.5px] font-medium text-dl-ink";

  return (
    <section aria-labelledby="coverage-heading" className="bg-white py-10 md:py-[72px]">
      <div className={`${shell} grid gap-8 lg:grid-cols-[minmax(0,1fr)_460px] lg:gap-16`}>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-bold tracking-[0.12em] text-dl-red">HOME COLLECTION</p>
            <h2 id="coverage-heading" className="font-display text-[22px] font-extrabold tracking-[-0.02em] text-dl-ink md:text-[30px]">
              We come to you, anywhere in Jamshedpur
            </h2>
            <p className="max-w-[560px] text-[13.5px] leading-normal text-dl-muted md:text-[15px]">
              Trained phlebotomists, sealed kits, and slots from 6 AM. Don&apos;t see your area? Call us, we likely cover it.
            </p>
          </div>
          <ul className="flex flex-wrap gap-2.5">
            {servedAreas.map(({ name, slug }) => (
              <li key={name}>
                {slug ? (
                  <Link href={`/area/${slug}/`} className={`${chip} hover:border-dl-ink`}>
                    <MapPin className="size-[13px] text-dl-red" aria-hidden />
                    {name}
                  </Link>
                ) : (
                  <span className={chip}>
                    <MapPin className="size-[13px] text-dl-red" aria-hidden />
                    {name}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3 rounded-3xl border border-dl-line bg-dl-bg p-5 md:p-6">
          <h3 className="font-display text-lg font-extrabold text-dl-ink">Prefer to walk in?</h3>
          <p className="text-[13.5px] text-dl-ink-2">Visit any of our 3 centres · {HOURS_DISPLAY}</p>
          <ul className="flex flex-col gap-3 pt-1">
            {allCentres.map((c) => (
              <li key={c.name} className="flex items-center gap-3.5 rounded-2xl border border-dl-line bg-white p-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-dl-red-soft text-dl-red">
                  <MapPin className="size-[18px]" aria-hidden />
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="text-[14.5px] font-bold text-dl-ink">{c.name}</span>
                  <span className="text-[12.5px] text-dl-muted">{c.shortAddress}</span>
                </span>
                <a
                  href={c.directionsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-1 text-[13px] font-bold text-dl-red hover:underline"
                >
                  Directions
                  <ArrowUpRight className="size-3.5" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

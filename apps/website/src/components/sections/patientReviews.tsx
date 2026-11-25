import { Star } from "lucide-react";
import SectionHead from "@/components/ui/sectionHead";
import GoogleReviewsWidget from "@/components/sections/googleReviewsWidget";
import { GOOGLE_REVIEWS_HREF } from "@/lib/contact";
import { shell } from "@/components/ui/shell";

/* DL.pen "Reviews": the heading and rating badge, with live Google
   reviews from the SociableKit widget. */
export default function PatientReviews({
  tone = "muted",
  subtitle = "Real reviews from Google",
}: {
  tone?: "white" | "muted";
  subtitle?: string;
}) {
  const badge = (
    <a
      href={GOOGLE_REVIEWS_HREF}
      target="_blank"
      rel="noopener noreferrer"
      className="flex shrink-0 flex-col items-end gap-0.5 md:flex-row md:items-center md:gap-3.5 md:rounded-[20px] md:border md:border-dl-line md:bg-white md:px-[22px] md:py-4"
    >
      <span className="flex items-center gap-[5px]">
        <Star className="size-4 text-dl-star md:hidden" fill="currentColor" aria-hidden />
        <span className="font-display text-[22px] font-extrabold text-dl-ink md:text-[40px] md:tracking-[-0.04em]">4.9</span>
        <span className="sr-only"> out of 5 from</span>
      </span>
      <span className="flex flex-col gap-1">
        <span className="hidden gap-[3px] text-dl-star md:flex" aria-hidden>
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} className="size-4" fill="currentColor" />
          ))}
        </span>
        <span className="text-[11.5px] text-dl-muted md:text-[13px] md:text-dl-ink-2">
          <span className="md:hidden">2,700+ reviews</span>
          <span className="sr-only md:hidden"> on Google</span>
          <span className="hidden md:inline">2,700+ Google reviews</span>
        </span>
      </span>
    </a>
  );

  return (
    <section aria-labelledby="reviews-heading" className={`${tone === "muted" ? "bg-dl-bg" : "bg-white"} py-10 md:py-24`}>
      <div className="flex flex-col gap-5 md:gap-10">
        <div className={shell}>
          <SectionHead id="reviews-heading" title="What our patients say" subtitle={subtitle} aside={badge} />
        </div>
        {/* On phones the widget stacks every review (about 4,000px), so it
            is cut to a few with a fade and a link to the rest on Google. */}
        <div className={`${shell} flex flex-col items-center gap-4`}>
          <div className="w-full max-md:max-h-[880px] max-md:overflow-hidden max-md:[mask-image:linear-gradient(to_bottom,black_80%,transparent)]">
            <GoogleReviewsWidget />
          </div>
          <a
            href={GOOGLE_REVIEWS_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-dl-line bg-white px-5 py-2.5 text-sm font-bold text-dl-ink hover:border-dl-ink md:hidden"
          >
            Read all reviews on Google
          </a>
        </div>
      </div>
    </section>
  );
}

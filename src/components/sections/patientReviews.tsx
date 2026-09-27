import { Star } from "lucide-react";
import SectionHead from "@/components/ui/sectionHead";
import GoogleReviewCard from "@/components/cards/googleReviewCard";
import { featuredReviewers } from "@/components/home/content";
import { reviews } from "@/lib/catalog";
import { GOOGLE_REVIEWS_HREF } from "@/lib/contact";
import { shell } from "@/components/ui/shell";

/* DL.pen "Reviews". Four on desktop; a sideways scroller on phones. */
export default function PatientReviews({ tone = "muted" }: { tone?: "white" | "muted" }) {
  const featured = featuredReviewers
    .map((name) => reviews.find((r) => r.authorName === name))
    .filter((r) => r !== undefined);

  const badge = (
    <a
      href={GOOGLE_REVIEWS_HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="4.9 out of 5 from 3,000+ Google reviews"
      className="flex shrink-0 flex-col items-end gap-0.5 md:flex-row md:items-center md:gap-3.5 md:rounded-[20px] md:border md:border-dl-line md:bg-white md:px-[22px] md:py-4"
    >
      <span className="flex items-center gap-[5px]">
        <Star className="size-4 text-dl-star md:hidden" fill="currentColor" aria-hidden />
        <span className="font-display text-[22px] font-extrabold text-dl-ink md:text-[40px] md:tracking-[-0.04em]">4.9</span>
      </span>
      <span className="flex flex-col gap-1">
        <span className="hidden gap-[3px] text-dl-star md:flex" aria-hidden>
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} className="size-4" fill="currentColor" />
          ))}
        </span>
        <span className="text-[11.5px] text-dl-muted md:text-[13px] md:text-dl-ink-2">
          <span className="md:hidden">3,000+ reviews</span>
          <span className="hidden md:inline">3,000+ Google reviews</span>
        </span>
      </span>
    </a>
  );

  return (
    <section aria-labelledby="reviews-heading" className={`${tone === "muted" ? "bg-dl-bg" : "bg-white"} py-10 md:py-24`}>
      <div className="flex flex-col gap-5 md:gap-10">
        <div className={shell}>
          <SectionHead id="reviews-heading" title="What our patients say" subtitle="Real reviews from Google" aside={badge} />
        </div>
        <div className={`${shell} max-md:px-0`}>
          <ul className="no-scrollbar flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 lg:grid-cols-4">
            {featured.map((r, i) => (
              <li key={r.authorName} className={`w-[290px] shrink-0 snap-start md:w-auto ${i === 3 ? "max-md:hidden" : ""}`}>
                <GoogleReviewCard author={r.authorName} rating={r.rating} time={r.date} text={r.text} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

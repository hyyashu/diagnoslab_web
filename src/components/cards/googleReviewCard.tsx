import { Star } from "lucide-react";

/* DL.pen "Review Card". */
type GoogleReviewCardProps = {
  author: string;
  rating: number;
  time: string;
  text: string;
};

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join("");

export default function GoogleReviewCard({ author, rating, time, text }: GoogleReviewCardProps) {
  return (
    <figure className="flex h-full flex-col gap-4 md:gap-5 rounded-[20px] border border-dl-line bg-white p-[22px] md:p-[26px]">
      <div className="flex gap-[3px] text-dl-star" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: rating }, (_, i) => (
          <Star key={i} className="size-[15px]" fill="currentColor" aria-hidden />
        ))}
      </div>

      <blockquote className="line-clamp-5 text-sm md:text-[15px] leading-relaxed text-dl-ink">
        {text}
      </blockquote>

      <figcaption className="mt-auto flex items-center gap-3 border-t border-dl-line pt-[18px]">
        <span
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-dl-red-soft text-[13px] font-bold text-dl-red"
          aria-hidden
        >
          {initials(author)}
        </span>
        <span className="flex flex-col gap-0.5">
          <span className="text-sm font-semibold capitalize text-dl-ink">{author}</span>
          <span className="text-[12.5px] text-dl-muted">{time}</span>
        </span>
      </figcaption>
    </figure>
  );
}

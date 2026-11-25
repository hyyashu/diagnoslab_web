import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Responsive from "@/components/ui/responsive";

/* DL.pen "Section Head": optional eyebrow, title, subtitle and a
   "see all" link with a ringed arrow. The design words some headings
   differently on phones, hence the mobile* overrides. */
type SectionHeadProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  mobileTitle?: string;
  subtitle?: string;
  /* null hides the subtitle on phones; undefined reuses `subtitle`. */
  mobileSubtitle?: string | null;
  link?: { href: string; label: string; mobileLabel?: string; desktopOnly?: boolean };
  tone?: "light" | "dark";
  aside?: React.ReactNode;
};

export default function SectionHead({
  id,
  eyebrow,
  title,
  mobileTitle,
  subtitle,
  mobileSubtitle,
  link,
  tone = "light",
  aside,
}: SectionHeadProps) {
  const dark = tone === "dark";

  return (
    <div className="flex items-end justify-between gap-3 md:gap-10">
      <div className="flex min-w-0 flex-col gap-1.5 md:gap-3">
        {eyebrow && (
          <p className="hidden md:flex items-center gap-2.5 text-xs font-bold tracking-[0.13em] text-dl-red">
            <span className="h-0.5 w-5 bg-dl-red" aria-hidden />
            {eyebrow}
          </p>
        )}
        <h2
          id={id}
          className={`font-display text-[22px] md:text-[38px] font-extrabold leading-[1.15] md:leading-[1.1] tracking-[-0.03em] md:max-w-[720px] ${
            dark ? "text-white" : "text-dl-ink"
          }`}
        >
          <Responsive desktop={title} mobile={mobileTitle} />
        </h2>
        {subtitle && (
          <p
            className={`${mobileSubtitle === null ? "hidden md:block" : ""} text-[13.5px] md:text-base leading-normal md:max-w-[640px] ${
              dark ? "text-white/[0.88]" : "text-dl-ink-2"
            }`}
          >
            <Responsive desktop={subtitle} mobile={mobileSubtitle ?? undefined} />
          </p>
        )}
      </div>

      {aside}

      {link && (
        <Link
          href={link.href}
          className={`group ${link.desktopOnly ? "hidden md:flex" : "flex"} shrink-0 items-center gap-2 md:gap-3 text-[13.5px] md:text-[15px] font-semibold ${
            dark ? "text-white" : "text-dl-ink"
          }`}
        >
          <Responsive desktop={link.label} mobile={link.mobileLabel} />
          <span
            className={`flex size-7 md:size-10 items-center justify-center rounded-full border-[1.25px] md:border-[1.5px] transition-colors ${
              dark
                ? "border-white group-hover:bg-white group-hover:text-dl-ink"
                : "border-dl-ink group-hover:bg-dl-ink group-hover:text-white"
            }`}
          >
            <ArrowRight className="size-3.5 md:size-4" aria-hidden />
          </span>
        </Link>
      )}
    </div>
  );
}

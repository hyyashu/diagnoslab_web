import Link from "next/link";
import { Plus } from "lucide-react";

type LogoProps = {
  /* "dark" is for use on the ink footer: white mark, red cross. */
  tone?: "light" | "dark";
  showTagline?: boolean;
  className?: string;
};

export default function Logo({
  tone = "light",
  showTagline = true,
  className = "",
}: LogoProps) {
  const dark = tone === "dark";

  return (
    <Link
      href="/"
      aria-label="Diagnos Lab home"
      className={`inline-flex items-center gap-2.5 ${className}`}
    >
      <span
        className={`flex size-8 md:size-[38px] shrink-0 items-center justify-center rounded-[9px] md:rounded-[11px] ${
          dark ? "bg-white text-dl-red" : "bg-dl-red text-white"
        }`}
      >
        <Plus className="size-[18px] md:size-[22px]" strokeWidth={3} aria-hidden />
      </span>
      <span className="flex flex-col gap-px">
        <span
          className={`font-display text-[17px] md:text-xl font-extrabold leading-tight tracking-[-0.03em] ${
            dark ? "text-white" : "text-dl-ink"
          }`}
        >
          Diagnos Lab
        </span>
        {showTagline && (
          <span className="text-[8px] md:text-[9.5px] font-semibold tracking-[0.12em] text-dl-muted">
            JAMSHEDPUR · SINCE 2010
          </span>
        )}
      </span>
    </Link>
  );
}

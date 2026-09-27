import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  /* "dark" is for the ink footer: the logo's grey wordmark needs a white
     tile behind it there. */
  tone?: "light" | "dark";
  priority?: boolean;
  className?: string;
};

/* The brand logo. diagnoslogo.avif is a 400x400 canvas with the artwork in
   its middle band (about 380x190), so the box is 2:1 and object-cover crops
   the empty top and bottom away. */
export default function Logo({ tone = "light", priority = false, className = "" }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Diagnos Lab home"
      className={`inline-flex shrink-0 ${tone === "dark" ? "rounded-xl bg-white px-3 py-2" : ""} ${className}`}
    >
      <Image
        src="/images/diagnoslogo.avif"
        alt="Diagnos Lab"
        width={400}
        height={400}
        priority={priority}
        className="h-11 w-[88px] object-cover md:h-14 md:w-28"
      />
    </Link>
  );
}

"use client";

/* The offer photo, the home page's LCP image. It is a client component on
   purpose: a high-priority <img> in a server component also becomes a
   preload hint in the home page's prefetch payload, so every page whose
   header links home would download this photo at high priority. Rendered
   here, the preload is only in the home page's own HTML. */
export default function HeroImage() {
  return (
    <img
      src="/images/hero/hero1-mobile.avif"
      alt="Pathologist examining a sample at Diagnos Lab, Jamshedpur"
      width={720}
      height={1028}
      fetchPriority="high"
      decoding="async"
      className="absolute inset-0 -z-10 size-full object-cover object-[center_25%]"
    />
  );
}

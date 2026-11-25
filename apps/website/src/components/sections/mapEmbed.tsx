"use client";

import { useEffect, useRef, useState } from "react";

/* The Google Maps embed pulls ~450 KB of script and ~370 ms of main-thread
   work. It sits in the site layout, so it was paid on every page even when
   nobody scrolled to it. The iframe is now inserted only after the page has
   finished loading AND the map is within 300px of the viewport; until then
   the box keeps its size so nothing shifts. */
export default function MapEmbed({ src, title }: { src: string; title: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let observer: IntersectionObserver | undefined;

    const watch = () => {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            setShow(true);
            observer?.disconnect();
          }
        },
        { rootMargin: "300px" },
      );
      observer.observe(el);
    };

    if (document.readyState === "complete") watch();
    else window.addEventListener("load", watch, { once: true });

    return () => {
      window.removeEventListener("load", watch);
      observer?.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className="w-full h-full bg-dl-bg">
      {show && (
        <iframe
          src={src}
          title={title}
          className="w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      )}
    </div>
  );
}

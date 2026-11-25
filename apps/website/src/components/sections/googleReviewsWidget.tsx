"use client";

import { useEffect, useRef } from "react";

const SRC = "https://widgets.sociablekit.com/google-reviews/widget.js";

/* The widget draws into its own shadow root, so page CSS can't reach it.
   This is added inside: it drops the two "Write a review" boxes (visitors
   come to read reviews, not write them) and lets each card fit its text
   instead of a fixed 400px, so the first reviews show straight away. */
const OVERRIDES = `
.sk-profile, .sk-grid-item--badge, .sk-follow-button, .sk-badge__write { display: none !important; }
.sk-grid { grid-auto-rows: auto !important; grid-template-rows: none !important; }
.sk-grid-item, .sk-grid-item .sk-card { height: auto !important; min-height: 0 !important; }
.sk-card { padding: 16px 18px !important; gap: 10px !important; }
.sk-card__text, .sk-card__text * { font-size: 14px !important; line-height: 1.5 !important; }
.sk-card__name, .sk-card__name-row { font-size: 15px !important; }
.sk-card__date, .sk-card__source-label { font-size: 12.5px !important; }
.sk-card__avatar { width: 36px !important; height: 36px !important; }
.sk-star-icon, .sk-star-icon svg { width: 15px !important; height: 15px !important; }
@media (max-width: 767px) {
  .sk-card__share { display: none !important; }
}`;

/* SociableKit Google reviews widget (embed 25731696). The script fills
   every .sk-ww-google-reviews div it finds when it runs, so it is added
   again on each mount: a page reached by client-side navigation gets its
   widget too, not only the first page loaded. */
export default function GoogleReviewsWidget() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = SRC;
    script.defer = true;
    document.body.appendChild(script);

    /* The shadow root appears once the script has loaded, and the widget
       may redraw it, so keep checking that the overrides are in place. */
    let tries = 0;
    const timer = window.setInterval(() => {
      /* The widget sets its own 24px inner padding inline; phones need
         the width for the reviews. */
      if (window.matchMedia("(max-width: 767px)").matches) ref.current?.style.setProperty("--widget-padding", "10px");
      const root = ref.current?.shadowRoot;
      if (root && !root.querySelector("style[data-dl]")) {
        const style = document.createElement("style");
        style.dataset.dl = "";
        style.textContent = OVERRIDES;
        root.appendChild(style);
      }
      if (++tries > 60) window.clearInterval(timer);
    }, 500);

    return () => {
      window.clearInterval(timer);
      script.remove();
    };
  }, []);

  return <div ref={ref} className="sk-ww-google-reviews min-h-[320px]" data-embed-id="25731696" />;
}

"use client";

import { useEffect } from "react";

const SRC = "https://widgets.sociablekit.com/google-reviews/widget.js";

/* SociableKit Google reviews widget (embed 25731696). The script fills
   every .sk-ww-google-reviews div it finds when it runs, so it is added
   again on each mount: a page reached by client-side navigation gets its
   widget too, not only the first page loaded. */
export default function GoogleReviewsWidget() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = SRC;
    script.defer = true;
    document.body.appendChild(script);
    return () => script.remove();
  }, []);

  return <div className="sk-ww-google-reviews min-h-[320px]" data-embed-id="25731696" />;
}

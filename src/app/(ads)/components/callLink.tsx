"use client";

import React from "react";
import { Phone } from "lucide-react";
import { trackCall } from "@/lib/gtag";

const PHONE = "8404802201";

/* Every call-to-action on a paid page dials the same number and reports
   the same conversion, so the click is attributable whichever one is used. */
export default function CallLink({
  children,
  className = "",
  showIcon = true,
}: {
  children?: React.ReactNode;
  className?: string;
  showIcon?: boolean;
}) {
  return (
    <a
      href={`tel:${PHONE}`}
      onClick={trackCall}
      className={className}
      data-testid="call-cta"
    >
      {showIcon && <Phone className="h-5 w-5 shrink-0" aria-hidden="true" />}
      {children ?? `Call ${PHONE}`}
    </a>
  );
}

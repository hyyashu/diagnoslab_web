"use client";

import { useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import type { LeadFormProps } from "@/components/forms/leadForm";

/* The only client-side part of a card. The lead form is mounted when the
   button is pressed rather than once per card, so a page of 100 cards no
   longer runs 100 closed forms' hooks on load. Its code is fetched on first
   hover/touch/focus, so it is usually ready before the click lands. */
const loadLeadForm = () => import("@/components/forms/leadForm");
const LeadForm = dynamic(loadLeadForm, { ssr: false });

type BookButtonProps = {
  children: ReactNode;
  className?: string;
  form: Omit<LeadFormProps, "open" | "onOpenChange">;
};

export default function BookButton({ children, className, form }: BookButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        onPointerEnter={loadLeadForm}
        onTouchStart={loadLeadForm}
        onFocus={loadLeadForm}
        className={className}
      >
        {children}
      </button>
      {open && <LeadForm {...form} open onOpenChange={setOpen} />}
    </>
  );
}

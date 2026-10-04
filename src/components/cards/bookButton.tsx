"use client";

import { useState, type ReactNode } from "react";
import dynamic from "next/dynamic";

/* The only client-side part of a card. The contact sheet is mounted when
   the button is pressed rather than once per card, so a page of 100 cards
   doesn't run 100 closed forms' hooks on load. Its code is fetched on first
   hover/touch/focus, so it is usually ready before the click lands. */
const loadSheet = () => import("@/components/forms/contactSheet");
const ContactSheet = dynamic(loadSheet, { ssr: false });

/* What the card is booking; shown in the sheet and sent with the lead. */
type BookForm = {
  testName?: string;
  testPrice?: number;
  testOriginalPrice?: number;
  additionalSourceData?: Record<string, unknown>;
};

type BookButtonProps = {
  children: ReactNode;
  className?: string;
  form: BookForm;
};

export default function BookButton({ children, className, form }: BookButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        onPointerEnter={loadSheet}
        onTouchStart={loadSheet}
        onFocus={loadSheet}
        className={className}
      >
        {children}
      </button>
      {open && (
        <ContactSheet
          isOpen
          onClose={() => setOpen(false)}
          topic="Book a test"
          item={
            form.testName
              ? { name: form.testName, price: form.testPrice, originalPrice: form.testOriginalPrice }
              : undefined
          }
          sourceData={form.additionalSourceData}
        />
      )}
    </>
  );
}

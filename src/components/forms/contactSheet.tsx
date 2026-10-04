"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight, Check, MessageCircle, Phone, UserRound, X } from "lucide-react";
import { FieldError, leadIntent, topicValue, useLeadForm } from "@/components/forms/useLeadForm";
import { PHONE_HREF, WHATSAPP_HREF } from "@/lib/contact";
import { rupees } from "@/lib/format";

export const contactTopics = ["Book a test", "Home collection", "Reports", "Radiology", "Something else"] as const;
export type ContactTopic = (typeof contactTopics)[number];

type ContactSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  /* The chip selected when the sheet opens. */
  topic?: ContactTopic;
  /* Set by the Book buttons: the test or package being booked, shown at
     the top, and the card's lead metadata. */
  item?: { name: string; price?: number; originalPrice?: number };
  sourceData?: Record<string, unknown>;
};

type SheetProps = Required<Pick<ContactSheetProps, "onClose">> & {
  initialTopic: ContactTopic;
  item?: ContactSheetProps["item"];
  sourceData?: ContactSheetProps["sourceData"];
};

/* DL.pen "Contact Pop-up (Mobile)": a bottom sheet with call / WhatsApp
   shortcuts and a callback form. On desktop the same content sits in a
   centred card. The topic travels in `source`, like the radiology
   form's service. */
export default function ContactSheet({ isOpen, onClose, topic: initialTopic = "Book a test", item, sourceData }: ContactSheetProps) {
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center md:items-center md:p-6">
      <div
        className="animate-fade-in absolute inset-0 bg-dl-ink/55 backdrop-blur-[4px]"
        onClick={onClose}
        aria-hidden
      />
      {/* Remounted on every open, so each visit starts with a clean form. */}
      <Sheet onClose={onClose} initialTopic={initialTopic} item={item} sourceData={sourceData} />
    </div>
  );
}

function Sheet({ onClose, initialTopic, item, sourceData }: SheetProps) {
  const titleId = useId();
  const nameRef = useRef<HTMLInputElement>(null);
  const [topic, setTopic] = useState<ContactTopic>(initialTopic);
  const { nameInput, phoneInput, nameError, phoneError, submitting, submitted, error, handleSubmit } = useLeadForm();

  useEffect(() => {
    nameRef.current?.focus({ preventScroll: true });
  }, []);

  const homeCollection = topic === "Home collection";
  const onSubmit = handleSubmit(() => ({
    source: { ...sourceData, contact_topic: topicValue(topic) },
    intent: leadIntent({ homeCollection, booking: !!item }),
  }));

  const input =
    "flex h-11 items-center gap-2.5 rounded-xl border border-dl-line bg-white px-3.5 transition focus-within:border-[1.5px] focus-within:border-dl-red focus-within:shadow-[0_4px_14px_rgba(217,45,39,0.2)]";
  const label = "flex gap-[3px] text-[13px] font-semibold text-dl-ink";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="animate-sheet-up md:animate-fade-in relative flex w-full flex-col gap-3.5 rounded-t-[26px] bg-white px-5 pt-2.5 shadow-[0_-10px_40px_rgba(22,24,29,0.2)] md:max-w-[440px] md:rounded-[26px] md:p-7 md:shadow-[0_20px_60px_rgba(22,24,29,0.25)]"
      style={{ paddingBottom: "calc(1.5rem + env(safe-area-inset-bottom, 0px))" }}
    >
      <div className="flex justify-center md:hidden" aria-hidden>
        <span className="h-[5px] w-10 rounded-full bg-dl-line" />
      </div>

      <div className="flex items-center gap-3">
        <h2 id={titleId} className="flex-1 font-display text-[22px] font-extrabold tracking-[-0.02em] text-dl-ink">
          {item ? "Book now" : "Contact us"}
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex size-9 shrink-0 items-center justify-center rounded-full border border-dl-line bg-dl-bg text-dl-ink-2 hover:text-dl-ink"
        >
          <X className="size-4" aria-hidden />
        </button>
      </div>

      {item && (
        <div className="flex items-center justify-between gap-3 rounded-xl bg-dl-bg px-3.5 py-2.5">
          <span className="text-[14.5px] font-bold leading-snug text-dl-ink">{item.name}</span>
          {typeof item.price === "number" && item.price > 0 && (
            <span className="flex shrink-0 items-baseline gap-1.5">
              <span className="font-display text-[17px] font-extrabold text-dl-ink">{rupees(item.price)}</span>
              {item.originalPrice && item.originalPrice > item.price ? (
                <s className="text-xs text-dl-muted">{rupees(item.originalPrice)}</s>
              ) : null}
            </span>
          )}
        </div>
      )}

      <div className="grid grid-cols-2 gap-2.5">
        <a
          href={PHONE_HREF}
          className="flex h-[46px] items-center justify-center gap-2 rounded-xl border border-dl-red/20 bg-dl-red-soft text-[14.5px] font-bold text-dl-red"
        >
          <Phone className="size-[17px]" aria-hidden />
          Call now
        </a>
        <a
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-[46px] items-center justify-center gap-2 rounded-xl border border-dl-green/20 bg-dl-green/[0.08] text-[14.5px] font-bold text-dl-green"
        >
          <MessageCircle className="size-[17px]" aria-hidden />
          WhatsApp
        </a>
      </div>

      <div className="flex items-center gap-3" aria-hidden>
        <span className="h-px flex-1 bg-dl-line" />
        <span className="text-xs font-medium text-dl-muted">or request a callback</span>
        <span className="h-px flex-1 bg-dl-line" />
      </div>

      {submitted ? (
        <div className="flex flex-col items-center gap-3 py-8 text-center" role="status">
          <span className="flex size-12 items-center justify-center rounded-full bg-dl-green/10 text-dl-green">
            <Check className="size-6" aria-hidden />
          </span>
          <p className="font-display text-lg font-extrabold text-dl-ink">Thank you!</p>
          <p className="text-sm text-dl-ink-2">Our team will call you back shortly.</p>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3.5">
          <div className="flex flex-col gap-3">
            <label className="flex flex-col gap-1.5">
              <span className={label}>
                Full name <span className="font-bold text-dl-red" aria-hidden>*</span>
              </span>
              <span className={input}>
                <UserRound className="size-[18px] shrink-0 text-dl-red" aria-hidden />
                <input
                  ref={nameRef}
                  {...nameInput}
                  required
                  placeholder="Your full name"
                  className="min-w-0 flex-1 bg-transparent text-[15px] font-medium text-dl-ink outline-none placeholder:font-normal placeholder:text-dl-muted"
                />
              </span>
              <FieldError message={nameError} />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className={label}>
                Mobile number <span className="font-bold text-dl-red" aria-hidden>*</span>
              </span>
              <span className={input}>
                <span className="text-[15px] font-semibold text-dl-ink">+91</span>
                <span className="h-[22px] w-px bg-dl-line" aria-hidden />
                <input
                  {...phoneInput}
                  required
                  placeholder="98765 43210"
                  className="min-w-0 flex-1 bg-transparent text-[15px] font-medium text-dl-ink outline-none placeholder:font-normal placeholder:text-dl-muted"
                />
              </span>
              <FieldError message={phoneError} />
            </label>

            {!item && (
              <fieldset className="flex flex-col">
                <legend className="mb-2 text-[13px] font-semibold text-dl-ink">What can we help with?</legend>
                <div className="flex flex-wrap gap-2">
                  {contactTopics.map((t) => {
                    const on = t === topic;
                    return (
                      <button
                        key={t}
                        type="button"
                        aria-pressed={on}
                        onClick={() => setTopic(t)}
                        className={`inline-flex items-center gap-[5px] rounded-full py-2 text-[13px] ${
                          on
                            ? "border-[1.5px] border-dl-red bg-dl-red-soft pl-[11px] pr-[13px] font-bold text-dl-red"
                            : "border border-dl-line bg-white px-3.5 font-medium text-dl-ink-2 hover:border-dl-ink-2"
                        }`}
                      >
                        {on && <Check className="size-3.5" aria-hidden />}
                        {t}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            )}
          </div>

          {error && (
            <p className="-mt-2 text-sm font-semibold text-dl-red" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="flex h-[52px] items-center justify-center gap-2 rounded-[14px] bg-dl-red text-base font-semibold text-white shadow-[0_8px_20px_rgba(217,45,39,0.25)] transition-colors hover:bg-dl-red-dark active:scale-[0.99] disabled:opacity-60"
          >
            {submitting ? "Sending…" : "Request callback"}
            {!submitting && <ArrowRight className="size-[18px]" aria-hidden />}
          </button>
        </form>
      )}
    </div>
  );
}

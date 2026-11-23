"use client";

import { useEffect, useId, useState, type ReactNode } from "react";
import { ArrowRight, ChevronDown, ListChecks, MessageCircle, MessageSquareText, Minus, PhoneCall, Plus, UserRound } from "lucide-react";
import ContactSheet from "@/components/forms/contactSheet";
import { FieldError, leadIntent, topicValue, useLeadForm } from "@/components/forms/useLeadForm";
import { WHATSAPP_HREF } from "@/lib/contact";
import type { FaqItem } from "@/lib/faq";
import { rupees } from "@/lib/format";

/* The interactive parts of the test and package detail pages. Everything
   here gets plain data from the server page; icons are rendered there. */

export type BookingItem = {
  name: string;
  price: number;
  originalPrice: number;
  /* The lead metadata the package cards send. */
  sourceData: Record<string, unknown>;
};

/* Phones show the first few profiles and a "Show all" toggle; desktop
   always shows every profile in two columns. */
export function ProfileList({ items, toggleLabel, initial = 6 }: { items: ReactNode[]; toggleLabel: string; initial?: number }) {
  const [all, setAll] = useState(false);
  return (
    <>
      <ul className="grid grid-cols-[minmax(0,1fr)] gap-2.5 md:grid-cols-2">
        {items.map((item, i) => (
          <li key={i} className={`min-w-0 ${!all && i >= initial ? "hidden md:block" : ""}`}>
            {item}
          </li>
        ))}
      </ul>
      {items.length > initial && (
        <button
          type="button"
          onClick={() => setAll((v) => !v)}
          aria-expanded={all}
          className="flex h-[46px] items-center justify-center gap-2 rounded-xl border border-dl-line text-sm font-bold text-dl-red md:hidden"
        >
          {all ? "Show fewer" : toggleLabel}
          <ChevronDown className={`size-4 transition-transform ${all ? "rotate-180" : ""}`} aria-hidden />
        </button>
      )}
    </>
  );
}

export function DetailFaq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <ul>
      {items.map((item, i) => {
        const on = open === i;
        return (
          <li key={item.question} className="border-b border-dl-line py-4 last:border-b-0 md:py-[18px]">
            <button
              type="button"
              onClick={() => setOpen(on ? null : i)}
              aria-expanded={on}
              className="flex w-full items-center gap-4 text-left"
            >
              <span className="flex-1 text-[14.5px] font-semibold text-dl-ink md:text-[15.5px]">{item.question}</span>
              <span
                className={`flex size-[30px] shrink-0 items-center justify-center rounded-full ${
                  on ? "bg-dl-red-soft text-dl-red" : "bg-dl-bg text-dl-ink-2"
                }`}
              >
                {on ? <Minus className="size-4" aria-hidden /> : <Plus className="size-4" aria-hidden />}
              </span>
            </button>
            {/* Closed answers stay in the HTML, just hidden, so search
                engines read every answer the FAQ schema lists. */}
            <p className={`pt-2 pr-11 text-[13.5px] leading-[1.55] text-dl-ink-2 md:text-sm ${on ? "" : "hidden"}`}>{item.answer}</p>
          </li>
        );
      })}
    </ul>
  );
}

/* Opens the contact sheet for this package; Book and Enquire both use it. */
export function SheetButton({ item, className, children, label }: { item: BookingItem; className: string; children: ReactNode; label?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className} aria-label={label}>
        {children}
      </button>
      <ContactSheet
        isOpen={open}
        onClose={() => setOpen(false)}
        item={{ name: item.name, price: item.price, originalPrice: item.originalPrice }}
        sourceData={item.sourceData}
      />
    </>
  );
}

/* DL.pen "Sticky Booking Bar" (phones). */
export function DetailStickyBar({ item, discount }: { item: BookingItem; discount: number }) {
  // Lifts the chat button above the bar (see globals.css).
  useEffect(() => {
    document.body.dataset.stickyBar = "";
    return () => {
      delete document.body.dataset.stickyBar;
    };
  }, []);

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-2.5 border-t border-dl-line bg-white px-4 pt-3 shadow-[0_-8px_24px_rgba(22,24,29,0.06)] md:hidden"
      style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))" }}
    >
      <div className="flex min-w-0 flex-1 flex-col">
        <p className="flex items-baseline gap-1.5">
          <span className="font-display text-[22px] font-extrabold tracking-[-0.02em] text-dl-ink">{rupees(item.price)}</span>
          {item.originalPrice > item.price && <s className="text-[13px] text-dl-muted">{rupees(item.originalPrice)}</s>}
        </p>
        <span className="truncate text-[11.5px] font-semibold text-dl-green">
          {discount > 0 ? `${discount}% off · ` : ""}home collection
        </span>
      </div>
      <SheetButton
        item={item}
        className="flex h-12 shrink-0 items-center justify-center gap-2 rounded-[14px] bg-dl-red px-5 text-[15px] font-semibold text-white shadow-[0_8px_20px_rgba(217,45,39,0.25)]"
      >
        Book
        <ArrowRight className="size-[18px]" aria-hidden />
      </SheetButton>
    </div>
  );
}

/* DL.pen "Enquiry Form Card": an inline callback form (in the body on
   phones, in the sidebar on the test page's desktop). Sends the same lead
   as the contact sheet. */
export function EnquiryCard({
  item,
  name: shortName,
  kind,
  className = "",
}: {
  item: BookingItem;
  /* "CBC", "ND Plus": the name in "Questions about …?". */
  name: string;
  kind: "test" | "package";
  className?: string;
}) {
  const topics = [`Book this ${kind}`, "Home collection", "Reports", "Something else"];
  const [topic, setTopic] = useState(topics[0]);
  const [message, setMessage] = useState("");
  const { nameInput, phoneInput, nameError, phoneError, submitting, submitted, error, handleSubmit } = useLeadForm();

  const headingId = useId();
  const homeCollection = topic === "Home collection";
  const onSubmit = handleSubmit(() => ({
    source: {
      ...item.sourceData,
      contact_topic: topicValue(topic),
    },
    message: message.trim() || undefined,
    intent: leadIntent({ homeCollection, booking: true }),
  }));

  const box = "flex h-12 items-center gap-2.5 rounded-xl border border-dl-line bg-white px-3.5 focus-within:border-dl-red";
  const label = "text-[13px] font-semibold text-dl-ink";
  const input = "min-w-0 flex-1 bg-transparent text-[15px] text-dl-ink outline-none placeholder:text-dl-muted";

  return (
    <section aria-labelledby={headingId} className={`flex-col gap-4 rounded-[20px] border border-dl-line bg-white p-5 md:rounded-[24px] md:p-6 ${className}`}>
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-dl-red-soft text-dl-red">
          <MessageSquareText className="size-5" aria-hidden />
        </span>
        <div className="flex flex-col gap-0.5">
          <h2 id={headingId} className="font-display text-lg font-extrabold tracking-[-0.02em] text-dl-ink">
            Questions about {shortName}?
          </h2>
          <p className="text-[13px] text-dl-ink-2">Leave your number and we&apos;ll call you back.</p>
        </div>
      </div>

      {submitted ? (
        <p className="rounded-xl bg-dl-green/10 px-4 py-3 text-sm font-semibold text-dl-green" role="status">
          Thank you! Our team will call you back shortly.
        </p>
      ) : (
        <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3.5">
          <label className="flex flex-col gap-1.5">
            <span className={label}>
              Full name <span className="text-dl-red" aria-hidden>*</span>
            </span>
            <span className={box}>
              <UserRound className="size-[18px] shrink-0 text-dl-muted" aria-hidden />
              <input {...nameInput} placeholder="Your name" className={input} />
            </span>
            <FieldError message={nameError} />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className={label}>
              Mobile number <span className="text-dl-red" aria-hidden>*</span>
            </span>
            <span className={box}>
              <span className="text-[15px] font-semibold text-dl-ink">+91</span>
              <span className="h-[22px] w-px bg-dl-line" aria-hidden />
              <input {...phoneInput} placeholder="98765 43210" className={input} />
            </span>
            <FieldError message={phoneError} />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className={label}>
              What can we help with? <span className="text-dl-red" aria-hidden>*</span>
            </span>
            <span className={`${box} relative`}>
              <ListChecks className="size-[18px] shrink-0 text-dl-ink-2" aria-hidden />
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className={`${input} appearance-none pr-6`}
              >
                {topics.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3.5 size-4 text-dl-ink-2" aria-hidden />
            </span>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className={label}>
              Message <span className="font-normal text-dl-muted">(optional)</span>
            </span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, 500))}
              rows={3}
              placeholder="Anything we should know?"
              className="resize-none rounded-xl border border-dl-line px-3.5 py-3 text-[15px] text-dl-ink outline-none placeholder:text-dl-muted focus:border-dl-red"
            />
          </label>

          {error && (
            <p className="text-sm font-semibold text-dl-red" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="flex h-[52px] items-center justify-center gap-2 rounded-[14px] bg-dl-ink text-base font-semibold text-white disabled:opacity-60"
          >
            {submitting ? "Sending…" : "Request callback"}
            {!submitting && <PhoneCall className="size-[18px]" aria-hidden />}
          </button>

          <p className="flex items-center justify-center gap-1.5 text-[13px] text-dl-muted">
            Prefer chatting?
            <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-bold text-dl-green">
              <MessageCircle className="size-4" aria-hidden />
              WhatsApp us
            </a>
          </p>
        </form>
      )}
    </section>
  );
}

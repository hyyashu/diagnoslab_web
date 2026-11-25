"use client";

import { useState } from "react";
import { Lock, Send } from "lucide-react";
import { buttonClass } from "@/components/ui/button";
import { FieldError, leadIntent, useLeadForm } from "@/components/forms/useLeadForm";

const topics = ["Booking", "Reports", "Billing", "Home collection", "Feedback", "Doctor / corporate"];

/* DL.pen "Message Card": name, phone, an optional topic and message. Posts
   the same lead as every other site form, with the topic and message in
   its source. */
export default function ContactForm() {
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const { nameInput, phoneInput, nameError, phoneError, submitting, submitted, error, handleSubmit } = useLeadForm();

  const onSubmit = handleSubmit(
    () => ({
      source: { contact_topic: topic || "Something else" },
      message: message.trim() || undefined,
      intent: leadIntent({ homeCollection: topic === "Home collection" }),
    }),
    () => {
      setTopic("");
      setMessage("");
    },
  );

  const field =
    "w-full rounded-xl border border-dl-line bg-dl-bg px-3.5 py-3 text-sm text-dl-ink outline-none placeholder:text-dl-muted focus:border-dl-red";
  const label = "text-[13px] font-semibold text-dl-ink";

  return (
    <div
      id="enquiry-form"
      className="flex flex-col gap-5 rounded-3xl border border-dl-line bg-white p-5 shadow-[0_20px_50px_rgba(22,24,29,0.08)] md:p-8"
    >
      <div className="flex flex-col gap-1.5">
        <h2 className="font-display text-xl font-extrabold tracking-[-0.02em] text-dl-ink md:text-2xl">Send us a message</h2>
        <p className="text-[13.5px] leading-normal text-dl-ink-2 md:text-sm">
          Tell us what you need and we&apos;ll call or WhatsApp you back within working hours.
        </p>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-[18px]" noValidate>
        <div className="grid gap-[18px] sm:grid-cols-2 sm:gap-3">
          <label className="flex flex-col gap-2">
            <span className={label}>Name</span>
            <input {...nameInput} placeholder="Your full name" className={field} />
            <FieldError message={nameError} />
          </label>

          <label className="flex flex-col gap-2">
            <span className={label}>Phone number</span>
            <span className={`${field} flex items-center gap-2.5 focus-within:border-dl-red`}>
              <span className="font-semibold">+91</span>
              <span className="h-5 w-px bg-dl-line" aria-hidden />
              <input
                {...phoneInput}
                placeholder="10-digit mobile"
                className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-dl-muted"
              />
            </span>
            <FieldError message={phoneError} />
          </label>
        </div>

        <fieldset className="flex flex-col">
          <legend className={`${label} pb-2`}>What&apos;s it about?</legend>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {topics.map((t) => {
              const selected = topic === t;
              return (
                <button
                  key={t}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setTopic(selected ? "" : t)}
                  className={`rounded-full border px-1 py-[9px] text-[12.5px] whitespace-nowrap transition-colors ${
                    selected
                      ? "border-dl-red bg-dl-red-soft font-semibold text-dl-red"
                      : "border-dl-line bg-white font-medium text-dl-ink-2 hover:border-dl-ink/40"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </fieldset>

        <label className="flex flex-col gap-2">
          <span className={label}>Message</span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            placeholder="E.g. I haven't received my CBC report from 28 Sept, booking ID DL-20931…"
            className={`${field} resize-none`}
          />
        </label>

        <button type="submit" disabled={submitting} className={buttonClass("primary", "lg", "w-full disabled:opacity-60")}>
          {submitting ? "Sending…" : "Send message"}
          {!submitting && <Send className="size-4" aria-hidden />}
        </button>

        {submitted && (
          <p className="text-sm font-semibold text-dl-green" role="status">
            Thank you! We&apos;ll get in touch shortly.
          </p>
        )}
        {error && (
          <p className="text-sm font-semibold text-dl-red" role="alert">
            {error}
          </p>
        )}

        <p className="flex items-center justify-center gap-1.5 text-[12.5px] text-dl-muted">
          <Lock className="size-[13px]" aria-hidden />
          We never share your number. No spam.
        </p>
      </form>
    </div>
  );
}

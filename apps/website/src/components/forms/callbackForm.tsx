"use client";

import { useState } from "react";
import { ArrowRight, ChevronDown, Lock } from "lucide-react";
import { buttonClass } from "@/components/ui/button";
import { FieldError, leadIntent, useLeadForm } from "@/components/forms/useLeadForm";

type CallbackFormProps = {
  title?: string;
  /* Pass "" to hide the line. */
  subtitle?: string;
  /* Options for the "Service" select; leave out to hide the field. */
  services?: string[];
  /* Wording of the Service select. */
  serviceLabel?: string;
  servicePlaceholder?: string;
  /* Optional single-choice chips ("What do you need?") instead of the
     Service select. */
  needs?: string[];
  note?: string;
  /* Sent with the lead when there is no Service select. */
  service?: string;
};

/* DL.pen "Call Back Card". The chosen service, else the page's own, is
   the lead's contact topic. */
export default function CallbackForm({
  title = "Request a call back",
  subtitle = "Share your details and our team will call you to book a slot.",
  services,
  serviceLabel = "Service",
  servicePlaceholder = "Select a scan",
  needs,
  note = "We never share your number.",
  service: fixedService,
}: CallbackFormProps) {
  const [service, setService] = useState("");
  const { nameInput, phoneInput, nameError, phoneError, submitting, submitted, error, handleSubmit } = useLeadForm();

  const onSubmit = handleSubmit(
    () => {
      const topic = service || fixedService || "Something else";
      return {
        source: { contact_topic: topic },
        intent: leadIntent({ homeCollection: topic === "Home collection" }),
      };
    },
    () => setService(""),
  );

  const field =
    "w-full rounded-xl border border-transparent bg-dl-bg px-4 py-3 text-sm text-dl-ink outline-none placeholder:text-dl-muted focus:border-dl-red";
  const label = "text-[12.5px] font-semibold text-dl-ink md:text-[13px]";

  return (
    <div
      id="enquiry-form"
      className="flex flex-col gap-4 rounded-3xl border border-dl-line bg-white p-4 shadow-[0_20px_50px_rgba(22,24,29,0.08)] md:gap-5 md:p-7"
    >
      <div className="flex flex-col gap-1.5">
        <h2 className="font-display text-lg font-extrabold tracking-[-0.02em] text-dl-ink md:text-[22px]">
          {title}
        </h2>
        {subtitle && (
          <p className="text-[13px] leading-normal text-dl-ink-2 md:text-sm">
            {subtitle}
          </p>
        )}
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-3 md:gap-4" noValidate>
        <label className="flex flex-col gap-1.5">
          <span className={label}>Name</span>
          <input {...nameInput} placeholder="Your full name" className={field} />
          <FieldError message={nameError} />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className={label}>Phone number</span>
          <span className={`${field} flex items-center gap-2 focus-within:border-dl-red`}>
            <span className="text-dl-ink-2">+91</span>
            <input
              {...phoneInput}
              placeholder="Your 10-digit number"
              className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-dl-muted"
            />
          </span>
          <FieldError message={phoneError} />
        </label>

        {services && (
          <label className="flex flex-col gap-1.5">
            <span className={label}>{serviceLabel}</span>
            <span className="relative">
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className={`${field} appearance-none pr-10 ${service ? "" : "text-dl-muted"}`}
              >
                <option value="">{servicePlaceholder}</option>
                {services.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-dl-ink-2" aria-hidden />
            </span>
          </label>
        )}

        {needs && (
          <fieldset className="flex flex-col gap-2">
            <legend className={`${label} pb-2`}>What do you need? (optional)</legend>
            <div className="grid grid-cols-3 gap-2">
              {needs.map((n) => {
                const selected = service === n;
                return (
                  <button
                    key={n}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setService(selected ? "" : n)}
                    className={`rounded-full border px-2 py-[9px] text-[12.5px] transition-colors md:text-[13px] ${
                      selected
                        ? "border-dl-red bg-dl-red-soft font-bold text-dl-red"
                        : "border-dl-line bg-white font-medium text-dl-ink-2 hover:border-dl-ink/40"
                    }`}
                  >
                    {n}
                  </button>
                );
              })}
            </div>
          </fieldset>
        )}

        <button type="submit" disabled={submitting} className={buttonClass("primary", "lg", "mt-1 w-full disabled:opacity-60")}>
          {submitting ? "Submitting…" : "Request call back"}
          {!submitting && <ArrowRight className="size-4" aria-hidden />}
        </button>

        {submitted && (
          <p className="text-sm font-semibold text-dl-green" role="status">
            Thank you! We’ll get in touch shortly.
          </p>
        )}
        {error && (
          <p className="text-sm font-semibold text-dl-red" role="alert">
            {error}
          </p>
        )}

        <p className="flex items-center justify-center gap-1.5 text-[11.5px] text-dl-muted md:text-xs">
          <Lock className="size-3.5" aria-hidden />
          {note}
        </p>
      </form>
    </div>
  );
}

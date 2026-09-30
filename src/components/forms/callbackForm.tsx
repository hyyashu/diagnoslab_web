"use client";

import { useState } from "react";
import { ChevronDown, Lock } from "lucide-react";
import { submitLeadForm } from "@/lib/api";
import { useSource } from "@/lib/useSource";
import { normalizePhone, sanitizeName, validateName, validatePhone } from "@/lib/leadValidation";
import { buttonClass } from "@/components/ui/button";

type CallbackFormProps = {
  subtitle?: string;
  /* Options for the "Service" select; leave out to hide the field. */
  services?: string[];
  /* Sent with the lead when there is no Service select. */
  service?: string;
  formType?: "enquiry_form" | "home_collection";
};

/* DL.pen "Call Back Card". Sends the same lead as the enquiry form, plus
   the chosen service under the key the radiology cards already use. */
export default function CallbackForm({
  subtitle = "Share your details and our team will call you to book a slot.",
  services,
  service: fixedService,
  formType = "enquiry_form",
}: CallbackFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const source = useSource({
    form_type: formType,
    ...((service || fixedService) && { radiology_name: service || fixedService }),
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const nErr = validateName(name);
    const pErr = validatePhone(phone);
    setNameError(nErr);
    setPhoneError(pErr);
    if (nErr || pErr) return;

    setSubmitting(true);
    try {
      await submitLeadForm({
        name: name.trim(),
        phone: normalizePhone(phone),
        source,
        lead_intent: formType === "home_collection" ? "book_home_collection" : "general_enquiry",
      });
      setName("");
      setPhone("");
      setService("");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const field =
    "w-full rounded-xl border border-transparent bg-dl-bg px-4 py-3 text-sm text-dl-ink outline-none placeholder:text-dl-muted focus:border-dl-red";
  const label = "text-[12.5px] font-semibold text-dl-ink md:text-[13px]";

  return (
    <div
      id="enquiry-form"
      className="flex flex-col gap-5 rounded-3xl border border-dl-line bg-white p-5 shadow-[0_20px_50px_rgba(22,24,29,0.08)] md:p-7"
    >
      <div className="flex flex-col gap-1.5">
        <h2 className="font-display text-lg font-extrabold tracking-[-0.02em] text-dl-ink md:text-[22px]">
          Request a call back
        </h2>
        <p className="text-[13px] leading-normal text-dl-ink-2 md:text-sm">
          {subtitle}
        </p>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
        <label className="flex flex-col gap-1.5">
          <span className={label}>Name</span>
          <input
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => {
              const v = sanitizeName(e.target.value);
              setName(v);
              if (nameError) setNameError(validateName(v));
            }}
            onBlur={() => setNameError(validateName(name))}
            placeholder="Your full name"
            className={field}
          />
          {nameError && <span className="text-xs text-dl-red">{nameError}</span>}
        </label>

        <label className="flex flex-col gap-1.5">
          <span className={label}>Phone number</span>
          <span className={`${field} flex items-center gap-2 focus-within:border-dl-red`}>
            <span className="text-dl-ink-2">+91</span>
            <input
              type="tel"
              autoComplete="tel-national"
              inputMode="numeric"
              value={phone}
              onChange={(e) => {
                const digits = normalizePhone(e.target.value).slice(0, 10);
                setPhone(digits);
                if (phoneError) setPhoneError(validatePhone(digits));
              }}
              onBlur={() => setPhoneError(validatePhone(phone))}
              placeholder="Your 10-digit number"
              className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-dl-muted"
            />
          </span>
          {phoneError && <span className="text-xs text-dl-red">{phoneError}</span>}
        </label>

        {services && (
          <label className="flex flex-col gap-1.5">
            <span className={label}>Service</span>
            <span className="relative">
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className={`${field} appearance-none pr-10 ${service ? "" : "text-dl-muted"}`}
              >
                <option value="">Select a scan</option>
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

        <button type="submit" disabled={submitting} className={buttonClass("primary", "lg", "mt-1 w-full disabled:opacity-60")}>
          {submitting ? "Submitting…" : "Request call back"}
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
          We never share your number.
        </p>
      </form>
    </div>
  );
}

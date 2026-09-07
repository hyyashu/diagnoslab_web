"use client";

import React, { useState } from "react";
import { submitLeadForm } from "@/lib/api";
import { useSource } from "@/lib/useSource";
import { trackLead } from "@/lib/gtag";
import {
  validateName,
  validatePhone,
  normalizePhone,
  sanitizeName,
} from "@/lib/leadValidation";

export default function LpLeadForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const source = useSource({ form_type: "home_collection" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
        lead_intent: "book_home_collection",
      });
      trackLead();
      setSubmitted(true);
    } catch {
      setError("That didn't send. Call 8404802201 and we'll book it for you.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-xl md:p-7">
        <h2 className="font-heading text-xl font-black text-slate-900">
          Booked. We&apos;ll call you shortly.
        </h2>
        <p className="mt-2 font-body text-sm leading-relaxed text-slate-600">
          Someone from Diagnos Lab will confirm your slot and tell you whether
          the test needs fasting. Calls go out between 7:30 am and 8 pm.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-xl md:p-7">
      <h2 className="font-heading text-xl font-black text-slate-900 md:text-2xl">
        Book a home collection
      </h2>
      <p className="mt-1.5 font-body text-sm text-slate-600">
        Leave your number and we&apos;ll call to fix a slot.
      </p>

      <form className="mt-5 space-y-4" onSubmit={handleSubmit} noValidate>
        <div>
          <label
            htmlFor="lp-name"
            className="font-body text-sm font-bold text-slate-900"
          >
            Name
          </label>
          <input
            id="lp-name"
            type="text"
            value={name}
            autoComplete="name"
            aria-invalid={!!nameError}
            onChange={(e) => {
              const value = sanitizeName(e.target.value);
              setName(value);
              if (nameError) setNameError(validateName(value));
            }}
            onBlur={() => setNameError(validateName(name))}
            placeholder="Your name"
            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-body text-slate-900 outline-none focus:ring-2 focus:ring-background-primary"
          />
          {nameError && (
            <p className="mt-1 font-body text-xs text-red-600">{nameError}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="lp-phone"
            className="font-body text-sm font-bold text-slate-900"
          >
            Mobile number
          </label>
          <input
            id="lp-phone"
            type="tel"
            inputMode="numeric"
            value={phone}
            autoComplete="tel"
            aria-invalid={!!phoneError}
            onChange={(e) => {
              const digits = normalizePhone(e.target.value).slice(0, 10);
              setPhone(digits);
              if (phoneError) setPhoneError(validatePhone(digits));
            }}
            onBlur={() => setPhoneError(validatePhone(phone))}
            placeholder="10-digit number"
            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-body text-slate-900 outline-none focus:ring-2 focus:ring-background-primary"
          />
          {phoneError && (
            <p className="mt-1 font-body text-xs text-red-600">{phoneError}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-xl bg-background-primary px-6 py-4 font-heading text-base font-black text-white transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {submitting ? "Sending..." : "Request a call back"}
        </button>

        {error && (
          <p className="font-body text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}

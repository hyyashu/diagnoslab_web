"use client";

import { useCallback, useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { submitLeadForm } from "@/lib/api";
import { useSource } from "@/lib/useSource";

const NAME_MIN_LENGTH = 2;
const NAME_MAX_LENGTH = 100;
const PHONE_LENGTH = 10;

function validateName(name: string): string | null {
  const trimmed = name.trim();
  if (!trimmed) return "Name is required.";
  if (trimmed.length < NAME_MIN_LENGTH)
    return `Name must be at least ${NAME_MIN_LENGTH} characters.`;
  if (trimmed.length > NAME_MAX_LENGTH)
    return `Name must be at most ${NAME_MAX_LENGTH} characters.`;
  if (!/^[\p{L}\p{M}\s.'-]+$/u.test(trimmed))
    return "Name can only contain letters, spaces, and common punctuation.";
  return null;
}

function normalizePhone(value: string): string {
  return value.replace(/\D/g, "");
}

/** Keep only letters, spaces, and common name punctuation. */
function sanitizeName(value: string): string {
  return value.replace(/[^\p{L}\p{M}\s.'-]/gu, "");
}

function validatePhone(phone: string): string | null {
  const digits = normalizePhone(phone);
  if (!digits) return "Phone number is required.";
  if (digits.length !== PHONE_LENGTH)
    return `Enter a valid 10-digit phone number.`;
  if (!/^[6-9]\d{9}$/.test(digits))
    return "Enter a valid Indian mobile number.";
  return null;
}

export type LeadFormSubmitData = {
  name: string;
  phone: string;
  source: ReturnType<typeof useSource>;
  lead_intent?: "book_home_collection" | "general_enquiry";
};

type LeadFormBaseProps = {
  title?: string
  testName?: string;
  testDescription?: string;
  testPrice?: number;
  testOriginalPrice?: number;
  onSuccess?: () => void;
  additionalSourceData?: Record<string, any>;
};

type LeadFormInlineProps = LeadFormBaseProps & {
  open?: undefined;
  onOpenChange?: undefined;
};

type LeadFormModalProps = LeadFormBaseProps & {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export type LeadFormProps = LeadFormInlineProps | LeadFormModalProps;

const DEFAULT_TITLE = "Book a test";

function isModalProps(props: LeadFormProps): props is LeadFormModalProps {
  return (
    typeof (props as LeadFormModalProps).open === "boolean" &&
    typeof (props as LeadFormModalProps).onOpenChange === "function"
  );
}

export default function LeadForm(props: LeadFormProps) {
  const {
    title = DEFAULT_TITLE,
    testName,
    testDescription,
    testPrice,
    testOriginalPrice,
    onSuccess,
    additionalSourceData,
  } = props;
  const modalProps = isModalProps(props) ? props : null;
  const isModal = !!modalProps;
  const isOpen = modalProps?.open ?? true;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const source = useSource(additionalSourceData);
  const inputIdsPrefix = useId().replace(/:/g, "");
  const titleId = `lead-form-title-${inputIdsPrefix}`;
  const nameInputId = `lead-name-${inputIdsPrefix}`;
  const phoneInputId = `lead-phone-${inputIdsPrefix}`;
  const nameErrorId = `lead-name-error-${inputIdsPrefix}`;
  const phoneErrorId = `lead-phone-error-${inputIdsPrefix}`;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isModal || isOpen) return;
    setSubmitted(false);
    setName("");
    setPhone("");
    setNameError(null);
    setPhoneError(null);
  }, [isModal, isOpen]);

  useEffect(() => {
    if (!isModal || !isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        modalProps?.onOpenChange(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isModal, isOpen, modalProps]);

  const validate = useCallback(() => {
    const nErr = validateName(name);
    const pErr = validatePhone(phone);
    setNameError(nErr);
    setPhoneError(pErr);
    return !nErr && !pErr;
  }, [name, phone]);

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      // Add testName to source if available
      const sourceWithTestName = testName
        ? { ...source, clicked_at: testName }
        : source;

      await submitLeadForm({
        name: name.trim(),
        phone: normalizePhone(phone),
        source: sourceWithTestName,
      });
      setSubmitted(true);
      setName("");
      setPhone("");
      setNameError(null);
      setPhoneError(null);
      onSuccess?.();
    } catch {
      setPhoneError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const formContent = (
    <div className="grid gap-3 ">
      <form
        onSubmit={handleSubmit}
        className={`grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 ${isModal ? "relative" : ""
          }`}
      >
        {isModal && modalProps && (
          <button
            type="button"
            onClick={() => modalProps.onOpenChange(false)}
            aria-label="Close"
            className="absolute -right-2 -top-2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-700 shadow-md"
          >
            <span className="text-xl leading-none" aria-hidden="true">
              ×
            </span>
          </button>
        )}
        <div id={titleId} className="text-lg font-bold text-black font-body">
          {title}
          {testName && (
            <span className="mt-1 block text-sm font-normal text-black font-heading">
              {testName}
            </span>
          )}
          {typeof testPrice === "number" && (
            <span className="mt-2 flex items-center gap-2 text-base font-heading font-semibold text-green-600">
              ₹{testPrice}
              {typeof testOriginalPrice === "number" && testOriginalPrice > 0 && (
                <span className="text-sm font-medium font-heading text-slate-400 line-through">
                  ₹{testOriginalPrice}
                </span>
              )}
            </span>
          )}
          {testDescription && (
            <span className="mt-2 block text-sm font-normal font-body text-gray-700">
              {testDescription}
            </span>
          )}
        </div>
        <div className="grid gap-2 mt-6">
          <label
            htmlFor={nameInputId}
            className="text-sm font-medium text-black font-heading"
          >
            Name
          </label>
          <input
            id={nameInputId}
            type="text"
            inputMode="text"
            value={name}
            onChange={(e) => {
              const next = sanitizeName(e.target.value);
              setName(next);
              if (nameError) setNameError(validateName(next));
            }}
            onBlur={() => setNameError(validateName(name))}
            placeholder="Your name"
            autoComplete="name"
            aria-invalid={!!nameError}
            aria-describedby={nameError ? nameErrorId : undefined}
            className="w-full text-black bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none transition-all focus:border-background-primary"
          />
          <p
            id={nameErrorId}
            className="min-h-5 text-xs text-red-600"
            role="alert"
            aria-live="polite"
          >
            {nameError}
          </p>
        </div>
        <div className="grid gap-2">
          <label
            htmlFor={phoneInputId}
            className="text-sm font-medium text-black font-heading"
          >
            Phone Number
          </label>
          <input
            id={phoneInputId}
            type="tel"
            inputMode="numeric"
            value={phone}
            onChange={(e) => {
              const next = normalizePhone(e.target.value).slice(0, 10);
              setPhone(next);
              if (phoneError) setPhoneError(validatePhone(next));
            }}
            onBlur={() => setPhoneError(validatePhone(phone))}
            placeholder="10-digit mobile number"
            autoComplete="tel"
            maxLength={10}
            aria-invalid={!!phoneError}
            aria-describedby={phoneError ? phoneErrorId : undefined}
            className="w-full text-black bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none transition-all focus:border-background-primary"
          />
          <p
            id={phoneErrorId}
            className="min-h-5 text-xs text-red-600"
            role="alert"
            aria-live="polite"
          >
            {phoneError}
          </p>
        </div>
        <button
          type="submit"
          disabled={submitting || !!validateName(name) || !!validatePhone(phone)}
          className="inline-flex items-center justify-center rounded-xl bg-background-primary px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-action-200 disabled:opacity-60 disabled:pointer-events-none"
        >
          {submitting ? "Submitting…" : "Book"}
        </button>
        {submitted && (

          <p className="text-sm font-semibold mt-2 text-green-600">
            Thank you! We’ll get in touch shortly.
          </p>

        )}
      </form>

    </div>
  );

  if (!isModal) {
    return formContent;
  }

  if (!mounted || !isOpen) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 pt-20"
      onClick={() => modalProps.onOpenChange(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-md rounded-2xl bg-transparent"
        onClick={(event) => event.stopPropagation()}
      >
        {formContent}
      </div>
    </div>,
    document.body,
  );
}

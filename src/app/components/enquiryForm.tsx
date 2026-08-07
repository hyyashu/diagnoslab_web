"use client";
import React, { useState } from "react";
import { submitLeadForm } from "@/lib/api";
import { useSource } from "@/lib/useSource";

type EnquiryFormType = "enquiry_form" | "home_collection";

interface EnquiryFormProps {
  formType?: EnquiryFormType;
}

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
    return "Name can only contain letters and valid characters.";
  return null;
}

function normalizePhone(value: string): string {
  return value.replace(/\D/g, "");
}

function sanitizeName(value: string): string {
  return value.replace(/[^\p{L}\p{M}\s.'-]/gu, "");
}

function validatePhone(phone: string): string | null {
  const digits = normalizePhone(phone);
  if (!digits) return "Phone number is required.";
  if (digits.length !== PHONE_LENGTH)
    return "Enter a valid 10-digit phone number.";
  if (!/^[6-9]\d{9}$/.test(digits))
    return "Enter a valid Indian mobile number.";
  return null;
}

const EnquiryForm: React.FC<EnquiryFormProps> = ({
  formType = "enquiry_form",
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [nameError, setNameError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const source = useSource({ form_type: formType });

  const validate = () => {
    const nErr = validateName(name);
    const pErr = validatePhone(phone);

    setNameError(nErr);
    setPhoneError(pErr);

    return !nErr && !pErr;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!validate()) return;

    setSubmitting(true);
    try {
      await submitLeadForm({
        name: name.trim(),
        phone: normalizePhone(phone),
        source,
        lead_intent:
          formType === "home_collection"
            ? "book_home_collection"
            : "general_enquiry",
      });

      setName("");
      setPhone("");
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      id="enquiry-form"
      className="bg-white p-6 md:p-8 rounded-[2rem] shadow-2xl border border-slate-100"
    >
      <h3 className="font-heading text-xl md:text-2xl font-black text-slate-900 mb-6">
        Request A Call Back
      </h3>

      <form
        className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
        onSubmit={handleSubmit}
      >
        {/* NAME */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-bold text-black">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              const value = sanitizeName(e.target.value);
              setName(value);
              if (nameError) setNameError(validateName(value));
            }}
            onBlur={() => setNameError(validateName(name))}
            placeholder="Your Name"
            className="w-full text-black bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none  focus:ring-1 focus:ring-background-primary"
          />
          <p className="text-xs text-red-600 h-2">{nameError}</p>
        </div>
        {/* PHONE */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-bold text-black">Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => {
              const digits = normalizePhone(e.target.value).slice(0, 10);
              setPhone(digits);
              if (phoneError) setPhoneError(validatePhone(digits));
            }}
            onBlur={() => setPhoneError(validatePhone(phone))}
            placeholder="Your Number"
            className="w-full text-black bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none  focus:ring-1 focus:ring-background-primary"
          />
          <p className="text-xs text-red-600 h-2">{phoneError}</p>
        </div>

        {/* BUTTON */}
        <div className="flex flex-col justify-start pt-0 md:pt-6">
          <button
            type="submit"
            disabled={
              submitting || !!validateName(name) || !!validatePhone(phone)
            }
            className="w-full bg-background-primary text-white font-black py-2 md:py-4 rounded-xl disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>

      {submitted && (
        <p className="text-green-600 mt-2 font-semibold">
          Thank you! We’ll get in touch shortly.
        </p>
      )}

      {error && <p className="text-red-600 mt-2 font-semibold">{error}</p>}
    </div>
  );
};

export default EnquiryForm;

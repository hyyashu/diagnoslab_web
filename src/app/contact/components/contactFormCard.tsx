"use client";

import { useState } from "react";
import { submitLeadForm } from "@/lib/api";
import { useSource } from "@/lib/useSource";

/* ---------------- CONSTANTS ---------------- */

const NAME_MIN_LENGTH = 2;
const NAME_MAX_LENGTH = 100;
const PHONE_LENGTH = 10;

/* ---------------- VALIDATION ---------------- */

function validateName(name: string): string | null {
  const trimmed = name.trim();
  if (!trimmed) return "Name is required.";
  if (trimmed.length < NAME_MIN_LENGTH)
    return `Minimum ${NAME_MIN_LENGTH} characters required.`;
  if (trimmed.length > NAME_MAX_LENGTH)
    return `Maximum ${NAME_MAX_LENGTH} characters allowed.`;
  if (!/^[\p{L}\p{M}\s.'-]+$/u.test(trimmed))
    return "Only valid characters allowed.";
  return null;
}

function normalizePhone(value: string): string {
  return value.replace(/\D/g, "");
}

function validatePhone(phone: string): string | null {
  const digits = normalizePhone(phone);
  if (!digits) return "Phone number is required.";
  if (digits.length !== PHONE_LENGTH)
    return "Enter a valid 10-digit number.";
  if (!/^[6-9]\d{9}$/.test(digits))
    return "Enter valid Indian number.";
  return null;
}

function validateMessage(message: string): string | null {
  const trimmed = message.trim();
  if (!trimmed) return "Message is required.";
  if (trimmed.length < 5) return "Message too short.";
  return null;
}

/* ---------------- COMPONENT ---------------- */

export default function ContactFormCard() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: null as string | null,
    phone: null as string | null,
    message: null as string | null,
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const source = useSource({ form_type: "contact_form" });

  /* ---------------- HANDLE CHANGE ---------------- */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    let updatedValue = value;

    if (name === "phone") {
      updatedValue = normalizePhone(value).slice(0, 10);
    }

    setForm((prev) => ({ ...prev, [name]: updatedValue }));
    setSubmitted(false);

    // ✅ real-time validation
    setErrors((prev) => ({
      ...prev,
      [name]:
        name === "name"
          ? validateName(updatedValue)
          : name === "phone"
          ? validatePhone(updatedValue)
          : validateMessage(updatedValue),
    }));
  };

  /* ---------------- VALIDATE ALL ---------------- */

  const validateAll = () => {
    const nameErr = validateName(form.name);
    const phoneErr = validatePhone(form.phone);
    const messageErr = validateMessage(form.message);

    setErrors({
      name: nameErr,
      phone: phoneErr,
      message: messageErr,
    });

    return !nameErr && !phoneErr && !messageErr;
  };

  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateAll()) return;

    setLoading(true);

    try {
      await submitLeadForm({
        name: form.name.trim(),
        phone: normalizePhone(form.phone),
        source: {
          ...source,
          message: form.message.trim(),
        },
      });

      setForm({
        name: "",
        phone: "",
        message: "",
      });

      setErrors({
        name: null,
        phone: null,
        message: null,
      });

      setSubmitted(true);
    } catch {
      // optional global error handling
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white text-black rounded-xl p-6 shadow-md text-center md:text-left">
      <h3 className="font-heading font-semibold text-2xl">
        Send a Message
      </h3>

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        
        {/* NAME */}
        <div>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            className={`w-full border rounded-lg px-3 py-2 text-sm outline-none
              ${errors.name ? "border-red-500" : "border-slate-200"}
              focus:ring-2 focus:ring-red-400`}
          />
          <p className="text-xs text-red-600 h-2">
            {errors.name || "\u00A0"}
          </p>
        </div>

        {/* PHONE */}
        <div>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="10-Digit Mobile Number"
            className={`w-full border rounded-lg px-3 py-2 text-sm outline-none
              ${errors.phone ? "border-red-500" : "border-slate-200"}
              focus:ring-2 focus:ring-red-400`}
          />
          <p className="text-xs text-red-600 h-2">
            {errors.phone || "\u00A0"}
          </p>
        </div>

        {/* MESSAGE */}
        <div>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={4}
            placeholder="How can we help?"
            className={`w-full border rounded-xl px-3 py-2 text-sm outline-none
              ${errors.message ? "border-red-500" : "border-slate-200"}
              focus:ring-2 focus:ring-red-400`}
          />
          <p className="text-xs text-red-600 h-2">
            {errors.message || "\u00A0"}
          </p>
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-background-primary text-white py-2 rounded-lg hover:bg-red-700 transition disabled:opacity-50 font-heading font-bold text-lg"
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>

      {/* SUCCESS MESSAGE */}
      {submitted && (
        <p className="mt-3 text-sm font-semibold text-green-600">
          Thank you! We’ll get in touch shortly.
        </p>
      )}
    </div>
  );
}
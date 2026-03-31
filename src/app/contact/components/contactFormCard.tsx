"use client";

import { useState } from "react";
import { submitLeadForm } from "@/lib/api";
import { useSource } from "@/lib/useSource";

export default function ContactFormCard() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const source = useSource({ form_type: "contact_form" });

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSubmitted(false);

    try {
      await submitLeadForm({
        name: form.name.trim(),
        phone: form.phone.replace(/\D/g, ""),
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
      setSubmitted(true);
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white text-black rounded-xl p-6 shadow-md text-center md:text-left">
      <h3 className="font-heading font-semibold text-2xl">Send a Message</h3>

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        {/* Name */}
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          className="font-body w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-400"
        />

        {/* Phone */}
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="10-Digit Mobile Number"
          required
          pattern="[0-9]{10}"
          className="font-body w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-400"
        />

        {/* Message */}
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="How can we help?"
          rows={4}
          required
          className="font-body w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-400"
        />

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-background-primary text-white py-2 rounded-lg hover:bg-red-700 transition disabled:opacity-50 font-heading font-bold text-lg"
        >
          {loading ? "Sending..." : "Book"}
        </button>
      </form>
      {submitted && (
        <p className="mt-3 text-sm font-semibold text-green-600">
          Form submitted successfully!
        </p>
      )}
      {error && (
        <p className="mt-3 text-sm font-semibold text-red-600">{error}</p>
      )}
    </div>
  );
}
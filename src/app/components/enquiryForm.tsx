"use client";
import React, { useState } from "react";
import { submitLeadForm } from "@/lib/api";
import { useSource } from "@/lib/useSource";

type EnquiryFormType = "enquiry_form" | "home_collection";

interface EnquiryFormProps {
  formType?: EnquiryFormType;
}

const EnquiryForm: React.FC<EnquiryFormProps> = ({
  formType = "enquiry_form",
}) => {
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const source = useSource({ form_type: formType });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    setSubmitting(true);
    try {
      await submitLeadForm({
        name: name.trim(),
        phone: phone.replace(/\D/g, ""),
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
    <div id="enquiry-form" className="bg-white p-6 md:p-8 rounded-[2rem] shadow-2xl border border-slate-100">
      <h3 className="font-heading text-xl md:text-2xl font-black text-slate-900 mb-6">
        Enquire Now
      </h3>

      <form
        className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col space-y-2">
          <label className="font-body text-sm font-bold text-black">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            required
            className="w-full text-black bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:border-red-500 outline-none transition-all"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="font-body text-sm font-bold text-black">
            Phone Number
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => {
              const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
              setPhone(digits);
            }}
            placeholder="Your Number"
            required
            className="w-full text-black bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:border-red-500 outline-none transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="font-heading w-full bg-background-primary hover:bg-red-700 text-white font-black py-4 rounded-xl shadow-lg transition-all active:scale-95 uppercase tracking-widest disabled:opacity-60 disabled:pointer-events-none"
        >
          {submitting ? "Submitting..." : "Book"}
        </button>
      </form>

      {submitted && (
        <p className="text-green-600 mt-4 font-semibold">
          Form submitted successfully!
        </p>
      )}

      {error && <p className="text-red-600 mt-4 font-semibold">{error}</p>}
    </div>
  );
};

export default EnquiryForm;
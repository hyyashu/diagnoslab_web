"use client";

import React, { useState } from "react";
import { submitLeadForm } from "@/lib/api";
import { useSource } from "@/lib/useSource";

const NAME_MIN_LENGTH = 2;
const NAME_MAX_LENGTH = 100;
const PHONE_LENGTH = 10;
const COMPANY_MIN_LENGTH = 2;
const COMPANY_MAX_LENGTH = 150;
const EMAIL_MAX_LENGTH = 254;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

function sanitizeCompanyName(value: string): string {
  return value.replace(/[^\p{L}\p{N}\p{M}\s.&,'\-()/+]/gu, "");
}

function validateCompanyName(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return "Company name is required.";
  if (trimmed.length < COMPANY_MIN_LENGTH)
    return `Company name must be at least ${COMPANY_MIN_LENGTH} characters.`;
  if (trimmed.length > COMPANY_MAX_LENGTH)
    return `Company name must be at most ${COMPANY_MAX_LENGTH} characters.`;
  return null;
}

function validateEmail(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return "Email is required.";
  if (trimmed.length > EMAIL_MAX_LENGTH) return "Email is too long.";
  if (!EMAIL_RE.test(trimmed)) return "Enter a valid email address.";
  return null;
}

function validateEmployees(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return "Number of employees is required.";
  if (!/^\d+$/.test(trimmed)) return "Enter a valid whole number.";
  const n = parseInt(trimmed, 10);
  if (n < 1) return "Enter at least 1 employee.";
  if (n > 50_000_000) return "Enter a realistic employee count.";
  return null;
}

const errorSlotClass =
  "h-4 text-left text-xs leading-snug text-red-600 overflow-hidden";

export default function CorporateForm() {
  const [companyName, setCompanyName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [employees, setEmployees] = useState("");

  const [companyError, setCompanyError] = useState<string | null>(null);
  const [contactError, setContactError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [employeesError, setEmployeesError] = useState<string | null>(null);

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const source = useSource({ form_type: "corporate_hero_form" });

  const validate = () => {
    const cErr = validateCompanyName(companyName);
    const pErr = validateName(contactPerson);
    const phErr = validatePhone(phone);
    const eErr = validateEmail(email);
    const emErr = validateEmployees(employees);

    setCompanyError(cErr);
    setContactError(pErr);
    setPhoneError(phErr);
    setEmailError(eErr);
    setEmployeesError(emErr);

    return !cErr && !pErr && !phErr && !eErr && !emErr;
  };

  const invalid =
    !!validateCompanyName(companyName) ||
    !!validateName(contactPerson) ||
    !!validatePhone(phone) ||
    !!validateEmail(email) ||
    !!validateEmployees(employees);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!validate()) return;

    const companyTrimmed = companyName.trim();
    const contactTrimmed = contactPerson.trim();
    const emailTrimmed = email.trim();
    const phoneDigits = normalizePhone(phone);

    setSubmitting(true);
    try {
      await submitLeadForm({
        name: contactTrimmed || companyTrimmed,
        phone: phoneDigits,
        source: {
          ...source,
          company_name: companyTrimmed,
          contact_person: contactTrimmed,
          email: emailTrimmed,
          employees,
          lead_type: "corporate",
        },
      });

      setCompanyName("");
      setContactPerson("");
      setPhone("");
      setEmail("");
      setEmployees("");
      setCompanyError(null);
      setContactError(null);
      setPhoneError(null);
      setEmailError(null);
      setEmployeesError(null);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20 w-full max-w-[100%] md:max-w-5xl">
      <div className="bg-white p-4 md:p-8 rounded-[2rem] shadow-2xl border border-slate-100 ml-4 mr-4 lg:ml-0 lg:mr-0">
        <h3 className="font-heading text-xl md:text-2xl font-black text-black mb-2 md:mb-6">
          Get In touch
        </h3>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 items-start"
        >
          <div className="flex flex-col space-y-2">
            <label className="font-body text-sm font-bold text-black">
              Company Name
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => {
                const v = sanitizeCompanyName(e.target.value);
                setCompanyName(v);
                if (companyError) setCompanyError(validateCompanyName(v));
              }}
              onBlur={() => setCompanyError(validateCompanyName(companyName))}
              placeholder="Your Company Name"
              autoComplete="organization"
              className="w-full h-8 md:h-full text-black bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:border-red-500 outline-none"
            />
            <p className={errorSlotClass}>{companyError ?? "\u00a0"}</p>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="font-body text-sm font-bold text-black">
              Contact Person Name
            </label>
            <input
              type="text"
              value={contactPerson}
              onChange={(e) => {
                const v = sanitizeName(e.target.value);
                setContactPerson(v);
                if (contactError) setContactError(validateName(v));
              }}
              onBlur={() => setContactError(validateName(contactPerson))}
              placeholder="Full Name"
              autoComplete="name"
              className="w-full h-8 md:h-full text-black bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:border-red-500 outline-none"
            />
            <p className={errorSlotClass}>{contactError ?? "\u00a0"}</p>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="font-body text-sm font-bold text-black">
              Phone Number
            </label>
            <input
              type="tel"
              inputMode="numeric"
              value={phone}
              onChange={(e) => {
                const digits = normalizePhone(e.target.value).slice(0, 10);
                setPhone(digits);
                if (phoneError) setPhoneError(validatePhone(digits));
              }}
              onBlur={() => setPhoneError(validatePhone(phone))}
              placeholder="10-Digit Mobile Number"
              autoComplete="tel"
              maxLength={10}
              className="w-full h-8 md:h-full text-black bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:border-red-500 outline-none"
            />
            <p className={errorSlotClass}>{phoneError ?? "\u00a0"}</p>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="font-body text-sm font-bold text-black">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                const v = e.target.value;
                setEmail(v);
                if (emailError) setEmailError(validateEmail(v));
              }}
              onBlur={() => setEmailError(validateEmail(email))}
              placeholder="Company@example.com"
              autoComplete="email"
              className="w-full h-8 md:h-full text-black bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:border-red-500 outline-none"
            />
            <p className={errorSlotClass}>{emailError ?? "\u00a0"}</p>
          </div>

          <div className="flex flex-col space-y-2 ">
            <label className="font-body text-sm font-bold text-black">
              Number Of Employees
            </label>
            <input
              type="text"
              inputMode="numeric"
              value={employees}
              onChange={(e) => {
                const v = e.target.value.replace(/\D/g, "");
                setEmployees(v);
                if (employeesError) setEmployeesError(validateEmployees(v));
              }}
              onBlur={() => setEmployeesError(validateEmployees(employees))}
              placeholder="e.g. 100"
              autoComplete="off"
              className="w-full h-8 md:h-full text-black bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:border-red-500 outline-none"
            />
            <p className={errorSlotClass}>{employeesError ?? "\u00a0"}</p>
          </div>

          <div className="flex flex-col justify-start pt-0 md:pt-6">
            <button
              type="submit"
              disabled={submitting || invalid}
              className="font-heading w-full h-10 md:h-14 bg-background-primary hover:bg-red-700 text-white font-black rounded-xl shadow-lg transition-all active:scale-95 disabled:opacity-60 disabled:pointer-events-none"
            >
              {submitting ? "Submitting..." : "Get In Touch!"}
            </button>
          </div>
        </form>

        {submitted && (
          <p className="text-green-600 mt-4 font-semibold">
            Thank you! We’ll get in touch shortly.
          </p>
        )}
        {error && <p className="text-red-600 mt-4 font-semibold">{error}</p>}
      </div>
    </div>
  );
}
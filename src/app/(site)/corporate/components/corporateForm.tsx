"use client";

import { useState } from "react";
import { ArrowRight, Building2, Mail, Phone, UserRound, Users } from "lucide-react";
import { FieldError, useLeadForm } from "@/components/forms/useLeadForm";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/contact";

const COMPANY_MIN_LENGTH = 2;
const COMPANY_MAX_LENGTH = 150;
const EMAIL_MAX_LENGTH = 254;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitizeCompanyName(value: string): string {
  return value.replace(/[^\p{L}\p{N}\p{M}\s.&,'\-()/+]/gu, "");
}

function validateCompanyName(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return "Company name is required.";
  if (trimmed.length < COMPANY_MIN_LENGTH) return `Company name must be at least ${COMPANY_MIN_LENGTH} characters.`;
  if (trimmed.length > COMPANY_MAX_LENGTH) return `Company name must be at most ${COMPANY_MAX_LENGTH} characters.`;
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

function Req() {
  return (
    <span className="text-dl-red" aria-hidden>
      *
    </span>
  );
}

/* DL.pen corporate "Get In Touch Card". The topic is "Corporate", with the
   company details beside it in `source`. */
export default function CorporateForm() {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [employees, setEmployees] = useState("");
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const { nameInput, phoneInput, nameError, phoneError, submitting, submitted, error, handleSubmit } = useLeadForm();

  /* Only the contact person and phone are required (checked by
     useLeadForm); the rest are checked when filled in. */
  const check = {
    company: () => (companyName.trim() ? validateCompanyName(companyName) : null),
    email: () => (email.trim() ? validateEmail(email) : null),
    employees: () => (employees.trim() ? validateEmployees(employees) : null),
  };

  /* No lead_intent: corporate leads are told apart by their topic. */
  const onSubmit = handleSubmit(() => {
    const next = Object.fromEntries(Object.entries(check).map(([k, fn]) => [k, fn()]));
    setErrors(next);
    if (Object.values(next).some(Boolean)) return null;
    return {
      source: {
        contact_topic: "Corporate",
        company_name: companyName.trim(),
        employees,
      },
      email: email.trim() || undefined,
    };
  });

  const box =
    "flex h-12 items-center gap-2.5 rounded-xl border border-dl-line bg-white px-3.5 focus-within:border-dl-red md:h-[46px]";
  const input = "min-w-0 flex-1 bg-transparent text-[15px] text-dl-ink outline-none placeholder:text-dl-muted md:text-sm";
  const label = "text-[13px] font-semibold text-dl-ink";
  const icon = "size-[18px] shrink-0 text-dl-muted";

  return (
    <div
      id="enquiry-form"
      className="flex flex-col gap-4 rounded-[24px] bg-white p-5 shadow-[0_30px_70px_rgba(0,0,0,0.25)] md:gap-[18px] md:rounded-[28px] md:p-8"
    >
      <div className="flex flex-col gap-1.5">
        <h2 className="font-display text-[22px] font-extrabold tracking-[-0.02em] text-dl-ink md:text-2xl">Get in touch</h2>
        <p className="text-[13.5px] leading-normal text-dl-ink-2 md:text-sm">
          <span className="md:hidden">Our corporate desk will call you back with a plan.</span>
          <span className="hidden md:inline">Tell us about your team, and our corporate desk will call you back with a plan.</span>
        </p>
      </div>

      {submitted ? (
        <p className="rounded-xl bg-dl-green/10 px-4 py-3 text-sm font-semibold text-dl-green" role="status">
          Thank you! Our corporate desk will call you shortly.
        </p>
      ) : (
        <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3">
          <label className="flex flex-col gap-1.5">
            <span className={label}>
              Company name
            </span>
            <span className={box}>
              <Building2 className={icon} aria-hidden />
              <input
                type="text"
                autoComplete="organization"
                value={companyName}
                onChange={(e) => setCompanyName(sanitizeCompanyName(e.target.value))}
                onBlur={() => companyName && setErrors((s) => ({ ...s, company: check.company() }))}
                placeholder="Your company name"
                className={input}
              />
            </span>
            <FieldError message={errors.company} />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className={label}>
              Contact person <Req />
            </span>
            <span className={box}>
              <UserRound className={icon} aria-hidden />
              <input {...nameInput} placeholder="Full name" className={input} />
            </span>
            <FieldError message={nameError} />
          </label>

          {/* Phone gets its own row; email and employees share one. */}
          <div className="grid gap-3">
            <label className="flex flex-col gap-1.5">
              <span className={label}>
                Phone number <Req />
              </span>
              <span className={box}>
                <span className="text-[15px] font-semibold text-dl-ink md:text-sm">+91</span>
                <span className="h-5 w-px bg-dl-line" aria-hidden />
                <input {...phoneInput} placeholder="10-digit mobile" className={input} />
              </span>
              <FieldError message={phoneError} />
            </label>

            <div className="grid grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-3">
              <label className="flex flex-col gap-1.5">
                <span className={label}>
                  Work email
                </span>
                <span className={box}>
                  <Mail className={icon} aria-hidden />
                  <input
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => email && setErrors((s) => ({ ...s, email: check.email() }))}
                    placeholder="you@company.com"
                    className={input}
                  />
                </span>
                <FieldError message={errors.email} />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className={label}>
                  Employees
                </span>
                <span className={box}>
                  <Users className={icon} aria-hidden />
                  <input
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    value={employees}
                    onChange={(e) => setEmployees(e.target.value.replace(/\D/g, ""))}
                    onBlur={() => employees && setErrors((s) => ({ ...s, employees: check.employees() }))}
                    placeholder="e.g. 100"
                    className={input}
                  />
                </span>
                <FieldError message={errors.employees} />
              </label>
            </div>
          </div>

          {error && (
            <p className="text-sm font-semibold text-dl-red" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-1 flex h-[52px] items-center justify-center gap-2 rounded-[14px] bg-dl-red text-base font-semibold text-white shadow-[0_8px_20px_rgba(217,45,39,0.25)] transition-colors hover:bg-dl-red-dark disabled:opacity-60"
          >
            {submitting ? "Sending…" : "Get in touch"}
            {!submitting && <ArrowRight className="size-[18px]" aria-hidden />}
          </button>
        </form>
      )}

      <p className="flex items-center justify-center gap-2 text-[13px] font-medium text-dl-ink-2">
        <Phone className="size-4 text-dl-muted" aria-hidden />
        Prefer to talk?{" "}
        <a href={PHONE_HREF} className="hover:text-dl-ink">
          Call {PHONE_DISPLAY}
        </a>
      </p>
    </div>
  );
}

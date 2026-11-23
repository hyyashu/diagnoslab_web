import { useState, type FormEvent } from "react";
import { submitLeadForm, type LeadIntent } from "@/lib/api";
import { attribution, istLabel } from "@/lib/attribution";
import { THANK_YOU_PATH, markLeadSubmitted } from "@/lib/leadConversion";
import { normalizePhone, sanitizeName, validateName, validatePhone } from "@/lib/leadValidation";

/* The one intent rule for every form: home collection asks for a visit;
   booking a specific test, package or scan sends no intent (as Book
   buttons always have); anything else is a general enquiry. */
export function leadIntent({ homeCollection = false, booking = false }): LeadIntent | undefined {
  if (homeCollection) return "book_home_collection";
  return booking ? undefined : "general_enquiry";
}

/* The booking chip reads "Book a test" in the sheet and "Book this
   package" on a detail page; the CRM gets one value for all of them. */
export const topicValue = (topic: string) => (/^Book /.test(topic) ? "Booking" : topic);

type Lead = {
  /* The form's own details, added to the attribution in `source`. */
  source: Record<string, unknown>;
  intent?: LeadIntent;
  /* Sent as the lead's own fields, not in `source`, so the lead message
     shows them on their own lines. */
  message?: string;
  email?: string;
};

/* State, validation and submission shared by every lead form. Each form
   keeps its own design: spread `nameInput` / `phoneInput` onto its inputs
   and render the errors where it likes. */
export function useLeadForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const nameInput = {
    type: "text",
    autoComplete: "name",
    value: name,
    onChange: (e: { target: { value: string } }) => {
      const v = sanitizeName(e.target.value);
      setName(v);
      if (nameError) setNameError(validateName(v));
    },
    onBlur: () => name && setNameError(validateName(name)),
  } as const;

  const phoneInput = {
    type: "tel",
    autoComplete: "tel-national",
    inputMode: "numeric",
    value: phone,
    onChange: (e: { target: { value: string } }) => {
      const digits = normalizePhone(e.target.value).slice(0, 10);
      setPhone(digits);
      if (phoneError) setPhoneError(validatePhone(digits));
    },
    onBlur: () => phone && setPhoneError(validatePhone(phone)),
  } as const;

  /* `build` runs after name and phone are checked. It can check the form's
     own fields and return null to stop; it returns the lead otherwise. */
  const handleSubmit =
    (build: () => Lead | null, onSuccess?: () => void) => async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError(null);
      const nErr = validateName(name);
      const pErr = validatePhone(phone);
      setNameError(nErr);
      setPhoneError(pErr);
      const lead = build();
      if (nErr || pErr || !lead) return;

      setSubmitting(true);
      try {
        await submitLeadForm({
          name: name.trim(),
          phone: normalizePhone(phone),
          ...(lead.email && { email: lead.email }),
          ...(lead.message && { message: lead.message }),
          source: { ...attribution(), ...lead.source, submitted_at: istLabel() },
          ...(lead.intent && { lead_intent: lead.intent }),
        });
        setName("");
        setPhone("");
        setSubmitted(true);
        onSuccess?.();
        /* The conversion is counted on the thank-you page (see
           lib/leadConversion). The form's own "Thank you" shows while it
           loads. */
        markLeadSubmitted();
        window.location.assign(THANK_YOU_PATH);
      } catch {
        setError("Something went wrong. Please try again.");
      } finally {
        setSubmitting(false);
      }
    };

  return { name, nameInput, phoneInput, nameError, phoneError, submitting, submitted, error, handleSubmit };
}

export function FieldError({ message }: { message?: string | null }) {
  return message ? <span className="text-xs text-dl-red">{message}</span> : null;
}

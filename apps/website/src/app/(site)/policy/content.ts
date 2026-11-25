import { EMAIL } from "@/lib/contact";

/* DL.pen "Policies" copy. */
export const LAST_UPDATED = "1 Oct 2026";

export const privacyIntro =
  'This policy explains what Diagnos Lab ("we", "us") collects when you book a test, visit a centre or use diagnoslab.in, why we need it, and the choices you have. It applies to all our centres in Jamshedpur and to home sample collection.';

export const inShort = [
  "We never sell your data. Not to insurers, pharma companies or advertisers, ever.",
  "Reports go only to you and the doctor you name. Family members need your consent.",
  "You can ask us to delete your account and contact details at any time.",
  "Samples are discarded safely within 7 days unless you ask us to store them.",
];

export type PolicySection = { id: string; title: string; text: string; bullets?: string[] };

export const privacySections: PolicySection[] = [
  {
    id: "what-we-collect",
    title: "What we collect",
    text: "When you book or visit, we collect your name, age, gender, phone number, address (for home collection) and the tests you've chosen. If you share a prescription, we store a copy with your booking.",
    bullets: [
      "Test results and reports generated from your samples",
      "Payment details, processed by our payment partner; we never store card numbers",
      "Basic device and usage data when you use our website, to keep it secure and working",
    ],
  },
  {
    id: "how-we-use-it",
    title: "How we use it",
    text: "We use your information only to run your tests and look after you as a patient:",
    bullets: [
      "Scheduling home collection and sending slot reminders on SMS / WhatsApp",
      "Processing samples and delivering your reports",
      "Answering your queries and resolving complaints",
      "Meeting legal duties, such as reporting notifiable diseases to health authorities",
    ],
  },
  {
    id: "who-we-share-it-with",
    title: "Who we share it with",
    text: "We share the minimum needed, and only with people bound to keep it confidential: the referring doctor you name, NABL-accredited partner labs for specialised tests, and service providers (SMS, payments, cloud storage) under written agreements. We disclose data to authorities only when the law requires it.",
  },
  {
    id: "data-retention",
    title: "How long we keep it",
    text: "Reports are kept for 5 years so you and your doctor can compare results over time. Booking and billing records are kept as required by tax law. You can request earlier deletion of your account and contact details, though some medical records may need to be retained by law.",
  },
  {
    id: "your-rights",
    title: "Your rights",
    text: `Under India's Digital Personal Data Protection Act, 2023, you can ask to access, correct or erase your personal data, withdraw consent, and name someone to act for you. Email ${EMAIL} or ask at any centre. We respond within 30 days.`,
  },
];

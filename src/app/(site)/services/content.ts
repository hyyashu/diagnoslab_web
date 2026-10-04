import { getPackages, getTests, pregnancyScans } from "@/lib/catalog";
import type { WhyPoint } from "@/components/sections/whyPoints";
import type { FaqItem } from "@/lib/faq";
import { HOURS_DISPLAY, PHONE_DISPLAY, ULTRASOUND_HOURS_DISPLAY } from "@/lib/contact";

/* Services page: every service we offer, grouped, each tile linking to the
   page that covers it. Echo and PFT have no page of their own yet, so they
   point at the radiology page. */

export type ServiceItem = { title: string; subtitle: string; icon: string; href: string };
export type ServiceGroup = { id: string; title: string; subtitle: string; items: ServiceItem[] };

const testCount = getTests().length;
const packageCount = getPackages().length;

const pregnancyItems: ServiceItem[] = pregnancyScans.map((s) => ({
  title: s.title,
  subtitle: s.when,
  icon: s.icon,
  href: `/ultrasound-in-jamshedpur/${s.slug}/`,
}));

export const serviceGroups: ServiceGroup[] = [
  {
    id: "lab",
    title: "Lab tests & health checkups",
    subtitle: "Blood and urine tests at any centre or at home, with reports on WhatsApp the same day.",
    items: [
      { title: "Blood & lab tests", subtitle: `${testCount} tests, from CBC to hormones`, icon: "flask-conical", href: "/tests/" },
      { title: "Health packages", subtitle: `${packageCount} full body & condition packages`, icon: "clipboard-list", href: "/packages/" },
      { title: "Home sample collection", subtitle: "Across Jamshedpur, slots from 6 AM", icon: "house", href: "/book-a-test/" },
      { title: "Corporate health checkups", subtitle: "Employee screening & tie-ups", icon: "building-2", href: "/corporate/" },
    ],
  },
  {
    id: "ultrasound",
    title: "Ultrasound (USG)",
    subtitle: "Done and reported by MD radiologists, with a female radiologist available. Reports in 1–2 hours.",
    items: [
      { title: "Ultrasound scans", subtitle: "Abdomen, pelvis, KUB, thyroid, breast", icon: "scan-line", href: "/ultrasound-in-jamshedpur/" },
      ...pregnancyItems,
    ],
  },
  {
    id: "imaging",
    title: "X-Ray, heart & lung tests",
    subtitle: "Walk in at our Sakchi centre. Reports in 1–2 hours.",
    items: [
      { title: "Digital X-Ray", subtitle: "Bones, chest, spine & joints", icon: "bone", href: "/xray/" },
      { title: "ECG", subtitle: "Heart rhythm, quick & painless", icon: "heart-pulse", href: "/ecg/" },
      { title: "2D ECHO", subtitle: "Ultrasound of the heart", icon: "activity", href: "/radiology/" },
      { title: "PFT", subtitle: "Lung capacity & airflow", icon: "wind", href: "/radiology/" },
    ],
  },
];

/* Options for the call-back form's Service select. */
export const serviceOptions = serviceGroups.flatMap((g) => g.items.map((i) => i.title));

export const servicesFaq: FaqItem[] = [
  {
    question: "What services does Diagnos Lab provide in Jamshedpur?",
    answer: `Blood and lab tests (${testCount} tests), ${packageCount} health packages, home sample collection, corporate health checkups, ultrasound including NT, growth and Doppler pregnancy scans, digital X-Ray, ECG, 2D ECHO and PFT.`,
  },
  {
    question: "Do I need an appointment?",
    answer: "No, walk-ins are welcome at our Sakchi centre, but booking ahead saves you time.",
  },
  {
    question: "What are your timings?",
    answer: `Our centres are open ${HOURS_DISPLAY}. Ultrasound is done ${ULTRASOUND_HOURS_DISPLAY}.`,
  },
  {
    question: "Is there a charge for home collection?",
    answer: "Yes. A home collection charge applies on top of the test price. Our team will tell you the exact amount when you book.",
  },
  {
    question: "How fast will I get my reports?",
    answer:
      "Most blood test reports are ready the same day, within 6 to 12 hours depending on the test. Ultrasound, X-Ray and ECG reports usually take 1–2 hours. Every report is sent to your WhatsApp automatically.",
  },
  {
    question: "How do I book?",
    answer: `Call ${PHONE_DISPLAY}, message us on WhatsApp, or fill in the call-back form on this page.`,
  },
];

export const servicesWhyPoints: WhyPoint[] = [
  { icon: "stethoscope", title: "Lab and imaging under one roof", text: "Blood tests, ultrasound, X-Ray, ECG, ECHO and PFT at one Sakchi centre." },
  { icon: "user-round-check", title: "MD radiologists", text: "Scans done and reported by experienced doctors, with a female radiologist available." },
  { icon: "clock-3", title: "Same-day reports", text: "Scans in 1–2 hours, most blood tests in 6–12 hours.", highlight: true },
  { icon: "house", title: "Home sample collection", text: "Trained phlebotomists collect samples at your doorstep across Jamshedpur." },
  { icon: "message-circle", title: "Reports on WhatsApp", text: "Every report is sent to your WhatsApp automatically once ready." },
];

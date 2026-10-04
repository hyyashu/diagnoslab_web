import type { FaqItem } from "@/lib/faq";
import { areas } from "@/lib/catalog";
import { PHONE_DISPLAY } from "@/lib/contact";

/* Book a Test FAQ from DL.pen. */
export const bookingFaq: FaqItem[] = [
  {
    question: "How do I book a test?",
    answer: `Call ${PHONE_DISPLAY}, message us on WhatsApp, or fill in the call-back form. We'll confirm your test, price and collection slot on the same call.`,
  },
  {
    question: "Is there a charge for home collection?",
    answer: "Yes. A home collection charge applies on top of the test price. Our team will tell you the exact amount when you book.",
  },
  {
    question: "Do I need to fast before my blood test?",
    answer:
      "Only for some tests. Fasting blood sugar and full body packages need 10–12 hours of overnight fasting (water is allowed), while tests like CBC, HbA1c and TSH need none. We'll tell you when you book.",
  },
  {
    question: "How fast will I get my reports?",
    answer:
      "Most blood test reports are ready the same day, within 6 to 12 hours depending on the test, and sent to your WhatsApp automatically. Ultrasound and ECG reports usually take 1–2 hours.",
  },
  {
    question: "Can I send my prescription on WhatsApp?",
    answer: `Yes. Send a clear photo of your prescription to ${PHONE_DISPLAY} on WhatsApp and we'll tell you the exact tests, the total price and the earliest collection slot.`,
  },
  {
    question: "Which areas do you cover for home collection?",
    answer: `We collect samples at home across Jamshedpur, including ${areas.map((a) => a.name).join(", ")} and Adityapur. Don't see your area? Call us, we likely cover it.`,
  },
];

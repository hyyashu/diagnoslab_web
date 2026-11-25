/* FAQ content. The visible accordion and the FAQPage JSON-LD both read
   from here, so what search engines are promised is what the page shows. */

/* Area lists come from the data file (1 KB, safe in the client bundle that
   the accordion pulls this module into). The test and package catalogues
   are far larger, so the prices below are written out: keep them in step
   with src/data/tests.json and packages.json. */
import areaData from "@/data/areasServed.json";
import { PHONE_DISPLAY, WHATSAPP_DISPLAY } from "@/lib/contact";

const areaNames = areaData.areas.map((area) => area.name);
const listOf = (names: string[]) => `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;

export type FaqItem = {
  question: string;
  answer: string;
  /* Shorter wording for phones, where the design trims some questions. */
  mobileQuestion?: string;
  /* Leave off the phone layout, which shows fewer questions. */
  desktopOnly?: boolean;
};

export const generalFaq: FaqItem[] = [
  { question: "How fast will I get my reports?", answer: "Most reports are delivered within 6 to 12 hours depending on the test type." },
  { question: "Do you provide home sample collection?", answer: "Yes, we offer professional home collection services across Jamshedpur including Sakchi, Bistupur, Mango, Kadma, Jugsalai, and surrounding areas." },
  { question: "Do I need an appointment?", answer: "No, walk-ins are welcome at our Sakchi centre, but booking ahead saves you time." },
  { question: "Are reports digital?", answer: "Yes. Every report is sent to your WhatsApp automatically as soon as it's ready. No app, login or follow-up call needed." },
  { question: "What services do you provide in Jamshedpur?", answer: "Diagnos Lab in Jamshedpur offers blood tests, ultrasound (USG), ECG, digital X-Ray, PFT, and affordable health packages with home sample collection." },
  { question: "Where is Diagnos Lab located in Jamshedpur?", answer: `Diagnos Lab is located in Sakchi, Jamshedpur, Jharkhand. We also serve ${listOf(areaNames.filter((name) => name !== "Sakchi"))}.` },
  { question: "How much does a blood test cost at Diagnos Lab?", answer: `Blood tests at Diagnos Lab start from ₹60 for blood sugar. A CBC is ₹320 and a TSH (thyroid) test is ₹250. Health packages start from ₹550, and the ND Plus full body checkup with 75 parameters is ₹2,500. Call ${PHONE_DISPLAY} for the price of any other test.` },
  { question: "Is there a female radiologist for ultrasound at Diagnos Lab?", answer: "Yes, Diagnos Lab has an experienced female radiologist available for all ultrasound (USG) examinations including pregnancy scans, anomaly scans, pelvis, and abdomen ultrasounds." },
  { question: "How do I book a home sample collection in Jamshedpur?", answer: `You can book home collection by calling ${PHONE_DISPLAY}, messaging on WhatsApp at ${WHATSAPP_DISPLAY}, or filling the enquiry form on our website. A trained phlebotomist will visit your home at the scheduled time.` },
  { question: "What areas in Jamshedpur does Diagnos Lab cover for home collection?", answer: `We cover ${listOf(areaNames)}.` },
  { question: "What is the turnaround time for ultrasound reports at Diagnos Lab?", answer: "Ultrasound reports at Diagnos Lab are available within 1–2 hours of the scan." },
  { question: "Is Diagnos Lab open on Sundays?", answer: "Yes, Diagnos Lab is open 7 days a week including Sundays and public holidays, from 7:30 AM to 7:30 PM. Ultrasound scans are done Monday to Saturday." },
  { question: "Does Diagnos Lab provide ECG services?", answer: "Yes, Diagnos Lab provides 12-lead ECG (electrocardiogram) tests for heart rhythm and electrical activity analysis. Reports are available within 1–2 hours." },
  { question: "What health packages does Diagnos Lab offer?", answer: "Diagnos Lab offers several health packages including ND Plus (comprehensive full body checkup), Bio-T Plus (thyroid and metabolic panel), and disease-specific panels for diabetes, anaemia, arthritis, and antenatal care." },
  { question: "Can I get my reports on WhatsApp?", answer: "Yes. All reports are sent to your WhatsApp automatically as soon as they're ready, within the committed turnaround time." },
];

const byQuestion = (q: string) => generalFaq.find((f) => f.question === q)!.answer;

export const radiologyFaq: FaqItem[] = [
  {
    question: "Is there a female radiologist for ultrasound at Diagnos Lab?",
    mobileQuestion: "Is there a female radiologist for ultrasound?",
    answer:
      "Yes. A dedicated female radiologist (MD Radiology) is available for female patients. Mention it when you book and we'll schedule your slot accordingly.",
  },
  {
    question: "What is the turnaround time for ultrasound reports?",
    answer: byQuestion("What is the turnaround time for ultrasound reports at Diagnos Lab?"),
  },
  {
    question: "Do I need an appointment for an X-Ray or ECG?",
    answer: byQuestion("Do I need an appointment?"),
  },
  {
    question: "Is Diagnos Lab open on Sundays?",
    answer: byQuestion("Is Diagnos Lab open on Sundays?"),
  },
  {
    question: "Can I get my reports on WhatsApp?",
    answer: byQuestion("Can I get my reports on WhatsApp?"),
  },
  {
    question: "Where is Diagnos Lab located in Jamshedpur?",
    answer: byQuestion("Where is Diagnos Lab located in Jamshedpur?"),
    desktopOnly: true,
  },
];

/* Answers come from the ultrasound page's own copy (preparation and what to
   expect) and the general FAQ, so nothing here is new information. */
export const ultrasoundFaq: FaqItem[] = [
  {
    question: "Is there a female radiologist for ultrasound at Diagnos Lab?",
    mobileQuestion: "Is there a female radiologist for ultrasound?",
    answer:
      "Yes. A dedicated female radiologist (MD Radiology) is available for female patients. Mention it when you book and we'll schedule your slot accordingly.",
  },
  {
    question: "What is the turnaround time for ultrasound reports?",
    answer: byQuestion("What is the turnaround time for ultrasound reports at Diagnos Lab?"),
  },
  {
    question: "Do I need to fast before an ultrasound?",
    answer:
      "For abdomen scans, avoid food for 6–8 hours. Clear fluids are usually allowed unless advised otherwise. Pelvic and some KUB scans need a full bladder instead; most other scans need no special preparation.",
  },
  {
    question: "Is ultrasound available on Sundays?",
    answer:
      "No. Ultrasound scans are done Monday to Saturday, 7:30 AM to 7:30 PM. Blood tests and home sample collection run every day, including Sundays.",
  },
  {
    question: "Do you tell the baby's sex during a pregnancy scan?",
    answer:
      "No. Sex determination of the foetus is not done at Diagnos Lab; it is illegal and punishable under the PC-PNDT Act, 1994. Our pregnancy scans check your baby's development and health only.",
  },
  {
    question: "Is ultrasound safe during pregnancy?",
    answer: "Yes. Ultrasound is painless, non-invasive and uses no radiation. It is safe for all ages including pregnancy.",
  },
  {
    question: "How long does an ultrasound scan take?",
    answer:
      "A gel is applied to the skin and a probe is moved over the area being examined. The scan usually takes 15–30 minutes.",
  },
  {
    question: "Can I get my ultrasound report on WhatsApp?",
    answer: byQuestion("Can I get my reports on WhatsApp?"),
    desktopOnly: true,
  },
];

const reuse = (question: string, from = question, extra: Partial<FaqItem> = {}): FaqItem => ({
  question,
  answer: byQuestion(from),
  ...extra,
});

export const ecgFaq: FaqItem[] = [
  reuse("Does Diagnos Lab provide ECG services?"),
  reuse("Do I need an appointment for an ECG?", "Do I need an appointment?"),
  reuse("Is Diagnos Lab open on Sundays?"),
  reuse("Can I get my reports on WhatsApp?"),
  reuse("Where is Diagnos Lab located in Jamshedpur?", undefined, { desktopOnly: true }),
];

export const xrayFaq: FaqItem[] = [
  reuse("Do I need an appointment for an X-Ray?", "Do I need an appointment?"),
  reuse("What services do you provide in Jamshedpur?"),
  reuse("Is Diagnos Lab open on Sundays?"),
  reuse("Can I get my reports on WhatsApp?"),
  reuse("Where is Diagnos Lab located in Jamshedpur?", undefined, { desktopOnly: true }),
];

export const labTestsFaq: FaqItem[] = [
  {
    question: "How fast will I get my reports?",
    answer: "Most reports are delivered within 6 to 12 hours depending on the test type, and sent to your WhatsApp automatically.",
  },
  reuse("Do you provide home sample collection?"),
  {
    question: "Do I need to fast before a blood test?",
    answer:
      "Only for some tests. Blood Sugar Fasting, for example, needs overnight fasting, while tests like CBC need none. Each test card shows whether fasting is needed.",
  },
  reuse("Do I need an appointment?"),
  reuse("How much does a blood test cost at Diagnos Lab?"),
  reuse("Where is Diagnos Lab located in Jamshedpur?", undefined, { desktopOnly: true }),
];

export const packagesFaq: FaqItem[] = [
  {
    question: "Which health package should I choose?",
    answer:
      "For a routine yearly checkup, ND Plus covers most essentials. Choose ND Max Plus for a more detailed check, or a focused panel like PCOD or Diabetes if your doctor advised it.",
  },
  {
    question: "Do I need to fast before a full body checkup?",
    answer:
      "Yes. ND Plus, ND Max Plus, BIO T Plus and BIO T D Plus need overnight fasting of 10–12 hours. Water is allowed.",
  },
  reuse("Do you provide home sample collection for packages?", "Do you provide home sample collection?"),
  reuse("How fast will I get my package reports?", "How fast will I get my reports?"),
  {
    question: "Can I customise a health package?",
    answer: "Yes. Call us or message us on WhatsApp with the tests you need, and our team will help you put them together.",
  },
  reuse("Where is Diagnos Lab located in Jamshedpur?", undefined, { desktopOnly: true }),
];

/* FAQ content. The visible accordion and the FAQPage JSON-LD both read
   from here, so what search engines are promised is what the page shows. */

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
  { question: "Are reports digital?", answer: "Yes, all reports are available digitally via our portal and delivered on WhatsApp and email." },
  { question: "What services do you provide in Jamshedpur?", answer: "Diagnos Lab in Jamshedpur offers blood tests, ultrasound (USG), ECG, digital X-Ray, PFT, and affordable health packages with home sample collection." },
  { question: "Where is Diagnos Lab located in Jamshedpur?", answer: "Diagnos Lab is located in Sakchi, Jamshedpur, Jharkhand. We also serve Bistupur, Mango, Kadma, Jugsalai, Adityapur, Golmuri, Telco, and Baridih." },
  { question: "How much does a blood test cost at Diagnos Lab?", answer: "Blood tests at Diagnos Lab start from ₹99. Most common tests like CBC, thyroid, and blood sugar fall between ₹150–₹500. Full body health packages are available from ₹999. Call +91 8404802214 for specific test pricing." },
  { question: "Is there a female radiologist for ultrasound at Diagnos Lab?", answer: "Yes, Diagnos Lab has an experienced female radiologist available for all ultrasound (USG) examinations including pregnancy scans, anomaly scans, pelvis, and abdomen ultrasounds." },
  { question: "How do I book a home sample collection in Jamshedpur?", answer: "You can book home collection by calling or messaging on WhatsApp at +91 8404802214, or filling the enquiry form on our website. A trained phlebotomist will visit your home at the scheduled time." },
  { question: "What areas in Jamshedpur does Diagnos Lab cover for home collection?", answer: "We cover Sakchi, Bistupur, Mango, Kadma, Jugsalai, Agrico, Golmuri, Telco, Baridih, Sonari, Adityapur, Baradwari, Ambagan, Dimna, Birsanagar, Namda Basti, and Parsudih." },
  { question: "What is the turnaround time for ultrasound reports at Diagnos Lab?", answer: "Ultrasound reports at Diagnos Lab are available within 1–2 hours of the scan." },
  { question: "Is Diagnos Lab open on Sundays?", answer: "Yes, Diagnos Lab is open 7 days a week including Sundays and public holidays, from 7:30 AM to 7:30 PM." },
  { question: "Does Diagnos Lab provide ECG services?", answer: "Yes, Diagnos Lab provides 12-lead ECG (electrocardiogram) tests for heart rhythm and electrical activity analysis. Reports are available within 1–2 hours." },
  { question: "What health packages does Diagnos Lab offer?", answer: "Diagnos Lab offers several health packages including ND Plus (comprehensive full body checkup), Bio-T Plus (thyroid and metabolic panel), and disease-specific panels for diabetes, anaemia, arthritis, and antenatal care." },
  { question: "Can I get my reports on WhatsApp?", answer: "Yes, all digital reports are delivered on WhatsApp and email within the committed turnaround time." },
];

const byQuestion = (q: string) => generalFaq.find((f) => f.question === q)!.answer;

export const radiologyFaq: FaqItem[] = [
  {
    question: "Is there a female radiologist for ultrasound at Diagnos Lab?",
    mobileQuestion: "Is there a female radiologist for ultrasound?",
    answer:
      "Yes. A dedicated female radiologist is available for female patients. Mention it when you book and we'll schedule your slot accordingly.",
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
      "Yes. A dedicated female radiologist is available for female patients. Mention it when you book and we'll schedule your slot accordingly.",
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
    answer: "Most reports are delivered within 6 to 12 hours depending on the test type, and shared on WhatsApp.",
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

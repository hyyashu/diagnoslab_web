import JsonLd from "./JsonLd";

const faqItems = [
  {
    question: "How fast will I get my reports?",
    answer: "Most reports are delivered within 6 to 12 hours depending on the test type.",
  },
  {
    question: "Do you provide home sample collection?",
    answer: "Yes, we offer professional home collection services across Jamshedpur including Sakchi, Bistupur, Mango, Kadma, Jugsalai, and surrounding areas.",
  },
  {
    question: "Do I need an appointment?",
    answer: "No, walk-ins are welcome at our Sakchi centre, but booking ahead saves you time.",
  },
  {
    question: "Are reports digital?",
    answer: "Yes, all reports are available digitally via our portal and delivered on WhatsApp and email.",
  },
  {
    question: "What services do you provide in Jamshedpur?",
    answer: "Diagnos Lab in Jamshedpur offers blood tests, ultrasound (USG), ECG, digital X-Ray, PFT, and affordable health packages with home sample collection.",
  },
  {
    question: "Where is Diagnos Lab located in Jamshedpur?",
    answer: "Diagnos Lab is located in Sakchi, Jamshedpur, Jharkhand. We also serve Bistupur, Mango, Kadma, Jugsalai, Adityapur, Golmuri, Telco, and Baridih.",
  },
];

export default function FaqJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return <JsonLd data={schema} />;
}

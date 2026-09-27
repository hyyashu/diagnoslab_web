'use client';

import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';

// --- Data ---
const faqData = [
  { question: "How fast will I get my reports?", answer: "Most reports are delivered within 6 to 12 hours depending on the test type." },
  { question: "Do you provide home sample collection?", answer: "Yes, we offer professional home collection services across Jamshedpur including Sakchi, Bistupur, Mango, Kadma, Jugsalai, and surrounding areas." },
  { question: "Do I need an appointment?", answer: "No, walk-ins are welcome at our Sakchi centre, but booking ahead saves you time." },
  { question: "Are reports digital?", answer: "Yes, all reports are available digitally via our portal and delivered on WhatsApp and email." },
  { question: "What services do you provide in Jamshedpur?", answer: "Diagnos Lab in Jamshedpur offers blood tests, ultrasound (USG), ECG, digital X-Ray, PFT, and affordable health packages with home sample collection." },
  { question: "Where is Diagnos Lab located in Jamshedpur?", answer: "Diagnos Lab is located in Sakchi, Jamshedpur, Jharkhand. We also serve Bistupur, Mango, Kadma, Jugsalai, Adityapur, Golmuri, Telco, and Baridih." },
  { question: "How much does a blood test cost at Diagnos Lab?", answer: "Blood tests at Diagnos Lab start from ₹99. Most common tests like CBC, thyroid, and blood sugar fall between ₹150–₹500. Full body health packages are available from ₹999. Call +91 8404802201 for specific test pricing." },
  { question: "Is there a female radiologist for ultrasound at Diagnos Lab?", answer: "Yes, Diagnos Lab has an experienced female radiologist available for all ultrasound (USG) examinations including pregnancy scans, anomaly scans, pelvis, and abdomen ultrasounds." },
  { question: "How do I book a home sample collection in Jamshedpur?", answer: "You can book home collection by calling +91 8404802201, messaging on WhatsApp at +91 8404802214, or filling the enquiry form on our website. A trained phlebotomist will visit your home at the scheduled time." },
  { question: "What areas in Jamshedpur does Diagnos Lab cover for home collection?", answer: "We cover Sakchi, Bistupur, Mango, Kadma, Jugsalai, Agrico, Golmuri, Telco, Baridih, Sonari, Adityapur, Baradwari, Ambagan, Dimna, Birsanagar, Namda Basti, and Parsudih." },
  { question: "What is the turnaround time for ultrasound reports at Diagnos Lab?", answer: "Ultrasound reports at Diagnos Lab are available within 1–2 hours of the scan." },
  { question: "Is Diagnos Lab open on Sundays?", answer: "Yes, Diagnos Lab is open 7 days a week including Sundays and public holidays, from 7:30 AM to 8:00 PM." },
  { question: "Does Diagnos Lab provide ECG services?", answer: "Yes, Diagnos Lab provides 12-lead ECG (electrocardiogram) tests for heart rhythm and electrical activity analysis. Reports are available within 1–2 hours." },
  { question: "What health packages does Diagnos Lab offer?", answer: "Diagnos Lab offers several health packages including ND Plus (comprehensive full body checkup), Bio-T Plus (thyroid and metabolic panel), and disease-specific panels for diabetes, anaemia, arthritis, and antenatal care." },
  { question: "Can I get my reports on WhatsApp?", answer: "Yes, all digital reports are delivered on WhatsApp and email within the committed turnaround time. You can also access reports through our patient portal." },
];

/* DL.pen "FAQ Item" list. The questions match FaqJsonLd, which promises
   them to search engines, so they stay as they are. */
export default function FAQAccordion() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section aria-labelledby="faq-heading" className="bg-white py-10 md:py-24">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-[18px] px-4 md:flex-row md:gap-16 md:px-10 xl:px-20">
        <h2
          id="faq-heading"
          className="font-display text-[22px] font-extrabold tracking-[-0.03em] text-dl-ink md:w-[380px] md:shrink-0 md:text-[38px] md:leading-[1.1]"
        >
          Questions, answered
        </h2>

        <div className="flex flex-1 flex-col gap-2.5">
          {faqData.map((item, index) => {
            const isOpen = activeIndex === index;

            return (
              <div
                key={index}
                className={`rounded-2xl border bg-white transition-colors ${
                  isOpen ? "border-dl-red" : "border-dl-line"
                }`}
              >
                <button
                  onClick={() => setActiveIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-3 px-[18px] py-[18px] text-left md:px-6"
                >
                  <span className="flex-1 font-display text-[15px] font-bold text-dl-ink md:text-base">
                    {item.question}
                  </span>
                  <span
                    className={`flex size-7 shrink-0 items-center justify-center rounded-full transition-colors ${
                      isOpen ? "bg-dl-red text-white" : "bg-dl-bg text-dl-ink"
                    }`}
                  >
                    {isOpen ? <Minus className="size-4" aria-hidden /> : <Plus className="size-4" aria-hidden />}
                  </span>
                </button>

                {/* Answers stay in the HTML (the FAQ schema promises them);
                    the 0fr -> 1fr grid row animates height to auto. */}
                <div
                  aria-hidden={!isOpen}
                  className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="overflow-hidden">
                    <p className="px-[18px] pb-[18px] text-[13.5px] leading-relaxed text-dl-ink-2 md:px-6 md:text-[15px]">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

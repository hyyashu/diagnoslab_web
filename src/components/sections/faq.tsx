'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

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

export default function FAQAccordion() {
  const [activeIndex, setActiveIndex] = useState<number | null>(4);

  return (

    <div className="w-full bg-white px-6">
      <div className="max-w-6xl mx-auto py-8">
        <h2 className="font-heading text-2xl md:text-4xl md:mt-6 font-extrabold text-center mb-8  text-black uppercase">
          FAQ
        </h2>

        <div className="flex flex-col gap-3">
          {faqData.map((item, index) => {
            const isOpen = activeIndex === index;

            return (
              <div
                key={index}
                className="bg-white border border-slate-200 rounded-[1.5rem] shadow-sm transition-all duration-200"
              >
                <button
                  onClick={() => setActiveIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between px-10 py-3 text-left focus:outline-none group"
                >
                  <span className="font-heading text-sm font-body md:text-base font-bold text-black py-1">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-slate-600' : ''}`}
                  />
                </button>

                {/* Answers stay in the HTML (the FAQ schema promises them);
                    the 0fr -> 1fr grid row animates height to auto. */}
                <div
                  aria-hidden={!isOpen}
                  className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="overflow-hidden">
                    <div className="px-10 pb-4 font-medium text-sm font-body text-gray-700 leading-relaxed">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
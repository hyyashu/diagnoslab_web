'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Data ---
const faqData = [
  { question: "How fast will I get my reports?", answer: "Most reports are delivered within 6 to 12 hours depending on the test type." },
  { question: "Do you provide home sample collection?", answer: "Yes, we offer professional home collection services at your convenience." },
  { question: "Do I need an appointment?", answer: "No, walk-ins are welcome, but booking ahead saves you time." },
  { question: "Are reports digital?", answer: "Yes, all reports are available digitally via our portal and email." },
  { 
    question: "What services do you provide in Jamshedpur?", 
    answer: "Diagnos Lab offers complete pathology and radiology services in Jamshedpur." 
  },
];

export default function FAQAccordion() {
  const [activeIndex, setActiveIndex] = useState<number | null>(4);

  return (
   
    <div className="w-full bg-white px-6">
      <div className="max-w-6xl mx-auto py-8"> 
        <h2 className="font-heading text-2xl md:text-4xl font-extrabold text-center mb-8  text-black uppercase">
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
                  className="w-full flex items-center justify-between px-10 py-3 text-left focus:outline-none group"
                >
                  <span className="font-heading text-sm font-body md:text-base font-bold text-black py-1">
                    {item.question}
                  </span>
                  <ChevronDown 
                    className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-slate-600' : ''}`} 
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                    >
                      <div className="px-10 pb-4 font-medium text-sm font-body text-slate-500 leading-relaxed">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
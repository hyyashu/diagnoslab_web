"use client";

import { useState } from "react";
import Modal from "./modal";
import EnquiryForm from "./enquiryForm";


interface Step {
  id: number;
  title: string;
  description: string;
}

interface CardProps {
  title: string;
  steps: Step[];
  buttonText: string;
  onButtonClick: () => void;
}


const InfoCard = ({
  title,
  steps,
  buttonText,
  onButtonClick,
}: CardProps) => {
  return (
    <div className="bg-white rounded-[2.5rem] p-8 md:p-10 lg:p-12 flex flex-col h-full shadow-xl">
      
      {/* Title */}
      <h3 className="text-2xl md:text-3xl font-bold text-black mb-6 md:mb-8">
        {title}
      </h3>

      {/* Steps */}
      <div className="flex-grow space-y-8">
        {steps.map((step) => (
          <div key={step.id} className="flex gap-5 items-start">
            
            <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-background-primary flex items-center justify-center text-white font-bold">
              {step.id}
            </div>

            <div>
              <h4 className="font-bold text-black text-sm md:text-lg">
                Step {step.id}: {step.title}
              </h4>
              <p className="text-gray-700 text-sm md:text-base mt-2">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Button */}
      <div className="mt-10">
        <button
          onClick={onButtonClick}
          className="w-full sm:w-fit bg-background-primary hover:bg-red-700 text-white font-bold py-4 px-8 rounded-2xl transition-all active:scale-95"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};


export default function HowItWorks() {
  const [isOpen, setIsOpen] = useState(false);

  const labVisitSteps: Step[] = [
    { id: 1, title: "Visit the lab", description: "Walk in or arrive at your appointment time." },
    { id: 2, title: "Test by Experts", description: "Our trained technicians perform your test." },
    { id: 3, title: "Get Reports on WhatsApp", description: "Digital reports are shared directly on your phone." },
  ];

  const homeCollectionSteps: Step[] = [
    { id: 1, title: "Book Home Collection", description: "Submit the form or call with your address." },
    { id: 2, title: "Sample Collected at Home", description: "Our phlebotomist visits you." },
    { id: 3, title: "Testing at Lab", description: "Samples processed using modern equipment." },
    { id: 4, title: "Reports on WhatsApp", description: "Reports shared digitally once ready." },
  ];

  return (
    <>
      <section className="bg-background-primary py-6 md:py-12 mb-2 md:mb-6 px-4 flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          
          {/* Heading */}
          <h2 className="text-2xl md:text-4xl font-extrabold text-center text-white mb-12">
            How It Works
          </h2>

          {/* Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            <InfoCard
              title="Lab Visit"
              steps={labVisitSteps}
              buttonText="Get An Appointment"
              onButtonClick={() => setIsOpen(true)}
            />

            <InfoCard
              title="Home Collection"
              steps={homeCollectionSteps}
              buttonText="Book Home Collection"
              onButtonClick={() => setIsOpen(true)}
            />
          </div>
        </div>
      </section>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <EnquiryForm /> 
      </Modal>
    </>
  );
}
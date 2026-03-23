
interface Step {
  id: number;
  title: string;
  description: string;
}

interface CardProps {
  title: string;
  steps: Step[];
  buttonText: string;
}

const InfoCard = ({ title, steps, buttonText }: CardProps) => (
  <div className="bg-white rounded-[2.5rem] p-8 md:p-10 lg:p-12 flex flex-col h-full shadow-xl">
    {/* Card Title */}
    <h3 className="text-2xl md:text-3xl font-bold text-black mb-6 md:mb-8 tracking-tight">
      {title}
    </h3>
    
    {/* Steps List */}
    <div className="flex-grow space-y-8">
      {steps.map((step) => (
        <div key={step.id} className="flex gap-5 items-start group">
          {/* Step Number Circle */}
          <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-background-primary flex items-center justify-center text-white font-bold text-lg shadow-sm">
            {step.id}
          </div>
          
          {/* Step Content */}
          <div className="flex flex-col">
            <h4 className="font-heading font-bold text-black text-sm md:text-lg leading-tight">
              Step {step.id}: {step.title}
            </h4>
            <p className="font-body text-gray-500 text-sm md:text-base mt-2 ">
              {step.description}
            </p>
          </div>
        </div>
      ))}
    </div>

    {/* Action Button */}
    <div className="mt-10">
      <button className="font-heading w-full sm:w-fit bg-background-primary hover:bg-red-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-200 transform active:scale-95 shadow-md">
        {buttonText}
      </button>
    </div>
  </div>
);

/**
 * MAIN COMPONENT: HowItWorks
 */
export default function HowItWorks() {
  const labVisitSteps: Step[] = [
    { id: 1, title: "Visit the lab", description: "Walk in or arrive at your appointment time." },
    { id: 2, title: "Test by Experts", description: "Our trained technicians perform your test." },
    { id: 3, title: "Get Reports on WhatsApp", description: "Digital reports are shared directly on your phone." },
  ];

  const homeCollectionSteps: Step[] = [
    { id: 1, title: "Book Home Collection", description: "Submit the form or call with your address." },
    { id: 2, title: "Sample Collected at Home", description: "Our phlebotomist visits you (from 6 AM onwards)." },
    { id: 3, title: "Testing at Lab", description: "Samples processed using modern equipment." },
    { id: 4, title: "Reports on WhatsApp", description: "Reports shared digitally once ready." },
  ];

  return (
    <section className="bg-background-primary py-6 md:py-12 px-4 sm:px-6 lg:px-8  flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Heading */}
        <h2 className="font-heading text-2xl md:text-4xl font-extrabold font-black text-center text-white mb-12 md:mb-16 ">
          How It Works
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:max-w-2xl lg:max-w-none mx-auto items-stretch">
          <InfoCard 
            title="Lab Visit" 
            steps={labVisitSteps} 
            buttonText="Get An Appointment" 
          />
          <InfoCard 
            title="Home Collection" 
            steps={homeCollectionSteps} 
            buttonText="Book Home Collection" 
          />
        </div>
      </div>
    </section>
  );
}
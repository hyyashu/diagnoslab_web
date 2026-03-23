"use client";

type ContactCardProps = {
  title: string;
  subtitle: string;
  phoneNumbers: string[];
  email: string;
  buttonText: string;
};

export default function ContactCard({
  title,
  subtitle,
  phoneNumbers,
  email,
  buttonText,
}: ContactCardProps) {
  return (
    <div className="bg-white text-black rounded-xl p-6 shadow-md text-center md:text-left">
      <h3 className="font-heading font-semibold text-2xl">{title}</h3>
      <p className="font-body text-base text-black mt-1">{subtitle}</p>

      <div className="my-8" />

      {/* Phone */}
      <div className="space-y-1 text-sm md:text-base ">
        <p className="font-medium font-heading">Call / WhatsApp</p>
        {phoneNumbers.map((num, i) => (
          <p key={i} className="font-body">{num}</p>
        ))}
      </div>

      <div className="my-4" />

      {/* Email */}
      <div className="space-y-1 text-sm md:text-base">
        <p className="font-medium font-heading">Email Us</p>
        <p className="font-body">{email}</p>
      </div>

      <button className="mt-6 w-full bg-background-primary text-white py-2 rounded-lg hover:bg-red-500 transition font-heading font-bold text-lg">
        {buttonText}
      </button>
    </div>
  );
}
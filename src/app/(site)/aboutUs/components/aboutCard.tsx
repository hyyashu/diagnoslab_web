"use client";
import Image from "next/image";

type AboutCardProps = {
  title: string;
  description: string | string[];
  image: string;
  reverse?: boolean;
  /* The first card on a page carries its h1; the rest stay h2. */
  as?: "h1" | "h2";
};

export default function AboutCard({
  title,
  description,
  image,
  reverse = false,
  as: Heading = "h2",
}: AboutCardProps) {
  return (
    <div
      className={`flex flex-col md:flex-row items-center gap-6 md:gap-10 
      bg-white rounded-3xl p-10 md:p-8 mb-10
      shadow-[0_10px_30px_rgba(0,0,0,0.08)]`}
    >
      {/* TEXT */}
      <div
        className={`flex-1 ${reverse ? "md:order-2" : "md:order-1"
          }`}
      >
        <Heading className="font-heading text-black text-2xl md:text-4xl font-extrabold mb-4 md:mb-6">
          {title}
        </Heading>

        {Array.isArray(description) ? (
          <ul className="font-body list-disc pl-5 space-y-1 text-gray-700 text-sm md:text-base">
            {description.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="font-body text-gray-700 leading-relaxed text-sm md:text-base whitespace-pre-line">
            {description}
          </p>
        )}
      </div>

      {/* IMAGE */}
      <div
        className={`w-full md:w-[300px] h-[200px] flex-shrink-0 ${reverse ? "md:order-1" : "md:order-2"
          }`}
      >
        <Image
          src={image}
          alt={title}
          width={300}
          height={200}
          className="rounded-2xl object-cover w-full h-full"
        />
      </div>
    </div>
  );
}
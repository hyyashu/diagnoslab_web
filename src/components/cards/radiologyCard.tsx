import Link from "next/link";
import BookButton from "@/components/cards/bookButton";

interface RadiologyCardProps {
  title: string;
  description: string;
  uses: string[];
  footerNote: string;
  href?: string;
}

interface leadMetaProps {
  [key: string]: unknown;
  radiology_name: string;
  radiology_description: string;
  radiology_uses: string[];
  radiology_footer_note: string;
}

export default function RadiologyCard({
  title,
  description,
  uses,
  footerNote,
  href,
}: RadiologyCardProps) {
  const leadMeta: leadMetaProps = {
    radiology_name: title,
    radiology_description: description,
    radiology_uses: uses,
    radiology_footer_note: footerNote,
  };
  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-gray-100 h-full flex flex-col">

      <h3 className="font-heading text-base md:text-xl font-bold text-black mb-4">
        {title}
      </h3>

      <p className="font-body font-semibold text-sm md:text-base text-black mb-4">
        {description}
      </p>

      <div className="mb-6">
        <p className="font-body text-black text-xs md:text-sm mb-3 font-medium">
          Used for:
        </p>

        <ul className="space-y-2">
          {uses.map((item, index) => (
            <li
              key={index}
              className="flex items-start font-body text-black text-xs md:text-sm"
            >
              <span className="mr-1 md:mr-2 mt-1.5 w-1.5 h-1.5 bg-black rounded-full shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <p className="font-body text-xs md:text-sm text-black mt-auto mb-6">
        {footerNote}
      </p>

      <div className="flex flex-col gap-3">
        {href && (
          <Link
            href={href}
            className="font-heading w-full text-sm md:text-base py-3 text-center border-2 border-background-primary text-background-primary hover:bg-red-50 font-bold rounded-xl transition"
          >
            Learn More
          </Link>
        )}
        <BookButton
          className="font-heading w-full text-sm md:text-base py-4 bg-background-primary hover:bg-red-700 text-white font-bold rounded-xl transition shadow-md active:scale-[0.98]"
          form={{
            title: "Book",
            testName: title,
            testDescription: description,
            additionalSourceData: leadMeta,
          }}
        >
          Book {title}
        </BookButton>
      </div>
    </div>
  );
}
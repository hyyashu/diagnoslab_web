import { ClipboardList } from "lucide-react";
import BookButton from "@/components/cards/bookButton";
import Icon from "@/components/ui/icon";
import { buttonClass } from "@/components/ui/button";

type ScanTypeCardProps = {
  /* The service it belongs to, e.g. "Ultrasound", for the lead. */
  service: string;
  title: string;
  description: string;
  preparation: string;
  icon: string;
};

/* DL.pen ultrasound "Scan Grid" card: one scan type with its preparation
   note and a Book button. */
export default function ScanTypeCard({ service, title, description, preparation, icon }: ScanTypeCardProps) {
  return (
    <article className="flex h-full flex-col gap-3.5 rounded-[20px] border border-dl-line bg-white p-5 md:gap-4 md:p-6">
      <div className="flex items-center gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-dl-red-soft text-dl-red md:size-11">
          <Icon name={icon} className="size-5" />
        </span>
        <h3 className="font-display text-[17px] font-extrabold tracking-[-0.02em] text-dl-ink md:text-[19px]">{title}</h3>
      </div>
      <p className="text-[13.5px] leading-normal text-dl-ink-2 md:text-sm">{description}</p>
      <p className="mt-auto flex items-start gap-2 rounded-xl bg-dl-bg px-3 py-2.5 text-[12.5px] font-semibold text-dl-ink md:text-[13px]">
        <ClipboardList className="mt-px size-4 shrink-0 text-dl-red" aria-hidden />
        {preparation}
      </p>
      <BookButton
        className={buttonClass("primary", "sm", "w-full md:w-fit md:self-end")}
        form={{
          title: "Book",
          testName: `${service}: ${title}`,
          testDescription: description,
          additionalSourceData: {
            radiology_name: title,
            radiology_description: description,
          },
        }}
      >
        Book now
      </BookButton>
    </article>
  );
}

import Link from "next/link";
import { Bone, Droplet, HeartPulse, House, ScanLine, Wind } from "lucide-react";
import { shell } from "@/components/ui/shell";

/* DL.pen "Services Strip": what the area can book, under the hero. A
   sideways scroller on phones. */
export default function ServicesStrip({ areaName }: { areaName: string }) {
  const services = [
    { icon: Droplet, title: "Blood tests", text: "Pathology & lab tests", href: "/tests/" },
    { icon: ScanLine, title: "Ultrasound", text: "Female radiologist available", href: "/ultrasound-in-jamshedpur/" },
    { icon: HeartPulse, title: "ECG & 2D ECHO", text: "Heart rhythm & function", href: "/ecg/" },
    { icon: Bone, title: "Digital X-Ray", text: "Walk in, quick imaging", href: "/xray/" },
    { icon: Wind, title: "PFT", text: "Lung function test", href: "/radiology/" },
    { icon: House, title: "Home collection", text: `Across ${areaName} from 6 AM`, href: "#enquiry-form" },
  ];

  return (
    <nav aria-label={`Services in ${areaName}`} className="border-y border-dl-line bg-white">
      <ul className={`${shell} no-scrollbar flex overflow-x-auto max-md:px-0 xl:grid xl:grid-cols-6`}>
        {services.map(({ icon: Icon, title, text, href }) => (
          <li key={title} className="shrink-0 border-r border-dl-line first:border-l max-md:first:border-l-0 xl:shrink">
            <Link href={href} className="group flex h-full w-[200px] items-start gap-3 px-4 py-5 md:px-5 md:py-[26px] xl:w-auto">
              <span className="flex size-[38px] shrink-0 items-center justify-center rounded-[10px] bg-dl-red-soft text-dl-red">
                <Icon className="size-[18px]" aria-hidden />
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="font-display text-[15px] font-bold text-dl-ink group-hover:text-dl-red">{title}</span>
                <span className="text-[12.5px] leading-[1.4] text-dl-muted">{text}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

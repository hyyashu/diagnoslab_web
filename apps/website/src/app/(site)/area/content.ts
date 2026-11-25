import type { Area } from "@/lib/catalog";
import type { FaqItem } from "@/lib/faq";
import { adityapur, jugsalai, sakchi, type Centre } from "@/lib/centres";

/* Area page copy from DL.pen ("Area: Jugsalai"). */

/* Walk-in centres that are also area pages. Every other area is served
   from the main lab in Sakchi. */
const centres: Record<string, Centre> = { sakchi, jugsalai, adityapur };

/* `hasCentre`: the area has its own walk-in centre; otherwise `centre` is
   the nearest one (Sakchi). */
export const centreFor = (area: Area) => ({
  centre: centres[area.slug] ?? sakchi,
  hasCentre: area.slug in centres,
});

export function areaFaq(area: Area): FaqItem[] {
  const { centre, hasCentre } = centreFor(area);
  const otherCentres = ["Sakchi", "Jugsalai", "Adityapur"].filter((c) => c !== area.name).join(" and ");

  return [
    {
      question: `Do you collect blood samples at home in ${area.name}?`,
      answer: `Yes. Our phlebotomists visit homes across ${area.name} from 6 AM, every day. Book online, call or WhatsApp us with your address and preferred slot.`,
    },
    hasCentre
      ? {
          question: `Where is the Diagnos Lab centre in ${area.name}?`,
          answer: `Our ${area.name} centre is in ${centre.address}, open every day from 7:30 AM to 7:30 PM. Walk in, no appointment needed. We also have centres in ${otherCentres}.`,
        }
      : {
          question: `Where is the nearest Diagnos Lab centre to ${area.name}?`,
          answer: `Our main lab is in ${centre.address}, open every day from 7:30 AM to 7:30 PM. We also have centres in Jugsalai and Adityapur, or we can collect your sample at home in ${area.name}.`,
        },
    {
      question: "How fast will I get my reports?",
      answer:
        "Most blood test reports are ready the same day, within 6 to 12 hours depending on the test, and sent to your WhatsApp automatically. Ultrasound and ECG reports usually take 1–2 hours.",
    },
    {
      question: `Is there a home collection charge in ${area.name}?`,
      answer: `Yes. A home collection charge applies on top of the test price. Our team will tell you the exact amount when you book.`,
    },
    {
      question: "Do I need to fast before my blood test?",
      answer:
        "Only for some tests. Fasting blood sugar and full body packages need 10–12 hours of overnight fasting (water is allowed), while tests like CBC, HbA1c and TSH need none. Each test card shows whether fasting is needed.",
    },
    {
      question: "Can I get my reports on WhatsApp?",
      answer:
        "Yes. All reports are sent to your WhatsApp automatically as soon as they're ready.",
    },
  ];
}

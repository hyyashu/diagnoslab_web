import JsonLd from "@/components/seo/jsonLd";
import { generalFaq, type FaqItem } from "@/lib/faq";

/* FAQPage schema for the accordion on the same page; pass the same items. */
export default function FaqJsonLd({ items = generalFaq }: { items?: FaqItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return <JsonLd data={schema} />;
}

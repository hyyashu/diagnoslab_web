'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, MessageCircle, Minus, Plus } from 'lucide-react';
import { generalFaq, type FaqItem } from '@/lib/faq';
import { buttonClass } from '@/components/ui/button';
import { WHATSAPP_HREF } from '@/lib/contact';

type FAQAccordionProps = {
  title?: string;
  items?: FaqItem[];
  /* Desktop-only line under the title, with a WhatsApp button. */
  intro?: string;
  tone?: 'white' | 'muted';
  /* "You may also need" links under the intro. */
  related?: { label: string; href: string }[];
};

/* DL.pen "FAQ" / "FAQ Item". Pair it with <FaqJsonLd items={...} /> using
   the same items. */
export default function FAQAccordion({
  title = 'Questions, answered',
  items = generalFaq,
  intro,
  tone = 'white',
  related,
}: FAQAccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section aria-labelledby="faq-heading" className={`${tone === 'muted' ? 'bg-dl-bg' : 'bg-white'} py-10 md:py-24`}>
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-[18px] px-4 md:flex-row md:gap-16 md:px-10 xl:px-20">
        <div className="contents md:flex md:w-[380px] md:shrink-0 md:flex-col md:gap-4">
          <h2
            id="faq-heading"
            className="font-display text-[22px] font-extrabold tracking-[-0.03em] text-dl-ink md:text-[38px] md:leading-[1.1]"
          >
            {title}
          </h2>
          {intro && (
            <div className="hidden flex-col items-start gap-5 md:flex">
              <p className="text-[15px] leading-relaxed text-dl-ink-2">{intro}</p>
              <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className={buttonClass('dark')}>
                <MessageCircle className="size-4" aria-hidden />
                Chat with us
              </a>
            </div>
          )}
          {related && (
            <div className="order-last flex flex-col gap-3 pt-2 md:order-none">
              <p className="text-[11px] font-bold tracking-[0.14em] text-dl-muted">YOU MAY ALSO NEED</p>
              <ul className="flex flex-wrap gap-2">
                {related.map((r) => (
                  <li key={r.label}>
                    <Link
                      href={r.href}
                      className="inline-flex items-center gap-1.5 rounded-full border border-dl-line bg-white px-3.5 py-2 text-[13px] font-semibold text-dl-ink hover:border-dl-ink"
                    >
                      {r.label}
                      <ArrowUpRight className="size-3.5" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-2.5">
          {items.map((item, index) => {
            const isOpen = activeIndex === index;

            return (
              <div
                key={item.question}
                className={`${item.desktopOnly ? 'hidden md:block' : ''} rounded-2xl border bg-white transition-colors ${
                  isOpen ? 'border-dl-red' : 'border-dl-line'
                }`}
              >
                <button
                  onClick={() => setActiveIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-3 px-[18px] py-[18px] text-left md:px-6"
                >
                  <span className="flex-1 font-display text-[15px] font-bold text-dl-ink md:text-base">
                    {item.mobileQuestion ? (
                      <>
                        <span className="md:hidden">{item.mobileQuestion}</span>
                        <span className="hidden md:inline">{item.question}</span>
                      </>
                    ) : (
                      item.question
                    )}
                  </span>
                  <span
                    className={`flex size-7 shrink-0 items-center justify-center rounded-full transition-colors ${
                      isOpen ? 'bg-dl-red text-white' : 'bg-dl-bg text-dl-ink'
                    }`}
                  >
                    {isOpen ? <Minus className="size-4" aria-hidden /> : <Plus className="size-4" aria-hidden />}
                  </span>
                </button>

                {/* Answers stay in the HTML (the FAQ schema promises them);
                    the 0fr -> 1fr grid row animates height to auto. */}
                <div
                  aria-hidden={!isOpen}
                  className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="overflow-hidden">
                    <p className="px-[18px] pb-[18px] text-[13.5px] leading-relaxed text-dl-ink-2 md:px-6 md:text-[15px]">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

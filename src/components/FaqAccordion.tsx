import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, RevealText } from "./Reveal";
import { useContent } from "@/lib/contentContext";

interface FaqItem {
  question: string;
  answer: string;
}

export function FaqAccordion() {
  const { content } = useContent();
  const { faqs } = content;

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden py-16 lg:py-24 border-t border-border/60">
      <div className="absolute inset-0 grid-overlay opacity-10 pointer-events-none" />
      
      <div className="mx-auto max-w-[1600px] px-6 lg:grid lg:grid-cols-12 lg:gap-20 lg:px-12">
        
        {/* FAQ Header */}
        <div className="lg:col-span-5 mb-16 lg:mb-0">
          <Reveal>
            <p className="text-eyebrow">{faqs.eyebrow}</p>
          </Reveal>
          <h2 className="mt-6 text-display-md text-balance">
            <RevealText text={faqs.title} />
          </h2>
          {faqs.description && (
            <Reveal delay={0.2}>
              <p className="mt-6 text-sm text-muted-foreground text-pretty max-w-sm">
                {faqs.description}
              </p>
            </Reveal>
          )}
        </div>

        {/* Accordions */}
        <div className="lg:col-span-7 space-y-4">
          {faqs.items.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <Reveal key={faq.question + idx} delay={idx * 0.1}>
                <div className="border border-border/80 bg-surface/10 hover:border-gold/30 transition-colors duration-500">
                  
                  {/* Trigger Header */}
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between p-6 text-left focus:outline-none lg:p-8"
                  >
                    <span className="font-display text-lg tracking-tight text-foreground transition-colors duration-300 hover:text-gold lg:text-xl">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-gold/80"
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                      </svg>
                    </motion.div>
                  </button>
 
                  {/* Collapsible Answer */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.7, 0, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-0 text-sm leading-relaxed text-muted-foreground lg:px-8 lg:pb-8">
                          <p className="border-t border-border/50 pt-4 text-pretty">{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              </Reveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}


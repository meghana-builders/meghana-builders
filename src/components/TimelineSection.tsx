import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, RevealText } from "./Reveal";
import { useContent } from "@/lib/contentContext";
import { ikUrl } from "@/lib/imagekit";

interface Milestone {
  year: string;
  title: string;
  description: string;
  image: string;
}

export function TimelineSection() {
  const { content } = useContent();
  const { timeline } = content.about;
  const milestones = timeline.milestones;

  const [activeIdx, setActiveIdx] = useState(0);

  const activeMilestone = milestones[activeIdx] || milestones[0];

  if (!activeMilestone) return null;

  return (
    <section className="relative overflow-hidden py-16 lg:py-24 border-t border-border/60">
      <div className="absolute inset-0 grid-overlay opacity-10 pointer-events-none" />
      
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <Reveal>
            <p className="text-eyebrow justify-center">{timeline.eyebrow}</p>
          </Reveal>
          <h2 className="mt-6 text-display-md text-balance">
            <RevealText text={timeline.title} />
          </h2>
        </div>

        {/* Interactive Timeline Track */}
        <div className="relative mx-auto max-w-3xl mb-16 px-4">
          <div className="absolute top-[23px] left-0 right-0 h-px bg-border z-0" />
          
          <div className="relative flex justify-between z-10">
            {milestones.map((m, idx) => {
              const isActive = idx === activeIdx;
              return (
                <button
                  key={m.year + idx}
                  onClick={() => setActiveIdx(idx)}
                  className="group relative flex flex-col items-center focus:outline-none"
                >
                  {/* Glowing Ring / Bullet */}
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full border bg-background transition-all duration-500 ${
                    isActive 
                      ? "border-gold shadow-[0_0_15px_oklch(0.78_0.13_78_/_0.4)]" 
                      : "border-border hover:border-gold/60"
                  }`}>
                    {isActive ? (
                      <motion.div
                        layoutId="activeTimelineBullet"
                        className="h-3 w-3 bg-gold rounded-full"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    ) : (
                      <div className="h-1.5 w-1.5 bg-muted-foreground group-hover:bg-gold rounded-full transition-colors" />
                    )}
                  </div>
                  
                  {/* Year label */}
                  <span className={`mt-4 font-mono text-xs uppercase tracking-[0.2em] transition-colors ${
                    isActive ? "text-gold font-medium" : "text-muted-foreground group-hover:text-foreground"
                  }`}>
                    {m.year}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive content card */}
        <div className="relative mx-auto max-w-5xl min-h-[380px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.7, 0, 0.2, 1] }}
              className="grid gap-12 border border-border/80 bg-surface/15 p-8 backdrop-blur lg:grid-cols-12 lg:gap-20 lg:p-12"
            >
              
              {/* Text info */}
              <div className="lg:col-span-6 flex flex-col justify-center">
                <span className="font-mono text-4xl font-light text-gold">{activeMilestone.year}</span>
                <h3 className="mt-4 font-display text-2xl lg:text-3xl tracking-tight text-foreground">
                  {activeMilestone.title}
                </h3>
                <p className="mt-6 text-sm leading-relaxed text-muted-foreground text-pretty">
                  {activeMilestone.description}
                </p>
                
                {/* Clickable Nav controls inside card */}
                <div className="mt-8 flex gap-4">
                  <button
                    disabled={activeIdx === 0}
                    onClick={() => setActiveIdx((prev) => prev - 1)}
                    className="flex h-10 w-10 items-center justify-center border border-border text-muted-foreground hover:border-gold hover:text-gold disabled:opacity-30 disabled:pointer-events-none transition-colors"
                  >
                    ←
                  </button>
                  <button
                    disabled={activeIdx === milestones.length - 1}
                    onClick={() => setActiveIdx((prev) => prev + 1)}
                    className="flex h-10 w-10 items-center justify-center border border-border text-muted-foreground hover:border-gold hover:text-gold disabled:opacity-30 disabled:pointer-events-none transition-colors"
                  >
                    →
                  </button>
                </div>
              </div>

              {/* Related Image */}
              <div className="lg:col-span-6">
                <div className="relative aspect-[16/10] overflow-hidden border border-border/50 bg-background/25">
                  <img
                    src={ikUrl(activeMilestone.image, { quality: 80 })}
                    alt={activeMilestone.title}
                    className="h-full w-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}


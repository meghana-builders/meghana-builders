import { motion } from "framer-motion";
import { Reveal, RevealText } from "./Reveal";
import { useContent } from "@/lib/contentContext";
import { ikUrl } from "@/lib/imagekit";

interface Step {
  num: string;
  title: string;
  description: string;
  image: string;
}

export function WorkflowSection() {
  const { content } = useContent();
  const { workflow } = content;
  const steps = workflow.steps;

  return (
    <section className="relative overflow-hidden py-16 lg:py-24 border-t border-border/60">
      <div className="absolute inset-0 grid-overlay opacity-15 pointer-events-none" />
      
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12 mb-16">
        <div className="max-w-2xl">
          <Reveal>
            <p className="text-eyebrow">{workflow.eyebrow}</p>
          </Reveal>
          <h2 className="mt-6 text-display-md text-balance">
            <RevealText text={workflow.title} />
          </h2>
        </div>
      </div>

      {/* Endless Scroll Outer Container */}
      <div className="relative w-full overflow-hidden">
        {/* Shadow overlays for smooth fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

        {/* Scrolling flex track */}
        <div className="flex gap-6 animate-infinite-scroll px-6">
          {/* Double list to loop seamlessly */}
          {[...steps, ...steps].map((s, idx) => (
            <div
              key={`${s.num}-${idx}`}
              className="group relative w-[280px] sm:w-[325px] flex-shrink-0 overflow-hidden border border-border/80 bg-surface/25 p-6 backdrop-blur transition-colors duration-500 hover:border-gold/40 hover:bg-surface/50 sm:p-8"
            >
              {/* Step Line indicator */}
              <div className="absolute left-0 top-0 h-[2px] w-0 bg-gold transition-all duration-500 group-hover:w-full" />

              <div className="flex items-center justify-between">
                <span className="font-mono text-3xl font-light text-gold/40 transition-colors duration-500 group-hover:text-gold">
                  {s.num}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  Step {s.num}
                </span>
              </div>

              {s.image && (
                <div className="relative mt-6 aspect-[16/10] overflow-hidden border border-border/50 bg-background/25">
                  <img
                    src={ikUrl(s.image, { quality: 80 })}
                    alt={s.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />
                </div>
              )}

              <h3 className="mt-8 font-display text-xl tracking-tight text-foreground transition-colors duration-500 group-hover:text-gold">
                {s.title}
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground text-pretty transition-colors duration-500 group-hover:text-foreground/90">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


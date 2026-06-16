import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { useContent } from "@/lib/contentContext";
import { ikUrl } from "@/lib/imagekit";

export function AboutChairmanSection() {
  const { content } = useContent();
  const { aboutChairman } = content.about;

  return (
    <section className="relative overflow-hidden py-16 lg:py-24 border-t border-border/60 bg-surface/10">
      <div className="absolute inset-0 grid-overlay opacity-15 pointer-events-none" />
      
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-center lg:gap-24">
          
          {/* Chairman Image */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="relative aspect-[4/5] overflow-hidden border border-border/80 bg-surface/20">
                <img
                  src={ikUrl(aboutChairman.image, { quality: 85 })}
                  alt={`${aboutChairman.name} — ${aboutChairman.role}`}
                  className="h-full w-full object-cover filter grayscale hover:grayscale-0 transition-all duration-750 hover:scale-103"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-6 text-center lg:text-left">
                <p className="font-display text-2xl text-foreground">{aboutChairman.name}</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-blue-500 mt-2">{aboutChairman.role}</p>
              </div>
            </Reveal>
          </div>

          {/* Letter/Vision content */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <Reveal>
              <p className="text-eyebrow">{aboutChairman.eyebrow}</p>
            </Reveal>
            <h2 className="mt-6 text-display-md text-balance">
              "{aboutChairman.title}"
            </h2>
            
            <div className="mt-8 space-y-6 text-base text-muted-foreground lg:text-lg">
              {aboutChairman.paragraphs.map((p, idx) => (
                <Reveal key={idx} delay={0.1 + idx * 0.1}>
                  <p className="text-pretty">{p}</p>
                </Reveal>
              ))}
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-3 border-t border-border pt-8">
              {aboutChairman.values.map((v, i) => (
                <Reveal key={v.title} delay={0.3 + i * 0.1}>
                  <div>
                    <h4 className="font-display text-lg text-blue-500">{v.title}</h4>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{v.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}


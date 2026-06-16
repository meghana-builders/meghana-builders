import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useContent } from "@/lib/contentContext";
import { Reveal, RevealText } from "./Reveal";
import { ikUrl } from "@/lib/imagekit";

export function AboutSection() {
  const { content } = useContent();
  const { about } = content;

  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [-60, 80]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  return (
    <section ref={ref} className="relative overflow-hidden py-16 lg:py-24">
      <div className="mx-auto grid max-w-[1600px] gap-16 px-6 lg:grid-cols-12 lg:gap-24 lg:px-12">
        <div className="lg:col-span-5">
          <div className="relative aspect-[3/4] overflow-hidden">
            <motion.div
              className="absolute inset-0"
              style={{
                y: imgY,
                scale: imgScale,
                backgroundImage: `url(${ikUrl(about.image, { quality: 80 })})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="absolute inset-0 bg-background/10" />
          </div>
          <Reveal delay={0.2}>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              — Begumpet Studio, Hyderabad
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <p className="text-eyebrow">{about.eyebrow}</p>
          <h2 className="mt-6 text-display-lg text-balance">
            <RevealText text={about.title} />
          </h2>
          <div className="mt-12 space-y-6 text-base text-muted-foreground lg:text-lg">
            {about.body.map((p, i) => (
              <Reveal key={i} delay={0.15 + i * 0.1}>
                <p className="text-pretty max-w-xl">{p}</p>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 grid gap-10 sm:grid-cols-2">
            {about.pillars.map((p, i) => (
              <Reveal key={p.title} delay={0.2 + i * 0.1}>
                <div className="border-t border-gold pt-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold">{p.title}</p>
                  <p className="mt-4 text-sm text-foreground/90 text-pretty">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

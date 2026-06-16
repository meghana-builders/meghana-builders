import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Reveal, RevealText } from "./Reveal";
import { useContent } from "@/lib/contentContext";
import { ikUrl } from "@/lib/imagekit";

interface PhilosophyItem {
  num: string;
  title: string;
  description: string;
  image: string;
}

function getPhilosophyIcon(num: string) {
  switch (num) {
    case "01":
      return (
        <svg className="h-5 w-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      );
    case "02":
      return (
        <svg className="h-5 w-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0110 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0114 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>
      );
    case "03":
      return (
        <svg className="h-5 w-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    default:
      return (
        <svg className="h-5 w-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v16.5h16.5V3.75H3.75zm1.5 1.5h6.75v6.75H5.25V5.25zm0 13.5v-5.25h6.75v5.25H5.25zm13.5 0h-5.25v-5.25h5.25v5.25zm0-6.75h-5.25V5.25h5.25v6.75z" />
        </svg>
      );
  }
}

function PhilosophyCard({ p, cardVariants }: { p: PhilosophyItem; cardVariants: any }) {
  const ref = useRef<HTMLDivElement>(null);
  const [glow, setGlow] = useState({ x: 50, y: 50 });

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setGlow({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      variants={cardVariants}
      whileHover={{ y: -8, scale: 1.015, transition: { duration: 0.3 } }}
      className="group relative overflow-hidden border border-border/80 bg-surface/35 p-4 backdrop-blur-md transition-colors duration-500 hover:border-gold/40 hover:bg-surface/50 sm:p-5"
    >
      {/* Corner accent border lines */}
      <div className="absolute left-0 top-0 h-[2px] w-0 bg-gold transition-all duration-500 group-hover:w-12" />
      <div className="absolute left-0 top-0 h-0 w-[2px] bg-gold transition-all duration-500 group-hover:h-12" />

      {/* Radial Gold Glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle 220px at ${glow.x}% ${glow.y}%, oklch(0.78 0.13 78 / 0.18), transparent 60%)`,
        }}
      />

      <div className="flex items-start justify-between">
        <div className="flex h-9 w-9 items-center justify-center border border-border bg-background transition-colors duration-500 group-hover:border-gold/30">
          {getPhilosophyIcon(p.num)}
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-blue-500/60 transition-colors duration-500 group-hover:text-blue-400">
          {p.num}
        </span>
      </div>

      {p.image && (
        <div className="relative mt-5 aspect-[16/9] overflow-hidden border border-border/50 bg-background/25">
          <img
            src={ikUrl(p.image, { quality: 80 })}
            alt={p.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-60" />
        </div>
      )}

      <h3 className="mt-6 font-display text-lg tracking-tight transition-colors duration-500 group-hover:text-gold">
        {p.title}
      </h3>
      <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground text-pretty transition-colors duration-500 group-hover:text-foreground/90">
        {p.description}
      </p>
    </motion.div>
  );
}

export function PhilosophySection() {
  const { content } = useContent();
  const { philosophy } = content.about;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] }
    }
  };

  return (
    <section className="relative overflow-hidden py-16 lg:py-24 border-t border-border/60">
      <div className="absolute inset-0 grid-overlay opacity-15 pointer-events-none" />
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        
        {/* Header */}
        <div className="max-w-2xl mx-auto lg:max-w-none lg:px-4 mb-16">
          <Reveal>
            <p className="text-eyebrow">{philosophy.eyebrow}</p>
          </Reveal>
          <h2 className="mt-6 text-display-md text-balance">
            <RevealText text={philosophy.title} />
          </h2>
          {philosophy.description && (
            <Reveal delay={0.2}>
              <p className="mt-6 text-sm text-muted-foreground text-pretty max-w-xl">
                {philosophy.description}
              </p>
            </Reveal>
          )}
        </div>

        {/* 4-Column Compact Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-40px" }}
          className="mx-auto grid max-w-6xl gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {philosophy.items.map((p) => (
            <PhilosophyCard key={p.num} p={p} cardVariants={cardVariants} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}


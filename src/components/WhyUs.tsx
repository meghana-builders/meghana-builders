import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useContent } from "@/lib/contentContext";
import { Reveal } from "./Reveal";

function WhyCard({ item, index }: { item: any; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [glow, setGlow] = useState({ x: 50, y: 50 });

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setGlow({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group relative overflow-hidden border border-border bg-surface p-8 lg:p-10"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle 300px at ${glow.x}% ${glow.y}%, oklch(0.78 0.13 78 / 0.18), transparent 60%)`,
        }}
      />
      <p className="font-mono text-xs text-blue-500">{item.num}</p>
      {item.image && (
        <div className="relative mt-6 aspect-[16/10] overflow-hidden border border-border/50 bg-background/25">
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />
        </div>
      )}
      <h3 className="mt-6 font-display text-2xl lg:text-3xl">{item.title}</h3>
      <p className="mt-4 text-sm text-muted-foreground text-pretty">{item.body}</p>
      <div className="mt-10 h-px w-full origin-left scale-x-0 bg-blue-500 transition-transform duration-700 group-hover:scale-x-100" />
    </motion.div>
  );
}

export function WhyUs() {
  const { content } = useContent();
  const { whyUs } = content;

  return (
    <section className="relative py-16 lg:py-24">
      <div className="absolute inset-0 bg-radial-gold opacity-50" />
      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-12">
        <Reveal>
          <p className="text-eyebrow">Why Meghana</p>
          <h2 className="mt-6 max-w-3xl text-display-lg text-balance">
            Four principles. <span className="italic text-gold">Zero compromises.</span>
          </h2>
        </Reveal>
        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyUs.map((item, i) => (
            <WhyCard key={item.num} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

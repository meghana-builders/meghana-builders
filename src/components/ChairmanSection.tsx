import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useContent } from "@/lib/contentContext";
import { ikUrl } from "@/lib/imagekit";

function Typewriter({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setStarted(true);
      },
      { threshold: 0.4 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const id = setInterval(() => {
      setShown((s) => {
        if (s >= text.length) {
          clearInterval(id);
          return s;
        }
        return s + 1;
      });
    }, 18);
    return () => clearInterval(id);
  }, [started, text.length]);

  return (
    <span ref={ref}>
      {text.slice(0, shown)}
      {shown < text.length && <span className="blink-caret text-gold">▍</span>}
    </span>
  );
}

export function ChairmanSection() {
  const { content } = useContent();
  const { chairman } = content;

  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-40, 60]);

  return (
    <section ref={ref} className="relative overflow-hidden border-y border-border bg-surface py-16 lg:py-24">
      {/* Animated architectural lines */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-20" preserveAspectRatio="none">
        <motion.path
          d="M 0 100 Q 400 50 800 200 T 1600 150"
          stroke="oklch(0.78 0.13 78)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />
        <motion.path
          d="M 0 400 L 1600 350"
          stroke="oklch(0.78 0.13 78)"
          strokeWidth="0.5"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.5, delay: 0.5 }}
        />
      </svg>

      <div className="mx-auto grid max-w-[1600px] gap-16 px-6 lg:grid-cols-12 lg:gap-20 lg:px-12">
        <div className="lg:col-span-7">
          <p className="text-eyebrow">{chairman.eyebrow}</p>
          <blockquote className="mt-10 text-display-md text-balance">
            <span className="text-gold">"</span>
            <Typewriter text={chairman.quote} />
            <span className="text-gold">"</span>
          </blockquote>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-10 max-w-xl text-base text-muted-foreground lg:text-lg text-pretty"
          >
            {chairman.message}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="mt-10 flex items-center gap-4"
          >
            <div className="h-px w-12 bg-gold" />
            <div>
              <p className="font-display text-xl">{chairman.name}</p>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">{chairman.title}</p>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-5">
          <motion.div
            style={{ y }}
            className="relative aspect-[4/5] overflow-hidden"
          >
            <motion.div
              initial={{ scale: 1.2, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.6, ease: [0.7, 0, 0.2, 1] }}
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${ikUrl(chairman.image, { quality: 80 })})`,
                backgroundSize: "cover",
                backgroundPosition: "center top",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

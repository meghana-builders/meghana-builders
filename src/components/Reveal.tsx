import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const baseV: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.7, 0, 0.2, 1] } },
};

export function Reveal({
  children,
  delay = 0,
  className = "",
  y = 40,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const MotionTag = motion.div;
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-80px" }}
      variants={{
        hidden: { opacity: 0, y },
        visible: { opacity: 1, y: 0, transition: { duration: 0.9, delay, ease: [0.7, 0, 0.2, 1] } },
      }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealText({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-60px" }}
      variants={{ visible: { transition: { staggerChildren: 0.045, delayChildren: delay } } }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom" aria-hidden>
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%" },
              visible: { y: "0%", transition: { duration: 0.85, ease: [0.7, 0, 0.2, 1] } },
            }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

export { baseV };

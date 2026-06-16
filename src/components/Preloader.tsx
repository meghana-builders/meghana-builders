import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  const logs = [
    { threshold: 0, text: "casting concrete foundation..." },
    { threshold: 25, text: "framing seismic steel columns..." },
    { threshold: 50, text: "glazing curtain-wall facade..." },
    { threshold: 75, text: "harmonizing vastu grid lines..." },
    { threshold: 90, text: "loading structural assets..." },
    { threshold: 100, text: "building covenant initiated." }
  ];

  // Disable scroll during preloader
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  // Increment progress simulator
  useEffect(() => {
    let duration = 2400; // Total duration in ms
    let intervalTime = 25;
    let step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + step + Math.random() * 2, 100);
        if (next === 100) {
          clearInterval(timer);
          // Wait 400ms before starting exit transition
          setTimeout(() => {
            setIsAnimatingOut(true);
          }, 400);
          // Wait 1450ms (400ms delay + 1050ms transition) before unmounting
          setTimeout(() => {
            onComplete();
          }, 1450);
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Update console logs based on current progress
  useEffect(() => {
    const nextIndex = logs.findIndex((log, idx) => {
      const nextLog = logs[idx + 1];
      return progress >= log.threshold && (!nextLog || progress < nextLog.threshold);
    });
    if (nextIndex !== -1 && nextIndex !== logIndex) {
      setLogIndex(nextIndex);
    }
  }, [progress, logIndex]);

  // Cubic-bezier tuple defined as const to satisfy Framer Motion TypeScript checks
  const cubicEase = [0.76, 0, 0.24, 1] as const;

  const columnVariants = (direction: "up" | "down") => ({
    initial: { y: "0%" },
    animate: {
      y: isAnimatingOut ? (direction === "up" ? "-100%" : "100%") : "0%",
      transition: {
        duration: 0.95,
        ease: cubicEase
      }
    }
  });

  const contentVariants = {
    initial: { opacity: 1, scale: 1 },
    animate: {
      opacity: isAnimatingOut ? 0 : 1,
      scale: isAnimatingOut ? 0.96 : 1,
      transition: { duration: 0.4, ease: "easeOut" as const }
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-transparent pointer-events-none">
      
      {/* Staggered Sliding Column Panels */}
      <div className="absolute inset-0 flex pointer-events-auto z-10 overflow-hidden">
        <motion.div
          variants={columnVariants("up")}
          initial="initial"
          animate="animate"
          className="w-1/4 h-full bg-[#110e0c] border-r border-border/10"
        />
        <motion.div
          variants={columnVariants("down")}
          initial="initial"
          animate="animate"
          className="w-1/4 h-full bg-[#110e0c] border-r border-border/10"
          style={{ transitionDelay: "75ms" }}
        />
        <motion.div
          variants={columnVariants("up")}
          initial="initial"
          animate="animate"
          className="w-1/4 h-full bg-[#110e0c] border-r border-border/10"
          style={{ transitionDelay: "150ms" }}
        />
        <motion.div
          variants={columnVariants("down")}
          initial="initial"
          animate="animate"
          className="w-1/4 h-full bg-[#110e0c]"
          style={{ transitionDelay: "225ms" }}
        />
      </div>

      {/* Center content + technical indicators */}
      <motion.div
        variants={contentVariants}
        initial="initial"
        animate="animate"
        className="relative z-20 flex flex-col items-center justify-center max-w-lg px-6 text-center pointer-events-auto"
      >
        {/* Grid Overlay inside the content container to keep it aligned with preloader panel */}
        <div className="absolute -inset-10 grid-overlay opacity-25 pointer-events-none -z-10" />

        {/* Animated Sky Towers Blueprint SVG */}
        <div className="w-64 h-64 relative mb-12">
          <svg viewBox="0 0 100 150" className="w-full h-full text-blue-500/80">
            {/* Ground Foundation Grid */}
            <motion.line
              x1="10" y1="140" x2="90" y2="140"
              stroke="currentColor" strokeWidth="0.8"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1 }}
            />
            
            {/* Left Tower */}
            <motion.rect
              x="22" y="30" width="18" height="110"
              stroke="currentColor" strokeWidth="0.8" fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
            />
            
            {/* Right Tower */}
            <motion.rect
              x="60" y="40" width="18" height="100"
              stroke="currentColor" strokeWidth="0.8" fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />

            {/* Sky Bridge Connection (Level 33) */}
            <motion.path
              d="M 40 45 L 60 45 M 40 51 L 60 51"
              stroke="#3a86c8" strokeWidth="0.6"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            />
            <motion.path
              d="M 40 45 L 60 51 M 60 45 L 40 51"
              stroke="#3a86c8" strokeWidth="0.3" opacity="0.6"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            />

            {/* Structural Cross Bracings Inside Left Tower */}
            <motion.path
              d="M 22 30 L 40 50 M 40 50 L 22 70 M 22 70 L 40 90 M 40 90 L 22 110 M 22 110 L 40 130"
              stroke="currentColor" strokeWidth="0.4" opacity="0.35"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.2 }}
            />
            
            {/* Structural Cross Bracings Inside Right Tower */}
            <motion.path
              d="M 60 40 L 78 60 M 78 60 L 60 80 M 60 80 L 78 100 M 78 100 L 60 120 M 60 120 L 78 140"
              stroke="currentColor" strokeWidth="0.4" opacity="0.35"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.4 }}
            />

            {/* Technical Floor Markers */}
            <motion.line x1="16" y1="30" x2="22" y2="30" stroke="#3a86c8" strokeWidth="0.5" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1 }} />
            <motion.line x1="16" y1="85" x2="22" y2="85" stroke="#3a86c8" strokeWidth="0.5" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.3 }} />
            <motion.line x1="78" y1="40" x2="84" y2="40" stroke="#3a86c8" strokeWidth="0.5" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.1 }} />
            <motion.line x1="78" y1="90" x2="84" y2="90" stroke="#3a86c8" strokeWidth="0.5" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.4 }} />
          </svg>

          {/* Glowing Blueprint Dots */}
          <motion.div
            className="absolute w-1.5 h-1.5 bg-blue-400 rounded-full blur-[1px]"
            style={{ left: "40%", top: "30%" }}
            animate={{ scale: [1, 1.8, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.div
            className="absolute w-1.5 h-1.5 bg-blue-400 rounded-full blur-[1px]"
            style={{ left: "60%", top: "27%" }}
            animate={{ scale: [1.8, 1, 1.8], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.55 }}
          />
          <motion.div
            className="absolute w-1.5 h-1.5 bg-blue-400 rounded-full blur-[1px]"
            style={{ left: "50%", top: "33%" }}
            animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0.8 }}
          />
        </div>

        {/* Percentage Indicator */}
        <div className="relative font-display text-4xl lg:text-5xl tracking-widest text-[#ece7e1] mb-6">
          {Math.floor(progress).toString().padStart(3, "0")}
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-blue-500 ml-1">%</span>
        </div>

        {/* Loading Progress Bar */}
        <div className="w-48 h-[1px] bg-border/25 relative overflow-hidden mb-8">
          <motion.div
            className="absolute top-0 bottom-0 left-0 bg-blue-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Terminal Live logs */}
        <div className="h-6 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-muted-foreground w-72 text-center">
          <motion.p
            key={logIndex}
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={progress >= 100 ? "text-blue-400 font-medium" : ""}
          >
            <span className="text-blue-500 mr-2">&gt;</span>
            {logs[logIndex]?.text}
          </motion.p>
        </div>
        
      </motion.div>
    </div>
  );
}

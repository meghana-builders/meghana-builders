import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useContent } from "@/lib/contentContext";
import { ikUrl } from "@/lib/imagekit";
import { MagneticButton } from "./MagneticButton";

// Helper to highlight tags in the Hero title
function highlightTitleText(line: string) {
  const lowerLine = line.toLowerCase();
  
  // Queries for matching
  const yellowQuery = "builds your dreams";
  const yellowQueryAlt = "builds your dream";
  
  let yellowIndex = lowerLine.indexOf(yellowQuery);
  let yellowLen = yellowQuery.length;
  
  if (yellowIndex === -1) {
    yellowIndex = lowerLine.indexOf(yellowQueryAlt);
    yellowLen = yellowQueryAlt.length;
  }
  
  const blueQuery = "meghana builders";
  const blueQueryAlt = "meghana";
  
  let blueIndex = lowerLine.indexOf(blueQuery);
  let blueLen = blueQuery.length;
  
  if (blueIndex === -1) {
    blueIndex = lowerLine.indexOf(blueQueryAlt);
    blueLen = blueQueryAlt.length;
  }
  
  // Both tags match in the same line
  if (blueIndex !== -1 && yellowIndex !== -1) {
    if (blueIndex < yellowIndex) {
      const prefix = line.slice(0, blueIndex);
      const blueText = line.slice(blueIndex, blueIndex + blueLen);
      const middleText = line.slice(blueIndex + blueLen, yellowIndex);
      const yellowText = line.slice(yellowIndex, yellowIndex + yellowLen);
      const suffix = line.slice(yellowIndex + yellowLen);
      return (
        <>
          {prefix}
          <span className="text-blue-500">{blueText}</span>
          {middleText}
          <span className="text-gold">{yellowText}</span>
          {suffix}
        </>
      );
    } else {
      const prefix = line.slice(0, yellowIndex);
      const yellowText = line.slice(yellowIndex, yellowIndex + yellowLen);
      const middleText = line.slice(yellowIndex + yellowLen, blueIndex);
      const blueText = line.slice(blueIndex, blueIndex + blueLen);
      const suffix = line.slice(blueIndex + blueLen);
      return (
        <>
          {prefix}
          <span className="text-gold">{yellowText}</span>
          {middleText}
          <span className="text-blue-500">{blueText}</span>
          {suffix}
        </>
      );
    }
  }
  
  // Only blue query matches
  if (blueIndex !== -1) {
    const prefix = line.slice(0, blueIndex);
    const blueText = line.slice(blueIndex, blueIndex + blueLen);
    const suffix = line.slice(blueIndex + blueLen);
    return (
      <>
        {prefix}
        <span className="text-blue-500">{blueText}</span>
        {suffix}
      </>
    );
  }
  
  // Only yellow query matches
  if (yellowIndex !== -1) {
    const prefix = line.slice(0, yellowIndex);
    const yellowText = line.slice(yellowIndex, yellowIndex + yellowLen);
    const suffix = line.slice(yellowIndex + yellowLen);
    return (
      <>
        {prefix}
        <span className="text-gold">{yellowText}</span>
        {suffix}
      </>
    );
  }
  
  // Fallbacks for other static content highlights
  if (line.includes("Landmarks")) {
    return <span className="italic text-gold">{line}</span>;
  }
  if (line.includes("Sculpt")) {
    return <span className="italic">{line}</span>;
  }
  
  return line;
}

export function Hero() {
  const { content } = useContent();
  const { hero, company } = content;
  
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  // Mouse parallax
  const imgRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!imgRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      imgRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(1.08)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const ytId = hero.videoUrl ? getYouTubeId(hero.videoUrl) : null;

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[680px] w-full overflow-hidden">
      {/* Background image or video with parallax */}
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        {hero.backgroundType === "video" && hero.videoUrl ? (
          ytId ? (
            <iframe
              ref={imgRef as any}
              src={`https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1&enablejsapi=1`}
              className="absolute inset-0 h-full w-full pointer-events-none transition-transform duration-700 ease-out will-change-transform"
              style={{
                transform: "scale(1.35)",
                border: "none",
                width: "100%",
                height: "100%",
              }}
              allow="autoplay; encrypted-media"
            />
          ) : (
            <video
              ref={imgRef as any}
              src={hero.videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out will-change-transform"
              style={{ transform: "scale(1.08)" }}
            />
          )
        ) : (
          <div
            ref={imgRef}
            className="absolute inset-0 transition-transform duration-700 ease-out will-change-transform"
            style={{
              backgroundImage: `url(${ikUrl(hero.image)})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        )}
        <div className="absolute inset-0 bg-veil" />
        <div className="absolute inset-0 bg-background/30" />
      </motion.div>

      {/* Grid + noise overlays */}
      <div className="absolute inset-0 grid-overlay opacity-20" />
      <div className="noise-overlay absolute inset-0" />
      <div className="light-beam" />

      {/* Top meta */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute inset-x-0 top-0 z-10 mx-auto flex max-w-[1600px] items-center justify-between px-6 pt-28 text-eyebrow lg:px-12"
      >
        <span>{hero.eyebrow}</span>
        <span className="hidden lg:inline">{company.city}</span>
      </motion.div>

      {/* Headline */}
      <motion.div
        style={{ y: textY, opacity }}
        className="absolute inset-0 z-10 mx-auto flex max-w-[1600px] flex-col justify-end px-6 pb-24 lg:px-12 lg:pb-32"
      >
        <h1 className="text-display-xl text-balance">
          {hero.titleLines.map((line, i) => {
            const hasMeghana = line.toUpperCase().includes("MEGHANA");
            const hasDreams = line.toUpperCase().includes("BUILDS YOUR DREAMS") || line.toUpperCase().includes("BUILDS YOUR DREAM");
            
            // If the line contains both, split them onto separate lines dynamically
            if (hasMeghana && hasDreams) {
              const lowerLine = line.toLowerCase();
              const dreamsQuery = lowerLine.includes("builds your dreams") ? "builds your dreams" : "builds your dream";
              const idx = lowerLine.indexOf(dreamsQuery);
              
              const meghanaText = line.slice(0, idx).trim();
              const dreamsText = line.slice(idx).trim();
              
              return (
                <div key={i} className="flex flex-col gap-2 md:gap-4 my-2">
                  {/* MEGHANA (Large, blue, full-size) */}
                  <span className="block overflow-hidden">
                    <motion.span
                      className="block text-blue-500"
                      initial={{ y: "110%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 1.1, delay: 0.4 + i * 0.12, ease: [0.7, 0, 0.2, 1] }}
                    >
                      {meghanaText}
                    </motion.span>
                  </span>
                  {/* BUILDS YOUR DREAMS (Subheading, yellow, half-size) */}
                  <span className="block overflow-hidden">
                    <motion.span
                      className="block text-gold"
                      style={{ fontSize: "clamp(1.75rem, 5.5vw, 6.5rem)", lineHeight: "1.1", letterSpacing: "-0.025em" }}
                      initial={{ y: "110%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 1.1, delay: 0.4 + (i + 1) * 0.12, ease: [0.7, 0, 0.2, 1] }}
                    >
                      {dreamsText}
                    </motion.span>
                  </span>
                </div>
              );
            }
            
            // Standard line-by-line render
            const isDreams = hasDreams;
            return (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  className="block"
                  style={isDreams ? { fontSize: "clamp(1.75rem, 5.5vw, 6.5rem)", lineHeight: "1.1", letterSpacing: "-0.025em" } : undefined}
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.1, delay: 0.4 + i * 0.12, ease: [0.7, 0, 0.2, 1] }}
                >
                  {highlightTitleText(line)}
                </motion.span>
              </span>
            );
          })}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="mt-12 flex flex-col items-start gap-10 lg:flex-row lg:items-end lg:justify-between"
        >
          <p className="max-w-md text-base text-muted-foreground text-pretty">{hero.subtitle}</p>
          <div className="flex flex-wrap items-center gap-4">
            <MagneticButton to={hero.primaryCta.to}>{hero.primaryCta.label}</MagneticButton>
            <MagneticButton to={hero.secondaryCta.to} variant="ghost">{hero.secondaryCta.label}</MagneticButton>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-eyebrow"
      >
        <div className="flex flex-col items-center gap-2">
          <span>Scroll</span>
          <div className="h-10 w-px bg-gradient-to-b from-gold to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}

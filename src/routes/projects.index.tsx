import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useContent } from "@/lib/contentContext";
import { Reveal, RevealText } from "@/components/Reveal";
import { CtaBlock } from "@/components/CtaBlock";
import { IKImage } from "@/components/IKImage";
import { ikUrl } from "@/lib/imagekit";

function CurrentProjectCard({ name, description, url, image }: { name: string; description: string; url: string; image: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
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
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      ref={ref}
      onMouseMove={onMove}
      whileHover={{ y: -8, scale: 1.015, transition: { duration: 0.3 } }}
      className="group relative block overflow-hidden border border-border/80 bg-surface/35 p-5 backdrop-blur-md transition-colors duration-500 hover:border-gold/40 hover:bg-surface/50 sm:p-6"
    >
      {/* Corner accent border lines */}
      <div className="absolute left-0 top-0 h-[2px] w-0 bg-gold transition-all duration-500 group-hover:w-16" />
      <div className="absolute left-0 top-0 h-0 w-[2px] bg-gold transition-all duration-500 group-hover:h-16" />

      {/* Radial Gold Glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle 350px at ${glow.x}% ${glow.y}%, oklch(0.78 0.13 78 / 0.18), transparent 60%)`,
        }}
      />

      <div className="relative aspect-[16/10] overflow-hidden border border-border/50 bg-background/25">
        <img
          src={ikUrl(image, { quality: 80 })}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-60" />
      </div>

      <div className="mt-6 flex items-center justify-between">
        <h3 className="font-display text-xl tracking-tight transition-colors duration-500 group-hover:text-gold">
          {name}
        </h3>
        <svg className="h-5 w-5 text-muted-foreground transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
        </svg>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-muted-foreground text-pretty transition-colors duration-500 group-hover:text-foreground/90">
        {description}
      </p>
    </motion.a>
  );
}

function BrochureCard({ name, size, url, image }: { name: string; size: string; url: string; image: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const onMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const width = r.width;
    const height = r.height;
    const x = (e.clientX - r.left) / width - 0.5;
    const y = (e.clientY - r.top) / height - 0.5;
    
    setRotate({
      x: -y * 18,
      y: x * 18,
    });
  };

  const onMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      animate={{
        rotateX: rotate.x,
        rotateY: rotate.y,
        scale: rotate.x !== 0 || rotate.y !== 0 ? 1.03 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
      className="group relative block aspect-[1/1.414] overflow-hidden border border-border/80 bg-surface/30 p-6 backdrop-blur-md transition-colors duration-500 hover:border-gold/40 hover:bg-surface/50"
    >
      <div 
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-tr from-transparent via-gold/[0.04] to-gold/[0.08]"
        style={{ transform: "translateZ(20px)" }}
      />
      
      <div className="absolute inset-4 overflow-hidden border border-border/40 bg-background/40 p-5 flex flex-col justify-between" style={{ transform: "translateZ(45px)" }}>
        <div className="flex justify-between items-start">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold">Meghana Literature</span>
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">{size}</span>
        </div>

        <div className="relative my-4 aspect-[4/3] overflow-hidden border border-border/50 bg-background/25">
          <img
            src={ikUrl(image, { quality: 80 })}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        <div>
          <h3 className="font-display text-lg tracking-tight text-balance leading-snug group-hover:text-gold transition-colors duration-500">
            {name}
          </h3>
          <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.22em] text-gold/60">
            Digital Booklet
          </p>
        </div>
      </div>

      <div 
        className="absolute inset-0 bg-background/95 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col items-center justify-center p-6 text-center"
        style={{ transform: "translateZ(65px)" }}
      >
        <div className="flex h-12 w-12 items-center justify-center border border-gold/40 rounded-full bg-gold/10 text-gold mb-4 animate-bounce">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">Download PDF</span>
        <h4 className="mt-1 font-display text-lg text-foreground px-4">{name}</h4>
        <p className="mt-2 text-[10px] text-muted-foreground font-mono">{size}</p>
      </div>
    </motion.a>
  );
}

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projects — Meghana Builders" },
      { name: "description", content: "Featured residential, government, commercial & interior projects across Hyderabad." },
      { property: "og:title", content: "Projects — Meghana Builders" },
      { property: "og:description", content: "Selected works across Hyderabad." },
    ],
  }),
  component: ProjectsIndex,
});

const filters = ["All", "Residential", "Commercial", "Government", "Interiors"] as const;

function ProjectsIndex() {
  const { content } = useContent();
  const { projects, projectsPage, currentProjects, flagshipLandmark, projectLiterature } = content;

  const [active, setActive] = useState<string>("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      <section className="relative flex min-h-[45vh] items-end overflow-hidden border-b border-border pb-12 pt-32 lg:pb-16 lg:pt-44">
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="relative mx-auto w-full max-w-[1600px] px-6 lg:px-12">
          <Reveal>
            <p className="text-eyebrow">{projectsPage.eyebrow} — {projects.length} works</p>
          </Reveal>
          <h1 className="mt-6 text-display-xl text-balance">
            <RevealText text={projectsPage.titleNormal} />{" "}
            {projectsPage.titleItalic && (
              <span className="italic text-gold">
                <RevealText text={projectsPage.titleItalic} delay={0.2} />
              </span>
            )}
          </h1>

          <div className="mt-12 flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`border px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors ${
                  active === f
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          <AnimatePresence mode="popLayout">
            <motion.div layout className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-14">
              {filtered.map((p, i) => (
                <motion.div
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                >
                  <Link
                    to="/projects/$slug"
                    params={{ slug: p.slug }}
                    className="group block"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <IKImage
                        path={p.image}
                        transformation={{ quality: 80 }}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        alt={p.name}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                      <div className="absolute left-4 top-4 flex gap-2">
                        <span className="bg-background/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.22em] backdrop-blur">
                          {p.status}
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">{p.category}</p>
                        <h3 className="mt-2 font-display text-2xl lg:text-3xl">{p.name}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{p.location}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Current Projects Section */}
      <section className="relative overflow-hidden border-t border-border/60 py-16 lg:py-24 bg-surface/5">
        <div className="absolute inset-0 grid-overlay opacity-15 pointer-events-none" />
        <div className="relative mx-auto w-full max-w-[1600px] px-6 lg:px-12">
          
          <div className="max-w-2xl mx-auto lg:max-w-none mb-16 text-center lg:text-left">
            <Reveal>
              <p className="text-eyebrow">{currentProjects.eyebrow}</p>
            </Reveal>
            <h2 className="mt-6 text-display-md text-balance">
              {currentProjects.titleNormal}{" "}
              {currentProjects.titleItalic && (
                <span className="italic text-gold">{currentProjects.titleItalic}</span>
              )}
            </h2>
            {currentProjects.description && (
              <Reveal delay={0.2}>
                <p className="mt-6 text-sm text-muted-foreground text-pretty max-w-xl mx-auto lg:mx-0">
                  {currentProjects.description}
                </p>
              </Reveal>
            )}
          </div>

          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
            {currentProjects.items.map((item, idx) => (
              <CurrentProjectCard
                key={idx}
                name={item.name}
                description={item.description}
                url={item.url}
                image={item.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Landmark Spotlight */}
      <section className="relative overflow-hidden border-t border-border bg-surface/30 py-16 lg:py-24">
        <div className="absolute inset-0 grid-overlay opacity-10 pointer-events-none" />
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          <div className="grid gap-16 lg:grid-cols-12 lg:items-center lg:gap-24">
            
            {/* Landmark Meta */}
            <div className="lg:col-span-6">
              <Reveal>
                <p className="text-eyebrow">{flagshipLandmark.eyebrow}</p>
              </Reveal>
              <h2 className="mt-6 font-display text-4xl lg:text-5xl tracking-tight leading-tight">
                {flagshipLandmark.titleNormal}{" "}
                {flagshipLandmark.titleItalic && (
                  <span className="italic text-gold">{flagshipLandmark.titleItalic}</span>
                )}
              </h2>
              <Reveal delay={0.1}>
                <p className="mt-6 text-sm leading-relaxed text-muted-foreground text-pretty">
                  {flagshipLandmark.description}
                </p>
              </Reveal>
              
              {/* Highlight Metrics */}
              <div className="mt-12 grid gap-6 sm:grid-cols-3 border-t border-border pt-8">
                {flagshipLandmark.metrics.map((metric, idx) => (
                  <div key={idx}>
                    <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">{metric.label}</p>
                    <p className="mt-2 font-display text-2xl text-gold">{metric.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Landmark Image Frame */}
            <div className="lg:col-span-6">
              <Reveal delay={0.2}>
                <div className="relative aspect-[4/3] overflow-hidden border border-border">
                  <div className="absolute inset-0 bg-background/25 z-10" />
                  <img
                    src={ikUrl(flagshipLandmark.image, { quality: 85 })}
                    alt="Meghana Towers Architectural Design"
                    className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105"
                  />
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* Project Literature / Brochures Section */}
      <section className="relative overflow-hidden border-t border-border/60 py-16 lg:py-24 bg-surface/10">
        <div className="absolute inset-0 grid-overlay opacity-15 pointer-events-none" />
        <div className="relative mx-auto w-full max-w-[1600px] px-6 lg:px-12">
          
          <div className="max-w-2xl mx-auto lg:max-w-none mb-16 text-center lg:text-left">
            <Reveal>
              <p className="text-eyebrow">{projectLiterature.eyebrow}</p>
            </Reveal>
            <h2 className="mt-6 text-display-md text-balance">
              {projectLiterature.titleNormal}{" "}
              {projectLiterature.titleItalic && (
                <span className="italic text-gold">{projectLiterature.titleItalic}</span>
              )}
            </h2>
            {projectLiterature.description && (
              <Reveal delay={0.2}>
                <p className="mt-6 text-sm text-muted-foreground text-pretty max-w-xl mx-auto lg:mx-0">
                  {projectLiterature.description}
                </p>
              </Reveal>
            )}
          </div>

          <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projectLiterature.brochures.map((brochure, idx) => (
              <BrochureCard
                key={idx}
                name={brochure.name}
                size={brochure.size}
                url={brochure.url}
                image={brochure.image}
              />
            ))}
          </div>
        </div>
      </section>

      <CtaBlock />
    </>
  );
}


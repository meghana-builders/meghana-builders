import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { type Project } from "@/lib/content";
import { Reveal } from "./Reveal";
import { useContent } from "@/lib/contentContext";
import { ikUrl } from "@/lib/imagekit";

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0, show: false });

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top, show: true });
  };

  return (
    <Link
      ref={ref}
      to="/projects/$slug"
      params={{ slug: project.slug }}
      onMouseMove={onMove}
      onMouseLeave={() => setPos((p) => ({ ...p, show: false }))}
      onMouseEnter={() => setPos((p) => ({ ...p, show: true }))}
      className="group relative block border-t border-border last:border-b"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, margin: "-80px" }}
        transition={{ duration: 0.6, delay: index * 0.05 }}
        className="grid grid-cols-12 items-center gap-4 py-10 lg:py-14"
      >
        <div className="col-span-1 font-mono text-xs text-muted-foreground">
          0{index + 1}
        </div>
        <div className="col-span-7 lg:col-span-6">
          <h3 className="font-display text-3xl transition-colors duration-500 group-hover:text-gold lg:text-5xl">
            {project.name}
          </h3>
        </div>
        <div className="col-span-2 hidden font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground lg:block">
          {project.category}
        </div>
        <div className="col-span-3 lg:col-span-2 text-right font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          {project.location.split(",")[0]}
        </div>
        <div className="col-span-1 text-right font-mono text-[11px] uppercase tracking-[0.22em] text-gold">
          {project.status === "Ongoing" ? "●" : project.status === "Upcoming" ? "○" : "✓"}
        </div>
      </motion.div>

      {/* Mouse-follow preview */}
      <div
        className="pointer-events-none absolute z-20 hidden h-72 w-96 overflow-hidden transition-opacity duration-300 lg:block"
        style={{
          left: pos.x,
          top: pos.y,
          transform: "translate(-50%, -50%)",
          opacity: pos.show ? 1 : 0,
        }}
      >
        <div
          className="h-full w-full transition-transform duration-700"
          style={{
            backgroundImage: `url(${ikUrl(project.image)})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: pos.show ? "scale(1.06)" : "scale(1)",
          }}
        />
      </div>
    </Link>
  );
}

export function ProjectsShowcase({ heading = true }: { heading?: boolean }) {
  const { content } = useContent();
  const { projects } = content;

  return (
    <section className="relative py-16 lg:py-24">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        {heading && (
          <div className="mb-20 flex flex-col gap-10 lg:mb-28 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <p className="text-eyebrow">Selected Work</p>
              <h2 className="mt-6 text-display-lg text-balance">
                Landmarks <span className="italic text-gold">in motion.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <Link
                to="/projects"
                className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground hover:text-gold"
              >
                Index of all work →
              </Link>
            </Reveal>
          </div>
        )}

        <div className="border-t border-border lg:border-t-0">
          {projects.map((p, i) => (
            <ProjectRow key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

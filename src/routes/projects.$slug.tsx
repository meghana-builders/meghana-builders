import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useContent, defaultContent } from "@/lib/contentContext";
import { projects as staticProjects } from "@/lib/content";
import { Reveal, RevealText } from "@/components/Reveal";
import { CtaBlock } from "@/components/CtaBlock";
import { ikUrl } from "@/lib/imagekit";
import { database } from "@/lib/firebase";
import { ref, get } from "firebase/database";

export const Route = createFileRoute("/projects/$slug")({
  loader: async ({ params }) => {
    try {
      const snapshot = await get(ref(database, "siteContent"));
      const dbData = snapshot.val();
      const dbProjects = dbData?.projects || defaultContent.projects;
      const project = dbProjects.find((p: any) => p.slug === params.slug);
      if (!project) throw notFound();
      return { project, slug: params.slug };
    } catch (e) {
      const project = staticProjects.find((p) => p.slug === params.slug);
      if (!project) throw notFound();
      return { project, slug: params.slug };
    }
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.project.name} — Meghana Builders` },
          { name: "description", content: loaderData.project.description },
          { property: "og:title", content: `${loaderData.project.name} — Meghana Builders` },
          { property: "og:description", content: loaderData.project.description },
          { property: "og:image", content: ikUrl(loaderData.project.image) },
        ]
      : [],
  }),
  component: ProjectDetail,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center px-4 text-center">
      <div>
        <p className="text-eyebrow">404</p>
        <h1 className="mt-4 text-display-md">Project not found.</h1>
        <Link to="/projects" className="mt-6 inline-block font-mono text-xs uppercase tracking-[0.22em] text-gold">
          ← Back to projects
        </Link>
      </div>
    </div>
  ),
});

function ProjectDetail() {
  const { slug } = Route.useLoaderData();
  const { content } = useContent();
  const { projects } = content;
  
  const project = projects.find((p) => p.slug === slug) || projects[0];
  
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[idx !== -1 ? (idx + 1) % projects.length : 0];

  return (
    <>
      <section ref={ref} className="relative h-[65vh] min-h-[450px] overflow-hidden">
        <motion.div style={{ y, scale }} className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${ikUrl(project.image)})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-veil" />
        </motion.div>
        <div className="absolute inset-0 grid-overlay opacity-20" />
        <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-6 pb-12 lg:px-12 lg:pb-16">
          <Reveal>
            <p className="text-eyebrow">{project.category} · {project.status} · {project.year}</p>
          </Reveal>
          <h1 className="mt-6 text-display-xl text-balance">
            <RevealText text={project.name} />
          </h1>
          <Reveal delay={0.3}>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              — {project.location}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto grid max-w-[1600px] gap-16 px-6 lg:grid-cols-12 lg:gap-24 lg:px-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-eyebrow">Overview</p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 text-2xl text-balance lg:text-3xl font-display leading-snug">
                {project.description}
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.2}>
              <p className="text-eyebrow">Highlights</p>
              <ul className="mt-8 space-y-4 border-t border-border pt-6">
                {project.highlights.map((h: string) => (
                  <li key={h} className="flex items-start gap-4 border-b border-border pb-4">
                    <span className="font-mono text-xs text-gold">+</span>
                    <span className="text-foreground">{h}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface py-16 lg:py-24">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          <Reveal>
            <p className="text-eyebrow">Amenities</p>
          </Reveal>
          <div className="mt-12 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-5">
            {project.amenities.map((a: string, i: number) => (
              <motion.div
                key={a}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="group relative overflow-hidden bg-surface p-8 lg:p-10"
              >
                <span className="font-mono text-xs text-gold">0{i + 1}</span>
                <p className="mt-6 font-display text-xl">{a}</p>
                <div className="absolute bottom-0 left-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location panel */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto grid max-w-[1600px] gap-12 px-6 lg:grid-cols-2 lg:gap-20 lg:px-12">
          <Reveal>
            <p className="text-eyebrow">Location</p>
            <h2 className="mt-6 text-display-md text-balance">{project.location}</h2>
            <p className="mt-6 max-w-md text-muted-foreground text-pretty">
              On-site visits are arranged by appointment. Reach out and we'll schedule a private walkthrough.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="relative aspect-[4/3] overflow-hidden border border-border bg-surface">
              <div className="grid-overlay absolute inset-0 opacity-40" />
              <div className="absolute inset-0 grid place-items-center">
                <div className="text-center">
                  <div className="float mx-auto grid h-20 w-20 place-items-center rounded-full border border-gold text-gold">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path d="M12 22s8-9 8-14a8 8 0 10-16 0c0 5 8 14 8 14z" stroke="currentColor" strokeWidth="1.2" />
                      <circle cx="12" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                  </div>
                  <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                    {project.location}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Next project */}
      <section className="border-t border-border bg-surface">
        <Link
          to="/projects/$slug"
          params={{ slug: next.slug }}
          className="group relative block overflow-hidden"
        >
          <div className="grid h-[50vh] min-h-[350px] grid-cols-12 items-center">
            <div className="col-span-12 px-6 lg:col-span-6 lg:px-12">
              <p className="text-eyebrow">Next project</p>
              <h3 className="mt-6 text-display-lg transition-colors duration-500 group-hover:text-gold">
                {next.name}
              </h3>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                {next.category} · {next.location}
              </p>
            </div>
            <div className="col-span-12 hidden h-full lg:col-span-6 lg:block">
              <div
                className="h-full w-full transition-transform duration-1000 group-hover:scale-105"
                style={{
                  backgroundImage: `url(${ikUrl(next.image)})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </div>
          </div>
        </Link>
      </section>

      <CtaBlock />
    </>
  );
}


import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useContent } from "@/lib/contentContext";
import { Reveal, RevealText } from "@/components/Reveal";
import { WorkflowSection } from "@/components/WorkflowSection";
import { CtaBlock } from "@/components/CtaBlock";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Meghana Builders" },
      { name: "description", content: "Specialized construction, government projects, civil engineering, renovation, architectural design, structural engineering, project management, Vastu, joint ventures." },
      { property: "og:title", content: "Services — Meghana Builders" },
      { property: "og:description", content: "Comprehensive construction & design services in Hyderabad." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const { content } = useContent();
  const { services, servicesPage } = content;

  return (
    <>
      <section className="relative flex min-h-[45vh] items-end overflow-hidden border-b border-border pb-12 pt-32 lg:pb-16 lg:pt-44">
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="relative mx-auto w-full max-w-[1600px] px-6 lg:px-12">
          <Reveal>
            <p className="text-eyebrow">{servicesPage.eyebrow}</p>
          </Reveal>
          <h1 className="mt-6 max-w-5xl text-display-xl text-balance">
            <RevealText text={servicesPage.titleFirst} />{" "}
            {servicesPage.titleItalic && (
              <span className="italic text-gold">
                <RevealText text={servicesPage.titleItalic} delay={0.3} />
              </span>
            )}
          </h1>
          {servicesPage.description && (
            <Reveal delay={0.5}>
              <p className="mt-8 max-w-xl text-muted-foreground text-pretty lg:text-lg">
                {servicesPage.description}
              </p>
            </Reveal>
          )}
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          <div className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-40px" }}
                transition={{ duration: 0.7, delay: (i % 3) * 0.1 }}
                className="group relative overflow-hidden bg-background p-10 transition-colors hover:bg-surface lg:p-12"
              >
                <p className="font-mono text-xs text-blue-500">0{i + 1}</p>
                <h3 className="mt-8 font-display text-2xl lg:text-3xl">{s.name}</h3>
                <p className="mt-4 text-sm text-muted-foreground text-pretty">{s.body}</p>
                <div className="mt-10 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground opacity-0 transition-opacity duration-500 group-hover:text-gold group-hover:opacity-100">
                  Enquire
                  <span>→</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <WorkflowSection />

      <CtaBlock />
    </>
  );
}


import { createFileRoute } from "@tanstack/react-router";
import { useContent } from "@/lib/contentContext";
import { PhilosophySection } from "@/components/PhilosophySection";
import { TimelineSection } from "@/components/TimelineSection";
import { AboutChairmanSection } from "@/components/AboutChairmanSection";
import { CtaBlock } from "@/components/CtaBlock";
import { Reveal, RevealText } from "@/components/Reveal";
import { ikUrl } from "@/lib/imagekit";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Meghana Builders" },
      { name: "description", content: "Established in 2018, Meghana Builders & Developers operates at the intersection of architectural innovation and structural engineering excellence." },
      { property: "og:title", content: "The Studio — Meghana Builders" },
      { property: "og:description", content: "About Meghana Builders & Developers" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { content } = useContent();
  const { about } = content;

  return (
    <>
      <section className="relative flex min-h-[45vh] items-end overflow-hidden border-b border-border pb-12 pt-32 lg:pb-16 lg:pt-44">
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="relative mx-auto w-full max-w-[1600px] px-6 lg:px-12">
          <Reveal>
            <p className="text-eyebrow">{about.headerEyebrow}</p>
          </Reveal>
          <h1 className="mt-6 text-display-xl text-balance">
            <RevealText text={about.headerTitle} />
            {about.headerSubtitle && (
              <>
                <br />
                <span className="italic text-gold">
                  <RevealText text={about.headerSubtitle} delay={0.3} />
                </span>
              </>
            )}
          </h1>
        </div>
      </section>

      {/* Brand Narrative Intro */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          <div className="grid gap-16 lg:grid-cols-12 lg:items-center lg:gap-20">
            <div className="lg:col-span-7 space-y-8">
              <div>
                <Reveal>
                  <p className="text-eyebrow">{about.narrativeEyebrow}</p>
                </Reveal>
                <h2 className="mt-6 text-display-md text-balance">
                  {about.narrativeTitle}
                </h2>
              </div>
              <div className="space-y-6 text-base text-muted-foreground lg:text-lg">
                {about.body.map((p, idx) => (
                  <Reveal key={idx} delay={idx * 0.1}>
                    <p className="text-pretty">{p}</p>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={0.3}>
                <div className="relative aspect-[4/5] overflow-hidden border border-border/80 bg-surface/10">
                  <img
                    src={ikUrl(about.image, { quality: 85 })}
                    alt="Meghana Builders Architectural Detailing"
                    className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <AboutChairmanSection />
      <PhilosophySection />
      <TimelineSection />
      <CtaBlock />
    </>
  );
}


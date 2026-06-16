import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";
import { StatsStrip } from "@/components/StatsStrip";
import { AboutSection } from "@/components/AboutSection";
import { ChairmanSection } from "@/components/ChairmanSection";
import { ProjectsShowcase } from "@/components/ProjectsShowcase";
import { WhyUs } from "@/components/WhyUs";
import { TestimonialsMarquee } from "@/components/TestimonialsMarquee";
import { CtaBlock } from "@/components/CtaBlock";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Meghana Builders — Crafting Landmarks in Hyderabad" },
      { name: "description", content: "Premier residential, commercial & government construction in Hyderabad. Architectural innovation meets structural excellence. Est. 2018." },
      { property: "og:title", content: "Meghana Builders — Crafting Landmarks" },
      { property: "og:description", content: "Premier residential, commercial & government construction in Hyderabad." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <AboutSection />
      <ChairmanSection />
      <ProjectsShowcase />
      <WhyUs />
      <TestimonialsMarquee />
      <CtaBlock />
    </>
  );
}

import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";
import { MagneticButton } from "./MagneticButton";
import { company } from "@/lib/content";

export function CtaBlock() {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      <div className="absolute inset-0 grid-overlay opacity-30" />
      <div className="relative mx-auto max-w-[1400px] px-6 text-center lg:px-12">
        <Reveal>
          <p className="text-eyebrow">Next chapter</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mx-auto mt-8 max-w-4xl text-display-lg text-balance">
            Have a plot, a vision, <br />or a vacant floor? <span className="italic text-gold">Let's talk.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-14 flex flex-wrap justify-center gap-4">
            <MagneticButton to="/contact">Start your project</MagneticButton>
            <MagneticButton href={company.whatsapp} variant="ghost">WhatsApp us</MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

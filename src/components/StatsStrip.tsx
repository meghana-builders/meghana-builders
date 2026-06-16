import { useContent } from "@/lib/contentContext";
import { CountUp } from "./CountUp";
import { Reveal } from "./Reveal";

export function StatsStrip() {
  const { content } = useContent();
  const { stats } = content;

  return (
    <section className="relative border-y border-border bg-surface py-20 lg:py-28">
      <div className="grid-overlay absolute inset-0 opacity-30" />
      <div className="relative mx-auto grid max-w-[1600px] grid-cols-2 gap-12 px-6 lg:grid-cols-4 lg:px-12">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1}>
            <div className="border-l border-border pl-6">
              <p className="font-display text-5xl text-gold lg:text-7xl">
                <CountUp to={s.value} decimals={s.value % 1 ? 1 : 0} />
                <span className="text-foreground">{s.suffix}</span>
              </p>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                {s.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

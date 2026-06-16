import { useContent } from "@/lib/contentContext";

export function TestimonialsMarquee() {
  const { content } = useContent();
  const { testimonials } = content;
  const loop = [...testimonials, ...testimonials];
  return (
    <section className="relative overflow-hidden border-y border-border bg-surface py-16 lg:py-20">
      <div className="mb-12 flex items-baseline justify-between px-6 lg:px-12">
        <p className="text-eyebrow">Client Stories</p>
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground hidden sm:block">
          — voices from completed homes
        </p>
      </div>
      <div className="relative">
        <div className="marquee-track flex w-max gap-6">
          {loop.map((t, i) => (
            <figure
              key={i}
              className="w-[440px] shrink-0 border border-border bg-background p-10 lg:w-[560px]"
            >
              <span className="font-display text-5xl leading-none text-gold">"</span>
              <blockquote className="mt-2 font-display text-xl leading-snug text-pretty lg:text-2xl">
                {t.body}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <span className="grid h-12 w-12 place-items-center border border-gold font-display text-gold">
                  {t.name[0]}
                </span>
                <div>
                  <p className="font-display text-base">{t.name}</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

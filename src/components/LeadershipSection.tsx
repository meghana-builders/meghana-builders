import { motion } from "framer-motion";
import { Reveal, RevealText } from "./Reveal";

interface Leader {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export function LeadershipSection() {
  const leaders: Leader[] = [
    {
      name: "Mr. Manikanth Kondapally",
      role: "Founder & Chairman",
      bio: "Driving the vision of Meghana Builders since 2018 with a dedication to structural honesty, long-term covenant value, and premium engineering standards.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600&h=800",
    },
    {
      name: "Ar. Ananya Sen",
      role: "Head of Architecture",
      bio: "Modernist architect specializing in spatial efficiency, natural light mapping, and contemporary facade design that integrates local materials.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600&h=800",
    },
    {
      name: "Er. Vikram Aditya",
      role: "Director of Engineering",
      bio: "Structural engineer with over 12 years of experience in heavy infrastructure, seismic design, and smart project management execution.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600&h=800",
    },
  ];

  return (
    <section className="relative overflow-hidden py-24 lg:py-36 border-t border-border/60">
      <div className="absolute inset-0 grid-overlay opacity-15 pointer-events-none" />
      
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <div className="max-w-2xl mb-16 lg:mb-24">
          <Reveal>
            <p className="text-eyebrow">The Leadership</p>
          </Reveal>
          <h2 className="mt-6 text-display-md text-balance">
            <RevealText text="Obsessives behind the structures." />
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-6 text-sm text-muted-foreground text-pretty max-w-xl">
              Our studio combines structural rigor with aesthetic innovation, led by builders committed to creating legacy landmarks.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {leaders.map((l, i) => (
            <motion.div
              key={l.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-40px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.7, 0, 0.2, 1] }}
              className="group relative border border-border/80 bg-surface/20 p-5 backdrop-blur hover:border-gold/30 transition-all duration-500"
            >
              {/* Leader Image */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={l.image}
                  alt={l.name}
                  className="h-full w-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 ease-[0.7, 0, 0.2, 1] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
              </div>

              {/* Leader Meta */}
              <div className="mt-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">{l.role}</p>
                <h3 className="mt-2 font-display text-xl tracking-tight text-foreground transition-colors group-hover:text-gold">{l.name}</h3>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground text-pretty">
                  {l.bio}
                </p>
              </div>

              {/* Decorative accent dot */}
              <div className="absolute right-4 bottom-4 h-1 w-1 bg-border group-hover:bg-gold rounded-full transition-colors duration-500" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

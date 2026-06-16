import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useContent } from "@/lib/contentContext";
import { ikUrl } from "@/lib/imagekit";

export function Navigation() {
  const { content } = useContent();
  const { nav, company } = content;
  
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.7, 0, 0.2, 1] }}
        className={`fixed inset-x-0 z-50 transition-all duration-500 ease-in-out ${
          scrolled
            ? "top-0 lg:top-4 mx-auto w-full lg:w-[calc(100%-2.5rem)] lg:max-w-[1200px] lg:rounded-full border-b lg:border border-border/80 bg-background/65 backdrop-blur-xl shadow-[0_8px_32px_oklch(0_0_0_/_0.3)]"
            : "top-0 w-full border-b border-white/5 bg-background/25 backdrop-blur-md"
        }`}
      >
        <div className={`mx-auto flex items-center justify-between transition-all duration-500 ${
          scrolled 
            ? "px-6 py-2 lg:px-10" 
            : "px-6 py-4 lg:px-12 lg:py-4"
        }`}>
          <Link to="/" className="group flex items-center gap-3">
            {company.logo ? (
              <img
                src={ikUrl(company.logo, { height: 64 })}
                alt={company.name}
                className="h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <span className="grid h-16 w-16 place-items-center border border-blue-500 text-blue-400 font-display text-xl transition-transform duration-300 group-hover:scale-105">M</span>
            )}
            <span className="hidden font-display text-base tracking-tight sm:block transition-transform duration-300 group-hover:translate-x-1">{company.name}</span>
          </Link>

          <nav className="hidden items-center gap-10 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === '/' }}
                className="relative font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition-all duration-300 hover:text-blue-400 py-2 group"
                activeProps={{ className: "font-mono text-[11px] uppercase tracking-[0.22em] text-blue-500" }}
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    <span className={`absolute bottom-0 left-0 h-[1.5px] bg-blue-500 transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`} />
                  </>
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-6 lg:flex">
            <a
              href={`tel:${company.phone}`}
              className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground hover:text-blue-400 transition-colors duration-300"
            >
              {company.phone}
            </a>
            <Link
              to="/contact"
              className="relative overflow-hidden border border-blue-500 px-6 py-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-blue-400 transition-all duration-300 hover:text-white hover:border-blue-600 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] group"
            >
              <span className="absolute inset-0 translate-y-full bg-blue-600 transition-transform duration-300 ease-out group-hover:translate-y-0" />
              <span className="relative z-10">Enquire</span>
            </Link>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="relative grid h-10 w-10 place-items-center lg:hidden rounded-full border border-border/40 hover:border-blue-500/50 transition-colors duration-300"
          >
            <span className={`absolute h-0.5 w-5 bg-foreground transition-all duration-300 ${open ? "rotate-45" : "-translate-y-1.5"}`} />
            <span className={`absolute h-0.5 w-5 bg-foreground transition-all duration-300 ${open ? "-rotate-45" : "translate-y-1.5"}`} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[70px] z-40 border-b border-border/80 bg-background/70 backdrop-blur-xl lg:hidden shadow-[0_8px_32px_0_oklch(0_0_0_/_0.3)]"
          >
            <nav className="flex flex-col px-6 py-8">
              {nav.map((item, i) => (
                <Link
                  key={item.to}
                  to={item.to}
                  activeOptions={{ exact: item.to === '/' }}
                  className="border-b border-border py-5 font-display text-3xl flex items-center transition-all duration-300 hover:text-blue-400 hover:pl-4"
                  activeProps={{ className: "border-b border-border py-5 font-display text-3xl flex items-center text-blue-500 hover:pl-4" }}
                >
                  <span className="mr-3 font-mono text-xs text-blue-500">0{i + 1}</span>
                  {item.label}
                </Link>
              ))}
              <a
                href={`tel:${company.phone}`}
                className="mt-8 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground"
              >
                {company.phone}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

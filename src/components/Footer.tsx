import { Link } from "@tanstack/react-router";
import { useContent } from "@/lib/contentContext";

export function Footer() {
  const { content } = useContent();
  const { company, nav } = content;

  return (
    <footer className="relative border-t border-border bg-background">
      <div className="grid-overlay absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-[1600px] px-6 py-20 lg:px-12 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="text-eyebrow">{company.city}, India</p>
            <h2 className="mt-6 text-display-lg text-balance">
              Let's build something <span className="italic text-gold">that outlasts us.</span>
            </h2>
            <Link
              to="/contact"
              className="mt-10 inline-flex items-center gap-3 border-b border-gold pb-2 font-mono text-xs uppercase tracking-[0.22em] text-gold"
            >
              Start a project
              <span>→</span>
            </Link>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-6">
            <div>
              <p className="text-eyebrow mb-5">Studio</p>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {nav.map((n) => (
                  <li key={n.to}>
                    <Link to={n.to} className="hover:text-foreground">{n.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-eyebrow mb-5">Contact</p>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href={`tel:${company.phone}`}>{company.phone}</a></li>
                <li><a href={`mailto:${company.email}`}>{company.email}</a></li>
                <li><a href={company.whatsapp}>WhatsApp</a></li>
              </ul>
            </div>
            <div>
              <p className="text-eyebrow mb-5">Follow</p>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {company.social.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} className="hover:text-foreground">{s.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
            <p>© {new Date().getFullYear()} {company.name}. All rights reserved.</p>
            <Link to="/admin" className="hover:text-gold transition-colors font-mono text-[9px] uppercase tracking-[0.22em]">
              MADE BY ARANEA DEN
            </Link>
          </div>
          <p className="font-mono uppercase tracking-[0.22em]">
            {company.address.line1} · {company.address.line2}
          </p>
        </div>
      </div>
    </footer>
  );
}

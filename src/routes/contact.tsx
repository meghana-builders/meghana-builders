import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useContent } from "@/lib/contentContext";
import { Reveal, RevealText } from "@/components/Reveal";
import { MagneticButton } from "@/components/MagneticButton";
import { FaqAccordion } from "@/components/FaqAccordion";
import { database } from "@/lib/firebase";
import { ref, push, set, serverTimestamp } from "firebase/database";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Meghana Builders" },
      { name: "description", content: "Get in touch with Meghana Builders. Phone, WhatsApp, email, or visit our office." },
      { property: "og:title", content: "Contact — Meghana Builders" },
      { property: "og:description", content: "Start a project, schedule a site visit, or just say hello." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { content } = useContent();
  const { company, contactPage } = content;

  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const enquiriesRef = ref(database, "enquiries");
      const newEnquiryRef = push(enquiriesRef);
      await set(newEnquiryRef, {
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
        timestamp: serverTimestamp(),
      });
      toast.success("Message received. We'll be in touch within 24 hours.");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Firebase submission error: ", error);
      toast.error("Failed to send message. Please try again or contact us directly.");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: "name", label: "Your name", type: "text" },
    { name: "email", label: "Email address", type: "email" },
    { name: "phone", label: "Phone (optional)", type: "tel" },
  ] as const;

  return (
    <>
      <section className="relative flex min-h-[45vh] items-end overflow-hidden border-b border-border pb-12 pt-32 lg:pb-16 lg:pt-44">
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="relative mx-auto w-full max-w-[1600px] px-6 lg:px-12">
          <Reveal>
            <p className="text-eyebrow">{contactPage.cover.eyebrow}</p>
          </Reveal>
          <h1 className="mt-6 text-display-xl text-balance">
            <RevealText text={contactPage.cover.titleNormal} />{" "}
            {contactPage.cover.titleItalic && (
              <span className="italic text-gold">
                <RevealText text={contactPage.cover.titleItalic} delay={0.2} />
              </span>
            )}
          </h1>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto grid max-w-[1600px] gap-20 px-6 lg:grid-cols-12 lg:gap-24 lg:px-12">
          {/* Contact cards */}
          <div className="space-y-6 lg:col-span-5">
            {[
              { label: "Studio", lines: [company.address.line1, company.address.line2] },
              { label: "Phone & WhatsApp", lines: [company.phone] },
              { label: "Email", lines: [company.email] },
            ].map((card, i) => (
              <Reveal key={card.label} delay={i * 0.1}>
                <div className="group relative overflow-hidden border border-border bg-surface/40 p-8 backdrop-blur transition-colors hover:bg-surface lg:p-10">
                  <p className="font-mono text-xs uppercase tracking-[0.22em] text-gold">{card.label}</p>
                  <div className="mt-4 space-y-1 font-display text-lg lg:text-xl">
                    {card.lines.map((l) => (
                      <p key={l}>{l}</p>
                    ))}
                  </div>
                  <div className="absolute bottom-0 left-0 h-px w-0 bg-blue-500 transition-all duration-700 group-hover:w-full" />
                </div>
              </Reveal>
            ))}

            {/* Map placeholder */}
            <Reveal delay={0.3}>
              <div className="relative aspect-[4/3] overflow-hidden border border-border bg-surface">
                <div className="grid-overlay absolute inset-0 opacity-40" />
                {/* animated ping */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <span className="absolute inset-0 animate-ping rounded-full bg-blue-500/50" style={{ width: 60, height: 60, left: -30, top: -30 }} />
                    <div className="grid h-16 w-16 place-items-center rounded-full border border-blue-500 bg-background text-blue-500">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                        <path d="M12 22s8-9 8-14a8 8 0 10-16 0c0 5 8 14 8 14z" stroke="currentColor" strokeWidth="1.2" />
                        <circle cx="12" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.2" />
                      </svg>
                    </div>
                  </div>
                </div>
                <p className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  {contactPage.mapLabel}
                </p>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-eyebrow">{contactPage.enquiryEyebrow}</p>
              <h2 className="mt-6 text-display-md">{contactPage.enquiryTitle}</h2>
            </Reveal>

            <form onSubmit={submit} className="mt-12 space-y-10">
              {fields.map((f, i) => (
                <motion.div
                  key={f.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                >
                  <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    {f.label}
                  </label>
                  <input
                    required={f.name !== "phone"}
                    disabled={loading}
                    type={f.type}
                    value={form[f.name]}
                    onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                    className="mt-2 w-full border-0 border-b border-border bg-transparent py-3 font-display text-2xl text-foreground outline-none transition-colors focus:border-blue-500 lg:text-3xl disabled:opacity-50"
                  />
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  Your project
                </label>
                <textarea
                  required
                  disabled={loading}
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="mt-2 w-full resize-none border-0 border-b border-border bg-transparent py-3 font-display text-2xl text-foreground outline-none transition-colors focus:border-blue-500 lg:text-3xl disabled:opacity-50"
                />
              </motion.div>

              <div className="pt-4">
                <MagneticButton type="submit" disabled={loading}>
                  {loading ? "Sending..." : "Send message"}
                </MagneticButton>
              </div>
            </form>
          </div>
        </div>
      </section>

      <FaqAccordion />
    </>
  );
}


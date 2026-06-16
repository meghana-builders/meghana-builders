import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useContent, type SiteContent, defaultContent } from "@/lib/contentContext";
import { imageKitConfig } from "@/lib/imagekit";
import { getImageKitAuthSignature } from "@/lib/api/imagekit-auth";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "CMS Control Panel — Meghana Builders" },
    ],
  }),
  component: AdminDashboard,
});

type TabType = "general" | "hero" | "about" | "stats" | "projects" | "services" | "testimonials" | "contact" | "faqs";

function AdminDashboard() {
  const { content, saveContent, loading } = useContent();
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("general");
  const [state, setState] = useState<SiteContent>(defaultContent);
  const [saving, setSaving] = useState(false);

  // Sync state once content is fetched
  useEffect(() => {
    if (content) {
      setState(content);
    }
  }, [content]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "meghana2025") {
      setIsAuthenticated(true);
      toast.success("Access granted. Welcome back.");
    } else {
      toast.error("Invalid passcode. Please try again.");
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveContent(state);
      toast.success("CMS configurations successfully synced with database.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to sync changes with Firebase database.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#15120e] text-foreground">
        <div className="space-y-4 text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent mx-auto" />
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">Checking blueprints...</p>
        </div>
      </div>
    );
  }

  // Login Gate
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#15120e] px-4">
        <div className="absolute inset-0 grid-overlay opacity-25" />
        <div className="relative w-full max-w-md border border-border/80 bg-surface/30 p-8 backdrop-blur lg:p-10">
          <div className="text-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Meghana Builders</span>
            <h1 className="mt-4 font-display text-3xl">CMS Control</h1>
            <p className="mt-2 text-xs text-muted-foreground">Enter access code to manage website blueprint.</p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-6">
            <div className="space-y-2">
              <label className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Passcode</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full border-0 border-b border-border bg-transparent py-3 text-center font-display text-2xl outline-none focus:border-gold transition-colors"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white hover:bg-blue-500 transition-colors"
            >
              Unlock Terminal
            </button>
          </form>
          <div className="mt-6 text-center text-[10px] text-muted-foreground/50">
            Hint: default passcode is <code className="text-gold/70">meghana2025</code>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#15120e] text-foreground pt-32 pb-24">
      <div className="absolute inset-0 grid-overlay opacity-10 pointer-events-none" />
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        
        {/* Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between border-b border-border/60 pb-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-gold">CMS Studio</p>
            <h1 className="mt-4 font-display text-4xl lg:text-5xl">Content Controller</h1>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-blue-600 px-8 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white hover:bg-blue-500 disabled:opacity-50 transition-colors"
            >
              {saving ? "Syncing..." : "Sync Changes"}
            </button>
          </div>
        </div>

        {/* Layout */}
        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          
          {/* Tabs */}
          <div className="lg:col-span-3 space-y-1">
            {[
              { id: "general", label: "Branding & General" },
              { id: "hero", label: "Hero Banner" },
              { id: "about", label: "Studio & Chairman" },
              { id: "stats", label: "Stats & Why Us" },
              { id: "projects", label: "Projects Inventory" },
              { id: "services", label: "Core Services" },
              { id: "testimonials", label: "Testimonials" },
              { id: "contact", label: "Contact Page" },
              { id: "faqs", label: "FAQs" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as TabType)}
                className={`w-full text-left px-6 py-4 font-mono text-xs uppercase tracking-[0.15em] border-l-2 transition-colors ${
                  activeTab === t.id
                    ? "border-gold bg-surface/50 text-foreground"
                    : "border-border/20 text-muted-foreground hover:text-foreground hover:bg-surface/20"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Editor Container */}
          <div className="lg:col-span-9 border border-border bg-surface/20 p-8 lg:p-12 backdrop-blur">
            
            {/* 1. GENERAL TAB */}
            {activeTab === "general" && (
              <div className="space-y-8">
                <h2 className="font-display text-2xl border-b border-border/60 pb-3">Company Metadata</h2>
                
                <div className="grid gap-6 sm:grid-cols-2">
                  <FormInput
                    label="Company Name"
                    value={state.company.name}
                    onChange={(v) => setState({
                      ...state,
                      company: { ...state.company, name: v }
                    })}
                  />
                  <FormInput
                    label="Tagline"
                    value={state.company.tagline}
                    onChange={(v) => setState({
                      ...state,
                      company: { ...state.company, tagline: v }
                    })}
                  />
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <FormInput
                    label="Contact Phone"
                    value={state.company.phone}
                    onChange={(v) => setState({
                      ...state,
                      company: { ...state.company, phone: v }
                    })}
                  />
                  <FormInput
                    label="Contact Email"
                    value={state.company.email}
                    onChange={(v) => setState({
                      ...state,
                      company: { ...state.company, email: v }
                    })}
                  />
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <FormInput
                    label="WhatsApp Chat URL"
                    value={state.company.whatsapp}
                    onChange={(v) => setState({
                      ...state,
                      company: { ...state.company, whatsapp: v }
                    })}
                  />
                  <FormInput
                    label="City Location"
                    value={state.company.city}
                    onChange={(v) => setState({
                      ...state,
                      company: { ...state.company, city: v }
                    })}
                  />
                </div>

                <div className="space-y-6 border-t border-border/60 pt-6">
                  <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-gold">Identity & Branding</h3>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <MediaUpload
                      label="Company Logo (Nav Header)"
                      value={state.company.logo || ""}
                      onChange={(v) => setState({
                        ...state,
                        company: { ...state.company, logo: v }
                      })}
                    />
                    <MediaUpload
                      label="Browser Favicon (.ico / .png)"
                      value={state.company.favicon || ""}
                      onChange={(v) => setState({
                        ...state,
                        company: { ...state.company, favicon: v }
                      })}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">Office Address</h3>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <FormInput
                      label="Line 1"
                      value={state.company.address.line1}
                      onChange={(v) => setState({
                        ...state,
                        company: {
                          ...state.company,
                          address: { ...state.company.address, line1: v }
                        }
                      })}
                    />
                    <FormInput
                      label="Line 2"
                      value={state.company.address.line2}
                      onChange={(v) => setState({
                        ...state,
                        company: {
                          ...state.company,
                          address: { ...state.company.address, line2: v }
                        }
                      })}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">Social Links</h3>
                  <div className="grid gap-6 sm:grid-cols-3">
                    {state.company.social.map((s, idx) => (
                      <FormInput
                        key={idx}
                        label={`${s.label} URL`}
                        value={s.href}
                        onChange={(v) => {
                          const newSocial = [...state.company.social];
                          newSocial[idx] = { ...newSocial[idx], href: v };
                          setState({
                            ...state,
                            company: { ...state.company, social: newSocial }
                          });
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 2. HERO TAB */}
            {activeTab === "hero" && (
              <div className="space-y-8">
                <h2 className="font-display text-2xl border-b border-border/60 pb-3">Hero Section Banner</h2>
                
                <FormInput
                  label="Eyebrow Text"
                  value={state.hero.eyebrow}
                  onChange={(v) => setState({
                    ...state,
                    hero: { ...state.hero, eyebrow: v }
                  })}
                />

                <div className="space-y-2">
                  <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Title Lines (One per line)</label>
                  <textarea
                    rows={4}
                    value={state.hero.titleLines.join("\n")}
                    onChange={(e) => setState({
                      ...state,
                      hero: { ...state.hero, titleLines: e.target.value.split("\n") }
                    })}
                    className="w-full border border-border bg-surface/40 p-4 font-mono text-sm outline-none focus:border-gold"
                  />
                </div>

                <FormInput
                  label="Subtitle Text"
                  value={state.hero.subtitle}
                  onChange={(v) => setState({
                    ...state,
                    hero: { ...state.hero, subtitle: v }
                  })}
                />

                <div className="grid gap-6 sm:grid-cols-2">
                  <FormInput
                    label="Primary CTA Label"
                    value={state.hero.primaryCta.label}
                    onChange={(v) => setState({
                      ...state,
                      hero: {
                        ...state.hero,
                        primaryCta: { ...state.hero.primaryCta, label: v }
                      }
                    })}
                  />
                  <FormInput
                    label="Secondary CTA Label"
                    value={state.hero.secondaryCta.label}
                    onChange={(v) => setState({
                      ...state,
                      hero: {
                        ...state.hero,
                        secondaryCta: { ...state.hero.secondaryCta, label: v }
                      }
                    })}
                  />
                </div>

                <div className="space-y-6 border-t border-border/60 pt-6">
                  <h3 className="font-mono text-xs uppercase tracking-[0.1em] text-gold">Background Media Setup</h3>
                  
                  <div className="flex gap-6 items-center">
                    <span className="font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">Media Type:</span>
                    <label className="flex items-center gap-2 cursor-pointer font-mono text-xs">
                      <input
                        type="radio"
                        name="heroBgType"
                        checked={state.hero.backgroundType !== "video"}
                        onChange={() => setState({
                          ...state,
                          hero: { ...state.hero, backgroundType: "image" }
                        })}
                        className="accent-gold"
                      />
                      Static Image
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer font-mono text-xs">
                      <input
                        type="radio"
                        name="heroBgType"
                        checked={state.hero.backgroundType === "video"}
                        onChange={() => setState({
                          ...state,
                          hero: { ...state.hero, backgroundType: "video" }
                        })}
                        className="accent-gold"
                      />
                      Looping Video
                    </label>
                  </div>

                  {state.hero.backgroundType === "video" ? (
                    <div className="space-y-6">
                      <MediaUpload
                        label="Background Video (MP4 / WebM)"
                        value={state.hero.videoUrl || ""}
                        onChange={(v) => setState({
                          ...state,
                          hero: { ...state.hero, videoUrl: v }
                        })}
                      />
                      <MediaUpload
                        label="Fallback Background Image"
                        value={state.hero.image}
                        onChange={(v) => setState({
                          ...state,
                          hero: { ...state.hero, image: v }
                        })}
                      />
                    </div>
                  ) : (
                    <MediaUpload
                      label="Background Banner Image"
                      value={state.hero.image}
                      onChange={(v) => setState({
                        ...state,
                        hero: { ...state.hero, image: v }
                      })}
                    />
                  )}
                </div>
              </div>
            )}

            {/* 3. ABOUT TAB */}
            {activeTab === "about" && (
              <div className="space-y-8 max-h-[80vh] overflow-y-auto pr-4">
                {/* 1. Header Banner */}
                <div className="space-y-6 border-b border-border/60 pb-6">
                  <h2 className="font-display text-2xl">About Page Header</h2>
                  <FormInput
                    label="Header Eyebrow"
                    value={state.about.headerEyebrow || ""}
                    onChange={(v) => setState({
                      ...state,
                      about: { ...state.about, headerEyebrow: v }
                    })}
                  />
                  <FormInput
                    label="Header Title Line 1"
                    value={state.about.headerTitle || ""}
                    onChange={(v) => setState({
                      ...state,
                      about: { ...state.about, headerTitle: v }
                    })}
                  />
                  <FormInput
                    label="Header Title Line 2 (Italic)"
                    value={state.about.headerSubtitle || ""}
                    onChange={(v) => setState({
                      ...state,
                      about: { ...state.about, headerSubtitle: v }
                    })}
                  />
                </div>

                {/* 2. Brand Narrative Intro */}
                <div className="space-y-6 border-b border-border/60 pb-6">
                  <h2 className="font-display text-2xl">Brand Narrative Section</h2>
                  <FormInput
                    label="Narrative Eyebrow"
                    value={state.about.narrativeEyebrow || ""}
                    onChange={(v) => setState({
                      ...state,
                      about: { ...state.about, narrativeEyebrow: v }
                    })}
                  />
                  <FormInput
                    label="Narrative Title"
                    value={state.about.narrativeTitle || ""}
                    onChange={(v) => setState({
                      ...state,
                      about: { ...state.about, narrativeTitle: v }
                    })}
                  />
                  <div className="space-y-2">
                    <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Narrative Paragraphs (One per line)</label>
                    <textarea
                      rows={4}
                      value={state.about.body.join("\n")}
                      onChange={(e) => setState({
                        ...state,
                        about: { ...state.about, body: e.target.value.split("\n") }
                      })}
                      className="w-full border border-border bg-surface/40 p-4 font-mono text-sm outline-none focus:border-gold"
                    />
                  </div>
                  <MediaUpload
                    label="Narrative Section Cover Image"
                    value={state.about.image}
                    onChange={(v) => setState({
                      ...state,
                      about: { ...state.about, image: v }
                    })}
                  />
                  
                  <div className="space-y-4 border-t border-border/60 pt-6">
                    <h3 className="font-mono text-xs uppercase tracking-[0.1em] text-gold">Mission & Vision</h3>
                    <div className="grid gap-6 sm:grid-cols-2">
                      {state.about.pillars.map((p, idx) => (
                        <div key={idx} className="space-y-4 border border-border/60 p-4 bg-surface/20">
                          <FormInput
                            label={`${idx === 0 ? "Mission" : "Vision"} Header`}
                            value={p.title}
                            onChange={(v) => {
                              const newPillars = [...state.about.pillars];
                              newPillars[idx] = { ...newPillars[idx], title: v };
                              setState({
                                ...state,
                                about: { ...state.about, pillars: newPillars }
                              });
                            }}
                          />
                          <div className="space-y-2">
                            <label className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Description Body</label>
                            <textarea
                              rows={3}
                              value={p.body}
                              onChange={(e) => {
                                const newPillars = [...state.about.pillars];
                                newPillars[idx] = { ...newPillars[idx], body: e.target.value };
                                setState({
                                  ...state,
                                  about: { ...state.about, pillars: newPillars }
                                });
                              }}
                              className="w-full border border-border bg-surface/40 p-3 font-display text-sm outline-none focus:border-gold"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 3. Founder's Letter (About Page) */}
                <div className="space-y-6 border-b border-border/60 pb-6">
                  <h2 className="font-display text-2xl">Founder's Letter (About Page)</h2>
                  <div className="grid gap-6 sm:grid-cols-3">
                    <FormInput
                      label="Letter Eyebrow"
                      value={state.about.aboutChairman?.eyebrow || ""}
                      onChange={(v) => setState({
                        ...state,
                        about: {
                          ...state.about,
                          aboutChairman: { ...state.about.aboutChairman, eyebrow: v }
                        }
                      })}
                    />
                    <FormInput
                      label="Founder Name"
                      value={state.about.aboutChairman?.name || ""}
                      onChange={(v) => setState({
                        ...state,
                        about: {
                          ...state.about,
                          aboutChairman: { ...state.about.aboutChairman, name: v }
                        }
                      })}
                    />
                    <FormInput
                      label="Founder Role"
                      value={state.about.aboutChairman?.role || ""}
                      onChange={(v) => setState({
                        ...state,
                        about: {
                          ...state.about,
                          aboutChairman: { ...state.about.aboutChairman, role: v }
                        }
                      })}
                    />
                  </div>
                  <FormInput
                    label="Letter Title/Quote Headline"
                    value={state.about.aboutChairman?.title || ""}
                    onChange={(v) => setState({
                      ...state,
                      about: {
                        ...state.about,
                        aboutChairman: { ...state.about.aboutChairman, title: v }
                      }
                    })}
                  />
                  <div className="space-y-2">
                    <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Letter Body Paragraphs (One per line)</label>
                    <textarea
                      rows={4}
                      value={state.about.aboutChairman?.paragraphs?.join("\n") || ""}
                      onChange={(e) => setState({
                        ...state,
                        about: {
                          ...state.about,
                          aboutChairman: {
                            ...state.about.aboutChairman,
                            paragraphs: e.target.value.split("\n")
                          }
                        }
                      })}
                      className="w-full border border-border bg-surface/40 p-4 font-mono text-sm outline-none focus:border-gold"
                    />
                  </div>
                  <MediaUpload
                    label="Founder Image"
                    value={state.about.aboutChairman?.image || ""}
                    onChange={(v) => setState({
                      ...state,
                      about: {
                        ...state.about,
                        aboutChairman: { ...state.about.aboutChairman, image: v }
                      }
                    })}
                  />

                  {/* Founder Values */}
                  <div className="space-y-4 border-t border-border/60 pt-4">
                    <h3 className="font-mono text-xs uppercase tracking-[0.1em] text-gold">Founder's Values</h3>
                    <div className="grid gap-6 sm:grid-cols-3">
                      {(state.about.aboutChairman?.values || []).map((val, idx) => (
                        <div key={idx} className="space-y-4 border border-border/60 p-4 bg-surface/20">
                          <FormInput
                            label={`Value ${idx + 1} Title`}
                            value={val.title}
                            onChange={(v) => {
                              const newVals = [...(state.about.aboutChairman?.values || [])];
                              newVals[idx] = { ...newVals[idx], title: v };
                              setState({
                                ...state,
                                about: {
                                  ...state.about,
                                  aboutChairman: { ...state.about.aboutChairman, values: newVals }
                                }
                              });
                            }}
                          />
                          <div className="space-y-2">
                            <label className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Value {idx + 1} Description</label>
                            <textarea
                              rows={3}
                              value={val.desc}
                              onChange={(e) => {
                                const newVals = [...(state.about.aboutChairman?.values || [])];
                                newVals[idx] = { ...newVals[idx], desc: e.target.value };
                                setState({
                                  ...state,
                                  about: {
                                    ...state.about,
                                    aboutChairman: { ...state.about.aboutChairman, values: newVals }
                                  }
                                });
                              }}
                              className="w-full border border-border bg-surface/40 p-3 font-display text-sm outline-none focus:border-gold"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 4. Atelier Philosophy */}
                <div className="space-y-6 border-b border-border/60 pb-6">
                  <h2 className="font-display text-2xl">Atelier Philosophy Section</h2>
                  <FormInput
                    label="Philosophy Eyebrow"
                    value={state.about.philosophy?.eyebrow || ""}
                    onChange={(v) => setState({
                      ...state,
                      about: {
                        ...state.about,
                        philosophy: { ...state.about.philosophy, eyebrow: v }
                      }
                    })}
                  />
                  <FormInput
                    label="Philosophy Headline"
                    value={state.about.philosophy?.title || ""}
                    onChange={(v) => setState({
                      ...state,
                      about: {
                        ...state.about,
                        philosophy: { ...state.about.philosophy, title: v }
                      }
                    })}
                  />
                  <FormInput
                    label="Philosophy Description"
                    value={state.about.philosophy?.description || ""}
                    onChange={(v) => setState({
                      ...state,
                      about: {
                        ...state.about,
                        philosophy: { ...state.about.philosophy, description: v }
                      }
                    })}
                  />

                  {/* Philosophy Cards */}
                  <div className="space-y-4 border-t border-border/60 pt-4">
                    <h3 className="font-mono text-xs uppercase tracking-[0.1em] text-gold">Philosophy Cards (4 Items)</h3>
                    <div className="grid gap-6 sm:grid-cols-2">
                      {(state.about.philosophy?.items || []).map((item, idx) => (
                        <div key={idx} className="space-y-4 border border-border/60 p-4 bg-surface/20">
                          <div className="flex justify-between items-center">
                            <span className="font-mono text-xs text-gold">Card {item.num}</span>
                          </div>
                          <FormInput
                            label="Card Title"
                            value={item.title}
                            onChange={(v) => {
                              const newItems = [...(state.about.philosophy?.items || [])];
                              newItems[idx] = { ...newItems[idx], title: v };
                              setState({
                                ...state,
                                about: {
                                  ...state.about,
                                  philosophy: { ...state.about.philosophy, items: newItems }
                                }
                              });
                            }}
                          />
                          <div className="space-y-2">
                            <label className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Card Description</label>
                            <textarea
                              rows={3}
                              value={item.description}
                              onChange={(e) => {
                                const newItems = [...(state.about.philosophy?.items || [])];
                                newItems[idx] = { ...newItems[idx], description: e.target.value };
                                setState({
                                  ...state,
                                  about: {
                                    ...state.about,
                                    philosophy: { ...state.about.philosophy, items: newItems }
                                  }
                                });
                              }}
                              className="w-full border border-border bg-surface/40 p-3 font-display text-sm outline-none focus:border-gold"
                            />
                          </div>
                          <MediaUpload
                            label="Card Background Image"
                            value={item.image}
                            onChange={(v) => {
                              const newItems = [...(state.about.philosophy?.items || [])];
                              newItems[idx] = { ...newItems[idx], image: v };
                              setState({
                                ...state,
                                about: {
                                  ...state.about,
                                  philosophy: { ...state.about.philosophy, items: newItems }
                                }
                              });
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 5. Historical Timeline */}
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-border/60 pb-3">
                    <h2 className="font-display text-2xl">Historical Timeline</h2>
                    <button
                      onClick={() => {
                        const newMilestones = [
                          ...(state.about.timeline?.milestones || []),
                          {
                            year: "2027",
                            title: "New Landmark",
                            description: "Timeline milestone description details here.",
                            image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=600&h=400"
                          }
                        ];
                        setState({
                          ...state,
                          about: {
                            ...state.about,
                            timeline: { ...state.about.timeline, milestones: newMilestones }
                          }
                        });
                      }}
                      className="border border-blue-600 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-blue-500 hover:bg-blue-600 hover:text-white transition-colors"
                    >
                      + Add Milestone
                    </button>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <FormInput
                      label="Timeline Eyebrow"
                      value={state.about.timeline?.eyebrow || ""}
                      onChange={(v) => setState({
                        ...state,
                        about: {
                          ...state.about,
                          timeline: { ...state.about.timeline, eyebrow: v }
                        }
                      })}
                    />
                    <FormInput
                      label="Timeline Title"
                      value={state.about.timeline?.title || ""}
                      onChange={(v) => setState({
                        ...state,
                        about: {
                          ...state.about,
                          timeline: { ...state.about.timeline, title: v }
                        }
                      })}
                    />
                  </div>

                  <div className="space-y-6">
                    {(state.about.timeline?.milestones || []).map((m, idx) => (
                      <div key={idx} className="border border-border/40 p-6 bg-surface/35 space-y-4 relative">
                        <button
                          onClick={() => {
                            const newMilestones = (state.about.timeline?.milestones || []).filter((_, i) => i !== idx);
                            setState({
                              ...state,
                              about: {
                                ...state.about,
                                timeline: { ...state.about.timeline, milestones: newMilestones }
                              }
                            });
                          }}
                          className="absolute right-4 top-4 text-xs font-mono text-red-400 hover:text-red-300"
                        >
                          Delete
                        </button>
                        
                        <div className="grid gap-6 sm:grid-cols-3">
                          <FormInput
                            label="Milestone Year"
                            value={m.year}
                            onChange={(v) => {
                              const newMilestones = [...(state.about.timeline?.milestones || [])];
                              newMilestones[idx] = { ...newMilestones[idx], year: v };
                              setState({
                                ...state,
                                about: {
                                  ...state.about,
                                  timeline: { ...state.about.timeline, milestones: newMilestones }
                                }
                              });
                            }}
                          />
                          <div className="sm:col-span-2">
                            <FormInput
                              label="Milestone Title"
                              value={m.title}
                              onChange={(v) => {
                                const newMilestones = [...(state.about.timeline?.milestones || [])];
                                newMilestones[idx] = { ...newMilestones[idx], title: v };
                                setState({
                                  ...state,
                                  about: {
                                    ...state.about,
                                    timeline: { ...state.about.timeline, milestones: newMilestones }
                                  }
                                });
                              }}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Milestone Description</label>
                          <textarea
                            rows={3}
                            value={m.description}
                            onChange={(e) => {
                              const newMilestones = [...(state.about.timeline?.milestones || [])];
                              newMilestones[idx] = { ...newMilestones[idx], description: e.target.value };
                              setState({
                                ...state,
                                about: {
                                  ...state.about,
                                  timeline: { ...state.about.timeline, milestones: newMilestones }
                                }
                              });
                            }}
                            className="w-full border border-border bg-surface/40 p-4 font-display text-sm outline-none focus:border-gold"
                          />
                        </div>

                        <MediaUpload
                          label="Milestone Image"
                          value={m.image}
                          onChange={(v) => {
                            const newMilestones = [...(state.about.timeline?.milestones || [])];
                            newMilestones[idx] = { ...newMilestones[idx], image: v };
                            setState({
                              ...state,
                              about: {
                                ...state.about,
                                timeline: { ...state.about.timeline, milestones: newMilestones }
                              }
                            });
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* 4. STATS & WHY US */}
            {activeTab === "stats" && (
              <div className="space-y-8">
                <h2 className="font-display text-2xl border-b border-border/60 pb-3">Value Stats Strip</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {state.stats.map((s, idx) => (
                    <div key={idx} className="border border-border/40 p-4 bg-surface/35 space-y-4">
                      <span className="font-mono text-xs text-gold">Stat 0{idx + 1}</span>
                      <FormInput
                        label="Numerical Value"
                        value={String(s.value)}
                        onChange={(v) => {
                          const newStats = [...state.stats];
                          newStats[idx] = { ...newStats[idx], value: Number(v) || 0 };
                          setState({ ...state, stats: newStats });
                        }}
                      />
                      <FormInput
                        label="Suffix (e.g. +, yrs, M)"
                        value={s.suffix}
                        onChange={(v) => {
                          const newStats = [...state.stats];
                          newStats[idx] = { ...newStats[idx], suffix: v };
                          setState({ ...state, stats: newStats });
                        }}
                      />
                      <FormInput
                        label="Label Text"
                        value={s.label}
                        onChange={(v) => {
                          const newStats = [...state.stats];
                          newStats[idx] = { ...newStats[idx], label: v };
                          setState({ ...state, stats: newStats });
                        }}
                      />
                    </div>
                  ))}
                </div>

                <h2 className="font-display text-2xl border-b border-border/60 pb-3 pt-6">Why Choose Us Pillars</h2>
                <div className="grid gap-6 sm:grid-cols-2">
                  {state.whyUs.map((w, idx) => (
                    <div key={idx} className="border border-border/40 p-6 bg-surface/35 space-y-4">
                      <FormInput
                        label="Column Number (e.g. 01)"
                        value={w.num}
                        onChange={(v) => {
                          const newWhy = [...state.whyUs];
                          newWhy[idx] = { ...newWhy[idx], num: v };
                          setState({ ...state, whyUs: newWhy });
                        }}
                      />
                      <FormInput
                        label="Pillar Header"
                        value={w.title}
                        onChange={(v) => {
                          const newWhy = [...state.whyUs];
                          newWhy[idx] = { ...newWhy[idx], title: v };
                          setState({ ...state, whyUs: newWhy });
                        }}
                      />
                      <div className="space-y-2">
                        <label className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Pillar Description</label>
                        <textarea
                          rows={3}
                          value={w.body}
                          onChange={(e) => {
                            const newWhy = [...state.whyUs];
                            newWhy[idx] = { ...newWhy[idx], body: e.target.value };
                            setState({ ...state, whyUs: newWhy });
                          }}
                          className="w-full border border-border bg-surface/40 p-3 font-display text-sm outline-none focus:border-gold"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. PROJECTS INVENTORY */}
            {activeTab === "projects" && (
              <div className="space-y-8 max-h-[80vh] overflow-y-auto pr-4">
                {/* 1. Projects Cover */}
                <div className="space-y-6 border-b border-border/60 pb-6">
                  <h2 className="font-display text-2xl">Projects Page Cover Banner</h2>
                  <div className="grid gap-6 sm:grid-cols-3">
                    <FormInput
                      label="Cover Eyebrow"
                      value={state.projectsPage?.eyebrow || ""}
                      onChange={(v) => setState({ ...state, projectsPage: { ...state.projectsPage, eyebrow: v } })}
                    />
                    <FormInput
                      label="Title Line 1"
                      value={state.projectsPage?.titleNormal || ""}
                      onChange={(v) => setState({ ...state, projectsPage: { ...state.projectsPage, titleNormal: v } })}
                    />
                    <FormInput
                      label="Title Line 2 (Italic)"
                      value={state.projectsPage?.titleItalic || ""}
                      onChange={(v) => setState({ ...state, projectsPage: { ...state.projectsPage, titleItalic: v } })}
                    />
                  </div>
                </div>

                {/* 2. Projects Inventory */}
                <div className="border-b border-border/60 pb-8">
                  <ProjectsEditor
                    projects={state.projects}
                    onChange={(p) => setState({ ...state, projects: p })}
                  />
                </div>

                {/* 3. Current Projects portals */}
                <div className="space-y-6 border-b border-border/60 pb-6">
                  <div className="flex justify-between items-center">
                    <h2 className="font-display text-2xl">Active Projects Portals</h2>
                    <button
                      onClick={() => {
                        const newItems = [
                          ...(state.currentProjects?.items || []),
                          {
                            name: "New Portal",
                            description: "Active masterplan description.",
                            url: "https://example.com",
                            image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800&h=600"
                          }
                        ];
                        setState({ ...state, currentProjects: { ...state.currentProjects, items: newItems } });
                      }}
                      className="border border-blue-600 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-blue-500 hover:bg-blue-600 hover:text-white transition-colors"
                    >
                      + Add Portal Link
                    </button>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-3">
                    <FormInput
                      label="Section Eyebrow"
                      value={state.currentProjects?.eyebrow || ""}
                      onChange={(v) => setState({ ...state, currentProjects: { ...state.currentProjects, eyebrow: v } })}
                    />
                    <FormInput
                      label="Title Normal"
                      value={state.currentProjects?.titleNormal || ""}
                      onChange={(v) => setState({ ...state, currentProjects: { ...state.currentProjects, titleNormal: v } })}
                    />
                    <FormInput
                      label="Title Italic"
                      value={state.currentProjects?.titleItalic || ""}
                      onChange={(v) => setState({ ...state, currentProjects: { ...state.currentProjects, titleItalic: v } })}
                    />
                  </div>
                  <FormInput
                    label="Section Description"
                    value={state.currentProjects?.description || ""}
                    onChange={(v) => setState({ ...state, currentProjects: { ...state.currentProjects, description: v } })}
                  />

                  <div className="space-y-6 mt-4">
                    {(state.currentProjects?.items || []).map((item, idx) => (
                      <div key={idx} className="border border-border/40 p-6 bg-surface/35 space-y-4 relative">
                        <button
                          onClick={() => {
                            const newItems = (state.currentProjects?.items || []).filter((_, i) => i !== idx);
                            setState({ ...state, currentProjects: { ...state.currentProjects, items: newItems } });
                          }}
                          className="absolute right-4 top-4 text-xs font-mono text-red-400 hover:text-red-300"
                        >
                          Delete
                        </button>
                        <div className="grid gap-6 sm:grid-cols-2">
                          <FormInput
                            label="Portal Name"
                            value={item.name}
                            onChange={(v) => {
                              const newItems = [...(state.currentProjects?.items || [])];
                              newItems[idx] = { ...newItems[idx], name: v };
                              setState({ ...state, currentProjects: { ...state.currentProjects, items: newItems } });
                            }}
                          />
                          <FormInput
                            label="Target URL"
                            value={item.url}
                            onChange={(v) => {
                              const newItems = [...(state.currentProjects?.items || [])];
                              newItems[idx] = { ...newItems[idx], url: v };
                              setState({ ...state, currentProjects: { ...state.currentProjects, items: newItems } });
                            }}
                          />
                        </div>
                        <FormInput
                          label="Portal Description"
                          value={item.description}
                          onChange={(v) => {
                            const newItems = [...(state.currentProjects?.items || [])];
                            newItems[idx] = { ...newItems[idx], description: v };
                            setState({ ...state, currentProjects: { ...state.currentProjects, items: newItems } });
                          }}
                        />
                        <MediaUpload
                          label="Cover Image"
                          value={item.image}
                          onChange={(v) => {
                            const newItems = [...(state.currentProjects?.items || [])];
                            newItems[idx] = { ...newItems[idx], image: v };
                            setState({ ...state, currentProjects: { ...state.currentProjects, items: newItems } });
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Flagship Landmark Spotlight */}
                <div className="space-y-6 border-b border-border/60 pb-6">
                  <h2 className="font-display text-2xl">Flagship Landmark Spotlight</h2>
                  <div className="grid gap-6 sm:grid-cols-3">
                    <FormInput
                      label="Section Eyebrow"
                      value={state.flagshipLandmark?.eyebrow || ""}
                      onChange={(v) => setState({ ...state, flagshipLandmark: { ...state.flagshipLandmark, eyebrow: v } })}
                    />
                    <FormInput
                      label="Spotlight Title (Normal)"
                      value={state.flagshipLandmark?.titleNormal || ""}
                      onChange={(v) => setState({ ...state, flagshipLandmark: { ...state.flagshipLandmark, titleNormal: v } })}
                    />
                    <FormInput
                      label="Spotlight Title (Italic)"
                      value={state.flagshipLandmark?.titleItalic || ""}
                      onChange={(v) => setState({ ...state, flagshipLandmark: { ...state.flagshipLandmark, titleItalic: v } })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Spotlight Description</label>
                    <textarea
                      rows={3}
                      value={state.flagshipLandmark?.description || ""}
                      onChange={(e) => setState({ ...state, flagshipLandmark: { ...state.flagshipLandmark, description: e.target.value } })}
                      className="w-full border border-border bg-surface/40 p-4 font-display text-sm outline-none focus:border-gold"
                    />
                  </div>
                  <MediaUpload
                    label="Spotlight Photo"
                    value={state.flagshipLandmark?.image || ""}
                    onChange={(v) => setState({ ...state, flagshipLandmark: { ...state.flagshipLandmark, image: v } })}
                  />

                  {/* Spotlight Metrics */}
                  <div className="space-y-4 border-t border-border/60 pt-4">
                    <h3 className="font-mono text-xs uppercase tracking-[0.1em] text-gold">Highlight Metrics</h3>
                    <div className="grid gap-6 sm:grid-cols-3">
                      {(state.flagshipLandmark?.metrics || []).map((m, idx) => (
                        <div key={idx} className="space-y-2 border border-border/60 p-4 bg-surface/20">
                          <FormInput
                            label={`Metric ${idx + 1} Label`}
                            value={m.label}
                            onChange={(v) => {
                              const newMetrics = [...(state.flagshipLandmark?.metrics || [])];
                              newMetrics[idx] = { ...newMetrics[idx], label: v };
                              setState({ ...state, flagshipLandmark: { ...state.flagshipLandmark, metrics: newMetrics } });
                            }}
                          />
                          <FormInput
                            label={`Metric ${idx + 1} Value`}
                            value={m.value}
                            onChange={(v) => {
                              const newMetrics = [...(state.flagshipLandmark?.metrics || [])];
                              newMetrics[idx] = { ...newMetrics[idx], value: v };
                              setState({ ...state, flagshipLandmark: { ...state.flagshipLandmark, metrics: newMetrics } });
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 5. Project Literature brochures */}
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-border/60 pb-3">
                    <h2 className="font-display text-2xl">Project Literature (Downloads)</h2>
                    <button
                      onClick={() => {
                        const newBrochures = [
                          ...(state.projectLiterature?.brochures || []),
                          {
                            name: "New Catalog",
                            size: "PDF · 5.0 MB",
                            url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                            image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=600&h=800"
                          }
                        ];
                        setState({ ...state, projectLiterature: { ...state.projectLiterature, brochures: newBrochures } });
                      }}
                      className="border border-blue-600 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-blue-500 hover:bg-blue-600 hover:text-white transition-colors"
                    >
                      + Add Booklet
                    </button>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-3">
                    <FormInput
                      label="Downloads Eyebrow"
                      value={state.projectLiterature?.eyebrow || ""}
                      onChange={(v) => setState({ ...state, projectLiterature: { ...state.projectLiterature, eyebrow: v } })}
                    />
                    <FormInput
                      label="Headline Normal"
                      value={state.projectLiterature?.titleNormal || ""}
                      onChange={(v) => setState({ ...state, projectLiterature: { ...state.projectLiterature, titleNormal: v } })}
                    />
                    <FormInput
                      label="Headline Italic"
                      value={state.projectLiterature?.titleItalic || ""}
                      onChange={(v) => setState({ ...state, projectLiterature: { ...state.projectLiterature, titleItalic: v } })}
                    />
                  </div>
                  <FormInput
                    label="Literature Description Tagline"
                    value={state.projectLiterature?.description || ""}
                    onChange={(v) => setState({ ...state, projectLiterature: { ...state.projectLiterature, description: v } })}
                  />

                  <div className="space-y-6 mt-4">
                    {(state.projectLiterature?.brochures || []).map((b, idx) => (
                      <div key={idx} className="border border-border/40 p-6 bg-surface/35 space-y-4 relative">
                        <button
                          onClick={() => {
                            const newBrochures = (state.projectLiterature?.brochures || []).filter((_, i) => i !== idx);
                            setState({ ...state, projectLiterature: { ...state.projectLiterature, brochures: newBrochures } });
                          }}
                          className="absolute right-4 top-4 text-xs font-mono text-red-400 hover:text-red-300"
                        >
                          Delete
                        </button>
                        <div className="grid gap-6 sm:grid-cols-3">
                          <FormInput
                            label="Booklet Name"
                            value={b.name}
                            onChange={(v) => {
                              const newBrochures = [...(state.projectLiterature?.brochures || [])];
                              newBrochures[idx] = { ...newBrochures[idx], name: v };
                              setState({ ...state, projectLiterature: { ...state.projectLiterature, brochures: newBrochures } });
                            }}
                          />
                          <FormInput
                            label="Booklet Size (e.g. PDF · 10 MB)"
                            value={b.size}
                            onChange={(v) => {
                              const newBrochures = [...(state.projectLiterature?.brochures || [])];
                              newBrochures[idx] = { ...newBrochures[idx], size: v };
                              setState({ ...state, projectLiterature: { ...state.projectLiterature, brochures: newBrochures } });
                            }}
                          />
                          <FormInput
                            label="Download URL (.pdf link)"
                            value={b.url}
                            onChange={(v) => {
                              const newBrochures = [...(state.projectLiterature?.brochures || [])];
                              newBrochures[idx] = { ...newBrochures[idx], url: v };
                              setState({ ...state, projectLiterature: { ...state.projectLiterature, brochures: newBrochures } });
                            }}
                          />
                        </div>
                        <MediaUpload
                          label="Booklet Thumbnail Cover"
                          value={b.image}
                          onChange={(v) => {
                            const newBrochures = [...(state.projectLiterature?.brochures || [])];
                            newBrochures[idx] = { ...newBrochures[idx], image: v };
                            setState({ ...state, projectLiterature: { ...state.projectLiterature, brochures: newBrochures } });
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* 6. SERVICES */}
            {activeTab === "services" && (
              <div className="space-y-8 max-h-[80vh] overflow-y-auto pr-4">
                {/* Services Page cover */}
                <div className="space-y-6 border-b border-border/60 pb-6">
                  <h2 className="font-display text-2xl">Services Page Cover Banner</h2>
                  <div className="grid gap-6 sm:grid-cols-3">
                    <FormInput
                      label="Cover Eyebrow"
                      value={state.servicesPage?.eyebrow || ""}
                      onChange={(v) => setState({ ...state, servicesPage: { ...state.servicesPage, eyebrow: v } })}
                    />
                    <FormInput
                      label="Title Line 1"
                      value={state.servicesPage?.titleFirst || ""}
                      onChange={(v) => setState({ ...state, servicesPage: { ...state.servicesPage, titleFirst: v } })}
                    />
                    <FormInput
                      label="Title Line 2 (Italic)"
                      value={state.servicesPage?.titleItalic || ""}
                      onChange={(v) => setState({ ...state, servicesPage: { ...state.servicesPage, titleItalic: v } })}
                    />
                  </div>
                  <FormInput
                    label="Cover Description Tagline"
                    value={state.servicesPage?.description || ""}
                    onChange={(v) => setState({ ...state, servicesPage: { ...state.servicesPage, description: v } })}
                  />
                </div>

                {/* Core Services items */}
                <div className="space-y-6 border-b border-border/60 pb-6">
                  <div className="flex justify-between items-center">
                    <h2 className="font-display text-2xl">Core Services List</h2>
                    <button
                      onClick={() => {
                        setState({
                          ...state,
                          services: [...state.services, { name: "New Service", body: "Description of service." }]
                        });
                      }}
                      className="border border-blue-600 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-blue-500 hover:bg-blue-600 hover:text-white transition-colors"
                    >
                      + Add Service
                    </button>
                  </div>

                  <div className="space-y-6">
                    {state.services.map((s, idx) => (
                      <div key={idx} className="border border-border/40 p-6 bg-surface/35 space-y-4 relative">
                        <button
                          onClick={() => {
                            const newServices = state.services.filter((_, i) => i !== idx);
                            setState({ ...state, services: newServices });
                          }}
                          className="absolute right-4 top-4 text-xs font-mono text-red-400 hover:text-red-300"
                        >
                          Delete
                        </button>
                        <FormInput
                          label="Service Name"
                          value={s.name}
                          onChange={(v) => {
                            const newServices = [...state.services];
                            newServices[idx] = { ...newServices[idx], name: v };
                            setState({ ...state, services: newServices });
                          }}
                        />
                        <div className="space-y-2">
                          <label className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Service Description</label>
                          <textarea
                            rows={3}
                            value={s.body}
                            onChange={(e) => {
                              const newServices = [...state.services];
                              newServices[idx] = { ...newServices[idx], body: e.target.value };
                              setState({ ...state, services: newServices });
                            }}
                            className="w-full border border-border bg-surface/40 p-3 font-display text-sm outline-none focus:border-gold"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Workflow steps */}
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-border/60 pb-3">
                    <h2 className="font-display text-2xl">Our Methodology (Workflow Steps)</h2>
                    <button
                      onClick={() => {
                        const newSteps = [
                          ...(state.workflow?.steps || []),
                          {
                            num: String((state.workflow?.steps?.length || 0) + 1).padStart(2, '0'),
                            title: "New Stage",
                            description: "Workflow stage description.",
                            image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600&h=400"
                          }
                        ];
                        setState({ ...state, workflow: { ...state.workflow, steps: newSteps } });
                      }}
                      className="border border-blue-600 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-blue-500 hover:bg-blue-600 hover:text-white transition-colors"
                    >
                      + Add Step
                    </button>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <FormInput
                      label="Workflow Eyebrow"
                      value={state.workflow?.eyebrow || ""}
                      onChange={(v) => setState({ ...state, workflow: { ...state.workflow, eyebrow: v } })}
                    />
                    <FormInput
                      label="Workflow Title"
                      value={state.workflow?.title || ""}
                      onChange={(v) => setState({ ...state, workflow: { ...state.workflow, title: v } })}
                    />
                  </div>

                  <div className="space-y-6">
                    {(state.workflow?.steps || []).map((s, idx) => (
                      <div key={idx} className="border border-border/40 p-6 bg-surface/35 space-y-4 relative">
                        <button
                          onClick={() => {
                            const newSteps = (state.workflow?.steps || []).filter((_, i) => i !== idx);
                            setState({ ...state, workflow: { ...state.workflow, steps: newSteps } });
                          }}
                          className="absolute right-4 top-4 text-xs font-mono text-red-400 hover:text-red-300"
                        >
                          Delete
                        </button>
                        <div className="grid gap-6 sm:grid-cols-2">
                          <FormInput
                            label="Step Number (e.g. 01)"
                            value={s.num}
                            onChange={(v) => {
                              const newSteps = [...(state.workflow?.steps || [])];
                              newSteps[idx] = { ...newSteps[idx], num: v };
                              setState({ ...state, workflow: { ...state.workflow, steps: newSteps } });
                            }}
                          />
                          <FormInput
                            label="Step Title"
                            value={s.title}
                            onChange={(v) => {
                              const newSteps = [...(state.workflow?.steps || [])];
                              newSteps[idx] = { ...newSteps[idx], title: v };
                              setState({ ...state, workflow: { ...state.workflow, steps: newSteps } });
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Step Description</label>
                          <textarea
                            rows={3}
                            value={s.description}
                            onChange={(e) => {
                              const newSteps = [...(state.workflow?.steps || [])];
                              newSteps[idx] = { ...newSteps[idx], description: e.target.value };
                              setState({ ...state, workflow: { ...state.workflow, steps: newSteps } });
                            }}
                            className="w-full border border-border bg-surface/40 p-4 font-display text-sm outline-none focus:border-gold"
                          />
                        </div>
                        <MediaUpload
                          label="Step Illustration Image"
                          value={s.image}
                          onChange={(v) => {
                            const newSteps = [...(state.workflow?.steps || [])];
                            newSteps[idx] = { ...newSteps[idx], image: v };
                            setState({ ...state, workflow: { ...state.workflow, steps: newSteps } });
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 7. TESTIMONIALS */}
            {activeTab === "testimonials" && (
              <div className="space-y-8">
                <div className="flex justify-between items-center border-b border-border/60 pb-3">
                  <h2 className="font-display text-2xl">Client Testimonials</h2>
                  <button
                    onClick={() => {
                      setState({
                        ...state,
                        testimonials: [...state.testimonials, { name: "Client Name", role: "Role", body: "Client review body." }]
                      });
                    }}
                    className="border border-blue-600 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-blue-500 hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    + Add Testimonial
                  </button>
                </div>

                <div className="space-y-6">
                  {state.testimonials.map((t, idx) => (
                    <div key={idx} className="border border-border/40 p-6 bg-surface/35 space-y-4 relative">
                      <button
                        onClick={() => {
                          const newTest = state.testimonials.filter((_, i) => i !== idx);
                          setState({ ...state, testimonials: newTest });
                        }}
                        className="absolute right-4 top-4 text-xs font-mono text-red-400 hover:text-red-300"
                      >
                        Delete
                      </button>
                      <div className="grid gap-6 sm:grid-cols-2">
                        <FormInput
                          label="Client Name"
                          value={t.name}
                          onChange={(v) => {
                            const newTest = [...state.testimonials];
                            newTest[idx] = { ...newTest[idx], name: v };
                            setState({ ...state, testimonials: newTest });
                          }}
                        />
                        <FormInput
                          label="Client Role (e.g., Homeowner)"
                          value={t.role}
                          onChange={(v) => {
                            const newTest = [...state.testimonials];
                            newTest[idx] = { ...newTest[idx], role: v };
                            setState({ ...state, testimonials: newTest });
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Testimonial Quote</label>
                        <textarea
                          rows={3}
                          value={t.body}
                          onChange={(e) => {
                            const newTest = [...state.testimonials];
                            newTest[idx] = { ...newTest[idx], body: e.target.value };
                            setState({ ...state, testimonials: newTest });
                          }}
                          className="w-full border border-border bg-surface/40 p-3 font-display text-sm outline-none focus:border-gold"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 8. CONTACT */}
            {activeTab === "contact" && (
              <div className="space-y-8 max-h-[80vh] overflow-y-auto pr-4">
                <h2 className="font-display text-2xl border-b border-border/60 pb-3">Contact Page Configurations</h2>
                
                <div className="space-y-4">
                  <h3 className="font-mono text-xs uppercase tracking-[0.1em] text-gold">Cover Banner</h3>
                  <div className="grid gap-6 sm:grid-cols-3">
                    <FormInput
                      label="Eyebrow"
                      value={state.contactPage?.cover?.eyebrow || ""}
                      onChange={(v) => setState({
                        ...state,
                        contactPage: {
                          ...state.contactPage,
                          cover: { ...state.contactPage.cover, eyebrow: v }
                        }
                      })}
                    />
                    <FormInput
                      label="Title (Normal)"
                      value={state.contactPage?.cover?.titleNormal || ""}
                      onChange={(v) => setState({
                        ...state,
                        contactPage: {
                          ...state.contactPage,
                          cover: { ...state.contactPage.cover, titleNormal: v }
                        }
                      })}
                    />
                    <FormInput
                      label="Title (Italic)"
                      value={state.contactPage?.cover?.titleItalic || ""}
                      onChange={(v) => setState({
                        ...state,
                        contactPage: {
                          ...state.contactPage,
                          cover: { ...state.contactPage.cover, titleItalic: v }
                        }
                      })}
                    />
                  </div>
                </div>

                <div className="space-y-4 border-t border-border/60 pt-6">
                  <h3 className="font-mono text-xs uppercase tracking-[0.1em] text-gold">Form Details</h3>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <FormInput
                      label="Enquiry Eyebrow"
                      value={state.contactPage?.enquiryEyebrow || ""}
                      onChange={(v) => setState({
                        ...state,
                        contactPage: { ...state.contactPage, enquiryEyebrow: v }
                      })}
                    />
                    <FormInput
                      label="Enquiry Title"
                      value={state.contactPage?.enquiryTitle || ""}
                      onChange={(v) => setState({
                        ...state,
                        contactPage: { ...state.contactPage, enquiryTitle: v }
                      })}
                    />
                  </div>
                </div>

                <div className="space-y-4 border-t border-border/60 pt-6">
                  <h3 className="font-mono text-xs uppercase tracking-[0.1em] text-gold">Interactive Map</h3>
                  <FormInput
                    label="Map Pin Address Details"
                    value={state.contactPage?.mapLabel || ""}
                    onChange={(v) => setState({
                      ...state,
                      contactPage: { ...state.contactPage, mapLabel: v }
                    })}
                  />
                </div>
              </div>
            )}

            {/* 9. FAQS */}
            {activeTab === "faqs" && (
              <div className="space-y-8 max-h-[80vh] overflow-y-auto pr-4">
                <div className="flex justify-between items-center border-b border-border/60 pb-3">
                  <h2 className="font-display text-2xl">FAQs & Accordions</h2>
                  <button
                    onClick={() => {
                      const newItems = [
                        ...(state.faqs?.items || []),
                        { question: "New Question?", answer: "Answer block detailing information." }
                      ];
                      setState({
                        ...state,
                        faqs: { ...state.faqs, items: newItems }
                      });
                    }}
                    className="border border-blue-600 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-blue-500 hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    + Add FAQ
                  </button>
                </div>

                <div className="grid gap-6 sm:grid-cols-3">
                  <FormInput
                    label="FAQ Section Eyebrow"
                    value={state.faqs?.eyebrow || ""}
                    onChange={(v) => setState({ ...state, faqs: { ...state.faqs, eyebrow: v } })}
                  />
                  <FormInput
                    label="FAQ Title"
                    value={state.faqs?.title || ""}
                    onChange={(v) => setState({ ...state, faqs: { ...state.faqs, title: v } })}
                  />
                  <FormInput
                    label="FAQ Description"
                    value={state.faqs?.description || ""}
                    onChange={(v) => setState({ ...state, faqs: { ...state.faqs, description: v } })}
                  />
                </div>

                <div className="space-y-6 mt-4">
                  {(state.faqs?.items || []).map((faq, idx) => (
                    <div key={idx} className="border border-border/40 p-6 bg-surface/35 space-y-4 relative">
                      <button
                        onClick={() => {
                          const newItems = (state.faqs?.items || []).filter((_, i) => i !== idx);
                          setState({
                            ...state,
                            faqs: { ...state.faqs, items: newItems }
                          });
                        }}
                        className="absolute right-4 top-4 text-xs font-mono text-red-400 hover:text-red-300"
                      >
                        Delete
                      </button>
                      <FormInput
                        label="Question text"
                        value={faq.question}
                        onChange={(v) => {
                          const newItems = [...(state.faqs?.items || [])];
                          newItems[idx] = { ...newItems[idx], question: v };
                          setState({
                            ...state,
                            faqs: { ...state.faqs, items: newItems }
                          });
                        }}
                      />
                      <div className="space-y-2">
                        <label className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Answer text</label>
                        <textarea
                          rows={4}
                          value={faq.answer}
                          onChange={(e) => {
                            const newItems = [...(state.faqs?.items || [])];
                            newItems[idx] = { ...newItems[idx], answer: e.target.value };
                            setState({
                              ...state,
                              faqs: { ...state.faqs, items: newItems }
                            });
                          }}
                          className="w-full border border-border bg-surface/40 p-3 font-display text-sm outline-none focus:border-gold"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}

// Reusable Small Form Input
function FormInput({ label, value, onChange, placeholder = "" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div className="space-y-2 w-full">
      <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-border bg-surface/40 px-4 py-3 font-display text-base outline-none focus:border-gold transition-colors"
      />
    </div>
  );
}

// Client-side helper to scale/compress images to prevent ImageKit 25.0 MP limits errors
function resizeImage(file: File, maxWidth = 2560, maxHeight = 2560): Promise<File | Blob> {
  return new Promise((resolve) => {
    if (!file.type.startsWith("image/")) {
      resolve(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width <= maxWidth && height <= maxHeight) {
          resolve(file);
          return;
        }

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(file);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const resizedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now(),
              });
              resolve(resizedFile);
            } else {
              resolve(file);
            }
          },
          file.type,
          0.85
        );
      };
      img.onerror = () => resolve(file);
      img.src = event.target?.result as string;
    };
    reader.onerror = () => resolve(file);
    reader.readAsDataURL(file);
  });
}

// Media upload with Link or Local File Device Upload
function MediaUpload({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const [sourceType, setSourceType] = useState<"link" | "device">("link");
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      // 1. Resize/compress image client-side if it exceeds safe limits (max 2560px, well under 25 MP limit)
      const processedFile = await resizeImage(file, 2560, 2560);

      // 2. Get auth signature securely from the server
      const auth = await getImageKitAuthSignature();

      // 3. Build FormData for ImageKit
      const formData = new FormData();
      formData.append("file", processedFile);
      formData.append("fileName", file.name);
      formData.append("publicKey", imageKitConfig.publicKey);
      formData.append("signature", auth.signature);
      formData.append("expire", String(auth.expire));
      formData.append("token", auth.token);

      // 4. Post to ImageKit upload API
      const response = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload request failed.");
      }

      const result = await response.json();
      // Update value with returned secure URL
      onChange(result.url);
      toast.success("File uploaded and optimized successfully.");
      setSourceType("link"); // toggle back to link view to see output URL
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload file. Please verify settings.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4 border border-border/40 p-4 bg-surface/10 rounded-sm">
      <div className="flex justify-between items-center">
        <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{label}</label>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setSourceType("link")}
            className={`font-mono text-[9px] uppercase tracking-[0.15em] pb-0.5 border-b ${
              sourceType === "link" ? "border-gold text-gold" : "border-transparent text-muted-foreground"
            }`}
          >
            URL Link
          </button>
          <button
            type="button"
            onClick={() => setSourceType("device")}
            className={`font-mono text-[9px] uppercase tracking-[0.15em] pb-0.5 border-b ${
              sourceType === "device" ? "border-gold text-gold" : "border-transparent text-muted-foreground"
            }`}
          >
            From Device
          </button>
        </div>
      </div>

      {sourceType === "link" ? (
        <div className="flex gap-4 items-center">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Paste media path / URL (e.g. hero-tower.jpg)"
            className="flex-1 border border-border bg-surface/40 px-4 py-3 font-display text-sm outline-none focus:border-gold transition-colors"
          />
          {value && (
            <a href={value} target="_blank" rel="noreferrer" className="text-xs font-mono text-gold hover:underline">
              Preview
            </a>
          )}
        </div>
      ) : (
        <div className="border border-dashed border-border/60 p-6 text-center bg-surface/20 relative">
          {uploading ? (
            <div className="space-y-3 py-2">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-gold border-t-transparent mx-auto" />
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold">Uploading & optimizing...</p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Select an image/video to upload directly to ImageKit.</p>
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileUpload}
                className="mx-auto block text-xs font-mono text-gold cursor-pointer"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Special Editor Sub-component for Projects List (CRUD)
interface ProjectsEditorProps {
  projects: any[];
  onChange: (projects: any[]) => void;
}

function ProjectsEditor({ projects, onChange }: ProjectsEditorProps) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const handleDelete = (idx: number) => {
    if (confirm("Are you sure you want to remove this project?")) {
      const filtered = projects.filter((_, i) => i !== idx);
      onChange(filtered);
      if (selectedIdx === idx) setSelectedIdx(null);
    }
  };

  const handleAddProject = () => {
    const newProject = {
      slug: "new-project-" + Date.now().toString().slice(-4),
      name: "New Project Landmark",
      category: "Residential",
      status: "Upcoming",
      location: "Hyderabad",
      year: new Date().getFullYear().toString(),
      image: "project-luxury-heights.jpg",
      description: "Project narrative description details here.",
      highlights: ["Highlight line 1", "Highlight line 2"],
      amenities: ["Amenity 1", "Amenity 2"],
    };
    onChange([...projects, newProject]);
    setSelectedIdx(projects.length);
  };

  const current = selectedIdx !== null ? projects[selectedIdx] : null;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center border-b border-border/60 pb-3">
        <h2 className="font-display text-2xl">Projects Inventory</h2>
        <button
          onClick={handleAddProject}
          className="border border-blue-600 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-blue-500 hover:bg-blue-600 hover:text-white transition-colors"
        >
          + Add Project
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Projects list */}
        <div className="lg:col-span-4 border-r border-border/40 pr-6 space-y-2 max-h-[600px] overflow-y-auto">
          {projects.map((p, idx) => (
            <div
              key={idx}
              className={`flex justify-between items-center p-3 cursor-pointer transition-colors border ${
                selectedIdx === idx
                  ? "bg-surface/60 border-blue-600/60"
                  : "bg-surface/20 border-transparent hover:bg-surface/40"
              }`}
              onClick={() => setSelectedIdx(idx)}
            >
              <div>
                <p className="font-display text-sm truncate max-w-[150px]">{p.name}</p>
                <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted-foreground">{p.category} · {p.status}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(idx);
                }}
                className="text-[10px] font-mono text-red-400 hover:text-red-300 ml-2"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Project details editor */}
        <div className="lg:col-span-8">
          {current ? (
            <div className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <FormInput
                  label="Project Title"
                  value={current.name}
                  onChange={(v) => {
                    const newProj = [...projects];
                    newProj[selectedIdx!] = { ...current, name: v };
                    onChange(newProj);
                  }}
                />
                <FormInput
                  label="Database Slug (Unique ID, e.g. luxury-heights)"
                  value={current.slug}
                  onChange={(v) => {
                    const newProj = [...projects];
                    newProj[selectedIdx!] = { ...current, slug: v };
                    onChange(newProj);
                  }}
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-3">
                <div className="space-y-2">
                  <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Category</label>
                  <select
                    value={current.category}
                    onChange={(e) => {
                      const newProj = [...projects];
                      newProj[selectedIdx!] = { ...current, category: e.target.value };
                      onChange(newProj);
                    }}
                    className="w-full border border-border bg-surface/40 px-4 py-3 font-display text-sm outline-none focus:border-gold"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Government">Government</option>
                    <option value="Interiors">Interiors</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Status</label>
                  <select
                    value={current.status}
                    onChange={(e) => {
                      const newProj = [...projects];
                      newProj[selectedIdx!] = { ...current, status: e.target.value };
                      onChange(newProj);
                    }}
                    className="w-full border border-border bg-surface/40 px-4 py-3 font-display text-sm outline-none focus:border-gold"
                  >
                    <option value="Completed">Completed</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Upcoming">Upcoming</option>
                  </select>
                </div>
                <FormInput
                  label="Year / Period"
                  value={current.year}
                  onChange={(v) => {
                    const newProj = [...projects];
                    newProj[selectedIdx!] = { ...current, year: v };
                    onChange(newProj);
                  }}
                />
              </div>

              <FormInput
                label="Location Description"
                value={current.location}
                onChange={(v) => {
                  const newProj = [...projects];
                  newProj[selectedIdx!] = { ...current, location: v };
                  onChange(newProj);
                }}
              />

              <MediaUpload
                label="Project Showcase Cover Image"
                value={current.image}
                onChange={(v) => {
                  const newProj = [...projects];
                  newProj[selectedIdx!] = { ...current, image: v };
                  onChange(newProj);
                }}
              />

              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Project Narrative Description</label>
                <textarea
                  rows={4}
                  value={current.description}
                  onChange={(e) => {
                    const newProj = [...projects];
                    newProj[selectedIdx!] = { ...current, description: e.target.value };
                    onChange(newProj);
                  }}
                  className="w-full border border-border bg-surface/40 p-4 font-display text-sm outline-none focus:border-gold"
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Highlights (One per line)</label>
                  <textarea
                    rows={4}
                    value={current.highlights.join("\n")}
                    onChange={(e) => {
                      const newProj = [...projects];
                      newProj[selectedIdx!] = { ...current, highlights: e.target.value.split("\n") };
                      onChange(newProj);
                    }}
                    className="w-full border border-border bg-surface/40 p-4 font-mono text-xs outline-none focus:border-gold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Amenities (One per line)</label>
                  <textarea
                    rows={4}
                    value={current.amenities.join("\n")}
                    onChange={(e) => {
                      const newProj = [...projects];
                      newProj[selectedIdx!] = { ...current, amenities: e.target.value.split("\n") };
                      onChange(newProj);
                    }}
                    className="w-full border border-border bg-surface/40 p-4 font-mono text-xs outline-none focus:border-gold"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="h-96 flex items-center justify-center border border-dashed border-border/60 bg-surface/10 rounded-sm">
              <p className="font-mono text-xs text-muted-foreground text-center">Select a project from the panel to edit details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

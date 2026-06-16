import React, { createContext, useContext, useState, useEffect } from "react";
import { database } from "./firebase";
import { ref, onValue, set } from "firebase/database";
import * as staticContent from "./content";

// Define shape of content
export interface SiteContent {
  company: typeof staticContent.company & { logo?: string; favicon?: string };
  hero: typeof staticContent.hero & { backgroundType?: 'image' | 'video'; videoUrl?: string };
  stats: typeof staticContent.stats;
  about: typeof staticContent.about;
  chairman: typeof staticContent.chairman;
  projects: typeof staticContent.projects;
  services: typeof staticContent.services;
  testimonials: typeof staticContent.testimonials;
  whyUs: typeof staticContent.whyUs;
  nav: typeof staticContent.nav;
  servicesPage: typeof staticContent.servicesPage;
  workflow: typeof staticContent.workflow;
  projectsPage: typeof staticContent.projectsPage;
  currentProjects: typeof staticContent.currentProjects;
  flagshipLandmark: typeof staticContent.flagshipLandmark;
  projectLiterature: typeof staticContent.projectLiterature;
  contactPage: typeof staticContent.contactPage;
  faqs: typeof staticContent.faqs;
}

export const defaultContent: SiteContent = {
  company: { ...staticContent.company, logo: "", favicon: "" },
  hero: { ...staticContent.hero, backgroundType: 'image', videoUrl: '' },
  stats: staticContent.stats,
  about: staticContent.about,
  chairman: staticContent.chairman,
  projects: staticContent.projects,
  services: staticContent.services,
  testimonials: staticContent.testimonials,
  whyUs: staticContent.whyUs,
  nav: staticContent.nav,
  servicesPage: staticContent.servicesPage,
  workflow: staticContent.workflow,
  projectsPage: staticContent.projectsPage,
  currentProjects: staticContent.currentProjects,
  flagshipLandmark: staticContent.flagshipLandmark,
  projectLiterature: staticContent.projectLiterature,
  contactPage: staticContent.contactPage,
  faqs: staticContent.faqs,
};

interface ContentContextType {
  content: SiteContent;
  loading: boolean;
  saveContent: (newContent: SiteContent) => Promise<void>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const siteContentRef = ref(database, "siteContent");
    
    // Subscribe to real-time database updates
    const unsubscribe = onValue(siteContentRef, (snapshot) => {
      const dbData = snapshot.val();
      if (dbData) {
        // Deep merge with default fallback content to ensure new/missing fields don't cause crashes
        const merged: SiteContent = {
          company: { ...defaultContent.company, ...dbData.company },
          hero: { ...defaultContent.hero, ...dbData.hero },
          stats: dbData.stats ? [...dbData.stats] : defaultContent.stats,
          about: { 
            ...defaultContent.about, 
            ...dbData.about,
            pillars: dbData.about?.pillars ? [...dbData.about.pillars] : defaultContent.about.pillars,
            body: dbData.about?.body ? [...dbData.about.body] : defaultContent.about.body,
            aboutChairman: {
              ...defaultContent.about.aboutChairman,
              ...dbData.about?.aboutChairman,
              paragraphs: dbData.about?.aboutChairman?.paragraphs ? [...dbData.about.aboutChairman.paragraphs] : defaultContent.about.aboutChairman.paragraphs,
              values: dbData.about?.aboutChairman?.values ? [...dbData.about.aboutChairman.values] : defaultContent.about.aboutChairman.values,
            },
            philosophy: {
              ...defaultContent.about.philosophy,
              ...dbData.about?.philosophy,
              items: dbData.about?.philosophy?.items ? [...dbData.about.philosophy.items] : defaultContent.about.philosophy.items,
            },
            timeline: {
              ...defaultContent.about.timeline,
              ...dbData.about?.timeline,
              milestones: dbData.about?.timeline?.milestones ? [...dbData.about.timeline.milestones] : defaultContent.about.timeline.milestones,
            }
          },
          chairman: { ...defaultContent.chairman, ...dbData.chairman },
          projects: dbData.projects ? [...dbData.projects] : defaultContent.projects,
          services: dbData.services ? [...dbData.services] : defaultContent.services,
          testimonials: dbData.testimonials ? [...dbData.testimonials] : defaultContent.testimonials,
          whyUs: dbData.whyUs ? [...dbData.whyUs] : defaultContent.whyUs,
          nav: dbData.nav ? [...dbData.nav] : defaultContent.nav,
          servicesPage: { ...defaultContent.servicesPage, ...dbData.servicesPage },
          workflow: {
            ...defaultContent.workflow,
            ...dbData.workflow,
            steps: dbData.workflow?.steps ? [...dbData.workflow.steps] : defaultContent.workflow.steps,
          },
          projectsPage: { ...defaultContent.projectsPage, ...dbData.projectsPage },
          currentProjects: {
            ...defaultContent.currentProjects,
            ...dbData.currentProjects,
            items: dbData.currentProjects?.items ? [...dbData.currentProjects.items] : defaultContent.currentProjects.items,
          },
          flagshipLandmark: {
            ...defaultContent.flagshipLandmark,
            ...dbData.flagshipLandmark,
            metrics: dbData.flagshipLandmark?.metrics ? [...dbData.flagshipLandmark.metrics] : defaultContent.flagshipLandmark.metrics,
          },
          projectLiterature: {
            ...defaultContent.projectLiterature,
            ...dbData.projectLiterature,
            brochures: dbData.projectLiterature?.brochures ? [...dbData.projectLiterature.brochures] : defaultContent.projectLiterature.brochures,
          },
          contactPage: {
            ...defaultContent.contactPage,
            ...dbData.contactPage,
            cover: { ...defaultContent.contactPage.cover, ...dbData.contactPage?.cover },
          },
          faqs: {
            ...defaultContent.faqs,
            ...dbData.faqs,
            items: dbData.faqs?.items ? [...dbData.faqs.items] : defaultContent.faqs.items,
          },
        };
        setContent(merged);
      } else {
        // Fall back to default static content if DB is empty
        setContent(defaultContent);
      }
      setLoading(false);
    }, (error) => {
      console.error("Firebase fetch error, falling back to static content:", error);
      setContent(defaultContent);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const saveContent = async (newContent: SiteContent) => {
    const siteContentRef = ref(database, "siteContent");
    await set(siteContentRef, newContent);
  };

  return (
    <ContentContext.Provider value={{ content, loading, saveContent }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return context;
}

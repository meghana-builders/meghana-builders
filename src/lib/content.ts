// ============================================================
// All site content — structured for future CMS wiring.
// Every string, image, and slot is defined here so a CMS layer
// can later swap this module for fetched data.
// ============================================================

import heroTower from "@/assets/hero-tower.jpg";
import aboutFacade from "@/assets/about-facade.jpg";
import chairmanImg from "@/assets/chairman.jpg";
import pLuxury from "@/assets/project-luxury-heights.jpg";
import pSecretariat from "@/assets/project-secretariat.jpg";
import pSunrise from "@/assets/project-sunrise.jpg";
import pCivic from "@/assets/project-civic.jpg";
import pVilla from "@/assets/project-villa.jpg";
import pMeghana from "@/assets/project-meghana-towers.jpg";

export const company = {
  name: "Meghana Builders",
  tagline: "Crafting Landmarks. Building Trust.",
  established: 2018,
  relaunch: 2025,
  city: "Hyderabad",
  phone: "+91 7096666669",
  whatsapp: "https://wa.me/917096666669",
  email: "info@meghanabuilders.com",
  address: {
    line1: "First Floor 101, Osadia Residency, Vilayath Manzil",
    line2: "County Club, Begumpet, Hyderabad 500016",
  },
  social: [
    { label: "Instagram", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "YouTube", href: "#" },
  ],
};

export const hero = {
  eyebrow: `Est. ${2018} — Relaunching 2025`,
  titleLines: ["We Don't Build", "Structures.", "We Sculpt", "Landmarks."],
  subtitle:
    "Premier residential & commercial construction in Hyderabad — blending architectural innovation with structural excellence.",
  primaryCta: { label: "Start Your Project", to: "/contact" as const },
  secondaryCta: { label: "Explore Work", to: "/projects" as const },
  image: heroTower,
};

export const stats = [
  { value: 24, suffix: "+", label: "Landmark Projects" },
  { value: 1.2, suffix: "M sqft", label: "Built & Delivered" },
  { value: 7, suffix: "yrs", label: "Of Trusted Craft" },
  { value: 100, suffix: "%", label: "RERA Compliant" },
];

export const about = {
  eyebrow: "About the Atelier",
  title: "A studio of engineers, architects and obsessives.",
  body: [
    "Established in 2018 with a vision to transform the skyline of Hyderabad, Meghana Builders & Developers operates at the intersection of architectural innovation and structural engineering excellence.",
    "Relaunching in 2025 with renewed focus on sustainable practices, premium materials and unwavering commitment to delivery — from Musheerabad to Banjara Hills, every project bears our signature.",
  ],
  pillars: [
    { title: "Mission", body: "Deliver superior value through innovation, quality, and timely completion — every structure built to stand the test of time." },
    { title: "Vision", body: "To be the preferred name for construction across Telangana — recognized for integrity and excellence in both private and public sectors." },
  ],
  image: aboutFacade,
  headerEyebrow: "The Studio",
  headerTitle: "Engineered with discipline.",
  headerSubtitle: "Detailed with devotion.",
  narrativeEyebrow: "Brand Narrative",
  narrativeTitle: "Landmarks that define the city skyline.",
  aboutChairman: {
    eyebrow: "Letter from the Founder",
    title: "We measure success in trust, not in floors.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800&h=1000",
    name: "Mr. Manikanth Kondapally",
    role: "Founder & Chairman",
    paragraphs: [
      "Seven years ago, we began with a single conviction: that construction is a long covenant, not a transaction. Today, that conviction is concrete. Every beam we cast, every facade we finish, every key we hand over carries the weight of that promise.",
      "As we step forward, our ambition shifts toward sustainable architecture, green infrastructure, and 100% TS-RERA compliance. We want to design environments that outlast us, providing sanctuary for families and institutions alike."
    ],
    values: [
      { title: "Building Covenants", desc: "Every agreement is a lifetime promise of quality, safety, and delivery." },
      { title: "Premium Sourcing", desc: "No second-grade materials. Everything is verified by our in-house lab." },
      { title: "Generational Engineering", desc: "Structures built to endure environmental forces and stand for decades." }
    ]
  },
  philosophy: {
    eyebrow: "Atelier Philosophy",
    title: "Crafted with architectural discipline.",
    description: "We operate under a simple directive: build landmark structures that combine artistic grace, severe safety standards, and flawless temporal delivery.",
    items: [
      {
        num: "01",
        title: "Architectural Artistry",
        description: "Designing spatial narratives that transcend basic function. We create structures that fuse modern proportions, natural light, and premium, enduring aesthetics.",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800&h=600"
      },
      {
        num: "02",
        title: "Structural Mastery",
        description: "Zero compromises on durability. We work with elite structural designers, applying seismic-grade foundations, reinforced grade-A steel, and heavy concrete verification.",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800&h=600"
      },
      {
        num: "03",
        title: "Timeline Rigor",
        description: "Punctuality is engineered into our methodology. Every milestone is tracked, analyzed, and completed in coordination, preserving budgets and deadlines alike.",
        image: "https://images.unsplash.com/photo-1464938050520-50d49e70d503?auto=format&fit=crop&q=80&w=800&h=600"
      },
      {
        num: "04",
        title: "Vastu Harmonization",
        description: "Aligning architectural forms with natural flows. We seamlessly integrate traditional Vastu Shastra principles into premium layout grids for optimized prosperity and peace.",
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800&h=600"
      }
    ]
  },
  timeline: {
    eyebrow: "Historical Path",
    title: "Seven years of structural evolution.",
    milestones: [
      {
        year: "2018",
        title: "The Atelier's Foundation",
        description: "Founded with a single core belief: construction is a long-term contract of trust, not a mere transaction. Established our operations in Hyderabad.",
        image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=600&h=400"
      },
      {
        year: "2021",
        title: "Government & Civic Works",
        description: "Expanded capabilities into public sector infrastructure, engineering mixed-use administrative complexes and proving structural reliability.",
        image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=600&h=400"
      },
      {
        year: "2023",
        title: "High-Rise Sky Residences",
        description: "Delivered Luxury Heights in Banjara Hills, a 28-storey residential skyscraper framing the Hyderabad skyline with curtain-wall glazing.",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600&h=400"
      },
      {
        year: "2025",
        title: "Atelier Relaunch & Green Initiative",
        description: "Relaunched the brand with sustainable architectural modeling, strictly vetted premium materials, and 100% transparent client communication.",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600&h=400"
      },
      {
        year: "2026",
        title: "Next-Gen Curvilinear Landmark",
        description: "Initiated construction on Meghana Towers in Kavadiguda, a 34-storey curvilinear twin tower joined by a structural sky-bridge.",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=600&h=400"
      }
    ]
  }
};

export const chairman = {
  eyebrow: "Chairman's Note",
  name: "M. Krishna Reddy",
  title: "Founder & Chairman",
  quote:
    "We don't measure success in floors built. We measure it in the families who call our buildings home, and the institutions who trust us with their legacy.",
  message:
    "Seven years ago we began with a single conviction: construction is a covenant, not a transaction. Today, that promise is concrete in every structure we deliver.",
  image: chairmanImg,
};

export type Project = {
  slug: string;
  name: string;
  category: "Residential" | "Government" | "Interiors" | "Commercial";
  status: "Completed" | "Ongoing" | "Upcoming";
  location: string;
  year: string;
  image: string;
  description: string;
  highlights: string[];
  amenities: string[];
};

export const projects: Project[] = [
  {
    slug: "sabri-heights",
    name: "Meghana Sabri Heights",
    category: "Residential",
    status: "Ongoing",
    location: "Upperpally, Rajendra Nagar, Hyderabad",
    year: "2024–2026",
    image: pLuxury,
    description:
      "A premium residential tower featuring luxury 3 BHK apartments styled with modern spacing, green balconies, and panoramic natural light.",
    highlights: ["Premium 3 BHK apartments", "Seismic-grade foundation", "Under-construction block"],
    amenities: ["Landscaped garden", "Power backup", "Covered parking", "Modern lifts", "Rainwater harvesting"],
  },
  {
    slug: "brindavan",
    name: "Meghana Brindavan",
    category: "Residential",
    status: "Completed",
    location: "Malkajgiri, Secunderabad",
    year: "2022",
    image: pSunrise,
    description:
      "A beautiful gated residential community featuring 2 & 3 BHK apartments in Malkajgiri with rich landscaping, a clubhouse, and premium amenities.",
    highlights: ["2 & 3 BHK configurations", "Premium Secunderabad location", "Completed and hand-over done"],
    amenities: ["Central courtyard", "Children's play park", "Equipped clubhouse", "24/7 Security", "Jogging track"],
  },
  {
    slug: "marella-homes",
    name: "Meghana Marella Homes",
    category: "Residential",
    status: "Completed",
    location: "Malkajgiri, Secunderabad",
    year: "2023",
    image: pVilla,
    description:
      "Modern elite residential apartments offering maximum ventilation, Vastu compliance, and premium teak wood finishes in Malkajgiri.",
    highlights: ["100% Vastu-compliant layouts", "Premium interior teak woodwork", "Ready-to-move-in"],
    amenities: ["Intercom system", "Gymnasium", "RO water treatment", "CCTV surveillance", "Solar streetlights"],
  },
  {
    slug: "residency-gajularamaram",
    name: "Meghana Residency",
    category: "Residential",
    status: "Completed",
    location: "Gajularamaram, Hyderabad",
    year: "2021",
    image: pCivic,
    description:
      "A contemporary residential block in Gajularamaram featuring custom layout options, premium sanitaries, and proximity to major IT corridors.",
    highlights: ["Seismic-resistant design", "High quality marble floorings", "Excellent ventilation flow"],
    amenities: ["Underground cabling", "Gym room", "Multipurpose party hall", "Water purification plant"],
  },
  {
    slug: "hill-county",
    name: "Meghana Hill County",
    category: "Residential",
    status: "Completed",
    location: "Keesara, Hyderabad",
    year: "2020",
    image: pSecretariat,
    description:
      "An elite gated plot community in Keesara. Strategically developed residential layouts with wide blacktop roads, tree linings, and active water supply.",
    highlights: ["Premium gated layout plots", "Wide 40ft blacktop roads", "Clear title layouts"],
    amenities: ["Water overhead tanks", "Avenue plantations", "Children's park", "Underground drainage", "Walking track"],
  },
  {
    slug: "meghana-towers",
    name: "Meghana Towers",
    category: "Residential",
    status: "Upcoming",
    location: "Kavadiguda, Hyderabad",
    year: "2026",
    image: pMeghana,
    description:
      "Our flagship — twin curvilinear towers rising 34 floors above Kavadiguda, with a sky-bridge connecting both penthouses.",
    highlights: ["34-storey twin towers", "Sky-bridge penthouse", "Curtain-wall facade"],
    amenities: ["Sky-bridge", "Rooftop pool", "Spa", "Co-working lounge", "EV charging"],
  },
];

export const services = [
  {
    name: "Specialized Construction",
    body: "End-to-end management of construction — from residential complexes to commercial infrastructure — with rigorous safety and quality standards.",
  },
  {
    name: "Government Projects",
    body: "Trusted partners for public infrastructure development, with strict adherence to regulatory standards and timelines.",
  },
  {
    name: "Civil Engineering",
    body: "Comprehensive civil engineering — structural design, site analysis, project planning, soil and foundation engineering.",
  },
  {
    name: "Renovation & Interiors",
    body: "Transforming existing spaces with modern designs and premium finishes that breathe new life into your property.",
  },
  {
    name: "Architectural Design",
    body: "Innovative blueprints with 3D modeling to visualize your project before the first brick is laid.",
  },
  {
    name: "Structural Engineering",
    body: "Safety and durability through rigorous analysis and scientifically backed structural frameworks.",
  },
  {
    name: "Project Management",
    body: "Oversee the full project lifecycle — timelines kept, budgets respected, quality non-negotiable.",
  },
  {
    name: "Vastu Consultation",
    body: "Ancient Vastu Shastra principles integrated with modern architecture for spaces that feel as good as they look.",
  },
  {
    name: "Joint Ventures",
    body: "Collaborate with landowners to develop premium properties — transparent deals, maximum value appreciation.",
  },
];

export const testimonials = [
  {
    body: "Meghana Builders delivered exactly what they promised. The attention to detail in our apartment is unmatched.",
    name: "Rajesh Kumar",
    role: "Homeowner, Luxury Heights",
  },
  {
    body: "As a designer, I appreciate their structural quality. It gave me the perfect canvas to create a beautiful home.",
    name: "Priya Reddy",
    role: "Interior Designer",
  },
  {
    body: "Professional, transparent, and timely. Their commercial spaces yield high returns due to the premium finish.",
    name: "Vikram Singh",
    role: "Commercial Investor",
  },
];

export const whyUs = [
  { num: "01", title: "Transparent Process", body: "Every milestone tracked, every cost disclosed, every decision shared.", image: "https://images.unsplash.com/photo-1503387762-592dedb80256?auto=format&fit=crop&q=80&w=600&h=400" },
  { num: "02", title: "RERA Compliant", body: "All projects registered and delivered within statutory norms.", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600&h=400" },
  { num: "03", title: "Premium Materials", body: "Specified, sourced and verified by our in-house quality team.", image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80&w=600&h=400" },
  { num: "04", title: "On-Time Handover", body: "Schedule discipline is a craft. We treat your deadline as our reputation.", image: "https://images.unsplash.com/photo-1429497495508-c47178752432?auto=format&fit=crop&q=80&w=600&h=400" },
];

export const nav = [
  { label: "Home", to: "/" as const },
  { label: "About", to: "/about" as const },
  { label: "Services", to: "/services" as const },
  { label: "Projects", to: "/projects" as const },
  { label: "Contact", to: "/contact" as const },
];

// New Page Layout CMS Schemas
export const servicesPage = {
  eyebrow: "Capabilities",
  titleFirst: "From the first sketch",
  titleItalic: "to the final brick.",
  description: "A holistic, in-house approach — engineering, design, project management and finishes under one disciplined roof."
};

export const workflow = {
  eyebrow: "Our Methodology",
  title: "How we shape blueprints into concrete.",
  steps: [
    {
      num: "01",
      title: "Vastu & Site Audit",
      description: "We evaluate plot alignment, soil compaction, and perform Vastu audits before drawing the first line.",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600&h=400"
    },
    {
      num: "02",
      title: "Architectural Concept",
      description: "Drafting initial floor plans, spatial distributions, and 3D visual concepts to walkthrough spatial layouts.",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600&h=400"
    },
    {
      num: "03",
      title: "Structural Design",
      description: "Load calculations, seismic reinforcement modeling, and concrete/steel specifications verified by engineers.",
      image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&q=80&w=600&h=400"
    },
    {
      num: "04",
      title: "Regulatory Approvals",
      description: "Securing TS-RERA registrations, municipal permissions, environmental clearances, and safety approvals.",
      image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=600&h=400"
    },
    {
      num: "05",
      title: "Foundation & Framing",
      description: "Excavation, piling, and casting the reinforced concrete column skeleton using heavy grade-A concrete.",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=600&h=400"
    },
    {
      num: "06",
      title: "Exterior & Facade",
      description: "Erecting robust masonry, high-performance curtain walls, and double-glazed facades for thermal efficiency.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600&h=400"
    },
    {
      num: "07",
      title: "Interior Integration",
      description: "Bespoke marble flooring, premium woodwork detailing, and advanced utilities configuration.",
      image: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&q=80&w=600&h=400"
    },
    {
      num: "08",
      title: "Covenant Handover",
      description: "Final quality assurance certification, utilities testing, cleanup, and handing over the keys to the client.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=600&h=400"
    }
  ]
};

export const projectsPage = {
  eyebrow: "Index",
  titleNormal: "Selected",
  titleItalic: "works."
};

export const currentProjects = {
  eyebrow: "Active Portals",
  titleNormal: "Current",
  titleItalic: "Projects.",
  description: "Explore our active residential masterplans and luxury developer hubs live on the web. Click any card to launch their interactive portfolios.",
  items: [
    {
      name: "Meghana Builders Hub",
      description: "Our signature corporate development portfolio and apartment showcase portal.",
      url: "https://meghanabuilders.vercel.app/",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800&h=600"
    },
    {
      name: "Meghana Luxury Villas",
      description: "A boutique collection of signature gated villa communities and architectural designs.",
      url: "https://meghana-villas.lovable.app",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800&h=600"
    }
  ]
};

export const flagshipLandmark = {
  eyebrow: "Flagship Landmark",
  titleNormal: "Meghana Towers:",
  titleItalic: "A new horizon.",
  description: "Our upcoming flagship residential project in Kavadiguda, rising 34 floors with structural twin towers connected by a bespoke, high-altitude sky bridge. Engineered with seismic-resilience and curtain-wall glazing framing panoramic city vistas.",
  image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800&h=600",
  metrics: [
    { label: "Elevation", value: "34 Floors" },
    { label: "Sky-Bridge", value: "Level 33" },
    { label: "Completion", value: "2026" }
  ]
};

export const projectLiterature = {
  eyebrow: "Downloads",
  titleNormal: "Project",
  titleItalic: "Literature.",
  description: "Download high-resolution architectural specs, layout masterplans, and development details in PDF format.",
  brochures: [
    {
      name: "Meghana Towers Catalog",
      size: "PDF · 18.4 MB",
      url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=600&h=800"
    },
    {
      name: "Meghana Luxury Villas",
      size: "PDF · 14.2 MB",
      url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=600&h=800"
    },
    {
      name: "Corporate Profile 2026",
      size: "PDF · 8.7 MB",
      url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600&h=800"
    }
  ]
};

export const contactPage = {
  cover: {
    eyebrow: "Get in touch",
    titleNormal: "Let's draft",
    titleItalic: "something good."
  },
  enquiryEyebrow: "Enquiry",
  enquiryTitle: "Tell us about your project.",
  mapLabel: "Begumpet, Hyderabad 500016"
};

export const faqs = {
  eyebrow: "Information Center",
  title: "Frequently asked questions.",
  description: "Clear answers regarding our certifications, operations, development capabilities, and structural quality assurances.",
  items: [
    {
      question: "Are your projects RERA certified?",
      answer: "Yes, 100% of our residential and commercial projects are registered under the Telangana State Real Estate Regulatory Authority (TS-RERA). We strictly comply with statutory disclosures and delivery timelines.",
    },
    {
      question: "What is your primary area of operations?",
      answer: "We are proudly based in Hyderabad, Telangana. Our current developments span premier zones including Banjara Hills, Begumpet, Kavadiguda, Jubilee Hills, and Secunderabad.",
    },
    {
      question: "Do you undertake joint venture developments?",
      answer: "Yes. We collaborate extensively with landowners for joint developments. We offer transparent profit/area-sharing models, premium architectural plans, and maximum capital appreciation.",
    },
    {
      question: "How do you guarantee material and building quality?",
      answer: "We enforce severe laboratory testing for all cement and concrete mixes, source certified grade-A reinforcement steel, and run regular structural pressure tests verified by third-party auditing labs.",
    },
  ]
};

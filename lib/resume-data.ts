// Single source of truth for all resume content.
// Imported by both the page components and the chat API route so the
// displayed content and the chatbot's knowledge never drift apart.

export type Project = {
  client: string;
  location: string;
  title: string;
  role: string;
  years: string;
  value: string;
  description: string;
};

export type Role = {
  title: string;
  period: string;
  summary?: string;
  bullets?: string[];
};

export type Employer = {
  company: string;
  period: string;
  note?: string;
  progression?: string[];
  roles: Role[];
};

export type Education = {
  qualification: string;
  institution: string;
  year: string;
};

export const resume = {
  name: "Siddharth Begwani",
  headline:
    "22+ years' experience | CRM & CX Transformation | Large Program Governance | AI/ML Strategy",
  tagline:
    "Senior consulting executive delivering multi-million-dollar CRM, CX and AI transformation programs for global clients.",
  location: "Kolkata, India",
  availability: "Open to fully remote, global roles",
  availabilityDetail:
    "Available immediately for senior remote engagements – full-time, part-time, or consulting retainer",
  contact: {
    email: "sbegwani@hotmail.com",
    phone: "+91 93395 05023",
  },

  keyStats: [
    { value: "22+", label: "Years of experience" },
    { value: "$10 mn+", label: "Downstream revenue originated" },
    { value: "80+", label: "RFPs anchored" },
    { value: "4", label: "Global regions served remotely" },
  ],

  summary:
    "Senior consulting executive with 22+ years of experience across CRM/CX transformation, large-scale program governance, AI/ML strategy, and digital transformation. Proven track record of delivering complex, multi-million-dollar engagements for global clients across the US, Europe, Japan, and Australia — the majority executed in a fully remote, offshore delivery model. Combines deep functional expertise in customer experience with hands-on capability in data science and machine learning, enabling both strategic advisory and end-to-end delivery leadership. Seeking senior remote roles where this blend of consulting depth, technology breadth, and global delivery experience can drive transformation outcomes for international organizations.",

  highlights: [
    {
      title: "Business Development & Revenue Generation",
      bullets: [
        "Originated $10 mn+ in immediate downstream revenues from pure consulting engagements across the 2017–2026 period",
        "Anchored 80+ RFPs and directly contributed to $10 mn in deals won",
        "Managed the VMware account for 6 years, generating average annual revenues of $300K; total contribution exceeding $1.8 mn",
        "Downstream revenues of $2 mn (Riverside), $1.2 mn (Reliance JIO), and $800K (Luminus) directly attributable to consulting work",
      ],
    },
    {
      title: "People Leadership & Practice Development",
      bullets: [
        "Maintained ~100% billable utilization of all direct reportees over 6 years, with personal utilization consistently above 70%",
        "Achieved zero attrition in the core consulting team from 2017 to 2019 (team of 7–8); only five resignations during 2020–26 (team of 20+ direct and indirect reportees)",
        "Built an exhaustive Salesforce.com training library and detailed L4 process maps covering all major CRM processes, used as onboarding and upskilling resources",
        "Generated ideas for 30+ Agentic AI solutions in CRM covering Sales, Service and Marketing; each idea had an overview, client benefits and steps in implementation – a curated subset submitted to the technical team for feasibility assessment and development pipeline prioritization",
      ],
    },
  ],

  projects: [
    {
      client: "BNY Mellon",
      location: "USA",
      title: "Digital Call Centre Transformation",
      role: "Offshore Program Director",
      years: "2023–2025",
      value: "$4.2 mn",
      description:
        "Led end-to-end governance of a large-scale digital call center transformation program for one of the world's largest custody banks, managing distributed teams across multiple time zones entirely remotely.",
    },
    {
      client: "Zurich Insurance",
      location: "Japan",
      title: "Digital Transformation (CRM Track)",
      role: "Offshore Project Manager",
      years: "2022",
      value: "Overall program $8 mn; CRM track $1.5 mn",
      description:
        "Directed the CRM workstream of a company-wide digital transformation program, coordinating cross-cultural delivery between India, Japan, and Switzerland in a fully remote engagement.",
    },
    {
      client: "Reliance JIO",
      location: "India",
      title: "CRM Systems Evaluation",
      role: "CRM Consulting Lead",
      years: "2022",
      value: "Consulting $300K; downstream $1.2 mn",
      description:
        "Conducted comprehensive evaluation of CRM platforms for one of India's largest telecoms operators, culminating in a strategic recommendation that unlocked $1.2 mn of downstream implementation work.",
    },
    {
      client: "Luminus",
      location: "Belgium",
      title: "Long-Term Demand Forecasting",
      role: "Consulting Lead & Data Scientist",
      years: "2021",
      value: "$300K",
      description:
        "Designed and delivered an AI/ML-driven demand forecasting model for a major Belgian utilities company; applied advanced ML techniques to substantially improve forecast accuracy for long-term energy planning.",
    },
    {
      client: "Cargill",
      location: "Global",
      title: "Omni-Channel Implementation",
      role: "Product Owner & Project Manager",
      years: "2020",
      value: "$500K",
      description:
        "Managed global omni-channel CRM rollout for one of the world's largest agricultural companies, coordinating delivery across multiple geographies and business units.",
    },
    {
      client: "Riverside Company",
      location: "USA",
      title: "ERP Vendor Analysis & CRM Revitalization",
      role: "Consulting Lead",
      years: "2018–2019",
      value: "Consulting $400K; downstream $2 mn",
      description:
        "Led ERP vendor selection and CRM process revitalization for a leading US-based private equity firm, generating $2 mn in downstream revenues.",
    },
    {
      client: "IDP Education",
      location: "Australia",
      title: "Event Management & CRM System",
      role: "PM & Lead Solution Designer",
      years: "2017",
      value: "Consulting $200K; total project >$3 mn",
      description:
        "Delivered consulting, solution design, and build leadership for a bespoke CRM and event management system for a major Australian education services company.",
    },
  ] as Project[],

  experience: [
    {
      company: "Cognizant Technology Solutions",
      period: "Oct 2006 – May 2026",
      progression: [
        "Consultant (2006)",
        "Senior Consultant (2010)",
        "Manager – Consulting (2013)",
        "Associate Director (2016)",
        "Director (2023)",
      ],
      roles: [
        {
          title: "Director – CX/CRM Consulting",
          period: "Jan 2023 – May 2026",
          summary:
            "Senior consulting leader responsible for end-to-end delivery of CRM, digital transformation, and program governance engagements for global enterprise clients. All major engagements delivered in a remote/offshore capacity from India, managing distributed cross-functional teams and executive-level client relationships across the US, Europe, Japan, and Australia.",
        },
      ],
    },
    {
      company: "Tata Strategic Management Group",
      period: "May 2005 – Sep 2006",
      roles: [
        {
          title:
            "Associate Consultant – Technology, Media and Telecommunications practice",
          period: "May 2005 – Sep 2006",
          summary:
            "Contributed to two major management consulting engagements:",
          bullets: [
            "Process optimization to achieve 30% reduction in energy and utilities costs for VSNL",
            "Formulation of a market entry strategy for a Healthcare BPO startup",
          ],
        },
      ],
    },
    {
      company: "Cognizant Technology Solutions",
      period: "Feb 2002 – May 2003",
      note: "Left to pursue a full-time MBA at FMS Delhi",
      roles: [
        {
          title: "Programmer Analyst – Retail practice",
          period: "Feb 2002 – May 2003",
          summary:
            "Delivered development projects using ASP.Net, JavaScript and C#.",
        },
      ],
    },
  ] as Employer[],

  coreCompetencies: [
    "CRM / CX Strategy & Transformation",
    "Large Program Governance & PMO",
    "AI, Machine Learning & Gen AI / Agentic AI",
    "Digital Transformation Consulting",
    "Salesforce.com & Microsoft Dynamics 365",
    "Client Engagement & Executive Stakeholder Management",
    "Business Development & Pre-Sales (RFPs)",
    "Offshore / Distributed Team Leadership",
    "Design Thinking & Process Re-engineering",
    "Supply Chain & Demand Analytics",
  ],

  technicalSkills: [
    {
      category: "CRM Platforms",
      items: ["Salesforce.com", "Microsoft Dynamics 365"],
    },
    {
      category: "AI / ML",
      items: [
        "Python",
        "R",
        "TensorFlow",
        "Scikit-learn",
        "Supervised / unsupervised learning",
        "Deep learning",
        "Agentic AI frameworks (LangChain, OpenAI SDK, CrewAI)",
      ],
    },
    { category: "Data & Analytics", items: ["SQL", "Tableau"] },
    {
      category: "Cloud",
      items: ["Amazon Web Services (AWS)", "Oracle Cloud"],
    },
    {
      category: "Delivery Methodology",
      items: [
        "Agile / Scrum (Certified Scrum Master)",
        "Waterfall",
        "Hybrid program governance",
      ],
    },
  ],

  education: [
    {
      qualification: "Master of Business Administration (MBA)",
      institution: "Faculty of Management Studies (FMS), University of Delhi",
      year: "2005",
    },
    {
      qualification: "Bachelor of Engineering – Electrical",
      institution: "Jadavpur University, Kolkata",
      year: "2001",
    },
    {
      qualification: "MicroMasters – Statistics and Data Science",
      institution: "MITx (Massachusetts Institute of Technology)",
      year: "2019",
    },
    {
      qualification: "MicroMasters – Supply Chain Management",
      institution: "MITx (Massachusetts Institute of Technology)",
      year: "2017",
    },
  ] as Education[],
  educationNote:
    "Holder of MIT Affiliate Alumni status (MITx MicroMasters program).",

  certifications: [
    "Certified Scrum Master (CSM)",
    "Project Management Institute – Agile Certified Practitioner",
    "Salesforce.com – Certified (multiple modules including Admin, Sales Cloud, CPQ, AI Specialist)",
    "Microsoft Dynamics 365 – Certified",
    "Amazon Web Services (AWS) – Cloud Certification",
    "Oracle Cloud – Certified",
    "Deep Learning & Machine Learning – Multiple platform certifications (TensorFlow, Python-based ML frameworks)",
    "Design Thinking – Certified practitioner",
    "2,000+ hours of self-directed professional development via digital learning platforms across AI/ML, cloud, agile, and consulting disciplines",
  ],
};

export type Resume = typeof resume;

/** Plain-text rendering of the full resume, used as the chatbot's knowledge base. */
export function resumeAsText(r: Resume = resume): string {
  const lines: string[] = [];
  lines.push(`NAME: ${r.name}`);
  lines.push(`HEADLINE: ${r.headline}`);
  lines.push(`LOCATION: ${r.location} (${r.availability})`);
  lines.push(`AVAILABILITY: ${r.availabilityDetail}`);
  lines.push(`CONTACT: Email ${r.contact.email}; Phone ${r.contact.phone}`);
  lines.push("", "PROFESSIONAL SUMMARY", r.summary);

  lines.push("", "CORE COMPETENCIES");
  r.coreCompetencies.forEach((c) => lines.push(`- ${c}`));

  lines.push("", "PROFESSIONAL EXPERIENCE");
  r.experience.forEach((e) => {
    lines.push(`${e.company} (${e.period})${e.note ? ` — ${e.note}` : ""}`);
    if (e.progression)
      lines.push(`Career progression: ${e.progression.join(" → ")}`);
    e.roles.forEach((role) => {
      lines.push(`  ${role.title} (${role.period})`);
      if (role.summary) lines.push(`  ${role.summary}`);
      role.bullets?.forEach((b) => lines.push(`  - ${b}`));
    });
  });

  lines.push("", "KEY CLIENT ENGAGEMENTS (remote delivery, at Cognizant)");
  r.projects.forEach((p) => {
    lines.push(
      `- ${p.client}, ${p.location} – ${p.title} | Role: ${p.role} | Year(s): ${p.years} | Value: ${p.value}`,
    );
    lines.push(`  ${p.description}`);
  });

  r.highlights.forEach((h) => {
    lines.push("", h.title.toUpperCase());
    h.bullets.forEach((b) => lines.push(`- ${b}`));
  });

  lines.push("", "TECHNICAL SKILLS");
  r.technicalSkills.forEach((s) =>
    lines.push(`- ${s.category}: ${s.items.join(", ")}`),
  );

  lines.push("", "EDUCATION");
  r.education.forEach((e) =>
    lines.push(`- ${e.qualification}, ${e.institution} (${e.year})`),
  );
  lines.push(`Note: ${r.educationNote}`);

  lines.push("", "CERTIFICATIONS & PROFESSIONAL DEVELOPMENT");
  r.certifications.forEach((c) => lines.push(`- ${c}`));

  return lines.join("\n");
}

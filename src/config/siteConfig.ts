import { 
  ServiceItem, 
  PortfolioProject, 
  CaseStudy, 
  TestimonialItem, 
  TrustValuePoint 
} from '../types';

export const SITE_CONFIG = {
  brandName: 'Sammex Solution',
  founderName: 'Animashaun Abdul Salam',
  founderRole: 'Founder & Lead Digital Strategist',
  tagline: 'Modern digital solutions that help businesses grow online.',
  supportingMessage: 'Design. Develop. Optimize. Automate. Grow.',
  description: 'From professional WordPress websites, high-converting landing pages, and Shopify stores to SEO, GEO, website optimization, and AI automation, Sammex Solution helps businesses build a stronger, smarter, and more profitable online presence.',
  
  contact: {
    email: 'salamanimashaun05@gmail.com',
    whatsapp: '+2349167631413',
    whatsappClean: '2349167631413',
    linkedin: 'https://www.linkedin.com/in/sammexsolution/',
    formSubmitUrl: 'https://formsubmit.co/ajax/salamanimashaun05@gmail.com',
    defaultMessage: "Hi Sammex Solution, I found your website and I'm interested in your services. I would like to discuss a project.",
  },

  theme: {
    deepBlue: '#0A2A66',
    white: '#FFFFFF',
    black: '#000000',
    lightGray: '#F8FAFC',
  },

  quickStats: [
    { label: 'Client Satisfaction', value: '99%' },
    { label: 'Avg. PageSpeed Score', value: '98/100' },
    { label: 'Lead Conversion Lift', value: '+180%' },
    { label: 'Hours Saved via AI', value: '25hrs/wk' },
  ]
};

export function getWhatsAppUrl(customContext?: string): string {
  const baseGreeting = 'Hi Sammex Solution, ';
  const defaultBody = "I found your website and I'm interested in your services. I would like to discuss a project.";
  const message = customContext ? `${baseGreeting}${customContext}` : `${baseGreeting}${defaultBody}`;
  return `https://wa.me/${SITE_CONFIG.contact.whatsappClean}?text=${encodeURIComponent(message)}`;
}

export const TRUST_VALUES: TrustValuePoint[] = [
  {
    id: 'modern-responsive',
    title: 'Modern & Responsive',
    description: 'Pixel-perfect rendering across mobile, tablet, laptop, and ultra-wide screens with fluid layout design.',
    iconName: 'Smartphone'
  },
  {
    id: 'seo-ready',
    title: 'SEO Ready',
    description: 'Structured semantic data, metadata hierarchy, crawl-budget optimization, and high-velocity indexing architecture.',
    iconName: 'Search'
  },
  {
    id: 'geo-focused',
    title: 'GEO Focused',
    description: 'Generative Engine Optimization positioning your brand for citation in AI search engines like ChatGPT, Gemini, and Perplexity.',
    iconName: 'Cpu'
  },
  {
    id: 'ai-powered',
    title: 'AI-Powered Solutions',
    description: 'Autonomous workflows, custom n8n / Zapier integration, automated lead triage, and CRM sync.',
    iconName: 'Bot'
  },
  {
    id: 'conversion-focused',
    title: 'Conversion Focused',
    description: 'Psychology-driven UX, frictionless funnel design, targeted calls-to-action, and persuasive lead capture.',
    iconName: 'TrendingUp'
  },
  {
    id: 'mobile-optimized',
    title: 'Mobile Optimized',
    description: 'Designed mobile-first with 44px+ touch targets, instantaneous tap responsiveness, and zero layout shift.',
    iconName: 'Gauge'
  },
  {
    id: 'performance-focused',
    title: 'Performance Focused',
    description: 'Sub-second Core Web Vitals, asset minification, optimized rendering paths, and caching architectures.',
    iconName: 'Zap'
  },
  {
    id: 'business-driven',
    title: 'Business Driven',
    description: 'Every line of code and layout block is built around your bottom line, customer acquisition, and profitability.',
    iconName: 'Briefcase'
  },
  {
    id: 'custom-design',
    title: 'Custom Design',
    description: 'Bespoke aesthetic crafted specifically for your brand identity — no recycled low-effort template clones.',
    iconName: 'Palette'
  },
  {
    id: 'ongoing-support',
    title: 'Ongoing Support',
    description: 'Dedicated post-launch partnership, continuous security updates, speed audits, and proactive feature iterations.',
    iconName: 'ShieldCheck'
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'wordpress-development',
    category: 'wordpress',
    name: 'WordPress Website Design',
    shortTagline: 'Modern, responsive WordPress websites designed to turn visitors into customers.',
    description: 'Custom, high-performance WordPress website architecture built from the ground up for speed, reliability, and business growth. We do not build bloated, slow template sites; we build bespoke digital assets that give you full content control while loading in milliseconds.',
    keyBenefit: 'Turn casual visitors into paying customers with lightning-fast load times and custom design.',
    benefits: [
      'Sub-second page loading speeds adhering to Google Core Web Vitals',
      'Intuitive admin dashboard customized for effortless client content management',
      'Bulletproof security hardening to shield against vulnerabilities and malware',
      'Built with SEO and GEO structure from the very first line of code'
    ],
    deliverables: [
      'Custom WordPress Theme & Layout Architecture',
      'Mobile-first responsive interface across all screen breakpoints',
      'Custom Post Types & Fields tailored to your operational needs',
      'Speed optimization (caching, asset deferral, image compression)',
      'Security firewall setup & automated backup system',
      'Full administrative handover video walkthrough & documentation'
    ],
    suitableClients: [
      'Small and medium enterprises upgrading from legacy websites',
      'Service providers needing reliable client booking and lead capture',
      'Professional firms (consulting, legal, medical, corporate)',
      'Agencies seeking a white-label development partner'
    ],
    features: [
      'Business websites',
      'Landing pages',
      'Responsive websites',
      'Website redesign',
      'WordPress development',
      'Custom WordPress websites',
      'Website bug fixing',
      'Website speed optimization'
    ],
    iconName: 'Globe',
    badge: 'Core Specialty'
  },
  {
    id: 'landing-page-design',
    category: 'landing-page',
    name: 'Landing Page Design',
    shortTagline: 'High-converting landing pages engineered specifically for maximum return on ad spend.',
    description: 'Laser-focused landing pages crafted around human decision-making and conversion architecture. Whether launching a new offer, running paid ad campaigns on Meta or Google, or capturing high-intent leads, our pages remove friction and guide prospects to take immediate action.',
    keyBenefit: 'Directly lower your Customer Acquisition Cost (CAC) through tested, high-converting design psychology.',
    benefits: [
      'Elevated conversion rates compared to generic corporate pages',
      'Optimized information hierarchy with persuasive copy structuring',
      'Rapid deployment ready for ad spend launch dates',
      'Full integration with your analytics, tag manager, and CRM'
    ],
    deliverables: [
      'Custom visual design aligned with your campaign messaging',
      'Conversion-rate optimized hero, value proposition, and social proof sections',
      'Frictionless lead capture forms with instant notification routing',
      'A/B test-ready layout configuration',
      'FormSubmit / CRM webhook connectivity',
      'Speed-optimized code bundle for near-zero bounce rates'
    ],
    suitableClients: [
      'Paid media advertisers seeking higher ROAS on ad campaigns',
      'SaaS startups launching early access or beta waitlists',
      'Coaches, consultants, and course creators launching high-ticket offers',
      'Product brands running single-item promotional campaigns'
    ],
    features: [
      'High-converting landing pages',
      'Lead generation landing pages',
      'Product landing pages',
      'Service landing pages',
      'Responsive landing pages',
      'Conversion-focused design',
      'Funnel landing pages'
    ],
    iconName: 'Sparkles',
    badge: 'High Conversion'
  },
  {
    id: 'shopify-store-design',
    category: 'shopify',
    name: 'Shopify Store Design',
    shortTagline: 'E-commerce stores designed for effortless product discovery and high checkout completion.',
    description: 'Transform your retail vision into a sales powerhouse with custom Shopify store design. We optimize every touchpoint — from category navigation and product presentation to mobile checkout flow — ensuring your customers enjoy a seamless, secure shopping experience.',
    keyBenefit: 'Increase Average Order Value (AOV) and reduce cart abandonment with intuitive e-commerce UX.',
    benefits: [
      'Polished brand presence that outshines generic dropshipping templates',
      'Streamlined mobile checkout process designed for quick impulse purchases',
      'Strategic upsell and cross-sell integration points',
      'High-velocity catalog loading even with hundreds of SKUs'
    ],
    deliverables: [
      'Complete Shopify storefront design & Liquid theme customization',
      'High-converting product detail pages (PDP) with trust badges & rich media',
      'Custom collection filtering & predictive search implementation',
      'Payment gateway setup (Stripe, PayPal, local options) & shipping zones',
      'Essential e-commerce apps configuration (reviews, email capture, analytics)',
      'Store launch checklist & post-launch support'
    ],
    suitableClients: [
      'DTC brands launching new physical or digital product lines',
      'Retailers migrating from clunky platforms over to Shopify',
      'Established businesses requiring an aesthetic and conversion overhaul',
      'Boutique brands demanding custom aesthetics without sacrificing speed'
    ],
    features: [
      'Shopify store design',
      'Shopify store redesign',
      'E-commerce websites',
      'Product page optimization',
      'Mobile-friendly stores',
      'Conversion-focused Shopify design',
      'Store customization'
    ],
    iconName: 'ShoppingBag',
    badge: 'E-Commerce'
  },
  {
    id: 'seo-services',
    category: 'seo',
    name: 'SEO Services',
    shortTagline: 'Sustainable search engine rankings that drive qualified, high-intent traffic directly to you.',
    description: 'Search Engine Optimization built on genuine technical rigor, search intent matching, and Google best practices. We eliminate technical roadblocks, optimize on-page signals, and establish your domain authority so your ideal buyers find you before your competitors.',
    keyBenefit: 'Build an organic lead engine that continuously delivers compounding traffic without perpetual ad spend.',
    benefits: [
      'First-page organic rankings for commercial intent keywords',
      'Resolution of indexing crawl errors, redirect loops, and speed penalties',
      'Strengthened Google Business Profile for dominant local search visibility',
      'Transparent reporting highlighting tangible traffic and conversion growth'
    ],
    deliverables: [
      'Comprehensive technical SEO audit and remediation roadmap',
      'Keyword research targeting high-converting transactional queries',
      'On-page optimization (title tags, meta descriptions, H-tags, internal links)',
      'Schema markup implementation (Organization, LocalBusiness, FAQ, Product)',
      'Google Search Console & Google Analytics 4 integration',
      'Monthly search performance insights & keyword movement tracking'
    ],
    suitableClients: [
      'Local businesses aiming to dominate regional map pack & search queries',
      'B2B firms whose buyers research solutions via Google search',
      'Businesses suffering from unindexed pages or sudden traffic drops',
      'Websites that have never undergone technical SEO tuning'
    ],
    features: [
      'On-page SEO',
      'Technical SEO',
      'Keyword optimization',
      'Local SEO',
      'Google Business Profile optimization',
      'Search visibility improvement',
      'Website SEO audits',
      'Website optimization'
    ],
    iconName: 'Search',
    badge: 'Long-Term Growth'
  },
  {
    id: 'geo-services',
    category: 'geo',
    name: 'GEO Services (Generative Engine Optimization)',
    shortTagline: 'Position your brand to be cited and recommended inside modern AI search engines.',
    description: 'Search has fundamentally shifted. Prospective customers are asking ChatGPT, Google Gemini, Perplexity, and Microsoft Copilot for business recommendations. GEO is the next frontier of search visibility — structuring your content, brand authority, and digital footprint so generative AI engines recommend your business as the definitive answer.',
    keyBenefit: 'Future-proof your business by capturing customers who rely on conversational AI instead of traditional search.',
    benefits: [
      'Direct brand citations in generative AI responses and AI Overviews',
      'Entities-first semantic structuring that LLMs easily digest and trust',
      'Dominance in synthetic search summaries for industry queries',
      'Competitive moat established while traditional competitors lag behind'
    ],
    deliverables: [
      'Generative Engine Visibility Audit across ChatGPT, Gemini, and Perplexity',
      'Entity relationship mapping & knowledge graph optimization',
      'Conversational search content re-architecting',
      'Structured JSON-LD entity schemas for LLM ingestion',
      'Authority citation generation across high-weight AI training corpora',
      'Ongoing AI visibility tracking & prompt benchmark monitoring'
    ],
    suitableClients: [
      'Forward-thinking companies wanting early-mover advantage in AI search',
      'SaaS & technology firms where users research via Perplexity & ChatGPT',
      'Professional consultants looking to be cited as industry authorities',
      'Businesses seeing declining CTRs from traditional search snippets'
    ],
    features: [
      'Generative Engine Optimization',
      'AI search visibility optimization',
      'Content optimization for AI-powered search',
      'Brand visibility across generative search platforms',
      'Search presence optimization'
    ],
    iconName: 'Cpu',
    badge: 'Next-Gen Search'
  },
  {
    id: 'ai-automation',
    category: 'ai-automation',
    name: 'AI Automation & Workflows',
    shortTagline: 'Eliminate repetitive manual busywork with intelligent n8n, Zapier, and AI agent workflows.',
    description: 'Scale your business operations without bloating payroll. Sammex Solution designs custom workflow automations using n8n, Zapier, and custom API connections. From instant lead capture triage and auto-CRM sync to smart AI customer responders, we build systems that work 24/7.',
    keyBenefit: 'Reclaim 15 to 30 hours of manual operational work every week and guarantee zero missed leads.',
    benefits: [
      'Instant lead notification and automatic routing into your CRM pipeline',
      'Automated client onboarding sequences without human bottleneck',
      'Self-hosted or cloud n8n workflows that save thousands on SaaS subscription costs',
      'Intelligent AI agents that categorize inquiries and draft tailored replies'
    ],
    deliverables: [
      'Operational workflow mapping and automation blueprint',
      'Production n8n / Zapier scenario construction & testing',
      'Custom webhook & API connections between your site, CRM, and tools',
      'Automated email, WhatsApp, or Slack alert notifications for sales leads',
      'Error handling and retry logic to guarantee 100% workflow uptime',
      'Documentation and maintenance protocols'
    ],
    suitableClients: [
      'Busy founders drowning in manual data entry and lead management',
      'Growing agencies handling high volumes of inbound project inquiries',
      'E-commerce stores needing inventory, order, and customer sync',
      'Service businesses losing deals due to slow follow-up times'
    ],
    features: [
      'Workflow automation',
      'Business process automation',
      'AI-powered workflows',
      'Automation using tools such as n8n and Zapier',
      'Lead automation',
      'CRM workflow automation',
      'API integration',
      'AI agent automation'
    ],
    iconName: 'Bot',
    badge: 'Scale Efficiency'
  }
];

export const PORTFOLIO_DATA: PortfolioProject[] = [
  {
    id: 'apex-capital-web',
    title: 'Apex Capital Advisory',
    category: 'wordpress',
    categoryLabel: 'WordPress Website',
    industry: 'Financial Advisory & Wealth Management',
    description: 'Complete corporate redesign from a sluggish, outdated corporate site to a bespoke, ultra-fast WordPress platform with integrated client inquiry scheduling and secure investor document vaults.',
    servicesProvided: ['WordPress Architecture', 'Custom Theme Development', 'Speed Optimization', 'Technical SEO'],
    technologiesUsed: ['WordPress', 'PHP', 'Tailwind CSS', 'Alpine.js', 'Cloudflare Caching'],
    results: [
      { label: 'Mobile PageSpeed', value: '99/100' },
      { label: 'Inquiry Rate', value: '+140%' },
      { label: 'Load Time', value: '0.7s' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    mockupType: 'web',
    caseStudyId: 'apex-capital-study',
    featured: true
  },
  {
    id: 'lumina-saas-funnel',
    title: 'Lumina Cloud Analytics',
    category: 'landing-page',
    categoryLabel: 'Landing Page Design',
    industry: 'B2B Enterprise SaaS',
    description: 'High-converting interactive SaaS product landing page built to drive demo bookings for a predictive cloud monitoring platform. Engineered for clear value communication and zero-friction signup.',
    servicesProvided: ['Conversion Rate Optimization', 'UI/UX Design', 'Interactive Feature Showcase', 'Form Tracking'],
    technologiesUsed: ['React', 'Tailwind CSS', 'Motion', 'FormSubmit API', 'GA4 Events'],
    results: [
      { label: 'Demo Bookings', value: '+215%' },
      { label: 'Bounce Rate', value: '-38%' },
      { label: 'CAC Reduction', value: '29%' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    mockupType: 'dashboard',
    caseStudyId: 'lumina-saas-study',
    featured: true
  },
  {
    id: 'velour-botanicals-store',
    title: 'Velour Organic Botanicals',
    category: 'shopify',
    categoryLabel: 'Shopify Store Design',
    industry: 'DTC Skincare & Wellness',
    description: 'Conversion-engineered Shopify storefront for a premium clean-beauty brand. Built with custom bundle builders, subscription upsells, and mobile-optimized one-tap checkout.',
    servicesProvided: ['Shopify Liquid Customization', 'Mobile UX Design', 'Checkout Optimization', 'Speed Tuning'],
    technologiesUsed: ['Shopify', 'Liquid', 'JavaScript', 'Recharge API', 'Klaviyo'],
    results: [
      { label: 'Average Order Value', value: '+34%' },
      { label: 'Checkout Completion', value: '+48%' },
      { label: 'Mobile Revenue', value: '68% of Total' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
    mockupType: 'web',
    caseStudyId: 'velour-shopify-study',
    featured: true
  },
  {
    id: 'nexus-health-seo',
    title: 'Nexus Diagnostics & Specialty Clinics',
    category: 'seo',
    categoryLabel: 'SEO & GEO Campaign',
    industry: 'Healthcare & Regional Medical Clinics',
    description: 'Comprehensive technical SEO and Generative Engine Optimization overhaul for a regional clinical network. Fixed crawl errors, optimized schema entities, and claimed top AI search citations.',
    servicesProvided: ['Technical SEO Audit', 'GEO Strategy', 'Local Map Pack Optimization', 'Medical Schema Markup'],
    technologiesUsed: ['Google Search Console', 'Schema.org JSON-LD', 'Screaming Frog', 'Entity Graph'],
    results: [
      { label: 'Organic Patient Traffic', value: '+185%' },
      { label: 'AI Search Citations', value: '#1 in ChatGPT' },
      { label: 'Local Map Pack Rank', value: 'Top 3 (12 locations)' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80',
    mockupType: 'dashboard',
    caseStudyId: 'nexus-health-study',
    featured: true
  },
  {
    id: 'horizon-logistics-ai',
    title: 'Horizon Freight & Logistics Automation',
    category: 'ai-automation',
    categoryLabel: 'AI Automation & n8n',
    industry: 'Freight Forwarding & Supply Chain',
    description: 'Autonomous freight quote triage and customer dispatch pipeline. Connects email inboxes, WhatsApp API, and logistics CRM using self-hosted n8n workflows and AI document extraction.',
    servicesProvided: ['n8n Workflow Engineering', 'WhatsApp Business API', 'CRM Webhook Automation', 'AI Lead Qualification'],
    technologiesUsed: ['n8n', 'Node.js', 'WhatsApp Cloud API', 'Gemini AI API', 'PostgreSQL'],
    results: [
      { label: 'Lead Response Time', value: '< 90 seconds' },
      { label: 'Manual Admin Hours', value: '18 hrs/wk saved' },
      { label: 'Quote Accuracy', value: '99.4%' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    mockupType: 'workflow',
    caseStudyId: 'horizon-automation-study',
    featured: true
  },
  {
    id: 'kanso-architects-web',
    title: 'Kanso Architectural Studio',
    category: 'wordpress',
    categoryLabel: 'WordPress Portfolio & Redesign',
    industry: 'High-End Residential Architecture',
    description: 'Editorial-grade portfolio showcasing multi-million dollar residential developments. Combines smooth cinematic image galleries with razor-sharp typography and 98 PageSpeed rating.',
    servicesProvided: ['Custom WordPress Theme', 'Editorial Layout', 'High-Res Asset Compression', 'Mobile Showcase'],
    technologiesUsed: ['WordPress Headless-Ready', 'Modern CSS', 'WebP/AVIF Pipeline', 'Custom Gutenberg Blocks'],
    results: [
      { label: 'Client Inquiries', value: '+85%' },
      { label: 'Session Duration', value: '3m 45s' },
      { label: 'Page Weight', value: '850kb total' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    mockupType: 'web',
    featured: false
  }
];

export const CASE_STUDIES_DATA: CaseStudy[] = [
  {
    id: 'apex-capital-study',
    projectId: 'apex-capital-web',
    title: 'Transforming a Legacy Advisory Website into a Sub-Second Lead Generating Powerhouse',
    client: 'Apex Capital Advisory',
    industry: 'Financial Advisory',
    duration: '4 Weeks',
    challenge: 'Apex Capital had a 7-year-old WordPress website suffering from severe plugin bloat, taking over 6.2 seconds to load on mobile devices. Wealthy prospects were bouncing before reading their credentials, and their contact form received frequent spam without properly notifying partners.',
    strategy: 'We stripped away the clunky commercial page builders and engineered a custom, clean WordPress architecture tailored specifically to their client acquisition journey. We paired high-contrast typography with clear trust credentials, secure document portals, and friction-free inquiry scheduling.',
    designProcess: 'Created a bespoke design language blending deep navy corporate authority with restrained gold accents. Every visual was optimized to reassure high-net-worth investors of Apex Capital stability and discretion.',
    development: 'Built custom WordPress blocks with clean semantic markup, eliminated 22 unnecessary plugins, implemented Cloudflare Edge caching, and configured advanced security firewalls.',
    seoAndOptimization: 'Restructured their service pages for high-value transactional queries (wealth management, estate planning), added FinancialService structured schema, and achieved a 99/100 mobile Google PageSpeed score.',
    results: [
      { metric: 'Page Load Speed', change: '6.2s -> 0.7s', description: 'Immediate 88% reduction in initial render time across mobile networks' },
      { metric: 'Qualified Leads', change: '+140%', description: 'Monthly consultations booked from high-net-worth business owners' },
      { metric: 'Bounce Rate', change: '64% -> 27%', description: 'Prospects spend an average of 4+ minutes exploring advisory credentials' }
    ],
    technologies: ['WordPress', 'PHP 8.2', 'Tailwind CSS', 'Cloudflare', 'Schema JSON-LD'],
    testimonialSnippet: 'Animashaun and the Sammex Solution team delivered a digital platform that truly reflects the caliber of our firm. The speed and quality are unmatched.'
  },
  {
    id: 'lumina-saas-study',
    projectId: 'lumina-saas-funnel',
    title: 'Engineering a 215% Demo Booking Increase for B2B Cloud Infrastructure SaaS',
    client: 'Lumina Cloud Analytics',
    industry: 'B2B Software',
    duration: '3 Weeks',
    challenge: 'Lumina was spending over $12,000 monthly on LinkedIn and Google Ads, but their generic landing page converted less than 1.8% of visitors into demo requests. Prospective CTOs found their technical value proposition confusing and cluttered.',
    strategy: 'We executed a complete conversion audit and redesigned their landing page from scratch. We replaced abstract marketing jargon with an interactive live telemetry demonstration, clear quantifiable ROI badges, and a streamlined 2-step demo scheduler.',
    designProcess: 'Designed an interactive UI demo mimicking their actual software dashboard, allowing prospective buyers to visually preview the software capabilities before even filling out the form.',
    development: 'Built with React and modern lightweight CSS animations to ensure 60fps interactivity without burdening device CPUs. Hooked up real-time analytics events to measure form abandonment at every keystroke.',
    seoAndOptimization: 'Implemented instant pre-rendering and asset inlining, achieving 100/100 performance and eliminating bounce rates on slow mobile connections.',
    results: [
      { metric: 'Demo Conversion Rate', change: '1.8% -> 5.7%', description: 'More than tripled the number of qualified product demos from the same ad spend' },
      { metric: 'CAC Reduction', change: '-29%', description: 'Drastically lowered cost to acquire an enterprise sales opportunity' },
      { metric: 'Form Abandonment', change: '-45%', description: 'Friction-free 2-step scheduler accelerated qualification' }
    ],
    technologies: ['React', 'Motion', 'Tailwind CSS', 'FormSubmit API', 'GA4 / Tag Manager'],
    testimonialSnippet: 'Sammex Solution does not just build pages; they understand conversion mathematics. Our pipeline grew substantially within 14 days of launch.'
  },
  {
    id: 'nexus-health-study',
    projectId: 'nexus-health-seo',
    title: 'Dominating Local Search and Generative AI Citations for Multi-Location Medical Clinics',
    client: 'Nexus Diagnostics & Specialty Clinics',
    industry: 'Healthcare Diagnostics',
    duration: '6 Weeks',
    challenge: 'Nexus Diagnostics operated 12 clinic branches but was invisible in local search results and AI assistant inquiries. Patients seeking urgent diagnostic scans were being routed to hospital conglomerates, leaving Nexus appointment books 40% empty.',
    strategy: 'We implemented a dual-engine search dominance strategy: dominating traditional Google Local Map Packs while deploying Generative Engine Optimization (GEO) so AI engines like ChatGPT and Gemini specifically recommend Nexus for regional medical scans.',
    designProcess: 'Created dedicated location landing pages with clear booking CTAs, doctor bios, accepted insurance lists, and Google Maps integrations.',
    development: 'Engineered clean nested Schema.org medical markup (DiagnosticLab, MedicalClinic, MedicalSpecialty) establishing clear entity links across medical registries.',
    seoAndOptimization: 'Optimized local citations, resolved 140+ broken internal redirects, and structured their medical knowledge base into conversational Q&A snippets tailored for LLM training and retrieval.',
    results: [
      { metric: 'Organic Clinic Inquiries', change: '+185%', description: 'Consistent monthly patient bookings originating directly from organic search' },
      { metric: 'Generative AI Citations', change: '#1 Recommended', description: 'Recommended by ChatGPT & Gemini when users ask for regional private diagnostic clinics' },
      { metric: 'Map Pack Visibility', change: 'Top 3 for 92% of target zip codes', description: 'Dominant local visibility for high-intent medical queries' }
    ],
    technologies: ['Technical SEO', 'Schema.org JSON-LD', 'Google Search Console', 'Entity Graphs'],
    testimonialSnippet: 'Our phones started ringing consistently. The GEO visibility work was an absolute game-changer before our competitors even knew what it was.'
  },
  {
    id: 'horizon-automation-study',
    projectId: 'horizon-logistics-ai',
    title: 'Saving 18 Operational Hours Weekly with Automated Freight Inbound & WhatsApp Routing',
    client: 'Horizon Freight & Logistics',
    industry: 'Freight Forwarding',
    duration: '3 Weeks',
    challenge: 'Horizon received over 80 freight quote requests daily across email, website forms, and WhatsApp. Dispatchers manually spent 3 to 4 hours every morning copy-pasting shipment details into spreadsheets and calculating rate estimates, leading to 6-hour delay times and lost deals.',
    strategy: 'We built a self-hosted, resilient n8n workflow engine connected to their website, WhatsApp Cloud API, and CRM. The system extracts shipment weights, pickup locations, and deadlines, calculates instant preliminary rate estimates, and notifies on-duty dispatchers instantly via priority WhatsApp alerts.',
    designProcess: 'Created intuitive quote submission interfaces on their website with instant calculation previews, encouraging customers to submit complete data.',
    development: 'Configured self-hosted n8n workflows with fallback retry queues, webhook listeners, PostgreSQL audit logs, and Gemini AI for unstructured email parsing.',
    seoAndOptimization: 'Ensured instantaneous webhook round-trips under 500ms, giving prospective shippers immediate feedback.',
    results: [
      { metric: 'Lead Response Time', change: '6 hrs -> < 90 secs', description: 'Instant preliminary quote delivered while the shipper is still actively browsing' },
      { metric: 'Operational Time Saved', change: '18 hrs/week', description: 'Eliminated manual copy-paste data entry for the operations team' },
      { metric: 'Close Rate on Inquiries', change: '+38%', description: 'First-to-quote advantage captured high-value commercial freight contracts' }
    ],
    technologies: ['n8n', 'WhatsApp Cloud API', 'Gemini AI API', 'Node.js', 'PostgreSQL'],
    testimonialSnippet: 'The automation Sammex Solution built has revolutionized our daily operations. It runs tirelessly in the background and pays for itself every week.'
  }
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 'test-1',
    clientName: 'Marcus Vance',
    clientTitle: 'Managing Director',
    company: 'Apex Capital Advisory',
    initials: 'MV',
    testimonial: 'Animashaun and Sammex Solution transformed our corporate website into our most productive client acquisition channel. The site loads instantaneously, the design exudes trust, and our mobile inquiries rose by over 140%. Their technical standards are exceptional.',
    service: 'WordPress Development & Speed Optimization',
    rating: 5,
    projectResult: '+140% Qualified Inquiries'
  },
  {
    id: 'test-2',
    clientName: 'Elena Rostova',
    clientTitle: 'Head of Growth',
    company: 'Lumina Cloud SaaS',
    initials: 'ER',
    testimonial: 'Finding a development partner who genuinely understands conversion psychology and technical execution is rare. Sammex Solution delivered a landing page that tripled our demo bookings within weeks of launch. Highly recommended.',
    service: 'Conversion Landing Page Design',
    rating: 5,
    projectResult: '215% Demo Booking Increase'
  },
  {
    id: 'test-3',
    clientName: 'Dr. Tariq Al-Mansoor',
    clientTitle: 'Clinical Operations Director',
    company: 'Nexus Diagnostic Clinics',
    initials: 'TA',
    testimonial: 'The combination of technical SEO and Generative Engine Optimization (GEO) has given our 12 regional clinics a massive advantage. We rank in the top 3 on Google Maps, and AI assistants like ChatGPT consistently recommend our services.',
    service: 'SEO & Generative Engine Optimization (GEO)',
    rating: 5,
    projectResult: '+185% Patient Inquiries'
  },
  {
    id: 'test-4',
    clientName: 'David Olanrewaju',
    clientTitle: 'Chief Operating Officer',
    company: 'Horizon Freight Solutions',
    initials: 'DO',
    testimonial: 'The n8n automation and WhatsApp lead pipeline built by Animashaun saved our dispatch team over 18 hours of repetitive administrative work every single week. Leads are quoted in under 90 seconds. A true game changer.',
    service: 'AI Workflow Automation (n8n & WhatsApp)',
    rating: 5,
    projectResult: '18 Hours/Week Saved'
  }
];

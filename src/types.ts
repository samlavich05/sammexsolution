export type ServiceCategory = 
  | 'wordpress'
  | 'landing-page'
  | 'shopify'
  | 'seo'
  | 'geo'
  | 'ai-automation';

export interface ServiceItem {
  id: string;
  category: ServiceCategory;
  name: string;
  shortTagline: string;
  description: string;
  keyBenefit: string;
  benefits: string[];
  deliverables: string[];
  suitableClients: string[];
  features: string[];
  iconName: string;
  badge?: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: 'wordpress' | 'landing-page' | 'shopify' | 'seo' | 'ai-automation';
  categoryLabel: string;
  industry: string;
  description: string;
  servicesProvided: string[];
  technologiesUsed: string[];
  results: {
    label: string;
    value: string;
  }[];
  imageUrl: string;
  mockupType: 'web' | 'mobile' | 'dashboard' | 'workflow';
  liveUrl?: string;
  caseStudyId?: string;
  featured?: boolean;
}

export interface CaseStudy {
  id: string;
  projectId: string;
  title: string;
  client: string;
  industry: string;
  challenge: string;
  strategy: string;
  designProcess: string;
  development: string;
  seoAndOptimization: string;
  results: {
    metric: string;
    change: string;
    description: string;
  }[];
  technologies: string[];
  duration: string;
  testimonialSnippet?: string;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  clientTitle: string;
  company: string;
  avatarUrl?: string;
  initials: string;
  testimonial: string;
  service: string;
  rating: number;
  projectResult: string;
}

export interface TrustValuePoint {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface ContactSubmission {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  website?: string;
  serviceRequired: string;
  budgetRange: string;
  projectDescription: string;
  preferredContactMethod: 'Email' | 'WhatsApp' | 'Phone Call';
  createdAt: string;
  status: 'new' | 'contacted' | 'in-progress' | 'closed';
  notes?: string;
}

export type InquirySubmission = ContactSubmission;

export interface ClientProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  company: string;
  businessType: string;
  website: string;
  location: string;
  avatarUrl?: string;
  servicesInterestedIn: string[];
  projectNotes: string;
  communicationPreferences?: 'Email' | 'WhatsApp' | 'Both';
  preferredCommunication?: string;
  role: 'client' | 'admin';
  createdAt: string;
}

export interface TransactionRecord {
  id: string;
  clientId: string;
  clientName?: string;
  serviceRequested?: string;
  serviceName?: string;
  projectStatus: 'Planning' | 'In Development' | 'QA & Testing' | 'Live' | 'Ongoing Optimization' | 'In Progress' | 'Completed';
  paymentStatus: 'Paid' | 'Partial (Deposit)' | 'Partial' | 'Invoiced' | 'Pending';
  date: string;
  amount: number;
  currency?: string;
  referenceId?: string;
  orderReference?: string;
  notes: string;
}

export interface ClientActivity {
  id: string;
  clientId: string;
  clientName: string;
  actionType: 
    | 'account_created'
    | 'login'
    | 'logout'
    | 'page_visited'
    | 'service_viewed'
    | 'portfolio_viewed'
    | 'contact_submission'
    | 'quote_requested'
    | 'whatsapp_click'
    | 'saved_project'
    | 'profile_updated';
  description: string;
  metadata?: Record<string, string | number>;
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  actionSuggestions?: {
    label: string;
    action: 'quote' | 'whatsapp' | 'service' | 'portfolio';
    payload?: string;
  }[];
}

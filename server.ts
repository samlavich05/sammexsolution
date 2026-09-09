import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Always serve static assets directly from public/ directory
app.use(express.static(path.join(process.cwd(), 'public')));

// Lazy Google GenAI initialization
function getAiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
}

// In-Memory Data Store (Initialized with realistic initial records)
interface StoredClient {
  id: string;
  fullName: string;
  email: string;
  password?: string;
  phone: string;
  company: string;
  businessType: string;
  website: string;
  location: string;
  avatarUrl?: string;
  servicesInterestedIn: string[];
  projectNotes: string;
  communicationPreferences: 'Email' | 'WhatsApp' | 'Both';
  role: 'client' | 'admin';
  createdAt: string;
}

interface StoredTransaction {
  id: string;
  clientId: string;
  clientName: string;
  serviceRequested: string;
  projectStatus: 'Planning' | 'In Development' | 'QA & Testing' | 'Live' | 'Ongoing Optimization';
  paymentStatus: 'Paid' | 'Partial (Deposit)' | 'Invoiced' | 'Pending';
  date: string;
  amount: number;
  currency: string;
  referenceId: string;
  notes: string;
}

interface StoredInquiry {
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

interface StoredActivity {
  id: string;
  clientId: string;
  clientName: string;
  actionType: string;
  description: string;
  metadata?: Record<string, any>;
  timestamp: string;
}

const clients: StoredClient[] = [
  {
    id: 'client-admin',
    fullName: 'Animashaun Abdul Salam',
    email: 'salamanimashaun05@gmail.com',
    password: 'password123',
    phone: '+2349167631413',
    company: 'Sammex Solution',
    businessType: 'Digital Agency & Web Development',
    website: 'https://sammexsolution.com',
    location: 'Lagos / Global',
    servicesInterestedIn: ['WordPress Website Design', 'SEO Services', 'AI Automation', 'GEO Services'],
    projectNotes: 'Founder & Lead Strategist at Sammex Solution.',
    communicationPreferences: 'Both',
    role: 'admin',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).toISOString(),
  },
  {
    id: 'client-admin-alias',
    fullName: 'Animashaun Abdul Salam (Admin)',
    email: 'admin@sammexsolution.com',
    password: 'password123',
    phone: '+2349167631413',
    company: 'Sammex Solution',
    businessType: 'Digital Agency & Web Development',
    website: 'https://sammexsolution.com',
    location: 'Lagos / Global',
    servicesInterestedIn: ['WordPress Website Design', 'SEO Services', 'AI Automation', 'GEO Services'],
    projectNotes: 'Administrator Demo Account.',
    communicationPreferences: 'Both',
    role: 'admin',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).toISOString(),
  },
  {
    id: 'client-sarah',
    fullName: 'Dr. Sarah Jenkins',
    email: 'sarah@luminahealth.com',
    password: 'password123',
    phone: '+1 (415) 890-4421',
    company: 'Lumina Health Clinic',
    businessType: 'Private Medical Care',
    website: 'https://luminahealthclinic.com',
    location: 'San Francisco, CA',
    servicesInterestedIn: ['WordPress Website Design', 'SEO & GEO'],
    projectNotes: 'Requires high-velocity local map pack ranking and Generative Engine Optimization.',
    communicationPreferences: 'Email',
    role: 'client',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(),
  },
  {
    id: 'client-sarah-nexus',
    fullName: 'Sarah Jenkins',
    email: 'sarah.jenkins@nexushealth.org',
    password: 'password123',
    phone: '+1 (555) 389-9210',
    company: 'Nexus Health Clinics',
    businessType: 'Healthcare & Clinical Diagnostics',
    website: 'https://nexushealth.org',
    location: 'Austin, TX',
    servicesInterestedIn: ['SEO Services', 'GEO Services', 'WordPress Website Design'],
    projectNotes: 'Requires high-velocity local map pack ranking and Generative Engine Optimization for 12 clinic branches.',
    communicationPreferences: 'Email',
    role: 'client',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(),
  },
  {
    id: 'client-marcus',
    fullName: 'Marcus Vance',
    email: 'marcus.v@apexadvisory.com',
    password: 'password123',
    phone: '+44 20 7946 0912',
    company: 'Apex Capital Advisory',
    businessType: 'Financial Wealth Advisory',
    website: 'https://apexadvisory.com',
    location: 'London, UK',
    servicesInterestedIn: ['WordPress Website Design', 'SEO Services'],
    projectNotes: 'Corporate site redesign with sub-second page load times and investor inquiry scheduler.',
    communicationPreferences: 'WhatsApp',
    role: 'client',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 28).toISOString(),
  }
];

const transactions: StoredTransaction[] = [
  {
    id: 'txn-101',
    clientId: 'client-sarah',
    clientName: 'Sarah Jenkins (Nexus Health)',
    serviceRequested: 'GEO & Local SEO Optimization Overhaul',
    projectStatus: 'Live',
    paymentStatus: 'Paid',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toLocaleDateString(),
    amount: 3450,
    currency: 'USD',
    referenceId: 'SMX-2026-NEXUS-01',
    notes: 'Local Map Pack #1 rank achieved; Schema entity graph deployed for ChatGPT & Gemini discovery.'
  },
  {
    id: 'txn-102',
    clientId: 'client-marcus',
    clientName: 'Marcus Vance (Apex Capital)',
    serviceRequested: 'Custom WordPress Redesign & Speed Optimization',
    projectStatus: 'Ongoing Optimization',
    paymentStatus: 'Paid',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 18).toLocaleDateString(),
    amount: 4800,
    currency: 'USD',
    referenceId: 'SMX-2026-APEX-03',
    notes: 'Mobile Core Web Vitals score 99/100, page weight reduced by 72%.'
  },
  {
    id: 'txn-103',
    clientId: 'client-sarah',
    clientName: 'Sarah Jenkins (Nexus Health)',
    serviceRequested: 'AI Automated Patient Intake & WhatsApp Triage',
    projectStatus: 'In Development',
    paymentStatus: 'Partial (Deposit)',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toLocaleDateString(),
    amount: 2200,
    currency: 'USD',
    referenceId: 'SMX-2026-NEXUS-02',
    notes: 'n8n workflow blueprint drafted; WhatsApp Business Cloud API integration underway.'
  }
];

const inquiries: StoredInquiry[] = [
  {
    id: 'inq-01',
    fullName: 'Elena Rostova',
    email: 'elena@luminasaas.io',
    phone: '+1 415 890 2234',
    company: 'Lumina Cloud Analytics',
    website: 'https://luminasaas.io',
    serviceRequired: 'Landing Page Design',
    budgetRange: '$2,500 - $5,000',
    projectDescription: 'We are seeking a high-converting landing page to boost our demo bookings from Google & LinkedIn ads.',
    preferredContactMethod: 'Email',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
    status: 'in-progress',
    notes: 'Provided wireframe preview and booked discovery call.'
  },
  {
    id: 'inq-02',
    fullName: 'Tariq Al-Mansoor',
    email: 'tariq@velourbotanicals.com',
    phone: '+971 50 123 4567',
    company: 'Velour Organic Botanicals',
    website: 'https://velourbotanicals.com',
    serviceRequired: 'Shopify Store Design',
    budgetRange: '$3,000 - $7,000',
    projectDescription: 'Need a conversion-focused redesign of our Shopify store with custom bundle builder and quick-checkout.',
    preferredContactMethod: 'WhatsApp',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    status: 'new',
    notes: 'Interested in AOV optimization and mobile checkout.'
  }
];

const activities: StoredActivity[] = [
  {
    id: 'act-1',
    clientId: 'client-sarah',
    clientName: 'Sarah Jenkins',
    actionType: 'login',
    description: 'Logged into Sammex Client Portal',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString()
  },
  {
    id: 'act-2',
    clientId: 'client-sarah',
    clientName: 'Sarah Jenkins',
    actionType: 'service_viewed',
    description: 'Viewed AI Automation & Workflow Services',
    metadata: { service: 'AI Automation' },
    timestamp: new Date(Date.now() - 1000 * 60 * 28).toISOString()
  },
  {
    id: 'act-3',
    clientId: 'client-marcus',
    clientName: 'Marcus Vance',
    actionType: 'whatsapp_click',
    description: 'Initiated WhatsApp conversation with Animashaun Abdul Salam',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString()
  },
  {
    id: 'act-4',
    clientId: 'visitor-anon',
    clientName: 'Prospect Elena Rostova',
    actionType: 'quote_requested',
    description: 'Submitted Quote Request for Landing Page Design',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString()
  }
];

// ---------------- API ROUTES ----------------

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    brand: 'Sammex Solution',
    founder: 'Animashaun Abdul Salam',
    time: new Date().toISOString() 
  });
});

// AI Chatbot endpoint using Gemini 3.8 Flash
app.post('/api/chat', async (req, res) => {
  try {
    const { message, conversationHistory } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const ai = getAiClient();
    if (!ai) {
      // Graceful fallback if GEMINI_API_KEY is not configured yet
      return res.json({
        reply: "Hello! I am the Sammex Solution virtual assistant. We specialize in WordPress Website Development, SEO, GEO (Generative Engine Optimization), Landing Pages, Shopify, and AI Workflow Automation (n8n/Zapier). To discuss your project directly with founder Animashaun Abdul Salam, feel free to use our 'Get a Quote' form or reach out on WhatsApp at +2349167631413.",
        actionSuggestions: [
          { label: 'Request a Quote', action: 'quote' },
          { label: 'Chat on WhatsApp', action: 'whatsapp' },
          { label: 'View Portfolio', action: 'portfolio' }
        ]
      });
    }

    const systemInstruction = `You are the official AI Business Consultant & Project Assistant for Sammex Solution, founded by Animashaun Abdul Salam.

About Sammex Solution:
- Brand Name: Sammex Solution
- Founder: Animashaun Abdul Salam (Founder & Lead Digital Strategist)
- Brand Positioning: "Modern digital solutions that help businesses grow online."
- Supporting Message: "Design. Develop. Optimize. Automate. Grow."
- Core Services:
  1. WordPress Website Design & Development: Sub-second load speeds, 99/100 Core Web Vitals, custom theme architecture, responsive, bug fixing, speed optimization.
  2. Landing Page Design: High-converting, direct response, CRO-tested, built to lower Customer Acquisition Cost (CAC).
  3. Shopify Store Design: Conversion-focused, custom Liquid theme, mobile checkout optimization, higher AOV.
  4. SEO Services: Technical SEO, crawl audits, on-page optimization, local Google Map Pack rankings.
  5. GEO Services (Generative Engine Optimization): Optimizing content and entity graphs so AI models (ChatGPT, Gemini, Perplexity) cite and recommend the client's business.
  6. AI Automation: n8n, Zapier, custom API integration, WhatsApp lead routing, automated CRM sync, customer support agents.
- Contact: Email: salamanimashaun05@gmail.com | WhatsApp: +2349167631413 | LinkedIn: https://www.linkedin.com/in/sammexsolution/

Your Goals:
1. Answer visitor questions clearly, concisely, and professionally.
2. Help potential clients choose the right digital solution for their goals.
3. Intelligently qualify leads by asking natural questions (e.g., What type of business do you run? What are you looking to build or improve? What is your timeline/budget?). Do not interrogate; keep it conversational.
4. Encourage visitors to request a quote or connect on WhatsApp (+2349167631413) with founder Animashaun Abdul Salam.
5. NEVER invent unrealistic guarantees, false pricing tables, or fake certifications. When pricing depends on scope, give realistic typical ranges ($1,500 - $7,000+ depending on requirements) and guide them to request an exact tailored quote.`;

    const contents: any[] = [];
    if (Array.isArray(conversationHistory)) {
      for (const msg of conversationHistory.slice(-6)) {
        contents.push({
          role: msg.sender === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.text }]
        });
      }
    }
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents,
      config: {
        systemInstruction,
        temperature: 0.7,
        maxOutputTokens: 600,
      }
    });

    const replyText = response.text || "I'd be glad to help you with that! At Sammex Solution, we build modern websites, SEO/GEO strategies, and AI automations. Would you like to discuss a project or receive a custom quote?";

    // Generate contextual action suggestions
    const actionSuggestions = [];
    const lowerReply = replyText.toLowerCase();
    if (lowerReply.includes('quote') || lowerReply.includes('estimate') || lowerReply.includes('project')) {
      actionSuggestions.push({ label: 'Request a Quote', action: 'quote' });
    }
    actionSuggestions.push({ label: 'Chat on WhatsApp', action: 'whatsapp' });
    if (lowerReply.includes('portfolio') || lowerReply.includes('example') || lowerReply.includes('work')) {
      actionSuggestions.push({ label: 'Explore Projects', action: 'portfolio' });
    }

    res.json({
      reply: replyText,
      actionSuggestions: actionSuggestions.length > 0 ? actionSuggestions : undefined
    });
  } catch (error: any) {
    console.error('Chatbot API error:', error);
    res.json({
      reply: "Thank you for reaching out to Sammex Solution! We specialize in WordPress websites, SEO, GEO, and AI automation. You can request a custom quote right here or reach out directly to founder Animashaun Abdul Salam via WhatsApp at +2349167631413.",
      actionSuggestions: [
        { label: 'Request a Quote', action: 'quote' },
        { label: 'Chat on WhatsApp', action: 'whatsapp' }
      ]
    });
  }
});

// Submit Contact Form / Quote Request
app.post('/api/inquiries', async (req, res) => {
  try {
    const { 
      fullName, 
      email, 
      phone, 
      company, 
      website, 
      serviceRequired, 
      budgetRange, 
      projectDescription, 
      preferredContactMethod 
    } = req.body;

    if (!fullName || !email || !serviceRequired || !projectDescription) {
      return res.status(400).json({ error: 'Please provide all required fields (Name, Email, Service, Description)' });
    }

    const newInquiry: StoredInquiry = {
      id: 'inq-' + Date.now(),
      fullName: String(fullName).trim(),
      email: String(email).trim().toLowerCase(),
      phone: String(phone || '').trim(),
      company: String(company || '').trim(),
      website: String(website || '').trim(),
      serviceRequired: String(serviceRequired),
      budgetRange: String(budgetRange || 'Not specified'),
      projectDescription: String(projectDescription).trim(),
      preferredContactMethod: preferredContactMethod || 'WhatsApp',
      createdAt: new Date().toISOString(),
      status: 'new'
    };

    inquiries.unshift(newInquiry);

    // Track activity
    activities.unshift({
      id: 'act-' + Date.now(),
      clientId: email,
      clientName: fullName,
      actionType: 'quote_requested',
      description: `New project inquiry received for ${serviceRequired} (${budgetRange || 'custom budget'})`,
      metadata: { service: serviceRequired, budget: budgetRange },
      timestamp: new Date().toISOString()
    });

    // Asynchronously forward to FormSubmit so Animashaun receives it via email (salamanimashaun05@gmail.com)
    try {
      fetch('https://formsubmit.co/ajax/salamanimashaun05@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `New Lead for Sammex Solution: ${fullName} (${serviceRequired})`,
          name: fullName,
          email: email,
          phone: phone,
          company: company,
          website: website,
          service: serviceRequired,
          budget: budgetRange,
          preferred_contact: preferredContactMethod,
          description: projectDescription,
          _captcha: 'false'
        })
      }).catch(err => console.log('FormSubmit background notification attempt completed'));
    } catch (e) {
      // Non-blocking
    }

    res.status(201).json({
      success: true,
      message: 'Inquiry received successfully! Our team will contact you promptly.',
      inquiry: newInquiry
    });
  } catch (error: any) {
    console.error('Error submitting inquiry:', error);
    res.status(500).json({ error: 'Failed to process inquiry. Please contact us on WhatsApp.' });
  }
});

// Get Inquiries (for Admin / Client Portal)
app.get('/api/inquiries', (req, res) => {
  const { email } = req.query;
  let result = inquiries;
  if (email && typeof email === 'string') {
    result = inquiries.filter(inq => inq.email.toLowerCase() === email.toLowerCase());
  }
  res.json({ success: true, inquiries: result });
});

// Update Inquiry Status (Admin) - support both /api/inquiries/:id and /api/inquiries/:id/status
const updateInquiryHandler = (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const { status, notes } = req.body;
  const inquiry = inquiries.find(inq => inq.id === id);
  if (!inquiry) {
    return res.status(404).json({ error: 'Inquiry not found' });
  }

  if (status) inquiry.status = status;
  if (notes !== undefined) inquiry.notes = notes;

  res.json({ success: true, inquiry });
};

app.patch('/api/inquiries/:id', updateInquiryHandler);
app.patch('/api/inquiries/:id/status', updateInquiryHandler);

// Client Registration / Account Creation
app.post('/api/auth/signup', (req, res) => {
  try {
    const { email, password, fullName, company, phone, businessType, servicesInterestedIn } = req.body;

    if (!email || typeof email !== 'string' || !email.trim()) {
      return res.status(400).json({ error: 'Valid email address is required' });
    }
    if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
      return res.status(400).json({ error: 'Full name is required' });
    }
    if (!password || typeof password !== 'string' || password.length < 3) {
      return res.status(400).json({ error: 'Password must be at least 3 characters' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = fullName.trim();
    const cleanCompany = String(company || '').trim();
    const cleanPhone = String(phone || '').trim();

    // Check if client with this email already exists
    let existingClient = clients.find(c => c.email.toLowerCase() === cleanEmail);
    if (existingClient) {
      // Update with any newly provided details and log them in
      if (cleanCompany) existingClient.company = cleanCompany;
      if (cleanPhone) existingClient.phone = cleanPhone;
      if (cleanName) existingClient.fullName = cleanName;
      existingClient.password = password;

      activities.unshift({
        id: 'act-' + Date.now(),
        clientId: existingClient.id,
        clientName: existingClient.fullName,
        actionType: 'login',
        description: `Existing client logged in via registration (${existingClient.email})`,
        timestamp: new Date().toISOString()
      });

      return res.status(200).json({
        success: true,
        message: 'Account recognized. Logged in successfully.',
        user: existingClient
      });
    }

    // Role assignment: founder email or admin aliases get admin role
    const isAdmin = cleanEmail === 'salamanimashaun05@gmail.com' || cleanEmail === 'admin@sammexsolution.com';

    const newClient: StoredClient = {
      id: 'client-' + Date.now(),
      fullName: cleanName,
      email: cleanEmail,
      password: String(password),
      phone: cleanPhone,
      company: cleanCompany || 'Client Business',
      businessType: businessType || 'Growing Business',
      website: '',
      location: '',
      servicesInterestedIn: Array.isArray(servicesInterestedIn) && servicesInterestedIn.length > 0
        ? servicesInterestedIn
        : ['WordPress Website Design', 'SEO Services'],
      projectNotes: 'Account registered through Sammex Client Portal.',
      communicationPreferences: 'Both',
      role: isAdmin ? 'admin' : 'client',
      createdAt: new Date().toISOString()
    };

    clients.unshift(newClient);

    // Initial Welcome Milestone / Onboarding Project in Client Ledger
    transactions.unshift({
      id: 'txn-' + Date.now(),
      clientId: newClient.id,
      clientName: newClient.fullName + (newClient.company ? ` (${newClient.company})` : ''),
      serviceRequested: 'Onboarding & Project Discovery Consultation',
      projectStatus: 'Planning',
      paymentStatus: 'Pending',
      date: new Date().toLocaleDateString(),
      amount: 0,
      currency: 'USD',
      referenceId: `SMX-${Date.now().toString().slice(-6)}`,
      notes: 'Welcome to Sammex Solution! Connect with Animashaun Abdul Salam via WhatsApp (+2349167631413) to start your project.'
    });

    // Record activity
    activities.unshift({
      id: 'act-' + Date.now(),
      clientId: newClient.id,
      clientName: newClient.fullName,
      actionType: 'account_created',
      description: `New client account registered: ${newClient.fullName} (${newClient.company || 'Direct'})`,
      timestamp: new Date().toISOString()
    });

    return res.status(201).json({
      success: true,
      message: 'Account created successfully!',
      user: newClient
    });
  } catch (err: any) {
    console.error('Error during signup:', err);
    return res.status(500).json({ error: 'Server error processing registration. Please try again.' });
  }
});

// Client Authentication / Quick Demo Switch
app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const cleanEmail = String(email).trim().toLowerCase();
    let client = clients.find(c => c.email.toLowerCase() === cleanEmail);

    // Support Admin aliases
    if (cleanEmail === 'admin@sammexsolution.com' || cleanEmail === 'salamanimashaun05@gmail.com') {
      client = clients.find(c => c.role === 'admin') || client;
    } else if (cleanEmail === 'sarah@luminahealth.com' || cleanEmail === 'sarah.jenkins@nexushealth.org') {
      client = clients.find(c => c.email.includes('sarah')) || client;
    }

    if (!client) {
      // Auto-create client profile so client is never blocked
      const autoFullName = cleanEmail.split('@')[0].replace(/[._]/g, ' ');
      client = {
        id: 'client-' + Date.now(),
        fullName: autoFullName.charAt(0).toUpperCase() + autoFullName.slice(1),
        email: cleanEmail,
        password: password ? String(password) : 'password123',
        phone: '',
        company: '',
        businessType: 'Business Owner',
        website: '',
        location: '',
        servicesInterestedIn: ['WordPress Website Design'],
        projectNotes: 'Signed in via client portal',
        communicationPreferences: 'Email',
        role: (cleanEmail === 'salamanimashaun05@gmail.com' || cleanEmail === 'admin@sammexsolution.com' || role === 'admin') ? 'admin' : 'client',
        createdAt: new Date().toISOString()
      };
      clients.push(client);

      // Create initial onboarding transaction
      transactions.unshift({
        id: 'txn-' + Date.now(),
        clientId: client.id,
        clientName: client.fullName,
        serviceRequested: 'Onboarding & Technical Consultation',
        projectStatus: 'Planning',
        paymentStatus: 'Pending',
        date: new Date().toLocaleDateString(),
        amount: 0,
        currency: 'USD',
        referenceId: `SMX-${Date.now().toString().slice(-6)}`,
        notes: 'Welcome to Sammex Solution! Connect via WhatsApp (+2349167631413) to discuss project specifications.'
      });
    }

    activities.unshift({
      id: 'act-' + Date.now(),
      clientId: client.id,
      clientName: client.fullName,
      actionType: 'login',
      description: `User signed in (${client.role})`,
      timestamp: new Date().toISOString()
    });

    res.json({ success: true, user: client });
  } catch (err: any) {
    console.error('Error during login:', err);
    res.status(500).json({ error: 'Server error during sign in. Please try again.' });
  }
});

// Update Client Profile
app.put('/api/auth/profile', (req, res) => {
  const { id, fullName, phone, company, businessType, website, location, servicesInterestedIn, projectNotes, communicationPreferences, avatarUrl } = req.body;
  
  const client = clients.find(c => c.id === id);
  if (!client) {
    return res.status(404).json({ error: 'Client profile not found' });
  }

  if (fullName) client.fullName = fullName;
  if (phone !== undefined) client.phone = phone;
  if (company !== undefined) client.company = company;
  if (businessType !== undefined) client.businessType = businessType;
  if (website !== undefined) client.website = website;
  if (location !== undefined) client.location = location;
  if (servicesInterestedIn) client.servicesInterestedIn = servicesInterestedIn;
  if (projectNotes !== undefined) client.projectNotes = projectNotes;
  if (communicationPreferences) client.communicationPreferences = communicationPreferences;
  if (avatarUrl !== undefined) client.avatarUrl = avatarUrl;

  activities.unshift({
    id: 'act-' + Date.now(),
    clientId: client.id,
    clientName: client.fullName,
    actionType: 'profile_updated',
    description: 'Updated profile contact & business information',
    timestamp: new Date().toISOString()
  });

  res.json({ success: true, user: client });
});

// Get Clients List (Admin)
app.get('/api/clients', (req, res) => {
  res.json({ success: true, clients });
});

// Transactions
app.get('/api/transactions', (req, res) => {
  const { clientId } = req.query;
  let result = transactions;
  if (clientId && typeof clientId === 'string') {
    result = transactions.filter(t => t.clientId === clientId || t.clientId === 'client-general');
  }
  res.json({ success: true, transactions: result });
});

// Add / Update Transaction (Admin)
app.post('/api/transactions', (req, res) => {
  const { clientId, clientName, serviceRequested, projectStatus, paymentStatus, amount, currency, referenceId, notes } = req.body;
  
  const newTxn: StoredTransaction = {
    id: 'txn-' + Date.now(),
    clientId: clientId || 'client-general',
    clientName: clientName || 'Client Project',
    serviceRequested: serviceRequested || 'WordPress Website Development',
    projectStatus: projectStatus || 'Planning',
    paymentStatus: paymentStatus || 'Pending',
    date: new Date().toLocaleDateString(),
    amount: Number(amount) || 0,
    currency: currency || 'USD',
    referenceId: referenceId || `SMX-${Date.now().toString().slice(-6)}`,
    notes: notes || ''
  };

  transactions.unshift(newTxn);
  res.status(201).json({ success: true, transaction: newTxn });
});

// Activity Tracking
app.get('/api/activities', (req, res) => {
  const { clientId } = req.query;
  let result = activities;
  if (clientId && typeof clientId === 'string') {
    result = activities.filter(a => a.clientId === clientId);
  } else {
    result = activities.slice(0, 50);
  }
  res.json({ success: true, activities: result });
});

app.post('/api/activities', (req, res) => {
  const { clientId, clientName, actionType, description, metadata } = req.body;
  const newAct: StoredActivity = {
    id: 'act-' + Date.now(),
    clientId: clientId || 'visitor',
    clientName: clientName || 'Anonymous Visitor',
    actionType: actionType || 'page_visited',
    description: description || 'Browsed portfolio page',
    metadata: metadata || {},
    timestamp: new Date().toISOString()
  };

  activities.unshift(newAct);
  if (activities.length > 200) activities.pop();
  res.status(201).json({ success: true, activity: newAct });
});

// Data Export for Admin (CSV & Excel compatible format)
app.get('/api/export/csv', (req, res) => {
  const { type } = req.query;
  
  if (type === 'inquiries') {
    let csv = 'ID,Full Name,Email,Phone,Company,Website,Service,Budget,Status,Date,Description\n';
    inquiries.forEach(inq => {
      const cleanDesc = `"${(inq.projectDescription || '').replace(/"/g, '""')}"`;
      csv += `"${inq.id}","${inq.fullName}","${inq.email}","${inq.phone}","${inq.company || ''}","${inq.website || ''}","${inq.serviceRequired}","${inq.budgetRange}","${inq.status}","${inq.createdAt}",${cleanDesc}\n`;
    });
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="sammex-inquiries.csv"');
    return res.send(csv);
  }

  // Default: export registered clients
  let csv = 'ID,Full Name,Email,Phone,Company,Business Type,Website,Location,Role,Created At\n';
  clients.forEach(c => {
    csv += `"${c.id}","${c.fullName}","${c.email}","${c.phone}","${c.company}","${c.businessType}","${c.website}","${c.location}","${c.role}","${c.createdAt}"\n`;
  });
  
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="sammex-clients.csv"');
  res.send(csv);
});

// Excel Export (Excel HTML/XML-compatible spreadsheet format with styling)
app.get('/api/export/excel', (req, res) => {
  let tableRows = '';
  clients.forEach(c => {
    tableRows += `<tr>
      <td>${c.id}</td>
      <td>${c.fullName}</td>
      <td>${c.email}</td>
      <td>${c.phone}</td>
      <td>${c.company}</td>
      <td>${c.businessType}</td>
      <td>${c.website}</td>
      <td>${c.location}</td>
      <td>${c.role}</td>
      <td>${new Date(c.createdAt).toLocaleDateString()}</td>
    </tr>`;
  });

  const excelDoc = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8" />
      <style>
        table { border-collapse: collapse; width: 100%; font-family: Arial, sans-serif; }
        th { background-color: #0A2A66; color: #FFFFFF; font-weight: bold; border: 1px solid #ddd; padding: 10px; }
        td { border: 1px solid #ddd; padding: 8px; }
        tr:nth-child(even) { background-color: #f9f9f9; }
      </style>
    </head>
    <body>
      <h2>Sammex Solution - Client Platform Export</h2>
      <p>Export Date: ${new Date().toLocaleString()}</p>
      <table>
        <thead>
          <tr>
            <th>Client ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Company</th>
            <th>Business Type</th>
            <th>Website</th>
            <th>Location</th>
            <th>Role</th>
            <th>Joined Date</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    </body>
    </html>
  `;

  res.setHeader('Content-Type', 'application/vnd.ms-excel; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="sammex-clients-report.xls"');
  res.send(excelDoc);
});

// ---------------- Vite Middleware & Static Serving ----------------

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      if (req.path.match(/\.(jpg|jpeg|png|gif|svg|webp|ico|css|js|map)$/)) {
        return res.status(404).send('Asset not found');
      }
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Sammex Solution server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

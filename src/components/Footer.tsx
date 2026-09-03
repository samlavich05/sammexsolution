import React from 'react';
import { 
  Phone, 
  Mail, 
  Linkedin, 
  ArrowRight, 
  ShieldCheck, 
  Globe,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { SITE_CONFIG, getWhatsAppUrl } from '../config/siteConfig';

interface FooterProps {
  onNavigate: (view: string) => void;
  onOpenQuote: (serviceName?: string) => void;
  onOpenAuth: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenQuote,
  onOpenAuth
}) => {
  const handleWhatsApp = () => {
    window.open(getWhatsAppUrl(), '_blank', 'noopener,noreferrer');
  };

  const handleLink = (id: string) => {
    onNavigate(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="main-footer" className="bg-[#06183B] text-white border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1 & 2: Brand & Positioning */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#0A2A66] font-extrabold text-xl shadow">
                S
              </div>
              <div>
                <span className="font-extrabold text-white text-xl tracking-tight font-heading">
                  SAMMEX
                </span>{' '}
                <span className="font-bold text-white text-xl tracking-tight font-heading">
                  SOLUTION
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-300 max-w-sm leading-relaxed">
              Modern digital solutions that help businesses grow online. Specializing in high-performance WordPress website development, Generative Engine Optimization (GEO), SEO, and autonomous AI automation.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <p>
                Founded & Led by <strong className="text-white">{SITE_CONFIG.founderName}</strong>
              </p>
              <p className="text-slate-300">
                {SITE_CONFIG.supportingMessage}
              </p>
            </div>

            {/* Social & Direct Contact Badges */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={SITE_CONFIG.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white hover:text-[#0A2A66] text-white transition-all flex items-center justify-center cursor-pointer"
                aria-label="Sammex Solution LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <button
                onClick={handleWhatsApp}
                className="w-9 h-9 rounded-lg bg-[#0A2A66] hover:bg-black text-emerald-400 hover:text-white border border-black transition-all flex items-center justify-center cursor-pointer"
                title="Direct WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </button>

              <a
                href={`mailto:${SITE_CONFIG.contact.email}`}
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all flex items-center justify-center cursor-pointer"
                title="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Expertise
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button 
                  onClick={() => handleLink('services')} 
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  WordPress Website Design
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLink('services')} 
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Landing Page Design
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLink('services')} 
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Shopify Store Design
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLink('services')} 
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  SEO & Local Search
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLink('services')} 
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  GEO (Generative Engine Optimization)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLink('services')} 
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  AI Automation (n8n & Zapier)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button 
                  onClick={() => handleLink('portfolio')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Portfolio Projects
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLink('case-studies')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Case Studies
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLink('about')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Animashaun
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLink('testimonials')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Client Testimonials
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenAuth} 
                  className="text-white font-semibold hover:underline transition-colors cursor-pointer"
                >
                  Client Portal Login
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenQuote()} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Request a Free Quote
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Direct Communication */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Contact Channels
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <p>
                <span className="text-slate-400 block text-[11px]">Direct WhatsApp:</span>
                <span className="font-semibold text-white">{SITE_CONFIG.contact.whatsapp}</span>
              </p>
              <p>
                <span className="text-slate-400 block text-[11px]">Inquiries Email:</span>
                <a href={`mailto:${SITE_CONFIG.contact.email}`} className="text-white hover:underline">
                  {SITE_CONFIG.contact.email}
                </a>
              </p>
              <p>
                <span className="text-slate-400 block text-[11px]">Primary Office / Coverage:</span>
                <span className="text-white">Lagos, Nigeria • Remote Global</span>
              </p>
            </div>
          </div>

        </div>

        {/* Sub-Footer Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} Sammex Solution. All rights reserved. Directed by {SITE_CONFIG.founderName}.
          </p>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => handleLink('contact')} 
              className="hover:text-white transition-colors"
            >
              Privacy & Data Policy
            </button>
            <span>•</span>
            <button 
              onClick={onOpenAuth} 
              className="hover:text-white transition-colors"
            >
              Client Login
            </button>
            <span>•</span>
            <button 
              onClick={handleWhatsApp} 
              className="text-emerald-400 hover:text-emerald-300 font-semibold"
            >
              WhatsApp Support
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

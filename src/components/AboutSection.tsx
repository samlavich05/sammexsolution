import React from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Phone, 
  Code, 
  Cpu, 
  TrendingUp, 
  Layers,
  Award
} from 'lucide-react';
import { SITE_CONFIG, getWhatsAppUrl } from '../config/siteConfig';

interface AboutSectionProps {
  onOpenQuote: (serviceName?: string) => void;
  onTrackAction: (actionType: string, description: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onOpenQuote,
  onTrackAction
}) => {
  const handleWhatsApp = () => {
    onTrackAction('whatsapp_click', 'Clicked WhatsApp in About Section');
    window.open(getWhatsAppUrl("I read about your vision at Sammex Solution and would like to discuss a project."), '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="about" className="py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Founder Persona & Visual Badge */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative mx-auto max-w-md bg-white rounded-2xl p-6 border border-slate-200 shadow-xl overflow-hidden">
              {/* Background Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#0A2A66]/5 rounded-bl-full pointer-events-none" />

              {/* Founder Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-[#0A2A66] border-2 border-white flex items-center justify-center text-white text-2xl font-black shadow-md font-heading">
                  AS
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-[#0A2A66] font-heading">
                    {SITE_CONFIG.founderName}
                  </h3>
                  <p className="text-xs text-[#0A2A66] font-bold uppercase tracking-wider">
                    {SITE_CONFIG.founderRole}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Sammex Solution
                  </p>
                </div>
              </div>

              {/* Personal Quote Card */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-700 italic leading-relaxed mb-6">
                "We don't simply build websites. We engineer high-velocity digital experiences and automation workflows that turn online visibility into sustainable business revenue."
              </div>

              {/* Founder Credential Highlights */}
              <div className="space-y-2.5 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Sub-second WordPress Architecture & Speed Hardening</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Pioneer in Generative Engine Optimization (GEO)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Custom n8n & AI Autonomous Workflow Engineering</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Rigorous Conversion Rate Psychology & Funnel Design</span>
                </div>
              </div>

              {/* Direct Founder Contact Actions */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={handleWhatsApp}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>WhatsApp Animashaun</span>
                </button>

                <span className="text-[11px] font-semibold text-slate-400">
                  Direct Advisory
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Mission, Positioning & Technical Integrity */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A2A66]/10 text-[#0A2A66] text-xs font-bold uppercase tracking-wider">
              About Sammex Solution
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0A2A66] font-heading tracking-tight">
              A Dedicated Digital Partner Committed to Your Growth
            </h2>

            <p className="text-base text-slate-700 leading-relaxed">
              At Sammex Solution, we believe that in 2026, having "just a website" is no longer enough. 
              Modern businesses require digital platforms that load in milliseconds, dominate traditional 
              Google searches, capture citations inside Generative AI assistants like ChatGPT and Gemini, 
              and automate operational friction with background AI workflows.
            </p>

            <p className="text-base text-slate-700 leading-relaxed">
              Led by founder <strong>Animashaun Abdul Salam</strong>, Sammex Solution provides hands-on technical 
              leadership, tailored WordPress website engineering, conversion-focused landing pages, Shopify e-commerce, 
              and n8n automation for startups, SMEs, and ambitious brands worldwide.
            </p>

            {/* 4 Pillars of Excellence */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white border border-slate-200">
                <div className="flex items-center gap-2 text-sm font-bold text-[#0A2A66] mb-1">
                  <Code className="w-4 h-4 text-[#0A2A66]" />
                  <span>Clean Engineering</span>
                </div>
                <p className="text-xs text-slate-600 leading-normal">
                  Zero plugin bloat, sub-second render times, and responsive precision on every device.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200">
                <div className="flex items-center gap-2 text-sm font-bold text-[#0A2A66] mb-1">
                  <Cpu className="w-4 h-4 text-[#0A2A66]" />
                  <span>GEO & AI Ready</span>
                </div>
                <p className="text-xs text-slate-600 leading-normal">
                  Structured entity schemas ensuring AI search engines cite your business as an authority.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200">
                <div className="flex items-center gap-2 text-sm font-bold text-[#0A2A66] mb-1">
                  <TrendingUp className="w-4 h-4 text-[#0A2A66]" />
                  <span>Conversion Focused</span>
                </div>
                <p className="text-xs text-slate-600 leading-normal">
                  Every page layout is designed with psychological triggers that guide visitors to purchase or inquire.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200">
                <div className="flex items-center gap-2 text-sm font-bold text-[#0A2A66] mb-1">
                  <ShieldCheck className="w-4 h-4 text-[#0A2A66]" />
                  <span>Long-Term Partnership</span>
                </div>
                <p className="text-xs text-slate-600 leading-normal">
                  Proactive maintenance, continuous optimization, and reliable technical counsel as you scale.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onOpenQuote()}
                className="px-6 py-3 rounded-xl bg-[#0A2A66] hover:bg-black text-white text-xs sm:text-sm font-bold border border-black shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Work with Sammex Solution</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              <button
                onClick={handleWhatsApp}
                className="px-5 py-3 rounded-xl bg-[#0A2A66] hover:bg-black text-white text-xs sm:text-sm font-semibold border border-black shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Quick WhatsApp Chat</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

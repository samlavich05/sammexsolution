import React from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Search, 
  Cpu, 
  TrendingUp, 
  Globe, 
  Sparkles, 
  Bot, 
  ShieldCheck,
  ChevronRight,
  Code
} from 'lucide-react';
import { SITE_CONFIG, getWhatsAppUrl } from '../config/siteConfig';
import { FounderImageFrame } from './FounderImageFrame';

interface HeroSectionProps {
  onOpenQuote: (serviceName?: string) => void;
  onNavigate: (view: string) => void;
  onTrackAction: (actionType: string, description: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenQuote,
  onNavigate,
  onTrackAction
}) => {
  const handleViewProjects = () => {
    onTrackAction('portfolio_viewed', 'Clicked View Projects from Hero');
    onNavigate('portfolio');
    const el = document.getElementById('portfolio');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleStartProject = () => {
    onTrackAction('quote_requested', 'Clicked Start a Project from Hero');
    onOpenQuote();
  };

  const handleGetQuote = () => {
    onTrackAction('quote_requested', 'Clicked Get a Quote from Hero');
    onOpenQuote();
  };

  return (
    <section 
      id="home" 
      className="relative pt-28 pb-20 md:pt-36 md:pb-28 bg-[#0A2A66] text-white overflow-hidden border-b border-white/10"
    >
      {/* Subtle Background Mesh & Accent Lines */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute -top-48 -right-48 w-96 h-96 rounded-full bg-blue-600 blur-3xl"></div>
        <div className="absolute top-1/2 -left-48 w-96 h-96 rounded-full bg-black blur-3xl"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:24px_24px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Content & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Positioning Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs sm:text-sm font-semibold tracking-wide">
              <Sparkles className="w-4 h-4 text-white animate-pulse" />
              <span>Modern Digital Solutions That Help Businesses Grow</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading leading-tight sm:leading-none text-white">
              We Build and Optimize <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-blue-200">
                Digital Solutions
              </span>{' '}
              That Help Businesses Grow.
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              {SITE_CONFIG.description}
            </p>

            {/* Value Highlights Pill Row */}
            <div className="flex flex-wrap gap-y-2 gap-x-4 pt-1 text-xs sm:text-sm text-slate-200">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>WordPress Speed 99/100</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>GEO & AI Search Ready</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Autonomous AI Workflows</span>
              </div>
            </div>

            {/* Three Targeted CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              {/* Primary CTA: View Projects */}
              <button
                id="hero-view-projects-btn"
                onClick={handleViewProjects}
                className="px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base text-white bg-[#0A2A66] hover:bg-black border-2 border-black shadow-xl ring-1 ring-white/30 transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>View Projects</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-white" />
              </button>

              {/* Secondary CTA: Get a Quote */}
              <button
                id="hero-get-quote-btn"
                onClick={handleGetQuote}
                className="px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base text-white bg-[#0A2A66] hover:bg-black border-2 border-black shadow-xl ring-1 ring-white/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              {/* Additional CTA: Start a Project */}
              <button
                id="hero-start-project-btn"
                onClick={handleStartProject}
                className="px-5 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-white hover:text-white bg-[#0A2A66]/90 hover:bg-black border border-black shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Start a Project</span>
              </button>
            </div>

            {/* Trust Indicator & Founder Endorsement */}
            <div className="pt-3 flex items-center gap-3 text-xs text-slate-300">
              <FounderImageFrame size="sm" shape="circle" variant="dark" className="border-white/40 bg-white/20 shrink-0" />
              <div>
                <p className="font-semibold text-white">
                  Founded & Directed by {SITE_CONFIG.founderName}
                </p>
                <p className="text-slate-400">
                  {SITE_CONFIG.supportingMessage}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Digital Growth Architecture Visual */}
          <div className="lg:col-span-5">
            <div 
              id="hero-visual-container"
              className="relative mx-auto max-w-lg rounded-2xl bg-black/40 p-4 sm:p-6 border border-white/15 backdrop-blur-xl shadow-2xl"
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                  <span className="ml-2 text-xs font-mono text-slate-300 font-semibold">
                    sammex-growth-stack.ts
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>Systems Active</span>
                </div>
              </div>

              {/* Architecture Nodes Matrix */}
              <div className="mt-4 space-y-3">
                {/* Node 1: WordPress Sub-second & Core Web Vitals */}
                <div className="p-3 rounded-xl bg-black/60 border border-emerald-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-medium">Performance Engine</div>
                      <div className="text-sm font-bold text-white">WordPress & Speed Tuning</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-base font-extrabold text-emerald-400">99 / 100</div>
                    <div className="text-[10px] text-slate-400">Google Core Web Vitals</div>
                  </div>
                </div>

                {/* Node 2: GEO (Generative Engine Optimization) */}
                <div className="p-3 rounded-xl bg-black/60 border border-white/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/10 text-white">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-medium">Generative AI Search (GEO)</div>
                      <div className="text-sm font-bold text-white">ChatGPT & Gemini Discovery</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="inline-block px-2.5 py-0.5 rounded bg-white text-[#0A2A66] font-extrabold text-xs">
                      #1 Cited
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Entity Schema Graph</div>
                  </div>
                </div>

                {/* Node 3: AI Automation Workflow (n8n + WhatsApp) */}
                <div className="p-3 rounded-xl bg-black/60 border border-blue-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-medium">Autonomous Operations</div>
                      <div className="text-sm font-bold text-white">n8n + WhatsApp Lead Flow</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-blue-300">&lt; 90s response</div>
                    <div className="text-[10px] text-slate-400">18 hrs/wk saved</div>
                  </div>
                </div>

                {/* Node 4: High-Conversion Metrics Banner */}
                <div className="p-3 rounded-xl bg-gradient-to-r from-black/80 via-[#0A2A66]/60 to-black/80 border border-white/20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-white" />
                    <span className="text-xs font-semibold text-slate-200">
                      Average Client Lead Lift
                    </span>
                  </div>
                  <span className="text-sm font-extrabold text-white">
                    +180% to +240%
                  </span>
                </div>
              </div>

              {/* Visual Card Footer */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span>Tailored for SMEs, Startups & Scaling Brands</span>
                <span className="font-mono text-white">Lagos • Global</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

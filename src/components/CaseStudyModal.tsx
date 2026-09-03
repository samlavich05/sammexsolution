import React from 'react';
import { 
  X, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Code, 
  Sparkles, 
  Phone,
  Layers,
  Search
} from 'lucide-react';
import { CaseStudy } from '../types';
import { getWhatsAppUrl } from '../config/siteConfig';

interface CaseStudyModalProps {
  caseStudy: CaseStudy | null;
  onClose: () => void;
  onOpenQuote: (serviceName?: string) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  caseStudy,
  onClose,
  onOpenQuote
}) => {
  if (!caseStudy) return null;

  const handleWhatsApp = () => {
    const url = getWhatsAppUrl(`I read the case study for ${caseStudy.client} and would like to discuss similar results for my business.`);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      id="case-study-modal"
      className="fixed inset-0 z-50 overflow-y-auto bg-[#06183B]/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
    >
      <div 
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-8"
      >
        {/* Header Banner */}
        <div className="bg-[#0A2A66] p-6 sm:p-8 text-white relative">
          <button
            id="close-case-study-btn"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 mb-3">
            <span className="px-3 py-1 rounded-full bg-white text-[#0A2A66] font-bold uppercase tracking-wider">
              {caseStudy.industry}
            </span>
            <span className="flex items-center gap-1 text-slate-300">
              <Clock className="w-3.5 h-3.5" />
              Delivery Timeline: {caseStudy.duration}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white leading-tight">
            {caseStudy.title}
          </h3>
          <p className="mt-2 text-sm text-slate-300 font-medium">
            Client Partner: <span className="text-white font-bold">{caseStudy.client}</span>
          </p>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[70vh] overflow-y-auto">
          
          {/* Key Results Showcase Matrix */}
          <div className="bg-gradient-to-br from-slate-50 to-blue-50/50 p-5 rounded-2xl border border-blue-100">
            <div className="text-xs font-bold uppercase tracking-wider text-[#0A2A66] mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#0A2A66]" />
              Measurable Business Outcomes
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {caseStudy.results.map((res, i) => (
                <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="text-xs text-slate-500 font-semibold">{res.metric}</div>
                  <div className="text-xl sm:text-2xl font-black text-[#0A2A66] my-1">
                    {res.change}
                  </div>
                  <div className="text-[11px] text-slate-600 leading-tight">
                    {res.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial Quote */}
          {caseStudy.testimonialSnippet && (
            <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 italic text-xs sm:text-sm text-slate-800">
              "{caseStudy.testimonialSnippet}"
            </div>
          )}

          {/* Detailed 6-Stage Narrative */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. Client Challenge */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#0A2A66] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#0A2A66] text-white text-[10px] flex items-center justify-center font-bold">1</span>
                The Challenge
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {caseStudy.challenge}
              </p>
            </div>

            {/* 2. Strategy */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#0A2A66] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#0A2A66] text-white text-[10px] flex items-center justify-center font-bold">2</span>
                Growth Strategy
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {caseStudy.strategy}
              </p>
            </div>

            {/* 3. Design Process */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#0A2A66] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#0A2A66] text-white text-[10px] flex items-center justify-center font-bold">3</span>
                Design & Conversion Architecture
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {caseStudy.designProcess}
              </p>
            </div>

            {/* 4. Development Execution */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#0A2A66] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#0A2A66] text-white text-[10px] flex items-center justify-center font-bold">4</span>
                Engineering & Optimization
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {caseStudy.development}
              </p>
            </div>
          </div>

          {/* 5. SEO & GEO Optimization Deep-Dive */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#0A2A66] mb-2 flex items-center gap-2">
              <Search className="w-4 h-4 text-[#0A2A66]" />
              SEO & Generative Engine Optimization (GEO)
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {caseStudy.seoAndOptimization}
            </p>
          </div>

          {/* Technologies Used */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <Code className="w-4 h-4 text-slate-400" />
              Technologies & Frameworks
            </div>
            <div className="flex flex-wrap gap-2">
              {caseStudy.technologies.map((t, i) => (
                <span 
                  key={i} 
                  className="px-3 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-mono font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer Call to Action */}
        <div className="bg-slate-100 p-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-base font-extrabold text-[#0A2A66] font-heading">
              Want results like this? Let's talk.
            </div>
            <p className="text-xs text-slate-600">
              Get an honest estimate and technical strategy tailored to your exact market.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleWhatsApp}
              className="px-4 py-2.5 rounded-xl border border-black/30 text-slate-800 hover:bg-white text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp</span>
            </button>

            <button
              id="case-study-talk-btn"
              onClick={() => {
                onClose();
                onOpenQuote(caseStudy.title);
              }}
              className="px-6 py-2.5 rounded-xl bg-[#0A2A66] hover:bg-black text-white text-xs sm:text-sm font-bold border border-black shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Discuss Your Project</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

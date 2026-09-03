import React from 'react';
import { 
  FileText, 
  ArrowRight, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { CASE_STUDIES_DATA } from '../config/siteConfig';
import { CaseStudy } from '../types';

interface CaseStudiesSectionProps {
  onSelectCaseStudy: (study: CaseStudy) => void;
  onOpenQuote: (serviceName?: string) => void;
  onTrackAction: (actionType: string, description: string) => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({
  onSelectCaseStudy,
  onOpenQuote,
  onTrackAction
}) => {
  const handleReadStudy = (study: CaseStudy) => {
    onTrackAction('portfolio_viewed', `Read case study: ${study.title}`);
    onSelectCaseStudy(study);
  };

  return (
    <section id="case-studies" className="py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A2A66]/10 text-[#0A2A66] text-xs font-bold uppercase tracking-wider mb-3">
            In-Depth Case Studies
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0A2A66] font-heading tracking-tight">
            How We Solve Real Commercial Challenges
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Examine our step-by-step strategy, design decisions, technical architecture, and verified metrics 
            achieved for our business partners.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CASE_STUDIES_DATA.map((study, idx) => (
            <div
              key={study.id}
              id={`case-study-card-${study.id}`}
              className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 hover:border-[#0A2A66] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Meta header */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#0A2A66] text-white">
                    {study.industry}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{study.duration}</span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#0A2A66] font-heading mb-3 group-hover:text-blue-900 transition-colors">
                  {study.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  {study.challenge}
                </p>

                {/* Measurable Results Block */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 mb-6">
                  <div className="text-[11px] font-bold text-[#0A2A66] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-[#0A2A66]" />
                    Verified Outcomes
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {study.results.map((res, i) => (
                      <div key={i} className="text-center sm:text-left">
                        <div className="text-sm sm:text-base font-extrabold text-[#0A2A66]">
                          {res.change}
                        </div>
                        <div className="text-[10px] text-slate-500 truncate">
                          {res.metric}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {study.technologies.map((tech, i) => (
                    <span key={i} className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-200 text-slate-700">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <button
                  onClick={() => handleReadStudy(study)}
                  className="text-xs sm:text-sm font-bold text-[#0A2A66] hover:text-blue-700 flex items-center gap-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-[#0A2A66]" />
                  <span>Read Full Case Study</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onOpenQuote(study.title)}
                  className="px-3.5 py-1.5 rounded-lg bg-[#0A2A66] hover:bg-black text-white text-xs font-bold border border-black shadow-sm transition-all cursor-pointer"
                >
                  Request Similar
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Strong CTA banner */}
        <div className="mt-16 text-center bg-gradient-to-r from-[#0A2A66] to-[#06183B] p-8 sm:p-10 rounded-2xl text-white shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white mb-2">
            Want results like this? Let's talk.
          </h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto mb-6">
            Every business has unique bottlenecks. Schedule a direct strategy discussion with Animashaun Abdul Salam to uncover high-impact growth opportunities.
          </p>
          <button
            onClick={() => onOpenQuote()}
            className="px-8 py-3.5 rounded-xl bg-[#0A2A66] hover:bg-black text-white font-bold text-sm border-2 border-black ring-1 ring-white/30 shadow-lg hover:shadow-2xl transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <span>Start Your Growth Project</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>

      </div>
    </section>
  );
};

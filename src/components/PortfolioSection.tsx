import React, { useState } from 'react';
import { 
  ExternalLink, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  TrendingUp, 
  FileText,
  Code,
  Globe
} from 'lucide-react';
import { PORTFOLIO_DATA, CASE_STUDIES_DATA } from '../config/siteConfig';
import { PortfolioProject, CaseStudy } from '../types';

interface PortfolioSectionProps {
  onSelectCaseStudy: (caseStudy: CaseStudy) => void;
  onOpenQuote: (serviceName?: string) => void;
  onTrackAction: (actionType: string, description: string) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  onSelectCaseStudy,
  onOpenQuote,
  onTrackAction
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'wordpress', label: 'WordPress Websites' },
    { id: 'landing-page', label: 'Landing Pages' },
    { id: 'shopify', label: 'Shopify' },
    { id: 'seo', label: 'SEO & GEO' },
    { id: 'ai-automation', label: 'AI Automation' },
  ];

  const filteredProjects = activeCategory === 'all'
    ? PORTFOLIO_DATA
    : PORTFOLIO_DATA.filter(p => p.category === activeCategory);

  const handleOpenCaseStudy = (project: PortfolioProject) => {
    onTrackAction('portfolio_viewed', `Viewed case study for ${project.title}`);
    const foundStudy = CASE_STUDIES_DATA.find(cs => cs.id === project.caseStudyId || cs.projectId === project.id);
    if (foundStudy) {
      onSelectCaseStudy(foundStudy);
    }
  };

  return (
    <section id="portfolio" className="py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A2A66]/10 text-[#0A2A66] text-xs font-bold uppercase tracking-wider mb-3">
            Proven Track Record
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0A2A66] font-heading tracking-tight">
            Featured Projects & Measurable Results
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Explore selected digital solutions custom-built by Sammex Solution. 
            Each project represents our uncompromising dedication to speed, conversion architecture, and measurable client ROI.
          </p>
        </div>

        {/* Filter Navigation Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`portfolio-filter-${cat.id}`}
              onClick={() => {
                setActiveCategory(cat.id);
                onTrackAction('portfolio_viewed', `Filtered portfolio by ${cat.label}`);
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#0A2A66] text-white border border-black shadow-md scale-105 font-bold'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              id={`portfolio-card-${project.id}`}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#0A2A66] transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Visual Image / Mockup Card Header */}
                <div className="relative h-56 overflow-hidden bg-slate-900">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.opacity = '0.2';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    loading="lazy"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A2A66]/90 via-[#0A2A66]/30 to-transparent"></div>
                  
                  {/* Category Pill on Image */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-[#0A2A66] text-white border border-white/20 shadow-sm backdrop-blur-sm">
                      {project.categoryLabel}
                    </span>
                  </div>

                  {/* Industry Label Bottom Overlay */}
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-xs font-semibold text-slate-200 tracking-wide">
                      {project.industry}
                    </span>
                    <h3 className="text-lg font-bold text-white font-heading truncate">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Card Body Details */}
                <div className="p-6 space-y-4">
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Measurable Results Badges */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 grid grid-cols-3 gap-2 text-center">
                    {project.results.map((res, i) => (
                      <div key={i} className="px-1">
                        <div className="text-sm sm:text-base font-extrabold text-[#0A2A66]">
                          {res.value}
                        </div>
                        <div className="text-[10px] text-slate-500 truncate mt-0.5">
                          {res.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Services Provided */}
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Services Executed
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.servicesProvided.map((s, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[11px] bg-blue-50 text-[#0A2A66] font-medium border border-blue-100"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Technologies Used */}
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Tech Stack
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {project.technologiesUsed.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 text-slate-600"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
                {project.caseStudyId ? (
                  <button
                    id={`case-study-btn-${project.id}`}
                    onClick={() => handleOpenCaseStudy(project)}
                    className="text-xs font-bold text-[#0A2A66] hover:text-blue-700 flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#0A2A66]" />
                    <span>View Case Study</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                ) : (
                  <button
                    onClick={() => onOpenQuote(project.title)}
                    className="text-xs font-bold text-[#0A2A66] hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Request Similar Project</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}

                <button
                  onClick={() => onOpenQuote(project.title)}
                  className="px-3 py-1.5 rounded-lg bg-[#0A2A66] hover:bg-black text-white text-xs font-bold border border-black shadow-sm transition-all cursor-pointer"
                >
                  Start Project
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 text-center">
          <p className="text-sm text-slate-600 mb-4">
            Have a custom requirement or need an audit of your existing website?
          </p>
          <button
            onClick={() => onOpenQuote()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0A2A66] hover:bg-black text-white font-bold text-sm border border-black shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <span>Discuss Your Project Requirements</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>

      </div>
    </section>
  );
};

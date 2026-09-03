import React, { useState } from 'react';
import { 
  Globe, 
  Sparkles, 
  ShoppingBag, 
  Search, 
  Cpu, 
  Bot, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle
} from 'lucide-react';
import { SERVICES_DATA } from '../config/siteConfig';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectServiceModal: (service: ServiceItem) => void;
  onRequestQuoteWithService: (serviceName: string) => void;
  onTrackAction: (actionType: string, description: string) => void;
}

const serviceIcons: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-6 h-6 text-[#0A2A66] group-hover:text-white transition-colors" />,
  Sparkles: <Sparkles className="w-6 h-6 text-[#0A2A66] group-hover:text-white transition-colors" />,
  ShoppingBag: <ShoppingBag className="w-6 h-6 text-[#0A2A66] group-hover:text-white transition-colors" />,
  Search: <Search className="w-6 h-6 text-[#0A2A66] group-hover:text-white transition-colors" />,
  Cpu: <Cpu className="w-6 h-6 text-[#0A2A66] group-hover:text-white transition-colors" />,
  Bot: <Bot className="w-6 h-6 text-[#0A2A66] group-hover:text-white transition-colors" />,
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceModal,
  onRequestQuoteWithService,
  onTrackAction
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | string>('all');

  const filteredServices = activeFilter === 'all'
    ? SERVICES_DATA
    : SERVICES_DATA.filter(s => s.category === activeFilter);

  const handleExplore = (service: ServiceItem) => {
    onTrackAction('service_viewed', `Explored details for ${service.name}`);
    onSelectServiceModal(service);
  };

  const handleRequest = (service: ServiceItem) => {
    onTrackAction('quote_requested', `Clicked Request Service for ${service.name}`);
    onRequestQuoteWithService(service.name);
  };

  return (
    <section id="services" className="py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A2A66]/10 text-[#0A2A66] text-xs font-bold uppercase tracking-wider mb-3">
            Core Expertise & Solutions
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0A2A66] font-heading tracking-tight">
            High-Performance Digital Services Engineered to Scale
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Every service is precision-crafted to support measurable commercial growth. 
            From lightning-fast WordPress architecture and conversion funnels to cutting-edge Generative Engine Optimization (GEO) and autonomous AI workflows.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-[#0A2A66] text-white border border-black shadow-md font-bold'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            All Services ({SERVICES_DATA.length})
          </button>
          {SERVICES_DATA.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveFilter(s.category)}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeFilter === s.category
                  ? 'bg-[#0A2A66] text-white border border-black shadow-md font-bold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#0A2A66] transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              {/* Card Header & Content */}
              <div className="p-6 sm:p-7">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0A2A66]/5 group-hover:bg-[#0A2A66] transition-colors flex items-center justify-center">
                    {serviceIcons[service.iconName] || <Globe className="w-6 h-6 text-[#0A2A66] group-hover:text-white" />}
                  </div>
                  {service.badge && (
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-[#0A2A66]/10 text-[#0A2A66] border border-[#0A2A66]/20">
                      {service.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-[#0A2A66] font-heading mb-2">
                  {service.name}
                </h3>
                
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                  {service.shortTagline}
                </p>

                {/* Key Benefit Highlight */}
                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 mb-5">
                  <div className="text-[11px] font-bold text-[#0A2A66] uppercase tracking-wider mb-1">
                    Primary Advantage
                  </div>
                  <p className="text-xs text-slate-700 font-medium leading-normal">
                    {service.keyBenefit}
                  </p>
                </div>

                {/* Features Pill List */}
                <div className="space-y-2 mb-4">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Included Capabilities
                  </div>
                  <div className="grid grid-cols-1 gap-1.5">
                    {service.features.slice(0, 4).map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  id={`explore-service-${service.id}`}
                  onClick={() => handleExplore(service)}
                  className="text-xs font-bold text-[#0A2A66] hover:text-black flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Explore Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  id={`request-service-${service.id}`}
                  onClick={() => handleRequest(service)}
                  className="px-3.5 py-1.5 rounded-lg bg-[#0A2A66] hover:bg-black text-white text-xs font-bold border border-black shadow-sm transition-all cursor-pointer"
                >
                  Request This Service
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Consultation Callout */}
        <div className="mt-16 bg-[#0A2A66] rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-xl font-bold font-heading text-white">
              Not sure which service matches your exact business stage?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Speak directly with founder Animashaun Abdul Salam for a personalized technical and growth assessment.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onRequestQuoteWithService('General Consultation')}
              className="px-5 py-2.5 rounded-xl bg-[#0A2A66] hover:bg-black text-white text-xs sm:text-sm font-bold border-2 border-black ring-1 ring-white/30 shadow transition-all cursor-pointer"
            >
              Get Free Assessment
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

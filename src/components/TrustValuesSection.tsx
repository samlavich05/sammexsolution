import React from 'react';
import { 
  Smartphone, 
  Search, 
  Cpu, 
  Bot, 
  TrendingUp, 
  Gauge, 
  Zap, 
  Briefcase, 
  Palette, 
  ShieldCheck,
  Check
} from 'lucide-react';
import { TRUST_VALUES } from '../config/siteConfig';

const iconMap: Record<string, React.ReactNode> = {
  Smartphone: <Smartphone className="w-5 h-5 text-[#0A2A66] group-hover:text-white transition-colors" />,
  Search: <Search className="w-5 h-5 text-[#0A2A66] group-hover:text-white transition-colors" />,
  Cpu: <Cpu className="w-5 h-5 text-[#0A2A66] group-hover:text-white transition-colors" />,
  Bot: <Bot className="w-5 h-5 text-[#0A2A66] group-hover:text-white transition-colors" />,
  TrendingUp: <TrendingUp className="w-5 h-5 text-[#0A2A66] group-hover:text-white transition-colors" />,
  Gauge: <Gauge className="w-5 h-5 text-[#0A2A66] group-hover:text-white transition-colors" />,
  Zap: <Zap className="w-5 h-5 text-[#0A2A66] group-hover:text-white transition-colors" />,
  Briefcase: <Briefcase className="w-5 h-5 text-[#0A2A66] group-hover:text-white transition-colors" />,
  Palette: <Palette className="w-5 h-5 text-[#0A2A66] group-hover:text-white transition-colors" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-[#0A2A66] group-hover:text-white transition-colors" />
};

export const TrustValuesSection: React.FC = () => {
  return (
    <section id="trust-values" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A2A66]/10 text-[#0A2A66] text-xs font-bold uppercase tracking-wider mb-3">
            Why Businesses Choose Sammex Solution
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A2A66] font-heading tracking-tight">
            Built for Tangible Growth, Engineered Without Compromise
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            We don't merely ship lines of code or pre-made templates. We architect high-performance 
            digital assets and intelligent automation systems engineered to compound your bottom-line revenue.
          </p>
        </div>

        {/* 10 Value Points Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
          {TRUST_VALUES.map((val) => (
            <div
              key={val.id}
              id={`trust-card-${val.id}`}
              className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:border-[#0A2A66] transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#0A2A66]/5 group-hover:bg-[#0A2A66] group-hover:text-white transition-colors flex items-center justify-center mb-4">
                  {iconMap[val.iconName] || <Check className="w-5 h-5 text-[#0A2A66]" />}
                </div>
                <h3 className="text-base font-bold text-[#0A2A66] font-heading mb-2">
                  {val.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {val.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-[11px] font-bold text-[#0A2A66]">
                <span>Sammex Standard</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

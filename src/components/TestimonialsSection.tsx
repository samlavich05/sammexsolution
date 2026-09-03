import React from 'react';
import { 
  Star, 
  Quote, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight 
} from 'lucide-react';
import { TESTIMONIALS_DATA } from '../config/siteConfig';

interface TestimonialsSectionProps {
  onOpenQuote: (serviceName?: string) => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  onOpenQuote
}) => {
  return (
    <section id="testimonials" className="py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A2A66]/10 text-[#0A2A66] text-xs font-bold uppercase tracking-wider mb-3">
            Client Experiences
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0A2A66] font-heading tracking-tight">
            Trusted by Ambitious Business Leaders
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Real feedback from founders, managing directors, and operations leads who partnered 
            with Sammex Solution to elevate their digital presence.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS_DATA.map((t) => (
            <div
              key={t.id}
              id={`testimonial-card-${t.id}`}
              className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 hover:border-[#0A2A66] hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Rating & Result Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[#0A2A66]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#0A2A66] text-white">
                    {t.projectResult}
                  </span>
                </div>

                {/* Testimonial Quote */}
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic mb-6">
                  "{t.testimonial}"
                </p>
              </div>

              {/* Author & Service Meta */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#0A2A66] text-white font-bold flex items-center justify-center text-sm shadow-sm">
                    {t.initials}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0A2A66] font-heading">
                      {t.clientName}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {t.clientTitle} • {t.company}
                    </p>
                  </div>
                </div>

                <span className="hidden sm:inline-block text-[11px] text-slate-400 font-medium">
                  {t.service.split('&')[0]}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Bottom Callout */}
        <div className="mt-14 text-center">
          <p className="text-xs sm:text-sm text-slate-500 mb-3">
            Ready to become our next digital success story?
          </p>
          <button
            onClick={() => onOpenQuote()}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0A2A66] hover:bg-black text-white text-xs sm:text-sm font-bold border border-black shadow transition-all cursor-pointer"
          >
            <span>Start Your Project Today</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>

      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { MessageSquare, X, Phone, ArrowRight } from 'lucide-react';
import { SITE_CONFIG, getWhatsAppUrl } from '../config/siteConfig';
import { FounderImageFrame } from './FounderImageFrame';

interface WhatsAppButtonProps {
  onTrackAction: (actionType: string, description: string) => void;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ onTrackAction }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const handleClick = () => {
    onTrackAction('whatsapp_click', 'Clicked floating WhatsApp button');
    window.open(getWhatsAppUrl(), '_blank', 'noopener,noreferrer');
  };

  return (
    <div id="floating-whatsapp-container" className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Interactive Tooltip Card */}
      {tooltipOpen && (
        <div 
          className="mb-3 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 animate-in fade-in slide-in-from-bottom-3 duration-200 text-slate-800"
        >
          <div className="flex items-start justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <FounderImageFrame size="sm" shape="circle" variant="dark" className="border-emerald-500 bg-emerald-600 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-[#0A2A66]">
                  {SITE_CONFIG.founderName}
                </h4>
                <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Online on WhatsApp
                </p>
              </div>
            </div>
            <button
              onClick={() => setTooltipOpen(false)}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
              aria-label="Close tooltip"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-xs text-slate-600 py-3 leading-relaxed">
            "Hello! Have questions about a WordPress website, SEO, GEO, or an AI workflow? Message me directly on WhatsApp."
          </p>

          <button
            onClick={handleClick}
            className="w-full py-2 px-3 rounded-xl bg-[#0A2A66] hover:bg-black text-white text-xs font-bold border border-black shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Start Chat on WhatsApp</span>
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <button
        id="floating-whatsapp-btn"
        onClick={() => {
          if (!tooltipOpen) {
            setTooltipOpen(true);
          } else {
            handleClick();
          }
        }}
        className="relative group p-3.5 sm:p-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-2xl hover:shadow-emerald-500/40 transition-all duration-300 hover:scale-105 cursor-pointer flex items-center justify-center"
        aria-label="Chat with Sammex Solution on WhatsApp"
        title="Chat with Animashaun on WhatsApp (+2349167631413)"
      >
        {/* Pulse ring */}
        <span className="absolute -inset-1 rounded-full bg-emerald-400/30 animate-ping pointer-events-none"></span>
        <Phone className="w-6 h-6 text-white" />
        <span className="sr-only">WhatsApp Sammex Solution</span>
      </button>
    </div>
  );
};

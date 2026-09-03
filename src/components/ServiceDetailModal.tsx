import React from 'react';
import { 
  X, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Briefcase, 
  Layers, 
  Users, 
  Phone
} from 'lucide-react';
import { ServiceItem } from '../types';
import { getWhatsAppUrl } from '../config/siteConfig';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onRequestService: (serviceName: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onRequestService
}) => {
  if (!service) return null;

  const handleWhatsApp = () => {
    const url = getWhatsAppUrl(`I would like to inquire about your ${service.name} service.`);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      id="service-detail-modal"
      className="fixed inset-0 z-50 overflow-y-auto bg-[#06183B]/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
    >
      <div 
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="bg-[#0A2A66] p-6 text-white relative">
          <button
            id="close-service-modal-btn"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {service.badge && (
            <span className="inline-block px-3 py-1 rounded-full bg-white text-[#0A2A66] text-xs font-bold uppercase tracking-wider mb-2">
              {service.badge}
            </span>
          )}

          <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
            {service.name}
          </h3>
          <p className="mt-2 text-sm sm:text-base text-slate-300">
            {service.shortTagline}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Overview */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#0A2A66] mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#0A2A66]" />
              Strategic Overview
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Key Deliverables */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#0A2A66] mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#0A2A66]" />
              Core Deliverables
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.deliverables.map((del, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{del}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#0A2A66] mb-3 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#0A2A66]" />
              Tangible Business Benefits
            </h4>
            <ul className="space-y-2">
              {service.benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0A2A66] mt-2 shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Suitable Client Profiles */}
          <div className="border-t border-slate-200 pt-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#0A2A66] mb-3 flex items-center gap-2">
              <Users className="w-4 h-4 text-[#0A2A66]" />
              Ideal For
            </h4>
            <div className="flex flex-wrap gap-2">
              {service.suitableClients.map((clientType, i) => (
                <span 
                  key={i} 
                  className="px-3 py-1 rounded-md bg-blue-50 text-[#0A2A66] text-xs font-medium border border-blue-100"
                >
                  {clientType}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer CTAs */}
        <div className="bg-slate-100 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handleWhatsApp}
            className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-black/30 text-slate-800 hover:bg-white text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Phone className="w-4 h-4 text-emerald-600" />
            <span>Discuss on WhatsApp</span>
          </button>

          <button
            id="modal-request-service-btn"
            onClick={() => {
              onClose();
              onRequestService(service.name);
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#0A2A66] hover:bg-black text-white text-xs sm:text-sm font-bold border border-black shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Request This Service</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

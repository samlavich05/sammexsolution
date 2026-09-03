import React, { useState, useEffect } from 'react';
import { 
  X, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Phone, 
  MessageSquare, 
  Sparkles,
  Loader2
} from 'lucide-react';
import { SERVICES_DATA, getWhatsAppUrl } from '../config/siteConfig';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedService?: string;
  onInquirySubmitted?: (inquiry: any) => void;
  onTrackAction: (actionType: string, description: string) => void;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  preSelectedService,
  onInquirySubmitted,
  onTrackAction
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    serviceRequired: preSelectedService || 'WordPress Website Design',
    budgetRange: '$2,500 - $5,000',
    projectDescription: '',
    preferredContactMethod: 'WhatsApp' as 'Email' | 'WhatsApp' | 'Phone Call'
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (preSelectedService) {
      setFormData(prev => ({ ...prev, serviceRequired: preSelectedService }));
    }
  }, [preSelectedService]);

  if (!isOpen) return null;

  const budgetOptions = [
    '< $1,500 (Basic project / Bug fixing)',
    '$1,500 - $2,500 (Landing Page / Speed Audit)',
    '$2,500 - $5,000 (Complete WordPress / Shopify)',
    '$5,000 - $10,000 (Full Platform & GEO / AI)',
    '$10,000+ (Custom Enterprise Platform / Systems)'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    if (!formData.fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit quote request');
      }

      // Redundancy direct FormSubmit AJAX
      try {
        await fetch('https://formsubmit.co/ajax/salamanimashaun05@gmail.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            company: formData.company,
            service: formData.serviceRequired,
            budget: formData.budgetRange,
            message: formData.projectDescription,
            _subject: `Quote Request: ${formData.fullName} - ${formData.serviceRequired}`
          })
        });
      } catch (e) {
        // Redundancy catch
      }

      setSuccess(true);
      onTrackAction('quote_submitted', `Quote submitted for ${formData.serviceRequired}`);
      if (onInquirySubmitted) {
        onInquirySubmitted(data.inquiry);
      }
    } catch (err: any) {
      console.error('Quote error:', err);
      setErrorMessage(err.message || 'Error sending request. Please connect on WhatsApp directly.');
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppDirect = () => {
    const text = `Hi Sammex Solution, I would like to request a quote for ${formData.serviceRequired}.`;
    onTrackAction('whatsapp_click', 'Clicked WhatsApp from Quote Modal');
    window.open(getWhatsAppUrl(text), '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      id="quote-request-modal"
      className="fixed inset-0 z-50 overflow-y-auto bg-[#06183B]/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-8">
        
        {/* Header */}
        <div className="bg-[#0A2A66] p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-300 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#0A2A66] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#0A2A66]" />
            <span>Fast Proposal & Strategy</span>
          </div>

          <h3 className="text-2xl font-extrabold font-heading text-white">
            Request a Project Quote
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-slate-300">
            Tell us about your project scope. We deliver detailed scopes and transparent fixed-price estimates.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {success ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-[#0A2A66] font-heading">
                Quote Request Received!
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                Founder Animashaun Abdul Salam will review your scope and provide an actionable strategy within 24 hours.
              </p>
              <div className="pt-3 flex justify-center gap-3">
                <button
                  onClick={handleWhatsAppDirect}
                  className="px-4 py-2.5 rounded-xl bg-[#0A2A66] hover:bg-black text-white text-xs font-bold border border-black shadow flex items-center gap-1.5 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Discuss on WhatsApp</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-black/30 text-slate-700 hover:bg-slate-50 text-xs font-semibold cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0A2A66]/30"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@company.com"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0A2A66]/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 555 123 4567"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0A2A66]/30"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Acme Growth Inc."
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0A2A66]/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Service Interested In *
                  </label>
                  <select
                    value={formData.serviceRequired}
                    onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0A2A66]/30"
                  >
                    {SERVICES_DATA.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                    <option value="Complete Growth Package (Web + SEO + AI)">
                      Complete Growth Package (Web + SEO + AI)
                    </option>
                    <option value="Other / Custom Technical Project">
                      Other / Custom Technical Project
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Budget Expectation
                  </label>
                  <select
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0A2A66]/30"
                  >
                    {budgetOptions.map((opt, i) => (
                      <option key={i} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Brief Project Requirements
                </label>
                <textarea
                  rows={3}
                  value={formData.projectDescription}
                  onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                  placeholder="Outline your timeline, goals, or current bottlenecks..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0A2A66]/30"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Or ask via WhatsApp instead</span>
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#0A2A66] hover:bg-black text-white font-bold text-xs sm:text-sm border border-black shadow flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Quote Request</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

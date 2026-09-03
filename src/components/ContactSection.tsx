import React, { useState } from 'react';
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Phone, 
  Mail, 
  Clock, 
  MapPin, 
  Globe, 
  ShieldCheck,
  MessageSquare,
  Loader2
} from 'lucide-react';
import { SITE_CONFIG, SERVICES_DATA, getWhatsAppUrl } from '../config/siteConfig';

interface ContactSectionProps {
  initialService?: string;
  onInquirySubmitted?: (inquiry: any) => void;
  onTrackAction: (actionType: string, description: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialService,
  onInquirySubmitted,
  onTrackAction
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    serviceRequired: initialService || 'WordPress Website Design',
    budgetRange: '$2,500 - $5,000',
    projectDescription: '',
    preferredContactMethod: 'WhatsApp' as 'Email' | 'WhatsApp' | 'Phone Call'
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

    // Form Validation
    if (!formData.fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }
    if (!formData.projectDescription.trim() || formData.projectDescription.trim().length < 15) {
      setErrorMessage('Please describe your project goals in at least 15 characters so we can understand your requirements.');
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      // 1. Submit to local server API (which stores in database and forwards to FormSubmit)
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit inquiry');
      }

      // 2. Also direct client-side FormSubmit AJAX call as redundancy
      try {
        await fetch('https://formsubmit.co/ajax/salamanimashaun05@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            company: formData.company,
            website: formData.website,
            service: formData.serviceRequired,
            budget: formData.budgetRange,
            preferred_contact: formData.preferredContactMethod,
            message: formData.projectDescription,
            _subject: `New Lead: ${formData.fullName} - ${formData.serviceRequired}`
          })
        });
      } catch (err) {
        // Redundancy call catch
      }

      setSuccess(true);
      onTrackAction('contact_submission', `Submitted contact inquiry for ${formData.serviceRequired}`);
      if (onInquirySubmitted) {
        onInquirySubmitted(data.inquiry);
      }
    } catch (err: any) {
      console.error('Contact form submission error:', err);
      setErrorMessage(err.message || 'An error occurred while submitting your message. Please reach out to us directly on WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppDirect = () => {
    onTrackAction('whatsapp_click', 'Clicked WhatsApp button in Contact Section');
    window.open(getWhatsAppUrl(), '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A2A66]/10 text-[#0A2A66] text-xs font-bold uppercase tracking-wider mb-3">
            Start a Conversation
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0A2A66] font-heading tracking-tight">
            Let's Build Something Exceptional Together
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Tell us about your project, website goals, or operational hurdles. 
            We review every submission carefully and reply within 24 business hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact Channels & Founder Info */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* WhatsApp Priority Card */}
            <div className="bg-gradient-to-br from-emerald-800 to-emerald-950 rounded-2xl p-6 text-white shadow-xl border border-emerald-600/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-300">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-heading text-white">
                    Need an Immediate Answer?
                  </h3>
                  <p className="text-xs text-emerald-200">
                    Direct WhatsApp with Founder Animashaun Abdul Salam
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed mb-5">
                For fast project quotes, urgent site diagnostics, or scoping discussions, 
                our WhatsApp line is available directly.
              </p>

              <button
                id="contact-whatsapp-direct-btn"
                onClick={handleWhatsAppDirect}
                className="w-full py-3 px-4 rounded-xl bg-[#0A2A66] hover:bg-black text-white font-bold text-xs sm:text-sm border border-black shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Open WhatsApp ({SITE_CONFIG.contact.whatsapp})</span>
              </button>
            </div>

            {/* Business Contact Details Card */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#0A2A66]">
                Direct Business Contacts
              </h4>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-start gap-3 text-slate-700">
                  <Mail className="w-4 h-4 text-[#0A2A66] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block text-[11px]">Direct Inquiries:</span>
                    <a 
                      href={`mailto:${SITE_CONFIG.contact.email}`} 
                      className="font-semibold text-[#0A2A66] hover:underline"
                    >
                      {SITE_CONFIG.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-slate-700">
                  <Phone className="w-4 h-4 text-[#0A2A66] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block text-[11px]">Phone / WhatsApp:</span>
                    <span className="font-semibold text-[#0A2A66]">
                      {SITE_CONFIG.contact.whatsapp}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-slate-700">
                  <Clock className="w-4 h-4 text-[#0A2A66] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block text-[11px]">Response Time:</span>
                    <span className="font-medium text-slate-700">
                      Under 24 hours (Usually within 2 hours on WhatsApp)
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-slate-700">
                  <Globe className="w-4 h-4 text-[#0A2A66] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block text-[11px]">Geographic Reach:</span>
                    <span className="font-medium text-slate-700">
                      Nigeria • United States • United Kingdom • Global Remote
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Privacy & Anti-Spam Guarantee */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-50/60 border border-blue-100 text-xs text-slate-600">
              <ShieldCheck className="w-5 h-5 text-blue-700 shrink-0" />
              <span>
                Your details are delivered securely to <strong>salamanimashaun05@gmail.com</strong>. We never share or sell your information.
              </span>
            </div>

          </div>

          {/* Right Column: Full Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              
              {success ? (
                <div 
                  id="contact-success-state"
                  className="py-12 text-center space-y-4 animate-in fade-in"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-[#0A2A66] font-heading">
                    Thank You! Inquiry Received.
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Your project details have been successfully transmitted to founder <strong>Animashaun Abdul Salam</strong>. 
                    We are reviewing your submission and will get back to you via your preferred method shortly.
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={handleWhatsAppDirect}
                      className="px-5 py-2.5 rounded-xl bg-[#0A2A66] hover:bg-black text-white text-xs sm:text-sm font-bold border border-black shadow transition-all cursor-pointer flex items-center gap-2"
                    >
                      <Phone className="w-4 h-4 text-emerald-400" />
                      <span>Speed up review on WhatsApp</span>
                    </button>

                    <button
                      onClick={() => {
                        setSuccess(false);
                        setFormData({
                          fullName: '',
                          email: '',
                          phone: '',
                          company: '',
                          website: '',
                          serviceRequired: 'WordPress Website Design',
                          budgetRange: '$2,500 - $5,000',
                          projectDescription: '',
                          preferredContactMethod: 'WhatsApp'
                        });
                      }}
                      className="px-4 py-2.5 rounded-xl border border-black/30 text-slate-700 hover:bg-white text-xs font-semibold cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form id="sammex-contact-form" onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-slate-200 pb-3 mb-2">
                    <h3 className="text-lg font-bold text-[#0A2A66] font-heading">
                      Request a Project Quote or Consultation
                    </h3>
                    <p className="text-xs text-slate-500">
                      Fill out the form below. Required fields marked with *
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Johnathan Davis"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0A2A66]/30 focus:border-[#0A2A66]"
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
                        placeholder="e.g. john@yourcompany.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0A2A66]/30 focus:border-[#0A2A66]"
                      />
                    </div>
                  </div>

                  {/* Phone & Company Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone / WhatsApp Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. +1 (555) 000-0000 or +234..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0A2A66]/30 focus:border-[#0A2A66]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Company / Business Name
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Apex Health Ltd"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0A2A66]/30 focus:border-[#0A2A66]"
                      />
                    </div>
                  </div>

                  {/* Website & Service Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Current Website (if applicable)
                      </label>
                      <input
                        type="url"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        placeholder="https://example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0A2A66]/30 focus:border-[#0A2A66]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Service Required *
                      </label>
                      <select
                        value={formData.serviceRequired}
                        onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0A2A66]/30 focus:border-[#0A2A66]"
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
                  </div>

                  {/* Budget Range & Contact Preference */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Approximate Budget Range
                      </label>
                      <select
                        value={formData.budgetRange}
                        onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0A2A66]/30 focus:border-[#0A2A66]"
                      >
                        {budgetOptions.map((opt, i) => (
                          <option key={i} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Preferred Contact Method
                      </label>
                      <div className="grid grid-cols-3 gap-2 mt-1">
                        {(['WhatsApp', 'Email', 'Phone Call'] as const).map((method) => (
                          <button
                            type="button"
                            key={method}
                            onClick={() => setFormData({ ...formData, preferredContactMethod: method })}
                            className={`py-2 px-2 text-center text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                              formData.preferredContactMethod === method
                                ? 'bg-[#0A2A66] text-white border-black font-bold shadow-sm'
                                : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-100'
                            }`}
                          >
                            {method}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Project Description */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Project Goals & Description *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.projectDescription}
                      onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                      placeholder="Please share what you are looking to build or improve, your timeline, target audience, or specific challenges you want solved..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0A2A66]/30 focus:border-[#0A2A66]"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      id="contact-submit-btn"
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 px-6 rounded-xl bg-[#0A2A66] hover:bg-black text-white font-extrabold text-sm sm:text-base border border-black shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Transmitting to Sammex Solution...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Project Request</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

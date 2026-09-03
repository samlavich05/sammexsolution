import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TrustValuesSection } from './components/TrustValuesSection';
import { ServicesSection } from './components/ServicesSection';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { PortfolioSection } from './components/PortfolioSection';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { CaseStudyModal } from './components/CaseStudyModal';
import { AboutSection } from './components/AboutSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Chatbot } from './components/Chatbot';
import { QuoteModal } from './components/QuoteModal';
import { AuthModal } from './components/AuthModal';
import { ClientPortal } from './components/ClientPortal';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { ServiceItem, CaseStudy, ClientProfile } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [currentUser, setCurrentUser] = useState<ClientProfile | null>(null);

  // Modals state
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [preSelectedService, setPreSelectedService] = useState<string | undefined>(undefined);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Check persisted user session
  useEffect(() => {
    try {
      const stored = localStorage.getItem('sammex_client_session');
      if (stored) {
        const user = JSON.parse(stored);
        setCurrentUser(user);
      }
    } catch (e) {
      console.warn('Session parse error:', e);
    }
  }, []);

  const handleTrackAction = async (actionType: string, description: string) => {
    try {
      await fetch('/api/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId: currentUser ? currentUser.id : 'guest-visitor',
          actionType,
          description
        })
      });
    } catch (err) {
      // Non-blocking telemetry
    }
  };

  const handleLoginSuccess = (user: ClientProfile) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('sammex_client_session', JSON.stringify(user));
    } catch (e) {}

    if (user.role === 'admin') {
      setCurrentView('admin');
    } else {
      setCurrentView('portal');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    if (currentUser) {
      handleTrackAction('user_logged_out', `${currentUser.fullName} signed out`);
    }
    setCurrentUser(null);
    try {
      localStorage.removeItem('sammex_client_session');
    } catch (e) {}
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenQuote = (serviceName?: string) => {
    setPreSelectedService(serviceName);
    setQuoteModalOpen(true);
    handleTrackAction('quote_modal_opened', `Opened quote modal for: ${serviceName || 'General'}`);
  };

  // Unified layout
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-slate-800 antialiased selection:bg-[#0A2A66] selection:text-white">
      {/* Persistent Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentUser={currentUser}
        onOpenAuth={() => setAuthModalOpen(true)}
        onOpenQuote={handleOpenQuote}
        onTrackAction={handleTrackAction}
      />

      {/* View router */}
      {currentView === 'portal' && currentUser ? (
        <main className="flex-1 bg-slate-50">
          <ClientPortal
            currentUser={currentUser}
            onUpdateUser={(updated) => {
              setCurrentUser(updated);
              try {
                localStorage.setItem('sammex_client_session', JSON.stringify(updated));
              } catch (e) {}
            }}
            onLogout={handleLogout}
            onNavigateHome={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onTrackAction={handleTrackAction}
          />
        </main>
      ) : currentView === 'admin' && currentUser && currentUser.role === 'admin' ? (
        <main className="flex-1 bg-slate-100">
          <AdminDashboard
            currentUser={currentUser}
            onLogout={handleLogout}
            onNavigateHome={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onTrackAction={handleTrackAction}
          />
        </main>
      ) : (
        <main className="flex-1">
          {/* Hero Section */}
          <HeroSection
            onOpenQuote={handleOpenQuote}
            onNavigate={(view) => setCurrentView(view)}
            onTrackAction={handleTrackAction}
          />

          {/* 10 Core Trust & Value Points */}
          <TrustValuesSection />

          {/* High-Performance Services */}
          <ServicesSection
            onSelectServiceModal={(svc) => setSelectedService(svc)}
            onRequestQuoteWithService={(svcName) => handleOpenQuote(svcName)}
            onTrackAction={handleTrackAction}
          />

          {/* Portfolio Showcase */}
          <PortfolioSection
            onSelectCaseStudy={(cs) => setSelectedCaseStudy(cs)}
            onOpenQuote={handleOpenQuote}
            onTrackAction={handleTrackAction}
          />

          {/* In-Depth Commercial Case Studies */}
          <CaseStudiesSection
            onSelectCaseStudy={(cs) => setSelectedCaseStudy(cs)}
            onOpenQuote={handleOpenQuote}
            onTrackAction={handleTrackAction}
          />

          {/* About Founder Animashaun Abdul Salam */}
          <AboutSection
            onOpenQuote={handleOpenQuote}
            onTrackAction={handleTrackAction}
          />

          {/* Client Testimonials */}
          <TestimonialsSection
            onOpenQuote={handleOpenQuote}
          />

          {/* Contact Form & FormSubmit & WhatsApp Hub */}
          <ContactSection
            initialService={preSelectedService}
            onTrackAction={handleTrackAction}
          />
        </main>
      )}

      {/* Footer */}
      <Footer
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenQuote={handleOpenQuote}
        onOpenAuth={() => setAuthModalOpen(true)}
      />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppButton onTrackAction={handleTrackAction} />

      {/* Floating Gemini AI Chatbot */}
      <Chatbot
        onOpenQuote={handleOpenQuote}
        onNavigate={(view) => setCurrentView(view)}
        onTrackAction={handleTrackAction}
      />

      {/* Service Detail Modal */}
      {selectedService && (
        <ServiceDetailModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onRequestService={(svcName) => handleOpenQuote(svcName)}
        />
      )}

      {/* Case Study Deep-Dive Modal */}
      {selectedCaseStudy && (
        <CaseStudyModal
          caseStudy={selectedCaseStudy}
          onClose={() => setSelectedCaseStudy(null)}
          onOpenQuote={(title) => handleOpenQuote(title)}
        />
      )}

      {/* Get a Quote Modal */}
      {quoteModalOpen && (
        <QuoteModal
          isOpen={quoteModalOpen}
          onClose={() => setQuoteModalOpen(false)}
          preSelectedService={preSelectedService}
          onTrackAction={handleTrackAction}
        />
      )}

      {/* Client Portal & Auth Modal */}
      {authModalOpen && (
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
          onTrackAction={handleTrackAction}
        />
      )}
    </div>
  );
}

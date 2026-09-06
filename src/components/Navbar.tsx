import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Phone, 
  ArrowRight, 
  User, 
  ShieldCheck, 
  MessageSquareQuote,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { SITE_CONFIG, getWhatsAppUrl } from '../config/siteConfig';
import { ClientProfile } from '../types';
import { LogoFrame } from './LogoFrame';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  currentUser: ClientProfile | null;
  onOpenAuth: () => void;
  onOpenQuote: (serviceName?: string) => void;
  onTrackAction: (actionType: string, description: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  currentUser,
  onOpenAuth,
  onOpenQuote,
  onTrackAction
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'case-studies', label: 'Case Studies' },
    { id: 'about', label: 'About' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
    onTrackAction('page_visited', `Navigated to ${id} section`);
    
    if (id === 'home' || id === 'services' || id === 'portfolio' || id === 'case-studies' || id === 'about' || id === 'testimonials' || id === 'contact') {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleWhatsAppClick = () => {
    onTrackAction('whatsapp_click', 'Clicked WhatsApp button in Navbar');
    window.open(getWhatsAppUrl(), '_blank', 'noopener,noreferrer');
  };

  return (
    <header 
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#0A2A66]/95 backdrop-blur-md shadow-lg border-b border-white/10 py-3' 
          : 'bg-[#0A2A66] border-b border-white/10 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3">
            <LogoFrame size="md" variant="dark" />
            <button 
              id="nav-brand-logo"
              onClick={() => handleNavClick('home')} 
              className="group text-left cursor-pointer focus:outline-none"
            >
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-white text-lg tracking-tight font-heading group-hover:text-white/90 transition-colors">
                  SAMMEX
                </span>
                <span className="font-semibold text-white/90 text-lg tracking-tight font-heading">
                  SOLUTION
                </span>
              </div>
              <p className="text-[10px] text-slate-300 font-medium tracking-wide uppercase">
                Digital Growth & Web Engineering
              </p>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                  currentView === item.id
                    ? 'text-white bg-white/15 font-bold shadow-sm'
                    : 'text-slate-200 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop Right Actions: Portal & CTAs */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* WhatsApp Direct CTA */}
            <button
              id="nav-whatsapp-btn"
              onClick={handleWhatsAppClick}
              className="px-3 py-2 text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 rounded-lg hover:bg-emerald-900/40 transition-all flex items-center gap-1.5 cursor-pointer"
              title="Chat directly on WhatsApp"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp</span>
            </button>

            {/* Client / Admin Account button */}
            {currentUser ? (
              <button
                id="nav-user-portal-btn"
                onClick={() => {
                  onNavigate(currentUser.role === 'admin' ? 'admin' : 'portal');
                  setMobileMenuOpen(false);
                }}
                className="px-3 py-2 text-xs font-semibold text-white bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                {currentUser.role === 'admin' ? (
                  <ShieldCheck className="w-4 h-4 text-white" />
                ) : (
                  <User className="w-4 h-4 text-white" />
                )}
                <span className="max-w-[110px] truncate">{currentUser.fullName.split(' ')[0]}</span>
              </button>
            ) : (
              <button
                id="nav-login-btn"
                onClick={onOpenAuth}
                className="px-3 py-2 text-xs font-semibold text-slate-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-slate-300" />
                <span>Portal</span>
              </button>
            )}

            {/* Primary CTA: Get a Quote */}
            <button
              id="nav-get-quote-btn"
              onClick={() => onOpenQuote()}
              className="px-4 py-2 text-xs md:text-sm font-bold text-white bg-[#0A2A66] hover:bg-black rounded-lg border border-black shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              id="nav-mobile-quote-btn"
              onClick={() => onOpenQuote()}
              className="sm:hidden px-2.5 py-1.5 text-xs font-bold text-white bg-[#0A2A66] hover:bg-black border border-black rounded-md"
            >
              Quote
            </button>
            <button
              id="nav-mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-200 hover:text-white rounded-lg hover:bg-white/10 focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Animated Dropdown Menu */}
        {mobileMenuOpen && (
          <div 
            id="mobile-nav-drawer" 
            className="lg:hidden mt-3 pt-3 pb-5 border-t border-white/10 animate-in fade-in slide-in-from-top-4 duration-200"
          >
            <div className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    currentView === item.id 
                      ? 'text-white bg-white/20 font-bold' 
                      : 'text-slate-200 hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-white/10 space-y-2.5">
              {currentUser ? (
                <button
                  id="mobile-nav-portal-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate(currentUser.role === 'admin' ? 'admin' : 'portal');
                  }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg bg-white/10 border border-white/20 text-sm font-semibold text-white"
                >
                  <span className="flex items-center gap-2">
                    {currentUser.role === 'admin' ? <ShieldCheck className="w-4 h-4 text-white" /> : <User className="w-4 h-4 text-white" />}
                    {currentUser.role === 'admin' ? 'Admin Dashboard' : 'Client Portal'} ({currentUser.fullName.split(' ')[0]})
                  </span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              ) : (
                <button
                  id="mobile-nav-signin-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-white/10 text-white text-sm font-medium"
                >
                  <User className="w-4 h-4 text-slate-300" />
                  Client Portal & Login
                </button>
              )}

              <button
                id="mobile-nav-whatsapp-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleWhatsAppClick();
                }}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-sm font-semibold transition-colors"
              >
                <Phone className="w-4 h-4" />
                Chat with Animashaun on WhatsApp
              </button>

              <button
                id="mobile-nav-quote-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuote();
                }}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-[#0A2A66] hover:bg-black text-white text-sm font-bold border border-black shadow-md transition-colors"
              >
                <MessageSquareQuote className="w-4 h-4 text-white" />
                Get a Free Quote & Proposal
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

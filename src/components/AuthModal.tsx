import React, { useState } from 'react';
import { 
  X, 
  User, 
  Lock, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  AlertCircle,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { ClientProfile } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: ClientProfile) => void;
  onTrackAction: (actionType: string, description: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  onTrackAction
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/signup';
      const payload = mode === 'login' 
        ? { email, password }
        : { email, password, fullName, company, phone };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      onTrackAction('user_logged_in', `${data.user.role === 'admin' ? 'Admin' : 'Client'} logged in: ${data.user.fullName}`);
      onLoginSuccess(data.user);
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoLogin = async (userType: 'client' | 'admin') => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const demoEmail = userType === 'admin' ? 'admin@sammexsolution.com' : 'sarah@luminahealth.com';
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: demoEmail, password: 'password123' })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Demo login failed');

      onTrackAction('user_logged_in', `Logged in via Quick Demo as ${data.user.fullName} (${data.user.role})`);
      onLoginSuccess(data.user);
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Could not log in to demo account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      id="auth-portal-modal"
      className="fixed inset-0 z-50 overflow-y-auto bg-[#06183B]/80 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#0A2A66] p-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-300 hover:text-white rounded-full hover:bg-white/10"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 rounded-xl bg-white mx-auto mb-3 flex items-center justify-center shadow-md">
            <User className="w-6 h-6 text-[#0A2A66]" />
          </div>

          <h3 className="text-xl font-extrabold font-heading text-white">
            {mode === 'login' ? 'Sammex Client Portal' : 'Create Client Account'}
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Access project milestones, invoices, direct activity logs, and technical deliverables.
          </p>
        </div>

        {/* Quick Demo Logins Bar */}
        <div className="bg-slate-100 p-3.5 border-b border-slate-200">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 text-center">
            One-Click Instant Demo Access
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('client')}
              disabled={loading}
              className="px-2.5 py-1.5 rounded-lg bg-[#0A2A66] hover:bg-black border border-black text-[11px] font-semibold text-white flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-white" />
              <span>Client Demo</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoLogin('admin')}
              disabled={loading}
              className="px-2.5 py-1.5 rounded-lg bg-[#0A2A66] hover:bg-black border border-black text-[11px] font-semibold text-white flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-white" />
              <span>Admin Demo</span>
            </button>
          </div>
        </div>

        {/* Auth Form */}
        <div className="p-6 space-y-4">
          {errorMessage && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {mode === 'signup' && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. David Vance"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0A2A66]/30"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Vance Logistics"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0A2A66]/30"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 555 123 4567"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0A2A66]/30"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0A2A66]/30"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password *
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0A2A66]/30"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#0A2A66] hover:bg-black text-white font-bold text-xs sm:text-sm border border-black shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>{mode === 'login' ? 'Sign In to Portal' : 'Create Account'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Toggle between Login and Signup */}
          <div className="pt-3 text-center text-xs text-slate-500 border-t border-slate-100">
            {mode === 'login' ? (
              <p>
                Don't have an active client profile?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="font-bold text-[#0A2A66] hover:underline"
                >
                  Create one now
                </button>
              </p>
            ) : (
              <p>
                Already have a client account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="font-bold text-[#0A2A66] hover:underline"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

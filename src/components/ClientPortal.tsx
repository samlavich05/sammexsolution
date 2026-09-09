import React, { useState, useEffect } from 'react';
import { 
  User, 
  Settings, 
  Clock, 
  CreditCard, 
  Activity, 
  CheckCircle2, 
  AlertCircle, 
  Phone, 
  LogOut, 
  ExternalLink,
  Edit3,
  Save,
  FileText,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { ClientProfile, TransactionRecord, ClientActivity } from '../types';
import { SITE_CONFIG, getWhatsAppUrl } from '../config/siteConfig';

interface ClientPortalProps {
  currentUser: ClientProfile;
  onUpdateUser: (user: ClientProfile) => void;
  onLogout: () => void;
  onNavigateHome: () => void;
  onTrackAction: (actionType: string, description: string) => void;
}

export const ClientPortal: React.FC<ClientPortalProps> = ({
  currentUser,
  onUpdateUser,
  onLogout,
  onNavigateHome,
  onTrackAction
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'profile' | 'projects' | 'activity'>('overview');
  const [transactions, setTransactions] = useState<TransactionRecord[]>([]);
  const [activities, setActivities] = useState<ClientActivity[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  // Profile Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [profileForm, setProfileForm] = useState({
    fullName: currentUser.fullName,
    company: currentUser.company || '',
    phone: currentUser.phone || '',
    businessType: currentUser.businessType || 'Healthcare & Wellness',
    website: currentUser.website || '',
    location: currentUser.location || '',
    servicesInterestedIn: currentUser.servicesInterestedIn || ['WordPress Website Design', 'SEO & GEO'],
    projectNotes: currentUser.projectNotes || '',
    preferredCommunication: currentUser.preferredCommunication || 'WhatsApp'
  });
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    fetchClientData();
  }, [currentUser.id]);

  const fetchClientData = async () => {
    setLoadingData(true);
    try {
      // Fetch Transactions
      const txRes = await fetch(`/api/transactions?clientId=${currentUser.id}`);
      const txData = await txRes.json();
      if (txData && txData.transactions) {
        setTransactions(txData.transactions);
      } else if (Array.isArray(txData)) {
        setTransactions(txData);
      }

      // Fetch Activities
      const actRes = await fetch(`/api/activities?clientId=${currentUser.id}`);
      const actData = await actRes.json();
      if (actData && actData.activities) {
        setActivities(actData.activities);
      } else if (Array.isArray(actData)) {
        setActivities(actData);
      }
    } catch (err) {
      console.error('Error fetching client portal data:', err);
    } finally {
      setLoadingData(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: currentUser.id,
          ...profileForm
        })
      });
      const data = await res.json();
      if (res.ok && data.user) {
        onUpdateUser(data.user);
        setIsEditing(false);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
        onTrackAction('profile_update', 'Updated client profile information');
        fetchClientData();
      }
    } catch (err) {
      console.error('Failed to update profile:', err);
    }
  };

  const handleWhatsAppProjectSupport = () => {
    const text = `Hi Animashaun, this is ${currentUser.fullName} (${currentUser.company || 'Client'}). I am checking in from the Sammex Client Portal regarding my project.`;
    onTrackAction('whatsapp_click', 'Clicked Project Support WhatsApp from Portal');
    window.open(getWhatsAppUrl(text), '_blank', 'noopener,noreferrer');
  };

  return (
    <div id="client-portal-view" className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={onNavigateHome}
              className="p-2 rounded-xl text-slate-400 hover:text-[#0A2A66] hover:bg-slate-100 transition-colors"
              title="Return to Public Website"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="w-14 h-14 rounded-2xl bg-[#0A2A66] text-white font-bold text-xl flex items-center justify-center shadow overflow-hidden">
              {currentUser.avatarUrl ? (
                <img 
                  src={currentUser.avatarUrl} 
                  alt={currentUser.fullName} 
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLElement).style.display = 'none';
                  }}
                  className="w-full h-full object-cover rounded-2xl" 
                />
              ) : (
                currentUser.fullName.split(' ').map(n => n[0]).join('')
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#0A2A66] font-heading">
                  {currentUser.fullName}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#0A2A66] text-white">
                  Active Client
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {currentUser.company || 'Organization'} • {currentUser.email}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleWhatsAppProjectSupport}
              className="px-4 py-2 rounded-xl bg-[#0A2A66] hover:bg-black text-white text-xs font-bold border border-black shadow-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Project Support Line</span>
            </button>

            <button
              onClick={onLogout}
              className="px-4 py-2 rounded-xl border border-black/20 text-slate-600 hover:bg-slate-100 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 mb-8 space-x-2 sm:space-x-8 overflow-x-auto pb-1">
          {[
            { id: 'overview', label: 'Client Overview', icon: <Activity className="w-4 h-4" /> },
            { id: 'projects', label: 'Projects & Milestones', icon: <CreditCard className="w-4 h-4" /> },
            { id: 'profile', label: 'Business Profile', icon: <User className="w-4 h-4" /> },
            { id: 'activity', label: 'Activity Logs', icon: <Clock className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 py-3 px-3 border-b-2 font-bold text-xs sm:text-sm whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'border-[#0A2A66] text-[#0A2A66]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in">
            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Active Projects
                </div>
                <div className="text-3xl font-extrabold text-[#0A2A66] font-heading">
                  {transactions.filter(t => t.projectStatus !== 'Completed').length || 1}
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  In progress or review with Sammex Solution
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Total Value Contracted
                </div>
                <div className="text-3xl font-extrabold text-[#0A2A66] font-heading">
                  ${transactions.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}
                </div>
                <p className="text-xs text-emerald-600 font-semibold mt-2">
                  Verified invoices & deliverables
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Assigned Director
                </div>
                <div className="text-xl font-bold text-[#0A2A66] font-heading mt-1">
                  {SITE_CONFIG.founderName}
                </div>
                <p className="text-xs text-slate-500 font-semibold mt-1">
                  Direct WhatsApp Available 24/7
                </p>
              </div>
            </div>

            {/* Current Project Highlight */}
            <div className="bg-[#0A2A66] rounded-2xl p-6 sm:p-8 text-white shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-white text-[#0A2A66]">
                    Current Engagement
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-heading text-white mt-2">
                    {transactions[0]?.serviceName || 'Custom WordPress Platform & GEO Suite'}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1">
                    Reference ID: <span className="font-mono text-white font-semibold">{transactions[0]?.orderReference || 'SAM-2026-081'}</span>
                  </p>
                </div>

                <div className="text-left md:text-right">
                  <div className="text-xs text-slate-300">Phase Status</div>
                  <div className="text-lg font-bold text-emerald-400">
                    {transactions[0]?.projectStatus || 'QA & Performance Audit'}
                  </div>
                </div>
              </div>

              {/* Progress Milestones Tracker */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <div className="text-xs font-semibold text-slate-300">Milestone Pipeline:</div>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-white/10 border border-emerald-400/40 text-emerald-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>1. Architecture & UX</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/10 border border-emerald-400/40 text-emerald-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>2. WordPress Build</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/15 border border-white/60 text-white flex items-center gap-2 font-bold">
                    <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                    <span>3. Speed & GEO Schema</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 flex items-center gap-2">
                    <span>4. Production Launch</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity Log Snapshot */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-[#0A2A66] font-heading">
                  Recent Project Activities
                </h3>
                <button
                  onClick={() => setActiveTab('activity')}
                  className="text-xs font-bold text-[#0A2A66] hover:underline"
                >
                  View full timeline
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {activities.slice(0, 4).map((act) => (
                  <div key={act.id} className="py-3 flex items-start justify-between gap-4 text-xs">
                    <div>
                      <span className="font-semibold text-slate-800">{act.description}</span>
                      <p className="text-[11px] text-slate-400">{new Date(act.timestamp).toLocaleString()}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono text-[10px]">
                      {act.actionType}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PROJECTS & MILESTONES */}
        {activeTab === 'projects' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#0A2A66] font-heading">
                  Project Ledger & Transactions
                </h3>
                <p className="text-xs text-slate-500">
                  All contracted services, invoices, and milestones associated with your business.
                </p>
              </div>
              <button
                onClick={handleWhatsAppProjectSupport}
                className="px-4 py-2 rounded-xl bg-[#0A2A66] hover:bg-black text-white text-xs font-bold border border-black shadow transition-all cursor-pointer"
              >
                Request New Scope
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                    <th className="p-3.5">Reference ID</th>
                    <th className="p-3.5">Service Description</th>
                    <th className="p-3.5">Date</th>
                    <th className="p-3.5">Amount</th>
                    <th className="p-3.5">Project Status</th>
                    <th className="p-3.5">Payment</th>
                    <th className="p-3.5">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-50/80">
                      <td className="p-3.5 font-mono font-bold text-[#0A2A66]">{tx.orderReference}</td>
                      <td className="p-3.5 font-semibold text-slate-800">{tx.serviceName}</td>
                      <td className="p-3.5 text-slate-500">{tx.date}</td>
                      <td className="p-3.5 font-bold text-[#0A2A66]">${tx.amount.toLocaleString()}</td>
                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          tx.projectStatus === 'Completed' 
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {tx.projectStatus}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          tx.paymentStatus === 'Paid'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {tx.paymentStatus}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-600 max-w-xs truncate">{tx.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: BUSINESS PROFILE */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm max-w-3xl animate-in fade-in">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-[#0A2A66] font-heading">
                  Client Profile & Preferences
                </h3>
                <p className="text-xs text-slate-500">
                  Keep your company records and preferred contact details synchronized.
                </p>
              </div>

              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 rounded-xl bg-[#0A2A66] hover:bg-black text-white text-xs font-bold border border-black flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5 text-white" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>

            {saveSuccess && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Your profile changes have been saved successfully!</span>
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={profileForm.fullName}
                    onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm bg-slate-50 disabled:bg-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Company</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={profileForm.company}
                    onChange={(e) => setProfileForm({ ...profileForm, company: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm bg-slate-50 disabled:bg-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    disabled={!isEditing}
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm bg-slate-50 disabled:bg-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Website URL</label>
                  <input
                    type="url"
                    disabled={!isEditing}
                    value={profileForm.website}
                    onChange={(e) => setProfileForm({ ...profileForm, website: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm bg-slate-50 disabled:bg-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Business Industry / Type</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={profileForm.businessType}
                    onChange={(e) => setProfileForm({ ...profileForm, businessType: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm bg-slate-50 disabled:bg-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Location / HQ</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={profileForm.location}
                    onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm bg-slate-50 disabled:bg-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Strategic Project Notes
                </label>
                <textarea
                  rows={3}
                  disabled={!isEditing}
                  value={profileForm.projectNotes}
                  onChange={(e) => setProfileForm({ ...profileForm, projectNotes: e.target.value })}
                  placeholder="Notes on goals, upcoming marketing campaigns..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm bg-slate-50 disabled:bg-slate-100"
                />
              </div>

              {isEditing && (
                <div className="pt-3 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 rounded-xl border border-slate-300 text-slate-600 text-xs font-semibold"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-[#0A2A66] hover:bg-black text-white text-xs font-bold border border-black shadow flex items-center gap-1.5 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Profile</span>
                  </button>
                </div>
              )}
            </form>
          </div>
        )}

        {/* TAB 4: ACTIVITY LOGS */}
        {activeTab === 'activity' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm animate-in fade-in">
            <h3 className="text-lg font-bold text-[#0A2A66] font-heading mb-1">
              Client Activity Audit Trail
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              A transparent timeline of your sessions, inquiries submitted, and communication interactions.
            </p>

            <div className="space-y-4">
              {activities.map((act) => (
                <div key={act.id} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                  <div className="p-2 rounded-lg bg-[#0A2A66]/10 text-[#0A2A66] mt-0.5">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-800">{act.description}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{new Date(act.timestamp).toLocaleString()}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white text-slate-600 border border-slate-200">
                    {act.actionType}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

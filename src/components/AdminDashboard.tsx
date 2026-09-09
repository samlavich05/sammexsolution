import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Users, 
  Inbox, 
  CreditCard, 
  Download, 
  Phone, 
  Mail, 
  ArrowLeft, 
  LogOut, 
  Search, 
  CheckCircle2, 
  Clock, 
  FileSpreadsheet, 
  FileText,
  TrendingUp,
  Filter,
  Plus,
  Image as ImageIcon,
  Lock,
  Camera,
  RefreshCw
} from 'lucide-react';
import { ClientProfile, InquirySubmission, TransactionRecord, ClientActivity } from '../types';
import { SITE_CONFIG, getWhatsAppUrl } from '../config/siteConfig';
import { useBrandLogo } from '../context/LogoContext';
import { useFounderImage } from '../context/FounderImageContext';

interface AdminDashboardProps {
  currentUser: ClientProfile;
  onLogout: () => void;
  onNavigateHome: () => void;
  onTrackAction: (actionType: string, description: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentUser,
  onLogout,
  onNavigateHome,
  onTrackAction
}) => {
  const [activeTab, setActiveTab] = useState<'inquiries' | 'clients' | 'transactions' | 'export' | 'brand-media'>('inquiries');
  const { logoUrl, openModal: openLogoModal, updateLogo } = useBrandLogo();
  const { imageUrl: founderImageUrl, openModal: openFounderModal, updateImage: updateFounderImage } = useFounderImage();
  const [inquiries, setInquiries] = useState<InquirySubmission[]>([]);
  const [clients, setClients] = useState<ClientProfile[]>([]);
  const [transactions, setTransactions] = useState<TransactionRecord[]>([]);
  const [activities, setActivities] = useState<ClientActivity[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Transaction form state
  const [newTxModalOpen, setNewTxModalOpen] = useState(false);
  const [newTx, setNewTx] = useState({
    clientId: 'client-sarah-jenkins',
    serviceName: 'WordPress Website Design',
    amount: 3500,
    projectStatus: 'In Progress' as const,
    paymentStatus: 'Partial' as const,
    notes: 'Initial deposit paid; Figma designs approved'
  });

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [inqRes, txRes, actRes] = await Promise.all([
        fetch('/api/inquiries'),
        fetch('/api/transactions'),
        fetch('/api/activities')
      ]);

      const inqData = await inqRes.json();
      const txData = await txRes.json();
      const actData = await actRes.json();

      if (inqData && inqData.inquiries) setInquiries(inqData.inquiries);
      else if (Array.isArray(inqData)) setInquiries(inqData);

      if (txData && txData.transactions) setTransactions(txData.transactions);
      else if (Array.isArray(txData)) setTransactions(txData);

      if (actData && actData.activities) setActivities(actData.activities);
      else if (Array.isArray(actData)) setActivities(actData);

      // Seed standard clients list
      setClients([
        {
          id: 'client-sarah-jenkins',
          email: 'sarah@luminahealth.com',
          fullName: 'Dr. Sarah Jenkins',
          role: 'client',
          company: 'Lumina Health Clinic',
          businessType: 'Private Medical Care',
          phone: '+1 (415) 890-4421',
          website: 'https://luminahealthclinic.com',
          location: 'San Francisco, CA',
          servicesInterestedIn: ['WordPress Website Design', 'SEO & GEO'],
          projectNotes: 'Prioritizing sub-second mobile page loads and Generative Engine Optimization for local clinic queries.',
          createdAt: '2026-02-14'
        },
        {
          id: 'client-marcus-adebayo',
          email: 'marcus@solarenergyafrica.org',
          fullName: 'Marcus Adebayo',
          role: 'client',
          company: 'SunPower Africa',
          businessType: 'Clean Energy Engineering',
          phone: '+234 803 219 0941',
          website: 'https://sunpowerafrica.org',
          location: 'Lagos, Nigeria',
          servicesInterestedIn: ['Shopify Store Design', 'AI Automation'],
          projectNotes: 'n8n integration with WhatsApp to dispatch instant quotes to commercial energy prospects.',
          createdAt: '2026-02-28'
        }
      ]);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateInquiryStatus = async (id: string, newStatus: any) => {
    try {
      const res = await fetch(`/api/inquiries/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status: newStatus } : inq));
        onTrackAction('inquiry_status_updated', `Updated inquiry ${id} status to ${newStatus}`);
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleCreateTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTx)
      });
      const data = await res.json();
      if (res.ok && data.transaction) {
        setTransactions(prev => [data.transaction, ...prev]);
        setNewTxModalOpen(false);
        onTrackAction('transaction_created', `Added transaction for ${newTx.serviceName}`);
      }
    } catch (err) {
      console.error('Error adding transaction:', err);
    }
  };

  const handleExport = (format: 'csv' | 'excel') => {
    onTrackAction('data_exported', `Admin exported client records in ${format.toUpperCase()}`);
    window.location.href = `/api/export/${format}`;
  };

  const totalRevenue = transactions.reduce((acc, curr) => acc + curr.amount, 0);

  const filteredInquiries = inquiries.filter(inq => 
    inq.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inq.serviceRequired.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div id="admin-dashboard-view" className="min-h-screen bg-slate-100 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0A2A66] rounded-2xl p-6 text-white shadow-xl mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={onNavigateHome}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Return to Public Website"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="w-14 h-14 rounded-2xl bg-white text-[#0A2A66] flex items-center justify-center font-extrabold text-2xl shadow">
              <ShieldCheck className="w-8 h-8 text-[#0A2A66]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold font-heading text-white">
                  Sammex Executive Dashboard
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-white text-[#0A2A66]">
                  FOUNDER / ADMIN
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Directed by {SITE_CONFIG.founderName} • Operations & Lead Hub
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleExport('csv')}
              className="px-3.5 py-2 rounded-xl bg-[#0A2A66] hover:bg-black text-white text-xs font-semibold flex items-center gap-1.5 border border-black transition-colors cursor-pointer shadow-sm"
            >
              <Download className="w-4 h-4 text-white" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={() => handleExport('excel')}
              className="px-3.5 py-2 rounded-xl bg-[#0A2A66] hover:bg-black text-white text-xs font-semibold flex items-center gap-1.5 border border-black transition-colors cursor-pointer shadow-sm"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>Export Excel</span>
            </button>

            <button
              onClick={onLogout}
              className="px-3.5 py-2 rounded-xl bg-rose-600/30 hover:bg-rose-600 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Top 4 Business Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
              <span>Total Inquiries</span>
              <Inbox className="w-4 h-4 text-[#0A2A66]" />
            </div>
            <div className="text-3xl font-extrabold text-[#0A2A66] font-heading">
              {inquiries.length}
            </div>
            <div className="text-xs text-emerald-600 font-semibold mt-1">
              {inquiries.filter(i => i.status === 'new').length} pending response
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
              <span>Active Clients</span>
              <Users className="w-4 h-4 text-[#0A2A66]" />
            </div>
            <div className="text-3xl font-extrabold text-[#0A2A66] font-heading">
              {clients.length}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Across Healthcare & Solar
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
              <span>Revenue Tracked</span>
              <CreditCard className="w-4 h-4 text-[#0A2A66]" />
            </div>
            <div className="text-3xl font-extrabold text-[#0A2A66] font-heading">
              ${totalRevenue.toLocaleString()}
            </div>
            <div className="text-xs text-emerald-600 font-semibold mt-1">
              100% verified contracts
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
              <span>Conversion Rate</span>
              <TrendingUp className="w-4 h-4 text-[#0A2A66]" />
            </div>
            <div className="text-3xl font-extrabold text-[#0A2A66] font-heading">
              34.8%
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Lead-to-client velocity
            </div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-200 mb-8 space-x-3 sm:space-x-8 overflow-x-auto">
          {[
            { id: 'inquiries', label: `Inquiries (${inquiries.length})`, icon: <Inbox className="w-4 h-4" /> },
            { id: 'clients', label: `Clients (${clients.length})`, icon: <Users className="w-4 h-4" /> },
            { id: 'transactions', label: `Projects & Payments (${transactions.length})`, icon: <CreditCard className="w-4 h-4" /> },
            { id: 'export', label: 'Export & Activity Logs', icon: <Download className="w-4 h-4" /> },
            { id: 'brand-media', label: 'Brand & Media Assets', icon: <ImageIcon className="w-4 h-4" /> }
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

        {/* TAB 1: INQUIRIES */}
        {activeTab === 'inquiries' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search leads by name, email, service..."
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0A2A66]/30"
                />
              </div>

              <div className="text-xs text-slate-500">
                Connected to FormSubmit: <span className="font-mono text-[#0A2A66] font-semibold">{SITE_CONFIG.contact.email}</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                    <th className="p-3.5">Prospect Name</th>
                    <th className="p-3.5">Contact Details</th>
                    <th className="p-3.5">Service & Budget</th>
                    <th className="p-3.5">Project Brief</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Direct Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredInquiries.map((inq) => (
                    <tr key={inq.id} className="hover:bg-slate-50/80">
                      <td className="p-3.5 font-bold text-[#0A2A66]">
                        {inq.fullName}
                        {inq.company && (
                          <span className="block text-[11px] font-normal text-slate-500">
                            {inq.company}
                          </span>
                        )}
                      </td>
                      <td className="p-3.5">
                        <div className="text-slate-700">{inq.email}</div>
                        {inq.phone && (
                          <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                            {inq.phone}
                          </div>
                        )}
                      </td>
                      <td className="p-3.5">
                        <div className="font-semibold text-slate-800">{inq.serviceRequired}</div>
                        <div className="text-[11px] text-slate-500">{inq.budgetRange}</div>
                      </td>
                      <td className="p-3.5 max-w-xs text-slate-600 truncate">
                        {inq.projectDescription}
                      </td>
                      <td className="p-3.5">
                        <select
                          value={inq.status}
                          onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value)}
                          className={`px-2 py-1 rounded-lg text-[11px] font-bold border ${
                            inq.status === 'new' ? 'bg-amber-50 text-amber-800 border-amber-300' :
                            inq.status === 'contacted' ? 'bg-blue-50 text-blue-800 border-blue-300' :
                            inq.status === 'in-progress' ? 'bg-purple-50 text-purple-800 border-purple-300' :
                            'bg-emerald-50 text-emerald-800 border-emerald-300'
                          }`}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="in-progress">In Progress</option>
                          <option value="closed">Closed / Won</option>
                        </select>
                      </td>
                      <td className="p-3.5 text-right space-x-2">
                        {inq.phone && (
                          <button
                            onClick={() => {
                              const text = `Hi ${inq.fullName}, this is Animashaun Abdul Salam from Sammex Solution regarding your inquiry for ${inq.serviceRequired}.`;
                              window.open(getWhatsAppUrl(text), '_blank');
                            }}
                            className="p-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 transition-colors inline-block"
                            title="Reply on WhatsApp"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <a
                          href={`mailto:${inq.email}?subject=Regarding Your Sammex Solution Inquiry - ${inq.serviceRequired}`}
                          className="p-1.5 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-800 transition-colors inline-block"
                          title="Reply via Email"
                        >
                          <Mail className="w-3.5 h-3.5" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: CLIENTS */}
        {activeTab === 'clients' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {clients.map((c) => (
              <div key={c.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#0A2A66] text-white font-bold flex items-center justify-center text-lg">
                    {c.fullName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#0A2A66] font-heading">{c.fullName}</h4>
                    <p className="text-xs text-slate-500">{c.company} • {c.businessType}</p>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl">
                  <div><strong>Email:</strong> {c.email}</div>
                  <div><strong>Phone:</strong> {c.phone}</div>
                  <div><strong>Website:</strong> <a href={c.website} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">{c.website}</a></div>
                  <div><strong>Location:</strong> {c.location}</div>
                </div>

                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Project Scope Notes
                  </div>
                  <p className="text-xs text-slate-700 italic bg-amber-50/70 p-2.5 rounded-lg border border-amber-200/50">
                    "{c.projectNotes}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: TRANSACTIONS & PROJECTS */}
        {activeTab === 'transactions' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#0A2A66] font-heading">
                  All Client Projects & Financial Records
                </h3>
                <p className="text-xs text-slate-500">
                  Track project milestone deliveries and invoice payments.
                </p>
              </div>

              <button
                onClick={() => setNewTxModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-[#0A2A66] hover:bg-black text-white text-xs font-bold border border-black shadow flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4 text-white" />
                <span>New Project / Invoice</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                    <th className="p-3.5">Reference ID</th>
                    <th className="p-3.5">Client</th>
                    <th className="p-3.5">Service</th>
                    <th className="p-3.5">Amount</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5">Payment</th>
                    <th className="p-3.5">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-50/80">
                      <td className="p-3.5 font-mono font-bold text-[#0A2A66]">{tx.orderReference}</td>
                      <td className="p-3.5 font-semibold text-slate-800">{tx.clientId}</td>
                      <td className="p-3.5 text-slate-700">{tx.serviceName}</td>
                      <td className="p-3.5 font-bold text-[#0A2A66]">${tx.amount.toLocaleString()}</td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                          {tx.projectStatus}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {tx.paymentStatus}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-500">{tx.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: EXPORT & AUDIT */}
        {activeTab === 'export' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-[#0A2A66] font-heading mb-2">
                Download Client & Transaction Records
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-6">
                Generate clean, formatted spreadsheets for accounting, tax filings, or offline CRM ingestion.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
                <button
                  onClick={() => handleExport('csv')}
                  className="p-4 rounded-xl border border-slate-300 hover:border-[#0A2A66] bg-slate-50 hover:bg-slate-100 transition-all flex items-center gap-3 cursor-pointer text-left"
                >
                  <div className="p-2.5 rounded-lg bg-[#0A2A66] text-white">
                    <Download className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0A2A66]">CSV Format (.csv)</h4>
                    <p className="text-xs text-slate-500">Universal comma-separated spreadsheet file</p>
                  </div>
                </button>

                <button
                  onClick={() => handleExport('excel')}
                  className="p-4 rounded-xl border border-emerald-300 hover:border-emerald-600 bg-emerald-50/50 hover:bg-emerald-50 transition-all flex items-center gap-3 cursor-pointer text-left"
                >
                  <div className="p-2.5 rounded-lg bg-emerald-600 text-white">
                    <FileSpreadsheet className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-emerald-900">Excel Format (.xls)</h4>
                    <p className="text-xs text-emerald-700">Native Microsoft Excel compatible XML</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Global Activity Timeline */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h3 className="text-base font-bold text-[#0A2A66] font-heading mb-4">
                Real-Time Platform Activity Feed
              </h3>
              <div className="space-y-3">
                {activities.map((act) => (
                  <div key={act.id} className="flex items-start justify-between gap-4 p-3 rounded-xl bg-slate-50 text-xs">
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                      <div>
                        <span className="font-semibold text-slate-800">{act.description}</span>
                        <div className="text-[10px] text-slate-400">{new Date(act.timestamp).toLocaleString()}</div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-white border border-slate-200 text-slate-600">
                      {act.actionType}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: BRAND & MEDIA ASSETS (PERMANENT DEPLOYMENT CONTROLS) */}
        {activeTab === 'brand-media' && (
          <div className="space-y-6">
            {/* Security & Deployment Status Banner */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-emerald-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 shrink-0">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-emerald-950 font-heading">
                    Permanent Production Assets & Deployment Lockdown Active
                  </h4>
                  <p className="text-xs text-emerald-800 mt-0.5">
                    Image frames across the public website (Navbar, Footer, Hero, About Section, and WhatsApp) are permanently locked. Public visitors cannot edit, upload, or tamper with any image.
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-200 text-emerald-900 shrink-0 border border-emerald-300">
                Locked on Public Site
              </span>
            </div>

            {/* Asset Management Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Brand Logo Card */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-[#0A2A66]" />
                    <h4 className="text-sm font-bold text-[#0A2A66] font-heading">
                      Official Sammex Brand Logo
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                    /brand/logo.jpg
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  {/* Live Display Frame */}
                  <div className="w-20 h-20 rounded-2xl bg-[#0A2A66] border-2 border-[#0A2A66] p-1 shadow-md flex items-center justify-center shrink-0">
                    {logoUrl ? (
                      <img 
                        src={logoUrl} 
                        alt="Sammex Solution Brand Logo" 
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.currentTarget as HTMLElement).style.display = 'none';
                        }}
                        className="w-full h-full object-contain rounded-xl"
                      />
                    ) : (
                      <span className="text-white font-black text-xl font-heading">S</span>
                    )}
                  </div>
                  <div className="text-xs space-y-1 text-center sm:text-left">
                    <p className="font-bold text-slate-800">Sammex Solution Vector Logo</p>
                    <p className="text-slate-500 text-[11px]">
                      Permanent across Navbar, Footer, and Client Portal headers.
                    </p>
                    <p className="text-emerald-700 text-[11px] font-semibold flex items-center gap-1 justify-center sm:justify-start">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Static file bundled in production
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    onClick={() => {
                      openLogoModal();
                      onTrackAction('admin_media_edit', 'Opened logo customizer from admin dashboard');
                    }}
                    className="px-4 py-2 rounded-xl bg-[#0A2A66] hover:bg-black text-white text-xs font-bold border border-black shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Change Permanent Logo</span>
                  </button>
                  <button
                    onClick={() => {
                      updateLogo(SITE_CONFIG.brandLogoUrl);
                      onTrackAction('admin_media_reset', 'Reset brand logo to default bundled asset');
                    }}
                    className="px-3.5 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset to Bundled Asset</span>
                  </button>
                </div>
              </div>

              {/* Founder Profile Image Card */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Camera className="w-4 h-4 text-[#0A2A66]" />
                    <h4 className="text-sm font-bold text-[#0A2A66] font-heading">
                      Founder Profile Portrait
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                    /brand/founder.jpg
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  {/* Live Display Frame */}
                  <div className="w-20 h-20 rounded-2xl bg-[#0A2A66] border-2 border-white shadow-md p-0.5 overflow-hidden flex items-center justify-center shrink-0">
                    {founderImageUrl ? (
                      <img 
                        src={founderImageUrl} 
                        alt={SITE_CONFIG.founderName} 
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.currentTarget as HTMLElement).style.display = 'none';
                        }}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : (
                      <span className="text-white font-black text-xl font-heading">AS</span>
                    )}
                  </div>
                  <div className="text-xs space-y-1 text-center sm:text-left">
                    <p className="font-bold text-slate-800">{SITE_CONFIG.founderName}</p>
                    <p className="text-slate-500 text-[11px]">
                      {SITE_CONFIG.founderRole}
                    </p>
                    <p className="text-emerald-700 text-[11px] font-semibold flex items-center gap-1 justify-center sm:justify-start">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Permanent founder card & endorsement badge
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    onClick={() => {
                      openFounderModal();
                      onTrackAction('admin_media_edit', 'Opened founder photo customizer from admin dashboard');
                    }}
                    className="px-4 py-2 rounded-xl bg-[#0A2A66] hover:bg-black text-white text-xs font-bold border border-black shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Change Permanent Photo</span>
                  </button>
                  <button
                    onClick={() => {
                      updateFounderImage(SITE_CONFIG.founderImageUrl);
                      onTrackAction('admin_media_reset', 'Reset founder photo to default bundled asset');
                    }}
                    className="px-3.5 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset to Bundled Asset</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Permanent Deployment Assurance Note */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5">
              <p className="font-bold text-slate-800 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#0A2A66]" />
                <span>Production Deployment Guarantee</span>
              </p>
              <p>
                Both media files reside in the project repository at <code className="bg-white px-1.5 py-0.5 rounded border text-[#0A2A66]">public/brand/logo.jpg</code> and <code className="bg-white px-1.5 py-0.5 rounded border text-[#0A2A66]">public/brand/founder.jpg</code>.
                When you deploy the app, Vite automatically bundles these images into the static distribution directory <code className="bg-white px-1.5 py-0.5 rounded border text-[#0A2A66]">dist/brand/</code>.
                They are permanently served to all website visitors across any browser or device, with zero user-editable controls on the public website.
              </p>
            </div>
          </div>
        )}

      </div>

      {/* New Project / Transaction Modal */}
      {newTxModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-[#0A2A66] font-heading">
              Record New Project / Transaction
            </h3>
            <form onSubmit={handleCreateTransaction} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Client ID</label>
                <input
                  type="text"
                  value={newTx.clientId}
                  onChange={(e) => setNewTx({ ...newTx, clientId: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Service</label>
                <input
                  type="text"
                  value={newTx.serviceName}
                  onChange={(e) => setNewTx({ ...newTx, serviceName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Amount ($ USD)</label>
                <input
                  type="number"
                  value={newTx.amount}
                  onChange={(e) => setNewTx({ ...newTx, amount: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Notes</label>
                <textarea
                  value={newTx.notes}
                  onChange={(e) => setNewTx({ ...newTx, notes: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border"
                  rows={2}
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setNewTxModalOpen(false)}
                  className="px-4 py-2 rounded-xl border text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0A2A66] hover:bg-black text-white font-bold border border-black shadow cursor-pointer"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

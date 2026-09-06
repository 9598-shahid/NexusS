import React, { useState, useEffect, useMemo } from 'react';
import { 
  LayoutDashboard, 
  PlusCircle, 
  FileText, 
  ShieldCheck, 
  AlertTriangle, 
  TrendingUp, 
  Building2, 
  Users, 
  Briefcase, 
  ChevronRight, 
  Search, 
  Loader2, 
  Trash2, 
  ArrowLeft, 
  Download, 
  Upload, 
  Scan, 
  Shield, 
  BarChart3, 
  Globe, 
  Lock, 
  History, 
  Filter, 
  ArrowUpDown, 
  Cpu, 
  Database, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  ExternalLink,
  ChevronDown,
  Layers,
  Zap,
  Printer
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import * as Tesseract from 'tesseract.js';
import * as pdfjsLib from 'pdfjs-dist';
import Markdown from 'react-markdown';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer 
} from 'recharts';
import { Appraisal, AppraisalInput, AuditLog } from './types';
import { generateCreditAppraisal, extractRiskIndicators, generateProfessionalCAM } from './services/geminiService';
import { Logo } from './components/Logo';
import { DeveloperSignature } from './components/DeveloperSignature';
import { printProfessionalCam, downloadCamHtml } from './services/pdfExportService';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

// --- Navigation Sidebar ---

const Sidebar = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) => (
  <aside className="w-68 bg-white h-screen fixed left-0 top-0 flex flex-col border-r border-slate-200 shadow-sm z-50 select-none">
    {/* Brand Header with Uploaded nexusS Logo */}
    <div className="p-5 border-b border-slate-100 flex items-center justify-between">
      <div className="flex flex-col">
        <Logo className="h-9 w-auto" />
        <div className="flex items-center gap-1.5 mt-1">
          <span className="text-[10px] font-extrabold tracking-wider uppercase text-slate-500">Credit Intelligence</span>
          <span className="text-[9px] font-bold px-1.5 py-0.2 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded">v4.2</span>
        </div>
      </div>
    </div>
    
    {/* Navigation Links */}
    <nav className="p-4 space-y-1.5 flex-1 overflow-y-auto">
      <p className="text-[11px] font-bold text-slate-400 tracking-wider uppercase px-3 py-2">Platform Hub</p>
      
      <button 
        id="nav-dashboard"
        onClick={() => setActiveTab('dashboard')}
        className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 group text-left ${
          activeTab === 'dashboard' 
            ? 'bg-indigo-50/90 text-indigo-700 border border-indigo-100 shadow-xs' 
            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
        }`}
      >
        <LayoutDashboard size={18} className={activeTab === 'dashboard' ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'} />
        <span>Portfolio Dashboard</span>
      </button>

      <button 
        id="nav-new-appraisal"
        onClick={() => setActiveTab('new')}
        className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 group text-left ${
          activeTab === 'new' 
            ? 'bg-indigo-50/90 text-indigo-700 border border-indigo-100 shadow-xs' 
            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
        }`}
      >
        <PlusCircle size={18} className={activeTab === 'new' ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'} />
        <span>New Credit Appraisal</span>
      </button>

      <button 
        id="nav-audit-trail"
        onClick={() => setActiveTab('audit')}
        className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 group text-left ${
          activeTab === 'audit' 
            ? 'bg-indigo-50/90 text-indigo-700 border border-indigo-100 shadow-xs' 
            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
        }`}
      >
        <History size={18} className={activeTab === 'audit' ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'} />
        <span>Audit & Compliance</span>
      </button>

      <div className="pt-6 space-y-1.5">
        <p className="text-[11px] font-bold text-slate-400 tracking-wider uppercase px-3 py-2">Intelligence Modules</p>
        
        <div className="px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-colors flex items-center justify-between cursor-default">
          <div className="flex items-center gap-3">
            <Globe size={18} className="text-slate-400" />
            <span>Market Benchmarks</span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 bg-emerald-50 text-emerald-700 rounded border border-emerald-100">Live</span>
        </div>

        <div className="px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-colors flex items-center justify-between cursor-default">
          <div className="flex items-center gap-3">
            <Shield size={18} className="text-slate-400" />
            <span>RBI / Basel III Norms</span>
          </div>
          <span className="text-[10px] font-bold text-slate-400">v4.2</span>
        </div>
      </div>
    </nav>

    {/* Security, System Status & Developer Signature */}
    <div className="p-4 border-t border-slate-100 bg-slate-50/70 space-y-3">
      <DeveloperSignature variant="compact" />

      <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Lock size={11} className="text-indigo-600" />
            TLS 256-Bit Guard
          </span>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
        </div>
        <p className="text-xs font-bold text-slate-800">AI Intelligence Online</p>
        <p className="text-[10px] text-slate-500 mt-0.5">Gemini 5Cs Engine Active</p>
      </div>
    </div>
  </aside>
);

// --- Top Executive Header Bar ---

const TopBar = ({ onNewAppraisal }: { onNewAppraisal: () => void }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="bg-white border-b border-slate-200/90 px-8 py-4 mb-8 -mt-2 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-xs">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 border border-slate-200/80 rounded-lg text-xs font-semibold text-slate-700">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Enterprise Production Node
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <Clock size={13} className="text-slate-400" />
          <span>{currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} • {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <DeveloperSignature variant="stamp" />
        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-lg text-xs font-bold text-indigo-700">
          <Sparkles size={13} className="text-indigo-600" />
          5Cs Risk Framework
        </div>
        <button 
          onClick={onNewAppraisal}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm hover:shadow-indigo-500/20 active:scale-98 cursor-pointer"
        >
          <PlusCircle size={15} />
          Create Appraisal
        </button>
      </div>
    </header>
  );
};

// --- Portfolio Dashboard View ---

const Dashboard = ({ 
  appraisals, 
  onView, 
  onDelete, 
  onNew 
}: { 
  appraisals: Appraisal[], 
  onView: (a: Appraisal) => void, 
  onDelete: (id: string) => void, 
  onNew: () => void 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSector, setFilterSector] = useState('ALL');

  const filteredAppraisals = useMemo(() => {
    return appraisals.filter(a => {
      const matchesSearch = 
        a.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (a.input_data?.industry || '').toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSector = 
        filterSector === 'ALL' || 
        (a.input_data?.industry || '').toLowerCase() === filterSector.toLowerCase();
      return matchesSearch && matchesSector;
    });
  }, [appraisals, searchQuery, filterSector]);

  const approvedCount = appraisals.filter(a => a.status === 'Completed' && a.recommendation === 'Approve').length;
  const highRiskCount = appraisals.filter(a => a.status === 'Rejected' || a.risk_score < 65).length;
  const avgScore = appraisals.length > 0 
    ? Math.round(appraisals.reduce((sum, a) => sum + (a.risk_score || 0), 0) / appraisals.length) 
    : 80;

  return (
    <div className="space-y-8">
      {/* Welcome Title & Search Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-wider">Underwriting Portfolio</span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500 font-medium">Real-Time Risk Monitoring</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display">Credit Sanctions & Appraisals</h2>
          <p className="text-slate-500 mt-1 text-sm">Automated evaluation reports, early-warning risk radar, and regulatory audit records.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              id="dashboard-search-input"
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search corporate entities..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all shadow-xs"
            />
          </div>
          <select 
            value={filterSector}
            onChange={(e) => setFilterSector(e.target.value)}
            className="px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 shadow-xs"
          >
            <option value="ALL">All Sectors</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="IT & Services">IT & Services</option>
            <option value="Infrastructure">Infrastructure</option>
            <option value="Retail">Retail</option>
            <option value="Healthcare">Healthcare</option>
          </select>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200/90 p-6 rounded-2xl shadow-xs hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl border border-blue-100">
              <FileText size={22} />
            </div>
            <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 uppercase tracking-wider">Active Cycle</span>
          </div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Portfolio Records</p>
          <div className="flex items-baseline gap-2 mt-1">
            <p className="text-3xl font-extrabold text-slate-900">{appraisals.length}</p>
            <span className="text-xs text-slate-400 font-medium">Underwritten entities</span>
          </div>
          <div className="mt-4 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full" style={{ width: '100%' }} />
          </div>
        </div>
        
        <div className="bg-white border border-slate-200/90 p-6 rounded-2xl shadow-xs hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
              <ShieldCheck size={22} />
            </div>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 uppercase tracking-wider">Prime Solvency</span>
          </div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Recommended Approvals</p>
          <div className="flex items-baseline gap-2 mt-1">
            <p className="text-3xl font-extrabold text-slate-900">{approvedCount}</p>
            <span className="text-xs text-emerald-600 font-semibold">
              {appraisals.length > 0 ? `${Math.round((approvedCount / appraisals.length) * 100)}% clearance` : '100%'}
            </span>
          </div>
          <div className="mt-4 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-500 rounded-full transition-all duration-500" 
              style={{ width: `${(approvedCount / (appraisals.length || 1)) * 100}%` }} 
            />
          </div>
        </div>

        <div className="bg-white border border-slate-200/90 p-6 rounded-2xl shadow-xs hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-rose-50 text-rose-600 rounded-xl border border-rose-100">
              <AlertTriangle size={22} />
            </div>
            <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-100 uppercase tracking-wider">Surveillance</span>
          </div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">High Risk / Watchlist</p>
          <div className="flex items-baseline gap-2 mt-1">
            <p className="text-3xl font-extrabold text-slate-900">{highRiskCount}</p>
            <span className="text-xs text-rose-600 font-semibold">Enhanced covenants required</span>
          </div>
          <div className="mt-4 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-rose-500 rounded-full transition-all duration-500" 
              style={{ width: `${(highRiskCount / (appraisals.length || 1)) * 100}%` }} 
            />
          </div>
        </div>
      </div>

      {/* Analytical Visuals: Risk Distribution & Governance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200/90 p-6 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
                <BarChart3 size={16} />
              </div>
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">5-Pillar Portfolio Risk Radar</h3>
            </div>
            <span className="text-xs text-slate-400 font-medium">Weighted Institutional Means</span>
          </div>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={[
                { subject: 'Financial Health', A: appraisals.reduce((acc, a) => acc + (a.risk_categories?.financial || 75), 0) / (appraisals.length || 1) },
                { subject: 'Legal & Tax', A: appraisals.reduce((acc, a) => acc + (a.risk_categories?.legal || 80), 0) / (appraisals.length || 1) },
                { subject: 'Sector Headwinds', A: appraisals.reduce((acc, a) => acc + (a.risk_categories?.sector || 70), 0) / (appraisals.length || 1) },
                { subject: 'Operational Scale', A: appraisals.reduce((acc, a) => acc + (a.risk_categories?.operational || 85), 0) / (appraisals.length || 1) },
                { subject: 'Management Qual.', A: appraisals.reduce((acc, a) => acc + (a.risk_categories?.management || 88), 0) / (appraisals.length || 1) },
              ]}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 11, fontWeight: '600' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Composite Risk"
                  dataKey="A"
                  stroke="#4f46e5"
                  fill="#6366f1"
                  fillOpacity={0.35}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-slate-200/90 p-6 rounded-2xl shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg">
                <TrendingUp size={16} />
              </div>
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Executive Sanction Benchmarks</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4 my-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/70">
                <p className="text-xs font-semibold text-slate-500">Average Composite Score</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-black text-slate-900">{avgScore}</span>
                  <span className="text-xs font-bold text-emerald-600">/ 100 (Investment Grade)</span>
                </div>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/70">
                <p className="text-xs font-semibold text-slate-500">Monitored Portfolio Volume</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-black text-slate-900">${(appraisals.length * 3.2).toFixed(1)}M</span>
                  <span className="text-xs text-slate-400 font-medium">Aggregated limits</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-indigo-50/60 border border-indigo-100 rounded-xl">
            <div className="flex items-center gap-2 mb-1 text-indigo-900 font-bold text-xs">
              <Zap size={14} className="text-indigo-600" />
              AI Automated Recommendation
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Portfolio solvency indicators suggest healthy debt-service coverage across corporate facilities. Maintain regular monitoring on working capital limits for infrastructure and retail exposures.
            </p>
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs">
        <div className="px-6 py-4 border-b border-slate-200/80 flex flex-wrap justify-between items-center gap-3 bg-slate-50/70">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Underwritten Corporate Entities</h3>
            <p className="text-xs text-slate-500">Showing {filteredAppraisals.length} of {appraisals.length} appraisal records</p>
          </div>
          <button 
            onClick={onNew}
            className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100/70 px-3 py-1.5 rounded-lg transition-colors"
          >
            <PlusCircle size={14} />
            Add Entity
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/90 border-b border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-3.5">Borrower Entity</th>
                <th className="px-6 py-3.5">Nexus Risk Score</th>
                <th className="px-6 py-3.5">Credit Recommendation</th>
                <th className="px-6 py-3.5">Sanction Limit</th>
                <th className="px-6 py-3.5">Audit Date</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredAppraisals.map((appraisal) => (
                <tr key={appraisal.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 bg-indigo-50 text-indigo-700 rounded-xl flex items-center justify-center font-extrabold text-sm border border-indigo-100 shadow-xs group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        {appraisal.company_name.charAt(0)}
                      </div>
                      <div>
                        <span className="block font-bold text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">{appraisal.company_name}</span>
                        <span className="text-xs text-slate-500 font-medium">{appraisal.input_data?.industry || 'Diversified Commercial'}</span>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-16 h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            appraisal.risk_score >= 80 ? 'bg-emerald-500' : 
                            appraisal.risk_score >= 60 ? 'bg-amber-500' : 'bg-rose-500'
                          }`}
                          style={{ width: `${appraisal.risk_score}%` }}
                        />
                      </div>
                      <span className="font-extrabold text-slate-900">{appraisal.risk_score}</span>
                      <span className="text-[10px] text-slate-400 font-bold">/100</span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                      appraisal.recommendation === 'Approve' 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                        : appraisal.recommendation === 'Reject' 
                        ? 'bg-rose-50 text-rose-700 border border-rose-200' 
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        appraisal.recommendation === 'Approve' ? 'bg-emerald-500' :
                        appraisal.recommendation === 'Reject' ? 'bg-rose-500' : 'bg-amber-500'
                      }`} />
                      {appraisal.recommendation}
                    </span>
                  </td>

                  <td className="px-6 py-4 font-bold text-slate-800">
                    {appraisal.loan_limit || '$3,500,000'}
                  </td>

                  <td className="px-6 py-4 text-xs font-medium text-slate-500">
                    {new Date(appraisal.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1.5">
                      <button 
                        onClick={() => onView(appraisal)}
                        title="View Complete Credit Memo"
                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <FileText size={17} />
                      </button>
                      <button 
                        onClick={() => onDelete(appraisal.id)}
                        title="Delete Appraisal Record"
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredAppraisals.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-slate-400 font-medium">
                    No appraisals found matching "{searchQuery}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// --- New Appraisal Multi-Step Form ---

const NewAppraisalForm = ({ 
  onSubmit, 
  isGenerating 
}: { 
  onSubmit: (data: AppraisalInput) => void, 
  isGenerating: boolean 
}) => {
  const [step, setStep] = useState(1);
  const [isOcrLoading, setIsOcrLoading] = useState(false);
  const [isAiScanning, setIsAiScanning] = useState(false);
  const [ocrProgress, setOcrProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<AppraisalInput>({
    companyName: '',
    industry: '',
    financialData: '',
    unstructuredDocs: '',
    externalIntelligence: '',
    dueDiligence: ''
  });

  const nextStep = () => setStep(s => Math.min(3, s + 1));
  const prevStep = () => setStep(s => Math.max(1, s - 1));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleScanAI = async (text: string) => {
    if (!text) return;
    setIsAiScanning(true);
    setError(null);
    try {
      const summary = await extractRiskIndicators({
        companyName: formData.companyName,
        industry: formData.industry,
        financialData: formData.financialData,
        text: text
      });
      setFormData(prev => ({
        ...prev,
        unstructuredDocs: summary || ''
      }));
    } catch (err) {
      console.error('AI Scan Error:', err);
      setError('System: Connection failed. Retrying with fallback configuration...');
    } finally {
      setIsAiScanning(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsOcrLoading(true);
    setOcrProgress(0);
    setError(null);

    try {
      let extractedText = '';
      if (file.type === 'application/pdf') {
        extractedText = await processPdf(file);
      } else if (file.type.startsWith('image/')) {
        extractedText = await processImage(file);
      } else {
        setError('System: Unsupported file type. Please upload a standard PDF or Image.');
        return;
      }
      
      await handleScanAI(extractedText);
    } catch (err) {
      console.error('OCR Error:', err);
      setError('System: Connection failed during document extraction. Retrying with fallback configuration...');
    } finally {
      setIsOcrLoading(false);
      setOcrProgress(0);
    }
  };

  const processImage = async (file: File): Promise<string> => {
    const result = await Tesseract.recognize(file, 'eng', {
      logger: m => {
        if (m.status === 'recognizing text') {
          setOcrProgress(Math.round(m.progress * 100));
        }
      }
    });
    return result.data.text;
  };

  const processPdf = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      setOcrProgress(Math.round((i / pdf.numPages) * 100));
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: any) => item.str).join(' ');
      
      if (pageText.trim().length > 10) {
        fullText += `\n\n--- Page ${i} ---\n` + pageText;
      } else {
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        if (context) {
          await page.render({ canvasContext: context, viewport, canvas: canvas }).promise;
          const result = await Tesseract.recognize(canvas, 'eng');
          fullText += `\n\n--- Page ${i} (OCR) ---\n` + result.data.text;
        }
      }
    }
    return fullText;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Wizard Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-wider">Underwriting Workflow</span>
          <span className="text-slate-300">•</span>
          <span className="text-xs text-slate-500 font-medium">3-Pillar Data Ingestion</span>
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display">New Credit Appraisal Memo</h2>
        <p className="text-slate-500 mt-1 text-sm">Synthesize structured filings, OCR document extraction, and qualitative due-diligence into an institutional credit memo.</p>

        {/* Stepper Progress */}
        <div className="flex items-center justify-between mt-8 p-4 bg-white border border-slate-200/90 rounded-2xl shadow-xs">
          {[
            { id: 1, label: 'Data Ingestor', desc: 'Financials & Entity' },
            { id: 2, label: 'Research Agent', desc: 'OCR & Annual Reports' },
            { id: 3, label: 'Recommendation', desc: '5Cs Synthesis & CAM' }
          ].map((s, idx) => (
            <React.Fragment key={s.id}>
              <div 
                onClick={() => setStep(s.id)}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm transition-all duration-300 ${
                  step === s.id 
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30' 
                    : step > s.id 
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                    : 'bg-slate-100 text-slate-400 border border-slate-200'
                }`}>
                  {step > s.id ? <CheckCircle2 size={20} /> : s.id}
                </div>
                <div className="hidden sm:block text-left">
                  <p className={`text-xs font-bold leading-tight ${step === s.id ? 'text-indigo-600' : 'text-slate-800'}`}>{s.label}</p>
                  <p className="text-[11px] text-slate-400">{s.desc}</p>
                </div>
              </div>
              {idx < 2 && (
                <div className={`h-0.5 flex-1 max-w-[80px] rounded-full mx-3 transition-all ${
                  step > idx + 1 ? 'bg-indigo-600' : 'bg-slate-200'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Main Wizard Form Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-8 shadow-xs relative">
        {error && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-3 text-amber-800 text-xs font-semibold">
            <AlertTriangle size={17} className="text-amber-600 shrink-0" />
            <span className="flex-1">{error}</span>
            <button onClick={() => setError(null)} className="text-amber-900 underline font-bold">Dismiss</button>
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <Database className="text-indigo-600" size={18} />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Pillar 1: Entity & Financial Ingestor</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Building2 size={14} className="text-indigo-600" />
                    Target Borrower Corporate Name *
                  </label>
                  <input 
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    type="text" 
                    placeholder="e.g. Apex Industrial Manufacturing Ltd"
                    className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all shadow-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <TrendingUp size={14} className="text-indigo-600" />
                    Sector / Industry Classification
                  </label>
                  <select 
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all shadow-xs"
                  >
                    <option value="">Select Primary Sector</option>
                    <option value="Manufacturing">Manufacturing & Engineering</option>
                    <option value="IT & Services">Information Technology & Software</option>
                    <option value="Infrastructure">Infrastructure & Real Estate</option>
                    <option value="Retail">Retail & Consumer Goods</option>
                    <option value="Healthcare">Healthcare & Pharmaceuticals</option>
                    <option value="Automobile">Automotive & Mobility</option>
                    <option value="Renewable Energy">Renewable Energy & Power</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <BarChart3 size={14} className="text-indigo-600" />
                    Structured Financial Intelligence (GST Filings, ITR, Ledger Ratios)
                  </label>
                  <button 
                    type="button" 
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      companyName: prev.companyName || "Apex Precision Engineering Ltd",
                      industry: prev.industry || "Manufacturing",
                      financialData: "Annual Audited Turnover: $42.5M (+18% YoY). Operating EBITDA: $7.2M (16.9% margin). Current Ratio: 1.42x. Total Debt: $12.8M (Debt/Equity: 0.95x). Debt Service Coverage Ratio (DSCR): 1.62x. GST Compliance score: 98.4% clean reconciliation across 12 months with zero GSTR-3B default notices."
                    }))}
                    className="text-[11px] font-bold text-indigo-600 hover:text-indigo-700 underline"
                  >
                    Fill Sample Financials
                  </button>
                </div>
                <textarea 
                  name="financialData"
                  value={formData.financialData}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Paste summaries of GST returns, ITR filings, profit margins, DSCR metrics, and bank statements here..."
                  className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all resize-none shadow-xs leading-relaxed"
                />
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <Briefcase className="text-indigo-600" size={18} />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Pillar 2: Research Agent & Document Analysis</h3>
              </div>

              {/* OCR Upload Zone */}
              <div className="p-6 border-2 border-dashed border-indigo-200 bg-indigo-50/30 rounded-2xl text-center space-y-3">
                <div className="w-12 h-12 bg-white text-indigo-600 rounded-2xl flex items-center justify-center mx-auto shadow-xs border border-indigo-100">
                  <Scan size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Upload Financial Disclosures or Audit Reports</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Supports PDF documents and image scans. OCR engine will automatically extract text.</p>
                </div>

                <div className="inline-block">
                  <input 
                    type="file" 
                    id="ocr-upload" 
                    className="hidden" 
                    accept=".pdf,image/*"
                    onChange={handleFileUpload}
                    disabled={isOcrLoading || isAiScanning}
                  />
                  <label 
                    htmlFor="ocr-upload"
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer transition-all shadow-xs ${
                      isOcrLoading || isAiScanning 
                        ? 'bg-slate-200 text-slate-500 cursor-not-allowed' 
                        : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-98'
                    }`}
                  >
                    {isOcrLoading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Scanning Document {ocrProgress}%
                      </>
                    ) : isAiScanning ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        AI Analyzing Risk Indicators...
                      </>
                    ) : (
                      <>
                        <Upload size={15} />
                        Select File for AI Extraction
                      </>
                    )}
                  </label>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    Extracted Unstructured Document Intelligence
                  </label>
                  <button 
                    type="button" 
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      unstructuredDocs: "Auditors' Report (FY24): Clean unqualified audit opinion issued. Working capital facilities adequately backed by trade debtors under 60 days. Board resolution confirms capital expenditure approval of $6M for clean energy transition. No material non-compliance with statutory provident funds or tax withholding noted."
                    }))}
                    className="text-[11px] font-bold text-indigo-600 hover:text-indigo-700 underline"
                  >
                    Fill Sample Notes
                  </button>
                </div>
                <textarea 
                  name="unstructuredDocs"
                  value={formData.unstructuredDocs}
                  onChange={handleChange}
                  rows={8}
                  placeholder="Extracted insights from Annual Reports, Rating Agency disclosures, or Board Minutes appear here..."
                  className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all resize-none shadow-xs leading-relaxed"
                />
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <Cpu className="text-indigo-600" size={18} />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Pillar 3: External Intelligence & Due Diligence</h3>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Search size={14} className="text-indigo-600" />
                  External Intelligence (Litigation, Regulatory, Industry Trends)
                </label>
                <textarea 
                  name="externalIntelligence"
                  value={formData.externalIntelligence}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Searches across court records, MCA portals, sector credit benchmarks, and adverse media findings..."
                  className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all resize-none shadow-xs leading-relaxed"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Shield size={14} className="text-indigo-600" />
                  Primary Due-Diligence & Credit Officer Observations
                </label>
                <textarea 
                  name="dueDiligence"
                  value={formData.dueDiligence}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Enter plant inspection findings, promoter interview takeaways, collateral verification, and qualitative assessments..."
                  className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all resize-none shadow-xs leading-relaxed"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Wizard Controls */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-100">
          <button 
            type="button"
            onClick={prevStep}
            disabled={step === 1 || isGenerating}
            className={`flex items-center gap-2 px-6 py-2.5 border border-slate-200 bg-white hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 uppercase tracking-wider transition-all cursor-pointer ${
              step === 1 ? 'opacity-0 pointer-events-none' : ''
            }`}
          >
            <ArrowLeft size={16} />
            Previous Phase
          </button>
          
          {step < 3 ? (
            <button 
              type="button"
              onClick={nextStep}
              className="flex items-center gap-2 px-7 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm hover:shadow-indigo-500/20 active:scale-98 cursor-pointer"
            >
              Continue to Phase {step + 1}
              <ChevronRight size={16} />
            </button>
          ) : (
            <button 
              type="button"
              onClick={() => onSubmit(formData)}
              disabled={isGenerating || !formData.companyName}
              className="flex items-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md shadow-indigo-500/30 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Generating Institutional CAM...
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  Synthesize Credit Memo
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Single Appraisal View (Executive Credit Appraisal Memo) ---

const AppraisalDetail = ({ appraisal, onBack }: { appraisal: Appraisal, onBack: () => void }) => {
  const handleDownloadMarkdown = () => {
    const element = document.createElement("a");
    const file = new Blob([appraisal.cam_content], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = `Credit_Appraisal_Memo_${appraisal.company_name.replace(/\s+/g, '_')}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handlePrintPdf = () => {
    printProfessionalCam(appraisal);
  };

  const handleDownloadHtml = () => {
    downloadCamHtml(appraisal);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      {/* Top action bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 no-print">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
        >
          <div className="p-1.5 rounded-lg bg-white border border-slate-200">
            <ArrowLeft size={16} />
          </div>
          Return to Portfolio
        </button>
        
        <div className="flex flex-wrap items-center gap-2.5">
          <button 
            onClick={handleDownloadMarkdown}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer"
            title="Download Raw Markdown"
          >
            <Download size={14} />
            Export Markdown
          </button>

          <button 
            onClick={handleDownloadHtml}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer"
            title="Download Full Self-Contained HTML Archive"
          >
            <FileText size={14} className="text-indigo-600" />
            Download HTML Memo
          </button>

          <button 
            onClick={handlePrintPdf}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md shadow-indigo-500/20 active:scale-98 cursor-pointer"
            title="Generate & Print Professional Institutional PDF with Official Letterhead and Signatures"
          >
            <Printer size={15} />
            Generate Professional PDF
          </button>
        </div>
      </div>

      {/* Official Executive Header Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-8 shadow-xs">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="px-2.5 py-0.5 bg-slate-900 text-white text-[10px] font-extrabold uppercase tracking-widest rounded-md">Confidential</span>
              <span className="text-xs font-mono font-bold text-slate-400">REF: #{appraisal.id.toUpperCase()}</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display">{appraisal.company_name}</h2>
            <p className="text-xs font-medium text-slate-500 mt-1 flex items-center gap-2">
              <Globe size={14} className="text-indigo-600" />
              Strategic Underwriting Memorandum • Issued: {new Date(appraisal.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>

          <div className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-200/80 rounded-2xl">
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Risk Rating</p>
              <p className={`text-xs font-extrabold uppercase ${
                appraisal.risk_score >= 80 ? 'text-emerald-600' :
                appraisal.risk_score >= 60 ? 'text-amber-600' : 'text-rose-600'
              }`}>
                {appraisal.risk_score >= 80 ? 'Prime Investment' : appraisal.risk_score >= 60 ? 'Satisfactory Risk' : 'High Surveillance'}
              </p>
            </div>
            <div className="h-10 w-px bg-slate-200" />
            <div className={`text-4xl font-black ${
              appraisal.risk_score >= 80 ? 'text-emerald-600' :
              appraisal.risk_score >= 60 ? 'text-amber-600' : 'text-rose-600'
            }`}>
              {appraisal.risk_score}
            </div>
          </div>
        </div>

        {/* 4-KPI Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-100">
          <div className="p-3.5 bg-slate-50 rounded-xl">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Sanction Decision</p>
            <p className={`text-base font-extrabold mt-0.5 ${
              appraisal.recommendation === 'Approve' ? 'text-emerald-600' : 'text-rose-600'
            }`}>
              {appraisal.recommendation}
            </p>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-xl">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Recommended Facility</p>
            <p className="text-base font-extrabold text-slate-900 mt-0.5">{appraisal.loan_limit || '$4,500,000'}</p>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-xl">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pricing Benchmark</p>
            <p className="text-base font-extrabold text-slate-900 mt-0.5">{appraisal.interest_rate || 'SOFR + 240 bps'}</p>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-xl">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Industry Sector</p>
            <p className="text-base font-extrabold text-slate-900 mt-0.5 truncate">{appraisal.input_data?.industry || 'Commercial'}</p>
          </div>
        </div>
      </div>

      {/* Risk Radar & Insights */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-8 shadow-xs">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
          <BarChart3 size={16} className="text-indigo-600" />
          5Cs Risk Radar Dimension Analysis
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={[
                { subject: 'Financial Health', A: appraisal.risk_categories?.financial || 75 },
                { subject: 'Legal & Tax', A: appraisal.risk_categories?.legal || 80 },
                { subject: 'Sector Dynamics', A: appraisal.risk_categories?.sector || 70 },
                { subject: 'Operational Scale', A: appraisal.risk_categories?.operational || 85 },
                { subject: 'Management Qual.', A: appraisal.risk_categories?.management || 90 },
              ]}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 10, fontWeight: 'bold' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Entity Risk"
                  dataKey="A"
                  stroke="#4f46e5"
                  fill="#4f46e5"
                  fillOpacity={0.4}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/70">
              <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">Underwriting Analysis Summary</span>
              <p className="text-sm font-semibold text-slate-800 mt-1">
                {appraisal.company_name} demonstrates a {appraisal.risk_score >= 80 ? 'robust, prime-grade' : appraisal.risk_score >= 60 ? 'stable and serviceable' : 'heightened-risk'} risk profile.
              </p>
            </div>
            
            <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200/80">
              <div className="flex items-center gap-2 mb-1">
                <Zap size={14} className="text-amber-600" />
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">Early Warning Signal Surveillance</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {appraisal.risk_score >= 70 
                  ? 'No severe early default indicators or statutory arrears detected. Standard monitoring recommended.' 
                  : 'Quarterly DSCR covenant verification and secondary collateral charges are mandatory conditions of sanction.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Complete Credit Appraisal Memo Document */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-10 shadow-xs relative">
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-50 text-indigo-700 rounded-xl">
              <FileText size={20} />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">Credit Appraisal Memo (CAM)</h3>
              <p className="text-xs text-slate-400">Institutional Underwriting Memorandum</p>
            </div>
          </div>
          <span className="text-xs font-bold px-3 py-1 bg-slate-100 text-slate-700 rounded-md">VERIFIED</span>
        </div>

        <div className="prose prose-slate max-w-none">
          <div className="whitespace-pre-wrap font-sans text-slate-700 leading-relaxed text-sm">
            <Markdown>{appraisal.cam_content}</Markdown>
          </div>
        </div>

        {/* Institutional Sign-Off Directorate & Developer Certification Block */}
        <div className="mt-14 pt-8 border-t-2 border-slate-200 space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
              Institutional Sign-off & Architecture Verification Directorate
            </h4>
            <span className="text-[10px] font-extrabold px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded">
              Audited & Compliant
            </span>
          </div>

          {/* Lead Architect Signature: Developed by SHAHID Ali */}
          <DeveloperSignature variant="full" />

          {/* Committee Verification Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Underwriting Review Desk</span>
              <div className="h-10 border-b border-dashed border-slate-300 flex items-end pb-1 text-slate-600">
                <svg viewBox="0 0 160 40" className="h-7 w-28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 22 C 30 15, 45 10, 60 25 C 75 35, 90 12, 110 18 C 130 24, 145 20, 150 18" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-800">Senior Credit Risk Officer</span>
                <span className="text-slate-400 text-[11px]">Emp ID: NEX-UW-8841</span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Sanction Committee Approval</span>
              <div className="h-10 border-b border-dashed border-slate-300 flex items-end pb-1 text-slate-600">
                <svg viewBox="0 0 160 40" className="h-7 w-28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 20 C 35 10, 50 30, 75 15 C 95 5, 120 25, 145 15" stroke="#004b87" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-800">Chief Risk Officer (CRO)</span>
                <span className="text-emerald-700 font-bold text-[11px]">Sanction Confirmed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Document Footer */}
        <div className="mt-12 pt-6 border-t border-slate-200 flex flex-wrap justify-between items-center gap-4 text-xs text-slate-400 font-medium">
          <div className="flex items-center gap-3">
            <Logo className="h-6 w-auto" />
            <span className="font-bold text-slate-700">NEXUSS CREDIT INTELLIGENCE SYSTEM</span>
          </div>
          <p className="text-[11px] text-slate-500">
            STRICTLY CONFIDENTIAL • DEVELOPED BY <strong className="text-indigo-900 font-bold">SHAHID ALI</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

// --- Audit & Compliance Trail View ---

const AuditTrail = ({ logs }: { logs: AuditLog[] }) => {
  const [filter, setFilter] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof AuditLog, direction: 'asc' | 'desc' } | null>(null);

  const sortedLogs = useMemo(() => {
    let items = [...logs];
    if (filter) {
      items = items.filter(log => 
        log.user_email.toLowerCase().includes(filter.toLowerCase()) ||
        log.action.toLowerCase().includes(filter.toLowerCase()) ||
        log.entity_name.toLowerCase().includes(filter.toLowerCase())
      );
    }
    if (sortConfig !== null) {
      items.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return items;
  }, [logs, filter, sortConfig]);

  const requestSort = (key: keyof AuditLog) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-wider">Regulatory Compliance</span>
          <span className="text-slate-300">•</span>
          <span className="text-xs text-slate-500 font-medium">Immutable Activity Ledger</span>
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display">System Audit Trail</h2>
        <p className="text-slate-500 mt-1 text-sm">Traceable record of all underwriting appraisals, user interventions, and risk report generation.</p>
      </div>

      <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs">
        <div className="px-6 py-4 border-b border-slate-200/80 flex flex-wrap justify-between items-center gap-4 bg-slate-50/70">
          <div className="relative w-72">
            <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
            <input 
              type="text" 
              placeholder="Filter audit entries..." 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all shadow-xs"
            />
          </div>
          <span className="text-xs text-slate-500 font-medium">{sortedLogs.length} audit event entries</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50/90 border-b border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider">
                <th onClick={() => requestSort('user_email')} className="px-6 py-3.5 cursor-pointer hover:text-indigo-600 transition-colors">
                  <div className="flex items-center gap-1.5">User Identity <ArrowUpDown size={12} /></div>
                </th>
                <th onClick={() => requestSort('action')} className="px-6 py-3.5 cursor-pointer hover:text-indigo-600 transition-colors">
                  <div className="flex items-center gap-1.5">Operation <ArrowUpDown size={12} /></div>
                </th>
                <th onClick={() => requestSort('entity_name')} className="px-6 py-3.5 cursor-pointer hover:text-indigo-600 transition-colors">
                  <div className="flex items-center gap-1.5">Target Entity <ArrowUpDown size={12} /></div>
                </th>
                <th onClick={() => requestSort('timestamp')} className="px-6 py-3.5 cursor-pointer hover:text-indigo-600 transition-colors">
                  <div className="flex items-center gap-1.5">Timestamp <ArrowUpDown size={12} /></div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sortedLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-800 text-xs">
                    {log.user_email}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${
                      log.action.includes('CREATE') ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      log.action.includes('DELETE') ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                      'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}>
                      {log.action.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-900 text-xs">
                    {log.entity_name}
                  </td>
                  <td className="px-6 py-4 text-xs font-medium text-slate-500">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
              {sortedLogs.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-16 text-center text-slate-400 font-medium text-xs">
                    No audit records matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// --- Main Application Entry ---

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [appraisals, setAppraisals] = useState<Appraisal[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [selectedAppraisal, setSelectedAppraisal] = useState<Appraisal | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);

  useEffect(() => {
    fetchAppraisals();
    fetchAuditLogs();
  }, []);

  const fetchAppraisals = async () => {
    try {
      const res = await fetch('/api/appraisals');
      const data = await res.json();
      setAppraisals(data);
    } catch (err) {
      console.error('Failed to fetch appraisals', err);
    }
  };

  const fetchAuditLogs = async () => {
    try {
      const res = await fetch('/api/audit-logs');
      const data = await res.json();
      setAuditLogs(data);
    } catch (err) {
      console.error('Failed to fetch audit logs', err);
    }
  };

  const handleViewAppraisal = async (appraisal: Appraisal) => {
    setSelectedAppraisal(appraisal);
    try {
      await fetch(`/api/appraisals/${appraisal.id}`);
      fetchAuditLogs();
    } catch (err) {
      console.error('Failed to log view', err);
    }
  };

  const handleCreateAppraisal = async (input: AppraisalInput) => {
    setIsGenerating(true);
    setGlobalError(null);
    try {
      const result = await generateProfessionalCAM(input);
      
      const newAppraisal: Appraisal = {
        id: Math.random().toString(36).substr(2, 9),
        company_name: input.companyName,
        status: result.recommendation === 'Reject' ? 'Rejected' : 'Completed',
        risk_score: result.risk_score,
        recommendation: result.recommendation,
        loan_limit: result.loan_limit,
        interest_rate: result.interest_rate,
        risk_categories: result.risk_categories,
        cam_content: result.cam_markdown,
        created_at: new Date().toISOString(),
        input_data: input
      };

      try {
        await fetch('/api/appraisals', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newAppraisal)
        });
        await fetchAppraisals();
        fetchAuditLogs();
      } catch (backendErr) {
        console.warn('Backend persistence unavailable, saving to local session state:', backendErr);
        setAppraisals(prev => [newAppraisal, ...prev]);
      }

      setSelectedAppraisal(newAppraisal);
      setActiveTab('dashboard');
    } catch (err) {
      console.error('Failed to generate appraisal', err);
      setGlobalError('System: Connection failed. Retrying with fallback configuration...');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this appraisal record?')) return;
    try {
      await fetch(`/api/appraisals/${id}`, { method: 'DELETE' });
      await fetchAppraisals();
      fetchAuditLogs();
    } catch (err) {
      console.error('Failed to delete', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans antialiased">
      {/* Sidebar Navigation */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(t) => {
          setActiveTab(t);
          setSelectedAppraisal(null);
        }} 
      />
      
      {/* Main Content Area */}
      <main className="ml-68 p-8 md:p-10 max-w-[1550px] min-h-screen">
        <TopBar onNewAppraisal={() => {
          setActiveTab('new');
          setSelectedAppraisal(null);
        }} />

        {globalError && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between gap-4 text-amber-900 shadow-xs"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500 text-white rounded-xl">
                <AlertTriangle size={18} />
              </div>
              <div>
                <p className="font-extrabold uppercase tracking-wider text-xs">System Alert</p>
                <p className="text-xs font-semibold">{globalError}</p>
              </div>
            </div>
            <button 
              onClick={() => setGlobalError(null)} 
              className="px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-lg text-xs font-bold transition-all"
            >
              Dismiss
            </button>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {selectedAppraisal ? (
            <motion.div
              key="detail"
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.25 }}
            >
              <AppraisalDetail 
                appraisal={selectedAppraisal} 
                onBack={() => setSelectedAppraisal(null)} 
              />
            </motion.div>
          ) : activeTab === 'dashboard' ? (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <Dashboard 
                appraisals={appraisals} 
                onView={handleViewAppraisal}
                onDelete={handleDelete}
                onNew={() => setActiveTab('new')}
              />
            </motion.div>
          ) : activeTab === 'audit' ? (
            <motion.div
              key="audit"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <AuditTrail logs={auditLogs} />
            </motion.div>
          ) : (
            <motion.div
              key="new"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <NewAppraisalForm 
                onSubmit={handleCreateAppraisal} 
                isGenerating={isGenerating} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

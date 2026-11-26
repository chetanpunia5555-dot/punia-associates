import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Lock, 
  User, 
  MessageSquare, 
  Users, 
  Scale, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  RefreshCw, 
  Sparkles, 
  LogOut, 
  PhoneCall, 
  MessageCircle,
  FileText,
  Building,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  Layers,
  History,
  Check,
  X,
  FileCheck2,
  Newspaper,
  BookOpen,
  Upload,
  Download,
  FolderArchive,
  BookMarked,
  Settings,
  HelpCircle,
  Eye,
  FileCode,
  FileSpreadsheet,
  FileArchive,
  BarChart3,
  Briefcase,
  Landmark,
  FileUp,
  FolderPlus,
  Database
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { LegalDocumentManager } from '../components/LegalDocumentManager';
import { AdminDocumentIntelligenceHub } from '../components/AdminDocumentIntelligenceHub';
import { BareActsBulkArchiveUploader } from '../components/BareActsBulkArchiveUploader';
import { NETWORK_ADVOCATES, NetworkAdvocate } from '../data/legalData';
import {
  Judgment,
  CourtOrder,
  LegalNewsItem,
  LegalArticle,
  AuditEvent,
  INITIAL_JUDGMENTS,
  INITIAL_COURT_ORDERS,
  INITIAL_LEGAL_NEWS,
  INITIAL_LEGAL_ARTICLES
} from '../data/legalCmsData';
import { BareAct, BARE_ACTS_DATABASE } from '../data/bareActsData';
import { uploadSingleFileChunked, formatBytes } from '../utils/pdfUploadEngine';

async function safeParseJson(res: Response | null): Promise<any | null> {
  if (!res || !res.ok) return null;
  const contentType = res.headers.get('content-type') || '';
  if (!contentType.toLowerCase().includes('application/json')) {
    return null;
  }
  try {
    return await res.json();
  } catch {
    return null;
  }
}

interface ClientAIQuery {
  id: string;
  clientName: string;
  clientPhone?: string;
  clientState: string;
  query: string;
  reply: string;
  category: string;
  language: string;
  sourcesCount: number;
  timestamp: string;
  status: string;
  assignedAdvocate?: string;
}

interface AdvocateLead {
  id: string;
  clientName: string;
  clientPhone: string;
  clientState: string;
  advocateName: string;
  practiceArea: string;
  court: string;
  matterDetails: string;
  timestamp: string;
  urgency: string;
  status: string;
}

interface ConsultationEnquiry {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  practiceArea: string;
  description: string;
  timestamp: string;
  status: string;
  assignedAdvocate?: string;
}

const INDIAN_STATES_28 = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

const UNION_TERRITORIES_8 = [
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi (NCT)', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
];

export const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  // Login form state
  const [email, setEmail] = useState('admin@puniaassociates.site');
  const [password, setPassword] = useState('PuniaLaw@2026');
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Active Admin Tab (Default to Complete Legal Document Manager)
  const [activeTab, setActiveTab] = useState<string>('legal-doc-manager');

  // Dashboard & State Collections
  const [stats, setStats] = useState<any>(null);
  const [queries, setQueries] = useState<ClientAIQuery[]>([]);
  const [advocateLeads, setAdvocateLeads] = useState<AdvocateLead[]>([]);
  const [consultations, setConsultations] = useState<ConsultationEnquiry[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // CMS Collections (Initialized with static database so UI is immediately ready)
  const [judgments, setJudgments] = useState<Judgment[]>(INITIAL_JUDGMENTS);
  const [courtOrders, setCourtOrders] = useState<CourtOrder[]>(INITIAL_COURT_ORDERS);
  const [legalNews, setLegalNews] = useState<LegalNewsItem[]>(INITIAL_LEGAL_NEWS);
  const [articles, setArticles] = useState<LegalArticle[]>(INITIAL_LEGAL_ARTICLES);
  const [bareActs, setBareActs] = useState<BareAct[]>(BARE_ACTS_DATABASE);
  const [auditLogs, setAuditLogs] = useState<AuditEvent[]>([]);
  const [lawyers, setLawyers] = useState<NetworkAdvocate[]>(NETWORK_ADVOCATES);

  // State & UT Filter states for Bare Acts
  const [selectedStateFilter, setSelectedStateFilter] = useState<string>('Haryana');
  const [selectedUtFilter, setSelectedUtFilter] = useState<string>('Delhi (NCT)');

  // Search & Filter state for CMS tables
  const [cmsSearch, setCmsSearch] = useState('');
  const [cmsCourtFilter, setCmsCourtFilter] = useState('All');

  // Modals state
  const [showJudgmentModal, setShowJudgmentModal] = useState(false);
  const [editingJudgment, setEditingJudgment] = useState<Partial<Judgment> | null>(null);
  const [judgmentSaveError, setJudgmentSaveError] = useState('');

  // Article Modal State
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Partial<LegalArticle> | null>(null);

  // Bare Act Modal State
  const [showActModal, setShowActModal] = useState(false);
  const [editingAct, setEditingAct] = useState<Partial<BareAct> | null>(null);
  const [showBareActsBulkUpload, setShowBareActsBulkUpload] = useState(true);

  // PDF Preview Modal State
  const [previewPdfUrl, setPreviewPdfUrl] = useState<string | null>(null);
  const [previewPdfTitle, setPreviewPdfTitle] = useState<string>('Legal Document PDF');

  // RESOURCE UPLOADER PORTAL STATE
  const [uploadMode, setUploadMode] = useState<'single' | 'bulk'>('single');
  const [selectedCategoryType, setSelectedCategoryType] = useState<string>('Bare Acts');
  
  // Single Resource Upload Fields
  const [singleTitle, setSingleTitle] = useState('');
  const [singleJurisdiction, setSingleJurisdiction] = useState('Central');
  const [singleYear, setSingleYear] = useState('2024');
  const [singleAuthor, setSingleAuthor] = useState('');
  const [singleSummary, setSingleSummary] = useState('');
  const [singlePdfUrlInput, setSinglePdfUrlInput] = useState('');
  const [singleFileObj, setSingleFileObj] = useState<File | null>(null);
  const [isSingleSubmitting, setIsSingleSubmitting] = useState(false);
  const [uploadSuccessAlert, setUploadSuccessAlert] = useState('');
  const [uploadErrorAlert, setUploadErrorAlert] = useState('');

  // Bulk Import State
  const [importTargetModule, setImportTargetModule] = useState<string>('Bare Acts');
  const [importFileType, setImportFileType] = useState<'CSV' | 'DOCX' | 'ZIP'>('CSV');
  const [importRawText, setImportRawText] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [importSummary, setImportSummary] = useState<any>(null);

  // Load Dashboard Data
  const fetchDashboardData = async () => {
    setIsRefreshing(true);
    try {
      const safeFetch = (url: string) => fetch(url).catch(() => null);
      const [ovRes, jRes, oRes, nRes, aRes, bRes, cRes, audRes] = await Promise.all([
        safeFetch('/api/admin/overview'),
        safeFetch('/api/judgments?limit=100'),
        safeFetch('/api/court-orders'),
        safeFetch('/api/legal-news'),
        safeFetch('/api/articles'),
        safeFetch('/api/bare-acts'),
        safeFetch('/api/consultations'),
        safeFetch('/api/admin/audit-logs')
      ]);

      const [ovData, jData, oData, nData, aData, bData, cData, audData] = await Promise.all([
        safeParseJson(ovRes),
        safeParseJson(jRes),
        safeParseJson(oRes),
        safeParseJson(nRes),
        safeParseJson(aRes),
        safeParseJson(bRes),
        safeParseJson(cRes),
        safeParseJson(audRes)
      ]);

      if (ovData) {
        setStats(ovData.stats);
        setQueries(ovData.recentQueries || []);
        setAdvocateLeads(ovData.advocateLeads || []);
      }
      if (jData && Array.isArray(jData.judgments)) {
        setJudgments(jData.judgments);
      }
      if (oData && Array.isArray(oData)) {
        setCourtOrders(oData);
      }
      if (nData) {
        const newsList = Array.isArray(nData.news) ? nData.news : Array.isArray(nData) ? nData : null;
        if (newsList) setLegalNews(newsList);
      }
      if (aData) {
        const artList = Array.isArray(aData.articles) ? aData.articles : Array.isArray(aData) ? aData : null;
        if (artList) setArticles(artList);
      }
      if (bData) {
        const actsList = Array.isArray(bData.acts) ? bData.acts : Array.isArray(bData) ? bData : null;
        if (actsList && actsList.length > 0) setBareActs(actsList);
      }
      if (cData && Array.isArray(cData.consultations)) {
        setConsultations(cData.consultations);
      }
      if (audData && Array.isArray(audData.logs)) {
        setAuditLogs(audData.logs);
      }
    } catch (e) {
      console.warn('Admin dashboard sync fallback active:', e);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardData();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem('punia_admin_token', data.token);
        setIsAuthenticated(true);
      } else {
        setLoginError(data.message || 'Invalid credentials');
      }
    } catch {
      setLoginError('Connection error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('punia_admin_token');
    setIsAuthenticated(false);
  };

  const handleDemoLogin = () => {
    setEmail('admin@puniaassociates.site');
    setPassword('PuniaLaw@2026');
  };

  // Submit Single Resource Upload (Uses 4 MB Chunked Upload + PDF Size Shortener for files)
  const handleSingleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!singleTitle.trim() && !singleFileObj) {
      setUploadErrorAlert('Please select a PDF/document file or enter a Resource Title.');
      return;
    }

    setIsSingleSubmitting(true);
    setUploadSuccessAlert('');
    setUploadErrorAlert('');

    try {
      if (singleFileObj) {
        const chunkRes = await uploadSingleFileChunked(singleFileObj, {
          resourceCategory: selectedCategoryType,
          compressionMode: 'smart',
          autoCommit: true,
          title: singleTitle.trim(),
          jurisdiction: singleJurisdiction,
          year: singleYear,
          author: singleAuthor,
          summary: singleSummary
        });

        if (chunkRes.success && chunkRes.response) {
          const data = chunkRes.response;
          const publishedTitle =
            data.item?.title ||
            data.item?.caseTitle ||
            singleTitle ||
            singleFileObj.name ||
            'Resource';
          const sizeInfo =
            chunkRes.compression.savedBytes > 0
              ? ` (PDF Size Shortened: ${formatBytes(chunkRes.compression.originalBytes)} → ${formatBytes(chunkRes.compression.compressedBytes)}, ${chunkRes.compression.savedPercent}% saved)`
              : ` (${formatBytes(chunkRes.compression.compressedBytes)})`;
          setUploadSuccessAlert(
            `Successfully uploaded & published "${publishedTitle}" under ${selectedCategoryType}${sizeInfo}!`
          );
          setSingleTitle('');
          setSingleSummary('');
          setSinglePdfUrlInput('');
          setSingleFileObj(null);
          fetchDashboardData();
        } else {
          setUploadErrorAlert(chunkRes.error || 'Failed to upload resource.');
        }
      } else {
        const res = await fetch('/api/admin/upload-legal-resource', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            resourceCategory: selectedCategoryType,
            title: singleTitle.trim(),
            jurisdiction: singleJurisdiction,
            year: singleYear,
            author: singleAuthor,
            summary: singleSummary,
            pdfUrl: singlePdfUrlInput
          })
        });

        const data = await res.json().catch(() => ({}));
        if (res.ok && data.success) {
          const publishedTitle = data.item?.title || data.item?.caseTitle || singleTitle || 'Resource';
          setUploadSuccessAlert(`Successfully uploaded & published "${publishedTitle}" under ${selectedCategoryType}!`);
          setSingleTitle('');
          setSingleSummary('');
          setSinglePdfUrlInput('');
          setSingleFileObj(null);
          fetchDashboardData();
        } else {
          setUploadErrorAlert(data.error || `Failed to upload resource (HTTP ${res.status}).`);
        }
      }
    } catch {
      setUploadErrorAlert('Network error while uploading resource.');
    } finally {
      setIsSingleSubmitting(false);
    }
  };

  // Execute Bulk Import
  const handleRunBulkImport = async () => {
    setIsImporting(true);
    setImportSummary(null);

    try {
      const res = await fetch('/api/admin/bulk-import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetModule: importTargetModule,
          fileType: importFileType,
          rawContent: importRawText
        })
      });

      const data = await res.json();
      setImportSummary(data);
      fetchDashboardData();
    } catch {
      setImportSummary({ error: 'Bulk import connection failed.' });
    } finally {
      setIsImporting(false);
    }
  };

  // Download Import Templates
  const handleDownloadTemplate = (type: 'CSV' | 'DOCX') => {
    let content = '';
    let filename = `punia_${importTargetModule.toLowerCase().replace(/\s+/g, '_')}_template.${type.toLowerCase()}`;

    if (type === 'CSV') {
      content = `title,jurisdiction,year,category,author,summary,pdfUrl\n"The Bharatiya Nagarik Suraksha Sanhita 2023","Central","2023","Criminal & Procedural","Parliament of India","An Act to consolidate procedure...","https://cdnbbsr.s3waas.gov.in/s380537a945c7fafbce8c4b7cac88acb18/uploads/2024/05/2024050195.pdf"`;
    } else {
      content = `PUNIA ASSOCIATES LEGAL RESOURCE IMPORT TEMPLATE (${importTargetModule.toUpperCase()})\nTitle: The Bharatiya Nagarik Suraksha Sanhita 2023\nJurisdiction: Central\nYear: 2023\nCategory: Criminal & Procedural\nSummary: An Act to consolidate criminal procedure in India...`;
    }

    const blob = new Blob([content], { type: type === 'CSV' ? 'text/csv' : 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  // Save Judgment
  const handleSaveJudgment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingJudgment?.caseTitle || !editingJudgment?.court) {
      setJudgmentSaveError('Case Title and Court are mandatory.');
      return;
    }

    setJudgmentSaveError('');
    const isEdit = !!editingJudgment.id;
    const url = isEdit ? `/api/judgments/${editingJudgment.id}` : '/api/judgments';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingJudgment)
      });

      const data = await res.json();
      if (res.ok) {
        setShowJudgmentModal(false);
        setEditingJudgment(null);
        fetchDashboardData();
      } else {
        setJudgmentSaveError(data.error || 'Failed to save judgment.');
      }
    } catch {
      setJudgmentSaveError('Network error while saving judgment.');
    }
  };

  // Filtered Judgments
  const filteredJudgments = judgments.filter(j => {
    const matchesSearch = cmsSearch === '' || 
      j.caseTitle.toLowerCase().includes(cmsSearch.toLowerCase()) ||
      j.caseNumber.toLowerCase().includes(cmsSearch.toLowerCase()) ||
      (j.neutralCitation && j.neutralCitation.toLowerCase().includes(cmsSearch.toLowerCase())) ||
      j.subject.toLowerCase().includes(cmsSearch.toLowerCase());

    const matchesCourt = cmsCourtFilter === 'All' || j.court.includes(cmsCourtFilter);
    return matchesSearch && matchesCourt;
  });

  return (
    <>
      <SEOHead
        title="Upload Legal Resources & Admin Area | Punia Associates"
        description="Admin area to upload Bare Acts, Rules, Codes, Notifications, Books, PDFs, and Formats in single or bulk mode."
        canonicalPath="/admin"
      />

      <div className="min-h-screen bg-slate-900 text-slate-100 py-6 px-4 sm:px-6 lg:px-8 font-sans">
        
        {/* LOGIN SCREEN */}
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto my-12 bg-slate-800/90 border border-amber-500/40 rounded-3xl p-8 shadow-2xl backdrop-blur-md">
            <div className="text-center mb-8">
              <div className="inline-flex p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 mb-3">
                <Scale className="w-8 h-8" />
              </div>
              <h2 className="font-serif text-3xl font-bold text-white">
                Punia Associates Chambers
              </h2>
              <p className="text-xs text-amber-300 font-mono mt-1">
                LEGAL CMS & RESOURCE UPLOADER PORTAL
              </p>
            </div>

            {loginError && (
              <div className="mb-4 p-3 bg-red-950/80 border border-red-500/60 rounded-xl text-xs text-red-300 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Admin Email ID
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@puniaassociates.site"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Secure Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#0B1325] font-bold text-xs rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
                <span>Log In to Admin Area</span>
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-slate-700/80 text-center">
              <button
                type="button"
                onClick={handleDemoLogin}
                className="px-3.5 py-1.5 bg-slate-700/80 hover:bg-slate-700 text-amber-300 text-xs font-medium rounded-lg border border-slate-600 cursor-pointer"
              >
                Fill Demo Credentials (admin@puniaassociates.site)
              </button>
            </div>
          </div>
        ) : (
          /* AUTHENTICATED ADMIN AREA */
          <div className="max-w-7xl mx-auto space-y-6">
            
            {/* Top Header */}
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4 shadow-xl backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="font-serif text-2xl font-bold text-white">
                    Punia Associates — Legal Resource Upload & Admin Area
                  </h1>
                  <p className="text-xs text-slate-400">
                    Administrator: <strong className="text-amber-400">Adv. Rajeshwar S. Punia</strong> • Single & Bulk Legal Content Manager
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/admin/ai-legal-research"
                  className="px-4 py-2 bg-gradient-to-r from-emerald-800 to-emerald-950 hover:from-emerald-700 hover:to-emerald-900 text-amber-300 border border-amber-500/40 text-xs font-bold rounded-xl flex items-center gap-2 shadow-lg transition cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>AI Legal Research Desk (/admin/ai-legal-research)</span>
                </Link>

                <button
                  onClick={fetchDashboardData}
                  disabled={isRefreshing}
                  className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-medium rounded-xl flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-amber-400' : ''}`} />
                  <span>Refresh</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="px-3 py-2 bg-red-950/60 hover:bg-red-900/80 text-red-300 text-xs font-medium rounded-xl border border-red-800/50 flex items-center gap-1.5 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>

            {/* TOP TAB GROUPS */}
            <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-3 space-y-3 shadow-lg">
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { id: 'legal-doc-manager', label: '⚖️ Legal Document Manager (15 Operations)', icon: Database, highlight: true },
                  { id: 'ai-doc-intelligence', label: '🧠 AI Document Intelligence & Vault', icon: Sparkles, highlight: false },
                  { id: 'resource-uploader', label: '📤 Upload Legal Resources (Single / Bulk)', icon: Upload, highlight: false },
                  { id: 'overview', label: 'Overview', icon: BarChart3 },
                  { id: 'central-acts', label: `Bare Acts (${bareActs.length})`, icon: Landmark },
                  { id: 'articles', label: `Articles (${articles.length})`, icon: FileText },
                  { id: 'judgments', label: `Judgments (${judgments.length})`, icon: Scale },
                  { id: 'books', label: 'Books & PDFs', icon: BookOpen },
                  { id: 'consultations', label: `Consultations (${consultations.length})`, icon: MessageSquare },
                  { id: 'audit', label: `Audit Logs (${auditLogs.length})`, icon: History }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeTab === tab.id
                        ? (tab.highlight ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-lg ring-2 ring-amber-400/40' : 'bg-amber-500 text-slate-950 shadow-md')
                        : 'bg-slate-900/80 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* MASTER LEGAL DOCUMENT MANAGER (15 OPERATIONS) */}
            {activeTab === 'legal-doc-manager' && (
              <LegalDocumentManager />
            )}

            {/* ENTERPRISE AI LEGAL DOCUMENT INTELLIGENCE, 27 PRACTICE AREAS & CONFIDENTIAL VAULT */}
            {activeTab === 'ai-doc-intelligence' && (
              <AdminDocumentIntelligenceHub />
            )}

            {/* MAIN TAB: DEDICATED UPLOAD LEGAL RESOURCES PORTAL */}
            {activeTab === 'resource-uploader' && (
              <div className="space-y-6">
                
                {/* Upload Category Selector Cards */}
                <div className="bg-slate-800/90 border border-slate-700 rounded-3xl p-6 space-y-6 shadow-xl">
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700 pb-4">
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-white flex items-center gap-2">
                        <FolderPlus className="w-6 h-6 text-amber-400" />
                        <span>Select Legal Resource Category to Upload</span>
                      </h2>
                      <p className="text-xs text-slate-300 mt-1">
                        Choose what type of legal material you are uploading to automatically publish to the correct library.
                      </p>
                    </div>

                    {/* Single vs Bulk Mode Selector */}
                    <div className="flex items-center p-1 bg-slate-900 rounded-2xl border border-slate-700">
                      <button
                        onClick={() => setUploadMode('single')}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          uploadMode === 'single'
                            ? 'bg-amber-500 text-slate-950 shadow'
                            : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        Single Item Upload
                      </button>
                      <button
                        onClick={() => setUploadMode('bulk')}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          uploadMode === 'bulk'
                            ? 'bg-amber-500 text-slate-950 shadow'
                            : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        Bulk Upload (CSV/DOCX/ZIP)
                      </button>
                    </div>
                  </div>

                  {/* 8 Resource Category Selector Cards Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                    {[
                      { type: 'Bare Acts', icon: BookOpen, desc: 'Central & State Acts', color: 'border-blue-500/50 bg-blue-950/30 text-blue-300' },
                      { type: 'Rules & Regulations', icon: Layers, desc: 'High Court Rules', color: 'border-teal-500/50 bg-teal-950/30 text-teal-300' },
                      { type: 'Codes', icon: Landmark, desc: 'IPC, CrPC, CPC, BNS', color: 'border-amber-500/50 bg-amber-950/30 text-amber-300' },
                      { type: 'Notifications & Circulars', icon: FileCheck2, desc: 'Gazette Notifications', color: 'border-orange-500/50 bg-orange-950/30 text-orange-300' },
                      { type: 'Legal Books & PDFs', icon: BookMarked, desc: 'Commentaries & PDFs', color: 'border-purple-500/50 bg-purple-950/30 text-purple-300' },
                      { type: 'Forms & Formats', icon: FileCode, desc: 'Petition Drafts', color: 'border-emerald-500/50 bg-emerald-950/30 text-emerald-300' },
                      { type: 'Judgments', icon: Scale, desc: 'SC & High Court Rulings', color: 'border-red-500/50 bg-red-950/30 text-red-300' },
                      { type: 'Articles', icon: FileText, desc: 'Research & Commentaries', color: 'border-cyan-500/50 bg-cyan-950/30 text-cyan-300' }
                    ].map(cat => {
                      const IconComp = cat.icon;
                      const isSelected = selectedCategoryType === cat.type;
                      return (
                        <button
                          key={cat.type}
                          onClick={() => {
                            setSelectedCategoryType(cat.type);
                            setImportTargetModule(cat.type);
                          }}
                          className={`p-3.5 rounded-2xl border transition-all text-center flex flex-col items-center justify-center space-y-2 cursor-pointer ${
                            isSelected
                              ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-lg ring-2 ring-amber-400/50 scale-[1.02]'
                              : 'bg-slate-900/80 border-slate-700 text-slate-300 hover:border-amber-400/50'
                          }`}
                        >
                          <IconComp className={`w-5 h-5 ${isSelected ? 'text-slate-950' : ''}`} />
                          <div>
                            <span className="text-xs font-bold block">{cat.type}</span>
                            <span className={`text-[10px] block ${isSelected ? 'text-slate-900' : 'text-slate-400'}`}>{cat.desc}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {uploadErrorAlert && (
                    <div className="p-4 bg-red-950 border border-red-500 text-red-200 text-xs rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
                        <span>{uploadErrorAlert}</span>
                      </div>
                      <button onClick={() => setUploadErrorAlert('')} className="text-red-400 hover:text-white cursor-pointer"><X className="w-4 h-4" /></button>
                    </div>
                  )}

                  {uploadSuccessAlert && (
                    <div className="p-4 bg-emerald-950 border border-emerald-500 text-emerald-300 text-xs rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                        <span>{uploadSuccessAlert}</span>
                      </div>
                      <button onClick={() => setUploadSuccessAlert('')} className="text-emerald-400 hover:text-white cursor-pointer"><X className="w-4 h-4" /></button>
                    </div>
                  )}

                  {/* MODE A: SINGLE ITEM RESOURCE UPLOAD FORM */}
                  {uploadMode === 'single' ? (
                    <form onSubmit={handleSingleUploadSubmit} className="space-y-4 pt-2">
                      <div className="p-4 bg-slate-900 border border-slate-700 rounded-2xl space-y-4">
                        <span className="text-xs font-mono text-amber-400 uppercase tracking-wider block font-semibold">
                          Single {selectedCategoryType} Upload Details (Auto-Extracts Title & Pages from PDF)
                        </span>

                        {/* File Upload Drop Zone FIRST so selecting a file auto-fills title & year */}
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">
                            1. Select PDF / Document File (or Paste PDF URL)
                          </label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {/* Drag & Drop File Picker */}
                            <label className="p-4 bg-slate-800 border-2 border-dashed border-amber-500/50 hover:border-amber-400 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer transition-colors">
                              <FileUp className="w-6 h-6 text-amber-400 mb-1" />
                              <span className="text-xs font-bold text-white">
                                {singleFileObj ? `Selected: ${singleFileObj.name} (${Math.round(singleFileObj.size / 1024)} KB)` : 'Click Here to Choose PDF / ZIP / DOCX File'}
                              </span>
                              <span className="text-[10px] text-slate-400 mt-0.5">
                                {selectedCategoryType === 'Bare Acts' ? 'Supports .pdf, .zip (Bulk Archive), .docx, .txt' : 'Supports .pdf, .docx, .txt'}
                              </span>
                              <input
                                type="file"
                                accept={selectedCategoryType === 'Bare Acts' ? '.pdf,application/pdf,.docx,.txt,.zip,application/zip,application/x-zip-compressed' : '.pdf,application/pdf,.docx,.txt'}
                                onChange={(e) => {
                                  if (e.target.files && e.target.files[0]) {
                                    const file = e.target.files[0];
                                    setSingleFileObj(file);
                                    setUploadErrorAlert('');
                                    // Auto-populate title and year from filename if not manually typed
                                    const cleanedName = file.name
                                      .replace(/\.[^/.]+$/, '')
                                      .replace(/_[0-9a-f]{8}$/i, '')
                                      .replace(/[_.\-]+/g, ' ')
                                      .trim();
                                    if (!singleTitle.trim() && cleanedName) {
                                      setSingleTitle(cleanedName);
                                    }
                                    const yrMatch = cleanedName.match(/\b(18\d\d|19\d\d|20\d\d)\b/);
                                    if (yrMatch) {
                                      setSingleYear(yrMatch[1]);
                                    }
                                  }
                                }}
                                className="hidden"
                              />
                            </label>

                            {/* Direct Web PDF URL */}
                            <div className="flex flex-col justify-center">
                              <input
                                type="text"
                                value={singlePdfUrlInput}
                                onChange={(e) => setSinglePdfUrlInput(e.target.value)}
                                placeholder="Or paste PDF Web URL (e.g. https://...)"
                                className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                              />
                              <span className="text-[10px] text-slate-400 mt-1">PDFs automatically render in the built-in reader & allow instant download.</span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">
                              2. Resource Title {singleFileObj ? '(Auto-detected from PDF if left blank)' : '*'}
                            </label>
                            <input
                              type="text"
                              value={singleTitle}
                              onChange={(e) => setSingleTitle(e.target.value)}
                              placeholder={`e.g. ${selectedCategoryType === 'Bare Acts' ? 'The Code of Civil Procedure, 1908' : 'Order 39 CPC Injunction Trial Manual'}`}
                              className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">Jurisdiction / Court</label>
                            <input
                              type="text"
                              value={singleJurisdiction}
                              onChange={(e) => setSingleJurisdiction(e.target.value)}
                              placeholder="Central / Haryana / Punjab / Delhi / Supreme Court"
                              className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">Year / Date</label>
                            <input
                              type="text"
                              value={singleYear}
                              onChange={(e) => setSingleYear(e.target.value)}
                              placeholder="2024"
                              className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">Author / Issuing Body</label>
                            <input
                              type="text"
                              value={singleAuthor}
                              onChange={(e) => setSingleAuthor(e.target.value)}
                              placeholder="Parliament of India / High Court Registry / Punia Associates"
                              className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">Preamble / Abstract / Summary</label>
                          <textarea
                            rows={3}
                            value={singleSummary}
                            onChange={(e) => setSingleSummary(e.target.value)}
                            placeholder="Brief description or preamble of the legal resource..."
                            className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isSingleSubmitting}
                          className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg flex items-center gap-2 cursor-pointer"
                        >
                          {isSingleSubmitting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                          <span>Upload & Publish {selectedCategoryType}</span>
                        </button>
                      </div>
                    </form>
                  ) : (
                    /* MODE B: DEDICATED BULK UPLOAD ENGINE (MULTI-PDF & ZIP ARCHIVES) */
                    <BareActsBulkArchiveUploader
                      onImportComplete={fetchDashboardData}
                      selectedCategoryType={selectedCategoryType}
                    />
                  )}

                </div>
              </div>
            )}

            {/* OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
                    <span className="text-xs font-mono text-amber-400 uppercase">Judgments CMS</span>
                    <p className="text-3xl font-bold text-white mt-1">{judgments.length}</p>
                    <span className="text-xs text-slate-400 mt-1 block">Landmark Supreme & High Court Precedents</span>
                  </div>

                  <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
                    <span className="text-xs font-mono text-emerald-400 uppercase">Bare Acts & Laws</span>
                    <p className="text-3xl font-bold text-white mt-1">{bareActs.length}</p>
                    <span className="text-xs text-slate-400 mt-1 block">Central, 28 States & 8 UT Legislation</span>
                  </div>

                  <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
                    <span className="text-xs font-mono text-cyan-400 uppercase">Consultations Intake</span>
                    <p className="text-3xl font-bold text-white mt-1">{consultations.length}</p>
                    <span className="text-xs text-slate-400 mt-1 block">Form Enquiries & Client Submissions</span>
                  </div>

                  <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
                    <span className="text-xs font-mono text-purple-400 uppercase">Audit Events</span>
                    <p className="text-3xl font-bold text-white mt-1">{auditLogs.length}</p>
                    <span className="text-xs text-slate-400 mt-1 block">Logged Actions & Security History</span>
                  </div>
                </div>

                <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-6">
                  <h3 className="font-serif text-xl font-bold text-white mb-4">Quick Action Shortcuts</h3>
                  <div className="flex flex-wrap gap-3">
                    <button onClick={() => setActiveTab('resource-uploader')} className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer">
                      <Upload className="w-4 h-4" /> Open Resource Uploader Portal
                    </button>
                    <button onClick={() => setActiveTab('judgments')} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer">
                      <Plus className="w-4 h-4" /> Add Judgment
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* BARE ACTS */}
            {activeTab === 'central-acts' && (
              <div className="space-y-6">
                <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                      <Landmark className="w-5 h-5 text-amber-400" />
                      <span>Bare Acts Administration & Ingestion Portal ({bareActs.length})</span>
                    </h3>
                    <p className="text-xs text-slate-400 font-sans">
                      Central, State, and Union Territory Bare Acts repository with ZIP archive batch processing & single file upload.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowBareActsBulkUpload((prev) => !prev)}
                      className={`px-4 py-2 font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer transition ${
                        showBareActsBulkUpload
                          ? 'bg-amber-500 text-slate-950 shadow-md'
                          : 'bg-slate-700 hover:bg-slate-600 text-white'
                      }`}
                    >
                      <FolderArchive className="w-4 h-4" />
                      <span>{showBareActsBulkUpload ? 'Collapse Bulk Ingestion' : 'Bulk Upload Bare Acts (ZIP / Multi-PDF)'}</span>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedCategoryType('Bare Acts');
                        setActiveTab('resource-uploader');
                      }}
                      className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
                    >
                      <Upload className="w-4 h-4" /> Single Upload Form
                    </button>
                  </div>
                </div>

                {/* Bulk Bare Acts ZIP Archive Ingestion Component */}
                {showBareActsBulkUpload && (
                  <BareActsBulkArchiveUploader
                    onImportComplete={fetchDashboardData}
                    selectedCategoryType="Bare Acts"
                  />
                )}

                <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-xl">
                  <div className="p-4 border-b border-slate-700 bg-slate-850 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300">
                      Active Bare Acts Repository ({bareActs.length} Acts In Force)
                    </span>
                    <button
                      onClick={fetchDashboardData}
                      className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Refresh List
                    </button>
                  </div>
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-900 text-slate-400 uppercase text-[10px]">
                      <tr>
                        <th className="p-4">Act Title</th>
                        <th className="p-4">Year & Act No.</th>
                        <th className="p-4">Jurisdiction</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">PDF Document</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                      {bareActs.map((act) => (
                        <tr key={act.id} className="hover:bg-slate-750">
                          <td className="p-4">
                            <strong className="font-bold text-white block">{act.title}</strong>
                            <div className="flex flex-wrap items-center gap-2 mt-0.5">
                              {act.originalFileName && (
                                <span className="text-[11px] text-slate-400 font-mono">
                                  File: {act.originalFileName}
                                </span>
                              )}
                              {act.pageCount && act.pageCount > 0 && (
                                <span className="px-1.5 py-0.5 bg-cyan-950 text-cyan-300 border border-cyan-500/30 rounded text-[10px] font-mono font-bold">
                                  {act.pageCount} pages
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="p-4 font-mono text-emerald-400">
                            {act.year} ({act.actNumber})
                          </td>
                          <td className="p-4">{act.jurisdiction}</td>
                          <td className="p-4">
                            <span className="px-2 py-0.5 bg-slate-900 text-slate-300 rounded text-[11px] border border-slate-700">
                              {act.category || 'Special & Local Laws'}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 rounded font-bold">
                              {act.status}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <div className="inline-flex items-center justify-end gap-1.5">
                              {act.pdfUrl && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setPreviewPdfTitle(act.title);
                                    setPreviewPdfUrl(act.pdfUrl || null);
                                  }}
                                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-700 hover:bg-slate-600 text-amber-300 rounded-lg text-xs font-semibold cursor-pointer"
                                  title="Preview PDF in Built-in Reader"
                                >
                                  <Eye className="w-3 h-3" /> Read PDF
                                </button>
                              )}
                              <a
                                href={`/api/bare-acts/${act.id}/download`}
                                download={`${(act.shortTitle || act.title).replace(/[/\\?%*:|"<>]/g, '_')}.pdf`}
                                className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg text-xs font-bold shadow cursor-pointer"
                                title="Download Official PDF"
                              >
                                <Download className="w-3 h-3" /> Download
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ARTICLES */}
            {activeTab === 'articles' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-slate-800 p-4 rounded-2xl border border-slate-700">
                  <h3 className="font-serif text-xl font-bold text-white">Articles & Publications ({articles.length})</h3>
                  <button
                    onClick={() => setActiveTab('resource-uploader')}
                    className="px-4 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer"
                  >
                    <Upload className="w-4 h-4" /> Upload Article
                  </button>
                </div>

                <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-900 text-slate-400 uppercase text-[10px]">
                      <tr>
                        <th className="p-4">Title</th>
                        <th className="p-4">Subject</th>
                        <th className="p-4">Author</th>
                        <th className="p-4">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                      {articles.map((art) => (
                        <tr key={art.id} className="hover:bg-slate-750">
                          <td className="p-4 font-bold text-white">{art.title}</td>
                          <td className="p-4">{art.subject}</td>
                          <td className="p-4">{art.author}</td>
                          <td className="p-4">{art.publicationDate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* JUDGMENTS */}
            {activeTab === 'judgments' && (
              <div className="space-y-4">
                <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 flex justify-between items-center">
                  <h3 className="font-serif text-xl font-bold text-white">Judgments CMS ({judgments.length})</h3>
                  <button
                    onClick={() => setActiveTab('resource-uploader')}
                    className="px-4 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer"
                  >
                    <Upload className="w-4 h-4" /> Upload Judgment
                  </button>
                </div>

                <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden shadow-xl">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-900 text-slate-400 uppercase text-[10px]">
                      <tr>
                        <th className="p-4">Case Title & Court</th>
                        <th className="p-4">Citation & Number</th>
                        <th className="p-4">Subject</th>
                        <th className="p-4">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                      {filteredJudgments.map((j) => (
                        <tr key={j.id} className="hover:bg-slate-750">
                          <td className="p-4"><strong className="text-white block">{j.caseTitle}</strong><span className="text-amber-300">{j.court}</span></td>
                          <td className="p-4 font-mono text-emerald-400">{j.neutralCitation || j.caseNumber}</td>
                          <td className="p-4">{j.subject}</td>
                          <td className="p-4 text-slate-400">{j.decisionDate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* BOOKS */}
            {activeTab === 'books' && (
              <div className="space-y-4">
                <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-serif text-xl font-bold text-white">Legal Books & PDF Manuals</h3>
                    <button onClick={() => setActiveTab('resource-uploader')} className="px-4 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer">
                      <Upload className="w-4 h-4" /> Upload PDF Book
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 space-y-2">
                      <span className="text-xs font-bold text-amber-400 block">Commentary on BNSS 2023 (PDF Manual)</span>
                      <p className="text-xs text-slate-300">Complete chamber treatise comparing CrPC 1973 with BNSS 2023.</p>
                      <button
                        onClick={() => {
                          setPreviewPdfTitle('Commentary on BNSS 2023');
                          setPreviewPdfUrl('https://cdnbbsr.s3waas.gov.in/s380537a945c7fafbce8c4b7cac88acb18/uploads/2024/05/2024050195.pdf');
                        }}
                        className="px-3 py-1.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1.5 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" /> Open Online PDF Reader
                      </button>
                    </div>

                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 space-y-2">
                      <span className="text-xs font-bold text-emerald-400 block">Section 138 NI Act Trial Guide (PDF Manual)</span>
                      <p className="text-xs text-slate-300">Handbook covering demand notices, Section 143A interim compensation.</p>
                      <button
                        onClick={() => {
                          setPreviewPdfTitle('Section 138 NI Act Trial Guide');
                          setPreviewPdfUrl('https://cdnbbsr.s3waas.gov.in/s380537a945c7fafbce8c4b7cac88acb18/uploads/2024/05/2024050195.pdf');
                        }}
                        className="px-3 py-1.5 bg-emerald-500 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1.5 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" /> Open Online PDF Reader
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* CONSULTATIONS */}
            {activeTab === 'consultations' && (
              <div className="space-y-4">
                <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
                  <h3 className="font-serif text-xl font-bold text-white">Consultation Enquiries ({consultations.length})</h3>
                </div>

                <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-900 text-slate-400 uppercase text-[10px]">
                      <tr>
                        <th className="p-4">Client Details</th>
                        <th className="p-4">Practice Area</th>
                        <th className="p-4">Description</th>
                        <th className="p-4">Submitted At</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                      {consultations.map((c) => (
                        <tr key={c.id} className="hover:bg-slate-750">
                          <td className="p-4"><strong className="text-white block">{c.clientName}</strong><span className="text-amber-300">{c.clientPhone}</span></td>
                          <td className="p-4 font-semibold text-emerald-300">{c.practiceArea}</td>
                          <td className="p-4 max-w-xs line-clamp-2">{c.description}</td>
                          <td className="p-4 text-slate-400">{c.timestamp}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* AUDIT TRAIL */}
            {activeTab === 'audit' && (
              <div className="space-y-4">
                <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
                  <h3 className="font-serif text-xl font-bold text-white">Audit Trail Logs ({auditLogs.length})</h3>
                </div>

                <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden font-mono text-[11px]">
                  <table className="w-full text-left text-slate-300">
                    <thead className="bg-slate-900 text-slate-400 uppercase text-[10px]">
                      <tr>
                        <th className="p-4">Timestamp</th>
                        <th className="p-4">Action</th>
                        <th className="p-4">Target Title</th>
                        <th className="p-4">User</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                      {auditLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-slate-750">
                          <td className="p-4 text-slate-400">{log.timestamp}</td>
                          <td className="p-4"><span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded font-bold">{log.action}</span></td>
                          <td className="p-4 text-white font-sans font-medium">{log.targetTitle}</td>
                          <td className="p-4 text-slate-300">{log.performedBy}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>
        )}

      </div>

      {/* PDF PREVIEW MODAL */}
      {previewPdfUrl && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-500/40 rounded-2xl w-full max-w-4xl h-[80vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="p-4 bg-slate-800 border-b border-slate-700 flex justify-between items-center">
              <h4 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-400" />
                <span>{previewPdfTitle}</span>
              </h4>
              <button onClick={() => setPreviewPdfUrl(null)} className="p-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 bg-slate-950 p-2">
              <iframe src={previewPdfUrl} title={previewPdfTitle} className="w-full h-full border-0 rounded-xl" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

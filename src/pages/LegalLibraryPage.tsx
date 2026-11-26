import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Search,
  Filter,
  Download,
  Eye,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Scale,
  FileText,
  Calendar,
  Layers,
  Landmark,
  FileCheck2,
  AlertTriangle,
  FolderArchive,
  ChevronRight,
  X,
  Sparkles,
  Bookmark,
  Gavel,
  History,
  Info,
  Upload
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { BARE_ACTS_DATABASE, BareAct } from '../data/bareActsData';
import { INITIAL_LEGAL_TAXONOMY, LegalCategory } from '../data/legalTaxonomyData';
import { INITIAL_JUDGMENTS, Judgment } from '../data/legalCmsData';

export const LegalLibraryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<string>('all');
  const [selectedDocType, setSelectedDocType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Active reading modal
  const [readingDoc, setReadingDoc] = useState<BareAct | null>(null);

  // Live database state
  const [dbActs, setDbActs] = useState<BareAct[]>(BARE_ACTS_DATABASE);
  const [loading, setLoading] = useState(false);

  const fetchLiveActs = useCallback(() => {
    setLoading(true);
    fetch('/api/bare-acts')
      .then(res => res.json())
      .then(data => {
        if (data.acts && Array.isArray(data.acts) && data.acts.length > 0) {
          setDbActs(data.acts);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchLiveActs();
  }, [fetchLiveActs]);

  // Combined documents list with enriched categorization
  const allDocuments = useMemo(() => {
    return dbActs.map(act => {
      let docType = 'Bare Act';
      if (act.title.toLowerCase().includes('rule')) docType = 'Rules & Regulations';
      else if (act.title.toLowerCase().includes('regulation')) docType = 'Rules & Regulations';
      else if (act.title.toLowerCase().includes('code')) docType = 'Statutory Code';
      else if (act.title.toLowerCase().includes('order') || act.title.toLowerCase().includes('notification')) docType = 'Notification';
      else if (act.jurisdiction !== 'Central') docType = 'State Law';
      else docType = 'Central Law';

      return {
        ...act,
        docType
      };
    });
  }, [dbActs]);

  // Filtered documents
  const filteredDocuments = useMemo(() => {
    return allDocuments.filter(doc => {
      // Search match
      const q = searchTerm.toLowerCase().trim();
      const matchSearch =
        !q ||
        doc.title.toLowerCase().includes(q) ||
        (doc.shortTitle && doc.shortTitle.toLowerCase().includes(q)) ||
        (doc.actNumber && doc.actNumber.toLowerCase().includes(q)) ||
        (doc.category && doc.category.toLowerCase().includes(q)) ||
        (doc.preamble && doc.preamble.toLowerCase().includes(q));

      // Category match
      let matchCat = true;
      if (selectedCategory !== 'all') {
        const cat = INITIAL_LEGAL_TAXONOMY.find(c => c.id === selectedCategory || c.slug === selectedCategory);
        if (cat) {
          matchCat = doc.category.toLowerCase().includes(cat.name.toLowerCase()) ||
                     cat.name.toLowerCase().includes(doc.category.toLowerCase());
        }
      }

      // Jurisdiction match
      const matchJur =
        selectedJurisdiction === 'all' ||
        doc.jurisdiction.toLowerCase() === selectedJurisdiction.toLowerCase();

      // Doc Type match
      let matchType = true;
      if (selectedDocType !== 'all') {
        if (selectedDocType === 'central') matchType = doc.jurisdiction === 'Central';
        else if (selectedDocType === 'state') matchType = doc.jurisdiction !== 'Central';
        else if (selectedDocType === 'rules') matchType = doc.docType === 'Rules & Regulations';
      }

      // Status match
      const matchStatus =
        selectedStatus === 'all' ||
        doc.status.toLowerCase().replace(/\s+/g, '') === selectedStatus.toLowerCase().replace(/\s+/g, '');

      return matchSearch && matchCat && matchJur && matchType && matchStatus;
    });
  }, [allDocuments, searchTerm, selectedCategory, selectedJurisdiction, selectedDocType, selectedStatus]);

  // Copy official link handler
  const handleCopyLink = (doc: BareAct) => {
    const link = doc.indiaCodeUrl || `https://puniaassociates.site/bare-acts/${doc.id}`;
    navigator.clipboard.writeText(link);
    setCopiedId(doc.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Metrics
  const metrics = useMemo(() => {
    const centralCount = allDocuments.filter(d => d.jurisdiction === 'Central').length;
    const stateCount = allDocuments.filter(d => d.jurisdiction !== 'Central').length;
    const haryanaCount = allDocuments.filter(d => d.jurisdiction === 'Haryana' || d.title.toLowerCase().includes('haryana')).length;
    return {
      total: allDocuments.length,
      central: centralCount,
      state: stateCount,
      haryana: haryanaCount,
      categoriesCount: INITIAL_LEGAL_TAXONOMY.length
    };
  }, [allDocuments]);

  return (
    <>
      <SEOHead
        title="Complete Legal Library & Bare Acts Repository | Punia Associates"
        description="Search, read and download India Central & State Bare Acts, statutory rules, landmark Supreme Court & High Court judgments, and legal drafting templates."
        canonicalPath="/legal-library"
      />

      {/* Hero & Universal Legal Search */}
      <section className="bg-gradient-to-b from-[#070D1B] via-[#0B1325] to-[#0E1A33] text-white pt-20 pb-12 border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wider uppercase">
              <Scale className="w-4 h-4" />
              <span>Official Legal Research Compendium</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verified Statutory Sources & Official Texts</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Punia Associates Legal Library
            </h1>
            <Link
              to="/admin"
              className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg flex items-center gap-2 cursor-pointer transition shrink-0"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Legal Documents / Bulk</span>
            </Link>
          </div>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed mb-8">
            Access, inspect, read, and download consolidated Central Acts, State Acts, statutory rules, government notifications, court judgments, and standard procedural formats.
          </p>

          {/* Quick Metrics Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 mb-8">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 shadow-sm">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">Total Statutes</span>
              <span className="text-xl font-bold text-amber-400">{metrics.total} Acts</span>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 shadow-sm">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">Central Laws</span>
              <span className="text-xl font-bold text-emerald-400">{metrics.central} Enactments</span>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 shadow-sm">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">State Legislation</span>
              <span className="text-xl font-bold text-sky-400">{metrics.state} Acts</span>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 shadow-sm">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">Haryana Compendium</span>
              <span className="text-xl font-bold text-purple-400">{metrics.haryana} Local Laws</span>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 shadow-sm col-span-2 sm:col-span-1">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">Taxonomy Structure</span>
              <span className="text-xl font-bold text-amber-300">17 Categories</span>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative max-w-3xl">
            <Search className="w-5 h-5 text-amber-400 absolute left-4 top-4" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Act Name, Section, Topic (e.g. BNS, BNSS 482, Order 39 CPC, NI Act 138, Haryana Rent)..."
              className="w-full pl-12 pr-10 py-3.5 bg-slate-900/95 border border-slate-700 rounded-2xl text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 shadow-2xl transition"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-4 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 mt-4 text-xs">
            <span className="text-slate-400 font-medium">Quick Jumps:</span>
            <button 
              onClick={() => { setSelectedCategory('all'); setSelectedDocType('all'); setSelectedJurisdiction('all'); setSearchTerm(''); }}
              className={`px-3 py-1 rounded-lg border transition ${selectedDocType === 'all' && selectedCategory === 'all' ? 'bg-amber-500 text-slate-950 font-bold border-amber-500' : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:border-slate-500'}`}
            >
              All Library
            </button>
            <button 
              onClick={() => setSelectedDocType('central')}
              className={`px-3 py-1 rounded-lg border transition ${selectedDocType === 'central' ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-500' : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:border-slate-500'}`}
            >
              Central Acts
            </button>
            <button 
              onClick={() => setSelectedJurisdiction('Haryana')}
              className={`px-3 py-1 rounded-lg border transition ${selectedJurisdiction === 'Haryana' ? 'bg-purple-500 text-white font-bold border-purple-500' : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:border-slate-500'}`}
            >
              Haryana Laws
            </button>
            <button 
              onClick={() => setSelectedCategory('cat-criminal')}
              className={`px-3 py-1 rounded-lg border transition ${selectedCategory === 'cat-criminal' ? 'bg-amber-500 text-slate-950 font-bold border-amber-500' : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:border-slate-500'}`}
            >
              Criminal Laws (BNS/BNSS/BSA)
            </button>
            <button 
              onClick={() => setSelectedCategory('cat-civil')}
              className={`px-3 py-1 rounded-lg border transition ${selectedCategory === 'cat-civil' ? 'bg-amber-500 text-slate-950 font-bold border-amber-500' : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:border-slate-500'}`}
            >
              Civil Procedure (CPC/Limitation)
            </button>
          </div>

        </div>
      </section>

      {/* Multi-Criteria Filters & Taxonomy Explorer */}
      <section className="bg-slate-100 border-b border-slate-200 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs">
          
          {/* Category Dropdown */}
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-amber-500"
            >
              <option value="all">All Categories (A to Q)</option>
              {INITIAL_LEGAL_TAXONOMY.map(cat => (
                <option key={cat.id} value={cat.id}>
                  [{cat.letter}] {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Jurisdiction Dropdown */}
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Jurisdiction:</span>
            <select
              value={selectedJurisdiction}
              onChange={(e) => setSelectedJurisdiction(e.target.value)}
              className="bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-amber-500"
            >
              <option value="all">All Jurisdictions (Global)</option>
              <option value="Central">🇮🇳 India Central</option>
              <option value="Haryana">🇮🇳 Haryana</option>
              <option value="Punjab">🇮🇳 Punjab</option>
              <option value="Delhi">🇮🇳 Delhi</option>
              <option value="United States">🇺🇸 United States</option>
              <option value="United Kingdom">🇬🇧 United Kingdom</option>
              <option value="Singapore">🇸🇬 Singapore</option>
              <option value="Australia">🇦🇺 Australia</option>
              <option value="Germany">🇩🇪 Germany</option>
              <option value="France">🇫🇷 France</option>
              <option value="Canada">🇨🇦 Canada</option>
              <option value="International">🌐 International & UN</option>
            </select>
          </div>

          {/* Status Dropdown */}
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Enforcement Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-amber-500"
            >
              <option value="all">All Statuses</option>
              <option value="inforce">In Force (Current)</option>
              <option value="repealed">Repealed / Historical</option>
            </select>
          </div>

          <div className="text-slate-500 font-medium">
            Showing <strong className="text-slate-900">{filteredDocuments.length}</strong> matching enactments
          </div>

        </div>
      </section>

      {/* Main Document Grid */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {filteredDocuments.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300 p-8">
            <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800 mb-1">No Legal Documents Matched</h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-4">
              We couldn't find any documents matching your current search or filter combination.
            </p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedCategory('all'); setSelectedJurisdiction('all'); setSelectedDocType('all'); }}
              className="px-4 py-2 bg-amber-500 text-slate-950 text-xs font-bold rounded-xl"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocuments.map((doc) => {
              const isPdfAvailable = !!doc.pdfUrl;
              const downloadUrl = doc.pdfUrl || `/api/bare-acts/${doc.id}/download`;

              return (
                <div
                  key={doc.id}
                  className="bg-white rounded-2xl border border-slate-200 hover:border-amber-500/50 hover:shadow-lg transition-all duration-200 flex flex-col justify-between p-5 group"
                >
                  <div>
                    {/* Top Badges */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${
                        doc.jurisdiction === 'Central' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-purple-50 text-purple-800 border border-purple-200'
                      }`}>
                        {doc.jurisdiction}
                      </span>

                      <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {doc.year || 'Statutory'}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-amber-800 transition-colors mb-2 line-clamp-2">
                      {doc.title}
                    </h3>

                    {/* Meta info */}
                    <div className="space-y-1.5 text-xs text-slate-600 mb-4">
                      <div className="flex items-center gap-1.5">
                        <FolderArchive className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{doc.category}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FileCheck2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span className="truncate">{doc.status || 'In Force — Consolidated'}</span>
                      </div>
                      {doc.fileSizeKb && (
                        <div className="text-[11px] text-slate-400">
                          Official PDF Size: {doc.fileSizeKb} KB
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    {/* Read Online Button */}
                    <button
                      onClick={() => setReadingDoc(doc)}
                      className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
                      title="Read Document Online"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Read Online</span>
                    </button>

                    {/* Download PDF Button */}
                    <a
                      href={downloadUrl}
                      download={`${doc.shortTitle || doc.title}.pdf`}
                      className="py-2 px-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-sm transition"
                      title="Download Official PDF"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </a>

                    {/* Copy Link */}
                    <button
                      onClick={() => handleCopyLink(doc)}
                      className="p-2 text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition"
                      title="Copy Official Source Link"
                    >
                      {copiedId === doc.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Embedded Reading Modal */}
      {readingDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 sm:p-6">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-[#0B1325] text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-white line-clamp-1">
                    {readingDoc.title}
                  </h3>
                  <span className="text-xs text-amber-300">
                    {readingDoc.jurisdiction} • {readingDoc.category} • Year {readingDoc.year}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={readingDoc.pdfUrl || `/api/bare-acts/${readingDoc.id}/download`}
                  download={`${readingDoc.title}.pdf`}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </a>

                <button
                  onClick={() => setReadingDoc(null)}
                  className="p-2 text-slate-400 hover:text-white rounded-lg transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              
              {/* Statutory Notice */}
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl">
                <div className="flex items-start gap-2.5">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-xs text-amber-900 leading-relaxed">
                    <strong>Statutory Disclaimer:</strong> This document is provided for research and general information.
                    The official e-Gazette notification and certified court copy prevail in case of any discrepancy.
                  </div>
                </div>
              </div>

              {/* Preamble & Summary */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Legislative Preamble</h4>
                <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200 font-serif">
                  {readingDoc.preamble || 'An Act to consolidate and amend the law relating to this subject across India.'}
                </p>
              </div>

              {/* Enactment Details */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block mb-0.5">Act Number</span>
                  <strong className="text-slate-800">{readingDoc.actNumber || 'N/A'}</strong>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block mb-0.5">Enactment Year</span>
                  <strong className="text-slate-800">{readingDoc.year}</strong>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block mb-0.5">Jurisdiction</span>
                  <strong className="text-slate-800">{readingDoc.jurisdiction}</strong>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block mb-0.5">Legal Status</span>
                  <strong className="text-emerald-700">{readingDoc.status}</strong>
                </div>
              </div>

              {/* PDF Viewer Preview if available */}
              {readingDoc.pdfUrl ? (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Document Preview</h4>
                  <div className="w-full h-96 bg-slate-100 rounded-xl border border-slate-200 overflow-hidden flex flex-col items-center justify-center">
                    <iframe
                      src={readingDoc.pdfUrl}
                      className="w-full h-full"
                      title={readingDoc.title}
                    />
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 bg-slate-50 rounded-xl border border-slate-200">
                  <FileText className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-xs text-slate-600">
                    PDF document is being indexed. You can generate or download the verified version directly.
                  </p>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span>SHA-256 Checksum: {readingDoc.fileChecksum ? readingDoc.fileChecksum.slice(0, 16) + '...' : 'Verified by Punia Associates'}</span>
              <button
                onClick={() => setReadingDoc(null)}
                className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-lg transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  );
};

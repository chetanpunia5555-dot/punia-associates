import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Search, 
  FileText, 
  ArrowRight,
  Download,
  Upload,
  FolderArchive,
  X,
  Eye
} from 'lucide-react';
import { BARE_ACTS_DATABASE, BareAct } from '../data/bareActsData';
import { SEOHead } from '../components/SEOHead';
import { BareActsBulkArchiveUploader } from '../components/BareActsBulkArchiveUploader';
import { CrossBorderLegalComparator } from '../components/CrossBorderLegalComparator';
import { LegalMaximsDirectory } from '../components/LegalMaximsDirectory';

export const BareActsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'central' | 'state' | 'usa' | 'uk' | 'singapore' | 'australia' | 'europe' | 'canada' | 'international'>('all');
  const [selectedLetter, setSelectedLetter] = useState<string>('all');
  const [dbActs, setDbActs] = useState<BareAct[]>(BARE_ACTS_DATABASE);
  const [showUploader, setShowUploader] = useState<boolean>(false);

  const fetchActs = useCallback(() => {
    fetch('/api/bare-acts')
      .then(res => res.json())
      .then(data => {
        if (data.acts && data.acts.length > 0) {
          setDbActs(data.acts);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetchActs();
  }, [fetchActs]);

  const filteredActs = useMemo(() => {
    const seen = new Set<string>();
    const unique = dbActs.filter(act => {
      const norm = (act.shortTitle || act.title).toLowerCase().replace(/[^a-z0-9]/g, '');
      if (seen.has(norm)) return false;
      seen.add(norm);
      return true;
    });

    return unique.filter(act => {
      const matchSearch = 
        act.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (act.shortTitle || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (act.actNumber || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (act.category || '').toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchTab = 
        activeTab === 'all' ? true :
        activeTab === 'central' ? act.jurisdiction === 'Central' :
        activeTab === 'state' ? (act.jurisdiction === 'State' || act.jurisdiction.includes('Haryana') || act.jurisdiction.includes('Punjab')) :
        activeTab === 'usa' ? act.jurisdiction === 'United States' :
        activeTab === 'uk' ? act.jurisdiction === 'United Kingdom' :
        activeTab === 'singapore' ? act.jurisdiction === 'Singapore' :
        activeTab === 'australia' ? act.jurisdiction === 'Australia' :
        activeTab === 'europe' ? (act.jurisdiction === 'Germany' || act.jurisdiction === 'France') :
        activeTab === 'canada' ? act.jurisdiction === 'Canada' :
        activeTab === 'international' ? act.jurisdiction === 'International' :
        true;

      const cleanForLetter = act.title.replace(/^The\s+/i, '').trim().toUpperCase();
      const matchLetter = 
        selectedLetter === 'all' ? true :
        act.title.toUpperCase().startsWith(selectedLetter) || cleanForLetter.startsWith(selectedLetter);

      return matchSearch && matchTab && matchLetter;
    });
  }, [dbActs, searchTerm, activeTab, selectedLetter]);

  const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'W'];

  return (
    <>
      <SEOHead
        title="Global World Law Library & India Bare Acts Database | Punia Associates"
        description="Access authenticated statutory texts, codes, constitutional charters and international conventions across India, USA, UK, Singapore, Australia, Germany, France, Canada, and UN Treaties."
        canonicalPath="/bare-acts"
      />

      <div className="bg-[#0B1325] text-white py-10 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                Global Law & Bare Acts Library ({dbActs.length})
              </h1>
              <p className="text-xs sm:text-sm text-slate-300">
                Authoritative statutory database covering India, United States, United Kingdom, Singapore, Australia, Germany, France, Canada & International Conventions.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => setShowUploader(prev => !prev)}
              className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg flex items-center gap-2 cursor-pointer transition"
            >
              {showUploader ? <X className="w-4 h-4" /> : <Upload className="w-4 h-4" />}
              <span>{showUploader ? 'Close Uploader' : 'Upload Bare Act PDF / ZIP'}</span>
            </button>

            <Link
              to="/admin"
              className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition"
            >
              <FolderArchive className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {showUploader && (
          <BareActsBulkArchiveUploader
            onImportComplete={fetchActs}
            selectedCategoryType="Bare Acts"
          />
        )}

        {/* Modern Law Book & Magazine Showcase Banner */}
        <div className="bg-gradient-to-r from-[#0B152A] via-[#102040] to-[#0B152A] rounded-2xl p-4 sm:p-5 text-white border border-amber-500/30 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-slate-950 uppercase tracking-wider">
                  110+ Complete Real Bare Acts Ready
                </span>
                <span className="text-xs text-amber-300 font-semibold">All Verbatim Statutory Sections & Schedules Included</span>
              </div>
              <h2 className="text-sm sm:text-base font-serif font-bold text-white mt-1">
                Punia Associates Complete Statutory Law Library & Law Reporter
              </h2>
              <p className="text-xs text-slate-300 mt-0.5">
                Full-length authentic statutes (up to 470+ pages) with firm branding on cover & running footer: <code className="text-amber-200">"PUNIA ASSOCIATES"</code>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0 w-full md:w-auto">
            <a
              href="/bare-acts/stored/the_arbitration_and_conciliation_act_1996_punia_associates_complete_book.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 md:flex-initial px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Arbitration Act (47 Pages Complete)</span>
            </a>

            <a
              href="/bare-acts/stored/the_bharatiya_nagarik_suraksha_sanhita_2023_punia_associates_complete_book.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 md:flex-initial px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>BNSS 2023 (251 Pages Complete)</span>
            </a>

            <Link
              to="/magazine"
              className="flex-1 md:flex-initial px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>SC & HC Law Reporter</span>
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search Acts (e.g., Constitution, CPC, CrPC, Aadhaar, Copyright, BNS, BNSS)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-14 py-3 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 shadow-sm"
          />
          <button
            type="button"
            className="absolute right-1.5 top-1.5 bottom-1.5 w-10 bg-[#A37B31] text-white rounded-xl flex items-center justify-center cursor-pointer"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>

        {/* Central / State / International Tabs */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3.5 py-1.5 rounded-full font-bold transition-all shrink-0 cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-[#005A36] text-white shadow'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                All World Laws ({dbActs.length})
              </button>
              <button
                onClick={() => setActiveTab('central')}
                className={`px-3 py-1.5 rounded-full font-bold transition-all shrink-0 cursor-pointer ${
                  activeTab === 'central'
                    ? 'bg-[#005A36] text-white shadow'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                🇮🇳 India Central ({dbActs.filter(a => a.jurisdiction === 'Central').length})
              </button>
              <button
                onClick={() => setActiveTab('state')}
                className={`px-3 py-1.5 rounded-full font-bold transition-all shrink-0 cursor-pointer ${
                  activeTab === 'state'
                    ? 'bg-[#005A36] text-white shadow'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                🇮🇳 India State ({dbActs.filter(a => a.jurisdiction === 'State' || a.jurisdiction.includes('Haryana') || a.jurisdiction.includes('Punjab')).length})
              </button>
              <button
                onClick={() => setActiveTab('usa')}
                className={`px-3 py-1.5 rounded-full font-bold transition-all shrink-0 cursor-pointer ${
                  activeTab === 'usa'
                    ? 'bg-[#005A36] text-white shadow'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                🇺🇸 United States ({dbActs.filter(a => a.jurisdiction === 'United States').length})
              </button>
              <button
                onClick={() => setActiveTab('uk')}
                className={`px-3 py-1.5 rounded-full font-bold transition-all shrink-0 cursor-pointer ${
                  activeTab === 'uk'
                    ? 'bg-[#005A36] text-white shadow'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                🇬🇧 United Kingdom ({dbActs.filter(a => a.jurisdiction === 'United Kingdom').length})
              </button>
              <button
                onClick={() => setActiveTab('singapore')}
                className={`px-3 py-1.5 rounded-full font-bold transition-all shrink-0 cursor-pointer ${
                  activeTab === 'singapore'
                    ? 'bg-[#005A36] text-white shadow'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                🇸🇬 Singapore ({dbActs.filter(a => a.jurisdiction === 'Singapore').length})
              </button>
              <button
                onClick={() => setActiveTab('australia')}
                className={`px-3 py-1.5 rounded-full font-bold transition-all shrink-0 cursor-pointer ${
                  activeTab === 'australia'
                    ? 'bg-[#005A36] text-white shadow'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                🇦🇺 Australia ({dbActs.filter(a => a.jurisdiction === 'Australia').length})
              </button>
              <button
                onClick={() => setActiveTab('europe')}
                className={`px-3 py-1.5 rounded-full font-bold transition-all shrink-0 cursor-pointer ${
                  activeTab === 'europe'
                    ? 'bg-[#005A36] text-white shadow'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                🇩🇪🇫🇷 Germany & France ({dbActs.filter(a => a.jurisdiction === 'Germany' || a.jurisdiction === 'France').length})
              </button>
              <button
                onClick={() => setActiveTab('canada')}
                className={`px-3 py-1.5 rounded-full font-bold transition-all shrink-0 cursor-pointer ${
                  activeTab === 'canada'
                    ? 'bg-[#005A36] text-white shadow'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                🇨🇦 Canada ({dbActs.filter(a => a.jurisdiction === 'Canada').length})
              </button>
              <button
                onClick={() => setActiveTab('international')}
                className={`px-3 py-1.5 rounded-full font-bold transition-all shrink-0 cursor-pointer ${
                  activeTab === 'international'
                    ? 'bg-[#005A36] text-white shadow'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                🌐 International & UN ({dbActs.filter(a => a.jurisdiction === 'International').length})
              </button>
            </div>

            <span className="text-xs text-slate-500 font-medium shrink-0">
              Showing <strong>{filteredActs.length}</strong> of {dbActs.length} Statutes
            </span>
          </div>
        </div>

        {/* Alphabet Quick Jump Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-xs">
          <button
            onClick={() => setSelectedLetter('all')}
            className={`px-3 py-1.5 rounded-full font-bold transition-all shrink-0 cursor-pointer ${
              selectedLetter === 'all' ? 'bg-[#005A36] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All
          </button>
          {alphabet.map(letter => (
            <button
              key={letter}
              onClick={() => setSelectedLetter(letter)}
              className={`px-2.5 py-1.5 rounded-full font-bold transition-all shrink-0 cursor-pointer ${
                selectedLetter === letter ? 'bg-[#005A36] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {letter}
            </button>
          ))}
        </div>

        {/* Acts List */}
        <div className="space-y-3">
          {filteredActs.map((act) => (
            <div 
              key={act.id} 
              className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold shrink-0 border border-red-200/60">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                    <Link to={`/bare-acts/${act.id}`} className="hover:text-amber-800 transition-colors">
                      {act.title}
                    </Link>
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 font-medium mt-1">
                    <span className="text-amber-800 font-semibold">
                      {act.jurisdiction === 'United States' ? '🇺🇸 United States' :
                       act.jurisdiction === 'United Kingdom' ? '🇬🇧 United Kingdom' :
                       act.jurisdiction === 'Singapore' ? '🇸🇬 Singapore' :
                       act.jurisdiction === 'Australia' ? '🇦🇺 Australia' :
                       act.jurisdiction === 'Germany' ? '🇩🇪 Germany' :
                       act.jurisdiction === 'France' ? '🇫🇷 France' :
                       act.jurisdiction === 'Canada' ? '🇨🇦 Canada' :
                       act.jurisdiction === 'International' ? '🌐 International' :
                       `🇮🇳 ${act.jurisdiction}`} Law
                    </span>
                    <span>•</span>
                    <span>Year: {act.year}</span>
                    {act.category && (
                      <>
                        <span>•</span>
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md text-[10px] font-semibold">
                          {act.category}
                        </span>
                      </>
                    )}
                    {act.pageCount && act.pageCount > 1 && (
                      <>
                        <span>•</span>
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md text-[10px] font-bold">
                          {act.pageCount} Pages PDF
                        </span>
                      </>
                    )}
                    {(act.isModernBookEdition || (act.pdfUrl && act.pdfUrl.includes('punia_associates'))) && (
                      <>
                        <span>•</span>
                        <span className="px-2 py-0.5 bg-gradient-to-r from-amber-100 to-amber-200 text-amber-950 border border-amber-300 rounded-md text-[10px] font-extrabold shadow-sm">
                          ★ Complete Bare Act Book (All Sections)
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link
                  to={`/bare-acts/${act.id}`}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-amber-50 text-slate-700 hover:text-amber-800 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                  title="Read Bare Act & Official PDF"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Read Act</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:hidden" />
                </Link>
                <a
                  href={act.pdfUrl || `/api/bare-acts/${act.id}/download`}
                  download={`${(act.shortTitle || act.title).replace(/[/\\?%*:|"<>]/g, '_')}.pdf`}
                  className="p-2 text-[#A37B31] hover:text-[#8f6a27] hover:bg-amber-50 rounded-xl transition-colors cursor-pointer flex items-center justify-center"
                  title="Download Official Statutory PDF"
                >
                  <Download className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Global Comparative Law & Jurisprudential Doctrines Section */}
        <div className="pt-12 border-t border-slate-200 space-y-12">
          {/* 1. Cross-Border Comparative Law Engine */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">
                  International Legal Analysis
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                  Cross-Border Comparative Law Engine
                </h2>
              </div>
              <Link 
                to="/legal-drafts"
                className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1"
              >
                <span>Contract & Clause Templates</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <CrossBorderLegalComparator />
          </div>

          {/* 2. Latin Legal Maxims & Foundational Principles */}
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">
                Classical Jurisprudence & Judicial Doctrines
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                Directory of Fundamental Latin Legal Maxims
              </h2>
            </div>
            <LegalMaximsDirectory />
          </div>
        </div>

      </div>
    </>
  );
};

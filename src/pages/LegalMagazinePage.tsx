import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Download, 
  Calendar, 
  Scale, 
  ShieldCheck, 
  Search, 
  Filter, 
  ChevronRight, 
  FileText, 
  CheckCircle2, 
  Building2, 
  Sparkles,
  ExternalLink,
  BookMarked,
  Printer,
  Share2,
  Award
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { INITIAL_JUDGMENTS } from '../data/legalCmsData';

interface MagazineIssue {
  id: string;
  volume: string;
  issue: string;
  monthYear: string;
  title: string;
  subtitle: string;
  publishDate: string;
  pageCount: number;
  pdfUrl: string;
  isLatest?: boolean;
  coverBadge: string;
  highlights: {
    title: string;
    citation: string;
    category: string;
  }[];
  summary: string;
}

const MAGAZINE_ISSUES: MagazineIssue[] = [
  {
    id: 'issue-nov-2026',
    volume: 'Vol. 2026',
    issue: 'Issue 11',
    monthYear: 'November 2026',
    title: 'Supreme Court & High Courts Law Reporter',
    subtitle: 'Authoritative Judicial Precedents, Constitutional Bench Rulings & Statutory Impact Analysis',
    publishDate: '2026-11-20',
    pageCount: 4,
    pdfUrl: '/magazine/stored/punia_associates_sc_hc_law_reporter_nov_2026.pdf',
    isLatest: true,
    coverBadge: 'CURRENT MONTHLY DIGEST',
    summary: 'Comprehensive analysis of 5-Judge Constitution Bench ruling on Anticipatory Bail duration (Sushila Aggarwal), Group of Companies doctrine in commercial arbitration (Cox & Kings), and transition strategies from IPC/CrPC to BNS/BNSS 2023.',
    highlights: [
      {
        title: 'Anticipatory Bail Endures Till Conclusion of Trial',
        citation: '2020 INSC 106 | (2020) 5 SCC 1',
        category: 'Criminal Jurisprudence / BNSS'
      },
      {
        title: 'Group of Companies Doctrine Harmonized in Arbitration',
        citation: '2023 INSC 1051 | (2024) 4 SCC 1',
        category: 'Commercial Arbitration'
      },
      {
        title: 'Presumption under Section 139 Negotiable Instruments Act',
        citation: '2021 INSC 75 | (2021) 5 SCC 283',
        category: 'Banking & NI Act'
      },
      {
        title: 'Preliminary Inquiry Mandate under Section 173(3) BNSS',
        citation: 'Chambers Special Statutory Analysis',
        category: 'Statutory Transition'
      }
    ]
  },
  {
    id: 'issue-oct-2026',
    volume: 'Vol. 2026',
    issue: 'Issue 10',
    monthYear: 'October 2026',
    title: 'Corporate Insolvency & Commercial Arbitration Digest',
    subtitle: 'NCLAT Landmark Rulings, CoC Commercial Wisdom & Section 34 Patent Illegality',
    publishDate: '2026-10-25',
    pageCount: 6,
    pdfUrl: '/magazine/stored/punia_associates_sc_hc_law_reporter_nov_2026.pdf',
    coverBadge: 'ARCHIVED EDITION',
    summary: 'In-depth focus on resolution plans under Insolvency and Bankruptcy Code (IBC 2016), non-interference with arbitral awards under Section 34, and contractual specific performance enforcement.',
    highlights: [
      {
        title: 'Commercial Wisdom of CoC Non-Justiciable before NCLT',
        citation: 'Essar Steel / Committee of Creditors Benchmark',
        category: 'Insolvency & Corporate Law'
      },
      {
        title: 'Scope of Patent Illegality in Domestic Arbitration Awards',
        citation: 'Delhi High Court Commercial Division Review',
        category: 'Commercial Disputes'
      },
      {
        title: 'RERA Refund Rights vs. NCLT Insolvency Claims Priority',
        citation: 'Supreme Court Homebuyers Protection Digest',
        category: 'Real Estate / RERA'
      }
    ]
  },
  {
    id: 'issue-sep-2026',
    volume: 'Vol. 2026',
    issue: 'Issue 09',
    monthYear: 'September 2026',
    title: 'Constitutional Writs & Public Law Review',
    subtitle: 'Article 226 High Court Powers, Tender Transparency & Service Law Precedents',
    publishDate: '2026-09-24',
    pageCount: 5,
    pdfUrl: '/magazine/stored/punia_associates_sc_hc_law_reporter_nov_2026.pdf',
    coverBadge: 'ARCHIVED EDITION',
    summary: 'Essential reading on administrative discretion, judicial review of government tenders, state service rules, and Punjab & Haryana High Court writ jurisprudence.',
    highlights: [
      {
        title: 'Arbitrary Disqualification in Public Infrastructure Tenders',
        citation: 'Tata Cellular & Monarch Infrastructure Doctrines',
        category: 'Constitutional & Administrative Law'
      },
      {
        title: 'Pensionary Benefits as Constitutional Property under Article 300A',
        citation: 'Punjab & Haryana High Court Full Bench',
        category: 'Service & Pension Law'
      }
    ]
  }
];

export const LegalMagazinePage: React.FC = () => {
  const [selectedIssue, setSelectedIssue] = useState<MagazineIssue>(MAGAZINE_ISSUES[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCourt, setSelectedCourt] = useState<string>('All');
  const [expandedCaseId, setExpandedCaseId] = useState<string | null>(null);

  // Filtered judicial briefs from CMS
  const filteredJudgments = useMemo(() => {
    return INITIAL_JUDGMENTS.filter(j => {
      const matchSearch = searchTerm === '' || 
        j.caseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (j.neutralCitation && j.neutralCitation.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (j.reportedCitation && j.reportedCitation.toLowerCase().includes(searchTerm.toLowerCase())) ||
        j.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        j.statutes.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchCategory = selectedCategory === 'All' || 
        j.subject.toLowerCase().includes(selectedCategory.toLowerCase());

      const matchCourt = selectedCourt === 'All' || 
        j.court.toLowerCase().includes(selectedCourt.toLowerCase());

      return matchSearch && matchCategory && matchCourt;
    });
  }, [searchTerm, selectedCategory, selectedCourt]);

  const handleDownloadMagazine = (issue: MagazineIssue) => {
    const link = document.createElement('a');
    link.href = issue.pdfUrl;
    link.download = `Punia_Associates_Law_Reporter_${issue.monthYear.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <SEOHead
        title="Supreme Court & High Courts Law Reporter | Monthly Legal Magazine | Punia Associates"
        description="Official Punia Associates Law Reporter and monthly legal magazine featuring landmark Supreme Court judgments, High Court rulings, headnotes, and statutory analysis."
      />

      <div className="min-h-screen bg-[#F8F9FA] pb-24">
        {/* HERO SECTION */}
        <div className="bg-[#0B1325] text-white pt-16 pb-20 border-b border-amber-500/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-emerald-500/10 pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                OFFICIAL MONTHLY LAW REPORTER & WEEKLY JUDGMENTS REVIEW
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-slate-300">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                Punia Associates Chambers Publication
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight mb-4">
                  Supreme Court & High Courts <br />
                  <span className="text-amber-400">Law Reporter & Monthly Magazine</span>
                </h1>
                <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl mb-6">
                  Authoritative monthly judicial digest featuring constitutional bench pronouncements, landmark ratios, 
                  comparative statutory cross-mappings (BNS / BNSS / BSA 2023), and trial practice notes curated 
                  by the litigators and research chambers of Punia Associates.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => handleDownloadMagazine(selectedIssue)}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold shadow-lg shadow-amber-500/20 transition-all cursor-pointer transform hover:-translate-y-0.5"
                  >
                    <Download className="w-5 h-5 text-slate-950" />
                    Download {selectedIssue.monthYear} Edition (PDF)
                  </button>

                  <a
                    href="#archive"
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg bg-white/10 hover:bg-white/15 text-white font-medium border border-white/20 transition-all"
                  >
                    <BookOpen className="w-4 h-4 text-amber-400" />
                    Browse All Monthly Issues
                  </a>

                  <Link
                    to="/bare-acts"
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/40 text-emerald-300 font-medium border border-emerald-500/30 transition-all"
                  >
                    <Scale className="w-4 h-4 text-emerald-400" />
                    Explore Bare Acts Library
                  </Link>
                </div>
              </div>

              {/* COVER PREVIEW CARD */}
              <div className="lg:col-span-4">
                <div className="bg-[#0F1D38] border-2 border-amber-500/40 rounded-xl p-5 shadow-2xl relative">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold tracking-wider text-amber-400 uppercase">
                      {selectedIssue.volume} • {selectedIssue.issue}
                    </span>
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-slate-950">
                      {selectedIssue.coverBadge}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-white mb-1">
                    {selectedIssue.title}
                  </h3>
                  <p className="text-xs text-slate-300 mb-4 italic">
                    {selectedIssue.subtitle}
                  </p>

                  <div className="bg-slate-900/80 rounded-lg p-3 border border-slate-700/60 mb-4 space-y-2">
                    <p className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">
                      Selected High-Impact Judgments:
                    </p>
                    {selectedIssue.highlights.map((h, i) => (
                      <div key={i} className="text-xs border-b border-slate-800 pb-1.5 last:border-b-0">
                        <p className="text-white font-medium line-clamp-1">{h.title}</p>
                        <p className="text-[10px] text-amber-300/80 font-mono">{h.citation}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-700/60 text-xs text-slate-400">
                    <span>{selectedIssue.pageCount} Pages • Print Publication</span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> Verified Authentic
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN BODY CONTAINER */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          {/* MAGAZINE EDITIONS CAROUSEL / GRID */}
          <div id="archive" className="mb-14">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-serif font-bold text-slate-900">
                  Monthly Review Editions & Law Reporter Archive
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Each monthly edition contains comprehensive legal analysis, complete headnotes, and running chambers promotion footers.
                </p>
              </div>
              <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200 self-start sm:self-auto">
                Updated Weekly with Fresh High Court Rulings
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {MAGAZINE_ISSUES.map((issue) => {
                const isSelected = selectedIssue.id === issue.id;
                return (
                  <div
                    key={issue.id}
                    className={`bg-white rounded-xl border transition-all p-6 flex flex-col justify-between ${
                      isSelected
                        ? 'border-amber-500 shadow-lg ring-2 ring-amber-500/20'
                        : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
                          {issue.monthYear}
                        </span>
                        <span className="text-xs font-medium text-slate-500">
                          {issue.volume} • {issue.issue}
                        </span>
                      </div>

                      <h3 className="text-lg font-serif font-bold text-slate-900 mb-2 leading-snug">
                        {issue.title}
                      </h3>
                      <p className="text-xs text-slate-600 mb-4 line-clamp-3 leading-relaxed">
                        {issue.summary}
                      </p>

                      <div className="space-y-1.5 mb-5 bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          Key Rulings Inside:
                        </p>
                        {issue.highlights.slice(0, 2).map((h, idx) => (
                          <div key={idx} className="text-xs text-slate-700 font-medium flex items-start gap-1.5">
                            <span className="text-amber-600 font-bold">•</span>
                            <span className="line-clamp-1">{h.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                      <button
                        onClick={() => handleDownloadMagazine(issue)}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition-colors cursor-pointer shadow-sm"
                      >
                        <Download className="w-4 h-4" />
                        Download PDF
                      </button>

                      <button
                        onClick={() => setSelectedIssue(issue)}
                        className={`px-3 py-2.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                          isSelected 
                            ? 'bg-slate-900 text-white border-slate-900' 
                            : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        {isSelected ? 'Selected' : 'View Headnotes'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECTION: SEARCH & EXPLORE ALL JUDGMENTS */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8 mb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-serif font-bold text-slate-900 flex items-center gap-2">
                  <Scale className="w-5 h-5 text-amber-600" />
                  Judicial Precedents & Landmark Case Briefs
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Search full case facts, ratio decidendi, bench details, and chambers practice notes.
                </p>
              </div>

              {/* SEARCH INPUT */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search case, citation, statute..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* FILTERS ROW */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Filter By:
              </span>

              {/* COURT FILTER */}
              <select
                value={selectedCourt}
                onChange={(e) => setSelectedCourt(e.target.value)}
                className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="All">All Courts</option>
                <option value="Supreme Court">Supreme Court of India</option>
                <option value="Punjab and Haryana">Punjab & Haryana High Court</option>
                <option value="Delhi">Delhi High Court</option>
              </select>

              {/* CATEGORY FILTER */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="All">All Practice Areas</option>
                <option value="Criminal">Criminal & Bail</option>
                <option value="Arbitration">Commercial Arbitration</option>
                <option value="Constitutional">Constitutional Law</option>
                <option value="Corporate">Corporate & Insolvency</option>
              </select>

              {(searchTerm || selectedCourt !== 'All' || selectedCategory !== 'All') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCourt('All');
                    setSelectedCategory('All');
                  }}
                  className="text-xs text-amber-700 hover:underline font-semibold ml-auto"
                >
                  Reset Filters
                </button>
              )}
            </div>

            {/* CASE BRIEFS LIST */}
            <div className="space-y-4">
              {filteredJudgments.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-sm">
                  No landmark rulings found matching your filters.
                </div>
              ) : (
                filteredJudgments.map((item) => {
                  const isExpanded = expandedCaseId === item.id;
                  return (
                    <div
                      key={item.id}
                      className="border border-slate-200 rounded-xl p-5 hover:border-amber-400/80 transition-all bg-white"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800 border border-slate-200">
                              {item.court}
                            </span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                              {item.judgmentType}
                            </span>
                            {item.neutralCitation && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                                {item.neutralCitation}
                              </span>
                            )}
                            <span className="text-[11px] text-slate-500 flex items-center gap-1 ml-auto">
                              <Calendar className="w-3 h-3" />
                              {item.decisionDate}
                            </span>
                          </div>

                          <h4 className="text-base font-serif font-bold text-slate-900 hover:text-amber-700 transition-colors">
                            <Link to={`/judgments/${item.id}`}>{item.caseTitle}</Link>
                          </h4>

                          <p className="text-xs text-slate-600 mt-1">
                            <span className="font-semibold text-slate-700">Bench:</span> {item.coram}
                          </p>
                          <p className="text-xs text-slate-600 mt-0.5">
                            <span className="font-semibold text-slate-700">Subject:</span> {item.subject}
                          </p>

                          {/* RATIO DECIDENDI HIGHLIGHT */}
                          <div className="mt-3 p-3 bg-amber-50/60 rounded-lg border-l-4 border-amber-500 text-xs text-slate-800 leading-relaxed">
                            <span className="font-bold text-amber-900 block mb-0.5">Ratio Decidendi:</span>
                            {item.ratioDecidendi}
                          </div>

                          {/* EXPANDABLE SECTION */}
                          {isExpanded && (
                            <div className="mt-4 pt-4 border-t border-slate-100 space-y-3 text-xs">
                              <div>
                                <span className="font-bold text-slate-800 block mb-1">Factual Background:</span>
                                <p className="text-slate-600 leading-relaxed">{item.facts}</p>
                              </div>

                              <div>
                                <span className="font-bold text-slate-800 block mb-1">Key Legal Principles Formulated:</span>
                                <ul className="list-disc list-inside space-y-1 text-slate-600">
                                  {item.legalPrinciples.map((lp, idx) => (
                                    <li key={idx}>{lp}</li>
                                  ))}
                                </ul>
                              </div>

                              <div>
                                <span className="font-bold text-slate-800 block mb-1">Subsequent Legal Treatment & Precedent Value:</span>
                                <p className="text-slate-600 leading-relaxed italic">{item.subsequentTreatment}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* CARD ACTIONS FOOTER */}
                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 text-xs">
                        <button
                          onClick={() => setExpandedCaseId(isExpanded ? null : item.id)}
                          className="text-amber-700 hover:text-amber-800 font-semibold cursor-pointer flex items-center gap-1"
                        >
                          {isExpanded ? 'Hide Detailed Headnotes' : 'Read Full Facts & Principles'}
                          <ChevronRight className={`w-3.5 h-3.5 transform transition-transform ${isExpanded ? '-rotate-90' : 'rotate-90'}`} />
                        </button>

                        <div className="flex items-center gap-3">
                          <Link
                            to={`/judgments/${item.id}`}
                            className="inline-flex items-center gap-1 text-slate-700 hover:text-slate-900 font-medium"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            Full Case Record
                          </Link>

                          <button
                            onClick={() => handleDownloadMagazine(selectedIssue)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-900 hover:bg-slate-800 text-white font-medium text-[11px] transition-colors"
                          >
                            <Download className="w-3 h-3 text-amber-400" />
                            Magazine Issue PDF
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* CHAMBERS PROMOTION & ADVOCACY CARD */}
          <div className="bg-gradient-to-br from-[#0B1325] to-[#122244] rounded-2xl p-8 sm:p-10 text-white border border-amber-500/30 shadow-xl relative overflow-hidden">
            <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="max-w-3xl relative">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-2">
                PUNIA ASSOCIATES LITIGATION & APPELLATE PRACTICE
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold mb-4">
                Need Authoritative Judicial Representation or Expert Legal Opinion?
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                Our chambers represents individuals, corporations, and institutions across the Supreme Court of India, 
                High Court of Punjab and Haryana at Chandigarh, Delhi High Court, and specialized tribunals (NCLAT, NGT, NCDRC). 
                Schedule an in-depth matter consultation with our senior advocates.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm transition-colors shadow-lg shadow-amber-500/20"
                >
                  <Building2 className="w-4 h-4 text-slate-950" />
                  Schedule Chambers Consultation
                </Link>

                <Link
                  to="/bare-acts"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/10 hover:bg-white/15 text-white font-medium text-sm border border-white/20 transition-colors"
                >
                  <BookMarked className="w-4 h-4 text-amber-400" />
                  Access 100+ Modern Bare Acts
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Search, 
  Scale, 
  Landmark, 
  Calendar, 
  Users, 
  CheckCircle2, 
  Copy, 
  Check, 
  AlertCircle,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { CASE_BRIEFS_DATA, CaseBriefItem } from '../data/studyCentreData';
import { SEOHead } from '../components/SEOHead';

export const CaseBriefsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredBriefs = useMemo(() => {
    return CASE_BRIEFS_DATA.filter(b => {
      const matchSearch = 
        b.caseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.citation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.ratioDecidendi.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.bench.toLowerCase().includes(searchTerm.toLowerCase());

      const matchSubject = selectedSubject === 'all' || b.legalSubject.toLowerCase().includes(selectedSubject.toLowerCase());

      return matchSearch && matchSubject;
    });
  }, [searchTerm, selectedSubject]);

  const handleCopyBrief = (brief: CaseBriefItem) => {
    const text = `CASE BRIEF: ${brief.caseTitle}\nCitation: ${brief.citation}\nCourt: ${brief.court}\nBench: ${brief.bench}\nDate: ${brief.decisionDate}\n\nFACTS:\n${brief.factsBrief.map(f => `• ${f}`).join('\n')}\n\nISSUES:\n${brief.issuesFramed.map(i => `• ${i}`).join('\n')}\n\nRATIO DECIDENDI (BINDING):\n${brief.ratioDecidendi}\n\nOBITER DICTA (OBSERVATIONS):\n${brief.obiterDicta}\n\nSIGNIFICANCE:\n${brief.significanceForAdvocatesAndExams}\n\n[Sourced from Punia Associates - puniaassociates.site]`;
    navigator.clipboard.writeText(text);
    setCopiedId(brief.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <>
      <SEOHead
        title="Landmark Case Briefs & Ratio Decidendi Library | Punia Associates"
        description="Structured case briefs of Indian landmark judgments analyzing facts, framed legal issues, binding ratio decidendi, obiter dicta, and courtroom significance."
        canonicalUrl="https://puniaassociates.site/case-briefs"
      />

      <div className="bg-[#0B1325] text-white py-14 border-b border-amber-500/20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-3">
                <Scale className="w-3.5 h-3.5" /> Judicial Case Briefs & Precedent Analysis
              </div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-100">
                Landmark Case Law Briefs & Ratio Engine
              </h1>
              <p className="mt-2 text-slate-300 text-sm md:text-base max-w-3xl leading-relaxed">
                Methodically briefed judicial rulings distinguishing binding holding (*ratio decidendi*) from judicial observations (*obiter dicta*), prepared for active legal practice and judicial examination mastery.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link 
                to="/judgments" 
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded text-xs font-semibold transition"
              >
                Full Judgments Portal
              </Link>
              <Link 
                to="/short-notes" 
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold rounded text-xs transition"
              >
                Legal Short Notes
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-lg border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search case briefs by party name, citation, bench, or ratio (e.g. Sushila Aggarwal, Arnesh Kumar)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 bg-slate-50/50"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600">Category:</span>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="border border-slate-200 bg-white px-3 py-1.5 rounded text-xs font-medium text-slate-800 focus:outline-none"
            >
              <option value="all">All Subjects</option>
              <option value="Criminal">Criminal Procedure</option>
              <option value="Civil">Civil Procedure</option>
              <option value="Constitutional">Constitutional Law</option>
            </select>
          </div>
        </div>

        {/* Briefs Cards */}
        <div className="space-y-8">
          {filteredBriefs.map((brief) => (
            <div 
              key={brief.id}
              className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden"
            >
              {/* Card Header */}
              <div className="p-6 bg-slate-50/70 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="bg-amber-100 text-amber-900 border border-amber-200 px-2 py-0.5 rounded text-[11px] font-bold uppercase">
                      {brief.legalSubject}
                    </span>
                    <span className="font-mono text-xs font-bold text-slate-700 bg-slate-200/80 px-2 py-0.5 rounded">
                      {brief.citation}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {brief.decisionDate}
                    </span>
                  </div>

                  <h3 className="text-xl font-serif font-bold text-slate-900">
                    {brief.caseTitle}
                  </h3>

                  <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-600">
                    <span className="flex items-center gap-1">
                      <Landmark className="w-3.5 h-3.5 text-amber-700" /> {brief.court}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-slate-400" /> Bench: {brief.bench}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleCopyBrief(brief)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded text-xs font-semibold transition"
                    title="Copy Structured Brief"
                  >
                    {copiedId === brief.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === brief.id ? 'Copied' : 'Copy Brief'}</span>
                  </button>
                </div>
              </div>

              {/* Brief Sections */}
              <div className="p-6 sm:p-8 space-y-6">
                {/* 1. Brief Facts */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Factual Matrix in Brief:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {brief.factsBrief.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-slate-400 font-bold shrink-0">•</span>
                        <span className="leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 2. Issues Framed */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Legal Question / Issues Framed:
                  </h4>
                  <div className="space-y-1.5">
                    {brief.issuesFramed.map((issue, i) => (
                      <div key={i} className="bg-slate-50 p-2.5 rounded border-l-2 border-slate-400 text-xs text-slate-800 font-medium leading-relaxed">
                        Q{i + 1}: {issue}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Ratio Decidendi (Binding Holding) */}
                <div className="bg-emerald-50/50 p-4 rounded-lg border border-emerald-200">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                      Ratio Decidendi (Binding Precedent under Art. 141):
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-serif">
                    {brief.ratioDecidendi}
                  </p>
                </div>

                {/* 4. Obiter Dicta (Judicial Observations) */}
                <div className="bg-amber-50/40 p-4 rounded-lg border border-amber-200/80">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-4 h-4 text-amber-700" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                      Obiter Dicta & Cautionary Observations:
                    </h4>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed italic">
                    {brief.obiterDicta}
                  </p>
                </div>

                {/* 5. Exam & Practice Significance */}
                <div className="pt-2 text-xs text-slate-600 flex items-start gap-2 bg-slate-50 p-3 rounded">
                  <BookOpen className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800">Exam & Practice Utility: </strong>
                    <span>{brief.significanceForAdvocatesAndExams}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

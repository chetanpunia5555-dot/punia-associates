import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  BookOpen, 
  Search, 
  ExternalLink, 
  FileText, 
  Printer, 
  Copy, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Scale,
  Landmark,
  Download
} from 'lucide-react';
import { BARE_ACTS_DATABASE, BareAct, BareActSection } from '../data/bareActsData';
import { SEOHead } from '../components/SEOHead';

export const BareActDetailPage: React.FC = () => {
  const { actId } = useParams<{ actId: string }>();
  const [fetchedAct, setFetchedAct] = useState<BareAct | null>(null);

  useEffect(() => {
    if (!actId) return;
    fetch(`/api/bare-acts/${encodeURIComponent(actId)}`)
      .then(res => (res.ok ? res.json() : null))
      .then(data => {
        if (data && data.id) {
          setFetchedAct(data);
        }
      })
      .catch(() => {});
  }, [actId]);

  const act = useMemo(() => {
    if (fetchedAct && fetchedAct.id === actId) return fetchedAct;
    return BARE_ACTS_DATABASE.find(a => a.id === actId) || BARE_ACTS_DATABASE[0];
  }, [actId, fetchedAct]);

  // Flatten all sections for easy indexing & prev/next navigation
  const allSections = useMemo(() => {
    const list: { section: BareActSection; chapterTitle: string; chapterNumber: string }[] = [];
    (act.chapters || []).forEach(ch => {
      (ch.sections || []).forEach(sec => {
        list.push({
          section: sec,
          chapterTitle: ch.chapterTitle,
          chapterNumber: ch.chapterNumber
        });
      });
    });
    return list;
  }, [act]);

  const hasSections = allSections.length > 0;
  const [readingMode, setReadingMode] = useState<'pdf' | 'section' | 'complete'>('section');
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (!hasSections && act.pdfUrl) {
      setReadingMode('pdf');
    } else if (hasSections && readingMode === 'pdf' && !act.pdfUrl) {
      setReadingMode('section');
    }
  }, [hasSections, act.pdfUrl, act.id]);

  const activeItem = allSections[activeSectionIndex] || allSections[0];

  const handleCopySection = (sec: BareActSection) => {
    const citation = `${act.title} - ${sec.sectionNumber}: ${sec.title}\n\n${sec.content}\n\n[Sourced from Punia Associates Legal Library & India Code Official Gazette]`;
    navigator.clipboard.writeText(citation);
    setCopiedId(sec.sectionNumber);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <SEOHead
        title={`${act.title} | India Bare Act & Official PDF Reader`}
        description={`Read authentic statutory text and official PDF of ${act.title} (${act.actNumber}). Complete with section-by-section analysis, explanations, landmark Supreme Court rulings, and India Code citations.`}
        canonicalUrl={`https://puniaassociates.site/bare-acts/${act.id}`}
      />

      {/* Top Header */}
      <div className="bg-[#0B1325] text-white py-8 border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-amber-400/80 mb-3 font-medium">
            <Link to="/" className="hover:text-amber-300">Home</Link>
            <span>/</span>
            <Link to="/bare-acts" className="hover:text-amber-300">Bare Acts</Link>
            <span>/</span>
            <span className="text-slate-300 truncate max-w-xs">{act.shortTitle || act.title}</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider">
                  {act.jurisdiction} Act
                </span>
                <span className="bg-slate-800 text-slate-300 text-xs px-2.5 py-0.5 rounded font-mono">
                  {act.actNumber}
                </span>
                {act.pageCount && act.pageCount > 0 && (
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs px-2.5 py-0.5 rounded font-mono font-bold">
                    {act.pageCount} Pages Official PDF
                  </span>
                )}
                <span className="text-xs text-slate-400">
                  Year: {act.year} • Status: {act.status}
                </span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-serif font-bold text-slate-100">
                {act.title}
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Administering Ministry: {act.ministry}
              </p>
            </div>

            {/* Quick Actions & Mode Switcher */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="bg-slate-800/90 p-1 rounded-lg border border-slate-700 flex items-center">
                {act.pdfUrl && (
                  <button
                    onClick={() => setReadingMode('pdf')}
                    className={`px-3 py-1.5 rounded text-xs font-semibold transition cursor-pointer ${
                      readingMode === 'pdf' 
                        ? 'bg-amber-500 text-slate-950 shadow-sm font-bold' 
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Official PDF Reader
                  </button>
                )}
                {hasSections && (
                  <>
                    <button
                      onClick={() => setReadingMode('section')}
                      className={`px-3 py-1.5 rounded text-xs font-semibold transition cursor-pointer ${
                        readingMode === 'section' 
                          ? 'bg-amber-500 text-slate-950 shadow-sm font-bold' 
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      Section-by-Section
                    </button>
                    <button
                      onClick={() => setReadingMode('complete')}
                      className={`px-3 py-1.5 rounded text-xs font-semibold transition cursor-pointer ${
                        readingMode === 'complete' 
                          ? 'bg-amber-500 text-slate-950 shadow-sm font-bold' 
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      Complete Act
                    </button>
                  </>
                )}
              </div>

              {act.indiaCodeUrl && (
                <a
                  href={act.indiaCodeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded text-xs font-medium inline-flex items-center gap-1.5 transition"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-amber-400" /> India Code
                </a>
              )}

              <a
                href={act.pdfUrl || `/api/bare-acts/${act.id}/download`}
                download={`${(act.shortTitle || act.title).replace(/[/\\?%*:|"<>]/g, '_')}.pdf`}
                className="px-3 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded text-xs inline-flex items-center gap-1.5 transition shadow cursor-pointer"
                title="Download Official Statutory PDF"
              >
                <Download className="w-3.5 h-3.5 text-slate-950" /> Download Official PDF
              </a>

              <button
                onClick={handlePrint}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded transition cursor-pointer"
                title="Print Bare Act"
              >
                <Printer className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {readingMode === 'pdf' && act.pdfUrl ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
            <div className="p-4 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-amber-400" />
                <div>
                  <h2 className="text-sm font-bold text-white">{act.title} — Official Statutory PDF</h2>
                  <p className="text-[11px] text-slate-400">
                    {act.preamble}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={act.pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Open Fullscreen PDF
                </a>
                <a
                  href={act.pdfUrl || `/api/bare-acts/${act.id}/download`}
                  download={`${(act.shortTitle || act.title).replace(/[/\\?%*:|"<>]/g, '_')}.pdf`}
                  className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs inline-flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" /> Download PDF ({act.pageCount || 1} Pages)
                </a>
              </div>
            </div>
            <iframe
              src={act.pdfUrl}
              title={act.title}
              className="w-full h-[800px] border-0 bg-slate-100"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Chapters & Sections Directory (Sticky) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden sticky top-20 max-h-[calc(100vh-6rem)] flex flex-col">
                <div className="p-4 border-b border-slate-100 bg-slate-50/70">
                  <h3 className="text-sm font-serif font-bold text-slate-900 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-amber-600" /> Arrangement of Sections
                  </h3>
                  <div className="relative mt-2.5">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search sections in this Act..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="overflow-y-auto flex-1 p-3 divide-y divide-slate-100">
                  {(act.chapters || []).map((ch, chIdx) => {
                    const chSections = ch.sections.filter(s => 
                      !searchTerm.trim() || 
                      s.sectionNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      s.title.toLowerCase().includes(searchTerm.toLowerCase())
                    );

                    if (chSections.length === 0) return null;

                    return (
                      <div key={chIdx} className="py-2.5 first:pt-0 last:pb-0">
                        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-2 py-1 bg-slate-50 rounded mb-1">
                          {ch.chapterNumber}: {ch.chapterTitle}
                        </div>
                        <div className="space-y-0.5">
                          {chSections.map(sec => {
                            const globalIdx = allSections.findIndex(item => item.section.sectionNumber === sec.sectionNumber);
                            const isActive = activeSectionIndex === globalIdx;

                            return (
                              <button
                                key={sec.sectionNumber}
                                onClick={() => {
                                  setActiveSectionIndex(globalIdx);
                                  if (readingMode === 'complete') {
                                    const el = document.getElementById(`section-${sec.sectionNumber.replace(/\s+/g, '-').toLowerCase()}`);
                                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                                  }
                                }}
                                className={`w-full text-left px-2.5 py-1.5 rounded text-xs transition flex items-start justify-between gap-2 ${
                                  isActive 
                                    ? 'bg-amber-50 text-amber-900 font-semibold border-l-2 border-amber-600' 
                                    : 'text-slate-700 hover:bg-slate-50'
                                }`}
                              >
                                <div className="truncate">
                                  <span className="font-mono text-[11px] text-slate-500 mr-1.5">
                                    {sec.sectionNumber}
                                  </span>
                                  <span>{sec.title}</span>
                                </div>
                                {sec.isLandmark && (
                                  <span className="shrink-0 text-[10px] bg-red-50 text-red-700 border border-red-200 px-1 rounded font-sans">
                                    Key
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="p-3 border-t border-slate-100 bg-slate-50 text-[11px] text-slate-500 flex items-center justify-between">
                  <span>Total Sections: {act.totalSections}</span>
                  <span className="text-emerald-700 font-semibold">Active Enactment</span>
                </div>
              </div>
            </div>

            {/* Right Column: Reader View */}
            <div className="lg:col-span-8">
              {readingMode === 'section' ? (
                activeItem ? (
                  <div className="space-y-6">
                    {/* Prev / Next Pagination Bar */}
                    <div className="flex items-center justify-between bg-white px-4 py-2.5 rounded-lg border border-slate-200 shadow-sm">
                      <button
                        onClick={() => setActiveSectionIndex(prev => Math.max(0, prev - 1))}
                        disabled={activeSectionIndex === 0}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition"
                      >
                        <ChevronLeft className="w-4 h-4" /> Previous Section
                      </button>

                      <span className="text-xs text-slate-500 font-mono">
                        Section {activeSectionIndex + 1} of {allSections.length}
                      </span>

                      <button
                        onClick={() => setActiveSectionIndex(prev => Math.min(allSections.length - 1, prev + 1))}
                        disabled={activeSectionIndex === allSections.length - 1}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition"
                      >
                        Next Section <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Section Content Card */}
                    <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 sm:p-8">
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-6">
                        <div>
                          <div className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
                            {activeItem.chapterNumber} • {activeItem.chapterTitle}
                          </div>
                          <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                            {activeItem.section.sectionNumber}: {activeItem.section.title}
                          </h2>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleCopySection(activeItem.section)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-semibold transition"
                            title="Copy Section Text with Legal Citation"
                          >
                            {copiedId === activeItem.section.sectionNumber ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied!
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" /> Copy Section
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Criminal Offence Metrics / Badges (if applicable) */}
                      {(activeItem.section.punishment || activeItem.section.bailable || activeItem.section.cognizable) && (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-amber-50/60 p-4 rounded-lg border border-amber-200/80 mb-6 text-xs">
                          {activeItem.section.punishment && (
                            <div className="col-span-2">
                              <span className="font-bold text-amber-900 block">Punishment:</span>
                              <span className="text-amber-800">{activeItem.section.punishment}</span>
                            </div>
                          )}
                          {activeItem.section.bailable && (
                            <div>
                              <span className="font-bold text-amber-900 block">Bail Category:</span>
                              <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold ${
                                activeItem.section.bailable.toLowerCase().includes('non') 
                                  ? 'bg-red-100 text-red-800' 
                                  : 'bg-emerald-100 text-emerald-800'
                              }`}>
                                {activeItem.section.bailable}
                              </span>
                            </div>
                          )}
                          {activeItem.section.cognizable && (
                            <div>
                              <span className="font-bold text-amber-900 block">Cognizance:</span>
                              <span className="text-amber-800 font-medium">{activeItem.section.cognizable}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Statutory Body */}
                      <div className="prose prose-slate max-w-none text-slate-800 text-sm leading-relaxed whitespace-pre-line font-serif">
                        {activeItem.section.content}
                      </div>

                      {/* Explanations & Notes */}
                      {activeItem.section.explanations && activeItem.section.explanations.length > 0 && (
                        <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                            Explanations & Legal Notes
                          </h4>
                          <div className="space-y-2">
                            {activeItem.section.explanations.map((exp, idx) => (
                              <div key={idx} className="p-3 bg-slate-50 rounded border-l-2 border-amber-500 text-xs text-slate-700 leading-relaxed">
                                <strong>Explanation {idx + 1}:</strong> {exp}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Landmark Judgments on this Section */}
                      {activeItem.section.landmarkCases && activeItem.section.landmarkCases.length > 0 && (
                        <div className="mt-6 pt-6 border-t border-slate-100">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-3">
                            <Scale className="w-3.5 h-3.5 text-amber-600" /> Leading Judicial Precedents on this Section
                          </h4>
                          <ul className="space-y-2">
                            {activeItem.section.landmarkCases.map((c, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50/80 p-2.5 rounded border border-slate-100">
                                <Landmark className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                                <span className="font-medium">{c}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Cross References & Old Act Transitions */}
                      {activeItem.section.crossReferences && activeItem.section.crossReferences.length > 0 && (
                        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                          <span className="font-semibold text-slate-700">Predecessor Law / Comparative Cross-Reference:</span>
                          {activeItem.section.crossReferences.map((cr, idx) => (
                            <span key={idx} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono text-[11px]">
                              {cr}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ) : null
              ) : (
                /* Complete Continuous Act View */
                <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 sm:p-10 space-y-10">
                  <div className="border-b border-slate-200 pb-6 text-center">
                    <div className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-1">
                      {act.actNumber}
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                      {act.title}
                    </h2>
                    <p className="mt-4 text-xs sm:text-sm text-slate-600 italic max-w-2xl mx-auto leading-relaxed">
                      {act.preamble}
                    </p>
                  </div>

                  <div className="space-y-12">
                    {(act.chapters || []).map((ch, chIdx) => (
                      <div key={chIdx} className="space-y-6">
                        <div className="text-center py-2 bg-slate-50 border-y border-slate-200">
                          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                            {ch.chapterNumber}: {ch.chapterTitle}
                          </h3>
                        </div>

                        <div className="space-y-8 divide-y divide-slate-100">
                          {ch.sections.map(sec => (
                            <div 
                              key={sec.sectionNumber} 
                              id={`section-${sec.sectionNumber.replace(/\s+/g, '-').toLowerCase()}`}
                              className="pt-6 first:pt-0"
                            >
                              <div className="flex items-start justify-between gap-4 mb-2">
                                <h4 className="text-base font-serif font-bold text-slate-900">
                                  {sec.sectionNumber}. {sec.title}
                                </h4>
                                <button
                                  onClick={() => handleCopySection(sec)}
                                  className="text-slate-400 hover:text-amber-700 p-1"
                                  title="Copy Section"
                                >
                                  {copiedId === sec.sectionNumber ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                                </button>
                              </div>

                              <p className="text-sm text-slate-800 leading-relaxed font-serif whitespace-pre-line">
                                {sec.content}
                              </p>

                              {sec.explanations && sec.explanations.length > 0 && (
                                <div className="mt-3 pl-4 border-l-2 border-slate-300 space-y-1">
                                  {sec.explanations.map((exp, eIdx) => (
                                    <p key={eIdx} className="text-xs text-slate-600 italic">
                                      {exp}
                                    </p>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

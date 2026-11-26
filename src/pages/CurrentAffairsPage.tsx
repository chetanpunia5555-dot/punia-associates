import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Globe2, 
  Calendar, 
  ExternalLink, 
  CheckCircle2, 
  Search, 
  Landmark, 
  FileText, 
  Clock, 
  Building2,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { CURRENT_AFFAIRS_DATA, CurrentAffairItem } from '../data/studyCentreData';
import { SEOHead } from '../components/SEOHead';

export const CurrentAffairsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'Legal & Judicial' | 'National & Policy' | 'International & Treaties'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAffairs = useMemo(() => {
    return CURRENT_AFFAIRS_DATA.filter(item => {
      const matchCat = activeCategory === 'all' || item.category === activeCategory;
      const matchSearch = 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.headlineSummary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.issuingAuthority.toLowerCase().includes(searchTerm.toLowerCase());

      return matchCat && matchSearch;
    });
  }, [activeCategory, searchTerm]);

  return (
    <>
      <SEOHead
        title="Legal, India & World Current Affairs | Punia Associates"
        description="Factual, verified reporting on Indian legal developments, Supreme Court administrative notifications, legislative policies, and international law updates with event timestamps and primary sources."
        canonicalUrl="https://puniaassociates.site/current-affairs"
      />

      <div className="bg-[#0B1325] text-white py-14 border-b border-amber-500/20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-3">
              <Globe2 className="w-3.5 h-3.5" /> Judicial & Policy Intelligence
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-100">
              Legal, National & International Current Affairs
            </h1>
            <p className="mt-2 text-slate-300 text-sm md:text-base leading-relaxed">
              Factual, source-verified documentation of judicial appointments, legislative reforms, Bar Council notifications, and statutory policies. Every entry distinguishes the actual Date of Event from the Date of Publication.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="mt-8 flex flex-wrap gap-2 border-b border-slate-800 pb-px">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-t text-xs font-semibold uppercase tracking-wider transition ${
                activeCategory === 'all'
                  ? 'bg-[#F8F9FA] text-[#0B1325] border-t-2 border-amber-500 font-bold'
                  : 'text-slate-400 hover:text-white bg-slate-900/60'
              }`}
            >
              All Current Affairs ({CURRENT_AFFAIRS_DATA.length})
            </button>
            <button
              onClick={() => setActiveCategory('Legal & Judicial')}
              className={`px-4 py-2 rounded-t text-xs font-semibold uppercase tracking-wider transition ${
                activeCategory === 'Legal & Judicial'
                  ? 'bg-[#F8F9FA] text-[#0B1325] border-t-2 border-amber-500 font-bold'
                  : 'text-slate-400 hover:text-white bg-slate-900/60'
              }`}
            >
              Legal & Judicial
            </button>
            <button
              onClick={() => setActiveCategory('National & Policy')}
              className={`px-4 py-2 rounded-t text-xs font-semibold uppercase tracking-wider transition ${
                activeCategory === 'National & Policy'
                  ? 'bg-[#F8F9FA] text-[#0B1325] border-t-2 border-amber-500 font-bold'
                  : 'text-slate-400 hover:text-white bg-slate-900/60'
              }`}
            >
              National & Policy
            </button>
            <button
              onClick={() => setActiveCategory('International & Treaties')}
              className={`px-4 py-2 rounded-t text-xs font-semibold uppercase tracking-wider transition ${
                activeCategory === 'International & Treaties'
                  ? 'bg-[#F8F9FA] text-[#0B1325] border-t-2 border-amber-500 font-bold'
                  : 'text-slate-400 hover:text-white bg-slate-900/60'
              }`}
            >
              International & Treaties
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search */}
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm mb-8">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search current affairs by keywords, authority, or enactment (e.g. eCourts, BCI, Cabinet)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 bg-slate-50/50"
            />
          </div>
        </div>

        {/* Affairs Feed */}
        <div className="space-y-6">
          {filteredAffairs.map((item) => (
            <article 
              key={item.id}
              className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden"
            >
              <div className="p-6">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-amber-100 text-amber-900 border border-amber-200 px-2.5 py-0.5 rounded text-[11px] font-bold uppercase">
                      {item.category}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <strong>Event Occurred:</strong> {item.eventDate}
                    </span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-slate-500 font-mono">
                      <strong>Reported:</strong> {item.publicationDate}
                    </span>
                  </div>

                  <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded">
                    Authority: {item.issuingAuthority}
                  </span>
                </div>

                <h2 className="text-xl font-serif font-bold text-slate-900 leading-snug">
                  {item.title}
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  {item.headlineSummary}
                </p>

                <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-700 leading-relaxed space-y-3">
                  <p>{item.content}</p>

                  <div className="bg-slate-50 p-3.5 rounded border border-slate-100 space-y-1.5">
                    <strong className="text-[11px] uppercase tracking-wider text-slate-500 block">
                      Key Highlights & Takeaways:
                    </strong>
                    {item.bulletPoints.map((pt, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>

                  {item.relatedActs && item.relatedActs.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-2">
                      <Tag className="w-3 h-3 text-slate-400" />
                      <span className="text-[11px] font-bold text-slate-500">Related Acts:</span>
                      {item.relatedActs.map((act, idx) => (
                        <span key={idx} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-mono">
                          {act}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 text-[11px] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Verified Primary Source
                </span>
                <a
                  href={item.verifiedSourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-amber-700 hover:text-amber-800 font-semibold transition"
                >
                  View Official Release <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
};

import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Search, 
  Calendar, 
  ExternalLink, 
  BookOpen, 
  FileText, 
  CheckCircle2,
  RefreshCw,
  Scale
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { LegislativeUpdate, INITIAL_LEGISLATIVE_UPDATES } from '../data/legalCmsData';

export const LegislativeUpdatesPage: React.FC = () => {
  const [updates, setUpdates] = useState<LegislativeUpdate[]>(INITIAL_LEGISLATIVE_UPDATES);
  const [search, setSearch] = useState('');
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUpdates = async () => {
      setIsLoading(true);
      try {
        const res = await fetch('/api/legislative-updates');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setUpdates(data);
          }
        }
      } catch (e) {
        console.error('Failed to load legislative updates:', e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUpdates();
  }, []);

  const filteredUpdates = updates.filter(u => {
    const matchesSearch = search === '' || 
      u.title.toLowerCase().includes(search.toLowerCase()) ||
      u.actName.toLowerCase().includes(search.toLowerCase()) ||
      u.ministry.toLowerCase().includes(search.toLowerCase()) ||
      u.notificationNumber.toLowerCase().includes(search.toLowerCase());

    const matchesJurisdiction = selectedJurisdiction === 'All' || u.jurisdiction.includes(selectedJurisdiction);

    return matchesSearch && matchesJurisdiction;
  });

  return (
    <>
      <SEOHead
        title="Legislative & Regulatory Updates | Punia Associates Legal Research"
        description="Official Central and State Gazette notifications, statutory amendments, rules, and circulars including Bharatiya Nyaya Sanhita (BNS), BNSS, and HRERA regulations."
        canonicalPath="/legislative-updates"
      />

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#0A1120] via-[#0F1B33] to-[#0A1120] text-white pt-24 pb-14 border-b border-amber-500/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-4">
            <Building2 className="w-3.5 h-3.5" />
            <span>Statutory Repository</span>
          </div>

          <h1 className="font-cormorant text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
            Legislative & Regulatory Updates
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed font-light">
            Verified official gazette notifications, central enactments, state statutory rules, and regulatory orders across Parliament of India, Haryana, Uttar Pradesh, and Rajasthan.
          </p>

          {/* Search and Filters */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-2 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by Act title, gazette notification number, or ministry..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            <div>
              <select
                value={selectedJurisdiction}
                onChange={(e) => setSelectedJurisdiction(e.target.value)}
                aria-label="Filter by legislative jurisdiction"
                className="w-full px-3 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 transition-colors cursor-pointer"
              >
                <option value="All">All Jurisdictions</option>
                <option value="Central">Central (Parliament)</option>
                <option value="Haryana">State (Haryana)</option>
                <option value="Uttar Pradesh">State (Uttar Pradesh)</option>
                <option value="Rajasthan">State (Rajasthan)</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Updates Listing */}
      <section className="py-12 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200">
          <div className="text-xs sm:text-sm text-slate-600 font-medium">
            Showing <strong className="text-slate-900">{filteredUpdates.length}</strong> official notifications
          </div>
          {isLoading && (
            <div className="flex items-center gap-1.5 text-xs text-amber-700">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Updating from Gazette feed...</span>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {filteredUpdates.map((item) => (
            <article
              key={item.id}
              className="bg-white border border-slate-200 hover:border-amber-500/40 rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="text-xs font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/80">
                  {item.jurisdiction}
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Enforced: <strong className="text-slate-700 font-medium">{item.enforcementDate}</strong></span>
                </span>
              </div>

              <h2 className="font-cormorant text-xl sm:text-2xl font-bold text-slate-900 mb-2 leading-snug">
                {item.title}
              </h2>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 mb-4 font-mono">
                <span>Gazette No: <strong className="text-slate-800">{item.notificationNumber}</strong></span>
                <span>·</span>
                <span>Gazette Date: {item.gazetteDate}</span>
                <span>·</span>
                <span className="text-slate-700">{item.ministry}</span>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
                {item.summary}
              </p>

              {/* Key Highlights */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 mb-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                  <span>Statutory Impact & Key Highlights</span>
                </h4>
                <ul className="space-y-1.5">
                  {item.keyHighlights.map((hl, i) => (
                    <li key={i} className="text-xs text-slate-700 flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Official Gazette Link */}
              <div className="pt-2 flex items-center justify-between">
                <a
                  href={item.officialGazetteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 hover:text-amber-800 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>View Official Gazette at egazette.gov.in</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>

                <span className="text-[11px] text-slate-400 italic">
                  Primary Source Verified
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* BCI Disclaimers */}
        <div className="mt-12 p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-slate-700 text-xs leading-relaxed">
          <div className="flex items-center gap-2 text-amber-900 font-bold mb-1">
            <Scale className="w-4 h-4 text-amber-700" />
            <span>Statutory Educational Notice (Bar Council of India Rule 36 Compliance)</span>
          </div>
          <p>
            The statutory and legislative notifications published in this section are reproduced from official Central and State Government Gazettes for educational, professional, and academic reference. They do not constitute formal legal counsel. Practitioners and litigants must independently verify the current operative text through the relevant official government portal or published Gazette.
          </p>
        </div>
      </section>
    </>
  );
};

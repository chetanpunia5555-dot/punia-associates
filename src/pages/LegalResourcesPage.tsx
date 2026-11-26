import React, { useState } from 'react';
import { 
  FolderArchive, 
  Search, 
  FileText, 
  Clock, 
  CheckCircle2, 
  ExternalLink, 
  Scale, 
  BookOpen, 
  ArrowRight,
  ShieldAlert,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { INITIAL_LEGAL_RESOURCES, LegalResource } from '../data/legalCmsData';

export const LegalResourcesPage: React.FC = () => {
  const [resources] = useState<LegalResource[]>(INITIAL_LEGAL_RESOURCES);
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>('res-bail-flowchart');

  const filteredResources = resources.filter(r => 
    search === '' || 
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.summary.toLowerCase().includes(search.toLowerCase()) ||
    r.statutesCovered.some(s => s.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <>
      <SEOHead
        title="Legal Resources & Case Law Library | Punia Associates"
        description="Procedural flowcharts, statutory limitation tables, Section 138 NI Act guides, Order 39 CPC injunction checklists, and official Indian court portals directory."
        canonicalPath="/resources"
      />

      {/* Header */}
      <section className="bg-gradient-to-b from-[#0A1120] via-[#0F1B33] to-[#0A1120] text-white pt-24 pb-14 border-b border-amber-500/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-4">
            <FolderArchive className="w-3.5 h-3.5" />
            <span>Practice Aids & Library</span>
          </div>

          <h1 className="font-cormorant text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
            Legal Resources & Practice Library
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed font-light">
            Comprehensive procedural guides, statutory timelines, trial court checklists, and verified links to official Indian court data systems for advocates, scholars, and litigants.
          </p>

          <div className="mt-8 max-w-xl relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search procedural guides, statutes (e.g. Order 39, Section 138, BNSS 482)..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 gap-6">
          {filteredResources.map((res) => {
            const isExpanded = expandedId === res.id;
            return (
              <div
                key={res.id}
                className="bg-white border border-slate-200 hover:border-amber-500/40 rounded-2xl p-6 sm:p-7 shadow-sm transition-all duration-200"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-semibold text-amber-900 bg-amber-100/70 px-2.5 py-1 rounded-md">
                    {res.type}
                  </span>
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : res.id)}
                    className="text-xs font-semibold text-slate-500 hover:text-amber-700 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>{isExpanded ? 'Collapse Guide' : 'Read Full Guide'}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                <h2 className="font-cormorant text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                  {res.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
                  {res.summary}
                </p>

                {/* Covered Statutes */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="text-[11px] font-semibold text-slate-500">Key Statutes:</span>
                  {res.statutesCovered.map((st, i) => (
                    <span key={i} className="text-[11px] font-mono text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {st}
                    </span>
                  ))}
                </div>

                {/* Collapsible Expanded Detail */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-slate-200/80 space-y-4 animate-in fade-in">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
                      <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-amber-600" />
                        <span>Procedural Details & Essential Guidance:</span>
                      </h4>
                      <p className="whitespace-pre-line text-slate-800">
                        {res.details}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-1">
                      <span>Source Reference: <strong className="text-slate-700">{res.sourceReference}</strong></span>
                      <span className="text-amber-800 font-medium">Verified by Punia Associates Legal Research Wing</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Official Portals Direct Directory */}
        <div className="mt-14">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block mb-1">
              Primary Source Portals
            </span>
            <h3 className="font-cormorant text-2xl sm:text-3xl font-bold text-slate-900">
              Direct Access to Indian Judicial Repositories
            </h3>
            <p className="text-xs text-slate-600 mt-2 font-light">
              Always verify original case records directly from the designated official court and governmental websites.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                name: 'Supreme Court e-SCR',
                desc: 'Digital repository of official reported Supreme Court judgments from 1950 to present.',
                url: 'https://scr.sci.gov.in/',
                tag: 'Apex Court'
              },
              {
                name: 'National Judicial Data Grid',
                desc: 'Real-time case status, cause lists, and orders across District & High Courts.',
                url: 'https://njdg.ecourts.gov.in/',
                tag: 'All India Courts'
              },
              {
                name: 'India Code Legislative Portal',
                desc: 'Consolidated database of all Central and State Acts, Bare Acts, and amendments.',
                url: 'https://www.indiacode.nic.in/',
                tag: 'Bare Acts'
              },
              {
                name: 'e-Gazette of India',
                desc: 'Official digital publication of Acts, Ordinances, and statutory notifications.',
                url: 'https://egazette.gov.in/',
                tag: 'Official Gazettes'
              }
            ].map((p, i) => (
              <a
                key={i}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 bg-white border border-slate-200 hover:border-amber-500 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 mb-2 inline-block">
                    {p.tag}
                  </span>
                  <h4 className="font-cormorant text-lg font-bold text-slate-900 group-hover:text-amber-800 transition-colors flex items-center justify-between">
                    <span>{p.name}</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h4>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-amber-700 font-semibold flex items-center gap-1">
                  <span>Visit Portal</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* BCI Disclaimer */}
        <div className="mt-12 p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-slate-700 text-xs leading-relaxed">
          <div className="flex items-center gap-2 text-amber-900 font-bold mb-1">
            <Scale className="w-4 h-4 text-amber-700" />
            <span>Statutory Educational Notice (Bar Council of India Rule 36 Compliance)</span>
          </div>
          <p>
            The flowcharts, checklists, and statutory guides published here are solely for public legal literacy and academic research. They do not constitute formal legal advice. Litigants should consult qualified counsel on the specific facts and circumstances of their legal controversy.
          </p>
        </div>
      </section>
    </>
  );
};

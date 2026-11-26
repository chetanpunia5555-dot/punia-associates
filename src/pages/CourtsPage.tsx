import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Landmark, 
  MapPin, 
  Scale, 
  Building2, 
  CheckCircle2, 
  PhoneCall, 
  ArrowRight, 
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Search,
  Users,
  Calendar,
  FileText
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { STATE_HUBS, FIRM_INFO } from '../data/legalData';
import { INDIAN_COURTS_DIRECTORY, IndianCourt } from '../data/courtsDirectoryData';

interface CourtsPageProps {
  onOpenConsultation: (category?: string, state?: string) => void;
}

export const CourtsPage: React.FC<CourtsPageProps> = ({ onOpenConsultation }) => {
  const [activeTab, setActiveTab] = useState<'highcourts' | 'regional' | 'tribunals'>('highcourts');
  const [courtSearch, setCourtSearch] = useState('');
  const [selectedCourtType, setSelectedCourtType] = useState<string>('all');

  const filteredCourts = useMemo(() => {
    return INDIAN_COURTS_DIRECTORY.filter(c => {
      const matchSearch = 
        c.name.toLowerCase().includes(courtSearch.toLowerCase()) ||
        c.principalSeat.toLowerCase().includes(courtSearch.toLowerCase()) ||
        c.territorialJurisdiction.some(j => j.toLowerCase().includes(courtSearch.toLowerCase())) ||
        c.benches.some(b => b.toLowerCase().includes(courtSearch.toLowerCase()));

      const matchType = selectedCourtType === 'all' || c.type === selectedCourtType;

      return matchSearch && matchType;
    });
  }, [courtSearch, selectedCourtType]);

  return (
    <>
      <SEOHead
        title="All 25 Indian High Courts & Supreme Court Directory | Punia Associates"
        description="Comprehensive judicial directory of the Supreme Court of India and all 25 State High Courts. Includes principal seats, permanent benches, territorial jurisdictions, official links, and eCourts status portals."
        canonicalPath="/courts"
      />

      <Breadcrumbs items={[{ name: 'Courts & Jurisdictions', url: '/courts' }]} />

      <main className="bg-[#F8F9FA] text-[#1E293B]">
        {/* Header Hero */}
        <section className="bg-[#0B1325] text-white py-14 sm:py-18 border-b border-amber-500/20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30 tracking-wide uppercase font-mono mb-4">
                <Landmark className="w-3.5 h-3.5" /> Judicial Directory & Courtroom Jurisdiction
              </span>
              <h1 className="font-cormorant text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
                Supreme Court & All 25 Indian High Courts
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                Authoritative judicial directory documenting the Supreme Court of India, all 25 State High Courts, regional circuit benches, territorial jurisdictions, and direct links to official eCourts portals and daily cause lists.
              </p>
            </div>

            {/* Navigation Tabs */}
            <div className="mt-8 flex flex-wrap gap-2 border-b border-slate-800 pb-px">
              <button
                onClick={() => setActiveTab('highcourts')}
                className={`px-5 py-2.5 rounded-t-lg text-xs font-semibold uppercase tracking-wider transition ${
                  activeTab === 'highcourts'
                    ? 'bg-[#F8F9FA] text-[#0B1325] border-t-2 border-amber-500'
                    : 'text-slate-400 hover:text-white bg-slate-900/60'
                }`}
              >
                All 25 High Courts & Apex Court ({INDIAN_COURTS_DIRECTORY.length})
              </button>
              <button
                onClick={() => setActiveTab('regional')}
                className={`px-5 py-2.5 rounded-t-lg text-xs font-semibold uppercase tracking-wider transition ${
                  activeTab === 'regional'
                    ? 'bg-[#F8F9FA] text-[#0B1325] border-t-2 border-amber-500'
                    : 'text-slate-400 hover:text-white bg-slate-900/60'
                }`}
              >
                Punia Associates Regional Chambers ({STATE_HUBS.length} States)
              </button>
              <button
                onClick={() => setActiveTab('tribunals')}
                className={`px-5 py-2.5 rounded-t-lg text-xs font-semibold uppercase tracking-wider transition ${
                  activeTab === 'tribunals'
                    ? 'bg-[#F8F9FA] text-[#0B1325] border-t-2 border-amber-500'
                    : 'text-slate-400 hover:text-white bg-slate-900/60'
                }`}
              >
                Specialized National Tribunals (NCLT, RERA, CAT, DRT)
              </button>
            </div>
          </div>
        </section>

        {/* TAB 1: ALL 25 HIGH COURTS & SUPREME COURT */}
        {activeTab === 'highcourts' && (
          <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Search & Filter Bar */}
            <div className="bg-white p-4 sm:p-5 rounded-lg border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search High Courts by name, seat (e.g. Chandigarh, Prayagraj, Jodhpur), or territory..."
                  value={courtSearch}
                  onChange={(e) => setCourtSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 bg-slate-50/50"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-600">Court Type:</span>
                <select
                  value={selectedCourtType}
                  onChange={(e) => setSelectedCourtType(e.target.value)}
                  className="border border-slate-200 bg-white px-3 py-1.5 rounded text-xs font-medium text-slate-800 focus:outline-none"
                >
                  <option value="all">All Courts</option>
                  <option value="Supreme Court">Supreme Court of India</option>
                  <option value="High Court">High Courts (25)</option>
                </select>
              </div>
            </div>

            {/* Courts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourts.map((court) => (
                <div 
                  key={court.id}
                  className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between overflow-hidden"
                >
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        court.type === 'Supreme Court' 
                          ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                          : 'bg-indigo-50 text-indigo-800 border border-indigo-200'
                      }`}>
                        {court.type}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400 font-medium">
                        Est. {court.establishedYear}
                      </span>
                    </div>

                    <h3 className="text-base font-serif font-bold text-slate-900 leading-snug">
                      {court.name}
                    </h3>
                    {court.hindiName && (
                      <p className="text-xs text-slate-500 font-hindi mt-0.5">
                        {court.hindiName}
                      </p>
                    )}

                    <div className="mt-3.5 space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3">
                      <div className="flex items-start gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" />
                        <div>
                          <strong className="text-slate-800">Principal Seat:</strong> {court.principalSeat}
                        </div>
                      </div>

                      {court.benches.length > 0 && court.benches[0] !== `Principal Seat at ${court.principalSeat}` && (
                        <div className="flex items-start gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                          <div>
                            <strong className="text-slate-800">Benches:</strong> {court.benches.join('; ')}
                          </div>
                        </div>
                      )}

                      <div className="flex items-start gap-1.5">
                        <Scale className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                        <div>
                          <strong className="text-slate-800">Territory:</strong> {court.territorialJurisdiction.join(', ')}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 text-slate-500">
                        <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>Sanctioned Judicial Strength: <strong>{court.sanctionedJudges} Judges</strong></span>
                      </div>
                    </div>

                    <p className="mt-3 text-xs text-slate-600 line-clamp-2 leading-relaxed bg-slate-50 p-2 rounded">
                      {court.description}
                    </p>
                  </div>

                  {/* Actions & Official Links */}
                  <div className="bg-slate-50/90 px-5 py-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <a
                      href={court.officialWebsite}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-slate-700 hover:text-amber-700 transition"
                    >
                      <ExternalLink className="w-3 h-3 text-amber-600" /> Official Portal
                    </a>

                    <div className="flex items-center gap-2">
                      <a
                        href={court.eCourtsPortal}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded text-[11px] font-semibold text-indigo-700 transition"
                        title="Search eCourts Case Status"
                      >
                        eCourts
                      </a>

                      {court.causeListUrl && (
                        <a
                          href={court.causeListUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-2 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded text-[11px] font-semibold text-slate-700 transition flex items-center gap-1"
                          title="View Daily Cause List"
                        >
                          <Calendar className="w-2.5 h-2.5 text-slate-500" /> Cause List
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredCourts.length === 0 && (
              <div className="text-center py-16 bg-white rounded-lg border border-slate-200">
                <Landmark className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-slate-800">No matching High Courts found</h4>
                <p className="text-xs text-slate-500 mt-1">Try a different search query or reset filters.</p>
              </div>
            )}
          </section>
        )}

        {/* TAB 2: REGIONAL STATE HUBS (Haryana, Delhi, UP, Rajasthan) */}
        {activeTab === 'regional' && (
          <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-md border border-amber-200">
                Regional Chambers
              </span>
              <h2 className="font-cormorant text-2xl sm:text-3xl font-bold text-[#0B1325] mt-2">
                Punia Associates Primary State Practice Hubs
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                Detailed breakdown of local courts, state revenue codes, and lead counsel across our four operational state chambers.
              </p>
            </div>

            <div className="space-y-8">
              {STATE_HUBS.map((hub) => (
                <div 
                  key={hub.state} 
                  className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden"
                >
                  <div className="bg-[#0B1325] text-white p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800">
                    <div>
                      <span className="text-[11px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20 uppercase">
                        {hub.state} Hub
                      </span>
                      <h3 className="font-cormorant text-xl sm:text-2xl font-bold text-white mt-1">
                        {hub.state} Judicial Jurisdictions
                      </h3>
                      <p className="text-xs text-slate-300 mt-0.5 font-light">
                        {hub.tagline}
                      </p>
                    </div>
                    <div className="text-left md:text-right shrink-0">
                      <span className="text-[11px] text-slate-400 block">Lead State Counsel:</span>
                      <strong className="text-xs sm:text-sm text-amber-400 font-serif block">{hub.leadAdvocate}</strong>
                      <span className="text-[10px] text-slate-400 font-mono">{hub.leadExperience}</span>
                    </div>
                  </div>

                  <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-6 space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                        <Landmark className="w-3.5 h-3.5 text-amber-600" />
                        <span>Primary Courts & Benches Served:</span>
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-600">
                        {hub.primaryCourts.map((court, i) => (
                          <li key={i} className="flex items-start gap-2 bg-slate-50 p-2 rounded border border-slate-200/60">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{court}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs text-slate-600 leading-relaxed pt-2">
                        {hub.jurisdictionAnalysis}
                      </p>
                    </div>

                    <div className="lg:col-span-6 space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                        <Scale className="w-3.5 h-3.5 text-amber-600" />
                        <span>Key State Specialties & Enactments:</span>
                      </h4>
                      <ul className="space-y-1 text-xs text-slate-600">
                        {hub.keySpecialties.map((spec, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-amber-500 font-bold shrink-0">•</span>
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="pt-2 border-t border-slate-100">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                          Governing State Acts Handled:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {hub.stateLawsAndActs.map((act, i) => (
                            <span key={i} className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                              {act}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 flex items-center justify-between">
                        <button
                          onClick={() => onOpenConsultation(undefined, hub.state)}
                          className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-[#0B1325] text-xs font-bold rounded transition flex items-center gap-1.5"
                        >
                          <PhoneCall className="w-3 h-3" />
                          <span>Consult {hub.state} Counsel</span>
                        </button>
                        <Link
                          to="/lawyers"
                          className="text-xs font-semibold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1"
                        >
                          <span>View {hub.state} Advocates</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* TAB 3: SPECIALIZED TRIBUNALS */}
        {activeTab === 'tribunals' && (
          <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-3 py-1 rounded-md">
                Quasi-Judicial Forums
              </span>
              <h2 className="font-cormorant text-2xl sm:text-3xl font-bold text-[#0B1325] mt-2">
                Specialized Tribunals & Regulatory Commissions
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                Courtroom counsel and representation before statutory economic, company law, service, real estate, and consumer appellate forums.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
                <Building2 className="w-7 h-7 text-amber-600 mb-2.5" />
                <h3 className="font-bold text-sm text-[#0B1325] mb-1">NCLT & NCLAT</h3>
                <p className="text-xs text-slate-500 mb-2">National Company Law Tribunal (Principal Bench New Delhi & Chandigarh)</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Insolvency & Bankruptcy Code (IBC) corporate debtor insolvency, oppression & mismanagement petitions under Companies Act Sec 241-242, and appellate proceedings before NCLAT.
                </p>
              </div>

              <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
                <Building2 className="w-7 h-7 text-amber-600 mb-2.5" />
                <h3 className="font-bold text-sm text-[#0B1325] mb-1">RERA Authorities & Appellates</h3>
                <p className="text-xs text-slate-500 mb-2">HRERA Gurugram/Panchkula • UP RERA Greater Noida • Raj RERA Jaipur</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Builder-buyer dispute resolution, possession delay complaints, compensation claims, and statutory appeals before State Real Estate Appellate Tribunals.
                </p>
              </div>

              <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
                <Building2 className="w-7 h-7 text-amber-600 mb-2.5" />
                <h3 className="font-bold text-sm text-[#0B1325] mb-1">Central Administrative Tribunal (CAT)</h3>
                <p className="text-xs text-slate-500 mb-2">Principal Bench New Delhi • Chandigarh Bench • Allahabad Bench</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Central government employee service conditions, seniority list disputes, wrongful disciplinary inquiries, promotions, and pension entitlements under Administrative Tribunals Act 1985.
                </p>
              </div>

              <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
                <Building2 className="w-7 h-7 text-amber-600 mb-2.5" />
                <h3 className="font-bold text-sm text-[#0B1325] mb-1">Debt Recovery Tribunal (DRT & DRAT)</h3>
                <p className="text-xs text-slate-500 mb-2">DRT Delhi • DRT Chandigarh • DRT Lucknow • DRT Jaipur</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Challenging unlawful possession notices under SARFAESI Act Section 17, securitization appeals, and bank recovery applications.
                </p>
              </div>

              <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
                <Building2 className="w-7 h-7 text-amber-600 mb-2.5" />
                <h3 className="font-bold text-sm text-[#0B1325] mb-1">Consumer Commissions (DCDRC / SCDRC / NCDRC)</h3>
                <p className="text-xs text-slate-500 mb-2">District Commissions • State Commissions • National Commission New Delhi</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Redressal against insurance claim repudiation, deficient consumer services, medical negligence, and defective commercial goods.
                </p>
              </div>

              <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
                <Building2 className="w-7 h-7 text-amber-600 mb-2.5" />
                <h3 className="font-bold text-sm text-[#0B1325] mb-1">National Green Tribunal (NGT)</h3>
                <p className="text-xs text-slate-500 mb-2">Principal Bench New Delhi • Western / Central Benches</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Environmental clearance compliance, industrial effluent disputes, groundwater extraction permissions, and Forest Conservation Act matters.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Global CTA */}
        <section className="bg-gradient-to-r from-[#0B1325] via-[#111c38] to-[#0B1325] text-white py-14 border-t border-slate-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30 tracking-wide uppercase font-mono mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Chambers & Courtroom Coordination
            </span>
            <h2 className="font-cormorant text-2xl sm:text-3xl font-bold mb-3">
              Need Legal Counsel Before a Specific High Court or District Bench?
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto mb-6 font-light">
              Connect with our jurisdictional desk to coordinate filings, urgent motion mentionings, or local advocate appearances.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => onOpenConsultation()}
                className="w-full sm:w-auto px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-[#0B1325] font-bold text-xs rounded transition flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#0B1325]" />
                <span>Coordinate Court Appearance</span>
              </button>
              <Link
                to="/contact"
                className="w-full sm:w-auto px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded border border-slate-700 transition text-center"
              >
                Chambers Directory & Helplines
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

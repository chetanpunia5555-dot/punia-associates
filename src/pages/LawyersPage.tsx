import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  MapPin, 
  GraduationCap, 
  Award, 
  PhoneCall, 
  Filter, 
  Scale, 
  Building2, 
  CheckCircle2, 
  ShieldCheck,
  Search,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { NETWORK_ADVOCATES, FIRM_INFO, NetworkAdvocate } from '../data/legalData';

interface LawyersPageProps {
  onOpenConsultation: (category?: string, state?: string) => void;
}

export const LawyersPage: React.FC<LawyersPageProps> = ({ onOpenConsultation }) => {
  const [selectedState, setSelectedState] = useState<string>('All');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const states = ['All', 'Haryana', 'Uttar Pradesh', 'Rajasthan', 'Delhi NCR'];
  const specialties = [
    'All',
    'Criminal Defense',
    'Anticipatory Bail',
    'UP Revenue Code',
    'High Court Writs',
    'Special Leave Petitions (SLP)',
    'Matrimonial & Family',
    'Commercial Contracts',
    'HRERA Disputes'
  ];

  const filteredAdvocates = NETWORK_ADVOCATES.filter((adv) => {
    const matchesState = selectedState === 'All' || adv.state === selectedState;
    const matchesSpecialty = selectedSpecialty === 'All' || adv.specialization.some(s => s.toLowerCase().includes(selectedSpecialty.toLowerCase()));
    const matchesSearch = searchQuery === '' || 
      adv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      adv.primaryCourt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      adv.specialization.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesState && matchesSpecialty && matchesSearch;
  });

  return (
    <>
      <SEOHead
        title="Advocates & Lawyers | Punia Associates"
        description="Meet the advocates and legal professionals associated with Punia Associates and explore their areas of practice and professional profiles."
        canonicalPath="/lawyers"
        schemaData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Our Advocates & Lawyers",
          "url": "https://puniaassociates.site/lawyers",
          "description": "Meet the advocates and legal professionals associated with Punia Associates and explore their areas of practice and professional profiles.",
          "mainEntity": {
            "@type": "ItemList",
            "itemListElement": NETWORK_ADVOCATES.map((adv, idx) => ({
              "@type": "Person",
              "position": idx + 1,
              "name": adv.name,
              "jobTitle": adv.designation,
              "worksFor": {
                "@type": "LegalService",
                "name": "Punia Associates"
              }
            }))
          }
        }}
      />

      <Breadcrumbs items={[{ name: 'Advocates & Lawyers', url: '/lawyers' }]} />

      <main className="bg-[#F8F9FA] text-[#1E293B]">
        {/* Header Hero */}
        <section className="bg-[#0B1325] text-white py-16 sm:py-20 border-b border-slate-800 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30 tracking-wide uppercase font-mono mb-4">
                Courtroom Advocates & Counsel
              </span>
              <h1 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
                Our Advocates & Lawyers
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
                Meet the senior advocates, trial litigators, and appellate counsel associated with Punia Associates. Our legal professionals represent clients across the Supreme Court of India, State High Courts, and District Jurisdictions.
              </p>
            </div>
          </div>
        </section>

        {/* Filter & Search Bar */}
        <section className="py-6 bg-slate-100 border-b border-slate-200 sticky top-16 z-20 backdrop-blur-md bg-white/95">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* Search Box */}
              <div className="md:col-span-4 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search advocate, court, or specialty..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              {/* State Filter Buttons */}
              <div className="md:col-span-5 flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
                <span className="text-xs text-slate-500 font-semibold shrink-0 mr-1 flex items-center gap-1">
                  <Filter className="w-3 h-3" /> State:
                </span>
                {states.map((st) => (
                  <button
                    key={st}
                    onClick={() => setSelectedState(st)}
                    className={`text-xs px-2.5 py-1.5 rounded-md font-medium shrink-0 transition-colors cursor-pointer ${
                      selectedState === st 
                        ? 'bg-[#0B1325] text-amber-400 font-semibold' 
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              {/* Specialty Dropdown */}
              <div className="md:col-span-3">
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="w-full py-2 px-3 text-xs rounded-lg border border-slate-300 bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  <option value="All">All Practice Specializations</option>
                  {specialties.filter(s => s !== 'All').map((spec) => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Advocates Directory Grid */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-cormorant text-2xl sm:text-3xl font-bold text-[#0B1325]">
              Advocate Profiles ({filteredAdvocates.length} Available)
            </h2>
            <span className="text-xs text-slate-500">
              Bar Council verified credentials
            </span>
          </div>

          {filteredAdvocates.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl border border-slate-200 p-8">
              <Users className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="font-bold text-base text-slate-700">No advocates match the selected criteria</h3>
              <p className="text-xs text-slate-500 mt-1">Try resetting the state or specialty filter.</p>
              <button
                onClick={() => { setSelectedState('All'); setSelectedSpecialty('All'); setSearchQuery(''); }}
                className="mt-4 px-4 py-2 bg-amber-500 text-[#0B1325] text-xs font-bold rounded-lg"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAdvocates.map((adv) => (
                <article
                  key={adv.id}
                  id={adv.id}
                  className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-amber-500/50 transition-all flex flex-col justify-between overflow-hidden"
                >
                  <div>
                    {/* Top Status Bar */}
                    <div className="bg-slate-50 border-b border-slate-100 p-4 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded border border-amber-200">
                        {adv.state}
                      </span>
                      <span className="text-xs text-slate-600 font-semibold flex items-center gap-1">
                        <Award className="w-3.5 h-3.5 text-amber-500" />
                        {adv.experienceYears} Years Standing
                      </span>
                    </div>

                    {/* Main Info */}
                    <div className="p-6">
                      <div className="w-12 h-12 rounded-full bg-slate-900 text-amber-400 font-cinzel font-bold text-lg flex items-center justify-center mb-3">
                        {adv.name.split(' ').slice(1, 3).map(n => n[0]).join('') || 'PA'}
                      </div>

                      <h3 className="font-cormorant text-2xl font-bold text-[#0B1325]">
                        {adv.name}
                      </h3>
                      <p className="text-xs font-medium text-amber-600 mt-0.5 mb-4">
                        {adv.designation}
                      </p>

                      <div className="space-y-3 text-xs text-slate-600">
                        <div className="flex items-start gap-2">
                          <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                          <span><strong>Primary Forum:</strong> {adv.primaryCourt}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <ShieldCheck className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                          <span><strong>Bar Enrollment:</strong> {adv.barEnrollment}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                          <span><strong>Credentials:</strong> {adv.education}</span>
                        </div>
                      </div>

                      {/* Specializations Tags */}
                      <div className="mt-5 pt-4 border-t border-slate-100">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                          Practice Areas:
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {adv.specialization.map((spec, i) => (
                            <span key={i} className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <div className="text-[11px] text-slate-500">
                      Chambers Direct Helpline
                    </div>
                    <button
                      onClick={() => onOpenConsultation(adv.specialization[0], adv.state)}
                      className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-[#0B1325] text-xs font-bold rounded transition-colors shadow-sm cursor-pointer flex items-center gap-1.5"
                    >
                      <PhoneCall className="w-3 h-3 text-[#0B1325]" />
                      <span>Consult Advocate</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Scalability Notice & BCI Ethics Notice */}
        <section className="py-12 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 leading-relaxed space-y-3">
              <h3 className="font-bold text-sm text-[#0B1325] flex items-center gap-2">
                <Scale className="w-4 h-4 text-amber-600" />
                <span>Statutory Compliance & Advocate Profile Information</span>
              </h3>
              <p>
                Profiles listed on this page represent independent practicing advocates associated with the Punia Associates professional network. All educational qualifications, Bar Council enrollments, and practice years reflect verified records.
              </p>
              <p>
                As mandated by the Bar Council of India rules under Section 49(1)(c) of the Advocates Act 1961, the information presented does not constitute solicitation of work or commercial advertisement. New advocate profiles and chamber designations may be integrated into this directory as professional affiliations evolve across respective state bars.
              </p>
            </div>
          </div>
        </section>

        {/* Global Consultation CTA */}
        <section className="bg-gradient-to-r from-[#0B1325] via-[#111c38] to-[#0B1325] text-white py-16 border-t border-slate-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30 tracking-wide uppercase font-mono mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Direct Advocate Access
            </span>
            <h2 className="font-cormorant text-3xl sm:text-4xl font-bold mb-4">
              Schedule a Consultation with a Practicing Advocate
            </h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto mb-8 font-light">
              Connect with our advocates for initial case appraisal, drafting assistance, or urgent court filing before the relevant High Court or District Bench.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onOpenConsultation()}
                className="w-full sm:w-auto px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-[#0B1325] font-bold text-sm rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-[#0B1325]" />
                <span>Request Case Evaluation</span>
              </button>
              <Link
                to="/courts"
                className="w-full sm:w-auto px-8 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm rounded-lg border border-slate-700 transition-colors text-center"
              >
                View Courts & Jurisdictions
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Scale, 
  ShieldCheck, 
  FileText, 
  Phone, 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  Award,
  Sparkles
} from 'lucide-react';
import { STATE_HUBS, StateLegalHub, FIRM_INFO } from '../data/legalData';

interface StateLegalHubsProps {
  onOpenFreeConsultation: (category?: string, state?: string) => void;
  selectedState?: string | null;
}

export const StateLegalHubs: React.FC<StateLegalHubsProps> = ({ 
  onOpenFreeConsultation,
  selectedState 
}) => {
  const [activeStateTab, setActiveStateTab] = useState<string>(selectedState || 'Haryana');

  React.useEffect(() => {
    if (selectedState) {
      setActiveStateTab(selectedState);
    }
  }, [selectedState]);

  const currentHub: StateLegalHub = STATE_HUBS.find(h => h.state === activeStateTab) || STATE_HUBS[0];

  return (
    <section id="state-legal-hubs" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2 border border-amber-300">
            <Award className="w-3.5 h-3.5 text-amber-800" />
            <span>State Jurisdictional Command Hubs</span>
          </div>
          <h2 className="font-cormorant text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1325]">
            Courts and Jurisdictions Served Across India
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Every state possesses distinct land revenue codes, police procedures, and High Court practices. Punia Associates maintains a dedicated panel of advocates led by senior state litigators who know the benches, the judicial officers, and local court procedures inside out across Haryana, Uttar Pradesh, Rajasthan, and Delhi NCR.
          </p>
        </div>

        {/* State Selection Tabs */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-10">
          {STATE_HUBS.map((hub) => (
            <button
              key={hub.state}
              onClick={() => setActiveStateTab(hub.state)}
              className={`px-5 py-3 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm ${
                activeStateTab === hub.state
                  ? 'bg-[#0B1325] text-white shadow-lg border border-amber-500/40'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              <MapPin className={`w-4 h-4 ${activeStateTab === hub.state ? 'text-amber-400' : 'text-slate-500'}`} />
              <span>{hub.state} ({hub.advocateCount.split(' ')[0]} Advocates)</span>
            </button>
          ))}
        </div>

        {/* Selected State Deep-Dive Card */}
        <div className="bg-[#FAF9F7] rounded-xl border border-slate-200 p-6 sm:p-10 shadow-md">
          {/* Top Banner of Selected State */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-widest mb-1">
                <span>Jurisdiction Profile</span>
                <span>•</span>
                <span className="text-emerald-700 font-semibold">{currentHub.advocateCount}</span>
              </div>
              <h3 className="font-cormorant text-3xl sm:text-4xl font-bold text-[#0B1325]">
                {currentHub.state} Legal Command
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
                {currentHub.tagline}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpenFreeConsultation(undefined, currentHub.state)}
                className="px-5 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-[#0B1325] font-bold text-xs sm:text-sm shadow-md transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#0B1325]" />
                <span>Talk to {currentHub.state} Advocate (FREE)</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Columns: Jurisdictional Analysis & Key Specialties */}
            <div className="lg:col-span-7 space-y-6">
              {/* Strategic Jurisdictional Overview */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-amber-800" />
                  <span>State Judicial & Procedural Analysis</span>
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed bg-white p-4 rounded-lg border border-slate-200">
                  {currentHub.jurisdictionAnalysis}
                </p>
              </div>

              {/* State Core Specialties */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-800" />
                  <span>Core Legal Specialties in {currentHub.state}</span>
                </h4>
                <div className="space-y-2">
                  {currentHub.keySpecialties.map((spec, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-2.5 bg-white rounded border border-slate-200 text-xs text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="font-medium">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Governing State Acts & Statutory Framework */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-amber-800" />
                  <span>Key Governing State Acts & Legislation</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {currentHub.stateLawsAndActs.map((act, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-slate-200/80 text-slate-800 text-xs font-semibold rounded border border-slate-300"
                    >
                      {act}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Courts Covered, Lead Advocate & SEO Highlights */}
            <div className="lg:col-span-5 space-y-6">
              {/* Lead State Advocate Profile */}
              <div className="bg-[#0B1325] text-white p-5 rounded-lg border border-slate-800 shadow-md">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest block mb-1">
                  State Legal Head
                </span>
                <h4 className="font-cormorant text-2xl font-bold text-white">
                  {currentHub.leadAdvocate}
                </h4>
                <p className="text-xs text-slate-300 font-medium mt-0.5 mb-4">
                  {currentHub.leadExperience} • Managing Counsel for {currentHub.state}
                </p>
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    Available for Free Consultation
                  </span>
                  <button
                    onClick={() => onOpenFreeConsultation(undefined, currentHub.state)}
                    className="text-amber-300 hover:text-white font-bold underline cursor-pointer"
                  >
                    Consult Now
                  </button>
                </div>
              </div>

              {/* Primary Courts Covered in State */}
              <div className="bg-white p-5 rounded-lg border border-slate-200">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-amber-800" />
                  <span>Primary Courts & Tribunals Covered</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {currentHub.primaryCourts.map((court, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                      <span>{court}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* State Key Legal Matters */}
              <div className="bg-amber-50/80 p-4 rounded-lg border border-amber-200">
                <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wider mb-2">
                  Key High Court & District Legal Focus Areas in {currentHub.state}:
                </h4>
                <div className="space-y-1 text-xs text-amber-900 font-medium">
                  {currentHub.seoFocusPoints.map((point, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <span className="text-amber-700 font-bold">✓</span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

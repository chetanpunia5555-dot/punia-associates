import React, { useState } from 'react';
import { 
  Users, 
  MapPin, 
  Award, 
  Phone, 
  MessageCircle, 
  Search, 
  Sparkles, 
  Scale, 
  CheckCircle2, 
  X,
  GraduationCap
} from 'lucide-react';
import { NETWORK_ADVOCATES, NetworkAdvocate, FIRM_INFO } from '../data/legalData';

interface AttorneysProps {
  onOpenFreeConsultation: (categoryId?: string, state?: string, advocateName?: string) => void;
}

export const Attorneys: React.FC<AttorneysProps> = ({ onOpenFreeConsultation }) => {
  const [selectedState, setSelectedState] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedAdvocate, setSelectedAdvocate] = useState<NetworkAdvocate | null>(null);

  const filteredAdvocates = NETWORK_ADVOCATES.filter(adv => {
    const matchesState = selectedState === 'All' || adv.state === selectedState;
    const matchesSearch = 
      adv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      adv.specialization.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      adv.primaryCourt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesState && matchesSearch;
  });

  const handleWhatsApp = (adv: NetworkAdvocate) => {
    const text = encodeURIComponent(`Namaste ${adv.name}, I found your profile on puniaassociates.site. I need FREE consultation for my case in ${adv.primaryCourt}.`);
    window.open(`https://wa.me/${FIRM_INFO.whatsappNumber.replace('+', '')}?text=${text}`, '_blank');
  };

  return (
    <section id="advocates-directory" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2 border border-amber-300">
            <Users className="w-3.5 h-3.5 text-amber-800" />
            <span>Senior Advocacy Roster</span>
          </div>
          <h2 className="font-cormorant text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1325]">
            Our Advocate and Lawyer Network Across India
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Represented by litigators with 20+ years of active trial standing across High Courts and District Courts in Haryana, Uttar Pradesh, Rajasthan, and the Supreme Court of India.
          </p>
        </div>

        {/* State Filters & Search Bar */}
        <div className="bg-[#FAF9F7] p-4 sm:p-6 rounded-xl border border-slate-200 mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* State Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {['All', 'Haryana', 'Uttar Pradesh', 'Rajasthan', 'Delhi NCR'].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedState(st)}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  selectedState === st
                    ? 'bg-[#0B1325] text-white shadow'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by specialty, court, or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2.5 border border-slate-300 rounded-lg bg-white focus:ring-1 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Advocates Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAdvocates.map((adv) => (
            <div
              key={adv.id}
              className="bg-[#FAF9F7] rounded-xl border border-slate-200 hover:border-amber-400 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-lg group"
            >
              <div>
                {/* State Tag & Free Advice Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-200 text-slate-800 px-2 py-0.5 rounded flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-700" />
                    <span>{adv.state}</span>
                  </span>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded flex items-center gap-1 border border-emerald-300">
                    <Sparkles className="w-3 h-3 text-emerald-600" />
                    <span>Free Advice</span>
                  </span>
                </div>

                <h3 className="font-cormorant text-2xl font-bold text-[#0B1325] group-hover:text-amber-900 transition-colors">
                  {adv.name}
                </h3>
                <p className="text-xs text-amber-800 font-semibold mb-2">
                  {adv.designation}
                </p>

                <p className="text-xs text-slate-600 mb-4 flex items-start gap-1.5">
                  <Scale className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{adv.primaryCourt}</span>
                </p>

                {/* Experience & Degree */}
                <div className="space-y-1.5 text-xs text-slate-700 bg-white p-3 rounded border border-slate-200 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Advocacy Standing:</span>
                    <strong className="text-[#0B1325]">{adv.experienceYears}+ Years</strong>
                  </div>
                  <div className="text-[11px] text-slate-600 truncate">
                    <strong>Enrollment:</strong> {adv.barEnrollment}
                  </div>
                </div>

                {/* Specialization Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {adv.specialization.map((spec, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-slate-200/70 text-slate-800 rounded text-[11px] font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-slate-200 flex items-center gap-2">
                <button
                  onClick={() => onOpenFreeConsultation(undefined, adv.state, adv.name)}
                  className="flex-1 py-2 px-3 bg-[#0B1325] hover:bg-[#1E293B] text-white text-xs font-bold rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Talk for FREE</span>
                </button>

                <button
                  onClick={() => handleWhatsApp(adv)}
                  className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded transition-colors"
                  title="WhatsApp Advocate"
                >
                  <MessageCircle className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setSelectedAdvocate(adv)}
                  className="p-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded text-xs font-medium"
                  title="View Full Credentials"
                >
                  Dossier
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Advocates Network Summary Banner */}
        <div className="mt-12 p-6 rounded-xl bg-[#0B1325] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Users className="w-4 h-4" />
              <span>Regional Panel: Senior Advocates & Trial Counsels</span>
            </div>
            <h4 className="font-cormorant text-2xl font-bold text-white">
              Need Court Representation in Any District of Haryana, UP, or Rajasthan?
            </h4>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              We maintain active chambers and panel advocates in all 22 districts of Haryana, all 75 districts of Uttar Pradesh, all 50 districts of Rajasthan, and the Supreme Court of India.
            </p>
          </div>

          <button
            onClick={() => onOpenFreeConsultation()}
            className="w-full md:w-auto px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-[#0B1325] font-bold text-xs rounded-lg transition-all shadow flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <Sparkles className="w-4 h-4 text-[#0B1325]" />
            <span>Connect with Local District Advocate (FREE)</span>
          </button>
        </div>

        {/* Advocate Dossier Modal */}
        {selectedAdvocate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full p-6 sm:p-8 border border-slate-200">
              <div className="flex items-start justify-between pb-4 border-b border-slate-200">
                <div>
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-widest block mb-1">
                    {selectedAdvocate.state} Chambers
                  </span>
                  <h3 className="font-cormorant text-3xl font-bold text-[#0B1325]">
                    {selectedAdvocate.name}
                  </h3>
                  <p className="text-xs text-slate-600 font-medium">
                    {selectedAdvocate.designation}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedAdvocate(null)}
                  className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-5 space-y-4 text-xs">
                <div>
                  <strong className="text-slate-900 block mb-1">Primary Court & Benches:</strong>
                  <span className="text-slate-700">{selectedAdvocate.primaryCourt}</span>
                </div>

                <div>
                  <strong className="text-slate-900 block mb-1">Legal Education & Credentials:</strong>
                  <span className="text-slate-700 flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-amber-700" />
                    <span>{selectedAdvocate.education}</span>
                  </span>
                </div>

                <div>
                  <strong className="text-slate-900 block mb-1">State Bar Council Enrollment:</strong>
                  <span className="text-slate-700 font-mono">{selectedAdvocate.barEnrollment}</span>
                </div>

                <div>
                  <strong className="text-slate-900 block mb-1.5">Practice Disciplines:</strong>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedAdvocate.specialization.map((s, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-amber-50 text-amber-900 border border-amber-200 font-bold rounded">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 rounded border border-emerald-200 text-emerald-900 font-semibold flex items-center justify-between">
                  <span>Available for 100% Free Initial Telephonic Consultation</span>
                  <span className="text-xs bg-emerald-600 text-white px-2 py-0.5 rounded">FREE</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  onClick={() => setSelectedAdvocate(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 rounded"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const adv = selectedAdvocate;
                    setSelectedAdvocate(null);
                    onOpenFreeConsultation(undefined, adv.state, adv.name);
                  }}
                  className="px-5 py-2 text-xs font-bold text-white bg-[#0B1325] hover:bg-[#1E293B] rounded shadow flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Call {selectedAdvocate.name.split(' ')[1]} Sir (FREE)</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

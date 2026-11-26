import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Phone, 
  MessageCircle, 
  Lock, 
  FileText,
  MapPin,
  RefreshCw
} from 'lucide-react';
import { STATE_HUBS, NETWORK_ADVOCATES, FIRM_INFO } from '../data/legalData';

interface BailAndCaseEvaluatorProps {
  onOpenFreeConsultation: (category?: string, state?: string) => void;
}

export const BailAndCaseEvaluator: React.FC<BailAndCaseEvaluatorProps> = ({ onOpenFreeConsultation }) => {
  const [state, setState] = useState('Haryana');
  const [matterType, setMatterType] = useState('anticipatory-bail');
  const [firStatus, setFirStatus] = useState('fir-threat');
  const [courtLevel, setCourtLevel] = useState('sessions');
  const [clientPhone, setClientPhone] = useState('');
  const [caseBrief, setCaseBrief] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [result, setResult] = useState<{
    urgency: string;
    bailGrounds: string[];
    recommendedCourt: string;
    assignedAdvocate: typeof NETWORK_ADVOCATES[0];
    adviceNote: string;
  } | null>(null);

  const handleEvaluate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEvaluating(true);

    setTimeout(() => {
      let matchedAdv = NETWORK_ADVOCATES[0]; // Haryana
      if (state === 'Uttar Pradesh') matchedAdv = NETWORK_ADVOCATES[1];
      else if (state === 'Rajasthan') matchedAdv = NETWORK_ADVOCATES[2];
      else if (state === 'Delhi NCR') matchedAdv = NETWORK_ADVOCATES[3];

      let urgency = "High Priority - Immediate Court Notice Required";
      let recommendedCourt = "Sessions Court & High Court";
      let grounds = [
        "Absence of custodial interrogation requirement",
        "False implication arising from civil/commercial or matrimonial friction",
        "Deep roots in society with zero flight risk or tampering possibility",
      ];
      let adviceNote = `In ${state}, our senior advocate team can draft urgent petition and move for interim protection against arrest within 24 hours.`;

      if (matterType === 'anticipatory-bail') {
        urgency = "Emergency: Pre-Arrest Protection Required";
        recommendedCourt = state === 'Haryana' ? "District Sessions Court & P&H High Court Chandigarh" : state === 'Uttar Pradesh' ? "Sessions Court & Allahabad High Court" : "Sessions Court & Rajasthan High Court Jaipur/Jodhpur";
        grounds = [
          "Cooperation with Police Investigation under Section 438 CrPC / 482 BNSS",
          "Interim stay of arrest during pendency of Notice of Motion",
          "Protection of personal liberty under Article 21 of the Constitution",
        ];
        adviceNote = "Do not wait for police raid. Moving anticipatory bail establishes bona fide cooperation before the court.";
      } else if (matterType === 'property-dispute') {
        urgency = "Urgent: Injunction & Title Declaration Needed";
        recommendedCourt = state === 'Haryana' ? "SDM / Civil Judge Senior Division (Haryana Land Revenue Act)" : state === 'Uttar Pradesh' ? "SDO Court under UP Revenue Code 2006" : "Assistant Collector under Rajasthan Tenancy Act";
        grounds = [
          "Status-quo / Stay order against third-party sale or registry",
          "Partition of co-tenancy by metes and bounds",
          "Revenue record correction in official Jamabandi / Khatauni",
        ];
      }

      setResult({
        urgency,
        bailGrounds: grounds,
        recommendedCourt,
        assignedAdvocate: matchedAdv,
        adviceNote,
      });

      setIsEvaluating(false);
    }, 600);
  };

  const handleWhatsAppLead = () => {
    const text = encodeURIComponent(`Namaste Adv. ${result?.assignedAdvocate.name}, I used the Bail & Case Checker on puniaassociates.site for my matter in ${state} (${matterType}). My phone is ${clientPhone}. Please provide FREE consultation.`);
    window.open(`https://wa.me/${FIRM_INFO.whatsappNumber.replace('+', '')}?text=${text}`, '_blank');
  };

  return (
    <section id="bail-evaluator" className="py-20 bg-[#FAF9F7] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2 border border-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-800" />
            <span>2-Minute Free Legal & Bail Screener</span>
          </div>
          <h2 className="font-cormorant text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1325]">
            Instant Case & Bail Feasibility Checker
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Analyze your case parameters according to High Court guidelines in Haryana, UP, and Rajasthan. Get instant procedural strategy and senior advocate assignment for 100% FREE.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-4xl mx-auto overflow-hidden">
          {/* Header Strip */}
          <div className="bg-[#0B1325] text-white px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span className="font-semibold text-slate-200">
                100% Confidential • Privileged Advocate Review • Zero Fee
              </span>
            </div>
            <span className="text-amber-300 font-bold">Official Portal: puniaassociates.site</span>
          </div>

          <div className="p-6 sm:p-10">
            {!result ? (
              <form onSubmit={handleEvaluate} className="space-y-6">
                {/* 1. Select State */}
                <div>
                  <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                    1. Select Jurisdiction / State
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {['Haryana', 'Uttar Pradesh', 'Rajasthan', 'Delhi NCR'].map((st) => (
                      <button
                        type="button"
                        key={st}
                        onClick={() => setState(st)}
                        className={`p-3 text-xs font-bold rounded-lg border text-center transition-all cursor-pointer ${
                          state === st
                            ? 'bg-[#0B1325] text-white border-[#0B1325] shadow-md'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Select Matter Category */}
                <div>
                  <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                    2. Legal Matter Category
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      { id: 'anticipatory-bail', label: 'Anticipatory Bail (अग्रिम जमानत)' },
                      { id: 'regular-bail', label: 'Regular Bail (जमानत याचिका)' },
                      { id: 'criminal-trial', label: 'Criminal Defense / FIR Quashing' },
                      { id: 'property-dispute', label: 'Land Revenue & Property (जमीन विवाद)' },
                      { id: 'matrimonial-498a', label: '498A Dowry & Divorce (पारिवारिक)' },
                      { id: 'contracts-cheque', label: 'Contract Breach & Cheque 138' },
                    ].map((item) => (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => setMatterType(item.id)}
                        className={`p-3 text-xs font-semibold rounded-lg text-left border transition-all cursor-pointer ${
                          matterType === item.id
                            ? 'bg-amber-500/15 border-amber-600 text-amber-950 font-bold'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. FIR / Police Status & Court Level */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                      3. Present Status of Dispute
                    </label>
                    <select
                      value={firStatus}
                      onChange={(e) => setFirStatus(e.target.value)}
                      className="w-full text-xs p-3 border border-slate-300 rounded-lg bg-white font-medium"
                    >
                      <option value="fir-threat">Apprehending False FIR / Police Threat</option>
                      <option value="fir-lodged">FIR Already Lodged in Police Station</option>
                      <option value="custody">Accused in Police Custody / Jail</option>
                      <option value="civil-notice">Legal Notice / Demand Notice Received</option>
                      <option value="registry-fraud">Illegal Land Possession / Registry Fraud</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                      4. Target Court Forum
                    </label>
                    <select
                      value={courtLevel}
                      onChange={(e) => setCourtLevel(e.target.value)}
                      className="w-full text-xs p-3 border border-slate-300 rounded-lg bg-white font-medium"
                    >
                      <option value="sessions">District & Sessions Court (Local District)</option>
                      <option value="high-court">Hon'ble High Court (P&H / Allahabad / Rajasthan)</option>
                      <option value="supreme-court">Supreme Court of India (SLP / Transfer)</option>
                      <option value="revenue-court">Revenue Court (Tehsildar / SDO / Board of Revenue)</option>
                    </select>
                  </div>
                </div>

                {/* Phone & Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                      Your Contact Number (For Free Advice Call) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 XXXXX"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full text-xs p-3 border border-slate-300 rounded-lg font-medium focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                      Brief Case Summary / Sections (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Police Station Gurugram, FIR Sec 420..."
                      value={caseBrief}
                      onChange={(e) => setCaseBrief(e.target.value)}
                      className="w-full text-xs p-3 border border-slate-300 rounded-lg font-medium focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isEvaluating}
                  className="w-full py-4 bg-[#0B1325] hover:bg-[#1E293B] text-white font-bold text-sm rounded-lg shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isEvaluating ? (
                    <>
                      <RefreshCw className="w-4 h-4 text-amber-400 animate-spin" />
                      <span>Checking High Court Parameters for {state}...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>Generate Free Case & Bail Strategy</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              /* Results View */
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider bg-rose-700 text-white px-2.5 py-0.5 rounded">
                      {result.urgency}
                    </span>
                    <h4 className="font-cormorant text-2xl font-bold text-[#0B1325] mt-1.5">
                      Immediate Advocacy Plan for {state}
                    </h4>
                    <p className="text-xs text-amber-950 font-medium mt-0.5">
                      {result.adviceNote}
                    </p>
                  </div>
                  <button
                    onClick={() => setResult(null)}
                    className="text-xs text-slate-600 hover:text-slate-900 underline font-semibold self-end sm:self-center cursor-pointer"
                  >
                    Check Another Case
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Lead Advocate Card */}
                  <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                        Assigned State Lead Advocate
                      </span>
                      <h4 className="font-cormorant text-2xl font-bold text-[#0B1325]">
                        {result.assignedAdvocate.name}
                      </h4>
                      <p className="text-xs text-amber-800 font-semibold mb-1">
                        {result.assignedAdvocate.designation}
                      </p>
                      <p className="text-xs text-slate-600 mb-3">
                        {result.assignedAdvocate.primaryCourt} • {result.assignedAdvocate.experienceYears} Years Experience
                      </p>
                      <div className="text-[11px] text-slate-700 bg-white p-2.5 rounded border border-slate-200">
                        <strong>Enrollment:</strong> {result.assignedAdvocate.barEnrollment}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200 flex items-center gap-2">
                      <button
                        onClick={handleWhatsAppLead}
                        className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp Counsel (Free)</span>
                      </button>
                      <a
                        href={`tel:${result.assignedAdvocate.phone}`}
                        className="p-2 bg-[#0B1325] text-amber-400 rounded hover:bg-slate-800"
                        title="Call Advocate"
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Legal Ground Checklist */}
                  <div className="p-5 rounded-xl border border-slate-200 bg-white">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                      Key Court Petition Grounds
                    </span>
                    <ul className="space-y-2 mb-4">
                      {result.bailGrounds.map((gr, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-800 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{gr}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-3 border-t border-slate-100 text-xs">
                      <span className="text-slate-500 block">Recommended Listing Forum:</span>
                      <strong className="text-slate-900 font-semibold">{result.recommendedCourt}</strong>
                    </div>
                  </div>
                </div>

                {/* Final Call to Action */}
                <div className="p-5 rounded-xl bg-[#0B1325] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="font-cormorant text-2xl font-bold text-white mb-0.5">
                      Speak Directly with {result.assignedAdvocate.name.split(' ')[1]} Sir
                    </h4>
                    <p className="text-xs text-slate-300">
                      100% Free Consultation. No professional charges for preliminary advice.
                    </p>
                  </div>
                  <button
                    onClick={() => onOpenFreeConsultation(matterType, state)}
                    className="w-full sm:w-auto px-6 py-3 bg-amber-500 hover:bg-amber-400 text-[#0B1325] font-bold text-xs rounded-lg transition-all shadow flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-[#0B1325]" />
                    <span>Book Confirmed Free Advice Call</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

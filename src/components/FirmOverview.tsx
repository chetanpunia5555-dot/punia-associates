import React from 'react';
import { 
  Scale, 
  ShieldCheck, 
  Award, 
  Users, 
  Building2, 
  PhoneCall, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  FileText, 
  Gavel, 
  MessageCircle,
  HelpCircle,
  Briefcase
} from 'lucide-react';
import { FIRM_INFO } from '../data/legalData';

interface FirmOverviewProps {
  onOpenFreeConsultation: (category?: string, state?: string) => void;
}

export const FirmOverview: React.FC<FirmOverviewProps> = ({ onOpenFreeConsultation }) => {
  return (
    <section id="firm-overview" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section 1: Who Punia Associates Is */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2 border border-amber-300">
              <Scale className="w-3.5 h-3.5 text-amber-800" />
              <span>Firm Overview & Legal Heritage</span>
            </div>
            <h2 className="font-cormorant text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1325]">
              Who Punia Associates Is – Law Firm & Advocates in India
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              Punia Associates is an esteemed law firm and dedicated advocates network providing comprehensive legal consultation, trial litigation, and appellate representation across India.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5 text-slate-700 leading-relaxed">
              <p className="text-base sm:text-lg">
                Founded with a commitment to accessible justice and formidable courtroom representation, <strong className="text-slate-900 font-bold">Punia Associates</strong> brings together experienced <strong className="text-slate-900 font-bold">Senior Advocates and Legal Consultants</strong> with more than <strong className="text-slate-900 font-bold">20 years of continuous trial and appellate practice</strong>.
              </p>
              <p className="text-sm sm:text-base text-slate-600">
                Our legal practice serves individuals, families, agricultural landholders, and business corporations across the High Courts, District Sessions Courts, and Specialized Tribunals of Northern India and the Supreme Court of India. With permanent legal chambers in Gurugram, Noida, Jaipur, and New Delhi, our advocates combine deep institutional familiarity with the latest constitutional and procedural jurisprudence.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
                <div className="p-4 rounded-xl bg-[#FAF9F7] border border-slate-200">
                  <h3 className="font-cormorant text-xl font-bold text-[#0B1325] mb-1.5 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0" />
                    <span>Ethical & Fearless Advocacy</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Upholding the strictest standards of legal ethics, client confidentiality, and proactive court representation under the Bar Council of India guidelines.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF9F7] border border-slate-200">
                  <h3 className="font-cormorant text-xl font-bold text-[#0B1325] mb-1.5 flex items-center gap-2">
                    <Users className="w-5 h-5 text-emerald-700 shrink-0" />
                    <span>Multi-District Advocate Network</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Vetted trial specialists physically present across district court complexes and High Court benches, offering seamless coordination for multi-district matters.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-[#0B1325] rounded-2xl p-7 text-white shadow-xl border border-slate-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
                  <span className="text-xs uppercase font-bold tracking-widest text-amber-300">Firm Credentials</span>
                  <span className="text-xs text-slate-400 font-mono">puniaassociates.site</span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-white">Full-Spectrum Representation</h4>
                      <p className="text-xs text-slate-300">From District Magistrate Courts to the Supreme Court of India.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-white">24-Hour Emergency Legal Mobilization</h4>
                      <p className="text-xs text-slate-300">Rapid anticipatory bail drafting and urgent High Court stay petitions.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-white">100% Free Initial Legal Consultation</h4>
                      <p className="text-xs text-slate-300">Know your legal rights, statutory sections, and court recourse at zero upfront charge.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-white">Multi-Jurisdictional Cross-Border Practice</h4>
                      <p className="text-xs text-slate-300">Unified handling of inter-state FIRs, property disputes, and commercial claims.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => onOpenFreeConsultation()}
                    className="w-full py-3 px-4 rounded-lg bg-amber-500 hover:bg-amber-400 text-[#0B1325] text-xs font-bold transition-all text-center flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Request Free Legal Case Review</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Why Clients Should Contact Punia Associates */}
        <div className="mb-20 pt-16 border-t border-slate-200">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-300">
              <Award className="w-3.5 h-3.5 text-emerald-800" />
              <span>Proven Trial Advantage</span>
            </div>
            <h3 className="font-cormorant text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1325]">
              Why Clients Choose Punia Associates
            </h3>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              When liberty, property, family stability, or commercial investments are on the line, selecting experienced legal representation is critical. Here is why clients across India trust our counsel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-[#FAF9F7] border border-slate-200 hover:border-amber-400 hover:shadow-lg transition-all">
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
                <Gavel className="w-5 h-5" />
              </div>
              <h4 className="font-cormorant text-xl font-bold text-[#0B1325] mb-2">
                20+ Years Trial Experience
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our advocates have extensive trial experience before District Sessions Judges, Special CBI/PMLA Courts, High Court Division Benches, and the Supreme Court of India.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#FAF9F7] border border-slate-200 hover:border-amber-400 hover:shadow-lg transition-all">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h4 className="font-cormorant text-xl font-bold text-[#0B1325] mb-2">
                100% Free Initial Assessment
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                We believe every citizen deserves candid legal counsel. Speak directly with a practicing advocate to understand the merits of your case with zero initial consultation charges.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#FAF9F7] border border-slate-200 hover:border-amber-400 hover:shadow-lg transition-all">
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="font-cormorant text-xl font-bold text-[#0B1325] mb-2">
                Urgent 24/7 Bail Mobilization
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Emergency pre-arrest and regular bail petitions require immediate action. Our dedicated criminal defense desk prepares and files urgent bail applications within 24 hours.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#FAF9F7] border border-slate-200 hover:border-amber-400 hover:shadow-lg transition-all">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
                <Building2 className="w-5 h-5" />
              </div>
              <h4 className="font-cormorant text-xl font-bold text-[#0B1325] mb-2">
                Deep Local Court Standing
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Because local procedures, court traditions, and land revenue rules differ by state, our advocates possess direct local bar standing in Haryana, UP, Rajasthan, and Delhi NCR.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#FAF9F7] border border-slate-200 hover:border-amber-400 hover:shadow-lg transition-all">
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="font-cormorant text-xl font-bold text-[#0B1325] mb-2">
                Transparent Milestone Retainers
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                No hidden costs or surprise billings. Our engagements are defined by written milestone retainers corresponding to bail arguments, trial framing, witness cross-examination, and final order.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#FAF9F7] border border-slate-200 hover:border-amber-400 hover:shadow-lg transition-all">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-cormorant text-xl font-bold text-[#0B1325] mb-2">
                Proven Track Record of Relief
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Over 15,000+ matters successfully handled, including landmark bail grants, commercial arbitration awards, quashing of false criminal FIRs, and prompt RERA refunds.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Legal Services Offered & Practice Areas Summary */}
        <div className="mb-20 pt-16 border-t border-slate-200">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2 border border-amber-300">
              <Briefcase className="w-3.5 h-3.5 text-amber-800" />
              <span>Full-Service Practice</span>
            </div>
            <h3 className="font-cormorant text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1325]">
              Legal Services Offered Across India
            </h3>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Our firm provides full-spectrum legal representation, advisory, and dispute resolution services tailored to individual litigants, real estate investors, and corporate enterprises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-xl border border-slate-200 bg-white">
              <h4 className="font-cormorant text-xl font-bold text-[#0B1325] mb-2">
                Bail & Criminal Defense
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Anticipatory Bail (Sec 438 CrPC / 482 BNSS), Regular Bail (Sec 437/439 CrPC), FIR Quashing under Section 482 CrPC, NDPS, IPC/BNS defense, and cross-examination.
              </p>
              <span className="text-[11px] font-bold text-amber-800 block">High Court & Sessions Courts</span>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white">
              <h4 className="font-cormorant text-xl font-bold text-[#0B1325] mb-2">
                Land, Revenue & Property
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Sanad Takseem agricultural partitions, mutation disputes, title declarations, registry cancellations, adverse possession, and Revenue Court appeals.
              </p>
              <span className="text-[11px] font-bold text-amber-800 block">Haryana, UP & Rajasthan Land Acts</span>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white">
              <h4 className="font-cormorant text-xl font-bold text-[#0B1325] mb-2">
                Contracts & Commercial
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Commercial contract drafting, breach of contract lawsuits, Section 9/11/34 Arbitration proceedings, shareholder disputes, and corporate advisory.
              </p>
              <span className="text-[11px] font-bold text-amber-800 block">Commercial Courts & Arbitration</span>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white">
              <h4 className="font-cormorant text-xl font-bold text-[#0B1325] mb-2">
                Matrimonial & Family Law
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Mutual consent and contested divorce, defense against 498A/Dowry Prohibition, Domestic Violence (DV Act), child custody, and maintenance (125 CrPC).
              </p>
              <span className="text-[11px] font-bold text-amber-800 block">Family Courts & High Courts</span>
            </div>
          </div>
        </div>

        {/* Section 4: Courts & Jurisdictions Actually Served */}
        <div className="mb-20 pt-16 border-t border-slate-200">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-300">
              <Building2 className="w-3.5 h-3.5 text-emerald-800" />
              <span>Jurisdictional Reach</span>
            </div>
            <h3 className="font-cormorant text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1325]">
              Courts and Jurisdictions Actually Served
            </h3>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Our advocates regularly appear before India's premier constitutional courts, regional High Courts, appellate tribunals, and district sessions courts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-[#FAF9F7] border border-slate-200">
              <h4 className="font-cormorant text-2xl font-bold text-[#0B1325] mb-2">
                Supreme Court of India
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Special Leave Petitions (SLPs), Transfer Petitions (Civil & Criminal), Writ Petitions under Article 32, and statutory civil and criminal appeals before the Apex Court in New Delhi.
              </p>
              <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded inline-block border border-emerald-200">
                Supreme Court Bar Chambers
              </span>
            </div>

            <div className="p-6 rounded-xl bg-[#FAF9F7] border border-slate-200">
              <h4 className="font-cormorant text-2xl font-bold text-[#0B1325] mb-2">
                High Courts of North India
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Regular daily appearance before:
              </p>
              <ul className="text-xs text-slate-700 space-y-1 mb-3 list-disc list-inside">
                <li><strong>Punjab & Haryana High Court</strong> (Chandigarh)</li>
                <li><strong>Allahabad High Court</strong> (Prayagraj & Lucknow Bench)</li>
                <li><strong>Rajasthan High Court</strong> (Jaipur Bench & Jodhpur Seat)</li>
                <li><strong>Delhi High Court</strong> (Sher Shah Road, New Delhi)</li>
              </ul>
              <span className="text-xs text-amber-800 font-bold bg-amber-50 px-2.5 py-1 rounded inline-block border border-amber-200">
                Article 226/227 Writs & Bails
              </span>
            </div>

            <div className="p-6 rounded-xl bg-[#FAF9F7] border border-slate-200">
              <h4 className="font-cormorant text-2xl font-bold text-[#0B1325] mb-2">
                District Courts & Tribunals
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Active daily presence in major district sessions bars and specialized regulatory tribunals:
              </p>
              <ul className="text-xs text-slate-700 space-y-1 mb-3 list-disc list-inside">
                <li><strong>Haryana:</strong> Gurugram, Faridabad, Rohtak, Hisar, Karnal, Sonipat</li>
                <li><strong>Uttar Pradesh:</strong> Gautam Buddha Nagar (Noida), Ghaziabad, Meerut, Lucknow</li>
                <li><strong>Rajasthan:</strong> Jaipur District Court, Alwar, Jodhpur, Kota</li>
                <li><strong>Tribunals:</strong> HRERA, UP RERA, Raj RERA, NCLT, NGT & DRT</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 5: How Clients Can Contact Punia Associates */}
        <div className="pt-16 border-t border-slate-200">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2 border border-amber-300">
              <PhoneCall className="w-3.5 h-3.5 text-amber-800" />
              <span>Fast & Confidential Consultation</span>
            </div>
            <h3 className="font-cormorant text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1325]">
              How Clients Can Contact the Firm
            </h3>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Engaging an advocate at Punia Associates is simple, transparent, and prompt. Choose any of our 3 straightforward contact methods:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-[#FAF9F7] border border-slate-200 flex flex-col justify-between">
              <div>
                <span className="w-8 h-8 rounded-full bg-[#0B1325] text-white flex items-center justify-center font-bold text-sm mb-4">
                  1
                </span>
                <h4 className="font-cormorant text-xl font-bold text-[#0B1325] mb-2">
                  Instant Telephone & WhatsApp
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Call our emergency advocate helpline for immediate consultation or send case documents on WhatsApp for preliminary legal assessment.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200 space-y-2">
                <a 
                  href={`tel:${FIRM_INFO.helplinePhone}`}
                  className="flex items-center gap-2 text-xs font-bold text-slate-900 hover:text-amber-700"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-600" />
                  <span>Helpline 1: {FIRM_INFO.helplinePhone}</span>
                </a>
                <a 
                  href={`tel:${FIRM_INFO.secondaryPhone}`}
                  className="flex items-center gap-2 text-xs font-bold text-slate-900 hover:text-amber-700"
                >
                  <PhoneCall className="w-4 h-4 text-amber-600" />
                  <span>Helpline 2: {FIRM_INFO.secondaryPhone}</span>
                </a>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-[#FAF9F7] border border-slate-200 flex flex-col justify-between">
              <div>
                <span className="w-8 h-8 rounded-full bg-[#0B1325] text-white flex items-center justify-center font-bold text-sm mb-4">
                  2
                </span>
                <h4 className="font-cormorant text-xl font-bold text-[#0B1325] mb-2">
                  Online Confidential Case Screener
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Use our 2-minute online case evaluator to submit your matter details, FIR status, and court level. Our senior advocate will call back with procedural advice within 30 minutes.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200">
                <button
                  onClick={() => onOpenFreeConsultation()}
                  className="w-full py-2.5 px-3 rounded-lg bg-[#0B1325] hover:bg-slate-800 text-white text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Book Free Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                </button>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-[#FAF9F7] border border-slate-200 flex flex-col justify-between">
              <div>
                <span className="w-8 h-8 rounded-full bg-[#0B1325] text-white flex items-center justify-center font-bold text-sm mb-4">
                  3
                </span>
                <h4 className="font-cormorant text-xl font-bold text-[#0B1325] mb-2">
                  Chamber & Court Visit
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Meet our advocates in person at our chambers adjacent to District Courts in Gurugram, Greater Noida (Surajpur), Jaipur High Court Circle, or the Supreme Court of India.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200">
                <a
                  href="#offices-section"
                  className="w-full py-2.5 px-3 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition-all text-center block"
                >
                  View Chamber Addresses & Hours
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

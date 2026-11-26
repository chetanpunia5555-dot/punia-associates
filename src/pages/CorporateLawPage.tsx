import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building, 
  FileCheck, 
  Scale, 
  Briefcase, 
  CheckCircle2, 
  PhoneCall, 
  ArrowRight, 
  ChevronDown, 
  Sparkles,
  ShieldCheck,
  Landmark
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { FIRM_INFO } from '../data/legalData';

interface CorporateLawPageProps {
  onOpenConsultation: (category?: string, state?: string) => void;
}

export const CorporateLawPage: React.FC<CorporateLawPageProps> = ({ onOpenConsultation }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const corporateFaqs = [
    {
      q: "What is the procedure under the Commercial Courts Act 2015 for business disputes?",
      a: "The Commercial Courts Act establishes dedicated benches for commercial disputes with specified values. It requires mandatory pre-institution mediation and settlement (PIMS) under Section 12A unless urgent interim relief is prayed for. Strict procedural timelines apply for filing written statements and case management hearings."
    },
    {
      q: "How does domestic arbitration operate under the Arbitration and Conciliation Act 1996?",
      a: "When an agreement contains an arbitration clause, a party can invoke Section 9 for interim measures of protection before court, Section 11 for appointment of an independent arbitrator, and proceed to arbitration hearings. The arbitral award has the force of a civil decree under Section 36."
    },
    {
      q: "What remedies exist against dishonoured commercial cheques under Section 138 of the NI Act?",
      a: "The payee must issue a statutory demand notice within 30 days of receiving the bank memo. If the drawer fails to make payment within 15 days of receiving the notice, a criminal complaint must be filed before the Judicial Magistrate within one month."
    },
    {
      q: "What is corporate insolvency resolution before the NCLT under the IBC 2016?",
      a: "Under the Insolvency and Bankruptcy Code, operational creditors (Section 9) or financial creditors (Section 7) can initiate Corporate Insolvency Resolution Process (CIRP) against a corporate debtor who has defaulted on payments exceeding the statutory threshold (currently ₹1 Crore)."
    }
  ];

  return (
    <>
      <SEOHead
        title="Corporate & Commercial Lawyers | Punia Associates"
        description="Punia Associates provides legal assistance for businesses and commercial matters, including contracts, disputes and corporate legal requirements."
        canonicalPath="/corporate-law"
        schemaData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Corporate & Commercial Law",
          "url": "https://puniaassociates.site/corporate-law",
          "description": "Punia Associates provides legal assistance for businesses and commercial matters, including contracts, disputes and corporate legal requirements.",
          "provider": {
            "@type": "LegalService",
            "name": "Punia Associates",
            "url": "https://puniaassociates.site/",
            "telephone": "+91-9053281218"
          }
        }}
      />

      <Breadcrumbs items={[
        { name: 'Practice Areas', url: '/practice-areas' },
        { name: 'Corporate & Commercial Law', url: '/corporate-law' }
      ]} />

      <main className="bg-[#F8F9FA] text-[#1E293B]">
        {/* Header Hero */}
        <section className="bg-[#0B1325] text-white py-16 sm:py-20 border-b border-slate-800 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30 tracking-wide uppercase font-mono mb-4">
                Commercial Dispute Resolution & Corporate Advocacy
              </span>
              <h1 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
                Corporate & Commercial Law
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
                Punia Associates delivers strategic legal counsel for enterprises, partnerships, founders, and commercial entities across northern India, handling commercial contracts, dispute arbitration, debt recovery, and NCLT insolvency proceedings.
              </p>
            </div>
          </div>
        </section>

        {/* Practice Scope */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-md border border-amber-200">
                <Building className="w-3.5 h-3.5" />
                Commercial Practice Scope
              </div>
              <h2 className="font-cormorant text-3xl sm:text-4xl font-bold text-[#0B1325]">
                Commercial Litigation & Corporate Dispute Resolution
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Commercial disputes demand rapid tactical intervention to prevent asset dissipation, recover receivables, and preserve ongoing business operations. Our commercial advocates represent corporate clients in:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-base text-[#0B1325] mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    <span>Commercial Contract Litigation</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Representation before Commercial Courts in Gurugram, Noida, Jaipur, and Delhi under the Commercial Courts Act 2015 for breach of contracts, non-compete violations, and damages.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-base text-[#0B1325] mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    <span>Arbitration & Conciliation</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Invocation of domestic arbitration, applications under Section 9 (interim measures), Section 11 (appointment of arbitrators), and Section 34 (challenging arbitral awards) in High Courts.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-base text-[#0B1325] mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    <span>Insolvency & Bankruptcy (NCLT / IBC)</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Filing and defending corporate insolvency resolution petitions under Sections 7 and 9 of the IBC 2016 before the National Company Law Tribunal (NCLT) and NCLAT New Delhi.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-base text-[#0B1325] mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    <span>Section 138 NI Act Recovery</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Serving mandatory statutory demand notices and initiating criminal cheque dishonour proceedings to recover trade dues, loan payments, and institutional commercial credit.
                  </p>
                </div>

                <Link to="/international-arbitration" className="p-5 bg-amber-50/60 hover:bg-amber-50 rounded-xl border border-amber-300 shadow-sm transition-all block group">
                  <h3 className="font-bold text-base text-[#0B1325] mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-700" />
                      <span>International Commercial Arbitration</span>
                    </span>
                    <ArrowRight className="w-4 h-4 text-amber-700 group-hover:translate-x-0.5 transition-transform" />
                  </h3>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    SIAC, ICC, LCIA, DIAC & UNCITRAL cross-border arbitrations, Emergency Arbitrator reliefs, and Part II New York Convention Foreign Award enforcement in India.
                  </p>
                </Link>

                <Link to="/mergers-acquisitions" className="p-5 bg-emerald-50/60 hover:bg-emerald-50 rounded-xl border border-emerald-300 shadow-sm transition-all block group">
                  <h3 className="font-bold text-base text-[#0B1325] mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      <span>Mergers & Acquisitions (M&A) & PE</span>
                    </span>
                    <ArrowRight className="w-4 h-4 text-emerald-700 group-hover:translate-x-0.5 transition-transform" />
                  </h3>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    NCLT Schemes (Sec 230–234), Cross-Border FEMA Mergers, Share & Slump Sale Agreements (SPA/BTA), Legal Due Diligence, CCI combinations & IBC distressed M&A.
                  </p>
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 bg-white p-6 rounded-xl border border-slate-200 shadow-md">
              <h3 className="font-cormorant text-2xl font-bold text-[#0B1325] mb-2">
                Corporate Legal Desk
              </h3>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                Discuss a commercial breach, pending contract dispute, or arbitration filing with our corporate litigation counsel.
              </p>

              <div className="space-y-3 mb-6 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-600">Corporate Helplines:</span>
                  <a href={`tel:${FIRM_INFO.helplinePhone}`} className="font-bold text-amber-600">{FIRM_INFO.helplinePhone}</a>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-600">Arbitration / NCLT:</span>
                  <a href={`tel:${FIRM_INFO.secondaryPhone}`} className="font-bold text-amber-600">{FIRM_INFO.secondaryPhone}</a>
                </div>
              </div>

              <button
                onClick={() => onOpenConsultation('Corporate Law')}
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-[#0B1325] text-xs font-bold rounded-lg transition-colors shadow flex items-center justify-center gap-2 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Consult Commercial Counsel</span>
              </button>

              <div className="mt-4 pt-4 border-t border-slate-100 text-[11px] text-slate-400 text-center">
                Confidentiality and non-disclosure protocols apply to all enterprise briefings.
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Commercial Dispute Stages */}
        <section className="py-16 bg-slate-100 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-3 py-1 rounded-md">
                Dispute Lifecycle
              </span>
              <h2 className="font-cormorant text-3xl sm:text-4xl font-bold text-[#0B1325] mt-3">
                Stages of Commercial Dispute Resolution
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                A structured roadmap from statutory demand to judicial execution or arbitral award enforcement.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Phase 1</span>
                <h3 className="font-bold text-base text-[#0B1325] mt-3 mb-2">Contract Review & Legal Notice</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Scrutinizing dispute clauses, governing law, and issuing formal statutory notice of default or cure period demand.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Phase 2</span>
                <h3 className="font-bold text-base text-[#0B1325] mt-3 mb-2">Pre-Litigation Mediation</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Participating in mandatory Section 12A mediation or consensual executive negotiations to explore commercial settlement.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Phase 3</span>
                <h3 className="font-bold text-base text-[#0B1325] mt-3 mb-2">Court or Tribunal Action</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Moving interim protection in Commercial Court or commencing arbitral proceedings with statement of claim.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Phase 4</span>
                <h3 className="font-bold text-base text-[#0B1325] mt-3 mb-2">Decree Realization & Asset Recovery</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Enforcing arbitral awards or commercial decrees through court attachment, garnishment, and execution orders.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: FAQs */}
        <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-md border border-amber-200">
              Frequently Asked Questions
            </span>
            <h2 className="font-cormorant text-3xl sm:text-4xl font-bold text-[#0B1325] mt-3">
              Corporate & Commercial Inquiries
            </h2>
          </div>

          <div className="space-y-4">
            {corporateFaqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 text-left font-bold text-sm text-[#0B1325] flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${openFaq === index ? 'rotate-180 text-amber-600' : ''}`} />
                </button>
                {openFaq === index && (
                  <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Global CTA */}
        <section className="bg-gradient-to-r from-[#0B1325] via-[#111c38] to-[#0B1325] text-white py-16 border-t border-slate-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30 tracking-wide uppercase font-mono mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Corporate Consultation
            </span>
            <h2 className="font-cormorant text-3xl sm:text-4xl font-bold mb-4">
              Protect Your Enterprise Interests with Expert Legal Counsel
            </h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto mb-8 font-light">
              Connect with our corporate and commercial litigation team for an objective appraisal of your business dispute or contractual risk.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onOpenConsultation('Corporate Law')}
                className="w-full sm:w-auto px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-[#0B1325] font-bold text-sm rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-[#0B1325]" />
                <span>Consult Corporate Counsel</span>
              </button>
              <Link
                to="/practice-areas"
                className="w-full sm:w-auto px-8 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm rounded-lg border border-slate-700 transition-colors text-center"
              >
                Explore Other Practice Areas
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Globe2, 
  Scale, 
  ShieldCheck, 
  Gavel, 
  FileText, 
  CheckCircle2, 
  PhoneCall, 
  ArrowRight, 
  ChevronDown, 
  Sparkles, 
  Landmark,
  BookOpen,
  Download
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { FIRM_INFO } from '../data/legalData';

interface InternationalArbitrationPageProps {
  onOpenConsultation: (category?: string, state?: string) => void;
}

const INSTITUTIONAL_FORUMS = [
  {
    code: 'SIAC',
    name: 'Singapore International Arbitration Centre',
    seat: 'Singapore / India-Seated',
    highlights: [
      'Schedule 1 Emergency Arbitrator enforcement under Section 17(2) (Amazon v. Future Retail, 2021 INSC 384)',
      'Expedited Procedure (Rule 5) for cross-border commercial claims up to SGD 10 Million',
      'Early Dismissal of unmeritorious claims and joinder of non-signatory corporate affiliates'
    ]
  },
  {
    code: 'ICC',
    name: 'International Chamber of Commerce (Paris / Global)',
    seat: 'Paris / London / Singapore / Geneva',
    highlights: [
      'Infrastructure, EPC construction, defense supply, and cross-border joint venture disputes',
      'ICC Court scrutiny of draft arbitral awards ensuring New York Convention enforceability',
      'Emergency Arbitrator and Multi-Contract Consolidation provisions (Article 10)'
    ]
  },
  {
    code: 'LCIA',
    name: 'London Court of International Arbitration',
    seat: 'London / DIFC',
    highlights: [
      'Shareholders Agreements (SHA), M&A post-closing earn-out & indemnity disputes',
      'Private equity exit put-option & drag-along enforcement arbitrations',
      'Expedited tribunal formation (Article 9A) and summary determination powers'
    ]
  },
  {
    code: 'DIAC / MCIA / UNCITRAL',
    name: 'India Institutional & Ad-Hoc UNCITRAL Arbitrations',
    seat: 'New Delhi / Mumbai / GIFT City',
    highlights: [
      'Section 11(6) International Arbitrator appointment directly before the Supreme Court of India',
      'Delhi International Arbitration Centre (DIAC) & Mumbai Centre for International Arbitration (MCIA)',
      'UNCITRAL Arbitration Rules for Bilateral Investment Treaty (BIT) & cross-border supply agreements'
    ]
  }
];

export const InternationalArbitrationPage: React.FC<InternationalArbitrationPageProps> = ({ onOpenConsultation }) => {
  const [activeForumIdx, setActiveForumIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'When does an arbitration qualify as an "International Commercial Arbitration" in India?',
      a: 'Under Section 2(1)(f) of the Arbitration and Conciliation Act, 1996, an arbitration is international commercial arbitration if at least one of the parties is an individual who is a national of or habitually resident outside India, a body corporate incorporated outside India, an association whose central management and control is exercised outside India, or the Government of a foreign country.'
    },
    {
      q: 'Can Indian Courts grant urgent asset-freeze injunctions for a foreign-seated arbitration (SIAC / ICC / LCIA)?',
      a: 'Yes. Under the proviso to Section 2(2) of the Arbitration and Conciliation Act, 1996, Section 9 (interim measures by Commercial High Courts) and Section 27 (court assistance in taking evidence) apply even to foreign-seated international arbitrations, unless the parties have expressly contracted out of Part I interim remedies.'
    },
    {
      q: 'How are Foreign Arbitral Awards enforced in India under Part II (New York Convention)?',
      a: 'An authenticated copy of the foreign award and arbitration agreement is filed before the jurisdictional Commercial High Court under Sections 47–49 of the Act. Once the Court is satisfied that no narrow Section 48 defence (incapacity, violation of natural justice, or contravention of Fundamental Policy of Indian Law) applies, the award becomes a binding executable decree of the High Court.'
    },
    {
      q: 'Can non-signatory parent or subsidiary companies be joined in an international arbitration?',
      a: 'Yes. The 5-Judge Constitution Bench of the Supreme Court in Cox and Kings Ltd. v. SAP India Pvt. Ltd. (2023 INSC 1051) upheld the Group of Companies Doctrine under Section 2(1)(h) read with Section 7, permitting joinder of non-signatories based on mutual intention evidenced by negotiation, performance, or composite transactions.'
    }
  ];

  const activeForum = INSTITUTIONAL_FORUMS[activeForumIdx];

  return (
    <>
      <SEOHead
        title="International Commercial Arbitration & Foreign Award Enforcement | Punia Associates"
        description="International commercial arbitration representation under SIAC, ICC, LCIA, DIAC, and UNCITRAL rules, Section 9 interim protection, Emergency Arbitrator enforcement, and Part II New York Convention awards in India."
        canonicalPath="/international-arbitration"
        schemaData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "International Commercial Arbitration & Cross-Border Dispute Resolution",
          "url": "https://puniaassociates.site/international-arbitration",
          "provider": {
            "@type": "LegalService",
            "name": "Punia Associates",
            "url": "https://puniaassociates.site/"
          }
        }}
      />

      <Breadcrumbs items={[
        { name: 'Practice Areas', url: '/practice-areas' },
        { name: 'Corporate & Commercial Law', url: '/corporate-law' },
        { name: 'International Arbitration', url: '/international-arbitration' }
      ]} />

      <main className="bg-[#F8F9FA] text-[#1E293B]">
        {/* Hero */}
        <section className="bg-[#0B1325] text-white py-16 sm:py-20 border-b border-slate-800 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30 tracking-wide uppercase font-mono mb-4">
                <Globe2 className="w-3.5 h-3.5" />
                Cross-Border Arbitration & New York Convention Practice
              </span>
              <h1 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
                International Arbitration & Cross-Border Disputes
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light mb-6">
                Strategic representation before international arbitral tribunals (SIAC, ICC, LCIA, HKIAC, DIAC, UNCITRAL) and Indian Commercial Courts & the Supreme Court of India for Section 9 asset-freeze injunctions, Section 11 arbitrator appointments, Emergency Arbitrator awards, and Part II Foreign Award Enforcement.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => onOpenConsultation('international-arbitration')}
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-[#0B1325] font-bold text-xs sm:text-sm rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Consult International Arbitration Desk</span>
                </button>
                <Link
                  to="/mergers-acquisitions"
                  className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm rounded-xl border border-slate-700 transition-colors flex items-center gap-2"
                >
                  <span>Explore Mergers & Acquisitions (M&A)</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Core Capabilities + Desk Card */}
        <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-md border border-amber-200">
                <Scale className="w-3.5 h-3.5" />
                <span>Statutory & Institutional Architecture</span>
              </div>
              <h2 className="font-cormorant text-3xl sm:text-4xl font-bold text-[#0B1325]">
                Full-Lifecycle Cross-Border Arbitral Representation
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-base text-[#0B1325] mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Foreign Award Enforcement (Part II)</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Execution of New York Convention & Geneva Convention foreign awards under Sections 44–52 before Commercial High Courts, overcoming public policy objections under Section 48 and executing against Indian assets.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-base text-[#0B1325] mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Section 9 Interim & Emergency Reliefs</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Urgent Mareva-style asset-freeze orders, bank guarantee restraint injunctions, and enforcing institutional Emergency Arbitrator orders (SIAC/ICC/LCIA) via Section 17(2) (Amazon v. Future Retail).
                  </p>
                </div>

                <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-base text-[#0B1325] mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Supreme Court Sec 11(6) & Anti-Suit</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Filing Section 11(6) & Section 11(9) petitions directly in the Supreme Court of India for appointment of sole/presiding international arbitrators, and resisting parallel multi-jurisdiction litigation.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-base text-[#0B1325] mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Joint Ventures, M&A & BIT Disputes</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Arbitrating post-M&A indemnity claims, SHA put/call option defaults, EPC infrastructure claims, sovereign infrastructure contracts, and Bilateral Investment Treaty (BIT / ISDS) notices.
                  </p>
                </div>
              </div>

              {/* Interactive Institutional Rules Explorer */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mt-6">
                <h3 className="font-cormorant text-2xl font-bold text-[#0B1325] mb-3">
                  Institutional Rules & Forums Supported
                </h3>
                <div className="flex flex-wrap gap-2 mb-5">
                  {INSTITUTIONAL_FORUMS.map((f, idx) => (
                    <button
                      key={f.code}
                      onClick={() => setActiveForumIdx(idx)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        activeForumIdx === idx
                          ? 'bg-[#0B1325] text-amber-400 shadow'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {f.code}
                    </button>
                  ))}
                </div>
                <div className="bg-slate-50 rounded-xl p-5 border border-slate-200/80 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="font-bold text-sm text-[#0B1325]">{activeForum.name}</h4>
                    <span className="text-[11px] font-mono bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded font-semibold">
                      Seat: {activeForum.seat}
                    </span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {activeForum.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md">
                <h3 className="font-cormorant text-2xl font-bold text-[#0B1325] mb-2">
                  International Arbitration Desk
                </h3>
                <p className="text-xs text-slate-500 mb-5 leading-relaxed">
                  Consult with our Supreme Court AOR & commercial arbitration partners on cross-border disputes, foreign award execution, or urgent Section 9 asset preservation.
                </p>
                <div className="space-y-2.5 mb-5 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                    <span className="text-slate-600">New Delhi / SC Desk:</span>
                    <a href={`tel:${FIRM_INFO.secondaryPhone}`} className="font-bold text-amber-700">{FIRM_INFO.secondaryPhone}</a>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                    <span className="text-slate-600">Commercial / NCR:</span>
                    <a href={`tel:${FIRM_INFO.helplinePhone}`} className="font-bold text-amber-700">{FIRM_INFO.helplinePhone}</a>
                  </div>
                </div>
                <button
                  onClick={() => onOpenConsultation('international-arbitration')}
                  className="w-full py-3 bg-[#0B1325] hover:bg-slate-800 text-amber-400 text-xs font-bold rounded-xl transition-colors shadow flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Gavel className="w-4 h-4" />
                  <span>Request Arbitration Appraisal</span>
                </button>
              </div>

              {/* Relevant Supreme Court Precedents & PDFs */}
              <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="font-cinzel text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>Verified Supreme Court Precedents</span>
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 space-y-1.5">
                    <span className="font-mono text-[10px] text-amber-300">2023 INSC 1051 (5-Judge Bench)</span>
                    <Link to="/judgments/sc-2023-cox-and-kings-arbitration" className="block font-bold hover:text-amber-300">
                      Cox and Kings Ltd. v. SAP India Pvt. Ltd.
                    </Link>
                    <a href="/judgments/govt-sourced/sc_2023_insc_1051_cox_and_kings_arbitration.pdf" download className="inline-flex items-center gap-1 text-[11px] text-emerald-400 hover:underline">
                      <Download className="w-3 h-3" /> Govt-Sourced PDF
                    </a>
                  </div>

                  <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 space-y-1.5">
                    <span className="font-mono text-[10px] text-amber-300">2021 INSC 384 (SIAC Emergency Award)</span>
                    <Link to="/judgments/sc-2021-amazon-future-retail-siac" className="block font-bold hover:text-amber-300">
                      Amazon.com v. Future Retail Ltd.
                    </Link>
                    <a href="/judgments/govt-sourced/sc_2021_insc_384_amazon_future_retail_siac.pdf" download className="inline-flex items-center gap-1 text-[11px] text-emerald-400 hover:underline">
                      <Download className="w-3 h-3" /> Govt-Sourced PDF
                    </a>
                  </div>

                  <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 space-y-1.5">
                    <span className="font-mono text-[10px] text-amber-300">2023 INSC 1066 (7-Judge Bench)</span>
                    <Link to="/judgments" className="block font-bold hover:text-amber-300">
                      In Re: Interplay Between Arbitration & Stamp Act
                    </Link>
                    <a href="/judgments/govt-sourced/sc_2023_insc_1066_arbitration_stamp_act.pdf" download className="inline-flex items-center gap-1 text-[11px] text-emerald-400 hover:underline">
                      <Download className="w-3 h-3" /> Govt-Sourced PDF
                    </a>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-14 bg-white border-t border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-md border border-amber-200">
                International Arbitration FAQs
              </span>
              <h2 className="font-cormorant text-3xl sm:text-4xl font-bold text-[#0B1325] mt-3">
                Cross-Border Dispute Resolution Questions
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full p-5 text-left font-bold text-sm text-[#0B1325] flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-100"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${openFaq === idx ? 'rotate-180 text-amber-600' : ''}`} />
                  </button>
                  {openFaq === idx && (
                    <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-200/80 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

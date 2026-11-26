import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  Building2, 
  CheckCircle2, 
  PhoneCall, 
  ArrowRight, 
  ChevronDown, 
  ShieldCheck, 
  FileCheck, 
  Scale, 
  Landmark,
  BookOpen,
  Download,
  Layers
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { FIRM_INFO } from '../data/legalData';

interface MergersAcquisitionsPageProps {
  onOpenConsultation: (category?: string, state?: string) => void;
}

const MA_STRUCTURES = [
  {
    key: 'nclt-scheme',
    label: 'NCLT Schemes & Cross-Border Mergers (Sec 230–234)',
    statutes: 'Companies Act, 2013 (Sec 230–234) & FEMA Cross-Border Merger Regulations, 2018',
    summary: 'Court-sanctioned amalgamations, demergers, spin-offs, and inbound/outbound cross-border corporate mergers transferring entire undertakings by universal succession.',
    deliverables: [
      'Drafting Composite Schemes of Arrangement, Valuation & Fairness Opinions review',
      'First & Second Motion Applications before NCLT Chandigarh, Allahabad, Jaipur, and New Delhi',
      'Regional Director (MCA), Official Liquidator, RoC, Income Tax & RBI regulatory clearances',
      'Fast-Track Mergers under Section 233 for start-ups and wholly owned subsidiaries'
    ]
  },
  {
    key: 'spa-bta-jv',
    label: 'Share & Asset Acquisitions, Slump Sales & Joint Ventures',
    statutes: 'Indian Contract Act 1872, Companies Act 2013 & FEMA Non-Debt Instruments Rules',
    summary: 'Structuring and negotiating Term Sheets, Share Purchase Agreements (SPA), Share Subscription Agreements (SSA), Business Transfer Agreements (BTA), and Joint Venture Shareholders Agreements (SHA).',
    deliverables: [
      'Bespoke Representations, Warranties, Indemnity Caps, Escrow & Earn-out Clauses',
      'Non-compete, Tag-Along, Drag-Along, Anti-Dilution & Reserved Matters Governance',
      'FDI Sectoral Cap compliance, FC-GPR / FC-TRS filings and pricing valuation compliance',
      'SEBI (SAST) Takeover Code open offer & LODR listed entity disclosures'
    ]
  },
  {
    key: 'cci-antitrust',
    label: 'Competition / Antitrust & CCI Combination Filings',
    statutes: 'Competition Act, 2002 & Competition (Amendment) Act, 2023 Deal Value Thresholds',
    summary: 'Merger control advisory before the Competition Commission of India (CCI) assessing Asset/Turnover tests, Deal Value Thresholds (> ₹2,000 Cr), and Green Channel notifications.',
    deliverables: [
      'Combination notifiability assessment & Relevant Market definition analysis',
      'Form I / Form II filings and Green Channel instant deemed-approval submissions',
      'Clean-team protocols & gun-jumping risk mitigation during pre-closing integration'
    ]
  },
  {
    key: 'distressed-ibc',
    label: 'Distressed M&A & IBC Resolution Acquisitions',
    statutes: 'Insolvency and Bankruptcy Code, 2016 (Sections 29A, 30, 31)',
    summary: 'Representing foreign funds, strategic acquirers, and Resolution Applicants in acquiring stressed industrial and real estate undertakings under CIRP with statutory Clean Slate immunity.',
    deliverables: [
      'Section 29A eligibility verification and Resolution Plan drafting & CoC negotiation',
      'Section 31 NCLT Resolution Plan approval and extinguishing legacy tax/operational claims',
      'Liquidation asset auction acquisition and Swiss Challenge restructuring bids'
    ]
  }
];

export const MergersAcquisitionsPage: React.FC<MergersAcquisitionsPageProps> = ({ onOpenConsultation }) => {
  const [activeStructureIdx, setActiveStructureIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is the difference between a Share Purchase (SPA), a Slump Sale (BTA), and an NCLT Merger Scheme?',
      a: 'In a Share Purchase (SPA), the buyer acquires equity shares of the target company while keeping its corporate entity and historical liabilities intact. In a Slump Sale / Business Transfer Agreement (BTA), an entire business undertaking is transferred for a lump-sum consideration without cherry-picking legacy liabilities. An NCLT Merger/Demerger Scheme under Sections 230–232 Companies Act transfers assets and liabilities by statutory order and is often tax-neutral under the Income-tax Act.'
    },
    {
      q: 'Are Cross-Border Inbound and Outbound Mergers permitted in India?',
      a: 'Yes. Section 234 of the Companies Act, 2013 read with the FEMA (Cross Border Merger) Regulations, 2018 permits mergers between Indian companies and foreign body corporates in notified jurisdictions subject to NCLT approval and deemed or prior Reserve Bank of India (RBI) permission.'
    },
    {
      q: 'When does an M&A transaction require Competition Commission of India (CCI) approval?',
      a: 'Under the Competition Act, 2002 (as amended by the Competition Amendment Act, 2023), a transaction requires mandatory CCI notification if it crosses statutory domestic/global Asset or Turnover thresholds, OR if the global Deal Value exceeds ₹2,000 Crore and the target has substantial business operations in India.'
    },
    {
      q: 'What is Legal Due Diligence in an Indian M&A transaction?',
      a: 'Comprehensive Legal Due Diligence audits corporate secretarial compliance (MCA/RoC), cap-table & share pledges, material commercial contracts (change-of-control triggers), industrial/agricultural land title & CLU clearances, employment & labour liabilities, IP ownership, environmental permits, and pending court/arbitral litigation.'
    }
  ];

  const activeStructure = MA_STRUCTURES[activeStructureIdx];

  return (
    <>
      <SEOHead
        title="Mergers & Acquisitions (M&A), Private Equity & Joint Ventures | Punia Associates"
        description="M&A lawyers advising on Share & Asset Purchase Agreements, NCLT Merger Schemes (Sections 230-234), Cross-Border FEMA Mergers, Legal Due Diligence, CCI Combination approvals, Private Equity, and IBC Distressed M&A."
        canonicalPath="/mergers-acquisitions"
        schemaData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Mergers & Acquisitions (M&A), Private Equity & Corporate Restructuring",
          "url": "https://puniaassociates.site/mergers-acquisitions",
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
        { name: 'Mergers & Acquisitions (M&A)', url: '/mergers-acquisitions' }
      ]} />

      <main className="bg-[#F8F9FA] text-[#1E293B]">
        {/* Hero */}
        <section className="bg-[#0B1325] text-white py-16 sm:py-20 border-b border-slate-800 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30 tracking-wide uppercase font-mono mb-4">
                <Briefcase className="w-3.5 h-3.5" />
                Corporate Transactions, Restructuring & Private Equity
              </span>
              <h1 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
                Mergers & Acquisitions (M&A), Joint Ventures & NCLT
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light mb-6">
                End-to-end transactional and regulatory counsel for domestic and cross-border acquisitions, corporate amalgamations, demergers, private equity investments, legal due diligence, CCI combination control, FEMA/FDI structuring, and IBC distressed M&A.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => onOpenConsultation('mergers-acquisitions')}
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-[#0B1325] font-bold text-xs sm:text-sm rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Consult M&A Transaction Counsel</span>
                </button>
                <Link
                  to="/international-arbitration"
                  className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm rounded-xl border border-slate-700 transition-colors flex items-center gap-2"
                >
                  <span>Explore International Arbitration</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content + Sidebar */}
        <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
                <Layers className="w-3.5 h-3.5" />
                <span>Deal Structuring & Transactional Architecture</span>
              </div>
              <h2 className="font-cormorant text-3xl sm:text-4xl font-bold text-[#0B1325]">
                M&A Transaction Vehicles & Regulatory Clearances
              </h2>

              {/* Interactive Structure Tabs */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex flex-wrap gap-2 mb-5">
                  {MA_STRUCTURES.map((s, idx) => (
                    <button
                      key={s.key}
                      onClick={() => setActiveStructureIdx(idx)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        activeStructureIdx === idx
                          ? 'bg-[#0B1325] text-amber-400 shadow'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>

                <div className="bg-slate-50 rounded-xl p-5 border border-slate-200/80 space-y-4">
                  <div>
                    <span className="text-[11px] font-mono text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded font-semibold inline-block mb-2">
                      {activeStructure.statutes}
                    </span>
                    <h3 className="font-cormorant text-2xl font-bold text-[#0B1325]">
                      {activeStructure.label}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                      {activeStructure.summary}
                    </p>
                  </div>

                  <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-200">
                    {activeStructure.deliverables.map((d, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 6-Pillar Legal Due Diligence Matrix */}
              <div className="pt-2">
                <h3 className="font-cormorant text-2xl sm:text-3xl font-bold text-[#0B1325] mb-4">
                  6-Pillar M&A Legal Due Diligence Checklist
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { title: 'Corporate & Cap-Table', desc: 'MCA/RoC filings, MoA/AoA, share allotment compliance, charges & encumbrances.' },
                    { title: 'Material Contracts', desc: 'Change-of-control clauses, assignment restrictions, exclusivity & vendor indemnities.' },
                    { title: 'Real Estate & Land Title', desc: 'Industrial & agricultural land conversion (CLU), Jamabandi/Khatauni verification in NCR.' },
                    { title: 'Regulatory & FEMA/FDI', desc: 'Sectoral FDI caps, RBI FC-GPR/FC-TRS filings, environmental & factory licenses.' },
                    { title: 'Litigation & Arbitration', desc: 'Pending High Court writs, NCLT, tax demands & contingent arbitral exposure.' },
                    { title: 'IP, Data Privacy & Labour', desc: 'Trademark/patent assignments, DPDP Act 2023 compliance, ESOPs & KMP contracts.' }
                  ].map((item, i) => (
                    <div key={i} className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                      <h4 className="font-bold text-xs text-[#0B1325] mb-1.5 flex items-center gap-1.5">
                        <FileCheck className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>{item.title}</span>
                      </h4>
                      <p className="text-[11px] text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md">
                <h3 className="font-cormorant text-2xl font-bold text-[#0B1325] mb-2">
                  Corporate M&A & PE Desk
                </h3>
                <p className="text-xs text-slate-500 mb-5 leading-relaxed">
                  Engage our corporate transactions team for NDA/Term Sheet structuring, buyer/seller due diligence, or NCLT merger petitions.
                </p>
                <div className="space-y-2.5 mb-5 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                    <span className="text-slate-600">Delhi NCR / NCLT Desk:</span>
                    <a href={`tel:${FIRM_INFO.secondaryPhone}`} className="font-bold text-amber-700">{FIRM_INFO.secondaryPhone}</a>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                    <span className="text-slate-600">Gurugram Corporate Desk:</span>
                    <a href={`tel:${FIRM_INFO.helplinePhone}`} className="font-bold text-amber-700">{FIRM_INFO.helplinePhone}</a>
                  </div>
                </div>
                <button
                  onClick={() => onOpenConsultation('mergers-acquisitions')}
                  className="w-full py-3 bg-[#0B1325] hover:bg-slate-800 text-amber-400 text-xs font-bold rounded-xl transition-colors shadow flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Schedule M&A Strategy Call</span>
                </button>
              </div>

              {/* Relevant M&A / IBC Precedent & Bare Act */}
              <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="font-cinzel text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>M&A Statutes & Case Law</span>
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 space-y-1.5">
                    <span className="font-mono text-[10px] text-amber-300">2021 INSC 462 (Supreme Court)</span>
                    <Link to="/judgments/sc-2021-ebix-singapore-nclt-ibc" className="block font-bold hover:text-amber-300">
                      Ebix Singapore Pte. Ltd. v. CoC of Educomp Solutions
                    </Link>
                    <a href="/judgments/govt-sourced/sc_2021_insc_462_ebix_singapore_nclt_ibc.pdf" download className="inline-flex items-center gap-1 text-[11px] text-emerald-400 hover:underline">
                      <Download className="w-3 h-3" /> Govt-Sourced PDF
                    </a>
                  </div>

                  <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 space-y-1.5">
                    <span className="font-mono text-[10px] text-amber-300">Companies Act 2013 (Sec 230–234)</span>
                    <Link to="/bare-acts/companies-act-2013-mergers-acquisitions" className="block font-bold hover:text-amber-300">
                      Read Compromises, Mergers & Cross-Border M&A Provisions
                    </Link>
                  </div>

                  <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 space-y-1.5">
                    <span className="font-mono text-[10px] text-amber-300">Research Treatise</span>
                    <Link to="/articles" className="block font-bold hover:text-amber-300">
                      Cross-Border M&A, CCI Deal-Value Thresholds & NCLT Schemes
                    </Link>
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
                Mergers & Acquisitions FAQs
              </span>
              <h2 className="font-cormorant text-3xl sm:text-4xl font-bold text-[#0B1325] mt-3">
                M&A, Joint Ventures & Corporate Restructuring Inquiries
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

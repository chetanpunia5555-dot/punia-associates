import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Scale, 
  FileText, 
  CheckCircle2, 
  HelpCircle, 
  PhoneCall, 
  ArrowRight, 
  ShieldCheck, 
  Gavel, 
  Briefcase,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { FIRM_INFO } from '../data/legalData';

interface CivilLawPageProps {
  onOpenConsultation: (category?: string, state?: string) => void;
}

export const CivilLawPage: React.FC<CivilLawPageProps> = ({ onOpenConsultation }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const civilFaqs = [
    {
      q: "What is an interim injunction under Order 39 of the Code of Civil Procedure (CPC)?",
      a: "An interim or temporary injunction is a court order restraining the opposing party from alienating, selling, demolishing, or altering property, or disturbing the status quo until the final determination of the civil suit. The plaintiff must establish a prima facie case, balance of convenience, and irreparable loss."
    },
    {
      q: "What is the procedure for a Summary Suit under Order 37 CPC?",
      a: "Order 37 allows fast-track recovery of debts arising from written contracts, negotiable instruments (bills of exchange, promissory notes), or enactments. The defendant does not have an automatic right to defend and must apply to the court for 'leave to defend' within statutory timelines."
    },
    {
      q: "What is the difference between a First Appeal and a Second Appeal in civil law?",
      a: "A First Appeal (Section 96 CPC) lies against the original decree and can be argued on both questions of fact and questions of law. A Second Appeal (Section 100 CPC) lies before the Hon'ble High Court only if the High Court is satisfied that the case involves a substantial question of law."
    },
    {
      q: "How are civil decrees executed through the court?",
      a: "Under Order 21 of the CPC, an execution petition is filed before the executing court. The court can enforce decrees through attachment and sale of property, civil arrest of a judgment debtor who willfully evades compliance, or appointment of a receiver."
    }
  ];

  return (
    <>
      <SEOHead
        title="Civil Law & Civil Litigation Lawyers | Punia Associates"
        description="Legal assistance for civil disputes, litigation, recovery matters, contractual disputes, injunctions and other civil law matters."
        canonicalPath="/civil-law"
        schemaData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Civil Law & Civil Litigation",
          "url": "https://puniaassociates.site/civil-law",
          "description": "Legal assistance for civil disputes, litigation, recovery matters, contractual disputes, injunctions and other civil law matters.",
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
        { name: 'Civil Law & Civil Litigation', url: '/civil-law' }
      ]} />

      <main className="bg-[#F8F9FA] text-[#1E293B]">
        {/* Page Hero Header */}
        <section className="bg-[#0B1325] text-white py-16 sm:py-20 border-b border-slate-800 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30 tracking-wide uppercase font-mono mb-4">
                Civil Dispute Resolution & Advocacy
              </span>
              <h1 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
                Civil Law & Civil Litigation
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
                Punia Associates delivers comprehensive civil litigation counsel across District Courts, High Courts, and appellate tribunals. We handle suits for declaration, money recovery, injunctions, specific performance, and decree execution under the Code of Civil Procedure 1908.
              </p>
            </div>
          </div>
        </section>

        {/* Section 1: Civil Litigation Verticals */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-md border border-amber-200">
                <Scale className="w-3.5 h-3.5" />
                Civil Matters Handled
              </div>
              <h2 className="font-cormorant text-3xl sm:text-4xl font-bold text-[#0B1325]">
                Trial Representation & Substantive Civil Remedies
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Civil litigation demands rigorous factual pleading, thorough document verification, and adherence to statutory limitation periods. Our civil litigation team provides representation in the following core areas:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-base text-[#0B1325] mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    <span>Injunctions & Status Quo Orders</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Applications under Order 39 Rules 1 & 2 CPC and Section 38 Specific Relief Act for ad-interim protection against unlawful dispossession, demolition, or third-party sale.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-base text-[#0B1325] mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    <span>Recovery of Money & Summary Suits</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Filing suits for recovery of business debts, commercial balances, unpaid dues, and summary suits under Order 37 CPC for prompt decree realization.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-base text-[#0B1325] mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    <span>Contract Disputes & Specific Performance</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Enforcing agreements to sell, vendor contracts, lease covenants, and claims for damages and restitution under the Indian Contract Act 1872.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-base text-[#0B1325] mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    <span>Appeals, Revisions & Execution</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    First Appeals (Section 96 CPC), Second Appeals (Section 100 CPC) in High Court, Civil Revision Petitions (Section 115), and Execution under Order 21 CPC.
                  </p>
                </div>
              </div>
            </div>

            {/* Consultation Sidebar */}
            <div className="lg:col-span-4 bg-white p-6 rounded-xl border border-slate-200 shadow-md">
              <h3 className="font-cormorant text-2xl font-bold text-[#0B1325] mb-2">
                Civil Dispute Consultation
              </h3>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                Have you received a civil summons or need to protect property or contractual claims? Speak with a civil litigation advocate.
              </p>

              <div className="space-y-3 mb-6 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-600">Direct Helpline:</span>
                  <a href={`tel:${FIRM_INFO.helplinePhone}`} className="font-bold text-amber-600">{FIRM_INFO.helplinePhone}</a>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-600">Chambers Desk:</span>
                  <a href={`tel:${FIRM_INFO.secondaryPhone}`} className="font-bold text-amber-600">{FIRM_INFO.secondaryPhone}</a>
                </div>
              </div>

              <button
                onClick={() => onOpenConsultation('Civil Law')}
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-[#0B1325] text-xs font-bold rounded-lg transition-colors shadow flex items-center justify-center gap-2 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Request Case Review</span>
              </button>

              <div className="mt-4 pt-4 border-t border-slate-100 text-[11px] text-slate-400 text-center">
                All pleadings and documents are held in strict legal confidence.
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Civil Litigation Roadmap */}
        <section className="py-16 bg-slate-100 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-3 py-1 rounded-md">
                Procedure Flowchart
              </span>
              <h2 className="font-cormorant text-3xl sm:text-4xl font-bold text-[#0B1325] mt-3">
                Lifecycle of a Civil Suit Under the CPC
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                A structured overview of how a civil case moves from plaint presentation to final judicial decree.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Step 01</span>
                <h3 className="font-bold text-base text-[#0B1325] mt-3 mb-2">Plaint & Service of Summons</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Drafting and filing of plaint (Order 7), verification of court fees, issuance and service of court summons on defendants (Order 5).
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Step 02</span>
                <h3 className="font-bold text-base text-[#0B1325] mt-3 mb-2">Written Statement & Issues</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Filing of Written Statement within 30-120 days (Order 8), interim injunction hearings (Order 39), and settlement of judicial issues (Order 14).
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Step 03</span>
                <h3 className="font-bold text-base text-[#0B1325] mt-3 mb-2">Evidence & Cross-Examination</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Filing of affidavits in lieu of examination-in-chief (Order 18 Rule 4), cross-examination of plaintiff and defense witnesses, and exhibit marking.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Step 04</span>
                <h3 className="font-bold text-base text-[#0B1325] mt-3 mb-2">Final Judgment & Execution</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Oral arguments on law and facts, pronouncement of judgment and drawing of decree (Order 20), followed by execution proceedings (Order 21).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Civil FAQs */}
        <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-md border border-amber-200">
              Questions & Answers
            </span>
            <h2 className="font-cormorant text-3xl sm:text-4xl font-bold text-[#0B1325] mt-3">
              Civil Litigation Inquiries
            </h2>
          </div>

          <div className="space-y-4">
            {civilFaqs.map((faq, index) => (
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
              Strategic Legal Evaluation
            </span>
            <h2 className="font-cormorant text-3xl sm:text-4xl font-bold mb-4">
              Consult on Your Civil Litigation Matter
            </h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto mb-8 font-light">
              Connect with our civil practice team for an appraisal of your contractual records, recovery claim, or pending court notice.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onOpenConsultation('Civil Law')}
                className="w-full sm:w-auto px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-[#0B1325] font-bold text-sm rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-[#0B1325]" />
                <span>Consult Civil Litigation Advocate</span>
              </button>
              <Link
                to="/practice-areas"
                className="w-full sm:w-auto px-8 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm rounded-lg border border-slate-700 transition-colors text-center"
              >
                View All Practice Areas
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

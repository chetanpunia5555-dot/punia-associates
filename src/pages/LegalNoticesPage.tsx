import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Send, 
  ShieldCheck, 
  Scale, 
  CheckCircle2, 
  PhoneCall, 
  ArrowRight, 
  ChevronDown, 
  Sparkles,
  Clock,
  AlertCircle
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { FIRM_INFO } from '../data/legalData';

interface LegalNoticesPageProps {
  onOpenConsultation: (category?: string, state?: string) => void;
}

export const LegalNoticesPage: React.FC<LegalNoticesPageProps> = ({ onOpenConsultation }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const noticeFaqs = [
    {
      q: "What is the legal importance of issuing a statutory notice before initiating court litigation?",
      a: "A legal notice serves as formal written communication communicating the sender's grievances, facts, and legal demands. In several statutes (such as Section 138 NI Act, Section 106 Transfer of Property Act, Section 80 CPC against the Government), serving notice is a mandatory condition precedent without which a suit or criminal complaint cannot be maintained."
    },
    {
      q: "What should you do immediately if you receive a legal notice from opposing counsel?",
      a: "1. Note the exact date and mode of receipt (registered post, email); 2. Do not ignore the notice, as silence or delayed responses can be construed as an admission of facts in subsequent litigation; 3. Bring the notice and supporting agreements/receipts to an advocate to draft a point-by-point rebuttal within the stipulated response period (typically 15 to 30 days)."
    },
    {
      q: "What happens if a drawer fails to pay within 15 days of receiving a Section 138 NI Act cheque bounce notice?",
      a: "Upon the expiry of the 15-day statutory cure period, the cause of action arises under Section 142 of the Negotiable Instruments Act. The payee has exactly one month from that date to file a criminal complaint before the jurisdictional Judicial Magistrate."
    },
    {
      q: "Can a dispute be settled at the legal notice stage without going to court?",
      a: "Yes. A significant percentage of civil, contractual, and commercial disputes are resolved during the legal notice exchange. A well-reasoned notice demonstrating clear documentary proof often prompts opposing parties to engage in commercial settlement or mediation rather than risking protracted litigation."
    }
  ];

  return (
    <>
      <SEOHead
        title="Legal Notice Drafting & Documentation | Punia Associates"
        description="Professional legal notice drafting, reply to legal notices, agreements, affidavits and statutory demand notices by advocates."
        canonicalPath="/legal-notices"
        schemaData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Legal Notices & Documentation Services",
          "url": "https://puniaassociates.site/legal-notices",
          "description": "Professional legal notice drafting, reply to legal notices, agreements, affidavits and statutory demand notices by advocates.",
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
        { name: 'Legal Notices & Documentation Services', url: '/legal-notices' }
      ]} />

      <main className="bg-[#F8F9FA] text-[#1E293B]">
        {/* Header Hero */}
        <section className="bg-[#0B1325] text-white py-16 sm:py-20 border-b border-slate-800 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30 tracking-wide uppercase font-mono mb-4">
                Pre-Litigation Advocacy & Legal Drafting
              </span>
              <h1 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
                Legal Notices & Documentation Services
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
                Punia Associates delivers precise drafting of statutory demand notices, replies to adversarial notices, contract covenants, settlement deeds, and conveyance documentation to build an unassailable legal foundation before entering courtroom litigation.
              </p>
            </div>
          </div>
        </section>

        {/* Practice Scope */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-md border border-amber-200">
                <FileText className="w-3.5 h-3.5" />
                Documentation Practice
              </div>
              <h2 className="font-cormorant text-3xl sm:text-4xl font-bold text-[#0B1325]">
                Statutory Notice Drafting & Adversarial Replies
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                In Indian jurisprudence, pleadings in court are strictly tethered to the factual assertions made in pre-litigation notices. Inconsistencies between a legal notice and a subsequent plaint can fatally undermine a case. Our advocates draft and respond to:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-base text-[#0B1325] mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    <span>Section 138 NI Act Cheque Bounce Notice</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Mandatory 15-day statutory demand notice served within 30 days of cheque dishonour memo, incorporating exact debt details, cheque numbers, and demand for payment.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-base text-[#0B1325] mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    <span>Replying to Received Legal Notices</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Comprehensive factual rebuttals repudiating false claims, establishing counter-claims, preserving procedural defenses, and calling upon the sender to withdraw defamatory claims.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-base text-[#0B1325] mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    <span>Tenancy Eviction & Termination Notices</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Statutory notice under Section 106 of the Transfer of Property Act 1882 terminating lease agreements, demanding vacant possession, and calculating arrears of rent.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-base text-[#0B1325] mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    <span>Breach of Contract & Money Recovery</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Formal notice quantifying financial damages, invocation of cure periods, demanding specific performance, and giving notice of intention to initiate legal proceedings.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 bg-white p-6 rounded-xl border border-slate-200 shadow-md">
              <h3 className="font-cormorant text-2xl font-bold text-[#0B1325] mb-2">
                Legal Notice Desk
              </h3>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                Need to serve an urgent legal notice or have you received a notice from opposing counsel? Connect with our drafting desk.
              </p>

              <div className="space-y-3 mb-6 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-600">Drafting Helpline:</span>
                  <a href={`tel:${FIRM_INFO.helplinePhone}`} className="font-bold text-amber-600">{FIRM_INFO.helplinePhone}</a>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-600">Secondary Desk:</span>
                  <a href={`tel:${FIRM_INFO.secondaryPhone}`} className="font-bold text-amber-600">{FIRM_INFO.secondaryPhone}</a>
                </div>
              </div>

              <button
                onClick={() => onOpenConsultation('Legal Notices')}
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-[#0B1325] text-xs font-bold rounded-lg transition-colors shadow flex items-center justify-center gap-2 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Request Notice Drafting / Reply</span>
              </button>

              <div className="mt-4 pt-4 border-t border-slate-100 text-[11px] text-slate-400 text-center">
                Notices drafted on official advocate letterhead with registered dispatch.
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Essential Elements */}
        <section className="py-16 bg-slate-100 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-3 py-1 rounded-md">
                Drafting Standards
              </span>
              <h2 className="font-cormorant text-3xl sm:text-4xl font-bold text-[#0B1325] mt-3">
                Key Elements of an Enforceable Legal Notice
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                A valid and effective legal notice must incorporate specific statutory prerequisites to withstand judicial scrutiny.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Element 01</span>
                <h3 className="font-bold text-base text-[#0B1325] mt-3 mb-2">Statement of Facts</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Chronological, coherent recital of events, contract execution dates, payments made, and precise default acts committed by the addressee.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Element 02</span>
                <h3 className="font-bold text-base text-[#0B1325] mt-3 mb-2">Statutory Grounds</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Explicit citation of violated statutory provisions, contractual clauses, and legal duties giving rise to the cause of action.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Element 03</span>
                <h3 className="font-bold text-base text-[#0B1325] mt-3 mb-2">Specific Relief Demand</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Quantified financial claim, demand for specific performance, or rectification required within a clear statutory deadline (e.g. 15 or 30 days).
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Element 04</span>
                <h3 className="font-bold text-base text-[#0B1325] mt-3 mb-2">Proof of Service</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Dispatch via Registered Post with Acknowledgment Due (RPAD) and speed post, accompanied by electronic tracking receipt for court exhibit.
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
              Legal Notice Inquiries
            </h2>
          </div>

          <div className="space-y-4">
            {noticeFaqs.map((faq, index) => (
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
              Notice Drafting & Response
            </span>
            <h2 className="font-cormorant text-3xl sm:text-4xl font-bold mb-4">
              Draft or Respond to a Legal Notice with Advocate Assistance
            </h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto mb-8 font-light">
              Connect with our legal drafting team to prepare a statutory notice or craft an effective point-by-point reply.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onOpenConsultation('Legal Notices')}
                className="w-full sm:w-auto px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-[#0B1325] font-bold text-sm rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-[#0B1325]" />
                <span>Consult Drafting Advocate</span>
              </button>
              <Link
                to="/practice-areas"
                className="w-full sm:w-auto px-8 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm rounded-lg border border-slate-700 transition-colors text-center"
              >
                Explore All Practice Areas
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

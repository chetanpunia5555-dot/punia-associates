import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  HeartHandshake, 
  Users, 
  ShieldCheck, 
  Scale, 
  CheckCircle2, 
  PhoneCall, 
  ArrowRight, 
  ChevronDown, 
  Sparkles,
  Lock,
  FileCheck
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { FIRM_INFO } from '../data/legalData';

interface FamilyLawPageProps {
  onOpenConsultation: (category?: string, state?: string) => void;
}

export const FamilyLawPage: React.FC<FamilyLawPageProps> = ({ onOpenConsultation }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const familyFaqs = [
    {
      q: "What is the procedure for Mutual Consent Divorce under Section 13B of the Hindu Marriage Act?",
      a: "Both spouses jointly file a First Motion petition confirming they have lived separately for at least one year and cannot cohabit. Under statutory guidelines, a cooling-off period of six months follows before the Second Motion, though the Supreme Court allows waiver of this cooling-off period in genuine cases of irretrievable breakdown."
    },
    {
      q: "How does the court determine maintenance under Section 125 CrPC / BNSS?",
      a: "The court evaluates the financial capacity and income of the non-applicant spouse, standard of living enjoyed during the marriage, independent earnings of the applicant spouse, and reasonable living and educational expenses of minor children."
    },
    {
      q: "How is child custody decided in matrimonial disputes?",
      a: "Under the Guardians and Wards Act 1890 and established jurisprudence, the paramount consideration is the 'welfare of the minor child' rather than the strict rights of parents. Courts evaluate educational stability, emotional bonding, home environment, and child preference where capable of forming an opinion."
    },
    {
      q: "What relief is available under the Domestic Violence Act (PWDVA 2005)?",
      a: "The PWDVA provides civil remedies including Protection Orders against domestic abuse, Residence Orders preventing forceful eviction from the shared household, Monetary Relief for medical expenses, and temporary Custody Orders."
    }
  ];

  return (
    <>
      <SEOHead
        title="Family Law & Matrimonial Lawyers | Punia Associates"
        description="Punia Associates provides legal assistance in family and matrimonial matters including divorce, maintenance, custody and related disputes."
        canonicalPath="/family-law"
        schemaData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Family Law & Matrimonial Matters",
          "url": "https://puniaassociates.site/family-law",
          "description": "Punia Associates provides legal assistance in family and matrimonial matters including divorce, maintenance, custody and related disputes.",
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
        { name: 'Family Law & Matrimonial Matters', url: '/family-law' }
      ]} />

      <main className="bg-[#F8F9FA] text-[#1E293B]">
        {/* Header Hero */}
        <section className="bg-[#0B1325] text-white py-16 sm:py-20 border-b border-slate-800 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30 tracking-wide uppercase font-mono mb-4">
                Compassionate & Confidential Counsel
              </span>
              <h1 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
                Family Law & Matrimonial Matters
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
                Punia Associates delivers discrete, professional legal guidance for matrimonial disputes, mutual consent separation, contested divorce, maintenance, and child custody matters across Family Courts and High Courts.
              </p>
            </div>
          </div>
        </section>

        {/* Practice Scope */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-md border border-amber-200">
                <HeartHandshake className="w-3.5 h-3.5" />
                Matrimonial Practice
              </div>
              <h2 className="font-cormorant text-3xl sm:text-4xl font-bold text-[#0B1325]">
                Balanced Legal Representation for Domestic Matters
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Matrimonial and domestic controversies involve deeply personal concerns. Our advocates approach family law matters with privacy, emotional sensitivity, and strategic legal rigor, prioritizing amicable mediation where possible and assertive courtroom advocacy when required:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-base text-[#0B1325] mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    <span>Mutual Consent Divorce</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Drafting joint petitions under Section 13B Hindu Marriage Act / Section 28 Special Marriage Act. Comprehensive settlement agreements addressing permanent alimony, stridhan return, and custody.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-base text-[#0B1325] mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    <span>Contested Divorce Proceedings</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Representation in contested divorce petitions on statutory grounds including mental and physical cruelty, desertion, adultery, and conversion, with disciplined evidentiary substantiation.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-base text-[#0B1325] mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    <span>Maintenance & Alimony Claims</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Filing and defending claims for interim and permanent maintenance under Section 125 CrPC / BNSS, Section 24 and 25 HMA, ensuring equitable financial security for spouses and children.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-base text-[#0B1325] mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    <span>Child Custody & Visitation</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Petitions under the Guardians and Wards Act 1890. Securing interim physical custody, festival visitation schedules, shared parenting frameworks, and safeguarding educational welfare.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 bg-white p-6 rounded-xl border border-slate-200 shadow-md">
              <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 px-3 py-1 rounded-md text-xs font-semibold mb-4 border border-emerald-200">
                <Lock className="w-3.5 h-3.5" />
                <span>Strict Confidentiality Guaranteed</span>
              </div>
              <h3 className="font-cormorant text-2xl font-bold text-[#0B1325] mb-2">
                Confidential Case Intake
              </h3>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                Consult with our senior matrimonial advocates regarding separation, child custody rights, or mediation options.
              </p>

              <div className="space-y-3 mb-6 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-600">Family Desk:</span>
                  <a href={`tel:${FIRM_INFO.helplinePhone}`} className="font-bold text-amber-600">{FIRM_INFO.helplinePhone}</a>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-600">Confidential Line:</span>
                  <a href={`tel:${FIRM_INFO.secondaryPhone}`} className="font-bold text-amber-600">{FIRM_INFO.secondaryPhone}</a>
                </div>
              </div>

              <button
                onClick={() => onOpenConsultation('Family Law')}
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-[#0B1325] text-xs font-bold rounded-lg transition-colors shadow flex items-center justify-center gap-2 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Schedule Private Consultation</span>
              </button>

              <div className="mt-4 pt-4 border-t border-slate-100 text-[11px] text-slate-400 text-center">
                All matrimonial communications are subject to advocate-client privilege.
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Process Steps */}
        <section className="py-16 bg-slate-100 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-3 py-1 rounded-md">
                Procedural Roadmap
              </span>
              <h2 className="font-cormorant text-3xl sm:text-4xl font-bold text-[#0B1325] mt-3">
                Family Court Mediation & Adjudication Process
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                Under Family Courts Act 1984, court proceedings emphasize reconciliation, structured counseling, and fair settlement.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Step 1</span>
                <h3 className="font-bold text-base text-[#0B1325] mt-3 mb-2">Petition Drafting</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Preparation of petition under Hindu Marriage Act, Special Marriage Act, or Guardians and Wards Act with complete factual verification.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Step 2</span>
                <h3 className="font-bold text-base text-[#0B1325] mt-3 mb-2">Court Counselor Mediation</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Statutory referral to the Family Court mediation center for confidential sessions exploring reconciliation or mutual terms.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Step 3</span>
                <h3 className="font-bold text-base text-[#0B1325] mt-3 mb-2">Interim Applications</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Adjudication of interim maintenance (Section 24 HMA), temporary child custody, and interim residence protection orders.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Step 4</span>
                <h3 className="font-bold text-base text-[#0B1325] mt-3 mb-2">Final Decree / Settlement</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Recording of statements and grant of divorce decree, execution of permanent alimony terms, and custody guardianship order.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: FAQs */}
        <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-md border border-amber-200">
              Questions & Answers
            </span>
            <h2 className="font-cormorant text-3xl sm:text-4xl font-bold text-[#0B1325] mt-3">
              Family Law Inquiries
            </h2>
          </div>

          <div className="space-y-4">
            {familyFaqs.map((faq, index) => (
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
              Private Chamber Consultation
            </span>
            <h2 className="font-cormorant text-3xl sm:text-4xl font-bold mb-4">
              Seek Guidance on Matrimonial & Family Matters
            </h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto mb-8 font-light">
              Discuss your circumstances with an experienced family law practitioner in a completely confidential, supportive environment.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onOpenConsultation('Family Law')}
                className="w-full sm:w-auto px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-[#0B1325] font-bold text-sm rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-[#0B1325]" />
                <span>Consult Matrimonial Advocate</span>
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

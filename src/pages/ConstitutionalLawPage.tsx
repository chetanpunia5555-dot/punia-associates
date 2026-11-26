import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Scroll, 
  Scale, 
  FileText, 
  CheckCircle2, 
  PhoneCall, 
  ArrowRight, 
  ChevronDown, 
  Sparkles,
  ShieldCheck,
  Building2,
  Landmark
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { FIRM_INFO } from '../data/legalData';

interface ConstitutionalLawPageProps {
  onOpenConsultation: (category?: string, state?: string) => void;
}

export const ConstitutionalLawPage: React.FC<ConstitutionalLawPageProps> = ({ onOpenConsultation }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const constitutionalFaqs = [
    {
      q: "What is the difference between a Writ under Article 226 and Article 32 of the Constitution?",
      a: "Article 32 allows citizens to approach the Supreme Court directly, but only for the enforcement of Fundamental Rights guaranteed under Part III. Article 226 gives High Courts broader jurisdiction to issue writs not only for fundamental rights but also 'for any other purpose'—such as challenging arbitrary administrative actions or statutory violations."
    },
    {
      q: "What are the five prerogative writs and when are they invoked?",
      a: "1. Habeas Corpus (securing release from unlawful state or private detention); 2. Mandamus (compelling a public authority to perform a statutory duty); 3. Certiorari (quashing an illegal or jurisdiction-less order passed by an inferior court/tribunal); 4. Prohibition (stopping an authority from exceeding its jurisdiction); 5. Quo Warranto (challenging a person's legal authority to hold a public office)."
    },
    {
      q: "What constitutes 'Judicial Review' in administrative law?",
      a: "Judicial review allows the High Court or Supreme Court to examine whether a decision made by a governmental authority, municipal corporation, or statutory tribunal suffered from illegality, procedural impropriety, bias, or wednesbury unreasonableness/arbitrariness."
    },
    {
      q: "Can service disputes of government employees be challenged through Writ Petitions?",
      a: "For central government employees, remedies normally begin before the Central Administrative Tribunal (CAT), after which orders are challengeable before a Division Bench of the High Court under Article 226. For state employees where state tribunals do not exist, writ petitions lie directly in the High Court."
    }
  ];

  return (
    <>
      <SEOHead
        title="Constitutional & Administrative Law | Punia Associates"
        description="Legal assistance in constitutional and administrative law matters, including writs, public-law disputes and judicial review where applicable."
        canonicalPath="/constitutional-law"
        schemaData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Constitutional & Administrative Law",
          "url": "https://puniaassociates.site/constitutional-law",
          "description": "Legal assistance in constitutional and administrative law matters, including writs, public-law disputes and judicial review where applicable.",
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
        { name: 'Constitutional & Administrative Law', url: '/constitutional-law' }
      ]} />

      <main className="bg-[#F8F9FA] text-[#1E293B]">
        {/* Header Hero */}
        <section className="bg-[#0B1325] text-white py-16 sm:py-20 border-b border-slate-800 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30 tracking-wide uppercase font-mono mb-4">
                High Court & Supreme Court Public Law Practice
              </span>
              <h1 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
                Constitutional & Administrative Law
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
                Punia Associates delivers appellate and writ advocacy before the Supreme Court of India and State High Courts, representing citizens, employees, and corporations against arbitrary administrative actions, discriminatory orders, and fundamental rights infringements.
              </p>
            </div>
          </div>
        </section>

        {/* Practice Scope */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-md border border-amber-200">
                <Scroll className="w-3.5 h-3.5" />
                Constitutional Remedies
              </div>
              <h2 className="font-cormorant text-3xl sm:text-4xl font-bold text-[#0B1325]">
                Writ Advocacy & Challenges Against State Action
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                When governmental bodies, public sector undertakings, or statutory boards act in violation of the Constitution or statutory guidelines, public law remedies provide swift, binding judicial relief. Our constitutional counsel represent clients in:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-base text-[#0B1325] mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    <span>Writ Petitions (Article 226 & 32)</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Filing writ petitions for Mandamus, Certiorari, Habeas Corpus, and Prohibition before the High Courts at Chandigarh, Prayagraj, Jaipur, Delhi, and the Supreme Court.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-base text-[#0B1325] mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    <span>Judicial Review of Tender & Contracts</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Challenging arbitrary disqualifications, flawed tender evaluation criteria, blacklisting orders, and unilateral cancellation of governmental procurement contracts.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-base text-[#0B1325] mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    <span>Central Administrative Tribunal (CAT)</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Representing central civil servants, armed forces personnel (AFT), and state employees in wrongful suspension, seniority supersession, disciplinary bias, and pension disputes.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-base text-[#0B1325] mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    <span>Special Leave Petitions (SLPs)</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Drafting and arguing SLP (Civil) and SLP (Criminal) petitions under Article 136 of the Constitution before the Supreme Court of India against adverse High Court judgments.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 bg-white p-6 rounded-xl border border-slate-200 shadow-md">
              <h3 className="font-cormorant text-2xl font-bold text-[#0B1325] mb-2">
                Constitutional & Writ Desk
              </h3>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                Has an authority issued an arbitrary order or violated procedural fairness? Consult our High Court writ counsel.
              </p>

              <div className="space-y-3 mb-6 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-600">High Court Chambers:</span>
                  <a href={`tel:${FIRM_INFO.helplinePhone}`} className="font-bold text-amber-600">{FIRM_INFO.helplinePhone}</a>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-600">Supreme Court Desk:</span>
                  <a href={`tel:${FIRM_INFO.secondaryPhone}`} className="font-bold text-amber-600">{FIRM_INFO.secondaryPhone}</a>
                </div>
              </div>

              <button
                onClick={() => onOpenConsultation('Constitutional Law')}
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-[#0B1325] text-xs font-bold rounded-lg transition-colors shadow flex items-center justify-center gap-2 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Evaluate Writ Viability</span>
              </button>

              <div className="mt-4 pt-4 border-t border-slate-100 text-[11px] text-slate-400 text-center">
                Representation by Senior High Court Advocates & Advocates-on-Record.
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Prerogative Writs Explained */}
        <section className="py-16 bg-slate-100 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-3 py-1 rounded-md">
                Constitutional Mechanisms
              </span>
              <h2 className="font-cormorant text-3xl sm:text-4xl font-bold text-[#0B1325] mt-3">
                The Five High Court & Supreme Court Writs
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                A concise guide to the fundamental writ types recognized under Indian constitutional jurisprudence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Writ 01</span>
                <h3 className="font-bold text-base text-[#0B1325] mt-3 mb-2">Writ of Mandamus</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Issued to command a public official, government department, or statutory body to perform a mandatory public or statutory duty they have unlawfully refused or failed to perform.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Writ 02</span>
                <h3 className="font-bold text-base text-[#0B1325] mt-3 mb-2">Writ of Certiorari</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Issued to quash an order or decision of a subordinate court, administrative tribunal, or quasi-judicial authority passed without jurisdiction or in violation of natural justice.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Writ 03</span>
                <h3 className="font-bold text-base text-[#0B1325] mt-3 mb-2">Writ of Habeas Corpus</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Issued for personal liberty under Article 21, directing state authorities or police officials to produce an illegally detained or missing person before the court immediately.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Writ 04</span>
                <h3 className="font-bold text-base text-[#0B1325] mt-3 mb-2">Writ of Prohibition</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Issued by a superior court to prevent a lower court, magistrate, or tribunal from continuing proceedings that exceed its statutory jurisdiction.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Writ 05</span>
                <h3 className="font-bold text-base text-[#0B1325] mt-3 mb-2">Writ of Quo Warranto</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Issued to challenge the right or legal qualification of an individual claiming or holding a substantive public office created by statute or the Constitution.
                </p>
              </div>

              <div className="bg-[#0B1325] text-white p-6 rounded-xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded">Article 136</span>
                  <h3 className="font-bold text-base text-white mt-3 mb-2">Special Leave Petitions</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Extraordinary discretionary jurisdiction of the Supreme Court to grant leave to appeal against any judgment, decree, determination, sentence or order in any cause or matter.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800">
                  <span className="text-xs text-amber-400 font-semibold">Supreme Court AOR Practice</span>
                </div>
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
              Constitutional & Public Law Inquiries
            </h2>
          </div>

          <div className="space-y-4">
            {constitutionalFaqs.map((faq, index) => (
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
              Appellate & Writ Case Evaluation
            </span>
            <h2 className="font-cormorant text-3xl sm:text-4xl font-bold mb-4">
              Discuss Your Constitutional or Writ Matter with Senior Counsel
            </h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto mb-8 font-light">
              Connect with our High Court and Supreme Court appellate team for an evaluation of your administrative order, service grievance, or writ remedy.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onOpenConsultation('Constitutional Law')}
                className="w-full sm:w-auto px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-[#0B1325] font-bold text-sm rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-[#0B1325]" />
                <span>Consult Constitutional Counsel</span>
              </button>
              <Link
                to="/courts"
                className="w-full sm:w-auto px-8 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm rounded-lg border border-slate-700 transition-colors text-center"
              >
                View High Courts & Jurisdictions
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

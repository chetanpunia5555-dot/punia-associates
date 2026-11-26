import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldAlert, 
  Scale, 
  FileText, 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle, 
  PhoneCall, 
  ArrowRight, 
  Clock, 
  Lock, 
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { FIRM_INFO } from '../data/legalData';

interface CriminalLawPageProps {
  onOpenConsultation: (category?: string, state?: string) => void;
}

export const CriminalLawPage: React.FC<CriminalLawPageProps> = ({ onOpenConsultation }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const criminalFaqs = [
    {
      q: "What is the key difference between Anticipatory Bail and Regular Bail under Indian criminal law?",
      a: "Anticipatory bail (Section 438 CrPC / Section 482 BNSS) is applied for before an arrest takes place, based on a reasonable apprehension of arrest in a non-bailable case. Regular bail (Section 439 CrPC / Section 483 BNSS) is sought after an individual has already been arrested and is in police or judicial custody."
    },
    {
      q: "Can an FIR be quashed directly by the High Court?",
      a: "Yes. Under Section 482 of the Code of Criminal Procedure (inherent powers of High Court), a petition can be filed to quash an FIR, complaint, or charge-sheet where the allegations do not disclose any cognizable offence, where proceedings are an abuse of the court process, or where parties have amicably resolved matrimonial/civil disputes."
    },
    {
      q: "What are the immediate legal rights of an arrested person?",
      a: "Under Article 22 of the Constitution and procedural codes, an arrested individual has the right to be informed of the grounds of arrest, the right to consult and be defended by a legal practitioner of their choice, the right to be produced before the nearest Magistrate within 24 hours of arrest, and the right to medical examination."
    },
    {
      q: "What documents should be arranged for a criminal consultation?",
      a: "Helpful documents include a certified or true copy of the First Information Report (FIR), arrest memo/notice under Section 41A CrPC (if issued), copy of the complaint, orders of any previous bail rejections by the trial court, and relevant supporting evidence such as call records or alibi proofs."
    }
  ];

  return (
    <>
      <SEOHead
        title="Criminal Law & Criminal Defence | Punia Associates"
        description="Punia Associates provides legal assistance in criminal law matters, including criminal defence, bail, complaints, FIR-related matters and court representation."
        canonicalPath="/criminal-law"
        schemaData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Criminal Law & Criminal Defence",
          "url": "https://puniaassociates.site/criminal-law",
          "description": "Punia Associates provides legal assistance in criminal law matters, including criminal defence, bail, complaints, FIR-related matters and court representation.",
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
        { name: 'Criminal Law & Criminal Defence', url: '/criminal-law' }
      ]} />

      <main className="bg-[#F8F9FA] text-[#1E293B]">
        {/* Page Hero Header */}
        <section className="bg-[#0B1325] text-white py-16 sm:py-20 border-b border-slate-800 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30 tracking-wide uppercase font-mono mb-4">
                Trial Defense & Appellate Advocacy
              </span>
              <h1 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
                Criminal Law & Criminal Defence
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
                Punia Associates provides structured legal assistance across criminal investigations, bail proceedings, Magistrate and Sessions trials, and High Court appellate revisions under the Code of Criminal Procedure, Bharatiya Nagarik Suraksha Sanhita, and special penal statutes.
              </p>
            </div>
          </div>
        </section>

        {/* Section 1: Overview of Services */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-md border border-amber-200">
                <ShieldAlert className="w-3.5 h-3.5" />
                Practice Scope
              </div>
              <h2 className="font-cormorant text-3xl sm:text-4xl font-bold text-[#0B1325]">
                Defence Representation from Investigation to Trial
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                In criminal jurisprudence, procedural precision and prompt courtroom intervention are vital to safeguarding personal liberty and ensuring constitutional protections under Articles 20, 21, and 22 of the Constitution of India. Our advocates represent clients at each critical juncture of a criminal case:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-base text-[#0B1325] mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    <span>Anticipatory Bail Advocacy</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Petitions under Section 438 CrPC / Section 482 BNSS before the Court of Session and Hon'ble High Courts. Preparation of alibi records, demonstrating non-custodial necessity, and securing interim protection against arrest.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-base text-[#0B1325] mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    <span>Regular Bail & Custody Relief</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Arguing bail petitions under Section 437/439 CrPC / Section 483 BNSS. Scrutiny of charge-sheets, default bail under Section 167(2) CrPC, and medical/interim bail applications.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-base text-[#0B1325] mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    <span>FIR Quashing & Writ Remedies</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Challenging malicious or civil disputes masquerading as criminal offences under Section 482 CrPC before the High Courts at Chandigarh, Prayagraj, Jaipur, and Delhi.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-base text-[#0B1325] mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    <span>Trial Defense & Evidence Appraisal</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Comprehensive courtroom defence during charge framing, cross-examination of prosecution witnesses, electronic evidence admissibility (Section 65B), and final defense arguments.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Consultation Sidebar */}
            <div className="lg:col-span-4 bg-white p-6 rounded-xl border border-slate-200 shadow-md">
              <h3 className="font-cormorant text-2xl font-bold text-[#0B1325] mb-2">
                Emergency Criminal Helpline
              </h3>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                If an FIR has been registered or arrest is imminent, time is critical. Speak with our criminal desk for preliminary guidance.
              </p>

              <div className="space-y-3 mb-6 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-600">Urgent Bail Desk:</span>
                  <a href={`tel:${FIRM_INFO.helplinePhone}`} className="font-bold text-amber-600">{FIRM_INFO.helplinePhone}</a>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-600">Secondary Helpline:</span>
                  <a href={`tel:${FIRM_INFO.secondaryPhone}`} className="font-bold text-amber-600">{FIRM_INFO.secondaryPhone}</a>
                </div>
              </div>

              <button
                onClick={() => onOpenConsultation('Criminal Law', 'Haryana')}
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-[#0B1325] text-xs font-bold rounded-lg transition-colors shadow flex items-center justify-center gap-2 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Request Case Evaluation</span>
              </button>

              <div className="mt-4 pt-4 border-t border-slate-100 text-[11px] text-slate-400 text-center">
                Strict client confidentiality is maintained for all inquiries.
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Criminal Procedure Breakdown */}
        <section className="py-16 bg-slate-100 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-3 py-1 rounded-md">
                Legal Process Explained
              </span>
              <h2 className="font-cormorant text-3xl sm:text-4xl font-bold text-[#0B1325] mt-3">
                Stages of Criminal Proceedings in India
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                Understanding each phase of the criminal legal system helps individuals and families navigate judicial steps calmly and effectively.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Stage 1</span>
                <h3 className="font-bold text-base text-[#0B1325] mt-3 mb-2">FIR & Investigation</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Registration of FIR under Section 154 CrPC, witness statements under Section 161, collection of forensic evidence, and notice to appear or arrest.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Stage 2</span>
                <h3 className="font-bold text-base text-[#0B1325] mt-3 mb-2">Bail & Custody Hearings</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Moving remand opposition, regular bail under Section 437/439, or anticipatory bail before the Sessions Court and High Court.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Stage 3</span>
                <h3 className="font-bold text-base text-[#0B1325] mt-3 mb-2">Charge Framing & Trial</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Police report under Section 173 (Charge-sheet), argument on charge/discharge, examination and cross-examination of prosecution witnesses (Pws).
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Stage 4</span>
                <h3 className="font-bold text-base text-[#0B1325] mt-3 mb-2">Final Defense & Appeals</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Accused statement under Section 313, defense evidence, final arguments, judgment, and appellate remedies before the High Court and Supreme Court.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Statutory FAQs */}
        <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-md border border-amber-200">
              Frequently Asked Questions
            </span>
            <h2 className="font-cormorant text-3xl sm:text-4xl font-bold text-[#0B1325] mt-3">
              Criminal Law Inquiries
            </h2>
          </div>

          <div className="space-y-4">
            {criminalFaqs.map((faq, index) => (
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
              Preliminary Case Review
            </span>
            <h2 className="font-cormorant text-3xl sm:text-4xl font-bold mb-4">
              Discuss Your Criminal Law Matter with Counsel
            </h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto mb-8 font-light">
              Connect with our criminal defence team for a factual evaluation of your FIR, bail status, or courtroom trial requirements.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onOpenConsultation('Criminal Defence')}
                className="w-full sm:w-auto px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-[#0B1325] font-bold text-sm rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-[#0B1325]" />
                <span>Consult on Criminal Matter</span>
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

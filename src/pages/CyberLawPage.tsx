import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Lock, 
  ShieldAlert, 
  FileCheck, 
  Scale, 
  CheckCircle2, 
  PhoneCall, 
  ArrowRight, 
  ChevronDown, 
  Sparkles,
  Server,
  AlertTriangle
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { FIRM_INFO } from '../data/legalData';

interface CyberLawPageProps {
  onOpenConsultation: (category?: string, state?: string) => void;
}

export const CyberLawPage: React.FC<CyberLawPageProps> = ({ onOpenConsultation }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const cyberFaqs = [
    {
      q: "What should be the immediate steps taken after falling victim to digital financial fraud?",
      a: "1. Immediately call the National Cyber Crime Helpline at 1930 and register an intimation with your bank to freeze recipient beneficiary accounts; 2. File a formal complaint on cybercrime.gov.in within 24 hours; 3. Preserve transaction IDs, SMS alerts, and WhatsApp chats; 4. Approach the Cyber Crime Police Station with legal counsel for FIR registration."
    },
    {
      q: "What is an Electronic Evidence Certificate under Section 65B of the Indian Evidence Act / Section 63 of Bharatiya Sakshya Adhiniyam (BSA)?",
      a: "Indian courts require an electronic record (emails, WhatsApp transcripts, server logs, CCTV footage) to be accompanied by a statutory certificate signed by a person occupying a responsible official position in relation to the operation of the relevant computer device, certifying authenticity and lack of tampering."
    },
    {
      q: "Can social media intermediaries be compelled to remove defamatory or obscene digital content?",
      a: "Yes. Under Section 79 of the Information Technology Act and the Intermediary Guidelines Rules 2021, an intermediary must take down unlawful content within 36 hours upon receiving a court order or authorized governmental notification, failing which they lose their safe harbour immunity."
    },
    {
      q: "What penal provisions apply to unauthorized access and digital impersonation?",
      a: "Section 43 and Section 66 of the IT Act penalize hacking, damage to computer systems, and data theft with imprisonment up to 3 years and compensation. Section 66C and 66D penalize identity theft and cheating by personation using a computer resource with imprisonment up to 3 years."
    }
  ];

  return (
    <>
      <SEOHead
        title="Cyber Law & Digital Crime Lawyers | Punia Associates"
        description="Legal assistance for cyber crimes, digital fraud, data privacy, IT Act violations and electronic evidence matters across India."
        canonicalPath="/cyber-law"
        schemaData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Cyber Law & Digital Crimes",
          "url": "https://puniaassociates.site/cyber-law",
          "description": "Legal assistance for cyber crimes, digital fraud, data privacy, IT Act violations and electronic evidence matters across India.",
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
        { name: 'Cyber Law & Digital Crimes', url: '/cyber-law' }
      ]} />

      <main className="bg-[#F8F9FA] text-[#1E293B]">
        {/* Header Hero */}
        <section className="bg-[#0B1325] text-white py-16 sm:py-20 border-b border-slate-800 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30 tracking-wide uppercase font-mono mb-4">
                Information Technology & Digital Forensics Practice
              </span>
              <h1 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
                Cyber Law & Digital Crimes
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
                Punia Associates delivers experienced legal counsel for victims and corporate entities navigating digital fraud, unauthorized banking transactions, electronic evidence admissibility, cyber stalking, and statutory compliance under the Information Technology Act 2000.
              </p>
            </div>
          </div>
        </section>

        {/* Practice Scope */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-md border border-amber-200">
                <Lock className="w-3.5 h-3.5" />
                Cyber Practice Verticals
              </div>
              <h2 className="font-cormorant text-3xl sm:text-4xl font-bold text-[#0B1325]">
                Digital Forensic Advocacy & Statutory Protection
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                As commercial transactions and personal communications transition online, cyber offences require a combination of legal acumen and technical understanding of electronic trails, IP headers, CDRs, and banking protocols. Our advocates assist in:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-base text-[#0B1325] mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    <span>Financial Cyber Fraud & Banking Recovery</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Legal representation for unauthorized UPI debits, phishing, SIM swap, and investment scams. Interfacing with banking ombudsmen and cyber police to secure lien markings on stolen funds.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-base text-[#0B1325] mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    <span>Digital Evidence Certification (Sec 65B)</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Drafting certificates under Section 65B Evidence Act / Section 63 BSA to ensure emails, WhatsApp chats, server logs, and audio/video records are admissible in civil and criminal trials.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-base text-[#0B1325] mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    <span>Online Defamation & Intermediary Takedowns</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Serving takedown notices under Section 79 IT Act to social media platforms, Google, and hosting providers for malicious content, morphing, and non-consensual imagery.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-base text-[#0B1325] mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    <span>Cyber Crime Police Station Coordination</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Drafting detailed complaints for Cyber Crime Police Stations in Gurugram, Noida, Jaipur, and Delhi, following up on FIR registration, CDR preservation, and court remand hearings.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 bg-white p-6 rounded-xl border border-slate-200 shadow-md">
              <h3 className="font-cormorant text-2xl font-bold text-[#0B1325] mb-2">
                Cyber Incident Desk
              </h3>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                Victim of digital fraud or facing cyber allegations? Prompt preservation of electronic logs is essential.
              </p>

              <div className="space-y-3 mb-6 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-600">Cyber Crime Desk:</span>
                  <a href={`tel:${FIRM_INFO.helplinePhone}`} className="font-bold text-amber-600">{FIRM_INFO.helplinePhone}</a>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-600">IT Act Counsel:</span>
                  <a href={`tel:${FIRM_INFO.secondaryPhone}`} className="font-bold text-amber-600">{FIRM_INFO.secondaryPhone}</a>
                </div>
              </div>

              <button
                onClick={() => onOpenConsultation('Cyber Law')}
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-[#0B1325] text-xs font-bold rounded-lg transition-colors shadow flex items-center justify-center gap-2 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Evaluate Cyber Matter</span>
              </button>

              <div className="mt-4 pt-4 border-t border-slate-100 text-[11px] text-slate-400 text-center">
                Advice on evidence preservation & portal filing.
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Victim Response Protocol */}
        <section className="py-16 bg-slate-100 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-3 py-1 rounded-md">
                Emergency Action Protocol
              </span>
              <h2 className="font-cormorant text-3xl sm:text-4xl font-bold text-[#0B1325] mt-3">
                First 24 Hours Following a Digital Crime
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                Rapid action within the initial hours significantly improves the likelihood of freezing transferred funds and tracing perpetrators.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Hour 01</span>
                <h3 className="font-bold text-base text-[#0B1325] mt-3 mb-2">1930 Intimation</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Call the Citizen Financial Cyber Fraud Reporting helpline (1930) immediately to trigger inter-bank lien marking on beneficiary accounts.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Hour 03</span>
                <h3 className="font-bold text-base text-[#0B1325] mt-3 mb-2">Evidence Preservation</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Capture full screenshots of chats, transaction alerts, UPI reference numbers, and email headers before records are erased by perpetrators.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Hour 12</span>
                <h3 className="font-bold text-base text-[#0B1325] mt-3 mb-2">Portal Lodging</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Submit a formal complaint on the National Cyber Crime Portal (cybercrime.gov.in) with uploaded evidentiary exhibits.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Hour 24</span>
                <h3 className="font-bold text-base text-[#0B1325] mt-3 mb-2">FIR & Police Action</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Approach the jurisdictional Cyber Crime Police Station with legal representation for formal registration of an FIR under the IT Act and BNS.
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
              Cyber Law Inquiries
            </h2>
          </div>

          <div className="space-y-4">
            {cyberFaqs.map((faq, index) => (
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
              Cyber Law Counsel
            </span>
            <h2 className="font-cormorant text-3xl sm:text-4xl font-bold mb-4">
              Consult on Digital Crimes & Electronic Evidence Matters
            </h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto mb-8 font-light">
              Connect with our cyber law practice for technical guidance on evidence certification, digital takedowns, or banking fraud recovery.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onOpenConsultation('Cyber Law')}
                className="w-full sm:w-auto px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-[#0B1325] font-bold text-sm rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-[#0B1325]" />
                <span>Consult Cyber Law Advocate</span>
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

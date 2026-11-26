import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Scale, 
  ShieldCheck, 
  Award, 
  Users, 
  Building2, 
  Gavel, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  PhoneCall, 
  MapPin, 
  Clock, 
  FileCheck,
  Sparkles
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { FIRM_INFO, NETWORK_ADVOCATES } from '../data/legalData';

interface AboutPageProps {
  onOpenConsultation: (category?: string, state?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenConsultation }) => {
  return (
    <>
      <SEOHead
        title="About Punia Associates | Law Firm & Legal Services"
        description="Learn about Punia Associates, our legal approach, areas of practice and professional services for individuals, businesses and organizations."
        canonicalPath="/about"
        schemaData={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About Punia Associates",
          "url": "https://puniaassociates.site/about",
          "description": "Learn about Punia Associates, our legal approach, areas of practice and professional services for individuals, businesses and organizations.",
          "mainEntity": {
            "@type": "LegalService",
            "name": "Punia Associates",
            "url": "https://puniaassociates.site/",
            "telephone": "+91-9053281218",
            "email": "counsel@puniaassociates.site"
          }
        }}
      />

      <Breadcrumbs items={[{ name: 'About Punia Associates', url: '/about' }]} />

      <main className="bg-[#F8F9FA] text-[#1E293B]">
        {/* Page Hero Header */}
        <section className="bg-[#0B1325] text-white py-16 sm:py-20 border-b border-slate-800 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30 tracking-wide uppercase font-mono mb-4">
                Professional Profile & Firm Ethos
              </span>
              <h1 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
                About Punia Associates
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
                Punia Associates is a law firm and professional advocate network providing comprehensive legal counsel, strategic dispute resolution, and trial representation before the Supreme Court of India, State High Courts, and District Jurisdictions.
              </p>
            </div>
          </div>
        </section>

        {/* Section 1: Who Punia Associates Is */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-md border border-amber-200">
                <Scale className="w-3.5 h-3.5" />
                Firm Identity & Heritage
              </div>
              <h2 className="font-cormorant text-3xl sm:text-4xl font-bold text-[#0B1325]">
                A Modern Law Practice Built on Courtroom Standing & Integrity
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Established with a vision to deliver rigorous and ethical legal representation, Punia Associates unites senior advocates, experienced litigators, and subject-matter consultants across northern India. Our chambers bridge the gap between high-level appellate practice before the High Courts and granular procedural representation in district courts and specialized tribunals.
              </p>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Whether representing private individuals confronting criminal investigations, families navigating sensitive matrimonial disputes, landowners securing title against encroachment, or enterprises enforcing commercial covenants, our advocates apply deep statutory knowledge and meticulous preparation.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-sm text-[#0B1325]">Multi-Jurisdiction Reach</h3>
                    <p className="text-xs text-slate-500 mt-1">Coordinated representation across Haryana, Uttar Pradesh, Rajasthan, and New Delhi.</p>
                  </div>
                </div>
                <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-sm text-[#0B1325]">Trial & Appellate Depth</h3>
                    <p className="text-xs text-slate-500 mt-1">Direct trial advocacy in Sessions Courts up to Special Leave Petitions in the Supreme Court.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#0B1325] text-white p-8 rounded-xl border border-slate-800 shadow-xl relative">
              <div className="absolute top-4 right-4 w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-cormorant text-2xl font-bold text-white mb-4">
                Core Foundations
              </h3>
              <ul className="space-y-4 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span><strong>Statutory Diligence:</strong> Every brief is analyzed through current statutory amendments, procedural codes, and binding judicial precedents.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span><strong>Client Confidentiality:</strong> Complete privilege and institutional privacy for all documentation, communications, and strategy deliberations.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span><strong>Ethical Retainers:</strong> Transparent, milestone-structured fee proposals with zero hidden costs or misleading outcome promises.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span><strong>Bar Council Compliance:</strong> Strict adherence to the ethical standards promulgated by the Bar Council of India.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: Firm's Legal Approach */}
        <section className="py-16 bg-slate-100 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-100/70 px-3 py-1 rounded-md">
                Methodology & Practice
              </span>
              <h2 className="font-cormorant text-3xl sm:text-4xl font-bold text-[#0B1325] mt-3">
                Our Legal Approach
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-3">
                Legal problems rarely exist in isolation. Our practice employs a systematic four-stage methodology to ensure every client matter is thoroughly prepared for negotiation or contested trial.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold text-lg mb-4">
                  01
                </div>
                <h3 className="font-bold text-base text-[#0B1325] mb-2">Preliminary Evidence Audit</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We review primary records—police notices, FIRs, title deeds, contracts, or bank statements—to assess statutory merits, limitation periods, and immediate exposure.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold text-lg mb-4">
                  02
                </div>
                <h3 className="font-bold text-base text-[#0B1325] mb-2">Strategic Case Formulation</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our advocates formulate multi-forum strategy, deciding whether to pursue interim injunctions, file quashing petitions, invoke arbitration, or initiate consumer redressal.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold text-lg mb-4">
                  03
                </div>
                <h3 className="font-bold text-base text-[#0B1325] mb-2">Courtroom Advocacy</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Pleadings, plaints, and bail applications are drafted with precise legal grounds. Senior advocates present oral arguments in court with evidentiary mastery.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold text-lg mb-4">
                  04
                </div>
                <h3 className="font-bold text-base text-[#0B1325] mb-2">Execution & Appellate Follow-Through</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Relief secured in court is enforced through execution proceedings, while adverse orders are evaluated immediately for appeal, revision, or writ petitions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Professional Values */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-md border border-amber-200">
              Guiding Principles
            </span>
            <h2 className="font-cormorant text-3xl sm:text-4xl font-bold text-[#0B1325] mt-3">
              Professional Values
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Our firm operates on foundational standards of professional discipline that protect our clients and maintain institutional honor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-slate-900 text-amber-400 flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0B1325] mb-2">Factual Honesty</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We provide candid, objective assessments of legal positions. We do not make false promises of guaranteed verdicts or mislead clients on prospects of success.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-slate-900 text-amber-400 flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0B1325] mb-2">Judicial Respect</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We uphold the dignity of the courts, adhering strictly to procedural decorum, bar ethics, and statutory guidelines in all submissions and conduct.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-slate-900 text-amber-400 flex items-center justify-center mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0B1325] mb-2">Accessible Counsel</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Clients receive continuous updates on court hearing dates, orders, and strategic choices. We explain intricate legal nuances in clear, transparent language.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Areas of Legal Work & Jurisdictions Served */}
        <section className="py-16 bg-[#0B1325] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
                  Scope of Practice
                </span>
                <h2 className="font-cormorant text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
                  Areas of Legal Work
                </h2>
                <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                  Our practice encompasses nine principal legal verticals, each supported by experienced advocates who specialize in the applicable statutory codes:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-200">
                  <Link to="/criminal-law" className="p-3 bg-slate-900/80 rounded border border-slate-800 hover:border-amber-500/50 transition-colors flex items-center justify-between">
                    <span>Criminal Law & Bail</span>
                    <ArrowRight className="w-4 h-4 text-amber-400" />
                  </Link>
                  <Link to="/civil-law" className="p-3 bg-slate-900/80 rounded border border-slate-800 hover:border-amber-500/50 transition-colors flex items-center justify-between">
                    <span>Civil Law & Litigation</span>
                    <ArrowRight className="w-4 h-4 text-amber-400" />
                  </Link>
                  <Link to="/family-law" className="p-3 bg-slate-900/80 rounded border border-slate-800 hover:border-amber-500/50 transition-colors flex items-center justify-between">
                    <span>Family & Matrimonial</span>
                    <ArrowRight className="w-4 h-4 text-amber-400" />
                  </Link>
                  <Link to="/property-law" className="p-3 bg-slate-900/80 rounded border border-slate-800 hover:border-amber-500/50 transition-colors flex items-center justify-between">
                    <span>Property & Land Disputes</span>
                    <ArrowRight className="w-4 h-4 text-amber-400" />
                  </Link>
                  <Link to="/corporate-law" className="p-3 bg-slate-900/80 rounded border border-slate-800 hover:border-amber-500/50 transition-colors flex items-center justify-between">
                    <span>Corporate & Commercial</span>
                    <ArrowRight className="w-4 h-4 text-amber-400" />
                  </Link>
                  <Link to="/constitutional-law" className="p-3 bg-slate-900/80 rounded border border-slate-800 hover:border-amber-500/50 transition-colors flex items-center justify-between">
                    <span>Constitutional Writs</span>
                    <ArrowRight className="w-4 h-4 text-amber-400" />
                  </Link>
                  <Link to="/consumer-law" className="p-3 bg-slate-900/80 rounded border border-slate-800 hover:border-amber-500/50 transition-colors flex items-center justify-between">
                    <span>Consumer Protection</span>
                    <ArrowRight className="w-4 h-4 text-amber-400" />
                  </Link>
                  <Link to="/cyber-law" className="p-3 bg-slate-900/80 rounded border border-slate-800 hover:border-amber-500/50 transition-colors flex items-center justify-between">
                    <span>Cyber Law & Crimes</span>
                    <ArrowRight className="w-4 h-4 text-amber-400" />
                  </Link>
                  <Link to="/legal-notices" className="p-3 bg-slate-900/80 rounded border border-slate-800 hover:border-amber-500/50 transition-colors flex items-center justify-between col-span-full">
                    <span>Legal Notices & Documentation Services</span>
                    <ArrowRight className="w-4 h-4 text-amber-400" />
                  </Link>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
                  Jurisdictional Footprint
                </span>
                <h2 className="font-cormorant text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
                  Courts Actually Served
                </h2>
                <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                  Our advocates maintain direct enrollment and active appearance records across the following major judicial institutions:
                </p>
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="p-3.5 bg-slate-900/90 rounded border border-slate-800">
                    <div className="font-bold text-amber-300">Apex Court</div>
                    <div className="text-slate-400 mt-0.5">Supreme Court of India, New Delhi (SLPs, Transfer Petitions & Writs)</div>
                  </div>
                  <div className="p-3.5 bg-slate-900/90 rounded border border-slate-800">
                    <div className="font-bold text-amber-300">State High Courts</div>
                    <div className="text-slate-400 mt-0.5">Punjab & Haryana High Court (Chandigarh) • Allahabad High Court (Prayagraj & Lucknow) • Rajasthan High Court (Jodhpur & Jaipur) • Delhi High Court</div>
                  </div>
                  <div className="p-3.5 bg-slate-900/90 rounded border border-slate-800">
                    <div className="font-bold text-amber-300">District & Sessions Courts</div>
                    <div className="text-slate-400 mt-0.5">Gurugram, Faridabad, Rohtak, Gautam Buddha Nagar (Greater Noida), Ghaziabad, Meerut, Jaipur, Jodhpur, and all Delhi District Courts</div>
                  </div>
                  <div className="p-3.5 bg-slate-900/90 rounded border border-slate-800">
                    <div className="font-bold text-amber-300">Statutory Tribunals</div>
                    <div className="text-slate-400 mt-0.5">NCLT & NCLAT, HRERA Gurugram, UP RERA, Raj RERA, CAT, and State/National Consumer Commissions</div>
                  </div>
                </div>
                <div className="mt-4">
                  <Link to="/courts" className="text-xs text-amber-400 hover:underline font-bold inline-flex items-center gap-1">
                    <span>View complete jurisdictional directory & chambers</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Professional Team Overview */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-md border border-amber-200">
                Advocate Network
              </span>
              <h2 className="font-cormorant text-3xl sm:text-4xl font-bold text-[#0B1325] mt-3">
                Professional Leadership
              </h2>
              <p className="text-slate-600 text-sm mt-1">
                Meet the experienced advocates coordinating regional chambers and court representation.
              </p>
            </div>
            <Link 
              to="/lawyers" 
              className="text-xs font-bold text-amber-600 hover:text-amber-700 inline-flex items-center gap-1.5"
            >
              <span>Explore All Advocates</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {NETWORK_ADVOCATES.slice(0, 3).map((adv) => (
              <div key={adv.id} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {adv.state}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {adv.experienceYears} Years Standing
                  </span>
                </div>
                <h3 className="font-bold text-lg text-[#0B1325]">
                  {adv.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 mb-3">
                  {adv.designation}
                </p>
                <div className="text-xs text-slate-600 border-t border-slate-100 pt-3 space-y-1">
                  <div><strong>Court:</strong> {adv.primaryCourt}</div>
                  <div><strong>Bar Enrollment:</strong> {adv.barEnrollment}</div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">{adv.phone}</span>
                  <button 
                    onClick={() => onOpenConsultation(adv.specialization[0], adv.state)}
                    className="text-xs font-bold text-amber-600 hover:text-amber-700"
                  >
                    Consult Advocate
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: Consultation Call to Action */}
        <section className="bg-gradient-to-r from-[#0B1325] via-[#111c38] to-[#0B1325] text-white py-16 border-t border-slate-800">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30 tracking-wide uppercase font-mono mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Preliminary Case Evaluation
            </span>
            <h2 className="font-cormorant text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Discuss Your Legal Matter with Punia Associates
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 font-light">
              Connect with an advocate in your jurisdiction for a factual review of your documents, summons, FIR, or contractual dispute.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onOpenConsultation()}
                className="w-full sm:w-auto px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-[#0B1325] font-bold text-sm rounded-lg transition-colors shadow-lg cursor-pointer flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-[#0B1325]" />
                <span>Request Case Consultation</span>
              </button>
              <Link
                to="/contact"
                className="w-full sm:w-auto px-8 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm rounded-lg border border-slate-700 transition-colors text-center"
              >
                Chambers Directory & Helplines
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

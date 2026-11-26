import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  ShieldCheck, 
  Scale, 
  CheckCircle2, 
  PhoneCall, 
  ArrowRight, 
  ChevronDown, 
  Sparkles,
  AlertCircle,
  FileText
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { FIRM_INFO } from '../data/legalData';

interface ConsumerLawPageProps {
  onOpenConsultation: (category?: string, state?: string) => void;
}

export const ConsumerLawPage: React.FC<ConsumerLawPageProps> = ({ onOpenConsultation }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const consumerFaqs = [
    {
      q: "What is the pecuniary jurisdiction of Consumer Commissions under the Consumer Protection Act 2019?",
      a: "Under the CPA 2019, District Consumer Disputes Redressal Commissions (DCDRC) handle claims where the value of goods or services paid does not exceed ₹50 Lakhs. State Commissions (SCDRC) handle claims between ₹50 Lakhs and ₹2 Crores. The National Consumer Commission (NCDRC) in New Delhi hears original complaints exceeding ₹2 Crores."
    },
    {
      q: "Can a homebuyer file a consumer complaint for delayed flat possession?",
      a: "Yes. Homebuyers are recognized as consumers under the CPA 2019. The Supreme Court has affirmed that buyers can seek relief before Consumer Commissions concurrently with RERA remedies, claiming refund of money with interest or compensation for deficiency of service due to prolonged project delay."
    },
    {
      q: "What remedies exist against insurance companies repudiating genuine claims?",
      a: "When an insurance company wrongfully rejects health, motor, fire, or life insurance claims citing vague pre-existing clauses or delayed intimation, a consumer complaint can be filed to recover the full claim amount along with interest and damages for mental harassment."
    },
    {
      q: "Is sending a legal notice mandatory before filing a consumer complaint?",
      a: "While the Consumer Protection Act does not strictly mandate a formal notice, serving a clear 15-to-30-day legal notice is standard procedural best practice. It provides the opposite party a statutory opportunity to rectify the deficiency and serves as key documentary proof of demand."
    }
  ];

  return (
    <>
      <SEOHead
        title="Consumer Law & Consumer Disputes | Punia Associates"
        description="Legal assistance for consumer disputes, complaints, defective products, deficient services, unfair trade practices and consumer court representation."
        canonicalPath="/consumer-law"
        schemaData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Consumer Law & Consumer Disputes",
          "url": "https://puniaassociates.site/consumer-law",
          "description": "Legal assistance for consumer disputes, complaints, defective products, deficient services, unfair trade practices and consumer court representation.",
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
        { name: 'Consumer Law & Consumer Disputes', url: '/consumer-law' }
      ]} />

      <main className="bg-[#F8F9FA] text-[#1E293B]">
        {/* Header Hero */}
        <section className="bg-[#0B1325] text-white py-16 sm:py-20 border-b border-slate-800 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30 tracking-wide uppercase font-mono mb-4">
                Consumer Protection & Redressal Practice
              </span>
              <h1 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
                Consumer Law & Consumer Disputes
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
                Punia Associates delivers structured representation before District, State, and National Consumer Disputes Redressal Commissions (NCDRC), holding negligent service providers, insurance companies, real estate developers, and manufacturers accountable under the Consumer Protection Act 2019.
              </p>
            </div>
          </div>
        </section>

        {/* Practice Scope */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-md border border-amber-200">
                <ShoppingBag className="w-3.5 h-3.5" />
                Consumer Redressal Verticals
              </div>
              <h2 className="font-cormorant text-3xl sm:text-4xl font-bold text-[#0B1325]">
                Compensation & Relief for Consumer Grievances
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                The Consumer Protection Act 2019 provides robust statutory remedies to consumers suffering from deficient services, defective merchandise, misleading advertisements, and restrictive business practices. Our consumer litigation advocates represent complainants in:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-base text-[#0B1325] mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    <span>Insurance Claim Repudiation</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Challenging arbitrary claim rejections by life, health, motor, fire, and commercial marine insurers, securing full claim settlements with penal interest.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-base text-[#0B1325] mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    <span>Real Estate & Homebuyer Grievances</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Representing apartment allottees before State Commissions and NCDRC for prolonged possession delays, unilateral cost escalations, and project specification deviations.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-base text-[#0B1325] mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    <span>Defective Products & Product Liability</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Proceedings against manufacturers and sellers for hazardous goods, automobile manufacturing defects, electronic malfunctions, and product liability damages.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-base text-[#0B1325] mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    <span>Banking, Telecom & E-Commerce</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Actions against unauthorized bank charges, digital transaction failures, deficient telecom services, and online marketplace non-refund practices.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 bg-white p-6 rounded-xl border border-slate-200 shadow-md">
              <h3 className="font-cormorant text-2xl font-bold text-[#0B1325] mb-2">
                Consumer Grievance Intake
              </h3>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                Have you suffered financial loss due to a deficient service or defective product? Speak with our consumer court team.
              </p>

              <div className="space-y-3 mb-6 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-600">Consumer Helpline:</span>
                  <a href={`tel:${FIRM_INFO.helplinePhone}`} className="font-bold text-amber-600">{FIRM_INFO.helplinePhone}</a>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-600">NCDRC Bench Desk:</span>
                  <a href={`tel:${FIRM_INFO.secondaryPhone}`} className="font-bold text-amber-600">{FIRM_INFO.secondaryPhone}</a>
                </div>
              </div>

              <button
                onClick={() => onOpenConsultation('Consumer Law')}
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-[#0B1325] text-xs font-bold rounded-lg transition-colors shadow flex items-center justify-center gap-2 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Evaluate Consumer Complaint</span>
              </button>

              <div className="mt-4 pt-4 border-t border-slate-100 text-[11px] text-slate-400 text-center">
                Preparation of pre-litigation legal notice & Commission filing.
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Consumer Commission Hierarchy */}
        <section className="py-16 bg-slate-100 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-3 py-1 rounded-md">
                Three-Tier Forum Structure
              </span>
              <h2 className="font-cormorant text-3xl sm:text-4xl font-bold text-[#0B1325] mt-3">
                Where Is Your Consumer Complaint Filed?
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                Under Section 34, 47, and 58 of the Consumer Protection Act 2019, jurisdiction is determined by the consideration paid:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Tier 1</span>
                <h3 className="font-bold text-base text-[#0B1325] mt-3 mb-1">District Commission (DCDRC)</h3>
                <div className="text-xs font-semibold text-amber-600 mb-3">Claims up to ₹50 Lakhs</div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Located in every district headquarters (e.g. Gurugram, Gautam Buddha Nagar, Jaipur, New Delhi). Handles everyday retail, banking, medical, and local service disputes.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Tier 2</span>
                <h3 className="font-bold text-base text-[#0B1325] mt-3 mb-1">State Commission (SCDRC)</h3>
                <div className="text-xs font-semibold text-amber-600 mb-3">Claims from ₹50 Lakhs to ₹2 Crores</div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Located in state capitals (Chandigarh, Lucknow, Jaipur, Delhi). Original jurisdiction for high-value disputes and appellate review of District Commission orders.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Tier 3</span>
                <h3 className="font-bold text-base text-[#0B1325] mt-3 mb-1">National Commission (NCDRC)</h3>
                <div className="text-xs font-semibold text-amber-600 mb-3">Claims Exceeding ₹2 Crores</div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Apex consumer tribunal situated at Upbhokta Nyay Bhawan, New Delhi. Hears multi-crore real estate group complaints and first appeals from State Commissions.
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
              Consumer Law Inquiries
            </h2>
          </div>

          <div className="space-y-4">
            {consumerFaqs.map((faq, index) => (
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
              Consumer Complaint Consultation
            </span>
            <h2 className="font-cormorant text-3xl sm:text-4xl font-bold mb-4">
              Enforce Your Legal Rights as a Consumer
            </h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto mb-8 font-light">
              Connect with our consumer court team for an assessment of your insurance repudiation, delayed flat possession, or deficient service claim.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onOpenConsultation('Consumer Law')}
                className="w-full sm:w-auto px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-[#0B1325] font-bold text-sm rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-[#0B1325]" />
                <span>Consult Consumer Court Advocate</span>
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

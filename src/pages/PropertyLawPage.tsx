import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Landmark, 
  MapPin, 
  FileText, 
  Scale, 
  CheckCircle2, 
  PhoneCall, 
  ArrowRight, 
  ChevronDown, 
  Sparkles,
  Building,
  ShieldCheck
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { FIRM_INFO } from '../data/legalData';

interface PropertyLawPageProps {
  onOpenConsultation: (category?: string, state?: string) => void;
}

export const PropertyLawPage: React.FC<PropertyLawPageProps> = ({ onOpenConsultation }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const propertyFaqs = [
    {
      q: "What is the procedure for Partition of Agricultural Land in Haryana, UP, and Rajasthan?",
      a: "In Haryana, partition is governed by the Punjab Land Revenue Act 1887 (Sanad Takseem). In Uttar Pradesh, it is filed under Section 116 of the UP Revenue Code 2006 before the Sub-Divisional Officer (SDO). In Rajasthan, partition suits proceed under Section 53 of the Rajasthan Tenancy Act 1955. The revenue court demarcates Kurras (shares) and issues separate revenue entries."
    },
    {
      q: "What remedies exist if a builder delays possession of a residential flat?",
      a: "Homebuyers can file a formal complaint under Section 31 of RERA before HRERA (Gurugram/Panchkula), UP-RERA, or Raj-RERA. Under Section 18 of RERA, buyers are entitled to either immediate possession with monthly interest for delay (SBI MCLR + 2%) or a complete refund of deposited amounts along with prescribed interest and compensation."
    },
    {
      q: "How does one challenge a forged or fraudulent property sale deed?",
      a: "A civil suit for cancellation of sale deed under Section 31 of the Specific Relief Act must be filed within the 3-year statutory limitation period from the date of discovery. Simultaneously, an application for temporary injunction (Order 39 CPC) is moved to prevent subsequent sales."
    },
    {
      q: "What is revenue mutation (Dakhil Kharij / Jamabandi / Khatauni) and does it confer absolute title?",
      a: "Mutation is solely an administrative entry in revenue records for the fiscal purpose of collecting land revenue. The Supreme Court has repeatedly held that mutation does not create or extinguish proprietary title; civil court decrees on title supersede revenue entries."
    }
  ];

  return (
    <>
      <SEOHead
        title="Property Law & Property Dispute Lawyers | Punia Associates"
        description="Legal assistance for property disputes, ownership and title matters, partition, possession, documentation and related property issues."
        canonicalPath="/property-law"
        schemaData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Property Law & Property Disputes",
          "url": "https://puniaassociates.site/property-law",
          "description": "Legal assistance for property disputes, ownership and title matters, partition, possession, documentation and related property issues.",
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
        { name: 'Property Law & Property Disputes', url: '/property-law' }
      ]} />

      <main className="bg-[#F8F9FA] text-[#1E293B]">
        {/* Hero Banner */}
        <section className="bg-[#0B1325] text-white py-16 sm:py-20 border-b border-slate-800 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30 tracking-wide uppercase font-mono mb-4">
                Revenue & Real Estate Litigation
              </span>
              <h1 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
                Property Law & Property Disputes
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
                Punia Associates delivers experienced legal advocacy for agricultural land partition, revenue mutation, title conflicts, illegal dispossession, builder delay claims under RERA, and conveyance documentation across Haryana, UP, Rajasthan, and Delhi NCR.
              </p>
            </div>
          </div>
        </section>

        {/* Practice Scope */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-md border border-amber-200">
                <Landmark className="w-3.5 h-3.5" />
                Land & Real Estate Matters
              </div>
              <h2 className="font-cormorant text-3xl sm:text-4xl font-bold text-[#0B1325]">
                Safeguarding Land Rights & Real Estate Investments
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Property conflicts require mastery of both general civil statutes (Transfer of Property Act, Specific Relief Act) and specialized state land revenue enactments. Our advocates represent individuals, joint Hindu families, agriculturalists, and commercial developers in:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-base text-[#0B1325] mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    <span>Title & Ownership Declaration</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Filing suits for declaration of ownership under Section 34 Specific Relief Act, clearing clouds on title, and challenging fabricated or contested sale deeds.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-base text-[#0B1325] mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    <span>Agricultural Land Partition (Takseem)</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Division of ancestral agricultural holdings, demarcating distinct boundaries, and drafting Kurras under the Punjab Land Revenue Act, UP Revenue Code, and Rajasthan Tenancy Act.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-base text-[#0B1325] mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    <span>RERA Buyer-Builder Disputes</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Representation before HRERA Gurugram, UP RERA Greater Noida/Lucknow, and Raj RERA for delayed flat handovers, recovery of refunds with interest, and structural defects.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-base text-[#0B1325] mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    <span>Possession & Injunction Suits</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Restraining unauthorized encroachment or illegal demarcation under Order 39 CPC, and recovering lawful possession from unauthorized occupants or defaulting tenants.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 bg-white p-6 rounded-xl border border-slate-200 shadow-md">
              <h3 className="font-cormorant text-2xl font-bold text-[#0B1325] mb-2">
                Property Legal Assessment
              </h3>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                Bring your Jamabandi, Khatauni, registry copy, or builder buyer agreement for verified statutory review.
              </p>

              <div className="space-y-3 mb-6 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-600">Land Revenue Desk:</span>
                  <a href={`tel:${FIRM_INFO.helplinePhone}`} className="font-bold text-amber-600">{FIRM_INFO.helplinePhone}</a>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-600">Real Estate / RERA:</span>
                  <a href={`tel:${FIRM_INFO.secondaryPhone}`} className="font-bold text-amber-600">{FIRM_INFO.secondaryPhone}</a>
                </div>
              </div>

              <button
                onClick={() => onOpenConsultation('Property Law')}
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-[#0B1325] text-xs font-bold rounded-lg transition-colors shadow flex items-center justify-center gap-2 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Evaluate Property Documents</span>
              </button>

              <div className="mt-4 pt-4 border-t border-slate-100 text-[11px] text-slate-400 text-center">
                Review conducted by practicing High Court & revenue counsel.
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Revenue Hierarchy */}
        <section className="py-16 bg-slate-100 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-3 py-1 rounded-md">
                Revenue Jurisdiction Hierarchy
              </span>
              <h2 className="font-cormorant text-3xl sm:text-4xl font-bold text-[#0B1325] mt-3">
                Appellate Ladder in Land Revenue Disputes
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                Understanding how orders of revenue authorities can be challenged through statutory appeals and revisions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Tier 1</span>
                <h3 className="font-bold text-base text-[#0B1325] mt-3 mb-2">Tehsildar & SDO / SDM</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Original court for mutation (Section 34/35), boundary demarcation (Section 24), and initial agricultural partition suits.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Tier 2</span>
                <h3 className="font-bold text-base text-[#0B1325] mt-3 mb-2">Collector / District Magistrate</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  First appellate authority reviewing orders of the Sub-Divisional Officer concerning land records and revenue collections.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Tier 3</span>
                <h3 className="font-bold text-base text-[#0B1325] mt-3 mb-2">Divisional Commissioner</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Hearing revenue appeals and revisions against orders passed by District Collectors and settlement officers.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Tier 4</span>
                <h3 className="font-bold text-base text-[#0B1325] mt-3 mb-2">Board of Revenue & High Court</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Apex revenue revision bench (e.g. Board of Revenue Ajmer / Lucknow / Chandigarh) followed by writ jurisdiction under Article 226 in the High Court.
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
              Property & Land Inquiries
            </h2>
          </div>

          <div className="space-y-4">
            {propertyFaqs.map((faq, index) => (
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
              Chambers Property Evaluation
            </span>
            <h2 className="font-cormorant text-3xl sm:text-4xl font-bold mb-4">
              Resolve Your Property or Land Revenue Dispute
            </h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto mb-8 font-light">
              Connect with an experienced property litigation advocate for an analysis of your revenue records, deed documents, or RERA claim.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onOpenConsultation('Property Law')}
                className="w-full sm:w-auto px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-[#0B1325] font-bold text-sm rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-[#0B1325]" />
                <span>Consult Property Advocate</span>
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

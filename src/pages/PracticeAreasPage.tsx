import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldAlert, 
  Scale, 
  HeartHandshake, 
  Landmark, 
  Building, 
  Scroll, 
  ShoppingBag, 
  Lock, 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  PhoneCall, 
  Sparkles,
  BookOpen,
  Globe2,
  GitMerge
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';

interface PracticeAreasPageProps {
  onOpenConsultation: (category?: string, state?: string) => void;
}

interface PracticeDomain {
  id: string;
  title: string;
  slug: string;
  icon: React.ElementType;
  tagline: string;
  shortDesc: string;
  acts: string[];
  mattersHandled: string[];
  reliefType: string;
}

const PRACTICE_DOMAINS: PracticeDomain[] = [
  {
    id: "criminal-law",
    title: "Criminal Law & Criminal Defence",
    slug: "/criminal-law",
    icon: ShieldAlert,
    tagline: "Trial defense, emergency bail, quashing & appellate relief",
    shortDesc: "Comprehensive criminal defence advocacy before Sessions Courts, High Courts, and the Supreme Court of India. Representation in non-bailable warrants, police FIRs, regular bail, and anticipatory protection.",
    acts: ["Bharatiya Nagarik Suraksha Sanhita (BNSS) & CrPC", "Bharatiya Nyaya Sanhita (BNS) & IPC", "Narcotic Drugs and Psychotropic Substances (NDPS) Act", "POCSO Act", "Arms Act & Gangsters Act"],
    mattersHandled: [
      "Anticipatory bail applications under Section 438 CrPC / Section 482 BNSS",
      "Regular bail petitions in Sessions Courts & High Courts (Section 439 CrPC)",
      "FIR quashing petitions under Section 482 CrPC before State High Courts",
      "Trial representation, witness cross-examination & final arguments",
      "Private criminal complaints under Section 200 & Section 156(3) CrPC",
      "Criminal appeals against conviction & suspension of sentence",
    ],
    reliefType: "Personal Liberty, Pre-Arrest Protection & Trial Defense"
  },
  {
    id: "civil-law",
    title: "Civil Law & Civil Litigation",
    slug: "/civil-law",
    icon: Scale,
    tagline: "Civil disputes, recovery suits, injunctions & appeals",
    shortDesc: "Strategic civil litigation under the Code of Civil Procedure (CPC). Plaint drafting, defense written statements, injunction applications, specific performance suits, and appellate representation.",
    acts: ["Code of Civil Procedure 1908 (CPC)", "Indian Contract Act 1872", "Specific Relief Act 1963", "Limitation Act 1963", "Court Fees Act"],
    mattersHandled: [
      "Suits for declaration of title, civil rights & ownership status",
      "Temporary and permanent injunctions (Order 39 Rules 1 & 2 CPC)",
      "Money recovery suits & summary suits under Order 37 CPC",
      "Suits for specific performance of sale agreements",
      "First Appeals (Section 96 CPC) & Second Appeals (Section 100 CPC) in High Court",
      "Execution proceedings for enforcing decrees and attachment (Order 21 CPC)",
    ],
    reliefType: "Decree Enforcement, Monetary Recovery & Judicial Injunctions"
  },
  {
    id: "family-law",
    title: "Family Law & Matrimonial Matters",
    slug: "/family-law",
    icon: HeartHandshake,
    tagline: "Divorce, maintenance, child custody & domestic disputes",
    shortDesc: "Sensitive, confidential legal assistance for matrimonial disputes, mutual consent divorce, contested divorce, maintenance, and child custody arrangements with focus on negotiated settlements and court advocacy.",
    acts: ["Hindu Marriage Act 1955 (HMA)", "Special Marriage Act 1954", "Section 125 CrPC / BNSS (Maintenance)", "Protection of Women from Domestic Violence Act 2005", "Guardians and Wards Act 1890"],
    mattersHandled: [
      "Mutual consent divorce petitions under Section 13B (HMA)",
      "Contested divorce petitions on statutory grounds (Cruelty, Desertion)",
      "Interim & permanent maintenance applications (Sec 24 & 25 HMA, Sec 125 CrPC)",
      "Child custody, legal guardianship & visitation rights proceedings",
      "Defense against fabricated Section 498A IPC / BNS dowry complaints",
      "Domestic violence complaints, interim protection & residence orders",
    ],
    reliefType: "Marital Dissolution, Child Custody & Maintenance Orders"
  },
  {
    id: "property-law",
    title: "Property Law & Property Disputes",
    slug: "/property-law",
    icon: Landmark,
    tagline: "Agricultural partition, title disputes, mutation & tenancy",
    shortDesc: "Representation in land ownership conflicts, agricultural partition (Sanad Takseem / Gata partition), mutation errors, illegal possession, and real estate developer disputes across northern states.",
    acts: ["Punjab Land Revenue Act 1887 (Haryana)", "UP Revenue Code 2006", "Rajasthan Tenancy Act 1955", "Transfer of Property Act 1882", "Real Estate (Regulation and Development) Act (RERA)"],
    mattersHandled: [
      "Agricultural land partition suits among co-owners and legal heirs",
      "Revenue mutation (Khatauni / Jamabandi) rectification before Tehsildar & SDM",
      "Recovery of possession & tenancy eviction proceedings under Rent Control Acts",
      "Title investigation, due diligence & registry cancellation suits",
      "Injunction against unlawful demarcation or third-party alienation",
      "RERA builder-buyer dispute complaints (HRERA, UP RERA, Raj RERA)",
    ],
    reliefType: "Title Protection, Revenue Partition & Possession Recovery"
  },
  {
    id: "corporate-law",
    title: "Corporate & Commercial Law",
    slug: "/corporate-law",
    icon: Building,
    tagline: "Commercial contracts, arbitration, business disputes & recovery",
    shortDesc: "Legal counsel for companies, partnerships, startups, and commercial entities. Commercial dispute resolution, master agreement drafting, domestic arbitration, and NCLT corporate insolvency.",
    acts: ["Commercial Courts Act 2015", "Arbitration and Conciliation Act 1996", "Companies Act 2013", "Insolvency and Bankruptcy Code (IBC) 2016", "Negotiable Instruments Act (Section 138)"],
    mattersHandled: [
      "Drafting and review of vendor, distribution & master service agreements",
      "Commercial Court litigation for contractual breach & damages",
      "Arbitration invocations, interim measures (Section 9) & tribunal proceedings",
      "National Company Law Tribunal (NCLT) corporate insolvency applications",
      "Shareholder, partner & director dispute resolution",
      "Section 138 Negotiable Instruments Act financial recovery proceedings",
    ],
    reliefType: "Commercial Relief, Contract Enforcement & Financial Recovery"
  },
  {
    id: "constitutional-law",
    title: "Constitutional & Administrative Law",
    slug: "/constitutional-law",
    icon: Scroll,
    tagline: "High Court writ petitions, judicial review & fundamental rights",
    shortDesc: "Litigation challenging arbitrary government orders, administrative tribunal orders, discriminatory state actions, and fundamental rights violations under Articles 226 and 32.",
    acts: ["Constitution of India (Articles 14, 19, 21, 32, 226)", "Administrative Tribunals Act 1985", "Armed Forces Tribunal Act 2007", "Public Premises (Eviction of Unauthorised Occupants) Act"],
    mattersHandled: [
      "Writ Petitions (Mandamus, Certiorari, Habeas Corpus, Quo Warranto, Prohibition)",
      "Challenging arbitrary government tender cancellations and public contracts",
      "Central Administrative Tribunal (CAT) government employee service disputes",
      "Judicial review of statutory tribunal and regulatory authority orders",
      "Special Leave Petitions (SLPs) before the Supreme Court of India",
      "Fundamental rights enforcement against state instrumentalities",
    ],
    reliefType: "Constitutional Protection, Writ Issuance & Stay Orders"
  },
  {
    id: "consumer-law",
    title: "Consumer Law & Consumer Disputes",
    slug: "/consumer-law",
    icon: ShoppingBag,
    tagline: "Deficient services, defective products & unfair trade practices",
    shortDesc: "Representation before District, State, and National Consumer Disputes Redressal Commissions (DCDRC, SCDRC, NCDRC) against negligent service providers, insurers, and manufacturers.",
    acts: ["Consumer Protection Act 2019", "E-Commerce Rules 2020", "Insurance Regulatory and Development Authority (IRDAI) Regulations", "Bureau of Indian Standards Act"],
    mattersHandled: [
      "Insurance claim rejection complaints (Health, Life, Motor, Commercial Fire)",
      "Homebuyer deficiency claims for delayed real estate possession",
      "Defective product liability complaints against manufacturers and sellers",
      "Banking & financial institution deficiency proceedings",
      "Aviation, airline cancellation & travel service compensation claims",
      "Appeals & order execution proceedings before Consumer Commissions",
    ],
    reliefType: "Compensation, Service Rectification & Refund with Interest"
  },
  {
    id: "cyber-law",
    title: "Cyber Law & Digital Crimes",
    slug: "/cyber-law",
    icon: Lock,
    tagline: "Digital fraud, online harassment, electronic evidence & IT Act",
    shortDesc: "Counsel and representation for digital financial crimes, unauthorized account access, cyber stalking, identity theft, electronic evidence certification, and compliance with data privacy regulations.",
    acts: ["Information Technology Act 2000 (IT Act)", "Digital Personal Data Protection (DPDP) Act 2023", "Bharatiya Sakshya Adhiniyam 2023 (Section 63) / Sec 65B Evidence Act", "Indian Penal Code / BNS Cyber Provisions"],
    mattersHandled: [
      "Financial cyber fraud, unauthorized banking transfers & phishing complaints",
      "Online defamation, identity theft & impersonation on digital platforms",
      "Drafting and serving notices under Section 79 IT Act to digital intermediaries",
      "Section 65B / Section 63 electronic evidence certification for trials",
      "Data privacy compliance, DPDP statutory advisory & terms of service",
      "Cyber Crime Cell representation & FIR coordination with law enforcement",
    ],
    reliefType: "Evidence Certification, Account Freeze & Criminal Investigation"
  },
  {
    id: "legal-notices",
    title: "Legal Notices & Documentation Services",
    slug: "/legal-notices",
    icon: FileText,
    tagline: "Statutory demand notices, contract drafting & legal replies",
    shortDesc: "Accurate drafting of statutory legal notices, formal responses to opposing counsel, settlement agreements, affidavits, and conveyance deeds to establish sound legal ground before litigation.",
    acts: ["Section 138 Negotiable Instruments Act", "Transfer of Property Act 1882 (Section 106)", "Indian Contract Act 1872", "Specific Relief Act 1963", "Registration Act 1908"],
    mattersHandled: [
      "Mandatory 15-day statutory notices for cheque bounce under Section 138 NI Act",
      "Tenancy termination & eviction demand notices (Section 106 Transfer of Property)",
      "Breach of commercial contract & debt recovery legal notices",
      "Drafting replies to legal notices received to safeguard procedural rights",
      "Defamation notices & cease-and-desist notifications",
      "Drafting agreements to sell, partnership deeds, wills & family settlements",
    ],
    reliefType: "Pre-Litigation Settlement, Statutory Notice Compliance & Due Diligence"
  },
  {
    id: "international-arbitration",
    title: "International Arbitration & Cross-Border Disputes",
    slug: "/international-arbitration",
    icon: Globe2,
    tagline: "SIAC, ICC, LCIA, DIAC, UNCITRAL & New York Convention Foreign Awards",
    shortDesc: "Cross-border arbitral representation for international commercial contracts, joint ventures, Emergency Arbitrator awards, Supreme Court Section 11(6) appointments, and Part II Foreign Award enforcement in India.",
    acts: ["Arbitration and Conciliation Act 1996 (Part I & Part II)", "SIAC / ICC / LCIA / UNCITRAL Rules", "New York Convention 1958", "Commercial Courts Act 2015", "Bilateral Investment Treaties (BIT)"],
    mattersHandled: [
      "Foreign-seated and India-seated International Commercial Arbitrations (SIAC, ICC, LCIA, DIAC)",
      "Enforcement of Foreign Arbitral Awards in India (Sections 44–52 New York Convention)",
      "Section 9 interim asset freezes & Emergency Arbitrator enforcement (Sec 17(2))",
      "Supreme Court Section 11(6) international arbitrator appointment petitions",
      "Post-M&A indemnity, earn-out & Joint Venture SHA arbitral claims",
      "Bilateral Investment Treaty (BIT) & cross-border EPC infrastructure disputes",
    ],
    reliefType: "Global Award Enforcement, Interim Asset Freeze & Cross-Border Relief"
  },
  {
    id: "mergers-acquisitions",
    title: "Mergers & Acquisitions (M&A), Private Equity & NCLT",
    slug: "/mergers-acquisitions",
    icon: GitMerge,
    tagline: "NCLT Schemes (Sec 230–234), Due Diligence, SPA/BTA, CCI & FEMA Structuring",
    shortDesc: "Complete transactional and regulatory counsel for domestic and inbound/outbound cross-border mergers, corporate demergers, slump sales, private equity investments, CCI approvals, and IBC distressed acquisitions.",
    acts: ["Companies Act 2013 (Sections 230–234)", "Competition Act 2002 (CCI Deal Value Threshold)", "FEMA Cross-Border Merger Regulations 2018", "SEBI Takeover Code (SAST) & LODR", "Insolvency & Bankruptcy Code 2016"],
    mattersHandled: [
      "NCLT-sanctioned Mergers, Amalgamations & Demergers (Sections 230–232) & Fast-Track Mergers (Sec 233)",
      "Cross-Border Inbound/Outbound Mergers under Section 234 & FEMA Regulations",
      "Drafting & negotiation of Term Sheets, Share Purchase (SPA), Slump Sale (BTA) & SHA contracts",
      "Comprehensive 6-Pillar Legal Due Diligence (Corporate, Title/CLU, IP, Labour & Litigation)",
      "Competition Commission of India (CCI) Form I/II & Green Channel Combination filings",
      "Private Equity / Venture Capital exits & IBC Section 31 distressed M&A acquisitions",
    ],
    reliefType: "Deal Closure, NCLT Restructuring Sanction & Regulatory Clearance"
  }
];

export const PracticeAreasPage: React.FC<PracticeAreasPageProps> = ({ onOpenConsultation }) => {
  return (
    <>
      <SEOHead
        title="Legal Practice Areas | Punia Associates"
        description="Explore the legal practice areas and services offered by Punia Associates, including civil, criminal, family, property, corporate and other legal matters."
        canonicalPath="/practice-areas"
        schemaData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Legal Practice Areas",
          "url": "https://puniaassociates.site/practice-areas",
          "description": "Explore the legal practice areas and services offered by Punia Associates, including civil, criminal, family, property, corporate and other legal matters.",
          "provider": {
            "@type": "LegalService",
            "name": "Punia Associates",
            "url": "https://puniaassociates.site/"
          }
        }}
      />

      <Breadcrumbs items={[{ name: 'Practice Areas', url: '/practice-areas' }]} />

      <main className="bg-[#F8F9FA] text-[#1E293B]">
        {/* Header Hero */}
        <section className="bg-[#0B1325] text-white py-16 sm:py-20 border-b border-slate-800 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30 tracking-wide uppercase font-mono mb-4">
                Directory of Legal Services
              </span>
              <h1 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
                Legal Practice Areas
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
                Punia Associates offers dedicated legal representation across nine core disciplines of Indian jurisprudence. Explore each practice area to understand the applicable statutory codes, courtroom procedures, and legal remedies available.
              </p>
            </div>
          </div>
        </section>

        {/* Directory Intro Bar */}
        <section className="py-6 bg-slate-100 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-600">
            <div>
              <strong>Quick Practice Navigation:</strong> Select any area below to view dedicated statutory breakdowns, process workflows, and advocate profiles.
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => onOpenConsultation()} 
                className="font-bold text-amber-600 hover:text-amber-700 inline-flex items-center gap-1"
              >
                <span>Need immediate guidance on a specific matter?</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>

        {/* Practice Areas Detailed List */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {PRACTICE_DOMAINS.map((domain, index) => {
              const IconComponent = domain.icon;
              return (
                <article 
                  key={domain.id} 
                  id={domain.id} 
                  className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:border-amber-500/40 transition-colors"
                >
                  <div className="p-6 sm:p-8 lg:p-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      {/* Left: Summary and Info (7 cols) */}
                      <div className="lg:col-span-7 space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-slate-900 text-amber-400 flex items-center justify-center shrink-0">
                            <IconComponent className="w-6 h-6" />
                          </div>
                          <div>
                            <span className="text-[11px] font-mono uppercase tracking-wider text-amber-600 font-bold block">
                              Practice Domain 0{index + 1}
                            </span>
                            <h2 className="font-cormorant text-2xl sm:text-3xl font-bold text-[#0B1325]">
                              {domain.title}
                            </h2>
                          </div>
                        </div>

                        <p className="text-xs sm:text-sm font-medium text-amber-800 bg-amber-50/80 px-3 py-1.5 rounded border border-amber-200/60 inline-block">
                          {domain.tagline}
                        </p>

                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {domain.shortDesc}
                        </p>

                        <div className="pt-2">
                          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                            Key Statutes & Acts Applicable:
                          </h3>
                          <div className="flex flex-wrap gap-1.5">
                            {domain.acts.map((act, i) => (
                              <span key={i} className="text-[11px] bg-slate-100 text-slate-700 px-2.5 py-1 rounded border border-slate-200">
                                {act}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="pt-4 flex flex-wrap items-center gap-3">
                          <Link
                            to={domain.slug}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0B1325] hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors shadow"
                          >
                            <span>Explore {domain.title} in Detail</span>
                            <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                          </Link>
                          <button
                            onClick={() => onOpenConsultation(domain.title)}
                            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-[#0B1325] text-xs font-bold rounded-lg transition-colors cursor-pointer"
                          >
                            <PhoneCall className="w-3.5 h-3.5" />
                            <span>Consult on this Matter</span>
                          </button>
                        </div>
                      </div>

                      {/* Right: Specific Matters Handled (5 cols) */}
                      <div className="lg:col-span-5 bg-slate-50 p-6 rounded-lg border border-slate-200">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Typical Matters Handled:</span>
                        </h3>
                        <ul className="space-y-2.5 text-xs text-slate-600">
                          {domain.mattersHandled.map((matter, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-amber-500 font-bold shrink-0 mt-0.5">•</span>
                              <span className="leading-snug">{matter}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
                          <span>Primary Objective:</span>
                          <strong className="text-slate-700 font-semibold">{domain.reliefType}</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Global Consultation CTA */}
        <section className="bg-gradient-to-r from-[#0B1325] via-[#111c38] to-[#0B1325] text-white py-16 border-t border-slate-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30 tracking-wide uppercase font-mono mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Chambers Case Assessment
            </span>
            <h2 className="font-cormorant text-3xl sm:text-4xl font-bold mb-4">
              Not Sure Which Legal Category Applies to Your Matter?
            </h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto mb-8 font-light">
              Submit your document or explain your situation. Our advocates analyze the facts to determine the exact statutory remedy and appropriate forum.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onOpenConsultation()}
                className="w-full sm:w-auto px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-[#0B1325] font-bold text-sm rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-[#0B1325]" />
                <span>Talk to an Advocate</span>
              </button>
              <Link
                to="/lawyers"
                className="w-full sm:w-auto px-8 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm rounded-lg border border-slate-700 transition-colors text-center"
              >
                View Advocate Directory
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

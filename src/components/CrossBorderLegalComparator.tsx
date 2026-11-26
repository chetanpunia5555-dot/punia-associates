import React, { useState } from 'react';
import { Scale, Globe, ArrowRight, BookOpen, CheckCircle, ShieldCheck, ChevronRight, FileText } from 'lucide-react';

interface LegalComparisonTopic {
  id: string;
  topicTitle: string;
  category: string;
  description: string;
  jurisdictions: {
    country: string;
    flag: string;
    statuteOrPrecedent: string;
    ruleDoctrine: string;
    keyPrinciple: string;
  }[];
}

const COMPARISON_TOPICS: LegalComparisonTopic[] = [
  {
    id: 'director-fiduciary-duties',
    topicTitle: 'Corporate Directors\' Fiduciary Duties & Business Judgment',
    category: 'Corporate & Commercial Law',
    description: 'Comparative analysis of statutory duties of company directors, standards of care, and protection under the Business Judgment Rule.',
    jurisdictions: [
      {
        country: 'India',
        flag: '🇮🇳',
        statuteOrPrecedent: 'Companies Act, 2013 (Section 166)',
        ruleDoctrine: 'Statutory codification of fiduciary duties to act in good faith, promote company objects, exercise independent judgment, and avoid conflicts of interest.',
        keyPrinciple: 'Dual loyalty to shareholders and broader stakeholders (employees, environment, community).'
      },
      {
        country: 'United Kingdom',
        flag: '🇬🇧',
        statuteOrPrecedent: 'Companies Act 2006 (Sections 171-177)',
        ruleDoctrine: 'Enlightened Shareholder Value (ESV) principle under Section 172; duty to exercise reasonable care, skill, and diligence under Section 174.',
        keyPrinciple: 'Director must promote long-term success for members while having regard to environmental and community impact.'
      },
      {
        country: 'United States',
        flag: '🇺🇸',
        statuteOrPrecedent: 'Delaware General Corporation Law (DGCL) & Model Business Corporation Act',
        ruleDoctrine: 'Triad of fiduciary duties: Duty of Care, Duty of Loyalty, and Duty of Good Faith, protected by the common-law Business Judgment Rule presumption.',
        keyPrinciple: 'Courts will not second-guess informed, good-faith business decisions absent fraud, illegality, or self-dealing.'
      },
      {
        country: 'Singapore',
        flag: '🇸🇬',
        statuteOrPrecedent: 'Companies Act 1967 (Section 157)',
        ruleDoctrine: 'Strict duty to act honestly and use reasonable diligence; prohibition against improper use of company position or confidential information.',
        keyPrinciple: 'Both criminal penalties and civil liability attach to breaches of directorial diligence.'
      },
      {
        country: 'Australia',
        flag: '🇦🇺',
        statuteOrPrecedent: 'Corporations Act 2001 (Sections 180-184 & 588G)',
        ruleDoctrine: 'Statutory Business Judgment Rule (Section 180(2)) combined with stringent personal liability for insolvent trading under Section 588G.',
        keyPrinciple: 'Directors face heavy civil penalty disqualifications and compensation orders for improper use of position.'
      }
    ]
  },
  {
    id: 'contractual-good-faith',
    topicTitle: 'Doctrine of Good Faith in Contract Performance',
    category: 'Contract & Commercial Obligations',
    description: 'How major common law and civil law systems treat the implied duty of good faith and fair dealing in commercial agreements.',
    jurisdictions: [
      {
        country: 'India',
        flag: '🇮🇳',
        statuteOrPrecedent: 'Indian Contract Act, 1872 & Judicial Interpretations',
        ruleDoctrine: 'No overarching general statutory implied term of good faith, but principles of equity, unconscionability (Section 16), and fair dealing apply.',
        keyPrinciple: 'Good faith is recognized in specific relations (partnership, insurance, agency) and implied terms against arbitrary termination.'
      },
      {
        country: 'Germany',
        flag: '🇩🇪',
        statuteOrPrecedent: 'Bürgerliches Gesetzbuch (BGB § 242 — Treu und Glauben)',
        ruleDoctrine: 'Universal principle that every obligor must perform in good faith, having regard to customary trade practices.',
        keyPrinciple: 'Foundational cornerstone of the entire German law of obligations; regulates unfair contract terms and doctrine of frustration.'
      },
      {
        country: 'France',
        flag: '🇫🇷',
        statuteOrPrecedent: 'Code Civil (Article 1104, 2016 Reform)',
        ruleDoctrine: 'Public policy rule: Contracts must be negotiated, formed, and performed in good faith (ordre public).',
        keyPrinciple: 'Parties cannot derogate from or contract out of the duty of good faith in pre-contractual negotiations or performance.'
      },
      {
        country: 'United States',
        flag: '🇺🇸',
        statuteOrPrecedent: 'Uniform Commercial Code (UCC § 1-304) & Restatement (Second) of Contracts § 205',
        ruleDoctrine: 'Every contract imposes an obligation of good faith in its performance and enforcement.',
        keyPrinciple: 'Honesty in fact and the observance of reasonable commercial standards of fair dealing.'
      },
      {
        country: 'United Kingdom',
        flag: '🇬🇧',
        statuteOrPrecedent: 'English Common Law (Yam Seng Pte Ltd v ITC [2013])',
        ruleDoctrine: 'No general doctrine of good faith across all commercial contracts; implied terms of good faith restricted to "relational contracts".',
        keyPrinciple: 'Freedom of contract and commercial certainty remain paramount; parties can expressly agree on good faith clauses.'
      }
    ]
  },
  {
    id: 'international-arbitration-enforcement',
    topicTitle: 'Enforcement of Foreign Arbitral Awards & Public Policy Defense',
    category: 'International Dispute Resolution',
    description: 'Enforcement standards for international commercial arbitration under the New York Convention 1958 and UNCITRAL Model Law.',
    jurisdictions: [
      {
        country: 'International',
        flag: '🌐',
        statuteOrPrecedent: 'New York Convention, 1958 (Article V)',
        ruleDoctrine: 'Exhaustive list of procedural grounds to resist enforcement; pro-enforcement bias with narrow public policy exception.',
        keyPrinciple: 'Foreign arbitral awards are prima facie binding and enforceable in over 170 contracting sovereign states.'
      },
      {
        country: 'India',
        flag: '🇮🇳',
        statuteOrPrecedent: 'Arbitration and Conciliation Act, 1996 (Section 48)',
        ruleDoctrine: 'Harmonized with the New York Convention; 2015/2019 amendments narrowed "public policy of India" to fundamental policy, justice, or morality.',
        keyPrinciple: 'Indian courts cannot conduct a review of the foreign arbitral award on merits or errors of law.'
      },
      {
        country: 'Singapore',
        flag: '🇸🇬',
        statuteOrPrecedent: 'International Arbitration Act 1994 (IAA)',
        ruleDoctrine: 'Minimal curial intervention; Singapore High Court strictly applies the Kompetenz-Kompetenz doctrine.',
        keyPrinciple: 'Leading global venue for cross-border disputes via SIAC; exceptional standard required to establish public policy violation.'
      },
      {
        country: 'United Kingdom',
        flag: '🇬🇧',
        statuteOrPrecedent: 'Arbitration Act 1996 (Part III — Foreign Awards)',
        ruleDoctrine: 'Enforcement through High Court summary judgment procedure with statutory protections for arbitral autonomy.',
        keyPrinciple: 'London seat offers predictable supervisory jurisprudence via the Commercial Court and LCIA.'
      },
      {
        country: 'United States',
        flag: '🇺🇸',
        statuteOrPrecedent: 'Federal Arbitration Act (FAA, 9 U.S.C. §§ 201-208)',
        ruleDoctrine: 'Federal courts possess original subject-matter jurisdiction to confirm or enforce foreign awards under the Convention.',
        keyPrinciple: 'Strong federal policy favoring arbitration; public policy defense construed narrowly to violations of basic morality and justice.'
      }
    ]
  },
  {
    id: 'constitutional-due-process',
    topicTitle: 'Constitutional Due Process, Fair Trial & Fundamental Rights',
    category: 'Constitutional & Human Rights Law',
    description: 'Comparative protections of personal liberty, fair hearing, and substantive versus procedural due process.',
    jurisdictions: [
      {
        country: 'India',
        flag: '🇮🇳',
        statuteOrPrecedent: 'Constitution of India (Articles 14, 19, 21 — Golden Triangle)',
        ruleDoctrine: 'Evolution from "procedure established by law" (Gopalan) to substantive due process and just, fair, and reasonable procedure (Maneka Gandhi).',
        keyPrinciple: 'Right to life includes human dignity, privacy (Puttaswamy), speedy trial, legal aid, and environmental justice.'
      },
      {
        country: 'United States',
        flag: '🇺🇸',
        statuteOrPrecedent: 'US Constitution (Fifth & Fourteenth Amendments)',
        ruleDoctrine: 'Dual dimensions: Procedural Due Process (notice and hearing) and Substantive Due Process (protection of unenumerated fundamental rights).',
        keyPrinciple: 'Strict judicial scrutiny applies to any state legislation infringing upon fundamental liberty interests or suspect classifications.'
      },
      {
        country: 'Germany',
        flag: '🇩🇪',
        statuteOrPrecedent: 'Basic Law (Grundgesetz Articles 1, 2, 19(4), 103)',
        ruleDoctrine: 'Inviolability of Human Dignity (Art. 1) as the apex value; Principle of Proportionality (Verhältnismäßigkeit) governing all rights restrictions.',
        keyPrinciple: 'Every person has the right to their lawful judge (Recht auf den gesetzlichen Richter) and fair hearing before the court.'
      },
      {
        country: 'Canada',
        flag: '🇨🇦',
        statuteOrPrecedent: 'Canadian Charter of Rights and Freedoms (Sections 7 & 11)',
        ruleDoctrine: 'Right to life, liberty, and security of the person subject only to the "principles of fundamental justice", balanced under the Section 1 Oakes Test.',
        keyPrinciple: 'Legislation must not be arbitrary, overbroad, or grossly disproportionate in its societal impact.'
      },
      {
        country: 'International',
        flag: '🌐',
        statuteOrPrecedent: 'Universal Declaration of Human Rights (UDHR) & ICCPR (Article 14)',
        ruleDoctrine: 'International minimum standard: universal equality before courts, presumption of innocence, and trial by an independent, impartial tribunal.',
        keyPrinciple: 'Non-derogable core rights against arbitrary detention, torture, and retroactive criminal penalization.'
      }
    ]
  }
];

export const CrossBorderLegalComparator: React.FC = () => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>(COMPARISON_TOPICS[0].id);

  const activeTopic = COMPARISON_TOPICS.find(t => t.id === selectedTopicId) || COMPARISON_TOPICS[0];

  return (
    <section className="bg-white rounded-3xl border border-slate-200/80 shadow-md p-6 sm:p-8 my-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-900 border border-amber-500/20 text-xs font-bold tracking-wide uppercase mb-2">
            <Globe className="w-3.5 h-3.5 text-amber-700" />
            Global Comparative Jurisprudence Engine
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
            Cross-Border Legal Doctrine Comparator
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
            Compare fundamental legal doctrines, statutory frameworks, and judicial precedents side-by-side across India, the United States, United Kingdom, Singapore, Australia, Germany, France, and Canada.
          </p>
        </div>

        {/* Topic Selector Tabs */}
        <div className="flex flex-wrap gap-2">
          {COMPARISON_TOPICS.map(topic => (
            <button
              key={topic.id}
              onClick={() => setSelectedTopicId(topic.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedTopicId === topic.id
                  ? 'bg-[#0B1325] text-amber-400 shadow-md border border-amber-500/40'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {topic.topicTitle.split('(')[0].trim().slice(0, 28)}...
            </button>
          ))}
        </div>
      </div>

      {/* Active Topic Header */}
      <div className="mt-6 mb-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[11px] font-bold text-amber-700 tracking-wider uppercase">
            {activeTopic.category}
          </span>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
            {activeTopic.topicTitle}
          </h3>
          <p className="text-xs text-slate-600 mt-1">
            {activeTopic.description}
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>{activeTopic.jurisdictions.length} Sovereign Jurisdictions Analyzed</span>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {activeTopic.jurisdictions.map((item, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-slate-200 bg-white hover:border-amber-500/40 hover:shadow-lg transition-all p-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl" role="img" aria-label={item.country}>{item.flag}</span>
                  <h4 className="font-bold text-sm text-slate-900">{item.country}</h4>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                  Jurisdiction #{idx + 1}
                </span>
              </div>

              <div className="mb-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Governing Statute / Precedent
                </span>
                <p className="text-xs font-bold text-slate-800 mt-0.5">
                  {item.statuteOrPrecedent}
                </p>
              </div>

              <div className="mb-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Applicable Rule & Doctrine
                </span>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  {item.ruleDoctrine}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 bg-amber-50/50 -mx-5 -mb-5 p-4 rounded-b-2xl">
              <span className="text-[10px] font-extrabold text-amber-900 uppercase tracking-wider block">
                Binding Legal Principle
              </span>
              <p className="text-xs font-medium text-amber-950 mt-1">
                {item.keyPrinciple}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

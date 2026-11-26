import React from 'react';
import { ShieldCheck, Scale, Lock, Eye, FileText, CheckCircle2 } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Privacy Policy | Punia Associates Chambers"
        description="Privacy policy and data governance practices of Punia Associates, adhering to Indian IT Act 2000, SPDI Rules 2011, and Bar Council of India professional privilege guidelines."
        canonicalPath="/privacy-policy"
      />

      {/* Header */}
      <section className="bg-gradient-to-b from-[#0A1120] via-[#0F1B33] to-[#0A1120] text-white pt-24 pb-14 border-b border-amber-500/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-4">
            <Lock className="w-3.5 h-3.5" />
            <span>Data Protection & Privilege</span>
          </div>

          <h1 className="font-cormorant text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
            Privacy Policy & Professional Confidentiality
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed font-light">
            How Punia Associates handles case particulars, consultation communications, and data security in strict compliance with the Advocates Act, 1961 and the Digital Personal Data Protection Act.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-14 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 text-slate-700 text-xs sm:text-sm leading-relaxed">
          
          <div>
            <h2 className="font-cormorant text-2xl font-bold text-slate-900 mb-3">
              1. Professional Commitment to Client Privilege
            </h2>
            <p className="text-slate-700 mb-3">
              At Punia Associates (Advocates & Legal Consultants), client privacy and advocate-client privilege are foundational ethical obligations under Section 126 and Section 129 of the Indian Evidence Act, 1872 (now Section 132 and Section 135 of the Bharatiya Sakshya Adhiniyam, 2023) and Bar Council of India Rules.
            </p>
            <p className="text-slate-700">
              We never disclose confidential client communications, pleadings, or trial strategies to third parties without express written consent or statutory mandate from a competent court of law.
            </p>
          </div>

          <div>
            <h2 className="font-cormorant text-2xl font-bold text-slate-900 mb-3">
              2. Information Collected
            </h2>
            <p className="text-slate-700 mb-2">
              When you voluntarily reach out through our online case inquiry desk, consultation booking forms, or AI voice guidance system, we collect:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
              <li>Name and contact details (telephone number, email address).</li>
              <li>State or district jurisdiction (e.g. Haryana, Delhi NCR, UP, Rajasthan).</li>
              <li>Factual outline of the legal controversy or pending case number.</li>
              <li>Preferred language or regional dialect choice for communication.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-cormorant text-2xl font-bold text-slate-900 mb-3">
              3. Use of Information
            </h2>
            <p className="text-slate-700 mb-2">
              All received inquiries are used solely for:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
              <li>Conducting initial conflict checks across our chambers.</li>
              <li>Assigning the inquiry to an advocate with relevant subject-matter competence.</li>
              <li>Facilitating scheduled preliminary assessment calls.</li>
              <li>Answering legal literacy questions via automated research desk.</li>
            </ul>
            <p className="text-slate-700 mt-2 font-medium">
              We do not sell, rent, or lease any client contact data to marketing agencies or third-party lead brokers.
            </p>
          </div>

          <div>
            <h2 className="font-cormorant text-2xl font-bold text-slate-900 mb-3">
              4. Cookies & Web Analytics
            </h2>
            <p className="text-slate-700">
              Our website uses minimal, non-invasive session cookies strictly necessary to maintain user session state, dialect preferences, and website performance. We do not engage in cross-site behavioral tracking or profiling.
            </p>
          </div>

          <div>
            <h2 className="font-cormorant text-2xl font-bold text-slate-900 mb-3">
              5. Grievance Officer & Contact
            </h2>
            <p className="text-slate-700">
              In accordance with Information Technology Act, 2000 and SPDI Rules:
            </p>
            <div className="mt-2 p-4 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs text-slate-800">
              <p>Chambers of Punia Associates</p>
              <p>Attn: Grievance Officer / Data Protection Officer</p>
              <p>Chamber No. 42 & 43, District & Sessions Court Complex, Sector 12, Karnal, Haryana - 132001</p>
              <p>Email: contact@puniaassociates.site | Phone: +91 94160 30000</p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
            <span>Last Updated: October 2026</span>
            <span className="flex items-center gap-1 text-emerald-700 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>DPDP Act 2023 Compliant</span>
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

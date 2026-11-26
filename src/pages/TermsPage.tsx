import React from 'react';
import { Scale, AlertTriangle, ShieldCheck, FileCheck, CheckCircle2 } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

export const TermsPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Terms of Use & Legal Disclaimer | Punia Associates"
        description="Statutory Bar Council of India Rule 36 legal disclaimer, terms of use, and professional terms governing access to Punia Associates website."
        canonicalPath="/terms"
      />

      {/* Header */}
      <section className="bg-gradient-to-b from-[#0A1120] via-[#0F1B33] to-[#0A1120] text-white pt-24 pb-14 border-b border-amber-500/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-4">
            <Scale className="w-3.5 h-3.5" />
            <span>Statutory Compliance</span>
          </div>

          <h1 className="font-cormorant text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
            Terms of Use & Bar Council Disclaimer
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed font-light">
            Important professional conditions, limitation of liability, and regulatory disclosures governing the use of this legal information platform.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-14 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 text-slate-700 text-xs sm:text-sm leading-relaxed">
          
          {/* Statutory BCI Rule 36 Box */}
          <div className="p-6 bg-amber-50/80 border-2 border-amber-300/80 rounded-2xl">
            <div className="flex items-center gap-2.5 text-amber-900 font-bold text-base mb-3">
              <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
              <span>BAR COUNCIL OF INDIA STATUTORY DISCLAIMER (RULE 36)</span>
            </div>
            <p className="text-slate-800 leading-relaxed mb-3">
              Under the rules established by the <strong>Bar Council of India (BCI)</strong>, advocates and law firms in India are strictly prohibited from soliciting work or advertising their professional services in any manner, directly or indirectly.
            </p>
            <p className="text-slate-800 leading-relaxed mb-3">
              By accessing this website (<code className="font-mono text-amber-900 font-bold">https://puniaassociates.site</code>), the user acknowledges and confirms that:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-800">
              <li>
                The user has accessed this website solely for personal information, educational legal research, and gaining awareness about Indian statutes, court precedents, and judicial updates.
              </li>
              <li>
                There has been no advertisement, personal communication, solicitation, invitation, or inducement of any sort whatsoever from Punia Associates or any of its advocates to solicit any work through this website.
              </li>
              <li>
                The information provided under this website is made available to the user at their specific request and volition for informational and academic purposes only.
              </li>
              <li>
                The transmission, receipt, or use of this site does not create an advocate-client relationship between Punia Associates and the user.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-cormorant text-2xl font-bold text-slate-900 mb-3">
              1. No Legal Advice
            </h2>
            <p className="text-slate-700 leading-relaxed">
              The contents of this website—including case law summaries, judgment briefs, court orders, articles, legislative updates, and automated AI legal desk responses—are published purely for informational and legal literacy purposes. They do not constitute formal legal opinions or legal advice. Users must not act or refrain from acting based on any material on this website without seeking competent professional advice from an advocate licensed in the relevant jurisdiction.
            </p>
          </div>

          <div>
            <h2 className="font-cormorant text-2xl font-bold text-slate-900 mb-3">
              2. Accuracy of Judicial Records & Primary Sources
            </h2>
            <p className="text-slate-700 leading-relaxed mb-2">
              While Punia Associates makes diligent editorial efforts to ensure that judgments, citations, and court orders published in our research library are accurate and up-to-date, judicial decisions may be appealed, stayed, modified, or overruled.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Users must independently verify citations, coram details, and operative directions against official court certified copies and primary repositories such as the Supreme Court e-SCR portal, High Court websites, and official legislative gazettes. Punia Associates disclaims all liability for any errors, omissions, or subsequent developments not captured at the time of viewing.
            </p>
          </div>

          <div>
            <h2 className="font-cormorant text-2xl font-bold text-slate-900 mb-3">
              3. Intellectual Property
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Original analytical commentary, editorial headnotes, research articles, and practice guides authored by Punia Associates are protected under the Indian Copyright Act, 1957. While official judicial texts, judgments of courts, and legislative enactments remain in the public domain, reproduction of our original editorial treatises without attribution is prohibited.
            </p>
          </div>

          <div>
            <h2 className="font-cormorant text-2xl font-bold text-slate-900 mb-3">
              4. Governing Law & Jurisdiction
            </h2>
            <p className="text-slate-700 leading-relaxed">
              These Terms of Use shall be governed by and construed in accordance with the laws of India. Any disputes arising out of the use of this website shall be subject to the exclusive jurisdiction of the competent courts in Karnal / Chandigarh, Haryana.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
            <span>Effective Date: October 2026</span>
            <span className="flex items-center gap-1 text-emerald-700 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Advocates Act 1961 Compliant</span>
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

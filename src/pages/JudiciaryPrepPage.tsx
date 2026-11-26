import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  BookOpen, 
  Scale, 
  FileText, 
  Landmark, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Award,
  Layers,
  HelpCircle,
  Clock
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

export const JudiciaryPrepPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Judiciary Examination Preparation Centre & Case Briefs | Punia Associates"
        description="Comprehensive study portal for State Judicial Services Examination (Delhi, Haryana, Punjab, UP, Rajasthan) featuring BNS/BNSS statutory notes, landmark case law briefs, and mains answer framing frameworks."
        canonicalUrl="https://puniaassociates.site/judiciary-prep"
      />

      <div className="bg-[#0B1325] text-white py-16 border-b border-amber-500/20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-3">
              <GraduationCap className="w-3.5 h-3.5" /> High-Yield Legal Study Centre
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-slate-100">
              Judicial Services Examination Study Centre
            </h1>
            <p className="mt-4 text-slate-300 text-sm md:text-base leading-relaxed">
              Curated study resources designed for state judicial examination aspirants (HCS Judicial Branch, PCS Judicial, DJS, UP PCS-J, and RJS) and young appellate advocates.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/short-notes"
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold rounded text-xs transition inline-flex items-center gap-2"
            >
              <FileText className="w-4 h-4" /> Browse Short Notes Library
            </Link>
            <Link
              to="/case-briefs"
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded text-xs font-semibold transition inline-flex items-center gap-2"
            >
              <Scale className="w-4 h-4 text-amber-400" /> Landmark Case Briefs
            </Link>
            <Link
              to="/bare-acts"
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded text-xs font-semibold transition inline-flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-amber-400" /> India Bare Acts
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 mb-4">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif font-bold text-slate-900 mb-2">
              Statutory Short Notes
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Structured capsules for rapid revision covering essential ingredients, comparative tables, and doctrinal exceptions across BNS, BNSS, BSA, CPC, and Contracts.
            </p>
            <Link to="/short-notes" className="text-xs font-semibold text-amber-700 hover:text-amber-800 inline-flex items-center gap-1">
              Read Short Notes <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 mb-4">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif font-bold text-slate-900 mb-2">
              Ratio Decidendi Case Briefs
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Rigorous breakdown of Constitution Bench and landmark Supreme Court decisions separating binding holdings from obiter dicta observations.
            </p>
            <Link to="/case-briefs" className="text-xs font-semibold text-indigo-700 hover:text-indigo-800 inline-flex items-center gap-1">
              Explore Case Briefs <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 mb-4">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif font-bold text-slate-900 mb-2">
              India Bare Acts with Section Reader
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Authentic legislative database with dual reading modes, section-by-section navigation, copy with citation, and certified India Code links.
            </p>
            <Link to="/bare-acts" className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1">
              Search Bare Acts <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* State Syllabus & Examination Coverage */}
        <div className="bg-white p-8 rounded-lg border border-slate-200 shadow-sm">
          <div className="max-w-2xl mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded">
              Examination Coverage
            </span>
            <h2 className="text-2xl font-serif font-bold text-slate-900 mt-2">
              Targeted State Judicial Service Syllabi
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Our notes and statutory readers map to the primary civil and criminal law papers of Northern Indian state judiciary commissions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-50 rounded border border-slate-200/80">
              <h4 className="font-bold text-sm text-slate-900">Haryana Civil Service (Judicial)</h4>
              <p className="text-[11px] text-slate-500 mt-1">HPSC / Punjab & Haryana HC</p>
              <div className="mt-3 text-xs text-slate-600 space-y-1">
                <div>• Civil Law-I (CPC, Contracts, Sales)</div>
                <div>• Civil Law-II (Hindu/Muslim Law, Customary Law)</div>
                <div>• Criminal Law (BNS, BNSS, BSA)</div>
                <div>• Local Acts (Punjab Land Revenue Act 1887, Haryana Urban Rent Control)</div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded border border-slate-200/80">
              <h4 className="font-bold text-sm text-slate-900">Delhi Judicial Service (DJS)</h4>
              <p className="text-[11px] text-slate-500 mt-1">High Court of Delhi</p>
              <div className="mt-3 text-xs text-slate-600 space-y-1">
                <div>• Civil Law-I (Specific Relief, Limitation, Torts)</div>
                <div>• Civil Law-II (CPC, Commercial Courts Act)</div>
                <div>• Criminal Law (BNS, BNSS, BSA, POCSO, NI Act Sec 138)</div>
                <div>• Practical problem solving & judgment writing</div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded border border-slate-200/80">
              <h4 className="font-bold text-sm text-slate-900">Uttar Pradesh PCS (Judicial)</h4>
              <p className="text-[11px] text-slate-500 mt-1">UPPSC / Allahabad High Court</p>
              <div className="mt-3 text-xs text-slate-600 space-y-1">
                <div>• Substantive Law (Constitution, Contracts, TPA)</div>
                <div>• Procedure & Evidence (CPC, BNSS, BSA)</div>
                <div>• Penal, Revenue & Local Laws (UP Revenue Code 2006, UP Urban Rent)</div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded border border-slate-200/80">
              <h4 className="font-bold text-sm text-slate-900">Rajasthan Judicial Service (RJS)</h4>
              <p className="text-[11px] text-slate-500 mt-1">Rajasthan High Court</p>
              <div className="mt-3 text-xs text-slate-600 space-y-1">
                <div>• Law Paper-I (CPC, Constitution, Contracts, TPA)</div>
                <div>• Law Paper-II (BNS, BNSS, BSA, Domestic Violence)</div>
                <div>• Local Acts (Rajasthan Rent Control Act, Rajasthan Tenancy Act 1955)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

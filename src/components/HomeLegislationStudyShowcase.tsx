import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  GraduationCap, 
  Landmark, 
  Scale, 
  ArrowRight, 
  FileText, 
  ShieldCheck, 
  Globe2,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';

export const HomeLegislationStudyShowcase: React.FC = () => {
  return (
    <section className="py-16 bg-slate-900 text-white relative overflow-hidden border-y border-amber-500/20">
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-3 font-mono">
              <Scale className="w-3.5 h-3.5" /> India Legal Knowledge & Legislative Hub
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-100">
              Legislation, High Courts & Judicial Study Centre
            </h2>
            <p className="mt-2 text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Explore India's comprehensive statutory texts, browse the directory of all 25 High Courts, and access high-yield judicial exam capsules with binding ratio decidendi briefs.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/bare-acts"
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded transition flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" /> Browse Bare Acts
            </Link>
            <Link
              to="/judiciary-prep"
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs rounded transition flex items-center gap-1.5"
            >
              <GraduationCap className="w-3.5 h-3.5 text-amber-400" /> Study Centre
            </Link>
          </div>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Bare Acts */}
          <div className="bg-slate-800/80 rounded-lg p-6 border border-slate-700/80 hover:border-amber-500/50 transition flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4 border border-amber-500/20">
                <BookOpen className="w-4 h-4" />
              </div>
              <h3 className="text-base font-serif font-bold text-slate-100 mb-2">
                India Bare Acts Library
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Section-by-section reader with explanations, illustrations, landmark precedents, and certified India Code / e-Gazette references.
              </p>
              <div className="space-y-1 text-[11px] text-slate-400 border-t border-slate-700/60 pt-3 mb-4">
                <div className="flex items-center gap-1.5">
                  <span className="text-amber-400">•</span> Constitution of India (1950)
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-amber-400">•</span> Bharatiya Nyaya Sanhita (BNS 2023)
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-amber-400">•</span> Bharatiya Nagarik Suraksha (BNSS)
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-amber-400">•</span> Code of Civil Procedure (CPC 1908)
                </div>
              </div>
            </div>
            <Link
              to="/bare-acts"
              className="text-xs font-semibold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1"
            >
              Read Bare Acts <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 2: Courts Directory */}
          <div className="bg-slate-800/80 rounded-lg p-6 border border-slate-700/80 hover:border-amber-500/50 transition flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4 border border-indigo-500/20">
                <Landmark className="w-4 h-4" />
              </div>
              <h3 className="text-base font-serif font-bold text-slate-100 mb-2">
                All 25 High Courts & Apex Court
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Directory covering the Supreme Court and all 25 State High Courts with benches, territorial jurisdiction, and live eCourts portals.
              </p>
              <div className="space-y-1 text-[11px] text-slate-400 border-t border-slate-700/60 pt-3 mb-4">
                <div className="flex items-center gap-1.5">
                  <span className="text-indigo-400">•</span> Punjab & Haryana High Court
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-indigo-400">•</span> High Court of Delhi (New Delhi)
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-indigo-400">•</span> Allahabad High Court (UP)
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-indigo-400">•</span> Rajasthan High Court (Jodhpur/Jaipur)
                </div>
              </div>
            </div>
            <Link
              to="/courts"
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1"
            >
              View Court Directory <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 3: Study Centre & Short Notes */}
          <div className="bg-slate-800/80 rounded-lg p-6 border border-slate-700/80 hover:border-amber-500/50 transition flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/20">
                <GraduationCap className="w-4 h-4" />
              </div>
              <h3 className="text-base font-serif font-bold text-slate-100 mb-2">
                Judiciary Exam Study Centre
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                High-yield revision capsules, essential statutory ingredients checklists, and comparative tables for State Judicial Services.
              </p>
              <div className="space-y-1 text-[11px] text-slate-400 border-t border-slate-700/60 pt-3 mb-4">
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-400">•</span> Anticipatory Bail (Sec 482 BNSS)
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-400">•</span> Res Judicata (Sec 11 CPC)
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-400">•</span> Cheque Bounce Presumptions (NI Act)
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-400">•</span> Mains Answer Framing Templates
                </div>
              </div>
            </div>
            <Link
              to="/short-notes"
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1"
            >
              Explore Short Notes <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 4: Current Affairs & Policy */}
          <div className="bg-slate-800/80 rounded-lg p-6 border border-slate-700/80 hover:border-amber-500/50 transition flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded bg-sky-500/10 text-sky-400 flex items-center justify-center mb-4 border border-sky-500/20">
                <Globe2 className="w-4 h-4" />
              </div>
              <h3 className="text-base font-serif font-bold text-slate-100 mb-2">
                Current Affairs & Gazettes
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Factual reporting on Supreme Court administrative decisions, Bar Council notifications, and parliamentary legislative acts.
              </p>
              <div className="space-y-1 text-[11px] text-slate-400 border-t border-slate-700/60 pt-3 mb-4">
                <div className="flex items-center gap-1.5">
                  <span className="text-sky-400">•</span> Phase-III eCourts Nationwide Rollout
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sky-400">•</span> BCI Cross-Border Rules Clarification
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sky-400">•</span> Union Cabinet Arbitration Reform
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sky-400">•</span> Event Date vs Report Date Timestamps
                </div>
              </div>
            </div>
            <Link
              to="/current-affairs"
              className="text-xs font-semibold text-sky-400 hover:text-sky-300 inline-flex items-center gap-1"
            >
              Read Current Affairs <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

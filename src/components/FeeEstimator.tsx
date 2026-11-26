import React, { useState } from 'react';
import { 
  DollarSign, 
  ShieldCheck, 
  HelpCircle, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  Scale,
  FileCheck
} from 'lucide-react';
import { FIRM_INFO } from '../data/legalData';

interface FeeEstimatorProps {
  onOpenFreeConsultation: (category?: string, state?: string) => void;
}

export const FeeEstimator: React.FC<FeeEstimatorProps> = ({ onOpenFreeConsultation }) => {
  const [courtType, setCourtType] = useState<'district' | 'high-court' | 'supreme-court'>('district');
  const [matterType, setMatterType] = useState<'bail' | 'criminal-trial' | 'property' | 'matrimonial'>('bail');

  return (
    <section id="fee-guide" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-300">
            <Sparkles className="w-3.5 h-3.5 text-emerald-800" />
            <span>Zero-Surprise Retainer Policy</span>
          </div>
          <h2 className="font-cormorant text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1325]">
            Transparent Retainer & Free Consultation
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            At Punia Associates, initial case review and telephonic assessment with our advocates are strictly <strong className="text-emerald-800 font-bold">100% FREE</strong>. If you decide to engage us, all trial milestones are clear and written.
          </p>
        </div>

        {/* 3 Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-xl bg-[#FAF9F7] border border-slate-200 text-slate-800">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-cormorant text-2xl font-bold text-[#0B1325] mb-2">
              100% Free Consultation
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              No consultation fee for reviewing FIRs, charge-sheets, summons, or land revenue records. You receive genuine legal guidance before spending a single rupee.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#FAF9F7] border border-slate-200 text-slate-800">
            <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center mb-3">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="font-cormorant text-2xl font-bold text-[#0B1325] mb-2">
              Staged Milestone Retainers
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              No demand for lump-sum money. Fees are divided systematically across trial stages (Notice of Motion, Bail Argument, Cross-Examination, Final Arguments).
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#FAF9F7] border border-slate-200 text-slate-800">
            <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center mb-3">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="font-cormorant text-2xl font-bold text-[#0B1325] mb-2">
              All Court Expenses Itemized
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Official court fees, certified copy charges, process fees, and advocate clerks' allowances are recorded with official receipts and shared with the client.
            </p>
          </div>
        </div>

        {/* Free Consultation Callout Banner */}
        <div className="bg-[#0B1325] rounded-2xl p-8 sm:p-10 text-white flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl border border-slate-800">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
              Zero Financial Risk Initial Consultation
            </span>
            <h3 className="font-cormorant text-3xl sm:text-4xl font-bold text-white mb-2">
              Speak with a Senior Advocate for 100% FREE
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Facing imminent police action, land encroachment, or a pending High Court date in Haryana, UP, or Rajasthan? Talk directly to our lead counsel without any obligation.
            </p>
          </div>

          <button
            onClick={() => onOpenFreeConsultation()}
            className="w-full lg:w-auto px-8 py-4 bg-amber-500 hover:bg-amber-400 text-[#0B1325] font-bold text-sm rounded-lg transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <Sparkles className="w-4 h-4 text-[#0B1325]" />
            <span>Book Your Free Consultation Call</span>
          </button>
        </div>
      </div>
    </section>
  );
};

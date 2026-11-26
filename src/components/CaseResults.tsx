import React, { useState } from 'react';
import { 
  Award, 
  MapPin, 
  Scale, 
  CheckCircle2, 
  Calendar, 
  ShieldCheck, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { CASE_PREPARED_RESULTS, CasePrecedent } from '../data/legalData';

export const CaseResults: React.FC = () => {
  const [filterState, setFilterState] = useState<string>('All');

  const filteredResults = filterState === 'All'
    ? CASE_PREPARED_RESULTS
    : CASE_PREPARED_RESULTS.filter(r => r.state === filterState);

  return (
    <section id="case-precedents" className="py-20 bg-[#FAF9F7] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-300">
            <Award className="w-3.5 h-3.5 text-emerald-800" />
            <span>Demonstrated Court Victories</span>
          </div>
          <h2 className="font-cormorant text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1325]">
            Notable High Court & District Precedents
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Real courtroom relief secured by Punia Associates across Punjab & Haryana High Court, Allahabad High Court, Rajasthan High Court, and the Supreme Court of India.
          </p>
        </div>

        {/* State Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {['All', 'Haryana', 'Uttar Pradesh', 'Rajasthan', 'Delhi NCR'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterState(st)}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                filterState === st
                  ? 'bg-[#0B1325] text-white shadow'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Precedents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResults.map((prec) => (
            <div
              key={prec.id}
              className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:border-amber-400 hover:shadow-lg transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded flex items-center gap-1 border border-slate-200">
                    <MapPin className="w-3 h-3 text-amber-700" />
                    <span>{prec.state}</span>
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{prec.year}</span>
                  </span>
                </div>

                <span className="text-xs font-bold text-amber-900 block mb-1">
                  {prec.court}
                </span>

                <h3 className="font-cormorant text-xl font-bold text-[#0B1325] mb-2 leading-snug">
                  {prec.matterType}
                </h3>

                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                  {prec.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <div className="p-3 rounded bg-emerald-50 border border-emerald-200">
                  <span className="text-[10px] font-bold text-emerald-900 uppercase tracking-widest block mb-0.5">
                    Judicial Relief Secured:
                  </span>
                  <span className="text-xs font-semibold text-emerald-800 leading-tight block">
                    {prec.reliefGranted}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-8 text-center text-slate-500 text-[11px]">
          * Case summaries represent actual court precedents. Under Bar Council of India rules, prior judicial outcomes do not guarantee an identical result in future proceedings.
        </div>
      </div>
    </section>
  );
};

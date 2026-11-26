import React, { useState } from 'react';
import { 
  HelpCircle, 
  Search, 
  Scale, 
  BookOpen, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { VERIFIED_LEGAL_FAQS, LegalFaqItem } from '../data/legalCmsData';

export const FaqPage: React.FC = () => {
  const [faqs] = useState<LegalFaqItem[]>(VERIFIED_LEGAL_FAQS);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = faqs.filter(f => {
    const matchesSearch = search === '' ||
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase()) ||
      f.statuteReference.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || f.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <SEOHead
        title="Frequently Asked Questions | Punia Associates Legal Guidance"
        description="Verified procedural answers to common legal questions on Anticipatory Bail, BNSS 2023, Cheque Bounce Section 138, Land Partition Sanad Takseem, and High Court writ remedies."
        canonicalPath="/faq"
      />

      {/* Header */}
      <section className="bg-gradient-to-b from-[#0A1120] via-[#0F1B33] to-[#0A1120] text-white pt-24 pb-14 border-b border-amber-500/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Procedural FAQs</span>
          </div>

          <h1 className="font-cormorant text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
            Frequently Asked Legal Questions
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed font-light">
            Clear, authoritative procedural explanations grounded in codified Indian statutes and landmark Supreme Court decisions. Prepared strictly for public legal awareness.
          </p>

          {/* Search Bar */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-2 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by topic, e.g., bail, cheque bounce, arrest, partition..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                aria-label="Filter by legal FAQ category"
                className="w-full px-3 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 transition-colors cursor-pointer"
              >
                <option value="All">All Categories</option>
                <option value="High Court Practice">High Court Practice</option>
                <option value="Criminal Law">Criminal Law & Bail</option>
                <option value="Civil & Property">Civil & Property</option>
                <option value="Cheque Bounce">Cheque Bounce (NI Act)</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Accordion FAQ Listing */}
      <section className="py-12 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white border border-slate-200 hover:border-amber-500/40 rounded-2xl overflow-hidden shadow-sm transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <div>
                    <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200/80 mb-2 inline-block">
                      {faq.category}
                    </span>
                    <h3 className="font-cormorant text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                      {faq.question}
                    </h3>
                  </div>
                  <div className="p-1 rounded-lg bg-slate-100 text-slate-600 shrink-0 mt-1">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-4 animate-in fade-in">
                    <p className="mb-4 text-slate-800">
                      {faq.answer}
                    </p>

                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs text-slate-600">
                      <div className="flex items-center gap-1.5 font-mono">
                        <Scale className="w-3.5 h-3.5 text-amber-700" />
                        <span>Statutory Reference: <strong className="text-slate-800 font-semibold">{faq.statuteReference}</strong></span>
                      </div>
                      <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Verified Legal Principle</span>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* BCI Disclaimer */}
        <div className="mt-12 p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-slate-700 text-xs leading-relaxed">
          <div className="flex items-center gap-2 text-amber-900 font-bold mb-1">
            <Scale className="w-4 h-4 text-amber-700" />
            <span>Bar Council of India Rule 36 Statutory Notice</span>
          </div>
          <p>
            The questions and answers provided on this webpage are for informational and academic purposes only. They are not intended as a substitute for individual professional advice from an advocate. The answers do not create an advocate-client relationship.
          </p>
        </div>
      </section>
    </>
  );
};

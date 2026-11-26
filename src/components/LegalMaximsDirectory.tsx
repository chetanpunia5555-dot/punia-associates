import React, { useState, useMemo } from 'react';
import { BookMarked, Search, Scale, Sparkles, Check, Copy } from 'lucide-react';

interface LegalMaxim {
  maxim: string;
  literalMeaning: string;
  category: 'Constitutional & Natural Justice' | 'Criminal Jurisprudence' | 'Contract & Commercial' | 'Torts & Civil Equity';
  legalPrinciple: string;
  leadingPrecedentOrStatute: string;
  practicalApplication: string;
}

const MAXIMS_DATA: LegalMaxim[] = [
  {
    maxim: 'Audi Alteram Partem',
    literalMeaning: 'Hear the other side / No person should be condemned unheard',
    category: 'Constitutional & Natural Justice',
    legalPrinciple: 'The cornerstone of natural justice; mandates that every person facing adverse civil or criminal consequences must be given adequate notice and a fair opportunity to be heard.',
    leadingPrecedentOrStatute: 'Maneka Gandhi v. Union of India (1978 AIR 597) / Ridge v. Baldwin [1964] AC 40',
    practicalApplication: 'Invalidates administrative, departmental, and judicial orders passed in violation of fair hearing principles.'
  },
  {
    maxim: 'Nemo Judex In Causa Sua',
    literalMeaning: 'No person shall be a judge in their own cause',
    category: 'Constitutional & Natural Justice',
    legalPrinciple: 'Rule against bias; disqualifies any adjudicator with personal, pecuniary, or subject-matter interest in the outcome of the proceeding.',
    leadingPrecedentOrStatute: 'A.K. Kraipak v. Union of India (1970 AIR 150) / Dimes v. Grand Junction Canal (1852)',
    practicalApplication: 'Applied to set aside arbitration appointments, disciplinary inquiry findings, and tribunal rulings where real likelihood of bias is demonstrated.'
  },
  {
    maxim: 'Actus Reus Non Facit Reum Nisi Mens Sit Rea',
    literalMeaning: 'An act does not make a person guilty unless the mind is also guilty',
    category: 'Criminal Jurisprudence',
    legalPrinciple: 'The foundational premise of modern criminal liability; crime requires the concurrence of an unlawful overt physical act (actus reus) and a culpable guilty state of mind (mens rea).',
    leadingPrecedentOrStatute: 'Bharatiya Nyaya Sanhita, 2023 (General Exceptions) / R v. Tolson (1889)',
    practicalApplication: 'Essential defense in criminal trials involving mistake of fact, bona fide action, absence of fraudulent or dishonest intention.'
  },
  {
    maxim: 'Ubi Jus Ibi Remedium',
    literalMeaning: 'Where there is a right, there is a remedy',
    category: 'Torts & Civil Equity',
    legalPrinciple: 'Whenever the law confers a civil or fundamental right upon a person, it necessarily provides a legal mechanism or judicial forum for vindicating and enforcing that right.',
    leadingPrecedentOrStatute: 'Ashby v. White (1703) 92 ER 126 / Constitution of India (Article 32 & 226)',
    practicalApplication: 'Foundation of constitutional writ jurisdiction, damages in tort, and restitutionary remedies in civil law.'
  },
  {
    maxim: 'Pacta Sunt Servanda',
    literalMeaning: 'Agreements must be kept / Promises are sacred',
    category: 'Contract & Commercial',
    legalPrinciple: 'Fundamental principle of contract law and public international law; parties to an agreement are bound to fulfill their reciprocal statutory and contractual covenants in good faith.',
    leadingPrecedentOrStatute: 'Vienna Convention on the Law of Treaties, 1969 (Article 26) / Indian Contract Act, 1872 (Section 37)',
    practicalApplication: 'Enforces sanctity of international commercial agreements, cross-border arbitration awards, and specific performance of contracts.'
  },
  {
    maxim: 'Damnum Sine Injuria',
    literalMeaning: 'Damage without legal injury',
    category: 'Torts & Civil Equity',
    legalPrinciple: 'Mere economic loss, financial detriment, or practical inconvenience suffered by a plaintiff does not give rise to a legal cause of action unless a recognized legal right has been violated.',
    leadingPrecedentOrStatute: 'Gloucester Grammar School Case (1410) / Chasemore v. Richards (1859)',
    practicalApplication: 'Protects lawful market competition, opening of competing businesses, and exercise of lawful proprietary privileges.'
  },
  {
    maxim: 'Injuria Sine Damno',
    literalMeaning: 'Injury to legal right without actual physical or pecuniary damage',
    category: 'Torts & Civil Equity',
    legalPrinciple: 'Actionable tort arises immediately upon the infringement of an absolute private legal right, even if the claimant suffered no monetary loss or bodily harm.',
    leadingPrecedentOrStatute: 'Ashby v. White (1703) (Deprivation of right to vote) / Bhim Singh v. State of J&K (1985)',
    practicalApplication: 'Used in constitutional torts, illegal police detention claims, trespass to person and property, and nominal damages actions.'
  },
  {
    maxim: 'Volenti Non Fit Injuria',
    literalMeaning: 'To a willing person, injury is not done',
    category: 'Torts & Civil Equity',
    legalPrinciple: 'Complete defense in the law of torts; a person who voluntarily consents to run the risk of harm with full knowledge and appreciation cannot claim damages for resulting injury.',
    leadingPrecedentOrStatute: 'Hall v. Brooklands Auto Racing Club [1933] / Smith v. Baker [1891]',
    practicalApplication: 'Applies to spectator sports, voluntary medical consent, and assumption of risks, but strictly inapplicable to rescue cases and employer statutory negligence.'
  },
  {
    maxim: 'Res Ipsa Loquitur',
    literalMeaning: 'The thing speaks for itself',
    category: 'Torts & Civil Equity',
    legalPrinciple: 'Rule of evidentiary presumption; where the instrumentality causing the accident was under exclusive management of the defendant and the accident would not ordinarily happen without negligence, the burden shifts to defendant.',
    leadingPrecedentOrStatute: 'Byrne v. Boadle (1863) 159 ER 299 / Municipal Corporation of Delhi v. Subhagwanti (1966 AIR 1750)',
    practicalApplication: 'Extensively applied in medical negligence, construction collapse, public transport accidents, and statutory product defect litigation.'
  },
  {
    maxim: 'Ignorantia Facti Excusat, Ignorantia Juris Non Excusat',
    literalMeaning: 'Ignorance of fact excuses, ignorance of the law does not excuse',
    category: 'Criminal Jurisprudence',
    legalPrinciple: 'Every citizen is presumed to know the law of the land; mistake of fact made in good faith may negate criminal intent, but mistake or lack of knowledge of statute is no legal defense.',
    leadingPrecedentOrStatute: 'Bharatiya Nyaya Sanhita, 2023 (Section 14) / R v. Prince (1875)',
    practicalApplication: 'Protects statutory compliance regimes, regulatory tax enforcement, and penal prosecutions from subjective pleas of ignorance.'
  },
  {
    maxim: 'Stare Decisis Et Non Quieta Movere',
    literalMeaning: 'To stand by decisions and not to disturb what is settled',
    category: 'Constitutional & Natural Justice',
    legalPrinciple: 'Doctrine of judicial precedent; lower courts and benches are bound by the ratio decidendi of higher courts to ensure stability, consistency, and predictability in the legal order.',
    leadingPrecedentOrStatute: 'Constitution of India (Article 141) / Keshav Mills Co. Ltd. v. CIT (1965)',
    practicalApplication: 'Ensures that decisions of the Supreme Court of India and international appellate tribunals are uniformly binding on all subordinate forums.'
  },
  {
    maxim: 'Falsus In Uno, Falsus In Omnibus',
    literalMeaning: 'False in one thing, false in everything',
    category: 'Criminal Jurisprudence',
    legalPrinciple: 'Doctrine of appraisal of witness testimony; while strictly not an inflexible rule of law in India, courts separate the grain of truth from the chaff of falsehood in witness depositions.',
    leadingPrecedentOrStatute: 'Ugar Ahir v. State of Bihar (1965 AIR 277) / Nisar Ali v. State of U.P.',
    practicalApplication: 'Applied in criminal trials during cross-examination to evaluate whether contradictions in testimony render the prosecution case fundamentally unreliable.'
  }
];

export const LegalMaximsDirectory: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedMaxim, setCopiedMaxim] = useState<string | null>(null);

  const categories = ['all', 'Constitutional & Natural Justice', 'Criminal Jurisprudence', 'Contract & Commercial', 'Torts & Civil Equity'];

  const filtered = useMemo(() => {
    return MAXIMS_DATA.filter(m => {
      const matchSearch =
        m.maxim.toLowerCase().includes(search.toLowerCase()) ||
        m.literalMeaning.toLowerCase().includes(search.toLowerCase()) ||
        m.legalPrinciple.toLowerCase().includes(search.toLowerCase()) ||
        m.leadingPrecedentOrStatute.toLowerCase().includes(search.toLowerCase());

      const matchCat = selectedCategory === 'all' || m.category === selectedCategory;
      return matchSearch && matchCat;
    });
  }, [search, selectedCategory]);

  const handleCopy = (maxim: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMaxim(maxim);
    setTimeout(() => setCopiedMaxim(null), 2000);
  };

  return (
    <section className="bg-slate-50/70 rounded-3xl border border-slate-200 p-6 sm:p-8 my-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-900 border border-amber-500/20 text-xs font-bold tracking-wide uppercase mb-2">
            <BookMarked className="w-3.5 h-3.5 text-amber-700" />
            Legal Scholarly Repository
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
            Dictionary of Fundamental Legal Maxims & Latin Doctrines
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
            Authoritative definitions, judicial interpretations, and practical courtroom applications of the core legal maxims governing Indian and global jurisprudence.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search maxim, translation, case..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 shadow-sm"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-4 scrollbar-none text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#005A36] text-white shadow'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            {cat === 'all' ? 'All Maxims (12)' : cat}
          </button>
        ))}
      </div>

      {/* Maxims Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
        {filtered.map((item, idx) => {
          const isCopied = copiedMaxim === item.maxim;
          const citationBlock = `${item.maxim} — ${item.literalMeaning}\nPrinciple: ${item.legalPrinciple}\nPrecedent: ${item.leadingPrecedentOrStatute}`;

          return (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 bg-white hover:border-amber-500/50 hover:shadow-lg transition-all p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3 mb-3">
                  <div>
                    <h3 className="font-serif font-bold text-base text-[#0B1325] italic">
                      "{item.maxim}"
                    </h3>
                    <p className="text-xs font-semibold text-amber-800 mt-0.5">
                      {item.literalMeaning}
                    </p>
                  </div>
                  <button
                    onClick={() => handleCopy(item.maxim, citationBlock)}
                    title="Copy Maxim Citation"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-amber-700 hover:bg-amber-50 transition cursor-pointer shrink-0"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div className="mb-2.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Core Legal Principle
                  </span>
                  <p className="text-xs text-slate-700 mt-0.5 leading-relaxed">
                    {item.legalPrinciple}
                  </p>
                </div>

                <div className="mb-2.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Leading Precedent / Statutory Reference
                  </span>
                  <p className="text-xs font-bold text-slate-800 mt-0.5">
                    {item.leadingPrecedentOrStatute}
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 bg-slate-50 -mx-5 -mb-5 p-3.5 rounded-b-2xl">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Courtroom Practice & Application
                </span>
                <p className="text-[11px] text-slate-700 mt-0.5 font-medium">
                  {item.practicalApplication}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

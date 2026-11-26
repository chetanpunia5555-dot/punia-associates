import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Search, 
  Filter, 
  BookOpen, 
  CheckCircle2, 
  Copy, 
  Check, 
  Printer, 
  Sparkles, 
  Scale, 
  FileText,
  Landmark,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { SHORT_NOTES_DATA, LegalShortNote } from '../data/studyCentreData';
import { SEOHead } from '../components/SEOHead';

export const ShortNotesPage: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedNoteId, setExpandedNoteId] = useState<string>(SHORT_NOTES_DATA[0].id);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const subjects = [
    'Criminal Law (BNS/BNSS)',
    'Civil Procedure (CPC)',
    'Constitutional Law',
    'Evidence (BSA)',
    'Contract & Commercial'
  ];

  const filteredNotes = useMemo(() => {
    return SHORT_NOTES_DATA.filter(n => {
      const matchSubject = selectedSubject === 'all' || n.subject === selectedSubject;
      const matchSearch = 
        n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.statutoryReference.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.essentialIngredients.some(i => i.toLowerCase().includes(searchTerm.toLowerCase())) ||
        n.topicTag.toLowerCase().includes(searchTerm.toLowerCase());

      return matchSubject && matchSearch;
    });
  }, [selectedSubject, searchTerm]);

  const handleCopyNote = (note: LegalShortNote) => {
    const text = `PUNIA ASSOCIATES LEGAL STUDY CENTRE\nSubject: ${note.subject}\nTopic: ${note.title}\nReference: ${note.statutoryReference}\n\nESSENTIAL INGREDIENTS:\n${note.essentialIngredients.map((ing, i) => `${i + 1}. ${ing}`).join('\n')}\n\nLANDMARK PRECEDENTS:\n${note.landmarkPrecedents.map(p => `• ${p.title} (${p.citation}): ${p.rule}`).join('\n')}\n\nMAINS ANSWER TIPS:\n${note.mainsAnswerFramingTips.map(t => `- ${t}`).join('\n')}\n\n[Sourced from puniaassociates.site]`;
    navigator.clipboard.writeText(text);
    setCopiedId(note.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <>
      <SEOHead
        title="Legal Short Notes & Judicial Exam Revision Library | Punia Associates"
        description="Concise, high-yield legal short notes on BNS, BNSS, BSA, CPC, and Constitutional Law for advocates, law students, and judicial services examination aspirants."
        canonicalUrl="https://puniaassociates.site/short-notes"
      />

      <div className="bg-[#0B1325] text-white py-14 border-b border-amber-500/20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-3">
                <GraduationCap className="w-3.5 h-3.5" /> Judicial Services & Advocacy Study Centre
              </div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-100">
                High-Yield Legal Short Notes & Doctrine Briefs
              </h1>
              <p className="mt-2 text-slate-300 text-sm md:text-base max-w-3xl leading-relaxed">
                Structured legal revision capsules with statutory ingredients, doctrinal distinctions, landmark case ratio, and mains answer framing frameworks.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link 
                to="/case-briefs" 
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded text-xs font-semibold transition"
              >
                View Case Briefs
              </Link>
              <Link 
                to="/bare-acts" 
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold rounded text-xs transition"
              >
                Bare Acts Library
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search & Filter Toolbar */}
        <div className="bg-white p-4 sm:p-5 rounded-lg border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search short notes by topic, section, or concept (e.g. Anticipatory Bail, Res Judicata, NI Act)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 bg-slate-50/50"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600">Subject:</span>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="border border-slate-200 bg-white px-3 py-1.5 rounded text-xs font-medium text-slate-800 focus:outline-none"
            >
              <option value="all">All Subjects</option>
              {subjects.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Short Notes Accordion / Cards List */}
        <div className="space-y-6">
          {filteredNotes.map((note) => {
            const isExpanded = expandedNoteId === note.id;

            return (
              <div 
                key={note.id}
                className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden transition"
              >
                {/* Note Header / Accordion trigger */}
                <div 
                  onClick={() => setExpandedNoteId(isExpanded ? '' : note.id)}
                  className="p-5 sm:p-6 bg-slate-50/70 hover:bg-slate-50 cursor-pointer flex items-start justify-between gap-4 border-b border-slate-100"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="bg-amber-100 text-amber-900 border border-amber-200 px-2.5 py-0.5 rounded text-[11px] font-bold uppercase">
                        {note.subject}
                      </span>
                      <span className="bg-slate-200/80 text-slate-700 px-2.5 py-0.5 rounded text-[11px] font-medium">
                        {note.topicTag}
                      </span>
                      <span className="text-xs text-slate-500">
                        Updated: {note.lastUpdated}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-serif font-bold text-slate-900">
                      {note.title}
                    </h3>
                    <p className="text-xs font-mono text-amber-800 font-semibold mt-1">
                      {note.statutoryReference}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyNote(note);
                      }}
                      className="p-2 text-slate-500 hover:text-slate-900 bg-white border border-slate-200 rounded transition"
                      title="Copy Short Note"
                    >
                      {copiedId === note.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <div className="p-2 text-slate-400">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Details Body */}
                {isExpanded && (
                  <div className="p-6 sm:p-8 space-y-8">
                    {/* 1. Essential Ingredients Checklist */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2 mb-3">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Essential Statutory Ingredients (Sine Qua Non):</span>
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {note.essentialIngredients.map((ing, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 bg-slate-50 p-3 rounded border border-slate-100 text-xs text-slate-700 leading-relaxed">
                            <span className="font-bold text-amber-600 shrink-0 mt-0.5">{idx + 1}.</span>
                            <span>{ing}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 2. Key Doctrinal Distinctions Table */}
                    {note.keyDistinctions && (
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2 mb-3">
                          <Scale className="w-4 h-4 text-amber-600" />
                          <span>Key Doctrinal Distinction Table:</span>
                        </h4>
                        <div className="overflow-x-auto border border-slate-200 rounded-lg">
                          <table className="w-full text-xs text-left">
                            <thead className="bg-slate-100 text-slate-800 font-bold uppercase text-[11px] border-b border-slate-200">
                              <tr>
                                <th className="p-3 w-1/4">Basis of Difference</th>
                                <th className="p-3 w-3/8 text-indigo-900">{note.keyDistinctions.conceptA}</th>
                                <th className="p-3 w-3/8 text-amber-900">{note.keyDistinctions.conceptB}</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-slate-700">
                              {note.keyDistinctions.points.map((pt, pIdx) => (
                                <tr key={pIdx} className="hover:bg-slate-50/50">
                                  <td className="p-3 font-semibold bg-slate-50/70 text-slate-800">{pt.basis}</td>
                                  <td className="p-3 leading-relaxed">{pt.differenceA}</td>
                                  <td className="p-3 leading-relaxed">{pt.differenceB}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* 3. Landmark Precedents */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2 mb-3">
                        <Landmark className="w-4 h-4 text-slate-600" />
                        <span>Landmark Case Law & Binding Principles:</span>
                      </h4>
                      <div className="space-y-3">
                        {note.landmarkPrecedents.map((prec, idx) => (
                          <div key={idx} className="bg-amber-50/40 p-3.5 rounded border-l-2 border-amber-600 text-xs">
                            <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                              <strong className="text-slate-900 font-serif text-sm">{prec.title}</strong>
                              <span className="font-mono text-[11px] text-slate-500 font-medium">{prec.citation}</span>
                            </div>
                            <p className="text-slate-700 leading-relaxed italic">
                              "{prec.rule}"
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 4. Mains Answer Framing Framework */}
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-indigo-600" />
                        <span>Judiciary Mains Answer Framing Strategy:</span>
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {note.mainsAnswerFramingTips.map((tip, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-indigo-600 font-bold shrink-0">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

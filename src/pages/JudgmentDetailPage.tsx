import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Scale, 
  Calendar, 
  Building2, 
  FileText, 
  ExternalLink, 
  Copy, 
  Check, 
  Printer, 
  Share2, 
  ArrowLeft, 
  ShieldCheck, 
  AlertCircle,
  BookOpen,
  CheckCircle2,
  Bookmark,
  Download
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Judgment } from '../data/legalCmsData';

export const JudgmentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [judgment, setJudgment] = useState<Judgment | null>(null);
  const [relatedCases, setRelatedCases] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const fetchJudgment = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/judgments/${id}`);
        if (res.ok) {
          const data = await res.json();
          setJudgment(data.judgment);
          setRelatedCases(data.relatedCases || []);
        } else {
          setJudgment(null);
        }
      } catch (err) {
        console.error('Error fetching judgment', err);
        setJudgment(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchJudgment();
      window.scrollTo(0, 0);
    }
  }, [id]);

  const handleCopyCitation = () => {
    if (!judgment) return;
    const citationText = `${judgment.caseTitle}, ${judgment.neutralCitation || judgment.reportedCitation || judgment.caseNumber} (${judgment.court}, ${judgment.decisionDate})`;
    navigator.clipboard.writeText(citationText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF9F7] py-24 text-center space-y-4">
        <Scale className="w-10 h-10 text-amber-600 animate-spin mx-auto" />
        <p className="text-xs text-slate-500 font-medium">Retrieving Official Judicial Precedent Record...</p>
      </div>
    );
  }

  if (!judgment) {
    return (
      <div className="min-h-screen bg-[#FAF9F7] py-24 px-4 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <AlertCircle className="w-10 h-10 text-amber-600 mx-auto" />
          <h2 className="font-cormorant text-2xl font-bold text-slate-800">Judgment Record Not Found</h2>
          <p className="text-xs text-slate-600 leading-relaxed font-light">
            The requested judgment could not be located in the current repository index. It may have been archived or is undergoing legal verification.
          </p>
          <Link
            to="/judgments"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#0B1325] text-white text-xs font-bold rounded-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Case Law Library</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title={`${judgment.caseTitle} | Judgments & Precedents | Punia Associates`}
        description={`Comprehensive legal analysis and binding ratio decidendi of ${judgment.caseTitle} (${judgment.court}, ${judgment.decisionDate}). Citation: ${judgment.neutralCitation || judgment.reportedCitation}.`}
        canonicalPath={`/judgments/${judgment.id}`}
      />

      <article className="bg-[#FAF9F7] min-h-screen text-[#1E293B] pb-20">
        
        {/* Top Header Banner */}
        <header className="bg-[#0B1325] text-white border-b border-slate-800 py-10 lg:py-14 relative print:bg-white print:text-black">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Navigation & Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 mb-4 print:hidden">
              <Link to="/judgments" className="hover:text-amber-400 flex items-center gap-1.5 font-medium transition-colors">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Case Law Library</span>
              </Link>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyCitation}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-medium"
                  title="Copy formatted legal citation"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
                  <span>{isCopied ? 'Citation Copied!' : 'Copy Citation'}</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-medium"
                  title="Print this judgment summary"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-300" />
                  <span>Print</span>
                </button>
              </div>
            </div>

            {/* Court & Bench Metadata Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-3 text-xs">
              <span className="font-bold text-amber-400 flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-amber-500" />
                <span>{judgment.court}</span>
              </span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-300 font-medium">{judgment.judgmentType}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="flex items-center gap-1 text-slate-300">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Decided: {judgment.decisionDate}</span>
              </span>
            </div>

            {/* Case Title */}
            <h1 className="font-cormorant text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight mb-4">
              {judgment.caseTitle}
            </h1>

            {/* Key Citations & Case Number Strip */}
            <div className="p-3.5 bg-slate-900/90 border border-slate-700/80 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <div>
                  <span className="text-slate-400 mr-2">Case Identification:</span>
                  <strong className="text-white font-mono">{judgment.caseNumber}</strong>
                </div>
                {judgment.neutralCitation && (
                  <div>
                    <span className="text-slate-400 mr-2">Neutral Citation:</span>
                    <strong className="text-amber-300 font-mono">{judgment.neutralCitation}</strong>
                  </div>
                )}
                {judgment.reportedCitation && (
                  <div>
                    <span className="text-slate-400 mr-2">Reported Citation:</span>
                    <strong className="text-slate-200 font-mono">{judgment.reportedCitation}</strong>
                  </div>
                )}
              </div>

              <div className="text-right">
                <span className="block text-[11px] text-slate-400">Legal Subject</span>
                <span className="text-amber-300 font-medium text-xs">{judgment.subject}</span>
              </div>
            </div>

            {/* Coram / Bench */}
            <div className="mt-3 text-xs text-slate-300 font-light">
              <strong className="text-white font-medium">Coram / Bench Composition: </strong>
              {judgment.coram}
            </div>
          </div>
        </header>

        {/* Main Judgment Analysis Body */}
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
          
          {/* 1. Statues & Sections Invoked */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="font-cinzel text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-600" />
              <span>1. Relevant Acts & Statutory Provisions</span>
            </h2>
            <div className="flex flex-wrap gap-2 text-xs">
              {judgment.statutes.map((st, i) => (
                <span key={i} className="px-3 py-1 bg-slate-100 rounded-lg text-slate-800 font-medium border border-slate-200">
                  {st}
                </span>
              ))}
              {judgment.sections.map((sec, i) => (
                <span key={`sec-${i}`} className="px-3 py-1 bg-amber-50 rounded-lg text-amber-900 font-medium border border-amber-200">
                  {sec}
                </span>
              ))}
            </div>
          </section>

          {/* 2. Facts of the Case */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
            <h2 className="font-cinzel text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-600" />
              <span>2. Factual Background</span>
            </h2>
            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed font-light whitespace-pre-line">
              {judgment.facts}
            </div>
          </section>

          {/* 3. Substantive Legal Issues Framed */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
            <h2 className="font-cinzel text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <Scale className="w-4 h-4 text-amber-600" />
              <span>3. Substantive Questions of Law Before the Court</span>
            </h2>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
              {judgment.legalIssues.map((issue, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="font-bold text-amber-800 shrink-0 font-mono mt-0.5">({i + 1})</span>
                  <span className="leading-relaxed font-light">{issue}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 4. Arguments of Counsel (Where reliable record available) */}
          {judgment.arguments && (
            <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
              <h2 className="font-cinzel text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-600" />
                <span>4. Arguments & Contentions of Parties</span>
              </h2>
              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed font-light whitespace-pre-line">
                {judgment.arguments}
              </div>
            </section>
          )}

          {/* 5. BINDING RATIO DECIDENDI (Highlighted with utmost precision) */}
          <section className="bg-[#FAF8F5] rounded-2xl border-2 border-amber-500/80 p-6 sm:p-7 shadow-md space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-amber-200">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-700" />
                <h2 className="font-cormorant text-xl sm:text-2xl font-bold text-[#0B1325]">
                  5. Binding Ratio Decidendi (Legal Holding)
                </h2>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-200 text-amber-900 px-2.5 py-0.5 rounded font-mono">
                Binding Precedent
              </span>
            </div>

            <p className="text-xs text-amber-800 font-serif italic">
              The primary legal principle upon which the court based its judgment. This holding constitutes binding precedent under Article 141 (Supreme Court) or within High Court jurisdiction.
            </p>

            <div className="text-xs sm:text-sm text-slate-900 leading-relaxed font-medium bg-white p-4 rounded-xl border border-amber-200 shadow-inner">
              {judgment.ratioDecidendi}
            </div>
          </section>

          {/* 6. Obiter Dicta (Explicitly demarcated so as not to be confused with binding law) */}
          {judgment.obiterDicta && (
            <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h2 className="font-cinzel text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-slate-400" />
                  <span>6. Obiter Dicta (Judicial Observations)</span>
                </h2>
                <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded font-mono">
                  Persuasive / Non-Binding
                </span>
              </div>
              <p className="text-xs text-slate-500 font-light italic">
                Incidental remarks and broader observations made by the court which do not form part of the binding legal ratio.
              </p>
              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed font-light">
                {judgment.obiterDicta}
              </div>
            </section>
          )}

          {/* 7. Key Legal Principles Established */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
            <h2 className="font-cinzel text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>7. Core Legal Principles Laid Down</span>
            </h2>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
              {judgment.legalPrinciples.map((principle, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-2" />
                  <span className="leading-relaxed font-light">{principle}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 8. Key Paragraph References */}
          {judgment.keyParagraphs.length > 0 && (
            <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
              <h2 className="font-cinzel text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-600" />
                <span>8. Crucial Paragraph References</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {judgment.keyParagraphs.map((para, i) => (
                  <div key={i} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 font-mono text-slate-800">
                    {para}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 9. Final Decision & Subsequent Judicial Treatment */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
            <h2 className="font-cinzel text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <Scale className="w-4 h-4 text-amber-600" />
              <span>9. Final Operative Order & Subsequent Judicial Treatment</span>
            </h2>
            <div className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium bg-slate-50 p-4 rounded-xl border border-slate-200">
              <strong className="block text-slate-900 mb-1">Operative Order:</strong>
              {judgment.finalDecision}
            </div>

            {judgment.subsequentTreatment && (
              <div className="pt-2 text-xs text-slate-600">
                <strong className="font-semibold text-slate-700 block mb-1">Subsequent Treatment / Current Status:</strong>
                <p className="leading-relaxed font-light">{judgment.subsequentTreatment}</p>
              </div>
            )}
          </section>

          {/* 10. Official Source Documents & Verification Metadata */}
          <section className="bg-slate-900 text-white rounded-2xl p-6 sm:p-7 shadow-lg space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-amber-400" />
                <h3 className="font-cinzel text-xs font-bold uppercase tracking-wider text-white">
                  10. Official Primary Source Record
                </h3>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified: {judgment.verifiedAt}</span>
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-light">
              This editorial summary was compiled and verified by Punia Associates from the official judicial record. You can inspect or download the original primary court record directly:
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={judgment.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-[#0B1325] text-xs font-bold rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open Official Primary Source ({judgment.sourceUrl})</span>
              </a>

              {judgment.officialPdfUrl && (
                <a
                  href={judgment.officialPdfUrl}
                  download
                  className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg border border-emerald-600 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-amber-300" />
                  <span>Download Govt-Sourced Judgment PDF</span>
                </a>
              )}
            </div>

            {judgment.officialPdfUrl && (
              <div className="mt-4 rounded-xl overflow-hidden border border-slate-700 bg-slate-950">
                <div className="px-3 py-2 bg-slate-800/90 text-[11px] font-mono text-slate-300 flex items-center justify-between">
                  <span>Local Govt-Sourced PDF Copy: {judgment.officialPdfUrl}</span>
                  <span className="text-emerald-400">SHA-256 Verified</span>
                </div>
                <iframe
                  src={judgment.officialPdfUrl}
                  title={`${judgment.caseTitle} Official PDF`}
                  className="w-full h-96 bg-white"
                />
              </div>
            )}

            <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex flex-wrap items-center justify-between gap-2">
              <span>Editorial Attribution: {judgment.author}</span>
              <span>Peer Reviewer: {judgment.reviewer || 'Senior Advocate Panel'}</span>
            </div>
          </section>

          {/* Related Cases Section */}
          {relatedCases.length > 0 && (
            <section className="pt-6 border-t border-slate-200 space-y-4">
              <h3 className="font-cormorant text-2xl font-bold text-[#0B1325]">
                Related Case Law & Precedents
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedCases.map((rc) => (
                  <Link
                    key={rc.id}
                    to={`/judgments/${rc.id}`}
                    className="p-4 bg-white rounded-xl border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all block group"
                  >
                    <span className="text-[10px] text-amber-800 font-bold block mb-1">{rc.court}</span>
                    <h4 className="text-xs font-bold text-slate-800 group-hover:text-amber-800 line-clamp-2 mb-2 leading-snug">
                      {rc.caseTitle}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-mono block">{rc.decisionDate}</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Legal Advisory Notice (Statutory BCI Rule 36 Disclaimer) */}
          <footer className="p-4 bg-amber-50/70 border border-amber-200/90 rounded-xl text-xs text-slate-700 space-y-1">
            <strong className="text-amber-900 block font-semibold">Statutory Reference & Research Disclaimer:</strong>
            <p className="leading-relaxed font-light">
              Judgments, orders, and statutes on this website are made available for general legal information and educational reference only. They do not constitute formal legal advice, and viewing them does not create an advocate-client relationship. Practitioners and litigants must verify the original judicial source and subsequent treatment before citing before a court of law.
            </p>
          </footer>

        </main>
      </article>
    </>
  );
};

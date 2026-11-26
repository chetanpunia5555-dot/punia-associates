import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Gavel, 
  ArrowRight, 
  Calendar, 
  Clock,
  Download,
  ShieldCheck,
  Database
} from 'lucide-react';
import { LegalArticle, Judgment, INITIAL_LEGAL_ARTICLES, INITIAL_JUDGMENTS } from '../data/legalCmsData';
import { subscribePublishedArticles, subscribePublishedJudgments } from '../firebase';

const ARTICLE_THUMBS = [
  'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=400'
];

export const HomeArticlesAndJudgments: React.FC = () => {
  const [articles, setArticles] = useState<LegalArticle[]>(INITIAL_LEGAL_ARTICLES);
  const [judgments, setJudgments] = useState<Judgment[]>(INITIAL_JUDGMENTS);
  const [govtPdfCount, setGovtPdfCount] = useState<number>(11);

  useEffect(() => {
    const loadFromApi = async () => {
      try {
        const [artRes, judgRes, dirRes] = await Promise.all([
          fetch('/api/articles'),
          fetch('/api/judgments?status=Published&limit=8'),
          fetch('/api/judgments/govt-directory')
        ]);

        if (artRes.ok) {
          const artData = await artRes.json();
          if (Array.isArray(artData.articles) && artData.articles.length > 0) {
            setArticles(artData.articles);
          }
        }
        if (judgRes.ok) {
          const judgData = await judgRes.json();
          if (Array.isArray(judgData.judgments) && judgData.judgments.length > 0) {
            setJudgments(judgData.judgments);
          }
        }
        if (dirRes.ok) {
          const dirData = await dirRes.json();
          if (typeof dirData.totalFiles === 'number') {
            setGovtPdfCount(dirData.totalFiles);
          }
        }
      } catch (err) {
        console.error('Error loading homepage database items:', err);
      }
    };

    loadFromApi();

    const unsubArticles = subscribePublishedArticles((docs) => {
      if (docs.length > 0) {
        setArticles((prev) => {
          const map = new Map<string, LegalArticle>();
          for (const d of docs) {
            map.set(String(d.id), {
              id: String(d.id),
              title: String(d.title || ''),
              format: (d.format as LegalArticle['format']) || 'Legal Explainer',
              subject: String(d.subject || 'Indian Law'),
              summary: String(d.summary || ''),
              content: String(d.content || ''),
              author: String(d.author || 'Punia Associates'),
              authorTitle: String(d.authorTitle || 'Advocate'),
              publicationDate: String(d.publicationDate || '2025-01-15'),
              updateHistory: [],
              statutesDiscussed: Array.isArray(d.statutesDiscussed) ? (d.statutesDiscussed as string[]) : [],
              precedentsCited: Array.isArray(d.precedentsCited) ? (d.precedentsCited as string[]) : [],
              readTimeMinutes: Number(d.readTimeMinutes || 6),
              status: 'Published',
              verifiedAt: 'Firestore Verified'
            });
          }
          for (const item of prev) {
            if (!map.has(item.id)) map.set(item.id, item);
          }
          return Array.from(map.values());
        });
      }
    });

    const unsubJudgments = subscribePublishedJudgments((docs) => {
      if (docs.length > 0) {
        setJudgments((prev) => {
          const map = new Map<string, Judgment>();
          for (const item of prev) {
            map.set(item.id, item);
          }
          for (const d of docs) {
            if (!map.has(String(d.id))) {
              map.set(String(d.id), {
                id: String(d.id),
                caseTitle: String(d.caseTitle || ''),
                court: String(d.court || 'Supreme Court of India'),
                courtBenchCategory: String(d.court || '').includes('Supreme Court') ? 'Supreme Court' : 'High Court',
                coram: String(d.coram || ''),
                decisionDate: String(d.decisionDate || '2024'),
                caseNumber: String(d.caseNumber || ''),
                neutralCitation: d.neutralCitation ? String(d.neutralCitation) : undefined,
                subject: String(d.subject || ''),
                statutes: Array.isArray(d.statutes) ? (d.statutes as string[]) : [],
                sections: Array.isArray(d.sections) ? (d.sections as string[]) : [],
                judgmentType: (d.judgmentType as Judgment['judgmentType']) || 'Division Bench',
                facts: String(d.facts || ''),
                legalIssues: [],
                ratioDecidendi: String(d.ratioDecidendi || ''),
                finalDecision: String(d.finalDecision || ''),
                legalPrinciples: [],
                keyParagraphs: [],
                proceduralStatus: 'Final',
                subsequentTreatment: 'Verified Primary Source',
                sourceUrl: String(d.sourceUrl || 'https://scr.sci.gov.in/'),
                officialPdfUrl: String(d.officialPdfUrl || ''),
                status: 'Published',
                author: 'Firestore DB',
                verifiedAt: 'Verified',
                createdAt: String(d.decisionDate || '2024'),
                updatedAt: String(d.decisionDate || '2024'),
                tags: []
              });
            }
          }
          return Array.from(map.values());
        });
      }
    });

    return () => {
      unsubArticles();
      unsubJudgments();
    };
  }, []);

  const featuredArticle = articles[0] || INITIAL_LEGAL_ARTICLES[0];
  const sideArticles = articles.slice(1, 4);

  const featuredJudgment = judgments[0] || INITIAL_JUDGMENTS[0];
  const sideJudgments = judgments.slice(1, 4);

  return (
    <section id="articles-and-judgments" className="py-12 lg:py-16 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* LEFT COLUMN: LATEST ARTICLES DATABASE */}
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-800" />
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                  Latest Articles
                </h2>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-md text-[10px] font-semibold">
                  <Database className="w-3 h-3" />
                  <span>{articles.length} in DB</span>
                </span>
              </div>
              <Link 
                to="/articles" 
                className="text-xs font-bold text-[#A37B31] hover:text-[#8a6624] flex items-center gap-1 transition-colors"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5">
              
              {/* Featured Article Card (Left Large) */}
              <div className="sm:col-span-6 bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between p-4">
                <div>
                  <div className="relative h-44 rounded-2xl overflow-hidden mb-3">
                    <img 
                      src={ARTICLE_THUMBS[0]} 
                      alt={featuredArticle.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 bg-[#FCE8BD] text-[#7A5B18] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {featuredArticle.format}
                    </span>
                  </div>

                  <h3 className="font-serif text-base sm:text-lg font-bold text-slate-900 leading-snug hover:text-amber-700 transition-colors mb-2 line-clamp-3">
                    <Link to="/articles">
                      {featuredArticle.title}
                    </Link>
                  </h3>
                </div>

                <div className="pt-3 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {featuredArticle.publicationDate}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {featuredArticle.readTimeMinutes} min read</span>
                  </div>
                  <Link to="/articles" className="w-7 h-7 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 flex items-center justify-center transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Side Articles List (Right 3 Cards) */}
              <div className="sm:col-span-6 space-y-3.5">
                {sideArticles.map((art, idx) => (
                  <Link
                    key={art.id}
                    to="/articles"
                    className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl transition-all flex items-center gap-3.5 group"
                  >
                    <img 
                      src={ARTICLE_THUMBS[(idx + 1) % ARTICLE_THUMBS.length]} 
                      alt={art.title} 
                      className="w-16 h-16 rounded-xl object-cover shrink-0"
                    />
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-amber-800 block mb-0.5">
                        {art.format}
                      </span>
                      <h4 className="font-bold text-xs text-slate-900 group-hover:text-amber-800 transition-colors leading-snug line-clamp-2">
                        {art.title}
                      </h4>
                      <span className="text-[10px] text-slate-500 mt-1 flex items-center gap-1 font-medium">
                        <Calendar className="w-3 h-3" /> {art.publicationDate} • {art.readTimeMinutes}m read
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: LATEST GOVT-SOURCED JUDGMENTS DIRECTORY */}
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Gavel className="w-5 h-5 text-amber-700" />
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                  Latest Judgments
                </h2>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 bg-amber-50 text-amber-900 border border-amber-200 rounded-md text-[10px] font-semibold">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>{govtPdfCount} Govt PDFs</span>
                </span>
              </div>
              <Link 
                to="/judgments" 
                className="text-xs font-bold text-[#A37B31] hover:text-[#8a6624] flex items-center gap-1 transition-colors"
              >
                <span>View Directory</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5">
              
              {/* Featured Judgment Card (Left Large) */}
              <div className="sm:col-span-6 bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between p-4">
                <div>
                  <div className="relative h-44 rounded-2xl overflow-hidden mb-3">
                    <img 
                      src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800" 
                      alt={featuredJudgment.court} 
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {featuredJudgment.court.includes('Supreme Court') ? 'Supreme Court' : 'High Court'}
                    </span>
                  </div>

                  <h3 className="font-serif text-base sm:text-lg font-bold text-slate-900 leading-snug hover:text-red-700 transition-colors mb-1 line-clamp-2">
                    <Link to={`/judgments/${featuredJudgment.id}`}>
                      {featuredJudgment.caseTitle}
                    </Link>
                  </h3>
                  <p className="text-[11px] font-mono text-emerald-800 font-semibold mb-2">
                    {featuredJudgment.neutralCitation || featuredJudgment.caseNumber}
                  </p>
                </div>

                <div className="pt-3 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {featuredJudgment.decisionDate}</span>
                  <div className="flex items-center gap-1.5">
                    {featuredJudgment.officialPdfUrl && (
                      <a
                        href={featuredJudgment.officialPdfUrl}
                        download
                        title="Download Verified Govt PDF"
                        className="w-7 h-7 rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-900 flex items-center justify-center transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <Link to={`/judgments/${featuredJudgment.id}`} className="w-7 h-7 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 flex items-center justify-center transition-colors">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Side Judgments List (Right 3 Cards) */}
              <div className="sm:col-span-6 space-y-3.5">
                {sideJudgments.map((jdg) => {
                  const isSC = jdg.court.includes('Supreme Court');
                  return (
                    <div
                      key={jdg.id}
                      className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl transition-all flex items-center justify-between gap-3 group"
                    >
                      <Link to={`/judgments/${jdg.id}`} className="flex items-center gap-3 min-w-0 flex-1">
                        <img 
                          src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=400" 
                          alt={jdg.court} 
                          className="w-14 h-14 rounded-xl object-cover shrink-0"
                        />
                        <div className="min-w-0">
                          <span
                            className={`px-2 py-0.5 text-white text-[9px] font-bold rounded-full uppercase tracking-wider inline-block mb-1 ${
                              isSC ? 'bg-red-600' : 'bg-blue-600'
                            }`}
                          >
                            {isSC ? 'Supreme Court' : 'High Court'}
                          </span>
                          <h4 className="font-bold text-xs text-slate-900 group-hover:text-amber-800 transition-colors leading-snug line-clamp-1">
                            {jdg.caseTitle}
                          </h4>
                          <span className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1 font-medium">
                            <Calendar className="w-3 h-3" /> {jdg.neutralCitation || jdg.decisionDate}
                          </span>
                        </div>
                      </Link>
                      {jdg.officialPdfUrl && (
                        <a
                          href={jdg.officialPdfUrl}
                          download
                          title="Download Govt PDF"
                          className="p-2 rounded-lg bg-white hover:bg-emerald-50 text-emerald-800 border border-slate-200 shrink-0"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Calendar, 
  Clock, 
  ExternalLink, 
  Search, 
  Tag, 
  ChevronRight, 
  ShieldCheck, 
  AlertCircle,
  FileText,
  Share2
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { LegalNewsItem } from '../data/legalCmsData';

export const LegalNewsPage: React.FC = () => {
  const [newsList, setNewsList] = useState<LegalNewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNews, setSelectedNews] = useState<LegalNewsItem | null>(null);

  const fetchNews = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedCategory !== 'all') params.set('category', selectedCategory);
      if (searchQuery.trim()) params.set('q', searchQuery.trim());

      const res = await fetch(`/api/legal-news?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setNewsList(data.news || []);
      }
    } catch (e) {
      console.error('Failed to load legal news', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [selectedCategory]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchNews();
  };

  return (
    <>
      <SEOHead
        title="Latest Legal News & Judicial Developments | Punia Associates"
        description="Factual, objective coverage of Supreme Court of India rulings, High Court developments, judicial appointments, Bar Council updates, and legislative amendments."
        canonicalPath="/legal-news"
      />

      <div className="bg-[#FAF9F7] min-h-screen text-[#1E293B] pb-20">
        
        {/* Editorial Header */}
        <div className="bg-[#0B1325] text-white border-b border-slate-800 py-12 lg:py-16 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-xs text-amber-400 font-medium mb-3">
              <Link to="/" className="hover:underline">Home</Link>
              <span aria-hidden="true">/</span>
              <span className="text-slate-300">Case Law Library</span>
              <span aria-hidden="true">/</span>
              <span className="text-white">Legal News & Developments</span>
            </div>

            <div className="max-w-3xl">
              <h1 className="font-cormorant text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight mb-3">
                Latest Legal News & Developments
              </h1>
              <p className="font-sans text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Objective, verified reporting on the Supreme Court, High Courts, Bar Council regulations, Ministry of Law notifications, and major constitutional developments. Clearly differentiating event dates from publication dates.
              </p>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-lg flex flex-wrap items-center justify-between gap-4">
            
            {/* Category Filter Buttons */}
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: 'all', label: 'All Legal News' },
                { id: 'Supreme Court', label: 'Supreme Court' },
                { id: 'High Courts', label: 'High Courts' },
                { id: 'Bar Council', label: 'Bar Council' },
                { id: 'Legislative & Regulatory', label: 'Statutes & Rules' },
                { id: 'Judicial Appointments', label: 'Appointments' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-[#0B1325] text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Quick Search */}
            <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search legal news..."
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-amber-500"
              />
            </form>
          </div>
        </div>

        {/* News Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {isLoading ? (
            <div className="py-20 text-center space-y-3">
              <Building2 className="w-8 h-8 text-amber-600 animate-spin mx-auto" />
              <p className="text-xs text-slate-500">Retrieving Legal News Despatch...</p>
            </div>
          ) : newsList.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-3">
              <AlertCircle className="w-8 h-8 text-amber-600 mx-auto" />
              <h3 className="font-cormorant text-xl font-bold text-slate-800">No News Items Found</h3>
              <p className="text-xs text-slate-500 font-light">No news items found under this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsList.map((item) => (
                <article
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200 hover:border-amber-400 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Meta Header */}
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2">
                      <span className="font-bold text-amber-800 uppercase tracking-wider bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {item.category}
                      </span>
                      <span className="flex items-center gap-1 text-slate-400">
                        <Clock className="w-3 h-3" />
                        <span>{item.readTimeMinutes} min read</span>
                      </span>
                    </div>

                    <h2 className="font-cormorant text-xl font-bold text-[#0B1325] leading-snug hover:text-amber-800 transition-colors mb-2">
                      <button
                        onClick={() => setSelectedNews(item)}
                        className="text-left cursor-pointer"
                      >
                        {item.headline}
                      </button>
                    </h2>

                    {/* Distinct Event Date vs Publication Date */}
                    <div className="text-[11px] text-slate-500 space-y-0.5 mb-3 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <div>
                        <strong>Event Occurred:</strong> <span className="text-slate-800 font-mono">{item.eventDate}</span>
                      </div>
                      <div>
                        <strong>Published:</strong> <span className="text-slate-800 font-mono">{item.publicationDate}</span>
                      </div>
                      <div>
                        <strong>Issuing Body:</strong> <span className="text-amber-900 font-medium">{item.issuingAuthority}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed font-light line-clamp-3 mb-4">
                      {item.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-400">By {item.author}</span>
                    <button
                      onClick={() => setSelectedNews(item)}
                      className="px-3 py-1.5 bg-[#0B1325] text-white rounded-lg text-xs font-bold hover:bg-amber-600 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>Read Story</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Modal News Reading View */}
        {selectedNews && (
          <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[88vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                  {selectedNews.category} • Official Judicial Despatch
                </span>
                <button
                  onClick={() => setSelectedNews(null)}
                  className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs font-bold cursor-pointer"
                >
                  Close
                </button>
              </div>

              <h2 className="font-cormorant text-2xl sm:text-3xl font-bold text-[#0B1325] mb-3 leading-tight">
                {selectedNews.headline}
              </h2>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pb-3 border-b border-slate-100 mb-4">
                <span><strong>Event Date:</strong> {selectedNews.eventDate}</span>
                <span>•</span>
                <span><strong>Report Published:</strong> {selectedNews.publicationDate}</span>
                <span>•</span>
                <span><strong>Authority:</strong> {selectedNews.issuingAuthority}</span>
                <span>•</span>
                <span>{selectedNews.readTimeMinutes} min read</span>
              </div>

              <div className="p-3.5 bg-amber-50/70 border-l-3 border-amber-500 rounded-r-xl text-xs sm:text-sm text-slate-800 font-medium mb-5">
                {selectedNews.summary}
              </div>

              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed font-light whitespace-pre-line space-y-3 mb-6">
                {selectedNews.body}
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="text-slate-400">Attribution: {selectedNews.author}</span>
                <a
                  href={selectedNews.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#0B1325] text-white rounded-lg font-bold flex items-center gap-1.5 hover:bg-amber-600 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                  <span>Inspect Primary Government / Court Source</span>
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
};

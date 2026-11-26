import React, { useState } from 'react';
import { 
  ArrowRight, 
  Scale, 
  Search, 
  FileText, 
  BookOpen, 
  Gavel, 
  BookMarked,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface HeroProps {
  onOpenFreeConsultation: (category?: string, state?: string) => void;
  onExploreState?: (state: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenFreeConsultation }) => {
  const [activeTab, setActiveTab] = useState<'articles' | 'judgments' | 'bare-acts' | 'materials'>('articles');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    if (activeTab === 'bare-acts') {
      navigate(`/bare-acts?q=${encodeURIComponent(searchQuery.trim())}`);
    } else if (activeTab === 'articles') {
      navigate(`/articles?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate(`/judgments?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handlePopularSearch = (term: string) => {
    setSearchQuery(term);
    navigate(`/judgments?q=${encodeURIComponent(term)}`);
  };

  return (
    <section id="hero" className="relative bg-[#0B1325] text-white overflow-hidden py-10 lg:py-16 border-b border-slate-800">
      
      {/* Background Library Glow */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Hero Column Matching Image 1 */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
              Legal Insights, Judicial Updates & Practical Guidance
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
              Case analyses, latest judgments, legal news, Bare Acts, and expert legal consultation.
            </p>

            <div>
              <button
                onClick={() => onOpenFreeConsultation()}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#C5A059] hover:bg-[#b59049] text-[#0B1325] font-bold text-xs sm:text-sm rounded-full shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Free Legal Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Lady Justice Graphic & Interactive Legal Search Card Matching Image 1 */}
          <div className="lg:col-span-5 relative">
            
            {/* Lady Justice Statuette Visual Accents */}
            <div className="hidden lg:block absolute -left-20 top-1/2 -translate-y-1/2 opacity-25 pointer-events-none text-amber-400">
              <Scale className="w-48 h-48 stroke-[1]" />
            </div>

            {/* Search Box Widget Card */}
            <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-100 relative z-10">
              
              {/* 4 Tabs Selector Pills */}
              <div className="flex items-center justify-between gap-1 p-1 bg-slate-100 rounded-2xl mb-5 text-xs font-semibold">
                <button
                  onClick={() => setActiveTab('articles')}
                  className={`flex-1 py-2 px-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeTab === 'articles'
                      ? 'bg-amber-100/90 text-amber-950 font-bold shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 text-amber-700" />
                  <span>Articles</span>
                </button>

                <button
                  onClick={() => setActiveTab('judgments')}
                  className={`flex-1 py-2 px-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeTab === 'judgments'
                      ? 'bg-amber-100/90 text-amber-950 font-bold shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Gavel className="w-3.5 h-3.5 text-amber-700" />
                  <span>Judgments</span>
                </button>

                <button
                  onClick={() => setActiveTab('bare-acts')}
                  className={`flex-1 py-2 px-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeTab === 'bare-acts'
                      ? 'bg-amber-100/90 text-amber-950 font-bold shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                  <span>Bare Acts</span>
                </button>

                <button
                  onClick={() => setActiveTab('materials')}
                  className={`flex-1 py-2 px-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeTab === 'materials'
                      ? 'bg-amber-100/90 text-amber-950 font-bold shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <BookMarked className="w-3.5 h-3.5 text-amber-700" />
                  <span>Legal Materials</span>
                </button>
              </div>

              {/* Search Form */}
              <form onSubmit={handleSearchSubmit} className="mb-5">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search articles, case laws, acts, sections, or legal topics..."
                    className="w-full pl-4 pr-14 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 bottom-1.5 w-10 bg-[#A37B31] hover:bg-[#8f6a27] text-white rounded-xl flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Submit Search"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </form>

              {/* Popular Searches Pills */}
              <div>
                <span className="text-[11px] font-bold text-slate-500 block mb-2">Popular Searches:</span>
                <div className="flex flex-wrap gap-2 text-xs">
                  {['Property Disputes', 'International Arbitration', 'Mergers & Acquisitions', 'Bail', 'Section 138 NI Act'].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handlePopularSearch(tag)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 rounded-xl transition-colors cursor-pointer text-[11px] font-medium"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Mobile 4 Quick Action Cards Grid (Screen 1 in Image 2) */}
        <div className="md:hidden grid grid-cols-2 gap-3 mt-8 pt-6 border-t border-slate-800">
          <Link to="/articles" className="bg-white/95 text-slate-900 p-4 rounded-2xl shadow-md border border-slate-100 flex flex-col items-center text-center">
            <FileText className="w-6 h-6 text-amber-600 mb-2" />
            <span className="font-bold text-xs">Articles</span>
            <span className="text-[10px] text-slate-500 mt-0.5">Legal analysis & updates</span>
          </Link>

          <Link to="/judgments" className="bg-white/95 text-slate-900 p-4 rounded-2xl shadow-md border border-slate-100 flex flex-col items-center text-center">
            <Gavel className="w-6 h-6 text-amber-600 mb-2" />
            <span className="font-bold text-xs">Judgments</span>
            <span className="text-[10px] text-slate-500 mt-0.5">Latest court decisions</span>
          </Link>

          <Link to="/bare-acts" className="bg-white/95 text-slate-900 p-4 rounded-2xl shadow-md border border-slate-100 flex flex-col items-center text-center">
            <BookOpen className="w-6 h-6 text-amber-600 mb-2" />
            <span className="font-bold text-xs">Bare Acts</span>
            <span className="text-[10px] text-slate-500 mt-0.5">Central & State Acts</span>
          </Link>

          <Link to="/legal-resources" className="bg-white/95 text-slate-900 p-4 rounded-2xl shadow-md border border-slate-100 flex flex-col items-center text-center">
            <BookMarked className="w-6 h-6 text-amber-600 mb-2" />
            <span className="font-bold text-xs">Legal Resources</span>
            <span className="text-[10px] text-slate-500 mt-0.5">Books, Rules, PDFs & more</span>
          </Link>
        </div>

      </div>
    </section>
  );
};

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Scale, 
  FileText, 
  Calendar, 
  ArrowRight, 
  BookOpen, 
  FileCheck2, 
  Newspaper, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { INITIAL_JUDGMENTS, INITIAL_COURT_ORDERS, INITIAL_LEGAL_NEWS, Judgment, CourtOrder, LegalNewsItem } from '../data/legalCmsData';

export const HomeJudgmentsShowcase: React.FC = () => {
  const [recentJudgments, setRecentJudgments] = useState<Judgment[]>(INITIAL_JUDGMENTS.slice(0, 3));
  const [recentOrders, setRecentOrders] = useState<CourtOrder[]>(INITIAL_COURT_ORDERS.slice(0, 2));
  const [recentNews, setRecentNews] = useState<LegalNewsItem[]>(INITIAL_LEGAL_NEWS.slice(0, 2));

  useEffect(() => {
    // Optionally fetch dynamic items if available
    const fetchData = async () => {
      try {
        const [jRes, oRes, nRes] = await Promise.all([
          fetch('/api/judgments?limit=3'),
          fetch('/api/court-orders'),
          fetch('/api/legal-news')
        ]);
        if (jRes.ok) {
          const data = await jRes.json();
          if (data.judgments?.length > 0) setRecentJudgments(data.judgments.slice(0, 3));
        }
        if (oRes.ok) {
          const oData = await oRes.json();
          if (Array.isArray(oData) && oData.length > 0) setRecentOrders(oData.slice(0, 2));
        }
        if (nRes.ok) {
          const nData = await nRes.json();
          if (Array.isArray(nData) && nData.length > 0) setRecentNews(nData.slice(0, 2));
        }
      } catch (e) {
        // Fallback to static initial data
      }
    };
    fetchData();
  }, []);

  return (
    <section className="py-16 bg-[#F8F9FA] border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-200 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-900 text-xs font-bold tracking-wider uppercase mb-2">
              <Scale className="w-3.5 h-3.5 text-amber-700" />
              <span>Judicial Precedents & Legal Research Library</span>
            </div>
            <h2 className="font-cormorant text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">
              Latest Judgments, Court Orders & Legal Developments
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mt-1 font-light">
              Authoritative case law research, binding holdings, and gazette notifications across Supreme Court of India and State High Courts.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/judgments"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0B1325] hover:bg-[#1E293B] text-amber-400 text-xs font-bold rounded-xl shadow transition-all cursor-pointer"
            >
              <span>Explore All Judgments</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 3-Column Layout: 1. Latest Judgments (2 cols), 2. Orders & News (1 col) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main: Latest Supreme Court & High Court Judgments */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-700" />
                <span>Featured Landmark Judgments & Ratio Decidendi</span>
              </h3>
              <Link to="/judgments" className="text-xs text-amber-700 hover:underline font-semibold">
                View Searchable Archive →
              </Link>
            </div>

            <div className="space-y-4">
              {recentJudgments.map((item) => (
                <article
                  key={item.id}
                  className="bg-white border border-slate-200 hover:border-amber-500/60 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-semibold text-slate-700 font-serif">
                      {item.court}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{item.decisionDate}</span>
                    </span>
                  </div>

                  <Link to={`/judgments/${item.id}`} className="block group">
                    <h4 className="font-cormorant text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-amber-800 transition-colors mb-2 leading-snug">
                      {item.caseTitle}
                    </h4>
                  </Link>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600 mb-3 font-mono">
                    {item.neutralCitation && (
                      <span className="text-emerald-700 font-bold">Citation: {item.neutralCitation}</span>
                    )}
                    <span>Case No: {item.caseNumber}</span>
                  </div>

                  {/* Ratio Decidendi Highlight Box */}
                  <div className="p-3.5 bg-slate-50 border-l-4 border-amber-600 rounded-r-xl mb-4 text-xs">
                    <strong className="text-amber-900 block mb-1 uppercase font-bold text-[10px] tracking-wider">
                      Binding Ratio Decidendi:
                    </strong>
                    <p className="text-slate-800 leading-relaxed font-normal line-clamp-2">
                      {item.ratioDecidendi}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-slate-500">Bench:</span>
                      <span className="text-slate-700 font-medium truncate max-w-xs">{item.coram}</span>
                    </div>

                    <Link
                      to={`/judgments/${item.id}`}
                      className="font-bold text-amber-800 hover:text-amber-900 flex items-center gap-1 transition-colors"
                    >
                      <span>Read Full Analysis</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Right Rail: Court Orders & Legal News */}
          <div className="space-y-6">
            
            {/* Judicial Court Orders */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-amber-700" />
                  <span>Court Orders & Stays</span>
                </h3>
                <Link to="/court-orders" className="text-[11px] text-amber-700 hover:underline font-semibold">
                  All Orders
                </Link>
              </div>

              <div className="space-y-4">
                {recentOrders.map(order => (
                  <div key={order.id} className="pb-3 border-b border-slate-100 last:border-b-0 last:pb-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[10px] font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {order.orderType}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {order.orderDate}
                      </span>
                    </div>
                    <h5 className="font-cormorant text-base font-bold text-slate-900 leading-snug">
                      {order.caseTitle}
                    </h5>
                    <p className="text-xs text-slate-600 line-clamp-2 mt-1">
                      {order.directions}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Latest Legal News */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                  <Newspaper className="w-4 h-4 text-amber-700" />
                  <span>Legal Developments</span>
                </h3>
                <Link to="/legal-news" className="text-[11px] text-amber-700 hover:underline font-semibold">
                  All News
                </Link>
              </div>

              <div className="space-y-3.5">
                {recentNews.map(item => (
                  <div key={item.id} className="pb-3 border-b border-slate-100 last:border-b-0 last:pb-0">
                    <span className="text-[10px] font-semibold text-slate-500 block">
                      {item.issuingAuthority} • {item.publicationDate}
                    </span>
                    <h5 className="font-cormorant text-sm font-bold text-slate-900 mt-0.5 leading-snug">
                      {item.headline}
                    </h5>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Link Card for Legislative Gazettes & FAQs */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-[#0B1325] to-[#1E293B] text-white">
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block mb-1">
                Bar Council of India Rule 36 Notice
              </span>
              <p className="text-xs text-slate-300 leading-relaxed font-light mb-3">
                All case law summaries, judicial rulings, and statutory updates are published exclusively for educational and research reference.
              </p>
              <div className="flex items-center gap-3 text-xs">
                <Link to="/legislative-updates" className="text-amber-400 hover:underline font-semibold">
                  Gazettes →
                </Link>
                <span className="text-slate-600">·</span>
                <Link to="/resources" className="text-amber-400 hover:underline font-semibold">
                  Guides →
                </Link>
                <span className="text-slate-600">·</span>
                <Link to="/faq" className="text-amber-400 hover:underline font-semibold">
                  FAQs →
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

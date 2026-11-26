import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  Star, 
  MapPin, 
  Sparkles,
  ArrowRight,
  User,
  Quote
} from 'lucide-react';
import { SEO_FAQS, STATE_ARTICLES, StateArticle } from '../data/legalData';

interface TestimonialsAndFaqProps {
  onOpenFreeConsultation: (category?: string, state?: string) => void;
}

export const TestimonialsAndFaq: React.FC<TestimonialsAndFaqProps> = ({ onOpenFreeConsultation }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [selectedArticle, setSelectedArticle] = useState<StateArticle | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const clientReviews = [
    {
      name: "Ch. Harinder Singh Dhillon",
      location: "Gurugram, Haryana",
      matter: "Anticipatory Bail & FIR Quashing (P&H High Court)",
      review: "When a false cheating FIR was registered over our family's commercial land in Gurugram, Adv. Rajeshwar S. Punia sir moved the High Court at Chandigarh on 24 hours notice. Notice of Motion with blanket protection was granted. Supreme legal acumen and genuine care.",
      rating: 5,
    },
    {
      name: "Er. Alok Srivastava",
      location: "Gautam Buddha Nagar (Noida), UP",
      matter: "UP RERA Delayed Possession & Full Refund",
      review: "We were stuck for 7 years with a stalled project in Greater Noida West. Punia Associates represented 14 flat buyers before UP RERA. We received a complete refund along with 11.2% interest. Completely transparent fee and zero fake promises.",
      rating: 5,
    },
    {
      name: "Rao Birender Singh",
      location: "Alwar & Jaipur, Rajasthan",
      matter: "Rajasthan Tenancy Act Khatedari Land Partition",
      review: "Our ancestral 30 bighas agricultural land was fraudulently mutated. Adv. Mahaveer Punia handled our appeal in the Revenue Board and Rajasthan High Court Jaipur. The illegal mutation was set aside and our names restored in the Jamabandi.",
      rating: 5,
    },
  ];

  return (
    <section id="faq-and-articles" className="py-20 bg-[#FAF9F7] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* PART 1: SEO State Legal Knowledge Hub Articles (CEO-Level Points for High Ranking) */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2 border border-amber-300">
              <BookOpen className="w-3.5 h-3.5 text-amber-800" />
              <span>State Legal Insights & High Court Guides</span>
            </div>
            <h2 className="font-cormorant text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1325]">
              Authoritative Legal Articles by State
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Procedural guides authored by our senior advocates in Haryana, Uttar Pradesh, and Rajasthan to help citizens understand their constitutional rights and court timelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STATE_ARTICLES.map((art) => (
              <div
                key={art.id}
                className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:border-amber-400 hover:shadow-lg transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                      {art.state} Law
                    </span>
                    <span className="text-slate-400">{art.readTime}</span>
                  </div>

                  <h3 className="font-cormorant text-xl font-bold text-[#0B1325] mb-2 leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {art.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {art.keywords.map((kw, i) => (
                      <span key={i} className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-medium">By {art.author}</span>
                  <button
                    onClick={() => setSelectedArticle(art)}
                    className="text-xs font-bold text-amber-900 hover:text-amber-700 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PART 2: Client Reviews & Social Proof */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="font-cormorant text-3xl font-bold text-[#0B1325]">
              Client Testimonials Across Haryana, UP & Rajasthan
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Read how our 20+ years of courtroom advocacy brought justice and peace of mind to our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {clientReviews.map((rev, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col justify-between shadow-sm">
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-3">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-300 mb-2" />
                  <p className="text-xs text-slate-700 leading-relaxed italic mb-4">
                    "{rev.review}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <strong className="text-xs text-slate-900 block font-semibold">{rev.name}</strong>
                  <span className="text-[11px] text-amber-800 font-medium flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{rev.location}</span>
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5 font-mono">{rev.matter}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PART 3: High-SEO Frequently Asked Questions */}
        <div id="faq" className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="font-cormorant text-3xl sm:text-4xl font-bold text-[#0B1325]">
              Frequently Asked Legal Questions
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Clear answers regarding bail procedure, advocate fees, land dispute resolution, and free consultations.
            </p>
          </div>

          <div className="space-y-3">
            {SEO_FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg border border-slate-200 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-[#0B1325] hover:text-amber-900 cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-amber-700 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Article Full Modal */}
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 border border-slate-200">
              <div className="pb-4 border-b border-slate-200 flex items-start justify-between">
                <div>
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-widest block mb-1">
                    {selectedArticle.state} High Court Guide
                  </span>
                  <h3 className="font-cormorant text-2xl font-bold text-[#0B1325]">
                    {selectedArticle.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">By {selectedArticle.author} • Punia Associates</p>
                </div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="p-1 rounded bg-slate-100 text-slate-600 hover:text-black"
                >
                  ✕
                </button>
              </div>

              <div className="py-5 space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                {selectedArticle.content.map((para, i) => (
                  <p key={i} className="p-3 bg-slate-50 rounded border border-slate-200">
                    {para}
                  </p>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs text-slate-500">Need specific legal advice for this matter?</span>
                <button
                  onClick={() => {
                    const st = selectedArticle.state;
                    setSelectedArticle(null);
                    onOpenFreeConsultation(undefined, st);
                  }}
                  className="px-4 py-2 bg-[#0B1325] text-white text-xs font-bold rounded shadow flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Free Consultation</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

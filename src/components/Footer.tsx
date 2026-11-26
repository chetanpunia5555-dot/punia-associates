import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Scale, 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  ArrowUp,
  Award,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { FIRM_INFO } from '../data/legalData';

interface FooterProps {
  onOpenFreeConsultation: (category?: string, state?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenFreeConsultation }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent("Namaste Punia Associates (puniaassociates.site), I need legal consultation.");
    window.open(`https://wa.me/${FIRM_INFO.whatsappNumber.replace('+', '')}?text=${text}`, '_blank');
  };

  return (
    <footer className="bg-[#022C22] text-emerald-100 pt-16 pb-24 md:pb-12 border-t border-emerald-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-emerald-900">
          
          {/* Brand Col (4 cols) */}
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-3 mb-4 inline-flex">
              <div className="w-10 h-10 rounded-lg bg-emerald-950 border border-amber-400/40 text-amber-400 font-serif font-bold text-lg flex items-center justify-center">
                PA
              </div>
              <div>
                <span className="font-serif text-xl font-bold text-white tracking-wide block">
                  PUNIA ASSOCIATES
                </span>
                <span className="text-[11px] tracking-wider text-amber-300 font-semibold font-mono">
                  puniaassociates.site
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-300 leading-relaxed mb-6 font-normal">
              Punia Associates — Legal Knowledge, Case Analysis & Advisory. Representation before the Supreme Court of India, State High Courts, and District Courts across India.
            </p>

            <div className="space-y-2 text-xs text-slate-200">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Helplines: <a href={`tel:${FIRM_INFO.helplinePhone}`} className="text-white hover:underline font-bold">{FIRM_INFO.helplinePhone}</a> / <a href={`tel:${FIRM_INFO.secondaryPhone}`} className="text-white hover:underline font-bold">{FIRM_INFO.secondaryPhone}</a></span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Chambers Email: <strong className="text-white">{FIRM_INFO.email}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Chambers in Chandigarh · Prayagraj · Jaipur · New Delhi · Gurugram · Greater Noida</span>
              </div>
            </div>
          </div>

          {/* Practice Specializations (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-4 border-b border-emerald-900 pb-2">
              Practice Specializations
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link to="/criminal-law" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-emerald-500" />
                  <span>Criminal Law & Defence</span>
                </Link>
              </li>
              <li>
                <Link to="/civil-law" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-emerald-500" />
                  <span>Civil Law & Litigation</span>
                </Link>
              </li>
              <li>
                <Link to="/family-law" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-emerald-500" />
                  <span>Family & Matrimonial Matters</span>
                </Link>
              </li>
              <li>
                <Link to="/property-law" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-emerald-500" />
                  <span>Property Law & Land Disputes</span>
                </Link>
              </li>
              <li>
                <Link to="/corporate-law" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-emerald-500" />
                  <span>Corporate & Commercial Law</span>
                </Link>
              </li>
              <li>
                <Link to="/international-arbitration" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-amber-400" />
                  <span>International Arbitration</span>
                </Link>
              </li>
              <li>
                <Link to="/mergers-acquisitions" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-amber-400" />
                  <span>Mergers & Acquisitions (M&A)</span>
                </Link>
              </li>
              <li>
                <Link to="/constitutional-law" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-emerald-500" />
                  <span>Constitutional & Writs</span>
                </Link>
              </li>
              <li>
                <Link to="/consumer-law" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-emerald-500" />
                  <span>Consumer Law & Disputes</span>
                </Link>
              </li>
              <li className="pt-1">
                <Link to="/practice-areas" className="text-amber-300 hover:underline font-semibold block text-[11px]">
                  → View All Practice Areas
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Research & Resources (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-4 border-b border-emerald-900 pb-2">
              Research & Resources
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li>
                <Link to="/articles" className="hover:text-amber-300 transition-colors">
                  Latest Articles
                </Link>
              </li>
              <li>
                <Link to="/judgments" className="hover:text-amber-300 transition-colors">
                  Judgments Library
                </Link>
              </li>
              <li>
                <Link to="/judgments/supreme-court" className="hover:text-amber-300 transition-colors">
                  Supreme Court Rulings
                </Link>
              </li>
              <li>
                <Link to="/judgments/high-courts" className="hover:text-amber-300 transition-colors">
                  High Court Orders
                </Link>
              </li>
              <li>
                <Link to="/legal-resources" className="hover:text-amber-300 transition-colors">
                  Legal Resources
                </Link>
              </li>
              <li>
                <Link to="/bare-acts" className="hover:text-amber-300 transition-colors">
                  India Bare Acts
                </Link>
              </li>
              <li>
                <Link to="/lawyers" className="hover:text-amber-300 transition-colors font-semibold text-amber-200">
                  Our Lawyers
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-amber-300 transition-colors">
                  About Us
                </Link>
              </li>
              <li className="pt-1">
                <Link to="/admin" className="text-amber-300 font-bold hover:text-white transition-colors flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Admin Portal</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Action & Helplines (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-4 border-b border-emerald-900 pb-2">
              Free Consultation & Desk
            </h4>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              Have a pending court notice, summon, bail application, or property dispute? Submit a preliminary inquiry for advocate evaluation.
            </p>

            <button
              onClick={() => onOpenFreeConsultation()}
              className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold rounded-lg transition-colors shadow mb-2 flex items-center justify-center gap-1.5 cursor-pointer border border-emerald-600"
            >
              <Scale className="w-3.5 h-3.5 text-amber-400" />
              <span>Request Free Consultation</span>
            </button>

            <button
              onClick={handleWhatsApp}
              className="w-full py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-emerald-700"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-300" />
              <span>WhatsApp Direct Line</span>
            </button>
          </div>
        </div>

        {/* Bar Council of India Statutory Compliance Notice */}
        <div className="pt-8 pb-6 border-b border-emerald-900 text-[11px] text-slate-400 leading-relaxed space-y-2">
          <div className="flex items-center gap-2 text-amber-300 font-semibold uppercase tracking-wider text-[10px]">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>BAR COUNCIL OF INDIA RULE 36 STATUTORY COMPLIANCE NOTICE</span>
          </div>
          <p>
            The rules of the Bar Council of India prohibit law firms and advocates from soliciting work or advertising in any manner. By accessing this website (<strong>https://puniaassociates.site/</strong>), the user acknowledges that the information provided is solely for legal knowledge, educational research, and civic information purposes at the user's voluntary request.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} Punia Associates (puniaassociates.site). All rights reserved.
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <Link to="/privacy-policy" className="hover:text-amber-300 transition-colors">Privacy Policy</Link>
            <span>·</span>
            <Link to="/terms" className="hover:text-amber-300 transition-colors">Terms of Disclaimer</Link>
            <span>·</span>
            <button 
              onClick={scrollToTop} 
              className="hover:text-white transition-colors flex items-center gap-1 text-slate-300 cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3 text-amber-400" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

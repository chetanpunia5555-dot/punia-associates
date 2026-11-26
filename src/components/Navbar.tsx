import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Phone, 
  MapPin, 
  MessageCircle, 
  Scale, 
  ChevronDown, 
  ChevronRight,
  Menu, 
  X, 
  Search,
  BookOpen, 
  FileText, 
  ShieldCheck, 
  Globe2, 
  Users, 
  Sparkles,
  Home,
  HelpCircle,
  FolderArchive,
  Award,
  Layers,
  Building2,
  Landmark,
  FileCode,
  FileSpreadsheet,
  Gavel,
  BookMarked
} from 'lucide-react';
import { FIRM_INFO } from '../data/legalData';

interface NavbarProps {
  onOpenFreeConsultation: (category?: string, state?: string) => void;
  onExploreState: (state: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenFreeConsultation,
  onExploreState
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [headerSearchOpen, setHeaderSearchOpen] = useState(false);
  const [headerSearchQuery, setHeaderSearchQuery] = useState('');
  
  // Slide-out drawer expanded accordion state
  const [expandedSubmenu, setExpandedSubmenu] = useState<string | null>('resources');

  const location = useLocation();
  const navigate = useNavigate();

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
    setHeaderSearchOpen(false);
  }, [location.pathname]);

  const handleGlobalSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!headerSearchQuery.trim()) return;
    navigate(`/judgments?q=${encodeURIComponent(headerSearchQuery.trim())}`);
    setHeaderSearchOpen(false);
    setHeaderSearchQuery('');
  };

  const toggleSubmenu = (menuKey: string) => {
    setExpandedSubmenu(prev => prev === menuKey ? null : menuKey);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="w-full relative z-50 font-sans">
      
      {/* Main Dark Header Matching Mockup (Image 1) */}
      <nav 
        id="main-navbar"
        aria-label="Main Navigation"
        className="bg-[#0B1325] text-white border-b border-slate-800 shadow-xl"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            
            {/* Brand Logo with Scales Icon */}
            <Link 
              to="/" 
              className="flex items-center gap-3 shrink-0 group"
            >
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/40 text-amber-400 flex items-center justify-center shadow-inner group-hover:bg-amber-500/20 transition-all">
                <Scale className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white leading-none">
                  Punia Associates
                </span>
                <span className="text-[11px] font-medium text-amber-400/90 tracking-wide mt-1">
                  Law Firm & Advocates
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links Matching Image 1 */}
            <div className="hidden lg:flex items-center space-x-7 text-xs font-semibold text-slate-200">
              <Link 
                to="/"
                className={`py-1 transition-all hover:text-amber-400 ${isActive('/') ? 'text-amber-400 font-bold border-b-2 border-amber-400' : ''}`}
              >
                Home
              </Link>

              <Link 
                to="/articles"
                className={`py-1 transition-all hover:text-amber-400 ${isActive('/articles') ? 'text-amber-400 font-bold border-b-2 border-amber-400' : ''}`}
              >
                Articles
              </Link>

              <Link 
                to="/judgments"
                className={`py-1 transition-all hover:text-amber-400 ${isActive('/judgments') ? 'text-amber-400 font-bold border-b-2 border-amber-400' : ''}`}
              >
                Judgments
              </Link>

              <Link 
                to="/magazine"
                className={`py-1 transition-all hover:text-amber-400 ${isActive('/magazine') ? 'text-amber-400 font-bold border-b-2 border-amber-400' : ''}`}
              >
                Law Reporter
              </Link>

              <div className="relative group">
                <Link 
                  to="/legal-library"
                  className={`py-1 inline-flex items-center gap-1 transition-all hover:text-amber-400 ${isActive('/legal-library') || isActive('/legal-resources') || isActive('/bare-acts') ? 'text-amber-400 font-bold border-b-2 border-amber-400' : ''}`}
                >
                  <span>Legal Library</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-400" />
                </Link>
                {/* Hover Submenu */}
                <div className="absolute left-0 top-full hidden group-hover:block w-56 bg-slate-900 border border-slate-700 rounded-xl p-2 shadow-2xl space-y-1 text-xs z-50">
                  <Link to="/legal-library" className="block px-3 py-2 text-amber-400 font-bold hover:bg-slate-800 rounded-lg">Legal Library Home</Link>
                  <Link to="/magazine" className="block px-3 py-2 text-amber-300 font-semibold hover:bg-slate-800 rounded-lg">SC & HC Law Reporter</Link>
                  <Link to="/bare-acts" className="block px-3 py-2 text-slate-300 hover:text-amber-300 hover:bg-slate-800 rounded-lg">Global & Indian Bare Acts</Link>
                  <Link to="/legal-drafts" className="block px-3 py-2 text-amber-400 font-bold hover:bg-slate-800 rounded-lg">Legal Drafting Hub & Templates</Link>
                  <Link to="/central-acts" className="block px-3 py-2 text-slate-300 hover:text-amber-300 hover:bg-slate-800 rounded-lg">Central Laws</Link>
                  <Link to="/state-acts" className="block px-3 py-2 text-slate-300 hover:text-amber-300 hover:bg-slate-800 rounded-lg">State Laws</Link>
                  <Link to="/rules-regulations" className="block px-3 py-2 text-slate-300 hover:text-amber-300 hover:bg-slate-800 rounded-lg">Rules & Regulations</Link>
                  <Link to="/notifications-circulars" className="block px-3 py-2 text-slate-300 hover:text-amber-300 hover:bg-slate-800 rounded-lg">Notifications</Link>
                  <Link to="/judgments" className="block px-3 py-2 text-slate-300 hover:text-amber-300 hover:bg-slate-800 rounded-lg">Court Judgments</Link>
                  <Link to="/legal-forms" className="block px-3 py-2 text-slate-300 hover:text-amber-300 hover:bg-slate-800 rounded-lg">Legal Forms & Formats</Link>
                  <Link to="/admin" className="block px-3 py-2 text-amber-300 font-semibold hover:bg-slate-800 rounded-lg border-t border-slate-800 mt-1">Admin Document Manager</Link>
                </div>
              </div>

              <div className="relative group">
                <Link 
                  to="/practice-areas"
                  className={`py-1 inline-flex items-center gap-1 transition-all hover:text-amber-400 ${isActive('/practice-areas') ? 'text-amber-400 font-bold border-b-2 border-amber-400' : ''}`}
                >
                  <span>Practice Areas</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-400" />
                </Link>
                <div className="absolute left-0 top-full hidden group-hover:block w-64 bg-slate-900 border border-slate-700 rounded-xl p-2 shadow-2xl space-y-1 text-xs z-50">
                  <Link to="/civil-law" className="block px-3 py-2 text-slate-300 hover:text-amber-300 hover:bg-slate-800 rounded-lg">Civil Law</Link>
                  <Link to="/criminal-law" className="block px-3 py-2 text-slate-300 hover:text-amber-300 hover:bg-slate-800 rounded-lg">Criminal Law</Link>
                  <Link to="/corporate-law" className="block px-3 py-2 text-slate-300 hover:text-amber-300 hover:bg-slate-800 rounded-lg">Corporate Law</Link>
                  <Link to="/international-arbitration" className="block px-3 py-2 text-amber-300 hover:text-amber-200 hover:bg-slate-800 rounded-lg font-semibold">International Arbitration</Link>
                  <Link to="/mergers-acquisitions" className="block px-3 py-2 text-amber-300 hover:text-amber-200 hover:bg-slate-800 rounded-lg font-semibold">Mergers & Acquisitions (M&A)</Link>
                  <Link to="/property-law" className="block px-3 py-2 text-slate-300 hover:text-amber-300 hover:bg-slate-800 rounded-lg">Property Law</Link>
                  <Link to="/family-law" className="block px-3 py-2 text-slate-300 hover:text-amber-300 hover:bg-slate-800 rounded-lg">Family Law</Link>
                  <Link to="/consumer-law" className="block px-3 py-2 text-slate-300 hover:text-amber-300 hover:bg-slate-800 rounded-lg">Consumer Law</Link>
                </div>
              </div>

              <button
                onClick={() => onOpenFreeConsultation()}
                className="py-1 transition-all hover:text-amber-400 text-slate-200 cursor-pointer"
              >
                Free Consultation
              </button>
            </div>

            {/* Right Header Controls (Search Icon Button + 3-Line Hamburger Button) */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setHeaderSearchOpen(true)}
                className="p-2.5 bg-slate-800/80 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 transition-colors cursor-pointer"
                title="Search Site"
                aria-label="Search"
              >
                <Search className="w-5 h-5 text-slate-300" />
              </button>

              <button
                onClick={() => setDrawerOpen(true)}
                className="p-2.5 bg-slate-800/80 hover:bg-slate-700 text-amber-400 rounded-xl border border-amber-500/30 transition-colors flex items-center justify-center cursor-pointer"
                aria-label="Open Navigation Menu"
                title="Open Menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Slide-Out Navigation Drawer Matching Image 1 & Image 2 Screen 5 */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div 
            onClick={() => setDrawerOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          />

          {/* Drawer Content Panel */}
          <aside className="relative w-full max-w-sm bg-white text-slate-900 h-full shadow-2xl z-50 flex flex-col justify-between overflow-y-auto border-l border-slate-200">
            <div>
              {/* Drawer Header */}
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#0B1325] text-amber-400 flex items-center justify-center font-serif font-bold">
                    <Scale className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-serif font-bold text-lg text-[#0B1325] leading-tight">
                      Punia Associates
                    </h2>
                    <p className="text-[11px] text-amber-700 font-medium">Law Firm & Advocates</p>
                  </div>
                </div>

                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 rounded-lg bg-slate-200/80 hover:bg-slate-300 text-slate-700 transition-colors cursor-pointer"
                  aria-label="Close Menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Navigation Submenu Items */}
              <div className="p-4 space-y-1 text-xs font-medium">
                
                {/* Home */}
                <Link
                  to="/"
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors ${
                    isActive('/') ? 'bg-amber-50 text-amber-900 font-bold' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Home className="w-4 h-4 text-amber-600" />
                  <span>Home</span>
                </Link>

                {/* Articles */}
                <div className="rounded-xl overflow-hidden">
                  <div 
                    onClick={() => toggleSubmenu('articles')}
                    className="flex items-center justify-between px-3.5 py-2.5 text-slate-700 hover:bg-slate-100 rounded-xl cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-amber-600" />
                      <span className="font-semibold text-slate-900">Articles</span>
                      <span className="px-2 py-0.5 bg-blue-600 text-white rounded-full text-[10px] font-bold uppercase tracking-wider">New</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${expandedSubmenu === 'articles' ? 'rotate-90' : ''}`} />
                  </div>
                  {expandedSubmenu === 'articles' && (
                    <div className="pl-9 pr-3 py-2 space-y-2 text-xs text-slate-600 bg-slate-50 rounded-xl my-1">
                      <Link to="/articles" className="block hover:text-amber-800">• All Articles & Commentaries</Link>
                      <Link to="/articles?format=Case+Analysis" className="block hover:text-amber-800">• Case Analysis</Link>
                      <Link to="/legal-news" className="block hover:text-amber-800">• Legal Updates</Link>
                    </div>
                  )}
                </div>

                {/* Judgments */}
                <div className="rounded-xl overflow-hidden">
                  <div 
                    onClick={() => toggleSubmenu('judgments')}
                    className="flex items-center justify-between px-3.5 py-2.5 text-slate-700 hover:bg-slate-100 rounded-xl cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Scale className="w-4 h-4 text-amber-600" />
                      <span className="font-semibold text-slate-900">Judgments</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${expandedSubmenu === 'judgments' ? 'rotate-90' : ''}`} />
                  </div>
                  {expandedSubmenu === 'judgments' && (
                    <div className="pl-9 pr-3 py-2 space-y-2 text-xs text-slate-600 bg-slate-50 rounded-xl my-1">
                      <Link to="/judgments/supreme-court" className="block hover:text-amber-800">• Supreme Court Judgments</Link>
                      <Link to="/judgments/high-courts" className="block hover:text-amber-800">• High Court Judgments</Link>
                      <Link to="/court-orders" className="block hover:text-amber-800">• Court Orders</Link>
                    </div>
                  )}
                </div>

                {/* Legal Resources Accordion */}
                <div className="rounded-xl overflow-hidden">
                  <div 
                    onClick={() => toggleSubmenu('resources')}
                    className="flex items-center justify-between px-3.5 py-2.5 text-slate-700 hover:bg-slate-100 rounded-xl cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-4 h-4 text-amber-600" />
                      <span className="font-semibold text-slate-900">Legal Resources</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${expandedSubmenu === 'resources' ? 'rotate-180' : ''}`} />
                  </div>
                  {expandedSubmenu === 'resources' && (
                    <div className="pl-9 pr-3 py-2.5 space-y-2.5 text-xs text-slate-700 bg-slate-50 rounded-xl my-1">
                      <Link to="/bare-acts" className="flex items-center gap-2 hover:text-amber-800">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                        <span>Global & Indian Bare Acts</span>
                      </Link>
                      <Link to="/legal-drafts" className="flex items-center gap-2 hover:text-amber-800 font-bold text-amber-900">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0" />
                        <span>Legal Drafting Hub & Templates</span>
                      </Link>
                      <Link to="/rules-regulations" className="flex items-center gap-2 hover:text-amber-800">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                        <span>Rules & Regulations</span>
                      </Link>
                      <Link to="/codes" className="flex items-center gap-2 hover:text-amber-800">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                        <span>Codes</span>
                      </Link>
                      <Link to="/notifications-circulars" className="flex items-center gap-2 hover:text-amber-800">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                        <span>Notifications & Circulars</span>
                      </Link>
                      <Link to="/legal-books" className="flex items-center justify-between hover:text-amber-800">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                          <span>Legal Books & PDFs</span>
                        </div>
                        <span className="px-1.5 py-0.5 bg-red-600 text-white rounded text-[9px] font-bold">PDF</span>
                      </Link>
                      <Link to="/legal-forms" className="flex items-center gap-2 hover:text-amber-800">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                        <span>Forms & Formats</span>
                      </Link>
                    </div>
                  )}
                </div>

                {/* Practice Areas Accordion */}
                <div className="rounded-xl overflow-hidden">
                  <div 
                    onClick={() => toggleSubmenu('practice')}
                    className="flex items-center justify-between px-3.5 py-2.5 text-slate-700 hover:bg-slate-100 rounded-xl cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <FolderArchive className="w-4 h-4 text-amber-600" />
                      <span className="font-semibold text-slate-900">Practice Areas</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${expandedSubmenu === 'practice' ? 'rotate-180' : ''}`} />
                  </div>
                  {expandedSubmenu === 'practice' && (
                    <div className="pl-9 pr-3 py-2.5 space-y-2 text-xs text-slate-700 bg-slate-50 rounded-xl my-1">
                      <Link to="/civil-law" className="block hover:text-amber-800">• Civil Law</Link>
                      <Link to="/criminal-law" className="block hover:text-amber-800">• Criminal Law</Link>
                      <Link to="/corporate-law" className="block hover:text-amber-800">• Corporate Law</Link>
                      <Link to="/international-arbitration" className="block font-semibold text-amber-800 hover:text-amber-900">• International Arbitration</Link>
                      <Link to="/mergers-acquisitions" className="block font-semibold text-amber-800 hover:text-amber-900">• Mergers & Acquisitions (M&A)</Link>
                      <Link to="/property-law" className="block hover:text-amber-800">• Property Law</Link>
                      <Link to="/family-law" className="block hover:text-amber-800">• Family Law</Link>
                      <Link to="/consumer-law" className="block hover:text-amber-800">• Consumer Law</Link>
                    </div>
                  )}
                </div>

                {/* Our Lawyers (Only accessible via hamburger drawer menu) */}
                <Link
                  to="/lawyers"
                  className="flex items-center gap-3 px-3.5 py-2.5 text-slate-700 hover:bg-slate-100 rounded-xl font-semibold transition-colors"
                >
                  <Users className="w-4 h-4 text-amber-600" />
                  <span>Our Lawyers</span>
                </Link>

                {/* Free Consultation */}
                <button
                  onClick={() => {
                    setDrawerOpen(false);
                    onOpenFreeConsultation();
                  }}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 text-amber-800 hover:bg-amber-50 rounded-xl font-bold cursor-pointer transition-colors text-left"
                >
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Free Consultation</span>
                </button>

                {/* About Us */}
                <Link
                  to="/about"
                  className="flex items-center gap-3 px-3.5 py-2.5 text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <Globe2 className="w-4 h-4 text-slate-500" />
                  <span>About Us</span>
                </Link>

                {/* Contact Us */}
                <Link
                  to="/contact"
                  className="flex items-center gap-3 px-3.5 py-2.5 text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <Phone className="w-4 h-4 text-slate-500" />
                  <span>Contact Us</span>
                </Link>

                {/* FAQ */}
                <Link
                  to="/faq"
                  className="flex items-center gap-3 px-3.5 py-2.5 text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <HelpCircle className="w-4 h-4 text-slate-500" />
                  <span>FAQ</span>
                </Link>

                {/* Sitemap */}
                <Link
                  to="/sitemap"
                  className="flex items-center gap-3 px-3.5 py-2.5 text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <Layers className="w-4 h-4 text-slate-500" />
                  <span>Sitemap</span>
                </Link>

                {/* Admin & AI Legal Research Desk */}
                <div className="pt-2 mt-2 border-t border-slate-200 space-y-1">
                  <Link
                    to="/admin"
                    onClick={() => setDrawerOpen(false)}
                    className="flex items-center gap-3 px-3.5 py-2.5 text-slate-800 hover:bg-slate-100 rounded-xl font-semibold transition-colors"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>Admin CMS & Resource Uploader</span>
                  </Link>
                  <Link
                    to="/admin/ai-legal-research"
                    onClick={() => setDrawerOpen(false)}
                    className="flex items-center gap-3 px-3.5 py-2.5 bg-[#022C22] text-[#E5C158] hover:bg-[#043927] rounded-xl font-bold transition-colors"
                  >
                    <Sparkles className="w-4 h-4 text-[#E5C158]" />
                    <span>AI Legal Research Desk</span>
                  </Link>
                </div>
              </div>

            </div>

            {/* Drawer Footer CTA */}
            <div className="p-5 border-t border-slate-100 bg-slate-50 space-y-2">
              <button
                onClick={() => {
                  setDrawerOpen(false);
                  onOpenFreeConsultation();
                }}
                className="w-full py-3 bg-[#0B1325] hover:bg-slate-800 text-amber-400 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow"
              >
                <Scale className="w-4 h-4 text-amber-400" />
                <span>Request Case Evaluation</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Global Search Modal */}
      {headerSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          <div 
            onClick={() => setHeaderSearchOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl z-50 overflow-hidden">
            <form onSubmit={handleGlobalSearchSubmit} className="p-4 border-b border-slate-100 flex items-center gap-3">
              <Search className="w-5 h-5 text-amber-600 shrink-0" />
              <input
                type="text"
                value={headerSearchQuery}
                onChange={(e) => setHeaderSearchQuery(e.target.value)}
                placeholder="Search articles, case laws, acts, sections..."
                className="w-full text-sm focus:outline-none text-slate-900 placeholder-slate-400"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setHeaderSearchOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Sticky Bottom Nav Bar Matching Image 2 */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0B1325] text-slate-300 flex items-center justify-around h-16 px-2 shadow-2xl border-t border-slate-800">
        <Link
          to="/"
          className={`flex flex-col items-center justify-center w-full h-full py-1 text-[11px] font-medium transition-colors ${
            isActive('/') ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span>Home</span>
        </Link>

        <Link
          to="/articles"
          className={`flex flex-col items-center justify-center w-full h-full py-1 text-[11px] font-medium transition-colors ${
            isActive('/articles') ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <FileText className="w-5 h-5 mb-0.5" />
          <span>Articles</span>
        </Link>

        <Link
          to="/judgments"
          className={`flex flex-col items-center justify-center w-full h-full py-1 text-[11px] font-medium transition-colors ${
            isActive('/judgments') ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Scale className="w-5 h-5 mb-0.5 text-amber-400" />
          <span>Judgments</span>
        </Link>

        <Link
          to="/legal-resources"
          className={`flex flex-col items-center justify-center w-full h-full py-1 text-[11px] font-medium transition-colors ${
            isActive('/legal-resources') || isActive('/resources') ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <BookOpen className="w-5 h-5 mb-0.5" />
          <span>Resources</span>
        </Link>

        <button
          onClick={() => onOpenFreeConsultation()}
          className="flex flex-col items-center justify-center w-full h-full py-1 text-[11px] font-medium text-slate-400 hover:text-white cursor-pointer"
        >
          <Sparkles className="w-5 h-5 mb-0.5 text-amber-400" />
          <span>Consult</span>
        </button>
      </div>

    </header>
  );
};

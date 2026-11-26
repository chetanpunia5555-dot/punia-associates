import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Search, 
  Copy, 
  Check, 
  Download, 
  Share2, 
  Sparkles, 
  ShieldCheck, 
  Sliders, 
  ChevronRight, 
  Scale, 
  Printer, 
  BookOpen,
  ArrowRight,
  Info
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { LEGAL_DRAFTS_COLLECTION, LegalDraftTemplate } from '../data/legalDraftsData';

export const LegalDraftingHubPage: React.FC = () => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(LEGAL_DRAFTS_COLLECTION[0].id);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  // Active template
  const currentTemplate = useMemo(() => {
    return LEGAL_DRAFTS_COLLECTION.find(t => t.id === selectedTemplateId) || LEGAL_DRAFTS_COLLECTION[0];
  }, [selectedTemplateId]);

  // Form field state for the active template
  const [fieldValues, setFieldValues] = useState<Record<string, Record<string, string>>>(() => {
    const initial: Record<string, Record<string, string>> = {};
    LEGAL_DRAFTS_COLLECTION.forEach(t => {
      initial[t.id] = {};
      t.fields.forEach(f => {
        initial[t.id][f.id] = f.defaultValue;
      });
    });
    return initial;
  });

  const handleFieldChange = (fieldId: string, val: string) => {
    setFieldValues(prev => ({
      ...prev,
      [currentTemplate.id]: {
        ...prev[currentTemplate.id],
        [fieldId]: val
      }
    }));
  };

  const categories = ['All', 'Litigation Notices', 'Commercial & Corporate', 'Property & Real Estate', 'Personal & Family', 'Statutory & Regulatory'];

  const filteredTemplates = useMemo(() => {
    return LEGAL_DRAFTS_COLLECTION.filter(t => {
      const matchCat = selectedCategory === 'All' || t.category === selectedCategory;
      const matchSearch = !searchQuery.trim() || 
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const activeValues = fieldValues[currentTemplate.id] || {};
  const renderedText = useMemo(() => {
    return currentTemplate.generateText(activeValues);
  }, [currentTemplate, activeValues]);

  const handleCopy = () => {
    navigator.clipboard.writeText(renderedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([renderedText], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `${currentTemplate.id}_punia_associates_draft.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${currentTemplate.title} - Punia Associates</title>
            <style>
              body { font-family: 'Times New Roman', Times, serif; font-size: 13pt; line-height: 1.6; margin: 40px; }
              h1 { font-size: 16pt; text-align: center; text-transform: uppercase; margin-bottom: 20px; }
              pre { white-space: pre-wrap; font-family: inherit; }
              .footer { margin-top: 50px; text-align: center; font-size: 10pt; color: #555; border-top: 1px solid #ccc; padding-top: 10px; }
            </style>
          </head>
          <body>
            <pre>${renderedText}</pre>
            <div class="footer">PUNIA ASSOCIATES — Advocates & Legal Consultants</div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
  };

  return (
    <>
      <SEOHead
        title="Interactive Legal Drafting Hub & Standard Contract Templates | Punia Associates"
        description="Access and customize standardized Indian and International legal drafts: Section 138 NI Act Cheque Bounce Notice, Money Recovery, NDAs, GPA, Residential Leases, Wills, and Arbitration Clauses."
        canonicalPath="/legal-drafts"
      />

      <Breadcrumbs items={[
        { name: 'Legal Resources', url: '/legal-resources' },
        { name: 'Legal Drafting & Document Templates Hub', url: '/legal-drafts' }
      ]} />

      <main className="bg-[#F8F9FA] min-h-screen text-[#1E293B]">
        {/* Header Hero */}
        <div className="bg-[#0B1325] text-white py-12 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30 mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Punia Associates Interactive Legal Engineering</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-white">
                  Legal Drafting & Contract Templates Hub
                </h1>
                <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
                  Authentic, court-tested Indian statutory notices, commercial contracts, conveyance deeds, and international arbitration covenants. Customize live, copy clean formatted text, or download ready for execution.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg flex items-center gap-2 transition"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-950" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy Active Draft'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>Download (.txt)</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          
          {/* Filter Bar & Search */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#0B1325] text-amber-400 shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search legal draft templates..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              />
            </div>
          </div>

          {/* Split Pane: Left (Templates & Form Inputs), Right (Live Document Preview) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Templates Selector Carousel/List */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
                <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center justify-between">
                  <span>Available Drafts ({filteredTemplates.length})</span>
                  <span className="text-[10px] text-amber-600 font-mono">Select Template</span>
                </h2>

                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {filteredTemplates.map(tmpl => {
                    const isSelected = tmpl.id === currentTemplate.id;
                    return (
                      <button
                        key={tmpl.id}
                        type="button"
                        onClick={() => setSelectedTemplateId(tmpl.id)}
                        className={`w-full text-left p-3 rounded-xl border transition flex items-start justify-between gap-3 cursor-pointer ${
                          isSelected 
                            ? 'bg-amber-50/70 border-amber-400/80 shadow-sm ring-1 ring-amber-400/30' 
                            : 'bg-slate-50 hover:bg-slate-100/80 border-slate-200'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-700">
                              {tmpl.category}
                            </span>
                            <span className="text-[10px] font-medium text-slate-500">
                              {tmpl.statutoryBasis.split(' ')[0]} {tmpl.statutoryBasis.split(' ')[1] || ''}
                            </span>
                          </div>
                          <h3 className={`text-xs font-bold mt-1 ${isSelected ? 'text-[#0B1325]' : 'text-slate-800'}`}>
                            {tmpl.title}
                          </h3>
                        </div>
                        <ChevronRight className={`w-4 h-4 shrink-0 mt-2 transition ${isSelected ? 'text-amber-600 translate-x-0.5' : 'text-slate-400'}`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Field Customizer Form */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-amber-600" />
                    <h2 className="text-sm font-bold text-slate-900">
                      Customize Variables
                    </h2>
                  </div>
                  <span className="text-[10px] text-slate-500">Updates Preview Live</span>
                </div>

                <div className="space-y-3.5 max-h-[480px] overflow-y-auto pr-2">
                  {currentTemplate.fields.map(field => (
                    <div key={field.id} className="space-y-1">
                      <label className="text-[11px] font-semibold text-slate-700 block">
                        {field.label}
                      </label>
                      {field.type === 'textarea' ? (
                        <textarea
                          rows={3}
                          value={activeValues[field.id] || ''}
                          onChange={e => handleFieldChange(field.id, e.target.value)}
                          placeholder={field.placeholder}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                        />
                      ) : (
                        <input
                          type={field.type || 'text'}
                          value={activeValues[field.id] || ''}
                          onChange={e => handleFieldChange(field.id, e.target.value)}
                          placeholder={field.placeholder}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                        />
                      )}
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      const defaults: Record<string, string> = {};
                      currentTemplate.fields.forEach(f => {
                        defaults[f.id] = f.defaultValue;
                      });
                      setFieldValues(prev => ({ ...prev, [currentTemplate.id]: defaults }));
                    }}
                    className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 transition"
                  >
                    Reset Defaults
                  </button>

                  <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                    Ready to Export
                  </span>
                </div>
              </div>

              {/* Statutory Note Card */}
              <div className="bg-amber-500/5 rounded-2xl p-4 border border-amber-500/20 flex items-start gap-3">
                <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-700 leading-relaxed">
                  <strong className="text-slate-900 block font-semibold mb-0.5">Statutory Standard:</strong>
                  {currentTemplate.statutoryBasis}. Draft prepared adhering to high-standard Indian procedural conventions and authoritative precedents.
                </div>
              </div>

            </div>

            {/* Right Column (7 Cols): Live Formatted Document Viewer */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Document Header Controls */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 line-clamp-1">
                      {currentTemplate.title}
                    </h2>
                    <span className="text-[10px] text-slate-500 font-medium">
                      Governing Law: {currentTemplate.governingLaw}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
                    title="Print Document"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
                    title="Download as Text Document"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="px-3 py-1.5 bg-[#0B1325] text-amber-400 hover:bg-slate-800 text-xs font-bold rounded-lg flex items-center gap-1.5 transition"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              {/* Document Viewer Paper Layout */}
              <div className="bg-white rounded-2xl border border-slate-300 shadow-md p-6 sm:p-10 relative overflow-hidden">
                {/* Stamp Paper Simulation Top Band */}
                <div className="border-b-2 border-dashed border-amber-400/40 pb-4 mb-6 text-center">
                  <div className="inline-block px-3 py-1 rounded bg-amber-50 border border-amber-300 text-amber-900 text-[10px] font-mono font-bold uppercase tracking-wider mb-1">
                    PUNIA ASSOCIATES • ADVOCATES & SOLICITORS
                  </div>
                  <div className="text-[11px] text-slate-400 italic">
                    Legal Document Draft — For Execution on Prescribed Non-Judicial Stamp Paper / Court Stationery
                  </div>
                </div>

                {/* Preformatted Text Body */}
                <pre className="font-mono text-xs sm:text-[13px] text-slate-800 whitespace-pre-wrap leading-relaxed tracking-normal overflow-x-auto selection:bg-amber-200">
                  {renderedText}
                </pre>

                {/* Document Footer Endorsement */}
                <div className="border-t border-slate-200 mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
                  <span>Prepared & Standardized by <strong>PUNIA ASSOCIATES</strong></span>
                  <span className="font-mono text-[10px]">Strict Legal Privilege & Confidentiality</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </main>
    </>
  );
};

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  PhoneCall, 
  MapPin, 
  Mail, 
  Clock, 
  MessageCircle, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Scale, 
  FileText, 
  Building2,
  Sparkles
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { FIRM_INFO, LEGAL_CATEGORIES } from '../data/legalData';

interface ContactPageProps {
  onOpenConsultation: (category?: string, state?: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenConsultation }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    state: 'Haryana',
    category: 'Bail & Criminal Defense',
    urgency: 'Standard (1-2 Days)',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setSubmitted(true);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Namaste Punia Associates (puniaassociates.site), I would like to request a consultation regarding a legal matter in ${formData.state}.`
    );
    window.open(`https://wa.me/${FIRM_INFO.whatsappNumber.replace('+', '')}?text=${text}`, '_blank');
  };

  return (
    <>
      <SEOHead
        title="Contact Punia Associates | Law Firm & Chambers Directory"
        description="Contact Punia Associates for legal consultations, chamber visits, helpline assistance and case evaluations across India."
        canonicalPath="/contact"
        schemaData={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact Punia Associates & Chambers Directory",
          "url": "https://puniaassociates.site/contact",
          "description": "Contact Punia Associates for legal consultations, chamber visits, helpline assistance and case evaluations across India.",
          "mainEntity": {
            "@type": "LegalService",
            "name": "Punia Associates",
            "url": "https://puniaassociates.site/",
            "telephone": "+91-9053281218",
            "email": "counsel@puniaassociates.site",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Chamber No. 412, District & Sessions Court Complex, Sector 12",
              "addressLocality": "Gurugram",
              "addressRegion": "Haryana",
              "postalCode": "122001",
              "addressCountry": "IN"
            }
          }
        }}
      />

      <Breadcrumbs items={[{ name: 'Contact & Chambers', url: '/contact' }]} />

      <main className="bg-[#F8F9FA] text-[#1E293B]">
        {/* Header Hero */}
        <section className="bg-[#0B1325] text-white py-16 sm:py-20 border-b border-slate-800 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30 tracking-wide uppercase font-mono mb-4">
                Regional Chambers & Helplines
              </span>
              <h1 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
                Contact Punia Associates & Chambers Directory
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
                Connect with our practicing advocates for preliminary case evaluations, chamber appointments, emergency bail guidance, and multi-state litigation coordination.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Grid: Form & Immediate Contacts */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Consultation Intake Form (7 cols) */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded border border-amber-200 inline-block mb-3">
                Preliminary Case Evaluation
              </span>
              <h2 className="font-cormorant text-2xl sm:text-3xl font-bold text-[#0B1325] mb-2">
                Submit Your Legal Inquiry
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                Provide basic details regarding your court case, summon, or dispute. An advocate from our relevant state team will connect with you.
              </p>

              {submitted ? (
                <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h3 className="font-bold text-lg text-emerald-900">Case Inquiry Received</h3>
                  <p className="text-xs text-emerald-700 leading-relaxed max-w-md mx-auto">
                    Namaste <strong>{formData.name}</strong>. Your inquiry for <strong>{formData.category}</strong> in <strong>{formData.state}</strong> has been transmitted to our senior chambers desk. An advocate will review your facts and call you at <strong>{formData.phone}</strong>.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-4 py-2 bg-emerald-700 text-white text-xs font-bold rounded-lg cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Kumar"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-amber-500 bg-slate-50 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Contact Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-amber-500 bg-slate-50 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        State Jurisdiction *
                      </label>
                      <select
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-amber-500 bg-slate-50 focus:bg-white"
                      >
                        <option value="Haryana">Haryana (P&H High Court / District)</option>
                        <option value="Uttar Pradesh">Uttar Pradesh (Allahabad / Lucknow / District)</option>
                        <option value="Rajasthan">Rajasthan (Jaipur / Jodhpur / District)</option>
                        <option value="Delhi NCR">Delhi NCR & Supreme Court</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Legal Category *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-amber-500 bg-slate-50 focus:bg-white"
                      >
                        <option value="Bail & Criminal Defense">Bail & Criminal Defence</option>
                        <option value="Civil Law & Injunctions">Civil Law & Injunctions</option>
                        <option value="Matrimonial & Family">Matrimonial & Family Law</option>
                        <option value="Property & Land Revenue">Property & Land Revenue</option>
                        <option value="Corporate & Contracts">Corporate & Contracts</option>
                        <option value="Constitutional Writs">Constitutional Writs</option>
                        <option value="Consumer Protection">Consumer Protection</option>
                        <option value="Cyber Law & Digital Fraud">Cyber Law & Digital Fraud</option>
                        <option value="Legal Notice Drafting">Legal Notice Drafting / Reply</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Urgency Level
                    </label>
                    <select
                      value={formData.urgency}
                      onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-amber-500 bg-slate-50 focus:bg-white"
                    >
                      <option value="Urgent (Arrest / Bail / Stay)">Urgent: Immediate Arrest / Bail / High Court Stay</option>
                      <option value="High Priority (Court Hearing within 7 days)">High Priority: Court Hearing within 7 Days</option>
                      <option value="Standard (1-2 Days)">Standard Advisory / Document Review</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Brief Factual Summary (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Mention court name, FIR number, date of notice, or specific relief sought..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-amber-500 bg-slate-50 focus:bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-[#0B1325] text-xs font-bold rounded-lg transition-colors shadow flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <PhoneCall className="w-4 h-4 text-[#0B1325]" />
                    <span>Request Consultation from Regional Desk</span>
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Your data is confidential and protected by advocate-client privilege.</span>
                  </div>
                </form>
              )}
            </div>

            {/* Direct Helplines & WhatsApp (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Emergency Card */}
              <div className="bg-[#0B1325] text-white p-6 rounded-xl border border-slate-800 shadow-md">
                <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded uppercase">
                  Immediate Advocate Assistance
                </span>
                <h3 className="font-cormorant text-2xl font-bold text-white mt-2 mb-2">
                  Direct Telephone Helplines
                </h3>
                <p className="text-xs text-slate-300 mb-6 leading-relaxed">
                  For urgent arrests, police notices under Section 41A, high court mentionings, or stay petitions, dial our chambers helplines directly:
                </p>

                <div className="space-y-3 mb-6">
                  <a 
                    href={`tel:${FIRM_INFO.helplinePhone}`} 
                    className="p-3 bg-slate-900 rounded-lg border border-slate-800 hover:border-amber-500/50 transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <PhoneCall className="w-4 h-4 text-amber-400" />
                      <div>
                        <div className="text-xs text-slate-400">Primary Chamber Helpline</div>
                        <strong className="text-sm text-white font-mono">{FIRM_INFO.helplinePhone}</strong>
                      </div>
                    </div>
                    <span className="text-xs text-amber-400 font-bold">Call Now</span>
                  </a>

                  <a 
                    href={`tel:${FIRM_INFO.secondaryPhone}`} 
                    className="p-3 bg-slate-900 rounded-lg border border-slate-800 hover:border-amber-500/50 transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <PhoneCall className="w-4 h-4 text-amber-400" />
                      <div>
                        <div className="text-xs text-slate-400">Secondary Appellate Desk</div>
                        <strong className="text-sm text-white font-mono">{FIRM_INFO.secondaryPhone}</strong>
                      </div>
                    </div>
                    <span className="text-xs text-amber-400 font-bold">Call Now</span>
                  </a>
                </div>

                <button
                  onClick={handleWhatsApp}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors shadow flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Connect on WhatsApp</span>
                </button>
              </div>

              {/* Chambers Timings & Email */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 text-xs text-slate-600">
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800 block text-sm">Chambers Working Hours</strong>
                    <span>Monday to Saturday: 08:30 AM to 08:30 PM</span>
                    <span className="block text-slate-400 mt-0.5">Emergency Bail Desk active 24/7 for urgent arrests.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 border-t border-slate-100 pt-3">
                  <Mail className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800 block text-sm">Official Email Correspondence</strong>
                    <span className="font-mono text-slate-700">{FIRM_INFO.email}</span>
                    <span className="block text-slate-400 mt-0.5">For formal service of pleadings and case papers.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Chambers Locations Directory */}
        <section className="py-16 bg-slate-100 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-3 py-1 rounded-md">
                Chambers Directory
              </span>
              <h2 className="font-cormorant text-3xl sm:text-4xl font-bold text-[#0B1325] mt-3">
                Regional Chambers & District Court Presence
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                Physical chamber offices across Haryana, Uttar Pradesh, Rajasthan, and New Delhi. Prior appointment recommended for in-person chamber conferences.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {FIRM_INFO.offices.map((office, i) => (
                <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      {office.state}
                    </span>
                    <h3 className="font-bold text-base text-[#0B1325] mt-2 mb-1">
                      {office.city}
                    </h3>
                    <p className="text-xs text-slate-500 mb-3">
                      {office.court}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {office.address}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <span className="text-xs font-bold text-slate-700 block">Chambers Contact:</span>
                    <a href={`tel:${office.phone}`} className="text-xs text-amber-600 hover:underline font-mono font-semibold">
                      {office.phone}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What to Bring to Consultation */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 bg-white rounded-xl border border-slate-200 shadow-sm">
            <h2 className="font-cormorant text-2xl sm:text-3xl font-bold text-[#0B1325] mb-4">
              What to Bring to Your Legal Consultation
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
              To make your consultation as effective as possible, bringing primary documentary records helps our advocates analyze the statutory merits immediately:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-slate-600">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200/60">
                <strong className="text-slate-800 block mb-1">Criminal Matters</strong>
                <span>Copy of FIR, Section 41A notice, remand order, or orders of subordinate bail rejection.</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200/60">
                <strong className="text-slate-800 block mb-1">Property & Revenue</strong>
                <span>Registered sale deed, Jamabandi / Khatauni copy, mutation extract, or builder allotment letter.</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200/60">
                <strong className="text-slate-800 block mb-1">Contracts & Commercial</strong>
                <span>Executed agreement, invoice ledger, dishonoured cheque & return memo, or arbitration clause.</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200/60">
                <strong className="text-slate-800 block mb-1">Civil & Writs</strong>
                <span>Received court summons, copy of impugned administrative order, or earlier legal notice.</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

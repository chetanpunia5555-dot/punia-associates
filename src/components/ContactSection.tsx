import React, { useState } from 'react';
import { 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Send,
  MessageCircle,
  Sparkles,
  Download
} from 'lucide-react';
import { FIRM_INFO } from '../data/legalData';

export const ContactSection: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [state, setState] = useState('Haryana');
  const [legalIssue, setLegalIssue] = useState('Bail (Regular / Anticipatory)');
  const [details, setDetails] = useState('');
  const [bookingToken, setBookingToken] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const token = `PA-${state.slice(0, 2).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingToken(token);

    // Save lead locally so it works 100% self-contained
    const existing = JSON.parse(localStorage.getItem('punia_consultations') || '[]');
    existing.unshift({
      token,
      name,
      phone,
      state,
      legalIssue,
      details,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem('punia_consultations', JSON.stringify(existing));

    setFormSubmitted(true);
  };

  const handleWhatsAppWithDetails = () => {
    const text = encodeURIComponent(`Namaste Punia Associates (puniaassociates.site), my name is ${name}. I submitted a FREE Consultation inquiry [Ref: ${bookingToken}]. State: ${state}, Issue: ${legalIssue}. Please connect me with the concerned advocate.`);
    window.open(`https://wa.me/${FIRM_INFO.whatsappNumber.replace('+', '')}?text=${text}`, '_blank');
  };

  return (
    <section id="offices-section" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-300">
            <Building2 className="w-3.5 h-3.5 text-emerald-800" />
            <span>State Chambers & Court Desks</span>
          </div>
          <h2 className="font-cormorant text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1325]">
            How to Contact Punia Associates – Regional Chambers & Legal Desks
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Clients can contact Punia Associates via 24/7 telephone helpline, direct WhatsApp, online case evaluation, or by visiting our official legal chambers adjacent to High Courts and District Sessions Courts across Haryana, Uttar Pradesh, Rajasthan, and the Supreme Court of India.
          </p>
        </div>

        {/* 4 Regional Offices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {FIRM_INFO.offices.map((off, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl border border-slate-200 bg-[#FAF9F7] hover:border-amber-400 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                    {off.state}
                  </span>
                  <Building2 className="w-4 h-4 text-slate-400" />
                </div>

                <h3 className="font-cormorant text-2xl font-bold text-[#0B1325] mb-1">
                  {off.city}
                </h3>
                <span className="text-xs text-amber-800 font-semibold block mb-3">
                  {off.court}
                </span>

                <div className="space-y-2 text-xs text-slate-600 mb-6">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-600" />
                    <span>{off.address}</span>
                  </div>
                  <div className="flex items-center gap-2 pt-1 text-slate-500">
                    <Clock className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                    <span>Court Hours: 10:00 AM - 5:00 PM</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex flex-col gap-1">
                <a
                  href={`tel:${off.phone}`}
                  className="text-xs font-bold text-[#0B1325] hover:text-amber-800 flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{off.phone}</span>
                </a>
                {off.altPhone && (
                  <a
                    href={`tel:${off.altPhone}`}
                    className="text-xs font-medium text-slate-600 hover:text-amber-800 flex items-center gap-1.5 pl-5"
                  >
                    <span>Alt: {off.altPhone}</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Free Consultation Booking Box (Self-Contained Lead Engine) */}
        <div className="bg-[#FAF9F7] rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Col Info */}
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-amber-500/20 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>Talk to an Expert for FREE</span>
              </div>
              <h3 className="font-cormorant text-3xl font-bold text-[#0B1325] mb-3">
                Get Instant Preliminary Case Advice
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-6 font-medium">
                Whether you need urgent anticipatory bail, partition of agricultural land, matrimonial dispute resolution, or commercial contract defense, our dedicated advocates are ready to review your matter for preliminary assessment.
              </p>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Advocate-Client privilege protected under Indian Evidence Act</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span>Call back within 15–30 minutes by concerned state advocate</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>Official Helplines: <strong className="text-slate-900">{FIRM_INFO.helplinePhone}</strong> / <strong className="text-slate-900">{FIRM_INFO.secondaryPhone}</strong></span>
                </div>
              </div>
            </div>

            {/* Right Col: Instant Booking Form */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm">
              {formSubmitted ? (
                <div className="text-center py-6 space-y-4 animate-in fade-in duration-300">
                  <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
                  <div>
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
                      Consultation Request Confirmed
                    </span>
                    <h4 className="font-cormorant text-3xl font-bold text-[#0B1325] mt-1">
                      Reference ID: {bookingToken}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">
                    A senior advocate from our {state} chambers will call you directly at <strong>{phone}</strong> within 15 to 30 minutes at zero consultation fee.
                  </p>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
                    <button
                      onClick={handleWhatsAppWithDetails}
                      className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Connect Immediately via WhatsApp</span>
                    </button>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="w-full sm:w-auto px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded cursor-pointer"
                    >
                      Submit Another Case
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-900 uppercase tracking-wider mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Kumar"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-1 focus:ring-amber-500 font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-900 uppercase tracking-wider mb-1">
                        Mobile Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 XXXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-1 focus:ring-amber-500 font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-900 uppercase tracking-wider mb-1">
                        Select Your State *
                      </label>
                      <select
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full text-xs p-2.5 border border-slate-300 rounded-lg bg-white font-medium"
                      >
                        <option value="Haryana">Haryana (P&H High Court / District)</option>
                        <option value="Uttar Pradesh">Uttar Pradesh (Allahabad / Lucknow / Noida)</option>
                        <option value="Rajasthan">Rajasthan (Jaipur / Jodhpur / District)</option>
                        <option value="Delhi NCR">Delhi NCR / Supreme Court of India</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-900 uppercase tracking-wider mb-1">
                        Nature of Legal Dispute *
                      </label>
                      <select
                        value={legalIssue}
                        onChange={(e) => setLegalIssue(e.target.value)}
                        className="w-full text-xs p-2.5 border border-slate-300 rounded-lg bg-white font-medium"
                      >
                        <option value="Bail (Regular / Anticipatory)">Bail (Regular / Anticipatory)</option>
                        <option value="Criminal Defense / FIR Quashing">Criminal Defense / FIR Quashing</option>
                        <option value="Commercial Contract & Agreements">Commercial Contract & Agreements</option>
                        <option value="Property & Land Revenue (Partition / Mutation)">Property & Land Revenue (Partition / Mutation)</option>
                        <option value="Matrimonial (Divorce / 498A / Maintenance)">Matrimonial (Divorce / 498A / Maintenance)</option>
                        <option value="RERA Real Estate & Delayed Possession">RERA Real Estate & Delayed Possession</option>
                        <option value="Cheque Bounce (Sec 138 NI Act)">Cheque Bounce (Sec 138 NI Act)</option>
                        <option value="Service Law / Government Employment CAT">Service Law / Government Employment CAT</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-900 uppercase tracking-wider mb-1">
                      Brief Case Facts or Urgent Hearing Date
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Specify your police station, court district, FIR number, or land location..."
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-1 focus:ring-amber-500 font-medium"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#0B1325] hover:bg-[#1E293B] text-white font-bold text-xs rounded-lg transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Talk to an Expert for FREE (निःशुल्क सलाह बुक करें)</span>
                  </button>

                  <div className="text-center text-[10px] text-slate-500">
                    By submitting, your details remain 100% confidential under Advocate Professional Conduct Rules.
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Phone, 
  MessageCircle, 
  ShieldCheck, 
  CheckCircle2, 
  MapPin, 
  Scale, 
  Clock, 
  Lock 
} from 'lucide-react';
import { FIRM_INFO, LEGAL_CATEGORIES, STATE_HUBS } from '../data/legalData';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: string;
  initialState?: string;
  initialAdvocateName?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  initialCategory,
  initialState,
  initialAdvocateName
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [state, setState] = useState(initialState || 'Haryana');
  const [category, setCategory] = useState(initialCategory || 'bail-advocacy');
  const [court, setCourt] = useState('Sessions / High Court');
  const [caseDescription, setCaseDescription] = useState('');
  const [preferredTime, setPreferredTime] = useState('Immediate / Next 15 mins');
  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  useEffect(() => {
    if (initialState) setState(initialState);
    if (initialCategory) setCategory(initialCategory);
  }, [initialState, initialCategory]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const token = `PA-${state.slice(0, 2).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(token);

    // Save lead locally to satisfy self-contained requirement
    const existing = JSON.parse(localStorage.getItem('punia_consultations') || '[]');
    existing.unshift({
      token,
      name,
      phone,
      state,
      category,
      advocateAssigned: initialAdvocateName || 'Senior State Counsel',
      caseDescription,
      preferredTime,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem('punia_consultations', JSON.stringify(existing));

    setSubmitted(true);
  };

  const handleWhatsAppInstant = () => {
    const text = encodeURIComponent(`Namaste Punia Associates (puniaassociates.site), my name is ${name}. I need FREE consultation [Ref: ${bookingRef}]. State: ${state}, Issue: ${category}. Please connect me with our senior advocate.`);
    window.open(`https://wa.me/${FIRM_INFO.whatsappNumber.replace('+', '')}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full max-h-[92vh] overflow-y-auto border border-slate-200">
        {/* Header */}
        <div className="bg-[#0B1325] text-white p-6 relative">
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              100% FREE CONSULTATION • ZERO OBLIGATION
            </span>
          </div>

          <h3 className="font-cormorant text-2xl sm:text-3xl font-bold text-white">
            Talk to an Expert Advocate for FREE
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Official Portal: <strong className="text-amber-300 font-mono">puniaassociates.site</strong> (20+ Years Advocacy Experience)
          </p>

          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-6 space-y-4 animate-in fade-in duration-300">
              <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block">
                  Free Consultation Confirmed
                </span>
                <h4 className="font-cormorant text-3xl font-bold text-[#0B1325] mt-1">
                  Reference: {bookingRef}
                </h4>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left text-xs space-y-2 text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">Client Name:</span>
                  <strong>{name}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Contact Number:</span>
                  <strong>{phone}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Assigned Jurisdiction:</span>
                  <strong>{state} High Court & District Panel</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Advocate Callback Time:</span>
                  <span className="text-emerald-700 font-bold">{preferredTime}</span>
                </div>
              </div>

              <p className="text-xs text-slate-600">
                A senior advocate will call you on your phone at <strong>{phone}</strong>. If your matter involves an emergency arrest or same-day hearing, connect instantly on WhatsApp.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={handleWhatsAppInstant}
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Start WhatsApp Chat Now</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {initialAdvocateName && (
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-300 text-xs text-amber-950 flex items-center justify-between">
                  <span>Consulting Directly With: <strong>{initialAdvocateName}</strong></span>
                  <span className="text-[10px] font-bold bg-amber-200 px-2 py-0.5 rounded">Selected</span>
                </div>
              )}

              {/* State Selection */}
              <div>
                <label className="block text-[11px] font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                  1. Which State is Your Case In? *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['Haryana', 'Uttar Pradesh', 'Rajasthan', 'Delhi NCR'].map((st) => (
                    <button
                      type="button"
                      key={st}
                      onClick={() => setState(st)}
                      className={`py-2 px-2 text-xs font-bold rounded-lg border transition-all cursor-pointer text-center ${
                        state === st
                          ? 'bg-[#0B1325] text-white border-[#0B1325]'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-[11px] font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                  2. Select Legal Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-lg bg-white font-medium"
                >
                  {LEGAL_CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title} ({c.hindiTitle})
                    </option>
                  ))}
                </select>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-900 uppercase tracking-wider mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Surender Singh"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-lg font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-900 uppercase tracking-wider mb-1">
                    Mobile Phone (For Free Call) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 XXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-lg font-medium"
                  />
                </div>
              </div>

              {/* Preferred Call Timing */}
              <div>
                <label className="block text-[11px] font-bold text-slate-900 uppercase tracking-wider mb-1">
                  When Should the Advocate Call You?
                </label>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-lg bg-white font-medium"
                >
                  <option value="Immediate / Next 15 mins">Immediate (Within 15 minutes)</option>
                  <option value="Morning (9 AM - 12 PM)">Morning (9:00 AM - 12:00 PM)</option>
                  <option value="Afternoon (12 PM - 4 PM)">Afternoon (12:00 PM - 4:00 PM)</option>
                  <option value="Evening (5 PM - 8 PM)">Evening (5:00 PM - 8:00 PM)</option>
                </select>
              </div>

              {/* Case Details */}
              <div>
                <label className="block text-[11px] font-bold text-slate-900 uppercase tracking-wider mb-1">
                  Brief Case Facts / Relevant Police Station / Court
                </label>
                <textarea
                  rows={2}
                  placeholder="Share any FIR number, district name, or upcoming hearing date..."
                  value={caseDescription}
                  onChange={(e) => setCaseDescription(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-lg font-medium"
                />
              </div>

              <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Zero consultation fee. 100% confidential under Advocate-Client privilege.</span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-[#0B1325] to-[#1E293B] hover:from-[#1E293B] hover:to-[#0B1325] text-white font-bold text-xs rounded-lg shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Submit & Talk to Advocate for FREE</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

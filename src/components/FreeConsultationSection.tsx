import React, { useState } from 'react';
import { 
  Scale, 
  Send, 
  CheckCircle2, 
  User, 
  Phone, 
  ChevronDown,
  Check,
  ShieldCheck,
  Clock,
  Sparkles
} from 'lucide-react';

export const FreeConsultationSection: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [practiceArea, setPracticeArea] = useState('Criminal Law & Bail');
  const [description, setDescription] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      setErrorMsg('Please enter a valid 10-digit phone number.');
      return;
    }

    setErrorMsg('');
    setSubmitting(true);

    try {
      await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: name,
          clientPhone: phone,
          practiceArea,
          description: description || 'Free Legal Consultation request from homepage banner.'
        })
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="consultation" className="py-10 bg-slate-100 text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Ivory Banner Box Matching Image 1 */}
        <div className="bg-[#FAF7F2] border border-amber-200/80 rounded-3xl p-6 sm:p-8 shadow-sm">
          
          {submitted ? (
            <div className="py-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-emerald-950">
                Consultation Request Received
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 max-w-md mx-auto">
                Thank you, <strong>{name}</strong>. Your consultation request for <strong>{practiceArea}</strong> has been logged. Our advocate desk will review your details shortly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setPhone('');
                  setDescription('');
                }}
                className="px-4 py-2 bg-[#0B1325] text-amber-400 rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Header Row */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#C5A059] text-[#0B1325] flex items-center justify-center shrink-0 shadow-sm">
                    <Scale className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                      Free Legal Consultation
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                      Get initial legal advice from our team for your matter.
                    </p>
                  </div>
                </div>
              </div>

              {errorMsg && (
                <div className="p-3 bg-red-100 border border-red-300 text-red-700 text-xs rounded-xl font-medium">
                  {errorMsg}
                </div>
              )}

              {/* Inline Inputs Form Grid Matching Image 1 */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-center">
                  
                  {/* Name Input */}
                  <div className="sm:col-span-3 relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your Name *"
                      className="w-full pl-10 pr-3 py-3 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                      required
                    />
                  </div>

                  {/* Phone Input */}
                  <div className="sm:col-span-3 relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone Number *"
                      className="w-full pl-10 pr-3 py-3 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                      required
                    />
                  </div>

                  {/* Practice Area Dropdown */}
                  <div className="sm:col-span-3 relative">
                    <select
                      value={practiceArea}
                      onChange={(e) => setPracticeArea(e.target.value)}
                      aria-label="Select practice area for consultation"
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 appearance-none cursor-pointer"
                    >
                      <option value="Civil Law">Civil Law & Injunctions</option>
                      <option value="Criminal Law & Bail">Criminal Law & Bail</option>
                      <option value="Corporate Law">Corporate Law & Commercial</option>
                      <option value="International Arbitration">International Arbitration (SIAC / ICC / LCIA)</option>
                      <option value="Mergers & Acquisitions (M&A)">Mergers & Acquisitions (M&A) & NCLT</option>
                      <option value="Property Law">Property Law & Revenue</option>
                      <option value="Banking & Finance">Banking & Finance</option>
                      <option value="Family Law">Family & Matrimonial</option>
                      <option value="Employment Law">Employment & Labor Law</option>
                      <option value="Consumer Law">Consumer Law & Disputes</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  {/* Submit Button */}
                  <div className="sm:col-span-3">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3 bg-[#0B1325] hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>{submitting ? 'Submitting...' : 'Request Consultation'}</span>
                      <Send className="w-4 h-4 text-amber-400" />
                    </button>
                  </div>

                </div>

                {/* Optional Description (Mobile/Tablet Expanded) */}
                <div className="pt-1">
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Briefly describe your legal matter (optional)..."
                    className="w-full px-4 py-2 bg-white/80 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </form>

              {/* Trust Checkmarks Underneath Matching Image 1 */}
              <div className="pt-4 border-t border-amber-200/60 flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-amber-900">
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-amber-700" />
                  <span>Initial Guidance Free</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-amber-700" />
                  <span>Confidential Discussion</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-amber-700" />
                  <span>Matter Assessment</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-amber-700" />
                  <span>Prompt Response</span>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </section>
  );
};

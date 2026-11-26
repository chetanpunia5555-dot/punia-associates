import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Mic, 
  Phone, 
  MessageSquare, 
  Scale, 
  Globe, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight,
  PhoneCall,
  User,
  Volume2
} from 'lucide-react';
import { FIRM_INFO } from '../data/legalData';

interface AIVakilBannerProps {
  onOpenConsultation?: (category?: string, state?: string) => void;
}

type DialectType = 'haryanvi' | 'punjabi' | 'rajasthani' | 'hi' | 'en';

export const AIVakilBanner: React.FC<AIVakilBannerProps> = ({ onOpenConsultation }) => {
  const [selectedDialect, setSelectedDialect] = useState<DialectType>('haryanvi');
  const [caseQuery, setCaseQuery] = useState('');

  // Sample back-and-forth conversation preview by dialect
  const conversationSamples: Record<DialectType, {
    label: string;
    clientQuestion: string;
    advocateAnswer: string;
    quickChips: string[];
    placeholder: string;
  }> = {
    haryanvi: {
      label: 'हरियाणवी (Haryanvi)',
      clientQuestion: 'राम-राम वकील साब, हमारे चाचा नै पुश्तैनी जमीन पै नाजायज कब्जा कर लिया, के कानूनी उपाय सै?',
      advocateAnswer: 'राम-राम भाई! चिंता ना कर। सिविल कोर्ट तै Order 39 Rules 1 & 2 CPC में तुरंत "स्टे" (यथास्थिति) मिल ज्यागा। साथ ही SDM कोर्ट में धारा 116 / सनद तकसीम का दावा लगाया जाएगा ताकी जमीन का पक्का बंटवारा हो सकै।',
      quickChips: [
        '🚨 FIR होण पै अग्रिम जमानत',
        '🏡 पुश्तैनी जमीन पै कब्जा व बंटवारा',
        '📜 138 चेक बाउंस नोटिस',
        '💍 आपसी सहमति तलाक'
      ],
      placeholder: 'हरियाणवी मांय पूछो (उदा. "FIR हो गई जमानत कैसे होगी", "जमीन पै कब्जा")...'
    },
    punjabi: {
      label: 'ਪੰਜਾਬੀ (Punjabi)',
      clientQuestion: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਜੀ, ਪੁਲਿਸ ਨੇ ਝੂਠੀ FIR ਦਰਜ ਕੀਤੀ ਹੈ, ਗ੍ਰਿਫਤਾਰੀ ਤੋਂ ਬਚਣ ਲਈ ਕੀ ਕਰੀਏ?',
      advocateAnswer: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਜੀ! ਨਵੇਂ ਕਾਨੂੰਨ (BNSS 2024 ਦੀ ਧਾਰਾ 482 / 438 CrPC) ਤਹਿਤ ਸੈਸ਼ਨ ਕੋਰਟ ਜਾਂ ਪੰਜਾਬ ਤੇ ਹਰਿਆਣਾ ਹਾਈ ਕੋਰਟ ਤੋਂ ਤੁਰੰਤ ਅਗਾਊਂ ਜ਼ਮਾਨਤ (Anticipatory Bail) ਦੀ ਅਰਜ਼ੀ ਲੱਗੇਗੀ। ਨਾਲ ਹੀ FIR Quash ਕਰਾਉਣ ਦੀ ਪਟੀਸ਼ਨ ਦਾਇਰ ਹੋਵੇਗੀ।',
      quickChips: [
        '🚨 ਪੁਲਿਸ FIR ਤੇ ਅਗਾਊਂ ਜ਼ਮਾਨਤ',
        '🏡 ਜ਼ਮੀਨ ਦਾ ਨਾਜਾਇਜ਼ ਕਬਜ਼ਾ ਤੇ ਸਟੇਅ',
        '📜 138 ਚੈੱਕ ਬਾਊਂਸ ਲੀਗਲ ਨੋਟਿਸ',
        '💍 ਆਪਸੀ ਸਹਿਮਤੀ ਨਾਲ ਤਲਾਕ'
      ],
      placeholder: 'ਪੰਜਾਬੀ ਵਿੱਚ ਪੁੱਛੋ (ਜਿਵੇਂ: "FIR ਹੋ ਗਈ ਜ਼ਮਾਨਤ ਕਿਵੇਂ ਮਿਲੇਗੀ")...'
    },
    rajasthani: {
      label: 'राजस्थानी (Rajasthani)',
      clientQuestion: 'खम्मा घणी वकील सा! मारो 5 लाख रो चेक बाउंस हो गयो, पार्टी फोन नी उठावे, काई करूँ?',
      advocateAnswer: 'खम्मा घणी सा! चेक बाउंस (Section 138 NI Act) मांय बैंक मेमो मिल्या रा 30 दिनां रे भीतर 15 दिन रो लीगल नोटिस भेजणो अनिवार्य है। 15 दिनां मांय पैसो नी देवे तो कोर्ट मांय केस दर्ज होसी और 20% अंतरिम मुआविजो भी मिल सके है।',
      quickChips: [
        '🚨 पुलिस मुकदमों व जमानत',
        '🏡 जमीन रो रोळो व स्टे आर्डर',
        '📜 चेक बाउंस रो 15 दिन रो नोटिस',
        '💍 पारिवारिक समझोतो'
      ],
      placeholder: 'राजस्थानी मांय लिखो (उदा. "जमीन रो रोळो", "चेक बाउंस")...'
    },
    hi: {
      label: 'हिंदी (Hindi)',
      clientQuestion: 'वकील साहब, मेरे भाई के खिलाफ झूठी FIR दर्ज करा दी गई है, क्या पुलिस सीधे जेल भेज सकती है?',
      advocateAnswer: 'नमस्ते। सुप्रीम कोर्ट के अर्निश कुमार जजमेंट और BNSS धारा 35 के तहत 7 साल से कम सजा वाले मामलों में पुलिस सीधे गिरफ्तार नहीं कर सकती; पहले नोटिस देना अनिवार्य है। साथ ही हम सेशन कोर्ट से अग्रिम जमानत (Anticipatory Bail) लेंगे।',
      quickChips: [
        '🚨 अग्रिम जमानत (Anticipatory Bail)',
        '🏡 जमीन पर अवैध कब्जा व स्टे (CPC)',
        '📜 चेक बाउंस (Sec 138 NI Act)',
        '💍 आपसी सहमति तलाक (Sec 13B)'
      ],
      placeholder: 'अपना केस यहाँ लिखें (उदा. "FIR से जमानत", "जमीन पर कब्जा")...'
    },
    en: {
      label: 'English',
      clientQuestion: 'Advocate Sir, how do I obtain an immediate ad-interim stay injunction against illegal property demolition?',
      advocateAnswer: 'You can immediately file an urgent Civil Suit along with an application under Order 39 Rules 1 & 2 read with Section 151 CPC for an ex-parte ad-interim status quo order before the Civil Judge or High Court.',
      quickChips: [
        '🚨 Anticipatory Bail (Sec 482 BNSS)',
        '🏡 Injunction Stay (Order 39 CPC)',
        '📜 Cheque Bounce Statutory Notice',
        '💍 Mutual Consent Divorce (13B HMA)'
      ],
      placeholder: 'Type your legal situation in English...'
    }
  };

  const currentSample = conversationSamples[selectedDialect];

  const triggerChat = (initialText?: string) => {
    const query = initialText || caseQuery;
    window.dispatchEvent(new CustomEvent('open-ai-legal-chat', {
      detail: { 
        query: query,
        language: selectedDialect
      }
    }));
  };

  const handleQuickTopic = (topic: string) => {
    setCaseQuery(topic);
    triggerChat(topic);
  };

  return (
    <section id="ai-vakil-section" className="relative bg-gradient-to-b from-[#070D1B] via-[#0E172E] to-[#070D1B] py-16 border-y-2 border-amber-500/40 text-white overflow-hidden">
      {/* Background Courtroom Grid & Ambient Glow */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Top Eyebrow: Regional Dialects Supported */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/40 text-amber-300 text-xs font-bold tracking-wide shadow">
            <Scale className="w-4 h-4 text-amber-400" />
            <span>AI LEGAL COUNSEL DESK • PUNIA ASSOCIATES</span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 hidden sm:inline">Choose Dialect / भाषा चुनें:</span>
            <div className="flex flex-wrap gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-700">
              {(Object.keys(conversationSamples) as DialectType[]).map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDialect(d)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedDialect === d
                      ? 'bg-amber-500 text-[#0B1325] shadow-md scale-105'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {conversationSamples[d].label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Banner Card */}
        <div className="bg-slate-900/95 border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* LEFT: Advocate Chamber Visual & Live Status (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative group w-full max-w-sm sm:max-w-md">
                {/* Glow ring */}
                <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 rounded-3xl blur-md opacity-35 group-hover:opacity-70 transition duration-500" />
                
                {/* Visual Image Container */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950 border-2 border-amber-400 shadow-2xl">
                  <img
                    src="/ai-advocate-chamber.svg"
                    alt="Punia Associates AI Senior Advocate in Chamber"
                    className="w-full h-full object-cover transform group-hover:scale-103 transition-transform duration-500"
                  />
                  
                  {/* Live Status Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 bg-[#0B1325]/95 border border-emerald-500/70 rounded-xl px-3.5 py-2 backdrop-blur-md flex items-center justify-between shadow-xl">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <div>
                        <span className="text-xs font-bold text-white block leading-none">
                          AI Vakil Chamber Online
                        </span>
                        <span className="text-[10px] text-emerald-400 font-medium">
                          Live Voice & Web Search Active
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/40">
                      24/7 Available
                    </span>
                  </div>
                </div>
              </div>

              {/* Advocate Credentials Under Portrait */}
              <div className="mt-4 text-center">
                <h4 className="font-cinzel text-base font-bold text-white tracking-wide flex items-center justify-center gap-1.5">
                  <span>PUNIA ASSOCIATES CHAMBERS</span>
                </h4>
                <p className="text-xs text-amber-300 font-medium mt-0.5">
                  Punjab & Haryana High Court • Allahabad High Court • Rajasthan High Court • Supreme Court
                </p>
              </div>
            </div>

            {/* RIGHT: Live Client-AI Dialogue Preview & Interactive Case Input (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Header Title */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Interactive Legal Advisory • {currentSample.label}</span>
                </div>
                <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
                  Let's Discuss Your Case
                </h2>
                <p className="text-sm sm:text-base font-serif text-amber-300 font-semibold mt-1">
                  सीधा केस बताइए — अपने क्षेत्रीय अंदाज में कानूनी उपाय और अदालत की प्रक्रिया जानिए
                </p>
              </div>

              {/* LIVE SIMULATED CONVERSATION PREVIEW (Client <-> AI Vakil) */}
              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-700/80 space-y-3 shadow-inner">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                  <span className="flex items-center gap-1 text-amber-400">
                    <Scale className="w-3.5 h-3.5" />
                    <span>Live Dialogue Preview ({currentSample.label}):</span>
                  </span>
                  <span className="text-emerald-400 font-mono">Real-time Legal Assessment</span>
                </div>

                {/* 1. Client Bubble */}
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center shrink-0">
                    <User className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <div className="bg-slate-800/90 text-white rounded-2xl rounded-tl-sm px-3.5 py-2.5 text-xs shadow-sm max-w-[90%] leading-relaxed border border-slate-700">
                    <strong className="text-[10px] text-amber-400 block mb-0.5">क्लाइंट (Client Inquiring):</strong>
                    "{currentSample.clientQuestion}"
                  </div>
                </div>

                {/* 2. AI Advocate Response Bubble */}
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-amber-500 border border-white flex items-center justify-center shrink-0">
                    <Scale className="w-3.5 h-3.5 text-[#0B1325]" />
                  </div>
                  <div className="bg-amber-500/10 text-slate-200 rounded-2xl rounded-tl-sm px-3.5 py-2.5 text-xs shadow-sm max-w-[90%] leading-relaxed border border-amber-500/30">
                    <strong className="text-[10px] text-amber-300 block mb-0.5">AI Senior Advocate (Punia Associates):</strong>
                    {currentSample.advocateAnswer}
                  </div>
                </div>
              </div>

              {/* Direct Interactive Case Input Box */}
              <div className="bg-slate-950 p-2 sm:p-2.5 rounded-2xl border-2 border-amber-500/60 shadow-lg">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={caseQuery}
                    onChange={(e) => setCaseQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        triggerChat();
                      }
                    }}
                    placeholder={currentSample.placeholder}
                    className="flex-1 bg-transparent px-3 py-2 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none"
                  />

                  <button
                    onClick={() => triggerChat()}
                    className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#0B1325] text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center gap-2 shadow-lg cursor-pointer shrink-0"
                  >
                    <span>Discuss Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Quick Topic Chips for current dialect */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-slate-400 font-medium mr-1">त्वरित विषय:</span>
                {currentSample.quickChips.map((chip, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickTopic(chip)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-amber-500/20 text-slate-200 hover:text-amber-300 border border-slate-700 hover:border-amber-400/50 text-xs font-medium transition-all shadow-sm cursor-pointer"
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* Bottom Action Bar */}
              <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>100% Confidential</span>
                  </span>
                  <span>•</span>
                  <span className="text-amber-400">Live Indian Legal Search</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      window.dispatchEvent(new CustomEvent('open-ai-legal-chat', {
                        detail: { startCall: true, language: selectedDialect }
                      }));
                    }}
                    className="inline-flex items-center gap-1.5 text-amber-300 hover:text-white font-bold cursor-pointer"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                    <span>Phone Voice Call ({currentSample.label})</span>
                  </button>

                  <a
                    href={`tel:${FIRM_INFO.helplinePhone}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg border border-slate-700"
                  >
                    <Phone className="w-3 h-3 text-emerald-400" />
                    <span>{FIRM_INFO.helplinePhone}</span>
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

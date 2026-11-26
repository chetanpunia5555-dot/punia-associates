import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Phone, 
  MessageCircle, 
  ShieldCheck, 
  Clock, 
  Scale, 
  CheckCheck, 
  Sparkles,
  Minimize2,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  PhoneCall,
  Globe,
  ExternalLink,
  Square,
  Play
} from 'lucide-react';
import { FIRM_INFO } from '../data/legalData';

interface Source {
  title: string;
  uri: string;
}

interface Message {
  id: string;
  sender: 'firm' | 'user';
  text: string;
  time: string;
  sources?: Source[];
  options?: string[];
}

interface LiveChatWidgetProps {
  onOpenConsultation?: (category?: string, state?: string) => void;
}

export const LiveChatWidget: React.FC<LiveChatWidgetProps> = ({ onOpenConsultation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [leadPhone, setLeadPhone] = useState('');
  const [leadState, setLeadState] = useState('Haryana');
  const [isLeadSubmitted, setIsLeadSubmitted] = useState(false);

  // Audio Voice & Phone Features (Web Speech API)
  const [isVoiceCallActive, setIsVoiceCallActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);
  const [voicePlaybackEnabled, setVoicePlaybackEnabled] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState<'auto' | 'hi' | 'en' | 'haryanvi' | 'punjabi' | 'rajasthani'>('auto');
  const [callDuration, setCallDuration] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const initialWelcomeText = 'नमस्ते! Welcome to Punia Associates Chambers Legal Helpdesk. आप अपनी कानूनी समस्या हिंदी, हरियाणवी, ਪੰਜਾਬੀ, राजस्थानी या English में पूछ सकते हैं।\n\n(Ask your legal question in Hindi, Haryanvi, Punjabi, Rajasthani, or English!)';

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-welcome',
      sender: 'firm',
      text: initialWelcomeText,
      time: 'Just now',
      options: [
        '🚨 FIR हो गई है / गिरफ्तारी से अग्रिम जमानत (Bail)',
        '🏡 जमीन / प्लॉट पर अवैध कब्जा या बंटवारा (Property)',
        '📜 चेक बाउंस 15-दिन का नोटिस (Section 138 NI Act)',
        '💍 आपसी सहमति तलाक व भरण-पोषण (Matrimonial)',
        '📞 वकील साहब से सीधी बात करें'
      ]
    }
  ]);

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      scrollToBottom();
    }
  }, [isOpen, messages, isTyping]);

  // Listen to open-ai-legal-chat event from AIVakilBanner or other buttons
  useEffect(() => {
    const handleOpenChatEvent = (e: any) => {
      const detail = e.detail || {};
      setIsOpen(true);
      setUnreadCount(0);

      if (detail.language) {
        setSelectedLanguage(detail.language);
      }

      if (detail.startCall) {
        setIsVoiceCallActive(true);
      }

      if (detail.query && typeof detail.query === 'string' && detail.query.trim()) {
        submitLegalQuery(detail.query.trim());
      }
    };

    window.addEventListener('open-ai-legal-chat', handleOpenChatEvent);
    return () => {
      window.removeEventListener('open-ai-legal-chat', handleOpenChatEvent);
    };
  }, []);

  // Call duration timer
  useEffect(() => {
    let timer: any;
    if (isVoiceCallActive) {
      timer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(timer);
  }, [isVoiceCallActive]);

  // Speech Recognition Setup (Web Speech API - Speech-to-Text)
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      
      if (selectedLanguage === 'punjabi') {
        recognition.lang = 'pa-IN';
      } else if (selectedLanguage === 'en') {
        recognition.lang = 'en-IN';
      } else {
        recognition.lang = 'hi-IN';
      }

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setInputValue(transcript);

        if (event.results[0].isFinal) {
          setIsListening(false);
          submitLegalQuery(transcript);
        }
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [selectedLanguage]);

  // Text-To-Speech (Web Speech API - Audible Speech Synthesis)
  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setSpeakingMsgId(null);
    }
  };

  const speakText = (text: string, msgId?: string) => {
    if (!voicePlaybackEnabled || !('speechSynthesis' in window)) return;

    // If currently speaking this message, toggle stop
    if (isSpeaking && speakingMsgId === msgId) {
      stopSpeaking();
      return;
    }

    window.speechSynthesis.cancel(); // Stop ongoing speech

    // Clean text: strip markdown headers, bullets, and URLs for clean audible voice output
    const cleanText = text
      .replace(/[#*_`]/g, '')
      .replace(/\(https?:\/\/[^\)]+\)/g, '')
      .replace(/\[([^\]]+)\]/g, '$1')
      .slice(0, 450); // Read the primary assessment and initial steps clearly

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.96;
    utterance.pitch = 1.0;

    // Detect language: check for Gurmukhi (Punjabi), Devanagari, or regional selection
    const hasGurmukhi = /[\u0A00-\u0A7F]/.test(text);
    const hasDevanagari = /[\u0900-\u097F]/.test(text);
    const voices = window.speechSynthesis.getVoices();

    if (selectedLanguage === 'punjabi' || hasGurmukhi) {
      const punjabiVoice = voices.find(v => v.lang.includes('pa') || v.name.toLowerCase().includes('punjabi'));
      if (punjabiVoice) utterance.voice = punjabiVoice;
      utterance.lang = 'pa-IN';
    } else if (hasDevanagari || selectedLanguage === 'hi' || selectedLanguage === 'haryanvi' || selectedLanguage === 'rajasthani') {
      const hindiVoice = voices.find(v => v.lang.includes('hi') || v.name.toLowerCase().includes('hindi'));
      if (hindiVoice) utterance.voice = hindiVoice;
      utterance.lang = 'hi-IN';
    } else {
      const englishVoice = voices.find(v => v.lang.includes('en-IN') || v.name.toLowerCase().includes('india') || v.lang.includes('en-GB') || v.lang.includes('en-US'));
      if (englishVoice) utterance.voice = englishVoice;
      utterance.lang = 'en-IN';
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      if (msgId) setSpeakingMsgId(msgId);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setSpeakingMsgId(null);

      // If in continuous phone call mode, automatically listen after speaking
      if (isVoiceCallActive && recognitionRef.current) {
        setTimeout(() => {
          try {
            recognitionRef.current.start();
            setIsListening(true);
          } catch {
            // ignore if already active
          }
        }, 500);
      }
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setSpeakingMsgId(null);
    };

    window.speechSynthesis.speak(utterance);
  };

  const toggleMicListening = () => {
    if (!recognitionRef.current) {
      alert("Voice input is supported in Google Chrome, Microsoft Edge, and Android browsers. Please ensure microphone permissions are granted.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      stopSpeaking();
      setIsListening(true);
      recognitionRef.current.lang = selectedLanguage === 'hi' ? 'hi-IN' : 'en-IN';
      try {
        recognitionRef.current.start();
      } catch {
        setIsListening(false);
      }
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    setUnreadCount(0);
  };

  // Submit legal query to backend with Google Search Grounding & Multi-Model reasoning
  const submitLegalQuery = async (queryText: string) => {
    if (!queryText.trim()) return;

    stopSpeaking();

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: queryText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const response = await fetch('/api/legal-ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: queryText,
          history: messages.slice(-5),
          language: selectedLanguage
        })
      });

      if (!response.ok) {
        throw new Error('Server response not ok');
      }

      const data = await response.json();
      const reply = data.reply || 'क्षमा करें, कानूनी जानकारी प्राप्त करने में तकनीकी समस्या आई। आप सीधे हेल्पलाइन +91 90532 81218 पर कॉल कर सकते हैं।';
      const firmMsgId = `firm-${Date.now()}`;

      const firmMsg: Message = {
        id: firmMsgId,
        sender: 'firm',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: data.sources || []
      };

      setMessages((prev) => [...prev, firmMsg]);
      setIsTyping(false);

      // Speak answer audibly if voice playback is enabled
      speakText(reply, firmMsgId);
    } catch (err) {
      console.error('AI chat error:', err);
      setIsTyping(false);

      const fallbackReply = selectedLanguage === 'en'
        ? `We have noted your legal matter. For immediate court relief and advocate defense across Haryana, UP, Rajasthan, and Delhi NCR:\n\n1. Preserve all summons, notices, and relevant records.\n2. Call our senior advocate helpline directly at +91 90532 81218 for immediate legal guidance.`
        : `आपकी कानूनी स्थिति का संज्ञान ले लिया गया है। तत्काल कानूनी राहत व जमानत के लिए:\n\n1. संबंधित कागजात (FIR, नोटिस, या इंतकाल) सुरक्षित रखें।\n2. तुरंत हमारे सीनियर एडवोकेट हेल्पलाइन नंबर +91 90532 81218 पर कॉल करें।`;

      const firmMsgId = `firm-${Date.now()}`;
      setMessages((prev) => [
        ...prev,
        {
          id: firmMsgId,
          sender: 'firm',
          text: fallbackReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);

      speakText(fallbackReply, firmMsgId);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const text = inputValue;
    setInputValue('');
    submitLegalQuery(text);
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadPhone.trim()) return;

    setIsLeadSubmitted(true);
    const callbackAck = selectedLanguage === 'en'
      ? `Thank you. Your phone number ${leadPhone} (${leadState}) has been forwarded to our Senior Advocate Desk. Our team will contact you shortly.\n\nFor urgent matters, call +91 90532 81218.`
      : `धन्यवाद! आपका नंबर ${leadPhone} (${leadState}) हमारे सीनियर एडवोकेट डेस्क पर दर्ज कर लिया गया है। हमारे वकील जल्द ही आपसे संपर्क करेंगे।\n\nतत्काल सहायता के लिए आप +91 90532 81218 पर कॉल कर सकते हैं।`;

    const ackId = `firm-ack-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      {
        id: `user-phone-${Date.now()}`,
        sender: 'user',
        text: `Callback Request: ${leadPhone} (${leadState})`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      },
      {
        id: ackId,
        sender: 'firm',
        text: callbackAck,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);

    speakText(callbackAck, ackId);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent("Namaste Punia Associates, I need urgent legal assistance through your AI Legal Live Chat.");
    window.open(`https://wa.me/${FIRM_INFO.whatsappNumber.replace('+', '')}?text=${text}`, '_blank');
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 font-sans">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          aria-label="Open AI Legal Live Chat"
          className="relative group bg-[#0B1325] hover:bg-[#152244] text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl border border-amber-500/50 flex items-center gap-3 transition-all duration-300 hover:scale-105 cursor-pointer"
        >
          <div className="relative flex items-center justify-center">
            <Scale className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#0B1325] animate-pulse" />
          </div>

          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-bold text-white tracking-wide flex items-center gap-1.5">
              <span>AI Legal Desk (हिंदी / English)</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </span>
            <span className="text-[10px] text-amber-300 font-mono">
              Voice & Live Legal Search
            </span>
          </div>

          {unreadCount > 0 && (
            <span className="absolute -top-1.5 -left-1.5 bg-amber-500 text-[#0B1325] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow">
              {unreadCount}
            </span>
          )}
        </button>
      )}

      {/* Expanded Live AI Chat Window */}
      {isOpen && (
        <div className="w-[94vw] sm:w-[420px] md:w-[450px] h-[610px] max-h-[88vh] bg-white rounded-2xl shadow-2xl border border-slate-300 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Simulated Audio Phone Call Overlay */}
          {isVoiceCallActive && (
            <div className="absolute inset-0 bg-[#0B1325] z-50 flex flex-col justify-between p-6 text-white text-center animate-in fade-in duration-200">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live Voice Consultation (बोलकर बात करें)
                </span>
                <span className="font-mono text-amber-400 font-bold">{formatTimer(callDuration)}</span>
              </div>

              <div className="my-auto space-y-4">
                <div className="relative w-28 h-28 mx-auto">
                  <div className={`absolute -inset-2 rounded-full bg-amber-500/20 ${isSpeaking || isListening ? 'animate-ping' : ''}`} />
                  <img
                    src="/ai-vakil.svg"
                    alt="AI Advocate"
                    className="relative w-28 h-28 rounded-full object-cover border-2 border-amber-400 shadow-2xl"
                  />
                  {isSpeaking && (
                    <span className="absolute -bottom-1 -right-1 bg-amber-500 text-[#0B1325] p-1.5 rounded-full shadow border border-white">
                      <Volume2 className="w-4 h-4 animate-bounce" />
                    </span>
                  )}
                </div>

                <div>
                  <h4 className="font-cormorant text-2xl font-bold text-white">
                    Punia Associates AI Legal Desk
                  </h4>
                  <p className="text-xs text-slate-300 mt-1">
                    {isListening ? (
                      <span className="text-emerald-400 font-semibold animate-pulse">
                        🎙️ Listening to you... (बोलिए, हम सुन रहे हैं)
                      </span>
                    ) : isSpeaking ? (
                      <span className="text-amber-300 font-semibold">
                        🔊 Advocate is speaking... (सुनिए)
                      </span>
                    ) : (
                      <span>Tap mic to speak your case in Hindi or English</span>
                    )}
                  </p>
                </div>

                {/* Animated Audio Waveform */}
                <div className="flex items-center justify-center gap-1.5 py-3 h-12">
                  {[35, 70, 45, 95, 60, 85, 40, 75, 90, 50].map((h, i) => (
                    <span 
                      key={i} 
                      style={{ 
                        height: isSpeaking || isListening ? `${h}%` : '20%',
                        transition: 'height 0.2s ease-in-out'
                      }} 
                      className={`w-1.5 rounded-full ${isSpeaking ? 'bg-amber-400 animate-pulse' : isListening ? 'bg-emerald-400 animate-pulse' : 'bg-slate-700'}`}
                    />
                  ))}
                </div>

                {/* Live Transcript / Subtitle in Voice Call */}
                <div className="text-xs text-slate-300 bg-slate-900/90 p-3 rounded-xl border border-slate-800 max-h-24 overflow-y-auto">
                  {inputValue ? (
                    <span className="text-white italic">"{inputValue}"</span>
                  ) : isSpeaking ? (
                    <span className="text-amber-200">Speaking legal counsel aloud via Web Speech API...</span>
                  ) : (
                    <span className="text-slate-400">Press the green button to speak your case...</span>
                  )}
                </div>
              </div>

              {/* Call Controls */}
              <div className="flex items-center justify-center gap-6 pt-4 border-t border-slate-800">
                {/* Voice Input Mic */}
                <button
                  onClick={toggleMicListening}
                  className={`w-13 h-13 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                    isListening 
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/50 scale-110' 
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                  }`}
                  title={isListening ? 'Stop Listening' : 'Speak Now'}
                >
                  <Mic className="w-5 h-5" />
                </button>

                {/* Stop Speech / Audio */}
                {isSpeaking && (
                  <button
                    onClick={stopSpeaking}
                    className="w-11 h-11 rounded-full bg-slate-800 hover:bg-slate-700 text-amber-400 flex items-center justify-center shadow cursor-pointer"
                    title="Stop Audio"
                  >
                    <Square className="w-4 h-4 fill-amber-400" />
                  </button>
                )}

                {/* End Voice Call */}
                <button
                  onClick={() => {
                    stopSpeaking();
                    if (isListening && recognitionRef.current) recognitionRef.current.stop();
                    setIsVoiceCallActive(false);
                  }}
                  className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-lg cursor-pointer transition-transform hover:scale-105"
                  title="End Audio Call"
                >
                  <PhoneCall className="w-6 h-6 rotate-[135deg]" />
                </button>

                {/* Real Advocate Call */}
                <a
                  href={`tel:${FIRM_INFO.helplinePhone}`}
                  className="w-12 h-12 rounded-full bg-amber-500 hover:bg-amber-400 text-[#0B1325] flex items-center justify-center shadow cursor-pointer transition-transform hover:scale-105"
                  title="Dial Real Advocate Helpline"
                >
                  <Phone className="w-5 h-5" />
                </a>
              </div>
            </div>
          )}

          {/* Header */}
          <div className="bg-[#0B1325] text-white p-3.5 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <img
                  src="/ai-vakil.svg"
                  alt="AI Advocate"
                  className="w-9 h-9 rounded-full object-cover border border-amber-500/60 shadow"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#0B1325]" />
              </div>

              <div>
                <h3 className="font-cinzel text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                  <span>Punia Associates AI Legal Desk</span>
                </h3>
                <div className="flex items-center gap-2 text-[10px] text-slate-300">
                  <span className="text-emerald-400 font-medium flex items-center gap-1">
                    <Globe className="w-3 h-3 text-emerald-400" />
                    Bilingual Voice AI • Live Web Search
                  </span>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-1 text-slate-400">
              {/* Phone Voice Call Simulator Button */}
              <button
                onClick={() => setIsVoiceCallActive(true)}
                className="p-1.5 bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 rounded-lg transition-colors cursor-pointer flex items-center gap-1 text-[11px] font-bold"
                title="Phone Audio Call with AI"
              >
                <Phone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Voice Call</span>
              </button>

              {/* TTS Speaker Toggle */}
              <button
                onClick={() => {
                  if (voicePlaybackEnabled) {
                    stopSpeaking();
                    setVoicePlaybackEnabled(false);
                  } else {
                    setVoicePlaybackEnabled(true);
                  }
                }}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  voicePlaybackEnabled ? 'text-amber-400 hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-800'
                }`}
                title={voicePlaybackEnabled ? 'Mute AI Voice' : 'Enable AI Voice'}
              >
                {voicePlaybackEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                onClick={() => {
                  stopSpeaking();
                  setIsOpen(false);
                }}
                className="p-1.5 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Sub-Bar: Direct Helpline & Regional Dialect Chips */}
          <div className="bg-amber-500/10 border-b border-amber-500/20 px-3 py-1.5 flex flex-wrap items-center justify-between gap-1 text-[11px] text-[#0B1325]">
            <div className="flex flex-wrap items-center gap-1">
              <span className="font-semibold text-slate-700 text-[10px]">Dialect:</span>
              <button
                onClick={() => {
                  setSelectedLanguage('auto');
                  if (recognitionRef.current) recognitionRef.current.lang = 'hi-IN';
                }}
                className={`px-1.5 py-0.5 rounded text-[10px] font-medium cursor-pointer transition-colors ${selectedLanguage === 'auto' ? 'bg-[#0B1325] text-amber-400 font-bold' : 'text-slate-600 hover:bg-white'}`}
              >
                Auto
              </button>
              <button
                onClick={() => {
                  setSelectedLanguage('haryanvi');
                  if (recognitionRef.current) recognitionRef.current.lang = 'hi-IN';
                }}
                className={`px-1.5 py-0.5 rounded text-[10px] font-medium cursor-pointer transition-colors ${selectedLanguage === 'haryanvi' ? 'bg-[#0B1325] text-amber-400 font-bold' : 'text-slate-600 hover:bg-white'}`}
              >
                हरियाणवी
              </button>
              <button
                onClick={() => {
                  setSelectedLanguage('punjabi');
                  if (recognitionRef.current) recognitionRef.current.lang = 'pa-IN';
                }}
                className={`px-1.5 py-0.5 rounded text-[10px] font-medium cursor-pointer transition-colors ${selectedLanguage === 'punjabi' ? 'bg-[#0B1325] text-amber-400 font-bold' : 'text-slate-600 hover:bg-white'}`}
              >
                ਪੰਜਾਬੀ
              </button>
              <button
                onClick={() => {
                  setSelectedLanguage('rajasthani');
                  if (recognitionRef.current) recognitionRef.current.lang = 'hi-IN';
                }}
                className={`px-1.5 py-0.5 rounded text-[10px] font-medium cursor-pointer transition-colors ${selectedLanguage === 'rajasthani' ? 'bg-[#0B1325] text-amber-400 font-bold' : 'text-slate-600 hover:bg-white'}`}
              >
                राजस्थानी
              </button>
              <button
                onClick={() => {
                  setSelectedLanguage('hi');
                  if (recognitionRef.current) recognitionRef.current.lang = 'hi-IN';
                }}
                className={`px-1.5 py-0.5 rounded text-[10px] font-medium cursor-pointer transition-colors ${selectedLanguage === 'hi' ? 'bg-[#0B1325] text-amber-400 font-bold' : 'text-slate-600 hover:bg-white'}`}
              >
                हिंदी
              </button>
              <button
                onClick={() => {
                  setSelectedLanguage('en');
                  if (recognitionRef.current) recognitionRef.current.lang = 'en-IN';
                }}
                className={`px-1.5 py-0.5 rounded text-[10px] font-medium cursor-pointer transition-colors ${selectedLanguage === 'en' ? 'bg-[#0B1325] text-amber-400 font-bold' : 'text-slate-600 hover:bg-white'}`}
              >
                Eng
              </button>
            </div>

            <a 
              href={`tel:${FIRM_INFO.helplinePhone}`} 
              className="text-amber-800 font-bold hover:underline flex items-center gap-1 text-[10px] shrink-0"
            >
              <Phone className="w-3 h-3 text-amber-600" />
              <span>{FIRM_INFO.helplinePhone}</span>
            </a>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3.5 bg-slate-50 text-xs">
            {messages.map((msg) => {
              const isFirm = msg.sender === 'firm';
              const isThisSpeaking = isSpeaking && speakingMsgId === msg.id;

              return (
                <div key={msg.id} className={`flex flex-col ${isFirm ? 'items-start' : 'items-end'}`}>
                  <div
                    className={`max-w-[90%] rounded-2xl p-3 shadow-sm leading-relaxed ${
                      isFirm
                        ? 'bg-white text-slate-800 border border-slate-200 rounded-tl-sm'
                        : 'bg-[#0B1325] text-white rounded-tr-sm'
                    }`}
                  >
                    {isFirm && (
                      <div className="text-[10px] font-bold text-amber-600 mb-1.5 flex items-center justify-between">
                        <span className="flex items-center gap-1">
                          <Scale className="w-3 h-3" />
                          <span>Punia Associates AI Legal Desk</span>
                        </span>
                        
                        {/* Audible Play/Stop Button for each response */}
                        <button
                          onClick={() => speakText(msg.text, msg.id)}
                          className={`flex items-center gap-1 px-1.5 py-0.5 rounded cursor-pointer transition-all ${
                            isThisSpeaking 
                              ? 'bg-amber-100 text-amber-800 font-bold' 
                              : 'text-slate-400 hover:text-amber-800 hover:bg-slate-100'
                          }`}
                          title={isThisSpeaking ? "Stop Audible Voice" : "Listen in Audible Voice"}
                        >
                          {isThisSpeaking ? (
                            <>
                              <Square className="w-3 h-3 fill-amber-700" />
                              <span className="text-[9px]">Stop</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3 h-3" />
                              <span className="text-[9px]">Listen</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}

                    <div className="whitespace-pre-line text-xs font-normal">
                      {msg.text}
                    </div>

                    {/* Google Search Grounding Sources */}
                    {isFirm && msg.sources && msg.sources.length > 0 && (
                      <div className="mt-2.5 pt-2 border-t border-slate-100">
                        <div className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1 mb-1">
                          <Globe className="w-3 h-3 text-emerald-600" />
                          <span>Live Legal Web & Court Sources:</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          {msg.sources.map((s, idx) => (
                            <a
                              key={idx}
                              href={s.uri}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[11px] text-amber-700 hover:underline flex items-center gap-1 truncate"
                            >
                              <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                              <span className="truncate">{s.title}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className={`text-[10px] mt-1.5 flex items-center justify-end gap-1 ${isFirm ? 'text-slate-400' : 'text-slate-300'}`}>
                      <span>{msg.time}</span>
                      {!isFirm && <CheckCheck className="w-3 h-3 text-amber-400" />}
                    </div>
                  </div>

                  {/* Interactive Quick Option Chips */}
                  {isFirm && msg.options && (
                    <div className="mt-2 flex flex-wrap gap-1.5 max-w-[92%]">
                      {msg.options.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => submitLegalQuery(opt)}
                          className="px-2.5 py-1.5 bg-white hover:bg-amber-50 text-slate-700 hover:text-amber-900 border border-slate-200 hover:border-amber-400 rounded-lg text-[11px] font-medium transition-all shadow-sm text-left cursor-pointer"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-xs py-1">
                <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center">
                  <Scale className="w-3.5 h-3.5 text-slate-600 animate-spin" />
                </div>
                <div className="bg-white px-3 py-2 rounded-2xl border border-slate-200 text-[11px] text-slate-500 shadow-sm flex items-center gap-1.5">
                  <span>Searching Statutes & Court Precedents</span>
                  <span className="flex gap-0.5">
                    <span className="w-1 h-1 bg-amber-500 rounded-full animate-bounce" />
                    <span className="w-1 h-1 bg-amber-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1 h-1 bg-amber-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Advocate Callback Intake Bar */}
          {!isLeadSubmitted && (
            <div className="bg-slate-100/95 border-t border-slate-200 px-3 py-2">
              <form onSubmit={handleLeadSubmit} className="space-y-1">
                <div className="text-[10px] font-bold text-slate-700 flex items-center justify-between">
                  <span>वकील साहब से कॉलबैक पाएं (Request Advocate Callback):</span>
                  <span className="text-emerald-700 font-semibold">Free Initial Appraisal</span>
                </div>
                <div className="flex gap-1.5">
                  <select
                    value={leadState}
                    onChange={(e) => setLeadState(e.target.value)}
                    className="w-20 text-[11px] px-1 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="Haryana">Haryana</option>
                    <option value="UP">UP</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Delhi NCR">Delhi</option>
                  </select>
                  <input
                    type="tel"
                    placeholder="10-digit mobile number"
                    value={leadPhone}
                    onChange={(e) => setLeadPhone(e.target.value)}
                    className="flex-1 text-[11px] px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-[#0B1325] text-xs font-bold rounded-lg transition-colors cursor-pointer shrink-0"
                  >
                    Connect
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Input & Voice Controls */}
          <div className="p-3 bg-white border-t border-slate-200">
            {/* Listening notification indicator */}
            {isListening && (
              <div className="mb-2 px-2.5 py-1 bg-emerald-50 border border-emerald-300 rounded-lg flex items-center justify-between text-xs text-emerald-800 animate-pulse">
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>Listening via Web Speech API ({selectedLanguage === 'hi' ? 'हिंदी' : 'English'})... बोलिए!</span>
                </span>
                <button
                  type="button"
                  onClick={toggleMicListening}
                  className="text-xs font-bold text-red-600 hover:underline cursor-pointer"
                >
                  Stop
                </button>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="flex items-center gap-2">
              {/* Mic Voice Button */}
              <button
                type="button"
                onClick={toggleMicListening}
                className={`p-2 rounded-lg transition-colors cursor-pointer shrink-0 ${
                  isListening 
                    ? 'bg-emerald-500 text-white animate-pulse shadow-md shadow-emerald-500/40' 
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
                title={isListening ? 'Listening (बोलिए...)' : 'Speak via Voice Input (माइक से बोलें)'}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={isListening ? 'सुन रहे हैं, बोलिए...' : 'अपना केस यहाँ लिखें या माइक से बोलें (Type or speak)...'}
                className="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500 text-slate-800 placeholder-slate-400"
              />

              <button
                type="submit"
                disabled={!inputValue.trim()}
                aria-label="Send"
                className="p-2 bg-[#0B1325] hover:bg-slate-800 disabled:opacity-40 text-amber-400 rounded-lg transition-colors cursor-pointer shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            {/* Bottom Action Channels */}
            <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 pt-1">
              <button
                type="button"
                onClick={handleWhatsApp}
                className="text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Helpline</span>
              </button>

              <button
                type="button"
                onClick={() => setIsVoiceCallActive(true)}
                className="text-amber-800 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Phone className="w-3 h-3 text-amber-600" />
                <span>फोन पर बात करें (Voice Call)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  MessageSquare, 
  ArrowRight, 
  Phone, 
  Loader2, 
  RotateCcw,
  ExternalLink
} from 'lucide-react';
import { ChatMessage } from '../types';
import { SITE_CONFIG, getWhatsAppUrl } from '../config/siteConfig';

interface ChatbotProps {
  onOpenQuote: (serviceName?: string) => void;
  onNavigate: (view: string) => void;
  onTrackAction: (actionType: string, description: string) => void;
}

export const Chatbot: React.FC<ChatbotProps> = ({
  onOpenQuote,
  onNavigate,
  onTrackAction
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: "Hello! I am the Sammex Solution AI Assistant. Whether you're exploring WordPress web development, Generative Engine Optimization (GEO), high-converting landing pages, or AI automation with n8n, I'm here to help qualify your project and connect you with founder Animashaun Abdul Salam.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actionSuggestions: [
        { label: 'What is GEO?', action: 'service', payload: 'Can you explain Generative Engine Optimization (GEO) and why my business needs it?' },
        { label: 'WordPress Pricing', action: 'quote', payload: 'What is the typical investment for a custom WordPress website?' },
        { label: 'AI Workflows', action: 'service', payload: 'How can n8n or AI automation save my company time?' },
        { label: 'Chat on WhatsApp', action: 'whatsapp' }
      ]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputMessage;
    if (!query.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputMessage('');
    setLoading(true);
    onTrackAction('chatbot_message', `User sent message to chatbot: ${query.slice(0, 30)}...`);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          conversationHistory: newHistory.slice(-8)
        })
      });

      const data = await res.json();
      const assistantMsg: ChatMessage = {
        id: 'ast-' + Date.now(),
        sender: 'assistant',
        text: data.reply || "Thank you for asking! Sammex Solution specializes in building growth-focused digital platforms. Feel free to request a custom quote or contact founder Animashaun on WhatsApp at +2349167631413.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionSuggestions: data.actionSuggestions || [
          { label: 'Request a Quote', action: 'quote' },
          { label: 'Chat on WhatsApp', action: 'whatsapp' }
        ]
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      const fallbackMsg: ChatMessage = {
        id: 'ast-err-' + Date.now(),
        sender: 'assistant',
        text: "I'd love to help you build or optimize your digital solution. You can request a quote directly or talk directly with Animashaun Abdul Salam on WhatsApp (+2349167631413).",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionSuggestions: [
          { label: 'Request a Quote', action: 'quote' },
          { label: 'Continue on WhatsApp', action: 'whatsapp' }
        ]
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleActionClick = (action: 'quote' | 'whatsapp' | 'service' | 'portfolio', payload?: string) => {
    if (action === 'quote') {
      onOpenQuote(payload);
      setIsOpen(false);
    } else if (action === 'whatsapp') {
      onTrackAction('whatsapp_click', 'Clicked WhatsApp from Chatbot');
      window.open(getWhatsAppUrl(payload || "I've been chatting with your virtual assistant and would like to continue our conversation on WhatsApp."), '_blank', 'noopener,noreferrer');
    } else if (action === 'portfolio') {
      onNavigate('portfolio');
      setIsOpen(false);
    } else if (action === 'service') {
      if (payload) {
        handleSendMessage(payload);
      }
    }
  };

  return (
    <>
      {/* Floating Chat Trigger Button (Fixed left-side or bottom-left to not collide with WhatsApp) */}
      <div id="floating-chatbot-trigger" className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            if (!isOpen) {
              onTrackAction('chatbot_opened', 'Opened Sammex AI Chatbot');
            }
          }}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#0A2A66] hover:bg-black text-white border-2 border-black ring-1 ring-white/30 shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
          aria-label="Open Sammex AI Assistant"
        >
          <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[#0A2A66]">
            <Bot className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-white font-heading tracking-wide hidden sm:inline">
            Ask Sammex AI
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        </button>
      </div>

      {/* Chat Drawer Window */}
      {isOpen && (
        <div 
          id="chatbot-drawer-window"
          className="fixed bottom-22 left-4 sm:left-6 z-50 w-[92vw] sm:w-[380px] md:w-[420px] max-h-[580px] h-[78vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200"
        >
          {/* Chat Header */}
          <div className="bg-[#0A2A66] p-4 text-white flex items-center justify-between border-b border-white/20">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-[#0A2A66] shadow-sm">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold font-heading text-white flex items-center gap-1.5">
                  Sammex AI Consultant
                  <span className="px-1.5 py-0.5 rounded text-[9px] bg-white text-[#0A2A66] font-black uppercase">
                    3.8 Flash
                  </span>
                </h4>
                <p className="text-[10px] text-slate-300">
                  Virtual Advisor • Animashaun Abdul Salam
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setMessages([messages[0]])}
                className="p-1.5 text-slate-300 hover:text-white rounded-md hover:bg-white/10 text-xs"
                title="Reset conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-300 hover:text-white rounded-md hover:bg-white/10"
                aria-label="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Messages Log */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 shadow-sm leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#0A2A66] text-white rounded-br-none'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.text}</p>
                </div>
                <span className="text-[9px] text-slate-400 mt-1 px-1">
                  {m.timestamp}
                </span>

                {/* Interactive Action Suggestion Pills */}
                {m.actionSuggestions && m.actionSuggestions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {m.actionSuggestions.map((act, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleActionClick(act.action, act.payload)}
                        className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#0A2A66] text-white border border-black hover:bg-black shadow-sm transition-all cursor-pointer flex items-center gap-1"
                      >
                        {act.action === 'whatsapp' ? (
                          <Phone className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Sparkles className="w-3 h-3 text-white" />
                        )}
                        <span>{act.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 p-3 bg-white rounded-xl border border-slate-200 w-fit">
                <Loader2 className="w-4 h-4 text-[#0A2A66] animate-spin" />
                <span className="text-[11px] text-slate-500 font-medium">
                  Sammex AI is thinking...
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Lead Qualification Action Row */}
          <div className="bg-slate-100 px-3 py-1.5 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-600">
            <span>Direct contact:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleActionClick('whatsapp')}
                className="text-emerald-700 font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Phone className="w-3 h-3" />
                WhatsApp
              </button>
              <span>•</span>
              <button
                onClick={() => handleActionClick('quote')}
                className="text-[#0A2A66] font-bold hover:underline cursor-pointer"
              >
                Get Quote
              </button>
            </div>
          </div>

          {/* Input Bar */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about WordPress, SEO, GEO, pricing..."
              className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-300 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0A2A66]/30 focus:border-[#0A2A66]"
            />
            <button
              type="submit"
              disabled={loading || !inputMessage.trim()}
              className="p-2 rounded-xl bg-[#0A2A66] hover:bg-black text-white border border-black shadow transition-colors disabled:opacity-40 cursor-pointer"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

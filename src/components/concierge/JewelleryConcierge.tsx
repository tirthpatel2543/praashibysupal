import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, RotateCcw, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'assistant' | 'user';
  text: string;
  options?: string[];
  timestamp: string;
}

type Step =
  | 'WELCOME'
  | 'COLLECT_CATEGORY'
  | 'COLLECT_PRODUCT'
  | 'COLLECT_NAME'
  | 'COLLECT_EMAIL'
  | 'COLLECT_PHONE'
  | 'COLLECT_MESSAGE'
  | 'SUBMITTING'
  | 'COMPLETED';

export const JewelleryConcierge: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [step, setStep] = useState<Step>('WELCOME');
  const [errorMsg, setErrorMsg] = useState('');
  const [enquiryId, setEnquiryId] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    enquiryType: 'Product Enquiry',
    productInterest: '',
    message: '',
  });

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  // Initial Welcome message
  const initChat = () => {
    const welcomeMsg: ChatMessage = {
      id: 'msg-1',
      sender: 'assistant',
      text: "Namaste! Welcome to PraashiBySupal. We're delighted to have you here. How may we assist you today?",
      options: [
        'Product Enquiry',
        'Gold Jewellery',
        'Artificial Jewellery',
        'Order Assistance',
        'Custom Jewellery',
        'Talk to Our Team',
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([welcomeMsg]);
    setStep('COLLECT_CATEGORY');
    setErrorMsg('');
    setEnquiryId('');
    setFormData({
      customerName: '',
      email: '',
      phone: '',
      enquiryType: 'Product Enquiry',
      productInterest: '',
      message: '',
    });
  };

  useEffect(() => {
    initChat();
  }, []);

  const addAssistantMessage = (text: string, options?: string[]) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        text,
        options,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const addUserMessage = (text: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `msg-${Date.now()}`,
        sender: 'user',
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const handleOptionSelect = (option: string) => {
    addUserMessage(option);

    if (step === 'COLLECT_CATEGORY') {
      setFormData((prev) => ({ ...prev, enquiryType: option }));

      if (option === 'Product Enquiry' || option === 'Gold Jewellery' || option === 'Artificial Jewellery') {
        setTimeout(() => {
          addAssistantMessage(
            `Wonderful choice! Are you looking for a specific piece like a necklace, earrings, rings, or bangles?`,
            ['Necklaces & Chokers', 'Earrings & Jhumkas', 'Rings & Bands', 'Bangles & Kadas', 'Bridal Suite']
          );
          setStep('COLLECT_PRODUCT');
        }, 500);
      } else if (option === 'Custom Jewellery') {
        setTimeout(() => {
          addAssistantMessage(
            `We specialize in custom bridal trousseaus and bespoke heirlooms. What kind of jewellery piece would you like us to craft?`
          );
          setStep('COLLECT_PRODUCT');
        }, 500);
      } else if (option === 'Order Assistance') {
        setTimeout(() => {
          addAssistantMessage(`I'll be happy to help with your order. May I know your full name to look up your details?`);
          setStep('COLLECT_NAME');
        }, 500);
      } else {
        setTimeout(() => {
          addAssistantMessage(`Our atelier team would be pleased to speak with you. May I know your full name?`);
          setStep('COLLECT_NAME');
        }, 500);
      }
    } else if (step === 'COLLECT_PRODUCT') {
      setFormData((prev) => ({ ...prev, productInterest: option }));
      setTimeout(() => {
        addAssistantMessage(`Exquisite taste! We would love to assist you personally. May I know your full name?`);
        setStep('COLLECT_NAME');
      }, 500);
    }
  };

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const val = inputVal.trim();
    if (!val) return;

    addUserMessage(val);
    setInputVal('');
    setErrorMsg('');

    if (step === 'COLLECT_CATEGORY') {
      setFormData((prev) => ({ ...prev, enquiryType: val }));
      setTimeout(() => {
        addAssistantMessage(`Thank you. Could you share what specific jewellery piece or design you have in mind?`);
        setStep('COLLECT_PRODUCT');
      }, 500);
    } else if (step === 'COLLECT_PRODUCT') {
      setFormData((prev) => ({ ...prev, productInterest: val }));
      setTimeout(() => {
        addAssistantMessage(`Noted! We would love to guide you through our atelier collection. May I know your full name?`);
        setStep('COLLECT_NAME');
      }, 500);
    } else if (step === 'COLLECT_NAME') {
      if (val.length < 2) {
        setTimeout(() => {
          addAssistantMessage(`Please enter a valid full name (at least 2 letters).`);
        }, 300);
        return;
      }
      setFormData((prev) => ({ ...prev, customerName: val }));
      setTimeout(() => {
        addAssistantMessage(`Pleasure to meet you, ${val}! What is your email address so our concierge can send details?`);
        setStep('COLLECT_EMAIL');
      }, 500);
    } else if (step === 'COLLECT_EMAIL') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(val)) {
        setTimeout(() => {
          addAssistantMessage(`That looks like an invalid email format. Please enter a valid email address (e.g., name@example.com).`);
        }, 300);
        return;
      }
      setFormData((prev) => ({ ...prev, email: val }));
      setTimeout(() => {
        addAssistantMessage(`Thank you! May we also have your mobile / WhatsApp number for faster concierge assistance?`);
        setStep('COLLECT_PHONE');
      }, 500);
    } else if (step === 'COLLECT_PHONE') {
      const phoneDigits = val.replace(/\D/g, '');
      if (phoneDigits.length < 10) {
        setTimeout(() => {
          addAssistantMessage(`Please provide a valid 10-digit mobile number so our team can reach you.`);
        }, 300);
        return;
      }
      setFormData((prev) => ({ ...prev, phone: val }));
      setTimeout(() => {
        addAssistantMessage(`Almost done! Please share any specific preferences, budget, or questions you have for us.`);
        setStep('COLLECT_MESSAGE');
      }, 500);
    } else if (step === 'COLLECT_MESSAGE') {
      const finalMessage = val;
      const updatedData = { ...formData, message: finalMessage };
      setFormData(updatedData);
      setStep('SUBMITTING');

      addAssistantMessage(`Connecting with our atelier database to save your enquiry...`);

      // ACTUAL DATABASE API CALL: POST /api/enquiries
      try {
        const response = await fetch('/api/enquiries', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customerName: updatedData.customerName,
            email: updatedData.email,
            phone: updatedData.phone,
            enquiryType: updatedData.enquiryType,
            productInterest: updatedData.productInterest,
            message: finalMessage,
            source: 'CHATBOT',
          }),
        });

        const resData = await response.json();

        if (response.ok && resData.success) {
          setEnquiryId(resData.enquiry.id);
          setStep('COMPLETED');
          setTimeout(() => {
            addAssistantMessage(
              `Thank you for contacting PraashiBySupal! Your enquiry has been submitted successfully to our atelier database (Ref: ${resData.enquiry.id}). Our team will get back to you shortly.`
            );
          }, 600);
        } else {
          setStep('COLLECT_MESSAGE');
          setErrorMsg(resData.error || 'Database submission failed. Please try again.');
          addAssistantMessage(`We encountered an issue saving your enquiry: ${resData.error || 'Server error'}. Please try submitting your message again.`);
        }
      } catch (err: any) {
        setStep('COLLECT_MESSAGE');
        setErrorMsg('Network error connecting to database.');
        addAssistantMessage(`Network connection error. Please verify the server is running and try again.`);
      }
    }
  };

  const getPlaceholder = () => {
    switch (step) {
      case 'COLLECT_NAME':
        return 'Type your full name...';
      case 'COLLECT_EMAIL':
        return 'Your email address (e.g. name@gmail.com)...';
      case 'COLLECT_PHONE':
        return 'Your 10-digit mobile / WhatsApp number...';
      case 'COLLECT_PRODUCT':
        return 'Which piece are you interested in?';
      case 'COLLECT_MESSAGE':
        return 'Type your message or custom requirements...';
      default:
        return 'Type your response here...';
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans select-none">
      {/* Floating Welcome Bubble */}
      {!isOpen && showBubble && (
        <div className="absolute bottom-20 right-0 mb-1 bg-white text-[#4A252B] py-2 px-3.5 rounded-2xl shadow-xl border border-[#EADBCE] text-xs font-medium whitespace-nowrap animate-bounce flex items-center gap-1.5">
          <Sparkles size={13} className="text-[#C5A059]" />
          <span>How can I help you?</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowBubble(false);
            }}
            className="text-[#806F72] hover:text-[#4A252B] ml-1 p-0.5"
            aria-label="Dismiss message"
          >
            <X size={12} />
          </button>
        </div>
      )}

      {/* Floating Avatar Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            setShowBubble(false);
          }}
          aria-label="Open Praashi Jewellery Concierge"
          className="group relative w-16 h-16 rounded-full shadow-2xl p-0.5 bg-gradient-to-tr from-[#9B4F52] via-[#C5A059] to-[#FAF6F2] hover:scale-108 transition-all duration-300 focus:outline-none"
        >
          {/* Avatar Image of Indian Woman with Namaste */}
          <div className="w-full h-full rounded-full overflow-hidden bg-[#FAF6F2] border-2 border-white relative shadow-inner">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&h=256&q=85"
              alt="Pooja · Praashi Concierge"
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Active Status Badge */}
          <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-[#56775D] border-2 border-white shadow-sm flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          </span>
        </button>
      )}

      {/* Chat Interface Drawer / Modal */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[560px] max-h-[85vh] bg-[#FFFFFF] rounded-2xl shadow-2xl border border-[#EADBCE] flex flex-col overflow-hidden animate-fade-in">
          {/* Concierge Header */}
          <div className="bg-gradient-to-r from-[#4A252B] via-[#5E3239] to-[#3D1E23] p-4 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#C5A059] bg-[#FAF6F2] shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&h=160&q=85"
                  alt="Pooja · Jewellery Concierge"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-serif font-medium text-sm text-[#FAF6F2] leading-tight">
                    Pooja · Jewellery Concierge
                  </h3>
                  <Sparkles size={11} className="text-[#C5A059]" />
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-[#56775D]" />
                  <span className="text-[10px] text-[#DFC1B5] font-light">
                    Online · Praashi Atelier
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 text-[#DFC1B5]">
              <button
                onClick={initChat}
                title="Restart Conversation"
                className="p-1.5 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Restart conversation"
              >
                <RotateCcw size={16} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close Concierge"
                className="p-1.5 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Close concierge"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FAF8F5]">
            {messages.map((msg) => {
              const isAssistant = msg.sender === 'assistant';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isAssistant ? 'items-start' : 'items-end'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed shadow-sm ${
                      isAssistant
                        ? 'bg-white text-[#4A252B] border border-[#EADBCE] rounded-tl-sm'
                        : 'bg-[#4A252B] text-white rounded-tr-sm'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span
                      className={`text-[9px] block text-right mt-1 opacity-60 ${
                        isAssistant ? 'text-[#806F72]' : 'text-[#DFC1B5]'
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>

                  {/* Predefined Clickable Option Pills */}
                  {isAssistant && msg.options && msg.options.length > 0 && step !== 'COMPLETED' && (
                    <div className="flex flex-wrap gap-1.5 mt-2 max-w-[90%]">
                      {msg.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleOptionSelect(opt)}
                          className="px-3 py-1.5 rounded-full bg-white border border-[#E2D2C6] text-[#4A252B] text-[11px] font-medium hover:border-[#9B4F52] hover:bg-[#F9F4EE] hover:text-[#9B4F52] transition-all shadow-sm"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Error Message if DB fails */}
            {errorMsg && (
              <div className="p-2.5 rounded-xl bg-[#FAF0F0] border border-[#E8BDBD] text-[11px] text-[#9B4F52] flex items-center gap-1.5">
                <AlertCircle size={14} className="shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Restart Option on Completion */}
            {step === 'COMPLETED' && (
              <div className="text-center pt-2">
                <button
                  onClick={initChat}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FAF6F2] border border-[#D9C4B5] text-[#4A252B] text-xs font-semibold hover:bg-white transition-all shadow-sm"
                >
                  <RotateCcw size={12} />
                  <span>Start a New Enquiry</span>
                </button>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Chat Input Bar */}
          {step !== 'COMPLETED' && (
            <form onSubmit={handleSend} className="p-3 border-t border-[#EDE1D6] bg-white flex items-center gap-2">
              <input
                id="conciergeInput"
                aria-label="Concierge response input"
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder={getPlaceholder()}
                disabled={step === 'SUBMITTING'}
                className="flex-1 px-3.5 py-2.5 bg-[#FAF7F3] border border-[#E2D2C6] rounded-xl text-xs text-[#4A252B] outline-none focus:border-[#9B4F52] focus:bg-white transition-all"
              />
              <button
                type="submit"
                disabled={!inputVal.trim() || step === 'SUBMITTING'}
                className="w-9 h-9 rounded-xl bg-[#4A252B] text-white flex items-center justify-center hover:bg-[#9B4F52] transition-colors disabled:opacity-40 shrink-0 shadow-sm"
                aria-label="Send message"
              >
                <Send size={15} />
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

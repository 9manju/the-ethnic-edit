import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Bot, User, ArrowRight, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { INITIAL_PRODUCTS } from '../data/products';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  products?: Product[];
  action?: { label: string; query: string };
}

interface AIPersonalShopperProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export default function AIPersonalShopper({
  isOpen,
  onClose,
  onSelectProduct,
  onAddToCart,
}: AIPersonalShopperProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: "Namaste! I am your **Ethnic Edit AI Stylist & Concierge** ✨. \n\nI can help you craft the perfect festive look, recommend the latest gadgets, find handcrafted decor items, or coordinate beautiful accessories. \n\nWhat are you planning for today?",
      products: [],
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const presetPrompts = [
    { label: 'Festive Outfit Advice 🌸', query: 'I am attending a wedding. Suggest a gorgeous royal outfit with accessories.' },
    { label: 'Work from Home Tech 💻', query: 'Recommend a clean noise-canceling setup for remote workspace operations.' },
    { label: 'Traditional Brass Decor 🌟', query: 'How do I style a living room console with handcrafted brass?' },
    { label: 'Budget Festive Gifting 🎁', query: 'Show me premium-grade gifts under $100.' },
  ];

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate smart tailored AI response based on keywords
    setTimeout(() => {
      const query = text.toLowerCase();
      let responseText = '';
      let suggestedProducts: Product[] = [];

      if (query.includes('wedding') || query.includes('festive') || query.includes('ethnic') || query.includes('outfit') || query.includes('anarkali') || query.includes('sherwani') || query.includes('kurta')) {
        responseText = "For festive grandeur, I highly recommend standard luxury silk bases. Pairing royal crimson embroidery with metallic accessories creates an elite classical silhouette. \n\nHere are some exquisite options that I selected for you:";
        suggestedProducts = INITIAL_PRODUCTS.filter(
          (p) => p.id === 'eth-001' || p.id === 'eth-002' || p.id === 'fash-003' || p.id === 'fash-004' || p.id === 'fash-005'
        );
      } else if (query.includes('headphone') || query.includes('ears') || query.includes('noise') || query.includes('tech') || query.includes('music') || query.includes('work') || query.includes('laptop') || query.includes('smart') || query.includes('electronic')) {
        responseText = "A clean high-end workstation thrives on active isolation and long battery performance. The CoreTech ProBook paired with AuraSound Active Hybrid ANC ensures stellar productivity. \n\nCheck out these smart devices:";
        suggestedProducts = INITIAL_PRODUCTS.filter(
          (p) => p.id === 'elec-001' || p.id === 'elec-002' || p.id === 'elec-003'
        );
      } else if (query.includes('brass') || query.includes('decor') || query.includes('home') || query.includes('interior') || query.includes('lifestyle') || query.includes('ceramic') || query.includes('kitchen') || query.includes('tea')) {
        responseText = "Introducing sand-cast solid brass bowls or hand-glazed ceramic tea sets injects immediate visual rhythm and organic textures into kitchen and foyer layouts. \n\nHere is my top pick for premium home and lifestyle accessories:";
        suggestedProducts = INITIAL_PRODUCTS.filter(
          (p) => p.id === 'life-001' || p.id === 'life-002'
        );
      } else if (query.includes('gift') || query.includes('under') || query.includes('budget') || query.includes('low') || query.includes('price')) {
        responseText = "Premium styling doesn't have to break the balance sheet. I have gathered our highest-rated luxury essentials under $150, featuring authentic Kashmiri Saffron serums and vegetable-tanned accessories:";
        suggestedProducts = INITIAL_PRODUCTS.filter(
          (p) => p.price <= 150
        ).slice(0, 3);
      } else if (query.includes('bag') || query.includes('leather') || query.includes('tote') || query.includes('watch') || query.includes('jewelry') || query.includes('pendant') || query.includes('accessory')) {
        responseText = "Timeless leather patinas and authentic Jadau-Meenakari kundan jewelry make for magnificent family heirlooms and accessories. \n\nSelected items for your jewelry drawer:";
        suggestedProducts = INITIAL_PRODUCTS.filter(
          (p) => p.id === 'acc-001' || p.id === 'acc-002' || p.id === 'acc-003'
        );
      } else {
        responseText = `I hear you! Let me browse "The Ethnic Edit" collection for items matching "${text}". Here are the best matches for your style journey:`;
        // general search match
        suggestedProducts = INITIAL_PRODUCTS.filter(
          (p) =>
            p.title.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query) ||
            p.subcategory.toLowerCase().includes(query)
        );
        if (suggestedProducts.length === 0) {
          responseText = "I couldn't find a direct product match, but here are some of our absolute best sellers that are flying off the shelves right now!";
          suggestedProducts = INITIAL_PRODUCTS.filter((p) => p.isBestSeller);
        }
      }

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: responseText,
        products: suggestedProducts,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div id="ai-stylist-backdrop" className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300">
      <div id="ai-stylist-container" className="relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-all duration-300 md:w-112 border-l border-slate-100">
        
        {/* Header */}
        <div id="ai-stylist-header" className="flex items-center justify-between border-b border-slate-100 bg-linear-to-r from-indigo-900 to-indigo-950 p-4 text-white">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 text-indigo-950 shadow-inner">
              <Sparkles className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-sans font-semibold tracking-wide text-white">AI Personal Stylist</h3>
              <p className="font-mono text-xxs text-amber-300">Active &bull; The Ethnic Edit Concierge</p>
            </div>
          </div>
          <button
            id="close-ai-stylist-btn"
            onClick={onClose}
            className="rounded-full p-1.5 text-indigo-200 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages Body */}
        <div id="ai-stylist-body" ref={scrollRef} className="flex-1 overflow-y-auto bg-slate-50 p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="space-y-2">
              <div className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                {msg.sender === 'ai' && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 shadow-xs">
                    <Bot className="h-4 w-4" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-xs leading-relaxed whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-none'
                      : 'bg-white text-slate-800 rounded-bl-none border border-slate-100'
                  }`}
                >
                  {msg.text}
                </div>
                {msg.sender === 'user' && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs shadow-xs">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>

              {/* Product Suggestions Cards */}
              {msg.products && msg.products.length > 0 && (
                <div className="ml-10 grid grid-cols-1 gap-2.5 pt-1">
                  {msg.products.map((p) => (
                    <div
                      key={p.id}
                      id={`ai-product-${p.id}`}
                      className="group flex gap-3 rounded-lg border border-slate-100 bg-white p-2 text-slate-800 shadow-xs transition-all hover:border-indigo-300 hover:shadow-md cursor-pointer"
                      onClick={() => onSelectProduct(p)}
                    >
                      <img
                        src={p.images[0]}
                        alt={p.title}
                        referrerPolicy="no-referrer"
                        className="h-16 w-16 rounded-md object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="font-mono text-xxs font-medium text-indigo-600 uppercase tracking-widest">{p.subcategory}</span>
                        <h4 className="truncate font-sans text-xs font-semibold text-slate-900 group-hover:text-indigo-600">
                          {p.title}
                        </h4>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="font-sans text-xs font-bold text-slate-900">${p.price}</span>
                          <span className="font-sans text-xxs text-slate-400 line-through">${p.originalPrice}</span>
                          <span className="rounded-sm bg-teal-50 px-1 py-0.5 font-mono text-xxs font-bold text-teal-600">
                            {p.discount}% OFF
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between items-end">
                        <span className="font-sans text-xxs text-amber-500 font-bold flex items-center gap-0.5">
                          ★ {p.rating}
                        </span>
                        <button
                          id={`ai-add-to-cart-${p.id}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart(p);
                          }}
                          className="rounded-full bg-slate-50 p-1.5 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600"
                          title="Quick Add"
                        >
                          <ShoppingBag className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100">
                <Bot className="h-4 w-4" />
              </div>
              <div className="rounded-xl rounded-bl-none border border-slate-100 bg-white px-4 py-2 text-sm shadow-xs">
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-indigo-400" style={{ animationDelay: '0ms' }} />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-indigo-400" style={{ animationDelay: '150ms' }} />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-indigo-400" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          {/* Prompt Presets */}
          {messages.length === 1 && (
            <div className="ml-10 pt-2">
              <p className="font-sans text-xxs font-semibold uppercase tracking-wider text-slate-400 mb-2">Try asking me:</p>
              <div className="flex flex-col gap-1.5">
                {presetPrompts.map((p, idx) => (
                  <button
                    key={idx}
                    id={`preset-prompt-${idx}`}
                    onClick={() => handleSend(p.query)}
                    className="flex items-center justify-between rounded-lg border border-slate-100 bg-white px-3 py-2 text-left text-xs text-slate-700 shadow-2xs hover:border-indigo-300 hover:bg-slate-50 group transition-all"
                  >
                    <span>{p.label}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:translate-x-0.5 group-hover:text-indigo-600 transition-transform" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Input Footer */}
        <div id="ai-stylist-input" className="border-t border-slate-100 p-3 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputValue);
            }}
            className="flex gap-2"
          >
            <input
              id="ai-stylist-textbox"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask for outfit coordinates, specs, home tips..."
              className="flex-1 rounded-lg border border-slate-200 px-3.5 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:outline-hidden focus:ring-indigo-500 text-slate-800 font-sans"
            />
            <button
              id="send-ai-stylist-btn"
              type="submit"
              className="flex items-center justify-center rounded-lg bg-indigo-600 px-3 py-2 text-white hover:bg-indigo-700 transition"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
          <div id="ai-disclaimer" className="mt-2 text-center text-[10px] text-slate-400">
            Powered by The Ethnic Edit Personalization Engine
          </div>
        </div>
      </div>
    </div>
  );
}

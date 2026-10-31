import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MessageCircle, HelpCircle } from 'lucide-react';
import { FAQ_DATA } from '../data/faq';
import { openMessenger } from '../config/messenger';

export const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'faq-order-1': true, // Open the first item by default
  });

  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = ['ALL', 'ORDERS', 'PICKUP & DELIVERY', 'PRODUCTS', 'CUSTOM ORDERS'];

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredItems = activeCategory === 'ALL'
    ? FAQ_DATA
    : FAQ_DATA.filter((item) => item.category === activeCategory);

  return (
    <div className="pt-8 md:pt-14 pb-24 px-4 md:px-8 lg:px-12 max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-[0.25em] text-[#B66B4E] font-medium block">
          Guidance & Answers
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#30231D] font-normal tracking-tight">
          FREQUENTLY ASKED QUESTIONS
        </h1>
        <p className="text-sm md:text-base text-[#8A7769] font-light leading-relaxed">
          Everything you need to know about our morning bakes, slow fermentation, Messenger ordering, and event catering.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center justify-center gap-2 flex-wrap border-b border-[#DED3C4] pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer border ${
              activeCategory === cat
                ? 'bg-[#30231D] text-[#FFFEFC] border-[#30231D]'
                : 'bg-[#FFFEFC] text-[#8A7769] border-[#DED3C4] hover:text-[#30231D]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {filteredItems.map((item) => {
          const isOpen = !!openItems[item.id];
          return (
            <div
              key={item.id}
              className="bg-[#FFFEFC] border border-[#DED3C4] transition-colors"
            >
              <button
                type="button"
                onClick={() => toggleItem(item.id)}
                className="w-full p-6 text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
                aria-expanded={isOpen}
              >
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-widest text-[#B66B4E] font-semibold block">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-lg md:text-xl text-[#30231D]">
                    {item.question}
                  </h3>
                </div>
                <div className="p-1 rounded-full text-[#8A7769] shrink-0 mt-1">
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#30231D]" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </div>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-1 text-xs md:text-sm text-[#8A7769] leading-relaxed border-t border-[#DED3C4]/40 animate-in fade-in duration-150">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Direct Help Banner */}
      <div className="bg-[#EAE0D1] border border-[#DED3C4] p-8 text-center space-y-4">
        <HelpCircle className="w-8 h-8 text-[#B66B4E] mx-auto" />
        <div className="space-y-1 max-w-md mx-auto">
          <h3 className="font-serif text-2xl text-[#30231D]">Have a question not listed here?</h3>
          <p className="text-xs text-[#8A7769] leading-relaxed">
            Our bakery team is delighted to assist with ingredient questions, special event dates, or custom orders on Messenger.
          </p>
        </div>
        <div className="pt-2">
          <button
            onClick={() => openMessenger()}
            className="px-6 py-3 bg-[#30231D] hover:bg-[#B66B4E] text-[#FFFEFC] text-xs uppercase tracking-widest font-medium transition-colors cursor-pointer inline-flex items-center gap-2 shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Ask Our Concierge via Messenger</span>
          </button>
        </div>
      </div>
    </div>
  );
};

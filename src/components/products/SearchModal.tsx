import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { Product } from '../../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (slug: string) => void;
  onNavigateToShop: (category?: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onNavigateToShop,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase()) ||
          p.ingredients.some((i) => i.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-[#30231D]/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-[#F6F1E8] text-[#30231D] max-w-2xl w-full border border-[#DED3C4] shadow-2xl overflow-hidden animate-slide-down-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#DED3C4] flex items-center gap-3 bg-[#FFFEFC]">
          <Search className="w-5 h-5 text-[#8A7769] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search croissants, sourdough, calamansi tart, ingredients..."
            className="w-full bg-transparent text-base text-[#30231D] placeholder-[#8A7769] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#8A7769] hover:text-[#30231D] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs uppercase tracking-wider text-[#8A7769] hover:text-[#30231D] px-2 py-1 cursor-pointer font-medium"
          >
            Esc
          </button>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-2">
          {query.trim() === '' ? (
            <div className="py-6 px-2 text-center text-sm text-[#8A7769]">
              <p className="font-serif text-lg text-[#30231D] mb-1">Discover Our Daily Bakes</p>
              <p className="text-xs max-w-md mx-auto mb-4">
                Type a pastry name, loaf type, or ingredient to find morning bake availability.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {['Croissants', 'Sourdough', 'Brioche', 'Cheesecake', 'Financier'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="text-xs px-2.5 py-1 bg-[#EAE0D1] hover:bg-[#DED3C4] text-[#30231D] transition-colors cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-8 text-center text-sm text-[#8A7769]">
              <p className="font-serif text-lg text-[#30231D] mb-1">No baked goods found</p>
              <p className="text-xs max-w-md mx-auto mb-4">
                We couldn&apos;t find anything matching &ldquo;{query}&rdquo;. Looking for a custom creation?
              </p>
              <button
                onClick={() => {
                  onClose();
                  onNavigateToShop();
                }}
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#B66B4E] hover:underline cursor-pointer font-medium"
              >
                <span>Browse Full Bakery Collection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-[#8A7769] px-2 block mb-2 font-medium">
                {filtered.length} {filtered.length === 1 ? 'item found' : 'items found'}
              </span>
              {filtered.map((item: Product) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectProduct(item.slug);
                    onClose();
                  }}
                  className="p-3 bg-[#FFFEFC] hover:bg-[#EAE0D1]/60 border border-[#DED3C4] flex items-center justify-between gap-4 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 object-cover border border-[#DED3C4] shrink-0"
                    />
                    <div>
                      <h4 className="font-serif text-base text-[#30231D]">{item.name}</h4>
                      <p className="text-xs text-[#8A7769]">{item.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-serif text-sm text-[#30231D] tabular-nums">
                      ₱{item.price.toLocaleString()}
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#8A7769]" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

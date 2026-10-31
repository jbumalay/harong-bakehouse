import React, { useState } from 'react';
import { Mail, ArrowRight, Instagram, MessageCircle, MapPin, Phone, Clock, CheckCircle2 } from 'lucide-react';
import { BRAND_CONFIG } from '../../config/brand';
import { CATEGORIES } from '../../data/products';
import { MESSENGER_CONFIG, openMessenger } from '../../config/messenger';

interface FooterProps {
  onNavigate: (route: string, param?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      setError('Please provide a valid email address.');
      return;
    }

    // Client-side simulated integration point
    setSubscribed(true);
    setEmail('');
  };

  const handleCategoryClick = (cat: string) => {
    onNavigate('shop', cat);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#30231D] text-[#EAE0D1] border-t border-[#30231D]">
      {/* Newsletter Section */}
      <div className="border-b border-[#8A7769]/30 px-6 md:px-12 lg:px-16 py-14 bg-[#271B16]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] text-[#B66B4E] font-medium">
              Morning Dispatches
            </span>
            <h3 className="font-serif text-3xl md:text-4xl text-[#FFFEFC] font-normal leading-tight">
              A little sweetness in your inbox.
            </h3>
            <p className="text-[#EAE0D1]/80 text-sm max-w-lg leading-relaxed">
              Receive notifications for seasonal batch releases, holiday pastry pre-orders, and secret weekly sourdough bakes.
            </p>
          </div>

          <div className="lg:col-span-6">
            {subscribed ? (
              <div className="bg-[#30231D] p-5 border border-[#B66B4E]/40 flex items-center gap-3 text-sm text-[#FFFEFC]">
                <CheckCircle2 className="w-5 h-5 text-[#B66B4E] shrink-0" />
                <span>Merci! You are now subscribed to our morning dispatches.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-[#8A7769] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError('');
                      }}
                      placeholder="Enter your email address"
                      className="w-full bg-[#30231D] text-[#FFFEFC] placeholder-[#8A7769] pl-10 pr-4 py-3 text-sm border border-[#8A7769]/40 focus:outline-none focus:border-[#B66B4E] transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#B66B4E] hover:bg-[#a05b40] text-[#FFFEFC] text-xs uppercase tracking-widest font-medium transition-colors cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                {error && <p className="text-xs text-rose-300">{error}</p>}
                <p className="text-[11px] text-[#8A7769]">
                  We treat your inbox with reverence. Unsubscribe at any time with a single click.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <h2 className="font-serif text-3xl tracking-[0.16em] uppercase text-[#FFFEFC]">
              {BRAND_CONFIG.name}
            </h2>
            <p className="font-editorial text-lg text-[#B66B4E]">
              {BRAND_CONFIG.tagline}
            </p>
            <p className="text-sm text-[#EAE0D1]/80 leading-relaxed pr-6">
              An independent artisan bakery dedicated to the craft of slow-fermented breads, delicate laminated viennoiserie, and the simple joy of warm mornings.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={BRAND_CONFIG.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 border border-[#8A7769]/40 flex items-center justify-center text-[#EAE0D1] hover:text-[#FFFEFC] hover:border-[#B66B4E] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <button
                onClick={() => openMessenger()}
                className="w-9 h-9 border border-[#8A7769]/40 flex items-center justify-center text-[#EAE0D1] hover:text-[#FFFEFC] hover:border-[#B66B4E] transition-colors cursor-pointer"
                aria-label="Facebook Messenger"
              >
                <MessageCircle className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#B66B4E] font-medium">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-[#EAE0D1]/80">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#FFFEFC] transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-[#FFFEFC] transition-colors cursor-pointer"
                >
                  Shop Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('our-story')}
                  className="hover:text-[#FFFEFC] transition-colors cursor-pointer"
                >
                  Our Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('custom-orders')}
                  className="hover:text-[#FFFEFC] transition-colors cursor-pointer"
                >
                  Custom Orders
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#FFFEFC] transition-colors cursor-pointer"
                >
                  Contact & Atelier
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-[#FFFEFC] transition-colors cursor-pointer"
                >
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* Collection Categories */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#B66B4E] font-medium">
              Collection
            </h4>
            <ul className="space-y-2 text-sm text-[#EAE0D1]/80">
              {CATEGORIES.slice(1).map((category) => (
                <li key={category}>
                  <button
                    onClick={() => handleCategoryClick(category)}
                    className="hover:text-[#FFFEFC] transition-colors text-left cursor-pointer"
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Bakery Atelier & Hours */}
          <div className="lg:col-span-3 space-y-4 text-sm text-[#EAE0D1]/80">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#B66B4E] font-medium">
              Atelier & Hours
            </h4>
            
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#B66B4E] shrink-0 mt-0.5" />
              <div>
                <p className="text-[#FFFEFC] font-medium">{BRAND_CONFIG.address.street}</p>
                <p>{BRAND_CONFIG.address.neighborhood}, {BRAND_CONFIG.address.region}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Phone className="w-4 h-4 text-[#B66B4E] shrink-0 mt-0.5" />
              <div>
                <p className="text-[#FFFEFC]">{BRAND_CONFIG.phone}</p>
                <p className="text-xs text-[#8A7769]">{BRAND_CONFIG.mobile}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 pt-1">
              <Clock className="w-4 h-4 text-[#B66B4E] shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                {BRAND_CONFIG.hours.map((h, idx) => (
                  <div key={idx}>
                    <span className="text-[#FFFEFC]">{h.days}:</span> {h.time}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Disclaimers & Privacy */}
        <div className="mt-16 pt-8 border-t border-[#8A7769]/30 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#8A7769]">
          <p>© {new Date().getFullYear()} {BRAND_CONFIG.name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigate('privacy-policy')}
              className="hover:text-[#FFFEFC] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <span>{BRAND_CONFIG.disclaimer}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

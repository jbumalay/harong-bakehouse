import React, { useState, useEffect } from 'react';
import { Search, Menu, X, ArrowRight, ShoppingBag } from 'lucide-react';
import { BRAND_CONFIG } from '../../config/brand';
import { useCart } from '../../context/CartContext';

interface NavbarProps {
  currentRoute: string;
  onNavigate: (route: string, param?: string) => void;
  onOpenSearch: () => void;
  isMobileMenuOpen?: boolean;
  onMenuToggle?: (open: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onNavigate,
  onOpenSearch,
  isMobileMenuOpen: externalMenuOpen,
  onMenuToggle,
}) => {
  const [internalMenuOpen, setInternalMenuOpen] = useState(false);
  const isMenuOpen = externalMenuOpen !== undefined ? externalMenuOpen : internalMenuOpen;

  const setMenuOpen = (open: boolean) => {
    if (onMenuToggle) {
      onMenuToggle(open);
    }
    setInternalMenuOpen(open);
  };

  const { totalQuantity, openCart } = useCart();

  const navLinks = [
    { label: 'Home', route: 'home', number: '01' },
    { label: 'Shop Collection', route: 'shop', number: '02' },
    { label: 'Our Story', route: 'our-story', number: '03' },
    { label: 'Custom Orders', route: 'custom-orders', number: '04' },
    { label: 'Contact & Atelier', route: 'contact', number: '05' },
    { label: 'Frequently Asked', route: 'faq', number: '06' },
  ];

  const handleLinkClick = (route: string) => {
    onNavigate(route);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Lock body scroll when navigation sidebar is open & support Escape key
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setMenuOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-40 w-full transition-colors duration-200">
      {/* A. Announcement Strip */}
      <div className="bg-[#30231D] text-[#EAE0D1] text-xs py-1.5 px-4 text-center tracking-widest uppercase font-sans border-b border-[#30231D]">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <span>{BRAND_CONFIG.announcement}</span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="bg-[#F6F1E8]/95 backdrop-blur-md border-b border-[#DED3C4] px-4 md:px-8 lg:px-12 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => handleLinkClick('home')}
            className="text-left group cursor-pointer focus:outline-none"
            aria-label="Harong Bakehouse Home"
          >
            <span className="font-serif text-2xl md:text-3xl tracking-[0.18em] uppercase text-[#30231D] font-normal transition-colors group-hover:text-[#B66B4E]">
              {BRAND_CONFIG.name}
            </span>
          </button>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8 text-sm tracking-wider uppercase font-medium text-[#8A7769]">
            {navLinks.map((item) => {
              const isActive = currentRoute === item.route;
              // Clean simple display label for desktop top bar
              const displayLabel = item.route === 'shop' ? 'Shop' : item.route === 'contact' ? 'Contact' : item.route === 'faq' ? 'FAQ' : item.label;
              return (
                <button
                  key={item.route}
                  onClick={() => handleLinkClick(item.route)}
                  className={`relative py-1 transition-colors whitespace-nowrap shrink-0 hover:text-[#30231D] cursor-pointer ${
                    isActive ? 'text-[#30231D] font-semibold' : ''
                  }`}
                >
                  {displayLabel}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#B66B4E]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions (Search + Minimalist Shopping Bag + Mobile Toggle) */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-[#30231D] hover:text-[#B66B4E] transition-colors cursor-pointer rounded-full hover:bg-[#EAE0D1]/60"
              aria-label="Search pastries and breads"
              title="Search menu"
            >
              <Search className="w-5 h-5 stroke-[1.5]" />
            </button>

            {/* Minimalist Shopping Bag Button with Dynamic Item-Count Badge */}
            <button
              onClick={openCart}
              className="relative p-2 text-[#30231D] hover:text-[#B66B4E] transition-colors cursor-pointer rounded-full hover:bg-[#EAE0D1]/60 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#B66B4E]"
              aria-label={totalQuantity > 0 ? `Shopping bag with ${totalQuantity} items` : 'Shopping bag, empty'}
              title="Bakery Bag"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              {totalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#B66B4E] text-[#FFFEFC] text-[10px] font-semibold w-5 h-5 rounded-full flex items-center justify-center tabular-nums shadow-xs animate-in zoom-in-50 duration-150">
                  {totalQuantity > 99 ? '99+' : totalQuantity}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-[#30231D] hover:text-[#B66B4E] transition-colors cursor-pointer rounded-full hover:bg-[#EAE0D1]/60"
              aria-label="Toggle navigation menu"
            >
              <Menu className="w-6 h-6 stroke-[1.5]" />
            </button>
          </div>
        </div>
      </div>

      {/* Editorial Navigation Sidebar Drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          {/* Dimmed Overlay Backdrop */}
          <div
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 bg-[#30231D]/65 backdrop-blur-sm animate-fade-in"
            aria-hidden="true"
          />

          {/* Slide-out Sidebar Panel */}
          <aside
            className="relative z-10 w-full max-w-[340px] sm:max-w-[380px] bg-[#F6F1E8] text-[#30231D] h-full shadow-2xl flex flex-col justify-between border-l border-[#DED3C4] animate-slide-in-right"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top / Header Area */}
            <div>
              <div className="p-6 border-b border-[#DED3C4] flex items-start justify-between bg-[#EAE0D1]/40">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#B66B4E] font-medium block">
                    Atelier Artisanal · Est. 2019
                  </span>
                  <h2 className="font-serif text-2xl tracking-[0.16em] uppercase text-[#30231D] font-normal">
                    {BRAND_CONFIG.name}
                  </h2>
                  <p className="font-editorial text-sm text-[#8A7769]">
                    {BRAND_CONFIG.tagline}
                  </p>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 text-[#8A7769] hover:text-[#30231D] hover:bg-[#DED3C4]/60 transition-colors cursor-pointer rounded-full -mr-1 -mt-1"
                  aria-label="Close navigation sidebar"
                >
                  <X className="w-5 h-5 stroke-[1.5]" />
                </button>
              </div>

              {/* Editorial Navigation Links */}
              <nav className="p-6 space-y-2">
                {navLinks.map((item) => {
                  const isActive = currentRoute === item.route;
                  return (
                    <button
                      key={item.route}
                      onClick={() => handleLinkClick(item.route)}
                      className={`group w-full text-left py-3.5 px-3 flex items-center justify-between transition-all duration-200 cursor-pointer border-b border-[#DED3C4]/50 ${
                        isActive
                          ? 'text-[#B66B4E] font-medium bg-[#EAE0D1]/30 pl-4'
                          : 'text-[#30231D] hover:text-[#B66B4E] hover:translate-x-1.5'
                      }`}
                    >
                      <div className="flex items-baseline gap-4">
                        <span className="text-[11px] font-mono tracking-widest text-[#8A7769] group-hover:text-[#B66B4E] transition-colors">
                          {item.number}
                        </span>
                        <span className="font-serif text-2xl tracking-wide font-normal">
                          {item.label}
                        </span>
                      </div>
                      <ArrowRight
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isActive
                            ? 'text-[#B66B4E] opacity-100'
                            : 'text-[#8A7769] opacity-40 group-hover:opacity-100 group-hover:translate-x-1'
                        }`}
                      />
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Quiet Editorial Footer */}
            <div className="p-6 border-t border-[#DED3C4] bg-[#EAE0D1]/30 space-y-4">
              <div className="space-y-1.5 text-xs text-[#8A7769] leading-relaxed">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#30231D] font-semibold block">
                  Bakery Atelier
                </span>
                <p className="text-[#30231D] font-medium">{BRAND_CONFIG.address.street}</p>
                <p>{BRAND_CONFIG.address.neighborhood}, {BRAND_CONFIG.address.region}</p>
                <p className="pt-1 text-[#30231D]">Tue – Sun · 7:30 AM – 6:00 PM</p>
              </div>

              <div className="pt-3 border-t border-[#DED3C4]/60 flex items-center justify-between text-xs text-[#8A7769]">
                <a
                  href={BRAND_CONFIG.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#30231D] transition-colors"
                >
                  {BRAND_CONFIG.socials.instagramHandle}
                </a>
                <span>{BRAND_CONFIG.phone}</span>
              </div>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
};

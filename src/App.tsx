/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ToastProvider } from './components/ui/Toast';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { SearchModal } from './components/products/SearchModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { OrderCheckoutModal } from './components/cart/OrderCheckoutModal';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetails } from './pages/ProductDetails';
import { OurStory } from './pages/OurStory';
import { CustomOrders } from './pages/CustomOrders';
import { Contact } from './pages/Contact';
import { FAQ } from './pages/FAQ';
import { PrivacyPolicy } from './pages/PrivacyPolicy';

function AppContent() {
  const { openCart, isCartOpen } = useCart();

  // Navigation State with Hash Support
  const [route, setRoute] = useState<string>('home');
  const [routeParam, setRouteParam] = useState<string | undefined>(undefined);

  // Modals & Navigation Drawers State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sync route with URL hash on mount and hashchange
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (!hash) {
        setRoute('home');
        setRouteParam(undefined);
        return;
      }

      if (hash.startsWith('product/')) {
        const slug = hash.replace('product/', '');
        setRoute('product');
        setRouteParam(slug);
      } else if (hash.startsWith('shop/')) {
        const cat = decodeURIComponent(hash.replace('shop/', ''));
        setRoute('shop');
        setRouteParam(cat);
      } else {
        setRoute(hash);
        setRouteParam(undefined);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (newRoute: string, param?: string) => {
    setRoute(newRoute);
    setRouteParam(param);

    if (newRoute === 'product' && param) {
      window.location.hash = `/product/${param}`;
    } else if (newRoute === 'shop' && param && param !== 'All Products') {
      window.location.hash = `/shop/${encodeURIComponent(param)}`;
    } else if (newRoute === 'home') {
      window.location.hash = '/';
    } else {
      window.location.hash = `/${newRoute}`;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isAnyDrawerOpen =
    isMobileMenuOpen || isCartOpen || isCheckoutOpen || isSearchOpen;

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F1E8] text-[#30231D] selection:bg-[#B66B4E] selection:text-[#FFFEFC]">
      {/* Global Navigation Header with Shopping Bag Indicator */}
      <Navbar
        currentRoute={route}
        onNavigate={(targetRoute, param) => navigate(targetRoute, param)}
        onOpenSearch={() => setIsSearchOpen(true)}
        isMobileMenuOpen={isMobileMenuOpen}
        onMenuToggle={setIsMobileMenuOpen}
      />

      {/* Dynamic Page Views */}
      <main className="flex-1">
        {route === 'home' && (
          <Home
            onNavigate={navigate}
          />
        )}

        {route === 'shop' && (
          <Shop
            initialCategory={routeParam}
            onNavigate={navigate}
          />
        )}

        {route === 'product' && (
          <ProductDetails
            slug={routeParam || 'classic-butter-croissant'}
            onNavigate={navigate}
          />
        )}

        {route === 'our-story' && (
          <OurStory
            onNavigate={navigate}
          />
        )}

        {route === 'custom-orders' && (
          <CustomOrders onNavigate={navigate} />
        )}

        {route === 'contact' && <Contact />}

        {route === 'faq' && <FAQ />}

        {route === 'privacy-policy' && (
          <PrivacyPolicy onNavigate={navigate} />
        )}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={navigate} />

      {/* Slide-out Shopping Cart Drawer */}
      <CartDrawer
        onProceedToOrder={() => setIsCheckoutOpen(true)}
        onNavigateToShop={() => navigate('shop')}
      />

      {/* Multi-Product Order Checkout & Messenger Review Modal */}
      <OrderCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onBackToCart={() => {
          setIsCheckoutOpen(false);
          openCart();
        }}
      />

      {/* Quick Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(slug) => navigate('product', slug)}
        onNavigateToShop={(cat) => navigate('shop', cat)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </ToastProvider>
  );
}

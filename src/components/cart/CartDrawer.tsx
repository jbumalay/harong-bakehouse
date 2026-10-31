import React, { useEffect } from 'react';
import { X, Trash2, ArrowRight, ShoppingBag, Plus, Minus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { CartItem } from '../../types';

interface CartDrawerProps {
  onProceedToOrder: () => void;
  onNavigateToShop: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  onProceedToOrder,
  onNavigateToShop,
}) => {
  const {
    items,
    totalQuantity,
    subtotal,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
  } = useCart();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        closeCart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, closeCart]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Dimmed Overlay Backdrop */}
      <div
        onClick={closeCart}
        className="fixed inset-0 bg-[#30231D]/60 backdrop-blur-sm animate-fade-in"
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <aside
        className="relative z-10 w-full max-w-md sm:max-w-[430px] bg-[#F6F1E8] text-[#30231D] h-full shadow-2xl flex flex-col border-l border-[#DED3C4] animate-slide-in-right"
        role="dialog"
        aria-modal="true"
        aria-label="Bakery Shopping Bag"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#DED3C4] flex items-center justify-between bg-[#EAE0D1]/50">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#B66B4E]" />
            <div>
              <h2 className="font-serif text-xl sm:text-2xl text-[#30231D] tracking-wide font-normal">
                YOUR BAKERY BAG
              </h2>
              <span className="text-[11px] uppercase tracking-wider text-[#8A7769] block font-medium">
                {totalQuantity} {totalQuantity === 1 ? 'item selected' : 'items selected'}
              </span>
            </div>
          </div>
          <button
            onClick={closeCart}
            className="p-2 text-[#8A7769] hover:text-[#30231D] transition-colors cursor-pointer rounded-full hover:bg-[#DED3C4]/50"
            aria-label="Close bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List or Empty State */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {items.length === 0 ? (
            /* Empty Cart State */
            <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#EAE0D1] flex items-center justify-center text-[#B66B4E] mb-2 border border-[#DED3C4]">
                <ShoppingBag className="w-8 h-8 stroke-[1.2]" />
              </div>
              <p className="font-serif text-2xl text-[#30231D] font-normal leading-snug">
                Your bakery bag is waiting for something lovely.
              </p>
              <p className="text-xs text-[#8A7769] max-w-xs leading-relaxed font-light">
                Explore our morning laminated croissants, natural levain breads, and delicate seasonal patisserie.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => {
                    closeCart();
                    onNavigateToShop();
                  }}
                  className="px-6 py-3 bg-[#30231D] hover:bg-[#B66B4E] text-[#FFFEFC] text-xs uppercase tracking-widest font-medium transition-colors cursor-pointer shadow-sm"
                >
                  EXPLORE THE COLLECTION
                </button>
              </div>
            </div>
          ) : (
            /* Itemized Cart List */
            items.map((item: CartItem) => {
              const itemTotal = item.unitPrice * item.quantity;
              return (
                <div
                  key={item.id}
                  className="bg-[#FFFEFC] border border-[#DED3C4] p-3.5 flex gap-3.5 transition-all hover:border-[#8A7769]"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.image}
                    alt={item.productName}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 object-cover bg-[#EAE0D1] border border-[#DED3C4] shrink-0"
                  />

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="font-serif text-base text-[#30231D] truncate leading-tight">
                          {item.productName}
                        </h3>
                        {item.variantName && (
                          <span className="text-[11px] text-[#8A7769] block truncate mt-0.5">
                            {item.variantName}
                          </span>
                        )}
                        <span className="text-xs text-[#8A7769] block mt-1">
                          ₱{item.unitPrice.toLocaleString()} each
                        </span>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#8A7769] hover:text-rose-600 transition-colors p-1 cursor-pointer"
                        title="Remove item"
                        aria-label={`Remove ${item.productName} from bag`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Quantity Stepper & Subtotal */}
                    <div className="flex items-center justify-between pt-2 border-t border-[#DED3C4]/50 mt-2">
                      {/* Stepper */}
                      <div className="flex items-center border border-[#DED3C4] bg-[#F6F1E8]">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 px-2 hover:bg-[#EAE0D1] text-[#30231D] cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-medium tabular-nums min-w-[24px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 px-2 hover:bg-[#EAE0D1] text-[#30231D] cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Item Subtotal */}
                      <span className="font-serif text-sm font-normal text-[#30231D] tabular-nums">
                        ₱{itemTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer & Checkout Action (Only shown when items exist) */}
        {items.length > 0 && (
          <div className="p-5 sm:p-6 border-t border-[#DED3C4] bg-[#FFFEFC] space-y-4">
            {/* Subtotal Calculation */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-[#8A7769]">
                <span className="uppercase tracking-wider">Bag Subtotal</span>
                <span className="font-serif text-xl text-[#30231D] tabular-nums font-normal">
                  ₱{subtotal.toLocaleString()}
                </span>
              </div>
              <p className="text-[11px] text-[#8A7769] leading-tight">
                Delivery and courier fees will be confirmed by our concierge upon Messenger verification.
              </p>
            </div>

            {/* Buttons */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  closeCart();
                  onProceedToOrder();
                }}
                className="w-full py-3.5 px-6 bg-[#30231D] hover:bg-[#B66B4E] text-[#FFFEFC] text-xs uppercase tracking-widest font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>PROCEED TO ORDER</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={closeCart}
                className="w-full py-2.5 text-xs uppercase tracking-wider text-[#8A7769] hover:text-[#30231D] transition-colors cursor-pointer text-center font-medium"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
};

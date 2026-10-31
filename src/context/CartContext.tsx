import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { CartItem, Product, ProductVariant } from '../types';
import { PRODUCTS } from '../data/products';

interface AddToCartOptions {
  product: Product;
  quantity?: number;
  variant?: ProductVariant | null;
}

interface CartContextType {
  items: CartItem[];
  totalQuantity: number;
  subtotal: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (options: AddToCartOptions) => boolean;
  updateQuantity: (itemId: string, newQuantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'maison_miel_cart_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (!stored) return [];
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        // Re-validate against current catalog to ensure prices and active availability
        return parsed
          .filter((item) => item && typeof item.productId === 'string')
          .map((item) => {
            const catalogProduct = PRODUCTS.find((p) => p.id === item.productId);
            if (catalogProduct) {
              const variant = catalogProduct.variants?.find((v) => v.id === item.variantId);
              const priceDelta = variant?.priceDelta || 0;
              return {
                ...item,
                unitPrice: catalogProduct.price + priceDelta,
                productName: catalogProduct.name,
                image: catalogProduct.image,
                category: catalogProduct.category,
              };
            }
            return item;
          });
      }
    } catch (e) {
      console.warn('Could not restore shopping bag from localStorage', e);
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sync to localStorage whenever items change
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [items]);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const toggleCart = useCallback(() => setIsCartOpen((prev) => !prev), []);

  const addToCart = useCallback(
    ({ product, quantity = 1, variant = null }: AddToCartOptions): boolean => {
      if (product.availability === 'sold_out') {
        return false;
      }

      const variantId = variant?.id || null;
      const variantName = variant?.name || null;
      const priceDelta = variant?.priceDelta || 0;
      const unitPrice = product.price + priceDelta;
      const itemId = `${product.id}-${variantId || 'standard'}`;

      setItems((prevItems) => {
        const existingIndex = prevItems.findIndex((item) => item.id === itemId);
        if (existingIndex > -1) {
          const updated = [...prevItems];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + Math.max(1, quantity),
          };
          return updated;
        } else {
          const newItem: CartItem = {
            id: itemId,
            productId: product.id,
            slug: product.slug,
            variantId,
            productName: product.name,
            variantName,
            unitPrice,
            quantity: Math.max(1, quantity),
            image: product.image,
            category: product.category,
          };
          return [...prevItems, newItem];
        }
      });

      return true;
    },
    []
  );

  const updateQuantity = useCallback((itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setItems((prev) => prev.filter((item) => item.id !== itemId));
    } else {
      setItems((prev) =>
        prev.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item))
      );
    }
  }, []);

  const removeFromCart = useCallback((itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalQuantity = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        totalQuantity,
        subtotal,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

import React, { useState } from 'react';
import { ArrowLeft, HelpCircle, ShieldCheck, Clock, Share2, Check, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS, getProductBySlug } from '../data/products';
import { ProductCard } from '../components/products/ProductCard';
import { useToast } from '../components/ui/Toast';
import { useCart } from '../context/CartContext';

interface ProductDetailsProps {
  slug: string;
  onNavigate: (route: string, param?: string) => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({
  slug,
  onNavigate,
}) => {
  const { showToast } = useToast();
  const { addToCart, openCart } = useCart();
  const product = getProductBySlug(slug) || PRODUCTS[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants?.[0]?.name || ''
  );
  const [quantity, setQuantity] = useState(1);
  const [copiedLink, setCopiedLink] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const isSoldOut = product.availability === 'sold_out';

  // Gallery images with primary image as first item
  const gallery = product.gallery && product.gallery.length > 0
    ? product.gallery
    : [product.image];

  const currentVariantObj = product.variants?.find((v) => v.name === selectedVariant);
  const effectiveUnitPrice = product.price + (currentVariantObj?.priceDelta || 0);
  const totalPrice = effectiveUnitPrice * quantity;

  // Related products from the same category
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.slug !== product.slug
  ).slice(0, 3);

  const handleAddToCart = () => {
    if (isSoldOut) return;
    const variantObj = product.variants?.find((v) => v.name === selectedVariant) || null;
    const ok = addToCart({
      product,
      quantity,
      variant: variantObj,
    });
    if (ok) {
      setJustAdded(true);
      showToast({
        title: 'Added to Bakery Bag',
        message: `${quantity} × ${product.name}${selectedVariant ? ` (${selectedVariant})` : ''} added to your bag.`,
        type: 'success',
      });
      setTimeout(() => setJustAdded(false), 2500);
    }
  };

  const handleShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      showToast({
        title: 'Link Copied',
        message: 'Product link copied to clipboard.',
        type: 'info',
      });
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const availabilityBadge: Record<string, string> = {
    in_stock: 'In Stock · Morning Oven Pull',
    preorder_only: 'Pre-order · 24h Advance Notice',
    seasonal: 'Seasonal Release · Limited Quantities',
    sold_out: 'Sold Out Today',
  };

  return (
    <div className="pt-6 md:pt-10 pb-24 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto space-y-16">
      {/* Back button & Breadcrumbs */}
      <div className="flex items-center justify-between border-b border-[#DED3C4] pb-4 text-xs text-[#8A7769]">
        <button
          onClick={() => onNavigate('shop')}
          className="inline-flex items-center gap-1.5 hover:text-[#30231D] transition-colors cursor-pointer uppercase tracking-wider font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Collection</span>
        </button>
        <div className="flex items-center gap-2">
          <span>{product.category}</span>
          <span aria-hidden="true">/</span>
          <span className="text-[#30231D] font-medium">{product.name}</span>
        </div>
      </div>

      {/* Main 2-Column Editorial Purchase Module */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/3] bg-[#EAE0D1] border border-[#DED3C4] overflow-hidden shadow-sm">
            <img
              src={gallery[activeImageIndex] || product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-all duration-300"
            />
            {product.seasonal && (
              <div className="absolute top-4 left-4 bg-[#B66B4E] text-[#FFFEFC] text-[10px] uppercase tracking-widest px-2.5 py-1 font-medium">
                Seasonal Selection
              </div>
            )}
          </div>

          {/* Thumbnail Gallery Row */}
          {gallery.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {gallery.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-20 aspect-square border overflow-hidden transition-all cursor-pointer shrink-0 ${
                    activeImageIndex === idx
                      ? 'border-[#30231D] ring-1 ring-[#30231D]'
                      : 'border-[#DED3C4] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`${product.name} view ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Contiguous Purchase & Details Module */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2 border-b border-[#DED3C4] pb-6">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.2em] text-[#B66B4E] font-medium">
                {product.category}
              </span>
              <button
                onClick={handleShare}
                className="text-[#8A7769] hover:text-[#30231D] text-xs flex items-center gap-1 cursor-pointer"
                title="Share product link"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                <span className="uppercase tracking-wider text-[10px]">{copiedLink ? 'Copied' : 'Share'}</span>
              </button>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl text-[#30231D] font-normal leading-tight">
              {product.name}
            </h1>

            <div className="pt-2 flex items-baseline gap-4">
              <span className="font-serif text-3xl text-[#30231D] font-normal tabular-nums">
                ₱{effectiveUnitPrice.toLocaleString()}
              </span>
              {product.weightOrSize && (
                <span className="text-xs text-[#8A7769] font-sans">
                  Approx. {product.weightOrSize}
                </span>
              )}
            </div>

            <div className="pt-1 text-xs text-[#8A7769]">
              <span>Status: </span>
              <strong className="text-[#30231D] font-medium">
                {availabilityBadge[product.availability]}
              </strong>
            </div>
          </div>

          {/* Detailed Description */}
          <p className="text-sm text-[#8A7769] leading-relaxed font-light">
            {product.detailedDescription}
          </p>

          {/* Variants Selector */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-[#DED3C4]">
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#30231D]">
                Serving Size / Packaging:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v.name)}
                    className={`p-3 text-left border text-xs cursor-pointer transition-colors ${
                      selectedVariant === v.name
                        ? 'border-[#30231D] bg-[#30231D] text-[#FFFEFC]'
                        : 'border-[#DED3C4] bg-[#FFFEFC] text-[#30231D] hover:bg-[#EAE0D1]'
                    }`}
                  >
                    <div className="font-medium">{v.name}</div>
                    {v.priceDelta ? (
                      <div className="text-[11px] opacity-80 mt-0.5">
                        +₱{v.priceDelta.toLocaleString()}
                      </div>
                    ) : null}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector & Live Total */}
          <div className="space-y-2 pt-2 border-t border-[#DED3C4]">
            <div className="flex items-center justify-between">
              <label className="text-xs uppercase tracking-wider font-semibold text-[#30231D]">
                Quantity
              </label>
              <span className="text-xs text-[#8A7769]">
                Estimated Total: <strong className="text-[#30231D] font-serif text-sm">₱{totalPrice.toLocaleString()}</strong>
              </span>
            </div>
            <div className="flex items-center border border-[#DED3C4] bg-[#FFFEFC] w-36">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3.5 py-2 text-base hover:bg-[#EAE0D1] text-[#30231D] cursor-pointer"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="flex-1 text-center text-sm font-medium tabular-nums">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="px-3.5 py-2 text-base hover:bg-[#EAE0D1] text-[#30231D] cursor-pointer"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          {/* Actions: Primary Add to Bag & Secondary Messenger Actions */}
          <div className="space-y-3 pt-4 border-t border-[#DED3C4]">
            {/* Primary Add to Bag Button */}
            <button
              onClick={handleAddToCart}
              disabled={isSoldOut}
              className={`w-full py-4 px-6 text-xs uppercase tracking-widest font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                isSoldOut
                  ? 'bg-neutral-300 text-neutral-600 cursor-not-allowed'
                  : justAdded
                  ? 'bg-emerald-700 text-white'
                  : 'bg-[#30231D] hover:bg-[#B66B4E] text-[#FFFEFC]'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Bakery Bag ({quantity})</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>{isSoldOut ? 'Sold Out Today' : 'Add to Bakery Bag'}</span>
                </>
              )}
            </button>

            {/* Secondary Action: View Bakery Bag */}
            <button
              type="button"
              onClick={() => openCart()}
              className="w-full py-3 px-4 border border-[#30231D] hover:bg-[#EAE0D1] text-[#30231D] text-xs uppercase tracking-widest font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer text-center"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#B66B4E]" />
              <span>View Bakery Bag & Order</span>
            </button>

            <p className="text-[11px] text-[#8A7769] text-center leading-relaxed">
              All morning bakes and artisan items are consolidated in your Bakery Bag to ensure oven-fresh reservation.
            </p>
          </div>

          {/* Product Specifications & Ingredients Accordion-style cards */}
          <div className="pt-4 border-t border-[#DED3C4] space-y-4 text-xs">
            {/* Ingredients */}
            <div className="p-4 bg-[#FFFEFC] border border-[#DED3C4] space-y-2">
              <span className="uppercase tracking-wider font-semibold text-[#30231D] block">
                Pure Ingredients
              </span>
              <p className="text-[#8A7769] leading-relaxed">
                {product.ingredients.join(', ')}
              </p>
              {product.allergens && product.allergens.length > 0 && (
                <div className="pt-1 text-[11px] text-[#B66B4E]">
                  <strong>Contains allergens:</strong> {product.allergens.join(', ')}
                </div>
              )}
            </div>

            {/* Preparation and Storage */}
            {(product.preparationNotes || product.storageRecommendations) && (
              <div className="p-4 bg-[#FFFEFC] border border-[#DED3C4] space-y-2">
                <span className="uppercase tracking-wider font-semibold text-[#30231D] block">
                  Enjoyment & Storage Care
                </span>
                {product.preparationNotes && (
                  <p className="text-[#8A7769] leading-relaxed">
                    <strong>Serving tip:</strong> {product.preparationNotes}
                  </p>
                )}
                {product.storageRecommendations && (
                  <p className="text-[#8A7769] leading-relaxed">
                    <strong>Storage:</strong> {product.storageRecommendations}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="pt-12 border-t border-[#DED3C4] space-y-8">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#B66B4E] font-medium block">
                Complementary Pairings
              </span>
              <h2 className="font-serif text-2xl md:text-3xl text-[#30231D]">
                You might also savor
              </h2>
            </div>
            <button
              onClick={() => onNavigate('shop')}
              className="text-xs uppercase tracking-widest text-[#B66B4E] hover:text-[#30231D] font-medium transition-colors"
            >
              View Full Menu
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relProduct) => (
              <ProductCard
                key={relProduct.id}
                product={relProduct}
                onViewDetails={(relSlug) => onNavigate('product', relSlug)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

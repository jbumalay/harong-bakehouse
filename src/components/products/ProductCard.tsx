import React, { useState } from 'react';
import { Eye, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useToast } from '../ui/Toast';

interface ProductCardProps {
  product: Product;
  onViewDetails: (slug: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewDetails,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const { addToCart } = useCart();
  const { showToast } = useToast();

  const isSoldOut = product.availability === 'sold_out';

  const availabilityLabels: Record<string, string> = {
    in_stock: 'In Stock · Morning Bake',
    preorder_only: 'Pre-order · 24h Notice',
    seasonal: 'Seasonal Table',
    sold_out: 'Sold Out Today',
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSoldOut) return;

    // Use default first variant if available
    const defaultVariant = product.variants?.[0] || null;
    const ok = addToCart({
      product,
      quantity: 1,
      variant: defaultVariant,
    });

    if (ok) {
      setJustAdded(true);
      showToast({
        title: 'Added to Bakery Bag',
        message: `${product.name} was added to your bag.`,
        type: 'success',
      });
      setTimeout(() => setJustAdded(false), 2000);
    }
  };

  return (
    <div className="group flex flex-col bg-[#FFFEFC] border border-[#DED3C4] transition-all duration-300 hover:border-[#8A7769] hover:shadow-lg overflow-hidden">
      {/* Product Image Area */}
      <div 
        className="relative aspect-[4/3] bg-[#EAE0D1] overflow-hidden cursor-pointer"
        onClick={() => onViewDetails(product.slug)}
      >
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#EAE0D1]">
            <span className="font-serif text-lg text-[#30231D] mb-1">{product.name}</span>
            <span className="text-xs uppercase tracking-wider text-[#8A7769]">Artisan Bake</span>
          </div>
        )}

        {/* Hover Quick Action Overlay (Desktop) */}
        <div className="hidden lg:flex absolute inset-0 bg-[#30231D]/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center gap-2.5 p-4">
          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={isSoldOut}
            className={`px-3.5 py-2 text-xs uppercase tracking-widest font-medium transition-colors flex items-center gap-1.5 cursor-pointer shadow-md ${
              isSoldOut
                ? 'bg-neutral-300 text-neutral-600 cursor-not-allowed'
                : justAdded
                ? 'bg-emerald-700 text-white'
                : 'bg-[#B66B4E] text-[#FFFEFC] hover:bg-[#99553c]'
            }`}
            title="Add to shopping bag"
          >
            {justAdded ? <Check className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
            <span>{justAdded ? 'Added' : 'Add to Bag'}</span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(product.slug);
            }}
            className="px-3.5 py-2 bg-[#FFFEFC] text-[#30231D] hover:bg-[#30231D] hover:text-[#FFFEFC] text-xs uppercase tracking-widest font-medium transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Details</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Zero-Pill Unboxed Metadata */}
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-[#8A7769] mb-1.5">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span className={product.seasonal ? 'text-[#B66B4E] font-medium' : isSoldOut ? 'text-rose-600 font-medium' : ''}>
              {availabilityLabels[product.availability]}
            </span>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => onViewDetails(product.slug)}
            className="font-serif text-xl text-[#30231D] hover:text-[#B66B4E] transition-colors cursor-pointer leading-snug line-clamp-1"
          >
            {product.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-[#8A7769] leading-relaxed mt-1.5 line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Price & Action Buttons */}
        <div className="pt-2 border-t border-[#DED3C4]/60 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-[#8A7769]">Price</span>
            <span className="font-serif text-lg text-[#30231D] font-normal tabular-nums">
              ₱{product.price.toLocaleString()}
            </span>
          </div>

          {/* Bottom Card Actions */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleQuickAdd}
              disabled={isSoldOut}
              className={`px-3 py-1.5 text-xs uppercase tracking-wider font-medium transition-colors flex items-center gap-1 cursor-pointer border ${
                isSoldOut
                  ? 'bg-neutral-100 text-neutral-400 border-neutral-200 cursor-not-allowed'
                  : justAdded
                  ? 'bg-emerald-700 text-white border-emerald-700'
                  : 'bg-[#F6F1E8] text-[#30231D] border-[#DED3C4] hover:bg-[#30231D] hover:text-white hover:border-[#30231D]'
              }`}
              title="Add to bag"
            >
              {justAdded ? <Check className="w-3 h-3" /> : <ShoppingBag className="w-3 h-3 text-[#B66B4E]" />}
              <span>{isSoldOut ? 'Sold Out' : justAdded ? 'Added' : 'Add to Bag'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

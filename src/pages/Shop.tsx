import React, { useState, useMemo, useEffect } from 'react';
import { Search, SlidersHorizontal, X, ArrowUpDown, ShoppingBag } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ProductCard } from '../components/products/ProductCard';
import { Product, CategoryType } from '../types';
import { useCart } from '../context/CartContext';
import { useToast } from '../components/ui/Toast';

interface ShopProps {
  initialCategory?: string;
  onNavigate: (route: string, param?: string) => void;
}

export const Shop: React.FC<ShopProps> = ({
  initialCategory,
  onNavigate,
}) => {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategory || 'All Products'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name-asc'>('featured');

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  // Featured flagship item spotlight
  const spotlightProduct = useMemo(() => {
    return PRODUCTS.find((p) => p.slug === 'classic-butter-croissant') || PRODUCTS[0];
  }, []);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Category filter
    if (selectedCategory !== 'All Products') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.ingredients.some((ing) => ing.toLowerCase().includes(q))
      );
    }

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  const clearFilters = () => {
    setSelectedCategory('All Products');
    setSearchQuery('');
    setSortBy('featured');
  };

  const isFiltered = selectedCategory !== 'All Products' || searchQuery.trim() !== '' || sortBy !== 'featured';

  return (
    <div className="pt-8 md:pt-12 pb-24 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-[0.25em] text-[#B66B4E] font-medium block">
          Daily Baked Goods
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#30231D] font-normal tracking-tight">
          THE BAKERY COLLECTION
        </h1>
        <p className="text-sm md:text-base text-[#8A7769] font-light leading-relaxed">
          Made fresh, made with care, and always worth slowing down for. All items are available for morning pickup or concierge delivery.
        </p>
      </div>

      {/* Featured Spotlight Banner (Shown when no active search query) */}
      {!searchQuery && selectedCategory === 'All Products' && (
        <div className="bg-[#EAE0D1] border border-[#DED3C4] p-6 md:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#B66B4E] font-semibold block">
                Flagship Creation
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#30231D]">
                {spotlightProduct.name}
              </h2>
              <p className="text-xs md:text-sm text-[#8A7769] leading-relaxed">
                {spotlightProduct.detailedDescription}
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <span className="font-serif text-2xl text-[#30231D] tabular-nums mr-2">
                  ₱{spotlightProduct.price.toLocaleString()}
                </span>
                <button
                  onClick={() => {
                    addToCart({ product: spotlightProduct, quantity: 1 });
                    showToast({
                      title: 'Added to Bakery Bag',
                      message: `${spotlightProduct.name} was added to your bag.`,
                      type: 'success',
                    });
                  }}
                  className="px-5 py-2.5 bg-[#B66B4E] hover:bg-[#99553c] text-[#FFFEFC] text-xs uppercase tracking-widest font-medium transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Bag</span>
                </button>
                <button
                  onClick={() => onNavigate('product', spotlightProduct.slug)}
                  className="px-5 py-2.5 bg-[#30231D] hover:bg-[#B66B4E] text-[#FFFEFC] text-xs uppercase tracking-widest font-medium transition-colors cursor-pointer"
                >
                  View Details
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 relative aspect-[16/9] lg:aspect-[4/3] bg-[#DED3C4] overflow-hidden shadow-md">
              <img
                src={spotlightProduct.image}
                alt={spotlightProduct.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}

      {/* Filtering & Search Controls */}
      <div className="space-y-4 pt-4 border-t border-[#DED3C4]">
        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer border ${
                  isSelected
                    ? 'bg-[#30231D] text-[#FFFEFC] border-[#30231D]'
                    : 'bg-[#FFFEFC] text-[#8A7769] border-[#DED3C4] hover:border-[#8A7769] hover:text-[#30231D]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search & Sort Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#FFFEFC] p-3 border border-[#DED3C4]">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#8A7769] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by pastry name or ingredient..."
              className="w-full pl-9 pr-8 py-1.5 text-xs text-[#30231D] placeholder-[#8A7769] bg-transparent focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[#8A7769] hover:text-[#30231D] p-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-[#DED3C4]/60">
            {/* Sort Selector */}
            <div className="flex items-center gap-2 text-xs text-[#8A7769]">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-[#30231D] text-xs font-medium focus:outline-none cursor-pointer pr-2"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
              </select>
            </div>

            {/* Clear Filter */}
            {isFiltered && (
              <button
                onClick={clearFilters}
                className="text-xs uppercase tracking-wider text-[#B66B4E] hover:text-[#30231D] font-medium transition-colors cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Results Count & Current Filter Label */}
        <div className="flex items-center justify-between text-xs text-[#8A7769] px-1">
          <span>
            Showing <strong className="text-[#30231D]">{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'creation' : 'creations'}
          </span>
          {selectedCategory !== 'All Products' && (
            <span className="uppercase tracking-wider">Filtered by: {selectedCategory}</span>
          )}
        </div>
      </div>

      {/* Product Grid or Empty State */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center bg-[#FFFEFC] border border-[#DED3C4] p-8 space-y-4">
          <p className="font-serif text-2xl text-[#30231D]">No pastries found</p>
          <p className="text-xs text-[#8A7769] max-w-md mx-auto">
            We couldn&apos;t find any baked goods matching your active filters or search terms. Try clearing your filters or exploring our other categories.
          </p>
          <div className="pt-2">
            <button
              onClick={clearFilters}
              className="px-6 py-2.5 bg-[#30231D] text-[#FFFEFC] hover:bg-[#B66B4E] text-xs uppercase tracking-widest font-medium transition-colors cursor-pointer"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={(slug) => onNavigate('product', slug)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

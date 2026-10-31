import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { TESTIMONIALS, INSTAGRAM_POSTS } from '../data/testimonials';
import { ProductCard } from '../components/products/ProductCard';
import { Product } from '../types';

interface HomeProps {
  onNavigate: (route: string, param?: string) => void;
}

export const Home: React.FC<HomeProps> = ({
  onNavigate,
}) => {
  // House favorites: 4 specific items requested
  const houseFavoriteSlugs = [
    'classic-butter-croissant',
    'honey-butter-brioche',
    'country-sourdough',
    'pain-au-chocolat',
  ];
  const houseFavorites = houseFavoriteSlugs
    .map((slug) => PRODUCTS.find((p) => p.slug === slug))
    .filter(Boolean) as Product[];

  // Seasonal table items
  const seasonalItems = PRODUCTS.filter((p) => p.seasonal || p.category === 'Seasonal Specials').slice(0, 3);

  return (
    <div className="space-y-24 md:space-y-32 pb-24">
      {/* 6.C EDITORIAL HERO SECTION */}
      <section className="relative pt-6 md:pt-10 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="relative min-h-[580px] lg:min-h-[720px] bg-[#EAE0D1] border border-[#DED3C4] overflow-hidden flex flex-col justify-end">
          {/* Main Atmospheric Background Image */}
          <img
            src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1600&auto=format&fit=crop&q=85"
            alt="Artisan bakery morning light and golden fresh croissants"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.88]"
          />
          {/* Editorial Scrim Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#30231D]/90 via-[#30231D]/40 to-transparent" />

          {/* Top Editorial Corner Badge */}
          <div className="absolute top-6 left-6 md:top-10 md:left-10 z-10">
            <span className="text-[11px] md:text-xs uppercase tracking-[0.25em] text-[#FFFEFC] font-medium bg-[#30231D]/60 backdrop-blur-sm px-3.5 py-1.5 border border-[#DED3C4]/30">
              Baked Fresh · Made with Heart
            </span>
          </div>

          {/* Editorial Content Overlay */}
          <div className="relative z-10 p-6 md:p-12 lg:p-16 max-w-3xl space-y-6">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.2em] text-[#EAE0D1] font-semibold block">
                The Art of Slow Mornings
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#FFFEFC] font-normal leading-[1.08] tracking-tight">
                Good mornings begin with something beautiful.
              </h1>
            </div>

            <p className="text-sm md:text-base text-[#EAE0D1] max-w-xl font-light leading-relaxed">
              Slow-fermented breads, delicate pastries, and little moments of everyday indulgence. Crafted by hand with cultured French butter and local wildflower honey.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('shop')}
                className="px-7 py-3.5 bg-[#FFFEFC] text-[#30231D] hover:bg-[#B66B4E] hover:text-[#FFFEFC] text-xs uppercase tracking-widest font-medium transition-all duration-200 cursor-pointer shadow-lg flex items-center gap-2"
              >
                <span>Explore the Menu</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('our-story')}
                className="px-6 py-3.5 border border-[#FFFEFC]/60 text-[#FFFEFC] hover:bg-[#FFFEFC]/10 text-xs uppercase tracking-widest font-medium transition-colors cursor-pointer"
              >
                Our Story
              </button>
            </div>
          </div>
        </div>

      </section>

      {/* 6.D BRAND INTRODUCTION SECTION */}
      <section className="px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Asymmetrical Photos Lockup */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] bg-[#EAE0D1] border border-[#DED3C4] overflow-hidden max-w-md mx-auto lg:mx-0 shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=1000&auto=format&fit=crop&q=80"
                alt="Flaky fresh croissant layers"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Offset Floating Photo */}
            <div className="hidden sm:block absolute -bottom-8 -right-4 lg:-right-8 w-56 aspect-square bg-[#EAE0D1] border-4 border-[#F6F1E8] shadow-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?w=800&auto=format&fit=crop&q=80"
                alt="Country sourdough loaf on baker flour board"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Text Storytelling */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B66B4E] font-medium block">
              Atelier & Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#30231D] font-normal leading-tight">
              Not just baked. <br />
              <span className="font-editorial text-[#B66B4E]">Beautifully made.</span>
            </h2>
            <p className="text-base text-[#8A7769] leading-relaxed">
              Every loaf, pastry, and little treat begins with good ingredients, thoughtful hands, and the belief that the simplest things deserve extraordinary care.
            </p>
            <p className="text-sm text-[#8A7769] leading-relaxed">
              We reject industrial shortcuts. Our sourdoughs develop flavor through multi-day cold levain fermentations, and our butter croissants are rolled in 27 crisp laminations of 84% butterfat Normandy cultured butter.
            </p>
            <div className="pt-4 flex items-center gap-6">
              <button
                onClick={() => onNavigate('our-story')}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#30231D] font-semibold hover:text-[#B66B4E] transition-colors pb-1 border-b border-[#30231D] hover:border-[#B66B4E] cursor-pointer"
              >
                <span>Read Our Baking Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6.E BESTSELLERS (THE HOUSE FAVORITES) */}
      <section className="px-4 md:px-8 lg:px-12 max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#DED3C4] pb-6">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-[0.2em] text-[#B66B4E] font-medium block">
              The House Favorites
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#30231D] font-normal">
              A few things we&apos;re known for.
            </h2>
          </div>
          <button
            onClick={() => onNavigate('shop')}
            className="text-xs uppercase tracking-widest text-[#30231D] hover:text-[#B66B4E] font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>View All Bakes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4 Featured Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {houseFavorites.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={(slug) => onNavigate('product', slug)}
            />
          ))}
        </div>
      </section>

      {/* 6.F BAKERY PHILOSOPHY (Full-width Visual Editorial) */}
      <section className="relative py-24 md:py-36 bg-[#30231D] text-[#FFFEFC] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=1600&auto=format&fit=crop&q=80"
          alt="Hands kneading dough with flour dust"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.35]"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-6">
          <span className="text-xs uppercase tracking-[0.3em] text-[#B66B4E] font-medium block">
            The Rhythm of Flour & Time
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl font-normal leading-tight text-[#FFFEFC]">
            &ldquo;Time is our most important ingredient.&rdquo;
          </h2>
          <p className="text-sm md:text-base text-[#EAE0D1]/90 max-w-2xl mx-auto leading-relaxed font-light">
            From the first fold of laminated dough to the final golden crust, we believe great baking cannot be rushed. It takes 36 hours of natural fermentation to craft a single loaf of bread worth remembering.
          </p>
          <div className="pt-4">
            <button
              onClick={() => onNavigate('shop')}
              className="px-8 py-3.5 bg-[#B66B4E] hover:bg-[#a05b40] text-[#FFFEFC] text-xs uppercase tracking-widest font-medium transition-colors cursor-pointer shadow-lg inline-flex items-center gap-2"
            >
              <span>Explore Tomorrow&apos;s Bakes</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 6.G THE SEASONAL TABLE */}
      <section className="px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="bg-[#EAE0D1] border border-[#DED3C4] p-8 md:p-12 lg:p-16 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="text-xs uppercase tracking-[0.25em] text-[#B66B4E] font-medium block">
                Limited Harvest Collection
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#30231D] font-normal">
                THE SEASONAL TABLE
              </h2>
              <p className="text-sm text-[#8A7769] leading-relaxed">
                Reflecting the micro-seasons of local orchards and highland farms. Available in limited daily batches through Messenger reservations.
              </p>
            </div>
            <button
              onClick={() => onNavigate('shop', 'Seasonal Specials')}
              className="px-6 py-3 bg-[#30231D] hover:bg-[#B66B4E] text-[#FFFEFC] text-xs uppercase tracking-widest font-medium transition-colors cursor-pointer self-start md:self-end shrink-0"
            >
              Discover the Collection
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {seasonalItems.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={(slug) => onNavigate('product', slug)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6.H OUR PROCESS (Storytelling rather than generic icon cards) */}
      <section className="px-4 md:px-8 lg:px-12 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B66B4E] font-medium block">
            Craft & Method
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#30231D] font-normal">
            How we bring slow mornings to life.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-[#FFFEFC] border border-[#DED3C4] p-8 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="font-serif text-3xl text-[#B66B4E] font-normal block">01</span>
              <h3 className="font-serif text-xl text-[#30231D]">Carefully Sourced Ingredients</h3>
              <p className="text-xs text-[#8A7769] leading-relaxed">
                French cultured butter with 84% butterfat, stoneground unbleached wheat flour, single-origin Philippine chocolates, and wildflower honey harvested from the Benguet highlands.
              </p>
            </div>
            <div className="pt-4 border-t border-[#DED3C4]/60 text-[11px] uppercase tracking-wider text-[#8A7769]">
              Purity · Authenticity
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-[#FFFEFC] border border-[#DED3C4] p-8 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="font-serif text-3xl text-[#B66B4E] font-normal block">02</span>
              <h3 className="font-serif text-xl text-[#30231D]">Patient Preparation</h3>
              <p className="text-xs text-[#8A7769] leading-relaxed">
                No artificial accelerants or dough improvers. Sourdough rests for up to 36 hours. Croissant laminations are folded, rested, and chilled across three deliberate days.
              </p>
            </div>
            <div className="pt-4 border-t border-[#DED3C4]/60 text-[11px] uppercase tracking-wider text-[#8A7769]">
              Patience · Precision
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-[#FFFEFC] border border-[#DED3C4] p-8 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="font-serif text-3xl text-[#B66B4E] font-normal block">03</span>
              <h3 className="font-serif text-xl text-[#30231D]">Freshly Baked Every Morning</h3>
              <p className="text-xs text-[#8A7769] leading-relaxed">
                Our stone deck ovens fire up at 4:00 AM. Every pastry and loaf on our counter is pulled warm from the oven on the morning of your visit. We never sell day-old goods.
              </p>
            </div>
            <div className="pt-4 border-t border-[#DED3C4]/60 text-[11px] uppercase tracking-wider text-[#8A7769]">
              Morning Hearth · Daily Joy
            </div>
          </div>
        </div>
      </section>

      {/* 6.I TESTIMONIALS */}
      <section className="px-4 md:px-8 lg:px-12 max-w-7xl mx-auto space-y-10">
        <div className="text-center space-y-1">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B66B4E] font-medium block">
            Patron Reflections
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#30231D] font-normal">
            A LITTLE LOVE FROM OUR CUSTOMERS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-[#FFFEFC] border border-[#DED3C4] p-8 flex flex-col justify-between space-y-6"
            >
              <p className="font-serif text-base text-[#30231D] leading-relaxed italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="border-t border-[#DED3C4]/60 pt-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#30231D]">
                  {t.author}
                </div>
                <div className="text-[11px] text-[#8A7769]">
                  {t.role} · {t.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6.J INSTAGRAM GALLERY */}
      <section className="px-4 md:px-8 lg:px-12 max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#B66B4E] font-medium block">
              Daily Moments
            </span>
            <h2 className="font-serif text-2xl md:text-3xl text-[#30231D]">
              FOLLOW THE GOODNESS
            </h2>
          </div>
          <a
            href="https://instagram.com/harongbakehouse.ph"
            target="_blank"
            rel="noreferrer"
            className="text-xs uppercase tracking-widest text-[#B66B4E] hover:text-[#30231D] font-medium transition-colors"
          >
            @harongbakehouse.ph on Instagram
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.id}
              href="https://instagram.com/harongbakehouse.ph"
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-square bg-[#EAE0D1] border border-[#DED3C4] overflow-hidden"
            >
              <img
                src={post.image}
                alt={post.caption}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#30231D]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center p-3 text-center">
                <p className="text-[11px] text-[#FFFEFC] line-clamp-3 font-serif">
                  {post.caption}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};


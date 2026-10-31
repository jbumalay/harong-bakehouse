import React from 'react';
import { ArrowRight, Wheat, Clock, Heart, Droplet } from 'lucide-react';

interface OurStoryProps {
  onNavigate: (route: string, param?: string) => void;
}

export const OurStory: React.FC<OurStoryProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-24 md:space-y-32 pb-24">
      {/* 11. Hero Section */}
      <section className="pt-8 md:pt-14 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B66B4E] font-medium block">
            Our Origin & Passion
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#30231D] font-normal tracking-tight">
            BAKING IS OUR LOVE LANGUAGE.
          </h1>
          <p className="font-editorial text-xl sm:text-2xl text-[#8A7769] font-light max-w-xl mx-auto leading-relaxed">
            &ldquo;In a world that hurries, we chose the sacred patience of flour, water, salt, and time.&rdquo;
          </p>
        </div>

        {/* Large Editorial Panorama Photo */}
        <div className="mt-12 relative aspect-[16/9] lg:aspect-[21/9] bg-[#EAE0D1] border border-[#DED3C4] overflow-hidden shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1600&auto=format&fit=crop&q=85"
            alt="Warm sunlit artisan bakery counter with fresh loaves"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-[0.9]"
          />
        </div>
      </section>

      {/* 1. Our Beginnings & 2. Why We Bake */}
      <section className="px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B66B4E] font-medium block">
              Chapter 01 · The First Loaf
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#30231D] font-normal leading-tight">
              Born from a morning craving for real crust.
            </h2>
            <p className="text-sm md:text-base text-[#8A7769] leading-relaxed">
              Harong Bakehouse began in 2019 as a private micro-bakery experiment in Makati. Disillusioned by commercial breads loaded with emulsifiers and artificial dough conditioners, our founder set out with a simple jar of wild yeast starter nurtured with stoneground flour and pure mountain spring water.
            </p>
            <p className="text-sm text-[#8A7769] leading-relaxed">
              Word quickly spread among neighbors: every Saturday morning, a wicker basket of crackling sourdough boules and warm brioche knots would appear on our porch, fragrant with Benguet wild honeycomb and browned butter.
            </p>
            <div className="pt-2">
              <span className="font-editorial text-xl text-[#B66B4E]">
                &ldquo;We don&apos;t just bake to sustain; we bake to bring stillness to the morning rush.&rdquo;
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 relative aspect-[4/5] bg-[#EAE0D1] border border-[#DED3C4] overflow-hidden shadow-md">
            <img
              src="https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=1000&auto=format&fit=crop&q=80"
              alt="Artisan baker shaping rustic sourdough loaves"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 3. Our Ingredients & 4. Our Process */}
      <section className="px-4 md:px-8 lg:px-12 max-w-7xl mx-auto bg-[#EAE0D1] border border-[#DED3C4] p-8 md:p-14 lg:p-16">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B66B4E] font-medium block">
            The Fundamental Elements
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#30231D] font-normal">
            No compromises on what touches your table.
          </h2>
          <p className="text-sm text-[#8A7769] leading-relaxed">
            Great baking is not about complexity—it is the disciplined curation of four or five raw ingredients of indisputable pedigree.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#FFFEFC] p-8 border border-[#DED3C4] space-y-4">
            <Wheat className="w-6 h-6 text-[#B66B4E]" />
            <h3 className="font-serif text-xl text-[#30231D]">Heritage Stoneground Flours</h3>
            <p className="text-xs text-[#8A7769] leading-relaxed">
              We import French T65 tradition flour and organic rye milled low-and-slow between natural stone hearths to retain the wheat germ, vital minerals, and natural cereal oils.
            </p>
          </div>

          <div className="bg-[#FFFEFC] p-8 border border-[#DED3C4] space-y-4">
            <Droplet className="w-6 h-6 text-[#B66B4E]" />
            <h3 className="font-serif text-xl text-[#30231D]">Cultured Normandy Butter</h3>
            <p className="text-xs text-[#8A7769] leading-relaxed">
              With 84% pure butterfat, our lactic butter undergoes 18 hours of biological culturing before churning. It yields unmatched lamination flakiness and deep hazelnut aromas.
            </p>
          </div>

          <div className="bg-[#FFFEFC] p-8 border border-[#DED3C4] space-y-4">
            <Heart className="w-6 h-6 text-[#B66B4E]" />
            <h3 className="font-serif text-xl text-[#30231D]">Benguet Highland Honey</h3>
            <p className="text-xs text-[#8A7769] leading-relaxed">
              Our namesake ingredient. Harvested sustainably from wild floral canopies in northern Luzon, imparting herbal wildflower undertones to our morning brioche and glazes.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Meet the Bakers & 6. Our Philosophy */}
      <section className="px-4 md:px-8 lg:px-12 max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1 relative aspect-square bg-[#EAE0D1] border border-[#DED3C4] overflow-hidden shadow-md">
            <img
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1000&auto=format&fit=crop&q=80"
              alt="Bakery founder inspecting golden pastry lamination"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B66B4E] font-medium block">
              Hands Behind the Hearth
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#30231D] font-normal leading-tight">
              A close-knit atelier of patient souls.
            </h2>
            <p className="text-sm md:text-base text-[#8A7769] leading-relaxed">
              Our bake crew is led by Head Boulanger Luc Laurent and Manila pastry artisan Sofia Morales. Together, they unite rigorous French classic techniques with an innate celebration of local tropical botanicals—from calamansi to highland berries.
            </p>
            <p className="text-sm text-[#8A7769] leading-relaxed">
              At 4:00 AM each dawn, you will find our team dusting wooden peels, scoring loaves with razor precision, and adjusting humidity gauges. There are no computer algorithms here—only human eyes reading the color of the crust and ears listening to the hollow song of a well-baked loaf.
            </p>
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('shop')}
                className="px-6 py-3 bg-[#30231D] hover:bg-[#B66B4E] text-[#FFFEFC] text-xs uppercase tracking-widest font-medium transition-colors cursor-pointer flex items-center gap-2"
              >
                <span>Explore the Bakery Collection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

import React, { useState } from 'react';
import { CheckCircle2, Calendar, Users, MessageCircle, Copy, Check, Clock, ShieldCheck, Heart, AlertCircle } from 'lucide-react';
import { CustomOrderInquiryData } from '../types';
import { buildCustomOrderInquiry, openMessenger, copyInquiryMessage } from '../config/messenger';
import { useToast } from '../components/ui/Toast';

interface CustomOrdersProps {
  onNavigate: (route: string) => void;
}

export const CustomOrders: React.FC<CustomOrdersProps> = ({ onNavigate }) => {
  const { showToast } = useToast();

  // Tomorrow + 3 days as minimum date for custom orders (lead time)
  const minCustomDate = React.useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.toISOString().split('T')[0];
  }, []);

  const [formData, setFormData] = useState<CustomOrderInquiryData>({
    fullName: '',
    contactNumber: '',
    email: '',
    eventType: 'Celebration Cake',
    eventDate: minCustomDate,
    guestCount: '15 – 25 guests',
    preferredProduct: 'Botanical Vanilla & Fresh Berry Cake',
    budgetRange: '₱3,500 – ₱6,000',
    details: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const customCategories = [
    {
      title: 'Celebration Cakes',
      description: 'Single and tiered naked or textured buttercream cakes adorned with pressed edible botanicals, raw linen ribbons, and hand-torched meringue.',
      image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=800&auto=format&fit=crop&q=80',
      leadTime: '3–5 days notice',
    },
    {
      title: 'Wedding Desserts',
      description: 'Artfully curated multi-tier patisserie towers, delicate macaron pyramids, and bespoke wedding favor pastry boxes personalized for your guests.',
      image: 'https://images.unsplash.com/photo-1519869325930-281384150729?w=800&auto=format&fit=crop&q=80',
      leadTime: '2–4 weeks notice',
    },
    {
      title: 'Dessert Grazing Tables',
      description: 'A lavish morning or afternoon spread featuring miniature viennoiserie, fruit tartlets, canelés, pistachio financiers, and sourdough crackers.',
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&auto=format&fit=crop&q=80',
      leadTime: '1–2 weeks notice',
    },
    {
      title: 'Corporate Gifting & Pastry Boxes',
      description: 'Elegant custom-stamped kraft gift boxes loaded with morning pastries, cookies, and local honeycomb jars for VIP clients and corporate celebrations.',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80',
      leadTime: '5–7 days notice',
    },
  ];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Please enter your full name.';
    if (!formData.contactNumber.trim() || formData.contactNumber.length < 7) {
      errs.contactNumber = 'Please provide a valid phone or mobile number.';
    }
    if (!formData.eventDate) errs.eventDate = 'Please select your event date.';
    if (formData.eventDate < minCustomDate) {
      errs.eventDate = 'Custom creations require at least 3 days advance baking notice.';
    }
    if (!formData.details.trim()) {
      errs.details = 'Please describe your vision, flavors, or special design notes.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const message = buildCustomOrderInquiry(formData);
    setSubmittedMessage(message);
    window.scrollTo({ top: 900, behavior: 'smooth' });
  };

  const handleCopy = async () => {
    if (!submittedMessage) return;
    const ok = await copyInquiryMessage(submittedMessage);
    if (ok) {
      setCopied(true);
      showToast({
        title: 'Copied to Clipboard',
        message: 'Your custom inquiry is ready to send in Messenger!',
        type: 'success',
      });
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleOpenMessenger = () => {
    if (submittedMessage) {
      copyInquiryMessage(submittedMessage);
      openMessenger(submittedMessage);
    }
  };

  return (
    <div className="space-y-24 md:space-y-32 pb-24">
      {/* 12. Hero Section */}
      <section className="pt-8 md:pt-14 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B66B4E] font-medium block">
            Bespoke Atelier Service
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#30231D] font-normal tracking-tight">
            MADE FOR YOUR MOMENTS.
          </h1>
          <p className="text-sm md:text-base text-[#8A7769] font-light max-w-xl mx-auto leading-relaxed">
            From intimate celebrations to unforgettable gatherings, let us make something special for your table. Handcrafted with slow care, seasonal fruits, and French pastry artistry.
          </p>
        </div>
      </section>

      {/* 5 Distinct Service Showcases */}
      <section className="px-4 md:px-8 lg:px-12 max-w-7xl mx-auto space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs uppercase tracking-[0.2em] text-[#B66B4E] font-medium block">
            Custom Offerings
          </span>
          <h2 className="font-serif text-3xl text-[#30231D]">
            Curated For Every Occasion
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {customCategories.map((cat, idx) => (
            <div
              key={idx}
              className="bg-[#FFFEFC] border border-[#DED3C4] flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-[4/3] bg-[#EAE0D1] overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-serif text-xl text-[#30231D]">{cat.title}</h3>
                  <p className="text-xs text-[#8A7769] leading-relaxed">
                    {cat.description}
                  </p>
                </div>
                <div className="pt-2 border-t border-[#DED3C4]/60 text-[11px] uppercase tracking-wider text-[#B66B4E] font-medium">
                  {cat.leadTime}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Custom Order Inquiry Form & Generator */}
      <section id="custom-inquiry" className="px-4 md:px-8 lg:px-12 max-w-4xl mx-auto">
        <div className="bg-[#FFFEFC] border border-[#DED3C4] shadow-xl p-6 sm:p-10 md:p-12 space-y-8">
          <div className="border-b border-[#DED3C4] pb-6 space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B66B4E] font-medium block">
              Direct Consultation
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#30231D] font-normal">
              Custom Order Inquiry Form
            </h2>
            <p className="text-xs sm:text-sm text-[#8A7769] leading-relaxed">
              Complete your celebration details below. We generate a tailored Messenger inquiry for our head baker to evaluate oven availability, styling concepts, and volume pricing.
            </p>
          </div>

          {submittedMessage ? (
            /* Prepared Message Preview State */
            <div className="space-y-6 bg-[#F6F1E8] p-6 border border-[#DED3C4] animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-sm font-medium text-[#30231D]">
                <CheckCircle2 className="w-5 h-5 text-[#B66B4E]" />
                <span>Custom Inquiry Generated Successfully!</span>
              </div>
              <p className="text-xs text-[#8A7769] leading-relaxed">
                Review your prepared message below. Click &ldquo;Continue in Messenger&rdquo; to send it directly to our bakery team, or copy it to your clipboard.
              </p>

              <pre className="p-4 bg-[#30231D] text-[#EAE0D1] text-xs font-mono whitespace-pre-wrap leading-relaxed border border-[#30231D] max-h-64 overflow-y-auto">
                {submittedMessage}
              </pre>

              <div className="p-3 bg-[#EAE0D1] border border-[#DED3C4] flex items-start gap-2.5 text-xs text-[#8A7769]">
                <AlertCircle className="w-4 h-4 text-[#B66B4E] shrink-0 mt-0.5" />
                <span>
                  <strong>Reminder:</strong> Custom orders are finalized after our concierge confirms date availability and provides a deposit link on Messenger.
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleOpenMessenger}
                  className="flex-1 py-3.5 px-6 bg-[#30231D] hover:bg-[#B66B4E] text-[#FFFEFC] text-xs uppercase tracking-widest font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Continue in Messenger</span>
                </button>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="py-3.5 px-6 border border-[#30231D] text-[#30231D] hover:bg-[#EAE0D1] text-xs uppercase tracking-widest font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Copy className="w-4 h-4" />
                  <span>{copied ? 'Copied to Clipboard' : 'Copy Prepared Message'}</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setSubmittedMessage(null)}
                className="text-xs uppercase tracking-wider text-[#8A7769] hover:text-[#30231D] underline block text-center pt-2 cursor-pointer"
              >
                Edit Form Details
              </button>
            </div>
          ) : (
            /* Interactive Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#8A7769] mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Jacqueline Santos"
                    className={`w-full bg-[#F6F1E8] border px-3.5 py-2.5 text-sm text-[#30231D] focus:outline-none focus:border-[#B66B4E] ${
                      errors.fullName ? 'border-rose-400' : 'border-[#DED3C4]'
                    }`}
                  />
                  {errors.fullName && (
                    <span className="text-[11px] text-rose-500 mt-0.5 block">{errors.fullName}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#8A7769] mb-1">
                    Contact Phone / Mobile *
                  </label>
                  <input
                    type="tel"
                    value={formData.contactNumber}
                    onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                    placeholder="e.g. 0917 890 1234"
                    className={`w-full bg-[#F6F1E8] border px-3.5 py-2.5 text-sm text-[#30231D] focus:outline-none focus:border-[#B66B4E] ${
                      errors.contactNumber ? 'border-rose-400' : 'border-[#DED3C4]'
                    }`}
                  />
                  {errors.contactNumber && (
                    <span className="text-[11px] text-rose-500 mt-0.5 block">{errors.contactNumber}</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#8A7769] mb-1">
                    Event Type *
                  </label>
                  <select
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    className="w-full bg-[#F6F1E8] border border-[#DED3C4] px-3.5 py-2.5 text-sm text-[#30231D] focus:outline-none focus:border-[#B66B4E]"
                  >
                    <option value="Celebration Cake (Birthday / Milestone)">Celebration Cake</option>
                    <option value="Wedding Cake & Patisserie Tower">Wedding Celebration</option>
                    <option value="Dessert Grazing Table">Dessert Grazing Table</option>
                    <option value="Corporate Breakfast & Gifting Boxes">Corporate Gifting</option>
                    <option value="Intimate Dinner Party Dessert">Intimate Dinner Party</option>
                    <option value="Other Custom Project">Other Custom Request</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#8A7769] mb-1">
                    Event Date *
                  </label>
                  <input
                    type="date"
                    min={minCustomDate}
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    className={`w-full bg-[#F6F1E8] border px-3.5 py-2.5 text-sm text-[#30231D] focus:outline-none focus:border-[#B66B4E] ${
                      errors.eventDate ? 'border-rose-400' : 'border-[#DED3C4]'
                    }`}
                  />
                  {errors.eventDate && (
                    <span className="text-[11px] text-rose-500 mt-0.5 block">{errors.eventDate}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#8A7769] mb-1">
                    Guest Count
                  </label>
                  <select
                    value={formData.guestCount}
                    onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                    className="w-full bg-[#F6F1E8] border border-[#DED3C4] px-3.5 py-2.5 text-sm text-[#30231D] focus:outline-none focus:border-[#B66B4E]"
                  >
                    <option value="Small Gathering (6 – 10 guests)">6 – 10 guests</option>
                    <option value="Intimate Celebration (15 – 25 guests)">15 – 25 guests</option>
                    <option value="Medium Party (30 – 50 guests)">30 – 50 guests</option>
                    <option value="Grand Event (60 – 120 guests)">60 – 120 guests</option>
                    <option value="Large Wedding / Corporate (120+ guests)">120+ guests</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#8A7769] mb-1">
                    Preferred Product or Styling Theme
                  </label>
                  <input
                    type="text"
                    value={formData.preferredProduct}
                    onChange={(e) => setFormData({ ...formData, preferredProduct: e.target.value })}
                    placeholder="e.g. Basque Cheesecake Tower or Calamansi Tart grazing"
                    className="w-full bg-[#F6F1E8] border border-[#DED3C4] px-3.5 py-2.5 text-sm text-[#30231D] focus:outline-none focus:border-[#B66B4E]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#8A7769] mb-1">
                    Target Budget Range (Optional)
                  </label>
                  <select
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    className="w-full bg-[#F6F1E8] border border-[#DED3C4] px-3.5 py-2.5 text-sm text-[#30231D] focus:outline-none focus:border-[#B66B4E]"
                  >
                    <option value="Under ₱3,000">Under ₱3,000</option>
                    <option value="₱3,000 – ₱6,000">₱3,000 – ₱6,000</option>
                    <option value="₱6,000 – ₱12,000">₱6,000 – ₱12,000</option>
                    <option value="₱12,000 – ₱25,000">₱12,000 – ₱25,000</option>
                    <option value="₱25,000+ (Grand wedding / Gala)">₱25,000+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#8A7769] mb-1">
                  Design Notes, Dietary Needs & Special Requests *
                </label>
                <textarea
                  rows={4}
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  placeholder="Share details about flavor preferences (e.g., matcha, dark chocolate, calamansi), edible botanical colors, personalized calligraphy message on cake, or delivery address..."
                  className={`w-full bg-[#F6F1E8] border p-3 text-sm text-[#30231D] focus:outline-none focus:border-[#B66B4E] resize-none ${
                    errors.details ? 'border-rose-400' : 'border-[#DED3C4]'
                  }`}
                />
                {errors.details && (
                  <span className="text-[11px] text-rose-500 mt-0.5 block">{errors.details}</span>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-[#30231D] hover:bg-[#B66B4E] text-[#FFFEFC] text-xs uppercase tracking-widest font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Prepare Custom Messenger Inquiry</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Custom Orders FAQ Section */}
      <section className="px-4 md:px-8 lg:px-12 max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-1">
          <span className="text-xs uppercase tracking-[0.2em] text-[#B66B4E] font-medium block">
            Policies & Lead Times
          </span>
          <h2 className="font-serif text-3xl text-[#30231D]">
            Custom Orders Guidance
          </h2>
        </div>

        <div className="space-y-4">
          <div className="bg-[#FFFEFC] p-6 border border-[#DED3C4] space-y-2">
            <h4 className="font-serif text-lg text-[#30231D]">
              How far in advance should I book my celebration cake?
            </h4>
            <p className="text-xs text-[#8A7769] leading-relaxed">
              We recommend reserving celebration cakes at least 3 to 5 days in advance. For weddings and events requiring customized pastry grazing tables or 50+ gift boxes, 2 to 4 weeks notice guarantees your oven slot.
            </p>
          </div>

          <div className="bg-[#FFFEFC] p-6 border border-[#DED3C4] space-y-2">
            <h4 className="font-serif text-lg text-[#30231D]">
              Do you accommodate dietary adjustments or gluten-free requests?
            </h4>
            <p className="text-xs text-[#8A7769] leading-relaxed">
              Because our atelier processes stoneground wheat flour daily, we cannot guarantee a certified gluten-free environment. However, we craft naturally gluten-free almond financiers, Basque cheesecakes, and dairy-free chocolate ganache tarts upon advance request.
            </p>
          </div>

          <div className="bg-[#FFFEFC] p-6 border border-[#DED3C4] space-y-2">
            <h4 className="font-serif text-lg text-[#30231D]">
              How are custom orders delivered?
            </h4>
            <p className="text-xs text-[#8A7769] leading-relaxed">
              All multi-tiered cakes and custom pastry towers are transported exclusively via temperature-regulated four-wheel courier or in-person delivery by our concierge to protect fragile buttercream and delicate fruit garnishes.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

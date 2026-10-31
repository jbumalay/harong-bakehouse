import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Instagram, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brand';
import { openMessenger } from '../config/messenger';
import { ContactFormData } from '../types';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please provide your name.';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!formData.subject.trim()) errs.subject = 'Please specify a subject.';
    if (!formData.message.trim() || formData.message.length < 10) {
      errs.message = 'Please provide a message with at least 10 characters.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulated client-side submission with realistic response delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 600);
  };

  return (
    <div className="pt-8 md:pt-14 pb-24 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-[0.25em] text-[#B66B4E] font-medium block">
          Visit Our Hearth & Atelier
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#30231D] font-normal tracking-tight">
          CONNECT WITH THE BAKERS
        </h1>
        <p className="text-sm md:text-base text-[#8A7769] font-light leading-relaxed">
          Whether inquiring about tomorrow&apos;s oven pulls, event collaborations, or simply sharing a love for sourdough, we welcome your word.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Atelier Contact Information & Map */}
        <div className="lg:col-span-5 space-y-8">
          {/* Quick Messenger Action Banner */}
          <div className="bg-[#30231D] text-[#FFFEFC] p-6 space-y-3 border border-[#30231D]">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#B66B4E] font-semibold">
              <MessageCircle className="w-4 h-4" />
              <span>Fastest Response Time</span>
            </div>
            <h3 className="font-serif text-2xl">Need immediate reserve confirmation?</h3>
            <p className="text-xs text-[#EAE0D1]/90 leading-relaxed">
              Our front-of-house team monitors our Messenger chat throughout morning bake hours (7:30 AM – 6:00 PM).
            </p>
            <div className="pt-1">
              <button
                onClick={() => openMessenger()}
                className="w-full py-2.5 px-4 bg-[#B66B4E] hover:bg-[#a05b40] text-[#FFFEFC] text-xs uppercase tracking-widest font-medium transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Open Messenger Chat</span>
              </button>
            </div>
          </div>

          {/* Contact Details Card */}
          <div className="bg-[#FFFEFC] border border-[#DED3C4] p-6 space-y-6">
            <h3 className="font-serif text-xl text-[#30231D] border-b border-[#DED3C4] pb-3">
              Atelier Information
            </h3>

            <div className="space-y-4 text-xs text-[#8A7769]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#B66B4E] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#30231D] block mb-0.5">Bakery Address:</strong>
                  <p>{BRAND_CONFIG.address.street}</p>
                  <p>{BRAND_CONFIG.address.neighborhood}, {BRAND_CONFIG.address.region}</p>
                  <p>{BRAND_CONFIG.address.country}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#B66B4E] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#30231D] block mb-0.5">Telephone & Mobile:</strong>
                  <p>{BRAND_CONFIG.phone} (Bakery Landline)</p>
                  <p>{BRAND_CONFIG.mobile} (Mobile & Concierge)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#B66B4E] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#30231D] block mb-0.5">Direct Correspondence:</strong>
                  <p>{BRAND_CONFIG.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#B66B4E] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#30231D] block mb-0.5">Bake Hours:</strong>
                  {BRAND_CONFIG.hours.map((h, i) => (
                    <p key={i} className="mb-0.5">
                      <span className="text-[#30231D]">{h.days}:</span> {h.time}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stylized Atelier Map Visual */}
          <div className="bg-[#EAE0D1] border border-[#DED3C4] p-4 space-y-2">
            <div className="relative aspect-[16/9] bg-[#DED3C4] overflow-hidden flex flex-col items-center justify-center text-center p-4">
              <MapPin className="w-8 h-8 text-[#B66B4E] mb-2 animate-bounce" />
              <div className="font-serif text-base text-[#30231D] font-medium">
                Legazpi Village Atelier
              </div>
              <p className="text-[11px] text-[#8A7769]">
                Dela Rosa St. corner Salcedo St., Makati City
              </p>
              <div className="mt-2 text-[10px] uppercase tracking-wider bg-[#FFFEFC] px-2.5 py-1 text-[#30231D] border border-[#DED3C4]">
                Curbside Pickup Bay Available
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7 bg-[#FFFEFC] border border-[#DED3C4] p-6 sm:p-10 space-y-6 shadow-sm">
          <div className="space-y-1 border-b border-[#DED3C4] pb-4">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#30231D]">
              Send Us a Message
            </h2>
            <p className="text-xs text-[#8A7769]">
              For wholesale inquiries, press, workshop questions, or general correspondence.
            </p>
          </div>

          {submitted ? (
            <div className="bg-[#F6F1E8] border border-[#DED3C4] p-8 text-center space-y-4 animate-in fade-in">
              <CheckCircle2 className="w-10 h-10 text-[#B66B4E] mx-auto" />
              <h3 className="font-serif text-2xl text-[#30231D]">Merci! Message Received.</h3>
              <p className="text-xs text-[#8A7769] max-w-md mx-auto leading-relaxed">
                Thank you for reaching out to Harong Bakehouse. A member of our atelier team will respond to your email within 24 hours.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="text-xs uppercase tracking-wider text-[#B66B4E] hover:underline font-medium cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#8A7769] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Marc Reyes"
                    className={`w-full bg-[#F6F1E8] border px-3.5 py-2.5 text-sm text-[#30231D] focus:outline-none focus:border-[#B66B4E] ${
                      errors.name ? 'border-rose-400' : 'border-[#DED3C4]'
                    }`}
                  />
                  {errors.name && (
                    <span className="text-[11px] text-rose-500 mt-0.5 block">{errors.name}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#8A7769] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. marc@example.com"
                    className={`w-full bg-[#F6F1E8] border px-3.5 py-2.5 text-sm text-[#30231D] focus:outline-none focus:border-[#B66B4E] ${
                      errors.email ? 'border-rose-400' : 'border-[#DED3C4]'
                    }`}
                  />
                  {errors.email && (
                    <span className="text-[11px] text-rose-500 mt-0.5 block">{errors.email}</span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#8A7769] mb-1">
                  Subject *
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Corporate Breakfast Inquiry or Sourdough Workshop"
                  className={`w-full bg-[#F6F1E8] border px-3.5 py-2.5 text-sm text-[#30231D] focus:outline-none focus:border-[#B66B4E] ${
                    errors.subject ? 'border-rose-400' : 'border-[#DED3C4]'
                  }`}
                />
                {errors.subject && (
                  <span className="text-[11px] text-rose-500 mt-0.5 block">{errors.subject}</span>
                )}
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#8A7769] mb-1">
                  Message *
                </label>
                <textarea
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Write your note here..."
                  className={`w-full bg-[#F6F1E8] border p-3.5 text-sm text-[#30231D] focus:outline-none focus:border-[#B66B4E] resize-none ${
                    errors.message ? 'border-rose-400' : 'border-[#DED3C4]'
                  }`}
                />
                {errors.message && (
                  <span className="text-[11px] text-rose-500 mt-0.5 block">{errors.message}</span>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 bg-[#30231D] hover:bg-[#B66B4E] text-[#FFFEFC] text-xs uppercase tracking-widest font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                </button>
              </div>

              <div className="pt-2 text-[11px] text-[#8A7769] text-center">
                <span>Jerome Andrei Bumalay's fictional bakery portfolio project sample.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

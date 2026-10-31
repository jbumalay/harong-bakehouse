import React from 'react';
import { ArrowLeft, Shield, AlertCircle } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brand';

interface PrivacyPolicyProps {
  onNavigate: (route: string) => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onNavigate }) => {
  return (
    <div className="pt-8 md:pt-14 pb-24 px-4 md:px-8 lg:px-12 max-w-4xl mx-auto space-y-12">
      {/* Back button */}
      <div>
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#8A7769] hover:text-[#30231D] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return Home</span>
        </button>
      </div>

      {/* Header */}
      <div className="space-y-3 border-b border-[#DED3C4] pb-6">
        <span className="text-xs uppercase tracking-[0.25em] text-[#B66B4E] font-medium block">
          Transparency & Disclosures
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#30231D] font-normal">
          PRIVACY POLICY & PROJECT NOTICE
        </h1>
        <p className="text-xs text-[#8A7769]">
          Last Updated: October 2026 · Sample Portfolio Content for Harong Bakehouse
        </p>
      </div>

      {/* Demonstration Notice Card */}
      <div className="bg-[#EAE0D1] border border-[#DED3C4] p-5 flex items-start gap-3 text-xs text-[#30231D]">
        <AlertCircle className="w-5 h-5 text-[#B66B4E] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="block font-medium">Project Notice:</strong>
          <p className="text-[#8A7769] leading-relaxed">
            Jerome Andrei Bumalay's fictional bakery portfolio project sample. This sample policy outlines representative privacy practices for demonstration purposes only and should be replaced with verified legal counsel prior to commercial operations.
          </p>
        </div>
      </div>

      {/* Policy Content Sections */}
      <div className="bg-[#FFFEFC] border border-[#DED3C4] p-6 sm:p-10 space-y-8 text-xs md:text-sm text-[#8A7769] leading-relaxed">
        <section className="space-y-3">
          <h2 className="font-serif text-xl text-[#30231D] font-medium">
            1. Information We Collect
          </h2>
          <p>
            When you browse our bakery catalog or prepare an order inquiry, we only process information that you voluntarily choose to share:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-[#30231D]/90">
            <li><strong>Inquiry Details:</strong> Your name, phone/mobile number, email address (for custom orders), and delivery preferences.</li>
            <li><strong>Order Selections:</strong> Products, quantities, event dates, and dietary or allergen requirements.</li>
            <li><strong>Newsletter Subscription:</strong> Email address provided for receiving seasonal batch dispatches.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl text-[#30231D] font-medium">
            2. How Information Is Used
          </h2>
          <p>
            Any customer information collected through this website or through our Messenger-based ordering workflow is used solely to:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-[#30231D]/90">
            <li>Verify daily morning oven bake capacity and coordinate pickup or delivery slots.</li>
            <li>Respond directly to customer product and allergen inquiries.</li>
            <li>Coordinate bespoke celebration cake styling, event guest counts, and scheduling.</li>
            <li>Provide timely notification when reserved items are ready for pickup.</li>
          </ul>
          <p>
            We never sell, rent, or trade your contact information to third-party advertisers or data brokers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl text-[#30231D] font-medium">
            3. Third-Party Services & Messenger Integration
          </h2>
          <p>
            Our primary conversational ordering mechanism operates via Meta / Facebook Messenger. When you choose to continue an order or inquiry into Messenger, your communication is governed by the Meta Platform Terms of Service and Data Policy.
          </p>
          <p>
            Delivery coordination is facilitated through third-party transport partners (e.g., GrabExpress or Lalamove) exclusively for dispatching fresh baked goods to your designated drop-off location.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl text-[#30231D] font-medium">
            4. Data Retention & Preferences
          </h2>
          <p>
            We retain order inquiry notes only as long as necessary to fulfill your bakery reservation and maintain recipe customization records for recurring bespoke orders. You may request the deletion of your contact information or unsubscribe from dispatches at any time by sending a message to <span className="text-[#30231D] font-medium">{BRAND_CONFIG.email}</span>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl text-[#30231D] font-medium">
            5. Contact the Atelier
          </h2>
          <p>
            If you have questions regarding this demonstration policy, feel free to reach out to:
          </p>
          <div className="p-4 bg-[#F6F1E8] border border-[#DED3C4] text-xs space-y-1 text-[#30231D]">
            <p className="font-medium">{BRAND_CONFIG.legalName}</p>
            <p>{BRAND_CONFIG.address.street}, {BRAND_CONFIG.address.neighborhood}</p>
            <p>Email: {BRAND_CONFIG.email}</p>
          </div>
        </section>
      </div>
    </div>
  );
};

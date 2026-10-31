import React, { useState } from 'react';
import {
  X,
  MessageCircle,
  Copy,
  Check,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  ShoppingBag,
  AlertCircle,
  Truck,
  RotateCcw,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { MultiProductOrderData } from '../../types';
import { buildMessengerOrderMessage, openMessenger, copyInquiryMessage } from '../../config/messenger';
import { useToast } from '../ui/Toast';
import { BRAND_CONFIG } from '../../config/brand';

interface OrderCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBackToCart: () => void;
}

export const OrderCheckoutModal: React.FC<OrderCheckoutModalProps> = ({
  isOpen,
  onClose,
  onBackToCart,
}) => {
  const { items, subtotal, totalQuantity, clearCart } = useCart();
  const { showToast } = useToast();

  // Tomorrow's date string YYYY-MM-DD for minimum booking date
  const tomorrowStr = React.useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  }, []);

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [fulfillment, setFulfillment] = useState<'pickup' | 'delivery'>('pickup');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [preferredDate, setPreferredDate] = useState(tomorrowStr);
  const [preferredTime, setPreferredTime] = useState('08:30 AM – 10:00 AM (Morning Bake)');
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Step state: 'details' -> 'review' -> 'messenger_ready'
  const [currentStep, setCurrentStep] = useState<'details' | 'review' | 'messenger_ready'>('details');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const validateDetails = () => {
    const errs: Record<string, string> = {};
    if (!customerName.trim()) {
      errs.customerName = 'Please enter your full name.';
    }
    if (!contactNumber.trim() || contactNumber.length < 7) {
      errs.contactNumber = 'Please provide a valid contact phone or mobile number.';
    }
    if (fulfillment === 'delivery' && !deliveryAddress.trim()) {
      errs.deliveryAddress = 'Please provide a delivery destination address.';
    }
    if (!preferredDate) {
      errs.preferredDate = 'Please select your preferred fulfillment date.';
    } else if (preferredDate < tomorrowStr) {
      errs.preferredDate = 'Our stone hearth bakes require at least 24 hours advance schedule.';
    }
    if (!preferredTime) {
      errs.preferredTime = 'Please select a preferred time slot.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleProceedToReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateDetails()) return;
    setCurrentStep('review');
  };

  const handleGenerateMessenger = () => {
    const orderData: MultiProductOrderData = {
      customerName,
      contactNumber,
      email: email.trim() || undefined,
      fulfillment,
      deliveryAddress: fulfillment === 'delivery' ? deliveryAddress.trim() : undefined,
      preferredDate,
      preferredTime,
      specialInstructions: specialInstructions.trim() || undefined,
      items,
      subtotal,
      totalQuantity,
    };

    const msg = buildMessengerOrderMessage(orderData);
    setGeneratedMessage(msg);
    setCurrentStep('messenger_ready');
  };

  const handleCopyMessage = async () => {
    const ok = await copyInquiryMessage(generatedMessage);
    if (ok) {
      setCopied(true);
      showToast({
        title: 'Order Message Copied!',
        message: 'Your structured order message is copied to clipboard ready to paste into Messenger.',
        type: 'success',
      });
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleOpenMessenger = () => {
    copyInquiryMessage(generatedMessage);
    openMessenger(generatedMessage);
  };

  const handleResetAndClose = () => {
    setCurrentStep('details');
    setErrors({});
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#30231D]/75 backdrop-blur-sm animate-fade-in"
      onClick={handleResetAndClose}
    >
      <div
        className="bg-[#F6F1E8] text-[#30231D] max-w-2xl w-full border border-[#DED3C4] shadow-2xl max-h-[94vh] flex flex-col overflow-hidden animate-modal-in"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Order Checkout & Review"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#DED3C4] flex items-center justify-between bg-[#EAE0D1]/60 shrink-0">
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#B66B4E] font-medium block">
              Step {currentStep === 'details' ? '1 of 3' : currentStep === 'review' ? '2 of 3' : '3 of 3'} · Multi-Product Order
            </span>
            <h2 className="font-serif text-2xl text-[#30231D] font-normal">
              {currentStep === 'details' && 'Fulfillment & Customer Details'}
              {currentStep === 'review' && 'Review Your Bakery Order'}
              {currentStep === 'messenger_ready' && 'Ready to Submit via Messenger'}
            </h2>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-1.5 text-[#8A7769] hover:text-[#30231D] transition-colors cursor-pointer rounded-full hover:bg-[#DED3C4]"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-6">
          {/* STEP 1: CUSTOMER & FULFILLMENT INFORMATION */}
          {currentStep === 'details' && (
            <form onSubmit={handleProceedToReview} className="space-y-6">
              {/* Bag Summary Snapshot */}
              <div className="p-4 bg-[#FFFEFC] border border-[#DED3C4] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-5 h-5 text-[#B66B4E]" />
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#8A7769] block font-medium">
                      Current Selection
                    </span>
                    <span className="font-serif text-base text-[#30231D]">
                      {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'} in Bakery Bag
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[11px] uppercase tracking-wider text-[#8A7769] block">
                    Subtotal
                  </span>
                  <span className="font-serif text-lg text-[#30231D] tabular-nums font-normal">
                    ₱{subtotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Customer Contact */}
              <div className="space-y-4">
                <h3 className="text-xs uppercase tracking-wider font-semibold text-[#8A7769] border-b border-[#DED3C4] pb-1.5">
                  1. Customer Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-medium text-[#30231D] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Marie Claire"
                      className={`w-full bg-[#FFFEFC] border px-3.5 py-2 text-sm text-[#30231D] focus:outline-none focus:border-[#B66B4E] ${
                        errors.customerName ? 'border-rose-400' : 'border-[#DED3C4]'
                      }`}
                    />
                    {errors.customerName && (
                      <span className="text-[11px] text-rose-500 mt-0.5 block">{errors.customerName}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-medium text-[#30231D] mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      placeholder="e.g. 0917 123 4567"
                      className={`w-full bg-[#FFFEFC] border px-3.5 py-2 text-sm text-[#30231D] focus:outline-none focus:border-[#B66B4E] ${
                        errors.contactNumber ? 'border-rose-400' : 'border-[#DED3C4]'
                      }`}
                    />
                    {errors.contactNumber && (
                      <span className="text-[11px] text-rose-500 mt-0.5 block">{errors.contactNumber}</span>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs uppercase tracking-wider font-medium text-[#30231D] mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. marie@example.com (for receipts & holiday dispatches)"
                      className="w-full bg-[#FFFEFC] border border-[#DED3C4] px-3.5 py-2 text-sm text-[#30231D] focus:outline-none focus:border-[#B66B4E]"
                    />
                  </div>
                </div>
              </div>

              {/* Fulfillment Method Selection */}
              <div className="space-y-4">
                <h3 className="text-xs uppercase tracking-wider font-semibold text-[#8A7769] border-b border-[#DED3C4] pb-1.5">
                  2. Fulfillment Preference
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFulfillment('pickup')}
                    className={`p-3.5 border text-left cursor-pointer transition-colors ${
                      fulfillment === 'pickup'
                        ? 'border-[#30231D] bg-[#30231D] text-[#FFFEFC]'
                        : 'border-[#DED3C4] bg-[#FFFEFC] text-[#30231D] hover:bg-[#EAE0D1]'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Bakery Pickup</span>
                    </div>
                    <div className="text-[11px] opacity-80 mt-1">
                      Legazpi Village, Makati Atelier
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFulfillment('delivery')}
                    className={`p-3.5 border text-left cursor-pointer transition-colors ${
                      fulfillment === 'delivery'
                        ? 'border-[#30231D] bg-[#30231D] text-[#FFFEFC]'
                        : 'border-[#DED3C4] bg-[#FFFEFC] text-[#30231D] hover:bg-[#EAE0D1]'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
                      <Truck className="w-3.5 h-3.5" />
                      <span>Courier Delivery</span>
                    </div>
                    <div className="text-[11px] opacity-80 mt-1">
                      Arranged via Grab/Lalamove car
                    </div>
                  </button>
                </div>

                {/* Delivery Address Field */}
                {fulfillment === 'delivery' && (
                  <div className="p-4 bg-[#FFFEFC] border border-[#DED3C4] space-y-2 animate-in fade-in duration-150">
                    <label className="block text-xs uppercase tracking-wider font-medium text-[#30231D]">
                      Delivery Destination Address *
                    </label>
                    <textarea
                      rows={2}
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="Unit / Floor, Building Name, Street, Barangay, City, Landmark notes..."
                      className={`w-full bg-[#F6F1E8] border p-2.5 text-xs text-[#30231D] focus:outline-none focus:border-[#B66B4E] resize-none ${
                        errors.deliveryAddress ? 'border-rose-400' : 'border-[#DED3C4]'
                      }`}
                    />
                    {errors.deliveryAddress && (
                      <span className="text-[11px] text-rose-500 block">{errors.deliveryAddress}</span>
                    )}
                    <p className="text-[11px] text-[#8A7769]">
                      Exact delivery fee will be calculated based on distance and settled directly upon Messenger confirmation.
                    </p>
                  </div>
                )}
              </div>

              {/* Schedule */}
              <div className="space-y-4">
                <h3 className="text-xs uppercase tracking-wider font-semibold text-[#8A7769] border-b border-[#DED3C4] pb-1.5">
                  3. Preferred Date & Time
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-medium text-[#30231D] mb-1">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      min={tomorrowStr}
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className={`w-full bg-[#FFFEFC] border px-3 py-2 text-sm text-[#30231D] focus:outline-none focus:border-[#B66B4E] ${
                        errors.preferredDate ? 'border-rose-400' : 'border-[#DED3C4]'
                      }`}
                    />
                    {errors.preferredDate && (
                      <span className="text-[11px] text-rose-500 mt-0.5 block">{errors.preferredDate}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-medium text-[#30231D] mb-1">
                      Preferred Time Slot *
                    </label>
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full bg-[#FFFEFC] border border-[#DED3C4] px-3 py-2 text-sm text-[#30231D] focus:outline-none focus:border-[#B66B4E]"
                    >
                      <option value="07:30 AM – 09:00 AM (First Oven Pull)">07:30 AM – 09:00 AM (First Oven Pull)</option>
                      <option value="09:00 AM – 11:00 AM (Morning Coffee Peak)">09:00 AM – 11:00 AM (Morning Coffee Peak)</option>
                      <option value="11:30 AM – 01:30 PM (Midday Pickup)">11:30 AM – 01:30 PM (Midday Pickup)</option>
                      <option value="02:30 PM – 04:30 PM (Afternoon Tea Batch)">02:30 PM – 04:30 PM (Afternoon Tea Batch)</option>
                      <option value="05:00 PM – 06:00 PM (Closing Pull)">05:00 PM – 06:00 PM (Closing Pull)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Special Instructions */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-[#30231D] mb-1">
                  Special Instructions / Dietary Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="e.g. Sliced sourdough please, paper bag packaging, birthday greeting card..."
                  className="w-full bg-[#FFFEFC] border border-[#DED3C4] p-3 text-xs text-[#30231D] focus:outline-none focus:border-[#B66B4E] resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onBackToCart();
                  }}
                  className="px-4 py-3 text-xs uppercase tracking-wider text-[#8A7769] hover:text-[#30231D] font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Bag</span>
                </button>

                <button
                  type="submit"
                  className="px-6 py-3.5 bg-[#30231D] hover:bg-[#B66B4E] text-[#FFFEFC] text-xs uppercase tracking-widest font-medium transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Review Order</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: COMPLETE ORDER REVIEW & SUMMARY */}
          {currentStep === 'review' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="p-4 bg-[#FFFEFC] border border-[#DED3C4] space-y-1">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#B66B4E]">
                  Please Review Before Submitting
                </span>
                <p className="text-xs text-[#8A7769] leading-relaxed">
                  Your order will be consolidated into a structured Messenger message for our bakery team to verify oven scheduling and confirm payment options.
                </p>
              </div>

              {/* Itemized Order List */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-[#8A7769] uppercase tracking-wider font-semibold">
                  <span>Selected Products ({totalQuantity} total)</span>
                  <span>Subtotal</span>
                </div>

                <div className="divide-y divide-[#DED3C4] border border-[#DED3C4] bg-[#FFFEFC]">
                  {items.map((item) => (
                    <div key={item.id} className="p-3.5 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={item.image}
                          alt={item.productName}
                          referrerPolicy="no-referrer"
                          className="w-12 h-12 object-cover border border-[#DED3C4] shrink-0"
                        />
                        <div className="min-w-0">
                          <h4 className="font-serif text-sm text-[#30231D] truncate font-medium">
                            {item.productName}
                          </h4>
                          {item.variantName && (
                            <span className="text-[11px] text-[#8A7769] block">
                              {item.variantName}
                            </span>
                          )}
                          <span className="text-[11px] text-[#8A7769]">
                            {item.quantity} × ₱{item.unitPrice.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <span className="font-serif text-sm text-[#30231D] tabular-nums font-normal shrink-0">
                        ₱{(item.unitPrice * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Subtotal Bar */}
                <div className="p-4 bg-[#EAE0D1] border border-[#DED3C4] flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-[#30231D] font-semibold">
                    Order Subtotal
                  </span>
                  <span className="font-serif text-2xl text-[#30231D] tabular-nums font-normal">
                    ₱{subtotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Customer & Fulfillment Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-[#FFFEFC] border border-[#DED3C4] space-y-1">
                  <span className="uppercase tracking-wider font-semibold text-[#8A7769] block mb-1">
                    Customer Information
                  </span>
                  <p className="font-medium text-[#30231D]">{customerName}</p>
                  <p className="text-[#8A7769]">{contactNumber}</p>
                  {email && <p className="text-[#8A7769]">{email}</p>}
                </div>

                <div className="p-4 bg-[#FFFEFC] border border-[#DED3C4] space-y-1">
                  <span className="uppercase tracking-wider font-semibold text-[#8A7769] block mb-1">
                    Fulfillment Method
                  </span>
                  <p className="font-medium text-[#30231D]">
                    {fulfillment === 'delivery' ? 'Courier Delivery' : 'Bakery Pickup'}
                  </p>
                  <p className="text-[#8A7769]">{preferredDate} · {preferredTime}</p>
                  {fulfillment === 'delivery' && deliveryAddress && (
                    <p className="text-[#30231D] text-[11px] pt-1">
                      <strong>Address:</strong> {deliveryAddress}
                    </p>
                  )}
                </div>
              </div>

              {specialInstructions && (
                <div className="p-3 bg-[#FFFEFC] border border-[#DED3C4] text-xs">
                  <span className="uppercase tracking-wider font-semibold text-[#8A7769] block mb-0.5">
                    Special Notes
                  </span>
                  <p className="text-[#30231D] italic">&ldquo;{specialInstructions}&rdquo;</p>
                </div>
              )}

              {/* Review Actions */}
              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setCurrentStep('details')}
                  className="px-4 py-3 text-xs uppercase tracking-wider text-[#8A7769] hover:text-[#30231D] font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Edit Details</span>
                </button>

                <button
                  type="button"
                  onClick={handleGenerateMessenger}
                  className="px-7 py-3.5 bg-[#30231D] hover:bg-[#B66B4E] text-[#FFFEFC] text-xs uppercase tracking-widest font-medium transition-colors flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Generate Messenger Message</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: MESSENGER ORDER READY & SUBMISSION */}
          {currentStep === 'messenger_ready' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Status Banner */}
              <div className="p-4 bg-[#FFFEFC] border border-[#DED3C4] space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-[#30231D]">
                  <CheckCircle2 className="w-4 h-4 text-[#B66B4E]" />
                  <span>Your Multi-Product Order is Prepared!</span>
                </div>
                <p className="text-xs text-[#8A7769] leading-relaxed">
                  Click <strong>&ldquo;Continue in Messenger&rdquo;</strong> to open our bakery conversation. If your browser does not prefill the text, simply click <strong>&ldquo;Copy Message&rdquo;</strong> and paste it into the chat!
                </p>
              </div>

              {/* Monospaced Prepared Message View */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-[#8A7769]">
                  <span className="uppercase tracking-wider font-semibold">Prepared Messenger Message:</span>
                  <button
                    onClick={handleCopyMessage}
                    className="inline-flex items-center gap-1.5 text-[#B66B4E] hover:text-[#30231D] font-medium cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied to Clipboard' : 'Copy Message'}</span>
                  </button>
                </div>
                <pre className="p-4 bg-[#30231D] text-[#EAE0D1] text-xs font-mono whitespace-pre-wrap leading-relaxed border border-[#30231D] max-h-60 overflow-y-auto">
                  {generatedMessage}
                </pre>
              </div>

              {/* Policy Disclosure */}
              <div className="p-3 bg-[#EAE0D1]/80 text-xs text-[#8A7769] border border-[#DED3C4] flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-[#B66B4E] shrink-0 mt-0.5" />
                <p>
                  <strong>Note:</strong> Your order is not confirmed until our bakery concierge verifies oven capacity on Messenger. Your bag remains saved until you clear it.
                </p>
              </div>

              {/* Primary Messenger Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleOpenMessenger}
                  className="flex-1 py-3.5 px-6 bg-[#30231D] hover:bg-[#B66B4E] text-[#FFFEFC] text-xs uppercase tracking-widest font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Continue in Messenger</span>
                </button>
                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="py-3.5 px-6 border border-[#30231D] text-[#30231D] hover:bg-[#EAE0D1] text-xs uppercase tracking-widest font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Copy className="w-4 h-4" />
                  <span>{copied ? 'Copied' : 'Copy Prepared Message'}</span>
                </button>
              </div>

              {/* Bag Management Actions */}
              <div className="pt-2 flex items-center justify-between text-xs text-[#8A7769] border-t border-[#DED3C4]">
                <button
                  type="button"
                  onClick={() => setCurrentStep('review')}
                  className="hover:text-[#30231D] underline cursor-pointer"
                >
                  Back to Review
                </button>

                <button
                  type="button"
                  onClick={() => {
                    clearCart();
                    showToast({
                      title: 'Bakery Bag Cleared',
                      message: 'Your bag is ready for a fresh order.',
                      type: 'info',
                    });
                    handleResetAndClose();
                  }}
                  className="hover:text-rose-600 transition-colors cursor-pointer flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear Bag for New Order</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

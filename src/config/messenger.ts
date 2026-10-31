import { Product, OrderInquiryData, CustomOrderInquiryData, MultiProductOrderData } from '../types';

/**
 * MESSENGER INTEGRATION CONFIGURATION
 * 
 * Centralized settings for the bakery's Messenger-based ordering workflow.
 * Change MESSENGER_PAGE_URL to your verified Facebook Page username or m.me link.
 */
export const MESSENGER_CONFIG = {
  // Demonstration placeholder link - cleanly isolated for actual production FB page
  pageUrl: 'https://m.me/harongbakehouse',
  displayName: 'Harong Bakehouse on Messenger',
  enabled: true,
  defaultInquiryMessage: 'Hello Harong Bakehouse! I would like to inquire about fresh pastries and bread availability.',
};

/**
 * Constructs a structured product inquiry message.
 */
export function buildProductInquiry(
  product: Product,
  quantity: number = 1,
  variantName?: string
): string {
  const variantText = variantName ? `\nVariant: ${variantName}` : '';
  const total = product.price * quantity;

  return `Hello Harong Bakehouse! 🥐

I'm interested in ordering:

Product: ${product.name}${variantText}
Quantity: ${quantity}
Price: ₱${product.price.toLocaleString()} each (Est. Total: ₱${total.toLocaleString()})

Could you please confirm today's availability and pickup/delivery details? Thank you!`;
}

/**
 * Constructs a comprehensive order inquiry message with fulfillment details.
 */
export function buildOrderInquiry(
  data: OrderInquiryData,
  totalPrice?: number
): string {
  const variantText = data.variantName ? ` (${data.variantName})` : '';
  const totalStr = totalPrice ? `\nEstimated Total: ₱${totalPrice.toLocaleString()}` : '';

  return `Hello Harong Bakehouse!

I'd like to inquire about placing an order:

Customer: ${data.customerName}
Contact: ${data.contactNumber}

Items Requested:
• ${data.productName}${variantText} x ${data.quantity} (₱${data.unitPrice.toLocaleString()} each)${totalStr}

Fulfillment: ${data.fulfillment.toUpperCase()}
Preferred Date: ${data.preferredDate}
Preferred Time: ${data.preferredTime}

Special Instructions:
${data.specialInstructions?.trim() || 'None'}

Please let me know if this slot is available and how to finalize. Thank you!`;
}

/**
 * Constructs a consolidated Messenger order message from the multi-product shopping cart.
 */
export function buildMessengerOrderMessage(orderData: MultiProductOrderData): string {
  const itemsText = orderData.items
    .map((item, index) => {
      const variantText = item.variantName ? `\n   Variant: ${item.variantName}` : '';
      const subtotal = item.unitPrice * item.quantity;
      return `${index + 1}. ${item.productName}${variantText}\n   Quantity: ${item.quantity}\n   Unit Price: ₱${item.unitPrice.toLocaleString()}\n   Subtotal: ₱${subtotal.toLocaleString()}`;
    })
    .join('\n\n');

  const emailText = orderData.email ? `\nEmail: ${orderData.email}` : '';
  const addressText =
    orderData.fulfillment === 'delivery' && orderData.deliveryAddress
      ? `\nAddress: ${orderData.deliveryAddress}`
      : '';

  return `Hello Harong Bakehouse!

I'd like to place an order.

CUSTOMER INFORMATION:
Name: ${orderData.customerName}
Contact: ${orderData.contactNumber}${emailText}

ORDER DETAILS:

${itemsText}

ORDER SUBTOTAL: ₱${orderData.subtotal.toLocaleString()} (${orderData.totalQuantity} ${orderData.totalQuantity === 1 ? 'item' : 'items'})

FULFILLMENT:
Type: ${orderData.fulfillment === 'delivery' ? 'Delivery (Concierge Courier)' : 'Bakery Pickup (Legazpi Village Atelier)'}
Date: ${orderData.preferredDate}
Time: ${orderData.preferredTime}${addressText}

SPECIAL INSTRUCTIONS:
${orderData.specialInstructions?.trim() || 'None'}

Please confirm product availability and the final order details.

Thank you!`;
}

/**
 * Constructs a custom celebration or bulk order inquiry message.
 */
export function buildCustomOrderInquiry(data: CustomOrderInquiryData): string {
  return `Hello Harong Bakehouse! ✨

I'd like to inquire about a custom order:

Client Name: ${data.fullName}
Contact: ${data.contactNumber}${data.email ? `\nEmail: ${data.email}` : ''}

Event Type: ${data.eventType}
Event Date: ${data.eventDate}
Guest Count: ${data.guestCount}
Desired Item / Theme: ${data.preferredProduct}
${data.budgetRange ? `Target Budget: ${data.budgetRange}` : ''}

Project Details & Notes:
${data.details}

Looking forward to your consultation and availability!`;
}

/**
 * Safely opens Facebook Messenger with fallback handling.
 */
export function openMessenger(message?: string): void {
  const targetUrl = MESSENGER_CONFIG.pageUrl;
  
  if (!targetUrl || targetUrl === 'https://m.me/YOUR_PAGE_USERNAME') {
    // If not configured, fall back to safe prompt or informational window
    console.warn('Messenger URL is a demonstration placeholder.');
  }

  // Open in a new tab safely
  if (typeof window !== 'undefined') {
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  }
}

/**
 * Copies the constructed inquiry message to the user's clipboard.
 */
export async function copyInquiryMessage(message: string): Promise<boolean> {
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(message);
      return true;
    } catch (err) {
      console.error('Failed to copy to clipboard', err);
    }
  }

  // Fallback for older browsers
  try {
    const textArea = document.createElement('textarea');
    textArea.value = message;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error('Fallback copy failed', err);
    return false;
  }
}


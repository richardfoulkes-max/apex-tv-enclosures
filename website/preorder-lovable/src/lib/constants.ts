// TODO: Replace 971XXXXXXXXX with actual WhatsApp Business number
export const WHATSAPP_NUMBER = "971XXXXXXXXX";
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=I'd%20like%20to%20reserve%20an%20ATE-75`;

export function openWhatsApp() {
  // GA4 conversion tracking
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", "generate_lead", {
      currency: "AED",
      value: 375,
      event_category: "conversion",
      event_label: "whatsapp_reserve",
    });
  }
  window.open(WHATSAPP_LINK, "_blank");
}

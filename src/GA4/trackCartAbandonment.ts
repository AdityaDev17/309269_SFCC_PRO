// utils/trackCartAbandonment.ts
import analytics from "@/lib/analytics"; // path to your analytics.js

export const trackCartAbandonment = (cartItems: any[]) => {
  if (!cartItems || cartItems.length === 0) return;

  analytics.track("cart_abandoned", {
    item_id: [{hello:"item.productId"}],
    item_name: "item.name",
    price: "item.price",
    userID: "Pilkit",
    currency: "INNNN",
    debug_mode: true,
  });
};

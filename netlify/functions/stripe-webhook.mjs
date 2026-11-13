import { getStore } from "@netlify/blobs";
import { PRODUCT_SLUG, json, stripeClient } from "./_shared.mjs";

export async function handler(event) {
  if (event.httpMethod !== "POST") return json(405, { error: "Method not allowed" });
  if (!process.env.STRIPE_WEBHOOK_SECRET) return json(503, { error: "Webhook is not configured" });

  let stripeEvent;
  try {
    stripeEvent = stripeClient().webhooks.constructEvent(
      event.body,
      event.headers["stripe-signature"],
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.warn("stripe_webhook_rejected", error.message);
    return json(400, { error: "Invalid signature" });
  }

  if (stripeEvent.type === "checkout.session.completed") {
    const session = stripeEvent.data.object;
    if (session.payment_status === "paid" && session.metadata?.product_slug === PRODUCT_SLUG) {
      const orders = getStore("gentleman-strategist-orders");
      await orders.setJSON(session.id, {
        sessionId: session.id,
        productSlug: PRODUCT_SLUG,
        paymentStatus: "paid",
        fulfilledAt: new Date().toISOString()
      }, { onlyIfNew: true });
      console.log("playbook_fulfillment_recorded", session.id);
    }
  }

  return json(200, { received: true });
}


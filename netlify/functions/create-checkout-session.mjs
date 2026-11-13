import { PRODUCT_SLUG, json, siteUrl, stripeClient } from "./_shared.mjs";

export async function handler(event) {
  if (event.httpMethod !== "POST") return json(405, { error: "Method not allowed" });
  if (!process.env.STRIPE_PRICE_ID) return json(503, { error: "Checkout is not configured" });

  try {
    const stripe = stripeClient();
    const base = siteUrl();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
      allow_promotion_codes: false,
      billing_address_collection: "auto",
      customer_creation: "always",
      payment_intent_data: { metadata: { product_slug: PRODUCT_SLUG } },
      metadata: { product_slug: PRODUCT_SLUG },
      success_url: `${base}/gentleman-strategist/order-success/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/gentleman-strategist/#playbook`
    });
    return json(200, { url: session.url });
  } catch (error) {
    console.error("checkout_session_create_failed", error);
    return json(500, { error: "Unable to start checkout" });
  }
}


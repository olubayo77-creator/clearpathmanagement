import { PRODUCT_SLUG, json, stripeClient } from "./_shared.mjs";

export async function handler(event) {
  if (event.httpMethod !== "GET") return json(405, { error: "Method not allowed" });
  const sessionId = event.queryStringParameters?.session_id;
  if (!sessionId || !/^cs_(test_)?[A-Za-z0-9_]+$/.test(sessionId)) return json(400, { error: "Invalid order" });

  try {
    const session = await stripeClient().checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent"]
    });
    const paymentIntent = session.payment_intent;
    const fulfilled =
      session.payment_status === "paid" &&
      session.metadata?.product_slug === PRODUCT_SLUG &&
      typeof paymentIntent === "object" &&
      paymentIntent?.metadata?.fulfilled === "true" &&
      paymentIntent?.metadata?.checkout_session_id === session.id;
    return json(200, { fulfilled });
  } catch (error) {
    console.warn("order_status_lookup_failed", error.message);
    return json(404, { fulfilled: false });
  }
}

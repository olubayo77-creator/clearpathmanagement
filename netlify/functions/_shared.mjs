import Stripe from "stripe";

export const PRODUCT_SLUG = "gentleman-strategist-30-day-playbook";

export function stripeClient() {
  if (!process.env.STRIPE_SECRET_KEY) throw new Error("STRIPE_SECRET_KEY is not configured");
  return new Stripe(process.env.STRIPE_SECRET_KEY);
}

export function siteUrl() {
  return (process.env.SITE_URL || "https://clearpathmanagement.com").replace(/\/$/, "");
}

export function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff"
    },
    body: JSON.stringify(body)
  };
}


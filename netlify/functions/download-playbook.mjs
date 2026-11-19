import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { PRODUCT_SLUG, stripeClient } from "./_shared.mjs";

const encryptedAsset = path.join(process.cwd(), "netlify", "functions", "assets", "gentleman-strategist-30-day-playbook.pdf.enc");

export async function handler(event) {
  if (event.httpMethod !== "GET") return { statusCode: 405, body: "Method not allowed" };
  const sessionId = event.queryStringParameters?.session_id;
  if (!sessionId || !/^cs_(test_)?[A-Za-z0-9_]+$/.test(sessionId)) return { statusCode: 400, body: "Invalid order" };
  if (!process.env.PLAYBOOK_ENCRYPTION_KEY) return { statusCode: 503, body: "Delivery is not configured" };

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
    if (!fulfilled) return { statusCode: 403, body: "This purchase has not been fulfilled" };

    const packed = await fs.readFile(encryptedAsset);
    const iv = packed.subarray(0, 12);
    const tag = packed.subarray(12, 28);
    const ciphertext = packed.subarray(28);
    const key = Buffer.from(process.env.PLAYBOOK_ENCRYPTION_KEY, "base64");
    const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
    decipher.setAuthTag(tag);
    const pdf = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
    return {
      statusCode: 200,
      isBase64Encoded: true,
      headers: {
        "content-type": "application/pdf",
        "content-disposition": "attachment; filename=gentleman-strategist-30-day-playbook.pdf",
        "cache-control": "private, no-store",
        "x-content-type-options": "nosniff"
      },
      body: pdf.toString("base64")
    };
  } catch (error) {
    console.error("playbook_delivery_failed", error);
    return { statusCode: 500, body: "Unable to prepare the download" };
  }
}

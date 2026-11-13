import { getStore } from "@netlify/blobs";
import { json } from "./_shared.mjs";

export async function handler(event) {
  if (event.httpMethod !== "GET") return json(405, { error: "Method not allowed" });
  const sessionId = event.queryStringParameters?.session_id;
  if (!sessionId || !/^cs_(test_)?[A-Za-z0-9_]+$/.test(sessionId)) return json(400, { error: "Invalid order" });

  const order = await getStore("gentleman-strategist-orders").get(sessionId, { type: "json" });
  return json(200, { fulfilled: Boolean(order?.paymentStatus === "paid") });
}


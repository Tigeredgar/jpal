import { NextRequest, NextResponse } from "next";
import { revalidateTag } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    // Strictly speaking, we should verify the HMAC here using SHOPIFY_WEBHOOK_SECRET
    // const hmac = req.headers.get("x-shopify-hmac-sha256");

    revalidateTag("products");

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return NextResponse.json({ error: "Error revalidating" }, { status: 500 });
  }
}

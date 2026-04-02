import { NextRequest, NextResponse } from "next/server";
import { shopifyFetch } from "@/lib/shopify";

export async function POST(req: NextRequest) {
  try {
    const { items } = await req.json();

    const lineItems = items.map((item: any) => {
      const variantTitle = [item.variant.name, item.size === 'ONE SIZE' ? null : item.size].filter(Boolean).join(' / ');
      const matchingVariant = item.product.shopifyVariants?.find((v: any) => v.title === variantTitle || v.title.includes(item.variant.name));

      return {
        merchandiseId: matchingVariant?.id || item.product.shopifyVariants[0].id,
        quantity: item.qty
      };
    });

    const query = `
      mutation cartCreate($input: CartInput!) {
        cartCreate(input: $input) {
          cart { checkoutUrl }
          userErrors { field message }
        }
      }
    `;

    const res = await shopifyFetch<any>({
      query,
      variables: { input: { lines: lineItems } },
      cache: "no-store"
    });

    const checkoutUrl = res?.body?.data?.cartCreate?.cart?.checkoutUrl;

    if (!checkoutUrl) {
      console.error("Shopify Checkout Error:", res.body.data.cartCreate.userErrors);
      return NextResponse.json({ error: "Failed to create checkout" }, { status: 400 });
    }

    return NextResponse.json({ checkoutUrl });
  } catch (e) {
    console.error("Checkout API Route Error:", e);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

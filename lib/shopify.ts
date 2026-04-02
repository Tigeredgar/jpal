import { mockProducts } from "./mockData";

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export async function shopifyFetch<T>({ 
  cache = "force-cache", 
  headers, 
  query, 
  tags, 
  variables 
}: { 
  cache?: RequestCache; 
  headers?: HeadersInit; 
  query: string; 
  tags?: string[]; 
  variables?: any; 
}): Promise<{ status: number; body: T } | never> {
  try {
    const result = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken!,
        ...headers,
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables }),
      }),
      cache,
      ...(tags && { next: { tags } }),
    });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body,
    };
  } catch (e) {
    throw {
      error: e,
      query,
    };
  }
}

export async function getMergedProducts() {
  const query = `
    query getProducts {
      products(first: 250) {
        edges {
          node {
            handle
            title
            description
            availableForSale
            productType
            options { name values }
            priceRange { minVariantPrice { amount } }
            images(first: 5) {
              edges { node { url altText } }
            }
            variants(first: 20) {
              edges { 
                node { 
                  id title price { amount } availableForSale 
                  image { url altText } 
                } 
              }
            }
          }
        }
      }
    }
  `;
  try {
     const res = await shopifyFetch<any>({ 
       query, 
       tags: ["products"], 
       cache: "force-cache" 
     });
     const sp = res.body.data.products.edges.map((e: any) => e.node);
     
     return sp.map((p: any, idx: number) => {
         const leftPos = idx % 2 === 0 ? 15 + Math.random() * 20 : 55 + Math.random() * 20;
         const topPos = 5 + (idx * 20);
         
         const variants = p.variants.edges.map((e: any) => e.node);
         
         let inferType = 'case';
         if (p.title.toLowerCase().includes('hoodie')) inferType = 'hoodie';
         if (p.title.toLowerCase().includes('shirt')) inferType = 'shirt';

         return {
            id: p.handle,
            handle: p.handle,
            title: p.title,
            type: inferType,
            desc: p.description || "The newest drop from the latest collection.",
            price: parseFloat(p.priceRange.minVariantPrice.amount),
            availableForSale: p.availableForSale,
            shopifyVariants: variants,
            options: p.options,
            imageUrl: p.images?.edges?.[0]?.node?.url || null,
            allImages: p.images?.edges?.map((e: any) => e.node.url) || [],
            pos: { top: `${topPos}%`, left: `${leftPos}%` },
            gradient: "radial-gradient(circle at 50% 50%, #2f2f2f 0%, #000000 100%)",
         }
     });
  } catch(e) {
     console.error("Shopify fetch failed, falling back to mock UI data", e);
     return mockProducts.map(mp => ({ ...mp, availableForSale: true, shopifyVariants: [] }));
  }
}

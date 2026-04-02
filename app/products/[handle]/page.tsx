import { notFound } from "next/navigation";
import ProductMock from "@/components/ProductMock";
import ProductViewWrapper from "./ProductViewWrapper";
import { getMergedProducts } from "@/lib/shopify";

export async function generateStaticParams() {
  const products = await getMergedProducts();
  return products.map((p: any) => ({
    handle: p.handle,
  }));
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const products = await getMergedProducts();
  const product = products.find((p: any) => p.handle === handle);

  return <ProductViewWrapper product={product} />;
}

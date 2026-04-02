import { getMergedProducts } from "@/lib/shopify";
import Gallery from "@/components/Gallery";

export default async function Home() {
  const products = await getMergedProducts();

  return (
    <main className="relative min-h-[300vh] w-full text-white font-sans overflow-x-hidden">
      
      {/* Moving Grayscale Gradient Background */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-gradient-to-br from-white via-gray-400 to-black bg-[length:150%_150%] animate-mesh">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>
      
      {/* Floating Products powered by Live Shopify state */}
      <Gallery products={products} />
    </main>
  );
}

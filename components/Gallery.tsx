"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ProductMock from "./ProductMock";

export default function Gallery({ products }: { products: any[] }) {
  return (
    <>
      {products.map((product, idx) => {
        const yBounce = [0, -20 - (idx * 5), 0];
        const duration = 5 + (idx % 3);
        
        return (
          <div 
            key={product.id}
            className="absolute cursor-pointer group"
            style={{ top: product.pos.top, left: product.pos.left }}
          >
            <Link href={`/products/${product.handle}`}>
              <motion.div 
                animate={{ y: yBounce }}
                transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-28 sm:w-36 lg:w-44 aspect-[1/2.1] hover:scale-110 hover:-rotate-6 transition-all duration-300 pointer-events-auto"
              >
                <div className="w-full h-full">
                  {product.imageUrl ? (
                     <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover rounded-2xl drop-shadow-2xl" />
                  ) : (
                     <ProductMock product={product} />
                  )}
                  {!product.availableForSale && (
                     <div className="absolute inset-0 bg-black/40 flex items-center justify-center font-bold tracking-widest text-[#ff4d4d] z-50 rounded backdrop-blur-sm shadow-xl border border-red-500 text-[10px]">SOLD OUT</div>
                  )}
                </div>
              </motion.div>
            </Link>
          </div>
        );
      })}
    </>
  );
}

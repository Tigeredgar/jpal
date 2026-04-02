"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/components/CartContext";
import ProductMock from "@/components/ProductMock";

export default function ProductViewWrapper({ product }: { product: any }) {
  const { addToCart } = useCart();
  
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>(() => {
    const defaultOpts: any = {};
    product.options?.forEach((opt: any) => {
      defaultOpts[opt.name] = opt.values[0];
    });
    return defaultOpts;
  });

  const handleOptionSelect = (optName: string, value: string) => {
    setSelectedOptions(prev => ({ ...prev, [optName]: value }));
  };

  const selectedVariantTitle = Object.values(selectedOptions).join(' / ');
  const matchingVariant = product.shopifyVariants?.find((v: any) => v.title === selectedVariantTitle || v.title.includes(Object.values(selectedOptions)[0]));
  const isAvailable = matchingVariant ? matchingVariant.availableForSale : product.availableForSale;

  const handleAddToCart = () => {
     let bgColor = '#fff';
     const selColor = selectedOptions['Color']?.toLowerCase() || '';
     if (selColor === 'black') bgColor = '#111';
     if (selColor === 'gray' || selColor === 'grey') bgColor = '#4a4a4a';
     if (selColor === 'super blue' || selColor === 'cyan') bgColor = '#43d9d9';
     if (selColor === 'neon red' || selColor === 'red') bgColor = '#ff4d4d';

     addToCart(
        product, 
        { name: selectedOptions['Color'] || 'Default', hex: bgColor }, 
        selectedOptions['Size'] || 'ONE SIZE'
     );
  };

  const overrideProduct = { ...product, activeColor: selectedOptions['Color'] };

  const displayImageUrl = matchingVariant?.image?.url || product.imageUrl;

  return (
    <main 
      className="fixed inset-0 min-h-screen w-full overflow-hidden transition-colors duration-1000 ease-in-out"
      style={{ background: product.gradient }}
    >
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
      
      {/* Centered Product */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -mt-10">
        <motion.div 
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-auto hover:scale-105 transition-transform duration-500 z-10 w-64 sm:w-80 lg:w-96 aspect-[1/2.1]"
        >
          {displayImageUrl ? (
            <img src={displayImageUrl} alt={product.title} className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]" />
          ) : (
            <ProductMock product={overrideProduct} />
          )}
        </motion.div>
      </div>

      {/* Info Pane (Bottom Right Glassmorphism) */}
      <div className="fixed bottom-6 right-6 w-[22rem] bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-white font-mono shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-20">
        <div className="flex items-start justify-between mb-2">
           <div className="uppercase font-bold text-base tracking-[0.2em]">{product.title}</div>
           {!isAvailable && <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded shadow tracking-widest">SOLD OUT</span>}
        </div>
        <p className="text-white/70 leading-relaxed text-xs mb-6 lowercase tracking-wide font-sans text-justify">
          {product.desc}
        </p>
        
        {product.options?.map((opt: any, idx: number) => (
          <div key={idx} className="mb-6">
            <div className="text-[10px] uppercase tracking-widest mb-3 text-white/50">
              {opt.name} [ <span className="text-white font-bold">{selectedOptions[opt.name]}</span> ]
            </div>
            
            {opt.name.toLowerCase() === 'color' ? (
              <div className="flex gap-3">
                {opt.values.map((v: string, i: number) => {
                  let bgColor = '#fff';
                  if (v.toLowerCase() === 'black') bgColor = '#111';
                  if (v.toLowerCase() === 'gray' || v.toLowerCase() === 'grey') bgColor = '#4a4a4a';
                  if (v.toLowerCase() === 'super blue' || v.toLowerCase() === 'cyan') bgColor = '#43d9d9';
                  if (v.toLowerCase() === 'neon red' || v.toLowerCase() === 'red') bgColor = '#ff4d4d';

                  return (
                    <button 
                      key={i} 
                      onClick={() => handleOptionSelect(opt.name, v)}
                      className={`w-5 h-5 rounded-full ${selectedOptions[opt.name] === v ? 'shadow-[0_0_0_2px_#fff] scale-110' : 'opacity-70 hover:opacity-100 transition-opacity'}`}
                      style={{ backgroundColor: bgColor }}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 text-[10px] uppercase font-bold tracking-widest text-center">
                {opt.values.map((v: string, i: number) => (
                  <button 
                    key={i} 
                    onClick={() => handleOptionSelect(opt.name, v)}
                    className={`${v === selectedOptions[opt.name] ? 'bg-white text-black shadow-sm' : 'border border-white/20 hover:bg-white/10 transition-colors text-white'} py-2 rounded-md`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        
        <div className="text-[10px] text-white/40 mb-4 uppercase tracking-widest border-b border-white/10 pb-4 text-center">
          Begins Shipping 2/17
        </div>

        <button 
          onClick={handleAddToCart}
          disabled={!isAvailable}
          className={`w-full py-3 mt-2 font-bold flex items-center justify-between px-4 hover:bg-gray-200 transition-all uppercase tracking-[0.2em] rounded-md active:scale-95 ${isAvailable ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'bg-white/20 text-white/50 cursor-not-allowed shadow-none'}`}
        >
          <span>{isAvailable ? "Add to Cart" : "Sold Out"}</span>
          <span>${product.price.toFixed(2)}</span>
        </button>
      </div>
    </main>
  );
}

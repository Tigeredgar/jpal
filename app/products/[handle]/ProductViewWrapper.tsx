"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/components/CartContext";
import ProductMock from "@/components/ProductMock";

export default function ProductViewWrapper({ product }: { product: any }) {
  const { addToCart } = useCart();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  
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

  let displayImages = product.allImages || [];
  if (matchingVariant?.image?.url) {
     displayImages = [matchingVariant.image.url, ...displayImages.filter((url: string) => url !== matchingVariant.image.url)];
  }
  if (!displayImages.length && product.imageUrl) displayImages = [product.imageUrl];

  const renderOptions = () => (
    <>
      <div className="flex items-start justify-between mb-2">
         <div className="uppercase font-bold text-base tracking-[0.2em]">{product.title}</div>
         {!isAvailable && <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded shadow tracking-widest">SOLD OUT</span>}
      </div>
      <p className="text-white/70 leading-relaxed text-[11px] mb-6 lowercase tracking-wide font-sans text-justify">
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
                    onClick={(e) => { e.stopPropagation(); handleOptionSelect(opt.name, v); }}
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
                  onClick={(e) => { e.stopPropagation(); handleOptionSelect(opt.name, v); }}
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
    </>
  );

  return (
    <main 
      className="fixed inset-0 min-h-screen w-full overflow-hidden transition-colors duration-1000 ease-in-out"
      style={{ background: product.gradient }}
    >
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
      
      {/* Product Image Carousel */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -mt-32 md:-mt-10">
        <div className="pointer-events-auto z-10 w-full overflow-x-auto snap-x snap-mandatory flex py-10 px-4 md:px-0 scrollbar-hide">
          {displayImages && displayImages.length > 0 ? (
            displayImages.map((img: string, i: number) => (
               <div key={i} className="flex-shrink-0 w-full md:w-auto md:min-w-[300px] flex justify-center snap-center px-4">
                 <img src={img} alt={`${product.title} - Image ${i + 1}`} className="w-64 sm:w-72 md:w-80 lg:w-96 aspect-[1/2.1] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]" />
               </div>
            ))
          ) : (
            <div className="flex-shrink-0 w-full md:w-auto flex justify-center snap-center px-4">
              <div className="w-64 sm:w-80 lg:w-96 aspect-[1/2.1]">
                <ProductMock product={overrideProduct} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Info Pane */}
      <div className="hidden md:block fixed bottom-6 right-6 w-[22rem] bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-white font-mono shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-20">
        {renderOptions()}
        <button 
          onClick={handleAddToCart}
          disabled={!isAvailable}
          className={`w-full py-3 mt-2 font-bold flex items-center justify-between px-4 hover:bg-gray-200 transition-all uppercase tracking-[0.2em] rounded-md active:scale-95 ${isAvailable ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'bg-white/20 text-white/50 cursor-not-allowed shadow-none'}`}
        >
          <span>{isAvailable ? "Add to Cart" : "Sold Out"}</span>
          <span>${product.price.toFixed(2)}</span>
        </button>
      </div>

      {/* Mobile Bottom Sheet Configurator */}
      <div className="md:hidden fixed bottom-6 left-4 right-4 z-20 flex flex-col items-center pointer-events-none">
        <motion.div 
           layout
           initial={false}
           className="w-full bg-white/5 backdrop-blur-[30px] border border-white/20 rounded-[20px] overflow-hidden text-white shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative pointer-events-auto"
           transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        >
           <AnimatePresence>
             {isSheetOpen && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-6 pt-5 pb-2 font-mono flex flex-col"
                >
                  <div className="w-full flex justify-center mb-6 cursor-pointer" onClick={(e) => { e.stopPropagation(); setIsSheetOpen(false); }}>
                     <div className="w-12 h-1 bg-white/40 rounded-full" />
                  </div>
                  {renderOptions()}
                </motion.div>
             )}
           </AnimatePresence>
           
           {/* Mobile Add to Cart Bar (Static Footer) */}
           <div className="p-2 w-full">
              <button 
                 onClick={(e) => { 
                   e.stopPropagation(); 
                   if (!isSheetOpen) { setIsSheetOpen(true); } 
                   else if (isAvailable) { handleAddToCart(); } 
                 }}
                 className="w-full bg-white text-[#5a6b7c] rounded-xl flex justify-between items-center px-4 py-4 font-bold tracking-widest text-xs uppercase shadow-sm active:scale-95 transition-transform"
              >
                 <span>{isSheetOpen ? (isAvailable ? "Add to Cart" : "Sold Out") : "Add to Cart"}</span>
                 <span>${product.price.toFixed(2)}</span>
              </button>
           </div>
        </motion.div>
      </div>

    </main>
  );
}

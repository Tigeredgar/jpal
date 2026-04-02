"use client";

import Link from "next/link";
import Cart from "./Cart";
import { useCart } from "./CartContext";

export default function Header() {
  const { isCartOpen, setIsCartOpen, cartItems } = useCart();
  
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-4 sm:p-6 flex justify-between items-start pointer-events-none relative">
      <div className="flex gap-2 pointer-events-auto items-center">
        <Link 
          href="/" 
          className="flex items-center justify-center px-6 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/20 text-white font-black tracking-[0.2em] uppercase hover:bg-white/10 transition-colors shadow-sm text-xl lg:text-3xl"
        >
          DIVINE
        </Link>
        <button 
          onClick={() => setIsCartOpen(!isCartOpen)} 
          className="flex items-center justify-center px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/20 text-white text-sm hover:bg-white/10 transition-colors shadow-sm font-medium"
        >
          {totalItems > 0 ? (
             <span className="mr-2 bg-white text-[#5a6b7c] w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold shadow-inner">{totalItems}</span>
          ) : (
             <span className="mr-1 opacity-70">0</span>
          )}
          +
        </button>
      </div>

      <div className="pointer-events-auto pt-2">
        <button className="text-white text-xs tracking-widest hover:text-white/70 transition-colors uppercase mix-blend-difference font-semibold">
          [ $USD ]
        </button>
      </div>

      {isCartOpen && <Cart onClose={() => setIsCartOpen(false)} />}
    </header>
  );
}

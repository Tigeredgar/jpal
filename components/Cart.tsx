"use client";

import { X } from "lucide-react";
import ProductMock from "./ProductMock";
import { useCart } from "./CartContext";
import { useState } from "react";

interface CartProps {
  onClose: () => void;
}

export default function Cart({ onClose }: CartProps) {
  const { cartItems, removeFromCart, updateQty } = useCart();
  const [loading, setLoading] = useState(false);
  
  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.qty), 0);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cartItems }),
      });
      const data = await res.json();
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        alert("Checkout initialization failed. Check console.");
      }
    } catch(e) {
      console.error(e);
      alert("Checkout error.");
    }
    setLoading(false);
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-black/30 backdrop-blur-md pointer-events-auto z-40 transition-opacity" 
        onClick={onClose} 
      />
      
      {/* Centered Cart Container */}
      <div className="fixed top-6 left-4 right-4 sm:left-auto sm:right-6 sm:w-[24rem] sm:max-h-[85vh] bg-[#e3e6e3]/95 backdrop-blur-3xl rounded-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-white/40 font-sans text-gray-800 z-50 pointer-events-auto flex flex-col overflow-hidden max-h-[90vh]">
      <div className="flex justify-between items-center p-4 border-b border-black/10 shrink-0">
        <h2 className="font-bold text-lg text-[#5a6b7c]">Cart</h2>
        <button onClick={onClose} className="text-[#5a6b7c] hover:text-black transition-colors">
          <X size={20} className="font-light" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {cartItems.length === 0 ? (
           <div className="p-8 text-center text-[#7d8b99] tracking-widest text-[10px] uppercase font-mono">Cart is empty</div>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="p-4 flex gap-4 bg-gradient-to-b from-transparent to-black/5 border-b border-black/5">
              <div className="w-16 h-24 rounded shadow-[0_5px_15px_rgba(0,0,0,0.2)] relative border border-white/20 bg-[#595959] overflow-hidden flex items-center justify-center shrink-0">
                {(() => {
                   const variantTitle = [item.variant.name, item.size === 'ONE SIZE' ? null : item.size].filter(Boolean).join(' / ');
                   const matchingVariant = item.product.shopifyVariants?.find((v: any) => v.title === variantTitle || v.title.includes(item.variant.name));
                   const imgUrl = matchingVariant?.image?.url || item.product.imageUrl;
                   
                   return imgUrl ? (
                     <img src={imgUrl} alt={item.product.title} className="w-full h-full object-cover" />
                   ) : (
                     <div className="w-[120%] h-[120%] -mt-1"><ProductMock product={{...item.product, activeColor: item.variant.name}} /></div>
                   );
                })()}
              </div>
              <div className="flex-1 text-xs">
                <div className="flex justify-between font-bold mb-1 tracking-wider text-[#5a6b7c]">
                  <span className="font-mono uppercase flex-1 truncate">{item.product.title}</span>
                  <span className="font-mono pl-2">${(item.product.price * item.qty).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#7d8b99] mb-1 font-mono uppercase text-[9px]">
                  <span className="flex items-center">{item.variant.name} <span className="inline-block w-[6px] h-[6px] border border-black/10 rounded-full ml-1" style={{ backgroundColor: item.variant.hex || (item.variant.colorClass && item.product.type === 'case' ? item.variant.colorClass.replace('bg-[', '').replace(']', '') : '#111') }} /></span>
                  <span>SIZE: {item.size}</span>
                </div>
                <div className="text-[#9aa4b0] mb-4 text-[10px] font-mono tracking-tighter">Begins Shipping June 1st</div>
                
                <div className="flex justify-between items-center text-[#7d8b99] font-mono text-[10px]">
                  <span className="flex items-center gap-1">
                     QTY - 
                     <button onClick={() => updateQty(item.id, -1)} className="px-1 hover:text-black transition-colors">-</button>
                     {item.qty}
                     <button onClick={() => updateQty(item.id, 1)} className="px-1 hover:text-black transition-colors">+</button>
                  </span>
                  <button onClick={() => removeFromCart(item.id)} className="bg-black/10 px-2 py-1 rounded text-white font-bold mix-blend-multiply hover:bg-black/20 transition-colors">DELETE</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-4 border-t border-black/10 text-xs font-bold text-[#5a6b7c] shrink-0">
        <div className="flex justify-between mb-1 pb-1">
          <span>Shipping</span>
          <span className="text-right text-[#7d8b99]">Calculated at checkout</span>
        </div>
        <div className="flex justify-between mb-4">
          <span>Subtotal</span>
          <span className="text-right">${subtotal.toFixed(2)}</span>
        </div>

        <button 
          onClick={handleCheckout}
          disabled={cartItems.length === 0 || loading}
          className="w-full bg-white text-[#5a6b7c] font-black tracking-widest uppercase rounded py-3 shadow-sm hover:shadow-md transition-shadow active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50" 
        >
          {loading ? (
             <span className="animate-pulse">Loading...</span>
          ) : (
             "CHECKOUT"
          )}
        </button>
      </div>
      
      <div className="flex items-center justify-center p-3 opacity-20 bg-black/5 mix-blend-multiply shrink-0">
        <div className="w-6 h-2 bg-black rounded-full skew-x-12" />
        <div className="w-3 h-2 bg-black rounded-full -skew-x-12 ml-1" />
      </div>
    </div>
    </>
  );
}

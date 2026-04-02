export default function HoodieMock({ product }: { product?: any }) {
  const colorStr = product?.activeColor || product?.shopifyVariants?.[0]?.title;
  const isLight = colorStr?.toLowerCase().includes('white') || false;
  const fabricColor = isLight ? "bg-[#eeeeee]" : "bg-[#121212]";
  const sleeveColor = isLight ? "bg-[#e5e5e5]" : "bg-[#141414]";
  const trimColor = isLight ? "bg-[#d4d4d4]" : "bg-[#0a0a0a]";
  const hoodColor = isLight ? "bg-[#f5f5f5]" : "bg-[#0f0f0f]";
  const textColor = isLight ? "text-black/90" : "text-white/90";
  const seamColor = isLight ? "bg-black/10" : "bg-black";
  
  return (
    <div className="w-[130%] h-[130%] relative flex items-center justify-center translate-y-[10%] drop-shadow-2xl">
      {/* Body */}
      <div className={`w-[65%] h-[75%] ${fabricColor} shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-10 flex flex-col items-center relative rounded-b-md rounded-t-2xl overflow-hidden border border-black/5`}>
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-black/40 pointer-events-none mix-blend-overlay" />
         
         {/* Text on back */}
         <div className="mt-[45%] text-center px-2 z-20 opacity-90 mx-2">
            <span className={`${textColor} font-sans font-black text-[clamp(14px,5cqw,24px)] uppercase tracking-tighter leading-[1.0] block drop-shadow-sm`}>
              JUST<br/>PRAY<br/>A LOT
            </span>
         </div>

         {/* Bottom ribbing */}
         <div className={`absolute bottom-0 w-full h-[10%] ${trimColor} border-t border-black/5 opacity-90`} />
      </div>
      
      {/* Sleeves (Long) */}
      <div className={`absolute top-[15%] left-[2%] w-[25%] h-[60%] ${sleeveColor} rounded-l-3xl rounded-b-xl -rotate-[12deg] z-0 shadow-lg border border-black/5 flex flex-col justify-end overflow-hidden origin-top-right`}>
        <div className={`w-full h-[15%] ${trimColor} rounded-b-xl border-t border-black/5`} />
      </div>
      <div className={`absolute top-[15%] right-[2%] w-[25%] h-[60%] ${sleeveColor} rounded-r-3xl rounded-b-xl rotate-[12deg] z-0 shadow-lg border border-black/5 flex flex-col justify-end overflow-hidden origin-top-left`}>
        <div className={`w-full h-[15%] ${trimColor} rounded-b-xl border-t border-black/5`} />
      </div>

      {/* Hood resting on the back */}
      <div className={`absolute top-[0%] w-[45%] h-[35%] ${hoodColor} rounded-b-[50%] z-20 shadow-[0_15px_15px_rgba(0,0,0,0.3)] border border-black/5 flex items-end justify-center pb-2`}>
         {/* Center Seam */}
         <div className={`w-[1px] h-[50%] ${seamColor} shadow-[1px_0_1px_rgba(255,255,255,0.1)]`} />
      </div>
    </div>
  );
}

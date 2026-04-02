export default function ShirtMock({ product }: { product?: any }) {
  const colorStr = product?.activeColor || product?.shopifyVariants?.[0]?.title;
  const isLight = colorStr?.toLowerCase().includes('white') || false;
  const fabricColor = isLight ? "bg-[#eeeeee]" : "bg-[#1a1a1a]";
  const sleeveColor = isLight ? "bg-[#e5e5e5]" : "bg-[#1a1a1a]";
  const trimColor = isLight ? "bg-[#d4d4d4]" : "bg-[#0d0d0d]";
  const textColor = isLight ? "text-black/90" : "text-white/90";

  return (
    <div className="w-[80%] h-[80%] relative flex items-center justify-center drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
      {/* Left Sleeve */}
      <div className={`absolute top-[10%] left-[8%] w-[35%] h-[40%] ${sleeveColor} rounded-xl -rotate-[15deg] shadow-lg`} />
      {/* Right Sleeve */}
      <div className={`absolute top-[10%] right-[8%] w-[35%] h-[40%] ${sleeveColor} rounded-xl rotate-[15deg] shadow-lg`} />
      
      {/* Body */}
      <div className={`absolute top-[0%] w-[45%] h-[95%] ${fabricColor} rounded-2xl shadow-2xl z-10 flex flex-col items-center`}>
         <div className={`absolute top-0 w-[35%] h-[8%] ${trimColor} rounded-b-full shadow-inner border-b border-black/10`} />
         
         <div className={`mt-[40%] font-sans font-black ${textColor} text-[18px] leading-[1.0] uppercase flex flex-col items-center tracking-tighter text-center`}>
           <span>JUST</span>
           <span>PRAY</span>
           <span>A LOT</span>
         </div>
      </div>
    </div>
  );
}

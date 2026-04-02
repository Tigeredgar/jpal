export default function CaseMock({ product }: { product?: any }) {
  const colorStr = product?.activeColor || product?.shopifyVariants?.[0]?.title;
  const isLight = colorStr?.toLowerCase().includes('white') || false;
  const textColor = isLight ? "text-black/80" : "text-white/80";

  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-black/30 mix-blend-overlay pointer-events-none" />
      
      {/* Camera bump area */}
      <div className="absolute top-[8%] left-[10%] w-[40%] aspect-square bg-black/10 rounded-[30%] p-[3%] grid grid-cols-2 gap-[5%] backdrop-blur-md shadow-inner border border-black/10 relative">
         <div className="bg-black/90 w-full h-full rounded-full shadow-[inset_0_1px_3px_rgb(0,0,0)] relative" />
         <div className="bg-black/90 w-[80%] h-[80%] rounded-full shadow-[inset_0_1px_3px_rgb(0,0,0)] relative place-self-end mr-[5%] mb-[5%]" />
         <div className="bg-black/90 w-full h-full rounded-full shadow-[inset_0_1px_3px_rgb(0,0,0)] relative" />
         <div className="w-[40%] h-[40%] bg-white/40 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)] relative place-self-center mt-[10%]" />
      </div>

      {/* Logo text */}
      <div className={`absolute top-[35%] text-[24px] lg:text-[4cqw] font-black tracking-tighter leading-[1.0] ${textColor} uppercase w-full text-center drop-shadow-sm`}>
        JUST<br/>PRAY<br/>A LOT
      </div>

      {/* Center logo shape emboss */}
      <div className="absolute top-[75%] w-[40%] h-[12%] bg-black/10 rounded-full blur-[1px] mix-blend-multiply flex items-center justify-center opacity-0"></div>
    </>
  );
}

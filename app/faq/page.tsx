export default function FAQPage() {
  return (
    <main className="fixed inset-0 min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-black z-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 text-white w-full max-w-2xl shadow-2xl relative z-10 font-mono max-h-[80vh] overflow-y-auto">
        <h1 className="text-2xl font-black tracking-[0.2em] uppercase mb-8 text-center">FAQ</h1>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase mb-2 text-white/50">When will my order ship?</h3>
            <p className="leading-relaxed text-xs">Orders process within 1-2 business days. You will receive a tracking link once your order leaves our warehouse.</p>
          </div>
          
          <div>
            <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase mb-2 text-white/50">Do you ship internationally?</h3>
            <p className="leading-relaxed text-xs">Yes, we ship almost everywhere. Duties and taxes are determined at checkout.</p>
          </div>
        </div>
      </div>
    </main>
  );
}

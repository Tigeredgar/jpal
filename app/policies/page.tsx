export default function PoliciesPage() {
  return (
    <main className="fixed inset-0 min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-black z-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 text-white w-full max-w-2xl shadow-2xl relative z-10 font-mono max-h-[80vh] overflow-y-auto hidden-scrollbar">
        <h1 className="text-2xl font-black tracking-[0.2em] uppercase mb-8 text-center">Policies</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-[10px] font-bold tracking-widest uppercase mb-2 text-white/50">Shipping</h2>
            <p className="leading-relaxed text-xs text-white/90">Orders are typically processed within 1-2 business days. Domestic shipping takes 3-5 business days.</p>
          </section>
          
          <section>
            <h2 className="text-[10px] font-bold tracking-widest uppercase mb-2 text-white/50">Returns</h2>
            <p className="leading-relaxed text-xs text-white/90">We accept returns within 14 days of delivery. Items must be unworn, unwashed, and have original tags attached.</p>
          </section>
        </div>
      </div>
    </main>
  );
}

export default function ContactPage() {
  return (
    <main className="fixed inset-0 min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-black z-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 text-white w-full max-w-md shadow-2xl relative z-10 font-mono">
        <h1 className="text-2xl font-black tracking-[0.2em] uppercase mb-4 text-center">Contact</h1>
        <p className="text-[10px] text-white/70 mb-8 text-center uppercase tracking-widest">
          For inquiries or support.
        </p>
        
        <form className="flex flex-col gap-6 text-left">
          <div>
            <label className="block text-[10px] font-bold tracking-widest uppercase mb-1 text-white/50">Name</label>
            <input type="text" className="w-full border-b border-white/20 bg-transparent py-2 focus:outline-none focus:border-white transition-colors text-sm" />
          </div>
          <div>
            <label className="block text-[10px] font-bold tracking-widest uppercase mb-1 text-white/50">Email</label>
            <input type="email" className="w-full border-b border-white/20 bg-transparent py-2 focus:outline-none focus:border-white transition-colors text-sm" />
          </div>
          <button type="button" className="mt-4 bg-white text-black px-4 py-3 font-bold tracking-[0.2em] uppercase hover:bg-gray-200 transition-colors rounded-sm text-xs">
            Send Message
          </button>
        </form>
      </div>
    </main>
  );
}

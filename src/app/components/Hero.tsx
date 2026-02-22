import { Link } from "react-router";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-24 md:pt-32">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_left,_#6fccd4_0%,_#1a1a2e_45%,_#0f172a_100%)]">
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/45 to-black/20"></div>
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(120deg,_transparent_0%,_transparent_45%,_#ffffff_45%,_#ffffff_46%,_transparent_46%,_transparent_100%)]"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <h1 className="mb-6 text-4xl font-bold leading-tight text-[#f4fee8] sm:text-5xl md:text-6xl lg:text-7xl">
            Bienvenue à DIAEXPRESS
            <br />
            <span className="text-3xl text-[#d9ecff] sm:text-4xl md:text-5xl lg:text-6xl">
              Service de livraison internationale
            </span>
          </h1>

          <div className="mb-8 flex items-start gap-2">
            <div className="w-1 h-6 bg-[#f1580c]"></div>
            <div className="rounded border border-white/10 bg-[rgba(4,28,55,0.65)] px-4 py-2 backdrop-blur-sm">
              <p className="text-[#f4fee8] text-sm sm:text-base">Logistics & Supply Chain Solutions</p>
            </div>
          </div>

          <Link
            to="/track-shipment"
            className="inline-flex items-center gap-3 rounded-xl bg-[#f1580c] px-8 py-4 text-[#f4fee8] shadow-lg transition-all hover:scale-105 hover:bg-[#d14a0a]"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            <span className="text-lg font-medium">Suivez votre colis</span>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:block">
        <div className="animate-bounce">
          <svg className="w-6 h-6 text-[#f4fee8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}

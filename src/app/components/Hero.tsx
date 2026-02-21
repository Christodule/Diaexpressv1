import heroImage from "figma:asset/fecfec959c9da274c13eeb8681fe54b680ad65c8.png";
import { Link } from "react-router";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-32">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Shipping containers" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/50 to-black/30"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl">
          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#f4fee8] mb-6 leading-tight">
            Bienvenue à DIAEXPRESS
            <br />
            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">Service de livraison internationale</span>
          </h1>

          {/* Subtitle */}
          <div className="flex items-start gap-2 mb-8">
            <div className="w-1 h-6 bg-[#f1580c]"></div>
            <div className="bg-[rgba(4,28,55,0.7)] backdrop-blur-sm px-4 py-2 rounded">
              <p className="text-[#f4fee8] text-sm sm:text-base">Logistics & Supply Chain Solutions</p>
            </div>
          </div>

          {/* CTA Button */}
          <Link
            to="/track-shipment"
            className="inline-flex bg-[#f1580c] hover:bg-[#d14a0a] text-[#f4fee8] px-8 py-4 rounded-lg transition-all transform hover:scale-105 items-center gap-3 shadow-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            <span className="text-lg font-medium">Suivez votre colis</span>
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
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

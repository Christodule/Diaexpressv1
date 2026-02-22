import { Search } from "lucide-react";
import { Link } from "react-router";

export function TrackingSection() {
  return (
    <section id="tracking" className="relative py-16 md:py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFB629] via-[#FFDA56] to-[#FFD7A6]">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_#1a1a2e_0%,_transparent_65%)]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-3xl font-bold text-[#1a1a2e] sm:text-4xl md:text-5xl lg:text-6xl">
            Suivez votre colis en tout instant avec DIAEXPRESS
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white/90 shadow-2xl backdrop-blur-sm">
            <div className="bg-[#6fccd4] py-4 px-6 shadow-md">
              <h3 className="text-2xl font-bold text-center text-[#1a1a2e]">Envoyer un colis</h3>
            </div>

            <div className="p-6 sm:p-8 md:p-10">
              <form className="space-y-6" onSubmit={(event) => event.preventDefault()}>
                <div className="space-y-2">
                  <label htmlFor="depart" className="block text-sm font-semibold text-[#1a1a2e]">
                    Depart
                  </label>
                  <input
                    type="text"
                    id="depart"
                    placeholder="Ville de départ"
                    className="dx-input"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="arrivee" className="block text-sm font-semibold text-[#1a1a2e]">
                    Arrivee
                  </label>
                  <input
                    type="text"
                    id="arrivee"
                    placeholder="Ville d'arrivée"
                    className="dx-input"
                  />
                </div>

                <Link to="/track-shipment" className="dx-btn-primary w-full">
                  <Search className="h-4 w-4" />
                  Suivre mon colis
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TrackingSection() {
  return (
    <section id="tracking" className="relative py-16 md:py-24">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFB629] via-[#FFDA56] to-[#FFD7A6]">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_#1a1a2e_0%,_transparent_65%)]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a1a2e] mb-4">
            Suivez votre colis en tout instant avec DIAEXPRESS
          </h2>
        </div>

        {/* Tracking Form Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">
            {/* Form Header */}
            <div className="bg-[#6fccd4] py-4 px-6 shadow-md">
              <h3 className="text-2xl font-bold text-center text-[#1a1a2e]">Envoyer un colis</h3>
            </div>

            {/* Form Content */}
            <div className="p-6 sm:p-8 md:p-10">
              <form className="space-y-6">
                {/* Depart Field */}
                <div className="space-y-2">
                  <label htmlFor="depart" className="block text-2xl font-bold text-[#1a1a2e]">
                    Depart:
                  </label>
                  <input
                    type="text"
                    id="depart"
                    placeholder="Ville de départ"
                    className="w-full bg-[#f5f5f5] border-0 border-b-2 border-black px-4 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6fccd4] text-lg"
                  />
                </div>

                {/* Arrivée Field */}
                <div className="space-y-2">
                  <label htmlFor="arrivee" className="block text-2xl font-bold text-[#1a1a2e]">
                    Arrivée:
                  </label>
                  <input
                    type="text"
                    id="arrivee"
                    placeholder="Ville d'arrivée"
                    className="w-full bg-[#f5f5f5] border-0 border-b-2 border-black px-4 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6fccd4] text-lg"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-[#6fccd4] hover:bg-[#5ab8c0] text-[#1a1a2e] font-bold py-4 rounded-lg transition-all transform hover:scale-[1.02] text-lg shadow-md"
                >
                  Suivre mon colis
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

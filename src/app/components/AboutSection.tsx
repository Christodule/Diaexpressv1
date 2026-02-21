export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a1a2e]">
              À propos de nous
            </h2>
            <div className="w-20 h-1 bg-[#f1580c]"></div>
            <p className="text-lg text-[#1a1a2e]/80 leading-relaxed">
              Le Groupe est l'acteur majeur du transport international et de la logistique en Afrique. 
              En capitalisant sur cette expertise, nous vous proposons des solutions sur mesure pour le 
              transit de vos marchandises, ainsi que la gestion de vos stocks et de vos approvisionnements.
            </p>
            <p className="text-lg text-[#1a1a2e]/80 leading-relaxed">
              Nous intervenons sur l'ensemble de la chaine logistique et nous vous accompagnons dans tous 
              vos projets pour mieux répondre à vos attentes et optimiser vos coûts.
            </p>
            <button className="bg-[#f1580c] hover:bg-[#d14a0a] text-white px-8 py-3 rounded-lg transition-all transform hover:scale-105 font-medium">
              En savoir plus
            </button>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1631580817071-4e2fe5dae478?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5ZWxsb3clMjBmZXJyeSUyMGJvYXQlMjBvY2VhbnxlbnwxfHx8fDE3NzE2MzMyNzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
                alt="Ferry boat"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#6fccd4] rounded-2xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

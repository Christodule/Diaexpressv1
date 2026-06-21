import { Box, Globe, TrendingUp } from 'lucide-react';

const services = [
  {
    icon: Box,
    title: "Fret standard international",
    description: "Solutions de transport maritime et aérien pour tous types de marchandises avec suivi en temps réel.",
  },
  {
    icon: Globe,
    title: "Dédouanement",
    description: "Gestion complète des formalités douanières pour faciliter le passage de vos marchandises aux frontières.",
  },
  {
    icon: TrendingUp,
    title: "Stockage",
    description: "Entreposage sécurisé et gestion d'inventaire dans nos installations modernes et adaptées.",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-24 bg-[#f4fee8]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a1a2e] mb-4">
            Nos services
          </h2>
          <div className="w-20 h-1 bg-[#f1580c] mx-auto mb-6"></div>
          <p className="text-lg text-[#1a1a2e]/70 max-w-2xl mx-auto">
            Profitez de notre expertise en logistique internationale pour optimiser vos opérations
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="bg-[#6fccd4] group-hover:bg-[#f1580c] w-16 h-16 rounded-lg flex items-center justify-center mb-6 transition-colors">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#1a1a2e] mb-4">{service.title}</h3>
                <p className="text-[#1a1a2e]/70 leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>

        {/* Container Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="aspect-video rounded-xl overflow-hidden shadow-lg group">
            <img 
              src="https://images.unsplash.com/photo-1735047974891-df59713d8192?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGlwcGluZyUyMGNvbnRhaW5lcnMlMjBjYXJnbyUyMHBvcnR8ZW58MXx8fHwxNzcxNjMzMjY5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
              alt="Cargo containers"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="aspect-video rounded-xl overflow-hidden shadow-lg group">
            <img 
              src="https://images.unsplash.com/photo-1769144256181-698b8f807066?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXJpYWwlMjB2aWV3JTIwY2FyZ28lMjBzaGlwJTIwY29udGFpbmVyc3xlbnwxfHx8fDE3NzE2MzMyNzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
              alt="Aerial view of cargo ship"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

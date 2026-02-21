import { Clock, Shield, Users } from 'lucide-react';

const features = [
  {
    icon: Clock,
    title: "Livraisons rapides",
    description: "Nos services express garantissent des délais de livraison optimaux pour vos envois urgents.",
    color: "bg-[#f1580c]"
  },
  {
    icon: Shield,
    title: "Sécurité",
    description: "Vos marchandises sont assurées et suivies tout au long du parcours avec notre système de tracking avancé.",
    color: "bg-[#6fccd4]"
  },
  {
    icon: Users,
    title: "Service client",
    description: "Une équipe dédiée disponible 24/7 pour répondre à toutes vos questions et suivre vos expéditions.",
    color: "bg-[#FFB629]"
  }
];

export function WhyChooseUs() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background with pattern */}
      <div className="absolute inset-0 bg-[#f4f4f4]">
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a1a2e] mb-4">
            Pourquoi nous choisir?
          </h2>
          <div className="w-20 h-1 bg-[#f1580c] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group"
              >
                <div className={`${feature.color} w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#1a1a2e] mb-4">{feature.title}</h3>
                <p className="text-[#1a1a2e]/70 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Container Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="relative">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1766040923580-16ad32fae8b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2dpc3RpY3MlMjB3YXJlaG91c2UlMjBwYWNrYWdlc3xlbnwxfHx8fDE3NzE2MzMyNzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
                alt="Warehouse logistics"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#1a1a2e]">
              Une expertise reconnue
            </h3>
            <p className="text-lg text-[#1a1a2e]/80 leading-relaxed">
              Fort de plusieurs années d'expérience dans le transport international, DIAEXPRESS 
              s'est imposé comme un partenaire de confiance pour les entreprises qui souhaitent 
              optimiser leur chaîne logistique.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-[#6fccd4] text-white px-6 py-3 rounded-lg">
                <p className="font-bold text-2xl">50+</p>
                <p className="text-sm">Pays desservis</p>
              </div>
              <div className="bg-[#f1580c] text-white px-6 py-3 rounded-lg">
                <p className="font-bold text-2xl">1000+</p>
                <p className="text-sm">Clients satisfaits</p>
              </div>
              <div className="bg-[#FFB629] text-white px-6 py-3 rounded-lg">
                <p className="font-bold text-2xl">24/7</p>
                <p className="text-sm">Support client</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Marie Kouadio",
    position: "Directrice Logistique",
    company: "Import Export SA",
    content: "DIAEXPRESS a révolutionné notre chaîne d'approvisionnement. Le suivi en temps réel et la fiabilité de leurs services nous ont permis d'optimiser nos opérations.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop"
  },
  {
    name: "Amadou Diallo",
    position: "Gérant",
    company: "Commerce International",
    content: "Un service client exceptionnel et des délais toujours respectés. Je recommande vivement DIAEXPRESS pour tous vos besoins en transport international.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
  }
];

export function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[#1a1a2e] to-[#16213e]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Ce que disent nos clients
          </h2>
          <div className="w-20 h-1 bg-[#f1580c] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-8 hover:bg-white/15 transition-all duration-300 border border-white/20"
            >
              <div className="flex items-start gap-4 mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#f1580c]"
                />
                <div className="flex-1">
                  <h4 className="font-bold text-white text-lg">{testimonial.name}</h4>
                  <p className="text-[#6fccd4] text-sm">{testimonial.position}</p>
                  <p className="text-white/70 text-sm">{testimonial.company}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#FFB629] text-[#FFB629]" />
                ))}
              </div>

              <p className="text-white/90 leading-relaxed italic">
                "{testimonial.content}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

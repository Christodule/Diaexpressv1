import { Package, Ship, Plane, Truck } from 'lucide-react';
import serviceIcon1 from "figma:asset/6dee5bfe97939a456031d98a44088291c8885a41.png";
import serviceIcon2 from "figma:asset/2051b322f3f74d3f73f9d5e7d7cee558d3447203.png";

const services = [
  {
    icon: Ship,
    title: "Maritime",
    time: "15mn à 1h",
    image: serviceIcon1,
  },
  {
    icon: Plane,
    title: "Aérien",
    time: "15mn à 1h",
    image: serviceIcon1,
  },
  {
    icon: Truck,
    title: "Routier",
    time: "15mn à 1h",
    image: serviceIcon2,
  },
  {
    icon: Package,
    title: "Express",
    time: "15mn à 1h",
    image: serviceIcon1,
  },
];

export function ServicesIcons() {
  return (
    <section className="py-16 md:py-24 bg-[#f4fee8]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center group hover:transform hover:scale-105 transition-all duration-300"
              >
                {/* Icon Circle */}
                <div className="relative mb-4">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Icon Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/80 rounded-full p-4 group-hover:bg-[#6fccd4]/80 transition-colors">
                      <IconComponent className="w-8 h-8 text-[#1a1a2e]" />
                    </div>
                  </div>
                </div>

                {/* Time Badge */}
                <div className="bg-[#d9d9d9] group-hover:bg-[#6fccd4] px-6 py-2 rounded-full transition-colors">
                  <p className="text-center text-[#1a1a2e] font-medium">{service.time}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Value Proposition */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 bg-white rounded-lg px-6 py-4 shadow-md">
            <Package className="w-8 h-8 text-[#f1580c]" />
            <p className="text-2xl font-bold text-[#1a1a2e]">200.000.000 Fcfa</p>
          </div>
          <p className="mt-4 text-[#1a1a2e]/70">Volume d'affaires annuel</p>
        </div>
      </div>
    </section>
  );
}

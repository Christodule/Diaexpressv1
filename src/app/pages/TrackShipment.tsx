import { useState } from "react";
import { Search, Package, MapPin, Calendar, CheckCircle, Clock, Truck, AlertCircle, Download } from "lucide-react";

const trackingData = {
  id: "DXP-2024-001",
  status: "in_transit",
  statusLabel: "En transit",
  progress: 60,
  origin: "Abidjan, Côte d'Ivoire",
  destination: "Paris, France",
  currentLocation: "Casablanca, Maroc",
  estimatedDelivery: "2026-02-22",
  weight: "250 kg",
  carrier: "Air France Cargo",
  events: [
    {
      date: "2026-02-20 14:30",
      location: "Casablanca, Maroc",
      status: "En transit",
      description: "Votre colis a quitté le centre de tri et est en route vers Paris",
      icon: Truck,
      completed: false,
    },
    {
      date: "2026-02-19 08:15",
      location: "Casablanca, Maroc",
      status: "Arrivée au hub",
      description: "Colis arrivé au centre de tri international",
      icon: MapPin,
      completed: true,
    },
    {
      date: "2026-02-17 16:45",
      location: "Abidjan, Côte d'Ivoire",
      status: "Dédouanement",
      description: "Dédouanement effectué avec succès",
      icon: CheckCircle,
      completed: true,
    },
    {
      date: "2026-02-16 10:20",
      location: "Abidjan, Côte d'Ivoire",
      status: "Collecté",
      description: "Colis collecté chez l'expéditeur",
      icon: Package,
      completed: true,
    },
    {
      date: "2026-02-15 09:00",
      location: "Abidjan, Côte d'Ivoire",
      status: "Créé",
      description: "Étiquette d'expédition créée",
      icon: Clock,
      completed: true,
    },
  ],
};

export function TrackShipment() {
  const [trackingNumber, setTrackingNumber] = useState("DXP-2024-001");
  const [showTracking, setShowTracking] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setShowTracking(true);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Suivi de colis</h1>
        <p className="mt-2 text-gray-600">Suivez votre expédition en temps réel</p>
      </div>

      {/* Search Box */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <form onSubmit={handleSearch} className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="Entrez votre numéro de suivi (ex: DXP-2024-001)"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6fccd4]"
            />
          </div>
          <button
            type="submit"
            className="px-8 py-3 bg-[#f1580c] hover:bg-[#d14a0a] text-white font-bold rounded-lg transition-colors"
          >
            Suivre
          </button>
        </form>
      </div>

      {showTracking && (
        <>
          {/* Status Card */}
          <div className="bg-gradient-to-r from-[#6fccd4] to-[#5ab8c0] rounded-xl p-8 text-white shadow-lg">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">{trackingData.id}</h2>
                <p className="text-white/90">
                  Statut: <span className="font-bold">{trackingData.statusLabel}</span>
                </p>
              </div>
              <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Télécharger</span>
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-white/90 text-sm">Progression</p>
                <p className="font-bold">{trackingData.progress}%</p>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3">
                <div
                  className="bg-white h-3 rounded-full transition-all duration-500"
                  style={{ width: `${trackingData.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Route */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-white/80 text-sm mb-1">Origine</p>
                <p className="font-bold">{trackingData.origin}</p>
              </div>
              <div>
                <p className="text-white/80 text-sm mb-1">Destination</p>
                <p className="font-bold">{trackingData.destination}</p>
              </div>
              <div>
                <p className="text-white/80 text-sm mb-1">Position actuelle</p>
                <p className="font-bold flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {trackingData.currentLocation}
                </p>
              </div>
              <div>
                <p className="text-white/80 text-sm mb-1">Livraison estimée</p>
                <p className="font-bold flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {trackingData.estimatedDelivery}
                </p>
              </div>
            </div>
          </div>

          {/* Package Details */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Détails du colis</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Poids</p>
                <p className="font-bold text-gray-900">{trackingData.weight}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Transporteur</p>
                <p className="font-bold text-gray-900">{trackingData.carrier}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Mode de transport</p>
                <p className="font-bold text-gray-900">Aérien</p>
              </div>
            </div>
          </div>

          {/* Tracking Timeline */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Historique de suivi</h3>
            <div className="space-y-6">
              {trackingData.events.map((event, index) => {
                const IconComponent = event.icon;
                return (
                  <div key={index} className="flex gap-4">
                    {/* Timeline */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          event.completed
                            ? "bg-green-100 text-green-600"
                            : index === 0
                            ? "bg-blue-100 text-blue-600 animate-pulse"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        <IconComponent className="w-6 h-6" />
                      </div>
                      {index < trackingData.events.length - 1 && (
                        <div
                          className={`w-0.5 h-full min-h-[40px] ${
                            event.completed ? "bg-green-300" : "bg-gray-200"
                          }`}
                        ></div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-6">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4
                            className={`font-bold ${
                              event.completed ? "text-gray-900" : "text-gray-500"
                            }`}
                          >
                            {event.status}
                          </h4>
                          <p className="text-sm text-gray-500 mt-1">{event.location}</p>
                        </div>
                        <p className="text-sm text-gray-500">{event.date}</p>
                      </div>
                      <p className="text-sm text-gray-600">{event.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Help Section */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <div className="flex gap-4">
              <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Besoin d'aide ?</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Si vous avez des questions concernant votre envoi ou si vous constatez un retard,
                  notre équipe est là pour vous aider.
                </p>
                <button className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors text-sm font-medium">
                  Contacter le support
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

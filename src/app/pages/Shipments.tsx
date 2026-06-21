import { useState } from "react";
import { Package, Search, Filter, MapPin, Calendar, Download } from "lucide-react";
import { Link } from "react-router";

const shipments = [
  {
    id: "DXP-2024-001",
    date: "2026-02-15",
    origin: "Abidjan, CI",
    destination: "Paris, FR",
    status: "in_transit",
    statusLabel: "En transit",
    progress: 60,
    currentLocation: "Casablanca, Maroc",
    estimatedDelivery: "2026-02-22",
    weight: "250 kg",
    trackingEvents: 8,
  },
  {
    id: "DXP-2024-002",
    date: "2026-02-14",
    origin: "Dakar, SN",
    destination: "Lyon, FR",
    status: "customs",
    statusLabel: "En douane",
    progress: 40,
    currentLocation: "Marseille, France",
    estimatedDelivery: "2026-02-24",
    weight: "180 kg",
    trackingEvents: 5,
  },
  {
    id: "DXP-2024-003",
    date: "2026-02-12",
    origin: "Bamako, ML",
    destination: "Marseille, FR",
    status: "delivered",
    statusLabel: "Livré",
    progress: 100,
    currentLocation: "Marseille, France",
    estimatedDelivery: "2026-02-20",
    weight: "320 kg",
    trackingEvents: 12,
  },
  {
    id: "DXP-2024-004",
    date: "2026-02-16",
    origin: "Lomé, TG",
    destination: "Bordeaux, FR",
    status: "preparing",
    statusLabel: "Préparation",
    progress: 10,
    currentLocation: "Lomé, Togo",
    estimatedDelivery: "2026-02-28",
    weight: "150 kg",
    trackingEvents: 2,
  },
];

const statusConfig = {
  preparing: { color: "bg-gray-500", label: "Préparation" },
  in_transit: { color: "bg-blue-500", label: "En transit" },
  customs: { color: "bg-yellow-500", label: "En douane" },
  delivered: { color: "bg-green-500", label: "Livré" },
  issue: { color: "bg-red-500", label: "Problème" },
};

export function Shipments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredShipments = shipments.filter((shipment) => {
    const matchesSearch =
      shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || shipment.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mes expéditions</h1>
          <p className="mt-2 text-gray-600">Suivez l'état de toutes vos expéditions</p>
        </div>
        <Link
          to="/quote-request"
          className="px-6 py-3 bg-[#f1580c] hover:bg-[#d14a0a] text-white font-bold rounded-lg transition-colors flex items-center gap-2"
        >
          <Package className="w-5 h-5" />
          Nouvelle expédition
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {Object.entries(statusConfig).map(([key, config]) => {
          const count = shipments.filter((s) => s.status === key).length;
          return (
            <div key={key} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${config.color}`}></div>
                <p className="text-sm text-gray-600">{config.label}</p>
              </div>
              <p className="text-2xl font-bold text-gray-900 mt-2">{count}</p>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par numéro, origine ou destination..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6fccd4]"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6fccd4] appearance-none bg-white min-w-[200px]"
            >
              <option value="all">Tous les statuts</option>
              <option value="preparing">Préparation</option>
              <option value="in_transit">En transit</option>
              <option value="customs">En douane</option>
              <option value="delivered">Livré</option>
              <option value="issue">Problème</option>
            </select>
          </div>
        </div>
      </div>

      {/* Shipments List */}
      <div className="space-y-4">
        {filteredShipments.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Aucune expédition trouvée</p>
          </div>
        ) : (
          filteredShipments.map((shipment) => (
            <div
              key={shipment.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  <div className="flex-1 space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{shipment.id}</h3>
                        <p className="text-sm text-gray-500 mt-1">Créé le {shipment.date}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
                          statusConfig[shipment.status as keyof typeof statusConfig].color
                        }`}
                      >
                        {shipment.statusLabel}
                      </span>
                    </div>

                    {/* Route */}
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 mb-1">Origine</p>
                        <p className="font-medium text-gray-900">{shipment.origin}</p>
                      </div>
                      <div className="flex-shrink-0">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 mb-1">Destination</p>
                        <p className="font-medium text-gray-900">{shipment.destination}</p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-gray-600">Progression</p>
                        <p className="text-sm font-bold text-gray-900">{shipment.progress}%</p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            statusConfig[shipment.status as keyof typeof statusConfig].color
                          }`}
                          style={{ width: `${shipment.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-gray-500">Position actuelle</p>
                          <p className="font-medium text-gray-900">{shipment.currentLocation}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-gray-500">Livraison estimée</p>
                          <p className="font-medium text-gray-900">{shipment.estimatedDelivery}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Package className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-gray-500">Poids</p>
                          <p className="font-medium text-gray-900">{shipment.weight}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 lg:w-48">
                    <Link
                      to="/track-shipment"
                      className="px-4 py-2 bg-[#6fccd4] hover:bg-[#5ab8c0] text-white rounded-lg transition-colors text-center"
                    >
                      Suivre en détail
                    </Link>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      Bordereau
                    </button>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
                <p className="text-xs text-gray-500">
                  {shipment.trackingEvents} événements de suivi • Dernière mise à jour il y a 2h
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

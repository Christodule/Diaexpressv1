import { useState } from "react";
import { Package, Search, Filter, Eye, Download, Star } from "lucide-react";

const packages = [
  {
    id: "DXP-2024-001",
    description: "Documents commerciaux",
    origin: "Abidjan, CI",
    destination: "Paris, FR",
    weight: "2 kg",
    date: "2026-02-15",
    status: "in_transit",
    statusLabel: "En transit",
    favorite: true,
  },
  {
    id: "DXP-2024-002",
    description: "Échantillons textiles",
    origin: "Dakar, SN",
    destination: "Lyon, FR",
    weight: "5 kg",
    date: "2026-02-14",
    status: "customs",
    statusLabel: "En douane",
    favorite: false,
  },
  {
    id: "DXP-2024-003",
    description: "Pièces mécaniques",
    origin: "Bamako, ML",
    destination: "Marseille, FR",
    weight: "25 kg",
    date: "2026-02-12",
    status: "delivered",
    statusLabel: "Livré",
    favorite: true,
  },
  {
    id: "DXP-2024-004",
    description: "Produits artisanaux",
    origin: "Lomé, TG",
    destination: "Bordeaux, FR",
    weight: "8 kg",
    date: "2026-02-16",
    status: "preparing",
    statusLabel: "Préparation",
    favorite: false,
  },
  {
    id: "DXP-2024-005",
    description: "Matériel informatique",
    origin: "Cotonou, BJ",
    destination: "Toulouse, FR",
    weight: "12 kg",
    date: "2026-02-18",
    status: "preparing",
    statusLabel: "Préparation",
    favorite: false,
  },
  {
    id: "DXP-2024-006",
    description: "Échantillons café",
    origin: "Abidjan, CI",
    destination: "Nice, FR",
    weight: "15 kg",
    date: "2026-01-28",
    status: "delivered",
    statusLabel: "Livré",
    favorite: true,
  },
];

const statusConfig = {
  preparing: { color: "text-gray-600 bg-gray-50" },
  in_transit: { color: "text-blue-600 bg-blue-50" },
  customs: { color: "text-yellow-600 bg-yellow-50" },
  delivered: { color: "text-green-600 bg-green-50" },
};

export function MesColis() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const filteredPackages = packages.filter((pkg) => {
    const matchesSearch =
      pkg.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || pkg.status === filterStatus;
    const matchesFavorite = !showFavoritesOnly || pkg.favorite;
    return matchesSearch && matchesStatus && matchesFavorite;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Mes colis</h1>
        <p className="mt-2 text-gray-600">
          Gérez l'historique complet de vos envois ({packages.length} colis)
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <p className="text-sm text-gray-600">Total</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{packages.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-yellow-100 p-4">
          <p className="text-sm text-gray-600">En cours</p>
          <p className="text-2xl font-bold text-yellow-600 mt-1">
            {packages.filter((p) => p.status !== "delivered").length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-green-100 p-4">
          <p className="text-sm text-gray-600">Livrés</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {packages.filter((p) => p.status === "delivered").length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-blue-100 p-4">
          <p className="text-sm text-gray-600">Favoris</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">
            {packages.filter((p) => p.favorite).length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <p className="text-sm text-gray-600">Poids total</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {packages.reduce((sum, p) => sum + parseInt(p.weight), 0)} kg
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un colis..."
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
              </select>
            </div>
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={showFavoritesOnly}
              onChange={(e) => setShowFavoritesOnly(e.target.checked)}
              className="w-5 h-5 text-[#f1580c] border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">Afficher uniquement les favoris</span>
          </label>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPackages.length === 0 ? (
          <div className="col-span-full bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Aucun colis trouvé</p>
          </div>
        ) : (
          filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all overflow-hidden group"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#6fccd4] to-[#5ab8c0] p-4 text-white">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-lg">{pkg.id}</h3>
                    <p className="text-sm text-white/90 mt-1">{pkg.date}</p>
                  </div>
                  <button
                    className={`p-2 rounded-full transition-colors ${
                      pkg.favorite ? "bg-white/30" : "bg-white/10 hover:bg-white/20"
                    }`}
                  >
                    <Star
                      className={`w-5 h-5 ${pkg.favorite ? "fill-yellow-300 text-yellow-300" : ""}`}
                    />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Description</p>
                  <p className="font-medium text-gray-900">{pkg.description}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 mb-2">Itinéraire</p>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium text-gray-900">{pkg.origin}</span>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="font-medium text-gray-900">{pkg.destination}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500">Poids</p>
                    <p className="font-bold text-gray-900">{pkg.weight}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      statusConfig[pkg.status as keyof typeof statusConfig].color
                    }`}
                  >
                    {pkg.statusLabel}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-2">
                <button className="flex-1 px-3 py-2 bg-[#6fccd4] hover:bg-[#5ab8c0] text-white rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2">
                  <Eye className="w-4 h-4" />
                  Détails
                </button>
                <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

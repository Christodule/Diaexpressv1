import { useState } from "react";
import { Package, Search, Filter, Eye, Download, Star } from "lucide-react";
import { PageHeader, SectionTitle, StatCard, StatusBadge, SurfaceCard } from "../components/ui-v2";

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

  const statusTone: Record<string, "neutral" | "info" | "success" | "warning" | "danger"> = {
    preparing: "neutral",
    in_transit: "info",
    customs: "warning",
    delivered: "success",
  };

  return (
    <div className="space-y-8">
      <PageHeader
        kicker="Packages"
        title="Mes colis"
        subtitle={`Gérez l'historique complet de vos envois (${packages.length} colis).`}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <StatCard label="Total" value={packages.length} icon={<Package className="h-4 w-4" />} />
        <StatCard
          label="En cours"
          value={packages.filter((p) => p.status !== "delivered").length}
          tone="warning"
        />
        <StatCard
          label="Livrés"
          value={packages.filter((p) => p.status === "delivered").length}
          tone="success"
        />
        <StatCard
          label="Favoris"
          value={packages.filter((p) => p.favorite).length}
          tone="secondary"
          icon={<Star className="h-4 w-4" />}
        />
        <StatCard
          label="Poids total"
          value={`${packages.reduce((sum, p) => sum + parseInt(p.weight, 10), 0)} kg`}
          tone="default"
        />
      </div>

      <SurfaceCard className="p-6" soft>
        <SectionTitle title="Filtres" subtitle="Affinez rapidement la liste de vos colis." />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher un colis..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="dx-input pl-10"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="dx-input min-w-[210px] appearance-none pl-10 pr-10"
              >
                <option value="all">Tous les statuts</option>
                <option value="preparing">Préparation</option>
                <option value="in_transit">En transit</option>
                <option value="customs">En douane</option>
                <option value="delivered">Livré</option>
              </select>
            </div>
          </div>
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
            <input
              type="checkbox"
              checked={showFavoritesOnly}
              onChange={(e) => setShowFavoritesOnly(e.target.checked)}
              className="h-5 w-5 rounded border-gray-300 text-[#f1580c]"
            />
            <span className="text-sm text-slate-700">Afficher uniquement les favoris</span>
          </label>
        </div>
      </SurfaceCard>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPackages.length === 0 ? (
          <SurfaceCard className="col-span-full p-12 text-center">
            <Package className="mx-auto mb-4 h-16 w-16 text-slate-300" />
            <p className="text-slate-500">Aucun colis trouvé</p>
          </SurfaceCard>
        ) : (
          filteredPackages.map((pkg) => (
            <SurfaceCard key={pkg.id} className="overflow-hidden" hover>
              <div className="bg-gradient-to-r from-[#6fccd4] to-[#5ab8c0] p-4 text-white">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold">{pkg.id}</h3>
                    <p className="mt-1 text-sm text-white/90">{pkg.date}</p>
                  </div>
                  <button
                    className={`rounded-full p-2 transition ${
                      pkg.favorite ? "bg-white/30" : "bg-white/10 hover:bg-white/20"
                    }`}
                    aria-label="Favori"
                  >
                    <Star
                      className={`h-5 w-5 ${pkg.favorite ? "fill-yellow-300 text-yellow-300" : ""}`}
                    />
                  </button>
                </div>
              </div>

              <div className="space-y-4 p-4">
                <div>
                  <p className="mb-1 text-xs text-slate-500">Description</p>
                  <p className="font-medium text-slate-900">{pkg.description}</p>
                </div>

                <div>
                  <p className="mb-2 text-xs text-slate-500">Itinéraire</p>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium text-slate-900">{pkg.origin}</span>
                    <span className="text-slate-400">→</span>
                    <span className="font-medium text-slate-900">{pkg.destination}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                  <div>
                    <p className="text-xs text-slate-500">Poids</p>
                    <p className="font-bold text-slate-900">{pkg.weight}</p>
                  </div>
                  <StatusBadge
                    label={pkg.statusLabel}
                    tone={statusTone[pkg.status] ?? "neutral"}
                    className={statusConfig[pkg.status as keyof typeof statusConfig].color}
                  />
                </div>
              </div>

              <div className="flex gap-2 border-t border-slate-100 bg-slate-50 p-4">
                <button className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#6fccd4] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#5ab8c0]">
                  <Eye className="h-4 w-4" />
                  Détails
                </button>
                <button className="dx-btn-secondary px-3 py-2">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </SurfaceCard>
          ))
        )}
      </div>
    </div>
  );
}

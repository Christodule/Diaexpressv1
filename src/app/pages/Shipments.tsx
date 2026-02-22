import { useEffect, useState } from "react";
import { Package, Search, Filter, MapPin, Calendar, Download, Clock3, Truck, CheckCircle2, AlertTriangle } from "lucide-react";
import { Link } from "react-router";
import { fetchShipments, type Shipment } from "../lib/api";
import { PageHeader, StatCard, SurfaceCard } from "../components/ui-v2";

const fallbackShipments = [
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

const statusTone = {
  preparing: "default",
  in_transit: "secondary",
  customs: "warning",
  delivered: "success",
  issue: "danger",
} as const;

const statusIcon = {
  preparing: <Clock3 className="h-4 w-4" />,
  in_transit: <Truck className="h-4 w-4" />,
  customs: <AlertTriangle className="h-4 w-4" />,
  delivered: <CheckCircle2 className="h-4 w-4" />,
  issue: <AlertTriangle className="h-4 w-4" />,
} as const;

export function Shipments() {
  const [shipments, setShipments] = useState(fallbackShipments);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    const loadShipments = async () => {
      try {
        const apiShipments = await fetchShipments();
        setShipments(
          apiShipments.map((shipment: Shipment) => {
            const normalizedStatus =
              shipment.status === "in_transit" ||
              shipment.status === "customs" ||
              shipment.status === "delivered"
                ? shipment.status
                : "preparing";

            return {
              id: shipment.id,
              date: shipment.createdAt?.slice(0, 10) ?? new Date().toISOString().slice(0, 10),
              origin: shipment.origin,
              destination: shipment.destination,
              status: normalizedStatus,
              statusLabel:
                normalizedStatus === "in_transit"
                  ? "En transit"
                  : normalizedStatus === "customs"
                    ? "En douane"
                    : normalizedStatus === "delivered"
                      ? "Livre"
                      : "Preparation",
              progress: shipment.progress ?? 0,
              currentLocation: shipment.currentLocation ?? "N/A",
              estimatedDelivery: shipment.estimatedDelivery ?? "-",
              weight: "N/A",
              trackingEvents: 0,
            };
          }),
        );
      } catch (error) {
        setApiError(
          error instanceof Error
            ? error.message
            : "Erreur lors du chargement des expeditions.",
        );
      } finally {
        setLoading(false);
      }
    };

    void loadShipments();
  }, []);

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
      <PageHeader
        kicker="Shipments"
        title="Mes expeditions"
        subtitle="Suivez l'etat de toutes vos expeditions avec une vue operationnelle."
        action={
          <Link to="/quote-request" className="dx-btn-primary">
            <Package className="h-4 w-4" />
            Nouvelle expedition
          </Link>
        }
      />

      {/* Stats */}
      {apiError && (
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-800">
          {apiError} Affichage des donnees de demonstration.
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        {Object.entries(statusConfig).map(([key, config]) => {
          const count = shipments.filter((s) => s.status === key).length;
          return (
            <StatCard
              key={key}
              label={config.label}
              value={count}
              tone={statusTone[key as keyof typeof statusTone]}
              icon={statusIcon[key as keyof typeof statusIcon]}
            />
          );
        })}
      </div>

      {/* Filters */}
      <SurfaceCard className="p-6" soft>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher par numéro, origine ou destination..."
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
              className="dx-input min-w-[200px] appearance-none pl-10 pr-10"
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
      </SurfaceCard>

      {/* Shipments List */}
      <div className="space-y-4">
        {loading ? (
          <SurfaceCard className="p-12 text-center">
            <p className="text-slate-500">Chargement des expeditions...</p>
          </SurfaceCard>
        ) : filteredShipments.length === 0 ? (
          <SurfaceCard className="p-12 text-center">
            <Package className="mx-auto mb-4 h-16 w-16 text-slate-300" />
            <p className="text-slate-500">Aucune expedition trouvee</p>
          </SurfaceCard>
        ) : (
          filteredShipments.map((shipment) => (
            <SurfaceCard key={shipment.id} className="overflow-hidden" hover>
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  <div className="flex-1 space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">{shipment.id}</h3>
                        <p className="mt-1 text-sm text-slate-500">Cree le {shipment.date}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
                          (statusConfig[shipment.status as keyof typeof statusConfig] ??
                            statusConfig.preparing).color
                        }`}
                      >
                        {shipment.statusLabel}
                      </span>
                    </div>

                    {/* Route */}
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <p className="mb-1 text-xs text-slate-500">Origine</p>
                        <p className="font-medium text-slate-900">{shipment.origin}</p>
                      </div>
                      <div className="flex-shrink-0">
                        <svg className="h-8 w-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="mb-1 text-xs text-slate-500">Destination</p>
                        <p className="font-medium text-slate-900">{shipment.destination}</p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-slate-600">Progression</p>
                        <p className="text-sm font-bold text-slate-900">{shipment.progress}%</p>
                      </div>
                      <div className="h-2 w-full rounded-full bg-slate-200">
                        <div
                          className={`h-2 rounded-full ${
                            (statusConfig[shipment.status as keyof typeof statusConfig] ??
                              statusConfig.preparing).color
                          }`}
                          style={{ width: `${shipment.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="grid grid-cols-1 gap-4 border-t border-slate-100 pt-4 sm:grid-cols-3">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-slate-400" />
                        <div>
                          <p className="text-slate-500">Position actuelle</p>
                          <p className="font-medium text-slate-900">{shipment.currentLocation}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-slate-400" />
                        <div>
                          <p className="text-slate-500">Livraison estimee</p>
                          <p className="font-medium text-slate-900">{shipment.estimatedDelivery}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Package className="h-4 w-4 text-slate-400" />
                        <div>
                          <p className="text-slate-500">Poids</p>
                          <p className="font-medium text-slate-900">{shipment.weight}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 lg:w-48">
                    <Link
                      to="/track-shipment"
                      className="inline-flex items-center justify-center rounded-xl bg-[#6fccd4] px-4 py-2 font-semibold text-white transition hover:bg-[#5ab8c0]"
                    >
                      Suivre en detail
                    </Link>
                    <button className="dx-btn-secondary">
                      <Download className="w-4 h-4" />
                      Bordereau
                    </button>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-slate-100 bg-slate-50 px-6 py-3">
                <p className="text-xs text-slate-500">
                  {shipment.trackingEvents} evenements de suivi • Derniere mise a jour il y a 2h
                </p>
              </div>
            </SurfaceCard>
          ))
        )}
      </div>
    </div>
  );
}

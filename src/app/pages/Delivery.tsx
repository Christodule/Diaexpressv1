import { useState } from "react";
import { Truck, Search, Filter, Calendar, MapPin, Phone, CheckCircle, Clock } from "lucide-react";
import { PageHeader, StatCard, StatusBadge, SurfaceCard } from "../components/ui-v2";

const deliveries = [
  {
    id: "DXP-2024-003",
    shipmentId: "DXP-2024-003",
    recipient: "Jean Dupont",
    address: "15 Rue de la République, 13001 Marseille",
    phone: "+33 6 12 34 56 78",
    deliveryDate: "2026-02-20",
    deliveryTime: "14:30",
    status: "delivered",
    statusLabel: "Livré",
    signature: true,
    notes: "Colis remis en main propre",
  },
  {
    id: "DXP-2024-001",
    shipmentId: "DXP-2024-001",
    recipient: "Marie Martin",
    address: "42 Avenue des Champs-Élysées, 75008 Paris",
    phone: "+33 6 98 76 54 32",
    deliveryDate: "2026-02-22",
    deliveryTime: "10:00 - 12:00",
    status: "scheduled",
    statusLabel: "Planifié",
    signature: false,
    notes: "Livraison entre 10h et 12h",
  },
  {
    id: "DXP-2024-005",
    shipmentId: "DXP-2024-005",
    recipient: "Pierre Laurent",
    address: "28 Cours Gambetta, 69007 Lyon",
    phone: "+33 6 55 44 33 22",
    deliveryDate: "2026-02-23",
    deliveryTime: "15:00 - 17:00",
    status: "in_transit",
    statusLabel: "En route",
    signature: false,
    notes: "Appeler 30 min avant",
  },
];

const statusConfig = {
  scheduled: { color: "text-blue-700 bg-blue-50 border-blue-200", icon: Clock },
  in_transit: { color: "text-yellow-700 bg-yellow-50 border-yellow-200", icon: Truck },
  delivered: { color: "text-green-700 bg-green-50 border-green-200", icon: CheckCircle },
};

export function Delivery() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredDeliveries = deliveries.filter((delivery) => {
    const matchesSearch =
      delivery.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || delivery.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      <PageHeader
        title="Livraisons"
        subtitle="Planification, execution et preuve de livraison au meme endroit."
      />

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label="Planifiees"
          value={deliveries.filter((d) => d.status === "scheduled").length}
          tone="secondary"
        />
        <StatCard
          label="En route"
          value={deliveries.filter((d) => d.status === "in_transit").length}
          tone="warning"
        />
        <StatCard
          label="Livrees"
          value={deliveries.filter((d) => d.status === "delivered").length}
          tone="success"
        />
      </div>

      {/* Filters */}
      <SurfaceCard className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher par numéro, destinataire ou adresse..."
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
              <option value="scheduled">Planifiées</option>
              <option value="in_transit">En route</option>
              <option value="delivered">Livrées</option>
            </select>
          </div>
        </div>
      </SurfaceCard>

      {/* Deliveries List */}
      <div className="space-y-4">
        {filteredDeliveries.length === 0 ? (
          <SurfaceCard className="p-12 text-center">
            <Truck className="mx-auto mb-4 h-16 w-16 text-slate-300" />
            <p className="text-slate-500">Aucune livraison trouvee</p>
          </SurfaceCard>
        ) : (
          filteredDeliveries.map((delivery) => {
            const StatusIcon = statusConfig[delivery.status as keyof typeof statusConfig].icon;
            const tone =
              delivery.status === "delivered"
                ? "success"
                : delivery.status === "in_transit"
                  ? "warning"
                  : "info";
            return (
              <SurfaceCard key={delivery.id} className="p-6 transition hover:shadow-md">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  <div className="flex-1 space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">{delivery.id}</h3>
                        <p className="mt-1 text-sm text-slate-500">
                          Expedition: {delivery.shipmentId}
                        </p>
                      </div>
                      <StatusBadge
                        tone={tone}
                        className="gap-1"
                        label={
                          <>
                            <StatusIcon className="h-3 w-3" />
                            {delivery.statusLabel}
                          </>
                        }
                      />
                    </div>

                    {/* Recipient Details */}
                    <div className="grid grid-cols-1 gap-4 rounded-xl bg-slate-50 p-4 md:grid-cols-2">
                      <div>
                        <p className="mb-1 text-xs text-slate-500">Destinataire</p>
                        <p className="font-medium text-slate-900">{delivery.recipient}</p>
                      </div>
                      <div>
                        <p className="mb-1 flex items-center gap-1 text-xs text-slate-500">
                          <Phone className="w-3 h-3" />
                          Téléphone
                        </p>
                        <p className="font-medium text-slate-900">{delivery.phone}</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="mb-1 flex items-center gap-1 text-xs text-slate-500">
                          <MapPin className="w-3 h-3" />
                          Adresse de livraison
                        </p>
                        <p className="font-medium text-slate-900">{delivery.address}</p>
                      </div>
                    </div>

                    {/* Delivery Info */}
                    <div className="flex flex-wrap gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-slate-400" />
                        <div>
                          <p className="text-slate-500">Date de livraison</p>
                          <p className="font-medium text-slate-900">{delivery.deliveryDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-slate-400" />
                        <div>
                          <p className="text-slate-500">Creneau horaire</p>
                          <p className="font-medium text-slate-900">{delivery.deliveryTime}</p>
                        </div>
                      </div>
                      {delivery.signature && (
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <div>
                            <p className="text-green-600 font-medium">Signature reçue</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Notes */}
                    {delivery.notes && (
                      <div className="rounded-xl border border-blue-100 bg-blue-50 p-3">
                        <p className="text-sm text-blue-900">
                          <strong>Note:</strong> {delivery.notes}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 lg:w-48">
                    <button className="inline-flex items-center justify-center rounded-xl bg-[#6fccd4] px-4 py-2 font-semibold text-white transition hover:bg-[#5ab8c0]">
                      Voir details
                    </button>
                    {delivery.status === "delivered" && (
                      <button className="dx-btn-secondary">
                        Preuve de livraison
                      </button>
                    )}
                  </div>
                </div>
              </SurfaceCard>
            );
          })
        )}
      </div>
    </div>
  );
}

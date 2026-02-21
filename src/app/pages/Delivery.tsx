import { useState } from "react";
import { Truck, Search, Filter, Calendar, MapPin, Phone, CheckCircle, Clock } from "lucide-react";

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
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Livraisons</h1>
        <p className="mt-2 text-gray-600">Gérez et suivez toutes vos livraisons</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-blue-100 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-6 h-6 text-blue-600" />
            <p className="text-sm text-blue-600 font-medium">Planifiées</p>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {deliveries.filter((d) => d.status === "scheduled").length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-yellow-100 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Truck className="w-6 h-6 text-yellow-600" />
            <p className="text-sm text-yellow-600 font-medium">En route</p>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {deliveries.filter((d) => d.status === "in_transit").length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-green-100 p-6">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <p className="text-sm text-green-600 font-medium">Livrées</p>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {deliveries.filter((d) => d.status === "delivered").length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par numéro, destinataire ou adresse..."
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
              <option value="scheduled">Planifiées</option>
              <option value="in_transit">En route</option>
              <option value="delivered">Livrées</option>
            </select>
          </div>
        </div>
      </div>

      {/* Deliveries List */}
      <div className="space-y-4">
        {filteredDeliveries.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <Truck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Aucune livraison trouvée</p>
          </div>
        ) : (
          filteredDeliveries.map((delivery) => {
            const StatusIcon = statusConfig[delivery.status as keyof typeof statusConfig].icon;
            return (
              <div
                key={delivery.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  <div className="flex-1 space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{delivery.id}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Expédition: {delivery.shipmentId}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${
                          statusConfig[delivery.status as keyof typeof statusConfig].color
                        }`}
                      >
                        <StatusIcon className="w-3 h-3" />
                        {delivery.statusLabel}
                      </span>
                    </div>

                    {/* Recipient Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Destinataire</p>
                        <p className="font-medium text-gray-900">{delivery.recipient}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          Téléphone
                        </p>
                        <p className="font-medium text-gray-900">{delivery.phone}</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          Adresse de livraison
                        </p>
                        <p className="font-medium text-gray-900">{delivery.address}</p>
                      </div>
                    </div>

                    {/* Delivery Info */}
                    <div className="flex flex-wrap gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-gray-500">Date de livraison</p>
                          <p className="font-medium text-gray-900">{delivery.deliveryDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-gray-500">Créneau horaire</p>
                          <p className="font-medium text-gray-900">{delivery.deliveryTime}</p>
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
                      <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                        <p className="text-sm text-blue-900">
                          <strong>Note:</strong> {delivery.notes}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 lg:w-48">
                    <button className="px-4 py-2 bg-[#6fccd4] hover:bg-[#5ab8c0] text-white rounded-lg transition-colors">
                      Voir détails
                    </button>
                    {delivery.status === "delivered" && (
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        Preuve de livraison
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

import { Package, FileText, Truck, TrendingUp, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Link } from "react-router";

const stats = [
  { name: "Colis actifs", value: "12", icon: Package, change: "+3", color: "bg-blue-500" },
  { name: "Devis en attente", value: "5", icon: FileText, change: "+2", color: "bg-yellow-500" },
  { name: "Livraisons ce mois", value: "28", icon: Truck, change: "+12%", color: "bg-green-500" },
  { name: "Volume total", value: "156", icon: TrendingUp, change: "+24%", color: "bg-purple-500" },
];

const recentShipments = [
  {
    id: "DXP-2024-001",
    origin: "Abidjan, CI",
    destination: "Paris, FR",
    status: "En transit",
    statusColor: "text-blue-600 bg-blue-50",
    date: "15 Fév 2026",
  },
  {
    id: "DXP-2024-002",
    origin: "Dakar, SN",
    destination: "Lyon, FR",
    status: "En douane",
    statusColor: "text-yellow-600 bg-yellow-50",
    date: "14 Fév 2026",
  },
  {
    id: "DXP-2024-003",
    origin: "Bamako, ML",
    destination: "Marseille, FR",
    status: "Livré",
    statusColor: "text-green-600 bg-green-50",
    date: "12 Fév 2026",
  },
  {
    id: "DXP-2024-004",
    origin: "Lomé, TG",
    destination: "Bordeaux, FR",
    status: "Préparation",
    statusColor: "text-gray-600 bg-gray-50",
    date: "16 Fév 2026",
  },
];

const recentQuotes = [
  {
    id: "DEV-2024-015",
    route: "Abidjan → Paris",
    weight: "250 kg",
    status: "En attente",
    amount: "450,000 FCFA",
  },
  {
    id: "DEV-2024-016",
    route: "Dakar → Lyon",
    weight: "180 kg",
    status: "Approuvé",
    amount: "380,000 FCFA",
  },
];

export function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="mt-2 text-gray-600">Bienvenue sur votre espace client DIAEXPRESS</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="mt-2 text-sm text-green-600 font-medium">{stat.change}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-[#f1580c] to-[#d14a0a] rounded-xl shadow-lg p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">Actions rapides</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/quote-request"
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-4 transition-all"
          >
            <FileText className="w-8 h-8 mb-2" />
            <h3 className="font-bold mb-1">Nouveau devis</h3>
            <p className="text-sm text-white/90">Demander un devis pour votre envoi</p>
          </Link>
          <Link
            to="/track-shipment"
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-4 transition-all"
          >
            <Package className="w-8 h-8 mb-2" />
            <h3 className="font-bold mb-1">Suivre un colis</h3>
            <p className="text-sm text-white/90">Localisez votre expédition en temps réel</p>
          </Link>
          <Link
            to="/payments"
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-4 transition-all"
          >
            <TrendingUp className="w-8 h-8 mb-2" />
            <h3 className="font-bold mb-1">Paiements</h3>
            <p className="text-sm text-white/90">Gérer vos factures et paiements</p>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Shipments */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Expéditions récentes</h2>
              <Link to="/shipments" className="text-sm text-[#f1580c] hover:underline">
                Voir tout
              </Link>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentShipments.map((shipment) => (
                <div
                  key={shipment.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-[#6fccd4] transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">{shipment.id}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {shipment.origin} → {shipment.destination}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{shipment.date}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${shipment.statusColor}`}
                  >
                    {shipment.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Quotes */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Devis récents</h2>
              <Link to="/quotes" className="text-sm text-[#f1580c] hover:underline">
                Voir tout
              </Link>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentQuotes.map((quote) => (
                <div
                  key={quote.id}
                  className="p-4 rounded-lg border border-gray-100 hover:border-[#6fccd4] transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-bold text-gray-900">{quote.id}</p>
                      <p className="text-sm text-gray-600">{quote.route}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        quote.status === "Approuvé"
                          ? "text-green-600 bg-green-50"
                          : "text-yellow-600 bg-yellow-50"
                      }`}
                    >
                      {quote.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <p className="text-sm text-gray-600">Poids: {quote.weight}</p>
                    <p className="font-bold text-[#f1580c]">{quote.amount}</p>
                  </div>
                </div>
              ))}
              <Link
                to="/quote-request"
                className="block w-full py-3 text-center border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-[#f1580c] hover:text-[#f1580c] transition-colors"
              >
                + Nouvelle demande de devis
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Activité récente</h2>
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Colis DXP-2024-003 livré</p>
              <p className="text-sm text-gray-500 mt-1">Le colis a été livré avec succès</p>
              <p className="text-xs text-gray-400 mt-1">Il y a 2 heures</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Nouveau devis approuvé</p>
              <p className="text-sm text-gray-500 mt-1">Devis DEV-2024-016 approuvé</p>
              <p className="text-xs text-gray-400 mt-1">Il y a 5 heures</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Colis en attente de dédouanement</p>
              <p className="text-sm text-gray-500 mt-1">DXP-2024-002 en cours de vérification</p>
              <p className="text-xs text-gray-400 mt-1">Il y a 1 jour</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

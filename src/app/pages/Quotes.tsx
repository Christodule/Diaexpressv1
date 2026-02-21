import { useEffect, useState } from "react";
import { FileText, Search, Filter, Eye, CheckCircle, XCircle, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { fetchQuotes, type Quote } from "../lib/api";

const fallbackQuotes = [
  {
    id: "DEV-2024-015",
    date: "2026-02-18",
    origin: "Abidjan, CI",
    destination: "Paris, FR",
    weight: "250 kg",
    status: "pending",
    statusLabel: "En attente",
    amount: "450,000 FCFA",
    validUntil: "2026-02-25",
  },
  {
    id: "DEV-2024-016",
    date: "2026-02-17",
    origin: "Dakar, SN",
    destination: "Lyon, FR",
    weight: "180 kg",
    status: "approved",
    statusLabel: "Approuvé",
    amount: "380,000 FCFA",
    validUntil: "2026-02-24",
  },
  {
    id: "DEV-2024-014",
    date: "2026-02-15",
    origin: "Bamako, ML",
    destination: "Marseille, FR",
    weight: "320 kg",
    status: "rejected",
    statusLabel: "Refusé",
    amount: "520,000 FCFA",
    validUntil: "2026-02-22",
  },
  {
    id: "DEV-2024-013",
    date: "2026-02-12",
    origin: "Lomé, TG",
    destination: "Bordeaux, FR",
    weight: "150 kg",
    status: "expired",
    statusLabel: "Expiré",
    amount: "340,000 FCFA",
    validUntil: "2026-02-19",
  },
];

const statusConfig = {
  pending: { color: "text-yellow-700 bg-yellow-50 border-yellow-200", icon: Clock },
  approved: { color: "text-green-700 bg-green-50 border-green-200", icon: CheckCircle },
  rejected: { color: "text-red-700 bg-red-50 border-red-200", icon: XCircle },
  expired: { color: "text-gray-700 bg-gray-50 border-gray-200", icon: XCircle },
};

export function Quotes() {
  const [quotes, setQuotes] = useState(fallbackQuotes);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    const loadQuotes = async () => {
      try {
        const apiQuotes = await fetchQuotes();
        setQuotes(
          apiQuotes.map((quote: Quote) => ({
            id: quote.id,
            date: quote.createdAt?.slice(0, 10) ?? new Date().toISOString().slice(0, 10),
            origin: quote.origin,
            destination: quote.destination,
            weight: `${quote.weightKg} kg`,
            status: quote.status,
            statusLabel:
              quote.status === "approved"
                ? "Approuve"
                : quote.status === "pending"
                  ? "En attente"
                  : quote.status === "rejected"
                    ? "Refuse"
                    : "Expire",
            amount: `${Number(quote.amountFcfa ?? 0).toLocaleString()} FCFA`,
            validUntil: quote.pickupDate ?? "-",
          })),
        );
      } catch (error) {
        setApiError(
          error instanceof Error
            ? error.message
            : "Erreur lors du chargement des devis.",
        );
      } finally {
        setLoading(false);
      }
    };

    void loadQuotes();
  }, []);

  const filteredQuotes = quotes.filter((quote) => {
    const matchesSearch =
      quote.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || quote.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mes devis</h1>
          <p className="mt-2 text-gray-600">Gérez vos demandes de devis et leurs statuts</p>
        </div>
        <Link
          to="/quote-request"
          className="px-6 py-3 bg-[#f1580c] hover:bg-[#d14a0a] text-white font-bold rounded-lg transition-colors flex items-center gap-2"
        >
          <FileText className="w-5 h-5" />
          Nouveau devis
        </Link>
      </div>

      {/* Stats */}
      {apiError && (
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-800">
          {apiError} Affichage des donnees de demonstration.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <p className="text-sm text-gray-600">Total</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{quotes.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-yellow-100 p-4">
          <p className="text-sm text-yellow-600">En attente</p>
          <p className="text-2xl font-bold text-yellow-700 mt-1">
            {quotes.filter((q) => q.status === "pending").length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-green-100 p-4">
          <p className="text-sm text-green-600">Approuvés</p>
          <p className="text-2xl font-bold text-green-700 mt-1">
            {quotes.filter((q) => q.status === "approved").length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <p className="text-sm text-gray-600">Refusés/Expirés</p>
          <p className="text-2xl font-bold text-gray-700 mt-1">
            {quotes.filter((q) => q.status === "rejected" || q.status === "expired").length}
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
              className="pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6fccd4] appearance-none bg-white"
            >
              <option value="all">Tous les statuts</option>
              <option value="pending">En attente</option>
              <option value="approved">Approuvé</option>
              <option value="rejected">Refusé</option>
              <option value="expired">Expiré</option>
            </select>
          </div>
        </div>
      </div>

      {/* Quotes List */}
      <div className="space-y-4">
        {loading ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <p className="text-gray-500">Chargement des devis...</p>
          </div>
        ) : filteredQuotes.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Aucun devis trouvé</p>
          </div>
        ) : (
          filteredQuotes.map((quote) => {
            const StatusIcon = statusConfig[quote.status as keyof typeof statusConfig].icon;
            return (
              <div
                key={quote.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{quote.id}</h3>
                        <p className="text-sm text-gray-500 mt-1">Demandé le {quote.date}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${
                          statusConfig[quote.status as keyof typeof statusConfig].color
                        }`}
                      >
                        <StatusIcon className="w-3 h-3" />
                        {quote.statusLabel}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Itinéraire</p>
                        <p className="text-sm font-medium text-gray-900">
                          {quote.origin} → {quote.destination}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Poids</p>
                        <p className="text-sm font-medium text-gray-900">{quote.weight}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Montant</p>
                        <p className="text-lg font-bold text-[#f1580c]">{quote.amount}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Valide jusqu'au</p>
                        <p className="text-sm font-medium text-gray-900">{quote.validUntil}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 lg:w-48">
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                      <Eye className="w-4 h-4" />
                      Détails
                    </button>
                    {quote.status === "approved" && (
                      <Link
                        to={`/new-shipment/${quote.id}`}
                        className="px-4 py-2 bg-[#6fccd4] hover:bg-[#5ab8c0] text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <ArrowRight className="w-4 h-4" />
                        Créer expédition
                      </Link>
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

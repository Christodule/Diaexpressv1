import { useEffect, useState } from "react";
import { FileText, Search, Filter, Eye, CheckCircle, XCircle, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { fetchQuotes, type Quote } from "../lib/api";
import { PageHeader, StatCard, StatusBadge, SurfaceCard } from "../components/ui-v2";

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
      <PageHeader
        kicker="Quotations"
        title="Mes devis"
        subtitle="Gerez vos demandes de devis et suivez leur statut en un clin d'oeil."
        action={
          <Link to="/quote-request" className="dx-btn-primary">
            <FileText className="h-4 w-4" />
            Nouveau devis
          </Link>
        }
      />

      {/* Stats */}
      {apiError && (
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-800">
          {apiError} Affichage des donnees de demonstration.
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total" value={quotes.length} icon={<FileText className="h-4 w-4" />} />
        <StatCard
          label="En attente"
          value={quotes.filter((q) => q.status === "pending").length}
          tone="warning"
          icon={<Clock className="h-4 w-4" />}
        />
        <StatCard
          label="Approuves"
          value={quotes.filter((q) => q.status === "approved").length}
          tone="success"
          icon={<CheckCircle className="h-4 w-4" />}
        />
        <StatCard
          label="Refuses / Expires"
          value={quotes.filter((q) => q.status === "rejected" || q.status === "expired").length}
          tone="default"
          icon={<XCircle className="h-4 w-4" />}
        />
      </div>

      {/* Filters */}
      <SurfaceCard className="p-6" soft>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher par numéro, origine ou destination..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="dx-input pl-10"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="dx-input appearance-none pl-10 pr-10"
            >
              <option value="all">Tous les statuts</option>
              <option value="pending">En attente</option>
              <option value="approved">Approuvé</option>
              <option value="rejected">Refusé</option>
              <option value="expired">Expiré</option>
            </select>
          </div>
        </div>
      </SurfaceCard>

      {/* Quotes List */}
      <div className="space-y-4">
        {loading ? (
          <SurfaceCard className="p-12 text-center">
            <p className="text-slate-500">Chargement des devis...</p>
          </SurfaceCard>
        ) : filteredQuotes.length === 0 ? (
          <SurfaceCard className="p-12 text-center">
            <FileText className="mx-auto mb-4 h-16 w-16 text-slate-300" />
            <p className="text-slate-500">Aucun devis trouve</p>
          </SurfaceCard>
        ) : (
          filteredQuotes.map((quote) => {
            const status = statusConfig[quote.status as keyof typeof statusConfig] ?? statusConfig.expired;
            const StatusIcon = status.icon;
            const tone =
              quote.status === "approved"
                ? "success"
                : quote.status === "pending"
                  ? "warning"
                  : quote.status === "rejected"
                    ? "danger"
                    : "neutral";
            return (
              <SurfaceCard key={quote.id} className="p-6" hover>
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">{quote.id}</h3>
                        <p className="mt-1 text-sm text-slate-500">Demande le {quote.date}</p>
                      </div>
                      <StatusBadge
                        tone={tone}
                        className="gap-1"
                        label={
                          <>
                            <StatusIcon className="h-3 w-3" />
                            {quote.statusLabel}
                          </>
                        }
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="mb-1 text-xs text-slate-500">Itineraire</p>
                        <p className="text-sm font-medium text-slate-900">
                          {quote.origin} → {quote.destination}
                        </p>
                      </div>
                      <div>
                        <p className="mb-1 text-xs text-slate-500">Poids</p>
                        <p className="text-sm font-medium text-slate-900">{quote.weight}</p>
                      </div>
                      <div>
                        <p className="mb-1 text-xs text-slate-500">Montant</p>
                        <p className="text-lg font-bold text-[#f1580c]">{quote.amount}</p>
                      </div>
                      <div>
                        <p className="mb-1 text-xs text-slate-500">Valide jusqu'au</p>
                        <p className="text-sm font-medium text-slate-900">{quote.validUntil}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 lg:w-48">
                    <button className="dx-btn-secondary">
                      <Eye className="w-4 h-4" />
                      Details
                    </button>
                    {quote.status === "approved" && (
                      <Link
                        to={`/new-shipment/${quote.id}`}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#6fccd4] px-4 py-2 font-semibold text-white transition hover:bg-[#5ab8c0]"
                      >
                        <ArrowRight className="w-4 h-4" />
                        Creer expedition
                      </Link>
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

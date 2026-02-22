import {
  Package,
  FileText,
  Truck,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router";
import { PageHeader, SectionTitle, StatCard, StatusBadge, SurfaceCard } from "../components/ui-v2";

const stats = [
  {
    name: "Colis actifs",
    value: "12",
    icon: Package,
    change: "+3 cette semaine",
    tone: "secondary",
  },
  {
    name: "Devis en attente",
    value: "5",
    icon: FileText,
    change: "+2 demandes",
    tone: "warning",
  },
  {
    name: "Livraisons ce mois",
    value: "28",
    icon: Truck,
    change: "+12%",
    tone: "success",
  },
  {
    name: "Volume total",
    value: "156",
    icon: TrendingUp,
    change: "+24%",
    tone: "default",
  },
] as const;

const recentShipments = [
  {
    id: "DXP-2024-001",
    origin: "Abidjan, CI",
    destination: "Paris, FR",
    status: "En transit",
    date: "15 Fév 2026",
  },
  {
    id: "DXP-2024-002",
    origin: "Dakar, SN",
    destination: "Lyon, FR",
    status: "En douane",
    date: "14 Fév 2026",
  },
  {
    id: "DXP-2024-003",
    origin: "Bamako, ML",
    destination: "Marseille, FR",
    status: "Livré",
    date: "12 Fév 2026",
  },
  {
    id: "DXP-2024-004",
    origin: "Lomé, TG",
    destination: "Bordeaux, FR",
    status: "Préparation",
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

const statusToneMap: Record<string, "neutral" | "info" | "success" | "warning" | "danger"> = {
  "En transit": "info",
  "En douane": "warning",
  Livré: "success",
  Préparation: "neutral",
  "En attente": "warning",
  Approuvé: "success",
};

export function Dashboard() {
  return (
    <div className="space-y-8">
      <PageHeader
        kicker="Overview"
        title="Tableau de bord"
        subtitle="Bienvenue sur votre espace client DIAEXPRESS."
        action={
          <Link to="/quote-request" className="dx-btn-primary">
            <FileText className="h-4 w-4" />
            Nouveau devis
          </Link>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <StatCard
              key={stat.name}
              label={stat.name}
              value={stat.value}
              tone={stat.tone}
              icon={<Icon className="h-4 w-4" />}
              hint={stat.change}
            />
          );
        })}
      </div>

      <SurfaceCard className="overflow-hidden border-0 bg-gradient-to-r from-[#f1580c] to-[#d14a0a] p-8 text-white shadow-lg">
        <SectionTitle
          title="Actions rapides"
          subtitle="Accédez aux opérations les plus fréquentes."
          icon={<ArrowRight className="h-5 w-5 text-white" />}
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Link
            to="/quote-request"
            className="rounded-xl border border-white/30 bg-white/15 p-4 transition hover:bg-white/25"
          >
            <FileText className="mb-2 h-7 w-7" />
            <p className="font-semibold">Nouveau devis</p>
            <p className="mt-1 text-sm text-white/90">Demander un devis pour votre envoi</p>
          </Link>
          <Link
            to="/track-shipment"
            className="rounded-xl border border-white/30 bg-white/15 p-4 transition hover:bg-white/25"
          >
            <Package className="mb-2 h-7 w-7" />
            <p className="font-semibold">Suivre un colis</p>
            <p className="mt-1 text-sm text-white/90">Localisez votre expédition en temps réel</p>
          </Link>
          <Link
            to="/payments"
            className="rounded-xl border border-white/30 bg-white/15 p-4 transition hover:bg-white/25"
          >
            <TrendingUp className="mb-2 h-7 w-7" />
            <p className="font-semibold">Paiements</p>
            <p className="mt-1 text-sm text-white/90">Gérer vos factures et paiements</p>
          </Link>
        </div>
      </SurfaceCard>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SurfaceCard className="p-6" hover>
          <div className="mb-4 flex items-center justify-between">
            <SectionTitle title="Expéditions récentes" />
            <Link to="/shipments" className="text-sm font-semibold text-[#f1580c] hover:underline">
              Voir tout
            </Link>
          </div>
          <div className="space-y-3">
            {recentShipments.map((shipment) => (
              <div
                key={shipment.id}
                className="flex items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:border-[#6fccd4]"
              >
                <div>
                  <p className="font-bold text-slate-900">{shipment.id}</p>
                  <p className="mt-1 text-sm text-slate-600">
                    {shipment.origin} → {shipment.destination}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">{shipment.date}</p>
                </div>
                <StatusBadge
                  label={shipment.status}
                  tone={statusToneMap[shipment.status] ?? "neutral"}
                />
              </div>
            ))}
          </div>
        </SurfaceCard>

        <SurfaceCard className="p-6" hover>
          <div className="mb-4 flex items-center justify-between">
            <SectionTitle title="Devis récents" />
            <Link to="/quotes" className="text-sm font-semibold text-[#f1580c] hover:underline">
              Voir tout
            </Link>
          </div>
          <div className="space-y-3">
            {recentQuotes.map((quote) => (
              <div
                key={quote.id}
                className="rounded-xl border border-slate-200 p-4 transition hover:border-[#6fccd4]"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-bold text-slate-900">{quote.id}</p>
                    <p className="text-sm text-slate-600">{quote.route}</p>
                  </div>
                  <StatusBadge
                    label={quote.status}
                    tone={statusToneMap[quote.status] ?? "neutral"}
                  />
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
                  <p className="text-sm text-slate-600">Poids: {quote.weight}</p>
                  <p className="font-bold text-[#f1580c]">{quote.amount}</p>
                </div>
              </div>
            ))}
            <Link
              to="/quote-request"
              className="block w-full rounded-xl border-2 border-dashed border-slate-300 py-3 text-center text-sm font-medium text-slate-600 transition hover:border-[#f1580c] hover:text-[#f1580c]"
            >
              + Nouvelle demande de devis
            </Link>
          </div>
        </SurfaceCard>
      </div>

      <SurfaceCard className="p-6" hover>
        <SectionTitle title="Activité récente" icon={<Clock className="h-5 w-5" />} />
        <div className="space-y-5">
          <div className="flex gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Colis DXP-2024-003 livré</p>
              <p className="text-sm text-slate-500">Le colis a été livré avec succès</p>
              <p className="text-xs text-slate-400">Il y a 2 heures</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
              <Clock className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Nouveau devis approuvé</p>
              <p className="text-sm text-slate-500">Devis DEV-2024-016 approuvé</p>
              <p className="text-xs text-slate-400">Il y a 5 heures</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Colis en attente de dédouanement
              </p>
              <p className="text-sm text-slate-500">DXP-2024-002 en cours de vérification</p>
              <p className="text-xs text-slate-400">Il y a 1 jour</p>
            </div>
          </div>
        </div>
      </SurfaceCard>
    </div>
  );
}

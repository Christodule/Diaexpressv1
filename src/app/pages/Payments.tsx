import { useState } from "react";
import { CreditCard, Download, Search, Filter, CheckCircle, Clock, XCircle } from "lucide-react";
import { PageHeader, SectionTitle, StatCard, StatusBadge, SurfaceCard } from "../components/ui-v2";

const invoices = [
  {
    id: "FAC-2024-015",
    date: "2026-02-18",
    shipmentId: "DXP-2024-001",
    description: "Transport Abidjan → Paris (250 kg)",
    amount: "450,000 FCFA",
    status: "paid",
    statusLabel: "Payée",
    paymentMethod: "Carte bancaire",
    dueDate: "2026-02-25",
  },
  {
    id: "FAC-2024-016",
    date: "2026-02-17",
    shipmentId: "DXP-2024-002",
    description: "Transport Dakar → Lyon (180 kg)",
    amount: "380,000 FCFA",
    status: "pending",
    statusLabel: "En attente",
    paymentMethod: "-",
    dueDate: "2026-02-24",
  },
  {
    id: "FAC-2024-014",
    date: "2026-02-12",
    shipmentId: "DXP-2024-003",
    description: "Transport Bamako → Marseille (320 kg)",
    amount: "520,000 FCFA",
    status: "paid",
    statusLabel: "Payée",
    paymentMethod: "Mobile Money",
    dueDate: "2026-02-19",
  },
  {
    id: "FAC-2024-013",
    date: "2026-02-10",
    shipmentId: "DXP-2024-004",
    description: "Transport Lomé → Bordeaux (150 kg)",
    amount: "340,000 FCFA",
    status: "overdue",
    statusLabel: "En retard",
    paymentMethod: "-",
    dueDate: "2026-02-17",
  },
];

const paymentMethods = [
  {
    type: "card",
    name: "Carte bancaire",
    number: "**** **** **** 4242",
    expiry: "12/26",
    isDefault: true,
  },
  {
    type: "mobile",
    name: "Orange Money",
    number: "+225 07 XX XX XX XX",
    expiry: "-",
    isDefault: false,
  },
];

const statusConfig = {
  paid: { color: "text-green-700 bg-green-50 border-green-200", icon: CheckCircle },
  pending: { color: "text-yellow-700 bg-yellow-50 border-yellow-200", icon: Clock },
  overdue: { color: "text-red-700 bg-red-50 border-red-200", icon: XCircle },
};

export function Payments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [activeTab, setActiveTab] = useState<"invoices" | "methods">("invoices");

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.shipmentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || invoice.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalPaid = invoices
    .filter((i) => i.status === "paid")
    .reduce((sum, i) => sum + parseFloat(i.amount.replace(/[^0-9]/g, "")), 0);

  const totalPending = invoices
    .filter((i) => i.status === "pending" || i.status === "overdue")
    .reduce((sum, i) => sum + parseFloat(i.amount.replace(/[^0-9]/g, "")), 0);

  return (
    <div className="space-y-8">
      <PageHeader
        kicker="Billing"
        title="Paiements"
        subtitle="Gérez vos factures et moyens de paiement."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total factures"
          value={invoices.length}
          icon={<CreditCard className="h-4 w-4" />}
        />
        <StatCard
          label="Total payé"
          value={`${totalPaid.toLocaleString()} FCFA`}
          tone="success"
          hint="Factures réglées"
        />
        <StatCard
          label="En attente"
          value={invoices.filter((i) => i.status === "pending").length}
          tone="warning"
        />
        <StatCard
          label="En retard"
          value={invoices.filter((i) => i.status === "overdue").length}
          tone="danger"
          hint={`${totalPending.toLocaleString()} FCFA à traiter`}
        />
      </div>

      <SurfaceCard className="overflow-hidden p-0">
        <div className="border-b border-slate-200 bg-slate-50">
          <div className="flex">
            <button
              onClick={() => setActiveTab("invoices")}
              className={`flex-1 px-6 py-4 text-sm font-semibold transition ${
                activeTab === "invoices"
                  ? "border-b-2 border-[#f1580c] bg-white text-[#f1580c]"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Factures
            </button>
            <button
              onClick={() => setActiveTab("methods")}
              className={`flex-1 px-6 py-4 text-sm font-semibold transition ${
                activeTab === "methods"
                  ? "border-b-2 border-[#f1580c] bg-white text-[#f1580c]"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Moyens de paiement
            </button>
          </div>
        </div>

        {activeTab === "invoices" ? (
          <div className="space-y-6 p-6">
            <SurfaceCard className="p-4" soft>
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Rechercher une facture..."
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
                    <option value="paid">Payée</option>
                    <option value="pending">En attente</option>
                    <option value="overdue">En retard</option>
                  </select>
                </div>
              </div>
            </SurfaceCard>

            <div className="space-y-4">
              {filteredInvoices.length === 0 ? (
                <div className="py-12 text-center">
                  <CreditCard className="mx-auto mb-4 h-16 w-16 text-slate-300" />
                  <p className="text-slate-500">Aucune facture trouvée</p>
                </div>
              ) : (
                filteredInvoices.map((invoice) => {
                  const status = statusConfig[invoice.status as keyof typeof statusConfig];
                  const StatusIcon = status.icon;
                  const tone =
                    invoice.status === "paid"
                      ? "success"
                      : invoice.status === "pending"
                        ? "warning"
                        : "danger";

                  return (
                    <SurfaceCard key={invoice.id} className="p-6" hover>
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                        <div className="flex-1">
                          <div className="mb-3 flex items-start justify-between gap-3">
                            <div>
                              <h3 className="text-lg font-bold text-slate-900">{invoice.id}</h3>
                              <p className="mt-1 text-sm text-slate-500">
                                Émise le {invoice.date} • Échéance: {invoice.dueDate}
                              </p>
                            </div>
                            <StatusBadge
                              tone={tone}
                              className={`gap-1 ${status.color}`}
                              label={
                                <>
                                  <StatusIcon className="h-3 w-3" />
                                  {invoice.statusLabel}
                                </>
                              }
                            />
                          </div>
                          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div>
                              <p className="mb-1 text-xs text-slate-500">Expédition</p>
                              <p className="font-medium text-slate-900">{invoice.shipmentId}</p>
                            </div>
                            <div>
                              <p className="mb-1 text-xs text-slate-500">Description</p>
                              <p className="font-medium text-slate-900">{invoice.description}</p>
                            </div>
                            <div>
                              <p className="mb-1 text-xs text-slate-500">Moyen de paiement</p>
                              <p className="font-medium text-slate-900">{invoice.paymentMethod}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 lg:w-56">
                          <div className="mb-1 text-center lg:text-right">
                            <p className="text-xs text-slate-500">Montant</p>
                            <p className="text-2xl font-bold text-[#f1580c]">{invoice.amount}</p>
                          </div>
                          <div className="flex gap-2">
                            {invoice.status !== "paid" && (
                              <button className="dx-btn-primary flex-1 py-2">Payer</button>
                            )}
                            <button className="dx-btn-secondary px-4 py-2">
                              <Download className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </SurfaceCard>
                  );
                })
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6 p-6">
            <SectionTitle
              title="Moyens de paiement"
              subtitle="Ajoutez et gérez vos modes de règlement."
              icon={<CreditCard className="h-5 w-5" />}
            />
            <div className="space-y-4">
              {paymentMethods.map((method, index) => (
                <SurfaceCard key={index} className="p-6" hover>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-[#6fccd4] to-[#5ab8c0]">
                        <CreditCard className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">{method.name}</h3>
                        <p className="mt-1 text-sm text-slate-600">{method.number}</p>
                        {method.expiry !== "-" && (
                          <p className="mt-1 text-xs text-slate-500">Expire: {method.expiry}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {method.isDefault && <StatusBadge label="Par défaut" tone="success" />}
                      <button className="dx-btn-secondary py-2 text-sm">Modifier</button>
                    </div>
                  </div>
                </SurfaceCard>
              ))}
            </div>

            <button className="w-full rounded-xl border-2 border-dashed border-slate-300 py-4 text-sm font-semibold text-slate-600 transition hover:border-[#f1580c] hover:text-[#f1580c]">
              + Ajouter un moyen de paiement
            </button>
          </div>
        )}
      </SurfaceCard>
    </div>
  );
}

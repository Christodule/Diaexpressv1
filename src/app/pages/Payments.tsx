import { useState } from "react";
import { CreditCard, Download, Search, Filter, CheckCircle, Clock, XCircle } from "lucide-react";

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
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Paiements</h1>
        <p className="mt-2 text-gray-600">Gérez vos factures et moyens de paiement</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <p className="text-sm text-gray-600">Total factures</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{invoices.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-green-100 p-6">
          <p className="text-sm text-green-600">Total payé</p>
          <p className="text-2xl font-bold text-green-700 mt-1">
            {totalPaid.toLocaleString()} FCFA
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-yellow-100 p-6">
          <p className="text-sm text-yellow-600">En attente</p>
          <p className="text-2xl font-bold text-yellow-700 mt-1">
            {invoices.filter((i) => i.status === "pending").length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-red-100 p-6">
          <p className="text-sm text-red-600">En retard</p>
          <p className="text-2xl font-bold text-red-700 mt-1">
            {invoices.filter((i) => i.status === "overdue").length}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-100">
          <div className="flex">
            <button
              onClick={() => setActiveTab("invoices")}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === "invoices"
                  ? "text-[#f1580c] border-b-2 border-[#f1580c]"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Factures
            </button>
            <button
              onClick={() => setActiveTab("methods")}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === "methods"
                  ? "text-[#f1580c] border-b-2 border-[#f1580c]"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Moyens de paiement
            </button>
          </div>
        </div>

        {activeTab === "invoices" ? (
          <div className="p-6 space-y-6">
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher une facture..."
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
                  <option value="paid">Payée</option>
                  <option value="pending">En attente</option>
                  <option value="overdue">En retard</option>
                </select>
              </div>
            </div>

            {/* Invoices List */}
            <div className="space-y-4">
              {filteredInvoices.length === 0 ? (
                <div className="text-center py-12">
                  <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Aucune facture trouvée</p>
                </div>
              ) : (
                filteredInvoices.map((invoice) => {
                  const StatusIcon = statusConfig[invoice.status as keyof typeof statusConfig].icon;
                  return (
                    <div
                      key={invoice.id}
                      className="border border-gray-200 rounded-lg p-6 hover:border-[#6fccd4] transition-colors"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-lg font-bold text-gray-900">{invoice.id}</h3>
                              <p className="text-sm text-gray-500 mt-1">
                                Émise le {invoice.date} • Échéance: {invoice.dueDate}
                              </p>
                            </div>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${
                                statusConfig[invoice.status as keyof typeof statusConfig].color
                              }`}
                            >
                              <StatusIcon className="w-3 h-3" />
                              {invoice.statusLabel}
                            </span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Expédition</p>
                              <p className="font-medium text-gray-900">{invoice.shipmentId}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Description</p>
                              <p className="font-medium text-gray-900">{invoice.description}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Moyen de paiement</p>
                              <p className="font-medium text-gray-900">{invoice.paymentMethod}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 lg:w-56">
                          <div className="text-center lg:text-right mb-2">
                            <p className="text-xs text-gray-500">Montant</p>
                            <p className="text-2xl font-bold text-[#f1580c]">{invoice.amount}</p>
                          </div>
                          <div className="flex gap-2">
                            {invoice.status !== "paid" && (
                              <button className="flex-1 px-4 py-2 bg-[#f1580c] hover:bg-[#d14a0a] text-white rounded-lg transition-colors text-sm font-medium">
                                Payer
                              </button>
                            )}
                            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        ) : (
          <div className="p-6 space-y-6">
            {/* Payment Methods */}
            <div className="space-y-4">
              {paymentMethods.map((method, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-6 hover:border-[#6fccd4] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#6fccd4] to-[#5ab8c0] rounded-lg flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{method.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{method.number}</p>
                        {method.expiry !== "-" && (
                          <p className="text-xs text-gray-500 mt-1">Expire: {method.expiry}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {method.isDefault && (
                        <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                          Par défaut
                        </span>
                      )}
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                        Modifier
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Payment Method */}
            <button className="w-full py-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-[#f1580c] hover:text-[#f1580c] transition-colors font-medium">
              + Ajouter un moyen de paiement
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

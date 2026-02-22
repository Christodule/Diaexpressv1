import { useParams, Link } from "react-router";
import { ArrowLeft, Package, User, MapPin, Phone, Mail, Calendar, CreditCard } from "lucide-react";
import { useState } from "react";
import { createShipment } from "../lib/api";
import { PageHeader, SurfaceCard } from "../components/ui-v2";

export function NewShipment() {
  const { quoteId } = useParams();
  const [formData, setFormData] = useState({
    senderName: "",
    senderPhone: "",
    senderEmail: "",
    senderAddress: "",
    recipientName: "",
    recipientPhone: "",
    recipientEmail: "",
    recipientAddress: "",
    pickupDate: "",
    specialInstructions: "",
    paymentMethod: "card",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      await createShipment({
        quoteId: quoteId ?? "unknown-quote",
        origin: "Dakar, SN",
        destination: "Lyon, FR",
        status: "preparing",
        progress: 5,
        trackingNumber: `TRK-${Date.now()}`,
        currentLocation: formData.senderAddress || "Hub depart",
        estimatedDelivery: formData.pickupDate || new Date().toISOString().slice(0, 10),
      });
      setStatusMessage({
        type: "success",
        text: "Expedition creee avec succes. Elle apparaitra dans vos expeditions.",
      });
    } catch (error) {
      setStatusMessage({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "La creation de l'expedition a echoue.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Header */}
      <div>
        <Link
          to="/quotes"
          className="mb-4 inline-flex items-center gap-2 text-[#f1580c] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux devis
        </Link>
        <PageHeader
          title="Nouvelle expedition"
          subtitle={`Conversion du devis ${quoteId ?? "-"} en expedition operationnelle.`}
        />
      </div>

      {/* Quote Summary */}
      <div className="rounded-2xl bg-gradient-to-r from-[#6fccd4] to-[#5ab8c0] p-6 text-white">
        <h2 className="text-xl font-bold mb-4">Résumé du devis</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-white/80 text-sm">Itinéraire</p>
            <p className="font-bold mt-1">Dakar, SN → Lyon, FR</p>
          </div>
          <div>
            <p className="text-white/80 text-sm">Poids</p>
            <p className="font-bold mt-1">180 kg</p>
          </div>
          <div>
            <p className="text-white/80 text-sm">Montant</p>
            <p className="font-bold mt-1 text-2xl">380,000 FCFA</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {statusMessage && (
          <div
            className={`rounded-lg border px-4 py-3 text-sm ${
              statusMessage.type === "success"
                ? "border-green-200 bg-green-50 text-green-700"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            {statusMessage.text}
          </div>
        )}

        {/* Sender Information */}
        <SurfaceCard className="p-6">
          <h2 className="mb-6 flex items-center gap-2 text-lg font-bold text-slate-900">
            <User className="w-5 h-5 text-[#f1580c]" />
            Informations expediteur
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Nom complet *
              </label>
              <input
                type="text"
                required
                value={formData.senderName}
                onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                className="dx-input"
              />
            </div>
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                <Phone className="w-4 h-4" />
                Téléphone *
              </label>
              <input
                type="tel"
                required
                value={formData.senderPhone}
                onChange={(e) => setFormData({ ...formData, senderPhone: e.target.value })}
                className="dx-input"
              />
            </div>
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                <Mail className="w-4 h-4" />
                Email *
              </label>
              <input
                type="email"
                required
                value={formData.senderEmail}
                onChange={(e) => setFormData({ ...formData, senderEmail: e.target.value })}
                className="dx-input"
              />
            </div>
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                <MapPin className="w-4 h-4" />
                Adresse complète *
              </label>
              <input
                type="text"
                required
                value={formData.senderAddress}
                onChange={(e) => setFormData({ ...formData, senderAddress: e.target.value })}
                className="dx-input"
              />
            </div>
          </div>
        </SurfaceCard>

        {/* Recipient Information */}
        <SurfaceCard className="p-6">
          <h2 className="mb-6 flex items-center gap-2 text-lg font-bold text-slate-900">
            <User className="w-5 h-5 text-[#f1580c]" />
            Informations destinataire
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Nom complet *
              </label>
              <input
                type="text"
                required
                value={formData.recipientName}
                onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                className="dx-input"
              />
            </div>
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                <Phone className="w-4 h-4" />
                Téléphone *
              </label>
              <input
                type="tel"
                required
                value={formData.recipientPhone}
                onChange={(e) => setFormData({ ...formData, recipientPhone: e.target.value })}
                className="dx-input"
              />
            </div>
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                <Mail className="w-4 h-4" />
                Email *
              </label>
              <input
                type="email"
                required
                value={formData.recipientEmail}
                onChange={(e) => setFormData({ ...formData, recipientEmail: e.target.value })}
                className="dx-input"
              />
            </div>
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                <MapPin className="w-4 h-4" />
                Adresse complète *
              </label>
              <input
                type="text"
                required
                value={formData.recipientAddress}
                onChange={(e) => setFormData({ ...formData, recipientAddress: e.target.value })}
                className="dx-input"
              />
            </div>
          </div>
        </SurfaceCard>

        {/* Pickup & Delivery */}
        <SurfaceCard className="p-6">
          <h2 className="mb-6 flex items-center gap-2 text-lg font-bold text-slate-900">
            <Calendar className="w-5 h-5 text-[#f1580c]" />
            Enlevement et livraison
          </h2>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Date d'enlevement souhaitee *
              </label>
              <input
                type="date"
                required
                value={formData.pickupDate}
                onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                className="dx-input"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Instructions spéciales
              </label>
              <textarea
                rows={3}
                value={formData.specialInstructions}
                onChange={(e) => setFormData({ ...formData, specialInstructions: e.target.value })}
                placeholder="Précisez toute information importante pour la collecte ou la livraison..."
                className="dx-input resize-none"
              ></textarea>
            </div>
          </div>
        </SurfaceCard>

        {/* Payment Method */}
        <SurfaceCard className="p-6">
          <h2 className="mb-6 flex items-center gap-2 text-lg font-bold text-slate-900">
            <CreditCard className="w-5 h-5 text-[#f1580c]" />
            Mode de paiement
          </h2>
          <div className="space-y-3">
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-slate-200 p-4 transition-colors hover:border-[#6fccd4]">
              <input
                type="radio"
                name="payment"
                value="card"
                checked={formData.paymentMethod === "card"}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                className="w-5 h-5 text-[#f1580c]"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-900">Carte bancaire</p>
                <p className="text-sm text-gray-500">Paiement sécurisé par carte</p>
              </div>
            </label>
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-slate-200 p-4 transition-colors hover:border-[#6fccd4]">
              <input
                type="radio"
                name="payment"
                value="mobile"
                checked={formData.paymentMethod === "mobile"}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                className="w-5 h-5 text-[#f1580c]"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-900">Mobile Money</p>
                <p className="text-sm text-gray-500">Orange Money, MTN, Moov</p>
              </div>
            </label>
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-slate-200 p-4 transition-colors hover:border-[#6fccd4]">
              <input
                type="radio"
                name="payment"
                value="bank"
                checked={formData.paymentMethod === "bank"}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                className="w-5 h-5 text-[#f1580c]"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-900">Virement bancaire</p>
                <p className="text-sm text-gray-500">Paiement par virement</p>
              </div>
            </label>
          </div>
        </SurfaceCard>

        {/* Submit Buttons */}
        <div className="flex gap-4">
          <Link
            to="/quotes"
            className="dx-btn-secondary flex-1"
          >
            Annuler
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="dx-btn-primary flex-1"
          >
            <Package className="w-5 h-5" />
            {isSubmitting ? "Creation..." : "Creer l'expedition"}
          </button>
        </div>
      </form>
    </div>
  );
}

import { useParams, Link } from "react-router";
import { ArrowLeft, Package, User, MapPin, Phone, Mail, Calendar, CreditCard } from "lucide-react";
import { useState } from "react";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New shipment:", formData);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <Link
          to="/quotes"
          className="inline-flex items-center gap-2 text-[#f1580c] hover:underline mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux devis
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Nouvelle expédition</h1>
        <p className="mt-2 text-gray-600">
          Création d'une expédition à partir du devis <strong>{quoteId}</strong>
        </p>
      </div>

      {/* Quote Summary */}
      <div className="bg-gradient-to-r from-[#6fccd4] to-[#5ab8c0] rounded-xl p-6 text-white">
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
        {/* Sender Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <User className="w-5 h-5 text-[#f1580c]" />
            Informations expéditeur
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom complet *
              </label>
              <input
                type="text"
                required
                value={formData.senderName}
                onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6fccd4]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Téléphone *
              </label>
              <input
                type="tel"
                required
                value={formData.senderPhone}
                onChange={(e) => setFormData({ ...formData, senderPhone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6fccd4]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email *
              </label>
              <input
                type="email"
                required
                value={formData.senderEmail}
                onChange={(e) => setFormData({ ...formData, senderEmail: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6fccd4]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Adresse complète *
              </label>
              <input
                type="text"
                required
                value={formData.senderAddress}
                onChange={(e) => setFormData({ ...formData, senderAddress: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6fccd4]"
              />
            </div>
          </div>
        </div>

        {/* Recipient Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <User className="w-5 h-5 text-[#f1580c]" />
            Informations destinataire
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom complet *
              </label>
              <input
                type="text"
                required
                value={formData.recipientName}
                onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6fccd4]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Téléphone *
              </label>
              <input
                type="tel"
                required
                value={formData.recipientPhone}
                onChange={(e) => setFormData({ ...formData, recipientPhone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6fccd4]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email *
              </label>
              <input
                type="email"
                required
                value={formData.recipientEmail}
                onChange={(e) => setFormData({ ...formData, recipientEmail: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6fccd4]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Adresse complète *
              </label>
              <input
                type="text"
                required
                value={formData.recipientAddress}
                onChange={(e) => setFormData({ ...formData, recipientAddress: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6fccd4]"
              />
            </div>
          </div>
        </div>

        {/* Pickup & Delivery */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#f1580c]" />
            Enlèvement et livraison
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date d'enlèvement souhaitée *
              </label>
              <input
                type="date"
                required
                value={formData.pickupDate}
                onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6fccd4]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instructions spéciales
              </label>
              <textarea
                rows={3}
                value={formData.specialInstructions}
                onChange={(e) => setFormData({ ...formData, specialInstructions: e.target.value })}
                placeholder="Précisez toute information importante pour la collecte ou la livraison..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6fccd4] resize-none"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-[#f1580c]" />
            Mode de paiement
          </h2>
          <div className="space-y-3">
            <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-[#6fccd4] cursor-pointer transition-colors">
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
            <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-[#6fccd4] cursor-pointer transition-colors">
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
            <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-[#6fccd4] cursor-pointer transition-colors">
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
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4">
          <Link
            to="/quotes"
            className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors text-center"
          >
            Annuler
          </Link>
          <button
            type="submit"
            className="flex-1 px-6 py-4 bg-[#f1580c] hover:bg-[#d14a0a] text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Package className="w-5 h-5" />
            Créer l'expédition
          </button>
        </div>
      </form>
    </div>
  );
}

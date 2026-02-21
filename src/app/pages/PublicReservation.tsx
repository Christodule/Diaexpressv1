import { useState } from "react";
import { Package, MapPin, Calendar, User, Phone, Mail, CreditCard, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import logo from "../assets/diaexpress-logo.svg";
import { createReservation } from "../lib/api";

export function PublicReservation() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    weight: "",
    pickupDate: "",
    senderName: "",
    senderPhone: "",
    senderEmail: "",
    recipientName: "",
    recipientPhone: "",
    paymentMethod: "card",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestStatus, setRequestStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setRequestStatus(null);
    try {
      await createReservation({
        origin: formData.origin,
        destination: formData.destination,
        weightKg: Number(formData.weight || 0),
        pickupDate: formData.pickupDate,
        senderName: formData.senderName,
        recipientName: formData.recipientName,
      });
      setRequestStatus({
        type: "success",
        message: "Reservation envoyee. Un conseiller vous contactera rapidement.",
      });
    } catch (error) {
      setRequestStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Impossible de finaliser la reservation pour le moment.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4fee8] to-[#e8f5f1]">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="DIAEXPRESS" className="h-10" />
            </Link>
            <Link
              to="/dashboard"
              className="px-6 py-2 border-2 border-[#f1580c] text-[#f1580c] hover:bg-[#f1580c] hover:text-white rounded-lg transition-colors font-medium"
            >
              Espace client
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-between">
              {[
                { num: 1, label: "Itinéraire" },
                { num: 2, label: "Contacts" },
                { num: 3, label: "Paiement" },
              ].map((s, index) => (
                <div key={s.num} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
                        step >= s.num
                          ? "bg-[#f1580c] text-white shadow-lg"
                          : "bg-white border-2 border-gray-300 text-gray-500"
                      }`}
                    >
                      {s.num}
                    </div>
                    <p
                      className={`mt-2 text-sm font-medium ${
                        step >= s.num ? "text-[#f1580c]" : "text-gray-500"
                      }`}
                    >
                      {s.label}
                    </p>
                  </div>
                  {index < 2 && (
                    <div
                      className={`h-1 flex-1 mx-4 transition-all ${
                        step > s.num ? "bg-[#f1580c]" : "bg-gray-300"
                      }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
            {requestStatus && (
              <div
                className={`mb-6 rounded-lg border px-4 py-3 text-sm ${
                  requestStatus.type === "success"
                    ? "border-green-200 bg-green-50 text-green-700"
                    : "border-red-200 bg-red-50 text-red-700"
                }`}
              >
                {requestStatus.message}
              </div>
            )}

            {/* Step 1: Route */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Informations d'itinéraire</h2>
                  <p className="text-gray-600">Où souhaitez-vous envoyer votre colis ?</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#f1580c]" />
                      Ville de départ *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.origin}
                      onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                      placeholder="Ex: Abidjan"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6fccd4]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#f1580c]" />
                      Ville d'arrivée *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      placeholder="Ex: Paris"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6fccd4]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Package className="w-4 h-4 text-[#f1580c]" />
                      Poids approximatif (kg) *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.1"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                      placeholder="Ex: 25"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6fccd4]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#f1580c]" />
                      Date de collecte souhaitée *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.pickupDate}
                      onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6fccd4]"
                    />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-[#6fccd4]/10 to-[#5ab8c0]/10 border border-[#6fccd4]/20 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-2">Estimation du prix</h3>
                  <p className="text-3xl font-bold text-[#f1580c]">
                    {formData.weight ? `${(parseFloat(formData.weight) * 1500).toLocaleString()} FCFA` : "— FCFA"}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">Prix indicatif basé sur le poids</p>
                </div>
              </div>
            )}

            {/* Step 2: Contacts */}
            {step === 2 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Informations de contact</h2>
                  <p className="text-gray-600">Qui envoie et qui reçoit ce colis ?</p>
                </div>

                {/* Sender */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <User className="w-5 h-5 text-[#f1580c]" />
                    Expéditeur
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nom complet *</label>
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
                    <div className="md:col-span-2">
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
                  </div>
                </div>

                <div className="border-t border-gray-200"></div>

                {/* Recipient */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <User className="w-5 h-5 text-[#f1580c]" />
                    Destinataire
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nom complet *</label>
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
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Mode de paiement</h2>
                  <p className="text-gray-600">Choisissez comment vous souhaitez payer</p>
                </div>

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
                    <CreditCard className="w-6 h-6 text-gray-600" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Carte bancaire</p>
                      <p className="text-sm text-gray-500">Visa, Mastercard</p>
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
                    <Phone className="w-6 h-6 text-gray-600" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Mobile Money</p>
                      <p className="text-sm text-gray-500">Orange Money, MTN, Moov</p>
                    </div>
                  </label>
                </div>

                {/* Summary */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Récapitulatif</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Itinéraire:</span>
                      <span className="font-medium">{formData.origin} → {formData.destination}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Poids:</span>
                      <span className="font-medium">{formData.weight} kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date de collecte:</span>
                      <span className="font-medium">{formData.pickupDate}</span>
                    </div>
                    <div className="border-t border-gray-300 my-3"></div>
                    <div className="flex justify-between text-lg">
                      <span className="font-bold text-gray-900">Total:</span>
                      <span className="font-bold text-[#f1580c]">
                        {(parseFloat(formData.weight || "0") * 1500).toLocaleString()} FCFA
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8 pt-8 border-t border-gray-200">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Précédent
                </button>
              )}
              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 px-6 py-4 bg-[#f1580c] hover:bg-[#d14a0a] text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  Suivant
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-4 bg-[#f1580c] hover:bg-[#d14a0a] disabled:opacity-70 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-5 h-5" />
                  {isSubmitting ? "Confirmation..." : "Confirmer et payer"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

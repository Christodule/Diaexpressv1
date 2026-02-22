import { useState } from "react";
import { Package, MapPin, Calendar, User, Phone, Mail, CreditCard, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import logo from "../assets/diaexpress-logo.svg";
import { createReservation } from "../lib/api";
import { PageHeader, SectionTitle, SurfaceCard } from "../components/ui-v2";

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
    <div className="dx-page">
      <div className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="DIAEXPRESS" className="h-10" />
          </Link>
          <Link to="/dashboard" className="dx-btn-secondary py-2">
            Espace client
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-8">
          <PageHeader
            kicker="Public booking"
            title="Réservation expédition"
            subtitle="Finalisez votre demande en 3 étapes simples."
          />

          <SurfaceCard className="p-6" soft>
            <div className="flex items-center justify-between gap-3">
              {[
                { num: 1, label: "Itinéraire" },
                { num: 2, label: "Contacts" },
                { num: 3, label: "Paiement" },
              ].map((s, index) => (
                <div key={s.num} className="flex flex-1 items-center">
                  <div className="flex flex-1 flex-col items-center">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold transition ${
                        step >= s.num
                          ? "bg-[#f1580c] text-white shadow"
                          : "border-2 border-slate-300 bg-white text-slate-500"
                      }`}
                    >
                      {s.num}
                    </div>
                    <p
                      className={`mt-2 text-xs font-semibold sm:text-sm ${
                        step >= s.num ? "text-[#f1580c]" : "text-slate-500"
                      }`}
                    >
                      {s.label}
                    </p>
                  </div>
                  {index < 2 && (
                    <div className={`mx-3 h-1 flex-1 rounded ${step > s.num ? "bg-[#f1580c]" : "bg-slate-300"}`} />
                  )}
                </div>
              ))}
            </div>
          </SurfaceCard>

          <SurfaceCard className="p-8" hover>
            <form onSubmit={handleSubmit} className="space-y-6">
              {requestStatus && (
                <div
                  className={`rounded-lg border px-4 py-3 text-sm ${
                    requestStatus.type === "success"
                      ? "border-green-200 bg-green-50 text-green-700"
                      : "border-red-200 bg-red-50 text-red-700"
                  }`}
                >
                  {requestStatus.message}
                </div>
              )}

              {step === 1 && (
                <div className="space-y-6">
                  <SectionTitle
                    title="Informations d'itinéraire"
                    subtitle="Où souhaitez-vous envoyer votre colis ?"
                    icon={<MapPin className="h-5 w-5" />}
                  />

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                        <MapPin className="h-4 w-4 text-[#f1580c]" />
                        Ville de départ *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.origin}
                        onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                        placeholder="Ex: Abidjan"
                        className="dx-input"
                      />
                    </div>
                    <div>
                      <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                        <MapPin className="h-4 w-4 text-[#f1580c]" />
                        Ville d'arrivée *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.destination}
                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                        placeholder="Ex: Paris"
                        className="dx-input"
                      />
                    </div>
                    <div>
                      <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                        <Package className="h-4 w-4 text-[#f1580c]" />
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
                        className="dx-input"
                      />
                    </div>
                    <div>
                      <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                        <Calendar className="h-4 w-4 text-[#f1580c]" />
                        Date de collecte souhaitée *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.pickupDate}
                        onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                        className="dx-input"
                      />
                    </div>
                  </div>

                  <div className="rounded-xl border border-cyan-200 bg-cyan-50 p-6">
                    <h3 className="font-bold text-slate-900">Estimation du prix</h3>
                    <p className="mt-2 text-3xl font-bold text-[#f1580c]">
                      {formData.weight
                        ? `${(parseFloat(formData.weight) * 1500).toLocaleString()} FCFA`
                        : "— FCFA"}
                    </p>
                    <p className="mt-2 text-sm text-slate-600">Prix indicatif basé sur le poids</p>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8">
                  <SectionTitle
                    title="Informations de contact"
                    subtitle="Qui envoie et qui reçoit ce colis ?"
                    icon={<User className="h-5 w-5" />}
                  />

                  <div className="space-y-4">
                    <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                      <User className="h-5 w-5 text-[#f1580c]" />
                      Expéditeur
                    </h3>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">Nom complet *</label>
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
                          <Phone className="h-4 w-4" />
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
                      <div className="md:col-span-2">
                        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                          <Mail className="h-4 w-4" />
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
                    </div>
                  </div>

                  <div className="dx-section-divider" />

                  <div className="space-y-4">
                    <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                      <User className="h-5 w-5 text-[#f1580c]" />
                      Destinataire
                    </h3>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">Nom complet *</label>
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
                          <Phone className="h-4 w-4" />
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
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <SectionTitle
                    title="Mode de paiement"
                    subtitle="Choisissez comment vous souhaitez payer."
                    icon={<CreditCard className="h-5 w-5" />}
                  />

                  <div className="space-y-3">
                    <label className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-slate-200 p-4 transition hover:border-[#6fccd4]">
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={formData.paymentMethod === "card"}
                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                        className="h-5 w-5 text-[#f1580c]"
                      />
                      <CreditCard className="h-6 w-6 text-slate-600" />
                      <div className="flex-1">
                        <p className="font-medium text-slate-900">Carte bancaire</p>
                        <p className="text-sm text-slate-500">Visa, Mastercard</p>
                      </div>
                    </label>
                    <label className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-slate-200 p-4 transition hover:border-[#6fccd4]">
                      <input
                        type="radio"
                        name="payment"
                        value="mobile"
                        checked={formData.paymentMethod === "mobile"}
                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                        className="h-5 w-5 text-[#f1580c]"
                      />
                      <Phone className="h-6 w-6 text-slate-600" />
                      <div className="flex-1">
                        <p className="font-medium text-slate-900">Mobile Money</p>
                        <p className="text-sm text-slate-500">Orange Money, MTN, Moov</p>
                      </div>
                    </label>
                  </div>

                  <SurfaceCard className="border-slate-200 bg-slate-50 p-6" soft>
                    <h3 className="mb-4 font-bold text-slate-900">Récapitulatif</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Itinéraire:</span>
                        <span className="font-medium">
                          {formData.origin} → {formData.destination}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Poids:</span>
                        <span className="font-medium">{formData.weight} kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Date de collecte:</span>
                        <span className="font-medium">{formData.pickupDate}</span>
                      </div>
                      <div className="my-3 border-t border-slate-300" />
                      <div className="flex justify-between text-lg">
                        <span className="font-bold text-slate-900">Total:</span>
                        <span className="font-bold text-[#f1580c]">
                          {(parseFloat(formData.weight || "0") * 1500).toLocaleString()} FCFA
                        </span>
                      </div>
                    </div>
                  </SurfaceCard>
                </div>
              )}

              <div className="mt-8 flex gap-4 border-t border-slate-200 pt-8">
                {step > 1 && (
                  <button type="button" onClick={handlePrevious} className="dx-btn-secondary flex-1">
                    Précédent
                  </button>
                )}
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="dx-btn-primary flex-1"
                  >
                    Suivant
                    <ArrowRight className="h-5 w-5" />
                  </button>
                ) : (
                  <button type="submit" disabled={isSubmitting} className="dx-btn-primary flex-1">
                    <CreditCard className="h-5 w-5" />
                    {isSubmitting ? "Confirmation..." : "Confirmer et payer"}
                  </button>
                )}
              </div>
            </form>
          </SurfaceCard>
        </div>
      </div>
    </div>
  );
}

import { useMemo, useState } from "react";
import { Package, MapPin, Calendar, Weight, Ruler, FileText, Send } from "lucide-react";
import { createQuoteRequest, estimatePricing } from "../lib/api";
import { PageHeader, SurfaceCard } from "../components/ui-v2";

export function QuoteRequest() {
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    pickupDate: "",
    packageType: "standard",
    weight: "",
    dimensions: { length: "", width: "", height: "" },
    description: "",
    insurance: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestStatus, setRequestStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);

  const numericWeight = useMemo(() => Number(formData.weight || 0), [formData.weight]);

  const fetchEstimate = async () => {
    if (!numericWeight) {
      setEstimatedPrice(null);
      return;
    }
    try {
      const estimate = await estimatePricing(formData.packageType, numericWeight);
      setEstimatedPrice(estimate.estimateFcfa);
    } catch {
      setEstimatedPrice(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setRequestStatus(null);

    try {
      const fallbackAmount = numericWeight * 1500;
      await createQuoteRequest({
        origin: formData.origin,
        destination: formData.destination,
        weightKg: numericWeight,
        packageType: formData.packageType,
        pickupDate: formData.pickupDate,
        estimatedAmountFcfa: estimatedPrice ?? fallbackAmount,
      });
      setRequestStatus({
        type: "success",
        message: "Votre demande de devis a bien ete enregistree.",
      });
    } catch (error) {
      setRequestStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Impossible de soumettre votre demande pour le moment.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <PageHeader
        title="Demande de devis"
        subtitle="Renseignez les informations d'expedition pour recevoir une proposition tarifaire."
      />

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

        {/* Origin & Destination */}
        <SurfaceCard className="p-6">
          <h2 className="mb-6 flex items-center gap-2 text-lg font-bold text-slate-900">
            <MapPin className="w-5 h-5 text-[#f1580c]" />
            Itineraire
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Ville de depart *
              </label>
              <input
                type="text"
                required
                value={formData.origin}
                onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                placeholder="Ex: Abidjan, Côte d'Ivoire"
                className="dx-input"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Ville d'arrivee *
              </label>
              <input
                type="text"
                required
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                placeholder="Ex: Paris, France"
                className="dx-input"
              />
            </div>
          </div>
        </SurfaceCard>

        {/* Package Details */}
        <SurfaceCard className="p-6">
          <h2 className="mb-6 flex items-center gap-2 text-lg font-bold text-slate-900">
            <Package className="w-5 h-5 text-[#f1580c]" />
            Details du colis
          </h2>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Date de collecte souhaitee *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                  <input
                    type="date"
                    required
                    value={formData.pickupDate}
                    onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                    className="dx-input pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Type de colis *
                </label>
                <select
                  value={formData.packageType}
                  onChange={(e) =>
                    setFormData({ ...formData, packageType: e.target.value })
                  }
                  onBlur={fetchEstimate}
                  className="dx-input"
                >
                  <option value="standard">Standard</option>
                  <option value="express">Express</option>
                  <option value="fragile">Fragile</option>
                  <option value="perishable">Périssable</option>
                  <option value="hazardous">Matières dangereuses</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                <Weight className="w-4 h-4" />
                Poids (kg) *
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.1"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                onBlur={fetchEstimate}
                placeholder="Ex: 25.5"
                className="dx-input"
              />
            </div>

            <div className="rounded-xl border border-cyan-200 bg-cyan-50 p-4">
              <p className="text-xs text-slate-600">Estimation transport</p>
              <p className="mt-1 text-xl font-bold text-[#f1580c]">
                {(estimatedPrice ?? numericWeight * 1500).toLocaleString()} FCFA
              </p>
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                <Ruler className="w-4 h-4" />
                Dimensions (cm)
              </label>
              <div className="grid grid-cols-3 gap-4">
                <input
                  type="number"
                  min="0"
                  value={formData.dimensions.length}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      dimensions: { ...formData.dimensions, length: e.target.value },
                    })
                  }
                  placeholder="Longueur"
                  className="dx-input"
                />
                <input
                  type="number"
                  min="0"
                  value={formData.dimensions.width}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      dimensions: { ...formData.dimensions, width: e.target.value },
                    })
                  }
                  placeholder="Largeur"
                  className="dx-input"
                />
                <input
                  type="number"
                  min="0"
                  value={formData.dimensions.height}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      dimensions: { ...formData.dimensions, height: e.target.value },
                    })
                  }
                  placeholder="Hauteur"
                  className="dx-input"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                <FileText className="w-4 h-4" />
                Description du contenu *
              </label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Décrivez le contenu de votre colis..."
                className="dx-input resize-none"
              ></textarea>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="insurance"
                checked={formData.insurance}
                onChange={(e) => setFormData({ ...formData, insurance: e.target.checked })}
                className="w-5 h-5 text-[#f1580c] border-gray-300 rounded focus:ring-[#6fccd4]"
              />
              <label htmlFor="insurance" className="text-sm text-slate-700">
                Je souhaite assurer mon colis (recommandé pour les envois de valeur)
              </label>
            </div>
          </div>
        </SurfaceCard>

        {/* Additional Services */}
        <SurfaceCard className="p-6">
          <h2 className="mb-4 text-lg font-bold text-slate-900">Services additionnels</h2>
          <div className="space-y-3">
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-4 transition-colors hover:border-cyan-300">
              <input type="checkbox" className="w-5 h-5 text-[#f1580c] border-gray-300 rounded" />
              <div>
                <p className="font-medium text-slate-900">Livraison a domicile</p>
                <p className="text-sm text-slate-500">Livraison directe a l'adresse du destinataire</p>
              </div>
            </label>
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-4 transition-colors hover:border-cyan-300">
              <input type="checkbox" className="w-5 h-5 text-[#f1580c] border-gray-300 rounded" />
              <div>
                <p className="font-medium text-slate-900">Emballage professionnel</p>
                <p className="text-sm text-slate-500">Service d'emballage securise par nos experts</p>
              </div>
            </label>
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-4 transition-colors hover:border-cyan-300">
              <input type="checkbox" className="w-5 h-5 text-[#f1580c] border-gray-300 rounded" />
              <div>
                <p className="font-medium text-slate-900">Notification SMS</p>
                <p className="text-sm text-slate-500">Recevez des alertes a chaque etape</p>
              </div>
            </label>
          </div>
        </SurfaceCard>

        {/* Submit Button */}
        <div className="flex gap-4">
          <button
            type="button"
            className="dx-btn-secondary flex-1"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="dx-btn-primary flex-1"
          >
            <Send className="w-5 h-5" />
            {isSubmitting ? "Envoi en cours..." : "Demander un devis"}
          </button>
        </div>
      </form>
    </div>
  );
}

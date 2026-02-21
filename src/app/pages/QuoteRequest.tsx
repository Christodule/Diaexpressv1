import { useState } from "react";
import { Package, MapPin, Calendar, Weight, Ruler, FileText, Send } from "lucide-react";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Quote request:", formData);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Demande de devis</h1>
        <p className="mt-2 text-gray-600">Remplissez le formulaire pour obtenir un devis personnalisé</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Origin & Destination */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#f1580c]" />
            Itinéraire
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ville de départ *
              </label>
              <input
                type="text"
                required
                value={formData.origin}
                onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                placeholder="Ex: Abidjan, Côte d'Ivoire"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6fccd4]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ville d'arrivée *
              </label>
              <input
                type="text"
                required
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                placeholder="Ex: Paris, France"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6fccd4]"
              />
            </div>
          </div>
        </div>

        {/* Package Details */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Package className="w-5 h-5 text-[#f1580c]" />
            Détails du colis
          </h2>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date de collecte souhaitée *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    required
                    value={formData.pickupDate}
                    onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6fccd4]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type de colis *
                </label>
                <select
                  value={formData.packageType}
                  onChange={(e) => setFormData({ ...formData, packageType: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6fccd4]"
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
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
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
                placeholder="Ex: 25.5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6fccd4]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6fccd4]"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6fccd4]"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6fccd4]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Description du contenu *
              </label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Décrivez le contenu de votre colis..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6fccd4] resize-none"
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
              <label htmlFor="insurance" className="text-sm text-gray-700">
                Je souhaite assurer mon colis (recommandé pour les envois de valeur)
              </label>
            </div>
          </div>
        </div>

        {/* Additional Services */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Services additionnels</h2>
          <div className="space-y-3">
            <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-[#6fccd4] cursor-pointer transition-colors">
              <input type="checkbox" className="w-5 h-5 text-[#f1580c] border-gray-300 rounded" />
              <div>
                <p className="font-medium text-gray-900">Livraison à domicile</p>
                <p className="text-sm text-gray-500">Livraison directe à l'adresse du destinataire</p>
              </div>
            </label>
            <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-[#6fccd4] cursor-pointer transition-colors">
              <input type="checkbox" className="w-5 h-5 text-[#f1580c] border-gray-300 rounded" />
              <div>
                <p className="font-medium text-gray-900">Emballage professionnel</p>
                <p className="text-sm text-gray-500">Service d'emballage sécurisé par nos experts</p>
              </div>
            </label>
            <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-[#6fccd4] cursor-pointer transition-colors">
              <input type="checkbox" className="w-5 h-5 text-[#f1580c] border-gray-300 rounded" />
              <div>
                <p className="font-medium text-gray-900">Notification SMS</p>
                <p className="text-sm text-gray-500">Recevez des alertes à chaque étape</p>
              </div>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex gap-4">
          <button
            type="button"
            className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="flex-1 px-6 py-4 bg-[#f1580c] hover:bg-[#d14a0a] text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" />
            Demander un devis
          </button>
        </div>
      </form>
    </div>
  );
}

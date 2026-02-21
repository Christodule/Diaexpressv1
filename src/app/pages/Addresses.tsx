import { MapPin, Plus, Edit, Trash2, Star } from "lucide-react";

const addresses = [
  {
    id: 1,
    label: "Bureau principal",
    name: "Jean Kouassi",
    address: "Zone Industrielle de Yopougon",
    city: "Abidjan",
    country: "Côte d'Ivoire",
    phone: "+225 07 XX XX XX XX",
    isDefault: true,
    type: "work",
  },
  {
    id: 2,
    label: "Domicile",
    name: "Jean Kouassi",
    address: "Cocody Riviera 2",
    city: "Abidjan",
    country: "Côte d'Ivoire",
    phone: "+225 05 XX XX XX XX",
    isDefault: false,
    type: "home",
  },
  {
    id: 3,
    label: "Entrepôt secondaire",
    name: "Import Export CI",
    address: "Zone Portuaire",
    city: "Abidjan",
    country: "Côte d'Ivoire",
    phone: "+225 27 XX XX XX XX",
    isDefault: false,
    type: "work",
  },
];

export function Addresses() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mes adresses</h1>
          <p className="mt-2 text-gray-600">Gérez vos adresses d'expédition et de livraison</p>
        </div>
        <button className="px-6 py-3 bg-[#f1580c] hover:bg-[#d14a0a] text-white font-bold rounded-lg transition-colors flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Nouvelle adresse
        </button>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex gap-4">
          <MapPin className="w-6 h-6 text-blue-600 flex-shrink-0" />
          <div>
            <h4 className="font-bold text-gray-900 mb-2">Pourquoi enregistrer vos adresses ?</h4>
            <p className="text-sm text-gray-600">
              Enregistrez vos adresses fréquemment utilisées pour accélérer la création de vos
              expéditions. Vous pourrez les sélectionner rapidement lors de vos prochaines commandes.
            </p>
          </div>
        </div>
      </div>

      {/* Addresses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((address) => (
          <div
            key={address.id}
            className={`bg-white rounded-xl shadow-sm border-2 transition-all hover:shadow-lg ${
              address.isDefault ? "border-[#f1580c]" : "border-gray-100"
            }`}
          >
            {/* Header */}
            <div
              className={`px-6 py-4 border-b ${
                address.isDefault ? "bg-[#f1580c]/5 border-[#f1580c]/20" : "bg-gray-50 border-gray-100"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      address.type === "work" ? "bg-blue-100" : "bg-green-100"
                    }`}
                  >
                    <MapPin
                      className={`w-5 h-5 ${
                        address.type === "work" ? "text-blue-600" : "text-green-600"
                      }`}
                    />
                  </div>
                  <h3 className="font-bold text-gray-900">{address.label}</h3>
                </div>
                {address.isDefault && (
                  <div className="flex items-center gap-1 px-3 py-1 bg-[#f1580c] text-white rounded-full text-xs font-medium">
                    <Star className="w-3 h-3 fill-current" />
                    Par défaut
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Nom du contact</p>
                <p className="font-medium text-gray-900">{address.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Adresse complète</p>
                <p className="font-medium text-gray-900">
                  {address.address}
                  <br />
                  {address.city}, {address.country}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Téléphone</p>
                <p className="font-medium text-gray-900">{address.phone}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex gap-2">
              {!address.isDefault && (
                <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium">
                  Définir par défaut
                </button>
              )}
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                <Edit className="w-4 h-4" />
              </button>
              <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {/* Add New Address Card */}
        <div className="bg-white rounded-xl shadow-sm border-2 border-dashed border-gray-300 hover:border-[#f1580c] transition-colors cursor-pointer group">
          <div className="h-full flex flex-col items-center justify-center p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 group-hover:bg-[#f1580c]/10 rounded-full flex items-center justify-center mb-4 transition-colors">
              <Plus className="w-8 h-8 text-gray-400 group-hover:text-[#f1580c] transition-colors" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Ajouter une nouvelle adresse</h3>
            <p className="text-sm text-gray-500">
              Enregistrez une adresse pour l'utiliser dans vos futures expéditions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

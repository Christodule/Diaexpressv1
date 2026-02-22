import { MapPin, Plus, Edit, Trash2, Star } from "lucide-react";
import { PageHeader, SectionTitle, StatusBadge, SurfaceCard } from "../components/ui-v2";

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
    <div className="mx-auto max-w-5xl space-y-8">
      <PageHeader
        kicker="Address Book"
        title="Mes adresses"
        subtitle="Gérez vos adresses d'expédition et de livraison."
        action={
          <button className="dx-btn-primary">
            <Plus className="h-5 w-5" />
            Nouvelle adresse
          </button>
        }
      />

      <SurfaceCard className="border-blue-200 bg-blue-50 p-6" soft>
        <div className="flex gap-4">
          <MapPin className="h-6 w-6 flex-shrink-0 text-blue-600" />
          <div>
            <SectionTitle title="Pourquoi enregistrer vos adresses ?" />
            <p className="text-sm text-slate-600">
              Enregistrez vos adresses fréquemment utilisées pour accélérer la création de vos
              expéditions. Vous pourrez les sélectionner rapidement lors de vos prochaines commandes.
            </p>
          </div>
        </div>
      </SurfaceCard>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {addresses.map((address) => (
          <SurfaceCard
            key={address.id}
            className={`overflow-hidden border-2 ${
              address.isDefault ? "border-[#f1580c]" : "border-slate-200"
            }`}
            hover
          >
            <div
              className={`px-6 py-4 border-b ${
                address.isDefault
                  ? "border-[#f1580c]/20 bg-[#f1580c]/5"
                  : "border-slate-200 bg-slate-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      address.type === "work" ? "bg-blue-100" : "bg-green-100"
                    }`}
                  >
                    <MapPin
                      className={`h-5 w-5 ${
                        address.type === "work" ? "text-blue-600" : "text-green-600"
                      }`}
                    />
                  </div>
                  <h3 className="font-bold text-slate-900">{address.label}</h3>
                </div>
                {address.isDefault && (
                  <StatusBadge
                    label={
                      <>
                        <Star className="h-3 w-3 fill-current" />
                        Par défaut
                      </>
                    }
                    tone="warning"
                    className="gap-1 border-[#f1580c]/20 bg-[#f1580c] text-white"
                  />
                )}
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <p className="mb-1 text-sm text-slate-500">Nom du contact</p>
                <p className="font-medium text-slate-900">{address.name}</p>
              </div>
              <div>
                <p className="mb-1 text-sm text-slate-500">Adresse complète</p>
                <p className="font-medium text-slate-900">
                  {address.address}
                  <br />
                  {address.city}, {address.country}
                </p>
              </div>
              <div>
                <p className="mb-1 text-sm text-slate-500">Téléphone</p>
                <p className="font-medium text-slate-900">{address.phone}</p>
              </div>
            </div>

            <div className="flex gap-2 border-t border-slate-100 bg-slate-50 px-6 py-4">
              {!address.isDefault && (
                <button className="dx-btn-secondary flex-1 py-2 text-sm">
                  Définir par défaut
                </button>
              )}
              <button className="dx-btn-secondary px-4 py-2">
                <Edit className="h-4 w-4" />
              </button>
              <button className="inline-flex items-center justify-center rounded-xl border border-red-300 px-4 py-2 text-red-600 transition hover:bg-red-50">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </SurfaceCard>
        ))}

        <div className="group cursor-pointer rounded-2xl border-2 border-dashed border-slate-300 bg-white transition hover:border-[#f1580c]">
          <div className="flex h-full flex-col items-center justify-center p-12 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 transition group-hover:bg-[#f1580c]/10">
              <Plus className="h-8 w-8 text-slate-400 transition group-hover:text-[#f1580c]" />
            </div>
            <h3 className="mb-2 font-bold text-slate-900">Ajouter une nouvelle adresse</h3>
            <p className="text-sm text-slate-500">
              Enregistrez une adresse pour l'utiliser dans vos futures expéditions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

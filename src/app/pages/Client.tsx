import { User, Mail, Phone, MapPin, Calendar, Shield, Edit, Camera } from "lucide-react";
import { PageHeader, SectionTitle, StatCard, SurfaceCard } from "../components/ui-v2";

export function Client() {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <PageHeader
        kicker="Account"
        title="Mon profil"
        subtitle="Gérez vos informations personnelles et les paramètres de sécurité."
      />

      <SurfaceCard className="border-0 bg-gradient-to-r from-[#6fccd4] to-[#5ab8c0] p-8 text-white shadow-lg">
        <div className="flex flex-col items-center gap-6 md:flex-row">
          <div className="group relative">
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-white/20 text-4xl font-bold">
              <User className="h-16 w-16" />
            </div>
            <button
              className="absolute bottom-0 right-0 rounded-full bg-[#f1580c] p-3 shadow-lg transition hover:bg-[#d14a0a]"
              aria-label="Modifier la photo"
            >
              <Camera className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold">Jean Kouassi</h2>
            <p className="mt-2 text-white/90">Client Premium</p>
            <p className="text-sm text-white/80">Membre depuis Janvier 2024</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-xl bg-white/20 px-6 py-3 font-semibold transition hover:bg-white/30">
            <Edit className="h-5 w-5" />
            Modifier le profil
          </button>
        </div>
      </SurfaceCard>

      <SurfaceCard className="p-6" hover>
        <SectionTitle title="Informations personnelles" icon={<User className="h-5 w-5" />} />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
              <User className="h-4 w-4" />
              Nom complet
            </label>
            <input type="text" defaultValue="Jean Kouassi" className="dx-input" />
          </div>
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
              <Mail className="h-4 w-4" />
              Email
            </label>
            <input type="email" defaultValue="jean.kouassi@email.com" className="dx-input" />
          </div>
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
              <Phone className="h-4 w-4" />
              Téléphone
            </label>
            <input type="tel" defaultValue="+225 07 XX XX XX XX" className="dx-input" />
          </div>
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
              <Calendar className="h-4 w-4" />
              Date de naissance
            </label>
            <input type="date" defaultValue="1990-05-15" className="dx-input" />
          </div>
          <div className="md:col-span-2">
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
              <MapPin className="h-4 w-4" />
              Adresse
            </label>
            <input
              type="text"
              defaultValue="Cocody, Abidjan, Côte d'Ivoire"
              className="dx-input"
            />
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <button className="dx-btn-primary">Enregistrer les modifications</button>
          <button className="dx-btn-secondary">Annuler</button>
        </div>
      </SurfaceCard>

      <SurfaceCard className="p-6" hover>
        <SectionTitle
          title="Informations entreprise"
          icon={<Shield className="h-5 w-5" />}
          subtitle="Données administratives de facturation."
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Nom de l'entreprise</label>
            <input type="text" defaultValue="Import Export CI" className="dx-input" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Numéro d'immatriculation
            </label>
            <input type="text" defaultValue="CI-ABJ-2024-0001" className="dx-input" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Secteur d'activité</label>
            <select className="dx-input">
              <option>Import/Export</option>
              <option>Commerce</option>
              <option>Industrie</option>
              <option>Services</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              TVA intracommunautaire
            </label>
            <input type="text" defaultValue="FR123456789" className="dx-input" />
          </div>
        </div>
      </SurfaceCard>

      <SurfaceCard className="p-6" hover>
        <SectionTitle
          title="Sécurité et confidentialité"
          icon={<Shield className="h-5 w-5" />}
        />
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
            <div>
              <h3 className="font-medium text-slate-900">Mot de passe</h3>
              <p className="mt-1 text-sm text-slate-500">Dernière modification il y a 3 mois</p>
            </div>
            <button className="dx-btn-secondary py-2 text-sm">Modifier</button>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
            <div>
              <h3 className="font-medium text-slate-900">Authentification à deux facteurs</h3>
              <p className="mt-1 text-sm text-slate-500">Sécurisez votre compte avec un code SMS</p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" className="peer sr-only" />
              <div className="h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-slate-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#6fccd4] peer-checked:after:translate-x-full peer-checked:after:border-white" />
            </label>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
            <div>
              <h3 className="font-medium text-slate-900">Notifications par email</h3>
              <p className="mt-1 text-sm text-slate-500">Recevez des mises à jour sur vos envois</p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" defaultChecked className="peer sr-only" />
              <div className="h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-slate-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#6fccd4] peer-checked:after:translate-x-full peer-checked:after:border-white" />
            </label>
          </div>
        </div>
      </SurfaceCard>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard
          label="Niveau de compte"
          value="Premium"
          tone="secondary"
          icon={<Shield className="h-4 w-4" />}
        />
        <StatCard
          label="Envois totaux"
          value="156"
          tone="success"
          icon={<User className="h-4 w-4" />}
        />
        <StatCard
          label="Client depuis"
          value="2024"
          tone="default"
          icon={<Calendar className="h-4 w-4" />}
        />
      </div>
    </div>
  );
}

import { Link } from "react-router";
import { Home, Search } from "lucide-react";
import { PageHeader, SurfaceCard } from "../components/ui-v2";

export function NotFound() {
  return (
    <div className="dx-page flex min-h-screen items-center justify-center px-4 py-10">
      <SurfaceCard className="w-full max-w-3xl p-8 text-center sm:p-10" hover>
        <div className="mb-2 text-[120px] font-bold leading-none text-[#f1580c]/15 sm:text-[170px]">
          404
        </div>
        <div className="-mt-12 mb-8 flex justify-center">
          <div className="inline-flex h-28 w-28 items-center justify-center rounded-full border border-slate-200 bg-white shadow sm:h-32 sm:w-32">
            <Search className="h-12 w-12 text-[#f1580c] sm:h-14 sm:w-14" />
          </div>
        </div>

        <PageHeader
          title="Page introuvable"
          subtitle="Désolé, nous n'avons pas pu trouver la page que vous recherchez. Elle a peut-être été déplacée ou n'existe plus."
        />

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/" className="dx-btn-primary">
            <Home className="h-5 w-5" />
            Retour à l'accueil
          </Link>
          <Link to="/dashboard" className="dx-btn-secondary">
            Tableau de bord
          </Link>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-6">
          <p className="mb-4 text-sm text-slate-600">Liens utiles :</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link to="/track-shipment" className="font-medium text-[#f1580c] hover:underline">
              Suivre un colis
            </Link>
            <Link to="/quote-request" className="font-medium text-[#f1580c] hover:underline">
              Demander un devis
            </Link>
            <Link to="/shipments" className="font-medium text-[#f1580c] hover:underline">
              Mes expéditions
            </Link>
            <Link
              to="/public-dashboard/reservation"
              className="font-medium text-[#f1580c] hover:underline"
            >
              Réservation publique
            </Link>
          </div>
        </div>
      </SurfaceCard>
    </div>
  );
}

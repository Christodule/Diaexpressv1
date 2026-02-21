import { Link } from "react-router";
import { Home, Search } from "lucide-react";

export function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4fee8] to-[#e8f5f1] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <h1 className="text-[150px] sm:text-[200px] font-bold text-[#f1580c]/20 leading-none">
            404
          </h1>
          <div className="-mt-16 sm:-mt-24">
            <div className="inline-flex items-center justify-center w-32 h-32 sm:w-40 sm:h-40 bg-white rounded-full shadow-lg">
              <Search className="w-16 h-16 sm:w-20 sm:h-20 text-[#f1580c]" />
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Page introuvable
          </h2>
          <p className="text-lg text-gray-600 mb-2">
            Désolé, nous n'avons pas pu trouver la page que vous recherchez.
          </p>
          <p className="text-gray-500">
            La page a peut-être été déplacée ou n'existe plus.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#f1580c] hover:bg-[#d14a0a] text-white font-bold rounded-lg transition-colors"
          >
            <Home className="w-5 h-5" />
            Retour à l'accueil
          </Link>
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-[#f1580c] text-[#f1580c] hover:bg-[#f1580c] hover:text-white font-bold rounded-lg transition-colors"
          >
            Tableau de bord
          </Link>
        </div>

        {/* Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-4">Liens utiles :</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link to="/track-shipment" className="text-[#f1580c] hover:underline">
              Suivre un colis
            </Link>
            <Link to="/quote-request" className="text-[#f1580c] hover:underline">
              Demander un devis
            </Link>
            <Link to="/shipments" className="text-[#f1580c] hover:underline">
              Mes expéditions
            </Link>
            <Link to="/contact" className="text-[#f1580c] hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

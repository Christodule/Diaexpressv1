import { Outlet, Link, useLocation } from "react-router";
import {
  LayoutDashboard,
  FileText,
  Package,
  Navigation,
  Truck,
  CreditCard,
  User,
  MapPin,
  Menu,
  X,
  Bell,
  Settings,
  LogOut,
  Home,
} from "lucide-react";
import { useState } from "react";
import logo from "../assets/diaexpress-logo.svg";

const navigation = [
  { name: "Tableau de bord", href: "/dashboard", icon: LayoutDashboard },
  { name: "Demande de devis", href: "/quote-request", icon: FileText },
  { name: "Mes devis", href: "/quotes", icon: FileText },
  { name: "Expeditions", href: "/shipments", icon: Package },
  { name: "Suivi colis", href: "/track-shipment", icon: Navigation },
  { name: "Mes colis", href: "/mes-colis", icon: Package },
  { name: "Livraisons", href: "/delivery", icon: Truck },
  { name: "Paiements", href: "/payments", icon: CreditCard },
  { name: "Mon profil", href: "/client", icon: User },
  { name: "Mes adresses", href: "/profile/addresses", icon: MapPin },
];

const isSameOrChildRoute = (pathname: string, route: string) =>
  pathname === route || pathname.startsWith(`${route}/`);

function NavigationList({
  pathname,
  onLinkClick,
}: {
  pathname: string;
  onLinkClick?: () => void;
}) {
  return (
    <ul className="space-y-2">
      {navigation.map((item) => {
        const Icon = item.icon;
        const active = isSameOrChildRoute(pathname, item.href);
        return (
          <li key={item.name}>
            <Link
              to={item.href}
              onClick={onLinkClick}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                active
                  ? "bg-gradient-to-r from-[#f1580c] to-[#ff7d36] text-white shadow-md"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{item.name}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function ClientV2Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="dx-page">
      <div
        className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}
        aria-hidden={!sidebarOpen}
      >
        <div
          className="fixed inset-0 bg-slate-900/70 backdrop-blur-[1px]"
          onClick={() => setSidebarOpen(false)}
        />
        <aside className="fixed inset-y-0 left-0 flex w-full max-w-xs flex-col border-r border-slate-200 bg-white p-4">
          <div className="mb-4 flex items-center justify-between rounded-xl border border-slate-200 px-3 py-2">
            <img src={logo} alt="DIAEXPRESS" className="h-8 w-auto" />
            <button
              onClick={() => setSidebarOpen(false)}
              className="rounded-md p-1 text-slate-500 hover:bg-slate-100"
              aria-label="Fermer la navigation"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto">
            <NavigationList
              pathname={location.pathname}
              onLinkClick={() => setSidebarOpen(false)}
            />
          </nav>
        </aside>
      </div>

      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-slate-200 bg-gradient-to-b from-white to-slate-50 p-5 lg:flex lg:flex-col">
        <div className="mb-6 flex items-center rounded-xl border border-slate-200 px-3 py-2">
          <img src={logo} alt="DIAEXPRESS" className="h-8 w-auto" />
        </div>
        <nav className="flex-1 overflow-y-auto">
          <div className="mb-2">
            <Link
              to="/"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              <Home className="h-4 w-4" />
              <span>Accueil</span>
            </Link>
          </div>
          <NavigationList pathname={location.pathname} />
        </nav>
        <button className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-100">
          <LogOut className="h-4 w-4" />
          Deconnexion
        </button>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 px-4 py-3 backdrop-blur sm:px-6 lg:px-8">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#f1580c] via-[#ffb629] to-[#6fccd4]" />
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="rounded-xl border border-slate-200 p-2 text-slate-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
              aria-label="Ouvrir la navigation"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="hidden text-sm font-semibold text-slate-700 lg:block">
              Plateforme client DIAEXPRESS
            </div>
            <div className="flex items-center gap-2">
              <button className="rounded-xl border border-slate-200 p-2 text-slate-500 hover:bg-slate-50">
                <Bell className="h-5 w-5" />
              </button>
              <button className="rounded-xl border border-slate-200 p-2 text-slate-500 hover:bg-slate-50">
                <Settings className="h-5 w-5" />
              </button>
              <Link
                to="/client"
                className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 sm:flex"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#6fccd4] text-white">
                  <User className="h-4 w-4" />
                </div>
                <span>Client DIAEXPRESS</span>
              </Link>
            </div>
          </div>
        </header>

        <main className="px-4 py-8 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

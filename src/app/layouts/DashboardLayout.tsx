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
  { name: "Expéditions", href: "/shipments", icon: Package },
  { name: "Suivi colis", href: "/track-shipment", icon: Navigation },
  { name: "Mes colis", href: "/mes-colis", icon: Package },
  { name: "Livraisons", href: "/delivery", icon: Truck },
  { name: "Paiements", href: "/payments", icon: CreditCard },
  { name: "Mon profil", href: "/client", icon: User },
  { name: "Mes adresses", href: "/profile/addresses", icon: MapPin },
];

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          sidebarOpen ? "block" : "hidden"
        }`}
      >
        <div
          className="fixed inset-0 bg-gray-900/80"
          onClick={() => setSidebarOpen(false)}
        ></div>
        <div className="fixed inset-y-0 left-0 flex w-full max-w-xs flex-col bg-white">
          <div className="flex h-16 items-center justify-between px-6 border-b">
            <img src={logo} alt="DIAEXPRESS" className="h-8" />
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-4 py-4">
            <ul className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive(item.href)
                          ? "bg-[#f1580c] text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        <div className="flex flex-col flex-1 border-r bg-white">
          <div className="flex h-16 items-center px-6 border-b">
            <img src={logo} alt="DIAEXPRESS" className="h-8" />
          </div>
          <nav className="flex-1 overflow-y-auto px-4 py-4">
            <ul className="space-y-1">
              <li className="mb-4">
                <Link
                  to="/"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <Home className="w-5 h-5" />
                  <span className="font-medium">Accueil</span>
                </Link>
              </li>
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive(item.href)
                          ? "bg-[#f1580c] text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="p-4 border-t">
            <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors w-full">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Déconnexion</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 items-center gap-x-4 border-b bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1"></div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <button className="relative p-2 text-gray-500 hover:text-gray-700">
                <Bell className="h-6 w-6" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <Settings className="h-6 w-6" />
              </button>
              <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"></div>
              <Link
                to="/client"
                className="flex items-center gap-3 hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors"
              >
                <div className="h-8 w-8 rounded-full bg-[#6fccd4] flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div className="hidden lg:block text-sm">
                  <p className="font-medium text-gray-700">Client DIAEXPRESS</p>
                  <p className="text-gray-500">client@email.com</p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-8">
          <div className="px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

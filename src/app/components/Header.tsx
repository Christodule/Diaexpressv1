import { Search } from 'lucide-react';
import logo from '../assets/diaexpress-logo.svg';
import { Link } from "react-router";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#1a1a2e]/85 backdrop-blur-md">
      <div className="bg-gradient-to-r from-[#f1580c]/40 via-[#f1580c]/25 to-transparent py-3">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/">
                <img src={logo} alt="DIAEXPRESS" className="h-10 w-auto sm:h-12" />
              </Link>
            </div>

            <nav className="hidden items-center gap-7 md:flex">
              <a href="#tracking" className="group relative text-[#f4fee8] transition-colors hover:text-white">
                <span>Suivi</span>
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[#f1580c] transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#services" className="text-[#f4fee8] transition-colors hover:text-white">Services</a>
              <a href="#contact" className="text-[#f4fee8] transition-colors hover:text-white">Contact</a>
              <Link to="/public-dashboard/reservation" className="text-[#f4fee8] transition-colors hover:text-white">
                Reservation
              </Link>
              <Link to="/dashboard" className="text-[#f4fee8] transition-colors hover:text-white">
                Espace client
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              <button className="hidden items-center gap-2 text-[#f4fee8] transition-colors hover:text-white sm:flex">
                <Search className="w-5 h-5" />
                <span className="hidden lg:inline">recherche</span>
              </button>
              <Link
                to="/quote-request"
                className="inline-flex items-center gap-2 rounded-xl bg-[#f1580c] px-4 py-2 text-[#f4fee8] shadow-md transition-colors hover:bg-[#d14a0a]"
              >
                <span className="text-sm sm:text-base">Obtenez un devis</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden bg-[#1a1a2e] px-4 py-3">
        <nav className="flex justify-center gap-6 text-sm">
          <a href="#tracking" className="text-[#f4fee8]">Suivi</a>
          <Link to="/quote-request" className="text-[#f4fee8]">Devis</Link>
          <Link to="/public-dashboard/reservation" className="text-[#f4fee8]">Reservation</Link>
          <Link to="/dashboard" className="text-[#f4fee8]">Client</Link>
        </nav>
      </div>
    </header>
  );
}

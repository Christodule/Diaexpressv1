import { Search } from 'lucide-react';
import logo from 'figma:asset/a8b949375d4d4bd5959a538d6dad3247b1409ed4.png';
import { Link } from "react-router";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a2e]/95 backdrop-blur-sm">
      {/* Top Bar with Orange Gradient */}
      <div className="bg-gradient-to-r from-[#f1580c]/40 to-[#f1580c]/20 py-3">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/">
                <img src={logo} alt="DIAEXPRESS" className="h-10 w-auto sm:h-12" />
              </Link>
            </div>

            {/* Navigation - Hidden on mobile */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#tracking" className="text-[#f4fee8] hover:text-white transition-colors relative group">
                <span>Suivi</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#f1580c] group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#services" className="text-[#f4fee8] hover:text-white transition-colors">Services</a>
              <a href="#contact" className="text-[#f4fee8] hover:text-white transition-colors">Contact</a>
              <Link to="/public-dashboard/reservation" className="text-[#f4fee8] hover:text-white transition-colors">
                Reservation
              </Link>
              <Link to="/dashboard" className="text-[#f4fee8] hover:text-white transition-colors">
                Espace client
              </Link>
            </nav>

            {/* Search & CTA */}
            <div className="flex items-center gap-4">
              <button className="hidden sm:flex items-center gap-2 text-[#f4fee8] hover:text-white transition-colors">
                <Search className="w-5 h-5" />
                <span className="hidden lg:inline">recherche</span>
              </button>
              <Link
                to="/quote-request"
                className="bg-[#f1580c] hover:bg-[#d14a0a] text-[#f4fee8] px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
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

      {/* Mobile Menu Button */}
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

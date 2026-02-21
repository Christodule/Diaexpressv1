import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import logo from '../assets/diaexpress-logo.svg';

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <img src={logo} alt="DIAEXPRESS" className="h-12 w-auto" />
            <p className="text-white/70 text-sm leading-relaxed">
              Votre partenaire de confiance pour le transport et la logistique internationale en Afrique.
            </p>
            <div className="flex gap-3">
              <a href="#" className="bg-white/10 hover:bg-[#f1580c] p-2 rounded-lg transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-[#f1580c] p-2 rounded-lg transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-[#f1580c] p-2 rounded-lg transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-[#f1580c] p-2 rounded-lg transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Liens rapides</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="text-white/70 hover:text-white transition-colors">À propos</a></li>
              <li><a href="#services" className="text-white/70 hover:text-white transition-colors">Services</a></li>
              <li><a href="#tracking" className="text-white/70 hover:text-white transition-colors">Suivi</a></li>
              <li><a href="#contact" className="text-white/70 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-4">Nos services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Transport maritime</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Transport aérien</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Dédouanement</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Stockage</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-lg mb-4">Newsletter</h4>
            <p className="text-white/70 text-sm mb-4">
              Inscrivez-vous pour recevoir nos actualités
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Votre email"
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#6fccd4] text-white placeholder-white/50"
              />
              <button
                type="submit"
                className="w-full bg-[#f1580c] hover:bg-[#d14a0a] px-4 py-2 rounded-lg transition-colors font-medium"
              >
                S'abonner
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/70 text-sm text-center md:text-left">
              © 2026 DIAEXPRESS. Tous droits réservés.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                Politique de confidentialité
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                Conditions d'utilisation
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

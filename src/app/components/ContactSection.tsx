import { Mail, Phone, MapPin, Send } from 'lucide-react';

export function ContactSection() {
  return (
    <section id="contact" className="py-16 md:py-24 bg-[#f4fee8]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a1a2e] mb-4">
            Contactez-nous
          </h2>
          <div className="w-20 h-1 bg-[#f1580c] mx-auto mb-6"></div>
          <p className="text-lg text-[#1a1a2e]/70 max-w-2xl mx-auto">
            Notre équipe est à votre disposition pour répondre à toutes vos questions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#1a1a2e] mb-2">
                  Nom complet
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6fccd4] transition-shadow"
                  placeholder="Votre nom"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#1a1a2e] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6fccd4] transition-shadow"
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-[#1a1a2e] mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6fccd4] transition-shadow"
                  placeholder="+225 XX XX XX XX XX"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#1a1a2e] mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6fccd4] transition-shadow resize-none"
                  placeholder="Votre message..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#f1580c] hover:bg-[#d14a0a] text-white font-bold py-4 rounded-lg transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Envoyer le message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-[#1a1a2e] mb-6">Informations de contact</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-[#6fccd4] p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1a1a2e] mb-1">Téléphone</h4>
                    <p className="text-[#1a1a2e]/70">+225 27 XX XX XX XX</p>
                    <p className="text-[#1a1a2e]/70">+225 07 XX XX XX XX</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#f1580c] p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1a1a2e] mb-1">Email</h4>
                    <p className="text-[#1a1a2e]/70">contact@diaexpress.com</p>
                    <p className="text-[#1a1a2e]/70">support@diaexpress.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#FFB629] p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1a1a2e] mb-1">Adresse</h4>
                    <p className="text-[#1a1a2e]/70">
                      Zone Portuaire d'Abidjan<br />
                      Côte d'Ivoire
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#6fccd4] to-[#5ab8c0] rounded-2xl p-8 text-white shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Heures d'ouverture</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Lundi - Vendredi:</span>
                  <span className="font-bold">8h00 - 18h00</span>
                </div>
                <div className="flex justify-between">
                  <span>Samedi:</span>
                  <span className="font-bold">9h00 - 14h00</span>
                </div>
                <div className="flex justify-between">
                  <span>Dimanche:</span>
                  <span className="font-bold">Fermé</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

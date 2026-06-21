import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { TrackingSection } from '../components/TrackingSection';
import { ServicesIcons } from '../components/ServicesIcons';
import { AboutSection } from '../components/AboutSection';
import { ServicesSection } from '../components/ServicesSection';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { Testimonials } from '../components/Testimonials';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';

export function Home() {
  return (
    <div className="min-h-screen bg-[#f4fee8]">
      <Header />
      <main>
        <Hero />
        <TrackingSection />
        <ServicesIcons />
        <AboutSection />
        <ServicesSection />
        <WhyChooseUs />
        <Testimonials />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

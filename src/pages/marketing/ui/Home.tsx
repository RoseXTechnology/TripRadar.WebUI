import { HeroSection, HowItWorks, BenefitsSection, CTASection } from '../components/home';

export const Home = () => (
  <div className="min-h-screen bg-hero-bg text-hero-subtitle transition-colors duration-300 overflow-hidden pt-16">
    <HeroSection />
    <HowItWorks />
    <BenefitsSection />
    <CTASection />
  </div>
);

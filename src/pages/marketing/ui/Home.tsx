import { HeroSection, AIAssistantSection, HowItWorks, BenefitsSection } from '../components/home';

export const Home = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 overflow-hidden pt-16">
    <HeroSection />
    <HowItWorks />
    <BenefitsSection />
    <AIAssistantSection />
  </div>
);

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { HeroSection, HowItWorks, BenefitsSection, CTASection } from '../components/home';

export const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-surface dark:bg-surface-dark transition-colors duration-300">
      <div id="hero">
        <HeroSection />
      </div>
      <div id="how-it-works">
        <HowItWorks />
      </div>
      <div id="features">
        <BenefitsSection />
      </div>
      <div id="cta">
        <CTASection />
      </div>
    </div>
  );
};

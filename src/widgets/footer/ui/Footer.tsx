import { CompanyInfo } from './CompanyInfo';
import { LegalLinks } from './LegalLinks';

export default function Footer() {
  return (
    <footer
      className="bg-header-footer-bg border-t transition-colors duration-300"
      style={{ borderColor: 'var(--footer-border)' }}
    >
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center space-y-8">
          <CompanyInfo />
          <LegalLinks />
        </div>
      </div>
    </footer>
  );
}

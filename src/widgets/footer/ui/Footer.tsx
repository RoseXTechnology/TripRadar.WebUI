import { CompanyInfo } from './CompanyInfo';
import { FooterLinks, FOOTER_LINKS } from './FooterLinks';
import { LegalLinks } from './LegalLinks';

export default function Footer() {
  return (
    <footer className="relative bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <CompanyInfo />
          <FooterLinks title="Resources" links={FOOTER_LINKS.resources} />
        </div>
        <LegalLinks />
      </div>
    </footer>
  );
}

import { Link } from 'react-router-dom';

const LEGAL_LINKS = [
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
  { name: 'Cookie Policy', href: '/cookies' },
  { name: 'Security', href: '/security' },
];

export const LegalLinks = () => {
  return (
    <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">© 2025 TripRadar. All rights reserved.</p>
        <div className="flex flex-wrap justify-center gap-6 mt-4 md:mt-0">
          {LEGAL_LINKS.map(link => (
            <Link
              key={link.name}
              to={link.href}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface LinkItem {
  name: string;
  href: string;
  icon?: React.ReactNode;
}

interface FooterLinksProps {
  title: string;
  links: LinkItem[];
}

export const FooterLinks = ({ title, links }: FooterLinksProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">{title}</h3>
      <ul className="space-y-3 text-sm">
        {links.map(link => (
          <li key={link.name}>
            <Link
              to={link.href}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center space-x-1"
            >
              <span>{link.name}</span>
              {link.icon}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const FOOTER_LINKS = {
  product: [
    { name: 'Trip Planning', href: '/trip-planning' },
    { name: 'Scheduled', href: '/scheduled' },
    { name: 'Coming Soon', href: '/coming-soon', icon: <FaStar className="h-3 w-3" /> },
  ],
  resources: [
    { name: 'API Documentation', href: '/api-docs' },
    { name: 'Feedback', href: '/feedback' },
  ],
  company: [{ name: 'Careers', href: '/careers' }],
};

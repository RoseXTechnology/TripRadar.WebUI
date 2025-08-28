import React from 'react';
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
    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-footer-text">{title}</h4>
      <nav className="flex flex-col space-y-2">
        {links.map(link => (
          <Link
            key={link.name}
            to={link.href}
            className="text-footer-text hover:text-footer-accent transition-colors duration-200 hover:underline"
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

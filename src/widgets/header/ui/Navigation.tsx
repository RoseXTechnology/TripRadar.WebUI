import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NAVIGATION } from 'shared/config';
import { cn } from 'shared/lib/utils';

const scrollToSection = (href: string) => {
  const element = document.querySelector(href);
  element?.scrollIntoView({ behavior: 'smooth' });
};

const handleAnchorClick = (href: string, navigate: ReturnType<typeof useNavigate>, currentPath: string) => {
  if (currentPath === '/') {
    scrollToSection(href);
  } else {
    navigate('/' + href);
  }
};

export const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="flex items-center gap-6">
      {NAVIGATION.map(item => {
        const isAnchor = item.href.startsWith('#');
        const isActive = location.pathname === item.href;

        if (isAnchor) {
          return (
            <button
              key={item.name}
              onClick={() => handleAnchorClick(item.href, navigate, location.pathname)}
              className="text-sm text-content-secondary dark:text-content-secondary-dark hover:text-content dark:hover:text-content-dark transition-colors"
            >
              {item.name}
            </button>
          );
        }

        return (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              'text-sm transition-colors',
              isActive
                ? 'text-content dark:text-content-dark'
                : 'text-content-secondary dark:text-content-secondary-dark hover:text-content dark:hover:text-content-dark'
            )}
          >
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
};

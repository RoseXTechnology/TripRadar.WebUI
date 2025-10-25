export const CTASection = () => {
  const handleTelegramClick = () => {
    window.open('https://t.me/TripRadarBot', '_blank');
  };

  return (
    <section className="relative py-32 px-6 bg-surface-accent dark:bg-surface-accent-dark">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-surface-accent to-secondary-50 dark:from-surface-accent-dark dark:via-gray-800 dark:to-primary-600/20" />

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary-500/10 rounded-full blur-xl animate-pulse" />
        <div
          className="absolute top-40 right-20 w-32 h-32 bg-secondary-500/10 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="absolute bottom-40 left-20 w-24 h-24 bg-primary-600/10 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="absolute bottom-20 right-10 w-16 h-16 bg-secondary-600/10 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: '0.5s' }}
        />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] opacity-30" />

      <div className="relative max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-content dark:text-content-dark mb-8 leading-tight">
          Ready to start planning?
        </h2>

        <button
          onClick={handleTelegramClick}
          className="px-8 py-4 bg-button dark:bg-button-dark text-button-text dark:text-button-text-dark rounded-xl font-semibold hover:bg-button-hover dark:hover:bg-button-hover-dark transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Get Started
        </button>
      </div>
    </section>
  );
};

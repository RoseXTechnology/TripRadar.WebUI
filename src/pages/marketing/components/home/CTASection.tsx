export function CTASection() {
  const handleTelegramClick = () => {
    window.open('https://t.me/TripRadarBot', '_blank');
  };

  return (
    <section className="py-24 px-6 bg-surface-accent dark:bg-surface-accent-dark">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-content dark:text-content-dark mb-6">
          Ready to plan your next adventure?
        </h2>

        <p className="text-xl text-content-secondary dark:text-content-secondary-dark mb-12 max-w-2xl mx-auto">
          Join thousands of travelers who trust TripRadar to create their perfect trips. Start planning in seconds.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleTelegramClick}
            className="group px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg font-medium hover:from-primary-700 hover:to-secondary-700 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
          >
            Start Planning Now
            <svg
              className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <p className="text-sm text-content-muted dark:text-content-secondary-dark">
            Free to start • No credit card required
          </p>
        </div>
      </div>
    </section>
  );
}

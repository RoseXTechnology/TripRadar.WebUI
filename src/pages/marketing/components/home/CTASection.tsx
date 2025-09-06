export function CTASection() {
  const handleTelegramClick = () => {
    window.open('https://t.me/TripRadarBot', '_blank');
  };

  return (
    <section className="py-24 px-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Ready to plan your next adventure?
        </h2>

        <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          Join thousands of travelers who trust TripRadar to create their perfect trips. Start planning in seconds.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleTelegramClick}
            className="group px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-200 flex items-center gap-2"
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

          <div className="text-sm text-gray-500 dark:text-gray-400">Free to start • No credit card required</div>
        </div>
      </div>
    </section>
  );
}

export const HeroSection = () => {
  const handleTelegramClick = () => {
    window.open('https://t.me/TripRadarBot', '_blank');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-surface dark:bg-surface-dark py-20">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-surface to-secondary-50 dark:from-surface-dark dark:via-gray-800 dark:to-primary-600/20" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-content dark:text-content-dark mb-6 tracking-tight">
          Build your perfect
          <br />
          trip in seconds
        </h1>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <button
            onClick={handleTelegramClick}
            className="group px-8 py-4 bg-button dark:bg-button-dark text-button-text dark:text-button-text-dark rounded-lg font-medium hover:bg-button-hover dark:hover:bg-button-hover-dark transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
          >
            Try TripRadar
            <svg
              className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button className="px-8 py-4 text-content-secondary dark:text-content-secondary-dark hover:text-content dark:hover:text-content-dark transition-colors font-medium">
            Watch demo
          </button>
        </div>

        {/* Demo preview */}
        <div className="relative max-w-3xl mx-auto">
          <div className="bg-surface dark:bg-surface-dark rounded-3xl shadow-2xl border border-outline dark:border-outline-dark overflow-hidden backdrop-blur-sm">
            {/* Chat header */}
            <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-surface-accent-dark dark:to-surface-accent-dark border-b border-outline dark:border-outline-dark">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">🤖</span>
                </div>
                <div>
                  <h3 className="font-semibold text-content dark:text-content-dark">TripRadar AI</h3>
                  <p className="text-xs text-content-secondary dark:text-content-secondary-dark">
                    Online • Ready to help
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-primary-500 rounded-full animate-pulse" />
                <div
                  className="w-3 h-3 bg-secondary-500 rounded-full animate-pulse"
                  style={{ animationDelay: '0.2s' }}
                />
                <div className="w-3 h-3 bg-primary-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>

            {/* Chat content */}
            <div className="p-6 space-y-6 min-h-[400px] max-h-[400px] overflow-y-auto">
              {/* AI Message */}
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">AI</span>
                </div>
                <div className="flex-1">
                  <div className="bg-primary-50 dark:bg-surface-accent-dark rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                    <p className="text-content dark:text-content-dark text-sm">
                      👋 Hi! I'm your AI travel assistant. Tell me about your dream destination and I'll create the
                      perfect itinerary for you!
                    </p>
                  </div>
                  <p className="text-xs text-content-muted mt-1 ml-2">Just now</p>
                </div>
              </div>

              {/* User Message */}
              <div className="flex items-start gap-4 justify-end">
                <div className="flex-1 max-w-sm">
                  <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl rounded-tr-sm px-4 py-3 shadow-sm">
                    <p className="text-white text-sm">
                      I want to visit Paris for 4 days with a budget of $1500. I love art, good food, and romantic
                      spots! ✨
                    </p>
                  </div>
                  <p className="text-xs text-content-muted mt-1 mr-2 text-right">2 min ago</p>
                </div>
                <div className="w-8 h-8 bg-outline dark:bg-outline-dark rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-content-secondary dark:text-content-secondary-dark text-xs font-bold">You</span>
                </div>
              </div>

              {/* AI Response */}
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">AI</span>
                </div>
                <div className="flex-1">
                  <div className="bg-primary-50 dark:bg-surface-accent-dark rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                    <p className="text-content dark:text-content-dark text-sm mb-3">
                      🎨 Perfect! Here's your romantic Paris itinerary:
                    </p>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-3 p-2 bg-surface dark:bg-surface-dark rounded-lg">
                        <span className="text-lg">🏨</span>
                        <div>
                          <p className="font-medium text-content dark:text-content-dark">Hotel des Grands Boulevards</p>
                          <p className="text-xs text-content-secondary dark:text-content-secondary-dark">
                            Boutique hotel in Marais • $95/night
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-2 bg-surface dark:bg-surface-dark rounded-lg">
                        <span className="text-lg">🎨</span>
                        <div>
                          <p className="font-medium text-content dark:text-content-dark">Louvre & Musée d'Orsay</p>
                          <p className="text-xs text-content-secondary dark:text-content-secondary-dark">
                            World-class art collections • Skip-the-line tickets
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-2 bg-surface dark:bg-surface-dark rounded-lg">
                        <span className="text-lg">🥐</span>
                        <div>
                          <p className="font-medium text-content dark:text-content-dark">Le Comptoir du Relais</p>
                          <p className="text-xs text-content-secondary dark:text-content-secondary-dark">
                            Authentic bistro • Michelin recommended
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-outline dark:border-outline-dark">
                      <p className="text-xs text-content-secondary dark:text-content-secondary-dark">
                        💰 Total estimated cost: $1,420 • 📍 Interactive map included
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-content-muted mt-1 ml-2">Just now</p>
                </div>
              </div>

              {/* Typing indicator */}
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">AI</span>
                </div>
                <div className="bg-primary-50 dark:bg-surface-accent-dark rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-primary-500 rounded-full animate-bounce"
                      style={{ animationDelay: '0.1s' }}
                    />
                    <div
                      className="w-2 h-2 bg-primary-500 rounded-full animate-bounce"
                      style={{ animationDelay: '0.2s' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const HeroSection = () => {
  const handleTelegramClick = () => {
    window.open('https://t.me/TripRadarBot', '_blank');
  };

  return (
    <section className="relative h-screen flex items-center justify-center bg-white dark:bg-black">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-black dark:to-gray-900" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
          Build your perfect
          <br />
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            trip in seconds
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
          The AI-powered travel planner that understands you.
          <br className="hidden md:block" />
          Chat with our bot and get personalized itineraries instantly.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <button
            onClick={handleTelegramClick}
            className="group px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-200 flex items-center gap-2"
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

          <button className="px-8 py-4 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors font-medium">
            Watch demo
          </button>
        </div>

        {/* Demo preview */}
        <div className="relative max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <div className="w-3 h-3 bg-green-500 rounded-full" />
              </div>
              <div className="flex-1 text-center">
                <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">TripRadar Bot</span>
              </div>
            </div>

            {/* Chat content */}
            <div className="p-6 space-y-4 min-h-[300px]">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  AI
                </div>
                <div className="flex-1">
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-tl-sm px-4 py-3">
                    <p className="text-gray-900 dark:text-white text-sm">
                      Hi! I'm your AI travel assistant. Where would you like to go?
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 justify-end">
                <div className="flex-1 max-w-xs">
                  <div className="bg-blue-500 rounded-2xl rounded-tr-sm px-4 py-3">
                    <p className="text-white text-sm">Plan a 5-day trip to Tokyo for $2000</p>
                  </div>
                </div>
                <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 text-sm font-bold">
                  You
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  AI
                </div>
                <div className="flex-1">
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-tl-sm px-4 py-3">
                    <p className="text-gray-900 dark:text-white text-sm mb-2">
                      Perfect! Here's your personalized Tokyo itinerary:
                    </p>
                    <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <span>🏨</span>
                        <span>Hotel in Shibuya - $120/night</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>🗼</span>
                        <span>Tokyo Tower, Senso-ji Temple</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>🍜</span>
                        <span>Best ramen spots & sushi bars</span>
                      </div>
                    </div>
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

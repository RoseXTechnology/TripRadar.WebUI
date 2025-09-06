const features = [
  {
    title: 'AI-Powered Planning',
    description: 'Advanced AI understands your preferences and creates personalized itineraries in seconds.',
    icon: '🤖',
  },
  {
    title: 'Instant Results',
    description: 'Get complete travel plans instantly instead of spending hours researching and planning.',
    icon: '⚡',
  },
  {
    title: 'Telegram Integration',
    description: 'Plan your trips directly in Telegram - no need to download another app or switch platforms.',
    icon: '💬',
  },
  {
    title: 'Budget Optimization',
    description: 'Smart recommendations that fit your budget while maximizing your travel experience.',
    icon: '💰',
  },
  {
    title: 'Real-time Updates',
    description: 'Get live updates on prices, availability, and travel conditions for your destinations.',
    icon: '🔄',
  },
  {
    title: 'Global Coverage',
    description: 'Plan trips to any destination worldwide with local insights and recommendations.',
    icon: '🌍',
  },
];

export function BenefitsSection() {
  return (
    <section className="py-24 px-6 bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Why choose TripRadar?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to plan the perfect trip, powered by AI
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

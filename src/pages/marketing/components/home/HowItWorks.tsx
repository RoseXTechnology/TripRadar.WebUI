const steps = [
  {
    number: '01',
    title: 'Chat with AI',
    description: 'Tell our AI about your travel preferences, budget, and desired destination in natural language.',
  },
  {
    number: '02',
    title: 'Get Itinerary',
    description: 'Receive a personalized travel plan with hotels, attractions, and activities tailored to you.',
  },
  {
    number: '03',
    title: 'Travel Smart',
    description: 'Follow your custom itinerary and enjoy a perfectly organized trip without the planning stress.',
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 px-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">How it works</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Three simple steps to your perfect trip
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gray-200 dark:bg-gray-700 z-0" />
              )}

              <div className="relative bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-black dark:bg-white rounded-full flex items-center justify-center">
                    <span className="text-white dark:text-black font-bold text-sm">{step.number}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{step.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

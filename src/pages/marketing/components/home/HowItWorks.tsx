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
    <section className="py-24 px-6 bg-primary-50 dark:bg-surface-dark">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-content dark:text-content-dark mb-4">How it works</h2>
          <p className="text-lg text-content-secondary dark:text-content-secondary-dark max-w-2xl mx-auto">
            Three simple steps to your perfect trip
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-px bg-outline dark:bg-outline-dark z-0" />
              )}

              <div className="relative bg-surface dark:bg-surface-dark p-8 rounded-2xl border border-outline dark:border-outline-dark hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{step.number}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-content dark:text-content-dark">{step.title}</h3>
                </div>
                <p className="text-content-secondary dark:text-content-secondary-dark leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

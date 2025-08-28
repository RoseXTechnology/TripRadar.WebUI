import { MessageCircle, MapPin, Plane } from 'lucide-react';

const steps = [
  {
    icon: MessageCircle,
    title: 'Напиши в бота',
    description: 'Расскажи о своих предпочтениях, бюджете и желаемом направлении',
  },
  {
    icon: MapPin,
    title: 'Получи маршрут',
    description: 'ИИ создаст персональный маршрут с отелями, достопримечательностями и активностями',
  },
  {
    icon: Plane,
    title: 'Путешествуй легко',
    description: 'Следуй готовому плану и наслаждайся идеально организованным путешествием',
  },
];

const StepCard = ({ step }: { step: (typeof steps)[0] }) => {
  const IconComponent = step.icon;

  return (
    <div className="text-center group">
      <div className="mb-8">
        <div className="w-32 h-32 bg-white dark:bg-gray-700 rounded-full shadow-sm border border-gray-100 dark:border-gray-600 flex items-center justify-center mx-auto group-hover:shadow-md group-hover:border-blue-200 dark:group-hover:border-blue-400 transition-all duration-300">
          <IconComponent size={40} className="text-blue-600 dark:text-blue-400" strokeWidth={1.5} />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl text-gray-900 dark:text-white">{step.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-sm mx-auto">{step.description}</p>
      </div>
    </div>
  );
};

export function HowItWorks() {
  return (
    <section className="py-24 px-6 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl text-gray-900 dark:text-white mb-6 tracking-tight">Как это работает</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-lg mx-auto leading-relaxed">
            Всего три простых шага до идеального путешествия
          </p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-16 left-0 right-0 h-px bg-gray-200 dark:bg-gray-600 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative z-10">
            {steps.map((step, index) => (
              <StepCard key={index} step={step} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

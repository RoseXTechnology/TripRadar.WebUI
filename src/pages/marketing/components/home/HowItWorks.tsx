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

const StepCard = ({ step, index }: { step: (typeof steps)[0]; index: number }) => {
  const IconComponent = step.icon;

  return (
    <div className="relative">
      <div className="h-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-lg">
        <div className="p-8 text-center">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
            {index + 1}
          </div>

          <div className="mb-6 mt-4">
            <div className="w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-900 rounded-2xl flex items-center justify-center">
              <IconComponent size={32} className="text-blue-600 dark:text-blue-400" strokeWidth={1.5} />
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{step.title}</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{step.description}</p>
        </div>
      </div>

      {index < steps.length - 1 && (
        <div className="hidden md:block absolute top-1/2 -right-6 -translate-y-1/2 z-10">
          <div className="w-4 h-0.5 bg-blue-300 dark:bg-blue-600"></div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-l-4 border-l-blue-300 dark:border-l-blue-600 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
        </div>
      )}
    </div>
  );
};

export function HowItWorks() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-4">Как это работает</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Всего три простых шага до идеального путешествия
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <StepCard key={index} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

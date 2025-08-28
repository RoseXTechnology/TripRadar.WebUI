import { Route, Clock, MessageCircle } from 'lucide-react';

const benefits = [
  {
    icon: Route,
    title: 'Персональные маршруты',
    description: 'Бот учитывает твои интересы и подбирает лучший вариант путешествия.',
  },
  {
    icon: Clock,
    title: 'Экономия времени',
    description: 'Не нужно часами искать билеты и отели — всё в одном месте.',
  },
  {
    icon: MessageCircle,
    title: 'В Telegram',
    description: 'Общайся с ботом там, где тебе привычно и удобно.',
  },
];

const BenefitCard = ({ benefit }: { benefit: (typeof benefits)[0] }) => {
  const IconComponent = benefit.icon;

  return (
    <div className="group p-8 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-300">
      <div className="flex items-start gap-6">
        <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors duration-300">
          <IconComponent
            className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300"
            strokeWidth={1.5}
          />
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{benefit.title}</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{benefit.description}</p>
        </div>
      </div>
    </div>
  );
};

export function BenefitsSection() {
  return (
    <section className="py-24 px-6 bg-white dark:bg-gray-900">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Почему это удобно?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">Три причины попробовать наш сервис</p>
        </div>

        <div className="space-y-6">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} benefit={benefit} />
          ))}
        </div>
      </div>
    </section>
  );
}

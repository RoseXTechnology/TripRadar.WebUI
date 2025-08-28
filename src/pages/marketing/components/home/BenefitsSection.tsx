import { FaRoute, FaClock, FaComments } from 'react-icons/fa';

const benefits = [
  {
    icon: FaRoute,
    title: 'Персональные маршруты',
    description: 'Бот учитывает твои интересы и подбирает лучший вариант путешествия.',
  },
  {
    icon: FaClock,
    title: 'Экономия времени',
    description: 'Не нужно часами искать билеты и отели — всё в одном месте.',
  },
  {
    icon: FaComments,
    title: 'В Telegram',
    description: 'Общайся с ботом там, где тебе привычно и удобно.',
  },
];

const BenefitCard = ({ benefit }: { benefit: (typeof benefits)[0] }) => {
  const IconComponent = benefit.icon;

  return (
    <div className="group p-8 bg-steps-card-bg rounded-2xl border border-gray-200 hover:border-benefits-accent transition-all duration-300">
      <div className="flex items-start gap-6">
        <div className="w-12 h-12 bg-benefits-bg rounded-xl flex items-center justify-center transition-colors duration-300">
          <IconComponent className="w-6 h-6 text-benefits-icon transition-colors duration-300" />
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-semibold text-benefits-item-title mb-3">{benefit.title}</h3>
          <p className="text-benefits-text leading-relaxed">{benefit.description}</p>
        </div>
      </div>
    </div>
  );
};

export function BenefitsSection() {
  return (
    <section className="py-24 px-6 bg-benefits-bg">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-benefits-title mb-6">Почему это удобно?</h2>
          <p className="text-lg text-benefits-text">Три причины попробовать наш сервис</p>
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

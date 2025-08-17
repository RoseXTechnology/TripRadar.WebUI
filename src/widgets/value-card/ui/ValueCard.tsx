import { Value } from 'pages/marketing/model/values';

interface ValueCardProps {
  value: Value;
}

export const ValueCard = ({ value }: ValueCardProps) => (
  <div className="group relative bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-3xl p-8 hover:bg-gray-50 dark:hover:bg-white/10 transition-all duration-500 hover:-translate-y-2">
    <div
      className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${value.gradient} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
    >
      <value.icon className="h-8 w-8 text-white" />
    </div>

    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{value.title}</h3>

    <p className="text-gray-600 dark:text-white/60 mb-4 font-medium">{value.description}</p>

    <p className="text-gray-500 dark:text-white/50 text-sm leading-relaxed">{value.detail}</p>
  </div>
);

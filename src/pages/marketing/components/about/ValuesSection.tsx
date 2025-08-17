import { ValueCard } from 'widgets/value-card';
import { VALUES } from '../../model/values';

export const ValuesSection = () => {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">Our Values</h2>
          <p className="text-xl text-gray-600 dark:text-white/60 max-w-3xl mx-auto">
            These core principles guide every decision we make and every feature we build.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {VALUES.map((value, index) => (
            <ValueCard key={index} value={value} />
          ))}
        </div>
      </div>
    </section>
  );
};

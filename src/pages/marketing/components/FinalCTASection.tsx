import { Link } from 'react-router-dom';
import { ROUTES } from 'shared/config/routes';

export const FinalCTASection = () => {
  return (
    <section className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 dark:from-blue-500/20 dark:to-purple-600/20 backdrop-blur-xl border border-blue-500/30 dark:border-blue-500/30 rounded-3xl p-12 animate-slide-up">
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Transform Your Travel Experience?
          </h3>
          <p className="text-xl text-gray-600 dark:text-white/60 mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who trust TripRadar for intelligent, collaborative, and privacy-first trip
            planning.
          </p>
          <Link
            to={ROUTES.SIGNUP}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1"
          >
            Get Started Free
          </Link>
        </div>
      </div>
    </section>
  );
};

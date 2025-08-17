import { MessageSquare, Smartphone } from 'lucide-react';

export const AIAssistantSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-700 rounded-3xl p-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">AI Travel Assistant</h3>
              <p className="text-indigo-100 max-w-xl">
                Chat with our AI assistant via Telegram or WhatsApp for instant trip help, budget tracking, weather
                updates, and personalized recommendations.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://t.me/TripRadarBot"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-xl hover:bg-white/20 transition-colors"
              >
                <MessageSquare className="h-5 w-5" />
                <span className="font-medium">Telegram Bot</span>
              </a>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-xl hover:bg-white/20 transition-colors"
              >
                <Smartphone className="h-5 w-5" />
                <span className="font-medium">WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

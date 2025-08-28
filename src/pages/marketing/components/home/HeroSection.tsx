import { ArrowRight, Sparkles } from 'lucide-react';

export const HeroSection = () => {
  const handleTelegramClick = () => {
    window.open('https://t.me/TripRadarBot', '_blank');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 dark:bg-pink-900 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full border border-blue-200 dark:border-gray-600 shadow-sm">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-900 dark:text-blue-100">AI-Powered Travel Planning</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
                Путешествуй
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                  с умом
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                ИИ-ассистент в Telegram поможет спланировать идеальное путешествие за минуты
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-8">
              <button
                onClick={handleTelegramClick}
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <span>Начать планирование</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
              </button>
            </div>
          </div>

          {/* Right Column - Phone Mockup */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative transform hover:scale-105 transition-transform duration-300">
              {/* Phone Frame */}
              <div className="relative bg-gradient-to-b from-gray-900 to-black rounded-[2.8rem] p-2 shadow-2xl">
                {/* Screen */}
                <div className="bg-white dark:bg-gray-900 rounded-[2.4rem] overflow-hidden w-80 h-[650px] relative">
                  {/* Dynamic Island */}
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-28 h-7 bg-black rounded-full z-20 flex items-center justify-center">
                    <div className="w-3 h-3 bg-gray-800 rounded-full mr-2"></div>
                    <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                  </div>

                  {/* Status Bar */}
                  <div className="bg-[#17212b] dark:bg-gray-800 px-6 py-4 pt-10 flex justify-between items-center text-sm text-white dark:text-gray-200">
                    <span className="font-semibold">9:41</span>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        <div className="w-1 h-3 bg-white rounded-full"></div>
                        <div className="w-1 h-3 bg-white rounded-full"></div>
                        <div className="w-1 h-3 bg-white rounded-full"></div>
                        <div className="w-1 h-2 bg-white/50 rounded-full"></div>
                      </div>
                      <div className="w-7 h-3.5 border border-white rounded-sm relative">
                        <div className="w-5 h-2 bg-green-400 rounded-sm absolute top-0.5 left-0.5"></div>
                        <div className="w-1 h-1 bg-white rounded-sm absolute -right-0.5 top-1"></div>
                      </div>
                    </div>
                  </div>

                  {/* Chat Header */}
                  <div className="bg-[#17212b] dark:bg-gray-800 px-4 py-4 text-white dark:text-gray-200 flex items-center gap-3 border-b border-gray-700/50 dark:border-gray-600/50">
                    <button className="text-[#8bb4f1] dark:text-blue-400 text-lg font-bold">←</button>
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#4fc3f7] to-[#29b6f6] rounded-full flex items-center justify-center shadow-lg border-2 border-white/20">
                        <span className="text-xl">🤖</span>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#17212b] dark:border-gray-800"></div>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-white dark:text-gray-200">TripRadar Bot</div>
                      <div className="text-xs text-[#8bb4f1] dark:text-blue-400 flex items-center gap-1">
                        <span>•</span>
                        online
                      </div>
                    </div>
                    <button className="text-[#8bb4f1] dark:text-blue-400 text-xl">⋮</button>
                  </div>

                  {/* Chat Messages */}
                  <div className="flex-1 p-4 space-y-4 bg-gray-50 dark:bg-gray-800 h-full overflow-hidden">
                    {/* Welcome message */}
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#4fc3f7] to-[#29b6f6] rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                        <span className="text-lg">🤖</span>
                      </div>
                      <div className="bg-white dark:bg-[#182533] p-4 rounded-3xl rounded-tl-lg max-w-[75%] shadow-lg border border-gray-200 dark:border-gray-700/30">
                        <p className="text-sm text-gray-900 dark:text-white leading-relaxed">
                          👋 Привет! Я TripRadar — ваш ИИ-помощник по планированию путешествий ✨
                        </p>
                        <div className="text-xs text-gray-400 dark:text-gray-500 mt-2 flex items-center gap-1">
                          <span>14:32</span>
                          <div className="w-1 h-1 bg-gray-500 dark:bg-gray-600 rounded-full"></div>
                          <span>Прочитано</span>
                        </div>
                      </div>
                    </div>

                    {/* User message */}
                    <div className="flex justify-end">
                      <div className="bg-gradient-to-r from-[#2b5ce6] to-[#1e40af] dark:from-blue-600 dark:to-blue-700 text-white p-4 rounded-3xl rounded-tr-lg max-w-[75%] shadow-lg">
                        <p className="text-sm leading-relaxed">Поможешь спланировать поездку в Японию? 🇯🇵</p>
                        <div className="text-xs text-blue-100 mt-2 flex items-center justify-end gap-1">
                          <span>14:33</span>
                          <span className="text-green-300">✓✓</span>
                        </div>
                      </div>
                    </div>

                    {/* Bot response with rich content */}
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#4fc3f7] to-[#29b6f6] rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                        <span className="text-lg">🤖</span>
                      </div>
                      <div className="space-y-3 max-w-[80%]">
                        <div className="bg-white dark:bg-[#182533] p-4 rounded-3xl rounded-tl-lg shadow-lg border border-gray-200 dark:border-gray-700/30">
                          <p className="text-sm text-gray-900 dark:text-white leading-relaxed mb-3">
                            🇯🇵 Отлично! Япония — удивительная страна. Давайте создадим идеальный маршрут!
                          </p>
                          {/* Rich card */}
                          <div className="bg-gradient-to-r from-pink-500/20 to-orange-500/20 dark:from-pink-600/30 dark:to-orange-600/30 rounded-2xl p-3 border border-pink-500/30 dark:border-pink-400/40">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-lg">🌸</span>
                              <span className="text-sm font-medium text-white dark:text-gray-100">
                                Сезон сакуры 2024
                              </span>
                            </div>
                            <p className="text-xs text-gray-300 dark:text-gray-400">
                              Март-май • Лучшее время для посещения
                            </p>
                          </div>
                          <div className="text-xs text-gray-400 dark:text-gray-500 mt-3 flex items-center gap-1">
                            <span>14:34</span>
                            <div className="w-1 h-1 bg-gray-500 dark:bg-gray-600 rounded-full"></div>
                            <span>Прочитано</span>
                          </div>
                        </div>

                        {/* Quick reply buttons */}
                        <div className="flex flex-wrap gap-2">
                          <button className="bg-gradient-to-r from-[#2b5ce6]/20 to-[#1e40af]/20 dark:from-blue-600/30 dark:to-blue-700/30 border border-[#2b5ce6]/40 dark:border-blue-500/50 text-[#4dabf7] dark:text-blue-400 px-4 py-2 rounded-full text-xs font-medium hover:bg-[#2b5ce6]/30 dark:hover:bg-blue-600/40 transition-colors">
                            📅 7 дней
                          </button>
                          <button className="bg-gradient-to-r from-[#2b5ce6]/20 to-[#1e40af]/20 dark:from-blue-600/30 dark:to-blue-700/30 border border-[#2b5ce6]/40 dark:border-blue-500/50 text-[#4dabf7] dark:text-blue-400 px-4 py-2 rounded-full text-xs font-medium hover:bg-[#2b5ce6]/30 dark:hover:bg-blue-600/40 transition-colors">
                            📅 14 дней
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Typing indicator */}
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#4fc3f7] to-[#29b6f6] rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                        <span className="text-lg">🤖</span>
                      </div>
                      <div className="bg-white dark:bg-[#182533] p-4 rounded-3xl rounded-tl-lg border border-gray-200 dark:border-gray-700/30">
                        <div className="flex gap-1.5">
                          <div className="w-2 h-2 bg-[#4fc3f7] rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-[#4fc3f7] rounded-full animate-bounce delay-100"></div>
                          <div className="w-2 h-2 bg-[#4fc3f7] rounded-full animate-bounce delay-200"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Input area */}
                  <div className="bg-gray-50 dark:bg-[#17212b] p-4 border-t border-gray-200 dark:border-gray-700/50">
                    <div className="flex items-center gap-3 bg-white dark:bg-[#0e1621] rounded-full px-5 py-3 border border-gray-200 dark:border-gray-700/50">
                      <button className="text-[#8bb4f1] dark:text-blue-400 text-lg">📎</button>
                      <div className="flex-1 text-gray-400 dark:text-gray-500 text-sm">Напишите сообщение...</div>
                      <button className="text-[#8bb4f1] dark:text-blue-400 text-lg">🎤</button>
                      <button className="bg-[#2b5ce6] dark:bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">➤</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-green-400 to-green-500 text-white px-3 py-2 rounded-full text-xs font-semibold shadow-xl animate-pulse">
                ✨ AI Онлайн
              </div>

              <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-2xl text-xs font-medium shadow-xl">
                🌍 50+ стран
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

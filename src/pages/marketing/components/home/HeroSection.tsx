import { FaArrowRight, FaStar } from 'react-icons/fa';

export const HeroSection = () => {
  const handleTelegramClick = () => {
    window.open('https://t.me/TripRadarBot', '_blank');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-bg">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full border border-gray-700 dark:border-gray-600 shadow-sm">
              <FaStar className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-white">AI-Powered Travel Planning</span>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-hero-title leading-tight">
                Путешествуй
                <br />с умом
              </h1>
              <p className="text-xl md:text-2xl text-hero-subtitle max-w-3xl mx-auto leading-relaxed">
                ИИ-ассистент в Telegram поможет спланировать идеальное путешествие за минуты
              </p>
            </div>

            <div className="pt-8">
              <button
                onClick={handleTelegramClick}
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-hero-btn-bg text-hero-btn-text text-lg font-semibold rounded-xl transform hover:-translate-y-1 transition-all duration-300 shadow-lg"
              >
                <span>Начать планирование</span>
                <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              <div className="relative bg-gradient-to-b from-gray-900 to-black rounded-[2.8rem] p-2 shadow-2xl">
                <div className="bg-white dark:bg-gray-900 rounded-[2.4rem] overflow-hidden w-80 h-[650px] relative">
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-28 h-7 bg-black rounded-full z-20 flex items-center justify-center">
                    <div className="w-3 h-3 bg-gray-800 rounded-full mr-2"></div>
                    <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                  </div>

                  <div className="bg-[#17212b] dark:bg-gray-800 px-6 py-4 pt-10 flex justify-between items-center text-sm text-white dark:text-gray-200">
                    <span className="font-semibold">9:41</span>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5 items-end">
                        <div className="w-1 h-1 bg-white rounded-sm"></div>
                        <div className="w-1 h-2 bg-white rounded-sm"></div>
                        <div className="w-1 h-3 bg-white rounded-sm"></div>
                        <div className="w-1 h-4 bg-white rounded-sm"></div>
                      </div>
                      <span className="text-white text-sm">🔋</span>
                    </div>
                  </div>

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

                  <div className="flex-1 p-4 space-y-4 bg-gray-50 dark:bg-gray-800 h-full overflow-hidden">
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

                    <div className="flex justify-end">
                      <div className="bg-bot-message text-white p-4 rounded-3xl rounded-tr-lg max-w-[75%] shadow-lg">
                        <p className="text-sm leading-relaxed">Поможешь спланировать поездку в Японию? 🇯🇵</p>
                        <div className="text-xs text-blue-100 mt-2 flex items-center justify-end gap-1">
                          <span>14:33</span>
                          <span className="text-green-300">✓✓</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#4fc3f7] to-[#29b6f6] rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                        <span className="text-lg">🤖</span>
                      </div>
                      <div className="space-y-3 max-w-[80%]">
                        <div className="bg-user-message p-4 rounded-3xl rounded-tl-lg shadow-lg border border-gray-200">
                          <p className="text-sm text-gray-900 dark:text-white leading-relaxed mb-3">
                            🇯🇵 Отлично! Япония — удивительная страна. Давайте создадим идеальный маршрут!
                          </p>
                          <div className="bg-gradient-to-r from-pink-500/20 to-orange-500/20 dark:from-pink-600/30 dark:to-orange-600/30 rounded-2xl p-3 border border-pink-500/30 dark:border-pink-400/40">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-lg">🌸</span>
                              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                Сезон сакуры 2024
                              </span>
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              Март-май • Лучшее время для посещения
                            </p>
                          </div>
                          <div className="text-xs text-gray-400 dark:text-gray-500 mt-3 flex items-center gap-1">
                            <span>14:34</span>
                            <div className="w-1 h-1 bg-gray-500 dark:bg-gray-600 rounded-full"></div>
                            <span>Прочитано</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <button className="bg-gradient-to-r from-[#2b5ce6]/20 to-[#1e40af]/20 dark:from-blue-600/30 dark:to-blue-700/30 border border-[#2b5ce6]/40 dark:border-blue-500/50 text-[#4dabf7] dark:text-blue-400 px-4 py-2 rounded-full text-xs font-medium">
                            📅 7 дней
                          </button>
                          <button className="bg-gradient-to-r from-[#2b5ce6]/20 to-[#1e40af]/20 dark:from-blue-600/30 dark:to-blue-700/30 border border-[#2b5ce6]/40 dark:border-blue-500/50 text-[#4dabf7] dark:text-blue-400 px-4 py-2 rounded-full text-xs font-medium">
                            📅 14 дней
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

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

              <div className="absolute -top-3 -right-3 bg-steps-icon text-white px-3 py-2 rounded-full text-xs font-semibold shadow-xl">
                ✨ AI Онлайн
              </div>

              <div className="absolute -bottom-4 -left-4 bg-steps-details text-steps-text px-4 py-2 rounded-2xl text-xs font-medium shadow-xl">
                🌍 50+ стран
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

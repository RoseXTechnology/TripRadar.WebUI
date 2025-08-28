export function CTASection() {
  const handleTelegramClick = () => {
    window.open('https://t.me/TripRadarBot', '_blank');
  };

  return (
    <section className="min-h-screen bg-cta-bg flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center space-y-8">
        <h1 className="text-4xl md:text-6xl text-cta-title tracking-tight">Готов начать своё путешествие?</h1>

        <p className="text-lg md:text-xl text-cta-subtitle max-w-lg mx-auto leading-relaxed">
          Всего один клик — и бот построит для тебя маршрут.
        </p>

        <div className="space-y-4 pt-4">
          <button
            onClick={handleTelegramClick}
            className="bg-cta-btn-bg text-cta-btn-text px-12 py-6 text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 hover:scale-105 border-0"
          >
            Начать путешествие
          </button>

          <p className="text-sm text-cta-hint">Откроется в Telegram</p>
        </div>
      </div>
    </section>
  );
}

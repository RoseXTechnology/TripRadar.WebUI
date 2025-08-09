import {
  Play,
  MessageSquare,
  Smartphone,
  Bot,
  Check,
  Clock,
  MapPin,
  DollarSign,
  Calendar,
  Bell,
  Shield,
  Star,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useState } from 'react';

const botExamples = [
  {
    platform: 'telegram',
    title: 'Budget Tracking',
    description: 'Check your trip budget status instantly',
    messages: [
      {
        type: 'user',
        text: '💬 "What\'s my Tokyo trip budget status?"',
        time: '2:34 PM',
      },
      {
        type: 'bot',
        text: '🤖 Your Tokyo trip: $1,200 spent of $3,500 budget (34%)\n\n📊 Breakdown:\n✈️ Flights: $800/$1,200 (67%)\n🏨 Hotels: $400/$1,000 (40%)\n🍜 Food: $0/$800 (0%)\n🎯 Activities: $0/$500 (0%)\n\n⚠️ Flight budget at 67% - consider booking soon!',
        time: '2:34 PM',
      },
    ],
  },
  {
    platform: 'whatsapp',
    title: 'Weather Updates',
    description: 'Get real-time weather information for your destination',
    messages: [
      {
        type: 'user',
        text: '💬 "What\'s the weather in Paris tomorrow?"',
        time: '10:15 AM',
      },
      {
        type: 'bot',
        text: '🤖 Paris weather for tomorrow (Feb 15):\n\n🌤️ Partly cloudy, 12°C (54°F)\n🌧️ 20% chance of rain\n💨 Wind: 15 km/h\n☀️ Sunrise: 7:45 AM\n🌅 Sunset: 6:20 PM\n\n👕 Perfect weather for sightseeing! Light jacket recommended.',
        time: '10:15 AM',
      },
    ],
  },
  {
    platform: 'telegram',
    title: 'Smart Reminders',
    description: 'Set and manage travel reminders effortlessly',
    messages: [
      {
        type: 'user',
        text: '💬 "Remind me to book hotel in 2 days"',
        time: '4:22 PM',
      },
      {
        type: 'bot',
        text: "🤖 ✅ Reminder set!\n\n📅 I'll notify you on Feb 17 at 9:00 AM to book your Tokyo hotel.\n\n💡 Tip: I found 3 hotels in Shibuya within your budget. Would you like me to show them now?",
        time: '4:22 PM',
      },
    ],
  },
  {
    platform: 'whatsapp',
    title: 'Group Coordination',
    description: 'Manage group trips and voting seamlessly',
    messages: [
      {
        type: 'user',
        text: '💬 "What\'s the status of our Paris restaurant vote?"',
        time: '7:30 PM',
      },
      {
        type: 'bot',
        text: '🤖 Paris Restaurant Vote Status:\n\n🗳️ "Choose Day 2 Dinner Location"\n\n🥇 Le Comptoir du Relais: 2 votes\n🥈 L\'As du Fallafel: 1 vote\n🥉 Breizh Café: 1 vote\n\n⏰ Deadline: Feb 20, 11:59 PM\n👥 Waiting for Emma\'s vote\n\n📱 Vote now: /vote restaurant',
        time: '7:30 PM',
      },
    ],
  },
  {
    platform: 'telegram',
    title: 'Local Recommendations',
    description: 'Discover hidden gems and local favorites',
    messages: [
      {
        type: 'user',
        text: '💬 "Recommend authentic ramen places near Shibuya"',
        time: '1:45 PM',
      },
      {
        type: 'bot',
        text: '🤖 🍜 Top authentic ramen near Shibuya:\n\n⭐ Ichiran Ramen (4.2★)\n📍 5 min walk from Shibuya Station\n💰 ¥800-1,200 • Open 24/7\n\n⭐ Menya Saimi (4.5★)\n📍 8 min walk • Local favorite\n💰 ¥900-1,400 • Closed Mondays\n\n⭐ Ramen Jiro (4.1★)\n📍 12 min walk • Huge portions\n💰 ¥700-1,000 • Cash only\n\n🗺️ Show on map: /map ramen',
        time: '1:45 PM',
      },
    ],
  },
  {
    platform: 'whatsapp',
    title: 'Expense Tracking',
    description: 'Log expenses and track spending on the go',
    messages: [
      {
        type: 'user',
        text: '💬 "Add expense: dinner at Le Comptoir 45 euros"',
        time: '9:15 PM',
      },
      {
        type: 'bot',
        text: '🤖 ✅ Expense added!\n\n🧾 Dinner at Le Comptoir\n💰 €45.00 → $48.60 USD\n📂 Category: Food\n📅 Date: Feb 14, 2024\n\n📊 Updated budget:\n🍜 Food: $48.60/$800 (6%)\n💳 Total spent: $1,248.60/$3,500 (36%)\n\n💡 Great choice! This restaurant has 4.8★ rating.',
        time: '9:15 PM',
      },
    ],
  },
];

export default function AIBotShowcase() {
  const [currentExample, setCurrentExample] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  const nextExample = () => {
    setCurrentExample(prev => (prev + 1) % botExamples.length);
  };

  const prevExample = () => {
    setCurrentExample(prev => (prev - 1 + botExamples.length) % botExamples.length);
  };

  const currentBot = botExamples[currentExample];

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Bot className="h-4 w-4" />
            <span>AI Travel Assistant</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Your Personal Travel
            <span className="text-indigo-600"> AI Companion</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Chat with our AI assistant via Telegram or WhatsApp for instant trip help, budget tracking, weather updates,
            and personalized recommendations - all while keeping your data completely private.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Video Introduction */}
          <div className="space-y-6">
            <div className="relative">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">See It In Action</h3>
                <p className="text-indigo-100 mb-6">
                  Watch how easy it is to manage your entire trip through simple chat messages. No app switching, no
                  complex interfaces - just natural conversation.
                </p>

                {!showVideo ? (
                  <button
                    onClick={() => setShowVideo(true)}
                    className="group bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-all flex items-center space-x-3"
                  >
                    <div className="p-2 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors">
                      <Play className="h-5 w-5 ml-0.5" />
                    </div>
                    <span>Watch Demo Video</span>
                  </button>
                ) : (
                  <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4">
                    <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Play className="h-16 w-16 text-white/60 mx-auto mb-4" />
                        <p className="text-white/80">Demo Video</p>
                        <p className="text-white/60 text-sm">AI Bot Tutorial</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3 mb-2">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-gray-900">Telegram</span>
                </div>
                <p className="text-sm text-gray-600">Instant messaging with rich formatting and quick commands</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3 mb-2">
                  <Smartphone className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-gray-900">WhatsApp</span>
                </div>
                <p className="text-sm text-gray-600">Familiar interface with voice messages and media sharing</p>
              </div>
            </div>
          </div>

          {/* Bot Screenshot Examples */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Phone Header */}
              <div
                className={`px-4 py-3 ${
                  currentBot.platform === 'telegram' ? 'bg-blue-500' : 'bg-green-500'
                } text-white`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">TripRadar Bot</div>
                    <div className="text-xs opacity-75">
                      {currentBot.platform === 'telegram' ? '@TripRadarBot' : '+1 (555) 123-4567'}
                    </div>
                  </div>
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="p-4 space-y-4 bg-gray-50 min-h-[400px]">
                <div className="text-center">
                  <div className="inline-flex items-center space-x-2 bg-white px-3 py-1 rounded-full text-xs text-gray-600 shadow-sm">
                    <Calendar className="h-3 w-3" />
                    <span>Today</span>
                  </div>
                </div>

                {currentBot.messages.map((message, index) => (
                  <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-xs lg:max-w-sm px-4 py-3 rounded-2xl ${
                        message.type === 'user'
                          ? currentBot.platform === 'telegram'
                            ? 'bg-blue-500 text-white'
                            : 'bg-green-500 text-white'
                          : 'bg-white text-gray-900 shadow-sm'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                      <div className={`text-xs mt-1 ${message.type === 'user' ? 'text-white/70' : 'text-gray-500'}`}>
                        {message.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Example Navigation */}
              <div className="px-4 py-3 bg-white border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <button
                    onClick={prevExample}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  <div className="text-center flex-1">
                    <h4 className="font-medium text-gray-900">{currentBot.title}</h4>
                    <p className="text-sm text-gray-600">{currentBot.description}</p>
                  </div>

                  <button
                    onClick={nextExample}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Example Indicators */}
            <div className="flex justify-center space-x-2">
              {botExamples.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentExample(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentExample ? 'bg-indigo-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: DollarSign,
              title: 'Budget Tracking',
              description: 'Monitor expenses, check budget status, and get spending alerts in real-time.',
              color: 'bg-green-500',
            },
            {
              icon: MapPin,
              title: 'Local Insights',
              description: 'Discover restaurants, attractions, and hidden gems with personalized recommendations.',
              color: 'bg-blue-500',
            },
            {
              icon: Bell,
              title: 'Smart Reminders',
              description: 'Never miss important bookings or deadlines with intelligent reminder system.',
              color: 'bg-purple-500',
            },
            {
              icon: MessageSquare,
              title: 'Group Coordination',
              description: 'Manage group trips, voting, and shared decisions through simple chat commands.',
              color: 'bg-orange-500',
            },
            {
              icon: Clock,
              title: 'Real-time Updates',
              description: 'Get instant weather updates, flight changes, and travel alerts as they happen.',
              color: 'bg-red-500',
            },
            {
              icon: Shield,
              title: 'Privacy First',
              description: 'Your conversations are encrypted and never used for AI training or data collection.',
              color: 'bg-indigo-500',
            },
          ].map(feature => (
            <div key={feature.title} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className={`inline-flex p-3 rounded-xl ${feature.color} mb-4`}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Getting Started */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Try Our AI Assistant?</h3>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Connect your Telegram or WhatsApp and start chatting with your personal travel AI. Setup takes less than 2
            minutes!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center space-x-2">
              <MessageSquare className="h-5 w-5" />
              <span>Connect Telegram</span>
            </button>
            <button className="bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/20 transition-colors flex items-center space-x-2">
              <Smartphone className="h-5 w-5" />
              <span>Connect WhatsApp</span>
            </button>
          </div>

          <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-indigo-200">
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4" />
              <span>Free to start</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Privacy protected</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4" />
              <span>24/7 available</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

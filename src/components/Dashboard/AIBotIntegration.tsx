import { useState } from 'react';
import {
  Bot,
  MessageSquare,
  Smartphone,
  Settings,
  Check,
  ExternalLink,
  Shield,
  Zap,
  Play,
  Image as ImageIcon,
  ArrowRight,
} from 'lucide-react';
import { AIBotIntegration as AIBotType } from '../../types';

interface AIBotIntegrationProps {
  aiBot: AIBotType;
  onUpdate: (bot: AIBotType) => void;
}

export default function AIBotIntegration({ aiBot, onUpdate }: AIBotIntegrationProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [showExamples, setShowExamples] = useState(false);

  const handleToggleTelegram = () => {
    onUpdate({
      ...aiBot,
      telegram: {
        ...aiBot.telegram,
        enabled: !aiBot.telegram.enabled,
      },
    });
  };

  const handleToggleWhatsApp = () => {
    onUpdate({
      ...aiBot,
      whatsapp: {
        ...aiBot.whatsapp,
        enabled: !aiBot.whatsapp.enabled,
      },
    });
  };

  const exampleCommands = [
    {
      command: '"Show my Tokyo trip budget"',
      description: 'Get detailed budget breakdown with spending alerts',
      platform: 'both',
    },
    {
      command: '"What\'s the weather in Paris tomorrow?"',
      description: 'Real-time weather updates with travel recommendations',
      platform: 'both',
    },
    {
      command: '"Remind me to book hotel in 2 days"',
      description: 'Smart reminders for important travel tasks',
      platform: 'both',
    },
    {
      command: '"Add expense: dinner 45 euros"',
      description: 'Quick expense logging with automatic categorization',
      platform: 'both',
    },
    {
      command: '"Find ramen near Shibuya"',
      description: 'Local recommendations with ratings and directions',
      platform: 'both',
    },
    {
      command: '"Group vote status for restaurant"',
      description: 'Check voting progress for group decisions',
      platform: 'both',
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
          <Bot className="h-5 w-5 text-primary-500 dark:text-primary-400" />
          <span>AI Travel Assistant</span>
        </h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowExamples(!showExamples)}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            title="View Examples"
          >
            <ImageIcon className="h-5 w-5" />
          </button>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Integration Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Telegram Integration */}
        <div
          className={`p-4 rounded-lg border-2 transition-colors ${
            aiBot.telegram.enabled
              ? 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20'
              : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <span className="font-medium text-gray-900 dark:text-white">Telegram</span>
            </div>
            <div
              className={`w-3 h-3 rounded-full ${
                aiBot.telegram.enabled ? 'bg-green-500' : 'bg-gray-400 dark:bg-gray-600'
              }`}
            ></div>
          </div>

          {aiBot.telegram.enabled ? (
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <Check className="h-4 w-4 text-green-500" />
                <span>Connected</span>
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-300">
                Bot:{' '}
                <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                  {aiBot.telegram.botUsername}
                </span>
              </div>
              <button className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm">
                <ExternalLink className="h-3 w-3" />
                <span>Open Chat</span>
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">Connect your Telegram for instant trip updates</p>
              <button
                onClick={handleToggleTelegram}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
              >
                Enable Telegram
              </button>
            </div>
          )}
        </div>

        {/* WhatsApp Integration */}
        <div
          className={`p-4 rounded-lg border-2 transition-colors ${
            aiBot.whatsapp.enabled
              ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
              : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Smartphone className="h-5 w-5 text-green-600 dark:text-green-400" />
              <span className="font-medium text-gray-900 dark:text-white">WhatsApp</span>
            </div>
            <div
              className={`w-3 h-3 rounded-full ${
                aiBot.whatsapp.enabled ? 'bg-green-500' : 'bg-gray-400 dark:bg-gray-600'
              }`}
            ></div>
          </div>

          {aiBot.whatsapp.enabled ? (
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <Check className="h-4 w-4 text-green-500" />
                <span>Verified</span>
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-300">
                Phone:{' '}
                <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                  {aiBot.whatsapp.phoneNumber}
                </span>
              </div>
              <button className="flex items-center space-x-1 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 text-sm">
                <ExternalLink className="h-3 w-3" />
                <span>Open Chat</span>
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">Get trip assistance via WhatsApp</p>
              <button
                onClick={handleToggleWhatsApp}
                className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 text-sm font-medium"
              >
                Enable WhatsApp
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Video Tutorial Link */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-800 rounded-lg">
              <Play className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Watch Tutorial</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Learn how to use the AI bot effectively</p>
            </div>
          </div>
          <button className="flex items-center space-x-1 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 text-sm font-medium">
            <span>Watch Now</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Example Commands */}
      {showExamples && (
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
          <h4 className="font-medium text-gray-900 dark:text-white mb-3">Example Commands</h4>
          <div className="space-y-3">
            {exampleCommands.map((example, index) => (
              <div key={index} className="bg-white dark:bg-gray-600 p-3 rounded border-l-4 border-primary-500">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <span className="font-mono text-primary-600 dark:text-primary-400 text-sm">{example.command}</span>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{example.description}</p>
                  </div>
                  <div className="flex items-center space-x-1 ml-2">
                    {example.platform === 'both' ? (
                      <>
                        <MessageSquare className="h-3 w-3 text-blue-500 dark:text-blue-400" />
                        <Smartphone className="h-3 w-3 text-green-500 dark:text-green-400" />
                      </>
                    ) : example.platform === 'telegram' ? (
                      <MessageSquare className="h-3 w-3 text-blue-500 dark:text-blue-400" />
                    ) : (
                      <Smartphone className="h-3 w-3 text-green-500 dark:text-green-400" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Features */}
      <div className="space-y-4 mb-6">
        <h4 className="font-medium text-gray-900 dark:text-white">Available Features</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {aiBot.features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
        <div className="flex items-start space-x-3">
          <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
          <div className="flex-1">
            <h5 className="font-medium text-blue-900 dark:text-blue-300 mb-1">Privacy First</h5>
            <p className="text-sm text-blue-700 dark:text-blue-400">
              Your conversations are encrypted and never stored. Our AI processes requests locally and doesn't learn
              from your personal data.
            </p>
          </div>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h4 className="font-medium text-gray-900 dark:text-white mb-4">AI Assistant Settings</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Proactive Notifications</span>
                <p className="text-xs text-gray-500 dark:text-gray-400">Get automatic updates about your trips</p>
              </div>
              <button className="bg-primary-600 text-white px-3 py-1 rounded text-sm">Enabled</button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Smart Suggestions</span>
                <p className="text-xs text-gray-500 dark:text-gray-400">Receive AI-powered travel recommendations</p>
              </div>
              <button className="bg-primary-600 text-white px-3 py-1 rounded text-sm">Enabled</button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Language</span>
                <p className="text-xs text-gray-500 dark:text-gray-400">AI assistant language preference</p>
              </div>
              <select className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-600 text-gray-900 dark:text-white">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

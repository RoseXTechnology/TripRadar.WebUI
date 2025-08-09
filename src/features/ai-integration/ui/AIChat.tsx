import { useState } from 'react';
import { Button, Input } from 'shared/ui';

import { useAI } from '../model/useAI';

export function AIChat() {
  const { messages, sendMessage, chatLoading, clearChat } = useAI();
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    await sendMessage(inputValue);
    setInputValue('');
  };

  return (
    <div className="flex flex-col h-96 border rounded-lg">
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="font-semibold">AI Travel Assistant</h3>
        <Button variant="ghost" size="sm" onClick={clearChat}>
          Clear
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500">Ask me anything about your trip planning!</div>
        )}

        {messages.map(message => (
          <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}

        {chatLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg">Thinking...</div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder="Ask about destinations, budgets, activities..."
            className="flex-1"
          />
          <Button type="submit" loading={chatLoading}>
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}

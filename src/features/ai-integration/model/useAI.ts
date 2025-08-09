import { useState } from 'react';
import { useApi } from 'shared/lib';

import { aiApi } from '../api/aiApi';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export function useAI() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [conversationId, setConversationId] = useState<string>();
  const { execute: sendMessage, loading: chatLoading } = useApi();
  const { execute: getRecommendations, loading: recommendationsLoading } = useApi();

  const handleSendMessage = async (content: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);

    try {
      const response = await sendMessage(() => aiApi.chatWithBot(content, conversationId));

      if (response.data) {
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: response.data.response,
          timestamp: new Date().toISOString(),
        };

        setMessages(prev => [...prev, assistantMessage]);
        setConversationId(response.data.conversationId);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleGetRecommendations = async (params: {
    destination: string;
    budget: number;
    duration: number;
    preferences: string[];
  }) => {
    const response = await getRecommendations(() => aiApi.getRecommendations(params));
    return response.data || [];
  };

  const clearChat = () => {
    setMessages([]);
    setConversationId(undefined);
  };

  return {
    messages,
    sendMessage: handleSendMessage,
    getRecommendations: handleGetRecommendations,
    clearChat,
    chatLoading,
    recommendationsLoading,
  };
}
